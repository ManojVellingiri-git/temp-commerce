# FreshCart Inventory Cleanup Preview

This document classifies every pre-existing demo/seeded product in FreshCart against the store's verified real inventory from **Inventory.pdf**.

> [!IMPORTANT]
> **Safety Rule**: No hard-deletes are performed. Demo products not present in the store's inventory are proposed for soft-deactivation (`isActive: false`) to preserve historical order integrity and prevent breaking any active carts.

---

## 1. Classification Summary

| Class | Description | Count | Proposed Action |
| :--- | :--- | :---: | :--- |
| **Class A** | Existing product matching PDF inventory | **3** | Preserve record, link barcode, update price to PDF store price. |
| **Class B** | Demo/placeholder product not in real inventory | **7** | Soft-deactivate (`isActive: false`) upon store owner approval. |
| **Class C** | Uncertain identity or active order references | **0** | Retain active, flag for store manager inspection. |
| **Class D** | Newly imported store inventory items | **790** | Create new products with verified barcode and PDF price. |

---

## 2. Product-by-Product Cleanup Schedule

### 1. Haldiram's Sev Bhujia

- **Database ID / Temp ID**: `1`
- **Current Category**: Snack & Munchies
- **Current Listed Price**: ₹18
- **Classification**: **A. Existing Product Matching PDF Inventory**
- **Matched Store Item**: `Haldiram's Bhujisev200g` (Barcode: `8904004400045`, Page 4, PDF Price: ₹60)
- **Proposed Action**: PRESERVE & UPDATE: Set barcode to 8904004400045, update price from ₹18 to ₹60 (PDF listed price). Preserve rating (4.5) and review count (149).
- **Post-Migration Status**: `isActive: true`

### 2. NutriChoice Digestive

- **Database ID / Temp ID**: `2`
- **Current Category**: Bakery & Biscuits
- **Current Listed Price**: ₹24
- **Classification**: **A. Existing Product Matching PDF Inventory**
- **Matched Store Item**: `Britannia. Nutri 58g` (Barcode: `8901063142831`, Page 8, PDF Price: ₹10)
- **Proposed Action**: PRESERVE & UPDATE: Set barcode to 8901063142831, update price from ₹24 to ₹10 (PDF listed price). Preserve rating (4.5) and review count (25).
- **Post-Migration Status**: `isActive: true`

### 3. Cadbury 5 Star Chocolate

- **Database ID / Temp ID**: `3`
- **Current Category**: Bakery & Biscuits
- **Current Listed Price**: ₹32
- **Classification**: **A. Existing Product Matching PDF Inventory**
- **Matched Store Item**: `5star 5rs` (Barcode: `7622202818431`, Page 1, PDF Price: ₹5)
- **Proposed Action**: PRESERVE & UPDATE: Set barcode to 7622202818431, update price from ₹32 to ₹5 (PDF listed price). Preserve rating (5) and review count (469).
- **Post-Migration Status**: `isActive: true`

### 4. Onion Flavour Potato

- **Database ID / Temp ID**: `4`
- **Current Category**: Snack & Munchies
- **Current Listed Price**: ₹3
- **Classification**: **B. Demo / Placeholder Product Not in Real Inventory**
- **Matched Store Item**: *None found in 14-page inventory PDF*
- **Proposed Action**: SOFT-DEACTIVATE (isActive: false): Archive product without hard-deleting. Preserves historical order references while preventing new customer checkouts.
- **Post-Migration Status**: `isActive: false (Archived)`

### 5. Salted Instant Popcorn

- **Database ID / Temp ID**: `5`
- **Current Category**: Instant Food
- **Current Listed Price**: ₹13
- **Classification**: **B. Demo / Placeholder Product Not in Real Inventory**
- **Matched Store Item**: *None found in 14-page inventory PDF*
- **Proposed Action**: SOFT-DEACTIVATE (isActive: false): Archive product without hard-deleting. Preserves historical order references while preventing new customer checkouts.
- **Post-Migration Status**: `isActive: false (Archived)`

### 6. Blueberry Greek Yogurt

- **Database ID / Temp ID**: `6`
- **Current Category**: Dairy, Bread & Eggs
- **Current Listed Price**: ₹18
- **Classification**: **B. Demo / Placeholder Product Not in Real Inventory**
- **Matched Store Item**: *None found in 14-page inventory PDF*
- **Proposed Action**: SOFT-DEACTIVATE (isActive: false): Archive product without hard-deleting. Preserves historical order references while preventing new customer checkouts.
- **Post-Migration Status**: `isActive: false (Archived)`

### 7. Britannia Cheese Slices

- **Database ID / Temp ID**: `7`
- **Current Category**: Dairy, Bread & Eggs
- **Current Listed Price**: ₹24
- **Classification**: **B. Demo / Placeholder Product Not in Real Inventory**
- **Matched Store Item**: *None found in 14-page inventory PDF*
- **Proposed Action**: SOFT-DEACTIVATE (isActive: false): Archive product without hard-deleting. Preserves historical order references while preventing new customer checkouts.
- **Post-Migration Status**: `isActive: false (Archived)`

### 8. Kellogg's Original Cereal

- **Database ID / Temp ID**: `8`
- **Current Category**: Instant Food
- **Current Listed Price**: ₹32
- **Classification**: **B. Demo / Placeholder Product Not in Real Inventory**
- **Matched Store Item**: *None found in 14-page inventory PDF*
- **Proposed Action**: SOFT-DEACTIVATE (isActive: false): Archive product without hard-deleting. Preserves historical order references while preventing new customer checkouts.
- **Post-Migration Status**: `isActive: false (Archived)`

### 9. Slurrp Millet Chocolate

- **Database ID / Temp ID**: `9`
- **Current Category**: Snack & Munchies
- **Current Listed Price**: ₹3
- **Classification**: **B. Demo / Placeholder Product Not in Real Inventory**
- **Matched Store Item**: *None found in 14-page inventory PDF*
- **Proposed Action**: SOFT-DEACTIVATE (isActive: false): Archive product without hard-deleting. Preserves historical order references while preventing new customer checkouts.
- **Post-Migration Status**: `isActive: false (Archived)`

### 10. Amul Roaster Coriander

- **Database ID / Temp ID**: `10`
- **Current Category**: Dairy, Bread & Eggs
- **Current Listed Price**: ₹13
- **Classification**: **B. Demo / Placeholder Product Not in Real Inventory**
- **Matched Store Item**: *None found in 14-page inventory PDF*
- **Proposed Action**: SOFT-DEACTIVATE (isActive: false): Archive product without hard-deleting. Preserves historical order references while preventing new customer checkouts.
- **Post-Migration Status**: `isActive: false (Archived)`

---

## 3. Approval Checklist for Store Owner

Please review and confirm before running the apply command (`node backend/scripts/importInventory.js --apply --target=staging`):

- [ ] Approve soft-deactivation of 7 demo products (Onion Flavour Potato, Salted Instant Popcorn, Kellogg's Cereal, etc.)
- [ ] Approve updating Haldiram's Sev Bhujia, NutriChoice Digestive, and Cadbury 5 Star with their genuine barcodes and prices.
- [ ] Confirm import of 790 new catalog items across 16 grocery departments.
