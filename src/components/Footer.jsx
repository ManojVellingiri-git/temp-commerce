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

export default function Footer({ onSelectCategory, onNavigate, onOpenInfoModal }) {
  return (
    <footer
      className="pt-16 pb-12 border-t border-[#123D2A]/15"
      style={{ backgroundColor: '#20251F', color: '#F8F7EF' }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center -ml-2">
              <img
                src="/gurkhacamp-logo-white.png"
                alt="Gurkhahills Shopping Complex"
                className="h-20 sm:h-24 lg:h-28 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              Freshness, Delivered Beautifully. India’s premier farm-to-door online grocery purveyor uniting 140+ certified organic estates with 18-minute 4°C cold-chain dispatch.
            </p>
            <div className="space-y-1.5 pt-2 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C7F36B]" />
                <span>Flagship Cold-Vault: 42 Race Course Rd, Coimbatore 641018</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C7F36B]" />
                <span>Concierge Desk: +91 (422) 409-8800 (6 AM – 11 PM IST)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C7F36B]" />
                <span>concierge@gurkhahills.com</span>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openWhatsAppDirect("Hello Gurkhahills! I'm reaching out from your online store.")}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white transition-all text-xs font-bold border border-[#25D366]/30 group"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                  <span>WhatsApp Concierge</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C7F36B] group-hover:bg-white animate-pulse" />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C7F36B]">
              Shop Aisles
            </h4>
            <ul className="space-y-2 text-sm text-white/75">
              {CATEGORIES.slice(0, 7).map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCategory(cat.id);
                      onNavigate('shop-section');
                    }}
                    className="hover:text-[#C7F36B] transition-colors"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C7F36B]">
              Customer Care
            </h4>
            <ul className="space-y-2 text-sm text-white/75">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal('Cold-Chain Delivery & SLAs')}
                  className="hover:text-[#C7F36B] transition-colors"
                >
                  18-Minute Cold-Chain Guarantee
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal('No-Questions Doorstep Returns')}
                  className="hover:text-[#C7F36B] transition-colors"
                >
                  Instant Doorstep Replacement Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal('Eurofins Lab Residue Reports')}
                  className="hover:text-[#C7F36B] transition-colors"
                >
                  Batch Organic & Lab Certificates
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal('Glass Bottle & Crate Return Program')}
                  className="hover:text-[#C7F36B] transition-colors"
                >
                  Zero-Plastic Bottle Deposit Program
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal('Concierge Support')}
                  className="hover:text-[#C7F36B] transition-colors"
                >
                  Live Culinary & Order Concierge
                </button>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C7F36B]">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-white/75">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('benefits-section')}
                  className="hover:text-[#C7F36B] transition-colors"
                >
                  Our Farm Partners
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal('Sustainability Report 2026')}
                  className="hover:text-[#C7F36B] transition-colors"
                >
                  2026 Impact Report
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal('Careers at Gurkhahills')}
                  className="hover:text-[#C7F36B] transition-colors"
                >
                  Careers in Agronomy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal('Privacy & Terms')}
                  className="hover:text-[#C7F36B] transition-colors"
                >
                  Privacy & Terms
                </button>
              </li>
              <li>
                <a
                  href="/admin/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C7F36B] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Admin Portal</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>

            <div className="pt-4">
              <div className="text-xs font-bold uppercase tracking-wider text-white/50 mb-2">
                Connect
              </div>
              <div className="flex items-center gap-2">
                {['IG', 'X', 'YT', 'IN'].map((soc) => (
                  <button
                    key={soc}
                    type="button"
                    onClick={() => onOpenInfoModal(`Gurkhahills on ${soc}`)}
                    className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#C7F36B] hover:text-[#123D2A] text-xs font-extrabold transition-colors"
                  >
                    {soc}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            © {new Date().getFullYear()} Gurkhahills Shopping Complex. All rights reserved. Crafted as an interactive e-commerce showcase.
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {['UPI Instant', 'Visa', 'Mastercard', 'RuPay', 'NetBanking', 'COD'].map((pay) => (
              <span
                key={pay}
                className="px-2.5 py-1 rounded-md bg-white/10 text-white/85 font-semibold text-[11px]"
              >
                {pay}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// MODALS & DRAWERS
// ============================================================================
