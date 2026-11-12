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

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setProgress(100);
      const t = setTimeout(onComplete, 80);
      return () => clearTimeout(t);
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(100, prev + 25);
      });
    }, 85);

    const finishTimer = setTimeout(() => {
      onComplete();
    }, 480);

    return () => {
      clearInterval(interval);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[120] flex flex-col items-center justify-between px-6 py-10 transition-opacity duration-500"
      style={{ backgroundColor: '#123D2A', color: '#F8F7EF' }}
      role="status"
      aria-label="Gurkhahills loading sequence"
    >
      <div className="w-full max-w-7xl flex items-center justify-between text-xs uppercase tracking-[0.22em] opacity-80">
        <span>Gurkhahills Shopping Complex</span>
        <span>Premium Daily Purveyors</span>
      </div>

      <div className="flex flex-col items-center text-center max-w-xl my-auto">
        <div className="mb-6 fc-float-slow">
          <img
            src="/gurkhacamp-logo-white.png"
            alt="Gurkhahills Shopping Complex"
            className="h-32 sm:h-44 lg:h-52 w-auto object-contain"
          />
        </div>
        <p
          className="text-xs uppercase tracking-[0.3em] mb-3 font-semibold"
          style={{ color: '#C7F36B' }}
        >
          Shopping Complex & Fresh Purveyors
        </p>
        <h1 className="fc-font-serif text-3xl sm:text-5xl font-normal tracking-tight mb-6">
          Gurkhahills<span style={{ color: '#C7F36B' }}>.</span>
        </h1>
        <div className="w-64 sm:w-80 h-1.5 rounded-full overflow-hidden bg-white/15 mb-3">
          <div
            className="h-full rounded-full transition-all duration-150"
            style={{ width: `${progress}%`, backgroundColor: '#C7F36B' }}
          />
        </div>
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-white/75">
          <span>Grading Dawn Harvest</span>
          <span>•</span>
          <span className="font-mono font-bold" style={{ color: '#C7F36B' }}>
            {progress}%
          </span>
        </div>
      </div>

      <div className="w-full max-w-7xl flex items-center justify-between text-xs text-white/60">
        <span>Ratnagiri • Nilgiris • Mahabaleshwar • Kodaikanal</span>
        <button
          type="button"
          onClick={onComplete}
          className="px-3 py-1.5 rounded-full border border-white/20 text-white/90 hover:bg-white/10 transition-colors"
        >
          Enter Store →
        </button>
      </div>
    </div>
  );
}
