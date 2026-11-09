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

export default function ProductCard({
  product,
  cartQty,
  isWishlisted,
  onAddToCart,
  onUpdateQty,
  onToggleWishlist,
  onQuickView
}) {
  const [selectedWeight, setSelectedWeight] = useState(product.weight);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, 1, selectedWeight);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 900);
  };

  return (
    <article
      className="fc-product-card group relative bg-white rounded-[28px] border border-[#123D2A]/10 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_60px_-18px_rgba(18,61,42,0.2)]"
    >
      <div>
        <div className="relative aspect-[4/3.1] overflow-hidden bg-[#F8F7EF]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onClick={() => onQuickView(product)}
            className="w-full h-full object-cover cursor-pointer transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="fc-card-sheen pointer-events-none absolute inset-0" />

          <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
            {product.discount && (
              <span
                className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-sm"
                style={{ backgroundColor: '#123D2A', color: '#C7F36B' }}
              >
                {product.discount}
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-md text-[#123D2A] shadow-sm">
              {product.badge}
            </span>
          </div>

          <div className="absolute top-3.5 right-3.5 flex flex-col gap-2 z-10">
            <button
              type="button"
              onClick={() => onToggleWishlist(product.id)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ${
                isWishlisted
                  ? 'bg-[#123D2A] text-[#C7F36B] scale-110'
                  : 'bg-white/90 backdrop-blur-md text-[#20251F] hover:bg-[#123D2A] hover:text-white'
              }`}
              aria-label={
                isWishlisted
                  ? `Remove ${product.name} from wishlist`
                  : `Add ${product.name} to wishlist`
              }
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>

            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#20251F] hover:bg-[#123D2A] hover:text-white flex items-center justify-center transition-all shadow-md"
              aria-label={`Quick view ${product.name}`}
              title="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between gap-2 pointer-events-none">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#20251F]/80 backdrop-blur-md text-white truncate">
              🌱 {product.harvestTime}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-white/95 text-[#123D2A] flex items-center gap-1 shrink-0 shadow-sm">
              <Star className="w-3.5 h-3.5 fill-[#48A85A] text-[#48A85A]" />
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="p-5 pb-4">
          <div className="flex items-center justify-between gap-2 text-xs font-bold uppercase tracking-wider text-[#48A85A] mb-1">
            <span>{product.category}</span>
            <span className="text-[#777D75] font-medium">({product.reviews} reviews)</span>
          </div>

          <h3
            onClick={() => onQuickView(product)}
            className="fc-product-title font-extrabold text-[#20251F] hover:text-[#48A85A] cursor-pointer transition-colors leading-snug mb-1"
          >
            {product.name}
          </h3>
          <p className="text-xs text-[#777D75] line-clamp-1 mb-3.5">{product.subtitle}</p>

          <div className="flex items-center gap-1.5 flex-wrap mb-4">
            {product.weightOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setSelectedWeight(opt)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
                  selectedWeight === opt
                    ? 'bg-[#F8F7EF] border-[#123D2A] text-[#123D2A]'
                    : 'bg-white border-[#123D2A]/12 text-[#777D75] hover:border-[#123D2A]/30'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 pt-3 border-t border-[#123D2A]/8 flex items-center justify-between gap-3">
        <div>
          <span className="block text-[11px] uppercase tracking-wider text-[#777D75] font-semibold">
            MRP Incl. Taxes
          </span>
          <div className="flex items-baseline gap-2">
            <span className="fc-product-price font-extrabold text-[#123D2A] tabular-nums">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-[#777D75] line-through tabular-nums">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {cartQty > 0 ? (
          <div
            className="flex items-center gap-2 px-2 py-1.5 rounded-2xl shadow-sm"
            style={{ backgroundColor: '#123D2A', color: '#FFFFFF' }}
          >
            <button
              type="button"
              onClick={() => onUpdateQty(product.id, cartQty - 1)}
              className="w-8 h-8 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
              aria-label={`Decrease quantity of ${product.name}`}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-6 text-center font-extrabold text-sm tabular-nums text-[#C7F36B]">
              {cartQty}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQty(product.id, cartQty + 1)}
              className="w-8 h-8 rounded-xl bg-[#C7F36B] text-[#123D2A] hover:scale-105 flex items-center justify-center transition-transform"
              aria-label={`Increase quantity of ${product.name}`}
            >
              <Plus className="w-4 h-4 stroke-[2.6]" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleAdd}
            className={`px-5 py-3 rounded-2xl font-extrabold text-sm flex items-center gap-2 transition-all shadow-sm ${
              justAdded
                ? 'bg-[#48A85A] text-white scale-105'
                : 'bg-[#123D2A] text-white hover:bg-[#48A85A] hover:scale-[1.03]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 stroke-[2.8]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-[#C7F36B]" />
                <span>Add</span>
              </>
            )}
          </button>
        )}
      </div>
    </article>
  );
}
