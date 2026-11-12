/* ============================================================
   Gurkhacamp Admin — shared shell (sidebar, topbar, auth, toast)
   ============================================================ */

const NAV = [
  { group:"Overview", links:[
    { href:"index.html",     label:"Dashboard",  icon:"grid" },
  ]},
  { group:"Catalog", links:[
    { href:"products.html",   label:"Products",   icon:"box" },
    { href:"categories.html", label:"Categories", icon:"tag" },
  ]},
  { group:"Sales", links:[
    { href:"orders.html",    label:"Orders",     icon:"cart" },
    { href:"customers.html", label:"Customers",  icon:"users" },
  ]},
  { group:"System", links:[
    { href:"settings.html",  label:"Settings",   icon:"gear" },
  ]}
];

const ICONS = {
  grid:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  box:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>',
  tag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10l-9-9H4v7l9 9 7-7z"/><circle cx="7.5" cy="7.5" r="1.3" fill="currentColor" stroke="none"/></svg>',
  cart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1.4"/><circle cx="18" cy="21" r="1.4"/><path d="M2 3h3l2.6 12.4a2 2 0 002 1.6h7.9a2 2 0 002-1.6L21 7H5.2"/></svg>',
  users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="3.4"/><path d="M2.5 20c.8-3.6 3.4-5.6 6.5-5.6s5.7 2 6.5 5.6"/><path d="M16.5 4.8a3.4 3.4 0 010 6.6"/><path d="M18.8 14.5c2.6.5 4.3 2.3 4.9 5.5"/></svg>',
  ticket:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9a2 2 0 012-2h14a2 2 0 012 2v1.5a1.8 1.8 0 000 3V15a2 2 0 01-2 2H5a2 2 0 01-2-2v-1.5a1.8 1.8 0 000-3V9z"/><path d="M10 7v10" stroke-dasharray="2 3"/></svg>',
  gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 13.5a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.9 2.9l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.5V20a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.6 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.9-2.9l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.5-1H4a2 2 0 110-4h.1a1.7 1.7 0 001.6-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.9-2.9l.1.1a1.7 1.7 0 001.9.3h.1a1.7 1.7 0 001-1.6V4a2 2 0 114 0v.1a1.7 1.7 0 001 1.6h.1a1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.9 2.9l-.1.1a1.7 1.7 0 00-.3 1.9v.1a1.7 1.7 0 001.6 1H20a2 2 0 110 4h-.1a1.7 1.7 0 00-1.6 1z"/></svg>',
  bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/></svg>',
  search:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M12 5v14M5 12h14"/></svg>',
  edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>',
  trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6"/></svg>',
  eye:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>',
  logout:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>',
  close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>',
};

function fmtMoney(n){
  return DB.store.currency + Number(n).toLocaleString("en-IN");
}

function requireAuth(){
  if (location.pathname.endsWith("login.html")) return;
  if (!sessionStorage.getItem("gc_admin_session")) {
    location.href = "login.html";
  }
}

function initials(name){
  return name.split(" ").map(p=>p[0]).slice(0,2).join("").toUpperCase();
}

