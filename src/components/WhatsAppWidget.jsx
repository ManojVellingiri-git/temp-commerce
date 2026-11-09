import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles, MessageCircle, Clock, CheckCircle2 } from 'lucide-react';

export function WhatsAppIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15-.2.301-.777.978-.953 1.179-.175.2-.351.225-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-.927-2.232-.244-.587-.492-.507-.676-.516l-.576-.01c-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.909 1.229 3.11.15.2 2.122 3.24 5.14 4.544.718.31 1.279.495 1.716.634.721.23 1.377.197 1.896.12.578-.087 1.78-.727 2.031-1.43.25-.702.25-1.304.175-1.43-.075-.125-.276-.201-.577-.351zM12.04 2C6.516 2 2.022 6.478 2.022 12c0 1.99.584 3.844 1.597 5.412L2 22l4.757-1.562A9.97 9.97 0 0012.04 22c5.523 0 10.017-4.478 10.017-10S17.563 2 12.04 2zm0 18.23a8.21 8.21 0 01-4.225-1.168l-.303-.18-3.13.826.836-3.05-.198-.316A8.196 8.196 0 013.79 12c0-4.549 3.701-8.25 8.25-8.25s8.25 3.701 8.25 8.25-3.701 8.23-8.25 8.23z"/>
    </svg>
  );
}

export const GURKHACAMP_WHATSAPP_NUMBER = '914224098800';

export function openWhatsAppDirect(text = '', phone = GURKHACAMP_WHATSAPP_NUMBER) {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

export default function WhatsAppWidget({ currentLocation }) {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [hasUnreadPulse, setHasUnreadPulse] = useState(true);
  const widgetRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const quickPrompts = [
    {
      label: '🛒 Help Placing Order',
      msg: `Hello Gurkhacamp! I'd like help placing an order for delivery to ${currentLocation?.area || 'Coimbatore'}.`
    },
    {
      label: '🚚 Delivery & ETA Inquiry',
      msg: `Hi Gurkhacamp Concierge, could you check the delivery ETA for ${currentLocation?.city || 'my location'}?`
    },
    {
      label: '🌿 Fresh Morning Harvest',
      msg: `Hi! What are today's freshest organic fruits and harvest specials available in store?`
    },
    {
      label: '💬 Speak to Concierge',
      msg: `Hello Gurkhacamp Shopping Complex, I have an inquiry and would like to chat with a representative.`
    }
  ];

  const handleSend = (textToSend) => {
    const message = textToSend || customMessage || `Hello Gurkhacamp Shopping Complex! I'm reaching out from your online store.`;
    openWhatsAppDirect(message);
    setIsOpen(false);
    setCustomMessage('');
  };

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-20 right-5 lg:bottom-8 lg:right-8 z-[90] flex flex-col items-end"
    >
      {/* Quick Chat Popup Card */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="WhatsApp Concierge Chat"
          className="mb-3 w-[calc(100vw-2.5rem)] sm:w-[360px] bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(7,56,36,0.35)] border border-[#123D2A]/15 overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95"
        >
          {/* Header */}
          <div className="bg-[#123D2A] text-white p-4 sm:p-5 relative">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-md">
                    <WhatsAppIcon className="w-6 h-6 fill-current" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#48A85A] border-2 border-[#123D2A] rounded-full" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                    Gurkhacamp Concierge
                    <Sparkles className="w-3.5 h-3.5 text-[#C7F36B]" />
                  </h4>
                  <p className="text-[11px] text-[#C7F36B] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C7F36B] animate-pulse" />
                    Online • Instant WhatsApp Replies
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close WhatsApp chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-3 text-[11px] text-white/75 bg-white/10 px-3 py-1.5 rounded-xl flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#C7F36B] shrink-0" />
              <span>Direct line: +91 (422) 409-8800 (6 AM – 11 PM IST)</span>
            </div>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#F8F7EF]/60 space-y-3 max-h-[360px] overflow-y-auto">
            <div className="bg-white p-3.5 rounded-2xl border border-[#123D2A]/10 text-xs text-[#20251F] leading-relaxed shadow-sm">
              <p className="font-bold text-[#123D2A] mb-1">
                👋 Welcome to Gurkhacamp Shopping Complex!
              </p>
              <p className="text-[#777D75]">
                How may our personal store shoppers assist you today? Select a quick option below or type your message to chat directly on WhatsApp.
              </p>
            </div>

            {/* Quick action chips */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#777D75] px-1">
                Quick Inquiries
              </div>
              <div className="flex flex-col gap-1.5">
                {quickPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(p.msg)}
                    className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-[#EAF8E6] hover:border-[#25D366] border border-[#123D2A]/10 text-xs font-semibold text-[#123D2A] transition-all flex items-center justify-between group shadow-xs"
                  >
                    <span>{p.label}</span>
                    <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Input */}
          <div className="p-3 bg-white border-t border-[#123D2A]/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(customMessage);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#F8F7EF] border border-[#123D2A]/15 text-xs text-[#20251F] placeholder-[#777D75] focus:outline-none focus:border-[#25D366]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-sm shrink-0"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen((prev) => !prev);
          setHasUnreadPulse(false);
        }}
        className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-[0_12px_32px_rgba(37,211,102,0.45)] hover:shadow-[0_16px_40px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
        aria-label="Open WhatsApp live chat with Gurkhacamp"
      >
        <WhatsAppIcon className="w-6 h-6 fill-current shrink-0" />
        <span className="font-extrabold text-xs tracking-wide hidden sm:inline">
          Chat on WhatsApp
        </span>

        {/* Pulsing indicator */}
        {hasUnreadPulse && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C7F36B] opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#123D2A] text-[9px] font-bold text-[#C7F36B] items-center justify-center border border-white">
              1
            </span>
          </span>
        )}
      </button>
    </div>
  );
}

