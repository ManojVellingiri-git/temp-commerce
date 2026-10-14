# FreshCart Inventory Import & Migration Instructions

This guide provides step-by-step procedures for the store owner and development team to review, validate, and apply the real store inventory into FreshCart.

---

## 1. Inventory Datasets & Previews

The inventory has been extracted and prepared in three formats:
1. **Spreadsheet for Review**: [\`backend/data/inventory_staging.csv\`](file:///d:/%23NEW%20PROJECT/Grocery-react-main/backend/data/inventory_staging.csv)
   - Open in Excel or Google Sheets to inspect all 867 items, prices, barcodes, and categories.
2. **JSON Dataset**: [\`backend/data/inventory_staging.json\`](file:///d:/%23NEW%20PROJECT/Grocery-react-main/backend/data/inventory_staging.json)
3. **Cleanup Preview**: [\`INVENTORY_CLEANUP_PREVIEW.md\`](file:///d:/%23NEW%20PROJECT/Grocery-react-main/INVENTORY_CLEANUP_PREVIEW.md)
   - Details which demo products will be soft-deactivated.

---

## 2. Command Reference

All commands must be run from the \`Grocery-react-main/\` directory.

### A. Run a Dry-Run (Safe — No Database Writes)
Simulates the entire import process, checks validations, detects duplicates, and produces a preview report without touching the database:
\`\`\`bash
node backend/scripts/importInventory.js --dry-run
\`\`\`

### B. Run the Extraction Script (Re-generate Staging Datasets)
To re-process \`Inventory.pdf\` and refresh \`inventory_staging.json\` and \`inventory_staging.csv\`:
\`\`\`bash
node backend/scripts/extract_inventory.js
\`\`\`

### C. Run the Cleanup Preview Generator
To update \`INVENTORY_CLEANUP_PREVIEW.md\` against the latest staging data:
\`\`\`bash
node backend/scripts/generateCleanupPreview.js
\`\`\`

### D. Run Unit & Regression Tests
Validates barcode parsing, price formatting, non-negative INR rules, and dry-run safety:
\`\`\`bash
cd backend
npm test
\`\`\`

---

## 3. Applying the Import to the Database (Post-Approval)

> [!CAUTION]
> **Do not run \`--apply\` until the store owner has reviewed \`INVENTORY_CLEANUP_PREVIEW.md\` and confirmed MongoDB Atlas connectivity.**

### Target Environment Syntax:
To prevent accidental production writes, the import script **requires** both \`--apply\` and an explicit \`--target\` argument.

#### 1. Import to Local / Staging Database:
\`\`\`bash
node backend/scripts/importInventory.js --apply --target=staging
\`\`\`

#### 2. Import Including Resolved Duplicates:
Once duplicate rows in the review queue have been verified:
\`\`\`bash
node backend/scripts/importInventory.js --apply --target=staging --include-duplicates
\`\`\`

---

## 4. Safety & Rollback Protections

1. **Idempotent Execution**: Running the script multiple times matches products by \`barcode\` and updates them in-place rather than creating duplicate entries.
2. **Soft Deactivation**: Unwanted demo products are set to \`isActive: false\`. Their records and database IDs remain intact so existing orders, carts, and customer history never throw broken reference errors.
3. **Protected Collections**: The import script has zero access to \`User\`, \`Order\`, \`Payment\`, or \`Coupon\` collections.
4. **Batch Identifiers**: Every imported product is tagged with an \`importBatch\` timestamp (e.g. \`BATCH_1791999422659\`), allowing instant tracking and rollback if needed.
