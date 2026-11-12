import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  ShoppingBag, Heart, Search, MapPin, User, Menu, X, Plus, Minus, Star,
  ArrowRight, ArrowUpRight, Check, Sparkles, Truck, ShieldCheck, Leaf,
  Clock, RotateCcw, Tag, ChevronLeft, ChevronRight, ChevronDown, Eye,
  Trash2, CreditCard, Smartphone, Building2, Award, Flame, Phone, Mail,
  CheckCircle2, Compass, Play, Copy
} from 'lucide-react';
import {
  STUDIO_ASSETS, SCENE_IMAGES, CATEGORIES, INITIAL_PRODUCTS,
  SEASONAL_CURATIONS, TESTIMONIALS_DATA, DELIVERY_LOCATIONS,
  FREE_DELIVERY_THRESHOLD
} from '../data/freshcartData';

export default function Navbar({
  scrolled,
  activeSection,
  onNavigate,
  selectedCategory,
  onSelectCategory,
  cartCount,
  cartSubtotal,
  cartBump,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenLocation,
  onOpenAccount,
  currentLocation
}) {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', target: 'hero-section' },
    { id: 'shop', label: 'Shop', target: 'shop-section' },
    { id: 'categories', label: 'Categories', target: 'categories-section', hasMega: true },
    { id: 'about', label: 'About', target: 'benefits-section' },
    { id: 'contact', label: 'Contact', target: 'newsletter-section' }
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#F8F7EF]/95 backdrop-blur-xl shadow-[0_10px_35px_-15px_rgba(18,61,42,0.14)] border-b border-[#123D2A]/10 py-2.5'
            : 'bg-[#F8F7EF]/85 backdrop-blur-md border-b border-[#123D2A]/8 py-4'
        }`}
      >
        <div
          className={`overflow-hidden transition-all duration-300 ${
            scrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100 pb-2.5 mb-2.5 border-b border-[#123D2A]/10'
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-[#123D2A]">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider"
                style={{ backgroundColor: '#C7F36B', color: '#123D2A' }}
              >
                <Sparkles className="w-3 h-3" /> Dawn Harvest Live
              </span>
              <span className="hidden sm:inline text-[#20251F]/80">
                4:00 AM Nilgiri & Ratnagiri lots just arrived in 4°C cold vaults.
              </span>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <span className="hidden md:inline text-[#777D75]">
                Free cold-bag delivery on orders above <strong className="text-[#123D2A]">₹499</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 lg:gap-5">
            <button
              type="button"
              onClick={() => onNavigate('hero-section')}
              className="flex items-center text-left group focus:outline-none shrink-0"
              aria-label="Gurkhahills Shopping Complex Home"
            >
              <img
                src="/gurkhacamp-logo.png"
                alt="Gurkhahills Shopping Complex"
                className="h-14 sm:h-16 md:h-20 lg:h-22 w-auto max-w-[220px] object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </button>

            <button
              type="button"
              onClick={onOpenLocation}
              className="hidden sm:flex items-center gap-2.5 pl-3 pr-3.5 py-1.5 rounded-full border border-[#123D2A]/15 bg-white hover:border-[#48A85A] transition-all text-left shadow-sm"
              aria-label="Select delivery location"
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: '#C7F36B', color: '#123D2A' }}
              >
                <MapPin className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#48A85A]">
                    ⚡ {currentLocation.eta}
                  </span>
                  <span className="text-[11px] text-[#777D75]">• {currentLocation.city}</span>
                </div>
                <div className="text-xs font-bold text-[#20251F] truncate max-w-[145px] md:max-w-[170px] flex items-center gap-1">
                  <span className="truncate">{currentLocation.area}</span>
                  <ChevronDown className="w-3 h-3 shrink-0 text-[#777D75]" />
                </div>
              </div>
            </button>
          </div>

          <nav
            className="hidden xl:flex items-center gap-1"
            aria-label="Primary Navigation"
            onMouseLeave={() => setMegaMenuOpen(false)}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => item.hasMega && setMegaMenuOpen(true)}
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (item.hasMega) {
                        setMegaMenuOpen((prev) => !prev);
                      }
                      onNavigate(item.target);
                    }}
                    className={`fc-nav-link relative px-3.5 py-2 rounded-full font-semibold transition-colors flex items-center gap-1.5 ${
                      isActive ? 'text-[#123D2A]' : 'text-[#20251F]/80 hover:text-[#123D2A]'
                    }`}
                    style={{ fontSize: '16px' }}
                  >
                    <span>{item.label}</span>
                    {item.hasMega && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          megaMenuOpen ? 'rotate-180 text-[#48A85A]' : ''
                        }`}
                      />
                    )}
                    {item.badge && (
                      <span
                        className="px-1.5 py-0.5 text-[10px] font-extrabold rounded-full uppercase tracking-wider"
                        style={{ backgroundColor: '#C7F36B', color: '#123D2A' }}
                      >
                        {item.badge}
                      </span>
                    )}
                    <span
                      className={`fc-nav-underline ${isActive ? 'fc-nav-underline-active' : ''}`}
                    />
                  </button>
                </div>
              );
            })}

            {megaMenuOpen && (
              <div
                onMouseEnter={() => setMegaMenuOpen(true)}
                onMouseLeave={() => setMegaMenuOpen(false)}
                className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[920px] max-w-[94vw] z-50"
              >
                <div className="bg-white rounded-3xl p-6 shadow-[0_30px_80px_-20px_rgba(18,61,42,0.28)] border border-[#123D2A]/12 grid grid-cols-12 gap-6">
                  <div className="col-span-8">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#123D2A]/10">
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#777D75]">
                        9 Curated Farm & Pantry Aisles
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectCategory('All');
                          setMegaMenuOpen(false);
                          onNavigate('shop-section');
                        }}
                        className="text-xs font-bold text-[#48A85A] hover:underline"
                      >
                        View All 16+ Products →
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2.5">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            onSelectCategory(cat.id);
                            setMegaMenuOpen(false);
                            onNavigate('shop-section');
                          }}
                          className={`flex items-center gap-3 p-2.5 rounded-2xl text-left transition-all border ${
                            selectedCategory === cat.id
                              ? 'bg-[#123D2A] text-white border-[#123D2A]'
                              : 'bg-[#F8F7EF]/70 hover:bg-[#F8F7EF] text-[#20251F] border-transparent hover:border-[#123D2A]/15'
                          }`}
                        >
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-11 h-11 rounded-xl object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="text-sm font-bold truncate">{cat.name}</div>
                            <div
                              className={`text-[11px] truncate ${
                                selectedCategory === cat.id ? 'text-[#C7F36B]' : 'text-[#777D75]'
                              }`}
                            >
                              {cat.count}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div
                    className="col-span-4 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden"
                    style={{ backgroundColor: '#123D2A', color: '#F8F7EF' }}
                  >
                    <div className="relative z-10">
                      <span
                        className="inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider mb-3"
                        style={{ backgroundColor: '#C7F36B', color: '#123D2A' }}
                      >
                        Ratnagiri GI Harvest
                      </span>
                      <h4 className="fc-font-serif text-2xl leading-snug mb-2">
                        Peak-Season Alphonso Crates
                      </h4>
                      <p className="text-xs text-white/75 leading-relaxed mb-4">
                        Naturally hay-ripened, zero-carbide Devgad & Ratnagiri mangoes delivered within 18 minutes.
                      </p>
                    </div>
                    <img
                      src={SCENE_IMAGES.seasonal}
                      alt="Seasonal Mango Harvest"
                      className="w-full h-28 object-cover rounded-xl mb-3"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        onSelectCategory('Fruits');
                        setMegaMenuOpen(false);
                        onNavigate('shop-section');
                      }}
                      className="w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
                      style={{ backgroundColor: '#C7F36B', color: '#123D2A' }}
                    >
                      Explore Orchard Edit <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </nav>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 sm:px-3.5 py-2.5 rounded-full bg-white border border-[#123D2A]/12 text-[#20251F] hover:border-[#48A85A] transition-all shadow-sm"
              aria-label="Search Gurkhahills products"
            >
              <Search className="w-4 h-4 text-[#123D2A]" />
              <span className="hidden md:inline text-xs font-medium text-[#777D75] pr-2">
                Search mangoes, A2 milk...
              </span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-[#F8F7EF] text-[#777D75] rounded border border-[#123D2A]/10">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={onOpenAccount}
              className="p-2.5 rounded-full bg-white border border-[#123D2A]/12 text-[#20251F] hover:border-[#48A85A] hover:text-[#123D2A] transition-all shadow-sm"
              aria-label="Member account and order tracker"
              title="Member Account"
            >
              <User className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-full bg-white border border-[#123D2A]/12 text-[#20251F] hover:border-[#48A85A] hover:text-[#123D2A] transition-all shadow-sm"
              aria-label={`Wishlist (${wishlistCount} items)`}
              title="Saved Wishlist"
            >
              <Heart
                className={`w-4 h-4 transition-transform ${
                  wishlistCount > 0 ? 'fill-[#48A85A] text-[#48A85A] scale-110' : ''
                }`}
              />
              {wishlistCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-extrabold flex items-center justify-center shadow"
                  style={{ backgroundColor: '#C7F36B', color: '#123D2A' }}
                >
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              className={`flex items-center gap-2.5 pl-3.5 pr-4 py-2.5 rounded-full font-bold text-sm transition-all shadow-md ${
                cartBump ? 'scale-105 ring-4 ring-[#C7F36B]' : 'hover:scale-[1.02]'
              }`}
              style={{ backgroundColor: '#123D2A', color: '#FFFFFF' }}
              aria-label={`Shopping cart with ${cartCount} items, subtotal ₹${cartSubtotal}`}
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#C7F36B]" />
              </div>
              <span className="hidden sm:inline text-xs font-extrabold tracking-wide">
                ₹{cartSubtotal}
              </span>
              <span
                className="px-2 py-0.5 rounded-full text-xs font-extrabold"
                style={{ backgroundColor: '#C7F36B', color: '#123D2A' }}
              >
                {cartCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="xl:hidden p-2.5 rounded-full bg-white border border-[#123D2A]/15 text-[#123D2A]"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[90] xl:hidden flex">
          <div
            className="fixed inset-0 bg-[#20251F]/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-sm bg-[#F8F7EF] h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10 p-6">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#123D2A]/10">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/gurkhacamp-logo.png"
                    alt="Gurkhahills Shopping Complex"
                    className="h-14 sm:h-16 w-auto object-contain"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-white text-[#20251F] border border-[#123D2A]/10"
                  aria-label="Close mobile menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLocation();
                }}
                className="w-full mt-4 p-3.5 rounded-2xl bg-white border border-[#123D2A]/12 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#48A85A]" />
                  <div>
                    <div className="text-xs font-bold text-[#48A85A]">
                      Delivering in {currentLocation.eta}
                    </div>
                    <div className="text-sm font-bold text-[#20251F]">
                      {currentLocation.area}, {currentLocation.city}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#777D75]" />
              </button>

              <div className="mt-6 space-y-1.5">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate(item.target);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-left font-bold text-base text-[#20251F] hover:bg-white transition-colors"
                  >
                    <span>{item.label}</span>
                    {item.badge ? (
                      <span
                        className="px-2 py-0.5 text-xs font-extrabold rounded-full"
                        style={{ backgroundColor: '#C7F36B', color: '#123D2A' }}
                      >
                        {item.badge}
                      </span>
                    ) : (
                      <ArrowRight className="w-4 h-4 text-[#777D75]" />
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-[#123D2A]/10">
                <div className="text-xs font-bold uppercase tracking-widest text-[#777D75] mb-3">
                  Browse Categories
                </div>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        onSelectCategory(cat.id);
                        setMobileMenuOpen(false);
                        onNavigate('shop-section');
                      }}
                      className="px-3 py-1.5 rounded-full text-xs font-bold bg-white border border-[#123D2A]/12 text-[#123D2A]"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#123D2A]/10 mt-6">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
                style={{ backgroundColor: '#123D2A', color: '#C7F36B' }}
              >
                <ShoppingBag className="w-4 h-4" />
                Open Cart ({cartCount} Items • ₹{cartSubtotal})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
