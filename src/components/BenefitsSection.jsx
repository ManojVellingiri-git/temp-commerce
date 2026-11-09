import BatchTraceabilityLedger from './BatchTraceabilityLedger';
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

export default function BenefitsSection() {
  const pillars = [
    {
      icon: Leaf,
      title: 'Farm-to-Home Freshness',
      metric: '< 14 Hours',
      description:
        'Harvested at 4:00 AM across partner organic estates in Ooty, Ratnagiri, and Pollachi, reaching your kitchen table the very same day.'
    },
    {
      icon: ShieldCheck,
      title: 'Quality Checked Products',
      metric: '6-Stage Audit',
      description:
        'Every fruit and vegetable undergoes optical Brix sweetness testing, ultrasonic internal checks, and hand-grading before dispatch.'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      metric: '18-Min Express',
      description:
        'Dispatched in insulated 4°C phase-change cold bags from neighborhood micro-vaults so leafy greens never wilt in transit.'
    },
    {
      icon: CreditCard,
      title: 'Secure Checkout',
      metric: '256-Bit Encrypted',
      description:
        'Instant one-tap UPI, cards, and net-banking with zero hidden packaging fees and transparent farm-gate pricing.'
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      metric: '100% Instant Refund',
      description:
        'Not thrilled with an avocado’s ripeness? Tap once for an instant doorstep replacement or immediate refund—no questions asked.'
    },
    {
      icon: Tag,
      title: 'Affordable Pricing',
      metric: '0 Middlemen',
      description:
        'By contracting directly with 140+ grower collectives, farmers earn 78% of retail value while you save up to 25% daily.'
    }
  ];

  return (
    <section id="benefits-section" className="py-16 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.22em] text-[#48A85A] mb-3">
            <Award className="w-4 h-4" /> The Gurkhacamp Standard
          </div>
          <h2 className="fc-section-heading font-extrabold text-[#123D2A] tracking-tight mb-4">
            Why Discerning Kitchens Choose{' '}
            <span className="fc-font-serif italic font-normal text-[#48A85A]">Gurkhacamp.</span>
          </h2>
          <p className="fc-body-text text-[#777D75]">
            We replaced warm warehouse storage and plastic cling-wrap with precision cold-chain agronomy and reusable glass & linen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={idx}
                className="group bg-white rounded-[28px] p-7 border border-[#123D2A]/10 hover:border-[#48A85A] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{ backgroundColor: '#123D2A', color: '#C7F36B' }}
                    >
                      <IconComponent className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider"
                      style={{ backgroundColor: '#F8F7EF', color: '#123D2A' }}
                    >
                      {pillar.metric}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-[#20251F] mb-2.5">
                    {pillar.title}
                  </h3>
                  <p className="fc-body-text text-[#777D75] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#123D2A]/8 flex items-center justify-between text-xs font-bold text-[#48A85A]">
                  <span>Verified Cold-Chain Protocol</span>
                  <span>0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Asymmetric Split-Screen Interactive Farm-to-Table Batch Traceability Verifier */}
        <BatchTraceabilityLedger />
      </div>
    </section>
  );
}
