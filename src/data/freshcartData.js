export const STUDIO_ASSETS = {
  scene_hero: "/images/scene_hero.webp",
  scene_campaign: "/images/scene_campaign.webp",
  scene_seasonal: "/images/scene_seasonal.webp",
  scene_bakery: "/images/scene_bakery.webp",
  prod_mango: "/images/prod_mango.webp",
  prod_strawberries: "/images/prod_strawberries.webp",
  prod_bananas: "/images/prod_bananas.webp",
  prod_avocado: "/images/prod_avocado.webp",
  prod_tomatoes: "/images/prod_tomatoes.webp",
  prod_spinach: "/images/prod_spinach.webp",
  prod_broccoli: "/images/prod_broccoli.webp",
  prod_milk: "/images/prod_milk.webp",
  prod_eggs: "/images/prod_eggs.webp",
  prod_sourdough: "/images/prod_sourdough.webp",
  prod_oj: "/images/prod_oj.webp",
  prod_almonds: "/images/prod_almonds.webp",
  prod_salmon: "/images/prod_salmon.webp",
  prod_makhana: "/images/prod_makhana.webp",
  prod_carrots: "/images/prod_carrots.webp",
  prod_household: "/images/prod_household.webp"
};

export const SCENE_IMAGES = {
  hero: STUDIO_ASSETS.scene_hero,
  campaign: STUDIO_ASSETS.scene_campaign,
  seasonal: STUDIO_ASSETS.scene_seasonal,
  bakery: STUDIO_ASSETS.scene_bakery,
};

