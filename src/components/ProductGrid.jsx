import ProductCard from './ProductCard';
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

export default function ProductGrid({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onlyOrganic,
  onToggleOrganic,
  under200,
  onToggleUnder200,
  cartMap,
  wishlistIds,
  onAddToCart,
  onUpdateQty,
  onToggleWishlist,
  onQuickView,
  onClearAllFilters
}) {
  const categoryPills = ['All', ...CATEGORIES.map((c) => c.id)];

  return (
    <section id="shop-section" className="py-16 lg:py-24 bg-white/60 border-y border-[#123D2A]/8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.22em] text-[#48A85A] mb-3">
              <Sparkles className="w-4 h-4" /> Hand-Graded Daily Harvest
            </div>
            <h2 className="fc-section-heading font-extrabold text-[#123D2A] tracking-tight">
              Featured <span className="fc-font-serif italic font-normal text-[#48A85A]">Market</span> Picks.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:flex-initial sm:w-64">
              <Search className="w-4 h-4 text-[#777D75] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Filter by name or origin..."
                aria-label="Filter products by name or origin"
                className="w-full pl-10 pr-8 py-2.5 rounded-full bg-white border border-[#123D2A]/15 text-sm font-medium text-[#20251F] focus:outline-none focus:border-[#48A85A]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777D75] hover:text-[#20251F]"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={onToggleOrganic}
              className={`px-4 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider border transition-all flex items-center gap-1.5 ${
                onlyOrganic
                  ? 'bg-[#123D2A] text-[#C7F36B] border-[#123D2A]'
                  : 'bg-white text-[#20251F] border-[#123D2A]/15 hover:border-[#123D2A]'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" /> 100% Organic
            </button>

            <button
              type="button"
              onClick={onToggleUnder200}
              className={`px-4 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider border transition-all ${
                under200
                  ? 'bg-[#123D2A] text-[#C7F36B] border-[#123D2A]'
                  : 'bg-white text-[#20251F] border-[#123D2A]/15 hover:border-[#123D2A]'
              }`}
            >
              Under ₹200
            </button>

            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              aria-label="Sort products"
              className="px-4 py-2.5 rounded-full bg-white border border-[#123D2A]/15 text-xs font-bold text-[#20251F] focus:outline-none focus:border-[#48A85A]"
            >
              <option value="featured">Sort: Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated (★)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 fc-no-scrollbar">
          {categoryPills.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  active
                    ? 'bg-[#123D2A] text-[#C7F36B] shadow-md scale-[1.02]'
                    : 'bg-[#F8F7EF] text-[#20251F] hover:bg-[#123D2A]/10 border border-[#123D2A]/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {(selectedCategory !== 'All' || searchQuery || onlyOrganic || under200) && (
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8 px-4 py-3 rounded-2xl bg-[#F8F7EF] border border-[#123D2A]/12">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#123D2A]">
              <span>Showing {products.length} harvest items</span>
              {selectedCategory !== 'All' && (
                <span className="px-2.5 py-1 rounded-full bg-white border border-[#123D2A]/15">
                  Category: {selectedCategory}
                </span>
              )}
              {onlyOrganic && (
                <span className="px-2.5 py-1 rounded-full bg-white border border-[#123D2A]/15">
                  Certified Organic
                </span>
              )}
              {under200 && (
                <span className="px-2.5 py-1 rounded-full bg-white border border-[#123D2A]/15">
                  Under ₹200
                </span>
              )}
              {searchQuery && (
                <span className="px-2.5 py-1 rounded-full bg-white border border-[#123D2A]/15">
                  Search: “{searchQuery}”
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={onClearAllFilters}
              className="text-xs font-extrabold text-[#48A85A] hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Clear All Filters
            </button>
          </div>
        )}

        {products.length === 0 ? (
          <div className="bg-[#F8F7EF] rounded-[32px] p-12 text-center max-w-xl mx-auto border border-[#123D2A]/10 my-8">
            <div
              className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4"
              style={{ backgroundColor: '#C7F36B', color: '#123D2A' }}
            >
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#123D2A] mb-2">
              No produce matched your filter
            </h3>
            <p className="fc-body-text text-[#777D75] mb-6">
              We couldn’t find any items matching your current filter combination. Reset your filters to browse all 16 fresh harvest items.
            </p>
            <button
              type="button"
              onClick={onClearAllFilters}
              className="px-6 py-3 rounded-full font-extrabold text-sm bg-[#123D2A] text-[#C7F36B] hover:bg-[#48A85A] hover:text-white transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                cartQty={cartMap[product.id] || 0}
                isWishlisted={wishlistIds.includes(product.id)}
                onAddToCart={onAddToCart}
                onUpdateQty={onUpdateQty}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
