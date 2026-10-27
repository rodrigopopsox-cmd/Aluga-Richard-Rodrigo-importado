/* @ds-bundle: {"format":4,"namespace":"AlugaDesignSystem_e4b917","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"AvatarGroup","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Wordmark","sourcePath":"components/core/Wordmark.jsx"},{"name":"BarChart","sourcePath":"components/data/BarChart.jsx"},{"name":"Legend","sourcePath":"components/data/BarChart.jsx"},{"name":"Card","sourcePath":"components/data/Card.jsx"},{"name":"CardHeader","sourcePath":"components/data/Card.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"HeatScale","sourcePath":"components/data/HeatScale.jsx"},{"name":"LineChart","sourcePath":"components/data/LineChart.jsx"},{"name":"Metric","sourcePath":"components/data/Metric.jsx"},{"name":"ProgressPill","sourcePath":"components/data/ProgressPill.jsx"},{"name":"StatCard","sourcePath":"components/data/StatCard.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"SegmentedControl","sourcePath":"components/forms/SegmentedControl.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"NavPills","sourcePath":"components/navigation/NavPills.jsx"},{"name":"SideRail","sourcePath":"components/navigation/SideRail.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"22003b7f0a9b","components/core/Badge.jsx":"4fcfaf9eeb0c","components/core/Button.jsx":"e5a72eb40e72","components/core/Chip.jsx":"f2ba5874d901","components/core/Icon.jsx":"d6bba998aad6","components/core/IconButton.jsx":"fb589cfd49f1","components/core/Wordmark.jsx":"8371280fef94","components/data/BarChart.jsx":"5fe9635a12f8","components/data/Card.jsx":"50da54df0c8e","components/data/DataTable.jsx":"a450b24637f3","components/data/HeatScale.jsx":"ae80a35fc27c","components/data/LineChart.jsx":"04ea6aebf2a4","components/data/Metric.jsx":"70b3b08841cf","components/data/ProgressPill.jsx":"645f391f00ad","components/data/StatCard.jsx":"c20a341e1b5b","components/feedback/Dialog.jsx":"8ff312465c54","components/feedback/Toast.jsx":"51364ac0252a","components/feedback/Tooltip.jsx":"dd75857f14a9","components/forms/Checkbox.jsx":"c749732448ed","components/forms/Input.jsx":"7151b94257ef","components/forms/SegmentedControl.jsx":"50a1fabf41ef","components/forms/Select.jsx":"c1d2774b755f","components/forms/Switch.jsx":"6d96b77c756b","components/navigation/NavPills.jsx":"372a8fc63323","components/navigation/SideRail.jsx":"67115a0a5cc9","ui_kits/admin/AnalyticsScreen.jsx":"bb7621d2b7b6","ui_kits/admin/App.jsx":"1b72dc297e21","ui_kits/admin/DashboardScreen.jsx":"2bccc4eabe91","ui_kits/admin/FinanceScreen.jsx":"a09d7458e0ce","ui_kits/admin/LoginScreen.jsx":"91d4b595142a","ui_kits/admin/MaintenanceScreen.jsx":"47d1ada27e45","ui_kits/admin/PropertiesScreen.jsx":"cde707c6a9fd","ui_kits/admin/Shell.jsx":"bcfa464ef375","ui_kits/admin/data.js":"c13ef4dedec2"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AlugaDesignSystem_e4b917 = window.AlugaDesignSystem_e4b917 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Avatar({
  src,
  name = '',
  size = 40,
  ring,
  style
}) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map(s => s[0]).join('').toUpperCase();
  const base = {
    width: size,
    height: size,
    borderRadius: '50%',
    flex: 'none',
    objectFit: 'cover',
    boxShadow: ring ? '0 0 0 2px var(--surface-card)' : 'none',
    ...style
  };
  if (src) return /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: base
  });
  return /*#__PURE__*/React.createElement("span", {
    "aria-label": name,
    style: {
      ...base,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--ink-800)',
      color: '#fff',
      fontSize: Math.round(size * 0.36),
      fontWeight: 500,
      fontFamily: 'var(--font-sans)'
    }
  }, initials);
}
function AvatarGroup({
  people = [],
  size = 28,
  max = 3
}) {
  const shown = people.slice(0, max);
  const rest = people.length - shown.length;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center'
    }
  }, shown.map((p, i) => /*#__PURE__*/React.createElement(Avatar, _extends({
    key: i
  }, p, {
    size: size,
    ring: true,
    style: {
      marginLeft: i ? -size * 0.32 : 0
    }
  }))), rest > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: -size * 0.32,
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'var(--surface-sunken)',
      color: 'var(--ink-600)',
      fontSize: 11,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 0 2px var(--surface-card)'
    }
  }, "+", rest));
}
Object.assign(__ds_scope, { Avatar, AvatarGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
const T = {
  brand: ['var(--brand)', '#fff'],
  soft: ['var(--orange-100)', 'var(--orange-600)'],
  neutral: ['var(--surface-sunken)', 'var(--ink-600)'],
  dark: ['var(--surface-inverse)', '#fff'],
  success: ['var(--green-100)', 'var(--green-600)'],
  danger: ['var(--red-100)', 'var(--red-600)'],
  warning: ['var(--amber-100)', '#9A6500']
};
function Badge({
  tone = 'neutral',
  size = 'md',
  dot,
  count,
  children,
  style
}) {
  const [bg, fg] = T[tone] || T.neutral;
  if (count != null) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 20,
        height: 20,
        padding: '0 6px',
        borderRadius: 999,
        background: 'var(--red-500)',
        color: '#fff',
        fontSize: 11,
        fontWeight: 500,
        fontFamily: 'var(--font-sans)',
        ...style
      }
    }, count);
  }
  const sm = size === 'sm';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: sm ? 22 : 26,
      padding: sm ? '0 9px' : '0 12px',
      borderRadius: sm ? 7 : 9,
      background: bg,
      color: fg,
      fontSize: sm ? 11 : 12,
      fontWeight: 400,
      fontFamily: 'var(--font-sans)',
      whiteSpace: 'nowrap',
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'currentColor'
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
const LUCIDE = 'https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js';
let loading = null;
function loadLucide() {
  if (typeof window === 'undefined') return Promise.resolve(null);
  if (window.lucide) return Promise.resolve(window.lucide);
  if (!loading) {
    loading = new Promise(r => {
      const s = document.createElement('script');
      s.src = LUCIDE;
      s.onload = () => r(window.lucide);
      s.onerror = () => r(null);
      document.head.appendChild(s);
    });
  }
  return loading;
}
const pascal = n => n.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
function Icon({
  name,
  size = 20,
  strokeWidth = 1.5,
  color = 'currentColor',
  style
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    let dead = false;
    loadLucide().then(l => {
      if (dead || !ref.current || !l) return;
      const node = l.icons[pascal(name)];
      ref.current.innerHTML = '';
      if (!node) return;
      const el = l.createElement(node);
      el.setAttribute('width', size);
      el.setAttribute('height', size);
      el.setAttribute('stroke-width', strokeWidth);
      el.setAttribute('stroke', color);
      ref.current.appendChild(el);
    });
    return () => {
      dead = true;
    };
  }, [name, size, strokeWidth, color]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    "aria-hidden": "true",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      flex: 'none',
      ...style
    }
  });
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function useCss() {
  React.useInsertionEffect ? React.useInsertionEffect(inj, []) : React.useEffect(inj, []);
}
function inj() {
  if (typeof document === 'undefined' || document.getElementById('al-btn')) return;
  const s = document.createElement('style');
  s.id = 'al-btn';
  s.textContent = ".al-btn{font-family:var(--font-sans);display:inline-flex;align-items:center;justify-content:center;gap:8px;border:0;border-radius:var(--radius-pill);cursor:pointer;white-space:nowrap;font-weight:400;transition:background var(--dur-base) var(--ease-out),transform var(--dur-fast) var(--ease-out),color var(--dur-base);letter-spacing:-.005em}\n.al-btn:active{transform:scale(.97)}.al-btn:focus-visible{outline:none;box-shadow:0 0 0 3px var(--focus-ring)}\n.al-btn[disabled]{opacity:.45;cursor:not-allowed;transform:none}\n.al-btn--sm{height:32px;padding:0 14px;font-size:12px}.al-btn--md{height:40px;padding:0 18px;font-size:14px}.al-btn--lg{height:48px;padding:0 24px;font-size:15px}\n.al-btn--primary{background:var(--brand);color:var(--on-brand)}.al-btn--primary:hover:not([disabled]){background:var(--brand-hover)}\n.al-btn--dark{background:var(--surface-inverse);color:#fff}.al-btn--dark:hover:not([disabled]){background:var(--ink-700)}\n.al-btn--secondary{background:var(--surface-sunken);color:var(--text-body)}.al-btn--secondary:hover:not([disabled]){background:var(--gray-200)}\n.al-btn--outline{background:var(--surface-card);color:var(--text-body);box-shadow:inset 0 0 0 1px var(--border-default)}.al-btn--outline:hover:not([disabled]){box-shadow:inset 0 0 0 1px var(--ink-800)}\n.al-btn--ghost{background:transparent;color:var(--text-body)}.al-btn--ghost:hover:not([disabled]){background:var(--surface-sunken)}\n.al-btn--block{width:100%}";
  document.head.appendChild(s);
}
function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  fullWidth,
  disabled,
  type = 'button',
  onClick,
  children,
  style
}) {
  useCss();
  const is = size === 'sm' ? 14 : size === 'lg' ? 20 : 18;
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: style,
    className: 'al-btn al-btn--' + variant + ' al-btn--' + size + (fullWidth ? ' al-btn--block' : '')
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: is
  }), children, iconRight && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: is
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
function useCss() {
  React.useInsertionEffect ? React.useInsertionEffect(inj, []) : React.useEffect(inj, []);
}
function inj() {
  if (typeof document === 'undefined' || document.getElementById('al-chip')) return;
  const s = document.createElement('style');
  s.id = 'al-chip';
  s.textContent = ".al-chip{font-family:var(--font-sans);display:inline-flex;align-items:center;gap:6px;height:28px;padding:0 12px 0 10px;border-radius:999px;border:0;font-size:12px;cursor:pointer;white-space:nowrap;transition:background var(--dur-base),color var(--dur-base)}\n.al-chip--light{background:var(--surface-sunken);color:var(--ink-600)}.al-chip--light:hover{background:var(--gray-200);color:var(--ink-800)}\n.al-chip--glass{background:rgba(255,255,255,.78);backdrop-filter:var(--blur-glass);-webkit-backdrop-filter:var(--blur-glass);color:var(--ink-700)}.al-chip--glass:hover{background:#fff}\n.al-chip--dark{background:rgba(27,27,27,.88);color:#fff}.al-chip--dark:hover{background:var(--ink-800)}\n.al-chip--outline{background:transparent;color:var(--ink-700);box-shadow:inset 0 0 0 1px var(--border-default)}.al-chip--outline:hover{box-shadow:inset 0 0 0 1px var(--ink-700)}\n.al-chip:focus-visible{outline:none;box-shadow:0 0 0 3px var(--focus-ring)}";
  document.head.appendChild(s);
}
function Chip({
  icon,
  variant = 'light',
  onClick,
  children,
  style
}) {
  useCss();
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    className: 'al-chip al-chip--' + variant,
    style: style
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 14
  }), children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function useCss() {
  React.useInsertionEffect ? React.useInsertionEffect(inj, []) : React.useEffect(inj, []);
}
function inj() {
  if (typeof document === 'undefined' || document.getElementById('al-ibtn')) return;
  const s = document.createElement('style');
  s.id = 'al-ibtn';
  s.textContent = ".al-ibtn{position:relative;display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:50%;cursor:pointer;flex:none;transition:background var(--dur-base) var(--ease-out),transform var(--dur-fast) var(--ease-out),color var(--dur-base)}\n.al-ibtn:active{transform:scale(.94)}.al-ibtn:focus-visible{outline:none;box-shadow:0 0 0 3px var(--focus-ring)}.al-ibtn[disabled]{opacity:.45;cursor:not-allowed}\n.al-ibtn--soft{background:var(--surface-sunken);color:var(--ink-600)}.al-ibtn--soft:hover{background:var(--gray-200);color:var(--ink-800)}\n.al-ibtn--dark{background:var(--surface-inverse);color:#fff}.al-ibtn--dark:hover{background:var(--ink-700)}\n.al-ibtn--brand{background:var(--brand);color:#fff}.al-ibtn--brand:hover{background:var(--brand-hover)}\n.al-ibtn--ghost{background:transparent;color:var(--ink-600)}.al-ibtn--ghost:hover{background:var(--surface-sunken)}\n.al-ibtn--white{background:var(--surface-card);color:var(--ink-700)}.al-ibtn--white:hover{background:var(--gray-50)}\n.al-ibtn__dot{position:absolute;top:6px;right:6px;width:9px;height:9px;border-radius:50%;background:var(--brand);box-shadow:0 0 0 2px var(--surface-card)}";
  document.head.appendChild(s);
}
function IconButton({
  icon,
  label,
  variant = 'soft',
  size = 40,
  dot,
  disabled,
  onClick,
  style
}) {
  useCss();
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": label,
    title: label,
    disabled: disabled,
    onClick: onClick,
    className: 'al-ibtn al-ibtn--' + variant,
    style: {
      width: size,
      height: size,
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: Math.round(size * 0.45)
  }), dot && /*#__PURE__*/React.createElement("span", {
    className: "al-ibtn__dot"
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Wordmark.jsx
try { (() => {
function Wordmark({
  variant = 'dot',
  size = 24,
  color = 'var(--text-strong)',
  style
}) {
  if (variant === 'spaced') return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 500,
      fontSize: size,
      letterSpacing: '0.32em',
      color,
      lineHeight: 1,
      ...style
    }
  }, "ALUGA");
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 400,
      fontSize: size,
      letterSpacing: '-0.01em',
      color,
      lineHeight: 1,
      ...style
    }
  }, "ALUGA", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--brand)'
    }
  }, "."));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/data/BarChart.jsx