export const CATEGORIES = [
  {
    id: 'Fruits',
    name: 'Fruits',
    subtitle: 'Orchard-ripened & GI-tagged harvest',
    count: '38 Varieties',
    badge: 'Peak Season',
    accent: '#C7F36B',
    span: 'lg:col-span-4',
    image: STUDIO_ASSETS.prod_mango,
    description: 'Hand-selected mangoes, Mahabaleshwar berries, and sun-ripened tropical fruit.'
  },
  {
    id: 'Vegetables',
    name: 'Vegetables',
    subtitle: 'Hydroponic greens & heirloom roots',
    count: '54 Varieties',
    badge: '4 AM Harvest',
    accent: '#48A85A',
    span: 'lg:col-span-4',
    image: STUDIO_ASSETS.prod_tomatoes,
    description: 'Dewy vine tomatoes, crisp broccoli crowns, and pesticide-free leafy greens.'
  },
  {
    id: 'Dairy & Eggs',
    name: 'Dairy & Eggs',
    subtitle: 'Single-origin A2 milk & pasture eggs',
    count: '26 Varieties',
    badge: '4°C Cold Chain',
    accent: '#F8F7EF',
    span: 'lg:col-span-4',
    image: STUDIO_ASSETS.prod_milk,
    description: 'Glass-bottled farm milk, cultured artisanal butter, and free-range brown eggs.'
  },
  {
    id: 'Bakery',
    name: 'Bakery',
    subtitle: '36-hour slow-fermented loaves',
    count: '19 Varieties',
    badge: 'Baked 5 AM',
    accent: '#C7F36B',
    span: 'lg:col-span-3',
    image: STUDIO_ASSETS.prod_sourdough,
    description: 'Stone-hearth country sourdough, brioche, and sprouted whole-grain boules.'
  },
  {
    id: 'Meat & Seafood',
    name: 'Meat & Seafood',
    subtitle: 'Sashimi-grade & coastal day-boat catch',
    count: '22 Varieties',
    badge: 'Never Frozen',
    accent: '#48A85A',
    span: 'lg:col-span-3',
    image: STUDIO_ASSETS.prod_salmon,
    description: 'Wild Norwegian salmon fillets, Cochin tiger prawns, and pasture-raised poultry.'
  },
  {
    id: 'Snacks',
    name: 'Snacks',
    subtitle: 'Roasted fox nuts & California nuts',
    count: '42 Varieties',
    badge: 'Zero Trans-Fat',
    accent: '#C7F36B',
    span: 'lg:col-span-3',
    image: STUDIO_ASSETS.prod_makhana,
    description: 'Himalayan truffle makhana, Sonora almonds, and small-batch roasted trail mixes.'
  },
  {
    id: 'Beverages',
    name: 'Beverages',
    subtitle: 'Raw cold-pressed juices & kombucha',
    count: '31 Varieties',
    badge: 'Raw Pressed',
    accent: '#48A85A',
    span: 'lg:col-span-3',
    image: STUDIO_ASSETS.prod_oj,
    description: 'Unpasteurized Valencia orange juice, tender coconut water, and botanical tonics.'
  },
  {
    id: 'Organic Products',
    name: 'Organic Products',
    subtitle: '100% NPOP & USDA certified biodynamic',
    count: '64 Varieties',
    badge: 'Lab Tested',
    accent: '#C7F36B',
    span: 'lg:col-span-6',
    image: STUDIO_ASSETS.prod_carrots,
    description: 'Traceable single-estate produce grown in living soil without synthetic inputs.'
  },
  {
    id: 'Household Essentials',
    name: 'Household Essentials',
    subtitle: 'Plant-derived, refillable home care',
    count: '28 Varieties',
    badge: 'Botanical Safe',
    accent: '#48A85A',
    span: 'lg:col-span-6',
    image: STUDIO_ASSETS.prod_household,
    description: 'Eucalyptus produce washes, amber glass surface sprays, and unbleached kitchen linens.'
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: 'fc-01',
    name: 'Alphonso Mango',
    subtitle: 'Ratnagiri GI-Tagged Devgad Orchard',
    category: 'Fruits',
    secondaryCategory: 'Organic Products',
    weight: '6 pcs (1.2 kg)',
    weightOptions: ['3 pcs (600 g)', '6 pcs (1.2 kg)', '12 pcs Box (2.4 kg)'],
    price: 349,
    originalPrice: 420,
    discount: '17% OFF',
    rating: 4.9,
    reviews: 342,
    badge: 'GI Tagged',
    isOrganic: true,
    isBestSeller: true,
    harvestTime: 'Picked 6h ago • Ratnagiri',
    calories: '60 kcal / 100g',
    shelfLife: '5 Days at Room Temp',
    image: STUDIO_ASSETS.prod_mango,
    description: 'Naturally carbide-free, sun-ripened Ratnagiri Alphonso mangoes packed in breathable hay boxes. Intense saffron pulp with honeyed floral aroma.'
  },
  {
    id: 'fc-02',
    name: 'Fresh Strawberries',
    subtitle: 'Mahabaleshwar High-Altitude Sweet Charlie',
    category: 'Fruits',
    secondaryCategory: 'Fruits',
    weight: '250 g Punnet',
    weightOptions: ['250 g Punnet', '500 g Twin Pack'],
    price: 189,
    originalPrice: 240,
    discount: '21% OFF',
    rating: 4.8,
    reviews: 218,
    badge: 'Hand Picked',
    isOrganic: true,
    isBestSeller: true,
    harvestTime: 'Picked 4h ago • Panchgani',
    calories: '32 kcal / 100g',
    shelfLife: '4 Days Refrigerated',
    image: STUDIO_ASSETS.prod_strawberries,
    description: 'Ruby-red, jewel-like berries harvested before sunrise in Panchgani hills to lock in natural Brix sweetness and crisp snap.'
  },
  {
    id: 'fc-03',
    name: 'Organic Bananas',
    subtitle: 'Sirumalai Hill Estate Yelakki & Robusta',
    category: 'Fruits',
    secondaryCategory: 'Organic Products',
    weight: '6 pcs (550 g)',
    weightOptions: ['6 pcs (550 g)', '12 pcs (1.1 kg)'],
    price: 65,
    originalPrice: 80,
    discount: '19% OFF',
    rating: 4.9,
    reviews: 512,
    badge: '100% Organic',
    isOrganic: true,
    isBestSeller: false,
    harvestTime: 'Picked 5h ago • Pollachi',
    calories: '89 kcal / 100g',
    shelfLife: '4 Days Countertop',
    image: STUDIO_ASSETS.prod_bananas,
    description: 'Creamy, aromatic organic bananas ripened naturally in clay-lined chambers without ethylene sprays.'
  },
  {
    id: 'fc-04',
    name: 'Avocado',
    subtitle: 'Creamy Kodaikanal Hass Avocado',
    category: 'Fruits',
    secondaryCategory: 'Vegetables',
    weight: '2 pcs (400 g)',
    weightOptions: ['1 pc (200 g)', '2 pcs (400 g)', '4 pcs (800 g)'],
    price: 249,
    originalPrice: 310,
    discount: '20% OFF',
    rating: 4.8,
    reviews: 289,
    badge: 'Ready to Eat',
    isOrganic: true,
    isBestSeller: true,
    harvestTime: 'Picked 8h ago • Kodaikanal',
    calories: '160 kcal / 100g',
    shelfLife: '3–5 Days',
    image: STUDIO_ASSETS.prod_avocado,
    description: 'Buttery, nutty Hass avocados ultrasound-checked for zero internal bruising and guaranteed emerald-gold flesh.'
  },
  {
    id: 'fc-05',
    name: 'Farm Fresh Tomatoes',
    subtitle: 'Vine-Ripened Heirloom Crimson Cluster',
    category: 'Vegetables',
    secondaryCategory: 'Organic Products',
    weight: '500 g Vine Pack',
    weightOptions: ['500 g Vine Pack', '1 kg Family Pack'],
    price: 48,
    originalPrice: 65,
    discount: '26% OFF',
    rating: 4.7,
    reviews: 410,
    badge: 'Vine Attached',
    isOrganic: true,
    isBestSeller: false,
    harvestTime: 'Picked 3h ago • Ooty Foot-hills',
    calories: '18 kcal / 100g',
    shelfLife: '6 Days',
    image: STUDIO_ASSETS.prod_tomatoes,
    description: 'Kept on the living green vine for rich lycopene depth, balanced acidity, and garden-fresh tomato fragrance.'
  },
  {
    id: 'fc-06',
    name: 'Green Spinach',
    subtitle: 'Zero-Soil Hydroponic Tender Baby Palak',
    category: 'Vegetables',
    secondaryCategory: 'Organic Products',
    weight: '250 g Bunch',
    weightOptions: ['250 g Bunch', '500 g Chef Pack'],
    price: 45,
    originalPrice: 60,
    discount: '25% OFF',
    rating: 4.9,
    reviews: 376,
    badge: 'Hydroponic',
    isOrganic: true,
    isBestSeller: true,
    harvestTime: 'Picked 2h ago • Nilgiris',
    calories: '23 kcal / 100g',
    shelfLife: '5 Days Chilled',
    image: STUDIO_ASSETS.prod_spinach,
    description: 'Triple-washed in ozonated spring water. Crisp, sweet baby spinach leaves ready straight for salads or flash-wilting.'
  },
  {
    id: 'fc-07',
    name: 'Fresh Broccoli',
    subtitle: 'Highland Dense Emerald Florets',
    category: 'Vegetables',
    secondaryCategory: 'Vegetables',
    weight: '1 Crown (350 g)',
    weightOptions: ['1 Crown (350 g)', '2 Crowns (700 g)'],
    price: 79,
    originalPrice: 99,
    discount: '20% OFF',
    rating: 4.8,
    reviews: 194,
    badge: 'Cold Mist',
    isOrganic: false,
    isBestSeller: false,
    harvestTime: 'Picked 4h ago • Ooty',
    calories: '34 kcal / 100g',
    shelfLife: '6 Days Chilled',
    image: STUDIO_ASSETS.prod_broccoli,
    description: 'Tightly beaded dark-green broccoli crowns transported in misted 4°C crates for maximum crunch and sulforaphane nutrition.'
  },
  {
    id: 'fc-08',
    name: 'Full Cream Milk',
    subtitle: 'Single-Herd Gir Cow A2 Glass Bottle',
    category: 'Dairy & Eggs',
    secondaryCategory: 'Organic Products',
    weight: '1 Litre Bottle',
    weightOptions: ['500 ml Bottle', '1 Litre Bottle', '2 x 1 Litre'],
    price: 95,
    originalPrice: 110,
    discount: '14% OFF',
    rating: 4.9,
    reviews: 628,
    badge: 'A2 Certified',
    isOrganic: true,
    isBestSeller: true,
    harvestTime: 'Milked 3:30 AM Today',
    calories: '67 kcal / 100ml',
    shelfLife: '2 Days Chilled',
    image: STUDIO_ASSETS.prod_milk,
    description: 'Un-homogenized, slow-pasteurized A2 full cream milk with a thick golden malai cream layer, bottled in reusable sterilized glass.'
  },
  {
    id: 'fc-09',
    name: 'Farm Eggs',
    subtitle: 'Pasture-Raised Herbal Feed Brown Eggs',
    category: 'Dairy & Eggs',
    secondaryCategory: 'Dairy & Eggs',
    weight: '6 pcs Carton',
    weightOptions: ['6 pcs Carton', '12 pcs Value Box'],
    price: 115,
    originalPrice: 135,
    discount: '15% OFF',
    rating: 4.8,
    reviews: 445,
    badge: 'Deep Orange Yolk',
    isOrganic: true,
    isBestSeller: false,
    harvestTime: 'Laid Within 24 Hours',
    calories: '155 kcal / 100g',
    shelfLife: '14 Days Chilled',
    image: STUDIO_ASSETS.prod_eggs,
    description: 'From free-foraging hens fed flaxseed, turmeric, and marigold petals—producing rich, tall amber yolks and hormone-free protein.'
  },
  {
    id: 'fc-10',
    name: 'Sourdough Bread',
    subtitle: '36-Hour Wild Levain Country Boule',
    category: 'Bakery',
    secondaryCategory: 'Bakery',
    weight: '450 g Loaf',
    weightOptions: ['450 g Whole Loaf', '450 g Thick Sliced'],
    price: 220,
    originalPrice: 260,
    discount: '15% OFF',
    rating: 5.0,
    reviews: 312,
    badge: 'Baked 5 AM',
    isOrganic: true,
    isBestSeller: true,
    harvestTime: 'Stone Oven • Batch #14',
    calories: '230 kcal / 100g',
    shelfLife: '4 Days',
    image: STUDIO_ASSETS.prod_sourdough,
    description: 'Crackling caramelized blistered crust with an open, custard-soft crumb crafted from unbleached stoneground wheat, sea salt, and wild starter.'
  },
  {
    id: 'fc-11',
    name: 'Fresh Orange Juice',
    subtitle: '100% Cold-Pressed Valencia & Kinnow',
    category: 'Beverages',
    secondaryCategory: 'Beverages',
    weight: '500 ml Glass Jar',
    weightOptions: ['250 ml Bottle', '500 ml Glass Jar', '1 Litre Carafe'],
    price: 165,
    originalPrice: 199,
    discount: '17% OFF',
    rating: 4.9,
    reviews: 274,
    badge: 'Zero Sugar Added',
    isOrganic: true,
    isBestSeller: true,
    harvestTime: 'Pressed 6 AM Today',
    calories: '45 kcal / 100ml',
    shelfLife: '48 Hours Chilled',
    image: STUDIO_ASSETS.prod_oj,
    description: 'Hydraulic cold-pressed from 1.4 kg of sun-drenched oranges per jar. No water, no preservatives, no heat pasteurization.'
  },
  {
    id: 'fc-12',
    name: 'Premium Almonds',
    subtitle: 'King-Size California Sonora Nonpareil',
    category: 'Snacks',
    secondaryCategory: 'Organic Products',
    weight: '250 g Glass Jar',
    weightOptions: ['250 g Glass Jar', '500 g Refill Pouch'],
    price: 320,
    originalPrice: 390,
    discount: '18% OFF',
    rating: 4.9,
    reviews: 389,
    badge: 'Jumbo Grade',
    isOrganic: true,
    isBestSeller: true,
    harvestTime: 'New Crop • Vacuum Sealed',
    calories: '579 kcal / 100g',
    shelfLife: '6 Months',
    image: STUDIO_ASSETS.prod_almonds,
    description: 'Sweet, thin-skinned jumbo almonds with high natural vitamin E oil content and an unmistakable crisp snap.'
  },
  {
    id: 'fc-13',
    name: 'Wild Norwegian Salmon',
    subtitle: 'Chilled Atlantic Fillet • Skin-On Center Cut',
    category: 'Meat & Seafood',
    secondaryCategory: 'Meat & Seafood',
    weight: '250 g Fillet',
    weightOptions: ['250 g Fillet', '500 g Chef Cut'],
    price: 649,
    originalPrice: 790,
    discount: '18% OFF',
    rating: 4.9,
    reviews: 167,
    badge: 'Sashimi Grade',
    isOrganic: false,
    isBestSeller: true,
    harvestTime: '0–2°C Ice-Bed Air Freight',
    calories: '208 kcal / 100g',
    shelfLife: '3 Days Chilled',
    image: STUDIO_ASSETS.prod_salmon,
    description: 'Air-flown, never-frozen Norwegian salmon fillet with delicate white omega-3 marbling and pin-bone-removed precision trim.'
  },
  {
    id: 'fc-14',
    name: 'Truffle Roasted Makhana',
    subtitle: 'Slow-Popped Mithila Fox Nuts & Olive Oil',
    category: 'Snacks',
    secondaryCategory: 'Snacks',
    weight: '100 g Canister',
    weightOptions: ['100 g Canister', '2 x 100 g Duo'],
    price: 149,
    originalPrice: 185,
    discount: '19% OFF',
    rating: 4.8,
    reviews: 231,
    badge: 'Guilt-Free Crunch',
    isOrganic: true,
    isBestSeller: false,
    harvestTime: 'Small-Batch Roasted',
    calories: '347 kcal / 100g',
    shelfLife: '90 Days',
    image: STUDIO_ASSETS.prod_makhana,
    description: 'GI-tagged Bihar lotus seeds tumbled in cold-pressed extra virgin olive oil, black summer truffle sea salt, and cracked pepper.'
  },
  {
    id: 'fc-15',
    name: 'Heirloom Rainbow Carrots',
    subtitle: 'Purple, Amber & Sweet Nantes Bunch',
    category: 'Organic Products',
    secondaryCategory: 'Vegetables',
    weight: '400 g with Tops',
    weightOptions: ['400 g with Tops', '800 g Bunch'],
    price: 89,
    originalPrice: 115,
    discount: '23% OFF',
    rating: 4.9,
    reviews: 158,
    badge: 'Biodynamic',
    isOrganic: true,
    isBestSeller: false,
    harvestTime: 'Picked 4h ago • Ketti Valley',
    calories: '41 kcal / 100g',
    shelfLife: '7 Days Chilled',
    image: STUDIO_ASSETS.prod_carrots,
    description: 'Anthocyanin-rich purple and beta-carotene gold heirloom carrots pulled from volcanic mountain loam with feathery green tops intact.'
  },
  {
    id: 'fc-16',
    name: 'Botanical Produce & Dish Wash',
    subtitle: 'Nilgiri Eucalyptus & Soapnut Concentrate',
    category: 'Household Essentials',
    secondaryCategory: 'Organic Products',
    weight: '500 ml Amber Glass',
    weightOptions: ['500 ml Amber Glass', '1 Litre Refill'],
    price: 275,
    originalPrice: 340,
    discount: '19% OFF',
    rating: 4.8,
    reviews: 204,
    badge: '100% Plant Active',
    isOrganic: true,
    isBestSeller: false,
    harvestTime: 'Zero Sulfates • Refillable',
    calories: 'Non-Toxic Food Safe',
    shelfLife: '24 Months',
    image: STUDIO_ASSETS.prod_household,
    description: 'Food-grade organic soapnut and steam-distilled Nilgiri eucalyptus wash that removes surface wax from produce and leaves dishes gleaming.'
  }
];

