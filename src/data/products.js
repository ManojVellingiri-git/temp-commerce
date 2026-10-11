import product1 from '../images/category-baby-care.jpg';
import product2 from '../images/category-atta-rice-dal.jpg';
import product3 from '../images/category-bakery-biscuits.jpg';
import product4 from '../images/category-chicken-meat-fish.jpg';
import product5 from '../images/category-cleaning-essentials.jpg';
import product6 from '../images/category-dairy-bread-eggs.jpg';
import product7 from '../images/category-instant-food.jpg';
import product8 from '../images/category-pet-care.jpg';
import product9 from '../images/category-snack-munchies.jpg';
import product10 from '../images/category-tea-coffee-drinks.jpg';

export const products = [
  {
    id: 1,
    name: "Haldiram's Sev Bhujia",
    category: "Snack & Munchies",
    image: product1,
    price: 18,
    originalPrice: 24,
    rating: 4.5,
    reviews: 149,
    badge: { type: "danger", text: "Sale" }
  },
  {
    id: 2,
    name: "NutriChoice Digestive",
    category: "Bakery & Biscuits",
    image: product2,
    price: 24,
    originalPrice: null,
    rating: 4.5,
    reviews: 25,
    badge: { type: "success", text: "14%" }
  },
  {
    id: 3,
    name: "Cadbury 5 Star Chocolate",
    category: "Bakery & Biscuits",
    image: product3,
    price: 32,
    originalPrice: 35,
    rating: 5,
    reviews: 469,
    badge: null
  },
  {
    id: 4,
    name: "Onion Flavour Potato",
    category: "Snack & Munchies",
    image: product4,
    price: 3,
    originalPrice: 5,
    rating: 3.5,
    reviews: 456,
    badge: { type: "danger", text: "Hot" }
  },
  {
    id: 5,
    name: "Salted Instant Popcorn",
    category: "Instant Food",
    image: product5,
    price: 13,
    originalPrice: 18,
    rating: 4.5,
    reviews: 39,
    badge: null
  },
  {
    id: 6,
    name: "Blueberry Greek Yogurt",
    category: "Dairy, Bread & Eggs",
    image: product6,
    price: 18,
    originalPrice: 24,
    rating: 4.5,
    reviews: 189,
    badge: { type: "danger", text: "Sale" }
  },
  {
    id: 7,
    name: "Britannia Cheese Slices",
    category: "Dairy, Bread & Eggs",
    image: product7,
    price: 24,
    originalPrice: null,
    rating: 5,
    reviews: 345,
    badge: null
  },
  {
    id: 8,
    name: "Kellogg's Original Cereal",
    category: "Instant Food",
    image: product8,
    price: 32,
    originalPrice: 35,
    rating: 4,
    reviews: 90,
    badge: { type: "success", text: "14%" }
  },
  {
    id: 9,
    name: "Slurrp Millet Chocolate",
    category: "Snack & Munchies",
    image: product9,
    price: 3,
    originalPrice: 5,
    rating: 4.5,
    reviews: 67,
    badge: null
  },
  {
    id: 10,
    name: "Amul Roaster Coriander",
    category: "Dairy, Bread & Eggs",
    image: product10,
    price: 13,
    originalPrice: 18,
    rating: 3,
    reviews: 12,
    badge: null
  }
];