try { (() => {
function BarChart({
  data = [],
  height = 120,
  gap = 8,
  hatched = true,
  style
}) {
  const max = Math.max(1, ...data.map(d => d.value));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap,
      height,
      ...style
    }
  }, data.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    title: d.label + ': ' + d.value,
    style: {
      flex: 1,
      minWidth: 0,
      height: Math.max(8, d.value / max * 100) + '%',
      borderRadius: 10,
      background: (hatched ? 'repeating-linear-gradient(135deg,rgba(255,255,255,.6) 0 1.5px,transparent 1.5px 10px),' : '') + (d.color || 'var(--brand)'),
      transition: 'height var(--dur-slow) var(--ease-out)'
    }
  })));
}
function Legend({
  items = [],
  direction = 'column',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: direction,
      gap: direction === 'column' ? 8 : 16,
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      ...style
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: it.line ? 14 : 6,
      height: it.line ? 3 : 6,
      borderRadius: 3,
      background: it.color,
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      flex: direction === 'column' ? 1 : 'none'
    }
  }, it.label), it.value != null && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-strong)',
      marginLeft: 12
    }
  }, it.value))));
}
Object.assign(__ds_scope, { BarChart, Legend });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/BarChart.jsx", error: String((e && e.message) || e) }); }

// components/data/Card.jsx
try { (() => {
const TONES = {
  default: {
    background: 'var(--surface-card)',
    color: 'var(--text-body)'
  },
  dark: {
    background: 'var(--surface-inverse)',
    color: '#fff'
  },
  sunken: {
    background: 'var(--gray-50)',
    color: 'var(--text-body)'
  },
  brand: {
    background: 'var(--brand)',
    color: '#fff'
  }
};
function Card({
  tone = 'default',
  padding = 20,
  radius = 'var(--radius-card)',
  bordered = true,
  onClick,
  children,
  style
}) {
  const t = TONES[tone] || TONES.default;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      position: 'relative',
      borderRadius: radius,
      padding,
      boxShadow: bordered && tone === 'default' ? 'inset 0 0 0 1px var(--border-subtle)' : 'none',
      overflow: 'hidden',
      minWidth: 0,
      cursor: onClick ? 'pointer' : undefined,
      fontFamily: 'var(--font-sans)',
      ...t,
      ...style
    }
  }, children);
}
function CardHeader({
  title,
  subtitle,
  action,
  inverse,
  size = 'md',
  style
}) {
  const fs = size === 'lg' ? 22 : size === 'sm' ? 15 : 18;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      lineHeight: 1.2,
      fontSize: fs,
      fontWeight: 400,
      letterSpacing: '-0.01em'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: inverse ? '#fff' : 'var(--text-strong)'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      color: inverse ? 'rgba(255,255,255,.55)' : 'var(--text-muted)'
    }
  }, subtitle)), action && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, action));
}
Object.assign(__ds_scope, { Card, CardHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Card.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function useCss() {
  React.useInsertionEffect ? React.useInsertionEffect(inj, []) : React.useEffect(inj, []);
}
function inj() {
  if (typeof document === 'undefined' || document.getElementById('al-table')) return;
  const s = document.createElement('style');
  s.id = 'al-table';
  s.textContent = ".al-table{width:100%;border-collapse:separate;border-spacing:0;font-family:var(--font-sans);font-size:14px}\n.al-table th{font-weight:400;font-size:12px;color:var(--text-muted);text-align:left;padding:10px 14px;border-bottom:1px solid var(--border-subtle);white-space:nowrap}\n.al-table td{padding:14px;border-bottom:1px solid var(--border-subtle);color:var(--text-body);vertical-align:middle}\n.al-table tbody tr{transition:background var(--dur-fast)}.al-table tbody tr:hover td{background:var(--gray-50)}\n.al-table tbody tr:last-child td{border-bottom:0}.al-table--click tbody tr{cursor:pointer}";
  document.head.appendChild(s);
}
function DataTable({
  columns = [],
  rows = [],
  onRowClick,
  rowKey = 'id',
  style
}) {
  useCss();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      overflowX: 'auto',
      overflowY: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement("table", {
    className: 'al-table' + (onRowClick ? ' al-table--click' : '')
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      textAlign: c.align || 'left',
      width: c.width
    }
  }, c.label)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: r[rowKey] ?? i,
    onClick: onRowClick ? () => onRowClick(r) : undefined
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      textAlign: c.align || 'left'
    }
  }, c.render ? c.render(r) : r[c.key])))))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/HeatScale.jsx
try { (() => {
const STEPS = ['var(--heat-1)', 'var(--heat-2)', 'var(--heat-3)', 'var(--heat-4)', 'var(--heat-5)', 'var(--heat-6)', 'var(--heat-6)', 'var(--heat-7)'];
function HeatScale({
  level = 8,
  label,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 6,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--ink-700)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, STEPS.map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 28,
      height: 14,
      borderRadius: 999,
      background: i < level ? c : 'var(--gray-150)'
    }
  }))));
}
Object.assign(__ds_scope, { HeatScale });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/HeatScale.jsx", error: String((e && e.message) || e) }); }