export const ADMIN_STORAGE_KEY = 'gurkhacamp_admin_demo_v4';

export function getLiveProducts() {
  if (typeof window === 'undefined') return INITIAL_PRODUCTS;
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.products) && parsed.products.length > 0) {
        return parsed.products.map((p) => {
          const fallback = INITIAL_PRODUCTS.find((x) => x.id === p.id) || {};
          return {
            ...fallback,
            ...p,
            id: p.id || fallback.id,
            name: p.name || fallback.name,
            sku: p.sku || fallback.sku || 'SKU-' + (p.id || '001'),
            category: p.category || fallback.category || 'General',
            secondaryCategory: p.secondaryCategory || fallback.secondaryCategory || p.category,
            price: Number(p.price) || fallback.price || 99,
            originalPrice: Number(p.originalPrice) || fallback.originalPrice || Math.round((Number(p.price) || 99) * 1.2),
            discount: p.discount || fallback.discount || '15% OFF',
            stock: Number(p.stock) || 0,
            status: p.status || fallback.status || 'active',
            image: p.image || fallback.image || '/images/prod_mango.webp',
            icon: p.icon || fallback.icon || '🛒',
            weight: p.weight || fallback.weight || '1 pack',
            weightOptions: (p.weightOptions && p.weightOptions.length > 0) ? p.weightOptions : (fallback.weightOptions || [p.weight || '1 pack']),
            subtitle: p.subtitle || fallback.subtitle || `${p.category} • Fresh Selection`,
            description: p.description || fallback.description || p.name,
            badge: p.badge || fallback.badge || (p.status === 'low' ? 'Low Stock' : (p.status === 'out' ? 'Sold Out' : 'Fresh')),
            rating: p.rating || fallback.rating || 4.9,
            reviews: p.reviews || fallback.reviews || 120,
            isOrganic: p.isOrganic ?? (p.category === 'Organic Products'),
            isBestSeller: p.isBestSeller ?? fallback.isBestSeller ?? false,
            harvestTime: p.harvestTime || fallback.harvestTime || 'Fresh stock'
          };
        });
      }
    }
  } catch (e) {
    console.error('Error reading live products from admin storage:', e);
  }
  return INITIAL_PRODUCTS;
}