function renderShell(active, title, crumb){
  const navHtml = NAV.map(g => `
    <div class="group-label">${g.group}</div>
    ${g.links.map(l => `
      <a href="${l.href}" class="${l.href===active?'active':''}">
        ${ICONS[l.icon]}<span>${l.label}</span>
      </a>`).join("")}
  `).join("");

  document.body.insertAdjacentHTML("afterbegin", `
    <div class="sidebar-backdrop" id="sidebarBackdrop"></div>
    <div class="app">
      <aside class="sidebar" id="sidebar">
        <div class="brand">
          <img src="/gurkhacamp-logo-white.png" alt="Gurkhahills" style="height:36px;width:auto;object-fit:contain">
          <div style="flex:1">
            <div class="name">Gurkhahills Admin</div>
            <div class="sub">Control Panel</div>
          </div>
          <button class="icon-mini" id="sidebarCloseBtn" style="background:transparent;border:none;color:#cfe3d6;cursor:pointer;display:none;width:28px;height:28px;align-items:center;justify-content:center" title="Close menu">
            ${ICONS.close}
          </button>
        </div>
        <nav class="nav" id="sidebarNav">${navHtml}</nav>
        <div class="foot">
          <div>Signed in as Admin &middot; v1.0</div>
          <a href="/" style="display:inline-flex;align-items:center;gap:6px;font-size:11px;color:#C7F36B;margin-top:8px;text-decoration:none;font-weight:600;">
            <span>&larr; View Storefront</span>
          </a>
        </div>
      </aside>

      <div class="main">
        <header class="topbar">
          <button class="icon-btn" id="menuToggle" title="Toggle navigation">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
          <div class="page-title">${title}</div>
          <div class="search">
            ${ICONS.search}
            <input type="text" placeholder="Search orders, products, customers…" id="globalSearch">
          </div>
          <div class="right" style="position:relative">
            <button class="icon-btn" id="notifBtn" title="Notifications">${ICONS.bell}<span class="dot"></span></button>
            <div class="notifications-popover" id="notificationsPopover">
              <div class="popover-head">
                <h4>Recent Store Activity</h4>
                <span style="font-size:11px;color:var(--muted)">Live feed</span>
              </div>
              <div id="notifList"></div>
            </div>
            <div class="user-chip">
              <div class="av">AD</div>
              <div class="meta"><div class="n">Admin User</div><div class="r">Super Admin</div></div>
            </div>
            <button class="icon-btn" id="logoutBtn" title="Log out">${ICONS.logout}</button>
          </div>
        </header>
        <main class="content" id="pageContent"></main>
      </div>
    </div>
    <div class="toast" id="toast"></div>
  `);

  // Mobile Drawer Toggle
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebarBackdrop");
  const menuToggle = document.getElementById("menuToggle");
  const sidebarClose = document.getElementById("sidebarCloseBtn");

  function openSidebar(){
    sidebar.classList.add("open");
    backdrop.classList.add("open");
  }
  function closeSidebar(){
    sidebar.classList.remove("open");
    backdrop.classList.remove("open");
  }

  if (menuToggle) menuToggle.addEventListener("click", openSidebar);
  if (backdrop) backdrop.addEventListener("click", closeSidebar);
  if (sidebarClose) sidebarClose.addEventListener("click", closeSidebar);
  document.querySelectorAll("#sidebarNav a").forEach(a => {
    a.addEventListener("click", () => {
      if (window.innerWidth <= 860) closeSidebar();
    });
  });

  // Notifications Popover
  const notifBtn = document.getElementById("notifBtn");
  const notifPopover = document.getElementById("notificationsPopover");
  const notifList = document.getElementById("notifList");

  if (notifBtn && notifPopover) {
    if (typeof DB !== "undefined" && DB.activity) {
      notifList.innerHTML = DB.activity.slice(0, 5).map(act => `
        <div class="item">
          <div style="width:7px;height:7px;border-radius:50%;background:var(--success);margin-top:5px;flex:none"></div>
          <div>
            <div class="item-text">${act.text}</div>
            <div class="item-time">${act.time}</div>
          </div>
        </div>
      `).join("");
    }
    notifBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      notifPopover.classList.toggle("open");
    });
    document.addEventListener("click", (e) => {
      if (!notifPopover.contains(e.target) && !notifBtn.contains(e.target)) {
        notifPopover.classList.remove("open");
      }
    });
  }

  // Global Search Handlers
  const globalSearch = document.getElementById("globalSearch");
  if (globalSearch) {
    // If page has a local #searchInput, wire live synchronization
    globalSearch.addEventListener("input", (e) => {
      const localInput = document.getElementById("searchInput");
      if (localInput) {
        localInput.value = e.target.value;
        localInput.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });

    globalSearch.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const val = e.target.value.trim();
        const localInput = document.getElementById("searchInput");
        if (localInput) {
          localInput.value = val;
          localInput.dispatchEvent(new Event("input", { bubbles: true }));
        } else if (val) {
          // Redirect to products with query
          location.href = `products.html?q=${encodeURIComponent(val)}`;
        }
      }
    });
  }

  // Global Modal backdrop click & Escape key dismiss
  document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("modal-overlay")) {
      if (typeof closeModal === "function") {
        closeModal();
      } else {
        e.target.classList.remove("open");
      }
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const openModal = document.querySelector(".modal-overlay.open");
      if (openModal) {
        if (typeof closeModal === "function") {
          closeModal();
        } else {
          openModal.classList.remove("open");
        }
      }
      if (notifPopover) notifPopover.classList.remove("open");
      if (sidebar && sidebar.classList.contains("open")) closeSidebar();
    }
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    sessionStorage.removeItem("gc_admin_session");
    location.href = "login.html";
  });
}

function showToast(msg){
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(()=>t.classList.remove("show"), 2200);
}

function statusPill(status){
  const map = {
    active:["green","Active"], delivered:["green","Delivered"], paid:["green","Paid"],
    processing:["amber","Processing"], shipped:["amber","Shipped"], pending:["amber","Pending"], low:["amber","Low stock"], paused:["amber","Paused"], draft:["gray","Draft"],
    cancelled:["red","Cancelled"], out:["red","Out of stock"], blocked:["red","Blocked"], expired:["red","Expired"], unpaid:["red","Unpaid"], refunded:["gray","Refunded"]
  };
  const [cls,label] = map[status] || ["gray", status];
  return `<span class="badge-pill ${cls}"><span class="dot"></span>${label}</span>`;
}

document.addEventListener("DOMContentLoaded", requireAuth);
