import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Leaf, Compass, Search, Heart, ShoppingBag, Check, X
} from 'lucide-react';
import {
  SCENE_IMAGES, CATEGORIES, INITIAL_PRODUCTS, DELIVERY_LOCATIONS,
  getLiveProducts, ADMIN_STORAGE_KEY
} from './data/freshcartData';
import { safeGetStorage, safeSetStorage } from './utils/storage';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import MotionDirector from './components/MotionDirector';
import AnimatedCounter from './components/AnimatedCounter';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import CategorySection from './components/CategorySection';
import ProductCard from './components/ProductCard';
import ProductGrid from './components/ProductGrid';
import SeasonalFreshnessSection from './components/SeasonalFreshnessSection';
import BenefitsSection from './components/BenefitsSection';
import BatchTraceabilityLedger from './components/BatchTraceabilityLedger';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ProductQuickView from './components/ProductQuickView';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import SearchOverlay from './components/SearchOverlay';
import CheckoutModal from './components/CheckoutModal';
import WhatsAppWidget from './components/WhatsAppWidget';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [onlyOrganic, setOnlyOrganic] = useState(false);
  const [under200, setUnder200] = useState(false);

  // Live products synchronized with Admin Panel & Cloudflare R2
  const [products, setProducts] = useState(getLiveProducts);

  useEffect(() => {
    const handleStorage = (e) => {
      if (!e || !e.key || e.key === ADMIN_STORAGE_KEY) {
        setProducts(getLiveProducts());
      }
    };
    window.addEventListener('storage', handleStorage);
    // Periodic synchronization ensures edits in another tab or iframe update seamlessly
    const syncTimer = setInterval(() => {
      setProducts(getLiveProducts());
    }, 2500);
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(syncTimer);
    };
  }, []);

  const [cartItems, setCartItems] = useState(() =>
    safeGetStorage('freshcart_cart_v1', [
      { ...INITIAL_PRODUCTS[0], qty: 1, selectedWeight: INITIAL_PRODUCTS[0].weight },
      { ...INITIAL_PRODUCTS[9], qty: 1, selectedWeight: INITIAL_PRODUCTS[9].weight }
    ])
  );
  const [wishlistIds, setWishlistIds] = useState(() =>
    safeGetStorage('freshcart_wishlist_v1', ['fc-01', 'fc-04', 'fc-10'])
  );
  const [cartBump, setCartBump] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [filmModalOpen, setFilmModalOpen] = useState(false);
  const [infoModalTitle, setInfoModalTitle] = useState('');
  const [currentLocation, setCurrentLocation] = useState(DELIVERY_LOCATIONS[0]);
  const [lastDemoOrder, setLastDemoOrder] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    safeSetStorage('freshcart_cart_v1', cartItems);
  }, [cartItems]);

  useEffect(() => {
    safeSetStorage('freshcart_wishlist_v1', wishlistIds);
  }, [wishlistIds]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 36);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.round((y / docHeight) * 100)) : 0;
      setScrollProgress(pct);

      const sectionMap = [
        { id: 'home', elId: 'hero-section' },
        { id: 'categories', elId: 'categories-section' },
        { id: 'shop', elId: 'shop-section' },
        { id: 'about', elId: 'benefits-section' },
        { id: 'contact', elId: 'newsletter-section' }
      ];
      for (let i = sectionMap.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionMap[i].elId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 220) {
            setActiveSection(sectionMap[i].id);
            break;
          }
        }
      }
    };
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setCartOpen(false);
        setWishlistOpen(false);
        setSearchOpen(false);
        setCheckoutOpen(false);
        setQuickViewProduct(null);
        setLocationModalOpen(false);
        setAccountModalOpen(false);
        setFilmModalOpen(false);
        setInfoModalTitle('');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    let observer;
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('fc-in-view');
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      );
      document.querySelectorAll('section').forEach((el) => {
        el.classList.add('fc-scroll-item');
        observer.observe(el);
      });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      if (observer) observer.disconnect();
    };
  }, [selectedCategory, searchQuery, sortBy, onlyOrganic, under200]);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? '' : curr));
    }, 2800);
  }, []);

  const handleNavigate = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAddToCart = useCallback(
    (product, qtyToAdd = 1, weightOption = product.weight) => {
      setCartItems((prev) => {
        const existingIndex = prev.findIndex((i) => i.id === product.id);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            qty: updated[existingIndex].qty + qtyToAdd,
            selectedWeight: weightOption
          };
          return updated;
        }
        return [...prev, { ...product, qty: qtyToAdd, selectedWeight: weightOption }];
      });
      setCartBump(true);
      setTimeout(() => setCartBump(false), 450);
      showToast(`Added ${product.name} (${weightOption}) to your basket`);
    },
    [showToast]
  );

  const handleUpdateQty = useCallback((productId, nextQty) => {
    setCartItems((prev) => {
      if (nextQty <= 0) {
        return prev.filter((item) => item.id !== productId);
      }
      return prev.map((item) => (item.id === productId ? { ...item, qty: nextQty } : item));
    });
  }, []);

  const handleRemoveCartItem = useCallback((productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const handleAddBundle = useCallback(
    (productIds, bundleLabel) => {
      const itemsToAdd = products.filter((p) => productIds.includes(p.id));
      setCartItems((prev) => {
        const next = [...prev];
        itemsToAdd.forEach((prod) => {
          const idx = next.findIndex((i) => i.id === prod.id);
          if (idx > -1) {
            next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
          } else {
            next.push({ ...prod, qty: 1, selectedWeight: prod.weight });
          }
        });
        return next;
      });
      setCartBump(true);
      setTimeout(() => setCartBump(false), 450);
      showToast(`Added ${bundleLabel} (${itemsToAdd.length} items) to basket!`);
      setCartOpen(true);
    },
    [products, showToast]
  );

  const handleToggleWishlist = useCallback(
    (productId) => {
      const prod = products.find((p) => p.id === productId);
      setWishlistIds((prev) => {
        const exists = prev.includes(productId);
        if (exists) {
          if (prod) showToast(`Removed ${prod.name} from wishlist`);
          return prev.filter((id) => id !== productId);
        } else {
          if (prod) showToast(`Saved ${prod.name} to wishlist ♥`);
          return [...prev, productId];
        }
      });
    },
    [products, showToast]
  );

  const filteredProducts = useMemo(() => {
    let list = products.filter((prod) => {
      const matchesCat =
        selectedCategory === 'All' ||
        prod.category === selectedCategory ||
        prod.secondaryCategory === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        prod.name.toLowerCase().includes(q) ||
        prod.subtitle.toLowerCase().includes(q) ||
        prod.category.toLowerCase().includes(q) ||
        prod.harvestTime.toLowerCase().includes(q);
      const matchesOrganic = !onlyOrganic || prod.isOrganic;
      const matchesUnder200 = !under200 || prod.price < 200;
      return matchesCat && matchesSearch && matchesOrganic && matchesUnder200;
    });

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [products, selectedCategory, searchQuery, sortBy, onlyOrganic, under200]);

  const cartMap = useMemo(() => {
    const map = {};
    cartItems.forEach((item) => {
      map[item.id] = item.qty;
    });
    return map;
  }, [cartItems]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.qty, 0),
    [cartItems]
  );
  const cartSubtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cartItems]
  );

  return (
    <div
      className="min-h-screen antialiased selection:bg-[#C7F36B] selection:text-[#123D2A]"
      style={{ backgroundColor: '#F8F7EF', color: '#20251F' }}
    >
      

      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <CustomCursor />
      <MotionDirector />
      <WhatsAppWidget currentLocation={currentLocation} />

      {toastMessage && (
        <div
          className="fixed bottom-6 left-6 z-[115] bg-[#123D2A] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#C7F36B]/30 flex items-center gap-3"
          role="status"
          aria-live="polite"
        >
          <span className="w-6 h-6 rounded-full bg-[#C7F36B] text-[#123D2A] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </span>
          <span className="text-xs sm:text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      <Navbar
        scrolled={scrolled}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        cartBump={cartBump}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenLocation={() => setLocationModalOpen(true)}
        onOpenAccount={() => setAccountModalOpen(true)}
        currentLocation={currentLocation}
      />

      <main>
        <Hero
          onShopNow={() => handleNavigate('shop-section')}
          onExploreCategories={() => handleNavigate('categories-section')}
          onQuickAddProduct={(prod) => handleAddToCart(prod, 1, prod.weight)}
          onOpenFilmModal={() => setFilmModalOpen(true)}
          currentLocation={currentLocation}
          heroProduct={products[0]}
        />

        <Marquee />

        <CategorySection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <ProductGrid
          products={filteredProducts}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onlyOrganic={onlyOrganic}
          onToggleOrganic={() => setOnlyOrganic((prev) => !prev)}
          under200={under200}
          onToggleUnder200={() => setUnder200((prev) => !prev)}
          cartMap={cartMap}
          wishlistIds={wishlistIds}
          onAddToCart={handleAddToCart}
          onUpdateQty={handleUpdateQty}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(prod) => setQuickViewProduct(prod)}
          onClearAllFilters={() => {
            setSelectedCategory('All');
            setSearchQuery('');
            setOnlyOrganic(false);
            setUnder200(false);
            setSortBy('featured');
          }}
        />

        <SeasonalFreshnessSection
          onAddBundle={handleAddBundle}
          onQuickViewProduct={(prod) => setQuickViewProduct(prod)}
          allProducts={products}
        />

        <BenefitsSection />

        <Testimonials />

        <Newsletter />
      </main>

      {/* Top Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 z-[80] pointer-events-none bg-transparent"
        aria-hidden="true"
      >
        <div
          className="h-full transition-all duration-150"
          style={{
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, #48A85A 0%, #C7F36B 100%)'
          }}
        />
      </div>

      <Footer
        onSelectCategory={setSelectedCategory}
        onNavigate={handleNavigate}
        onOpenInfoModal={(title) => setInfoModalTitle(title)}
      />

      {/* Mobile-First Sticky Bottom App Bar (<1024px) with >=48px Touch Targets */}
      <nav
        aria-label="Mobile Quick Navigation"
        className="fixed bottom-0 left-0 right-0 z-[75] lg:hidden bg-white/95 backdrop-blur-xl border-t border-[#123D2A]/12 px-2 py-1.5 grid grid-cols-5 gap-1 shadow-[0_-10px_30px_rgba(18,61,42,0.1)]"
      >
        <button
          type="button"
          onClick={() => handleNavigate('hero-section')}
          className={`min-h-[48px] rounded-xl flex flex-col items-center justify-center gap-0.5 text-[11px] font-extrabold transition-colors ${
            activeSection === 'home' ? 'text-[#123D2A] bg-[#F8F7EF]' : 'text-[#5C635A]'
          }`}
        >
          <Leaf className="w-4 h-4 text-[#48A85A]" />
          <span>Home</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavigate('categories-section')}
          className={`min-h-[48px] rounded-xl flex flex-col items-center justify-center gap-0.5 text-[11px] font-extrabold transition-colors ${
            activeSection === 'categories' ? 'text-[#123D2A] bg-[#F8F7EF]' : 'text-[#5C635A]'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Aisles</span>
        </button>

        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="min-h-[48px] rounded-xl flex flex-col items-center justify-center gap-0.5 text-[11px] font-extrabold text-[#5C635A]"
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>

        <button
          type="button"
          onClick={() => setWishlistOpen(true)}
          className="relative min-h-[48px] rounded-xl flex flex-col items-center justify-center gap-0.5 text-[11px] font-extrabold text-[#5C635A]"
        >
          <Heart className="w-4 h-4" />
          <span>Saved ({wishlistIds.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="min-h-[48px] rounded-xl flex flex-col items-center justify-center gap-0.5 text-[11px] font-extrabold"
          style={{ backgroundColor: '#123D2A', color: '#C7F36B' }}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Basket ({cartCount})</span>
        </button>
      </nav>

      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
        onProceedToCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
        onQuickAddSuggestion={(prod) => handleAddToCart(prod, 1, prod.weight)}
        allProducts={products}
      />

      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        onMoveToCart={(prod) => {
          handleAddToCart(prod, 1, prod.weight);
          setWishlistOpen(false);
          setCartOpen(true);
        }}
        allProducts={products}
      />

      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onAddToCart={handleAddToCart}
        onQuickView={(prod) => setQuickViewProduct(prod)}
        allProducts={products}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartItems={cartItems}
        currentLocation={currentLocation}
        onCompleteDemoOrder={(order) => {
          setLastDemoOrder(order);
          showToast(`Demo Order #${order.orderId} confirmed!`);
        }}
      />

      {locationModalOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Select Delivery Location"
        >
          <div
            className="fixed inset-0 bg-[#20251F]/70 backdrop-blur-sm"
            onClick={() => setLocationModalOpen(false)}
          />
          <div className="relative bg-white rounded-[32px] max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#48A85A]">
                  Cold-Chain Hub Routing
                </span>
                <h3 className="text-2xl font-extrabold text-[#123D2A]">
                  Select Delivery Neighborhood
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLocationModalOpen(false)}
                className="p-2 rounded-full bg-[#F8F7EF]"
                aria-label="Close location modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2.5 max-h-80 overflow-y-auto">
              {DELIVERY_LOCATIONS.map((loc) => {
                const active = loc.id === currentLocation.id;
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => {
                      setCurrentLocation(loc);
                      setLocationModalOpen(false);
                      showToast(`Delivering to ${loc.area}, ${loc.city} (${loc.eta})`);
                    }}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      active
                        ? 'bg-[#123D2A] text-white border-[#123D2A]'
                        : 'bg-[#F8F7EF] text-[#20251F] border-[#123D2A]/10 hover:border-[#123D2A]'
                    }`}
                  >
                    <div>
                      <div className="font-extrabold text-sm">
                        {loc.area} • <span className="opacity-80">{loc.city}</span>
                      </div>
                      <div
                        className={`text-xs mt-0.5 ${
                          active ? 'text-[#C7F36B]' : 'text-[#777D75]'
                        }`}
                      >
                        {loc.hub} • PIN {loc.pin}
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                        active ? 'bg-[#C7F36B] text-[#123D2A]' : 'bg-white text-[#123D2A]'
                      }`}
                    >
                      ⚡ {loc.eta}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {accountModalOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Member Profile"
        >
          <div
            className="fixed inset-0 bg-[#20251F]/70 backdrop-blur-sm"
            onClick={() => setAccountModalOpen(false)}
          />
          <div className="relative bg-white rounded-[32px] max-w-md w-full p-6 sm:p-8 shadow-2xl z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#123D2A] text-[#C7F36B] flex items-center justify-center font-extrabold">
                  AS
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#123D2A]">Ananya Sundaram</h3>
                  <p className="text-xs text-[#48A85A] font-bold">
                    Gurkhahills Privé Member • {currentLocation.city}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAccountModalOpen(false)}
                className="p-2 rounded-full bg-[#F8F7EF]"
                aria-label="Close member profile"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-[#F8F7EF] border border-[#123D2A]/10">
                <div className="font-extrabold text-[#123D2A] mb-1">
                  Active Privilege Voucher
                </div>
                <div className="text-[#777D75]">
                  Code <strong>FRESH25</strong> (25% OFF) & Free Cold-Bag Delivery above ₹499
                </div>
              </div>
              {lastDemoOrder ? (
                <div className="p-4 rounded-2xl bg-[#EBF4E6] border border-[#48A85A]/30">
                  <div className="font-extrabold text-[#123D2A]">
                    Recent Demo Order #{lastDemoOrder.orderId}
                  </div>
                  <div className="text-[#20251F]/80 mt-0.5">
                    {lastDemoOrder.itemCount} items • ₹{lastDemoOrder.total} • {lastDemoOrder.slot}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-[#F8F7EF] border border-[#123D2A]/10 text-[#777D75]">
                  No recent demo orders in this session yet.
                </div>
              )}

              <a
                href="/admin/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 p-3.5 rounded-2xl bg-[#123D2A] text-[#C7F36B] hover:bg-[#48A85A] hover:text-white transition-all flex items-center justify-between font-extrabold text-xs shadow-sm"
              >
                <span>Open Store Admin Portal</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {filmModalOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="4 AM Harvest Story"
        >
          <div
            className="fixed inset-0 bg-[#20251F]/80 backdrop-blur-md"
            onClick={() => setFilmModalOpen(false)}
          />
          <div className="relative bg-[#123D2A] text-white rounded-[32px] max-w-2xl w-full overflow-hidden shadow-2xl z-10 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#C7F36B]">
                4:00 AM Field Documentary Preview
              </span>
              <button
                type="button"
                onClick={() => setFilmModalOpen(false)}
                className="p-2 rounded-full bg-white/10 text-white"
                aria-label="Close harvest story modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img
              src={SCENE_IMAGES.campaign}
              alt="Dawn Harvest Documentary Preview"
              className="w-full h-64 object-cover rounded-2xl mb-5"
            />
            <h3 className="fc-font-serif text-2xl sm:text-3xl mb-2">
              From Ooty Mist & Ratnagiri Orchards to Your Kitchen in 14 Hours.
            </h3>
            <p className="text-sm text-white/80 leading-relaxed mb-6">
              Every morning at 4:00 AM, our field agronomists inspect Brix sugar levels and cellular hydration across 140+ partner estates before sealing each crate in 4°C phase-change cold bags.
            </p>
            <button
              type="button"
              onClick={() => {
                setFilmModalOpen(false);
                handleNavigate('shop-section');
              }}
              className="px-6 py-3 rounded-full font-extrabold text-xs uppercase tracking-wider bg-[#C7F36B] text-[#123D2A]"
            >
              Shop Today’s 4 AM Harvest →
            </button>
          </div>
        </div>
      )}

      {infoModalTitle && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={infoModalTitle}
        >
          <div
            className="fixed inset-0 bg-[#20251F]/70 backdrop-blur-sm"
            onClick={() => setInfoModalTitle('')}
          />
          <div className="relative bg-white rounded-[28px] max-w-md w-full p-6 sm:p-8 shadow-2xl z-10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-extrabold text-[#123D2A]">{infoModalTitle}</h3>
              <button
                type="button"
                onClick={() => setInfoModalTitle('')}
                className="p-2 rounded-full bg-[#F8F7EF]"
                aria-label="Close info dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-[#777D75] leading-relaxed mb-5">
              Gurkhahills Shopping Complex operates a premium, 100% batch-traceable cold chain across Coimbatore, Bengaluru, Mumbai, Hyderabad, and New Delhi. Every order is backed by our instant doorstep replacement guarantee.
            </p>
            <button
              type="button"
              onClick={() => setInfoModalTitle('')}
              className="w-full py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider bg-[#123D2A] text-[#C7F36B]"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