export const SEASONAL_CURATIONS = [
  {
    id: 'fruits',
    tab: 'Seasonal Fruits',
    eyebrow: 'MAY–NOVEMBER ORCHARD EDIT',
    title: 'Sun-Drenched Orchard Jewels at Peak Brix.',
    description: 'Every fruit lot is refractometer-tested at the farm gate to guarantee natural sugar-to-acid balance before entering our 8°C breathable ripening rooms.',
    image: SCENE_IMAGES.seasonal,
    stats: [
      { label: 'Average Brix Sweetness', value: '18.4°' },
      { label: 'Carbide / Wax Residue', value: '0.0%' },
      { label: 'Orchard Partner Estates', value: '42 Farms' }
    ],
    bundleIds: ['fc-01', 'fc-02', 'fc-03', 'fc-11'],
    bundlePrice: 679,
    bundleOriginal: 768,
    hotspots: [
      { x: '34%', y: '52%', productId: 'fc-01', label: 'Alphonso Mango • ₹349' },
      { x: '54%', y: '58%', productId: 'fc-02', label: 'Fresh Strawberries • ₹189' },
      { x: '72%', y: '34%', productId: 'fc-11', label: 'Fresh Orange Juice • ₹165' },
      { x: '88%', y: '58%', productId: 'fc-03', label: 'Organic Bananas • ₹65' }
    ]
  },
  {
    id: 'vegetables',
    tab: 'Farm-Fresh Vegetables',
    eyebrow: 'NILGIRI HIGHLAND HARVEST',
    title: 'Picked Under Moonlight, On Your Table by Breakfast.',
    description: 'Leafy greens lose 40% of their folate when stored in warm warehouses. Our misted hydro-cooled crates preserve cellular crunch from Ooty to your kitchen.',
    image: SCENE_IMAGES.hero,
    stats: [
      { label: 'Harvest-to-Door Window', value: '< 14 Hrs' },
      { label: 'Cold-Chain Humidity', value: '94% RH' },
      { label: 'Pesticide Screen Pass', value: '100%' }
    ],
    bundleIds: ['fc-04', 'fc-05', 'fc-06', 'fc-07'],
    bundlePrice: 379,
    bundleOriginal: 421,
    hotspots: [
      { x: '24%', y: '35%', productId: 'fc-06', label: 'Green Spinach • ₹45' },
      { x: '28%', y: '54%', productId: 'fc-05', label: 'Vine Tomatoes • ₹48' },
      { x: '44%', y: '52%', productId: 'fc-04', label: 'Hass Avocado • ₹249' },
      { x: '82%', y: '62%', productId: 'fc-10', label: 'Country Sourdough • ₹220' }
    ]
  },
  {
    id: 'organic',
    tab: 'Organic Selections',
    eyebrow: 'CERTIFIED BIODYNAMIC LIVING SOIL',
    title: 'Traceable Down to the Exact Acre & Farmer.',
    description: 'Scan any Gurkhacamp Organic tag to view soil regeneration metrics, water table stewardship, and the third-party Eurofins residue certificate for that harvest batch.',
    image: SCENE_IMAGES.campaign,
    stats: [
      { label: 'NPOP / USDA Certified', value: '100%' },
      { label: 'Synthetic Inputs', value: 'Zero' },
      { label: 'Direct Farmer Payout', value: '78% Share' }
    ],
    bundleIds: ['fc-01', 'fc-06', 'fc-15', 'fc-12'],
    bundlePrice: 729,
    bundleOriginal: 803,
    hotspots: [
      { x: '26%', y: '28%', productId: 'fc-01', label: 'Organic Alphonso • ₹349' },
      { x: '66%', y: '34%', productId: 'fc-15', label: 'Rainbow Carrots • ₹89' },
      { x: '22%', y: '62%', productId: 'fc-07', label: 'Highland Broccoli • ₹79' }
    ]
  },
  {
    id: 'recommendations',
    tab: 'Seasonal Recommendations',
    eyebrow: 'ARTISANAL MORNING TABLE',
    title: 'Slow-Fermented Sourdough Meets Single-Herd A2 Dairy.',
    description: 'Curated by our in-house culinary directors: pair warm blistered country sourdough with cultured A2 farm milk, pasture-raised eggs, and roasted California almonds.',
    image: SCENE_IMAGES.bakery,
    stats: [
      { label: 'Wild Levain Fermentation', value: '36 Hours' },
      { label: 'Single-Origin A2 Protein', value: '100% Gir' },
      { label: 'Morning Batch Limit', value: '120 Loaves' }
    ],
    bundleIds: ['fc-08', 'fc-09', 'fc-10', 'fc-12'],
    bundlePrice: 679,
    bundleOriginal: 750,
    hotspots: [
      { x: '32%', y: '52%', productId: 'fc-10', label: 'Sourdough Boule • ₹220' },
      { x: '58%', y: '34%', productId: 'fc-09', label: 'Pasture Farm Eggs • ₹115' },
      { x: '78%', y: '44%', productId: 'fc-08', label: 'A2 Full Cream Milk • ₹95' },
      { x: '74%', y: '84%', productId: 'fc-12', label: 'California Almonds • ₹320' }
    ]
  }
];

