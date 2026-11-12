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

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address to subscribe.');
      return;
    }
    setError('');
    setSubscribed(true);
  };

  return (
    <section id="newsletter-section" className="py-16 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div
          className="relative rounded-[36px] p-8 sm:p-12 lg:p-16 overflow-hidden border border-[#123D2A]/15 shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #F8F7EF 0%, #E5F2DC 55%, #D7F0C2 100%)'
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7">
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-4"
                style={{ backgroundColor: '#123D2A', color: '#C7F36B' }}
              >
                <Mail className="w-3.5 h-3.5" /> The Dawn Harvest Dispatch
              </span>

              <h2 className="fc-section-heading font-extrabold text-[#123D2A] tracking-tight mb-4">
                Fresh Updates,{' '}
                <span className="fc-font-serif italic font-normal text-[#48A85A]">
                  Straight to Your Inbox.
                </span>
              </h2>

              <p className="fc-body-lg text-[#20251F]/80 max-w-xl mb-8">
                Join 48,000+ home chefs receiving weekly peak-season harvest alerts, farm-to-table recipes, and first access to limited Ratnagiri & Nilgiri micro-lots.
              </p>

              {subscribed ? (
                <div className="p-6 rounded-2xl bg-[#123D2A] text-white max-w-xl flex items-center justify-between gap-4 shadow-lg">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-[#C7F36B] text-[#123D2A] flex items-center justify-center shrink-0">
                      <Check className="w-6 h-6 stroke-[2.8]" />
                    </div>
                    <div>
                      <div className="font-extrabold text-base text-[#C7F36B]">
                        You’re on the Dawn Dispatch list!
                      </div>
                      <div className="text-xs text-white/85">
                        Thank you for subscribing. Weekly estate harvest digests will be sent directly to your inbox.
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSubscribed(false);
                      setEmail('');
                    }}
                    className="text-xs underline text-white/70 hover:text-white shrink-0"
                  >
                    Change Email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="max-w-xl" noValidate>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address (e.g. ananya@studio.in)"
                      aria-label="Email address for newsletter"
                      className="flex-1 px-6 py-4 rounded-full bg-white border-2 border-[#123D2A]/15 text-[#20251F] font-medium focus:outline-none focus:border-[#123D2A] shadow-sm"
                    />
                    <button
                      type="submit"
                      className="px-8 py-4 rounded-full font-extrabold text-base bg-[#123D2A] text-[#C7F36B] hover:bg-[#48A85A] hover:text-white transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
                    >
                      <span>Subscribe</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  {error && (
                    <p className="text-xs font-bold text-red-700 mt-2 pl-4">{error}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-4 mt-4 pl-2 text-xs text-[#777D75] font-medium">
                    <span>✓ Instant ₹150 Welcome Voucher</span>
                    <span>✓ Zero Spam Guarantee</span>
                    <span>✓ One-Click Unsubscribe</span>
                  </div>
                </form>
              )}
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white rounded-[28px] p-5 shadow-xl border border-[#123D2A]/10">
                <img
                  src={SCENE_IMAGES.seasonal}
                  alt="Fresh seasonal mangoes, strawberries, bananas, and cold-pressed orange juice"
                  loading="lazy"
                  className="w-full h-56 object-cover rounded-2xl mb-4"
                />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-extrabold uppercase tracking-wider text-[#48A85A]">
                      This Week’s Issue #118
                    </div>
                    <div className="text-base font-extrabold text-[#123D2A]">
                      How to Spot Real GI-Tagged Devgad Mangoes
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F8F7EF] text-[#123D2A]">
                    4 min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
