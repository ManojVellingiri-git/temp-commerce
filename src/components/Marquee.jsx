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

export default function Marquee() {
  const tickerItems = [
    { text: 'Farm Fresh Produce', icon: Leaf },
    { text: 'Free Delivery Above ₹499', icon: Truck },
    { text: '100% Quality Checked', icon: ShieldCheck },
    { text: 'Freshness Guaranteed', icon: Sparkles },
    { text: 'Fast Home Delivery', icon: Clock },
    { text: 'Zero Artificial Ripeners', icon: Award },
    { text: '4°C Unbroken Cold Chain', icon: CheckCircle2 }
  ];

  return (
    <section
      aria-label="Gurkhacamp Guarantees and Benefits"
      className="py-4 border-y border-[#123D2A]/15 overflow-hidden select-none"
      style={{ backgroundColor: '#123D2A', color: '#F8F7EF' }}
    >
      <div className="fc-marquee-track flex items-center gap-10 whitespace-nowrap">
        {[0, 1, 2].map((loopIdx) => (
          <div key={loopIdx} className="flex items-center gap-10 shrink-0">
            {tickerItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div key={`${loopIdx}-${idx}`} className="flex items-center gap-3.5">
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: '#C7F36B', color: '#123D2A' }}
                  >
                    <IconComponent className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <span className="text-sm sm:text-base font-extrabold tracking-wide uppercase">
                    {item.text}
                  </span>
                  <span className="text-[#C7F36B] opacity-60 text-lg">✦</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
