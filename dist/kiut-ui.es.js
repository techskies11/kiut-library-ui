import { defineComponent as J, shallowRef as Io, h as $s, ref as at, onMounted as re, onUnmounted as He, watch as Rt, toRaw as Ms, nextTick as St, version as qi, isProxy as Ro, computed as S, toRef as lt, openBlock as m, createElementBlock as x, createVNode as Q, unref as T, normalizeStyle as bt, createElementVNode as l, toDisplayString as $, createCommentVNode as E, Fragment as q, renderList as tt, onBeforeUnmount as Eo, createStaticVNode as st, withDirectives as Ut, vShow as la, normalizeClass as K, createBlock as dt, createTextVNode as kt, resolveDynamicComponent as ca, Transition as Is, withCtx as Ee, renderSlot as It, useSlots as Oo, Teleport as Rs, withModifiers as Jt, withKeys as Ra, vModelText as Oe, useAttrs as Vo, mergeProps as Ss } from "vue";
import * as sn from "echarts/core";
import { TooltipComponent as Xi, TitleComponent as Gi } from "echarts/components";
import { SankeyChart as Zi } from "echarts/charts";
import { CanvasRenderer as Qi } from "echarts/renderers";
import At from "moment";
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
function se(e) {
  return ge(ma(e / 2.55) / 100, 0, 1);
}
function nn(e) {
  return ge(ma(e * 100), 0, 100);
}
const Ht = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Cs = [..."0123456789ABCDEF"], Ji = (e) => Cs[e & 15], tr = (e) => Cs[(e & 240) >> 4] + Cs[e & 15], _a = (e) => (e & 240) >> 4 === (e & 15), er = (e) => _a(e.r) && _a(e.g) && _a(e.b) && _a(e.a);
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
function Es(e) {
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
  var a = Es(e);
  a[0] = No(a[0] + t), a = Vs(a), e.r = a[0], e.g = a[1], e.b = a[2];
}
function fr(e) {
  if (!e)
    return;
  const t = Es(e), a = t[0], s = nn(t[1]), n = nn(t[2]);
  return e.a < 255 ? `hsla(${a}, ${s}%, ${n}%, ${se(e.a)})` : `hsl(${a}, ${s}%, ${n}%)`;
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
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${se(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const ts = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, Pe = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function yr(e, t, a) {
  const s = Pe(se(e.r)), n = Pe(se(e.g)), o = Pe(se(e.b));
  return {
    r: be(ts(s + a * (Pe(se(t.r)) - s))),
    g: be(ts(n + a * (Pe(se(t.g)) - n))),
    b: be(ts(o + a * (Pe(se(t.b)) - o))),
    a: e.a + a * (t.a - e.a)
  };
}
function ka(e, t, a) {
  if (e) {
    let s = Es(e);
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
    return t && (t.a = se(t.a)), t;
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
function te() {
}
const xr = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function gt(e) {
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
function pt(e, t, a, s) {
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
function Sr(e) {
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
  return (cn[t] || (cn[t] = Sr(t)))(e);
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
function Cr(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const mt = Math.PI, _t = 2 * mt, Dr = _t + mt, Va = Number.POSITIVE_INFINITY, Ar = mt / 180, Ct = mt / 2, ke = mt / 4, un = mt * 2 / 3, Yo = Math.log10, Qt = Math.sign;
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
function ne(e) {
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
function Ko(e, t) {
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
function Rr(e) {
  return Tt(e, -32768, 32767);
}
function oe(e, t, a, s = 1e-6) {
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
} : (n) => e[n][t] < a), Er = (e, t, a) => Ns(e, a, (s) => e[s][t] >= a);
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
function qo(e) {
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
const Ws = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", Dt = (e, t, a) => e === "start" ? t : e === "end" ? a : (t + a) / 2, Nr = (e, t, a, s) => e === (s ? "left" : "right") ? a : e === "center" ? (t + a) / 2 : t;
function Wr(e, t, a) {
  const s = t.length;
  let n = 0, o = s;
  if (e._sorted) {
    const { iScale: i, vScale: r, _parsed: c } = e, d = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, u = i.axis, { min: h, max: p, minDefined: v, maxDefined: f } = i.getUserBounds();
    if (v) {
      if (n = Math.min(
        // @ts-expect-error Need to type _parsed
        De(c, u, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? s : De(t, u, i.getPixelForValue(h)).lo
      ), d) {
        const _ = c.slice(0, n + 1).reverse().findIndex((b) => !gt(b[r.axis]));
        n -= Math.max(0, _);
      }
      n = Tt(n, 0, s - 1);
    }
    if (f) {
      let _ = Math.max(
        // @ts-expect-error Need to type _parsed
        De(c, i.axis, p, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? 0 : De(t, u, i.getPixelForValue(p), !0).hi + 1
      );
      if (d) {
        const b = c.slice(_ - 1).findIndex((g) => !gt(g[r.axis]));
        _ += Math.max(0, b);
      }
      o = Tt(_, n, s) - n;
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
function qr(e, t) {
  t = t || {};
  const a = e + JSON.stringify(t);
  let s = mn.get(a);
  return s || (s = new Intl.NumberFormat(e, t), mn.set(a, s)), s;
}
function js(e, t, a) {
  return qr(t, a).format(e);
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
  Kr,
  Ur,
  Zr
]);
function Jr(e) {
  return !e || gt(e.size) || gt(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
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
  let o, i, r, c, d, u, h, p;
  const v = t.pointStyle, f = t.rotation, _ = t.radius;
  let b = (f || 0) * Ar;
  if (v && typeof v == "object" && (o = v.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(a, s), e.rotate(b), e.drawImage(v, -v.width / 2, -v.height / 2, v.width, v.height), e.restore();
    return;
  }
  if (!(isNaN(_) || _ <= 0)) {
    switch (e.beginPath(), v) {
      // Default includes circle
      default:
        n ? e.ellipse(a, s, n / 2, _, 0, 0, _t) : e.arc(a, s, _, 0, _t), e.closePath();
        break;
      case "triangle":
        u = n ? n / 2 : _, e.moveTo(a + Math.sin(b) * u, s - Math.cos(b) * _), b += un, e.lineTo(a + Math.sin(b) * u, s - Math.cos(b) * _), b += un, e.lineTo(a + Math.sin(b) * u, s - Math.cos(b) * _), e.closePath();
        break;
      case "rectRounded":
        d = _ * 0.516, c = _ - d, i = Math.cos(b + ke) * c, h = Math.cos(b + ke) * (n ? n / 2 - d : c), r = Math.sin(b + ke) * c, p = Math.sin(b + ke) * (n ? n / 2 - d : c), e.arc(a - h, s - r, d, b - mt, b - Ct), e.arc(a + p, s - i, d, b - Ct, b), e.arc(a + h, s + r, d, b, b + Ct), e.arc(a - p, s + i, d, b + Ct, b + mt), e.closePath();
        break;
      case "rect":
        if (!f) {
          c = Math.SQRT1_2 * _, u = n ? n / 2 : c, e.rect(a - u, s - c, 2 * u, 2 * c);
          break;
        }
        b += ke;
      /* falls through */
      case "rectRot":
        h = Math.cos(b) * (n ? n / 2 : _), i = Math.cos(b) * _, r = Math.sin(b) * _, p = Math.sin(b) * (n ? n / 2 : _), e.moveTo(a - h, s - r), e.lineTo(a + p, s - i), e.lineTo(a + h, s + r), e.lineTo(a - p, s + i), e.closePath();
        break;
      case "crossRot":
        b += ke;
      /* falls through */
      case "cross":
        h = Math.cos(b) * (n ? n / 2 : _), i = Math.cos(b) * _, r = Math.sin(b) * _, p = Math.sin(b) * (n ? n / 2 : _), e.moveTo(a - h, s - r), e.lineTo(a + h, s + r), e.moveTo(a + p, s - i), e.lineTo(a - p, s + i);
        break;
      case "star":
        h = Math.cos(b) * (n ? n / 2 : _), i = Math.cos(b) * _, r = Math.sin(b) * _, p = Math.sin(b) * (n ? n / 2 : _), e.moveTo(a - h, s - r), e.lineTo(a + h, s + r), e.moveTo(a + p, s - i), e.lineTo(a - p, s + i), b += ke, h = Math.cos(b) * (n ? n / 2 : _), i = Math.cos(b) * _, r = Math.sin(b) * _, p = Math.sin(b) * (n ? n / 2 : _), e.moveTo(a - h, s - r), e.lineTo(a + h, s + r), e.moveTo(a + p, s - i), e.lineTo(a - p, s + i);
        break;
      case "line":
        i = n ? n / 2 : Math.cos(b) * _, r = Math.sin(b) * _, e.moveTo(a - i, s - r), e.lineTo(a + i, s + r);
        break;
      case "dash":
        e.moveTo(a, s), e.lineTo(a + Math.cos(b) * (n ? n / 2 : _), s + Math.sin(b) * _);
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
  t.translation && e.translate(t.translation[0], t.translation[1]), gt(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
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
    d = i[c], o.backdrop && nl(e, o.backdrop), r && (o.strokeColor && (e.strokeStyle = o.strokeColor), gt(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(d, a, s, o.maxWidth)), e.fillText(d, a, s, o.maxWidth), sl(e, a, s, d, o), s += Number(n.lineHeight);
  e.restore();
}
function za(e, t) {
  const { x: a, y: s, w: n, h: o, radius: i } = t;
  e.arc(a + i.topLeft, s + i.topLeft, i.topLeft, 1.5 * mt, mt, !0), e.lineTo(a, s + o - i.bottomLeft), e.arc(a + i.bottomLeft, s + o - i.bottomLeft, i.bottomLeft, mt, Ct, !0), e.lineTo(a + n - i.bottomRight, s + o), e.arc(a + n - i.bottomRight, s + o - i.bottomRight, i.bottomRight, Ct, 0, !0), e.lineTo(a + n, s + i.topRight), e.arc(a + n - i.topRight, s + i.topRight, i.topRight, 0, -Ct, !0), e.lineTo(a + i.topLeft, s);
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
function Ks(e, t = [
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
    override: (r) => Ks([
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
  return r.delete(e), Us(e, c) && (c = qs(n._scopes, n, e, c)), c;
}
function fl(e, t, a, s) {
  const { _proxy: n, _context: o, _subProxy: i, _descriptors: r } = a;
  if (typeof o.index < "u" && s(e))
    return t[o.index % t.length];
  if (ht(t[0])) {
    const c = t, d = n._scopes.filter((u) => u !== c);
    t = [];
    for (const u of c) {
      const h = qs(d, n, e, u);
      t.push(Ne(h, o, i && i[e], r));
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
function qs(e, t, a, s) {
  const n = t._rootScopes, o = ai(t._fallback, a, s), i = [
    ...e,
    ...n
  ], r = /* @__PURE__ */ new Set();
  r.add(s);
  let c = xn(r, i, a, o || a, s);
  return c === null || typeof o < "u" && o !== a && (c = xn(r, i, o, c, s), c === null) ? !1 : Ks(Array.from(r), [
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
      return Us(e, n) ? qs(a, s, e, n) : n;
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
    const u = r[a], h = r[s];
    i && (o = (u - i[a]) / 3, r[`cp1${a}`] = u - o, r[`cp1${s}`] = h - o * t[d]), c && (o = (c[a] - u) / 3, r[`cp2${a}`] = u + o, r[`cp2${s}`] = h + o * t[d]);
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
      o[i] = r ? d ? Qt(n[i - 1]) !== Qt(n[i]) ? 0 : (n[i - 1] + n[i]) / 2 : n[i - 1] : n[i];
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
const Ka = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Sl(e, t) {
  return Ka(e).getPropertyValue(t);
}
const Cl = [
  "top",
  "right",
  "bottom",
  "left"
];
function Ae(e, t, a) {
  const s = {};
  a = a ? "-" + a : "";
  for (let n = 0; n < 4; n++) {
    const o = Cl[n];
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
function Se(e, t) {
  if ("native" in e)
    return e;
  const { canvas: a, currentDevicePixelRatio: s } = t, n = Ka(a), o = n.boxSizing === "border-box", i = Ae(n, "padding"), r = Ae(n, "border", "width"), { x: c, y: d, box: u } = Al(e, a), h = i.left + (u && r.left), p = i.top + (u && r.top);
  let { width: v, height: f } = t;
  return o && (v -= i.width + r.width, f -= i.height + r.height), {
    x: Math.round((c - h) / v * a.width / s),
    y: Math.round((d - p) / f * a.height / s)
  };
}
function Tl(e, t, a) {
  let s, n;
  if (t === void 0 || a === void 0) {
    const o = e && Gs(e);
    if (!o)
      t = e.clientWidth, a = e.clientHeight;
    else {
      const i = o.getBoundingClientRect(), r = Ka(o), c = Ae(r, "border", "width"), d = Ae(r, "padding");
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
  const n = Ka(e), o = Ae(n, "margin"), i = Na(n.maxWidth, e, "clientWidth") || Va, r = Na(n.maxHeight, e, "clientHeight") || Va, c = Tl(e, t, a);
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
  const a = Sl(e, t), s = a && a.match(/^(\d+)(\.\d+)?px$/);
  return s ? +s[1] : void 0;
}
function Ce(e, t, a, s) {
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
  }, i = Ce(e, n, a), r = Ce(n, o, a), c = Ce(o, t, a), d = Ce(i, r, a), u = Ce(r, c, a);
  return Ce(d, u, a);
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
}, Rl = function() {
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
  return e ? Il(t, a) : Rl();
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
    between: oe,
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
function El(e, t, a) {
  const { property: s, start: n, end: o } = a, { between: i, normalize: r } = ri(s), c = t.length;
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
function li(e, t, a) {
  if (!a)
    return [
      e
    ];
  const { property: s, start: n, end: o } = a, i = t.length, { compare: r, between: c, normalize: d } = ri(s), { start: u, end: h, loop: p, style: v } = El(e, t, a), f = [];
  let _ = !1, b = null, g, y, w;
  const k = () => c(n, w, g) && r(n, w) !== 0, M = () => r(o, g) === 0 || c(o, w, g), C = () => _ || k(), D = () => !_ || M();
  for (let A = u, B = u; A <= h; ++A)
    y = t[A % i], !y.skip && (g = d(y[s]), g !== w && (_ = c(g, n, o), b === null && C() && (b = r(g, n) === 0 ? A : B), b !== null && D() && (f.push(Mn({
      start: b,
      end: A,
      loop: p,
      count: i,
      style: v
    })), b = null), B = A, w = g));
  return b !== null && f.push(Mn({
    start: b,
    end: h,
    loop: p,
    count: i,
    style: v
  })), f;
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
    return Sn(e, [
      {
        start: i,
        end: r,
        loop: o
      }
    ], a, t);
  const c = r < i ? r + n : r, d = !!e._fullLoop && i === 0 && r === n - 1;
  return Sn(e, Vl(a, i, c, d), a, t);
}
function Sn(e, t, a, s) {
  return !s || !s.setContext || !a ? t : Nl(e, t, a, s);
}
function Nl(e, t, a, s) {
  const n = e._chart.getContext(), o = Cn(e.options), { _datasetIndex: i, options: { spanGaps: r } } = e, c = a.length, d = [];
  let u = o, h = t[0].start, p = h;
  function v(f, _, b, g) {
    const y = r ? -1 : 1;
    if (f !== _) {
      for (f += c; a[f % c].skip; )
        f -= y;
      for (; a[_ % c].skip; )
        _ += y;
      f % c !== _ % c && (d.push({
        start: f % c,
        end: _ % c,
        loop: b,
        style: g
      }), u = g, h = _ % c);
    }
  }
  for (const f of t) {
    h = r ? h : f.start;
    let _ = a[h % c], b;
    for (p = h + 1; p <= f.end; p++) {
      const g = a[p % c];
      b = Cn(s.setContext(Le(n, {
        type: "segment",
        p0: _,
        p1: g,
        p0DataIndex: (p - 1) % c,
        p1DataIndex: p % c,
        datasetIndex: i
      }))), Wl(b, u) && v(h, p - 1, f.loop, u), _ = g, u = b;
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
function Wl(e, t) {
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
function Hl(e, t) {
  const { xScale: a, yScale: s } = e;
  return a && s ? {
    left: Sa(a, t, "left"),
    right: Sa(a, t, "right"),
    top: Sa(s, t, "top"),
    bottom: Sa(s, t, "bottom")
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
var ee = /* @__PURE__ */ new jl();
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
    const s = a.options, n = ql(t, s);
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
      return ee.add(this._chart, s), !0;
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
function ql(e, t) {
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
    d = e.values[c], Lt(d) && (o || t === 0 || Qt(t) === Qt(d)) && (t += d);
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
  const { chart: a, _cachedMeta: s } = e, n = a._stacks || (a._stacks = {}), { iScale: o, vScale: i, index: r } = s, c = o.axis, d = i.axis, u = Ql(o, i, s), h = t.length;
  let p;
  for (let v = 0; v < h; ++v) {
    const f = t[v], { [c]: _, [d]: b } = f, g = f._stacks || (f._stacks = {});
    p = g[d] = tc(n, u, _), p[r] = b, p._top = Bn(p, i, !0, s.type), p._bottom = Bn(p, i, !1, s.type);
    const y = p._visualValues || (p._visualValues = {});
    y[r] = b;
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
function qe(e, t) {
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
    this.index !== t && qe(this._cachedMeta), this.index = t;
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
    this._data && gn(this._data, this), t._stacked && qe(t);
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
        qe(n), n._parsed = [];
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
    a._stacked = ss(a.vScale, a), a.stack !== s.stack && (n = !0, qe(a), a.stack = s.stack), this._resyncElements(t), (n || o !== a._stacked) && (Ln(this, a._parsed), a._stacked = ss(a.vScale, a));
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
    }, { min: u, max: h } = Jl(r);
    let p, v;
    function f() {
      v = n[p];
      const _ = v[r.axis];
      return !Lt(v[t.axis]) || u > _ || h < _;
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
    const d = this.chart.config, u = d.datasetElementScopeKeys(this._type, t), h = n ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], p = d.getOptionScopes(this.getDataset(), u), v = Object.keys($t.elements[t]), f = () => this.getContext(s, n, a), _ = d.resolveNamedOptions(p, v, f, h);
    return _.$shared && (_.$shared = c, o[i] = Object.freeze(Fn(_, c))), _;
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
      s._stacked && qe(s, n);
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
    e._cache.$bar = qo(s.sort((n, o) => n - o));
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
  return gt(n) ? (o = t.min * a.categoryPercentage, i = a.barPercentage) : (o = n * s, i = 1), {
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
  let d, u, h, p;
  for (d = a, u = a + s; d < u; ++d)
    p = t[d], h = {}, h[n.axis] = r || n.parse(i[d], d), c.push(fi(p, h, o, d));
  return c;
}
function is(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function cc(e, t, a) {
  return e !== 0 ? Qt(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= a ? 1 : -1);
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
  return s ? (e = hc(e, t, a), e = Rn(e, a, t)) : e = Rn(e, t, a), e;
}
function hc(e, t, a) {
  return e === t ? a : e === a ? t : e;
}
function Rn(e, t, a) {
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
    const { iScale: o, vScale: i } = t, { xAxisKey: r = "x", yAxisKey: c = "y" } = this._parsing, d = o.axis === "x" ? r : c, u = i.axis === "x" ? r : c, h = [];
    let p, v, f, _;
    for (p = s, v = s + n; p < v; ++p)
      _ = a[p], f = {}, f[o.axis] = o.parse(Te(_, d), p), h.push(fi(Te(_, u), f, i, p));
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
      const f = this.getParsed(v), _ = o || gt(f[r.axis]) ? {
        base: c,
        head: c
      } : this._calculateBarValuePixels(v), b = this._calculateBarIndexPixels(v, u), g = (f._stacks || {})[r.axis], y = {
        horizontal: d,
        base: _.base,
        enableBorderRadius: !g || is(f._custom) || i === g._top || i === g._bottom,
        x: d ? _.head : b.center,
        y: d ? b.center : _.head,
        height: d ? b.size : Math.abs(_.size),
        width: d ? Math.abs(_.size) : b.size
      };
      p && (y.options = h || this.resolveDataElementOptions(v, t[v].active ? "active" : n));
      const w = y.options || t[v].options;
      uc(y, w, g, i), fc(y, w, u.ratio), this.updateElement(t[v], v, y, n);
    }
  }
  _getStacks(t, a) {
    const { iScale: s } = this._cachedMeta, n = s.getMatchingVisibleMetas(this._type).filter((u) => u.controller.options.grouped), o = s.options.stacked, i = [], r = this._cachedMeta.controller.getParsed(a), c = r && r[s.axis], d = (u) => {
      const h = u._parsed.find((v) => v[s.axis] === c), p = h && h[u.vScale.axis];
      if (gt(p) || isNaN(p))
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
    let h = c[a.axis], p = 0, v = s ? this.applyStack(a, c, s) : h, f, _;
    v !== h && (p = v - h, v = h), u && (h = d.barStart, v = d.barEnd - d.barStart, h !== 0 && Qt(h) !== Qt(d.barEnd) && (p = 0), p += h);
    const b = !gt(o) && !u ? o : p;
    let g = a.getPixelForValue(b);
    if (this.chart.getDataVisibility(t) ? f = a.getPixelForValue(p + v) : f = g, _ = f - g, Math.abs(_) < i) {
      _ = cc(_, a, r) * i, h === r && (g -= _ / 2);
      const y = a.getPixelForDecimal(0), w = a.getPixelForDecimal(1), k = Math.min(y, w), M = Math.max(y, w);
      g = Math.max(Math.min(g, M), k), f = g + _, s && !u && (c._stacks[a.axis]._visualValues[n] = a.getValueForPixel(f) - a.getValueForPixel(g));
    }
    if (g === a.getPixelForValue(r)) {
      const y = Qt(_) * a.getLineWidthForValue(r) / 2;
      g += y, _ -= y;
    }
    return {
      size: _,
      base: g,
      head: f,
      center: f + _ / 2
    };
  }
  _calculateBarIndexPixels(t, a) {
    const s = a.scale, n = this.options, o = n.skipNull, i = it(n.maxBarThickness, 1 / 0);
    let r, c;
    const d = this._getAxisCount();
    if (a.grouped) {
      const u = o ? this._getStackCount(t) : a.stackCount, h = n.barThickness === "flex" ? rc(t, a, n, u * d) : ic(t, a, n, u * d), p = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, v = this._getAxis().indexOf(it(p, this.getFirstScaleIdForIndexAxis())), f = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + v;
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
function pc(e, t, a) {
  let s = 1, n = 1, o = 0, i = 0;
  if (t < _t) {
    const r = e, c = r + t, d = Math.cos(r), u = Math.sin(r), h = Math.cos(c), p = Math.sin(c), v = (w, k, M) => ga(w, r, c, !0) ? 1 : Math.max(k, k * a, M, M * a), f = (w, k, M) => ga(w, r, c, !0) ? -1 : Math.min(k, k * a, M, M * a), _ = v(0, d, h), b = v(Ct, u, p), g = f(mt, d, h), y = f(mt + Ct, u, p);
    s = (_ - g) / 2, n = (b - y) / 2, o = -(_ + g) / 2, i = -(b + y) / 2;
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
        o = (d) => +Te(s[d], c);
      }
      let i, r;
      for (i = t, r = t + a; i < r; ++i)
        n._parsed[i] = o(i);
    }
  }
  _getRotation() {
    return ne(this.options.rotation - 90);
  }
  _getCircumference() {
    return ne(this.options.circumference);
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
    const a = this.chart, { chartArea: s } = a, n = this._cachedMeta, o = n.data, i = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, r = Math.max((Math.min(s.width, s.height) - i) / 2, 0), c = Math.min(kr(this.options.cutout, r), 1), d = this._getRingWeight(this.index), { circumference: u, rotation: h } = this._getRotationExtents(), { ratioX: p, ratioY: v, offsetX: f, offsetY: _ } = pc(h, u, c), b = (s.width - i) / p, g = (s.height - i) / v, y = Math.max(Math.min(b, g) / 2, 0), w = Ho(this.options.radius, y), k = Math.max(w * c, 0), M = (w - k) / this._getVisibleDatasetWeightTotal();
    this.offsetX = f * w, this.offsetY = _ * w, n.total = this.calculateTotal(), this.outerRadius = w - M * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - M * d, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, a) {
    const s = this.options, n = this._cachedMeta, o = this._getCircumference();
    return a && s.animation.animateRotate || !this.chart.getDataVisibility(t) || n._parsed[t] === null || n.data[t].hidden ? 0 : this.calculateCircumference(n._parsed[t] * o / _t);
  }
  updateElements(t, a, s, n) {
    const o = n === "reset", i = this.chart, r = i.chartArea, d = i.options.animation, u = (r.left + r.right) / 2, h = (r.top + r.bottom) / 2, p = o && d.animateScale, v = p ? 0 : this.innerRadius, f = p ? 0 : this.outerRadius, { sharedOptions: _, includeOptions: b } = this._getSharedOptions(a, n);
    let g = this._getRotation(), y;
    for (y = 0; y < a; ++y)
      g += this._circumference(y, o);
    for (y = a; y < a + s; ++y) {
      const w = this._circumference(y, o), k = t[y], M = {
        x: u + this.offsetX,
        y: h + this.offsetY,
        startAngle: g,
        endAngle: g + w,
        circumference: w,
        outerRadius: f,
        innerRadius: v
      };
      b && (M.options = _ || this.resolveDataElementOptions(y, k.active ? "active" : n)), g += w, this.updateElement(k, y, M, n);
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
    const o = n === "reset", { iScale: i, vScale: r, _stacked: c, _dataset: d } = this._cachedMeta, { sharedOptions: u, includeOptions: h } = this._getSharedOptions(a, n), p = i.axis, v = r.axis, { spanGaps: f, segment: _ } = this.options, b = fa(f) ? f : Number.POSITIVE_INFINITY, g = this.chart._animationsDisabled || o || n === "none", y = a + s, w = t.length;
    let k = a > 0 && this.getParsed(a - 1);
    for (let M = 0; M < w; ++M) {
      const C = t[M], D = g ? C : {};
      if (M < a || M >= y) {
        D.skip = !0;
        continue;
      }
      const A = this.getParsed(M), B = gt(A[v]), L = D[p] = i.getPixelForValue(A[p], M), F = D[v] = o || B ? r.getBasePixel() : r.getPixelForValue(c ? this.applyStack(r, A, c) : A[v], M);
      D.skip = isNaN(L) || isNaN(F) || B, D.stop = M > 0 && Math.abs(A[p] - k[p]) > b, _ && (D.parsed = A, D.raw = d.data[M]), h && (D.options = u || this.resolveDataElementOptions(M, C.active ? "active" : n)), g || this.updateElement(C, M, D, n), k = A;
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
    const d = r._reversePixels ? Er : De;
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
        const { vScale: h } = n._cachedMeta, { _parsed: p } = e, v = p.slice(0, u.lo + 1).reverse().findIndex((_) => !gt(_[h.axis]));
        u.lo -= Math.max(0, v);
        const f = p.slice(u.hi).findIndex((_) => !gt(_[h.axis]));
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
function qa(e, t, a, s, n) {
  const o = e.getSortedVisibleDatasetMetas(), i = a[t];
  for (let r = 0, c = o.length; r < c; ++r) {
    const { index: d, data: u } = o[r], { lo: h, hi: p } = _c(o[r], t, i, n);
    for (let v = h; v <= p; ++v) {
      const f = u[v];
      f.skip || s(f, d, v);
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
  return !n && !e.isPointInArea(t) || qa(e, a, t, function(r, c, d) {
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
    ], s), { angle: h } = Ko(i, {
      x: t.x,
      y: t.y
    });
    ga(h, d, u) && n.push({
      element: i,
      datasetIndex: r,
      index: c
    });
  }
  return qa(e, a, t, o), n;
}
function wc(e, t, a, s, n, o) {
  let i = [];
  const r = xc(a);
  let c = Number.POSITIVE_INFINITY;
  function d(u, h, p) {
    const v = u.inRange(t.x, t.y, n);
    if (s && !v)
      return;
    const f = u.getCenterPoint(n);
    if (!(!!o || e.isPointInArea(f)) && !v)
      return;
    const b = r(t, f);
    b < c ? (i = [
      {
        element: u,
        datasetIndex: h,
        index: p
      }
    ], c = b) : b === c && i.push({
      element: u,
      datasetIndex: h,
      index: p
    });
  }
  return qa(e, a, t, d), i;
}
function ls(e, t, a, s, n, o) {
  return !o && !e.isPointInArea(t) ? [] : a === "r" && !s ? kc(e, t, a, n) : wc(e, t, a, s, n, o);
}
function En(e, t, a, s, n) {
  const o = [], i = a === "x" ? "inXRange" : "inYRange";
  let r = !1;
  return qa(e, a, t, (c, d, u) => {
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
      const n = Se(t, e), o = a.axis || "x", i = a.includeInvisible || !1, r = a.intersect ? rs(e, n, o, s, i) : ls(e, n, o, !1, s, i), c = [];
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
      const n = Se(t, e), o = a.axis || "xy", i = a.includeInvisible || !1;
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
      const n = Se(t, e), o = a.axis || "xy", i = a.includeInvisible || !1;
      return rs(e, n, o, s, i);
    },
    nearest(e, t, a, s) {
      const n = Se(t, e), o = a.axis || "xy", i = a.includeInvisible || !1;
      return ls(e, n, o, a.intersect, s, i);
    },
    x(e, t, a, s) {
      const n = Se(t, e);
      return En(e, n, "x", a.intersect, s);
    },
    y(e, t, a, s) {
      const n = Se(t, e);
      return En(e, n, "y", a.intersect, s);
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
function Sc(e) {
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
function Cc(e, t) {
  const a = Sc(e), { vBoxMaxWidth: s, hBoxMaxHeight: n } = t;
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
    const h = s[a.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, a.horizontal ? o.height : o.width), a.size = h.size / h.count, e[n] += a.size;
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
    const { same: h, other: p } = Ac(t, a, r, s);
    d |= h && n.length, u = u || p, c.fullSize || n.push(r);
  }
  return d && aa(n, t, a, s) || u;
}
function Ca(e, t, a, s, n) {
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
    const n = Yt(e.options.layout.padding), o = Math.max(t - n.width, 0), i = Math.max(a - n.height, 0), r = Dc(e.boxes), c = r.vertical, d = r.horizontal;
    pt(e.boxes, (_) => {
      typeof _.beforeLayout == "function" && _.beforeLayout();
    });
    const u = c.reduce((_, b) => b.box.options && b.box.options.display === !1 ? _ : _ + 1, 0) || 1, h = Object.freeze({
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
    }, n), f = Cc(c.concat(d), h);
    aa(r.fullSize, v, h, f), aa(c, v, h, f), aa(d, v, h, f) && aa(c, v, h, f), Tc(v), zn(r.leftAndTop, v, h, f), v.x += v.w, v.y += v.h, zn(r.rightAndBottom, v, h, f), e.chartArea = {
      left: v.left,
      top: v.top,
      right: v.left + v.w,
      bottom: v.top + v.h,
      height: v.h,
      width: v.w
    }, pt(r.chartArea, (_) => {
      const b = _.box;
      Object.assign(b, e.chartArea), b.update(v.w, v.h, {
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
function Rc(e, t, a) {
  e && e.canvas && e.canvas.removeEventListener(t, a, bi);
}
function Ec(e, t) {
  const a = Fc[e.type] || e.type, { x: s, y: n } = Se(e, t);
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
    e.ctx !== null && a(Ec(o, e));
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
      gt(i) ? a.removeAttribute(o) : a.setAttribute(o, i);
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
    }[a] || Rc)(t, a, n), s[a] = void 0;
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
let le = class {
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
  const a = e.options.ticks, s = Uc(e), n = Math.min(a.maxTicksLimit || s, s), o = a.major.enabled ? Xc(t) : [], i = o.length, r = o[0], c = o[i - 1], d = [];
  if (i > n)
    return Gc(t, d, o, i / n), d;
  const u = qc(o, t, n);
  if (i > 0) {
    let h, p;
    const v = i > 1 ? Math.round((c - r) / (i - 1)) : null;
    for (Da(t, d, u, gt(v) ? 0 : r - v, r), h = 0, p = i - 1; h < p; h++)
      Da(t, d, u, o[h], o[h + 1]);
    return Da(t, d, u, c, gt(v) ? t.length : c + v), d;
  }
  return Da(t, d, u), d;
}
function Uc(e) {
  const t = e.options.offset, a = e._tickSize(), s = e._length / a + (t ? 0 : 1), n = e._maxLength / a;
  return Math.floor(Math.min(s, n));
}
function qc(e, t, a) {
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
  pt(e, (a) => {
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
function Kn(e, t) {
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
  let h = 0, p, v, f;
  const _ = i - n, b = r - o;
  if (e.isHorizontal()) {
    if (v = Dt(s, o, r), ht(a)) {
      const g = Object.keys(a)[0], y = a[g];
      f = u[g].getPixelForValue(y) + _ - t;
    } else a === "center" ? f = (d.bottom + d.top) / 2 + _ - t : f = Hn(e, a, t);
    p = r - o;
  } else {
    if (ht(a)) {
      const g = Object.keys(a)[0], y = a[g];
      v = u[g].getPixelForValue(y) - b + t;
    } else a === "center" ? v = (d.left + d.right) / 2 - b + t : v = Hn(e, a, t);
    f = Dt(s, i, n), h = a === "left" ? -Ct : Ct;
  }
  return {
    titleX: v,
    titleY: f,
    maxWidth: p,
    rotation: h
  };
}
class je extends le {
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
    const u = this._getLabelSizes(), h = u.widest.width, p = u.highest.height, v = Tt(this.chart.width - h, 0, this.maxWidth);
    r = t.offset ? this.maxWidth / s : v / (s - 1), h + 6 > r && (r = v / (s - (t.offset ? 0.5 : 1)), c = this.maxHeight - Ze(t.grid) - a.padding - Kn(t.title, this.chart.options.font), d = Math.sqrt(h * h + p * p), i = Pr(Math.min(Math.asin(Tt((u.highest.height + 6) / r, -1, 1)), Math.asin(Tt(c / d, -1, 1)) - Math.asin(Tt(p / d, -1, 1)))), i = Math.max(n, Math.min(o, i))), this.labelRotation = i;
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
      const c = Kn(n, a.options.font);
      if (r ? (t.width = this.maxWidth, t.height = Ze(o) + c) : (t.height = this.maxHeight, t.width = Ze(o) + c), s.display && this.ticks.length) {
        const { first: d, last: u, widest: h, highest: p } = this._getLabelSizes(), v = s.padding * 2, f = ne(this.labelRotation), _ = Math.cos(f), b = Math.sin(f);
        if (r) {
          const g = s.mirror ? 0 : b * h.width + _ * p.height;
          t.height = Math.min(this.maxHeight, t.height + g + v);
        } else {
          const g = s.mirror ? 0 : _ * h.width + b * p.height;
          t.width = Math.min(this.maxWidth, t.width + g + v);
        }
        this._calculatePadding(d, u, b, _);
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
      gt(t[a].label) && (t.splice(a, 1), s--, a--);
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
    let d = 0, u = 0, h, p, v, f, _, b, g, y, w, k, M;
    for (h = 0; h < a; h += c) {
      if (f = t[h].label, _ = this._resolveTickFontOptions(h), n.font = b = _.string, g = o[b] = o[b] || {
        data: {},
        gc: []
      }, y = _.lineHeight, w = k = 0, !gt(f) && !Mt(f))
        w = yn(n, g.data, g.gc, w, f), k = y;
      else if (Mt(f))
        for (p = 0, v = f.length; p < v; ++p)
          M = f[p], !gt(M) && !Mt(M) && (w = yn(n, g.data, g.gc, w, M), k += y);
      i.push(w), r.push(k), d = Math.max(w, d), u = Math.max(k, u);
    }
    td(o, a);
    const C = i.indexOf(d), D = r.indexOf(u), A = (B) => ({
      width: i[B] || 0,
      height: r[B] || 0
    });
    return {
      first: A(0),
      last: A(a - 1),
      widest: A(C),
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
    return Rr(this._alignToPixels ? we(this.chart, a, 0) : a);
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
    const t = this.options.ticks, a = ne(this.labelRotation), s = Math.abs(Math.cos(a)), n = Math.abs(Math.sin(a)), o = this._getLabelSizes(), i = t.autoSkipPadding || 0, r = o ? o.widest.width + i : 0, c = o ? o.highest.height + i : 0;
    return this.isHorizontal() ? c * s > r * n ? r / s : c / n : c * n < r * s ? c / s : r / n;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const a = this.axis, s = this.chart, n = this.options, { grid: o, position: i, border: r } = n, c = o.offset, d = this.isHorizontal(), h = this.ticks.length + (c ? 1 : 0), p = Ze(o), v = [], f = r.setContext(this.getContext()), _ = f.display ? f.width : 0, b = _ / 2, g = function(V) {
      return we(s, V, _);
    };
    let y, w, k, M, C, D, A, B, L, F, O, W;
    if (i === "top")
      y = g(this.bottom), D = this.bottom - p, B = y - b, F = g(t.top) + b, W = t.bottom;
    else if (i === "bottom")
      y = g(this.top), F = t.top, W = g(t.bottom) - b, D = y + b, B = this.top + p;
    else if (i === "left")
      y = g(this.right), C = this.right - p, A = y - b, L = g(t.left) + b, O = t.right;
    else if (i === "right")
      y = g(this.left), L = t.left, O = g(t.right) - b, C = y + b, A = this.left + p;
    else if (a === "x") {
      if (i === "center")
        y = g((t.top + t.bottom) / 2 + 0.5);
      else if (ht(i)) {
        const V = Object.keys(i)[0], H = i[V];
        y = g(this.chart.scales[V].getPixelForValue(H));
      }
      F = t.top, W = t.bottom, D = y + b, B = D + p;
    } else if (a === "y") {
      if (i === "center")
        y = g((t.left + t.right) / 2);
      else if (ht(i)) {
        const V = Object.keys(i)[0], H = i[V];
        y = g(this.chart.scales[V].getPixelForValue(H));
      }
      C = y - b, A = C - p, L = t.left, O = t.right;
    }
    const P = it(n.ticks.maxTicksLimit, h), I = Math.max(1, Math.ceil(h / P));
    for (w = 0; w < h; w += I) {
      const V = this.getContext(w), H = o.setContext(V), Y = r.setContext(V), j = H.lineWidth, N = H.color, et = Y.dash || [], G = Y.dashOffset, U = H.tickWidth, ot = H.tickColor, wt = H.tickBorderDash || [], ft = H.tickBorderDashOffset;
      k = Jc(this, w, c), k !== void 0 && (M = we(s, k, j), d ? C = A = L = O = M : D = B = F = W = M, v.push({
        tx1: C,
        ty1: D,
        tx2: A,
        ty2: B,
        x1: L,
        y1: F,
        x2: O,
        y2: W,
        width: j,
        color: N,
        borderDash: et,
        borderDashOffset: G,
        tickWidth: U,
        tickColor: ot,
        tickBorderDash: wt,
        tickBorderDashOffset: ft
      }));
    }
    return this._ticksLength = h, this._borderValue = y, v;
  }
  _computeLabelItems(t) {
    const a = this.axis, s = this.options, { position: n, ticks: o } = s, i = this.isHorizontal(), r = this.ticks, { align: c, crossAlign: d, padding: u, mirror: h } = o, p = Ze(s.grid), v = p + u, f = h ? -u : v, _ = -ne(this.labelRotation), b = [];
    let g, y, w, k, M, C, D, A, B, L, F, O, W = "middle";
    if (n === "top")
      C = this.bottom - f, D = this._getXAxisLabelAlignment();
    else if (n === "bottom")
      C = this.top + f, D = this._getXAxisLabelAlignment();
    else if (n === "left") {
      const I = this._getYAxisLabelAlignment(p);
      D = I.textAlign, M = I.x;
    } else if (n === "right") {
      const I = this._getYAxisLabelAlignment(p);
      D = I.textAlign, M = I.x;
    } else if (a === "x") {
      if (n === "center")
        C = (t.top + t.bottom) / 2 + v;
      else if (ht(n)) {
        const I = Object.keys(n)[0], V = n[I];
        C = this.chart.scales[I].getPixelForValue(V) + v;
      }
      D = this._getXAxisLabelAlignment();
    } else if (a === "y") {
      if (n === "center")
        M = (t.left + t.right) / 2 - v;
      else if (ht(n)) {
        const I = Object.keys(n)[0], V = n[I];
        M = this.chart.scales[I].getPixelForValue(V);
      }
      D = this._getYAxisLabelAlignment(p).textAlign;
    }
    a === "y" && (c === "start" ? W = "top" : c === "end" && (W = "bottom"));
    const P = this._getLabelSizes();
    for (g = 0, y = r.length; g < y; ++g) {
      w = r[g], k = w.label;
      const I = o.setContext(this.getContext(g));
      A = this.getPixelForTick(g) + o.labelOffset, B = this._resolveTickFontOptions(g), L = B.lineHeight, F = Mt(k) ? k.length : 1;
      const V = F / 2, H = I.color, Y = I.textStrokeColor, j = I.textStrokeWidth;
      let N = D;
      i ? (M = A, D === "inner" && (g === y - 1 ? N = this.options.reverse ? "left" : "right" : g === 0 ? N = this.options.reverse ? "right" : "left" : N = "center"), n === "top" ? d === "near" || _ !== 0 ? O = -F * L + L / 2 : d === "center" ? O = -P.highest.height / 2 - V * L + L : O = -P.highest.height + L / 2 : d === "near" || _ !== 0 ? O = L / 2 : d === "center" ? O = P.highest.height / 2 - V * L : O = P.highest.height - F * L, h && (O *= -1), _ !== 0 && !I.showLabelBackdrop && (M += L / 2 * Math.sin(_))) : (C = A, O = (1 - F) * L / 2);
      let et;
      if (I.showLabelBackdrop) {
        const G = Yt(I.backdropPadding), U = P.heights[g], ot = P.widths[g];
        let wt = O - G.top, ft = 0 - G.left;
        switch (W) {
          case "middle":
            wt -= U / 2;
            break;
          case "bottom":
            wt -= U;
            break;
        }
        switch (D) {
          case "center":
            ft -= ot / 2;
            break;
          case "right":
            ft -= ot;
            break;
          case "inner":
            g === y - 1 ? ft -= ot : g > 0 && (ft -= ot / 2);
            break;
        }
        et = {
          left: ft,
          top: wt,
          width: ot + G.width,
          height: U + G.height,
          color: I.backdropColor
        };
      }
      b.push({
        label: k,
        font: B,
        textOffset: O,
        options: {
          rotation: _,
          color: H,
          strokeColor: Y,
          strokeWidth: j,
          textAlign: N,
          textBaseline: W,
          translation: [
            M,
            C
          ],
          backdrop: et
        }
      });
    }
    return b;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: a } = this.options;
    if (-ne(this.labelRotation))
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
    this.isHorizontal() ? (d = we(t, this.left, i) - i / 2, u = we(t, this.right, r) + r / 2, h = p = c) : (h = we(t, this.top, i) - i / 2, p = we(t, this.bottom, r) + r / 2, d = u = c), a.save(), a.lineWidth = o.width, a.strokeStyle = o.color, a.beginPath(), a.moveTo(d, h), a.lineTo(u, p), a.stroke(), a.restore();
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
    const { titleX: d, titleY: u, maxWidth: h, rotation: p } = nd(this, c, a, r);
    va(t, s.text, 0, 0, o, {
      color: s.color,
      maxWidth: h,
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
    this.controllers = new Aa(Ua, "datasets", !0), this.elements = new Aa(le, "elements"), this.plugins = new Aa(Object, "plugins"), this.scales = new Aa(je, "scales"), this._typedRegistries = [
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
      s || o.isForType(n) || o === this.plugins && n.id ? this._exec(t, o, n) : pt(n, (i) => {
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
    gt(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
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
function qn(e, t, a) {
  if (a[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function bd(e, t) {
  if (t.data && t.data.datasets) {
    const a = t.data.datasets.filter((s) => s.xAxisID === e || s.yAxisID === e);
    if (a.length)
      return qn(e, "x", a[0]) || qn(e, "y", a[0]);
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
    Object.keys(u).forEach((h) => {
      const p = gd(h, c), v = i[p + "AxisID"] || p;
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
      t && (c.add(t), u.forEach((h) => Qe(c, t, h))), u.forEach((h) => Qe(c, n, h)), u.forEach((h) => Qe(c, Be[o] || {}, h)), u.forEach((h) => Qe(c, $t, h)), u.forEach((h) => Qe(c, As, h));
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
    resolver: Ks(t, a),
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
function Sd(e, t, a) {
  const s = Object.keys(e);
  for (const n of s) {
    const o = +n;
    if (o >= t) {
      const i = e[n];
      delete e[n], (a > 0 || o > t) && (e[o + a] = i);
    }
  }
}
function Cd(e, t, a, s) {
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
    if (this.id = xr(), this.ctx = r, this.canvas = c, this.width = u, this.height = d, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new cd(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = zr((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], Pa[this.id] = this, !r || !c) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    ee.listen(this, "complete", Jn), ee.listen(this, "progress", Md), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: a }, width: s, height: n, _aspectRatio: o } = this;
    return gt(t) ? a && o ? o : n ? s / n : null : t;
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
    return ee.stop(this), this;
  }
  resize(t, a) {
    ee.running(this) ? this._resizeBeforeDraw = {
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
    pt(a, (s, n) => {
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
    }))), pt(o, (i) => {
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
    }), pt(n, (i, r) => {
      i || delete s[r];
    }), pt(s, (i) => {
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
    pt(this.data.datasets, (t, a) => {
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
    i = this._minPadding = s.layout.autoPadding ? i : 0, this._updateLayout(i), n || pt(o, (d) => {
      d.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(Qn("z", "_idx"));
    const { _active: r, _lastEvent: c } = this;
    c ? this._eventHandler(c, !0) : r.length && this._updateHoverStyles(r, r, !0), this.render();
  }
  _updateScales() {
    pt(this.scales, (t) => {
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
      Sd(t, n, i);
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
    this._layers = [], pt(this.boxes, (n) => {
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
    }) !== !1 && (ee.has(this) ? this.attached && !ee.running(this) && ee.start(this) : (this.draw(), Jn({
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
    for (this.stop(), ee.remove(this), t = 0, a = this.data.datasets.length; t < a; ++t)
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
    pt(this.options.events, (o) => s(o, n));
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
    pt(this._listeners, (t, a) => {
      this.platform.removeEventListener(this, a, t);
    }), this._listeners = {}, pt(this._responsiveListeners, (t, a) => {
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
    const { _active: n = [], options: o } = this, i = a, r = this._getActiveElements(t, n, s, i), c = Cr(t), d = Cd(t, this._lastEvent, s, c);
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
  return pt(Ye.instances, (e) => e._plugins.invalidate());
}
function Dd(e, t, a) {
  const { startAngle: s, x: n, y: o, outerRadius: i, innerRadius: r, options: c } = t, { borderWidth: d, borderJoinStyle: u } = c, h = Math.min(d / i, Wt(s - a));
  if (e.beginPath(), e.arc(n, o, i - d / 2, s + h / 2, a - h / 2), r > 0) {
    const p = Math.min(d / r, Wt(s - a));
    e.arc(n, o, r + d / 2, a - p / 2, s + p / 2, !0);
  } else {
    const p = Math.min(d / 2, i * Wt(s - a));
    if (u === "round")
      e.arc(n, o, p, a - mt / 2, s + mt / 2, !0);
    else if (u === "bevel") {
      const v = 2 * p * p, f = -v * Math.cos(a + mt / 2) + n, _ = -v * Math.sin(a + mt / 2) + o, b = v * Math.cos(s + mt / 2) + n, g = v * Math.sin(s + mt / 2) + o;
      e.lineTo(f, _), e.lineTo(b, g);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Ad(e, t, a) {
  const { startAngle: s, pixelMargin: n, x: o, y: i, outerRadius: r, innerRadius: c } = t;
  let d = n / r;
  e.beginPath(), e.arc(o, i, r, s - d, a + d), c > n ? (d = n / c, e.arc(o, i, c, a + d, s - d, !0)) : e.arc(o, i, n, a + Ct, s - Ct), e.closePath(), e.clip();
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
  const { x: i, y: r, startAngle: c, pixelMargin: d, innerRadius: u } = t, h = Math.max(t.outerRadius + s + a - d, 0), p = u > 0 ? u + s + a + d : 0;
  let v = 0;
  const f = n - c;
  if (s) {
    const I = u > 0 ? u - s : 0, V = h > 0 ? h - s : 0, H = (I + V) / 2, Y = H !== 0 ? f * H / (H + s) : f;
    v = (f - Y) / 2;
  }
  const _ = Math.max(1e-3, f * h - a / mt) / h, b = (f - _) / 2, g = c + b + v, y = n - b - v, { outerStart: w, outerEnd: k, innerStart: M, innerEnd: C } = Bd(t, p, h, y - g), D = h - w, A = h - k, B = g + w / D, L = y - k / A, F = p + M, O = p + C, W = g + M / F, P = y - C / O;
  if (e.beginPath(), o) {
    const I = (B + L) / 2;
    if (e.arc(i, r, h, B, I), e.arc(i, r, h, I, L), k > 0) {
      const j = Ie(A, L, i, r);
      e.arc(j.x, j.y, k, L, y + Ct);
    }
    const V = Ie(O, y, i, r);
    if (e.lineTo(V.x, V.y), C > 0) {
      const j = Ie(O, P, i, r);
      e.arc(j.x, j.y, C, y + Ct, P + Math.PI);
    }
    const H = (y - C / p + (g + M / p)) / 2;
    if (e.arc(i, r, p, y - C / p, H, !0), e.arc(i, r, p, H, g + M / p, !0), M > 0) {
      const j = Ie(F, W, i, r);
      e.arc(j.x, j.y, M, W + Math.PI, g - Ct);
    }
    const Y = Ie(D, g, i, r);
    if (e.lineTo(Y.x, Y.y), w > 0) {
      const j = Ie(D, B, i, r);
      e.arc(j.x, j.y, w, g - Ct, B);
    }
  } else {
    e.moveTo(i, r);
    const I = Math.cos(B) * h + i, V = Math.sin(B) * h + r;
    e.lineTo(I, V);
    const H = Math.cos(L) * h + i, Y = Math.sin(L) * h + r;
    e.lineTo(H, Y);
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
  const { fullCircles: o, startAngle: i, circumference: r, options: c } = t, { borderWidth: d, borderJoinStyle: u, borderDash: h, borderDashOffset: p, borderRadius: v } = c, f = c.borderAlign === "inner";
  if (!d)
    return;
  e.setLineDash(h || []), e.lineDashOffset = p, f ? (e.lineWidth = d * 2, e.lineJoin = u || "round") : (e.lineWidth = d, e.lineJoin = u || "bevel");
  let _ = t.endAngle;
  if (o) {
    Ha(e, t, a, s, _, n);
    for (let b = 0; b < o; ++b)
      e.stroke();
    isNaN(r) || (_ = i + (r % _t || _t));
  }
  f && Ad(e, t, _), c.selfJoin && _ - i >= mt && v === 0 && u !== "miter" && Dd(e, t, _), o || (Ha(e, t, a, s, _, n), e.stroke());
}
class Pd extends le {
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
    ], s), { angle: o, distance: i } = Ko(n, {
      x: t,
      y: a
    }), { startAngle: r, endAngle: c, innerRadius: d, outerRadius: u, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], s), p = (this.options.spacing + this.options.borderWidth) / 2, v = it(h, c - r), f = ga(o, r, c) && r !== c, _ = v >= _t || f, b = oe(i, d + p, u + p);
    return _ && b;
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
    t.fillStyle = a.backgroundColor, t.strokeStyle = a.borderColor, Ld(t, this, d, o, i), Fd(t, this, d, o, i), t.restore();
  }
}
function wi(e, t, a = t) {
  e.lineCap = it(a.borderCapStyle, t.borderCapStyle), e.setLineDash(it(a.borderDash, t.borderDash)), e.lineDashOffset = it(a.borderDashOffset, t.borderDashOffset), e.lineJoin = it(a.borderJoinStyle, t.borderJoinStyle), e.lineWidth = it(a.borderWidth, t.borderWidth), e.strokeStyle = it(a.borderColor, t.borderColor);
}
function Id(e, t, a) {
  e.lineTo(a.x, a.y);
}
function Rd(e) {
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
function Ed(e, t, a, s) {
  const { points: n, options: o } = t, { count: i, start: r, loop: c, ilen: d } = $i(n, a, s), u = Rd(o);
  let { move: h = !0, reverse: p } = s || {}, v, f, _;
  for (v = 0; v <= d; ++v)
    f = n[(r + (p ? d - v : v)) % i], !f.skip && (h ? (e.moveTo(f.x, f.y), h = !1) : u(e, _, f, p, o.stepped), _ = f);
  return c && (f = n[(r + (p ? d : 0)) % i], u(e, _, f, p, o.stepped)), !!c;
}
function Od(e, t, a, s) {
  const n = t.points, { count: o, start: i, ilen: r } = $i(n, a, s), { move: c = !0, reverse: d } = s || {};
  let u = 0, h = 0, p, v, f, _, b, g;
  const y = (k) => (i + (d ? r - k : k)) % o, w = () => {
    _ !== b && (e.lineTo(u, b), e.lineTo(u, _), e.lineTo(u, g));
  };
  for (c && (v = n[y(0)], e.moveTo(v.x, v.y)), p = 0; p <= r; ++p) {
    if (v = n[y(p)], v.skip)
      continue;
    const k = v.x, M = v.y, C = k | 0;
    C === f ? (M < _ ? _ = M : M > b && (b = M), u = (h * u + k) / ++h) : (w(), e.lineTo(k, M), f = C, h = 0, _ = b = M), g = M;
  }
  w();
}
function Fs(e) {
  const t = e.options, a = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !a ? Od : Ed;
}
function Vd(e) {
  return e.stepped ? Fl : e.tension || e.cubicInterpolationMode === "monotone" ? Pl : Ce;
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
class Xa extends le {
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
      const { start: h, end: p } = i[d], v = o[h], f = o[p];
      if (v === f) {
        r.push(v);
        continue;
      }
      const _ = Math.abs((n - v[a]) / (f[a] - v[a])), b = c(v, f, _, s.stepped);
      b[a] = t[a], r.push(b);
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
class jd extends le {
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
  let r, c, d, u, h;
  return e.horizontal ? (h = i / 2, r = Math.min(a, n), c = Math.max(a, n), d = s - h, u = s + h) : (h = o / 2, r = a - h, c = a + h, d = Math.min(s, n), u = Math.max(s, n)), {
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
function Kd(e, t, a) {
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
  const t = Mi(e), a = t.right - t.left, s = t.bottom - t.top, n = Yd(e, a / 2, s / 2), o = Kd(e, a / 2, s / 2);
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
  return r && (n || oe(t, r.left, r.right)) && (o || oe(a, r.top, r.bottom));
}
function qd(e) {
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
class Gd extends le {
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
    const { inflateAmount: a, options: { borderColor: s, backgroundColor: n } } = this, { inner: o, outer: i } = Ud(this), r = qd(i.radius) ? za : Xd;
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
    const h = ci(t, u);
    for (const p of h) {
      const v = Ps(a, o[p.start], o[p.end], p.loop), f = li(r, n, v);
      for (const _ of f)
        i.push({
          source: _,
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
function Si(e, t) {
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
  r.push(Si({
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
    const u = o[d], h = i[u.start][a], p = i[u.end][a];
    if (oe(n, h, p)) {
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
class Ci {
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
  return n instanceof Ci ? n : Si(n, s);
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
    return new Ci({
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
  const s = cu(t), { chart: n, index: o, line: i, scale: r, axis: c } = t, d = i.options, u = d.fill, h = d.backgroundColor, { above: p = h, below: v = h } = u || {}, f = n.getDatasetMeta(o), _ = di(n, f);
  s && i.points.length && (ja(e, a), gu(e, {
    line: i,
    target: s,
    above: p,
    below: v,
    area: a,
    scale: r,
    axis: c,
    clip: _
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
  const { line: a, target: s, property: n, color: o, scale: i, clip: r } = t, c = Zd(a, s, n);
  for (const { source: d, target: u, start: h, end: p } of c) {
    const { style: { backgroundColor: v = o } = {} } = d, f = s !== !0;
    e.save(), e.fillStyle = v, pu(e, i, r, f && Ps(n, h, p)), e.beginPath();
    const _ = !!a.pathSegment(e, d);
    let b;
    if (f) {
      _ ? e.closePath() : ro(e, s, p, n);
      const g = !!s.pathSegment(e, u, {
        move: _,
        reverse: !0
      });
      b = _ && g, b || ro(e, s, h, n);
    }
    e.closePath(), e.fill(b ? "evenodd" : "nonzero"), e.restore();
  }
}
function pu(e, t, a, s) {
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
class co extends le {
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
    let h = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let p = -1, v = -u;
    return this.legendItems.forEach((f, _) => {
      const b = s + a / 2 + o.measureText(f.text).width;
      (_ === 0 || d[d.length - 1] + b + 2 * r > i) && (h += u, d[d.length - (_ > 0 ? 0 : 1)] = 0, v += u, p++), c[_] = {
        left: 0,
        top: v,
        row: p,
        width: b,
        height: n
      }, d[d.length - 1] += b + r;
    }), h;
  }
  _fitCols(t, a, s, n) {
    const { ctx: o, maxHeight: i, options: { labels: { padding: r } } } = this, c = this.legendHitBoxes = [], d = this.columnSizes = [], u = i - t;
    let h = r, p = 0, v = 0, f = 0, _ = 0;
    return this.legendItems.forEach((b, g) => {
      const { itemWidth: y, itemHeight: w } = mu(s, a, o, b, n);
      g > 0 && v + w + 2 * r > u && (h += p + r, d.push({
        width: p,
        height: v
      }), f += p + r, _++, p = v = 0), c[g] = {
        left: f,
        top: v,
        col: _,
        width: y,
        height: w
      }, p = Math.max(p, y), v += w + r;
    }), h += p, d.push({
      width: p,
      height: v
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: a, options: { align: s, labels: { padding: n }, rtl: o } } = this, i = ze(o, this.left, this.width);
    if (this.isHorizontal()) {
      let r = 0, c = Dt(s, this.left + n, this.right - this.lineWidths[r]);
      for (const d of a)
        r !== d.row && (r = d.row, c = Dt(s, this.left + n, this.right - this.lineWidths[r])), d.top += this.top + t + n, d.left = i.leftForLtr(i.x(c), d.width), c += d.width + n;
    } else {
      let r = 0, c = Dt(s, this.top + t + n, this.bottom - this.columnSizes[r].height);
      for (const d of a)
        d.col !== r && (r = d.col, c = Dt(s, this.top + t + n, this.bottom - this.columnSizes[r].height)), d.top = c, d.left += this.left + n, d.left = i.leftForLtr(i.x(d.left), d.width), c += d.height + n;
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
    const { options: t, columnSizes: a, lineWidths: s, ctx: n } = this, { align: o, labels: i } = t, r = $t.color, c = ze(t.rtl, this.left, this.width), d = Bt(i.font), { padding: u } = i, h = d.size, p = h / 2;
    let v;
    this.drawTitle(), n.textAlign = c.textAlign("left"), n.textBaseline = "middle", n.lineWidth = 0.5, n.font = d.string;
    const { boxWidth: f, boxHeight: _, itemHeight: b } = lo(i, h), g = function(C, D, A) {
      if (isNaN(f) || f <= 0 || isNaN(_) || _ < 0)
        return;
      n.save();
      const B = it(A.lineWidth, 1);
      if (n.fillStyle = it(A.fillStyle, r), n.lineCap = it(A.lineCap, "butt"), n.lineDashOffset = it(A.lineDashOffset, 0), n.lineJoin = it(A.lineJoin, "miter"), n.lineWidth = B, n.strokeStyle = it(A.strokeStyle, r), n.setLineDash(it(A.lineDash, [])), i.usePointStyle) {
        const L = {
          radius: _ * Math.SQRT2 / 2,
          pointStyle: A.pointStyle,
          rotation: A.rotation,
          borderWidth: B
        }, F = c.xPlus(C, f / 2), O = D + p;
        Qo(n, L, F, O, i.pointStyleWidth && f);
      } else {
        const L = D + Math.max((h - _) / 2, 0), F = c.leftForLtr(C, f), O = Ve(A.borderRadius);
        n.beginPath(), Object.values(O).some((W) => W !== 0) ? za(n, {
          x: F,
          y: L,
          w: f,
          h: _,
          radius: O
        }) : n.rect(F, L, f, _), n.fill(), B !== 0 && n.stroke();
      }
      n.restore();
    }, y = function(C, D, A) {
      va(n, A.text, C, D + b / 2, d, {
        strikethrough: A.hidden,
        textAlign: c.textAlign(A.textAlign)
      });
    }, w = this.isHorizontal(), k = this._computeTitleHeight();
    w ? v = {
      x: Dt(o, this.left + u, this.right - s[0]),
      y: this.top + u + k,
      line: 0
    } : v = {
      x: this.left + u,
      y: Dt(o, this.top + k + u, this.bottom - a[0].height),
      line: 0
    }, oi(this.ctx, t.textDirection);
    const M = b + u;
    this.legendItems.forEach((C, D) => {
      n.strokeStyle = C.fontColor, n.fillStyle = C.fontColor;
      const A = n.measureText(C.text).width, B = c.textAlign(C.textAlign || (C.textAlign = i.textAlign)), L = f + p + A;
      let F = v.x, O = v.y;
      c.setWidth(this.width), w ? D > 0 && F + L + u > this.right && (O = v.y += M, v.line++, F = v.x = Dt(o, this.left + u, this.right - s[v.line])) : D > 0 && O + M > this.bottom && (F = v.x = F + a[v.line].width + u, v.line++, O = v.y = Dt(o, this.top + k + u, this.bottom - a[v.line].height));
      const W = c.x(F);
      if (g(W, O, C), F = Nr(B, F + f + p, w ? F + L : this.right, t.rtl), y(c.x(F), O, C), w)
        v.x += L + u;
      else if (typeof C.text != "string") {
        const P = d.lineHeight;
        v.y += Di(C, P) + u;
      } else
        v.y += M;
    }), ii(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, a = t.title, s = Bt(a.font), n = Yt(a.padding);
    if (!a.display)
      return;
    const o = ze(t.rtl, this.left, this.width), i = this.ctx, r = a.position, c = s.size / 2, d = n.top + c;
    let u, h = this.left, p = this.width;
    if (this.isHorizontal())
      p = Math.max(...this.lineWidths), u = this.top + d, h = Dt(t.align, h, this.right - p);
    else {
      const f = this.columnSizes.reduce((_, b) => Math.max(_, b.height), 0);
      u = d + Dt(t.align, this.top, this.bottom - f - t.labels.padding - this._computeTitleHeight());
    }
    const v = Dt(r, h, h + p);
    i.textAlign = o.textAlign(Ws(r)), i.textBaseline = "middle", i.strokeStyle = a.color, i.fillStyle = a.color, i.font = s.string, va(i, a.text, v, u, s);
  }
  _computeTitleHeight() {
    const t = this.options.title, a = Bt(t.font), s = Yt(t.padding);
    return t.display ? a.lineHeight + s.height : 0;
  }
  _getLegendItemAt(t, a) {
    let s, n, o;
    if (oe(t, this.left, this.right) && oe(a, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, s = 0; s < o.length; ++s)
        if (n = o[s], oe(t, n.left, n.left + n.width) && oe(a, n.top, n.top + n.height))
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
class Ai extends le {
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
    let c = 0, d, u, h;
    return this.isHorizontal() ? (u = Dt(r, s, o), h = a + t, d = o - s) : (i.position === "left" ? (u = s + t, h = Dt(r, n, a), c = mt * -0.5) : (u = o - t, h = Dt(r, a, n), c = mt * 0.5), d = n - a), {
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
function ae(e) {
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
  const a = e.chart.ctx, { body: s, footer: n, title: o } = e, { boxWidth: i, boxHeight: r } = t, c = Bt(t.bodyFont), d = Bt(t.titleFont), u = Bt(t.footerFont), h = o.length, p = n.length, v = s.length, f = Yt(t.padding);
  let _ = f.height, b = 0, g = s.reduce((k, M) => k + M.before.length + M.lines.length + M.after.length, 0);
  if (g += e.beforeBody.length + e.afterBody.length, h && (_ += h * d.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), g) {
    const k = t.displayColors ? Math.max(r, c.lineHeight) : c.lineHeight;
    _ += v * k + (g - v) * c.lineHeight + (g - 1) * t.bodySpacing;
  }
  p && (_ += t.footerMarginTop + p * u.lineHeight + (p - 1) * t.footerSpacing);
  let y = 0;
  const w = function(k) {
    b = Math.max(b, a.measureText(k).width + y);
  };
  return a.save(), a.font = d.string, pt(e.title, w), a.font = c.string, pt(e.beforeBody.concat(e.afterBody), w), y = t.displayColors ? i + 2 + t.boxPadding : 0, pt(s, (k) => {
    pt(k.before, w), pt(k.lines, w), pt(k.after, w);
  }), y = 0, a.font = u.string, pt(e.footer, w), a.restore(), b += f.width, {
    width: b,
    height: _
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
function Su(e, t, a, s) {
  const { x: n, width: o } = a, { width: i, chartArea: { left: r, right: c } } = e;
  let d = "center";
  return s === "center" ? d = n <= (r + c) / 2 ? "left" : "right" : n <= o / 2 ? d = "left" : n >= i - o / 2 && (d = "right"), Mu(d, e, t, a) && (d = "center"), d;
}
function ho(e, t, a) {
  const s = a.yAlign || t.yAlign || $u(e, a);
  return {
    xAlign: a.xAlign || t.xAlign || Su(e, t, a, s),
    yAlign: s
  };
}
function Cu(e, t) {
  let { x: a, width: s } = e;
  return t === "right" ? a -= s : t === "center" && (a -= s / 2), a;
}
function Du(e, t, a) {
  let { y: s, height: n } = e;
  return t === "top" ? s += a : t === "bottom" ? s -= n + a : s -= n / 2, s;
}
function fo(e, t, a, s) {
  const { caretSize: n, caretPadding: o, cornerRadius: i } = e, { xAlign: r, yAlign: c } = a, d = n + o, { topLeft: u, topRight: h, bottomLeft: p, bottomRight: v } = Ve(i);
  let f = Cu(t, r);
  const _ = Du(t, c, d);
  return c === "center" ? r === "left" ? f += d : r === "right" && (f -= d) : r === "left" ? f -= Math.max(u, p) + n : r === "right" && (f += Math.max(h, v) + n), {
    x: Tt(f, 0, s.width - t.width),
    y: Tt(_, 0, s.height - t.height)
  };
}
function Ba(e, t, a) {
  const s = Yt(a.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - s.right : e.x + s.left;
}
function go(e) {
  return Gt([], ae(e));
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
  beforeTitle: te,
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
  afterTitle: te,
  beforeBody: te,
  beforeLabel: te,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const a = e.formattedValue;
    return gt(a) || (t += a), t;
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
  afterLabel: te,
  afterBody: te,
  beforeFooter: te,
  footer: te,
  afterFooter: te
};
function Et(e, t, a, s) {
  const n = e[t].call(a, s);
  return typeof n > "u" ? Bi[t].call(a, s) : n;
}
class vo extends le {
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
    const { callbacks: s } = a, n = Et(s, "beforeTitle", this, t), o = Et(s, "title", this, t), i = Et(s, "afterTitle", this, t);
    let r = [];
    return r = Gt(r, ae(n)), r = Gt(r, ae(o)), r = Gt(r, ae(i)), r;
  }
  getBeforeBody(t, a) {
    return go(Et(a.callbacks, "beforeBody", this, t));
  }
  getBody(t, a) {
    const { callbacks: s } = a, n = [];
    return pt(t, (o) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, r = po(s, o);
      Gt(i.before, ae(Et(r, "beforeLabel", this, o))), Gt(i.lines, Et(r, "label", this, o)), Gt(i.after, ae(Et(r, "afterLabel", this, o))), n.push(i);
    }), n;
  }
  getAfterBody(t, a) {
    return go(Et(a.callbacks, "afterBody", this, t));
  }
  getFooter(t, a) {
    const { callbacks: s } = a, n = Et(s, "beforeFooter", this, t), o = Et(s, "footer", this, t), i = Et(s, "afterFooter", this, t);
    let r = [];
    return r = Gt(r, ae(n)), r = Gt(r, ae(o)), r = Gt(r, ae(i)), r;
  }
  _createItems(t) {
    const a = this._active, s = this.chart.data, n = [], o = [], i = [];
    let r = [], c, d;
    for (c = 0, d = a.length; c < d; ++c)
      r.push(wu(this.chart, a[c]));
    return t.filter && (r = r.filter((u, h, p) => t.filter(u, h, p, s))), t.itemSort && (r = r.sort((u, h) => t.itemSort(u, h, s))), pt(r, (u) => {
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
    const { xAlign: n, yAlign: o } = this, { caretSize: i, cornerRadius: r } = s, { topLeft: c, topRight: d, bottomLeft: u, bottomRight: h } = Ve(r), { x: p, y: v } = t, { width: f, height: _ } = a;
    let b, g, y, w, k, M;
    return o === "center" ? (k = v + _ / 2, n === "left" ? (b = p, g = b - i, w = k + i, M = k - i) : (b = p + f, g = b + i, w = k - i, M = k + i), y = b) : (n === "left" ? g = p + Math.max(c, u) + i : n === "right" ? g = p + f - Math.max(d, h) - i : g = this.caretX, o === "top" ? (w = v, k = w - i, b = g - i, y = g + i) : (w = v + _, k = w + i, b = g + i, y = g - i), M = w), {
      x1: b,
      x2: g,
      x3: y,
      y1: w,
      y2: k,
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
    const i = this.labelColors[s], r = this.labelPointStyles[s], { boxHeight: c, boxWidth: d } = o, u = Bt(o.bodyFont), h = Ba(this, "left", o), p = n.x(h), v = c < u.lineHeight ? (u.lineHeight - c) / 2 : 0, f = a.y + v;
    if (o.usePointStyle) {
      const _ = {
        radius: Math.min(d, c) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, b = n.leftForLtr(p, d) + d / 2, g = f + c / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, Ts(t, _, b, g), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, Ts(t, _, b, g);
    } else {
      t.lineWidth = ht(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const _ = n.leftForLtr(p, d), b = n.leftForLtr(n.xPlus(p, 1), d - 2), g = Ve(i.borderRadius);
      Object.values(g).some((y) => y !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, za(t, {
        x: _,
        y: f,
        w: d,
        h: c,
        radius: g
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), za(t, {
        x: b,
        y: f + 1,
        w: d - 2,
        h: c - 2,
        radius: g
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(_, f, d, c), t.strokeRect(_, f, d, c), t.fillStyle = i.backgroundColor, t.fillRect(b, f + 1, d - 2, c - 2));
    }
    t.fillStyle = this.labelTextColors[s];
  }
  drawBody(t, a, s) {
    const { body: n } = this, { bodySpacing: o, bodyAlign: i, displayColors: r, boxHeight: c, boxWidth: d, boxPadding: u } = s, h = Bt(s.bodyFont);
    let p = h.lineHeight, v = 0;
    const f = ze(s.rtl, this.x, this.width), _ = function(A) {
      a.fillText(A, f.x(t.x + v), t.y + p / 2), t.y += p + o;
    }, b = f.textAlign(i);
    let g, y, w, k, M, C, D;
    for (a.textAlign = i, a.textBaseline = "middle", a.font = h.string, t.x = Ba(this, b, s), a.fillStyle = s.bodyColor, pt(this.beforeBody, _), v = r && b !== "right" ? i === "center" ? d / 2 + u : d + 2 + u : 0, k = 0, C = n.length; k < C; ++k) {
      for (g = n[k], y = this.labelTextColors[k], a.fillStyle = y, pt(g.before, _), w = g.lines, r && w.length && (this._drawColorBox(a, t, k, f, s), p = Math.max(h.lineHeight, c)), M = 0, D = w.length; M < D; ++M)
        _(w[M]), p = h.lineHeight;
      pt(g.after, _);
    }
    v = 0, p = h.lineHeight, pt(this.afterBody, _), t.y -= o;
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
    if (gt(t))
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
  const a = [], { bounds: n, step: o, min: i, max: r, precision: c, count: d, maxTicks: u, maxDigits: h, includeBounds: p } = e, v = o || 1, f = u - 1, { min: _, max: b } = t, g = !gt(i), y = !gt(r), w = !gt(d), k = (b - _) / (h + 1);
  let M = hn((b - _) / f / v) * v, C, D, A, B;
  if (M < 1e-14 && !g && !y)
    return [
      {
        value: _
      },
      {
        value: b
      }
    ];
  B = Math.ceil(b / M) - Math.floor(_ / M), B > f && (M = hn(B * M / f / v) * v), gt(c) || (C = Math.pow(10, c), M = Math.ceil(M * C) / C), n === "ticks" ? (D = Math.floor(_ / M) * M, A = Math.ceil(b / M) * M) : (D = _, A = b), g && y && o && Lr((r - i) / o, M / 1e3) ? (B = Math.round(Math.min((r - i) / M, u)), M = (r - i) / B, D = i, A = r) : w ? (D = g ? i : D, A = y ? r : A, B = d - 1, M = (A - D) / B) : (B = (A - D) / M, oa(B, Math.round(B), M / 1e3) ? B = Math.round(B) : B = Math.ceil(B));
  const L = Math.max(fn(M), fn(D));
  C = Math.pow(10, gt(c) ? L : c), D = Math.round(D * C) / C, A = Math.round(A * C) / C;
  let F = 0;
  for (g && (p && D !== i ? (a.push({
    value: i
  }), D < i && F++, oa(Math.round((D + F * M) * C) / C, i, mo(i, k, e)) && F++) : D < i && F++); F < B; ++F) {
    const O = Math.round((D + F * M) * C) / C;
    if (y && O > r)
      break;
    a.push({
      value: O
    });
  }
  return y && p && A !== r ? a.length && oa(a[a.length - 1].value, r, mo(r, k, e)) ? a[a.length - 1].value = r : a.push({
    value: r
  }) : (!y || A === r) && a.push({
    value: A
  }), a;
}
function mo(e, t, { horizontal: a, minRotation: s }) {
  const n = ne(s), o = (a ? Math.sin(n) : Math.cos(n)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / o, i);
}
class Pu extends je {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, a) {
    return gt(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: a, maxDefined: s } = this.getUserBounds();
    let { min: n, max: o } = this;
    const i = (c) => n = a ? n : c, r = (c) => o = s ? o : c;
    if (t) {
      const c = Qt(n), d = Qt(o);
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
    const t = this.isHorizontal(), a = t ? this.width : this.height, s = ne(this.options.ticks.minRotation), n = (t ? Math.sin(s) : Math.cos(s)) || 1e-3, o = this._resolveTickFontOptions(0);
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
  if (gt(t))
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
function Ru(e) {
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
function Eu(e, t, a, s) {
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
  return o === 0 || !a ? s : Eu(e, s, n, a);
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
    return this._unit = a.unit || (s.autoSkip ? xo(a.minUnit, this.min, this.max, this._getLabelCapacity(o)) : Iu(this, r.length, a.minUnit, this.min, this.max)), this._majorUnit = !s.major.enabled || this._unit === "year" ? void 0 : Ru(this._unit), this.initOffsets(n), t.reverse && r.reverse(), wo(this, r, this._majorUnit);
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
    let h = a, p, v;
    if (d && (h = +t.startOf(h, "isoWeek", c)), h = +t.startOf(h, d ? "day" : i), t.diff(s, a, i) > 1e5 * r)
      throw new Error(a + " and " + s + " are too far apart with stepSize of " + r + " " + i);
    const f = n.ticks.source === "data" && this.getDataTimestamps();
    for (p = h, v = 0; p < s; p = +t.add(p, r, i), v++)
      ko(u, p, f);
    return (p === s || n.bounds === "ticks" || v === 1) && ko(u, p, f), Object.keys(u).sort(yo).map((_) => +_);
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
    const a = this.options.ticks, s = this.ctx.measureText(t).width, n = ne(this.isHorizontal() ? a.maxRotation : a.minRotation), o = Math.cos(n), i = Math.sin(n), r = this._resolveTickFontOptions(0).size;
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
    return qo(t.sort(yo));
  }
}
function La(e, t, a) {
  let s = 0, n = e.length - 1, o, i, r, c;
  a ? (t >= e[s].pos && t <= e[n].pos && ({ lo: s, hi: n } = De(e, "pos", t)), { pos: o, time: r } = e[s], { pos: i, time: c } = e[n]) : (t >= e[s].time && t <= e[n].time && ({ lo: s, hi: n } = De(e, "time", t)), { time: o, pos: r } = e[s], { time: i, pos: c } = e[n]);
  const d = i - o;
  return d ? r + (c - r) * (t - o) / d : r;
}
class YM extends $o {
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
}, zu = qi[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function Re(e) {
  return Ro(e) ? Ms(e) : e;
}
function Nu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return Ro(t) ? new Proxy(e, {}) : e;
}
function Wu(e, t) {
  const a = e.options;
  a && t && Object.assign(a, t);
}
function Ii(e, t) {
  e.labels = t;
}
function Ri(e, t, a) {
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
  return Ii(a, e.labels), Ri(a, e.datasets, t), a;
}
const ju = J({
  props: Vu,
  setup(e, t) {
    let { expose: a, slots: s } = t;
    const n = at(null), o = Io(null);
    a({
      chart: o
    });
    const i = () => {
      if (!n.value) return;
      const { type: d, data: u, options: h, plugins: p, datasetIdKey: v } = e, f = Hu(u, v), _ = Nu(f, u);
      o.value = new Ye(n.value, {
        type: d,
        data: _,
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
    return re(i), He(r), Rt([
      () => e.options,
      () => e.data
    ], (d, u) => {
      let [h, p] = d, [v, f] = u;
      const _ = Ms(o.value);
      if (!_)
        return;
      let b = !1;
      if (h) {
        const g = Re(h), y = Re(v);
        g && g !== y && (Wu(_, g), b = !0);
      }
      if (p) {
        const g = Re(p.labels), y = Re(f.labels), w = Re(p.datasets), k = Re(f.datasets);
        g !== y && (Ii(_.config.data, g), b = !0), w && w !== k && (Ri(_.config.data, w, e.datasetIdKey), b = !0);
      }
      b && St(() => {
        c(_);
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
const Yu = /* @__PURE__ */ tn("bar", gc), Ku = /* @__PURE__ */ tn("line", bc), Uu = /* @__PURE__ */ tn("pie", mc), Mo = {
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
}, qu = [
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
  const s = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", n = S(() => e?.value ? e.value : t.value), o = S(() => n.value === "dark"), i = S(() => o.value ? So : Mo), r = () => {
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
  return re(() => {
    r();
  }), He(() => {
    c();
  }), e && Rt(e, () => {
  }), {
    isDark: o,
    currentTheme: n,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: Mo,
    darkColors: So,
    chartSeriesColors: qu
  };
}
const Xu = { class: "chart-container" }, Gu = /* @__PURE__ */ J({
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
    const { isDark: s, colors: n } = ct(lt(a, "theme")), o = a.data, i = (c) => typeof c == "string" ? c.charAt(0).toUpperCase() + c.slice(1).toLowerCase() : c, r = S(() => a.options ? a.options : {
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
    return t({ isDark: s }), (c, d) => (m(), x("div", Xu, [
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
}, ie = /* @__PURE__ */ nt(Gu, [["__scopeId", "data-v-105d8c6f"]]), Zu = { class: "chart-container" }, Qu = /* @__PURE__ */ J({
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
    const { isDark: s, colors: n } = ct(lt(a, "theme")), o = a.data, i = (c) => typeof c == "string" ? c.charAt(0).toUpperCase() + c.slice(1).toLowerCase() : c, r = S(() => a.options ? a.options : {
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
    return t({ isDark: s }), (c, d) => (m(), x("div", Zu, [
      Q(T(Ku), {
        data: T(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), ye = /* @__PURE__ */ nt(Qu, [["__scopeId", "data-v-bacd3848"]]), Ju = { class: "chart-container" }, th = /* @__PURE__ */ J({
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
    const { isDark: s, colors: n } = ct(lt(a, "theme")), o = a.data, i = (c) => typeof c == "string" ? c.charAt(0).toUpperCase() + c.slice(1).toLowerCase() : c, r = S(() => a.options ? a.options : {
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
                const p = c.getDatasetMeta(0), v = d.datasets[0], f = v.data[h], _ = Array.isArray(v.backgroundColor) ? v.backgroundColor[h] : v.backgroundColor;
                return {
                  text: `${i(u)}: ${f}`,
                  fillStyle: _,
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
    return t({ isDark: s }), (c, d) => (m(), x("div", Ju, [
      Q(T(Uu), {
        data: T(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Qa = /* @__PURE__ */ nt(th, [["__scopeId", "data-v-23a84317"]]), eh = { class: "chart-container" }, ah = ["viewBox"], sh = ["transform"], nh = ["x", "width", "fill", "stroke"], oh = ["fill"], ih = ["x1", "y1", "x2", "y2", "stroke"], rh = ["points", "fill"], lh = ["x1", "y1", "x2", "y2", "stroke"], ch = ["x", "y", "fill"], dh = ["x1", "y1", "x2", "y2", "stroke"], uh = ["points", "fill"], hh = ["transform"], fh = ["y1", "y2"], gh = ["y1", "y2"], ph = ["y1", "y2"], vh = ["y1", "y2"], bh = ["y", "height"], mh = ["y1", "y2"], yh = ["y1", "y2"], _h = ["y1", "y2"], xh = ["y1", "y2"], kh = ["y", "height"], wh = ["cy", "stroke", "onMouseenter"], $h = ["cy", "stroke", "onMouseenter"], Mh = ["cy", "stroke", "onMouseenter"], Sh = ["cy", "stroke", "onMouseenter"], Ch = ["y1", "y2", "onMouseenter"], Dh = ["y1", "y2", "onMouseenter"], Ah = ["x", "y", "fill"], Th = ["x", "y", "fill"], Bh = ["transform"], Lh = { transform: "translate(-200, 0)" }, Fh = ["stroke"], Ph = ["fill"], Ih = { transform: "translate(-130, 0)" }, Rh = ["stroke"], Eh = ["fill"], Oh = { transform: "translate(-60, 0)" }, Vh = ["stroke"], zh = ["fill"], Nh = { transform: "translate(10, 0)" }, Wh = ["stroke"], Hh = ["fill"], jh = { transform: "translate(80, 0)" }, Yh = ["fill"], Kh = { transform: "translate(150, 0)" }, Uh = ["fill"], qh = /* @__PURE__ */ J({
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
    const a = e, { isDark: s } = ct(lt(a, "theme")), n = S(() => ({
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
      const _ = f.getBoundingClientRect(), b = f.createSVGPoint();
      b.x = p.clientX - _.left, b.y = p.clientY - _.top, o.value = {
        visible: !0,
        x: b.x,
        y: b.y - 20,
        text: v
      };
    }, c = (p) => {
      if (o.value.visible) {
        const v = p.currentTarget, f = v.getBoundingClientRect(), _ = v.createSVGPoint();
        _.x = p.clientX - f.left, _.y = p.clientY - f.top, o.value.x = _.x, o.value.y = _.y - 20;
      }
    }, d = () => {
      o.value.visible = !1;
    }, u = () => {
      o.value.visible = !1;
    }, h = S(() => {
      const p = [], f = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let _ = 1; _ <= 10; _++) {
        const b = _, g = (b - 1) / 9, y = a.chartMargin + f - g * f;
        p.push({ value: b, y });
      }
      return p;
    });
    return t({ isDark: s }), (p, v) => (m(), x("div", eh, [
      (m(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: bt(`min-height: ${e.chartHeight}px;`),
        onMousemove: c,
        onMouseleave: d
      }, [
        o.value.visible ? (m(), x("g", {
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
        (m(!0), x(q, null, tt(h.value, (f, _) => (m(), x(q, { key: _ }, [
          l("line", {
            x1: e.chartMargin - 6,
            y1: f.y,
            x2: e.chartMargin,
            y2: f.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, lh),
          l("text", {
            x: e.chartMargin - 12,
            y: f.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, $(f.value), 9, ch)
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
        (m(!0), x(q, null, tt(e.boxplotData, (f, _) => (m(), x(q, { key: _ }, [
          l("g", {
            transform: `translate(${f.centerX}, 0)`
          }, [
            f.isTotal ? (m(), x(q, { key: 0 }, [
              l("line", {
                x1: 0,
                y1: f.minY,
                x2: 0,
                y2: f.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, fh),
              l("line", {
                x1: 0,
                y1: f.q3Y,
                x2: 0,
                y2: f.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, gh),
              l("line", {
                x1: -18,
                y1: f.minY,
                x2: 18,
                y2: f.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, ph),
              l("line", {
                x1: -18,
                y1: f.maxY,
                x2: 18,
                y2: f.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, vh),
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
              }, null, 8, bh)
            ], 64)) : (m(), x(q, { key: 1 }, [
              l("line", {
                x1: 0,
                y1: f.minY,
                x2: 0,
                y2: f.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, mh),
              l("line", {
                x1: 0,
                y1: f.q3Y,
                x2: 0,
                y2: f.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, yh),
              l("line", {
                x1: -18,
                y1: f.minY,
                x2: 18,
                y2: f.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, _h),
              l("line", {
                x1: -18,
                y1: f.maxY,
                x2: 18,
                y2: f.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, xh),
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
              }, null, 8, kh)
            ], 64)),
            l("circle", {
              cx: 0,
              cy: f.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, `Min: ${f.min.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, wh),
            l("circle", {
              cx: 0,
              cy: f.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, `Q1: ${f.q1.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, $h),
            l("circle", {
              cx: 0,
              cy: f.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, `Q3: ${f.q3.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Mh),
            l("circle", {
              cx: 0,
              cy: f.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, `Max: ${f.max.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Sh),
            l("line", {
              x1: -24,
              y1: f.medianY,
              x2: 24,
              y2: f.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (b) => r(b, `Median: ${f.median.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Ch),
            f.averageY ? (m(), x("line", {
              key: 2,
              x1: -24,
              y1: f.averageY,
              x2: 24,
              y2: f.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (b) => r(b, `Avg: ${f.average.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Dh)) : E("", !0)
          ], 8, hh),
          l("text", {
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, $(i(f.label)), 9, Ah),
          f.responseCount ? (m(), x("text", {
            key: 0,
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: n.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + $(f.responseCount), 9, Th)) : E("", !0)
        ], 64))), 128)),
        e.showLegend ? (m(), x("g", {
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
            }, null, 8, Rh),
            l("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Eh)
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
            }, " Median ", 8, Uh)
          ])
        ], 8, Bh)) : E("", !0)
      ], 44, ah))
    ]));
  }
}), Xh = /* @__PURE__ */ nt(qh, [["__scopeId", "data-v-520c623f"]]), Gh = { class: "chart-container" }, Zh = ["viewBox"], Qh = ["transform"], Jh = ["x", "y", "width", "height", "fill", "stroke"], tf = ["y", "fill"], ef = ["y", "fill"], af = ["x1", "y1", "x2", "y2", "stroke"], sf = ["points", "fill"], nf = ["x1", "y1", "x2", "y2", "stroke"], of = ["x1", "y1", "x2", "y2", "stroke"], rf = ["x", "y", "fill"], lf = ["x", "y", "fill", "transform"], cf = ["x1", "y1", "x2", "y2", "stroke"], df = ["points", "fill"], uf = ["transform"], hf = ["y1", "y2", "stroke", "onMouseenter"], ff = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], gf = ["x1", "y1", "x2", "y2", "onMouseenter"], pf = ["x1", "y1", "x2", "y2", "onMouseenter"], vf = ["cy", "stroke", "onMouseenter"], bf = ["cy", "stroke", "onMouseenter"], mf = ["x", "y", "fill"], yf = ["x", "y", "fill"], _f = ["transform"], xf = { transform: "translate(-180, 0)" }, kf = ["stroke"], wf = ["fill"], $f = { transform: "translate(-120, 0)" }, Mf = ["fill"], Sf = { transform: "translate(-60, 0)" }, Cf = ["fill"], Df = { transform: "translate(0, 0)" }, Af = ["stroke"], Tf = ["fill"], Bf = { transform: "translate(60, 0)" }, Lf = ["fill"], Ff = { transform: "translate(130, 0)" }, Pf = ["fill"], If = /* @__PURE__ */ J({
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
    const a = e, { isDark: s } = ct(lt(a, "theme")), n = S(() => ({
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
      const _ = p.currentTarget.closest("svg");
      if (!_) return;
      const b = _.getBoundingClientRect(), g = _.createSVGPoint();
      g.x = p.clientX - b.left, g.y = p.clientY - b.top;
      let y = i(v.label), w = "";
      switch (f) {
        case "body":
          w = `Q1: ${v.q1.toFixed(1)} | Q3: ${v.q3.toFixed(1)}`;
          break;
        case "wick":
          w = `Min: ${v.low.toFixed(1)} | Max: ${v.high.toFixed(1)}`;
          break;
        case "median":
          w = `Median: ${v.median.toFixed(1)}`;
          break;
        case "average":
          w = `Average: ${v.average?.toFixed(1)}`;
          break;
        case "min":
          w = `Min: ${v.low.toFixed(1)}`;
          break;
        case "max":
          w = `Max: ${v.high.toFixed(1)}`;
          break;
      }
      const k = Math.max(180, w.length * 7 + 40), M = 48;
      o.value = {
        visible: !0,
        x: g.x,
        y: g.y - 20,
        title: y,
        text: w,
        width: k,
        height: M
      };
    }, c = (p) => {
      if (o.value.visible) {
        const v = p.currentTarget, f = v.getBoundingClientRect(), _ = v.createSVGPoint();
        _.x = p.clientX - f.left, _.y = p.clientY - f.top, o.value.x = _.x, o.value.y = _.y - 20;
      }
    }, d = () => {
      o.value.visible = !1;
    }, u = () => {
      o.value.visible = !1;
    }, h = S(() => {
      const p = [], f = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let _ = 1; _ <= 10; _++) {
        const b = _, g = (b - 1) / 9, y = a.chartMargin + f - g * f;
        p.push({ value: b, y });
      }
      return p;
    });
    return t({ isDark: s }), (p, v) => (m(), x("div", Gh, [
      (m(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: bt(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: c,
        onMouseleave: d
      }, [
        o.value.visible ? (m(), x("g", {
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
        (m(!0), x(q, null, tt(h.value, (f, _) => (m(), x("line", {
          key: `grid-${_}`,
          x1: e.chartMargin,
          y1: f.y,
          x2: e.chartWidth - e.chartMargin,
          y2: f.y,
          stroke: n.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, nf))), 128)),
        (m(!0), x(q, null, tt(h.value, (f, _) => (m(), x(q, { key: _ }, [
          l("line", {
            x1: e.chartMargin - 6,
            y1: f.y,
            x2: e.chartMargin,
            y2: f.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, of),
          l("text", {
            x: e.chartMargin - 12,
            y: f.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, $(f.value), 9, rf)
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
        (m(!0), x(q, null, tt(e.candlestickData, (f, _) => (m(), x(q, { key: _ }, [
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
              onMouseenter: (b) => r(b, f, "wick"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, hf),
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
              onMouseenter: (b) => r(b, f, "body"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, ff),
            f.medianY ? (m(), x("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: f.medianY,
              x2: e.candleWidth / 2,
              y2: f.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (b) => r(b, f, "median"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, gf)) : E("", !0),
            f.averageY ? (m(), x("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: f.averageY,
              x2: e.candleWidth / 2,
              y2: f.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (b) => r(b, f, "average"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, pf)) : E("", !0),
            l("circle", {
              cx: 0,
              cy: f.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, f, "min"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, vf),
            l("circle", {
              cx: 0,
              cy: f.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, f, "max"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, bf)
          ], 8, uf),
          l("text", {
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, $(i(f.label)), 9, mf),
          f.responseCount ? (m(), x("text", {
            key: 0,
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: n.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + $(f.responseCount), 9, yf)) : E("", !0)
        ], 64))), 128)),
        e.showLegend ? (m(), x("g", {
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
          l("g", Sf, [
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
            }, " Q3 ", 8, Cf)
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
}), Ei = /* @__PURE__ */ nt(If, [["__scopeId", "data-v-61d0259c"]]), Rf = { class: "chart-container" }, Ef = ["viewBox"], Of = ["transform"], Vf = ["x", "y", "width", "height", "fill", "stroke"], zf = ["y", "fill"], Nf = ["y", "fill"], Wf = ["x1", "y1", "x2", "y2", "stroke"], Hf = ["x1", "y1", "x2", "y2", "stroke"], jf = ["points", "fill"], Yf = ["x1", "y1", "x2", "y2", "stroke"], Kf = ["x", "y", "fill"], Uf = ["x", "y", "fill", "transform"], qf = ["x1", "y1", "x2", "y2", "stroke"], Xf = ["points", "fill"], Gf = ["x1", "y1", "x2", "y2", "stroke"], Zf = ["x", "y", "fill"], Qf = ["x", "y", "fill"], Jf = ["d"], tg = ["x", "y", "width", "height", "onMouseenter"], eg = ["x1", "y1", "x2", "y2"], ag = ["x", "y"], sg = ["x1", "y1", "x2", "y2"], ng = ["x", "y"], og = ["x1", "y1", "x2", "y2"], ig = ["x", "y"], rg = ["x1", "y1", "x2", "y2"], lg = ["x", "y"], cg = ["x1", "y1", "x2", "y2"], dg = ["x", "y"], ug = ["x1", "y1", "x2", "y2"], hg = ["x", "y"], fg = ["transform"], gg = { transform: "translate(-220, 0)" }, pg = ["fill"], vg = { transform: "translate(-140, 0)" }, bg = ["fill"], mg = { transform: "translate(-80, 0)" }, yg = ["fill"], _g = { transform: "translate(-20, 0)" }, xg = ["fill"], kg = { transform: "translate(60, 0)" }, wg = ["fill"], $g = { transform: "translate(130, 0)" }, Mg = ["fill"], Sg = { transform: "translate(180, 0)" }, Cg = ["fill"], Dg = /* @__PURE__ */ J({
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
    const a = e, { isDark: s } = ct(lt(a, "theme")), n = S(() => ({
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
    }), i = S(() => a.chartWidth - a.chartMargin * 2), r = S(() => a.chartHeight - a.chartMargin - a.chartBottomMargin), c = S(() => i.value / 10 * 0.6), d = S(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const Y = Math.max(...a.histogram.map((N) => N.count || 0), 1), j = Math.max(1, Math.ceil(Y * 0.2));
      return Y + j;
    }), u = S(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const Y = a.averageScore || 0;
      let j = 0, N = 0;
      if (a.histogram.forEach((G) => {
        const U = G.count || 0;
        j += U;
        const ot = G.score - Y;
        N += U * (ot * ot);
      }), j === 0) return 1;
      const et = N / j;
      return Math.sqrt(et) || 1;
    }), h = (Y, j, N) => {
      if (N === 0) return 0;
      const et = 1 / (N * Math.sqrt(2 * Math.PI)), G = -0.5 * Math.pow((Y - j) / N, 2);
      return et * Math.exp(G);
    }, p = S(() => {
      if (!a.histogram || a.histogram.length === 0 || a.averageScore === 0 && u.value === 0) return null;
      const Y = a.averageScore, j = u.value, N = 100, G = Math.max(...a.histogram.map((ft) => ft.count || 0), 1) / d.value * r.value;
      if (G <= 0) return null;
      let U = 0;
      for (let ft = 0; ft <= N; ft++) {
        const Pt = 1 + 9 * (ft / N), zt = h(Pt, Y, j);
        zt > U && (U = zt);
      }
      if (U <= 0) return null;
      const ot = G / U, wt = [];
      for (let ft = 0; ft <= N; ft++) {
        const Pt = 1 + 9 * (ft / N), zt = h(Pt, Y, j) * ot, Kt = f(Pt);
        if (Kt !== null) {
          const rt = a.chartHeight - a.chartBottomMargin - zt;
          wt.push(`${ft === 0 ? "M" : "L"} ${Kt} ${rt}`);
        }
      }
      return wt.join(" ");
    }), v = S(() => {
      if (!a.histogram || a.histogram.length === 0) return [];
      const Y = i.value / 10;
      return a.histogram.map((j, N) => {
        const et = a.chartMargin + (N + 0.5) * Y, G = j.count > 0 ? j.count / d.value * r.value : 0, U = a.chartHeight - a.chartBottomMargin - G;
        return {
          score: j.score,
          count: j.count,
          x: et,
          y: U,
          height: G
        };
      });
    }), f = (Y) => {
      if (Y < 1 || Y > 10) return null;
      const j = i.value / 10;
      return a.chartMargin + (Y - 0.5) * j;
    }, _ = S(() => f(a.minScore)), b = S(() => f(a.maxScore)), g = S(() => f(a.q1Score)), y = S(() => f(a.medianScore)), w = S(() => f(a.q3Score)), k = S(() => f(a.averageScore)), M = S(() => a.minScore), C = S(() => a.maxScore), D = S(() => a.q1Score), A = S(() => a.medianScore), B = S(() => a.q3Score), L = S(() => a.averageScore), F = S(() => {
      const Y = [], j = a.chartMargin - 8, N = 18;
      g.value !== null && Y.push({
        x: g.value,
        y: j,
        value: a.q1Score,
        label: `Q1: ${D.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), y.value !== null && Y.push({
        x: y.value,
        y: j - N,
        value: a.medianScore,
        label: `Median: ${A.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), k.value !== null && Y.push({
        x: k.value,
        y: j - N,
        value: a.averageScore,
        label: `Avg: ${L.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), w.value !== null && Y.push({
        x: w.value,
        y: j,
        value: a.q3Score,
        label: `Q3: ${B.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), Y.sort((U, ot) => (U.x || 0) - (ot.x || 0));
      const et = [[], [], []];
      Y.forEach((U) => {
        if (U.x === null) return;
        let ot = -1;
        for (let wt = 0; wt < et.length; wt++) {
          let ft = !1;
          for (const Pt of et[wt]) {
            if (Pt.x === null) continue;
            const zt = Math.abs(U.x - Pt.x), Kt = (U.width + Pt.width) / 2 + 10;
            if (zt < Kt) {
              ft = !0;
              break;
            }
          }
          if (!ft) {
            ot = wt;
            break;
          }
        }
        ot === -1 && (ot = et.length - 1), U.y = j - ot * N, et[ot].push(U);
      });
      const G = 15;
      return Y.forEach((U) => {
        U.y < G && (U.y = G);
      }), Y;
    }), O = (Y) => F.value.find((N) => N.id === Y)?.y || a.chartMargin - 10, W = S(() => {
      const Y = [];
      for (let N = 0; N <= 5; N++) {
        const et = Math.round(d.value / 5 * N), G = a.chartHeight - a.chartBottomMargin - N / 5 * r.value;
        Y.push({ value: et, y: G });
      }
      return Y;
    }), P = (Y, j) => {
      const N = Y.currentTarget.closest("svg");
      if (!N) return;
      const et = N.getBoundingClientRect(), G = N.createSVGPoint();
      G.x = Y.clientX - et.left, G.y = Y.clientY - et.top;
      const U = `Score: ${j.score}`, ot = `Count: ${j.count}`, wt = 120, ft = 48;
      o.value = {
        visible: !0,
        x: G.x,
        y: G.y - 20,
        title: U,
        text: ot,
        width: wt,
        height: ft
      };
    }, I = (Y) => {
      if (o.value.visible) {
        const j = Y.currentTarget, N = j.getBoundingClientRect(), et = j.createSVGPoint();
        et.x = Y.clientX - N.left, et.y = Y.clientY - N.top, o.value.x = et.x, o.value.y = et.y - 20;
      }
    }, V = () => {
      o.value.visible = !1;
    }, H = () => {
      o.value.visible = !1;
    };
    return t({ isDark: s }), (Y, j) => (m(), x("div", Rf, [
      (m(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: bt(`min-height: ${e.chartHeight}px;`),
        onMousemove: I,
        onMouseleave: V
      }, [
        o.value.visible ? (m(), x("g", {
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
        (m(!0), x(q, null, tt(W.value, (N, et) => (m(), x("line", {
          key: `grid-${et}`,
          x1: e.chartMargin,
          y1: N.y,
          x2: e.chartWidth - e.chartMargin,
          y2: N.y,
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
        (m(!0), x(q, null, tt(W.value, (N, et) => (m(), x(q, {
          key: `y-tick-${et}`
        }, [
          l("line", {
            x1: e.chartMargin - 6,
            y1: N.y,
            x2: e.chartMargin,
            y2: N.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Yf),
          l("text", {
            x: e.chartMargin - 12,
            y: N.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, $(N.value), 9, Kf)
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
        }, null, 8, qf),
        l("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, Xf),
        (m(!0), x(q, null, tt(v.value, (N, et) => (m(), x(q, {
          key: `tick-${et}`
        }, [
          l("line", {
            x1: N.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: N.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Gf),
          l("text", {
            x: N.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, $(N.score), 9, Zf)
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
        p.value ? (m(), x("path", {
          key: 1,
          d: p.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, Jf)) : E("", !0),
        (m(!0), x(q, null, tt(v.value, (N, et) => (m(), x("rect", {
          key: `bar-${et}`,
          x: N.x - c.value / 2,
          y: N.y,
          width: c.value,
          height: N.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (G) => P(G, N),
          onMouseleave: H,
          style: { cursor: "pointer" }
        }, null, 40, tg))), 128)),
        _.value ? (m(), x("line", {
          key: 2,
          x1: _.value,
          y1: e.chartMargin,
          x2: _.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, eg)) : E("", !0),
        _.value ? (m(), x("text", {
          key: 3,
          x: _.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + $(M.value.toFixed(1)), 9, ag)) : E("", !0),
        g.value ? (m(), x("line", {
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
        g.value ? (m(), x("text", {
          key: 5,
          x: g.value,
          y: O("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + $(D.value.toFixed(1)), 9, ng)) : E("", !0),
        y.value ? (m(), x("line", {
          key: 6,
          x1: y.value,
          y1: e.chartMargin,
          x2: y.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, og)) : E("", !0),
        y.value ? (m(), x("text", {
          key: 7,
          x: y.value,
          y: O("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + $(A.value.toFixed(1)), 9, ig)) : E("", !0),
        k.value ? (m(), x("line", {
          key: 8,
          x1: k.value,
          y1: e.chartMargin,
          x2: k.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, rg)) : E("", !0),
        k.value ? (m(), x("text", {
          key: 9,
          x: k.value,
          y: O("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + $(L.value.toFixed(1)), 9, lg)) : E("", !0),
        w.value ? (m(), x("line", {
          key: 10,
          x1: w.value,
          y1: e.chartMargin,
          x2: w.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, cg)) : E("", !0),
        w.value ? (m(), x("text", {
          key: 11,
          x: w.value,
          y: O("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + $(B.value.toFixed(1)), 9, dg)) : E("", !0),
        b.value ? (m(), x("line", {
          key: 12,
          x1: b.value,
          y1: e.chartMargin,
          x2: b.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, ug)) : E("", !0),
        b.value ? (m(), x("text", {
          key: 13,
          x: b.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + $(C.value.toFixed(1)), 9, hg)) : E("", !0),
        e.showLegend ? (m(), x("g", {
          key: 14,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          l("g", gg, [
            j[0] || (j[0] = l("line", {
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
            j[1] || (j[1] = l("line", {
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
            j[2] || (j[2] = l("line", {
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
            j[3] || (j[3] = l("line", {
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
            j[4] || (j[4] = l("line", {
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
            j[5] || (j[5] = l("line", {
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
          l("g", Sg, [
            j[6] || (j[6] = l("line", {
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
            }, " Max ", 8, Cg)
          ])
        ], 8, fg)) : E("", !0)
      ], 44, Ef))
    ]));
  }
}), Oi = /* @__PURE__ */ nt(Dg, [["__scopeId", "data-v-64e657d9"]]), Ag = { class: "chart-container" }, Tg = {
  key: 1,
  class: "chart-wrapper"
}, Bg = /* @__PURE__ */ J({
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
    ], h = () => {
      const w = a.data.links.filter(
        (D) => D.source && D.target && typeof D.value == "number"
      ), k = Math.max(...w.map((D) => D.value), 1), M = Math.max(1, k * 0.01), C = w.map((D) => ({
        ...D,
        originalValue: D.value,
        value: D.value < k * 0.01 ? M : D.value
      }));
      return {
        nodes: a.data.nodes.filter((D) => D.name),
        links: C
      };
    }, p = (w) => w.map((k, M) => ({
      ...k,
      itemStyle: {
        color: a.nodeColors[k.name] || u[M % u.length],
        borderRadius: 8
      }
    })), v = (w) => (k) => {
      const M = k.dataType === "node", C = n.value.tooltipText, D = s.value ? "#d1d5db" : "#e2e8f0";
      if (M) {
        const O = w.filter((I) => I.target === k.name), W = w.filter((I) => I.source === k.name), P = O.length > 0 ? O.reduce((I, V) => I + (V.originalValue || V.value), 0) : W.reduce((I, V) => I + (V.originalValue || V.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${C};">${k.name}</div><div style="color: ${D}; font-size: 12px;">Count: ${P.toLocaleString()}</div>`;
      }
      const A = k.data?.source || k.source || "Unknown", B = k.data?.target || k.target || "Unknown", L = k.data?.originalValue || k.data?.value || k.value || 0, F = k.data?.label || `${L.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${C};">${A} → ${B}</div><div style="color: ${D}; font-size: 12px;">Flow: ${F}</div>`;
    }, f = () => {
      if (!(!c || !a.data.nodes?.length || !a.data.links?.length))
        try {
          const { nodes: w, links: k } = h(), M = p(w), C = {
            tooltip: {
              trigger: "item",
              triggerOn: "mousemove",
              formatter: v(k),
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
                links: k,
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
          c.setOption(C);
        } catch (w) {
          console.error("Error setting Sankey chart options:", w), r.value = !0;
        }
    }, _ = async () => {
      if (o.value)
        try {
          c = sn.init(o.value), f(), window.addEventListener("resize", g);
        } catch (w) {
          console.error("Error initializing Sankey chart:", w), r.value = !0;
        } finally {
          i.value = !1;
        }
    }, b = async (w = 40) => {
      await St();
      for (let k = 0; k < w; k++) {
        if (o.value?.clientWidth && o.value.clientWidth > 0 && o.value?.clientHeight && o.value.clientHeight > 0)
          return await _();
        await new Promise((M) => setTimeout(M, 50));
      }
      await _(), setTimeout(g, 50);
    }, g = () => c?.resize(), y = () => {
      window.removeEventListener("resize", g), c && (c.dispose(), c = null);
    };
    return re(() => o.value && b()), Eo(y), Rt(() => a.data, f, { deep: !0 }), Rt(s, f), t({ isDark: s }), (w, k) => (m(), x("div", Ag, [
      r.value ? (m(), x("div", {
        key: 0,
        class: "error-state",
        style: bt({ height: e.height })
      }, [...k[0] || (k[0] = [
        st('<div class="error-content" data-v-d6d61034><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d6d61034><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-d6d61034></path></svg><p class="error-title" data-v-d6d61034>Chart could not be loaded</p><p class="error-description" data-v-d6d61034>Please check the data format.</p></div>', 1)
      ])], 4)) : (m(), x("div", Tg, [
        Ut(l("div", {
          ref_key: "chartEl",
          ref: o,
          class: "chart-content",
          style: bt({ height: e.height })
        }, null, 4), [
          [la, !i.value]
        ]),
        Ut(l("div", {
          class: "loading-state",
          style: bt({ height: e.height })
        }, [...k[1] || (k[1] = [
          st('<div class="loading-container" data-v-d6d61034><div class="sankey-loader" data-v-d6d61034><div class="flow flow-1" data-v-d6d61034></div><div class="flow flow-2" data-v-d6d61034></div><div class="flow flow-3" data-v-d6d61034></div><div class="flow flow-4" data-v-d6d61034></div></div><p class="loading-text" data-v-d6d61034>Loading Sankey diagram...</p></div>', 1)
        ])], 4), [
          [la, i.value]
        ])
      ]))
    ]));
  }
}), _e = /* @__PURE__ */ nt(Bg, [["__scopeId", "data-v-d6d61034"]]);
function Lg(e, t) {
  return m(), x("svg", {
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
  return m(), x("svg", {
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
  return m(), x("svg", {
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
  return m(), x("svg", {
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
  return m(), x("svg", {
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
  return m(), x("svg", {
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
  return m(), x("svg", {
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
function Rg(e, t) {
  return m(), x("svg", {
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
function Eg(e, t) {
  return m(), x("svg", {
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
  return m(), x("svg", {
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
function Co(e, t) {
  return m(), x("svg", {
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
  return m(), x("svg", {
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
  return m(), x("svg", {
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
  return m(), x("svg", {
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
  return m(), x("svg", {
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
  return m(), x("svg", {
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
const Hg = { class: "chart-footer" }, jg = { class: "export-actions" }, Yg = { class: "export-buttons" }, Kg = ["disabled"], Ug = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, qg = {
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
}, Qg = /* @__PURE__ */ J({
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
    return (i, r) => (m(), x("footer", Hg, [
      r[9] || (r[9] = l("div", { class: "footer-divider" }, null, -1)),
      l("div", jg, [
        r[8] || (r[8] = l("span", { class: "export-label" }, "Export", -1)),
        l("div", Yg, [
          n("pdf") ? (m(), x("button", {
            key: 0,
            type: "button",
            class: K(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download PDF",
            onClick: r[0] || (r[0] = (c) => o("pdf"))
          }, [
            e.loading ? (m(), x("svg", Ug, [...r[2] || (r[2] = [
              l("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              l("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (m(), x("svg", qg, [...r[3] || (r[3] = [
              st('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-672661d4></path><polyline points="14 2 14 8 20 8" data-v-672661d4></polyline><line x1="16" y1="13" x2="8" y2="13" data-v-672661d4></line><line x1="16" y1="17" x2="8" y2="17" data-v-672661d4></line><polyline points="10 9 9 9 8 9" data-v-672661d4></polyline>', 5)
            ])])),
            r[4] || (r[4] = l("span", null, "PDF", -1))
          ], 10, Kg)) : E("", !0),
          n("csv") ? (m(), x("button", {
            key: 1,
            type: "button",
            class: K(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download CSV",
            onClick: r[1] || (r[1] = (c) => o("csv"))
          }, [
            e.loading ? (m(), x("svg", Gg, [...r[5] || (r[5] = [
              l("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              l("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (m(), x("svg", Zg, [...r[6] || (r[6] = [
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
}), xt = /* @__PURE__ */ nt(Qg, [["__scopeId", "data-v-672661d4"]]), Jg = { class: "agents-per-day-card" }, tp = {
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
}, ip = /* @__PURE__ */ J({
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
      const v = new Date(p), f = String(v.getDate()).padStart(2, "0"), _ = String(v.getMonth() + 1).padStart(2, "0");
      return `${f}-${_}`;
    }, u = S(() => {
      const p = n.data?.agents_by_day || {}, v = Object.keys(p).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const f = v.map((w) => d(w)), _ = /* @__PURE__ */ new Set();
      for (const w of Object.values(p))
        for (const k of Object.keys(w))
          _.add(k);
      const b = Array.from(_), g = (w) => w, y = b.map((w) => ({
        label: w,
        data: v.map((k) => p[k]?.[w] || 0),
        backgroundColor: `${s[w] || "#94a3b8"}80`,
        borderColor: g(s[w] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: f,
        datasets: y
      };
    }), h = S(() => n.options ? n.options : {
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
    return t({ isDark: r }), (p, v) => (m(), x("article", Jg, [
      v[3] || (v[3] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Agents Total Messages per Day"),
          l("p", { class: "card-subtitle" }, "Daily agent interactions (stacked)")
        ])
      ], -1)),
      e.loading ? (m(), x("div", op, [...v[2] || (v[2] = [
        st('<div class="loading-container" data-v-4d18c22c><div class="chart-lines-loader" data-v-4d18c22c><div class="line line-1" data-v-4d18c22c></div><div class="line line-2" data-v-4d18c22c></div><div class="line line-3" data-v-4d18c22c></div><div class="line line-4" data-v-4d18c22c></div><div class="line line-5" data-v-4d18c22c></div></div><p class="loading-text" data-v-4d18c22c>Loading chart data...</p></div>', 1)
      ])])) : (m(), x("div", tp, [
        u.value.labels && u.value.labels.length ? (m(), x("section", ep, [
          Q(ie, {
            data: u.value,
            options: h.value,
            stacked: !0
          }, null, 8, ["data", "options"]),
          e.enableExport ? (m(), dt(T(xt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (m(), x("section", ap, [
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
}), rp = /* @__PURE__ */ nt(ip, [["__scopeId", "data-v-4d18c22c"]]), X = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), vt = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), fe = (e) => {
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
}, kp = { class: "table-wrapper" }, wp = { class: "data-table" }, $p = { class: "table-body" }, Mp = { class: "table-cell font-medium" }, Sp = { class: "table-cell text-center" }, Cp = { class: "table-cell text-center" }, Dp = { class: "percentage-text" }, Ap = { class: "table-cell text-center" }, Tp = { class: "table-cell" }, Bp = { class: "badges-container" }, Lp = { class: "badge badge-success" }, Fp = { class: "badge badge-error" }, Pp = { class: "table-cell" }, Ip = {
  key: 0,
  class: "badges-container"
}, Rp = {
  key: 1,
  class: "percentage-text"
}, Ep = { class: "table-cell" }, Op = { class: "badges-container" }, Vp = { class: "badge badge-error" }, zp = { class: "badge badge-warning" }, Np = { class: "badge badge-yellow" }, Wp = { class: "badge badge-error" }, Hp = {
  key: 1,
  class: "empty-state"
}, gs = 3, jp = /* @__PURE__ */ J({
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
    const a = e, s = t, n = (b) => {
      s("export", b);
    }, o = at(!1), i = S(() => a.data?.booking_manager_by_day ? [...a.data.booking_manager_by_day].sort(
      (b, g) => new Date(b.date).getTime() - new Date(g.date).getTime()
    ) : []), r = S(() => o.value ? i.value : i.value.slice(0, gs)), c = S(() => i.value.length > gs), d = S(() => a.data?.total_payment_success_value || []), u = (b) => b.payment_success_value || [], h = (b) => typeof b.payment_success_count == "number" ? b.payment_success_count : (b.payment_success_value || []).reduce((g, y) => g + (y.count || 0), 0), p = (b) => vt(b), v = S(() => {
      const b = a.data, g = b.total_booking_initiated || 0, y = b.total_booking_started || 0, w = b.total_payment_initiated || 0, k = b.total_not_found || 0, M = b.total_cancelled || 0, C = b.total_no_pending_balance || 0, D = b.total_errors || 0, A = typeof b.total_payment_success == "number" ? b.total_payment_success : (b.total_payment_success_value || []).reduce((I, V) => I + (V.count || 0), 0), B = b.total_payment_failed || 0, L = Math.max(0, g - y), F = Math.max(0, y - w - k - M - C - D), O = (I, V) => {
        const H = V > 0 ? Math.round(I / V * 100) : 0;
        return `${I.toLocaleString()} (${H}%)`;
      }, W = [
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
      return y > 0 && P.push({
        source: "Initiated",
        target: "Started",
        value: y,
        label: O(y, g)
      }), L > 0 && P.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: L,
        label: O(L, g)
      }), w > 0 && P.push({
        source: "Started",
        target: "Payment Initiated",
        value: w,
        label: O(w, y)
      }), k > 0 && P.push({
        source: "Started",
        target: "Not Found",
        value: k,
        label: O(k, y)
      }), M > 0 && P.push({
        source: "Started",
        target: "Cancelled",
        value: M,
        label: O(M, y)
      }), C > 0 && P.push({
        source: "Started",
        target: "No Pending Balance",
        value: C,
        label: O(C, y)
      }), D > 0 && P.push({
        source: "Started",
        target: "Errors",
        value: D,
        label: O(D, y)
      }), F > 0 && P.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: F,
        label: O(F, y)
      }), A > 0 && P.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: A,
        label: O(A, w)
      }), B > 0 && P.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: B,
        label: O(B, w)
      }), { nodes: W, links: P };
    }), f = {
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
    }, _ = (b, g) => !g || g === 0 ? "0%" : `${Math.round(b / g * 100)}%`;
    return (b, g) => (m(), x("article", lp, [
      l("header", cp, [
        l("div", dp, [
          g[2] || (g[2] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "Booking Manager Metrics"),
            l("p", { class: "card-subtitle" }, "Booking manager workflow tracking and analysis")
          ], -1)),
          a.loading ? E("", !0) : (m(), x("div", up, [
            g[1] || (g[1] = l("p", { class: "badge-label" }, "Payment Success Value", -1)),
            d.value.length > 0 ? (m(), x("div", hp, [
              (m(!0), x(q, null, tt(d.value, (y) => (m(), x("p", {
                key: y.currency,
                class: "currency-breakdown-item"
              }, $(y.currency) + " " + $(p(y.total_value)), 1))), 128))
            ])) : (m(), x("p", fp, $(p(0)), 1))
          ]))
        ])
      ]),
      a.loading ? (m(), x("div", gp, [...g[3] || (g[3] = [
        st('<div class="loading-container" data-v-15d5c773><div class="chart-flow-loader" data-v-15d5c773><div class="flow-line flow-1" data-v-15d5c773></div><div class="flow-line flow-2" data-v-15d5c773></div><div class="flow-line flow-3" data-v-15d5c773></div><div class="flow-line flow-4" data-v-15d5c773></div><div class="flow-line flow-5" data-v-15d5c773></div></div><p class="loading-text" data-v-15d5c773>Loading booking data...</p></div>', 1)
      ])])) : a.error ? (m(), x("div", pp, [
        l("div", vp, [
          g[4] || (g[4] = l("div", { class: "error-icon-wrapper" }, [
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
          g[5] || (g[5] = l("p", { class: "error-title" }, "Error loading data", -1)),
          l("p", bp, $(a.error), 1)
        ])
      ])) : (m(), x("div", mp, [
        l("section", yp, [
          l("div", _p, [
            Q(_e, {
              data: v.value,
              "node-colors": f,
              height: "500px",
              "node-gap": 15
            }, null, 8, ["data"])
          ])
        ]),
        i.value.length > 0 ? (m(), x("section", xp, [
          g[8] || (g[8] = l("div", { class: "section-header" }, [
            l("h4", { class: "section-title" }, "Daily Overview")
          ], -1)),
          l("div", kp, [
            l("table", wp, [
              g[6] || (g[6] = l("thead", null, [
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
                (m(!0), x(q, null, tt(r.value, (y) => (m(), x("tr", {
                  key: y.date,
                  class: "table-row"
                }, [
                  l("td", Mp, $(T(At)(y.date).format("DD/MM/YYYY")), 1),
                  l("td", Sp, $(T(X)(y.booking_initiated_count)), 1),
                  l("td", Cp, [
                    kt($(T(X)(y.booking_started_count)) + " ", 1),
                    l("span", Dp, " (" + $(_(y.booking_started_count, y.booking_initiated_count)) + ") ", 1)
                  ]),
                  l("td", Ap, $(T(X)(y.payment_initiated_count)), 1),
                  l("td", Tp, [
                    l("div", Bp, [
                      l("span", Lp, " Success: " + $(T(X)(h(y))), 1),
                      l("span", Fp, " Failed: " + $(T(X)(y.payment_failed_count || 0)), 1)
                    ])
                  ]),
                  l("td", Pp, [
                    u(y).length > 0 ? (m(), x("div", Ip, [
                      (m(!0), x(q, null, tt(u(y), (w) => (m(), x("span", {
                        key: `${y.date}-${w.currency}`,
                        class: "badge badge-currency"
                      }, $(w.currency) + " " + $(p(w.total_value)), 1))), 128))
                    ])) : (m(), x("span", Rp, "N/A"))
                  ]),
                  l("td", Ep, [
                    l("div", Op, [
                      l("span", Vp, " Not Found: " + $(y.not_found_count ? T(X)(y.not_found_count) : "N/A"), 1),
                      l("span", zp, " Cancelled: " + $(y.cancelled_count ? T(X)(y.cancelled_count) : "N/A"), 1),
                      l("span", Np, " No Balance: " + $(y.no_pending_balance_count ? T(X)(y.no_pending_balance_count) : "N/A"), 1),
                      l("span", Wp, " Errors: " + $(y.error_count ? T(X)(y.error_count) : "N/A"), 1)
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          c.value ? (m(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: g[0] || (g[0] = (y) => o.value = !o.value)
          }, [
            kt($(o.value ? "View less" : `View more (${i.value.length - gs} more rows)`) + " ", 1),
            (m(), x("svg", {
              class: K(["view-more-icon", { "view-more-icon-rotated": o.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...g[7] || (g[7] = [
              l("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : E("", !0),
          e.enableExport ? (m(), dt(T(xt), {
            key: 1,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (m(), x("section", Hp, [...g[9] || (g[9] = [
          st('<div class="empty-state-content" data-v-15d5c773><div class="empty-icon-wrapper" data-v-15d5c773><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-15d5c773><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-v-15d5c773></path></svg></div><p class="empty-title" data-v-15d5c773>No booking manager data available</p><p class="empty-description" data-v-15d5c773>No booking manager data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Yp = /* @__PURE__ */ nt(jp, [["__scopeId", "data-v-15d5c773"]]), Kp = { class: "checkin-metrics-card" }, Up = {
  key: 0,
  class: "loading-state"
}, qp = {
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
    const a = t, s = (b) => {
      a("export", b);
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
    }, r = at([]), c = S(() => {
      const b = n.data;
      return b && (Array.isArray(b.checkin_by_day) && b.checkin_by_day.length > 0 || (b.total_checkin_initiated ?? 0) > 0) ? { ...o, ...b } : n.checkinData ?? o;
    }), d = S(() => {
      const b = n.data;
      return b && (Array.isArray(b.failed_by_step_by_day) && b.failed_by_step_by_day.length > 0 || Array.isArray(b.unrecovered_by_step) && b.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: b.total_checkin_failed ?? 0,
        total_checkin_unrecovered: b.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: b.failed_by_step_by_day ?? [],
        unrecovered_by_step: b.unrecovered_by_step ?? [],
        unrecovered_by_day: b.unrecovered_by_day ?? []
      } : n.failedData ?? i;
    }), u = S(() => {
      const b = {
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
      return (d.value.unrecovered_by_step || []).forEach((y) => {
        const k = y.step_name.replace(/_/g, " ").split(" ").map((C) => C.charAt(0).toUpperCase() + C.slice(1)).join(" "), M = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        b[k] = M[k] || "#DC2626";
      }), b;
    }), h = (b, g) => !g || g === 0 ? "0%" : `${Math.round(b / g * 100)}%`, p = (b, g) => {
      const y = X(b), w = h(b, g);
      return `${y} (${w})`;
    }, v = (b) => b.reduce((g, y) => g + y.failed_count, 0), f = S(() => {
      const b = [], g = [];
      if (!c.value.total_checkin_initiated)
        return { nodes: b, links: g };
      b.push({ name: "Checkin Init" }), b.push({ name: "Booking retrive" }), b.push({ name: "Booking retrive success" }), b.push({ name: "Number of Passengers" }), b.push({ name: "Completed" }), b.push({ name: "Closed with BP" });
      const y = c.value.total_checkin_initiated, w = c.value.total_checkin_init, k = c.value.total_checkin_init_abandoned, M = w - k, C = c.value.total_checkin_started, D = c.value.total_checkin_completed, A = c.value.total_checkin_closed, B = d.value.unrecovered_by_step || [], L = B.reduce((P, I) => P + I.count, 0);
      if (w > 0) {
        const P = Math.round(w / y * 100);
        g.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: w,
          label: `${w.toLocaleString()} (${P}%)`
        });
      }
      const F = y - w;
      if (F > 0) {
        const P = Math.round(F / y * 100);
        b.push({ name: "Abandoned (Init)" }), g.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: F,
          label: `${F.toLocaleString()} (${P}%)`
        });
      }
      if (k > 0) {
        const P = Math.round(k / y * 100);
        b.push({ name: "Abandoned (Started)" }), g.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: k,
          label: `${k.toLocaleString()} (${P}%)`
        });
      }
      if (M > 0) {
        const P = Math.round(M / y * 100);
        g.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: M,
          label: `${M.toLocaleString()} (${P}%)`
        });
      }
      if (C > 0) {
        const P = Math.round(C / y * 100);
        g.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: C,
          label: `${C.toLocaleString()} (${P}%)`
        });
      }
      if (D > 0) {
        const P = Math.round(D / C * 100);
        g.push({
          source: "Number of Passengers",
          target: "Completed",
          value: D,
          label: `${D.toLocaleString()} (${P}%)`
        });
      }
      if (B.length > 0 && L > 0) {
        b.push({ name: "Unrecovered" });
        const P = Math.round(L / C * 100);
        g.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: L,
          label: `${L.toLocaleString()} (${P}%)`
        }), B.forEach((I) => {
          const H = I.step_name.replace(/_/g, " ").split(" ").map((j) => j.charAt(0).toUpperCase() + j.slice(1)).join(" "), Y = Math.round(I.count / C * 100);
          b.push({ name: H }), g.push({
            source: "Unrecovered",
            target: H,
            value: I.count,
            label: `${I.count.toLocaleString()} (${Y}%)`
          });
        });
      }
      const O = C - (D + L);
      if (O > 0) {
        const P = Math.round(O / C * 100);
        b.push({ name: "Abandoned (Flow)" }), g.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: O,
          label: `${O.toLocaleString()} (${P}%)`
        });
      }
      const W = D - A;
      if (W > 0) {
        const P = Math.round(W / C * 100);
        b.push({ name: "BP Error" }), g.push({
          source: "Completed",
          target: "BP Error",
          value: W,
          label: `${W.toLocaleString()} (${P}%)`
        });
      }
      if (A > 0) {
        const P = Math.round(A / C * 100);
        g.push({
          source: "Completed",
          target: "Closed with BP",
          value: A,
          label: `${A.toLocaleString()} (${P}%)`
        });
      }
      return { nodes: b, links: g };
    }), _ = () => {
      const b = c.value.checkin_by_day || [], g = d.value.failed_by_step_by_day || [];
      if (b.length === 0) {
        r.value = [];
        return;
      }
      r.value = [...b].map((y) => {
        const w = g.find(
          (k) => k.date === y.date
        );
        return {
          ...y,
          failed_steps: w?.steps || []
        };
      }), r.value.sort((y, w) => new Date(y.date) - new Date(w.date));
    };
    return Rt(
      [() => n.data, () => n.checkinData, () => n.failedData],
      () => {
        _();
      },
      { deep: !0, immediate: !0 }
    ), (b, g) => (m(), x("article", Kp, [
      g[3] || (g[3] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Check-in Metrics"),
          l("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      n.loading ? (m(), x("div", Up, [...g[0] || (g[0] = [
        st('<div class="loading-container" data-v-d527da09><div class="chart-flow-loader" data-v-d527da09><div class="flow-line flow-1" data-v-d527da09></div><div class="flow-line flow-2" data-v-d527da09></div><div class="flow-line flow-3" data-v-d527da09></div><div class="flow-line flow-4" data-v-d527da09></div><div class="flow-line flow-5" data-v-d527da09></div></div><p class="loading-text" data-v-d527da09>Loading check-in data...</p></div>', 1)
      ])])) : (m(), x("div", qp, [
        f.value.nodes.length > 0 ? (m(), x("section", Xp, [
          l("div", Gp, [
            Q(_e, {
              data: f.value,
              height: "500px",
              "node-colors": u.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : E("", !0),
        r.value && r.value.length > 0 ? (m(), x("section", Zp, [
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
                (m(!0), x(q, null, tt(r.value, (y) => (m(), x("tr", {
                  key: y.date,
                  class: "table-row"
                }, [
                  l("td", e0, $(T(At)(y.date).format("DD/MM/YYYY")), 1),
                  l("td", a0, $(T(X)(y.checkin_initiated_count)), 1),
                  l("td", s0, $(p(y.checkin_init_count, y.checkin_initiated_count)), 1),
                  l("td", n0, $(T(X)(y.checkin_started_count)), 1),
                  l("td", o0, $(p(y.checkin_completed_count, y.checkin_started_count)), 1),
                  l("td", i0, $(p(y.checkin_closed_count, y.checkin_started_count)), 1),
                  l("td", r0, $(p(v(y.failed_steps), y.checkin_started_count)), 1),
                  l("td", l0, [
                    y.failed_steps && y.failed_steps.length > 0 ? (m(), x("div", c0, [
                      (m(!0), x(q, null, tt(y.failed_steps, (w) => (m(), x("div", {
                        key: w.step_name,
                        class: "failed-step-item"
                      }, [
                        l("span", d0, $(w.step_name.replace(/_/g, " ")) + ":", 1),
                        l("span", u0, $(w.failed_count), 1)
                      ]))), 128))
                    ])) : (m(), x("div", h0, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (m(), dt(T(xt), {
            key: 0,
            onExport: s,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (m(), x("section", f0, [...g[2] || (g[2] = [
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
}, x0 = { class: "table-wrapper" }, k0 = { class: "data-table" }, w0 = { class: "table-body" }, $0 = { class: "table-cell date-cell" }, M0 = { class: "table-cell text-center" }, S0 = { class: "table-cell text-center" }, C0 = { class: "table-cell text-center" }, D0 = { class: "table-cell text-center" }, A0 = { class: "table-cell text-center" }, T0 = { class: "table-cell text-center" }, B0 = { class: "table-cell reasons-cell" }, L0 = {
  key: 0,
  class: "reasons-list"
}, F0 = { class: "reason-name" }, P0 = { class: "reason-count" }, I0 = {
  key: 1,
  class: "no-reasons"
}, R0 = {
  key: 2,
  class: "empty-state"
}, E0 = { class: "empty-state-content" }, O0 = { class: "empty-icon-wrapper" }, ps = 3, V0 = /* @__PURE__ */ J({
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
    const s = e, n = a, o = (w) => {
      n("export", w);
    }, { isDark: i } = ct(lt(s, "theme")), r = (w) => w == null ? "0" : w.toLocaleString(), c = (w) => {
      const k = new Date(w), M = String(k.getDate()).padStart(2, "0"), C = String(k.getMonth() + 1).padStart(2, "0"), D = k.getFullYear();
      return `${M}/${C}/${D}`;
    }, d = (w) => w.replace(/_/g, " ").replace(/\b\w/g, (k) => k.toUpperCase()), u = (w, k) => !k || k === 0 ? "0%" : `${Math.round(w / k * 100)}%`, h = (w, k) => {
      const M = w || 0, C = k || 0, D = r(M), A = u(M, C);
      return `${D} (${A})`;
    }, p = (w) => w ? w.reduce((k, M) => k + M.failed_count, 0) : 0, v = S(() => {
      const w = {
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
        w[D] = A[D] || "#DC2626";
      }), w;
    }), f = at(!1), _ = S(() => {
      const w = s.checkinData?.checkin_by_day || [], k = s.failedData?.failed_by_step_by_day || [];
      return w.map((C) => {
        const D = k.find((A) => A.date === C.date);
        return {
          ...C,
          failed_steps: D?.steps || []
        };
      }).sort((C, D) => new Date(C.date).getTime() - new Date(D.date).getTime());
    }), b = S(() => f.value ? _.value : _.value.slice(0, ps)), g = S(() => _.value.length > ps), y = S(() => {
      const w = [], k = [], M = /* @__PURE__ */ new Set(), C = (rt) => {
        M.has(rt) || (w.push({ name: rt }), M.add(rt));
      };
      if (!s.checkinData?.total_checkin_initiated)
        return { nodes: w, links: k };
      C("Checkin Init"), C("Booking retrive"), C("Booking retrive success"), C("Number of Passengers"), C("Completed"), C("Closed with BP");
      const D = s.checkinData.total_checkin_initiated || 0, A = s.checkinData.total_checkin_init || 0, B = s.checkinData.total_checkin_init_abandoned || 0, L = s.checkinData.total_checkin_pre_init_abandoned_error, F = s.checkinData.total_checkin_pre_init_abandoned_voluntary, O = L != null || F != null, W = O ? Math.max(Number(L) || 0, 0) : 0, P = O ? Math.max(Number(F) || 0, 0) : 0, I = s.checkinData.total_checkin_init_abandoned_error, V = s.checkinData.total_checkin_init_abandoned_voluntary, H = I != null || V != null, Y = H ? Math.max(Number(I) || 0, 0) : 0, j = H ? Math.max(Number(V) || 0, 0) : 0, N = H ? Math.max(B - Y - j, 0) : B, et = A - B, G = s.checkinData.total_checkin_started || 0, U = s.checkinData.total_checkin_completed || 0, ot = s.checkinData.total_checkin_closed || 0, wt = s.failedData?.unrecovered_by_step || [], ft = wt.reduce((rt, de) => rt + de.count, 0);
      if (A > 0) {
        const rt = Math.round(A / D * 100);
        k.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: A,
          label: `${A.toLocaleString()} (${rt}%)`
        });
      }
      const Pt = D - A;
      if (O) {
        if (P > 0) {
          const rt = Math.round(P / D * 100);
          C("Abandoned (Init)"), k.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: P,
            label: `${P.toLocaleString()} (${rt}%)`
          });
        }
        if (W > 0) {
          const rt = Math.round(W / D * 100);
          C("Booking not retreived"), k.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: W,
            label: `${W.toLocaleString()} (${rt}%)`
          });
        }
      } else if (Pt > 0) {
        const rt = Math.round(Pt / D * 100);
        C("Abandoned (Init)"), k.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: Pt,
          label: `${Pt.toLocaleString()} (${rt}%)`
        });
      }
      if (H) {
        if (Y > 0) {
          const rt = Math.round(Y / D * 100);
          C("Error"), k.push({
            source: "Booking retrive",
            target: "Error",
            value: Y,
            label: `${Y.toLocaleString()} (${rt}%)`
          });
        }
        if (j > 0) {
          const rt = Math.round(j / D * 100);
          C("Abandoned (Started)"), k.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: j,
            label: `${j.toLocaleString()} (${rt}%)`
          });
        }
        if (N > 0) {
          const rt = Math.round(N / D * 100);
          C("Abandoned (Started)"), k.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: N,
            label: `${N.toLocaleString()} (${rt}%)`
          });
        }
      } else if (B > 0) {
        const rt = Math.round(B / D * 100);
        C("Abandoned (Started)"), k.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: B,
          label: `${B.toLocaleString()} (${rt}%)`
        });
      }
      if (et > 0) {
        const rt = Math.round(et / D * 100);
        k.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: et,
          label: `${et.toLocaleString()} (${rt}%)`
        });
      }
      if (G > 0) {
        const rt = Math.round(G / D * 100);
        k.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: G,
          label: `${G.toLocaleString()} (${rt}%)`
        });
      }
      if (U > 0) {
        const rt = Math.round(U / G * 100);
        k.push({
          source: "Number of Passengers",
          target: "Completed",
          value: U,
          label: `${U.toLocaleString()} (${rt}%)`
        });
      }
      if (wt.length > 0 && ft > 0) {
        C("Unrecovered");
        const rt = Math.round(ft / G * 100);
        k.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: ft,
          label: `${ft.toLocaleString()} (${rt}%)`
        }), wt.forEach((de) => {
          const Ke = de.step_name.replace(/_/g, " ").split(" ").map((Ue) => Ue.charAt(0).toUpperCase() + Ue.slice(1)).join(" "), ya = Math.round(de.count / G * 100);
          C(Ke), k.push({
            source: "Unrecovered",
            target: Ke,
            value: de.count,
            label: `${de.count.toLocaleString()} (${ya}%)`
          });
        });
      }
      const zt = G - (U + ft);
      if (zt > 0) {
        const rt = Math.round(zt / G * 100);
        C("Abandoned (Flow)"), k.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: zt,
          label: `${zt.toLocaleString()} (${rt}%)`
        });
      }
      const Kt = U - ot;
      if (Kt > 0) {
        const rt = Math.round(Kt / G * 100);
        C("BP Error"), k.push({
          source: "Completed",
          target: "BP Error",
          value: Kt,
          label: `${Kt.toLocaleString()} (${rt}%)`
        });
      }
      if (ot > 0) {
        const rt = Math.round(ot / G * 100);
        k.push({
          source: "Completed",
          target: "Closed with BP",
          value: ot,
          label: `${ot.toLocaleString()} (${rt}%)`
        });
      }
      return { nodes: w, links: k };
    });
    return t({ isDark: i }), (w, k) => (m(), x("article", v0, [
      k[6] || (k[6] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Check-in Metrics"),
          l("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      e.loading ? (m(), x("div", b0, [...k[1] || (k[1] = [
        st('<div class="loading-container" data-v-eefc834b><div class="chart-bars-loader" data-v-eefc834b><div class="bar bar-1" data-v-eefc834b></div><div class="bar bar-2" data-v-eefc834b></div><div class="bar bar-3" data-v-eefc834b></div><div class="bar bar-4" data-v-eefc834b></div><div class="bar bar-5" data-v-eefc834b></div></div><p class="loading-text" data-v-eefc834b>Loading check-in data...</p></div>', 1)
      ])])) : (m(), x("div", m0, [
        y.value.nodes.length > 0 ? (m(), x("div", y0, [
          Q(_e, {
            data: y.value,
            height: "500px",
            "node-colors": v.value,
            "use-gradient": !1,
            "node-gap": 30
          }, null, 8, ["data", "node-colors"])
        ])) : E("", !0),
        _.value && _.value.length > 0 ? (m(), x("div", _0, [
          l("div", x0, [
            l("table", k0, [
              k[2] || (k[2] = l("thead", null, [
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
                (m(!0), x(q, null, tt(b.value, (M) => (m(), x("tr", {
                  key: M.date,
                  class: "table-row"
                }, [
                  l("td", $0, $(c(M.date)), 1),
                  l("td", M0, $(r(M.checkin_initiated_count)), 1),
                  l("td", S0, $(h(M.checkin_init_count, M.checkin_initiated_count)), 1),
                  l("td", C0, $(r(M.checkin_started_count)), 1),
                  l("td", D0, $(h(M.checkin_completed_count, M.checkin_started_count)), 1),
                  l("td", A0, $(h(M.checkin_closed_count, M.checkin_started_count)), 1),
                  l("td", T0, $(h(p(M.failed_steps), M.checkin_started_count)), 1),
                  l("td", B0, [
                    M.failed_steps && M.failed_steps.length > 0 ? (m(), x("div", L0, [
                      (m(!0), x(q, null, tt(M.failed_steps, (C) => (m(), x("div", {
                        key: C.step_name,
                        class: "reason-item"
                      }, [
                        l("span", F0, $(d(C.step_name)) + ":", 1),
                        l("span", P0, $(C.failed_count), 1)
                      ]))), 128))
                    ])) : (m(), x("div", I0, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          g.value ? (m(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: k[0] || (k[0] = (M) => f.value = !f.value)
          }, [
            kt($(f.value ? "View less" : `View more (${_.value.length - ps} more rows)`) + " ", 1),
            (m(), x("svg", {
              class: K(["view-more-icon", { "view-more-icon-rotated": f.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...k[3] || (k[3] = [
              l("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : E("", !0),
          e.enableExport ? (m(), dt(T(xt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (m(), x("div", R0, [
          l("div", E0, [
            l("div", O0, [
              Q(T(Vt), { class: "empty-icon" })
            ]),
            k[4] || (k[4] = l("p", { class: "empty-title" }, "No check-in data available", -1)),
            k[5] || (k[5] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see check-in metrics.", -1))
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
}, Y0 = { class: "table-wrapper" }, K0 = { class: "data-table" }, U0 = { class: "table-body" }, q0 = { class: "table-cell font-medium text-center" }, X0 = { class: "airport-badge" }, G0 = { class: "table-cell text-center" }, Z0 = {
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
}, vs = 3, hv = /* @__PURE__ */ J({
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
    }, { isDark: i } = ct(lt(s, "theme")), r = at(!1), c = S(() => r.value ? s.data : s.data.slice(0, vs)), d = S(() => s.data.length > vs), u = (v, f) => !f || f === 0 || !v ? "0%" : `${Math.round(v / f * 100)}%`, h = (v) => !v || v === "None" ? "-" : String(v).trim().replace(/_[0-9]+$/i, ""), p = (v) => {
      const f = h(v?.departure_airport), _ = h(v?.arrival_airport);
      return f === "-" || _ === "-" ? !1 : f === _;
    };
    return t({ isDark: i }), (v, f) => (m(), x("article", N0, [
      f[7] || (f[7] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Checkin Segments"),
          l("p", { class: "card-subtitle" }, "Breakdown by flight segment with connection when applicable")
        ])
      ], -1)),
      s.loading ? (m(), x("div", W0, [...f[1] || (f[1] = [
        st('<div class="loading-container" data-v-a1ebd82a><div class="chart-flow-loader" data-v-a1ebd82a><div class="flow-line flow-1" data-v-a1ebd82a></div><div class="flow-line flow-2" data-v-a1ebd82a></div><div class="flow-line flow-3" data-v-a1ebd82a></div><div class="flow-line flow-4" data-v-a1ebd82a></div><div class="flow-line flow-5" data-v-a1ebd82a></div></div><p class="loading-text" data-v-a1ebd82a>Loading segment data...</p></div>', 1)
      ])])) : (m(), x("div", H0, [
        s.data.length > 0 ? (m(), x("section", j0, [
          l("div", Y0, [
            l("table", K0, [
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
              l("tbody", U0, [
                (m(!0), x(q, null, tt(c.value, (_, b) => (m(), x("tr", {
                  key: b,
                  class: "table-row"
                }, [
                  l("td", q0, [
                    l("span", X0, $(h(_.departure_airport)), 1)
                  ]),
                  l("td", G0, [
                    h(_.conexion_airport) !== "-" ? (m(), x("span", Z0, $(h(_.conexion_airport)), 1)) : (m(), x("span", Q0, "-"))
                  ]),
                  l("td", J0, [
                    l("span", tv, $(h(_.arrival_airport)), 1)
                  ]),
                  l("td", ev, [
                    p(_) ? (m(), x("span", av, [...f[2] || (f[2] = [
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
                      kt(" Roundtrip ", -1)
                    ])])) : (m(), x("span", sv, [...f[3] || (f[3] = [
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
                      kt(" One way ", -1)
                    ])]))
                  ]),
                  l("td", nv, $(T(X)(_.segment_init_count)), 1),
                  l("td", ov, [
                    l("span", iv, $(u(_.segment_started_count, _.segment_init_count)), 1)
                  ]),
                  l("td", rv, [
                    l("span", lv, $(u(_.segment_completed_count, _.segment_init_count)), 1)
                  ]),
                  l("td", cv, [
                    l("span", dv, $(u(_.segment_closed_count, _.segment_init_count)), 1)
                  ])
                ]))), 128))
              ])
            ])
          ]),
          d.value ? (m(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: f[0] || (f[0] = (_) => r.value = !r.value)
          }, [
            kt($(r.value ? "View less" : `View more (${s.data.length - vs} more rows)`) + " ", 1),
            (m(), x("svg", {
              class: K(["view-more-icon", { "view-more-icon-rotated": r.value }]),
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
          ])) : E("", !0),
          e.enableExport ? (m(), dt(T(xt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (m(), x("section", uv, [...f[6] || (f[6] = [
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
}, Sv = { class: "table-wrapper" }, Cv = { class: "data-table" }, Dv = { class: "table-body" }, Av = { class: "table-cell font-medium text-center" }, Tv = { class: "table-cell text-center" }, Bv = { class: "table-cell text-center" }, Lv = { class: "percentage-text" }, Fv = { class: "table-cell text-center" }, Pv = { class: "abandoned-value" }, Iv = { class: "table-cell" }, Rv = { class: "badges-container badges-wrap" }, Ev = { class: "badge badge-vol" }, Ov = { class: "badge badge-confirm" }, Vv = { class: "badge badge-not-confirm" }, zv = { class: "badge badge-reject" }, Nv = { class: "badge badge-not-paid" }, Wv = { class: "badge badge-success" }, Hv = { class: "table-cell" }, jv = { class: "badges-container badges-wrap" }, Yv = { class: "badge badge-inv" }, Kv = { class: "badge badge-human" }, Uv = { class: "badge badge-accept" }, qv = {
  key: 1,
  class: "empty-state"
}, bs = 3, Xv = /* @__PURE__ */ J({
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
    const a = e, s = t, n = (b) => {
      s("export", b);
    }, o = at(!1), i = S(() => a.data?.disruption_by_day ? [...a.data.disruption_by_day].sort(
      (b, g) => new Date(b.date).getTime() - new Date(g.date).getTime()
    ) : []), r = S(() => o.value ? i.value : i.value.slice(0, bs)), c = S(() => i.value.length > bs), d = S(() => a.data?.total_payment_success || []), u = (b, g) => !g || g === 0 ? "0%" : `${Math.round(b / g * 100)}%`, h = (b) => vt(b), p = (b) => (b ?? []).reduce((g, y) => g + (y.count ?? 0), 0), v = (b) => typeof b.sell_success_count == "number" ? b.sell_success_count : p(b.payment_success_total), f = S(() => {
      const b = a.data, g = b.total_disruption_conversations || 0, y = b.total_disruption_initiated || 0, w = b.total_voluntary || 0, k = b.total_involuntary || 0, M = b.total_accepted || 0, C = b.total_confirmed || 0, D = typeof b.total_sell_success == "number" ? b.total_sell_success : p(b.total_payment_success), A = b.total_sell_failed || 0, B = Math.max(0, g - y), L = Math.max(0, y - w - k), F = Math.max(0, k - M), O = Math.max(0, w - C), W = A, P = Math.max(0, C - D - W), I = (Y, j) => {
        const N = j > 0 ? Math.round(Y / j * 100) : 0;
        return `${Y.toLocaleString()} (${N}%)`;
      }, V = [
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
      ], H = [];
      return y > 0 && H.push({
        source: "Initiated",
        target: "Started",
        value: y,
        label: I(y, g)
      }), B > 0 && H.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: B,
        label: I(B, g)
      }), w > 0 && H.push({
        source: "Started",
        target: "Voluntary",
        value: w,
        label: I(w, g)
      }), k > 0 && H.push({
        source: "Started",
        target: "Involuntary",
        value: k,
        label: I(k, g)
      }), L > 0 && H.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: L,
        label: I(L, g)
      }), M > 0 && H.push({
        source: "Involuntary",
        target: "Accepted",
        value: M,
        label: I(M, g)
      }), F > 0 && H.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: F,
        label: I(F, g)
      }), C > 0 && H.push({
        source: "Voluntary",
        target: "Confirmed",
        value: C,
        label: I(C, g)
      }), O > 0 && H.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: O,
        label: I(O, g)
      }), D > 0 && H.push({
        source: "Confirmed",
        target: "Paid",
        value: D,
        label: I(D, g)
      }), W > 0 && H.push({
        source: "Confirmed",
        target: "Rejected",
        value: W,
        label: I(W, g)
      }), P > 0 && H.push({
        source: "Confirmed",
        target: "Not Paid",
        value: P,
        label: I(P, g)
      }), { nodes: V, links: H };
    }), _ = {
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
    return (b, g) => (m(), x("article", gv, [
      l("header", pv, [
        l("div", vv, [
          g[2] || (g[2] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "Disruption Manager Metrics"),
            l("p", { class: "card-subtitle" }, "Disruption workflow performance and completion tracking")
          ], -1)),
          a.loading ? E("", !0) : (m(), x("div", bv, [
            g[1] || (g[1] = l("p", { class: "badge-label" }, "Payment Success Value", -1)),
            d.value.length > 0 ? (m(), x("div", mv, [
              (m(!0), x(q, null, tt(d.value, (y) => (m(), x("p", {
                key: y.currency,
                class: "currency-breakdown-item"
              }, $(y.currency) + " " + $(h(y.total_value)), 1))), 128))
            ])) : (m(), x("p", yv, $(h(0)), 1))
          ]))
        ])
      ]),
      a.loading ? (m(), x("div", _v, [...g[3] || (g[3] = [
        st('<div class="loading-container" data-v-47c8f691><div class="chart-bars-loader" data-v-47c8f691><div class="bar bar-1" data-v-47c8f691></div><div class="bar bar-2" data-v-47c8f691></div><div class="bar bar-3" data-v-47c8f691></div><div class="bar bar-4" data-v-47c8f691></div><div class="bar bar-5" data-v-47c8f691></div></div><p class="loading-text" data-v-47c8f691>Loading disruption data...</p></div>', 1)
      ])])) : (m(), x("div", xv, [
        l("section", kv, [
          l("div", wv, [
            f.value.nodes.length > 0 && f.value.links.length > 0 ? (m(), dt(_e, {
              key: 0,
              data: f.value,
              "node-colors": _,
              height: "500px"
            }, null, 8, ["data"])) : (m(), x("div", $v, [...g[4] || (g[4] = [
              l("p", { class: "empty-chart-text" }, "No disruption data available for visualization", -1)
            ])]))
          ])
        ]),
        i.value && i.value.length > 0 ? (m(), x("section", Mv, [
          g[7] || (g[7] = st('<div class="section-header" data-v-47c8f691><h4 class="section-title" data-v-47c8f691>Daily Overview</h4></div><div class="legend-container" data-v-47c8f691><p class="legend-title" data-v-47c8f691>Legend</p><div class="legend-items" data-v-47c8f691><div class="legend-group" data-v-47c8f691><span class="legend-label" data-v-47c8f691>Voluntary:</span><span class="badge badge-vol" data-v-47c8f691>VOL</span></div><div class="legend-group" data-v-47c8f691><span class="legend-label" data-v-47c8f691>Involuntary:</span><span class="badge badge-inv" data-v-47c8f691>INV</span></div><div class="legend-note" data-v-47c8f691><span data-v-47c8f691>Vol=Voluntary</span><span data-v-47c8f691>•</span><span data-v-47c8f691>Inv=Involuntary</span></div></div></div>', 2)),
          l("div", Sv, [
            l("table", Cv, [
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
                (m(!0), x(q, null, tt(r.value, (y) => (m(), x("tr", {
                  key: y.date,
                  class: "table-row"
                }, [
                  l("td", Av, $(T(At)(y.date).format("DD/MM")), 1),
                  l("td", Tv, $(T(X)(y.disruption_conversations)), 1),
                  l("td", Bv, [
                    kt($(T(X)(y.disruption_initiated_count)) + " ", 1),
                    l("span", Lv, " (" + $(u(y.disruption_initiated_count, y.disruption_conversations)) + ") ", 1)
                  ]),
                  l("td", Fv, [
                    l("span", Pv, $(T(X)(y.disruption_initiated_count - y.voluntary_count - y.involuntary_count)) + " (" + $(u(y.disruption_initiated_count - y.voluntary_count - y.involuntary_count, y.disruption_conversations)) + ") ", 1)
                  ]),
                  l("td", Iv, [
                    l("div", Rv, [
                      l("span", Ev, " VOL " + $(T(X)(y.voluntary_count)) + " (" + $(u(y.voluntary_count, y.disruption_conversations)) + ") ", 1),
                      l("span", Ov, " Confirm " + $(T(X)(y.confirmed_count)) + " (" + $(u(y.confirmed_count, y.disruption_conversations)) + ") ", 1),
                      l("span", Vv, " Not Confirm " + $(T(X)(y.voluntary_count - y.confirmed_count)) + " (" + $(u(y.voluntary_count - y.confirmed_count, y.disruption_conversations)) + ") ", 1),
                      l("span", zv, " Reject " + $(T(X)(y.sell_failed_count)) + " (" + $(u(y.sell_failed_count, y.disruption_conversations)) + ") ", 1),
                      l("span", Nv, " Not Paid " + $(T(X)(Math.max(0, y.confirmed_count - v(y) - y.sell_failed_count))) + " (" + $(u(Math.max(0, y.confirmed_count - v(y) - y.sell_failed_count), y.disruption_conversations)) + ") ", 1),
                      l("span", Wv, " Finish " + $(T(X)(v(y))) + " (" + $(u(v(y), y.disruption_conversations)) + ") ", 1),
                      (m(!0), x(q, null, tt(y.payment_success_total || [], (w) => (m(), x("span", {
                        key: `${y.date}-${w.currency}`,
                        class: "badge badge-currency"
                      }, $(w.currency) + " " + $(h(w.total_value)), 1))), 128))
                    ])
                  ]),
                  l("td", Hv, [
                    l("div", jv, [
                      l("span", Yv, " INV " + $(T(X)(y.involuntary_count)) + " (" + $(u(y.involuntary_count, y.disruption_conversations)) + ") ", 1),
                      l("span", Kv, " Human " + $(T(X)(y.involuntary_count - y.accepted_count)) + " (" + $(u(y.involuntary_count - y.accepted_count, y.disruption_conversations)) + ") ", 1),
                      l("span", Uv, " Accept " + $(T(X)(y.accepted_count)) + " (" + $(u(y.accepted_count, y.disruption_conversations)) + ") ", 1)
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          c.value ? (m(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: g[0] || (g[0] = (y) => o.value = !o.value)
          }, [
            kt($(o.value ? "View less" : `View more (${i.value.length - bs} more rows)`) + " ", 1),
            (m(), x("svg", {
              class: K(["view-more-icon", { "view-more-icon-rotated": o.value }]),
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
          e.enableExport ? (m(), dt(T(xt), {
            key: 1,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (m(), x("section", qv, [...g[8] || (g[8] = [
          st('<div class="empty-state-content" data-v-47c8f691><div class="empty-icon-wrapper" data-v-47c8f691><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-47c8f691><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-47c8f691></path></svg></div><p class="empty-title" data-v-47c8f691>No disruption data available</p><p class="empty-description" data-v-47c8f691>No disruption data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Gv = /* @__PURE__ */ nt(Xv, [["__scopeId", "data-v-47c8f691"]]), Zv = { class: "faq-metrics-card" }, Qv = {
  key: 0,
  class: "card-body"
}, Jv = { class: "kpi-grid" }, tb = { class: "kpi-card" }, eb = { class: "kpi-value" }, ab = { class: "kpi-card" }, sb = { class: "kpi-value" }, nb = { class: "kpi-card kpi-card--airline" }, ob = { class: "kpi-value" }, ib = { class: "kpi-card kpi-card--booking" }, rb = { class: "kpi-value" }, lb = { class: "kpi-card kpi-card--flight" }, cb = { class: "kpi-value" }, db = {
  key: 0,
  class: "chart-section"
}, ub = {
  key: 1,
  class: "empty-state"
}, hb = {
  key: 1,
  class: "loading-state"
}, fb = /* @__PURE__ */ J({
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
    const s = e, n = a, o = (p) => {
      n("export", p);
    }, { isDark: i, colors: r } = ct(lt(s, "theme")), c = at({ labels: [], datasets: [] }), d = S(() => s.data ?? {
      total_faq_events: 0,
      total_documents_found: 0,
      total_airline_information_retrieved: 0,
      total_booking_info_retrieved: 0,
      total_flight_status_retrieved: 0,
      faq_by_day: []
    }), u = S(() => ({
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
    })), h = (p) => {
      if (!p) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const v = p.faq_by_day || [];
      if (v.length > 0) {
        const f = v.map((y) => At(y.date).format("MMM DD")), _ = v.map((y) => y.airline_information_retrieved_count || 0), b = v.map((y) => y.flight_status_retrieved_count || 0), g = v.map((y) => y.booking_info_retrieved_count || 0);
        c.value = {
          labels: f,
          datasets: [
            {
              label: "Airline Information",
              data: _,
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
              data: g,
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
        c.value = { labels: [], datasets: [] };
    };
    return Rt(
      () => s.data,
      (p) => {
        h(p ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: i }), (p, v) => (m(), x("article", Zv, [
      v[7] || (v[7] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "FAQ Metrics"),
          l("p", { class: "card-subtitle" }, "Daily FAQ consultation and retrieval metrics")
        ])
      ], -1)),
      s.loading ? (m(), x("div", hb, [...v[6] || (v[6] = [
        st('<div class="loading-container" data-v-5d2c3c33><div class="chart-bars-loader" data-v-5d2c3c33><div class="bar bar-1" data-v-5d2c3c33></div><div class="bar bar-2" data-v-5d2c3c33></div><div class="bar bar-3" data-v-5d2c3c33></div><div class="bar bar-4" data-v-5d2c3c33></div><div class="bar bar-5" data-v-5d2c3c33></div></div><p class="loading-text" data-v-5d2c3c33>Loading FAQ metrics...</p></div>', 1)
      ])])) : (m(), x("div", Qv, [
        l("div", Jv, [
          l("div", tb, [
            v[0] || (v[0] = l("span", { class: "kpi-label" }, "Total FAQ", -1)),
            l("span", eb, $(T(X)(d.value.total_faq_events)), 1)
          ]),
          l("div", ab, [
            v[1] || (v[1] = l("span", { class: "kpi-label" }, "Documents Found", -1)),
            l("span", sb, $(T(X)(d.value.total_documents_found)), 1)
          ]),
          l("div", nb, [
            v[2] || (v[2] = l("div", { class: "kpi-label-row" }, [
              l("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              l("span", { class: "kpi-label" }, "Airline Info")
            ], -1)),
            l("span", ob, $(T(X)(d.value.total_airline_information_retrieved)), 1)
          ]),
          l("div", ib, [
            v[3] || (v[3] = l("div", { class: "kpi-label-row" }, [
              l("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              l("span", { class: "kpi-label" }, "Booking Info")
            ], -1)),
            l("span", rb, $(T(X)(d.value.total_booking_info_retrieved)), 1)
          ]),
          l("div", lb, [
            v[4] || (v[4] = l("div", { class: "kpi-label-row" }, [
              l("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              l("span", { class: "kpi-label" }, "Flight Status")
            ], -1)),
            l("span", cb, $(T(X)(d.value.total_flight_status_retrieved)), 1)
          ])
        ]),
        c.value.labels && c.value.labels.length ? (m(), x("section", db, [
          Q(ye, {
            data: c.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (m(), dt(T(xt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (m(), x("section", ub, [...v[5] || (v[5] = [
          st('<div class="empty-state-content" data-v-5d2c3c33><div class="empty-icon-wrapper" data-v-5d2c3c33><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5d2c3c33><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-5d2c3c33></path></svg></div><p class="empty-title" data-v-5d2c3c33>No FAQ data available</p><p class="empty-description" data-v-5d2c3c33>No FAQ consultation data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), gb = /* @__PURE__ */ nt(fb, [["__scopeId", "data-v-5d2c3c33"]]), pb = { class: "messages-per-agent-card" }, vb = {
  key: 0,
  class: "card-body"
}, bb = {
  key: 0,
  class: "chart-section"
}, mb = {
  key: 1,
  class: "empty-state"
}, yb = { class: "empty-state-content" }, _b = { class: "empty-icon-wrapper" }, xb = {
  key: 1,
  class: "loading-state"
}, kb = /* @__PURE__ */ J({
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
    }, n = e, o = a, i = (h) => {
      o("export", h);
    }, { isDark: r, colors: c } = ct(lt(n, "theme")), d = S(() => {
      const h = n.data?.agents_by_day || {}, p = Object.keys(h).sort();
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const v = /* @__PURE__ */ new Set();
      for (const b of Object.values(h))
        for (const g of Object.keys(b))
          v.add(g);
      const _ = Array.from(v).map((b) => {
        const g = s[b] || "#94a3b8";
        return {
          label: b.charAt(0).toUpperCase() + b.slice(1).replace(/_/g, " "),
          data: p.map((y) => h[y]?.[b] || 0),
          borderColor: g,
          backgroundColor: `${g}20`,
          pointBackgroundColor: g,
          pointBorderColor: r.value ? "#1a1a1d" : "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.3,
          fill: !1
        };
      });
      return {
        labels: p,
        datasets: _
      };
    }), u = S(() => n.options ? n.options : {
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
    return t({ isDark: r }), (h, p) => (m(), x("article", pb, [
      p[3] || (p[3] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Messages per Agent"),
          l("p", { class: "card-subtitle" }, "Agent interaction trends over time")
        ])
      ], -1)),
      e.loading ? (m(), x("div", xb, [...p[2] || (p[2] = [
        st('<div class="loading-container" data-v-b9368fc2><div class="chart-lines-loader" data-v-b9368fc2><div class="line line-1" data-v-b9368fc2></div><div class="line line-2" data-v-b9368fc2></div><div class="line line-3" data-v-b9368fc2></div><div class="line line-4" data-v-b9368fc2></div><div class="line line-5" data-v-b9368fc2></div></div><p class="loading-text" data-v-b9368fc2>Loading chart data...</p></div>', 1)
      ])])) : (m(), x("div", vb, [
        d.value.labels && d.value.labels.length ? (m(), x("section", bb, [
          Q(ye, {
            data: d.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (m(), dt(T(xt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (m(), x("section", mb, [
          l("div", yb, [
            l("div", _b, [
              Q(T(Vt), { class: "empty-icon" })
            ]),
            p[0] || (p[0] = l("p", { class: "empty-title" }, "No agent interactions data", -1)),
            p[1] || (p[1] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), wb = /* @__PURE__ */ nt(kb, [["__scopeId", "data-v-b9368fc2"]]), $b = { class: "record-locator-card" }, Mb = {
  key: 0,
  class: "loading-state"
}, Sb = {
  key: 1,
  class: "card-body"
}, Cb = {
  key: 0,
  class: "chart-section"
}, Db = { class: "chart-wrapper" }, Ab = {
  key: 1,
  class: "table-section"
}, Tb = { class: "table-wrapper" }, Bb = { class: "data-table" }, Lb = { class: "table-header-row" }, Fb = {
  key: 0,
  class: "table-header"
}, Pb = {
  key: 1,
  class: "table-header"
}, Ib = { class: "table-body" }, Rb = { class: "table-cell font-medium" }, Eb = { class: "table-cell text-center" }, Ob = { class: "table-cell text-center" }, Vb = { class: "table-cell text-center" }, zb = { class: "table-cell text-center" }, Nb = { class: "table-cell text-center success-value" }, Wb = { class: "table-cell text-center failed-value" }, Hb = { class: "table-cell text-center warning-value" }, jb = {
  key: 0,
  class: "table-cell text-center"
}, Yb = {
  key: 1,
  class: "table-cell text-center failed-value"
}, Kb = {
  key: 2,
  class: "empty-state"
}, ms = 3, Ub = /* @__PURE__ */ J({
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
    const s = e, n = a, o = (b) => {
      n("export", b);
    }, { isDark: i } = ct(lt(s, "theme")), r = at(!1), c = S(() => s.data?.record_locator_by_day ? [...s.data.record_locator_by_day].sort(
      (b, g) => new Date(b.date).getTime() - new Date(g.date).getTime()
    ) : []), d = S(() => r.value ? c.value : c.value.slice(0, ms)), u = S(() => c.value.length > ms), h = S(() => s.data), p = S(() => ({
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
    })), v = (b, g) => !g || g === 0 ? "0%" : `${Math.round(b / g * 100)}%`, f = (b, g) => {
      const y = X(b), w = v(b, g);
      return `${y} (${w})`;
    }, _ = S(() => {
      const b = [], g = [], y = /* @__PURE__ */ new Set(), w = (U) => {
        y.has(U) || (b.push({ name: U }), y.add(U));
      };
      if (!h.value.total_checkin_initiated)
        return { nodes: b, links: g };
      w("Checkin Init"), w("Booking retrive"), w("Checkin Started"), w("Checkin Completed"), w("Checkin Closed");
      const k = h.value.total_checkin_initiated, M = h.value.total_record_locator_init, C = h.value.total_record_locator_started, D = h.value.total_record_locator_completed, A = h.value.total_record_locator_closed, B = h.value.total_record_locator_failed, L = h.value.total_record_locator_abandoned, F = h.value.total_record_locator_init_abandoned, O = h.value.total_checkin_pre_init_abandoned_error, W = h.value.total_checkin_pre_init_abandoned_voluntary, P = O != null || W != null, I = P ? Math.max(Number(O) || 0, 0) : 0, V = P ? Math.max(Number(W) || 0, 0) : 0, H = h.value.total_record_locator_init_abandoned_error, Y = h.value.total_record_locator_init_abandoned_voluntary, j = H != null || Y != null, N = j ? Math.max(Number(H) || 0, 0) : 0, et = j ? Math.max(Number(Y) || 0, 0) : 0;
      if (M > 0) {
        const U = Math.round(M / k * 100);
        g.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: M,
          label: `${M.toLocaleString()} (${U}%)`
        });
      }
      const G = k - M;
      if (P) {
        if (V > 0) {
          const U = Math.round(V / k * 100);
          w("Abandoned (Init)"), g.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: V,
            label: `${V.toLocaleString()} (${U}%)`
          });
        }
        if (I > 0) {
          const U = Math.round(I / k * 100);
          w("Booking not retreived"), g.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: I,
            label: `${I.toLocaleString()} (${U}%)`
          });
        }
      } else if (G > 0) {
        const U = Math.round(G / k * 100);
        w("Abandoned (Init)"), g.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: G,
          label: `${G.toLocaleString()} (${U}%)`
        });
      }
      if (C > 0) {
        const U = Math.round(C / k * 100);
        g.push({
          source: "Booking retrive",
          target: "Checkin Started",
          value: C,
          label: `${C.toLocaleString()} (${U}%)`
        });
      }
      if (j) {
        if (N > 0) {
          const U = Math.round(N / k * 100);
          w("Error"), g.push({
            source: "Booking retrive",
            target: "Error",
            value: N,
            label: `${N.toLocaleString()} (${U}%)`
          });
        }
        if (et > 0) {
          const U = Math.round(et / k * 100);
          w("Abandoned (Started)"), g.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: et,
            label: `${et.toLocaleString()} (${U}%)`
          });
        }
      } else if (F > 0) {
        const U = Math.round(F / k * 100);
        w("Abandoned (Started)"), g.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: F,
          label: `${F.toLocaleString()} (${U}%)`
        });
      }
      if (D > 0) {
        const U = Math.round(D / C * 100);
        g.push({
          source: "Checkin Started",
          target: "Checkin Completed",
          value: D,
          label: `${D.toLocaleString()} (${U}%)`
        });
      }
      if (A > 0) {
        const U = Math.round(A / C * 100);
        g.push({
          source: "Checkin Completed",
          target: "Checkin Closed",
          value: A,
          label: `${A.toLocaleString()} (${U}%)`
        });
      }
      if (B > 0) {
        const U = Math.round(B / C * 100);
        w("Checkin Failed"), g.push({
          source: "Checkin Started",
          target: "Checkin Failed",
          value: B,
          label: `${B.toLocaleString()} (${U}%)`
        });
      }
      if (L > 0) {
        const U = Math.round(L / C * 100);
        w("Abandoned (Flow)"), g.push({
          source: "Checkin Started",
          target: "Abandoned (Flow)",
          value: L,
          label: `${L.toLocaleString()} (${U}%)`
        });
      }
      return { nodes: b, links: g };
    });
    return t({ isDark: i }), (b, g) => (m(), x("article", $b, [
      g[12] || (g[12] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Checkin by Record Locator Metrics"),
          l("p", { class: "card-subtitle" }, "Checkin by record locator retrieval and completion analysis")
        ])
      ], -1)),
      s.loading ? (m(), x("div", Mb, [...g[1] || (g[1] = [
        st('<div class="loading-container" data-v-e48cea55><div class="chart-flow-loader" data-v-e48cea55><div class="flow-line flow-1" data-v-e48cea55></div><div class="flow-line flow-2" data-v-e48cea55></div><div class="flow-line flow-3" data-v-e48cea55></div><div class="flow-line flow-4" data-v-e48cea55></div><div class="flow-line flow-5" data-v-e48cea55></div></div><p class="loading-text" data-v-e48cea55>Loading record locator data...</p></div>', 1)
      ])])) : (m(), x("div", Sb, [
        _.value.nodes.length > 0 ? (m(), x("section", Cb, [
          l("div", Db, [
            Q(_e, {
              data: _.value,
              height: "500px",
              "node-colors": p.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : E("", !0),
        c.value && c.value.length > 0 ? (m(), x("section", Ab, [
          l("div", Tb, [
            l("table", Bb, [
              l("thead", null, [
                l("tr", Lb, [
                  g[2] || (g[2] = l("th", { class: "table-header" }, "Date", -1)),
                  g[3] || (g[3] = l("th", { class: "table-header" }, "Checkin Init", -1)),
                  g[4] || (g[4] = l("th", { class: "table-header" }, "Booking Retrieve (%)", -1)),
                  g[5] || (g[5] = l("th", { class: "table-header" }, "Checkin Started", -1)),
                  g[6] || (g[6] = l("th", { class: "table-header" }, "Checkin Completed (%)", -1)),
                  g[7] || (g[7] = l("th", { class: "table-header" }, "Checkin Closed (%)", -1)),
                  g[8] || (g[8] = l("th", { class: "table-header" }, "Checkin Failed (%)", -1)),
                  g[9] || (g[9] = l("th", { class: "table-header" }, "Abandoned (%)", -1)),
                  s.isAvianca ? (m(), x("th", Fb, "Create Payment")) : E("", !0),
                  s.isAvianca ? (m(), x("th", Pb, "Failed Payment")) : E("", !0)
                ])
              ]),
              l("tbody", Ib, [
                (m(!0), x(q, null, tt(d.value, (y) => (m(), x("tr", {
                  key: y.date,
                  class: "table-row"
                }, [
                  l("td", Rb, $(T(At)(y.date).format("DD/MM/YYYY")), 1),
                  l("td", Eb, $(T(X)(y.checkin_initiated)), 1),
                  l("td", Ob, $(f(y.record_locator_init_count, y.checkin_initiated)), 1),
                  l("td", Vb, $(T(X)(y.record_locator_started_count)), 1),
                  l("td", zb, $(f(y.record_locator_completed_count, y.record_locator_started_count)), 1),
                  l("td", Nb, $(f(y.record_locator_closed_count, y.record_locator_started_count)), 1),
                  l("td", Wb, $(f(y.record_locator_failed_count, y.record_locator_started_count)), 1),
                  l("td", Hb, $(f(y.record_locator_abandoned_count, y.record_locator_started_count)), 1),
                  s.isAvianca ? (m(), x("td", jb, $(T(X)(y.record_locator_create_payment_count)), 1)) : E("", !0),
                  s.isAvianca ? (m(), x("td", Yb, $(T(X)(y.record_locator_create_payment_failed_count)), 1)) : E("", !0)
                ]))), 128))
              ])
            ])
          ]),
          u.value ? (m(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: g[0] || (g[0] = (y) => r.value = !r.value)
          }, [
            kt($(r.value ? "View less" : `View more (${c.value.length - ms} more rows)`) + " ", 1),
            (m(), x("svg", {
              class: K(["view-more-icon", { "view-more-icon-rotated": r.value }]),
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
          e.enableExport ? (m(), dt(T(xt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (m(), x("section", Kb, [...g[11] || (g[11] = [
          st('<div class="empty-state-content" data-v-e48cea55><div class="empty-icon-wrapper" data-v-e48cea55><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e48cea55><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" data-v-e48cea55></path></svg></div><p class="empty-title" data-v-e48cea55>No record locator data available</p><p class="empty-description" data-v-e48cea55>No record locator data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), qb = /* @__PURE__ */ nt(Ub, [["__scopeId", "data-v-e48cea55"]]), Xb = { class: "sales-channel-card" }, Gb = {
  key: 0,
  class: "loading-state"
}, Zb = {
  key: 1,
  class: "card-body"
}, Qb = {
  key: 0,
  class: "chart-section"
}, Jb = { class: "chart-wrapper" }, tm = {
  key: 1,
  class: "empty-state"
}, em = {
  key: 2,
  class: "comparison-section"
}, am = { class: "comparison-grid" }, sm = { class: "comparison-content" }, nm = { class: "comparison-channel" }, om = { class: "comparison-value" }, im = {
  key: 0,
  class: "comparison-delta"
}, rm = {
  key: 0,
  class: "delta-icon",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, lm = {
  key: 1,
  class: "delta-icon",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, cm = { class: "delta-label" }, dm = {
  key: 1,
  class: "comparison-delta"
}, um = /* @__PURE__ */ J({
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
    S(() => o.data?.total_sell_success ?? 0);
    const d = S(() => {
      const p = /* @__PURE__ */ new Set();
      for (const v of o.data?.sales_by_channel_by_day ?? [])
        for (const f of Object.keys(v.channels))
          p.add(f);
      return Array.from(p).sort();
    }), u = (p, v) => s[p.toLowerCase()] ?? n[v % n.length], h = S(() => {
      const p = o.data?.sales_by_channel_by_day ?? [];
      if (p.length === 0) return { labels: [], datasets: [] };
      const v = p.map((_) => At(_.date).format("MMM-DD")), f = d.value.map((_, b) => ({
        label: _,
        data: p.map((g) => g.channels[_] ?? 0),
        backgroundColor: u(_, b),
        borderRadius: 4
      }));
      return { labels: v, datasets: f };
    });
    return t({ isDark: c }), (p, v) => (m(), x("article", Xb, [
      v[5] || (v[5] = st('<header class="card-header" data-v-8b96a431><div class="header-content" data-v-8b96a431><div class="title-section" data-v-8b96a431><h3 class="card-title" data-v-8b96a431>Sales by Channel</h3><p class="card-subtitle" data-v-8b96a431>Successful sales breakdown by communication channel</p></div></div></header>', 1)),
      o.loading ? (m(), x("div", Gb, [...v[0] || (v[0] = [
        st('<div class="loading-container" data-v-8b96a431><div class="chart-bars-loader" data-v-8b96a431><div class="bar bar-1" data-v-8b96a431></div><div class="bar bar-2" data-v-8b96a431></div><div class="bar bar-3" data-v-8b96a431></div><div class="bar bar-4" data-v-8b96a431></div><div class="bar bar-5" data-v-8b96a431></div></div><p class="loading-text" data-v-8b96a431>Loading sales data...</p></div>', 1)
      ])])) : (m(), x("div", Zb, [
        h.value.labels.length > 0 ? (m(), x("section", Qb, [
          l("div", Jb, [
            Q(ie, {
              data: h.value,
              stacked: !0
            }, null, 8, ["data"])
          ]),
          e.enableExport ? (m(), dt(T(xt), {
            key: 0,
            onExport: r,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (m(), x("section", tm, [...v[1] || (v[1] = [
          st('<div class="empty-state-content" data-v-8b96a431><div class="empty-icon-wrapper" data-v-8b96a431><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-8b96a431><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-8b96a431></path></svg></div><p class="empty-title" data-v-8b96a431>No sales data available</p><p class="empty-description" data-v-8b96a431>No sales by channel data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])])),
        e.channelComparison.length > 0 ? (m(), x("section", em, [
          l("div", am, [
            (m(!0), x(q, null, tt(e.channelComparison, (f) => (m(), x("div", {
              key: f.channel,
              class: "comparison-card"
            }, [
              l("div", {
                class: "comparison-color-bar",
                style: bt({ backgroundColor: u(f.channel, e.channelComparison.indexOf(f)) })
              }, null, 4),
              l("div", sm, [
                l("span", nm, $(f.channel), 1),
                l("span", om, $(T(X)(f.current)), 1),
                f.delta !== null ? (m(), x("div", im, [
                  l("span", {
                    class: K(["delta-badge", f.delta > 0 ? "delta-up" : f.delta < 0 ? "delta-down" : "delta-neutral"])
                  }, [
                    f.delta > 0 ? (m(), x("svg", rm, [...v[2] || (v[2] = [
                      l("path", {
                        "fill-rule": "evenodd",
                        d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
                        "clip-rule": "evenodd"
                      }, null, -1)
                    ])])) : f.delta < 0 ? (m(), x("svg", lm, [...v[3] || (v[3] = [
                      l("path", {
                        "fill-rule": "evenodd",
                        d: "M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z",
                        "clip-rule": "evenodd"
                      }, null, -1)
                    ])])) : E("", !0),
                    kt(" " + $(Math.abs(f.delta).toFixed(1)) + "% ", 1)
                  ], 2),
                  l("span", cm, "vs prev. period (" + $(T(X)(f.previous)) + ")", 1)
                ])) : (m(), x("div", dm, [...v[4] || (v[4] = [
                  l("span", { class: "delta-label" }, "No previous data", -1)
                ])]))
              ])
            ]))), 128))
          ])
        ])) : E("", !0)
      ]))
    ]));
  }
}), hm = /* @__PURE__ */ nt(um, [["__scopeId", "data-v-8b96a431"]]), fm = { class: "seller-metrics-card" }, gm = { class: "card-header" }, pm = { class: "header-content" }, vm = { class: "header-badges" }, bm = {
  key: 0,
  class: "payment-success-badge"
}, mm = {
  key: 0,
  class: "currency-breakdown-list"
}, ym = {
  key: 1,
  class: "badge-value"
}, _m = {
  key: 1,
  class: "payment-warning-badge"
}, xm = { class: "currency-breakdown-list" }, km = {
  key: 2,
  class: "payment-warning-badge"
}, wm = { class: "currency-breakdown-list" }, $m = {
  key: 0,
  class: "loading-state"
}, Mm = {
  key: 1,
  class: "card-body"
}, Sm = {
  key: 0,
  class: "chart-section"
}, Cm = { class: "chart-wrapper" }, Dm = {
  key: 1,
  class: "empty-state"
}, Am = {
  key: 2,
  class: "table-section"
}, Tm = { class: "table-wrapper" }, Bm = { class: "data-table" }, Lm = { class: "table-body" }, Fm = { class: "table-cell font-medium" }, Pm = { class: "table-cell text-center" }, Im = { class: "table-cell text-center" }, Rm = { class: "table-cell text-center" }, Em = { class: "table-cell text-center" }, Om = { class: "table-cell text-center" }, Vm = { class: "table-cell text-center warning-value" }, zm = {
  key: 0,
  class: "currency-cell-list"
}, Nm = {
  key: 1,
  class: "empty-cell"
}, Wm = { class: "table-cell text-center" }, Hm = { class: "table-cell text-center warning-value" }, jm = {
  key: 0,
  class: "currency-cell-list"
}, Ym = {
  key: 1,
  class: "empty-cell"
}, Km = { class: "table-cell text-center" }, Um = { class: "table-cell text-center success-value" }, qm = {
  key: 0,
  class: "currency-cell-list"
}, Xm = { key: 1 }, Gm = { class: "table-cell text-left" }, Zm = {
  key: 0,
  class: "failed-reasons"
}, Qm = { class: "reason-name" }, Jm = { class: "reason-count" }, t1 = {
  key: 1,
  class: "empty-cell"
}, ys = 3, e1 = /* @__PURE__ */ J({
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
    }, { isDark: i } = ct(lt(s, "theme")), r = at(!1), c = S(() => {
      if (!s.sellerData?.seller_by_day) return [];
      const D = [...s.sellerData.seller_by_day];
      return s.failedData?.failed_by_reason_by_day && s.failedData.failed_by_reason_by_day.forEach((A) => {
        const B = D.findIndex((L) => L.date === A.date);
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
    }), d = S(() => r.value ? c.value : c.value.slice(0, ys)), u = S(() => c.value.length > ys), h = S(() => s.sellerData), p = S(() => s.failedData), v = S(
      () => Array.isArray(s.sellerData.total_value_sell_success) ? s.sellerData.total_value_sell_success : []
    ), f = S(
      () => Array.isArray(s.sellerData.total_value_sell_bank_transfer) ? s.sellerData.total_value_sell_bank_transfer : []
    ), _ = S(
      () => Array.isArray(s.sellerData.total_value_sell_cash_option) ? s.sellerData.total_value_sell_cash_option : []
    ), b = S(() => {
      const {
        total_seller_conversations: D = 0,
        total_sell_started: A = 0,
        total_sell_booking_created: B = 0,
        total_sell_success: L = 0,
        total_sell_bank_transfer: F = 0,
        total_sell_cash_option: O = 0
      } = h.value, { failed_by_reason_by_day: W = [] } = p.value;
      if (D === 0) return { nodes: [], links: [] };
      const P = [
        { name: "Sell Initiated", value: D },
        { name: "Sell Started", value: A },
        { name: "Booking Created", value: B },
        { name: "Sell Success", value: L }
      ], I = [], V = D - A;
      if (V > 0) {
        const N = Math.round(V / D * 100);
        P.push({ name: "Abandoned (Init)", value: V }), I.push({
          source: "Sell Initiated",
          target: "Abandoned (Init)",
          value: V,
          label: `${V.toLocaleString()} (${N}%)`
        });
      }
      if (A > 0) {
        const N = Math.round(A / D * 100);
        I.push({
          source: "Sell Initiated",
          target: "Sell Started",
          value: A,
          label: `${A.toLocaleString()} (${N}%)`
        });
      }
      const H = W.reduce((N, et) => (et.reasons && Array.isArray(et.reasons) && et.reasons.forEach((G) => {
        const U = G.reason, ot = G.failed_count;
        N[U] = (N[U] || 0) + ot;
      }), N), {});
      if (B > 0) {
        const N = Math.round(B / D * 100);
        I.push({
          source: "Sell Started",
          target: "Booking Created",
          value: B,
          label: `${B.toLocaleString()} (${N}%)`
        });
      }
      if (F > 0) {
        const N = Math.round(F / D * 100);
        P.push({ name: "Bank Transfer", value: F }), I.push({
          source: "Booking Created",
          target: "Bank Transfer",
          value: F,
          label: `${F.toLocaleString()} (${N}%)`
        });
      }
      if (O > 0) {
        const N = Math.round(O / D * 100);
        P.push({ name: "Cash Option", value: O }), I.push({
          source: "Booking Created",
          target: "Cash Option",
          value: O,
          label: `${O.toLocaleString()} (${N}%)`
        });
      }
      if (L > 0) {
        const N = Math.round(L / D * 100);
        I.push({
          source: "Booking Created",
          target: "Sell Success",
          value: L,
          label: `${L.toLocaleString()} (${N}%)`
        });
      }
      const Y = B - L - F - O;
      if (Y > 0) {
        const N = Math.round(Y / D * 100);
        P.push({ name: "Failed at Completion", value: Y }), I.push({
          source: "Booking Created",
          target: "Failed at Completion",
          value: Y,
          label: `${Y.toLocaleString()} (${N}%)`
        });
      }
      const j = A - B;
      if (j > 0) {
        const N = Math.round(j / D * 100);
        P.push({ name: "Failed at Booking", value: j }), I.push({
          source: "Sell Started",
          target: "Failed at Booking",
          value: j,
          label: `${j.toLocaleString()} (${N}%)`
        });
      }
      if (Object.keys(H).length > 0) {
        const N = Object.values(H).reduce((G, U) => G + U, 0), et = j - N;
        if (Object.entries(H).filter(([, G]) => G > 0).sort(([, G], [, U]) => U - G).forEach(([G, U]) => {
          const ot = Math.round(U / D * 100);
          P.push({ name: `Failed: ${G}`, value: U }), I.push({
            source: "Failed at Booking",
            target: `Failed: ${G}`,
            value: U,
            label: `${U.toLocaleString()} (${ot}%)`
          });
        }), et > 0) {
          const G = Math.round(et / D * 100);
          P.push({ name: "Failed: Without Reason", value: et }), I.push({
            source: "Failed at Booking",
            target: "Failed: Without Reason",
            value: et,
            label: `${et.toLocaleString()} (${G}%)`
          });
        }
      }
      return { nodes: P, links: I };
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
    }, y = S(() => g), w = (D, A) => !A || A === 0 ? "0%" : `${Math.round(D / A * 100)}%`, k = (D, A) => {
      const B = X(D), L = w(D, A);
      return `${B} (${L})`;
    }, M = (D) => D == null ? 0 : typeof D == "number" ? D : Array.isArray(D) ? D.reduce((A, B) => A + (B.total_value || 0), 0) : 0, C = (D) => fe(M(D));
    return t({ isDark: i }), (D, A) => (m(), x("article", fm, [
      l("header", gm, [
        l("div", pm, [
          A[4] || (A[4] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "Seller Metrics"),
            l("p", { class: "card-subtitle" }, "Sales performance and failure analysis")
          ], -1)),
          l("div", vm, [
            s.loading ? E("", !0) : (m(), x("div", bm, [
              A[1] || (A[1] = l("p", { class: "badge-label" }, "Total Sales Value", -1)),
              v.value.length > 0 ? (m(), x("div", mm, [
                (m(!0), x(q, null, tt(v.value, (B) => (m(), x("p", {
                  key: B.currency,
                  class: "currency-breakdown-item"
                }, $(B.currency) + " " + $(T(fe)(B.total_value)), 1))), 128))
              ])) : (m(), x("p", ym, $(C(s.sellerData.total_value_sell_success)), 1))
            ])),
            !s.loading && f.value.length > 0 ? (m(), x("div", _m, [
              A[2] || (A[2] = l("p", { class: "badge-label-warning" }, "Bank Transfer Value", -1)),
              l("div", xm, [
                (m(!0), x(q, null, tt(f.value, (B) => (m(), x("p", {
                  key: "bt-" + B.currency,
                  class: "currency-breakdown-item-warning"
                }, $(B.currency) + " " + $(T(fe)(B.total_value)), 1))), 128))
              ])
            ])) : E("", !0),
            !s.loading && _.value.length > 0 ? (m(), x("div", km, [
              A[3] || (A[3] = l("p", { class: "badge-label-warning" }, "Cash Option Value", -1)),
              l("div", wm, [
                (m(!0), x(q, null, tt(_.value, (B) => (m(), x("p", {
                  key: "co-" + B.currency,
                  class: "currency-breakdown-item-warning"
                }, $(B.currency) + " " + $(T(fe)(B.total_value)), 1))), 128))
              ])
            ])) : E("", !0)
          ])
        ])
      ]),
      s.loading ? (m(), x("div", $m, [...A[5] || (A[5] = [
        st('<div class="loading-container" data-v-301db2b6><div class="chart-flow-loader" data-v-301db2b6><div class="flow-line flow-1" data-v-301db2b6></div><div class="flow-line flow-2" data-v-301db2b6></div><div class="flow-line flow-3" data-v-301db2b6></div><div class="flow-line flow-4" data-v-301db2b6></div><div class="flow-line flow-5" data-v-301db2b6></div></div><p class="loading-text" data-v-301db2b6>Loading sales data...</p></div>', 1)
      ])])) : (m(), x("div", Mm, [
        b.value.nodes.length > 0 ? (m(), x("section", Sm, [
          l("div", Cm, [
            Q(_e, {
              data: b.value,
              "node-colors": y.value,
              title: "",
              height: "320px"
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : (m(), x("section", Dm, [...A[6] || (A[6] = [
          st('<div class="empty-state-content" data-v-301db2b6><div class="empty-icon-wrapper" data-v-301db2b6><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-301db2b6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-301db2b6></path></svg></div><p class="empty-title" data-v-301db2b6>No sales data available</p><p class="empty-description" data-v-301db2b6>No sales data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])])),
        c.value && c.value.length > 0 ? (m(), x("section", Am, [
          l("div", Tm, [
            l("table", Bm, [
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
              l("tbody", Lm, [
                (m(!0), x(q, null, tt(d.value, (B) => (m(), x("tr", {
                  key: B.date,
                  class: "table-row"
                }, [
                  l("td", Fm, $(T(At)(B.date).format("DD/MM/YYYY")), 1),
                  l("td", Pm, $(T(X)(B.seller_conversations || 0)), 1),
                  l("td", Im, $(k(B.sell_started_count, B.seller_conversations || B.sell_started_count)), 1),
                  l("td", Rm, $(k(B.sell_get_quote_count, B.seller_conversations || B.sell_started_count)), 1),
                  l("td", Em, $(k(B.sell_booking_created_count, B.seller_conversations || B.sell_started_count)), 1),
                  l("td", Om, $(T(X)(B.sell_bank_transfer_count || 0)), 1),
                  l("td", Vm, [
                    Array.isArray(B.daily_value_sell_bank_transfer) && B.daily_value_sell_bank_transfer.length > 0 ? (m(), x("div", zm, [
                      (m(!0), x(q, null, tt(B.daily_value_sell_bank_transfer, (L) => (m(), x("span", {
                        key: `${B.date}-bt-${L.currency}`
                      }, $(L.currency) + " " + $(T(fe)(L.total_value)), 1))), 128))
                    ])) : (m(), x("span", Nm, "-"))
                  ]),
                  l("td", Wm, $(T(X)(B.sell_cash_option_count || 0)), 1),
                  l("td", Hm, [
                    Array.isArray(B.daily_value_sell_cash_option) && B.daily_value_sell_cash_option.length > 0 ? (m(), x("div", jm, [
                      (m(!0), x(q, null, tt(B.daily_value_sell_cash_option, (L) => (m(), x("span", {
                        key: `${B.date}-co-${L.currency}`
                      }, $(L.currency) + " " + $(T(fe)(L.total_value)), 1))), 128))
                    ])) : (m(), x("span", Ym, "-"))
                  ]),
                  l("td", Km, $(k(B.sell_success_count, B.seller_conversations || B.sell_started_count)), 1),
                  l("td", Um, [
                    Array.isArray(B.daily_value_sell_success) && B.daily_value_sell_success.length > 0 ? (m(), x("div", qm, [
                      (m(!0), x(q, null, tt(B.daily_value_sell_success, (L) => (m(), x("span", {
                        key: `${B.date}-${L.currency}`
                      }, $(L.currency) + " " + $(T(fe)(L.total_value)), 1))), 128))
                    ])) : (m(), x("span", Xm, $(C(B.daily_value_sell_success)), 1))
                  ]),
                  l("td", Gm, [
                    B.reasons && B.reasons.length > 0 ? (m(), x("div", Zm, [
                      (m(!0), x(q, null, tt(B.reasons, (L) => (m(), x("div", {
                        key: L.reason,
                        class: "failed-reason-item"
                      }, [
                        l("span", Qm, $(L.reason) + ":", 1),
                        l("span", Jm, $(L.failed_count), 1)
                      ]))), 128))
                    ])) : (m(), x("div", t1, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          u.value ? (m(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: A[0] || (A[0] = (B) => r.value = !r.value)
          }, [
            kt($(r.value ? "View less" : `View more (${c.value.length - ys} more rows)`) + " ", 1),
            (m(), x("svg", {
              class: K(["view-more-icon", { "view-more-icon-rotated": r.value }]),
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
          e.enableExport ? (m(), dt(T(xt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : E("", !0)
      ]))
    ]));
  }
}), a1 = /* @__PURE__ */ nt(e1, [["__scopeId", "data-v-301db2b6"]]), s1 = { class: "top-agents-card" }, n1 = {
  key: 0,
  class: "card-body"
}, o1 = {
  key: 0,
  class: "chart-section"
}, i1 = {
  key: 1,
  class: "empty-state"
}, r1 = { class: "empty-state-content" }, l1 = { class: "empty-icon-wrapper" }, c1 = {
  key: 1,
  class: "loading-state"
}, d1 = /* @__PURE__ */ J({
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
    }, { isDark: r, colors: c } = ct(lt(n, "theme")), d = S(() => {
      const p = (n.data?.top_agents || []).filter(
        (b) => b.agent_type?.toLowerCase() !== "triage"
      );
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const v = p.reduce(
        (b, g) => b + (Number(g.conversations) || 0),
        0
      ), f = p.map((b) => {
        const g = b.agent_type?.toLowerCase();
        return s[g] || "#94a3b8";
      }), _ = f.map((b) => `${b}80`);
      return {
        labels: p.map((b) => {
          const g = Number(b.conversations) || 0, y = v ? g / v * 100 : 0;
          return `${b.agent_type} - ${g.toLocaleString()} (${y.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: p.map((b) => b.conversations),
            backgroundColor: _,
            borderColor: f,
            borderWidth: 2
          }
        ]
      };
    }), u = S(() => n.options ? n.options : {
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
                (b, g) => b + (Number(g) || 0),
                0
              ), _ = f ? v / f * 100 : 0;
              return `${p}: ${v.toLocaleString()} (${_.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: r }), (h, p) => (m(), x("article", s1, [
      p[3] || (p[3] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Top Agents"),
          l("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (m(), x("div", c1, [...p[2] || (p[2] = [
        st('<div class="loading-container" data-v-501bf4c4><div class="chart-lines-loader" data-v-501bf4c4><div class="line line-1" data-v-501bf4c4></div><div class="line line-2" data-v-501bf4c4></div><div class="line line-3" data-v-501bf4c4></div><div class="line line-4" data-v-501bf4c4></div><div class="line line-5" data-v-501bf4c4></div></div><p class="loading-text" data-v-501bf4c4>Loading chart data...</p></div>', 1)
      ])])) : (m(), x("div", n1, [
        d.value.labels && d.value.labels.length ? (m(), x("section", o1, [
          Q(Qa, {
            data: d.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (m(), dt(T(xt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (m(), x("section", i1, [
          l("div", r1, [
            l("div", l1, [
              Q(T(Ig), { class: "empty-icon" })
            ]),
            p[0] || (p[0] = l("p", { class: "empty-title" }, "No top agents data", -1)),
            p[1] || (p[1] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), u1 = /* @__PURE__ */ nt(d1, [["__scopeId", "data-v-501bf4c4"]]), h1 = { class: "payment-method-card" }, f1 = { class: "card-header" }, g1 = { class: "header-content" }, p1 = {
  key: 0,
  class: "stats-badge"
}, v1 = {
  key: 0,
  class: "currency-breakdown-list"
}, b1 = {
  key: 1,
  class: "badge-value"
}, m1 = {
  key: 0,
  class: "loading-state"
}, y1 = {
  key: 1,
  class: "card-body"
}, _1 = {
  key: 0,
  class: "payment-methods-section"
}, x1 = { class: "payment-methods-grid" }, k1 = { class: "payment-card-content" }, w1 = { class: "payment-card-header" }, $1 = {
  key: 0,
  class: "currency-cell-list"
}, M1 = { class: "payment-badge-wrapper" }, S1 = {
  key: 1,
  class: "empty-state"
}, C1 = { class: "empty-state-content" }, D1 = { class: "empty-icon-wrapper" }, A1 = {
  key: 2,
  class: "table-section"
}, T1 = { class: "table-wrapper" }, B1 = { class: "data-table" }, L1 = { class: "table-body" }, F1 = { class: "table-cell font-medium" }, P1 = { class: "table-cell text-center" }, I1 = { class: "table-cell text-center success-value" }, R1 = {
  key: 0,
  class: "currency-cell-list"
}, E1 = { key: 1 }, O1 = { class: "table-cell" }, V1 = { class: "payment-tags" }, z1 = { class: "tag-name" }, N1 = {
  key: 0,
  class: "tag-amount"
}, W1 = {
  key: 1,
  class: "tag-amount"
}, H1 = { class: "tag-count" }, j1 = {
  key: 3,
  class: "empty-table-state"
}, Y1 = "Not Registered", _s = 3, K1 = /* @__PURE__ */ J({
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
    }), c = S(() => r.value.payment_method_breakdown && r.value.payment_method_breakdown.length > 0), d = S(() => r.value.payment_method_by_day && r.value.payment_method_by_day.length > 0), u = at(!1), h = S(() => !r.value.payment_method_by_day || r.value.payment_method_by_day.length === 0 ? [] : [...r.value.payment_method_by_day].sort((P, I) => At(P.date).valueOf() - At(I.date).valueOf())), p = S(() => u.value ? h.value : h.value.slice(0, _s)), v = S(() => h.value.length > _s), f = (P) => {
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
      const I = (P.payment_method_breakdown || []).map((H) => ({
        payment_method: H.payment_method || "Unknown",
        total_amount: H.total_amount ?? 0,
        count: H.count ?? 0,
        total_amount_by_currency: H.total_amount_by_currency ?? []
      })), V = (P.payment_method_by_day || []).map((H) => ({
        date: H.date || "",
        total_count: H.total_count ?? 0,
        total_amount: H.total_amount ?? 0,
        total_amount_by_currency: H.total_amount_by_currency ?? [],
        payment_methods: (H.payment_methods || []).map((Y) => ({
          payment_method: Y.payment_method || "Unknown",
          total_amount: Y.total_amount ?? 0,
          count: Y.count ?? 0,
          total_amount_by_currency: Y.total_amount_by_currency ?? []
        }))
      }));
      return {
        airline_name: P.airline_name || s.airlineName,
        start_date: P.start_date || "",
        end_date: P.end_date || "",
        total_conversations: P.total_conversations ?? 0,
        total_amount: P.total_amount ?? 0,
        total_amount_by_currency: P.total_amount_by_currency ?? [],
        payment_method_breakdown: I,
        payment_method_by_day: V
      };
    }, _ = async () => {
      if (!(!s.fetchFunction || !s.dates || s.dates.length < 2 || !s.airlineName)) {
        i.value = !0;
        try {
          const [P, I] = s.dates.map((H) => At(H).format("YYYY-MM-DD")), V = await s.fetchFunction(s.airlineName, P, I);
          r.value = f(V);
        } catch (P) {
          console.error("Error fetching payment method metrics:", P), r.value = f(null);
        } finally {
          i.value = !1;
        }
      }
    }, b = [
      { bg: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)", border: "#a7f3d0", text: "#047857", value: "#065f46", icon: "#10b981", badge: "#059669" },
      { bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)", border: "#93c5fd", text: "#1d4ed8", value: "#1e40af", icon: "#3b82f6", badge: "#2563eb" },
      { bg: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)", border: "#d8b4fe", text: "#7c3aed", value: "#6d28d9", icon: "#8b5cf6", badge: "#7c3aed" },
      { bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)", border: "#fcd34d", text: "#b45309", value: "#92400e", icon: "#f59e0b", badge: "#d97706" },
      { bg: "linear-gradient(135deg, #fff1f2 0%, #fce7f3 100%)", border: "#fda4af", text: "#be123c", value: "#9f1239", icon: "#f43f5e", badge: "#e11d48" },
      { bg: "linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)", border: "#67e8f9", text: "#0e7490", value: "#155e75", icon: "#06b6d4", badge: "#0891b2" }
    ], g = (P) => {
      const I = b[P % b.length];
      return {
        background: I.bg,
        borderColor: I.border
      };
    }, y = (P) => ({ color: b[P % b.length].text }), w = (P) => ({ color: b[P % b.length].value }), k = (P) => ({ color: b[P % b.length].icon }), M = (P) => ({ color: b[P % b.length].badge }), C = (P) => {
      const V = B(P).length;
      return V > 18 ? { fontSize: "0.75rem" } : V > 15 ? { fontSize: "0.875rem" } : V > 12 ? { fontSize: "1rem" } : { fontSize: "1.125rem" };
    }, D = (P) => {
      const I = P?.toLowerCase() || "";
      return !P || I === "unknown" ? Ng : I.includes("credit") || I.includes("debit") ? Co : I.includes("cash") || I.includes("efectivo") ? Fg : I.includes("bank") || I.includes("transfer") ? Pg : I.includes("zelle") || I.includes("pago") || I.includes("movil") ? zg : I.includes("wallet") ? Wg : Vg;
    }, A = (P) => !P || P.toLowerCase() === "unknown" ? Y1 : P.replace(/_/g, " "), B = (P) => P == null ? "$0.00" : vt(P), L = (P) => P ? At(P).format("DD/MM/YYYY") : "-", F = (P) => P == null || Number.isNaN(Number(P)) ? 0 : Number(P), O = (P) => {
      n("export", P);
    };
    function W() {
      const P = s.data;
      P && (Array.isArray(P.payment_method_breakdown) && P.payment_method_breakdown.length > 0 || Array.isArray(P.payment_method_by_day) && P.payment_method_by_day.length > 0) && (i.value = !1, r.value = f(P));
    }
    return re(() => {
      s.data ? W() : _();
    }), Rt(
      () => s.data,
      (P) => {
        P && W();
      },
      { deep: !0 }
    ), Rt(
      () => s.dates,
      (P) => {
        s.data || P && P[0] && P[1] && _();
      },
      { deep: !0 }
    ), t({ isDark: o }), (P, I) => (m(), x("article", h1, [
      l("header", f1, [
        l("div", g1, [
          I[2] || (I[2] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "Payment Method Metrics"),
            l("p", { class: "card-subtitle" }, "Sales breakdown by payment method")
          ], -1)),
          !i.value && r.value.total_amount ? (m(), x("div", p1, [
            I[1] || (I[1] = l("p", { class: "badge-label" }, "Total Amount", -1)),
            r.value.total_amount_by_currency && r.value.total_amount_by_currency.length > 0 ? (m(), x("div", v1, [
              (m(!0), x(q, null, tt(r.value.total_amount_by_currency, (V) => (m(), x("p", {
                key: V.currency,
                class: "currency-breakdown-item"
              }, $(V.currency) + " " + $(B(V.total_value)), 1))), 128))
            ])) : (m(), x("p", b1, $(B(r.value.total_amount)), 1))
          ])) : E("", !0)
        ])
      ]),
      i.value ? (m(), x("div", m1, [...I[3] || (I[3] = [
        st('<div class="loading-container" data-v-ff4ce0b7><div class="chart-lines-loader" data-v-ff4ce0b7><div class="line line-1" data-v-ff4ce0b7></div><div class="line line-2" data-v-ff4ce0b7></div><div class="line line-3" data-v-ff4ce0b7></div><div class="line line-4" data-v-ff4ce0b7></div><div class="line line-5" data-v-ff4ce0b7></div></div><p class="loading-text" data-v-ff4ce0b7>Loading payment data...</p></div>', 1)
      ])])) : (m(), x("div", y1, [
        c.value ? (m(), x("section", _1, [
          I[4] || (I[4] = l("p", { class: "section-label" }, "Sales by Payment Method", -1)),
          l("div", x1, [
            (m(!0), x(q, null, tt(r.value.payment_method_breakdown, (V, H) => (m(), x("div", {
              key: V.payment_method,
              class: "payment-method-card-item",
              style: bt(g(H))
            }, [
              l("div", k1, [
                l("div", w1, [
                  (m(), dt(ca(D(V.payment_method)), {
                    class: "payment-icon",
                    style: bt(k(H))
                  }, null, 8, ["style"])),
                  l("span", {
                    class: "payment-name",
                    style: bt(y(H))
                  }, $(A(V.payment_method)), 5)
                ]),
                l("p", {
                  class: "payment-amount",
                  style: bt([w(H), C(V.total_amount)])
                }, $(B(V.total_amount)), 5),
                V.total_amount_by_currency && V.total_amount_by_currency.length > 0 ? (m(), x("div", $1, [
                  (m(!0), x(q, null, tt(V.total_amount_by_currency, (Y) => (m(), x("span", {
                    key: `${V.payment_method}-${Y.currency}`
                  }, $(Y.currency) + " " + $(B(Y.total_value)), 1))), 128))
                ])) : E("", !0),
                l("div", M1, [
                  l("span", {
                    class: "payment-badge",
                    style: bt(M(H))
                  }, $(F(V.count)) + " " + $(F(V.count) === 1 ? "sale" : "sales"), 5)
                ])
              ])
            ], 4))), 128))
          ])
        ])) : (m(), x("section", S1, [
          l("div", C1, [
            l("div", D1, [
              Q(T(Co), { class: "empty-icon" })
            ]),
            I[5] || (I[5] = l("p", { class: "empty-title" }, "No payment data available", -1)),
            I[6] || (I[6] = l("p", { class: "empty-description" }, "No payment method data found for the selected period. Try adjusting the date range.", -1))
          ])
        ])),
        d.value ? (m(), x("section", A1, [
          I[10] || (I[10] = l("p", { class: "section-label" }, "Daily Breakdown", -1)),
          l("div", T1, [
            l("table", B1, [
              I[8] || (I[8] = l("thead", null, [
                l("tr", { class: "table-header-row" }, [
                  l("th", { class: "table-header text-left" }, "Date"),
                  l("th", { class: "table-header text-center" }, "Total Sales"),
                  l("th", { class: "table-header text-center" }, "Total Amount"),
                  l("th", { class: "table-header text-left" }, "Payment Methods")
                ])
              ], -1)),
              l("tbody", L1, [
                (m(!0), x(q, null, tt(p.value, (V) => (m(), x("tr", {
                  key: V.date,
                  class: "table-row"
                }, [
                  l("td", F1, $(L(V.date)), 1),
                  l("td", P1, $(T(X)(V.total_count ?? 0)), 1),
                  l("td", I1, [
                    V.total_amount_by_currency && V.total_amount_by_currency.length > 0 ? (m(), x("div", R1, [
                      (m(!0), x(q, null, tt(V.total_amount_by_currency, (H) => (m(), x("span", {
                        key: `${V.date}-${H.currency}`
                      }, $(H.currency) + " " + $(B(H.total_value)), 1))), 128))
                    ])) : (m(), x("span", E1, $(B(V.total_amount)), 1))
                  ]),
                  l("td", O1, [
                    l("div", V1, [
                      (m(!0), x(q, null, tt(V.payment_methods || [], (H) => (m(), x("div", {
                        key: H.payment_method,
                        class: "payment-tag"
                      }, [
                        l("span", z1, $(A(H.payment_method)), 1),
                        I[7] || (I[7] = l("span", { class: "tag-separator" }, "•", -1)),
                        !H.total_amount_by_currency || H.total_amount_by_currency.length === 0 ? (m(), x("span", N1, $(B(H.total_amount)), 1)) : (m(), x("span", W1, $(H.total_amount_by_currency.map((Y) => `${Y.currency} ${B(Y.total_value)}`).join(" / ")), 1)),
                        l("span", H1, "(" + $(F(H.count)) + ")", 1)
                      ]))), 128))
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          v.value ? (m(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: I[0] || (I[0] = (V) => u.value = !u.value)
          }, [
            kt($(u.value ? "View less" : `View more (${h.value.length - _s} more rows)`) + " ", 1),
            (m(), x("svg", {
              class: K(["view-more-icon", { "view-more-icon-rotated": u.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...I[9] || (I[9] = [
              l("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : E("", !0),
          e.enableExport ? (m(), dt(T(xt), {
            key: 1,
            onExport: O,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : c.value ? (m(), x("div", j1, [...I[11] || (I[11] = [
          l("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
        ])])) : E("", !0)
      ]))
    ]));
  }
}), U1 = /* @__PURE__ */ nt(K1, [["__scopeId", "data-v-ff4ce0b7"]]), q1 = { class: "agent-human-conv-card" }, X1 = {
  key: 0,
  class: "loading-state"
}, G1 = {
  key: 1,
  class: "card-body"
}, Z1 = { class: "summary-cards" }, Q1 = { class: "summary-card assigned-card" }, J1 = { class: "summary-card-content" }, ty = { class: "card-content" }, ey = { class: "card-value assigned-value" }, ay = { class: "card-content" }, sy = { class: "card-value assigned-value" }, ny = { class: "summary-card closed-card" }, oy = { class: "summary-card-content" }, iy = { class: "card-content" }, ry = { class: "card-value closed-value" }, ly = { class: "card-content" }, cy = { class: "card-value closed-value" }, dy = {
  key: 0,
  class: "agents-section"
}, uy = { class: "date-header" }, hy = { class: "date-title" }, fy = { class: "date-stats" }, gy = { class: "stat-item assigned-stat" }, py = { class: "stat-value" }, vy = { class: "stat-value" }, by = { class: "stat-item closed-stat" }, my = { class: "stat-value" }, yy = { class: "stat-value" }, _y = { class: "table-wrapper" }, xy = { class: "data-table" }, ky = { class: "table-body" }, wy = { class: "table-cell name-cell" }, $y = { class: "table-cell email-cell" }, My = { class: "table-cell text-center" }, Sy = { class: "metric-cell-content" }, Cy = { class: "badge assigned-badge" }, Dy = { class: "metric-cell-avg" }, Ay = { class: "table-cell text-center" }, Ty = { class: "metric-cell-content" }, By = { class: "badge closed-badge" }, Ly = { class: "metric-cell-avg" }, Fy = {
  key: 1,
  class: "empty-state"
}, Py = /* @__PURE__ */ J({
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
    const s = e, n = a, o = (b) => {
      n("export", b);
    }, { isDark: i } = ct(lt(s, "theme")), r = S(() => s.data?.agents_by_day && s.data.agents_by_day.length > 0), c = S(() => {
      if (!r.value) return {};
      const b = {};
      for (const w of s.data.agents_by_day)
        b[w.date] || (b[w.date] = []), b[w.date].push(w);
      const g = Object.keys(b).sort((w, k) => new Date(w).getTime() - new Date(k).getTime()), y = {};
      for (const w of g)
        y[w] = b[w];
      return y;
    }), d = (b) => b == null ? "0" : X(b), u = (b) => {
      if (b == null)
        return "AVG";
      if (b < 60)
        return `${Math.round(b)}s`;
      const g = Math.round(b), y = Math.floor(g / 60), w = g % 60;
      if (y < 60)
        return `${y}m ${w}s`;
      const k = Math.floor(y / 60), M = y % 60;
      return `${k}h ${M}m`;
    }, h = (b) => {
      const g = new Date(b), y = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return g.toLocaleDateString("en-US", y);
    }, p = (b) => b[0]?.day_total_assigned ?? 0, v = (b) => b[0]?.day_total_closed ?? 0, f = (b) => b[0]?.day_avg_time_to_assign_seconds ?? null, _ = (b) => b[0]?.day_avg_conversation_duration_seconds ?? null;
    return t({ isDark: i }), (b, g) => (m(), x("article", q1, [
      g[11] || (g[11] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Agent Human Conversations"),
          l("p", { class: "card-subtitle" }, "Human conversation assignments and closures by agent")
        ])
      ], -1)),
      e.loading ? (m(), x("div", X1, [...g[0] || (g[0] = [
        st('<div class="loading-container" data-v-6cfba83b><div class="chart-bars-loader" data-v-6cfba83b><div class="bar bar-1" data-v-6cfba83b></div><div class="bar bar-2" data-v-6cfba83b></div><div class="bar bar-3" data-v-6cfba83b></div><div class="bar bar-4" data-v-6cfba83b></div><div class="bar bar-5" data-v-6cfba83b></div></div><p class="loading-text" data-v-6cfba83b>Loading agent data...</p></div>', 1)
      ])])) : (m(), x("div", G1, [
        l("div", Z1, [
          l("div", Q1, [
            g[3] || (g[3] = l("div", { class: "card-decoration" }, null, -1)),
            l("div", J1, [
              l("div", ty, [
                g[1] || (g[1] = l("p", { class: "card-label" }, "Total Assigned", -1)),
                l("p", ey, $(d(e.data.total_assigned)), 1)
              ]),
              l("div", ay, [
                g[2] || (g[2] = l("p", { class: "card-label" }, "AVG time to assign", -1)),
                l("p", sy, $(u(e.data.avg_time_to_assign_seconds)), 1)
              ])
            ])
          ]),
          l("div", ny, [
            g[6] || (g[6] = l("div", { class: "card-decoration" }, null, -1)),
            l("div", oy, [
              l("div", iy, [
                g[4] || (g[4] = l("p", { class: "card-label" }, "Total Closed", -1)),
                l("p", ry, $(d(e.data.total_closed)), 1)
              ]),
              l("div", ly, [
                g[5] || (g[5] = l("p", { class: "card-label" }, "AVG time to close", -1)),
                l("p", cy, $(u(e.data.avg_conversation_duration_seconds)), 1)
              ])
            ])
          ])
        ]),
        r.value ? (m(), x("div", dy, [
          (m(!0), x(q, null, tt(c.value, (y, w) => (m(), x("div", {
            key: w,
            class: "date-group"
          }, [
            l("div", uy, [
              l("h4", hy, $(h(w)), 1),
              l("div", fy, [
                l("span", gy, [
                  l("span", py, $(d(p(y))), 1),
                  g[7] || (g[7] = kt(" Assigned ", -1)),
                  l("span", vy, $(u(f(y))), 1)
                ]),
                l("span", by, [
                  l("span", my, $(d(v(y))), 1),
                  g[8] || (g[8] = kt(" Closed ", -1)),
                  l("span", yy, $(u(_(y))), 1)
                ])
              ])
            ]),
            l("div", _y, [
              l("table", xy, [
                g[9] || (g[9] = l("thead", null, [
                  l("tr", { class: "table-header-row" }, [
                    l("th", { class: "table-header" }, "Agent Name"),
                    l("th", { class: "table-header" }, "Email"),
                    l("th", { class: "table-header" }, "Assigned (AVG time to assign)"),
                    l("th", { class: "table-header" }, "Closed (AVG time to close)")
                  ])
                ], -1)),
                l("tbody", ky, [
                  (m(!0), x(q, null, tt(y, (k) => (m(), x("tr", {
                    key: `${w}-${k.agent_email}`,
                    class: "table-row"
                  }, [
                    l("td", wy, $(k.agent_name || "-"), 1),
                    l("td", $y, $(k.agent_email), 1),
                    l("td", My, [
                      l("div", Sy, [
                        l("span", Cy, $(d(k.assigned_count)), 1),
                        l("span", Dy, $(u(k.avg_time_to_assign_seconds)), 1)
                      ])
                    ]),
                    l("td", Ay, [
                      l("div", Ty, [
                        l("span", By, $(d(k.closed_count)), 1),
                        l("span", Ly, $(u(k.avg_conversation_duration_seconds)), 1)
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ])
          ]))), 128)),
          e.enableExport ? (m(), dt(T(xt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (m(), x("div", Fy, [...g[10] || (g[10] = [
          st('<div class="empty-state-content" data-v-6cfba83b><div class="empty-icon-wrapper" data-v-6cfba83b><svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6cfba83b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-6cfba83b></path></svg></div><p class="empty-title" data-v-6cfba83b>No agent human conversation data available</p><p class="empty-description" data-v-6cfba83b>Try adjusting the date range or check your filters.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Iy = /* @__PURE__ */ nt(Py, [["__scopeId", "data-v-6cfba83b"]]), Ry = { class: "channel-metrics-card" }, Ey = {
  key: 0,
  class: "card-body"
}, Oy = {
  key: 0,
  class: "kpi-grid"
}, Vy = { class: "kpi-label" }, zy = { class: "kpi-value" }, Ny = { class: "kpi-card total-card" }, Wy = { class: "kpi-value" }, Hy = {
  key: 1,
  class: "chart-section"
}, jy = {
  key: 2,
  class: "empty-state"
}, Yy = {
  key: 1,
  class: "loading-state"
}, Ky = /* @__PURE__ */ J({
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
    const s = e, n = a, o = (p) => {
      n("export", p);
    }, { isDark: i, colors: r } = ct(lt(s, "theme")), c = at({ labels: [], datasets: [] }), d = S(() => s.data ?? {
      channels_by_day: {},
      total_by_channel: {},
      total_conversations: 0
    }), u = S(() => ({
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
    })), h = (p) => {
      if (!p || !p.channels_by_day) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const v = p.channels_by_day, f = Object.keys(v).sort();
      if (f.length === 0) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const _ = /* @__PURE__ */ new Set();
      for (const w of Object.values(v))
        for (const k of Object.keys(w))
          _.add(k);
      const b = Array.from(_), g = {
        wsp: "#25D366",
        // WhatsApp Green oficial
        whatsapp: "#25D366",
        // WhatsApp Green oficial
        voice: "#8b5cf6",
        // Purple-500
        sms: "#f59e0b",
        // Amber-500
        web_chat: "#06b6d4",
        // Cyan-500
        email: "#ec4899",
        // Pink-500
        messenger: "#0084ff",
        // Messenger Blue
        telegram: "#0088cc",
        // Telegram Blue
        instagram: "#E4405F"
        // Instagram Pink
      }, y = b.map((w) => {
        const k = w.toLowerCase(), M = g[k] || "#9ca3af";
        return {
          label: w.toUpperCase(),
          data: f.map((C) => v[C]?.[w] || 0),
          borderColor: M,
          backgroundColor: `${M}1A`,
          // 1A = 10% opacity
          borderWidth: 2,
          fill: !0,
          tension: 0.4,
          pointBackgroundColor: M,
          pointBorderColor: M,
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        };
      });
      c.value = {
        labels: f.map((w) => At(w).format("MMM DD")),
        datasets: y
      };
    };
    return Rt(
      () => s.data,
      (p) => {
        h(p ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: i }), (p, v) => (m(), x("article", Ry, [
      v[3] || (v[3] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Channel Metrics"),
          l("p", { class: "card-subtitle" }, "Communication channels performance")
        ])
      ], -1)),
      s.loading ? (m(), x("div", Yy, [...v[2] || (v[2] = [
        st('<div class="loading-container" data-v-82f175d2><div class="chart-bars-loader" data-v-82f175d2><div class="bar bar-1" data-v-82f175d2></div><div class="bar bar-2" data-v-82f175d2></div><div class="bar bar-3" data-v-82f175d2></div><div class="bar bar-4" data-v-82f175d2></div><div class="bar bar-5" data-v-82f175d2></div></div><p class="loading-text" data-v-82f175d2>Loading channel metrics...</p></div>', 1)
      ])])) : (m(), x("div", Ey, [
        Object.keys(d.value.total_by_channel).length ? (m(), x("div", Oy, [
          (m(!0), x(q, null, tt(Object.keys(d.value.total_by_channel), (f) => (m(), x("div", {
            class: "kpi-card",
            key: f
          }, [
            l("span", Vy, $(f.toUpperCase()), 1),
            l("span", zy, $(T(X)(d.value.total_by_channel[f])), 1)
          ]))), 128)),
          l("div", Ny, [
            v[0] || (v[0] = l("span", { class: "kpi-label" }, "Total Conversations", -1)),
            l("span", Wy, $(T(X)(d.value.total_conversations)), 1)
          ])
        ])) : E("", !0),
        c.value.labels && c.value.labels.length ? (m(), x("section", Hy, [
          Q(ye, {
            data: c.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (m(), dt(T(xt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (m(), x("section", jy, [...v[1] || (v[1] = [
          st('<div class="empty-state-content" data-v-82f175d2><div class="empty-icon-wrapper" data-v-82f175d2><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-82f175d2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-82f175d2></path></svg></div><p class="empty-title" data-v-82f175d2>No channel metrics data available</p><p class="empty-description" data-v-82f175d2>No channel data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Uy = /* @__PURE__ */ nt(Ky, [["__scopeId", "data-v-82f175d2"]]), qy = { class: "triage-combinations-card" }, Xy = { class: "card-header" }, Gy = { class: "total-badge" }, Zy = {
  key: 0,
  class: "card-body"
}, Qy = { class: "chart-container" }, Jy = { class: "table-container" }, t_ = { class: "table-row" }, e_ = { class: "table-row" }, a_ = { class: "table-cell text-center count-cell" }, s_ = { class: "table-cell text-center count-cell" }, n_ = { class: "table-cell text-center count-cell" }, o_ = { class: "table-cell text-center count-cell" }, i_ = { class: "table-cell text-center count-cell" }, r_ = {
  key: 1,
  class: "empty-state"
}, l_ = { class: "empty-state-content" }, c_ = { class: "empty-icon-wrapper" }, d_ = {
  key: 1,
  class: "loading-state"
}, u_ = /* @__PURE__ */ J({
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
    }, { isDark: i, colors: r } = ct(lt(s, "theme")), c = S(() => {
      const g = s.data?.combinations || {}, y = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [w, k] of Object.entries(g)) {
        const M = w.split("+").filter(Boolean);
        if (!M.includes("triage")) continue;
        const C = M.filter((D) => D !== "triage").length;
        C >= 4 ? y["4p"] += Number(k) || 0 : y[C] += Number(k) || 0;
      }
      return y;
    }), d = S(() => {
      const g = c.value;
      return g[0] + g[1] + g[2] + g[3] + g["4p"] || 0;
    }), u = S(() => Object.keys(s.data?.combinations || {}).length > 0), h = S(() => {
      const g = d.value;
      if (!g) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const y = c.value;
      return {
        pct0: y[0] / g * 100,
        pct1: y[1] / g * 100,
        pct2: y[2] / g * 100,
        pct3: y[3] / g * 100,
        pct4p: y["4p"] / g * 100
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
    }, v = (g) => g?.replace("80", "") || "#888888", f = S(() => ({
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
    })), _ = S(() => ({
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
    })), b = (g) => `${(Number(g) || 0).toFixed(0)}`;
    return t({ isDark: i }), (g, y) => (m(), x("article", qy, [
      l("header", Xy, [
        y[0] || (y[0] = l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Distribution of Number of Intents"),
          l("p", { class: "card-subtitle" }, "Analysis of intent combinations per conversation")
        ], -1)),
        l("span", Gy, " Total: " + $(d.value), 1)
      ]),
      e.loading ? (m(), x("div", d_, [...y[6] || (y[6] = [
        st('<div class="loading-container" data-v-cb93cda2><div class="chart-bars-loader" data-v-cb93cda2><div class="bar bar-1" data-v-cb93cda2></div><div class="bar bar-2" data-v-cb93cda2></div><div class="bar bar-3" data-v-cb93cda2></div><div class="bar bar-4" data-v-cb93cda2></div><div class="bar bar-5" data-v-cb93cda2></div></div><p class="loading-text" data-v-cb93cda2>Loading intent distribution...</p></div>', 1)
      ])])) : (m(), x("div", Zy, [
        u.value ? (m(), x(q, { key: 0 }, [
          l("div", Qy, [
            Q(ie, {
              data: f.value,
              options: _.value
            }, null, 8, ["data", "options"])
          ]),
          l("div", Jy, [
            y[3] || (y[3] = st('<div class="table-header" data-v-cb93cda2><div class="table-cell header-cell" data-v-cb93cda2>Number of intentions</div><div class="table-cell header-cell text-center" data-v-cb93cda2>0</div><div class="table-cell header-cell text-center" data-v-cb93cda2>1</div><div class="table-cell header-cell text-center" data-v-cb93cda2>2</div><div class="table-cell header-cell text-center" data-v-cb93cda2>3</div><div class="table-cell header-cell text-center" data-v-cb93cda2>4 or more</div></div>', 1)),
            l("div", t_, [
              y[1] || (y[1] = l("div", { class: "table-cell row-label" }, "% of total", -1)),
              l("div", {
                class: "table-cell text-center percentage-cell",
                style: bt({ color: v(p.c0) })
              }, $(b(h.value.pct0)) + "% ", 5),
              l("div", {
                class: "table-cell text-center percentage-cell",
                style: bt({ color: v(p.c1) })
              }, $(b(h.value.pct1)) + "% ", 5),
              l("div", {
                class: "table-cell text-center percentage-cell",
                style: bt({ color: v(p.c2) })
              }, $(b(h.value.pct2)) + "% ", 5),
              l("div", {
                class: "table-cell text-center percentage-cell",
                style: bt({ color: v(p.c3) })
              }, $(b(h.value.pct3)) + "% ", 5),
              l("div", {
                class: "table-cell text-center percentage-cell",
                style: bt({ color: v(p.c4p) })
              }, $(b(h.value.pct4p)) + "% ", 5)
            ]),
            l("div", e_, [
              y[2] || (y[2] = l("div", { class: "table-cell row-label" }, "Count", -1)),
              l("div", a_, $(T(X)(c.value[0])), 1),
              l("div", s_, $(T(X)(c.value[1])), 1),
              l("div", n_, $(T(X)(c.value[2])), 1),
              l("div", o_, $(T(X)(c.value[3])), 1),
              l("div", i_, $(T(X)(c.value["4p"])), 1)
            ])
          ]),
          e.enableExport ? (m(), dt(T(xt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ], 64)) : (m(), x("div", r_, [
          l("div", l_, [
            l("div", c_, [
              Q(T(Vt), { class: "empty-icon" })
            ]),
            y[4] || (y[4] = l("p", { class: "empty-title" }, "No triage combinations data", -1)),
            y[5] || (y[5] = l("p", { class: "empty-description" }, "No intent distribution data found for the selected period. Try adjusting the date range.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), h_ = /* @__PURE__ */ nt(u_, [["__scopeId", "data-v-cb93cda2"]]), f_ = { class: "select-language-card" }, g_ = { class: "card-header" }, p_ = { class: "header-content" }, v_ = {
  key: 0,
  class: "total-badge"
}, b_ = { class: "badge-value" }, m_ = {
  key: 0,
  class: "loading-state"
}, y_ = {
  key: 1,
  class: "card-body"
}, __ = {
  key: 0,
  class: "pie-section"
}, x_ = {
  key: 1,
  class: "empty-state"
}, k_ = /* @__PURE__ */ J({
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
    }, r = (v) => i[v]?.label || v.toUpperCase(), c = S(
      () => a.data?.items && a.data.items.length > 0
    ), d = S(
      () => (a.data?.items || []).reduce((v, f) => v + f.count, 0)
    ), u = S(() => {
      const v = {};
      for (const f of a.data?.items || [])
        v[f.language] = (v[f.language] || 0) + f.count;
      return Object.entries(v).map(([f, _]) => ({ language: f, count: _ })).sort((f, _) => _.count - f.count);
    }), h = S(() => ({
      labels: u.value.map((v) => r(v.language)),
      datasets: [{
        data: u.value.map((v) => v.count),
        backgroundColor: u.value.map((v, f) => o[f % o.length] + "80"),
        borderColor: u.value.map((v, f) => o[f % o.length]),
        borderWidth: 2,
        hoverOffset: 6
      }]
    })), p = S(() => ({
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
              const f = v.raw || 0, _ = d.value > 0 ? (f / d.value * 100).toFixed(1) : "0";
              return ` ${v.label}: ${f} (${_}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: s }), (v, f) => (m(), x("article", f_, [
      l("header", g_, [
        l("div", p_, [
          f[1] || (f[1] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "Language Selection"),
            l("p", { class: "card-subtitle" }, "Language distribution across conversations")
          ], -1)),
          a.loading ? E("", !0) : (m(), x("div", v_, [
            f[0] || (f[0] = l("p", { class: "badge-label" }, "Total", -1)),
            l("p", b_, $(T(X)(d.value)), 1)
          ]))
        ])
      ]),
      a.loading ? (m(), x("div", m_, [...f[2] || (f[2] = [
        st('<div class="loading-container" data-v-216eadc2><div class="chart-bars-loader" data-v-216eadc2><div class="bar bar-1" data-v-216eadc2></div><div class="bar bar-2" data-v-216eadc2></div><div class="bar bar-3" data-v-216eadc2></div><div class="bar bar-4" data-v-216eadc2></div><div class="bar bar-5" data-v-216eadc2></div></div><p class="loading-text" data-v-216eadc2>Loading language data...</p></div>', 1)
      ])])) : (m(), x("div", y_, [
        c.value ? (m(), x("section", __, [
          Q(Qa, {
            data: h.value,
            options: p.value
          }, null, 8, ["data", "options"])
        ])) : (m(), x("section", x_, [...f[3] || (f[3] = [
          st('<div class="empty-state-content" data-v-216eadc2><div class="empty-icon-wrapper" data-v-216eadc2><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-216eadc2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" data-v-216eadc2></path></svg></div><p class="empty-title" data-v-216eadc2>No language data available</p><p class="empty-description" data-v-216eadc2>No language selection data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), w_ = /* @__PURE__ */ nt(k_, [["__scopeId", "data-v-216eadc2"]]), $_ = { class: "guardrails-card" }, M_ = { class: "card-header" }, S_ = { class: "header-content" }, C_ = {
  key: 0,
  class: "total-badge"
}, D_ = { class: "badge-value" }, A_ = {
  key: 0,
  class: "loading-state"
}, T_ = {
  key: 1,
  class: "card-body"
}, B_ = { class: "summary-card" }, L_ = { class: "summary-items" }, F_ = { class: "summary-item" }, P_ = { class: "summary-value" }, I_ = { class: "summary-pct" }, R_ = { class: "summary-item" }, E_ = { class: "summary-pct" }, O_ = { class: "summary-item" }, V_ = { class: "summary-value" }, z_ = { class: "summary-pct" }, N_ = {
  key: 0,
  class: "table-section"
}, W_ = { class: "table-wrapper" }, H_ = { class: "data-table" }, j_ = { class: "table-body" }, Y_ = { class: "table-cell font-medium text-center" }, K_ = { class: "table-cell text-center font-semibold" }, U_ = { class: "table-cell" }, q_ = { class: "type-badges-row" }, X_ = {
  key: 1,
  class: "empty-state"
}, xs = 3, G_ = /* @__PURE__ */ J({
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
    }, { isDark: i } = ct(lt(s, "theme")), r = S(
      () => s.data?.items && s.data.items.length > 0
    ), c = S(
      () => (s.data?.items || []).reduce((g, y) => g + y.count, 0)
    ), d = (g) => {
      const y = {};
      for (const M of s.data?.items || [])
        y[M[g]] = (y[M[g]] || 0) + M.count;
      const w = Object.entries(y).sort((M, C) => C[1] - M[1]);
      if (w.length === 0) return { name: "—", pct: 0 };
      const k = c.value;
      return {
        name: w[0][0],
        pct: k > 0 ? Math.round(w[0][1] / k * 100) : 0
      };
    }, u = S(() => d("guardrail_type")), h = S(() => d("guardrail_action")), p = S(() => d("guardrail_source")), v = S(() => {
      const g = {};
      for (const y of s.data?.items || [])
        g[y.date] || (g[y.date] = {}), g[y.date][y.guardrail_type] = (g[y.date][y.guardrail_type] || 0) + y.count;
      return Object.entries(g).map(([y, w]) => ({
        date: y,
        total: Object.values(w).reduce((k, M) => k + M, 0),
        types: Object.entries(w).map(([k, M]) => ({ type: k, count: M })).sort((k, M) => M.count - k.count)
      })).sort((y, w) => new Date(y.date).getTime() - new Date(w.date).getTime());
    }), f = at(!1), _ = S(() => f.value ? v.value : v.value.slice(0, xs)), b = S(() => v.value.length > xs);
    return t({ isDark: i }), (g, y) => (m(), x("article", $_, [
      l("header", M_, [
        l("div", S_, [
          y[2] || (y[2] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "Guardrails Metrics"),
            l("p", { class: "card-subtitle" }, "Content safety guardrail events and actions")
          ], -1)),
          s.loading ? E("", !0) : (m(), x("div", C_, [
            y[1] || (y[1] = l("p", { class: "badge-label" }, "Total Events", -1)),
            l("p", D_, $(T(X)(c.value)), 1)
          ]))
        ])
      ]),
      s.loading ? (m(), x("div", A_, [...y[3] || (y[3] = [
        st('<div class="loading-container" data-v-02a2e95e><div class="chart-bars-loader" data-v-02a2e95e><div class="bar bar-1" data-v-02a2e95e></div><div class="bar bar-2" data-v-02a2e95e></div><div class="bar bar-3" data-v-02a2e95e></div><div class="bar bar-4" data-v-02a2e95e></div><div class="bar bar-5" data-v-02a2e95e></div></div><p class="loading-text" data-v-02a2e95e>Loading guardrails data...</p></div>', 1)
      ])])) : (m(), x("div", T_, [
        r.value ? (m(), x(q, { key: 0 }, [
          l("div", B_, [
            l("div", L_, [
              l("div", F_, [
                y[4] || (y[4] = l("span", { class: "summary-label" }, "Top type:", -1)),
                l("span", P_, $(u.value.name), 1),
                l("span", I_, "(" + $(u.value.pct) + "%)", 1)
              ]),
              y[7] || (y[7] = l("span", { class: "summary-dot" }, "·", -1)),
              l("div", R_, [
                y[5] || (y[5] = l("span", { class: "summary-label" }, "Top action:", -1)),
                l("span", {
                  class: K(["summary-value", `summary-action-${h.value.name.toLowerCase()}`])
                }, $(h.value.name), 3),
                l("span", E_, "(" + $(h.value.pct) + "%)", 1)
              ]),
              y[8] || (y[8] = l("span", { class: "summary-dot" }, "·", -1)),
              l("div", O_, [
                y[6] || (y[6] = l("span", { class: "summary-label" }, "Top source:", -1)),
                l("span", V_, $(p.value.name), 1),
                l("span", z_, "(" + $(p.value.pct) + "%)", 1)
              ])
            ])
          ]),
          v.value.length > 0 ? (m(), x("section", N_, [
            y[11] || (y[11] = l("div", { class: "section-header" }, [
              l("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            l("div", W_, [
              l("table", H_, [
                y[9] || (y[9] = l("thead", null, [
                  l("tr", { class: "table-header-row" }, [
                    l("th", { class: "table-header" }, "Date"),
                    l("th", { class: "table-header text-center" }, "Count"),
                    l("th", { class: "table-header" }, "Types")
                  ])
                ], -1)),
                l("tbody", j_, [
                  (m(!0), x(q, null, tt(_.value, (w) => (m(), x("tr", {
                    key: w.date,
                    class: "table-row"
                  }, [
                    l("td", Y_, $(T(At)(w.date).format("DD/MM")), 1),
                    l("td", K_, $(T(X)(w.total)), 1),
                    l("td", U_, [
                      l("div", q_, [
                        (m(!0), x(q, null, tt(w.types, (k) => (m(), x("span", {
                          key: k.type,
                          class: "type-count-badge"
                        }, $(k.type) + " (" + $(k.count) + ") ", 1))), 128))
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ]),
            b.value ? (m(), x("button", {
              key: 0,
              class: "view-more-btn",
              onClick: y[0] || (y[0] = (w) => f.value = !f.value)
            }, [
              kt($(f.value ? "View less" : `View more (${v.value.length - xs} more rows)`) + " ", 1),
              (m(), x("svg", {
                class: K(["view-more-icon", { "view-more-icon-rotated": f.value }]),
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [...y[10] || (y[10] = [
                l("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M19 9l-7 7-7-7"
                }, null, -1)
              ])], 2))
            ])) : E("", !0),
            e.enableExport ? (m(), dt(T(xt), {
              key: 1,
              onExport: o,
              loading: e.exportLoading
            }, null, 8, ["loading"])) : E("", !0)
          ])) : E("", !0)
        ], 64)) : (m(), x("section", X_, [...y[12] || (y[12] = [
          st('<div class="empty-state-content" data-v-02a2e95e><div class="empty-icon-wrapper" data-v-02a2e95e><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-02a2e95e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-v-02a2e95e></path></svg></div><p class="empty-title" data-v-02a2e95e>No guardrail events</p><p class="empty-description" data-v-02a2e95e>No content safety events found for the selected period. This is a good sign!</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Z_ = /* @__PURE__ */ nt(G_, [["__scopeId", "data-v-02a2e95e"]]), Q_ = { class: "dn-metrics-card" }, J_ = { class: "card-header" }, t2 = { class: "header-content" }, e2 = {
  key: 0,
  class: "total-docs-badge"
}, a2 = { class: "badge-value" }, s2 = {
  key: 0,
  class: "loading-state"
}, n2 = {
  key: 1,
  class: "card-body"
}, o2 = { class: "kpi-grid" }, i2 = { class: "kpi-card kpi-neutral" }, r2 = { class: "kpi-value" }, l2 = { class: "kpi-card kpi-success" }, c2 = { class: "kpi-value kpi-value-success" }, d2 = { class: "kpi-pct" }, u2 = { class: "kpi-card kpi-danger" }, h2 = { class: "kpi-value kpi-value-error" }, f2 = { class: "kpi-pct" }, g2 = { class: "kpi-card kpi-warning" }, p2 = { class: "kpi-value kpi-value-reason" }, v2 = { class: "kpi-pct" }, b2 = { class: "chart-section" }, m2 = { class: "chart-wrapper" }, y2 = {
  key: 1,
  class: "empty-chart"
}, _2 = {
  key: 0,
  class: "table-section"
}, x2 = { class: "table-wrapper" }, k2 = { class: "data-table" }, w2 = { class: "table-body" }, $2 = { class: "table-cell text-left font-medium" }, M2 = { class: "table-cell text-center font-semibold" }, S2 = { class: "table-cell text-center" }, C2 = { class: "impact-bar-container" }, D2 = { class: "impact-label" }, A2 = {
  key: 1,
  class: "chart-section"
}, T2 = { class: "chart-wrapper" }, B2 = { class: "system-health" }, L2 = { class: "system-health-content" }, F2 = { class: "sys-kpi-grid" }, P2 = { class: "sys-kpi" }, I2 = { class: "sys-value" }, R2 = { class: "sys-kpi" }, E2 = { class: "sys-value" }, O2 = { class: "sys-kpi" }, V2 = { class: "sys-value sys-error" }, z2 = { class: "sys-kpi" }, N2 = { class: "sys-value" }, W2 = { class: "sys-kpi" }, H2 = { class: "sys-value" }, j2 = { class: "sys-kpi" }, Y2 = { class: "sys-value sys-error" }, K2 = {
  key: 1,
  class: "empty-state"
}, U2 = /* @__PURE__ */ J({
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
    const s = e, n = a, o = (k) => {
      n("export", k);
    }, { isDark: i, colors: r } = ct(lt(s, "theme")), c = S(() => {
      const k = s.data?.documentCounts?.items || [], M = s.data?.processingCounts?.items || [];
      return k.length > 0 || M.length > 0;
    }), d = S(() => {
      const k = s.data?.documentCounts?.items || [];
      return {
        processing_started: k.reduce((M, C) => M + C.processing_started, 0),
        processing_completed: k.reduce((M, C) => M + C.processing_completed, 0),
        processing_failed: k.reduce((M, C) => M + C.processing_failed, 0),
        row_count_total: k.reduce((M, C) => M + C.row_count_total, 0)
      };
    }), u = S(() => {
      const k = s.data?.processingCounts?.items || [];
      return {
        processing_started: k.reduce((M, C) => M + C.processing_started, 0),
        processing_success: k.reduce((M, C) => M + C.processing_success, 0),
        notification_sent: k.reduce((M, C) => M + C.notification_sent, 0),
        notification_failed: k.reduce((M, C) => M + C.notification_failed, 0),
        dq_phone: k.reduce((M, C) => M + C.dq_error_phone_not_found, 0),
        dq_flight: k.reduce((M, C) => M + C.dq_error_flight_not_found, 0),
        dq_booking: k.reduce((M, C) => M + C.dq_error_booking_not_found, 0),
        dq_other: k.reduce((M, C) => M + C.dq_error_other, 0),
        totalDqErrors: k.reduce((M, C) => M + C.dq_error_phone_not_found + C.dq_error_flight_not_found + C.dq_error_booking_not_found + C.dq_error_other, 0)
      };
    }), h = S(() => d.value.row_count_total || u.value.processing_started), p = S(() => Math.max(0, h.value - u.value.notification_sent)), v = (k, M) => M ? `${Math.round(k / M * 100)}%` : "0%", f = S(() => {
      const k = [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].filter((M) => M.count > 0).sort((M, C) => C.count - M.count);
      return k.length > 0 ? k[0] : { reason: "None", count: 0 };
    }), _ = S(() => {
      const k = h.value;
      return [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].map((M) => ({
        ...M,
        impactPct: k > 0 ? Math.round(M.count / k * 100) : 0
      }));
    }), b = S(() => {
      const k = h.value, M = u.value.processing_success, C = Math.max(0, M - u.value.totalDqErrors), D = u.value.notification_sent, A = Math.max(0, k - M), B = u.value.totalDqErrors, L = Math.max(0, C - D), F = (P, I) => {
        const V = I > 0 ? Math.round(P / I * 100) : 0;
        return `${P.toLocaleString()} (${V}%)`;
      }, O = [
        { name: "Records Detected" },
        { name: "Valid Reservations" },
        { name: "Invalid / Unprocessed" },
        { name: "Contactable" },
        { name: "Data Quality Issues" },
        { name: "Notified" },
        { name: "Not Delivered" }
      ], W = [];
      return M > 0 && W.push({ source: "Records Detected", target: "Valid Reservations", value: M, label: F(M, k) }), A > 0 && W.push({ source: "Records Detected", target: "Invalid / Unprocessed", value: A, label: F(A, k) }), C > 0 && W.push({ source: "Valid Reservations", target: "Contactable", value: C, label: F(C, k) }), B > 0 && W.push({ source: "Valid Reservations", target: "Data Quality Issues", value: B, label: F(B, k) }), D > 0 && W.push({ source: "Contactable", target: "Notified", value: D, label: F(D, k) }), L > 0 && W.push({ source: "Contactable", target: "Not Delivered", value: L, label: F(L, k) }), { nodes: O, links: W };
    }), g = {
      "Records Detected": "#DBEAFE",
      "Valid Reservations": "#D1FAE5",
      "Invalid / Unprocessed": "#FEE2E2",
      Contactable: "#BBF7D0",
      "Data Quality Issues": "#FED7AA",
      Notified: "#86EFAC",
      "Not Delivered": "#FCA5A5"
    }, y = S(() => {
      const k = [...s.data?.processingCounts?.items || []].sort(
        (F, O) => new Date(F.date).getTime() - new Date(O.date).getTime()
      ), M = s.data?.documentCounts?.items || [], C = {};
      for (const F of M)
        C[F.date] = (C[F.date] || 0) + F.row_count_total;
      const D = [.../* @__PURE__ */ new Set([...k.map((F) => F.date), ...M.map((F) => F.date)])].sort(), A = D.map((F) => At(F).format("MMM DD")), B = D.map((F) => {
        const O = k.find((I) => I.date === F), W = O?.notification_sent || 0, P = C[F] || O?.processing_started || 0;
        return P > 0 ? Math.round(W / P * 100) : 0;
      }), L = D.map((F) => k.find((W) => W.date === F)?.notification_sent || 0);
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
            data: L,
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
    }), w = S(() => ({
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
            label: (k) => k.datasetIndex === 0 ? ` Success Rate: ${k.raw}%` : ` Notifications: ${k.raw}`
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
          ticks: { font: { family: "'DM Sans', sans-serif", size: 11 }, color: r.value.textSecondary, callback: (k) => k + "%" },
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
    return t({ isDark: i }), (k, M) => (m(), x("article", Q_, [
      l("header", J_, [
        l("div", t2, [
          M[1] || (M[1] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "Disruption Notifier"),
            l("p", { class: "card-subtitle" }, "Passenger notification effectiveness and delivery analysis")
          ], -1)),
          s.loading ? E("", !0) : (m(), x("div", e2, [
            M[0] || (M[0] = l("p", { class: "badge-label" }, "Total Records", -1)),
            l("p", a2, $(T(X)(d.value.row_count_total)), 1)
          ]))
        ])
      ]),
      s.loading ? (m(), x("div", s2, [...M[2] || (M[2] = [
        st('<div class="loading-container" data-v-d8baf32c><div class="chart-bars-loader" data-v-d8baf32c><div class="bar bar-1" data-v-d8baf32c></div><div class="bar bar-2" data-v-d8baf32c></div><div class="bar bar-3" data-v-d8baf32c></div><div class="bar bar-4" data-v-d8baf32c></div><div class="bar bar-5" data-v-d8baf32c></div></div><p class="loading-text" data-v-d8baf32c>Loading disruption notifier data...</p></div>', 1)
      ])])) : (m(), x("div", n2, [
        c.value ? (m(), x(q, { key: 0 }, [
          l("div", o2, [
            l("div", i2, [
              M[3] || (M[3] = l("span", { class: "kpi-label" }, "Passengers Affected", -1)),
              l("span", r2, $(T(X)(h.value)), 1)
            ]),
            l("div", l2, [
              M[4] || (M[4] = l("span", { class: "kpi-label" }, "Successfully Notified", -1)),
              l("span", c2, $(T(X)(u.value.notification_sent)), 1),
              l("span", d2, $(v(u.value.notification_sent, h.value)), 1)
            ]),
            l("div", u2, [
              M[5] || (M[5] = l("span", { class: "kpi-label" }, "Not Notified", -1)),
              l("span", h2, $(T(X)(p.value)), 1),
              l("span", f2, $(v(p.value, h.value)), 1)
            ]),
            l("div", g2, [
              M[6] || (M[6] = l("span", { class: "kpi-label" }, "Main Failure Reason", -1)),
              l("span", p2, $(f.value.reason), 1),
              l("span", v2, $(T(X)(f.value.count)) + " cases", 1)
            ])
          ]),
          l("section", b2, [
            M[8] || (M[8] = l("div", { class: "chart-header" }, [
              l("h4", { class: "section-title" }, "Passenger Disruption Funnel")
            ], -1)),
            l("div", m2, [
              b.value.nodes.length > 0 && b.value.links.length > 0 ? (m(), dt(_e, {
                key: 0,
                data: b.value,
                "node-colors": g,
                height: "350px"
              }, null, 8, ["data"])) : (m(), x("div", y2, [...M[7] || (M[7] = [
                l("p", { class: "empty-chart-text" }, "No processing data available for visualization", -1)
              ])]))
            ])
          ]),
          _.value.length > 0 ? (m(), x("section", _2, [
            M[10] || (M[10] = l("div", { class: "section-header" }, [
              l("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
            ], -1)),
            l("div", x2, [
              l("table", k2, [
                M[9] || (M[9] = l("thead", null, [
                  l("tr", { class: "table-header-row" }, [
                    l("th", { class: "table-header text-left" }, "Reason"),
                    l("th", { class: "table-header text-center" }, "Count"),
                    l("th", { class: "table-header text-center" }, "Impact")
                  ])
                ], -1)),
                l("tbody", w2, [
                  (m(!0), x(q, null, tt(_.value, (C) => (m(), x("tr", {
                    key: C.reason,
                    class: "table-row"
                  }, [
                    l("td", $2, $(C.reason), 1),
                    l("td", M2, $(T(X)(C.count)), 1),
                    l("td", S2, [
                      l("div", C2, [
                        l("div", {
                          class: "impact-bar",
                          style: bt({ width: C.impactPct + "%" })
                        }, null, 4),
                        l("span", D2, $(C.impactPct) + "%", 1)
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ])
          ])) : E("", !0),
          y.value.labels.length > 0 ? (m(), x("section", A2, [
            M[11] || (M[11] = l("div", { class: "chart-header" }, [
              l("h4", { class: "section-title" }, "Notification Success Rate by Day")
            ], -1)),
            l("div", T2, [
              Q(ye, {
                data: y.value,
                options: w.value
              }, null, 8, ["data", "options"])
            ])
          ])) : E("", !0),
          l("details", B2, [
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
              kt(" System Health Details ")
            ], -1)),
            l("div", L2, [
              l("div", F2, [
                l("div", P2, [
                  M[12] || (M[12] = l("span", { class: "sys-label" }, "Docs Started", -1)),
                  l("span", I2, $(T(X)(d.value.processing_started)), 1)
                ]),
                l("div", R2, [
                  M[13] || (M[13] = l("span", { class: "sys-label" }, "Docs Completed", -1)),
                  l("span", E2, $(T(X)(d.value.processing_completed)), 1)
                ]),
                l("div", O2, [
                  M[14] || (M[14] = l("span", { class: "sys-label" }, "Docs Failed", -1)),
                  l("span", V2, $(T(X)(d.value.processing_failed)), 1)
                ]),
                l("div", z2, [
                  M[15] || (M[15] = l("span", { class: "sys-label" }, "Processing Started", -1)),
                  l("span", N2, $(T(X)(u.value.processing_started)), 1)
                ]),
                l("div", W2, [
                  M[16] || (M[16] = l("span", { class: "sys-label" }, "Processing Success", -1)),
                  l("span", H2, $(T(X)(u.value.processing_success)), 1)
                ]),
                l("div", j2, [
                  M[17] || (M[17] = l("span", { class: "sys-label" }, "Notification Failed", -1)),
                  l("span", Y2, $(T(X)(u.value.notification_failed)), 1)
                ])
              ])
            ])
          ]),
          e.enableExport ? (m(), dt(T(xt), {
            key: 2,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ], 64)) : (m(), x("section", K2, [...M[19] || (M[19] = [
          st('<div class="empty-state-content" data-v-d8baf32c><div class="empty-icon-wrapper" data-v-d8baf32c><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d8baf32c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" data-v-d8baf32c></path></svg></div><p class="empty-title" data-v-d8baf32c>No disruption notifier data</p><p class="empty-description" data-v-d8baf32c>No disruption notification data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), q2 = /* @__PURE__ */ nt(U2, [["__scopeId", "data-v-d8baf32c"]]), X2 = { class: "card-header" }, G2 = {
  key: 0,
  class: "loading-state"
}, Z2 = {
  key: 1,
  class: "card-body"
}, Q2 = { class: "metric-value" }, J2 = /* @__PURE__ */ J({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s } = ct(lt(a, "theme")), n = S(() => X(a.totalConversations)), o = S(
      () => a.previousTotalConversations !== null && a.previousTotalConversations !== void 0
    ), i = S(() => {
      if (!o.value) return 0;
      const d = a.previousTotalConversations;
      return d === 0 ? a.totalConversations > 0 ? 100 : 0 : (a.totalConversations - d) / d * 100;
    }), r = S(() => `${i.value > 0 ? "+" : ""}${i.value.toFixed(1)}% vs prev.`), c = S(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: s, changePercent: i }), (d, u) => (m(), x("article", {
      class: K(["highlight-card", { "highlight-card--dark": T(s) }])
    }, [
      l("header", X2, [
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
        !e.loading && o.value ? (m(), x("div", {
          key: 0,
          class: K(["change-badge", c.value])
        }, $(r.value), 3)) : E("", !0)
      ]),
      e.loading ? (m(), x("div", G2, [...u[1] || (u[1] = [
        l("div", { class: "shimmer shimmer-value" }, null, -1),
        l("div", { class: "shimmer shimmer-label" }, null, -1)
      ])])) : (m(), x("div", Z2, [
        l("span", Q2, $(n.value), 1),
        u[2] || (u[2] = l("span", { class: "metric-label" }, "Total Conversations", -1))
      ]))
    ], 2));
  }
}), tx = /* @__PURE__ */ nt(J2, [["__scopeId", "data-v-cd9dd1ba"]]), ex = { class: "card-header" }, ax = {
  key: 0,
  class: "loading-state"
}, sx = {
  key: 1,
  class: "card-body"
}, nx = { class: "metric-value" }, ox = /* @__PURE__ */ J({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s } = ct(lt(a, "theme")), n = S(() => `${a.csatP95.toFixed(1)}`), o = S(
      () => a.previousCsatP95 !== null && a.previousCsatP95 !== void 0
    ), i = S(() => {
      if (!o.value) return 0;
      const d = a.previousCsatP95;
      return d === 0 ? a.csatP95 > 0 ? 100 : 0 : (a.csatP95 - d) / d * 100;
    }), r = S(() => `${i.value > 0 ? "+" : ""}${i.value.toFixed(1)}% vs prev.`), c = S(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: s, changePercent: i }), (d, u) => (m(), x("article", {
      class: K(["highlight-card", { "highlight-card--dark": T(s) }])
    }, [
      l("header", ex, [
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
        !e.loading && o.value ? (m(), x("div", {
          key: 0,
          class: K(["change-badge", c.value])
        }, $(r.value), 3)) : E("", !0)
      ]),
      e.loading ? (m(), x("div", ax, [...u[1] || (u[1] = [
        l("div", { class: "shimmer shimmer-value" }, null, -1),
        l("div", { class: "shimmer shimmer-label" }, null, -1)
      ])])) : (m(), x("div", sx, [
        l("span", nx, $(n.value), 1),
        u[2] || (u[2] = l("span", { class: "metric-label" }, "CSAT P95", -1))
      ]))
    ], 2));
  }
}), ix = /* @__PURE__ */ nt(ox, [["__scopeId", "data-v-e36f6025"]]), rx = { class: "card-header" }, lx = {
  key: 0,
  class: "loading-state"
}, cx = {
  key: 1,
  class: "card-body"
}, dx = { class: "metric-value" }, ux = /* @__PURE__ */ J({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s } = ct(lt(a, "theme")), n = S(() => `${a.currencyCode} ${fe(a.totalRevenue)}`), o = S(
      () => a.previousTotalRevenue !== null && a.previousTotalRevenue !== void 0
    ), i = S(() => {
      if (!o.value) return 0;
      const d = a.previousTotalRevenue;
      return d === 0 ? a.totalRevenue > 0 ? 100 : 0 : (a.totalRevenue - d) / d * 100;
    }), r = S(() => `${i.value > 0 ? "+" : ""}${i.value.toFixed(1)}% vs prev.`), c = S(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: s, changePercent: i }), (d, u) => (m(), x("article", {
      class: K(["highlight-card", { "highlight-card--dark": T(s) }])
    }, [
      l("header", rx, [
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
        !e.loading && o.value ? (m(), x("div", {
          key: 0,
          class: K(["change-badge", c.value])
        }, $(r.value), 3)) : E("", !0)
      ]),
      e.loading ? (m(), x("div", lx, [...u[1] || (u[1] = [
        l("div", { class: "shimmer shimmer-value" }, null, -1),
        l("div", { class: "shimmer shimmer-label" }, null, -1)
      ])])) : (m(), x("div", cx, [
        l("span", dx, $(n.value), 1),
        u[2] || (u[2] = l("span", { class: "metric-label" }, "AI-Generated Revenue", -1))
      ]))
    ], 2));
  }
}), hx = /* @__PURE__ */ nt(ux, [["__scopeId", "data-v-a642a31c"]]), fx = { class: "nps-daily-card" }, gx = { class: "card-header" }, px = { class: "header-content" }, vx = {
  key: 0,
  class: "stats-badge"
}, bx = { class: "badge-value" }, mx = {
  key: 0,
  class: "loading-state"
}, yx = {
  key: 1,
  class: "card-body"
}, _x = { class: "tooltip-content" }, xx = { class: "tooltip-title" }, kx = { class: "tooltip-stats" }, wx = { class: "tooltip-stat-row" }, $x = { class: "tooltip-value" }, Mx = { class: "tooltip-stat-row" }, Sx = { class: "tooltip-value" }, Cx = { class: "tooltip-stat-row" }, Dx = { class: "tooltip-value" }, Ax = { class: "tooltip-stat-row" }, Tx = { class: "tooltip-value" }, Bx = { class: "tooltip-stat-row" }, Lx = { class: "tooltip-value" }, Fx = { class: "tooltip-stat-row" }, Px = { class: "tooltip-value" }, Ix = {
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
    const s = a, n = (b) => {
      s("export", b);
    }, o = e, { isDark: i } = ct(lt(o, "theme")), r = S(() => o.data), c = at(null), d = at({
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
    }), u = S(() => {
      if (!r.value || !r.value.nps_by_day) return 800;
      const b = r.value.nps_by_day.length;
      return Math.max(800, Je * 2 + b * To);
    }), h = (b, g) => {
      const w = (b - 1) / 9;
      return Je + g - w * g;
    }, p = (b) => b ? At(b).format("DD-MM-YYYY") : "", v = S(() => {
      if (!r.value || !r.value.nps_by_day || r.value.nps_by_day.length === 0)
        return [];
      const b = [], g = Do - Je - Ao;
      return r.value.nps_by_day.forEach((y, w) => {
        const k = y.min_score || 0, M = y.q1_score || 0, C = y.median_score || 0, D = y.q3_score || 0, A = y.max_score || 0, B = y.average_score || 0;
        b.push({
          label: p(y.date),
          responseCount: y.nps_responses_count || 0,
          isTotal: !1,
          low: k,
          q1: M,
          median: C,
          q3: D,
          high: A,
          average: B,
          highY: h(A, g),
          lowY: h(k, g),
          q1Y: h(M, g),
          q3Y: h(D, g),
          medianY: h(C, g),
          averageY: B > 0 ? h(B, g) : null,
          centerX: Je + (w + 1) * To
        });
      }), b;
    }), f = (b, g) => {
      if (!c.value || !g || g.horizontal) return;
      const y = c.value.getBoundingClientRect(), w = b.clientX, k = b.clientY, M = 140, C = 160, D = 10, A = 15;
      let B = w - y.left - M / 2, L = k - y.top - C - A;
      B = Math.max(D, Math.min(B, y.width - M - D)), L < D && (L = k - y.top + A), L = Math.max(D, Math.min(L, y.height - C - D)), d.value = {
        visible: !0,
        x: B,
        y: L,
        date: g.label || "",
        min: g.low !== void 0 ? g.low.toFixed(1) : "N/A",
        max: g.high !== void 0 ? g.high.toFixed(1) : "N/A",
        q1: g.open !== void 0 ? g.open.toFixed(1) : "N/A",
        avg: g.average !== void 0 && g.average > 0 ? g.average.toFixed(1) : "N/A",
        q3: g.close !== void 0 ? g.close.toFixed(1) : "N/A",
        median: g.median !== void 0 ? g.median.toFixed(1) : "N/A"
      };
    }, _ = () => {
      d.value.visible = !1;
    };
    return t({ isDark: i }), (b, g) => (m(), x("article", fx, [
      l("header", gx, [
        l("div", px, [
          g[1] || (g[1] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "CSAT Daily Metrics"),
            l("p", { class: "card-subtitle" }, "Daily CSAT Distribution")
          ], -1)),
          r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (m(), x("div", vx, [
            g[0] || (g[0] = l("p", { class: "badge-label" }, "Days", -1)),
            l("p", bx, $(r.value.nps_by_day.length), 1)
          ])) : E("", !0)
        ])
      ]),
      o.loading ? (m(), x("div", mx, [...g[2] || (g[2] = [
        st('<div class="loading-container" data-v-b20112a7><div class="chart-flow-loader" data-v-b20112a7><div class="flow-line flow-1" data-v-b20112a7></div><div class="flow-line flow-2" data-v-b20112a7></div><div class="flow-line flow-3" data-v-b20112a7></div><div class="flow-line flow-4" data-v-b20112a7></div><div class="flow-line flow-5" data-v-b20112a7></div></div><p class="loading-text" data-v-b20112a7>Loading daily NPS data...</p></div>', 1)
      ])])) : r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (m(), x("div", yx, [
        l("div", {
          class: "chart-wrapper",
          ref_key: "chartContainerRef",
          ref: c
        }, [
          v.value && v.value.length > 0 ? (m(), dt(Ei, {
            key: 0,
            "candlestick-data": v.value,
            "chart-width": u.value,
            "chart-height": Do,
            "chart-margin": Je,
            "chart-bottom-margin": Ao,
            "show-legend": !0,
            rotation: 0,
            "candle-width": 30,
            onCandleHover: f,
            onCandleLeave: _
          }, null, 8, ["candlestick-data", "chart-width"])) : E("", !0),
          d.value.visible ? (m(), x("div", {
            key: 1,
            class: "tooltip-overlay",
            style: bt({
              left: `${d.value.x}px`,
              top: `${d.value.y}px`
            })
          }, [
            l("div", _x, [
              l("div", xx, $(d.value.date), 1),
              g[9] || (g[9] = l("div", { class: "tooltip-divider" }, null, -1)),
              l("div", kx, [
                l("div", wx, [
                  g[3] || (g[3] = l("span", { class: "tooltip-label tooltip-min" }, "Min:", -1)),
                  l("span", $x, $(d.value.min), 1)
                ]),
                l("div", Mx, [
                  g[4] || (g[4] = l("span", { class: "tooltip-label tooltip-q1" }, "Q1:", -1)),
                  l("span", Sx, $(d.value.q1), 1)
                ]),
                l("div", Cx, [
                  g[5] || (g[5] = l("span", { class: "tooltip-label tooltip-median" }, "Median:", -1)),
                  l("span", Dx, $(d.value.median), 1)
                ]),
                l("div", Ax, [
                  g[6] || (g[6] = l("span", { class: "tooltip-label tooltip-avg" }, "Avg:", -1)),
                  l("span", Tx, $(d.value.avg), 1)
                ]),
                l("div", Bx, [
                  g[7] || (g[7] = l("span", { class: "tooltip-label tooltip-q3" }, "Q3:", -1)),
                  l("span", Lx, $(d.value.q3), 1)
                ]),
                l("div", Fx, [
                  g[8] || (g[8] = l("span", { class: "tooltip-label tooltip-max" }, "Max:", -1)),
                  l("span", Px, $(d.value.max), 1)
                ])
              ])
            ])
          ], 4)) : E("", !0)
        ], 512),
        e.enableExport ? (m(), dt(T(xt), {
          key: 0,
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ])) : (m(), x("div", Ix, [...g[10] || (g[10] = [
        st('<div class="empty-state-content" data-v-b20112a7><div class="empty-icon-wrapper" data-v-b20112a7><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-b20112a7><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-b20112a7></path></svg></div><p class="empty-title" data-v-b20112a7>No daily NPS data available</p><p class="empty-description" data-v-b20112a7>No daily NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, Wi = /* @__PURE__ */ nt(Rx, [["__scopeId", "data-v-b20112a7"]]), Ex = { class: "nps-overview-card" }, Ox = { class: "card-header" }, Vx = { class: "header-content" }, zx = { class: "header-badges" }, Nx = {
  key: 0,
  class: "stats-badge"
}, Wx = { class: "badge-value" }, Hx = {
  key: 1,
  class: "stats-badge"
}, jx = { class: "badge-value" }, Yx = {
  key: 0,
  class: "loading-state"
}, Kx = {
  key: 1,
  class: "card-body"
}, Ux = { class: "chart-wrapper" }, qx = {
  key: 2,
  class: "empty-state"
}, Xx = 500, Gx = 60, Zx = 80, Qx = {
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
    }, o = e, { isDark: i } = ct(lt(o, "theme")), r = S(() => o.data), c = S(() => Math.max(600, window.innerWidth * 0.85));
    return t({ isDark: i }), (d, u) => (m(), x("article", Ex, [
      l("header", Ox, [
        l("div", Vx, [
          u[2] || (u[2] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "CSAT Overview Metrics"),
            l("p", { class: "card-subtitle" }, "Overall CSAT Distribution")
          ], -1)),
          l("div", zx, [
            r.value && r.value.total_nps_responses > 0 ? (m(), x("div", Nx, [
              u[0] || (u[0] = l("p", { class: "badge-label" }, "Responses", -1)),
              l("p", Wx, $(r.value.total_nps_responses), 1)
            ])) : E("", !0),
            r.value && r.value.p95_score > 0 ? (m(), x("div", Hx, [
              u[1] || (u[1] = l("p", { class: "badge-label" }, "Percentile 95", -1)),
              l("p", jx, $(r.value.p95_score || 0), 1)
            ])) : E("", !0)
          ])
        ])
      ]),
      o.loading ? (m(), x("div", Yx, [...u[3] || (u[3] = [
        st('<div class="loading-container" data-v-30fe5f88><div class="chart-flow-loader" data-v-30fe5f88><div class="flow-line flow-1" data-v-30fe5f88></div><div class="flow-line flow-2" data-v-30fe5f88></div><div class="flow-line flow-3" data-v-30fe5f88></div><div class="flow-line flow-4" data-v-30fe5f88></div><div class="flow-line flow-5" data-v-30fe5f88></div></div><p class="loading-text" data-v-30fe5f88>Loading NPS data...</p></div>', 1)
      ])])) : r.value && r.value.total_nps_responses > 0 ? (m(), x("div", Kx, [
        l("div", Ux, [
          Q(Oi, {
            histogram: r.value.histogram || [],
            "min-score": r.value.min_score || 0,
            "max-score": r.value.max_score || 0,
            "q1-score": r.value.q1_score || 0,
            "median-score": r.value.median_score || 0,
            "q3-score": r.value.q3_score || 0,
            "average-score": r.value.average_score || 0,
            "chart-width": c.value,
            "chart-height": Xx,
            "chart-margin": Gx,
            "chart-bottom-margin": Zx
          }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score", "chart-width"])
        ]),
        e.enableExport ? (m(), dt(T(xt), {
          key: 0,
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ])) : (m(), x("div", qx, [...u[4] || (u[4] = [
        st('<div class="empty-state-content" data-v-30fe5f88><div class="empty-icon-wrapper" data-v-30fe5f88><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-30fe5f88><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-30fe5f88></path></svg></div><p class="empty-title" data-v-30fe5f88>No NPS data available</p><p class="empty-description" data-v-30fe5f88>No NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, Hi = /* @__PURE__ */ nt(Qx, [["__scopeId", "data-v-30fe5f88"]]), Jx = { class: "nps-metrics-container" }, tk = {
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
    return (n, o) => (m(), x("div", Jx, [
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
}, ek = /* @__PURE__ */ nt(tk, [["__scopeId", "data-v-25fe3b80"]]), ak = { class: "aws-cost-card" }, sk = { class: "card-header" }, nk = { class: "header-main" }, ok = { class: "header-content" }, ik = { class: "card-title" }, rk = { class: "header-stats" }, lk = { class: "stat-badge primary" }, ck = { class: "stat-value" }, dk = { class: "stat-badge secondary" }, uk = { class: "stat-value" }, hk = { class: "card-body" }, fk = {
  key: 0,
  class: "loading-state"
}, gk = {
  key: 1,
  class: "chart-section"
}, pk = { class: "chart-container" }, vk = {
  key: 2,
  class: "empty-state"
}, bk = { class: "empty-state-content" }, mk = { class: "empty-icon-wrapper" }, yk = {
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
    const t = e, { isDark: a, colors: s } = ct(lt(t, "theme")), n = S(() => {
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
    }), o = S(() => {
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
    }), i = S(() => ({
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
            callback: (r) => vt(r)
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
    return (r, c) => (m(), x("article", ak, [
      l("header", sk, [
        l("div", nk, [
          l("div", ok, [
            l("h3", ik, $(n.value.airline_name || "AWS Cost"), 1),
            c[0] || (c[0] = l("p", { class: "card-subtitle" }, "AWS vs Allocated costs over time", -1))
          ]),
          l("div", rk, [
            l("div", lk, [
              c[1] || (c[1] = l("span", { class: "stat-label" }, "Total Allocated", -1)),
              l("span", ck, $(T(vt)(n.value.total_allocated_cost)), 1)
            ]),
            l("div", dk, [
              c[2] || (c[2] = l("span", { class: "stat-label" }, "Total AWS", -1)),
              l("span", uk, $(T(vt)(n.value.total_cost)), 1)
            ])
          ])
        ])
      ]),
      l("div", hk, [
        e.loading ? (m(), x("div", fk, [...c[3] || (c[3] = [
          st('<div class="loading-container" data-v-c023bd59><div class="chart-lines-loader" data-v-c023bd59><div class="line line-1" data-v-c023bd59></div><div class="line line-2" data-v-c023bd59></div><div class="line line-3" data-v-c023bd59></div><div class="line line-4" data-v-c023bd59></div><div class="line line-5" data-v-c023bd59></div></div><p class="loading-text" data-v-c023bd59>Loading chart data...</p></div>', 1)
        ])])) : n.value.daily.length > 0 ? (m(), x("div", gk, [
          l("div", pk, [
            Q(ye, {
              data: o.value,
              options: i.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (m(), x("section", vk, [
          l("div", bk, [
            l("div", mk, [
              Q(T(Vt), { class: "empty-icon" })
            ]),
            c[4] || (c[4] = l("p", { class: "empty-title" }, "Sin datos de costos", -1)),
            c[5] || (c[5] = l("p", { class: "empty-description" }, "No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas.", -1))
          ])
        ]))
      ])
    ]));
  }
}, _k = /* @__PURE__ */ nt(yk, [["__scopeId", "data-v-c023bd59"]]), xk = { class: "cost-usage-card" }, kk = {
  key: 0,
  class: "card-body"
}, wk = {
  key: 0,
  class: "chart-section"
}, $k = { class: "chart-container" }, Mk = { class: "kpi-grid" }, Sk = { class: "kpi-card" }, Ck = { class: "kpi-value" }, Dk = { class: "kpi-card" }, Ak = { class: "kpi-value" }, Tk = { class: "kpi-card" }, Bk = { class: "kpi-value" }, Lk = { class: "kpi-card" }, Fk = { class: "kpi-value" }, Pk = { class: "kpi-card" }, Ik = { class: "kpi-value" }, Rk = { class: "kpi-card highlighted" }, Ek = { class: "kpi-value gradient-text" }, Ok = {
  key: 1,
  class: "empty-state"
}, Vk = { class: "empty-state-content" }, zk = { class: "empty-icon-wrapper" }, Nk = {
  key: 1,
  class: "loading-state"
}, Wk = /* @__PURE__ */ J({
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
    const s = e, { isDark: n, colors: o } = ct(lt(s, "theme")), i = (f) => {
      const _ = new Date(f), b = String(_.getDate()).padStart(2, "0"), g = String(_.getMonth() + 1).padStart(2, "0");
      return `${b}-${g}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, c = S(() => {
      const f = s.data?.costs_by_day || {};
      return Object.values(f).reduce((_, b) => _ + (b.input_cost || 0), 0);
    }), d = S(() => {
      const f = s.data?.costs_by_day || {};
      return Object.values(f).reduce((_, b) => _ + (b.output_cost || 0), 0);
    }), u = S(() => {
      const f = s.data?.costs_by_day || {};
      return Object.values(f).reduce((_, b) => _ + (b.cache_read_cost || 0), 0);
    }), h = S(() => {
      const f = s.data?.costs_by_day || {};
      return Object.values(f).reduce((_, b) => _ + (b.cache_write_cost || 0), 0);
    }), p = S(() => {
      const f = s.data?.costs_by_day || {}, _ = Object.keys(f).sort();
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const b = _.map((y) => i(y)), g = [
        {
          label: "Input Cost",
          data: _.map((y) => f[y]?.input_cost || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: _.map((y) => f[y]?.output_cost || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: _.map((y) => f[y]?.cache_read_cost || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: _.map((y) => f[y]?.cache_write_cost || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: b,
        datasets: g
      };
    }), v = S(() => s.options ? s.options : {
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
              let _ = f.dataset.label || "";
              return _ && (_ += ": "), f.parsed.y !== null && (_ += vt(f.parsed.y)), _;
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
              return vt(f);
            }
          }
        }
      }
    });
    return t({ isDark: n }), (f, _) => (m(), x("article", xk, [
      _[9] || (_[9] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Cost Usage"),
          l("p", { class: "card-subtitle" }, "Cost breakdown over time (stacked)")
        ])
      ], -1)),
      e.loading ? (m(), x("div", Nk, [..._[8] || (_[8] = [
        st('<div class="loading-container" data-v-62f96954><div class="chart-lines-loader" data-v-62f96954><div class="line line-1" data-v-62f96954></div><div class="line line-2" data-v-62f96954></div><div class="line line-3" data-v-62f96954></div><div class="line line-4" data-v-62f96954></div><div class="line line-5" data-v-62f96954></div></div><p class="loading-text" data-v-62f96954>Loading chart data...</p></div>', 1)
      ])])) : (m(), x("div", kk, [
        p.value.labels && p.value.labels.length ? (m(), x("section", wk, [
          l("div", $k, [
            Q(ie, {
              data: p.value,
              options: v.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          l("footer", Mk, [
            l("div", Sk, [
              _[0] || (_[0] = l("span", { class: "kpi-label" }, "Total Cost", -1)),
              l("span", Ck, $(T(vt)(e.data.total_cost)), 1)
            ]),
            l("div", Dk, [
              _[1] || (_[1] = l("span", { class: "kpi-label" }, "Input Cost", -1)),
              l("span", Ak, $(T(vt)(c.value)), 1)
            ]),
            l("div", Tk, [
              _[2] || (_[2] = l("span", { class: "kpi-label" }, "Output Cost", -1)),
              l("span", Bk, $(T(vt)(d.value)), 1)
            ]),
            l("div", Lk, [
              _[3] || (_[3] = l("span", { class: "kpi-label" }, "Cache Read", -1)),
              l("span", Fk, $(T(vt)(u.value)), 1)
            ]),
            l("div", Pk, [
              _[4] || (_[4] = l("span", { class: "kpi-label" }, "Cache Write", -1)),
              l("span", Ik, $(T(vt)(h.value)), 1)
            ]),
            l("div", Rk, [
              _[5] || (_[5] = l("span", { class: "kpi-label" }, "Avg / Conv.", -1)),
              l("span", Ek, $(T(vt)(e.data.avg_cost_per_conversation)), 1)
            ])
          ])
        ])) : (m(), x("section", Ok, [
          l("div", Vk, [
            l("div", zk, [
              Q(T(Vt), { class: "empty-icon" })
            ]),
            _[6] || (_[6] = l("p", { class: "empty-title" }, "No cost usage data", -1)),
            _[7] || (_[7] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Hk = /* @__PURE__ */ nt(Wk, [["__scopeId", "data-v-62f96954"]]), jk = { class: "token-usage-card" }, Yk = {
  key: 0,
  class: "card-body"
}, Kk = {
  key: 0,
  class: "chart-section"
}, Uk = { class: "chart-container" }, qk = { class: "kpi-grid" }, Xk = { class: "kpi-card" }, Gk = { class: "kpi-value" }, Zk = { class: "kpi-card" }, Qk = { class: "kpi-value" }, Jk = { class: "kpi-card" }, t5 = { class: "kpi-value" }, e5 = { class: "kpi-card" }, a5 = { class: "kpi-value" }, s5 = { class: "kpi-card" }, n5 = { class: "kpi-value" }, o5 = {
  key: 1,
  class: "empty-state"
}, i5 = { class: "empty-state-content" }, r5 = { class: "empty-icon-wrapper" }, l5 = {
  key: 1,
  class: "loading-state"
}, c5 = /* @__PURE__ */ J({
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
      const h = new Date(u), p = String(h.getDate()).padStart(2, "0"), v = String(h.getMonth() + 1).padStart(2, "0");
      return `${p}-${v}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, c = S(() => {
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
    }), d = S(() => s.options ? s.options : {
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
    return t({ isDark: n }), (u, h) => (m(), x("article", jk, [
      h[8] || (h[8] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Token Usage"),
          l("p", { class: "card-subtitle" }, "Token consumption over time (stacked)")
        ])
      ], -1)),
      e.loading ? (m(), x("div", l5, [...h[7] || (h[7] = [
        st('<div class="loading-container" data-v-e9e355be><div class="chart-lines-loader" data-v-e9e355be><div class="line line-1" data-v-e9e355be></div><div class="line line-2" data-v-e9e355be></div><div class="line line-3" data-v-e9e355be></div><div class="line line-4" data-v-e9e355be></div><div class="line line-5" data-v-e9e355be></div></div><p class="loading-text" data-v-e9e355be>Loading chart data...</p></div>', 1)
      ])])) : (m(), x("div", Yk, [
        c.value.labels && c.value.labels.length ? (m(), x("section", Kk, [
          l("div", Uk, [
            Q(ie, {
              data: c.value,
              options: d.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          l("footer", qk, [
            l("div", Xk, [
              h[0] || (h[0] = l("span", { class: "kpi-label" }, "Total Tokens", -1)),
              l("span", Gk, $(T(X)(e.data.total_tokens)), 1)
            ]),
            l("div", Zk, [
              h[1] || (h[1] = l("span", { class: "kpi-label" }, "Input", -1)),
              l("span", Qk, $(T(X)(e.data.total_input_tokens)), 1)
            ]),
            l("div", Jk, [
              h[2] || (h[2] = l("span", { class: "kpi-label" }, "Output", -1)),
              l("span", t5, $(T(X)(e.data.total_output_tokens)), 1)
            ]),
            l("div", e5, [
              h[3] || (h[3] = l("span", { class: "kpi-label" }, "Cache Read", -1)),
              l("span", a5, $(T(X)(e.data.total_cache_read_tokens)), 1)
            ]),
            l("div", s5, [
              h[4] || (h[4] = l("span", { class: "kpi-label" }, "Cache Write", -1)),
              l("span", n5, $(T(X)(e.data.total_cache_write_tokens)), 1)
            ])
          ])
        ])) : (m(), x("section", o5, [
          l("div", i5, [
            l("div", r5, [
              Q(T(Vt), { class: "empty-icon" })
            ]),
            h[5] || (h[5] = l("p", { class: "empty-title" }, "No token usage data", -1)),
            h[6] || (h[6] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see token consumption trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), d5 = /* @__PURE__ */ nt(c5, [["__scopeId", "data-v-e9e355be"]]), u5 = { class: "conversation-count-card" }, h5 = { class: "card-header" }, f5 = { class: "header-right" }, g5 = { class: "stat-badge" }, p5 = { class: "stat-value" }, v5 = {
  key: 0,
  class: "card-body"
}, b5 = {
  key: 0,
  class: "chart-section"
}, m5 = { class: "chart-container" }, y5 = {
  key: 1,
  class: "empty-state"
}, _5 = { class: "empty-state-content" }, x5 = { class: "empty-icon-wrapper" }, k5 = {
  key: 1,
  class: "loading-state"
}, w5 = /* @__PURE__ */ J({
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
    S(() => {
      if (a.data?.start_date && a.data?.end_date) {
        const c = o(a.data.start_date), d = o(a.data.end_date);
        return `${c} - ${d}`;
      }
      return "N/A";
    });
    const i = S(() => {
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
    }), r = S(() => a.options ? a.options : {
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
    return t({ isDark: s }), (c, d) => (m(), x("article", u5, [
      l("header", h5, [
        d[1] || (d[1] = l("div", { class: "header-left" }, [
          l("div", { class: "header-content" }, [
            l("h3", { class: "card-title" }, "Conversation Count"),
            l("p", { class: "card-subtitle" }, "Conversations over time")
          ])
        ], -1)),
        l("div", f5, [
          l("div", g5, [
            d[0] || (d[0] = l("span", { class: "stat-label" }, "Total", -1)),
            l("span", p5, $(e.data.total_conversations || 0), 1)
          ])
        ])
      ]),
      e.loading ? (m(), x("div", k5, [...d[4] || (d[4] = [
        st('<div class="loading-container" data-v-846f24b1><div class="chart-lines-loader" data-v-846f24b1><div class="line line-1" data-v-846f24b1></div><div class="line line-2" data-v-846f24b1></div><div class="line line-3" data-v-846f24b1></div><div class="line line-4" data-v-846f24b1></div><div class="line line-5" data-v-846f24b1></div></div><p class="loading-text" data-v-846f24b1>Loading chart data...</p></div>', 1)
      ])])) : (m(), x("div", v5, [
        i.value.labels && i.value.labels.length ? (m(), x("section", b5, [
          l("div", m5, [
            Q(ye, {
              data: i.value,
              options: r.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (m(), x("section", y5, [
          l("div", _5, [
            l("div", x5, [
              Q(T(Vt), { class: "empty-icon" })
            ]),
            d[2] || (d[2] = l("p", { class: "empty-title" }, "No conversation count data", -1)),
            d[3] || (d[3] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), $5 = /* @__PURE__ */ nt(w5, [["__scopeId", "data-v-846f24b1"]]), M5 = { class: "top-agents-card" }, S5 = {
  key: 0,
  class: "card-body"
}, C5 = {
  key: 0,
  class: "charts-grid"
}, D5 = { class: "chart-section" }, A5 = { class: "chart-container" }, T5 = { class: "chart-section" }, B5 = { class: "chart-container" }, L5 = {
  key: 1,
  class: "empty-state"
}, F5 = { class: "empty-state-content" }, P5 = { class: "empty-icon-wrapper" }, I5 = {
  key: 1,
  class: "loading-state"
}, R5 = /* @__PURE__ */ J({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s, colors: n } = ct(lt(a, "theme")), o = S(() => a.data?.top_agents && a.data.top_agents.length > 0), i = S(() => a.data?.top_agents ? [...a.data.top_agents].sort((p, v) => (v.total_cost || 0) - (p.total_cost || 0)) : []), r = S(() => a.data?.top_agents ? [...a.data.top_agents].sort((p, v) => (v.total_tokens || 0) - (p.total_tokens || 0)) : []), c = S(() => {
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
    }), d = S(() => {
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
    }), u = S(() => a.options ? a.options : {
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
              const v = p.label, f = a.data?.top_agents?.find((_) => _.agent_type === v);
              return f ? [
                `Total Cost: ${vt(f.total_cost)}`,
                `Input Cost: ${vt(f.total_input_tokens_cost)}`,
                `Output Cost: ${vt(f.total_output_tokens_cost)}`,
                `Cache Read: ${vt(f.total_read_tokens_cost)}`,
                `Cache Write: ${vt(f.total_write_tokens_cost)}`
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
              return vt(p);
            }
          }
        }
      }
    }), h = S(() => a.options ? a.options : {
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
              const v = p.label, f = a.data?.top_agents?.find((_) => _.agent_type === v);
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
    return t({ isDark: s }), (p, v) => (m(), x("article", M5, [
      v[5] || (v[5] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Top Agents Analysis"),
          l("p", { class: "card-subtitle" }, "Cost and token usage by agent")
        ])
      ], -1)),
      e.loading ? (m(), x("div", I5, [...v[4] || (v[4] = [
        st('<div class="loading-container" data-v-78efa6dc><div class="chart-lines-loader" data-v-78efa6dc><div class="line line-1" data-v-78efa6dc></div><div class="line line-2" data-v-78efa6dc></div><div class="line line-3" data-v-78efa6dc></div><div class="line line-4" data-v-78efa6dc></div><div class="line line-5" data-v-78efa6dc></div></div><p class="loading-text" data-v-78efa6dc>Loading chart data...</p></div>', 1)
      ])])) : (m(), x("div", S5, [
        o.value ? (m(), x("div", C5, [
          l("section", D5, [
            v[0] || (v[0] = l("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
            l("div", A5, [
              Q(ie, {
                data: c.value,
                options: u.value
              }, null, 8, ["data", "options"])
            ])
          ]),
          l("section", T5, [
            v[1] || (v[1] = l("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
            l("div", B5, [
              Q(ie, {
                data: d.value,
                options: h.value
              }, null, 8, ["data", "options"])
            ])
          ])
        ])) : (m(), x("section", L5, [
          l("div", F5, [
            l("div", P5, [
              Q(T(Vt), { class: "empty-icon" })
            ]),
            v[2] || (v[2] = l("p", { class: "empty-title" }, "No top agents data", -1)),
            v[3] || (v[3] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), E5 = /* @__PURE__ */ nt(R5, [["__scopeId", "data-v-78efa6dc"]]), O5 = { class: "top-agents-card" }, V5 = {
  key: 0,
  class: "card-body"
}, z5 = {
  key: 0,
  class: "chart-section"
}, N5 = { class: "chart-container" }, W5 = {
  key: 1,
  class: "empty-state"
}, H5 = { class: "empty-state-content" }, j5 = { class: "empty-icon-wrapper" }, Y5 = {
  key: 1,
  class: "loading-state"
}, K5 = /* @__PURE__ */ J({
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
    }, i = S(() => a.data?.top_agents ? a.data.top_agents.filter(
      (h) => h.agent_type?.toLowerCase() !== "triage"
    ) : []), r = S(() => i.value.length > 0), c = S(() => i.value.reduce((h, p) => h + (p.conversations || 0), 0)), d = S(() => {
      const h = i.value;
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const p = h.map((_) => {
        const b = _.agent_type?.toLowerCase();
        return (o[b] || "#a78bfa") + "80";
      }), v = h.map((_) => {
        const b = _.agent_type?.toLowerCase();
        return o[b] || "#a78bfa";
      });
      return {
        labels: h.map((_) => {
          const b = _.conversations || 0, g = c.value ? b / c.value * 100 : 0;
          return `${_.agent_type} - ${b.toLocaleString()} (${g.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((_) => _.conversations || 0),
            backgroundColor: p,
            borderColor: v,
            borderWidth: 2
          }
        ]
      };
    }), u = S(() => a.options ? a.options : {
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
              const p = (h.label || "").toString(), v = Number(h.parsed) || 0, f = (h.dataset.data || []).reduce((b, g) => b + (Number(g) || 0), 0), _ = f ? v / f * 100 : 0;
              return `${p}: ${v.toLocaleString()} (${_.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: s }), (h, p) => (m(), x("article", O5, [
      p[3] || (p[3] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Top Agents"),
          l("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (m(), x("div", Y5, [...p[2] || (p[2] = [
        st('<div class="loading-container" data-v-05e3e74d><div class="chart-lines-loader" data-v-05e3e74d><div class="line line-1" data-v-05e3e74d></div><div class="line line-2" data-v-05e3e74d></div><div class="line line-3" data-v-05e3e74d></div><div class="line line-4" data-v-05e3e74d></div><div class="line line-5" data-v-05e3e74d></div></div><p class="loading-text" data-v-05e3e74d>Loading chart data...</p></div>', 1)
      ])])) : (m(), x("div", V5, [
        r.value ? (m(), x("section", z5, [
          l("div", N5, [
            Q(Qa, {
              data: d.value,
              options: u.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (m(), x("section", W5, [
          l("div", H5, [
            l("div", j5, [
              Q(T(Vt), { class: "empty-icon" })
            ]),
            p[0] || (p[0] = l("p", { class: "empty-title" }, "No top agents data", -1)),
            p[1] || (p[1] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), U5 = /* @__PURE__ */ nt(K5, [["__scopeId", "data-v-05e3e74d"]]), q5 = { class: "daily-cost-trends-card" }, X5 = {
  key: 0,
  class: "card-body"
}, G5 = {
  key: 0,
  class: "chart-section"
}, Z5 = { class: "chart-container" }, Q5 = {
  key: 1,
  class: "empty-state"
}, J5 = { class: "empty-state-content" }, tw = { class: "empty-icon-wrapper" }, ew = {
  key: 1,
  class: "loading-state"
}, aw = /* @__PURE__ */ J({
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
      const u = new Date(d), h = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = S(() => {
      const d = a.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(d) && d.length > 0)
        return !0;
      const u = a.costData?.costs_by_day || {}, h = a.conversationData?.conversations_by_day || {};
      return Object.keys(u).length > 0 && Object.keys(h).length > 0;
    }), r = S(() => {
      const d = a.costData?.daily_mean_cost_per_conversation || [];
      if (d.length > 0) {
        const b = [...d].sort((g, y) => g.date.localeCompare(y.date));
        return {
          labels: b.map((g) => o(g.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: b.map((g) => Number(g.value) || 0),
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
      const u = a.costData?.costs_by_day || {}, h = a.conversationData?.conversations_by_day || {}, v = Object.keys(u).filter((b) => h[b]).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const f = v.map((b) => o(b)), _ = v.map((b) => {
        const g = u[b]?.total_cost || 0, y = h[b] || 0;
        return y > 0 ? g / y : 0;
      });
      return {
        labels: f,
        datasets: [
          {
            label: "Mean USD/conv",
            data: _,
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
    }), c = S(() => a.options ? a.options : {
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
              return u && (u += ": "), d.parsed.y !== null && (u += vt(d.parsed.y)), u;
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
              return vt(d);
            }
          }
        }
      }
    });
    return t({ isDark: s }), (d, u) => (m(), x("article", q5, [
      u[3] || (u[3] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Daily Cost Trends"),
          l("p", { class: "card-subtitle" }, "Mean USD/conversation per day")
        ])
      ], -1)),
      e.loading ? (m(), x("div", ew, [...u[2] || (u[2] = [
        st('<div class="loading-container" data-v-e5bac1c5><div class="chart-lines-loader" data-v-e5bac1c5><div class="line line-1" data-v-e5bac1c5></div><div class="line line-2" data-v-e5bac1c5></div><div class="line line-3" data-v-e5bac1c5></div><div class="line line-4" data-v-e5bac1c5></div><div class="line line-5" data-v-e5bac1c5></div></div><p class="loading-text" data-v-e5bac1c5>Loading chart data...</p></div>', 1)
      ])])) : (m(), x("div", X5, [
        i.value ? (m(), x("section", G5, [
          l("div", Z5, [
            Q(ye, {
              data: r.value,
              options: c.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (m(), x("section", Q5, [
          l("div", J5, [
            l("div", tw, [
              Q(T(Vt), { class: "empty-icon" })
            ]),
            u[0] || (u[0] = l("p", { class: "empty-title" }, "No daily cost trends data", -1)),
            u[1] || (u[1] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), sw = /* @__PURE__ */ nt(aw, [["__scopeId", "data-v-e5bac1c5"]]), nw = { class: "model-usage-card" }, ow = {
  key: 0,
  class: "loading-state"
}, iw = {
  key: 1,
  class: "card-body"
}, rw = { class: "tabs-container" }, lw = {
  class: "tabs-nav",
  "aria-label": "Model Usage Tabs"
}, cw = ["aria-selected"], dw = ["aria-selected"], uw = {
  key: 0,
  class: "table-section"
}, hw = { class: "table-wrapper" }, fw = { class: "data-table" }, gw = { class: "table-header-row" }, pw = { class: "table-header" }, vw = { class: "table-body" }, bw = { class: "table-cell name-cell" }, mw = { class: "table-cell text-center" }, yw = { class: "table-cell text-center" }, _w = { class: "table-cell text-center" }, xw = { class: "table-cell text-center cost-cell" }, kw = { class: "table-cell text-center" }, ww = {
  key: 1,
  class: "empty-state"
}, $w = { class: "empty-state-content" }, Mw = { class: "empty-icon-wrapper" }, Sw = /* @__PURE__ */ J({
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
    }, { isDark: i } = ct(lt(s, "theme")), r = at("by_model"), c = S(() => r.value === "by_model" ? s.data?.total_by_model || {} : s.data?.total_by_provider || {}), d = (h) => h == null ? "0" : X(h), u = (h) => h == null ? "$0.00" : vt(h);
    return t({ isDark: i }), (h, p) => (m(), x("article", nw, [
      p[10] || (p[10] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Model Usage"),
          l("p", { class: "card-subtitle" }, "AI model performance and costs")
        ])
      ], -1)),
      e.loading ? (m(), x("div", ow, [...p[2] || (p[2] = [
        st('<div class="loading-container" data-v-a7bf2d7b><div class="chart-bars-loader" data-v-a7bf2d7b><div class="bar bar-1" data-v-a7bf2d7b></div><div class="bar bar-2" data-v-a7bf2d7b></div><div class="bar bar-3" data-v-a7bf2d7b></div><div class="bar bar-4" data-v-a7bf2d7b></div><div class="bar bar-5" data-v-a7bf2d7b></div></div><p class="loading-text" data-v-a7bf2d7b>Loading model usage data...</p></div>', 1)
      ])])) : (m(), x("div", iw, [
        l("div", rw, [
          l("nav", lw, [
            l("button", {
              onClick: p[0] || (p[0] = (v) => r.value = "by_model"),
              class: K(["tab-button", { "tab-active": r.value === "by_model" }]),
              "aria-selected": r.value === "by_model",
              role: "tab"
            }, " Model ", 10, cw),
            l("button", {
              onClick: p[1] || (p[1] = (v) => r.value = "by_provider"),
              class: K(["tab-button", { "tab-active": r.value === "by_provider" }]),
              "aria-selected": r.value === "by_provider",
              role: "tab"
            }, " Provider ", 10, dw)
          ])
        ]),
        c.value && Object.keys(c.value).length > 0 ? (m(), x("div", uw, [
          l("div", hw, [
            l("table", fw, [
              l("thead", null, [
                l("tr", gw, [
                  l("th", pw, $(r.value === "by_model" ? "Model" : "Provider"), 1),
                  p[3] || (p[3] = l("th", { class: "table-header" }, "Avg cost per message", -1)),
                  p[4] || (p[4] = l("th", { class: "table-header" }, "Avg tokens per message", -1)),
                  p[5] || (p[5] = l("th", { class: "table-header" }, "Message count", -1)),
                  p[6] || (p[6] = l("th", { class: "table-header" }, "Total cost", -1)),
                  p[7] || (p[7] = l("th", { class: "table-header" }, "Total tokens", -1))
                ])
              ]),
              l("tbody", vw, [
                (m(!0), x(q, null, tt(c.value, (v, f) => (m(), x("tr", {
                  key: f,
                  class: "table-row"
                }, [
                  l("td", bw, $(f), 1),
                  l("td", mw, $(u(v.avg_cost_per_message)), 1),
                  l("td", yw, $(d(v.avg_tokens_per_message)), 1),
                  l("td", _w, $(d(v.message_count)), 1),
                  l("td", xw, $(u(v.total_cost)), 1),
                  l("td", kw, $(d(v.total_tokens)), 1)
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (m(), dt(T(xt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (m(), x("div", ww, [
          l("div", $w, [
            l("div", Mw, [
              Q(T(Vt), { class: "empty-icon" })
            ]),
            p[8] || (p[8] = l("p", { class: "empty-title" }, "No model usage data available", -1)),
            p[9] || (p[9] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Cw = /* @__PURE__ */ nt(Sw, [["__scopeId", "data-v-a7bf2d7b"]]), Dw = { class: "message-roles-card" }, Aw = {
  key: 0,
  class: "loading-state"
}, Tw = {
  key: 1,
  class: "card-body"
}, Bw = {
  key: 0,
  class: "table-section"
}, Lw = { class: "table-wrapper" }, Fw = { class: "data-table" }, Pw = { class: "table-body" }, Iw = { class: "table-cell name-cell" }, Rw = { class: "table-cell text-center" }, Ew = { class: "table-cell text-center" }, Ow = { class: "table-cell text-center" }, Vw = { class: "table-cell text-center cost-cell" }, zw = { class: "table-cell text-center" }, Nw = {
  key: 1,
  class: "empty-state"
}, Ww = { class: "empty-state-content" }, Hw = { class: "empty-icon-wrapper" }, jw = /* @__PURE__ */ J({
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
    }, { isDark: i } = ct(lt(s, "theme")), r = ["assistant", "system", "user"], c = S(() => s.data?.total_by_role || {}), d = S(() => Object.keys(c.value).length > 0), u = (v) => v == null ? "0" : X(v), h = (v) => v == null ? "$0.00" : vt(v), p = (v) => v.charAt(0).toUpperCase() + v.slice(1);
    return t({ isDark: i }), (v, f) => (m(), x("article", Dw, [
      f[4] || (f[4] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Message Roles"),
          l("p", { class: "card-subtitle" }, "Performance by message role")
        ])
      ], -1)),
      e.loading ? (m(), x("div", Aw, [...f[0] || (f[0] = [
        st('<div class="loading-container" data-v-6a953cfc><div class="chart-bars-loader" data-v-6a953cfc><div class="bar bar-1" data-v-6a953cfc></div><div class="bar bar-2" data-v-6a953cfc></div><div class="bar bar-3" data-v-6a953cfc></div><div class="bar bar-4" data-v-6a953cfc></div><div class="bar bar-5" data-v-6a953cfc></div></div><p class="loading-text" data-v-6a953cfc>Loading message role data...</p></div>', 1)
      ])])) : (m(), x("div", Tw, [
        d.value ? (m(), x("div", Bw, [
          l("div", Lw, [
            l("table", Fw, [
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
              l("tbody", Pw, [
                (m(), x(q, null, tt(r, (_) => l("tr", {
                  key: _,
                  class: "table-row"
                }, [
                  l("td", Iw, $(p(_)), 1),
                  l("td", Rw, $(h(c.value[_]?.avg_cost_per_message)), 1),
                  l("td", Ew, $(u(c.value[_]?.avg_tokens_per_message)), 1),
                  l("td", Ow, $(u(c.value[_]?.message_count)), 1),
                  l("td", Vw, $(h(c.value[_]?.total_cost)), 1),
                  l("td", zw, $(u(c.value[_]?.total_tokens)), 1)
                ])), 64))
              ])
            ])
          ]),
          e.enableExport ? (m(), dt(T(xt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (m(), x("div", Nw, [
          l("div", Ww, [
            l("div", Hw, [
              Q(T(Vt), { class: "empty-icon" })
            ]),
            f[2] || (f[2] = l("p", { class: "empty-title" }, "No message role data available", -1)),
            f[3] || (f[3] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Yw = /* @__PURE__ */ nt(jw, [["__scopeId", "data-v-6a953cfc"]]), Kw = { class: "cost-per-conversation-card" }, Uw = {
  key: 0,
  class: "card-body"
}, qw = {
  key: 0,
  class: "chart-section"
}, Xw = { class: "chart-container" }, Gw = { class: "kpi-grid" }, Zw = { class: "kpi-card" }, Qw = { class: "kpi-value" }, Jw = { class: "kpi-card" }, t$ = { class: "kpi-value" }, e$ = { class: "kpi-card" }, a$ = { class: "kpi-value" }, s$ = { class: "kpi-card highlighted" }, n$ = { class: "kpi-value gradient-text" }, o$ = {
  key: 1,
  class: "empty-state"
}, i$ = { class: "empty-state-content" }, r$ = { class: "empty-icon-wrapper" }, l$ = {
  key: 1,
  class: "loading-state"
}, c$ = /* @__PURE__ */ J({
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
    const s = e, n = a, o = (y) => {
      n("export", y);
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
    }, d = (y) => y.agent_type || y.agent_id || y.agent_name || "", u = (y) => y.agent_name ? y.agent_name : d(y).split("_").map((k) => k.charAt(0).toUpperCase() + k.slice(1)).join(" ").replace(/V\d+$/, "").trim(), h = (y) => {
      const w = d(y).toLowerCase();
      for (const [k, M] of Object.entries(c))
        if (w.includes(k))
          return M;
      return "#9ca3af";
    }, p = S(() => [...s.data?.top_agents || []].sort((w, k) => k.avg_cost_per_conversation - w.avg_cost_per_conversation)), v = S(() => s.data?.total_conversations !== void 0 ? Number(s.data.total_conversations) || 0 : p.value.reduce((y, w) => y + w.conversations, 0)), f = S(() => s.data?.total_cost !== void 0 ? Number(s.data.total_cost) || 0 : p.value.reduce((y, w) => y + w.total_cost, 0)), _ = S(() => s.data?.overall_avg_cost_per_conversation !== void 0 ? Number(s.data.overall_avg_cost_per_conversation) || 0 : v.value === 0 ? 0 : f.value / v.value), b = S(() => {
      const y = p.value;
      if (y.length === 0)
        return { labels: [], datasets: [] };
      const w = y.map((C) => u(C)), k = y.map((C) => C.avg_cost_per_conversation), M = y.map((C) => h(C));
      return {
        labels: w,
        datasets: [
          {
            label: "USD per conversation",
            data: k,
            backgroundColor: M.map((C) => `${C}80`),
            borderColor: M,
            borderWidth: 1
          }
        ]
      };
    }), g = S(() => s.options ? s.options : {
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
            label: function(y) {
              const w = p.value[y.dataIndex];
              return [
                `Cost: ${vt(y.parsed.x)}`,
                `Conversations: ${X(w.conversations)}`,
                `Total Cost: ${vt(w.total_cost)}`
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
            callback: function(y) {
              return vt(y);
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
    return t({ isDark: i }), (y, w) => (m(), x("article", Kw, [
      w[7] || (w[7] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Cost Per Conversation"),
          l("p", { class: "card-subtitle" }, "USD per conversation by agent")
        ])
      ], -1)),
      e.loading ? (m(), x("div", l$, [...w[6] || (w[6] = [
        st('<div class="loading-container" data-v-17f6615c><div class="chart-bars-loader" data-v-17f6615c><div class="bar bar-1" data-v-17f6615c></div><div class="bar bar-2" data-v-17f6615c></div><div class="bar bar-3" data-v-17f6615c></div><div class="bar bar-4" data-v-17f6615c></div><div class="bar bar-5" data-v-17f6615c></div></div><p class="loading-text" data-v-17f6615c>Loading agent costs...</p></div>', 1)
      ])])) : (m(), x("div", Uw, [
        b.value.labels && b.value.labels.length ? (m(), x("section", qw, [
          l("div", Xw, [
            Q(ie, {
              data: b.value,
              options: g.value
            }, null, 8, ["data", "options"])
          ]),
          l("footer", Gw, [
            l("div", Zw, [
              w[0] || (w[0] = l("span", { class: "kpi-label" }, "Total Agents", -1)),
              l("span", Qw, $(p.value.length), 1)
            ]),
            l("div", Jw, [
              w[1] || (w[1] = l("span", { class: "kpi-label" }, "Total Conversations", -1)),
              l("span", t$, $(T(X)(v.value)), 1)
            ]),
            l("div", e$, [
              w[2] || (w[2] = l("span", { class: "kpi-label" }, "Total Cost", -1)),
              l("span", a$, $(T(vt)(f.value)), 1)
            ]),
            l("div", s$, [
              w[3] || (w[3] = l("span", { class: "kpi-label" }, "Avg Cost / Conv.", -1)),
              l("span", n$, $(T(vt)(_.value)), 1)
            ])
          ]),
          e.enableExport ? (m(), dt(T(xt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (m(), x("section", o$, [
          l("div", i$, [
            l("div", r$, [
              Q(T(Vt), { class: "empty-icon" })
            ]),
            w[4] || (w[4] = l("p", { class: "empty-title" }, "No cost per conversation data", -1)),
            w[5] || (w[5] = l("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), d$ = /* @__PURE__ */ nt(c$, [["__scopeId", "data-v-17f6615c"]]);
function Ft() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const u$ = { class: "tabs text-sm" }, h$ = ["aria-label"], f$ = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], g$ = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, p$ = /* @__PURE__ */ J({
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
    const a = e, s = t, n = at([]), o = `tabs-${Ft()}`, i = (f) => `${o}-tab-${f}`, r = S(
      () => a.items.map((f, _) => f.disabled ? -1 : _).filter((f) => f >= 0)
    );
    function c(f) {
      return f.value === a.modelValue;
    }
    function d(f) {
      const _ = c(f), g = `${a.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-full min-h-0 cursor-pointer rounded-lg border border-transparent text-center outline-none transition-[background-color,color,box-shadow,opacity,transform] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return f.disabled ? `${g} cursor-not-allowed opacity-40` : _ ? `${g} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${g} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function u(f, _) {
      f === _ || a.items.find((g) => g.value === f)?.disabled || (s("update:modelValue", f), s("change", { value: f, previousValue: _ }));
    }
    function h(f, _) {
      s("tab-click", { value: f.value, originalEvent: _ }), !f.disabled && (u(f.value, a.modelValue), St(() => {
        n.value[a.items.indexOf(f)]?.focus();
      }));
    }
    function p(f, _) {
      const b = a.items.length;
      if (b === 0) return 0;
      let g = f;
      for (let y = 0; y < b; y++)
        if (g = (g + _ + b) % b, !a.items[g]?.disabled) return g;
      return f;
    }
    async function v(f, _) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(f.key)) return;
      f.preventDefault();
      let g = _;
      f.key === "ArrowLeft" ? g = p(_, -1) : f.key === "ArrowRight" ? g = p(_, 1) : f.key === "Home" ? g = r.value[0] ?? 0 : f.key === "End" && (g = r.value[r.value.length - 1] ?? _);
      const y = a.items[g];
      !y || y.disabled || (u(y.value, a.modelValue), await St(), n.value[g]?.focus());
    }
    return (f, _) => (m(), x("div", u$, [
      l("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: K([
          "box-border h-10 flex-wrap items-stretch gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 p-0.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (m(!0), x(q, null, tt(e.items, (b, g) => (m(), x("button", {
          id: i(b.value),
          key: b.value,
          ref_for: !0,
          ref_key: "tabRefs",
          ref: n,
          type: "button",
          role: "tab",
          "aria-selected": c(b),
          "aria-disabled": b.disabled === !0,
          tabindex: c(b) ? 0 : -1,
          class: K(d(b)),
          onClick: (y) => h(b, y),
          onKeydown: (y) => v(y, g)
        }, [
          l("span", {
            class: K(["flex h-full min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            b.icon ? (m(), dt(ca(b.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : E("", !0),
            l("span", g$, $(b.label), 1)
          ], 2)
        ], 42, f$))), 128))
      ], 10, h$),
      f.$slots.default ? (m(), dt(Is, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: Ee(() => [
          (m(), x("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            It(f.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : E("", !0)
    ]));
  }
}), v$ = /* @__PURE__ */ nt(p$, [["__scopeId", "data-v-0cc67b12"]]), b$ = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, m$ = { class: "overflow-x-auto" }, y$ = { class: "kiut-table w-full min-w-[640px] border-collapse text-left text-sm" }, _$ = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, x$ = {
  key: 0,
  scope: "col",
  class: "w-12 px-4 py-3 text-center align-middle"
}, k$ = ["checked", "aria-label"], w$ = {
  key: 0,
  class: "w-12 bg-transparent px-4 py-3 text-center align-middle"
}, $$ = ["checked", "aria-label", "onChange"], M$ = /* @__PURE__ */ J({
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
    function o(y) {
      return `cell-${y}`;
    }
    function i(y) {
      return y === "center" ? "text-center" : y === "right" ? "text-right" : "text-left";
    }
    function r(y, w) {
      if (typeof a.rowKey == "function")
        return a.rowKey(y);
      const k = y[a.rowKey];
      return k != null ? String(k) : `__index_${w}`;
    }
    function c(y, w) {
      return y[w];
    }
    function d(y) {
      return y == null || typeof y == "object" ? "" : String(y);
    }
    function u(y, w) {
      return r(y, w);
    }
    const h = S(() => a.rows.map((y, w) => r(y, w)));
    function p(y, w) {
      const k = r(y, w);
      return a.selectedKeys.includes(k);
    }
    const v = S(() => !a.selectable || a.rows.length === 0 ? !1 : h.value.every((y) => a.selectedKeys.includes(y))), f = S(() => {
      if (!a.selectable || a.rows.length === 0) return !1;
      const y = h.value.filter((w) => a.selectedKeys.includes(w));
      return y.length > 0 && y.length < a.rows.length;
    });
    Rt(
      [f, v, () => a.selectable],
      async () => {
        await St();
        const y = n.value;
        y && (y.indeterminate = f.value && !v.value);
      },
      { immediate: !0 }
    );
    function _() {
      if (a.selectable)
        if (v.value) {
          const y = a.selectedKeys.filter((w) => !h.value.includes(w));
          s("update:selectedKeys", y);
        } else {
          const y = new Set(a.selectedKeys);
          h.value.forEach((w) => y.add(w)), s("update:selectedKeys", [...y]);
        }
    }
    function b(y, w) {
      if (!a.selectable) return;
      const k = r(y, w);
      a.selectedKeys.includes(k) ? s(
        "update:selectedKeys",
        a.selectedKeys.filter((C) => C !== k)
      ) : s("update:selectedKeys", [...a.selectedKeys, k]);
    }
    function g(y, w) {
      const k = r(y, w);
      return `${a.ariaLabelSelectRow} ${k}`;
    }
    return (y, w) => (m(), x("div", b$, [
      l("div", m$, [
        l("table", y$, [
          l("thead", null, [
            l("tr", _$, [
              e.selectable ? (m(), x("th", x$, [
                l("input", {
                  ref_key: "selectAllRef",
                  ref: n,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: v.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: _
                }, null, 40, k$)
              ])) : E("", !0),
              (m(!0), x(q, null, tt(e.columns, (k) => (m(), x("th", {
                key: k.key,
                scope: "col",
                class: K([
                  "px-4 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  k.headerClass ?? "",
                  "!text-left"
                ])
              }, $(k.label), 3))), 128))
            ])
          ]),
          l("tbody", null, [
            (m(!0), x(q, null, tt(e.rows, (k, M) => (m(), x("tr", {
              key: u(k, M),
              class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]"
            }, [
              e.selectable ? (m(), x("td", w$, [
                l("input", {
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: p(k, M),
                  "aria-label": g(k, M),
                  onChange: (C) => b(k, M)
                }, null, 40, $$)
              ])) : E("", !0),
              (m(!0), x(q, null, tt(e.columns, (C) => (m(), x("td", {
                key: C.key,
                class: K([
                  "bg-transparent px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                  i(C.align),
                  C.cellClass ?? ""
                ])
              }, [
                It(y.$slots, o(C.key), {
                  row: k,
                  column: C,
                  value: c(k, C.key)
                }, () => [
                  kt($(d(c(k, C.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), S$ = /* @__PURE__ */ nt(M$, [["__scopeId", "data-v-1928de95"]]);
function C$(e, t) {
  return m(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    l("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function D$(e, t) {
  return m(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    l("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const A$ = ["aria-label"], T$ = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, B$ = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, L$ = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, F$ = ["aria-label", "aria-expanded", "aria-controls", "onClick"], P$ = { class: "truncate" }, I$ = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, R$ = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, E$ = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, O$ = ["aria-label", "onClick"], V$ = ["aria-label", "onClick"], z$ = ["aria-label"], N$ = ["aria-label"], W$ = {
  key: 1,
  class: "space-y-2"
}, H$ = ["for"], j$ = ["id", "placeholder", "onKeydown"], Y$ = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, K$ = ["aria-label"], U$ = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, q$ = ["checked", "onChange"], X$ = { class: "min-w-0 flex-1" }, G$ = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, Z$ = { class: "flex flex-wrap items-end gap-2" }, Q$ = { class: "min-w-[120px] flex-1" }, J$ = ["for"], t4 = ["id"], e4 = { class: "min-w-[120px] flex-1" }, a4 = ["for"], s4 = ["id"], n4 = /* @__PURE__ */ J({
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
    const a = e, s = t, n = Oo(), i = `${`kiut-filters-${Ft()}`}-panel`, r = at(null), c = /* @__PURE__ */ new Map(), d = at(null), u = at(!1), h = at({}), p = at(null), v = at(""), f = at([]), _ = at(""), b = at(""), g = S(() => d.value ? a.filterDefinitions.find((R) => R.id === d.value) ?? null : null), y = S(() => {
      const R = g.value;
      if (R)
        return R.type === "text" ? v.value : R.type === "select" ? f.value : { start: _.value, end: b.value };
    });
    function w(R, z) {
      z && z instanceof HTMLElement ? c.set(R, z) : c.delete(R);
    }
    function k(R) {
      return a.modelValue[R];
    }
    function M(R) {
      if (R == null) return [];
      if (Array.isArray(R))
        return R.filter((z) => typeof z == "string" && z.trim() !== "");
      if (typeof R == "string") {
        const z = R.trim();
        return z ? [z] : [];
      }
      return [];
    }
    function C(R, z) {
      if (z == null) return !0;
      if (R.type === "text") return String(z).trim() === "";
      if (R.type === "select") return M(z).length === 0;
      if (R.type === "dateRange") {
        const Z = z;
        return !Z?.start?.trim() || !Z?.end?.trim();
      }
      return !0;
    }
    const D = S(
      () => a.filterDefinitions.some((R) => !C(R, k(R.id)))
    ), A = S(() => {
      const R = [];
      for (const z of a.filterDefinitions) {
        const Z = k(z.id);
        if (!C(z, Z)) {
          if (z.type === "text")
            R.push({ kind: "text", def: z, key: z.id });
          else if (z.type === "dateRange")
            R.push({ kind: "dateRange", def: z, key: z.id });
          else if (z.type === "select")
            for (const ut of M(Z))
              R.push({
                kind: "select",
                def: z,
                optionValue: ut,
                key: `${z.id}::${ut}`
              });
        }
      }
      return R;
    });
    function B(R) {
      return R.type !== "select" ? 0 : M(k(R.id)).length;
    }
    function L(R) {
      const z = k(R.id), Z = R.label.replace(/^\+\s*/, "");
      if (R.type === "text") return `${Z}: ${String(z ?? "").trim()}`;
      if (R.type === "select") {
        const Ki = M(z).map((an) => R.options.find((Ui) => Ui.value === an)?.label ?? an);
        return `${Z}: ${Ki.join(", ")}`;
      }
      const ut = z, Nt = O(ut.start), ue = O(ut.end);
      return `${Z}: ${Nt} – ${ue}`;
    }
    function F(R) {
      return R.kind === "text" || R.kind === "dateRange" ? L(R.def) : R.def.options.find((Z) => Z.value === R.optionValue)?.label ?? R.optionValue;
    }
    function O(R) {
      if (!R) return "";
      const z = At(R, "YYYY-MM-DD", !0);
      return z.isValid() ? z.format("L") : R;
    }
    function W(R) {
      const z = d.value === R.id && u.value, Z = !C(R, k(R.id));
      return z || Z ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-slate-400/90 text-[color:var(--kiut-text-secondary)] hover:border-[color:var(--kiut-primary)]/50 hover:bg-slate-50 dark:border-slate-500 dark:text-slate-400 dark:hover:border-[color:var(--kiut-primary-light)]/40 dark:hover:bg-white/[0.04]";
    }
    function P(R) {
      return C(R, k(R.id)) ? de(R) : `Editar filtro ${R.label.replace(/^\+\s*/, "")}`;
    }
    function I(R) {
      const z = k(R.id);
      if (R.type === "text") {
        v.value = z != null ? String(z) : "";
        return;
      }
      if (R.type === "select") {
        f.value = [...M(z)];
        return;
      }
      const Z = z;
      _.value = Z?.start?.trim() ?? "", b.value = Z?.end?.trim() ?? "";
    }
    function V() {
      const R = g.value;
      if (!R || R.type !== "select") return;
      const z = { ...a.modelValue };
      f.value.length === 0 ? delete z[R.id] : z[R.id] = [...f.value], s("update:modelValue", z), s("change", z);
    }
    function H(R) {
      const z = f.value.indexOf(R);
      z >= 0 ? f.value = f.value.filter((Z, ut) => ut !== z) : f.value = [...f.value, R], V();
    }
    function Y(R) {
      if (!R) return;
      p.value = R;
      const z = R.getBoundingClientRect(), Z = 300;
      let ut = z.left;
      const Nt = window.innerWidth - Z - 12;
      ut > Nt && (ut = Math.max(12, Nt)), ut < 12 && (ut = 12);
      const ue = z.bottom + 8;
      h.value = {
        top: `${ue}px`,
        left: `${ut}px`,
        width: `${Math.min(Z, window.innerWidth - 24)}px`
      };
    }
    function j(R, z) {
      if (d.value === R.id && u.value) {
        ot();
        return;
      }
      u.value && d.value !== R.id && ot(), d.value = R.id, u.value = !0, I(R), St().then(async () => {
        Y(z.currentTarget), await St(), et();
      });
    }
    function N(R, z) {
      if (d.value === R.id && u.value) {
        ot();
        return;
      }
      u.value && d.value !== R.id && ot(), d.value = R.id, u.value = !0, I(R), St().then(async () => {
        const Z = c.get(R.id) ?? z.currentTarget;
        Y(Z), await St(), et();
      });
    }
    function et() {
      const R = r.value;
      if (!R) return;
      R.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function G() {
      u.value = !1, d.value = null, p.value = null;
    }
    function U(R) {
      const z = g.value;
      if (!z) return;
      if (z.type === "text") {
        v.value = R != null ? String(R) : "";
        return;
      }
      if (z.type === "select") {
        f.value = Array.isArray(R) ? R.filter((ut) => typeof ut == "string") : M(R);
        return;
      }
      const Z = R;
      _.value = Z?.start?.trim() ?? "", b.value = Z?.end?.trim() ?? "";
    }
    function ot() {
      const R = g.value;
      if (!R) return;
      if (R.type === "text") {
        const Nt = v.value.trim(), ue = { ...a.modelValue };
        Nt === "" ? delete ue[R.id] : ue[R.id] = Nt, s("update:modelValue", ue), s("change", ue), G();
        return;
      }
      if (R.type === "select") {
        V(), G();
        return;
      }
      const z = _.value.trim(), Z = b.value.trim(), ut = { ...a.modelValue };
      !z || !Z || z > Z ? delete ut[R.id] : ut[R.id] = { start: z, end: Z }, s("update:modelValue", ut), s("change", ut), G();
    }
    function wt(R) {
      const z = { ...a.modelValue };
      delete z[R], s("update:modelValue", z), s("change", z), d.value === R && G();
    }
    function ft(R) {
      if (R.kind === "text" || R.kind === "dateRange") {
        wt(R.def.id);
        return;
      }
      const z = { ...a.modelValue }, ut = M(z[R.def.id]).filter((Nt) => Nt !== R.optionValue);
      ut.length === 0 ? delete z[R.def.id] : z[R.def.id] = ut, s("update:modelValue", z), s("change", z), d.value === R.def.id && I(R.def);
    }
    function Pt() {
      const R = {};
      s("update:modelValue", R), s("change", R), G();
    }
    const zt = S(() => {
      const R = g.value;
      return R ? `Editar filtro: ${R.label}` : "Filtro";
    });
    function Kt(R) {
      const z = R.def.label.replace(/^\+\s*/, "");
      return R.kind === "select" ? `Quitar ${R.def.options.find((Nt) => Nt.value === R.optionValue)?.label ?? R.optionValue} del filtro ${z}` : `Quitar filtro ${z}`;
    }
    function rt(R) {
      const z = R.def.label.replace(/^\+\s*/, "");
      if (R.kind === "select") {
        const ut = R.def.options.find((Nt) => Nt.value === R.optionValue)?.label ?? R.optionValue;
        return `Editar filtro ${z}: ${ut}`;
      }
      return `Editar filtro ${z}`;
    }
    function de(R) {
      return `Añadir filtro ${R.label.replace(/^\+\s*/, "")}`;
    }
    const en = S(() => a.clearLabel);
    function Ke(R) {
      if (!u.value || !r.value) return;
      const z = R.target;
      if (!(r.value.contains(z) || (z instanceof Element ? z : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const ut of c.values())
          if (ut?.contains(z)) return;
        ot();
      }
    }
    function ya(R) {
      R.key === "Escape" && u.value && (R.preventDefault(), G());
    }
    function Ue() {
      !u.value || !p.value || Y(p.value);
    }
    return re(() => {
      document.addEventListener("mousedown", Ke, !0), window.addEventListener("keydown", ya, !0), window.addEventListener("resize", Ue);
    }), Eo(() => {
      document.removeEventListener("mousedown", Ke, !0), window.removeEventListener("keydown", ya, !0), window.removeEventListener("resize", Ue);
    }), Rt(
      () => a.modelValue,
      () => {
        const R = g.value;
        R && u.value && !n.panel && I(R);
      },
      { deep: !0 }
    ), (R, z) => (m(), x("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      l("div", T$, [
        l("span", B$, $(e.label), 1),
        l("div", L$, [
          (m(!0), x(q, null, tt(e.filterDefinitions, (Z) => (m(), x("button", {
            key: `pill-${Z.id}`,
            ref_for: !0,
            ref: (ut) => w(Z.id, ut),
            type: "button",
            class: K(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", W(Z)]),
            "aria-label": P(Z),
            "aria-expanded": d.value === Z.id,
            "aria-haspopup": !0,
            "aria-controls": d.value === Z.id ? i : void 0,
            onClick: (ut) => N(Z, ut)
          }, [
            Q(T(C$), {
              class: "h-3.5 w-3.5 shrink-0",
              "aria-hidden": "true"
            }),
            l("span", P$, $(Z.label), 1),
            Z.type === "select" && B(Z) > 0 ? (m(), x("span", I$, $(B(Z)), 1)) : E("", !0)
          ], 10, F$))), 128))
        ])
      ]),
      D.value ? (m(), x("div", R$, [
        l("div", E$, [
          (m(!0), x(q, null, tt(A.value, (Z) => (m(), x("div", {
            key: Z.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            l("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": rt(Z),
              onClick: (ut) => j(Z.def, ut)
            }, [
              It(R.$slots, "formatChip", {
                filter: Z.def,
                value: k(Z.def.id),
                optionValue: Z.kind === "select" ? Z.optionValue : void 0
              }, () => [
                kt($(F(Z)), 1)
              ], !0)
            ], 8, O$),
            l("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": Kt(Z),
              onClick: (ut) => ft(Z)
            }, [
              Q(T(D$), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, V$)
          ]))), 128))
        ]),
        l("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": en.value,
          onClick: Pt
        }, $(e.clearLabel), 9, z$)
      ])) : E("", !0),
      (m(), dt(Rs, { to: "body" }, [
        d.value && u.value ? (m(), x("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: r,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": zt.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: bt(h.value),
          onKeydown: z[3] || (z[3] = Jt(() => {
          }, ["stop"]))
        }, [
          g.value ? (m(), x(q, { key: 0 }, [
            R.$slots.panel ? It(R.$slots, "panel", {
              key: 0,
              filter: g.value,
              close: ot,
              value: y.value,
              updateValue: U
            }, void 0, !0) : (m(), x("div", W$, [
              g.value.type === "text" ? (m(), x(q, { key: 0 }, [
                l("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, $(g.value.label), 9, H$),
                Ut(l("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": z[0] || (z[0] = (Z) => v.value = Z),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: g.value.placeholder ?? "…",
                  onKeydown: Ra(Jt(ot, ["prevent"]), ["enter"])
                }, null, 40, j$), [
                  [Oe, v.value]
                ])
              ], 64)) : g.value.type === "select" ? (m(), x(q, { key: 1 }, [
                l("p", Y$, $(g.value.label), 1),
                l("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": g.value.label,
                  "aria-multiselectable": !0
                }, [
                  (m(!0), x(q, null, tt(g.value.options, (Z) => (m(), x("li", {
                    key: Z.value
                  }, [
                    l("label", U$, [
                      l("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: f.value.includes(Z.value),
                        onChange: (ut) => H(Z.value)
                      }, null, 40, q$),
                      l("span", X$, $(Z.label), 1)
                    ])
                  ]))), 128))
                ], 8, K$)
              ], 64)) : g.value.type === "dateRange" ? (m(), x(q, { key: 2 }, [
                l("p", G$, $(g.value.label), 1),
                l("div", Z$, [
                  l("div", Q$, [
                    l("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, J$),
                    Ut(l("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": z[1] || (z[1] = (Z) => _.value = Z),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, t4), [
                      [Oe, _.value]
                    ])
                  ]),
                  l("div", e4, [
                    l("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, a4),
                    Ut(l("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": z[2] || (z[2] = (Z) => b.value = Z),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, s4), [
                      [Oe, b.value]
                    ])
                  ])
                ])
              ], 64)) : E("", !0)
            ]))
          ], 64)) : E("", !0)
        ], 44, N$)) : E("", !0)
      ]))
    ], 8, A$));
  }
}), o4 = /* @__PURE__ */ nt(n4, [["__scopeId", "data-v-4403df66"]]), qt = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", ce = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", Fe = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", xe = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", i4 = { class: "font-sans" }, r4 = ["for"], l4 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], c4 = ["id"], d4 = /* @__PURE__ */ J({
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
    const a = e, s = t, n = `kiut-input-text-${Ft()}`, o = S(() => a.id ?? n), i = S(() => `${o.value}-err`), r = S({
      get: () => a.modelValue,
      set: (c) => s("update:modelValue", c)
    });
    return (c, d) => (m(), x("div", i4, [
      e.label ? (m(), x("label", {
        key: 0,
        for: o.value,
        class: K(T(qt))
      }, $(e.label), 11, r4)) : E("", !0),
      Ut(l("input", {
        id: o.value,
        "onUpdate:modelValue": d[0] || (d[0] = (u) => r.value = u),
        type: "text",
        autocomplete: "off",
        class: K([T(ce), e.invalid ? T(Fe) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, l4), [
        [Oe, r.value]
      ]),
      e.errorText ? (m(), x("p", {
        key: 1,
        id: i.value,
        class: K(T(xe)),
        role: "alert"
      }, $(e.errorText), 11, c4)) : E("", !0)
    ]));
  }
}), u4 = { class: "font-sans" }, h4 = ["for"], f4 = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], g4 = ["for"], p4 = ["title"], v4 = ["aria-label"], b4 = ["id"], m4 = /* @__PURE__ */ J({
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
    const a = e, s = t, n = `kiut-input-file-${Ft()}`, o = S(() => a.id ?? n), i = S(() => `${o.value}-err`), r = at(null), c = S(() => a.modelValue?.name ?? a.placeholder);
    function d(h) {
      const v = h.target.files?.[0] ?? null;
      s("update:modelValue", v);
    }
    function u() {
      s("update:modelValue", null), r.value && (r.value.value = "");
    }
    return (h, p) => (m(), x("div", u4, [
      e.label ? (m(), x("label", {
        key: 0,
        for: o.value,
        class: K(T(qt))
      }, $(e.label), 11, h4)) : E("", !0),
      l("div", {
        class: K([
          T(ce),
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
        }, null, 40, f4),
        l("label", {
          for: o.value,
          class: K(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          Q(T(Lg), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          kt(" " + $(e.chooseLabel), 1)
        ], 10, g4),
        l("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: c.value || void 0
        }, $(c.value), 9, p4),
        e.modelValue && !e.disabled ? (m(), x("button", {
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
        ], 8, v4)) : E("", !0)
      ], 2),
      e.errorText ? (m(), x("p", {
        key: 1,
        id: i.value,
        class: K(T(xe)),
        role: "alert"
      }, $(e.errorText), 11, b4)) : E("", !0)
    ]));
  }
}), y4 = { class: "font-sans" }, _4 = ["for"], x4 = { class: "relative" }, k4 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], w4 = ["id"], $4 = /* @__PURE__ */ J({
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
    const a = e, s = t, n = `kiut-input-datetime-${Ft()}`, o = S(() => a.id ?? n), i = S(() => `${o.value}-err`), r = S(() => a.modelValue ?? "");
    function c(d) {
      const u = d.target.value;
      s("update:modelValue", u === "" ? null : u);
    }
    return (d, u) => (m(), x("div", y4, [
      e.label ? (m(), x("label", {
        key: 0,
        for: o.value,
        class: K(T(qt))
      }, $(e.label), 11, _4)) : E("", !0),
      l("div", x4, [
        Q(T(Vi), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        l("input", {
          id: o.value,
          value: r.value,
          type: "datetime-local",
          autocomplete: "off",
          class: K([
            T(ce),
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
        }, null, 42, k4)
      ]),
      e.errorText ? (m(), x("p", {
        key: 1,
        id: i.value,
        class: K(T(xe)),
        role: "alert"
      }, $(e.errorText), 11, w4)) : E("", !0)
    ]));
  }
}), M4 = { class: "font-sans" }, S4 = ["for"], C4 = { class: "relative" }, D4 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], A4 = ["id"], T4 = /* @__PURE__ */ J({
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
    const n = e, o = t, i = `kiut-input-time-${Ft()}`, r = S(() => n.id ?? i), c = S(() => `${r.value}-err`), d = S(() => n.modelValue == null || n.modelValue === "" ? "" : a(n.modelValue) ?? "");
    function u(h) {
      const p = h.target.value;
      o("update:modelValue", s(p));
    }
    return (h, p) => (m(), x("div", M4, [
      e.label ? (m(), x("label", {
        key: 0,
        for: r.value,
        class: K(T(qt))
      }, $(e.label), 11, S4)) : E("", !0),
      l("div", C4, [
        Q(T(Og), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        l("input", {
          id: r.value,
          value: d.value,
          type: "time",
          autocomplete: "off",
          class: K([
            T(ce),
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
        }, null, 42, D4)
      ]),
      e.errorText ? (m(), x("p", {
        key: 1,
        id: c.value,
        class: K(T(xe)),
        role: "alert"
      }, $(e.errorText), 11, A4)) : E("", !0)
    ]));
  }
}), B4 = { class: "font-sans" }, L4 = ["for"], F4 = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, P4 = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], I4 = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, R4 = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, E4 = { class: "min-w-0 text-left leading-snug" }, O4 = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, V4 = { class: "min-w-0 text-right leading-snug" }, z4 = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, N4 = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, W4 = ["id"], H4 = /* @__PURE__ */ J({
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
    const a = e, s = t, n = `kiut-input-range-${Ft()}`, o = S(() => a.id ?? n), i = S(() => `${o.value}-err`), r = S(() => {
      const v = [];
      return a.errorText && v.push(i.value), v.length ? v.join(" ") : void 0;
    }), c = S(
      () => !!(a.caption && !a.captionMin && !a.captionMax)
    ), d = S(() => !!(a.captionMin || a.captionMax)), u = S(() => {
      const { min: v, max: f, modelValue: _ } = a;
      if (f === v) return 0;
      const b = (_ - v) / (f - v);
      return Math.min(100, Math.max(0, b * 100));
    }), h = S(() => ({
      "--kiut-range-fill": `${u.value}%`,
      "--kiut-range-length": a.trackLength
    }));
    function p(v) {
      const f = Number(v.target.value);
      s("update:modelValue", Number.isNaN(f) ? a.min : f);
    }
    return (v, f) => (m(), x("div", B4, [
      e.label ? (m(), x("label", {
        key: 0,
        for: o.value,
        class: K(T(qt))
      }, $(e.label), 11, L4)) : E("", !0),
      l("div", {
        class: K(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (m(), x("p", F4, $(e.captionMax), 1)) : E("", !0),
        l("div", {
          class: K(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: bt(h.value)
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
            class: K([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: p
          }, null, 42, P4)
        ], 6),
        e.orientation === "horizontal" && c.value ? (m(), x("p", I4, $(e.caption), 1)) : e.orientation === "horizontal" && d.value ? (m(), x("div", R4, [
          l("span", E4, $(e.captionMin), 1),
          l("span", O4, $(e.caption), 1),
          l("span", V4, $(e.captionMax), 1)
        ])) : E("", !0),
        e.orientation === "vertical" && e.captionMin ? (m(), x("p", z4, $(e.captionMin), 1)) : E("", !0),
        e.orientation === "vertical" && e.caption ? (m(), x("p", N4, $(e.caption), 1)) : E("", !0)
      ], 2),
      e.errorText ? (m(), x("p", {
        key: 1,
        id: i.value,
        class: K(T(xe)),
        role: "alert"
      }, $(e.errorText), 11, W4)) : E("", !0)
    ]));
  }
}), j4 = /* @__PURE__ */ nt(H4, [["__scopeId", "data-v-a1343418"]]), Y4 = { class: "font-sans" }, K4 = ["for"], U4 = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], q4 = ["id"], X4 = /* @__PURE__ */ J({
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
    const a = e, s = t, n = `kiut-input-number-${Ft()}`, o = S(() => a.id ?? n), i = S(() => `${o.value}-err`), r = S(() => {
      switch (a.align) {
        case "start":
          return "text-start";
        case "end":
          return "text-end";
        default:
          return "text-center";
      }
    }), c = S(
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
    return (u, h) => (m(), x("div", Y4, [
      e.label ? (m(), x("label", {
        key: 0,
        for: o.value,
        class: K(T(qt))
      }, $(e.label), 11, K4)) : E("", !0),
      l("input", {
        id: o.value,
        value: c.value,
        type: "number",
        onInput: d,
        class: K([
          T(ce),
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
      }, null, 42, U4),
      e.errorText ? (m(), x("p", {
        key: 1,
        id: i.value,
        class: K(T(xe)),
        role: "alert"
      }, $(e.errorText), 11, q4)) : E("", !0)
    ]));
  }
}), G4 = { class: "font-sans" }, Z4 = ["for"], Q4 = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], J4 = ["disabled"], t3 = ["id"], e3 = "#3b82f6", a3 = "#aabbcc", s3 = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", n3 = /* @__PURE__ */ J({
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
      const _ = f.trim(), b = /^#?([0-9a-fA-F]{6})$/.exec(_);
      if (b) return `#${b[1].toLowerCase()}`;
      const g = /^#?([0-9a-fA-F]{3})$/.exec(_);
      if (g) {
        const [y, w, k] = g[1].split("");
        return `#${y}${y}${w}${w}${k}${k}`.toLowerCase();
      }
      return null;
    }
    function s(f) {
      return a(f) ?? e3;
    }
    const n = e, o = t, i = `kiut-input-color-${Ft()}`, r = S(() => n.id ?? i), c = S(() => `${r.value}-err`), d = S(() => s(n.modelValue)), u = at(d.value), h = at(!1);
    Rt(d, (f) => {
      h.value || (u.value = f);
    });
    function p(f) {
      const _ = f.target, b = a(_.value);
      b && o("update:modelValue", b);
    }
    function v() {
      h.value = !1;
      const f = a(u.value);
      f ? (u.value = f, o("update:modelValue", f)) : u.value = d.value;
    }
    return Rt(u, (f) => {
      if (!h.value) return;
      const _ = a(f);
      _ && o("update:modelValue", _);
    }), (f, _) => (m(), x("div", G4, [
      e.label ? (m(), x("label", {
        key: 0,
        for: r.value,
        class: K(T(qt))
      }, $(e.label), 11, Z4)) : E("", !0),
      l("div", {
        class: K([
          s3,
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
        }, null, 40, Q4),
        e.showHexInput ? Ut((m(), x("input", {
          key: 0,
          "onUpdate:modelValue": _[0] || (_[0] = (b) => u.value = b),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: a3,
          onFocus: _[1] || (_[1] = (b) => h.value = !0),
          onBlur: v
        }, null, 40, J4)), [
          [Oe, u.value]
        ]) : E("", !0)
      ], 2),
      e.errorText ? (m(), x("p", {
        key: 1,
        id: c.value,
        class: K(T(xe)),
        role: "alert"
      }, $(e.errorText), 11, t3)) : E("", !0)
    ]));
  }
});
function ji(e, t) {
  return m(), x("svg", {
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
const o3 = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], i3 = ["aria-selected", "onClick", "onMouseenter"], r3 = {
  key: 0,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, l3 = { class: "min-w-0 flex-1" }, Yi = /* @__PURE__ */ J({
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
    const a = e, s = t, n = `kiut-select-${Ft()}`, o = `${n}-label`, i = `${n}-btn`, r = `${n}-listbox`, c = at(null), d = at(null), u = at(null), h = at(!1), p = at(0), v = at({});
    function f() {
      const F = d.value;
      if (!F) return;
      const O = F.getBoundingClientRect();
      v.value = {
        top: `${O.bottom - 3}px`,
        left: `${O.left}px`,
        width: `${O.width}px`
      };
    }
    const _ = S(() => a.options.filter((F) => !F.disabled)), b = S(
      () => a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opción"
    ), g = S(() => a.modelValue === null || a.modelValue === void 0 || a.modelValue === "" ? a.placeholder : a.options.find((O) => O.value === a.modelValue)?.label ?? String(a.modelValue));
    function y(F) {
      return `${String(F.value)}-${F.label}`;
    }
    function w(F) {
      return a.modelValue === F.value;
    }
    function k(F, O) {
      const W = w(F), P = p.value === O;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        W ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !W && P ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function M(F) {
      s("update:modelValue", F.value), h.value = !1;
    }
    function C() {
      a.disabled || (h.value = !h.value);
    }
    function D(F) {
      if (F.stopPropagation(), !a.disabled && (C(), h.value)) {
        f();
        const O = Math.max(
          0,
          _.value.findIndex((W) => W.value === a.modelValue)
        );
        p.value = O, St(() => u.value?.focus());
      }
    }
    function A(F) {
      if (!h.value) return;
      const O = F.target, W = c.value, P = u.value;
      W && !W.contains(O) && (!P || !P.contains(O)) && (h.value = !1);
    }
    function B(F) {
      a.disabled || (F.key === "ArrowDown" || F.key === "Enter" || F.key === " ") && (F.preventDefault(), h.value || (h.value = !0, f(), p.value = Math.max(
        0,
        _.value.findIndex((O) => O.value === a.modelValue)
      ), St(() => u.value?.focus())));
    }
    function L(F) {
      const O = _.value;
      if (O.length !== 0) {
        if (F.key === "Escape") {
          F.preventDefault(), h.value = !1;
          return;
        }
        if (F.key === "ArrowDown") {
          F.preventDefault(), p.value = Math.min(p.value + 1, O.length - 1);
          return;
        }
        if (F.key === "ArrowUp") {
          F.preventDefault(), p.value = Math.max(p.value - 1, 0);
          return;
        }
        if (F.key === "Enter") {
          F.preventDefault();
          const W = O[p.value];
          W && M(W);
        }
      }
    }
    return re(() => {
      document.addEventListener("click", A);
    }), He(() => {
      document.removeEventListener("click", A);
    }), (F, O) => (m(), x("div", {
      ref_key: "rootRef",
      ref: c,
      class: "relative font-sans"
    }, [
      e.label ? (m(), x("label", {
        key: 0,
        id: o,
        class: K(T(qt))
      }, $(e.label), 3)) : E("", !0),
      l("button", {
        ref_key: "buttonRef",
        ref: d,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: K([
          T(ce),
          "flex items-center justify-between gap-2 text-left",
          h.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": h.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : b.value,
        onClick: D,
        onKeydown: B
      }, [
        l("span", {
          class: K([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, $(g.value), 3),
        Q(T(zi), {
          class: K(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", h.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, o3),
      (m(), dt(Rs, { to: "body" }, [
        Ut(l("ul", {
          id: r,
          ref_key: "listRef",
          ref: u,
          role: "listbox",
          tabindex: "-1",
          style: bt(v.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          onKeydown: Jt(L, ["stop"])
        }, [
          (m(!0), x(q, null, tt(_.value, (W, P) => (m(), x("li", {
            key: y(W),
            role: "option",
            "aria-selected": w(W),
            class: K(k(W, P)),
            onClick: Jt((I) => M(W), ["stop"]),
            onMouseenter: (I) => p.value = P
          }, [
            e.showOptionCheck ? (m(), x("span", r3, [
              w(W) ? (m(), dt(T(ji), {
                key: 0,
                class: "h-4 w-4 text-white"
              })) : E("", !0)
            ])) : E("", !0),
            l("span", l3, $(W.label), 1)
          ], 42, i3))), 128))
        ], 36), [
          [la, h.value]
        ])
      ]))
    ], 512));
  }
}), c3 = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], d3 = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, u3 = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, h3 = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, f3 = { class: "truncate" }, g3 = ["aria-selected", "onClick", "onMouseenter"], p3 = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, v3 = { class: "min-w-0 flex-1" }, b3 = /* @__PURE__ */ J({
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
    const a = e, s = t, n = `kiut-multiselect-${Ft()}`, o = `${n}-label`, i = `${n}-btn`, r = `${n}-listbox`, c = at(null), d = at(null), u = at(!1), h = at(0), p = S(() => a.options.filter((L) => !L.disabled)), v = S(() => new Set(a.modelValue ?? [])), f = S(
      () => a.options.filter((L) => v.value.has(L.value))
    ), _ = S(() => {
      const L = a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opciones", F = f.value.length;
      return F === 0 ? L : `${L}, ${F} seleccionada${F === 1 ? "" : "s"}`;
    });
    function b(L) {
      return `${String(L.value)}-${L.label}`;
    }
    function g(L) {
      return v.value.has(L.value);
    }
    function y(L, F) {
      const O = g(L), W = h.value === F;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        O ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !O && W ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function w(L) {
      const F = [...a.modelValue ?? []], O = F.indexOf(L.value);
      O >= 0 ? F.splice(O, 1) : F.push(L.value), s("update:modelValue", F);
    }
    function k() {
      const L = p.value;
      if (L.length === 0) {
        h.value = 0;
        return;
      }
      const F = v.value, O = L.findIndex((W) => F.has(W.value));
      h.value = O >= 0 ? O : 0;
    }
    function M() {
      a.disabled || (u.value = !u.value);
    }
    function C(L) {
      L.stopPropagation(), !a.disabled && (M(), u.value && (k(), St(() => d.value?.focus())));
    }
    function D(L) {
      if (!u.value) return;
      const F = c.value;
      F && !F.contains(L.target) && (u.value = !1);
    }
    function A(L) {
      a.disabled || (L.key === "ArrowDown" || L.key === "Enter" || L.key === " ") && (L.preventDefault(), u.value || (u.value = !0, k(), St(() => d.value?.focus())));
    }
    function B(L) {
      const F = p.value;
      if (F.length !== 0) {
        if (L.key === "Escape") {
          L.preventDefault(), u.value = !1;
          return;
        }
        if (L.key === "ArrowDown") {
          L.preventDefault(), h.value = Math.min(h.value + 1, F.length - 1);
          return;
        }
        if (L.key === "ArrowUp") {
          L.preventDefault(), h.value = Math.max(h.value - 1, 0);
          return;
        }
        if (L.key === "Enter" || L.key === " ") {
          L.preventDefault();
          const O = F[h.value];
          O && w(O);
        }
      }
    }
    return re(() => {
      document.addEventListener("click", D);
    }), He(() => {
      document.removeEventListener("click", D);
    }), (L, F) => (m(), x("div", {
      ref_key: "rootRef",
      ref: c,
      class: "relative font-sans"
    }, [
      e.label ? (m(), x("label", {
        key: 0,
        id: o,
        class: K(T(qt))
      }, $(e.label), 3)) : E("", !0),
      l("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: K([
          T(ce),
          "flex items-start justify-between gap-2 text-left",
          u.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": u.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : _.value,
        onClick: C,
        onKeydown: A
      }, [
        l("div", d3, [
          f.value.length === 0 ? (m(), x("span", u3, $(e.placeholder), 1)) : (m(), x("div", h3, [
            (m(!0), x(q, null, tt(f.value, (O) => (m(), x("span", {
              key: b(O),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              l("span", f3, $(O.label), 1)
            ]))), 128))
          ]))
        ]),
        Q(T(zi), {
          class: K(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", u.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, c3),
      Ut(l("ul", {
        id: r,
        ref_key: "listRef",
        ref: d,
        role: "listbox",
        tabindex: "-1",
        "aria-multiselectable": "true",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: Jt(B, ["stop"])
      }, [
        (m(!0), x(q, null, tt(p.value, (O, W) => (m(), x("li", {
          key: b(O),
          role: "option",
          "aria-selected": g(O),
          class: K(y(O, W)),
          onClick: Jt((P) => w(O), ["stop"]),
          onMouseenter: (P) => h.value = W
        }, [
          l("span", p3, [
            g(O) ? (m(), dt(T(ji), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : E("", !0)
          ]),
          l("span", v3, $(O.label), 1)
        ], 42, g3))), 128))
      ], 544), [
        [la, u.value]
      ])
    ], 512));
  }
}), m3 = ["id", "aria-checked", "aria-disabled", "disabled", "onKeydown"], y3 = { class: "sr-only" }, _3 = /* @__PURE__ */ J({
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
    return (o, i) => (m(), x("button", {
      id: e.id,
      type: "button",
      role: "switch",
      "aria-checked": e.modelValue,
      "aria-disabled": e.disabled ? "true" : void 0,
      disabled: e.disabled,
      class: K([
        "relative inline-flex h-8 w-[3.75rem] shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-sm transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        e.modelValue ? "bg-[color:var(--kiut-primary)]" : "bg-[#DEDEE3] dark:bg-slate-600"
      ]),
      onClick: n,
      onKeydown: [
        Ra(Jt(n, ["prevent", "stop"]), ["space"]),
        Ra(Jt(n, ["prevent"]), ["enter"])
      ]
    }, [
      l("span", {
        class: K(["pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", e.modelValue ? "translate-x-7" : "translate-x-0"]),
        "aria-hidden": "true"
      }, null, 2),
      l("span", y3, $(e.ariaLabel), 1)
    ], 42, m3));
  }
}), x3 = { class: "font-sans" }, k3 = ["for"], w3 = { class: "flex gap-2" }, $3 = { class: "w-[7.5rem] shrink-0" }, M3 = { class: "min-w-0 flex-1" }, S3 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], C3 = ["id"], D3 = /* @__PURE__ */ J({
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
    const a = e, s = t, n = `kiut-phone-${Ft()}`, o = S(() => a.id ?? `${n}-num`), i = S(() => `${o.value}-err`), r = S({
      get: () => a.modelValue.prefix,
      set: (d) => s("update:modelValue", { ...a.modelValue, prefix: d })
    }), c = S({
      get: () => a.modelValue.number,
      set: (d) => s("update:modelValue", { ...a.modelValue, number: d })
    });
    return (d, u) => (m(), x("div", x3, [
      e.label ? (m(), x("label", {
        key: 0,
        for: o.value,
        class: K(T(qt))
      }, $(e.label), 11, k3)) : E("", !0),
      l("div", w3, [
        l("div", $3, [
          Q(Yi, {
            modelValue: r.value,
            "onUpdate:modelValue": u[0] || (u[0] = (h) => r.value = h),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        l("div", M3, [
          Ut(l("input", {
            id: o.value,
            "onUpdate:modelValue": u[1] || (u[1] = (h) => c.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: K([T(ce), e.invalid ? T(Fe) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, S3), [
            [Oe, c.value]
          ])
        ])
      ]),
      e.errorText ? (m(), x("p", {
        key: 1,
        id: i.value,
        class: K(T(xe)),
        role: "alert"
      }, $(e.errorText), 11, C3)) : E("", !0)
    ]));
  }
}), A3 = ["role", "aria-label"], T3 = { class: "flex flex-wrap gap-2" }, B3 = ["aria-checked", "role", "onClick"], L3 = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, F3 = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, P3 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, I3 = /* @__PURE__ */ J({
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
    const a = e, s = t, n = S(() => a.multiple ? Array.isArray(a.modelValue) ? a.modelValue : [] : []);
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
    return (c, d) => (m(), x("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      l("div", T3, [
        (m(!0), x(q, null, tt(e.items, (u) => (m(), x("button", {
          key: u.value,
          type: "button",
          class: K(i(u)),
          "aria-checked": o(u),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => r(u)
        }, [
          l("span", L3, [
            o(u) ? (m(), x("span", F3)) : E("", !0)
          ]),
          u.dotColor ? (m(), x("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: bt({ backgroundColor: u.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : E("", !0),
          l("span", P3, $(u.label), 1)
        ], 10, B3))), 128))
      ])
    ], 8, A3));
  }
}), R3 = ["aria-label"], E3 = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], O3 = { class: "truncate px-3 py-2 text-sm font-medium" }, V3 = /* @__PURE__ */ J({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, s = t, n = `kiut-seg-${Ft()}`, o = (_) => `${n}-seg-${_}`, i = at([]);
    function r(_, b) {
      _ instanceof HTMLButtonElement ? i.value[b] = _ : i.value[b] = null;
    }
    function c(_) {
      return _.value === a.modelValue;
    }
    function d(_) {
      const b = c(_), g = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return _.disabled ? `${g} cursor-not-allowed opacity-40` : b ? `${g} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${g} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function u(_) {
      _.disabled || _.value !== a.modelValue && s("update:modelValue", _.value);
    }
    function h(_, b, g) {
      u(_), St(() => i.value[b]?.focus());
    }
    const p = S(
      () => a.items.map((_, b) => _.disabled ? -1 : b).filter((_) => _ >= 0)
    );
    function v(_, b) {
      const g = a.items.length;
      if (g === 0) return 0;
      let y = _;
      for (let w = 0; w < g; w++)
        if (y = (y + b + g) % g, !a.items[y]?.disabled) return y;
      return _;
    }
    function f(_, b) {
      if (_.key === "ArrowRight" || _.key === "ArrowDown") {
        _.preventDefault();
        const g = v(b, 1), y = a.items[g];
        y && u(y), St(() => i.value[g]?.focus());
      } else if (_.key === "ArrowLeft" || _.key === "ArrowUp") {
        _.preventDefault();
        const g = v(b, -1), y = a.items[g];
        y && u(y), St(() => i.value[g]?.focus());
      } else if (_.key === "Home") {
        _.preventDefault();
        const g = p.value[0];
        if (g !== void 0) {
          const y = a.items[g];
          y && u(y), St(() => i.value[g]?.focus());
        }
      } else if (_.key === "End") {
        _.preventDefault();
        const g = p.value[p.value.length - 1];
        if (g !== void 0) {
          const y = a.items[g];
          y && u(y), St(() => i.value[g]?.focus());
        }
      }
    }
    return (_, b) => (m(), x("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (m(!0), x(q, null, tt(e.items, (g, y) => (m(), x("button", {
        id: o(g.value),
        key: g.value,
        ref_for: !0,
        ref: (w) => r(w, y),
        type: "button",
        role: "tab",
        "aria-selected": c(g),
        "aria-disabled": g.disabled === !0,
        tabindex: c(g) ? 0 : -1,
        class: K(d(g)),
        onClick: (w) => h(g, y),
        onKeydown: (w) => f(w, y)
      }, [
        l("span", O3, $(g.label), 1)
      ], 42, E3))), 128))
    ], 8, R3));
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
function he(e) {
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
function z3(e, t) {
  return Ja(e, t) >= 0;
}
function N3(e, t) {
  return Ja(e, t) <= 0;
}
function W3(e) {
  const t = e.getFullYear(), a = e.getMonth(), s = new Date(t, a, 1), n = new Date(s);
  n.setDate(s.getDate() - s.getDay());
  const o = [], i = new Date(n);
  for (let r = 0; r < 42; r++)
    o.push(new Date(i)), i.setDate(i.getDate() + 1);
  return o;
}
const H3 = [
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
], j3 = [
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
  return `${H3[e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function Po(e) {
  return `${j3[e.getMonth()]} ${e.getFullYear()}`;
}
const Y3 = ["aria-expanded", "aria-labelledby", "aria-label"], K3 = ["onKeydown"], U3 = { class: "mb-4 flex items-center justify-between gap-2" }, q3 = { class: "flex min-w-0 flex-1 justify-center gap-8 text-center text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, X3 = { class: "min-w-0 truncate" }, G3 = { class: "min-w-0 truncate" }, Z3 = { class: "flex flex-col gap-6 sm:flex-row sm:gap-8" }, Q3 = { class: "mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-wide text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, J3 = { class: "grid grid-cols-7 gap-y-1" }, tM = ["disabled", "onClick"], eM = /* @__PURE__ */ J({
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
    const a = e, s = t, o = `${`kiut-drp-${Ft()}`}-lbl`, i = at(null), r = at(null), c = at(!1), d = at(null), u = at(ks(/* @__PURE__ */ new Date())), h = S(() => {
      const D = ks(u.value);
      return [D, Bo(D, 1)];
    }), p = S(() => a.ariaLabel ?? a.placeholder), v = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], f = S(() => {
      if (!a.modelValue.start || !a.modelValue.end) return a.placeholder;
      const D = Me(a.modelValue.start), A = Me(a.modelValue.end);
      return `${Fo(D)} – ${Fo(A)}`;
    });
    function _(D, A) {
      return D.getMonth() === A.getMonth() && D.getFullYear() === A.getFullYear();
    }
    function b(D) {
      const A = he(D);
      if (a.minDate) {
        const B = he(Me(a.minDate));
        if (ws(A, B)) return !0;
      }
      if (a.maxDate) {
        const B = he(Me(a.maxDate));
        if (ws(B, A)) return !0;
      }
      return !1;
    }
    function g(D, A) {
      const B = _(A, D), L = a.modelValue.start ? he(Me(a.modelValue.start)) : null, F = a.modelValue.end ? he(Me(a.modelValue.end)) : null, O = he(A), W = B ? "text-[color:var(--kiut-text-primary)] dark:text-slate-100" : "text-slate-400 dark:text-slate-500";
      if (!L || !F)
        return `${W} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
      const P = z3(O, L) && N3(O, F), I = Lo(O, L), V = Lo(O, F);
      return I || V ? "bg-[color:var(--kiut-primary)] font-semibold text-white shadow-sm" : P ? `${W} bg-violet-100/90 dark:bg-violet-950/35 hover:bg-violet-200/80 dark:hover:bg-violet-900/40` : `${W} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
    }
    function y(D) {
      if (b(D)) return;
      const A = he(D);
      if (!d.value) {
        d.value = new Date(A), s("update:modelValue", { start: ta(A), end: ta(A) });
        return;
      }
      let L = he(d.value), F = new Date(A);
      ws(F, L) && ([L, F] = [F, L]), s("update:modelValue", { start: ta(L), end: ta(F) }), d.value = null, c.value = !1;
    }
    function w(D) {
      u.value = Bo(u.value, D);
    }
    function k() {
      c.value = !1;
    }
    function M(D) {
      if (D.stopPropagation(), c.value = !c.value, c.value) {
        if (d.value = null, a.modelValue.start)
          try {
            u.value = ks(Me(a.modelValue.start));
          } catch {
          }
        St(() => r.value?.focus());
      }
    }
    function C(D) {
      if (!c.value) return;
      const A = i.value;
      A && !A.contains(D.target) && (c.value = !1);
    }
    return Rt(c, (D) => {
      D && (d.value = null);
    }), re(() => {
      document.addEventListener("click", C);
    }), He(() => {
      document.removeEventListener("click", C);
    }), (D, A) => (m(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (m(), x("label", {
        key: 0,
        id: o,
        class: K(T(qt))
      }, $(e.label), 3)) : E("", !0),
      l("button", {
        type: "button",
        class: K([T(ce), "flex w-full items-center gap-2 text-left"]),
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
          class: K([
            "min-w-0 flex-1 truncate",
            !e.modelValue.start || !e.modelValue.end ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, $(f.value), 3)
      ], 10, Y3),
      Ut(l("div", {
        ref_key: "panelRef",
        ref: r,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: "absolute left-0 top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[100vw] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] p-4 shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]",
        onKeydown: Ra(Jt(k, ["stop"]), ["escape"])
      }, [
        l("div", U3, [
          l("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes anterior",
            onClick: A[0] || (A[0] = (B) => w(-1))
          }, [
            Q(T(Rg), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ]),
          l("div", q3, [
            l("span", X3, $(T(Po)(h.value[0])), 1),
            l("span", G3, $(T(Po)(h.value[1])), 1)
          ]),
          l("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes siguiente",
            onClick: A[1] || (A[1] = (B) => w(1))
          }, [
            Q(T(Eg), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ])
        ]),
        l("div", Z3, [
          (m(!0), x(q, null, tt(h.value, (B) => (m(), x("div", {
            key: `${B.getFullYear()}-${B.getMonth()}`,
            class: "min-w-0 flex-1"
          }, [
            l("div", Q3, [
              (m(), x(q, null, tt(v, (L) => l("span", { key: L }, $(L), 1)), 64))
            ]),
            l("div", J3, [
              (m(!0), x(q, null, tt(T(W3)(B), (L) => (m(), x("button", {
                key: T(ta)(L),
                type: "button",
                disabled: b(L),
                class: K(["relative flex h-9 items-center justify-center rounded-lg text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", g(B, L)]),
                onClick: (F) => y(L)
              }, $(L.getDate()), 11, tM))), 128))
            ])
          ]))), 128))
        ])
      ], 40, K3), [
        [la, c.value]
      ])
    ], 512));
  }
}), aM = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, sM = /* @__PURE__ */ J({
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
    const t = e, a = S(() => t.statusLive !== void 0), s = S(
      () => t.statusLive === !0 ? t.labelConnected : t.labelDisconnected
    ), n = S(() => t.statusLive === !0 ? [
      "border border-emerald-200 bg-emerald-50",
      "dark:border-emerald-800/80 dark:bg-emerald-950/40"
    ] : [
      "border border-transparent bg-slate-100 dark:border-slate-700/80 dark:bg-slate-800/90"
    ]), o = S(() => t.statusLive === !0 ? "text-emerald-700 dark:text-emerald-300" : "text-[color:var(--kiut-text-primary)] dark:text-slate-300"), i = S(() => {
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
    return (r, c) => a.value ? (m(), x("span", {
      key: 0,
      role: "status",
      class: K(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", n.value])
    }, [
      e.statusLive === !0 ? (m(), x("span", aM, [...c[0] || (c[0] = [
        l("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        l("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : E("", !0),
      l("span", {
        class: K(["min-w-0 flex-1 text-center", o.value])
      }, $(s.value), 3)
    ], 2)) : (m(), x("span", {
      key: 1,
      class: K(["inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight", i.value])
    }, [
      It(r.$slots, "default", {}, () => [
        kt($(e.label), 1)
      ])
    ], 2));
  }
}), nM = {
  key: 0,
  class: "group relative inline-flex shrink-0"
}, oM = ["type", "disabled", "aria-label"], iM = {
  key: 1,
  class: "min-w-0 truncate"
}, rM = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, lM = ["type", "disabled", "aria-label"], cM = {
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
    const t = e, a = Vo(), s = S(() => !!t.tooltip?.trim()), n = S(() => t.variant === "action"), o = S(() => !n.value), i = S(() => {
      const u = a["aria-label"];
      if (typeof u == "string" && u.length > 0) return u;
      if (n.value && t.tooltip?.trim()) return t.tooltip.trim();
    }), r = S(() => {
      const u = a.type;
      return u === "submit" || u === "reset" || u === "button" ? u : "button";
    }), c = S(() => {
      const { class: u, type: h, "aria-label": p, ...v } = a;
      return v;
    }), d = S(() => t.variant === "primary" ? [
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
    return (u, h) => s.value ? (m(), x("span", nM, [
      l("button", Ss({
        type: r.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [d.value, T(a).class]],
        disabled: e.disabled,
        "aria-label": i.value
      }, c.value), [
        u.$slots.icon ? (m(), x("span", {
          key: 0,
          class: K(["inline-flex shrink-0", n.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          It(u.$slots, "icon")
        ], 2)) : E("", !0),
        o.value ? (m(), x("span", iM, [
          It(u.$slots, "default")
        ])) : E("", !0)
      ], 16, oM),
      l("span", rM, $(e.tooltip), 1)
    ])) : (m(), x("button", Ss({
      key: 1,
      type: r.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [d.value, T(a).class]],
      disabled: e.disabled,
      "aria-label": i.value
    }, c.value), [
      u.$slots.icon ? (m(), x("span", {
        key: 0,
        class: K(["inline-flex shrink-0", n.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        It(u.$slots, "icon")
      ], 2)) : E("", !0),
      o.value ? (m(), x("span", cM, [
        It(u.$slots, "default")
      ])) : E("", !0)
    ], 16, lM));
  }
}), dM = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, uM = { class: "min-w-0 flex-1 space-y-1" }, hM = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, fM = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, gM = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, pM = /* @__PURE__ */ J({
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
    return Rt(
      () => a.modelValue,
      (u) => {
        u && requestAnimationFrame(() => {
          i.value?.focus({ preventScroll: !0 });
        });
      }
    ), re(() => {
      document.addEventListener("keydown", d);
    }), He(() => {
      document.removeEventListener("keydown", d);
    }), (u, h) => (m(), dt(Rs, { to: "body" }, [
      Q(Is, { name: "kiut-modal" }, {
        default: Ee(() => [
          e.modelValue ? (m(), x("div", dM, [
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
              onClick: h[0] || (h[0] = Jt(() => {
              }, ["stop"]))
            }, [
              l("header", {
                class: K(["flex shrink-0 justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.02]", e.subtitle ? "items-start" : "items-center"])
              }, [
                l("div", uM, [
                  l("h2", {
                    id: o,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, $(e.title), 1),
                  e.subtitle ? (m(), x("p", hM, $(e.subtitle), 1)) : E("", !0)
                ]),
                Q(Ia, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  onClick: r
                }, {
                  icon: Ee(() => [
                    Q(T(Ni), { class: "h-5 w-5" })
                  ]),
                  _: 1
                })
              ], 2),
              l("div", fM, [
                It(u.$slots, "default", {}, void 0, !0)
              ]),
              l("footer", gM, [
                Q(Ia, {
                  variant: "secondary",
                  type: "button",
                  onClick: r
                }, {
                  default: Ee(() => [
                    kt($(e.cancelLabel), 1)
                  ]),
                  _: 1
                }),
                Q(Ia, {
                  variant: "primary",
                  type: "button",
                  onClick: c
                }, {
                  default: Ee(() => [
                    kt($(e.confirmLabel), 1)
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
}), vM = /* @__PURE__ */ nt(pM, [["__scopeId", "data-v-4ed7bb14"]]), bM = { class: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between" }, mM = { class: "flex min-w-0 flex-1 flex-col gap-1.5" }, yM = { class: "flex min-w-0 items-center gap-2.5" }, _M = {
  key: 0,
  class: "inline-flex shrink-0 items-center text-[color:var(--kiut-text-primary)] dark:text-slate-100 [&>svg]:size-6",
  "aria-hidden": "true"
}, xM = {
  key: 0,
  class: "text-base leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, kM = {
  key: 0,
  class: "flex shrink-0 flex-wrap items-center justify-end gap-2 sm:pt-0.5"
}, wM = {
  key: 0,
  class: "mt-6"
}, $M = /* @__PURE__ */ J({
  name: "Section",
  __name: "Section",
  props: {
    title: {},
    subtitle: {},
    icon: {}
  },
  setup(e) {
    const t = e, a = Oo(), n = `${`kiut-section-${Ft()}`}-title`, o = S(() => !!(a.icon || t.icon));
    return (i, r) => (m(), x("section", {
      class: "mb-6 text-left font-['Inter',system-ui,sans-serif]",
      "aria-labelledby": n
    }, [
      l("header", bM, [
        l("div", mM, [
          l("div", yM, [
            o.value ? (m(), x("span", _M, [
              It(i.$slots, "icon", {}, () => [
                e.icon ? (m(), dt(ca(e.icon), { key: 0 })) : E("", !0)
              ])
            ])) : E("", !0),
            l("h2", {
              id: n,
              class: "min-w-0 text-3xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
            }, $(e.title), 1)
          ]),
          e.subtitle ? (m(), x("p", xM, $(e.subtitle), 1)) : E("", !0)
        ]),
        i.$slots.actions ? (m(), x("div", kM, [
          It(i.$slots, "actions")
        ])) : E("", !0)
      ]),
      i.$slots.default ? (m(), x("div", wM, [
        It(i.$slots, "default")
      ])) : E("", !0)
    ]));
  }
}), MM = { class: "flex flex-1 min-h-0" }, SM = {
  key: 0,
  class: "flex justify-center items-center mt-3 shrink-0"
}, CM = {
  class: "flex-1 overflow-y-auto p-1.5 flex flex-col gap-1",
  "aria-label": "Sections"
}, DM = ["aria-current", "title", "onClick"], AM = {
  key: 1,
  class: "shrink-0 border-t border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)]"
}, TM = { class: "px-4 pt-4 pb-2 shrink-0" }, BM = { class: "text-[12px] font-bold uppercase tracking-widest text-[color:var(--kiut-text-muted)]" }, LM = {
  class: "flex-1 overflow-y-auto px-2 pb-3 flex flex-col gap-1",
  "aria-label": "Section items"
}, FM = ["data-nav-id", "aria-current", "onClick"], PM = /* @__PURE__ */ J({
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
    const a = at(!1), s = e, n = t, o = Vo(), { class: i, ...r } = o, c = S(() => {
      const _ = s.sections.find((b) => b.id === s.selectedSectionId);
      return _?.items?.length ? _ : null;
    });
    function d(_) {
      return s.activePath ? s.activePath === _.path || s.activePath.startsWith(_.path + "/") : !1;
    }
    function u(_) {
      return (_.items ?? []).some(d);
    }
    function h(_) {
      if (!_.items?.length) {
        n("update:selectedSectionId", null), n("navigate", {
          section: _,
          item: { id: _.id, label: _.label, path: _.path }
        });
        return;
      }
      const b = s.selectedSectionId === _.id ? null : _.id;
      n("update:selectedSectionId", b);
    }
    function p(_, b) {
      n("navigate", { section: _, item: b });
    }
    function v(_) {
      return s.selectedSectionId === _.id ? [
        "bg-purple-100 text-purple-900 shadow-sm dark:bg-purple-500/30 dark:text-purple-50"
      ] : u(_) ? ["text-[color:var(--kiut-primary)]", "text-purple-800/90 dark:text-purple-400"] : [
        "text-[color:var(--kiut-text-secondary)]",
        "hover:bg-purple-100/50 hover:text-purple-900",
        "dark:hover:bg-purple-400/20 dark:hover:text-purple-50"
      ];
    }
    function f(_) {
      return d(_) ? [
        "bg-purple-100 text-purple-700",
        "dark:bg-purple-600/20 dark:text-purple-400"
      ] : [
        "text-[color:var(--kiut-text-primary)]",
        "hover:bg-purple-50 hover:text-purple-900",
        "dark:hover:bg-purple-500/30 dark:hover:text-purple-50"
      ];
    }
    return (_, b) => (m(), x("aside", Ss({
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden",
      role: "navigation",
      "aria-label": "Main navigation"
    }, r), [
      l("div", MM, [
        l("div", {
          class: "primary-rail flex flex-col shrink-0 bg-[color:var(--kiut-bg-secondary)] border-r border-[color:var(--kiut-border-light)]",
          style: bt({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: b[0] || (b[0] = (g) => a.value = !0),
          onMouseleave: b[1] || (b[1] = (g) => a.value = !1)
        }, [
          _.$slots.logo ? (m(), x("div", SM, [
            It(_.$slots, "logo", { expanded: a.value }, void 0, !0)
          ])) : E("", !0),
          l("nav", CM, [
            (m(!0), x(q, null, tt(e.sections, (g) => (m(), x("button", {
              key: g.id,
              type: "button",
              "aria-current": e.selectedSectionId === g.id ? "true" : void 0,
              title: g.label,
              class: K(["group relative flex flex-row items-center justify-start gap-1 px-2 py-2 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/20", v(g)]),
              onClick: (y) => h(g)
            }, [
              g.icon ? (m(), dt(ca(g.icon), {
                key: 0,
                class: "shrink-0",
                style: bt({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : E("", !0),
              l("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1",
                style: bt({ fontSize: e.primaryFontSize })
              }, $(g.label), 5)
            ], 10, DM))), 128))
          ]),
          _.$slots.footer ? (m(), x("div", AM, [
            It(_.$slots, "footer", { expanded: a.value }, void 0, !0)
          ])) : E("", !0)
        ], 36),
        Q(Is, { name: "ksn-sub" }, {
          default: Ee(() => [
            c.value ? (m(), x("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 bg-[color:var(--kiut-bg-secondary)] border-r border-[color:var(--kiut-border-light)] overflow-hidden",
              style: bt({ width: e.secondaryWidth })
            }, [
              l("div", TM, [
                l("p", BM, $(c.value.label), 1)
              ]),
              l("nav", LM, [
                (m(!0), x(q, null, tt(c.value.items, (g) => (m(), x("button", {
                  key: g.id,
                  type: "button",
                  "data-nav-id": g.id,
                  "aria-current": d(g) ? "page" : void 0,
                  class: K(["group flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/20", f(g)]),
                  onClick: (y) => p(c.value, g)
                }, [
                  g.icon ? (m(), dt(ca(g.icon), {
                    key: 0,
                    style: bt({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : E("", !0),
                  l("span", {
                    class: "truncate",
                    style: bt({ fontSize: e.secondaryFontSize })
                  }, $(g.label), 5)
                ], 10, FM))), 128))
              ])
            ], 4)) : E("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), IM = /* @__PURE__ */ nt(PM, [["__scopeId", "data-v-b510acff"]]), KM = {
  install(e) {
    e.component("KiutChartBar", ie), e.component("KiutChartLine", ye), e.component("KiutPieChart", Qa), e.component("KiutBoxplotChart", Xh), e.component("KiutCandlestickChart", Ei), e.component("KiutHistogramChart", Oi), e.component("KiutSankeyChart", _e), e.component("KiutAgentsPerDay", rp), e.component("KiutBookingManager", Yp), e.component("KiutCheckin", p0), e.component("KiutCheckinMetrics", z0), e.component("KiutCheckinSegments", fv), e.component("KiutDisruption", Gv), e.component("KiutFAQ", gb), e.component("KiutMessagesPerAgent", wb), e.component("KiutRecordLocator", qb), e.component("KiutSalesByChannel", hm), e.component("KiutSeller", a1), e.component("KiutTopAgents", u1), e.component("KiutPaymentMethod", U1), e.component("KiutAgentHumanConversations", Iy), e.component("KiutChannelMetrics", Uy), e.component("KiutTriageCombinations", h_), e.component("KiutSelectLanguage", w_), e.component("KiutGuardrails", Z_), e.component("KiutDisruptionNotifier", q2), e.component("KiutTotalConversationsCard", tx), e.component("KiutCsatP95Card", ix), e.component("KiutAiGeneratedRevenueCard", hx), e.component("KiutNpsDailyMetrics", Wi), e.component("KiutNpsMetrics", ek), e.component("KiutNpsOverviewMetrics", Hi), e.component("KiutAWSCost", _k), e.component("KiutCostUsage", Hk), e.component("KiutTokenUsage", d5), e.component("KiutConversationCount", $5), e.component("KiutTopAgentsAnalysis", E5), e.component("KiutTopAgentsPie", U5), e.component("KiutDailyCostTrends", sw), e.component("KiutModelUsage", Cw), e.component("KiutMessageRoles", Yw), e.component("KiutCostPerConversations", d$), e.component("Tabs", v$), e.component("Table", S$), e.component("Filters", o4), e.component("InputText", d4), e.component("InputFile", m4), e.component("InputDateTime", $4), e.component("InputTime", T4), e.component("InputRange", j4), e.component("InputNumber", X4), e.component("InputColorPicker", n3), e.component("Select", Yi), e.component("MultiSelect", b3), e.component("Toggle", _3), e.component("InputPhone", D3), e.component("SelectablePills", I3), e.component("SegmentedControl", V3), e.component("DateRangePicker", eM), e.component("Tag", sM), e.component("Button", Ia), e.component("Modal", vM), e.component("Section", $M), e.component("KiutAppShellNavigation", IM);
  }
};
export {
  _k as AWSCost,
  Iy as AgentHumanConversations,
  rp as AgentsPerDay,
  hx as AiGeneratedRevenueCard,
  IM as AppShellNavigation,
  Yp as BookingManager,
  Xh as BoxplotChart,
  Ia as Button,
  Ei as CandlestickChart,
  Uy as ChannelMetrics,
  ie as ChartBar,
  ye as ChartLine,
  p0 as Checkin,
  z0 as CheckinMetrics,
  fv as CheckinSegments,
  $5 as ConversationCount,
  d$ as CostPerConversations,
  Hk as CostUsage,
  ix as CsatP95Card,
  sw as DailyCostTrends,
  eM as DateRangePicker,
  Gv as Disruption,
  q2 as DisruptionNotifier,
  gb as FAQ,
  o4 as Filters,
  Z_ as Guardrails,
  Oi as HistogramChart,
  n3 as InputColorPicker,
  $4 as InputDateTime,
  m4 as InputFile,
  X4 as InputNumber,
  D3 as InputPhone,
  j4 as InputRange,
  d4 as InputText,
  T4 as InputTime,
  KM as KiutUIPlugin,
  Yw as MessageRoles,
  wb as MessagesPerAgent,
  vM as Modal,
  Cw as ModelUsage,
  b3 as MultiSelect,
  Wi as NpsDailyMetrics,
  ek as NpsMetrics,
  Hi as NpsOverviewMetrics,
  U1 as PaymentMethod,
  Qa as PieChart,
  qb as RecordLocator,
  hm as SalesByChannel,
  _e as SankeyChart,
  $M as Section,
  V3 as SegmentedControl,
  Yi as Select,
  w_ as SelectLanguage,
  I3 as SelectablePills,
  a1 as Seller,
  S$ as Table,
  v$ as Tabs,
  sM as Tag,
  _3 as Toggle,
  d5 as TokenUsage,
  u1 as TopAgents,
  E5 as TopAgentsAnalysis,
  U5 as TopAgentsPie,
  tx as TotalConversationsCard,
  h_ as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
