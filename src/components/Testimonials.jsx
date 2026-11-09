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

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS_DATA[activeIndex];

  return (
    <section
      aria-label="Customer Testimonials"
      className="py-16 lg:py-24 relative overflow-hidden"
      style={{ backgroundColor: '#123D2A', color: '#F8F7EF' }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-extrabold uppercase tracking-[0.2em] text-[#C7F36B] mb-3">
              <Star className="w-3.5 h-3.5 fill-current" /> 4.9 / 5 Average Rating • Sample Demonstration Reviews
            </div>
            <h2 className="fc-section-heading font-extrabold text-white tracking-tight">
              Loved by Home Chefs &{' '}
              <span className="fc-font-serif italic font-normal text-[#C7F36B]">Purists.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#C7F36B] hover:text-[#123D2A] hover:border-[#C7F36B] transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#C7F36B] hover:text-[#123D2A] hover:border-[#C7F36B] transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 bg-white/10 backdrop-blur-xl rounded-[32px] p-8 sm:p-10 border border-white/15 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                <div className="flex items-center gap-1 text-[#C7F36B]">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white/85">
                  {current.date}
                </span>
              </div>

              <blockquote className="fc-font-serif text-2xl sm:text-3xl leading-relaxed text-white mb-8">
                “{current.quote}”
              </blockquote>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/15">
              <div className="flex items-center gap-3.5">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-base shadow-md"
                  style={{ backgroundColor: '#C7F36B', color: '#123D2A' }}
                >
                  {current.avatar}
                </div>
                <div>
                  <div className="font-extrabold text-white text-base">{current.name}</div>
                  <div className="text-xs text-white/75">{current.role}</div>
                </div>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-[#C7F36B]/15 border border-[#C7F36B]/30 text-xs font-bold text-[#C7F36B]">
                ✓ Purchased: {current.verifiedItem}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            {TESTIMONIALS_DATA.map((item, idx) => {
              const active = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full p-4 rounded-2xl text-left transition-all border flex items-center justify-between gap-4 ${
                    active
                      ? 'bg-[#C7F36B] text-[#123D2A] border-[#C7F36B] shadow-lg'
                      : 'bg-white/5 text-white hover:bg-white/10 border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 ${
                        active ? 'bg-[#123D2A] text-[#C7F36B]' : 'bg-white/15 text-white'
                      }`}
                    >
                      {item.avatar}
                    </div>
                    <div className="min-w-0">
                      <div className="font-extrabold text-sm truncate">{item.name}</div>
                      <div
                        className={`text-xs truncate ${
                          active ? 'text-[#123D2A]/80 font-semibold' : 'text-white/65'
                        }`}
                      >
                        {item.verifiedItem}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
