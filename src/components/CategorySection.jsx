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

export default function CategorySection({ selectedCategory, onSelectCategory }) {
  return (
    <section id="categories-section" className="py-16 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.22em] text-[#48A85A] mb-3">
              <Leaf className="w-4 h-4" /> Curated Farm & Pantry Aisles
            </div>
            <h2 className="fc-section-heading font-extrabold text-[#123D2A] tracking-tight">
              Explore by <span className="fc-font-serif italic font-normal text-[#48A85A]">Category.</span>
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="fc-body-text text-[#777D75] max-w-md">
              Click any aisle below to filter our live harvest catalog. Every category is temperature-zoned from farm gate to doorstep.
            </p>
            {selectedCategory !== 'All' && (
              <button
                type="button"
                onClick={() => onSelectCategory('All')}
                className="px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#123D2A] text-[#C7F36B] hover:bg-[#48A85A] hover:text-white transition-colors"
              >
                Reset Filter ({selectedCategory}) ✕
              </button>
            )}
          </div>
        </div>

        <div className="flex lg:grid lg:grid-cols-12 gap-5 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x snap-mandatory fc-no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  onSelectCategory(cat.id === selectedCategory ? 'All' : cat.id);
                  const shopEl = document.getElementById('shop-section');
                  if (shopEl) {
                    shopEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`${cat.span} min-w-[275px] sm:min-w-[310px] lg:min-w-0 snap-start group relative rounded-[28px] overflow-hidden text-left transition-all duration-500 flex flex-col justify-between h-[280px] sm:h-[300px] p-6 shadow-md hover:shadow-2xl ${
                  isActive ? 'ring-4 ring-[#48A85A] -translate-y-1.5' : 'hover:-translate-y-1.5'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: isActive
                      ? 'linear-gradient(180deg, rgba(18,61,42,0.35) 0%, rgba(18,61,42,0.92) 100%)'
                      : 'linear-gradient(180deg, rgba(18,61,42,0.12) 0%, rgba(18,61,42,0.84) 100%)'
                  }}
                />

                <div className="relative z-10 flex items-center justify-between gap-2 w-full">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-sm transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: '#C7F36B', color: '#123D2A' }}
                  >
                    {cat.badge}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/35 backdrop-blur-md text-white border border-white/15">
                    {cat.count}
                  </span>
                </div>

                <div className="relative z-10 w-full">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <h3 className="text-2xl sm:text-[26px] font-extrabold text-white tracking-tight leading-tight mb-1">
                        {cat.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/80 line-clamp-1">
                        {cat.subtitle}
                      </p>
                    </div>
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isActive
                          ? 'bg-[#C7F36B] text-[#123D2A] rotate-0'
                          : 'bg-white/15 backdrop-blur-md text-white group-hover:bg-[#C7F36B] group-hover:text-[#123D2A]'
                      }`}
                    >
                      {isActive ? (
                        <Check className="w-5 h-5 stroke-[2.8]" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 stroke-[2.4]" />
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