// components/data/LineChart.jsx
try { (() => {
function smooth(pts) {
  if (pts.length < 2) return '';
  let d = 'M' + pts[0][0] + ',' + pts[0][1];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i],
      p1 = pts[i],
      p2 = pts[i + 1],
      p3 = pts[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6,
      c1y = p1[1] + (p2[1] - p0[1]) / 6,
      c2x = p2[0] - (p3[0] - p1[0]) / 6,
      c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ' C' + c1x + ',' + c1y + ' ' + c2x + ',' + c2y + ' ' + p2[0] + ',' + p2[1];
  }
  return d;
}
function LineChart({
  series = [],
  labels = [],
  height = 200,
  highlight,
  formatValue = v => v,
  backdrop = true,
  dots = true,
  style
}) {
  const ref = React.useRef(null);
  const [w, setW] = React.useState(600);
  const [hover, setHover] = React.useState(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth || 600));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const n = Math.max(...series.map(s => s.data.length), 2);
  const all = series.flatMap(s => s.data);
  const mn = Math.min(...all),
    mx = Math.max(...all);
  const pad = 20,
    top = 44,
    bot = 16;
  const x = i => pad + i * (w - pad * 2) / (n - 1);
  const y = v => top + (1 - (v - mn) / (mx - mn || 1)) * (height - top - bot);
  const hi = hover != null ? hover : highlight;
  const cols = Math.max(4, Math.round(w / 90));
  const heights = [.62, .48, .74, .55, .7, .5, .66, .58, .72, .52, .64, .6];
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: 'relative',
      width: '100%',
      fontFamily: 'var(--font-sans)',
      ...style
    },
    onMouseLeave: () => setHover(null)
  }, /*#__PURE__*/React.createElement("svg", {
    width: w,
    height: height,
    style: {
      display: 'block'
    },
    onMouseMove: e => {
      const r = e.currentTarget.getBoundingClientRect();
      const i = Math.round((e.clientX - r.left - pad) / (w - pad * 2) * (n - 1));
      setHover(Math.max(0, Math.min(n - 1, i)));
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("pattern", {
    id: "al-hatch",
    width: "10",
    height: "10",
    patternUnits: "userSpaceOnUse",
    patternTransform: "rotate(45)"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "10",
    height: "10",
    fill: "#EDEEF2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "10",
    stroke: "#DCDDE3",
    strokeWidth: "2"
  })), series.map((s, k) => /*#__PURE__*/React.createElement("linearGradient", {
    key: k,
    id: 'al-fade-' + k,
    x1: "0",
    x2: "0",
    y1: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: s.color,
    stopOpacity: ".14"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: s.color,
    stopOpacity: "0"
  })))), backdrop && Array.from({
    length: cols
  }).map((_, i) => {
    const cw = w / cols;
    const h = heights[i % heights.length] * (height - bot);
    return /*#__PURE__*/React.createElement("rect", {
      key: i,
      x: i * cw + 2,
      y: height - bot - h,
      width: cw - 4,
      height: h,
      rx: "14",
      fill: "url(#al-hatch)"
    });
  }), series.map((s, k) => {
    const pts = s.data.map((v, i) => [x(i), y(v)]);
    const d = smooth(pts);
    return /*#__PURE__*/React.createElement("g", {
      key: k
    }, s.area && /*#__PURE__*/React.createElement("path", {
      d: d + ' L' + x(s.data.length - 1) + ',' + (height - bot) + ' L' + x(0) + ',' + (height - bot) + ' Z',
      fill: 'url(#al-fade-' + k + ')'
    }), /*#__PURE__*/React.createElement("path", {
      d: d,
      fill: "none",
      stroke: s.color,
      strokeWidth: "1.75",
      strokeLinecap: "round"
    }), dots && pts.map((p, i) => /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: p[0],
      cy: p[1],
      r: i === hi ? 6 : 4,
      fill: s.color,
      stroke: "#fff",
      strokeWidth: i === hi ? 2 : 0
    })));
  }), hi != null && /*#__PURE__*/React.createElement("line", {
    x1: x(hi),
    x2: x(hi),
    y1: y(series[0].data[hi]) + 8,
    y2: height - bot,
    stroke: "var(--ink-700)",
    strokeDasharray: "3 4",
    strokeWidth: "1"
  })), hi != null && series[0] && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x(hi),
      top: Math.max(0, y(series[0].data[hi]) - 44),
      transform: 'translateX(-50%)',
      background: 'var(--surface-inverse)',
      color: '#fff',
      padding: '6px 12px',
      borderRadius: 999,
      fontSize: 13,
      whiteSpace: 'nowrap',
      pointerEvents: 'none'
    }
  }, formatValue(series[0].data[hi], hi)), labels.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px ' + pad + 'px 0',
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, labels.map((l, i) => /*#__PURE__*/React.createElement("span", {
    key: i
  }, l))));
}
Object.assign(__ds_scope, { LineChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/LineChart.jsx", error: String((e && e.message) || e) }); }

// components/data/Metric.jsx
try { (() => {
function Metric({
  value,
  label,
  size = 'lg',
  decimals,
  inverse,
  style
}) {
  const fs = {
    sm: 28,
    md: 36,
    lg: 48,
    xl: 72
  }[size] || 48;
  const str = String(value);
  const i = decimals ? str.lastIndexOf('.') : -1;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      fontFamily: 'var(--font-sans)',
      color: inverse ? '#fff' : 'var(--text-strong)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: fs,
      fontWeight: 300,
      lineHeight: 1,
      letterSpacing: '-0.03em'
    }
  }, i > -1 ? /*#__PURE__*/React.createElement(React.Fragment, null, str.slice(0, i), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .55
    }
  }, str.slice(i))) : str), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: Math.max(12, Math.round(fs * 0.3)),
      fontWeight: 400,
      lineHeight: 1.1,
      color: inverse ? 'rgba(255,255,255,.7)' : 'var(--ink-800)'
    }
  }, label));
}
Object.assign(__ds_scope, { Metric });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Metric.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressPill.jsx
try { (() => {
const TONE = {
  dark: ['var(--surface-inverse)', '#fff'],
  brand: ['var(--brand)', '#fff'],
  light: ['var(--surface-sunken)', 'var(--ink-700)']
};
function ProgressPill({
  label,
  value = 0,
  tone = 'dark',
  people,
  height = 34,
  style
}) {
  const [bg, fg] = TONE[tone] || TONE.dark;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      position: 'relative',
      height,
      borderRadius: 999,
      background: 'var(--gray-100)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: Math.max(0, value) + '%',
      minWidth: 'max-content',
      maxWidth: '100%',
      borderRadius: 999,
      background: bg,
      color: fg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 14px',
      fontSize: 12,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      transition: 'width var(--dur-slow) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 10
    }
  }, value, "%"))), people && /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 66,
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.AvatarGroup, {
    people: people,
    size: 26
  })));
}
Object.assign(__ds_scope, { ProgressPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressPill.jsx", error: String((e && e.message) || e) }); }

// components/data/StatCard.jsx
try { (() => {
function StatCard({
  title,
  subtitle,
  value,
  unit,
  delta,
  deltaLabel,
  image,
  action,
  dots = true,
  onClick,
  style
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    onClick: onClick,
    padding: 18,
    style: {
      minHeight: 170,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      ...style
    }
  }, image && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      width: '46%',
      borderRadius: '22px 0 0 22px',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: image ? '54%' : '100%'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.CardHeader, {
    title: title,
    subtitle: subtitle,
    size: "sm"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Metric, {
    value: value,
    label: unit,
    size: "md"
  }), delta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      lineHeight: 1.1,
      color: 'var(--ink-800)',
      paddingBottom: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--green-500)',
      display: 'block'
    }
  }, delta), deltaLabel)), dots && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      display: 'flex',
      gap: 10,
      color: 'var(--gray-300)',
      fontSize: 10,
      letterSpacing: 0,
      maxWidth: image ? '54%' : '100%',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    }
  }, '×××××××××××××××'.split('').map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: i
  }, c)))), action && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 12,
      bottom: 12
    }
  }, action));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  width = 480
}) {
  React.useEffect(() => {
    if (!open) return;
    const k = e => e.key === 'Escape' && onClose && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open, onClose]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      background: 'rgba(11,31,39,.32)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      maxWidth: width,
      maxHeight: 'calc(100vh - 32px)',
      overflow: 'auto',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-2xl)',
      boxShadow: 'var(--shadow-pop)',
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      lineHeight: 1.2,
      letterSpacing: '-0.01em'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-strong)'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-muted)'
    }
  }, subtitle)), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "Fechar",
    size: 36,
    onClick: onClose
  })), children, footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      justifyContent: 'flex-end',
      flexWrap: 'wrap'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const TONE = {
  success: ['var(--green-500)', 'circle-check'],
  danger: ['var(--red-500)', 'circle-alert'],
  info: ['var(--brand)', 'bell'],
  neutral: ['var(--gray-500)', 'info']
};
function Toast({
  tone = 'success',
  title,
  message,
  onClose,
  style
}) {
  const [c, ic] = TONE[tone] || TONE.neutral;
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      width: '100%',
      maxWidth: 380,
      padding: '14px 14px 14px 16px',
      borderRadius: 20,
      background: 'var(--surface-card)',
      boxShadow: 'var(--shadow-pop)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: '50%',
      background: c,
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: ic,
    size: 16
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      fontSize: 13,
      lineHeight: 1.4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-strong)',
      fontSize: 14
    }
  }, title), message && /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-muted)'
    }
  }, message)), onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Fechar",
    onClick: onClose,
    style: {
      border: 0,
      background: 'transparent',
      color: 'var(--gray-500)',
      cursor: 'pointer',
      padding: 2,
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 16
  })));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function Tooltip({
  content,
  placement = 'top',
  children
}) {
  const [on, setOn] = React.useState(false);
  const pos = placement === 'bottom' ? {
    top: 'calc(100% + 8px)'
  } : {
    bottom: 'calc(100% + 8px)'
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex'
    },
    onMouseEnter: () => setOn(true),
    onMouseLeave: () => setOn(false),
    onFocus: () => setOn(true),
    onBlur: () => setOn(false)
  }, children, /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%) translateY(' + (on ? 0 : 4) + 'px)',
      ...pos,
      background: 'var(--surface-inverse)',
      color: '#fff',
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      padding: '6px 12px',
      borderRadius: 999,
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      opacity: on ? 1 : 0,
      transition: 'opacity var(--dur-fast),transform var(--dur-base) var(--ease-out)',
      zIndex: 20
    }
  }, content));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  checked,
  onChange,
  label,
  disabled,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .5 : 1,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-body)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: !!checked,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.checked),
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: 6,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: checked ? 'var(--brand)' : 'var(--surface-card)',
      boxShadow: checked ? 'none' : 'inset 0 0 0 1.5px var(--border-default)',
      color: '#fff',
      transition: 'background var(--dur-base)'
    }
  }, checked && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 14,
    strokeWidth: 2.25
  })), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function useCss() {
  React.useInsertionEffect ? React.useInsertionEffect(inj, []) : React.useEffect(inj, []);
}
function inj() {
  if (typeof document === 'undefined' || document.getElementById('al-input')) return;
  const s = document.createElement('style');
  s.id = 'al-input';
  s.textContent = ".al-field{display:flex;flex-direction:column;gap:6px;font-family:var(--font-sans)}\n.al-field__label{font-size:12px;color:var(--text-muted)}\n.al-input{display:flex;align-items:center;gap:10px;height:44px;padding:0 16px;border-radius:999px;background:var(--surface-sunken);color:var(--text-body);transition:box-shadow var(--dur-base),background var(--dur-base)}\n.al-input--white{background:var(--surface-card);box-shadow:inset 0 0 0 1px var(--border-subtle)}\n.al-input:hover{background:var(--gray-200)}.al-input--white:hover{background:var(--surface-card);box-shadow:inset 0 0 0 1px var(--border-default)}\n.al-input:focus-within{background:var(--surface-card);box-shadow:0 0 0 1px var(--brand),0 0 0 4px var(--focus-ring)}\n.al-input--error{box-shadow:0 0 0 1px var(--red-500)}\n.al-input input{flex:1;min-width:0;border:0;background:transparent;outline:none;font:inherit;font-size:14px;color:inherit}\n.al-input input::placeholder{color:var(--ink-600);opacity:.75}\n.al-input__kbd{font-size:12px;color:var(--ink-600);white-space:nowrap}\n.al-field__hint{font-size:12px;color:var(--text-muted)}.al-field__hint--error{color:var(--red-600)}";
  document.head.appendChild(s);
}
function Input({
  label,
  icon,
  shortcut,
  placeholder,
  value,
  defaultValue,
  onChange,
  type = 'text',
  variant = 'soft',
  error,
  hint,
  disabled,
  style
}) {
  useCss();
  return /*#__PURE__*/React.createElement("label", {
    className: "al-field",
    style: style
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "al-field__label"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: 'al-input' + (variant === 'white' ? ' al-input--white' : '') + (error ? ' al-input--error' : ''),
    style: disabled ? {
      opacity: .5
    } : null
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 18,
    color: "var(--ink-600)"
  }), /*#__PURE__*/React.createElement("input", {
    type: type,
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.value, e)
  }), shortcut && /*#__PURE__*/React.createElement("span", {
    className: "al-input__kbd"
  }, shortcut)), (error || hint) && /*#__PURE__*/React.createElement("span", {
    className: 'al-field__hint' + (error ? ' al-field__hint--error' : '')
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedControl.jsx
try { (() => {
function SegmentedControl({
  options = [],
  value,
  onChange,
  size = 'md',
  style
}) {
  const sm = size === 'sm';
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'inline-flex',
      padding: 3,
      gap: 2,
      borderRadius: 999,
      background: 'var(--surface-sunken)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, options.map(o => {
    const v = typeof o === 'string' ? o : o.value;
    const l = typeof o === 'string' ? o : o.label;
    const on = v === value;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      role: "tab",
      "aria-selected": on,
      type: "button",
      onClick: () => onChange && onChange(v),
      style: {
        height: sm ? 26 : 32,
        padding: sm ? '0 12px' : '0 18px',
        border: 0,
        borderRadius: 999,
        cursor: 'pointer',
        font: 'inherit',
        fontSize: sm ? 12 : 13,
        color: on ? 'var(--text-strong)' : 'var(--ink-600)',
        background: on ? 'var(--surface-card)' : 'transparent',
        boxShadow: on ? 'var(--shadow-xs)' : 'none',
        transition: 'background var(--dur-base) var(--ease-out),color var(--dur-base)'
      }
    }, l);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Select({
  label,
  options = [],
  value,
  onChange,
  size = 'md',
  style
}) {
  const sm = size === 'sm';
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: value,
    onChange: e => onChange && onChange(e.target.value),
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      height: sm ? 30 : 44,
      padding: sm ? '0 30px 0 12px' : '0 40px 0 16px',
      borderRadius: 999,
      border: 0,
      background: sm ? 'var(--surface-card)' : 'var(--surface-sunken)',
      boxShadow: sm ? 'inset 0 0 0 1px var(--border-subtle)' : 'none',
      font: 'inherit',
      fontSize: sm ? 12 : 14,
      color: 'var(--text-body)',
      cursor: 'pointer',
      outline: 'none',
      width: '100%'
    }
  }, options.map(o => {
    const v = typeof o === 'string' ? o : o.value;
    const l = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: sm ? 14 : 16,
    style: {
      position: 'absolute',
      right: sm ? 10 : 14,
      pointerEvents: 'none'
    }
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked,
  onChange,
  label,
  disabled,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .5 : 1,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-body)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    role: "switch",
    checked: !!checked,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.checked),
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: 40,
      height: 24,
      borderRadius: 999,
      background: checked ? 'var(--brand)' : 'var(--gray-300)',
      transition: 'background var(--dur-base) var(--ease-out)',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: checked ? 19 : 3,
      width: 18,
      height: 18,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: '0 1px 3px rgba(0,0,0,.15)',
      transition: 'left var(--dur-base) var(--ease-out)'
    }
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavPills.jsx
try { (() => {
function useCss() {
  React.useInsertionEffect ? React.useInsertionEffect(inj, []) : React.useEffect(inj, []);
}
function inj() {
  if (typeof document === 'undefined' || document.getElementById('al-nav')) return;
  const s = document.createElement('style');
  s.id = 'al-nav';
  s.textContent = ".al-nav{display:inline-flex;align-items:center;gap:4px;padding:4px;border-radius:999px;background:var(--surface-sunken);font-family:var(--font-sans)}\n.al-nav--bar{background:var(--surface-card);box-shadow:var(--shadow-card);gap:8px;padding:6px}\n.al-nav__item{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:40px;padding:0 18px;border:0;border-radius:999px;background:transparent;color:var(--ink-700);font:inherit;font-size:14px;cursor:pointer;white-space:nowrap;transition:background var(--dur-base) var(--ease-out),color var(--dur-base),padding var(--dur-base) var(--ease-out)}\n.al-nav__item:hover{background:rgba(11,31,39,.05)}\n.al-nav__item[aria-selected=true]{background:var(--brand);color:#fff;box-shadow:var(--shadow-brand)}\n.al-nav--compact .al-nav__item{height:48px;min-width:52px;padding:0 14px;background:var(--surface-sunken)}\n.al-nav--compact .al-nav__item[aria-selected=true]{flex:1;padding:0 20px;background:var(--brand)}\n.al-nav__item:focus-visible{outline:none;box-shadow:0 0 0 3px var(--focus-ring)}";
  document.head.appendChild(s);
}
function NavPills({
  items = [],
  value,
  onChange,
  compact,
  bar,
  style
}) {
  useCss();
  return /*#__PURE__*/React.createElement("nav", {
    role: "tablist",
    className: 'al-nav' + (compact ? ' al-nav--compact' : '') + (bar ? ' al-nav--bar' : ''),
    style: style
  }, items.map(it => {
    const on = it.id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      type: "button",
      role: "tab",
      "aria-selected": on,
      "aria-label": it.label,
      className: "al-nav__item",
      onClick: () => onChange && onChange(it.id)
    }, it.icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: compact ? 22 : 18
    }), (!compact || on) && /*#__PURE__*/React.createElement("span", null, it.label));
  }));
}
Object.assign(__ds_scope, { NavPills });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavPills.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SideRail.jsx
try { (() => {
function useCss() {
  React.useInsertionEffect ? React.useInsertionEffect(inj, []) : React.useEffect(inj, []);
}
function inj() {
  if (typeof document === 'undefined' || document.getElementById('al-rail')) return;
  const s = document.createElement('style');
  s.id = 'al-rail';
  s.textContent = ".al-rail{display:flex;flex-direction:column;align-items:center;gap:10px;font-family:var(--font-sans)}\n.al-rail__btn{position:relative;width:44px;height:44px;border-radius:50%;border:0;display:inline-flex;align-items:center;justify-content:center;background:var(--surface-sunken);color:var(--ink-600);cursor:pointer;transition:background var(--dur-base),color var(--dur-base),transform var(--dur-fast)}\n.al-rail__btn:hover{background:var(--gray-200);color:var(--ink-800)}.al-rail__btn:active{transform:scale(.94)}\n.al-rail__btn[aria-current=true]{background:var(--brand);color:#fff;box-shadow:var(--shadow-brand)}\n.al-rail__btn:focus-visible{outline:none;box-shadow:0 0 0 3px var(--focus-ring)}\n.al-rail__tip{position:absolute;left:54px;top:50%;transform:translateY(-50%);background:var(--surface-inverse);color:#fff;font-size:12px;padding:5px 10px;border-radius:8px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity var(--dur-fast);z-index:5}\n.al-rail__btn:hover .al-rail__tip{opacity:1}";
  document.head.appendChild(s);
}
function SideRail({
  items = [],
  value,
  onChange,
  footer,
  style
}) {
  useCss();
  return /*#__PURE__*/React.createElement("aside", {
    className: "al-rail",
    style: style
  }, items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.id,
    type: "button",
    "aria-label": it.label,
    "aria-current": it.id === value,
    className: "al-rail__btn",
    onClick: () => onChange && onChange(it.id)
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: it.icon,
    size: 20
  }), /*#__PURE__*/React.createElement("span", {
    className: "al-rail__tip"
  }, it.label))), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, footer));
}
Object.assign(__ds_scope, { SideRail });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SideRail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/AnalyticsScreen.jsx
try { (() => {
(function () {
  const {
    Card,
    CardHeader,
    Metric,
    BarChart,
    Legend,
    LineChart,
    HeatScale,
    SegmentedControl,
    Select,
    Chip
  } = window.AlugaDesignSystem_e4b917;
  const viz = [{
    label: 'Direto',
    value: 27,
    color: 'var(--viz-blue)'
  }, {
    label: 'Site',
    value: 28,
    color: 'var(--viz-green)'
  }, {
    label: 'Instagram',
    value: 34,
    color: 'var(--viz-orange)'
  }, {
    label: 'Parceiro',
    value: 11,
    color: 'var(--viz-lilac)'
  }];
  function AnalyticsScreen({
    bp
  }) {
    const D = window.ALUGA_DATA;
    const [r1, setR1] = React.useState('Mês');
    const [r2, setR2] = React.useState('Semana');
    const cols = bp === 'd' ? 3 : bp === 't' ? 2 : 1;
    const span = n => ({
      gridColumn: 'span ' + Math.min(n, cols)
    });
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(' + cols + ',minmax(0,1fr))',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(CardHeader, {
      title: "Visitantes por",
      subtitle: "Origem"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 84,
        height: 84,
        borderRadius: '50%',
        background: 'var(--brand)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 'none',
        marginTop: -4,
        boxShadow: 'var(--shadow-brand)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12
      }
    }, "Total"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 24,
        fontWeight: 300,
        lineHeight: 1
      }
    }, "1.562"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 16,
        alignItems: 'flex-end',
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement(Legend, {
      items: viz.map(v => ({
        label: v.label,
        color: v.color,
        value: v.value + '%'
      })),
      style: {
        width: 130
      }
    }), /*#__PURE__*/React.createElement(BarChart, {
      data: viz,
      height: 110,
      style: {
        flex: 1
      }
    }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
      title: "Desempenho de",
      subtitle: "Visitas",
      action: /*#__PURE__*/React.createElement(Chip, {
        icon: "lightbulb"
      }, "Saiba mais")
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6,
        marginTop: 22
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 62,
        height: 22,
        borderRadius: 999,
        background: 'var(--brand)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 38,
        height: 22,
        borderRadius: 999,
        background: 'var(--ink-800)'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10,
        marginTop: 10
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)',
        display: 'flex',
        gap: 6,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: 'var(--brand)'
      }
    }), "Visitas agendadas"), /*#__PURE__*/React.createElement(Metric, {
      value: "78%",
      label: "Bom",
      size: "md",
      style: {
        marginTop: 6
      }
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)',
        display: 'flex',
        gap: 6,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: 'var(--ink-800)'
      }
    }), "Realizadas"), /*#__PURE__*/React.createElement(Metric, {
      value: "64%",
      label: "Est\xE1vel",
      size: "md",
      style: {
        marginTop: 6
      }
    })))), /*#__PURE__*/React.createElement(Card, {
      style: bp === 't' ? span(2) : {}
    }, /*#__PURE__*/React.createElement(CardHeader, {
      title: "Tempo m\xE9dio de",
      subtitle: "Loca\xE7\xE3o"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: 12,
        flexWrap: 'wrap',
        marginTop: 24
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Metric, {
      value: "18 dias",
      size: "md"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--green-500)'
      }
    }, "3 dias"), " a menos vs m\xEAs passado")), /*#__PURE__*/React.createElement(HeatScale, {
      level: 8,
      label: "Alta procura"
    }))), /*#__PURE__*/React.createElement(Card, {
      style: span(2)
    }, /*#__PURE__*/React.createElement(CardHeader, {
      title: "Fluxo de",
      subtitle: "Visitantes",
      action: bp === 'm' ? null : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SegmentedControl, {
        size: "sm",
        options: ['Dia', 'Semana', 'Mês'],
        value: r1,
        onChange: setR1
      }), /*#__PURE__*/React.createElement(Select, {
        size: "sm",
        options: ['Todos os imóveis', 'Ed. Aurora', 'Residencial Pinheiros']
      }))
    }), /*#__PURE__*/React.createElement(Legend, {
      direction: "row",
      style: {
        margin: '12px 0 4px'
      },
      items: [{
        label: 'Visitantes',
        color: 'var(--viz-green)',
        line: true
      }, {
        label: 'Recorrentes',
        color: 'var(--brand)',
        line: true
      }]
    }), /*#__PURE__*/React.createElement(LineChart, {
      height: 220,
      series: [{
        name: 'Visitantes',
        color: 'var(--green-500)',
        data: D.visitors.a
      }, {
        name: 'Recorrentes',
        color: 'var(--brand)',
        data: D.visitors.b
      }],
      labels: ['10 out', '15 out', '20 out', '25 out', '31 out'],
      highlight: 2,
      formatValue: v => 'Visitantes: ' + Math.round(v * 180).toLocaleString('pt-BR')
    })), /*#__PURE__*/React.createElement(Card, {
      style: bp === 'd' ? {
        gridRow: 'span 2'
      } : {}
    }, /*#__PURE__*/React.createElement(CardHeader, {
      title: "Mapa de interesse",
      subtitle: "por unidade"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 16,
        marginTop: 18
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 6,
        borderRadius: 999,
        background: 'linear-gradient(var(--red-500),var(--brand),var(--gray-300))'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontSize: 13,
        lineHeight: 1.2,
        minHeight: 160
      }
    }, /*#__PURE__*/React.createElement("span", null, "Alto", /*#__PURE__*/React.createElement("br", null), "interesse"), /*#__PURE__*/React.createElement("span", null, "Baixo", /*#__PURE__*/React.createElement("br", null), "interesse"))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        gap: 5,
        alignContent: 'center'
      }
    }, [7, 6, 4, 2, 6, 5, 3, 1, 5, 7, 6, 3, 2, 4, 5, 6, 1, 3, 2, 4, 3, 1, 2, 5].map((v, i) => /*#__PURE__*/React.createElement("span", {
      key: i,
      title: 'Unidade ' + (100 + i),
      style: {
        aspectRatio: '1.5',
        borderRadius: 8,
        background: 'var(--heat-' + v + ')'
      }
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        marginTop: 18,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        background: 'var(--brand)',
        color: '#fff',
        borderRadius: 999,
        padding: '8px 14px',
        fontSize: 13
      }
    }, "Livres 28%"), /*#__PURE__*/React.createElement("span", {
      style: {
        background: 'var(--surface-sunken)',
        borderRadius: 999,
        padding: '8px 14px',
        fontSize: 13
      }
    }, "Reservadas 3%"), /*#__PURE__*/React.createElement("span", {
      style: {
        background: 'var(--surface-sunken)',
        borderRadius: 999,
        padding: '8px 14px',
        fontSize: 13
      }
    }, "Vencendo 6%"))), /*#__PURE__*/React.createElement(Card, {
      style: span(2)
    }, /*#__PURE__*/React.createElement(CardHeader, {
      title: "Valor do aluguel",
      subtitle: "An\xE1lise",
      action: /*#__PURE__*/React.createElement(SegmentedControl, {
        size: "sm",
        options: ['Dia', 'Semana', 'Mês'],
        value: r2,
        onChange: setR2
      })
    }), /*#__PURE__*/React.createElement(LineChart, {
      height: 200,
      series: [{
        name: 'Preço',
        color: 'var(--ink-700)',
        data: D.revenue[r2]
      }],
      labels: ['10 out', '15 out', '20 out', '25 out', '31 out'],
      highlight: 4,
      formatValue: v => /*#__PURE__*/React.createElement("span", null, "R$ ", Math.round(v * 100).toLocaleString('pt-BR'), /*#__PURE__*/React.createElement("span", {
        style: {
          opacity: .55
        }
      }, ",00"))
    })));
  }
  window.AnalyticsScreen = AnalyticsScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/AnalyticsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/App.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
