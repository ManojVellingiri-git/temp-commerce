# FreshCart Inventory Import & Catalog Migration Report

## 1. Executive Summary

| Metric | Result |
| :--- | :--- |
| **Source Document** | \`Inventory.pdf\` (14 Pages) |
| **Total Raw Extracted Rows** | **867** |
| **Valid Rows (Ready for Direct Import)** | **760** |
| **Duplicate Candidate Rows** | **76** (Barcodes appearing multiple times in inventory) |
| **Non-Standard Barcode Rows** | **30** (Internal SKUs, EAN-8, ASINs) |
| **Invalid / Incomplete Rows** | **1** (Page 7, Row 17: \`8901719135149\` missing name & price) |
| **Unique Barcodes Discovered** | **827** |
| **Catalog Departments Mapped** | **16 Departments** |
| **Price Validation** | **100% PASS** on all valid rows (non-negative, finite INR values) |
| **Pre-Migration Demo Products** | **10** (3 matched to real inventory, 7 proposed for soft-deactivation) |
| **Database Status** | **Unmodified** (Zero database writes executed during extraction & dry-run) |
| **Unit Test Suite** | **17/17 PASS** (\`pass 17, fail 0\`) |

---

## 2. Extraction & Staging Dataset Details

All 14 pages of \`Inventory.pdf\` were systematically digitized and normalized into:
- **JSON Dataset**: [\`backend/data/inventory_staging.json\`](file:///d:/%23NEW%20PROJECT/Grocery-react-main/backend/data/inventory_staging.json)
- **CSV Spreadsheet**: [\`backend/data/inventory_staging.csv\`](file:///d:/%23NEW%20PROJECT/Grocery-react-main/backend/data/inventory_staging.csv)
- **Extraction Summary**: [\`backend/data/extraction_summary.json\`](file:///d:/%23NEW%20PROJECT/Grocery-react-main/backend/data/extraction_summary.json)

### Extracted Field Normalization:
- **Barcode**: Preserved original raw barcode for traceability (e.g. \`8907093004569\`, \`A8906223961011A\`, \`20001\`, \`B07S2WW2NZ\`).
- **Original Description**: Stored verbatim to protect audit history (e.g. \`schez,chutney\`, \`DM,rostalmond\`, \`HR,panchratanmix 23g\`).
- **Clean Display Name**: Expanded contractions into customer-friendly retail titles (e.g. \`Schez Chutney\`, \`Cadbury Dairy Milk Roast Almond\`, \`Haldiram's Panchratan Mix 23g\`).
- **Brand Detection**: Identified 22 major FMCG brands automatically (Cadbury, Haldiram's, Nestlé, Milky Mist, Fortune, Britannia, Parle, P&G, Dabur, Reckitt, Colgate, etc.).
- **Listed Price**: Verified finite positive INR amounts.
- **GST Rate**: Preserved source column value (\`0\`). Flagged for store owner tax classification review.

---

## 3. Department & Category Distribution

| Category Department | Extracted Products | Sample Products |
| :--- | :---: | :--- |
| **Stationery & General Merchandise** | 136 | Camlin scales, pens, markers, scissors, batteries, lighter |
| **Personal Care & Hygiene** | 112 | Gillette razors, Whisper, Stayfree, Dettol soap, Colgate |
| **General Merchandise** | 99 | Storage containers, scissors, household sundries |
| **Dairy & Refrigerated Foods** | 96 | Milky Mist paneer, curd, cheese slices, butter, ghee, yogurt |
| **Chocolates & Confectionery** | 63 | Dairy Milk Silk, 5 Star, KitKat, Munch, Ferrero Rocher, Snickers |
| **Tea, Coffee & Beverages** | 57 | Taj Mahal Tea, Red Label, Nescafé, Real juices, Coca-Cola |
| **Biscuits, Bakery & Rusk** | 45 | Britannia Milk Bikis, Good Day, Monaco, Krack Jack, Parle-G |
| **Spices, Masalas & Seasonings** | 44 | Sakthi masalas, Annapoorna masalas, oregano, rosemary, thyme |
| **Snacks, Chips & Namkeen** | 40 | Lay's, Kurkure, Doritos, Haldiram's Bhujia, Moong Dal |
| **Baby Care** | 34 | Pampers (all sizes NB to XXL), Himalaya pants, feeding bottles |
| **Household Cleaning** | 34 | Lizol, Colin, Odonil room freshener, Tide, Hit, Mortein |
| **Oils, Vinegar & Condiments** | 31 | Fortune Sunflower & Mustard oil, Parachute coconut oil, vinegar |
| **Frozen Foods** | 26 | McCain french fries, potato bites, chicken nuggets, frozen peas |
| **Staples, Rice & Grains** | 20 | Kohinoor basmati/jeera rice, Fortune atta, maida, rava, poha |
| **Instant Food** | 20 | Maggi 2-Minute noodles, Maggi Pazzta, cuppa noodles, soups |
| **Pet Food & Care** | 10 | Pedigree adult/puppy food, Drools, Whiskas cat food |

---

## 4. Anomaly Analysis & Store Owner Review Queue

### A. Duplicate Barcode Candidates (76 Rows)
Several items in \`Inventory.pdf\` share identical barcodes across different pages or variants:
1. **Barcode \`7622202325878\`**:
   - Page 1: \`DM,choclatesilk\` (Listed: ₹100)
   - Page 1: \`D,M chololet\` (Listed: ₹89)
   - *Recommendation*: Review whether ₹100 or ₹89 represents the active stock item, or if these are two separate weights.
2. **Barcode \`7622202818400\`**:
   - Page 1: \`5star\` (Listed: ₹10)
   - Page 1: \`5STAR 10\` (Listed: ₹10)
   - *Recommendation*: Identical product duplicated on Page 1. Merge into a single inventory record.
3. **Barcode \`8902953376015\`**:
   - Page 1: \`america cool\` (Listed: ₹360)
   - Page 1: \`america red\` (Listed: ₹360)
   - *Recommendation*: Two flavor variants sharing a master barcode. Create distinct suffix slugs or parent-variant record.
4. **Barcode \`8904505701269\`**:
   - Page 1: \`fortune sunfl.oil 1lit\` (Listed: ₹180)
   - Page 12: \`Fort. sunflo pouch\` (Listed: ₹190)
   - *Recommendation*: Price revision from ₹180 to ₹190. Confirm latest active store price.

### B. Non-Standard / Internal Barcodes (30 Rows)
- **Short Codes**: \`20001\` (Apple broom), \`20003\` (Canvas), \`20005\` (Gas lighter), \`1\` (Rich Cream), etc.
- **Alphanumeric / ASIN Codes**: \`B07S2WW2NZ\` (Roma Secret Deo), \`E0002R\` (Sabut Garam Masala).
- *Recommendation*: Maintain as internal SKU identifiers; supported seamlessly by the updated schema without crashing barcode scans.

### C. Incomplete Row (1 Row)
- **Page 7, Row 17**: Barcode \`8901719135149\` with blank description, price, and GST.
- *Recommendation*: Cross-reference with Page 5, Row 1 (\`8901719135149 monaco 18 0\`). The orphan row on Page 7 is safely excluded from import.

---

## 5. Idempotent Import Tool Specifications

Created [\`backend/scripts/importInventory.js\`](file:///d:/%23NEW%20PROJECT/Grocery-react-main/backend/scripts/importInventory.js):
- **Default Mode**: \`--dry-run\` (no mutations).
- **Explicit Apply Mode**: Requires \`--apply --target=<env>\`.
- **Primary Matching Key**: Barcode (with name fallback).
- **Field Protection**: Does not overwrite customer ratings, reviews, custom uploaded imagery, or active order references.
- **Batch Processing**: Configurable batch size (\`--batch-size=100\`) for memory-efficient database writes.
- **Audit Logging**: Emits structured batch ID (\`BATCH_<timestamp>\`) on every record.
