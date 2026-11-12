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

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistIds,
  onToggleWishlist,
  onMoveToCart,
  allProducts = INITIAL_PRODUCTS
}) {
  if (!isOpen) return null;

  const productList = allProducts && allProducts.length > 0 ? allProducts : INITIAL_PRODUCTS;
  const wishProducts = productList.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-[100] flex justify-end" role="dialog" aria-modal="true" aria-label="Saved Wishlist">
      <div className="fixed inset-0 bg-[#20251F]/65 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#F8F7EF] h-full shadow-2xl z-10 flex flex-col justify-between">
        <div className="p-6 bg-white border-b border-[#123D2A]/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#123D2A] text-[#C7F36B] flex items-center justify-center">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[#123D2A]">Saved Wishlist</h3>
              <p className="text-xs text-[#777D75]">{wishProducts.length} favorite harvest items</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-[#F8F7EF] text-[#20251F]"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {wishProducts.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-10 h-10 text-[#777D75] mx-auto mb-3" />
              <h4 className="text-lg font-extrabold text-[#123D2A] mb-1">
                No favorites saved yet
              </h4>
              <p className="text-xs text-[#777D75]">
                Tap the heart icon on any produce card to curate your personal weekly shopping list.
              </p>
            </div>
          ) : (
            wishProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3.5 rounded-2xl border border-[#123D2A]/10 flex items-center gap-3.5"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-sm text-[#20251F] truncate">{item.name}</div>
                  <div className="text-xs text-[#777D75]">{item.weight}</div>
                  <div className="text-sm font-extrabold text-[#123D2A] mt-1">₹{item.price}</div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={() => onMoveToCart(item)}
                    className="px-3 py-1.5 rounded-xl bg-[#123D2A] text-[#C7F36B] text-xs font-extrabold"
                  >
                    + Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleWishlist(item.id)}
                    className="text-[11px] text-[#777D75] hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