(function () {
  const {
    Dialog,
    Button,
    Input,
    Select,
    Checkbox,
    Toast,
    SegmentedControl
  } = window.AlugaDesignSystem_e4b917;
  function App() {
    const [authed, setAuthed] = React.useState(() => localStorage.getItem('aluga_kit_auth') === '1');
    const [module, setModule] = React.useState(() => localStorage.getItem('aluga_kit_module') || 'dash');
    const [view, setView] = React.useState('overview');
    const [tasks, setTasks] = React.useState(window.ALUGA_DATA.tasks);
    const [adding, setAdding] = React.useState(false);
    const [draft, setDraft] = React.useState({
      title: '',
      where: 'Ed. Aurora',
      urgent: false
    });
    const [toasts, setToasts] = React.useState([]);
    React.useEffect(() => {
      localStorage.setItem('aluga_kit_module', module);
      window.scrollTo(0, 0);
    }, [module]);
    const toast = t => {
      const id = Date.now() + Math.random();
      setToasts(x => [...x, {
        ...t,
        id
      }]);
      setTimeout(() => setToasts(x => x.filter(y => y.id !== id)), 3200);
    };
    const login = () => {
      localStorage.setItem('aluga_kit_auth', '1');
      setAuthed(true);
    };
    const logout = () => {
      localStorage.setItem('aluga_kit_auth', '0');
      setAuthed(false);
    };
    const save = () => {
      if (!draft.title.trim()) return;
      setTasks(ts => [{
        id: Date.now(),
        title: draft.title,
        where: draft.where,
        progress: 5,
        tone: draft.urgent ? 'brand' : 'light',
        people: [{
          name: 'Rodrigo Alves'
        }],
        status: draft.urgent ? 'Urgente' : 'Agendada',
        due: '—'
      }, ...ts]);
      setAdding(false);
      setDraft({
        title: '',
        where: 'Ed. Aurora',
        urgent: false
      });
      toast({
        title: 'Tarefa criada',
        message: 'A equipe de manutenção foi notificada.'
      });
    };
    if (!authed) return /*#__PURE__*/React.createElement(LoginScreen, {
      onLogin: login
    });
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Shell, {
      module: module,
      setModule: setModule,
      view: view,
      setView: setView,
      onLogout: logout
    }, bp => {
      if (module === 'dash') return /*#__PURE__*/React.createElement(React.Fragment, null, bp === 'm' && /*#__PURE__*/React.createElement(SegmentedControl, {
        options: [{
          value: 'overview',
          label: 'Visão geral'
        }, {
          value: 'analytics',
          label: 'Análises'
        }],
        value: view,
        onChange: setView,
        style: {
          marginBottom: 14,
          display: 'flex'
        }
      }), view === 'analytics' ? /*#__PURE__*/React.createElement(AnalyticsScreen, {
        bp: bp
      }) : /*#__PURE__*/React.createElement(DashboardScreen, {
        bp: bp,
        tasks: tasks,
        onAddTask: () => setAdding(true),
        go: setModule
      }));
      if (module === 'props') return /*#__PURE__*/React.createElement(PropertiesScreen, {
        bp: bp,
        toast: toast
      });
      if (module === 'maint') return /*#__PURE__*/React.createElement(MaintenanceScreen, {
        bp: bp,
        tasks: tasks,
        setTasks: setTasks,
        onAddTask: () => setAdding(true),
        toast: toast
      });
      return /*#__PURE__*/React.createElement(FinanceScreen, {
        bp: bp,
        toast: toast
      });
    }), /*#__PURE__*/React.createElement(Dialog, {
      open: adding,
      onClose: () => setAdding(false),
      title: "Nova tarefa",
      subtitle: "Manuten\xE7\xE3o",
      footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        onClick: () => setAdding(false)
      }, "Cancelar"), /*#__PURE__*/React.createElement(Button, {
        onClick: save,
        disabled: !draft.title.trim()
      }, "Salvar tarefa"))
    }, /*#__PURE__*/React.createElement(Input, {
      label: "T\xEDtulo",
      variant: "white",
      placeholder: "Ex.: Troca do chuveiro",
      value: draft.title,
      onChange: v => setDraft(d => ({
        ...d,
        title: v
      }))
    }), /*#__PURE__*/React.createElement(Select, {
      label: "Im\xF3vel",
      options: ['Ed. Aurora', 'Residencial Pinheiros', 'Casa Jardins', 'Vila Madalena Lofts'],
      value: draft.where,
      onChange: v => setDraft(d => ({
        ...d,
        where: v
      }))
    }), /*#__PURE__*/React.createElement(Checkbox, {
      checked: draft.urgent,
      onChange: v => setDraft(d => ({
        ...d,
        urgent: v
      })),
      label: "Marcar como urgente"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'fixed',
        right: 16,
        bottom: 96,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        zIndex: 200,
        width: 'min(380px,calc(100vw - 32px))'
      }
    }, toasts.map(t => /*#__PURE__*/React.createElement(Toast, _extends({
      key: t.id
    }, t, {
      onClose: () => setToasts(x => x.filter(y => y.id !== t.id))
    })))));
  }
  ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/DashboardScreen.jsx
