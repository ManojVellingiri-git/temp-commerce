/* ============================================================
   Gurkhacamp Admin — demo data layer
   Synchronized 1:1 with Storefront Products & Cloudflare R2
   ============================================================ */

const SEED = {
  store: {
    name: "Gurkhahills Shopping Complex",
    tagline: "Farm-fresh groceries, everyday essentials & lifestyle goods",
    currency: "₹",
    themeColor: "#123D2A"
  },

  cloudflare: {
    enabled: true,
    r2PublicDomain: "https://pub-r2.gurkhahills.com",
    bucketName: "gurkhahills-products",
    uploadEndpoint: ""
  },

  categories: [
    { id: "c1", name: "Fruits",               products: 4, active: true },
    { id: "c2", name: "Vegetables",           products: 3, active: true },
    { id: "c3", name: "Dairy & Eggs",         products: 2, active: true },
    { id: "c4", name: "Bakery",               products: 1, active: true },
    { id: "c5", name: "Meat & Seafood",       products: 1, active: true },
    { id: "c6", name: "Snacks",               products: 2, active: true },
    { id: "c7", name: "Beverages",            products: 1, active: true },
    { id: "c8", name: "Organic Products",     products: 1, active: true },
    { id: "c9", name: "Household Essentials", products: 1, active: true }
  ],

  products: [
    {
      id: "fc-01",
      name: "Alphonso Mango",
      subtitle: "Ratnagiri GI-Tagged Devgad Orchard",
      sku: "FRT-MNG-01",
      category: "Fruits",
      secondaryCategory: "Organic Products",
      price: 349,
      originalPrice: 420,
      discount: "17% OFF",
      stock: 45,
      status: "active",
      icon: "🥭",
      image: "/images/prod_mango.webp",
      weight: "6 pcs (1.2 kg)",
      weightOptions: ["3 pcs (600 g)", "6 pcs (1.2 kg)", "12 pcs Box (2.4 kg)"],
      badge: "GI Tagged",
      rating: 4.9,
      reviews: 342,
      isOrganic: true,
      isBestSeller: true,
      harvestTime: "Picked 6h ago • Ratnagiri",
      calories: "60 kcal / 100g",
      shelfLife: "5 Days at Room Temp",
      description: "Naturally carbide-free, sun-ripened Ratnagiri Alphonso mangoes packed in breathable hay boxes. Intense saffron pulp with honeyed floral aroma."
    },
    {
      id: "fc-02",
      name: "Fresh Strawberries",
      subtitle: "Mahabaleshwar High-Altitude Sweet Charlie",
      sku: "FRT-STR-02",
      category: "Fruits",
      secondaryCategory: "Fruits",
      price: 189,
      originalPrice: 240,
      discount: "21% OFF",
      stock: 60,
      status: "active",
      icon: "🍓",
      image: "/images/prod_strawberries.webp",
      weight: "250 g Punnet",
      weightOptions: ["250 g Punnet", "500 g Twin Pack"],
      badge: "Hand Picked",
      rating: 4.8,
      reviews: 218,
      isOrganic: true,
      isBestSeller: true,
      harvestTime: "Picked 4h ago • Panchgani",
      calories: "32 kcal / 100g",
      shelfLife: "4 Days Refrigerated",
      description: "Ruby-red, jewel-like berries harvested before sunrise in Panchgani hills to lock in natural Brix sweetness and crisp snap."
    },
    {
      id: "fc-03",
      name: "Organic Bananas",
      subtitle: "Sirumalai Hill Estate Yelakki & Robusta",
      sku: "FRT-BAN-03",
      category: "Fruits",
      secondaryCategory: "Organic Products",
      price: 65,
      originalPrice: 80,
      discount: "19% OFF",
      stock: 120,
      status: "active",
      icon: "🍌",
      image: "/images/prod_bananas.webp",
      weight: "6 pcs (550 g)",
      weightOptions: ["6 pcs (550 g)", "12 pcs (1.1 kg)"],
      badge: "100% Organic",
      rating: 4.9,
      reviews: 512,
      isOrganic: true,
      isBestSeller: false,
      harvestTime: "Picked 5h ago • Pollachi",
      calories: "89 kcal / 100g",
      shelfLife: "4 Days Countertop",
      description: "Creamy, aromatic organic bananas ripened naturally in clay-lined chambers without ethylene sprays."
    },
    {
      id: "fc-04",
      name: "Avocado",
      subtitle: "Creamy Kodaikanal Hass Avocado",
      sku: "FRT-AVO-04",
      category: "Fruits",
      secondaryCategory: "Vegetables",
      price: 249,
      originalPrice: 310,
      discount: "20% OFF",
      stock: 35,
      status: "active",
      icon: "🥑",
      image: "/images/prod_avocado.webp",
      weight: "2 pcs (400 g)",
      weightOptions: ["1 pc (200 g)", "2 pcs (400 g)", "4 pcs (800 g)"],
      badge: "Ready to Eat",
      rating: 4.8,
      reviews: 289,
      isOrganic: true,
      isBestSeller: true,
      harvestTime: "Picked 8h ago • Kodaikanal",
      calories: "160 kcal / 100g",
      shelfLife: "3–5 Days",
      description: "Buttery, nutty Hass avocados ultrasound-checked for zero internal bruising and guaranteed emerald-gold flesh."
    },
    {
      id: "fc-05",
      name: "Farm Fresh Tomatoes",
      subtitle: "Vine-Ripened Heirloom Crimson Cluster",
      sku: "VEG-TOM-05",
      category: "Vegetables",
      secondaryCategory: "Organic Products",
      price: 48,
      originalPrice: 65,
      discount: "26% OFF",
      stock: 150,
      status: "active",
      icon: "🍅",
      image: "/images/prod_tomatoes.webp",
      weight: "500 g Vine Pack",
      weightOptions: ["500 g Vine Pack", "1 kg Family Pack"],
      badge: "Vine Attached",
      rating: 4.7,
      reviews: 410,
      isOrganic: true,
      isBestSeller: false,
      harvestTime: "Picked 3h ago • Ooty Foot-hills",
      calories: "18 kcal / 100g",
      shelfLife: "6 Days",
      description: "Kept on the living green vine for rich lycopene depth, balanced acidity, and garden-fresh tomato fragrance."
    },
    {
      id: "fc-06",
      name: "Green Spinach",
      subtitle: "Zero-Soil Hydroponic Tender Baby Palak",
      sku: "VEG-SPN-06",
      category: "Vegetables",
      secondaryCategory: "Organic Products",
      price: 45,
      originalPrice: 60,
      discount: "25% OFF",
      stock: 80,
      status: "active",
      icon: "🥬",
      image: "/images/prod_spinach.webp",
      weight: "250 g Bunch",
      weightOptions: ["250 g Bunch", "500 g Chef Pack"],
      badge: "Hydroponic",
      rating: 4.9,
      reviews: 376,
      isOrganic: true,
      isBestSeller: true,
      harvestTime: "Picked 2h ago • Nilgiris",
      calories: "23 kcal / 100g",
      shelfLife: "5 Days Chilled",
      description: "Triple-washed in ozonated spring water. Crisp, sweet baby spinach leaves ready straight for salads or flash-wilting."
    },
    {
      id: "fc-07",
      name: "Fresh Broccoli",
      subtitle: "Highland Dense Emerald Florets",
      sku: "VEG-BRO-07",
      category: "Vegetables",
      secondaryCategory: "Vegetables",
      price: 79,
      originalPrice: 99,
      discount: "20% OFF",
      stock: 40,
      status: "active",
      icon: "🥦",
      image: "/images/prod_broccoli.webp",
      weight: "1 Crown (350 g)",
      weightOptions: ["1 Crown (350 g)", "2 Crowns (700 g)"],
      badge: "Cold Mist",
      rating: 4.8,
      reviews: 194,
      isOrganic: false,
      isBestSeller: false,
      harvestTime: "Picked 4h ago • Ooty",
      calories: "34 kcal / 100g",
      shelfLife: "6 Days Chilled",
      description: "Tightly beaded dark-green broccoli crowns transported in misted 4°C crates for maximum crunch and sulforaphane nutrition."
    },
    {
      id: "fc-08",
      name: "Full Cream Milk",
      subtitle: "Single-Herd Gir Cow A2 Glass Bottle",
      sku: "DRY-MLK-08",
      category: "Dairy & Eggs",
      secondaryCategory: "Organic Products",
      price: 95,
      originalPrice: 110,
      discount: "14% OFF",
      stock: 25,
      status: "low",
      icon: "🥛",
      image: "/images/prod_milk.webp",
      weight: "1 Litre Bottle",
      weightOptions: ["500 ml Bottle", "1 Litre Bottle", "2 x 1 Litre"],
      badge: "A2 Certified",
      rating: 4.9,
      reviews: 628,
      isOrganic: true,
      isBestSeller: true,
      harvestTime: "Milked 3:30 AM Today",
      calories: "67 kcal / 100ml",
      shelfLife: "2 Days Chilled",
      description: "Un-homogenized, slow-pasteurized A2 full cream milk with a thick golden malai cream layer, bottled in reusable sterilized glass."
    },
    {
      id: "fc-09",
      name: "Farm Eggs",
      subtitle: "Pasture-Raised Herbal Feed Brown Eggs",
      sku: "DRY-EGG-09",
      category: "Dairy & Eggs",
      secondaryCategory: "Dairy & Eggs",
      price: 115,
      originalPrice: 135,
      discount: "15% OFF",
      stock: 75,
      status: "active",
      icon: "🥚",
      image: "/images/prod_eggs.webp",
      weight: "6 pcs Carton",
      weightOptions: ["6 pcs Carton", "12 pcs Value Box"],
      badge: "Deep Orange Yolk",
      rating: 4.8,
      reviews: 445,
      isOrganic: true,
      isBestSeller: false,
      harvestTime: "Laid Within 24 Hours",
      calories: "155 kcal / 100g",
      shelfLife: "14 Days Chilled",
      description: "From free-foraging hens fed flaxseed, turmeric, and marigold petals—producing rich, tall amber yolks and hormone-free protein."
    },
    {
      id: "fc-10",
      name: "Sourdough Bread",
      subtitle: "36-Hour Wild Levain Country Boule",
      sku: "BKY-SRD-10",
      category: "Bakery",
      secondaryCategory: "Bakery",
      price: 220,
      originalPrice: 260,
      discount: "15% OFF",
      stock: 18,
      status: "active",
      icon: "🥖",
      image: "/images/prod_sourdough.webp",
      weight: "450 g Loaf",
      weightOptions: ["450 g Whole Loaf", "450 g Thick Sliced"],
      badge: "Baked 5 AM",
      rating: 5.0,
      reviews: 312,
      isOrganic: true,
      isBestSeller: true,
      harvestTime: "Stone Oven • Batch #14",
      calories: "230 kcal / 100g",
      shelfLife: "4 Days",
      description: "Crackling caramelized blistered crust with an open, custard-soft crumb crafted from unbleached stoneground wheat, sea salt, and wild starter."
    },
    {
      id: "fc-11",
      name: "Fresh Orange Juice",
      subtitle: "100% Cold-Pressed Valencia & Kinnow",
      sku: "BEV-ORJ-11",
      category: "Beverages",
      secondaryCategory: "Beverages",
      price: 165,
      originalPrice: 199,
      discount: "17% OFF",
      stock: 32,
      status: "active",
      icon: "🍊",
      image: "/images/prod_oj.webp",
      weight: "500 ml Glass Jar",
      weightOptions: ["250 ml Bottle", "500 ml Glass Jar", "1 Litre Carafe"],
      badge: "Zero Sugar Added",
      rating: 4.9,
      reviews: 274,
      isOrganic: true,
      isBestSeller: true,
      harvestTime: "Pressed 6 AM Today",
      calories: "45 kcal / 100ml",
      shelfLife: "48 Hours Chilled",
      description: "Hydraulic cold-pressed from 1.4 kg of sun-drenched oranges per jar. No water, no preservatives, no heat pasteurization."
    },
    {
      id: "fc-12",
      name: "Premium Almonds",
      subtitle: "King-Size California Sonora Nonpareil",
      sku: "SNK-ALM-12",
      category: "Snacks",
      secondaryCategory: "Organic Products",
      price: 320,
      originalPrice: 390,
      discount: "18% OFF",
      stock: 65,
      status: "active",
      icon: "🥜",
      image: "/images/prod_almonds.webp",
      weight: "250 g Glass Jar",
      weightOptions: ["250 g Glass Jar", "500 g Refill Pouch"],
      badge: "Jumbo Grade",
      rating: 4.9,
      reviews: 389,
      isOrganic: true,
      isBestSeller: true,
      harvestTime: "New Crop • Vacuum Sealed",
      calories: "579 kcal / 100g",
      shelfLife: "6 Months",
      description: "Sweet, thin-skinned jumbo almonds with high natural vitamin E oil content and an unmistakable crisp snap."
    },
    {
      id: "fc-13",
      name: "Wild Norwegian Salmon",
      subtitle: "Chilled Atlantic Fillet • Skin-On Center Cut",
      sku: "SEA-SAL-13",
      category: "Meat & Seafood",
      price: 649,
      originalPrice: 790,
      discount: "18% OFF",
      stock: 12,
      status: "low",
      icon: "🐟",
      image: "/images/prod_salmon.webp",
      weight: "250 g Fillet",
      weightOptions: ["250 g Fillet", "500 g Chef Cut"],
      badge: "Sashimi Grade",
      rating: 4.9,
      reviews: 167,
      isOrganic: false,
      isBestSeller: true,
      harvestTime: "0–2°C Ice-Bed Air Freight",
      calories: "208 kcal / 100g",
      shelfLife: "3 Days Chilled",
      description: "Air-flown, never-frozen Norwegian salmon fillet with delicate white omega-3 marbling and pin-bone-removed precision trim."
    },
    {
      id: "fc-14",
      name: "Truffle Roasted Makhana",
      subtitle: "Slow-Popped Mithila Fox Nuts & Olive Oil",
      sku: "SNK-MKH-14",
      category: "Snacks",
      secondaryCategory: "Snacks",
      price: 149,
      originalPrice: 185,
      discount: "19% OFF",
      stock: 90,
      status: "active",
      icon: "🍿",
      image: "/images/prod_makhana.webp",
      weight: "100 g Canister",
      weightOptions: ["100 g Canister", "2 x 100 g Duo"],
      badge: "Guilt-Free Crunch",
      rating: 4.8,
      reviews: 231,
      isOrganic: true,
      isBestSeller: false,
      harvestTime: "Small-Batch Roasted",
      calories: "347 kcal / 100g",
      shelfLife: "90 Days",
      description: "GI-tagged Bihar lotus seeds tumbled in cold-pressed extra virgin olive oil, black summer truffle sea salt, and cracked pepper."
    },
    {
      id: "fc-15",
      name: "Heirloom Rainbow Carrots",
      subtitle: "Purple, Amber & Sweet Nantes Bunch",
      sku: "ORG-CAR-15",
      category: "Organic Products",
      secondaryCategory: "Vegetables",
      price: 89,
      originalPrice: 115,
      discount: "23% OFF",
      stock: 55,
      status: "active",
      icon: "🥕",
      image: "/images/prod_carrots.webp",
      weight: "400 g with Tops",
      weightOptions: ["400 g with Tops", "800 g Bunch"],
      badge: "Biodynamic",
      rating: 4.9,
      reviews: 158,
      isOrganic: true,
      isBestSeller: false,
      harvestTime: "Picked 4h ago • Ketti Valley",
      calories: "41 kcal / 100g",
      shelfLife: "7 Days Chilled",
      description: "Anthocyanin-rich purple and beta-carotene gold heirloom carrots pulled from volcanic mountain loam with feathery green tops intact."
    },
    {
      id: "fc-16",
      name: "Botanical Produce & Dish Wash",
      subtitle: "Nilgiri Eucalyptus & Soapnut Concentrate",
      sku: "HHE-WSH-16",
      category: "Household Essentials",
      secondaryCategory: "Organic Products",
      price: 275,
      originalPrice: 340,
      discount: "19% OFF",
      stock: 42,
      status: "active",
      icon: "🌿",
      image: "/images/prod_household.webp",
      weight: "500 ml Amber Glass",
      weightOptions: ["500 ml Amber Glass", "1 Litre Refill"],
      badge: "100% Plant Active",
      rating: 4.8,
      reviews: 204,
      isOrganic: true,
      isBestSeller: false,
      harvestTime: "Zero Sulfates • Refillable",
      calories: "Non-Toxic Food Safe",
      shelfLife: "24 Months",
      description: "Food-grade organic soapnut and steam-distilled Nilgiri eucalyptus wash that removes surface wax from produce and leaves dishes gleaming."
    }
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
    { text:"New product <b>Botanical Produce & Dish Wash</b> saved as active", time:"42 min ago" },
    { text:"Stock alert: <b>Full Cream Milk 1L</b> fell below threshold (25 left)", time:"1 hr ago" },
    { text:"New bulk order placed from RS Puram", time:"3 hr ago" },
    { text:"New customer <b>Rahul Dev</b> signed up", time:"Yesterday" }
  ],

  weeklySales: [
    { d:"Mon", v:38 }, { d:"Tue", v:52 }, { d:"Wed", v:41 }, { d:"Thu", v:63 },
    { d:"Fri", v:77 }, { d:"Sat", v:94 }, { d:"Sun", v:68 }
  ]
};

