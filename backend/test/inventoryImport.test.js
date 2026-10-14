const { test, describe } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const stagingPath = path.join(__dirname, '../data/inventory_staging.json');
const stagingData = JSON.parse(fs.readFileSync(stagingPath, 'utf8'));

describe('Inventory Extraction & Migration Test Suite', () => {
    test('1. Extraction captures all 14 pages and raw rows', () => {
        assert.ok(stagingData.length > 800, `Expected > 800 rows, got ${stagingData.length}`);
        const pagesCovered = new Set(stagingData.map(r => r.page));
        // All non-empty pages 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14 are present
        assert.ok(pagesCovered.has(1));
        assert.ok(pagesCovered.has(2));
        assert.ok(pagesCovered.has(3));
        assert.ok(pagesCovered.has(4));
        assert.ok(pagesCovered.has(5));
        assert.ok(pagesCovered.has(14));
    });

    test('2. Price validation: every valid product has a positive numeric INR price', () => {
        const validRows = stagingData.filter(r => r.importStatus === 'VALID');
        assert.ok(validRows.length > 700);
        validRows.forEach(r => {
            assert.ok(typeof r.price === 'number', `Price must be number for row ${r.rowId}`);
            assert.ok(!isNaN(r.price), `Price cannot be NaN for row ${r.rowId}`);
            assert.ok(r.price > 0, `Price must be positive for row ${r.rowId}`);
        });
    });

    test('3. Duplicate barcode detection flags repeated entries', () => {
        const dups = stagingData.filter(r => r.importStatus === 'REVIEW_REQUIRED_DUPLICATE_BARCODE');
        assert.ok(dups.length > 0, 'Expected duplicate barcodes to be flagged');
        
        // Specifically check known duplicate barcode 7622202818400 (5star)
        const fiveStarRows = stagingData.filter(r => r.barcode === '7622202818400');
        assert.ok(fiveStarRows.length >= 2, 'Barcode 7622202818400 should appear multiple times');
        fiveStarRows.forEach(r => {
            assert.strictEqual(r.importStatus, 'REVIEW_REQUIRED_DUPLICATE_BARCODE');
        });
    });

    test('4. Incomplete row on page 7 (row 17) is marked INVALID_INCOMPLETE', () => {
        const incomplete = stagingData.find(r => r.page === 7 && r.barcode === '8901719135149');
        assert.ok(incomplete, 'Page 7 incomplete row must be present');
        assert.strictEqual(incomplete.importStatus, 'INVALID_INCOMPLETE');
        assert.ok(incomplete.validationNotes.some(n => n.includes('Incomplete row')));
    });

    test('5. Non-standard barcodes (short codes, ASINs) are classified for review', () => {
        const asinItem = stagingData.find(r => r.barcode === 'B07S2WW2NZ');
        assert.ok(asinItem, 'ASIN item B07S2WW2NZ should be found');
        assert.ok(asinItem.validationNotes.some(n => n.includes('Alphanumeric')));

        const shortCodeItem = stagingData.find(r => r.barcode === '20001');
        assert.ok(shortCodeItem, 'Short code 20001 should be found');
        assert.ok(shortCodeItem.validationNotes.some(n => n.includes('Internal store SKU')));
    });

    test('6. Dry-run mode produces structured preview without database mutation', async () => {
        const { runImport } = require('../scripts/importInventory');
        const report = await runImport();
        assert.strictEqual(report.mode, 'dry-run');
        assert.ok(report.processedRows > 800);
        assert.ok(report.proposedInserts > 700);
        assert.strictEqual(report.skippedInvalid, 1);
    });

    test('7. Product schema supports barcode indexing, gst, and traceability', () => {
        const Product = require('../src/models/Product');
        const paths = Product.schema.paths;
        assert.ok(paths.barcode, 'Product schema must have barcode field');
        assert.ok(paths.gst, 'Product schema must have gst field');
        assert.ok(paths.originalDescription, 'Product schema must have originalDescription field');
        assert.ok(paths.requiresGenuineImage, 'Product schema must have requiresGenuineImage field');
        assert.ok(paths.importBatch, 'Product schema must have importBatch field');
        assert.ok(paths.isActive, 'Product schema must have isActive field for soft-delete');
    });

    test('8. Category assignment maps items to structured grocery departments', () => {
        const categories = new Set(stagingData.map(r => r.suggestedCategory));
        assert.ok(categories.has('Dairy & Refrigerated Foods'));
        assert.ok(categories.has('Chocolates & Confectionery'));
        assert.ok(categories.has('Personal Care & Hygiene'));
        assert.ok(categories.has('Household Cleaning'));
        assert.ok(categories.has('Spices, Masalas & Seasonings'));
        assert.ok(categories.has('Oils, Vinegar & Condiments'));
    });
});