try { (() => {
(function () {
  const {
    Card,
    CardHeader,
    StatCard,
    Metric,
    ProgressPill,
    LineChart,
    Chip,
    IconButton,
    Button,
    Badge,
    Legend
  } = window.AlugaDesignSystem_e4b917;
  function DashboardScreen({
    bp,
    tasks,
    onAddTask,
    go
  }) {
    const D = window.ALUGA_DATA;
    const cols = bp === 'd' ? 4 : 2;
    const m = bp === 'm';
    const full = m ? {
      gridColumn: 'span 2'
    } : {};
    const grid = {
      display: 'grid',
      gridAutoFlow: 'dense',
      gridTemplateColumns: 'repeat(' + cols + ',minmax(0,1fr))',
      gap: 14
    };
    const span = n => ({
      gridColumn: 'span ' + Math.min(n, cols)
    });
    return /*#__PURE__*/React.createElement("div", {
      style: grid
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...span(bp === 'm' ? 1 : 1)
      }
    }, /*#__PURE__*/React.createElement(StatCard, {
      title: "Total de",
      subtitle: "Unidades",
      value: "432",
      image: "../../assets/images/house-orange.png",
      action: /*#__PURE__*/React.createElement(Chip, {
        variant: "glass",
        icon: "building-2",
        onClick: () => go('props')
      }, "Ver unidades")
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StatCard, {
      title: "Visitas",
      subtitle: "Hoje",
      value: "56",
      image: "../../assets/images/building-glass.png",
      action: /*#__PURE__*/React.createElement(Chip, {
        variant: "glass",
        icon: "users"
      }, "Agenda")
    })), /*#__PURE__*/React.createElement("div", {
      style: full
    }, /*#__PURE__*/React.createElement(StatCard, {
      title: "Novos",
      subtitle: "Contratos",
      value: "32",
      delta: "+12",
      deltaLabel: "esta semana"
    })), /*#__PURE__*/React.createElement(Card, {
      padding: 0,
      style: {
        ...full,
        ...(bp === 'd' ? {
          gridRow: 'span 2'
        } : {}),
        minHeight: bp === 'd' ? 0 : 320,
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 20
      }
    }, /*#__PURE__*/React.createElement(CardHeader, {
      title: "Ed. Aurora,",
      subtitle: "S\xE3o Paulo \xB7 SP-04",
      action: /*#__PURE__*/React.createElement(IconButton, {
        icon: "maximize-2",
        label: "Abrir im\xF3vel",
        variant: "soft",
        size: 36,
        onClick: () => go('props')
      })
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        position: 'relative',
        minHeight: 200
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/images/building-brick.png",
      alt: "",
      style: {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 14,
        right: 14,
        bottom: 14,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'rgba(255,255,255,.82)',
        backdropFilter: 'var(--blur-glass)',
        WebkitBackdropFilter: 'var(--blur-glass)',
        borderRadius: 18,
        padding: '10px 14px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--ink-700)'
      }
    }, "Ocupa\xE7\xE3o"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 26,
        fontWeight: 300,
        color: 'var(--text-strong)'
      }
    }, "78%"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: 'var(--green-500)'
      }
    }, "+6% vs m\xEAs passado")), /*#__PURE__*/React.createElement(Chip, {
      variant: "dark",
      icon: "lightbulb"
    }, "Saiba mais")))), /*#__PURE__*/React.createElement(Card, {
      style: span(2)
    }, /*#__PURE__*/React.createElement(CardHeader, {
      title: "Manuten\xE7\xE3o",
      subtitle: "Atividade",
      action: /*#__PURE__*/React.createElement(Button, {
        variant: "dark",
        size: "sm",
        icon: "plus",
        onClick: onAddTask
      }, "Adicionar tarefa")
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)',
        margin: '14px 0 10px'
      }
    }, "Status das tarefas em andamento"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    }, tasks.slice(0, 4).map(t => /*#__PURE__*/React.createElement(ProgressPill, {
      key: t.id,
      label: t.title,
      value: t.progress,
      tone: t.tone,
      people: bp === 'm' ? undefined : t.people
    })))), /*#__PURE__*/React.createElement(Card, {
      tone: "dark",
      style: {
        ...full,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 220
      }
    }, /*#__PURE__*/React.createElement(CardHeader, {
      inverse: true,
      title: "Pr\xF3ximo",
      subtitle: "vencimento",
      action: /*#__PURE__*/React.createElement(IconButton, {
        icon: "maximize-2",
        label: "Financeiro",
        variant: "ghost",
        size: 36,
        style: {
          background: 'rgba(255,255,255,.08)',
          color: '#fff'
        },
        onClick: () => go('fin')
      })
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Metric, {
      inverse: true,
      value: "05",
      label: "nov",
      size: "lg"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        padding: '10px 14px',
        borderRadius: 16,
        background: 'var(--ink-700)',
        fontSize: 13
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'rgba(255,255,255,.6)'
      }
    }, "Faltam"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 20,
        fontWeight: 300
      }
    }, "13 dias")))), /*#__PURE__*/React.createElement(Card, {
      style: span(2)
    }, /*#__PURE__*/React.createElement(CardHeader, {
      title: "Insights",
      subtitle: "Assistente IA",
      action: /*#__PURE__*/React.createElement(IconButton, {
        icon: "lightbulb",
        label: "Insights",
        size: 36
      })
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)',
        marginTop: 10,
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }
    }, "sistema analisando ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--brand)'
      }
    }, "\u2022")), /*#__PURE__*/React.createElement(LineChart, {
      height: 140,
      backdrop: false,
      series: [{
        name: 'Ocupação',
        color: 'var(--brand)',
        data: [61, 64, 63, 67, 66, 71, 72, 76, 78],
        area: true
      }],
      highlight: 8,
      formatValue: v => v + '%'
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--gray-50)',
        borderRadius: 16,
        padding: '10px 14px',
        fontSize: 13,
        lineHeight: 1.5
      }
    }, "Previs\xE3o de ocupa\xE7\xE3o total: 65 dias", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12
      }
    }, "Reajuste sugerido em 3 unidades: ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--green-500)'
      }
    }, "+4,5%")))), /*#__PURE__*/React.createElement(Card, {
      style: {
        ...full,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(CardHeader, {
      title: "Sa\xFAde",
      subtitle: "Financeira",
      action: /*#__PURE__*/React.createElement(IconButton, {
        icon: "maximize-2",
        label: "Financeiro",
        size: 36,
        onClick: () => go('fin')
      })
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 24,
        color: 'var(--text-strong)'
      }
    }, "\xD3tima"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 24,
        fontWeight: 300
      }
    }, "96%")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        fontSize: 12
      }
    }, [['Adimplência', 94], ['Inadimplência', 6]].map(([l, v]) => /*#__PURE__*/React.createElement("div", {
      key: l,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 84,
        color: 'var(--text-muted)'
      }
    }, l), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        height: 22,
        borderRadius: 999,
        background: 'var(--gray-100)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: Math.max(v, 12) + '%',
        height: '100%',
        borderRadius: 999,
        background: v > 50 ? 'var(--gray-200)' : 'var(--orange-100)',
        fontSize: 11,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 8
      }
    }, v, "%")))))), /*#__PURE__*/React.createElement(Card, {
      style: {
        ...full,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(CardHeader, {
      title: "Receita",
      subtitle: "Mensal"
    }), /*#__PURE__*/React.createElement(Metric, {
      value: "R$ 124K",
      size: "md"
    }), /*#__PURE__*/React.createElement(Legend, {
      direction: "row",
      items: [{
        label: 'Aluguéis',
        color: 'var(--brand)'
      }, {
        label: 'Taxas',
        color: 'var(--ink-800)'
      }]
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        height: 10,
        borderRadius: 999,
        overflow: 'hidden',
        gap: 3
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 82,
        background: 'var(--brand)',
        borderRadius: 999
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 18,
        background: 'var(--ink-800)',
        borderRadius: 999
      }
    }))));
  }
  window.DashboardScreen = DashboardScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/DashboardScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/FinanceScreen.jsx
