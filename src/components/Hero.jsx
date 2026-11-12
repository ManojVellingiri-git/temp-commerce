import AnimatedCounter from './AnimatedCounter';
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

export default function Hero({ onShopNow, onExploreCategories, onQuickAddProduct, onOpenFilmModal, currentLocation, heroProduct }) {
  const heroMango = heroProduct || INITIAL_PRODUCTS[0];
  const heroRef = useRef(null);
  const rafRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width - 0.5) * 16;
      const y = ((clientY - rect.top) / rect.height - 0.5) * 16;
      heroRef.current.style.setProperty('--mx', `${x.toFixed(1)}px`);
      heroRef.current.style.setProperty('--my', `${y.toFixed(1)}px`);
    });
  };

  const handleMouseLeave = () => {
    if (heroRef.current) {
      heroRef.current.style.setProperty('--mx', '0px');
      heroRef.current.style.setProperty('--my', '0px');
    }
  };

  return (
    <section
      id="hero-section"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden pt-4 pb-16 lg:pt-8 lg:pb-24"
    >
      <div
        className="pointer-events-none absolute -top-36 -right-36 w-[520px] h-[520px] rounded-full opacity-35 blur-3xl"
        style={{ background: 'radial-gradient(circle, #C7F36B 0%, rgba(72,168,90,0) 70%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -left-40 w-[440px] h-[440px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #48A85A 0%, rgba(18,61,42,0) 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-7 relative z-10">
            <div className="inline-flex flex-wrap items-center gap-2.5 p-1.5 pr-4 rounded-full bg-white border border-[#123D2A]/12 shadow-sm mb-7">
              <span
                className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5"
                style={{ backgroundColor: '#123D2A', color: '#C7F36B' }}
              >
                <span className="w-2 h-2 rounded-full bg-[#C7F36B] animate-ping" />
                Harvest Batch #409
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#20251F]">
                Picked at 4:00 AM • Express {currentLocation.eta} to {currentLocation.city}
              </span>
            </div>

            <h1 className="fc-hero-headline font-extrabold tracking-[-0.035em] text-[#123D2A] mb-6">
              <span className="block fc-reveal-1">Freshness</span>
              <span className="block fc-reveal-2">
                <span className="fc-font-serif italic font-normal text-[#48A85A]">Delivered</span> to
              </span>
              <span className="block fc-reveal-3 flex flex-wrap items-center gap-3 sm:gap-5">
                <span>Your Door.</span>
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm sm:text-base font-extrabold tracking-normal align-middle shadow-sm"
                  style={{ backgroundColor: '#C7F36B', color: '#123D2A' }}
                >
                  <Leaf className="w-4 h-4 stroke-[2.5]" /> 100% Organic & Local
                </span>
              </span>
            </h1>

            <p className="fc-body-lg text-[#20251F]/80 max-w-2xl mb-8 leading-relaxed">
              Experience India’s first farm-to-table digital grocer with 6-stage optical quality grading, reusable glass & breathable linen packaging, and unbroken 4°C cold-chain delivery straight from Ratnagiri, Ooty, and Panchgani estates.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                type="button"
                onClick={onShopNow}
                className="fc-magnetic-btn group relative inline-flex items-center gap-3.5 px-8 py-4 sm:py-5 rounded-full font-extrabold text-base sm:text-lg shadow-[0_20px_40px_-12px_rgba(18,61,42,0.45)] transition-all duration-300 hover:-translate-y-1"
                style={{ backgroundColor: '#123D2A', color: '#FFFFFF' }}
              >
                <span>Shop Fresh Now</span>
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1"
                  style={{ backgroundColor: '#C7F36B', color: '#123D2A' }}
                >
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </span>
              </button>

              <button
                type="button"
                onClick={onExploreCategories}
                className="fc-magnetic-btn group inline-flex items-center gap-3 px-7 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg bg-white text-[#123D2A] border-2 border-[#123D2A]/15 hover:border-[#123D2A] transition-all duration-300 hover:-translate-y-1 shadow-sm"
              >
                <span>Explore Categories</span>
                <Compass className="w-5 h-5 text-[#48A85A] transition-transform duration-300 group-hover:rotate-45" />
              </button>

              <button
                type="button"
                onClick={onOpenFilmModal}
                className="inline-flex items-center gap-2.5 px-4 py-3 rounded-full text-sm font-bold text-[#123D2A] hover:bg-[#123D2A]/5 transition-colors"
              >
                <span className="w-9 h-9 rounded-full bg-[#C7F36B]/60 flex items-center justify-center text-[#123D2A]">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </span>
                <span>Our 4 AM Harvest Story</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-[#123D2A]/12 max-w-xl">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#123D2A]">
                  <AnimatedCounter value="18" suffix=" min" />
                </div>
                <div className="text-xs sm:text-sm text-[#5C635A] font-medium">
                  Avg Cold-Bag Dispatch
                </div>
              </div>
              <div className="border-l border-[#123D2A]/12 pl-3 sm:pl-4">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#123D2A]">
                  <AnimatedCounter value="99.4" suffix="%" />
                </div>
                <div className="text-xs sm:text-sm text-[#5C635A] font-medium">
                  Peak Ripeness Accuracy
                </div>
              </div>
              <div className="border-l border-[#123D2A]/12 pl-3 sm:pl-4">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#123D2A]">
                  <AnimatedCounter value="140" suffix="+" />
                </div>
                <div className="text-xs sm:text-sm text-[#5C635A] font-medium">
                  Partner Organic Estates
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div
              className="relative mx-auto max-w-lg lg:max-w-none transition-transform duration-200 ease-out"
              style={{
                transform: 'translate3d(calc(var(--mx, 0px) * 0.5), calc(var(--my, 0px) * 0.5), 0)'
              }}
            >
              <div
                className="relative rounded-[36px] p-3 sm:p-4 shadow-[0_35px_90px_-20px_rgba(18,61,42,0.35)] overflow-hidden"
                style={{ backgroundColor: '#123D2A' }}
              >
                <div className="relative rounded-[28px] overflow-hidden aspect-[4/3.4]">
                  <img
                    src={SCENE_IMAGES.hero}
                    alt="Artisanal woven basket overflowing with fresh organic vegetables, heirloom tomatoes, avocados, strawberries, sourdough bread, and farm milk"
                    fetchpriority="high"
                    decoding="async"
                    className="w-full h-full object-cover scale-105 transition-transform duration-700 hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(18,61,42,0.08) 0%, rgba(18,61,42,0.58) 100%)'
                    }}
                  />

                  <div className="absolute top-4 left-4 bg-[#123D2A]/90 backdrop-blur-md text-white px-3.5 py-2 rounded-2xl border border-white/15 flex items-center gap-2.5 shadow-lg fc-float-slow">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C7F36B]" />
                    <div className="text-xs">
                      <div className="font-bold text-[#C7F36B]">OPTICAL GRADE A+</div>
                      <div className="text-[11px] text-white/80">Core Temp: 4.2°C • Zero Wax</div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-white">
                    <div>
                      <span className="text-[11px] uppercase tracking-[0.2em] text-[#C7F36B] font-bold block">
                        Today’s Signature Basket
                      </span>
                      <p className="fc-font-serif text-lg sm:text-xl">
                        Nilgiri Greens, Panchgani Berries & Wild Levain Boule
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold shrink-0">
                      Free Delivery &gt; ₹499
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="mt-4 sm:mt-0 flex items-center justify-between sm:justify-start gap-3.5 bg-white/95 backdrop-blur-xl p-3 pr-4 rounded-2xl shadow-[0_20px_50px_rgba(18,61,42,0.22)] border border-[#123D2A]/10 sm:absolute sm:-bottom-6 sm:-left-6 z-20 fc-float-medium"
                style={{
                  transform: 'translate3d(calc(var(--mx, 0px) * -0.8), calc(var(--my, 0px) * -0.8), 0)'
                }}
              >
                <img
                  src={heroMango.image}
                  alt={heroMango.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase"
                      style={{ backgroundColor: '#C7F36B', color: '#123D2A' }}
                    >
                      GI Tagged
                    </span>
                    <span className="text-xs font-bold text-[#48A85A]">★ 4.9</span>
                  </div>
                  <div className="text-sm font-extrabold text-[#20251F] mt-0.5">
                    {heroMango.name}
                  </div>
                  <div className="text-xs font-bold text-[#123D2A]">
                    ₹{heroMango.price}{' '}
                    <span className="line-through text-[#777D75] font-normal">
                      ₹{heroMango.originalPrice}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onQuickAddProduct(heroMango)}
                  className="ml-2 w-9 h-9 rounded-xl flex items-center justify-center transition-transform hover:scale-110 shadow-sm"
                  style={{ backgroundColor: '#123D2A', color: '#C7F36B' }}
                  aria-label="Quick add Alphonso Mango to cart"
                  title="Quick Add to Cart"
                >
                  <Plus className="w-4 h-4 stroke-[2.6]" />
                </button>
              </div>

              <div
                className="hidden sm:flex items-center gap-3 bg-[#C7F36B] text-[#123D2A] px-4 py-3 rounded-2xl shadow-xl border border-[#123D2A]/15 absolute -top-5 -right-4 z-20 fc-float-fast"
                style={{
                  transform: 'translate3d(calc(var(--mx, 0px) * 0.7), calc(var(--my, 0px) * -0.6), 0)'
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#123D2A] text-[#C7F36B] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="leading-tight">
                  <div className="text-xs font-extrabold uppercase tracking-wider">
                    100% Quality Checked
                  </div>
                  <div className="text-[11px] font-semibold opacity-85">
                    Eurofins Zero-Pesticide Certified
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