export const TESTIMONIALS_DATA = [
  {
    id: 't1',
    name: 'Ananya Sundaram',
    role: 'Culinary Stylist • RS Puram, Coimbatore',
    avatar: 'AS',
    rating: 5,
    verifiedItem: 'Ratnagiri Alphonso & Sourdough Boule',
    date: 'Sample Demonstration Review',
    quote: 'The attention to ripeness is unlike any grocery platform in India. My 6:30 AM order arrived in breathable linen-lined crates—the sourdough was still warm and the avocados were ready to slice immediately.'
  },
  {
    id: 't2',
    name: 'Vikramaditya Menon',
    role: 'Architect & Marathoner • Indiranagar, Bengaluru',
    avatar: 'VM',
    rating: 5,
    verifiedItem: 'Gir Cow A2 Milk & Hydroponic Spinach',
    date: 'Sample Demonstration Review',
    quote: 'Knowing the exact hour my greens were harvested in the Nilgiris completely changed how our family cooks. The glass-bottled A2 milk and pasture-raised eggs taste like childhood farm visits.'
  },
  {
    id: 't3',
    name: 'Meera & Rohan Kapoor',
    role: 'Restaurateurs • Bandra West, Mumbai',
    avatar: 'MK',
    rating: 5,
    verifiedItem: 'Wild Norwegian Salmon & Heirloom Tomatoes',
    date: 'Sample Demonstration Review',
    quote: 'Gurkhacamp bridges the gap between a Michelin-supplier purveyor and 18-minute home convenience. Even the vine tomatoes smell like a sunlit greenhouse when you open the box.'
  },
  {
    id: 't4',
    name: 'Dr. Karthik Narayanan',
    role: 'Pediatrician • Race Course, Coimbatore',
    avatar: 'KN',
    rating: 5,
    verifiedItem: 'Certified Organic Harvest Box',
    date: 'Sample Demonstration Review',
    quote: 'Zero plastic wrapping, lab-tested pesticide-free certification on every batch, and instant no-questions doorstep replacement if a single berry is bruised. Truly world-class execution.'
  }
];