try { (() => {
(function () {
  const {
    Card,
    CardHeader,
    Metric,
    LineChart,
    SegmentedControl,
    DataTable,
    Badge,
    Switch,
    Button,
    Legend
  } = window.AlugaDesignSystem_e4b917;
  function FinanceScreen({
    bp,
    toast
  }) {
    const D = window.ALUGA_DATA;
    const [r, setR] = React.useState('Mês');
    const [auto, setAuto] = React.useState(true);
    const [pays, setPays] = React.useState(D.payments);
    const cols = bp === 'm' ? 1 : 3;
    const charge = p => {
      setPays(ps => ps.map(x => x.id === p.id ? {
        ...x,
        status: 'Cobrança enviada'
      } : x));
      toast({
        tone: 'info',
        title: 'Cobrança enviada',
        message: p.who + ' · ' + window.brl(p.value)
      });
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(' + cols + ',minmax(0,1fr))',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
      title: "Receita",
      subtitle: "Mensal"
    }), /*#__PURE__*/React.createElement(Metric, {
      value: "R$ 124K",
      size: "lg",
      style: {
        marginTop: 22
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--green-500)'
      }
    }, "+8,2%"), " vs setembro")), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
      title: "Despesas",
      subtitle: "Recorrentes"
    }), /*#__PURE__*/React.createElement(Metric, {
      value: "R$ 31K",
      size: "lg",
      style: {
        marginTop: 22
      }
    }), /*#__PURE__*/React.createElement(Legend, {
      direction: "row",
      style: {
        marginTop: 10
      },
      items: [{
        label: 'Condomínio',
        color: 'var(--brand)'
      }, {
        label: 'Manutenção',
        color: 'var(--ink-800)'
      }, {
        label: 'Taxas',
        color: 'var(--gray-300)'
      }]
    })), /*#__PURE__*/React.createElement(Card, {
      tone: "brand"
    }, /*#__PURE__*/React.createElement(CardHeader, {
      inverse: true,
      title: "A receber",
      subtitle: "este m\xEAs"
    }), /*#__PURE__*/React.createElement(Metric, {
      inverse: true,
      value: "R$ 18,9K",
      size: "lg",
      style: {
        marginTop: 22
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14
      }
    }, /*#__PURE__*/React.createElement(Switch, {
      checked: auto,
      onChange: v => {
        setAuto(v);
        toast({
          tone: 'neutral',
          title: v ? 'Cobrança automática ativada' : 'Cobrança automática desativada'
        });
      },
      label: /*#__PURE__*/React.createElement("span", {
        style: {
          color: '#fff',
          fontSize: 13
        }
      }, "Cobran\xE7a autom\xE1tica")
    })))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
      title: "Fluxo de caixa",
      subtitle: "An\xE1lise",
      action: /*#__PURE__*/React.createElement(SegmentedControl, {
        size: "sm",
        options: ['Dia', 'Semana', 'Mês'],
        value: r,
        onChange: setR
      })
    }), /*#__PURE__*/React.createElement(LineChart, {
      height: bp === 'm' ? 170 : 220,
      series: [{
        name: 'Receita',
        color: 'var(--ink-700)',
        data: D.revenue[r]
      }],
      labels: ['Jan', 'Mar', 'Mai', 'Jul', 'Set'],
      highlight: 6,
      formatValue: v => /*#__PURE__*/React.createElement("span", null, "R$ ", Math.round(v * 100).toLocaleString('pt-BR'), /*#__PURE__*/React.createElement("span", {
        style: {
          opacity: .55
        }
      }, ",00"))
    })), /*#__PURE__*/React.createElement(Card, {
      padding: bp === 'm' ? 14 : 20
    }, /*#__PURE__*/React.createElement(CardHeader, {
      title: "Pagamentos",
      subtitle: "Recentes",
      style: {
        marginBottom: 10
      }
    }), /*#__PURE__*/React.createElement(DataTable, {
      columns: [{
        key: 'who',
        label: 'Inquilino',
        render: p => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
          style: {
            color: 'var(--text-strong)'
          }
        }, p.who), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 12,
            color: 'var(--text-muted)'
          }
        }, p.unit))
      }, {
        key: 'date',
        label: 'Data'
      }, {
        key: 'value',
        label: 'Valor',
        align: 'right',
        render: p => window.brl(p.value)
      }, {
        key: 'status',
        label: 'Status',
        render: p => /*#__PURE__*/React.createElement(Badge, {
          size: "sm",
          dot: true,
          tone: window.STATUS_TONE[p.status] || 'soft'
        }, p.status)
      }, {
        key: 'a',
        label: '',
        align: 'right',
        render: p => p.status === 'Atrasado' || p.status === 'A vencer' ? /*#__PURE__*/React.createElement(Button, {
          size: "sm",
          variant: "secondary",
          onClick: () => charge(p)
        }, "Cobrar") : null
      }],
      rows: pays
    })));
  }
  window.FinanceScreen = FinanceScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/FinanceScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/LoginScreen.jsx
