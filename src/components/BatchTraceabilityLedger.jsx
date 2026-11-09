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
  FREE_DELIVERY_THRESHOLD,
  HARVEST_BATCHES
} from '../data/freshcartData';

export default function BatchTraceabilityLedger() {
  const [selectedBatch, setSelectedBatch] = useState(HARVEST_BATCHES[0]);

  return (
    <div
      className="mt-12 rounded-[32px] p-6 sm:p-10 lg:p-12 border border-[#123D2A]/15 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
      style={{ backgroundColor: '#123D2A', color: '#F8F7EF' }}
    >
      <div className="lg:col-span-5 space-y-4">
        <span
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider"
          style={{ backgroundColor: '#C7F36B', color: '#123D2A' }}
        >
          <ShieldCheck className="w-4 h-4" /> Live Batch Traceability Ledger
        </span>
        <h3 className="fc-font-serif text-2xl sm:text-4xl text-white leading-tight">
          Inspect Today’s 4:00 AM Harvest Telemetry.
        </h3>
        <p className="text-sm sm:text-base text-white/80 leading-relaxed">
          Select any active harvest batch below to verify the exact estate origin, picking timestamp, refractometer Brix reading, and Eurofins zero-residue certificate.
        </p>
        <div className="flex flex-col gap-2.5 pt-2">
          {HARVEST_BATCHES.map((b) => {
            const active = b.code === selectedBatch.code;
            return (
              <button
                key={b.code}
                type="button"
                onClick={() => setSelectedBatch(b)}
                className={`min-h-[48px] px-4 py-3 rounded-2xl text-left transition-all flex items-center justify-between gap-3 border ${
                  active
                    ? 'bg-[#C7F36B] text-[#123D2A] border-[#C7F36B] font-extrabold shadow-md'
                    : 'bg-white/10 text-white border-white/15 hover:bg-white/15 font-semibold'
                }`}
              >
                <div className="truncate">
                  <span className="text-xs font-mono block opacity-80">{b.code}</span>
                  <span className="text-sm block truncate">{b.crop}</span>
                </div>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-7 bg-white text-[#20251F] rounded-[28px] p-6 sm:p-8 shadow-2xl border border-[#123D2A]/10">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[#123D2A]/10">
          <div>
            <span className="text-xs font-mono font-bold text-[#48A85A] block">
              VERIFIED LOT • {selectedBatch.code}
            </span>
            <h4 className="text-xl sm:text-2xl font-extrabold text-[#123D2A]">
              {selectedBatch.crop}
            </h4>
          </div>
          <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-[#EBF4E6] text-[#123D2A] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#48A85A]" /> Passed 6-Stage QC
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div className="p-4 rounded-2xl bg-[#F8F7EF] border border-[#123D2A]/10">
            <div className="text-xs font-bold uppercase tracking-wider text-[#5C635A]">
              Origin Estate & Grower
            </div>
            <div className="text-sm font-extrabold text-[#123D2A] mt-1">
              {selectedBatch.farmer}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[#F8F7EF] border border-[#123D2A]/10">
            <div className="text-xs font-bold uppercase tracking-wider text-[#5C635A]">
              Harvest Timestamp
            </div>
            <div className="text-sm font-extrabold text-[#123D2A] mt-1">
              {selectedBatch.harvestedAt}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[#F8F7EF] border border-[#123D2A]/10">
            <div className="text-xs font-bold uppercase tracking-wider text-[#5C635A]">
              Cold-Chain Telemetry
            </div>
            <div className="text-sm font-extrabold text-[#123D2A] mt-1">
              {selectedBatch.coldChainTemp}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[#F8F7EF] border border-[#123D2A]/10">
            <div className="text-xs font-bold uppercase tracking-wider text-[#5C635A]">
              Nutrient / Brix Grading
            </div>
            <div className="text-sm font-extrabold text-[#48A85A] mt-1">
              {selectedBatch.brixLevel}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#EBF4E6] border border-[#48A85A]/30 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-extrabold text-[#123D2A]">
            <ShieldCheck className="w-5 h-5 text-[#48A85A] shrink-0" />
            <span>{selectedBatch.labStatus}</span>
          </div>
          <span className="text-xs font-mono font-bold text-[#123D2A] underline">
            ISO-17025 Verified
          </span>
        </div>
      </div>
    </div>
  );
}
