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

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReduced) return;

    setEnabled(true);
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      const target = e.target;
      if (target && target.closest) {
        const isInteractive = Boolean(target.closest('button, a, input, select, [data-cursor-hover]'));
        setHovered(isInteractive);
      }
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[110] pointer-events-none hidden lg:block transition-transform duration-75 ease-out"
      style={{ marginLeft: hovered ? -22 : -12, marginTop: hovered ? -22 : -12 }}
      aria-hidden="true"
    >
      <div
        className="rounded-full transition-all duration-200 flex items-center justify-center"
        style={{
          width: hovered ? 44 : 24,
          height: hovered ? 44 : 24,
          border: hovered ? '1.5px solid #48A85A' : '1.5px solid rgba(18, 61, 42, 0.45)',
          backgroundColor: hovered ? 'rgba(199, 243, 107, 0.22)' : 'transparent',
          backdropFilter: hovered ? 'blur(2px)' : 'none'
        }}
      />
    </div>
  );
}