try { (() => {
const {
  Button: LBtn,
  Input: LInput,
  Checkbox: LCheck,
  Wordmark: LWord
} = window.AlugaDesignSystem_e4b917;
function LoginScreen({
  onLogin
}) {
  const bp = useBreakpoint();
  const [remember, setRemember] = React.useState(true);
  const [email, setEmail] = React.useState('rodrigo@aluga.com.br');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: bp === 'm' ? '1fr' : '1.1fr 1fr',
      background: 'var(--surface-page)',
      padding: bp === 'm' ? 12 : 20,
      gap: 20
    }
  }, bp !== 'm' && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 40,
      overflow: 'hidden',
      minHeight: 560,
      background: '#DCE1E6'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/images/building-brick.png",
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: '30% 100%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '0 0 auto 0',
      height: '48%',
      background: 'linear-gradient(#DCE1E6 55%,rgba(220,225,230,0))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 36,
      top: 36,
      right: 36,
      fontSize: 44,
      lineHeight: 1.08,
      textTransform: 'uppercase',
      color: '#1D3C47',
      letterSpacing: '-0.01em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 300
    }
  }, "Feito para"), " ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 500
    }
  }, "administrar"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 300
    }
  }, "o que voc\xEA"), " ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 500
    }
  }, "aluga")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 28,
      bottom: 28,
      maxWidth: 360,
      color: 'rgba(255,255,255,.8)',
      fontSize: 17,
      lineHeight: 1.35,
      fontWeight: 300
    }
  }, "Re\xFAne ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 500,
      color: '#fff'
    }
  }, "contratos"), ", ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 500,
      color: '#fff'
    }
  }, "manuten\xE7\xE3o"), " e ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 500,
      color: '#fff'
    }
  }, "finan\xE7as"), " em um s\xF3 lugar.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: bp === 'm' ? '40px 12px' : 24
    }
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onLogin();
    },
    style: {
      width: '100%',
      maxWidth: 400,
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(LWord, {
    size: 40
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      lineHeight: 1.15,
      letterSpacing: '-0.01em',
      margin: '18px 0 4px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-strong)'
    }
  }, "Bem-vindo de volta"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-muted)'
    }
  }, "Entre na sua conta")), /*#__PURE__*/React.createElement(LInput, {
    label: "E-mail",
    variant: "white",
    value: email,
    onChange: setEmail,
    icon: "mail"
  }), /*#__PURE__*/React.createElement(LInput, {
    label: "Senha",
    variant: "white",
    type: "password",
    defaultValue: "aluga2026",
    icon: "lock"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(LCheck, {
    checked: remember,
    onChange: setRemember,
    label: "Manter conectado"
  }), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault()
  }, "Esqueci a senha")), /*#__PURE__*/React.createElement(LBtn, {
    type: "submit",
    size: "lg",
    fullWidth: true,
    iconRight: "arrow-right"
  }, "Entrar"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      textAlign: 'center'
    }
  }, "Ainda n\xE3o tem conta? ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault()
  }, "Criar conta")))));
}
window.LoginScreen = LoginScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/LoginScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/MaintenanceScreen.jsx
try { (() => {
(function () {
  const {
    Card,
    CardHeader,
    ProgressPill,
    Badge,
    Button,
    AvatarGroup,
    Metric,
    SegmentedControl,
    IconButton
  } = window.AlugaDesignSystem_e4b917;
  function MaintenanceScreen({
    bp,
    tasks,
    setTasks,
    onAddTask,
    toast
  }) {
    const [f, setF] = React.useState('Abertas');
    const list = tasks.filter(t => f === 'Todas' || (f === 'Abertas' ? t.progress < 100 : t.progress === 100));
    const done = id => {
      setTasks(ts => ts.map(t => t.id === id ? {
        ...t,
        progress: 100,
        tone: 'dark',
        status: 'Concluída'
      } : t));
      toast({
        title: 'Tarefa concluída',
        message: 'O inquilino foi notificado.'
      });
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: bp === 'd' ? 'minmax(0,2fr) minmax(0,1fr)' : '1fr',
        gap: 14,
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(CardHeader, {
      title: "Tarefas",
      subtitle: "de manuten\xE7\xE3o",
      style: {
        marginRight: 'auto'
      }
    }), /*#__PURE__*/React.createElement(SegmentedControl, {
      size: "sm",
      options: ['Abertas', 'Concluídas', 'Todas'],
      value: f,
      onChange: setF
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "dark",
      size: "sm",
      icon: "plus",
      onClick: onAddTask
    }, "Adicionar")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 12
      }
    }, list.map(t => /*#__PURE__*/React.createElement("div", {
      key: t.id,
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: '14px 0',
        borderTop: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 160
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: 'var(--text-strong)',
        fontSize: 15
      }
    }, t.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)'
      }
    }, t.where, " \xB7 prazo ", t.due)), /*#__PURE__*/React.createElement(Badge, {
      size: "sm",
      dot: true,
      tone: window.STATUS_TONE[t.status] || 'neutral'
    }, t.status), t.progress < 100 && /*#__PURE__*/React.createElement(IconButton, {
      icon: "check",
      label: "Concluir",
      size: 34,
      onClick: () => done(t.id)
    })), /*#__PURE__*/React.createElement(ProgressPill, {
      label: t.title,
      value: t.progress,
      tone: t.tone,
      people: t.people
    }))), list.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '30px 0',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: 14
      }
    }, "Nenhuma tarefa neste filtro."))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: bp === 't' ? '1fr 1fr' : '1fr',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
      title: "Desempenho da",
      subtitle: "Manuten\xE7\xE3o"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: 'var(--text-muted)',
        margin: '12px 0 18px',
        lineHeight: 1.45
      }
    }, "Chamados, prestadores, prazos e andamento dos reparos em um s\xF3 lugar."), /*#__PURE__*/React.createElement(Metric, {
      value: "92%",
      label: "Resolvidas no prazo",
      size: "lg"
    })), /*#__PURE__*/React.createElement(Card, {
      tone: "dark"
    }, /*#__PURE__*/React.createElement(CardHeader, {
      inverse: true,
      title: "Chamados",
      subtitle: "abertos"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginTop: 24
      }
    }, /*#__PURE__*/React.createElement(Metric, {
      inverse: true,
      value: tasks.filter(t => t.progress < 100).length,
      label: "em andamento"
    }), /*#__PURE__*/React.createElement(AvatarGroup, {
      people: [{
        name: 'Ana Lima'
      }, {
        name: 'Caio Dias'
      }, {
        name: 'Felipe Sá'
      }, {
        name: 'Gabi Luz'
      }],
      size: 30
    })))));
  }
  window.MaintenanceScreen = MaintenanceScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/MaintenanceScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/PropertiesScreen.jsx
try { (() => {
(function () {
  const {
    Card,
    CardHeader,
    DataTable,
    Badge,
    SegmentedControl,
    Input,
    Button,
    Dialog,
    Metric,
    Chip
  } = window.AlugaDesignSystem_e4b917;
  function PropertiesScreen({
    bp,
    toast
  }) {
    const D = window.ALUGA_DATA;
    const [f, setF] = React.useState('Todos');
    const [q, setQ] = React.useState('');
    const [sel, setSel] = React.useState(null);
    const rows = D.units.filter(u => (f === 'Todos' || u.status === f) && (u.property + u.unit + u.tenant).toLowerCase().includes(q.toLowerCase()));
    const counts = s => D.units.filter(u => u.status === s).length;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: bp === 'm' ? '1fr 1fr' : 'repeat(4,minmax(0,1fr))',
        gap: 14
      }
    }, [['Ocupadas', 'Ocupado', '78%'], ['Livres', 'Livre', '14%'], ['Reservadas', 'Reservado', '3%'], ['Atrasadas', 'Atrasado', '5%']].map(([l, s, p]) => /*#__PURE__*/React.createElement(Card, {
      key: l,
      onClick: () => setF(s),
      padding: 18,
      style: {
        boxShadow: f === s ? 'inset 0 0 0 1.5px var(--brand)' : undefined
      }
    }, /*#__PURE__*/React.createElement(CardHeader, {
      size: "sm",
      title: "Unidades",
      subtitle: l
    }), /*#__PURE__*/React.createElement(Metric, {
      value: p,
      label: counts(s) + (counts(s) === 1 ? ' unidade' : ' unidades'),
      size: "md",
      style: {
        marginTop: 18
      }
    })))), /*#__PURE__*/React.createElement(Card, {
      padding: bp === 'm' ? 14 : 20
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement(CardHeader, {
      title: "Unidades",
      subtitle: rows.length + ' resultados',
      style: {
        marginRight: 'auto'
      }
    }), /*#__PURE__*/React.createElement(Input, {
      icon: "search",
      placeholder: "Filtrar",
      value: q,
      onChange: setQ,
      style: {
        width: bp === 'm' ? '100%' : 220
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        overflowX: 'auto',
        maxWidth: '100%'
      }
    }, /*#__PURE__*/React.createElement(SegmentedControl, {
      size: "sm",
      options: ['Todos', 'Ocupado', 'Livre', 'Reservado', 'Atrasado'],
      value: f,
      onChange: setF
    })), bp !== 'm' && /*#__PURE__*/React.createElement(Button, {
      icon: "plus",
      size: "sm",
      onClick: () => toast({
        tone: 'info',
        title: 'Cadastro de unidade',
        message: 'Formulário aberto em nova aba (demo).'
      })
    }, "Nova unidade")), bp === 'm' ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column'
      }
    }, rows.map(u => /*#__PURE__*/React.createElement("button", {
      key: u.id,
      onClick: () => setSel(u),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '14px 2px',
        border: 0,
        borderTop: '1px solid var(--border-subtle)',
        background: 'none',
        textAlign: 'left',
        font: 'inherit',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: 'var(--text-strong)'
      }
    }, u.property, " \xB7 ", u.unit), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)'
      }
    }, u.tenant)), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'right',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14
      }
    }, window.brl(u.rent)), /*#__PURE__*/React.createElement(Badge, {
      size: "sm",
      dot: true,
      tone: window.STATUS_TONE[u.status]
    }, u.status))))) : /*#__PURE__*/React.createElement(DataTable, {
      onRowClick: setSel,
      columns: [{
        key: 'u',
        label: 'Unidade',
        render: r => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
          style: {
            color: 'var(--text-strong)'
          }
        }, r.property, " \xB7 ", r.unit), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 12,
            color: 'var(--text-muted)'
          }
        }, r.type))
      }, {
        key: 'tenant',
        label: 'Inquilino'
      }, {
        key: 'due',
        label: 'Vencimento'
      }, {
        key: 'rent',
        label: 'Aluguel',
        align: 'right',
        render: r => window.brl(r.rent)
      }, {
        key: 'status',
        label: 'Status',
        render: r => /*#__PURE__*/React.createElement(Badge, {
          size: "sm",
          dot: true,
          tone: window.STATUS_TONE[r.status]
        }, r.status)
      }],
      rows: rows
    })), /*#__PURE__*/React.createElement(Dialog, {
      open: !!sel,
      onClose: () => setSel(null),
      width: 520,
      title: sel ? sel.property + ' · ' + sel.unit : '',
      subtitle: sel ? sel.type : '',
      footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        onClick: () => setSel(null)
      }, "Fechar"), /*#__PURE__*/React.createElement(Button, {
        icon: "file-text",
        onClick: () => {
          setSel(null);
          toast({
            title: 'Contrato enviado',
            message: 'Enviado para assinatura digital.'
          });
        }
      }, "Enviar contrato"))
    }, sel && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 170,
        borderRadius: 22,
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/images/house-orange.png",
      alt: "",
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12
      }
    }, [['Inquilino', sel.tenant], ['Aluguel', window.brl(sel.rent)], ['Vencimento', sel.due], ['Status', /*#__PURE__*/React.createElement(Badge, {
      dot: true,
      tone: window.STATUS_TONE[sel.status]
    }, sel.status)]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
      key: k,
      style: {
        background: 'var(--gray-50)',
        borderRadius: 16,
        padding: '10px 14px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)'
      }
    }, k), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        marginTop: 2
      }
    }, v)))))));
  }
  window.PropertiesScreen = PropertiesScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/PropertiesScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/Shell.jsx
