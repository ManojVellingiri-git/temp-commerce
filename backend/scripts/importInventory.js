const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Models
const Product = require('../src/models/Product');
const Category = require('../src/models/Category');
const Order = require('../src/models/Order');

// Fallback category images for placeholder assignment
const categoryImageMap = {
    'Dairy, Bread & Eggs': '/images/category/category-dairy-bread-eggs.jpg',
    'Snacks, Chips & Namkeen': '/images/category/category-snack-munchies.jpg',
    'Biscuits, Bakery & Rusk': '/images/category/category-bakery-biscuits.jpg',
    'Chocolates & Confectionery': '/images/category/category-snack-munchies.jpg',
    'Tea, Coffee & Beverages': '/images/category/category-tea-coffee-drinks.jpg',
    'Cold Drinks & Juices': '/images/category/category-cold-drinks-juices.jpg',
    'Frozen Foods': '/images/category/category-chicken-meat-fish.jpg',
    'Personal Care & Hygiene': '/images/category/category-baby-care.jpg',
    'Household Cleaning': '/images/category/category-cleaning-essentials.jpg',
    'Baby Care': '/images/category/category-baby-care.jpg',
    'Pet Food & Care': '/images/category/category-pet-care.jpg',
    'Staples, Rice & Grains': '/images/category/category-atta-rice-dal.jpg',
    'Spices, Masalas & Seasonings': '/images/category/category-atta-rice-dal.jpg',
    'Oils, Vinegar & Condiments': '/images/category/category-atta-rice-dal.jpg',
    'Instant Food': '/images/category/category-instant-food.jpg',
    'Stationery & General Merchandise': '/images/category/category-cleaning-essentials.jpg',
    'General Merchandise': '/images/category/category-cleaning-essentials.jpg'
};

// Parse command line arguments
function parseArgs() {
    const args = process.argv.slice(2);
    const options = {
        dryRun: true,
        target: null,
        batchSize: 100,
        input: path.join(__dirname, '../data/inventory_staging.json'),
        includeDuplicates: false,
        includeNonStandard: true
    };

    args.forEach(arg => {
        if (arg === '--apply') {
            options.dryRun = false;
        } else if (arg === '--dry-run') {
            options.dryRun = true;
        } else if (arg.startsWith('--target=')) {
            options.target = arg.split('=')[1].toLowerCase();
        } else if (arg.startsWith('--batch-size=')) {
            options.batchSize = parseInt(arg.split('=')[1], 10) || 100;
        } else if (arg.startsWith('--input=')) {
            options.input = path.resolve(arg.split('=')[1]);
        } else if (arg === '--include-duplicates') {
            options.includeDuplicates = true;
        } else if (arg === '--allow-production-write') {
            options.allowProductionWrite = true;
        }
    });

    return options;
}

// Extract database name safely without exposing credentials
function getSanitizedDbName(uri, conn) {
    if (conn && conn.name) return conn.name;
    if (!uri) return 'unspecified';
    try {
        const clean = uri.split('?')[0];
        const lastSlash = clean.lastIndexOf('/');
        if (lastSlash !== -1) {
            return clean.substring(lastSlash + 1);
        }
    } catch {
        // Fallback
    }
    return 'unknown_db';
}

