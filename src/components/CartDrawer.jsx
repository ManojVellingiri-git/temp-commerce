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

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onQuickAddSuggestion
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const deliveryFee = subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 49;
  const total = subtotal + deliveryFee;
  const amountToFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progressPct = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  const cartIds = new Set(cartItems.map((c) => c.id));
  const suggestions = INITIAL_PRODUCTS.filter((p) => !cartIds.has(p.id)).slice(0, 2);

  const handleWhatsAppOrder = () => {
    let text = `*New Order Request — Gurkhahills Shopping Complex*\n\n`;
    text += `*Items:*\n`;
    cartItems.forEach((item, idx) => {
      text += `${idx + 1}. ${item.name} (${item.selectedWeight || item.weight}) x ${item.qty} = ₹${item.price * item.qty}\n`;
    });
    text += `\n*Item Subtotal:* ₹${subtotal}\n`;
    text += `*4°C Delivery:* ${deliveryFee === 0 ? 'FREE' : '₹' + deliveryFee}\n`;
    text += `*Total Payable:* ₹${total}\n\n`;
    text += `Please confirm availability and dispatch window. Thank you!`;
    openWhatsAppDirect(text);
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end" role="dialog" aria-modal="true" aria-label="Shopping Cart">
      <div className="fixed inset-0 bg-[#20251F]/65 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#F8F7EF] h-full shadow-2xl z-10 flex flex-col justify-between overflow-hidden">
        <div className="p-6 bg-white border-b border-[#123D2A]/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: '#123D2A', color: '#C7F36B' }}
              >
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-[#123D2A]">Your Harvest Basket</h3>
                <p className="text-xs text-[#777D75]">
                  {cartItems.reduce((s, i) => s + i.qty, 0)} items • 4°C Cold-Bag Dispatch
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-[#F8F7EF] text-[#20251F] hover:bg-[#123D2A] hover:text-white transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F8F7EF] border border-[#123D2A]/10">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              {amountToFreeDelivery === 0 && subtotal > 0 ? (
                <span className="text-[#48A85A] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Unlocked FREE Express Cold-Bag Delivery!
                </span>
              ) : (
                <span className="text-[#20251F]">
                  Add <strong className="text-[#123D2A]">₹{amountToFreeDelivery}</strong> more for{' '}
                  <strong className="text-[#48A85A]">FREE Delivery</strong>
                </span>
              )}
              <span className="font-mono text-[11px] text-[#777D75]">{progressPct}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#123D2A]/10 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${progressPct}%`,
                  backgroundColor: progressPct >= 100 ? '#48A85A' : '#123D2A'
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-3xl bg-white border border-[#123D2A]/10 flex items-center justify-center mx-auto mb-4 text-[#123D2A]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-extrabold text-[#123D2A] mb-2">
                Your basket is empty
              </h4>
              <p className="text-sm text-[#777D75] mb-6 max-w-xs mx-auto">
                Add Ratnagiri Alphonso mangoes, A2 farm milk, or 5 AM sourdough to start your harvest basket.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-full font-extrabold text-xs uppercase tracking-wider bg-[#123D2A] text-[#C7F36B]"
              >
                Explore Fresh Produce
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs text-[#777D75]">
                <span>Harvest Items</span>
                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-red-700 hover:underline font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear Basket
                </button>
              </div>

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-3.5 border border-[#123D2A]/10 flex items-center gap-3.5 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-extrabold text-sm text-[#20251F] truncate">
                        {item.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#777D75] hover:text-red-600"
                        aria-label={`Remove ${item.name}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-xs text-[#777D75] mb-2">{item.selectedWeight || item.weight}</div>
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-[#123D2A]">
                        ₹{item.price * item.qty}
                      </span>
                      <div className="flex items-center gap-2 bg-[#F8F7EF] rounded-xl px-2 py-1 border border-[#123D2A]/10">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, item.qty - 1)}
                          className="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-[#123D2A]"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-extrabold w-5 text-center tabular-nums">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, item.qty + 1)}
                          className="w-6 h-6 rounded-lg bg-[#123D2A] text-[#C7F36B] flex items-center justify-center"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {suggestions.length > 0 && (
                <div className="pt-4 border-t border-[#123D2A]/10">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-[#777D75] mb-2.5">
                    Complete Your Meal With
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {suggestions.map((sug) => (
                      <div
                        key={sug.id}
                        className="bg-white p-2.5 rounded-xl border border-[#123D2A]/10 flex items-center gap-2.5"
                      >
                        <img
                          src={sug.image}
                          alt={sug.name}
                          className="w-11 h-11 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-[#20251F] truncate">
                            {sug.name}
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs font-extrabold text-[#123D2A]">
                              ₹{sug.price}
                            </span>
                            <button
                              type="button"
                              onClick={() => onQuickAddSuggestion(sug)}
                              className="px-2 py-0.5 rounded-md bg-[#123D2A] text-[#C7F36B] text-[10px] font-extrabold"
                            >
                              + Add
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 bg-white border-t border-[#123D2A]/12 space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#777D75]">
                <span>Item Subtotal</span>
                <span className="font-bold text-[#20251F]">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-[#777D75]">
                <span>4°C Cold-Bag Delivery</span>
                <span className="font-bold text-[#20251F]">
                  {deliveryFee === 0 ? (
                    <span className="text-[#48A85A]">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#123D2A] pt-2 border-t border-[#123D2A]/10">
                <span>Total Payable</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onProceedToCheckout}
              className="w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-between px-6 shadow-xl transition-transform hover:scale-[1.01]"
              style={{ backgroundColor: '#123D2A', color: '#C7F36B' }}
            >
              <span>Proceed to Checkout</span>
              <span className="flex items-center gap-1.5">
                ₹{total} <ArrowRight className="w-4 h-4" />
              </span>
            </button>

            <button
              type="button"
              onClick={handleWhatsAppOrder}
              className="w-full py-3 rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2 border border-[#25D366]/40 bg-[#25D366]/10 text-[#0f5132] hover:bg-[#25D366] hover:text-white transition-all shadow-xs"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>Order Basket via WhatsApp</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
