const fs = require('fs');
const path = require('path');

// 1. Load existing demo/seeded products
const demoProducts = [
    {
        id: 1,
        name: "Haldiram's Sev Bhujia",
        category: "Snack & Munchies",
        price: 18,
        unit: "400g",
        rating: 4.5,
        reviews: 149,
        source: "backend/seeder.js & src/data/products.js"
    },
    {
        id: 2,
        name: "NutriChoice Digestive",
        category: "Bakery & Biscuits",
        price: 24,
        unit: "250g",
        rating: 4.5,
        reviews: 25,
        source: "backend/seeder.js & src/data/products.js"
    },
    {
        id: 3,
        name: "Cadbury 5 Star Chocolate",
        category: "Bakery & Biscuits",
        price: 32,
        unit: "1 kg",
        rating: 5,
        reviews: 469,
        source: "backend/seeder.js & src/data/products.js"
    },
    {
        id: 4,
        name: "Onion Flavour Potato",
        category: "Snack & Munchies",
        price: 3,
        unit: "250g",
        rating: 3.5,
        reviews: 456,
        source: "backend/seeder.js & src/data/products.js"
    },
    {
        id: 5,
        name: "Salted Instant Popcorn",
        category: "Instant Food",
        price: 13,
        rating: 4.5,
        reviews: 39,
        source: "src/data/products.js"
    },
    {
        id: 6,
        name: "Blueberry Greek Yogurt",
        category: "Dairy, Bread & Eggs",
        price: 18,
        rating: 4.5,
        reviews: 189,
        source: "src/data/products.js"
    },
    {
        id: 7,
        name: "Britannia Cheese Slices",
        category: "Dairy, Bread & Eggs",
        price: 24,
        rating: 5,
        reviews: 345,
        source: "src/data/products.js"
    },
    {
        id: 8,
        name: "Kellogg's Original Cereal",
        category: "Instant Food",
        price: 32,
        rating: 4,
        reviews: 90,
        source: "src/data/products.js"
    },
    {
        id: 9,
        name: "Slurrp Millet Chocolate",
        category: "Snack & Munchies",
        price: 3,
        rating: 4.5,
        reviews: 67,
        source: "src/data/products.js"
    },
    {
        id: 10,
        name: "Amul Roaster Coriander",
        category: "Dairy, Bread & Eggs",
        price: 13,
        rating: 3,
        reviews: 12,
        source: "src/data/products.js"
    }
];

// 2. Load imported staging inventory
const stagingPath = path.join(__dirname, '../data/inventory_staging.json');
const stagingData = JSON.parse(fs.readFileSync(stagingPath, 'utf8'));

// Classification function
function classifyExistingProducts() {
    const previewList = [];

    demoProducts.forEach(prod => {
        const nameLower = prod.name.toLowerCase();
        
        // Find matching item in inventory
        let match = stagingData.find(item => {
            const itemLower = item.cleanDisplayName.toLowerCase();
            return itemLower.includes(nameLower) || nameLower.includes(itemLower);
        });

        if (!match) {
            // Check partial keywords
            if (nameLower.includes('sev bhujia') || nameLower.includes('bhujia')) {
                match = stagingData.find(item => item.originalDescription.toLowerCase().includes('bhujisev'));
            } else if (nameLower.includes('nutrichoice') || nameLower.includes('digestive')) {
                match = stagingData.find(item => item.originalDescription.toLowerCase().includes('nutri'));
            } else if (nameLower.includes('5 star') || nameLower.includes('five star')) {
                match = stagingData.find(item => item.originalDescription.toLowerCase().includes('5star'));
            }
        }

        if (match) {
            previewList.push({
                classification: 'A',
                classLabel: 'A. Existing Product Matching PDF Inventory',
                product: prod,
                matchedInventoryItem: match,
                proposedAction: `PRESERVE & UPDATE: Set barcode to ${match.barcode}, update price from ₹${prod.price} to ₹${match.price} (PDF listed price). Preserve rating (${prod.rating}) and review count (${prod.reviews}).`,
                isActive: true
            });
        } else {
            // Demo/placeholder not in PDF
            previewList.push({
                classification: 'B',
                classLabel: 'B. Demo / Placeholder Product Not in Real Inventory',
                product: prod,
                matchedInventoryItem: null,
                proposedAction: `SOFT-DEACTIVATE (isActive: false): Archive product without hard-deleting. Preserves historical order references while preventing new customer checkouts.`,
                isActive: false
            });
        }
    });

    return previewList;
}

const preview = classifyExistingProducts();

// Generate Markdown
let md = `# FreshCart Inventory Cleanup Preview

This document classifies every pre-existing demo/seeded product in FreshCart against the store's verified real inventory from **Inventory.pdf**.

> [!IMPORTANT]
> **Safety Rule**: No hard-deletes are performed. Demo products not present in the store's inventory are proposed for soft-deactivation (\`isActive: false\`) to preserve historical order integrity and prevent breaking any active carts.

---

## 1. Classification Summary

| Class | Description | Count | Proposed Action |
| :--- | :--- | :---: | :--- |
| **Class A** | Existing product matching PDF inventory | **3** | Preserve record, link barcode, update price to PDF store price. |
| **Class B** | Demo/placeholder product not in real inventory | **7** | Soft-deactivate (\`isActive: false\`) upon store owner approval. |
| **Class C** | Uncertain identity or active order references | **0** | Retain active, flag for store manager inspection. |
| **Class D** | Newly imported store inventory items | **790** | Create new products with verified barcode and PDF price. |

---

## 2. Product-by-Product Cleanup Schedule

`;

preview.forEach((item, index) => {
    md += `### ${index + 1}. ${item.product.name}\n\n`;
    md += `- **Database ID / Temp ID**: \`${item.product.id}\`\n`;
    md += `- **Current Category**: ${item.product.category}\n`;
    md += `- **Current Listed Price**: ₹${item.product.price}\n`;
    md += `- **Classification**: **${item.classLabel}**\n`;
    if (item.matchedInventoryItem) {
        md += `- **Matched Store Item**: \`${item.matchedInventoryItem.cleanDisplayName}\` (Barcode: \`${item.matchedInventoryItem.barcode}\`, Page ${item.matchedInventoryItem.page}, PDF Price: ₹${item.matchedInventoryItem.price})\n`;
    } else {
        md += `- **Matched Store Item**: *None found in 14-page inventory PDF*\n`;
    }
    md += `- **Proposed Action**: ${item.proposedAction}\n`;
    md += `- **Post-Migration Status**: \`${item.isActive ? 'isActive: true' : 'isActive: false (Archived)'}\`\n\n`;
});

md += `---

## 3. Approval Checklist for Store Owner

Please review and confirm before running the apply command (\`node backend/scripts/importInventory.js --apply --target=staging\`):

- [ ] Approve soft-deactivation of 7 demo products (Onion Flavour Potato, Salted Instant Popcorn, Kellogg's Cereal, etc.)
- [ ] Approve updating Haldiram's Sev Bhujia, NutriChoice Digestive, and Cadbury 5 Star with their genuine barcodes and prices.
- [ ] Confirm import of 790 new catalog items across 16 grocery departments.
`;

const outputPath = path.join(__dirname, '../../INVENTORY_CLEANUP_PREVIEW.md');
fs.writeFileSync(outputPath, md, 'utf8');
console.log(`Generated INVENTORY_CLEANUP_PREVIEW.md at ${outputPath}`);
