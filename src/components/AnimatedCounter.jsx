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

export default function AnimatedCounter({ value, suffix = '', duration = 1100 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const num = parseFloat(value);
    if (isNaN(num)) return;
    let frameId;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = num % 1 !== 0 ? (num * eased).toFixed(1) : Math.round(num * eased);
      setCount(current);
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

const HARVEST_BATCHES = [
  {
    code: 'BATCH-409-RATNAGIRI',
    crop: 'Ratnagiri GI Alphonso Mango',
    farmer: 'Deshmukh Organic Orchards • Plot 14B, Devgad',
    harvestedAt: '04:15 AM IST Today',
    coldChainTemp: '8.2°C Breathable Hay Crate',
    brixLevel: '19.1° Brix (Peak Sweet)',
    labStatus: 'Eurofins Cert #EF-99210 • 0.00% Pesticide / Carbide Free',
    productId: 'fc-01'
  },
  {
    code: 'BATCH-412-NILGIRIS',
    crop: 'Hydroponic Baby Spinach & Vine Tomatoes',
    farmer: 'Ketti Valley Biodynamic Collective • Ooty 2,100m',
    harvestedAt: '03:50 AM IST Today',
    coldChainTemp: '4.1°C Misted Hydro-Crate',
    brixLevel: '94% Cellular Hydration',
    labStatus: 'NPOP Organic #ORG-4418 • Zero Heavy Metals / Nitrates',
    productId: 'fc-06'
  },
  {
    code: 'BATCH-418-POLLACHI',
    crop: 'Single-Herd Gir Cow A2 Full Cream Milk',
    farmer: 'Anamalai Free-Pasture Dairy • Pollachi',
    harvestedAt: '03:30 AM Milking • Chilled Immediately',
    coldChainTemp: '3.4°C Sterilized Glass Carafe',
    brixLevel: '4.9% Natural A2 Beta-Casein',
    labStatus: 'FSSAI Batch Audit #A2-883 • Zero Antibiotics / Hormones',
    productId: 'fc-08'
  }
];
