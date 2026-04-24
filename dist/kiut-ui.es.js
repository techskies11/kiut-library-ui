import { defineComponent as tt, shallowRef as Io, h as $s, ref as at, onMounted as le, onUnmounted as He, watch as Et, toRaw as Ms, nextTick as Ct, version as Ki, isProxy as Eo, computed as C, toRef as lt, openBlock as y, createElementBlock as x, createVNode as Q, unref as T, normalizeStyle as ft, createElementVNode as l, toDisplayString as $, createCommentVNode as E, Fragment as K, renderList as J, onBeforeUnmount as Ro, createStaticVNode as st, withDirectives as Ut, vShow as la, normalizeClass as q, createBlock as dt, createTextVNode as xt, resolveDynamicComponent as ca, Transition as Is, withCtx as Re, renderSlot as It, useSlots as Oo, Teleport as Es, withModifiers as te, withKeys as Ea, vModelText as Oe, useAttrs as Vo, mergeProps as Cs } from "vue";
import * as sn from "echarts/core";
import { TooltipComponent as Xi, TitleComponent as Gi } from "echarts/components";
import { SankeyChart as Zi } from "echarts/charts";
import { CanvasRenderer as Qi } from "echarts/renderers";
import Dt from "moment";
function ma(e) {
  return e + 0.5 | 0;
}
const ge = (e, t, a) => Math.max(Math.min(e, a), t);
function ea(e) {
  return ge(ma(e * 2.55), 0, 255);
}
function be(e) {
  return ge(ma(e * 255), 0, 255);
}
function ne(e) {
  return ge(ma(e / 2.55) / 100, 0, 1);
}
function nn(e) {
  return ge(ma(e * 100), 0, 100);
}
const Ht = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Ss = [..."0123456789ABCDEF"], Ji = (e) => Ss[e & 15], tr = (e) => Ss[(e & 240) >> 4] + Ss[e & 15], _a = (e) => (e & 240) >> 4 === (e & 15), er = (e) => _a(e.r) && _a(e.g) && _a(e.b) && _a(e.a);
function ar(e) {
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
const sr = (e, t) => e < 255 ? t(e) : "";
function nr(e) {
  var t = er(e) ? Ji : tr;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + sr(e.a, t) : void 0;
}
const or = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function zo(e, t, a) {
  const s = t * Math.min(a, 1 - a), n = (o, i = (o + e / 30) % 12) => a - s * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [n(0), n(8), n(4)];
}
function ir(e, t, a) {
  const s = (n, o = (n + e / 60) % 6) => a - a * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [s(5), s(3), s(1)];
}
function rr(e, t, a) {
  const s = zo(e, 1, 0.5);
  let n;
  for (t + a > 1 && (n = 1 / (t + a), t *= n, a *= n), n = 0; n < 3; n++)
    s[n] *= 1 - t - a, s[n] += t;
  return s;
}
function lr(e, t, a, s, n) {
  return e === n ? (t - a) / s + (t < a ? 6 : 0) : t === n ? (a - e) / s + 2 : (e - t) / s + 4;
}
function Rs(e) {
  const a = e.r / 255, s = e.g / 255, n = e.b / 255, o = Math.max(a, s, n), i = Math.min(a, s, n), r = (o + i) / 2;
  let c, d, u;
  return o !== i && (u = o - i, d = r > 0.5 ? u / (2 - o - i) : u / (o + i), c = lr(a, s, n, u, o), c = c * 60 + 0.5), [c | 0, d || 0, r];
}
function Os(e, t, a, s) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, a, s)).map(be);
}
function Vs(e, t, a) {
  return Os(zo, e, t, a);
}
function cr(e, t, a) {
  return Os(rr, e, t, a);
}
function dr(e, t, a) {
  return Os(ir, e, t, a);
}
function No(e) {
  return (e % 360 + 360) % 360;
}
function ur(e) {
  const t = or.exec(e);
  let a = 255, s;
  if (!t)
    return;
  t[5] !== s && (a = t[6] ? ea(+t[5]) : be(+t[5]));
  const n = No(+t[2]), o = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? s = cr(n, o, i) : t[1] === "hsv" ? s = dr(n, o, i) : s = Vs(n, o, i), {
    r: s[0],
    g: s[1],
    b: s[2],
    a
  };
}
function hr(e, t) {
  var a = Rs(e);
  a[0] = No(a[0] + t), a = Vs(a), e.r = a[0], e.g = a[1], e.b = a[2];
}
function fr(e) {
  if (!e)
    return;
  const t = Rs(e), a = t[0], s = nn(t[1]), n = nn(t[2]);
  return e.a < 255 ? `hsla(${a}, ${s}%, ${n}%, ${ne(e.a)})` : `hsl(${a}, ${s}%, ${n}%)`;
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
function gr() {
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
function pr(e) {
  xa || (xa = gr(), xa.transparent = [0, 0, 0, 0]);
  const t = xa[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const vr = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function br(e) {
  const t = vr.exec(e);
  let a = 255, s, n, o;
  if (t) {
    if (t[7] !== s) {
      const i = +t[7];
      a = t[8] ? ea(i) : ge(i * 255, 0, 255);
    }
    return s = +t[1], n = +t[3], o = +t[5], s = 255 & (t[2] ? ea(s) : ge(s, 0, 255)), n = 255 & (t[4] ? ea(n) : ge(n, 0, 255)), o = 255 & (t[6] ? ea(o) : ge(o, 0, 255)), {
      r: s,
      g: n,
      b: o,
      a
    };
  }
}
function mr(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${ne(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const ts = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, Pe = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function yr(e, t, a) {
  const s = Pe(ne(e.r)), n = Pe(ne(e.g)), o = Pe(ne(e.b));
  return {
    r: be(ts(s + a * (Pe(ne(t.r)) - s))),
    g: be(ts(n + a * (Pe(ne(t.g)) - n))),
    b: be(ts(o + a * (Pe(ne(t.b)) - o))),
    a: e.a + a * (t.a - e.a)
  };
}
function ka(e, t, a) {
  if (e) {
    let s = Rs(e);
    s[t] = Math.max(0, Math.min(s[t] + s[t] * a, t === 0 ? 360 : 1)), s = Vs(s), e.r = s[0], e.g = s[1], e.b = s[2];
  }
}
function Wo(e, t) {
  return e && Object.assign(t || {}, e);
}
function ln(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = be(e[3]))) : (t = Wo(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = be(t.a)), t;
}
function _r(e) {
  return e.charAt(0) === "r" ? br(e) : ur(e);
}
class da {
  constructor(t) {
    if (t instanceof da)
      return t;
    const a = typeof t;
    let s;
    a === "object" ? s = ln(t) : a === "string" && (s = ar(t) || pr(t) || _r(t)), this._rgb = s, this._valid = !!s;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Wo(this._rgb);
    return t && (t.a = ne(t.a)), t;
  }
  set rgb(t) {
    this._rgb = ln(t);
  }
  rgbString() {
    return this._valid ? mr(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? nr(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? fr(this._rgb) : void 0;
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
    return t && (this._rgb = yr(this._rgb, t._rgb, a)), this;
  }
  clone() {
    return new da(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = be(t), this;
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
    return hr(this._rgb, t), this;
  }
}
function ee() {
}
const xr = /* @__PURE__ */ (() => {
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
function Lt(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function Xt(e, t) {
  return Lt(e) ? e : t;
}
function it(e, t) {
  return typeof e > "u" ? t : e;
}
const kr = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, Ho = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
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
function Ra(e, t) {
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
function jo(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function wr(e, t, a, s) {
  if (!jo(e))
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
  const o = a.merger || wr;
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
    merger: $r
  });
}
function $r(e, t, a) {
  if (!jo(e))
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
function Mr(e) {
  const t = e.split("."), a = [];
  let s = "";
  for (const n of t)
    s += n, s.endsWith("\\") ? s = s.slice(0, -1) + "." : (a.push(s), s = "");
  return a;
}
function Cr(e) {
  const t = Mr(e);
  return (a) => {
    for (const s of t) {
      if (s === "")
        break;
      a = a && a[s];
    }
    return a;
  };
}
function Te(e, t) {
  return (cn[t] || (cn[t] = Cr(t)))(e);
}
function zs(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const ha = (e) => typeof e < "u", me = (e) => typeof e == "function", dn = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const a of e)
    if (!t.has(a))
      return !1;
  return !0;
};
function Sr(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const mt = Math.PI, _t = 2 * mt, Dr = _t + mt, Va = Number.POSITIVE_INFINITY, Ar = mt / 180, St = mt / 2, ke = mt / 4, un = mt * 2 / 3, Yo = Math.log10, Jt = Math.sign;
function oa(e, t, a) {
  return Math.abs(e - t) < a;
}
function hn(e) {
  const t = Math.round(e);
  e = oa(e, t, e / 1e3) ? t : e;
  const a = Math.pow(10, Math.floor(Yo(e))), s = e / a;
  return (s <= 1 ? 1 : s <= 2 ? 2 : s <= 5 ? 5 : 10) * a;
}
function Tr(e) {
  const t = [], a = Math.sqrt(e);
  let s;
  for (s = 1; s < a; s++)
    e % s === 0 && (t.push(s), t.push(e / s));
  return a === (a | 0) && t.push(a), t.sort((n, o) => n - o).pop(), t;
}
function Br(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function fa(e) {
  return !Br(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Lr(e, t) {
  const a = Math.round(e);
  return a - t <= e && a + t >= e;
}
function Fr(e, t, a) {
  let s, n, o;
  for (s = 0, n = e.length; s < n; s++)
    o = e[s][a], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function oe(e) {
  return e * (mt / 180);
}
function Pr(e) {
  return e * (180 / mt);
}
function fn(e) {
  if (!Lt(e))
    return;
  let t = 1, a = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, a++;
  return a;
}
function qo(e, t) {
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
function Ir(e, t) {
  return (e - t + Dr) % _t - mt;
}
function Wt(e) {
  return (e % _t + _t) % _t;
}
function ga(e, t, a, s) {
  const n = Wt(e), o = Wt(t), i = Wt(a), r = Wt(o - n), c = Wt(i - n), d = Wt(n - o), u = Wt(n - i);
  return n === o || n === i || s && o === i || r > c && d < u;
}
function Tt(e, t, a) {
  return Math.max(t, Math.min(a, e));
}
function Er(e) {
  return Tt(e, -32768, 32767);
}
function ie(e, t, a, s = 1e-6) {
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
const De = (e, t, a, s) => Ns(e, a, s ? (n) => {
  const o = e[n][t];
  return o < a || o === a && e[n + 1][t] === a;
} : (n) => e[n][t] < a), Rr = (e, t, a) => Ns(e, a, (s) => e[s][t] >= a);
function Or(e, t, a) {
  let s = 0, n = e.length;
  for (; s < n && e[s] < t; )
    s++;
  for (; n > s && e[n - 1] > a; )
    n--;
  return s > 0 || n < e.length ? e.slice(s, n) : e;
}
const Uo = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function Vr(e, t) {
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
  }), Uo.forEach((a) => {
    const s = "_onData" + zs(a), n = e[a];
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
  n !== -1 && s.splice(n, 1), !(s.length > 0) && (Uo.forEach((o) => {
    delete e[o];
  }), delete e._chartjs);
}
function Ko(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const Xo = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function Go(e, t) {
  let a = [], s = !1;
  return function(...n) {
    a = n, s || (s = !0, Xo.call(window, () => {
      s = !1, e.apply(t, a);
    }));
  };
}
function zr(e, t) {
  let a;
  return function(...s) {
    return t ? (clearTimeout(a), a = setTimeout(e, t, s)) : e.apply(this, s), t;
  };
}
const Ws = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", At = (e, t, a) => e === "start" ? t : e === "end" ? a : (t + a) / 2, Nr = (e, t, a, s) => e === (s ? "left" : "right") ? a : e === "center" ? (t + a) / 2 : t;
function Wr(e, t, a) {
  const s = t.length;
  let n = 0, o = s;
  if (e._sorted) {
    const { iScale: i, vScale: r, _parsed: c } = e, d = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, u = i.axis, { min: f, max: p, minDefined: v, maxDefined: h } = i.getUserBounds();
    if (v) {
      if (n = Math.min(
        // @ts-expect-error Need to type _parsed
        De(c, u, f).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? s : De(t, u, i.getPixelForValue(f)).lo
      ), d) {
        const m = c.slice(0, n + 1).reverse().findIndex((_) => !pt(_[r.axis]));
        n -= Math.max(0, m);
      }
      n = Tt(n, 0, s - 1);
    }
    if (h) {
      let m = Math.max(
        // @ts-expect-error Need to type _parsed
        De(c, i.axis, p, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? 0 : De(t, u, i.getPixelForValue(p), !0).hi + 1
      );
      if (d) {
        const _ = c.slice(m - 1).findIndex((g) => !pt(g[r.axis]));
        m += Math.max(0, _);
      }
      o = Tt(m, n, s) - n;
    } else
      o = s - n;
  }
  return {
    start: n,
    count: o
  };
}
function Hr(e) {
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
  easeInSine: (e) => -Math.cos(e * St) + 1,
  easeOutSine: (e) => Math.sin(e * St),
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
const jr = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], Yr = [
  "color",
  "borderColor",
  "backgroundColor"
];
function qr(e) {
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
      properties: Yr
    },
    numbers: {
      type: "number",
      properties: jr
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
function Ur(e) {
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
function Kr(e, t) {
  t = t || {};
  const a = e + JSON.stringify(t);
  let s = mn.get(a);
  return s || (s = new Intl.NumberFormat(e, t), mn.set(a, s)), s;
}
function js(e, t, a) {
  return Kr(t, a).format(e);
}
const Xr = {
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
      (d < 1e-4 || d > 1e15) && (n = "scientific"), o = Gr(e, a);
    }
    const i = Yo(Math.abs(o)), r = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), c = {
      notation: n,
      minimumFractionDigits: r,
      maximumFractionDigits: r
    };
    return Object.assign(c, this.options.ticks.format), js(e, s, c);
  }
};
function Gr(e, t) {
  let a = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(a) >= 1 && e !== Math.floor(e) && (a = e - Math.floor(e)), a;
}
var Zo = {
  formatters: Xr
};
function Zr(e) {
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
      callback: Zo.formatters.values,
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
const Be = /* @__PURE__ */ Object.create(null), As = /* @__PURE__ */ Object.create(null);
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
class Qr {
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
    return as(Be, t, a);
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
var $t = /* @__PURE__ */ new Qr({
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
  qr,
  Ur,
  Zr
]);
function Jr(e) {
  return !e || pt(e.size) || pt(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function yn(e, t, a, s, n) {
  let o = t[n];
  return o || (o = t[n] = e.measureText(n).width, a.push(n)), o > s && (s = o), s;
}
function we(e, t, a) {
  const s = e.currentDevicePixelRatio, n = a !== 0 ? Math.max(a / 2, 0.5) : 0;
  return Math.round((t - n) * s) / s + n;
}
function _n(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Ts(e, t, a, s) {
  Qo(e, t, a, s, null);
}
function Qo(e, t, a, s, n) {
  let o, i, r, c, d, u, f, p;
  const v = t.pointStyle, h = t.rotation, m = t.radius;
  let _ = (h || 0) * Ar;
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
        d = m * 0.516, c = m - d, i = Math.cos(_ + ke) * c, f = Math.cos(_ + ke) * (n ? n / 2 - d : c), r = Math.sin(_ + ke) * c, p = Math.sin(_ + ke) * (n ? n / 2 - d : c), e.arc(a - f, s - r, d, _ - mt, _ - St), e.arc(a + p, s - i, d, _ - St, _), e.arc(a + f, s + r, d, _, _ + St), e.arc(a - p, s + i, d, _ + St, _ + mt), e.closePath();
        break;
      case "rect":
        if (!h) {
          c = Math.SQRT1_2 * m, u = n ? n / 2 : c, e.rect(a - u, s - c, 2 * u, 2 * c);
          break;
        }
        _ += ke;
      /* falls through */
      case "rectRot":
        f = Math.cos(_) * (n ? n / 2 : m), i = Math.cos(_) * m, r = Math.sin(_) * m, p = Math.sin(_) * (n ? n / 2 : m), e.moveTo(a - f, s - r), e.lineTo(a + p, s - i), e.lineTo(a + f, s + r), e.lineTo(a - p, s + i), e.closePath();
        break;
      case "crossRot":
        _ += ke;
      /* falls through */
      case "cross":
        f = Math.cos(_) * (n ? n / 2 : m), i = Math.cos(_) * m, r = Math.sin(_) * m, p = Math.sin(_) * (n ? n / 2 : m), e.moveTo(a - f, s - r), e.lineTo(a + f, s + r), e.moveTo(a + p, s - i), e.lineTo(a - p, s + i);
        break;
      case "star":
        f = Math.cos(_) * (n ? n / 2 : m), i = Math.cos(_) * m, r = Math.sin(_) * m, p = Math.sin(_) * (n ? n / 2 : m), e.moveTo(a - f, s - r), e.lineTo(a + f, s + r), e.moveTo(a + p, s - i), e.lineTo(a - p, s + i), _ += ke, f = Math.cos(_) * (n ? n / 2 : m), i = Math.cos(_) * m, r = Math.sin(_) * m, p = Math.sin(_) * (n ? n / 2 : m), e.moveTo(a - f, s - r), e.lineTo(a + f, s + r), e.moveTo(a + p, s - i), e.lineTo(a - p, s + i);
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
function tl(e, t, a, s, n) {
  if (!t)
    return e.lineTo(a.x, a.y);
  if (n === "middle") {
    const o = (t.x + a.x) / 2;
    e.lineTo(o, t.y), e.lineTo(o, a.y);
  } else n === "after" != !!s ? e.lineTo(t.x, a.y) : e.lineTo(a.x, t.y);
  e.lineTo(a.x, a.y);
}
function el(e, t, a, s) {
  if (!t)
    return e.lineTo(a.x, a.y);
  e.bezierCurveTo(s ? t.cp1x : t.cp2x, s ? t.cp1y : t.cp2y, s ? a.cp2x : a.cp1x, s ? a.cp2y : a.cp1y, a.x, a.y);
}
function al(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), pt(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function sl(e, t, a, s, n) {
  if (n.strikethrough || n.underline) {
    const o = e.measureText(s), i = t - o.actualBoundingBoxLeft, r = t + o.actualBoundingBoxRight, c = a - o.actualBoundingBoxAscent, d = a + o.actualBoundingBoxDescent, u = n.strikethrough ? (c + d) / 2 : d;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = n.decorationWidth || 2, e.moveTo(i, u), e.lineTo(r, u), e.stroke();
  }
}
function nl(e, t) {
  const a = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = a;
}
function va(e, t, a, s, n, o = {}) {
  const i = Mt(t) ? t : [
    t
  ], r = o.strokeWidth > 0 && o.strokeColor !== "";
  let c, d;
  for (e.save(), e.font = n.string, al(e, o), c = 0; c < i.length; ++c)
    d = i[c], o.backdrop && nl(e, o.backdrop), r && (o.strokeColor && (e.strokeStyle = o.strokeColor), pt(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(d, a, s, o.maxWidth)), e.fillText(d, a, s, o.maxWidth), sl(e, a, s, d, o), s += Number(n.lineHeight);
  e.restore();
}
function za(e, t) {
  const { x: a, y: s, w: n, h: o, radius: i } = t;
  e.arc(a + i.topLeft, s + i.topLeft, i.topLeft, 1.5 * mt, mt, !0), e.lineTo(a, s + o - i.bottomLeft), e.arc(a + i.bottomLeft, s + o - i.bottomLeft, i.bottomLeft, mt, St, !0), e.lineTo(a + n - i.bottomRight, s + o), e.arc(a + n - i.bottomRight, s + o - i.bottomRight, i.bottomRight, St, 0, !0), e.lineTo(a + n, s + i.topRight), e.arc(a + n - i.topRight, s + i.topRight, i.topRight, 0, -St, !0), e.lineTo(a + i.topLeft, s);
}
const ol = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, il = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function rl(e, t) {
  const a = ("" + e).match(ol);
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
const ll = (e) => +e || 0;
function Ys(e, t) {
  const a = {}, s = ht(t), n = s ? Object.keys(t) : t, o = ht(e) ? s ? (i) => it(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of n)
    a[i] = ll(o(i));
  return a;
}
function Jo(e) {
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
function Yt(e) {
  const t = Jo(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function Bt(e, t) {
  e = e || {}, t = t || $t.font;
  let a = it(e.size, t.size);
  typeof a == "string" && (a = parseInt(a, 10));
  let s = it(e.style, t.style);
  s && !("" + s).match(il) && (console.warn('Invalid font style specified: "' + s + '"'), s = void 0);
  const n = {
    family: it(e.family, t.family),
    lineHeight: rl(it(e.lineHeight, t.lineHeight), a),
    size: a,
    style: s,
    weight: it(e.weight, t.weight),
    string: ""
  };
  return n.string = Jr(n), n;
}
function $a(e, t, a, s) {
  let n, o, i;
  for (n = 0, o = e.length; n < o; ++n)
    if (i = e[n], i !== void 0 && i !== void 0)
      return i;
}
function cl(e, t, a) {
  const { min: s, max: n } = e, o = Ho(t, (n - s) / 2), i = (r, c) => a && r === 0 ? 0 : r + c;
  return {
    min: i(s, -Math.abs(o)),
    max: i(n, o)
  };
}
function Le(e, t) {
  return Object.assign(Object.create(e), t);
}
function qs(e, t = [
  ""
], a, s, n = () => e[0]) {
  const o = a || e;
  typeof s > "u" && (s = si("_fallback", e));
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
      return ei(r, c, () => bl(c, t, e, r));
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
function Ne(e, t, a, s) {
  const n = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: a,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: ti(e, s),
    setContext: (o) => Ne(e, o, a, s),
    override: (o) => Ne(e.override(o), t, a, s)
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
      return ei(o, i, () => ul(o, i, r));
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
function ti(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: a = t.scriptable, _indexable: s = t.indexable, _allKeys: n = t.allKeys } = e;
  return {
    allKeys: n,
    scriptable: a,
    indexable: s,
    isScriptable: me(a) ? a : () => a,
    isIndexable: me(s) ? s : () => s
  };
}
const dl = (e, t) => e ? e + zs(t) : t, Us = (e, t) => ht(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function ei(e, t, a) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const s = a();
  return e[t] = s, s;
}
function ul(e, t, a) {
  const { _proxy: s, _context: n, _subProxy: o, _descriptors: i } = e;
  let r = s[t];
  return me(r) && i.isScriptable(t) && (r = hl(t, r, e, a)), Mt(r) && r.length && (r = fl(t, r, e, i.isIndexable)), Us(t, r) && (r = Ne(r, n, o && o[t], i)), r;
}
function hl(e, t, a, s) {
  const { _proxy: n, _context: o, _subProxy: i, _stack: r } = a;
  if (r.has(e))
    throw new Error("Recursion detected: " + Array.from(r).join("->") + "->" + e);
  r.add(e);
  let c = t(o, i || s);
  return r.delete(e), Us(e, c) && (c = Ks(n._scopes, n, e, c)), c;
}
function fl(e, t, a, s) {
  const { _proxy: n, _context: o, _subProxy: i, _descriptors: r } = a;
  if (typeof o.index < "u" && s(e))
    return t[o.index % t.length];
  if (ht(t[0])) {
    const c = t, d = n._scopes.filter((u) => u !== c);
    t = [];
    for (const u of c) {
      const f = Ks(d, n, e, u);
      t.push(Ne(f, o, i && i[e], r));
    }
  }
  return t;
}
function ai(e, t, a) {
  return me(e) ? e(t, a) : e;
}
const gl = (e, t) => e === !0 ? t : typeof e == "string" ? Te(t, e) : void 0;
function pl(e, t, a, s, n) {
  for (const o of t) {
    const i = gl(a, o);
    if (i) {
      e.add(i);
      const r = ai(i._fallback, a, n);
      if (typeof r < "u" && r !== a && r !== s)
        return r;
    } else if (i === !1 && typeof s < "u" && a !== s)
      return null;
  }
  return !1;
}
function Ks(e, t, a, s) {
  const n = t._rootScopes, o = ai(t._fallback, a, s), i = [
    ...e,
    ...n
  ], r = /* @__PURE__ */ new Set();
  r.add(s);
  let c = xn(r, i, a, o || a, s);
  return c === null || typeof o < "u" && o !== a && (c = xn(r, i, o, c, s), c === null) ? !1 : qs(Array.from(r), [
    ""
  ], n, o, () => vl(t, a, s));
}
function xn(e, t, a, s, n) {
  for (; a; )
    a = pl(e, t, a, s, n);
  return a;
}
function vl(e, t, a) {
  const s = e._getTarget();
  t in s || (s[t] = {});
  const n = s[t];
  return Mt(n) && ht(a) ? a : n || {};
}
function bl(e, t, a, s) {
  let n;
  for (const o of t)
    if (n = si(dl(o, e), a), typeof n < "u")
      return Us(e, n) ? Ks(a, s, e, n) : n;
}
function si(e, t) {
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
  return t || (t = e._keys = ml(e._scopes)), t;
}
function ml(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of e)
    for (const s of Object.keys(a).filter((n) => !n.startsWith("_")))
      t.add(s);
  return Array.from(t);
}
const yl = Number.EPSILON || 1e-14, We = (e, t) => t < e.length && !e[t].skip && e[t], ni = (e) => e === "x" ? "y" : "x";
function _l(e, t, a, s) {
  const n = e.skip ? t : e, o = t, i = a.skip ? t : a, r = Ds(o, n), c = Ds(i, o);
  let d = r / (r + c), u = c / (r + c);
  d = isNaN(d) ? 0 : d, u = isNaN(u) ? 0 : u;
  const f = s * d, p = s * u;
  return {
    previous: {
      x: o.x - f * (i.x - n.x),
      y: o.y - f * (i.y - n.y)
    },
    next: {
      x: o.x + p * (i.x - n.x),
      y: o.y + p * (i.y - n.y)
    }
  };
}
function xl(e, t, a) {
  const s = e.length;
  let n, o, i, r, c, d = We(e, 0);
  for (let u = 0; u < s - 1; ++u)
    if (c = d, d = We(e, u + 1), !(!c || !d)) {
      if (oa(t[u], 0, yl)) {
        a[u] = a[u + 1] = 0;
        continue;
      }
      n = a[u] / t[u], o = a[u + 1] / t[u], r = Math.pow(n, 2) + Math.pow(o, 2), !(r <= 9) && (i = 3 / Math.sqrt(r), a[u] = n * i * t[u], a[u + 1] = o * i * t[u]);
    }
}
function kl(e, t, a = "x") {
  const s = ni(a), n = e.length;
  let o, i, r, c = We(e, 0);
  for (let d = 0; d < n; ++d) {
    if (i = r, r = c, c = We(e, d + 1), !r)
      continue;
    const u = r[a], f = r[s];
    i && (o = (u - i[a]) / 3, r[`cp1${a}`] = u - o, r[`cp1${s}`] = f - o * t[d]), c && (o = (c[a] - u) / 3, r[`cp2${a}`] = u + o, r[`cp2${s}`] = f + o * t[d]);
  }
}
function wl(e, t = "x") {
  const a = ni(t), s = e.length, n = Array(s).fill(0), o = Array(s);
  let i, r, c, d = We(e, 0);
  for (i = 0; i < s; ++i)
    if (r = c, c = d, d = We(e, i + 1), !!c) {
      if (d) {
        const u = d[t] - c[t];
        n[i] = u !== 0 ? (d[a] - c[a]) / u : 0;
      }
      o[i] = r ? d ? Jt(n[i - 1]) !== Jt(n[i]) ? 0 : (n[i - 1] + n[i]) / 2 : n[i - 1] : n[i];
    }
  xl(e, n, o), kl(e, o, t);
}
function Ma(e, t, a) {
  return Math.max(Math.min(e, a), t);
}
function $l(e, t) {
  let a, s, n, o, i, r = pa(e[0], t);
  for (a = 0, s = e.length; a < s; ++a)
    i = o, o = r, r = a < s - 1 && pa(e[a + 1], t), o && (n = e[a], i && (n.cp1x = Ma(n.cp1x, t.left, t.right), n.cp1y = Ma(n.cp1y, t.top, t.bottom)), r && (n.cp2x = Ma(n.cp2x, t.left, t.right), n.cp2y = Ma(n.cp2y, t.top, t.bottom)));
}
function Ml(e, t, a, s, n) {
  let o, i, r, c;
  if (t.spanGaps && (e = e.filter((d) => !d.skip)), t.cubicInterpolationMode === "monotone")
    wl(e, n);
  else {
    let d = s ? e[e.length - 1] : e[0];
    for (o = 0, i = e.length; o < i; ++o)
      r = e[o], c = _l(d, r, e[Math.min(o + 1, i - (s ? 0 : 1)) % i], t.tension), r.cp1x = c.previous.x, r.cp1y = c.previous.y, r.cp2x = c.next.x, r.cp2y = c.next.y, d = r;
  }
  t.capBezierPoints && $l(e, a);
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
function Cl(e, t) {
  return qa(e).getPropertyValue(t);
}
const Sl = [
  "top",
  "right",
  "bottom",
  "left"
];
function Ae(e, t, a) {
  const s = {};
  a = a ? "-" + a : "";
  for (let n = 0; n < 4; n++) {
    const o = Sl[n];
    s[o] = parseFloat(e[t + "-" + o + a]) || 0;
  }
  return s.width = s.left + s.right, s.height = s.top + s.bottom, s;
}
const Dl = (e, t, a) => (e > 0 || t > 0) && (!a || !a.shadowRoot);
function Al(e, t) {
  const a = e.touches, s = a && a.length ? a[0] : e, { offsetX: n, offsetY: o } = s;
  let i = !1, r, c;
  if (Dl(n, o, e.target))
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
  const { canvas: a, currentDevicePixelRatio: s } = t, n = qa(a), o = n.boxSizing === "border-box", i = Ae(n, "padding"), r = Ae(n, "border", "width"), { x: c, y: d, box: u } = Al(e, a), f = i.left + (u && r.left), p = i.top + (u && r.top);
  let { width: v, height: h } = t;
  return o && (v -= i.width + r.width, h -= i.height + r.height), {
    x: Math.round((c - f) / v * a.width / s),
    y: Math.round((d - p) / h * a.height / s)
  };
}
function Tl(e, t, a) {
  let s, n;
  if (t === void 0 || a === void 0) {
    const o = e && Gs(e);
    if (!o)
      t = e.clientWidth, a = e.clientHeight;
    else {
      const i = o.getBoundingClientRect(), r = qa(o), c = Ae(r, "border", "width"), d = Ae(r, "padding");
      t = i.width - d.width - c.width, a = i.height - d.height - c.height, s = Na(r.maxWidth, o, "clientWidth"), n = Na(r.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: a,
    maxWidth: s || Va,
    maxHeight: n || Va
  };
}
const pe = (e) => Math.round(e * 10) / 10;
function Bl(e, t, a, s) {
  const n = qa(e), o = Ae(n, "margin"), i = Na(n.maxWidth, e, "clientWidth") || Va, r = Na(n.maxHeight, e, "clientHeight") || Va, c = Tl(e, t, a);
  let { width: d, height: u } = c;
  if (n.boxSizing === "content-box") {
    const p = Ae(n, "border", "width"), v = Ae(n, "padding");
    d -= v.width + p.width, u -= v.height + p.height;
  }
  return d = Math.max(0, d - o.width), u = Math.max(0, s ? d / s : u - o.height), d = pe(Math.min(d, i, c.maxWidth)), u = pe(Math.min(u, r, c.maxHeight)), d && !u && (u = pe(d / 2)), (t !== void 0 || a !== void 0) && s && c.height && u > c.height && (u = c.height, d = pe(Math.floor(u * s))), {
    width: d,
    height: u
  };
}
function wn(e, t, a) {
  const s = t || 1, n = pe(e.height * s), o = pe(e.width * s);
  e.height = pe(e.height), e.width = pe(e.width);
  const i = e.canvas;
  return i.style && (a || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== s || i.height !== n || i.width !== o ? (e.currentDevicePixelRatio = s, i.height = n, i.width = o, e.ctx.setTransform(s, 0, 0, s, 0, 0), !0) : !1;
}
const Ll = (function() {
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
  const a = Cl(e, t), s = a && a.match(/^(\d+)(\.\d+)?px$/);
  return s ? +s[1] : void 0;
}
function Se(e, t, a, s) {
  return {
    x: e.x + a * (t.x - e.x),
    y: e.y + a * (t.y - e.y)
  };
}
function Fl(e, t, a, s) {
  return {
    x: e.x + a * (t.x - e.x),
    y: s === "middle" ? a < 0.5 ? e.y : t.y : s === "after" ? a < 1 ? e.y : t.y : a > 0 ? t.y : e.y
  };
}
function Pl(e, t, a, s) {
  const n = {
    x: e.cp2x,
    y: e.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, i = Se(e, n, a), r = Se(n, o, a), c = Se(o, t, a), d = Se(i, r, a), u = Se(r, c, a);
  return Se(d, u, a);
}
const Il = function(e, t) {
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
}, El = function() {
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
function ze(e, t, a) {
  return e ? Il(t, a) : El();
}
function oi(e, t) {
  let a, s;
  (t === "ltr" || t === "rtl") && (a = e.canvas.style, s = [
    a.getPropertyValue("direction"),
    a.getPropertyPriority("direction")
  ], a.setProperty("direction", t, "important"), e.prevTextDirection = s);
}
function ii(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function ri(e) {
  return e === "angle" ? {
    between: ga,
    compare: Ir,
    normalize: Wt
  } : {
    between: ie,
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
function Rl(e, t, a) {
  const { property: s, start: n, end: o } = a, { between: i, normalize: r } = ri(s), c = t.length;
  let { start: d, end: u, loop: f } = e, p, v;
  if (f) {
    for (d += c, u += c, p = 0, v = c; p < v && i(r(t[d % c][s]), n, o); ++p)
      d--, u--;
    d %= c, u %= c;
  }
  return u < d && (u += c), {
    start: d,
    end: u,
    loop: f,
    style: e.style
  };
}
function li(e, t, a) {
  if (!a)
    return [
      e
    ];
  const { property: s, start: n, end: o } = a, i = t.length, { compare: r, between: c, normalize: d } = ri(s), { start: u, end: f, loop: p, style: v } = Rl(e, t, a), h = [];
  let m = !1, _ = null, g, b, k;
  const w = () => c(n, k, g) && r(n, k) !== 0, M = () => r(o, g) === 0 || c(o, k, g), S = () => m || w(), D = () => !m || M();
  for (let A = u, B = u; A <= f; ++A)
    b = t[A % i], !b.skip && (g = d(b[s]), g !== k && (m = c(g, n, o), _ === null && S() && (_ = r(g, n) === 0 ? A : B), _ !== null && D() && (h.push(Mn({
      start: _,
      end: A,
      loop: p,
      count: i,
      style: v
    })), _ = null), B = A, k = g));
  return _ !== null && h.push(Mn({
    start: _,
    end: f,
    loop: p,
    count: i,
    style: v
  })), h;
}
function ci(e, t) {
  const a = [], s = e.segments;
  for (let n = 0; n < s.length; n++) {
    const o = li(s[n], e.points, t);
    o.length && a.push(...o);
  }
  return a;
}
function Ol(e, t, a, s) {
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
function Vl(e, t, a, s) {
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
function zl(e, t) {
  const a = e.points, s = e.options.spanGaps, n = a.length;
  if (!n)
    return [];
  const o = !!e._loop, { start: i, end: r } = Ol(a, n, o, s);
  if (s === !0)
    return Cn(e, [
      {
        start: i,
        end: r,
        loop: o
      }
    ], a, t);
  const c = r < i ? r + n : r, d = !!e._fullLoop && i === 0 && r === n - 1;
  return Cn(e, Vl(a, i, c, d), a, t);
}
function Cn(e, t, a, s) {
  return !s || !s.setContext || !a ? t : Nl(e, t, a, s);
}
function Nl(e, t, a, s) {
  const n = e._chart.getContext(), o = Sn(e.options), { _datasetIndex: i, options: { spanGaps: r } } = e, c = a.length, d = [];
  let u = o, f = t[0].start, p = f;
  function v(h, m, _, g) {
    const b = r ? -1 : 1;
    if (h !== m) {
      for (h += c; a[h % c].skip; )
        h -= b;
      for (; a[m % c].skip; )
        m += b;
      h % c !== m % c && (d.push({
        start: h % c,
        end: m % c,
        loop: _,
        style: g
      }), u = g, f = m % c);
    }
  }
  for (const h of t) {
    f = r ? f : h.start;
    let m = a[f % c], _;
    for (p = f + 1; p <= h.end; p++) {
      const g = a[p % c];
      _ = Sn(s.setContext(Le(n, {
        type: "segment",
        p0: m,
        p1: g,
        p0DataIndex: (p - 1) % c,
        p1DataIndex: p % c,
        datasetIndex: i
      }))), Wl(_, u) && v(f, p - 1, h.loop, u), m = g, u = _;
    }
    f < p - 1 && v(f, p - 1, h.loop, u);
  }
  return d;
}
function Sn(e) {
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
function Wl(e, t) {
  if (!t)
    return !1;
  const a = [], s = function(n, o) {
    return Hs(o) ? (a.includes(o) || a.push(o), a.indexOf(o)) : o;
  };
  return JSON.stringify(e, s) !== JSON.stringify(t, s);
}
function Ca(e, t, a) {
  return e.options.clip ? e[a] : t[a];
}
function Hl(e, t) {
  const { xScale: a, yScale: s } = e;
  return a && s ? {
    left: Ca(a, t, "left"),
    right: Ca(a, t, "right"),
    top: Ca(s, t, "top"),
    bottom: Ca(s, t, "bottom")
  } : t;
}
function di(e, t) {
  const a = t._clip;
  if (a.disabled)
    return !1;
  const s = Hl(t, e.chartArea);
  return {
    left: a.left === !1 ? 0 : s.left - (a.left === !0 ? 0 : a.left),
    right: a.right === !1 ? e.width : s.right + (a.right === !0 ? 0 : a.right),
    top: a.top === !1 ? 0 : s.top - (a.top === !0 ? 0 : a.top),
    bottom: a.bottom === !1 ? e.height : s.bottom + (a.bottom === !0 ? 0 : a.bottom)
  };
}
class jl {
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
    this._request || (this._running = !0, this._request = Xo.call(window, () => {
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
var ae = /* @__PURE__ */ new jl();
const Dn = "transparent", Yl = {
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
class ql {
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
    this._active = !0, this._fn = t.fn || Yl[t.type || typeof i], this._easing = ia[t.easing] || ia.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = a, this._prop = s, this._from = i, this._to = n, this._promises = void 0;
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
class ui {
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
    const s = a.options, n = Kl(t, s);
    if (!n)
      return [];
    const o = this._createAnimations(n, s);
    return s.$shared && Ul(t.options.$animations, s).then(() => {
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
      let f = o[d];
      const p = s.get(d);
      if (f)
        if (p && f.active()) {
          f.update(p, u, r);
          continue;
        } else
          f.cancel();
      if (!p || !p.duration) {
        t[d] = u;
        continue;
      }
      o[d] = f = new ql(p, t, d, u), n.push(f);
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
      return ae.add(this._chart, s), !0;
  }
}
function Ul(e, t) {
  const a = [], s = Object.keys(t);
  for (let n = 0; n < s.length; n++) {
    const o = e[s[n]];
    o && o.active() && a.push(o.wait());
  }
  return Promise.all(a);
}
function Kl(e, t) {
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
function Xl(e, t, a) {
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
function Gl(e) {
  let t, a, s, n;
  return ht(e) ? (t = e.top, a = e.right, s = e.bottom, n = e.left) : t = a = s = n = e, {
    top: t,
    right: a,
    bottom: s,
    left: n,
    disabled: e === !1
  };
}
function hi(e, t) {
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
    d = e.values[c], Lt(d) && (o || t === 0 || Jt(t) === Jt(d)) && (t += d);
  }
  return !u && !s.all ? 0 : t;
}
function Zl(e, t) {
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
function Ql(e, t, a) {
  return `${e.id}.${t.id}.${a.stack || a.type}`;
}
function Jl(e) {
  const { min: t, max: a, minDefined: s, maxDefined: n } = e.getUserBounds();
  return {
    min: s ? t : Number.NEGATIVE_INFINITY,
    max: n ? a : Number.POSITIVE_INFINITY
  };
}
function tc(e, t, a) {
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
  const { chart: a, _cachedMeta: s } = e, n = a._stacks || (a._stacks = {}), { iScale: o, vScale: i, index: r } = s, c = o.axis, d = i.axis, u = Ql(o, i, s), f = t.length;
  let p;
  for (let v = 0; v < f; ++v) {
    const h = t[v], { [c]: m, [d]: _ } = h, g = h._stacks || (h._stacks = {});
    p = g[d] = tc(n, u, m), p[r] = _, p._top = Bn(p, i, !0, s.type), p._bottom = Bn(p, i, !1, s.type);
    const b = p._visualValues || (p._visualValues = {});
    b[r] = _;
  }
}
function ns(e, t) {
  const a = e.scales;
  return Object.keys(a).filter((s) => a[s].axis === t).shift();
}
function ec(e, t) {
  return Le(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function ac(e, t, a) {
  return Le(e, {
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
const os = (e) => e === "reset" || e === "none", Fn = (e, t) => t ? e : Object.assign({}, e), sc = (e, t, a) => e && !t.hidden && t._stacked && {
  keys: hi(a, !0),
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
    const t = this.chart, a = this._cachedMeta, s = this.getDataset(), n = (f, p, v, h) => f === "x" ? p : f === "r" ? h : v, o = a.xAxisID = it(s.xAxisID, ns(t, "x")), i = a.yAxisID = it(s.yAxisID, ns(t, "y")), r = a.rAxisID = it(s.rAxisID, ns(t, "r")), c = a.indexAxis, d = a.iAxisID = n(c, o, i, r), u = a.vAxisID = n(c, i, o, r);
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
      this._data = Zl(a, n);
    } else if (s !== a) {
      if (s) {
        gn(s, this);
        const n = this._cachedMeta;
        Ke(n), n._parsed = [];
      }
      a && Object.isExtensible(a) && Vr(a, this), this._syncList = [], this._data = a;
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
    let c = t === 0 && a === n.length ? !0 : s._sorted, d = t > 0 && s._parsed[t - 1], u, f, p;
    if (this._parsing === !1)
      s._parsed = n, s._sorted = !0, p = n;
    else {
      Mt(n[t]) ? p = this.parseArrayData(s, n, t, a) : ht(n[t]) ? p = this.parseObjectData(s, n, t, a) : p = this.parsePrimitiveData(s, n, t, a);
      const v = () => f[r] === null || d && f[r] < d[r];
      for (u = 0; u < a; ++u)
        s._parsed[u + t] = f = p[u], c && (v() && (c = !1), d = f);
      s._sorted = c;
    }
    i && Ln(this, p);
  }
  parsePrimitiveData(t, a, s, n) {
    const { iScale: o, vScale: i } = t, r = o.axis, c = i.axis, d = o.getLabels(), u = o === i, f = new Array(n);
    let p, v, h;
    for (p = 0, v = n; p < v; ++p)
      h = p + s, f[p] = {
        [r]: u || o.parse(d[h], h),
        [c]: i.parse(a[h], h)
      };
    return f;
  }
  parseArrayData(t, a, s, n) {
    const { xScale: o, yScale: i } = t, r = new Array(n);
    let c, d, u, f;
    for (c = 0, d = n; c < d; ++c)
      u = c + s, f = a[u], r[c] = {
        x: o.parse(f[0], u),
        y: i.parse(f[1], u)
      };
    return r;
  }
  parseObjectData(t, a, s, n) {
    const { xScale: o, yScale: i } = t, { xAxisKey: r = "x", yAxisKey: c = "y" } = this._parsing, d = new Array(n);
    let u, f, p, v;
    for (u = 0, f = n; u < f; ++u)
      p = u + s, v = a[p], d[u] = {
        x: o.parse(Te(v, r), p),
        y: i.parse(Te(v, c), p)
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
      keys: hi(n, !0),
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
    const s = this._cachedMeta, n = s._parsed, o = s._sorted && t === s.iScale, i = n.length, r = this._getOtherScale(t), c = sc(a, s, this.chart), d = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: u, max: f } = Jl(r);
    let p, v;
    function h() {
      v = n[p];
      const m = v[r.axis];
      return !Lt(v[t.axis]) || u > m || f < m;
    }
    for (p = 0; p < i && !(!h() && (this.updateRangeFromParsed(d, t, v, c), o)); ++p)
      ;
    if (o) {
      for (p = i - 1; p >= 0; --p)
        if (!h()) {
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
      i = a[n][t.axis], Lt(i) && s.push(i);
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
    this.update(t || "default"), a._clip = Gl(it(this.options.clip, Xl(a.xScale, a.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, a = this.chart, s = this._cachedMeta, n = s.data || [], o = a.chartArea, i = [], r = this._drawStart || 0, c = this._drawCount || n.length - r, d = this.options.drawActiveElementsOnTop;
    let u;
    for (s.dataset && s.dataset.draw(t, o, r, c), u = r; u < r + c; ++u) {
      const f = n[u];
      f.hidden || (f.active && d ? i.push(f) : f.draw(t, o));
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
      o = i.$context || (i.$context = ac(this.getContext(), t, i)), o.parsed = this.getParsed(t), o.raw = n.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = ec(this.chart.getContext(), this.index)), o.dataset = n, o.index = o.datasetIndex = this.index;
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
    const d = this.chart.config, u = d.datasetElementScopeKeys(this._type, t), f = n ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], p = d.getOptionScopes(this.getDataset(), u), v = Object.keys($t.elements[t]), h = () => this.getContext(s, n, a), m = d.resolveNamedOptions(p, v, h, f);
    return m.$shared && (m.$shared = c, o[i] = Object.freeze(Fn(m, c))), m;
  }
  _resolveAnimations(t, a, s) {
    const n = this.chart, o = this._cachedDataOpts, i = `animation-${a}`, r = o[i];
    if (r)
      return r;
    let c;
    if (n.options.animation !== !1) {
      const u = this.chart.config, f = u.datasetAnimationScopeKeys(this._type, a), p = u.getOptionScopes(this.getDataset(), f);
      c = u.createResolver(p, this.getContext(t, s, a));
    }
    const d = new ui(n, c && c.animations);
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
function nc(e, t) {
  if (!e._cache.$bar) {
    const a = e.getMatchingVisibleMetas(t);
    let s = [];
    for (let n = 0, o = a.length; n < o; n++)
      s = s.concat(a[n].controller.getAllParsedValues(e));
    e._cache.$bar = Ko(s.sort((n, o) => n - o));
  }
  return e._cache.$bar;
}
function oc(e) {
  const t = e.iScale, a = nc(t, e.type);
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
function ic(e, t, a, s) {
  const n = a.barThickness;
  let o, i;
  return pt(n) ? (o = t.min * a.categoryPercentage, i = a.barPercentage) : (o = n * s, i = 1), {
    chunk: o / s,
    ratio: i,
    start: t.pixels[e] - o / 2
  };
}
function rc(e, t, a, s) {
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
function lc(e, t, a, s) {
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
function fi(e, t, a, s) {
  return Mt(e) ? lc(e, t, a, s) : t[a.axis] = a.parse(e, s), t;
}
function Pn(e, t, a, s) {
  const n = e.iScale, o = e.vScale, i = n.getLabels(), r = n === o, c = [];
  let d, u, f, p;
  for (d = a, u = a + s; d < u; ++d)
    p = t[d], f = {}, f[n.axis] = r || n.parse(i[d], d), c.push(fi(p, f, o, d));
  return c;
}
function is(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function cc(e, t, a) {
  return e !== 0 ? Jt(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= a ? 1 : -1);
}
function dc(e) {
  let t, a, s, n, o;
  return e.horizontal ? (t = e.base > e.x, a = "left", s = "right") : (t = e.base < e.y, a = "bottom", s = "top"), t ? (n = "end", o = "start") : (n = "start", o = "end"), {
    start: a,
    end: s,
    reverse: t,
    top: n,
    bottom: o
  };
}
function uc(e, t, a, s) {
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
  const { start: i, end: r, reverse: c, top: d, bottom: u } = dc(e);
  n === "middle" && a && (e.enableBorderRadius = !0, (a._top || 0) === s ? n = d : (a._bottom || 0) === s ? n = u : (o[In(u, i, r, c)] = !0, n = d)), o[In(n, i, r, c)] = !0, e.borderSkipped = o;
}
function In(e, t, a, s) {
  return s ? (e = hc(e, t, a), e = En(e, a, t)) : e = En(e, t, a), e;
}
function hc(e, t, a) {
  return e === t ? a : e === a ? t : e;
}
function En(e, t, a) {
  return e === "start" ? t : e === "end" ? a : e;
}
function fc(e, { inflateAmount: t }, a) {
  e.inflateAmount = t === "auto" ? a === 1 ? 0.33 : 0 : t;
}
class gc extends Ua {
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
    const { iScale: o, vScale: i } = t, { xAxisKey: r = "x", yAxisKey: c = "y" } = this._parsing, d = o.axis === "x" ? r : c, u = i.axis === "x" ? r : c, f = [];
    let p, v, h, m;
    for (p = s, v = s + n; p < v; ++p)
      m = a[p], h = {}, h[o.axis] = o.parse(Te(m, d), p), f.push(fi(Te(m, u), h, i, p));
    return f;
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
    const o = n === "reset", { index: i, _cachedMeta: { vScale: r } } = this, c = r.getBasePixel(), d = r.isHorizontal(), u = this._getRuler(), { sharedOptions: f, includeOptions: p } = this._getSharedOptions(a, n);
    for (let v = a; v < a + s; v++) {
      const h = this.getParsed(v), m = o || pt(h[r.axis]) ? {
        base: c,
        head: c
      } : this._calculateBarValuePixels(v), _ = this._calculateBarIndexPixels(v, u), g = (h._stacks || {})[r.axis], b = {
        horizontal: d,
        base: m.base,
        enableBorderRadius: !g || is(h._custom) || i === g._top || i === g._bottom,
        x: d ? m.head : _.center,
        y: d ? _.center : m.head,
        height: d ? _.size : Math.abs(m.size),
        width: d ? Math.abs(m.size) : _.size
      };
      p && (b.options = f || this.resolveDataElementOptions(v, t[v].active ? "active" : n));
      const k = b.options || t[v].options;
      uc(b, k, g, i), fc(b, k, u.ratio), this.updateElement(t[v], v, b, n);
    }
  }
  _getStacks(t, a) {
    const { iScale: s } = this._cachedMeta, n = s.getMatchingVisibleMetas(this._type).filter((u) => u.controller.options.grouped), o = s.options.stacked, i = [], r = this._cachedMeta.controller.getParsed(a), c = r && r[s.axis], d = (u) => {
      const f = u._parsed.find((v) => v[s.axis] === c), p = f && f[u.vScale.axis];
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
      min: r || oc(a),
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
    let f = c[a.axis], p = 0, v = s ? this.applyStack(a, c, s) : f, h, m;
    v !== f && (p = v - f, v = f), u && (f = d.barStart, v = d.barEnd - d.barStart, f !== 0 && Jt(f) !== Jt(d.barEnd) && (p = 0), p += f);
    const _ = !pt(o) && !u ? o : p;
    let g = a.getPixelForValue(_);
    if (this.chart.getDataVisibility(t) ? h = a.getPixelForValue(p + v) : h = g, m = h - g, Math.abs(m) < i) {
      m = cc(m, a, r) * i, f === r && (g -= m / 2);
      const b = a.getPixelForDecimal(0), k = a.getPixelForDecimal(1), w = Math.min(b, k), M = Math.max(b, k);
      g = Math.max(Math.min(g, M), w), h = g + m, s && !u && (c._stacks[a.axis]._visualValues[n] = a.getValueForPixel(h) - a.getValueForPixel(g));
    }
    if (g === a.getPixelForValue(r)) {
      const b = Jt(m) * a.getLineWidthForValue(r) / 2;
      g += b, m -= b;
    }
    return {
      size: m,
      base: g,
      head: h,
      center: h + m / 2
    };
  }
  _calculateBarIndexPixels(t, a) {
    const s = a.scale, n = this.options, o = n.skipNull, i = it(n.maxBarThickness, 1 / 0);
    let r, c;
    const d = this._getAxisCount();
    if (a.grouped) {
      const u = o ? this._getStackCount(t) : a.stackCount, f = n.barThickness === "flex" ? rc(t, a, n, u * d) : ic(t, a, n, u * d), p = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, v = this._getAxis().indexOf(it(p, this.getFirstScaleIdForIndexAxis())), h = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + v;
      r = f.start + f.chunk * h + f.chunk / 2, c = Math.min(i, f.chunk * f.ratio);
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
function pc(e, t, a) {
  let s = 1, n = 1, o = 0, i = 0;
  if (t < _t) {
    const r = e, c = r + t, d = Math.cos(r), u = Math.sin(r), f = Math.cos(c), p = Math.sin(c), v = (k, w, M) => ga(k, r, c, !0) ? 1 : Math.max(w, w * a, M, M * a), h = (k, w, M) => ga(k, r, c, !0) ? -1 : Math.min(w, w * a, M, M * a), m = v(0, d, f), _ = v(St, u, p), g = h(mt, d, f), b = h(mt + St, u, p);
    s = (m - g) / 2, n = (_ - b) / 2, o = -(m + g) / 2, i = -(_ + b) / 2;
  }
  return {
    ratioX: s,
    ratioY: n,
    offsetX: o,
    offsetY: i
  };
}
class vc extends Ua {
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
              const f = t.getDatasetMeta(0).controller.getStyle(d);
              return {
                text: c,
                fillStyle: f.backgroundColor,
                fontColor: o,
                hidden: !t.getDataVisibility(d),
                lineDash: f.borderDash,
                lineDashOffset: f.borderDashOffset,
                lineJoin: f.borderJoinStyle,
                lineWidth: f.borderWidth,
                strokeStyle: f.borderColor,
                textAlign: n,
                pointStyle: s,
                borderRadius: i && (r || f.borderRadius),
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
        o = (d) => +Te(s[d], c);
      }
      let i, r;
      for (i = t, r = t + a; i < r; ++i)
        n._parsed[i] = o(i);
    }
  }
  _getRotation() {
    return oe(this.options.rotation - 90);
  }
  _getCircumference() {
    return oe(this.options.circumference);
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
    const a = this.chart, { chartArea: s } = a, n = this._cachedMeta, o = n.data, i = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, r = Math.max((Math.min(s.width, s.height) - i) / 2, 0), c = Math.min(kr(this.options.cutout, r), 1), d = this._getRingWeight(this.index), { circumference: u, rotation: f } = this._getRotationExtents(), { ratioX: p, ratioY: v, offsetX: h, offsetY: m } = pc(f, u, c), _ = (s.width - i) / p, g = (s.height - i) / v, b = Math.max(Math.min(_, g) / 2, 0), k = Ho(this.options.radius, b), w = Math.max(k * c, 0), M = (k - w) / this._getVisibleDatasetWeightTotal();
    this.offsetX = h * k, this.offsetY = m * k, n.total = this.calculateTotal(), this.outerRadius = k - M * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - M * d, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, a) {
    const s = this.options, n = this._cachedMeta, o = this._getCircumference();
    return a && s.animation.animateRotate || !this.chart.getDataVisibility(t) || n._parsed[t] === null || n.data[t].hidden ? 0 : this.calculateCircumference(n._parsed[t] * o / _t);
  }
  updateElements(t, a, s, n) {
    const o = n === "reset", i = this.chart, r = i.chartArea, d = i.options.animation, u = (r.left + r.right) / 2, f = (r.top + r.bottom) / 2, p = o && d.animateScale, v = p ? 0 : this.innerRadius, h = p ? 0 : this.outerRadius, { sharedOptions: m, includeOptions: _ } = this._getSharedOptions(a, n);
    let g = this._getRotation(), b;
    for (b = 0; b < a; ++b)
      g += this._circumference(b, o);
    for (b = a; b < a + s; ++b) {
      const k = this._circumference(b, o), w = t[b], M = {
        x: u + this.offsetX,
        y: f + this.offsetY,
        startAngle: g,
        endAngle: g + k,
        circumference: k,
        outerRadius: h,
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
class bc extends Ua {
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
    let { start: r, count: c } = Wr(a, n, i);
    this._drawStart = r, this._drawCount = c, Hr(a) && (r = 0, c = n.length), s._chart = this.chart, s._datasetIndex = this.index, s._decimated = !!o._decimated, s.points = n;
    const d = this.resolveDatasetElementOptions(t);
    this.options.showLine || (d.borderWidth = 0), d.segment = this.options.segment, this.updateElement(s, void 0, {
      animated: !i,
      options: d
    }, t), this.updateElements(n, r, c, t);
  }
  updateElements(t, a, s, n) {
    const o = n === "reset", { iScale: i, vScale: r, _stacked: c, _dataset: d } = this._cachedMeta, { sharedOptions: u, includeOptions: f } = this._getSharedOptions(a, n), p = i.axis, v = r.axis, { spanGaps: h, segment: m } = this.options, _ = fa(h) ? h : Number.POSITIVE_INFINITY, g = this.chart._animationsDisabled || o || n === "none", b = a + s, k = t.length;
    let w = a > 0 && this.getParsed(a - 1);
    for (let M = 0; M < k; ++M) {
      const S = t[M], D = g ? S : {};
      if (M < a || M >= b) {
        D.skip = !0;
        continue;
      }
      const A = this.getParsed(M), B = pt(A[v]), F = D[p] = i.getPixelForValue(A[p], M), P = D[v] = o || B ? r.getBasePixel() : r.getPixelForValue(c ? this.applyStack(r, A, c) : A[v], M);
      D.skip = isNaN(F) || isNaN(P) || B, D.stop = M > 0 && Math.abs(A[p] - w[p]) > _, m && (D.parsed = A, D.raw = d.data[M]), f && (D.options = u || this.resolveDataElementOptions(M, S.active ? "active" : n)), g || this.updateElement(S, M, D, n), w = A;
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
class mc extends vc {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function $e() {
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
    return $e();
  }
  parse() {
    return $e();
  }
  format() {
    return $e();
  }
  add() {
    return $e();
  }
  diff() {
    return $e();
  }
  startOf() {
    return $e();
  }
  endOf() {
    return $e();
  }
}
var yc = {
  _date: Zs
};
function _c(e, t, a, s) {
  const { controller: n, data: o, _sorted: i } = e, r = n._cachedMeta.iScale, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (r && t === r.axis && t !== "r" && i && o.length) {
    const d = r._reversePixels ? Rr : De;
    if (s) {
      if (n._sharedOptions) {
        const u = o[0], f = typeof u.getRange == "function" && u.getRange(t);
        if (f) {
          const p = d(o, t, a - f), v = d(o, t, a + f);
          return {
            lo: p.lo,
            hi: v.hi
          };
        }
      }
    } else {
      const u = d(o, t, a);
      if (c) {
        const { vScale: f } = n._cachedMeta, { _parsed: p } = e, v = p.slice(0, u.lo + 1).reverse().findIndex((m) => !pt(m[f.axis]));
        u.lo -= Math.max(0, v);
        const h = p.slice(u.hi).findIndex((m) => !pt(m[f.axis]));
        u.hi += Math.max(0, h);
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
    const { index: d, data: u } = o[r], { lo: f, hi: p } = _c(o[r], t, i, n);
    for (let v = f; v <= p; ++v) {
      const h = u[v];
      h.skip || s(h, d, v);
    }
  }
}
function xc(e) {
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
function kc(e, t, a, s) {
  let n = [];
  function o(i, r, c) {
    const { startAngle: d, endAngle: u } = i.getProps([
      "startAngle",
      "endAngle"
    ], s), { angle: f } = qo(i, {
      x: t.x,
      y: t.y
    });
    ga(f, d, u) && n.push({
      element: i,
      datasetIndex: r,
      index: c
    });
  }
  return Ka(e, a, t, o), n;
}
function wc(e, t, a, s, n, o) {
  let i = [];
  const r = xc(a);
  let c = Number.POSITIVE_INFINITY;
  function d(u, f, p) {
    const v = u.inRange(t.x, t.y, n);
    if (s && !v)
      return;
    const h = u.getCenterPoint(n);
    if (!(!!o || e.isPointInArea(h)) && !v)
      return;
    const _ = r(t, h);
    _ < c ? (i = [
      {
        element: u,
        datasetIndex: f,
        index: p
      }
    ], c = _) : _ === c && i.push({
      element: u,
      datasetIndex: f,
      index: p
    });
  }
  return Ka(e, a, t, d), i;
}
function ls(e, t, a, s, n, o) {
  return !o && !e.isPointInArea(t) ? [] : a === "r" && !s ? kc(e, t, a, n) : wc(e, t, a, s, n, o);
}
function Rn(e, t, a, s, n) {
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
var $c = {
  modes: {
    index(e, t, a, s) {
      const n = Ce(t, e), o = a.axis || "x", i = a.includeInvisible || !1, r = a.intersect ? rs(e, n, o, s, i) : ls(e, n, o, !1, s, i), c = [];
      return r.length ? (e.getSortedVisibleDatasetMetas().forEach((d) => {
        const u = r[0].index, f = d.data[u];
        f && !f.skip && c.push({
          element: f,
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
      return Rn(e, n, "x", a.intersect, s);
    },
    y(e, t, a, s) {
      const n = Ce(t, e);
      return Rn(e, n, "y", a.intersect, s);
    }
  }
};
const gi = [
  "left",
  "top",
  "right",
  "bottom"
];
function Xe(e, t) {
  return e.filter((a) => a.pos === t);
}
function On(e, t) {
  return e.filter((a) => gi.indexOf(a.pos) === -1 && a.box.axis === t);
}
function Ge(e, t) {
  return e.sort((a, s) => {
    const n = t ? s : a, o = t ? a : s;
    return n.weight === o.weight ? n.index - o.index : n.weight - o.weight;
  });
}
function Mc(e) {
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
function Cc(e) {
  const t = {};
  for (const a of e) {
    const { stack: s, pos: n, stackWeight: o } = a;
    if (!s || !gi.includes(n))
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
function Sc(e, t) {
  const a = Cc(e), { vBoxMaxWidth: s, hBoxMaxHeight: n } = t;
  let o, i, r;
  for (o = 0, i = e.length; o < i; ++o) {
    r = e[o];
    const { fullSize: c } = r.box, d = a[r.stack], u = d && r.stackWeight / d.weight;
    r.horizontal ? (r.width = u ? u * s : c && t.availableWidth, r.height = n) : (r.width = s, r.height = u ? u * n : c && t.availableHeight);
  }
  return a;
}
function Dc(e) {
  const t = Mc(e), a = Ge(t.filter((d) => d.box.fullSize), !0), s = Ge(Xe(t, "left"), !0), n = Ge(Xe(t, "right")), o = Ge(Xe(t, "top"), !0), i = Ge(Xe(t, "bottom")), r = On(t, "x"), c = On(t, "y");
  return {
    fullSize: a,
    leftAndTop: s.concat(o),
    rightAndBottom: n.concat(c).concat(i).concat(r),
    chartArea: Xe(t, "chartArea"),
    vertical: s.concat(n).concat(c),
    horizontal: o.concat(i).concat(r)
  };
}
function Vn(e, t, a, s) {
  return Math.max(e[a], t[a]) + Math.max(e[s], t[s]);
}
function pi(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Ac(e, t, a, s) {
  const { pos: n, box: o } = a, i = e.maxPadding;
  if (!ht(n)) {
    a.size && (e[n] -= a.size);
    const f = s[a.stack] || {
      size: 0,
      count: 1
    };
    f.size = Math.max(f.size, a.horizontal ? o.height : o.width), a.size = f.size / f.count, e[n] += a.size;
  }
  o.getPadding && pi(i, o.getPadding());
  const r = Math.max(0, t.outerWidth - Vn(i, e, "left", "right")), c = Math.max(0, t.outerHeight - Vn(i, e, "top", "bottom")), d = r !== e.w, u = c !== e.h;
  return e.w = r, e.h = c, a.horizontal ? {
    same: d,
    other: u
  } : {
    same: u,
    other: d
  };
}
function Tc(e) {
  const t = e.maxPadding;
  function a(s) {
    const n = Math.max(t[s] - e[s], 0);
    return e[s] += n, n;
  }
  e.y += a("top"), e.x += a("left"), a("right"), a("bottom");
}
function Bc(e, t) {
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
    r = e[o], c = r.box, c.update(r.width || t.w, r.height || t.h, Bc(r.horizontal, t));
    const { same: f, other: p } = Ac(t, a, r, s);
    d |= f && n.length, u = u || p, c.fullSize || n.push(r);
  }
  return d && aa(n, t, a, s) || u;
}
function Sa(e, t, a, s, n) {
  e.top = a, e.left = t, e.right = t + s, e.bottom = a + n, e.width = s, e.height = n;
}
function zn(e, t, a, s) {
  const n = a.padding;
  let { x: o, y: i } = t;
  for (const r of e) {
    const c = r.box, d = s[r.stack] || {
      placed: 0,
      weight: 1
    }, u = r.stackWeight / d.weight || 1;
    if (r.horizontal) {
      const f = t.w * u, p = d.size || c.height;
      ha(d.start) && (i = d.start), c.fullSize ? Sa(c, n.left, i, a.outerWidth - n.right - n.left, p) : Sa(c, t.left + d.placed, i, f, p), d.start = i, d.placed += f, i = c.bottom;
    } else {
      const f = t.h * u, p = d.size || c.width;
      ha(d.start) && (o = d.start), c.fullSize ? Sa(c, o, n.top, p, a.outerHeight - n.bottom - n.top) : Sa(c, o, t.top + d.placed, p, f), d.start = o, d.placed += f, o = c.right;
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
    const n = Yt(e.options.layout.padding), o = Math.max(t - n.width, 0), i = Math.max(a - n.height, 0), r = Dc(e.boxes), c = r.vertical, d = r.horizontal;
    vt(e.boxes, (m) => {
      typeof m.beforeLayout == "function" && m.beforeLayout();
    });
    const u = c.reduce((m, _) => _.box.options && _.box.options.display === !1 ? m : m + 1, 0) || 1, f = Object.freeze({
      outerWidth: t,
      outerHeight: a,
      padding: n,
      availableWidth: o,
      availableHeight: i,
      vBoxMaxWidth: o / 2 / u,
      hBoxMaxHeight: i / 2
    }), p = Object.assign({}, n);
    pi(p, Yt(s));
    const v = Object.assign({
      maxPadding: p,
      w: o,
      h: i,
      x: n.left,
      y: n.top
    }, n), h = Sc(c.concat(d), f);
    aa(r.fullSize, v, f, h), aa(c, v, f, h), aa(d, v, f, h) && aa(c, v, f, h), Tc(v), zn(r.leftAndTop, v, f, h), v.x += v.w, v.y += v.h, zn(r.rightAndBottom, v, f, h), e.chartArea = {
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
class vi {
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
class Lc extends vi {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const Fa = "$chartjs", Fc = {
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
function Pc(e, t) {
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
const bi = Ll ? {
  passive: !0
} : !1;
function Ic(e, t, a) {
  e && e.addEventListener(t, a, bi);
}
function Ec(e, t, a) {
  e && e.canvas && e.canvas.removeEventListener(t, a, bi);
}
function Rc(e, t) {
  const a = Fc[e.type] || e.type, { x: s, y: n } = Ce(e, t);
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
function Oc(e, t, a) {
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
function Vc(e, t, a) {
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
function mi() {
  const e = window.devicePixelRatio;
  e !== Wn && (Wn = e, ba.forEach((t, a) => {
    a.currentDevicePixelRatio !== e && t();
  }));
}
function zc(e, t) {
  ba.size || window.addEventListener("resize", mi), ba.set(e, t);
}
function Nc(e) {
  ba.delete(e), ba.size || window.removeEventListener("resize", mi);
}
function Wc(e, t, a) {
  const s = e.canvas, n = s && Gs(s);
  if (!n)
    return;
  const o = Go((r, c) => {
    const d = n.clientWidth;
    a(r, c), d < n.clientWidth && a();
  }, window), i = new ResizeObserver((r) => {
    const c = r[0], d = c.contentRect.width, u = c.contentRect.height;
    d === 0 && u === 0 || o(d, u);
  });
  return i.observe(n), zc(e, o), i;
}
function cs(e, t, a) {
  a && a.disconnect(), t === "resize" && Nc(e);
}
function Hc(e, t, a) {
  const s = e.canvas, n = Go((o) => {
    e.ctx !== null && a(Rc(o, e));
  }, e);
  return Ic(s, t, n), n;
}
class jc extends vi {
  acquireContext(t, a) {
    const s = t && t.getContext && t.getContext("2d");
    return s && s.canvas === t ? (Pc(t, a), s) : null;
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
      attach: Oc,
      detach: Vc,
      resize: Wc
    }[a] || Hc;
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
    }[a] || Ec)(t, a, n), s[a] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, a, s, n) {
    return Bl(t, a, s, n);
  }
  isAttached(t) {
    const a = t && Gs(t);
    return !!(a && a.isConnected);
  }
}
function Yc(e) {
  return !Xs() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Lc : jc;
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
function qc(e, t) {
  const a = e.options.ticks, s = Uc(e), n = Math.min(a.maxTicksLimit || s, s), o = a.major.enabled ? Xc(t) : [], i = o.length, r = o[0], c = o[i - 1], d = [];
  if (i > n)
    return Gc(t, d, o, i / n), d;
  const u = Kc(o, t, n);
  if (i > 0) {
    let f, p;
    const v = i > 1 ? Math.round((c - r) / (i - 1)) : null;
    for (Da(t, d, u, pt(v) ? 0 : r - v, r), f = 0, p = i - 1; f < p; f++)
      Da(t, d, u, o[f], o[f + 1]);
    return Da(t, d, u, c, pt(v) ? t.length : c + v), d;
  }
  return Da(t, d, u), d;
}
function Uc(e) {
  const t = e.options.offset, a = e._tickSize(), s = e._length / a + (t ? 0 : 1), n = e._maxLength / a;
  return Math.floor(Math.min(s, n));
}
function Kc(e, t, a) {
  const s = Zc(e), n = t.length / a;
  if (!s)
    return Math.max(n, 1);
  const o = Tr(s);
  for (let i = 0, r = o.length - 1; i < r; i++) {
    const c = o[i];
    if (c > n)
      return c;
  }
  return Math.max(n, 1);
}
function Xc(e) {
  const t = [];
  let a, s;
  for (a = 0, s = e.length; a < s; a++)
    e[a].major && t.push(a);
  return t;
}
function Gc(e, t, a, s) {
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
function Zc(e) {
  const t = e.length;
  let a, s;
  if (t < 2)
    return !1;
  for (s = e[0], a = 1; a < t; ++a)
    if (e[a] - e[a - 1] !== s)
      return !1;
  return s;
}
const Qc = (e) => e === "left" ? "right" : e === "right" ? "left" : e, Hn = (e, t, a) => t === "top" || t === "left" ? e[t] + a : e[t] - a, jn = (e, t) => Math.min(t || e, e);
function Yn(e, t) {
  const a = [], s = e.length / t, n = e.length;
  let o = 0;
  for (; o < n; o += s)
    a.push(e[Math.floor(o)]);
  return a;
}
function Jc(e, t, a) {
  const s = e.ticks.length, n = Math.min(t, s - 1), o = e._startPixel, i = e._endPixel, r = 1e-6;
  let c = e.getPixelForTick(n), d;
  if (!(a && (s === 1 ? d = Math.max(c - o, i - c) : t === 0 ? d = (e.getPixelForTick(1) - c) / 2 : d = (c - e.getPixelForTick(n - 1)) / 2, c += n < t ? d : -d, c < o - r || c > i + r)))
    return c;
}
function td(e, t) {
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
  const a = Bt(e.font, t), s = Yt(e.padding);
  return (Mt(e.text) ? e.text.length : 1) * a.lineHeight + s.height;
}
function ed(e, t) {
  return Le(e, {
    scale: t,
    type: "scale"
  });
}
function ad(e, t, a) {
  return Le(e, {
    tick: a,
    index: t,
    type: "tick"
  });
}
function sd(e, t, a) {
  let s = Ws(e);
  return (a && t !== "right" || !a && t === "right") && (s = Qc(s)), s;
}
function nd(e, t, a, s) {
  const { top: n, left: o, bottom: i, right: r, chart: c } = e, { chartArea: d, scales: u } = c;
  let f = 0, p, v, h;
  const m = i - n, _ = r - o;
  if (e.isHorizontal()) {
    if (v = At(s, o, r), ht(a)) {
      const g = Object.keys(a)[0], b = a[g];
      h = u[g].getPixelForValue(b) + m - t;
    } else a === "center" ? h = (d.bottom + d.top) / 2 + m - t : h = Hn(e, a, t);
    p = r - o;
  } else {
    if (ht(a)) {
      const g = Object.keys(a)[0], b = a[g];
      v = u[g].getPixelForValue(b) - _ + t;
    } else a === "center" ? v = (d.left + d.right) / 2 - _ + t : v = Hn(e, a, t);
    h = At(s, i, n), f = a === "left" ? -St : St;
  }
  return {
    titleX: v,
    titleY: h,
    maxWidth: p,
    rotation: f
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
      minDefined: Lt(t),
      maxDefined: Lt(a)
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
    }, s), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + s.left + s.right : this.height + s.top + s.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = cl(this, o, n), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const c = r < this.ticks.length;
    this._convertTicksToLabels(c ? Yn(this.ticks, r) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = qc(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), c && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
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
    const u = this._getLabelSizes(), f = u.widest.width, p = u.highest.height, v = Tt(this.chart.width - f, 0, this.maxWidth);
    r = t.offset ? this.maxWidth / s : v / (s - 1), f + 6 > r && (r = v / (s - (t.offset ? 0.5 : 1)), c = this.maxHeight - Ze(t.grid) - a.padding - qn(t.title, this.chart.options.font), d = Math.sqrt(f * f + p * p), i = Pr(Math.min(Math.asin(Tt((u.highest.height + 6) / r, -1, 1)), Math.asin(Tt(c / d, -1, 1)) - Math.asin(Tt(p / d, -1, 1)))), i = Math.max(n, Math.min(o, i))), this.labelRotation = i;
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
        const { first: d, last: u, widest: f, highest: p } = this._getLabelSizes(), v = s.padding * 2, h = oe(this.labelRotation), m = Math.cos(h), _ = Math.sin(h);
        if (r) {
          const g = s.mirror ? 0 : _ * f.width + m * p.height;
          t.height = Math.min(this.maxHeight, t.height + g + v);
        } else {
          const g = s.mirror ? 0 : m * f.width + _ * p.height;
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
      const u = this.getPixelForTick(0) - this.left, f = this.right - this.getPixelForTick(this.ticks.length - 1);
      let p = 0, v = 0;
      c ? d ? (p = n * t.width, v = s * a.height) : (p = s * t.height, v = n * a.width) : o === "start" ? v = a.width : o === "end" ? p = t.width : o !== "inner" && (p = t.width / 2, v = a.width / 2), this.paddingLeft = Math.max((p - u + i) * this.width / (this.width - u), 0), this.paddingRight = Math.max((v - f + i) * this.width / (this.width - f), 0);
    } else {
      let u = a.height / 2, f = t.height / 2;
      o === "start" ? (u = 0, f = t.height) : o === "end" && (u = a.height, f = 0), this.paddingTop = u + i, this.paddingBottom = f + i;
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
    let d = 0, u = 0, f, p, v, h, m, _, g, b, k, w, M;
    for (f = 0; f < a; f += c) {
      if (h = t[f].label, m = this._resolveTickFontOptions(f), n.font = _ = m.string, g = o[_] = o[_] || {
        data: {},
        gc: []
      }, b = m.lineHeight, k = w = 0, !pt(h) && !Mt(h))
        k = yn(n, g.data, g.gc, k, h), w = b;
      else if (Mt(h))
        for (p = 0, v = h.length; p < v; ++p)
          M = h[p], !pt(M) && !Mt(M) && (k = yn(n, g.data, g.gc, k, M), w += b);
      i.push(k), r.push(w), d = Math.max(k, d), u = Math.max(w, u);
    }
    td(o, a);
    const S = i.indexOf(d), D = r.indexOf(u), A = (B) => ({
      width: i[B] || 0,
      height: r[B] || 0
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
    return Er(this._alignToPixels ? we(this.chart, a, 0) : a);
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
      return s.$context || (s.$context = ad(this.getContext(), t, s));
    }
    return this.$context || (this.$context = ed(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, a = oe(this.labelRotation), s = Math.abs(Math.cos(a)), n = Math.abs(Math.sin(a)), o = this._getLabelSizes(), i = t.autoSkipPadding || 0, r = o ? o.widest.width + i : 0, c = o ? o.highest.height + i : 0;
    return this.isHorizontal() ? c * s > r * n ? r / s : c / n : c * n < r * s ? c / s : r / n;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const a = this.axis, s = this.chart, n = this.options, { grid: o, position: i, border: r } = n, c = o.offset, d = this.isHorizontal(), f = this.ticks.length + (c ? 1 : 0), p = Ze(o), v = [], h = r.setContext(this.getContext()), m = h.display ? h.width : 0, _ = m / 2, g = function(O) {
      return we(s, O, m);
    };
    let b, k, w, M, S, D, A, B, F, P, R, N;
    if (i === "top")
      b = g(this.bottom), D = this.bottom - p, B = b - _, P = g(t.top) + _, N = t.bottom;
    else if (i === "bottom")
      b = g(this.top), P = t.top, N = g(t.bottom) - _, D = b + _, B = this.top + p;
    else if (i === "left")
      b = g(this.right), S = this.right - p, A = b - _, F = g(t.left) + _, R = t.right;
    else if (i === "right")
      b = g(this.left), F = t.left, R = g(t.right) - _, S = b + _, A = this.left + p;
    else if (a === "x") {
      if (i === "center")
        b = g((t.top + t.bottom) / 2 + 0.5);
      else if (ht(i)) {
        const O = Object.keys(i)[0], j = i[O];
        b = g(this.chart.scales[O].getPixelForValue(j));
      }
      P = t.top, N = t.bottom, D = b + _, B = D + p;
    } else if (a === "y") {
      if (i === "center")
        b = g((t.left + t.right) / 2);
      else if (ht(i)) {
        const O = Object.keys(i)[0], j = i[O];
        b = g(this.chart.scales[O].getPixelForValue(j));
      }
      S = b - _, A = S - p, F = t.left, R = t.right;
    }
    const Y = it(n.ticks.maxTicksLimit, f), L = Math.max(1, Math.ceil(f / Y));
    for (k = 0; k < f; k += L) {
      const O = this.getContext(k), j = o.setContext(O), V = r.setContext(O), z = j.lineWidth, H = j.color, et = V.dash || [], G = V.dashOffset, U = j.tickWidth, ot = j.tickColor, wt = j.tickBorderDash || [], gt = j.tickBorderDashOffset;
      w = Jc(this, k, c), w !== void 0 && (M = we(s, w, z), d ? S = A = F = R = M : D = B = P = N = M, v.push({
        tx1: S,
        ty1: D,
        tx2: A,
        ty2: B,
        x1: F,
        y1: P,
        x2: R,
        y2: N,
        width: z,
        color: H,
        borderDash: et,
        borderDashOffset: G,
        tickWidth: U,
        tickColor: ot,
        tickBorderDash: wt,
        tickBorderDashOffset: gt
      }));
    }
    return this._ticksLength = f, this._borderValue = b, v;
  }
  _computeLabelItems(t) {
    const a = this.axis, s = this.options, { position: n, ticks: o } = s, i = this.isHorizontal(), r = this.ticks, { align: c, crossAlign: d, padding: u, mirror: f } = o, p = Ze(s.grid), v = p + u, h = f ? -u : v, m = -oe(this.labelRotation), _ = [];
    let g, b, k, w, M, S, D, A, B, F, P, R, N = "middle";
    if (n === "top")
      S = this.bottom - h, D = this._getXAxisLabelAlignment();
    else if (n === "bottom")
      S = this.top + h, D = this._getXAxisLabelAlignment();
    else if (n === "left") {
      const L = this._getYAxisLabelAlignment(p);
      D = L.textAlign, M = L.x;
    } else if (n === "right") {
      const L = this._getYAxisLabelAlignment(p);
      D = L.textAlign, M = L.x;
    } else if (a === "x") {
      if (n === "center")
        S = (t.top + t.bottom) / 2 + v;
      else if (ht(n)) {
        const L = Object.keys(n)[0], O = n[L];
        S = this.chart.scales[L].getPixelForValue(O) + v;
      }
      D = this._getXAxisLabelAlignment();
    } else if (a === "y") {
      if (n === "center")
        M = (t.left + t.right) / 2 - v;
      else if (ht(n)) {
        const L = Object.keys(n)[0], O = n[L];
        M = this.chart.scales[L].getPixelForValue(O);
      }
      D = this._getYAxisLabelAlignment(p).textAlign;
    }
    a === "y" && (c === "start" ? N = "top" : c === "end" && (N = "bottom"));
    const Y = this._getLabelSizes();
    for (g = 0, b = r.length; g < b; ++g) {
      k = r[g], w = k.label;
      const L = o.setContext(this.getContext(g));
      A = this.getPixelForTick(g) + o.labelOffset, B = this._resolveTickFontOptions(g), F = B.lineHeight, P = Mt(w) ? w.length : 1;
      const O = P / 2, j = L.color, V = L.textStrokeColor, z = L.textStrokeWidth;
      let H = D;
      i ? (M = A, D === "inner" && (g === b - 1 ? H = this.options.reverse ? "left" : "right" : g === 0 ? H = this.options.reverse ? "right" : "left" : H = "center"), n === "top" ? d === "near" || m !== 0 ? R = -P * F + F / 2 : d === "center" ? R = -Y.highest.height / 2 - O * F + F : R = -Y.highest.height + F / 2 : d === "near" || m !== 0 ? R = F / 2 : d === "center" ? R = Y.highest.height / 2 - O * F : R = Y.highest.height - P * F, f && (R *= -1), m !== 0 && !L.showLabelBackdrop && (M += F / 2 * Math.sin(m))) : (S = A, R = (1 - P) * F / 2);
      let et;
      if (L.showLabelBackdrop) {
        const G = Yt(L.backdropPadding), U = Y.heights[g], ot = Y.widths[g];
        let wt = R - G.top, gt = 0 - G.left;
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
          width: ot + G.width,
          height: U + G.height,
          color: L.backdropColor
        };
      }
      _.push({
        label: w,
        font: B,
        textOffset: R,
        options: {
          rotation: m,
          color: j,
          strokeColor: V,
          strokeWidth: z,
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
    if (-oe(this.labelRotation))
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
    let d, u, f, p;
    this.isHorizontal() ? (d = we(t, this.left, i) - i / 2, u = we(t, this.right, r) + r / 2, f = p = c) : (f = we(t, this.top, i) - i / 2, p = we(t, this.bottom, r) + r / 2, d = u = c), a.save(), a.lineWidth = o.width, a.strokeStyle = o.color, a.beginPath(), a.moveTo(d, f), a.lineTo(u, p), a.stroke(), a.restore();
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
    const o = Bt(s.font), i = Yt(s.padding), r = s.align;
    let c = o.lineHeight / 2;
    a === "bottom" || a === "center" || ht(a) ? (c += i.bottom, Mt(s.text) && (c += o.lineHeight * (s.text.length - 1))) : c += i.top;
    const { titleX: d, titleY: u, maxWidth: f, rotation: p } = nd(this, c, a, r);
    va(t, s.text, 0, 0, o, {
      color: s.color,
      maxWidth: f,
      rotation: p,
      textAlign: sd(r, a, n),
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
    return Bt(a.font);
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
    rd(a) && (s = this.register(a));
    const n = this.items, o = t.id, i = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in n || (n[o] = t, od(t, i, s), this.override && $t.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const a = this.items, s = t.id, n = this.scope;
    s in a && delete a[s], n && s in $t[n] && (delete $t[n][s], this.override && delete Be[s]);
  }
}
function od(e, t, a) {
  const s = ua(/* @__PURE__ */ Object.create(null), [
    a ? $t.get(a) : {},
    $t.get(t),
    e.defaults
  ]);
  $t.set(t, s), e.defaultRoutes && id(t, e.defaultRoutes), e.descriptors && $t.describe(t, e.descriptors);
}
function id(e, t) {
  Object.keys(t).forEach((a) => {
    const s = a.split("."), n = s.pop(), o = [
      e
    ].concat(s).join("."), i = t[a].split("."), r = i.pop(), c = i.join(".");
    $t.route(o, n, c, r);
  });
}
function rd(e) {
  return "id" in e && "defaults" in e;
}
class ld {
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
    const n = zs(t);
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
var Zt = /* @__PURE__ */ new ld();
class cd {
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
    const s = t && t.config, n = it(s.options && s.options.plugins, {}), o = dd(s);
    return n === !1 && !a ? [] : hd(t, o, n, a);
  }
  _notifyStateChanges(t) {
    const a = this._oldCache || [], s = this._cache, n = (o, i) => o.filter((r) => !i.some((c) => r.plugin.id === c.plugin.id));
    this._notify(n(a, s), t, "stop"), this._notify(n(s, a), t, "start");
  }
}
function dd(e) {
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
function ud(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function hd(e, { plugins: t, localIds: a }, s, n) {
  const o = [], i = e.getContext();
  for (const r of t) {
    const c = r.id, d = ud(s[c], n);
    d !== null && o.push({
      plugin: r,
      options: fd(e.config, {
        plugin: r,
        local: a[c]
      }, d, i)
    });
  }
  return o;
}
function fd(e, { plugin: t, local: a }, s, n) {
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
function gd(e, t) {
  let a = e;
  return e === "_index_" ? a = t : e === "_value_" && (a = t === "x" ? "y" : "x"), a;
}
function pd(e, t) {
  return e === t ? "_index_" : "_value_";
}
function Un(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function vd(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Ls(e, ...t) {
  if (Un(e))
    return e;
  for (const a of t) {
    const s = a.axis || vd(a.position) || e.length > 1 && Un(e[0].toLowerCase());
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
function bd(e, t) {
  if (t.data && t.data.datasets) {
    const a = t.data.datasets.filter((s) => s.xAxisID === e || s.yAxisID === e);
    if (a.length)
      return Kn(e, "x", a[0]) || Kn(e, "y", a[0]);
  }
  return {};
}
function md(e, t) {
  const a = Be[e.type] || {
    scales: {}
  }, s = t.scales || {}, n = Bs(e.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(s).forEach((i) => {
    const r = s[i];
    if (!ht(r))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (r._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const c = Ls(i, r, bd(i, e), $t.scales[r.type]), d = pd(c, n), u = a.scales || {};
    o[i] = na(/* @__PURE__ */ Object.create(null), [
      {
        axis: c
      },
      r,
      u[c],
      u[d]
    ]);
  }), e.data.datasets.forEach((i) => {
    const r = i.type || e.type, c = i.indexAxis || Bs(r, t), u = (Be[r] || {}).scales || {};
    Object.keys(u).forEach((f) => {
      const p = gd(f, c), v = i[p + "AxisID"] || p;
      o[v] = o[v] || /* @__PURE__ */ Object.create(null), na(o[v], [
        {
          axis: p
        },
        s[v],
        u[f]
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
function yi(e) {
  const t = e.options || (e.options = {});
  t.plugins = it(t.plugins, {}), t.scales = md(e, t);
}
function _i(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function yd(e) {
  return e = e || {}, e.data = _i(e.data), yi(e), e;
}
const Xn = /* @__PURE__ */ new Map(), xi = /* @__PURE__ */ new Set();
function Ta(e, t) {
  let a = Xn.get(e);
  return a || (a = t(), Xn.set(e, a), xi.add(a)), a;
}
const Qe = (e, t, a) => {
  const s = Te(t, a);
  s !== void 0 && e.add(s);
};
class _d {
  constructor(t) {
    this._config = yd(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = _i(t);
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
    this.clearCache(), yi(t);
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
      t && (c.add(t), u.forEach((f) => Qe(c, t, f))), u.forEach((f) => Qe(c, n, f)), u.forEach((f) => Qe(c, Be[o] || {}, f)), u.forEach((f) => Qe(c, $t, f)), u.forEach((f) => Qe(c, As, f));
    });
    const d = Array.from(c);
    return d.length === 0 && d.push(/* @__PURE__ */ Object.create(null)), xi.has(a) && i.set(a, d), d;
  }
  chartOptionScopes() {
    const { options: t, type: a } = this;
    return [
      t,
      Be[a] || {},
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
    if (kd(i, a)) {
      o.$shared = !1, s = me(s) ? s() : s;
      const d = this.createResolver(t, s, r);
      c = Ne(i, s, d);
    }
    for (const d of a)
      o[d] = c[d];
    return o;
  }
  createResolver(t, a, s = [
    ""
  ], n) {
    const { resolver: o } = Gn(this._resolverCache, t, s);
    return ht(a) ? Ne(o, a, void 0, n) : o;
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
const xd = (e) => ht(e) && Object.getOwnPropertyNames(e).some((t) => me(e[t]));
function kd(e, t) {
  const { isScriptable: a, isIndexable: s } = ti(e);
  for (const n of t) {
    const o = a(n), i = s(n), r = (i || o) && e[n];
    if (o && (me(r) || xd(r)) || i && Mt(r))
      return !0;
  }
  return !1;
}
var wd = "4.5.1";
const $d = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Zn(e, t) {
  return e === "top" || e === "bottom" || $d.indexOf(e) === -1 && t === "x";
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
function Md(e) {
  const t = e.chart, a = t.options.animation;
  yt(a && a.onProgress, [
    e
  ], t);
}
function ki(e) {
  return Xs() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const Pa = {}, to = (e) => {
  const t = ki(e);
  return Object.values(Pa).filter((a) => a.canvas === t).pop();
};
function Cd(e, t, a) {
  const s = Object.keys(e);
  for (const n of s) {
    const o = +n;
    if (o >= t) {
      const i = e[n];
      delete e[n], (a > 0 || o > t) && (e[o + a] = i);
    }
  }
}
function Sd(e, t, a, s) {
  return !a || e.type === "mouseout" ? null : s ? t : e;
}
let Ye = class {
  static defaults = $t;
  static instances = Pa;
  static overrides = Be;
  static registry = Zt;
  static version = wd;
  static getChart = to;
  static register(...t) {
    Zt.add(...t), eo();
  }
  static unregister(...t) {
    Zt.remove(...t), eo();
  }
  constructor(t, a) {
    const s = this.config = new _d(a), n = ki(t), o = to(n);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const i = s.createResolver(s.chartOptionScopes(), this.getContext());
    this.platform = new (s.platform || Yc(n))(), this.platform.updateConfig(s);
    const r = this.platform.acquireContext(n, i.aspectRatio), c = r && r.canvas, d = c && c.height, u = c && c.width;
    if (this.id = xr(), this.ctx = r, this.canvas = c, this.width = u, this.height = d, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new cd(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = zr((f) => this.update(f), i.resizeDelay || 0), this._dataChanges = [], Pa[this.id] = this, !r || !c) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    ae.listen(this, "complete", Jn), ae.listen(this, "progress", Md), this._initialize(), this.attached && this.update();
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
    return ae.stop(this), this;
  }
  resize(t, a) {
    ae.running(this) ? this._resizeBeforeDraw = {
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
      let f = null;
      if (c in s && s[c].type === u)
        f = s[c];
      else {
        const p = Zt.getScale(u);
        f = new p({
          id: c,
          type: u,
          ctx: this.ctx,
          chart: this
        }), s[f.id] = f;
      }
      f.init(r, t);
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
      const { controller: f } = this.getDatasetMeta(d), p = !n && o.indexOf(f) === -1;
      f.buildOrUpdateElements(p), i = Math.max(+f.getMaxOverflow(), i);
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
      Cd(t, n, i);
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
        this._updateDataset(a, me(t) ? t({
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
    }) !== !1 && (ae.has(this) ? this.attached && !ae.running(this) && ae.start(this) : (this.draw(), Jn({
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
    }, n = di(this, t);
    this.notifyPlugins("beforeDatasetDraw", s) !== !1 && (n && ja(a, n), t.controller.draw(), n && Ya(a), s.cancelable = !1, this.notifyPlugins("afterDatasetDraw", s));
  }
  isPointInArea(t) {
    return pa(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, a, s, n) {
    const o = $c.modes[a];
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
    return this.$context || (this.$context = Le(null, {
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
    for (this.stop(), ae.remove(this), t = 0, a = this.data.datasets.length; t < a; ++t)
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
    !Ra(s, a) && (this._active = s, this._lastEvent = null, this._updateHoverStyles(s, a));
  }
  notifyPlugins(t, a, s) {
    return this._plugins.notify(this, t, a, s);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((a) => a.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, a, s) {
    const n = this.options.hover, o = (c, d) => c.filter((u) => !d.some((f) => u.datasetIndex === f.datasetIndex && u.index === f.index)), i = o(a, t), r = s ? t : o(t, a);
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
    const { _active: n = [], options: o } = this, i = a, r = this._getActiveElements(t, n, s, i), c = Sr(t), d = Sd(t, this._lastEvent, s, c);
    s && (this._lastEvent = null, yt(o.onHover, [
      t,
      r,
      this
    ], this), c && yt(o.onClick, [
      t,
      r,
      this
    ], this));
    const u = !Ra(r, n);
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
function Dd(e, t, a) {
  const { startAngle: s, x: n, y: o, outerRadius: i, innerRadius: r, options: c } = t, { borderWidth: d, borderJoinStyle: u } = c, f = Math.min(d / i, Wt(s - a));
  if (e.beginPath(), e.arc(n, o, i - d / 2, s + f / 2, a - f / 2), r > 0) {
    const p = Math.min(d / r, Wt(s - a));
    e.arc(n, o, r + d / 2, a - p / 2, s + p / 2, !0);
  } else {
    const p = Math.min(d / 2, i * Wt(s - a));
    if (u === "round")
      e.arc(n, o, p, a - mt / 2, s + mt / 2, !0);
    else if (u === "bevel") {
      const v = 2 * p * p, h = -v * Math.cos(a + mt / 2) + n, m = -v * Math.sin(a + mt / 2) + o, _ = v * Math.cos(s + mt / 2) + n, g = v * Math.sin(s + mt / 2) + o;
      e.lineTo(h, m), e.lineTo(_, g);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Ad(e, t, a) {
  const { startAngle: s, pixelMargin: n, x: o, y: i, outerRadius: r, innerRadius: c } = t;
  let d = n / r;
  e.beginPath(), e.arc(o, i, r, s - d, a + d), c > n ? (d = n / c, e.arc(o, i, c, a + d, s - d, !0)) : e.arc(o, i, n, a + St, s - St), e.closePath(), e.clip();
}
function Td(e) {
  return Ys(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Bd(e, t, a, s) {
  const n = Td(e.options.borderRadius), o = (a - t) / 2, i = Math.min(o, s * t / 2), r = (c) => {
    const d = (a - Math.min(o, c)) * s / 2;
    return Tt(c, 0, Math.min(o, d));
  };
  return {
    outerStart: r(n.outerStart),
    outerEnd: r(n.outerEnd),
    innerStart: Tt(n.innerStart, 0, i),
    innerEnd: Tt(n.innerEnd, 0, i)
  };
}
function Ie(e, t, a, s) {
  return {
    x: a + e * Math.cos(t),
    y: s + e * Math.sin(t)
  };
}
function Ha(e, t, a, s, n, o) {
  const { x: i, y: r, startAngle: c, pixelMargin: d, innerRadius: u } = t, f = Math.max(t.outerRadius + s + a - d, 0), p = u > 0 ? u + s + a + d : 0;
  let v = 0;
  const h = n - c;
  if (s) {
    const L = u > 0 ? u - s : 0, O = f > 0 ? f - s : 0, j = (L + O) / 2, V = j !== 0 ? h * j / (j + s) : h;
    v = (h - V) / 2;
  }
  const m = Math.max(1e-3, h * f - a / mt) / f, _ = (h - m) / 2, g = c + _ + v, b = n - _ - v, { outerStart: k, outerEnd: w, innerStart: M, innerEnd: S } = Bd(t, p, f, b - g), D = f - k, A = f - w, B = g + k / D, F = b - w / A, P = p + M, R = p + S, N = g + M / P, Y = b - S / R;
  if (e.beginPath(), o) {
    const L = (B + F) / 2;
    if (e.arc(i, r, f, B, L), e.arc(i, r, f, L, F), w > 0) {
      const z = Ie(A, F, i, r);
      e.arc(z.x, z.y, w, F, b + St);
    }
    const O = Ie(R, b, i, r);
    if (e.lineTo(O.x, O.y), S > 0) {
      const z = Ie(R, Y, i, r);
      e.arc(z.x, z.y, S, b + St, Y + Math.PI);
    }
    const j = (b - S / p + (g + M / p)) / 2;
    if (e.arc(i, r, p, b - S / p, j, !0), e.arc(i, r, p, j, g + M / p, !0), M > 0) {
      const z = Ie(P, N, i, r);
      e.arc(z.x, z.y, M, N + Math.PI, g - St);
    }
    const V = Ie(D, g, i, r);
    if (e.lineTo(V.x, V.y), k > 0) {
      const z = Ie(D, B, i, r);
      e.arc(z.x, z.y, k, g - St, B);
    }
  } else {
    e.moveTo(i, r);
    const L = Math.cos(B) * f + i, O = Math.sin(B) * f + r;
    e.lineTo(L, O);
    const j = Math.cos(F) * f + i, V = Math.sin(F) * f + r;
    e.lineTo(j, V);
  }
  e.closePath();
}
function Ld(e, t, a, s, n) {
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
function Fd(e, t, a, s, n) {
  const { fullCircles: o, startAngle: i, circumference: r, options: c } = t, { borderWidth: d, borderJoinStyle: u, borderDash: f, borderDashOffset: p, borderRadius: v } = c, h = c.borderAlign === "inner";
  if (!d)
    return;
  e.setLineDash(f || []), e.lineDashOffset = p, h ? (e.lineWidth = d * 2, e.lineJoin = u || "round") : (e.lineWidth = d, e.lineJoin = u || "bevel");
  let m = t.endAngle;
  if (o) {
    Ha(e, t, a, s, m, n);
    for (let _ = 0; _ < o; ++_)
      e.stroke();
    isNaN(r) || (m = i + (r % _t || _t));
  }
  h && Ad(e, t, m), c.selfJoin && m - i >= mt && v === 0 && u !== "miter" && Dd(e, t, m), o || (Ha(e, t, a, s, m, n), e.stroke());
}
class Pd extends ce {
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
    ], s), { angle: o, distance: i } = qo(n, {
      x: t,
      y: a
    }), { startAngle: r, endAngle: c, innerRadius: d, outerRadius: u, circumference: f } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], s), p = (this.options.spacing + this.options.borderWidth) / 2, v = it(f, c - r), h = ga(o, r, c) && r !== c, m = v >= _t || h, _ = ie(i, d + p, u + p);
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
    ], t), { offset: c, spacing: d } = this.options, u = (n + o) / 2, f = (i + r + d + c) / 2;
    return {
      x: a + Math.cos(u) * f,
      y: s + Math.sin(u) * f
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
    t.fillStyle = a.backgroundColor, t.strokeStyle = a.borderColor, Ld(t, this, d, o, i), Fd(t, this, d, o, i), t.restore();
  }
}
function wi(e, t, a = t) {
  e.lineCap = it(a.borderCapStyle, t.borderCapStyle), e.setLineDash(it(a.borderDash, t.borderDash)), e.lineDashOffset = it(a.borderDashOffset, t.borderDashOffset), e.lineJoin = it(a.borderJoinStyle, t.borderJoinStyle), e.lineWidth = it(a.borderWidth, t.borderWidth), e.strokeStyle = it(a.borderColor, t.borderColor);
}
function Id(e, t, a) {
  e.lineTo(a.x, a.y);
}
function Ed(e) {
  return e.stepped ? tl : e.tension || e.cubicInterpolationMode === "monotone" ? el : Id;
}
function $i(e, t, a = {}) {
  const s = e.length, { start: n = 0, end: o = s - 1 } = a, { start: i, end: r } = t, c = Math.max(n, i), d = Math.min(o, r), u = n < i && o < i || n > r && o > r;
  return {
    count: s,
    start: c,
    loop: t.loop,
    ilen: d < c && !u ? s + d - c : d - c
  };
}
function Rd(e, t, a, s) {
  const { points: n, options: o } = t, { count: i, start: r, loop: c, ilen: d } = $i(n, a, s), u = Ed(o);
  let { move: f = !0, reverse: p } = s || {}, v, h, m;
  for (v = 0; v <= d; ++v)
    h = n[(r + (p ? d - v : v)) % i], !h.skip && (f ? (e.moveTo(h.x, h.y), f = !1) : u(e, m, h, p, o.stepped), m = h);
  return c && (h = n[(r + (p ? d : 0)) % i], u(e, m, h, p, o.stepped)), !!c;
}
function Od(e, t, a, s) {
  const n = t.points, { count: o, start: i, ilen: r } = $i(n, a, s), { move: c = !0, reverse: d } = s || {};
  let u = 0, f = 0, p, v, h, m, _, g;
  const b = (w) => (i + (d ? r - w : w)) % o, k = () => {
    m !== _ && (e.lineTo(u, _), e.lineTo(u, m), e.lineTo(u, g));
  };
  for (c && (v = n[b(0)], e.moveTo(v.x, v.y)), p = 0; p <= r; ++p) {
    if (v = n[b(p)], v.skip)
      continue;
    const w = v.x, M = v.y, S = w | 0;
    S === h ? (M < m ? m = M : M > _ && (_ = M), u = (f * u + w) / ++f) : (k(), e.lineTo(w, M), h = S, f = 0, m = _ = M), g = M;
  }
  k();
}
function Fs(e) {
  const t = e.options, a = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !a ? Od : Rd;
}
function Vd(e) {
  return e.stepped ? Fl : e.tension || e.cubicInterpolationMode === "monotone" ? Pl : Se;
}
function zd(e, t, a, s) {
  let n = t._path;
  n || (n = t._path = new Path2D(), t.path(n, a, s) && n.closePath()), wi(e, t.options), e.stroke(n);
}
function Nd(e, t, a, s) {
  const { segments: n, options: o } = t, i = Fs(t);
  for (const r of n)
    wi(e, o, r.style), e.beginPath(), i(e, t, r, {
      start: a,
      end: a + s - 1
    }) && e.closePath(), e.stroke();
}
const Wd = typeof Path2D == "function";
function Hd(e, t, a, s) {
  Wd && !t.options.segment ? zd(e, t, a, s) : Nd(e, t, a, s);
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
      Ml(this._points, s, t, n, a), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = zl(this, this.options.segment));
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
    const s = this.options, n = t[a], o = this.points, i = ci(this, {
      property: a,
      start: n,
      end: n
    });
    if (!i.length)
      return;
    const r = [], c = Vd(s);
    let d, u;
    for (d = 0, u = i.length; d < u; ++d) {
      const { start: f, end: p } = i[d], v = o[f], h = o[p];
      if (v === h) {
        r.push(v);
        continue;
      }
      const m = Math.abs((n - v[a]) / (h[a] - v[a])), _ = c(v, h, m, s.stepped);
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
    (this.points || []).length && o.borderWidth && (t.save(), Hd(t, this, s, n), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function ao(e, t, a, s) {
  const n = e.options, { [a]: o } = e.getProps([
    a
  ], s);
  return Math.abs(t - o) < n.radius + n.hitRadius;
}
class jd extends ce {
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
function Mi(e, t) {
  const { x: a, y: s, base: n, width: o, height: i } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let r, c, d, u, f;
  return e.horizontal ? (f = i / 2, r = Math.min(a, n), c = Math.max(a, n), d = s - f, u = s + f) : (f = o / 2, r = a - f, c = a + f, d = Math.min(s, n), u = Math.max(s, n)), {
    left: r,
    top: d,
    right: c,
    bottom: u
  };
}
function ve(e, t, a, s) {
  return e ? 0 : Tt(t, a, s);
}
function Yd(e, t, a) {
  const s = e.options.borderWidth, n = e.borderSkipped, o = Jo(s);
  return {
    t: ve(n.top, o.top, 0, a),
    r: ve(n.right, o.right, 0, t),
    b: ve(n.bottom, o.bottom, 0, a),
    l: ve(n.left, o.left, 0, t)
  };
}
function qd(e, t, a) {
  const { enableBorderRadius: s } = e.getProps([
    "enableBorderRadius"
  ]), n = e.options.borderRadius, o = Ve(n), i = Math.min(t, a), r = e.borderSkipped, c = s || ht(n);
  return {
    topLeft: ve(!c || r.top || r.left, o.topLeft, 0, i),
    topRight: ve(!c || r.top || r.right, o.topRight, 0, i),
    bottomLeft: ve(!c || r.bottom || r.left, o.bottomLeft, 0, i),
    bottomRight: ve(!c || r.bottom || r.right, o.bottomRight, 0, i)
  };
}
function Ud(e) {
  const t = Mi(e), a = t.right - t.left, s = t.bottom - t.top, n = Yd(e, a / 2, s / 2), o = qd(e, a / 2, s / 2);
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
  const n = t === null, o = a === null, r = e && !(n && o) && Mi(e, s);
  return r && (n || ie(t, r.left, r.right)) && (o || ie(a, r.top, r.bottom));
}
function Kd(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function Xd(e, t) {
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
class Gd extends ce {
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
    const { inflateAmount: a, options: { borderColor: s, backgroundColor: n } } = this, { inner: o, outer: i } = Ud(this), r = Kd(i.radius) ? za : Xd;
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
function Zd(e, t, a) {
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
    const f = ci(t, u);
    for (const p of f) {
      const v = Ps(a, o[p.start], o[p.end], p.loop), h = li(r, n, v);
      for (const m of h)
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
function Qd(e, t) {
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
  return Mt(e) ? (s = !0, a = e) : a = Qd(e, t), a.length ? new Xa({
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
function Jd(e, t, a) {
  let n = e[t].fill;
  const o = [
    t
  ];
  let i;
  if (!a)
    return n;
  for (; n !== !1 && o.indexOf(n) === -1; ) {
    if (!Lt(n))
      return n;
    if (i = e[n], !i)
      return !1;
    if (i.visible)
      return n;
    o.push(n), n = i.fill;
  }
  return !1;
}
function tu(e, t, a) {
  const s = nu(e);
  if (ht(s))
    return isNaN(s.value) ? !1 : s;
  let n = parseFloat(s);
  return Lt(n) && Math.floor(n) === n ? eu(s[0], t, n, a) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(s) >= 0 && s;
}
function eu(e, t, a, s) {
  return (e === "-" || e === "+") && (a = t + a), a === t || a < 0 || a >= s ? !1 : a;
}
function au(e, t) {
  let a = null;
  return e === "start" ? a = t.bottom : e === "end" ? a = t.top : ht(e) ? a = t.getPixelForValue(e.value) : t.getBasePixel && (a = t.getBasePixel()), a;
}
function su(e, t, a) {
  let s;
  return e === "start" ? s = a : e === "end" ? s = t.options.reverse ? t.min : t.max : ht(e) ? s = e.value : s = t.getBaseValue(), s;
}
function nu(e) {
  const t = e.options, a = t.fill;
  let s = it(a && a.target, a);
  return s === void 0 && (s = !!t.backgroundColor), s === !1 || s === null ? !1 : s === !0 ? "origin" : s;
}
function ou(e) {
  const { scale: t, index: a, line: s } = e, n = [], o = s.segments, i = s.points, r = iu(t, a);
  r.push(Ci({
    x: null,
    y: t.bottom
  }, s));
  for (let c = 0; c < o.length; c++) {
    const d = o[c];
    for (let u = d.start; u <= d.end; u++)
      ru(n, i[u], r);
  }
  return new Xa({
    points: n,
    options: {}
  });
}
function iu(e, t) {
  const a = [], s = e.getMatchingVisibleMetas("line");
  for (let n = 0; n < s.length; n++) {
    const o = s[n];
    if (o.index === t)
      break;
    o.hidden || a.unshift(o.dataset);
  }
  return a;
}
function ru(e, t, a) {
  const s = [];
  for (let n = 0; n < a.length; n++) {
    const o = a[n], { first: i, last: r, point: c } = lu(o, t, "x");
    if (!(!c || i && r)) {
      if (i)
        s.unshift(c);
      else if (e.push(c), !r)
        break;
    }
  }
  e.push(...s);
}
function lu(e, t, a) {
  const s = e.interpolate(t, a);
  if (!s)
    return {};
  const n = s[a], o = e.segments, i = e.points;
  let r = !1, c = !1;
  for (let d = 0; d < o.length; d++) {
    const u = o[d], f = i[u.start][a], p = i[u.end][a];
    if (ie(n, f, p)) {
      r = n === f, c = n === p;
      break;
    }
  }
  return {
    first: r,
    last: c,
    point: s
  };
}
class Si {
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
function cu(e) {
  const { chart: t, fill: a, line: s } = e;
  if (Lt(a))
    return du(t, a);
  if (a === "stack")
    return ou(e);
  if (a === "shape")
    return !0;
  const n = uu(e);
  return n instanceof Si ? n : Ci(n, s);
}
function du(e, t) {
  const a = e.getDatasetMeta(t);
  return a && e.isDatasetVisible(t) ? a.dataset : null;
}
function uu(e) {
  return (e.scale || {}).getPointPositionForValue ? fu(e) : hu(e);
}
function hu(e) {
  const { scale: t = {}, fill: a } = e, s = au(a, t);
  if (Lt(s)) {
    const n = t.isHorizontal();
    return {
      x: n ? s : null,
      y: n ? null : s
    };
  }
  return null;
}
function fu(e) {
  const { scale: t, fill: a } = e, s = t.options, n = t.getLabels().length, o = s.reverse ? t.max : t.min, i = su(a, t, o), r = [];
  if (s.grid.circular) {
    const c = t.getPointPositionForValue(0, o);
    return new Si({
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
  const s = cu(t), { chart: n, index: o, line: i, scale: r, axis: c } = t, d = i.options, u = d.fill, f = d.backgroundColor, { above: p = f, below: v = f } = u || {}, h = n.getDatasetMeta(o), m = di(n, h);
  s && i.points.length && (ja(e, a), gu(e, {
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
function gu(e, t) {
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
    const { start: c, end: d } = r, u = n[c], f = n[Ga(c, d, n)];
    o ? (e.moveTo(u.x, u.y), o = !1) : (e.lineTo(u.x, a), e.lineTo(u.x, u.y)), i = !!t.pathSegment(e, r, {
      move: i
    }), i ? e.closePath() : e.lineTo(f.x, a);
  }
  e.lineTo(t.first().x, a), e.closePath(), e.clip();
}
function io(e, t, a) {
  const { segments: s, points: n } = t;
  let o = !0, i = !1;
  e.beginPath();
  for (const r of s) {
    const { start: c, end: d } = r, u = n[c], f = n[Ga(c, d, n)];
    o ? (e.moveTo(u.x, u.y), o = !1) : (e.lineTo(a, u.y), e.lineTo(u.x, u.y)), i = !!t.pathSegment(e, r, {
      move: i
    }), i ? e.closePath() : e.lineTo(a, f.y);
  }
  e.lineTo(a, t.first().y), e.closePath(), e.clip();
}
function fs(e, t) {
  const { line: a, target: s, property: n, color: o, scale: i, clip: r } = t, c = Zd(a, s, n);
  for (const { source: d, target: u, start: f, end: p } of c) {
    const { style: { backgroundColor: v = o } = {} } = d, h = s !== !0;
    e.save(), e.fillStyle = v, pu(e, i, r, h && Ps(n, f, p)), e.beginPath();
    const m = !!a.pathSegment(e, d);
    let _;
    if (h) {
      m ? e.closePath() : ro(e, s, p, n);
      const g = !!s.pathSegment(e, u, {
        move: m,
        reverse: !0
      });
      _ = m && g, _ || ro(e, s, f, n);
    }
    e.closePath(), e.fill(_ ? "evenodd" : "nonzero"), e.restore();
  }
}
function pu(e, t, a, s) {
  const n = t.chart.chartArea, { property: o, start: i, end: r } = s || {};
  if (o === "x" || o === "y") {
    let c, d, u, f;
    o === "x" ? (c = i, d = n.top, u = r, f = n.bottom) : (c = n.left, d = i, u = n.right, f = r), e.beginPath(), a && (c = Math.max(c, a.left), u = Math.min(u, a.right), d = Math.max(d, a.top), f = Math.min(f, a.bottom)), e.rect(c, d, u - c, f - d), e.clip();
  }
}
function ro(e, t, a, s) {
  const n = t.interpolate(a, s);
  n && e.lineTo(n.x, n.y);
}
var vu = {
  id: "filler",
  afterDatasetsUpdate(e, t, a) {
    const s = (e.data.datasets || []).length, n = [];
    let o, i, r, c;
    for (i = 0; i < s; ++i)
      o = e.getDatasetMeta(i), r = o.dataset, c = null, r && r.options && r instanceof Xa && (c = {
        visible: e.isDatasetVisible(i),
        index: i,
        fill: tu(r, i, s),
        chart: e,
        axis: o.controller.options.indexAxis,
        scale: o.vScale,
        line: r
      }), o.$filler = c, n.push(c);
    for (i = 0; i < s; ++i)
      c = n[i], !(!c || c.fill === !1) && (c.fill = Jd(n, i, a.propagate));
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
}, bu = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
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
    const s = t.labels, n = Bt(s.font), o = n.size, i = this._computeTitleHeight(), { boxWidth: r, itemHeight: c } = lo(s, o);
    let d, u;
    a.font = n.string, this.isHorizontal() ? (d = this.maxWidth, u = this._fitRows(i, o, r, c) + 10) : (u = this.maxHeight, d = this._fitCols(i, n, r, c) + 10), this.width = Math.min(d, t.maxWidth || this.maxWidth), this.height = Math.min(u, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, a, s, n) {
    const { ctx: o, maxWidth: i, options: { labels: { padding: r } } } = this, c = this.legendHitBoxes = [], d = this.lineWidths = [
      0
    ], u = n + r;
    let f = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let p = -1, v = -u;
    return this.legendItems.forEach((h, m) => {
      const _ = s + a / 2 + o.measureText(h.text).width;
      (m === 0 || d[d.length - 1] + _ + 2 * r > i) && (f += u, d[d.length - (m > 0 ? 0 : 1)] = 0, v += u, p++), c[m] = {
        left: 0,
        top: v,
        row: p,
        width: _,
        height: n
      }, d[d.length - 1] += _ + r;
    }), f;
  }
  _fitCols(t, a, s, n) {
    const { ctx: o, maxHeight: i, options: { labels: { padding: r } } } = this, c = this.legendHitBoxes = [], d = this.columnSizes = [], u = i - t;
    let f = r, p = 0, v = 0, h = 0, m = 0;
    return this.legendItems.forEach((_, g) => {
      const { itemWidth: b, itemHeight: k } = mu(s, a, o, _, n);
      g > 0 && v + k + 2 * r > u && (f += p + r, d.push({
        width: p,
        height: v
      }), h += p + r, m++, p = v = 0), c[g] = {
        left: h,
        top: v,
        col: m,
        width: b,
        height: k
      }, p = Math.max(p, b), v += k + r;
    }), f += p, d.push({
      width: p,
      height: v
    }), f;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: a, options: { align: s, labels: { padding: n }, rtl: o } } = this, i = ze(o, this.left, this.width);
    if (this.isHorizontal()) {
      let r = 0, c = At(s, this.left + n, this.right - this.lineWidths[r]);
      for (const d of a)
        r !== d.row && (r = d.row, c = At(s, this.left + n, this.right - this.lineWidths[r])), d.top += this.top + t + n, d.left = i.leftForLtr(i.x(c), d.width), c += d.width + n;
    } else {
      let r = 0, c = At(s, this.top + t + n, this.bottom - this.columnSizes[r].height);
      for (const d of a)
        d.col !== r && (r = d.col, c = At(s, this.top + t + n, this.bottom - this.columnSizes[r].height)), d.top = c, d.left += this.left + n, d.left = i.leftForLtr(i.x(d.left), d.width), c += d.height + n;
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
    const { options: t, columnSizes: a, lineWidths: s, ctx: n } = this, { align: o, labels: i } = t, r = $t.color, c = ze(t.rtl, this.left, this.width), d = Bt(i.font), { padding: u } = i, f = d.size, p = f / 2;
    let v;
    this.drawTitle(), n.textAlign = c.textAlign("left"), n.textBaseline = "middle", n.lineWidth = 0.5, n.font = d.string;
    const { boxWidth: h, boxHeight: m, itemHeight: _ } = lo(i, f), g = function(S, D, A) {
      if (isNaN(h) || h <= 0 || isNaN(m) || m < 0)
        return;
      n.save();
      const B = it(A.lineWidth, 1);
      if (n.fillStyle = it(A.fillStyle, r), n.lineCap = it(A.lineCap, "butt"), n.lineDashOffset = it(A.lineDashOffset, 0), n.lineJoin = it(A.lineJoin, "miter"), n.lineWidth = B, n.strokeStyle = it(A.strokeStyle, r), n.setLineDash(it(A.lineDash, [])), i.usePointStyle) {
        const F = {
          radius: m * Math.SQRT2 / 2,
          pointStyle: A.pointStyle,
          rotation: A.rotation,
          borderWidth: B
        }, P = c.xPlus(S, h / 2), R = D + p;
        Qo(n, F, P, R, i.pointStyleWidth && h);
      } else {
        const F = D + Math.max((f - m) / 2, 0), P = c.leftForLtr(S, h), R = Ve(A.borderRadius);
        n.beginPath(), Object.values(R).some((N) => N !== 0) ? za(n, {
          x: P,
          y: F,
          w: h,
          h: m,
          radius: R
        }) : n.rect(P, F, h, m), n.fill(), B !== 0 && n.stroke();
      }
      n.restore();
    }, b = function(S, D, A) {
      va(n, A.text, S, D + _ / 2, d, {
        strikethrough: A.hidden,
        textAlign: c.textAlign(A.textAlign)
      });
    }, k = this.isHorizontal(), w = this._computeTitleHeight();
    k ? v = {
      x: At(o, this.left + u, this.right - s[0]),
      y: this.top + u + w,
      line: 0
    } : v = {
      x: this.left + u,
      y: At(o, this.top + w + u, this.bottom - a[0].height),
      line: 0
    }, oi(this.ctx, t.textDirection);
    const M = _ + u;
    this.legendItems.forEach((S, D) => {
      n.strokeStyle = S.fontColor, n.fillStyle = S.fontColor;
      const A = n.measureText(S.text).width, B = c.textAlign(S.textAlign || (S.textAlign = i.textAlign)), F = h + p + A;
      let P = v.x, R = v.y;
      c.setWidth(this.width), k ? D > 0 && P + F + u > this.right && (R = v.y += M, v.line++, P = v.x = At(o, this.left + u, this.right - s[v.line])) : D > 0 && R + M > this.bottom && (P = v.x = P + a[v.line].width + u, v.line++, R = v.y = At(o, this.top + w + u, this.bottom - a[v.line].height));
      const N = c.x(P);
      if (g(N, R, S), P = Nr(B, P + h + p, k ? P + F : this.right, t.rtl), b(c.x(P), R, S), k)
        v.x += F + u;
      else if (typeof S.text != "string") {
        const Y = d.lineHeight;
        v.y += Di(S, Y) + u;
      } else
        v.y += M;
    }), ii(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, a = t.title, s = Bt(a.font), n = Yt(a.padding);
    if (!a.display)
      return;
    const o = ze(t.rtl, this.left, this.width), i = this.ctx, r = a.position, c = s.size / 2, d = n.top + c;
    let u, f = this.left, p = this.width;
    if (this.isHorizontal())
      p = Math.max(...this.lineWidths), u = this.top + d, f = At(t.align, f, this.right - p);
    else {
      const h = this.columnSizes.reduce((m, _) => Math.max(m, _.height), 0);
      u = d + At(t.align, this.top, this.bottom - h - t.labels.padding - this._computeTitleHeight());
    }
    const v = At(r, f, f + p);
    i.textAlign = o.textAlign(Ws(r)), i.textBaseline = "middle", i.strokeStyle = a.color, i.fillStyle = a.color, i.font = s.string, va(i, a.text, v, u, s);
  }
  _computeTitleHeight() {
    const t = this.options.title, a = Bt(t.font), s = Yt(t.padding);
    return t.display ? a.lineHeight + s.height : 0;
  }
  _getLegendItemAt(t, a) {
    let s, n, o;
    if (ie(t, this.left, this.right) && ie(a, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, s = 0; s < o.length; ++s)
        if (n = o[s], ie(t, n.left, n.left + n.width) && ie(a, n.top, n.top + n.height))
          return this.legendItems[s];
    }
    return null;
  }
  handleEvent(t) {
    const a = this.options;
    if (!xu(t.type, a))
      return;
    const s = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const n = this._hoveredItem, o = bu(n, s);
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
function mu(e, t, a, s, n) {
  const o = yu(s, e, t, a), i = _u(n, s, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: i
  };
}
function yu(e, t, a, s) {
  let n = e.text;
  return n && typeof n != "string" && (n = n.reduce((o, i) => o.length > i.length ? o : i)), t + a.size / 2 + s.measureText(n).width;
}
function _u(e, t, a) {
  let s = e;
  return typeof t.text != "string" && (s = Di(t, a)), s;
}
function Di(e, t) {
  const a = e.text ? e.text.length : 0;
  return t * a;
}
function xu(e, t) {
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
          const d = c.controller.getStyle(a ? 0 : void 0), u = Yt(d.borderWidth);
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
class Ai extends ce {
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
    this._padding = Yt(s.padding);
    const o = n * Bt(s.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = o : this.width = o;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: a, left: s, bottom: n, right: o, options: i } = this, r = i.align;
    let c = 0, d, u, f;
    return this.isHorizontal() ? (u = At(r, s, o), f = a + t, d = o - s) : (i.position === "left" ? (u = s + t, f = At(r, n, a), c = mt * -0.5) : (u = o - t, f = At(r, a, n), c = mt * 0.5), d = n - a), {
      titleX: u,
      titleY: f,
      maxWidth: d,
      rotation: c
    };
  }
  draw() {
    const t = this.ctx, a = this.options;
    if (!a.display)
      return;
    const s = Bt(a.font), o = s.lineHeight / 2 + this._padding.top, { titleX: i, titleY: r, maxWidth: c, rotation: d } = this._drawArgs(o);
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
function ku(e, t) {
  const a = new Ai({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  jt.configure(e, a, t), jt.addBox(e, a), e.titleBlock = a;
}
var Ti = {
  id: "title",
  _element: Ai,
  start(e, t, a) {
    ku(e, a);
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
function se(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function wu(e, t) {
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
  const a = e.chart.ctx, { body: s, footer: n, title: o } = e, { boxWidth: i, boxHeight: r } = t, c = Bt(t.bodyFont), d = Bt(t.titleFont), u = Bt(t.footerFont), f = o.length, p = n.length, v = s.length, h = Yt(t.padding);
  let m = h.height, _ = 0, g = s.reduce((w, M) => w + M.before.length + M.lines.length + M.after.length, 0);
  if (g += e.beforeBody.length + e.afterBody.length, f && (m += f * d.lineHeight + (f - 1) * t.titleSpacing + t.titleMarginBottom), g) {
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
  }), b = 0, a.font = u.string, vt(e.footer, k), a.restore(), _ += h.width, {
    width: _,
    height: m
  };
}
function $u(e, t) {
  const { y: a, height: s } = t;
  return a < s / 2 ? "top" : a > e.height - s / 2 ? "bottom" : "center";
}
function Mu(e, t, a, s) {
  const { x: n, width: o } = s, i = a.caretSize + a.caretPadding;
  if (e === "left" && n + o + i > t.width || e === "right" && n - o - i < 0)
    return !0;
}
function Cu(e, t, a, s) {
  const { x: n, width: o } = a, { width: i, chartArea: { left: r, right: c } } = e;
  let d = "center";
  return s === "center" ? d = n <= (r + c) / 2 ? "left" : "right" : n <= o / 2 ? d = "left" : n >= i - o / 2 && (d = "right"), Mu(d, e, t, a) && (d = "center"), d;
}
function ho(e, t, a) {
  const s = a.yAlign || t.yAlign || $u(e, a);
  return {
    xAlign: a.xAlign || t.xAlign || Cu(e, t, a, s),
    yAlign: s
  };
}
function Su(e, t) {
  let { x: a, width: s } = e;
  return t === "right" ? a -= s : t === "center" && (a -= s / 2), a;
}
function Du(e, t, a) {
  let { y: s, height: n } = e;
  return t === "top" ? s += a : t === "bottom" ? s -= n + a : s -= n / 2, s;
}
function fo(e, t, a, s) {
  const { caretSize: n, caretPadding: o, cornerRadius: i } = e, { xAlign: r, yAlign: c } = a, d = n + o, { topLeft: u, topRight: f, bottomLeft: p, bottomRight: v } = Ve(i);
  let h = Su(t, r);
  const m = Du(t, c, d);
  return c === "center" ? r === "left" ? h += d : r === "right" && (h -= d) : r === "left" ? h -= Math.max(u, p) + n : r === "right" && (h += Math.max(f, v) + n), {
    x: Tt(h, 0, s.width - t.width),
    y: Tt(m, 0, s.height - t.height)
  };
}
function Ba(e, t, a) {
  const s = Yt(a.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - s.right : e.x + s.left;
}
function go(e) {
  return Gt([], se(e));
}
function Au(e, t, a) {
  return Le(e, {
    tooltip: t,
    tooltipItems: a,
    type: "tooltip"
  });
}
function po(e, t) {
  const a = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return a ? e.override(a) : e;
}
const Bi = {
  beforeTitle: ee,
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
  afterTitle: ee,
  beforeBody: ee,
  beforeLabel: ee,
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
  afterLabel: ee,
  afterBody: ee,
  beforeFooter: ee,
  footer: ee,
  afterFooter: ee
};
function Rt(e, t, a, s) {
  const n = e[t].call(a, s);
  return typeof n > "u" ? Bi[t].call(a, s) : n;
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
    const a = this.chart, s = this.options.setContext(this.getContext()), n = s.enabled && a.options.animation && s.animations, o = new ui(this.chart, n);
    return n._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = Au(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, a) {
    const { callbacks: s } = a, n = Rt(s, "beforeTitle", this, t), o = Rt(s, "title", this, t), i = Rt(s, "afterTitle", this, t);
    let r = [];
    return r = Gt(r, se(n)), r = Gt(r, se(o)), r = Gt(r, se(i)), r;
  }
  getBeforeBody(t, a) {
    return go(Rt(a.callbacks, "beforeBody", this, t));
  }
  getBody(t, a) {
    const { callbacks: s } = a, n = [];
    return vt(t, (o) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, r = po(s, o);
      Gt(i.before, se(Rt(r, "beforeLabel", this, o))), Gt(i.lines, Rt(r, "label", this, o)), Gt(i.after, se(Rt(r, "afterLabel", this, o))), n.push(i);
    }), n;
  }
  getAfterBody(t, a) {
    return go(Rt(a.callbacks, "afterBody", this, t));
  }
  getFooter(t, a) {
    const { callbacks: s } = a, n = Rt(s, "beforeFooter", this, t), o = Rt(s, "footer", this, t), i = Rt(s, "afterFooter", this, t);
    let r = [];
    return r = Gt(r, se(n)), r = Gt(r, se(o)), r = Gt(r, se(i)), r;
  }
  _createItems(t) {
    const a = this._active, s = this.chart.data, n = [], o = [], i = [];
    let r = [], c, d;
    for (c = 0, d = a.length; c < d; ++c)
      r.push(wu(this.chart, a[c]));
    return t.filter && (r = r.filter((u, f, p) => t.filter(u, f, p, s))), t.itemSort && (r = r.sort((u, f) => t.itemSort(u, f, s))), vt(r, (u) => {
      const f = po(t.callbacks, u);
      n.push(Rt(f, "labelColor", this, u)), o.push(Rt(f, "labelPointStyle", this, u)), i.push(Rt(f, "labelTextColor", this, u));
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
      const c = this._size = uo(this, s), d = Object.assign({}, r, c), u = ho(this.chart, s, d), f = fo(s, d, u, this.chart);
      this.xAlign = u.xAlign, this.yAlign = u.yAlign, o = {
        opacity: 1,
        x: f.x,
        y: f.y,
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
    const { xAlign: n, yAlign: o } = this, { caretSize: i, cornerRadius: r } = s, { topLeft: c, topRight: d, bottomLeft: u, bottomRight: f } = Ve(r), { x: p, y: v } = t, { width: h, height: m } = a;
    let _, g, b, k, w, M;
    return o === "center" ? (w = v + m / 2, n === "left" ? (_ = p, g = _ - i, k = w + i, M = w - i) : (_ = p + h, g = _ + i, k = w - i, M = w + i), b = _) : (n === "left" ? g = p + Math.max(c, u) + i : n === "right" ? g = p + h - Math.max(d, f) - i : g = this.caretX, o === "top" ? (k = v, w = k - i, _ = g - i, b = g + i) : (k = v + m, w = k + i, _ = g + i, b = g - i), M = k), {
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
      const d = ze(s.rtl, this.x, this.width);
      for (t.x = Ba(this, s.titleAlign, s), a.textAlign = d.textAlign(s.titleAlign), a.textBaseline = "middle", i = Bt(s.titleFont), r = s.titleSpacing, a.fillStyle = s.titleColor, a.font = i.string, c = 0; c < o; ++c)
        a.fillText(n[c], d.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + r, c + 1 === o && (t.y += s.titleMarginBottom - r);
    }
  }
  _drawColorBox(t, a, s, n, o) {
    const i = this.labelColors[s], r = this.labelPointStyles[s], { boxHeight: c, boxWidth: d } = o, u = Bt(o.bodyFont), f = Ba(this, "left", o), p = n.x(f), v = c < u.lineHeight ? (u.lineHeight - c) / 2 : 0, h = a.y + v;
    if (o.usePointStyle) {
      const m = {
        radius: Math.min(d, c) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, _ = n.leftForLtr(p, d) + d / 2, g = h + c / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, Ts(t, m, _, g), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, Ts(t, m, _, g);
    } else {
      t.lineWidth = ht(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const m = n.leftForLtr(p, d), _ = n.leftForLtr(n.xPlus(p, 1), d - 2), g = Ve(i.borderRadius);
      Object.values(g).some((b) => b !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, za(t, {
        x: m,
        y: h,
        w: d,
        h: c,
        radius: g
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), za(t, {
        x: _,
        y: h + 1,
        w: d - 2,
        h: c - 2,
        radius: g
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(m, h, d, c), t.strokeRect(m, h, d, c), t.fillStyle = i.backgroundColor, t.fillRect(_, h + 1, d - 2, c - 2));
    }
    t.fillStyle = this.labelTextColors[s];
  }
  drawBody(t, a, s) {
    const { body: n } = this, { bodySpacing: o, bodyAlign: i, displayColors: r, boxHeight: c, boxWidth: d, boxPadding: u } = s, f = Bt(s.bodyFont);
    let p = f.lineHeight, v = 0;
    const h = ze(s.rtl, this.x, this.width), m = function(A) {
      a.fillText(A, h.x(t.x + v), t.y + p / 2), t.y += p + o;
    }, _ = h.textAlign(i);
    let g, b, k, w, M, S, D;
    for (a.textAlign = i, a.textBaseline = "middle", a.font = f.string, t.x = Ba(this, _, s), a.fillStyle = s.bodyColor, vt(this.beforeBody, m), v = r && _ !== "right" ? i === "center" ? d / 2 + u : d + 2 + u : 0, w = 0, S = n.length; w < S; ++w) {
      for (g = n[w], b = this.labelTextColors[w], a.fillStyle = b, vt(g.before, m), k = g.lines, r && k.length && (this._drawColorBox(a, t, w, h, s), p = Math.max(f.lineHeight, c)), M = 0, D = k.length; M < D; ++M)
        m(k[M]), p = f.lineHeight;
      vt(g.after, m);
    }
    v = 0, p = f.lineHeight, vt(this.afterBody, m), t.y -= o;
  }
  drawFooter(t, a, s) {
    const n = this.footer, o = n.length;
    let i, r;
    if (o) {
      const c = ze(s.rtl, this.x, this.width);
      for (t.x = Ba(this, s.footerAlign, s), t.y += s.footerMarginTop, a.textAlign = c.textAlign(s.footerAlign), a.textBaseline = "middle", i = Bt(s.footerFont), a.fillStyle = s.footerColor, a.font = i.string, r = 0; r < o; ++r)
        a.fillText(n[r], c.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + s.footerSpacing;
    }
  }
  drawBackground(t, a, s, n) {
    const { xAlign: o, yAlign: i } = this, { x: r, y: c } = t, { width: d, height: u } = s, { topLeft: f, topRight: p, bottomLeft: v, bottomRight: h } = Ve(n.cornerRadius);
    a.fillStyle = n.backgroundColor, a.strokeStyle = n.borderColor, a.lineWidth = n.borderWidth, a.beginPath(), a.moveTo(r + f, c), i === "top" && this.drawCaret(t, a, s, n), a.lineTo(r + d - p, c), a.quadraticCurveTo(r + d, c, r + d, c + p), i === "center" && o === "right" && this.drawCaret(t, a, s, n), a.lineTo(r + d, c + u - h), a.quadraticCurveTo(r + d, c + u, r + d - h, c + u), i === "bottom" && this.drawCaret(t, a, s, n), a.lineTo(r + v, c + u), a.quadraticCurveTo(r, c + u, r, c + u - v), i === "center" && o === "left" && this.drawCaret(t, a, s, n), a.lineTo(r, c + f), a.quadraticCurveTo(r, c, r + f, c), a.closePath(), a.fill(), n.borderWidth > 0 && a.stroke();
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
    const i = Yt(a.padding), r = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    a.enabled && r && (t.save(), t.globalAlpha = s, this.drawBackground(o, t, n, a), oi(t, a.textDirection), o.y += i.top, this.drawTitle(o, t, a), this.drawBody(o, t, a), this.drawFooter(o, t, a), ii(t, a.textDirection), t.restore());
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
    }), o = !Ra(s, n), i = this._positionChanged(n, a);
    (o || i) && (this._active = n, this._eventPosition = a, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, a, s = !0) {
    if (a && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const n = this.options, o = this._active || [], i = this._getActiveElements(t, o, a, s), r = this._positionChanged(i, t), c = a || !Ra(i, o) || r;
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
    callbacks: Bi
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
const Tu = (e, t, a, s) => (typeof t == "string" ? (a = e.push(t) - 1, s.unshift({
  index: a,
  label: t
})) : isNaN(t) && (a = null), a);
function Bu(e, t, a, s) {
  const n = e.indexOf(t);
  if (n === -1)
    return Tu(e, t, a, s);
  const o = e.lastIndexOf(t);
  return n !== o ? a : n;
}
const Lu = (e, t) => e === null ? null : Tt(Math.round(e), 0, t);
function bo(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Li extends je {
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
    return a = isFinite(a) && s[a] === t ? a : Bu(s, t, it(a, t), this._addedLabels), Lu(a, s.length - 1);
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
function Fu(e, t) {
  const a = [], { bounds: n, step: o, min: i, max: r, precision: c, count: d, maxTicks: u, maxDigits: f, includeBounds: p } = e, v = o || 1, h = u - 1, { min: m, max: _ } = t, g = !pt(i), b = !pt(r), k = !pt(d), w = (_ - m) / (f + 1);
  let M = hn((_ - m) / h / v) * v, S, D, A, B;
  if (M < 1e-14 && !g && !b)
    return [
      {
        value: m
      },
      {
        value: _
      }
    ];
  B = Math.ceil(_ / M) - Math.floor(m / M), B > h && (M = hn(B * M / h / v) * v), pt(c) || (S = Math.pow(10, c), M = Math.ceil(M * S) / S), n === "ticks" ? (D = Math.floor(m / M) * M, A = Math.ceil(_ / M) * M) : (D = m, A = _), g && b && o && Lr((r - i) / o, M / 1e3) ? (B = Math.round(Math.min((r - i) / M, u)), M = (r - i) / B, D = i, A = r) : k ? (D = g ? i : D, A = b ? r : A, B = d - 1, M = (A - D) / B) : (B = (A - D) / M, oa(B, Math.round(B), M / 1e3) ? B = Math.round(B) : B = Math.ceil(B));
  const F = Math.max(fn(M), fn(D));
  S = Math.pow(10, pt(c) ? F : c), D = Math.round(D * S) / S, A = Math.round(A * S) / S;
  let P = 0;
  for (g && (p && D !== i ? (a.push({
    value: i
  }), D < i && P++, oa(Math.round((D + P * M) * S) / S, i, mo(i, w, e)) && P++) : D < i && P++); P < B; ++P) {
    const R = Math.round((D + P * M) * S) / S;
    if (b && R > r)
      break;
    a.push({
      value: R
    });
  }
  return b && p && A !== r ? a.length && oa(a[a.length - 1].value, r, mo(r, w, e)) ? a[a.length - 1].value = r : a.push({
    value: r
  }) : (!b || A === r) && a.push({
    value: A
  }), a;
}
function mo(e, t, { horizontal: a, minRotation: s }) {
  const n = oe(s), o = (a ? Math.sin(n) : Math.cos(n)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / o, i);
}
class Pu extends je {
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
    }, o = this._range || this, i = Fu(n, o);
    return t.bounds === "ticks" && Fr(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
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
class Fi extends Pu {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: Zo.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: a } = this.getMinMax(!0);
    this.min = Lt(t) ? t : 0, this.max = Lt(a) ? a : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), a = t ? this.width : this.height, s = oe(this.options.ticks.minRotation), n = (t ? Math.sin(s) : Math.cos(s)) || 1e-3, o = this._resolveTickFontOptions(0);
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
  return typeof s == "function" && (i = s(i)), Lt(i) || (i = typeof s == "string" ? a.parse(i, s) : a.parse(i)), i === null ? null : (n && (i = n === "week" && (fa(o) || o === !0) ? a.startOf(i, "isoWeek", o) : a.startOf(i, n)), +i);
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
function Iu(e, t, a, s, n) {
  for (let o = Ot.length - 1; o >= Ot.indexOf(a); o--) {
    const i = Ot[o];
    if (Za[i].common && e._adapter.diff(n, s, i) >= t - 1)
      return i;
  }
  return Ot[a ? Ot.indexOf(a) : 0];
}
function Eu(e) {
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
function Ru(e, t, a, s) {
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
  return o === 0 || !a ? s : Ru(e, s, n, a);
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
    const s = t.time || (t.time = {}), n = this._adapter = new yc._date(t.adapters.date);
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
    (!i || !r) && (c(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && c(this.getMinMax(!1))), n = Lt(n) && !isNaN(n) ? n : +a.startOf(Date.now(), s), o = Lt(o) && !isNaN(o) ? o : +a.endOf(Date.now(), s) + 1, this.min = Math.min(n, o - 1), this.max = Math.max(n + 1, o);
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
    const o = this.min, i = this.max, r = Or(n, o, i);
    return this._unit = a.unit || (s.autoSkip ? xo(a.minUnit, this.min, this.max, this._getLabelCapacity(o)) : Iu(this, r.length, a.minUnit, this.min, this.max)), this._majorUnit = !s.major.enabled || this._unit === "year" ? void 0 : Eu(this._unit), this.initOffsets(n), t.reverse && r.reverse(), wo(this, r, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let a = 0, s = 0, n, o;
    this.options.offset && t.length && (n = this.getDecimalForValue(t[0]), t.length === 1 ? a = 1 - n : a = (this.getDecimalForValue(t[1]) - n) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? s = o : s = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    a = Tt(a, 0, i), s = Tt(s, 0, i), this._offsets = {
      start: a,
      end: s,
      factor: 1 / (a + 1 + s)
    };
  }
  _generate() {
    const t = this._adapter, a = this.min, s = this.max, n = this.options, o = n.time, i = o.unit || xo(o.minUnit, a, s, this._getLabelCapacity(a)), r = it(n.ticks.stepSize, 1), c = i === "week" ? o.isoWeekday : !1, d = fa(c) || c === !0, u = {};
    let f = a, p, v;
    if (d && (f = +t.startOf(f, "isoWeek", c)), f = +t.startOf(f, d ? "day" : i), t.diff(s, a, i) > 1e5 * r)
      throw new Error(a + " and " + s + " are too far apart with stepSize of " + r + " " + i);
    const h = n.ticks.source === "data" && this.getDataTimestamps();
    for (p = f, v = 0; p < s; p = +t.add(p, r, i), v++)
      ko(u, p, h);
    return (p === s || n.bounds === "ticks" || v === 1) && ko(u, p, h), Object.keys(u).sort(yo).map((m) => +m);
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
    const r = o.time.displayFormats, c = this._unit, d = this._majorUnit, u = c && r[c], f = d && r[d], p = s[a], v = d && f && p && p.major;
    return this._adapter.format(t, n || (v ? f : u));
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
    const a = this.options.ticks, s = this.ctx.measureText(t).width, n = oe(this.isHorizontal() ? a.maxRotation : a.minRotation), o = Math.cos(n), i = Math.sin(n), r = this._resolveTickFontOptions(0).size;
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
    return Ko(t.sort(yo));
  }
}
function La(e, t, a) {
  let s = 0, n = e.length - 1, o, i, r, c;
  a ? (t >= e[s].pos && t <= e[n].pos && ({ lo: s, hi: n } = De(e, "pos", t)), { pos: o, time: r } = e[s], { pos: i, time: c } = e[n]) : (t >= e[s].time && t <= e[n].time && ({ lo: s, hi: n } = De(e, "time", t)), { time: o, pos: r } = e[s], { time: i, pos: c } = e[n]);
  const d = i - o;
  return d ? r + (c - r) * (t - o) / d : r;
}
class qC extends $o {
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
const Pi = {
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
}, Ou = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, Vu = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...Pi,
  ...Ou
}, zu = Ki[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function Ee(e) {
  return Eo(e) ? Ms(e) : e;
}
function Nu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return Eo(t) ? new Proxy(e, {}) : e;
}
function Wu(e, t) {
  const a = e.options;
  a && t && Object.assign(a, t);
}
function Ii(e, t) {
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
function Hu(e, t) {
  const a = {
    labels: [],
    datasets: []
  };
  return Ii(a, e.labels), Ei(a, e.datasets, t), a;
}
const ju = tt({
  props: Vu,
  setup(e, t) {
    let { expose: a, slots: s } = t;
    const n = at(null), o = Io(null);
    a({
      chart: o
    });
    const i = () => {
      if (!n.value) return;
      const { type: d, data: u, options: f, plugins: p, datasetIdKey: v } = e, h = Hu(u, v), m = Nu(h, u);
      o.value = new Ye(n.value, {
        type: d,
        data: m,
        options: {
          ...f
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
    return le(i), He(r), Et([
      () => e.options,
      () => e.data
    ], (d, u) => {
      let [f, p] = d, [v, h] = u;
      const m = Ms(o.value);
      if (!m)
        return;
      let _ = !1;
      if (f) {
        const g = Ee(f), b = Ee(v);
        g && g !== b && (Wu(m, g), _ = !0);
      }
      if (p) {
        const g = Ee(p.labels), b = Ee(h.labels), k = Ee(p.datasets), w = Ee(h.datasets);
        g !== b && (Ii(m.config.data, g), _ = !0), k && k !== w && (Ei(m.config.data, k, e.datasetIdKey), _ = !0);
      }
      _ && Ct(() => {
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
  return Ye.register(t), tt({
    props: Pi,
    setup(a, s) {
      let { expose: n } = s;
      const o = Io(null), i = (r) => {
        o.value = r?.chart;
      };
      return n({
        chart: o
      }), () => $s(ju, zu({
        ref: i
      }, {
        type: e,
        ...a
      }));
    }
  });
}
const Yu = /* @__PURE__ */ tn("bar", gc), qu = /* @__PURE__ */ tn("line", bc), Uu = /* @__PURE__ */ tn("pie", mc), Mo = {
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
}, Co = {
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
}, Ku = [
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
function ct(e) {
  const t = at("light");
  let a = null;
  const s = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", n = C(() => e?.value ? e.value : t.value), o = C(() => n.value === "dark"), i = C(() => o.value ? Co : Mo), r = () => {
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
  return le(() => {
    r();
  }), He(() => {
    c();
  }), e && Et(e, () => {
  }), {
    isDark: o,
    currentTheme: n,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: Mo,
    darkColors: Co,
    chartSeriesColors: Ku
  };
}
const Xu = { class: "chart-container" }, Gu = /* @__PURE__ */ tt({
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
      Li,
      Fi,
      Gd,
      Ti,
      Js,
      Qs
    );
    const { isDark: s, colors: n } = ct(lt(a, "theme")), o = a.data, i = (c) => typeof c == "string" ? c.charAt(0).toUpperCase() + c.slice(1).toLowerCase() : c, r = C(() => a.options ? a.options : {
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
            return c.data.datasets.map((u, f) => ({
              text: i(u.label || ""),
              fillStyle: Array.isArray(u.backgroundColor) ? u.backgroundColor[0] : u.backgroundColor,
              strokeStyle: Array.isArray(u.borderColor) ? u.borderColor[0] : u.borderColor,
              lineWidth: u.borderWidth,
              hidden: !c.isDatasetVisible(f),
              index: f,
              datasetIndex: f
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
    return t({ isDark: s }), (c, d) => (y(), x("div", Xu, [
      Q(T(Yu), {
        data: T(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), nt = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [s, n] of t)
    a[s] = n;
  return a;
}, re = /* @__PURE__ */ nt(Gu, [["__scopeId", "data-v-105d8c6f"]]), Zu = { class: "chart-container" }, Qu = /* @__PURE__ */ tt({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    Ye.register(
      Li,
      Fi,
      jd,
      Xa,
      Ti,
      Js,
      Qs,
      vu
    );
    const { isDark: s, colors: n } = ct(lt(a, "theme")), o = a.data, i = (c) => typeof c == "string" ? c.charAt(0).toUpperCase() + c.slice(1).toLowerCase() : c, r = C(() => a.options ? a.options : {
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
              return c.data.datasets.map((u, f) => ({
                text: i(u.label || ""),
                fillStyle: u.backgroundColor,
                strokeStyle: u.borderColor,
                lineWidth: u.borderWidth,
                hidden: !c.isDatasetVisible(f),
                index: f,
                datasetIndex: f
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
    return t({ isDark: s }), (c, d) => (y(), x("div", Zu, [
      Q(T(qu), {
        data: T(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), ye = /* @__PURE__ */ nt(Qu, [["__scopeId", "data-v-bacd3848"]]), Ju = { class: "chart-container" }, th = /* @__PURE__ */ tt({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    Ye.register(Pd, Js, Qs);
    const { isDark: s, colors: n } = ct(lt(a, "theme")), o = a.data, i = (c) => typeof c == "string" ? c.charAt(0).toUpperCase() + c.slice(1).toLowerCase() : c, r = C(() => a.options ? a.options : {
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
              return d.labels.length && d.datasets.length ? d.labels.map((u, f) => {
                const p = c.getDatasetMeta(0), v = d.datasets[0], h = v.data[f], m = Array.isArray(v.backgroundColor) ? v.backgroundColor[f] : v.backgroundColor;
                return {
                  text: `${i(u)}: ${h}`,
                  fillStyle: m,
                  hidden: p.data[f]?.hidden || !1,
                  index: f
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
              const d = c.label || "", u = c.parsed || 0, f = c.dataset.data.reduce((v, h) => v + h, 0), p = (u / f * 100).toFixed(1);
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
    return t({ isDark: s }), (c, d) => (y(), x("div", Ju, [
      Q(T(Uu), {
        data: T(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Qa = /* @__PURE__ */ nt(th, [["__scopeId", "data-v-23a84317"]]), eh = { class: "chart-container" }, ah = ["viewBox"], sh = ["transform"], nh = ["x", "width", "fill", "stroke"], oh = ["fill"], ih = ["x1", "y1", "x2", "y2", "stroke"], rh = ["points", "fill"], lh = ["x1", "y1", "x2", "y2", "stroke"], ch = ["x", "y", "fill"], dh = ["x1", "y1", "x2", "y2", "stroke"], uh = ["points", "fill"], hh = ["transform"], fh = ["y1", "y2"], gh = ["y1", "y2"], ph = ["y1", "y2"], vh = ["y1", "y2"], bh = ["y", "height"], mh = ["y1", "y2"], yh = ["y1", "y2"], _h = ["y1", "y2"], xh = ["y1", "y2"], kh = ["y", "height"], wh = ["cy", "stroke", "onMouseenter"], $h = ["cy", "stroke", "onMouseenter"], Mh = ["cy", "stroke", "onMouseenter"], Ch = ["cy", "stroke", "onMouseenter"], Sh = ["y1", "y2", "onMouseenter"], Dh = ["y1", "y2", "onMouseenter"], Ah = ["x", "y", "fill"], Th = ["x", "y", "fill"], Bh = ["transform"], Lh = { transform: "translate(-200, 0)" }, Fh = ["stroke"], Ph = ["fill"], Ih = { transform: "translate(-130, 0)" }, Eh = ["stroke"], Rh = ["fill"], Oh = { transform: "translate(-60, 0)" }, Vh = ["stroke"], zh = ["fill"], Nh = { transform: "translate(10, 0)" }, Wh = ["stroke"], Hh = ["fill"], jh = { transform: "translate(80, 0)" }, Yh = ["fill"], qh = { transform: "translate(150, 0)" }, Uh = ["fill"], Kh = /* @__PURE__ */ tt({
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
    const a = e, { isDark: s } = ct(lt(a, "theme")), n = C(() => ({
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
      const h = p.currentTarget.closest("svg");
      if (!h) return;
      const m = h.getBoundingClientRect(), _ = h.createSVGPoint();
      _.x = p.clientX - m.left, _.y = p.clientY - m.top, o.value = {
        visible: !0,
        x: _.x,
        y: _.y - 20,
        text: v
      };
    }, c = (p) => {
      if (o.value.visible) {
        const v = p.currentTarget, h = v.getBoundingClientRect(), m = v.createSVGPoint();
        m.x = p.clientX - h.left, m.y = p.clientY - h.top, o.value.x = m.x, o.value.y = m.y - 20;
      }
    }, d = () => {
      o.value.visible = !1;
    }, u = () => {
      o.value.visible = !1;
    }, f = C(() => {
      const p = [], h = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let m = 1; m <= 10; m++) {
        const _ = m, g = (_ - 1) / 9, b = a.chartMargin + h - g * h;
        p.push({ value: _, y: b });
      }
      return p;
    });
    return t({ isDark: s }), (p, v) => (y(), x("div", eh, [
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
          }, null, 8, nh),
          l("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, $(o.value.text), 9, oh)
        ], 8, sh)) : E("", !0),
        l("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, ih),
        l("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, rh),
        (y(!0), x(K, null, J(f.value, (h, m) => (y(), x(K, { key: m }, [
          l("line", {
            x1: e.chartMargin - 6,
            y1: h.y,
            x2: e.chartMargin,
            y2: h.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, lh),
          l("text", {
            x: e.chartMargin - 12,
            y: h.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, $(h.value), 9, ch)
        ], 64))), 128)),
        l("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, dh),
        l("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, uh),
        (y(!0), x(K, null, J(e.boxplotData, (h, m) => (y(), x(K, { key: m }, [
          l("g", {
            transform: `translate(${h.centerX}, 0)`
          }, [
            h.isTotal ? (y(), x(K, { key: 0 }, [
              l("line", {
                x1: 0,
                y1: h.minY,
                x2: 0,
                y2: h.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, fh),
              l("line", {
                x1: 0,
                y1: h.q3Y,
                x2: 0,
                y2: h.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, gh),
              l("line", {
                x1: -18,
                y1: h.minY,
                x2: 18,
                y2: h.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, ph),
              l("line", {
                x1: -18,
                y1: h.maxY,
                x2: 18,
                y2: h.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, vh),
              l("rect", {
                x: -24,
                y: h.q3Y,
                width: "48",
                height: h.q1Y - h.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, bh)
            ], 64)) : (y(), x(K, { key: 1 }, [
              l("line", {
                x1: 0,
                y1: h.minY,
                x2: 0,
                y2: h.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, mh),
              l("line", {
                x1: 0,
                y1: h.q3Y,
                x2: 0,
                y2: h.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, yh),
              l("line", {
                x1: -18,
                y1: h.minY,
                x2: 18,
                y2: h.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, _h),
              l("line", {
                x1: -18,
                y1: h.maxY,
                x2: 18,
                y2: h.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, xh),
              l("rect", {
                x: -24,
                y: h.q3Y,
                width: "48",
                height: h.q1Y - h.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, kh)
            ], 64)),
            l("circle", {
              cx: 0,
              cy: h.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (_) => r(_, `Min: ${h.min.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, wh),
            l("circle", {
              cx: 0,
              cy: h.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (_) => r(_, `Q1: ${h.q1.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, $h),
            l("circle", {
              cx: 0,
              cy: h.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (_) => r(_, `Q3: ${h.q3.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Mh),
            l("circle", {
              cx: 0,
              cy: h.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (_) => r(_, `Max: ${h.max.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Ch),
            l("line", {
              x1: -24,
              y1: h.medianY,
              x2: 24,
              y2: h.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (_) => r(_, `Median: ${h.median.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Sh),
            h.averageY ? (y(), x("line", {
              key: 2,
              x1: -24,
              y1: h.averageY,
              x2: 24,
              y2: h.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (_) => r(_, `Avg: ${h.average.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Dh)) : E("", !0)
          ], 8, hh),
          l("text", {
            x: h.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, $(i(h.label)), 9, Ah),
          h.responseCount ? (y(), x("text", {
            key: 0,
            x: h.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: n.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + $(h.responseCount), 9, Th)) : E("", !0)
        ], 64))), 128)),
        e.showLegend ? (y(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          l("g", Lh, [
            l("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Fh),
            l("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Ph)
          ]),
          l("g", Ih, [
            l("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Eh),
            l("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Rh)
          ]),
          l("g", Oh, [
            l("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Vh),
            l("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, zh)
          ]),
          l("g", Nh, [
            l("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Wh),
            l("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Hh)
          ]),
          l("g", jh, [
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
            }, " Avg ", 8, Yh)
          ]),
          l("g", qh, [
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
            }, " Median ", 8, Uh)
          ])
        ], 8, Bh)) : E("", !0)
      ], 44, ah))
    ]));
  }
}), Xh = /* @__PURE__ */ nt(Kh, [["__scopeId", "data-v-520c623f"]]), Gh = { class: "chart-container" }, Zh = ["viewBox"], Qh = ["transform"], Jh = ["x", "y", "width", "height", "fill", "stroke"], tf = ["y", "fill"], ef = ["y", "fill"], af = ["x1", "y1", "x2", "y2", "stroke"], sf = ["points", "fill"], nf = ["x1", "y1", "x2", "y2", "stroke"], of = ["x1", "y1", "x2", "y2", "stroke"], rf = ["x", "y", "fill"], lf = ["x", "y", "fill", "transform"], cf = ["x1", "y1", "x2", "y2", "stroke"], df = ["points", "fill"], uf = ["transform"], hf = ["y1", "y2", "stroke", "onMouseenter"], ff = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], gf = ["x1", "y1", "x2", "y2", "onMouseenter"], pf = ["x1", "y1", "x2", "y2", "onMouseenter"], vf = ["cy", "stroke", "onMouseenter"], bf = ["cy", "stroke", "onMouseenter"], mf = ["x", "y", "fill"], yf = ["x", "y", "fill"], _f = ["transform"], xf = { transform: "translate(-180, 0)" }, kf = ["stroke"], wf = ["fill"], $f = { transform: "translate(-120, 0)" }, Mf = ["fill"], Cf = { transform: "translate(-60, 0)" }, Sf = ["fill"], Df = { transform: "translate(0, 0)" }, Af = ["stroke"], Tf = ["fill"], Bf = { transform: "translate(60, 0)" }, Lf = ["fill"], Ff = { transform: "translate(130, 0)" }, Pf = ["fill"], If = /* @__PURE__ */ tt({
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
    const a = e, { isDark: s } = ct(lt(a, "theme")), n = C(() => ({
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
    }), i = (p) => typeof p == "string" ? p.charAt(0).toUpperCase() + p.slice(1).toLowerCase() : p, r = (p, v, h) => {
      const m = p.currentTarget.closest("svg");
      if (!m) return;
      const _ = m.getBoundingClientRect(), g = m.createSVGPoint();
      g.x = p.clientX - _.left, g.y = p.clientY - _.top;
      let b = i(v.label), k = "";
      switch (h) {
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
        const v = p.currentTarget, h = v.getBoundingClientRect(), m = v.createSVGPoint();
        m.x = p.clientX - h.left, m.y = p.clientY - h.top, o.value.x = m.x, o.value.y = m.y - 20;
      }
    }, d = () => {
      o.value.visible = !1;
    }, u = () => {
      o.value.visible = !1;
    }, f = C(() => {
      const p = [], h = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let m = 1; m <= 10; m++) {
        const _ = m, g = (_ - 1) / 9, b = a.chartMargin + h - g * h;
        p.push({ value: _, y: b });
      }
      return p;
    });
    return t({ isDark: s }), (p, v) => (y(), x("div", Gh, [
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
          }, null, 8, Jh),
          l("text", {
            x: "0",
            y: -o.value.height + 8,
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, $(o.value.title), 9, tf),
          l("text", {
            x: "0",
            y: -o.value.height + 26,
            "text-anchor": "middle",
            fill: n.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, $(o.value.text), 9, ef)
        ], 8, Qh)) : E("", !0),
        l("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, af),
        l("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, sf),
        (y(!0), x(K, null, J(f.value, (h, m) => (y(), x("line", {
          key: `grid-${m}`,
          x1: e.chartMargin,
          y1: h.y,
          x2: e.chartWidth - e.chartMargin,
          y2: h.y,
          stroke: n.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, nf))), 128)),
        (y(!0), x(K, null, J(f.value, (h, m) => (y(), x(K, { key: m }, [
          l("line", {
            x1: e.chartMargin - 6,
            y1: h.y,
            x2: e.chartMargin,
            y2: h.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, of),
          l("text", {
            x: e.chartMargin - 12,
            y: h.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, $(h.value), 9, rf)
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
        }, $(i(e.yAxisLabel)), 9, lf),
        l("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, cf),
        l("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, df),
        (y(!0), x(K, null, J(e.candlestickData, (h, m) => (y(), x(K, { key: m }, [
          l("g", {
            transform: `translate(${h.centerX}, 0)`
          }, [
            l("line", {
              x1: 0,
              y1: h.highY,
              x2: 0,
              y2: h.lowY,
              stroke: h.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "hover-line",
              onMouseenter: (_) => r(_, h, "wick"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, hf),
            l("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(h.q1Y, h.q3Y) - (Math.abs(h.q3Y - h.q1Y) < 4 ? 4 : 0),
              width: e.candleWidth,
              height: Math.max(8, Math.abs(h.q3Y - h.q1Y)),
              fill: h.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: h.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (_) => r(_, h, "body"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, ff),
            h.medianY ? (y(), x("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: h.medianY,
              x2: e.candleWidth / 2,
              y2: h.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (_) => r(_, h, "median"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, gf)) : E("", !0),
            h.averageY ? (y(), x("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: h.averageY,
              x2: e.candleWidth / 2,
              y2: h.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (_) => r(_, h, "average"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, pf)) : E("", !0),
            l("circle", {
              cx: 0,
              cy: h.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (_) => r(_, h, "min"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, vf),
            l("circle", {
              cx: 0,
              cy: h.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (_) => r(_, h, "max"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, bf)
          ], 8, uf),
          l("text", {
            x: h.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, $(i(h.label)), 9, mf),
          h.responseCount ? (y(), x("text", {
            key: 0,
            x: h.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: n.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + $(h.responseCount), 9, yf)) : E("", !0)
        ], 64))), 128)),
        e.showLegend ? (y(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          l("g", xf, [
            l("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, kf),
            l("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, wf)
          ]),
          l("g", $f, [
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
            }, " Q1 ", 8, Mf)
          ]),
          l("g", Cf, [
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
            }, " Q3 ", 8, Sf)
          ]),
          l("g", Df, [
            l("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Af),
            l("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Tf)
          ]),
          l("g", Bf, [
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
            }, " Avg ", 8, Lf)
          ]),
          l("g", Ff, [
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
            }, " Median ", 8, Pf)
          ])
        ], 8, _f)) : E("", !0)
      ], 44, Zh))
    ]));
  }
}), Ri = /* @__PURE__ */ nt(If, [["__scopeId", "data-v-61d0259c"]]), Ef = { class: "chart-container" }, Rf = ["viewBox"], Of = ["transform"], Vf = ["x", "y", "width", "height", "fill", "stroke"], zf = ["y", "fill"], Nf = ["y", "fill"], Wf = ["x1", "y1", "x2", "y2", "stroke"], Hf = ["x1", "y1", "x2", "y2", "stroke"], jf = ["points", "fill"], Yf = ["x1", "y1", "x2", "y2", "stroke"], qf = ["x", "y", "fill"], Uf = ["x", "y", "fill", "transform"], Kf = ["x1", "y1", "x2", "y2", "stroke"], Xf = ["points", "fill"], Gf = ["x1", "y1", "x2", "y2", "stroke"], Zf = ["x", "y", "fill"], Qf = ["x", "y", "fill"], Jf = ["d"], tg = ["x", "y", "width", "height", "onMouseenter"], eg = ["x1", "y1", "x2", "y2"], ag = ["x", "y"], sg = ["x1", "y1", "x2", "y2"], ng = ["x", "y"], og = ["x1", "y1", "x2", "y2"], ig = ["x", "y"], rg = ["x1", "y1", "x2", "y2"], lg = ["x", "y"], cg = ["x1", "y1", "x2", "y2"], dg = ["x", "y"], ug = ["x1", "y1", "x2", "y2"], hg = ["x", "y"], fg = ["transform"], gg = { transform: "translate(-220, 0)" }, pg = ["fill"], vg = { transform: "translate(-140, 0)" }, bg = ["fill"], mg = { transform: "translate(-80, 0)" }, yg = ["fill"], _g = { transform: "translate(-20, 0)" }, xg = ["fill"], kg = { transform: "translate(60, 0)" }, wg = ["fill"], $g = { transform: "translate(130, 0)" }, Mg = ["fill"], Cg = { transform: "translate(180, 0)" }, Sg = ["fill"], Dg = /* @__PURE__ */ tt({
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
    const a = e, { isDark: s } = ct(lt(a, "theme")), n = C(() => ({
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
      const V = Math.max(...a.histogram.map((H) => H.count || 0), 1), z = Math.max(1, Math.ceil(V * 0.2));
      return V + z;
    }), u = C(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const V = a.averageScore || 0;
      let z = 0, H = 0;
      if (a.histogram.forEach((G) => {
        const U = G.count || 0;
        z += U;
        const ot = G.score - V;
        H += U * (ot * ot);
      }), z === 0) return 1;
      const et = H / z;
      return Math.sqrt(et) || 1;
    }), f = (V, z, H) => {
      if (H === 0) return 0;
      const et = 1 / (H * Math.sqrt(2 * Math.PI)), G = -0.5 * Math.pow((V - z) / H, 2);
      return et * Math.exp(G);
    }, p = C(() => {
      if (!a.histogram || a.histogram.length === 0 || a.averageScore === 0 && u.value === 0) return null;
      const V = a.averageScore, z = u.value, H = 100, G = Math.max(...a.histogram.map((gt) => gt.count || 0), 1) / d.value * r.value;
      if (G <= 0) return null;
      let U = 0;
      for (let gt = 0; gt <= H; gt++) {
        const Pt = 1 + 9 * (gt / H), zt = f(Pt, V, z);
        zt > U && (U = zt);
      }
      if (U <= 0) return null;
      const ot = G / U, wt = [];
      for (let gt = 0; gt <= H; gt++) {
        const Pt = 1 + 9 * (gt / H), zt = f(Pt, V, z) * ot, qt = h(Pt);
        if (qt !== null) {
          const rt = a.chartHeight - a.chartBottomMargin - zt;
          wt.push(`${gt === 0 ? "M" : "L"} ${qt} ${rt}`);
        }
      }
      return wt.join(" ");
    }), v = C(() => {
      if (!a.histogram || a.histogram.length === 0) return [];
      const V = i.value / 10;
      return a.histogram.map((z, H) => {
        const et = a.chartMargin + (H + 0.5) * V, G = z.count > 0 ? z.count / d.value * r.value : 0, U = a.chartHeight - a.chartBottomMargin - G;
        return {
          score: z.score,
          count: z.count,
          x: et,
          y: U,
          height: G
        };
      });
    }), h = (V) => {
      if (V < 1 || V > 10) return null;
      const z = i.value / 10;
      return a.chartMargin + (V - 0.5) * z;
    }, m = C(() => h(a.minScore)), _ = C(() => h(a.maxScore)), g = C(() => h(a.q1Score)), b = C(() => h(a.medianScore)), k = C(() => h(a.q3Score)), w = C(() => h(a.averageScore)), M = C(() => a.minScore), S = C(() => a.maxScore), D = C(() => a.q1Score), A = C(() => a.medianScore), B = C(() => a.q3Score), F = C(() => a.averageScore), P = C(() => {
      const V = [], z = a.chartMargin - 8, H = 18;
      g.value !== null && V.push({
        x: g.value,
        y: z,
        value: a.q1Score,
        label: `Q1: ${D.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), b.value !== null && V.push({
        x: b.value,
        y: z - H,
        value: a.medianScore,
        label: `Median: ${A.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), w.value !== null && V.push({
        x: w.value,
        y: z - H,
        value: a.averageScore,
        label: `Avg: ${F.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), k.value !== null && V.push({
        x: k.value,
        y: z,
        value: a.q3Score,
        label: `Q3: ${B.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), V.sort((U, ot) => (U.x || 0) - (ot.x || 0));
      const et = [[], [], []];
      V.forEach((U) => {
        if (U.x === null) return;
        let ot = -1;
        for (let wt = 0; wt < et.length; wt++) {
          let gt = !1;
          for (const Pt of et[wt]) {
            if (Pt.x === null) continue;
            const zt = Math.abs(U.x - Pt.x), qt = (U.width + Pt.width) / 2 + 10;
            if (zt < qt) {
              gt = !0;
              break;
            }
          }
          if (!gt) {
            ot = wt;
            break;
          }
        }
        ot === -1 && (ot = et.length - 1), U.y = z - ot * H, et[ot].push(U);
      });
      const G = 15;
      return V.forEach((U) => {
        U.y < G && (U.y = G);
      }), V;
    }), R = (V) => P.value.find((H) => H.id === V)?.y || a.chartMargin - 10, N = C(() => {
      const V = [];
      for (let H = 0; H <= 5; H++) {
        const et = Math.round(d.value / 5 * H), G = a.chartHeight - a.chartBottomMargin - H / 5 * r.value;
        V.push({ value: et, y: G });
      }
      return V;
    }), Y = (V, z) => {
      const H = V.currentTarget.closest("svg");
      if (!H) return;
      const et = H.getBoundingClientRect(), G = H.createSVGPoint();
      G.x = V.clientX - et.left, G.y = V.clientY - et.top;
      const U = `Score: ${z.score}`, ot = `Count: ${z.count}`, wt = 120, gt = 48;
      o.value = {
        visible: !0,
        x: G.x,
        y: G.y - 20,
        title: U,
        text: ot,
        width: wt,
        height: gt
      };
    }, L = (V) => {
      if (o.value.visible) {
        const z = V.currentTarget, H = z.getBoundingClientRect(), et = z.createSVGPoint();
        et.x = V.clientX - H.left, et.y = V.clientY - H.top, o.value.x = et.x, o.value.y = et.y - 20;
      }
    }, O = () => {
      o.value.visible = !1;
    }, j = () => {
      o.value.visible = !1;
    };
    return t({ isDark: s }), (V, z) => (y(), x("div", Ef, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: ft(`min-height: ${e.chartHeight}px;`),
        onMousemove: L,
        onMouseleave: O
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
          }, null, 8, Vf),
          l("text", {
            x: "0",
            y: -o.value.height + 8,
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, $(o.value.title), 9, zf),
          l("text", {
            x: "0",
            y: -o.value.height + 26,
            "text-anchor": "middle",
            fill: n.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, $(o.value.text), 9, Nf)
        ], 8, Of)) : E("", !0),
        (y(!0), x(K, null, J(N.value, (H, et) => (y(), x("line", {
          key: `grid-${et}`,
          x1: e.chartMargin,
          y1: H.y,
          x2: e.chartWidth - e.chartMargin,
          y2: H.y,
          stroke: n.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Wf))), 128)),
        l("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, Hf),
        l("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, jf),
        (y(!0), x(K, null, J(N.value, (H, et) => (y(), x(K, {
          key: `y-tick-${et}`
        }, [
          l("line", {
            x1: e.chartMargin - 6,
            y1: H.y,
            x2: e.chartMargin,
            y2: H.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Yf),
          l("text", {
            x: e.chartMargin - 12,
            y: H.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, $(H.value), 9, qf)
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
        }, " Count ", 8, Uf),
        l("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, Kf),
        l("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, Xf),
        (y(!0), x(K, null, J(v.value, (H, et) => (y(), x(K, {
          key: `tick-${et}`
        }, [
          l("line", {
            x1: H.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: H.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Gf),
          l("text", {
            x: H.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, $(H.score), 9, Zf)
        ], 64))), 128)),
        l("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: n.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, Qf),
        p.value ? (y(), x("path", {
          key: 1,
          d: p.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, Jf)) : E("", !0),
        (y(!0), x(K, null, J(v.value, (H, et) => (y(), x("rect", {
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
          onMouseenter: (G) => Y(G, H),
          onMouseleave: j,
          style: { cursor: "pointer" }
        }, null, 40, tg))), 128)),
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
        }, null, 8, eg)) : E("", !0),
        m.value ? (y(), x("text", {
          key: 3,
          x: m.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + $(M.value.toFixed(1)), 9, ag)) : E("", !0),
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
        }, null, 8, sg)) : E("", !0),
        g.value ? (y(), x("text", {
          key: 5,
          x: g.value,
          y: R("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + $(D.value.toFixed(1)), 9, ng)) : E("", !0),
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
        }, null, 8, og)) : E("", !0),
        b.value ? (y(), x("text", {
          key: 7,
          x: b.value,
          y: R("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + $(A.value.toFixed(1)), 9, ig)) : E("", !0),
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
        }, null, 8, rg)) : E("", !0),
        w.value ? (y(), x("text", {
          key: 9,
          x: w.value,
          y: R("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + $(F.value.toFixed(1)), 9, lg)) : E("", !0),
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
        }, null, 8, cg)) : E("", !0),
        k.value ? (y(), x("text", {
          key: 11,
          x: k.value,
          y: R("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + $(B.value.toFixed(1)), 9, dg)) : E("", !0),
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
        }, null, 8, ug)) : E("", !0),
        _.value ? (y(), x("text", {
          key: 13,
          x: _.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + $(S.value.toFixed(1)), 9, hg)) : E("", !0),
        e.showLegend ? (y(), x("g", {
          key: 14,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          l("g", gg, [
            z[0] || (z[0] = l("line", {
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
            }, " Gaussian ", 8, pg)
          ]),
          l("g", vg, [
            z[1] || (z[1] = l("line", {
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
            }, " Min ", 8, bg)
          ]),
          l("g", mg, [
            z[2] || (z[2] = l("line", {
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
            }, " Q1 ", 8, yg)
          ]),
          l("g", _g, [
            z[3] || (z[3] = l("line", {
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
            }, " Median ", 8, xg)
          ]),
          l("g", kg, [
            z[4] || (z[4] = l("line", {
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
            }, " Avg ", 8, wg)
          ]),
          l("g", $g, [
            z[5] || (z[5] = l("line", {
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
            }, " Q3 ", 8, Mg)
          ]),
          l("g", Cg, [
            z[6] || (z[6] = l("line", {
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
            }, " Max ", 8, Sg)
          ])
        ], 8, fg)) : E("", !0)
      ], 44, Rf))
    ]));
  }
}), Oi = /* @__PURE__ */ nt(Dg, [["__scopeId", "data-v-64e657d9"]]), Ag = { class: "chart-container" }, Tg = {
  key: 1,
  class: "chart-wrapper"
}, Bg = /* @__PURE__ */ tt({
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
    sn.use([Xi, Gi, Zi, Qi]);
    const a = e, { isDark: s, colors: n } = ct(lt(a, "theme")), o = at(null), i = at(!0), r = at(!1);
    let c = null;
    const d = {
      animation: { duration: 1e3, easing: "cubicOut" },
      margins: { left: "2%", right: "2%", top: "2%", bottom: "2%" },
      node: { width: 70, gap: 20, align: "left", iterations: 64 },
      style: {
        shadowBlur: 4,
        shadowColor: "rgba(139, 92, 246, 0.15)"
      }
    }, u = [
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
      const k = a.data.links.filter(
        (D) => D.source && D.target && typeof D.value == "number"
      ), w = Math.max(...k.map((D) => D.value), 1), M = Math.max(1, w * 0.01), S = k.map((D) => ({
        ...D,
        originalValue: D.value,
        value: D.value < w * 0.01 ? M : D.value
      }));
      return {
        nodes: a.data.nodes.filter((D) => D.name),
        links: S
      };
    }, p = (k) => k.map((w, M) => ({
      ...w,
      itemStyle: {
        color: a.nodeColors[w.name] || u[M % u.length],
        borderRadius: 8
      }
    })), v = (k) => (w) => {
      const M = w.dataType === "node", S = n.value.tooltipText, D = s.value ? "#d1d5db" : "#e2e8f0";
      if (M) {
        const R = k.filter((L) => L.target === w.name), N = k.filter((L) => L.source === w.name), Y = R.length > 0 ? R.reduce((L, O) => L + (O.originalValue || O.value), 0) : N.reduce((L, O) => L + (O.originalValue || O.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${S};">${w.name}</div><div style="color: ${D}; font-size: 12px;">Count: ${Y.toLocaleString()}</div>`;
      }
      const A = w.data?.source || w.source || "Unknown", B = w.data?.target || w.target || "Unknown", F = w.data?.originalValue || w.data?.value || w.value || 0, P = w.data?.label || `${F.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${S};">${A} → ${B}</div><div style="color: ${D}; font-size: 12px;">Flow: ${P}</div>`;
    }, h = () => {
      if (!(!c || !a.data.nodes?.length || !a.data.links?.length))
        try {
          const { nodes: k, links: w } = f(), M = p(k), S = {
            tooltip: {
              trigger: "item",
              triggerOn: "mousemove",
              formatter: v(w),
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
                data: M,
                links: w,
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
                itemStyle: d.style,
                label: {
                  show: !0,
                  position: "inside",
                  color: "#000000",
                  fontWeight: 600,
                  fontSize: 12,
                  fontFamily: "'DM Sans', sans-serif",
                  formatter: (D) => {
                    const A = D.name || "";
                    return A.length > 15 ? `${A.substring(0, 15)}...` : A;
                  }
                },
                edgeLabel: {
                  show: !0,
                  fontSize: 11,
                  color: n.value.textSecondary,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  formatter: (D) => {
                    const A = D.data?.originalValue || D.value || 0;
                    return D.data?.label || `${A.toLocaleString()}`;
                  }
                },
                nodeAlign: d.node.align,
                nodeGap: a.nodeGap,
                nodeWidth: d.node.width,
                layoutIterations: d.node.iterations,
                orient: "horizontal",
                draggable: !1,
                ...d.margins
              }
            ],
            backgroundColor: "transparent",
            animation: !0,
            animationDuration: d.animation.duration,
            animationEasing: d.animation.easing
          };
          c.setOption(S);
        } catch (k) {
          console.error("Error setting Sankey chart options:", k), r.value = !0;
        }
    }, m = async () => {
      if (o.value)
        try {
          c = sn.init(o.value), h(), window.addEventListener("resize", g);
        } catch (k) {
          console.error("Error initializing Sankey chart:", k), r.value = !0;
        } finally {
          i.value = !1;
        }
    }, _ = async (k = 40) => {
      await Ct();
      for (let w = 0; w < k; w++) {
        if (o.value?.clientWidth && o.value.clientWidth > 0 && o.value?.clientHeight && o.value.clientHeight > 0)
          return await m();
        await new Promise((M) => setTimeout(M, 50));
      }
      await m(), setTimeout(g, 50);
    }, g = () => c?.resize(), b = () => {
      window.removeEventListener("resize", g), c && (c.dispose(), c = null);
    };
    return le(() => o.value && _()), Ro(b), Et(() => a.data, h, { deep: !0 }), Et(s, h), t({ isDark: s }), (k, w) => (y(), x("div", Ag, [
      r.value ? (y(), x("div", {
        key: 0,
        class: "error-state",
        style: ft({ height: e.height })
      }, [...w[0] || (w[0] = [
        st('<div class="error-content" data-v-d6d61034><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d6d61034><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-d6d61034></path></svg><p class="error-title" data-v-d6d61034>Chart could not be loaded</p><p class="error-description" data-v-d6d61034>Please check the data format.</p></div>', 1)
      ])], 4)) : (y(), x("div", Tg, [
        Ut(l("div", {
          ref_key: "chartEl",
          ref: o,
          class: "chart-content",
          style: ft({ height: e.height })
        }, null, 4), [
          [la, !i.value]
        ]),
        Ut(l("div", {
          class: "loading-state",
          style: ft({ height: e.height })
        }, [...w[1] || (w[1] = [
          st('<div class="loading-container" data-v-d6d61034><div class="sankey-loader" data-v-d6d61034><div class="flow flow-1" data-v-d6d61034></div><div class="flow flow-2" data-v-d6d61034></div><div class="flow flow-3" data-v-d6d61034></div><div class="flow flow-4" data-v-d6d61034></div></div><p class="loading-text" data-v-d6d61034>Loading Sankey diagram...</p></div>', 1)
        ])], 4), [
          [la, i.value]
        ])
      ]))
    ]));
  }
}), _e = /* @__PURE__ */ nt(Bg, [["__scopeId", "data-v-d6d61034"]]);
function Lg(e, t) {
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
function Fg(e, t) {
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
function Pg(e, t) {
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
function Vi(e, t) {
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
function Vt(e, t) {
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
function Ig(e, t) {
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
function zi(e, t) {
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
      d: "M15.75 19.5 8.25 12l7.5-7.5"
    })
  ]);
}
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
      d: "m8.25 4.5 7.5 7.5-7.5 7.5"
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
      d: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    })
  ]);
}
function So(e, t) {
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
      d: "M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
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
      d: "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
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
      d: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
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
      d: "M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
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
      d: "M6 18 18 6M6 6l12 12"
    })
  ]);
}
const Hg = { class: "chart-footer" }, jg = { class: "export-actions" }, Yg = { class: "export-buttons" }, qg = ["disabled"], Ug = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Kg = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Xg = ["disabled"], Gg = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Zg = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Qg = /* @__PURE__ */ tt({
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
    return (i, r) => (y(), x("footer", Hg, [
      r[9] || (r[9] = l("div", { class: "footer-divider" }, null, -1)),
      l("div", jg, [
        r[8] || (r[8] = l("span", { class: "export-label" }, "Export", -1)),
        l("div", Yg, [
          n("pdf") ? (y(), x("button", {
            key: 0,
            type: "button",
            class: q(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download PDF",
            onClick: r[0] || (r[0] = (c) => o("pdf"))
          }, [
            e.loading ? (y(), x("svg", Ug, [...r[2] || (r[2] = [
              l("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              l("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (y(), x("svg", Kg, [...r[3] || (r[3] = [
              st('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-672661d4></path><polyline points="14 2 14 8 20 8" data-v-672661d4></polyline><line x1="16" y1="13" x2="8" y2="13" data-v-672661d4></line><line x1="16" y1="17" x2="8" y2="17" data-v-672661d4></line><polyline points="10 9 9 9 8 9" data-v-672661d4></polyline>', 5)
            ])])),
            r[4] || (r[4] = l("span", null, "PDF", -1))
          ], 10, qg)) : E("", !0),
          n("csv") ? (y(), x("button", {
            key: 1,
            type: "button",
            class: q(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download CSV",
            onClick: r[1] || (r[1] = (c) => o("csv"))
          }, [
            e.loading ? (y(), x("svg", Gg, [...r[5] || (r[5] = [
              l("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              l("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (y(), x("svg", Zg, [...r[6] || (r[6] = [
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
          ], 10, Xg)) : E("", !0)
        ])
      ])
    ]));
  }
}), kt = /* @__PURE__ */ nt(Qg, [["__scopeId", "data-v-672661d4"]]), Jg = { class: "agents-per-day-card" }, tp = {
  key: 0,
  class: "card-body"
}, ep = {
  key: 0,
  class: "chart-section"
}, ap = {
  key: 1,
  class: "empty-state"
}, sp = { class: "empty-state-content" }, np = { class: "empty-icon-wrapper" }, op = {
  key: 1,
  class: "loading-state"
}, ip = /* @__PURE__ */ tt({
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
    }, { isDark: r, colors: c } = ct(lt(n, "theme")), d = (p) => {
      const v = new Date(p), h = String(v.getDate()).padStart(2, "0"), m = String(v.getMonth() + 1).padStart(2, "0");
      return `${h}-${m}`;
    }, u = C(() => {
      const p = n.data?.agents_by_day || {}, v = Object.keys(p).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const h = v.map((k) => d(k)), m = /* @__PURE__ */ new Set();
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
        labels: h,
        datasets: b
      };
    }), f = C(() => n.options ? n.options : {
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
    return t({ isDark: r }), (p, v) => (y(), x("article", Jg, [
      v[3] || (v[3] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Agents Total Messages per Day"),
          l("p", { class: "card-subtitle" }, "Daily agent interactions (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", op, [...v[2] || (v[2] = [
        st('<div class="loading-container" data-v-4d18c22c><div class="chart-lines-loader" data-v-4d18c22c><div class="line line-1" data-v-4d18c22c></div><div class="line line-2" data-v-4d18c22c></div><div class="line line-3" data-v-4d18c22c></div><div class="line line-4" data-v-4d18c22c></div><div class="line line-5" data-v-4d18c22c></div></div><p class="loading-text" data-v-4d18c22c>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", tp, [
        u.value.labels && u.value.labels.length ? (y(), x("section", ep, [
          Q(re, {
            data: u.value,
            options: f.value,
            stacked: !0
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), dt(T(kt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", ap, [
          l("div", sp, [
            l("div", np, [
              Q(T(Vt), { class: "empty-icon" })
            ]),
            v[0] || (v[0] = l("p", { class: "empty-title" }, "No agents data per day", -1)),
            v[1] || (v[1] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see daily agent interactions.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), rp = /* @__PURE__ */ nt(ip, [["__scopeId", "data-v-4d18c22c"]]), X = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), bt = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), Qt = (e) => {
  if (e == null) return "0";
  const t = Math.abs(e), a = e < 0 ? "-" : "";
  return t >= 1e6 ? `${a}${(t / 1e6).toFixed(2)}M` : t > 99999 ? `${a}${(t / 1e3).toFixed(1)}K` : `${a}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(t)}`;
}, lp = { class: "booking-manager-card" }, cp = { class: "card-header" }, dp = { class: "header-content" }, up = {
  key: 0,
  class: "payment-success-badge"
}, hp = {
  key: 0,
  class: "currency-breakdown-list"
}, fp = {
  key: 1,
  class: "badge-value"
}, gp = {
  key: 0,
  class: "loading-state"
}, pp = {
  key: 1,
  class: "error-state"
}, vp = { class: "error-content" }, bp = { class: "error-description" }, mp = {
  key: 2,
  class: "card-body"
}, yp = { class: "chart-section" }, _p = { class: "chart-wrapper" }, xp = {
  key: 0,
  class: "table-section"
}, kp = { class: "table-wrapper" }, wp = { class: "data-table" }, $p = { class: "table-body" }, Mp = { class: "table-cell font-medium" }, Cp = { class: "table-cell text-center" }, Sp = { class: "table-cell text-center" }, Dp = { class: "percentage-text" }, Ap = { class: "table-cell text-center" }, Tp = { class: "table-cell" }, Bp = { class: "badges-container" }, Lp = { class: "badge badge-success" }, Fp = { class: "badge badge-error" }, Pp = { class: "table-cell" }, Ip = {
  key: 0,
  class: "badges-container"
}, Ep = {
  key: 1,
  class: "percentage-text"
}, Rp = { class: "table-cell" }, Op = { class: "badges-container" }, Vp = { class: "badge badge-error" }, zp = { class: "badge badge-warning" }, Np = { class: "badge badge-yellow" }, Wp = { class: "badge badge-error" }, Hp = {
  key: 1,
  class: "empty-state"
}, gs = 3, jp = /* @__PURE__ */ tt({
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
    ) : []), r = C(() => o.value ? i.value : i.value.slice(0, gs)), c = C(() => i.value.length > gs), d = C(() => a.data?.total_payment_success_value || []), u = (g) => g.payment_success_value || [], f = (g) => typeof g.payment_success_count == "number" ? g.payment_success_count : (g.payment_success_value || []).reduce((b, k) => b + (k.count || 0), 0), p = (g) => bt(g), v = (g) => g == null ? "0" : Qt(g);
    C(() => (a.data?.total_payment_success_value || []).reduce((g, b) => g + (b.total_value || 0), 0));
    const h = C(() => {
      const g = a.data, b = g.total_booking_initiated || 0, k = g.total_booking_started || 0, w = g.total_payment_initiated || 0, M = g.total_not_found || 0, S = g.total_cancelled || 0, D = g.total_no_pending_balance || 0, A = g.total_errors || 0, B = typeof g.total_payment_success == "number" ? g.total_payment_success : (g.total_payment_success_value || []).reduce((O, j) => O + (j.count || 0), 0), F = g.total_payment_failed || 0, P = Math.max(0, b - k), R = Math.max(0, k - w - M - S - D - A), N = (O, j) => {
        const V = j > 0 ? Math.round(O / j * 100) : 0;
        return `${X(O)} (${V}%)`;
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
      ], L = [];
      return k > 0 && L.push({
        source: "Initiated",
        target: "Started",
        value: k,
        label: N(k, b)
      }), P > 0 && L.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: P,
        label: N(P, b)
      }), w > 0 && L.push({
        source: "Started",
        target: "Payment Initiated",
        value: w,
        label: N(w, k)
      }), M > 0 && L.push({
        source: "Started",
        target: "Not Found",
        value: M,
        label: N(M, k)
      }), S > 0 && L.push({
        source: "Started",
        target: "Cancelled",
        value: S,
        label: N(S, k)
      }), D > 0 && L.push({
        source: "Started",
        target: "No Pending Balance",
        value: D,
        label: N(D, k)
      }), A > 0 && L.push({
        source: "Started",
        target: "Errors",
        value: A,
        label: N(A, k)
      }), R > 0 && L.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: R,
        label: N(R, k)
      }), B > 0 && L.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: B,
        label: N(B, w)
      }), F > 0 && L.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: F,
        label: N(F, w)
      }), { nodes: Y, links: L };
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
    return (g, b) => (y(), x("article", lp, [
      l("header", cp, [
        l("div", dp, [
          b[2] || (b[2] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "Booking Manager Metrics"),
            l("p", { class: "card-subtitle" }, "Booking manager workflow tracking and analysis")
          ], -1)),
          a.loading ? E("", !0) : (y(), x("div", up, [
            b[1] || (b[1] = l("p", { class: "badge-label" }, "Payment Success Value", -1)),
            d.value.length > 0 ? (y(), x("div", hp, [
              (y(!0), x(K, null, J(d.value, (k) => (y(), x("p", {
                key: k.currency,
                class: "currency-breakdown-item"
              }, $(k.currency) + " " + $(v(k.total_value)), 1))), 128))
            ])) : (y(), x("p", fp, $(v(0)), 1))
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", gp, [...b[3] || (b[3] = [
        st('<div class="loading-container" data-v-2db93357><div class="chart-flow-loader" data-v-2db93357><div class="flow-line flow-1" data-v-2db93357></div><div class="flow-line flow-2" data-v-2db93357></div><div class="flow-line flow-3" data-v-2db93357></div><div class="flow-line flow-4" data-v-2db93357></div><div class="flow-line flow-5" data-v-2db93357></div></div><p class="loading-text" data-v-2db93357>Loading booking data...</p></div>', 1)
      ])])) : a.error ? (y(), x("div", pp, [
        l("div", vp, [
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
          l("p", bp, $(a.error), 1)
        ])
      ])) : (y(), x("div", mp, [
        l("section", yp, [
          l("div", _p, [
            Q(_e, {
              data: h.value,
              "node-colors": m,
              height: "500px",
              "node-gap": 15
            }, null, 8, ["data"])
          ])
        ]),
        i.value.length > 0 ? (y(), x("section", xp, [
          b[8] || (b[8] = l("div", { class: "section-header" }, [
            l("h4", { class: "section-title" }, "Daily Overview")
          ], -1)),
          l("div", kp, [
            l("table", wp, [
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
              l("tbody", $p, [
                (y(!0), x(K, null, J(r.value, (k) => (y(), x("tr", {
                  key: k.date,
                  class: "table-row"
                }, [
                  l("td", Mp, $(T(Dt)(k.date).format("DD/MM/YYYY")), 1),
                  l("td", Cp, $(T(X)(k.booking_initiated_count)), 1),
                  l("td", Sp, [
                    xt($(T(X)(k.booking_started_count)) + " ", 1),
                    l("span", Dp, " (" + $(_(k.booking_started_count, k.booking_initiated_count)) + ") ", 1)
                  ]),
                  l("td", Ap, $(T(X)(k.payment_initiated_count)), 1),
                  l("td", Tp, [
                    l("div", Bp, [
                      l("span", Lp, " Success: " + $(T(X)(f(k))), 1),
                      l("span", Fp, " Failed: " + $(T(X)(k.payment_failed_count || 0)), 1)
                    ])
                  ]),
                  l("td", Pp, [
                    u(k).length > 0 ? (y(), x("div", Ip, [
                      (y(!0), x(K, null, J(u(k), (w) => (y(), x("span", {
                        key: `${k.date}-${w.currency}`,
                        class: "badge badge-currency"
                      }, $(w.currency) + " " + $(p(w.total_value)), 1))), 128))
                    ])) : (y(), x("span", Ep, "N/A"))
                  ]),
                  l("td", Rp, [
                    l("div", Op, [
                      l("span", Vp, " Not Found: " + $(k.not_found_count ? T(X)(k.not_found_count) : "N/A"), 1),
                      l("span", zp, " Cancelled: " + $(k.cancelled_count ? T(X)(k.cancelled_count) : "N/A"), 1),
                      l("span", Np, " No Balance: " + $(k.no_pending_balance_count ? T(X)(k.no_pending_balance_count) : "N/A"), 1),
                      l("span", Wp, " Errors: " + $(k.error_count ? T(X)(k.error_count) : "N/A"), 1)
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
          ])) : E("", !0),
          e.enableExport ? (y(), dt(T(kt), {
            key: 1,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", Hp, [...b[9] || (b[9] = [
          st('<div class="empty-state-content" data-v-2db93357><div class="empty-icon-wrapper" data-v-2db93357><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-2db93357><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-v-2db93357></path></svg></div><p class="empty-title" data-v-2db93357>No booking manager data available</p><p class="empty-description" data-v-2db93357>No booking manager data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Yp = /* @__PURE__ */ nt(jp, [["__scopeId", "data-v-2db93357"]]), qp = { class: "checkin-metrics-card" }, Up = {
  key: 0,
  class: "loading-state"
}, Kp = {
  key: 1,
  class: "card-body"
}, Xp = {
  key: 0,
  class: "chart-section"
}, Gp = { class: "chart-wrapper" }, Zp = {
  key: 1,
  class: "table-section"
}, Qp = { class: "table-wrapper" }, Jp = { class: "data-table" }, t0 = { class: "table-body" }, e0 = { class: "table-cell font-medium" }, a0 = { class: "table-cell text-center" }, s0 = { class: "table-cell text-center" }, n0 = { class: "table-cell text-center" }, o0 = { class: "table-cell text-center" }, i0 = { class: "table-cell text-center" }, r0 = { class: "table-cell text-center" }, l0 = { class: "table-cell text-left" }, c0 = {
  key: 0,
  class: "failed-steps"
}, d0 = { class: "step-name" }, u0 = { class: "step-count" }, h0 = {
  key: 1,
  class: "empty-cell"
}, f0 = {
  key: 2,
  class: "empty-state"
}, g0 = {
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
    }), f = (_, g) => !g || g === 0 ? "0%" : `${Math.round(_ / g * 100)}%`, p = (_, g) => {
      const b = X(_), k = f(_, g);
      return `${b} (${k})`;
    }, v = (_) => _.reduce((g, b) => g + b.failed_count, 0), h = C(() => {
      const _ = [], g = [];
      if (!c.value.total_checkin_initiated)
        return { nodes: _, links: g };
      _.push({ name: "Checkin Init" }), _.push({ name: "Booking retrive" }), _.push({ name: "Booking retrive success" }), _.push({ name: "Number of Passengers" }), _.push({ name: "Completed" }), _.push({ name: "Closed with BP" });
      const b = c.value.total_checkin_initiated, k = c.value.total_checkin_init, w = c.value.total_checkin_init_abandoned, M = k - w, S = c.value.total_checkin_started, D = c.value.total_checkin_completed, A = c.value.total_checkin_closed, B = d.value.unrecovered_by_step || [], F = B.reduce((Y, L) => Y + L.count, 0);
      if (k > 0) {
        const Y = Math.round(k / b * 100);
        g.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: k,
          label: `${k.toLocaleString()} (${Y}%)`
        });
      }
      const P = b - k;
      if (P > 0) {
        const Y = Math.round(P / b * 100);
        _.push({ name: "Abandoned (Init)" }), g.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: P,
          label: `${P.toLocaleString()} (${Y}%)`
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
      if (B.length > 0 && F > 0) {
        _.push({ name: "Unrecovered" });
        const Y = Math.round(F / S * 100);
        g.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: F,
          label: `${F.toLocaleString()} (${Y}%)`
        }), B.forEach((L) => {
          const j = L.step_name.replace(/_/g, " ").split(" ").map((z) => z.charAt(0).toUpperCase() + z.slice(1)).join(" "), V = Math.round(L.count / S * 100);
          _.push({ name: j }), g.push({
            source: "Unrecovered",
            target: j,
            value: L.count,
            label: `${L.count.toLocaleString()} (${V}%)`
          });
        });
      }
      const R = S - (D + F);
      if (R > 0) {
        const Y = Math.round(R / S * 100);
        _.push({ name: "Abandoned (Flow)" }), g.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: R,
          label: `${R.toLocaleString()} (${Y}%)`
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
    return Et(
      [() => n.data, () => n.checkinData, () => n.failedData],
      () => {
        m();
      },
      { deep: !0, immediate: !0 }
    ), (_, g) => (y(), x("article", qp, [
      g[3] || (g[3] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Check-in Metrics"),
          l("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      n.loading ? (y(), x("div", Up, [...g[0] || (g[0] = [
        st('<div class="loading-container" data-v-d527da09><div class="chart-flow-loader" data-v-d527da09><div class="flow-line flow-1" data-v-d527da09></div><div class="flow-line flow-2" data-v-d527da09></div><div class="flow-line flow-3" data-v-d527da09></div><div class="flow-line flow-4" data-v-d527da09></div><div class="flow-line flow-5" data-v-d527da09></div></div><p class="loading-text" data-v-d527da09>Loading check-in data...</p></div>', 1)
      ])])) : (y(), x("div", Kp, [
        h.value.nodes.length > 0 ? (y(), x("section", Xp, [
          l("div", Gp, [
            Q(_e, {
              data: h.value,
              height: "500px",
              "node-colors": u.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : E("", !0),
        r.value && r.value.length > 0 ? (y(), x("section", Zp, [
          l("div", Qp, [
            l("table", Jp, [
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
              l("tbody", t0, [
                (y(!0), x(K, null, J(r.value, (b) => (y(), x("tr", {
                  key: b.date,
                  class: "table-row"
                }, [
                  l("td", e0, $(T(Dt)(b.date).format("DD/MM/YYYY")), 1),
                  l("td", a0, $(T(X)(b.checkin_initiated_count)), 1),
                  l("td", s0, $(p(b.checkin_init_count, b.checkin_initiated_count)), 1),
                  l("td", n0, $(T(X)(b.checkin_started_count)), 1),
                  l("td", o0, $(p(b.checkin_completed_count, b.checkin_started_count)), 1),
                  l("td", i0, $(p(b.checkin_closed_count, b.checkin_started_count)), 1),
                  l("td", r0, $(p(v(b.failed_steps), b.checkin_started_count)), 1),
                  l("td", l0, [
                    b.failed_steps && b.failed_steps.length > 0 ? (y(), x("div", c0, [
                      (y(!0), x(K, null, J(b.failed_steps, (k) => (y(), x("div", {
                        key: k.step_name,
                        class: "failed-step-item"
                      }, [
                        l("span", d0, $(k.step_name.replace(/_/g, " ")) + ":", 1),
                        l("span", u0, $(k.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", h0, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), dt(T(kt), {
            key: 0,
            onExport: s,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", f0, [...g[2] || (g[2] = [
          st('<div class="empty-state-content" data-v-d527da09><div class="empty-icon-wrapper" data-v-d527da09><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d527da09><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-d527da09></path></svg></div><p class="empty-title" data-v-d527da09>No check-in data available</p><p class="empty-description" data-v-d527da09>Try adjusting the date range or check your filters to see check-in performance data.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}, p0 = /* @__PURE__ */ nt(g0, [["__scopeId", "data-v-d527da09"]]), v0 = { class: "checkin-metrics-card" }, b0 = {
  key: 0,
  class: "loading-state"
}, m0 = {
  key: 1,
  class: "card-body"
}, y0 = {
  key: 0,
  class: "sankey-section"
}, _0 = {
  key: 1,
  class: "table-section"
}, x0 = { class: "table-wrapper" }, k0 = { class: "data-table" }, w0 = { class: "table-body" }, $0 = { class: "table-cell date-cell" }, M0 = { class: "table-cell text-center" }, C0 = { class: "table-cell text-center" }, S0 = { class: "table-cell text-center" }, D0 = { class: "table-cell text-center" }, A0 = { class: "table-cell text-center" }, T0 = { class: "table-cell text-center" }, B0 = { class: "table-cell reasons-cell" }, L0 = {
  key: 0,
  class: "reasons-list"
}, F0 = { class: "reason-name" }, P0 = { class: "reason-count" }, I0 = {
  key: 1,
  class: "no-reasons"
}, E0 = {
  key: 2,
  class: "empty-state"
}, R0 = { class: "empty-state-content" }, O0 = { class: "empty-icon-wrapper" }, ps = 3, V0 = /* @__PURE__ */ tt({
  __name: "CheckinMetrics",
  props: {
    checkinData: { default: () => ({
      total_checkin_init: 0,
      total_checkin_initiated: 0,
      total_checkin_init_abandoned: 0,
      total_checkin_started: 0,
      total_checkin_completed: 0,
      total_checkin_closed: 0,
      total_checkin_unrecovered: 0,
      total_checkin_init_abandoned_error: null,
      total_checkin_init_abandoned_voluntary: null,
      total_checkin_pre_init_abandoned_error: null,
      total_checkin_pre_init_abandoned_voluntary: null,
      checkin_by_day: []
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
    }, { isDark: i } = ct(lt(s, "theme")), r = (k) => k == null ? "0" : k.toLocaleString(), c = (k) => {
      const w = new Date(k), M = String(w.getDate()).padStart(2, "0"), S = String(w.getMonth() + 1).padStart(2, "0"), D = w.getFullYear();
      return `${M}/${S}/${D}`;
    }, d = (k) => k.replace(/_/g, " ").replace(/\b\w/g, (w) => w.toUpperCase()), u = (k, w) => !w || w === 0 ? "0%" : `${Math.round(k / w * 100)}%`, f = (k, w) => {
      const M = k || 0, S = w || 0, D = r(M), A = u(M, S);
      return `${D} (${A})`;
    }, p = (k) => k ? k.reduce((w, M) => w + M.failed_count, 0) : 0, v = C(() => {
      const k = {
        "Checkin Init": "#93C5FD",
        "Booking retrive": "#C7D2FE",
        "Booking retrive success": "#A5B4FC",
        "Number of Passengers": "#8B8CF6",
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
        const D = M.step_name.replace(/_/g, " ").split(" ").map((B) => B.charAt(0).toUpperCase() + B.slice(1)).join(" "), A = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        k[D] = A[D] || "#DC2626";
      }), k;
    }), h = at(!1), m = C(() => {
      const k = s.checkinData?.checkin_by_day || [], w = s.failedData?.failed_by_step_by_day || [];
      return k.map((S) => {
        const D = w.find((A) => A.date === S.date);
        return {
          ...S,
          failed_steps: D?.steps || []
        };
      }).sort((S, D) => new Date(S.date).getTime() - new Date(D.date).getTime());
    }), _ = C(() => h.value ? m.value : m.value.slice(0, ps)), g = C(() => m.value.length > ps), b = C(() => {
      const k = [], w = [], M = /* @__PURE__ */ new Set(), S = (rt) => {
        M.has(rt) || (k.push({ name: rt }), M.add(rt));
      };
      if (!s.checkinData?.total_checkin_initiated)
        return { nodes: k, links: w };
      S("Checkin Init"), S("Booking retrive"), S("Booking retrive success"), S("Number of Passengers"), S("Completed"), S("Closed with BP");
      const D = s.checkinData.total_checkin_initiated || 0, A = s.checkinData.total_checkin_init || 0, B = s.checkinData.total_checkin_init_abandoned || 0, F = s.checkinData.total_checkin_pre_init_abandoned_error, P = s.checkinData.total_checkin_pre_init_abandoned_voluntary, R = F != null || P != null, N = R ? Math.max(Number(F) || 0, 0) : 0, Y = R ? Math.max(Number(P) || 0, 0) : 0, L = s.checkinData.total_checkin_init_abandoned_error, O = s.checkinData.total_checkin_init_abandoned_voluntary, j = L != null || O != null, V = j ? Math.max(Number(L) || 0, 0) : 0, z = j ? Math.max(Number(O) || 0, 0) : 0, H = j ? Math.max(B - V - z, 0) : B, et = A - B, G = s.checkinData.total_checkin_started || 0, U = s.checkinData.total_checkin_completed || 0, ot = s.checkinData.total_checkin_closed || 0, wt = s.failedData?.unrecovered_by_step || [], gt = wt.reduce((rt, ue) => rt + ue.count, 0);
      if (A > 0) {
        const rt = Math.round(A / D * 100);
        w.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: A,
          label: `${A.toLocaleString()} (${rt}%)`
        });
      }
      const Pt = D - A;
      if (R) {
        if (Y > 0) {
          const rt = Math.round(Y / D * 100);
          S("Abandoned (Init)"), w.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: Y,
            label: `${Y.toLocaleString()} (${rt}%)`
          });
        }
        if (N > 0) {
          const rt = Math.round(N / D * 100);
          S("Booking not retreived"), w.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: N,
            label: `${N.toLocaleString()} (${rt}%)`
          });
        }
      } else if (Pt > 0) {
        const rt = Math.round(Pt / D * 100);
        S("Abandoned (Init)"), w.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: Pt,
          label: `${Pt.toLocaleString()} (${rt}%)`
        });
      }
      if (j) {
        if (V > 0) {
          const rt = Math.round(V / D * 100);
          S("Error"), w.push({
            source: "Booking retrive",
            target: "Error",
            value: V,
            label: `${V.toLocaleString()} (${rt}%)`
          });
        }
        if (z > 0) {
          const rt = Math.round(z / D * 100);
          S("Abandoned (Started)"), w.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: z,
            label: `${z.toLocaleString()} (${rt}%)`
          });
        }
        if (H > 0) {
          const rt = Math.round(H / D * 100);
          S("Abandoned (Started)"), w.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: H,
            label: `${H.toLocaleString()} (${rt}%)`
          });
        }
      } else if (B > 0) {
        const rt = Math.round(B / D * 100);
        S("Abandoned (Started)"), w.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: B,
          label: `${B.toLocaleString()} (${rt}%)`
        });
      }
      if (et > 0) {
        const rt = Math.round(et / D * 100);
        w.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: et,
          label: `${et.toLocaleString()} (${rt}%)`
        });
      }
      if (G > 0) {
        const rt = Math.round(G / D * 100);
        w.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: G,
          label: `${G.toLocaleString()} (${rt}%)`
        });
      }
      if (U > 0) {
        const rt = Math.round(U / G * 100);
        w.push({
          source: "Number of Passengers",
          target: "Completed",
          value: U,
          label: `${U.toLocaleString()} (${rt}%)`
        });
      }
      if (wt.length > 0 && gt > 0) {
        S("Unrecovered");
        const rt = Math.round(gt / G * 100);
        w.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: gt,
          label: `${gt.toLocaleString()} (${rt}%)`
        }), wt.forEach((ue) => {
          const qe = ue.step_name.replace(/_/g, " ").split(" ").map((Ue) => Ue.charAt(0).toUpperCase() + Ue.slice(1)).join(" "), ya = Math.round(ue.count / G * 100);
          S(qe), w.push({
            source: "Unrecovered",
            target: qe,
            value: ue.count,
            label: `${ue.count.toLocaleString()} (${ya}%)`
          });
        });
      }
      const zt = G - (U + gt);
      if (zt > 0) {
        const rt = Math.round(zt / G * 100);
        S("Abandoned (Flow)"), w.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: zt,
          label: `${zt.toLocaleString()} (${rt}%)`
        });
      }
      const qt = U - ot;
      if (qt > 0) {
        const rt = Math.round(qt / G * 100);
        S("BP Error"), w.push({
          source: "Completed",
          target: "BP Error",
          value: qt,
          label: `${qt.toLocaleString()} (${rt}%)`
        });
      }
      if (ot > 0) {
        const rt = Math.round(ot / G * 100);
        w.push({
          source: "Completed",
          target: "Closed with BP",
          value: ot,
          label: `${ot.toLocaleString()} (${rt}%)`
        });
      }
      return { nodes: k, links: w };
    });
    return t({ isDark: i }), (k, w) => (y(), x("article", v0, [
      w[6] || (w[6] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Check-in Metrics"),
          l("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      e.loading ? (y(), x("div", b0, [...w[1] || (w[1] = [
        st('<div class="loading-container" data-v-eefc834b><div class="chart-bars-loader" data-v-eefc834b><div class="bar bar-1" data-v-eefc834b></div><div class="bar bar-2" data-v-eefc834b></div><div class="bar bar-3" data-v-eefc834b></div><div class="bar bar-4" data-v-eefc834b></div><div class="bar bar-5" data-v-eefc834b></div></div><p class="loading-text" data-v-eefc834b>Loading check-in data...</p></div>', 1)
      ])])) : (y(), x("div", m0, [
        b.value.nodes.length > 0 ? (y(), x("div", y0, [
          Q(_e, {
            data: b.value,
            height: "500px",
            "node-colors": v.value,
            "use-gradient": !1,
            "node-gap": 30
          }, null, 8, ["data", "node-colors"])
        ])) : E("", !0),
        m.value && m.value.length > 0 ? (y(), x("div", _0, [
          l("div", x0, [
            l("table", k0, [
              w[2] || (w[2] = l("thead", null, [
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
              l("tbody", w0, [
                (y(!0), x(K, null, J(_.value, (M) => (y(), x("tr", {
                  key: M.date,
                  class: "table-row"
                }, [
                  l("td", $0, $(c(M.date)), 1),
                  l("td", M0, $(r(M.checkin_initiated_count)), 1),
                  l("td", C0, $(f(M.checkin_init_count, M.checkin_initiated_count)), 1),
                  l("td", S0, $(r(M.checkin_started_count)), 1),
                  l("td", D0, $(f(M.checkin_completed_count, M.checkin_started_count)), 1),
                  l("td", A0, $(f(M.checkin_closed_count, M.checkin_started_count)), 1),
                  l("td", T0, $(f(p(M.failed_steps), M.checkin_started_count)), 1),
                  l("td", B0, [
                    M.failed_steps && M.failed_steps.length > 0 ? (y(), x("div", L0, [
                      (y(!0), x(K, null, J(M.failed_steps, (S) => (y(), x("div", {
                        key: S.step_name,
                        class: "reason-item"
                      }, [
                        l("span", F0, $(d(S.step_name)) + ":", 1),
                        l("span", P0, $(S.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", I0, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          g.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: w[0] || (w[0] = (M) => h.value = !h.value)
          }, [
            xt($(h.value ? "View less" : `View more (${m.value.length - ps} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: q(["view-more-icon", { "view-more-icon-rotated": h.value }]),
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
          ])) : E("", !0),
          e.enableExport ? (y(), dt(T(kt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("div", E0, [
          l("div", R0, [
            l("div", O0, [
              Q(T(Vt), { class: "empty-icon" })
            ]),
            w[4] || (w[4] = l("p", { class: "empty-title" }, "No check-in data available", -1)),
            w[5] || (w[5] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see check-in metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), z0 = /* @__PURE__ */ nt(V0, [["__scopeId", "data-v-eefc834b"]]), N0 = { class: "checkin-segments-card" }, W0 = {
  key: 0,
  class: "loading-state"
}, H0 = {
  key: 1,
  class: "card-body"
}, j0 = {
  key: 0,
  class: "table-section"
}, Y0 = { class: "table-wrapper" }, q0 = { class: "data-table" }, U0 = { class: "table-body" }, K0 = { class: "table-cell font-medium text-center" }, X0 = { class: "airport-badge" }, G0 = { class: "table-cell text-center" }, Z0 = {
  key: 0,
  class: "airport-badge connection"
}, Q0 = {
  key: 1,
  class: "empty-connection"
}, J0 = { class: "table-cell text-center" }, tv = { class: "airport-badge" }, ev = { class: "table-cell text-center" }, av = {
  key: 0,
  class: "trip-badge roundtrip"
}, sv = {
  key: 1,
  class: "trip-badge oneway"
}, nv = { class: "table-cell text-center" }, ov = { class: "table-cell text-center" }, iv = { class: "percentage-value" }, rv = { class: "table-cell text-center" }, lv = { class: "percentage-value" }, cv = { class: "table-cell text-center" }, dv = { class: "percentage-value success" }, uv = {
  key: 1,
  class: "empty-state"
}, vs = 3, hv = /* @__PURE__ */ tt({
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
    }, { isDark: i } = ct(lt(s, "theme")), r = at(!1), c = C(() => r.value ? s.data : s.data.slice(0, vs)), d = C(() => s.data.length > vs), u = (v, h) => !h || h === 0 || !v ? "0%" : `${Math.round(v / h * 100)}%`, f = (v) => !v || v === "None" ? "-" : String(v).trim().replace(/_[0-9]+$/i, ""), p = (v) => {
      const h = f(v?.departure_airport), m = f(v?.arrival_airport);
      return h === "-" || m === "-" ? !1 : h === m;
    };
    return t({ isDark: i }), (v, h) => (y(), x("article", N0, [
      h[7] || (h[7] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Checkin Segments"),
          l("p", { class: "card-subtitle" }, "Breakdown by flight segment with connection when applicable")
        ])
      ], -1)),
      s.loading ? (y(), x("div", W0, [...h[1] || (h[1] = [
        st('<div class="loading-container" data-v-a1ebd82a><div class="chart-flow-loader" data-v-a1ebd82a><div class="flow-line flow-1" data-v-a1ebd82a></div><div class="flow-line flow-2" data-v-a1ebd82a></div><div class="flow-line flow-3" data-v-a1ebd82a></div><div class="flow-line flow-4" data-v-a1ebd82a></div><div class="flow-line flow-5" data-v-a1ebd82a></div></div><p class="loading-text" data-v-a1ebd82a>Loading segment data...</p></div>', 1)
      ])])) : (y(), x("div", H0, [
        s.data.length > 0 ? (y(), x("section", j0, [
          l("div", Y0, [
            l("table", q0, [
              h[4] || (h[4] = l("thead", null, [
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
              l("tbody", U0, [
                (y(!0), x(K, null, J(c.value, (m, _) => (y(), x("tr", {
                  key: _,
                  class: "table-row"
                }, [
                  l("td", K0, [
                    l("span", X0, $(f(m.departure_airport)), 1)
                  ]),
                  l("td", G0, [
                    f(m.conexion_airport) !== "-" ? (y(), x("span", Z0, $(f(m.conexion_airport)), 1)) : (y(), x("span", Q0, "-"))
                  ]),
                  l("td", J0, [
                    l("span", tv, $(f(m.arrival_airport)), 1)
                  ]),
                  l("td", ev, [
                    p(m) ? (y(), x("span", av, [...h[2] || (h[2] = [
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
                    ])])) : (y(), x("span", sv, [...h[3] || (h[3] = [
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
                  l("td", nv, $(T(X)(m.segment_init_count)), 1),
                  l("td", ov, [
                    l("span", iv, $(u(m.segment_started_count, m.segment_init_count)), 1)
                  ]),
                  l("td", rv, [
                    l("span", lv, $(u(m.segment_completed_count, m.segment_init_count)), 1)
                  ]),
                  l("td", cv, [
                    l("span", dv, $(u(m.segment_closed_count, m.segment_init_count)), 1)
                  ])
                ]))), 128))
              ])
            ])
          ]),
          d.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: h[0] || (h[0] = (m) => r.value = !r.value)
          }, [
            xt($(r.value ? "View less" : `View more (${s.data.length - vs} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: q(["view-more-icon", { "view-more-icon-rotated": r.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...h[5] || (h[5] = [
              l("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : E("", !0),
          e.enableExport ? (y(), dt(T(kt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", uv, [...h[6] || (h[6] = [
          st('<div class="empty-state-content" data-v-a1ebd82a><div class="empty-icon-wrapper" data-v-a1ebd82a><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-a1ebd82a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-a1ebd82a></path></svg></div><p class="empty-title" data-v-a1ebd82a>No segment data available</p><p class="empty-description" data-v-a1ebd82a>No flight segment data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), fv = /* @__PURE__ */ nt(hv, [["__scopeId", "data-v-a1ebd82a"]]), gv = { class: "disruption-metrics-card" }, pv = { class: "card-header" }, vv = { class: "header-content" }, bv = {
  key: 0,
  class: "payment-success-badge"
}, mv = {
  key: 0,
  class: "currency-breakdown-list"
}, yv = {
  key: 1,
  class: "badge-value"
}, _v = {
  key: 0,
  class: "loading-state"
}, xv = {
  key: 1,
  class: "card-body"
}, kv = { class: "chart-section" }, wv = { class: "chart-wrapper" }, $v = {
  key: 1,
  class: "empty-chart"
}, Mv = {
  key: 0,
  class: "table-section"
}, Cv = { class: "table-wrapper" }, Sv = { class: "data-table" }, Dv = { class: "table-body" }, Av = { class: "table-cell font-medium text-center" }, Tv = { class: "table-cell text-center" }, Bv = { class: "table-cell text-center" }, Lv = { class: "percentage-text" }, Fv = { class: "table-cell text-center" }, Pv = { class: "abandoned-value" }, Iv = { class: "table-cell" }, Ev = { class: "badges-container badges-wrap" }, Rv = { class: "badge badge-vol" }, Ov = { class: "badge badge-confirm" }, Vv = { class: "badge badge-not-confirm" }, zv = { class: "badge badge-reject" }, Nv = { class: "badge badge-not-paid" }, Wv = { class: "badge badge-success" }, Hv = { class: "table-cell" }, jv = { class: "badges-container badges-wrap" }, Yv = { class: "badge badge-inv" }, qv = { class: "badge badge-human" }, Uv = { class: "badge badge-accept" }, Kv = {
  key: 1,
  class: "empty-state"
}, bs = 3, Xv = /* @__PURE__ */ tt({
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
    ) : []), r = C(() => o.value ? i.value : i.value.slice(0, bs)), c = C(() => i.value.length > bs), d = C(() => a.data?.total_payment_success || []), u = (_, g) => !g || g === 0 ? "0%" : `${Math.round(_ / g * 100)}%`, f = (_) => bt(_), p = (_) => (_ ?? []).reduce((g, b) => g + (b.count ?? 0), 0), v = (_) => typeof _.sell_success_count == "number" ? _.sell_success_count : p(_.payment_success_total), h = C(() => {
      const _ = a.data, g = _.total_disruption_conversations || 0, b = _.total_disruption_initiated || 0, k = _.total_voluntary || 0, w = _.total_involuntary || 0, M = _.total_accepted || 0, S = _.total_confirmed || 0, D = typeof _.total_sell_success == "number" ? _.total_sell_success : p(_.total_payment_success), A = _.total_sell_failed || 0, B = Math.max(0, g - b), F = Math.max(0, b - k - w), P = Math.max(0, w - M), R = Math.max(0, k - S), N = A, Y = Math.max(0, S - D - N), L = (V, z) => {
        const H = z > 0 ? Math.round(V / z * 100) : 0;
        return `${V.toLocaleString()} (${H}%)`;
      }, O = [
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
        label: L(b, g)
      }), B > 0 && j.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: B,
        label: L(B, g)
      }), k > 0 && j.push({
        source: "Started",
        target: "Voluntary",
        value: k,
        label: L(k, g)
      }), w > 0 && j.push({
        source: "Started",
        target: "Involuntary",
        value: w,
        label: L(w, g)
      }), F > 0 && j.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: F,
        label: L(F, g)
      }), M > 0 && j.push({
        source: "Involuntary",
        target: "Accepted",
        value: M,
        label: L(M, g)
      }), P > 0 && j.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: P,
        label: L(P, g)
      }), S > 0 && j.push({
        source: "Voluntary",
        target: "Confirmed",
        value: S,
        label: L(S, g)
      }), R > 0 && j.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: R,
        label: L(R, g)
      }), D > 0 && j.push({
        source: "Confirmed",
        target: "Paid",
        value: D,
        label: L(D, g)
      }), N > 0 && j.push({
        source: "Confirmed",
        target: "Rejected",
        value: N,
        label: L(N, g)
      }), Y > 0 && j.push({
        source: "Confirmed",
        target: "Not Paid",
        value: Y,
        label: L(Y, g)
      }), { nodes: O, links: j };
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
    return (_, g) => (y(), x("article", gv, [
      l("header", pv, [
        l("div", vv, [
          g[2] || (g[2] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "Disruption Manager Metrics"),
            l("p", { class: "card-subtitle" }, "Disruption workflow performance and completion tracking")
          ], -1)),
          a.loading ? E("", !0) : (y(), x("div", bv, [
            g[1] || (g[1] = l("p", { class: "badge-label" }, "Payment Success Value", -1)),
            d.value.length > 0 ? (y(), x("div", mv, [
              (y(!0), x(K, null, J(d.value, (b) => (y(), x("p", {
                key: b.currency,
                class: "currency-breakdown-item"
              }, $(b.currency) + " " + $(f(b.total_value)), 1))), 128))
            ])) : (y(), x("p", yv, $(f(0)), 1))
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", _v, [...g[3] || (g[3] = [
        st('<div class="loading-container" data-v-47c8f691><div class="chart-bars-loader" data-v-47c8f691><div class="bar bar-1" data-v-47c8f691></div><div class="bar bar-2" data-v-47c8f691></div><div class="bar bar-3" data-v-47c8f691></div><div class="bar bar-4" data-v-47c8f691></div><div class="bar bar-5" data-v-47c8f691></div></div><p class="loading-text" data-v-47c8f691>Loading disruption data...</p></div>', 1)
      ])])) : (y(), x("div", xv, [
        l("section", kv, [
          l("div", wv, [
            h.value.nodes.length > 0 && h.value.links.length > 0 ? (y(), dt(_e, {
              key: 0,
              data: h.value,
              "node-colors": m,
              height: "500px"
            }, null, 8, ["data"])) : (y(), x("div", $v, [...g[4] || (g[4] = [
              l("p", { class: "empty-chart-text" }, "No disruption data available for visualization", -1)
            ])]))
          ])
        ]),
        i.value && i.value.length > 0 ? (y(), x("section", Mv, [
          g[7] || (g[7] = st('<div class="section-header" data-v-47c8f691><h4 class="section-title" data-v-47c8f691>Daily Overview</h4></div><div class="legend-container" data-v-47c8f691><p class="legend-title" data-v-47c8f691>Legend</p><div class="legend-items" data-v-47c8f691><div class="legend-group" data-v-47c8f691><span class="legend-label" data-v-47c8f691>Voluntary:</span><span class="badge badge-vol" data-v-47c8f691>VOL</span></div><div class="legend-group" data-v-47c8f691><span class="legend-label" data-v-47c8f691>Involuntary:</span><span class="badge badge-inv" data-v-47c8f691>INV</span></div><div class="legend-note" data-v-47c8f691><span data-v-47c8f691>Vol=Voluntary</span><span data-v-47c8f691>•</span><span data-v-47c8f691>Inv=Involuntary</span></div></div></div>', 2)),
          l("div", Cv, [
            l("table", Sv, [
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
              l("tbody", Dv, [
                (y(!0), x(K, null, J(r.value, (b) => (y(), x("tr", {
                  key: b.date,
                  class: "table-row"
                }, [
                  l("td", Av, $(T(Dt)(b.date).format("DD/MM")), 1),
                  l("td", Tv, $(T(X)(b.disruption_conversations)), 1),
                  l("td", Bv, [
                    xt($(T(X)(b.disruption_initiated_count)) + " ", 1),
                    l("span", Lv, " (" + $(u(b.disruption_initiated_count, b.disruption_conversations)) + ") ", 1)
                  ]),
                  l("td", Fv, [
                    l("span", Pv, $(T(X)(b.disruption_initiated_count - b.voluntary_count - b.involuntary_count)) + " (" + $(u(b.disruption_initiated_count - b.voluntary_count - b.involuntary_count, b.disruption_conversations)) + ") ", 1)
                  ]),
                  l("td", Iv, [
                    l("div", Ev, [
                      l("span", Rv, " VOL " + $(T(X)(b.voluntary_count)) + " (" + $(u(b.voluntary_count, b.disruption_conversations)) + ") ", 1),
                      l("span", Ov, " Confirm " + $(T(X)(b.confirmed_count)) + " (" + $(u(b.confirmed_count, b.disruption_conversations)) + ") ", 1),
                      l("span", Vv, " Not Confirm " + $(T(X)(b.voluntary_count - b.confirmed_count)) + " (" + $(u(b.voluntary_count - b.confirmed_count, b.disruption_conversations)) + ") ", 1),
                      l("span", zv, " Reject " + $(T(X)(b.sell_failed_count)) + " (" + $(u(b.sell_failed_count, b.disruption_conversations)) + ") ", 1),
                      l("span", Nv, " Not Paid " + $(T(X)(Math.max(0, b.confirmed_count - v(b) - b.sell_failed_count))) + " (" + $(u(Math.max(0, b.confirmed_count - v(b) - b.sell_failed_count), b.disruption_conversations)) + ") ", 1),
                      l("span", Wv, " Finish " + $(T(X)(v(b))) + " (" + $(u(v(b), b.disruption_conversations)) + ") ", 1),
                      (y(!0), x(K, null, J(b.payment_success_total || [], (k) => (y(), x("span", {
                        key: `${b.date}-${k.currency}`,
                        class: "badge badge-currency"
                      }, $(k.currency) + " " + $(f(k.total_value)), 1))), 128))
                    ])
                  ]),
                  l("td", Hv, [
                    l("div", jv, [
                      l("span", Yv, " INV " + $(T(X)(b.involuntary_count)) + " (" + $(u(b.involuntary_count, b.disruption_conversations)) + ") ", 1),
                      l("span", qv, " Human " + $(T(X)(b.involuntary_count - b.accepted_count)) + " (" + $(u(b.involuntary_count - b.accepted_count, b.disruption_conversations)) + ") ", 1),
                      l("span", Uv, " Accept " + $(T(X)(b.accepted_count)) + " (" + $(u(b.accepted_count, b.disruption_conversations)) + ") ", 1)
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
          ])) : E("", !0),
          e.enableExport ? (y(), dt(T(kt), {
            key: 1,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", Kv, [...g[8] || (g[8] = [
          st('<div class="empty-state-content" data-v-47c8f691><div class="empty-icon-wrapper" data-v-47c8f691><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-47c8f691><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-47c8f691></path></svg></div><p class="empty-title" data-v-47c8f691>No disruption data available</p><p class="empty-description" data-v-47c8f691>No disruption data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Gv = /* @__PURE__ */ nt(Xv, [["__scopeId", "data-v-47c8f691"]]), Zv = { class: "faq-metrics-card" }, Qv = {
  key: 0,
  class: "card-body"
}, Jv = {
  key: 0,
  class: "chart-section"
}, tb = {
  key: 1,
  class: "kpi-grid"
}, eb = { class: "kpi-label-row" }, ab = ["title"], sb = { class: "kpi-value" }, nb = { class: "kpi-secondary" }, ob = {
  key: 2,
  class: "empty-state"
}, ib = {
  key: 1,
  class: "loading-state"
}, rb = /* @__PURE__ */ tt({
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
    const s = e, n = a, o = (h) => {
      n("export", h);
    }, { isDark: i, colors: r } = ct(lt(s, "theme")), c = {
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
    }), f = C(() => {
      const h = [
        { name: "airline_information", label: "Airline Info", total: u.value.total_airline_information_retrieved },
        { name: "booking_info", label: "Booking Info", total: u.value.total_booking_info_retrieved },
        { name: "flight_status", label: "Flight Status", total: u.value.total_flight_status_retrieved }
      ], m = h.reduce((_, g) => _ + g.total, 0);
      return m === 0 ? [] : h.map((_) => ({
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
    })), v = (h) => {
      if (!h) {
        d.value = { labels: [], datasets: [] };
        return;
      }
      const m = h.faq_by_day || [];
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
    return Et(
      () => s.data,
      (h) => {
        v(h ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: i }), (h, m) => (y(), x("article", Zv, [
      m[2] || (m[2] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "FAQ Metrics"),
          l("p", { class: "card-subtitle" }, "FAQ volume by category")
        ])
      ], -1)),
      s.loading ? (y(), x("div", ib, [...m[1] || (m[1] = [
        st('<div class="loading-container" data-v-bf0b01c1><div class="chart-bars-loader" data-v-bf0b01c1><div class="bar bar-1" data-v-bf0b01c1></div><div class="bar bar-2" data-v-bf0b01c1></div><div class="bar bar-3" data-v-bf0b01c1></div><div class="bar bar-4" data-v-bf0b01c1></div><div class="bar bar-5" data-v-bf0b01c1></div></div><p class="loading-text" data-v-bf0b01c1>Loading FAQ metrics...</p></div>', 1)
      ])])) : (y(), x("div", Qv, [
        d.value.labels && d.value.labels.length ? (y(), x("section", Jv, [
          Q(ye, {
            data: d.value,
            options: p.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), dt(T(kt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : E("", !0),
        f.value.length ? (y(), x("div", tb, [
          (y(!0), x(K, null, J(f.value, (_) => (y(), x("div", {
            class: "kpi-card",
            key: _.name
          }, [
            l("div", eb, [
              l("span", {
                class: "kpi-color-dot",
                style: ft({ backgroundColor: _.color }),
                "aria-hidden": "true"
              }, null, 4),
              l("span", {
                class: "kpi-label",
                title: _.label
              }, $(_.label), 9, ab)
            ]),
            l("span", sb, $(T(X)(_.total)), 1),
            l("span", nb, $(_.percentage) + "%", 1)
          ]))), 128))
        ])) : (y(), x("section", ob, [...m[0] || (m[0] = [
          st('<div class="empty-state-content" data-v-bf0b01c1><div class="empty-icon-wrapper" data-v-bf0b01c1><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-bf0b01c1><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-bf0b01c1></path></svg></div><p class="empty-title" data-v-bf0b01c1>No FAQ data available</p><p class="empty-description" data-v-bf0b01c1>No FAQ consultation data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), lb = /* @__PURE__ */ nt(rb, [["__scopeId", "data-v-bf0b01c1"]]), cb = { class: "messages-per-agent-card" }, db = {
  key: 0,
  class: "card-body"
}, ub = {
  key: 0,
  class: "chart-section"
}, hb = {
  key: 1,
  class: "kpi-grid"
}, fb = { class: "kpi-label-row" }, gb = ["title"], pb = { class: "kpi-value" }, vb = { class: "kpi-secondary" }, bb = {
  key: 2,
  class: "empty-state"
}, mb = { class: "empty-state-content" }, yb = { class: "empty-icon-wrapper" }, _b = {
  key: 1,
  class: "loading-state"
}, xb = /* @__PURE__ */ tt({
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
    }, { isDark: r, colors: c } = ct(lt(n, "theme")), d = C(() => {
      const p = n.data?.agents_by_day || {}, v = Object.keys(p).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const h = /* @__PURE__ */ new Set();
      for (const g of Object.values(p))
        for (const b of Object.keys(g))
          h.add(b);
      const _ = Array.from(h).map((g) => {
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
      const h = Object.values(v).reduce((m, _) => m + _, 0);
      return h === 0 ? [] : Object.entries(v).sort(([, m], [, _]) => _ - m).map(([m, _]) => ({
        name: m,
        label: m.charAt(0).toUpperCase() + m.slice(1).replace(/_/g, " "),
        total: _,
        percentage: (_ / h * 100).toFixed(1),
        color: s[m] || "#94a3b8"
      }));
    }), f = C(() => n.options ? n.options : {
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
    return t({ isDark: r }), (p, v) => (y(), x("article", cb, [
      v[3] || (v[3] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Interactions by Agent"),
          l("p", { class: "card-subtitle" }, "Responses sent by AI agents")
        ])
      ], -1)),
      e.loading ? (y(), x("div", _b, [...v[2] || (v[2] = [
        st('<div class="loading-container" data-v-ed04880d><div class="chart-lines-loader" data-v-ed04880d><div class="line line-1" data-v-ed04880d></div><div class="line line-2" data-v-ed04880d></div><div class="line line-3" data-v-ed04880d></div><div class="line line-4" data-v-ed04880d></div><div class="line line-5" data-v-ed04880d></div></div><p class="loading-text" data-v-ed04880d>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", db, [
        d.value.labels && d.value.labels.length ? (y(), x("section", ub, [
          Q(ye, {
            data: d.value,
            options: f.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), dt(T(kt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : E("", !0),
        u.value.length ? (y(), x("div", hb, [
          (y(!0), x(K, null, J(u.value, (h) => (y(), x("div", {
            class: "kpi-card",
            key: h.name
          }, [
            l("div", fb, [
              l("span", {
                class: "kpi-color-dot",
                style: ft({ backgroundColor: h.color }),
                "aria-hidden": "true"
              }, null, 4),
              l("span", {
                class: "kpi-label",
                title: h.label
              }, $(h.label), 9, gb)
            ]),
            l("span", pb, $(h.percentage) + "%", 1),
            l("span", vb, $(T(X)(h.total)) + " msgs", 1)
          ]))), 128))
        ])) : (y(), x("section", bb, [
          l("div", mb, [
            l("div", yb, [
              Q(T(Vt), { class: "empty-icon" })
            ]),
            v[0] || (v[0] = l("p", { class: "empty-title" }, "No agent interactions data", -1)),
            v[1] || (v[1] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), kb = /* @__PURE__ */ nt(xb, [["__scopeId", "data-v-ed04880d"]]), wb = { class: "record-locator-card" }, $b = {
  key: 0,
  class: "loading-state"
}, Mb = {
  key: 1,
  class: "card-body"
}, Cb = {
  key: 0,
  class: "chart-section"
}, Sb = { class: "chart-wrapper" }, Db = {
  key: 1,
  class: "table-section"
}, Ab = { class: "table-wrapper" }, Tb = { class: "data-table" }, Bb = { class: "table-header-row" }, Lb = {
  key: 0,
  class: "table-header"
}, Fb = {
  key: 1,
  class: "table-header"
}, Pb = { class: "table-body" }, Ib = { class: "table-cell font-medium" }, Eb = { class: "table-cell text-center" }, Rb = { class: "table-cell text-center" }, Ob = { class: "table-cell text-center" }, Vb = { class: "table-cell text-center" }, zb = { class: "table-cell text-center success-value" }, Nb = { class: "table-cell text-center failed-value" }, Wb = { class: "table-cell text-center warning-value" }, Hb = {
  key: 0,
  class: "table-cell text-center"
}, jb = {
  key: 1,
  class: "table-cell text-center failed-value"
}, Yb = {
  key: 2,
  class: "empty-state"
}, ms = 3, qb = /* @__PURE__ */ tt({
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
    }, { isDark: i } = ct(lt(s, "theme")), r = at(!1), c = C(() => s.data?.record_locator_by_day ? [...s.data.record_locator_by_day].sort(
      (_, g) => new Date(_.date).getTime() - new Date(g.date).getTime()
    ) : []), d = C(() => r.value ? c.value : c.value.slice(0, ms)), u = C(() => c.value.length > ms), f = C(() => s.data), p = C(() => ({
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
    })), v = (_, g) => !g || g === 0 ? "0%" : `${Math.round(_ / g * 100)}%`, h = (_, g) => {
      const b = X(_), k = v(_, g);
      return `${b} (${k})`;
    }, m = C(() => {
      const _ = [], g = [], b = /* @__PURE__ */ new Set(), k = (U) => {
        b.has(U) || (_.push({ name: U }), b.add(U));
      };
      if (!f.value.total_checkin_initiated)
        return { nodes: _, links: g };
      k("Checkin Init"), k("Booking retrive"), k("Checkin Started"), k("Checkin Completed"), k("Checkin Closed");
      const w = f.value.total_checkin_initiated, M = f.value.total_record_locator_init, S = f.value.total_record_locator_started, D = f.value.total_record_locator_completed, A = f.value.total_record_locator_closed, B = f.value.total_record_locator_failed, F = f.value.total_record_locator_abandoned, P = f.value.total_record_locator_init_abandoned, R = f.value.total_checkin_pre_init_abandoned_error, N = f.value.total_checkin_pre_init_abandoned_voluntary, Y = R != null || N != null, L = Y ? Math.max(Number(R) || 0, 0) : 0, O = Y ? Math.max(Number(N) || 0, 0) : 0, j = f.value.total_record_locator_init_abandoned_error, V = f.value.total_record_locator_init_abandoned_voluntary, z = j != null || V != null, H = z ? Math.max(Number(j) || 0, 0) : 0, et = z ? Math.max(Number(V) || 0, 0) : 0;
      if (M > 0) {
        const U = Math.round(M / w * 100);
        g.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: M,
          label: `${M.toLocaleString()} (${U}%)`
        });
      }
      const G = w - M;
      if (Y) {
        if (O > 0) {
          const U = Math.round(O / w * 100);
          k("Abandoned (Init)"), g.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: O,
            label: `${O.toLocaleString()} (${U}%)`
          });
        }
        if (L > 0) {
          const U = Math.round(L / w * 100);
          k("Booking not retreived"), g.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: L,
            label: `${L.toLocaleString()} (${U}%)`
          });
        }
      } else if (G > 0) {
        const U = Math.round(G / w * 100);
        k("Abandoned (Init)"), g.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: G,
          label: `${G.toLocaleString()} (${U}%)`
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
      if (z) {
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
      } else if (P > 0) {
        const U = Math.round(P / w * 100);
        k("Abandoned (Started)"), g.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: P,
          label: `${P.toLocaleString()} (${U}%)`
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
      if (B > 0) {
        const U = Math.round(B / S * 100);
        k("Checkin Failed"), g.push({
          source: "Checkin Started",
          target: "Checkin Failed",
          value: B,
          label: `${B.toLocaleString()} (${U}%)`
        });
      }
      if (F > 0) {
        const U = Math.round(F / S * 100);
        k("Abandoned (Flow)"), g.push({
          source: "Checkin Started",
          target: "Abandoned (Flow)",
          value: F,
          label: `${F.toLocaleString()} (${U}%)`
        });
      }
      return { nodes: _, links: g };
    });
    return t({ isDark: i }), (_, g) => (y(), x("article", wb, [
      g[12] || (g[12] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Checkin by Record Locator Metrics"),
          l("p", { class: "card-subtitle" }, "Checkin by record locator retrieval and completion analysis")
        ])
      ], -1)),
      s.loading ? (y(), x("div", $b, [...g[1] || (g[1] = [
        st('<div class="loading-container" data-v-e48cea55><div class="chart-flow-loader" data-v-e48cea55><div class="flow-line flow-1" data-v-e48cea55></div><div class="flow-line flow-2" data-v-e48cea55></div><div class="flow-line flow-3" data-v-e48cea55></div><div class="flow-line flow-4" data-v-e48cea55></div><div class="flow-line flow-5" data-v-e48cea55></div></div><p class="loading-text" data-v-e48cea55>Loading record locator data...</p></div>', 1)
      ])])) : (y(), x("div", Mb, [
        m.value.nodes.length > 0 ? (y(), x("section", Cb, [
          l("div", Sb, [
            Q(_e, {
              data: m.value,
              height: "500px",
              "node-colors": p.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : E("", !0),
        c.value && c.value.length > 0 ? (y(), x("section", Db, [
          l("div", Ab, [
            l("table", Tb, [
              l("thead", null, [
                l("tr", Bb, [
                  g[2] || (g[2] = l("th", { class: "table-header" }, "Date", -1)),
                  g[3] || (g[3] = l("th", { class: "table-header" }, "Checkin Init", -1)),
                  g[4] || (g[4] = l("th", { class: "table-header" }, "Booking Retrieve (%)", -1)),
                  g[5] || (g[5] = l("th", { class: "table-header" }, "Checkin Started", -1)),
                  g[6] || (g[6] = l("th", { class: "table-header" }, "Checkin Completed (%)", -1)),
                  g[7] || (g[7] = l("th", { class: "table-header" }, "Checkin Closed (%)", -1)),
                  g[8] || (g[8] = l("th", { class: "table-header" }, "Checkin Failed (%)", -1)),
                  g[9] || (g[9] = l("th", { class: "table-header" }, "Abandoned (%)", -1)),
                  s.isAvianca ? (y(), x("th", Lb, "Create Payment")) : E("", !0),
                  s.isAvianca ? (y(), x("th", Fb, "Failed Payment")) : E("", !0)
                ])
              ]),
              l("tbody", Pb, [
                (y(!0), x(K, null, J(d.value, (b) => (y(), x("tr", {
                  key: b.date,
                  class: "table-row"
                }, [
                  l("td", Ib, $(T(Dt)(b.date).format("DD/MM/YYYY")), 1),
                  l("td", Eb, $(T(X)(b.checkin_initiated)), 1),
                  l("td", Rb, $(h(b.record_locator_init_count, b.checkin_initiated)), 1),
                  l("td", Ob, $(T(X)(b.record_locator_started_count)), 1),
                  l("td", Vb, $(h(b.record_locator_completed_count, b.record_locator_started_count)), 1),
                  l("td", zb, $(h(b.record_locator_closed_count, b.record_locator_started_count)), 1),
                  l("td", Nb, $(h(b.record_locator_failed_count, b.record_locator_started_count)), 1),
                  l("td", Wb, $(h(b.record_locator_abandoned_count, b.record_locator_started_count)), 1),
                  s.isAvianca ? (y(), x("td", Hb, $(T(X)(b.record_locator_create_payment_count)), 1)) : E("", !0),
                  s.isAvianca ? (y(), x("td", jb, $(T(X)(b.record_locator_create_payment_failed_count)), 1)) : E("", !0)
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
          ])) : E("", !0),
          e.enableExport ? (y(), dt(T(kt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", Yb, [...g[11] || (g[11] = [
          st('<div class="empty-state-content" data-v-e48cea55><div class="empty-icon-wrapper" data-v-e48cea55><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e48cea55><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" data-v-e48cea55></path></svg></div><p class="empty-title" data-v-e48cea55>No record locator data available</p><p class="empty-description" data-v-e48cea55>No record locator data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Ub = /* @__PURE__ */ nt(qb, [["__scopeId", "data-v-e48cea55"]]), Kb = { class: "sales-channel-card" }, Xb = {
  key: 0,
  class: "loading-state"
}, Gb = {
  key: 1,
  class: "card-body"
}, Zb = {
  key: 0,
  class: "chart-section"
}, Qb = { class: "chart-wrapper" }, Jb = {
  key: 1,
  class: "empty-state"
}, tm = {
  key: 2,
  class: "comparison-section"
}, em = { class: "comparison-grid" }, am = { class: "comparison-content" }, sm = { class: "comparison-channel" }, nm = { class: "comparison-value" }, om = {
  key: 0,
  class: "comparison-delta"
}, im = {
  key: 0,
  class: "delta-icon",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, rm = {
  key: 1,
  class: "delta-icon",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, lm = { class: "delta-label" }, cm = {
  key: 1,
  class: "comparison-delta"
}, dm = /* @__PURE__ */ tt({
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
    }, { isDark: c } = ct(lt(o, "theme"));
    C(() => o.data?.total_sell_success ?? 0);
    const d = C(() => {
      const p = /* @__PURE__ */ new Set();
      for (const v of o.data?.sales_by_channel_by_day ?? [])
        for (const h of Object.keys(v.channels))
          p.add(h);
      return Array.from(p).sort();
    }), u = (p, v) => s[p.toLowerCase()] ?? n[v % n.length], f = C(() => {
      const p = o.data?.sales_by_channel_by_day ?? [];
      if (p.length === 0) return { labels: [], datasets: [] };
      const v = p.map((m) => Dt(m.date).format("MMM-DD")), h = d.value.map((m, _) => ({
        label: m,
        data: p.map((g) => g.channels[m] ?? 0),
        backgroundColor: u(m, _),
        borderRadius: 4
      }));
      return { labels: v, datasets: h };
    });
    return t({ isDark: c }), (p, v) => (y(), x("article", Kb, [
      v[5] || (v[5] = st('<header class="card-header" data-v-8b96a431><div class="header-content" data-v-8b96a431><div class="title-section" data-v-8b96a431><h3 class="card-title" data-v-8b96a431>Sales by Channel</h3><p class="card-subtitle" data-v-8b96a431>Successful sales breakdown by communication channel</p></div></div></header>', 1)),
      o.loading ? (y(), x("div", Xb, [...v[0] || (v[0] = [
        st('<div class="loading-container" data-v-8b96a431><div class="chart-bars-loader" data-v-8b96a431><div class="bar bar-1" data-v-8b96a431></div><div class="bar bar-2" data-v-8b96a431></div><div class="bar bar-3" data-v-8b96a431></div><div class="bar bar-4" data-v-8b96a431></div><div class="bar bar-5" data-v-8b96a431></div></div><p class="loading-text" data-v-8b96a431>Loading sales data...</p></div>', 1)
      ])])) : (y(), x("div", Gb, [
        f.value.labels.length > 0 ? (y(), x("section", Zb, [
          l("div", Qb, [
            Q(re, {
              data: f.value,
              stacked: !0
            }, null, 8, ["data"])
          ]),
          e.enableExport ? (y(), dt(T(kt), {
            key: 0,
            onExport: r,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", Jb, [...v[1] || (v[1] = [
          st('<div class="empty-state-content" data-v-8b96a431><div class="empty-icon-wrapper" data-v-8b96a431><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-8b96a431><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-8b96a431></path></svg></div><p class="empty-title" data-v-8b96a431>No sales data available</p><p class="empty-description" data-v-8b96a431>No sales by channel data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])])),
        e.channelComparison.length > 0 ? (y(), x("section", tm, [
          l("div", em, [
            (y(!0), x(K, null, J(e.channelComparison, (h) => (y(), x("div", {
              key: h.channel,
              class: "comparison-card"
            }, [
              l("div", {
                class: "comparison-color-bar",
                style: ft({ backgroundColor: u(h.channel, e.channelComparison.indexOf(h)) })
              }, null, 4),
              l("div", am, [
                l("span", sm, $(h.channel), 1),
                l("span", nm, $(T(X)(h.current)), 1),
                h.delta !== null ? (y(), x("div", om, [
                  l("span", {
                    class: q(["delta-badge", h.delta > 0 ? "delta-up" : h.delta < 0 ? "delta-down" : "delta-neutral"])
                  }, [
                    h.delta > 0 ? (y(), x("svg", im, [...v[2] || (v[2] = [
                      l("path", {
                        "fill-rule": "evenodd",
                        d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
                        "clip-rule": "evenodd"
                      }, null, -1)
                    ])])) : h.delta < 0 ? (y(), x("svg", rm, [...v[3] || (v[3] = [
                      l("path", {
                        "fill-rule": "evenodd",
                        d: "M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z",
                        "clip-rule": "evenodd"
                      }, null, -1)
                    ])])) : E("", !0),
                    xt(" " + $(Math.abs(h.delta).toFixed(1)) + "% ", 1)
                  ], 2),
                  l("span", lm, "vs prev. period (" + $(T(X)(h.previous)) + ")", 1)
                ])) : (y(), x("div", cm, [...v[4] || (v[4] = [
                  l("span", { class: "delta-label" }, "No previous data", -1)
                ])]))
              ])
            ]))), 128))
          ])
        ])) : E("", !0)
      ]))
    ]));
  }
}), um = /* @__PURE__ */ nt(dm, [["__scopeId", "data-v-8b96a431"]]), hm = { class: "seller-metrics-card" }, fm = { class: "card-header" }, gm = { class: "header-content" }, pm = { class: "header-badges" }, vm = {
  key: 0,
  class: "payment-success-badge"
}, bm = {
  key: 0,
  class: "currency-breakdown-list"
}, mm = {
  key: 1,
  class: "badge-value"
}, ym = {
  key: 1,
  class: "payment-warning-badge"
}, _m = { class: "currency-breakdown-list" }, xm = {
  key: 2,
  class: "payment-warning-badge"
}, km = { class: "currency-breakdown-list" }, wm = {
  key: 0,
  class: "loading-state"
}, $m = {
  key: 1,
  class: "card-body"
}, Mm = {
  key: 0,
  class: "chart-section"
}, Cm = { class: "chart-wrapper" }, Sm = {
  key: 1,
  class: "empty-state"
}, Dm = {
  key: 2,
  class: "table-section"
}, Am = { class: "table-wrapper" }, Tm = { class: "data-table" }, Bm = { class: "table-body" }, Lm = { class: "table-cell font-medium" }, Fm = { class: "table-cell text-center" }, Pm = { class: "table-cell text-center" }, Im = { class: "table-cell text-center" }, Em = { class: "table-cell text-center" }, Rm = { class: "table-cell text-center" }, Om = { class: "table-cell text-center warning-value" }, Vm = {
  key: 0,
  class: "currency-cell-list"
}, zm = {
  key: 1,
  class: "empty-cell"
}, Nm = { class: "table-cell text-center" }, Wm = { class: "table-cell text-center warning-value" }, Hm = {
  key: 0,
  class: "currency-cell-list"
}, jm = {
  key: 1,
  class: "empty-cell"
}, Ym = { class: "table-cell text-center" }, qm = { class: "table-cell text-center success-value" }, Um = {
  key: 0,
  class: "currency-cell-list"
}, Km = { key: 1 }, Xm = { class: "table-cell text-left" }, Gm = {
  key: 0,
  class: "failed-reasons"
}, Zm = { class: "reason-name" }, Qm = { class: "reason-count" }, Jm = {
  key: 1,
  class: "empty-cell"
}, ys = 3, t1 = /* @__PURE__ */ tt({
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
    }, { isDark: i } = ct(lt(s, "theme")), r = at(!1), c = C(() => {
      if (!s.sellerData?.seller_by_day) return [];
      const D = [...s.sellerData.seller_by_day];
      return s.failedData?.failed_by_reason_by_day && s.failedData.failed_by_reason_by_day.forEach((A) => {
        const B = D.findIndex((F) => F.date === A.date);
        B !== -1 ? D[B] = { ...D[B], reasons: A.reasons } : D.push({
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
      }), D.sort((A, B) => new Date(A.date).getTime() - new Date(B.date).getTime());
    }), d = C(() => r.value ? c.value : c.value.slice(0, ys)), u = C(() => c.value.length > ys), f = C(() => s.sellerData), p = C(() => s.failedData), v = C(
      () => Array.isArray(s.sellerData.total_value_sell_success) ? s.sellerData.total_value_sell_success : []
    ), h = C(
      () => Array.isArray(s.sellerData.total_value_sell_bank_transfer) ? s.sellerData.total_value_sell_bank_transfer : []
    ), m = C(
      () => Array.isArray(s.sellerData.total_value_sell_cash_option) ? s.sellerData.total_value_sell_cash_option : []
    ), _ = C(() => {
      const {
        total_seller_conversations: D = 0,
        total_sell_started: A = 0,
        total_sell_booking_created: B = 0,
        total_sell_success: F = 0,
        total_sell_bank_transfer: P = 0,
        total_sell_cash_option: R = 0
      } = f.value, { failed_by_reason_by_day: N = [] } = p.value;
      if (D === 0) return { nodes: [], links: [] };
      const Y = [
        { name: "Sell Initiated", value: D },
        { name: "Sell Started", value: A },
        { name: "Booking Created", value: B },
        { name: "Sell Success", value: F }
      ], L = [], O = D - A;
      if (O > 0) {
        const H = Math.round(O / D * 100);
        Y.push({ name: "Abandoned (Init)", value: O }), L.push({
          source: "Sell Initiated",
          target: "Abandoned (Init)",
          value: O,
          label: `${O.toLocaleString()} (${H}%)`
        });
      }
      if (A > 0) {
        const H = Math.round(A / D * 100);
        L.push({
          source: "Sell Initiated",
          target: "Sell Started",
          value: A,
          label: `${A.toLocaleString()} (${H}%)`
        });
      }
      const j = N.reduce((H, et) => (et.reasons && Array.isArray(et.reasons) && et.reasons.forEach((G) => {
        const U = G.reason, ot = G.failed_count;
        H[U] = (H[U] || 0) + ot;
      }), H), {});
      if (B > 0) {
        const H = Math.round(B / D * 100);
        L.push({
          source: "Sell Started",
          target: "Booking Created",
          value: B,
          label: `${B.toLocaleString()} (${H}%)`
        });
      }
      if (P > 0) {
        const H = Math.round(P / D * 100);
        Y.push({ name: "Bank Transfer", value: P }), L.push({
          source: "Booking Created",
          target: "Bank Transfer",
          value: P,
          label: `${P.toLocaleString()} (${H}%)`
        });
      }
      if (R > 0) {
        const H = Math.round(R / D * 100);
        Y.push({ name: "Cash Option", value: R }), L.push({
          source: "Booking Created",
          target: "Cash Option",
          value: R,
          label: `${R.toLocaleString()} (${H}%)`
        });
      }
      if (F > 0) {
        const H = Math.round(F / D * 100);
        L.push({
          source: "Booking Created",
          target: "Sell Success",
          value: F,
          label: `${F.toLocaleString()} (${H}%)`
        });
      }
      const V = B - F - P - R;
      if (V > 0) {
        const H = Math.round(V / D * 100);
        Y.push({ name: "Failed at Completion", value: V }), L.push({
          source: "Booking Created",
          target: "Failed at Completion",
          value: V,
          label: `${V.toLocaleString()} (${H}%)`
        });
      }
      const z = A - B;
      if (z > 0) {
        const H = Math.round(z / D * 100);
        Y.push({ name: "Failed at Booking", value: z }), L.push({
          source: "Sell Started",
          target: "Failed at Booking",
          value: z,
          label: `${z.toLocaleString()} (${H}%)`
        });
      }
      if (Object.keys(j).length > 0) {
        const H = Object.values(j).reduce((G, U) => G + U, 0), et = z - H;
        if (Object.entries(j).filter(([, G]) => G > 0).sort(([, G], [, U]) => U - G).forEach(([G, U]) => {
          const ot = Math.round(U / D * 100);
          Y.push({ name: `Failed: ${G}`, value: U }), L.push({
            source: "Failed at Booking",
            target: `Failed: ${G}`,
            value: U,
            label: `${U.toLocaleString()} (${ot}%)`
          });
        }), et > 0) {
          const G = Math.round(et / D * 100);
          Y.push({ name: "Failed: Without Reason", value: et }), L.push({
            source: "Failed at Booking",
            target: "Failed: Without Reason",
            value: et,
            label: `${et.toLocaleString()} (${G}%)`
          });
        }
      }
      return { nodes: Y, links: L };
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
      const B = X(D), F = k(D, A);
      return `${B} (${F})`;
    }, M = (D) => D == null ? 0 : typeof D == "number" ? D : Array.isArray(D) ? D.reduce((A, B) => A + (B.total_value || 0), 0) : 0, S = (D) => Qt(M(D));
    return t({ isDark: i }), (D, A) => (y(), x("article", hm, [
      l("header", fm, [
        l("div", gm, [
          A[4] || (A[4] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "Seller Metrics"),
            l("p", { class: "card-subtitle" }, "Sales performance and failure analysis")
          ], -1)),
          l("div", pm, [
            s.loading ? E("", !0) : (y(), x("div", vm, [
              A[1] || (A[1] = l("p", { class: "badge-label" }, "Total Sales Value", -1)),
              v.value.length > 0 ? (y(), x("div", bm, [
                (y(!0), x(K, null, J(v.value, (B) => (y(), x("p", {
                  key: B.currency,
                  class: "currency-breakdown-item"
                }, $(B.currency) + " " + $(T(Qt)(B.total_value)), 1))), 128))
              ])) : (y(), x("p", mm, $(S(s.sellerData.total_value_sell_success)), 1))
            ])),
            !s.loading && h.value.length > 0 ? (y(), x("div", ym, [
              A[2] || (A[2] = l("p", { class: "badge-label-warning" }, "Bank Transfer Value", -1)),
              l("div", _m, [
                (y(!0), x(K, null, J(h.value, (B) => (y(), x("p", {
                  key: "bt-" + B.currency,
                  class: "currency-breakdown-item-warning"
                }, $(B.currency) + " " + $(T(Qt)(B.total_value)), 1))), 128))
              ])
            ])) : E("", !0),
            !s.loading && m.value.length > 0 ? (y(), x("div", xm, [
              A[3] || (A[3] = l("p", { class: "badge-label-warning" }, "Cash Option Value", -1)),
              l("div", km, [
                (y(!0), x(K, null, J(m.value, (B) => (y(), x("p", {
                  key: "co-" + B.currency,
                  class: "currency-breakdown-item-warning"
                }, $(B.currency) + " " + $(T(Qt)(B.total_value)), 1))), 128))
              ])
            ])) : E("", !0)
          ])
        ])
      ]),
      s.loading ? (y(), x("div", wm, [...A[5] || (A[5] = [
        st('<div class="loading-container" data-v-301db2b6><div class="chart-flow-loader" data-v-301db2b6><div class="flow-line flow-1" data-v-301db2b6></div><div class="flow-line flow-2" data-v-301db2b6></div><div class="flow-line flow-3" data-v-301db2b6></div><div class="flow-line flow-4" data-v-301db2b6></div><div class="flow-line flow-5" data-v-301db2b6></div></div><p class="loading-text" data-v-301db2b6>Loading sales data...</p></div>', 1)
      ])])) : (y(), x("div", $m, [
        _.value.nodes.length > 0 ? (y(), x("section", Mm, [
          l("div", Cm, [
            Q(_e, {
              data: _.value,
              "node-colors": b.value,
              title: "",
              height: "320px"
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : (y(), x("section", Sm, [...A[6] || (A[6] = [
          st('<div class="empty-state-content" data-v-301db2b6><div class="empty-icon-wrapper" data-v-301db2b6><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-301db2b6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-301db2b6></path></svg></div><p class="empty-title" data-v-301db2b6>No sales data available</p><p class="empty-description" data-v-301db2b6>No sales data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])])),
        c.value && c.value.length > 0 ? (y(), x("section", Dm, [
          l("div", Am, [
            l("table", Tm, [
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
              l("tbody", Bm, [
                (y(!0), x(K, null, J(d.value, (B) => (y(), x("tr", {
                  key: B.date,
                  class: "table-row"
                }, [
                  l("td", Lm, $(T(Dt)(B.date).format("DD/MM/YYYY")), 1),
                  l("td", Fm, $(T(X)(B.seller_conversations || 0)), 1),
                  l("td", Pm, $(w(B.sell_started_count, B.seller_conversations || B.sell_started_count)), 1),
                  l("td", Im, $(w(B.sell_get_quote_count, B.seller_conversations || B.sell_started_count)), 1),
                  l("td", Em, $(w(B.sell_booking_created_count, B.seller_conversations || B.sell_started_count)), 1),
                  l("td", Rm, $(T(X)(B.sell_bank_transfer_count || 0)), 1),
                  l("td", Om, [
                    Array.isArray(B.daily_value_sell_bank_transfer) && B.daily_value_sell_bank_transfer.length > 0 ? (y(), x("div", Vm, [
                      (y(!0), x(K, null, J(B.daily_value_sell_bank_transfer, (F) => (y(), x("span", {
                        key: `${B.date}-bt-${F.currency}`
                      }, $(F.currency) + " " + $(T(Qt)(F.total_value)), 1))), 128))
                    ])) : (y(), x("span", zm, "-"))
                  ]),
                  l("td", Nm, $(T(X)(B.sell_cash_option_count || 0)), 1),
                  l("td", Wm, [
                    Array.isArray(B.daily_value_sell_cash_option) && B.daily_value_sell_cash_option.length > 0 ? (y(), x("div", Hm, [
                      (y(!0), x(K, null, J(B.daily_value_sell_cash_option, (F) => (y(), x("span", {
                        key: `${B.date}-co-${F.currency}`
                      }, $(F.currency) + " " + $(T(Qt)(F.total_value)), 1))), 128))
                    ])) : (y(), x("span", jm, "-"))
                  ]),
                  l("td", Ym, $(w(B.sell_success_count, B.seller_conversations || B.sell_started_count)), 1),
                  l("td", qm, [
                    Array.isArray(B.daily_value_sell_success) && B.daily_value_sell_success.length > 0 ? (y(), x("div", Um, [
                      (y(!0), x(K, null, J(B.daily_value_sell_success, (F) => (y(), x("span", {
                        key: `${B.date}-${F.currency}`
                      }, $(F.currency) + " " + $(T(Qt)(F.total_value)), 1))), 128))
                    ])) : (y(), x("span", Km, $(S(B.daily_value_sell_success)), 1))
                  ]),
                  l("td", Xm, [
                    B.reasons && B.reasons.length > 0 ? (y(), x("div", Gm, [
                      (y(!0), x(K, null, J(B.reasons, (F) => (y(), x("div", {
                        key: F.reason,
                        class: "failed-reason-item"
                      }, [
                        l("span", Zm, $(F.reason) + ":", 1),
                        l("span", Qm, $(F.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", Jm, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          u.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: A[0] || (A[0] = (B) => r.value = !r.value)
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
          ])) : E("", !0),
          e.enableExport ? (y(), dt(T(kt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : E("", !0)
      ]))
    ]));
  }
}), e1 = /* @__PURE__ */ nt(t1, [["__scopeId", "data-v-301db2b6"]]), a1 = { class: "top-agents-card" }, s1 = {
  key: 0,
  class: "card-body"
}, n1 = {
  key: 0,
  class: "chart-section"
}, o1 = {
  key: 1,
  class: "empty-state"
}, i1 = { class: "empty-state-content" }, r1 = { class: "empty-icon-wrapper" }, l1 = {
  key: 1,
  class: "loading-state"
}, c1 = /* @__PURE__ */ tt({
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
    }, n = e, o = a, i = (f) => {
      o("export", f);
    }, { isDark: r, colors: c } = ct(lt(n, "theme")), d = C(() => {
      const p = (n.data?.top_agents || []).filter(
        (_) => _.agent_type?.toLowerCase() !== "triage"
      );
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const v = p.reduce(
        (_, g) => _ + (Number(g.conversations) || 0),
        0
      ), h = p.map((_) => {
        const g = _.agent_type?.toLowerCase();
        return s[g] || "#94a3b8";
      }), m = h.map((_) => `${_}80`);
      return {
        labels: p.map((_) => {
          const g = Number(_.conversations) || 0, b = v ? g / v * 100 : 0;
          return `${_.agent_type} - ${g.toLocaleString()} (${b.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: p.map((_) => _.conversations),
            backgroundColor: m,
            borderColor: h,
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
            label: (f) => {
              const p = (f.label || "").toString().split(" - ")[0], v = Number(f.parsed) || 0, h = (f.dataset.data || []).reduce(
                (_, g) => _ + (Number(g) || 0),
                0
              ), m = h ? v / h * 100 : 0;
              return `${p}: ${v.toLocaleString()} (${m.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: r }), (f, p) => (y(), x("article", a1, [
      p[3] || (p[3] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Top Agents"),
          l("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", l1, [...p[2] || (p[2] = [
        st('<div class="loading-container" data-v-501bf4c4><div class="chart-lines-loader" data-v-501bf4c4><div class="line line-1" data-v-501bf4c4></div><div class="line line-2" data-v-501bf4c4></div><div class="line line-3" data-v-501bf4c4></div><div class="line line-4" data-v-501bf4c4></div><div class="line line-5" data-v-501bf4c4></div></div><p class="loading-text" data-v-501bf4c4>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", s1, [
        d.value.labels && d.value.labels.length ? (y(), x("section", n1, [
          Q(Qa, {
            data: d.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), dt(T(kt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", o1, [
          l("div", i1, [
            l("div", r1, [
              Q(T(Ig), { class: "empty-icon" })
            ]),
            p[0] || (p[0] = l("p", { class: "empty-title" }, "No top agents data", -1)),
            p[1] || (p[1] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), d1 = /* @__PURE__ */ nt(c1, [["__scopeId", "data-v-501bf4c4"]]), u1 = { class: "payment-method-card" }, h1 = {
  key: 0,
  class: "loading-state"
}, f1 = {
  key: 1,
  class: "card-body"
}, g1 = {
  key: 0,
  class: "payment-methods-section"
}, p1 = { class: "payment-methods-grid" }, v1 = { class: "payment-card-content" }, b1 = { class: "payment-card-header" }, m1 = {
  key: 0,
  class: "currency-breakdown-card"
}, y1 = { class: "currency-label" }, _1 = { class: "payment-badge-wrapper" }, x1 = {
  key: 1,
  class: "empty-state"
}, k1 = { class: "empty-state-content" }, w1 = { class: "empty-icon-wrapper" }, $1 = {
  key: 2,
  class: "table-section"
}, M1 = { class: "table-wrapper" }, C1 = { class: "data-table" }, S1 = { class: "table-body" }, D1 = { class: "table-cell font-medium" }, A1 = { class: "table-cell text-center" }, T1 = { class: "table-cell text-center success-value" }, B1 = {
  key: 0,
  class: "currency-cell-list"
}, L1 = { key: 1 }, F1 = { class: "table-cell" }, P1 = { class: "payment-tags" }, I1 = { class: "tag-name" }, E1 = {
  key: 0,
  class: "tag-amount"
}, R1 = {
  key: 1,
  class: "tag-amount"
}, O1 = { class: "tag-count" }, V1 = {
  key: 3,
  class: "empty-table-state"
}, z1 = "Not Registered", _s = 3, N1 = /* @__PURE__ */ tt({
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
    const s = e, n = a, { isDark: o } = ct(lt(s, "theme")), i = at(!1), r = at({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), c = C(() => r.value.payment_method_breakdown && r.value.payment_method_breakdown.length > 0), d = C(() => r.value.payment_method_by_day && r.value.payment_method_by_day.length > 0), u = at(!1), f = C(() => !r.value.payment_method_by_day || r.value.payment_method_by_day.length === 0 ? [] : [...r.value.payment_method_by_day].sort((L, O) => Dt(L.date).valueOf() - Dt(O.date).valueOf())), p = C(() => u.value ? f.value : f.value.slice(0, _s)), v = C(() => f.value.length > _s), h = (L) => {
      if (!L)
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
      const O = (L.payment_method_breakdown || []).map((V) => ({
        payment_method: V.payment_method || "Unknown",
        total_amount: V.total_amount ?? 0,
        count: V.count ?? 0,
        total_amount_by_currency: V.total_amount_by_currency ?? []
      })), j = (L.payment_method_by_day || []).map((V) => ({
        date: V.date || "",
        total_count: V.total_count ?? 0,
        total_amount: V.total_amount ?? 0,
        total_amount_by_currency: V.total_amount_by_currency ?? [],
        payment_methods: (V.payment_methods || []).map((z) => ({
          payment_method: z.payment_method || "Unknown",
          total_amount: z.total_amount ?? 0,
          count: z.count ?? 0,
          total_amount_by_currency: z.total_amount_by_currency ?? []
        }))
      }));
      return {
        airline_name: L.airline_name || s.airlineName,
        start_date: L.start_date || "",
        end_date: L.end_date || "",
        total_conversations: L.total_conversations ?? 0,
        total_amount: L.total_amount ?? 0,
        total_sell_usd: L.total_sell_usd,
        total_amount_by_currency: L.total_amount_by_currency ?? [],
        payment_method_breakdown: O,
        payment_method_by_day: j
      };
    }, m = async () => {
      if (!(!s.fetchFunction || !s.dates || s.dates.length < 2 || !s.airlineName)) {
        i.value = !0;
        try {
          const [L, O] = s.dates.map((V) => Dt(V).format("YYYY-MM-DD")), j = await s.fetchFunction(s.airlineName, L, O);
          r.value = h(j);
        } catch (L) {
          console.error("Error fetching payment method metrics:", L), r.value = h(null);
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
    ], g = (L) => {
      const O = _[L % _.length];
      return {
        background: O.bg,
        borderColor: O.border
      };
    }, b = (L) => ({ color: _[L % _.length].text }), k = (L) => ({ color: _[L % _.length].value }), w = (L) => ({ color: _[L % _.length].icon }), M = (L) => ({ color: _[L % _.length].badge }), S = (L) => {
      const j = B(L).length;
      return j > 18 ? { fontSize: "0.75rem" } : j > 15 ? { fontSize: "0.875rem" } : j > 12 ? { fontSize: "1rem" } : { fontSize: "1.125rem" };
    }, D = (L) => {
      const O = L?.toLowerCase() || "";
      return !L || O === "unknown" ? Ng : O.includes("credit") || O.includes("debit") ? So : O.includes("cash") || O.includes("efectivo") ? Fg : O.includes("bank") || O.includes("transfer") ? Pg : O.includes("zelle") || O.includes("pago") || O.includes("movil") ? zg : O.includes("wallet") ? Wg : Vg;
    }, A = (L) => !L || L.toLowerCase() === "unknown" ? z1 : L.replace(/_/g, " "), B = (L) => L == null ? "$0.00" : bt(L), F = (L) => L == null ? "0" : Qt(L), P = (L) => L ? Dt(L).format("DD/MM/YYYY") : "-", R = (L) => L == null || Number.isNaN(Number(L)) ? 0 : Number(L), N = (L) => {
      n("export", L);
    };
    function Y() {
      const L = s.data;
      L && (Array.isArray(L.payment_method_breakdown) && L.payment_method_breakdown.length > 0 || Array.isArray(L.payment_method_by_day) && L.payment_method_by_day.length > 0) && (i.value = !1, r.value = h(L));
    }
    return le(() => {
      s.data ? Y() : m();
    }), Et(
      () => s.data,
      (L) => {
        L && Y();
      },
      { deep: !0 }
    ), Et(
      () => s.dates,
      (L) => {
        s.data || L && L[0] && L[1] && m();
      },
      { deep: !0 }
    ), t({ isDark: o }), (L, O) => (y(), x("article", u1, [
      O[10] || (O[10] = st('<header class="card-header" data-v-b01ad4e3><div class="header-content" data-v-b01ad4e3><div class="title-section" data-v-b01ad4e3><h3 class="card-title" data-v-b01ad4e3>Payment Method Metrics</h3><p class="card-subtitle" data-v-b01ad4e3>Sales breakdown by payment method</p></div></div></header>', 1)),
      i.value ? (y(), x("div", h1, [...O[1] || (O[1] = [
        st('<div class="loading-container" data-v-b01ad4e3><div class="chart-lines-loader" data-v-b01ad4e3><div class="line line-1" data-v-b01ad4e3></div><div class="line line-2" data-v-b01ad4e3></div><div class="line line-3" data-v-b01ad4e3></div><div class="line line-4" data-v-b01ad4e3></div><div class="line line-5" data-v-b01ad4e3></div></div><p class="loading-text" data-v-b01ad4e3>Loading payment data...</p></div>', 1)
      ])])) : (y(), x("div", f1, [
        c.value ? (y(), x("section", g1, [
          O[2] || (O[2] = l("p", { class: "section-label" }, "Sales by Payment Method", -1)),
          l("div", p1, [
            (y(!0), x(K, null, J(r.value.payment_method_breakdown, (j, V) => (y(), x("div", {
              key: j.payment_method,
              class: "payment-method-card-item",
              style: ft(g(V))
            }, [
              l("div", v1, [
                l("div", b1, [
                  (y(), dt(ca(D(j.payment_method)), {
                    class: "payment-icon",
                    style: ft(w(V))
                  }, null, 8, ["style"])),
                  l("span", {
                    class: "payment-name",
                    style: ft(b(V))
                  }, $(A(j.payment_method)), 5)
                ]),
                j.total_amount_by_currency && j.total_amount_by_currency.length > 0 ? (y(), x("div", m1, [
                  (y(!0), x(K, null, J(j.total_amount_by_currency, (z) => (y(), x("p", {
                    key: `${j.payment_method}-${z.currency}`,
                    class: "currency-card-item",
                    style: ft(k(V))
                  }, [
                    l("span", y1, $(z.currency), 1),
                    l("span", {
                      class: "currency-value",
                      style: ft(S(z.total_value))
                    }, $(F(z.total_value)), 5)
                  ], 4))), 128))
                ])) : (y(), x("p", {
                  key: 1,
                  class: "payment-amount",
                  style: ft([k(V), S(j.total_amount)])
                }, $(B(j.total_amount)), 5)),
                l("div", _1, [
                  l("span", {
                    class: "payment-badge",
                    style: ft(M(V))
                  }, $(R(j.count)) + " " + $(R(j.count) === 1 ? "sale" : "sales"), 5)
                ])
              ])
            ], 4))), 128))
          ])
        ])) : (y(), x("section", x1, [
          l("div", k1, [
            l("div", w1, [
              Q(T(So), { class: "empty-icon" })
            ]),
            O[3] || (O[3] = l("p", { class: "empty-title" }, "No payment data available", -1)),
            O[4] || (O[4] = l("p", { class: "empty-description" }, "No payment method data found for the selected period. Try adjusting the date range.", -1))
          ])
        ])),
        d.value ? (y(), x("section", $1, [
          O[8] || (O[8] = l("p", { class: "section-label" }, "Daily Breakdown", -1)),
          l("div", M1, [
            l("table", C1, [
              O[6] || (O[6] = l("thead", null, [
                l("tr", { class: "table-header-row" }, [
                  l("th", { class: "table-header text-left" }, "Date"),
                  l("th", { class: "table-header text-center" }, "Total Sales"),
                  l("th", { class: "table-header text-center" }, "Total Amount"),
                  l("th", { class: "table-header text-left" }, "Payment Methods")
                ])
              ], -1)),
              l("tbody", S1, [
                (y(!0), x(K, null, J(p.value, (j) => (y(), x("tr", {
                  key: j.date,
                  class: "table-row"
                }, [
                  l("td", D1, $(P(j.date)), 1),
                  l("td", A1, $(T(X)(j.total_count ?? 0)), 1),
                  l("td", T1, [
                    j.total_amount_by_currency && j.total_amount_by_currency.length > 0 ? (y(), x("div", B1, [
                      (y(!0), x(K, null, J(j.total_amount_by_currency, (V) => (y(), x("span", {
                        key: `${j.date}-${V.currency}`
                      }, $(V.currency) + " " + $(B(V.total_value)), 1))), 128))
                    ])) : (y(), x("span", L1, $(B(j.total_amount)), 1))
                  ]),
                  l("td", F1, [
                    l("div", P1, [
                      (y(!0), x(K, null, J(j.payment_methods || [], (V) => (y(), x("div", {
                        key: V.payment_method,
                        class: "payment-tag"
                      }, [
                        l("span", I1, $(A(V.payment_method)), 1),
                        O[5] || (O[5] = l("span", { class: "tag-separator" }, "•", -1)),
                        !V.total_amount_by_currency || V.total_amount_by_currency.length === 0 ? (y(), x("span", E1, $(B(V.total_amount)), 1)) : (y(), x("span", R1, $(V.total_amount_by_currency.map((z) => `${z.currency} ${B(z.total_value)}`).join(" / ")), 1)),
                        l("span", O1, "(" + $(R(V.count)) + ")", 1)
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
            onClick: O[0] || (O[0] = (j) => u.value = !u.value)
          }, [
            xt($(u.value ? "View less" : `View more (${f.value.length - _s} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: q(["view-more-icon", { "view-more-icon-rotated": u.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...O[7] || (O[7] = [
              l("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : E("", !0),
          e.enableExport ? (y(), dt(T(kt), {
            key: 1,
            onExport: N,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : c.value ? (y(), x("div", V1, [...O[9] || (O[9] = [
          l("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
        ])])) : E("", !0)
      ]))
    ]));
  }
}), W1 = /* @__PURE__ */ nt(N1, [["__scopeId", "data-v-b01ad4e3"]]), H1 = { class: "agent-human-conv-card" }, j1 = {
  key: 0,
  class: "loading-state"
}, Y1 = {
  key: 1,
  class: "card-body"
}, q1 = { class: "summary-cards" }, U1 = {
  key: 0,
  class: "summary-card enqueued-card"
}, K1 = { class: "summary-card-content" }, X1 = { class: "card-content enqueued-content" }, G1 = { class: "card-value enqueued-value" }, Z1 = { class: "summary-card assigned-card" }, Q1 = { class: "summary-card-content" }, J1 = { class: "card-content" }, ty = { class: "card-value assigned-value" }, ey = { class: "card-content" }, ay = { class: "card-value assigned-value" }, sy = { class: "summary-card closed-card" }, ny = { class: "summary-card-content" }, oy = { class: "card-content" }, iy = { class: "card-value closed-value" }, ry = { class: "card-content" }, ly = { class: "card-value closed-value" }, cy = {
  key: 0,
  class: "agents-section"
}, dy = { class: "date-header" }, uy = { class: "date-title" }, hy = { class: "date-stats" }, fy = {
  key: 0,
  class: "stat-item enqueued-stat"
}, gy = { class: "stat-value" }, py = { class: "stat-item assigned-stat" }, vy = { class: "stat-value" }, by = { class: "stat-value" }, my = { class: "stat-item closed-stat" }, yy = { class: "stat-value" }, _y = { class: "stat-value" }, xy = { class: "table-wrapper" }, ky = { class: "data-table" }, wy = { class: "table-body" }, $y = { class: "table-cell name-cell" }, My = { class: "table-cell email-cell" }, Cy = { class: "table-cell text-center" }, Sy = { class: "metric-cell-content" }, Dy = { class: "badge assigned-badge" }, Ay = { class: "metric-cell-avg" }, Ty = { class: "table-cell text-center" }, By = { class: "metric-cell-content" }, Ly = { class: "badge closed-badge" }, Fy = { class: "metric-cell-avg" }, Py = {
  key: 1,
  class: "empty-state"
}, Iy = /* @__PURE__ */ tt({
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
    }, { isDark: i } = ct(lt(s, "theme")), r = C(() => {
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
    }, f = (g) => {
      const b = new Date(g), k = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return b.toLocaleDateString("en-US", k);
    }, p = (g) => g[0]?.day_total_enqueued ?? 0, v = (g) => g[0]?.day_total_assigned ?? 0, h = (g) => g[0]?.day_total_closed ?? 0, m = (g) => g[0]?.day_avg_time_to_assign_seconds ?? null, _ = (g) => g[0]?.day_avg_conversation_duration_seconds ?? null;
    return t({ isDark: i }), (g, b) => (y(), x("article", H1, [
      b[14] || (b[14] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Agent Human Conversations"),
          l("p", { class: "card-subtitle" }, "Human conversation assignments and closures by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", j1, [...b[0] || (b[0] = [
        st('<div class="loading-container" data-v-e0afa502><div class="chart-bars-loader" data-v-e0afa502><div class="bar bar-1" data-v-e0afa502></div><div class="bar bar-2" data-v-e0afa502></div><div class="bar bar-3" data-v-e0afa502></div><div class="bar bar-4" data-v-e0afa502></div><div class="bar bar-5" data-v-e0afa502></div></div><p class="loading-text" data-v-e0afa502>Loading agent data...</p></div>', 1)
      ])])) : (y(), x("div", Y1, [
        l("div", q1, [
          e.data.total_enqueued ? (y(), x("div", U1, [
            b[2] || (b[2] = l("div", { class: "card-decoration" }, null, -1)),
            l("div", K1, [
              l("div", X1, [
                b[1] || (b[1] = l("p", { class: "card-label" }, "Total Enqueued", -1)),
                l("p", G1, $(d(e.data.total_enqueued)), 1)
              ])
            ])
          ])) : E("", !0),
          l("div", Z1, [
            b[5] || (b[5] = l("div", { class: "card-decoration" }, null, -1)),
            l("div", Q1, [
              l("div", J1, [
                b[3] || (b[3] = l("p", { class: "card-label" }, "Total Assigned", -1)),
                l("p", ty, $(d(e.data.total_assigned)), 1)
              ]),
              l("div", ey, [
                b[4] || (b[4] = l("p", { class: "card-label" }, "AVG time to assign", -1)),
                l("p", ay, $(u(e.data.avg_time_to_assign_seconds)), 1)
              ])
            ])
          ]),
          l("div", sy, [
            b[8] || (b[8] = l("div", { class: "card-decoration" }, null, -1)),
            l("div", ny, [
              l("div", oy, [
                b[6] || (b[6] = l("p", { class: "card-label" }, "Total Closed", -1)),
                l("p", iy, $(d(e.data.total_closed)), 1)
              ]),
              l("div", ry, [
                b[7] || (b[7] = l("p", { class: "card-label" }, "AVG time to close", -1)),
                l("p", ly, $(u(e.data.avg_conversation_duration_seconds)), 1)
              ])
            ])
          ])
        ]),
        r.value ? (y(), x("div", cy, [
          (y(!0), x(K, null, J(c.value, (k, w) => (y(), x("div", {
            key: w,
            class: "date-group"
          }, [
            l("div", dy, [
              l("h4", uy, $(f(w)), 1),
              l("div", hy, [
                p(k) ? (y(), x("span", fy, [
                  l("span", gy, $(d(p(k))), 1),
                  b[9] || (b[9] = xt(" Enqueued ", -1))
                ])) : E("", !0),
                l("span", py, [
                  l("span", vy, $(d(v(k))), 1),
                  b[10] || (b[10] = xt(" Assigned ", -1)),
                  l("span", by, $(u(m(k))), 1)
                ]),
                l("span", my, [
                  l("span", yy, $(d(h(k))), 1),
                  b[11] || (b[11] = xt(" Closed ", -1)),
                  l("span", _y, $(u(_(k))), 1)
                ])
              ])
            ]),
            l("div", xy, [
              l("table", ky, [
                b[12] || (b[12] = l("thead", null, [
                  l("tr", { class: "table-header-row" }, [
                    l("th", { class: "table-header" }, "Agent Name"),
                    l("th", { class: "table-header" }, "Email"),
                    l("th", { class: "table-header" }, "Assigned (AVG time to assign)"),
                    l("th", { class: "table-header" }, "Closed (AVG time to close)")
                  ])
                ], -1)),
                l("tbody", wy, [
                  (y(!0), x(K, null, J(k, (M) => (y(), x("tr", {
                    key: `${w}-${M.agent_email}`,
                    class: "table-row"
                  }, [
                    l("td", $y, $(M.agent_name || "-"), 1),
                    l("td", My, $(M.agent_email), 1),
                    l("td", Cy, [
                      l("div", Sy, [
                        l("span", Dy, $(d(M.assigned_count)), 1),
                        l("span", Ay, $(u(M.avg_time_to_assign_seconds)), 1)
                      ])
                    ]),
                    l("td", Ty, [
                      l("div", By, [
                        l("span", Ly, $(d(M.closed_count)), 1),
                        l("span", Fy, $(u(M.avg_conversation_duration_seconds)), 1)
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ])
          ]))), 128)),
          e.enableExport ? (y(), dt(T(kt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("div", Py, [...b[13] || (b[13] = [
          st('<div class="empty-state-content" data-v-e0afa502><div class="empty-icon-wrapper" data-v-e0afa502><svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e0afa502><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-e0afa502></path></svg></div><p class="empty-title" data-v-e0afa502>No agent human conversation data available</p><p class="empty-description" data-v-e0afa502>Try adjusting the date range or check your filters.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Ey = /* @__PURE__ */ nt(Iy, [["__scopeId", "data-v-e0afa502"]]), Ry = { class: "channel-metrics-card" }, Oy = {
  key: 0,
  class: "card-body"
}, Vy = {
  key: 0,
  class: "chart-section"
}, zy = {
  key: 1,
  class: "kpi-grid"
}, Ny = { class: "kpi-label-row" }, Wy = ["title"], Hy = { class: "kpi-value" }, jy = { class: "kpi-secondary" }, Yy = {
  key: 2,
  class: "empty-state"
}, qy = {
  key: 1,
  class: "loading-state"
}, Uy = /* @__PURE__ */ tt({
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
    const s = e, n = a, o = (h) => {
      n("export", h);
    }, { isDark: i, colors: r } = ct(lt(s, "theme")), c = {
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
    }), f = C(() => {
      const h = u.value.total_by_channel || {}, m = Object.values(h).reduce((_, g) => _ + g, 0);
      return m === 0 ? [] : Object.entries(h).sort(([, _], [, g]) => g - _).map(([_, g]) => ({
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
    })), v = (h) => {
      if (!h || !h.channels_by_day) {
        d.value = { labels: [], datasets: [] };
        return;
      }
      const m = h.channels_by_day, _ = Object.keys(m).sort();
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
    return Et(
      () => s.data,
      (h) => {
        v(h ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: i }), (h, m) => (y(), x("article", Ry, [
      m[2] || (m[2] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Interactions by Channel"),
          l("p", { class: "card-subtitle" }, "Responses sent by AI agents")
        ])
      ], -1)),
      s.loading ? (y(), x("div", qy, [...m[1] || (m[1] = [
        st('<div class="loading-container" data-v-5aa7d4da><div class="chart-bars-loader" data-v-5aa7d4da><div class="bar bar-1" data-v-5aa7d4da></div><div class="bar bar-2" data-v-5aa7d4da></div><div class="bar bar-3" data-v-5aa7d4da></div><div class="bar bar-4" data-v-5aa7d4da></div><div class="bar bar-5" data-v-5aa7d4da></div></div><p class="loading-text" data-v-5aa7d4da>Loading channel metrics...</p></div>', 1)
      ])])) : (y(), x("div", Oy, [
        d.value.labels && d.value.labels.length ? (y(), x("section", Vy, [
          Q(ye, {
            data: d.value,
            options: p.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), dt(T(kt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : E("", !0),
        f.value.length ? (y(), x("div", zy, [
          (y(!0), x(K, null, J(f.value, (_) => (y(), x("div", {
            class: "kpi-card",
            key: _.name
          }, [
            l("div", Ny, [
              l("span", {
                class: "kpi-color-dot",
                style: ft({ backgroundColor: _.color }),
                "aria-hidden": "true"
              }, null, 4),
              l("span", {
                class: "kpi-label",
                title: _.label
              }, $(_.label), 9, Wy)
            ]),
            l("span", Hy, $(_.percentage) + "%", 1),
            l("span", jy, $(T(X)(_.total)) + " msgs", 1)
          ]))), 128))
        ])) : (y(), x("section", Yy, [...m[0] || (m[0] = [
          st('<div class="empty-state-content" data-v-5aa7d4da><div class="empty-icon-wrapper" data-v-5aa7d4da><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5aa7d4da><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-5aa7d4da></path></svg></div><p class="empty-title" data-v-5aa7d4da>No channel metrics data available</p><p class="empty-description" data-v-5aa7d4da>No channel data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Ky = /* @__PURE__ */ nt(Uy, [["__scopeId", "data-v-5aa7d4da"]]), Xy = { class: "triage-combinations-card" }, Gy = { class: "card-header" }, Zy = { class: "total-badge" }, Qy = {
  key: 0,
  class: "card-body"
}, Jy = { class: "chart-container" }, t_ = { class: "table-container" }, e_ = { class: "table-row" }, a_ = { class: "table-row" }, s_ = { class: "table-cell text-center count-cell" }, n_ = { class: "table-cell text-center count-cell" }, o_ = { class: "table-cell text-center count-cell" }, i_ = { class: "table-cell text-center count-cell" }, r_ = { class: "table-cell text-center count-cell" }, l_ = {
  key: 1,
  class: "empty-state"
}, c_ = { class: "empty-state-content" }, d_ = { class: "empty-icon-wrapper" }, u_ = {
  key: 1,
  class: "loading-state"
}, h_ = /* @__PURE__ */ tt({
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
    }, { isDark: i, colors: r } = ct(lt(s, "theme")), c = C(() => {
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
    }), u = C(() => Object.keys(s.data?.combinations || {}).length > 0), f = C(() => {
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
    }, v = (g) => g?.replace("80", "") || "#888888", h = C(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [f.value.pct0],
          backgroundColor: p.c0,
          borderColor: v(p.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [f.value.pct1],
          backgroundColor: p.c1,
          borderColor: v(p.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [f.value.pct2],
          backgroundColor: p.c2,
          borderColor: v(p.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [f.value.pct3],
          backgroundColor: p.c3,
          borderColor: v(p.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [f.value.pct4p],
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
    return t({ isDark: i }), (g, b) => (y(), x("article", Xy, [
      l("header", Gy, [
        b[0] || (b[0] = l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Distribution of Number of Intents"),
          l("p", { class: "card-subtitle" }, "Analysis of intent combinations per conversation")
        ], -1)),
        l("span", Zy, " Total: " + $(d.value), 1)
      ]),
      e.loading ? (y(), x("div", u_, [...b[6] || (b[6] = [
        st('<div class="loading-container" data-v-cb93cda2><div class="chart-bars-loader" data-v-cb93cda2><div class="bar bar-1" data-v-cb93cda2></div><div class="bar bar-2" data-v-cb93cda2></div><div class="bar bar-3" data-v-cb93cda2></div><div class="bar bar-4" data-v-cb93cda2></div><div class="bar bar-5" data-v-cb93cda2></div></div><p class="loading-text" data-v-cb93cda2>Loading intent distribution...</p></div>', 1)
      ])])) : (y(), x("div", Qy, [
        u.value ? (y(), x(K, { key: 0 }, [
          l("div", Jy, [
            Q(re, {
              data: h.value,
              options: m.value
            }, null, 8, ["data", "options"])
          ]),
          l("div", t_, [
            b[3] || (b[3] = st('<div class="table-header" data-v-cb93cda2><div class="table-cell header-cell" data-v-cb93cda2>Number of intentions</div><div class="table-cell header-cell text-center" data-v-cb93cda2>0</div><div class="table-cell header-cell text-center" data-v-cb93cda2>1</div><div class="table-cell header-cell text-center" data-v-cb93cda2>2</div><div class="table-cell header-cell text-center" data-v-cb93cda2>3</div><div class="table-cell header-cell text-center" data-v-cb93cda2>4 or more</div></div>', 1)),
            l("div", e_, [
              b[1] || (b[1] = l("div", { class: "table-cell row-label" }, "% of total", -1)),
              l("div", {
                class: "table-cell text-center percentage-cell",
                style: ft({ color: v(p.c0) })
              }, $(_(f.value.pct0)) + "% ", 5),
              l("div", {
                class: "table-cell text-center percentage-cell",
                style: ft({ color: v(p.c1) })
              }, $(_(f.value.pct1)) + "% ", 5),
              l("div", {
                class: "table-cell text-center percentage-cell",
                style: ft({ color: v(p.c2) })
              }, $(_(f.value.pct2)) + "% ", 5),
              l("div", {
                class: "table-cell text-center percentage-cell",
                style: ft({ color: v(p.c3) })
              }, $(_(f.value.pct3)) + "% ", 5),
              l("div", {
                class: "table-cell text-center percentage-cell",
                style: ft({ color: v(p.c4p) })
              }, $(_(f.value.pct4p)) + "% ", 5)
            ]),
            l("div", a_, [
              b[2] || (b[2] = l("div", { class: "table-cell row-label" }, "Count", -1)),
              l("div", s_, $(T(X)(c.value[0])), 1),
              l("div", n_, $(T(X)(c.value[1])), 1),
              l("div", o_, $(T(X)(c.value[2])), 1),
              l("div", i_, $(T(X)(c.value[3])), 1),
              l("div", r_, $(T(X)(c.value["4p"])), 1)
            ])
          ]),
          e.enableExport ? (y(), dt(T(kt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ], 64)) : (y(), x("div", l_, [
          l("div", c_, [
            l("div", d_, [
              Q(T(Vt), { class: "empty-icon" })
            ]),
            b[4] || (b[4] = l("p", { class: "empty-title" }, "No triage combinations data", -1)),
            b[5] || (b[5] = l("p", { class: "empty-description" }, "No intent distribution data found for the selected period. Try adjusting the date range.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), f_ = /* @__PURE__ */ nt(h_, [["__scopeId", "data-v-cb93cda2"]]), g_ = { class: "select-language-card" }, p_ = { class: "card-header" }, v_ = { class: "header-content" }, b_ = {
  key: 0,
  class: "total-badge"
}, m_ = { class: "badge-value" }, y_ = {
  key: 0,
  class: "loading-state"
}, __ = {
  key: 1,
  class: "card-body"
}, x_ = {
  key: 0,
  class: "pie-section"
}, k_ = {
  key: 1,
  class: "empty-state"
}, w_ = /* @__PURE__ */ tt({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s, colors: n } = ct(lt(a, "theme")), o = [
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
      () => (a.data?.items || []).reduce((v, h) => v + h.count, 0)
    ), u = C(() => {
      const v = {};
      for (const h of a.data?.items || [])
        v[h.language] = (v[h.language] || 0) + h.count;
      return Object.entries(v).map(([h, m]) => ({ language: h, count: m })).sort((h, m) => m.count - h.count);
    }), f = C(() => ({
      labels: u.value.map((v) => r(v.language)),
      datasets: [{
        data: u.value.map((v) => v.count),
        backgroundColor: u.value.map((v, h) => o[h % o.length] + "80"),
        borderColor: u.value.map((v, h) => o[h % o.length]),
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
              const h = v.raw || 0, m = d.value > 0 ? (h / d.value * 100).toFixed(1) : "0";
              return ` ${v.label}: ${h} (${m}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: s }), (v, h) => (y(), x("article", g_, [
      l("header", p_, [
        l("div", v_, [
          h[1] || (h[1] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "Language Selection"),
            l("p", { class: "card-subtitle" }, "Language distribution across conversations")
          ], -1)),
          a.loading ? E("", !0) : (y(), x("div", b_, [
            h[0] || (h[0] = l("p", { class: "badge-label" }, "Total", -1)),
            l("p", m_, $(T(X)(d.value)), 1)
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", y_, [...h[2] || (h[2] = [
        st('<div class="loading-container" data-v-216eadc2><div class="chart-bars-loader" data-v-216eadc2><div class="bar bar-1" data-v-216eadc2></div><div class="bar bar-2" data-v-216eadc2></div><div class="bar bar-3" data-v-216eadc2></div><div class="bar bar-4" data-v-216eadc2></div><div class="bar bar-5" data-v-216eadc2></div></div><p class="loading-text" data-v-216eadc2>Loading language data...</p></div>', 1)
      ])])) : (y(), x("div", __, [
        c.value ? (y(), x("section", x_, [
          Q(Qa, {
            data: f.value,
            options: p.value
          }, null, 8, ["data", "options"])
        ])) : (y(), x("section", k_, [...h[3] || (h[3] = [
          st('<div class="empty-state-content" data-v-216eadc2><div class="empty-icon-wrapper" data-v-216eadc2><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-216eadc2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" data-v-216eadc2></path></svg></div><p class="empty-title" data-v-216eadc2>No language data available</p><p class="empty-description" data-v-216eadc2>No language selection data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), $_ = /* @__PURE__ */ nt(w_, [["__scopeId", "data-v-216eadc2"]]), M_ = { class: "guardrails-card" }, C_ = { class: "card-header" }, S_ = { class: "header-content" }, D_ = {
  key: 0,
  class: "total-badge"
}, A_ = { class: "badge-value" }, T_ = {
  key: 0,
  class: "loading-state"
}, B_ = {
  key: 1,
  class: "card-body"
}, L_ = { class: "summary-card" }, F_ = { class: "summary-items" }, P_ = { class: "summary-item" }, I_ = { class: "summary-value" }, E_ = { class: "summary-pct" }, R_ = { class: "summary-item" }, O_ = { class: "summary-pct" }, V_ = { class: "summary-item" }, z_ = { class: "summary-value" }, N_ = { class: "summary-pct" }, W_ = {
  key: 0,
  class: "table-section"
}, H_ = { class: "table-wrapper" }, j_ = { class: "data-table" }, Y_ = { class: "table-body" }, q_ = { class: "table-cell font-medium text-center" }, U_ = { class: "table-cell text-center font-semibold" }, K_ = { class: "table-cell" }, X_ = { class: "type-badges-row" }, G_ = {
  key: 1,
  class: "empty-state"
}, xs = 3, Z_ = /* @__PURE__ */ tt({
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
    }, { isDark: i } = ct(lt(s, "theme")), r = C(
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
    }, u = C(() => d("guardrail_type")), f = C(() => d("guardrail_action")), p = C(() => d("guardrail_source")), v = C(() => {
      const g = {};
      for (const b of s.data?.items || [])
        g[b.date] || (g[b.date] = {}), g[b.date][b.guardrail_type] = (g[b.date][b.guardrail_type] || 0) + b.count;
      return Object.entries(g).map(([b, k]) => ({
        date: b,
        total: Object.values(k).reduce((w, M) => w + M, 0),
        types: Object.entries(k).map(([w, M]) => ({ type: w, count: M })).sort((w, M) => M.count - w.count)
      })).sort((b, k) => new Date(b.date).getTime() - new Date(k.date).getTime());
    }), h = at(!1), m = C(() => h.value ? v.value : v.value.slice(0, xs)), _ = C(() => v.value.length > xs);
    return t({ isDark: i }), (g, b) => (y(), x("article", M_, [
      l("header", C_, [
        l("div", S_, [
          b[2] || (b[2] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "Guardrails Metrics"),
            l("p", { class: "card-subtitle" }, "Content safety guardrail events and actions")
          ], -1)),
          s.loading ? E("", !0) : (y(), x("div", D_, [
            b[1] || (b[1] = l("p", { class: "badge-label" }, "Total Events", -1)),
            l("p", A_, $(T(X)(c.value)), 1)
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", T_, [...b[3] || (b[3] = [
        st('<div class="loading-container" data-v-02a2e95e><div class="chart-bars-loader" data-v-02a2e95e><div class="bar bar-1" data-v-02a2e95e></div><div class="bar bar-2" data-v-02a2e95e></div><div class="bar bar-3" data-v-02a2e95e></div><div class="bar bar-4" data-v-02a2e95e></div><div class="bar bar-5" data-v-02a2e95e></div></div><p class="loading-text" data-v-02a2e95e>Loading guardrails data...</p></div>', 1)
      ])])) : (y(), x("div", B_, [
        r.value ? (y(), x(K, { key: 0 }, [
          l("div", L_, [
            l("div", F_, [
              l("div", P_, [
                b[4] || (b[4] = l("span", { class: "summary-label" }, "Top type:", -1)),
                l("span", I_, $(u.value.name), 1),
                l("span", E_, "(" + $(u.value.pct) + "%)", 1)
              ]),
              b[7] || (b[7] = l("span", { class: "summary-dot" }, "·", -1)),
              l("div", R_, [
                b[5] || (b[5] = l("span", { class: "summary-label" }, "Top action:", -1)),
                l("span", {
                  class: q(["summary-value", `summary-action-${f.value.name.toLowerCase()}`])
                }, $(f.value.name), 3),
                l("span", O_, "(" + $(f.value.pct) + "%)", 1)
              ]),
              b[8] || (b[8] = l("span", { class: "summary-dot" }, "·", -1)),
              l("div", V_, [
                b[6] || (b[6] = l("span", { class: "summary-label" }, "Top source:", -1)),
                l("span", z_, $(p.value.name), 1),
                l("span", N_, "(" + $(p.value.pct) + "%)", 1)
              ])
            ])
          ]),
          v.value.length > 0 ? (y(), x("section", W_, [
            b[11] || (b[11] = l("div", { class: "section-header" }, [
              l("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            l("div", H_, [
              l("table", j_, [
                b[9] || (b[9] = l("thead", null, [
                  l("tr", { class: "table-header-row" }, [
                    l("th", { class: "table-header" }, "Date"),
                    l("th", { class: "table-header text-center" }, "Count"),
                    l("th", { class: "table-header" }, "Types")
                  ])
                ], -1)),
                l("tbody", Y_, [
                  (y(!0), x(K, null, J(m.value, (k) => (y(), x("tr", {
                    key: k.date,
                    class: "table-row"
                  }, [
                    l("td", q_, $(T(Dt)(k.date).format("DD/MM")), 1),
                    l("td", U_, $(T(X)(k.total)), 1),
                    l("td", K_, [
                      l("div", X_, [
                        (y(!0), x(K, null, J(k.types, (w) => (y(), x("span", {
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
              onClick: b[0] || (b[0] = (k) => h.value = !h.value)
            }, [
              xt($(h.value ? "View less" : `View more (${v.value.length - xs} more rows)`) + " ", 1),
              (y(), x("svg", {
                class: q(["view-more-icon", { "view-more-icon-rotated": h.value }]),
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
            ])) : E("", !0),
            e.enableExport ? (y(), dt(T(kt), {
              key: 1,
              onExport: o,
              loading: e.exportLoading
            }, null, 8, ["loading"])) : E("", !0)
          ])) : E("", !0)
        ], 64)) : (y(), x("section", G_, [...b[12] || (b[12] = [
          st('<div class="empty-state-content" data-v-02a2e95e><div class="empty-icon-wrapper" data-v-02a2e95e><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-02a2e95e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-v-02a2e95e></path></svg></div><p class="empty-title" data-v-02a2e95e>No guardrail events</p><p class="empty-description" data-v-02a2e95e>No content safety events found for the selected period. This is a good sign!</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Q_ = /* @__PURE__ */ nt(Z_, [["__scopeId", "data-v-02a2e95e"]]), J_ = { class: "dn-metrics-card" }, t2 = { class: "card-header" }, e2 = { class: "header-content" }, a2 = {
  key: 0,
  class: "total-docs-badge"
}, s2 = { class: "badge-value" }, n2 = {
  key: 0,
  class: "loading-state"
}, o2 = {
  key: 1,
  class: "card-body"
}, i2 = { class: "kpi-grid" }, r2 = { class: "kpi-card kpi-neutral" }, l2 = { class: "kpi-value" }, c2 = { class: "kpi-card kpi-success" }, d2 = { class: "kpi-value kpi-value-success" }, u2 = { class: "kpi-pct" }, h2 = { class: "kpi-card kpi-danger" }, f2 = { class: "kpi-value kpi-value-error" }, g2 = { class: "kpi-pct" }, p2 = { class: "kpi-card kpi-warning" }, v2 = { class: "kpi-value kpi-value-reason" }, b2 = { class: "kpi-pct" }, m2 = { class: "chart-section" }, y2 = { class: "chart-wrapper" }, _2 = {
  key: 1,
  class: "empty-chart"
}, x2 = {
  key: 0,
  class: "table-section"
}, k2 = { class: "table-wrapper" }, w2 = { class: "data-table" }, $2 = { class: "table-body" }, M2 = { class: "table-cell text-left font-medium" }, C2 = { class: "table-cell text-center font-semibold" }, S2 = { class: "table-cell text-center" }, D2 = { class: "impact-bar-container" }, A2 = { class: "impact-label" }, T2 = {
  key: 1,
  class: "chart-section"
}, B2 = { class: "chart-wrapper" }, L2 = { class: "system-health" }, F2 = { class: "system-health-content" }, P2 = { class: "sys-kpi-grid" }, I2 = { class: "sys-kpi" }, E2 = { class: "sys-value" }, R2 = { class: "sys-kpi" }, O2 = { class: "sys-value" }, V2 = { class: "sys-kpi" }, z2 = { class: "sys-value sys-error" }, N2 = { class: "sys-kpi" }, W2 = { class: "sys-value" }, H2 = { class: "sys-kpi" }, j2 = { class: "sys-value" }, Y2 = { class: "sys-kpi" }, q2 = { class: "sys-value sys-error" }, U2 = {
  key: 1,
  class: "empty-state"
}, K2 = /* @__PURE__ */ tt({
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
    }, { isDark: i, colors: r } = ct(lt(s, "theme")), c = C(() => {
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
    }), f = C(() => d.value.row_count_total || u.value.processing_started), p = C(() => Math.max(0, f.value - u.value.notification_sent)), v = (w, M) => M ? `${Math.round(w / M * 100)}%` : "0%", h = C(() => {
      const w = [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].filter((M) => M.count > 0).sort((M, S) => S.count - M.count);
      return w.length > 0 ? w[0] : { reason: "None", count: 0 };
    }), m = C(() => {
      const w = f.value;
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
      const w = f.value, M = u.value.processing_success, S = Math.max(0, M - u.value.totalDqErrors), D = u.value.notification_sent, A = Math.max(0, w - M), B = u.value.totalDqErrors, F = Math.max(0, S - D), P = (Y, L) => {
        const O = L > 0 ? Math.round(Y / L * 100) : 0;
        return `${Y.toLocaleString()} (${O}%)`;
      }, R = [
        { name: "Records Detected" },
        { name: "Valid Reservations" },
        { name: "Invalid / Unprocessed" },
        { name: "Contactable" },
        { name: "Data Quality Issues" },
        { name: "Notified" },
        { name: "Not Delivered" }
      ], N = [];
      return M > 0 && N.push({ source: "Records Detected", target: "Valid Reservations", value: M, label: P(M, w) }), A > 0 && N.push({ source: "Records Detected", target: "Invalid / Unprocessed", value: A, label: P(A, w) }), S > 0 && N.push({ source: "Valid Reservations", target: "Contactable", value: S, label: P(S, w) }), B > 0 && N.push({ source: "Valid Reservations", target: "Data Quality Issues", value: B, label: P(B, w) }), D > 0 && N.push({ source: "Contactable", target: "Notified", value: D, label: P(D, w) }), F > 0 && N.push({ source: "Contactable", target: "Not Delivered", value: F, label: P(F, w) }), { nodes: R, links: N };
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
        (P, R) => new Date(P.date).getTime() - new Date(R.date).getTime()
      ), M = s.data?.documentCounts?.items || [], S = {};
      for (const P of M)
        S[P.date] = (S[P.date] || 0) + P.row_count_total;
      const D = [.../* @__PURE__ */ new Set([...w.map((P) => P.date), ...M.map((P) => P.date)])].sort(), A = D.map((P) => Dt(P).format("MMM DD")), B = D.map((P) => {
        const R = w.find((L) => L.date === P), N = R?.notification_sent || 0, Y = S[P] || R?.processing_started || 0;
        return Y > 0 ? Math.round(N / Y * 100) : 0;
      }), F = D.map((P) => w.find((N) => N.date === P)?.notification_sent || 0);
      return {
        labels: A,
        datasets: [
          {
            label: "Success Rate (%)",
            data: B,
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
            data: F,
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
    return t({ isDark: i }), (w, M) => (y(), x("article", J_, [
      l("header", t2, [
        l("div", e2, [
          M[1] || (M[1] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "Disruption Notifier"),
            l("p", { class: "card-subtitle" }, "Passenger notification effectiveness and delivery analysis")
          ], -1)),
          s.loading ? E("", !0) : (y(), x("div", a2, [
            M[0] || (M[0] = l("p", { class: "badge-label" }, "Total Records", -1)),
            l("p", s2, $(T(X)(d.value.row_count_total)), 1)
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", n2, [...M[2] || (M[2] = [
        st('<div class="loading-container" data-v-d8baf32c><div class="chart-bars-loader" data-v-d8baf32c><div class="bar bar-1" data-v-d8baf32c></div><div class="bar bar-2" data-v-d8baf32c></div><div class="bar bar-3" data-v-d8baf32c></div><div class="bar bar-4" data-v-d8baf32c></div><div class="bar bar-5" data-v-d8baf32c></div></div><p class="loading-text" data-v-d8baf32c>Loading disruption notifier data...</p></div>', 1)
      ])])) : (y(), x("div", o2, [
        c.value ? (y(), x(K, { key: 0 }, [
          l("div", i2, [
            l("div", r2, [
              M[3] || (M[3] = l("span", { class: "kpi-label" }, "Passengers Affected", -1)),
              l("span", l2, $(T(X)(f.value)), 1)
            ]),
            l("div", c2, [
              M[4] || (M[4] = l("span", { class: "kpi-label" }, "Successfully Notified", -1)),
              l("span", d2, $(T(X)(u.value.notification_sent)), 1),
              l("span", u2, $(v(u.value.notification_sent, f.value)), 1)
            ]),
            l("div", h2, [
              M[5] || (M[5] = l("span", { class: "kpi-label" }, "Not Notified", -1)),
              l("span", f2, $(T(X)(p.value)), 1),
              l("span", g2, $(v(p.value, f.value)), 1)
            ]),
            l("div", p2, [
              M[6] || (M[6] = l("span", { class: "kpi-label" }, "Main Failure Reason", -1)),
              l("span", v2, $(h.value.reason), 1),
              l("span", b2, $(T(X)(h.value.count)) + " cases", 1)
            ])
          ]),
          l("section", m2, [
            M[8] || (M[8] = l("div", { class: "chart-header" }, [
              l("h4", { class: "section-title" }, "Passenger Disruption Funnel")
            ], -1)),
            l("div", y2, [
              _.value.nodes.length > 0 && _.value.links.length > 0 ? (y(), dt(_e, {
                key: 0,
                data: _.value,
                "node-colors": g,
                height: "350px"
              }, null, 8, ["data"])) : (y(), x("div", _2, [...M[7] || (M[7] = [
                l("p", { class: "empty-chart-text" }, "No processing data available for visualization", -1)
              ])]))
            ])
          ]),
          m.value.length > 0 ? (y(), x("section", x2, [
            M[10] || (M[10] = l("div", { class: "section-header" }, [
              l("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
            ], -1)),
            l("div", k2, [
              l("table", w2, [
                M[9] || (M[9] = l("thead", null, [
                  l("tr", { class: "table-header-row" }, [
                    l("th", { class: "table-header text-left" }, "Reason"),
                    l("th", { class: "table-header text-center" }, "Count"),
                    l("th", { class: "table-header text-center" }, "Impact")
                  ])
                ], -1)),
                l("tbody", $2, [
                  (y(!0), x(K, null, J(m.value, (S) => (y(), x("tr", {
                    key: S.reason,
                    class: "table-row"
                  }, [
                    l("td", M2, $(S.reason), 1),
                    l("td", C2, $(T(X)(S.count)), 1),
                    l("td", S2, [
                      l("div", D2, [
                        l("div", {
                          class: "impact-bar",
                          style: ft({ width: S.impactPct + "%" })
                        }, null, 4),
                        l("span", A2, $(S.impactPct) + "%", 1)
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ])
          ])) : E("", !0),
          b.value.labels.length > 0 ? (y(), x("section", T2, [
            M[11] || (M[11] = l("div", { class: "chart-header" }, [
              l("h4", { class: "section-title" }, "Notification Success Rate by Day")
            ], -1)),
            l("div", B2, [
              Q(ye, {
                data: b.value,
                options: k.value
              }, null, 8, ["data", "options"])
            ])
          ])) : E("", !0),
          l("details", L2, [
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
            l("div", F2, [
              l("div", P2, [
                l("div", I2, [
                  M[12] || (M[12] = l("span", { class: "sys-label" }, "Docs Started", -1)),
                  l("span", E2, $(T(X)(d.value.processing_started)), 1)
                ]),
                l("div", R2, [
                  M[13] || (M[13] = l("span", { class: "sys-label" }, "Docs Completed", -1)),
                  l("span", O2, $(T(X)(d.value.processing_completed)), 1)
                ]),
                l("div", V2, [
                  M[14] || (M[14] = l("span", { class: "sys-label" }, "Docs Failed", -1)),
                  l("span", z2, $(T(X)(d.value.processing_failed)), 1)
                ]),
                l("div", N2, [
                  M[15] || (M[15] = l("span", { class: "sys-label" }, "Processing Started", -1)),
                  l("span", W2, $(T(X)(u.value.processing_started)), 1)
                ]),
                l("div", H2, [
                  M[16] || (M[16] = l("span", { class: "sys-label" }, "Processing Success", -1)),
                  l("span", j2, $(T(X)(u.value.processing_success)), 1)
                ]),
                l("div", Y2, [
                  M[17] || (M[17] = l("span", { class: "sys-label" }, "Notification Failed", -1)),
                  l("span", q2, $(T(X)(u.value.notification_failed)), 1)
                ])
              ])
            ])
          ]),
          e.enableExport ? (y(), dt(T(kt), {
            key: 2,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ], 64)) : (y(), x("section", U2, [...M[19] || (M[19] = [
          st('<div class="empty-state-content" data-v-d8baf32c><div class="empty-icon-wrapper" data-v-d8baf32c><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d8baf32c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" data-v-d8baf32c></path></svg></div><p class="empty-title" data-v-d8baf32c>No disruption notifier data</p><p class="empty-description" data-v-d8baf32c>No disruption notification data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), X2 = /* @__PURE__ */ nt(K2, [["__scopeId", "data-v-d8baf32c"]]), G2 = { class: "card-header" }, Z2 = {
  key: 0,
  class: "loading-state"
}, Q2 = {
  key: 1,
  class: "card-body"
}, J2 = { class: "metric-value" }, tx = /* @__PURE__ */ tt({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s } = ct(lt(a, "theme")), n = C(() => X(a.totalConversations)), o = C(
      () => a.previousTotalConversations !== null && a.previousTotalConversations !== void 0
    ), i = C(() => {
      if (!o.value) return 0;
      const d = a.previousTotalConversations;
      return d === 0 ? a.totalConversations > 0 ? 100 : 0 : (a.totalConversations - d) / d * 100;
    }), r = C(() => `${i.value > 0 ? "+" : ""}${i.value.toFixed(1)}% vs prev.`), c = C(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: s, changePercent: i }), (d, u) => (y(), x("article", {
      class: q(["highlight-card", { "highlight-card--dark": T(s) }])
    }, [
      l("header", G2, [
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
        }, $(r.value), 3)) : E("", !0)
      ]),
      e.loading ? (y(), x("div", Z2, [...u[1] || (u[1] = [
        l("div", { class: "shimmer shimmer-value" }, null, -1),
        l("div", { class: "shimmer shimmer-label" }, null, -1)
      ])])) : (y(), x("div", Q2, [
        l("span", J2, $(n.value), 1),
        u[2] || (u[2] = l("span", { class: "metric-label" }, "Total Conversations", -1))
      ]))
    ], 2));
  }
}), ex = /* @__PURE__ */ nt(tx, [["__scopeId", "data-v-cd9dd1ba"]]), ax = { class: "card-header" }, sx = {
  key: 0,
  class: "loading-state"
}, nx = {
  key: 1,
  class: "card-body"
}, ox = { class: "metric-value" }, ix = /* @__PURE__ */ tt({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s } = ct(lt(a, "theme")), n = C(() => `${a.csatP95.toFixed(1)}`), o = C(
      () => a.previousCsatP95 !== null && a.previousCsatP95 !== void 0
    ), i = C(() => {
      if (!o.value) return 0;
      const d = a.previousCsatP95;
      return d === 0 ? a.csatP95 > 0 ? 100 : 0 : (a.csatP95 - d) / d * 100;
    }), r = C(() => `${i.value > 0 ? "+" : ""}${i.value.toFixed(1)}% vs prev.`), c = C(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: s, changePercent: i }), (d, u) => (y(), x("article", {
      class: q(["highlight-card", { "highlight-card--dark": T(s) }])
    }, [
      l("header", ax, [
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
        }, $(r.value), 3)) : E("", !0)
      ]),
      e.loading ? (y(), x("div", sx, [...u[1] || (u[1] = [
        l("div", { class: "shimmer shimmer-value" }, null, -1),
        l("div", { class: "shimmer shimmer-label" }, null, -1)
      ])])) : (y(), x("div", nx, [
        l("span", ox, $(n.value), 1),
        u[2] || (u[2] = l("span", { class: "metric-label" }, "CSAT P95", -1))
      ]))
    ], 2));
  }
}), rx = /* @__PURE__ */ nt(ix, [["__scopeId", "data-v-e36f6025"]]), lx = { class: "card-header" }, cx = {
  key: 0,
  class: "loading-state"
}, dx = {
  key: 1,
  class: "card-body"
}, ux = { class: "metric-value" }, hx = /* @__PURE__ */ tt({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s } = ct(lt(a, "theme")), n = C(() => `${a.currencyCode} ${Qt(a.totalRevenue)}`), o = C(
      () => a.previousTotalRevenue !== null && a.previousTotalRevenue !== void 0
    ), i = C(() => {
      if (!o.value) return 0;
      const d = a.previousTotalRevenue;
      return d === 0 ? a.totalRevenue > 0 ? 100 : 0 : (a.totalRevenue - d) / d * 100;
    }), r = C(() => `${i.value > 0 ? "+" : ""}${i.value.toFixed(1)}% vs prev.`), c = C(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: s, changePercent: i }), (d, u) => (y(), x("article", {
      class: q(["highlight-card", { "highlight-card--dark": T(s) }])
    }, [
      l("header", lx, [
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
        }, $(r.value), 3)) : E("", !0)
      ]),
      e.loading ? (y(), x("div", cx, [...u[1] || (u[1] = [
        l("div", { class: "shimmer shimmer-value" }, null, -1),
        l("div", { class: "shimmer shimmer-label" }, null, -1)
      ])])) : (y(), x("div", dx, [
        l("span", ux, $(n.value), 1),
        u[2] || (u[2] = l("span", { class: "metric-label" }, "AI-Generated Revenue", -1))
      ]))
    ], 2));
  }
}), fx = /* @__PURE__ */ nt(hx, [["__scopeId", "data-v-a642a31c"]]), gx = { class: "nps-daily-card" }, px = { class: "card-header" }, vx = { class: "header-content" }, bx = {
  key: 0,
  class: "stats-badge"
}, mx = { class: "badge-value" }, yx = {
  key: 0,
  class: "loading-state"
}, _x = {
  key: 1,
  class: "card-body"
}, xx = { class: "tooltip-content" }, kx = { class: "tooltip-title" }, wx = { class: "tooltip-stats" }, $x = { class: "tooltip-stat-row" }, Mx = { class: "tooltip-value" }, Cx = { class: "tooltip-stat-row" }, Sx = { class: "tooltip-value" }, Dx = { class: "tooltip-stat-row" }, Ax = { class: "tooltip-value" }, Tx = { class: "tooltip-stat-row" }, Bx = { class: "tooltip-value" }, Lx = { class: "tooltip-stat-row" }, Fx = { class: "tooltip-value" }, Px = { class: "tooltip-stat-row" }, Ix = { class: "tooltip-value" }, Ex = {
  key: 2,
  class: "empty-state"
}, Do = 400, Je = 60, Ao = 90, To = 120, Rx = {
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
    }, o = e, { isDark: i } = ct(lt(o, "theme")), r = C(() => o.data), c = at(null), d = at({
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
      return Math.max(800, Je * 2 + _ * To);
    }), f = (_, g) => {
      const k = (_ - 1) / 9;
      return Je + g - k * g;
    }, p = (_) => _ ? Dt(_).format("DD-MM-YYYY") : "", v = C(() => {
      if (!r.value || !r.value.nps_by_day || r.value.nps_by_day.length === 0)
        return [];
      const _ = [], g = Do - Je - Ao;
      return r.value.nps_by_day.forEach((b, k) => {
        const w = b.min_score || 0, M = b.q1_score || 0, S = b.median_score || 0, D = b.q3_score || 0, A = b.max_score || 0, B = b.average_score || 0;
        _.push({
          label: p(b.date),
          responseCount: b.nps_responses_count || 0,
          isTotal: !1,
          low: w,
          q1: M,
          median: S,
          q3: D,
          high: A,
          average: B,
          highY: f(A, g),
          lowY: f(w, g),
          q1Y: f(M, g),
          q3Y: f(D, g),
          medianY: f(S, g),
          averageY: B > 0 ? f(B, g) : null,
          centerX: Je + (k + 1) * To
        });
      }), _;
    }), h = (_, g) => {
      if (!c.value || !g || g.horizontal) return;
      const b = c.value.getBoundingClientRect(), k = _.clientX, w = _.clientY, M = 140, S = 160, D = 10, A = 15;
      let B = k - b.left - M / 2, F = w - b.top - S - A;
      B = Math.max(D, Math.min(B, b.width - M - D)), F < D && (F = w - b.top + A), F = Math.max(D, Math.min(F, b.height - S - D)), d.value = {
        visible: !0,
        x: B,
        y: F,
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
    return t({ isDark: i }), (_, g) => (y(), x("article", gx, [
      l("header", px, [
        l("div", vx, [
          g[1] || (g[1] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "CSAT Daily Metrics"),
            l("p", { class: "card-subtitle" }, "Daily CSAT Distribution")
          ], -1)),
          r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (y(), x("div", bx, [
            g[0] || (g[0] = l("p", { class: "badge-label" }, "Days", -1)),
            l("p", mx, $(r.value.nps_by_day.length), 1)
          ])) : E("", !0)
        ])
      ]),
      o.loading ? (y(), x("div", yx, [...g[2] || (g[2] = [
        st('<div class="loading-container" data-v-b20112a7><div class="chart-flow-loader" data-v-b20112a7><div class="flow-line flow-1" data-v-b20112a7></div><div class="flow-line flow-2" data-v-b20112a7></div><div class="flow-line flow-3" data-v-b20112a7></div><div class="flow-line flow-4" data-v-b20112a7></div><div class="flow-line flow-5" data-v-b20112a7></div></div><p class="loading-text" data-v-b20112a7>Loading daily NPS data...</p></div>', 1)
      ])])) : r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (y(), x("div", _x, [
        l("div", {
          class: "chart-wrapper",
          ref_key: "chartContainerRef",
          ref: c
        }, [
          v.value && v.value.length > 0 ? (y(), dt(Ri, {
            key: 0,
            "candlestick-data": v.value,
            "chart-width": u.value,
            "chart-height": Do,
            "chart-margin": Je,
            "chart-bottom-margin": Ao,
            "show-legend": !0,
            rotation: 0,
            "candle-width": 30,
            onCandleHover: h,
            onCandleLeave: m
          }, null, 8, ["candlestick-data", "chart-width"])) : E("", !0),
          d.value.visible ? (y(), x("div", {
            key: 1,
            class: "tooltip-overlay",
            style: ft({
              left: `${d.value.x}px`,
              top: `${d.value.y}px`
            })
          }, [
            l("div", xx, [
              l("div", kx, $(d.value.date), 1),
              g[9] || (g[9] = l("div", { class: "tooltip-divider" }, null, -1)),
              l("div", wx, [
                l("div", $x, [
                  g[3] || (g[3] = l("span", { class: "tooltip-label tooltip-min" }, "Min:", -1)),
                  l("span", Mx, $(d.value.min), 1)
                ]),
                l("div", Cx, [
                  g[4] || (g[4] = l("span", { class: "tooltip-label tooltip-q1" }, "Q1:", -1)),
                  l("span", Sx, $(d.value.q1), 1)
                ]),
                l("div", Dx, [
                  g[5] || (g[5] = l("span", { class: "tooltip-label tooltip-median" }, "Median:", -1)),
                  l("span", Ax, $(d.value.median), 1)
                ]),
                l("div", Tx, [
                  g[6] || (g[6] = l("span", { class: "tooltip-label tooltip-avg" }, "Avg:", -1)),
                  l("span", Bx, $(d.value.avg), 1)
                ]),
                l("div", Lx, [
                  g[7] || (g[7] = l("span", { class: "tooltip-label tooltip-q3" }, "Q3:", -1)),
                  l("span", Fx, $(d.value.q3), 1)
                ]),
                l("div", Px, [
                  g[8] || (g[8] = l("span", { class: "tooltip-label tooltip-max" }, "Max:", -1)),
                  l("span", Ix, $(d.value.max), 1)
                ])
              ])
            ])
          ], 4)) : E("", !0)
        ], 512),
        e.enableExport ? (y(), dt(T(kt), {
          key: 0,
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ])) : (y(), x("div", Ex, [...g[10] || (g[10] = [
        st('<div class="empty-state-content" data-v-b20112a7><div class="empty-icon-wrapper" data-v-b20112a7><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-b20112a7><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-b20112a7></path></svg></div><p class="empty-title" data-v-b20112a7>No daily NPS data available</p><p class="empty-description" data-v-b20112a7>No daily NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, Wi = /* @__PURE__ */ nt(Rx, [["__scopeId", "data-v-b20112a7"]]), Ox = { class: "nps-overview-card" }, Vx = { class: "card-header" }, zx = { class: "header-content" }, Nx = { class: "header-badges" }, Wx = {
  key: 0,
  class: "stats-badge"
}, Hx = { class: "badge-value" }, jx = {
  key: 1,
  class: "stats-badge"
}, Yx = { class: "badge-value" }, qx = {
  key: 0,
  class: "loading-state"
}, Ux = {
  key: 1,
  class: "card-body"
}, Kx = { class: "chart-wrapper" }, Xx = {
  key: 2,
  class: "empty-state"
}, Gx = 500, Zx = 60, Qx = 80, Jx = {
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
    }, o = e, { isDark: i } = ct(lt(o, "theme")), r = C(() => o.data), c = C(() => Math.max(600, window.innerWidth * 0.85));
    return t({ isDark: i }), (d, u) => (y(), x("article", Ox, [
      l("header", Vx, [
        l("div", zx, [
          u[2] || (u[2] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "CSAT Overview Metrics"),
            l("p", { class: "card-subtitle" }, "Overall CSAT Distribution")
          ], -1)),
          l("div", Nx, [
            r.value && r.value.total_nps_responses > 0 ? (y(), x("div", Wx, [
              u[0] || (u[0] = l("p", { class: "badge-label" }, "Responses", -1)),
              l("p", Hx, $(r.value.total_nps_responses), 1)
            ])) : E("", !0),
            r.value && r.value.p95_score > 0 ? (y(), x("div", jx, [
              u[1] || (u[1] = l("p", { class: "badge-label" }, "Percentile 95", -1)),
              l("p", Yx, $(r.value.p95_score || 0), 1)
            ])) : E("", !0)
          ])
        ])
      ]),
      o.loading ? (y(), x("div", qx, [...u[3] || (u[3] = [
        st('<div class="loading-container" data-v-30fe5f88><div class="chart-flow-loader" data-v-30fe5f88><div class="flow-line flow-1" data-v-30fe5f88></div><div class="flow-line flow-2" data-v-30fe5f88></div><div class="flow-line flow-3" data-v-30fe5f88></div><div class="flow-line flow-4" data-v-30fe5f88></div><div class="flow-line flow-5" data-v-30fe5f88></div></div><p class="loading-text" data-v-30fe5f88>Loading NPS data...</p></div>', 1)
      ])])) : r.value && r.value.total_nps_responses > 0 ? (y(), x("div", Ux, [
        l("div", Kx, [
          Q(Oi, {
            histogram: r.value.histogram || [],
            "min-score": r.value.min_score || 0,
            "max-score": r.value.max_score || 0,
            "q1-score": r.value.q1_score || 0,
            "median-score": r.value.median_score || 0,
            "q3-score": r.value.q3_score || 0,
            "average-score": r.value.average_score || 0,
            "chart-width": c.value,
            "chart-height": Gx,
            "chart-margin": Zx,
            "chart-bottom-margin": Qx
          }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score", "chart-width"])
        ]),
        e.enableExport ? (y(), dt(T(kt), {
          key: 0,
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ])) : (y(), x("div", Xx, [...u[4] || (u[4] = [
        st('<div class="empty-state-content" data-v-30fe5f88><div class="empty-icon-wrapper" data-v-30fe5f88><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-30fe5f88><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-30fe5f88></path></svg></div><p class="empty-title" data-v-30fe5f88>No NPS data available</p><p class="empty-description" data-v-30fe5f88>No NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, Hi = /* @__PURE__ */ nt(Jx, [["__scopeId", "data-v-30fe5f88"]]), tk = { class: "nps-metrics-container" }, ek = {
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
    return (n, o) => (y(), x("div", tk, [
      Q(Hi, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: s
      }, null, 8, ["data", "loading", "enable-export"]),
      Q(Wi, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: s
      }, null, 8, ["data", "loading", "enable-export"])
    ]));
  }
}, ak = /* @__PURE__ */ nt(ek, [["__scopeId", "data-v-25fe3b80"]]), sk = { class: "aws-cost-card" }, nk = { class: "card-header" }, ok = { class: "header-main" }, ik = { class: "header-content" }, rk = { class: "card-title" }, lk = { class: "header-stats" }, ck = { class: "stat-badge primary" }, dk = { class: "stat-value" }, uk = { class: "stat-badge secondary" }, hk = { class: "stat-value" }, fk = { class: "card-body" }, gk = {
  key: 0,
  class: "loading-state"
}, pk = {
  key: 1,
  class: "chart-section"
}, vk = { class: "chart-container" }, bk = {
  key: 2,
  class: "empty-state"
}, mk = { class: "empty-state-content" }, yk = { class: "empty-icon-wrapper" }, _k = {
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
    const t = e, { isDark: a, colors: s } = ct(lt(t, "theme")), n = C(() => {
      const r = t.data ?? {}, c = r.daily, d = r.days, u = Array.isArray(c) && c.length > 0, f = Array.isArray(d) && d.length > 0 && Array.isArray(r.allocatedCostSeries) && r.allocatedCostSeries.length === d.length;
      let p = [];
      return u ? p = c : f && (p = d.map((v, h) => ({
        date: v,
        allocated_cost: r.allocatedCostSeries[h] ?? 0,
        aws_cost: r.awsCostSeries[h] ?? 0,
        airline_conversations: r.airlineConversationsSeries[h] ?? 0
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
    return (r, c) => (y(), x("article", sk, [
      l("header", nk, [
        l("div", ok, [
          l("div", ik, [
            l("h3", rk, $(n.value.airline_name || "AWS Cost"), 1),
            c[0] || (c[0] = l("p", { class: "card-subtitle" }, "AWS vs Allocated costs over time", -1))
          ]),
          l("div", lk, [
            l("div", ck, [
              c[1] || (c[1] = l("span", { class: "stat-label" }, "Total Allocated", -1)),
              l("span", dk, $(T(bt)(n.value.total_allocated_cost)), 1)
            ]),
            l("div", uk, [
              c[2] || (c[2] = l("span", { class: "stat-label" }, "Total AWS", -1)),
              l("span", hk, $(T(bt)(n.value.total_cost)), 1)
            ])
          ])
        ])
      ]),
      l("div", fk, [
        e.loading ? (y(), x("div", gk, [...c[3] || (c[3] = [
          st('<div class="loading-container" data-v-c023bd59><div class="chart-lines-loader" data-v-c023bd59><div class="line line-1" data-v-c023bd59></div><div class="line line-2" data-v-c023bd59></div><div class="line line-3" data-v-c023bd59></div><div class="line line-4" data-v-c023bd59></div><div class="line line-5" data-v-c023bd59></div></div><p class="loading-text" data-v-c023bd59>Loading chart data...</p></div>', 1)
        ])])) : n.value.daily.length > 0 ? (y(), x("div", pk, [
          l("div", vk, [
            Q(ye, {
              data: o.value,
              options: i.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", bk, [
          l("div", mk, [
            l("div", yk, [
              Q(T(Vt), { class: "empty-icon" })
            ]),
            c[4] || (c[4] = l("p", { class: "empty-title" }, "Sin datos de costos", -1)),
            c[5] || (c[5] = l("p", { class: "empty-description" }, "No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas.", -1))
          ])
        ]))
      ])
    ]));
  }
}, xk = /* @__PURE__ */ nt(_k, [["__scopeId", "data-v-c023bd59"]]), kk = { class: "cost-usage-card" }, wk = {
  key: 0,
  class: "card-body"
}, $k = {
  key: 0,
  class: "chart-section"
}, Mk = { class: "chart-container" }, Ck = { class: "kpi-grid" }, Sk = { class: "kpi-card" }, Dk = { class: "kpi-value" }, Ak = { class: "kpi-card" }, Tk = { class: "kpi-value" }, Bk = { class: "kpi-card" }, Lk = { class: "kpi-value" }, Fk = { class: "kpi-card" }, Pk = { class: "kpi-value" }, Ik = { class: "kpi-card" }, Ek = { class: "kpi-value" }, Rk = { class: "kpi-card highlighted" }, Ok = { class: "kpi-value gradient-text" }, Vk = {
  key: 1,
  class: "empty-state"
}, zk = { class: "empty-state-content" }, Nk = { class: "empty-icon-wrapper" }, Wk = {
  key: 1,
  class: "loading-state"
}, Hk = /* @__PURE__ */ tt({
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
    const s = e, { isDark: n, colors: o } = ct(lt(s, "theme")), i = (h) => {
      const m = new Date(h), _ = String(m.getDate()).padStart(2, "0"), g = String(m.getMonth() + 1).padStart(2, "0");
      return `${_}-${g}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, c = C(() => {
      const h = s.data?.costs_by_day || {};
      return Object.values(h).reduce((m, _) => m + (_.input_cost || 0), 0);
    }), d = C(() => {
      const h = s.data?.costs_by_day || {};
      return Object.values(h).reduce((m, _) => m + (_.output_cost || 0), 0);
    }), u = C(() => {
      const h = s.data?.costs_by_day || {};
      return Object.values(h).reduce((m, _) => m + (_.cache_read_cost || 0), 0);
    }), f = C(() => {
      const h = s.data?.costs_by_day || {};
      return Object.values(h).reduce((m, _) => m + (_.cache_write_cost || 0), 0);
    }), p = C(() => {
      const h = s.data?.costs_by_day || {}, m = Object.keys(h).sort();
      if (m.length === 0)
        return { labels: [], datasets: [] };
      const _ = m.map((b) => i(b)), g = [
        {
          label: "Input Cost",
          data: m.map((b) => h[b]?.input_cost || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: m.map((b) => h[b]?.output_cost || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: m.map((b) => h[b]?.cache_read_cost || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: m.map((b) => h[b]?.cache_write_cost || 0),
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
            label: function(h) {
              let m = h.dataset.label || "";
              return m && (m += ": "), h.parsed.y !== null && (m += bt(h.parsed.y)), m;
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
            callback: function(h) {
              return bt(h);
            }
          }
        }
      }
    });
    return t({ isDark: n }), (h, m) => (y(), x("article", kk, [
      m[9] || (m[9] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Cost Usage"),
          l("p", { class: "card-subtitle" }, "Cost breakdown over time (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Wk, [...m[8] || (m[8] = [
        st('<div class="loading-container" data-v-62f96954><div class="chart-lines-loader" data-v-62f96954><div class="line line-1" data-v-62f96954></div><div class="line line-2" data-v-62f96954></div><div class="line line-3" data-v-62f96954></div><div class="line line-4" data-v-62f96954></div><div class="line line-5" data-v-62f96954></div></div><p class="loading-text" data-v-62f96954>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", wk, [
        p.value.labels && p.value.labels.length ? (y(), x("section", $k, [
          l("div", Mk, [
            Q(re, {
              data: p.value,
              options: v.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          l("footer", Ck, [
            l("div", Sk, [
              m[0] || (m[0] = l("span", { class: "kpi-label" }, "Total Cost", -1)),
              l("span", Dk, $(T(bt)(e.data.total_cost)), 1)
            ]),
            l("div", Ak, [
              m[1] || (m[1] = l("span", { class: "kpi-label" }, "Input Cost", -1)),
              l("span", Tk, $(T(bt)(c.value)), 1)
            ]),
            l("div", Bk, [
              m[2] || (m[2] = l("span", { class: "kpi-label" }, "Output Cost", -1)),
              l("span", Lk, $(T(bt)(d.value)), 1)
            ]),
            l("div", Fk, [
              m[3] || (m[3] = l("span", { class: "kpi-label" }, "Cache Read", -1)),
              l("span", Pk, $(T(bt)(u.value)), 1)
            ]),
            l("div", Ik, [
              m[4] || (m[4] = l("span", { class: "kpi-label" }, "Cache Write", -1)),
              l("span", Ek, $(T(bt)(f.value)), 1)
            ]),
            l("div", Rk, [
              m[5] || (m[5] = l("span", { class: "kpi-label" }, "Avg / Conv.", -1)),
              l("span", Ok, $(T(bt)(e.data.avg_cost_per_conversation)), 1)
            ])
          ])
        ])) : (y(), x("section", Vk, [
          l("div", zk, [
            l("div", Nk, [
              Q(T(Vt), { class: "empty-icon" })
            ]),
            m[6] || (m[6] = l("p", { class: "empty-title" }, "No cost usage data", -1)),
            m[7] || (m[7] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), jk = /* @__PURE__ */ nt(Hk, [["__scopeId", "data-v-62f96954"]]), Yk = { class: "token-usage-card" }, qk = {
  key: 0,
  class: "card-body"
}, Uk = {
  key: 0,
  class: "chart-section"
}, Kk = { class: "chart-container" }, Xk = { class: "kpi-grid" }, Gk = { class: "kpi-card" }, Zk = { class: "kpi-value" }, Qk = { class: "kpi-card" }, Jk = { class: "kpi-value" }, t5 = { class: "kpi-card" }, e5 = { class: "kpi-value" }, a5 = { class: "kpi-card" }, s5 = { class: "kpi-value" }, n5 = { class: "kpi-card" }, o5 = { class: "kpi-value" }, i5 = {
  key: 1,
  class: "empty-state"
}, r5 = { class: "empty-state-content" }, l5 = { class: "empty-icon-wrapper" }, c5 = {
  key: 1,
  class: "loading-state"
}, d5 = /* @__PURE__ */ tt({
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
    const s = e, { isDark: n, colors: o } = ct(lt(s, "theme")), i = (u) => {
      const f = new Date(u), p = String(f.getDate()).padStart(2, "0"), v = String(f.getMonth() + 1).padStart(2, "0");
      return `${p}-${v}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, c = C(() => {
      const u = s.data?.tokens_by_day || {}, f = Object.keys(u).sort();
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const p = f.map((h) => i(h)), v = [
        {
          label: "Input Tokens",
          data: f.map((h) => u[h]?.input_tokens || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: f.map((h) => u[h]?.output_tokens || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: f.map((h) => u[h]?.cache_read_tokens || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: f.map((h) => u[h]?.cache_write_tokens || 0),
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
    return t({ isDark: n }), (u, f) => (y(), x("article", Yk, [
      f[8] || (f[8] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Token Usage"),
          l("p", { class: "card-subtitle" }, "Token consumption over time (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", c5, [...f[7] || (f[7] = [
        st('<div class="loading-container" data-v-e9e355be><div class="chart-lines-loader" data-v-e9e355be><div class="line line-1" data-v-e9e355be></div><div class="line line-2" data-v-e9e355be></div><div class="line line-3" data-v-e9e355be></div><div class="line line-4" data-v-e9e355be></div><div class="line line-5" data-v-e9e355be></div></div><p class="loading-text" data-v-e9e355be>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", qk, [
        c.value.labels && c.value.labels.length ? (y(), x("section", Uk, [
          l("div", Kk, [
            Q(re, {
              data: c.value,
              options: d.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          l("footer", Xk, [
            l("div", Gk, [
              f[0] || (f[0] = l("span", { class: "kpi-label" }, "Total Tokens", -1)),
              l("span", Zk, $(T(X)(e.data.total_tokens)), 1)
            ]),
            l("div", Qk, [
              f[1] || (f[1] = l("span", { class: "kpi-label" }, "Input", -1)),
              l("span", Jk, $(T(X)(e.data.total_input_tokens)), 1)
            ]),
            l("div", t5, [
              f[2] || (f[2] = l("span", { class: "kpi-label" }, "Output", -1)),
              l("span", e5, $(T(X)(e.data.total_output_tokens)), 1)
            ]),
            l("div", a5, [
              f[3] || (f[3] = l("span", { class: "kpi-label" }, "Cache Read", -1)),
              l("span", s5, $(T(X)(e.data.total_cache_read_tokens)), 1)
            ]),
            l("div", n5, [
              f[4] || (f[4] = l("span", { class: "kpi-label" }, "Cache Write", -1)),
              l("span", o5, $(T(X)(e.data.total_cache_write_tokens)), 1)
            ])
          ])
        ])) : (y(), x("section", i5, [
          l("div", r5, [
            l("div", l5, [
              Q(T(Vt), { class: "empty-icon" })
            ]),
            f[5] || (f[5] = l("p", { class: "empty-title" }, "No token usage data", -1)),
            f[6] || (f[6] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see token consumption trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), u5 = /* @__PURE__ */ nt(d5, [["__scopeId", "data-v-e9e355be"]]), h5 = { class: "conversation-count-card" }, f5 = { class: "card-header" }, g5 = { class: "header-right" }, p5 = { class: "stat-badge" }, v5 = { class: "stat-value" }, b5 = {
  key: 0,
  class: "card-body"
}, m5 = {
  key: 0,
  class: "chart-section"
}, y5 = { class: "chart-container" }, _5 = {
  key: 1,
  class: "empty-state"
}, x5 = { class: "empty-state-content" }, k5 = { class: "empty-icon-wrapper" }, w5 = {
  key: 1,
  class: "loading-state"
}, $5 = /* @__PURE__ */ tt({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s, colors: n } = ct(lt(a, "theme")), o = (c) => {
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
      const u = d.map((p) => o(p)), f = [
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
        datasets: f
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
    return t({ isDark: s }), (c, d) => (y(), x("article", h5, [
      l("header", f5, [
        d[1] || (d[1] = l("div", { class: "header-left" }, [
          l("div", { class: "header-content" }, [
            l("h3", { class: "card-title" }, "Conversation Count"),
            l("p", { class: "card-subtitle" }, "Conversations over time")
          ])
        ], -1)),
        l("div", g5, [
          l("div", p5, [
            d[0] || (d[0] = l("span", { class: "stat-label" }, "Total", -1)),
            l("span", v5, $(e.data.total_conversations || 0), 1)
          ])
        ])
      ]),
      e.loading ? (y(), x("div", w5, [...d[4] || (d[4] = [
        st('<div class="loading-container" data-v-846f24b1><div class="chart-lines-loader" data-v-846f24b1><div class="line line-1" data-v-846f24b1></div><div class="line line-2" data-v-846f24b1></div><div class="line line-3" data-v-846f24b1></div><div class="line line-4" data-v-846f24b1></div><div class="line line-5" data-v-846f24b1></div></div><p class="loading-text" data-v-846f24b1>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", b5, [
        i.value.labels && i.value.labels.length ? (y(), x("section", m5, [
          l("div", y5, [
            Q(ye, {
              data: i.value,
              options: r.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", _5, [
          l("div", x5, [
            l("div", k5, [
              Q(T(Vt), { class: "empty-icon" })
            ]),
            d[2] || (d[2] = l("p", { class: "empty-title" }, "No conversation count data", -1)),
            d[3] || (d[3] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), M5 = /* @__PURE__ */ nt($5, [["__scopeId", "data-v-846f24b1"]]), C5 = { class: "top-agents-card" }, S5 = {
  key: 0,
  class: "card-body"
}, D5 = {
  key: 0,
  class: "charts-grid"
}, A5 = { class: "chart-section" }, T5 = { class: "chart-container" }, B5 = { class: "chart-section" }, L5 = { class: "chart-container" }, F5 = {
  key: 1,
  class: "empty-state"
}, P5 = { class: "empty-state-content" }, I5 = { class: "empty-icon-wrapper" }, E5 = {
  key: 1,
  class: "loading-state"
}, R5 = /* @__PURE__ */ tt({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s, colors: n } = ct(lt(a, "theme")), o = C(() => a.data?.top_agents && a.data.top_agents.length > 0), i = C(() => a.data?.top_agents ? [...a.data.top_agents].sort((p, v) => (v.total_cost || 0) - (p.total_cost || 0)) : []), r = C(() => a.data?.top_agents ? [...a.data.top_agents].sort((p, v) => (v.total_tokens || 0) - (p.total_tokens || 0)) : []), c = C(() => {
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
              const v = p.label, h = a.data?.top_agents?.find((m) => m.agent_type === v);
              return h ? [
                `Total Cost: ${bt(h.total_cost)}`,
                `Input Cost: ${bt(h.total_input_tokens_cost)}`,
                `Output Cost: ${bt(h.total_output_tokens_cost)}`,
                `Cache Read: ${bt(h.total_read_tokens_cost)}`,
                `Cache Write: ${bt(h.total_write_tokens_cost)}`
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
    }), f = C(() => a.options ? a.options : {
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
              const v = p.label, h = a.data?.top_agents?.find((m) => m.agent_type === v);
              return h ? [
                `Total Tokens: ${h.total_tokens.toLocaleString()}`,
                `Input Tokens: ${h.total_input_tokens.toLocaleString()}`,
                `Output Tokens: ${h.total_output_tokens.toLocaleString()}`,
                `Cache Read: ${h.total_read_tokens.toLocaleString()}`,
                `Cache Write: ${h.total_write_tokens.toLocaleString()}`
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
    return t({ isDark: s }), (p, v) => (y(), x("article", C5, [
      v[5] || (v[5] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Top Agents Analysis"),
          l("p", { class: "card-subtitle" }, "Cost and token usage by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", E5, [...v[4] || (v[4] = [
        st('<div class="loading-container" data-v-78efa6dc><div class="chart-lines-loader" data-v-78efa6dc><div class="line line-1" data-v-78efa6dc></div><div class="line line-2" data-v-78efa6dc></div><div class="line line-3" data-v-78efa6dc></div><div class="line line-4" data-v-78efa6dc></div><div class="line line-5" data-v-78efa6dc></div></div><p class="loading-text" data-v-78efa6dc>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", S5, [
        o.value ? (y(), x("div", D5, [
          l("section", A5, [
            v[0] || (v[0] = l("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
            l("div", T5, [
              Q(re, {
                data: c.value,
                options: u.value
              }, null, 8, ["data", "options"])
            ])
          ]),
          l("section", B5, [
            v[1] || (v[1] = l("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
            l("div", L5, [
              Q(re, {
                data: d.value,
                options: f.value
              }, null, 8, ["data", "options"])
            ])
          ])
        ])) : (y(), x("section", F5, [
          l("div", P5, [
            l("div", I5, [
              Q(T(Vt), { class: "empty-icon" })
            ]),
            v[2] || (v[2] = l("p", { class: "empty-title" }, "No top agents data", -1)),
            v[3] || (v[3] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), O5 = /* @__PURE__ */ nt(R5, [["__scopeId", "data-v-78efa6dc"]]), V5 = { class: "top-agents-card" }, z5 = {
  key: 0,
  class: "card-body"
}, N5 = {
  key: 0,
  class: "chart-section"
}, W5 = { class: "chart-container" }, H5 = {
  key: 1,
  class: "empty-state"
}, j5 = { class: "empty-state-content" }, Y5 = { class: "empty-icon-wrapper" }, q5 = {
  key: 1,
  class: "loading-state"
}, U5 = /* @__PURE__ */ tt({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s, colors: n } = ct(lt(a, "theme")), o = {
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
      (f) => f.agent_type?.toLowerCase() !== "triage"
    ) : []), r = C(() => i.value.length > 0), c = C(() => i.value.reduce((f, p) => f + (p.conversations || 0), 0)), d = C(() => {
      const f = i.value;
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const p = f.map((m) => {
        const _ = m.agent_type?.toLowerCase();
        return (o[_] || "#a78bfa") + "80";
      }), v = f.map((m) => {
        const _ = m.agent_type?.toLowerCase();
        return o[_] || "#a78bfa";
      });
      return {
        labels: f.map((m) => {
          const _ = m.conversations || 0, g = c.value ? _ / c.value * 100 : 0;
          return `${m.agent_type} - ${_.toLocaleString()} (${g.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: f.map((m) => m.conversations || 0),
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
            label: (f) => {
              const p = (f.label || "").toString(), v = Number(f.parsed) || 0, h = (f.dataset.data || []).reduce((_, g) => _ + (Number(g) || 0), 0), m = h ? v / h * 100 : 0;
              return `${p}: ${v.toLocaleString()} (${m.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: s }), (f, p) => (y(), x("article", V5, [
      p[3] || (p[3] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Top Agents"),
          l("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", q5, [...p[2] || (p[2] = [
        st('<div class="loading-container" data-v-05e3e74d><div class="chart-lines-loader" data-v-05e3e74d><div class="line line-1" data-v-05e3e74d></div><div class="line line-2" data-v-05e3e74d></div><div class="line line-3" data-v-05e3e74d></div><div class="line line-4" data-v-05e3e74d></div><div class="line line-5" data-v-05e3e74d></div></div><p class="loading-text" data-v-05e3e74d>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", z5, [
        r.value ? (y(), x("section", N5, [
          l("div", W5, [
            Q(Qa, {
              data: d.value,
              options: u.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", H5, [
          l("div", j5, [
            l("div", Y5, [
              Q(T(Vt), { class: "empty-icon" })
            ]),
            p[0] || (p[0] = l("p", { class: "empty-title" }, "No top agents data", -1)),
            p[1] || (p[1] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), K5 = /* @__PURE__ */ nt(U5, [["__scopeId", "data-v-05e3e74d"]]), X5 = { class: "daily-cost-trends-card" }, G5 = {
  key: 0,
  class: "card-body"
}, Z5 = {
  key: 0,
  class: "chart-section"
}, Q5 = { class: "chart-container" }, J5 = {
  key: 1,
  class: "empty-state"
}, tw = { class: "empty-state-content" }, ew = { class: "empty-icon-wrapper" }, aw = {
  key: 1,
  class: "loading-state"
}, sw = /* @__PURE__ */ tt({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s, colors: n } = ct(lt(a, "theme")), o = (d) => {
      const u = new Date(d), f = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${f}`;
    }, i = C(() => {
      const d = a.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(d) && d.length > 0)
        return !0;
      const u = a.costData?.costs_by_day || {}, f = a.conversationData?.conversations_by_day || {};
      return Object.keys(u).length > 0 && Object.keys(f).length > 0;
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
      const u = a.costData?.costs_by_day || {}, f = a.conversationData?.conversations_by_day || {}, v = Object.keys(u).filter((_) => f[_]).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const h = v.map((_) => o(_)), m = v.map((_) => {
        const g = u[_]?.total_cost || 0, b = f[_] || 0;
        return b > 0 ? g / b : 0;
      });
      return {
        labels: h,
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
    return t({ isDark: s }), (d, u) => (y(), x("article", X5, [
      u[3] || (u[3] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Daily Cost Trends"),
          l("p", { class: "card-subtitle" }, "Mean USD/conversation per day")
        ])
      ], -1)),
      e.loading ? (y(), x("div", aw, [...u[2] || (u[2] = [
        st('<div class="loading-container" data-v-e5bac1c5><div class="chart-lines-loader" data-v-e5bac1c5><div class="line line-1" data-v-e5bac1c5></div><div class="line line-2" data-v-e5bac1c5></div><div class="line line-3" data-v-e5bac1c5></div><div class="line line-4" data-v-e5bac1c5></div><div class="line line-5" data-v-e5bac1c5></div></div><p class="loading-text" data-v-e5bac1c5>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", G5, [
        i.value ? (y(), x("section", Z5, [
          l("div", Q5, [
            Q(ye, {
              data: r.value,
              options: c.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", J5, [
          l("div", tw, [
            l("div", ew, [
              Q(T(Vt), { class: "empty-icon" })
            ]),
            u[0] || (u[0] = l("p", { class: "empty-title" }, "No daily cost trends data", -1)),
            u[1] || (u[1] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), nw = /* @__PURE__ */ nt(sw, [["__scopeId", "data-v-e5bac1c5"]]), ow = { class: "model-usage-card" }, iw = {
  key: 0,
  class: "loading-state"
}, rw = {
  key: 1,
  class: "card-body"
}, lw = { class: "tabs-container" }, cw = {
  class: "tabs-nav",
  "aria-label": "Model Usage Tabs"
}, dw = ["aria-selected"], uw = ["aria-selected"], hw = {
  key: 0,
  class: "table-section"
}, fw = { class: "table-wrapper" }, gw = { class: "data-table" }, pw = { class: "table-header-row" }, vw = { class: "table-header" }, bw = { class: "table-body" }, mw = { class: "table-cell name-cell" }, yw = { class: "table-cell text-center" }, _w = { class: "table-cell text-center" }, xw = { class: "table-cell text-center" }, kw = { class: "table-cell text-center cost-cell" }, ww = { class: "table-cell text-center" }, $w = {
  key: 1,
  class: "empty-state"
}, Mw = { class: "empty-state-content" }, Cw = { class: "empty-icon-wrapper" }, Sw = /* @__PURE__ */ tt({
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
    const s = e, n = a, o = (f) => {
      n("export", f);
    }, { isDark: i } = ct(lt(s, "theme")), r = at("by_model"), c = C(() => r.value === "by_model" ? s.data?.total_by_model || {} : s.data?.total_by_provider || {}), d = (f) => f == null ? "0" : X(f), u = (f) => f == null ? "$0.00" : bt(f);
    return t({ isDark: i }), (f, p) => (y(), x("article", ow, [
      p[10] || (p[10] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Model Usage"),
          l("p", { class: "card-subtitle" }, "AI model performance and costs")
        ])
      ], -1)),
      e.loading ? (y(), x("div", iw, [...p[2] || (p[2] = [
        st('<div class="loading-container" data-v-a7bf2d7b><div class="chart-bars-loader" data-v-a7bf2d7b><div class="bar bar-1" data-v-a7bf2d7b></div><div class="bar bar-2" data-v-a7bf2d7b></div><div class="bar bar-3" data-v-a7bf2d7b></div><div class="bar bar-4" data-v-a7bf2d7b></div><div class="bar bar-5" data-v-a7bf2d7b></div></div><p class="loading-text" data-v-a7bf2d7b>Loading model usage data...</p></div>', 1)
      ])])) : (y(), x("div", rw, [
        l("div", lw, [
          l("nav", cw, [
            l("button", {
              onClick: p[0] || (p[0] = (v) => r.value = "by_model"),
              class: q(["tab-button", { "tab-active": r.value === "by_model" }]),
              "aria-selected": r.value === "by_model",
              role: "tab"
            }, " Model ", 10, dw),
            l("button", {
              onClick: p[1] || (p[1] = (v) => r.value = "by_provider"),
              class: q(["tab-button", { "tab-active": r.value === "by_provider" }]),
              "aria-selected": r.value === "by_provider",
              role: "tab"
            }, " Provider ", 10, uw)
          ])
        ]),
        c.value && Object.keys(c.value).length > 0 ? (y(), x("div", hw, [
          l("div", fw, [
            l("table", gw, [
              l("thead", null, [
                l("tr", pw, [
                  l("th", vw, $(r.value === "by_model" ? "Model" : "Provider"), 1),
                  p[3] || (p[3] = l("th", { class: "table-header" }, "Avg cost per message", -1)),
                  p[4] || (p[4] = l("th", { class: "table-header" }, "Avg tokens per message", -1)),
                  p[5] || (p[5] = l("th", { class: "table-header" }, "Message count", -1)),
                  p[6] || (p[6] = l("th", { class: "table-header" }, "Total cost", -1)),
                  p[7] || (p[7] = l("th", { class: "table-header" }, "Total tokens", -1))
                ])
              ]),
              l("tbody", bw, [
                (y(!0), x(K, null, J(c.value, (v, h) => (y(), x("tr", {
                  key: h,
                  class: "table-row"
                }, [
                  l("td", mw, $(h), 1),
                  l("td", yw, $(u(v.avg_cost_per_message)), 1),
                  l("td", _w, $(d(v.avg_tokens_per_message)), 1),
                  l("td", xw, $(d(v.message_count)), 1),
                  l("td", kw, $(u(v.total_cost)), 1),
                  l("td", ww, $(d(v.total_tokens)), 1)
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), dt(T(kt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("div", $w, [
          l("div", Mw, [
            l("div", Cw, [
              Q(T(Vt), { class: "empty-icon" })
            ]),
            p[8] || (p[8] = l("p", { class: "empty-title" }, "No model usage data available", -1)),
            p[9] || (p[9] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Dw = /* @__PURE__ */ nt(Sw, [["__scopeId", "data-v-a7bf2d7b"]]), Aw = { class: "message-roles-card" }, Tw = {
  key: 0,
  class: "loading-state"
}, Bw = {
  key: 1,
  class: "card-body"
}, Lw = {
  key: 0,
  class: "table-section"
}, Fw = { class: "table-wrapper" }, Pw = { class: "data-table" }, Iw = { class: "table-body" }, Ew = { class: "table-cell name-cell" }, Rw = { class: "table-cell text-center" }, Ow = { class: "table-cell text-center" }, Vw = { class: "table-cell text-center" }, zw = { class: "table-cell text-center cost-cell" }, Nw = { class: "table-cell text-center" }, Ww = {
  key: 1,
  class: "empty-state"
}, Hw = { class: "empty-state-content" }, jw = { class: "empty-icon-wrapper" }, Yw = /* @__PURE__ */ tt({
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
    }, { isDark: i } = ct(lt(s, "theme")), r = ["assistant", "system", "user"], c = C(() => s.data?.total_by_role || {}), d = C(() => Object.keys(c.value).length > 0), u = (v) => v == null ? "0" : X(v), f = (v) => v == null ? "$0.00" : bt(v), p = (v) => v.charAt(0).toUpperCase() + v.slice(1);
    return t({ isDark: i }), (v, h) => (y(), x("article", Aw, [
      h[4] || (h[4] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Message Roles"),
          l("p", { class: "card-subtitle" }, "Performance by message role")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Tw, [...h[0] || (h[0] = [
        st('<div class="loading-container" data-v-6a953cfc><div class="chart-bars-loader" data-v-6a953cfc><div class="bar bar-1" data-v-6a953cfc></div><div class="bar bar-2" data-v-6a953cfc></div><div class="bar bar-3" data-v-6a953cfc></div><div class="bar bar-4" data-v-6a953cfc></div><div class="bar bar-5" data-v-6a953cfc></div></div><p class="loading-text" data-v-6a953cfc>Loading message role data...</p></div>', 1)
      ])])) : (y(), x("div", Bw, [
        d.value ? (y(), x("div", Lw, [
          l("div", Fw, [
            l("table", Pw, [
              h[1] || (h[1] = l("thead", null, [
                l("tr", { class: "table-header-row" }, [
                  l("th", { class: "table-header" }, "Role"),
                  l("th", { class: "table-header" }, "Avg cost per message"),
                  l("th", { class: "table-header" }, "Avg tokens per message"),
                  l("th", { class: "table-header" }, "Message count"),
                  l("th", { class: "table-header" }, "Total cost"),
                  l("th", { class: "table-header" }, "Total tokens")
                ])
              ], -1)),
              l("tbody", Iw, [
                (y(), x(K, null, J(r, (m) => l("tr", {
                  key: m,
                  class: "table-row"
                }, [
                  l("td", Ew, $(p(m)), 1),
                  l("td", Rw, $(f(c.value[m]?.avg_cost_per_message)), 1),
                  l("td", Ow, $(u(c.value[m]?.avg_tokens_per_message)), 1),
                  l("td", Vw, $(u(c.value[m]?.message_count)), 1),
                  l("td", zw, $(f(c.value[m]?.total_cost)), 1),
                  l("td", Nw, $(u(c.value[m]?.total_tokens)), 1)
                ])), 64))
              ])
            ])
          ]),
          e.enableExport ? (y(), dt(T(kt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("div", Ww, [
          l("div", Hw, [
            l("div", jw, [
              Q(T(Vt), { class: "empty-icon" })
            ]),
            h[2] || (h[2] = l("p", { class: "empty-title" }, "No message role data available", -1)),
            h[3] || (h[3] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), qw = /* @__PURE__ */ nt(Yw, [["__scopeId", "data-v-6a953cfc"]]), Uw = { class: "cost-per-conversation-card" }, Kw = {
  key: 0,
  class: "card-body"
}, Xw = {
  key: 0,
  class: "chart-section"
}, Gw = { class: "chart-container" }, Zw = { class: "kpi-grid" }, Qw = { class: "kpi-card" }, Jw = { class: "kpi-value" }, t$ = { class: "kpi-card" }, e$ = { class: "kpi-value" }, a$ = { class: "kpi-card" }, s$ = { class: "kpi-value" }, n$ = { class: "kpi-card highlighted" }, o$ = { class: "kpi-value gradient-text" }, i$ = {
  key: 1,
  class: "empty-state"
}, r$ = { class: "empty-state-content" }, l$ = { class: "empty-icon-wrapper" }, c$ = {
  key: 1,
  class: "loading-state"
}, d$ = /* @__PURE__ */ tt({
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
    }, { isDark: i, colors: r } = ct(lt(s, "theme")), c = {
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
    }, d = (b) => b.agent_type || b.agent_id || b.agent_name || "", u = (b) => b.agent_name ? b.agent_name : d(b).split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ").replace(/V\d+$/, "").trim(), f = (b) => {
      const k = d(b).toLowerCase();
      for (const [w, M] of Object.entries(c))
        if (k.includes(w))
          return M;
      return "#9ca3af";
    }, p = C(() => [...s.data?.top_agents || []].sort((k, w) => w.avg_cost_per_conversation - k.avg_cost_per_conversation)), v = C(() => s.data?.total_conversations !== void 0 ? Number(s.data.total_conversations) || 0 : p.value.reduce((b, k) => b + k.conversations, 0)), h = C(() => s.data?.total_cost !== void 0 ? Number(s.data.total_cost) || 0 : p.value.reduce((b, k) => b + k.total_cost, 0)), m = C(() => s.data?.overall_avg_cost_per_conversation !== void 0 ? Number(s.data.overall_avg_cost_per_conversation) || 0 : v.value === 0 ? 0 : h.value / v.value), _ = C(() => {
      const b = p.value;
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const k = b.map((S) => u(S)), w = b.map((S) => S.avg_cost_per_conversation), M = b.map((S) => f(S));
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
    return t({ isDark: i }), (b, k) => (y(), x("article", Uw, [
      k[7] || (k[7] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Cost Per Conversation"),
          l("p", { class: "card-subtitle" }, "USD per conversation by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", c$, [...k[6] || (k[6] = [
        st('<div class="loading-container" data-v-17f6615c><div class="chart-bars-loader" data-v-17f6615c><div class="bar bar-1" data-v-17f6615c></div><div class="bar bar-2" data-v-17f6615c></div><div class="bar bar-3" data-v-17f6615c></div><div class="bar bar-4" data-v-17f6615c></div><div class="bar bar-5" data-v-17f6615c></div></div><p class="loading-text" data-v-17f6615c>Loading agent costs...</p></div>', 1)
      ])])) : (y(), x("div", Kw, [
        _.value.labels && _.value.labels.length ? (y(), x("section", Xw, [
          l("div", Gw, [
            Q(re, {
              data: _.value,
              options: g.value
            }, null, 8, ["data", "options"])
          ]),
          l("footer", Zw, [
            l("div", Qw, [
              k[0] || (k[0] = l("span", { class: "kpi-label" }, "Total Agents", -1)),
              l("span", Jw, $(p.value.length), 1)
            ]),
            l("div", t$, [
              k[1] || (k[1] = l("span", { class: "kpi-label" }, "Total Conversations", -1)),
              l("span", e$, $(T(X)(v.value)), 1)
            ]),
            l("div", a$, [
              k[2] || (k[2] = l("span", { class: "kpi-label" }, "Total Cost", -1)),
              l("span", s$, $(T(bt)(h.value)), 1)
            ]),
            l("div", n$, [
              k[3] || (k[3] = l("span", { class: "kpi-label" }, "Avg Cost / Conv.", -1)),
              l("span", o$, $(T(bt)(m.value)), 1)
            ])
          ]),
          e.enableExport ? (y(), dt(T(kt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", i$, [
          l("div", r$, [
            l("div", l$, [
              Q(T(Vt), { class: "empty-icon" })
            ]),
            k[4] || (k[4] = l("p", { class: "empty-title" }, "No cost per conversation data", -1)),
            k[5] || (k[5] = l("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), u$ = /* @__PURE__ */ nt(d$, [["__scopeId", "data-v-17f6615c"]]);
function Ft() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const h$ = { class: "tabs text-sm" }, f$ = ["aria-label"], g$ = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], p$ = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, v$ = /* @__PURE__ */ tt({
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
    const a = e, s = t, n = at([]), o = `tabs-${Ft()}`, i = (h) => `${o}-tab-${h}`, r = C(
      () => a.items.map((h, m) => h.disabled ? -1 : m).filter((h) => h >= 0)
    );
    function c(h) {
      return h.value === a.modelValue;
    }
    function d(h) {
      const m = c(h), g = `${a.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-full min-h-0 cursor-pointer rounded-lg border border-transparent text-center outline-none transition-[background-color,color,box-shadow,opacity,transform] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return h.disabled ? `${g} cursor-not-allowed opacity-40` : m ? `${g} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${g} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function u(h, m) {
      h === m || a.items.find((g) => g.value === h)?.disabled || (s("update:modelValue", h), s("change", { value: h, previousValue: m }));
    }
    function f(h, m) {
      s("tab-click", { value: h.value, originalEvent: m }), !h.disabled && (u(h.value, a.modelValue), Ct(() => {
        n.value[a.items.indexOf(h)]?.focus();
      }));
    }
    function p(h, m) {
      const _ = a.items.length;
      if (_ === 0) return 0;
      let g = h;
      for (let b = 0; b < _; b++)
        if (g = (g + m + _) % _, !a.items[g]?.disabled) return g;
      return h;
    }
    async function v(h, m) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(h.key)) return;
      h.preventDefault();
      let g = m;
      h.key === "ArrowLeft" ? g = p(m, -1) : h.key === "ArrowRight" ? g = p(m, 1) : h.key === "Home" ? g = r.value[0] ?? 0 : h.key === "End" && (g = r.value[r.value.length - 1] ?? m);
      const b = a.items[g];
      !b || b.disabled || (u(b.value, a.modelValue), await Ct(), n.value[g]?.focus());
    }
    return (h, m) => (y(), x("div", h$, [
      l("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: q([
          "box-border h-10 flex-wrap items-stretch gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 p-0.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (y(!0), x(K, null, J(e.items, (_, g) => (y(), x("button", {
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
          onClick: (b) => f(_, b),
          onKeydown: (b) => v(b, g)
        }, [
          l("span", {
            class: q(["flex h-full min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            _.icon ? (y(), dt(ca(_.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : E("", !0),
            l("span", p$, $(_.label), 1)
          ], 2)
        ], 42, g$))), 128))
      ], 10, f$),
      h.$slots.default ? (y(), dt(Is, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: Re(() => [
          (y(), x("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            It(h.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : E("", !0)
    ]));
  }
}), b$ = /* @__PURE__ */ nt(v$, [["__scopeId", "data-v-0cc67b12"]]), m$ = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, y$ = { class: "overflow-x-auto" }, _$ = { class: "kiut-table w-full min-w-[640px] border-collapse text-left text-sm" }, x$ = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, k$ = {
  key: 0,
  scope: "col",
  class: "w-12 px-4 py-3 text-center align-middle"
}, w$ = ["checked", "aria-label"], $$ = {
  key: 0,
  class: "w-12 bg-transparent px-4 py-3 text-center align-middle"
}, M$ = ["checked", "aria-label", "onChange"], C$ = /* @__PURE__ */ tt({
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
    const f = C(() => a.rows.map((b, k) => r(b, k)));
    function p(b, k) {
      const w = r(b, k);
      return a.selectedKeys.includes(w);
    }
    const v = C(() => !a.selectable || a.rows.length === 0 ? !1 : f.value.every((b) => a.selectedKeys.includes(b))), h = C(() => {
      if (!a.selectable || a.rows.length === 0) return !1;
      const b = f.value.filter((k) => a.selectedKeys.includes(k));
      return b.length > 0 && b.length < a.rows.length;
    });
    Et(
      [h, v, () => a.selectable],
      async () => {
        await Ct();
        const b = n.value;
        b && (b.indeterminate = h.value && !v.value);
      },
      { immediate: !0 }
    );
    function m() {
      if (a.selectable)
        if (v.value) {
          const b = a.selectedKeys.filter((k) => !f.value.includes(k));
          s("update:selectedKeys", b);
        } else {
          const b = new Set(a.selectedKeys);
          f.value.forEach((k) => b.add(k)), s("update:selectedKeys", [...b]);
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
    return (b, k) => (y(), x("div", m$, [
      l("div", y$, [
        l("table", _$, [
          l("thead", null, [
            l("tr", x$, [
              e.selectable ? (y(), x("th", k$, [
                l("input", {
                  ref_key: "selectAllRef",
                  ref: n,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: v.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: m
                }, null, 40, w$)
              ])) : E("", !0),
              (y(!0), x(K, null, J(e.columns, (w) => (y(), x("th", {
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
            (y(!0), x(K, null, J(e.rows, (w, M) => (y(), x("tr", {
              key: u(w, M),
              class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]"
            }, [
              e.selectable ? (y(), x("td", $$, [
                l("input", {
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: p(w, M),
                  "aria-label": g(w, M),
                  onChange: (S) => _(w, M)
                }, null, 40, M$)
              ])) : E("", !0),
              (y(!0), x(K, null, J(e.columns, (S) => (y(), x("td", {
                key: S.key,
                class: q([
                  "bg-transparent px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                  i(S.align),
                  S.cellClass ?? ""
                ])
              }, [
                It(b.$slots, o(S.key), {
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
}), S$ = /* @__PURE__ */ nt(C$, [["__scopeId", "data-v-1928de95"]]);
function D$(e, t) {
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
function A$(e, t) {
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
const T$ = ["aria-label"], B$ = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, L$ = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, F$ = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, P$ = ["aria-label", "aria-expanded", "aria-controls", "onClick"], I$ = { class: "truncate" }, E$ = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, R$ = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, O$ = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, V$ = ["aria-label", "onClick"], z$ = ["aria-label", "onClick"], N$ = ["aria-label"], W$ = ["aria-label"], H$ = {
  key: 1,
  class: "space-y-2"
}, j$ = ["for"], Y$ = ["id", "placeholder", "onKeydown"], q$ = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, U$ = ["aria-label"], K$ = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, X$ = ["checked", "onChange"], G$ = { class: "min-w-0 flex-1" }, Z$ = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, Q$ = { class: "flex flex-wrap items-end gap-2" }, J$ = { class: "min-w-[120px] flex-1" }, t4 = ["for"], e4 = ["id"], a4 = { class: "min-w-[120px] flex-1" }, s4 = ["for"], n4 = ["id"], o4 = /* @__PURE__ */ tt({
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
    const a = e, s = t, n = Oo(), i = `${`kiut-filters-${Ft()}`}-panel`, r = at(null), c = /* @__PURE__ */ new Map(), d = at(null), u = at(!1), f = at({}), p = at(null), v = at(""), h = at([]), m = at(""), _ = at(""), g = C(() => d.value ? a.filterDefinitions.find((I) => I.id === d.value) ?? null : null), b = C(() => {
      const I = g.value;
      if (I)
        return I.type === "text" ? v.value : I.type === "select" ? h.value : { start: m.value, end: _.value };
    });
    function k(I, W) {
      W && W instanceof HTMLElement ? c.set(I, W) : c.delete(I);
    }
    function w(I) {
      return a.modelValue[I];
    }
    function M(I) {
      if (I == null) return [];
      if (Array.isArray(I))
        return I.filter((W) => typeof W == "string" && W.trim() !== "");
      if (typeof I == "string") {
        const W = I.trim();
        return W ? [W] : [];
      }
      return [];
    }
    function S(I, W) {
      if (W == null) return !0;
      if (I.type === "text") return String(W).trim() === "";
      if (I.type === "select") return M(W).length === 0;
      if (I.type === "dateRange") {
        const Z = W;
        return !Z?.start?.trim() || !Z?.end?.trim();
      }
      return !0;
    }
    const D = C(
      () => a.filterDefinitions.some((I) => !S(I, w(I.id)))
    ), A = C(() => {
      const I = [];
      for (const W of a.filterDefinitions) {
        const Z = w(W.id);
        if (!S(W, Z)) {
          if (W.type === "text")
            I.push({ kind: "text", def: W, key: W.id });
          else if (W.type === "dateRange")
            I.push({ kind: "dateRange", def: W, key: W.id });
          else if (W.type === "select")
            for (const ut of M(Z))
              I.push({
                kind: "select",
                def: W,
                optionValue: ut,
                key: `${W.id}::${ut}`
              });
        }
      }
      return I;
    });
    function B(I) {
      return I.type !== "select" ? 0 : M(w(I.id)).length;
    }
    function F(I) {
      const W = w(I.id), Z = I.label.replace(/^\+\s*/, "");
      if (I.type === "text") return `${Z}: ${String(W ?? "").trim()}`;
      if (I.type === "select") {
        const qi = M(W).map((an) => I.options.find((Ui) => Ui.value === an)?.label ?? an);
        return `${Z}: ${qi.join(", ")}`;
      }
      const ut = W, Nt = R(ut.start), he = R(ut.end);
      return `${Z}: ${Nt} – ${he}`;
    }
    function P(I) {
      return I.kind === "text" || I.kind === "dateRange" ? F(I.def) : I.def.options.find((Z) => Z.value === I.optionValue)?.label ?? I.optionValue;
    }
    function R(I) {
      if (!I) return "";
      const W = Dt(I, "YYYY-MM-DD", !0);
      return W.isValid() ? W.format("L") : I;
    }
    function N(I) {
      const W = d.value === I.id && u.value, Z = !S(I, w(I.id));
      return W || Z ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-slate-400/90 text-[color:var(--kiut-text-secondary)] hover:border-[color:var(--kiut-primary)]/50 hover:bg-slate-50 dark:border-slate-500 dark:text-slate-400 dark:hover:border-[color:var(--kiut-primary-light)]/40 dark:hover:bg-white/[0.04]";
    }
    function Y(I) {
      return S(I, w(I.id)) ? ue(I) : `Editar filtro ${I.label.replace(/^\+\s*/, "")}`;
    }
    function L(I) {
      const W = w(I.id);
      if (I.type === "text") {
        v.value = W != null ? String(W) : "";
        return;
      }
      if (I.type === "select") {
        h.value = [...M(W)];
        return;
      }
      const Z = W;
      m.value = Z?.start?.trim() ?? "", _.value = Z?.end?.trim() ?? "";
    }
    function O() {
      const I = g.value;
      if (!I || I.type !== "select") return;
      const W = { ...a.modelValue };
      h.value.length === 0 ? delete W[I.id] : W[I.id] = [...h.value], s("update:modelValue", W), s("change", W);
    }
    function j(I) {
      const W = h.value.indexOf(I);
      W >= 0 ? h.value = h.value.filter((Z, ut) => ut !== W) : h.value = [...h.value, I], O();
    }
    function V(I) {
      if (!I) return;
      p.value = I;
      const W = I.getBoundingClientRect(), Z = 300;
      let ut = W.left;
      const Nt = window.innerWidth - Z - 12;
      ut > Nt && (ut = Math.max(12, Nt)), ut < 12 && (ut = 12);
      const he = W.bottom + 8;
      f.value = {
        top: `${he}px`,
        left: `${ut}px`,
        width: `${Math.min(Z, window.innerWidth - 24)}px`
      };
    }
    function z(I, W) {
      if (d.value === I.id && u.value) {
        ot();
        return;
      }
      u.value && d.value !== I.id && ot(), d.value = I.id, u.value = !0, L(I), Ct().then(async () => {
        V(W.currentTarget), await Ct(), et();
      });
    }
    function H(I, W) {
      if (d.value === I.id && u.value) {
        ot();
        return;
      }
      u.value && d.value !== I.id && ot(), d.value = I.id, u.value = !0, L(I), Ct().then(async () => {
        const Z = c.get(I.id) ?? W.currentTarget;
        V(Z), await Ct(), et();
      });
    }
    function et() {
      const I = r.value;
      if (!I) return;
      I.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function G() {
      u.value = !1, d.value = null, p.value = null;
    }
    function U(I) {
      const W = g.value;
      if (!W) return;
      if (W.type === "text") {
        v.value = I != null ? String(I) : "";
        return;
      }
      if (W.type === "select") {
        h.value = Array.isArray(I) ? I.filter((ut) => typeof ut == "string") : M(I);
        return;
      }
      const Z = I;
      m.value = Z?.start?.trim() ?? "", _.value = Z?.end?.trim() ?? "";
    }
    function ot() {
      const I = g.value;
      if (!I) return;
      if (I.type === "text") {
        const Nt = v.value.trim(), he = { ...a.modelValue };
        Nt === "" ? delete he[I.id] : he[I.id] = Nt, s("update:modelValue", he), s("change", he), G();
        return;
      }
      if (I.type === "select") {
        O(), G();
        return;
      }
      const W = m.value.trim(), Z = _.value.trim(), ut = { ...a.modelValue };
      !W || !Z || W > Z ? delete ut[I.id] : ut[I.id] = { start: W, end: Z }, s("update:modelValue", ut), s("change", ut), G();
    }
    function wt(I) {
      const W = { ...a.modelValue };
      delete W[I], s("update:modelValue", W), s("change", W), d.value === I && G();
    }
    function gt(I) {
      if (I.kind === "text" || I.kind === "dateRange") {
        wt(I.def.id);
        return;
      }
      const W = { ...a.modelValue }, ut = M(W[I.def.id]).filter((Nt) => Nt !== I.optionValue);
      ut.length === 0 ? delete W[I.def.id] : W[I.def.id] = ut, s("update:modelValue", W), s("change", W), d.value === I.def.id && L(I.def);
    }
    function Pt() {
      const I = {};
      s("update:modelValue", I), s("change", I), G();
    }
    const zt = C(() => {
      const I = g.value;
      return I ? `Editar filtro: ${I.label}` : "Filtro";
    });
    function qt(I) {
      const W = I.def.label.replace(/^\+\s*/, "");
      return I.kind === "select" ? `Quitar ${I.def.options.find((Nt) => Nt.value === I.optionValue)?.label ?? I.optionValue} del filtro ${W}` : `Quitar filtro ${W}`;
    }
    function rt(I) {
      const W = I.def.label.replace(/^\+\s*/, "");
      if (I.kind === "select") {
        const ut = I.def.options.find((Nt) => Nt.value === I.optionValue)?.label ?? I.optionValue;
        return `Editar filtro ${W}: ${ut}`;
      }
      return `Editar filtro ${W}`;
    }
    function ue(I) {
      return `Añadir filtro ${I.label.replace(/^\+\s*/, "")}`;
    }
    const en = C(() => a.clearLabel);
    function qe(I) {
      if (!u.value || !r.value) return;
      const W = I.target;
      if (!(r.value.contains(W) || (W instanceof Element ? W : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const ut of c.values())
          if (ut?.contains(W)) return;
        ot();
      }
    }
    function ya(I) {
      I.key === "Escape" && u.value && (I.preventDefault(), G());
    }
    function Ue() {
      !u.value || !p.value || V(p.value);
    }
    return le(() => {
      document.addEventListener("mousedown", qe, !0), window.addEventListener("keydown", ya, !0), window.addEventListener("resize", Ue);
    }), Ro(() => {
      document.removeEventListener("mousedown", qe, !0), window.removeEventListener("keydown", ya, !0), window.removeEventListener("resize", Ue);
    }), Et(
      () => a.modelValue,
      () => {
        const I = g.value;
        I && u.value && !n.panel && L(I);
      },
      { deep: !0 }
    ), (I, W) => (y(), x("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      l("div", B$, [
        l("span", L$, $(e.label), 1),
        l("div", F$, [
          (y(!0), x(K, null, J(e.filterDefinitions, (Z) => (y(), x("button", {
            key: `pill-${Z.id}`,
            ref_for: !0,
            ref: (ut) => k(Z.id, ut),
            type: "button",
            class: q(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", N(Z)]),
            "aria-label": Y(Z),
            "aria-expanded": d.value === Z.id,
            "aria-haspopup": !0,
            "aria-controls": d.value === Z.id ? i : void 0,
            onClick: (ut) => H(Z, ut)
          }, [
            Q(T(D$), {
              class: "h-3.5 w-3.5 shrink-0",
              "aria-hidden": "true"
            }),
            l("span", I$, $(Z.label), 1),
            Z.type === "select" && B(Z) > 0 ? (y(), x("span", E$, $(B(Z)), 1)) : E("", !0)
          ], 10, P$))), 128))
        ])
      ]),
      D.value ? (y(), x("div", R$, [
        l("div", O$, [
          (y(!0), x(K, null, J(A.value, (Z) => (y(), x("div", {
            key: Z.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            l("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": rt(Z),
              onClick: (ut) => z(Z.def, ut)
            }, [
              It(I.$slots, "formatChip", {
                filter: Z.def,
                value: w(Z.def.id),
                optionValue: Z.kind === "select" ? Z.optionValue : void 0
              }, () => [
                xt($(P(Z)), 1)
              ], !0)
            ], 8, V$),
            l("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": qt(Z),
              onClick: (ut) => gt(Z)
            }, [
              Q(T(A$), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, z$)
          ]))), 128))
        ]),
        l("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": en.value,
          onClick: Pt
        }, $(e.clearLabel), 9, N$)
      ])) : E("", !0),
      (y(), dt(Es, { to: "body" }, [
        d.value && u.value ? (y(), x("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: r,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": zt.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: ft(f.value),
          onKeydown: W[3] || (W[3] = te(() => {
          }, ["stop"]))
        }, [
          g.value ? (y(), x(K, { key: 0 }, [
            I.$slots.panel ? It(I.$slots, "panel", {
              key: 0,
              filter: g.value,
              close: ot,
              value: b.value,
              updateValue: U
            }, void 0, !0) : (y(), x("div", H$, [
              g.value.type === "text" ? (y(), x(K, { key: 0 }, [
                l("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, $(g.value.label), 9, j$),
                Ut(l("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": W[0] || (W[0] = (Z) => v.value = Z),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: g.value.placeholder ?? "…",
                  onKeydown: Ea(te(ot, ["prevent"]), ["enter"])
                }, null, 40, Y$), [
                  [Oe, v.value]
                ])
              ], 64)) : g.value.type === "select" ? (y(), x(K, { key: 1 }, [
                l("p", q$, $(g.value.label), 1),
                l("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": g.value.label,
                  "aria-multiselectable": !0
                }, [
                  (y(!0), x(K, null, J(g.value.options, (Z) => (y(), x("li", {
                    key: Z.value
                  }, [
                    l("label", K$, [
                      l("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: h.value.includes(Z.value),
                        onChange: (ut) => j(Z.value)
                      }, null, 40, X$),
                      l("span", G$, $(Z.label), 1)
                    ])
                  ]))), 128))
                ], 8, U$)
              ], 64)) : g.value.type === "dateRange" ? (y(), x(K, { key: 2 }, [
                l("p", Z$, $(g.value.label), 1),
                l("div", Q$, [
                  l("div", J$, [
                    l("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, t4),
                    Ut(l("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": W[1] || (W[1] = (Z) => m.value = Z),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, e4), [
                      [Oe, m.value]
                    ])
                  ]),
                  l("div", a4, [
                    l("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, s4),
                    Ut(l("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": W[2] || (W[2] = (Z) => _.value = Z),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, n4), [
                      [Oe, _.value]
                    ])
                  ])
                ])
              ], 64)) : E("", !0)
            ]))
          ], 64)) : E("", !0)
        ], 44, W$)) : E("", !0)
      ]))
    ], 8, T$));
  }
}), i4 = /* @__PURE__ */ nt(o4, [["__scopeId", "data-v-4403df66"]]), Kt = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", de = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", Fe = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", xe = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", r4 = { class: "font-sans" }, l4 = ["for"], c4 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], d4 = ["id"], u4 = /* @__PURE__ */ tt({
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
    const a = e, s = t, n = `kiut-input-text-${Ft()}`, o = C(() => a.id ?? n), i = C(() => `${o.value}-err`), r = C({
      get: () => a.modelValue,
      set: (c) => s("update:modelValue", c)
    });
    return (c, d) => (y(), x("div", r4, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: q(T(Kt))
      }, $(e.label), 11, l4)) : E("", !0),
      Ut(l("input", {
        id: o.value,
        "onUpdate:modelValue": d[0] || (d[0] = (u) => r.value = u),
        type: "text",
        autocomplete: "off",
        class: q([T(de), e.invalid ? T(Fe) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, c4), [
        [Oe, r.value]
      ]),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: q(T(xe)),
        role: "alert"
      }, $(e.errorText), 11, d4)) : E("", !0)
    ]));
  }
}), h4 = { class: "font-sans" }, f4 = ["for"], g4 = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], p4 = ["for"], v4 = ["title"], b4 = ["aria-label"], m4 = ["id"], y4 = /* @__PURE__ */ tt({
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
    const a = e, s = t, n = `kiut-input-file-${Ft()}`, o = C(() => a.id ?? n), i = C(() => `${o.value}-err`), r = at(null), c = C(() => a.modelValue?.name ?? a.placeholder);
    function d(f) {
      const v = f.target.files?.[0] ?? null;
      s("update:modelValue", v);
    }
    function u() {
      s("update:modelValue", null), r.value && (r.value.value = "");
    }
    return (f, p) => (y(), x("div", h4, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: q(T(Kt))
      }, $(e.label), 11, f4)) : E("", !0),
      l("div", {
        class: q([
          T(de),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? T(Fe) : "",
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
        }, null, 40, g4),
        l("label", {
          for: o.value,
          class: q(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          Q(T(Lg), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          xt(" " + $(e.chooseLabel), 1)
        ], 10, p4),
        l("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: c.value || void 0
        }, $(c.value), 9, v4),
        e.modelValue && !e.disabled ? (y(), x("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: u
        }, [
          Q(T(Ni), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, b4)) : E("", !0)
      ], 2),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: q(T(xe)),
        role: "alert"
      }, $(e.errorText), 11, m4)) : E("", !0)
    ]));
  }
}), _4 = { class: "font-sans" }, x4 = ["for"], k4 = { class: "relative" }, w4 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], $4 = ["id"], M4 = /* @__PURE__ */ tt({
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
    const a = e, s = t, n = `kiut-input-datetime-${Ft()}`, o = C(() => a.id ?? n), i = C(() => `${o.value}-err`), r = C(() => a.modelValue ?? "");
    function c(d) {
      const u = d.target.value;
      s("update:modelValue", u === "" ? null : u);
    }
    return (d, u) => (y(), x("div", _4, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: q(T(Kt))
      }, $(e.label), 11, x4)) : E("", !0),
      l("div", k4, [
        Q(T(Vi), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        l("input", {
          id: o.value,
          value: r.value,
          type: "datetime-local",
          autocomplete: "off",
          class: q([
            T(de),
            "pl-10",
            e.invalid ? T(Fe) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onInput: c
        }, null, 42, w4)
      ]),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: q(T(xe)),
        role: "alert"
      }, $(e.errorText), 11, $4)) : E("", !0)
    ]));
  }
}), C4 = { class: "font-sans" }, S4 = ["for"], D4 = { class: "relative" }, A4 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], T4 = ["id"], B4 = /* @__PURE__ */ tt({
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
    function a(f) {
      const p = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(f.trim());
      if (!p) return null;
      const v = Number(p[1]), h = Number(p[2]);
      return !Number.isInteger(v) || !Number.isInteger(h) || v < 0 || v > 23 || h < 0 || h > 59 ? null : `${String(v).padStart(2, "0")}:${String(h).padStart(2, "0")}`;
    }
    function s(f) {
      return f === "" ? null : a(f);
    }
    const n = e, o = t, i = `kiut-input-time-${Ft()}`, r = C(() => n.id ?? i), c = C(() => `${r.value}-err`), d = C(() => n.modelValue == null || n.modelValue === "" ? "" : a(n.modelValue) ?? "");
    function u(f) {
      const p = f.target.value;
      o("update:modelValue", s(p));
    }
    return (f, p) => (y(), x("div", C4, [
      e.label ? (y(), x("label", {
        key: 0,
        for: r.value,
        class: q(T(Kt))
      }, $(e.label), 11, S4)) : E("", !0),
      l("div", D4, [
        Q(T(Og), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        l("input", {
          id: r.value,
          value: d.value,
          type: "time",
          autocomplete: "off",
          class: q([
            T(de),
            "pl-10",
            e.invalid ? T(Fe) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? c.value : void 0,
          onInput: u
        }, null, 42, A4)
      ]),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: c.value,
        class: q(T(xe)),
        role: "alert"
      }, $(e.errorText), 11, T4)) : E("", !0)
    ]));
  }
}), L4 = { class: "font-sans" }, F4 = ["for"], P4 = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, I4 = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], E4 = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, R4 = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, O4 = { class: "min-w-0 text-left leading-snug" }, V4 = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, z4 = { class: "min-w-0 text-right leading-snug" }, N4 = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, W4 = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, H4 = ["id"], j4 = /* @__PURE__ */ tt({
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
    const a = e, s = t, n = `kiut-input-range-${Ft()}`, o = C(() => a.id ?? n), i = C(() => `${o.value}-err`), r = C(() => {
      const v = [];
      return a.errorText && v.push(i.value), v.length ? v.join(" ") : void 0;
    }), c = C(
      () => !!(a.caption && !a.captionMin && !a.captionMax)
    ), d = C(() => !!(a.captionMin || a.captionMax)), u = C(() => {
      const { min: v, max: h, modelValue: m } = a;
      if (h === v) return 0;
      const _ = (m - v) / (h - v);
      return Math.min(100, Math.max(0, _ * 100));
    }), f = C(() => ({
      "--kiut-range-fill": `${u.value}%`,
      "--kiut-range-length": a.trackLength
    }));
    function p(v) {
      const h = Number(v.target.value);
      s("update:modelValue", Number.isNaN(h) ? a.min : h);
    }
    return (v, h) => (y(), x("div", L4, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: q(T(Kt))
      }, $(e.label), 11, F4)) : E("", !0),
      l("div", {
        class: q(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (y(), x("p", P4, $(e.captionMax), 1)) : E("", !0),
        l("div", {
          class: q(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: ft(f.value)
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
          }, null, 42, I4)
        ], 6),
        e.orientation === "horizontal" && c.value ? (y(), x("p", E4, $(e.caption), 1)) : e.orientation === "horizontal" && d.value ? (y(), x("div", R4, [
          l("span", O4, $(e.captionMin), 1),
          l("span", V4, $(e.caption), 1),
          l("span", z4, $(e.captionMax), 1)
        ])) : E("", !0),
        e.orientation === "vertical" && e.captionMin ? (y(), x("p", N4, $(e.captionMin), 1)) : E("", !0),
        e.orientation === "vertical" && e.caption ? (y(), x("p", W4, $(e.caption), 1)) : E("", !0)
      ], 2),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: q(T(xe)),
        role: "alert"
      }, $(e.errorText), 11, H4)) : E("", !0)
    ]));
  }
}), Y4 = /* @__PURE__ */ nt(j4, [["__scopeId", "data-v-a1343418"]]), q4 = { class: "font-sans" }, U4 = ["for"], K4 = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], X4 = ["id"], G4 = /* @__PURE__ */ tt({
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
    const a = e, s = t, n = `kiut-input-number-${Ft()}`, o = C(() => a.id ?? n), i = C(() => `${o.value}-err`), r = C(() => {
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
      const f = u.target.value;
      if (f === "") {
        s("update:modelValue", null);
        return;
      }
      const p = Number(f);
      s("update:modelValue", Number.isNaN(p) ? null : p);
    }
    return (u, f) => (y(), x("div", q4, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: q(T(Kt))
      }, $(e.label), 11, U4)) : E("", !0),
      l("input", {
        id: o.value,
        value: c.value,
        type: "number",
        onInput: d,
        class: q([
          T(de),
          e.invalid ? T(Fe) : "",
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
      }, null, 42, K4),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: q(T(xe)),
        role: "alert"
      }, $(e.errorText), 11, X4)) : E("", !0)
    ]));
  }
}), Z4 = { class: "font-sans" }, Q4 = ["for"], J4 = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], tM = ["disabled"], eM = ["id"], aM = "#3b82f6", sM = "#aabbcc", nM = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", oM = /* @__PURE__ */ tt({
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
    function a(h) {
      const m = h.trim(), _ = /^#?([0-9a-fA-F]{6})$/.exec(m);
      if (_) return `#${_[1].toLowerCase()}`;
      const g = /^#?([0-9a-fA-F]{3})$/.exec(m);
      if (g) {
        const [b, k, w] = g[1].split("");
        return `#${b}${b}${k}${k}${w}${w}`.toLowerCase();
      }
      return null;
    }
    function s(h) {
      return a(h) ?? aM;
    }
    const n = e, o = t, i = `kiut-input-color-${Ft()}`, r = C(() => n.id ?? i), c = C(() => `${r.value}-err`), d = C(() => s(n.modelValue)), u = at(d.value), f = at(!1);
    Et(d, (h) => {
      f.value || (u.value = h);
    });
    function p(h) {
      const m = h.target, _ = a(m.value);
      _ && o("update:modelValue", _);
    }
    function v() {
      f.value = !1;
      const h = a(u.value);
      h ? (u.value = h, o("update:modelValue", h)) : u.value = d.value;
    }
    return Et(u, (h) => {
      if (!f.value) return;
      const m = a(h);
      m && o("update:modelValue", m);
    }), (h, m) => (y(), x("div", Z4, [
      e.label ? (y(), x("label", {
        key: 0,
        for: r.value,
        class: q(T(Kt))
      }, $(e.label), 11, Q4)) : E("", !0),
      l("div", {
        class: q([
          nM,
          e.invalid ? T(Fe) : "",
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
        }, null, 40, J4),
        e.showHexInput ? Ut((y(), x("input", {
          key: 0,
          "onUpdate:modelValue": m[0] || (m[0] = (_) => u.value = _),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: sM,
          onFocus: m[1] || (m[1] = (_) => f.value = !0),
          onBlur: v
        }, null, 40, tM)), [
          [Oe, u.value]
        ]) : E("", !0)
      ], 2),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: c.value,
        class: q(T(xe)),
        role: "alert"
      }, $(e.errorText), 11, eM)) : E("", !0)
    ]));
  }
});
function ji(e, t) {
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
const iM = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], rM = ["aria-selected", "onClick", "onMouseenter"], lM = {
  key: 0,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, cM = { class: "min-w-0 flex-1" }, Yi = /* @__PURE__ */ tt({
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
    const a = e, s = t, n = `kiut-select-${Ft()}`, o = `${n}-label`, i = `${n}-btn`, r = `${n}-listbox`, c = at(null), d = at(null), u = at(null), f = at(!1), p = at(0), v = at({});
    function h() {
      const P = d.value;
      if (!P) return;
      const R = P.getBoundingClientRect();
      v.value = {
        top: `${R.bottom - 3}px`,
        left: `${R.left}px`,
        width: `${R.width}px`
      };
    }
    const m = C(() => a.options.filter((P) => !P.disabled)), _ = C(
      () => a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opción"
    ), g = C(() => a.modelValue === null || a.modelValue === void 0 || a.modelValue === "" ? a.placeholder : a.options.find((R) => R.value === a.modelValue)?.label ?? String(a.modelValue));
    function b(P) {
      return `${String(P.value)}-${P.label}`;
    }
    function k(P) {
      return a.modelValue === P.value;
    }
    function w(P, R) {
      const N = k(P), Y = p.value === R;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        N ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !N && Y ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function M(P) {
      s("update:modelValue", P.value), f.value = !1;
    }
    function S() {
      a.disabled || (f.value = !f.value);
    }
    function D(P) {
      if (P.stopPropagation(), !a.disabled && (S(), f.value)) {
        h();
        const R = Math.max(
          0,
          m.value.findIndex((N) => N.value === a.modelValue)
        );
        p.value = R, Ct(() => u.value?.focus());
      }
    }
    function A(P) {
      if (!f.value) return;
      const R = P.target, N = c.value, Y = u.value;
      N && !N.contains(R) && (!Y || !Y.contains(R)) && (f.value = !1);
    }
    function B(P) {
      a.disabled || (P.key === "ArrowDown" || P.key === "Enter" || P.key === " ") && (P.preventDefault(), f.value || (f.value = !0, h(), p.value = Math.max(
        0,
        m.value.findIndex((R) => R.value === a.modelValue)
      ), Ct(() => u.value?.focus())));
    }
    function F(P) {
      const R = m.value;
      if (R.length !== 0) {
        if (P.key === "Escape") {
          P.preventDefault(), f.value = !1;
          return;
        }
        if (P.key === "ArrowDown") {
          P.preventDefault(), p.value = Math.min(p.value + 1, R.length - 1);
          return;
        }
        if (P.key === "ArrowUp") {
          P.preventDefault(), p.value = Math.max(p.value - 1, 0);
          return;
        }
        if (P.key === "Enter") {
          P.preventDefault();
          const N = R[p.value];
          N && M(N);
        }
      }
    }
    return le(() => {
      document.addEventListener("click", A);
    }), He(() => {
      document.removeEventListener("click", A);
    }), (P, R) => (y(), x("div", {
      ref_key: "rootRef",
      ref: c,
      class: "relative font-sans"
    }, [
      e.label ? (y(), x("label", {
        key: 0,
        id: o,
        class: q(T(Kt))
      }, $(e.label), 3)) : E("", !0),
      l("button", {
        ref_key: "buttonRef",
        ref: d,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: q([
          T(de),
          "flex items-center justify-between gap-2 text-left",
          f.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": f.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : _.value,
        onClick: D,
        onKeydown: B
      }, [
        l("span", {
          class: q([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, $(g.value), 3),
        Q(T(zi), {
          class: q(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", f.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, iM),
      (y(), dt(Es, { to: "body" }, [
        Ut(l("ul", {
          id: r,
          ref_key: "listRef",
          ref: u,
          role: "listbox",
          tabindex: "-1",
          style: ft(v.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          onKeydown: te(F, ["stop"])
        }, [
          (y(!0), x(K, null, J(m.value, (N, Y) => (y(), x("li", {
            key: b(N),
            role: "option",
            "aria-selected": k(N),
            class: q(w(N, Y)),
            onClick: te((L) => M(N), ["stop"]),
            onMouseenter: (L) => p.value = Y
          }, [
            e.showOptionCheck ? (y(), x("span", lM, [
              k(N) ? (y(), dt(T(ji), {
                key: 0,
                class: "h-4 w-4 text-white"
              })) : E("", !0)
            ])) : E("", !0),
            l("span", cM, $(N.label), 1)
          ], 42, rM))), 128))
        ], 36), [
          [la, f.value]
        ])
      ]))
    ], 512));
  }
}), dM = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], uM = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, hM = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, fM = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, gM = { class: "truncate" }, pM = ["aria-selected", "onClick", "onMouseenter"], vM = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, bM = { class: "min-w-0 flex-1" }, mM = /* @__PURE__ */ tt({
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
    const a = e, s = t, n = `kiut-multiselect-${Ft()}`, o = `${n}-label`, i = `${n}-btn`, r = `${n}-listbox`, c = at(null), d = at(null), u = at(!1), f = at(0), p = C(() => a.options.filter((F) => !F.disabled)), v = C(() => new Set(a.modelValue ?? [])), h = C(
      () => a.options.filter((F) => v.value.has(F.value))
    ), m = C(() => {
      const F = a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opciones", P = h.value.length;
      return P === 0 ? F : `${F}, ${P} seleccionada${P === 1 ? "" : "s"}`;
    });
    function _(F) {
      return `${String(F.value)}-${F.label}`;
    }
    function g(F) {
      return v.value.has(F.value);
    }
    function b(F, P) {
      const R = g(F), N = f.value === P;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        R ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !R && N ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function k(F) {
      const P = [...a.modelValue ?? []], R = P.indexOf(F.value);
      R >= 0 ? P.splice(R, 1) : P.push(F.value), s("update:modelValue", P);
    }
    function w() {
      const F = p.value;
      if (F.length === 0) {
        f.value = 0;
        return;
      }
      const P = v.value, R = F.findIndex((N) => P.has(N.value));
      f.value = R >= 0 ? R : 0;
    }
    function M() {
      a.disabled || (u.value = !u.value);
    }
    function S(F) {
      F.stopPropagation(), !a.disabled && (M(), u.value && (w(), Ct(() => d.value?.focus())));
    }
    function D(F) {
      if (!u.value) return;
      const P = c.value;
      P && !P.contains(F.target) && (u.value = !1);
    }
    function A(F) {
      a.disabled || (F.key === "ArrowDown" || F.key === "Enter" || F.key === " ") && (F.preventDefault(), u.value || (u.value = !0, w(), Ct(() => d.value?.focus())));
    }
    function B(F) {
      const P = p.value;
      if (P.length !== 0) {
        if (F.key === "Escape") {
          F.preventDefault(), u.value = !1;
          return;
        }
        if (F.key === "ArrowDown") {
          F.preventDefault(), f.value = Math.min(f.value + 1, P.length - 1);
          return;
        }
        if (F.key === "ArrowUp") {
          F.preventDefault(), f.value = Math.max(f.value - 1, 0);
          return;
        }
        if (F.key === "Enter" || F.key === " ") {
          F.preventDefault();
          const R = P[f.value];
          R && k(R);
        }
      }
    }
    return le(() => {
      document.addEventListener("click", D);
    }), He(() => {
      document.removeEventListener("click", D);
    }), (F, P) => (y(), x("div", {
      ref_key: "rootRef",
      ref: c,
      class: "relative font-sans"
    }, [
      e.label ? (y(), x("label", {
        key: 0,
        id: o,
        class: q(T(Kt))
      }, $(e.label), 3)) : E("", !0),
      l("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: q([
          T(de),
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
        l("div", uM, [
          h.value.length === 0 ? (y(), x("span", hM, $(e.placeholder), 1)) : (y(), x("div", fM, [
            (y(!0), x(K, null, J(h.value, (R) => (y(), x("span", {
              key: _(R),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              l("span", gM, $(R.label), 1)
            ]))), 128))
          ]))
        ]),
        Q(T(zi), {
          class: q(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", u.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, dM),
      Ut(l("ul", {
        id: r,
        ref_key: "listRef",
        ref: d,
        role: "listbox",
        tabindex: "-1",
        "aria-multiselectable": "true",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: te(B, ["stop"])
      }, [
        (y(!0), x(K, null, J(p.value, (R, N) => (y(), x("li", {
          key: _(R),
          role: "option",
          "aria-selected": g(R),
          class: q(b(R, N)),
          onClick: te((Y) => k(R), ["stop"]),
          onMouseenter: (Y) => f.value = N
        }, [
          l("span", vM, [
            g(R) ? (y(), dt(T(ji), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : E("", !0)
          ]),
          l("span", bM, $(R.label), 1)
        ], 42, pM))), 128))
      ], 544), [
        [la, u.value]
      ])
    ], 512));
  }
}), yM = ["id", "aria-checked", "aria-disabled", "disabled", "onKeydown"], _M = { class: "sr-only" }, xM = /* @__PURE__ */ tt({
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
        Ea(te(n, ["prevent", "stop"]), ["space"]),
        Ea(te(n, ["prevent"]), ["enter"])
      ]
    }, [
      l("span", {
        class: q(["pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", e.modelValue ? "translate-x-7" : "translate-x-0"]),
        "aria-hidden": "true"
      }, null, 2),
      l("span", _M, $(e.ariaLabel), 1)
    ], 42, yM));
  }
}), kM = { class: "font-sans" }, wM = ["for"], $M = { class: "flex gap-2" }, MM = { class: "w-[7.5rem] shrink-0" }, CM = { class: "min-w-0 flex-1" }, SM = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], DM = ["id"], AM = /* @__PURE__ */ tt({
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
    const a = e, s = t, n = `kiut-phone-${Ft()}`, o = C(() => a.id ?? `${n}-num`), i = C(() => `${o.value}-err`), r = C({
      get: () => a.modelValue.prefix,
      set: (d) => s("update:modelValue", { ...a.modelValue, prefix: d })
    }), c = C({
      get: () => a.modelValue.number,
      set: (d) => s("update:modelValue", { ...a.modelValue, number: d })
    });
    return (d, u) => (y(), x("div", kM, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: q(T(Kt))
      }, $(e.label), 11, wM)) : E("", !0),
      l("div", $M, [
        l("div", MM, [
          Q(Yi, {
            modelValue: r.value,
            "onUpdate:modelValue": u[0] || (u[0] = (f) => r.value = f),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        l("div", CM, [
          Ut(l("input", {
            id: o.value,
            "onUpdate:modelValue": u[1] || (u[1] = (f) => c.value = f),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: q([T(de), e.invalid ? T(Fe) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, SM), [
            [Oe, c.value]
          ])
        ])
      ]),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: q(T(xe)),
        role: "alert"
      }, $(e.errorText), 11, DM)) : E("", !0)
    ]));
  }
}), TM = ["role", "aria-label"], BM = { class: "flex flex-wrap gap-2" }, LM = ["aria-checked", "role", "onClick"], FM = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, PM = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, IM = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, EM = /* @__PURE__ */ tt({
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
      l("div", BM, [
        (y(!0), x(K, null, J(e.items, (u) => (y(), x("button", {
          key: u.value,
          type: "button",
          class: q(i(u)),
          "aria-checked": o(u),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (f) => r(u)
        }, [
          l("span", FM, [
            o(u) ? (y(), x("span", PM)) : E("", !0)
          ]),
          u.dotColor ? (y(), x("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: ft({ backgroundColor: u.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : E("", !0),
          l("span", IM, $(u.label), 1)
        ], 10, LM))), 128))
      ])
    ], 8, TM));
  }
}), RM = ["aria-label"], OM = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], VM = { class: "truncate px-3 py-2 text-sm font-medium" }, zM = /* @__PURE__ */ tt({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, s = t, n = `kiut-seg-${Ft()}`, o = (m) => `${n}-seg-${m}`, i = at([]);
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
    function f(m, _, g) {
      u(m), Ct(() => i.value[_]?.focus());
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
    function h(m, _) {
      if (m.key === "ArrowRight" || m.key === "ArrowDown") {
        m.preventDefault();
        const g = v(_, 1), b = a.items[g];
        b && u(b), Ct(() => i.value[g]?.focus());
      } else if (m.key === "ArrowLeft" || m.key === "ArrowUp") {
        m.preventDefault();
        const g = v(_, -1), b = a.items[g];
        b && u(b), Ct(() => i.value[g]?.focus());
      } else if (m.key === "Home") {
        m.preventDefault();
        const g = p.value[0];
        if (g !== void 0) {
          const b = a.items[g];
          b && u(b), Ct(() => i.value[g]?.focus());
        }
      } else if (m.key === "End") {
        m.preventDefault();
        const g = p.value[p.value.length - 1];
        if (g !== void 0) {
          const b = a.items[g];
          b && u(b), Ct(() => i.value[g]?.focus());
        }
      }
    }
    return (m, _) => (y(), x("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (y(!0), x(K, null, J(e.items, (g, b) => (y(), x("button", {
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
        onClick: (k) => f(g, b),
        onKeydown: (k) => h(k, b)
      }, [
        l("span", VM, $(g.label), 1)
      ], 42, OM))), 128))
    ], 8, RM));
  }
});
function Me(e) {
  const [t, a, s] = e.split("-").map(Number);
  return new Date(t, a - 1, s);
}
function ta(e) {
  const t = e.getFullYear(), a = String(e.getMonth() + 1).padStart(2, "0"), s = String(e.getDate()).padStart(2, "0");
  return `${t}-${a}-${s}`;
}
function fe(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function ks(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function Bo(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function Ja(e, t) {
  const a = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), s = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return a < s ? -1 : a > s ? 1 : 0;
}
function Lo(e, t) {
  return Ja(e, t) === 0;
}
function ws(e, t) {
  return Ja(e, t) < 0;
}
function NM(e, t) {
  return Ja(e, t) >= 0;
}
function WM(e, t) {
  return Ja(e, t) <= 0;
}
function HM(e) {
  const t = e.getFullYear(), a = e.getMonth(), s = new Date(t, a, 1), n = new Date(s);
  n.setDate(s.getDate() - s.getDay());
  const o = [], i = new Date(n);
  for (let r = 0; r < 42; r++)
    o.push(new Date(i)), i.setDate(i.getDate() + 1);
  return o;
}
const jM = [
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
], YM = [
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
function Fo(e) {
  return `${jM[e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function Po(e) {
  return `${YM[e.getMonth()]} ${e.getFullYear()}`;
}
const qM = ["aria-expanded", "aria-labelledby", "aria-label"], UM = ["onKeydown"], KM = { class: "mb-4 flex items-center justify-between gap-2" }, XM = { class: "flex min-w-0 flex-1 justify-center gap-8 text-center text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, GM = { class: "min-w-0 truncate" }, ZM = { class: "min-w-0 truncate" }, QM = { class: "flex flex-col gap-6 sm:flex-row sm:gap-8" }, JM = { class: "mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-wide text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, tC = { class: "grid grid-cols-7 gap-y-1" }, eC = ["disabled", "onClick"], aC = /* @__PURE__ */ tt({
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
    const a = e, s = t, o = `${`kiut-drp-${Ft()}`}-lbl`, i = at(null), r = at(null), c = at(!1), d = at(null), u = at(ks(/* @__PURE__ */ new Date())), f = C(() => {
      const D = ks(u.value);
      return [D, Bo(D, 1)];
    }), p = C(() => a.ariaLabel ?? a.placeholder), v = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], h = C(() => {
      if (!a.modelValue.start || !a.modelValue.end) return a.placeholder;
      const D = Me(a.modelValue.start), A = Me(a.modelValue.end);
      return `${Fo(D)} – ${Fo(A)}`;
    });
    function m(D, A) {
      return D.getMonth() === A.getMonth() && D.getFullYear() === A.getFullYear();
    }
    function _(D) {
      const A = fe(D);
      if (a.minDate) {
        const B = fe(Me(a.minDate));
        if (ws(A, B)) return !0;
      }
      if (a.maxDate) {
        const B = fe(Me(a.maxDate));
        if (ws(B, A)) return !0;
      }
      return !1;
    }
    function g(D, A) {
      const B = m(A, D), F = a.modelValue.start ? fe(Me(a.modelValue.start)) : null, P = a.modelValue.end ? fe(Me(a.modelValue.end)) : null, R = fe(A), N = B ? "text-[color:var(--kiut-text-primary)] dark:text-slate-100" : "text-slate-400 dark:text-slate-500";
      if (!F || !P)
        return `${N} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
      const Y = NM(R, F) && WM(R, P), L = Lo(R, F), O = Lo(R, P);
      return L || O ? "bg-[color:var(--kiut-primary)] font-semibold text-white shadow-sm" : Y ? `${N} bg-violet-100/90 dark:bg-violet-950/35 hover:bg-violet-200/80 dark:hover:bg-violet-900/40` : `${N} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
    }
    function b(D) {
      if (_(D)) return;
      const A = fe(D);
      if (!d.value) {
        d.value = new Date(A), s("update:modelValue", { start: ta(A), end: ta(A) });
        return;
      }
      let F = fe(d.value), P = new Date(A);
      ws(P, F) && ([F, P] = [P, F]), s("update:modelValue", { start: ta(F), end: ta(P) }), d.value = null, c.value = !1;
    }
    function k(D) {
      u.value = Bo(u.value, D);
    }
    function w() {
      c.value = !1;
    }
    function M(D) {
      if (D.stopPropagation(), c.value = !c.value, c.value) {
        if (d.value = null, a.modelValue.start)
          try {
            u.value = ks(Me(a.modelValue.start));
          } catch {
          }
        Ct(() => r.value?.focus());
      }
    }
    function S(D) {
      if (!c.value) return;
      const A = i.value;
      A && !A.contains(D.target) && (c.value = !1);
    }
    return Et(c, (D) => {
      D && (d.value = null);
    }), le(() => {
      document.addEventListener("click", S);
    }), He(() => {
      document.removeEventListener("click", S);
    }), (D, A) => (y(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (y(), x("label", {
        key: 0,
        id: o,
        class: q(T(Kt))
      }, $(e.label), 3)) : E("", !0),
      l("button", {
        type: "button",
        class: q([T(de), "flex w-full items-center gap-2 text-left"]),
        "aria-expanded": c.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : p.value,
        onClick: M
      }, [
        Q(T(Vi), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        l("span", {
          class: q([
            "min-w-0 flex-1 truncate",
            !e.modelValue.start || !e.modelValue.end ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, $(h.value), 3)
      ], 10, qM),
      Ut(l("div", {
        ref_key: "panelRef",
        ref: r,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: "absolute left-0 top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[100vw] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] p-4 shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]",
        onKeydown: Ea(te(w, ["stop"]), ["escape"])
      }, [
        l("div", KM, [
          l("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes anterior",
            onClick: A[0] || (A[0] = (B) => k(-1))
          }, [
            Q(T(Eg), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ]),
          l("div", XM, [
            l("span", GM, $(T(Po)(f.value[0])), 1),
            l("span", ZM, $(T(Po)(f.value[1])), 1)
          ]),
          l("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes siguiente",
            onClick: A[1] || (A[1] = (B) => k(1))
          }, [
            Q(T(Rg), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ])
        ]),
        l("div", QM, [
          (y(!0), x(K, null, J(f.value, (B) => (y(), x("div", {
            key: `${B.getFullYear()}-${B.getMonth()}`,
            class: "min-w-0 flex-1"
          }, [
            l("div", JM, [
              (y(), x(K, null, J(v, (F) => l("span", { key: F }, $(F), 1)), 64))
            ]),
            l("div", tC, [
              (y(!0), x(K, null, J(T(HM)(B), (F) => (y(), x("button", {
                key: T(ta)(F),
                type: "button",
                disabled: _(F),
                class: q(["relative flex h-9 items-center justify-center rounded-lg text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", g(B, F)]),
                onClick: (P) => b(F)
              }, $(F.getDate()), 11, eC))), 128))
            ])
          ]))), 128))
        ])
      ], 40, UM), [
        [la, c.value]
      ])
    ], 512));
  }
}), sC = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, nC = /* @__PURE__ */ tt({
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
        case "neutral":
        default:
          return r ? "border border-slate-400 bg-transparent text-[color:var(--kiut-text-primary)] dark:border-slate-500 dark:text-slate-200" : "border border-slate-200 bg-slate-100 text-[color:var(--kiut-text-primary)] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200";
      }
    });
    return (r, c) => a.value ? (y(), x("span", {
      key: 0,
      role: "status",
      class: q(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", n.value])
    }, [
      e.statusLive === !0 ? (y(), x("span", sC, [...c[0] || (c[0] = [
        l("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        l("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : E("", !0),
      l("span", {
        class: q(["min-w-0 flex-1 text-center", o.value])
      }, $(s.value), 3)
    ], 2)) : (y(), x("span", {
      key: 1,
      class: q(["inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight", i.value])
    }, [
      It(r.$slots, "default", {}, () => [
        xt($(e.label), 1)
      ])
    ], 2));
  }
}), oC = {
  key: 0,
  class: "group relative inline-flex shrink-0"
}, iC = ["type", "disabled", "aria-label"], rC = {
  key: 1,
  class: "min-w-0 truncate"
}, lC = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, cC = ["type", "disabled", "aria-label"], dC = {
  key: 1,
  class: "min-w-0 truncate"
}, Ia = /* @__PURE__ */ tt({
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
      const { class: u, type: f, "aria-label": p, ...v } = a;
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
    return (u, f) => s.value ? (y(), x("span", oC, [
      l("button", Cs({
        type: r.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [d.value, T(a).class]],
        disabled: e.disabled,
        "aria-label": i.value
      }, c.value), [
        u.$slots.icon ? (y(), x("span", {
          key: 0,
          class: q(["inline-flex shrink-0", n.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          It(u.$slots, "icon")
        ], 2)) : E("", !0),
        o.value ? (y(), x("span", rC, [
          It(u.$slots, "default")
        ])) : E("", !0)
      ], 16, iC),
      l("span", lC, $(e.tooltip), 1)
    ])) : (y(), x("button", Cs({
      key: 1,
      type: r.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [d.value, T(a).class]],
      disabled: e.disabled,
      "aria-label": i.value
    }, c.value), [
      u.$slots.icon ? (y(), x("span", {
        key: 0,
        class: q(["inline-flex shrink-0", n.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        It(u.$slots, "icon")
      ], 2)) : E("", !0),
      o.value ? (y(), x("span", dC, [
        It(u.$slots, "default")
      ])) : E("", !0)
    ], 16, cC));
  }
}), uC = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, hC = { class: "min-w-0 flex-1 space-y-1" }, fC = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, gC = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, pC = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, vC = /* @__PURE__ */ tt({
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
    const a = e, s = t, o = `${`kiut-modal-${Ft()}`}-title`, i = at(null);
    function r() {
      s("cancel"), s("update:modelValue", !1);
    }
    function c() {
      s("confirm");
    }
    function d(u) {
      a.modelValue && u.key === "Escape" && (u.preventDefault(), r());
    }
    return Et(
      () => a.modelValue,
      (u) => {
        u && requestAnimationFrame(() => {
          i.value?.focus({ preventScroll: !0 });
        });
      }
    ), le(() => {
      document.addEventListener("keydown", d);
    }), He(() => {
      document.removeEventListener("keydown", d);
    }), (u, f) => (y(), dt(Es, { to: "body" }, [
      Q(Is, { name: "kiut-modal" }, {
        default: Re(() => [
          e.modelValue ? (y(), x("div", uC, [
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
              onClick: f[0] || (f[0] = te(() => {
              }, ["stop"]))
            }, [
              l("header", {
                class: q(["flex shrink-0 justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.02]", e.subtitle ? "items-start" : "items-center"])
              }, [
                l("div", hC, [
                  l("h2", {
                    id: o,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, $(e.title), 1),
                  e.subtitle ? (y(), x("p", fC, $(e.subtitle), 1)) : E("", !0)
                ]),
                Q(Ia, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  onClick: r
                }, {
                  icon: Re(() => [
                    Q(T(Ni), { class: "h-5 w-5" })
                  ]),
                  _: 1
                })
              ], 2),
              l("div", gC, [
                It(u.$slots, "default", {}, void 0, !0)
              ]),
              l("footer", pC, [
                Q(Ia, {
                  variant: "secondary",
                  type: "button",
                  onClick: r
                }, {
                  default: Re(() => [
                    xt($(e.cancelLabel), 1)
                  ]),
                  _: 1
                }),
                Q(Ia, {
                  variant: "primary",
                  type: "button",
                  onClick: c
                }, {
                  default: Re(() => [
                    xt($(e.confirmLabel), 1)
                  ]),
                  _: 1
                })
              ])
            ], 512)
          ])) : E("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), bC = /* @__PURE__ */ nt(vC, [["__scopeId", "data-v-4ed7bb14"]]), mC = { class: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between" }, yC = { class: "flex min-w-0 flex-1 flex-col gap-1.5" }, _C = { class: "flex min-w-0 items-center gap-2.5" }, xC = {
  key: 0,
  class: "inline-flex shrink-0 items-center text-[color:var(--kiut-text-primary)] dark:text-slate-100 [&>svg]:size-6",
  "aria-hidden": "true"
}, kC = {
  key: 0,
  class: "text-base leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, wC = {
  key: 0,
  class: "flex shrink-0 flex-wrap items-center justify-end gap-2 sm:pt-0.5"
}, $C = {
  key: 0,
  class: "mt-6"
}, MC = /* @__PURE__ */ tt({
  name: "Section",
  __name: "Section",
  props: {
    title: {},
    subtitle: {},
    icon: {}
  },
  setup(e) {
    const t = e, a = Oo(), n = `${`kiut-section-${Ft()}`}-title`, o = C(() => !!(a.icon || t.icon));
    return (i, r) => (y(), x("section", {
      class: "text-left font-['Inter',system-ui,sans-serif]",
      "aria-labelledby": n
    }, [
      l("header", mC, [
        l("div", yC, [
          l("div", _C, [
            o.value ? (y(), x("span", xC, [
              It(i.$slots, "icon", {}, () => [
                e.icon ? (y(), dt(ca(e.icon), { key: 0 })) : E("", !0)
              ])
            ])) : E("", !0),
            l("h2", {
              id: n,
              class: "min-w-0 text-3xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
            }, $(e.title), 1)
          ]),
          e.subtitle ? (y(), x("p", kC, $(e.subtitle), 1)) : E("", !0)
        ]),
        i.$slots.actions ? (y(), x("div", wC, [
          It(i.$slots, "actions")
        ])) : E("", !0)
      ]),
      i.$slots.default ? (y(), x("div", $C, [
        It(i.$slots, "default")
      ])) : E("", !0)
    ]));
  }
}), CC = { class: "flex flex-1 min-h-0" }, SC = {
  key: 0,
  class: "flex justify-center items-center mt-3 shrink-0"
}, DC = {
  class: "flex-1 overflow-y-auto p-1.5 flex flex-col gap-1",
  "aria-label": "Sections"
}, AC = ["aria-current", "title", "onClick"], TC = {
  key: 1,
  class: "shrink-0 border-t border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)]"
}, BC = { class: "px-4 pt-4 pb-2 shrink-0" }, LC = { class: "text-[12px] font-bold uppercase tracking-widest text-[color:var(--kiut-text-muted)]" }, FC = {
  class: "flex-1 overflow-y-auto px-2 pb-3 flex flex-col gap-1",
  "aria-label": "Section items"
}, PC = ["data-nav-id", "aria-current", "onClick"], IC = /* @__PURE__ */ tt({
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
    function f(m) {
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
    function h(m) {
      return d(m) ? [
        "bg-purple-100 text-purple-700",
        "dark:bg-purple-600/20 dark:text-purple-400"
      ] : [
        "text-[color:var(--kiut-text-primary)]",
        "hover:bg-purple-50 hover:text-purple-900",
        "dark:hover:bg-purple-500/30 dark:hover:text-purple-50"
      ];
    }
    return (m, _) => (y(), x("aside", Cs({
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden",
      role: "navigation",
      "aria-label": "Main navigation"
    }, r), [
      l("div", CC, [
        l("div", {
          class: "primary-rail flex flex-col shrink-0 bg-[color:var(--kiut-bg-secondary)] border-r border-[color:var(--kiut-border-light)]",
          style: ft({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: _[0] || (_[0] = (g) => a.value = !0),
          onMouseleave: _[1] || (_[1] = (g) => a.value = !1)
        }, [
          m.$slots.logo ? (y(), x("div", SC, [
            It(m.$slots, "logo", { expanded: a.value }, void 0, !0)
          ])) : E("", !0),
          l("nav", DC, [
            (y(!0), x(K, null, J(e.sections, (g) => (y(), x("button", {
              key: g.id,
              type: "button",
              "aria-current": e.selectedSectionId === g.id ? "true" : void 0,
              title: g.label,
              class: q(["group relative flex flex-row items-center justify-start gap-1 px-2 py-2 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/20", v(g)]),
              onClick: (b) => f(g)
            }, [
              g.icon ? (y(), dt(ca(g.icon), {
                key: 0,
                class: "shrink-0",
                style: ft({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : E("", !0),
              l("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1",
                style: ft({ fontSize: e.primaryFontSize })
              }, $(g.label), 5)
            ], 10, AC))), 128))
          ]),
          m.$slots.footer ? (y(), x("div", TC, [
            It(m.$slots, "footer", { expanded: a.value }, void 0, !0)
          ])) : E("", !0)
        ], 36),
        Q(Is, { name: "ksn-sub" }, {
          default: Re(() => [
            c.value ? (y(), x("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 bg-[color:var(--kiut-bg-secondary)] border-r border-[color:var(--kiut-border-light)] overflow-hidden",
              style: ft({ width: e.secondaryWidth })
            }, [
              l("div", BC, [
                l("p", LC, $(c.value.label), 1)
              ]),
              l("nav", FC, [
                (y(!0), x(K, null, J(c.value.items, (g) => (y(), x("button", {
                  key: g.id,
                  type: "button",
                  "data-nav-id": g.id,
                  "aria-current": d(g) ? "page" : void 0,
                  class: q(["group flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/20", h(g)]),
                  onClick: (b) => p(c.value, g)
                }, [
                  g.icon ? (y(), dt(ca(g.icon), {
                    key: 0,
                    style: ft({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : E("", !0),
                  l("span", {
                    class: "truncate",
                    style: ft({ fontSize: e.secondaryFontSize })
                  }, $(g.label), 5)
                ], 10, PC))), 128))
              ])
            ], 4)) : E("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), EC = /* @__PURE__ */ nt(IC, [["__scopeId", "data-v-b510acff"]]), UC = {
  install(e) {
    e.component("KiutChartBar", re), e.component("KiutChartLine", ye), e.component("KiutPieChart", Qa), e.component("KiutBoxplotChart", Xh), e.component("KiutCandlestickChart", Ri), e.component("KiutHistogramChart", Oi), e.component("KiutSankeyChart", _e), e.component("KiutAgentsPerDay", rp), e.component("KiutBookingManager", Yp), e.component("KiutCheckin", p0), e.component("KiutCheckinMetrics", z0), e.component("KiutCheckinSegments", fv), e.component("KiutDisruption", Gv), e.component("KiutFAQ", lb), e.component("KiutMessagesPerAgent", kb), e.component("KiutRecordLocator", Ub), e.component("KiutSalesByChannel", um), e.component("KiutSeller", e1), e.component("KiutTopAgents", d1), e.component("KiutPaymentMethod", W1), e.component("KiutAgentHumanConversations", Ey), e.component("KiutChannelMetrics", Ky), e.component("KiutTriageCombinations", f_), e.component("KiutSelectLanguage", $_), e.component("KiutGuardrails", Q_), e.component("KiutDisruptionNotifier", X2), e.component("KiutTotalConversationsCard", ex), e.component("KiutCsatP95Card", rx), e.component("KiutAiGeneratedRevenueCard", fx), e.component("KiutNpsDailyMetrics", Wi), e.component("KiutNpsMetrics", ak), e.component("KiutNpsOverviewMetrics", Hi), e.component("KiutAWSCost", xk), e.component("KiutCostUsage", jk), e.component("KiutTokenUsage", u5), e.component("KiutConversationCount", M5), e.component("KiutTopAgentsAnalysis", O5), e.component("KiutTopAgentsPie", K5), e.component("KiutDailyCostTrends", nw), e.component("KiutModelUsage", Dw), e.component("KiutMessageRoles", qw), e.component("KiutCostPerConversations", u$), e.component("Tabs", b$), e.component("Table", S$), e.component("Filters", i4), e.component("InputText", u4), e.component("InputFile", y4), e.component("InputDateTime", M4), e.component("InputTime", B4), e.component("InputRange", Y4), e.component("InputNumber", G4), e.component("InputColorPicker", oM), e.component("Select", Yi), e.component("MultiSelect", mM), e.component("Toggle", xM), e.component("InputPhone", AM), e.component("SelectablePills", EM), e.component("SegmentedControl", zM), e.component("DateRangePicker", aC), e.component("Tag", nC), e.component("Button", Ia), e.component("Modal", bC), e.component("Section", MC), e.component("KiutAppShellNavigation", EC);
  }
};
export {
  xk as AWSCost,
  Ey as AgentHumanConversations,
  rp as AgentsPerDay,
  fx as AiGeneratedRevenueCard,
  EC as AppShellNavigation,
  Yp as BookingManager,
  Xh as BoxplotChart,
  Ia as Button,
  Ri as CandlestickChart,
  Ky as ChannelMetrics,
  re as ChartBar,
  ye as ChartLine,
  p0 as Checkin,
  z0 as CheckinMetrics,
  fv as CheckinSegments,
  M5 as ConversationCount,
  u$ as CostPerConversations,
  jk as CostUsage,
  rx as CsatP95Card,
  nw as DailyCostTrends,
  aC as DateRangePicker,
  Gv as Disruption,
  X2 as DisruptionNotifier,
  lb as FAQ,
  i4 as Filters,
  Q_ as Guardrails,
  Oi as HistogramChart,
  oM as InputColorPicker,
  M4 as InputDateTime,
  y4 as InputFile,
  G4 as InputNumber,
  AM as InputPhone,
  Y4 as InputRange,
  u4 as InputText,
  B4 as InputTime,
  UC as KiutUIPlugin,
  qw as MessageRoles,
  kb as MessagesPerAgent,
  bC as Modal,
  Dw as ModelUsage,
  mM as MultiSelect,
  Wi as NpsDailyMetrics,
  ak as NpsMetrics,
  Hi as NpsOverviewMetrics,
  W1 as PaymentMethod,
  Qa as PieChart,
  Ub as RecordLocator,
  um as SalesByChannel,
  _e as SankeyChart,
  MC as Section,
  zM as SegmentedControl,
  Yi as Select,
  $_ as SelectLanguage,
  EM as SelectablePills,
  e1 as Seller,
  S$ as Table,
  b$ as Tabs,
  nC as Tag,
  xM as Toggle,
  u5 as TokenUsage,
  d1 as TopAgents,
  O5 as TopAgentsAnalysis,
  K5 as TopAgentsPie,
  ex as TotalConversationsCard,
  f_ as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
