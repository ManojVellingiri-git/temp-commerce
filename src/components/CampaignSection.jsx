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

export default function CampaignSection({ onApplyPromo, appliedPromo, onAddBundle, onShopCategory }) {
  const [copiedCode, setCopiedCode] = useState('');

  const handleCopyCode = (code) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code);
      }
    } catch (e) {
      // Fallback handled silently
    }
    onApplyPromo(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2500);
  };

  return (
    <section id="campaign-section" className="py-16 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-8">
        <div
          className="relative rounded-[36px] overflow-hidden p-8 sm:p-12 lg:p-16 shadow-2xl"
          style={{ backgroundColor: '#123D2A', color: '#F8F7EF' }}
        >
          <div
            className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-25 blur-3xl"
            style={{ background: 'radial-gradient(circle, #C7F36B 0%, transparent 70%)' }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-extrabold uppercase tracking-[0.2em] text-[#C7F36B] mb-6">
                <Flame className="w-4 h-4" /> Limited Harvest Privilege
              </div>

              <h2 className="fc-section-heading font-extrabold tracking-tight text-white mb-4">
                Eat Better.{' '}
                <span className="fc-font-serif italic font-normal text-[#C7F36B]">
                  Live Fresher.
                </span>
              </h2>

              <p className="fc-body-lg text-white/80 max-w-xl mb-8 leading-relaxed">
                Upgrade your weekly kitchen ritual with zero-pesticide organic fruits, cold-pressed juices, and 4:00 AM highland greens. Unlock an instant 25% privilege on your harvest basket today.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-8 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 max-w-xl">
                <div
                  className="px-4 py-2.5 rounded-xl font-extrabold text-xl sm:text-2xl tracking-tight shrink-0"
                  style={{ backgroundColor: '#C7F36B', color: '#123D2A' }}
                >
                  FLAT 25% OFF
                </div>
                <div className="flex-1 min-w-[160px]">
                  <div className="text-xs uppercase tracking-widest text-[#C7F36B] font-bold">
                    Privilege Code • Free Cold-Bag
                  </div>
                  <div className="text-sm text-white/90 font-semibold">
                    Valid on orders above ₹599 across all aisles
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyCode('FRESH25')}
                  className="px-4 py-2.5 rounded-xl bg-white text-[#123D2A] font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#C7F36B] transition-colors"
                >
                  {copiedCode === 'FRESH25' || appliedPromo === 'FRESH25' ? (
                    <>
                      <Check className="w-4 h-4 text-[#48A85A]" /> FRESH25 Applied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Apply FRESH25
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onShopCategory('Organic Products')}
                  className="px-8 py-4 rounded-full font-extrabold text-base flex items-center gap-3 transition-transform hover:scale-105 shadow-lg"
                  style={{ backgroundColor: '#C7F36B', color: '#123D2A' }}
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <span className="text-xs text-white/70 font-medium">
                  *Automatically applies 25% discount inside your Cart & Checkout drawer.
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-[28px] overflow-hidden shadow-2xl border border-white/15 group">
                <img
                  src={SCENE_IMAGES.campaign}
                  alt="Overhead editorial photography of fresh organic mangoes, heirloom carrots, broccoli, citrus, and berries"
                  loading="lazy"
                  className="w-full h-[320px] sm:h-[360px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#123D2A]/90 backdrop-blur-md border border-white/15 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-extrabold uppercase tracking-wider text-[#C7F36B]">
                      Complete Farm Harvest Box
                    </div>
                    <div className="text-sm font-bold text-white">
                      Mango + Carrots + Broccoli + Spinach
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      onAddBundle(
                        ['fc-01', 'fc-15', 'fc-07', 'fc-06'],
                        'Eat Better Organic Harvest Box'
                      )
                    }
                    className="px-3.5 py-2 rounded-xl font-extrabold text-xs bg-[#C7F36B] text-[#123D2A] hover:scale-105 transition-transform shrink-0"
                  >
                    + Add Box (₹562)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-[32px] bg-white border border-[#123D2A]/10 p-7 sm:p-9 flex flex-col sm:flex-row items-center gap-6 shadow-sm hover:shadow-xl transition-all">
            <img
              src={SCENE_IMAGES.bakery}
              alt="Daily Morning Essentials: Sourdough Bread, A2 Milk, and Farm Eggs"
              loading="lazy"
              className="w-full sm:w-48 h-48 rounded-2xl object-cover shrink-0"
            />
            <div className="flex-1">
              <span
                className="inline-block px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider mb-2.5"
                style={{ backgroundColor: '#C7F36B', color: '#123D2A' }}
              >
                6:00 AM Breakfast Club
              </span>
              <h3 className="text-2xl font-extrabold text-[#123D2A] leading-tight mb-2">
                Daily Artisanal Essentials Trio
              </h3>
              <p className="text-sm text-[#777D75] mb-4 leading-relaxed">
                Wild Levain Sourdough + 1L Gir Cow A2 Glass Milk + 6 Pasture-Raised Brown Eggs delivered warm before breakfast.
              </p>
              <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#123D2A]/10">
                <div>
                  <span className="text-xl font-extrabold text-[#123D2A]">₹430</span>
                  <span className="text-xs text-[#777D75] line-through ml-1.5">₹505</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onAddBundle(['fc-10', 'fc-08', 'fc-09'], 'Morning Essentials Trio')
                  }
                  className="px-4 py-2.5 rounded-full font-extrabold text-xs uppercase tracking-wider bg-[#123D2A] text-white hover:bg-[#48A85A] transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-[#C7F36B]" /> Add Essentials Trio
                </button>
              </div>
            </div>
          </div>

          <div
            className="rounded-[32px] p-7 sm:p-9 flex flex-col sm:flex-row items-center gap-6 shadow-sm hover:shadow-xl transition-all border border-[#123D2A]/15"
            style={{ backgroundColor: '#EBF4E6' }}
          >
            <img
              src={STUDIO_ASSETS.prod_household}
              alt="Organic Household and Pantry Essentials"
              loading="lazy"
              className="w-full sm:w-48 h-48 rounded-2xl object-cover shrink-0"
            />
            <div className="flex-1">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#123D2A] text-[#C7F36B] mb-2.5">
                Zero-Plastic Living
              </span>
              <h3 className="text-2xl font-extrabold text-[#123D2A] leading-tight mb-2">
                Pure Botanical Pantry & Home
              </h3>
              <p className="text-sm text-[#20251F]/75 mb-4 leading-relaxed">
                Pair our Nilgiri Eucalyptus Produce Wash with Sonora California Almonds and Truffle Makhana for a clean kitchen.
              </p>
              <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#123D2A]/10">
                <div>
                  <span className="text-xl font-extrabold text-[#123D2A]">₹744</span>
                  <span className="text-xs text-[#777D75] line-through ml-1.5">₹915</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onAddBundle(['fc-16', 'fc-12', 'fc-14'], 'Botanical Pantry Trio')
                  }
                  className="px-4 py-2.5 rounded-full font-extrabold text-xs uppercase tracking-wider bg-[#123D2A] text-[#C7F36B] hover:bg-[#48A85A] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Organic Set
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