/* simple persisted store so edits in the demo UI survive a refresh and sync to storefront */
const Store = {
  key: "gurkhacamp_admin_demo_v4",
  load(){
    try{
      const raw = localStorage.getItem(this.key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.products) && parsed.products.length > 0) {
          if (!parsed.cloudflare) parsed.cloudflare = { ...SEED.cloudflare };
          // Ensure icons / images exist
          parsed.products.forEach(p => {
            const seedMatch = SEED.products.find(s => s.id === p.id);
            if (seedMatch) {
              if (!p.image) p.image = seedMatch.image;
              if (!p.icon) p.icon = seedMatch.icon;
              if (!p.subtitle) p.subtitle = seedMatch.subtitle;
              if (!p.weight) p.weight = seedMatch.weight;
              if (!p.weightOptions) p.weightOptions = seedMatch.weightOptions;
            }
          });
          return parsed;
        }
      }
    }catch(e){}
    const initial = JSON.parse(JSON.stringify(SEED));
    try{ localStorage.setItem(this.key, JSON.stringify(initial)); }catch(e){}
    return initial;
  },
  save(data){
    try{
      localStorage.setItem(this.key, JSON.stringify(data));
      // Dispatch storage event manually for same-window listeners
      window.dispatchEvent(new Event('storage'));
    }catch(e){}
  },
  reset(){
    localStorage.removeItem(this.key);
    location.reload();
  }
};

let DB = Store.load();
function persist(){ Store.save(DB); }
