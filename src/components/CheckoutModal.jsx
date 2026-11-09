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

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  appliedPromo,
  currentLocation,
  onCompleteDemoOrder
}) {
  const [fullName, setFullName] = useState('Ananya Sundaram');
  const [phone, setPhone] = useState('+91 98422 64102');
  const [address, setAddress] = useState('Villa 14, Botanical Enclave, Race Course Road');
  const [slot, setSlot] = useState('Express 18-Min Cold-Bag Dispatch');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [orderPlaced, setOrderPlaced] = useState(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discountAmount =
    appliedPromo === 'FRESH25'
      ? Math.round(subtotal * 0.25)
      : appliedPromo === 'WELCOME150' && subtotal >= 300
      ? 150
      : 0;
  const deliveryFee = subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 49;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const demoOrder = {
      orderId: `FC-${Math.floor(100000 + Math.random() * 900000)}`,
      total,
      itemCount: cartItems.reduce((s, i) => s + i.qty, 0),
      slot,
      address: `${address}, ${currentLocation.area}, ${currentLocation.city}`,
      paymentMethod
    };
    setOrderPlaced(demoOrder);
    onCompleteDemoOrder(demoOrder);
  };

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="FreshCart Checkout Demonstration"
    >
      <div className="fixed inset-0 bg-[#20251F]/75 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-[#F8F7EF] rounded-[32px] max-w-4xl w-full p-6 sm:p-10 shadow-2xl border border-[#123D2A]/15 z-10 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-5 border-b border-[#123D2A]/12 mb-6">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#C7F36B] text-[#123D2A] mb-1">
              Frontend Demonstration Checkout • No Real Charge
            </span>
            <h3 className="text-2xl font-extrabold text-[#123D2A]">
              Complete Your Cold-Chain Dispatch
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white text-[#20251F]"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderPlaced ? (
          <div className="bg-white rounded-[28px] p-8 text-center border border-[#123D2A]/12">
            <div className="w-16 h-16 rounded-3xl bg-[#C7F36B] text-[#123D2A] flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 stroke-[2.8]" />
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#F8F7EF] text-[#48A85A]">
              Interactive Frontend Demo Confirmation
            </span>
            <h4 className="text-3xl font-extrabold text-[#123D2A] mt-3 mb-2">
              Demo Order #{orderPlaced.orderId} Previewed!
            </h4>
            <p className="text-sm text-[#777D75] max-w-lg mx-auto mb-6">
              This is a frontend e-commerce demonstration—no real payment was processed. Your {orderPlaced.itemCount} harvest items (₹{orderPlaced.total}) are staged for <strong>{orderPlaced.slot}</strong> to {orderPlaced.address}.
            </p>
            <button
              type="button"
              onClick={() => {
                setOrderPlaced(null);
                onClose();
              }}
              className="px-8 py-3.5 rounded-full font-extrabold text-sm bg-[#123D2A] text-[#C7F36B]"
            >
              Return to Gurkhacamp Store
            </button>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-5">
              <div className="bg-white p-5 rounded-2xl border border-[#123D2A]/10 space-y-4">
                <h4 className="text-sm font-extrabold uppercase tracking-wider text-[#123D2A]">
                  1. Contact & Delivery Address
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#777D75] mb-1">
                      Recipient Name
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F7EF] border border-[#123D2A]/15 text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#777D75] mb-1">
                      Mobile Number (For Cold-Bag OTP)
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F7EF] border border-[#123D2A]/15 text-sm font-semibold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#777D75] mb-1">
                    Street Address ({currentLocation.area}, {currentLocation.city} - {currentLocation.pin})
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F7EF] border border-[#123D2A]/15 text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#123D2A]/10 space-y-3">
                <h4 className="text-sm font-extrabold uppercase tracking-wider text-[#123D2A]">
                  2. Cold-Chain Delivery Window
                </h4>
                {[
                  'Express 18-Min Cold-Bag Dispatch',
                  'Today Evening (6:00 PM – 7:00 PM)',
                  'Tomorrow Dawn Harvest (6:30 AM – 7:30 AM)'
                ].map((s) => (
                  <label
                    key={s}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer ${
                      slot === s
                        ? 'bg-[#F8F7EF] border-[#123D2A] font-bold'
                        : 'border-[#123D2A]/10'
                    }`}
                  >
                    <span className="text-xs sm:text-sm text-[#20251F]">{s}</span>
                    <input
                      type="radio"
                      name="deliverySlot"
                      checked={slot === s}
                      onChange={() => setSlot(s)}
                      className="accent-[#123D2A]"
                    />
                  </label>
                ))}
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#123D2A]/10 space-y-3">
                <h4 className="text-sm font-extrabold uppercase tracking-wider text-[#123D2A]">
                  3. Payment Method (Frontend Demo)
                </h4>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'upi', label: 'Instant UPI', icon: Smartphone },
                    { id: 'card', label: 'Credit / Debit', icon: CreditCard },
                    { id: 'cod', label: 'Pay on Delivery', icon: Building2 }
                  ].map((m) => {
                    const IconComp = m.icon;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          paymentMethod === m.id
                            ? 'bg-[#123D2A] text-[#C7F36B] border-[#123D2A]'
                            : 'bg-[#F8F7EF] text-[#20251F] border-[#123D2A]/10'
                        }`}
                      >
                        <IconComp className="w-4 h-4 mb-1" />
                        <div className="text-xs font-extrabold">{m.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white p-6 rounded-2xl border border-[#123D2A]/12 space-y-4">
                <h4 className="text-sm font-extrabold uppercase tracking-wider text-[#123D2A]">
                  Order Summary ({cartItems.length} Products)
                </h4>
                <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#20251F] truncate max-w-[180px]">
                        {item.qty}x {item.name}
                      </span>
                      <span className="font-extrabold text-[#123D2A]">
                        ₹{item.price * item.qty}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#123D2A]/10 space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#777D75]">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#20251F]">₹{subtotal}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#48A85A] font-bold">
                      <span>Discount ({appliedPromo})</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#777D75]">
                    <span>4°C Cold-Bag Delivery Fee</span>
                    <span className="font-bold text-[#20251F]">
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-extrabold text-[#123D2A] pt-2 border-t border-[#123D2A]/10">
                    <span>Demo Order Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl font-extrabold text-sm bg-[#123D2A] text-[#C7F36B] hover:bg-[#48A85A] hover:text-white transition-colors shadow-lg"
                >
                  Place Demo Order • ₹{total}
                </button>
                <p className="text-[11px] text-[#777D75] text-center">
                  Demonstration checkout interface—no real payment gateway transaction is executed.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