export const DELIVERY_LOCATIONS = [
  { id: 'cbe-rsp', city: 'Coimbatore', area: 'RS Puram & Race Course', pin: '641002', eta: '16 mins', hub: 'Nilgiri Express Cold-Hub #01' },
  { id: 'cbe-ava', city: 'Coimbatore', area: 'Avinashi Road & Peelamedu', pin: '641004', eta: '18 mins', hub: 'Coimbatore East Micro-Hub #03' },
  { id: 'blr-ind', city: 'Bengaluru', area: 'Indiranagar & Koramangala', pin: '560038', eta: '19 mins', hub: 'HAL Organic Vault #02' },
  { id: 'mum-ban', city: 'Mumbai', area: 'Bandra West & Juhu', pin: '400050', eta: '21 mins', hub: 'Pali Hill Cold-Chain #05' },
  { id: 'hyd-jub', city: 'Hyderabad', area: 'Jubilee Hills & Banjara Hills', pin: '500033', eta: '20 mins', hub: 'Deccan Harvest Hub #04' },
  { id: 'del-vas', city: 'New Delhi', area: 'Vasant Vihar & Defence Colony', pin: '110057', eta: '22 mins', hub: 'Lutyens Cold-Vault #01' }
];

export const FREE_DELIVERY_THRESHOLD = 499;

