/* ============================================================
   Gurkhacamp Admin — demo data layer
   Swap the functions in js/api.js for real fetch() calls to your
   backend; everything else in the UI reads through that file.
   ============================================================ */

const SEED = {
  store: {
    name: "Gurkhacamp Shopping Complex",
    tagline: "Farm-fresh groceries, everyday essentials & lifestyle goods",
    currency: "₹",
    themeColor: "#123D2A"
  },

  categories: [
    { id: "c1", name: "Fruits & Vegetables", products: 42, active: true },
    { id: "c2", name: "Dairy & Bakery",       products: 27, active: true },
    { id: "c3", name: "Staples & Grains",     products: 35, active: true },
    { id: "c4", name: "Snacks & Beverages",   products: 51, active: true },
    { id: "c5", name: "Household Essentials", products: 23, active: true },
    { id: "c6", name: "Personal Care",        products: 19, active: false }
  ],

  products: [
    { id:"P-1001", name:"Fresh Alphonso Mangoes", sku:"FRT-MNG-01", category:"Fruits & Vegetables", price:420, stock:86,  status:"active",   icon:"🥭", image:"/images/prod_mango.webp" },
    { id:"P-1002", name:"Organic Tomatoes 1kg",   sku:"VEG-TOM-02", category:"Fruits & Vegetables", price:60,  stock:140, status:"active",   icon:"🍅", image:"/images/prod_tomatoes.webp" },
    { id:"P-1003", name:"Toned Milk 1L",          sku:"DRY-MLK-03", category:"Dairy & Bakery",      price:58,  stock:5,   status:"low",      icon:"🥛", image:"/images/prod_milk.webp" },
    { id:"P-1004", name:"Whole Wheat Bread",      sku:"BKY-BRD-04", category:"Dairy & Bakery",      price:45,  stock:0,   status:"out",      icon:"🍞", image:"/images/prod_sourdough.webp" },
    { id:"P-1005", name:"Basmati Rice 5kg",       sku:"STP-RCE-05", category:"Staples & Grains",    price:620, stock:48,  status:"active",   icon:"🍚", image:"/images/prod_makhana.webp" },
    { id:"P-1006", name:"Toor Dal 1kg",           sku:"STP-DAL-06", category:"Staples & Grains",    price:150, stock:72,  status:"active",   icon:"🫘", image:"/images/prod_almonds.webp" },
    { id:"P-1007", name:"Masala Chips 150g",      sku:"SNK-CHP-07", category:"Snacks & Beverages",  price:40,  stock:210, status:"active",   icon:"🍟", image:"/images/prod_carrots.webp" },
    { id:"P-1008", name:"Filter Coffee 500g",     sku:"BEV-COF-08", category:"Snacks & Beverages",  price:260, stock:33,  status:"active",   icon:"☕", image:"/images/prod_strawberries.webp" },
    { id:"P-1009", name:"Dish Wash Liquid 1L",    sku:"HHE-DSH-09", category:"Household Essentials",price:130, stock:18,  status:"active",   icon:"🧴", image:"/images/prod_household.webp" },
    { id:"P-1010", name:"Herbal Shampoo 340ml",   sku:"PCR-SHM-10", category:"Personal Care",       price:210, stock:0,   status:"draft",    icon:"🧴", image:"/images/prod_household.webp" }
  ],

  orders: [
    { id:"GC-98231", customer:"Arun Kumar",     items:4, total:1240, status:"delivered",  payment:"Paid",    date:"2026-11-11" },
    { id:"GC-98230", customer:"Divya Sri",      items:2, total:380,  status:"processing", payment:"Paid",    date:"2026-11-11" },
    { id:"GC-98229", customer:"Mohammed Faisal",items:7, total:2150, status:"shipped",    payment:"Paid",    date:"2026-11-10" },
    { id:"GC-98228", customer:"Lakshmi Priya",  items:1, total:150,  status:"cancelled",  payment:"Refunded",date:"2026-11-10" },
    { id:"GC-98227", customer:"Rahul Dev",      items:5, total:980,  status:"pending",    payment:"Unpaid",  date:"2026-11-09" },
    { id:"GC-98226", customer:"Sanjana R",      items:3, total:640,  status:"delivered",  payment:"Paid",    date:"2026-11-09" },
    { id:"GC-98225", customer:"Karthik B",      items:6, total:1875, status:"delivered",  payment:"Paid",    date:"2026-11-08" }
  ],

  customers: [
    { id:"U-401", name:"Arun Kumar",      email:"arun.kumar@example.com",    orders:14, spent:18240, joined:"2025-02-14", status:"active" },
    { id:"U-402", name:"Divya Sri",       email:"divya.sri@example.com",     orders:6,  spent:5420,  joined:"2025-05-02", status:"active" },
    { id:"U-403", name:"Mohammed Faisal", email:"m.faisal@example.com",      orders:21, spent:30110, joined:"2024-11-20", status:"active" },
    { id:"U-404", name:"Lakshmi Priya",   email:"lakshmi.p@example.com",     orders:2,  spent:430,   joined:"2026-09-30", status:"blocked" },
    { id:"U-405", name:"Rahul Dev",       email:"rahul.dev@example.com",     orders:9,  spent:9870,  joined:"2025-08-11", status:"active" }
  ],

  activity: [
    { text:"Order <b>GC-98231</b> marked as delivered", time:"8 min ago" },
    { text:"New product <b>Herbal Shampoo 340ml</b> saved as draft", time:"42 min ago" },
    { text:"Stock alert: <b>Toned Milk 1L</b> fell below threshold (5 left)", time:"1 hr ago" },
    { text:"New bulk order placed from RS Puram", time:"3 hr ago" },
    { text:"New customer <b>Rahul Dev</b> signed up", time:"Yesterday" }
  ],

  weeklySales: [
    { d:"Mon", v:38 }, { d:"Tue", v:52 }, { d:"Wed", v:41 }, { d:"Thu", v:63 },
    { d:"Fri", v:77 }, { d:"Sat", v:94 }, { d:"Sun", v:68 }
  ]
};

/* simple persisted store so edits in the demo UI survive a refresh */
const Store = {
  key: "gurkhacamp_admin_demo_v2",
  load(){
    try{
      const raw = localStorage.getItem(this.key) || localStorage.getItem("gurkhacamp_admin_demo_v1");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.products)) {
          parsed.products.forEach(p => {
            if (!p.image) {
              const seedMatch = SEED.products.find(s => s.id === p.id);
              if (seedMatch && seedMatch.image) p.image = seedMatch.image;
            }
          });
        }
        return parsed;
      }
    }catch(e){}
    return JSON.parse(JSON.stringify(SEED));
  },
  save(data){
    try{ localStorage.setItem(this.key, JSON.stringify(data)); }catch(e){}
  },
  reset(){
    localStorage.removeItem(this.key);
    location.reload();
  }
};

let DB = Store.load();
function persist(){ Store.save(DB); }