try { (() => {
const {
  SideRail,
  NavPills,
  Input,
  IconButton,
  Avatar,
  Wordmark
} = window.AlugaDesignSystem_e4b917;
function useBreakpoint() {
  const get = () => window.innerWidth < 760 ? 'm' : window.innerWidth < 1180 ? 't' : 'd';
  const [bp, setBp] = React.useState(get);
  React.useEffect(() => {
    const f = () => setBp(get());
    window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, []);
  return bp;
}
const MODULES = [{
  id: 'dash',
  label: 'Painel',
  icon: 'layout-grid'
}, {
  id: 'props',
  label: 'Imóveis',
  icon: 'building-2'
}, {
  id: 'maint',
  label: 'Manutenção',
  icon: 'wrench'
}, {
  id: 'fin',
  label: 'Financeiro',
  icon: 'wallet'
}];
function TopBar({
  bp,
  onLogout
}) {
  const user = window.ALUGA_DATA.user;
  if (bp === 'm') return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '14px 16px 6px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 12,
      background: 'var(--brand)',
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 500,
      fontSize: 18
    }
  }, "A"), /*#__PURE__*/React.createElement(Wordmark, {
    variant: "spaced",
    size: 15
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "message-circle",
    label: "Mensagens",
    dot: true
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "bell",
    label: "Notifica\xE7\xF5es"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    style: {
      border: 0,
      padding: 0,
      background: 'none',
      cursor: 'pointer',
      borderRadius: '50%'
    },
    title: "Sair"
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: user.name,
    size: 40
  })));
  return null;
}
function Shell({
  module,
  setModule,
  view,
  setView,
  onLogout,
  children
}) {
  const bp = useBreakpoint();
  const user = window.ALUGA_DATA.user;
  if (bp === 'm') return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: 'var(--surface-page)',
      paddingBottom: 96
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    bp: "m",
    onLogout: onLogout
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      padding: '10px 16px 16px'
    }
  }, children(bp)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      padding: '10px 16px 18px',
      display: 'flex',
      justifyContent: 'center',
      background: 'linear-gradient(to top,var(--surface-page) 60%,rgba(244,244,248,0))',
      zIndex: 20
    }
  }, /*#__PURE__*/React.createElement(NavPills, {
    compact: true,
    bar: true,
    items: MODULES,
    value: module,
    onChange: setModule,
    style: {
      width: '100%',
      maxWidth: 420
    }
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '88px minmax(0,1fr)',
      minHeight: '100vh',
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 0,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '22px 0 20px',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 14,
      background: 'var(--brand)',
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 500,
      fontSize: 19
    }
  }, "A"), /*#__PURE__*/React.createElement(Wordmark, {
    variant: "spaced",
    size: 9
  })), /*#__PURE__*/React.createElement(SideRail, {
    items: MODULES,
    value: module,
    onChange: setModule,
    style: {
      flex: 1
    },
    footer: /*#__PURE__*/React.createElement(IconButton, {
      icon: "log-out",
      label: "Sair",
      variant: "ghost",
      onClick: onLogout
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '20px 24px 16px 0',
      flexWrap: 'wrap'
    }
  }, module === 'dash' ? /*#__PURE__*/React.createElement(NavPills, {
    items: [{
      id: 'overview',
      label: 'Visão geral',
      icon: 'layout-grid'
    }, {
      id: 'analytics',
      label: 'Análises',
      icon: 'chart-spline'
    }],
    value: view,
    onChange: setView
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      letterSpacing: '-0.01em',
      color: 'var(--text-strong)',
      padding: '0 8px'
    }
  }, MODULES.find(m => m.id === module).label, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--brand)'
    }
  }, ".")), /*#__PURE__*/React.createElement(Input, {
    icon: "search",
    placeholder: "Buscar im\xF3vel, inquilino, contrato\u2026",
    shortcut: "\u2318+K",
    style: {
      flex: 1,
      minWidth: 220,
      maxWidth: 520,
      marginLeft: 'auto'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "message-circle",
    label: "Mensagens",
    dot: true
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "bell",
    label: "Notifica\xE7\xF5es"
  }), bp === 'd' && /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1.2,
      fontSize: 13,
      textAlign: 'right',
      marginLeft: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-strong)'
    }
  }, user.name), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 12
    }
  }, user.role)), /*#__PURE__*/React.createElement(Avatar, {
    name: user.name,
    size: 44
  }))), /*#__PURE__*/React.createElement("main", {
    style: {
      padding: '0 24px 32px 0',
      minWidth: 0
    }
  }, children(bp))));
}
Object.assign(window, {
  Shell,
  useBreakpoint,
  MODULES
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/data.js
try { (() => {
window.ALUGA_DATA = {
  user: {
    name: 'Rodrigo Alves',
    role: 'Administrador'
  },
  units: [{
    id: 'A-402',
    property: 'Ed. Aurora',
    unit: '402',
    type: '2 quartos · 68 m²',
    tenant: 'Marina Costa',
    rent: 3200,
    status: 'Ocupado',
    due: '05/11'
  }, {
    id: 'A-1203',
    property: 'Ed. Aurora',
    unit: '1203',
    type: '3 quartos · 94 m²',
    tenant: '—',
    rent: 4800,
    status: 'Livre',
    due: '—'
  }, {
    id: 'P-118',
    property: 'Residencial Pinheiros',
    unit: '118',
    type: '1 quarto · 42 m²',
    tenant: 'João Pedro Lima',
    rent: 2750,
    status: 'Atrasado',
    due: '28/10'
  }, {
    id: 'P-207',
    property: 'Residencial Pinheiros',
    unit: '207',
    type: 'Studio · 31 m²',
    tenant: 'Carla Mendes',
    rent: 2100,
    status: 'Ocupado',
    due: '10/11'
  }, {
    id: 'J-01',
    property: 'Casa Jardins',
    unit: 'Casa 01',
    type: '4 quartos · 210 m²',
    tenant: 'Família Rocha',
    rent: 9800,
    status: 'Ocupado',
    due: '01/11'
  }, {
    id: 'A-805',
    property: 'Ed. Aurora',
    unit: '805',
    type: '2 quartos · 70 m²',
    tenant: 'Reserva · Lucas F.',
    rent: 3350,
    status: 'Reservado',
    due: '—'
  }, {
    id: 'V-33',
    property: 'Vila Madalena Lofts',
    unit: '33',
    type: 'Loft · 55 m²',
    tenant: 'Beatriz Nunes',
    rent: 3900,
    status: 'Ocupado',
    due: '15/11'
  }],
  tasks: [{
    id: 1,
    title: 'Vistoria do ar-condicionado',
    where: 'Ed. Aurora · 402',
    progress: 100,
    tone: 'dark',
    people: [{
      name: 'Ana Lima'
    }, {
      name: 'Bruno Reis'
    }],
    status: 'Concluída',
    due: '20/10'
  }, {
    id: 2,
    title: 'Revisão do elevador',
    where: 'Ed. Aurora · bloco B',
    progress: 67,
    tone: 'light',
    people: [{
      name: 'Caio Dias'
    }, {
      name: 'Duda Melo'
    }, {
      name: 'Enzo Paz'
    }],
    status: 'Em andamento',
    due: '26/10'
  }, {
    id: 3,
    title: 'Reparo hidráulico',
    where: 'Pinheiros · 118',
    progress: 43,
    tone: 'brand',
    people: [{
      name: 'Felipe Sá'
    }],
    status: 'Urgente',
    due: '24/10'
  }, {
    id: 4,
    title: 'Pintura da fachada',
    where: 'Casa Jardins',
    progress: 20,
    tone: 'light',
    people: [{
      name: 'Gabi Luz'
    }],
    status: 'Agendada',
    due: '04/11'
  }],
  payments: [{
    id: 1,
    who: 'Marina Costa',
    unit: 'Aurora · 402',
    value: 3200,
    date: '05/11',
    status: 'A vencer'
  }, {
    id: 2,
    who: 'João Pedro Lima',
    unit: 'Pinheiros · 118',
    value: 2750,
    date: '28/10',
    status: 'Atrasado'
  }, {
    id: 3,
    who: 'Família Rocha',
    unit: 'Jardins · Casa 01',
    value: 9800,
    date: '01/10',
    status: 'Pago'
  }, {
    id: 4,
    who: 'Carla Mendes',
    unit: 'Pinheiros · 207',
    value: 2100,
    date: '10/10',
    status: 'Pago'
  }, {
    id: 5,
    who: 'Beatriz Nunes',
    unit: 'Vila Madalena · 33',
    value: 3900,
    date: '15/10',
    status: 'Pago'
  }],
  revenue: {
    Dia: [10.4, 12.1, 11.2, 16.4, 23.6, 15.2, 18.4, 14.4, 17.9],
    Semana: [84, 92, 88, 101, 118, 109, 124, 116, 121],
    'Mês': [310, 342, 356, 371, 388, 402, 431, 447, 468]
  },
  visitors: {
    a: [3, 2.6, 4.2, 5.1, 4.9, 6.8, 8.1, 7.6, 9.4, 10.8],
    b: [1, 1.2, 1.1, 2.4, 2.2, 3.1, 3.6, 3.4, 4.6, 5.4]
  }
};
window.brl = v => 'R$ ' + Number(v).toLocaleString('pt-BR');
window.STATUS_TONE = {
  'Ocupado': 'success',
  'Pago': 'success',
  'Concluída': 'success',
  'Livre': 'neutral',
  'Reservado': 'soft',
  'Atrasado': 'danger',
  'Urgente': 'danger',
  'A vencer': 'warning',
  'Em andamento': 'warning',
  'Agendada': 'neutral'
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.AvatarGroup = __ds_scope.AvatarGroup;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.BarChart = __ds_scope.BarChart;

__ds_ns.Legend = __ds_scope.Legend;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardHeader = __ds_scope.CardHeader;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.HeatScale = __ds_scope.HeatScale;

__ds_ns.LineChart = __ds_scope.LineChart;

__ds_ns.Metric = __ds_scope.Metric;

__ds_ns.ProgressPill = __ds_scope.ProgressPill;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.NavPills = __ds_scope.NavPills;

__ds_ns.SideRail = __ds_scope.SideRail;

})();