export const HARVEST_BATCHES = [
  {
    code: 'BATCH-409-RATNAGIRI',
    crop: 'Ratnagiri GI Alphonso Mango',
    farmer: 'Deshmukh Organic Orchards • Plot 14B, Devgad',
    harvestedAt: '04:15 AM IST Today',
    coldChainTemp: '8.2°C Breathable Hay Crate',
    brixLevel: '19.1° Brix (Peak Sweet)',
    labStatus: 'Eurofins Cert #EF-99210 • 0.00% Pesticide / Carbide Free',
    productId: 'fc-01'
  },
  {
    code: 'BATCH-412-NILGIRIS',
    crop: 'Hydroponic Baby Spinach & Vine Tomatoes',
    farmer: 'Ketti Valley Biodynamic Collective • Ooty 2,100m',
    harvestedAt: '03:50 AM IST Today',
    coldChainTemp: '4.1°C Misted Hydro-Crate',
    brixLevel: '94% Cellular Hydration',
    labStatus: 'NPOP Organic #ORG-4418 • Zero Heavy Metals / Nitrates',
    productId: 'fc-06'
  },
  {
    code: 'BATCH-418-POLLACHI',
    crop: 'Single-Herd Gir Cow A2 Full Cream Milk',
    farmer: 'Anamalai Free-Pasture Dairy • Pollachi',
    harvestedAt: '03:30 AM Milking • Chilled Immediately',
    coldChainTemp: '3.4°C Sterilized Glass Carafe',
    brixLevel: '4.9% Natural A2 Beta-Casein',
    labStatus: 'FSSAI Batch Audit #A2-883 • Zero Antibiotics / Hormones',
    productId: 'fc-08'
  }
];
