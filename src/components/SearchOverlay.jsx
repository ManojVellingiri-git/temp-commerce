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

export default function SearchOverlay({ isOpen, onClose, onAddToCart, onQuickView }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const suggestions = ['Alphonso Mango', 'Sourdough', 'A2 Milk', 'Avocado', 'Spinach', 'Salmon'];
  const filtered = INITIAL_PRODUCTS.filter((p) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  return (
    <div
      className="fixed inset-0 z-[105] bg-[#20251F]/75 backdrop-blur-md flex flex-col items-center p-4 sm:p-8 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Search Gurkhahills Shopping Complex"
    >
      <div className="w-full max-w-4xl bg-[#F8F7EF] rounded-[32px] p-6 sm:p-8 shadow-2xl border border-[#123D2A]/15 my-auto">
        <div className="flex items-center gap-3 pb-5 border-b border-[#123D2A]/12">
          <Search className="w-6 h-6 text-[#48A85A] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Ratnagiri mangoes, A2 milk, 36h sourdough, hydroponic greens..."
            className="w-full bg-transparent text-lg sm:text-xl font-extrabold text-[#123D2A] placeholder-[#777D75] focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-xs font-bold text-[#777D75] hover:text-[#20251F]"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white text-[#20251F] border border-[#123D2A]/10"
            aria-label="Close search overlay"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 py-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#777D75] mr-1">
            Trending:
          </span>
          {suggestions.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setQuery(tag)}
              className="px-3 py-1 rounded-full text-xs font-bold bg-white border border-[#123D2A]/12 text-[#123D2A] hover:bg-[#123D2A] hover:text-[#C7F36B] transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-base font-extrabold text-[#123D2A] mb-1">
              No produce matched “{query}”
            </p>
            <p className="text-xs text-[#777D75]">
              Try searching for fruits, vegetables, sourdough, milk, or almonds.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
            {filtered.slice(0, 8).map((prod) => (
              <div
                key={prod.id}
                className="bg-white p-3 rounded-2xl border border-[#123D2A]/10 flex items-center justify-between gap-3"
              >
                <div
                  onClick={() => {
                    onClose();
                    onQuickView(prod);
                  }}
                  className="flex items-center gap-3 cursor-pointer min-w-0"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-extrabold text-sm text-[#20251F] truncate">
                      {prod.name}
                    </div>
                    <div className="text-xs text-[#777D75]">{prod.weight}</div>
                    <div className="text-sm font-extrabold text-[#123D2A]">₹{prod.price}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onAddToCart(prod, 1, prod.weight)}
                  className="px-3.5 py-2 rounded-xl bg-[#123D2A] text-[#C7F36B] text-xs font-extrabold shrink-0 hover:bg-[#48A85A] hover:text-white transition-colors"
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
