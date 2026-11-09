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

export default function SeasonalFreshnessSection({ onAddBundle, onQuickViewProduct }) {
  const [activeTabId, setActiveTabId] = useState('fruits');
  const activeCuration =
    SEASONAL_CURATIONS.find((c) => c.id === activeTabId) || SEASONAL_CURATIONS[0];

  const bundleProducts = activeCuration.bundleIds
    .map((id) => INITIAL_PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <section className="py-16 lg:py-24 bg-white border-y border-[#123D2A]/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.22em] text-[#48A85A] mb-3">
              <Sparkles className="w-4 h-4" /> Editorial Harvest Lookbook
            </div>
            <h2 className="fc-section-heading font-extrabold text-[#123D2A] tracking-tight">
              Seasonal <span className="fc-font-serif italic font-normal text-[#48A85A]">Freshness</span> Journal.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {SEASONAL_CURATIONS.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTabId(tab.id)}
                  className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all ${
                    isActive
                      ? 'bg-[#123D2A] text-[#C7F36B] shadow-md'
                      : 'bg-[#F8F7EF] text-[#20251F] hover:bg-[#123D2A]/10'
                  }`}
                >
                  {tab.tab}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="relative rounded-[32px] overflow-hidden shadow-xl border border-[#123D2A]/12 aspect-[4/3]">
              <img
                src={activeCuration.image}
                alt={activeCuration.title}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(18,61,42,0.12) 0%, rgba(18,61,42,0.55) 100%)'
                }}
              />

              {activeCuration.hotspots.map((spot, idx) => {
                const prod = INITIAL_PRODUCTS.find((p) => p.id === spot.productId);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => prod && onQuickViewProduct(prod)}
                    style={{ left: spot.x, top: spot.y }}
                    className="group/spot absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-[#123D2A]/20 hover:bg-[#123D2A] hover:text-white transition-all"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#48A85A] group-hover/spot:bg-[#C7F36B] animate-pulse" />
                    <span className="text-xs font-extrabold whitespace-nowrap">{spot.label}</span>
                  </button>
                );
              })}

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90 bg-[#123D2A]/85 backdrop-blur-md px-4 py-2.5 rounded-2xl">
                <span>💡 Click any interactive pin on the photograph to inspect farm telemetry</span>
                <span className="font-bold text-[#C7F36B] hidden sm:inline">4°C Verified</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-[#C7F36B] text-[#123D2A]">
              {activeCuration.eyebrow}
            </span>

            <h3 className="fc-font-serif text-3xl sm:text-4xl text-[#123D2A] leading-tight">
              {activeCuration.title}
            </h3>

            <p className="fc-body-text text-[#20251F]/80 leading-relaxed">
              {activeCuration.description}
            </p>

            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#F8F7EF] border border-[#123D2A]/10">
              {activeCuration.stats.map((st, i) => (
                <div key={i}>
                  <div className="text-xl font-extrabold text-[#123D2A]">{st.value}</div>
                  <div className="text-[11px] font-semibold text-[#777D75]">{st.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-2.5">
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#777D75]">
                Included in This Seasonal Curation ({bundleProducts.length} Items):
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {bundleProducts.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onQuickViewProduct(item)}
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-[#F8F7EF] hover:bg-[#123D2A]/5 border border-[#123D2A]/10 text-left transition-colors"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-extrabold text-[#20251F] truncate">
                        {item.name}
                      </div>
                      <div className="text-[11px] font-bold text-[#48A85A]">₹{item.price}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="block text-xs text-[#777D75] font-semibold">
                  Complete 4-Item Seasonal Box
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-[#123D2A]">
                    ₹{activeCuration.bundlePrice}
                  </span>
                  <span className="text-sm text-[#777D75] line-through">
                    ₹{activeCuration.bundleOriginal}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  onAddBundle(activeCuration.bundleIds, `${activeCuration.tab} Box`)
                }
                className="px-6 py-3.5 rounded-full font-extrabold text-sm bg-[#123D2A] text-[#C7F36B] hover:bg-[#48A85A] hover:text-white transition-all flex items-center gap-2 shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add All 4 to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