async function runImport() {
    const options = parseArgs();
    const batchId = `BATCH_${Date.now()}`;
    const timestamp = new Date().toISOString();

    console.log('====================================================');
    console.log('       FreshCart Inventory Import & Migration       ');
    console.log('====================================================');
    console.log(`Execution Mode  : ${options.dryRun ? 'DRY-RUN (Safe, no database writes)' : 'APPLY (Live database changes)'}`);
    console.log(`Target Env      : ${options.target || 'NONE SPECIFIED'}`);
    console.log(`Batch ID        : ${batchId}`);
    console.log(`Timestamp       : ${timestamp}`);
    console.log(`Input File      : ${options.input}`);
    console.log(`Batch Size      : ${options.batchSize}`);
    console.log('====================================================\n');

    // Safety checks
    if (!options.dryRun) {
        if (!options.target) {
            console.error('ERROR: --apply mode requires an explicit --target=<environment> (e.g. --target=local, --target=staging). Exiting.');
            process.exit(1);
        }
        if (!['local', 'staging', 'production', 'test'].includes(options.target)) {
            console.error(`ERROR: Unknown target environment '${options.target}'. Must be local, staging, production, or test. Exiting.`);
            process.exit(1);
        }
        if (options.target === 'production' && !options.allowProductionWrite) {
            console.error('CRITICAL SAFETY ERROR: Production writes require explicit --allow-production-write flag. Halting.');
            process.exit(1);
        }
    }

    if (!fs.existsSync(options.input)) {
        console.error(`ERROR: Staging inventory file not found at ${options.input}. Please run extract_inventory.js first.`);
        process.exit(1);
    }

    const stagingData = JSON.parse(fs.readFileSync(options.input, 'utf8'));
    console.log(`Loaded ${stagingData.length} records from staging dataset.`);

    // Connect to database if apply mode or if database connection is available
    let dbConnected = false;
    let targetDbName = 'offline_no_db';
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

    if (uri && uri !== 'mongodb://localhost:27017' && !uri.includes('undefined')) {
        try {
            console.log('Connecting to database for schema validation and inventory comparison...');
            const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
            dbConnected = true;
            targetDbName = getSanitizedDbName(uri, conn.connection);
            console.log(`Database connected. Targeted database name: [${targetDbName}]`);

            // Isolation check: ensure staging does not point to a production database
            if (options.target === 'staging' && (/prod/i.test(targetDbName) || /live/i.test(targetDbName))) {
                console.error(`CRITICAL ISOLATION ERROR: Target is '${options.target}', but connected database name '${targetDbName}' indicates production! Aborting.`);
                await mongoose.disconnect();
                process.exit(1);
            }

            // Create automatic backup before apply
            if (!options.dryRun) {
                const backupDir = path.join(__dirname, '../data/backups');
                if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
                const backupPath = path.join(backupDir, `backup_${targetDbName}_${Date.now()}.json`);
                console.log(`Creating pre-migration database backup to ${backupPath}...`);
                const existingProducts = await Product.find({}).lean();
                const existingOrders = await Order.find({}).lean();
                fs.writeFileSync(backupPath, JSON.stringify({ products: existingProducts, orders: existingOrders }, null, 2), 'utf8');
                console.log(`Backup created successfully (${existingProducts.length} products, ${existingOrders.length} orders saved).`);
            }
        } catch (err) {
            if (!options.dryRun) {
                console.error(`CRITICAL ERROR: Cannot --apply changes without an active database connection: ${err.message}`);
                process.exit(1);
            }
            console.warn(`Database connection unavailable (${err.message}). Proceeding in offline verification mode.`);
        }
    } else {
        if (!options.dryRun) {
            console.error('CRITICAL ERROR: Cannot --apply changes because no MONGODB_URI is configured. Halting.');
            process.exit(1);
        }
        console.log('No live MongoDB connection string configured. Running in offline dataset verification mode.');
    }

    const report = {
        batchId,
        timestamp,
        mode: options.dryRun ? 'dry-run' : 'apply',
        target: options.target || 'offline_dry_run',
        totalInputRows: stagingData.length,
        processedRows: 0,
        proposedInserts: 0,
        proposedUpdates: 0,
        skippedDuplicates: 0,
        skippedInvalid: 0,
        categoriesToEnsure: new Set(),
        recordsSummary: []
    };

    // Filter and process records
    for (const item of stagingData) {
        report.processedRows++;

        // Validation rule: price must be finite, non-negative
        if (typeof item.price !== 'number' || isNaN(item.price) || item.price <= 0) {
            report.skippedInvalid++;
            report.recordsSummary.push({
                rowId: item.rowId,
                barcode: item.barcode,
                name: item.cleanDisplayName,
                action: 'SKIP_INVALID_PRICE',
                reason: `Price (${item.price}) is invalid`
            });
            continue;
        }

        // Validation rule: skip duplicate barcode rows pending manual review unless explicitly included
        if (item.importStatus === 'REVIEW_REQUIRED_DUPLICATE_BARCODE' && !options.includeDuplicates) {
            report.skippedDuplicates++;
            report.recordsSummary.push({
                rowId: item.rowId,
                barcode: item.barcode,
                name: item.cleanDisplayName,
                action: 'SKIP_DUPLICATE_FOR_REVIEW',
                reason: item.validationNotes.join('; ')
            });
            continue;
        }

        // Validation rule: incomplete row
        if (item.importStatus === 'INVALID_INCOMPLETE' || item.importStatus === 'INVALID_MISSING_BARCODE') {
            report.skippedInvalid++;
            report.recordsSummary.push({
                rowId: item.rowId,
                barcode: item.barcode,
                name: item.cleanDisplayName,
                action: 'SKIP_INCOMPLETE_ROW',
                reason: item.validationNotes.join('; ')
            });
            continue;
        }

        report.categoriesToEnsure.add(item.suggestedCategory);

        // Check if database is connected for real diff check
        if (dbConnected) {
            let existingProduct = null;
            if (item.barcode) {
                existingProduct = await Product.findOne({ barcode: item.barcode });
            }
            if (!existingProduct && item.cleanDisplayName) {
                existingProduct = await Product.findOne({ name: item.cleanDisplayName });
            }

            if (existingProduct) {
                report.proposedUpdates++;
                report.recordsSummary.push({
                    rowId: item.rowId,
                    barcode: item.barcode,
                    name: item.cleanDisplayName,
                    action: 'UPDATE_EXISTING',
                    existingId: existingProduct._id,
                    priceChange: existingProduct.price !== item.price ? `${existingProduct.price} -> ${item.price}` : 'unchanged'
                });

                if (!options.dryRun) {
                    existingProduct.price = item.price;
                    existingProduct.gst = item.gst;
                    existingProduct.originalDescription = item.originalDescription;
                    existingProduct.importBatch = batchId;
                    await existingProduct.save();
                }
            } else {
                report.proposedInserts++;
                report.recordsSummary.push({
                    rowId: item.rowId,
                    barcode: item.barcode,
                    name: item.cleanDisplayName,
                    category: item.suggestedCategory,
                    price: item.price,
                    action: 'INSERT_NEW'
                });

                if (!options.dryRun) {
                    await Product.create({
                        name: item.cleanDisplayName,
                        slug: item.slug,
                        barcode: item.barcode,
                        price: item.price,
                        originalPrice: item.price,
                        gst: item.gst,
                        category: item.suggestedCategory,
                        brand: item.brand,
                        originalDescription: item.originalDescription,
                        image: categoryImageMap[item.suggestedCategory] || '/images/category/category-cleaning-essentials.jpg',
                        requiresGenuineImage: true,
                        stock: true,
                        stockQuantity: 50,
                        isActive: true,
                        importBatch: batchId
                    });
                }
            }
        } else {
            // Offline simulation: treat as proposed insert
            report.proposedInserts++;
            report.recordsSummary.push({
                rowId: item.rowId,
                barcode: item.barcode,
                name: item.cleanDisplayName,
                category: item.suggestedCategory,
                price: item.price,
                action: 'INSERT_NEW'
            });
        }
    }

    // Convert Set to Array for JSON report
    report.categoriesToEnsure = Array.from(report.categoriesToEnsure);

    console.log('\n================ IMPORT REPORT ================');
    console.log(`Total Rows Processed   : ${report.processedRows}`);
    console.log(`Proposed New Inserts   : ${report.proposedInserts}`);
    console.log(`Proposed Updates       : ${report.proposedUpdates}`);
    console.log(`Skipped Duplicates     : ${report.skippedDuplicates} (flagged for store owner review)`);
    console.log(`Skipped Invalid Rows   : ${report.skippedInvalid}`);
    console.log(`Categories Identified  : ${report.categoriesToEnsure.length}`);
    console.log('================================================\n');

    // Save detailed report
    const reportPath = path.join(__dirname, '../data/last_import_report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
    console.log(`Report written to ${reportPath}`);

    if (dbConnected) {
        await mongoose.disconnect();
    }

    return report;
}

if (require.main === module) {
    runImport()
        .then(() => process.exit(0))
        .catch(err => {
            console.error('Fatal Import Error:', err);
            process.exit(1);
        });
}

module.exports = { runImport, parseArgs };
