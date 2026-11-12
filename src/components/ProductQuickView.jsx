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
import { WhatsAppIcon, openWhatsAppDirect } from './WhatsAppWidget';

export default function ProductQuickView({
  product,
  onClose,
  isWishlisted,
  onAddToCart,
  onToggleWishlist
}) {
  const [selectedWeight, setSelectedWeight] = useState(product ? product.weight : '');
  const [localQty, setLocalQty] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedWeight(product.weight);
      setLocalQty(1);
    }
  }, [product]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view ${product.name}`}
    >
      <div
        className="fixed inset-0 bg-[#20251F]/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-[32px] max-w-4xl w-full overflow-hidden shadow-2xl border border-[#123D2A]/15 z-10 grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 text-[#20251F] hover:bg-[#123D2A] hover:text-white flex items-center justify-center shadow-md"
          aria-label="Close quick view"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="md:col-span-6 relative bg-[#F8F7EF] min-h-[280px]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span
              className="px-3 py-1 rounded-full text-xs font-extrabold uppercase"
              style={{ backgroundColor: '#123D2A', color: '#C7F36B' }}
            >
              {product.discount}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-[#123D2A]">
              {product.badge}
            </span>
          </div>
        </div>

        <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#48A85A] mb-2">
              <span>{product.category}</span>
              <span>•</span>
              <span>★ {product.rating} ({product.reviews} verified reviews)</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#123D2A] mb-1">
              {product.name}
            </h3>
            <p className="text-sm font-semibold text-[#777D75] mb-4">{product.subtitle}</p>

            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-3xl font-extrabold text-[#123D2A]">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-base text-[#777D75] line-through">
                  ₹{product.originalPrice}
                </span>
              )}
              <span className="text-xs font-bold text-[#48A85A] bg-[#F8F7EF] px-2.5 py-1 rounded-full">
                Inclusive of all taxes
              </span>
            </div>

            <p className="text-sm text-[#20251F]/80 leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="grid grid-cols-3 gap-2.5 p-3.5 rounded-2xl bg-[#F8F7EF] border border-[#123D2A]/10 mb-6 text-xs">
              <div>
                <div className="text-[#777D75] font-medium">Harvest Batch</div>
                <div className="font-extrabold text-[#123D2A] mt-0.5">{product.harvestTime}</div>
              </div>
              <div>
                <div className="text-[#777D75] font-medium">Nutrition</div>
                <div className="font-extrabold text-[#123D2A] mt-0.5">{product.calories}</div>
              </div>
              <div>
                <div className="text-[#777D75] font-medium">Freshness Window</div>
                <div className="font-extrabold text-[#123D2A] mt-0.5">{product.shelfLife}</div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#777D75] mb-2">
                Select Pack Size
              </div>
              <div className="flex flex-wrap gap-2">
                {product.weightOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedWeight(opt)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border transition-all ${
                      selectedWeight === opt
                        ? 'bg-[#123D2A] text-[#C7F36B] border-[#123D2A]'
                        : 'bg-white text-[#20251F] border-[#123D2A]/15'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-[#123D2A]/10">
            <div className="flex items-center border border-[#123D2A]/20 rounded-2xl px-2 py-1.5 bg-[#F8F7EF]">
              <button
                type="button"
                onClick={() => setLocalQty((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-[#123D2A] hover:bg-white"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-extrabold text-sm">{localQty}</span>
              <button
                type="button"
                onClick={() => setLocalQty((q) => q + 1)}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-[#123D2A] hover:bg-white"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                onAddToCart(product, localQty, selectedWeight);
                onClose();
              }}
              className="flex-1 py-3.5 px-5 rounded-2xl font-extrabold text-sm bg-[#123D2A] text-[#C7F36B] hover:bg-[#48A85A] hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart • ₹{product.price * localQty}</span>
            </button>

            <button
              type="button"
              onClick={() => onToggleWishlist(product.id)}
              className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all shrink-0 ${
                isWishlisted
                  ? 'bg-[#123D2A] text-[#C7F36B] border-[#123D2A]'
                  : 'bg-white text-[#20251F] border-[#123D2A]/15'
              }`}
              aria-label="Toggle wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>

            <button
              type="button"
              onClick={() => {
                openWhatsAppDirect(`Hello Gurkhahills! I'm interested in *${product.name}* (${selectedWeight || product.weight}, ₹${product.price}). Could you verify availability and express delivery?`);
              }}
              className="w-12 h-12 rounded-2xl border border-[#25D366]/40 bg-[#25D366]/10 text-[#0f5132] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-all shrink-0 shadow-xs"
              aria-label="Inquire about this product on WhatsApp"
              title="Chat about this item on WhatsApp"
            >
              <WhatsAppIcon className="w-5 h-5 fill-current" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
