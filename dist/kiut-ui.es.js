import { defineComponent as J, shallowRef as Ro, h as $s, ref as at, onMounted as ee, onUnmounted as Pe, watch as Ft, toRaw as Ms, nextTick as St, version as Gi, isProxy as Eo, computed as C, toRef as rt, openBlock as y, createElementBlock as x, createVNode as Q, unref as L, normalizeStyle as ft, createElementVNode as l, toDisplayString as $, createCommentVNode as I, Fragment as K, renderList as tt, onBeforeUnmount as Oo, createStaticVNode as st, withDirectives as Yt, vShow as la, normalizeClass as q, createBlock as dt, createTextVNode as xt, resolveDynamicComponent as ca, Transition as Is, withCtx as ze, renderSlot as Rt, useSlots as zo, Teleport as Rs, withModifiers as te, withKeys as Ra, vModelText as Te, useAttrs as Vo, mergeProps as Ss } from "vue";
import * as sn from "echarts/core";
import { TooltipComponent as Zi, TitleComponent as Qi } from "echarts/components";
import { SankeyChart as Ji } from "echarts/charts";
import { CanvasRenderer as tr } from "echarts/renderers";
import Dt from "moment";
function ma(e) {
  return e + 0.5 | 0;
}
const pe = (e, t, a) => Math.max(Math.min(e, a), t);
function ea(e) {
  return pe(ma(e * 2.55), 0, 255);
}
function me(e) {
  return pe(ma(e * 255), 0, 255);
}
function oe(e) {
  return pe(ma(e / 2.55) / 100, 0, 1);
}
function nn(e) {
  return pe(ma(e * 100), 0, 100);
}
const Ht = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Cs = [..."0123456789ABCDEF"], er = (e) => Cs[e & 15], ar = (e) => Cs[(e & 240) >> 4] + Cs[e & 15], _a = (e) => (e & 240) >> 4 === (e & 15), sr = (e) => _a(e.r) && _a(e.g) && _a(e.b) && _a(e.a);
function nr(e) {
  var t = e.length, a;
  return e[0] === "#" && (t === 4 || t === 5 ? a = {
    r: 255 & Ht[e[1]] * 17,
    g: 255 & Ht[e[2]] * 17,
    b: 255 & Ht[e[3]] * 17,
    a: t === 5 ? Ht[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (a = {
    r: Ht[e[1]] << 4 | Ht[e[2]],
    g: Ht[e[3]] << 4 | Ht[e[4]],
    b: Ht[e[5]] << 4 | Ht[e[6]],
    a: t === 9 ? Ht[e[7]] << 4 | Ht[e[8]] : 255
  })), a;
}
const or = (e, t) => e < 255 ? t(e) : "";
function ir(e) {
  var t = sr(e) ? er : ar;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + or(e.a, t) : void 0;
}
const rr = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function No(e, t, a) {
  const s = t * Math.min(a, 1 - a), n = (o, i = (o + e / 30) % 12) => a - s * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [n(0), n(8), n(4)];
}
function lr(e, t, a) {
  const s = (n, o = (n + e / 60) % 6) => a - a * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [s(5), s(3), s(1)];
}
function cr(e, t, a) {
  const s = No(e, 1, 0.5);
  let n;
  for (t + a > 1 && (n = 1 / (t + a), t *= n, a *= n), n = 0; n < 3; n++)
    s[n] *= 1 - t - a, s[n] += t;
  return s;
}
function dr(e, t, a, s, n) {
  return e === n ? (t - a) / s + (t < a ? 6 : 0) : t === n ? (a - e) / s + 2 : (e - t) / s + 4;
}
function Es(e) {
  const a = e.r / 255, s = e.g / 255, n = e.b / 255, o = Math.max(a, s, n), i = Math.min(a, s, n), r = (o + i) / 2;
  let c, d, u;
  return o !== i && (u = o - i, d = r > 0.5 ? u / (2 - o - i) : u / (o + i), c = dr(a, s, n, u, o), c = c * 60 + 0.5), [c | 0, d || 0, r];
}
function Os(e, t, a, s) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, a, s)).map(me);
}
function zs(e, t, a) {
  return Os(No, e, t, a);
}
function ur(e, t, a) {
  return Os(cr, e, t, a);
}
function hr(e, t, a) {
  return Os(lr, e, t, a);
}
function Wo(e) {
  return (e % 360 + 360) % 360;
}
function fr(e) {
  const t = rr.exec(e);
  let a = 255, s;
  if (!t)
    return;
  t[5] !== s && (a = t[6] ? ea(+t[5]) : me(+t[5]));
  const n = Wo(+t[2]), o = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? s = ur(n, o, i) : t[1] === "hsv" ? s = hr(n, o, i) : s = zs(n, o, i), {
    r: s[0],
    g: s[1],
    b: s[2],
    a
  };
}
function gr(e, t) {
  var a = Es(e);
  a[0] = Wo(a[0] + t), a = zs(a), e.r = a[0], e.g = a[1], e.b = a[2];
}
function pr(e) {
  if (!e)
    return;
  const t = Es(e), a = t[0], s = nn(t[1]), n = nn(t[2]);
  return e.a < 255 ? `hsla(${a}, ${s}%, ${n}%, ${oe(e.a)})` : `hsl(${a}, ${s}%, ${n}%)`;
}
const on = {
  x: "dark",
  Z: "light",
  Y: "re",
  X: "blu",
  W: "gr",
  V: "medium",
  U: "slate",
  A: "ee",
  T: "ol",
  S: "or",
  B: "ra",
  C: "lateg",
  D: "ights",
  R: "in",
  Q: "turquois",
  E: "hi",
  P: "ro",
  O: "al",
  N: "le",
  M: "de",
  L: "yello",
  F: "en",
  K: "ch",
  G: "arks",
  H: "ea",
  I: "ightg",
  J: "wh"
}, rn = {
  OiceXe: "f0f8ff",
  antiquewEte: "faebd7",
  aqua: "ffff",
  aquamarRe: "7fffd4",
  azuY: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "0",
  blanKedOmond: "ffebcd",
  Xe: "ff",
  XeviTet: "8a2be2",
  bPwn: "a52a2a",
  burlywood: "deb887",
  caMtXe: "5f9ea0",
  KartYuse: "7fff00",
  KocTate: "d2691e",
  cSO: "ff7f50",
  cSnflowerXe: "6495ed",
  cSnsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "ffff",
  xXe: "8b",
  xcyan: "8b8b",
  xgTMnPd: "b8860b",
  xWay: "a9a9a9",
  xgYF: "6400",
  xgYy: "a9a9a9",
  xkhaki: "bdb76b",
  xmagFta: "8b008b",
  xTivegYF: "556b2f",
  xSange: "ff8c00",
  xScEd: "9932cc",
  xYd: "8b0000",
  xsOmon: "e9967a",
  xsHgYF: "8fbc8f",
  xUXe: "483d8b",
  xUWay: "2f4f4f",
  xUgYy: "2f4f4f",
  xQe: "ced1",
  xviTet: "9400d3",
  dAppRk: "ff1493",
  dApskyXe: "bfff",
  dimWay: "696969",
  dimgYy: "696969",
  dodgerXe: "1e90ff",
  fiYbrick: "b22222",
  flSOwEte: "fffaf0",
  foYstWAn: "228b22",
  fuKsia: "ff00ff",
  gaRsbSo: "dcdcdc",
  ghostwEte: "f8f8ff",
  gTd: "ffd700",
  gTMnPd: "daa520",
  Way: "808080",
  gYF: "8000",
  gYFLw: "adff2f",
  gYy: "808080",
  honeyMw: "f0fff0",
  hotpRk: "ff69b4",
  RdianYd: "cd5c5c",
  Rdigo: "4b0082",
  ivSy: "fffff0",
  khaki: "f0e68c",
  lavFMr: "e6e6fa",
  lavFMrXsh: "fff0f5",
  lawngYF: "7cfc00",
  NmoncEffon: "fffacd",
  ZXe: "add8e6",
  ZcSO: "f08080",
  Zcyan: "e0ffff",
  ZgTMnPdLw: "fafad2",
  ZWay: "d3d3d3",
  ZgYF: "90ee90",
  ZgYy: "d3d3d3",
  ZpRk: "ffb6c1",
  ZsOmon: "ffa07a",
  ZsHgYF: "20b2aa",
  ZskyXe: "87cefa",
  ZUWay: "778899",
  ZUgYy: "778899",
  ZstAlXe: "b0c4de",
  ZLw: "ffffe0",
  lime: "ff00",
  limegYF: "32cd32",
  lRF: "faf0e6",
  magFta: "ff00ff",
  maPon: "800000",
  VaquamarRe: "66cdaa",
  VXe: "cd",
  VScEd: "ba55d3",
  VpurpN: "9370db",
  VsHgYF: "3cb371",
  VUXe: "7b68ee",
  VsprRggYF: "fa9a",
  VQe: "48d1cc",
  VviTetYd: "c71585",
  midnightXe: "191970",
  mRtcYam: "f5fffa",
  mistyPse: "ffe4e1",
  moccasR: "ffe4b5",
  navajowEte: "ffdead",
  navy: "80",
  Tdlace: "fdf5e6",
  Tive: "808000",
  TivedBb: "6b8e23",
  Sange: "ffa500",
  SangeYd: "ff4500",
  ScEd: "da70d6",
  pOegTMnPd: "eee8aa",
  pOegYF: "98fb98",
  pOeQe: "afeeee",
  pOeviTetYd: "db7093",
  papayawEp: "ffefd5",
  pHKpuff: "ffdab9",
  peru: "cd853f",
  pRk: "ffc0cb",
  plum: "dda0dd",
  powMrXe: "b0e0e6",
  purpN: "800080",
  YbeccapurpN: "663399",
  Yd: "ff0000",
  Psybrown: "bc8f8f",
  PyOXe: "4169e1",
  saddNbPwn: "8b4513",
  sOmon: "fa8072",
  sandybPwn: "f4a460",
  sHgYF: "2e8b57",
  sHshell: "fff5ee",
  siFna: "a0522d",
  silver: "c0c0c0",
  skyXe: "87ceeb",
  UXe: "6a5acd",
  UWay: "708090",
  UgYy: "708090",
  snow: "fffafa",
  sprRggYF: "ff7f",
  stAlXe: "4682b4",
  tan: "d2b48c",
  teO: "8080",
  tEstN: "d8bfd8",
  tomato: "ff6347",
  Qe: "40e0d0",
  viTet: "ee82ee",
  JHt: "f5deb3",
  wEte: "ffffff",
  wEtesmoke: "f5f5f5",
  Lw: "ffff00",
  LwgYF: "9acd32"
};
function vr() {
  const e = {}, t = Object.keys(rn), a = Object.keys(on);
  let s, n, o, i, r;
  for (s = 0; s < t.length; s++) {
    for (i = r = t[s], n = 0; n < a.length; n++)
      o = a[n], r = r.replace(o, on[o]);
    o = parseInt(rn[i], 16), e[r] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return e;
}
let xa;
function br(e) {
  xa || (xa = vr(), xa.transparent = [0, 0, 0, 0]);
  const t = xa[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const mr = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function yr(e) {
  const t = mr.exec(e);
  let a = 255, s, n, o;
  if (t) {
    if (t[7] !== s) {
      const i = +t[7];
      a = t[8] ? ea(i) : pe(i * 255, 0, 255);
    }
    return s = +t[1], n = +t[3], o = +t[5], s = 255 & (t[2] ? ea(s) : pe(s, 0, 255)), n = 255 & (t[4] ? ea(n) : pe(n, 0, 255)), o = 255 & (t[6] ? ea(o) : pe(o, 0, 255)), {
      r: s,
      g: n,
      b: o,
      a
    };
  }
}
function _r(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${oe(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const ts = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, Re = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function xr(e, t, a) {
  const s = Re(oe(e.r)), n = Re(oe(e.g)), o = Re(oe(e.b));
  return {
    r: me(ts(s + a * (Re(oe(t.r)) - s))),
    g: me(ts(n + a * (Re(oe(t.g)) - n))),
    b: me(ts(o + a * (Re(oe(t.b)) - o))),
    a: e.a + a * (t.a - e.a)
  };
}
function ka(e, t, a) {
  if (e) {
    let s = Es(e);
    s[t] = Math.max(0, Math.min(s[t] + s[t] * a, t === 0 ? 360 : 1)), s = zs(s), e.r = s[0], e.g = s[1], e.b = s[2];
  }
}
function Ho(e, t) {
  return e && Object.assign(t || {}, e);
}
function ln(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = me(e[3]))) : (t = Ho(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = me(t.a)), t;
}
function kr(e) {
  return e.charAt(0) === "r" ? yr(e) : fr(e);
}
class da {
  constructor(t) {
    if (t instanceof da)
      return t;
    const a = typeof t;
    let s;
    a === "object" ? s = ln(t) : a === "string" && (s = nr(t) || br(t) || kr(t)), this._rgb = s, this._valid = !!s;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Ho(this._rgb);
    return t && (t.a = oe(t.a)), t;
  }
  set rgb(t) {
    this._rgb = ln(t);
  }
  rgbString() {
    return this._valid ? _r(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? ir(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? pr(this._rgb) : void 0;
  }
  mix(t, a) {
    if (t) {
      const s = this.rgb, n = t.rgb;
      let o;
      const i = a === o ? 0.5 : a, r = 2 * i - 1, c = s.a - n.a, d = ((r * c === -1 ? r : (r + c) / (1 + r * c)) + 1) / 2;
      o = 1 - d, s.r = 255 & d * s.r + o * n.r + 0.5, s.g = 255 & d * s.g + o * n.g + 0.5, s.b = 255 & d * s.b + o * n.b + 0.5, s.a = i * s.a + (1 - i) * n.a, this.rgb = s;
    }
    return this;
  }
  interpolate(t, a) {
    return t && (this._rgb = xr(this._rgb, t._rgb, a)), this;
  }
  clone() {
    return new da(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = me(t), this;
  }
  clearer(t) {
    const a = this._rgb;
    return a.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, a = ma(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
    return t.r = t.g = t.b = a, this;
  }
  opaquer(t) {
    const a = this._rgb;
    return a.a *= 1 + t, this;
  }
  negate() {
    const t = this._rgb;
    return t.r = 255 - t.r, t.g = 255 - t.g, t.b = 255 - t.b, this;
  }
  lighten(t) {
    return ka(this._rgb, 2, t), this;
  }
  darken(t) {
    return ka(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return ka(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return ka(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return gr(this._rgb, t), this;
  }
}
function ae() {
}
const wr = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function pt(e) {
  return e == null;
}
function Mt(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function ht(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function Pt(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function Xt(e, t) {
  return Pt(e) ? e : t;
}
function it(e, t) {
  return typeof e > "u" ? t : e;
}
const $r = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, jo = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function yt(e, t, a) {
  if (e && typeof e.call == "function")
    return e.apply(a, t);
}
function vt(e, t, a, s) {
  let n, o, i;
  if (Mt(e))
    for (o = e.length, n = 0; n < o; n++)
      t.call(a, e[n], n);
  else if (ht(e))
    for (i = Object.keys(e), o = i.length, n = 0; n < o; n++)
      t.call(a, e[i[n]], i[n]);
}
function Ea(e, t) {
  let a, s, n, o;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (a = 0, s = e.length; a < s; ++a)
    if (n = e[a], o = t[a], n.datasetIndex !== o.datasetIndex || n.index !== o.index)
      return !1;
  return !0;
}
function Oa(e) {
  if (Mt(e))
    return e.map(Oa);
  if (ht(e)) {
    const t = /* @__PURE__ */ Object.create(null), a = Object.keys(e), s = a.length;
    let n = 0;
    for (; n < s; ++n)
      t[a[n]] = Oa(e[a[n]]);
    return t;
  }
  return e;
}
function Yo(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function Mr(e, t, a, s) {
  if (!Yo(e))
    return;
  const n = t[e], o = a[e];
  ht(n) && ht(o) ? ua(n, o, s) : t[e] = Oa(o);
}
function ua(e, t, a) {
  const s = Mt(t) ? t : [
    t
  ], n = s.length;
  if (!ht(e))
    return e;
  a = a || {};
  const o = a.merger || Mr;
  let i;
  for (let r = 0; r < n; ++r) {
    if (i = s[r], !ht(i))
      continue;
    const c = Object.keys(i);
    for (let d = 0, u = c.length; d < u; ++d)
      o(c[d], e, i, a);
  }
  return e;
}
function na(e, t) {
  return ua(e, t, {
    merger: Sr
  });
}
function Sr(e, t, a) {
  if (!Yo(e))
    return;
  const s = t[e], n = a[e];
  ht(s) && ht(n) ? na(s, n) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = Oa(n));
}
const cn = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function Cr(e) {
  const t = e.split("."), a = [];
  let s = "";
  for (const n of t)
    s += n, s.endsWith("\\") ? s = s.slice(0, -1) + "." : (a.push(s), s = "");
  return a;
}
function Dr(e) {
  const t = Cr(e);
  return (a) => {
    for (const s of t) {
      if (s === "")
        break;
      a = a && a[s];
    }
    return a;
  };
}
function Le(e, t) {
  return (cn[t] || (cn[t] = Dr(t)))(e);
}
function Vs(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const ha = (e) => typeof e < "u", ye = (e) => typeof e == "function", dn = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const a of e)
    if (!t.has(a))
      return !1;
  return !0;
};
function Ar(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const mt = Math.PI, _t = 2 * mt, Tr = _t + mt, za = Number.POSITIVE_INFINITY, Br = mt / 180, Ct = mt / 2, we = mt / 4, un = mt * 2 / 3, qo = Math.log10, Jt = Math.sign;
function oa(e, t, a) {
  return Math.abs(e - t) < a;
}
function hn(e) {
  const t = Math.round(e);
  e = oa(e, t, e / 1e3) ? t : e;
  const a = Math.pow(10, Math.floor(qo(e))), s = e / a;
  return (s <= 1 ? 1 : s <= 2 ? 2 : s <= 5 ? 5 : 10) * a;
}
function Lr(e) {
  const t = [], a = Math.sqrt(e);
  let s;
  for (s = 1; s < a; s++)
    e % s === 0 && (t.push(s), t.push(e / s));
  return a === (a | 0) && t.push(a), t.sort((n, o) => n - o).pop(), t;
}
function Fr(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function fa(e) {
  return !Fr(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Pr(e, t) {
  const a = Math.round(e);
  return a - t <= e && a + t >= e;
}
function Ir(e, t, a) {
  let s, n, o;
  for (s = 0, n = e.length; s < n; s++)
    o = e[s][a], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function ie(e) {
  return e * (mt / 180);
}
function Rr(e) {
  return e * (180 / mt);
}
function fn(e) {
  if (!Pt(e))
    return;
  let t = 1, a = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, a++;
  return a;
}
function Uo(e, t) {
  const a = t.x - e.x, s = t.y - e.y, n = Math.sqrt(a * a + s * s);
  let o = Math.atan2(s, a);
  return o < -0.5 * mt && (o += _t), {
    angle: o,
    distance: n
  };
}
function Ds(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function Er(e, t) {
  return (e - t + Tr) % _t - mt;
}
function Wt(e) {
  return (e % _t + _t) % _t;
}
function ga(e, t, a, s) {
  const n = Wt(e), o = Wt(t), i = Wt(a), r = Wt(o - n), c = Wt(i - n), d = Wt(n - o), u = Wt(n - i);
  return n === o || n === i || s && o === i || r > c && d < u;
}
function Bt(e, t, a) {
  return Math.max(t, Math.min(a, e));
}
function Or(e) {
  return Bt(e, -32768, 32767);
}
function re(e, t, a, s = 1e-6) {
  return e >= Math.min(t, a) - s && e <= Math.max(t, a) + s;
}
function Ns(e, t, a) {
  a = a || ((i) => e[i] < t);
  let s = e.length - 1, n = 0, o;
  for (; s - n > 1; )
    o = n + s >> 1, a(o) ? n = o : s = o;
  return {
    lo: n,
    hi: s
  };
}
const Ae = (e, t, a, s) => Ns(e, a, s ? (n) => {
  const o = e[n][t];
  return o < a || o === a && e[n + 1][t] === a;
} : (n) => e[n][t] < a), zr = (e, t, a) => Ns(e, a, (s) => e[s][t] >= a);
function Vr(e, t, a) {
  let s = 0, n = e.length;
  for (; s < n && e[s] < t; )
    s++;
  for (; n > s && e[n - 1] > a; )
    n--;
  return s > 0 || n < e.length ? e.slice(s, n) : e;
}
const Ko = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function Nr(e, t) {
  if (e._chartjs) {
    e._chartjs.listeners.push(t);
    return;
  }
  Object.defineProperty(e, "_chartjs", {
    configurable: !0,
    enumerable: !1,
    value: {
      listeners: [
        t
      ]
    }
  }), Ko.forEach((a) => {
    const s = "_onData" + Vs(a), n = e[a];
    Object.defineProperty(e, a, {
      configurable: !0,
      enumerable: !1,
      value(...o) {
        const i = n.apply(this, o);
        return e._chartjs.listeners.forEach((r) => {
          typeof r[s] == "function" && r[s](...o);
        }), i;
      }
    });
  });
}
function gn(e, t) {
  const a = e._chartjs;
  if (!a)
    return;
  const s = a.listeners, n = s.indexOf(t);
  n !== -1 && s.splice(n, 1), !(s.length > 0) && (Ko.forEach((o) => {
    delete e[o];
  }), delete e._chartjs);
}
function Xo(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const Go = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function Zo(e, t) {
  let a = [], s = !1;
  return function(...n) {
    a = n, s || (s = !0, Go.call(window, () => {
      s = !1, e.apply(t, a);
    }));
  };
}
function Wr(e, t) {
  let a;
  return function(...s) {
    return t ? (clearTimeout(a), a = setTimeout(e, t, s)) : e.apply(this, s), t;
  };
}
const Ws = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", Tt = (e, t, a) => e === "start" ? t : e === "end" ? a : (t + a) / 2, Hr = (e, t, a, s) => e === (s ? "left" : "right") ? a : e === "center" ? (t + a) / 2 : t;
function jr(e, t, a) {
  const s = t.length;
  let n = 0, o = s;
  if (e._sorted) {
    const { iScale: i, vScale: r, _parsed: c } = e, d = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, u = i.axis, { min: h, max: p, minDefined: v, maxDefined: f } = i.getUserBounds();
    if (v) {
      if (n = Math.min(
        // @ts-expect-error Need to type _parsed
        Ae(c, u, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? s : Ae(t, u, i.getPixelForValue(h)).lo
      ), d) {
        const m = c.slice(0, n + 1).reverse().findIndex((_) => !pt(_[r.axis]));
        n -= Math.max(0, m);
      }
      n = Bt(n, 0, s - 1);
    }
    if (f) {
      let m = Math.max(
        // @ts-expect-error Need to type _parsed
        Ae(c, i.axis, p, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? 0 : Ae(t, u, i.getPixelForValue(p), !0).hi + 1
      );
      if (d) {
        const _ = c.slice(m - 1).findIndex((g) => !pt(g[r.axis]));
        m += Math.max(0, _);
      }
      o = Bt(m, n, s) - n;
    } else
      o = s - n;
  }
  return {
    start: n,
    count: o
  };
}
function Yr(e) {
  const { xScale: t, yScale: a, _scaleRanges: s } = e, n = {
    xmin: t.min,
    xmax: t.max,
    ymin: a.min,
    ymax: a.max
  };
  if (!s)
    return e._scaleRanges = n, !0;
  const o = s.xmin !== t.min || s.xmax !== t.max || s.ymin !== a.min || s.ymax !== a.max;
  return Object.assign(s, n), o;
}
const wa = (e) => e === 0 || e === 1, pn = (e, t, a) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * _t / a)), vn = (e, t, a) => Math.pow(2, -10 * e) * Math.sin((e - t) * _t / a) + 1, ia = {
  linear: (e) => e,
  easeInQuad: (e) => e * e,
  easeOutQuad: (e) => -e * (e - 2),
  easeInOutQuad: (e) => (e /= 0.5) < 1 ? 0.5 * e * e : -0.5 * (--e * (e - 2) - 1),
  easeInCubic: (e) => e * e * e,
  easeOutCubic: (e) => (e -= 1) * e * e + 1,
  easeInOutCubic: (e) => (e /= 0.5) < 1 ? 0.5 * e * e * e : 0.5 * ((e -= 2) * e * e + 2),
  easeInQuart: (e) => e * e * e * e,
  easeOutQuart: (e) => -((e -= 1) * e * e * e - 1),
  easeInOutQuart: (e) => (e /= 0.5) < 1 ? 0.5 * e * e * e * e : -0.5 * ((e -= 2) * e * e * e - 2),
  easeInQuint: (e) => e * e * e * e * e,
  easeOutQuint: (e) => (e -= 1) * e * e * e * e + 1,
  easeInOutQuint: (e) => (e /= 0.5) < 1 ? 0.5 * e * e * e * e * e : 0.5 * ((e -= 2) * e * e * e * e + 2),
  easeInSine: (e) => -Math.cos(e * Ct) + 1,
  easeOutSine: (e) => Math.sin(e * Ct),
  easeInOutSine: (e) => -0.5 * (Math.cos(mt * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => wa(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => wa(e) ? e : pn(e, 0.075, 0.3),
  easeOutElastic: (e) => wa(e) ? e : vn(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return wa(e) ? e : e < 0.5 ? 0.5 * pn(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * vn(e * 2 - 1, 0.1125, 0.45);
  },
  easeInBack(e) {
    return e * e * ((1.70158 + 1) * e - 1.70158);
  },
  easeOutBack(e) {
    return (e -= 1) * e * ((1.70158 + 1) * e + 1.70158) + 1;
  },
  easeInOutBack(e) {
    let t = 1.70158;
    return (e /= 0.5) < 1 ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t)) : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  },
  easeInBounce: (e) => 1 - ia.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? ia.easeInBounce(e * 2) * 0.5 : ia.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function Hs(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function bn(e) {
  return Hs(e) ? e : new da(e);
}
function es(e) {
  return Hs(e) ? e : new da(e).saturate(0.5).darken(0.1).hexString();
}
const qr = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], Ur = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Kr(e) {
  e.set("animation", {
    delay: void 0,
    duration: 1e3,
    easing: "easeOutQuart",
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0
  }), e.describe("animation", {
    _fallback: !1,
    _indexable: !1,
    _scriptable: (t) => t !== "onProgress" && t !== "onComplete" && t !== "fn"
  }), e.set("animations", {
    colors: {
      type: "color",
      properties: Ur
    },
    numbers: {
      type: "number",
      properties: qr
    }
  }), e.describe("animations", {
    _fallback: "animation"
  }), e.set("transitions", {
    active: {
      animation: {
        duration: 400
      }
    },
    resize: {
      animation: {
        duration: 0
      }
    },
    show: {
      animations: {
        colors: {
          from: "transparent"
        },
        visible: {
          type: "boolean",
          duration: 0
        }
      }
    },
    hide: {
      animations: {
        colors: {
          to: "transparent"
        },
        visible: {
          type: "boolean",
          easing: "linear",
          fn: (t) => t | 0
        }
      }
    }
  });
}
function Xr(e) {
  e.set("layout", {
    autoPadding: !0,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
}
const mn = /* @__PURE__ */ new Map();
function Gr(e, t) {
  t = t || {};
  const a = e + JSON.stringify(t);
  let s = mn.get(a);
  return s || (s = new Intl.NumberFormat(e, t), mn.set(a, s)), s;
}
function js(e, t, a) {
  return Gr(t, a).format(e);
}
const Zr = {
  values(e) {
    return Mt(e) ? e : "" + e;
  },
  numeric(e, t, a) {
    if (e === 0)
      return "0";
    const s = this.chart.options.locale;
    let n, o = e;
    if (a.length > 1) {
      const d = Math.max(Math.abs(a[0].value), Math.abs(a[a.length - 1].value));
      (d < 1e-4 || d > 1e15) && (n = "scientific"), o = Qr(e, a);
    }
    const i = qo(Math.abs(o)), r = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), c = {
      notation: n,
      minimumFractionDigits: r,
      maximumFractionDigits: r
    };
    return Object.assign(c, this.options.ticks.format), js(e, s, c);
  }
};
function Qr(e, t) {
  let a = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(a) >= 1 && e !== Math.floor(e) && (a = e - Math.floor(e)), a;
}
var Qo = {
  formatters: Zr
};
function Jr(e) {
  e.set("scale", {
    display: !0,
    offset: !1,
    reverse: !1,
    beginAtZero: !1,
    bounds: "ticks",
    clip: !0,
    grace: 0,
    grid: {
      display: !0,
      lineWidth: 1,
      drawOnChartArea: !0,
      drawTicks: !0,
      tickLength: 8,
      tickWidth: (t, a) => a.lineWidth,
      tickColor: (t, a) => a.color,
      offset: !1
    },
    border: {
      display: !0,
      dash: [],
      dashOffset: 0,
      width: 1
    },
    title: {
      display: !1,
      text: "",
      padding: {
        top: 4,
        bottom: 4
      }
    },
    ticks: {
      minRotation: 0,
      maxRotation: 50,
      mirror: !1,
      textStrokeWidth: 0,
      textStrokeColor: "",
      padding: 3,
      display: !0,
      autoSkip: !0,
      autoSkipPadding: 3,
      labelOffset: 0,
      callback: Qo.formatters.values,
      minor: {},
      major: {},
      align: "center",
      crossAlign: "near",
      showLabelBackdrop: !1,
      backdropColor: "rgba(255, 255, 255, 0.75)",
      backdropPadding: 2
    }
  }), e.route("scale.ticks", "color", "", "color"), e.route("scale.grid", "color", "", "borderColor"), e.route("scale.border", "color", "", "borderColor"), e.route("scale.title", "color", "", "color"), e.describe("scale", {
    _fallback: !1,
    _scriptable: (t) => !t.startsWith("before") && !t.startsWith("after") && t !== "callback" && t !== "parser",
    _indexable: (t) => t !== "borderDash" && t !== "tickBorderDash" && t !== "dash"
  }), e.describe("scales", {
    _fallback: "scale"
  }), e.describe("scale.ticks", {
    _scriptable: (t) => t !== "backdropPadding" && t !== "callback",
    _indexable: (t) => t !== "backdropPadding"
  });
}
const Fe = /* @__PURE__ */ Object.create(null), As = /* @__PURE__ */ Object.create(null);
function ra(e, t) {
  if (!t)
    return e;
  const a = t.split(".");
  for (let s = 0, n = a.length; s < n; ++s) {
    const o = a[s];
    e = e[o] || (e[o] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function as(e, t, a) {
  return typeof t == "string" ? ua(ra(e, t), a) : ua(ra(e, ""), t);
}
class tl {
  constructor(t, a) {
    this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (s) => s.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
      "mousemove",
      "mouseout",
      "click",
      "touchstart",
      "touchmove"
    ], this.font = {
      family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      size: 12,
      style: "normal",
      lineHeight: 1.2,
      weight: null
    }, this.hover = {}, this.hoverBackgroundColor = (s, n) => es(n.backgroundColor), this.hoverBorderColor = (s, n) => es(n.borderColor), this.hoverColor = (s, n) => es(n.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(a);
  }
  set(t, a) {
    return as(this, t, a);
  }
  get(t) {
    return ra(this, t);
  }
  describe(t, a) {
    return as(As, t, a);
  }
  override(t, a) {
    return as(Fe, t, a);
  }
  route(t, a, s, n) {
    const o = ra(this, t), i = ra(this, s), r = "_" + a;
    Object.defineProperties(o, {
      [r]: {
        value: o[a],
        writable: !0
      },
      [a]: {
        enumerable: !0,
        get() {
          const c = this[r], d = i[n];
          return ht(c) ? Object.assign({}, d, c) : it(c, d);
        },
        set(c) {
          this[r] = c;
        }
      }
    });
  }
  apply(t) {
    t.forEach((a) => a(this));
  }
}
var $t = /* @__PURE__ */ new tl({
  _scriptable: (e) => !e.startsWith("on"),
  _indexable: (e) => e !== "events",
  hover: {
    _fallback: "interaction"
  },
  interaction: {
    _scriptable: !1,
    _indexable: !1
  }
}, [
  Kr,
  Xr,
  Jr
]);
function el(e) {
  return !e || pt(e.size) || pt(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function yn(e, t, a, s, n) {
  let o = t[n];
  return o || (o = t[n] = e.measureText(n).width, a.push(n)), o > s && (s = o), s;
}
function $e(e, t, a) {
  const s = e.currentDevicePixelRatio, n = a !== 0 ? Math.max(a / 2, 0.5) : 0;
  return Math.round((t - n) * s) / s + n;
}
function _n(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Ts(e, t, a, s) {
  Jo(e, t, a, s, null);
}
function Jo(e, t, a, s, n) {
  let o, i, r, c, d, u, h, p;
  const v = t.pointStyle, f = t.rotation, m = t.radius;
  let _ = (f || 0) * Br;
  if (v && typeof v == "object" && (o = v.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(a, s), e.rotate(_), e.drawImage(v, -v.width / 2, -v.height / 2, v.width, v.height), e.restore();
    return;
  }
  if (!(isNaN(m) || m <= 0)) {
    switch (e.beginPath(), v) {
      // Default includes circle
      default:
        n ? e.ellipse(a, s, n / 2, m, 0, 0, _t) : e.arc(a, s, m, 0, _t), e.closePath();
        break;
      case "triangle":
        u = n ? n / 2 : m, e.moveTo(a + Math.sin(_) * u, s - Math.cos(_) * m), _ += un, e.lineTo(a + Math.sin(_) * u, s - Math.cos(_) * m), _ += un, e.lineTo(a + Math.sin(_) * u, s - Math.cos(_) * m), e.closePath();
        break;
      case "rectRounded":
        d = m * 0.516, c = m - d, i = Math.cos(_ + we) * c, h = Math.cos(_ + we) * (n ? n / 2 - d : c), r = Math.sin(_ + we) * c, p = Math.sin(_ + we) * (n ? n / 2 - d : c), e.arc(a - h, s - r, d, _ - mt, _ - Ct), e.arc(a + p, s - i, d, _ - Ct, _), e.arc(a + h, s + r, d, _, _ + Ct), e.arc(a - p, s + i, d, _ + Ct, _ + mt), e.closePath();
        break;
      case "rect":
        if (!f) {
          c = Math.SQRT1_2 * m, u = n ? n / 2 : c, e.rect(a - u, s - c, 2 * u, 2 * c);
          break;
        }
        _ += we;
      /* falls through */
      case "rectRot":
        h = Math.cos(_) * (n ? n / 2 : m), i = Math.cos(_) * m, r = Math.sin(_) * m, p = Math.sin(_) * (n ? n / 2 : m), e.moveTo(a - h, s - r), e.lineTo(a + p, s - i), e.lineTo(a + h, s + r), e.lineTo(a - p, s + i), e.closePath();
        break;
      case "crossRot":
        _ += we;
      /* falls through */
      case "cross":
        h = Math.cos(_) * (n ? n / 2 : m), i = Math.cos(_) * m, r = Math.sin(_) * m, p = Math.sin(_) * (n ? n / 2 : m), e.moveTo(a - h, s - r), e.lineTo(a + h, s + r), e.moveTo(a + p, s - i), e.lineTo(a - p, s + i);
        break;
      case "star":
        h = Math.cos(_) * (n ? n / 2 : m), i = Math.cos(_) * m, r = Math.sin(_) * m, p = Math.sin(_) * (n ? n / 2 : m), e.moveTo(a - h, s - r), e.lineTo(a + h, s + r), e.moveTo(a + p, s - i), e.lineTo(a - p, s + i), _ += we, h = Math.cos(_) * (n ? n / 2 : m), i = Math.cos(_) * m, r = Math.sin(_) * m, p = Math.sin(_) * (n ? n / 2 : m), e.moveTo(a - h, s - r), e.lineTo(a + h, s + r), e.moveTo(a + p, s - i), e.lineTo(a - p, s + i);
        break;
      case "line":
        i = n ? n / 2 : Math.cos(_) * m, r = Math.sin(_) * m, e.moveTo(a - i, s - r), e.lineTo(a + i, s + r);
        break;
      case "dash":
        e.moveTo(a, s), e.lineTo(a + Math.cos(_) * (n ? n / 2 : m), s + Math.sin(_) * m);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function pa(e, t, a) {
  return a = a || 0.5, !t || e && e.x > t.left - a && e.x < t.right + a && e.y > t.top - a && e.y < t.bottom + a;
}
function ja(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function Ya(e) {
  e.restore();
}
function al(e, t, a, s, n) {
  if (!t)
    return e.lineTo(a.x, a.y);
  if (n === "middle") {
    const o = (t.x + a.x) / 2;
    e.lineTo(o, t.y), e.lineTo(o, a.y);
  } else n === "after" != !!s ? e.lineTo(t.x, a.y) : e.lineTo(a.x, t.y);
  e.lineTo(a.x, a.y);
}
function sl(e, t, a, s) {
  if (!t)
    return e.lineTo(a.x, a.y);
  e.bezierCurveTo(s ? t.cp1x : t.cp2x, s ? t.cp1y : t.cp2y, s ? a.cp2x : a.cp1x, s ? a.cp2y : a.cp1y, a.x, a.y);
}
function nl(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), pt(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function ol(e, t, a, s, n) {
  if (n.strikethrough || n.underline) {
    const o = e.measureText(s), i = t - o.actualBoundingBoxLeft, r = t + o.actualBoundingBoxRight, c = a - o.actualBoundingBoxAscent, d = a + o.actualBoundingBoxDescent, u = n.strikethrough ? (c + d) / 2 : d;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = n.decorationWidth || 2, e.moveTo(i, u), e.lineTo(r, u), e.stroke();
  }
}
function il(e, t) {
  const a = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = a;
}
function va(e, t, a, s, n, o = {}) {
  const i = Mt(t) ? t : [
    t
  ], r = o.strokeWidth > 0 && o.strokeColor !== "";
  let c, d;
  for (e.save(), e.font = n.string, nl(e, o), c = 0; c < i.length; ++c)
    d = i[c], o.backdrop && il(e, o.backdrop), r && (o.strokeColor && (e.strokeStyle = o.strokeColor), pt(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(d, a, s, o.maxWidth)), e.fillText(d, a, s, o.maxWidth), ol(e, a, s, d, o), s += Number(n.lineHeight);
  e.restore();
}
function Va(e, t) {
  const { x: a, y: s, w: n, h: o, radius: i } = t;
  e.arc(a + i.topLeft, s + i.topLeft, i.topLeft, 1.5 * mt, mt, !0), e.lineTo(a, s + o - i.bottomLeft), e.arc(a + i.bottomLeft, s + o - i.bottomLeft, i.bottomLeft, mt, Ct, !0), e.lineTo(a + n - i.bottomRight, s + o), e.arc(a + n - i.bottomRight, s + o - i.bottomRight, i.bottomRight, Ct, 0, !0), e.lineTo(a + n, s + i.topRight), e.arc(a + n - i.topRight, s + i.topRight, i.topRight, 0, -Ct, !0), e.lineTo(a + i.topLeft, s);
}
const rl = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, ll = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function cl(e, t) {
  const a = ("" + e).match(rl);
  if (!a || a[1] === "normal")
    return t * 1.2;
  switch (e = +a[2], a[3]) {
    case "px":
      return e;
    case "%":
      e /= 100;
      break;
  }
  return t * e;
}
const dl = (e) => +e || 0;
function Ys(e, t) {
  const a = {}, s = ht(t), n = s ? Object.keys(t) : t, o = ht(e) ? s ? (i) => it(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of n)
    a[i] = dl(o(i));
  return a;
}
function ti(e) {
  return Ys(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function Ve(e) {
  return Ys(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function qt(e) {
  const t = ti(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function Lt(e, t) {
  e = e || {}, t = t || $t.font;
  let a = it(e.size, t.size);
  typeof a == "string" && (a = parseInt(a, 10));
  let s = it(e.style, t.style);
  s && !("" + s).match(ll) && (console.warn('Invalid font style specified: "' + s + '"'), s = void 0);
  const n = {
    family: it(e.family, t.family),
    lineHeight: cl(it(e.lineHeight, t.lineHeight), a),
    size: a,
    style: s,
    weight: it(e.weight, t.weight),
    string: ""
  };
  return n.string = el(n), n;
}
function $a(e, t, a, s) {
  let n, o, i;
  for (n = 0, o = e.length; n < o; ++n)
    if (i = e[n], i !== void 0 && i !== void 0)
      return i;
}
function ul(e, t, a) {
  const { min: s, max: n } = e, o = jo(t, (n - s) / 2), i = (r, c) => a && r === 0 ? 0 : r + c;
  return {
    min: i(s, -Math.abs(o)),
    max: i(n, o)
  };
}
function Ie(e, t) {
  return Object.assign(Object.create(e), t);
}
function qs(e, t = [
  ""
], a, s, n = () => e[0]) {
  const o = a || e;
  typeof s > "u" && (s = ni("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: o,
    _fallback: s,
    _getTarget: n,
    override: (r) => qs([
      r,
      ...e
    ], t, o, s)
  };
  return new Proxy(i, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(r, c) {
      return delete r[c], delete r._keys, delete e[0][c], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(r, c) {
      return ai(r, c, () => yl(c, t, e, r));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(r, c) {
      return Reflect.getOwnPropertyDescriptor(r._scopes[0], c);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(e[0]);
    },
    /**
    * A trap for the in operator.
    */
    has(r, c) {
      return kn(r).includes(c);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(r) {
      return kn(r);
    },
    /**
    * A trap for setting property values.
    */
    set(r, c, d) {
      const u = r._storage || (r._storage = n());
      return r[c] = u[c] = d, delete r._keys, !0;
    }
  });
}
function We(e, t, a, s) {
  const n = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: a,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: ei(e, s),
    setContext: (o) => We(e, o, a, s),
    override: (o) => We(e.override(o), t, a, s)
  };
  return new Proxy(n, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(o, i) {
      return delete o[i], delete e[i], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(o, i, r) {
      return ai(o, i, () => fl(o, i, r));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(o, i) {
      return o._descriptors.allKeys ? Reflect.has(e, i) ? {
        enumerable: !0,
        configurable: !0
      } : void 0 : Reflect.getOwnPropertyDescriptor(e, i);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(e);
    },
    /**
    * A trap for the in operator.
    */
    has(o, i) {
      return Reflect.has(e, i);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys() {
      return Reflect.ownKeys(e);
    },
    /**
    * A trap for setting property values.
    */
    set(o, i, r) {
      return e[i] = r, delete o[i], !0;
    }
  });
}
function ei(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: a = t.scriptable, _indexable: s = t.indexable, _allKeys: n = t.allKeys } = e;
  return {
    allKeys: n,
    scriptable: a,
    indexable: s,
    isScriptable: ye(a) ? a : () => a,
    isIndexable: ye(s) ? s : () => s
  };
}
const hl = (e, t) => e ? e + Vs(t) : t, Us = (e, t) => ht(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function ai(e, t, a) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const s = a();
  return e[t] = s, s;
}
function fl(e, t, a) {
  const { _proxy: s, _context: n, _subProxy: o, _descriptors: i } = e;
  let r = s[t];
  return ye(r) && i.isScriptable(t) && (r = gl(t, r, e, a)), Mt(r) && r.length && (r = pl(t, r, e, i.isIndexable)), Us(t, r) && (r = We(r, n, o && o[t], i)), r;
}
function gl(e, t, a, s) {
  const { _proxy: n, _context: o, _subProxy: i, _stack: r } = a;
  if (r.has(e))
    throw new Error("Recursion detected: " + Array.from(r).join("->") + "->" + e);
  r.add(e);
  let c = t(o, i || s);
  return r.delete(e), Us(e, c) && (c = Ks(n._scopes, n, e, c)), c;
}
function pl(e, t, a, s) {
  const { _proxy: n, _context: o, _subProxy: i, _descriptors: r } = a;
  if (typeof o.index < "u" && s(e))
    return t[o.index % t.length];
  if (ht(t[0])) {
    const c = t, d = n._scopes.filter((u) => u !== c);
    t = [];
    for (const u of c) {
      const h = Ks(d, n, e, u);
      t.push(We(h, o, i && i[e], r));
    }
  }
  return t;
}
function si(e, t, a) {
  return ye(e) ? e(t, a) : e;
}
const vl = (e, t) => e === !0 ? t : typeof e == "string" ? Le(t, e) : void 0;
function bl(e, t, a, s, n) {
  for (const o of t) {
    const i = vl(a, o);
    if (i) {
      e.add(i);
      const r = si(i._fallback, a, n);
      if (typeof r < "u" && r !== a && r !== s)
        return r;
    } else if (i === !1 && typeof s < "u" && a !== s)
      return null;
  }
  return !1;
}
function Ks(e, t, a, s) {
  const n = t._rootScopes, o = si(t._fallback, a, s), i = [
    ...e,
    ...n
  ], r = /* @__PURE__ */ new Set();
  r.add(s);
  let c = xn(r, i, a, o || a, s);
  return c === null || typeof o < "u" && o !== a && (c = xn(r, i, o, c, s), c === null) ? !1 : qs(Array.from(r), [
    ""
  ], n, o, () => ml(t, a, s));
}
function xn(e, t, a, s, n) {
  for (; a; )
    a = bl(e, t, a, s, n);
  return a;
}
function ml(e, t, a) {
  const s = e._getTarget();
  t in s || (s[t] = {});
  const n = s[t];
  return Mt(n) && ht(a) ? a : n || {};
}
function yl(e, t, a, s) {
  let n;
  for (const o of t)
    if (n = ni(hl(o, e), a), typeof n < "u")
      return Us(e, n) ? Ks(a, s, e, n) : n;
}
function ni(e, t) {
  for (const a of t) {
    if (!a)
      continue;
    const s = a[e];
    if (typeof s < "u")
      return s;
  }
}
function kn(e) {
  let t = e._keys;
  return t || (t = e._keys = _l(e._scopes)), t;
}
function _l(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of e)
    for (const s of Object.keys(a).filter((n) => !n.startsWith("_")))
      t.add(s);
  return Array.from(t);
}
const xl = Number.EPSILON || 1e-14, He = (e, t) => t < e.length && !e[t].skip && e[t], oi = (e) => e === "x" ? "y" : "x";
function kl(e, t, a, s) {
  const n = e.skip ? t : e, o = t, i = a.skip ? t : a, r = Ds(o, n), c = Ds(i, o);
  let d = r / (r + c), u = c / (r + c);
  d = isNaN(d) ? 0 : d, u = isNaN(u) ? 0 : u;
  const h = s * d, p = s * u;
  return {
    previous: {
      x: o.x - h * (i.x - n.x),
      y: o.y - h * (i.y - n.y)
    },
    next: {
      x: o.x + p * (i.x - n.x),
      y: o.y + p * (i.y - n.y)
    }
  };
}
function wl(e, t, a) {
  const s = e.length;
  let n, o, i, r, c, d = He(e, 0);
  for (let u = 0; u < s - 1; ++u)
    if (c = d, d = He(e, u + 1), !(!c || !d)) {
      if (oa(t[u], 0, xl)) {
        a[u] = a[u + 1] = 0;
        continue;
      }
      n = a[u] / t[u], o = a[u + 1] / t[u], r = Math.pow(n, 2) + Math.pow(o, 2), !(r <= 9) && (i = 3 / Math.sqrt(r), a[u] = n * i * t[u], a[u + 1] = o * i * t[u]);
    }
}
function $l(e, t, a = "x") {
  const s = oi(a), n = e.length;
  let o, i, r, c = He(e, 0);
  for (let d = 0; d < n; ++d) {
    if (i = r, r = c, c = He(e, d + 1), !r)
      continue;
    const u = r[a], h = r[s];
    i && (o = (u - i[a]) / 3, r[`cp1${a}`] = u - o, r[`cp1${s}`] = h - o * t[d]), c && (o = (c[a] - u) / 3, r[`cp2${a}`] = u + o, r[`cp2${s}`] = h + o * t[d]);
  }
}
function Ml(e, t = "x") {
  const a = oi(t), s = e.length, n = Array(s).fill(0), o = Array(s);
  let i, r, c, d = He(e, 0);
  for (i = 0; i < s; ++i)
    if (r = c, c = d, d = He(e, i + 1), !!c) {
      if (d) {
        const u = d[t] - c[t];
        n[i] = u !== 0 ? (d[a] - c[a]) / u : 0;
      }
      o[i] = r ? d ? Jt(n[i - 1]) !== Jt(n[i]) ? 0 : (n[i - 1] + n[i]) / 2 : n[i - 1] : n[i];
    }
  wl(e, n, o), $l(e, o, t);
}
function Ma(e, t, a) {
  return Math.max(Math.min(e, a), t);
}
function Sl(e, t) {
  let a, s, n, o, i, r = pa(e[0], t);
  for (a = 0, s = e.length; a < s; ++a)
    i = o, o = r, r = a < s - 1 && pa(e[a + 1], t), o && (n = e[a], i && (n.cp1x = Ma(n.cp1x, t.left, t.right), n.cp1y = Ma(n.cp1y, t.top, t.bottom)), r && (n.cp2x = Ma(n.cp2x, t.left, t.right), n.cp2y = Ma(n.cp2y, t.top, t.bottom)));
}
function Cl(e, t, a, s, n) {
  let o, i, r, c;
  if (t.spanGaps && (e = e.filter((d) => !d.skip)), t.cubicInterpolationMode === "monotone")
    Ml(e, n);
  else {
    let d = s ? e[e.length - 1] : e[0];
    for (o = 0, i = e.length; o < i; ++o)
      r = e[o], c = kl(d, r, e[Math.min(o + 1, i - (s ? 0 : 1)) % i], t.tension), r.cp1x = c.previous.x, r.cp1y = c.previous.y, r.cp2x = c.next.x, r.cp2y = c.next.y, d = r;
  }
  t.capBezierPoints && Sl(e, a);
}
function Xs() {
  return typeof window < "u" && typeof document < "u";
}
function Gs(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function Na(e, t, a) {
  let s;
  return typeof e == "string" ? (s = parseInt(e, 10), e.indexOf("%") !== -1 && (s = s / 100 * t.parentNode[a])) : s = e, s;
}
const qa = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Dl(e, t) {
  return qa(e).getPropertyValue(t);
}
const Al = [
  "top",
  "right",
  "bottom",
  "left"
];
function Be(e, t, a) {
  const s = {};
  a = a ? "-" + a : "";
  for (let n = 0; n < 4; n++) {
    const o = Al[n];
    s[o] = parseFloat(e[t + "-" + o + a]) || 0;
  }
  return s.width = s.left + s.right, s.height = s.top + s.bottom, s;
}
const Tl = (e, t, a) => (e > 0 || t > 0) && (!a || !a.shadowRoot);
function Bl(e, t) {
  const a = e.touches, s = a && a.length ? a[0] : e, { offsetX: n, offsetY: o } = s;
  let i = !1, r, c;
  if (Tl(n, o, e.target))
    r = n, c = o;
  else {
    const d = t.getBoundingClientRect();
    r = s.clientX - d.left, c = s.clientY - d.top, i = !0;
  }
  return {
    x: r,
    y: c,
    box: i
  };
}
function Ce(e, t) {
  if ("native" in e)
    return e;
  const { canvas: a, currentDevicePixelRatio: s } = t, n = qa(a), o = n.boxSizing === "border-box", i = Be(n, "padding"), r = Be(n, "border", "width"), { x: c, y: d, box: u } = Bl(e, a), h = i.left + (u && r.left), p = i.top + (u && r.top);
  let { width: v, height: f } = t;
  return o && (v -= i.width + r.width, f -= i.height + r.height), {
    x: Math.round((c - h) / v * a.width / s),
    y: Math.round((d - p) / f * a.height / s)
  };
}
function Ll(e, t, a) {
  let s, n;
  if (t === void 0 || a === void 0) {
    const o = e && Gs(e);
    if (!o)
      t = e.clientWidth, a = e.clientHeight;
    else {
      const i = o.getBoundingClientRect(), r = qa(o), c = Be(r, "border", "width"), d = Be(r, "padding");
      t = i.width - d.width - c.width, a = i.height - d.height - c.height, s = Na(r.maxWidth, o, "clientWidth"), n = Na(r.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: a,
    maxWidth: s || za,
    maxHeight: n || za
  };
}
const ve = (e) => Math.round(e * 10) / 10;
function Fl(e, t, a, s) {
  const n = qa(e), o = Be(n, "margin"), i = Na(n.maxWidth, e, "clientWidth") || za, r = Na(n.maxHeight, e, "clientHeight") || za, c = Ll(e, t, a);
  let { width: d, height: u } = c;
  if (n.boxSizing === "content-box") {
    const p = Be(n, "border", "width"), v = Be(n, "padding");
    d -= v.width + p.width, u -= v.height + p.height;
  }
  return d = Math.max(0, d - o.width), u = Math.max(0, s ? d / s : u - o.height), d = ve(Math.min(d, i, c.maxWidth)), u = ve(Math.min(u, r, c.maxHeight)), d && !u && (u = ve(d / 2)), (t !== void 0 || a !== void 0) && s && c.height && u > c.height && (u = c.height, d = ve(Math.floor(u * s))), {
    width: d,
    height: u
  };
}
function wn(e, t, a) {
  const s = t || 1, n = ve(e.height * s), o = ve(e.width * s);
  e.height = ve(e.height), e.width = ve(e.width);
  const i = e.canvas;
  return i.style && (a || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== s || i.height !== n || i.width !== o ? (e.currentDevicePixelRatio = s, i.height = n, i.width = o, e.ctx.setTransform(s, 0, 0, s, 0, 0), !0) : !1;
}
const Pl = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    Xs() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function $n(e, t) {
  const a = Dl(e, t), s = a && a.match(/^(\d+)(\.\d+)?px$/);
  return s ? +s[1] : void 0;
}
function De(e, t, a, s) {
  return {
    x: e.x + a * (t.x - e.x),
    y: e.y + a * (t.y - e.y)
  };
}
function Il(e, t, a, s) {
  return {
    x: e.x + a * (t.x - e.x),
    y: s === "middle" ? a < 0.5 ? e.y : t.y : s === "after" ? a < 1 ? e.y : t.y : a > 0 ? t.y : e.y
  };
}
function Rl(e, t, a, s) {
  const n = {
    x: e.cp2x,
    y: e.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, i = De(e, n, a), r = De(n, o, a), c = De(o, t, a), d = De(i, r, a), u = De(r, c, a);
  return De(d, u, a);
}
const El = function(e, t) {
  return {
    x(a) {
      return e + e + t - a;
    },
    setWidth(a) {
      t = a;
    },
    textAlign(a) {
      return a === "center" ? a : a === "right" ? "left" : "right";
    },
    xPlus(a, s) {
      return a - s;
    },
    leftForLtr(a, s) {
      return a - s;
    }
  };
}, Ol = function() {
  return {
    x(e) {
      return e;
    },
    setWidth(e) {
    },
    textAlign(e) {
      return e;
    },
    xPlus(e, t) {
      return e + t;
    },
    leftForLtr(e, t) {
      return e;
    }
  };
};
function Ne(e, t, a) {
  return e ? El(t, a) : Ol();
}
function ii(e, t) {
  let a, s;
  (t === "ltr" || t === "rtl") && (a = e.canvas.style, s = [
    a.getPropertyValue("direction"),
    a.getPropertyPriority("direction")
  ], a.setProperty("direction", t, "important"), e.prevTextDirection = s);
}
function ri(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function li(e) {
  return e === "angle" ? {
    between: ga,
    compare: Er,
    normalize: Wt
  } : {
    between: re,
    compare: (t, a) => t - a,
    normalize: (t) => t
  };
}
function Mn({ start: e, end: t, count: a, loop: s, style: n }) {
  return {
    start: e % a,
    end: t % a,
    loop: s && (t - e + 1) % a === 0,
    style: n
  };
}
function zl(e, t, a) {
  const { property: s, start: n, end: o } = a, { between: i, normalize: r } = li(s), c = t.length;
  let { start: d, end: u, loop: h } = e, p, v;
  if (h) {
    for (d += c, u += c, p = 0, v = c; p < v && i(r(t[d % c][s]), n, o); ++p)
      d--, u--;
    d %= c, u %= c;
  }
  return u < d && (u += c), {
    start: d,
    end: u,
    loop: h,
    style: e.style
  };
}
function ci(e, t, a) {
  if (!a)
    return [
      e
    ];
  const { property: s, start: n, end: o } = a, i = t.length, { compare: r, between: c, normalize: d } = li(s), { start: u, end: h, loop: p, style: v } = zl(e, t, a), f = [];
  let m = !1, _ = null, g, b, k;
  const w = () => c(n, k, g) && r(n, k) !== 0, M = () => r(o, g) === 0 || c(o, k, g), S = () => m || w(), D = () => !m || M();
  for (let A = u, T = u; A <= h; ++A)
    b = t[A % i], !b.skip && (g = d(b[s]), g !== k && (m = c(g, n, o), _ === null && S() && (_ = r(g, n) === 0 ? A : T), _ !== null && D() && (f.push(Mn({
      start: _,
      end: A,
      loop: p,
      count: i,
      style: v
    })), _ = null), T = A, k = g));
  return _ !== null && f.push(Mn({
    start: _,
    end: h,
    loop: p,
    count: i,
    style: v
  })), f;
}
function di(e, t) {
  const a = [], s = e.segments;
  for (let n = 0; n < s.length; n++) {
    const o = ci(s[n], e.points, t);
    o.length && a.push(...o);
  }
  return a;
}
function Vl(e, t, a, s) {
  let n = 0, o = t - 1;
  if (a && !s)
    for (; n < t && !e[n].skip; )
      n++;
  for (; n < t && e[n].skip; )
    n++;
  for (n %= t, a && (o += n); o > n && e[o % t].skip; )
    o--;
  return o %= t, {
    start: n,
    end: o
  };
}
function Nl(e, t, a, s) {
  const n = e.length, o = [];
  let i = t, r = e[t], c;
  for (c = t + 1; c <= a; ++c) {
    const d = e[c % n];
    d.skip || d.stop ? r.skip || (s = !1, o.push({
      start: t % n,
      end: (c - 1) % n,
      loop: s
    }), t = i = d.stop ? c : null) : (i = c, r.skip && (t = c)), r = d;
  }
  return i !== null && o.push({
    start: t % n,
    end: i % n,
    loop: s
  }), o;
}
function Wl(e, t) {
  const a = e.points, s = e.options.spanGaps, n = a.length;
  if (!n)
    return [];
  const o = !!e._loop, { start: i, end: r } = Vl(a, n, o, s);
  if (s === !0)
    return Sn(e, [
      {
        start: i,
        end: r,
        loop: o
      }
    ], a, t);
  const c = r < i ? r + n : r, d = !!e._fullLoop && i === 0 && r === n - 1;
  return Sn(e, Nl(a, i, c, d), a, t);
}
function Sn(e, t, a, s) {
  return !s || !s.setContext || !a ? t : Hl(e, t, a, s);
}
function Hl(e, t, a, s) {
  const n = e._chart.getContext(), o = Cn(e.options), { _datasetIndex: i, options: { spanGaps: r } } = e, c = a.length, d = [];
  let u = o, h = t[0].start, p = h;
  function v(f, m, _, g) {
    const b = r ? -1 : 1;
    if (f !== m) {
      for (f += c; a[f % c].skip; )
        f -= b;
      for (; a[m % c].skip; )
        m += b;
      f % c !== m % c && (d.push({
        start: f % c,
        end: m % c,
        loop: _,
        style: g
      }), u = g, h = m % c);
    }
  }
  for (const f of t) {
    h = r ? h : f.start;
    let m = a[h % c], _;
    for (p = h + 1; p <= f.end; p++) {
      const g = a[p % c];
      _ = Cn(s.setContext(Ie(n, {
        type: "segment",
        p0: m,
        p1: g,
        p0DataIndex: (p - 1) % c,
        p1DataIndex: p % c,
        datasetIndex: i
      }))), jl(_, u) && v(h, p - 1, f.loop, u), m = g, u = _;
    }
    h < p - 1 && v(h, p - 1, f.loop, u);
  }
  return d;
}
function Cn(e) {
  return {
    backgroundColor: e.backgroundColor,
    borderCapStyle: e.borderCapStyle,
    borderDash: e.borderDash,
    borderDashOffset: e.borderDashOffset,
    borderJoinStyle: e.borderJoinStyle,
    borderWidth: e.borderWidth,
    borderColor: e.borderColor
  };
}
function jl(e, t) {
  if (!t)
    return !1;
  const a = [], s = function(n, o) {
    return Hs(o) ? (a.includes(o) || a.push(o), a.indexOf(o)) : o;
  };
  return JSON.stringify(e, s) !== JSON.stringify(t, s);
}
function Sa(e, t, a) {
  return e.options.clip ? e[a] : t[a];
}
function Yl(e, t) {
  const { xScale: a, yScale: s } = e;
  return a && s ? {
    left: Sa(a, t, "left"),
    right: Sa(a, t, "right"),
    top: Sa(s, t, "top"),
    bottom: Sa(s, t, "bottom")
  } : t;
}
function ui(e, t) {
  const a = t._clip;
  if (a.disabled)
    return !1;
  const s = Yl(t, e.chartArea);
  return {
    left: a.left === !1 ? 0 : s.left - (a.left === !0 ? 0 : a.left),
    right: a.right === !1 ? e.width : s.right + (a.right === !0 ? 0 : a.right),
    top: a.top === !1 ? 0 : s.top - (a.top === !0 ? 0 : a.top),
    bottom: a.bottom === !1 ? e.height : s.bottom + (a.bottom === !0 ? 0 : a.bottom)
  };
}
class ql {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, a, s, n) {
    const o = a.listeners[n], i = a.duration;
    o.forEach((r) => r({
      chart: t,
      initial: a.initial,
      numSteps: i,
      currentStep: Math.min(s - a.start, i)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = Go.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let a = 0;
    this._charts.forEach((s, n) => {
      if (!s.running || !s.items.length)
        return;
      const o = s.items;
      let i = o.length - 1, r = !1, c;
      for (; i >= 0; --i)
        c = o[i], c._active ? (c._total > s.duration && (s.duration = c._total), c.tick(t), r = !0) : (o[i] = o[o.length - 1], o.pop());
      r && (n.draw(), this._notify(n, s, t, "progress")), o.length || (s.running = !1, this._notify(n, s, t, "complete"), s.initial = !1), a += o.length;
    }), this._lastDate = t, a === 0 && (this._running = !1);
  }
  _getAnims(t) {
    const a = this._charts;
    let s = a.get(t);
    return s || (s = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, a.set(t, s)), s;
  }
  listen(t, a, s) {
    this._getAnims(t).listeners[a].push(s);
  }
  add(t, a) {
    !a || !a.length || this._getAnims(t).items.push(...a);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const a = this._charts.get(t);
    a && (a.running = !0, a.start = Date.now(), a.duration = a.items.reduce((s, n) => Math.max(s, n._duration), 0), this._refresh());
  }
  running(t) {
    if (!this._running)
      return !1;
    const a = this._charts.get(t);
    return !(!a || !a.running || !a.items.length);
  }
  stop(t) {
    const a = this._charts.get(t);
    if (!a || !a.items.length)
      return;
    const s = a.items;
    let n = s.length - 1;
    for (; n >= 0; --n)
      s[n].cancel();
    a.items = [], this._notify(t, a, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var se = /* @__PURE__ */ new ql();
const Dn = "transparent", Ul = {
  boolean(e, t, a) {
    return a > 0.5 ? t : e;
  },
  color(e, t, a) {
    const s = bn(e || Dn), n = s.valid && bn(t || Dn);
    return n && n.valid ? n.mix(s, a).hexString() : t;
  },
  number(e, t, a) {
    return e + (t - e) * a;
  }
};
class Kl {
  constructor(t, a, s, n) {
    const o = a[s];
    n = $a([
      t.to,
      n,
      o,
      t.from
    ]);
    const i = $a([
      t.from,
      o,
      n
    ]);
    this._active = !0, this._fn = t.fn || Ul[t.type || typeof i], this._easing = ia[t.easing] || ia.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = a, this._prop = s, this._from = i, this._to = n, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, a, s) {
    if (this._active) {
      this._notify(!1);
      const n = this._target[this._prop], o = s - this._start, i = this._duration - o;
      this._start = s, this._duration = Math.floor(Math.max(i, t.duration)), this._total += o, this._loop = !!t.loop, this._to = $a([
        t.to,
        a,
        n,
        t.from
      ]), this._from = $a([
        t.from,
        n,
        a
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const a = t - this._start, s = this._duration, n = this._prop, o = this._from, i = this._loop, r = this._to;
    let c;
    if (this._active = o !== r && (i || a < s), !this._active) {
      this._target[n] = r, this._notify(!0);
      return;
    }
    if (a < 0) {
      this._target[n] = o;
      return;
    }
    c = a / s % 2, c = i && c > 1 ? 2 - c : c, c = this._easing(Math.min(1, Math.max(0, c))), this._target[n] = this._fn(o, r, c);
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((a, s) => {
      t.push({
        res: a,
        rej: s
      });
    });
  }
  _notify(t) {
    const a = t ? "res" : "rej", s = this._promises || [];
    for (let n = 0; n < s.length; n++)
      s[n][a]();
  }
}
class hi {
  constructor(t, a) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(a);
  }
  configure(t) {
    if (!ht(t))
      return;
    const a = Object.keys($t.animation), s = this._properties;
    Object.getOwnPropertyNames(t).forEach((n) => {
      const o = t[n];
      if (!ht(o))
        return;
      const i = {};
      for (const r of a)
        i[r] = o[r];
      (Mt(o.properties) && o.properties || [
        n
      ]).forEach((r) => {
        (r === n || !s.has(r)) && s.set(r, i);
      });
    });
  }
  _animateOptions(t, a) {
    const s = a.options, n = Gl(t, s);
    if (!n)
      return [];
    const o = this._createAnimations(n, s);
    return s.$shared && Xl(t.options.$animations, s).then(() => {
      t.options = s;
    }, () => {
    }), o;
  }
  _createAnimations(t, a) {
    const s = this._properties, n = [], o = t.$animations || (t.$animations = {}), i = Object.keys(a), r = Date.now();
    let c;
    for (c = i.length - 1; c >= 0; --c) {
      const d = i[c];
      if (d.charAt(0) === "$")
        continue;
      if (d === "options") {
        n.push(...this._animateOptions(t, a));
        continue;
      }
      const u = a[d];
      let h = o[d];
      const p = s.get(d);
      if (h)
        if (p && h.active()) {
          h.update(p, u, r);
          continue;
        } else
          h.cancel();
      if (!p || !p.duration) {
        t[d] = u;
        continue;
      }
      o[d] = h = new Kl(p, t, d, u), n.push(h);
    }
    return n;
  }
  update(t, a) {
    if (this._properties.size === 0) {
      Object.assign(t, a);
      return;
    }
    const s = this._createAnimations(t, a);
    if (s.length)
      return se.add(this._chart, s), !0;
  }
}
function Xl(e, t) {
  const a = [], s = Object.keys(t);
  for (let n = 0; n < s.length; n++) {
    const o = e[s[n]];
    o && o.active() && a.push(o.wait());
  }
  return Promise.all(a);
}
function Gl(e, t) {
  if (!t)
    return;
  let a = e.options;
  if (!a) {
    e.options = t;
    return;
  }
  return a.$shared && (e.options = a = Object.assign({}, a, {
    $shared: !1,
    $animations: {}
  })), a;
}
function An(e, t) {
  const a = e && e.options || {}, s = a.reverse, n = a.min === void 0 ? t : 0, o = a.max === void 0 ? t : 0;
  return {
    start: s ? o : n,
    end: s ? n : o
  };
}
function Zl(e, t, a) {
  if (a === !1)
    return !1;
  const s = An(e, a), n = An(t, a);
  return {
    top: n.end,
    right: s.end,
    bottom: n.start,
    left: s.start
  };
}
function Ql(e) {
  let t, a, s, n;
  return ht(e) ? (t = e.top, a = e.right, s = e.bottom, n = e.left) : t = a = s = n = e, {
    top: t,
    right: a,
    bottom: s,
    left: n,
    disabled: e === !1
  };
}
function fi(e, t) {
  const a = [], s = e._getSortedDatasetMetas(t);
  let n, o;
  for (n = 0, o = s.length; n < o; ++n)
    a.push(s[n].index);
  return a;
}
function Tn(e, t, a, s = {}) {
  const n = e.keys, o = s.mode === "single";
  let i, r, c, d;
  if (t === null)
    return;
  let u = !1;
  for (i = 0, r = n.length; i < r; ++i) {
    if (c = +n[i], c === a) {
      if (u = !0, s.all)
        continue;
      break;
    }
    d = e.values[c], Pt(d) && (o || t === 0 || Jt(t) === Jt(d)) && (t += d);
  }
  return !u && !s.all ? 0 : t;
}
function Jl(e, t) {
  const { iScale: a, vScale: s } = t, n = a.axis === "x" ? "x" : "y", o = s.axis === "x" ? "x" : "y", i = Object.keys(e), r = new Array(i.length);
  let c, d, u;
  for (c = 0, d = i.length; c < d; ++c)
    u = i[c], r[c] = {
      [n]: u,
      [o]: e[u]
    };
  return r;
}
function ss(e, t) {
  const a = e && e.options.stacked;
  return a || a === void 0 && t.stack !== void 0;
}
function tc(e, t, a) {
  return `${e.id}.${t.id}.${a.stack || a.type}`;
}
function ec(e) {
  const { min: t, max: a, minDefined: s, maxDefined: n } = e.getUserBounds();
  return {
    min: s ? t : Number.NEGATIVE_INFINITY,
    max: n ? a : Number.POSITIVE_INFINITY
  };
}
function ac(e, t, a) {
  const s = e[t] || (e[t] = {});
  return s[a] || (s[a] = {});
}
function Bn(e, t, a, s) {
  for (const n of t.getMatchingVisibleMetas(s).reverse()) {
    const o = e[n.index];
    if (a && o > 0 || !a && o < 0)
      return n.index;
  }
  return null;
}
function Ln(e, t) {
  const { chart: a, _cachedMeta: s } = e, n = a._stacks || (a._stacks = {}), { iScale: o, vScale: i, index: r } = s, c = o.axis, d = i.axis, u = tc(o, i, s), h = t.length;
  let p;
  for (let v = 0; v < h; ++v) {
    const f = t[v], { [c]: m, [d]: _ } = f, g = f._stacks || (f._stacks = {});
    p = g[d] = ac(n, u, m), p[r] = _, p._top = Bn(p, i, !0, s.type), p._bottom = Bn(p, i, !1, s.type);
    const b = p._visualValues || (p._visualValues = {});
    b[r] = _;
  }
}
function ns(e, t) {
  const a = e.scales;
  return Object.keys(a).filter((s) => a[s].axis === t).shift();
}
function sc(e, t) {
  return Ie(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function nc(e, t, a) {
  return Ie(e, {
    active: !1,
    dataIndex: t,
    parsed: void 0,
    raw: void 0,
    element: a,
    index: t,
    mode: "default",
    type: "data"
  });
}
function Ke(e, t) {
  const a = e.controller.index, s = e.vScale && e.vScale.axis;
  if (s) {
    t = t || e._parsed;
    for (const n of t) {
      const o = n._stacks;
      if (!o || o[s] === void 0 || o[s][a] === void 0)
        return;
      delete o[s][a], o[s]._visualValues !== void 0 && o[s]._visualValues[a] !== void 0 && delete o[s]._visualValues[a];
    }
  }
}
const os = (e) => e === "reset" || e === "none", Fn = (e, t) => t ? e : Object.assign({}, e), oc = (e, t, a) => e && !t.hidden && t._stacked && {
  keys: fi(a, !0),
  values: null
};
class Ua {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, a) {
    this.chart = t, this._ctx = t.ctx, this.index = a, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = ss(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && Ke(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, a = this._cachedMeta, s = this.getDataset(), n = (h, p, v, f) => h === "x" ? p : h === "r" ? f : v, o = a.xAxisID = it(s.xAxisID, ns(t, "x")), i = a.yAxisID = it(s.yAxisID, ns(t, "y")), r = a.rAxisID = it(s.rAxisID, ns(t, "r")), c = a.indexAxis, d = a.iAxisID = n(c, o, i, r), u = a.vAxisID = n(c, i, o, r);
    a.xScale = this.getScaleForId(o), a.yScale = this.getScaleForId(i), a.rScale = this.getScaleForId(r), a.iScale = this.getScaleForId(d), a.vScale = this.getScaleForId(u);
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(t) {
    return this.chart.scales[t];
  }
  _getOtherScale(t) {
    const a = this._cachedMeta;
    return t === a.iScale ? a.vScale : a.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const t = this._cachedMeta;
    this._data && gn(this._data, this), t._stacked && Ke(t);
  }
  _dataCheck() {
    const t = this.getDataset(), a = t.data || (t.data = []), s = this._data;
    if (ht(a)) {
      const n = this._cachedMeta;
      this._data = Jl(a, n);
    } else if (s !== a) {
      if (s) {
        gn(s, this);
        const n = this._cachedMeta;
        Ke(n), n._parsed = [];
      }
      a && Object.isExtensible(a) && Nr(a, this), this._syncList = [], this._data = a;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const a = this._cachedMeta, s = this.getDataset();
    let n = !1;
    this._dataCheck();
    const o = a._stacked;
    a._stacked = ss(a.vScale, a), a.stack !== s.stack && (n = !0, Ke(a), a.stack = s.stack), this._resyncElements(t), (n || o !== a._stacked) && (Ln(this, a._parsed), a._stacked = ss(a.vScale, a));
  }
  configure() {
    const t = this.chart.config, a = t.datasetScopeKeys(this._type), s = t.getOptionScopes(this.getDataset(), a, !0);
    this.options = t.createResolver(s, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, a) {
    const { _cachedMeta: s, _data: n } = this, { iScale: o, _stacked: i } = s, r = o.axis;
    let c = t === 0 && a === n.length ? !0 : s._sorted, d = t > 0 && s._parsed[t - 1], u, h, p;
    if (this._parsing === !1)
      s._parsed = n, s._sorted = !0, p = n;
    else {
      Mt(n[t]) ? p = this.parseArrayData(s, n, t, a) : ht(n[t]) ? p = this.parseObjectData(s, n, t, a) : p = this.parsePrimitiveData(s, n, t, a);
      const v = () => h[r] === null || d && h[r] < d[r];
      for (u = 0; u < a; ++u)
        s._parsed[u + t] = h = p[u], c && (v() && (c = !1), d = h);
      s._sorted = c;
    }
    i && Ln(this, p);
  }
  parsePrimitiveData(t, a, s, n) {
    const { iScale: o, vScale: i } = t, r = o.axis, c = i.axis, d = o.getLabels(), u = o === i, h = new Array(n);
    let p, v, f;
    for (p = 0, v = n; p < v; ++p)
      f = p + s, h[p] = {
        [r]: u || o.parse(d[f], f),
        [c]: i.parse(a[f], f)
      };
    return h;
  }
  parseArrayData(t, a, s, n) {
    const { xScale: o, yScale: i } = t, r = new Array(n);
    let c, d, u, h;
    for (c = 0, d = n; c < d; ++c)
      u = c + s, h = a[u], r[c] = {
        x: o.parse(h[0], u),
        y: i.parse(h[1], u)
      };
    return r;
  }
  parseObjectData(t, a, s, n) {
    const { xScale: o, yScale: i } = t, { xAxisKey: r = "x", yAxisKey: c = "y" } = this._parsing, d = new Array(n);
    let u, h, p, v;
    for (u = 0, h = n; u < h; ++u)
      p = u + s, v = a[p], d[u] = {
        x: o.parse(Le(v, r), p),
        y: i.parse(Le(v, c), p)
      };
    return d;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, a, s) {
    const n = this.chart, o = this._cachedMeta, i = a[t.axis], r = {
      keys: fi(n, !0),
      values: a._stacks[t.axis]._visualValues
    };
    return Tn(r, i, o.index, {
      mode: s
    });
  }
  updateRangeFromParsed(t, a, s, n) {
    const o = s[a.axis];
    let i = o === null ? NaN : o;
    const r = n && s._stacks[a.axis];
    n && r && (n.values = r, i = Tn(n, o, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, a) {
    const s = this._cachedMeta, n = s._parsed, o = s._sorted && t === s.iScale, i = n.length, r = this._getOtherScale(t), c = oc(a, s, this.chart), d = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: u, max: h } = ec(r);
    let p, v;
    function f() {
      v = n[p];
      const m = v[r.axis];
      return !Pt(v[t.axis]) || u > m || h < m;
    }
    for (p = 0; p < i && !(!f() && (this.updateRangeFromParsed(d, t, v, c), o)); ++p)
      ;
    if (o) {
      for (p = i - 1; p >= 0; --p)
        if (!f()) {
          this.updateRangeFromParsed(d, t, v, c);
          break;
        }
    }
    return d;
  }
  getAllParsedValues(t) {
    const a = this._cachedMeta._parsed, s = [];
    let n, o, i;
    for (n = 0, o = a.length; n < o; ++n)
      i = a[n][t.axis], Pt(i) && s.push(i);
    return s;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const a = this._cachedMeta, s = a.iScale, n = a.vScale, o = this.getParsed(t);
    return {
      label: s ? "" + s.getLabelForValue(o[s.axis]) : "",
      value: n ? "" + n.getLabelForValue(o[n.axis]) : ""
    };
  }
  _update(t) {
    const a = this._cachedMeta;
    this.update(t || "default"), a._clip = Ql(it(this.options.clip, Zl(a.xScale, a.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, a = this.chart, s = this._cachedMeta, n = s.data || [], o = a.chartArea, i = [], r = this._drawStart || 0, c = this._drawCount || n.length - r, d = this.options.drawActiveElementsOnTop;
    let u;
    for (s.dataset && s.dataset.draw(t, o, r, c), u = r; u < r + c; ++u) {
      const h = n[u];
      h.hidden || (h.active && d ? i.push(h) : h.draw(t, o));
    }
    for (u = 0; u < i.length; ++u)
      i[u].draw(t, o);
  }
  getStyle(t, a) {
    const s = a ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(s) : this.resolveDataElementOptions(t || 0, s);
  }
  getContext(t, a, s) {
    const n = this.getDataset();
    let o;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const i = this._cachedMeta.data[t];
      o = i.$context || (i.$context = nc(this.getContext(), t, i)), o.parsed = this.getParsed(t), o.raw = n.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = sc(this.chart.getContext(), this.index)), o.dataset = n, o.index = o.datasetIndex = this.index;
    return o.active = !!a, o.mode = s, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, a) {
    return this._resolveElementOptions(this.dataElementType.id, a, t);
  }
  _resolveElementOptions(t, a = "default", s) {
    const n = a === "active", o = this._cachedDataOpts, i = t + "-" + a, r = o[i], c = this.enableOptionSharing && ha(s);
    if (r)
      return Fn(r, c);
    const d = this.chart.config, u = d.datasetElementScopeKeys(this._type, t), h = n ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], p = d.getOptionScopes(this.getDataset(), u), v = Object.keys($t.elements[t]), f = () => this.getContext(s, n, a), m = d.resolveNamedOptions(p, v, f, h);
    return m.$shared && (m.$shared = c, o[i] = Object.freeze(Fn(m, c))), m;
  }
  _resolveAnimations(t, a, s) {
    const n = this.chart, o = this._cachedDataOpts, i = `animation-${a}`, r = o[i];
    if (r)
      return r;
    let c;
    if (n.options.animation !== !1) {
      const u = this.chart.config, h = u.datasetAnimationScopeKeys(this._type, a), p = u.getOptionScopes(this.getDataset(), h);
      c = u.createResolver(p, this.getContext(t, s, a));
    }
    const d = new hi(n, c && c.animations);
    return c && c._cacheable && (o[i] = Object.freeze(d)), d;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, a) {
    return !a || os(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, a) {
    const s = this.resolveDataElementOptions(t, a), n = this._sharedOptions, o = this.getSharedOptions(s), i = this.includeOptions(a, o) || o !== n;
    return this.updateSharedOptions(o, a, s), {
      sharedOptions: o,
      includeOptions: i
    };
  }
  updateElement(t, a, s, n) {
    os(n) ? Object.assign(t, s) : this._resolveAnimations(a, n).update(t, s);
  }
  updateSharedOptions(t, a, s) {
    t && !os(a) && this._resolveAnimations(void 0, a).update(t, s);
  }
  _setStyle(t, a, s, n) {
    t.active = n;
    const o = this.getStyle(a, n);
    this._resolveAnimations(a, s, n).update(t, {
      options: !n && this.getSharedOptions(o) || o
    });
  }
  removeHoverStyle(t, a, s) {
    this._setStyle(t, s, "active", !1);
  }
  setHoverStyle(t, a, s) {
    this._setStyle(t, s, "active", !0);
  }
  _removeDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !1);
  }
  _setDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !0);
  }
  _resyncElements(t) {
    const a = this._data, s = this._cachedMeta.data;
    for (const [r, c, d] of this._syncList)
      this[r](c, d);
    this._syncList = [];
    const n = s.length, o = a.length, i = Math.min(o, n);
    i && this.parse(0, i), o > n ? this._insertElements(n, o - n, t) : o < n && this._removeElements(o, n - o);
  }
  _insertElements(t, a, s = !0) {
    const n = this._cachedMeta, o = n.data, i = t + a;
    let r;
    const c = (d) => {
      for (d.length += a, r = d.length - 1; r >= i; r--)
        d[r] = d[r - a];
    };
    for (c(o), r = t; r < i; ++r)
      o[r] = new this.dataElementType();
    this._parsing && c(n._parsed), this.parse(t, a), s && this.updateElements(o, t, a, "reset");
  }
  updateElements(t, a, s, n) {
  }
  _removeElements(t, a) {
    const s = this._cachedMeta;
    if (this._parsing) {
      const n = s._parsed.splice(t, a);
      s._stacked && Ke(s, n);
    }
    s.data.splice(t, a);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [a, s, n] = t;
      this[a](s, n);
    }
    this.chart._dataChanges.push([
      this.index,
      ...t
    ]);
  }
  _onDataPush() {
    const t = arguments.length;
    this._sync([
      "_insertElements",
      this.getDataset().data.length - t,
      t
    ]);
  }
  _onDataPop() {
    this._sync([
      "_removeElements",
      this._cachedMeta.data.length - 1,
      1
    ]);
  }
  _onDataShift() {
    this._sync([
      "_removeElements",
      0,
      1
    ]);
  }
  _onDataSplice(t, a) {
    a && this._sync([
      "_removeElements",
      t,
      a
    ]);
    const s = arguments.length - 2;
    s && this._sync([
      "_insertElements",
      t,
      s
    ]);
  }
  _onDataUnshift() {
    this._sync([
      "_insertElements",
      0,
      arguments.length
    ]);
  }
}
function ic(e, t) {
  if (!e._cache.$bar) {
    const a = e.getMatchingVisibleMetas(t);
    let s = [];
    for (let n = 0, o = a.length; n < o; n++)
      s = s.concat(a[n].controller.getAllParsedValues(e));
    e._cache.$bar = Xo(s.sort((n, o) => n - o));
  }
  return e._cache.$bar;
}
function rc(e) {
  const t = e.iScale, a = ic(t, e.type);
  let s = t._length, n, o, i, r;
  const c = () => {
    i === 32767 || i === -32768 || (ha(r) && (s = Math.min(s, Math.abs(i - r) || s)), r = i);
  };
  for (n = 0, o = a.length; n < o; ++n)
    i = t.getPixelForValue(a[n]), c();
  for (r = void 0, n = 0, o = t.ticks.length; n < o; ++n)
    i = t.getPixelForTick(n), c();
  return s;
}
function lc(e, t, a, s) {
  const n = a.barThickness;
  let o, i;
  return pt(n) ? (o = t.min * a.categoryPercentage, i = a.barPercentage) : (o = n * s, i = 1), {
    chunk: o / s,
    ratio: i,
    start: t.pixels[e] - o / 2
  };
}
function cc(e, t, a, s) {
  const n = t.pixels, o = n[e];
  let i = e > 0 ? n[e - 1] : null, r = e < n.length - 1 ? n[e + 1] : null;
  const c = a.categoryPercentage;
  i === null && (i = o - (r === null ? t.end - t.start : r - o)), r === null && (r = o + o - i);
  const d = o - (o - Math.min(i, r)) / 2 * c;
  return {
    chunk: Math.abs(r - i) / 2 * c / s,
    ratio: a.barPercentage,
    start: d
  };
}
function dc(e, t, a, s) {
  const n = a.parse(e[0], s), o = a.parse(e[1], s), i = Math.min(n, o), r = Math.max(n, o);
  let c = i, d = r;
  Math.abs(i) > Math.abs(r) && (c = r, d = i), t[a.axis] = d, t._custom = {
    barStart: c,
    barEnd: d,
    start: n,
    end: o,
    min: i,
    max: r
  };
}
function gi(e, t, a, s) {
  return Mt(e) ? dc(e, t, a, s) : t[a.axis] = a.parse(e, s), t;
}
function Pn(e, t, a, s) {
  const n = e.iScale, o = e.vScale, i = n.getLabels(), r = n === o, c = [];
  let d, u, h, p;
  for (d = a, u = a + s; d < u; ++d)
    p = t[d], h = {}, h[n.axis] = r || n.parse(i[d], d), c.push(gi(p, h, o, d));
  return c;
}
function is(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function uc(e, t, a) {
  return e !== 0 ? Jt(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= a ? 1 : -1);
}
function hc(e) {
  let t, a, s, n, o;
  return e.horizontal ? (t = e.base > e.x, a = "left", s = "right") : (t = e.base < e.y, a = "bottom", s = "top"), t ? (n = "end", o = "start") : (n = "start", o = "end"), {
    start: a,
    end: s,
    reverse: t,
    top: n,
    bottom: o
  };
}
function fc(e, t, a, s) {
  let n = t.borderSkipped;
  const o = {};
  if (!n) {
    e.borderSkipped = o;
    return;
  }
  if (n === !0) {
    e.borderSkipped = {
      top: !0,
      right: !0,
      bottom: !0,
      left: !0
    };
    return;
  }
  const { start: i, end: r, reverse: c, top: d, bottom: u } = hc(e);
  n === "middle" && a && (e.enableBorderRadius = !0, (a._top || 0) === s ? n = d : (a._bottom || 0) === s ? n = u : (o[In(u, i, r, c)] = !0, n = d)), o[In(n, i, r, c)] = !0, e.borderSkipped = o;
}
function In(e, t, a, s) {
  return s ? (e = gc(e, t, a), e = Rn(e, a, t)) : e = Rn(e, t, a), e;
}
function gc(e, t, a) {
  return e === t ? a : e === a ? t : e;
}
function Rn(e, t, a) {
  return e === "start" ? t : e === "end" ? a : e;
}
function pc(e, { inflateAmount: t }, a) {
  e.inflateAmount = t === "auto" ? a === 1 ? 0.33 : 0 : t;
}
class vc extends Ua {
  static id = "bar";
  static defaults = {
    datasetElementType: !1,
    dataElementType: "bar",
    categoryPercentage: 0.8,
    barPercentage: 0.9,
    grouped: !0,
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "base",
          "width",
          "height"
        ]
      }
    }
  };
  static overrides = {
    scales: {
      _index_: {
        type: "category",
        offset: !0,
        grid: {
          offset: !0
        }
      },
      _value_: {
        type: "linear",
        beginAtZero: !0
      }
    }
  };
  parsePrimitiveData(t, a, s, n) {
    return Pn(t, a, s, n);
  }
  parseArrayData(t, a, s, n) {
    return Pn(t, a, s, n);
  }
  parseObjectData(t, a, s, n) {
    const { iScale: o, vScale: i } = t, { xAxisKey: r = "x", yAxisKey: c = "y" } = this._parsing, d = o.axis === "x" ? r : c, u = i.axis === "x" ? r : c, h = [];
    let p, v, f, m;
    for (p = s, v = s + n; p < v; ++p)
      m = a[p], f = {}, f[o.axis] = o.parse(Le(m, d), p), h.push(gi(Le(m, u), f, i, p));
    return h;
  }
  updateRangeFromParsed(t, a, s, n) {
    super.updateRangeFromParsed(t, a, s, n);
    const o = s._custom;
    o && a === this._cachedMeta.vScale && (t.min = Math.min(t.min, o.min), t.max = Math.max(t.max, o.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const a = this._cachedMeta, { iScale: s, vScale: n } = a, o = this.getParsed(t), i = o._custom, r = is(i) ? "[" + i.start + ", " + i.end + "]" : "" + n.getLabelForValue(o[n.axis]);
    return {
      label: "" + s.getLabelForValue(o[s.axis]),
      value: r
    };
  }
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
    const t = this._cachedMeta;
    t.stack = this.getDataset().stack;
  }
  update(t) {
    const a = this._cachedMeta;
    this.updateElements(a.data, 0, a.data.length, t);
  }
  updateElements(t, a, s, n) {
    const o = n === "reset", { index: i, _cachedMeta: { vScale: r } } = this, c = r.getBasePixel(), d = r.isHorizontal(), u = this._getRuler(), { sharedOptions: h, includeOptions: p } = this._getSharedOptions(a, n);
    for (let v = a; v < a + s; v++) {
      const f = this.getParsed(v), m = o || pt(f[r.axis]) ? {
        base: c,
        head: c
      } : this._calculateBarValuePixels(v), _ = this._calculateBarIndexPixels(v, u), g = (f._stacks || {})[r.axis], b = {
        horizontal: d,
        base: m.base,
        enableBorderRadius: !g || is(f._custom) || i === g._top || i === g._bottom,
        x: d ? m.head : _.center,
        y: d ? _.center : m.head,
        height: d ? _.size : Math.abs(m.size),
        width: d ? Math.abs(m.size) : _.size
      };
      p && (b.options = h || this.resolveDataElementOptions(v, t[v].active ? "active" : n));
      const k = b.options || t[v].options;
      fc(b, k, g, i), pc(b, k, u.ratio), this.updateElement(t[v], v, b, n);
    }
  }
  _getStacks(t, a) {
    const { iScale: s } = this._cachedMeta, n = s.getMatchingVisibleMetas(this._type).filter((u) => u.controller.options.grouped), o = s.options.stacked, i = [], r = this._cachedMeta.controller.getParsed(a), c = r && r[s.axis], d = (u) => {
      const h = u._parsed.find((v) => v[s.axis] === c), p = h && h[u.vScale.axis];
      if (pt(p) || isNaN(p))
        return !0;
    };
    for (const u of n)
      if (!(a !== void 0 && d(u)) && ((o === !1 || i.indexOf(u.stack) === -1 || o === void 0 && u.stack === void 0) && i.push(u.stack), u.index === t))
        break;
    return i.length || i.push(void 0), i;
  }
  _getStackCount(t) {
    return this._getStacks(void 0, t).length;
  }
  _getAxisCount() {
    return this._getAxis().length;
  }
  getFirstScaleIdForIndexAxis() {
    const t = this.chart.scales, a = this.chart.options.indexAxis;
    return Object.keys(t).filter((s) => t[s].axis === a).shift();
  }
  _getAxis() {
    const t = {}, a = this.getFirstScaleIdForIndexAxis();
    for (const s of this.chart.data.datasets)
      t[it(this.chart.options.indexAxis === "x" ? s.xAxisID : s.yAxisID, a)] = !0;
    return Object.keys(t);
  }
  _getStackIndex(t, a, s) {
    const n = this._getStacks(t, s), o = a !== void 0 ? n.indexOf(a) : -1;
    return o === -1 ? n.length - 1 : o;
  }
  _getRuler() {
    const t = this.options, a = this._cachedMeta, s = a.iScale, n = [];
    let o, i;
    for (o = 0, i = a.data.length; o < i; ++o)
      n.push(s.getPixelForValue(this.getParsed(o)[s.axis], o));
    const r = t.barThickness;
    return {
      min: r || rc(a),
      pixels: n,
      start: s._startPixel,
      end: s._endPixel,
      stackCount: this._getStackCount(),
      scale: s,
      grouped: t.grouped,
      ratio: r ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: a, _stacked: s, index: n }, options: { base: o, minBarLength: i } } = this, r = o || 0, c = this.getParsed(t), d = c._custom, u = is(d);
    let h = c[a.axis], p = 0, v = s ? this.applyStack(a, c, s) : h, f, m;
    v !== h && (p = v - h, v = h), u && (h = d.barStart, v = d.barEnd - d.barStart, h !== 0 && Jt(h) !== Jt(d.barEnd) && (p = 0), p += h);
    const _ = !pt(o) && !u ? o : p;
    let g = a.getPixelForValue(_);
    if (this.chart.getDataVisibility(t) ? f = a.getPixelForValue(p + v) : f = g, m = f - g, Math.abs(m) < i) {
      m = uc(m, a, r) * i, h === r && (g -= m / 2);
      const b = a.getPixelForDecimal(0), k = a.getPixelForDecimal(1), w = Math.min(b, k), M = Math.max(b, k);
      g = Math.max(Math.min(g, M), w), f = g + m, s && !u && (c._stacks[a.axis]._visualValues[n] = a.getValueForPixel(f) - a.getValueForPixel(g));
    }
    if (g === a.getPixelForValue(r)) {
      const b = Jt(m) * a.getLineWidthForValue(r) / 2;
      g += b, m -= b;
    }
    return {
      size: m,
      base: g,
      head: f,
      center: f + m / 2
    };
  }
  _calculateBarIndexPixels(t, a) {
    const s = a.scale, n = this.options, o = n.skipNull, i = it(n.maxBarThickness, 1 / 0);
    let r, c;
    const d = this._getAxisCount();
    if (a.grouped) {
      const u = o ? this._getStackCount(t) : a.stackCount, h = n.barThickness === "flex" ? cc(t, a, n, u * d) : lc(t, a, n, u * d), p = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, v = this._getAxis().indexOf(it(p, this.getFirstScaleIdForIndexAxis())), f = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + v;
      r = h.start + h.chunk * f + h.chunk / 2, c = Math.min(i, h.chunk * h.ratio);
    } else
      r = s.getPixelForValue(this.getParsed(t)[s.axis], t), c = Math.min(i, a.min * a.ratio);
    return {
      base: r - c / 2,
      head: r + c / 2,
      center: r,
      size: c
    };
  }
  draw() {
    const t = this._cachedMeta, a = t.vScale, s = t.data, n = s.length;
    let o = 0;
    for (; o < n; ++o)
      this.getParsed(o)[a.axis] !== null && !s[o].hidden && s[o].draw(this._ctx);
  }
}
function bc(e, t, a) {
  let s = 1, n = 1, o = 0, i = 0;
  if (t < _t) {
    const r = e, c = r + t, d = Math.cos(r), u = Math.sin(r), h = Math.cos(c), p = Math.sin(c), v = (k, w, M) => ga(k, r, c, !0) ? 1 : Math.max(w, w * a, M, M * a), f = (k, w, M) => ga(k, r, c, !0) ? -1 : Math.min(w, w * a, M, M * a), m = v(0, d, h), _ = v(Ct, u, p), g = f(mt, d, h), b = f(mt + Ct, u, p);
    s = (m - g) / 2, n = (_ - b) / 2, o = -(m + g) / 2, i = -(_ + b) / 2;
  }
  return {
    ratioX: s,
    ratioY: n,
    offsetX: o,
    offsetY: i
  };
}
class mc extends Ua {
  static id = "doughnut";
  static defaults = {
    datasetElementType: !1,
    dataElementType: "arc",
    animation: {
      animateRotate: !0,
      animateScale: !1
    },
    animations: {
      numbers: {
        type: "number",
        properties: [
          "circumference",
          "endAngle",
          "innerRadius",
          "outerRadius",
          "startAngle",
          "x",
          "y",
          "offset",
          "borderWidth",
          "spacing"
        ]
      }
    },
    cutout: "50%",
    rotation: 0,
    circumference: 360,
    radius: "100%",
    spacing: 0,
    indexAxis: "r"
  };
  static descriptors = {
    _scriptable: (t) => t !== "spacing",
    _indexable: (t) => t !== "spacing" && !t.startsWith("borderDash") && !t.startsWith("hoverBorderDash")
  };
  static overrides = {
    aspectRatio: 1,
    plugins: {
      legend: {
        labels: {
          generateLabels(t) {
            const a = t.data, { labels: { pointStyle: s, textAlign: n, color: o, useBorderRadius: i, borderRadius: r } } = t.legend.options;
            return a.labels.length && a.datasets.length ? a.labels.map((c, d) => {
              const h = t.getDatasetMeta(0).controller.getStyle(d);
              return {
                text: c,
                fillStyle: h.backgroundColor,
                fontColor: o,
                hidden: !t.getDataVisibility(d),
                lineDash: h.borderDash,
                lineDashOffset: h.borderDashOffset,
                lineJoin: h.borderJoinStyle,
                lineWidth: h.borderWidth,
                strokeStyle: h.borderColor,
                textAlign: n,
                pointStyle: s,
                borderRadius: i && (r || h.borderRadius),
                index: d
              };
            }) : [];
          }
        },
        onClick(t, a, s) {
          s.chart.toggleDataVisibility(a.index), s.chart.update();
        }
      }
    }
  };
  constructor(t, a) {
    super(t, a), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
  }
  linkScales() {
  }
  parse(t, a) {
    const s = this.getDataset().data, n = this._cachedMeta;
    if (this._parsing === !1)
      n._parsed = s;
    else {
      let o = (c) => +s[c];
      if (ht(s[t])) {
        const { key: c = "value" } = this._parsing;
        o = (d) => +Le(s[d], c);
      }
      let i, r;
      for (i = t, r = t + a; i < r; ++i)
        n._parsed[i] = o(i);
    }
  }
  _getRotation() {
    return ie(this.options.rotation - 90);
  }
  _getCircumference() {
    return ie(this.options.circumference);
  }
  _getRotationExtents() {
    let t = _t, a = -_t;
    for (let s = 0; s < this.chart.data.datasets.length; ++s)
      if (this.chart.isDatasetVisible(s) && this.chart.getDatasetMeta(s).type === this._type) {
        const n = this.chart.getDatasetMeta(s).controller, o = n._getRotation(), i = n._getCircumference();
        t = Math.min(t, o), a = Math.max(a, o + i);
      }
    return {
      rotation: t,
      circumference: a - t
    };
  }
  update(t) {
    const a = this.chart, { chartArea: s } = a, n = this._cachedMeta, o = n.data, i = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, r = Math.max((Math.min(s.width, s.height) - i) / 2, 0), c = Math.min($r(this.options.cutout, r), 1), d = this._getRingWeight(this.index), { circumference: u, rotation: h } = this._getRotationExtents(), { ratioX: p, ratioY: v, offsetX: f, offsetY: m } = bc(h, u, c), _ = (s.width - i) / p, g = (s.height - i) / v, b = Math.max(Math.min(_, g) / 2, 0), k = jo(this.options.radius, b), w = Math.max(k * c, 0), M = (k - w) / this._getVisibleDatasetWeightTotal();
    this.offsetX = f * k, this.offsetY = m * k, n.total = this.calculateTotal(), this.outerRadius = k - M * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - M * d, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, a) {
    const s = this.options, n = this._cachedMeta, o = this._getCircumference();
    return a && s.animation.animateRotate || !this.chart.getDataVisibility(t) || n._parsed[t] === null || n.data[t].hidden ? 0 : this.calculateCircumference(n._parsed[t] * o / _t);
  }
  updateElements(t, a, s, n) {
    const o = n === "reset", i = this.chart, r = i.chartArea, d = i.options.animation, u = (r.left + r.right) / 2, h = (r.top + r.bottom) / 2, p = o && d.animateScale, v = p ? 0 : this.innerRadius, f = p ? 0 : this.outerRadius, { sharedOptions: m, includeOptions: _ } = this._getSharedOptions(a, n);
    let g = this._getRotation(), b;
    for (b = 0; b < a; ++b)
      g += this._circumference(b, o);
    for (b = a; b < a + s; ++b) {
      const k = this._circumference(b, o), w = t[b], M = {
        x: u + this.offsetX,
        y: h + this.offsetY,
        startAngle: g,
        endAngle: g + k,
        circumference: k,
        outerRadius: f,
        innerRadius: v
      };
      _ && (M.options = m || this.resolveDataElementOptions(b, w.active ? "active" : n)), g += k, this.updateElement(w, b, M, n);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, a = t.data;
    let s = 0, n;
    for (n = 0; n < a.length; n++) {
      const o = t._parsed[n];
      o !== null && !isNaN(o) && this.chart.getDataVisibility(n) && !a[n].hidden && (s += Math.abs(o));
    }
    return s;
  }
  calculateCircumference(t) {
    const a = this._cachedMeta.total;
    return a > 0 && !isNaN(t) ? _t * (Math.abs(t) / a) : 0;
  }
  getLabelAndValue(t) {
    const a = this._cachedMeta, s = this.chart, n = s.data.labels || [], o = js(a._parsed[t], s.options.locale);
    return {
      label: n[t] || "",
      value: o
    };
  }
  getMaxBorderWidth(t) {
    let a = 0;
    const s = this.chart;
    let n, o, i, r, c;
    if (!t) {
      for (n = 0, o = s.data.datasets.length; n < o; ++n)
        if (s.isDatasetVisible(n)) {
          i = s.getDatasetMeta(n), t = i.data, r = i.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (n = 0, o = t.length; n < o; ++n)
      c = r.resolveDataElementOptions(n), c.borderAlign !== "inner" && (a = Math.max(a, c.borderWidth || 0, c.hoverBorderWidth || 0));
    return a;
  }
  getMaxOffset(t) {
    let a = 0;
    for (let s = 0, n = t.length; s < n; ++s) {
      const o = this.resolveDataElementOptions(s);
      a = Math.max(a, o.offset || 0, o.hoverOffset || 0);
    }
    return a;
  }
  _getRingWeightOffset(t) {
    let a = 0;
    for (let s = 0; s < t; ++s)
      this.chart.isDatasetVisible(s) && (a += this._getRingWeight(s));
    return a;
  }
  _getRingWeight(t) {
    return Math.max(it(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class yc extends Ua {
  static id = "line";
  static defaults = {
    datasetElementType: "line",
    dataElementType: "point",
    showLine: !0,
    spanGaps: !1
  };
  static overrides = {
    scales: {
      _index_: {
        type: "category"
      },
      _value_: {
        type: "linear"
      }
    }
  };
  initialize() {
    this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
  }
  update(t) {
    const a = this._cachedMeta, { dataset: s, data: n = [], _dataset: o } = a, i = this.chart._animationsDisabled;
    let { start: r, count: c } = jr(a, n, i);
    this._drawStart = r, this._drawCount = c, Yr(a) && (r = 0, c = n.length), s._chart = this.chart, s._datasetIndex = this.index, s._decimated = !!o._decimated, s.points = n;
    const d = this.resolveDatasetElementOptions(t);
    this.options.showLine || (d.borderWidth = 0), d.segment = this.options.segment, this.updateElement(s, void 0, {
      animated: !i,
      options: d
    }, t), this.updateElements(n, r, c, t);
  }
  updateElements(t, a, s, n) {
    const o = n === "reset", { iScale: i, vScale: r, _stacked: c, _dataset: d } = this._cachedMeta, { sharedOptions: u, includeOptions: h } = this._getSharedOptions(a, n), p = i.axis, v = r.axis, { spanGaps: f, segment: m } = this.options, _ = fa(f) ? f : Number.POSITIVE_INFINITY, g = this.chart._animationsDisabled || o || n === "none", b = a + s, k = t.length;
    let w = a > 0 && this.getParsed(a - 1);
    for (let M = 0; M < k; ++M) {
      const S = t[M], D = g ? S : {};
      if (M < a || M >= b) {
        D.skip = !0;
        continue;
      }
      const A = this.getParsed(M), T = pt(A[v]), B = D[p] = i.getPixelForValue(A[p], M), F = D[v] = o || T ? r.getBasePixel() : r.getPixelForValue(c ? this.applyStack(r, A, c) : A[v], M);
      D.skip = isNaN(B) || isNaN(F) || T, D.stop = M > 0 && Math.abs(A[p] - w[p]) > _, m && (D.parsed = A, D.raw = d.data[M]), h && (D.options = u || this.resolveDataElementOptions(M, S.active ? "active" : n)), g || this.updateElement(S, M, D, n), w = A;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, a = t.dataset, s = a.options && a.options.borderWidth || 0, n = t.data || [];
    if (!n.length)
      return s;
    const o = n[0].size(this.resolveDataElementOptions(0)), i = n[n.length - 1].size(this.resolveDataElementOptions(n.length - 1));
    return Math.max(s, o, i) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
class _c extends mc {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function Me() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class Zs {
  /**
  * Override default date adapter methods.
  * Accepts type parameter to define options type.
  * @example
  * Chart._adapters._date.override<{myAdapterOption: string}>({
  *   init() {
  *     console.log(this.options.myAdapterOption);
  *   }
  * })
  */
  static override(t) {
    Object.assign(Zs.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return Me();
  }
  parse() {
    return Me();
  }
  format() {
    return Me();
  }
  add() {
    return Me();
  }
  diff() {
    return Me();
  }
  startOf() {
    return Me();
  }
  endOf() {
    return Me();
  }
}
var xc = {
  _date: Zs
};
function kc(e, t, a, s) {
  const { controller: n, data: o, _sorted: i } = e, r = n._cachedMeta.iScale, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (r && t === r.axis && t !== "r" && i && o.length) {
    const d = r._reversePixels ? zr : Ae;
    if (s) {
      if (n._sharedOptions) {
        const u = o[0], h = typeof u.getRange == "function" && u.getRange(t);
        if (h) {
          const p = d(o, t, a - h), v = d(o, t, a + h);
          return {
            lo: p.lo,
            hi: v.hi
          };
        }
      }
    } else {
      const u = d(o, t, a);
      if (c) {
        const { vScale: h } = n._cachedMeta, { _parsed: p } = e, v = p.slice(0, u.lo + 1).reverse().findIndex((m) => !pt(m[h.axis]));
        u.lo -= Math.max(0, v);
        const f = p.slice(u.hi).findIndex((m) => !pt(m[h.axis]));
        u.hi += Math.max(0, f);
      }
      return u;
    }
  }
  return {
    lo: 0,
    hi: o.length - 1
  };
}
function Ka(e, t, a, s, n) {
  const o = e.getSortedVisibleDatasetMetas(), i = a[t];
  for (let r = 0, c = o.length; r < c; ++r) {
    const { index: d, data: u } = o[r], { lo: h, hi: p } = kc(o[r], t, i, n);
    for (let v = h; v <= p; ++v) {
      const f = u[v];
      f.skip || s(f, d, v);
    }
  }
}
function wc(e) {
  const t = e.indexOf("x") !== -1, a = e.indexOf("y") !== -1;
  return function(s, n) {
    const o = t ? Math.abs(s.x - n.x) : 0, i = a ? Math.abs(s.y - n.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(i, 2));
  };
}
function rs(e, t, a, s, n) {
  const o = [];
  return !n && !e.isPointInArea(t) || Ka(e, a, t, function(r, c, d) {
    !n && !pa(r, e.chartArea, 0) || r.inRange(t.x, t.y, s) && o.push({
      element: r,
      datasetIndex: c,
      index: d
    });
  }, !0), o;
}
function $c(e, t, a, s) {
  let n = [];
  function o(i, r, c) {
    const { startAngle: d, endAngle: u } = i.getProps([
      "startAngle",
      "endAngle"
    ], s), { angle: h } = Uo(i, {
      x: t.x,
      y: t.y
    });
    ga(h, d, u) && n.push({
      element: i,
      datasetIndex: r,
      index: c
    });
  }
  return Ka(e, a, t, o), n;
}
function Mc(e, t, a, s, n, o) {
  let i = [];
  const r = wc(a);
  let c = Number.POSITIVE_INFINITY;
  function d(u, h, p) {
    const v = u.inRange(t.x, t.y, n);
    if (s && !v)
      return;
    const f = u.getCenterPoint(n);
    if (!(!!o || e.isPointInArea(f)) && !v)
      return;
    const _ = r(t, f);
    _ < c ? (i = [
      {
        element: u,
        datasetIndex: h,
        index: p
      }
    ], c = _) : _ === c && i.push({
      element: u,
      datasetIndex: h,
      index: p
    });
  }
  return Ka(e, a, t, d), i;
}
function ls(e, t, a, s, n, o) {
  return !o && !e.isPointInArea(t) ? [] : a === "r" && !s ? $c(e, t, a, n) : Mc(e, t, a, s, n, o);
}
function En(e, t, a, s, n) {
  const o = [], i = a === "x" ? "inXRange" : "inYRange";
  let r = !1;
  return Ka(e, a, t, (c, d, u) => {
    c[i] && c[i](t[a], n) && (o.push({
      element: c,
      datasetIndex: d,
      index: u
    }), r = r || c.inRange(t.x, t.y, n));
  }), s && !r ? [] : o;
}
var Sc = {
  modes: {
    index(e, t, a, s) {
      const n = Ce(t, e), o = a.axis || "x", i = a.includeInvisible || !1, r = a.intersect ? rs(e, n, o, s, i) : ls(e, n, o, !1, s, i), c = [];
      return r.length ? (e.getSortedVisibleDatasetMetas().forEach((d) => {
        const u = r[0].index, h = d.data[u];
        h && !h.skip && c.push({
          element: h,
          datasetIndex: d.index,
          index: u
        });
      }), c) : [];
    },
    dataset(e, t, a, s) {
      const n = Ce(t, e), o = a.axis || "xy", i = a.includeInvisible || !1;
      let r = a.intersect ? rs(e, n, o, s, i) : ls(e, n, o, !1, s, i);
      if (r.length > 0) {
        const c = r[0].datasetIndex, d = e.getDatasetMeta(c).data;
        r = [];
        for (let u = 0; u < d.length; ++u)
          r.push({
            element: d[u],
            datasetIndex: c,
            index: u
          });
      }
      return r;
    },
    point(e, t, a, s) {
      const n = Ce(t, e), o = a.axis || "xy", i = a.includeInvisible || !1;
      return rs(e, n, o, s, i);
    },
    nearest(e, t, a, s) {
      const n = Ce(t, e), o = a.axis || "xy", i = a.includeInvisible || !1;
      return ls(e, n, o, a.intersect, s, i);
    },
    x(e, t, a, s) {
      const n = Ce(t, e);
      return En(e, n, "x", a.intersect, s);
    },
    y(e, t, a, s) {
      const n = Ce(t, e);
      return En(e, n, "y", a.intersect, s);
    }
  }
};
const pi = [
  "left",
  "top",
  "right",
  "bottom"
];
function Xe(e, t) {
  return e.filter((a) => a.pos === t);
}
function On(e, t) {
  return e.filter((a) => pi.indexOf(a.pos) === -1 && a.box.axis === t);
}
function Ge(e, t) {
  return e.sort((a, s) => {
    const n = t ? s : a, o = t ? a : s;
    return n.weight === o.weight ? n.index - o.index : n.weight - o.weight;
  });
}
function Cc(e) {
  const t = [];
  let a, s, n, o, i, r;
  for (a = 0, s = (e || []).length; a < s; ++a)
    n = e[a], { position: o, options: { stack: i, stackWeight: r = 1 } } = n, t.push({
      index: a,
      box: n,
      pos: o,
      horizontal: n.isHorizontal(),
      weight: n.weight,
      stack: i && o + i,
      stackWeight: r
    });
  return t;
}
function Dc(e) {
  const t = {};
  for (const a of e) {
    const { stack: s, pos: n, stackWeight: o } = a;
    if (!s || !pi.includes(n))
      continue;
    const i = t[s] || (t[s] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    i.count++, i.weight += o;
  }
  return t;
}
function Ac(e, t) {
  const a = Dc(e), { vBoxMaxWidth: s, hBoxMaxHeight: n } = t;
  let o, i, r;
  for (o = 0, i = e.length; o < i; ++o) {
    r = e[o];
    const { fullSize: c } = r.box, d = a[r.stack], u = d && r.stackWeight / d.weight;
    r.horizontal ? (r.width = u ? u * s : c && t.availableWidth, r.height = n) : (r.width = s, r.height = u ? u * n : c && t.availableHeight);
  }
  return a;
}
function Tc(e) {
  const t = Cc(e), a = Ge(t.filter((d) => d.box.fullSize), !0), s = Ge(Xe(t, "left"), !0), n = Ge(Xe(t, "right")), o = Ge(Xe(t, "top"), !0), i = Ge(Xe(t, "bottom")), r = On(t, "x"), c = On(t, "y");
  return {
    fullSize: a,
    leftAndTop: s.concat(o),
    rightAndBottom: n.concat(c).concat(i).concat(r),
    chartArea: Xe(t, "chartArea"),
    vertical: s.concat(n).concat(c),
    horizontal: o.concat(i).concat(r)
  };
}
function zn(e, t, a, s) {
  return Math.max(e[a], t[a]) + Math.max(e[s], t[s]);
}
function vi(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Bc(e, t, a, s) {
  const { pos: n, box: o } = a, i = e.maxPadding;
  if (!ht(n)) {
    a.size && (e[n] -= a.size);
    const h = s[a.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, a.horizontal ? o.height : o.width), a.size = h.size / h.count, e[n] += a.size;
  }
  o.getPadding && vi(i, o.getPadding());
  const r = Math.max(0, t.outerWidth - zn(i, e, "left", "right")), c = Math.max(0, t.outerHeight - zn(i, e, "top", "bottom")), d = r !== e.w, u = c !== e.h;
  return e.w = r, e.h = c, a.horizontal ? {
    same: d,
    other: u
  } : {
    same: u,
    other: d
  };
}
function Lc(e) {
  const t = e.maxPadding;
  function a(s) {
    const n = Math.max(t[s] - e[s], 0);
    return e[s] += n, n;
  }
  e.y += a("top"), e.x += a("left"), a("right"), a("bottom");
}
function Fc(e, t) {
  const a = t.maxPadding;
  function s(n) {
    const o = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return n.forEach((i) => {
      o[i] = Math.max(t[i], a[i]);
    }), o;
  }
  return s(e ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function aa(e, t, a, s) {
  const n = [];
  let o, i, r, c, d, u;
  for (o = 0, i = e.length, d = 0; o < i; ++o) {
    r = e[o], c = r.box, c.update(r.width || t.w, r.height || t.h, Fc(r.horizontal, t));
    const { same: h, other: p } = Bc(t, a, r, s);
    d |= h && n.length, u = u || p, c.fullSize || n.push(r);
  }
  return d && aa(n, t, a, s) || u;
}
function Ca(e, t, a, s, n) {
  e.top = a, e.left = t, e.right = t + s, e.bottom = a + n, e.width = s, e.height = n;
}
function Vn(e, t, a, s) {
  const n = a.padding;
  let { x: o, y: i } = t;
  for (const r of e) {
    const c = r.box, d = s[r.stack] || {
      placed: 0,
      weight: 1
    }, u = r.stackWeight / d.weight || 1;
    if (r.horizontal) {
      const h = t.w * u, p = d.size || c.height;
      ha(d.start) && (i = d.start), c.fullSize ? Ca(c, n.left, i, a.outerWidth - n.right - n.left, p) : Ca(c, t.left + d.placed, i, h, p), d.start = i, d.placed += h, i = c.bottom;
    } else {
      const h = t.h * u, p = d.size || c.width;
      ha(d.start) && (o = d.start), c.fullSize ? Ca(c, o, n.top, p, a.outerHeight - n.bottom - n.top) : Ca(c, o, t.top + d.placed, p, h), d.start = o, d.placed += h, o = c.right;
    }
  }
  t.x = o, t.y = i;
}
var jt = {
  addBox(e, t) {
    e.boxes || (e.boxes = []), t.fullSize = t.fullSize || !1, t.position = t.position || "top", t.weight = t.weight || 0, t._layers = t._layers || function() {
      return [
        {
          z: 0,
          draw(a) {
            t.draw(a);
          }
        }
      ];
    }, e.boxes.push(t);
  },
  removeBox(e, t) {
    const a = e.boxes ? e.boxes.indexOf(t) : -1;
    a !== -1 && e.boxes.splice(a, 1);
  },
  configure(e, t, a) {
    t.fullSize = a.fullSize, t.position = a.position, t.weight = a.weight;
  },
  update(e, t, a, s) {
    if (!e)
      return;
    const n = qt(e.options.layout.padding), o = Math.max(t - n.width, 0), i = Math.max(a - n.height, 0), r = Tc(e.boxes), c = r.vertical, d = r.horizontal;
    vt(e.boxes, (m) => {
      typeof m.beforeLayout == "function" && m.beforeLayout();
    });
    const u = c.reduce((m, _) => _.box.options && _.box.options.display === !1 ? m : m + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: a,
      padding: n,
      availableWidth: o,
      availableHeight: i,
      vBoxMaxWidth: o / 2 / u,
      hBoxMaxHeight: i / 2
    }), p = Object.assign({}, n);
    vi(p, qt(s));
    const v = Object.assign({
      maxPadding: p,
      w: o,
      h: i,
      x: n.left,
      y: n.top
    }, n), f = Ac(c.concat(d), h);
    aa(r.fullSize, v, h, f), aa(c, v, h, f), aa(d, v, h, f) && aa(c, v, h, f), Lc(v), Vn(r.leftAndTop, v, h, f), v.x += v.w, v.y += v.h, Vn(r.rightAndBottom, v, h, f), e.chartArea = {
      left: v.left,
      top: v.top,
      right: v.left + v.w,
      bottom: v.top + v.h,
      height: v.h,
      width: v.w
    }, vt(r.chartArea, (m) => {
      const _ = m.box;
      Object.assign(_, e.chartArea), _.update(v.w, v.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class bi {
  acquireContext(t, a) {
  }
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, a, s) {
  }
  removeEventListener(t, a, s) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, a, s, n) {
    return a = Math.max(0, a || t.width), s = s || t.height, {
      width: a,
      height: Math.max(0, n ? Math.floor(a / n) : s)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class Pc extends bi {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const Fa = "$chartjs", Ic = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Nn = (e) => e === null || e === "";
function Rc(e, t) {
  const a = e.style, s = e.getAttribute("height"), n = e.getAttribute("width");
  if (e[Fa] = {
    initial: {
      height: s,
      width: n,
      style: {
        display: a.display,
        height: a.height,
        width: a.width
      }
    }
  }, a.display = a.display || "block", a.boxSizing = a.boxSizing || "border-box", Nn(n)) {
    const o = $n(e, "width");
    o !== void 0 && (e.width = o);
  }
  if (Nn(s))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const o = $n(e, "height");
      o !== void 0 && (e.height = o);
    }
  return e;
}
const mi = Pl ? {
  passive: !0
} : !1;
function Ec(e, t, a) {
  e && e.addEventListener(t, a, mi);
}
function Oc(e, t, a) {
  e && e.canvas && e.canvas.removeEventListener(t, a, mi);
}
function zc(e, t) {
  const a = Ic[e.type] || e.type, { x: s, y: n } = Ce(e, t);
  return {
    type: a,
    chart: t,
    native: e,
    x: s !== void 0 ? s : null,
    y: n !== void 0 ? n : null
  };
}
function Wa(e, t) {
  for (const a of e)
    if (a === t || a.contains(t))
      return !0;
}
function Vc(e, t, a) {
  const s = e.canvas, n = new MutationObserver((o) => {
    let i = !1;
    for (const r of o)
      i = i || Wa(r.addedNodes, s), i = i && !Wa(r.removedNodes, s);
    i && a();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
function Nc(e, t, a) {
  const s = e.canvas, n = new MutationObserver((o) => {
    let i = !1;
    for (const r of o)
      i = i || Wa(r.removedNodes, s), i = i && !Wa(r.addedNodes, s);
    i && a();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
const ba = /* @__PURE__ */ new Map();
let Wn = 0;
function yi() {
  const e = window.devicePixelRatio;
  e !== Wn && (Wn = e, ba.forEach((t, a) => {
    a.currentDevicePixelRatio !== e && t();
  }));
}
function Wc(e, t) {
  ba.size || window.addEventListener("resize", yi), ba.set(e, t);
}
function Hc(e) {
  ba.delete(e), ba.size || window.removeEventListener("resize", yi);
}
function jc(e, t, a) {
  const s = e.canvas, n = s && Gs(s);
  if (!n)
    return;
  const o = Zo((r, c) => {
    const d = n.clientWidth;
    a(r, c), d < n.clientWidth && a();
  }, window), i = new ResizeObserver((r) => {
    const c = r[0], d = c.contentRect.width, u = c.contentRect.height;
    d === 0 && u === 0 || o(d, u);
  });
  return i.observe(n), Wc(e, o), i;
}
function cs(e, t, a) {
  a && a.disconnect(), t === "resize" && Hc(e);
}
function Yc(e, t, a) {
  const s = e.canvas, n = Zo((o) => {
    e.ctx !== null && a(zc(o, e));
  }, e);
  return Ec(s, t, n), n;
}
class qc extends bi {
  acquireContext(t, a) {
    const s = t && t.getContext && t.getContext("2d");
    return s && s.canvas === t ? (Rc(t, a), s) : null;
  }
  releaseContext(t) {
    const a = t.canvas;
    if (!a[Fa])
      return !1;
    const s = a[Fa].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const i = s[o];
      pt(i) ? a.removeAttribute(o) : a.setAttribute(o, i);
    });
    const n = s.style || {};
    return Object.keys(n).forEach((o) => {
      a.style[o] = n[o];
    }), a.width = a.width, delete a[Fa], !0;
  }
  addEventListener(t, a, s) {
    this.removeEventListener(t, a);
    const n = t.$proxies || (t.$proxies = {}), i = {
      attach: Vc,
      detach: Nc,
      resize: jc
    }[a] || Yc;
    n[a] = i(t, a, s);
  }
  removeEventListener(t, a) {
    const s = t.$proxies || (t.$proxies = {}), n = s[a];
    if (!n)
      return;
    ({
      attach: cs,
      detach: cs,
      resize: cs
    }[a] || Oc)(t, a, n), s[a] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, a, s, n) {
    return Fl(t, a, s, n);
  }
  isAttached(t) {
    const a = t && Gs(t);
    return !!(a && a.isConnected);
  }
}
function Uc(e) {
  return !Xs() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Pc : qc;
}
let ce = class {
  static defaults = {};
  static defaultRoutes = void 0;
  x;
  y;
  active = !1;
  options;
  $animations;
  tooltipPosition(t) {
    const { x: a, y: s } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: a,
      y: s
    };
  }
  hasValue() {
    return fa(this.x) && fa(this.y);
  }
  getProps(t, a) {
    const s = this.$animations;
    if (!a || !s)
      return this;
    const n = {};
    return t.forEach((o) => {
      n[o] = s[o] && s[o].active() ? s[o]._to : this[o];
    }), n;
  }
};
function Kc(e, t) {
  const a = e.options.ticks, s = Xc(e), n = Math.min(a.maxTicksLimit || s, s), o = a.major.enabled ? Zc(t) : [], i = o.length, r = o[0], c = o[i - 1], d = [];
  if (i > n)
    return Qc(t, d, o, i / n), d;
  const u = Gc(o, t, n);
  if (i > 0) {
    let h, p;
    const v = i > 1 ? Math.round((c - r) / (i - 1)) : null;
    for (Da(t, d, u, pt(v) ? 0 : r - v, r), h = 0, p = i - 1; h < p; h++)
      Da(t, d, u, o[h], o[h + 1]);
    return Da(t, d, u, c, pt(v) ? t.length : c + v), d;
  }
  return Da(t, d, u), d;
}
function Xc(e) {
  const t = e.options.offset, a = e._tickSize(), s = e._length / a + (t ? 0 : 1), n = e._maxLength / a;
  return Math.floor(Math.min(s, n));
}
function Gc(e, t, a) {
  const s = Jc(e), n = t.length / a;
  if (!s)
    return Math.max(n, 1);
  const o = Lr(s);
  for (let i = 0, r = o.length - 1; i < r; i++) {
    const c = o[i];
    if (c > n)
      return c;
  }
  return Math.max(n, 1);
}
function Zc(e) {
  const t = [];
  let a, s;
  for (a = 0, s = e.length; a < s; a++)
    e[a].major && t.push(a);
  return t;
}
function Qc(e, t, a, s) {
  let n = 0, o = a[0], i;
  for (s = Math.ceil(s), i = 0; i < e.length; i++)
    i === o && (t.push(e[i]), n++, o = a[n * s]);
}
function Da(e, t, a, s, n) {
  const o = it(s, 0), i = Math.min(it(n, e.length), e.length);
  let r = 0, c, d, u;
  for (a = Math.ceil(a), n && (c = n - s, a = c / Math.floor(c / a)), u = o; u < 0; )
    r++, u = Math.round(o + r * a);
  for (d = Math.max(o, 0); d < i; d++)
    d === u && (t.push(e[d]), r++, u = Math.round(o + r * a));
}
function Jc(e) {
  const t = e.length;
  let a, s;
  if (t < 2)
    return !1;
  for (s = e[0], a = 1; a < t; ++a)
    if (e[a] - e[a - 1] !== s)
      return !1;
  return s;
}
const td = (e) => e === "left" ? "right" : e === "right" ? "left" : e, Hn = (e, t, a) => t === "top" || t === "left" ? e[t] + a : e[t] - a, jn = (e, t) => Math.min(t || e, e);
function Yn(e, t) {
  const a = [], s = e.length / t, n = e.length;
  let o = 0;
  for (; o < n; o += s)
    a.push(e[Math.floor(o)]);
  return a;
}
function ed(e, t, a) {
  const s = e.ticks.length, n = Math.min(t, s - 1), o = e._startPixel, i = e._endPixel, r = 1e-6;
  let c = e.getPixelForTick(n), d;
  if (!(a && (s === 1 ? d = Math.max(c - o, i - c) : t === 0 ? d = (e.getPixelForTick(1) - c) / 2 : d = (c - e.getPixelForTick(n - 1)) / 2, c += n < t ? d : -d, c < o - r || c > i + r)))
    return c;
}
function ad(e, t) {
  vt(e, (a) => {
    const s = a.gc, n = s.length / 2;
    let o;
    if (n > t) {
      for (o = 0; o < n; ++o)
        delete a.data[s[o]];
      s.splice(0, n);
    }
  });
}
function Ze(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function qn(e, t) {
  if (!e.display)
    return 0;
  const a = Lt(e.font, t), s = qt(e.padding);
  return (Mt(e.text) ? e.text.length : 1) * a.lineHeight + s.height;
}
function sd(e, t) {
  return Ie(e, {
    scale: t,
    type: "scale"
  });
}
function nd(e, t, a) {
  return Ie(e, {
    tick: a,
    index: t,
    type: "tick"
  });
}
function od(e, t, a) {
  let s = Ws(e);
  return (a && t !== "right" || !a && t === "right") && (s = td(s)), s;
}
function id(e, t, a, s) {
  const { top: n, left: o, bottom: i, right: r, chart: c } = e, { chartArea: d, scales: u } = c;
  let h = 0, p, v, f;
  const m = i - n, _ = r - o;
  if (e.isHorizontal()) {
    if (v = Tt(s, o, r), ht(a)) {
      const g = Object.keys(a)[0], b = a[g];
      f = u[g].getPixelForValue(b) + m - t;
    } else a === "center" ? f = (d.bottom + d.top) / 2 + m - t : f = Hn(e, a, t);
    p = r - o;
  } else {
    if (ht(a)) {
      const g = Object.keys(a)[0], b = a[g];
      v = u[g].getPixelForValue(b) - _ + t;
    } else a === "center" ? v = (d.left + d.right) / 2 - _ + t : v = Hn(e, a, t);
    f = Tt(s, i, n), h = a === "left" ? -Ct : Ct;
  }
  return {
    titleX: v,
    titleY: f,
    maxWidth: p,
    rotation: h
  };
}
class je extends ce {
  constructor(t) {
    super(), this.id = t.id, this.type = t.type, this.options = void 0, this.ctx = t.ctx, this.chart = t.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0;
  }
  init(t) {
    this.options = t.setContext(this.getContext()), this.axis = t.axis, this._userMin = this.parse(t.min), this._userMax = this.parse(t.max), this._suggestedMin = this.parse(t.suggestedMin), this._suggestedMax = this.parse(t.suggestedMax);
  }
  parse(t, a) {
    return t;
  }
  getUserBounds() {
    let { _userMin: t, _userMax: a, _suggestedMin: s, _suggestedMax: n } = this;
    return t = Xt(t, Number.POSITIVE_INFINITY), a = Xt(a, Number.NEGATIVE_INFINITY), s = Xt(s, Number.POSITIVE_INFINITY), n = Xt(n, Number.NEGATIVE_INFINITY), {
      min: Xt(t, s),
      max: Xt(a, n),
      minDefined: Pt(t),
      maxDefined: Pt(a)
    };
  }
  getMinMax(t) {
    let { min: a, max: s, minDefined: n, maxDefined: o } = this.getUserBounds(), i;
    if (n && o)
      return {
        min: a,
        max: s
      };
    const r = this.getMatchingVisibleMetas();
    for (let c = 0, d = r.length; c < d; ++c)
      i = r[c].controller.getMinMax(this, t), n || (a = Math.min(a, i.min)), o || (s = Math.max(s, i.max));
    return a = o && a > s ? s : a, s = n && a > s ? a : s, {
      min: Xt(a, Xt(s, a)),
      max: Xt(s, Xt(a, s))
    };
  }
  getPadding() {
    return {
      left: this.paddingLeft || 0,
      top: this.paddingTop || 0,
      right: this.paddingRight || 0,
      bottom: this.paddingBottom || 0
    };
  }
  getTicks() {
    return this.ticks;
  }
  getLabels() {
    const t = this.chart.data;
    return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels || [];
  }
  getLabelItems(t = this.chart.chartArea) {
    return this._labelItems || (this._labelItems = this._computeLabelItems(t));
  }
  beforeLayout() {
    this._cache = {}, this._dataLimitsCached = !1;
  }
  beforeUpdate() {
    yt(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, a, s) {
    const { beginAtZero: n, grace: o, ticks: i } = this.options, r = i.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = a, this._margins = s = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, s), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + s.left + s.right : this.height + s.top + s.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = ul(this, o, n), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const c = r < this.ticks.length;
    this._convertTicksToLabels(c ? Yn(this.ticks, r) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = Kc(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), c && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, a, s;
    this.isHorizontal() ? (a = this.left, s = this.right) : (a = this.top, s = this.bottom, t = !t), this._startPixel = a, this._endPixel = s, this._reversePixels = t, this._length = s - a, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    yt(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    yt(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    yt(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), yt(this.options[t], [
      this
    ]);
  }
  beforeDataLimits() {
    this._callHooks("beforeDataLimits");
  }
  determineDataLimits() {
  }
  afterDataLimits() {
    this._callHooks("afterDataLimits");
  }
  beforeBuildTicks() {
    this._callHooks("beforeBuildTicks");
  }
  buildTicks() {
    return [];
  }
  afterBuildTicks() {
    this._callHooks("afterBuildTicks");
  }
  beforeTickToLabelConversion() {
    yt(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const a = this.options.ticks;
    let s, n, o;
    for (s = 0, n = t.length; s < n; s++)
      o = t[s], o.label = yt(a.callback, [
        o.value,
        s,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    yt(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    yt(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, a = t.ticks, s = jn(this.ticks.length, t.ticks.maxTicksLimit), n = a.minRotation || 0, o = a.maxRotation;
    let i = n, r, c, d;
    if (!this._isVisible() || !a.display || n >= o || s <= 1 || !this.isHorizontal()) {
      this.labelRotation = n;
      return;
    }
    const u = this._getLabelSizes(), h = u.widest.width, p = u.highest.height, v = Bt(this.chart.width - h, 0, this.maxWidth);
    r = t.offset ? this.maxWidth / s : v / (s - 1), h + 6 > r && (r = v / (s - (t.offset ? 0.5 : 1)), c = this.maxHeight - Ze(t.grid) - a.padding - qn(t.title, this.chart.options.font), d = Math.sqrt(h * h + p * p), i = Rr(Math.min(Math.asin(Bt((u.highest.height + 6) / r, -1, 1)), Math.asin(Bt(c / d, -1, 1)) - Math.asin(Bt(p / d, -1, 1)))), i = Math.max(n, Math.min(o, i))), this.labelRotation = i;
  }
  afterCalculateLabelRotation() {
    yt(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    yt(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: a, options: { ticks: s, title: n, grid: o } } = this, i = this._isVisible(), r = this.isHorizontal();
    if (i) {
      const c = qn(n, a.options.font);
      if (r ? (t.width = this.maxWidth, t.height = Ze(o) + c) : (t.height = this.maxHeight, t.width = Ze(o) + c), s.display && this.ticks.length) {
        const { first: d, last: u, widest: h, highest: p } = this._getLabelSizes(), v = s.padding * 2, f = ie(this.labelRotation), m = Math.cos(f), _ = Math.sin(f);
        if (r) {
          const g = s.mirror ? 0 : _ * h.width + m * p.height;
          t.height = Math.min(this.maxHeight, t.height + g + v);
        } else {
          const g = s.mirror ? 0 : m * h.width + _ * p.height;
          t.width = Math.min(this.maxWidth, t.width + g + v);
        }
        this._calculatePadding(d, u, _, m);
      }
    }
    this._handleMargins(), r ? (this.width = this._length = a.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = a.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, a, s, n) {
    const { ticks: { align: o, padding: i }, position: r } = this.options, c = this.labelRotation !== 0, d = r !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const u = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let p = 0, v = 0;
      c ? d ? (p = n * t.width, v = s * a.height) : (p = s * t.height, v = n * a.width) : o === "start" ? v = a.width : o === "end" ? p = t.width : o !== "inner" && (p = t.width / 2, v = a.width / 2), this.paddingLeft = Math.max((p - u + i) * this.width / (this.width - u), 0), this.paddingRight = Math.max((v - h + i) * this.width / (this.width - h), 0);
    } else {
      let u = a.height / 2, h = t.height / 2;
      o === "start" ? (u = 0, h = t.height) : o === "end" && (u = a.height, h = 0), this.paddingTop = u + i, this.paddingBottom = h + i;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    yt(this.options.afterFit, [
      this
    ]);
  }
  isHorizontal() {
    const { axis: t, position: a } = this.options;
    return a === "top" || a === "bottom" || t === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(t) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(t);
    let a, s;
    for (a = 0, s = t.length; a < s; a++)
      pt(t[a].label) && (t.splice(a, 1), s--, a--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const a = this.options.ticks.sampleSize;
      let s = this.ticks;
      a < s.length && (s = Yn(s, a)), this._labelSizes = t = this._computeLabelSizes(s, s.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, a, s) {
    const { ctx: n, _longestTextCache: o } = this, i = [], r = [], c = Math.floor(a / jn(a, s));
    let d = 0, u = 0, h, p, v, f, m, _, g, b, k, w, M;
    for (h = 0; h < a; h += c) {
      if (f = t[h].label, m = this._resolveTickFontOptions(h), n.font = _ = m.string, g = o[_] = o[_] || {
        data: {},
        gc: []
      }, b = m.lineHeight, k = w = 0, !pt(f) && !Mt(f))
        k = yn(n, g.data, g.gc, k, f), w = b;
      else if (Mt(f))
        for (p = 0, v = f.length; p < v; ++p)
          M = f[p], !pt(M) && !Mt(M) && (k = yn(n, g.data, g.gc, k, M), w += b);
      i.push(k), r.push(w), d = Math.max(k, d), u = Math.max(w, u);
    }
    ad(o, a);
    const S = i.indexOf(d), D = r.indexOf(u), A = (T) => ({
      width: i[T] || 0,
      height: r[T] || 0
    });
    return {
      first: A(0),
      last: A(a - 1),
      widest: A(S),
      highest: A(D),
      widths: i,
      heights: r
    };
  }
  getLabelForValue(t) {
    return t;
  }
  getPixelForValue(t, a) {
    return NaN;
  }
  getValueForPixel(t) {
  }
  getPixelForTick(t) {
    const a = this.ticks;
    return t < 0 || t > a.length - 1 ? null : this.getPixelForValue(a[t].value);
  }
  getPixelForDecimal(t) {
    this._reversePixels && (t = 1 - t);
    const a = this._startPixel + t * this._length;
    return Or(this._alignToPixels ? $e(this.chart, a, 0) : a);
  }
  getDecimalForPixel(t) {
    const a = (t - this._startPixel) / this._length;
    return this._reversePixels ? 1 - a : a;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: t, max: a } = this;
    return t < 0 && a < 0 ? a : t > 0 && a > 0 ? t : 0;
  }
  getContext(t) {
    const a = this.ticks || [];
    if (t >= 0 && t < a.length) {
      const s = a[t];
      return s.$context || (s.$context = nd(this.getContext(), t, s));
    }
    return this.$context || (this.$context = sd(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, a = ie(this.labelRotation), s = Math.abs(Math.cos(a)), n = Math.abs(Math.sin(a)), o = this._getLabelSizes(), i = t.autoSkipPadding || 0, r = o ? o.widest.width + i : 0, c = o ? o.highest.height + i : 0;
    return this.isHorizontal() ? c * s > r * n ? r / s : c / n : c * n < r * s ? c / s : r / n;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const a = this.axis, s = this.chart, n = this.options, { grid: o, position: i, border: r } = n, c = o.offset, d = this.isHorizontal(), h = this.ticks.length + (c ? 1 : 0), p = Ze(o), v = [], f = r.setContext(this.getContext()), m = f.display ? f.width : 0, _ = m / 2, g = function(z) {
      return $e(s, z, m);
    };
    let b, k, w, M, S, D, A, T, B, F, E, N;
    if (i === "top")
      b = g(this.bottom), D = this.bottom - p, T = b - _, F = g(t.top) + _, N = t.bottom;
    else if (i === "bottom")
      b = g(this.top), F = t.top, N = g(t.bottom) - _, D = b + _, T = this.top + p;
    else if (i === "left")
      b = g(this.right), S = this.right - p, A = b - _, B = g(t.left) + _, E = t.right;
    else if (i === "right")
      b = g(this.left), B = t.left, E = g(t.right) - _, S = b + _, A = this.left + p;
    else if (a === "x") {
      if (i === "center")
        b = g((t.top + t.bottom) / 2 + 0.5);
      else if (ht(i)) {
        const z = Object.keys(i)[0], j = i[z];
        b = g(this.chart.scales[z].getPixelForValue(j));
      }
      F = t.top, N = t.bottom, D = b + _, T = D + p;
    } else if (a === "y") {
      if (i === "center")
        b = g((t.left + t.right) / 2);
      else if (ht(i)) {
        const z = Object.keys(i)[0], j = i[z];
        b = g(this.chart.scales[z].getPixelForValue(j));
      }
      S = b - _, A = S - p, B = t.left, E = t.right;
    }
    const Y = it(n.ticks.maxTicksLimit, h), P = Math.max(1, Math.ceil(h / Y));
    for (k = 0; k < h; k += P) {
      const z = this.getContext(k), j = o.setContext(z), O = r.setContext(z), V = j.lineWidth, H = j.color, et = O.dash || [], Z = O.dashOffset, U = j.tickWidth, ot = j.tickColor, wt = j.tickBorderDash || [], gt = j.tickBorderDashOffset;
      w = ed(this, k, c), w !== void 0 && (M = $e(s, w, V), d ? S = A = B = E = M : D = T = F = N = M, v.push({
        tx1: S,
        ty1: D,
        tx2: A,
        ty2: T,
        x1: B,
        y1: F,
        x2: E,
        y2: N,
        width: V,
        color: H,
        borderDash: et,
        borderDashOffset: Z,
        tickWidth: U,
        tickColor: ot,
        tickBorderDash: wt,
        tickBorderDashOffset: gt
      }));
    }
    return this._ticksLength = h, this._borderValue = b, v;
  }
  _computeLabelItems(t) {
    const a = this.axis, s = this.options, { position: n, ticks: o } = s, i = this.isHorizontal(), r = this.ticks, { align: c, crossAlign: d, padding: u, mirror: h } = o, p = Ze(s.grid), v = p + u, f = h ? -u : v, m = -ie(this.labelRotation), _ = [];
    let g, b, k, w, M, S, D, A, T, B, F, E, N = "middle";
    if (n === "top")
      S = this.bottom - f, D = this._getXAxisLabelAlignment();
    else if (n === "bottom")
      S = this.top + f, D = this._getXAxisLabelAlignment();
    else if (n === "left") {
      const P = this._getYAxisLabelAlignment(p);
      D = P.textAlign, M = P.x;
    } else if (n === "right") {
      const P = this._getYAxisLabelAlignment(p);
      D = P.textAlign, M = P.x;
    } else if (a === "x") {
      if (n === "center")
        S = (t.top + t.bottom) / 2 + v;
      else if (ht(n)) {
        const P = Object.keys(n)[0], z = n[P];
        S = this.chart.scales[P].getPixelForValue(z) + v;
      }
      D = this._getXAxisLabelAlignment();
    } else if (a === "y") {
      if (n === "center")
        M = (t.left + t.right) / 2 - v;
      else if (ht(n)) {
        const P = Object.keys(n)[0], z = n[P];
        M = this.chart.scales[P].getPixelForValue(z);
      }
      D = this._getYAxisLabelAlignment(p).textAlign;
    }
    a === "y" && (c === "start" ? N = "top" : c === "end" && (N = "bottom"));
    const Y = this._getLabelSizes();
    for (g = 0, b = r.length; g < b; ++g) {
      k = r[g], w = k.label;
      const P = o.setContext(this.getContext(g));
      A = this.getPixelForTick(g) + o.labelOffset, T = this._resolveTickFontOptions(g), B = T.lineHeight, F = Mt(w) ? w.length : 1;
      const z = F / 2, j = P.color, O = P.textStrokeColor, V = P.textStrokeWidth;
      let H = D;
      i ? (M = A, D === "inner" && (g === b - 1 ? H = this.options.reverse ? "left" : "right" : g === 0 ? H = this.options.reverse ? "right" : "left" : H = "center"), n === "top" ? d === "near" || m !== 0 ? E = -F * B + B / 2 : d === "center" ? E = -Y.highest.height / 2 - z * B + B : E = -Y.highest.height + B / 2 : d === "near" || m !== 0 ? E = B / 2 : d === "center" ? E = Y.highest.height / 2 - z * B : E = Y.highest.height - F * B, h && (E *= -1), m !== 0 && !P.showLabelBackdrop && (M += B / 2 * Math.sin(m))) : (S = A, E = (1 - F) * B / 2);
      let et;
      if (P.showLabelBackdrop) {
        const Z = qt(P.backdropPadding), U = Y.heights[g], ot = Y.widths[g];
        let wt = E - Z.top, gt = 0 - Z.left;
        switch (N) {
          case "middle":
            wt -= U / 2;
            break;
          case "bottom":
            wt -= U;
            break;
        }
        switch (D) {
          case "center":
            gt -= ot / 2;
            break;
          case "right":
            gt -= ot;
            break;
          case "inner":
            g === b - 1 ? gt -= ot : g > 0 && (gt -= ot / 2);
            break;
        }
        et = {
          left: gt,
          top: wt,
          width: ot + Z.width,
          height: U + Z.height,
          color: P.backdropColor
        };
      }
      _.push({
        label: w,
        font: T,
        textOffset: E,
        options: {
          rotation: m,
          color: j,
          strokeColor: O,
          strokeWidth: V,
          textAlign: H,
          textBaseline: N,
          translation: [
            M,
            S
          ],
          backdrop: et
        }
      });
    }
    return _;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: a } = this.options;
    if (-ie(this.labelRotation))
      return t === "top" ? "left" : "right";
    let n = "center";
    return a.align === "start" ? n = "left" : a.align === "end" ? n = "right" : a.align === "inner" && (n = "inner"), n;
  }
  _getYAxisLabelAlignment(t) {
    const { position: a, ticks: { crossAlign: s, mirror: n, padding: o } } = this.options, i = this._getLabelSizes(), r = t + o, c = i.widest.width;
    let d, u;
    return a === "left" ? n ? (u = this.right + o, s === "near" ? d = "left" : s === "center" ? (d = "center", u += c / 2) : (d = "right", u += c)) : (u = this.right - r, s === "near" ? d = "right" : s === "center" ? (d = "center", u -= c / 2) : (d = "left", u = this.left)) : a === "right" ? n ? (u = this.left + o, s === "near" ? d = "right" : s === "center" ? (d = "center", u -= c / 2) : (d = "left", u -= c)) : (u = this.left + r, s === "near" ? d = "left" : s === "center" ? (d = "center", u += c / 2) : (d = "right", u = this.right)) : d = "right", {
      textAlign: d,
      x: u
    };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror)
      return;
    const t = this.chart, a = this.options.position;
    if (a === "left" || a === "right")
      return {
        top: 0,
        left: this.left,
        bottom: t.height,
        right: this.right
      };
    if (a === "top" || a === "bottom")
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: t.width
      };
  }
  drawBackground() {
    const { ctx: t, options: { backgroundColor: a }, left: s, top: n, width: o, height: i } = this;
    a && (t.save(), t.fillStyle = a, t.fillRect(s, n, o, i), t.restore());
  }
  getLineWidthForValue(t) {
    const a = this.options.grid;
    if (!this._isVisible() || !a.display)
      return 0;
    const n = this.ticks.findIndex((o) => o.value === t);
    return n >= 0 ? a.setContext(this.getContext(n)).lineWidth : 0;
  }
  drawGrid(t) {
    const a = this.options.grid, s = this.ctx, n = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let o, i;
    const r = (c, d, u) => {
      !u.width || !u.color || (s.save(), s.lineWidth = u.width, s.strokeStyle = u.color, s.setLineDash(u.borderDash || []), s.lineDashOffset = u.borderDashOffset, s.beginPath(), s.moveTo(c.x, c.y), s.lineTo(d.x, d.y), s.stroke(), s.restore());
    };
    if (a.display)
      for (o = 0, i = n.length; o < i; ++o) {
        const c = n[o];
        a.drawOnChartArea && r({
          x: c.x1,
          y: c.y1
        }, {
          x: c.x2,
          y: c.y2
        }, c), a.drawTicks && r({
          x: c.tx1,
          y: c.ty1
        }, {
          x: c.tx2,
          y: c.ty2
        }, {
          color: c.tickColor,
          width: c.tickWidth,
          borderDash: c.tickBorderDash,
          borderDashOffset: c.tickBorderDashOffset
        });
      }
  }
  drawBorder() {
    const { chart: t, ctx: a, options: { border: s, grid: n } } = this, o = s.setContext(this.getContext()), i = s.display ? o.width : 0;
    if (!i)
      return;
    const r = n.setContext(this.getContext(0)).lineWidth, c = this._borderValue;
    let d, u, h, p;
    this.isHorizontal() ? (d = $e(t, this.left, i) - i / 2, u = $e(t, this.right, r) + r / 2, h = p = c) : (h = $e(t, this.top, i) - i / 2, p = $e(t, this.bottom, r) + r / 2, d = u = c), a.save(), a.lineWidth = o.width, a.strokeStyle = o.color, a.beginPath(), a.moveTo(d, h), a.lineTo(u, p), a.stroke(), a.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const s = this.ctx, n = this._computeLabelArea();
    n && ja(s, n);
    const o = this.getLabelItems(t);
    for (const i of o) {
      const r = i.options, c = i.font, d = i.label, u = i.textOffset;
      va(s, d, 0, u, c, r);
    }
    n && Ya(s);
  }
  drawTitle() {
    const { ctx: t, options: { position: a, title: s, reverse: n } } = this;
    if (!s.display)
      return;
    const o = Lt(s.font), i = qt(s.padding), r = s.align;
    let c = o.lineHeight / 2;
    a === "bottom" || a === "center" || ht(a) ? (c += i.bottom, Mt(s.text) && (c += o.lineHeight * (s.text.length - 1))) : c += i.top;
    const { titleX: d, titleY: u, maxWidth: h, rotation: p } = id(this, c, a, r);
    va(t, s.text, 0, 0, o, {
      color: s.color,
      maxWidth: h,
      rotation: p,
      textAlign: od(r, a, n),
      textBaseline: "middle",
      translation: [
        d,
        u
      ]
    });
  }
  draw(t) {
    this._isVisible() && (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t));
  }
  _layers() {
    const t = this.options, a = t.ticks && t.ticks.z || 0, s = it(t.grid && t.grid.z, -1), n = it(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== je.prototype.draw ? [
      {
        z: a,
        draw: (o) => {
          this.draw(o);
        }
      }
    ] : [
      {
        z: s,
        draw: (o) => {
          this.drawBackground(), this.drawGrid(o), this.drawTitle();
        }
      },
      {
        z: n,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: a,
        draw: (o) => {
          this.drawLabels(o);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const a = this.chart.getSortedVisibleDatasetMetas(), s = this.axis + "AxisID", n = [];
    let o, i;
    for (o = 0, i = a.length; o < i; ++o) {
      const r = a[o];
      r[s] === this.id && (!t || r.type === t) && n.push(r);
    }
    return n;
  }
  _resolveTickFontOptions(t) {
    const a = this.options.ticks.setContext(this.getContext(t));
    return Lt(a.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class Aa {
  constructor(t, a, s) {
    this.type = t, this.scope = a, this.override = s, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const a = Object.getPrototypeOf(t);
    let s;
    cd(a) && (s = this.register(a));
    const n = this.items, o = t.id, i = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in n || (n[o] = t, rd(t, i, s), this.override && $t.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const a = this.items, s = t.id, n = this.scope;
    s in a && delete a[s], n && s in $t[n] && (delete $t[n][s], this.override && delete Fe[s]);
  }
}
function rd(e, t, a) {
  const s = ua(/* @__PURE__ */ Object.create(null), [
    a ? $t.get(a) : {},
    $t.get(t),
    e.defaults
  ]);
  $t.set(t, s), e.defaultRoutes && ld(t, e.defaultRoutes), e.descriptors && $t.describe(t, e.descriptors);
}
function ld(e, t) {
  Object.keys(t).forEach((a) => {
    const s = a.split("."), n = s.pop(), o = [
      e
    ].concat(s).join("."), i = t[a].split("."), r = i.pop(), c = i.join(".");
    $t.route(o, n, c, r);
  });
}
function cd(e) {
  return "id" in e && "defaults" in e;
}
class dd {
  constructor() {
    this.controllers = new Aa(Ua, "datasets", !0), this.elements = new Aa(ce, "elements"), this.plugins = new Aa(Object, "plugins"), this.scales = new Aa(je, "scales"), this._typedRegistries = [
      this.controllers,
      this.scales,
      this.elements
    ];
  }
  add(...t) {
    this._each("register", t);
  }
  remove(...t) {
    this._each("unregister", t);
  }
  addControllers(...t) {
    this._each("register", t, this.controllers);
  }
  addElements(...t) {
    this._each("register", t, this.elements);
  }
  addPlugins(...t) {
    this._each("register", t, this.plugins);
  }
  addScales(...t) {
    this._each("register", t, this.scales);
  }
  getController(t) {
    return this._get(t, this.controllers, "controller");
  }
  getElement(t) {
    return this._get(t, this.elements, "element");
  }
  getPlugin(t) {
    return this._get(t, this.plugins, "plugin");
  }
  getScale(t) {
    return this._get(t, this.scales, "scale");
  }
  removeControllers(...t) {
    this._each("unregister", t, this.controllers);
  }
  removeElements(...t) {
    this._each("unregister", t, this.elements);
  }
  removePlugins(...t) {
    this._each("unregister", t, this.plugins);
  }
  removeScales(...t) {
    this._each("unregister", t, this.scales);
  }
  _each(t, a, s) {
    [
      ...a
    ].forEach((n) => {
      const o = s || this._getRegistryForType(n);
      s || o.isForType(n) || o === this.plugins && n.id ? this._exec(t, o, n) : vt(n, (i) => {
        const r = s || this._getRegistryForType(i);
        this._exec(t, r, i);
      });
    });
  }
  _exec(t, a, s) {
    const n = Vs(t);
    yt(s["before" + n], [], s), a[t](s), yt(s["after" + n], [], s);
  }
  _getRegistryForType(t) {
    for (let a = 0; a < this._typedRegistries.length; a++) {
      const s = this._typedRegistries[a];
      if (s.isForType(t))
        return s;
    }
    return this.plugins;
  }
  _get(t, a, s) {
    const n = a.get(t);
    if (n === void 0)
      throw new Error('"' + t + '" is not a registered ' + s + ".");
    return n;
  }
}
var Zt = /* @__PURE__ */ new dd();
class ud {
  constructor() {
    this._init = void 0;
  }
  notify(t, a, s, n) {
    if (a === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install")), this._init === void 0)
      return;
    const o = n ? this._descriptors(t).filter(n) : this._descriptors(t), i = this._notify(o, t, a, s);
    return a === "afterDestroy" && (this._notify(o, t, "stop"), this._notify(this._init, t, "uninstall"), this._init = void 0), i;
  }
  _notify(t, a, s, n) {
    n = n || {};
    for (const o of t) {
      const i = o.plugin, r = i[s], c = [
        a,
        n,
        o.options
      ];
      if (yt(r, c, i) === !1 && n.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    pt(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const a = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), a;
  }
  _createDescriptors(t, a) {
    const s = t && t.config, n = it(s.options && s.options.plugins, {}), o = hd(s);
    return n === !1 && !a ? [] : gd(t, o, n, a);
  }
  _notifyStateChanges(t) {
    const a = this._oldCache || [], s = this._cache, n = (o, i) => o.filter((r) => !i.some((c) => r.plugin.id === c.plugin.id));
    this._notify(n(a, s), t, "stop"), this._notify(n(s, a), t, "start");
  }
}
function hd(e) {
  const t = {}, a = [], s = Object.keys(Zt.plugins.items);
  for (let o = 0; o < s.length; o++)
    a.push(Zt.getPlugin(s[o]));
  const n = e.plugins || [];
  for (let o = 0; o < n.length; o++) {
    const i = n[o];
    a.indexOf(i) === -1 && (a.push(i), t[i.id] = !0);
  }
  return {
    plugins: a,
    localIds: t
  };
}
function fd(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function gd(e, { plugins: t, localIds: a }, s, n) {
  const o = [], i = e.getContext();
  for (const r of t) {
    const c = r.id, d = fd(s[c], n);
    d !== null && o.push({
      plugin: r,
      options: pd(e.config, {
        plugin: r,
        local: a[c]
      }, d, i)
    });
  }
  return o;
}
function pd(e, { plugin: t, local: a }, s, n) {
  const o = e.pluginScopeKeys(t), i = e.getOptionScopes(s, o);
  return a && t.defaults && i.push(t.defaults), e.createResolver(i, n, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Bs(e, t) {
  const a = $t.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || a.indexAxis || "x";
}
function vd(e, t) {
  let a = e;
  return e === "_index_" ? a = t : e === "_value_" && (a = t === "x" ? "y" : "x"), a;
}
function bd(e, t) {
  return e === t ? "_index_" : "_value_";
}
function Un(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function md(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Ls(e, ...t) {
  if (Un(e))
    return e;
  for (const a of t) {
    const s = a.axis || md(a.position) || e.length > 1 && Un(e[0].toLowerCase());
    if (s)
      return s;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function Kn(e, t, a) {
  if (a[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function yd(e, t) {
  if (t.data && t.data.datasets) {
    const a = t.data.datasets.filter((s) => s.xAxisID === e || s.yAxisID === e);
    if (a.length)
      return Kn(e, "x", a[0]) || Kn(e, "y", a[0]);
  }
  return {};
}
function _d(e, t) {
  const a = Fe[e.type] || {
    scales: {}
  }, s = t.scales || {}, n = Bs(e.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(s).forEach((i) => {
    const r = s[i];
    if (!ht(r))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (r._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const c = Ls(i, r, yd(i, e), $t.scales[r.type]), d = bd(c, n), u = a.scales || {};
    o[i] = na(/* @__PURE__ */ Object.create(null), [
      {
        axis: c
      },
      r,
      u[c],
      u[d]
    ]);
  }), e.data.datasets.forEach((i) => {
    const r = i.type || e.type, c = i.indexAxis || Bs(r, t), u = (Fe[r] || {}).scales || {};
    Object.keys(u).forEach((h) => {
      const p = vd(h, c), v = i[p + "AxisID"] || p;
      o[v] = o[v] || /* @__PURE__ */ Object.create(null), na(o[v], [
        {
          axis: p
        },
        s[v],
        u[h]
      ]);
    });
  }), Object.keys(o).forEach((i) => {
    const r = o[i];
    na(r, [
      $t.scales[r.type],
      $t.scale
    ]);
  }), o;
}
function _i(e) {
  const t = e.options || (e.options = {});
  t.plugins = it(t.plugins, {}), t.scales = _d(e, t);
}
function xi(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function xd(e) {
  return e = e || {}, e.data = xi(e.data), _i(e), e;
}
const Xn = /* @__PURE__ */ new Map(), ki = /* @__PURE__ */ new Set();
function Ta(e, t) {
  let a = Xn.get(e);
  return a || (a = t(), Xn.set(e, a), ki.add(a)), a;
}
const Qe = (e, t, a) => {
  const s = Le(t, a);
  s !== void 0 && e.add(s);
};
class kd {
  constructor(t) {
    this._config = xd(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
  }
  get platform() {
    return this._config.platform;
  }
  get type() {
    return this._config.type;
  }
  set type(t) {
    this._config.type = t;
  }
  get data() {
    return this._config.data;
  }
  set data(t) {
    this._config.data = xi(t);
  }
  get options() {
    return this._config.options;
  }
  set options(t) {
    this._config.options = t;
  }
  get plugins() {
    return this._config.plugins;
  }
  update() {
    const t = this._config;
    this.clearCache(), _i(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return Ta(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, a) {
    return Ta(`${t}.transition.${a}`, () => [
      [
        `datasets.${t}.transitions.${a}`,
        `transitions.${a}`
      ],
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetElementScopeKeys(t, a) {
    return Ta(`${t}-${a}`, () => [
      [
        `datasets.${t}.elements.${a}`,
        `datasets.${t}`,
        `elements.${a}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(t) {
    const a = t.id, s = this.type;
    return Ta(`${s}-plugin-${a}`, () => [
      [
        `plugins.${a}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, a) {
    const s = this._scopeCache;
    let n = s.get(t);
    return (!n || a) && (n = /* @__PURE__ */ new Map(), s.set(t, n)), n;
  }
  getOptionScopes(t, a, s) {
    const { options: n, type: o } = this, i = this._cachedScopes(t, s), r = i.get(a);
    if (r)
      return r;
    const c = /* @__PURE__ */ new Set();
    a.forEach((u) => {
      t && (c.add(t), u.forEach((h) => Qe(c, t, h))), u.forEach((h) => Qe(c, n, h)), u.forEach((h) => Qe(c, Fe[o] || {}, h)), u.forEach((h) => Qe(c, $t, h)), u.forEach((h) => Qe(c, As, h));
    });
    const d = Array.from(c);
    return d.length === 0 && d.push(/* @__PURE__ */ Object.create(null)), ki.has(a) && i.set(a, d), d;
  }
  chartOptionScopes() {
    const { options: t, type: a } = this;
    return [
      t,
      Fe[a] || {},
      $t.datasets[a] || {},
      {
        type: a
      },
      $t,
      As
    ];
  }
  resolveNamedOptions(t, a, s, n = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: i, subPrefixes: r } = Gn(this._resolverCache, t, n);
    let c = i;
    if ($d(i, a)) {
      o.$shared = !1, s = ye(s) ? s() : s;
      const d = this.createResolver(t, s, r);
      c = We(i, s, d);
    }
    for (const d of a)
      o[d] = c[d];
    return o;
  }
  createResolver(t, a, s = [
    ""
  ], n) {
    const { resolver: o } = Gn(this._resolverCache, t, s);
    return ht(a) ? We(o, a, void 0, n) : o;
  }
}
function Gn(e, t, a) {
  let s = e.get(t);
  s || (s = /* @__PURE__ */ new Map(), e.set(t, s));
  const n = a.join();
  let o = s.get(n);
  return o || (o = {
    resolver: qs(t, a),
    subPrefixes: a.filter((r) => !r.toLowerCase().includes("hover"))
  }, s.set(n, o)), o;
}
const wd = (e) => ht(e) && Object.getOwnPropertyNames(e).some((t) => ye(e[t]));
function $d(e, t) {
  const { isScriptable: a, isIndexable: s } = ei(e);
  for (const n of t) {
    const o = a(n), i = s(n), r = (i || o) && e[n];
    if (o && (ye(r) || wd(r)) || i && Mt(r))
      return !0;
  }
  return !1;
}
var Md = "4.5.1";
const Sd = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Zn(e, t) {
  return e === "top" || e === "bottom" || Sd.indexOf(e) === -1 && t === "x";
}
function Qn(e, t) {
  return function(a, s) {
    return a[e] === s[e] ? a[t] - s[t] : a[e] - s[e];
  };
}
function Jn(e) {
  const t = e.chart, a = t.options.animation;
  t.notifyPlugins("afterRender"), yt(a && a.onComplete, [
    e
  ], t);
}
function Cd(e) {
  const t = e.chart, a = t.options.animation;
  yt(a && a.onProgress, [
    e
  ], t);
}
function wi(e) {
  return Xs() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const Pa = {}, to = (e) => {
  const t = wi(e);
  return Object.values(Pa).filter((a) => a.canvas === t).pop();
};
function Dd(e, t, a) {
  const s = Object.keys(e);
  for (const n of s) {
    const o = +n;
    if (o >= t) {
      const i = e[n];
      delete e[n], (a > 0 || o > t) && (e[o + a] = i);
    }
  }
}
function Ad(e, t, a, s) {
  return !a || e.type === "mouseout" ? null : s ? t : e;
}
let Ye = class {
  static defaults = $t;
  static instances = Pa;
  static overrides = Fe;
  static registry = Zt;
  static version = Md;
  static getChart = to;
  static register(...t) {
    Zt.add(...t), eo();
  }
  static unregister(...t) {
    Zt.remove(...t), eo();
  }
  constructor(t, a) {
    const s = this.config = new kd(a), n = wi(t), o = to(n);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const i = s.createResolver(s.chartOptionScopes(), this.getContext());
    this.platform = new (s.platform || Uc(n))(), this.platform.updateConfig(s);
    const r = this.platform.acquireContext(n, i.aspectRatio), c = r && r.canvas, d = c && c.height, u = c && c.width;
    if (this.id = wr(), this.ctx = r, this.canvas = c, this.width = u, this.height = d, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new ud(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Wr((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], Pa[this.id] = this, !r || !c) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    se.listen(this, "complete", Jn), se.listen(this, "progress", Cd), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: a }, width: s, height: n, _aspectRatio: o } = this;
    return pt(t) ? a && o ? o : n ? s / n : null : t;
  }
  get data() {
    return this.config.data;
  }
  set data(t) {
    this.config.data = t;
  }
  get options() {
    return this._options;
  }
  set options(t) {
    this.config.options = t;
  }
  get registry() {
    return Zt;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : wn(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return _n(this.canvas, this.ctx), this;
  }
  stop() {
    return se.stop(this), this;
  }
  resize(t, a) {
    se.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: a
    } : this._resize(t, a);
  }
  _resize(t, a) {
    const s = this.options, n = this.canvas, o = s.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(n, t, a, o), r = s.devicePixelRatio || this.platform.getDevicePixelRatio(), c = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, wn(this, r, !0) && (this.notifyPlugins("resize", {
      size: i
    }), yt(s.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(c) && this.render());
  }
  ensureScalesHaveIDs() {
    const a = this.options.scales || {};
    vt(a, (s, n) => {
      s.id = n;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, a = t.scales, s = this.scales, n = Object.keys(s).reduce((i, r) => (i[r] = !1, i), {});
    let o = [];
    a && (o = o.concat(Object.keys(a).map((i) => {
      const r = a[i], c = Ls(i, r), d = c === "r", u = c === "x";
      return {
        options: r,
        dposition: d ? "chartArea" : u ? "bottom" : "left",
        dtype: d ? "radialLinear" : u ? "category" : "linear"
      };
    }))), vt(o, (i) => {
      const r = i.options, c = r.id, d = Ls(c, r), u = it(r.type, i.dtype);
      (r.position === void 0 || Zn(r.position, d) !== Zn(i.dposition)) && (r.position = i.dposition), n[c] = !0;
      let h = null;
      if (c in s && s[c].type === u)
        h = s[c];
      else {
        const p = Zt.getScale(u);
        h = new p({
          id: c,
          type: u,
          ctx: this.ctx,
          chart: this
        }), s[h.id] = h;
      }
      h.init(r, t);
    }), vt(n, (i, r) => {
      i || delete s[r];
    }), vt(s, (i) => {
      jt.configure(this, i, i.options), jt.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, a = this.data.datasets.length, s = t.length;
    if (t.sort((n, o) => n.index - o.index), s > a) {
      for (let n = a; n < s; ++n)
        this._destroyDatasetMeta(n);
      t.splice(a, s - a);
    }
    this._sortedMetasets = t.slice(0).sort(Qn("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: a } } = this;
    t.length > a.length && delete this._stacks, t.forEach((s, n) => {
      a.filter((o) => o === s._dataset).length === 0 && this._destroyDatasetMeta(n);
    });
  }
  buildOrUpdateControllers() {
    const t = [], a = this.data.datasets;
    let s, n;
    for (this._removeUnreferencedMetasets(), s = 0, n = a.length; s < n; s++) {
      const o = a[s];
      let i = this.getDatasetMeta(s);
      const r = o.type || this.config.type;
      if (i.type && i.type !== r && (this._destroyDatasetMeta(s), i = this.getDatasetMeta(s)), i.type = r, i.indexAxis = o.indexAxis || Bs(r, this.options), i.order = o.order || 0, i.index = s, i.label = "" + o.label, i.visible = this.isDatasetVisible(s), i.controller)
        i.controller.updateIndex(s), i.controller.linkScales();
      else {
        const c = Zt.getController(r), { datasetElementType: d, dataElementType: u } = $t.datasets[r];
        Object.assign(c, {
          dataElementType: Zt.getElement(u),
          datasetElementType: d && Zt.getElement(d)
        }), i.controller = new c(this, s), t.push(i.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    vt(this.data.datasets, (t, a) => {
      this.getDatasetMeta(a).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const a = this.config;
    a.update();
    const s = this._options = a.createResolver(a.chartOptionScopes(), this.getContext()), n = this._animationsDisabled = !s.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const o = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let i = 0;
    for (let d = 0, u = this.data.datasets.length; d < u; d++) {
      const { controller: h } = this.getDatasetMeta(d), p = !n && o.indexOf(h) === -1;
      h.buildOrUpdateElements(p), i = Math.max(+h.getMaxOverflow(), i);
    }
    i = this._minPadding = s.layout.autoPadding ? i : 0, this._updateLayout(i), n || vt(o, (d) => {
      d.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(Qn("z", "_idx"));
    const { _active: r, _lastEvent: c } = this;
    c ? this._eventHandler(c, !0) : r.length && this._updateHoverStyles(r, r, !0), this.render();
  }
  _updateScales() {
    vt(this.scales, (t) => {
      jt.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, a = new Set(Object.keys(this._listeners)), s = new Set(t.events);
    (!dn(a, s) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, a = this._getUniformDataChanges() || [];
    for (const { method: s, start: n, count: o } of a) {
      const i = s === "_removeElements" ? -o : o;
      Dd(t, n, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const a = this.data.datasets.length, s = (o) => new Set(t.filter((i) => i[0] === o).map((i, r) => r + "," + i.splice(1).join(","))), n = s(0);
    for (let o = 1; o < a; o++)
      if (!dn(n, s(o)))
        return;
    return Array.from(n).map((o) => o.split(",")).map((o) => ({
      method: o[1],
      start: +o[2],
      count: +o[3]
    }));
  }
  _updateLayout(t) {
    if (this.notifyPlugins("beforeLayout", {
      cancelable: !0
    }) === !1)
      return;
    jt.update(this, this.width, this.height, t);
    const a = this.chartArea, s = a.width <= 0 || a.height <= 0;
    this._layers = [], vt(this.boxes, (n) => {
      s && n.position === "chartArea" || (n.configure && n.configure(), this._layers.push(...n._layers()));
    }, this), this._layers.forEach((n, o) => {
      n._idx = o;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(t) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: t,
      cancelable: !0
    }) !== !1) {
      for (let a = 0, s = this.data.datasets.length; a < s; ++a)
        this.getDatasetMeta(a).controller.configure();
      for (let a = 0, s = this.data.datasets.length; a < s; ++a)
        this._updateDataset(a, ye(t) ? t({
          datasetIndex: a
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, a) {
    const s = this.getDatasetMeta(t), n = {
      meta: s,
      index: t,
      mode: a,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", n) !== !1 && (s.controller._update(a), n.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", n));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (se.has(this) ? this.attached && !se.running(this) && se.start(this) : (this.draw(), Jn({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: s, height: n } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(s, n);
    }
    if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", {
      cancelable: !0
    }) === !1)
      return;
    const a = this._layers;
    for (t = 0; t < a.length && a[t].z <= 0; ++t)
      a[t].draw(this.chartArea);
    for (this._drawDatasets(); t < a.length; ++t)
      a[t].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(t) {
    const a = this._sortedMetasets, s = [];
    let n, o;
    for (n = 0, o = a.length; n < o; ++n) {
      const i = a[n];
      (!t || i.visible) && s.push(i);
    }
    return s;
  }
  getSortedVisibleDatasetMetas() {
    return this._getSortedDatasetMetas(!0);
  }
  _drawDatasets() {
    if (this.notifyPlugins("beforeDatasetsDraw", {
      cancelable: !0
    }) === !1)
      return;
    const t = this.getSortedVisibleDatasetMetas();
    for (let a = t.length - 1; a >= 0; --a)
      this._drawDataset(t[a]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(t) {
    const a = this.ctx, s = {
      meta: t,
      index: t.index,
      cancelable: !0
    }, n = ui(this, t);
    this.notifyPlugins("beforeDatasetDraw", s) !== !1 && (n && ja(a, n), t.controller.draw(), n && Ya(a), s.cancelable = !1, this.notifyPlugins("afterDatasetDraw", s));
  }
  isPointInArea(t) {
    return pa(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, a, s, n) {
    const o = Sc.modes[a];
    return typeof o == "function" ? o(this, t, s, n) : [];
  }
  getDatasetMeta(t) {
    const a = this.data.datasets[t], s = this._metasets;
    let n = s.filter((o) => o && o._dataset === a).pop();
    return n || (n = {
      type: null,
      data: [],
      dataset: null,
      controller: null,
      hidden: null,
      xAxisID: null,
      yAxisID: null,
      order: a && a.order || 0,
      index: t,
      _dataset: a,
      _parsed: [],
      _sorted: !1
    }, s.push(n)), n;
  }
  getContext() {
    return this.$context || (this.$context = Ie(null, {
      chart: this,
      type: "chart"
    }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(t) {
    const a = this.data.datasets[t];
    if (!a)
      return !1;
    const s = this.getDatasetMeta(t);
    return typeof s.hidden == "boolean" ? !s.hidden : !a.hidden;
  }
  setDatasetVisibility(t, a) {
    const s = this.getDatasetMeta(t);
    s.hidden = !a;
  }
  toggleDataVisibility(t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t];
  }
  getDataVisibility(t) {
    return !this._hiddenIndices[t];
  }
  _updateVisibility(t, a, s) {
    const n = s ? "show" : "hide", o = this.getDatasetMeta(t), i = o.controller._resolveAnimations(void 0, n);
    ha(a) ? (o.data[a].hidden = !s, this.update()) : (this.setDatasetVisibility(t, s), i.update(o, {
      visible: s
    }), this.update((r) => r.datasetIndex === t ? n : void 0));
  }
  hide(t, a) {
    this._updateVisibility(t, a, !1);
  }
  show(t, a) {
    this._updateVisibility(t, a, !0);
  }
  _destroyDatasetMeta(t) {
    const a = this._metasets[t];
    a && a.controller && a.controller._destroy(), delete this._metasets[t];
  }
  _stop() {
    let t, a;
    for (this.stop(), se.remove(this), t = 0, a = this.data.datasets.length; t < a; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: a } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), _n(t, a), this.platform.releaseContext(a), this.canvas = null, this.ctx = null), delete Pa[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, a = this.platform, s = (o, i) => {
      a.addEventListener(this, o, i), t[o] = i;
    }, n = (o, i, r) => {
      o.offsetX = i, o.offsetY = r, this._eventHandler(o);
    };
    vt(this.options.events, (o) => s(o, n));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, a = this.platform, s = (c, d) => {
      a.addEventListener(this, c, d), t[c] = d;
    }, n = (c, d) => {
      t[c] && (a.removeEventListener(this, c, d), delete t[c]);
    }, o = (c, d) => {
      this.canvas && this.resize(c, d);
    };
    let i;
    const r = () => {
      n("attach", r), this.attached = !0, this.resize(), s("resize", o), s("detach", i);
    };
    i = () => {
      this.attached = !1, n("resize", o), this._stop(), this._resize(0, 0), s("attach", r);
    }, a.isAttached(this.canvas) ? r() : i();
  }
  unbindEvents() {
    vt(this._listeners, (t, a) => {
      this.platform.removeEventListener(this, a, t);
    }), this._listeners = {}, vt(this._responsiveListeners, (t, a) => {
      this.platform.removeEventListener(this, a, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, a, s) {
    const n = s ? "set" : "remove";
    let o, i, r, c;
    for (a === "dataset" && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + n + "DatasetHoverStyle"]()), r = 0, c = t.length; r < c; ++r) {
      i = t[r];
      const d = i && this.getDatasetMeta(i.datasetIndex).controller;
      d && d[n + "HoverStyle"](i.element, i.datasetIndex, i.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const a = this._active || [], s = t.map(({ datasetIndex: o, index: i }) => {
      const r = this.getDatasetMeta(o);
      if (!r)
        throw new Error("No dataset found at index " + o);
      return {
        datasetIndex: o,
        element: r.data[i],
        index: i
      };
    });
    !Ea(s, a) && (this._active = s, this._lastEvent = null, this._updateHoverStyles(s, a));
  }
  notifyPlugins(t, a, s) {
    return this._plugins.notify(this, t, a, s);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((a) => a.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, a, s) {
    const n = this.options.hover, o = (c, d) => c.filter((u) => !d.some((h) => u.datasetIndex === h.datasetIndex && u.index === h.index)), i = o(a, t), r = s ? t : o(t, a);
    i.length && this.updateHoverStyle(i, n.mode, !1), r.length && n.mode && this.updateHoverStyle(r, n.mode, !0);
  }
  _eventHandler(t, a) {
    const s = {
      event: t,
      replay: a,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, n = (i) => (i.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", s, n) === !1)
      return;
    const o = this._handleEvent(t, a, s.inChartArea);
    return s.cancelable = !1, this.notifyPlugins("afterEvent", s, n), (o || s.changed) && this.render(), this;
  }
  _handleEvent(t, a, s) {
    const { _active: n = [], options: o } = this, i = a, r = this._getActiveElements(t, n, s, i), c = Ar(t), d = Ad(t, this._lastEvent, s, c);
    s && (this._lastEvent = null, yt(o.onHover, [
      t,
      r,
      this
    ], this), c && yt(o.onClick, [
      t,
      r,
      this
    ], this));
    const u = !Ea(r, n);
    return (u || a) && (this._active = r, this._updateHoverStyles(r, n, a)), this._lastEvent = d, u;
  }
  _getActiveElements(t, a, s, n) {
    if (t.type === "mouseout")
      return [];
    if (!s)
      return a;
    const o = this.options.hover;
    return this.getElementsAtEventForMode(t, o.mode, o, n);
  }
};
function eo() {
  return vt(Ye.instances, (e) => e._plugins.invalidate());
}
function Td(e, t, a) {
  const { startAngle: s, x: n, y: o, outerRadius: i, innerRadius: r, options: c } = t, { borderWidth: d, borderJoinStyle: u } = c, h = Math.min(d / i, Wt(s - a));
  if (e.beginPath(), e.arc(n, o, i - d / 2, s + h / 2, a - h / 2), r > 0) {
    const p = Math.min(d / r, Wt(s - a));
    e.arc(n, o, r + d / 2, a - p / 2, s + p / 2, !0);
  } else {
    const p = Math.min(d / 2, i * Wt(s - a));
    if (u === "round")
      e.arc(n, o, p, a - mt / 2, s + mt / 2, !0);
    else if (u === "bevel") {
      const v = 2 * p * p, f = -v * Math.cos(a + mt / 2) + n, m = -v * Math.sin(a + mt / 2) + o, _ = v * Math.cos(s + mt / 2) + n, g = v * Math.sin(s + mt / 2) + o;
      e.lineTo(f, m), e.lineTo(_, g);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Bd(e, t, a) {
  const { startAngle: s, pixelMargin: n, x: o, y: i, outerRadius: r, innerRadius: c } = t;
  let d = n / r;
  e.beginPath(), e.arc(o, i, r, s - d, a + d), c > n ? (d = n / c, e.arc(o, i, c, a + d, s - d, !0)) : e.arc(o, i, n, a + Ct, s - Ct), e.closePath(), e.clip();
}
function Ld(e) {
  return Ys(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Fd(e, t, a, s) {
  const n = Ld(e.options.borderRadius), o = (a - t) / 2, i = Math.min(o, s * t / 2), r = (c) => {
    const d = (a - Math.min(o, c)) * s / 2;
    return Bt(c, 0, Math.min(o, d));
  };
  return {
    outerStart: r(n.outerStart),
    outerEnd: r(n.outerEnd),
    innerStart: Bt(n.innerStart, 0, i),
    innerEnd: Bt(n.innerEnd, 0, i)
  };
}
function Ee(e, t, a, s) {
  return {
    x: a + e * Math.cos(t),
    y: s + e * Math.sin(t)
  };
}
function Ha(e, t, a, s, n, o) {
  const { x: i, y: r, startAngle: c, pixelMargin: d, innerRadius: u } = t, h = Math.max(t.outerRadius + s + a - d, 0), p = u > 0 ? u + s + a + d : 0;
  let v = 0;
  const f = n - c;
  if (s) {
    const P = u > 0 ? u - s : 0, z = h > 0 ? h - s : 0, j = (P + z) / 2, O = j !== 0 ? f * j / (j + s) : f;
    v = (f - O) / 2;
  }
  const m = Math.max(1e-3, f * h - a / mt) / h, _ = (f - m) / 2, g = c + _ + v, b = n - _ - v, { outerStart: k, outerEnd: w, innerStart: M, innerEnd: S } = Fd(t, p, h, b - g), D = h - k, A = h - w, T = g + k / D, B = b - w / A, F = p + M, E = p + S, N = g + M / F, Y = b - S / E;
  if (e.beginPath(), o) {
    const P = (T + B) / 2;
    if (e.arc(i, r, h, T, P), e.arc(i, r, h, P, B), w > 0) {
      const V = Ee(A, B, i, r);
      e.arc(V.x, V.y, w, B, b + Ct);
    }
    const z = Ee(E, b, i, r);
    if (e.lineTo(z.x, z.y), S > 0) {
      const V = Ee(E, Y, i, r);
      e.arc(V.x, V.y, S, b + Ct, Y + Math.PI);
    }
    const j = (b - S / p + (g + M / p)) / 2;
    if (e.arc(i, r, p, b - S / p, j, !0), e.arc(i, r, p, j, g + M / p, !0), M > 0) {
      const V = Ee(F, N, i, r);
      e.arc(V.x, V.y, M, N + Math.PI, g - Ct);
    }
    const O = Ee(D, g, i, r);
    if (e.lineTo(O.x, O.y), k > 0) {
      const V = Ee(D, T, i, r);
      e.arc(V.x, V.y, k, g - Ct, T);
    }
  } else {
    e.moveTo(i, r);
    const P = Math.cos(T) * h + i, z = Math.sin(T) * h + r;
    e.lineTo(P, z);
    const j = Math.cos(B) * h + i, O = Math.sin(B) * h + r;
    e.lineTo(j, O);
  }
  e.closePath();
}
function Pd(e, t, a, s, n) {
  const { fullCircles: o, startAngle: i, circumference: r } = t;
  let c = t.endAngle;
  if (o) {
    Ha(e, t, a, s, c, n);
    for (let d = 0; d < o; ++d)
      e.fill();
    isNaN(r) || (c = i + (r % _t || _t));
  }
  return Ha(e, t, a, s, c, n), e.fill(), c;
}
function Id(e, t, a, s, n) {
  const { fullCircles: o, startAngle: i, circumference: r, options: c } = t, { borderWidth: d, borderJoinStyle: u, borderDash: h, borderDashOffset: p, borderRadius: v } = c, f = c.borderAlign === "inner";
  if (!d)
    return;
  e.setLineDash(h || []), e.lineDashOffset = p, f ? (e.lineWidth = d * 2, e.lineJoin = u || "round") : (e.lineWidth = d, e.lineJoin = u || "bevel");
  let m = t.endAngle;
  if (o) {
    Ha(e, t, a, s, m, n);
    for (let _ = 0; _ < o; ++_)
      e.stroke();
    isNaN(r) || (m = i + (r % _t || _t));
  }
  f && Bd(e, t, m), c.selfJoin && m - i >= mt && v === 0 && u !== "miter" && Td(e, t, m), o || (Ha(e, t, a, s, m, n), e.stroke());
}
class Rd extends ce {
  static id = "arc";
  static defaults = {
    borderAlign: "center",
    borderColor: "#fff",
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: void 0,
    borderRadius: 0,
    borderWidth: 2,
    offset: 0,
    spacing: 0,
    angle: void 0,
    circular: !0,
    selfJoin: !1
  };
  static defaultRoutes = {
    backgroundColor: "backgroundColor"
  };
  static descriptors = {
    _scriptable: !0,
    _indexable: (t) => t !== "borderDash"
  };
  circumference;
  endAngle;
  fullCircles;
  innerRadius;
  outerRadius;
  pixelMargin;
  startAngle;
  constructor(t) {
    super(), this.options = void 0, this.circumference = void 0, this.startAngle = void 0, this.endAngle = void 0, this.innerRadius = void 0, this.outerRadius = void 0, this.pixelMargin = 0, this.fullCircles = 0, t && Object.assign(this, t);
  }
  inRange(t, a, s) {
    const n = this.getProps([
      "x",
      "y"
    ], s), { angle: o, distance: i } = Uo(n, {
      x: t,
      y: a
    }), { startAngle: r, endAngle: c, innerRadius: d, outerRadius: u, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], s), p = (this.options.spacing + this.options.borderWidth) / 2, v = it(h, c - r), f = ga(o, r, c) && r !== c, m = v >= _t || f, _ = re(i, d + p, u + p);
    return m && _;
  }
  getCenterPoint(t) {
    const { x: a, y: s, startAngle: n, endAngle: o, innerRadius: i, outerRadius: r } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: c, spacing: d } = this.options, u = (n + o) / 2, h = (i + r + d + c) / 2;
    return {
      x: a + Math.cos(u) * h,
      y: s + Math.sin(u) * h
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: a, circumference: s } = this, n = (a.offset || 0) / 4, o = (a.spacing || 0) / 2, i = a.circular;
    if (this.pixelMargin = a.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = s > _t ? Math.floor(s / _t) : 0, s === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const r = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(r) * n, Math.sin(r) * n);
    const c = 1 - Math.sin(Math.min(mt, s || 0)), d = n * c;
    t.fillStyle = a.backgroundColor, t.strokeStyle = a.borderColor, Pd(t, this, d, o, i), Id(t, this, d, o, i), t.restore();
  }
}
function $i(e, t, a = t) {
  e.lineCap = it(a.borderCapStyle, t.borderCapStyle), e.setLineDash(it(a.borderDash, t.borderDash)), e.lineDashOffset = it(a.borderDashOffset, t.borderDashOffset), e.lineJoin = it(a.borderJoinStyle, t.borderJoinStyle), e.lineWidth = it(a.borderWidth, t.borderWidth), e.strokeStyle = it(a.borderColor, t.borderColor);
}
function Ed(e, t, a) {
  e.lineTo(a.x, a.y);
}
function Od(e) {
  return e.stepped ? al : e.tension || e.cubicInterpolationMode === "monotone" ? sl : Ed;
}
function Mi(e, t, a = {}) {
  const s = e.length, { start: n = 0, end: o = s - 1 } = a, { start: i, end: r } = t, c = Math.max(n, i), d = Math.min(o, r), u = n < i && o < i || n > r && o > r;
  return {
    count: s,
    start: c,
    loop: t.loop,
    ilen: d < c && !u ? s + d - c : d - c
  };
}
function zd(e, t, a, s) {
  const { points: n, options: o } = t, { count: i, start: r, loop: c, ilen: d } = Mi(n, a, s), u = Od(o);
  let { move: h = !0, reverse: p } = s || {}, v, f, m;
  for (v = 0; v <= d; ++v)
    f = n[(r + (p ? d - v : v)) % i], !f.skip && (h ? (e.moveTo(f.x, f.y), h = !1) : u(e, m, f, p, o.stepped), m = f);
  return c && (f = n[(r + (p ? d : 0)) % i], u(e, m, f, p, o.stepped)), !!c;
}
function Vd(e, t, a, s) {
  const n = t.points, { count: o, start: i, ilen: r } = Mi(n, a, s), { move: c = !0, reverse: d } = s || {};
  let u = 0, h = 0, p, v, f, m, _, g;
  const b = (w) => (i + (d ? r - w : w)) % o, k = () => {
    m !== _ && (e.lineTo(u, _), e.lineTo(u, m), e.lineTo(u, g));
  };
  for (c && (v = n[b(0)], e.moveTo(v.x, v.y)), p = 0; p <= r; ++p) {
    if (v = n[b(p)], v.skip)
      continue;
    const w = v.x, M = v.y, S = w | 0;
    S === f ? (M < m ? m = M : M > _ && (_ = M), u = (h * u + w) / ++h) : (k(), e.lineTo(w, M), f = S, h = 0, m = _ = M), g = M;
  }
  k();
}
function Fs(e) {
  const t = e.options, a = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !a ? Vd : zd;
}
function Nd(e) {
  return e.stepped ? Il : e.tension || e.cubicInterpolationMode === "monotone" ? Rl : De;
}
function Wd(e, t, a, s) {
  let n = t._path;
  n || (n = t._path = new Path2D(), t.path(n, a, s) && n.closePath()), $i(e, t.options), e.stroke(n);
}
function Hd(e, t, a, s) {
  const { segments: n, options: o } = t, i = Fs(t);
  for (const r of n)
    $i(e, o, r.style), e.beginPath(), i(e, t, r, {
      start: a,
      end: a + s - 1
    }) && e.closePath(), e.stroke();
}
const jd = typeof Path2D == "function";
function Yd(e, t, a, s) {
  jd && !t.options.segment ? Wd(e, t, a, s) : Hd(e, t, a, s);
}
class Xa extends ce {
  static id = "line";
  static defaults = {
    borderCapStyle: "butt",
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: "miter",
    borderWidth: 3,
    capBezierPoints: !0,
    cubicInterpolationMode: "default",
    fill: !1,
    spanGaps: !1,
    stepped: !1,
    tension: 0
  };
  static defaultRoutes = {
    backgroundColor: "backgroundColor",
    borderColor: "borderColor"
  };
  static descriptors = {
    _scriptable: !0,
    _indexable: (t) => t !== "borderDash" && t !== "fill"
  };
  constructor(t) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, t && Object.assign(this, t);
  }
  updateControlPoints(t, a) {
    const s = this.options;
    if ((s.tension || s.cubicInterpolationMode === "monotone") && !s.stepped && !this._pointsUpdated) {
      const n = s.spanGaps ? this._loop : this._fullLoop;
      Cl(this._points, s, t, n, a), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Wl(this, this.options.segment));
  }
  first() {
    const t = this.segments, a = this.points;
    return t.length && a[t[0].start];
  }
  last() {
    const t = this.segments, a = this.points, s = t.length;
    return s && a[t[s - 1].end];
  }
  interpolate(t, a) {
    const s = this.options, n = t[a], o = this.points, i = di(this, {
      property: a,
      start: n,
      end: n
    });
    if (!i.length)
      return;
    const r = [], c = Nd(s);
    let d, u;
    for (d = 0, u = i.length; d < u; ++d) {
      const { start: h, end: p } = i[d], v = o[h], f = o[p];
      if (v === f) {
        r.push(v);
        continue;
      }
      const m = Math.abs((n - v[a]) / (f[a] - v[a])), _ = c(v, f, m, s.stepped);
      _[a] = t[a], r.push(_);
    }
    return r.length === 1 ? r[0] : r;
  }
  pathSegment(t, a, s) {
    return Fs(this)(t, this, a, s);
  }
  path(t, a, s) {
    const n = this.segments, o = Fs(this);
    let i = this._loop;
    a = a || 0, s = s || this.points.length - a;
    for (const r of n)
      i &= o(t, this, r, {
        start: a,
        end: a + s - 1
      });
    return !!i;
  }
  draw(t, a, s, n) {
    const o = this.options || {};
    (this.points || []).length && o.borderWidth && (t.save(), Yd(t, this, s, n), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function ao(e, t, a, s) {
  const n = e.options, { [a]: o } = e.getProps([
    a
  ], s);
  return Math.abs(t - o) < n.radius + n.hitRadius;
}
class qd extends ce {
  static id = "point";
  parsed;
  skip;
  stop;
  /**
  * @type {any}
  */
  static defaults = {
    borderWidth: 1,
    hitRadius: 1,
    hoverBorderWidth: 1,
    hoverRadius: 4,
    pointStyle: "circle",
    radius: 3,
    rotation: 0
  };
  /**
  * @type {any}
  */
  static defaultRoutes = {
    backgroundColor: "backgroundColor",
    borderColor: "borderColor"
  };
  constructor(t) {
    super(), this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, t && Object.assign(this, t);
  }
  inRange(t, a, s) {
    const n = this.options, { x: o, y: i } = this.getProps([
      "x",
      "y"
    ], s);
    return Math.pow(t - o, 2) + Math.pow(a - i, 2) < Math.pow(n.hitRadius + n.radius, 2);
  }
  inXRange(t, a) {
    return ao(this, t, "x", a);
  }
  inYRange(t, a) {
    return ao(this, t, "y", a);
  }
  getCenterPoint(t) {
    const { x: a, y: s } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: a,
      y: s
    };
  }
  size(t) {
    t = t || this.options || {};
    let a = t.radius || 0;
    a = Math.max(a, a && t.hoverRadius || 0);
    const s = a && t.borderWidth || 0;
    return (a + s) * 2;
  }
  draw(t, a) {
    const s = this.options;
    this.skip || s.radius < 0.1 || !pa(this, a, this.size(s) / 2) || (t.strokeStyle = s.borderColor, t.lineWidth = s.borderWidth, t.fillStyle = s.backgroundColor, Ts(t, s, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function Si(e, t) {
  const { x: a, y: s, base: n, width: o, height: i } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let r, c, d, u, h;
  return e.horizontal ? (h = i / 2, r = Math.min(a, n), c = Math.max(a, n), d = s - h, u = s + h) : (h = o / 2, r = a - h, c = a + h, d = Math.min(s, n), u = Math.max(s, n)), {
    left: r,
    top: d,
    right: c,
    bottom: u
  };
}
function be(e, t, a, s) {
  return e ? 0 : Bt(t, a, s);
}
function Ud(e, t, a) {
  const s = e.options.borderWidth, n = e.borderSkipped, o = ti(s);
  return {
    t: be(n.top, o.top, 0, a),
    r: be(n.right, o.right, 0, t),
    b: be(n.bottom, o.bottom, 0, a),
    l: be(n.left, o.left, 0, t)
  };
}
function Kd(e, t, a) {
  const { enableBorderRadius: s } = e.getProps([
    "enableBorderRadius"
  ]), n = e.options.borderRadius, o = Ve(n), i = Math.min(t, a), r = e.borderSkipped, c = s || ht(n);
  return {
    topLeft: be(!c || r.top || r.left, o.topLeft, 0, i),
    topRight: be(!c || r.top || r.right, o.topRight, 0, i),
    bottomLeft: be(!c || r.bottom || r.left, o.bottomLeft, 0, i),
    bottomRight: be(!c || r.bottom || r.right, o.bottomRight, 0, i)
  };
}
function Xd(e) {
  const t = Si(e), a = t.right - t.left, s = t.bottom - t.top, n = Ud(e, a / 2, s / 2), o = Kd(e, a / 2, s / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: a,
      h: s,
      radius: o
    },
    inner: {
      x: t.left + n.l,
      y: t.top + n.t,
      w: a - n.l - n.r,
      h: s - n.t - n.b,
      radius: {
        topLeft: Math.max(0, o.topLeft - Math.max(n.t, n.l)),
        topRight: Math.max(0, o.topRight - Math.max(n.t, n.r)),
        bottomLeft: Math.max(0, o.bottomLeft - Math.max(n.b, n.l)),
        bottomRight: Math.max(0, o.bottomRight - Math.max(n.b, n.r))
      }
    }
  };
}
function ds(e, t, a, s) {
  const n = t === null, o = a === null, r = e && !(n && o) && Si(e, s);
  return r && (n || re(t, r.left, r.right)) && (o || re(a, r.top, r.bottom));
}
function Gd(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function Zd(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function us(e, t, a = {}) {
  const s = e.x !== a.x ? -t : 0, n = e.y !== a.y ? -t : 0, o = (e.x + e.w !== a.x + a.w ? t : 0) - s, i = (e.y + e.h !== a.y + a.h ? t : 0) - n;
  return {
    x: e.x + s,
    y: e.y + n,
    w: e.w + o,
    h: e.h + i,
    radius: e.radius
  };
}
class Qd extends ce {
  static id = "bar";
  static defaults = {
    borderSkipped: "start",
    borderWidth: 0,
    borderRadius: 0,
    inflateAmount: "auto",
    pointStyle: void 0
  };
  static defaultRoutes = {
    backgroundColor: "backgroundColor",
    borderColor: "borderColor"
  };
  constructor(t) {
    super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, t && Object.assign(this, t);
  }
  draw(t) {
    const { inflateAmount: a, options: { borderColor: s, backgroundColor: n } } = this, { inner: o, outer: i } = Xd(this), r = Gd(i.radius) ? Va : Zd;
    t.save(), (i.w !== o.w || i.h !== o.h) && (t.beginPath(), r(t, us(i, a, o)), t.clip(), r(t, us(o, -a, i)), t.fillStyle = s, t.fill("evenodd")), t.beginPath(), r(t, us(o, a)), t.fillStyle = n, t.fill(), t.restore();
  }
  inRange(t, a, s) {
    return ds(this, t, a, s);
  }
  inXRange(t, a) {
    return ds(this, t, null, a);
  }
  inYRange(t, a) {
    return ds(this, null, t, a);
  }
  getCenterPoint(t) {
    const { x: a, y: s, base: n, horizontal: o } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], t);
    return {
      x: o ? (a + n) / 2 : a,
      y: o ? s : (s + n) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
function Jd(e, t, a) {
  const s = e.segments, n = e.points, o = t.points, i = [];
  for (const r of s) {
    let { start: c, end: d } = r;
    d = Ga(c, d, n);
    const u = Ps(a, n[c], n[d], r.loop);
    if (!t.segments) {
      i.push({
        source: r,
        target: u,
        start: n[c],
        end: n[d]
      });
      continue;
    }
    const h = di(t, u);
    for (const p of h) {
      const v = Ps(a, o[p.start], o[p.end], p.loop), f = ci(r, n, v);
      for (const m of f)
        i.push({
          source: m,
          target: p,
          start: {
            [a]: so(u, v, "start", Math.max)
          },
          end: {
            [a]: so(u, v, "end", Math.min)
          }
        });
    }
  }
  return i;
}
function Ps(e, t, a, s) {
  if (s)
    return;
  let n = t[e], o = a[e];
  return e === "angle" && (n = Wt(n), o = Wt(o)), {
    property: e,
    start: n,
    end: o
  };
}
function tu(e, t) {
  const { x: a = null, y: s = null } = e || {}, n = t.points, o = [];
  return t.segments.forEach(({ start: i, end: r }) => {
    r = Ga(i, r, n);
    const c = n[i], d = n[r];
    s !== null ? (o.push({
      x: c.x,
      y: s
    }), o.push({
      x: d.x,
      y: s
    })) : a !== null && (o.push({
      x: a,
      y: c.y
    }), o.push({
      x: a,
      y: d.y
    }));
  }), o;
}
function Ga(e, t, a) {
  for (; t > e; t--) {
    const s = a[t];
    if (!isNaN(s.x) && !isNaN(s.y))
      break;
  }
  return t;
}
function so(e, t, a, s) {
  return e && t ? s(e[a], t[a]) : e ? e[a] : t ? t[a] : 0;
}
function Ci(e, t) {
  let a = [], s = !1;
  return Mt(e) ? (s = !0, a = e) : a = tu(e, t), a.length ? new Xa({
    points: a,
    options: {
      tension: 0
    },
    _loop: s,
    _fullLoop: s
  }) : null;
}
function no(e) {
  return e && e.fill !== !1;
}
function eu(e, t, a) {
  let n = e[t].fill;
  const o = [
    t
  ];
  let i;
  if (!a)
    return n;
  for (; n !== !1 && o.indexOf(n) === -1; ) {
    if (!Pt(n))
      return n;
    if (i = e[n], !i)
      return !1;
    if (i.visible)
      return n;
    o.push(n), n = i.fill;
  }
  return !1;
}
function au(e, t, a) {
  const s = iu(e);
  if (ht(s))
    return isNaN(s.value) ? !1 : s;
  let n = parseFloat(s);
  return Pt(n) && Math.floor(n) === n ? su(s[0], t, n, a) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(s) >= 0 && s;
}
function su(e, t, a, s) {
  return (e === "-" || e === "+") && (a = t + a), a === t || a < 0 || a >= s ? !1 : a;
}
function nu(e, t) {
  let a = null;
  return e === "start" ? a = t.bottom : e === "end" ? a = t.top : ht(e) ? a = t.getPixelForValue(e.value) : t.getBasePixel && (a = t.getBasePixel()), a;
}
function ou(e, t, a) {
  let s;
  return e === "start" ? s = a : e === "end" ? s = t.options.reverse ? t.min : t.max : ht(e) ? s = e.value : s = t.getBaseValue(), s;
}
function iu(e) {
  const t = e.options, a = t.fill;
  let s = it(a && a.target, a);
  return s === void 0 && (s = !!t.backgroundColor), s === !1 || s === null ? !1 : s === !0 ? "origin" : s;
}
function ru(e) {
  const { scale: t, index: a, line: s } = e, n = [], o = s.segments, i = s.points, r = lu(t, a);
  r.push(Ci({
    x: null,
    y: t.bottom
  }, s));
  for (let c = 0; c < o.length; c++) {
    const d = o[c];
    for (let u = d.start; u <= d.end; u++)
      cu(n, i[u], r);
  }
  return new Xa({
    points: n,
    options: {}
  });
}
function lu(e, t) {
  const a = [], s = e.getMatchingVisibleMetas("line");
  for (let n = 0; n < s.length; n++) {
    const o = s[n];
    if (o.index === t)
      break;
    o.hidden || a.unshift(o.dataset);
  }
  return a;
}
function cu(e, t, a) {
  const s = [];
  for (let n = 0; n < a.length; n++) {
    const o = a[n], { first: i, last: r, point: c } = du(o, t, "x");
    if (!(!c || i && r)) {
      if (i)
        s.unshift(c);
      else if (e.push(c), !r)
        break;
    }
  }
  e.push(...s);
}
function du(e, t, a) {
  const s = e.interpolate(t, a);
  if (!s)
    return {};
  const n = s[a], o = e.segments, i = e.points;
  let r = !1, c = !1;
  for (let d = 0; d < o.length; d++) {
    const u = o[d], h = i[u.start][a], p = i[u.end][a];
    if (re(n, h, p)) {
      r = n === h, c = n === p;
      break;
    }
  }
  return {
    first: r,
    last: c,
    point: s
  };
}
class Di {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, a, s) {
    const { x: n, y: o, radius: i } = this;
    return a = a || {
      start: 0,
      end: _t
    }, t.arc(n, o, i, a.end, a.start, !0), !s.bounds;
  }
  interpolate(t) {
    const { x: a, y: s, radius: n } = this, o = t.angle;
    return {
      x: a + Math.cos(o) * n,
      y: s + Math.sin(o) * n,
      angle: o
    };
  }
}
function uu(e) {
  const { chart: t, fill: a, line: s } = e;
  if (Pt(a))
    return hu(t, a);
  if (a === "stack")
    return ru(e);
  if (a === "shape")
    return !0;
  const n = fu(e);
  return n instanceof Di ? n : Ci(n, s);
}
function hu(e, t) {
  const a = e.getDatasetMeta(t);
  return a && e.isDatasetVisible(t) ? a.dataset : null;
}
function fu(e) {
  return (e.scale || {}).getPointPositionForValue ? pu(e) : gu(e);
}
function gu(e) {
  const { scale: t = {}, fill: a } = e, s = nu(a, t);
  if (Pt(s)) {
    const n = t.isHorizontal();
    return {
      x: n ? s : null,
      y: n ? null : s
    };
  }
  return null;
}
function pu(e) {
  const { scale: t, fill: a } = e, s = t.options, n = t.getLabels().length, o = s.reverse ? t.max : t.min, i = ou(a, t, o), r = [];
  if (s.grid.circular) {
    const c = t.getPointPositionForValue(0, o);
    return new Di({
      x: c.x,
      y: c.y,
      radius: t.getDistanceFromCenterForValue(i)
    });
  }
  for (let c = 0; c < n; ++c)
    r.push(t.getPointPositionForValue(c, i));
  return r;
}
function hs(e, t, a) {
  const s = uu(t), { chart: n, index: o, line: i, scale: r, axis: c } = t, d = i.options, u = d.fill, h = d.backgroundColor, { above: p = h, below: v = h } = u || {}, f = n.getDatasetMeta(o), m = ui(n, f);
  s && i.points.length && (ja(e, a), vu(e, {
    line: i,
    target: s,
    above: p,
    below: v,
    area: a,
    scale: r,
    axis: c,
    clip: m
  }), Ya(e));
}
function vu(e, t) {
  const { line: a, target: s, above: n, below: o, area: i, scale: r, clip: c } = t, d = a._loop ? "angle" : t.axis;
  e.save();
  let u = o;
  o !== n && (d === "x" ? (oo(e, s, i.top), fs(e, {
    line: a,
    target: s,
    color: n,
    scale: r,
    property: d,
    clip: c
  }), e.restore(), e.save(), oo(e, s, i.bottom)) : d === "y" && (io(e, s, i.left), fs(e, {
    line: a,
    target: s,
    color: o,
    scale: r,
    property: d,
    clip: c
  }), e.restore(), e.save(), io(e, s, i.right), u = n)), fs(e, {
    line: a,
    target: s,
    color: u,
    scale: r,
    property: d,
    clip: c
  }), e.restore();
}
function oo(e, t, a) {
  const { segments: s, points: n } = t;
  let o = !0, i = !1;
  e.beginPath();
  for (const r of s) {
    const { start: c, end: d } = r, u = n[c], h = n[Ga(c, d, n)];
    o ? (e.moveTo(u.x, u.y), o = !1) : (e.lineTo(u.x, a), e.lineTo(u.x, u.y)), i = !!t.pathSegment(e, r, {
      move: i
    }), i ? e.closePath() : e.lineTo(h.x, a);
  }
  e.lineTo(t.first().x, a), e.closePath(), e.clip();
}
function io(e, t, a) {
  const { segments: s, points: n } = t;
  let o = !0, i = !1;
  e.beginPath();
  for (const r of s) {
    const { start: c, end: d } = r, u = n[c], h = n[Ga(c, d, n)];
    o ? (e.moveTo(u.x, u.y), o = !1) : (e.lineTo(a, u.y), e.lineTo(u.x, u.y)), i = !!t.pathSegment(e, r, {
      move: i
    }), i ? e.closePath() : e.lineTo(a, h.y);
  }
  e.lineTo(a, t.first().y), e.closePath(), e.clip();
}
function fs(e, t) {
  const { line: a, target: s, property: n, color: o, scale: i, clip: r } = t, c = Jd(a, s, n);
  for (const { source: d, target: u, start: h, end: p } of c) {
    const { style: { backgroundColor: v = o } = {} } = d, f = s !== !0;
    e.save(), e.fillStyle = v, bu(e, i, r, f && Ps(n, h, p)), e.beginPath();
    const m = !!a.pathSegment(e, d);
    let _;
    if (f) {
      m ? e.closePath() : ro(e, s, p, n);
      const g = !!s.pathSegment(e, u, {
        move: m,
        reverse: !0
      });
      _ = m && g, _ || ro(e, s, h, n);
    }
    e.closePath(), e.fill(_ ? "evenodd" : "nonzero"), e.restore();
  }
}
function bu(e, t, a, s) {
  const n = t.chart.chartArea, { property: o, start: i, end: r } = s || {};
  if (o === "x" || o === "y") {
    let c, d, u, h;
    o === "x" ? (c = i, d = n.top, u = r, h = n.bottom) : (c = n.left, d = i, u = n.right, h = r), e.beginPath(), a && (c = Math.max(c, a.left), u = Math.min(u, a.right), d = Math.max(d, a.top), h = Math.min(h, a.bottom)), e.rect(c, d, u - c, h - d), e.clip();
  }
}
function ro(e, t, a, s) {
  const n = t.interpolate(a, s);
  n && e.lineTo(n.x, n.y);
}
var mu = {
  id: "filler",
  afterDatasetsUpdate(e, t, a) {
    const s = (e.data.datasets || []).length, n = [];
    let o, i, r, c;
    for (i = 0; i < s; ++i)
      o = e.getDatasetMeta(i), r = o.dataset, c = null, r && r.options && r instanceof Xa && (c = {
        visible: e.isDatasetVisible(i),
        index: i,
        fill: au(r, i, s),
        chart: e,
        axis: o.controller.options.indexAxis,
        scale: o.vScale,
        line: r
      }), o.$filler = c, n.push(c);
    for (i = 0; i < s; ++i)
      c = n[i], !(!c || c.fill === !1) && (c.fill = eu(n, i, a.propagate));
  },
  beforeDraw(e, t, a) {
    const s = a.drawTime === "beforeDraw", n = e.getSortedVisibleDatasetMetas(), o = e.chartArea;
    for (let i = n.length - 1; i >= 0; --i) {
      const r = n[i].$filler;
      r && (r.line.updateControlPoints(o, r.axis), s && r.fill && hs(e.ctx, r, o));
    }
  },
  beforeDatasetsDraw(e, t, a) {
    if (a.drawTime !== "beforeDatasetsDraw")
      return;
    const s = e.getSortedVisibleDatasetMetas();
    for (let n = s.length - 1; n >= 0; --n) {
      const o = s[n].$filler;
      no(o) && hs(e.ctx, o, e.chartArea);
    }
  },
  beforeDatasetDraw(e, t, a) {
    const s = t.meta.$filler;
    !no(s) || a.drawTime !== "beforeDatasetDraw" || hs(e.ctx, s, e.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const lo = (e, t) => {
  let { boxHeight: a = t, boxWidth: s = t } = e;
  return e.usePointStyle && (a = Math.min(a, t), s = e.pointStyleWidth || Math.min(s, t)), {
    boxWidth: s,
    boxHeight: a,
    itemHeight: Math.max(t, a)
  };
}, yu = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class co extends ce {
  constructor(t) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, a, s) {
    this.maxWidth = t, this.maxHeight = a, this._margins = s, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const t = this.options.labels || {};
    let a = yt(t.generateLabels, [
      this.chart
    ], this) || [];
    t.filter && (a = a.filter((s) => t.filter(s, this.chart.data))), t.sort && (a = a.sort((s, n) => t.sort(s, n, this.chart.data))), this.options.reverse && a.reverse(), this.legendItems = a;
  }
  fit() {
    const { options: t, ctx: a } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const s = t.labels, n = Lt(s.font), o = n.size, i = this._computeTitleHeight(), { boxWidth: r, itemHeight: c } = lo(s, o);
    let d, u;
    a.font = n.string, this.isHorizontal() ? (d = this.maxWidth, u = this._fitRows(i, o, r, c) + 10) : (u = this.maxHeight, d = this._fitCols(i, n, r, c) + 10), this.width = Math.min(d, t.maxWidth || this.maxWidth), this.height = Math.min(u, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, a, s, n) {
    const { ctx: o, maxWidth: i, options: { labels: { padding: r } } } = this, c = this.legendHitBoxes = [], d = this.lineWidths = [
      0
    ], u = n + r;
    let h = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let p = -1, v = -u;
    return this.legendItems.forEach((f, m) => {
      const _ = s + a / 2 + o.measureText(f.text).width;
      (m === 0 || d[d.length - 1] + _ + 2 * r > i) && (h += u, d[d.length - (m > 0 ? 0 : 1)] = 0, v += u, p++), c[m] = {
        left: 0,
        top: v,
        row: p,
        width: _,
        height: n
      }, d[d.length - 1] += _ + r;
    }), h;
  }
  _fitCols(t, a, s, n) {
    const { ctx: o, maxHeight: i, options: { labels: { padding: r } } } = this, c = this.legendHitBoxes = [], d = this.columnSizes = [], u = i - t;
    let h = r, p = 0, v = 0, f = 0, m = 0;
    return this.legendItems.forEach((_, g) => {
      const { itemWidth: b, itemHeight: k } = _u(s, a, o, _, n);
      g > 0 && v + k + 2 * r > u && (h += p + r, d.push({
        width: p,
        height: v
      }), f += p + r, m++, p = v = 0), c[g] = {
        left: f,
        top: v,
        col: m,
        width: b,
        height: k
      }, p = Math.max(p, b), v += k + r;
    }), h += p, d.push({
      width: p,
      height: v
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: a, options: { align: s, labels: { padding: n }, rtl: o } } = this, i = Ne(o, this.left, this.width);
    if (this.isHorizontal()) {
      let r = 0, c = Tt(s, this.left + n, this.right - this.lineWidths[r]);
      for (const d of a)
        r !== d.row && (r = d.row, c = Tt(s, this.left + n, this.right - this.lineWidths[r])), d.top += this.top + t + n, d.left = i.leftForLtr(i.x(c), d.width), c += d.width + n;
    } else {
      let r = 0, c = Tt(s, this.top + t + n, this.bottom - this.columnSizes[r].height);
      for (const d of a)
        d.col !== r && (r = d.col, c = Tt(s, this.top + t + n, this.bottom - this.columnSizes[r].height)), d.top = c, d.left += this.left + n, d.left = i.leftForLtr(i.x(d.left), d.width), c += d.height + n;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      ja(t, this), this._draw(), Ya(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: a, lineWidths: s, ctx: n } = this, { align: o, labels: i } = t, r = $t.color, c = Ne(t.rtl, this.left, this.width), d = Lt(i.font), { padding: u } = i, h = d.size, p = h / 2;
    let v;
    this.drawTitle(), n.textAlign = c.textAlign("left"), n.textBaseline = "middle", n.lineWidth = 0.5, n.font = d.string;
    const { boxWidth: f, boxHeight: m, itemHeight: _ } = lo(i, h), g = function(S, D, A) {
      if (isNaN(f) || f <= 0 || isNaN(m) || m < 0)
        return;
      n.save();
      const T = it(A.lineWidth, 1);
      if (n.fillStyle = it(A.fillStyle, r), n.lineCap = it(A.lineCap, "butt"), n.lineDashOffset = it(A.lineDashOffset, 0), n.lineJoin = it(A.lineJoin, "miter"), n.lineWidth = T, n.strokeStyle = it(A.strokeStyle, r), n.setLineDash(it(A.lineDash, [])), i.usePointStyle) {
        const B = {
          radius: m * Math.SQRT2 / 2,
          pointStyle: A.pointStyle,
          rotation: A.rotation,
          borderWidth: T
        }, F = c.xPlus(S, f / 2), E = D + p;
        Jo(n, B, F, E, i.pointStyleWidth && f);
      } else {
        const B = D + Math.max((h - m) / 2, 0), F = c.leftForLtr(S, f), E = Ve(A.borderRadius);
        n.beginPath(), Object.values(E).some((N) => N !== 0) ? Va(n, {
          x: F,
          y: B,
          w: f,
          h: m,
          radius: E
        }) : n.rect(F, B, f, m), n.fill(), T !== 0 && n.stroke();
      }
      n.restore();
    }, b = function(S, D, A) {
      va(n, A.text, S, D + _ / 2, d, {
        strikethrough: A.hidden,
        textAlign: c.textAlign(A.textAlign)
      });
    }, k = this.isHorizontal(), w = this._computeTitleHeight();
    k ? v = {
      x: Tt(o, this.left + u, this.right - s[0]),
      y: this.top + u + w,
      line: 0
    } : v = {
      x: this.left + u,
      y: Tt(o, this.top + w + u, this.bottom - a[0].height),
      line: 0
    }, ii(this.ctx, t.textDirection);
    const M = _ + u;
    this.legendItems.forEach((S, D) => {
      n.strokeStyle = S.fontColor, n.fillStyle = S.fontColor;
      const A = n.measureText(S.text).width, T = c.textAlign(S.textAlign || (S.textAlign = i.textAlign)), B = f + p + A;
      let F = v.x, E = v.y;
      c.setWidth(this.width), k ? D > 0 && F + B + u > this.right && (E = v.y += M, v.line++, F = v.x = Tt(o, this.left + u, this.right - s[v.line])) : D > 0 && E + M > this.bottom && (F = v.x = F + a[v.line].width + u, v.line++, E = v.y = Tt(o, this.top + w + u, this.bottom - a[v.line].height));
      const N = c.x(F);
      if (g(N, E, S), F = Hr(T, F + f + p, k ? F + B : this.right, t.rtl), b(c.x(F), E, S), k)
        v.x += B + u;
      else if (typeof S.text != "string") {
        const Y = d.lineHeight;
        v.y += Ai(S, Y) + u;
      } else
        v.y += M;
    }), ri(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, a = t.title, s = Lt(a.font), n = qt(a.padding);
    if (!a.display)
      return;
    const o = Ne(t.rtl, this.left, this.width), i = this.ctx, r = a.position, c = s.size / 2, d = n.top + c;
    let u, h = this.left, p = this.width;
    if (this.isHorizontal())
      p = Math.max(...this.lineWidths), u = this.top + d, h = Tt(t.align, h, this.right - p);
    else {
      const f = this.columnSizes.reduce((m, _) => Math.max(m, _.height), 0);
      u = d + Tt(t.align, this.top, this.bottom - f - t.labels.padding - this._computeTitleHeight());
    }
    const v = Tt(r, h, h + p);
    i.textAlign = o.textAlign(Ws(r)), i.textBaseline = "middle", i.strokeStyle = a.color, i.fillStyle = a.color, i.font = s.string, va(i, a.text, v, u, s);
  }
  _computeTitleHeight() {
    const t = this.options.title, a = Lt(t.font), s = qt(t.padding);
    return t.display ? a.lineHeight + s.height : 0;
  }
  _getLegendItemAt(t, a) {
    let s, n, o;
    if (re(t, this.left, this.right) && re(a, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, s = 0; s < o.length; ++s)
        if (n = o[s], re(t, n.left, n.left + n.width) && re(a, n.top, n.top + n.height))
          return this.legendItems[s];
    }
    return null;
  }
  handleEvent(t) {
    const a = this.options;
    if (!wu(t.type, a))
      return;
    const s = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const n = this._hoveredItem, o = yu(n, s);
      n && !o && yt(a.onLeave, [
        t,
        n,
        this
      ], this), this._hoveredItem = s, s && !o && yt(a.onHover, [
        t,
        s,
        this
      ], this);
    } else s && yt(a.onClick, [
      t,
      s,
      this
    ], this);
  }
}
function _u(e, t, a, s, n) {
  const o = xu(s, e, t, a), i = ku(n, s, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: i
  };
}
function xu(e, t, a, s) {
  let n = e.text;
  return n && typeof n != "string" && (n = n.reduce((o, i) => o.length > i.length ? o : i)), t + a.size / 2 + s.measureText(n).width;
}
function ku(e, t, a) {
  let s = e;
  return typeof t.text != "string" && (s = Ai(t, a)), s;
}
function Ai(e, t) {
  const a = e.text ? e.text.length : 0;
  return t * a;
}
function wu(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var Qs = {
  id: "legend",
  _element: co,
  start(e, t, a) {
    const s = e.legend = new co({
      ctx: e.ctx,
      options: a,
      chart: e
    });
    jt.configure(e, s, a), jt.addBox(e, s);
  },
  stop(e) {
    jt.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, a) {
    const s = e.legend;
    jt.configure(e, s, a), s.options = a;
  },
  afterUpdate(e) {
    const t = e.legend;
    t.buildLabels(), t.adjustHitBoxes();
  },
  afterEvent(e, t) {
    t.replay || e.legend.handleEvent(t.event);
  },
  defaults: {
    display: !0,
    position: "top",
    align: "center",
    fullSize: !0,
    reverse: !1,
    weight: 1e3,
    onClick(e, t, a) {
      const s = t.datasetIndex, n = a.chart;
      n.isDatasetVisible(s) ? (n.hide(s), t.hidden = !0) : (n.show(s), t.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (e) => e.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(e) {
        const t = e.data.datasets, { labels: { usePointStyle: a, pointStyle: s, textAlign: n, color: o, useBorderRadius: i, borderRadius: r } } = e.legend.options;
        return e._getSortedDatasetMetas().map((c) => {
          const d = c.controller.getStyle(a ? 0 : void 0), u = qt(d.borderWidth);
          return {
            text: t[c.index].label,
            fillStyle: d.backgroundColor,
            fontColor: o,
            hidden: !c.visible,
            lineCap: d.borderCapStyle,
            lineDash: d.borderDash,
            lineDashOffset: d.borderDashOffset,
            lineJoin: d.borderJoinStyle,
            lineWidth: (u.width + u.height) / 4,
            strokeStyle: d.borderColor,
            pointStyle: s || d.pointStyle,
            rotation: d.rotation,
            textAlign: n || d.textAlign,
            borderRadius: i && (r || d.borderRadius),
            datasetIndex: c.index
          };
        }, this);
      }
    },
    title: {
      color: (e) => e.chart.options.color,
      display: !1,
      position: "center",
      text: ""
    }
  },
  descriptors: {
    _scriptable: (e) => !e.startsWith("on"),
    labels: {
      _scriptable: (e) => ![
        "generateLabels",
        "filter",
        "sort"
      ].includes(e)
    }
  }
};
class Ti extends ce {
  constructor(t) {
    super(), this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, a) {
    const s = this.options;
    if (this.left = 0, this.top = 0, !s.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = t, this.height = this.bottom = a;
    const n = Mt(s.text) ? s.text.length : 1;
    this._padding = qt(s.padding);
    const o = n * Lt(s.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = o : this.width = o;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: a, left: s, bottom: n, right: o, options: i } = this, r = i.align;
    let c = 0, d, u, h;
    return this.isHorizontal() ? (u = Tt(r, s, o), h = a + t, d = o - s) : (i.position === "left" ? (u = s + t, h = Tt(r, n, a), c = mt * -0.5) : (u = o - t, h = Tt(r, a, n), c = mt * 0.5), d = n - a), {
      titleX: u,
      titleY: h,
      maxWidth: d,
      rotation: c
    };
  }
  draw() {
    const t = this.ctx, a = this.options;
    if (!a.display)
      return;
    const s = Lt(a.font), o = s.lineHeight / 2 + this._padding.top, { titleX: i, titleY: r, maxWidth: c, rotation: d } = this._drawArgs(o);
    va(t, a.text, 0, 0, s, {
      color: a.color,
      maxWidth: c,
      rotation: d,
      textAlign: Ws(a.align),
      textBaseline: "middle",
      translation: [
        i,
        r
      ]
    });
  }
}
function $u(e, t) {
  const a = new Ti({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  jt.configure(e, a, t), jt.addBox(e, a), e.titleBlock = a;
}
var Bi = {
  id: "title",
  _element: Ti,
  start(e, t, a) {
    $u(e, a);
  },
  stop(e) {
    const t = e.titleBlock;
    jt.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, a) {
    const s = e.titleBlock;
    jt.configure(e, s, a), s.options = a;
  },
  defaults: {
    align: "center",
    display: !1,
    font: {
      weight: "bold"
    },
    fullSize: !0,
    padding: 10,
    position: "top",
    text: "",
    weight: 2e3
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: !0,
    _indexable: !1
  }
};
const sa = {
  average(e) {
    if (!e.length)
      return !1;
    let t, a, s = /* @__PURE__ */ new Set(), n = 0, o = 0;
    for (t = 0, a = e.length; t < a; ++t) {
      const r = e[t].element;
      if (r && r.hasValue()) {
        const c = r.tooltipPosition();
        s.add(c.x), n += c.y, ++o;
      }
    }
    return o === 0 || s.size === 0 ? !1 : {
      x: [
        ...s
      ].reduce((r, c) => r + c) / s.size,
      y: n / o
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let a = t.x, s = t.y, n = Number.POSITIVE_INFINITY, o, i, r;
    for (o = 0, i = e.length; o < i; ++o) {
      const c = e[o].element;
      if (c && c.hasValue()) {
        const d = c.getCenterPoint(), u = Ds(t, d);
        u < n && (n = u, r = c);
      }
    }
    if (r) {
      const c = r.tooltipPosition();
      a = c.x, s = c.y;
    }
    return {
      x: a,
      y: s
    };
  }
};
function Gt(e, t) {
  return t && (Mt(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function ne(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function Mu(e, t) {
  const { element: a, datasetIndex: s, index: n } = t, o = e.getDatasetMeta(s).controller, { label: i, value: r } = o.getLabelAndValue(n);
  return {
    chart: e,
    label: i,
    parsed: o.getParsed(n),
    raw: e.data.datasets[s].data[n],
    formattedValue: r,
    dataset: o.getDataset(),
    dataIndex: n,
    datasetIndex: s,
    element: a
  };
}
function uo(e, t) {
  const a = e.chart.ctx, { body: s, footer: n, title: o } = e, { boxWidth: i, boxHeight: r } = t, c = Lt(t.bodyFont), d = Lt(t.titleFont), u = Lt(t.footerFont), h = o.length, p = n.length, v = s.length, f = qt(t.padding);
  let m = f.height, _ = 0, g = s.reduce((w, M) => w + M.before.length + M.lines.length + M.after.length, 0);
  if (g += e.beforeBody.length + e.afterBody.length, h && (m += h * d.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), g) {
    const w = t.displayColors ? Math.max(r, c.lineHeight) : c.lineHeight;
    m += v * w + (g - v) * c.lineHeight + (g - 1) * t.bodySpacing;
  }
  p && (m += t.footerMarginTop + p * u.lineHeight + (p - 1) * t.footerSpacing);
  let b = 0;
  const k = function(w) {
    _ = Math.max(_, a.measureText(w).width + b);
  };
  return a.save(), a.font = d.string, vt(e.title, k), a.font = c.string, vt(e.beforeBody.concat(e.afterBody), k), b = t.displayColors ? i + 2 + t.boxPadding : 0, vt(s, (w) => {
    vt(w.before, k), vt(w.lines, k), vt(w.after, k);
  }), b = 0, a.font = u.string, vt(e.footer, k), a.restore(), _ += f.width, {
    width: _,
    height: m
  };
}
function Su(e, t) {
  const { y: a, height: s } = t;
  return a < s / 2 ? "top" : a > e.height - s / 2 ? "bottom" : "center";
}
function Cu(e, t, a, s) {
  const { x: n, width: o } = s, i = a.caretSize + a.caretPadding;
  if (e === "left" && n + o + i > t.width || e === "right" && n - o - i < 0)
    return !0;
}
function Du(e, t, a, s) {
  const { x: n, width: o } = a, { width: i, chartArea: { left: r, right: c } } = e;
  let d = "center";
  return s === "center" ? d = n <= (r + c) / 2 ? "left" : "right" : n <= o / 2 ? d = "left" : n >= i - o / 2 && (d = "right"), Cu(d, e, t, a) && (d = "center"), d;
}
function ho(e, t, a) {
  const s = a.yAlign || t.yAlign || Su(e, a);
  return {
    xAlign: a.xAlign || t.xAlign || Du(e, t, a, s),
    yAlign: s
  };
}
function Au(e, t) {
  let { x: a, width: s } = e;
  return t === "right" ? a -= s : t === "center" && (a -= s / 2), a;
}
function Tu(e, t, a) {
  let { y: s, height: n } = e;
  return t === "top" ? s += a : t === "bottom" ? s -= n + a : s -= n / 2, s;
}
function fo(e, t, a, s) {
  const { caretSize: n, caretPadding: o, cornerRadius: i } = e, { xAlign: r, yAlign: c } = a, d = n + o, { topLeft: u, topRight: h, bottomLeft: p, bottomRight: v } = Ve(i);
  let f = Au(t, r);
  const m = Tu(t, c, d);
  return c === "center" ? r === "left" ? f += d : r === "right" && (f -= d) : r === "left" ? f -= Math.max(u, p) + n : r === "right" && (f += Math.max(h, v) + n), {
    x: Bt(f, 0, s.width - t.width),
    y: Bt(m, 0, s.height - t.height)
  };
}
function Ba(e, t, a) {
  const s = qt(a.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - s.right : e.x + s.left;
}
function go(e) {
  return Gt([], ne(e));
}
function Bu(e, t, a) {
  return Ie(e, {
    tooltip: t,
    tooltipItems: a,
    type: "tooltip"
  });
}
function po(e, t) {
  const a = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return a ? e.override(a) : e;
}
const Li = {
  beforeTitle: ae,
  title(e) {
    if (e.length > 0) {
      const t = e[0], a = t.chart.data.labels, s = a ? a.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return t.dataset.label || "";
      if (t.label)
        return t.label;
      if (s > 0 && t.dataIndex < s)
        return a[t.dataIndex];
    }
    return "";
  },
  afterTitle: ae,
  beforeBody: ae,
  beforeLabel: ae,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const a = e.formattedValue;
    return pt(a) || (t += a), t;
  },
  labelColor(e) {
    const a = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
    return {
      borderColor: a.borderColor,
      backgroundColor: a.backgroundColor,
      borderWidth: a.borderWidth,
      borderDash: a.borderDash,
      borderDashOffset: a.borderDashOffset,
      borderRadius: 0
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(e) {
    const a = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
    return {
      pointStyle: a.pointStyle,
      rotation: a.rotation
    };
  },
  afterLabel: ae,
  afterBody: ae,
  beforeFooter: ae,
  footer: ae,
  afterFooter: ae
};
function Et(e, t, a, s) {
  const n = e[t].call(a, s);
  return typeof n > "u" ? Li[t].call(a, s) : n;
}
class vo extends ce {
  static positioners = sa;
  constructor(t) {
    super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.chart = t.chart, this.options = t.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0;
  }
  initialize(t) {
    this.options = t, this._cachedAnimations = void 0, this.$context = void 0;
  }
  _resolveAnimations() {
    const t = this._cachedAnimations;
    if (t)
      return t;
    const a = this.chart, s = this.options.setContext(this.getContext()), n = s.enabled && a.options.animation && s.animations, o = new hi(this.chart, n);
    return n._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = Bu(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, a) {
    const { callbacks: s } = a, n = Et(s, "beforeTitle", this, t), o = Et(s, "title", this, t), i = Et(s, "afterTitle", this, t);
    let r = [];
    return r = Gt(r, ne(n)), r = Gt(r, ne(o)), r = Gt(r, ne(i)), r;
  }
  getBeforeBody(t, a) {
    return go(Et(a.callbacks, "beforeBody", this, t));
  }
  getBody(t, a) {
    const { callbacks: s } = a, n = [];
    return vt(t, (o) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, r = po(s, o);
      Gt(i.before, ne(Et(r, "beforeLabel", this, o))), Gt(i.lines, Et(r, "label", this, o)), Gt(i.after, ne(Et(r, "afterLabel", this, o))), n.push(i);
    }), n;
  }
  getAfterBody(t, a) {
    return go(Et(a.callbacks, "afterBody", this, t));
  }
  getFooter(t, a) {
    const { callbacks: s } = a, n = Et(s, "beforeFooter", this, t), o = Et(s, "footer", this, t), i = Et(s, "afterFooter", this, t);
    let r = [];
    return r = Gt(r, ne(n)), r = Gt(r, ne(o)), r = Gt(r, ne(i)), r;
  }
  _createItems(t) {
    const a = this._active, s = this.chart.data, n = [], o = [], i = [];
    let r = [], c, d;
    for (c = 0, d = a.length; c < d; ++c)
      r.push(Mu(this.chart, a[c]));
    return t.filter && (r = r.filter((u, h, p) => t.filter(u, h, p, s))), t.itemSort && (r = r.sort((u, h) => t.itemSort(u, h, s))), vt(r, (u) => {
      const h = po(t.callbacks, u);
      n.push(Et(h, "labelColor", this, u)), o.push(Et(h, "labelPointStyle", this, u)), i.push(Et(h, "labelTextColor", this, u));
    }), this.labelColors = n, this.labelPointStyles = o, this.labelTextColors = i, this.dataPoints = r, r;
  }
  update(t, a) {
    const s = this.options.setContext(this.getContext()), n = this._active;
    let o, i = [];
    if (!n.length)
      this.opacity !== 0 && (o = {
        opacity: 0
      });
    else {
      const r = sa[s.position].call(this, n, this._eventPosition);
      i = this._createItems(s), this.title = this.getTitle(i, s), this.beforeBody = this.getBeforeBody(i, s), this.body = this.getBody(i, s), this.afterBody = this.getAfterBody(i, s), this.footer = this.getFooter(i, s);
      const c = this._size = uo(this, s), d = Object.assign({}, r, c), u = ho(this.chart, s, d), h = fo(s, d, u, this.chart);
      this.xAlign = u.xAlign, this.yAlign = u.yAlign, o = {
        opacity: 1,
        x: h.x,
        y: h.y,
        width: c.width,
        height: c.height,
        caretX: r.x,
        caretY: r.y
      };
    }
    this._tooltipItems = i, this.$context = void 0, o && this._resolveAnimations().update(this, o), t && s.external && s.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: a
    });
  }
  drawCaret(t, a, s, n) {
    const o = this.getCaretPosition(t, s, n);
    a.lineTo(o.x1, o.y1), a.lineTo(o.x2, o.y2), a.lineTo(o.x3, o.y3);
  }
  getCaretPosition(t, a, s) {
    const { xAlign: n, yAlign: o } = this, { caretSize: i, cornerRadius: r } = s, { topLeft: c, topRight: d, bottomLeft: u, bottomRight: h } = Ve(r), { x: p, y: v } = t, { width: f, height: m } = a;
    let _, g, b, k, w, M;
    return o === "center" ? (w = v + m / 2, n === "left" ? (_ = p, g = _ - i, k = w + i, M = w - i) : (_ = p + f, g = _ + i, k = w - i, M = w + i), b = _) : (n === "left" ? g = p + Math.max(c, u) + i : n === "right" ? g = p + f - Math.max(d, h) - i : g = this.caretX, o === "top" ? (k = v, w = k - i, _ = g - i, b = g + i) : (k = v + m, w = k + i, _ = g + i, b = g - i), M = k), {
      x1: _,
      x2: g,
      x3: b,
      y1: k,
      y2: w,
      y3: M
    };
  }
  drawTitle(t, a, s) {
    const n = this.title, o = n.length;
    let i, r, c;
    if (o) {
      const d = Ne(s.rtl, this.x, this.width);
      for (t.x = Ba(this, s.titleAlign, s), a.textAlign = d.textAlign(s.titleAlign), a.textBaseline = "middle", i = Lt(s.titleFont), r = s.titleSpacing, a.fillStyle = s.titleColor, a.font = i.string, c = 0; c < o; ++c)
        a.fillText(n[c], d.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + r, c + 1 === o && (t.y += s.titleMarginBottom - r);
    }
  }
  _drawColorBox(t, a, s, n, o) {
    const i = this.labelColors[s], r = this.labelPointStyles[s], { boxHeight: c, boxWidth: d } = o, u = Lt(o.bodyFont), h = Ba(this, "left", o), p = n.x(h), v = c < u.lineHeight ? (u.lineHeight - c) / 2 : 0, f = a.y + v;
    if (o.usePointStyle) {
      const m = {
        radius: Math.min(d, c) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, _ = n.leftForLtr(p, d) + d / 2, g = f + c / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, Ts(t, m, _, g), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, Ts(t, m, _, g);
    } else {
      t.lineWidth = ht(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const m = n.leftForLtr(p, d), _ = n.leftForLtr(n.xPlus(p, 1), d - 2), g = Ve(i.borderRadius);
      Object.values(g).some((b) => b !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, Va(t, {
        x: m,
        y: f,
        w: d,
        h: c,
        radius: g
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), Va(t, {
        x: _,
        y: f + 1,
        w: d - 2,
        h: c - 2,
        radius: g
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(m, f, d, c), t.strokeRect(m, f, d, c), t.fillStyle = i.backgroundColor, t.fillRect(_, f + 1, d - 2, c - 2));
    }
    t.fillStyle = this.labelTextColors[s];
  }
  drawBody(t, a, s) {
    const { body: n } = this, { bodySpacing: o, bodyAlign: i, displayColors: r, boxHeight: c, boxWidth: d, boxPadding: u } = s, h = Lt(s.bodyFont);
    let p = h.lineHeight, v = 0;
    const f = Ne(s.rtl, this.x, this.width), m = function(A) {
      a.fillText(A, f.x(t.x + v), t.y + p / 2), t.y += p + o;
    }, _ = f.textAlign(i);
    let g, b, k, w, M, S, D;
    for (a.textAlign = i, a.textBaseline = "middle", a.font = h.string, t.x = Ba(this, _, s), a.fillStyle = s.bodyColor, vt(this.beforeBody, m), v = r && _ !== "right" ? i === "center" ? d / 2 + u : d + 2 + u : 0, w = 0, S = n.length; w < S; ++w) {
      for (g = n[w], b = this.labelTextColors[w], a.fillStyle = b, vt(g.before, m), k = g.lines, r && k.length && (this._drawColorBox(a, t, w, f, s), p = Math.max(h.lineHeight, c)), M = 0, D = k.length; M < D; ++M)
        m(k[M]), p = h.lineHeight;
      vt(g.after, m);
    }
    v = 0, p = h.lineHeight, vt(this.afterBody, m), t.y -= o;
  }
  drawFooter(t, a, s) {
    const n = this.footer, o = n.length;
    let i, r;
    if (o) {
      const c = Ne(s.rtl, this.x, this.width);
      for (t.x = Ba(this, s.footerAlign, s), t.y += s.footerMarginTop, a.textAlign = c.textAlign(s.footerAlign), a.textBaseline = "middle", i = Lt(s.footerFont), a.fillStyle = s.footerColor, a.font = i.string, r = 0; r < o; ++r)
        a.fillText(n[r], c.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + s.footerSpacing;
    }
  }
  drawBackground(t, a, s, n) {
    const { xAlign: o, yAlign: i } = this, { x: r, y: c } = t, { width: d, height: u } = s, { topLeft: h, topRight: p, bottomLeft: v, bottomRight: f } = Ve(n.cornerRadius);
    a.fillStyle = n.backgroundColor, a.strokeStyle = n.borderColor, a.lineWidth = n.borderWidth, a.beginPath(), a.moveTo(r + h, c), i === "top" && this.drawCaret(t, a, s, n), a.lineTo(r + d - p, c), a.quadraticCurveTo(r + d, c, r + d, c + p), i === "center" && o === "right" && this.drawCaret(t, a, s, n), a.lineTo(r + d, c + u - f), a.quadraticCurveTo(r + d, c + u, r + d - f, c + u), i === "bottom" && this.drawCaret(t, a, s, n), a.lineTo(r + v, c + u), a.quadraticCurveTo(r, c + u, r, c + u - v), i === "center" && o === "left" && this.drawCaret(t, a, s, n), a.lineTo(r, c + h), a.quadraticCurveTo(r, c, r + h, c), a.closePath(), a.fill(), n.borderWidth > 0 && a.stroke();
  }
  _updateAnimationTarget(t) {
    const a = this.chart, s = this.$animations, n = s && s.x, o = s && s.y;
    if (n || o) {
      const i = sa[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const r = this._size = uo(this, t), c = Object.assign({}, i, this._size), d = ho(a, t, c), u = fo(t, c, d, a);
      (n._to !== u.x || o._to !== u.y) && (this.xAlign = d.xAlign, this.yAlign = d.yAlign, this.width = r.width, this.height = r.height, this.caretX = i.x, this.caretY = i.y, this._resolveAnimations().update(this, u));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(t) {
    const a = this.options.setContext(this.getContext());
    let s = this.opacity;
    if (!s)
      return;
    this._updateAnimationTarget(a);
    const n = {
      width: this.width,
      height: this.height
    }, o = {
      x: this.x,
      y: this.y
    };
    s = Math.abs(s) < 1e-3 ? 0 : s;
    const i = qt(a.padding), r = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    a.enabled && r && (t.save(), t.globalAlpha = s, this.drawBackground(o, t, n, a), ii(t, a.textDirection), o.y += i.top, this.drawTitle(o, t, a), this.drawBody(o, t, a), this.drawFooter(o, t, a), ri(t, a.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, a) {
    const s = this._active, n = t.map(({ datasetIndex: r, index: c }) => {
      const d = this.chart.getDatasetMeta(r);
      if (!d)
        throw new Error("Cannot find a dataset at index " + r);
      return {
        datasetIndex: r,
        element: d.data[c],
        index: c
      };
    }), o = !Ea(s, n), i = this._positionChanged(n, a);
    (o || i) && (this._active = n, this._eventPosition = a, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, a, s = !0) {
    if (a && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const n = this.options, o = this._active || [], i = this._getActiveElements(t, o, a, s), r = this._positionChanged(i, t), c = a || !Ea(i, o) || r;
    return c && (this._active = i, (n.enabled || n.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, a))), c;
  }
  _getActiveElements(t, a, s, n) {
    const o = this.options;
    if (t.type === "mouseout")
      return [];
    if (!n)
      return a.filter((r) => this.chart.data.datasets[r.datasetIndex] && this.chart.getDatasetMeta(r.datasetIndex).controller.getParsed(r.index) !== void 0);
    const i = this.chart.getElementsAtEventForMode(t, o.mode, o, s);
    return o.reverse && i.reverse(), i;
  }
  _positionChanged(t, a) {
    const { caretX: s, caretY: n, options: o } = this, i = sa[o.position].call(this, t, a);
    return i !== !1 && (s !== i.x || n !== i.y);
  }
}
var Js = {
  id: "tooltip",
  _element: vo,
  positioners: sa,
  afterInit(e, t, a) {
    a && (e.tooltip = new vo({
      chart: e,
      options: a
    }));
  },
  beforeUpdate(e, t, a) {
    e.tooltip && e.tooltip.initialize(a);
  },
  reset(e, t, a) {
    e.tooltip && e.tooltip.initialize(a);
  },
  afterDraw(e) {
    const t = e.tooltip;
    if (t && t._willRender()) {
      const a = {
        tooltip: t
      };
      if (e.notifyPlugins("beforeTooltipDraw", {
        ...a,
        cancelable: !0
      }) === !1)
        return;
      t.draw(e.ctx), e.notifyPlugins("afterTooltipDraw", a);
    }
  },
  afterEvent(e, t) {
    if (e.tooltip) {
      const a = t.replay;
      e.tooltip.handleEvent(t.event, a, t.inChartArea) && (t.changed = !0);
    }
  },
  defaults: {
    enabled: !0,
    external: null,
    position: "average",
    backgroundColor: "rgba(0,0,0,0.8)",
    titleColor: "#fff",
    titleFont: {
      weight: "bold"
    },
    titleSpacing: 2,
    titleMarginBottom: 6,
    titleAlign: "left",
    bodyColor: "#fff",
    bodySpacing: 2,
    bodyFont: {},
    bodyAlign: "left",
    footerColor: "#fff",
    footerSpacing: 2,
    footerMarginTop: 6,
    footerFont: {
      weight: "bold"
    },
    footerAlign: "left",
    padding: 6,
    caretPadding: 2,
    caretSize: 5,
    cornerRadius: 6,
    boxHeight: (e, t) => t.bodyFont.size,
    boxWidth: (e, t) => t.bodyFont.size,
    multiKeyBackground: "#fff",
    displayColors: !0,
    boxPadding: 0,
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    animation: {
      duration: 400,
      easing: "easeOutQuart"
    },
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "width",
          "height",
          "caretX",
          "caretY"
        ]
      },
      opacity: {
        easing: "linear",
        duration: 200
      }
    },
    callbacks: Li
  },
  defaultRoutes: {
    bodyFont: "font",
    footerFont: "font",
    titleFont: "font"
  },
  descriptors: {
    _scriptable: (e) => e !== "filter" && e !== "itemSort" && e !== "external",
    _indexable: !1,
    callbacks: {
      _scriptable: !1,
      _indexable: !1
    },
    animation: {
      _fallback: !1
    },
    animations: {
      _fallback: "animation"
    }
  },
  additionalOptionScopes: [
    "interaction"
  ]
};
const Lu = (e, t, a, s) => (typeof t == "string" ? (a = e.push(t) - 1, s.unshift({
  index: a,
  label: t
})) : isNaN(t) && (a = null), a);
function Fu(e, t, a, s) {
  const n = e.indexOf(t);
  if (n === -1)
    return Lu(e, t, a, s);
  const o = e.lastIndexOf(t);
  return n !== o ? a : n;
}
const Pu = (e, t) => e === null ? null : Bt(Math.round(e), 0, t);
function bo(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Fi extends je {
  static id = "category";
  static defaults = {
    ticks: {
      callback: bo
    }
  };
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const a = this._addedLabels;
    if (a.length) {
      const s = this.getLabels();
      for (const { index: n, label: o } of a)
        s[n] === o && s.splice(n, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, a) {
    if (pt(t))
      return null;
    const s = this.getLabels();
    return a = isFinite(a) && s[a] === t ? a : Fu(s, t, it(a, t), this._addedLabels), Pu(a, s.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: a } = this.getUserBounds();
    let { min: s, max: n } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (s = 0), a || (n = this.getLabels().length - 1)), this.min = s, this.max = n;
  }
  buildTicks() {
    const t = this.min, a = this.max, s = this.options.offset, n = [];
    let o = this.getLabels();
    o = t === 0 && a === o.length - 1 ? o : o.slice(t, a + 1), this._valueRange = Math.max(o.length - (s ? 0 : 1), 1), this._startValue = this.min - (s ? 0.5 : 0);
    for (let i = t; i <= a; i++)
      n.push({
        value: i
      });
    return n;
  }
  getLabelForValue(t) {
    return bo.call(this, t);
  }
  configure() {
    super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
  }
  getPixelForValue(t) {
    return typeof t != "number" && (t = this.parse(t)), t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getPixelForTick(t) {
    const a = this.ticks;
    return t < 0 || t > a.length - 1 ? null : this.getPixelForValue(a[t].value);
  }
  getValueForPixel(t) {
    return Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
}
function Iu(e, t) {
  const a = [], { bounds: n, step: o, min: i, max: r, precision: c, count: d, maxTicks: u, maxDigits: h, includeBounds: p } = e, v = o || 1, f = u - 1, { min: m, max: _ } = t, g = !pt(i), b = !pt(r), k = !pt(d), w = (_ - m) / (h + 1);
  let M = hn((_ - m) / f / v) * v, S, D, A, T;
  if (M < 1e-14 && !g && !b)
    return [
      {
        value: m
      },
      {
        value: _
      }
    ];
  T = Math.ceil(_ / M) - Math.floor(m / M), T > f && (M = hn(T * M / f / v) * v), pt(c) || (S = Math.pow(10, c), M = Math.ceil(M * S) / S), n === "ticks" ? (D = Math.floor(m / M) * M, A = Math.ceil(_ / M) * M) : (D = m, A = _), g && b && o && Pr((r - i) / o, M / 1e3) ? (T = Math.round(Math.min((r - i) / M, u)), M = (r - i) / T, D = i, A = r) : k ? (D = g ? i : D, A = b ? r : A, T = d - 1, M = (A - D) / T) : (T = (A - D) / M, oa(T, Math.round(T), M / 1e3) ? T = Math.round(T) : T = Math.ceil(T));
  const B = Math.max(fn(M), fn(D));
  S = Math.pow(10, pt(c) ? B : c), D = Math.round(D * S) / S, A = Math.round(A * S) / S;
  let F = 0;
  for (g && (p && D !== i ? (a.push({
    value: i
  }), D < i && F++, oa(Math.round((D + F * M) * S) / S, i, mo(i, w, e)) && F++) : D < i && F++); F < T; ++F) {
    const E = Math.round((D + F * M) * S) / S;
    if (b && E > r)
      break;
    a.push({
      value: E
    });
  }
  return b && p && A !== r ? a.length && oa(a[a.length - 1].value, r, mo(r, w, e)) ? a[a.length - 1].value = r : a.push({
    value: r
  }) : (!b || A === r) && a.push({
    value: A
  }), a;
}
function mo(e, t, { horizontal: a, minRotation: s }) {
  const n = ie(s), o = (a ? Math.sin(n) : Math.cos(n)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / o, i);
}
class Ru extends je {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, a) {
    return pt(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: a, maxDefined: s } = this.getUserBounds();
    let { min: n, max: o } = this;
    const i = (c) => n = a ? n : c, r = (c) => o = s ? o : c;
    if (t) {
      const c = Jt(n), d = Jt(o);
      c < 0 && d < 0 ? r(0) : c > 0 && d > 0 && i(0);
    }
    if (n === o) {
      let c = o === 0 ? 1 : Math.abs(o * 0.05);
      r(o + c), t || i(n - c);
    }
    this.min = n, this.max = o;
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: a, stepSize: s } = t, n;
    return s ? (n = Math.ceil(this.max / s) - Math.floor(this.min / s) + 1, n > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${s} would result generating up to ${n} ticks. Limiting to 1000.`), n = 1e3)) : (n = this.computeTickLimit(), a = a || 11), a && (n = Math.min(a, n)), n;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, a = t.ticks;
    let s = this.getTickLimit();
    s = Math.max(2, s);
    const n = {
      maxTicks: s,
      bounds: t.bounds,
      min: t.min,
      max: t.max,
      precision: a.precision,
      step: a.stepSize,
      count: a.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: a.minRotation || 0,
      includeBounds: a.includeBounds !== !1
    }, o = this._range || this, i = Iu(n, o);
    return t.bounds === "ticks" && Ir(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
  }
  configure() {
    const t = this.ticks;
    let a = this.min, s = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const n = (s - a) / Math.max(t.length - 1, 1) / 2;
      a -= n, s += n;
    }
    this._startValue = a, this._endValue = s, this._valueRange = s - a;
  }
  getLabelForValue(t) {
    return js(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Pi extends Ru {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: Qo.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: a } = this.getMinMax(!0);
    this.min = Pt(t) ? t : 0, this.max = Pt(a) ? a : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), a = t ? this.width : this.height, s = ie(this.options.ticks.minRotation), n = (t ? Math.sin(s) : Math.cos(s)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(a / Math.min(40, o.lineHeight / n));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const Za = {
  millisecond: {
    common: !0,
    size: 1,
    steps: 1e3
  },
  second: {
    common: !0,
    size: 1e3,
    steps: 60
  },
  minute: {
    common: !0,
    size: 6e4,
    steps: 60
  },
  hour: {
    common: !0,
    size: 36e5,
    steps: 24
  },
  day: {
    common: !0,
    size: 864e5,
    steps: 30
  },
  week: {
    common: !1,
    size: 6048e5,
    steps: 4
  },
  month: {
    common: !0,
    size: 2628e6,
    steps: 12
  },
  quarter: {
    common: !1,
    size: 7884e6,
    steps: 4
  },
  year: {
    common: !0,
    size: 3154e7
  }
}, Ot = /* @__PURE__ */ Object.keys(Za);
function yo(e, t) {
  return e - t;
}
function _o(e, t) {
  if (pt(t))
    return null;
  const a = e._adapter, { parser: s, round: n, isoWeekday: o } = e._parseOpts;
  let i = t;
  return typeof s == "function" && (i = s(i)), Pt(i) || (i = typeof s == "string" ? a.parse(i, s) : a.parse(i)), i === null ? null : (n && (i = n === "week" && (fa(o) || o === !0) ? a.startOf(i, "isoWeek", o) : a.startOf(i, n)), +i);
}
function xo(e, t, a, s) {
  const n = Ot.length;
  for (let o = Ot.indexOf(e); o < n - 1; ++o) {
    const i = Za[Ot[o]], r = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((a - t) / (r * i.size)) <= s)
      return Ot[o];
  }
  return Ot[n - 1];
}
function Eu(e, t, a, s, n) {
  for (let o = Ot.length - 1; o >= Ot.indexOf(a); o--) {
    const i = Ot[o];
    if (Za[i].common && e._adapter.diff(n, s, i) >= t - 1)
      return i;
  }
  return Ot[a ? Ot.indexOf(a) : 0];
}
function Ou(e) {
  for (let t = Ot.indexOf(e) + 1, a = Ot.length; t < a; ++t)
    if (Za[Ot[t]].common)
      return Ot[t];
}
function ko(e, t, a) {
  if (!a)
    e[t] = !0;
  else if (a.length) {
    const { lo: s, hi: n } = Ns(a, t), o = a[s] >= t ? a[s] : a[n];
    e[o] = !0;
  }
}
function zu(e, t, a, s) {
  const n = e._adapter, o = +n.startOf(t[0].value, s), i = t[t.length - 1].value;
  let r, c;
  for (r = o; r <= i; r = +n.add(r, 1, s))
    c = a[r], c >= 0 && (t[c].major = !0);
  return t;
}
function wo(e, t, a) {
  const s = [], n = {}, o = t.length;
  let i, r;
  for (i = 0; i < o; ++i)
    r = t[i], n[r] = i, s.push({
      value: r,
      major: !1
    });
  return o === 0 || !a ? s : zu(e, s, n, a);
}
class $o extends je {
  static id = "time";
  static defaults = {
    bounds: "data",
    adapters: {},
    time: {
      parser: !1,
      unit: !1,
      round: !1,
      isoWeekday: !1,
      minUnit: "millisecond",
      displayFormats: {}
    },
    ticks: {
      source: "auto",
      callback: !1,
      major: {
        enabled: !1
      }
    }
  };
  constructor(t) {
    super(t), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(t, a = {}) {
    const s = t.time || (t.time = {}), n = this._adapter = new xc._date(t.adapters.date);
    n.init(a), na(s.displayFormats, n.formats()), this._parseOpts = {
      parser: s.parser,
      round: s.round,
      isoWeekday: s.isoWeekday
    }, super.init(t), this._normalized = a.normalized;
  }
  parse(t, a) {
    return t === void 0 ? null : _o(this, t);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const t = this.options, a = this._adapter, s = t.time.unit || "day";
    let { min: n, max: o, minDefined: i, maxDefined: r } = this.getUserBounds();
    function c(d) {
      !i && !isNaN(d.min) && (n = Math.min(n, d.min)), !r && !isNaN(d.max) && (o = Math.max(o, d.max));
    }
    (!i || !r) && (c(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && c(this.getMinMax(!1))), n = Pt(n) && !isNaN(n) ? n : +a.startOf(Date.now(), s), o = Pt(o) && !isNaN(o) ? o : +a.endOf(Date.now(), s) + 1, this.min = Math.min(n, o - 1), this.max = Math.max(n + 1, o);
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let a = Number.POSITIVE_INFINITY, s = Number.NEGATIVE_INFINITY;
    return t.length && (a = t[0], s = t[t.length - 1]), {
      min: a,
      max: s
    };
  }
  buildTicks() {
    const t = this.options, a = t.time, s = t.ticks, n = s.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && n.length && (this.min = this._userMin || n[0], this.max = this._userMax || n[n.length - 1]);
    const o = this.min, i = this.max, r = Vr(n, o, i);
    return this._unit = a.unit || (s.autoSkip ? xo(a.minUnit, this.min, this.max, this._getLabelCapacity(o)) : Eu(this, r.length, a.minUnit, this.min, this.max)), this._majorUnit = !s.major.enabled || this._unit === "year" ? void 0 : Ou(this._unit), this.initOffsets(n), t.reverse && r.reverse(), wo(this, r, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let a = 0, s = 0, n, o;
    this.options.offset && t.length && (n = this.getDecimalForValue(t[0]), t.length === 1 ? a = 1 - n : a = (this.getDecimalForValue(t[1]) - n) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? s = o : s = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    a = Bt(a, 0, i), s = Bt(s, 0, i), this._offsets = {
      start: a,
      end: s,
      factor: 1 / (a + 1 + s)
    };
  }
  _generate() {
    const t = this._adapter, a = this.min, s = this.max, n = this.options, o = n.time, i = o.unit || xo(o.minUnit, a, s, this._getLabelCapacity(a)), r = it(n.ticks.stepSize, 1), c = i === "week" ? o.isoWeekday : !1, d = fa(c) || c === !0, u = {};
    let h = a, p, v;
    if (d && (h = +t.startOf(h, "isoWeek", c)), h = +t.startOf(h, d ? "day" : i), t.diff(s, a, i) > 1e5 * r)
      throw new Error(a + " and " + s + " are too far apart with stepSize of " + r + " " + i);
    const f = n.ticks.source === "data" && this.getDataTimestamps();
    for (p = h, v = 0; p < s; p = +t.add(p, r, i), v++)
      ko(u, p, f);
    return (p === s || n.bounds === "ticks" || v === 1) && ko(u, p, f), Object.keys(u).sort(yo).map((m) => +m);
  }
  getLabelForValue(t) {
    const a = this._adapter, s = this.options.time;
    return s.tooltipFormat ? a.format(t, s.tooltipFormat) : a.format(t, s.displayFormats.datetime);
  }
  format(t, a) {
    const n = this.options.time.displayFormats, o = this._unit, i = a || n[o];
    return this._adapter.format(t, i);
  }
  _tickFormatFunction(t, a, s, n) {
    const o = this.options, i = o.ticks.callback;
    if (i)
      return yt(i, [
        t,
        a,
        s
      ], this);
    const r = o.time.displayFormats, c = this._unit, d = this._majorUnit, u = c && r[c], h = d && r[d], p = s[a], v = d && h && p && p.major;
    return this._adapter.format(t, n || (v ? h : u));
  }
  generateTickLabels(t) {
    let a, s, n;
    for (a = 0, s = t.length; a < s; ++a)
      n = t[a], n.label = this._tickFormatFunction(n.value, a, t);
  }
  getDecimalForValue(t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const a = this._offsets, s = this.getDecimalForValue(t);
    return this.getPixelForDecimal((a.start + s) * a.factor);
  }
  getValueForPixel(t) {
    const a = this._offsets, s = this.getDecimalForPixel(t) / a.factor - a.end;
    return this.min + s * (this.max - this.min);
  }
  _getLabelSize(t) {
    const a = this.options.ticks, s = this.ctx.measureText(t).width, n = ie(this.isHorizontal() ? a.maxRotation : a.minRotation), o = Math.cos(n), i = Math.sin(n), r = this._resolveTickFontOptions(0).size;
    return {
      w: s * o + r * i,
      h: s * i + r * o
    };
  }
  _getLabelCapacity(t) {
    const a = this.options.time, s = a.displayFormats, n = s[a.unit] || s.millisecond, o = this._tickFormatFunction(t, 0, wo(this, [
      t
    ], this._majorUnit), n), i = this._getLabelSize(o), r = Math.floor(this.isHorizontal() ? this.width / i.w : this.height / i.h) - 1;
    return r > 0 ? r : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], a, s;
    if (t.length)
      return t;
    const n = this.getMatchingVisibleMetas();
    if (this._normalized && n.length)
      return this._cache.data = n[0].controller.getAllParsedValues(this);
    for (a = 0, s = n.length; a < s; ++a)
      t = t.concat(n[a].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let a, s;
    if (t.length)
      return t;
    const n = this.getLabels();
    for (a = 0, s = n.length; a < s; ++a)
      t.push(_o(this, n[a]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Xo(t.sort(yo));
  }
}
function La(e, t, a) {
  let s = 0, n = e.length - 1, o, i, r, c;
  a ? (t >= e[s].pos && t <= e[n].pos && ({ lo: s, hi: n } = Ae(e, "pos", t)), { pos: o, time: r } = e[s], { pos: i, time: c } = e[n]) : (t >= e[s].time && t <= e[n].time && ({ lo: s, hi: n } = Ae(e, "time", t)), { time: o, pos: r } = e[s], { time: i, pos: c } = e[n]);
  const d = i - o;
  return d ? r + (c - r) * (t - o) / d : r;
}
class aC extends $o {
  static id = "timeseries";
  static defaults = $o.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), a = this._table = this.buildLookupTable(t);
    this._minPos = La(a, this.min), this._tableRange = La(a, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: a, max: s } = this, n = [], o = [];
    let i, r, c, d, u;
    for (i = 0, r = t.length; i < r; ++i)
      d = t[i], d >= a && d <= s && n.push(d);
    if (n.length < 2)
      return [
        {
          time: a,
          pos: 0
        },
        {
          time: s,
          pos: 1
        }
      ];
    for (i = 0, r = n.length; i < r; ++i)
      u = n[i + 1], c = n[i - 1], d = n[i], Math.round((u + c) / 2) !== d && o.push({
        time: d,
        pos: i / (r - 1)
      });
    return o;
  }
  _generate() {
    const t = this.min, a = this.max;
    let s = super.getDataTimestamps();
    return (!s.includes(t) || !s.length) && s.splice(0, 0, t), (!s.includes(a) || s.length === 1) && s.push(a), s.sort((n, o) => n - o);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const a = this.getDataTimestamps(), s = this.getLabelTimestamps();
    return a.length && s.length ? t = this.normalize(a.concat(s)) : t = a.length ? a : s, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (La(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const a = this._offsets, s = this.getDecimalForPixel(t) / a.factor - a.end;
    return La(this._table, s * this._tableRange + this._minPos, !0);
  }
}
const Ii = {
  data: {
    type: Object,
    required: !0
  },
  options: {
    type: Object,
    default: () => ({})
  },
  plugins: {
    type: Array,
    default: () => []
  },
  datasetIdKey: {
    type: String,
    default: "label"
  },
  updateMode: {
    type: String,
    default: void 0
  }
}, Vu = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, Nu = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...Ii,
  ...Vu
}, Wu = Gi[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function Oe(e) {
  return Eo(e) ? Ms(e) : e;
}
function Hu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return Eo(t) ? new Proxy(e, {}) : e;
}
function ju(e, t) {
  const a = e.options;
  a && t && Object.assign(a, t);
}
function Ri(e, t) {
  e.labels = t;
}
function Ei(e, t, a) {
  const s = [];
  e.datasets = t.map((n) => {
    const o = e.datasets.find((i) => i[a] === n[a]);
    return !o || !n.data || s.includes(o) ? {
      ...n
    } : (s.push(o), Object.assign(o, n), o);
  });
}
function Yu(e, t) {
  const a = {
    labels: [],
    datasets: []
  };
  return Ri(a, e.labels), Ei(a, e.datasets, t), a;
}
const qu = J({
  props: Nu,
  setup(e, t) {
    let { expose: a, slots: s } = t;
    const n = at(null), o = Ro(null);
    a({
      chart: o
    });
    const i = () => {
      if (!n.value) return;
      const { type: d, data: u, options: h, plugins: p, datasetIdKey: v } = e, f = Yu(u, v), m = Hu(f, u);
      o.value = new Ye(n.value, {
        type: d,
        data: m,
        options: {
          ...h
        },
        plugins: p
      });
    }, r = () => {
      const d = Ms(o.value);
      d && (e.destroyDelay > 0 ? setTimeout(() => {
        d.destroy(), o.value = null;
      }, e.destroyDelay) : (d.destroy(), o.value = null));
    }, c = (d) => {
      d.update(e.updateMode);
    };
    return ee(i), Pe(r), Ft([
      () => e.options,
      () => e.data
    ], (d, u) => {
      let [h, p] = d, [v, f] = u;
      const m = Ms(o.value);
      if (!m)
        return;
      let _ = !1;
      if (h) {
        const g = Oe(h), b = Oe(v);
        g && g !== b && (ju(m, g), _ = !0);
      }
      if (p) {
        const g = Oe(p.labels), b = Oe(f.labels), k = Oe(p.datasets), w = Oe(f.datasets);
        g !== b && (Ri(m.config.data, g), _ = !0), k && k !== w && (Ei(m.config.data, k, e.datasetIdKey), _ = !0);
      }
      _ && St(() => {
        c(m);
      });
    }, {
      deep: !0
    }), () => $s("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: n
    }, [
      $s("p", {}, [
        s.default ? s.default() : ""
      ])
    ]);
  }
});
function tn(e, t) {
  return Ye.register(t), J({
    props: Ii,
    setup(a, s) {
      let { expose: n } = s;
      const o = Ro(null), i = (r) => {
        o.value = r?.chart;
      };
      return n({
        chart: o
      }), () => $s(qu, Wu({
        ref: i
      }, {
        type: e,
        ...a
      }));
    }
  });
}
const Uu = /* @__PURE__ */ tn("bar", vc), Ku = /* @__PURE__ */ tn("line", yc), Xu = /* @__PURE__ */ tn("pie", _c), Mo = {
  // Backgrounds
  bgPrimary: "#f8f9fa",
  bgSecondary: "#ffffff",
  bgCard: "#ffffff",
  bgCardGradientStart: "#ffffff",
  bgCardGradientEnd: "#fafafa",
  bgTable: "#ffffff",
  bgTableHeader: "#f8fafc",
  bgTableHover: "#f8fafc",
  // Text
  textPrimary: "#1e293b",
  textSecondary: "#64748b",
  textMuted: "#94a3b8",
  // Borders & Lines
  borderColor: "rgba(93, 75, 147, 0.1)",
  borderLight: "rgba(0, 0, 0, 0.05)",
  gridLines: "rgba(148, 163, 184, 0.12)",
  // Shadows
  shadowLight: "rgba(0, 0, 0, 0.05)",
  shadowMedium: "rgba(0, 0, 0, 0.08)",
  shadowHeavy: "rgba(0, 0, 0, 0.1)",
  // Charts specific
  tooltipBg: "rgba(15, 23, 42, 0.95)",
  tooltipText: "#f1f5f9",
  tooltipBorder: "rgba(148, 163, 184, 0.2)",
  // Status colors
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  info: "#3b82f6",
  // Brand colors
  primaryLight: "#c67dff",
  primaryDefault: "#5d4b93",
  primaryDark: "#4a3a75"
}, So = {
  // Backgrounds
  bgPrimary: "#000000",
  bgSecondary: "#1a1a1d",
  bgCard: "#1a1a1d",
  bgCardGradientStart: "#1a1a1d",
  bgCardGradientEnd: "#0f0f11",
  bgTable: "#1a1a1d",
  bgTableHeader: "#252528",
  bgTableHover: "#252528",
  // Text
  textPrimary: "#f8f9fa",
  textSecondary: "#9ca3af",
  textMuted: "#6b7280",
  // Borders & Lines
  borderColor: "rgba(198, 125, 255, 0.15)",
  borderLight: "rgba(198, 125, 255, 0.08)",
  gridLines: "rgba(198, 125, 255, 0.12)",
  // Shadows
  shadowLight: "rgba(0, 0, 0, 0.3)",
  shadowMedium: "rgba(0, 0, 0, 0.4)",
  shadowHeavy: "rgba(0, 0, 0, 0.5)",
  // Charts specific
  tooltipBg: "rgba(26, 26, 29, 0.98)",
  tooltipText: "#f8f9fa",
  tooltipBorder: "rgba(198, 125, 255, 0.2)",
  // Status colors
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  info: "#3b82f6",
  // Brand colors
  primaryLight: "#c67dff",
  primaryDefault: "#5d4b93",
  primaryDark: "#4a3a75"
}, Gu = [
  "#C67DFF",
  // Purple light
  "#5D4B93",
  // Purple default
  "#73D1D3",
  // Cyan
  "#1EC383",
  // Green
  "#F496A6",
  // Pink
  "#F3A332",
  // Orange
  "#7D8AFA"
  // Blue
];
function lt(e) {
  const t = at("light");
  let a = null;
  const s = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", n = C(() => e?.value ? e.value : t.value), o = C(() => n.value === "dark"), i = C(() => o.value ? So : Mo), r = () => {
    typeof document > "u" || (t.value = s(), a = new MutationObserver((d) => {
      for (const u of d)
        u.attributeName === "class" && (t.value = s());
    }), a.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class"]
    }));
  }, c = () => {
    a && (a.disconnect(), a = null);
  };
  return ee(() => {
    r();
  }), Pe(() => {
    c();
  }), e && Ft(e, () => {
  }), {
    isDark: o,
    currentTheme: n,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: Mo,
    darkColors: So,
    chartSeriesColors: Gu
  };
}
const Zu = { class: "chart-container" }, Qu = /* @__PURE__ */ J({
  __name: "ChartBar",
  props: {
    data: {},
    options: {},
    stacked: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    Ye.register(
      Fi,
      Pi,
      Qd,
      Bi,
      Js,
      Qs
    );
    const { isDark: s, colors: n } = lt(rt(a, "theme")), o = a.data, i = (c) => typeof c == "string" ? c.charAt(0).toUpperCase() + c.slice(1).toLowerCase() : c, r = C(() => a.options ? a.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      interaction: {
        mode: "index",
        intersect: !1
      },
      plugins: {
        legend: {
          display: !0,
          position: "top",
          align: "end",
          labels: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 13,
              weight: 500
            },
            color: n.value.textSecondary,
            padding: 12,
            boxWidth: 12,
            boxHeight: 12,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "rectRounded"
          },
          generateLabels: function(c) {
            return c.data.datasets.map((u, h) => ({
              text: i(u.label || ""),
              fillStyle: Array.isArray(u.backgroundColor) ? u.backgroundColor[0] : u.backgroundColor,
              strokeStyle: Array.isArray(u.borderColor) ? u.borderColor[0] : u.borderColor,
              lineWidth: u.borderWidth,
              hidden: !c.isDatasetVisible(h),
              index: h,
              datasetIndex: h
            }));
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
          bodyColor: s.value ? "#d1d5db" : "#e2e8f0",
          borderColor: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          displayColors: !0,
          titleFont: {
            family: "'DM Sans', sans-serif",
            size: 13,
            weight: 600
          },
          bodyFont: {
            family: "'DM Sans', sans-serif",
            size: 12,
            weight: 500
          },
          boxPadding: 6,
          callbacks: {
            title: function(c) {
              return c.length > 0 ? String(i(c[0].label)) : "";
            },
            label: function(c) {
              let d = String(i(c.dataset.label || ""));
              return d && (d += ": "), c.parsed.y !== null && (d += c.parsed.y), d;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: !0,
          stacked: a.stacked || !1,
          border: {
            display: !1
          },
          grid: {
            color: n.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: n.value.textSecondary,
            padding: 8,
            callback: function(c) {
              return i(c);
            }
          }
        },
        x: {
          stacked: a.stacked || !1,
          border: {
            display: !1
          },
          grid: {
            color: n.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: n.value.textSecondary,
            padding: 8,
            callback: function(c) {
              const d = this.getLabelForValue(c);
              return i(d);
            }
          }
        }
      },
      elements: {
        bar: {
          borderRadius: 8,
          borderWidth: 0
        }
      }
    });
    return t({ isDark: s }), (c, d) => (y(), x("div", Zu, [
      Q(L(Uu), {
        data: L(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), nt = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [s, n] of t)
    a[s] = n;
  return a;
}, le = /* @__PURE__ */ nt(Qu, [["__scopeId", "data-v-105d8c6f"]]), Ju = { class: "chart-container" }, th = /* @__PURE__ */ J({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    Ye.register(
      Fi,
      Pi,
      qd,
      Xa,
      Bi,
      Js,
      Qs,
      mu
    );
    const { isDark: s, colors: n } = lt(rt(a, "theme")), o = a.data, i = (c) => typeof c == "string" ? c.charAt(0).toUpperCase() + c.slice(1).toLowerCase() : c, r = C(() => a.options ? a.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      interaction: {
        mode: "index",
        intersect: !1
      },
      plugins: {
        legend: {
          display: !0,
          position: "top",
          align: "end",
          labels: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 13,
              weight: 500
            },
            color: n.value.textSecondary,
            padding: 12,
            boxWidth: 12,
            boxHeight: 12,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "circle",
            generateLabels: function(c) {
              return c.data.datasets.map((u, h) => ({
                text: i(u.label || ""),
                fillStyle: u.backgroundColor,
                strokeStyle: u.borderColor,
                lineWidth: u.borderWidth,
                hidden: !c.isDatasetVisible(h),
                index: h,
                datasetIndex: h
              }));
            }
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
          bodyColor: s.value ? "#d1d5db" : "#e2e8f0",
          borderColor: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          displayColors: !0,
          titleFont: {
            family: "'DM Sans', sans-serif",
            size: 13,
            weight: 600
          },
          bodyFont: {
            family: "'DM Sans', sans-serif",
            size: 12,
            weight: 500
          },
          boxPadding: 6,
          callbacks: {
            title: function(c) {
              return c.length > 0 ? String(i(c[0].label)) : "";
            },
            label: function(c) {
              let d = String(i(c.dataset.label || ""));
              return d && (d += ": "), c.parsed.y !== null && (d += c.parsed.y), d;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: !0,
          border: {
            display: !1
          },
          grid: {
            color: n.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: n.value.textSecondary,
            padding: 8,
            callback: function(c) {
              return i(c);
            }
          }
        },
        x: {
          border: {
            display: !1
          },
          grid: {
            color: n.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: n.value.textSecondary,
            padding: 8,
            callback: function(c) {
              const d = this.getLabelForValue(c);
              return i(d);
            }
          }
        }
      },
      elements: {
        line: {
          tension: 0.4,
          borderWidth: 2.5,
          borderCapStyle: "round"
        },
        point: {
          radius: 4,
          hoverRadius: 6,
          borderWidth: 2,
          backgroundColor: s.value ? "#1a1a1d" : "#ffffff",
          hoverBorderWidth: 3
        }
      }
    });
    return t({ isDark: s }), (c, d) => (y(), x("div", Ju, [
      Q(L(Ku), {
        data: L(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), _e = /* @__PURE__ */ nt(th, [["__scopeId", "data-v-bacd3848"]]), eh = { class: "chart-container" }, ah = /* @__PURE__ */ J({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    Ye.register(Rd, Js, Qs);
    const { isDark: s, colors: n } = lt(rt(a, "theme")), o = a.data, i = (c) => typeof c == "string" ? c.charAt(0).toUpperCase() + c.slice(1).toLowerCase() : c, r = C(() => a.options ? a.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      cutout: a.doughnut ? "60%" : 0,
      plugins: {
        legend: {
          display: !0,
          position: "bottom",
          align: "center",
          labels: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 13,
              weight: 500
            },
            color: n.value.textSecondary,
            padding: 16,
            boxWidth: 14,
            boxHeight: 14,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "circle",
            generateLabels: function(c) {
              const d = c.data;
              return d.labels.length && d.datasets.length ? d.labels.map((u, h) => {
                const p = c.getDatasetMeta(0), v = d.datasets[0], f = v.data[h], m = Array.isArray(v.backgroundColor) ? v.backgroundColor[h] : v.backgroundColor;
                return {
                  text: `${i(u)}: ${f}`,
                  fillStyle: m,
                  hidden: p.data[h]?.hidden || !1,
                  index: h
                };
              }) : [];
            }
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
          bodyColor: s.value ? "#d1d5db" : "#e2e8f0",
          borderColor: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          displayColors: !0,
          titleFont: {
            family: "'DM Sans', sans-serif",
            size: 13,
            weight: 600
          },
          bodyFont: {
            family: "'DM Sans', sans-serif",
            size: 12,
            weight: 500
          },
          boxPadding: 6,
          callbacks: {
            title: function(c) {
              return c.length > 0 ? String(i(c[0].label)) : "";
            },
            label: function(c) {
              const d = c.label || "", u = c.parsed || 0, h = c.dataset.data.reduce((v, f) => v + f, 0), p = (u / h * 100).toFixed(1);
              return `${i(d)}: ${u} (${p}%)`;
            }
          }
        }
      },
      elements: {
        arc: {
          borderWidth: 2,
          borderColor: s.value ? "#1a1a1d" : "#ffffff",
          hoverOffset: 8
        }
      },
      animation: {
        animateRotate: !0,
        animateScale: !0
      }
    });
    return t({ isDark: s }), (c, d) => (y(), x("div", eh, [
      Q(L(Xu), {
        data: L(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Qa = /* @__PURE__ */ nt(ah, [["__scopeId", "data-v-23a84317"]]), sh = { class: "chart-container" }, nh = ["viewBox"], oh = ["transform"], ih = ["x", "width", "fill", "stroke"], rh = ["fill"], lh = ["x1", "y1", "x2", "y2", "stroke"], ch = ["points", "fill"], dh = ["x1", "y1", "x2", "y2", "stroke"], uh = ["x", "y", "fill"], hh = ["x1", "y1", "x2", "y2", "stroke"], fh = ["points", "fill"], gh = ["transform"], ph = ["y1", "y2"], vh = ["y1", "y2"], bh = ["y1", "y2"], mh = ["y1", "y2"], yh = ["y", "height"], _h = ["y1", "y2"], xh = ["y1", "y2"], kh = ["y1", "y2"], wh = ["y1", "y2"], $h = ["y", "height"], Mh = ["cy", "stroke", "onMouseenter"], Sh = ["cy", "stroke", "onMouseenter"], Ch = ["cy", "stroke", "onMouseenter"], Dh = ["cy", "stroke", "onMouseenter"], Ah = ["y1", "y2", "onMouseenter"], Th = ["y1", "y2", "onMouseenter"], Bh = ["x", "y", "fill"], Lh = ["x", "y", "fill"], Fh = ["transform"], Ph = { transform: "translate(-200, 0)" }, Ih = ["stroke"], Rh = ["fill"], Eh = { transform: "translate(-130, 0)" }, Oh = ["stroke"], zh = ["fill"], Vh = { transform: "translate(-60, 0)" }, Nh = ["stroke"], Wh = ["fill"], Hh = { transform: "translate(10, 0)" }, jh = ["stroke"], Yh = ["fill"], qh = { transform: "translate(80, 0)" }, Uh = ["fill"], Kh = { transform: "translate(150, 0)" }, Xh = ["fill"], Gh = /* @__PURE__ */ J({
  __name: "BoxplotChart",
  props: {
    boxplotData: {},
    chartWidth: { default: 800 },
    chartHeight: { default: 400 },
    chartMargin: { default: 70 },
    chartBottomMargin: { default: 90 },
    showLegend: { type: Boolean, default: !0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s } = lt(rt(a, "theme")), n = C(() => ({
      // Tooltip
      tooltipBg: s.value ? "rgba(26, 26, 29, 0.98)" : "rgba(15, 23, 42, 0.95)",
      tooltipBorder: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
      tooltipText: s.value ? "#f8f9fa" : "#f1f5f9",
      // Axis
      axis: s.value ? "#9ca3af" : "#475569",
      // Ticks
      tickLine: s.value ? "#4b5563" : "#cbd5e1",
      tickText: s.value ? "#9ca3af" : "#64748b",
      // Labels
      labelText: s.value ? "#d1d5db" : "#475569",
      legendText: s.value ? "#d1d5db" : "#475569",
      // Dots
      dotStroke: s.value ? "#1a1a1d" : "#ffffff"
    })), o = at({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), i = (p) => typeof p == "string" ? p.charAt(0).toUpperCase() + p.slice(1).toLowerCase() : p, r = (p, v) => {
      const f = p.currentTarget.closest("svg");
      if (!f) return;
      const m = f.getBoundingClientRect(), _ = f.createSVGPoint();
      _.x = p.clientX - m.left, _.y = p.clientY - m.top, o.value = {
        visible: !0,
        x: _.x,
        y: _.y - 20,
        text: v
      };
    }, c = (p) => {
      if (o.value.visible) {
        const v = p.currentTarget, f = v.getBoundingClientRect(), m = v.createSVGPoint();
        m.x = p.clientX - f.left, m.y = p.clientY - f.top, o.value.x = m.x, o.value.y = m.y - 20;
      }
    }, d = () => {
      o.value.visible = !1;
    }, u = () => {
      o.value.visible = !1;
    }, h = C(() => {
      const p = [], f = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let m = 1; m <= 10; m++) {
        const _ = m, g = (_ - 1) / 9, b = a.chartMargin + f - g * f;
        p.push({ value: _, y: b });
      }
      return p;
    });
    return t({ isDark: s }), (p, v) => (y(), x("div", sh, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: ft(`min-height: ${e.chartHeight}px;`),
        onMousemove: c,
        onMouseleave: d
      }, [
        o.value.visible ? (y(), x("g", {
          key: 0,
          transform: `translate(${o.value.x}, ${o.value.y})`
        }, [
          l("rect", {
            x: -(o.value.text.length * 6 + 10),
            y: -16,
            width: o.value.text.length * 12 + 20,
            height: "24",
            fill: n.value.tooltipBg,
            rx: "6",
            stroke: n.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, ih),
          l("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, $(o.value.text), 9, rh)
        ], 8, oh)) : I("", !0),
        l("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, lh),
        l("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, ch),
        (y(!0), x(K, null, tt(h.value, (f, m) => (y(), x(K, { key: m }, [
          l("line", {
            x1: e.chartMargin - 6,
            y1: f.y,
            x2: e.chartMargin,
            y2: f.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, dh),
          l("text", {
            x: e.chartMargin - 12,
            y: f.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, $(f.value), 9, uh)
        ], 64))), 128)),
        l("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, hh),
        l("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, fh),
        (y(!0), x(K, null, tt(e.boxplotData, (f, m) => (y(), x(K, { key: m }, [
          l("g", {
            transform: `translate(${f.centerX}, 0)`
          }, [
            f.isTotal ? (y(), x(K, { key: 0 }, [
              l("line", {
                x1: 0,
                y1: f.minY,
                x2: 0,
                y2: f.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, ph),
              l("line", {
                x1: 0,
                y1: f.q3Y,
                x2: 0,
                y2: f.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, vh),
              l("line", {
                x1: -18,
                y1: f.minY,
                x2: 18,
                y2: f.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, bh),
              l("line", {
                x1: -18,
                y1: f.maxY,
                x2: 18,
                y2: f.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, mh),
              l("rect", {
                x: -24,
                y: f.q3Y,
                width: "48",
                height: f.q1Y - f.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, yh)
            ], 64)) : (y(), x(K, { key: 1 }, [
              l("line", {
                x1: 0,
                y1: f.minY,
                x2: 0,
                y2: f.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, _h),
              l("line", {
                x1: 0,
                y1: f.q3Y,
                x2: 0,
                y2: f.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, xh),
              l("line", {
                x1: -18,
                y1: f.minY,
                x2: 18,
                y2: f.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, kh),
              l("line", {
                x1: -18,
                y1: f.maxY,
                x2: 18,
                y2: f.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, wh),
              l("rect", {
                x: -24,
                y: f.q3Y,
                width: "48",
                height: f.q1Y - f.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, $h)
            ], 64)),
            l("circle", {
              cx: 0,
              cy: f.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (_) => r(_, `Min: ${f.min.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Mh),
            l("circle", {
              cx: 0,
              cy: f.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (_) => r(_, `Q1: ${f.q1.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Sh),
            l("circle", {
              cx: 0,
              cy: f.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (_) => r(_, `Q3: ${f.q3.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Ch),
            l("circle", {
              cx: 0,
              cy: f.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (_) => r(_, `Max: ${f.max.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Dh),
            l("line", {
              x1: -24,
              y1: f.medianY,
              x2: 24,
              y2: f.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (_) => r(_, `Median: ${f.median.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Ah),
            f.averageY ? (y(), x("line", {
              key: 2,
              x1: -24,
              y1: f.averageY,
              x2: 24,
              y2: f.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (_) => r(_, `Avg: ${f.average.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Th)) : I("", !0)
          ], 8, gh),
          l("text", {
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, $(i(f.label)), 9, Bh),
          f.responseCount ? (y(), x("text", {
            key: 0,
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: n.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + $(f.responseCount), 9, Lh)) : I("", !0)
        ], 64))), 128)),
        e.showLegend ? (y(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          l("g", Ph, [
            l("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Ih),
            l("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Rh)
          ]),
          l("g", Eh, [
            l("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Oh),
            l("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, zh)
          ]),
          l("g", Vh, [
            l("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Nh),
            l("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Wh)
          ]),
          l("g", Hh, [
            l("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, jh),
            l("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Yh)
          ]),
          l("g", qh, [
            v[0] || (v[0] = l("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#f97316",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            l("text", {
              x: "18",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, Uh)
          ]),
          l("g", Kh, [
            v[1] || (v[1] = l("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "2.5"
            }, null, -1)),
            l("text", {
              x: "18",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, Xh)
          ])
        ], 8, Fh)) : I("", !0)
      ], 44, nh))
    ]));
  }
}), Zh = /* @__PURE__ */ nt(Gh, [["__scopeId", "data-v-520c623f"]]), Qh = { class: "chart-container" }, Jh = ["viewBox"], tf = ["transform"], ef = ["x", "y", "width", "height", "fill", "stroke"], af = ["y", "fill"], sf = ["y", "fill"], nf = ["x1", "y1", "x2", "y2", "stroke"], of = ["points", "fill"], rf = ["x1", "y1", "x2", "y2", "stroke"], lf = ["x1", "y1", "x2", "y2", "stroke"], cf = ["x", "y", "fill"], df = ["x", "y", "fill", "transform"], uf = ["x1", "y1", "x2", "y2", "stroke"], hf = ["points", "fill"], ff = ["transform"], gf = ["y1", "y2", "stroke", "onMouseenter"], pf = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], vf = ["x1", "y1", "x2", "y2", "onMouseenter"], bf = ["x1", "y1", "x2", "y2", "onMouseenter"], mf = ["cy", "stroke", "onMouseenter"], yf = ["cy", "stroke", "onMouseenter"], _f = ["x", "y", "fill"], xf = ["x", "y", "fill"], kf = ["transform"], wf = { transform: "translate(-180, 0)" }, $f = ["stroke"], Mf = ["fill"], Sf = { transform: "translate(-120, 0)" }, Cf = ["fill"], Df = { transform: "translate(-60, 0)" }, Af = ["fill"], Tf = { transform: "translate(0, 0)" }, Bf = ["stroke"], Lf = ["fill"], Ff = { transform: "translate(60, 0)" }, Pf = ["fill"], If = { transform: "translate(130, 0)" }, Rf = ["fill"], Ef = /* @__PURE__ */ J({
  __name: "CandlestickChart",
  props: {
    candlestickData: {},
    chartWidth: { default: 800 },
    chartHeight: { default: 400 },
    chartMargin: { default: 70 },
    chartBottomMargin: { default: 90 },
    candleWidth: { default: 35 },
    showLegend: { type: Boolean, default: !0 },
    yAxisLabel: { default: "score" },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s } = lt(rt(a, "theme")), n = C(() => ({
      // Tooltip
      tooltipBg: s.value ? "rgba(26, 26, 29, 0.98)" : "rgba(15, 23, 42, 0.95)",
      tooltipBorder: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
      tooltipText: s.value ? "#f8f9fa" : "#f1f5f9",
      tooltipTextSecondary: s.value ? "#d1d5db" : "#e2e8f0",
      // Axis
      axis: s.value ? "#9ca3af" : "#475569",
      // Grid
      gridLine: s.value ? "#374151" : "#e5e7eb",
      // Ticks
      tickLine: s.value ? "#4b5563" : "#cbd5e1",
      tickText: s.value ? "#9ca3af" : "#64748b",
      // Labels
      labelText: s.value ? "#d1d5db" : "#475569",
      legendText: s.value ? "#d1d5db" : "#475569",
      // Dots
      dotStroke: s.value ? "#1a1a1d" : "#ffffff"
    })), o = at({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), i = (p) => typeof p == "string" ? p.charAt(0).toUpperCase() + p.slice(1).toLowerCase() : p, r = (p, v, f) => {
      const m = p.currentTarget.closest("svg");
      if (!m) return;
      const _ = m.getBoundingClientRect(), g = m.createSVGPoint();
      g.x = p.clientX - _.left, g.y = p.clientY - _.top;
      let b = i(v.label), k = "";
      switch (f) {
        case "body":
          k = `Q1: ${v.q1.toFixed(1)} | Q3: ${v.q3.toFixed(1)}`;
          break;
        case "wick":
          k = `Min: ${v.low.toFixed(1)} | Max: ${v.high.toFixed(1)}`;
          break;
        case "median":
          k = `Median: ${v.median.toFixed(1)}`;
          break;
        case "average":
          k = `Average: ${v.average?.toFixed(1)}`;
          break;
        case "min":
          k = `Min: ${v.low.toFixed(1)}`;
          break;
        case "max":
          k = `Max: ${v.high.toFixed(1)}`;
          break;
      }
      const w = Math.max(180, k.length * 7 + 40), M = 48;
      o.value = {
        visible: !0,
        x: g.x,
        y: g.y - 20,
        title: b,
        text: k,
        width: w,
        height: M
      };
    }, c = (p) => {
      if (o.value.visible) {
        const v = p.currentTarget, f = v.getBoundingClientRect(), m = v.createSVGPoint();
        m.x = p.clientX - f.left, m.y = p.clientY - f.top, o.value.x = m.x, o.value.y = m.y - 20;
      }
    }, d = () => {
      o.value.visible = !1;
    }, u = () => {
      o.value.visible = !1;
    }, h = C(() => {
      const p = [], f = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let m = 1; m <= 10; m++) {
        const _ = m, g = (_ - 1) / 9, b = a.chartMargin + f - g * f;
        p.push({ value: _, y: b });
      }
      return p;
    });
    return t({ isDark: s }), (p, v) => (y(), x("div", Qh, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: ft(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: c,
        onMouseleave: d
      }, [
        o.value.visible ? (y(), x("g", {
          key: 0,
          transform: `translate(${o.value.x}, ${o.value.y})`
        }, [
          l("rect", {
            x: -o.value.width / 2,
            y: -o.value.height - 10,
            width: o.value.width,
            height: o.value.height,
            fill: n.value.tooltipBg,
            rx: "8",
            stroke: n.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, ef),
          l("text", {
            x: "0",
            y: -o.value.height + 8,
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, $(o.value.title), 9, af),
          l("text", {
            x: "0",
            y: -o.value.height + 26,
            "text-anchor": "middle",
            fill: n.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, $(o.value.text), 9, sf)
        ], 8, tf)) : I("", !0),
        l("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, nf),
        l("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, of),
        (y(!0), x(K, null, tt(h.value, (f, m) => (y(), x("line", {
          key: `grid-${m}`,
          x1: e.chartMargin,
          y1: f.y,
          x2: e.chartWidth - e.chartMargin,
          y2: f.y,
          stroke: n.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, rf))), 128)),
        (y(!0), x(K, null, tt(h.value, (f, m) => (y(), x(K, { key: m }, [
          l("line", {
            x1: e.chartMargin - 6,
            y1: f.y,
            x2: e.chartMargin,
            y2: f.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, lf),
          l("text", {
            x: e.chartMargin - 12,
            y: f.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, $(f.value), 9, cf)
        ], 64))), 128)),
        l("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: n.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, $(i(e.yAxisLabel)), 9, df),
        l("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, uf),
        l("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, hf),
        (y(!0), x(K, null, tt(e.candlestickData, (f, m) => (y(), x(K, { key: m }, [
          l("g", {
            transform: `translate(${f.centerX}, 0)`
          }, [
            l("line", {
              x1: 0,
              y1: f.highY,
              x2: 0,
              y2: f.lowY,
              stroke: f.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "hover-line",
              onMouseenter: (_) => r(_, f, "wick"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, gf),
            l("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(f.q1Y, f.q3Y) - (Math.abs(f.q3Y - f.q1Y) < 4 ? 4 : 0),
              width: e.candleWidth,
              height: Math.max(8, Math.abs(f.q3Y - f.q1Y)),
              fill: f.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: f.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (_) => r(_, f, "body"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, pf),
            f.medianY ? (y(), x("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: f.medianY,
              x2: e.candleWidth / 2,
              y2: f.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (_) => r(_, f, "median"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, vf)) : I("", !0),
            f.averageY ? (y(), x("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: f.averageY,
              x2: e.candleWidth / 2,
              y2: f.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (_) => r(_, f, "average"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, bf)) : I("", !0),
            l("circle", {
              cx: 0,
              cy: f.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (_) => r(_, f, "min"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, mf),
            l("circle", {
              cx: 0,
              cy: f.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (_) => r(_, f, "max"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, yf)
          ], 8, ff),
          l("text", {
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, $(i(f.label)), 9, _f),
          f.responseCount ? (y(), x("text", {
            key: 0,
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: n.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + $(f.responseCount), 9, xf)) : I("", !0)
        ], 64))), 128)),
        e.showLegend ? (y(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          l("g", wf, [
            l("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, $f),
            l("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Mf)
          ]),
          l("g", Sf, [
            v[0] || (v[0] = l("rect", {
              x: "-6",
              y: "-6",
              width: "12",
              height: "12",
              fill: "rgba(198, 125, 255, 0.15)",
              stroke: "#C67DFF",
              "stroke-width": "1.5",
              rx: "2"
            }, null, -1)),
            l("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Cf)
          ]),
          l("g", Df, [
            v[1] || (v[1] = l("rect", {
              x: "-6",
              y: "-6",
              width: "12",
              height: "12",
              fill: "rgba(198, 125, 255, 0.15)",
              stroke: "#C67DFF",
              "stroke-width": "1.5",
              rx: "2"
            }, null, -1)),
            l("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Af)
          ]),
          l("g", Tf, [
            l("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Bf),
            l("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Lf)
          ]),
          l("g", Ff, [
            v[2] || (v[2] = l("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#f97316",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            l("text", {
              x: "18",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, Pf)
          ]),
          l("g", If, [
            v[3] || (v[3] = l("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "2.5"
            }, null, -1)),
            l("text", {
              x: "18",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, Rf)
          ])
        ], 8, kf)) : I("", !0)
      ], 44, Jh))
    ]));
  }
}), Oi = /* @__PURE__ */ nt(Ef, [["__scopeId", "data-v-61d0259c"]]), Of = { class: "chart-container" }, zf = ["viewBox"], Vf = ["transform"], Nf = ["x", "y", "width", "height", "fill", "stroke"], Wf = ["y", "fill"], Hf = ["y", "fill"], jf = ["x1", "y1", "x2", "y2", "stroke"], Yf = ["x1", "y1", "x2", "y2", "stroke"], qf = ["points", "fill"], Uf = ["x1", "y1", "x2", "y2", "stroke"], Kf = ["x", "y", "fill"], Xf = ["x", "y", "fill", "transform"], Gf = ["x1", "y1", "x2", "y2", "stroke"], Zf = ["points", "fill"], Qf = ["x1", "y1", "x2", "y2", "stroke"], Jf = ["x", "y", "fill"], tg = ["x", "y", "fill"], eg = ["d"], ag = ["x", "y", "width", "height", "onMouseenter"], sg = ["x1", "y1", "x2", "y2"], ng = ["x", "y"], og = ["x1", "y1", "x2", "y2"], ig = ["x", "y"], rg = ["x1", "y1", "x2", "y2"], lg = ["x", "y"], cg = ["x1", "y1", "x2", "y2"], dg = ["x", "y"], ug = ["x1", "y1", "x2", "y2"], hg = ["x", "y"], fg = ["x1", "y1", "x2", "y2"], gg = ["x", "y"], pg = ["transform"], vg = { transform: "translate(-220, 0)" }, bg = ["fill"], mg = { transform: "translate(-140, 0)" }, yg = ["fill"], _g = { transform: "translate(-80, 0)" }, xg = ["fill"], kg = { transform: "translate(-20, 0)" }, wg = ["fill"], $g = { transform: "translate(60, 0)" }, Mg = ["fill"], Sg = { transform: "translate(130, 0)" }, Cg = ["fill"], Dg = { transform: "translate(180, 0)" }, Ag = ["fill"], Tg = /* @__PURE__ */ J({
  __name: "HistogramChart",
  props: {
    histogram: { default: () => [] },
    minScore: { default: 0 },
    maxScore: { default: 0 },
    q1Score: { default: 0 },
    medianScore: { default: 0 },
    q3Score: { default: 0 },
    averageScore: { default: 0 },
    chartWidth: { default: 800 },
    chartHeight: { default: 450 },
    chartMargin: { default: 60 },
    chartBottomMargin: { default: 80 },
    showLegend: { type: Boolean, default: !0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s } = lt(rt(a, "theme")), n = C(() => ({
      // Tooltip
      tooltipBg: s.value ? "rgba(26, 26, 29, 0.98)" : "rgba(15, 23, 42, 0.95)",
      tooltipBorder: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
      tooltipText: s.value ? "#f8f9fa" : "#f1f5f9",
      tooltipTextSecondary: s.value ? "#d1d5db" : "#e2e8f0",
      // Axis
      axis: s.value ? "#9ca3af" : "#475569",
      // Grid
      gridLine: s.value ? "#374151" : "#e5e7eb",
      // Ticks
      tickLine: s.value ? "#4b5563" : "#cbd5e1",
      tickText: s.value ? "#9ca3af" : "#64748b",
      // Labels
      labelText: s.value ? "#d1d5db" : "#475569",
      legendText: s.value ? "#d1d5db" : "#475569"
    })), o = at({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), i = C(() => a.chartWidth - a.chartMargin * 2), r = C(() => a.chartHeight - a.chartMargin - a.chartBottomMargin), c = C(() => i.value / 10 * 0.6), d = C(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const O = Math.max(...a.histogram.map((H) => H.count || 0), 1), V = Math.max(1, Math.ceil(O * 0.2));
      return O + V;
    }), u = C(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const O = a.averageScore || 0;
      let V = 0, H = 0;
      if (a.histogram.forEach((Z) => {
        const U = Z.count || 0;
        V += U;
        const ot = Z.score - O;
        H += U * (ot * ot);
      }), V === 0) return 1;
      const et = H / V;
      return Math.sqrt(et) || 1;
    }), h = (O, V, H) => {
      if (H === 0) return 0;
      const et = 1 / (H * Math.sqrt(2 * Math.PI)), Z = -0.5 * Math.pow((O - V) / H, 2);
      return et * Math.exp(Z);
    }, p = C(() => {
      if (!a.histogram || a.histogram.length === 0 || a.averageScore === 0 && u.value === 0) return null;
      const O = a.averageScore, V = u.value, H = 100, Z = Math.max(...a.histogram.map((gt) => gt.count || 0), 1) / d.value * r.value;
      if (Z <= 0) return null;
      let U = 0;
      for (let gt = 0; gt <= H; gt++) {
        const It = 1 + 9 * (gt / H), Vt = h(It, O, V);
        Vt > U && (U = Vt);
      }
      if (U <= 0) return null;
      const ot = Z / U, wt = [];
      for (let gt = 0; gt <= H; gt++) {
        const It = 1 + 9 * (gt / H), Vt = h(It, O, V) * ot, Kt = f(It);
        if (Kt !== null) {
          const ct = a.chartHeight - a.chartBottomMargin - Vt;
          wt.push(`${gt === 0 ? "M" : "L"} ${Kt} ${ct}`);
        }
      }
      return wt.join(" ");
    }), v = C(() => {
      if (!a.histogram || a.histogram.length === 0) return [];
      const O = i.value / 10;
      return a.histogram.map((V, H) => {
        const et = a.chartMargin + (H + 0.5) * O, Z = V.count > 0 ? V.count / d.value * r.value : 0, U = a.chartHeight - a.chartBottomMargin - Z;
        return {
          score: V.score,
          count: V.count,
          x: et,
          y: U,
          height: Z
        };
      });
    }), f = (O) => {
      if (O < 1 || O > 10) return null;
      const V = i.value / 10;
      return a.chartMargin + (O - 0.5) * V;
    }, m = C(() => f(a.minScore)), _ = C(() => f(a.maxScore)), g = C(() => f(a.q1Score)), b = C(() => f(a.medianScore)), k = C(() => f(a.q3Score)), w = C(() => f(a.averageScore)), M = C(() => a.minScore), S = C(() => a.maxScore), D = C(() => a.q1Score), A = C(() => a.medianScore), T = C(() => a.q3Score), B = C(() => a.averageScore), F = C(() => {
      const O = [], V = a.chartMargin - 8, H = 18;
      g.value !== null && O.push({
        x: g.value,
        y: V,
        value: a.q1Score,
        label: `Q1: ${D.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), b.value !== null && O.push({
        x: b.value,
        y: V - H,
        value: a.medianScore,
        label: `Median: ${A.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), w.value !== null && O.push({
        x: w.value,
        y: V - H,
        value: a.averageScore,
        label: `Avg: ${B.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), k.value !== null && O.push({
        x: k.value,
        y: V,
        value: a.q3Score,
        label: `Q3: ${T.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), O.sort((U, ot) => (U.x || 0) - (ot.x || 0));
      const et = [[], [], []];
      O.forEach((U) => {
        if (U.x === null) return;
        let ot = -1;
        for (let wt = 0; wt < et.length; wt++) {
          let gt = !1;
          for (const It of et[wt]) {
            if (It.x === null) continue;
            const Vt = Math.abs(U.x - It.x), Kt = (U.width + It.width) / 2 + 10;
            if (Vt < Kt) {
              gt = !0;
              break;
            }
          }
          if (!gt) {
            ot = wt;
            break;
          }
        }
        ot === -1 && (ot = et.length - 1), U.y = V - ot * H, et[ot].push(U);
      });
      const Z = 15;
      return O.forEach((U) => {
        U.y < Z && (U.y = Z);
      }), O;
    }), E = (O) => F.value.find((H) => H.id === O)?.y || a.chartMargin - 10, N = C(() => {
      const O = [];
      for (let H = 0; H <= 5; H++) {
        const et = Math.round(d.value / 5 * H), Z = a.chartHeight - a.chartBottomMargin - H / 5 * r.value;
        O.push({ value: et, y: Z });
      }
      return O;
    }), Y = (O, V) => {
      const H = O.currentTarget.closest("svg");
      if (!H) return;
      const et = H.getBoundingClientRect(), Z = H.createSVGPoint();
      Z.x = O.clientX - et.left, Z.y = O.clientY - et.top;
      const U = `Score: ${V.score}`, ot = `Count: ${V.count}`, wt = 120, gt = 48;
      o.value = {
        visible: !0,
        x: Z.x,
        y: Z.y - 20,
        title: U,
        text: ot,
        width: wt,
        height: gt
      };
    }, P = (O) => {
      if (o.value.visible) {
        const V = O.currentTarget, H = V.getBoundingClientRect(), et = V.createSVGPoint();
        et.x = O.clientX - H.left, et.y = O.clientY - H.top, o.value.x = et.x, o.value.y = et.y - 20;
      }
    }, z = () => {
      o.value.visible = !1;
    }, j = () => {
      o.value.visible = !1;
    };
    return t({ isDark: s }), (O, V) => (y(), x("div", Of, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: ft(`min-height: ${e.chartHeight}px;`),
        onMousemove: P,
        onMouseleave: z
      }, [
        o.value.visible ? (y(), x("g", {
          key: 0,
          transform: `translate(${o.value.x}, ${o.value.y})`
        }, [
          l("rect", {
            x: -o.value.width / 2,
            y: -o.value.height - 10,
            width: o.value.width,
            height: o.value.height,
            fill: n.value.tooltipBg,
            rx: "8",
            stroke: n.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, Nf),
          l("text", {
            x: "0",
            y: -o.value.height + 8,
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, $(o.value.title), 9, Wf),
          l("text", {
            x: "0",
            y: -o.value.height + 26,
            "text-anchor": "middle",
            fill: n.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, $(o.value.text), 9, Hf)
        ], 8, Vf)) : I("", !0),
        (y(!0), x(K, null, tt(N.value, (H, et) => (y(), x("line", {
          key: `grid-${et}`,
          x1: e.chartMargin,
          y1: H.y,
          x2: e.chartWidth - e.chartMargin,
          y2: H.y,
          stroke: n.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, jf))), 128)),
        l("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, Yf),
        l("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, qf),
        (y(!0), x(K, null, tt(N.value, (H, et) => (y(), x(K, {
          key: `y-tick-${et}`
        }, [
          l("line", {
            x1: e.chartMargin - 6,
            y1: H.y,
            x2: e.chartMargin,
            y2: H.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Uf),
          l("text", {
            x: e.chartMargin - 12,
            y: H.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, $(H.value), 9, Kf)
        ], 64))), 128)),
        l("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: n.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, " Count ", 8, Xf),
        l("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, Gf),
        l("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, Zf),
        (y(!0), x(K, null, tt(v.value, (H, et) => (y(), x(K, {
          key: `tick-${et}`
        }, [
          l("line", {
            x1: H.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: H.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Qf),
          l("text", {
            x: H.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, $(H.score), 9, Jf)
        ], 64))), 128)),
        l("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: n.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, tg),
        p.value ? (y(), x("path", {
          key: 1,
          d: p.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, eg)) : I("", !0),
        (y(!0), x(K, null, tt(v.value, (H, et) => (y(), x("rect", {
          key: `bar-${et}`,
          x: H.x - c.value / 2,
          y: H.y,
          width: c.value,
          height: H.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (Z) => Y(Z, H),
          onMouseleave: j,
          style: { cursor: "pointer" }
        }, null, 40, ag))), 128)),
        m.value ? (y(), x("line", {
          key: 2,
          x1: m.value,
          y1: e.chartMargin,
          x2: m.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, sg)) : I("", !0),
        m.value ? (y(), x("text", {
          key: 3,
          x: m.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + $(M.value.toFixed(1)), 9, ng)) : I("", !0),
        g.value ? (y(), x("line", {
          key: 4,
          x1: g.value,
          y1: e.chartMargin,
          x2: g.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, og)) : I("", !0),
        g.value ? (y(), x("text", {
          key: 5,
          x: g.value,
          y: E("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + $(D.value.toFixed(1)), 9, ig)) : I("", !0),
        b.value ? (y(), x("line", {
          key: 6,
          x1: b.value,
          y1: e.chartMargin,
          x2: b.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, rg)) : I("", !0),
        b.value ? (y(), x("text", {
          key: 7,
          x: b.value,
          y: E("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + $(A.value.toFixed(1)), 9, lg)) : I("", !0),
        w.value ? (y(), x("line", {
          key: 8,
          x1: w.value,
          y1: e.chartMargin,
          x2: w.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, cg)) : I("", !0),
        w.value ? (y(), x("text", {
          key: 9,
          x: w.value,
          y: E("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + $(B.value.toFixed(1)), 9, dg)) : I("", !0),
        k.value ? (y(), x("line", {
          key: 10,
          x1: k.value,
          y1: e.chartMargin,
          x2: k.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, ug)) : I("", !0),
        k.value ? (y(), x("text", {
          key: 11,
          x: k.value,
          y: E("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + $(T.value.toFixed(1)), 9, hg)) : I("", !0),
        _.value ? (y(), x("line", {
          key: 12,
          x1: _.value,
          y1: e.chartMargin,
          x2: _.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, fg)) : I("", !0),
        _.value ? (y(), x("text", {
          key: 13,
          x: _.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + $(S.value.toFixed(1)), 9, gg)) : I("", !0),
        e.showLegend ? (y(), x("g", {
          key: 14,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          l("g", vg, [
            V[0] || (V[0] = l("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "2.5"
            }, null, -1)),
            l("text", {
              x: "24",
              y: "4",
              fill: n.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Gaussian ", 8, bg)
          ]),
          l("g", mg, [
            V[1] || (V[1] = l("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#5d4b93",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            l("text", {
              x: "24",
              y: "4",
              fill: n.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, yg)
          ]),
          l("g", _g, [
            V[2] || (V[2] = l("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#a855f7",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            l("text", {
              x: "24",
              y: "4",
              fill: n.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, xg)
          ]),
          l("g", kg, [
            V[3] || (V[3] = l("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "3",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            l("text", {
              x: "24",
              y: "4",
              fill: n.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, wg)
          ]),
          l("g", $g, [
            V[4] || (V[4] = l("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            l("text", {
              x: "24",
              y: "4",
              fill: n.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, Mg)
          ]),
          l("g", Sg, [
            V[5] || (V[5] = l("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#7c3aed",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            l("text", {
              x: "24",
              y: "4",
              fill: n.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Cg)
          ]),
          l("g", Dg, [
            V[6] || (V[6] = l("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#C67DFF",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            l("text", {
              x: "24",
              y: "4",
              fill: n.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Ag)
          ])
        ], 8, pg)) : I("", !0)
      ], 44, zf))
    ]));
  }
}), zi = /* @__PURE__ */ nt(Tg, [["__scopeId", "data-v-64e657d9"]]), Bg = 639, Vi = 1024;
function Co(e) {
  return e < 640 ? "mobile" : e <= Vi ? "tablet" : "desktop";
}
function Lg() {
  const e = at(
    typeof window > "u" ? "desktop" : Co(window.innerWidth)
  ), t = () => {
    typeof window > "u" || (e.value = Co(window.innerWidth));
  };
  let a = null, s = null, n = null, o = null;
  ee(() => {
    typeof window > "u" || (t(), a = window.matchMedia(`(max-width: ${Bg}px)`), s = window.matchMedia(`(min-width: 640px) and (max-width: ${Vi}px)`), n = window.matchMedia("(min-width: 1025px)"), o = () => {
      t();
    }, a.addEventListener("change", o), s.addEventListener("change", o), n.addEventListener("change", o));
  }), Pe(() => {
    !o || !a || !s || !n || (a.removeEventListener("change", o), s.removeEventListener("change", o), n.removeEventListener("change", o));
  });
  const i = C(() => e.value === "mobile"), r = C(() => e.value === "tablet"), c = C(() => e.value === "desktop");
  return {
    breakpoint: e,
    isMobile: i,
    isTablet: r,
    isDesktop: c
  };
}
const Fg = { class: "chart-container" }, Pg = {
  key: 1,
  class: "chart-wrapper"
}, Ig = /* @__PURE__ */ J({
  __name: "SankeyChart",
  props: {
    data: { default: () => ({ nodes: [], links: [] }) },
    title: { default: "" },
    height: { default: "500px" },
    nodeColors: { default: () => ({}) },
    useGradient: { type: Boolean, default: !0 },
    nodeGap: { default: 20 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    sn.use([Zi, Qi, Ji, tr]);
    const a = e, { isDark: s, colors: n } = lt(rt(a, "theme")), { breakpoint: o } = Lg(), i = at(null), r = at(!0), c = at(!1);
    let d = null;
    const u = {
      animation: { duration: 1e3, easing: "cubicOut" },
      margins: { left: "2%", right: "2%", top: "2%", bottom: "2%" },
      node: { width: 70, gap: 20, align: "left", iterations: 64 },
      style: {
        shadowBlur: 4,
        shadowColor: "rgba(139, 92, 246, 0.15)"
      }
    }, h = C(() => {
      const S = o.value;
      return S === "mobile" ? {
        orient: "vertical",
        nodeWidth: 18,
        nodeGap: 12,
        // "top" recorta (clip interno) la etiqueta del nodo raíz; "right" deja el texto al lado de la franja
        labelPosition: "right",
        labelFontSize: 10,
        edgeLabelShow: !0,
        edgeLabelFontSize: 8,
        labelWrap: !0,
        labelCharsPerLine: 10,
        labelLineHeight: 12,
        labelTextWidth: 200,
        labelMaxChars: 0,
        labelDistance: 6,
        // Márgenes en px: más fiables que % para dejar aire a etiquetas/fluos
        contentMargins: { left: 10, right: 10, top: 28, bottom: 20 }
      } : S === "tablet" ? {
        orient: "horizontal",
        nodeWidth: 40,
        nodeGap: 16,
        labelPosition: "inside",
        labelFontSize: 11,
        edgeLabelShow: !1,
        edgeLabelFontSize: 10,
        labelWrap: !1,
        labelCharsPerLine: 0,
        labelLineHeight: 0,
        labelTextWidth: 0,
        labelMaxChars: 12,
        labelDistance: 0,
        contentMargins: { ...u.margins }
      } : {
        orient: "horizontal",
        nodeWidth: u.node.width,
        nodeGap: a.nodeGap,
        labelPosition: "inside",
        labelFontSize: 12,
        edgeLabelShow: !0,
        edgeLabelFontSize: 11,
        labelWrap: !1,
        labelCharsPerLine: 0,
        labelLineHeight: 0,
        labelTextWidth: 0,
        labelMaxChars: 15,
        labelDistance: 0,
        contentMargins: { ...u.margins }
      };
    }), p = (S, D) => {
      const A = S.trim();
      if (!A || D < 1) return S;
      if (A.length <= D) return A;
      const T = [];
      let B = 0;
      for (; B < A.length; ) {
        const F = Math.min(B + D, A.length);
        if (F >= A.length) {
          const Y = A.slice(B).trim();
          Y && T.push(Y);
          break;
        }
        const E = A.slice(B, F), N = E.lastIndexOf(" ");
        if (N > 0)
          for (T.push(A.slice(B, B + N).trim()), B += N; B < A.length && A[B] === " "; ) B += 1;
        else
          T.push(E), B = F;
      }
      return T.join(`
`);
    }, v = [
      "#C67DFF",
      // Primary light
      "#8b5cf6",
      // Primary medium
      "#a855f7",
      // Bright purple
      "#7c3aed",
      // Vibrant purple
      "#5d4b93",
      // Primary dark
      "#9333ea"
      // Deep purple
    ], f = () => {
      const S = a.data.links.filter(
        (B) => B.source && B.target && typeof B.value == "number"
      ), D = Math.max(...S.map((B) => B.value), 1), A = Math.max(1, D * 0.01), T = S.map((B) => ({
        ...B,
        originalValue: B.value,
        value: B.value < D * 0.01 ? A : B.value
      }));
      return {
        nodes: a.data.nodes.filter((B) => B.name),
        links: T
      };
    }, m = (S) => S.map((D, A) => ({
      ...D,
      itemStyle: {
        color: a.nodeColors[D.name] || v[A % v.length],
        borderRadius: 8
      }
    })), _ = (S) => (D) => {
      const A = D.dataType === "node", T = n.value.tooltipText, B = s.value ? "#d1d5db" : "#e2e8f0";
      if (A) {
        const P = S.filter((O) => O.target === D.name), z = S.filter((O) => O.source === D.name), j = P.length > 0 ? P.reduce((O, V) => O + (V.originalValue || V.value), 0) : z.reduce((O, V) => O + (V.originalValue || V.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${T};">${D.name}</div><div style="color: ${B}; font-size: 12px;">Count: ${j.toLocaleString()}</div>`;
      }
      const F = D.data?.source || D.source || "Unknown", E = D.data?.target || D.target || "Unknown", N = D.data?.originalValue || D.data?.value || D.value || 0, Y = D.data?.label || `${N.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${T};">${F} → ${E}</div><div style="color: ${B}; font-size: 12px;">Flow: ${Y}</div>`;
    }, g = () => {
      if (!d || !a.data.nodes?.length || !a.data.links?.length) return;
      const S = h.value;
      try {
        const { nodes: D, links: A } = f(), T = m(D), B = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: _(A),
            backgroundColor: n.value.tooltipBg,
            borderColor: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
            borderWidth: 1,
            borderRadius: 8,
            padding: [10, 14],
            textStyle: {
              color: n.value.tooltipText,
              fontSize: 13,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500
            },
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.3)"
          },
          series: [
            {
              type: "sankey",
              data: T,
              links: A,
              emphasis: { focus: "adjacency" },
              levels: [
                {
                  depth: 0,
                  itemStyle: {
                    color: "#8b5cf6",
                    borderRadius: 8
                  },
                  lineStyle: { color: "source", opacity: 0.5 }
                },
                {
                  depth: 1,
                  itemStyle: {
                    color: "#8b5cf6",
                    borderRadius: 8
                  },
                  lineStyle: { color: "source", opacity: 0.5 }
                }
              ],
              lineStyle: {
                color: a.useGradient ? "gradient" : "source",
                curveness: 0.5,
                opacity: 0.6
              },
              itemStyle: u.style,
              label: {
                show: !0,
                position: S.labelPosition,
                color: "#000000",
                fontWeight: 600,
                fontSize: S.labelFontSize,
                ...S.labelWrap && S.labelLineHeight > 0 ? { lineHeight: S.labelLineHeight } : {},
                ...S.labelWrap && S.labelTextWidth > 0 ? { width: S.labelTextWidth, overflow: "none" } : {},
                ...S.labelDistance > 0 ? { distance: S.labelDistance } : {},
                fontFamily: "'DM Sans', sans-serif",
                formatter: (F) => {
                  const E = F.name || "";
                  if (S.labelWrap)
                    return p(E, Math.max(4, S.labelCharsPerLine));
                  const N = S.labelMaxChars;
                  return E.length > N ? `${E.substring(0, N)}...` : E;
                }
              },
              edgeLabel: S.edgeLabelShow ? {
                show: !0,
                fontSize: S.edgeLabelFontSize,
                color: n.value.textSecondary,
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                formatter: (F) => {
                  const E = F.data?.originalValue || F.value || 0;
                  return F.data?.label || `${E.toLocaleString()}`;
                }
              } : { show: !1 },
              nodeAlign: u.node.align,
              nodeGap: S.nodeGap,
              nodeWidth: S.nodeWidth,
              layoutIterations: u.node.iterations,
              orient: S.orient,
              draggable: !1,
              ...S.contentMargins
            }
          ],
          backgroundColor: "transparent",
          animation: !0,
          animationDuration: u.animation.duration,
          animationEasing: u.animation.easing
        };
        d.setOption(B), d.resize();
      } catch (D) {
        console.error("Error setting Sankey chart options:", D), c.value = !0;
      }
    }, b = async () => {
      if (i.value)
        try {
          d = sn.init(i.value), g(), window.addEventListener("resize", w);
        } catch (S) {
          console.error("Error initializing Sankey chart:", S), c.value = !0;
        } finally {
          r.value = !1;
        }
    }, k = async (S = 40) => {
      await St();
      for (let D = 0; D < S; D++) {
        if (i.value?.clientWidth && i.value.clientWidth > 0 && i.value?.clientHeight && i.value.clientHeight > 0)
          return await b();
        await new Promise((A) => setTimeout(A, 50));
      }
      await b(), setTimeout(w, 50);
    }, w = () => d?.resize(), M = () => {
      window.removeEventListener("resize", w), d && (d.dispose(), d = null);
    };
    return ee(() => i.value && k()), Oo(M), Ft(() => a.data, g, { deep: !0 }), Ft(s, g), Ft(o, g), t({ isDark: s }), (S, D) => (y(), x("div", Fg, [
      c.value ? (y(), x("div", {
        key: 0,
        class: "error-state",
        style: ft({ height: e.height })
      }, [...D[0] || (D[0] = [
        st('<div class="error-content" data-v-3c2ea95f><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3c2ea95f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-3c2ea95f></path></svg><p class="error-title" data-v-3c2ea95f>Chart could not be loaded</p><p class="error-description" data-v-3c2ea95f>Please check the data format.</p></div>', 1)
      ])], 4)) : (y(), x("div", Pg, [
        Yt(l("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content",
          style: ft({ height: e.height })
        }, null, 4), [
          [la, !r.value]
        ]),
        Yt(l("div", {
          class: "loading-state",
          style: ft({ height: e.height })
        }, [...D[1] || (D[1] = [
          st('<div class="loading-container" data-v-3c2ea95f><div class="sankey-loader" data-v-3c2ea95f><div class="flow flow-1" data-v-3c2ea95f></div><div class="flow flow-2" data-v-3c2ea95f></div><div class="flow flow-3" data-v-3c2ea95f></div><div class="flow flow-4" data-v-3c2ea95f></div></div><p class="loading-text" data-v-3c2ea95f>Loading Sankey diagram...</p></div>', 1)
        ])], 4), [
          [la, r.value]
        ])
      ]))
    ]));
  }
}), xe = /* @__PURE__ */ nt(Ig, [["__scopeId", "data-v-3c2ea95f"]]);
function Rg(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
    })
  ]);
}
function Eg(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
    })
  ]);
}
function Og(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
    })
  ]);
}
function Ni(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
    })
  ]);
}
function zt(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
    })
  ]);
}
function zg(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
    }),
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
    })
  ]);
}
function Wi(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "m19.5 8.25-7.5 7.5-7.5-7.5"
    })
  ]);
}
function Vg(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15.75 19.5 8.25 12l7.5-7.5"
    })
  ]);
}
function Ng(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "m8.25 4.5 7.5 7.5-7.5 7.5"
    })
  ]);
}
function Wg(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    })
  ]);
}
function Do(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
    })
  ]);
}
function Hg(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    })
  ]);
}
function jg(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
    })
  ]);
}
function Yg(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
    })
  ]);
}
function qg(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
    })
  ]);
}
function Hi(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    })
  ]);
}
const Ug = { class: "chart-footer" }, Kg = { class: "export-actions" }, Xg = { class: "export-buttons" }, Gg = ["disabled"], Zg = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Qg = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Jg = ["disabled"], tp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, ep = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, ap = /* @__PURE__ */ J({
  __name: "FooterExport",
  props: {
    formats: { default: () => ["pdf", "csv"] },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const a = e, s = t, n = (i) => a.formats.includes(i), o = (i) => {
      a.loading || s("export", i);
    };
    return (i, r) => (y(), x("footer", Ug, [
      r[9] || (r[9] = l("div", { class: "footer-divider" }, null, -1)),
      l("div", Kg, [
        r[8] || (r[8] = l("span", { class: "export-label" }, "Export", -1)),
        l("div", Xg, [
          n("pdf") ? (y(), x("button", {
            key: 0,
            type: "button",
            class: q(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download PDF",
            onClick: r[0] || (r[0] = (c) => o("pdf"))
          }, [
            e.loading ? (y(), x("svg", Zg, [...r[2] || (r[2] = [
              l("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              l("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (y(), x("svg", Qg, [...r[3] || (r[3] = [
              st('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-672661d4></path><polyline points="14 2 14 8 20 8" data-v-672661d4></polyline><line x1="16" y1="13" x2="8" y2="13" data-v-672661d4></line><line x1="16" y1="17" x2="8" y2="17" data-v-672661d4></line><polyline points="10 9 9 9 8 9" data-v-672661d4></polyline>', 5)
            ])])),
            r[4] || (r[4] = l("span", null, "PDF", -1))
          ], 10, Gg)) : I("", !0),
          n("csv") ? (y(), x("button", {
            key: 1,
            type: "button",
            class: q(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download CSV",
            onClick: r[1] || (r[1] = (c) => o("csv"))
          }, [
            e.loading ? (y(), x("svg", tp, [...r[5] || (r[5] = [
              l("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              l("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (y(), x("svg", ep, [...r[6] || (r[6] = [
              l("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }, null, -1),
              l("polyline", { points: "14 2 14 8 20 8" }, null, -1),
              l("line", {
                x1: "12",
                y1: "18",
                x2: "12",
                y2: "12"
              }, null, -1),
              l("line", {
                x1: "9",
                y1: "15",
                x2: "15",
                y2: "15"
              }, null, -1)
            ])])),
            r[7] || (r[7] = l("span", null, "CSV", -1))
          ], 10, Jg)) : I("", !0)
        ])
      ])
    ]));
  }
}), kt = /* @__PURE__ */ nt(ap, [["__scopeId", "data-v-672661d4"]]), sp = { class: "agents-per-day-card" }, np = {
  key: 0,
  class: "card-body"
}, op = {
  key: 0,
  class: "chart-section"
}, ip = {
  key: 1,
  class: "empty-state"
}, rp = { class: "empty-state-content" }, lp = { class: "empty-icon-wrapper" }, cp = {
  key: 1,
  class: "loading-state"
}, dp = /* @__PURE__ */ J({
  __name: "AgentsPerDay",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const s = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, n = e, o = a, i = (p) => {
      o("export", p);
    }, { isDark: r, colors: c } = lt(rt(n, "theme")), d = (p) => {
      const v = new Date(p), f = String(v.getDate()).padStart(2, "0"), m = String(v.getMonth() + 1).padStart(2, "0");
      return `${f}-${m}`;
    }, u = C(() => {
      const p = n.data?.agents_by_day || {}, v = Object.keys(p).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const f = v.map((k) => d(k)), m = /* @__PURE__ */ new Set();
      for (const k of Object.values(p))
        for (const w of Object.keys(k))
          m.add(w);
      const _ = Array.from(m), g = (k) => k, b = _.map((k) => ({
        label: k,
        data: v.map((w) => p[w]?.[k] || 0),
        backgroundColor: `${s[k] || "#94a3b8"}80`,
        borderColor: g(s[k] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: f,
        datasets: b
      };
    }), h = C(() => n.options ? n.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      interaction: {
        mode: "index",
        intersect: !1
      },
      plugins: {
        legend: {
          display: !0,
          position: "top",
          align: "end",
          labels: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 13,
              weight: 500
            },
            color: c.value.textSecondary,
            padding: 12,
            boxWidth: 12,
            boxHeight: 12,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "rectRounded"
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: c.value.tooltipBg,
          titleColor: c.value.tooltipText,
          bodyColor: c.value.tooltipText,
          borderColor: r.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            family: "'DM Sans', sans-serif",
            size: 13,
            weight: 600
          },
          bodyFont: {
            family: "'DM Sans', sans-serif",
            size: 12,
            weight: 500
          }
        }
      },
      scales: {
        x: {
          stacked: !0,
          border: {
            display: !1
          },
          grid: {
            display: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: c.value.textSecondary,
            padding: 8
          }
        },
        y: {
          stacked: !0,
          beginAtZero: !0,
          border: {
            display: !1
          },
          grid: {
            color: c.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: c.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: r }), (p, v) => (y(), x("article", sp, [
      v[3] || (v[3] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Agents Total Messages per Day"),
          l("p", { class: "card-subtitle" }, "Daily agent interactions (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", cp, [...v[2] || (v[2] = [
        st('<div class="loading-container" data-v-4d18c22c><div class="chart-lines-loader" data-v-4d18c22c><div class="line line-1" data-v-4d18c22c></div><div class="line line-2" data-v-4d18c22c></div><div class="line line-3" data-v-4d18c22c></div><div class="line line-4" data-v-4d18c22c></div><div class="line line-5" data-v-4d18c22c></div></div><p class="loading-text" data-v-4d18c22c>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", np, [
        u.value.labels && u.value.labels.length ? (y(), x("section", op, [
          Q(le, {
            data: u.value,
            options: h.value,
            stacked: !0
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), dt(L(kt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (y(), x("section", ip, [
          l("div", rp, [
            l("div", lp, [
              Q(L(zt), { class: "empty-icon" })
            ]),
            v[0] || (v[0] = l("p", { class: "empty-title" }, "No agents data per day", -1)),
            v[1] || (v[1] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see daily agent interactions.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), up = /* @__PURE__ */ nt(dp, [["__scopeId", "data-v-4d18c22c"]]), X = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), bt = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), Qt = (e) => {
  if (e == null) return "0";
  const t = Math.abs(e), a = e < 0 ? "-" : "";
  return t >= 1e6 ? `${a}${(t / 1e6).toFixed(2)}M` : t > 99999 ? `${a}${(t / 1e3).toFixed(1)}K` : `${a}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(t)}`;
}, hp = { class: "booking-manager-card" }, fp = { class: "card-header" }, gp = { class: "header-content" }, pp = {
  key: 0,
  class: "payment-success-badge"
}, vp = {
  key: 0,
  class: "currency-breakdown-list"
}, bp = {
  key: 1,
  class: "badge-value"
}, mp = {
  key: 0,
  class: "loading-state"
}, yp = {
  key: 1,
  class: "error-state"
}, _p = { class: "error-content" }, xp = { class: "error-description" }, kp = {
  key: 2,
  class: "card-body"
}, wp = { class: "chart-section" }, $p = { class: "chart-wrapper" }, Mp = {
  key: 0,
  class: "table-section"
}, Sp = { class: "table-wrapper" }, Cp = { class: "data-table" }, Dp = { class: "table-body" }, Ap = { class: "table-cell font-medium" }, Tp = { class: "table-cell text-center" }, Bp = { class: "table-cell text-center" }, Lp = { class: "percentage-text" }, Fp = { class: "table-cell text-center" }, Pp = { class: "table-cell" }, Ip = { class: "badges-container" }, Rp = { class: "badge badge-success" }, Ep = { class: "badge badge-error" }, Op = { class: "table-cell" }, zp = {
  key: 0,
  class: "badges-container"
}, Vp = {
  key: 1,
  class: "percentage-text"
}, Np = { class: "table-cell" }, Wp = { class: "badges-container" }, Hp = { class: "badge badge-error" }, jp = { class: "badge badge-warning" }, Yp = { class: "badge badge-yellow" }, qp = { class: "badge badge-error" }, Up = {
  key: 1,
  class: "empty-state"
}, gs = 3, Kp = /* @__PURE__ */ J({
  __name: "BookingManager",
  props: {
    data: { default: () => ({
      total_booking_initiated: 0,
      total_booking_started: 0,
      total_payment_initiated: 0,
      total_not_found: 0,
      total_cancelled: 0,
      total_no_pending_balance: 0,
      total_errors: 0,
      total_payment_success: 0,
      total_payment_failed: 0,
      total_payment_success_value: [],
      booking_manager_by_day: []
    }) },
    loading: { type: Boolean, default: !1 },
    error: { default: null },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const a = e, s = t, n = (g) => {
      s("export", g);
    }, o = at(!1), i = C(() => a.data?.booking_manager_by_day ? [...a.data.booking_manager_by_day].sort(
      (g, b) => new Date(g.date).getTime() - new Date(b.date).getTime()
    ) : []), r = C(() => o.value ? i.value : i.value.slice(0, gs)), c = C(() => i.value.length > gs), d = C(() => a.data?.total_payment_success_value || []), u = (g) => g.payment_success_value || [], h = (g) => typeof g.payment_success_count == "number" ? g.payment_success_count : (g.payment_success_value || []).reduce((b, k) => b + (k.count || 0), 0), p = (g) => bt(g), v = (g) => g == null ? "0" : Qt(g);
    C(() => (a.data?.total_payment_success_value || []).reduce((g, b) => g + (b.total_value || 0), 0));
    const f = C(() => {
      const g = a.data, b = g.total_booking_initiated || 0, k = g.total_booking_started || 0, w = g.total_payment_initiated || 0, M = g.total_not_found || 0, S = g.total_cancelled || 0, D = g.total_no_pending_balance || 0, A = g.total_errors || 0, T = typeof g.total_payment_success == "number" ? g.total_payment_success : (g.total_payment_success_value || []).reduce((z, j) => z + (j.count || 0), 0), B = g.total_payment_failed || 0, F = Math.max(0, b - k), E = Math.max(0, k - w - M - S - D - A), N = (z, j) => {
        const O = j > 0 ? Math.round(z / j * 100) : 0;
        return `${X(z)} (${O}%)`;
      }, Y = [
        { name: "Initiated" },
        { name: "Started" },
        { name: "Payment Initiated" },
        { name: "Not Found" },
        { name: "Cancelled" },
        { name: "No Pending Balance" },
        { name: "Errors" },
        { name: "Payment Success" },
        { name: "Payment Failed" },
        { name: "Abandoned (Init)" },
        { name: "Abandoned (Start)" }
      ], P = [];
      return k > 0 && P.push({
        source: "Initiated",
        target: "Started",
        value: k,
        label: N(k, b)
      }), F > 0 && P.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: F,
        label: N(F, b)
      }), w > 0 && P.push({
        source: "Started",
        target: "Payment Initiated",
        value: w,
        label: N(w, k)
      }), M > 0 && P.push({
        source: "Started",
        target: "Not Found",
        value: M,
        label: N(M, k)
      }), S > 0 && P.push({
        source: "Started",
        target: "Cancelled",
        value: S,
        label: N(S, k)
      }), D > 0 && P.push({
        source: "Started",
        target: "No Pending Balance",
        value: D,
        label: N(D, k)
      }), A > 0 && P.push({
        source: "Started",
        target: "Errors",
        value: A,
        label: N(A, k)
      }), E > 0 && P.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: E,
        label: N(E, k)
      }), T > 0 && P.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: T,
        label: N(T, w)
      }), B > 0 && P.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: B,
        label: N(B, w)
      }), { nodes: Y, links: P };
    }), m = {
      Initiated: "#DBEAFE",
      Started: "#93C5FD",
      "Payment Initiated": "#FED7AA",
      "Not Found": "#FECACA",
      Cancelled: "#FED7AA",
      "No Pending Balance": "#FEF08A",
      Errors: "#FCA5A5",
      "Payment Success": "#86EFAC",
      "Payment Failed": "#FCA5A5",
      "Abandoned (Init)": "#FEE2E2",
      "Abandoned (Start)": "#FEE2E2"
    }, _ = (g, b) => !b || b === 0 ? "0%" : `${Math.round(g / b * 100)}%`;
    return (g, b) => (y(), x("article", hp, [
      l("header", fp, [
        l("div", gp, [
          b[2] || (b[2] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "Booking Manager Metrics"),
            l("p", { class: "card-subtitle" }, "Booking manager workflow tracking and analysis")
          ], -1)),
          a.loading ? I("", !0) : (y(), x("div", pp, [
            b[1] || (b[1] = l("p", { class: "badge-label" }, "Payment Success Value", -1)),
            d.value.length > 0 ? (y(), x("div", vp, [
              (y(!0), x(K, null, tt(d.value, (k) => (y(), x("p", {
                key: k.currency,
                class: "currency-breakdown-item"
              }, $(k.currency) + " " + $(v(k.total_value)), 1))), 128))
            ])) : (y(), x("p", bp, $(v(0)), 1))
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", mp, [...b[3] || (b[3] = [
        st('<div class="loading-container" data-v-2db93357><div class="chart-flow-loader" data-v-2db93357><div class="flow-line flow-1" data-v-2db93357></div><div class="flow-line flow-2" data-v-2db93357></div><div class="flow-line flow-3" data-v-2db93357></div><div class="flow-line flow-4" data-v-2db93357></div><div class="flow-line flow-5" data-v-2db93357></div></div><p class="loading-text" data-v-2db93357>Loading booking data...</p></div>', 1)
      ])])) : a.error ? (y(), x("div", yp, [
        l("div", _p, [
          b[4] || (b[4] = l("div", { class: "error-icon-wrapper" }, [
            l("svg", {
              class: "error-icon",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [
              l("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              })
            ])
          ], -1)),
          b[5] || (b[5] = l("p", { class: "error-title" }, "Error loading data", -1)),
          l("p", xp, $(a.error), 1)
        ])
      ])) : (y(), x("div", kp, [
        l("section", wp, [
          l("div", $p, [
            Q(xe, {
              data: f.value,
              "node-colors": m,
              height: "500px",
              "node-gap": 15
            }, null, 8, ["data"])
          ])
        ]),
        i.value.length > 0 ? (y(), x("section", Mp, [
          b[8] || (b[8] = l("div", { class: "section-header" }, [
            l("h4", { class: "section-title" }, "Daily Overview")
          ], -1)),
          l("div", Sp, [
            l("table", Cp, [
              b[6] || (b[6] = l("thead", null, [
                l("tr", { class: "table-header-row" }, [
                  l("th", { class: "table-header" }, "Date"),
                  l("th", { class: "table-header" }, "Initiated"),
                  l("th", { class: "table-header" }, "Started"),
                  l("th", { class: "table-header" }, "Payment Initiated"),
                  l("th", { class: "table-header" }, "Payment Results"),
                  l("th", { class: "table-header" }, "Payment Value"),
                  l("th", { class: "table-header" }, "Outcomes")
                ])
              ], -1)),
              l("tbody", Dp, [
                (y(!0), x(K, null, tt(r.value, (k) => (y(), x("tr", {
                  key: k.date,
                  class: "table-row"
                }, [
                  l("td", Ap, $(L(Dt)(k.date).format("DD/MM/YYYY")), 1),
                  l("td", Tp, $(L(X)(k.booking_initiated_count)), 1),
                  l("td", Bp, [
                    xt($(L(X)(k.booking_started_count)) + " ", 1),
                    l("span", Lp, " (" + $(_(k.booking_started_count, k.booking_initiated_count)) + ") ", 1)
                  ]),
                  l("td", Fp, $(L(X)(k.payment_initiated_count)), 1),
                  l("td", Pp, [
                    l("div", Ip, [
                      l("span", Rp, " Success: " + $(L(X)(h(k))), 1),
                      l("span", Ep, " Failed: " + $(L(X)(k.payment_failed_count || 0)), 1)
                    ])
                  ]),
                  l("td", Op, [
                    u(k).length > 0 ? (y(), x("div", zp, [
                      (y(!0), x(K, null, tt(u(k), (w) => (y(), x("span", {
                        key: `${k.date}-${w.currency}`,
                        class: "badge badge-currency"
                      }, $(w.currency) + " " + $(p(w.total_value)), 1))), 128))
                    ])) : (y(), x("span", Vp, "N/A"))
                  ]),
                  l("td", Np, [
                    l("div", Wp, [
                      l("span", Hp, " Not Found: " + $(k.not_found_count ? L(X)(k.not_found_count) : "N/A"), 1),
                      l("span", jp, " Cancelled: " + $(k.cancelled_count ? L(X)(k.cancelled_count) : "N/A"), 1),
                      l("span", Yp, " No Balance: " + $(k.no_pending_balance_count ? L(X)(k.no_pending_balance_count) : "N/A"), 1),
                      l("span", qp, " Errors: " + $(k.error_count ? L(X)(k.error_count) : "N/A"), 1)
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          c.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: b[0] || (b[0] = (k) => o.value = !o.value)
          }, [
            xt($(o.value ? "View less" : `View more (${i.value.length - gs} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: q(["view-more-icon", { "view-more-icon-rotated": o.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...b[7] || (b[7] = [
              l("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : I("", !0),
          e.enableExport ? (y(), dt(L(kt), {
            key: 1,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (y(), x("section", Up, [...b[9] || (b[9] = [
          st('<div class="empty-state-content" data-v-2db93357><div class="empty-icon-wrapper" data-v-2db93357><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-2db93357><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-v-2db93357></path></svg></div><p class="empty-title" data-v-2db93357>No booking manager data available</p><p class="empty-description" data-v-2db93357>No booking manager data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Xp = /* @__PURE__ */ nt(Kp, [["__scopeId", "data-v-2db93357"]]), Gp = { class: "checkin-metrics-card" }, Zp = {
  key: 0,
  class: "loading-state"
}, Qp = {
  key: 1,
  class: "card-body"
}, Jp = {
  key: 0,
  class: "chart-section"
}, t0 = { class: "chart-wrapper" }, e0 = {
  key: 1,
  class: "table-section"
}, a0 = { class: "table-wrapper" }, s0 = { class: "data-table" }, n0 = { class: "table-body" }, o0 = { class: "table-cell font-medium" }, i0 = { class: "table-cell text-center" }, r0 = { class: "table-cell text-center" }, l0 = { class: "table-cell text-center" }, c0 = { class: "table-cell text-center" }, d0 = { class: "table-cell text-center" }, u0 = { class: "table-cell text-center" }, h0 = { class: "table-cell text-left" }, f0 = {
  key: 0,
  class: "failed-steps"
}, g0 = { class: "step-name" }, p0 = { class: "step-count" }, v0 = {
  key: 1,
  class: "empty-cell"
}, b0 = {
  key: 2,
  class: "empty-state"
}, m0 = {
  __name: "Checkin",
  props: {
    loading: {
      type: Boolean,
      default: !1
    },
    enableExport: {
      type: Boolean,
      default: !1
    },
    exportLoading: {
      type: Boolean,
      default: !1
    },
    /** Single API response (checkin shape). If passed, used as checkinData. */
    data: {
      type: Object,
      default: void 0
    },
    checkinData: {
      type: Object,
      default: () => ({
        total_checkin_init: 0,
        total_checkin_initiated: 0,
        total_checkin_init_abandoned: 0,
        total_checkin_started: 0,
        total_checkin_completed: 0,
        total_checkin_closed: 0,
        total_checkin_unrecovered: 0,
        checkin_by_day: []
      })
    },
    failedData: {
      type: Object,
      default: () => ({
        total_checkin_failed: 0,
        failed_by_step_by_day: [],
        unrecovered_by_step: [],
        unrecovered_by_day: []
      })
    }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const a = t, s = (_) => {
      a("export", _);
    }, n = e, o = {
      total_checkin_init: 0,
      total_checkin_initiated: 0,
      total_checkin_init_abandoned: 0,
      total_checkin_started: 0,
      total_checkin_completed: 0,
      total_checkin_closed: 0,
      total_checkin_unrecovered: 0,
      checkin_by_day: []
    }, i = {
      total_checkin_failed: 0,
      failed_by_step_by_day: [],
      unrecovered_by_step: [],
      unrecovered_by_day: []
    }, r = at([]), c = C(() => {
      const _ = n.data;
      return _ && (Array.isArray(_.checkin_by_day) && _.checkin_by_day.length > 0 || (_.total_checkin_initiated ?? 0) > 0) ? { ...o, ..._ } : n.checkinData ?? o;
    }), d = C(() => {
      const _ = n.data;
      return _ && (Array.isArray(_.failed_by_step_by_day) && _.failed_by_step_by_day.length > 0 || Array.isArray(_.unrecovered_by_step) && _.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: _.total_checkin_failed ?? 0,
        total_checkin_unrecovered: _.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: _.failed_by_step_by_day ?? [],
        unrecovered_by_step: _.unrecovered_by_step ?? [],
        unrecovered_by_day: _.unrecovered_by_day ?? []
      } : n.failedData ?? i;
    }), u = C(() => {
      const _ = {
        // Main flow progression - from blue to purple to green
        "Checkin Init": "#93C5FD",
        // Blue for started state
        "Booking retrive": "#C7D2FE",
        // Light purple
        "Booking retrive success": "#A5B4FC",
        // Medium purple for success
        "Number of Passengers": "#8B8CF6",
        // Medium purple
        Completed: "#A7F3D0",
        // Light green
        "Closed with BP": "#7BE39E",
        // Green for success
        // Abandoned states - progressive yellow/orange
        "Abandoned (Init)": "#FCA5A5",
        // Light red
        "Abandoned (Started)": "#F87171",
        // Medium red
        "Abandoned (Flow)": "#EF4444",
        // Darker red
        "BP Error": "#EF4444",
        // Darker red for boarding pass error
        // Failed states - progressive red intensity
        Unrecovered: "#F87171"
        // Medium red for main unrecovered node
      };
      return (d.value.unrecovered_by_step || []).forEach((b) => {
        const w = b.step_name.replace(/_/g, " ").split(" ").map((S) => S.charAt(0).toUpperCase() + S.slice(1)).join(" "), M = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        _[w] = M[w] || "#DC2626";
      }), _;
    }), h = (_, g) => !g || g === 0 ? "0%" : `${Math.round(_ / g * 100)}%`, p = (_, g) => {
      const b = X(_), k = h(_, g);
      return `${b} (${k})`;
    }, v = (_) => _.reduce((g, b) => g + b.failed_count, 0), f = C(() => {
      const _ = [], g = [];
      if (!c.value.total_checkin_initiated)
        return { nodes: _, links: g };
      _.push({ name: "Checkin Init" }), _.push({ name: "Booking retrive" }), _.push({ name: "Booking retrive success" }), _.push({ name: "Number of Passengers" }), _.push({ name: "Completed" }), _.push({ name: "Closed with BP" });
      const b = c.value.total_checkin_initiated, k = c.value.total_checkin_init, w = c.value.total_checkin_init_abandoned, M = k - w, S = c.value.total_checkin_started, D = c.value.total_checkin_completed, A = c.value.total_checkin_closed, T = d.value.unrecovered_by_step || [], B = T.reduce((Y, P) => Y + P.count, 0);
      if (k > 0) {
        const Y = Math.round(k / b * 100);
        g.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: k,
          label: `${k.toLocaleString()} (${Y}%)`
        });
      }
      const F = b - k;
      if (F > 0) {
        const Y = Math.round(F / b * 100);
        _.push({ name: "Abandoned (Init)" }), g.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: F,
          label: `${F.toLocaleString()} (${Y}%)`
        });
      }
      if (w > 0) {
        const Y = Math.round(w / b * 100);
        _.push({ name: "Abandoned (Started)" }), g.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: w,
          label: `${w.toLocaleString()} (${Y}%)`
        });
      }
      if (M > 0) {
        const Y = Math.round(M / b * 100);
        g.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: M,
          label: `${M.toLocaleString()} (${Y}%)`
        });
      }
      if (S > 0) {
        const Y = Math.round(S / b * 100);
        g.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: S,
          label: `${S.toLocaleString()} (${Y}%)`
        });
      }
      if (D > 0) {
        const Y = Math.round(D / S * 100);
        g.push({
          source: "Number of Passengers",
          target: "Completed",
          value: D,
          label: `${D.toLocaleString()} (${Y}%)`
        });
      }
      if (T.length > 0 && B > 0) {
        _.push({ name: "Unrecovered" });
        const Y = Math.round(B / S * 100);
        g.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: B,
          label: `${B.toLocaleString()} (${Y}%)`
        }), T.forEach((P) => {
          const j = P.step_name.replace(/_/g, " ").split(" ").map((V) => V.charAt(0).toUpperCase() + V.slice(1)).join(" "), O = Math.round(P.count / S * 100);
          _.push({ name: j }), g.push({
            source: "Unrecovered",
            target: j,
            value: P.count,
            label: `${P.count.toLocaleString()} (${O}%)`
          });
        });
      }
      const E = S - (D + B);
      if (E > 0) {
        const Y = Math.round(E / S * 100);
        _.push({ name: "Abandoned (Flow)" }), g.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: E,
          label: `${E.toLocaleString()} (${Y}%)`
        });
      }
      const N = D - A;
      if (N > 0) {
        const Y = Math.round(N / S * 100);
        _.push({ name: "BP Error" }), g.push({
          source: "Completed",
          target: "BP Error",
          value: N,
          label: `${N.toLocaleString()} (${Y}%)`
        });
      }
      if (A > 0) {
        const Y = Math.round(A / S * 100);
        g.push({
          source: "Completed",
          target: "Closed with BP",
          value: A,
          label: `${A.toLocaleString()} (${Y}%)`
        });
      }
      return { nodes: _, links: g };
    }), m = () => {
      const _ = c.value.checkin_by_day || [], g = d.value.failed_by_step_by_day || [];
      if (_.length === 0) {
        r.value = [];
        return;
      }
      r.value = [..._].map((b) => {
        const k = g.find(
          (w) => w.date === b.date
        );
        return {
          ...b,
          failed_steps: k?.steps || []
        };
      }), r.value.sort((b, k) => new Date(b.date) - new Date(k.date));
    };
    return Ft(
      [() => n.data, () => n.checkinData, () => n.failedData],
      () => {
        m();
      },
      { deep: !0, immediate: !0 }
    ), (_, g) => (y(), x("article", Gp, [
      g[3] || (g[3] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Check-in Metrics"),
          l("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      n.loading ? (y(), x("div", Zp, [...g[0] || (g[0] = [
        st('<div class="loading-container" data-v-d527da09><div class="chart-flow-loader" data-v-d527da09><div class="flow-line flow-1" data-v-d527da09></div><div class="flow-line flow-2" data-v-d527da09></div><div class="flow-line flow-3" data-v-d527da09></div><div class="flow-line flow-4" data-v-d527da09></div><div class="flow-line flow-5" data-v-d527da09></div></div><p class="loading-text" data-v-d527da09>Loading check-in data...</p></div>', 1)
      ])])) : (y(), x("div", Qp, [
        f.value.nodes.length > 0 ? (y(), x("section", Jp, [
          l("div", t0, [
            Q(xe, {
              data: f.value,
              height: "500px",
              "node-colors": u.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : I("", !0),
        r.value && r.value.length > 0 ? (y(), x("section", e0, [
          l("div", a0, [
            l("table", s0, [
              g[1] || (g[1] = l("thead", null, [
                l("tr", { class: "table-header-row" }, [
                  l("th", { class: "table-header" }, "Date"),
                  l("th", { class: "table-header" }, "Checkin Init"),
                  l("th", { class: "table-header" }, "Booking Retrieve (%)"),
                  l("th", { class: "table-header" }, "Number of Passengers"),
                  l("th", { class: "table-header" }, "Completed (%)"),
                  l("th", { class: "table-header" }, "Closed with BP (%)"),
                  l("th", { class: "table-header" }, "Failed (%)"),
                  l("th", { class: "table-header" }, "Failed (Reasons)")
                ])
              ], -1)),
              l("tbody", n0, [
                (y(!0), x(K, null, tt(r.value, (b) => (y(), x("tr", {
                  key: b.date,
                  class: "table-row"
                }, [
                  l("td", o0, $(L(Dt)(b.date).format("DD/MM/YYYY")), 1),
                  l("td", i0, $(L(X)(b.checkin_initiated_count)), 1),
                  l("td", r0, $(p(b.checkin_init_count, b.checkin_initiated_count)), 1),
                  l("td", l0, $(L(X)(b.checkin_started_count)), 1),
                  l("td", c0, $(p(b.checkin_completed_count, b.checkin_started_count)), 1),
                  l("td", d0, $(p(b.checkin_closed_count, b.checkin_started_count)), 1),
                  l("td", u0, $(p(v(b.failed_steps), b.checkin_started_count)), 1),
                  l("td", h0, [
                    b.failed_steps && b.failed_steps.length > 0 ? (y(), x("div", f0, [
                      (y(!0), x(K, null, tt(b.failed_steps, (k) => (y(), x("div", {
                        key: k.step_name,
                        class: "failed-step-item"
                      }, [
                        l("span", g0, $(k.step_name.replace(/_/g, " ")) + ":", 1),
                        l("span", p0, $(k.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", v0, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), dt(L(kt), {
            key: 0,
            onExport: s,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (y(), x("section", b0, [...g[2] || (g[2] = [
          st('<div class="empty-state-content" data-v-d527da09><div class="empty-icon-wrapper" data-v-d527da09><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d527da09><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-d527da09></path></svg></div><p class="empty-title" data-v-d527da09>No check-in data available</p><p class="empty-description" data-v-d527da09>Try adjusting the date range or check your filters to see check-in performance data.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}, y0 = /* @__PURE__ */ nt(m0, [["__scopeId", "data-v-d527da09"]]), _0 = { class: "checkin-metrics-card" }, x0 = {
  key: 0,
  class: "loading-state"
}, k0 = {
  key: 1,
  class: "card-body"
}, w0 = {
  key: 0,
  class: "sankey-section"
}, $0 = {
  key: 1,
  class: "table-section"
}, M0 = { class: "table-wrapper" }, S0 = { class: "data-table" }, C0 = { class: "table-body" }, D0 = { class: "table-cell date-cell" }, A0 = { class: "table-cell text-center" }, T0 = { class: "table-cell text-center" }, B0 = { class: "table-cell text-center" }, L0 = { class: "table-cell text-center" }, F0 = { class: "table-cell text-center cell-success" }, P0 = { class: "table-cell text-center cell-danger" }, I0 = { class: "table-cell reasons-cell" }, R0 = {
  key: 0,
  class: "reasons-list"
}, E0 = { class: "reason-name" }, O0 = { class: "reason-count" }, z0 = {
  key: 1,
  class: "no-reasons"
}, V0 = {
  key: 2,
  class: "empty-state"
}, N0 = { class: "empty-state-content" }, W0 = { class: "empty-icon-wrapper" }, ps = 3, H0 = /* @__PURE__ */ J({
  __name: "CheckinMetrics",
  props: {
    checkinData: { default: () => ({
      total_record_locator_init: 0,
      total_checkin_initiated: 0,
      total_record_locator_init_abandoned: 0,
      total_record_locator_started: 0,
      total_record_locator_completed: 0,
      total_record_locator_closed: 0,
      total_record_locator_unrecovered: 0,
      total_record_locator_init_abandoned_error: null,
      total_record_locator_init_abandoned_voluntary: null,
      total_checkin_pre_init_abandoned_error: null,
      total_checkin_pre_init_abandoned_voluntary: null,
      record_locator_by_day: []
    }) },
    failedData: { default: () => ({
      total_checkin_failed: 0,
      failed_by_step_by_day: [],
      unrecovered_by_step: []
    }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const s = e, n = a, o = (k) => {
      n("export", k);
    }, { isDark: i } = lt(rt(s, "theme")), r = (k) => k == null ? "0" : k.toLocaleString(), c = (k) => {
      const w = new Date(k), M = String(w.getDate()).padStart(2, "0"), S = String(w.getMonth() + 1).padStart(2, "0"), D = w.getFullYear();
      return `${M}/${S}/${D}`;
    }, d = (k) => k.replace(/_/g, " ").replace(/\b\w/g, (w) => w.toUpperCase()), u = (k, w) => !w || w === 0 ? "0%" : `${Math.round(k / w * 100)}%`, h = (k, w) => {
      const M = k || 0, S = w || 0, D = r(M), A = u(M, S);
      return `${D} (${A})`;
    }, p = (k) => k ? k.reduce((w, M) => w + M.failed_count, 0) : 0, v = C(() => {
      const k = {
        "Checkin Init": "#93C5FD",
        "Booking Retrieval": "#C7D2FE",
        "Booking Retrieved": "#A5B4FC",
        Completed: "#A7F3D0",
        "Closed with BP": "#7BE39E",
        "Abandoned (Init)": "#FACC15",
        "Booking not retreived": "#F87171",
        "Abandoned (Started)": "#FACC15",
        Error: "#F87171",
        "Abandoned (Flow)": "#FACC15",
        "BP Error": "#EF4444",
        Unrecovered: "#F87171"
      };
      return (s.failedData?.unrecovered_by_step || []).forEach((M) => {
        const D = M.step_name.replace(/_/g, " ").split(" ").map((T) => T.charAt(0).toUpperCase() + T.slice(1)).join(" "), A = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        k[D] = A[D] || "#DC2626";
      }), k;
    }), f = at(!1), m = C(() => {
      const k = s.checkinData?.record_locator_by_day || [], w = s.failedData?.failed_by_step_by_day || [];
      return k.map((S) => {
        const D = w.find((A) => A.date === S.date);
        return {
          ...S,
          failed_steps: D?.steps || []
        };
      }).sort((S, D) => new Date(S.date).getTime() - new Date(D.date).getTime());
    }), _ = C(() => f.value ? m.value : m.value.slice(0, ps)), g = C(() => m.value.length > ps), b = C(() => {
      const k = [], w = [], M = /* @__PURE__ */ new Set(), S = (ct) => {
        M.has(ct) || (k.push({ name: ct }), M.add(ct));
      };
      if (!s.checkinData?.total_checkin_initiated)
        return { nodes: k, links: w };
      S("Checkin Init"), S("Booking Retrieval"), S("Booking Retrieved"), S("Completed"), S("Closed with BP");
      const D = s.checkinData.total_checkin_initiated || 0, A = s.checkinData.total_record_locator_init || 0, T = s.checkinData.total_record_locator_init_abandoned || 0, B = s.checkinData.total_checkin_pre_init_abandoned_error, F = s.checkinData.total_checkin_pre_init_abandoned_voluntary, E = B != null || F != null, N = E ? Math.max(Number(B) || 0, 0) : 0, Y = E ? Math.max(Number(F) || 0, 0) : 0, P = s.checkinData.total_record_locator_init_abandoned_error, z = s.checkinData.total_record_locator_init_abandoned_voluntary, j = P != null || z != null, O = j ? Math.max(Number(P) || 0, 0) : 0, V = j ? Math.max(Number(z) || 0, 0) : 0, H = j ? Math.max(T - O - V, 0) : T, et = A - T, Z = s.checkinData.total_record_locator_started || 0, U = s.checkinData.total_record_locator_completed || 0, ot = s.checkinData.total_record_locator_closed || 0, wt = s.failedData?.unrecovered_by_step || [], gt = wt.reduce((ct, he) => ct + he.count, 0);
      if (A > 0) {
        const ct = Math.round(A / D * 100);
        w.push({
          source: "Checkin Init",
          target: "Booking Retrieval",
          value: A,
          label: `${A.toLocaleString()} (${ct}%)`
        });
      }
      const It = D - A;
      if (E) {
        if (Y > 0) {
          const ct = Math.round(Y / D * 100);
          S("Abandoned (Init)"), w.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: Y,
            label: `${Y.toLocaleString()} (${ct}%)`
          });
        }
        if (N > 0) {
          const ct = Math.round(N / D * 100);
          S("Booking not retreived"), w.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: N,
            label: `${N.toLocaleString()} (${ct}%)`
          });
        }
      } else if (It > 0) {
        const ct = Math.round(It / D * 100);
        S("Abandoned (Init)"), w.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: It,
          label: `${It.toLocaleString()} (${ct}%)`
        });
      }
      if (j) {
        if (O > 0) {
          const ct = Math.round(O / D * 100);
          S("Error"), w.push({
            source: "Booking Retrieval",
            target: "Error",
            value: O,
            label: `${O.toLocaleString()} (${ct}%)`
          });
        }
        if (V > 0) {
          const ct = Math.round(V / D * 100);
          S("Abandoned (Started)"), w.push({
            source: "Booking Retrieval",
            target: "Abandoned (Started)",
            value: V,
            label: `${V.toLocaleString()} (${ct}%)`
          });
        }
        if (H > 0) {
          const ct = Math.round(H / D * 100);
          S("Abandoned (Started)"), w.push({
            source: "Booking Retrieval",
            target: "Abandoned (Started)",
            value: H,
            label: `${H.toLocaleString()} (${ct}%)`
          });
        }
      } else if (T > 0) {
        const ct = Math.round(T / D * 100);
        S("Abandoned (Started)"), w.push({
          source: "Booking Retrieval",
          target: "Abandoned (Started)",
          value: T,
          label: `${T.toLocaleString()} (${ct}%)`
        });
      }
      if (et > 0) {
        const ct = Math.round(et / D * 100);
        w.push({
          source: "Booking Retrieval",
          target: "Booking Retrieved",
          value: et,
          label: `${et.toLocaleString()} (${ct}%)`
        });
      }
      if (U > 0) {
        const ct = Math.round(U / Z * 100);
        w.push({
          source: "Booking Retrieved",
          target: "Completed",
          value: U,
          label: `${U.toLocaleString()} (${ct}%)`
        });
      }
      if (wt.length > 0 && gt > 0) {
        S("Unrecovered");
        const ct = Math.round(gt / Z * 100);
        w.push({
          source: "Booking Retrieved",
          target: "Unrecovered",
          value: gt,
          label: `${gt.toLocaleString()} (${ct}%)`
        }), wt.forEach((he) => {
          const qe = he.step_name.replace(/_/g, " ").split(" ").map((Ue) => Ue.charAt(0).toUpperCase() + Ue.slice(1)).join(" "), ya = Math.round(he.count / Z * 100);
          S(qe), w.push({
            source: "Unrecovered",
            target: qe,
            value: he.count,
            label: `${he.count.toLocaleString()} (${ya}%)`
          });
        });
      }
      const Vt = Z - (U + gt);
      if (Vt > 0) {
        const ct = Math.round(Vt / Z * 100);
        S("Abandoned (Flow)"), w.push({
          source: "Booking Retrieved",
          target: "Abandoned (Flow)",
          value: Vt,
          label: `${Vt.toLocaleString()} (${ct}%)`
        });
      }
      const Kt = U - ot;
      if (Kt > 0) {
        const ct = Math.round(Kt / Z * 100);
        S("BP Error"), w.push({
          source: "Completed",
          target: "BP Error",
          value: Kt,
          label: `${Kt.toLocaleString()} (${ct}%)`
        });
      }
      if (ot > 0) {
        const ct = Math.round(ot / Z * 100);
        w.push({
          source: "Completed",
          target: "Closed with BP",
          value: ot,
          label: `${ot.toLocaleString()} (${ct}%)`
        });
      }
      return { nodes: k, links: w };
    });
    return t({ isDark: i }), (k, w) => (y(), x("article", _0, [
      w[6] || (w[6] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Check-in Metrics"),
          l("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      e.loading ? (y(), x("div", x0, [...w[1] || (w[1] = [
        st('<div class="loading-container" data-v-014c401c><div class="chart-bars-loader" data-v-014c401c><div class="bar bar-1" data-v-014c401c></div><div class="bar bar-2" data-v-014c401c></div><div class="bar bar-3" data-v-014c401c></div><div class="bar bar-4" data-v-014c401c></div><div class="bar bar-5" data-v-014c401c></div></div><p class="loading-text" data-v-014c401c>Loading check-in data...</p></div>', 1)
      ])])) : (y(), x("div", k0, [
        b.value.nodes.length > 0 ? (y(), x("div", w0, [
          Q(xe, {
            data: b.value,
            height: "500px",
            "node-colors": v.value,
            "use-gradient": !1,
            "node-gap": 30
          }, null, 8, ["data", "node-colors"])
        ])) : I("", !0),
        m.value && m.value.length > 0 ? (y(), x("div", $0, [
          l("div", M0, [
            l("table", S0, [
              w[2] || (w[2] = l("thead", null, [
                l("tr", { class: "table-header-row" }, [
                  l("th", { class: "table-header" }, "Date"),
                  l("th", { class: "table-header" }, "Checkin Init"),
                  l("th", { class: "table-header" }, "Booking Retrieval (%)"),
                  l("th", { class: "table-header" }, "Booking Retrieved"),
                  l("th", { class: "table-header" }, "Completed (%)"),
                  l("th", { class: "table-header" }, "Closed with BP (%)"),
                  l("th", { class: "table-header" }, "Checkin Failed (%)"),
                  l("th", { class: "table-header" }, "Failed (Reasons)")
                ])
              ], -1)),
              l("tbody", C0, [
                (y(!0), x(K, null, tt(_.value, (M) => (y(), x("tr", {
                  key: M.date,
                  class: "table-row"
                }, [
                  l("td", D0, $(c(M.date)), 1),
                  l("td", A0, $(r(M.checkin_initiated)), 1),
                  l("td", T0, $(h(M.record_locator_init_count, M.checkin_initiated)), 1),
                  l("td", B0, $(h(M.record_locator_started_count, M.record_locator_init_count)), 1),
                  l("td", L0, $(h(M.record_locator_completed_count, M.record_locator_started_count)), 1),
                  l("td", F0, $(h(M.record_locator_closed_count, M.record_locator_started_count)), 1),
                  l("td", P0, $(h(p(M.failed_steps), M.record_locator_started_count)), 1),
                  l("td", I0, [
                    M.failed_steps && M.failed_steps.length > 0 ? (y(), x("div", R0, [
                      (y(!0), x(K, null, tt(M.failed_steps, (S) => (y(), x("div", {
                        key: S.step_name,
                        class: "reason-item"
                      }, [
                        l("span", E0, $(d(S.step_name)) + ":", 1),
                        l("span", O0, $(S.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", z0, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          g.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: w[0] || (w[0] = (M) => f.value = !f.value)
          }, [
            xt($(f.value ? "View less" : `View more (${m.value.length - ps} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: q(["view-more-icon", { "view-more-icon-rotated": f.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...w[3] || (w[3] = [
              l("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : I("", !0),
          e.enableExport ? (y(), dt(L(kt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (y(), x("div", V0, [
          l("div", N0, [
            l("div", W0, [
              Q(L(zt), { class: "empty-icon" })
            ]),
            w[4] || (w[4] = l("p", { class: "empty-title" }, "No check-in data available", -1)),
            w[5] || (w[5] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see check-in metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), j0 = /* @__PURE__ */ nt(H0, [["__scopeId", "data-v-014c401c"]]), Y0 = { class: "checkin-segments-card" }, q0 = {
  key: 0,
  class: "loading-state"
}, U0 = {
  key: 1,
  class: "card-body"
}, K0 = {
  key: 0,
  class: "table-section"
}, X0 = { class: "table-wrapper" }, G0 = { class: "data-table" }, Z0 = { class: "table-body" }, Q0 = { class: "table-cell font-medium text-center" }, J0 = { class: "airport-badge" }, tv = { class: "table-cell text-center" }, ev = {
  key: 0,
  class: "airport-badge connection"
}, av = {
  key: 1,
  class: "empty-connection"
}, sv = { class: "table-cell text-center" }, nv = { class: "airport-badge" }, ov = { class: "table-cell text-center" }, iv = {
  key: 0,
  class: "trip-badge roundtrip"
}, rv = {
  key: 1,
  class: "trip-badge oneway"
}, lv = { class: "table-cell text-center" }, cv = { class: "table-cell text-center" }, dv = { class: "percentage-value" }, uv = { class: "table-cell text-center" }, hv = { class: "percentage-value" }, fv = { class: "table-cell text-center" }, gv = { class: "percentage-value success" }, pv = {
  key: 1,
  class: "empty-state"
}, vs = 3, vv = /* @__PURE__ */ J({
  __name: "checkinSegments",
  props: {
    data: { default: () => [] },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const s = e, n = a, o = (v) => {
      n("export", v);
    }, { isDark: i } = lt(rt(s, "theme")), r = at(!1), c = C(() => r.value ? s.data : s.data.slice(0, vs)), d = C(() => s.data.length > vs), u = (v, f) => !f || f === 0 || !v ? "0%" : `${Math.round(v / f * 100)}%`, h = (v) => !v || v === "None" ? "-" : String(v).trim().replace(/_[0-9]+$/i, ""), p = (v) => {
      const f = h(v?.departure_airport), m = h(v?.arrival_airport);
      return f === "-" || m === "-" ? !1 : f === m;
    };
    return t({ isDark: i }), (v, f) => (y(), x("article", Y0, [
      f[7] || (f[7] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Checkin Segments"),
          l("p", { class: "card-subtitle" }, "Breakdown by flight segment with connection when applicable")
        ])
      ], -1)),
      s.loading ? (y(), x("div", q0, [...f[1] || (f[1] = [
        st('<div class="loading-container" data-v-a1ebd82a><div class="chart-flow-loader" data-v-a1ebd82a><div class="flow-line flow-1" data-v-a1ebd82a></div><div class="flow-line flow-2" data-v-a1ebd82a></div><div class="flow-line flow-3" data-v-a1ebd82a></div><div class="flow-line flow-4" data-v-a1ebd82a></div><div class="flow-line flow-5" data-v-a1ebd82a></div></div><p class="loading-text" data-v-a1ebd82a>Loading segment data...</p></div>', 1)
      ])])) : (y(), x("div", U0, [
        s.data.length > 0 ? (y(), x("section", K0, [
          l("div", X0, [
            l("table", G0, [
              f[4] || (f[4] = l("thead", null, [
                l("tr", { class: "table-header-row" }, [
                  l("th", { class: "table-header" }, "Departure"),
                  l("th", { class: "table-header" }, "Connection"),
                  l("th", { class: "table-header" }, "Arrival"),
                  l("th", { class: "table-header" }, "Trip"),
                  l("th", { class: "table-header" }, "Init"),
                  l("th", { class: "table-header" }, "Started (%)"),
                  l("th", { class: "table-header" }, "Completed (%)"),
                  l("th", { class: "table-header" }, "Closed (%)")
                ])
              ], -1)),
              l("tbody", Z0, [
                (y(!0), x(K, null, tt(c.value, (m, _) => (y(), x("tr", {
                  key: _,
                  class: "table-row"
                }, [
                  l("td", Q0, [
                    l("span", J0, $(h(m.departure_airport)), 1)
                  ]),
                  l("td", tv, [
                    h(m.conexion_airport) !== "-" ? (y(), x("span", ev, $(h(m.conexion_airport)), 1)) : (y(), x("span", av, "-"))
                  ]),
                  l("td", sv, [
                    l("span", nv, $(h(m.arrival_airport)), 1)
                  ]),
                  l("td", ov, [
                    p(m) ? (y(), x("span", iv, [...f[2] || (f[2] = [
                      l("svg", {
                        class: "trip-icon",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        l("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        })
                      ], -1),
                      xt(" Roundtrip ", -1)
                    ])])) : (y(), x("span", rv, [...f[3] || (f[3] = [
                      l("svg", {
                        class: "trip-icon",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        l("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M14 5l7 7m0 0l-7 7m7-7H3"
                        })
                      ], -1),
                      xt(" One way ", -1)
                    ])]))
                  ]),
                  l("td", lv, $(L(X)(m.segment_init_count)), 1),
                  l("td", cv, [
                    l("span", dv, $(u(m.segment_started_count, m.segment_init_count)), 1)
                  ]),
                  l("td", uv, [
                    l("span", hv, $(u(m.segment_completed_count, m.segment_init_count)), 1)
                  ]),
                  l("td", fv, [
                    l("span", gv, $(u(m.segment_closed_count, m.segment_init_count)), 1)
                  ])
                ]))), 128))
              ])
            ])
          ]),
          d.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: f[0] || (f[0] = (m) => r.value = !r.value)
          }, [
            xt($(r.value ? "View less" : `View more (${s.data.length - vs} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: q(["view-more-icon", { "view-more-icon-rotated": r.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...f[5] || (f[5] = [
              l("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : I("", !0),
          e.enableExport ? (y(), dt(L(kt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (y(), x("section", pv, [...f[6] || (f[6] = [
          st('<div class="empty-state-content" data-v-a1ebd82a><div class="empty-icon-wrapper" data-v-a1ebd82a><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-a1ebd82a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-a1ebd82a></path></svg></div><p class="empty-title" data-v-a1ebd82a>No segment data available</p><p class="empty-description" data-v-a1ebd82a>No flight segment data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), bv = /* @__PURE__ */ nt(vv, [["__scopeId", "data-v-a1ebd82a"]]), mv = { class: "disruption-metrics-card" }, yv = { class: "card-header" }, _v = { class: "header-content" }, xv = {
  key: 0,
  class: "payment-success-badge"
}, kv = {
  key: 0,
  class: "currency-breakdown-list"
}, wv = {
  key: 1,
  class: "badge-value"
}, $v = {
  key: 0,
  class: "loading-state"
}, Mv = {
  key: 1,
  class: "card-body"
}, Sv = { class: "chart-section" }, Cv = { class: "chart-wrapper" }, Dv = {
  key: 1,
  class: "empty-chart"
}, Av = {
  key: 0,
  class: "table-section"
}, Tv = { class: "table-wrapper" }, Bv = { class: "data-table" }, Lv = { class: "table-body" }, Fv = { class: "table-cell font-medium text-center" }, Pv = { class: "table-cell text-center" }, Iv = { class: "table-cell text-center" }, Rv = { class: "percentage-text" }, Ev = { class: "table-cell text-center" }, Ov = { class: "abandoned-value" }, zv = { class: "table-cell" }, Vv = { class: "badges-container badges-wrap" }, Nv = { class: "badge badge-vol" }, Wv = { class: "badge badge-confirm" }, Hv = { class: "badge badge-not-confirm" }, jv = { class: "badge badge-reject" }, Yv = { class: "badge badge-not-paid" }, qv = { class: "badge badge-success" }, Uv = { class: "table-cell" }, Kv = { class: "badges-container badges-wrap" }, Xv = { class: "badge badge-inv" }, Gv = { class: "badge badge-human" }, Zv = { class: "badge badge-accept" }, Qv = {
  key: 1,
  class: "empty-state"
}, bs = 3, Jv = /* @__PURE__ */ J({
  __name: "Disruption",
  props: {
    data: { default: () => ({
      total_disruption_conversations: 0,
      total_disruption_initiated: 0,
      total_voluntary: 0,
      total_involuntary: 0,
      total_accepted: 0,
      total_confirmed: 0,
      total_sell_success: 0,
      total_sell_failed: 0,
      total_finished: 0,
      total_payment_success: [],
      disruption_by_day: []
    }) },
    loading: { type: Boolean, default: !1 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const a = e, s = t, n = (_) => {
      s("export", _);
    }, o = at(!1), i = C(() => a.data?.disruption_by_day ? [...a.data.disruption_by_day].sort(
      (_, g) => new Date(_.date).getTime() - new Date(g.date).getTime()
    ) : []), r = C(() => o.value ? i.value : i.value.slice(0, bs)), c = C(() => i.value.length > bs), d = C(() => a.data?.total_payment_success || []), u = (_, g) => !g || g === 0 ? "0%" : `${Math.round(_ / g * 100)}%`, h = (_) => bt(_), p = (_) => (_ ?? []).reduce((g, b) => g + (b.count ?? 0), 0), v = (_) => typeof _.sell_success_count == "number" ? _.sell_success_count : p(_.payment_success_total), f = C(() => {
      const _ = a.data, g = _.total_disruption_conversations || 0, b = _.total_disruption_initiated || 0, k = _.total_voluntary || 0, w = _.total_involuntary || 0, M = _.total_accepted || 0, S = _.total_confirmed || 0, D = typeof _.total_sell_success == "number" ? _.total_sell_success : p(_.total_payment_success), A = _.total_sell_failed || 0, T = Math.max(0, g - b), B = Math.max(0, b - k - w), F = Math.max(0, w - M), E = Math.max(0, k - S), N = A, Y = Math.max(0, S - D - N), P = (O, V) => {
        const H = V > 0 ? Math.round(O / V * 100) : 0;
        return `${O.toLocaleString()} (${H}%)`;
      }, z = [
        { name: "Initiated" },
        { name: "Started" },
        { name: "Voluntary" },
        { name: "Confirmed" },
        { name: "Paid" },
        { name: "Not Paid" },
        { name: "Rejected" },
        { name: "Not Confirmed" },
        { name: "Involuntary" },
        { name: "Accepted" },
        { name: "Redirect to Human" },
        { name: "Abandoned (Init)" },
        { name: "Abandoned (Start)" }
      ], j = [];
      return b > 0 && j.push({
        source: "Initiated",
        target: "Started",
        value: b,
        label: P(b, g)
      }), T > 0 && j.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: T,
        label: P(T, g)
      }), k > 0 && j.push({
        source: "Started",
        target: "Voluntary",
        value: k,
        label: P(k, g)
      }), w > 0 && j.push({
        source: "Started",
        target: "Involuntary",
        value: w,
        label: P(w, g)
      }), B > 0 && j.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: B,
        label: P(B, g)
      }), M > 0 && j.push({
        source: "Involuntary",
        target: "Accepted",
        value: M,
        label: P(M, g)
      }), F > 0 && j.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: F,
        label: P(F, g)
      }), S > 0 && j.push({
        source: "Voluntary",
        target: "Confirmed",
        value: S,
        label: P(S, g)
      }), E > 0 && j.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: E,
        label: P(E, g)
      }), D > 0 && j.push({
        source: "Confirmed",
        target: "Paid",
        value: D,
        label: P(D, g)
      }), N > 0 && j.push({
        source: "Confirmed",
        target: "Rejected",
        value: N,
        label: P(N, g)
      }), Y > 0 && j.push({
        source: "Confirmed",
        target: "Not Paid",
        value: Y,
        label: P(Y, g)
      }), { nodes: z, links: j };
    }), m = {
      Initiated: "#E5E7EB",
      Started: "#DBEAFE",
      "Abandoned (Start)": "#FEE2E2",
      Voluntary: "#FED7AA",
      Involuntary: "#E9D5FF",
      "Abandoned (Init)": "#FEE2E2",
      Accepted: "#86EFAC",
      "Redirect to Human": "#FCA5A5",
      Confirmed: "#BFDBFE",
      "Not Confirmed": "#FED7AA",
      Paid: "#86EFAC",
      Rejected: "#FCA5A5",
      "Not Paid": "#FED7AA"
    };
    return (_, g) => (y(), x("article", mv, [
      l("header", yv, [
        l("div", _v, [
          g[2] || (g[2] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "Disruption Manager Metrics"),
            l("p", { class: "card-subtitle" }, "Disruption workflow performance and completion tracking")
          ], -1)),
          a.loading ? I("", !0) : (y(), x("div", xv, [
            g[1] || (g[1] = l("p", { class: "badge-label" }, "Payment Success Value", -1)),
            d.value.length > 0 ? (y(), x("div", kv, [
              (y(!0), x(K, null, tt(d.value, (b) => (y(), x("p", {
                key: b.currency,
                class: "currency-breakdown-item"
              }, $(b.currency) + " " + $(h(b.total_value)), 1))), 128))
            ])) : (y(), x("p", wv, $(h(0)), 1))
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", $v, [...g[3] || (g[3] = [
        st('<div class="loading-container" data-v-47c8f691><div class="chart-bars-loader" data-v-47c8f691><div class="bar bar-1" data-v-47c8f691></div><div class="bar bar-2" data-v-47c8f691></div><div class="bar bar-3" data-v-47c8f691></div><div class="bar bar-4" data-v-47c8f691></div><div class="bar bar-5" data-v-47c8f691></div></div><p class="loading-text" data-v-47c8f691>Loading disruption data...</p></div>', 1)
      ])])) : (y(), x("div", Mv, [
        l("section", Sv, [
          l("div", Cv, [
            f.value.nodes.length > 0 && f.value.links.length > 0 ? (y(), dt(xe, {
              key: 0,
              data: f.value,
              "node-colors": m,
              height: "500px"
            }, null, 8, ["data"])) : (y(), x("div", Dv, [...g[4] || (g[4] = [
              l("p", { class: "empty-chart-text" }, "No disruption data available for visualization", -1)
            ])]))
          ])
        ]),
        i.value && i.value.length > 0 ? (y(), x("section", Av, [
          g[7] || (g[7] = st('<div class="section-header" data-v-47c8f691><h4 class="section-title" data-v-47c8f691>Daily Overview</h4></div><div class="legend-container" data-v-47c8f691><p class="legend-title" data-v-47c8f691>Legend</p><div class="legend-items" data-v-47c8f691><div class="legend-group" data-v-47c8f691><span class="legend-label" data-v-47c8f691>Voluntary:</span><span class="badge badge-vol" data-v-47c8f691>VOL</span></div><div class="legend-group" data-v-47c8f691><span class="legend-label" data-v-47c8f691>Involuntary:</span><span class="badge badge-inv" data-v-47c8f691>INV</span></div><div class="legend-note" data-v-47c8f691><span data-v-47c8f691>Vol=Voluntary</span><span data-v-47c8f691>•</span><span data-v-47c8f691>Inv=Involuntary</span></div></div></div>', 2)),
          l("div", Tv, [
            l("table", Bv, [
              g[5] || (g[5] = l("thead", null, [
                l("tr", { class: "table-header-row" }, [
                  l("th", { class: "table-header" }, "Date"),
                  l("th", { class: "table-header" }, "Initiated"),
                  l("th", { class: "table-header" }, "Started"),
                  l("th", { class: "table-header" }, "Abandoned (%)"),
                  l("th", { class: "table-header" }, "Voluntary"),
                  l("th", { class: "table-header" }, "Involuntary")
                ])
              ], -1)),
              l("tbody", Lv, [
                (y(!0), x(K, null, tt(r.value, (b) => (y(), x("tr", {
                  key: b.date,
                  class: "table-row"
                }, [
                  l("td", Fv, $(L(Dt)(b.date).format("DD/MM")), 1),
                  l("td", Pv, $(L(X)(b.disruption_conversations)), 1),
                  l("td", Iv, [
                    xt($(L(X)(b.disruption_initiated_count)) + " ", 1),
                    l("span", Rv, " (" + $(u(b.disruption_initiated_count, b.disruption_conversations)) + ") ", 1)
                  ]),
                  l("td", Ev, [
                    l("span", Ov, $(L(X)(b.disruption_initiated_count - b.voluntary_count - b.involuntary_count)) + " (" + $(u(b.disruption_initiated_count - b.voluntary_count - b.involuntary_count, b.disruption_conversations)) + ") ", 1)
                  ]),
                  l("td", zv, [
                    l("div", Vv, [
                      l("span", Nv, " VOL " + $(L(X)(b.voluntary_count)) + " (" + $(u(b.voluntary_count, b.disruption_conversations)) + ") ", 1),
                      l("span", Wv, " Confirm " + $(L(X)(b.confirmed_count)) + " (" + $(u(b.confirmed_count, b.disruption_conversations)) + ") ", 1),
                      l("span", Hv, " Not Confirm " + $(L(X)(b.voluntary_count - b.confirmed_count)) + " (" + $(u(b.voluntary_count - b.confirmed_count, b.disruption_conversations)) + ") ", 1),
                      l("span", jv, " Reject " + $(L(X)(b.sell_failed_count)) + " (" + $(u(b.sell_failed_count, b.disruption_conversations)) + ") ", 1),
                      l("span", Yv, " Not Paid " + $(L(X)(Math.max(0, b.confirmed_count - v(b) - b.sell_failed_count))) + " (" + $(u(Math.max(0, b.confirmed_count - v(b) - b.sell_failed_count), b.disruption_conversations)) + ") ", 1),
                      l("span", qv, " Finish " + $(L(X)(v(b))) + " (" + $(u(v(b), b.disruption_conversations)) + ") ", 1),
                      (y(!0), x(K, null, tt(b.payment_success_total || [], (k) => (y(), x("span", {
                        key: `${b.date}-${k.currency}`,
                        class: "badge badge-currency"
                      }, $(k.currency) + " " + $(h(k.total_value)), 1))), 128))
                    ])
                  ]),
                  l("td", Uv, [
                    l("div", Kv, [
                      l("span", Xv, " INV " + $(L(X)(b.involuntary_count)) + " (" + $(u(b.involuntary_count, b.disruption_conversations)) + ") ", 1),
                      l("span", Gv, " Human " + $(L(X)(b.involuntary_count - b.accepted_count)) + " (" + $(u(b.involuntary_count - b.accepted_count, b.disruption_conversations)) + ") ", 1),
                      l("span", Zv, " Accept " + $(L(X)(b.accepted_count)) + " (" + $(u(b.accepted_count, b.disruption_conversations)) + ") ", 1)
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          c.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: g[0] || (g[0] = (b) => o.value = !o.value)
          }, [
            xt($(o.value ? "View less" : `View more (${i.value.length - bs} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: q(["view-more-icon", { "view-more-icon-rotated": o.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...g[6] || (g[6] = [
              l("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : I("", !0),
          e.enableExport ? (y(), dt(L(kt), {
            key: 1,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (y(), x("section", Qv, [...g[8] || (g[8] = [
          st('<div class="empty-state-content" data-v-47c8f691><div class="empty-icon-wrapper" data-v-47c8f691><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-47c8f691><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-47c8f691></path></svg></div><p class="empty-title" data-v-47c8f691>No disruption data available</p><p class="empty-description" data-v-47c8f691>No disruption data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), tb = /* @__PURE__ */ nt(Jv, [["__scopeId", "data-v-47c8f691"]]), eb = { class: "faq-metrics-card" }, ab = {
  key: 0,
  class: "card-body"
}, sb = {
  key: 0,
  class: "chart-section"
}, nb = {
  key: 1,
  class: "kpi-grid"
}, ob = { class: "kpi-label-row" }, ib = ["title"], rb = { class: "kpi-value" }, lb = { class: "kpi-secondary" }, cb = {
  key: 2,
  class: "empty-state"
}, db = {
  key: 1,
  class: "loading-state"
}, ub = /* @__PURE__ */ J({
  __name: "FAQ",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const s = e, n = a, o = (f) => {
      n("export", f);
    }, { isDark: i, colors: r } = lt(rt(s, "theme")), c = {
      airline_information: "#8b5cf6",
      booking_info: "#f59e0b",
      flight_status: "#06b6d4"
    }, d = at({ labels: [], datasets: [] }), u = C(() => s.data ?? {
      total_faq_events: 0,
      total_documents_found: 0,
      total_airline_information_retrieved: 0,
      total_booking_info_retrieved: 0,
      total_flight_status_retrieved: 0,
      faq_by_day: []
    }), h = C(() => {
      const f = [
        { name: "airline_information", label: "Airline Info", total: u.value.total_airline_information_retrieved },
        { name: "booking_info", label: "Booking Info", total: u.value.total_booking_info_retrieved },
        { name: "flight_status", label: "Flight Status", total: u.value.total_flight_status_retrieved }
      ], m = f.reduce((_, g) => _ + g.total, 0);
      return m === 0 ? [] : f.map((_) => ({
        ..._,
        percentage: (_.total / m * 100).toFixed(1),
        color: c[_.name] || "#9ca3af"
      }));
    }), p = C(() => ({
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !0,
          position: "top",
          labels: {
            usePointStyle: !0,
            padding: 20,
            font: {
              family: "'DM Sans', sans-serif",
              size: 12
            },
            color: r.value.textSecondary
          }
        },
        tooltip: {
          mode: "index",
          intersect: !1,
          backgroundColor: r.value.tooltipBg,
          titleColor: r.value.tooltipText,
          bodyColor: r.value.textSecondary,
          borderColor: i.value ? "rgba(198, 125, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            family: "'Space Grotesk', sans-serif",
            size: 14,
            weight: 600
          },
          bodyFont: {
            family: "'DM Sans', sans-serif",
            size: 13
          }
        }
      },
      scales: {
        x: {
          display: !0,
          grid: {
            color: r.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 11
            },
            color: r.value.textSecondary
          }
        },
        y: {
          type: "linear",
          display: !0,
          position: "left",
          beginAtZero: !0,
          grid: {
            color: r.value.gridLines
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 11
            },
            color: r.value.textSecondary
          }
        }
      },
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: !1
      }
    })), v = (f) => {
      if (!f) {
        d.value = { labels: [], datasets: [] };
        return;
      }
      const m = f.faq_by_day || [];
      if (m.length > 0) {
        const _ = m.map((w) => Dt(w.date).format("MMM DD")), g = m.map((w) => w.airline_information_retrieved_count || 0), b = m.map((w) => w.flight_status_retrieved_count || 0), k = m.map((w) => w.booking_info_retrieved_count || 0);
        d.value = {
          labels: _,
          datasets: [
            {
              label: "Airline Information",
              data: g,
              borderColor: "#8b5cf6",
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              borderWidth: 2,
              fill: !0,
              tension: 0.4,
              pointBackgroundColor: "#8b5cf6",
              pointBorderColor: "#7c3aed",
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6
            },
            {
              label: "Flight Status",
              data: b,
              borderColor: "#06b6d4",
              backgroundColor: "rgba(6, 182, 212, 0.1)",
              borderWidth: 2,
              fill: !0,
              tension: 0.4,
              pointBackgroundColor: "#06b6d4",
              pointBorderColor: "#0891b2",
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6
            },
            {
              label: "Booking Information",
              data: k,
              borderColor: "#f59e0b",
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              borderWidth: 2,
              fill: !0,
              tension: 0.4,
              pointBackgroundColor: "#f59e0b",
              pointBorderColor: "#d97706",
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6
            }
          ]
        };
      } else
        d.value = { labels: [], datasets: [] };
    };
    return Ft(
      () => s.data,
      (f) => {
        v(f ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: i }), (f, m) => (y(), x("article", eb, [
      m[2] || (m[2] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "FAQ Metrics"),
          l("p", { class: "card-subtitle" }, "FAQ volume by category")
        ])
      ], -1)),
      s.loading ? (y(), x("div", db, [...m[1] || (m[1] = [
        st('<div class="loading-container" data-v-bf0b01c1><div class="chart-bars-loader" data-v-bf0b01c1><div class="bar bar-1" data-v-bf0b01c1></div><div class="bar bar-2" data-v-bf0b01c1></div><div class="bar bar-3" data-v-bf0b01c1></div><div class="bar bar-4" data-v-bf0b01c1></div><div class="bar bar-5" data-v-bf0b01c1></div></div><p class="loading-text" data-v-bf0b01c1>Loading FAQ metrics...</p></div>', 1)
      ])])) : (y(), x("div", ab, [
        d.value.labels && d.value.labels.length ? (y(), x("section", sb, [
          Q(_e, {
            data: d.value,
            options: p.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), dt(L(kt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : I("", !0),
        h.value.length ? (y(), x("div", nb, [
          (y(!0), x(K, null, tt(h.value, (_) => (y(), x("div", {
            class: "kpi-card",
            key: _.name
          }, [
            l("div", ob, [
              l("span", {
                class: "kpi-color-dot",
                style: ft({ backgroundColor: _.color }),
                "aria-hidden": "true"
              }, null, 4),
              l("span", {
                class: "kpi-label",
                title: _.label
              }, $(_.label), 9, ib)
            ]),
            l("span", rb, $(L(X)(_.total)), 1),
            l("span", lb, $(_.percentage) + "%", 1)
          ]))), 128))
        ])) : (y(), x("section", cb, [...m[0] || (m[0] = [
          st('<div class="empty-state-content" data-v-bf0b01c1><div class="empty-icon-wrapper" data-v-bf0b01c1><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-bf0b01c1><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-bf0b01c1></path></svg></div><p class="empty-title" data-v-bf0b01c1>No FAQ data available</p><p class="empty-description" data-v-bf0b01c1>No FAQ consultation data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), hb = /* @__PURE__ */ nt(ub, [["__scopeId", "data-v-bf0b01c1"]]), fb = { class: "messages-per-agent-card" }, gb = {
  key: 0,
  class: "card-body"
}, pb = {
  key: 0,
  class: "chart-section"
}, vb = {
  key: 1,
  class: "kpi-grid"
}, bb = { class: "kpi-label-row" }, mb = ["title"], yb = { class: "kpi-value" }, _b = { class: "kpi-secondary" }, xb = {
  key: 2,
  class: "empty-state"
}, kb = { class: "empty-state-content" }, wb = { class: "empty-icon-wrapper" }, $b = {
  key: 1,
  class: "loading-state"
}, Mb = /* @__PURE__ */ J({
  __name: "MessagesPerAgent",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const s = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, n = e, o = a, i = (p) => {
      o("export", p);
    }, { isDark: r, colors: c } = lt(rt(n, "theme")), d = C(() => {
      const p = n.data?.agents_by_day || {}, v = Object.keys(p).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const f = /* @__PURE__ */ new Set();
      for (const g of Object.values(p))
        for (const b of Object.keys(g))
          f.add(b);
      const _ = Array.from(f).map((g) => {
        const b = s[g] || "#94a3b8";
        return {
          label: g.charAt(0).toUpperCase() + g.slice(1).replace(/_/g, " "),
          data: v.map((k) => p[k]?.[g] || 0),
          borderColor: b,
          backgroundColor: `${b}20`,
          pointBackgroundColor: b,
          pointBorderColor: r.value ? "#1a1a1d" : "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.3,
          fill: !1
        };
      });
      return {
        labels: v.map((g) => Dt(g).format("MMM DD")),
        datasets: _
      };
    }), u = C(() => {
      const p = n.data?.agents_by_day || {}, v = {};
      for (const m of Object.values(p))
        for (const [_, g] of Object.entries(m))
          v[_] = (v[_] || 0) + g;
      const f = Object.values(v).reduce((m, _) => m + _, 0);
      return f === 0 ? [] : Object.entries(v).sort(([, m], [, _]) => _ - m).map(([m, _]) => ({
        name: m,
        label: m.charAt(0).toUpperCase() + m.slice(1).replace(/_/g, " "),
        total: _,
        percentage: (_ / f * 100).toFixed(1),
        color: s[m] || "#94a3b8"
      }));
    }), h = C(() => n.options ? n.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !0,
          position: "top",
          align: "end",
          labels: {
            usePointStyle: !0,
            pointStyle: "circle",
            padding: 20,
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: c.value.textSecondary
          }
        },
        tooltip: {
          mode: "index",
          intersect: !1,
          backgroundColor: c.value.tooltipBg,
          titleColor: c.value.tooltipText,
          bodyColor: c.value.tooltipText,
          borderColor: r.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            family: "'DM Sans', sans-serif",
            size: 13,
            weight: 600
          },
          bodyFont: {
            family: "'DM Sans', sans-serif",
            size: 12,
            weight: 500
          }
        }
      },
      scales: {
        x: {
          display: !0,
          grid: {
            color: c.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 11
            },
            color: c.value.textSecondary
          }
        },
        y: {
          display: !0,
          beginAtZero: !0,
          grid: {
            color: c.value.gridLines
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 11
            },
            color: c.value.textSecondary
          }
        }
      }
    });
    return t({ isDark: r }), (p, v) => (y(), x("article", fb, [
      v[3] || (v[3] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Interactions by Agent"),
          l("p", { class: "card-subtitle" }, "Responses sent by AI agents")
        ])
      ], -1)),
      e.loading ? (y(), x("div", $b, [...v[2] || (v[2] = [
        st('<div class="loading-container" data-v-ed04880d><div class="chart-lines-loader" data-v-ed04880d><div class="line line-1" data-v-ed04880d></div><div class="line line-2" data-v-ed04880d></div><div class="line line-3" data-v-ed04880d></div><div class="line line-4" data-v-ed04880d></div><div class="line line-5" data-v-ed04880d></div></div><p class="loading-text" data-v-ed04880d>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", gb, [
        d.value.labels && d.value.labels.length ? (y(), x("section", pb, [
          Q(_e, {
            data: d.value,
            options: h.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), dt(L(kt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : I("", !0),
        u.value.length ? (y(), x("div", vb, [
          (y(!0), x(K, null, tt(u.value, (f) => (y(), x("div", {
            class: "kpi-card",
            key: f.name
          }, [
            l("div", bb, [
              l("span", {
                class: "kpi-color-dot",
                style: ft({ backgroundColor: f.color }),
                "aria-hidden": "true"
              }, null, 4),
              l("span", {
                class: "kpi-label",
                title: f.label
              }, $(f.label), 9, mb)
            ]),
            l("span", yb, $(f.percentage) + "%", 1),
            l("span", _b, $(L(X)(f.total)) + " msgs", 1)
          ]))), 128))
        ])) : (y(), x("section", xb, [
          l("div", kb, [
            l("div", wb, [
              Q(L(zt), { class: "empty-icon" })
            ]),
            v[0] || (v[0] = l("p", { class: "empty-title" }, "No agent interactions data", -1)),
            v[1] || (v[1] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Sb = /* @__PURE__ */ nt(Mb, [["__scopeId", "data-v-ed04880d"]]), Cb = { class: "record-locator-card" }, Db = {
  key: 0,
  class: "loading-state"
}, Ab = {
  key: 1,
  class: "card-body"
}, Tb = {
  key: 0,
  class: "chart-section"
}, Bb = { class: "chart-wrapper" }, Lb = {
  key: 1,
  class: "table-section"
}, Fb = { class: "table-wrapper" }, Pb = { class: "data-table" }, Ib = { class: "table-header-row" }, Rb = {
  key: 0,
  class: "table-header"
}, Eb = {
  key: 1,
  class: "table-header"
}, Ob = { class: "table-body" }, zb = { class: "table-cell font-medium" }, Vb = { class: "table-cell text-center" }, Nb = { class: "table-cell text-center" }, Wb = { class: "table-cell text-center" }, Hb = { class: "table-cell text-center" }, jb = { class: "table-cell text-center success-value" }, Yb = { class: "table-cell text-center failed-value" }, qb = { class: "table-cell text-center warning-value" }, Ub = {
  key: 0,
  class: "table-cell text-center"
}, Kb = {
  key: 1,
  class: "table-cell text-center failed-value"
}, Xb = {
  key: 2,
  class: "empty-state"
}, ms = 3, Gb = /* @__PURE__ */ J({
  __name: "RecordLocator",
  props: {
    data: { default: () => ({
      total_checkin_initiated: 0,
      total_record_locator_init: 0,
      total_record_locator_started: 0,
      total_record_locator_completed: 0,
      total_record_locator_closed: 0,
      total_record_locator_failed: 0,
      total_record_locator_abandoned: 0,
      total_record_locator_init_abandoned: 0,
      total_record_locator_init_abandoned_error: null,
      total_record_locator_init_abandoned_voluntary: null,
      total_checkin_pre_init_abandoned_error: null,
      total_checkin_pre_init_abandoned_voluntary: null,
      record_locator_by_day: []
    }) },
    loading: { type: Boolean, default: !1 },
    isAvianca: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const s = e, n = a, o = (_) => {
      n("export", _);
    }, { isDark: i } = lt(rt(s, "theme")), r = at(!1), c = C(() => s.data?.record_locator_by_day ? [...s.data.record_locator_by_day].sort(
      (_, g) => new Date(_.date).getTime() - new Date(g.date).getTime()
    ) : []), d = C(() => r.value ? c.value : c.value.slice(0, ms)), u = C(() => c.value.length > ms), h = C(() => s.data), p = C(() => ({
      // Main flow progression - from blue to cyan to green
      "Checkin Init": "#93C5FD",
      // Blue for started state
      "Booking retrive": "#67E8F9",
      // Light cyan
      "Checkin Started": "#22D3EE",
      // Medium cyan
      "Checkin Completed": "#A7F3D0",
      // Light green
      "Checkin Closed": "#7BE39E",
      // Green for success
      // Abandoned states
      "Abandoned (Init)": "#FACC15",
      "Booking not retreived": "#F87171",
      "Abandoned (Started)": "#FACC15",
      Error: "#F87171",
      "Abandoned (Flow)": "#FACC15",
      // Failed states
      "Checkin Failed": "#F87171"
      // Medium red for main failed node
    })), v = (_, g) => !g || g === 0 ? "0%" : `${Math.round(_ / g * 100)}%`, f = (_, g) => {
      const b = X(_), k = v(_, g);
      return `${b} (${k})`;
    }, m = C(() => {
      const _ = [], g = [], b = /* @__PURE__ */ new Set(), k = (U) => {
        b.has(U) || (_.push({ name: U }), b.add(U));
      };
      if (!h.value.total_checkin_initiated)
        return { nodes: _, links: g };
      k("Checkin Init"), k("Booking retrive"), k("Checkin Started"), k("Checkin Completed"), k("Checkin Closed");
      const w = h.value.total_checkin_initiated, M = h.value.total_record_locator_init, S = h.value.total_record_locator_started, D = h.value.total_record_locator_completed, A = h.value.total_record_locator_closed, T = h.value.total_record_locator_failed, B = h.value.total_record_locator_abandoned, F = h.value.total_record_locator_init_abandoned, E = h.value.total_checkin_pre_init_abandoned_error, N = h.value.total_checkin_pre_init_abandoned_voluntary, Y = E != null || N != null, P = Y ? Math.max(Number(E) || 0, 0) : 0, z = Y ? Math.max(Number(N) || 0, 0) : 0, j = h.value.total_record_locator_init_abandoned_error, O = h.value.total_record_locator_init_abandoned_voluntary, V = j != null || O != null, H = V ? Math.max(Number(j) || 0, 0) : 0, et = V ? Math.max(Number(O) || 0, 0) : 0;
      if (M > 0) {
        const U = Math.round(M / w * 100);
        g.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: M,
          label: `${M.toLocaleString()} (${U}%)`
        });
      }
      const Z = w - M;
      if (Y) {
        if (z > 0) {
          const U = Math.round(z / w * 100);
          k("Abandoned (Init)"), g.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: z,
            label: `${z.toLocaleString()} (${U}%)`
          });
        }
        if (P > 0) {
          const U = Math.round(P / w * 100);
          k("Booking not retreived"), g.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: P,
            label: `${P.toLocaleString()} (${U}%)`
          });
        }
      } else if (Z > 0) {
        const U = Math.round(Z / w * 100);
        k("Abandoned (Init)"), g.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: Z,
          label: `${Z.toLocaleString()} (${U}%)`
        });
      }
      if (S > 0) {
        const U = Math.round(S / w * 100);
        g.push({
          source: "Booking retrive",
          target: "Checkin Started",
          value: S,
          label: `${S.toLocaleString()} (${U}%)`
        });
      }
      if (V) {
        if (H > 0) {
          const U = Math.round(H / w * 100);
          k("Error"), g.push({
            source: "Booking retrive",
            target: "Error",
            value: H,
            label: `${H.toLocaleString()} (${U}%)`
          });
        }
        if (et > 0) {
          const U = Math.round(et / w * 100);
          k("Abandoned (Started)"), g.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: et,
            label: `${et.toLocaleString()} (${U}%)`
          });
        }
      } else if (F > 0) {
        const U = Math.round(F / w * 100);
        k("Abandoned (Started)"), g.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: F,
          label: `${F.toLocaleString()} (${U}%)`
        });
      }
      if (D > 0) {
        const U = Math.round(D / S * 100);
        g.push({
          source: "Checkin Started",
          target: "Checkin Completed",
          value: D,
          label: `${D.toLocaleString()} (${U}%)`
        });
      }
      if (A > 0) {
        const U = Math.round(A / S * 100);
        g.push({
          source: "Checkin Completed",
          target: "Checkin Closed",
          value: A,
          label: `${A.toLocaleString()} (${U}%)`
        });
      }
      if (T > 0) {
        const U = Math.round(T / S * 100);
        k("Checkin Failed"), g.push({
          source: "Checkin Started",
          target: "Checkin Failed",
          value: T,
          label: `${T.toLocaleString()} (${U}%)`
        });
      }
      if (B > 0) {
        const U = Math.round(B / S * 100);
        k("Abandoned (Flow)"), g.push({
          source: "Checkin Started",
          target: "Abandoned (Flow)",
          value: B,
          label: `${B.toLocaleString()} (${U}%)`
        });
      }
      return { nodes: _, links: g };
    });
    return t({ isDark: i }), (_, g) => (y(), x("article", Cb, [
      g[12] || (g[12] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Checkin by Record Locator Metrics"),
          l("p", { class: "card-subtitle" }, "Checkin by record locator retrieval and completion analysis")
        ])
      ], -1)),
      s.loading ? (y(), x("div", Db, [...g[1] || (g[1] = [
        st('<div class="loading-container" data-v-e48cea55><div class="chart-flow-loader" data-v-e48cea55><div class="flow-line flow-1" data-v-e48cea55></div><div class="flow-line flow-2" data-v-e48cea55></div><div class="flow-line flow-3" data-v-e48cea55></div><div class="flow-line flow-4" data-v-e48cea55></div><div class="flow-line flow-5" data-v-e48cea55></div></div><p class="loading-text" data-v-e48cea55>Loading record locator data...</p></div>', 1)
      ])])) : (y(), x("div", Ab, [
        m.value.nodes.length > 0 ? (y(), x("section", Tb, [
          l("div", Bb, [
            Q(xe, {
              data: m.value,
              height: "500px",
              "node-colors": p.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : I("", !0),
        c.value && c.value.length > 0 ? (y(), x("section", Lb, [
          l("div", Fb, [
            l("table", Pb, [
              l("thead", null, [
                l("tr", Ib, [
                  g[2] || (g[2] = l("th", { class: "table-header" }, "Date", -1)),
                  g[3] || (g[3] = l("th", { class: "table-header" }, "Checkin Init", -1)),
                  g[4] || (g[4] = l("th", { class: "table-header" }, "Booking Retrieve (%)", -1)),
                  g[5] || (g[5] = l("th", { class: "table-header" }, "Checkin Started", -1)),
                  g[6] || (g[6] = l("th", { class: "table-header" }, "Checkin Completed (%)", -1)),
                  g[7] || (g[7] = l("th", { class: "table-header" }, "Checkin Closed (%)", -1)),
                  g[8] || (g[8] = l("th", { class: "table-header" }, "Checkin Failed (%)", -1)),
                  g[9] || (g[9] = l("th", { class: "table-header" }, "Abandoned (%)", -1)),
                  s.isAvianca ? (y(), x("th", Rb, "Create Payment")) : I("", !0),
                  s.isAvianca ? (y(), x("th", Eb, "Failed Payment")) : I("", !0)
                ])
              ]),
              l("tbody", Ob, [
                (y(!0), x(K, null, tt(d.value, (b) => (y(), x("tr", {
                  key: b.date,
                  class: "table-row"
                }, [
                  l("td", zb, $(L(Dt)(b.date).format("DD/MM/YYYY")), 1),
                  l("td", Vb, $(L(X)(b.checkin_initiated)), 1),
                  l("td", Nb, $(f(b.record_locator_init_count, b.checkin_initiated)), 1),
                  l("td", Wb, $(L(X)(b.record_locator_started_count)), 1),
                  l("td", Hb, $(f(b.record_locator_completed_count, b.record_locator_started_count)), 1),
                  l("td", jb, $(f(b.record_locator_closed_count, b.record_locator_started_count)), 1),
                  l("td", Yb, $(f(b.record_locator_failed_count, b.record_locator_started_count)), 1),
                  l("td", qb, $(f(b.record_locator_abandoned_count, b.record_locator_started_count)), 1),
                  s.isAvianca ? (y(), x("td", Ub, $(L(X)(b.record_locator_create_payment_count)), 1)) : I("", !0),
                  s.isAvianca ? (y(), x("td", Kb, $(L(X)(b.record_locator_create_payment_failed_count)), 1)) : I("", !0)
                ]))), 128))
              ])
            ])
          ]),
          u.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: g[0] || (g[0] = (b) => r.value = !r.value)
          }, [
            xt($(r.value ? "View less" : `View more (${c.value.length - ms} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: q(["view-more-icon", { "view-more-icon-rotated": r.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...g[10] || (g[10] = [
              l("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : I("", !0),
          e.enableExport ? (y(), dt(L(kt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (y(), x("section", Xb, [...g[11] || (g[11] = [
          st('<div class="empty-state-content" data-v-e48cea55><div class="empty-icon-wrapper" data-v-e48cea55><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e48cea55><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" data-v-e48cea55></path></svg></div><p class="empty-title" data-v-e48cea55>No record locator data available</p><p class="empty-description" data-v-e48cea55>No record locator data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Zb = /* @__PURE__ */ nt(Gb, [["__scopeId", "data-v-e48cea55"]]), Qb = { class: "sales-channel-card" }, Jb = {
  key: 0,
  class: "loading-state"
}, tm = {
  key: 1,
  class: "card-body"
}, em = {
  key: 0,
  class: "chart-section"
}, am = { class: "chart-wrapper" }, sm = {
  key: 1,
  class: "empty-state"
}, nm = {
  key: 2,
  class: "comparison-section"
}, om = { class: "comparison-grid" }, im = { class: "comparison-content" }, rm = { class: "comparison-channel" }, lm = { class: "comparison-value" }, cm = {
  key: 0,
  class: "comparison-delta"
}, dm = {
  key: 0,
  class: "delta-icon",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, um = {
  key: 1,
  class: "delta-icon",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, hm = { class: "delta-label" }, fm = {
  key: 1,
  class: "comparison-delta"
}, gm = /* @__PURE__ */ J({
  __name: "SalesByChannel",
  props: {
    data: { default: () => ({
      total_sell_success: 0,
      total_by_currency: [],
      sales_by_channel_by_day: []
    }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 },
    channelComparison: { default: () => [] }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const s = {
      wsp: "#6DD4A1",
      whatsapp: "#6DD4A1",
      voice: "#7BA3E8",
      sms: "#F5C26B",
      web_chat: "#85D0E8",
      email: "#F28B8B",
      messenger: "#8BB5F2",
      telegram: "#7DC8E8",
      instagram: "#F29BC4",
      webchat: "#85D0E8",
      web: "#C9A0F2"
    }, n = ["#B0C4DE", "#C9A0F2", "#F5C26B", "#8BE8B0", "#F2A07A", "#7BA3E8"], o = e, i = a, r = (p) => {
      i("export", p);
    }, { isDark: c } = lt(rt(o, "theme"));
    C(() => o.data?.total_sell_success ?? 0);
    const d = C(() => {
      const p = /* @__PURE__ */ new Set();
      for (const v of o.data?.sales_by_channel_by_day ?? [])
        for (const f of Object.keys(v.channels))
          p.add(f);
      return Array.from(p).sort();
    }), u = (p, v) => s[p.toLowerCase()] ?? n[v % n.length], h = C(() => {
      const p = o.data?.sales_by_channel_by_day ?? [];
      if (p.length === 0) return { labels: [], datasets: [] };
      const v = p.map((m) => Dt(m.date).format("MMM-DD")), f = d.value.map((m, _) => ({
        label: m,
        data: p.map((g) => g.channels[m] ?? 0),
        backgroundColor: u(m, _),
        borderRadius: 4
      }));
      return { labels: v, datasets: f };
    });
    return t({ isDark: c }), (p, v) => (y(), x("article", Qb, [
      v[5] || (v[5] = st('<header class="card-header" data-v-8b96a431><div class="header-content" data-v-8b96a431><div class="title-section" data-v-8b96a431><h3 class="card-title" data-v-8b96a431>Sales by Channel</h3><p class="card-subtitle" data-v-8b96a431>Successful sales breakdown by communication channel</p></div></div></header>', 1)),
      o.loading ? (y(), x("div", Jb, [...v[0] || (v[0] = [
        st('<div class="loading-container" data-v-8b96a431><div class="chart-bars-loader" data-v-8b96a431><div class="bar bar-1" data-v-8b96a431></div><div class="bar bar-2" data-v-8b96a431></div><div class="bar bar-3" data-v-8b96a431></div><div class="bar bar-4" data-v-8b96a431></div><div class="bar bar-5" data-v-8b96a431></div></div><p class="loading-text" data-v-8b96a431>Loading sales data...</p></div>', 1)
      ])])) : (y(), x("div", tm, [
        h.value.labels.length > 0 ? (y(), x("section", em, [
          l("div", am, [
            Q(le, {
              data: h.value,
              stacked: !0
            }, null, 8, ["data"])
          ]),
          e.enableExport ? (y(), dt(L(kt), {
            key: 0,
            onExport: r,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (y(), x("section", sm, [...v[1] || (v[1] = [
          st('<div class="empty-state-content" data-v-8b96a431><div class="empty-icon-wrapper" data-v-8b96a431><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-8b96a431><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-8b96a431></path></svg></div><p class="empty-title" data-v-8b96a431>No sales data available</p><p class="empty-description" data-v-8b96a431>No sales by channel data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])])),
        e.channelComparison.length > 0 ? (y(), x("section", nm, [
          l("div", om, [
            (y(!0), x(K, null, tt(e.channelComparison, (f) => (y(), x("div", {
              key: f.channel,
              class: "comparison-card"
            }, [
              l("div", {
                class: "comparison-color-bar",
                style: ft({ backgroundColor: u(f.channel, e.channelComparison.indexOf(f)) })
              }, null, 4),
              l("div", im, [
                l("span", rm, $(f.channel), 1),
                l("span", lm, $(L(X)(f.current)), 1),
                f.delta !== null ? (y(), x("div", cm, [
                  l("span", {
                    class: q(["delta-badge", f.delta > 0 ? "delta-up" : f.delta < 0 ? "delta-down" : "delta-neutral"])
                  }, [
                    f.delta > 0 ? (y(), x("svg", dm, [...v[2] || (v[2] = [
                      l("path", {
                        "fill-rule": "evenodd",
                        d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
                        "clip-rule": "evenodd"
                      }, null, -1)
                    ])])) : f.delta < 0 ? (y(), x("svg", um, [...v[3] || (v[3] = [
                      l("path", {
                        "fill-rule": "evenodd",
                        d: "M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z",
                        "clip-rule": "evenodd"
                      }, null, -1)
                    ])])) : I("", !0),
                    xt(" " + $(Math.abs(f.delta).toFixed(1)) + "% ", 1)
                  ], 2),
                  l("span", hm, "vs prev. period (" + $(L(X)(f.previous)) + ")", 1)
                ])) : (y(), x("div", fm, [...v[4] || (v[4] = [
                  l("span", { class: "delta-label" }, "No previous data", -1)
                ])]))
              ])
            ]))), 128))
          ])
        ])) : I("", !0)
      ]))
    ]));
  }
}), pm = /* @__PURE__ */ nt(gm, [["__scopeId", "data-v-8b96a431"]]), vm = { class: "seller-metrics-card" }, bm = { class: "card-header" }, mm = { class: "header-content" }, ym = { class: "header-badges" }, _m = {
  key: 0,
  class: "payment-success-badge"
}, xm = {
  key: 0,
  class: "currency-breakdown-list"
}, km = {
  key: 1,
  class: "badge-value"
}, wm = {
  key: 1,
  class: "payment-warning-badge"
}, $m = { class: "currency-breakdown-list" }, Mm = {
  key: 2,
  class: "payment-warning-badge"
}, Sm = { class: "currency-breakdown-list" }, Cm = {
  key: 0,
  class: "loading-state"
}, Dm = {
  key: 1,
  class: "card-body"
}, Am = {
  key: 0,
  class: "chart-section"
}, Tm = { class: "chart-wrapper" }, Bm = {
  key: 1,
  class: "empty-state"
}, Lm = {
  key: 2,
  class: "table-section"
}, Fm = { class: "table-wrapper" }, Pm = { class: "data-table" }, Im = { class: "table-body" }, Rm = { class: "table-cell font-medium" }, Em = { class: "table-cell text-center" }, Om = { class: "table-cell text-center" }, zm = { class: "table-cell text-center" }, Vm = { class: "table-cell text-center" }, Nm = { class: "table-cell text-center" }, Wm = { class: "table-cell text-center warning-value" }, Hm = {
  key: 0,
  class: "currency-cell-list"
}, jm = {
  key: 1,
  class: "empty-cell"
}, Ym = { class: "table-cell text-center" }, qm = { class: "table-cell text-center warning-value" }, Um = {
  key: 0,
  class: "currency-cell-list"
}, Km = {
  key: 1,
  class: "empty-cell"
}, Xm = { class: "table-cell text-center" }, Gm = { class: "table-cell text-center success-value" }, Zm = {
  key: 0,
  class: "currency-cell-list"
}, Qm = { key: 1 }, Jm = { class: "table-cell text-left" }, t1 = {
  key: 0,
  class: "failed-reasons"
}, e1 = { class: "reason-name" }, a1 = { class: "reason-count" }, s1 = {
  key: 1,
  class: "empty-cell"
}, ys = 3, n1 = /* @__PURE__ */ J({
  __name: "Seller",
  props: {
    sellerData: { default: () => ({
      total_seller_conversations: 0,
      total_sell_started: 0,
      total_sell_get_quote: 0,
      total_sell_booking_created: 0,
      total_sell_success: 0,
      total_sell_bank_transfer: 0,
      total_sell_cash_option: 0,
      total_value_sell_success: 0,
      total_value_sell_bank_transfer: [],
      total_value_sell_cash_option: [],
      seller_by_day: []
    }) },
    failedData: { default: () => ({
      total_sell_failed: 0,
      failed_by_reason_by_day: []
    }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const s = e, n = a, o = (D) => {
      n("export", D);
    }, { isDark: i } = lt(rt(s, "theme")), r = at(!1), c = C(() => {
      if (!s.sellerData?.seller_by_day) return [];
      const D = [...s.sellerData.seller_by_day];
      return s.failedData?.failed_by_reason_by_day && s.failedData.failed_by_reason_by_day.forEach((A) => {
        const T = D.findIndex((B) => B.date === A.date);
        T !== -1 ? D[T] = { ...D[T], reasons: A.reasons } : D.push({
          date: A.date,
          seller_conversations: 0,
          sell_started_count: 0,
          sell_get_quote_count: 0,
          sell_booking_created_count: 0,
          sell_success_count: 0,
          sell_bank_transfer_count: 0,
          sell_cash_option_count: 0,
          daily_value_sell_success: 0,
          daily_value_sell_bank_transfer: [],
          daily_value_sell_cash_option: [],
          reasons: A.reasons
        });
      }), D.sort((A, T) => new Date(A.date).getTime() - new Date(T.date).getTime());
    }), d = C(() => r.value ? c.value : c.value.slice(0, ys)), u = C(() => c.value.length > ys), h = C(() => s.sellerData), p = C(() => s.failedData), v = C(
      () => Array.isArray(s.sellerData.total_value_sell_success) ? s.sellerData.total_value_sell_success : []
    ), f = C(
      () => Array.isArray(s.sellerData.total_value_sell_bank_transfer) ? s.sellerData.total_value_sell_bank_transfer : []
    ), m = C(
      () => Array.isArray(s.sellerData.total_value_sell_cash_option) ? s.sellerData.total_value_sell_cash_option : []
    ), _ = C(() => {
      const {
        total_seller_conversations: D = 0,
        total_sell_started: A = 0,
        total_sell_booking_created: T = 0,
        total_sell_success: B = 0,
        total_sell_bank_transfer: F = 0,
        total_sell_cash_option: E = 0
      } = h.value, { failed_by_reason_by_day: N = [] } = p.value;
      if (D === 0) return { nodes: [], links: [] };
      const Y = [
        { name: "Sell Initiated", value: D },
        { name: "Sell Started", value: A },
        { name: "Booking Created", value: T },
        { name: "Sell Success", value: B }
      ], P = [], z = D - A;
      if (z > 0) {
        const H = Math.round(z / D * 100);
        Y.push({ name: "Abandoned (Init)", value: z }), P.push({
          source: "Sell Initiated",
          target: "Abandoned (Init)",
          value: z,
          label: `${z.toLocaleString()} (${H}%)`
        });
      }
      if (A > 0) {
        const H = Math.round(A / D * 100);
        P.push({
          source: "Sell Initiated",
          target: "Sell Started",
          value: A,
          label: `${A.toLocaleString()} (${H}%)`
        });
      }
      const j = N.reduce((H, et) => (et.reasons && Array.isArray(et.reasons) && et.reasons.forEach((Z) => {
        const U = Z.reason, ot = Z.failed_count;
        H[U] = (H[U] || 0) + ot;
      }), H), {});
      if (T > 0) {
        const H = Math.round(T / D * 100);
        P.push({
          source: "Sell Started",
          target: "Booking Created",
          value: T,
          label: `${T.toLocaleString()} (${H}%)`
        });
      }
      if (F > 0) {
        const H = Math.round(F / D * 100);
        Y.push({ name: "Bank Transfer", value: F }), P.push({
          source: "Booking Created",
          target: "Bank Transfer",
          value: F,
          label: `${F.toLocaleString()} (${H}%)`
        });
      }
      if (E > 0) {
        const H = Math.round(E / D * 100);
        Y.push({ name: "Cash Option", value: E }), P.push({
          source: "Booking Created",
          target: "Cash Option",
          value: E,
          label: `${E.toLocaleString()} (${H}%)`
        });
      }
      if (B > 0) {
        const H = Math.round(B / D * 100);
        P.push({
          source: "Booking Created",
          target: "Sell Success",
          value: B,
          label: `${B.toLocaleString()} (${H}%)`
        });
      }
      const O = T - B - F - E;
      if (O > 0) {
        const H = Math.round(O / D * 100);
        Y.push({ name: "Failed at Completion", value: O }), P.push({
          source: "Booking Created",
          target: "Failed at Completion",
          value: O,
          label: `${O.toLocaleString()} (${H}%)`
        });
      }
      const V = A - T;
      if (V > 0) {
        const H = Math.round(V / D * 100);
        Y.push({ name: "Failed at Booking", value: V }), P.push({
          source: "Sell Started",
          target: "Failed at Booking",
          value: V,
          label: `${V.toLocaleString()} (${H}%)`
        });
      }
      if (Object.keys(j).length > 0) {
        const H = Object.values(j).reduce((Z, U) => Z + U, 0), et = V - H;
        if (Object.entries(j).filter(([, Z]) => Z > 0).sort(([, Z], [, U]) => U - Z).forEach(([Z, U]) => {
          const ot = Math.round(U / D * 100);
          Y.push({ name: `Failed: ${Z}`, value: U }), P.push({
            source: "Failed at Booking",
            target: `Failed: ${Z}`,
            value: U,
            label: `${U.toLocaleString()} (${ot}%)`
          });
        }), et > 0) {
          const Z = Math.round(et / D * 100);
          Y.push({ name: "Failed: Without Reason", value: et }), P.push({
            source: "Failed at Booking",
            target: "Failed: Without Reason",
            value: et,
            label: `${et.toLocaleString()} (${Z}%)`
          });
        }
      }
      return { nodes: Y, links: P };
    }), g = {
      "Sell Initiated": "#DBEAFE",
      "Abandoned (Init)": "#FEE2E2",
      "Sell Started": "#93C5FD",
      "Get Quote": "#C7D2FE",
      "Booking Created": "#8B8CF6",
      "Bank Transfer": "#fde68a",
      "Cash Option": "#fde68a",
      "Other Payment": "#818CF8",
      "Sell Success": "#7BE39E",
      "Sell Failed": "#FCA5A5",
      "Failed at Quote": "#FCA5A5",
      "Failed at Booking": "#F87171",
      "Failed at Completion": "#EF4444",
      "Failed: rejected": "#F87171",
      "Failed: payment_processing": "#EF4444",
      "Failed: seat_selection": "#F87171",
      "Failed: booking_validation": "#EF4444",
      "Failed: flight_availability": "#DC2626",
      "Failed: passenger_data": "#F87171",
      "Failed: system_error": "#DC2626",
      "Failed: timeout": "#EF4444",
      "Failed: Without Reason": "#F87171"
    }, b = C(() => g), k = (D, A) => !A || A === 0 ? "0%" : `${Math.round(D / A * 100)}%`, w = (D, A) => {
      const T = X(D), B = k(D, A);
      return `${T} (${B})`;
    }, M = (D) => D == null ? 0 : typeof D == "number" ? D : Array.isArray(D) ? D.reduce((A, T) => A + (T.total_value || 0), 0) : 0, S = (D) => Qt(M(D));
    return t({ isDark: i }), (D, A) => (y(), x("article", vm, [
      l("header", bm, [
        l("div", mm, [
          A[4] || (A[4] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "Seller Metrics"),
            l("p", { class: "card-subtitle" }, "Sales performance and failure analysis")
          ], -1)),
          l("div", ym, [
            s.loading ? I("", !0) : (y(), x("div", _m, [
              A[1] || (A[1] = l("p", { class: "badge-label" }, "Total Sales Value", -1)),
              v.value.length > 0 ? (y(), x("div", xm, [
                (y(!0), x(K, null, tt(v.value, (T) => (y(), x("p", {
                  key: T.currency,
                  class: "currency-breakdown-item"
                }, $(T.currency) + " " + $(L(Qt)(T.total_value)), 1))), 128))
              ])) : (y(), x("p", km, $(S(s.sellerData.total_value_sell_success)), 1))
            ])),
            !s.loading && f.value.length > 0 ? (y(), x("div", wm, [
              A[2] || (A[2] = l("p", { class: "badge-label-warning" }, "Bank Transfer Value", -1)),
              l("div", $m, [
                (y(!0), x(K, null, tt(f.value, (T) => (y(), x("p", {
                  key: "bt-" + T.currency,
                  class: "currency-breakdown-item-warning"
                }, $(T.currency) + " " + $(L(Qt)(T.total_value)), 1))), 128))
              ])
            ])) : I("", !0),
            !s.loading && m.value.length > 0 ? (y(), x("div", Mm, [
              A[3] || (A[3] = l("p", { class: "badge-label-warning" }, "Cash Option Value", -1)),
              l("div", Sm, [
                (y(!0), x(K, null, tt(m.value, (T) => (y(), x("p", {
                  key: "co-" + T.currency,
                  class: "currency-breakdown-item-warning"
                }, $(T.currency) + " " + $(L(Qt)(T.total_value)), 1))), 128))
              ])
            ])) : I("", !0)
          ])
        ])
      ]),
      s.loading ? (y(), x("div", Cm, [...A[5] || (A[5] = [
        st('<div class="loading-container" data-v-301db2b6><div class="chart-flow-loader" data-v-301db2b6><div class="flow-line flow-1" data-v-301db2b6></div><div class="flow-line flow-2" data-v-301db2b6></div><div class="flow-line flow-3" data-v-301db2b6></div><div class="flow-line flow-4" data-v-301db2b6></div><div class="flow-line flow-5" data-v-301db2b6></div></div><p class="loading-text" data-v-301db2b6>Loading sales data...</p></div>', 1)
      ])])) : (y(), x("div", Dm, [
        _.value.nodes.length > 0 ? (y(), x("section", Am, [
          l("div", Tm, [
            Q(xe, {
              data: _.value,
              "node-colors": b.value,
              title: "",
              height: "320px"
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : (y(), x("section", Bm, [...A[6] || (A[6] = [
          st('<div class="empty-state-content" data-v-301db2b6><div class="empty-icon-wrapper" data-v-301db2b6><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-301db2b6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-301db2b6></path></svg></div><p class="empty-title" data-v-301db2b6>No sales data available</p><p class="empty-description" data-v-301db2b6>No sales data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])])),
        c.value && c.value.length > 0 ? (y(), x("section", Lm, [
          l("div", Fm, [
            l("table", Pm, [
              A[7] || (A[7] = l("thead", null, [
                l("tr", { class: "table-header-row" }, [
                  l("th", { class: "table-header" }, "Date"),
                  l("th", { class: "table-header" }, "Sell Initiated"),
                  l("th", { class: "table-header" }, "Sell Started"),
                  l("th", { class: "table-header" }, "Get Quote"),
                  l("th", { class: "table-header" }, "Booking Created"),
                  l("th", { class: "table-header" }, "Bank Transfer"),
                  l("th", { class: "table-header" }, "BT Value"),
                  l("th", { class: "table-header" }, "Cash Option"),
                  l("th", { class: "table-header" }, "CO Value"),
                  l("th", { class: "table-header" }, "Sell Success"),
                  l("th", { class: "table-header" }, "Total Sales Value"),
                  l("th", { class: "table-header" }, "Failed")
                ])
              ], -1)),
              l("tbody", Im, [
                (y(!0), x(K, null, tt(d.value, (T) => (y(), x("tr", {
                  key: T.date,
                  class: "table-row"
                }, [
                  l("td", Rm, $(L(Dt)(T.date).format("DD/MM/YYYY")), 1),
                  l("td", Em, $(L(X)(T.seller_conversations || 0)), 1),
                  l("td", Om, $(w(T.sell_started_count, T.seller_conversations || T.sell_started_count)), 1),
                  l("td", zm, $(w(T.sell_get_quote_count, T.seller_conversations || T.sell_started_count)), 1),
                  l("td", Vm, $(w(T.sell_booking_created_count, T.seller_conversations || T.sell_started_count)), 1),
                  l("td", Nm, $(L(X)(T.sell_bank_transfer_count || 0)), 1),
                  l("td", Wm, [
                    Array.isArray(T.daily_value_sell_bank_transfer) && T.daily_value_sell_bank_transfer.length > 0 ? (y(), x("div", Hm, [
                      (y(!0), x(K, null, tt(T.daily_value_sell_bank_transfer, (B) => (y(), x("span", {
                        key: `${T.date}-bt-${B.currency}`
                      }, $(B.currency) + " " + $(L(Qt)(B.total_value)), 1))), 128))
                    ])) : (y(), x("span", jm, "-"))
                  ]),
                  l("td", Ym, $(L(X)(T.sell_cash_option_count || 0)), 1),
                  l("td", qm, [
                    Array.isArray(T.daily_value_sell_cash_option) && T.daily_value_sell_cash_option.length > 0 ? (y(), x("div", Um, [
                      (y(!0), x(K, null, tt(T.daily_value_sell_cash_option, (B) => (y(), x("span", {
                        key: `${T.date}-co-${B.currency}`
                      }, $(B.currency) + " " + $(L(Qt)(B.total_value)), 1))), 128))
                    ])) : (y(), x("span", Km, "-"))
                  ]),
                  l("td", Xm, $(w(T.sell_success_count, T.seller_conversations || T.sell_started_count)), 1),
                  l("td", Gm, [
                    Array.isArray(T.daily_value_sell_success) && T.daily_value_sell_success.length > 0 ? (y(), x("div", Zm, [
                      (y(!0), x(K, null, tt(T.daily_value_sell_success, (B) => (y(), x("span", {
                        key: `${T.date}-${B.currency}`
                      }, $(B.currency) + " " + $(L(Qt)(B.total_value)), 1))), 128))
                    ])) : (y(), x("span", Qm, $(S(T.daily_value_sell_success)), 1))
                  ]),
                  l("td", Jm, [
                    T.reasons && T.reasons.length > 0 ? (y(), x("div", t1, [
                      (y(!0), x(K, null, tt(T.reasons, (B) => (y(), x("div", {
                        key: B.reason,
                        class: "failed-reason-item"
                      }, [
                        l("span", e1, $(B.reason) + ":", 1),
                        l("span", a1, $(B.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", s1, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          u.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: A[0] || (A[0] = (T) => r.value = !r.value)
          }, [
            xt($(r.value ? "View less" : `View more (${c.value.length - ys} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: q(["view-more-icon", { "view-more-icon-rotated": r.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...A[8] || (A[8] = [
              l("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : I("", !0),
          e.enableExport ? (y(), dt(L(kt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : I("", !0)
      ]))
    ]));
  }
}), o1 = /* @__PURE__ */ nt(n1, [["__scopeId", "data-v-301db2b6"]]), i1 = { class: "top-agents-card" }, r1 = {
  key: 0,
  class: "card-body"
}, l1 = {
  key: 0,
  class: "chart-section"
}, c1 = {
  key: 1,
  class: "empty-state"
}, d1 = { class: "empty-state-content" }, u1 = { class: "empty-icon-wrapper" }, h1 = {
  key: 1,
  class: "loading-state"
}, f1 = /* @__PURE__ */ J({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const s = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, n = e, o = a, i = (h) => {
      o("export", h);
    }, { isDark: r, colors: c } = lt(rt(n, "theme")), d = C(() => {
      const p = (n.data?.top_agents || []).filter(
        (_) => _.agent_type?.toLowerCase() !== "triage"
      );
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const v = p.reduce(
        (_, g) => _ + (Number(g.conversations) || 0),
        0
      ), f = p.map((_) => {
        const g = _.agent_type?.toLowerCase();
        return s[g] || "#94a3b8";
      }), m = f.map((_) => `${_}80`);
      return {
        labels: p.map((_) => {
          const g = Number(_.conversations) || 0, b = v ? g / v * 100 : 0;
          return `${_.agent_type} - ${g.toLocaleString()} (${b.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: p.map((_) => _.conversations),
            backgroundColor: m,
            borderColor: f,
            borderWidth: 2
          }
        ]
      };
    }), u = C(() => n.options ? n.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: !0,
            padding: 20,
            font: {
              family: "'DM Sans', sans-serif",
              size: 13,
              weight: 500
            },
            color: c.value.textSecondary
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: c.value.tooltipBg,
          titleColor: c.value.tooltipText,
          bodyColor: c.value.tooltipText,
          borderColor: r.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            family: "'DM Sans', sans-serif",
            size: 13,
            weight: 600
          },
          bodyFont: {
            family: "'DM Sans', sans-serif",
            size: 12,
            weight: 500
          },
          callbacks: {
            label: (h) => {
              const p = (h.label || "").toString().split(" - ")[0], v = Number(h.parsed) || 0, f = (h.dataset.data || []).reduce(
                (_, g) => _ + (Number(g) || 0),
                0
              ), m = f ? v / f * 100 : 0;
              return `${p}: ${v.toLocaleString()} (${m.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: r }), (h, p) => (y(), x("article", i1, [
      p[3] || (p[3] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Top Agents"),
          l("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", h1, [...p[2] || (p[2] = [
        st('<div class="loading-container" data-v-501bf4c4><div class="chart-lines-loader" data-v-501bf4c4><div class="line line-1" data-v-501bf4c4></div><div class="line line-2" data-v-501bf4c4></div><div class="line line-3" data-v-501bf4c4></div><div class="line line-4" data-v-501bf4c4></div><div class="line line-5" data-v-501bf4c4></div></div><p class="loading-text" data-v-501bf4c4>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", r1, [
        d.value.labels && d.value.labels.length ? (y(), x("section", l1, [
          Q(Qa, {
            data: d.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), dt(L(kt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (y(), x("section", c1, [
          l("div", d1, [
            l("div", u1, [
              Q(L(zg), { class: "empty-icon" })
            ]),
            p[0] || (p[0] = l("p", { class: "empty-title" }, "No top agents data", -1)),
            p[1] || (p[1] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), g1 = /* @__PURE__ */ nt(f1, [["__scopeId", "data-v-501bf4c4"]]), p1 = { class: "payment-method-card" }, v1 = {
  key: 0,
  class: "loading-state"
}, b1 = {
  key: 1,
  class: "card-body"
}, m1 = {
  key: 0,
  class: "payment-methods-section"
}, y1 = { class: "payment-methods-grid" }, _1 = { class: "payment-card-content" }, x1 = { class: "payment-card-header" }, k1 = {
  key: 0,
  class: "currency-breakdown-card"
}, w1 = { class: "currency-label" }, $1 = { class: "payment-badge-wrapper" }, M1 = {
  key: 1,
  class: "empty-state"
}, S1 = { class: "empty-state-content" }, C1 = { class: "empty-icon-wrapper" }, D1 = {
  key: 2,
  class: "table-section"
}, A1 = { class: "table-wrapper" }, T1 = { class: "data-table" }, B1 = { class: "table-body" }, L1 = { class: "table-cell font-medium" }, F1 = { class: "table-cell text-center" }, P1 = { class: "table-cell text-center success-value" }, I1 = {
  key: 0,
  class: "currency-cell-list"
}, R1 = { key: 1 }, E1 = { class: "table-cell" }, O1 = { class: "payment-tags" }, z1 = { class: "tag-name" }, V1 = {
  key: 0,
  class: "tag-amount"
}, N1 = {
  key: 1,
  class: "tag-amount"
}, W1 = { class: "tag-count" }, H1 = {
  key: 3,
  class: "empty-table-state"
}, j1 = "Not Registered", _s = 3, Y1 = /* @__PURE__ */ J({
  __name: "PaymentMethod",
  props: {
    data: { default: void 0 },
    dates: { default: () => [] },
    airlineName: { default: "" },
    fetchFunction: { type: Function, default: void 0 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const s = e, n = a, { isDark: o } = lt(rt(s, "theme")), i = at(!1), r = at({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), c = C(() => r.value.payment_method_breakdown && r.value.payment_method_breakdown.length > 0), d = C(() => r.value.payment_method_by_day && r.value.payment_method_by_day.length > 0), u = at(!1), h = C(() => !r.value.payment_method_by_day || r.value.payment_method_by_day.length === 0 ? [] : [...r.value.payment_method_by_day].sort((P, z) => Dt(P.date).valueOf() - Dt(z.date).valueOf())), p = C(() => u.value ? h.value : h.value.slice(0, _s)), v = C(() => h.value.length > _s), f = (P) => {
      if (!P)
        return {
          airline_name: s.airlineName,
          start_date: "",
          end_date: "",
          total_conversations: 0,
          total_amount: 0,
          total_amount_by_currency: [],
          payment_method_breakdown: [],
          payment_method_by_day: []
        };
      const z = (P.payment_method_breakdown || []).map((O) => ({
        payment_method: O.payment_method || "Unknown",
        total_amount: O.total_amount ?? 0,
        count: O.count ?? 0,
        total_amount_by_currency: O.total_amount_by_currency ?? []
      })), j = (P.payment_method_by_day || []).map((O) => ({
        date: O.date || "",
        total_count: O.total_count ?? 0,
        total_amount: O.total_amount ?? 0,
        total_amount_by_currency: O.total_amount_by_currency ?? [],
        payment_methods: (O.payment_methods || []).map((V) => ({
          payment_method: V.payment_method || "Unknown",
          total_amount: V.total_amount ?? 0,
          count: V.count ?? 0,
          total_amount_by_currency: V.total_amount_by_currency ?? []
        }))
      }));
      return {
        airline_name: P.airline_name || s.airlineName,
        start_date: P.start_date || "",
        end_date: P.end_date || "",
        total_conversations: P.total_conversations ?? 0,
        total_amount: P.total_amount ?? 0,
        total_sell_usd: P.total_sell_usd,
        total_amount_by_currency: P.total_amount_by_currency ?? [],
        payment_method_breakdown: z,
        payment_method_by_day: j
      };
    }, m = async () => {
      if (!(!s.fetchFunction || !s.dates || s.dates.length < 2 || !s.airlineName)) {
        i.value = !0;
        try {
          const [P, z] = s.dates.map((O) => Dt(O).format("YYYY-MM-DD")), j = await s.fetchFunction(s.airlineName, P, z);
          r.value = f(j);
        } catch (P) {
          console.error("Error fetching payment method metrics:", P), r.value = f(null);
        } finally {
          i.value = !1;
        }
      }
    }, _ = [
      { bg: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)", border: "#a7f3d0", text: "#047857", value: "#065f46", icon: "#10b981", badge: "#059669" },
      { bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)", border: "#93c5fd", text: "#1d4ed8", value: "#1e40af", icon: "#3b82f6", badge: "#2563eb" },
      { bg: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)", border: "#d8b4fe", text: "#7c3aed", value: "#6d28d9", icon: "#8b5cf6", badge: "#7c3aed" },
      { bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)", border: "#fcd34d", text: "#b45309", value: "#92400e", icon: "#f59e0b", badge: "#d97706" },
      { bg: "linear-gradient(135deg, #fff1f2 0%, #fce7f3 100%)", border: "#fda4af", text: "#be123c", value: "#9f1239", icon: "#f43f5e", badge: "#e11d48" },
      { bg: "linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)", border: "#67e8f9", text: "#0e7490", value: "#155e75", icon: "#06b6d4", badge: "#0891b2" }
    ], g = (P) => {
      const z = _[P % _.length];
      return {
        background: z.bg,
        borderColor: z.border
      };
    }, b = (P) => ({ color: _[P % _.length].text }), k = (P) => ({ color: _[P % _.length].value }), w = (P) => ({ color: _[P % _.length].icon }), M = (P) => ({ color: _[P % _.length].badge }), S = (P) => {
      const j = T(P).length;
      return j > 18 ? { fontSize: "0.75rem" } : j > 15 ? { fontSize: "0.875rem" } : j > 12 ? { fontSize: "1rem" } : { fontSize: "1.125rem" };
    }, D = (P) => {
      const z = P?.toLowerCase() || "";
      return !P || z === "unknown" ? Yg : z.includes("credit") || z.includes("debit") ? Do : z.includes("cash") || z.includes("efectivo") ? Eg : z.includes("bank") || z.includes("transfer") ? Og : z.includes("zelle") || z.includes("pago") || z.includes("movil") ? jg : z.includes("wallet") ? qg : Hg;
    }, A = (P) => !P || P.toLowerCase() === "unknown" ? j1 : P.replace(/_/g, " "), T = (P) => P == null ? "$0.00" : bt(P), B = (P) => P == null ? "0" : Qt(P), F = (P) => P ? Dt(P).format("DD/MM/YYYY") : "-", E = (P) => P == null || Number.isNaN(Number(P)) ? 0 : Number(P), N = (P) => {
      n("export", P);
    };
    function Y() {
      const P = s.data;
      P && (Array.isArray(P.payment_method_breakdown) && P.payment_method_breakdown.length > 0 || Array.isArray(P.payment_method_by_day) && P.payment_method_by_day.length > 0) && (i.value = !1, r.value = f(P));
    }
    return ee(() => {
      s.data ? Y() : m();
    }), Ft(
      () => s.data,
      (P) => {
        P && Y();
      },
      { deep: !0 }
    ), Ft(
      () => s.dates,
      (P) => {
        s.data || P && P[0] && P[1] && m();
      },
      { deep: !0 }
    ), t({ isDark: o }), (P, z) => (y(), x("article", p1, [
      z[10] || (z[10] = st('<header class="card-header" data-v-b01ad4e3><div class="header-content" data-v-b01ad4e3><div class="title-section" data-v-b01ad4e3><h3 class="card-title" data-v-b01ad4e3>Payment Method Metrics</h3><p class="card-subtitle" data-v-b01ad4e3>Sales breakdown by payment method</p></div></div></header>', 1)),
      i.value ? (y(), x("div", v1, [...z[1] || (z[1] = [
        st('<div class="loading-container" data-v-b01ad4e3><div class="chart-lines-loader" data-v-b01ad4e3><div class="line line-1" data-v-b01ad4e3></div><div class="line line-2" data-v-b01ad4e3></div><div class="line line-3" data-v-b01ad4e3></div><div class="line line-4" data-v-b01ad4e3></div><div class="line line-5" data-v-b01ad4e3></div></div><p class="loading-text" data-v-b01ad4e3>Loading payment data...</p></div>', 1)
      ])])) : (y(), x("div", b1, [
        c.value ? (y(), x("section", m1, [
          z[2] || (z[2] = l("p", { class: "section-label" }, "Sales by Payment Method", -1)),
          l("div", y1, [
            (y(!0), x(K, null, tt(r.value.payment_method_breakdown, (j, O) => (y(), x("div", {
              key: j.payment_method,
              class: "payment-method-card-item",
              style: ft(g(O))
            }, [
              l("div", _1, [
                l("div", x1, [
                  (y(), dt(ca(D(j.payment_method)), {
                    class: "payment-icon",
                    style: ft(w(O))
                  }, null, 8, ["style"])),
                  l("span", {
                    class: "payment-name",
                    style: ft(b(O))
                  }, $(A(j.payment_method)), 5)
                ]),
                j.total_amount_by_currency && j.total_amount_by_currency.length > 0 ? (y(), x("div", k1, [
                  (y(!0), x(K, null, tt(j.total_amount_by_currency, (V) => (y(), x("p", {
                    key: `${j.payment_method}-${V.currency}`,
                    class: "currency-card-item",
                    style: ft(k(O))
                  }, [
                    l("span", w1, $(V.currency), 1),
                    l("span", {
                      class: "currency-value",
                      style: ft(S(V.total_value))
                    }, $(B(V.total_value)), 5)
                  ], 4))), 128))
                ])) : (y(), x("p", {
                  key: 1,
                  class: "payment-amount",
                  style: ft([k(O), S(j.total_amount)])
                }, $(T(j.total_amount)), 5)),
                l("div", $1, [
                  l("span", {
                    class: "payment-badge",
                    style: ft(M(O))
                  }, $(E(j.count)) + " " + $(E(j.count) === 1 ? "sale" : "sales"), 5)
                ])
              ])
            ], 4))), 128))
          ])
        ])) : (y(), x("section", M1, [
          l("div", S1, [
            l("div", C1, [
              Q(L(Do), { class: "empty-icon" })
            ]),
            z[3] || (z[3] = l("p", { class: "empty-title" }, "No payment data available", -1)),
            z[4] || (z[4] = l("p", { class: "empty-description" }, "No payment method data found for the selected period. Try adjusting the date range.", -1))
          ])
        ])),
        d.value ? (y(), x("section", D1, [
          z[8] || (z[8] = l("p", { class: "section-label" }, "Daily Breakdown", -1)),
          l("div", A1, [
            l("table", T1, [
              z[6] || (z[6] = l("thead", null, [
                l("tr", { class: "table-header-row" }, [
                  l("th", { class: "table-header text-left" }, "Date"),
                  l("th", { class: "table-header text-center" }, "Total Sales"),
                  l("th", { class: "table-header text-center" }, "Total Amount"),
                  l("th", { class: "table-header text-left" }, "Payment Methods")
                ])
              ], -1)),
              l("tbody", B1, [
                (y(!0), x(K, null, tt(p.value, (j) => (y(), x("tr", {
                  key: j.date,
                  class: "table-row"
                }, [
                  l("td", L1, $(F(j.date)), 1),
                  l("td", F1, $(L(X)(j.total_count ?? 0)), 1),
                  l("td", P1, [
                    j.total_amount_by_currency && j.total_amount_by_currency.length > 0 ? (y(), x("div", I1, [
                      (y(!0), x(K, null, tt(j.total_amount_by_currency, (O) => (y(), x("span", {
                        key: `${j.date}-${O.currency}`
                      }, $(O.currency) + " " + $(T(O.total_value)), 1))), 128))
                    ])) : (y(), x("span", R1, $(T(j.total_amount)), 1))
                  ]),
                  l("td", E1, [
                    l("div", O1, [
                      (y(!0), x(K, null, tt(j.payment_methods || [], (O) => (y(), x("div", {
                        key: O.payment_method,
                        class: "payment-tag"
                      }, [
                        l("span", z1, $(A(O.payment_method)), 1),
                        z[5] || (z[5] = l("span", { class: "tag-separator" }, "•", -1)),
                        !O.total_amount_by_currency || O.total_amount_by_currency.length === 0 ? (y(), x("span", V1, $(T(O.total_amount)), 1)) : (y(), x("span", N1, $(O.total_amount_by_currency.map((V) => `${V.currency} ${T(V.total_value)}`).join(" / ")), 1)),
                        l("span", W1, "(" + $(E(O.count)) + ")", 1)
                      ]))), 128))
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          v.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: z[0] || (z[0] = (j) => u.value = !u.value)
          }, [
            xt($(u.value ? "View less" : `View more (${h.value.length - _s} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: q(["view-more-icon", { "view-more-icon-rotated": u.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...z[7] || (z[7] = [
              l("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : I("", !0),
          e.enableExport ? (y(), dt(L(kt), {
            key: 1,
            onExport: N,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : c.value ? (y(), x("div", H1, [...z[9] || (z[9] = [
          l("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
        ])])) : I("", !0)
      ]))
    ]));
  }
}), q1 = /* @__PURE__ */ nt(Y1, [["__scopeId", "data-v-b01ad4e3"]]), U1 = { class: "agent-human-conv-card" }, K1 = {
  key: 0,
  class: "loading-state"
}, X1 = {
  key: 1,
  class: "card-body"
}, G1 = { class: "summary-cards" }, Z1 = {
  key: 0,
  class: "summary-card enqueued-card"
}, Q1 = { class: "summary-card-content" }, J1 = { class: "card-content enqueued-content" }, ty = { class: "card-value enqueued-value" }, ey = { class: "summary-card assigned-card" }, ay = { class: "summary-card-content" }, sy = { class: "card-content" }, ny = { class: "card-value assigned-value" }, oy = { class: "card-content" }, iy = { class: "card-value assigned-value" }, ry = { class: "summary-card closed-card" }, ly = { class: "summary-card-content" }, cy = { class: "card-content" }, dy = { class: "card-value closed-value" }, uy = { class: "card-content" }, hy = { class: "card-value closed-value" }, fy = {
  key: 0,
  class: "agents-section"
}, gy = { class: "date-header" }, py = { class: "date-title" }, vy = { class: "date-stats" }, by = {
  key: 0,
  class: "stat-item enqueued-stat"
}, my = { class: "stat-value" }, yy = { class: "stat-item assigned-stat" }, _y = { class: "stat-value" }, xy = { class: "stat-value" }, ky = { class: "stat-item closed-stat" }, wy = { class: "stat-value" }, $y = { class: "stat-value" }, My = { class: "table-wrapper" }, Sy = { class: "data-table" }, Cy = { class: "table-body" }, Dy = { class: "table-cell name-cell" }, Ay = { class: "table-cell email-cell" }, Ty = { class: "table-cell text-center" }, By = { class: "metric-cell-content" }, Ly = { class: "badge assigned-badge" }, Fy = { class: "metric-cell-avg" }, Py = { class: "table-cell text-center" }, Iy = { class: "metric-cell-content" }, Ry = { class: "badge closed-badge" }, Ey = { class: "metric-cell-avg" }, Oy = {
  key: 1,
  class: "empty-state"
}, zy = /* @__PURE__ */ J({
  __name: "AgentHumanConversations",
  props: {
    data: { default: () => ({
      total_assigned: 0,
      total_closed: 0,
      avg_time_to_assign_seconds: null,
      avg_conversation_duration_seconds: null,
      agents_by_day: []
    }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const s = e, n = a, o = (g) => {
      n("export", g);
    }, { isDark: i } = lt(rt(s, "theme")), r = C(() => {
      const g = s.data?.agents_by_day && s.data.agents_by_day.length > 0, b = (s.data?.total_enqueued ?? 0) > 0;
      return g || b;
    }), c = C(() => {
      if (!r.value) return {};
      const g = {};
      for (const w of s.data.agents_by_day)
        g[w.date] || (g[w.date] = []), g[w.date].push(w);
      const b = Object.keys(g).sort((w, M) => new Date(w).getTime() - new Date(M).getTime()), k = {};
      for (const w of b)
        k[w] = g[w];
      return k;
    }), d = (g) => g == null ? "0" : X(g), u = (g) => {
      if (g == null)
        return "AVG";
      if (g < 60)
        return `${Math.round(g)}s`;
      const b = Math.round(g), k = Math.floor(b / 60), w = b % 60;
      if (k < 60)
        return `${k}m ${w}s`;
      const M = Math.floor(k / 60), S = k % 60;
      return `${M}h ${S}m`;
    }, h = (g) => {
      const b = new Date(g), k = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return b.toLocaleDateString("en-US", k);
    }, p = (g) => g[0]?.day_total_enqueued ?? 0, v = (g) => g[0]?.day_total_assigned ?? 0, f = (g) => g[0]?.day_total_closed ?? 0, m = (g) => g[0]?.day_avg_time_to_assign_seconds ?? null, _ = (g) => g[0]?.day_avg_conversation_duration_seconds ?? null;
    return t({ isDark: i }), (g, b) => (y(), x("article", U1, [
      b[14] || (b[14] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Agent Human Conversations"),
          l("p", { class: "card-subtitle" }, "Human conversation assignments and closures by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", K1, [...b[0] || (b[0] = [
        st('<div class="loading-container" data-v-a8cbfebf><div class="chart-bars-loader" data-v-a8cbfebf><div class="bar bar-1" data-v-a8cbfebf></div><div class="bar bar-2" data-v-a8cbfebf></div><div class="bar bar-3" data-v-a8cbfebf></div><div class="bar bar-4" data-v-a8cbfebf></div><div class="bar bar-5" data-v-a8cbfebf></div></div><p class="loading-text" data-v-a8cbfebf>Loading agent data...</p></div>', 1)
      ])])) : (y(), x("div", X1, [
        l("div", G1, [
          e.data.total_enqueued ? (y(), x("div", Z1, [
            b[2] || (b[2] = l("div", { class: "card-decoration" }, null, -1)),
            l("div", Q1, [
              l("div", J1, [
                b[1] || (b[1] = l("p", { class: "card-label" }, "Total Enqueued", -1)),
                l("p", ty, $(d(e.data.total_enqueued)), 1)
              ])
            ])
          ])) : I("", !0),
          l("div", ey, [
            b[5] || (b[5] = l("div", { class: "card-decoration" }, null, -1)),
            l("div", ay, [
              l("div", sy, [
                b[3] || (b[3] = l("p", { class: "card-label" }, "Total Assigned", -1)),
                l("p", ny, $(d(e.data.total_assigned)), 1)
              ]),
              l("div", oy, [
                b[4] || (b[4] = l("p", { class: "card-label" }, "AVG time to assign", -1)),
                l("p", iy, $(u(e.data.avg_time_to_assign_seconds)), 1)
              ])
            ])
          ]),
          l("div", ry, [
            b[8] || (b[8] = l("div", { class: "card-decoration" }, null, -1)),
            l("div", ly, [
              l("div", cy, [
                b[6] || (b[6] = l("p", { class: "card-label" }, "Total Closed", -1)),
                l("p", dy, $(d(e.data.total_closed)), 1)
              ]),
              l("div", uy, [
                b[7] || (b[7] = l("p", { class: "card-label" }, "AVG time to close", -1)),
                l("p", hy, $(u(e.data.avg_conversation_duration_seconds)), 1)
              ])
            ])
          ])
        ]),
        r.value ? (y(), x("div", fy, [
          (y(!0), x(K, null, tt(c.value, (k, w) => (y(), x("div", {
            key: w,
            class: "date-group"
          }, [
            l("div", gy, [
              l("h4", py, $(h(w)), 1),
              l("div", vy, [
                p(k) ? (y(), x("span", by, [
                  l("span", my, $(d(p(k))), 1),
                  b[9] || (b[9] = xt(" Enqueued ", -1))
                ])) : I("", !0),
                l("span", yy, [
                  l("span", _y, $(d(v(k))), 1),
                  b[10] || (b[10] = xt(" Assigned ", -1)),
                  l("span", xy, $(u(m(k))), 1)
                ]),
                l("span", ky, [
                  l("span", wy, $(d(f(k))), 1),
                  b[11] || (b[11] = xt(" Closed ", -1)),
                  l("span", $y, $(u(_(k))), 1)
                ])
              ])
            ]),
            l("div", My, [
              l("table", Sy, [
                b[12] || (b[12] = l("thead", null, [
                  l("tr", { class: "table-header-row" }, [
                    l("th", { class: "table-header" }, "Agent Name"),
                    l("th", { class: "table-header" }, "Email"),
                    l("th", { class: "table-header" }, "Assigned (AVG time to assign)"),
                    l("th", { class: "table-header" }, "Closed (AVG time to close)")
                  ])
                ], -1)),
                l("tbody", Cy, [
                  (y(!0), x(K, null, tt(k, (M) => (y(), x("tr", {
                    key: `${w}-${M.agent_email}`,
                    class: "table-row"
                  }, [
                    l("td", Dy, $(M.agent_name || "-"), 1),
                    l("td", Ay, $(M.agent_email), 1),
                    l("td", Ty, [
                      l("div", By, [
                        l("span", Ly, $(d(M.assigned_count)), 1),
                        l("span", Fy, $(u(M.avg_time_to_assign_seconds)), 1)
                      ])
                    ]),
                    l("td", Py, [
                      l("div", Iy, [
                        l("span", Ry, $(d(M.closed_count)), 1),
                        l("span", Ey, $(u(M.avg_conversation_duration_seconds)), 1)
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ])
          ]))), 128)),
          e.enableExport ? (y(), dt(L(kt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (y(), x("div", Oy, [...b[13] || (b[13] = [
          st('<div class="empty-state-content" data-v-a8cbfebf><div class="empty-icon-wrapper" data-v-a8cbfebf><svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a8cbfebf><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-a8cbfebf></path></svg></div><p class="empty-title" data-v-a8cbfebf>No agent human conversation data available</p><p class="empty-description" data-v-a8cbfebf>Try adjusting the date range or check your filters.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Vy = /* @__PURE__ */ nt(zy, [["__scopeId", "data-v-a8cbfebf"]]), Ny = { class: "channel-metrics-card" }, Wy = {
  key: 0,
  class: "card-body"
}, Hy = {
  key: 0,
  class: "chart-section"
}, jy = {
  key: 1,
  class: "kpi-grid"
}, Yy = { class: "kpi-label-row" }, qy = ["title"], Uy = { class: "kpi-value" }, Ky = { class: "kpi-secondary" }, Xy = {
  key: 2,
  class: "empty-state"
}, Gy = {
  key: 1,
  class: "loading-state"
}, Zy = /* @__PURE__ */ J({
  __name: "ChannelMetrics",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const s = e, n = a, o = (f) => {
      n("export", f);
    }, { isDark: i, colors: r } = lt(rt(s, "theme")), c = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, d = at({ labels: [], datasets: [] }), u = C(() => s.data ?? {
      channels_by_day: {},
      total_by_channel: {},
      total_conversations: 0
    }), h = C(() => {
      const f = u.value.total_by_channel || {}, m = Object.values(f).reduce((_, g) => _ + g, 0);
      return m === 0 ? [] : Object.entries(f).sort(([, _], [, g]) => g - _).map(([_, g]) => ({
        name: _,
        label: _.toUpperCase(),
        total: g,
        percentage: (g / m * 100).toFixed(1),
        color: c[_.toLowerCase()] || "#9ca3af"
      }));
    }), p = C(() => ({
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !0,
          position: "top",
          labels: {
            usePointStyle: !0,
            padding: 20,
            font: {
              family: "'DM Sans', sans-serif",
              size: 12
            },
            color: r.value.textSecondary
          }
        },
        tooltip: {
          mode: "index",
          intersect: !1,
          backgroundColor: r.value.tooltipBg,
          titleColor: r.value.tooltipText,
          bodyColor: r.value.textSecondary,
          borderColor: i.value ? "rgba(198, 125, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            family: "'Space Grotesk', sans-serif",
            size: 14,
            weight: 600
          },
          bodyFont: {
            family: "'DM Sans', sans-serif",
            size: 13
          }
        }
      },
      scales: {
        x: {
          display: !0,
          grid: {
            color: r.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 11
            },
            color: r.value.textSecondary
          }
        },
        y: {
          type: "linear",
          display: !0,
          position: "left",
          beginAtZero: !0,
          grid: {
            color: r.value.gridLines
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 11
            },
            color: r.value.textSecondary
          }
        }
      },
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: !1
      }
    })), v = (f) => {
      if (!f || !f.channels_by_day) {
        d.value = { labels: [], datasets: [] };
        return;
      }
      const m = f.channels_by_day, _ = Object.keys(m).sort();
      if (_.length === 0) {
        d.value = { labels: [], datasets: [] };
        return;
      }
      const g = /* @__PURE__ */ new Set();
      for (const w of Object.values(m))
        for (const M of Object.keys(w))
          g.add(M);
      const k = Array.from(g).map((w) => {
        const M = w.toLowerCase(), S = c[M] || "#9ca3af";
        return {
          label: w.toUpperCase(),
          data: _.map((D) => m[D]?.[w] || 0),
          borderColor: S,
          backgroundColor: `${S}1A`,
          // 1A = 10% opacity
          borderWidth: 2,
          fill: !0,
          tension: 0.4,
          pointBackgroundColor: S,
          pointBorderColor: S,
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        };
      });
      d.value = {
        labels: _.map((w) => Dt(w).format("MMM DD")),
        datasets: k
      };
    };
    return Ft(
      () => s.data,
      (f) => {
        v(f ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: i }), (f, m) => (y(), x("article", Ny, [
      m[2] || (m[2] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Interactions by Channel"),
          l("p", { class: "card-subtitle" }, "Responses sent by AI agents")
        ])
      ], -1)),
      s.loading ? (y(), x("div", Gy, [...m[1] || (m[1] = [
        st('<div class="loading-container" data-v-5aa7d4da><div class="chart-bars-loader" data-v-5aa7d4da><div class="bar bar-1" data-v-5aa7d4da></div><div class="bar bar-2" data-v-5aa7d4da></div><div class="bar bar-3" data-v-5aa7d4da></div><div class="bar bar-4" data-v-5aa7d4da></div><div class="bar bar-5" data-v-5aa7d4da></div></div><p class="loading-text" data-v-5aa7d4da>Loading channel metrics...</p></div>', 1)
      ])])) : (y(), x("div", Wy, [
        d.value.labels && d.value.labels.length ? (y(), x("section", Hy, [
          Q(_e, {
            data: d.value,
            options: p.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), dt(L(kt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : I("", !0),
        h.value.length ? (y(), x("div", jy, [
          (y(!0), x(K, null, tt(h.value, (_) => (y(), x("div", {
            class: "kpi-card",
            key: _.name
          }, [
            l("div", Yy, [
              l("span", {
                class: "kpi-color-dot",
                style: ft({ backgroundColor: _.color }),
                "aria-hidden": "true"
              }, null, 4),
              l("span", {
                class: "kpi-label",
                title: _.label
              }, $(_.label), 9, qy)
            ]),
            l("span", Uy, $(_.percentage) + "%", 1),
            l("span", Ky, $(L(X)(_.total)) + " msgs", 1)
          ]))), 128))
        ])) : (y(), x("section", Xy, [...m[0] || (m[0] = [
          st('<div class="empty-state-content" data-v-5aa7d4da><div class="empty-icon-wrapper" data-v-5aa7d4da><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5aa7d4da><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-5aa7d4da></path></svg></div><p class="empty-title" data-v-5aa7d4da>No channel metrics data available</p><p class="empty-description" data-v-5aa7d4da>No channel data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Qy = /* @__PURE__ */ nt(Zy, [["__scopeId", "data-v-5aa7d4da"]]), Jy = { class: "triage-combinations-card" }, t_ = { class: "card-header" }, e_ = { class: "total-badge" }, a_ = {
  key: 0,
  class: "card-body"
}, s_ = { class: "chart-container" }, n_ = { class: "table-container" }, o_ = { class: "table-row" }, i_ = { class: "table-row" }, r_ = { class: "table-cell text-center count-cell" }, l_ = { class: "table-cell text-center count-cell" }, c_ = { class: "table-cell text-center count-cell" }, d_ = { class: "table-cell text-center count-cell" }, u_ = { class: "table-cell text-center count-cell" }, h_ = {
  key: 1,
  class: "empty-state"
}, f_ = { class: "empty-state-content" }, g_ = { class: "empty-icon-wrapper" }, p_ = {
  key: 1,
  class: "loading-state"
}, v_ = /* @__PURE__ */ J({
  __name: "TriageCombinations",
  props: {
    data: { default: () => ({ combinations: {} }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const s = e, n = a, o = (g) => {
      n("export", g);
    }, { isDark: i, colors: r } = lt(rt(s, "theme")), c = C(() => {
      const g = s.data?.combinations || {}, b = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [k, w] of Object.entries(g)) {
        const M = k.split("+").filter(Boolean);
        if (!M.includes("triage")) continue;
        const S = M.filter((D) => D !== "triage").length;
        S >= 4 ? b["4p"] += Number(w) || 0 : b[S] += Number(w) || 0;
      }
      return b;
    }), d = C(() => {
      const g = c.value;
      return g[0] + g[1] + g[2] + g[3] + g["4p"] || 0;
    }), u = C(() => Object.keys(s.data?.combinations || {}).length > 0), h = C(() => {
      const g = d.value;
      if (!g) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const b = c.value;
      return {
        pct0: b[0] / g * 100,
        pct1: b[1] / g * 100,
        pct2: b[2] / g * 100,
        pct3: b[3] / g * 100,
        pct4p: b["4p"] / g * 100
      };
    }), p = {
      c0: "#ef444480",
      // Rojo (0 intenciones adicionales)
      c1: "#10b98180",
      // Verde (1 intención adicional)
      c2: "#f59e0b80",
      // Ámbar (2 intenciones adicionales)
      c3: "#a78bfa80",
      // Púrpura (3 intenciones adicionales)
      c4p: "#94a3b880"
      // Gris (4+ intenciones adicionales)
    }, v = (g) => g?.replace("80", "") || "#888888", f = C(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [h.value.pct0],
          backgroundColor: p.c0,
          borderColor: v(p.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [h.value.pct1],
          backgroundColor: p.c1,
          borderColor: v(p.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [h.value.pct2],
          backgroundColor: p.c2,
          borderColor: v(p.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [h.value.pct3],
          backgroundColor: p.c3,
          borderColor: v(p.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [h.value.pct4p],
          backgroundColor: p.c4p,
          borderColor: v(p.c4p),
          borderWidth: 1
        }
      ]
    })), m = C(() => ({
      responsive: !0,
      maintainAspectRatio: !1,
      indexAxis: "y",
      plugins: {
        legend: { display: !1 },
        tooltip: {
          enabled: !0,
          backgroundColor: r.value.tooltipBg,
          titleColor: r.value.tooltipText,
          bodyColor: r.value.tooltipText,
          borderColor: i.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            family: "'DM Sans', sans-serif",
            size: 13,
            weight: 600
          },
          bodyFont: {
            family: "'DM Sans', sans-serif",
            size: 12,
            weight: 500
          },
          callbacks: {
            label: (g) => `${g.dataset.label} intent(s): ${Number(g.raw || 0).toFixed(0)}%`
          }
        }
      },
      scales: {
        x: {
          beginAtZero: !0,
          stacked: !0,
          max: 100,
          grid: { display: !1 },
          ticks: { display: !1 },
          border: { display: !1 }
        },
        y: {
          stacked: !0,
          grid: { display: !1 },
          ticks: { display: !1 },
          border: { display: !1 }
        }
      }
    })), _ = (g) => `${(Number(g) || 0).toFixed(0)}`;
    return t({ isDark: i }), (g, b) => (y(), x("article", Jy, [
      l("header", t_, [
        b[0] || (b[0] = l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Distribution of Number of Intents"),
          l("p", { class: "card-subtitle" }, "Analysis of intent combinations per conversation")
        ], -1)),
        l("span", e_, " Total: " + $(d.value), 1)
      ]),
      e.loading ? (y(), x("div", p_, [...b[6] || (b[6] = [
        st('<div class="loading-container" data-v-cb93cda2><div class="chart-bars-loader" data-v-cb93cda2><div class="bar bar-1" data-v-cb93cda2></div><div class="bar bar-2" data-v-cb93cda2></div><div class="bar bar-3" data-v-cb93cda2></div><div class="bar bar-4" data-v-cb93cda2></div><div class="bar bar-5" data-v-cb93cda2></div></div><p class="loading-text" data-v-cb93cda2>Loading intent distribution...</p></div>', 1)
      ])])) : (y(), x("div", a_, [
        u.value ? (y(), x(K, { key: 0 }, [
          l("div", s_, [
            Q(le, {
              data: f.value,
              options: m.value
            }, null, 8, ["data", "options"])
          ]),
          l("div", n_, [
            b[3] || (b[3] = st('<div class="table-header" data-v-cb93cda2><div class="table-cell header-cell" data-v-cb93cda2>Number of intentions</div><div class="table-cell header-cell text-center" data-v-cb93cda2>0</div><div class="table-cell header-cell text-center" data-v-cb93cda2>1</div><div class="table-cell header-cell text-center" data-v-cb93cda2>2</div><div class="table-cell header-cell text-center" data-v-cb93cda2>3</div><div class="table-cell header-cell text-center" data-v-cb93cda2>4 or more</div></div>', 1)),
            l("div", o_, [
              b[1] || (b[1] = l("div", { class: "table-cell row-label" }, "% of total", -1)),
              l("div", {
                class: "table-cell text-center percentage-cell",
                style: ft({ color: v(p.c0) })
              }, $(_(h.value.pct0)) + "% ", 5),
              l("div", {
                class: "table-cell text-center percentage-cell",
                style: ft({ color: v(p.c1) })
              }, $(_(h.value.pct1)) + "% ", 5),
              l("div", {
                class: "table-cell text-center percentage-cell",
                style: ft({ color: v(p.c2) })
              }, $(_(h.value.pct2)) + "% ", 5),
              l("div", {
                class: "table-cell text-center percentage-cell",
                style: ft({ color: v(p.c3) })
              }, $(_(h.value.pct3)) + "% ", 5),
              l("div", {
                class: "table-cell text-center percentage-cell",
                style: ft({ color: v(p.c4p) })
              }, $(_(h.value.pct4p)) + "% ", 5)
            ]),
            l("div", i_, [
              b[2] || (b[2] = l("div", { class: "table-cell row-label" }, "Count", -1)),
              l("div", r_, $(L(X)(c.value[0])), 1),
              l("div", l_, $(L(X)(c.value[1])), 1),
              l("div", c_, $(L(X)(c.value[2])), 1),
              l("div", d_, $(L(X)(c.value[3])), 1),
              l("div", u_, $(L(X)(c.value["4p"])), 1)
            ])
          ]),
          e.enableExport ? (y(), dt(L(kt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ], 64)) : (y(), x("div", h_, [
          l("div", f_, [
            l("div", g_, [
              Q(L(zt), { class: "empty-icon" })
            ]),
            b[4] || (b[4] = l("p", { class: "empty-title" }, "No triage combinations data", -1)),
            b[5] || (b[5] = l("p", { class: "empty-description" }, "No intent distribution data found for the selected period. Try adjusting the date range.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), b_ = /* @__PURE__ */ nt(v_, [["__scopeId", "data-v-cb93cda2"]]), m_ = { class: "select-language-card" }, y_ = { class: "card-header" }, __ = { class: "header-content" }, x_ = {
  key: 0,
  class: "total-badge"
}, k_ = { class: "badge-value" }, w_ = {
  key: 0,
  class: "loading-state"
}, $_ = {
  key: 1,
  class: "card-body"
}, M_ = {
  key: 0,
  class: "pie-section"
}, S_ = {
  key: 1,
  class: "empty-state"
}, C_ = /* @__PURE__ */ J({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s, colors: n } = lt(rt(a, "theme")), o = [
      "#8b5cf6",
      "#06b6d4",
      "#f59e0b",
      "#10b981",
      "#ef4444",
      "#ec4899",
      "#6366f1",
      "#14b8a6",
      "#f97316",
      "#84cc16"
    ], i = {
      es: { label: "Spanish" },
      en: { label: "English" },
      pt: { label: "Portuguese" },
      fr: { label: "French" },
      de: { label: "German" },
      it: { label: "Italian" },
      ja: { label: "Japanese" },
      zh: { label: "Chinese" },
      ko: { label: "Korean" },
      ru: { label: "Russian" }
    }, r = (v) => i[v]?.label || v.toUpperCase(), c = C(
      () => a.data?.items && a.data.items.length > 0
    ), d = C(
      () => (a.data?.items || []).reduce((v, f) => v + f.count, 0)
    ), u = C(() => {
      const v = {};
      for (const f of a.data?.items || [])
        v[f.language] = (v[f.language] || 0) + f.count;
      return Object.entries(v).map(([f, m]) => ({ language: f, count: m })).sort((f, m) => m.count - f.count);
    }), h = C(() => ({
      labels: u.value.map((v) => r(v.language)),
      datasets: [{
        data: u.value.map((v) => v.count),
        backgroundColor: u.value.map((v, f) => o[f % o.length] + "80"),
        borderColor: u.value.map((v, f) => o[f % o.length]),
        borderWidth: 2,
        hoverOffset: 6
      }]
    })), p = C(() => ({
      responsive: !0,
      maintainAspectRatio: !1,
      cutout: "55%",
      plugins: {
        legend: {
          display: !0,
          position: "bottom",
          labels: {
            usePointStyle: !0,
            pointStyle: "circle",
            padding: 16,
            font: { family: "'DM Sans', sans-serif", size: 12 },
            color: n.value.textSecondary
          }
        },
        tooltip: {
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
          bodyColor: n.value.tooltipText,
          borderColor: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: { family: "'Space Grotesk', sans-serif", size: 13, weight: 600 },
          bodyFont: { family: "'DM Sans', sans-serif", size: 12 },
          callbacks: {
            label: (v) => {
              const f = v.raw || 0, m = d.value > 0 ? (f / d.value * 100).toFixed(1) : "0";
              return ` ${v.label}: ${f} (${m}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: s }), (v, f) => (y(), x("article", m_, [
      l("header", y_, [
        l("div", __, [
          f[1] || (f[1] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "Language Selection"),
            l("p", { class: "card-subtitle" }, "Language distribution across conversations")
          ], -1)),
          a.loading ? I("", !0) : (y(), x("div", x_, [
            f[0] || (f[0] = l("p", { class: "badge-label" }, "Total", -1)),
            l("p", k_, $(L(X)(d.value)), 1)
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", w_, [...f[2] || (f[2] = [
        st('<div class="loading-container" data-v-216eadc2><div class="chart-bars-loader" data-v-216eadc2><div class="bar bar-1" data-v-216eadc2></div><div class="bar bar-2" data-v-216eadc2></div><div class="bar bar-3" data-v-216eadc2></div><div class="bar bar-4" data-v-216eadc2></div><div class="bar bar-5" data-v-216eadc2></div></div><p class="loading-text" data-v-216eadc2>Loading language data...</p></div>', 1)
      ])])) : (y(), x("div", $_, [
        c.value ? (y(), x("section", M_, [
          Q(Qa, {
            data: h.value,
            options: p.value
          }, null, 8, ["data", "options"])
        ])) : (y(), x("section", S_, [...f[3] || (f[3] = [
          st('<div class="empty-state-content" data-v-216eadc2><div class="empty-icon-wrapper" data-v-216eadc2><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-216eadc2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" data-v-216eadc2></path></svg></div><p class="empty-title" data-v-216eadc2>No language data available</p><p class="empty-description" data-v-216eadc2>No language selection data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), D_ = /* @__PURE__ */ nt(C_, [["__scopeId", "data-v-216eadc2"]]), A_ = { class: "guardrails-card" }, T_ = { class: "card-header" }, B_ = { class: "header-content" }, L_ = {
  key: 0,
  class: "total-badge"
}, F_ = { class: "badge-value" }, P_ = {
  key: 0,
  class: "loading-state"
}, I_ = {
  key: 1,
  class: "card-body"
}, R_ = { class: "summary-card" }, E_ = { class: "summary-items" }, O_ = { class: "summary-item" }, z_ = { class: "summary-value" }, V_ = { class: "summary-pct" }, N_ = { class: "summary-item" }, W_ = { class: "summary-pct" }, H_ = { class: "summary-item" }, j_ = { class: "summary-value" }, Y_ = { class: "summary-pct" }, q_ = {
  key: 0,
  class: "table-section"
}, U_ = { class: "table-wrapper" }, K_ = { class: "data-table" }, X_ = { class: "table-body" }, G_ = { class: "table-cell font-medium text-center" }, Z_ = { class: "table-cell text-center font-semibold" }, Q_ = { class: "table-cell" }, J_ = { class: "type-badges-row" }, t2 = {
  key: 1,
  class: "empty-state"
}, xs = 3, e2 = /* @__PURE__ */ J({
  __name: "Guardrails",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const s = e, n = a, o = (g) => {
      n("export", g);
    }, { isDark: i } = lt(rt(s, "theme")), r = C(
      () => s.data?.items && s.data.items.length > 0
    ), c = C(
      () => (s.data?.items || []).reduce((g, b) => g + b.count, 0)
    ), d = (g) => {
      const b = {};
      for (const M of s.data?.items || [])
        b[M[g]] = (b[M[g]] || 0) + M.count;
      const k = Object.entries(b).sort((M, S) => S[1] - M[1]);
      if (k.length === 0) return { name: "—", pct: 0 };
      const w = c.value;
      return {
        name: k[0][0],
        pct: w > 0 ? Math.round(k[0][1] / w * 100) : 0
      };
    }, u = C(() => d("guardrail_type")), h = C(() => d("guardrail_action")), p = C(() => d("guardrail_source")), v = C(() => {
      const g = {};
      for (const b of s.data?.items || [])
        g[b.date] || (g[b.date] = {}), g[b.date][b.guardrail_type] = (g[b.date][b.guardrail_type] || 0) + b.count;
      return Object.entries(g).map(([b, k]) => ({
        date: b,
        total: Object.values(k).reduce((w, M) => w + M, 0),
        types: Object.entries(k).map(([w, M]) => ({ type: w, count: M })).sort((w, M) => M.count - w.count)
      })).sort((b, k) => new Date(b.date).getTime() - new Date(k.date).getTime());
    }), f = at(!1), m = C(() => f.value ? v.value : v.value.slice(0, xs)), _ = C(() => v.value.length > xs);
    return t({ isDark: i }), (g, b) => (y(), x("article", A_, [
      l("header", T_, [
        l("div", B_, [
          b[2] || (b[2] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "Guardrails Metrics"),
            l("p", { class: "card-subtitle" }, "Content safety guardrail events and actions")
          ], -1)),
          s.loading ? I("", !0) : (y(), x("div", L_, [
            b[1] || (b[1] = l("p", { class: "badge-label" }, "Total Events", -1)),
            l("p", F_, $(L(X)(c.value)), 1)
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", P_, [...b[3] || (b[3] = [
        st('<div class="loading-container" data-v-02a2e95e><div class="chart-bars-loader" data-v-02a2e95e><div class="bar bar-1" data-v-02a2e95e></div><div class="bar bar-2" data-v-02a2e95e></div><div class="bar bar-3" data-v-02a2e95e></div><div class="bar bar-4" data-v-02a2e95e></div><div class="bar bar-5" data-v-02a2e95e></div></div><p class="loading-text" data-v-02a2e95e>Loading guardrails data...</p></div>', 1)
      ])])) : (y(), x("div", I_, [
        r.value ? (y(), x(K, { key: 0 }, [
          l("div", R_, [
            l("div", E_, [
              l("div", O_, [
                b[4] || (b[4] = l("span", { class: "summary-label" }, "Top type:", -1)),
                l("span", z_, $(u.value.name), 1),
                l("span", V_, "(" + $(u.value.pct) + "%)", 1)
              ]),
              b[7] || (b[7] = l("span", { class: "summary-dot" }, "·", -1)),
              l("div", N_, [
                b[5] || (b[5] = l("span", { class: "summary-label" }, "Top action:", -1)),
                l("span", {
                  class: q(["summary-value", `summary-action-${h.value.name.toLowerCase()}`])
                }, $(h.value.name), 3),
                l("span", W_, "(" + $(h.value.pct) + "%)", 1)
              ]),
              b[8] || (b[8] = l("span", { class: "summary-dot" }, "·", -1)),
              l("div", H_, [
                b[6] || (b[6] = l("span", { class: "summary-label" }, "Top source:", -1)),
                l("span", j_, $(p.value.name), 1),
                l("span", Y_, "(" + $(p.value.pct) + "%)", 1)
              ])
            ])
          ]),
          v.value.length > 0 ? (y(), x("section", q_, [
            b[11] || (b[11] = l("div", { class: "section-header" }, [
              l("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            l("div", U_, [
              l("table", K_, [
                b[9] || (b[9] = l("thead", null, [
                  l("tr", { class: "table-header-row" }, [
                    l("th", { class: "table-header" }, "Date"),
                    l("th", { class: "table-header text-center" }, "Count"),
                    l("th", { class: "table-header" }, "Types")
                  ])
                ], -1)),
                l("tbody", X_, [
                  (y(!0), x(K, null, tt(m.value, (k) => (y(), x("tr", {
                    key: k.date,
                    class: "table-row"
                  }, [
                    l("td", G_, $(L(Dt)(k.date).format("DD/MM")), 1),
                    l("td", Z_, $(L(X)(k.total)), 1),
                    l("td", Q_, [
                      l("div", J_, [
                        (y(!0), x(K, null, tt(k.types, (w) => (y(), x("span", {
                          key: w.type,
                          class: "type-count-badge"
                        }, $(w.type) + " (" + $(w.count) + ") ", 1))), 128))
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ]),
            _.value ? (y(), x("button", {
              key: 0,
              class: "view-more-btn",
              onClick: b[0] || (b[0] = (k) => f.value = !f.value)
            }, [
              xt($(f.value ? "View less" : `View more (${v.value.length - xs} more rows)`) + " ", 1),
              (y(), x("svg", {
                class: q(["view-more-icon", { "view-more-icon-rotated": f.value }]),
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [...b[10] || (b[10] = [
                l("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M19 9l-7 7-7-7"
                }, null, -1)
              ])], 2))
            ])) : I("", !0),
            e.enableExport ? (y(), dt(L(kt), {
              key: 1,
              onExport: o,
              loading: e.exportLoading
            }, null, 8, ["loading"])) : I("", !0)
          ])) : I("", !0)
        ], 64)) : (y(), x("section", t2, [...b[12] || (b[12] = [
          st('<div class="empty-state-content" data-v-02a2e95e><div class="empty-icon-wrapper" data-v-02a2e95e><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-02a2e95e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-v-02a2e95e></path></svg></div><p class="empty-title" data-v-02a2e95e>No guardrail events</p><p class="empty-description" data-v-02a2e95e>No content safety events found for the selected period. This is a good sign!</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), a2 = /* @__PURE__ */ nt(e2, [["__scopeId", "data-v-02a2e95e"]]), s2 = { class: "dn-metrics-card" }, n2 = { class: "card-header" }, o2 = { class: "header-content" }, i2 = {
  key: 0,
  class: "total-docs-badge"
}, r2 = { class: "badge-value" }, l2 = {
  key: 0,
  class: "loading-state"
}, c2 = {
  key: 1,
  class: "card-body"
}, d2 = { class: "kpi-grid" }, u2 = { class: "kpi-card kpi-neutral" }, h2 = { class: "kpi-value" }, f2 = { class: "kpi-card kpi-success" }, g2 = { class: "kpi-value kpi-value-success" }, p2 = { class: "kpi-pct" }, v2 = { class: "kpi-card kpi-danger" }, b2 = { class: "kpi-value kpi-value-error" }, m2 = { class: "kpi-pct" }, y2 = { class: "kpi-card kpi-warning" }, _2 = { class: "kpi-value kpi-value-reason" }, x2 = { class: "kpi-pct" }, k2 = { class: "chart-section" }, w2 = { class: "chart-wrapper" }, $2 = {
  key: 1,
  class: "empty-chart"
}, M2 = {
  key: 0,
  class: "table-section"
}, S2 = { class: "table-wrapper" }, C2 = { class: "data-table" }, D2 = { class: "table-body" }, A2 = { class: "table-cell text-left font-medium" }, T2 = { class: "table-cell text-center font-semibold" }, B2 = { class: "table-cell text-center" }, L2 = { class: "impact-bar-container" }, F2 = { class: "impact-label" }, P2 = {
  key: 1,
  class: "chart-section"
}, I2 = { class: "chart-wrapper" }, R2 = { class: "system-health" }, E2 = { class: "system-health-content" }, O2 = { class: "sys-kpi-grid" }, z2 = { class: "sys-kpi" }, V2 = { class: "sys-value" }, N2 = { class: "sys-kpi" }, W2 = { class: "sys-value" }, H2 = { class: "sys-kpi" }, j2 = { class: "sys-value sys-error" }, Y2 = { class: "sys-kpi" }, q2 = { class: "sys-value" }, U2 = { class: "sys-kpi" }, K2 = { class: "sys-value" }, X2 = { class: "sys-kpi" }, G2 = { class: "sys-value sys-error" }, Z2 = {
  key: 1,
  class: "empty-state"
}, Q2 = /* @__PURE__ */ J({
  __name: "DisruptionNotifier",
  props: {
    data: { default: () => ({
      documentCounts: { items: [] },
      processingCounts: { items: [] }
    }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const s = e, n = a, o = (w) => {
      n("export", w);
    }, { isDark: i, colors: r } = lt(rt(s, "theme")), c = C(() => {
      const w = s.data?.documentCounts?.items || [], M = s.data?.processingCounts?.items || [];
      return w.length > 0 || M.length > 0;
    }), d = C(() => {
      const w = s.data?.documentCounts?.items || [];
      return {
        processing_started: w.reduce((M, S) => M + S.processing_started, 0),
        processing_completed: w.reduce((M, S) => M + S.processing_completed, 0),
        processing_failed: w.reduce((M, S) => M + S.processing_failed, 0),
        row_count_total: w.reduce((M, S) => M + S.row_count_total, 0)
      };
    }), u = C(() => {
      const w = s.data?.processingCounts?.items || [];
      return {
        processing_started: w.reduce((M, S) => M + S.processing_started, 0),
        processing_success: w.reduce((M, S) => M + S.processing_success, 0),
        notification_sent: w.reduce((M, S) => M + S.notification_sent, 0),
        notification_failed: w.reduce((M, S) => M + S.notification_failed, 0),
        dq_phone: w.reduce((M, S) => M + S.dq_error_phone_not_found, 0),
        dq_flight: w.reduce((M, S) => M + S.dq_error_flight_not_found, 0),
        dq_booking: w.reduce((M, S) => M + S.dq_error_booking_not_found, 0),
        dq_other: w.reduce((M, S) => M + S.dq_error_other, 0),
        totalDqErrors: w.reduce((M, S) => M + S.dq_error_phone_not_found + S.dq_error_flight_not_found + S.dq_error_booking_not_found + S.dq_error_other, 0)
      };
    }), h = C(() => d.value.row_count_total || u.value.processing_started), p = C(() => Math.max(0, h.value - u.value.notification_sent)), v = (w, M) => M ? `${Math.round(w / M * 100)}%` : "0%", f = C(() => {
      const w = [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].filter((M) => M.count > 0).sort((M, S) => S.count - M.count);
      return w.length > 0 ? w[0] : { reason: "None", count: 0 };
    }), m = C(() => {
      const w = h.value;
      return [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].map((M) => ({
        ...M,
        impactPct: w > 0 ? Math.round(M.count / w * 100) : 0
      }));
    }), _ = C(() => {
      const w = h.value, M = u.value.processing_success, S = Math.max(0, M - u.value.totalDqErrors), D = u.value.notification_sent, A = Math.max(0, w - M), T = u.value.totalDqErrors, B = Math.max(0, S - D), F = (Y, P) => {
        const z = P > 0 ? Math.round(Y / P * 100) : 0;
        return `${Y.toLocaleString()} (${z}%)`;
      }, E = [
        { name: "Records Detected" },
        { name: "Valid Reservations" },
        { name: "Invalid / Unprocessed" },
        { name: "Contactable" },
        { name: "Data Quality Issues" },
        { name: "Notified" },
        { name: "Not Delivered" }
      ], N = [];
      return M > 0 && N.push({ source: "Records Detected", target: "Valid Reservations", value: M, label: F(M, w) }), A > 0 && N.push({ source: "Records Detected", target: "Invalid / Unprocessed", value: A, label: F(A, w) }), S > 0 && N.push({ source: "Valid Reservations", target: "Contactable", value: S, label: F(S, w) }), T > 0 && N.push({ source: "Valid Reservations", target: "Data Quality Issues", value: T, label: F(T, w) }), D > 0 && N.push({ source: "Contactable", target: "Notified", value: D, label: F(D, w) }), B > 0 && N.push({ source: "Contactable", target: "Not Delivered", value: B, label: F(B, w) }), { nodes: E, links: N };
    }), g = {
      "Records Detected": "#DBEAFE",
      "Valid Reservations": "#D1FAE5",
      "Invalid / Unprocessed": "#FEE2E2",
      Contactable: "#BBF7D0",
      "Data Quality Issues": "#FED7AA",
      Notified: "#86EFAC",
      "Not Delivered": "#FCA5A5"
    }, b = C(() => {
      const w = [...s.data?.processingCounts?.items || []].sort(
        (F, E) => new Date(F.date).getTime() - new Date(E.date).getTime()
      ), M = s.data?.documentCounts?.items || [], S = {};
      for (const F of M)
        S[F.date] = (S[F.date] || 0) + F.row_count_total;
      const D = [.../* @__PURE__ */ new Set([...w.map((F) => F.date), ...M.map((F) => F.date)])].sort(), A = D.map((F) => Dt(F).format("MMM DD")), T = D.map((F) => {
        const E = w.find((P) => P.date === F), N = E?.notification_sent || 0, Y = S[F] || E?.processing_started || 0;
        return Y > 0 ? Math.round(N / Y * 100) : 0;
      }), B = D.map((F) => w.find((N) => N.date === F)?.notification_sent || 0);
      return {
        labels: A,
        datasets: [
          {
            label: "Success Rate (%)",
            data: T,
            borderColor: "#8b5cf6",
            backgroundColor: "rgba(139, 92, 246, 0.1)",
            borderWidth: 2.5,
            fill: !0,
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: "#8b5cf6",
            pointBorderColor: "#7c3aed",
            pointBorderWidth: 2,
            yAxisID: "y"
          },
          {
            label: "Notifications Sent",
            data: B,
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.08)",
            borderWidth: 1.5,
            borderDash: [4, 4],
            fill: !1,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 5,
            pointBackgroundColor: "#10b981",
            pointBorderColor: "#059669",
            pointBorderWidth: 2,
            yAxisID: "y1"
          }
        ]
      };
    }), k = C(() => ({
      responsive: !0,
      maintainAspectRatio: !1,
      interaction: { mode: "index", intersect: !1 },
      plugins: {
        legend: { display: !0, position: "top", labels: { usePointStyle: !0, padding: 16, font: { family: "'DM Sans', sans-serif", size: 11 }, color: r.value.textSecondary } },
        tooltip: {
          mode: "index",
          intersect: !1,
          backgroundColor: r.value.tooltipBg,
          titleColor: r.value.tooltipText,
          bodyColor: r.value.textSecondary,
          borderColor: i.value ? "rgba(198,125,255,0.2)" : "rgba(0,0,0,0.1)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: (w) => w.datasetIndex === 0 ? ` Success Rate: ${w.raw}%` : ` Notifications: ${w.raw}`
          }
        }
      },
      scales: {
        x: { display: !0, grid: { display: !1 }, ticks: { font: { family: "'DM Sans', sans-serif", size: 11 }, color: r.value.textSecondary } },
        y: {
          type: "linear",
          display: !0,
          position: "left",
          beginAtZero: !0,
          max: 100,
          grid: { color: r.value.gridLines },
          ticks: { font: { family: "'DM Sans', sans-serif", size: 11 }, color: r.value.textSecondary, callback: (w) => w + "%" },
          title: { display: !0, text: "Success Rate", font: { family: "'DM Sans', sans-serif", size: 11 }, color: r.value.textSecondary }
        },
        y1: {
          type: "linear",
          display: !0,
          position: "right",
          beginAtZero: !0,
          grid: { drawOnChartArea: !1 },
          ticks: { font: { family: "'DM Sans', sans-serif", size: 11 }, color: r.value.textSecondary },
          title: { display: !0, text: "Volume", font: { family: "'DM Sans', sans-serif", size: 11 }, color: r.value.textSecondary }
        }
      }
    }));
    return t({ isDark: i }), (w, M) => (y(), x("article", s2, [
      l("header", n2, [
        l("div", o2, [
          M[1] || (M[1] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "Disruption Notifier"),
            l("p", { class: "card-subtitle" }, "Passenger notification effectiveness and delivery analysis")
          ], -1)),
          s.loading ? I("", !0) : (y(), x("div", i2, [
            M[0] || (M[0] = l("p", { class: "badge-label" }, "Total Records", -1)),
            l("p", r2, $(L(X)(d.value.row_count_total)), 1)
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", l2, [...M[2] || (M[2] = [
        st('<div class="loading-container" data-v-d8baf32c><div class="chart-bars-loader" data-v-d8baf32c><div class="bar bar-1" data-v-d8baf32c></div><div class="bar bar-2" data-v-d8baf32c></div><div class="bar bar-3" data-v-d8baf32c></div><div class="bar bar-4" data-v-d8baf32c></div><div class="bar bar-5" data-v-d8baf32c></div></div><p class="loading-text" data-v-d8baf32c>Loading disruption notifier data...</p></div>', 1)
      ])])) : (y(), x("div", c2, [
        c.value ? (y(), x(K, { key: 0 }, [
          l("div", d2, [
            l("div", u2, [
              M[3] || (M[3] = l("span", { class: "kpi-label" }, "Passengers Affected", -1)),
              l("span", h2, $(L(X)(h.value)), 1)
            ]),
            l("div", f2, [
              M[4] || (M[4] = l("span", { class: "kpi-label" }, "Successfully Notified", -1)),
              l("span", g2, $(L(X)(u.value.notification_sent)), 1),
              l("span", p2, $(v(u.value.notification_sent, h.value)), 1)
            ]),
            l("div", v2, [
              M[5] || (M[5] = l("span", { class: "kpi-label" }, "Not Notified", -1)),
              l("span", b2, $(L(X)(p.value)), 1),
              l("span", m2, $(v(p.value, h.value)), 1)
            ]),
            l("div", y2, [
              M[6] || (M[6] = l("span", { class: "kpi-label" }, "Main Failure Reason", -1)),
              l("span", _2, $(f.value.reason), 1),
              l("span", x2, $(L(X)(f.value.count)) + " cases", 1)
            ])
          ]),
          l("section", k2, [
            M[8] || (M[8] = l("div", { class: "chart-header" }, [
              l("h4", { class: "section-title" }, "Passenger Disruption Funnel")
            ], -1)),
            l("div", w2, [
              _.value.nodes.length > 0 && _.value.links.length > 0 ? (y(), dt(xe, {
                key: 0,
                data: _.value,
                "node-colors": g,
                height: "350px"
              }, null, 8, ["data"])) : (y(), x("div", $2, [...M[7] || (M[7] = [
                l("p", { class: "empty-chart-text" }, "No processing data available for visualization", -1)
              ])]))
            ])
          ]),
          m.value.length > 0 ? (y(), x("section", M2, [
            M[10] || (M[10] = l("div", { class: "section-header" }, [
              l("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
            ], -1)),
            l("div", S2, [
              l("table", C2, [
                M[9] || (M[9] = l("thead", null, [
                  l("tr", { class: "table-header-row" }, [
                    l("th", { class: "table-header text-left" }, "Reason"),
                    l("th", { class: "table-header text-center" }, "Count"),
                    l("th", { class: "table-header text-center" }, "Impact")
                  ])
                ], -1)),
                l("tbody", D2, [
                  (y(!0), x(K, null, tt(m.value, (S) => (y(), x("tr", {
                    key: S.reason,
                    class: "table-row"
                  }, [
                    l("td", A2, $(S.reason), 1),
                    l("td", T2, $(L(X)(S.count)), 1),
                    l("td", B2, [
                      l("div", L2, [
                        l("div", {
                          class: "impact-bar",
                          style: ft({ width: S.impactPct + "%" })
                        }, null, 4),
                        l("span", F2, $(S.impactPct) + "%", 1)
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ])
          ])) : I("", !0),
          b.value.labels.length > 0 ? (y(), x("section", P2, [
            M[11] || (M[11] = l("div", { class: "chart-header" }, [
              l("h4", { class: "section-title" }, "Notification Success Rate by Day")
            ], -1)),
            l("div", I2, [
              Q(_e, {
                data: b.value,
                options: k.value
              }, null, 8, ["data", "options"])
            ])
          ])) : I("", !0),
          l("details", R2, [
            M[18] || (M[18] = l("summary", { class: "system-health-toggle" }, [
              l("svg", {
                class: "toggle-icon",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [
                l("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                }),
                l("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                })
              ]),
              xt(" System Health Details ")
            ], -1)),
            l("div", E2, [
              l("div", O2, [
                l("div", z2, [
                  M[12] || (M[12] = l("span", { class: "sys-label" }, "Docs Started", -1)),
                  l("span", V2, $(L(X)(d.value.processing_started)), 1)
                ]),
                l("div", N2, [
                  M[13] || (M[13] = l("span", { class: "sys-label" }, "Docs Completed", -1)),
                  l("span", W2, $(L(X)(d.value.processing_completed)), 1)
                ]),
                l("div", H2, [
                  M[14] || (M[14] = l("span", { class: "sys-label" }, "Docs Failed", -1)),
                  l("span", j2, $(L(X)(d.value.processing_failed)), 1)
                ]),
                l("div", Y2, [
                  M[15] || (M[15] = l("span", { class: "sys-label" }, "Processing Started", -1)),
                  l("span", q2, $(L(X)(u.value.processing_started)), 1)
                ]),
                l("div", U2, [
                  M[16] || (M[16] = l("span", { class: "sys-label" }, "Processing Success", -1)),
                  l("span", K2, $(L(X)(u.value.processing_success)), 1)
                ]),
                l("div", X2, [
                  M[17] || (M[17] = l("span", { class: "sys-label" }, "Notification Failed", -1)),
                  l("span", G2, $(L(X)(u.value.notification_failed)), 1)
                ])
              ])
            ])
          ]),
          e.enableExport ? (y(), dt(L(kt), {
            key: 2,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ], 64)) : (y(), x("section", Z2, [...M[19] || (M[19] = [
          st('<div class="empty-state-content" data-v-d8baf32c><div class="empty-icon-wrapper" data-v-d8baf32c><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d8baf32c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" data-v-d8baf32c></path></svg></div><p class="empty-title" data-v-d8baf32c>No disruption notifier data</p><p class="empty-description" data-v-d8baf32c>No disruption notification data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), J2 = /* @__PURE__ */ nt(Q2, [["__scopeId", "data-v-d8baf32c"]]), tx = { class: "card-header" }, ex = {
  key: 0,
  class: "loading-state"
}, ax = {
  key: 1,
  class: "card-body"
}, sx = { class: "metric-value" }, nx = /* @__PURE__ */ J({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s } = lt(rt(a, "theme")), n = C(() => X(a.totalConversations)), o = C(
      () => a.previousTotalConversations !== null && a.previousTotalConversations !== void 0
    ), i = C(() => {
      if (!o.value) return 0;
      const d = a.previousTotalConversations;
      return d === 0 ? a.totalConversations > 0 ? 100 : 0 : (a.totalConversations - d) / d * 100;
    }), r = C(() => `${i.value > 0 ? "+" : ""}${i.value.toFixed(1)}% vs prev.`), c = C(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: s, changePercent: i }), (d, u) => (y(), x("article", {
      class: q(["highlight-card", { "highlight-card--dark": L(s) }])
    }, [
      l("header", tx, [
        u[0] || (u[0] = l("div", { class: "icon-wrapper" }, [
          l("svg", {
            class: "card-icon",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "1.5"
          }, [
            l("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
            })
          ])
        ], -1)),
        !e.loading && o.value ? (y(), x("div", {
          key: 0,
          class: q(["change-badge", c.value])
        }, $(r.value), 3)) : I("", !0)
      ]),
      e.loading ? (y(), x("div", ex, [...u[1] || (u[1] = [
        l("div", { class: "shimmer shimmer-value" }, null, -1),
        l("div", { class: "shimmer shimmer-label" }, null, -1)
      ])])) : (y(), x("div", ax, [
        l("span", sx, $(n.value), 1),
        u[2] || (u[2] = l("span", { class: "metric-label" }, "Total Conversations", -1))
      ]))
    ], 2));
  }
}), ox = /* @__PURE__ */ nt(nx, [["__scopeId", "data-v-cd9dd1ba"]]), ix = { class: "card-header" }, rx = {
  key: 0,
  class: "loading-state"
}, lx = {
  key: 1,
  class: "card-body"
}, cx = { class: "metric-value" }, dx = /* @__PURE__ */ J({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s } = lt(rt(a, "theme")), n = C(() => `${a.csatP95.toFixed(1)}`), o = C(
      () => a.previousCsatP95 !== null && a.previousCsatP95 !== void 0
    ), i = C(() => {
      if (!o.value) return 0;
      const d = a.previousCsatP95;
      return d === 0 ? a.csatP95 > 0 ? 100 : 0 : (a.csatP95 - d) / d * 100;
    }), r = C(() => `${i.value > 0 ? "+" : ""}${i.value.toFixed(1)}% vs prev.`), c = C(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: s, changePercent: i }), (d, u) => (y(), x("article", {
      class: q(["highlight-card", { "highlight-card--dark": L(s) }])
    }, [
      l("header", ix, [
        u[0] || (u[0] = l("div", { class: "icon-wrapper" }, [
          l("svg", {
            class: "card-icon",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "1.5"
          }, [
            l("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321 1.01l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.41a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-1.01l5.518-.442a.563.563 0 00.475-.345l2.125-5.11z"
            })
          ])
        ], -1)),
        !e.loading && o.value ? (y(), x("div", {
          key: 0,
          class: q(["change-badge", c.value])
        }, $(r.value), 3)) : I("", !0)
      ]),
      e.loading ? (y(), x("div", rx, [...u[1] || (u[1] = [
        l("div", { class: "shimmer shimmer-value" }, null, -1),
        l("div", { class: "shimmer shimmer-label" }, null, -1)
      ])])) : (y(), x("div", lx, [
        l("span", cx, $(n.value), 1),
        u[2] || (u[2] = l("span", { class: "metric-label" }, "CSAT P95", -1))
      ]))
    ], 2));
  }
}), ux = /* @__PURE__ */ nt(dx, [["__scopeId", "data-v-e36f6025"]]), hx = { class: "card-header" }, fx = {
  key: 0,
  class: "loading-state"
}, gx = {
  key: 1,
  class: "card-body"
}, px = { class: "metric-value" }, vx = /* @__PURE__ */ J({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s } = lt(rt(a, "theme")), n = C(() => `${a.currencyCode} ${Qt(a.totalRevenue)}`), o = C(
      () => a.previousTotalRevenue !== null && a.previousTotalRevenue !== void 0
    ), i = C(() => {
      if (!o.value) return 0;
      const d = a.previousTotalRevenue;
      return d === 0 ? a.totalRevenue > 0 ? 100 : 0 : (a.totalRevenue - d) / d * 100;
    }), r = C(() => `${i.value > 0 ? "+" : ""}${i.value.toFixed(1)}% vs prev.`), c = C(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: s, changePercent: i }), (d, u) => (y(), x("article", {
      class: q(["highlight-card", { "highlight-card--dark": L(s) }])
    }, [
      l("header", hx, [
        u[0] || (u[0] = l("div", { class: "icon-wrapper" }, [
          l("svg", {
            class: "card-icon",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "1.5"
          }, [
            l("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M9.813 15.904L9 18.75l-2.407-1.204a5.97 5.97 0 01-1.593-.98l-3.5-2.625a2.25 2.25 0 010-3.602l3.5-2.625a5.97 5.97 0 011.593-.98L9 5.25l.813 2.846a2.25 2.25 0 001.341 1.457l2.846.813-2.846.813a2.25 2.25 0 00-1.341 1.457zM15.75 5.25l.537 1.879a1.5 1.5 0 00.894.975l1.879.537-1.879.537a1.5 1.5 0 00-.894.975l-.537 1.879-.537-1.879a1.5 1.5 0 00-.894-.975l-1.879-.537 1.879-.537a1.5 1.5 0 00.894-.975l.537-1.879zM18 12.75l.537 1.879a1.5 1.5 0 00.894.975l1.879.537-1.879.537a1.5 1.5 0 00-.894.975L18 19.53l-.537-1.879a1.5 1.5 0 00-.894-.975l-1.879-.537 1.879-.537a1.5 1.5 0 00.894-.975L18 12.75z"
            })
          ])
        ], -1)),
        !e.loading && o.value ? (y(), x("div", {
          key: 0,
          class: q(["change-badge", c.value])
        }, $(r.value), 3)) : I("", !0)
      ]),
      e.loading ? (y(), x("div", fx, [...u[1] || (u[1] = [
        l("div", { class: "shimmer shimmer-value" }, null, -1),
        l("div", { class: "shimmer shimmer-label" }, null, -1)
      ])])) : (y(), x("div", gx, [
        l("span", px, $(n.value), 1),
        u[2] || (u[2] = l("span", { class: "metric-label" }, "AI-Generated Revenue", -1))
      ]))
    ], 2));
  }
}), bx = /* @__PURE__ */ nt(vx, [["__scopeId", "data-v-a642a31c"]]), mx = { class: "nps-daily-card" }, yx = { class: "card-header" }, _x = { class: "header-content" }, xx = {
  key: 0,
  class: "stats-badge"
}, kx = { class: "badge-value" }, wx = {
  key: 0,
  class: "loading-state"
}, $x = {
  key: 1,
  class: "card-body"
}, Mx = { class: "tooltip-content" }, Sx = { class: "tooltip-title" }, Cx = { class: "tooltip-stats" }, Dx = { class: "tooltip-stat-row" }, Ax = { class: "tooltip-value" }, Tx = { class: "tooltip-stat-row" }, Bx = { class: "tooltip-value" }, Lx = { class: "tooltip-stat-row" }, Fx = { class: "tooltip-value" }, Px = { class: "tooltip-stat-row" }, Ix = { class: "tooltip-value" }, Rx = { class: "tooltip-stat-row" }, Ex = { class: "tooltip-value" }, Ox = { class: "tooltip-stat-row" }, zx = { class: "tooltip-value" }, Vx = {
  key: 2,
  class: "empty-state"
}, Ao = 400, Je = 60, To = 90, Bo = 120, Nx = {
  __name: "npsDailyMetrics",
  props: {
    data: {
      type: Object,
      default: () => null
    },
    loading: {
      type: Boolean,
      default: !1
    },
    theme: {
      type: String,
      default: void 0
    },
    enableExport: {
      type: Boolean,
      default: !1
    },
    exportLoading: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const s = a, n = (_) => {
      s("export", _);
    }, o = e, { isDark: i } = lt(rt(o, "theme")), r = C(() => o.data), c = at(null), d = at({
      visible: !1,
      x: 0,
      y: 0,
      date: "",
      min: "",
      max: "",
      q1: "",
      avg: "",
      q3: "",
      median: ""
    }), u = C(() => {
      if (!r.value || !r.value.nps_by_day) return 800;
      const _ = r.value.nps_by_day.length;
      return Math.max(800, Je * 2 + _ * Bo);
    }), h = (_, g) => {
      const k = (_ - 1) / 9;
      return Je + g - k * g;
    }, p = (_) => _ ? Dt(_).format("DD-MM-YYYY") : "", v = C(() => {
      if (!r.value || !r.value.nps_by_day || r.value.nps_by_day.length === 0)
        return [];
      const _ = [], g = Ao - Je - To;
      return r.value.nps_by_day.forEach((b, k) => {
        const w = b.min_score || 0, M = b.q1_score || 0, S = b.median_score || 0, D = b.q3_score || 0, A = b.max_score || 0, T = b.average_score || 0;
        _.push({
          label: p(b.date),
          responseCount: b.nps_responses_count || 0,
          isTotal: !1,
          low: w,
          q1: M,
          median: S,
          q3: D,
          high: A,
          average: T,
          highY: h(A, g),
          lowY: h(w, g),
          q1Y: h(M, g),
          q3Y: h(D, g),
          medianY: h(S, g),
          averageY: T > 0 ? h(T, g) : null,
          centerX: Je + (k + 1) * Bo
        });
      }), _;
    }), f = (_, g) => {
      if (!c.value || !g || g.horizontal) return;
      const b = c.value.getBoundingClientRect(), k = _.clientX, w = _.clientY, M = 140, S = 160, D = 10, A = 15;
      let T = k - b.left - M / 2, B = w - b.top - S - A;
      T = Math.max(D, Math.min(T, b.width - M - D)), B < D && (B = w - b.top + A), B = Math.max(D, Math.min(B, b.height - S - D)), d.value = {
        visible: !0,
        x: T,
        y: B,
        date: g.label || "",
        min: g.low !== void 0 ? g.low.toFixed(1) : "N/A",
        max: g.high !== void 0 ? g.high.toFixed(1) : "N/A",
        q1: g.open !== void 0 ? g.open.toFixed(1) : "N/A",
        avg: g.average !== void 0 && g.average > 0 ? g.average.toFixed(1) : "N/A",
        q3: g.close !== void 0 ? g.close.toFixed(1) : "N/A",
        median: g.median !== void 0 ? g.median.toFixed(1) : "N/A"
      };
    }, m = () => {
      d.value.visible = !1;
    };
    return t({ isDark: i }), (_, g) => (y(), x("article", mx, [
      l("header", yx, [
        l("div", _x, [
          g[1] || (g[1] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "CSAT Daily Metrics"),
            l("p", { class: "card-subtitle" }, "Daily CSAT Distribution")
          ], -1)),
          r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (y(), x("div", xx, [
            g[0] || (g[0] = l("p", { class: "badge-label" }, "Days", -1)),
            l("p", kx, $(r.value.nps_by_day.length), 1)
          ])) : I("", !0)
        ])
      ]),
      o.loading ? (y(), x("div", wx, [...g[2] || (g[2] = [
        st('<div class="loading-container" data-v-b20112a7><div class="chart-flow-loader" data-v-b20112a7><div class="flow-line flow-1" data-v-b20112a7></div><div class="flow-line flow-2" data-v-b20112a7></div><div class="flow-line flow-3" data-v-b20112a7></div><div class="flow-line flow-4" data-v-b20112a7></div><div class="flow-line flow-5" data-v-b20112a7></div></div><p class="loading-text" data-v-b20112a7>Loading daily NPS data...</p></div>', 1)
      ])])) : r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (y(), x("div", $x, [
        l("div", {
          class: "chart-wrapper",
          ref_key: "chartContainerRef",
          ref: c
        }, [
          v.value && v.value.length > 0 ? (y(), dt(Oi, {
            key: 0,
            "candlestick-data": v.value,
            "chart-width": u.value,
            "chart-height": Ao,
            "chart-margin": Je,
            "chart-bottom-margin": To,
            "show-legend": !0,
            rotation: 0,
            "candle-width": 30,
            onCandleHover: f,
            onCandleLeave: m
          }, null, 8, ["candlestick-data", "chart-width"])) : I("", !0),
          d.value.visible ? (y(), x("div", {
            key: 1,
            class: "tooltip-overlay",
            style: ft({
              left: `${d.value.x}px`,
              top: `${d.value.y}px`
            })
          }, [
            l("div", Mx, [
              l("div", Sx, $(d.value.date), 1),
              g[9] || (g[9] = l("div", { class: "tooltip-divider" }, null, -1)),
              l("div", Cx, [
                l("div", Dx, [
                  g[3] || (g[3] = l("span", { class: "tooltip-label tooltip-min" }, "Min:", -1)),
                  l("span", Ax, $(d.value.min), 1)
                ]),
                l("div", Tx, [
                  g[4] || (g[4] = l("span", { class: "tooltip-label tooltip-q1" }, "Q1:", -1)),
                  l("span", Bx, $(d.value.q1), 1)
                ]),
                l("div", Lx, [
                  g[5] || (g[5] = l("span", { class: "tooltip-label tooltip-median" }, "Median:", -1)),
                  l("span", Fx, $(d.value.median), 1)
                ]),
                l("div", Px, [
                  g[6] || (g[6] = l("span", { class: "tooltip-label tooltip-avg" }, "Avg:", -1)),
                  l("span", Ix, $(d.value.avg), 1)
                ]),
                l("div", Rx, [
                  g[7] || (g[7] = l("span", { class: "tooltip-label tooltip-q3" }, "Q3:", -1)),
                  l("span", Ex, $(d.value.q3), 1)
                ]),
                l("div", Ox, [
                  g[8] || (g[8] = l("span", { class: "tooltip-label tooltip-max" }, "Max:", -1)),
                  l("span", zx, $(d.value.max), 1)
                ])
              ])
            ])
          ], 4)) : I("", !0)
        ], 512),
        e.enableExport ? (y(), dt(L(kt), {
          key: 0,
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : I("", !0)
      ])) : (y(), x("div", Vx, [...g[10] || (g[10] = [
        st('<div class="empty-state-content" data-v-b20112a7><div class="empty-icon-wrapper" data-v-b20112a7><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-b20112a7><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-b20112a7></path></svg></div><p class="empty-title" data-v-b20112a7>No daily NPS data available</p><p class="empty-description" data-v-b20112a7>No daily NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, ji = /* @__PURE__ */ nt(Nx, [["__scopeId", "data-v-b20112a7"]]), Wx = { class: "nps-overview-card" }, Hx = { class: "card-header" }, jx = { class: "header-content" }, Yx = { class: "header-badges" }, qx = {
  key: 0,
  class: "stats-badge"
}, Ux = { class: "badge-value" }, Kx = {
  key: 1,
  class: "stats-badge"
}, Xx = { class: "badge-value" }, Gx = {
  key: 0,
  class: "loading-state"
}, Zx = {
  key: 1,
  class: "card-body"
}, Qx = { class: "chart-wrapper" }, Jx = {
  key: 2,
  class: "empty-state"
}, tk = 500, ek = 60, ak = 80, sk = {
  __name: "npsOverviewMetrics",
  props: {
    data: {
      type: Object,
      default: () => null
    },
    loading: {
      type: Boolean,
      default: !1
    },
    theme: {
      type: String,
      default: void 0
    },
    enableExport: {
      type: Boolean,
      default: !1
    },
    exportLoading: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const s = a, n = (d) => {
      s("export", d);
    }, o = e, { isDark: i } = lt(rt(o, "theme")), r = C(() => o.data), c = C(() => Math.max(600, window.innerWidth * 0.85));
    return t({ isDark: i }), (d, u) => (y(), x("article", Wx, [
      l("header", Hx, [
        l("div", jx, [
          u[2] || (u[2] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "CSAT Overview Metrics"),
            l("p", { class: "card-subtitle" }, "Overall CSAT Distribution")
          ], -1)),
          l("div", Yx, [
            r.value && r.value.total_nps_responses > 0 ? (y(), x("div", qx, [
              u[0] || (u[0] = l("p", { class: "badge-label" }, "Responses", -1)),
              l("p", Ux, $(r.value.total_nps_responses), 1)
            ])) : I("", !0),
            r.value && r.value.p95_score > 0 ? (y(), x("div", Kx, [
              u[1] || (u[1] = l("p", { class: "badge-label" }, "Percentile 95", -1)),
              l("p", Xx, $(r.value.p95_score || 0), 1)
            ])) : I("", !0)
          ])
        ])
      ]),
      o.loading ? (y(), x("div", Gx, [...u[3] || (u[3] = [
        st('<div class="loading-container" data-v-30fe5f88><div class="chart-flow-loader" data-v-30fe5f88><div class="flow-line flow-1" data-v-30fe5f88></div><div class="flow-line flow-2" data-v-30fe5f88></div><div class="flow-line flow-3" data-v-30fe5f88></div><div class="flow-line flow-4" data-v-30fe5f88></div><div class="flow-line flow-5" data-v-30fe5f88></div></div><p class="loading-text" data-v-30fe5f88>Loading NPS data...</p></div>', 1)
      ])])) : r.value && r.value.total_nps_responses > 0 ? (y(), x("div", Zx, [
        l("div", Qx, [
          Q(zi, {
            histogram: r.value.histogram || [],
            "min-score": r.value.min_score || 0,
            "max-score": r.value.max_score || 0,
            "q1-score": r.value.q1_score || 0,
            "median-score": r.value.median_score || 0,
            "q3-score": r.value.q3_score || 0,
            "average-score": r.value.average_score || 0,
            "chart-width": c.value,
            "chart-height": tk,
            "chart-margin": ek,
            "chart-bottom-margin": ak
          }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score", "chart-width"])
        ]),
        e.enableExport ? (y(), dt(L(kt), {
          key: 0,
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : I("", !0)
      ])) : (y(), x("div", Jx, [...u[4] || (u[4] = [
        st('<div class="empty-state-content" data-v-30fe5f88><div class="empty-icon-wrapper" data-v-30fe5f88><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-30fe5f88><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-30fe5f88></path></svg></div><p class="empty-title" data-v-30fe5f88>No NPS data available</p><p class="empty-description" data-v-30fe5f88>No NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, Yi = /* @__PURE__ */ nt(sk, [["__scopeId", "data-v-30fe5f88"]]), nk = { class: "nps-metrics-container" }, ok = {
  __name: "npsMetrics",
  props: {
    data: {
      type: Object,
      default: () => null
    },
    loading: {
      type: Boolean,
      default: !1
    },
    enableExport: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const a = t, s = (n) => {
      a("export", n);
    };
    return (n, o) => (y(), x("div", nk, [
      Q(Yi, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: s
      }, null, 8, ["data", "loading", "enable-export"]),
      Q(ji, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: s
      }, null, 8, ["data", "loading", "enable-export"])
    ]));
  }
}, ik = /* @__PURE__ */ nt(ok, [["__scopeId", "data-v-25fe3b80"]]), rk = { class: "aws-cost-card" }, lk = { class: "card-header" }, ck = { class: "header-main" }, dk = { class: "header-content" }, uk = { class: "card-title" }, hk = { class: "header-stats" }, fk = { class: "stat-badge primary" }, gk = { class: "stat-value" }, pk = { class: "stat-badge secondary" }, vk = { class: "stat-value" }, bk = { class: "card-body" }, mk = {
  key: 0,
  class: "loading-state"
}, yk = {
  key: 1,
  class: "chart-section"
}, _k = { class: "chart-container" }, xk = {
  key: 2,
  class: "empty-state"
}, kk = { class: "empty-state-content" }, wk = { class: "empty-icon-wrapper" }, $k = {
  __name: "AWSCost",
  props: {
    data: {
      type: Object,
      default: () => ({
        airline_name: "",
        start_date: "",
        end_date: "",
        daily: [],
        total_allocated_cost: 0,
        total_cost: 0,
        total_conversations: 0,
        total_airline_conversations: 0
      })
    },
    loading: {
      type: Boolean,
      default: !1
    },
    theme: {
      type: String,
      default: void 0
    }
  },
  setup(e) {
    const t = e, { isDark: a, colors: s } = lt(rt(t, "theme")), n = C(() => {
      const r = t.data ?? {}, c = r.daily, d = r.days, u = Array.isArray(c) && c.length > 0, h = Array.isArray(d) && d.length > 0 && Array.isArray(r.allocatedCostSeries) && r.allocatedCostSeries.length === d.length;
      let p = [];
      return u ? p = c : h && (p = d.map((v, f) => ({
        date: v,
        allocated_cost: r.allocatedCostSeries[f] ?? 0,
        aws_cost: r.awsCostSeries[f] ?? 0,
        airline_conversations: r.airlineConversationsSeries[f] ?? 0
      }))), {
        daily: p,
        total_allocated_cost: r.total_allocated_cost ?? r.totalAllocated ?? 0,
        total_cost: r.total_cost ?? r.total ?? 0,
        total_conversations: r.total_conversations ?? r.totalConversations ?? 0,
        total_airline_conversations: r.total_airline_conversations ?? r.totalAirlineConversations ?? 0,
        airline_name: r.airline_name
      };
    }), o = C(() => {
      const r = n.value.daily;
      return {
        labels: r.map((d) => d.date),
        datasets: [
          {
            label: "Allocated Cost",
            data: r.map((d) => d.allocated_cost),
            borderColor: s.value.primaryLight,
            backgroundColor: a.value ? "rgba(198, 125, 255, 0.15)" : "rgba(198, 125, 255, 0.08)",
            borderWidth: 3,
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.4,
            fill: !0,
            yAxisID: "y"
          },
          {
            label: "AWS Cost",
            data: r.map((d) => d.aws_cost),
            borderColor: "#FF9900",
            // Amazon Orange/Yellow
            backgroundColor: "transparent",
            borderWidth: 3,
            pointRadius: 0,
            tension: 0.4,
            fill: !1,
            yAxisID: "y"
          },
          {
            label: "Airline Conv.",
            data: r.map((d) => d.airline_conversations),
            borderColor: s.value.info,
            backgroundColor: a.value ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)",
            borderWidth: 2,
            pointRadius: 3,
            tension: 0.3,
            yAxisID: "y1"
          }
        ]
      };
    }), i = C(() => ({
      responsive: !0,
      maintainAspectRatio: !1,
      interaction: {
        mode: "index",
        intersect: !1
      },
      plugins: {
        legend: {
          display: !0,
          position: "top",
          align: "end",
          labels: {
            usePointStyle: !0,
            pointStyle: "circle",
            padding: 20,
            boxWidth: 8,
            boxHeight: 8,
            color: s.value.textSecondary,
            font: {
              family: "'DM Sans', sans-serif",
              size: 11,
              weight: "600"
            }
          }
        },
        tooltip: {
          padding: 12,
          backgroundColor: s.value.tooltipBg,
          titleColor: s.value.tooltipText,
          bodyColor: s.value.tooltipText,
          borderColor: s.value.tooltipBorder,
          borderWidth: 1,
          cornerRadius: 12,
          displayColors: !0,
          usePointStyle: !0
        }
      },
      scales: {
        y: {
          type: "linear",
          display: !0,
          position: "left",
          grid: {
            color: s.value.gridLines,
            drawBorder: !1
          },
          ticks: {
            color: s.value.textSecondary,
            font: { family: "'DM Sans', sans-serif", size: 10 },
            callback: (r) => bt(r)
          }
        },
        y1: {
          type: "linear",
          display: !0,
          position: "right",
          grid: { display: !1 },
          ticks: {
            color: s.value.textSecondary,
            font: { family: "'DM Sans', sans-serif", size: 10 }
          }
        },
        x: {
          grid: { display: !1 },
          ticks: {
            color: s.value.textSecondary,
            font: { family: "'DM Sans', sans-serif", size: 10 }
          }
        }
      }
    }));
    return (r, c) => (y(), x("article", rk, [
      l("header", lk, [
        l("div", ck, [
          l("div", dk, [
            l("h3", uk, $(n.value.airline_name || "AWS Cost"), 1),
            c[0] || (c[0] = l("p", { class: "card-subtitle" }, "AWS vs Allocated costs over time", -1))
          ]),
          l("div", hk, [
            l("div", fk, [
              c[1] || (c[1] = l("span", { class: "stat-label" }, "Total Allocated", -1)),
              l("span", gk, $(L(bt)(n.value.total_allocated_cost)), 1)
            ]),
            l("div", pk, [
              c[2] || (c[2] = l("span", { class: "stat-label" }, "Total AWS", -1)),
              l("span", vk, $(L(bt)(n.value.total_cost)), 1)
            ])
          ])
        ])
      ]),
      l("div", bk, [
        e.loading ? (y(), x("div", mk, [...c[3] || (c[3] = [
          st('<div class="loading-container" data-v-c023bd59><div class="chart-lines-loader" data-v-c023bd59><div class="line line-1" data-v-c023bd59></div><div class="line line-2" data-v-c023bd59></div><div class="line line-3" data-v-c023bd59></div><div class="line line-4" data-v-c023bd59></div><div class="line line-5" data-v-c023bd59></div></div><p class="loading-text" data-v-c023bd59>Loading chart data...</p></div>', 1)
        ])])) : n.value.daily.length > 0 ? (y(), x("div", yk, [
          l("div", _k, [
            Q(_e, {
              data: o.value,
              options: i.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", xk, [
          l("div", kk, [
            l("div", wk, [
              Q(L(zt), { class: "empty-icon" })
            ]),
            c[4] || (c[4] = l("p", { class: "empty-title" }, "Sin datos de costos", -1)),
            c[5] || (c[5] = l("p", { class: "empty-description" }, "No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas.", -1))
          ])
        ]))
      ])
    ]));
  }
}, Mk = /* @__PURE__ */ nt($k, [["__scopeId", "data-v-c023bd59"]]), Sk = { class: "cost-usage-card" }, Ck = {
  key: 0,
  class: "card-body"
}, Dk = {
  key: 0,
  class: "chart-section"
}, Ak = { class: "chart-container" }, Tk = { class: "kpi-grid" }, Bk = { class: "kpi-card" }, Lk = { class: "kpi-value" }, Fk = { class: "kpi-card" }, Pk = { class: "kpi-value" }, Ik = { class: "kpi-card" }, Rk = { class: "kpi-value" }, Ek = { class: "kpi-card" }, Ok = { class: "kpi-value" }, zk = { class: "kpi-card" }, Vk = { class: "kpi-value" }, Nk = { class: "kpi-card highlighted" }, Wk = { class: "kpi-value gradient-text" }, Hk = {
  key: 1,
  class: "empty-state"
}, jk = { class: "empty-state-content" }, Yk = { class: "empty-icon-wrapper" }, qk = {
  key: 1,
  class: "loading-state"
}, Uk = /* @__PURE__ */ J({
  __name: "CostUsage",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const s = e, { isDark: n, colors: o } = lt(rt(s, "theme")), i = (f) => {
      const m = new Date(f), _ = String(m.getDate()).padStart(2, "0"), g = String(m.getMonth() + 1).padStart(2, "0");
      return `${_}-${g}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, c = C(() => {
      const f = s.data?.costs_by_day || {};
      return Object.values(f).reduce((m, _) => m + (_.input_cost || 0), 0);
    }), d = C(() => {
      const f = s.data?.costs_by_day || {};
      return Object.values(f).reduce((m, _) => m + (_.output_cost || 0), 0);
    }), u = C(() => {
      const f = s.data?.costs_by_day || {};
      return Object.values(f).reduce((m, _) => m + (_.cache_read_cost || 0), 0);
    }), h = C(() => {
      const f = s.data?.costs_by_day || {};
      return Object.values(f).reduce((m, _) => m + (_.cache_write_cost || 0), 0);
    }), p = C(() => {
      const f = s.data?.costs_by_day || {}, m = Object.keys(f).sort();
      if (m.length === 0)
        return { labels: [], datasets: [] };
      const _ = m.map((b) => i(b)), g = [
        {
          label: "Input Cost",
          data: m.map((b) => f[b]?.input_cost || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: m.map((b) => f[b]?.output_cost || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: m.map((b) => f[b]?.cache_read_cost || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: m.map((b) => f[b]?.cache_write_cost || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: _,
        datasets: g
      };
    }), v = C(() => s.options ? s.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      interaction: {
        mode: "index",
        intersect: !1
      },
      plugins: {
        legend: {
          display: !0,
          position: "top",
          align: "end",
          labels: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 13,
              weight: 500
            },
            color: o.value.textSecondary,
            padding: 12,
            boxWidth: 12,
            boxHeight: 12,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "rectRounded"
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: o.value.tooltipBg,
          titleColor: o.value.tooltipText,
          bodyColor: o.value.tooltipText,
          borderColor: n.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            family: "'DM Sans', sans-serif",
            size: 13,
            weight: 600
          },
          bodyFont: {
            family: "'DM Sans', sans-serif",
            size: 12,
            weight: 500
          },
          callbacks: {
            label: function(f) {
              let m = f.dataset.label || "";
              return m && (m += ": "), f.parsed.y !== null && (m += bt(f.parsed.y)), m;
            }
          }
        }
      },
      scales: {
        x: {
          stacked: !0,
          border: { display: !1 },
          grid: { display: !1 },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: o.value.textSecondary,
            padding: 8
          }
        },
        y: {
          stacked: !0,
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: o.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: o.value.textSecondary,
            padding: 8,
            callback: function(f) {
              return bt(f);
            }
          }
        }
      }
    });
    return t({ isDark: n }), (f, m) => (y(), x("article", Sk, [
      m[9] || (m[9] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Cost Usage"),
          l("p", { class: "card-subtitle" }, "Cost breakdown over time (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", qk, [...m[8] || (m[8] = [
        st('<div class="loading-container" data-v-62f96954><div class="chart-lines-loader" data-v-62f96954><div class="line line-1" data-v-62f96954></div><div class="line line-2" data-v-62f96954></div><div class="line line-3" data-v-62f96954></div><div class="line line-4" data-v-62f96954></div><div class="line line-5" data-v-62f96954></div></div><p class="loading-text" data-v-62f96954>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Ck, [
        p.value.labels && p.value.labels.length ? (y(), x("section", Dk, [
          l("div", Ak, [
            Q(le, {
              data: p.value,
              options: v.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          l("footer", Tk, [
            l("div", Bk, [
              m[0] || (m[0] = l("span", { class: "kpi-label" }, "Total Cost", -1)),
              l("span", Lk, $(L(bt)(e.data.total_cost)), 1)
            ]),
            l("div", Fk, [
              m[1] || (m[1] = l("span", { class: "kpi-label" }, "Input Cost", -1)),
              l("span", Pk, $(L(bt)(c.value)), 1)
            ]),
            l("div", Ik, [
              m[2] || (m[2] = l("span", { class: "kpi-label" }, "Output Cost", -1)),
              l("span", Rk, $(L(bt)(d.value)), 1)
            ]),
            l("div", Ek, [
              m[3] || (m[3] = l("span", { class: "kpi-label" }, "Cache Read", -1)),
              l("span", Ok, $(L(bt)(u.value)), 1)
            ]),
            l("div", zk, [
              m[4] || (m[4] = l("span", { class: "kpi-label" }, "Cache Write", -1)),
              l("span", Vk, $(L(bt)(h.value)), 1)
            ]),
            l("div", Nk, [
              m[5] || (m[5] = l("span", { class: "kpi-label" }, "Avg / Conv.", -1)),
              l("span", Wk, $(L(bt)(e.data.avg_cost_per_conversation)), 1)
            ])
          ])
        ])) : (y(), x("section", Hk, [
          l("div", jk, [
            l("div", Yk, [
              Q(L(zt), { class: "empty-icon" })
            ]),
            m[6] || (m[6] = l("p", { class: "empty-title" }, "No cost usage data", -1)),
            m[7] || (m[7] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Kk = /* @__PURE__ */ nt(Uk, [["__scopeId", "data-v-62f96954"]]), Xk = { class: "token-usage-card" }, Gk = {
  key: 0,
  class: "card-body"
}, Zk = {
  key: 0,
  class: "chart-section"
}, Qk = { class: "chart-container" }, Jk = { class: "kpi-grid" }, t5 = { class: "kpi-card" }, e5 = { class: "kpi-value" }, a5 = { class: "kpi-card" }, s5 = { class: "kpi-value" }, n5 = { class: "kpi-card" }, o5 = { class: "kpi-value" }, i5 = { class: "kpi-card" }, r5 = { class: "kpi-value" }, l5 = { class: "kpi-card" }, c5 = { class: "kpi-value" }, d5 = {
  key: 1,
  class: "empty-state"
}, u5 = { class: "empty-state-content" }, h5 = { class: "empty-icon-wrapper" }, f5 = {
  key: 1,
  class: "loading-state"
}, g5 = /* @__PURE__ */ J({
  __name: "TokenUsage",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const s = e, { isDark: n, colors: o } = lt(rt(s, "theme")), i = (u) => {
      const h = new Date(u), p = String(h.getDate()).padStart(2, "0"), v = String(h.getMonth() + 1).padStart(2, "0");
      return `${p}-${v}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, c = C(() => {
      const u = s.data?.tokens_by_day || {}, h = Object.keys(u).sort();
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const p = h.map((f) => i(f)), v = [
        {
          label: "Input Tokens",
          data: h.map((f) => u[f]?.input_tokens || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: h.map((f) => u[f]?.output_tokens || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: h.map((f) => u[f]?.cache_read_tokens || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: h.map((f) => u[f]?.cache_write_tokens || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: p,
        datasets: v
      };
    }), d = C(() => s.options ? s.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      interaction: {
        mode: "index",
        intersect: !1
      },
      plugins: {
        legend: {
          display: !0,
          position: "top",
          align: "end",
          labels: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 13,
              weight: 500
            },
            color: o.value.textSecondary,
            padding: 12,
            boxWidth: 12,
            boxHeight: 12,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "rectRounded"
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: o.value.tooltipBg,
          titleColor: o.value.tooltipText,
          bodyColor: o.value.tooltipText,
          borderColor: n.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            family: "'DM Sans', sans-serif",
            size: 13,
            weight: 600
          },
          bodyFont: {
            family: "'DM Sans', sans-serif",
            size: 12,
            weight: 500
          }
        }
      },
      scales: {
        x: {
          stacked: !0,
          border: { display: !1 },
          grid: { display: !1 },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: o.value.textSecondary,
            padding: 8
          }
        },
        y: {
          stacked: !0,
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: o.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: o.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: n }), (u, h) => (y(), x("article", Xk, [
      h[8] || (h[8] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Token Usage"),
          l("p", { class: "card-subtitle" }, "Token consumption over time (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", f5, [...h[7] || (h[7] = [
        st('<div class="loading-container" data-v-e9e355be><div class="chart-lines-loader" data-v-e9e355be><div class="line line-1" data-v-e9e355be></div><div class="line line-2" data-v-e9e355be></div><div class="line line-3" data-v-e9e355be></div><div class="line line-4" data-v-e9e355be></div><div class="line line-5" data-v-e9e355be></div></div><p class="loading-text" data-v-e9e355be>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Gk, [
        c.value.labels && c.value.labels.length ? (y(), x("section", Zk, [
          l("div", Qk, [
            Q(le, {
              data: c.value,
              options: d.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          l("footer", Jk, [
            l("div", t5, [
              h[0] || (h[0] = l("span", { class: "kpi-label" }, "Total Tokens", -1)),
              l("span", e5, $(L(X)(e.data.total_tokens)), 1)
            ]),
            l("div", a5, [
              h[1] || (h[1] = l("span", { class: "kpi-label" }, "Input", -1)),
              l("span", s5, $(L(X)(e.data.total_input_tokens)), 1)
            ]),
            l("div", n5, [
              h[2] || (h[2] = l("span", { class: "kpi-label" }, "Output", -1)),
              l("span", o5, $(L(X)(e.data.total_output_tokens)), 1)
            ]),
            l("div", i5, [
              h[3] || (h[3] = l("span", { class: "kpi-label" }, "Cache Read", -1)),
              l("span", r5, $(L(X)(e.data.total_cache_read_tokens)), 1)
            ]),
            l("div", l5, [
              h[4] || (h[4] = l("span", { class: "kpi-label" }, "Cache Write", -1)),
              l("span", c5, $(L(X)(e.data.total_cache_write_tokens)), 1)
            ])
          ])
        ])) : (y(), x("section", d5, [
          l("div", u5, [
            l("div", h5, [
              Q(L(zt), { class: "empty-icon" })
            ]),
            h[5] || (h[5] = l("p", { class: "empty-title" }, "No token usage data", -1)),
            h[6] || (h[6] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see token consumption trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), p5 = /* @__PURE__ */ nt(g5, [["__scopeId", "data-v-e9e355be"]]), v5 = { class: "conversation-count-card" }, b5 = { class: "card-header" }, m5 = { class: "header-right" }, y5 = { class: "stat-badge" }, _5 = { class: "stat-value" }, x5 = {
  key: 0,
  class: "card-body"
}, k5 = {
  key: 0,
  class: "chart-section"
}, w5 = { class: "chart-container" }, $5 = {
  key: 1,
  class: "empty-state"
}, M5 = { class: "empty-state-content" }, S5 = { class: "empty-icon-wrapper" }, C5 = {
  key: 1,
  class: "loading-state"
}, D5 = /* @__PURE__ */ J({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s, colors: n } = lt(rt(a, "theme")), o = (c) => {
      const d = new Date(c), u = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${u}`;
    };
    C(() => {
      if (a.data?.start_date && a.data?.end_date) {
        const c = o(a.data.start_date), d = o(a.data.end_date);
        return `${c} - ${d}`;
      }
      return "N/A";
    });
    const i = C(() => {
      const c = a.data?.conversations_by_day || {}, d = Object.keys(c).sort();
      if (d.length === 0)
        return { labels: [], datasets: [] };
      const u = d.map((p) => o(p)), h = [
        {
          label: "Conversations",
          data: d.map((p) => c[p] || 0),
          backgroundColor: "#a78bfa80",
          borderColor: "#a78bfa",
          borderWidth: 2,
          tension: 0.4,
          fill: !1,
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ];
      return {
        labels: u,
        datasets: h
      };
    }), r = C(() => a.options ? a.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      interaction: {
        mode: "index",
        intersect: !1
      },
      plugins: {
        legend: {
          display: !0,
          position: "top",
          align: "end",
          labels: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 13,
              weight: 500
            },
            color: n.value.textSecondary,
            padding: 12,
            boxWidth: 12,
            boxHeight: 12,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "circle"
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
          bodyColor: n.value.tooltipText,
          borderColor: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            family: "'DM Sans', sans-serif",
            size: 13,
            weight: 600
          },
          bodyFont: {
            family: "'DM Sans', sans-serif",
            size: 12,
            weight: 500
          },
          callbacks: {
            label: function(c) {
              let d = c.dataset.label || "";
              return d && (d += ": "), c.parsed.y !== null && (d += c.parsed.y), d;
            }
          }
        }
      },
      scales: {
        x: {
          border: { display: !1 },
          grid: { color: n.value.gridLines, lineWidth: 1, drawTicks: !1 },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: n.value.textSecondary,
            padding: 8
          }
        },
        y: {
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: n.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: n.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: s }), (c, d) => (y(), x("article", v5, [
      l("header", b5, [
        d[1] || (d[1] = l("div", { class: "header-left" }, [
          l("div", { class: "header-content" }, [
            l("h3", { class: "card-title" }, "Conversation Count"),
            l("p", { class: "card-subtitle" }, "Conversations over time")
          ])
        ], -1)),
        l("div", m5, [
          l("div", y5, [
            d[0] || (d[0] = l("span", { class: "stat-label" }, "Total", -1)),
            l("span", _5, $(e.data.total_conversations || 0), 1)
          ])
        ])
      ]),
      e.loading ? (y(), x("div", C5, [...d[4] || (d[4] = [
        st('<div class="loading-container" data-v-846f24b1><div class="chart-lines-loader" data-v-846f24b1><div class="line line-1" data-v-846f24b1></div><div class="line line-2" data-v-846f24b1></div><div class="line line-3" data-v-846f24b1></div><div class="line line-4" data-v-846f24b1></div><div class="line line-5" data-v-846f24b1></div></div><p class="loading-text" data-v-846f24b1>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", x5, [
        i.value.labels && i.value.labels.length ? (y(), x("section", k5, [
          l("div", w5, [
            Q(_e, {
              data: i.value,
              options: r.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", $5, [
          l("div", M5, [
            l("div", S5, [
              Q(L(zt), { class: "empty-icon" })
            ]),
            d[2] || (d[2] = l("p", { class: "empty-title" }, "No conversation count data", -1)),
            d[3] || (d[3] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), A5 = /* @__PURE__ */ nt(D5, [["__scopeId", "data-v-846f24b1"]]), T5 = { class: "top-agents-card" }, B5 = {
  key: 0,
  class: "card-body"
}, L5 = {
  key: 0,
  class: "charts-grid"
}, F5 = { class: "chart-section" }, P5 = { class: "chart-container" }, I5 = { class: "chart-section" }, R5 = { class: "chart-container" }, E5 = {
  key: 1,
  class: "empty-state"
}, O5 = { class: "empty-state-content" }, z5 = { class: "empty-icon-wrapper" }, V5 = {
  key: 1,
  class: "loading-state"
}, N5 = /* @__PURE__ */ J({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s, colors: n } = lt(rt(a, "theme")), o = C(() => a.data?.top_agents && a.data.top_agents.length > 0), i = C(() => a.data?.top_agents ? [...a.data.top_agents].sort((p, v) => (v.total_cost || 0) - (p.total_cost || 0)) : []), r = C(() => a.data?.top_agents ? [...a.data.top_agents].sort((p, v) => (v.total_tokens || 0) - (p.total_tokens || 0)) : []), c = C(() => {
      const p = i.value;
      return p.length === 0 ? { labels: [], datasets: [] } : {
        labels: p.map((v) => v.agent_type),
        datasets: [
          {
            label: "Total Cost",
            data: p.map((v) => v.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), d = C(() => {
      const p = r.value;
      return p.length === 0 ? { labels: [], datasets: [] } : {
        labels: p.map((v) => v.agent_type),
        datasets: [
          {
            label: "Total Tokens",
            data: p.map((v) => v.total_tokens || 0),
            backgroundColor: "#f59e0b80",
            borderColor: "#f59e0b",
            borderWidth: 1
          }
        ]
      };
    }), u = C(() => a.options ? a.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !1
        },
        tooltip: {
          enabled: !0,
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
          bodyColor: n.value.tooltipText,
          borderColor: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            family: "'DM Sans', sans-serif",
            size: 13,
            weight: 600
          },
          bodyFont: {
            family: "'DM Sans', sans-serif",
            size: 12,
            weight: 500
          },
          callbacks: {
            title: function(p) {
              return p[0]?.label || "";
            },
            label: function(p) {
              const v = p.label, f = a.data?.top_agents?.find((m) => m.agent_type === v);
              return f ? [
                `Total Cost: ${bt(f.total_cost)}`,
                `Input Cost: ${bt(f.total_input_tokens_cost)}`,
                `Output Cost: ${bt(f.total_output_tokens_cost)}`,
                `Cache Read: ${bt(f.total_read_tokens_cost)}`,
                `Cache Write: ${bt(f.total_write_tokens_cost)}`
              ] : "No data";
            }
          }
        }
      },
      scales: {
        x: {
          border: { display: !1 },
          grid: { display: !1 },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: n.value.textSecondary,
            padding: 8
          }
        },
        y: {
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: n.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: n.value.textSecondary,
            padding: 8,
            callback: function(p) {
              return bt(p);
            }
          }
        }
      }
    }), h = C(() => a.options ? a.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !1
        },
        tooltip: {
          enabled: !0,
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
          bodyColor: n.value.tooltipText,
          borderColor: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            family: "'DM Sans', sans-serif",
            size: 13,
            weight: 600
          },
          bodyFont: {
            family: "'DM Sans', sans-serif",
            size: 12,
            weight: 500
          },
          callbacks: {
            title: function(p) {
              return p[0]?.label || "";
            },
            label: function(p) {
              const v = p.label, f = a.data?.top_agents?.find((m) => m.agent_type === v);
              return f ? [
                `Total Tokens: ${f.total_tokens.toLocaleString()}`,
                `Input Tokens: ${f.total_input_tokens.toLocaleString()}`,
                `Output Tokens: ${f.total_output_tokens.toLocaleString()}`,
                `Cache Read: ${f.total_read_tokens.toLocaleString()}`,
                `Cache Write: ${f.total_write_tokens.toLocaleString()}`
              ] : "No data";
            }
          }
        }
      },
      scales: {
        x: {
          border: { display: !1 },
          grid: { display: !1 },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: n.value.textSecondary,
            padding: 8
          }
        },
        y: {
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: n.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: n.value.textSecondary,
            padding: 8,
            callback: function(p) {
              return p.toLocaleString();
            }
          }
        }
      }
    });
    return t({ isDark: s }), (p, v) => (y(), x("article", T5, [
      v[5] || (v[5] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Top Agents Analysis"),
          l("p", { class: "card-subtitle" }, "Cost and token usage by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", V5, [...v[4] || (v[4] = [
        st('<div class="loading-container" data-v-78efa6dc><div class="chart-lines-loader" data-v-78efa6dc><div class="line line-1" data-v-78efa6dc></div><div class="line line-2" data-v-78efa6dc></div><div class="line line-3" data-v-78efa6dc></div><div class="line line-4" data-v-78efa6dc></div><div class="line line-5" data-v-78efa6dc></div></div><p class="loading-text" data-v-78efa6dc>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", B5, [
        o.value ? (y(), x("div", L5, [
          l("section", F5, [
            v[0] || (v[0] = l("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
            l("div", P5, [
              Q(le, {
                data: c.value,
                options: u.value
              }, null, 8, ["data", "options"])
            ])
          ]),
          l("section", I5, [
            v[1] || (v[1] = l("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
            l("div", R5, [
              Q(le, {
                data: d.value,
                options: h.value
              }, null, 8, ["data", "options"])
            ])
          ])
        ])) : (y(), x("section", E5, [
          l("div", O5, [
            l("div", z5, [
              Q(L(zt), { class: "empty-icon" })
            ]),
            v[2] || (v[2] = l("p", { class: "empty-title" }, "No top agents data", -1)),
            v[3] || (v[3] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), W5 = /* @__PURE__ */ nt(N5, [["__scopeId", "data-v-78efa6dc"]]), H5 = { class: "top-agents-card" }, j5 = {
  key: 0,
  class: "card-body"
}, Y5 = {
  key: 0,
  class: "chart-section"
}, q5 = { class: "chart-container" }, U5 = {
  key: 1,
  class: "empty-state"
}, K5 = { class: "empty-state-content" }, X5 = { class: "empty-icon-wrapper" }, G5 = {
  key: 1,
  class: "loading-state"
}, Z5 = /* @__PURE__ */ J({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s, colors: n } = lt(rt(a, "theme")), o = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, i = C(() => a.data?.top_agents ? a.data.top_agents.filter(
      (h) => h.agent_type?.toLowerCase() !== "triage"
    ) : []), r = C(() => i.value.length > 0), c = C(() => i.value.reduce((h, p) => h + (p.conversations || 0), 0)), d = C(() => {
      const h = i.value;
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const p = h.map((m) => {
        const _ = m.agent_type?.toLowerCase();
        return (o[_] || "#a78bfa") + "80";
      }), v = h.map((m) => {
        const _ = m.agent_type?.toLowerCase();
        return o[_] || "#a78bfa";
      });
      return {
        labels: h.map((m) => {
          const _ = m.conversations || 0, g = c.value ? _ / c.value * 100 : 0;
          return `${m.agent_type} - ${_.toLocaleString()} (${g.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((m) => m.conversations || 0),
            backgroundColor: p,
            borderColor: v,
            borderWidth: 2
          }
        ]
      };
    }), u = C(() => a.options ? a.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: n.value.textSecondary,
            usePointStyle: !0,
            padding: 16,
            boxWidth: 8,
            boxHeight: 8
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
          bodyColor: n.value.tooltipText,
          borderColor: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            family: "'DM Sans', sans-serif",
            size: 13,
            weight: 600
          },
          bodyFont: {
            family: "'DM Sans', sans-serif",
            size: 12,
            weight: 500
          },
          callbacks: {
            label: (h) => {
              const p = (h.label || "").toString(), v = Number(h.parsed) || 0, f = (h.dataset.data || []).reduce((_, g) => _ + (Number(g) || 0), 0), m = f ? v / f * 100 : 0;
              return `${p}: ${v.toLocaleString()} (${m.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: s }), (h, p) => (y(), x("article", H5, [
      p[3] || (p[3] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Top Agents"),
          l("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", G5, [...p[2] || (p[2] = [
        st('<div class="loading-container" data-v-05e3e74d><div class="chart-lines-loader" data-v-05e3e74d><div class="line line-1" data-v-05e3e74d></div><div class="line line-2" data-v-05e3e74d></div><div class="line line-3" data-v-05e3e74d></div><div class="line line-4" data-v-05e3e74d></div><div class="line line-5" data-v-05e3e74d></div></div><p class="loading-text" data-v-05e3e74d>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", j5, [
        r.value ? (y(), x("section", Y5, [
          l("div", q5, [
            Q(Qa, {
              data: d.value,
              options: u.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", U5, [
          l("div", K5, [
            l("div", X5, [
              Q(L(zt), { class: "empty-icon" })
            ]),
            p[0] || (p[0] = l("p", { class: "empty-title" }, "No top agents data", -1)),
            p[1] || (p[1] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Q5 = /* @__PURE__ */ nt(Z5, [["__scopeId", "data-v-05e3e74d"]]), J5 = { class: "daily-cost-trends-card" }, tw = {
  key: 0,
  class: "card-body"
}, ew = {
  key: 0,
  class: "chart-section"
}, aw = { class: "chart-container" }, sw = {
  key: 1,
  class: "empty-state"
}, nw = { class: "empty-state-content" }, ow = { class: "empty-icon-wrapper" }, iw = {
  key: 1,
  class: "loading-state"
}, rw = /* @__PURE__ */ J({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s, colors: n } = lt(rt(a, "theme")), o = (d) => {
      const u = new Date(d), h = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = C(() => {
      const d = a.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(d) && d.length > 0)
        return !0;
      const u = a.costData?.costs_by_day || {}, h = a.conversationData?.conversations_by_day || {};
      return Object.keys(u).length > 0 && Object.keys(h).length > 0;
    }), r = C(() => {
      const d = a.costData?.daily_mean_cost_per_conversation || [];
      if (d.length > 0) {
        const _ = [...d].sort((g, b) => g.date.localeCompare(b.date));
        return {
          labels: _.map((g) => o(g.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: _.map((g) => Number(g.value) || 0),
              backgroundColor: "#a78bfa80",
              borderColor: "#a78bfa",
              borderWidth: 2,
              tension: 0.4,
              fill: !1,
              pointRadius: 5,
              pointHoverRadius: 7,
              pointBackgroundColor: "#ffffff",
              pointBorderWidth: 2
            }
          ]
        };
      }
      const u = a.costData?.costs_by_day || {}, h = a.conversationData?.conversations_by_day || {}, v = Object.keys(u).filter((_) => h[_]).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const f = v.map((_) => o(_)), m = v.map((_) => {
        const g = u[_]?.total_cost || 0, b = h[_] || 0;
        return b > 0 ? g / b : 0;
      });
      return {
        labels: f,
        datasets: [
          {
            label: "Mean USD/conv",
            data: m,
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 2,
            tension: 0.4,
            fill: !1,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: "#ffffff",
            pointBorderWidth: 2
          }
        ]
      };
    }), c = C(() => a.options ? a.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      interaction: {
        mode: "index",
        intersect: !1
      },
      plugins: {
        legend: {
          display: !0,
          position: "top",
          align: "center",
          labels: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 13,
              weight: 500
            },
            color: n.value.textSecondary,
            padding: 12,
            boxWidth: 40,
            boxHeight: 12,
            borderRadius: 4,
            usePointStyle: !1
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
          bodyColor: n.value.tooltipText,
          borderColor: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            family: "'DM Sans', sans-serif",
            size: 13,
            weight: 600
          },
          bodyFont: {
            family: "'DM Sans', sans-serif",
            size: 12,
            weight: 500
          },
          callbacks: {
            label: function(d) {
              let u = d.dataset.label || "";
              return u && (u += ": "), d.parsed.y !== null && (u += bt(d.parsed.y)), u;
            }
          }
        }
      },
      scales: {
        x: {
          border: { display: !1 },
          grid: { color: n.value.gridLines, lineWidth: 1, drawTicks: !1 },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: n.value.textSecondary,
            padding: 8
          }
        },
        y: {
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: n.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: n.value.textSecondary,
            padding: 8,
            callback: function(d) {
              return bt(d);
            }
          }
        }
      }
    });
    return t({ isDark: s }), (d, u) => (y(), x("article", J5, [
      u[3] || (u[3] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Daily Cost Trends"),
          l("p", { class: "card-subtitle" }, "Mean USD/conversation per day")
        ])
      ], -1)),
      e.loading ? (y(), x("div", iw, [...u[2] || (u[2] = [
        st('<div class="loading-container" data-v-e5bac1c5><div class="chart-lines-loader" data-v-e5bac1c5><div class="line line-1" data-v-e5bac1c5></div><div class="line line-2" data-v-e5bac1c5></div><div class="line line-3" data-v-e5bac1c5></div><div class="line line-4" data-v-e5bac1c5></div><div class="line line-5" data-v-e5bac1c5></div></div><p class="loading-text" data-v-e5bac1c5>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", tw, [
        i.value ? (y(), x("section", ew, [
          l("div", aw, [
            Q(_e, {
              data: r.value,
              options: c.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", sw, [
          l("div", nw, [
            l("div", ow, [
              Q(L(zt), { class: "empty-icon" })
            ]),
            u[0] || (u[0] = l("p", { class: "empty-title" }, "No daily cost trends data", -1)),
            u[1] || (u[1] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), lw = /* @__PURE__ */ nt(rw, [["__scopeId", "data-v-e5bac1c5"]]), cw = { class: "model-usage-card" }, dw = {
  key: 0,
  class: "loading-state"
}, uw = {
  key: 1,
  class: "card-body"
}, hw = { class: "tabs-container" }, fw = {
  class: "tabs-nav",
  "aria-label": "Model Usage Tabs"
}, gw = ["aria-selected"], pw = ["aria-selected"], vw = {
  key: 0,
  class: "table-section"
}, bw = { class: "table-wrapper" }, mw = { class: "data-table" }, yw = { class: "table-header-row" }, _w = { class: "table-header" }, xw = { class: "table-body" }, kw = { class: "table-cell name-cell" }, ww = { class: "table-cell text-center" }, $w = { class: "table-cell text-center" }, Mw = { class: "table-cell text-center" }, Sw = { class: "table-cell text-center cost-cell" }, Cw = { class: "table-cell text-center" }, Dw = {
  key: 1,
  class: "empty-state"
}, Aw = { class: "empty-state-content" }, Tw = { class: "empty-icon-wrapper" }, Bw = /* @__PURE__ */ J({
  __name: "ModelUsage",
  props: {
    data: { default: () => ({
      total_by_provider: {},
      total_by_model: {}
    }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const s = e, n = a, o = (h) => {
      n("export", h);
    }, { isDark: i } = lt(rt(s, "theme")), r = at("by_model"), c = C(() => r.value === "by_model" ? s.data?.total_by_model || {} : s.data?.total_by_provider || {}), d = (h) => h == null ? "0" : X(h), u = (h) => h == null ? "$0.00" : bt(h);
    return t({ isDark: i }), (h, p) => (y(), x("article", cw, [
      p[10] || (p[10] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Model Usage"),
          l("p", { class: "card-subtitle" }, "AI model performance and costs")
        ])
      ], -1)),
      e.loading ? (y(), x("div", dw, [...p[2] || (p[2] = [
        st('<div class="loading-container" data-v-a7bf2d7b><div class="chart-bars-loader" data-v-a7bf2d7b><div class="bar bar-1" data-v-a7bf2d7b></div><div class="bar bar-2" data-v-a7bf2d7b></div><div class="bar bar-3" data-v-a7bf2d7b></div><div class="bar bar-4" data-v-a7bf2d7b></div><div class="bar bar-5" data-v-a7bf2d7b></div></div><p class="loading-text" data-v-a7bf2d7b>Loading model usage data...</p></div>', 1)
      ])])) : (y(), x("div", uw, [
        l("div", hw, [
          l("nav", fw, [
            l("button", {
              onClick: p[0] || (p[0] = (v) => r.value = "by_model"),
              class: q(["tab-button", { "tab-active": r.value === "by_model" }]),
              "aria-selected": r.value === "by_model",
              role: "tab"
            }, " Model ", 10, gw),
            l("button", {
              onClick: p[1] || (p[1] = (v) => r.value = "by_provider"),
              class: q(["tab-button", { "tab-active": r.value === "by_provider" }]),
              "aria-selected": r.value === "by_provider",
              role: "tab"
            }, " Provider ", 10, pw)
          ])
        ]),
        c.value && Object.keys(c.value).length > 0 ? (y(), x("div", vw, [
          l("div", bw, [
            l("table", mw, [
              l("thead", null, [
                l("tr", yw, [
                  l("th", _w, $(r.value === "by_model" ? "Model" : "Provider"), 1),
                  p[3] || (p[3] = l("th", { class: "table-header" }, "Avg cost per message", -1)),
                  p[4] || (p[4] = l("th", { class: "table-header" }, "Avg tokens per message", -1)),
                  p[5] || (p[5] = l("th", { class: "table-header" }, "Message count", -1)),
                  p[6] || (p[6] = l("th", { class: "table-header" }, "Total cost", -1)),
                  p[7] || (p[7] = l("th", { class: "table-header" }, "Total tokens", -1))
                ])
              ]),
              l("tbody", xw, [
                (y(!0), x(K, null, tt(c.value, (v, f) => (y(), x("tr", {
                  key: f,
                  class: "table-row"
                }, [
                  l("td", kw, $(f), 1),
                  l("td", ww, $(u(v.avg_cost_per_message)), 1),
                  l("td", $w, $(d(v.avg_tokens_per_message)), 1),
                  l("td", Mw, $(d(v.message_count)), 1),
                  l("td", Sw, $(u(v.total_cost)), 1),
                  l("td", Cw, $(d(v.total_tokens)), 1)
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), dt(L(kt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (y(), x("div", Dw, [
          l("div", Aw, [
            l("div", Tw, [
              Q(L(zt), { class: "empty-icon" })
            ]),
            p[8] || (p[8] = l("p", { class: "empty-title" }, "No model usage data available", -1)),
            p[9] || (p[9] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Lw = /* @__PURE__ */ nt(Bw, [["__scopeId", "data-v-a7bf2d7b"]]), Fw = { class: "message-roles-card" }, Pw = {
  key: 0,
  class: "loading-state"
}, Iw = {
  key: 1,
  class: "card-body"
}, Rw = {
  key: 0,
  class: "table-section"
}, Ew = { class: "table-wrapper" }, Ow = { class: "data-table" }, zw = { class: "table-body" }, Vw = { class: "table-cell name-cell" }, Nw = { class: "table-cell text-center" }, Ww = { class: "table-cell text-center" }, Hw = { class: "table-cell text-center" }, jw = { class: "table-cell text-center cost-cell" }, Yw = { class: "table-cell text-center" }, qw = {
  key: 1,
  class: "empty-state"
}, Uw = { class: "empty-state-content" }, Kw = { class: "empty-icon-wrapper" }, Xw = /* @__PURE__ */ J({
  __name: "MessageRoles",
  props: {
    data: { default: () => ({
      total_by_role: {}
    }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const s = e, n = a, o = (v) => {
      n("export", v);
    }, { isDark: i } = lt(rt(s, "theme")), r = ["assistant", "system", "user"], c = C(() => s.data?.total_by_role || {}), d = C(() => Object.keys(c.value).length > 0), u = (v) => v == null ? "0" : X(v), h = (v) => v == null ? "$0.00" : bt(v), p = (v) => v.charAt(0).toUpperCase() + v.slice(1);
    return t({ isDark: i }), (v, f) => (y(), x("article", Fw, [
      f[4] || (f[4] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Message Roles"),
          l("p", { class: "card-subtitle" }, "Performance by message role")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Pw, [...f[0] || (f[0] = [
        st('<div class="loading-container" data-v-6a953cfc><div class="chart-bars-loader" data-v-6a953cfc><div class="bar bar-1" data-v-6a953cfc></div><div class="bar bar-2" data-v-6a953cfc></div><div class="bar bar-3" data-v-6a953cfc></div><div class="bar bar-4" data-v-6a953cfc></div><div class="bar bar-5" data-v-6a953cfc></div></div><p class="loading-text" data-v-6a953cfc>Loading message role data...</p></div>', 1)
      ])])) : (y(), x("div", Iw, [
        d.value ? (y(), x("div", Rw, [
          l("div", Ew, [
            l("table", Ow, [
              f[1] || (f[1] = l("thead", null, [
                l("tr", { class: "table-header-row" }, [
                  l("th", { class: "table-header" }, "Role"),
                  l("th", { class: "table-header" }, "Avg cost per message"),
                  l("th", { class: "table-header" }, "Avg tokens per message"),
                  l("th", { class: "table-header" }, "Message count"),
                  l("th", { class: "table-header" }, "Total cost"),
                  l("th", { class: "table-header" }, "Total tokens")
                ])
              ], -1)),
              l("tbody", zw, [
                (y(), x(K, null, tt(r, (m) => l("tr", {
                  key: m,
                  class: "table-row"
                }, [
                  l("td", Vw, $(p(m)), 1),
                  l("td", Nw, $(h(c.value[m]?.avg_cost_per_message)), 1),
                  l("td", Ww, $(u(c.value[m]?.avg_tokens_per_message)), 1),
                  l("td", Hw, $(u(c.value[m]?.message_count)), 1),
                  l("td", jw, $(h(c.value[m]?.total_cost)), 1),
                  l("td", Yw, $(u(c.value[m]?.total_tokens)), 1)
                ])), 64))
              ])
            ])
          ]),
          e.enableExport ? (y(), dt(L(kt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (y(), x("div", qw, [
          l("div", Uw, [
            l("div", Kw, [
              Q(L(zt), { class: "empty-icon" })
            ]),
            f[2] || (f[2] = l("p", { class: "empty-title" }, "No message role data available", -1)),
            f[3] || (f[3] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Gw = /* @__PURE__ */ nt(Xw, [["__scopeId", "data-v-6a953cfc"]]), Zw = { class: "cost-per-conversation-card" }, Qw = {
  key: 0,
  class: "card-body"
}, Jw = {
  key: 0,
  class: "chart-section"
}, t$ = { class: "chart-container" }, e$ = { class: "kpi-grid" }, a$ = { class: "kpi-card" }, s$ = { class: "kpi-value" }, n$ = { class: "kpi-card" }, o$ = { class: "kpi-value" }, i$ = { class: "kpi-card" }, r$ = { class: "kpi-value" }, l$ = { class: "kpi-card highlighted" }, c$ = { class: "kpi-value gradient-text" }, d$ = {
  key: 1,
  class: "empty-state"
}, u$ = { class: "empty-state-content" }, h$ = { class: "empty-icon-wrapper" }, f$ = {
  key: 1,
  class: "loading-state"
}, g$ = /* @__PURE__ */ J({
  __name: "CostPerConversations",
  props: {
    data: { default: () => ({ top_agents: [] }) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const s = e, n = a, o = (b) => {
      n("export", b);
    }, { isDark: i, colors: r } = lt(rt(s, "theme")), c = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      customer_service: "#8b5cf6",
      booking_assistant: "#06b6d4",
      flight_info: "#f59e0b",
      support: "#10b981"
    }, d = (b) => b.agent_type || b.agent_id || b.agent_name || "", u = (b) => b.agent_name ? b.agent_name : d(b).split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ").replace(/V\d+$/, "").trim(), h = (b) => {
      const k = d(b).toLowerCase();
      for (const [w, M] of Object.entries(c))
        if (k.includes(w))
          return M;
      return "#9ca3af";
    }, p = C(() => [...s.data?.top_agents || []].sort((k, w) => w.avg_cost_per_conversation - k.avg_cost_per_conversation)), v = C(() => s.data?.total_conversations !== void 0 ? Number(s.data.total_conversations) || 0 : p.value.reduce((b, k) => b + k.conversations, 0)), f = C(() => s.data?.total_cost !== void 0 ? Number(s.data.total_cost) || 0 : p.value.reduce((b, k) => b + k.total_cost, 0)), m = C(() => s.data?.overall_avg_cost_per_conversation !== void 0 ? Number(s.data.overall_avg_cost_per_conversation) || 0 : v.value === 0 ? 0 : f.value / v.value), _ = C(() => {
      const b = p.value;
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const k = b.map((S) => u(S)), w = b.map((S) => S.avg_cost_per_conversation), M = b.map((S) => h(S));
      return {
        labels: k,
        datasets: [
          {
            label: "USD per conversation",
            data: w,
            backgroundColor: M.map((S) => `${S}80`),
            borderColor: M,
            borderWidth: 1
          }
        ]
      };
    }), g = C(() => s.options ? s.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      indexAxis: "y",
      // Barras horizontales
      plugins: {
        legend: {
          display: !1
        },
        tooltip: {
          enabled: !0,
          backgroundColor: r.value.tooltipBg,
          titleColor: r.value.tooltipText,
          bodyColor: r.value.tooltipText,
          borderColor: i.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            family: "'DM Sans', sans-serif",
            size: 13,
            weight: 600
          },
          bodyFont: {
            family: "'DM Sans', sans-serif",
            size: 12,
            weight: 500
          },
          callbacks: {
            label: function(b) {
              const k = p.value[b.dataIndex];
              return [
                `Cost: ${bt(b.parsed.x)}`,
                `Conversations: ${X(k.conversations)}`,
                `Total Cost: ${bt(k.total_cost)}`
              ];
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: r.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: r.value.textSecondary,
            padding: 8,
            callback: function(b) {
              return bt(b);
            }
          }
        },
        y: {
          border: { display: !1 },
          grid: { color: r.value.gridLines, lineWidth: 1, drawTicks: !1 },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: r.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: i }), (b, k) => (y(), x("article", Zw, [
      k[7] || (k[7] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Cost Per Conversation"),
          l("p", { class: "card-subtitle" }, "USD per conversation by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", f$, [...k[6] || (k[6] = [
        st('<div class="loading-container" data-v-17f6615c><div class="chart-bars-loader" data-v-17f6615c><div class="bar bar-1" data-v-17f6615c></div><div class="bar bar-2" data-v-17f6615c></div><div class="bar bar-3" data-v-17f6615c></div><div class="bar bar-4" data-v-17f6615c></div><div class="bar bar-5" data-v-17f6615c></div></div><p class="loading-text" data-v-17f6615c>Loading agent costs...</p></div>', 1)
      ])])) : (y(), x("div", Qw, [
        _.value.labels && _.value.labels.length ? (y(), x("section", Jw, [
          l("div", t$, [
            Q(le, {
              data: _.value,
              options: g.value
            }, null, 8, ["data", "options"])
          ]),
          l("footer", e$, [
            l("div", a$, [
              k[0] || (k[0] = l("span", { class: "kpi-label" }, "Total Agents", -1)),
              l("span", s$, $(p.value.length), 1)
            ]),
            l("div", n$, [
              k[1] || (k[1] = l("span", { class: "kpi-label" }, "Total Conversations", -1)),
              l("span", o$, $(L(X)(v.value)), 1)
            ]),
            l("div", i$, [
              k[2] || (k[2] = l("span", { class: "kpi-label" }, "Total Cost", -1)),
              l("span", r$, $(L(bt)(f.value)), 1)
            ]),
            l("div", l$, [
              k[3] || (k[3] = l("span", { class: "kpi-label" }, "Avg Cost / Conv.", -1)),
              l("span", c$, $(L(bt)(m.value)), 1)
            ])
          ]),
          e.enableExport ? (y(), dt(L(kt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (y(), x("section", d$, [
          l("div", u$, [
            l("div", h$, [
              Q(L(zt), { class: "empty-icon" })
            ]),
            k[4] || (k[4] = l("p", { class: "empty-title" }, "No cost per conversation data", -1)),
            k[5] || (k[5] = l("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), p$ = /* @__PURE__ */ nt(g$, [["__scopeId", "data-v-17f6615c"]]);
function At() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const v$ = { class: "tabs text-sm" }, b$ = ["aria-label"], m$ = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], y$ = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, _$ = /* @__PURE__ */ J({
  name: "Tabs",
  __name: "Tabs",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Tabs" },
    fullWidth: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change", "tab-click"],
  setup(e, { emit: t }) {
    const a = e, s = t, n = at([]), o = `tabs-${At()}`, i = (f) => `${o}-tab-${f}`, r = C(
      () => a.items.map((f, m) => f.disabled ? -1 : m).filter((f) => f >= 0)
    );
    function c(f) {
      return f.value === a.modelValue;
    }
    function d(f) {
      const m = c(f), g = `${a.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-full min-h-0 cursor-pointer rounded-lg border border-transparent text-center outline-none transition-[background-color,color,box-shadow,opacity,transform] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return f.disabled ? `${g} cursor-not-allowed opacity-40` : m ? `${g} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${g} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function u(f, m) {
      f === m || a.items.find((g) => g.value === f)?.disabled || (s("update:modelValue", f), s("change", { value: f, previousValue: m }));
    }
    function h(f, m) {
      s("tab-click", { value: f.value, originalEvent: m }), !f.disabled && (u(f.value, a.modelValue), St(() => {
        n.value[a.items.indexOf(f)]?.focus();
      }));
    }
    function p(f, m) {
      const _ = a.items.length;
      if (_ === 0) return 0;
      let g = f;
      for (let b = 0; b < _; b++)
        if (g = (g + m + _) % _, !a.items[g]?.disabled) return g;
      return f;
    }
    async function v(f, m) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(f.key)) return;
      f.preventDefault();
      let g = m;
      f.key === "ArrowLeft" ? g = p(m, -1) : f.key === "ArrowRight" ? g = p(m, 1) : f.key === "Home" ? g = r.value[0] ?? 0 : f.key === "End" && (g = r.value[r.value.length - 1] ?? m);
      const b = a.items[g];
      !b || b.disabled || (u(b.value, a.modelValue), await St(), n.value[g]?.focus());
    }
    return (f, m) => (y(), x("div", v$, [
      l("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: q([
          "box-border h-10 flex-wrap items-stretch gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 p-0.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (y(!0), x(K, null, tt(e.items, (_, g) => (y(), x("button", {
          id: i(_.value),
          key: _.value,
          ref_for: !0,
          ref_key: "tabRefs",
          ref: n,
          type: "button",
          role: "tab",
          "aria-selected": c(_),
          "aria-disabled": _.disabled === !0,
          tabindex: c(_) ? 0 : -1,
          class: q(d(_)),
          onClick: (b) => h(_, b),
          onKeydown: (b) => v(b, g)
        }, [
          l("span", {
            class: q(["flex h-full min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            _.icon ? (y(), dt(ca(_.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : I("", !0),
            l("span", y$, $(_.label), 1)
          ], 2)
        ], 42, m$))), 128))
      ], 10, b$),
      f.$slots.default ? (y(), dt(Is, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: ze(() => [
          (y(), x("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            Rt(f.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : I("", !0)
    ]));
  }
}), x$ = /* @__PURE__ */ nt(_$, [["__scopeId", "data-v-0cc67b12"]]), k$ = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, w$ = { class: "overflow-x-auto" }, $$ = { class: "kiut-table w-full min-w-[640px] border-collapse text-left text-sm" }, M$ = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, S$ = {
  key: 0,
  scope: "col",
  class: "w-12 px-4 py-3 text-center align-middle"
}, C$ = ["checked", "aria-label"], D$ = {
  key: 0,
  class: "w-12 bg-transparent px-4 py-3 text-center align-middle"
}, A$ = ["checked", "aria-label", "onChange"], T$ = /* @__PURE__ */ J({
  name: "Table",
  __name: "Table",
  props: {
    columns: {},
    rows: {},
    selectable: { type: Boolean, default: !1 },
    rowKey: { type: [String, Function], default: "id" },
    selectedKeys: { default: () => [] },
    ariaLabelSelectAll: { default: "Seleccionar todas las filas" },
    ariaLabelSelectRow: { default: "Seleccionar fila" }
  },
  emits: ["update:selectedKeys"],
  setup(e, { emit: t }) {
    const a = e, s = t, n = at(null);
    function o(b) {
      return `cell-${b}`;
    }
    function i(b) {
      return b === "center" ? "text-center" : b === "right" ? "text-right" : "text-left";
    }
    function r(b, k) {
      if (typeof a.rowKey == "function")
        return a.rowKey(b);
      const w = b[a.rowKey];
      return w != null ? String(w) : `__index_${k}`;
    }
    function c(b, k) {
      return b[k];
    }
    function d(b) {
      return b == null || typeof b == "object" ? "" : String(b);
    }
    function u(b, k) {
      return r(b, k);
    }
    const h = C(() => a.rows.map((b, k) => r(b, k)));
    function p(b, k) {
      const w = r(b, k);
      return a.selectedKeys.includes(w);
    }
    const v = C(() => !a.selectable || a.rows.length === 0 ? !1 : h.value.every((b) => a.selectedKeys.includes(b))), f = C(() => {
      if (!a.selectable || a.rows.length === 0) return !1;
      const b = h.value.filter((k) => a.selectedKeys.includes(k));
      return b.length > 0 && b.length < a.rows.length;
    });
    Ft(
      [f, v, () => a.selectable],
      async () => {
        await St();
        const b = n.value;
        b && (b.indeterminate = f.value && !v.value);
      },
      { immediate: !0 }
    );
    function m() {
      if (a.selectable)
        if (v.value) {
          const b = a.selectedKeys.filter((k) => !h.value.includes(k));
          s("update:selectedKeys", b);
        } else {
          const b = new Set(a.selectedKeys);
          h.value.forEach((k) => b.add(k)), s("update:selectedKeys", [...b]);
        }
    }
    function _(b, k) {
      if (!a.selectable) return;
      const w = r(b, k);
      a.selectedKeys.includes(w) ? s(
        "update:selectedKeys",
        a.selectedKeys.filter((S) => S !== w)
      ) : s("update:selectedKeys", [...a.selectedKeys, w]);
    }
    function g(b, k) {
      const w = r(b, k);
      return `${a.ariaLabelSelectRow} ${w}`;
    }
    return (b, k) => (y(), x("div", k$, [
      l("div", w$, [
        l("table", $$, [
          l("thead", null, [
            l("tr", M$, [
              e.selectable ? (y(), x("th", S$, [
                l("input", {
                  ref_key: "selectAllRef",
                  ref: n,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: v.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: m
                }, null, 40, C$)
              ])) : I("", !0),
              (y(!0), x(K, null, tt(e.columns, (w) => (y(), x("th", {
                key: w.key,
                scope: "col",
                class: q([
                  "px-4 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  w.headerClass ?? "",
                  "!text-left"
                ])
              }, $(w.label), 3))), 128))
            ])
          ]),
          l("tbody", null, [
            (y(!0), x(K, null, tt(e.rows, (w, M) => (y(), x("tr", {
              key: u(w, M),
              class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]"
            }, [
              e.selectable ? (y(), x("td", D$, [
                l("input", {
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: p(w, M),
                  "aria-label": g(w, M),
                  onChange: (S) => _(w, M)
                }, null, 40, A$)
              ])) : I("", !0),
              (y(!0), x(K, null, tt(e.columns, (S) => (y(), x("td", {
                key: S.key,
                class: q([
                  "bg-transparent px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                  i(S.align),
                  S.cellClass ?? ""
                ])
              }, [
                Rt(b.$slots, o(S.key), {
                  row: w,
                  column: S,
                  value: c(w, S.key)
                }, () => [
                  xt($(d(c(w, S.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), B$ = /* @__PURE__ */ nt(T$, [["__scopeId", "data-v-1928de95"]]);
function L$(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    l("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function F$(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    l("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const P$ = ["aria-label"], I$ = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, R$ = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, E$ = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, O$ = ["aria-label", "aria-expanded", "aria-controls", "onClick"], z$ = { class: "truncate" }, V$ = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, N$ = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, W$ = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, H$ = ["aria-label", "onClick"], j$ = ["aria-label", "onClick"], Y$ = ["aria-label"], q$ = ["aria-label"], U$ = {
  key: 1,
  class: "space-y-2"
}, K$ = ["for"], X$ = ["id", "placeholder", "onKeydown"], G$ = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, Z$ = ["aria-label"], Q$ = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, J$ = ["checked", "onChange"], t4 = { class: "min-w-0 flex-1" }, e4 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, a4 = { class: "flex flex-wrap items-end gap-2" }, s4 = { class: "min-w-[120px] flex-1" }, n4 = ["for"], o4 = ["id"], i4 = { class: "min-w-[120px] flex-1" }, r4 = ["for"], l4 = ["id"], c4 = /* @__PURE__ */ J({
  name: "Filters",
  __name: "Filters",
  props: {
    filterDefinitions: {},
    modelValue: {},
    label: { default: "Filtros:" },
    clearLabel: { default: "Limpiar filtros" },
    regionAriaLabel: { default: "Filtros" }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: t }) {
    const a = e, s = t, n = zo(), i = `${`kiut-filters-${At()}`}-panel`, r = at(null), c = /* @__PURE__ */ new Map(), d = at(null), u = at(!1), h = at({}), p = at(null), v = at(""), f = at([]), m = at(""), _ = at(""), g = C(() => d.value ? a.filterDefinitions.find((R) => R.id === d.value) ?? null : null), b = C(() => {
      const R = g.value;
      if (R)
        return R.type === "text" ? v.value : R.type === "select" ? f.value : { start: m.value, end: _.value };
    });
    function k(R, W) {
      W && W instanceof HTMLElement ? c.set(R, W) : c.delete(R);
    }
    function w(R) {
      return a.modelValue[R];
    }
    function M(R) {
      if (R == null) return [];
      if (Array.isArray(R))
        return R.filter((W) => typeof W == "string" && W.trim() !== "");
      if (typeof R == "string") {
        const W = R.trim();
        return W ? [W] : [];
      }
      return [];
    }
    function S(R, W) {
      if (W == null) return !0;
      if (R.type === "text") return String(W).trim() === "";
      if (R.type === "select") return M(W).length === 0;
      if (R.type === "dateRange") {
        const G = W;
        return !G?.start?.trim() || !G?.end?.trim();
      }
      return !0;
    }
    const D = C(
      () => a.filterDefinitions.some((R) => !S(R, w(R.id)))
    ), A = C(() => {
      const R = [];
      for (const W of a.filterDefinitions) {
        const G = w(W.id);
        if (!S(W, G)) {
          if (W.type === "text")
            R.push({ kind: "text", def: W, key: W.id });
          else if (W.type === "dateRange")
            R.push({ kind: "dateRange", def: W, key: W.id });
          else if (W.type === "select")
            for (const ut of M(G))
              R.push({
                kind: "select",
                def: W,
                optionValue: ut,
                key: `${W.id}::${ut}`
              });
        }
      }
      return R;
    });
    function T(R) {
      return R.type !== "select" ? 0 : M(w(R.id)).length;
    }
    function B(R) {
      const W = w(R.id), G = R.label.replace(/^\+\s*/, "");
      if (R.type === "text") return `${G}: ${String(W ?? "").trim()}`;
      if (R.type === "select") {
        const Ki = M(W).map((an) => R.options.find((Xi) => Xi.value === an)?.label ?? an);
        return `${G}: ${Ki.join(", ")}`;
      }
      const ut = W, Nt = E(ut.start), fe = E(ut.end);
      return `${G}: ${Nt} – ${fe}`;
    }
    function F(R) {
      return R.kind === "text" || R.kind === "dateRange" ? B(R.def) : R.def.options.find((G) => G.value === R.optionValue)?.label ?? R.optionValue;
    }
    function E(R) {
      if (!R) return "";
      const W = Dt(R, "YYYY-MM-DD", !0);
      return W.isValid() ? W.format("L") : R;
    }
    function N(R) {
      const W = d.value === R.id && u.value, G = !S(R, w(R.id));
      return W || G ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-slate-400/90 text-[color:var(--kiut-text-secondary)] hover:border-[color:var(--kiut-primary)]/50 hover:bg-slate-50 dark:border-slate-500 dark:text-slate-400 dark:hover:border-[color:var(--kiut-primary-light)]/40 dark:hover:bg-white/[0.04]";
    }
    function Y(R) {
      return S(R, w(R.id)) ? he(R) : `Editar filtro ${R.label.replace(/^\+\s*/, "")}`;
    }
    function P(R) {
      const W = w(R.id);
      if (R.type === "text") {
        v.value = W != null ? String(W) : "";
        return;
      }
      if (R.type === "select") {
        f.value = [...M(W)];
        return;
      }
      const G = W;
      m.value = G?.start?.trim() ?? "", _.value = G?.end?.trim() ?? "";
    }
    function z() {
      const R = g.value;
      if (!R || R.type !== "select") return;
      const W = { ...a.modelValue };
      f.value.length === 0 ? delete W[R.id] : W[R.id] = [...f.value], s("update:modelValue", W), s("change", W);
    }
    function j(R) {
      const W = f.value.indexOf(R);
      W >= 0 ? f.value = f.value.filter((G, ut) => ut !== W) : f.value = [...f.value, R], z();
    }
    function O(R) {
      if (!R) return;
      p.value = R;
      const W = R.getBoundingClientRect(), G = 300;
      let ut = W.left;
      const Nt = window.innerWidth - G - 12;
      ut > Nt && (ut = Math.max(12, Nt)), ut < 12 && (ut = 12);
      const fe = W.bottom + 8;
      h.value = {
        top: `${fe}px`,
        left: `${ut}px`,
        width: `${Math.min(G, window.innerWidth - 24)}px`
      };
    }
    function V(R, W) {
      if (d.value === R.id && u.value) {
        ot();
        return;
      }
      u.value && d.value !== R.id && ot(), d.value = R.id, u.value = !0, P(R), St().then(async () => {
        O(W.currentTarget), await St(), et();
      });
    }
    function H(R, W) {
      if (d.value === R.id && u.value) {
        ot();
        return;
      }
      u.value && d.value !== R.id && ot(), d.value = R.id, u.value = !0, P(R), St().then(async () => {
        const G = c.get(R.id) ?? W.currentTarget;
        O(G), await St(), et();
      });
    }
    function et() {
      const R = r.value;
      if (!R) return;
      R.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function Z() {
      u.value = !1, d.value = null, p.value = null;
    }
    function U(R) {
      const W = g.value;
      if (!W) return;
      if (W.type === "text") {
        v.value = R != null ? String(R) : "";
        return;
      }
      if (W.type === "select") {
        f.value = Array.isArray(R) ? R.filter((ut) => typeof ut == "string") : M(R);
        return;
      }
      const G = R;
      m.value = G?.start?.trim() ?? "", _.value = G?.end?.trim() ?? "";
    }
    function ot() {
      const R = g.value;
      if (!R) return;
      if (R.type === "text") {
        const Nt = v.value.trim(), fe = { ...a.modelValue };
        Nt === "" ? delete fe[R.id] : fe[R.id] = Nt, s("update:modelValue", fe), s("change", fe), Z();
        return;
      }
      if (R.type === "select") {
        z(), Z();
        return;
      }
      const W = m.value.trim(), G = _.value.trim(), ut = { ...a.modelValue };
      !W || !G || W > G ? delete ut[R.id] : ut[R.id] = { start: W, end: G }, s("update:modelValue", ut), s("change", ut), Z();
    }
    function wt(R) {
      const W = { ...a.modelValue };
      delete W[R], s("update:modelValue", W), s("change", W), d.value === R && Z();
    }
    function gt(R) {
      if (R.kind === "text" || R.kind === "dateRange") {
        wt(R.def.id);
        return;
      }
      const W = { ...a.modelValue }, ut = M(W[R.def.id]).filter((Nt) => Nt !== R.optionValue);
      ut.length === 0 ? delete W[R.def.id] : W[R.def.id] = ut, s("update:modelValue", W), s("change", W), d.value === R.def.id && P(R.def);
    }
    function It() {
      const R = {};
      s("update:modelValue", R), s("change", R), Z();
    }
    const Vt = C(() => {
      const R = g.value;
      return R ? `Editar filtro: ${R.label}` : "Filtro";
    });
    function Kt(R) {
      const W = R.def.label.replace(/^\+\s*/, "");
      return R.kind === "select" ? `Quitar ${R.def.options.find((Nt) => Nt.value === R.optionValue)?.label ?? R.optionValue} del filtro ${W}` : `Quitar filtro ${W}`;
    }
    function ct(R) {
      const W = R.def.label.replace(/^\+\s*/, "");
      if (R.kind === "select") {
        const ut = R.def.options.find((Nt) => Nt.value === R.optionValue)?.label ?? R.optionValue;
        return `Editar filtro ${W}: ${ut}`;
      }
      return `Editar filtro ${W}`;
    }
    function he(R) {
      return `Añadir filtro ${R.label.replace(/^\+\s*/, "")}`;
    }
    const en = C(() => a.clearLabel);
    function qe(R) {
      if (!u.value || !r.value) return;
      const W = R.target;
      if (!(r.value.contains(W) || (W instanceof Element ? W : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const ut of c.values())
          if (ut?.contains(W)) return;
        ot();
      }
    }
    function ya(R) {
      R.key === "Escape" && u.value && (R.preventDefault(), Z());
    }
    function Ue() {
      !u.value || !p.value || O(p.value);
    }
    return ee(() => {
      document.addEventListener("mousedown", qe, !0), window.addEventListener("keydown", ya, !0), window.addEventListener("resize", Ue);
    }), Oo(() => {
      document.removeEventListener("mousedown", qe, !0), window.removeEventListener("keydown", ya, !0), window.removeEventListener("resize", Ue);
    }), Ft(
      () => a.modelValue,
      () => {
        const R = g.value;
        R && u.value && !n.panel && P(R);
      },
      { deep: !0 }
    ), (R, W) => (y(), x("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      l("div", I$, [
        l("span", R$, $(e.label), 1),
        l("div", E$, [
          (y(!0), x(K, null, tt(e.filterDefinitions, (G) => (y(), x("button", {
            key: `pill-${G.id}`,
            ref_for: !0,
            ref: (ut) => k(G.id, ut),
            type: "button",
            class: q(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", N(G)]),
            "aria-label": Y(G),
            "aria-expanded": d.value === G.id,
            "aria-haspopup": !0,
            "aria-controls": d.value === G.id ? i : void 0,
            onClick: (ut) => H(G, ut)
          }, [
            Q(L(L$), {
              class: "h-3.5 w-3.5 shrink-0",
              "aria-hidden": "true"
            }),
            l("span", z$, $(G.label), 1),
            G.type === "select" && T(G) > 0 ? (y(), x("span", V$, $(T(G)), 1)) : I("", !0)
          ], 10, O$))), 128))
        ])
      ]),
      D.value ? (y(), x("div", N$, [
        l("div", W$, [
          (y(!0), x(K, null, tt(A.value, (G) => (y(), x("div", {
            key: G.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            l("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": ct(G),
              onClick: (ut) => V(G.def, ut)
            }, [
              Rt(R.$slots, "formatChip", {
                filter: G.def,
                value: w(G.def.id),
                optionValue: G.kind === "select" ? G.optionValue : void 0
              }, () => [
                xt($(F(G)), 1)
              ], !0)
            ], 8, H$),
            l("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": Kt(G),
              onClick: (ut) => gt(G)
            }, [
              Q(L(F$), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, j$)
          ]))), 128))
        ]),
        l("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": en.value,
          onClick: It
        }, $(e.clearLabel), 9, Y$)
      ])) : I("", !0),
      (y(), dt(Rs, { to: "body" }, [
        d.value && u.value ? (y(), x("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: r,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": Vt.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: ft(h.value),
          onKeydown: W[3] || (W[3] = te(() => {
          }, ["stop"]))
        }, [
          g.value ? (y(), x(K, { key: 0 }, [
            R.$slots.panel ? Rt(R.$slots, "panel", {
              key: 0,
              filter: g.value,
              close: ot,
              value: b.value,
              updateValue: U
            }, void 0, !0) : (y(), x("div", U$, [
              g.value.type === "text" ? (y(), x(K, { key: 0 }, [
                l("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, $(g.value.label), 9, K$),
                Yt(l("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": W[0] || (W[0] = (G) => v.value = G),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: g.value.placeholder ?? "…",
                  onKeydown: Ra(te(ot, ["prevent"]), ["enter"])
                }, null, 40, X$), [
                  [Te, v.value]
                ])
              ], 64)) : g.value.type === "select" ? (y(), x(K, { key: 1 }, [
                l("p", G$, $(g.value.label), 1),
                l("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": g.value.label,
                  "aria-multiselectable": !0
                }, [
                  (y(!0), x(K, null, tt(g.value.options, (G) => (y(), x("li", {
                    key: G.value
                  }, [
                    l("label", Q$, [
                      l("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: f.value.includes(G.value),
                        onChange: (ut) => j(G.value)
                      }, null, 40, J$),
                      l("span", t4, $(G.label), 1)
                    ])
                  ]))), 128))
                ], 8, Z$)
              ], 64)) : g.value.type === "dateRange" ? (y(), x(K, { key: 2 }, [
                l("p", e4, $(g.value.label), 1),
                l("div", a4, [
                  l("div", s4, [
                    l("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, n4),
                    Yt(l("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": W[1] || (W[1] = (G) => m.value = G),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, o4), [
                      [Te, m.value]
                    ])
                  ]),
                  l("div", i4, [
                    l("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, r4),
                    Yt(l("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": W[2] || (W[2] = (G) => _.value = G),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, l4), [
                      [Te, _.value]
                    ])
                  ])
                ])
              ], 64)) : I("", !0)
            ]))
          ], 64)) : I("", !0)
        ], 44, q$)) : I("", !0)
      ]))
    ], 8, P$));
  }
}), d4 = /* @__PURE__ */ nt(c4, [["__scopeId", "data-v-4403df66"]]), Ut = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", de = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", u4 = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", ke = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", ue = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", h4 = { class: "font-sans" }, f4 = ["for"], g4 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], p4 = ["id"], v4 = /* @__PURE__ */ J({
  name: "InputText",
  __name: "InputText",
  props: {
    modelValue: {},
    label: {},
    placeholder: {},
    id: {},
    disabled: { type: Boolean },
    invalid: { type: Boolean },
    errorText: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, s = t, n = `kiut-input-text-${At()}`, o = C(() => a.id ?? n), i = C(() => `${o.value}-err`), r = C({
      get: () => a.modelValue,
      set: (c) => s("update:modelValue", c)
    });
    return (c, d) => (y(), x("div", h4, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: q(L(Ut))
      }, $(e.label), 11, f4)) : I("", !0),
      Yt(l("input", {
        id: o.value,
        "onUpdate:modelValue": d[0] || (d[0] = (u) => r.value = u),
        type: "text",
        autocomplete: "off",
        class: q([L(de), e.invalid ? L(ke) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, g4), [
        [Te, r.value]
      ]),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: q(L(ue)),
        role: "alert"
      }, $(e.errorText), 11, p4)) : I("", !0)
    ]));
  }
}), b4 = { class: "font-sans" }, m4 = ["for"], y4 = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], _4 = ["id"], x4 = /* @__PURE__ */ J({
  name: "InputTextarea",
  __name: "InputTextarea",
  props: {
    modelValue: {},
    label: {},
    placeholder: {},
    id: {},
    disabled: { type: Boolean },
    invalid: { type: Boolean },
    errorText: {},
    rows: { default: 4 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, s = t, n = `kiut-input-textarea-${At()}`, o = C(() => a.id ?? n), i = C(() => `${o.value}-err`), r = C({
      get: () => a.modelValue,
      set: (c) => s("update:modelValue", c)
    });
    return (c, d) => (y(), x("div", b4, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: q(L(Ut))
      }, $(e.label), 11, m4)) : I("", !0),
      Yt(l("textarea", {
        id: o.value,
        "onUpdate:modelValue": d[0] || (d[0] = (u) => r.value = u),
        rows: e.rows,
        autocomplete: "off",
        class: q([L(u4), e.invalid ? L(ke) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, y4), [
        [Te, r.value]
      ]),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: q(L(ue)),
        role: "alert"
      }, $(e.errorText), 11, _4)) : I("", !0)
    ]));
  }
}), k4 = { class: "font-sans" }, w4 = ["for"], $4 = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], M4 = ["for"], S4 = ["title"], C4 = ["aria-label"], D4 = ["id"], A4 = /* @__PURE__ */ J({
  name: "InputFile",
  __name: "InputFile",
  props: {
    modelValue: {},
    label: {},
    chooseLabel: { default: "Elegir archivo" },
    placeholder: { default: "Ningún archivo seleccionado" },
    accept: { default: ".pdf,.doc,.docx,.txt,.rtf,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
    name: {},
    id: {},
    disabled: { type: Boolean },
    invalid: { type: Boolean },
    errorText: {},
    clearAriaLabel: { default: "Quitar archivo" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, s = t, n = `kiut-input-file-${At()}`, o = C(() => a.id ?? n), i = C(() => `${o.value}-err`), r = at(null), c = C(() => a.modelValue?.name ?? a.placeholder);
    function d(h) {
      const v = h.target.files?.[0] ?? null;
      s("update:modelValue", v);
    }
    function u() {
      s("update:modelValue", null), r.value && (r.value.value = "");
    }
    return (h, p) => (y(), x("div", k4, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: q(L(Ut))
      }, $(e.label), 11, w4)) : I("", !0),
      l("div", {
        class: q([
          L(de),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? L(ke) : "",
          e.disabled ? "pointer-events-none" : ""
        ])
      }, [
        l("input", {
          id: o.value,
          ref_key: "fileInputRef",
          ref: r,
          type: "file",
          class: "sr-only focus:outline-none focus:ring-0",
          name: e.name,
          accept: e.accept,
          disabled: e.disabled,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onChange: d
        }, null, 40, $4),
        l("label", {
          for: o.value,
          class: q(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          Q(L(Rg), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          xt(" " + $(e.chooseLabel), 1)
        ], 10, M4),
        l("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: c.value || void 0
        }, $(c.value), 9, S4),
        e.modelValue && !e.disabled ? (y(), x("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: u
        }, [
          Q(L(Hi), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, C4)) : I("", !0)
      ], 2),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: q(L(ue)),
        role: "alert"
      }, $(e.errorText), 11, D4)) : I("", !0)
    ]));
  }
}), T4 = { class: "font-sans" }, B4 = ["for"], L4 = { class: "relative" }, F4 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], P4 = ["id"], I4 = /* @__PURE__ */ J({
  name: "InputDateTime",
  __name: "InputDateTime",
  props: {
    modelValue: {},
    label: {},
    id: {},
    name: {},
    disabled: { type: Boolean },
    invalid: { type: Boolean },
    errorText: {},
    min: {},
    max: {},
    step: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, s = t, n = `kiut-input-datetime-${At()}`, o = C(() => a.id ?? n), i = C(() => `${o.value}-err`), r = C(() => a.modelValue ?? "");
    function c(d) {
      const u = d.target.value;
      s("update:modelValue", u === "" ? null : u);
    }
    return (d, u) => (y(), x("div", T4, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: q(L(Ut))
      }, $(e.label), 11, B4)) : I("", !0),
      l("div", L4, [
        Q(L(Ni), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        l("input", {
          id: o.value,
          value: r.value,
          type: "datetime-local",
          autocomplete: "off",
          class: q([
            L(de),
            "pl-10",
            e.invalid ? L(ke) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onInput: c
        }, null, 42, F4)
      ]),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: q(L(ue)),
        role: "alert"
      }, $(e.errorText), 11, P4)) : I("", !0)
    ]));
  }
}), R4 = { class: "font-sans" }, E4 = ["for"], O4 = { class: "relative" }, z4 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], V4 = ["id"], N4 = /* @__PURE__ */ J({
  name: "InputTime",
  __name: "InputTime",
  props: {
    modelValue: {},
    label: {},
    id: {},
    name: {},
    disabled: { type: Boolean },
    invalid: { type: Boolean },
    errorText: {},
    min: {},
    max: {},
    step: { default: 60 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    function a(h) {
      const p = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(h.trim());
      if (!p) return null;
      const v = Number(p[1]), f = Number(p[2]);
      return !Number.isInteger(v) || !Number.isInteger(f) || v < 0 || v > 23 || f < 0 || f > 59 ? null : `${String(v).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
    }
    function s(h) {
      return h === "" ? null : a(h);
    }
    const n = e, o = t, i = `kiut-input-time-${At()}`, r = C(() => n.id ?? i), c = C(() => `${r.value}-err`), d = C(() => n.modelValue == null || n.modelValue === "" ? "" : a(n.modelValue) ?? "");
    function u(h) {
      const p = h.target.value;
      o("update:modelValue", s(p));
    }
    return (h, p) => (y(), x("div", R4, [
      e.label ? (y(), x("label", {
        key: 0,
        for: r.value,
        class: q(L(Ut))
      }, $(e.label), 11, E4)) : I("", !0),
      l("div", O4, [
        Q(L(Wg), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        l("input", {
          id: r.value,
          value: d.value,
          type: "time",
          autocomplete: "off",
          class: q([
            L(de),
            "pl-10",
            e.invalid ? L(ke) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? c.value : void 0,
          onInput: u
        }, null, 42, z4)
      ]),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: c.value,
        class: q(L(ue)),
        role: "alert"
      }, $(e.errorText), 11, V4)) : I("", !0)
    ]));
  }
}), W4 = { class: "font-sans" }, H4 = ["for"], j4 = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Y4 = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], q4 = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, U4 = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, K4 = { class: "min-w-0 text-left leading-snug" }, X4 = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, G4 = { class: "min-w-0 text-right leading-snug" }, Z4 = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Q4 = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, J4 = ["id"], tM = /* @__PURE__ */ J({
  name: "InputRange",
  __name: "InputRange",
  props: {
    modelValue: {},
    label: {},
    caption: {},
    captionMin: {},
    captionMax: {},
    orientation: { default: "horizontal" },
    id: {},
    disabled: { type: Boolean },
    invalid: { type: Boolean },
    errorText: {},
    min: { default: 0 },
    max: { default: 100 },
    step: { default: 1 },
    trackLength: { default: "12rem" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, s = t, n = `kiut-input-range-${At()}`, o = C(() => a.id ?? n), i = C(() => `${o.value}-err`), r = C(() => {
      const v = [];
      return a.errorText && v.push(i.value), v.length ? v.join(" ") : void 0;
    }), c = C(
      () => !!(a.caption && !a.captionMin && !a.captionMax)
    ), d = C(() => !!(a.captionMin || a.captionMax)), u = C(() => {
      const { min: v, max: f, modelValue: m } = a;
      if (f === v) return 0;
      const _ = (m - v) / (f - v);
      return Math.min(100, Math.max(0, _ * 100));
    }), h = C(() => ({
      "--kiut-range-fill": `${u.value}%`,
      "--kiut-range-length": a.trackLength
    }));
    function p(v) {
      const f = Number(v.target.value);
      s("update:modelValue", Number.isNaN(f) ? a.min : f);
    }
    return (v, f) => (y(), x("div", W4, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: q(L(Ut))
      }, $(e.label), 11, H4)) : I("", !0),
      l("div", {
        class: q(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (y(), x("p", j4, $(e.captionMax), 1)) : I("", !0),
        l("div", {
          class: q(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: ft(h.value)
        }, [
          l("input", {
            id: o.value,
            type: "range",
            value: e.modelValue,
            min: e.min,
            max: e.max,
            step: e.step,
            disabled: e.disabled,
            "aria-orientation": e.orientation,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": r.value,
            class: q([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: p
          }, null, 42, Y4)
        ], 6),
        e.orientation === "horizontal" && c.value ? (y(), x("p", q4, $(e.caption), 1)) : e.orientation === "horizontal" && d.value ? (y(), x("div", U4, [
          l("span", K4, $(e.captionMin), 1),
          l("span", X4, $(e.caption), 1),
          l("span", G4, $(e.captionMax), 1)
        ])) : I("", !0),
        e.orientation === "vertical" && e.captionMin ? (y(), x("p", Z4, $(e.captionMin), 1)) : I("", !0),
        e.orientation === "vertical" && e.caption ? (y(), x("p", Q4, $(e.caption), 1)) : I("", !0)
      ], 2),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: q(L(ue)),
        role: "alert"
      }, $(e.errorText), 11, J4)) : I("", !0)
    ]));
  }
}), eM = /* @__PURE__ */ nt(tM, [["__scopeId", "data-v-a1343418"]]), aM = { class: "font-sans" }, sM = ["for"], nM = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], oM = ["id"], iM = /* @__PURE__ */ J({
  name: "InputNumber",
  __name: "InputNumber",
  props: {
    modelValue: {},
    label: {},
    placeholder: {},
    id: {},
    disabled: { type: Boolean },
    invalid: { type: Boolean },
    errorText: {},
    min: {},
    max: {},
    step: {},
    align: { default: "center" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, s = t, n = `kiut-input-number-${At()}`, o = C(() => a.id ?? n), i = C(() => `${o.value}-err`), r = C(() => {
      switch (a.align) {
        case "start":
          return "text-start";
        case "end":
          return "text-end";
        default:
          return "text-center";
      }
    }), c = C(
      () => a.modelValue === null || a.modelValue === void 0 ? "" : String(a.modelValue)
    );
    function d(u) {
      const h = u.target.value;
      if (h === "") {
        s("update:modelValue", null);
        return;
      }
      const p = Number(h);
      s("update:modelValue", Number.isNaN(p) ? null : p);
    }
    return (u, h) => (y(), x("div", aM, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: q(L(Ut))
      }, $(e.label), 11, sM)) : I("", !0),
      l("input", {
        id: o.value,
        value: c.value,
        type: "number",
        onInput: d,
        class: q([
          L(de),
          e.invalid ? L(ke) : "",
          r.value,
          "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        ]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        min: e.min,
        max: e.max,
        step: e.step,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 42, nM),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: q(L(ue)),
        role: "alert"
      }, $(e.errorText), 11, oM)) : I("", !0)
    ]));
  }
}), rM = { class: "font-sans" }, lM = ["for"], cM = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], dM = ["disabled"], uM = ["id"], hM = "#3b82f6", fM = "#aabbcc", gM = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", pM = /* @__PURE__ */ J({
  name: "InputColorPicker",
  __name: "InputColorPicker",
  props: {
    modelValue: {},
    label: {},
    id: {},
    disabled: { type: Boolean },
    invalid: { type: Boolean },
    errorText: {},
    showHexInput: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    function a(f) {
      const m = f.trim(), _ = /^#?([0-9a-fA-F]{6})$/.exec(m);
      if (_) return `#${_[1].toLowerCase()}`;
      const g = /^#?([0-9a-fA-F]{3})$/.exec(m);
      if (g) {
        const [b, k, w] = g[1].split("");
        return `#${b}${b}${k}${k}${w}${w}`.toLowerCase();
      }
      return null;
    }
    function s(f) {
      return a(f) ?? hM;
    }
    const n = e, o = t, i = `kiut-input-color-${At()}`, r = C(() => n.id ?? i), c = C(() => `${r.value}-err`), d = C(() => s(n.modelValue)), u = at(d.value), h = at(!1);
    Ft(d, (f) => {
      h.value || (u.value = f);
    });
    function p(f) {
      const m = f.target, _ = a(m.value);
      _ && o("update:modelValue", _);
    }
    function v() {
      h.value = !1;
      const f = a(u.value);
      f ? (u.value = f, o("update:modelValue", f)) : u.value = d.value;
    }
    return Ft(u, (f) => {
      if (!h.value) return;
      const m = a(f);
      m && o("update:modelValue", m);
    }), (f, m) => (y(), x("div", rM, [
      e.label ? (y(), x("label", {
        key: 0,
        for: r.value,
        class: q(L(Ut))
      }, $(e.label), 11, lM)) : I("", !0),
      l("div", {
        class: q([
          gM,
          e.invalid ? L(ke) : "",
          e.disabled ? "cursor-not-allowed opacity-50" : ""
        ])
      }, [
        l("input", {
          id: r.value,
          type: "color",
          value: d.value,
          disabled: e.disabled,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? c.value : void 0,
          class: "h-9 w-11 shrink-0 cursor-pointer rounded-lg border border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-0.5 shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/35 disabled:cursor-not-allowed dark:border-slate-600 dark:bg-slate-800/80",
          onInput: p
        }, null, 40, cM),
        e.showHexInput ? Yt((y(), x("input", {
          key: 0,
          "onUpdate:modelValue": m[0] || (m[0] = (_) => u.value = _),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: fM,
          onFocus: m[1] || (m[1] = (_) => h.value = !0),
          onBlur: v
        }, null, 40, dM)), [
          [Te, u.value]
        ]) : I("", !0)
      ], 2),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: c.value,
        class: q(L(ue)),
        role: "alert"
      }, $(e.errorText), 11, uM)) : I("", !0)
    ]));
  }
});
function qi(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    l("path", {
      "fill-rule": "evenodd",
      d: "M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z",
      "clip-rule": "evenodd"
    })
  ]);
}
const vM = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], bM = ["aria-selected", "onClick", "onMouseenter"], mM = {
  key: 0,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, yM = { class: "min-w-0 flex-1" }, Ui = /* @__PURE__ */ J({
  name: "Select",
  __name: "Select",
  props: {
    modelValue: {},
    options: {},
    label: {},
    ariaLabelTrigger: {},
    placeholder: { default: "Seleccionar…" },
    disabled: { type: Boolean },
    showOptionCheck: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, s = t, n = `kiut-select-${At()}`, o = `${n}-label`, i = `${n}-btn`, r = `${n}-listbox`, c = at(null), d = at(null), u = at(null), h = at(!1), p = at(0), v = at({});
    function f() {
      const F = d.value;
      if (!F) return;
      const E = F.getBoundingClientRect();
      v.value = {
        top: `${E.bottom - 3}px`,
        left: `${E.left}px`,
        width: `${E.width}px`
      };
    }
    const m = C(() => a.options.filter((F) => !F.disabled)), _ = C(
      () => a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opción"
    ), g = C(() => a.modelValue === null || a.modelValue === void 0 || a.modelValue === "" ? a.placeholder : a.options.find((E) => E.value === a.modelValue)?.label ?? String(a.modelValue));
    function b(F) {
      return `${String(F.value)}-${F.label}`;
    }
    function k(F) {
      return a.modelValue === F.value;
    }
    function w(F, E) {
      const N = k(F), Y = p.value === E;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        N ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !N && Y ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function M(F) {
      s("update:modelValue", F.value), h.value = !1;
    }
    function S() {
      a.disabled || (h.value = !h.value);
    }
    function D(F) {
      if (F.stopPropagation(), !a.disabled && (S(), h.value)) {
        f();
        const E = Math.max(
          0,
          m.value.findIndex((N) => N.value === a.modelValue)
        );
        p.value = E, St(() => u.value?.focus());
      }
    }
    function A(F) {
      if (!h.value) return;
      const E = F.target, N = c.value, Y = u.value;
      N && !N.contains(E) && (!Y || !Y.contains(E)) && (h.value = !1);
    }
    function T(F) {
      a.disabled || (F.key === "ArrowDown" || F.key === "Enter" || F.key === " ") && (F.preventDefault(), h.value || (h.value = !0, f(), p.value = Math.max(
        0,
        m.value.findIndex((E) => E.value === a.modelValue)
      ), St(() => u.value?.focus())));
    }
    function B(F) {
      const E = m.value;
      if (E.length !== 0) {
        if (F.key === "Escape") {
          F.preventDefault(), h.value = !1;
          return;
        }
        if (F.key === "ArrowDown") {
          F.preventDefault(), p.value = Math.min(p.value + 1, E.length - 1);
          return;
        }
        if (F.key === "ArrowUp") {
          F.preventDefault(), p.value = Math.max(p.value - 1, 0);
          return;
        }
        if (F.key === "Enter") {
          F.preventDefault();
          const N = E[p.value];
          N && M(N);
        }
      }
    }
    return ee(() => {
      document.addEventListener("click", A);
    }), Pe(() => {
      document.removeEventListener("click", A);
    }), (F, E) => (y(), x("div", {
      ref_key: "rootRef",
      ref: c,
      class: "relative font-sans"
    }, [
      e.label ? (y(), x("label", {
        key: 0,
        id: o,
        class: q(L(Ut))
      }, $(e.label), 3)) : I("", !0),
      l("button", {
        ref_key: "buttonRef",
        ref: d,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: q([
          L(de),
          "flex items-center justify-between gap-2 text-left",
          h.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": h.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : _.value,
        onClick: D,
        onKeydown: T
      }, [
        l("span", {
          class: q([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, $(g.value), 3),
        Q(L(Wi), {
          class: q(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", h.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, vM),
      (y(), dt(Rs, { to: "body" }, [
        Yt(l("ul", {
          id: r,
          ref_key: "listRef",
          ref: u,
          role: "listbox",
          tabindex: "-1",
          style: ft(v.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          onKeydown: te(B, ["stop"])
        }, [
          (y(!0), x(K, null, tt(m.value, (N, Y) => (y(), x("li", {
            key: b(N),
            role: "option",
            "aria-selected": k(N),
            class: q(w(N, Y)),
            onClick: te((P) => M(N), ["stop"]),
            onMouseenter: (P) => p.value = Y
          }, [
            e.showOptionCheck ? (y(), x("span", mM, [
              k(N) ? (y(), dt(L(qi), {
                key: 0,
                class: "h-4 w-4 text-white"
              })) : I("", !0)
            ])) : I("", !0),
            l("span", yM, $(N.label), 1)
          ], 42, bM))), 128))
        ], 36), [
          [la, h.value]
        ])
      ]))
    ], 512));
  }
}), _M = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], xM = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, kM = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, wM = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, $M = { class: "truncate" }, MM = ["aria-selected", "onClick", "onMouseenter"], SM = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, CM = { class: "min-w-0 flex-1" }, DM = /* @__PURE__ */ J({
  name: "MultiSelect",
  __name: "MultiSelect",
  props: {
    modelValue: {},
    options: {},
    label: {},
    ariaLabelTrigger: {},
    placeholder: { default: "Seleccionar…" },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, s = t, n = `kiut-multiselect-${At()}`, o = `${n}-label`, i = `${n}-btn`, r = `${n}-listbox`, c = at(null), d = at(null), u = at(!1), h = at(0), p = C(() => a.options.filter((B) => !B.disabled)), v = C(() => new Set(a.modelValue ?? [])), f = C(
      () => a.options.filter((B) => v.value.has(B.value))
    ), m = C(() => {
      const B = a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opciones", F = f.value.length;
      return F === 0 ? B : `${B}, ${F} seleccionada${F === 1 ? "" : "s"}`;
    });
    function _(B) {
      return `${String(B.value)}-${B.label}`;
    }
    function g(B) {
      return v.value.has(B.value);
    }
    function b(B, F) {
      const E = g(B), N = h.value === F;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        E ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !E && N ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function k(B) {
      const F = [...a.modelValue ?? []], E = F.indexOf(B.value);
      E >= 0 ? F.splice(E, 1) : F.push(B.value), s("update:modelValue", F);
    }
    function w() {
      const B = p.value;
      if (B.length === 0) {
        h.value = 0;
        return;
      }
      const F = v.value, E = B.findIndex((N) => F.has(N.value));
      h.value = E >= 0 ? E : 0;
    }
    function M() {
      a.disabled || (u.value = !u.value);
    }
    function S(B) {
      B.stopPropagation(), !a.disabled && (M(), u.value && (w(), St(() => d.value?.focus())));
    }
    function D(B) {
      if (!u.value) return;
      const F = c.value;
      F && !F.contains(B.target) && (u.value = !1);
    }
    function A(B) {
      a.disabled || (B.key === "ArrowDown" || B.key === "Enter" || B.key === " ") && (B.preventDefault(), u.value || (u.value = !0, w(), St(() => d.value?.focus())));
    }
    function T(B) {
      const F = p.value;
      if (F.length !== 0) {
        if (B.key === "Escape") {
          B.preventDefault(), u.value = !1;
          return;
        }
        if (B.key === "ArrowDown") {
          B.preventDefault(), h.value = Math.min(h.value + 1, F.length - 1);
          return;
        }
        if (B.key === "ArrowUp") {
          B.preventDefault(), h.value = Math.max(h.value - 1, 0);
          return;
        }
        if (B.key === "Enter" || B.key === " ") {
          B.preventDefault();
          const E = F[h.value];
          E && k(E);
        }
      }
    }
    return ee(() => {
      document.addEventListener("click", D);
    }), Pe(() => {
      document.removeEventListener("click", D);
    }), (B, F) => (y(), x("div", {
      ref_key: "rootRef",
      ref: c,
      class: "relative font-sans"
    }, [
      e.label ? (y(), x("label", {
        key: 0,
        id: o,
        class: q(L(Ut))
      }, $(e.label), 3)) : I("", !0),
      l("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: q([
          L(de),
          "flex items-start justify-between gap-2 text-left",
          u.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": u.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : m.value,
        onClick: S,
        onKeydown: A
      }, [
        l("div", xM, [
          f.value.length === 0 ? (y(), x("span", kM, $(e.placeholder), 1)) : (y(), x("div", wM, [
            (y(!0), x(K, null, tt(f.value, (E) => (y(), x("span", {
              key: _(E),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              l("span", $M, $(E.label), 1)
            ]))), 128))
          ]))
        ]),
        Q(L(Wi), {
          class: q(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", u.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, _M),
      Yt(l("ul", {
        id: r,
        ref_key: "listRef",
        ref: d,
        role: "listbox",
        tabindex: "-1",
        "aria-multiselectable": "true",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: te(T, ["stop"])
      }, [
        (y(!0), x(K, null, tt(p.value, (E, N) => (y(), x("li", {
          key: _(E),
          role: "option",
          "aria-selected": g(E),
          class: q(b(E, N)),
          onClick: te((Y) => k(E), ["stop"]),
          onMouseenter: (Y) => h.value = N
        }, [
          l("span", SM, [
            g(E) ? (y(), dt(L(qi), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : I("", !0)
          ]),
          l("span", CM, $(E.label), 1)
        ], 42, MM))), 128))
      ], 544), [
        [la, u.value]
      ])
    ], 512));
  }
}), AM = ["id", "aria-checked", "aria-disabled", "disabled", "onKeydown"], TM = { class: "sr-only" }, BM = /* @__PURE__ */ J({
  name: "Toggle",
  __name: "Toggle",
  props: {
    modelValue: { type: Boolean },
    disabled: { type: Boolean },
    id: {},
    ariaLabel: { default: "Interruptor" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, s = t;
    function n() {
      a.disabled || s("update:modelValue", !a.modelValue);
    }
    return (o, i) => (y(), x("button", {
      id: e.id,
      type: "button",
      role: "switch",
      "aria-checked": e.modelValue,
      "aria-disabled": e.disabled ? "true" : void 0,
      disabled: e.disabled,
      class: q([
        "relative inline-flex h-8 w-[3.75rem] shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-sm transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        e.modelValue ? "bg-[color:var(--kiut-primary)]" : "bg-[#DEDEE3] dark:bg-slate-600"
      ]),
      onClick: n,
      onKeydown: [
        Ra(te(n, ["prevent", "stop"]), ["space"]),
        Ra(te(n, ["prevent"]), ["enter"])
      ]
    }, [
      l("span", {
        class: q(["pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", e.modelValue ? "translate-x-7" : "translate-x-0"]),
        "aria-hidden": "true"
      }, null, 2),
      l("span", TM, $(e.ariaLabel), 1)
    ], 42, AM));
  }
}), LM = { class: "font-sans" }, FM = ["for"], PM = { class: "flex gap-2" }, IM = { class: "w-[7.5rem] shrink-0" }, RM = { class: "min-w-0 flex-1" }, EM = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], OM = ["id"], zM = /* @__PURE__ */ J({
  name: "InputPhone",
  __name: "InputPhone",
  props: {
    modelValue: {},
    prefixOptions: {},
    label: {},
    prefixPlaceholder: { default: "País" },
    numberPlaceholder: { default: "3001234567" },
    id: {},
    disabled: { type: Boolean },
    invalid: { type: Boolean },
    errorText: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, s = t, n = `kiut-phone-${At()}`, o = C(() => a.id ?? `${n}-num`), i = C(() => `${o.value}-err`), r = C({
      get: () => a.modelValue.prefix,
      set: (d) => s("update:modelValue", { ...a.modelValue, prefix: d })
    }), c = C({
      get: () => a.modelValue.number,
      set: (d) => s("update:modelValue", { ...a.modelValue, number: d })
    });
    return (d, u) => (y(), x("div", LM, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: q(L(Ut))
      }, $(e.label), 11, FM)) : I("", !0),
      l("div", PM, [
        l("div", IM, [
          Q(Ui, {
            modelValue: r.value,
            "onUpdate:modelValue": u[0] || (u[0] = (h) => r.value = h),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        l("div", RM, [
          Yt(l("input", {
            id: o.value,
            "onUpdate:modelValue": u[1] || (u[1] = (h) => c.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: q([L(de), e.invalid ? L(ke) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, EM), [
            [Te, c.value]
          ])
        ])
      ]),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: q(L(ue)),
        role: "alert"
      }, $(e.errorText), 11, OM)) : I("", !0)
    ]));
  }
}), VM = ["role", "aria-label"], NM = { class: "flex flex-wrap gap-2" }, WM = ["aria-checked", "role", "onClick"], HM = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, jM = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, YM = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, qM = /* @__PURE__ */ J({
  name: "SelectablePills",
  __name: "SelectablePills",
  props: {
    items: {},
    multiple: { type: Boolean, default: !1 },
    modelValue: {},
    ariaLabel: { default: "Opciones" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, s = t, n = C(() => a.multiple ? Array.isArray(a.modelValue) ? a.modelValue : [] : []);
    function o(c) {
      return a.multiple ? n.value.includes(c.value) : a.modelValue === c.value;
    }
    function i(c) {
      return [
        "inline-flex max-w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        o(c) ? "border-[color:var(--kiut-primary)]/50 bg-violet-50/80 dark:bg-violet-950/30" : "border-gray-300 bg-white dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]"
      ];
    }
    function r(c) {
      if (a.multiple) {
        const d = Array.isArray(a.modelValue) ? [...a.modelValue] : [], u = d.indexOf(c.value);
        u >= 0 ? d.splice(u, 1) : d.push(c.value), s("update:modelValue", d);
        return;
      }
      s("update:modelValue", c.value);
    }
    return (c, d) => (y(), x("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      l("div", NM, [
        (y(!0), x(K, null, tt(e.items, (u) => (y(), x("button", {
          key: u.value,
          type: "button",
          class: q(i(u)),
          "aria-checked": o(u),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => r(u)
        }, [
          l("span", HM, [
            o(u) ? (y(), x("span", jM)) : I("", !0)
          ]),
          u.dotColor ? (y(), x("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: ft({ backgroundColor: u.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : I("", !0),
          l("span", YM, $(u.label), 1)
        ], 10, WM))), 128))
      ])
    ], 8, VM));
  }
}), UM = ["aria-label"], KM = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], XM = { class: "truncate px-3 py-2 text-sm font-medium" }, GM = /* @__PURE__ */ J({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, s = t, n = `kiut-seg-${At()}`, o = (m) => `${n}-seg-${m}`, i = at([]);
    function r(m, _) {
      m instanceof HTMLButtonElement ? i.value[_] = m : i.value[_] = null;
    }
    function c(m) {
      return m.value === a.modelValue;
    }
    function d(m) {
      const _ = c(m), g = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return m.disabled ? `${g} cursor-not-allowed opacity-40` : _ ? `${g} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${g} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function u(m) {
      m.disabled || m.value !== a.modelValue && s("update:modelValue", m.value);
    }
    function h(m, _, g) {
      u(m), St(() => i.value[_]?.focus());
    }
    const p = C(
      () => a.items.map((m, _) => m.disabled ? -1 : _).filter((m) => m >= 0)
    );
    function v(m, _) {
      const g = a.items.length;
      if (g === 0) return 0;
      let b = m;
      for (let k = 0; k < g; k++)
        if (b = (b + _ + g) % g, !a.items[b]?.disabled) return b;
      return m;
    }
    function f(m, _) {
      if (m.key === "ArrowRight" || m.key === "ArrowDown") {
        m.preventDefault();
        const g = v(_, 1), b = a.items[g];
        b && u(b), St(() => i.value[g]?.focus());
      } else if (m.key === "ArrowLeft" || m.key === "ArrowUp") {
        m.preventDefault();
        const g = v(_, -1), b = a.items[g];
        b && u(b), St(() => i.value[g]?.focus());
      } else if (m.key === "Home") {
        m.preventDefault();
        const g = p.value[0];
        if (g !== void 0) {
          const b = a.items[g];
          b && u(b), St(() => i.value[g]?.focus());
        }
      } else if (m.key === "End") {
        m.preventDefault();
        const g = p.value[p.value.length - 1];
        if (g !== void 0) {
          const b = a.items[g];
          b && u(b), St(() => i.value[g]?.focus());
        }
      }
    }
    return (m, _) => (y(), x("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (y(!0), x(K, null, tt(e.items, (g, b) => (y(), x("button", {
        id: o(g.value),
        key: g.value,
        ref_for: !0,
        ref: (k) => r(k, b),
        type: "button",
        role: "tab",
        "aria-selected": c(g),
        "aria-disabled": g.disabled === !0,
        tabindex: c(g) ? 0 : -1,
        class: q(d(g)),
        onClick: (k) => h(g, b),
        onKeydown: (k) => f(k, b)
      }, [
        l("span", XM, $(g.label), 1)
      ], 42, KM))), 128))
    ], 8, UM));
  }
});
function Se(e) {
  const [t, a, s] = e.split("-").map(Number);
  return new Date(t, a - 1, s);
}
function ta(e) {
  const t = e.getFullYear(), a = String(e.getMonth() + 1).padStart(2, "0"), s = String(e.getDate()).padStart(2, "0");
  return `${t}-${a}-${s}`;
}
function ge(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function ks(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function Lo(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function Ja(e, t) {
  const a = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), s = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return a < s ? -1 : a > s ? 1 : 0;
}
function Fo(e, t) {
  return Ja(e, t) === 0;
}
function ws(e, t) {
  return Ja(e, t) < 0;
}
function ZM(e, t) {
  return Ja(e, t) >= 0;
}
function QM(e, t) {
  return Ja(e, t) <= 0;
}
function JM(e) {
  const t = e.getFullYear(), a = e.getMonth(), s = new Date(t, a, 1), n = new Date(s);
  n.setDate(s.getDate() - s.getDay());
  const o = [], i = new Date(n);
  for (let r = 0; r < 42; r++)
    o.push(new Date(i)), i.setDate(i.getDate() + 1);
  return o;
}
const tS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
], eS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
function Po(e) {
  return `${tS[e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function Io(e) {
  return `${eS[e.getMonth()]} ${e.getFullYear()}`;
}
const aS = ["aria-expanded", "aria-labelledby", "aria-label"], sS = ["onKeydown"], nS = { class: "mb-4 flex items-center justify-between gap-2" }, oS = { class: "flex min-w-0 flex-1 justify-center gap-8 text-center text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, iS = { class: "min-w-0 truncate" }, rS = { class: "min-w-0 truncate" }, lS = { class: "flex flex-col gap-6 sm:flex-row sm:gap-8" }, cS = { class: "mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-wide text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, dS = { class: "grid grid-cols-7 gap-y-1" }, uS = ["disabled", "onClick"], hS = /* @__PURE__ */ J({
  name: "DateRangePicker",
  __name: "DateRangePicker",
  props: {
    modelValue: {},
    label: {},
    placeholder: { default: "Seleccionar fechas" },
    ariaLabel: {},
    minDate: {},
    maxDate: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, s = t, o = `${`kiut-drp-${At()}`}-lbl`, i = at(null), r = at(null), c = at(!1), d = at(null), u = at(ks(/* @__PURE__ */ new Date())), h = C(() => {
      const D = ks(u.value);
      return [D, Lo(D, 1)];
    }), p = C(() => a.ariaLabel ?? a.placeholder), v = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], f = C(() => {
      if (!a.modelValue.start || !a.modelValue.end) return a.placeholder;
      const D = Se(a.modelValue.start), A = Se(a.modelValue.end);
      return `${Po(D)} – ${Po(A)}`;
    });
    function m(D, A) {
      return D.getMonth() === A.getMonth() && D.getFullYear() === A.getFullYear();
    }
    function _(D) {
      const A = ge(D);
      if (a.minDate) {
        const T = ge(Se(a.minDate));
        if (ws(A, T)) return !0;
      }
      if (a.maxDate) {
        const T = ge(Se(a.maxDate));
        if (ws(T, A)) return !0;
      }
      return !1;
    }
    function g(D, A) {
      const T = m(A, D), B = a.modelValue.start ? ge(Se(a.modelValue.start)) : null, F = a.modelValue.end ? ge(Se(a.modelValue.end)) : null, E = ge(A), N = T ? "text-[color:var(--kiut-text-primary)] dark:text-slate-100" : "text-slate-400 dark:text-slate-500";
      if (!B || !F)
        return `${N} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
      const Y = ZM(E, B) && QM(E, F), P = Fo(E, B), z = Fo(E, F);
      return P || z ? "bg-[color:var(--kiut-primary)] font-semibold text-white shadow-sm" : Y ? `${N} bg-violet-100/90 dark:bg-violet-950/35 hover:bg-violet-200/80 dark:hover:bg-violet-900/40` : `${N} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
    }
    function b(D) {
      if (_(D)) return;
      const A = ge(D);
      if (!d.value) {
        d.value = new Date(A), s("update:modelValue", { start: ta(A), end: ta(A) });
        return;
      }
      let B = ge(d.value), F = new Date(A);
      ws(F, B) && ([B, F] = [F, B]), s("update:modelValue", { start: ta(B), end: ta(F) }), d.value = null, c.value = !1;
    }
    function k(D) {
      u.value = Lo(u.value, D);
    }
    function w() {
      c.value = !1;
    }
    function M(D) {
      if (D.stopPropagation(), c.value = !c.value, c.value) {
        if (d.value = null, a.modelValue.start)
          try {
            u.value = ks(Se(a.modelValue.start));
          } catch {
          }
        St(() => r.value?.focus());
      }
    }
    function S(D) {
      if (!c.value) return;
      const A = i.value;
      A && !A.contains(D.target) && (c.value = !1);
    }
    return Ft(c, (D) => {
      D && (d.value = null);
    }), ee(() => {
      document.addEventListener("click", S);
    }), Pe(() => {
      document.removeEventListener("click", S);
    }), (D, A) => (y(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (y(), x("label", {
        key: 0,
        id: o,
        class: q(L(Ut))
      }, $(e.label), 3)) : I("", !0),
      l("button", {
        type: "button",
        class: q([L(de), "flex w-full items-center gap-2 text-left"]),
        "aria-expanded": c.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : p.value,
        onClick: M
      }, [
        Q(L(Ni), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        l("span", {
          class: q([
            "min-w-0 flex-1 truncate",
            !e.modelValue.start || !e.modelValue.end ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, $(f.value), 3)
      ], 10, aS),
      Yt(l("div", {
        ref_key: "panelRef",
        ref: r,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: "absolute left-0 top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[100vw] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] p-4 shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]",
        onKeydown: Ra(te(w, ["stop"]), ["escape"])
      }, [
        l("div", nS, [
          l("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes anterior",
            onClick: A[0] || (A[0] = (T) => k(-1))
          }, [
            Q(L(Vg), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ]),
          l("div", oS, [
            l("span", iS, $(L(Io)(h.value[0])), 1),
            l("span", rS, $(L(Io)(h.value[1])), 1)
          ]),
          l("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes siguiente",
            onClick: A[1] || (A[1] = (T) => k(1))
          }, [
            Q(L(Ng), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ])
        ]),
        l("div", lS, [
          (y(!0), x(K, null, tt(h.value, (T) => (y(), x("div", {
            key: `${T.getFullYear()}-${T.getMonth()}`,
            class: "min-w-0 flex-1"
          }, [
            l("div", cS, [
              (y(), x(K, null, tt(v, (B) => l("span", { key: B }, $(B), 1)), 64))
            ]),
            l("div", dS, [
              (y(!0), x(K, null, tt(L(JM)(T), (B) => (y(), x("button", {
                key: L(ta)(B),
                type: "button",
                disabled: _(B),
                class: q(["relative flex h-9 items-center justify-center rounded-lg text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", g(T, B)]),
                onClick: (F) => b(B)
              }, $(B.getDate()), 11, uS))), 128))
            ])
          ]))), 128))
        ])
      ], 40, sS), [
        [la, c.value]
      ])
    ], 512));
  }
}), fS = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, gS = /* @__PURE__ */ J({
  name: "Tag",
  __name: "Tag",
  props: {
    statusLive: { type: Boolean },
    color: { default: "neutral" },
    outlined: { type: Boolean, default: !1 },
    label: {},
    labelConnected: { default: "Connected" },
    labelDisconnected: { default: "Disconnected" }
  },
  setup(e) {
    const t = e, a = C(() => t.statusLive !== void 0), s = C(
      () => t.statusLive === !0 ? t.labelConnected : t.labelDisconnected
    ), n = C(() => t.statusLive === !0 ? [
      "border border-emerald-200 bg-emerald-50",
      "dark:border-emerald-800/80 dark:bg-emerald-950/40"
    ] : [
      "border border-transparent bg-slate-100 dark:border-slate-700/80 dark:bg-slate-800/90"
    ]), o = C(() => t.statusLive === !0 ? "text-emerald-700 dark:text-emerald-300" : "text-[color:var(--kiut-text-primary)] dark:text-slate-300"), i = C(() => {
      const r = t.outlined;
      switch (t.color) {
        case "purple":
          return r ? "border border-violet-500 bg-transparent text-violet-700 dark:border-violet-400 dark:text-violet-300" : "border border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-700 dark:bg-violet-950/40 dark:text-violet-300";
        case "warning":
          return r ? "border border-amber-500 bg-transparent text-amber-800 dark:border-amber-400 dark:text-amber-200" : "border border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/35 dark:text-amber-200";
        case "success":
          return r ? "border border-emerald-500 bg-transparent text-emerald-800 dark:border-emerald-400 dark:text-emerald-200" : "border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/35 dark:text-emerald-200";
        case "danger":
          return r ? "border border-red-500 bg-transparent text-red-800 dark:border-red-400 dark:text-red-200" : "border border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/35 dark:text-red-200";
        case "orange":
          return r ? "border border-orange-500 bg-transparent text-orange-800 dark:border-orange-400 dark:text-orange-200" : "border border-orange-200 bg-orange-50 text-orange-800 dark:border-orange-800 dark:bg-orange-950/35 dark:text-orange-200";
        default:
          return r ? "border border-slate-400 bg-transparent text-[color:var(--kiut-text-primary)] dark:border-slate-500 dark:text-slate-200" : "border border-slate-200 bg-slate-100 text-[color:var(--kiut-text-primary)] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200";
      }
    });
    return (r, c) => a.value ? (y(), x("span", {
      key: 0,
      role: "status",
      class: q(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", n.value])
    }, [
      e.statusLive === !0 ? (y(), x("span", fS, [...c[0] || (c[0] = [
        l("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        l("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : I("", !0),
      l("span", {
        class: q(["min-w-0 flex-1 text-center", o.value])
      }, $(s.value), 3)
    ], 2)) : (y(), x("span", {
      key: 1,
      class: q(["inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight", i.value])
    }, [
      Rt(r.$slots, "default", {}, () => [
        xt($(e.label), 1)
      ])
    ], 2));
  }
}), pS = {
  key: 0,
  class: "group relative inline-flex shrink-0"
}, vS = ["type", "disabled", "aria-label"], bS = {
  key: 1,
  class: "min-w-0 truncate"
}, mS = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, yS = ["type", "disabled", "aria-label"], _S = {
  key: 1,
  class: "min-w-0 truncate"
}, Ia = /* @__PURE__ */ J({
  name: "Button",
  inheritAttrs: !1,
  __name: "Button",
  props: {
    variant: { default: "primary" },
    tone: { default: "default" },
    disabled: { type: Boolean, default: !1 },
    tooltip: {}
  },
  setup(e) {
    const t = e, a = Vo(), s = C(() => !!t.tooltip?.trim()), n = C(() => t.variant === "action"), o = C(() => !n.value), i = C(() => {
      const u = a["aria-label"];
      if (typeof u == "string" && u.length > 0) return u;
      if (n.value && t.tooltip?.trim()) return t.tooltip.trim();
    }), r = C(() => {
      const u = a.type;
      return u === "submit" || u === "reset" || u === "button" ? u : "button";
    }), c = C(() => {
      const { class: u, type: h, "aria-label": p, ...v } = a;
      return v;
    }), d = C(() => t.variant === "primary" ? [
      "px-4 py-2.5",
      "bg-[color:var(--kiut-primary)] text-white shadow-sm",
      "hover:bg-[color:var(--kiut-primary-hover)] active:bg-[color:var(--kiut-primary-dark)]",
      "dark:text-white dark:hover:brightness-110 dark:active:brightness-95"
    ] : t.variant === "secondary" ? [
      "px-4 py-2.5",
      "border border-slate-200 bg-slate-50 text-[color:var(--kiut-text-primary)]",
      "hover:border-slate-300 hover:bg-slate-100",
      "active:bg-slate-200/80",
      "dark:border-[color:var(--kiut-border-light)] dark:bg-slate-800/80 dark:text-slate-100",
      "dark:hover:border-white/[0.18] dark:hover:bg-slate-800",
      "dark:active:bg-slate-700/90"
    ] : t.tone === "danger" ? [
      "h-9 w-9 min-h-9 min-w-9 shrink-0 border-0 bg-transparent p-0 shadow-none",
      "text-red-600",
      "hover:bg-red-600 hover:text-white",
      "active:bg-red-700 active:text-white",
      "dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white",
      "dark:active:bg-red-700"
    ] : [
      "h-9 w-9 min-h-9 min-w-9 shrink-0 border-0 bg-transparent p-0 shadow-none",
      "text-[color:var(--kiut-text-primary)]",
      "hover:bg-[color:var(--kiut-primary)] hover:text-white",
      "active:bg-[color:var(--kiut-primary-dark)] active:text-white",
      "dark:text-slate-200",
      "dark:hover:bg-[color:var(--kiut-primary)] dark:hover:text-white",
      "dark:active:bg-[color:var(--kiut-primary-dark)]"
    ]);
    return (u, h) => s.value ? (y(), x("span", pS, [
      l("button", Ss({
        type: r.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [d.value, L(a).class]],
        disabled: e.disabled,
        "aria-label": i.value
      }, c.value), [
        u.$slots.icon ? (y(), x("span", {
          key: 0,
          class: q(["inline-flex shrink-0", n.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          Rt(u.$slots, "icon")
        ], 2)) : I("", !0),
        o.value ? (y(), x("span", bS, [
          Rt(u.$slots, "default")
        ])) : I("", !0)
      ], 16, vS),
      l("span", mS, $(e.tooltip), 1)
    ])) : (y(), x("button", Ss({
      key: 1,
      type: r.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [d.value, L(a).class]],
      disabled: e.disabled,
      "aria-label": i.value
    }, c.value), [
      u.$slots.icon ? (y(), x("span", {
        key: 0,
        class: q(["inline-flex shrink-0", n.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        Rt(u.$slots, "icon")
      ], 2)) : I("", !0),
      o.value ? (y(), x("span", _S, [
        Rt(u.$slots, "default")
      ])) : I("", !0)
    ], 16, yS));
  }
}), xS = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, kS = { class: "min-w-0 flex-1 space-y-1" }, wS = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, $S = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, MS = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, SS = /* @__PURE__ */ J({
  name: "Modal",
  __name: "Modal",
  props: {
    modelValue: { type: Boolean },
    title: {},
    subtitle: {},
    cancelLabel: { default: "Cancelar" },
    confirmLabel: { default: "Guardar" }
  },
  emits: ["update:modelValue", "cancel", "confirm"],
  setup(e, { emit: t }) {
    const a = e, s = t, o = `${`kiut-modal-${At()}`}-title`, i = at(null);
    function r() {
      s("cancel"), s("update:modelValue", !1);
    }
    function c() {
      s("confirm");
    }
    function d(u) {
      a.modelValue && u.key === "Escape" && (u.preventDefault(), r());
    }
    return Ft(
      () => a.modelValue,
      (u) => {
        u && requestAnimationFrame(() => {
          i.value?.focus({ preventScroll: !0 });
        });
      }
    ), ee(() => {
      document.addEventListener("keydown", d);
    }), Pe(() => {
      document.removeEventListener("keydown", d);
    }), (u, h) => (y(), dt(Rs, { to: "body" }, [
      Q(Is, { name: "kiut-modal" }, {
        default: ze(() => [
          e.modelValue ? (y(), x("div", xS, [
            l("div", {
              class: "absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] dark:bg-black/60",
              "aria-hidden": "true",
              onClick: r
            }),
            l("div", {
              ref_key: "panelRef",
              ref: i,
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": o,
              tabindex: "-1",
              class: "kiut-modal-panel relative z-10 flex max-h-[min(90vh,880px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] shadow-[var(--kiut-shadow-card)] dark:bg-[#252528] dark:shadow-black/40",
              onClick: h[0] || (h[0] = te(() => {
              }, ["stop"]))
            }, [
              l("header", {
                class: q(["flex shrink-0 justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.02]", e.subtitle ? "items-start" : "items-center"])
              }, [
                l("div", kS, [
                  l("h2", {
                    id: o,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, $(e.title), 1),
                  e.subtitle ? (y(), x("p", wS, $(e.subtitle), 1)) : I("", !0)
                ]),
                Q(Ia, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  onClick: r
                }, {
                  icon: ze(() => [
                    Q(L(Hi), { class: "h-5 w-5" })
                  ]),
                  _: 1
                })
              ], 2),
              l("div", $S, [
                Rt(u.$slots, "default", {}, void 0, !0)
              ]),
              l("footer", MS, [
                Q(Ia, {
                  variant: "secondary",
                  type: "button",
                  onClick: r
                }, {
                  default: ze(() => [
                    xt($(e.cancelLabel), 1)
                  ]),
                  _: 1
                }),
                Q(Ia, {
                  variant: "primary",
                  type: "button",
                  onClick: c
                }, {
                  default: ze(() => [
                    xt($(e.confirmLabel), 1)
                  ]),
                  _: 1
                })
              ])
            ], 512)
          ])) : I("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), CS = /* @__PURE__ */ nt(SS, [["__scopeId", "data-v-4ed7bb14"]]), DS = { class: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between" }, AS = { class: "flex min-w-0 flex-1 flex-col gap-1.5" }, TS = { class: "flex min-w-0 items-center gap-2.5" }, BS = {
  key: 0,
  class: "inline-flex shrink-0 items-center text-[color:var(--kiut-text-primary)] dark:text-slate-100 [&>svg]:size-6",
  "aria-hidden": "true"
}, LS = {
  key: 0,
  class: "text-base leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, FS = {
  key: 0,
  class: "flex shrink-0 flex-wrap items-center justify-end gap-2 sm:pt-0.5"
}, PS = {
  key: 0,
  class: "mt-6"
}, IS = /* @__PURE__ */ J({
  name: "Section",
  __name: "Section",
  props: {
    title: {},
    subtitle: {},
    icon: {}
  },
  setup(e) {
    const t = e, a = zo(), n = `${`kiut-section-${At()}`}-title`, o = C(() => !!(a.icon || t.icon));
    return (i, r) => (y(), x("section", {
      class: "text-left font-['Inter',system-ui,sans-serif]",
      "aria-labelledby": n
    }, [
      l("header", DS, [
        l("div", AS, [
          l("div", TS, [
            o.value ? (y(), x("span", BS, [
              Rt(i.$slots, "icon", {}, () => [
                e.icon ? (y(), dt(ca(e.icon), { key: 0 })) : I("", !0)
              ])
            ])) : I("", !0),
            l("h2", {
              id: n,
              class: "min-w-0 text-3xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
            }, $(e.title), 1)
          ]),
          e.subtitle ? (y(), x("p", LS, $(e.subtitle), 1)) : I("", !0)
        ]),
        i.$slots.actions ? (y(), x("div", FS, [
          Rt(i.$slots, "actions")
        ])) : I("", !0)
      ]),
      i.$slots.default ? (y(), x("div", PS, [
        Rt(i.$slots, "default")
      ])) : I("", !0)
    ]));
  }
}), RS = { class: "flex flex-1 min-h-0" }, ES = {
  key: 0,
  class: "flex justify-center items-center mt-3 shrink-0"
}, OS = {
  class: "flex-1 overflow-y-auto p-1.5 flex flex-col gap-1",
  "aria-label": "Sections"
}, zS = ["aria-current", "title", "onClick"], VS = {
  key: 1,
  class: "shrink-0 border-t border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)]"
}, NS = { class: "px-4 pt-4 pb-2 shrink-0" }, WS = { class: "text-[12px] font-bold uppercase tracking-widest text-[color:var(--kiut-text-muted)]" }, HS = {
  class: "flex-1 overflow-y-auto px-2 pb-3 flex flex-col gap-1",
  "aria-label": "Section items"
}, jS = ["data-nav-id", "aria-current", "onClick"], YS = /* @__PURE__ */ J({
  name: "AppShellNavigation",
  inheritAttrs: !1,
  __name: "AppShellNavigation",
  props: {
    sections: {},
    selectedSectionId: { default: null },
    activePath: { default: "" },
    expandedPrimaryWidth: { default: "8rem" },
    secondaryWidth: { default: "12.5rem" },
    primaryFontSize: { default: "11px" },
    secondaryFontSize: { default: "14px" },
    primaryIconSize: { default: "24px" },
    secondaryIconSize: { default: "14px" },
    primaryRailWidth: { default: "3.4rem" }
  },
  emits: ["update:selectedSectionId", "navigate"],
  setup(e, { emit: t }) {
    const a = at(!1), s = e, n = t, o = Vo(), { class: i, ...r } = o, c = C(() => {
      const m = s.sections.find((_) => _.id === s.selectedSectionId);
      return m?.items?.length ? m : null;
    });
    function d(m) {
      return s.activePath ? s.activePath === m.path || s.activePath.startsWith(m.path + "/") : !1;
    }
    function u(m) {
      return (m.items ?? []).some(d);
    }
    function h(m) {
      if (!m.items?.length) {
        n("update:selectedSectionId", null), n("navigate", {
          section: m,
          item: { id: m.id, label: m.label, path: m.path }
        });
        return;
      }
      const _ = s.selectedSectionId === m.id ? null : m.id;
      n("update:selectedSectionId", _);
    }
    function p(m, _) {
      n("navigate", { section: m, item: _ });
    }
    function v(m) {
      return s.selectedSectionId === m.id ? [
        "bg-purple-100 text-purple-900 shadow-sm dark:bg-purple-500/30 dark:text-purple-50"
      ] : u(m) ? ["text-[color:var(--kiut-primary)]", "text-purple-800/90 dark:text-purple-400"] : [
        "text-[color:var(--kiut-text-secondary)]",
        "hover:bg-purple-100/50 hover:text-purple-900",
        "dark:hover:bg-purple-400/20 dark:hover:text-purple-50"
      ];
    }
    function f(m) {
      return d(m) ? [
        "bg-purple-100 text-purple-700",
        "dark:bg-purple-600/20 dark:text-purple-400"
      ] : [
        "text-[color:var(--kiut-text-primary)]",
        "hover:bg-purple-50 hover:text-purple-900",
        "dark:hover:bg-purple-500/30 dark:hover:text-purple-50"
      ];
    }
    return (m, _) => (y(), x("aside", Ss({
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden",
      role: "navigation",
      "aria-label": "Main navigation"
    }, r), [
      l("div", RS, [
        l("div", {
          class: "primary-rail flex flex-col shrink-0 bg-[color:var(--kiut-bg-secondary)] border-r border-[color:var(--kiut-border-light)]",
          style: ft({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: _[0] || (_[0] = (g) => a.value = !0),
          onMouseleave: _[1] || (_[1] = (g) => a.value = !1)
        }, [
          m.$slots.logo ? (y(), x("div", ES, [
            Rt(m.$slots, "logo", { expanded: a.value }, void 0, !0)
          ])) : I("", !0),
          l("nav", OS, [
            (y(!0), x(K, null, tt(e.sections, (g) => (y(), x("button", {
              key: g.id,
              type: "button",
              "aria-current": e.selectedSectionId === g.id ? "true" : void 0,
              title: g.label,
              class: q(["group relative flex flex-row items-center justify-start gap-1 px-2 py-2 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/20", v(g)]),
              onClick: (b) => h(g)
            }, [
              g.icon ? (y(), dt(ca(g.icon), {
                key: 0,
                class: "shrink-0",
                style: ft({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : I("", !0),
              l("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1",
                style: ft({ fontSize: e.primaryFontSize })
              }, $(g.label), 5)
            ], 10, zS))), 128))
          ]),
          m.$slots.footer ? (y(), x("div", VS, [
            Rt(m.$slots, "footer", { expanded: a.value }, void 0, !0)
          ])) : I("", !0)
        ], 36),
        Q(Is, { name: "ksn-sub" }, {
          default: ze(() => [
            c.value ? (y(), x("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 bg-[color:var(--kiut-bg-secondary)] border-r border-[color:var(--kiut-border-light)] overflow-hidden",
              style: ft({ width: e.secondaryWidth })
            }, [
              l("div", NS, [
                l("p", WS, $(c.value.label), 1)
              ]),
              l("nav", HS, [
                (y(!0), x(K, null, tt(c.value.items, (g) => (y(), x("button", {
                  key: g.id,
                  type: "button",
                  "data-nav-id": g.id,
                  "aria-current": d(g) ? "page" : void 0,
                  class: q(["group flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/20", f(g)]),
                  onClick: (b) => p(c.value, g)
                }, [
                  g.icon ? (y(), dt(ca(g.icon), {
                    key: 0,
                    style: ft({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : I("", !0),
                  l("span", {
                    class: "truncate",
                    style: ft({ fontSize: e.secondaryFontSize })
                  }, $(g.label), 5)
                ], 10, jS))), 128))
              ])
            ], 4)) : I("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), qS = /* @__PURE__ */ nt(YS, [["__scopeId", "data-v-b510acff"]]), sC = {
  install(e) {
    e.component("KiutChartBar", le), e.component("KiutChartLine", _e), e.component("KiutPieChart", Qa), e.component("KiutBoxplotChart", Zh), e.component("KiutCandlestickChart", Oi), e.component("KiutHistogramChart", zi), e.component("KiutSankeyChart", xe), e.component("KiutAgentsPerDay", up), e.component("KiutBookingManager", Xp), e.component("KiutCheckin", y0), e.component("KiutCheckinMetrics", j0), e.component("KiutCheckinSegments", bv), e.component("KiutDisruption", tb), e.component("KiutFAQ", hb), e.component("KiutMessagesPerAgent", Sb), e.component("KiutRecordLocator", Zb), e.component("KiutSalesByChannel", pm), e.component("KiutSeller", o1), e.component("KiutTopAgents", g1), e.component("KiutPaymentMethod", q1), e.component("KiutAgentHumanConversations", Vy), e.component("KiutChannelMetrics", Qy), e.component("KiutTriageCombinations", b_), e.component("KiutSelectLanguage", D_), e.component("KiutGuardrails", a2), e.component("KiutDisruptionNotifier", J2), e.component("KiutTotalConversationsCard", ox), e.component("KiutCsatP95Card", ux), e.component("KiutAiGeneratedRevenueCard", bx), e.component("KiutNpsDailyMetrics", ji), e.component("KiutNpsMetrics", ik), e.component("KiutNpsOverviewMetrics", Yi), e.component("KiutAWSCost", Mk), e.component("KiutCostUsage", Kk), e.component("KiutTokenUsage", p5), e.component("KiutConversationCount", A5), e.component("KiutTopAgentsAnalysis", W5), e.component("KiutTopAgentsPie", Q5), e.component("KiutDailyCostTrends", lw), e.component("KiutModelUsage", Lw), e.component("KiutMessageRoles", Gw), e.component("KiutCostPerConversations", p$), e.component("Tabs", x$), e.component("Table", B$), e.component("Filters", d4), e.component("InputText", v4), e.component("InputTextarea", x4), e.component("InputFile", A4), e.component("InputDateTime", I4), e.component("InputTime", N4), e.component("InputRange", eM), e.component("InputNumber", iM), e.component("InputColorPicker", pM), e.component("Select", Ui), e.component("MultiSelect", DM), e.component("Toggle", BM), e.component("InputPhone", zM), e.component("SelectablePills", qM), e.component("SegmentedControl", GM), e.component("DateRangePicker", hS), e.component("Tag", gS), e.component("Button", Ia), e.component("Modal", CS), e.component("Section", IS), e.component("KiutAppShellNavigation", qS);
  }
};
export {
  Mk as AWSCost,
  Vy as AgentHumanConversations,
  up as AgentsPerDay,
  bx as AiGeneratedRevenueCard,
  qS as AppShellNavigation,
  Xp as BookingManager,
  Zh as BoxplotChart,
  Ia as Button,
  Oi as CandlestickChart,
  Qy as ChannelMetrics,
  le as ChartBar,
  _e as ChartLine,
  y0 as Checkin,
  j0 as CheckinMetrics,
  bv as CheckinSegments,
  A5 as ConversationCount,
  p$ as CostPerConversations,
  Kk as CostUsage,
  ux as CsatP95Card,
  lw as DailyCostTrends,
  hS as DateRangePicker,
  tb as Disruption,
  J2 as DisruptionNotifier,
  hb as FAQ,
  d4 as Filters,
  a2 as Guardrails,
  zi as HistogramChart,
  pM as InputColorPicker,
  I4 as InputDateTime,
  A4 as InputFile,
  iM as InputNumber,
  zM as InputPhone,
  eM as InputRange,
  v4 as InputText,
  x4 as InputTextarea,
  N4 as InputTime,
  sC as KiutUIPlugin,
  Gw as MessageRoles,
  Sb as MessagesPerAgent,
  CS as Modal,
  Lw as ModelUsage,
  DM as MultiSelect,
  ji as NpsDailyMetrics,
  ik as NpsMetrics,
  Yi as NpsOverviewMetrics,
  q1 as PaymentMethod,
  Qa as PieChart,
  Zb as RecordLocator,
  pm as SalesByChannel,
  xe as SankeyChart,
  IS as Section,
  GM as SegmentedControl,
  Ui as Select,
  D_ as SelectLanguage,
  qM as SelectablePills,
  o1 as Seller,
  B$ as Table,
  x$ as Tabs,
  gS as Tag,
  BM as Toggle,
  p5 as TokenUsage,
  g1 as TopAgents,
  W5 as TopAgentsAnalysis,
  Q5 as TopAgentsPie,
  ox as TotalConversationsCard,
  b_ as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
