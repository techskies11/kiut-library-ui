import { defineComponent as J, shallowRef as Fo, h as ws, ref as at, onMounted as re, onUnmounted as We, watch as Et, toRaw as $s, nextTick as Ct, version as Ui, isProxy as Po, computed as C, toRef as lt, openBlock as y, createElementBlock as _, createVNode as Q, unref as B, normalizeStyle as xt, createElementVNode as l, toDisplayString as $, createCommentVNode as R, Fragment as q, renderList as tt, onBeforeUnmount as Eo, createStaticVNode as st, withDirectives as Ut, vShow as la, normalizeClass as K, createBlock as ht, createTextVNode as kt, resolveDynamicComponent as Fs, Transition as Ro, withCtx as ta, renderSlot as Wt, useSlots as Io, Teleport as Oo, withModifiers as Jt, withKeys as Ea, vModelText as Ie, useAttrs as qi, mergeProps as tn } from "vue";
import * as en from "echarts/core";
import { TooltipComponent as Xi, TitleComponent as Gi } from "echarts/components";
import { SankeyChart as Zi } from "echarts/charts";
import { CanvasRenderer as Qi } from "echarts/renderers";
import At from "moment";
function ba(e) {
  return e + 0.5 | 0;
}
const ge = (e, t, a) => Math.max(Math.min(e, a), t);
function ea(e) {
  return ge(ba(e * 2.55), 0, 255);
}
function be(e) {
  return ge(ba(e * 255), 0, 255);
}
function se(e) {
  return ge(ba(e / 2.55) / 100, 0, 1);
}
function an(e) {
  return ge(ba(e * 100), 0, 100);
}
const Ht = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Ms = [..."0123456789ABCDEF"], Ji = (e) => Ms[e & 15], tr = (e) => Ms[(e & 240) >> 4] + Ms[e & 15], ya = (e) => (e & 240) >> 4 === (e & 15), er = (e) => ya(e.r) && ya(e.g) && ya(e.b) && ya(e.a);
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
function Vo(e, t, a) {
  const s = t * Math.min(a, 1 - a), n = (o, i = (o + e / 30) % 12) => a - s * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [n(0), n(8), n(4)];
}
function ir(e, t, a) {
  const s = (n, o = (n + e / 60) % 6) => a - a * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [s(5), s(3), s(1)];
}
function rr(e, t, a) {
  const s = Vo(e, 1, 0.5);
  let n;
  for (t + a > 1 && (n = 1 / (t + a), t *= n, a *= n), n = 0; n < 3; n++)
    s[n] *= 1 - t - a, s[n] += t;
  return s;
}
function lr(e, t, a, s, n) {
  return e === n ? (t - a) / s + (t < a ? 6 : 0) : t === n ? (a - e) / s + 2 : (e - t) / s + 4;
}
function Ps(e) {
  const a = e.r / 255, s = e.g / 255, n = e.b / 255, o = Math.max(a, s, n), i = Math.min(a, s, n), r = (o + i) / 2;
  let c, d, u;
  return o !== i && (u = o - i, d = r > 0.5 ? u / (2 - o - i) : u / (o + i), c = lr(a, s, n, u, o), c = c * 60 + 0.5), [c | 0, d || 0, r];
}
function Es(e, t, a, s) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, a, s)).map(be);
}
function Rs(e, t, a) {
  return Es(Vo, e, t, a);
}
function cr(e, t, a) {
  return Es(rr, e, t, a);
}
function dr(e, t, a) {
  return Es(ir, e, t, a);
}
function zo(e) {
  return (e % 360 + 360) % 360;
}
function ur(e) {
  const t = or.exec(e);
  let a = 255, s;
  if (!t)
    return;
  t[5] !== s && (a = t[6] ? ea(+t[5]) : be(+t[5]));
  const n = zo(+t[2]), o = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? s = cr(n, o, i) : t[1] === "hsv" ? s = dr(n, o, i) : s = Rs(n, o, i), {
    r: s[0],
    g: s[1],
    b: s[2],
    a
  };
}
function hr(e, t) {
  var a = Ps(e);
  a[0] = zo(a[0] + t), a = Rs(a), e.r = a[0], e.g = a[1], e.b = a[2];
}
function fr(e) {
  if (!e)
    return;
  const t = Ps(e), a = t[0], s = an(t[1]), n = an(t[2]);
  return e.a < 255 ? `hsla(${a}, ${s}%, ${n}%, ${se(e.a)})` : `hsl(${a}, ${s}%, ${n}%)`;
}
const sn = {
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
}, nn = {
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
  const e = {}, t = Object.keys(nn), a = Object.keys(sn);
  let s, n, o, i, r;
  for (s = 0; s < t.length; s++) {
    for (i = r = t[s], n = 0; n < a.length; n++)
      o = a[n], r = r.replace(o, sn[o]);
    o = parseInt(nn[i], 16), e[r] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return e;
}
let _a;
function pr(e) {
  _a || (_a = gr(), _a.transparent = [0, 0, 0, 0]);
  const t = _a[e.toLowerCase()];
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
const Ja = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, Pe = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function yr(e, t, a) {
  const s = Pe(se(e.r)), n = Pe(se(e.g)), o = Pe(se(e.b));
  return {
    r: be(Ja(s + a * (Pe(se(t.r)) - s))),
    g: be(Ja(n + a * (Pe(se(t.g)) - n))),
    b: be(Ja(o + a * (Pe(se(t.b)) - o))),
    a: e.a + a * (t.a - e.a)
  };
}
function xa(e, t, a) {
  if (e) {
    let s = Ps(e);
    s[t] = Math.max(0, Math.min(s[t] + s[t] * a, t === 0 ? 360 : 1)), s = Rs(s), e.r = s[0], e.g = s[1], e.b = s[2];
  }
}
function No(e, t) {
  return e && Object.assign(t || {}, e);
}
function on(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = be(e[3]))) : (t = No(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = be(t.a)), t;
}
function _r(e) {
  return e.charAt(0) === "r" ? br(e) : ur(e);
}
class ca {
  constructor(t) {
    if (t instanceof ca)
      return t;
    const a = typeof t;
    let s;
    a === "object" ? s = on(t) : a === "string" && (s = ar(t) || pr(t) || _r(t)), this._rgb = s, this._valid = !!s;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = No(this._rgb);
    return t && (t.a = se(t.a)), t;
  }
  set rgb(t) {
    this._rgb = on(t);
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
    return new ca(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = be(t), this;
  }
  clearer(t) {
    const a = this._rgb;
    return a.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, a = ba(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return xa(this._rgb, 2, t), this;
  }
  darken(t) {
    return xa(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return xa(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return xa(this._rgb, 1, -t), this;
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
function ut(e) {
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
const kr = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, Wo = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function mt(e, t, a) {
  if (e && typeof e.call == "function")
    return e.apply(a, t);
}
function pt(e, t, a, s) {
  let n, o, i;
  if (Mt(e))
    for (o = e.length, n = 0; n < o; n++)
      t.call(a, e[n], n);
  else if (ut(e))
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
function Ia(e) {
  if (Mt(e))
    return e.map(Ia);
  if (ut(e)) {
    const t = /* @__PURE__ */ Object.create(null), a = Object.keys(e), s = a.length;
    let n = 0;
    for (; n < s; ++n)
      t[a[n]] = Ia(e[a[n]]);
    return t;
  }
  return e;
}
function Ho(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function wr(e, t, a, s) {
  if (!Ho(e))
    return;
  const n = t[e], o = a[e];
  ut(n) && ut(o) ? da(n, o, s) : t[e] = Ia(o);
}
function da(e, t, a) {
  const s = Mt(t) ? t : [
    t
  ], n = s.length;
  if (!ut(e))
    return e;
  a = a || {};
  const o = a.merger || wr;
  let i;
  for (let r = 0; r < n; ++r) {
    if (i = s[r], !ut(i))
      continue;
    const c = Object.keys(i);
    for (let d = 0, u = c.length; d < u; ++d)
      o(c[d], e, i, a);
  }
  return e;
}
function na(e, t) {
  return da(e, t, {
    merger: $r
  });
}
function $r(e, t, a) {
  if (!Ho(e))
    return;
  const s = t[e], n = a[e];
  ut(s) && ut(n) ? na(s, n) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = Ia(n));
}
const rn = {
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
  return (rn[t] || (rn[t] = Cr(t)))(e);
}
function Is(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const ua = (e) => typeof e < "u", me = (e) => typeof e == "function", ln = (e, t) => {
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
const bt = Math.PI, yt = 2 * bt, Dr = yt + bt, Oa = Number.POSITIVE_INFINITY, Ar = bt / 180, St = bt / 2, ke = bt / 4, cn = bt * 2 / 3, jo = Math.log10, Qt = Math.sign;
function oa(e, t, a) {
  return Math.abs(e - t) < a;
}
function dn(e) {
  const t = Math.round(e);
  e = oa(e, t, e / 1e3) ? t : e;
  const a = Math.pow(10, Math.floor(jo(e))), s = e / a;
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
function ha(e) {
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
  return e * (bt / 180);
}
function Pr(e) {
  return e * (180 / bt);
}
function un(e) {
  if (!Lt(e))
    return;
  let t = 1, a = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, a++;
  return a;
}
function Yo(e, t) {
  const a = t.x - e.x, s = t.y - e.y, n = Math.sqrt(a * a + s * s);
  let o = Math.atan2(s, a);
  return o < -0.5 * bt && (o += yt), {
    angle: o,
    distance: n
  };
}
function Cs(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function Er(e, t) {
  return (e - t + Dr) % yt - bt;
}
function Nt(e) {
  return (e % yt + yt) % yt;
}
function fa(e, t, a, s) {
  const n = Nt(e), o = Nt(t), i = Nt(a), r = Nt(o - n), c = Nt(i - n), d = Nt(n - o), u = Nt(n - i);
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
function Os(e, t, a) {
  a = a || ((i) => e[i] < t);
  let s = e.length - 1, n = 0, o;
  for (; s - n > 1; )
    o = n + s >> 1, a(o) ? n = o : s = o;
  return {
    lo: n,
    hi: s
  };
}
const De = (e, t, a, s) => Os(e, a, s ? (n) => {
  const o = e[n][t];
  return o < a || o === a && e[n + 1][t] === a;
} : (n) => e[n][t] < a), Ir = (e, t, a) => Os(e, a, (s) => e[s][t] >= a);
function Or(e, t, a) {
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
  }), Ko.forEach((a) => {
    const s = "_onData" + Is(a), n = e[a];
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
function hn(e, t) {
  const a = e._chartjs;
  if (!a)
    return;
  const s = a.listeners, n = s.indexOf(t);
  n !== -1 && s.splice(n, 1), !(s.length > 0) && (Ko.forEach((o) => {
    delete e[o];
  }), delete e._chartjs);
}
function Uo(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const qo = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function Xo(e, t) {
  let a = [], s = !1;
  return function(...n) {
    a = n, s || (s = !0, qo.call(window, () => {
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
const Vs = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", Dt = (e, t, a) => e === "start" ? t : e === "end" ? a : (t + a) / 2, Nr = (e, t, a, s) => e === (s ? "left" : "right") ? a : e === "center" ? (t + a) / 2 : t;
function Wr(e, t, a) {
  const s = t.length;
  let n = 0, o = s;
  if (e._sorted) {
    const { iScale: i, vScale: r, _parsed: c } = e, d = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, u = i.axis, { min: h, max: g, minDefined: v, maxDefined: f } = i.getUserBounds();
    if (v) {
      if (n = Math.min(
        // @ts-expect-error Need to type _parsed
        De(c, u, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? s : De(t, u, i.getPixelForValue(h)).lo
      ), d) {
        const x = c.slice(0, n + 1).reverse().findIndex((b) => !gt(b[r.axis]));
        n -= Math.max(0, x);
      }
      n = Tt(n, 0, s - 1);
    }
    if (f) {
      let x = Math.max(
        // @ts-expect-error Need to type _parsed
        De(c, i.axis, g, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? 0 : De(t, u, i.getPixelForValue(g), !0).hi + 1
      );
      if (d) {
        const b = c.slice(x - 1).findIndex((p) => !gt(p[r.axis]));
        x += Math.max(0, b);
      }
      o = Tt(x, n, s) - n;
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
const ka = (e) => e === 0 || e === 1, fn = (e, t, a) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * yt / a)), gn = (e, t, a) => Math.pow(2, -10 * e) * Math.sin((e - t) * yt / a) + 1, ia = {
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
  easeInOutSine: (e) => -0.5 * (Math.cos(bt * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => ka(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => ka(e) ? e : fn(e, 0.075, 0.3),
  easeOutElastic: (e) => ka(e) ? e : gn(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return ka(e) ? e : e < 0.5 ? 0.5 * fn(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * gn(e * 2 - 1, 0.1125, 0.45);
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
function zs(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function pn(e) {
  return zs(e) ? e : new ca(e);
}
function ts(e) {
  return zs(e) ? e : new ca(e).saturate(0.5).darken(0.1).hexString();
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
const vn = /* @__PURE__ */ new Map();
function qr(e, t) {
  t = t || {};
  const a = e + JSON.stringify(t);
  let s = vn.get(a);
  return s || (s = new Intl.NumberFormat(e, t), vn.set(a, s)), s;
}
function Ns(e, t, a) {
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
    const i = jo(Math.abs(o)), r = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), c = {
      notation: n,
      minimumFractionDigits: r,
      maximumFractionDigits: r
    };
    return Object.assign(c, this.options.ticks.format), Ns(e, s, c);
  }
};
function Gr(e, t) {
  let a = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(a) >= 1 && e !== Math.floor(e) && (a = e - Math.floor(e)), a;
}
var Go = {
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
      callback: Go.formatters.values,
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
const Be = /* @__PURE__ */ Object.create(null), Ss = /* @__PURE__ */ Object.create(null);
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
function es(e, t, a) {
  return typeof t == "string" ? da(ra(e, t), a) : da(ra(e, ""), t);
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
    }, this.hover = {}, this.hoverBackgroundColor = (s, n) => ts(n.backgroundColor), this.hoverBorderColor = (s, n) => ts(n.borderColor), this.hoverColor = (s, n) => ts(n.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(a);
  }
  set(t, a) {
    return es(this, t, a);
  }
  get(t) {
    return ra(this, t);
  }
  describe(t, a) {
    return es(Ss, t, a);
  }
  override(t, a) {
    return es(Be, t, a);
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
          return ut(c) ? Object.assign({}, d, c) : it(c, d);
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
function bn(e, t, a, s, n) {
  let o = t[n];
  return o || (o = t[n] = e.measureText(n).width, a.push(n)), o > s && (s = o), s;
}
function we(e, t, a) {
  const s = e.currentDevicePixelRatio, n = a !== 0 ? Math.max(a / 2, 0.5) : 0;
  return Math.round((t - n) * s) / s + n;
}
function mn(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Ds(e, t, a, s) {
  Zo(e, t, a, s, null);
}
function Zo(e, t, a, s, n) {
  let o, i, r, c, d, u, h, g;
  const v = t.pointStyle, f = t.rotation, x = t.radius;
  let b = (f || 0) * Ar;
  if (v && typeof v == "object" && (o = v.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(a, s), e.rotate(b), e.drawImage(v, -v.width / 2, -v.height / 2, v.width, v.height), e.restore();
    return;
  }
  if (!(isNaN(x) || x <= 0)) {
    switch (e.beginPath(), v) {
      // Default includes circle
      default:
        n ? e.ellipse(a, s, n / 2, x, 0, 0, yt) : e.arc(a, s, x, 0, yt), e.closePath();
        break;
      case "triangle":
        u = n ? n / 2 : x, e.moveTo(a + Math.sin(b) * u, s - Math.cos(b) * x), b += cn, e.lineTo(a + Math.sin(b) * u, s - Math.cos(b) * x), b += cn, e.lineTo(a + Math.sin(b) * u, s - Math.cos(b) * x), e.closePath();
        break;
      case "rectRounded":
        d = x * 0.516, c = x - d, i = Math.cos(b + ke) * c, h = Math.cos(b + ke) * (n ? n / 2 - d : c), r = Math.sin(b + ke) * c, g = Math.sin(b + ke) * (n ? n / 2 - d : c), e.arc(a - h, s - r, d, b - bt, b - St), e.arc(a + g, s - i, d, b - St, b), e.arc(a + h, s + r, d, b, b + St), e.arc(a - g, s + i, d, b + St, b + bt), e.closePath();
        break;
      case "rect":
        if (!f) {
          c = Math.SQRT1_2 * x, u = n ? n / 2 : c, e.rect(a - u, s - c, 2 * u, 2 * c);
          break;
        }
        b += ke;
      /* falls through */
      case "rectRot":
        h = Math.cos(b) * (n ? n / 2 : x), i = Math.cos(b) * x, r = Math.sin(b) * x, g = Math.sin(b) * (n ? n / 2 : x), e.moveTo(a - h, s - r), e.lineTo(a + g, s - i), e.lineTo(a + h, s + r), e.lineTo(a - g, s + i), e.closePath();
        break;
      case "crossRot":
        b += ke;
      /* falls through */
      case "cross":
        h = Math.cos(b) * (n ? n / 2 : x), i = Math.cos(b) * x, r = Math.sin(b) * x, g = Math.sin(b) * (n ? n / 2 : x), e.moveTo(a - h, s - r), e.lineTo(a + h, s + r), e.moveTo(a + g, s - i), e.lineTo(a - g, s + i);
        break;
      case "star":
        h = Math.cos(b) * (n ? n / 2 : x), i = Math.cos(b) * x, r = Math.sin(b) * x, g = Math.sin(b) * (n ? n / 2 : x), e.moveTo(a - h, s - r), e.lineTo(a + h, s + r), e.moveTo(a + g, s - i), e.lineTo(a - g, s + i), b += ke, h = Math.cos(b) * (n ? n / 2 : x), i = Math.cos(b) * x, r = Math.sin(b) * x, g = Math.sin(b) * (n ? n / 2 : x), e.moveTo(a - h, s - r), e.lineTo(a + h, s + r), e.moveTo(a + g, s - i), e.lineTo(a - g, s + i);
        break;
      case "line":
        i = n ? n / 2 : Math.cos(b) * x, r = Math.sin(b) * x, e.moveTo(a - i, s - r), e.lineTo(a + i, s + r);
        break;
      case "dash":
        e.moveTo(a, s), e.lineTo(a + Math.cos(b) * (n ? n / 2 : x), s + Math.sin(b) * x);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function ga(e, t, a) {
  return a = a || 0.5, !t || e && e.x > t.left - a && e.x < t.right + a && e.y > t.top - a && e.y < t.bottom + a;
}
function Ha(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function ja(e) {
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
function pa(e, t, a, s, n, o = {}) {
  const i = Mt(t) ? t : [
    t
  ], r = o.strokeWidth > 0 && o.strokeColor !== "";
  let c, d;
  for (e.save(), e.font = n.string, al(e, o), c = 0; c < i.length; ++c)
    d = i[c], o.backdrop && nl(e, o.backdrop), r && (o.strokeColor && (e.strokeStyle = o.strokeColor), gt(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(d, a, s, o.maxWidth)), e.fillText(d, a, s, o.maxWidth), sl(e, a, s, d, o), s += Number(n.lineHeight);
  e.restore();
}
function Va(e, t) {
  const { x: a, y: s, w: n, h: o, radius: i } = t;
  e.arc(a + i.topLeft, s + i.topLeft, i.topLeft, 1.5 * bt, bt, !0), e.lineTo(a, s + o - i.bottomLeft), e.arc(a + i.bottomLeft, s + o - i.bottomLeft, i.bottomLeft, bt, St, !0), e.lineTo(a + n - i.bottomRight, s + o), e.arc(a + n - i.bottomRight, s + o - i.bottomRight, i.bottomRight, St, 0, !0), e.lineTo(a + n, s + i.topRight), e.arc(a + n - i.topRight, s + i.topRight, i.topRight, 0, -St, !0), e.lineTo(a + i.topLeft, s);
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
function Ws(e, t) {
  const a = {}, s = ut(t), n = s ? Object.keys(t) : t, o = ut(e) ? s ? (i) => it(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of n)
    a[i] = ll(o(i));
  return a;
}
function Qo(e) {
  return Ws(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function Oe(e) {
  return Ws(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function Yt(e) {
  const t = Qo(e);
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
function wa(e, t, a, s) {
  let n, o, i;
  for (n = 0, o = e.length; n < o; ++n)
    if (i = e[n], i !== void 0 && i !== void 0)
      return i;
}
function cl(e, t, a) {
  const { min: s, max: n } = e, o = Wo(t, (n - s) / 2), i = (r, c) => a && r === 0 ? 0 : r + c;
  return {
    min: i(s, -Math.abs(o)),
    max: i(n, o)
  };
}
function Le(e, t) {
  return Object.assign(Object.create(e), t);
}
function Hs(e, t = [
  ""
], a, s, n = () => e[0]) {
  const o = a || e;
  typeof s > "u" && (s = ai("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: o,
    _fallback: s,
    _getTarget: n,
    override: (r) => Hs([
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
      return ti(r, c, () => bl(c, t, e, r));
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
      return _n(r).includes(c);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(r) {
      return _n(r);
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
function ze(e, t, a, s) {
  const n = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: a,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: Jo(e, s),
    setContext: (o) => ze(e, o, a, s),
    override: (o) => ze(e.override(o), t, a, s)
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
      return ti(o, i, () => ul(o, i, r));
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
function Jo(e, t = {
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
const dl = (e, t) => e ? e + Is(t) : t, js = (e, t) => ut(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function ti(e, t, a) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const s = a();
  return e[t] = s, s;
}
function ul(e, t, a) {
  const { _proxy: s, _context: n, _subProxy: o, _descriptors: i } = e;
  let r = s[t];
  return me(r) && i.isScriptable(t) && (r = hl(t, r, e, a)), Mt(r) && r.length && (r = fl(t, r, e, i.isIndexable)), js(t, r) && (r = ze(r, n, o && o[t], i)), r;
}
function hl(e, t, a, s) {
  const { _proxy: n, _context: o, _subProxy: i, _stack: r } = a;
  if (r.has(e))
    throw new Error("Recursion detected: " + Array.from(r).join("->") + "->" + e);
  r.add(e);
  let c = t(o, i || s);
  return r.delete(e), js(e, c) && (c = Ys(n._scopes, n, e, c)), c;
}
function fl(e, t, a, s) {
  const { _proxy: n, _context: o, _subProxy: i, _descriptors: r } = a;
  if (typeof o.index < "u" && s(e))
    return t[o.index % t.length];
  if (ut(t[0])) {
    const c = t, d = n._scopes.filter((u) => u !== c);
    t = [];
    for (const u of c) {
      const h = Ys(d, n, e, u);
      t.push(ze(h, o, i && i[e], r));
    }
  }
  return t;
}
function ei(e, t, a) {
  return me(e) ? e(t, a) : e;
}
const gl = (e, t) => e === !0 ? t : typeof e == "string" ? Te(t, e) : void 0;
function pl(e, t, a, s, n) {
  for (const o of t) {
    const i = gl(a, o);
    if (i) {
      e.add(i);
      const r = ei(i._fallback, a, n);
      if (typeof r < "u" && r !== a && r !== s)
        return r;
    } else if (i === !1 && typeof s < "u" && a !== s)
      return null;
  }
  return !1;
}
function Ys(e, t, a, s) {
  const n = t._rootScopes, o = ei(t._fallback, a, s), i = [
    ...e,
    ...n
  ], r = /* @__PURE__ */ new Set();
  r.add(s);
  let c = yn(r, i, a, o || a, s);
  return c === null || typeof o < "u" && o !== a && (c = yn(r, i, o, c, s), c === null) ? !1 : Hs(Array.from(r), [
    ""
  ], n, o, () => vl(t, a, s));
}
function yn(e, t, a, s, n) {
  for (; a; )
    a = pl(e, t, a, s, n);
  return a;
}
function vl(e, t, a) {
  const s = e._getTarget();
  t in s || (s[t] = {});
  const n = s[t];
  return Mt(n) && ut(a) ? a : n || {};
}
function bl(e, t, a, s) {
  let n;
  for (const o of t)
    if (n = ai(dl(o, e), a), typeof n < "u")
      return js(e, n) ? Ys(a, s, e, n) : n;
}
function ai(e, t) {
  for (const a of t) {
    if (!a)
      continue;
    const s = a[e];
    if (typeof s < "u")
      return s;
  }
}
function _n(e) {
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
const yl = Number.EPSILON || 1e-14, Ne = (e, t) => t < e.length && !e[t].skip && e[t], si = (e) => e === "x" ? "y" : "x";
function _l(e, t, a, s) {
  const n = e.skip ? t : e, o = t, i = a.skip ? t : a, r = Cs(o, n), c = Cs(i, o);
  let d = r / (r + c), u = c / (r + c);
  d = isNaN(d) ? 0 : d, u = isNaN(u) ? 0 : u;
  const h = s * d, g = s * u;
  return {
    previous: {
      x: o.x - h * (i.x - n.x),
      y: o.y - h * (i.y - n.y)
    },
    next: {
      x: o.x + g * (i.x - n.x),
      y: o.y + g * (i.y - n.y)
    }
  };
}
function xl(e, t, a) {
  const s = e.length;
  let n, o, i, r, c, d = Ne(e, 0);
  for (let u = 0; u < s - 1; ++u)
    if (c = d, d = Ne(e, u + 1), !(!c || !d)) {
      if (oa(t[u], 0, yl)) {
        a[u] = a[u + 1] = 0;
        continue;
      }
      n = a[u] / t[u], o = a[u + 1] / t[u], r = Math.pow(n, 2) + Math.pow(o, 2), !(r <= 9) && (i = 3 / Math.sqrt(r), a[u] = n * i * t[u], a[u + 1] = o * i * t[u]);
    }
}
function kl(e, t, a = "x") {
  const s = si(a), n = e.length;
  let o, i, r, c = Ne(e, 0);
  for (let d = 0; d < n; ++d) {
    if (i = r, r = c, c = Ne(e, d + 1), !r)
      continue;
    const u = r[a], h = r[s];
    i && (o = (u - i[a]) / 3, r[`cp1${a}`] = u - o, r[`cp1${s}`] = h - o * t[d]), c && (o = (c[a] - u) / 3, r[`cp2${a}`] = u + o, r[`cp2${s}`] = h + o * t[d]);
  }
}
function wl(e, t = "x") {
  const a = si(t), s = e.length, n = Array(s).fill(0), o = Array(s);
  let i, r, c, d = Ne(e, 0);
  for (i = 0; i < s; ++i)
    if (r = c, c = d, d = Ne(e, i + 1), !!c) {
      if (d) {
        const u = d[t] - c[t];
        n[i] = u !== 0 ? (d[a] - c[a]) / u : 0;
      }
      o[i] = r ? d ? Qt(n[i - 1]) !== Qt(n[i]) ? 0 : (n[i - 1] + n[i]) / 2 : n[i - 1] : n[i];
    }
  xl(e, n, o), kl(e, o, t);
}
function $a(e, t, a) {
  return Math.max(Math.min(e, a), t);
}
function $l(e, t) {
  let a, s, n, o, i, r = ga(e[0], t);
  for (a = 0, s = e.length; a < s; ++a)
    i = o, o = r, r = a < s - 1 && ga(e[a + 1], t), o && (n = e[a], i && (n.cp1x = $a(n.cp1x, t.left, t.right), n.cp1y = $a(n.cp1y, t.top, t.bottom)), r && (n.cp2x = $a(n.cp2x, t.left, t.right), n.cp2y = $a(n.cp2y, t.top, t.bottom)));
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
function Ks() {
  return typeof window < "u" && typeof document < "u";
}
function Us(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function za(e, t, a) {
  let s;
  return typeof e == "string" ? (s = parseInt(e, 10), e.indexOf("%") !== -1 && (s = s / 100 * t.parentNode[a])) : s = e, s;
}
const Ya = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Cl(e, t) {
  return Ya(e).getPropertyValue(t);
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
  const { canvas: a, currentDevicePixelRatio: s } = t, n = Ya(a), o = n.boxSizing === "border-box", i = Ae(n, "padding"), r = Ae(n, "border", "width"), { x: c, y: d, box: u } = Al(e, a), h = i.left + (u && r.left), g = i.top + (u && r.top);
  let { width: v, height: f } = t;
  return o && (v -= i.width + r.width, f -= i.height + r.height), {
    x: Math.round((c - h) / v * a.width / s),
    y: Math.round((d - g) / f * a.height / s)
  };
}
function Tl(e, t, a) {
  let s, n;
  if (t === void 0 || a === void 0) {
    const o = e && Us(e);
    if (!o)
      t = e.clientWidth, a = e.clientHeight;
    else {
      const i = o.getBoundingClientRect(), r = Ya(o), c = Ae(r, "border", "width"), d = Ae(r, "padding");
      t = i.width - d.width - c.width, a = i.height - d.height - c.height, s = za(r.maxWidth, o, "clientWidth"), n = za(r.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: a,
    maxWidth: s || Oa,
    maxHeight: n || Oa
  };
}
const pe = (e) => Math.round(e * 10) / 10;
function Bl(e, t, a, s) {
  const n = Ya(e), o = Ae(n, "margin"), i = za(n.maxWidth, e, "clientWidth") || Oa, r = za(n.maxHeight, e, "clientHeight") || Oa, c = Tl(e, t, a);
  let { width: d, height: u } = c;
  if (n.boxSizing === "content-box") {
    const g = Ae(n, "border", "width"), v = Ae(n, "padding");
    d -= v.width + g.width, u -= v.height + g.height;
  }
  return d = Math.max(0, d - o.width), u = Math.max(0, s ? d / s : u - o.height), d = pe(Math.min(d, i, c.maxWidth)), u = pe(Math.min(u, r, c.maxHeight)), d && !u && (u = pe(d / 2)), (t !== void 0 || a !== void 0) && s && c.height && u > c.height && (u = c.height, d = pe(Math.floor(u * s))), {
    width: d,
    height: u
  };
}
function xn(e, t, a) {
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
    Ks() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function kn(e, t) {
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
function Ve(e, t, a) {
  return e ? El(t, a) : Rl();
}
function ni(e, t) {
  let a, s;
  (t === "ltr" || t === "rtl") && (a = e.canvas.style, s = [
    a.getPropertyValue("direction"),
    a.getPropertyPriority("direction")
  ], a.setProperty("direction", t, "important"), e.prevTextDirection = s);
}
function oi(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function ii(e) {
  return e === "angle" ? {
    between: fa,
    compare: Er,
    normalize: Nt
  } : {
    between: oe,
    compare: (t, a) => t - a,
    normalize: (t) => t
  };
}
function wn({ start: e, end: t, count: a, loop: s, style: n }) {
  return {
    start: e % a,
    end: t % a,
    loop: s && (t - e + 1) % a === 0,
    style: n
  };
}
function Il(e, t, a) {
  const { property: s, start: n, end: o } = a, { between: i, normalize: r } = ii(s), c = t.length;
  let { start: d, end: u, loop: h } = e, g, v;
  if (h) {
    for (d += c, u += c, g = 0, v = c; g < v && i(r(t[d % c][s]), n, o); ++g)
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
function ri(e, t, a) {
  if (!a)
    return [
      e
    ];
  const { property: s, start: n, end: o } = a, i = t.length, { compare: r, between: c, normalize: d } = ii(s), { start: u, end: h, loop: g, style: v } = Il(e, t, a), f = [];
  let x = !1, b = null, p, m, w;
  const k = () => c(n, w, p) && r(n, w) !== 0, M = () => r(o, p) === 0 || c(o, w, p), S = () => x || k(), D = () => !x || M();
  for (let A = u, T = u; A <= h; ++A)
    m = t[A % i], !m.skip && (p = d(m[s]), p !== w && (x = c(p, n, o), b === null && S() && (b = r(p, n) === 0 ? A : T), b !== null && D() && (f.push(wn({
      start: b,
      end: A,
      loop: g,
      count: i,
      style: v
    })), b = null), T = A, w = p));
  return b !== null && f.push(wn({
    start: b,
    end: h,
    loop: g,
    count: i,
    style: v
  })), f;
}
function li(e, t) {
  const a = [], s = e.segments;
  for (let n = 0; n < s.length; n++) {
    const o = ri(s[n], e.points, t);
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
    return $n(e, [
      {
        start: i,
        end: r,
        loop: o
      }
    ], a, t);
  const c = r < i ? r + n : r, d = !!e._fullLoop && i === 0 && r === n - 1;
  return $n(e, Vl(a, i, c, d), a, t);
}
function $n(e, t, a, s) {
  return !s || !s.setContext || !a ? t : Nl(e, t, a, s);
}
function Nl(e, t, a, s) {
  const n = e._chart.getContext(), o = Mn(e.options), { _datasetIndex: i, options: { spanGaps: r } } = e, c = a.length, d = [];
  let u = o, h = t[0].start, g = h;
  function v(f, x, b, p) {
    const m = r ? -1 : 1;
    if (f !== x) {
      for (f += c; a[f % c].skip; )
        f -= m;
      for (; a[x % c].skip; )
        x += m;
      f % c !== x % c && (d.push({
        start: f % c,
        end: x % c,
        loop: b,
        style: p
      }), u = p, h = x % c);
    }
  }
  for (const f of t) {
    h = r ? h : f.start;
    let x = a[h % c], b;
    for (g = h + 1; g <= f.end; g++) {
      const p = a[g % c];
      b = Mn(s.setContext(Le(n, {
        type: "segment",
        p0: x,
        p1: p,
        p0DataIndex: (g - 1) % c,
        p1DataIndex: g % c,
        datasetIndex: i
      }))), Wl(b, u) && v(h, g - 1, f.loop, u), x = p, u = b;
    }
    h < g - 1 && v(h, g - 1, f.loop, u);
  }
  return d;
}
function Mn(e) {
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
    return zs(o) ? (a.includes(o) || a.push(o), a.indexOf(o)) : o;
  };
  return JSON.stringify(e, s) !== JSON.stringify(t, s);
}
function Ma(e, t, a) {
  return e.options.clip ? e[a] : t[a];
}
function Hl(e, t) {
  const { xScale: a, yScale: s } = e;
  return a && s ? {
    left: Ma(a, t, "left"),
    right: Ma(a, t, "right"),
    top: Ma(s, t, "top"),
    bottom: Ma(s, t, "bottom")
  } : t;
}
function ci(e, t) {
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
    this._request || (this._running = !0, this._request = qo.call(window, () => {
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
const Cn = "transparent", Yl = {
  boolean(e, t, a) {
    return a > 0.5 ? t : e;
  },
  color(e, t, a) {
    const s = pn(e || Cn), n = s.valid && pn(t || Cn);
    return n && n.valid ? n.mix(s, a).hexString() : t;
  },
  number(e, t, a) {
    return e + (t - e) * a;
  }
};
class Kl {
  constructor(t, a, s, n) {
    const o = a[s];
    n = wa([
      t.to,
      n,
      o,
      t.from
    ]);
    const i = wa([
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
      this._start = s, this._duration = Math.floor(Math.max(i, t.duration)), this._total += o, this._loop = !!t.loop, this._to = wa([
        t.to,
        a,
        n,
        t.from
      ]), this._from = wa([
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
class di {
  constructor(t, a) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(a);
  }
  configure(t) {
    if (!ut(t))
      return;
    const a = Object.keys($t.animation), s = this._properties;
    Object.getOwnPropertyNames(t).forEach((n) => {
      const o = t[n];
      if (!ut(o))
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
      const g = s.get(d);
      if (h)
        if (g && h.active()) {
          h.update(g, u, r);
          continue;
        } else
          h.cancel();
      if (!g || !g.duration) {
        t[d] = u;
        continue;
      }
      o[d] = h = new Kl(g, t, d, u), n.push(h);
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
function Sn(e, t) {
  const a = e && e.options || {}, s = a.reverse, n = a.min === void 0 ? t : 0, o = a.max === void 0 ? t : 0;
  return {
    start: s ? o : n,
    end: s ? n : o
  };
}
function Xl(e, t, a) {
  if (a === !1)
    return !1;
  const s = Sn(e, a), n = Sn(t, a);
  return {
    top: n.end,
    right: s.end,
    bottom: n.start,
    left: s.start
  };
}
function Gl(e) {
  let t, a, s, n;
  return ut(e) ? (t = e.top, a = e.right, s = e.bottom, n = e.left) : t = a = s = n = e, {
    top: t,
    right: a,
    bottom: s,
    left: n,
    disabled: e === !1
  };
}
function ui(e, t) {
  const a = [], s = e._getSortedDatasetMetas(t);
  let n, o;
  for (n = 0, o = s.length; n < o; ++n)
    a.push(s[n].index);
  return a;
}
function Dn(e, t, a, s = {}) {
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
function as(e, t) {
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
function An(e, t, a, s) {
  for (const n of t.getMatchingVisibleMetas(s).reverse()) {
    const o = e[n.index];
    if (a && o > 0 || !a && o < 0)
      return n.index;
  }
  return null;
}
function Tn(e, t) {
  const { chart: a, _cachedMeta: s } = e, n = a._stacks || (a._stacks = {}), { iScale: o, vScale: i, index: r } = s, c = o.axis, d = i.axis, u = Ql(o, i, s), h = t.length;
  let g;
  for (let v = 0; v < h; ++v) {
    const f = t[v], { [c]: x, [d]: b } = f, p = f._stacks || (f._stacks = {});
    g = p[d] = tc(n, u, x), g[r] = b, g._top = An(g, i, !0, s.type), g._bottom = An(g, i, !1, s.type);
    const m = g._visualValues || (g._visualValues = {});
    m[r] = b;
  }
}
function ss(e, t) {
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
function Ue(e, t) {
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
const ns = (e) => e === "reset" || e === "none", Bn = (e, t) => t ? e : Object.assign({}, e), sc = (e, t, a) => e && !t.hidden && t._stacked && {
  keys: ui(a, !0),
  values: null
};
class Ka {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, a) {
    this.chart = t, this._ctx = t.ctx, this.index = a, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = as(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && Ue(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, a = this._cachedMeta, s = this.getDataset(), n = (h, g, v, f) => h === "x" ? g : h === "r" ? f : v, o = a.xAxisID = it(s.xAxisID, ss(t, "x")), i = a.yAxisID = it(s.yAxisID, ss(t, "y")), r = a.rAxisID = it(s.rAxisID, ss(t, "r")), c = a.indexAxis, d = a.iAxisID = n(c, o, i, r), u = a.vAxisID = n(c, i, o, r);
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
    this._data && hn(this._data, this), t._stacked && Ue(t);
  }
  _dataCheck() {
    const t = this.getDataset(), a = t.data || (t.data = []), s = this._data;
    if (ut(a)) {
      const n = this._cachedMeta;
      this._data = Zl(a, n);
    } else if (s !== a) {
      if (s) {
        hn(s, this);
        const n = this._cachedMeta;
        Ue(n), n._parsed = [];
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
    a._stacked = as(a.vScale, a), a.stack !== s.stack && (n = !0, Ue(a), a.stack = s.stack), this._resyncElements(t), (n || o !== a._stacked) && (Tn(this, a._parsed), a._stacked = as(a.vScale, a));
  }
  configure() {
    const t = this.chart.config, a = t.datasetScopeKeys(this._type), s = t.getOptionScopes(this.getDataset(), a, !0);
    this.options = t.createResolver(s, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, a) {
    const { _cachedMeta: s, _data: n } = this, { iScale: o, _stacked: i } = s, r = o.axis;
    let c = t === 0 && a === n.length ? !0 : s._sorted, d = t > 0 && s._parsed[t - 1], u, h, g;
    if (this._parsing === !1)
      s._parsed = n, s._sorted = !0, g = n;
    else {
      Mt(n[t]) ? g = this.parseArrayData(s, n, t, a) : ut(n[t]) ? g = this.parseObjectData(s, n, t, a) : g = this.parsePrimitiveData(s, n, t, a);
      const v = () => h[r] === null || d && h[r] < d[r];
      for (u = 0; u < a; ++u)
        s._parsed[u + t] = h = g[u], c && (v() && (c = !1), d = h);
      s._sorted = c;
    }
    i && Tn(this, g);
  }
  parsePrimitiveData(t, a, s, n) {
    const { iScale: o, vScale: i } = t, r = o.axis, c = i.axis, d = o.getLabels(), u = o === i, h = new Array(n);
    let g, v, f;
    for (g = 0, v = n; g < v; ++g)
      f = g + s, h[g] = {
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
    let u, h, g, v;
    for (u = 0, h = n; u < h; ++u)
      g = u + s, v = a[g], d[u] = {
        x: o.parse(Te(v, r), g),
        y: i.parse(Te(v, c), g)
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
      keys: ui(n, !0),
      values: a._stacks[t.axis]._visualValues
    };
    return Dn(r, i, o.index, {
      mode: s
    });
  }
  updateRangeFromParsed(t, a, s, n) {
    const o = s[a.axis];
    let i = o === null ? NaN : o;
    const r = n && s._stacks[a.axis];
    n && r && (n.values = r, i = Dn(n, o, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, a) {
    const s = this._cachedMeta, n = s._parsed, o = s._sorted && t === s.iScale, i = n.length, r = this._getOtherScale(t), c = sc(a, s, this.chart), d = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: u, max: h } = Jl(r);
    let g, v;
    function f() {
      v = n[g];
      const x = v[r.axis];
      return !Lt(v[t.axis]) || u > x || h < x;
    }
    for (g = 0; g < i && !(!f() && (this.updateRangeFromParsed(d, t, v, c), o)); ++g)
      ;
    if (o) {
      for (g = i - 1; g >= 0; --g)
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
    const n = a === "active", o = this._cachedDataOpts, i = t + "-" + a, r = o[i], c = this.enableOptionSharing && ua(s);
    if (r)
      return Bn(r, c);
    const d = this.chart.config, u = d.datasetElementScopeKeys(this._type, t), h = n ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], g = d.getOptionScopes(this.getDataset(), u), v = Object.keys($t.elements[t]), f = () => this.getContext(s, n, a), x = d.resolveNamedOptions(g, v, f, h);
    return x.$shared && (x.$shared = c, o[i] = Object.freeze(Bn(x, c))), x;
  }
  _resolveAnimations(t, a, s) {
    const n = this.chart, o = this._cachedDataOpts, i = `animation-${a}`, r = o[i];
    if (r)
      return r;
    let c;
    if (n.options.animation !== !1) {
      const u = this.chart.config, h = u.datasetAnimationScopeKeys(this._type, a), g = u.getOptionScopes(this.getDataset(), h);
      c = u.createResolver(g, this.getContext(t, s, a));
    }
    const d = new di(n, c && c.animations);
    return c && c._cacheable && (o[i] = Object.freeze(d)), d;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, a) {
    return !a || ns(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, a) {
    const s = this.resolveDataElementOptions(t, a), n = this._sharedOptions, o = this.getSharedOptions(s), i = this.includeOptions(a, o) || o !== n;
    return this.updateSharedOptions(o, a, s), {
      sharedOptions: o,
      includeOptions: i
    };
  }
  updateElement(t, a, s, n) {
    ns(n) ? Object.assign(t, s) : this._resolveAnimations(a, n).update(t, s);
  }
  updateSharedOptions(t, a, s) {
    t && !ns(a) && this._resolveAnimations(void 0, a).update(t, s);
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
      s._stacked && Ue(s, n);
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
    e._cache.$bar = Uo(s.sort((n, o) => n - o));
  }
  return e._cache.$bar;
}
function oc(e) {
  const t = e.iScale, a = nc(t, e.type);
  let s = t._length, n, o, i, r;
  const c = () => {
    i === 32767 || i === -32768 || (ua(r) && (s = Math.min(s, Math.abs(i - r) || s)), r = i);
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
function hi(e, t, a, s) {
  return Mt(e) ? lc(e, t, a, s) : t[a.axis] = a.parse(e, s), t;
}
function Ln(e, t, a, s) {
  const n = e.iScale, o = e.vScale, i = n.getLabels(), r = n === o, c = [];
  let d, u, h, g;
  for (d = a, u = a + s; d < u; ++d)
    g = t[d], h = {}, h[n.axis] = r || n.parse(i[d], d), c.push(hi(g, h, o, d));
  return c;
}
function os(e) {
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
  n === "middle" && a && (e.enableBorderRadius = !0, (a._top || 0) === s ? n = d : (a._bottom || 0) === s ? n = u : (o[Fn(u, i, r, c)] = !0, n = d)), o[Fn(n, i, r, c)] = !0, e.borderSkipped = o;
}
function Fn(e, t, a, s) {
  return s ? (e = hc(e, t, a), e = Pn(e, a, t)) : e = Pn(e, t, a), e;
}
function hc(e, t, a) {
  return e === t ? a : e === a ? t : e;
}
function Pn(e, t, a) {
  return e === "start" ? t : e === "end" ? a : e;
}
function fc(e, { inflateAmount: t }, a) {
  e.inflateAmount = t === "auto" ? a === 1 ? 0.33 : 0 : t;
}
class gc extends Ka {
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
    return Ln(t, a, s, n);
  }
  parseArrayData(t, a, s, n) {
    return Ln(t, a, s, n);
  }
  parseObjectData(t, a, s, n) {
    const { iScale: o, vScale: i } = t, { xAxisKey: r = "x", yAxisKey: c = "y" } = this._parsing, d = o.axis === "x" ? r : c, u = i.axis === "x" ? r : c, h = [];
    let g, v, f, x;
    for (g = s, v = s + n; g < v; ++g)
      x = a[g], f = {}, f[o.axis] = o.parse(Te(x, d), g), h.push(hi(Te(x, u), f, i, g));
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
    const a = this._cachedMeta, { iScale: s, vScale: n } = a, o = this.getParsed(t), i = o._custom, r = os(i) ? "[" + i.start + ", " + i.end + "]" : "" + n.getLabelForValue(o[n.axis]);
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
    const o = n === "reset", { index: i, _cachedMeta: { vScale: r } } = this, c = r.getBasePixel(), d = r.isHorizontal(), u = this._getRuler(), { sharedOptions: h, includeOptions: g } = this._getSharedOptions(a, n);
    for (let v = a; v < a + s; v++) {
      const f = this.getParsed(v), x = o || gt(f[r.axis]) ? {
        base: c,
        head: c
      } : this._calculateBarValuePixels(v), b = this._calculateBarIndexPixels(v, u), p = (f._stacks || {})[r.axis], m = {
        horizontal: d,
        base: x.base,
        enableBorderRadius: !p || os(f._custom) || i === p._top || i === p._bottom,
        x: d ? x.head : b.center,
        y: d ? b.center : x.head,
        height: d ? b.size : Math.abs(x.size),
        width: d ? Math.abs(x.size) : b.size
      };
      g && (m.options = h || this.resolveDataElementOptions(v, t[v].active ? "active" : n));
      const w = m.options || t[v].options;
      uc(m, w, p, i), fc(m, w, u.ratio), this.updateElement(t[v], v, m, n);
    }
  }
  _getStacks(t, a) {
    const { iScale: s } = this._cachedMeta, n = s.getMatchingVisibleMetas(this._type).filter((u) => u.controller.options.grouped), o = s.options.stacked, i = [], r = this._cachedMeta.controller.getParsed(a), c = r && r[s.axis], d = (u) => {
      const h = u._parsed.find((v) => v[s.axis] === c), g = h && h[u.vScale.axis];
      if (gt(g) || isNaN(g))
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
    const { _cachedMeta: { vScale: a, _stacked: s, index: n }, options: { base: o, minBarLength: i } } = this, r = o || 0, c = this.getParsed(t), d = c._custom, u = os(d);
    let h = c[a.axis], g = 0, v = s ? this.applyStack(a, c, s) : h, f, x;
    v !== h && (g = v - h, v = h), u && (h = d.barStart, v = d.barEnd - d.barStart, h !== 0 && Qt(h) !== Qt(d.barEnd) && (g = 0), g += h);
    const b = !gt(o) && !u ? o : g;
    let p = a.getPixelForValue(b);
    if (this.chart.getDataVisibility(t) ? f = a.getPixelForValue(g + v) : f = p, x = f - p, Math.abs(x) < i) {
      x = cc(x, a, r) * i, h === r && (p -= x / 2);
      const m = a.getPixelForDecimal(0), w = a.getPixelForDecimal(1), k = Math.min(m, w), M = Math.max(m, w);
      p = Math.max(Math.min(p, M), k), f = p + x, s && !u && (c._stacks[a.axis]._visualValues[n] = a.getValueForPixel(f) - a.getValueForPixel(p));
    }
    if (p === a.getPixelForValue(r)) {
      const m = Qt(x) * a.getLineWidthForValue(r) / 2;
      p += m, x -= m;
    }
    return {
      size: x,
      base: p,
      head: f,
      center: f + x / 2
    };
  }
  _calculateBarIndexPixels(t, a) {
    const s = a.scale, n = this.options, o = n.skipNull, i = it(n.maxBarThickness, 1 / 0);
    let r, c;
    const d = this._getAxisCount();
    if (a.grouped) {
      const u = o ? this._getStackCount(t) : a.stackCount, h = n.barThickness === "flex" ? rc(t, a, n, u * d) : ic(t, a, n, u * d), g = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, v = this._getAxis().indexOf(it(g, this.getFirstScaleIdForIndexAxis())), f = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + v;
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
  if (t < yt) {
    const r = e, c = r + t, d = Math.cos(r), u = Math.sin(r), h = Math.cos(c), g = Math.sin(c), v = (w, k, M) => fa(w, r, c, !0) ? 1 : Math.max(k, k * a, M, M * a), f = (w, k, M) => fa(w, r, c, !0) ? -1 : Math.min(k, k * a, M, M * a), x = v(0, d, h), b = v(St, u, g), p = f(bt, d, h), m = f(bt + St, u, g);
    s = (x - p) / 2, n = (b - m) / 2, o = -(x + p) / 2, i = -(b + m) / 2;
  }
  return {
    ratioX: s,
    ratioY: n,
    offsetX: o,
    offsetY: i
  };
}
class vc extends Ka {
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
      if (ut(s[t])) {
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
    let t = yt, a = -yt;
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
    const a = this.chart, { chartArea: s } = a, n = this._cachedMeta, o = n.data, i = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, r = Math.max((Math.min(s.width, s.height) - i) / 2, 0), c = Math.min(kr(this.options.cutout, r), 1), d = this._getRingWeight(this.index), { circumference: u, rotation: h } = this._getRotationExtents(), { ratioX: g, ratioY: v, offsetX: f, offsetY: x } = pc(h, u, c), b = (s.width - i) / g, p = (s.height - i) / v, m = Math.max(Math.min(b, p) / 2, 0), w = Wo(this.options.radius, m), k = Math.max(w * c, 0), M = (w - k) / this._getVisibleDatasetWeightTotal();
    this.offsetX = f * w, this.offsetY = x * w, n.total = this.calculateTotal(), this.outerRadius = w - M * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - M * d, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, a) {
    const s = this.options, n = this._cachedMeta, o = this._getCircumference();
    return a && s.animation.animateRotate || !this.chart.getDataVisibility(t) || n._parsed[t] === null || n.data[t].hidden ? 0 : this.calculateCircumference(n._parsed[t] * o / yt);
  }
  updateElements(t, a, s, n) {
    const o = n === "reset", i = this.chart, r = i.chartArea, d = i.options.animation, u = (r.left + r.right) / 2, h = (r.top + r.bottom) / 2, g = o && d.animateScale, v = g ? 0 : this.innerRadius, f = g ? 0 : this.outerRadius, { sharedOptions: x, includeOptions: b } = this._getSharedOptions(a, n);
    let p = this._getRotation(), m;
    for (m = 0; m < a; ++m)
      p += this._circumference(m, o);
    for (m = a; m < a + s; ++m) {
      const w = this._circumference(m, o), k = t[m], M = {
        x: u + this.offsetX,
        y: h + this.offsetY,
        startAngle: p,
        endAngle: p + w,
        circumference: w,
        outerRadius: f,
        innerRadius: v
      };
      b && (M.options = x || this.resolveDataElementOptions(m, k.active ? "active" : n)), p += w, this.updateElement(k, m, M, n);
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
    return a > 0 && !isNaN(t) ? yt * (Math.abs(t) / a) : 0;
  }
  getLabelAndValue(t) {
    const a = this._cachedMeta, s = this.chart, n = s.data.labels || [], o = Ns(a._parsed[t], s.options.locale);
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
class bc extends Ka {
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
    const o = n === "reset", { iScale: i, vScale: r, _stacked: c, _dataset: d } = this._cachedMeta, { sharedOptions: u, includeOptions: h } = this._getSharedOptions(a, n), g = i.axis, v = r.axis, { spanGaps: f, segment: x } = this.options, b = ha(f) ? f : Number.POSITIVE_INFINITY, p = this.chart._animationsDisabled || o || n === "none", m = a + s, w = t.length;
    let k = a > 0 && this.getParsed(a - 1);
    for (let M = 0; M < w; ++M) {
      const S = t[M], D = p ? S : {};
      if (M < a || M >= m) {
        D.skip = !0;
        continue;
      }
      const A = this.getParsed(M), T = gt(A[v]), L = D[g] = i.getPixelForValue(A[g], M), I = D[v] = o || T ? r.getBasePixel() : r.getPixelForValue(c ? this.applyStack(r, A, c) : A[v], M);
      D.skip = isNaN(L) || isNaN(I) || T, D.stop = M > 0 && Math.abs(A[g] - k[g]) > b, x && (D.parsed = A, D.raw = d.data[M]), h && (D.options = u || this.resolveDataElementOptions(M, S.active ? "active" : n)), p || this.updateElement(S, M, D, n), k = A;
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
class qs {
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
    Object.assign(qs.prototype, t);
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
  _date: qs
};
function _c(e, t, a, s) {
  const { controller: n, data: o, _sorted: i } = e, r = n._cachedMeta.iScale, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (r && t === r.axis && t !== "r" && i && o.length) {
    const d = r._reversePixels ? Ir : De;
    if (s) {
      if (n._sharedOptions) {
        const u = o[0], h = typeof u.getRange == "function" && u.getRange(t);
        if (h) {
          const g = d(o, t, a - h), v = d(o, t, a + h);
          return {
            lo: g.lo,
            hi: v.hi
          };
        }
      }
    } else {
      const u = d(o, t, a);
      if (c) {
        const { vScale: h } = n._cachedMeta, { _parsed: g } = e, v = g.slice(0, u.lo + 1).reverse().findIndex((x) => !gt(x[h.axis]));
        u.lo -= Math.max(0, v);
        const f = g.slice(u.hi).findIndex((x) => !gt(x[h.axis]));
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
function Ua(e, t, a, s, n) {
  const o = e.getSortedVisibleDatasetMetas(), i = a[t];
  for (let r = 0, c = o.length; r < c; ++r) {
    const { index: d, data: u } = o[r], { lo: h, hi: g } = _c(o[r], t, i, n);
    for (let v = h; v <= g; ++v) {
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
function is(e, t, a, s, n) {
  const o = [];
  return !n && !e.isPointInArea(t) || Ua(e, a, t, function(r, c, d) {
    !n && !ga(r, e.chartArea, 0) || r.inRange(t.x, t.y, s) && o.push({
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
    ], s), { angle: h } = Yo(i, {
      x: t.x,
      y: t.y
    });
    fa(h, d, u) && n.push({
      element: i,
      datasetIndex: r,
      index: c
    });
  }
  return Ua(e, a, t, o), n;
}
function wc(e, t, a, s, n, o) {
  let i = [];
  const r = xc(a);
  let c = Number.POSITIVE_INFINITY;
  function d(u, h, g) {
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
        index: g
      }
    ], c = b) : b === c && i.push({
      element: u,
      datasetIndex: h,
      index: g
    });
  }
  return Ua(e, a, t, d), i;
}
function rs(e, t, a, s, n, o) {
  return !o && !e.isPointInArea(t) ? [] : a === "r" && !s ? kc(e, t, a, n) : wc(e, t, a, s, n, o);
}
function En(e, t, a, s, n) {
  const o = [], i = a === "x" ? "inXRange" : "inYRange";
  let r = !1;
  return Ua(e, a, t, (c, d, u) => {
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
      const n = Ce(t, e), o = a.axis || "x", i = a.includeInvisible || !1, r = a.intersect ? is(e, n, o, s, i) : rs(e, n, o, !1, s, i), c = [];
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
      let r = a.intersect ? is(e, n, o, s, i) : rs(e, n, o, !1, s, i);
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
      return is(e, n, o, s, i);
    },
    nearest(e, t, a, s) {
      const n = Ce(t, e), o = a.axis || "xy", i = a.includeInvisible || !1;
      return rs(e, n, o, a.intersect, s, i);
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
const fi = [
  "left",
  "top",
  "right",
  "bottom"
];
function qe(e, t) {
  return e.filter((a) => a.pos === t);
}
function Rn(e, t) {
  return e.filter((a) => fi.indexOf(a.pos) === -1 && a.box.axis === t);
}
function Xe(e, t) {
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
    if (!s || !fi.includes(n))
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
  const t = Mc(e), a = Xe(t.filter((d) => d.box.fullSize), !0), s = Xe(qe(t, "left"), !0), n = Xe(qe(t, "right")), o = Xe(qe(t, "top"), !0), i = Xe(qe(t, "bottom")), r = Rn(t, "x"), c = Rn(t, "y");
  return {
    fullSize: a,
    leftAndTop: s.concat(o),
    rightAndBottom: n.concat(c).concat(i).concat(r),
    chartArea: qe(t, "chartArea"),
    vertical: s.concat(n).concat(c),
    horizontal: o.concat(i).concat(r)
  };
}
function In(e, t, a, s) {
  return Math.max(e[a], t[a]) + Math.max(e[s], t[s]);
}
function gi(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Ac(e, t, a, s) {
  const { pos: n, box: o } = a, i = e.maxPadding;
  if (!ut(n)) {
    a.size && (e[n] -= a.size);
    const h = s[a.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, a.horizontal ? o.height : o.width), a.size = h.size / h.count, e[n] += a.size;
  }
  o.getPadding && gi(i, o.getPadding());
  const r = Math.max(0, t.outerWidth - In(i, e, "left", "right")), c = Math.max(0, t.outerHeight - In(i, e, "top", "bottom")), d = r !== e.w, u = c !== e.h;
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
    const { same: h, other: g } = Ac(t, a, r, s);
    d |= h && n.length, u = u || g, c.fullSize || n.push(r);
  }
  return d && aa(n, t, a, s) || u;
}
function Ca(e, t, a, s, n) {
  e.top = a, e.left = t, e.right = t + s, e.bottom = a + n, e.width = s, e.height = n;
}
function On(e, t, a, s) {
  const n = a.padding;
  let { x: o, y: i } = t;
  for (const r of e) {
    const c = r.box, d = s[r.stack] || {
      placed: 0,
      weight: 1
    }, u = r.stackWeight / d.weight || 1;
    if (r.horizontal) {
      const h = t.w * u, g = d.size || c.height;
      ua(d.start) && (i = d.start), c.fullSize ? Ca(c, n.left, i, a.outerWidth - n.right - n.left, g) : Ca(c, t.left + d.placed, i, h, g), d.start = i, d.placed += h, i = c.bottom;
    } else {
      const h = t.h * u, g = d.size || c.width;
      ua(d.start) && (o = d.start), c.fullSize ? Ca(c, o, n.top, g, a.outerHeight - n.bottom - n.top) : Ca(c, o, t.top + d.placed, g, h), d.start = o, d.placed += h, o = c.right;
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
    pt(e.boxes, (x) => {
      typeof x.beforeLayout == "function" && x.beforeLayout();
    });
    const u = c.reduce((x, b) => b.box.options && b.box.options.display === !1 ? x : x + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: a,
      padding: n,
      availableWidth: o,
      availableHeight: i,
      vBoxMaxWidth: o / 2 / u,
      hBoxMaxHeight: i / 2
    }), g = Object.assign({}, n);
    gi(g, Yt(s));
    const v = Object.assign({
      maxPadding: g,
      w: o,
      h: i,
      x: n.left,
      y: n.top
    }, n), f = Sc(c.concat(d), h);
    aa(r.fullSize, v, h, f), aa(c, v, h, f), aa(d, v, h, f) && aa(c, v, h, f), Tc(v), On(r.leftAndTop, v, h, f), v.x += v.w, v.y += v.h, On(r.rightAndBottom, v, h, f), e.chartArea = {
      left: v.left,
      top: v.top,
      right: v.left + v.w,
      bottom: v.top + v.h,
      height: v.h,
      width: v.w
    }, pt(r.chartArea, (x) => {
      const b = x.box;
      Object.assign(b, e.chartArea), b.update(v.w, v.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class pi {
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
class Lc extends pi {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const La = "$chartjs", Fc = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Vn = (e) => e === null || e === "";
function Pc(e, t) {
  const a = e.style, s = e.getAttribute("height"), n = e.getAttribute("width");
  if (e[La] = {
    initial: {
      height: s,
      width: n,
      style: {
        display: a.display,
        height: a.height,
        width: a.width
      }
    }
  }, a.display = a.display || "block", a.boxSizing = a.boxSizing || "border-box", Vn(n)) {
    const o = kn(e, "width");
    o !== void 0 && (e.width = o);
  }
  if (Vn(s))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const o = kn(e, "height");
      o !== void 0 && (e.height = o);
    }
  return e;
}
const vi = Ll ? {
  passive: !0
} : !1;
function Ec(e, t, a) {
  e && e.addEventListener(t, a, vi);
}
function Rc(e, t, a) {
  e && e.canvas && e.canvas.removeEventListener(t, a, vi);
}
function Ic(e, t) {
  const a = Fc[e.type] || e.type, { x: s, y: n } = Ce(e, t);
  return {
    type: a,
    chart: t,
    native: e,
    x: s !== void 0 ? s : null,
    y: n !== void 0 ? n : null
  };
}
function Na(e, t) {
  for (const a of e)
    if (a === t || a.contains(t))
      return !0;
}
function Oc(e, t, a) {
  const s = e.canvas, n = new MutationObserver((o) => {
    let i = !1;
    for (const r of o)
      i = i || Na(r.addedNodes, s), i = i && !Na(r.removedNodes, s);
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
      i = i || Na(r.removedNodes, s), i = i && !Na(r.addedNodes, s);
    i && a();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
const va = /* @__PURE__ */ new Map();
let zn = 0;
function bi() {
  const e = window.devicePixelRatio;
  e !== zn && (zn = e, va.forEach((t, a) => {
    a.currentDevicePixelRatio !== e && t();
  }));
}
function zc(e, t) {
  va.size || window.addEventListener("resize", bi), va.set(e, t);
}
function Nc(e) {
  va.delete(e), va.size || window.removeEventListener("resize", bi);
}
function Wc(e, t, a) {
  const s = e.canvas, n = s && Us(s);
  if (!n)
    return;
  const o = Xo((r, c) => {
    const d = n.clientWidth;
    a(r, c), d < n.clientWidth && a();
  }, window), i = new ResizeObserver((r) => {
    const c = r[0], d = c.contentRect.width, u = c.contentRect.height;
    d === 0 && u === 0 || o(d, u);
  });
  return i.observe(n), zc(e, o), i;
}
function ls(e, t, a) {
  a && a.disconnect(), t === "resize" && Nc(e);
}
function Hc(e, t, a) {
  const s = e.canvas, n = Xo((o) => {
    e.ctx !== null && a(Ic(o, e));
  }, e);
  return Ec(s, t, n), n;
}
class jc extends pi {
  acquireContext(t, a) {
    const s = t && t.getContext && t.getContext("2d");
    return s && s.canvas === t ? (Pc(t, a), s) : null;
  }
  releaseContext(t) {
    const a = t.canvas;
    if (!a[La])
      return !1;
    const s = a[La].initial;
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
    }), a.width = a.width, delete a[La], !0;
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
      attach: ls,
      detach: ls,
      resize: ls
    }[a] || Rc)(t, a, n), s[a] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, a, s, n) {
    return Bl(t, a, s, n);
  }
  isAttached(t) {
    const a = t && Us(t);
    return !!(a && a.isConnected);
  }
}
function Yc(e) {
  return !Ks() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Lc : jc;
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
    return ha(this.x) && ha(this.y);
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
    let h, g;
    const v = i > 1 ? Math.round((c - r) / (i - 1)) : null;
    for (Sa(t, d, u, gt(v) ? 0 : r - v, r), h = 0, g = i - 1; h < g; h++)
      Sa(t, d, u, o[h], o[h + 1]);
    return Sa(t, d, u, c, gt(v) ? t.length : c + v), d;
  }
  return Sa(t, d, u), d;
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
function Sa(e, t, a, s, n) {
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
const Qc = (e) => e === "left" ? "right" : e === "right" ? "left" : e, Nn = (e, t, a) => t === "top" || t === "left" ? e[t] + a : e[t] - a, Wn = (e, t) => Math.min(t || e, e);
function Hn(e, t) {
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
function Ge(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function jn(e, t) {
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
  let s = Vs(e);
  return (a && t !== "right" || !a && t === "right") && (s = Qc(s)), s;
}
function nd(e, t, a, s) {
  const { top: n, left: o, bottom: i, right: r, chart: c } = e, { chartArea: d, scales: u } = c;
  let h = 0, g, v, f;
  const x = i - n, b = r - o;
  if (e.isHorizontal()) {
    if (v = Dt(s, o, r), ut(a)) {
      const p = Object.keys(a)[0], m = a[p];
      f = u[p].getPixelForValue(m) + x - t;
    } else a === "center" ? f = (d.bottom + d.top) / 2 + x - t : f = Nn(e, a, t);
    g = r - o;
  } else {
    if (ut(a)) {
      const p = Object.keys(a)[0], m = a[p];
      v = u[p].getPixelForValue(m) - b + t;
    } else a === "center" ? v = (d.left + d.right) / 2 - b + t : v = Nn(e, a, t);
    f = Dt(s, i, n), h = a === "left" ? -St : St;
  }
  return {
    titleX: v,
    titleY: f,
    maxWidth: g,
    rotation: h
  };
}
class He extends le {
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
    mt(this.options.beforeUpdate, [
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
    this._convertTicksToLabels(c ? Hn(this.ticks, r) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = Kc(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), c && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, a, s;
    this.isHorizontal() ? (a = this.left, s = this.right) : (a = this.top, s = this.bottom, t = !t), this._startPixel = a, this._endPixel = s, this._reversePixels = t, this._length = s - a, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    mt(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    mt(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    mt(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), mt(this.options[t], [
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
    mt(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const a = this.options.ticks;
    let s, n, o;
    for (s = 0, n = t.length; s < n; s++)
      o = t[s], o.label = mt(a.callback, [
        o.value,
        s,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    mt(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    mt(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, a = t.ticks, s = Wn(this.ticks.length, t.ticks.maxTicksLimit), n = a.minRotation || 0, o = a.maxRotation;
    let i = n, r, c, d;
    if (!this._isVisible() || !a.display || n >= o || s <= 1 || !this.isHorizontal()) {
      this.labelRotation = n;
      return;
    }
    const u = this._getLabelSizes(), h = u.widest.width, g = u.highest.height, v = Tt(this.chart.width - h, 0, this.maxWidth);
    r = t.offset ? this.maxWidth / s : v / (s - 1), h + 6 > r && (r = v / (s - (t.offset ? 0.5 : 1)), c = this.maxHeight - Ge(t.grid) - a.padding - jn(t.title, this.chart.options.font), d = Math.sqrt(h * h + g * g), i = Pr(Math.min(Math.asin(Tt((u.highest.height + 6) / r, -1, 1)), Math.asin(Tt(c / d, -1, 1)) - Math.asin(Tt(g / d, -1, 1)))), i = Math.max(n, Math.min(o, i))), this.labelRotation = i;
  }
  afterCalculateLabelRotation() {
    mt(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    mt(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: a, options: { ticks: s, title: n, grid: o } } = this, i = this._isVisible(), r = this.isHorizontal();
    if (i) {
      const c = jn(n, a.options.font);
      if (r ? (t.width = this.maxWidth, t.height = Ge(o) + c) : (t.height = this.maxHeight, t.width = Ge(o) + c), s.display && this.ticks.length) {
        const { first: d, last: u, widest: h, highest: g } = this._getLabelSizes(), v = s.padding * 2, f = ne(this.labelRotation), x = Math.cos(f), b = Math.sin(f);
        if (r) {
          const p = s.mirror ? 0 : b * h.width + x * g.height;
          t.height = Math.min(this.maxHeight, t.height + p + v);
        } else {
          const p = s.mirror ? 0 : x * h.width + b * g.height;
          t.width = Math.min(this.maxWidth, t.width + p + v);
        }
        this._calculatePadding(d, u, b, x);
      }
    }
    this._handleMargins(), r ? (this.width = this._length = a.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = a.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, a, s, n) {
    const { ticks: { align: o, padding: i }, position: r } = this.options, c = this.labelRotation !== 0, d = r !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const u = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let g = 0, v = 0;
      c ? d ? (g = n * t.width, v = s * a.height) : (g = s * t.height, v = n * a.width) : o === "start" ? v = a.width : o === "end" ? g = t.width : o !== "inner" && (g = t.width / 2, v = a.width / 2), this.paddingLeft = Math.max((g - u + i) * this.width / (this.width - u), 0), this.paddingRight = Math.max((v - h + i) * this.width / (this.width - h), 0);
    } else {
      let u = a.height / 2, h = t.height / 2;
      o === "start" ? (u = 0, h = t.height) : o === "end" && (u = a.height, h = 0), this.paddingTop = u + i, this.paddingBottom = h + i;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    mt(this.options.afterFit, [
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
      a < s.length && (s = Hn(s, a)), this._labelSizes = t = this._computeLabelSizes(s, s.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, a, s) {
    const { ctx: n, _longestTextCache: o } = this, i = [], r = [], c = Math.floor(a / Wn(a, s));
    let d = 0, u = 0, h, g, v, f, x, b, p, m, w, k, M;
    for (h = 0; h < a; h += c) {
      if (f = t[h].label, x = this._resolveTickFontOptions(h), n.font = b = x.string, p = o[b] = o[b] || {
        data: {},
        gc: []
      }, m = x.lineHeight, w = k = 0, !gt(f) && !Mt(f))
        w = bn(n, p.data, p.gc, w, f), k = m;
      else if (Mt(f))
        for (g = 0, v = f.length; g < v; ++g)
          M = f[g], !gt(M) && !Mt(M) && (w = bn(n, p.data, p.gc, w, M), k += m);
      i.push(w), r.push(k), d = Math.max(w, d), u = Math.max(k, u);
    }
    td(o, a);
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
    const a = this.axis, s = this.chart, n = this.options, { grid: o, position: i, border: r } = n, c = o.offset, d = this.isHorizontal(), h = this.ticks.length + (c ? 1 : 0), g = Ge(o), v = [], f = r.setContext(this.getContext()), x = f.display ? f.width : 0, b = x / 2, p = function(V) {
      return we(s, V, x);
    };
    let m, w, k, M, S, D, A, T, L, I, O, X;
    if (i === "top")
      m = p(this.bottom), D = this.bottom - g, T = m - b, I = p(t.top) + b, X = t.bottom;
    else if (i === "bottom")
      m = p(this.top), I = t.top, X = p(t.bottom) - b, D = m + b, T = this.top + g;
    else if (i === "left")
      m = p(this.right), S = this.right - g, A = m - b, L = p(t.left) + b, O = t.right;
    else if (i === "right")
      m = p(this.left), L = t.left, O = p(t.right) - b, S = m + b, A = this.left + g;
    else if (a === "x") {
      if (i === "center")
        m = p((t.top + t.bottom) / 2 + 0.5);
      else if (ut(i)) {
        const V = Object.keys(i)[0], W = i[V];
        m = p(this.chart.scales[V].getPixelForValue(W));
      }
      I = t.top, X = t.bottom, D = m + b, T = D + g;
    } else if (a === "y") {
      if (i === "center")
        m = p((t.left + t.right) / 2);
      else if (ut(i)) {
        const V = Object.keys(i)[0], W = i[V];
        m = p(this.chart.scales[V].getPixelForValue(W));
      }
      S = m - b, A = S - g, L = t.left, O = t.right;
    }
    const P = it(n.ticks.maxTicksLimit, h), E = Math.max(1, Math.ceil(h / P));
    for (w = 0; w < h; w += E) {
      const V = this.getContext(w), W = o.setContext(V), j = r.setContext(V), H = W.lineWidth, N = W.color, et = j.dash || [], G = j.dashOffset, Y = W.tickWidth, ot = W.tickColor, wt = W.tickBorderDash || [], ft = W.tickBorderDashOffset;
      k = Jc(this, w, c), k !== void 0 && (M = we(s, k, H), d ? S = A = L = O = M : D = T = I = X = M, v.push({
        tx1: S,
        ty1: D,
        tx2: A,
        ty2: T,
        x1: L,
        y1: I,
        x2: O,
        y2: X,
        width: H,
        color: N,
        borderDash: et,
        borderDashOffset: G,
        tickWidth: Y,
        tickColor: ot,
        tickBorderDash: wt,
        tickBorderDashOffset: ft
      }));
    }
    return this._ticksLength = h, this._borderValue = m, v;
  }
  _computeLabelItems(t) {
    const a = this.axis, s = this.options, { position: n, ticks: o } = s, i = this.isHorizontal(), r = this.ticks, { align: c, crossAlign: d, padding: u, mirror: h } = o, g = Ge(s.grid), v = g + u, f = h ? -u : v, x = -ne(this.labelRotation), b = [];
    let p, m, w, k, M, S, D, A, T, L, I, O, X = "middle";
    if (n === "top")
      S = this.bottom - f, D = this._getXAxisLabelAlignment();
    else if (n === "bottom")
      S = this.top + f, D = this._getXAxisLabelAlignment();
    else if (n === "left") {
      const E = this._getYAxisLabelAlignment(g);
      D = E.textAlign, M = E.x;
    } else if (n === "right") {
      const E = this._getYAxisLabelAlignment(g);
      D = E.textAlign, M = E.x;
    } else if (a === "x") {
      if (n === "center")
        S = (t.top + t.bottom) / 2 + v;
      else if (ut(n)) {
        const E = Object.keys(n)[0], V = n[E];
        S = this.chart.scales[E].getPixelForValue(V) + v;
      }
      D = this._getXAxisLabelAlignment();
    } else if (a === "y") {
      if (n === "center")
        M = (t.left + t.right) / 2 - v;
      else if (ut(n)) {
        const E = Object.keys(n)[0], V = n[E];
        M = this.chart.scales[E].getPixelForValue(V);
      }
      D = this._getYAxisLabelAlignment(g).textAlign;
    }
    a === "y" && (c === "start" ? X = "top" : c === "end" && (X = "bottom"));
    const P = this._getLabelSizes();
    for (p = 0, m = r.length; p < m; ++p) {
      w = r[p], k = w.label;
      const E = o.setContext(this.getContext(p));
      A = this.getPixelForTick(p) + o.labelOffset, T = this._resolveTickFontOptions(p), L = T.lineHeight, I = Mt(k) ? k.length : 1;
      const V = I / 2, W = E.color, j = E.textStrokeColor, H = E.textStrokeWidth;
      let N = D;
      i ? (M = A, D === "inner" && (p === m - 1 ? N = this.options.reverse ? "left" : "right" : p === 0 ? N = this.options.reverse ? "right" : "left" : N = "center"), n === "top" ? d === "near" || x !== 0 ? O = -I * L + L / 2 : d === "center" ? O = -P.highest.height / 2 - V * L + L : O = -P.highest.height + L / 2 : d === "near" || x !== 0 ? O = L / 2 : d === "center" ? O = P.highest.height / 2 - V * L : O = P.highest.height - I * L, h && (O *= -1), x !== 0 && !E.showLabelBackdrop && (M += L / 2 * Math.sin(x))) : (S = A, O = (1 - I) * L / 2);
      let et;
      if (E.showLabelBackdrop) {
        const G = Yt(E.backdropPadding), Y = P.heights[p], ot = P.widths[p];
        let wt = O - G.top, ft = 0 - G.left;
        switch (X) {
          case "middle":
            wt -= Y / 2;
            break;
          case "bottom":
            wt -= Y;
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
            p === m - 1 ? ft -= ot : p > 0 && (ft -= ot / 2);
            break;
        }
        et = {
          left: ft,
          top: wt,
          width: ot + G.width,
          height: Y + G.height,
          color: E.backdropColor
        };
      }
      b.push({
        label: k,
        font: T,
        textOffset: O,
        options: {
          rotation: x,
          color: W,
          strokeColor: j,
          strokeWidth: H,
          textAlign: N,
          textBaseline: X,
          translation: [
            M,
            S
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
    let d, u, h, g;
    this.isHorizontal() ? (d = we(t, this.left, i) - i / 2, u = we(t, this.right, r) + r / 2, h = g = c) : (h = we(t, this.top, i) - i / 2, g = we(t, this.bottom, r) + r / 2, d = u = c), a.save(), a.lineWidth = o.width, a.strokeStyle = o.color, a.beginPath(), a.moveTo(d, h), a.lineTo(u, g), a.stroke(), a.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const s = this.ctx, n = this._computeLabelArea();
    n && Ha(s, n);
    const o = this.getLabelItems(t);
    for (const i of o) {
      const r = i.options, c = i.font, d = i.label, u = i.textOffset;
      pa(s, d, 0, u, c, r);
    }
    n && ja(s);
  }
  drawTitle() {
    const { ctx: t, options: { position: a, title: s, reverse: n } } = this;
    if (!s.display)
      return;
    const o = Bt(s.font), i = Yt(s.padding), r = s.align;
    let c = o.lineHeight / 2;
    a === "bottom" || a === "center" || ut(a) ? (c += i.bottom, Mt(s.text) && (c += o.lineHeight * (s.text.length - 1))) : c += i.top;
    const { titleX: d, titleY: u, maxWidth: h, rotation: g } = nd(this, c, a, r);
    pa(t, s.text, 0, 0, o, {
      color: s.color,
      maxWidth: h,
      rotation: g,
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
    return !this._isVisible() || this.draw !== He.prototype.draw ? [
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
class Da {
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
  const s = da(/* @__PURE__ */ Object.create(null), [
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
    this.controllers = new Da(Ka, "datasets", !0), this.elements = new Da(le, "elements"), this.plugins = new Da(Object, "plugins"), this.scales = new Da(He, "scales"), this._typedRegistries = [
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
    const n = Is(t);
    mt(s["before" + n], [], s), a[t](s), mt(s["after" + n], [], s);
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
      if (mt(r, c, i) === !1 && n.cancelable)
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
function As(e, t) {
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
function Yn(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function vd(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Ts(e, ...t) {
  if (Yn(e))
    return e;
  for (const a of t) {
    const s = a.axis || vd(a.position) || e.length > 1 && Yn(e[0].toLowerCase());
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
  }, s = t.scales || {}, n = As(e.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(s).forEach((i) => {
    const r = s[i];
    if (!ut(r))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (r._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const c = Ts(i, r, bd(i, e), $t.scales[r.type]), d = pd(c, n), u = a.scales || {};
    o[i] = na(/* @__PURE__ */ Object.create(null), [
      {
        axis: c
      },
      r,
      u[c],
      u[d]
    ]);
  }), e.data.datasets.forEach((i) => {
    const r = i.type || e.type, c = i.indexAxis || As(r, t), u = (Be[r] || {}).scales || {};
    Object.keys(u).forEach((h) => {
      const g = gd(h, c), v = i[g + "AxisID"] || g;
      o[v] = o[v] || /* @__PURE__ */ Object.create(null), na(o[v], [
        {
          axis: g
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
function mi(e) {
  const t = e.options || (e.options = {});
  t.plugins = it(t.plugins, {}), t.scales = md(e, t);
}
function yi(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function yd(e) {
  return e = e || {}, e.data = yi(e.data), mi(e), e;
}
const Un = /* @__PURE__ */ new Map(), _i = /* @__PURE__ */ new Set();
function Aa(e, t) {
  let a = Un.get(e);
  return a || (a = t(), Un.set(e, a), _i.add(a)), a;
}
const Ze = (e, t, a) => {
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
    this._config.data = yi(t);
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
    this.clearCache(), mi(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return Aa(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, a) {
    return Aa(`${t}.transition.${a}`, () => [
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
    return Aa(`${t}-${a}`, () => [
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
    return Aa(`${s}-plugin-${a}`, () => [
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
      t && (c.add(t), u.forEach((h) => Ze(c, t, h))), u.forEach((h) => Ze(c, n, h)), u.forEach((h) => Ze(c, Be[o] || {}, h)), u.forEach((h) => Ze(c, $t, h)), u.forEach((h) => Ze(c, Ss, h));
    });
    const d = Array.from(c);
    return d.length === 0 && d.push(/* @__PURE__ */ Object.create(null)), _i.has(a) && i.set(a, d), d;
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
      Ss
    ];
  }
  resolveNamedOptions(t, a, s, n = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: i, subPrefixes: r } = qn(this._resolverCache, t, n);
    let c = i;
    if (kd(i, a)) {
      o.$shared = !1, s = me(s) ? s() : s;
      const d = this.createResolver(t, s, r);
      c = ze(i, s, d);
    }
    for (const d of a)
      o[d] = c[d];
    return o;
  }
  createResolver(t, a, s = [
    ""
  ], n) {
    const { resolver: o } = qn(this._resolverCache, t, s);
    return ut(a) ? ze(o, a, void 0, n) : o;
  }
}
function qn(e, t, a) {
  let s = e.get(t);
  s || (s = /* @__PURE__ */ new Map(), e.set(t, s));
  const n = a.join();
  let o = s.get(n);
  return o || (o = {
    resolver: Hs(t, a),
    subPrefixes: a.filter((r) => !r.toLowerCase().includes("hover"))
  }, s.set(n, o)), o;
}
const xd = (e) => ut(e) && Object.getOwnPropertyNames(e).some((t) => me(e[t]));
function kd(e, t) {
  const { isScriptable: a, isIndexable: s } = Jo(e);
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
function Xn(e, t) {
  return e === "top" || e === "bottom" || $d.indexOf(e) === -1 && t === "x";
}
function Gn(e, t) {
  return function(a, s) {
    return a[e] === s[e] ? a[t] - s[t] : a[e] - s[e];
  };
}
function Zn(e) {
  const t = e.chart, a = t.options.animation;
  t.notifyPlugins("afterRender"), mt(a && a.onComplete, [
    e
  ], t);
}
function Md(e) {
  const t = e.chart, a = t.options.animation;
  mt(a && a.onProgress, [
    e
  ], t);
}
function xi(e) {
  return Ks() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const Fa = {}, Qn = (e) => {
  const t = xi(e);
  return Object.values(Fa).filter((a) => a.canvas === t).pop();
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
let je = class {
  static defaults = $t;
  static instances = Fa;
  static overrides = Be;
  static registry = Zt;
  static version = wd;
  static getChart = Qn;
  static register(...t) {
    Zt.add(...t), Jn();
  }
  static unregister(...t) {
    Zt.remove(...t), Jn();
  }
  constructor(t, a) {
    const s = this.config = new _d(a), n = xi(t), o = Qn(n);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const i = s.createResolver(s.chartOptionScopes(), this.getContext());
    this.platform = new (s.platform || Yc(n))(), this.platform.updateConfig(s);
    const r = this.platform.acquireContext(n, i.aspectRatio), c = r && r.canvas, d = c && c.height, u = c && c.width;
    if (this.id = xr(), this.ctx = r, this.canvas = c, this.width = u, this.height = d, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new cd(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = zr((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], Fa[this.id] = this, !r || !c) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    ee.listen(this, "complete", Zn), ee.listen(this, "progress", Md), this._initialize(), this.attached && this.update();
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
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : xn(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return mn(this.canvas, this.ctx), this;
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
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, xn(this, r, !0) && (this.notifyPlugins("resize", {
      size: i
    }), mt(s.onResize, [
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
      const r = a[i], c = Ts(i, r), d = c === "r", u = c === "x";
      return {
        options: r,
        dposition: d ? "chartArea" : u ? "bottom" : "left",
        dtype: d ? "radialLinear" : u ? "category" : "linear"
      };
    }))), pt(o, (i) => {
      const r = i.options, c = r.id, d = Ts(c, r), u = it(r.type, i.dtype);
      (r.position === void 0 || Xn(r.position, d) !== Xn(i.dposition)) && (r.position = i.dposition), n[c] = !0;
      let h = null;
      if (c in s && s[c].type === u)
        h = s[c];
      else {
        const g = Zt.getScale(u);
        h = new g({
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
    this._sortedMetasets = t.slice(0).sort(Gn("order", "index"));
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
      if (i.type && i.type !== r && (this._destroyDatasetMeta(s), i = this.getDatasetMeta(s)), i.type = r, i.indexAxis = o.indexAxis || As(r, this.options), i.order = o.order || 0, i.index = s, i.label = "" + o.label, i.visible = this.isDatasetVisible(s), i.controller)
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
      const { controller: h } = this.getDatasetMeta(d), g = !n && o.indexOf(h) === -1;
      h.buildOrUpdateElements(g), i = Math.max(+h.getMaxOverflow(), i);
    }
    i = this._minPadding = s.layout.autoPadding ? i : 0, this._updateLayout(i), n || pt(o, (d) => {
      d.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(Gn("z", "_idx"));
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
    (!ln(a, s) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
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
      if (!ln(n, s(o)))
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
    }) !== !1 && (ee.has(this) ? this.attached && !ee.running(this) && ee.start(this) : (this.draw(), Zn({
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
    }, n = ci(this, t);
    this.notifyPlugins("beforeDatasetDraw", s) !== !1 && (n && Ha(a, n), t.controller.draw(), n && ja(a), s.cancelable = !1, this.notifyPlugins("afterDatasetDraw", s));
  }
  isPointInArea(t) {
    return ga(t, this.chartArea, this._minPadding);
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
    ua(a) ? (o.data[a].hidden = !s, this.update()) : (this.setDatasetVisibility(t, s), i.update(o, {
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
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), mn(t, a), this.platform.releaseContext(a), this.canvas = null, this.ctx = null), delete Fa[this.id], this.notifyPlugins("afterDestroy");
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
    !Ra(s, a) && (this._active = s, this._lastEvent = null, this._updateHoverStyles(s, a));
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
    const { _active: n = [], options: o } = this, i = a, r = this._getActiveElements(t, n, s, i), c = Sr(t), d = Sd(t, this._lastEvent, s, c);
    s && (this._lastEvent = null, mt(o.onHover, [
      t,
      r,
      this
    ], this), c && mt(o.onClick, [
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
function Jn() {
  return pt(je.instances, (e) => e._plugins.invalidate());
}
function Dd(e, t, a) {
  const { startAngle: s, x: n, y: o, outerRadius: i, innerRadius: r, options: c } = t, { borderWidth: d, borderJoinStyle: u } = c, h = Math.min(d / i, Nt(s - a));
  if (e.beginPath(), e.arc(n, o, i - d / 2, s + h / 2, a - h / 2), r > 0) {
    const g = Math.min(d / r, Nt(s - a));
    e.arc(n, o, r + d / 2, a - g / 2, s + g / 2, !0);
  } else {
    const g = Math.min(d / 2, i * Nt(s - a));
    if (u === "round")
      e.arc(n, o, g, a - bt / 2, s + bt / 2, !0);
    else if (u === "bevel") {
      const v = 2 * g * g, f = -v * Math.cos(a + bt / 2) + n, x = -v * Math.sin(a + bt / 2) + o, b = v * Math.cos(s + bt / 2) + n, p = v * Math.sin(s + bt / 2) + o;
      e.lineTo(f, x), e.lineTo(b, p);
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
  return Ws(e, [
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
function Ee(e, t, a, s) {
  return {
    x: a + e * Math.cos(t),
    y: s + e * Math.sin(t)
  };
}
function Wa(e, t, a, s, n, o) {
  const { x: i, y: r, startAngle: c, pixelMargin: d, innerRadius: u } = t, h = Math.max(t.outerRadius + s + a - d, 0), g = u > 0 ? u + s + a + d : 0;
  let v = 0;
  const f = n - c;
  if (s) {
    const E = u > 0 ? u - s : 0, V = h > 0 ? h - s : 0, W = (E + V) / 2, j = W !== 0 ? f * W / (W + s) : f;
    v = (f - j) / 2;
  }
  const x = Math.max(1e-3, f * h - a / bt) / h, b = (f - x) / 2, p = c + b + v, m = n - b - v, { outerStart: w, outerEnd: k, innerStart: M, innerEnd: S } = Bd(t, g, h, m - p), D = h - w, A = h - k, T = p + w / D, L = m - k / A, I = g + M, O = g + S, X = p + M / I, P = m - S / O;
  if (e.beginPath(), o) {
    const E = (T + L) / 2;
    if (e.arc(i, r, h, T, E), e.arc(i, r, h, E, L), k > 0) {
      const H = Ee(A, L, i, r);
      e.arc(H.x, H.y, k, L, m + St);
    }
    const V = Ee(O, m, i, r);
    if (e.lineTo(V.x, V.y), S > 0) {
      const H = Ee(O, P, i, r);
      e.arc(H.x, H.y, S, m + St, P + Math.PI);
    }
    const W = (m - S / g + (p + M / g)) / 2;
    if (e.arc(i, r, g, m - S / g, W, !0), e.arc(i, r, g, W, p + M / g, !0), M > 0) {
      const H = Ee(I, X, i, r);
      e.arc(H.x, H.y, M, X + Math.PI, p - St);
    }
    const j = Ee(D, p, i, r);
    if (e.lineTo(j.x, j.y), w > 0) {
      const H = Ee(D, T, i, r);
      e.arc(H.x, H.y, w, p - St, T);
    }
  } else {
    e.moveTo(i, r);
    const E = Math.cos(T) * h + i, V = Math.sin(T) * h + r;
    e.lineTo(E, V);
    const W = Math.cos(L) * h + i, j = Math.sin(L) * h + r;
    e.lineTo(W, j);
  }
  e.closePath();
}
function Ld(e, t, a, s, n) {
  const { fullCircles: o, startAngle: i, circumference: r } = t;
  let c = t.endAngle;
  if (o) {
    Wa(e, t, a, s, c, n);
    for (let d = 0; d < o; ++d)
      e.fill();
    isNaN(r) || (c = i + (r % yt || yt));
  }
  return Wa(e, t, a, s, c, n), e.fill(), c;
}
function Fd(e, t, a, s, n) {
  const { fullCircles: o, startAngle: i, circumference: r, options: c } = t, { borderWidth: d, borderJoinStyle: u, borderDash: h, borderDashOffset: g, borderRadius: v } = c, f = c.borderAlign === "inner";
  if (!d)
    return;
  e.setLineDash(h || []), e.lineDashOffset = g, f ? (e.lineWidth = d * 2, e.lineJoin = u || "round") : (e.lineWidth = d, e.lineJoin = u || "bevel");
  let x = t.endAngle;
  if (o) {
    Wa(e, t, a, s, x, n);
    for (let b = 0; b < o; ++b)
      e.stroke();
    isNaN(r) || (x = i + (r % yt || yt));
  }
  f && Ad(e, t, x), c.selfJoin && x - i >= bt && v === 0 && u !== "miter" && Dd(e, t, x), o || (Wa(e, t, a, s, x, n), e.stroke());
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
    ], s), { angle: o, distance: i } = Yo(n, {
      x: t,
      y: a
    }), { startAngle: r, endAngle: c, innerRadius: d, outerRadius: u, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], s), g = (this.options.spacing + this.options.borderWidth) / 2, v = it(h, c - r), f = fa(o, r, c) && r !== c, x = v >= yt || f, b = oe(i, d + g, u + g);
    return x && b;
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
    if (this.pixelMargin = a.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = s > yt ? Math.floor(s / yt) : 0, s === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const r = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(r) * n, Math.sin(r) * n);
    const c = 1 - Math.sin(Math.min(bt, s || 0)), d = n * c;
    t.fillStyle = a.backgroundColor, t.strokeStyle = a.borderColor, Ld(t, this, d, o, i), Fd(t, this, d, o, i), t.restore();
  }
}
function ki(e, t, a = t) {
  e.lineCap = it(a.borderCapStyle, t.borderCapStyle), e.setLineDash(it(a.borderDash, t.borderDash)), e.lineDashOffset = it(a.borderDashOffset, t.borderDashOffset), e.lineJoin = it(a.borderJoinStyle, t.borderJoinStyle), e.lineWidth = it(a.borderWidth, t.borderWidth), e.strokeStyle = it(a.borderColor, t.borderColor);
}
function Ed(e, t, a) {
  e.lineTo(a.x, a.y);
}
function Rd(e) {
  return e.stepped ? tl : e.tension || e.cubicInterpolationMode === "monotone" ? el : Ed;
}
function wi(e, t, a = {}) {
  const s = e.length, { start: n = 0, end: o = s - 1 } = a, { start: i, end: r } = t, c = Math.max(n, i), d = Math.min(o, r), u = n < i && o < i || n > r && o > r;
  return {
    count: s,
    start: c,
    loop: t.loop,
    ilen: d < c && !u ? s + d - c : d - c
  };
}
function Id(e, t, a, s) {
  const { points: n, options: o } = t, { count: i, start: r, loop: c, ilen: d } = wi(n, a, s), u = Rd(o);
  let { move: h = !0, reverse: g } = s || {}, v, f, x;
  for (v = 0; v <= d; ++v)
    f = n[(r + (g ? d - v : v)) % i], !f.skip && (h ? (e.moveTo(f.x, f.y), h = !1) : u(e, x, f, g, o.stepped), x = f);
  return c && (f = n[(r + (g ? d : 0)) % i], u(e, x, f, g, o.stepped)), !!c;
}
function Od(e, t, a, s) {
  const n = t.points, { count: o, start: i, ilen: r } = wi(n, a, s), { move: c = !0, reverse: d } = s || {};
  let u = 0, h = 0, g, v, f, x, b, p;
  const m = (k) => (i + (d ? r - k : k)) % o, w = () => {
    x !== b && (e.lineTo(u, b), e.lineTo(u, x), e.lineTo(u, p));
  };
  for (c && (v = n[m(0)], e.moveTo(v.x, v.y)), g = 0; g <= r; ++g) {
    if (v = n[m(g)], v.skip)
      continue;
    const k = v.x, M = v.y, S = k | 0;
    S === f ? (M < x ? x = M : M > b && (b = M), u = (h * u + k) / ++h) : (w(), e.lineTo(k, M), f = S, h = 0, x = b = M), p = M;
  }
  w();
}
function Bs(e) {
  const t = e.options, a = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !a ? Od : Id;
}
function Vd(e) {
  return e.stepped ? Fl : e.tension || e.cubicInterpolationMode === "monotone" ? Pl : Se;
}
function zd(e, t, a, s) {
  let n = t._path;
  n || (n = t._path = new Path2D(), t.path(n, a, s) && n.closePath()), ki(e, t.options), e.stroke(n);
}
function Nd(e, t, a, s) {
  const { segments: n, options: o } = t, i = Bs(t);
  for (const r of n)
    ki(e, o, r.style), e.beginPath(), i(e, t, r, {
      start: a,
      end: a + s - 1
    }) && e.closePath(), e.stroke();
}
const Wd = typeof Path2D == "function";
function Hd(e, t, a, s) {
  Wd && !t.options.segment ? zd(e, t, a, s) : Nd(e, t, a, s);
}
class qa extends le {
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
    const s = this.options, n = t[a], o = this.points, i = li(this, {
      property: a,
      start: n,
      end: n
    });
    if (!i.length)
      return;
    const r = [], c = Vd(s);
    let d, u;
    for (d = 0, u = i.length; d < u; ++d) {
      const { start: h, end: g } = i[d], v = o[h], f = o[g];
      if (v === f) {
        r.push(v);
        continue;
      }
      const x = Math.abs((n - v[a]) / (f[a] - v[a])), b = c(v, f, x, s.stepped);
      b[a] = t[a], r.push(b);
    }
    return r.length === 1 ? r[0] : r;
  }
  pathSegment(t, a, s) {
    return Bs(this)(t, this, a, s);
  }
  path(t, a, s) {
    const n = this.segments, o = Bs(this);
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
function to(e, t, a, s) {
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
    return to(this, t, "x", a);
  }
  inYRange(t, a) {
    return to(this, t, "y", a);
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
    this.skip || s.radius < 0.1 || !ga(this, a, this.size(s) / 2) || (t.strokeStyle = s.borderColor, t.lineWidth = s.borderWidth, t.fillStyle = s.backgroundColor, Ds(t, s, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function $i(e, t) {
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
  const s = e.options.borderWidth, n = e.borderSkipped, o = Qo(s);
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
  ]), n = e.options.borderRadius, o = Oe(n), i = Math.min(t, a), r = e.borderSkipped, c = s || ut(n);
  return {
    topLeft: ve(!c || r.top || r.left, o.topLeft, 0, i),
    topRight: ve(!c || r.top || r.right, o.topRight, 0, i),
    bottomLeft: ve(!c || r.bottom || r.left, o.bottomLeft, 0, i),
    bottomRight: ve(!c || r.bottom || r.right, o.bottomRight, 0, i)
  };
}
function Ud(e) {
  const t = $i(e), a = t.right - t.left, s = t.bottom - t.top, n = Yd(e, a / 2, s / 2), o = Kd(e, a / 2, s / 2);
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
function cs(e, t, a, s) {
  const n = t === null, o = a === null, r = e && !(n && o) && $i(e, s);
  return r && (n || oe(t, r.left, r.right)) && (o || oe(a, r.top, r.bottom));
}
function qd(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function Xd(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function ds(e, t, a = {}) {
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
    const { inflateAmount: a, options: { borderColor: s, backgroundColor: n } } = this, { inner: o, outer: i } = Ud(this), r = qd(i.radius) ? Va : Xd;
    t.save(), (i.w !== o.w || i.h !== o.h) && (t.beginPath(), r(t, ds(i, a, o)), t.clip(), r(t, ds(o, -a, i)), t.fillStyle = s, t.fill("evenodd")), t.beginPath(), r(t, ds(o, a)), t.fillStyle = n, t.fill(), t.restore();
  }
  inRange(t, a, s) {
    return cs(this, t, a, s);
  }
  inXRange(t, a) {
    return cs(this, t, null, a);
  }
  inYRange(t, a) {
    return cs(this, null, t, a);
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
    d = Xa(c, d, n);
    const u = Ls(a, n[c], n[d], r.loop);
    if (!t.segments) {
      i.push({
        source: r,
        target: u,
        start: n[c],
        end: n[d]
      });
      continue;
    }
    const h = li(t, u);
    for (const g of h) {
      const v = Ls(a, o[g.start], o[g.end], g.loop), f = ri(r, n, v);
      for (const x of f)
        i.push({
          source: x,
          target: g,
          start: {
            [a]: eo(u, v, "start", Math.max)
          },
          end: {
            [a]: eo(u, v, "end", Math.min)
          }
        });
    }
  }
  return i;
}
function Ls(e, t, a, s) {
  if (s)
    return;
  let n = t[e], o = a[e];
  return e === "angle" && (n = Nt(n), o = Nt(o)), {
    property: e,
    start: n,
    end: o
  };
}
function Qd(e, t) {
  const { x: a = null, y: s = null } = e || {}, n = t.points, o = [];
  return t.segments.forEach(({ start: i, end: r }) => {
    r = Xa(i, r, n);
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
function Xa(e, t, a) {
  for (; t > e; t--) {
    const s = a[t];
    if (!isNaN(s.x) && !isNaN(s.y))
      break;
  }
  return t;
}
function eo(e, t, a, s) {
  return e && t ? s(e[a], t[a]) : e ? e[a] : t ? t[a] : 0;
}
function Mi(e, t) {
  let a = [], s = !1;
  return Mt(e) ? (s = !0, a = e) : a = Qd(e, t), a.length ? new qa({
    points: a,
    options: {
      tension: 0
    },
    _loop: s,
    _fullLoop: s
  }) : null;
}
function ao(e) {
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
  if (ut(s))
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
  return e === "start" ? a = t.bottom : e === "end" ? a = t.top : ut(e) ? a = t.getPixelForValue(e.value) : t.getBasePixel && (a = t.getBasePixel()), a;
}
function su(e, t, a) {
  let s;
  return e === "start" ? s = a : e === "end" ? s = t.options.reverse ? t.min : t.max : ut(e) ? s = e.value : s = t.getBaseValue(), s;
}
function nu(e) {
  const t = e.options, a = t.fill;
  let s = it(a && a.target, a);
  return s === void 0 && (s = !!t.backgroundColor), s === !1 || s === null ? !1 : s === !0 ? "origin" : s;
}
function ou(e) {
  const { scale: t, index: a, line: s } = e, n = [], o = s.segments, i = s.points, r = iu(t, a);
  r.push(Mi({
    x: null,
    y: t.bottom
  }, s));
  for (let c = 0; c < o.length; c++) {
    const d = o[c];
    for (let u = d.start; u <= d.end; u++)
      ru(n, i[u], r);
  }
  return new qa({
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
    const u = o[d], h = i[u.start][a], g = i[u.end][a];
    if (oe(n, h, g)) {
      r = n === h, c = n === g;
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
      end: yt
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
  return n instanceof Ci ? n : Mi(n, s);
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
function us(e, t, a) {
  const s = cu(t), { chart: n, index: o, line: i, scale: r, axis: c } = t, d = i.options, u = d.fill, h = d.backgroundColor, { above: g = h, below: v = h } = u || {}, f = n.getDatasetMeta(o), x = ci(n, f);
  s && i.points.length && (Ha(e, a), gu(e, {
    line: i,
    target: s,
    above: g,
    below: v,
    area: a,
    scale: r,
    axis: c,
    clip: x
  }), ja(e));
}
function gu(e, t) {
  const { line: a, target: s, above: n, below: o, area: i, scale: r, clip: c } = t, d = a._loop ? "angle" : t.axis;
  e.save();
  let u = o;
  o !== n && (d === "x" ? (so(e, s, i.top), hs(e, {
    line: a,
    target: s,
    color: n,
    scale: r,
    property: d,
    clip: c
  }), e.restore(), e.save(), so(e, s, i.bottom)) : d === "y" && (no(e, s, i.left), hs(e, {
    line: a,
    target: s,
    color: o,
    scale: r,
    property: d,
    clip: c
  }), e.restore(), e.save(), no(e, s, i.right), u = n)), hs(e, {
    line: a,
    target: s,
    color: u,
    scale: r,
    property: d,
    clip: c
  }), e.restore();
}
function so(e, t, a) {
  const { segments: s, points: n } = t;
  let o = !0, i = !1;
  e.beginPath();
  for (const r of s) {
    const { start: c, end: d } = r, u = n[c], h = n[Xa(c, d, n)];
    o ? (e.moveTo(u.x, u.y), o = !1) : (e.lineTo(u.x, a), e.lineTo(u.x, u.y)), i = !!t.pathSegment(e, r, {
      move: i
    }), i ? e.closePath() : e.lineTo(h.x, a);
  }
  e.lineTo(t.first().x, a), e.closePath(), e.clip();
}
function no(e, t, a) {
  const { segments: s, points: n } = t;
  let o = !0, i = !1;
  e.beginPath();
  for (const r of s) {
    const { start: c, end: d } = r, u = n[c], h = n[Xa(c, d, n)];
    o ? (e.moveTo(u.x, u.y), o = !1) : (e.lineTo(a, u.y), e.lineTo(u.x, u.y)), i = !!t.pathSegment(e, r, {
      move: i
    }), i ? e.closePath() : e.lineTo(a, h.y);
  }
  e.lineTo(a, t.first().y), e.closePath(), e.clip();
}
function hs(e, t) {
  const { line: a, target: s, property: n, color: o, scale: i, clip: r } = t, c = Zd(a, s, n);
  for (const { source: d, target: u, start: h, end: g } of c) {
    const { style: { backgroundColor: v = o } = {} } = d, f = s !== !0;
    e.save(), e.fillStyle = v, pu(e, i, r, f && Ls(n, h, g)), e.beginPath();
    const x = !!a.pathSegment(e, d);
    let b;
    if (f) {
      x ? e.closePath() : oo(e, s, g, n);
      const p = !!s.pathSegment(e, u, {
        move: x,
        reverse: !0
      });
      b = x && p, b || oo(e, s, h, n);
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
function oo(e, t, a, s) {
  const n = t.interpolate(a, s);
  n && e.lineTo(n.x, n.y);
}
var vu = {
  id: "filler",
  afterDatasetsUpdate(e, t, a) {
    const s = (e.data.datasets || []).length, n = [];
    let o, i, r, c;
    for (i = 0; i < s; ++i)
      o = e.getDatasetMeta(i), r = o.dataset, c = null, r && r.options && r instanceof qa && (c = {
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
      r && (r.line.updateControlPoints(o, r.axis), s && r.fill && us(e.ctx, r, o));
    }
  },
  beforeDatasetsDraw(e, t, a) {
    if (a.drawTime !== "beforeDatasetsDraw")
      return;
    const s = e.getSortedVisibleDatasetMetas();
    for (let n = s.length - 1; n >= 0; --n) {
      const o = s[n].$filler;
      ao(o) && us(e.ctx, o, e.chartArea);
    }
  },
  beforeDatasetDraw(e, t, a) {
    const s = t.meta.$filler;
    !ao(s) || a.drawTime !== "beforeDatasetDraw" || us(e.ctx, s, e.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const io = (e, t) => {
  let { boxHeight: a = t, boxWidth: s = t } = e;
  return e.usePointStyle && (a = Math.min(a, t), s = e.pointStyleWidth || Math.min(s, t)), {
    boxWidth: s,
    boxHeight: a,
    itemHeight: Math.max(t, a)
  };
}, bu = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class ro extends le {
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
    let a = mt(t.generateLabels, [
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
    const s = t.labels, n = Bt(s.font), o = n.size, i = this._computeTitleHeight(), { boxWidth: r, itemHeight: c } = io(s, o);
    let d, u;
    a.font = n.string, this.isHorizontal() ? (d = this.maxWidth, u = this._fitRows(i, o, r, c) + 10) : (u = this.maxHeight, d = this._fitCols(i, n, r, c) + 10), this.width = Math.min(d, t.maxWidth || this.maxWidth), this.height = Math.min(u, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, a, s, n) {
    const { ctx: o, maxWidth: i, options: { labels: { padding: r } } } = this, c = this.legendHitBoxes = [], d = this.lineWidths = [
      0
    ], u = n + r;
    let h = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let g = -1, v = -u;
    return this.legendItems.forEach((f, x) => {
      const b = s + a / 2 + o.measureText(f.text).width;
      (x === 0 || d[d.length - 1] + b + 2 * r > i) && (h += u, d[d.length - (x > 0 ? 0 : 1)] = 0, v += u, g++), c[x] = {
        left: 0,
        top: v,
        row: g,
        width: b,
        height: n
      }, d[d.length - 1] += b + r;
    }), h;
  }
  _fitCols(t, a, s, n) {
    const { ctx: o, maxHeight: i, options: { labels: { padding: r } } } = this, c = this.legendHitBoxes = [], d = this.columnSizes = [], u = i - t;
    let h = r, g = 0, v = 0, f = 0, x = 0;
    return this.legendItems.forEach((b, p) => {
      const { itemWidth: m, itemHeight: w } = mu(s, a, o, b, n);
      p > 0 && v + w + 2 * r > u && (h += g + r, d.push({
        width: g,
        height: v
      }), f += g + r, x++, g = v = 0), c[p] = {
        left: f,
        top: v,
        col: x,
        width: m,
        height: w
      }, g = Math.max(g, m), v += w + r;
    }), h += g, d.push({
      width: g,
      height: v
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: a, options: { align: s, labels: { padding: n }, rtl: o } } = this, i = Ve(o, this.left, this.width);
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
      Ha(t, this), this._draw(), ja(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: a, lineWidths: s, ctx: n } = this, { align: o, labels: i } = t, r = $t.color, c = Ve(t.rtl, this.left, this.width), d = Bt(i.font), { padding: u } = i, h = d.size, g = h / 2;
    let v;
    this.drawTitle(), n.textAlign = c.textAlign("left"), n.textBaseline = "middle", n.lineWidth = 0.5, n.font = d.string;
    const { boxWidth: f, boxHeight: x, itemHeight: b } = io(i, h), p = function(S, D, A) {
      if (isNaN(f) || f <= 0 || isNaN(x) || x < 0)
        return;
      n.save();
      const T = it(A.lineWidth, 1);
      if (n.fillStyle = it(A.fillStyle, r), n.lineCap = it(A.lineCap, "butt"), n.lineDashOffset = it(A.lineDashOffset, 0), n.lineJoin = it(A.lineJoin, "miter"), n.lineWidth = T, n.strokeStyle = it(A.strokeStyle, r), n.setLineDash(it(A.lineDash, [])), i.usePointStyle) {
        const L = {
          radius: x * Math.SQRT2 / 2,
          pointStyle: A.pointStyle,
          rotation: A.rotation,
          borderWidth: T
        }, I = c.xPlus(S, f / 2), O = D + g;
        Zo(n, L, I, O, i.pointStyleWidth && f);
      } else {
        const L = D + Math.max((h - x) / 2, 0), I = c.leftForLtr(S, f), O = Oe(A.borderRadius);
        n.beginPath(), Object.values(O).some((X) => X !== 0) ? Va(n, {
          x: I,
          y: L,
          w: f,
          h: x,
          radius: O
        }) : n.rect(I, L, f, x), n.fill(), T !== 0 && n.stroke();
      }
      n.restore();
    }, m = function(S, D, A) {
      pa(n, A.text, S, D + b / 2, d, {
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
    }, ni(this.ctx, t.textDirection);
    const M = b + u;
    this.legendItems.forEach((S, D) => {
      n.strokeStyle = S.fontColor, n.fillStyle = S.fontColor;
      const A = n.measureText(S.text).width, T = c.textAlign(S.textAlign || (S.textAlign = i.textAlign)), L = f + g + A;
      let I = v.x, O = v.y;
      c.setWidth(this.width), w ? D > 0 && I + L + u > this.right && (O = v.y += M, v.line++, I = v.x = Dt(o, this.left + u, this.right - s[v.line])) : D > 0 && O + M > this.bottom && (I = v.x = I + a[v.line].width + u, v.line++, O = v.y = Dt(o, this.top + k + u, this.bottom - a[v.line].height));
      const X = c.x(I);
      if (p(X, O, S), I = Nr(T, I + f + g, w ? I + L : this.right, t.rtl), m(c.x(I), O, S), w)
        v.x += L + u;
      else if (typeof S.text != "string") {
        const P = d.lineHeight;
        v.y += Si(S, P) + u;
      } else
        v.y += M;
    }), oi(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, a = t.title, s = Bt(a.font), n = Yt(a.padding);
    if (!a.display)
      return;
    const o = Ve(t.rtl, this.left, this.width), i = this.ctx, r = a.position, c = s.size / 2, d = n.top + c;
    let u, h = this.left, g = this.width;
    if (this.isHorizontal())
      g = Math.max(...this.lineWidths), u = this.top + d, h = Dt(t.align, h, this.right - g);
    else {
      const f = this.columnSizes.reduce((x, b) => Math.max(x, b.height), 0);
      u = d + Dt(t.align, this.top, this.bottom - f - t.labels.padding - this._computeTitleHeight());
    }
    const v = Dt(r, h, h + g);
    i.textAlign = o.textAlign(Vs(r)), i.textBaseline = "middle", i.strokeStyle = a.color, i.fillStyle = a.color, i.font = s.string, pa(i, a.text, v, u, s);
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
      n && !o && mt(a.onLeave, [
        t,
        n,
        this
      ], this), this._hoveredItem = s, s && !o && mt(a.onHover, [
        t,
        s,
        this
      ], this);
    } else s && mt(a.onClick, [
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
  return typeof t.text != "string" && (s = Si(t, a)), s;
}
function Si(e, t) {
  const a = e.text ? e.text.length : 0;
  return t * a;
}
function xu(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var Xs = {
  id: "legend",
  _element: ro,
  start(e, t, a) {
    const s = e.legend = new ro({
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
class Di extends le {
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
    return this.isHorizontal() ? (u = Dt(r, s, o), h = a + t, d = o - s) : (i.position === "left" ? (u = s + t, h = Dt(r, n, a), c = bt * -0.5) : (u = o - t, h = Dt(r, a, n), c = bt * 0.5), d = n - a), {
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
    pa(t, a.text, 0, 0, s, {
      color: a.color,
      maxWidth: c,
      rotation: d,
      textAlign: Vs(a.align),
      textBaseline: "middle",
      translation: [
        i,
        r
      ]
    });
  }
}
function ku(e, t) {
  const a = new Di({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  jt.configure(e, a, t), jt.addBox(e, a), e.titleBlock = a;
}
var Ai = {
  id: "title",
  _element: Di,
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
        const d = c.getCenterPoint(), u = Cs(t, d);
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
function lo(e, t) {
  const a = e.chart.ctx, { body: s, footer: n, title: o } = e, { boxWidth: i, boxHeight: r } = t, c = Bt(t.bodyFont), d = Bt(t.titleFont), u = Bt(t.footerFont), h = o.length, g = n.length, v = s.length, f = Yt(t.padding);
  let x = f.height, b = 0, p = s.reduce((k, M) => k + M.before.length + M.lines.length + M.after.length, 0);
  if (p += e.beforeBody.length + e.afterBody.length, h && (x += h * d.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), p) {
    const k = t.displayColors ? Math.max(r, c.lineHeight) : c.lineHeight;
    x += v * k + (p - v) * c.lineHeight + (p - 1) * t.bodySpacing;
  }
  g && (x += t.footerMarginTop + g * u.lineHeight + (g - 1) * t.footerSpacing);
  let m = 0;
  const w = function(k) {
    b = Math.max(b, a.measureText(k).width + m);
  };
  return a.save(), a.font = d.string, pt(e.title, w), a.font = c.string, pt(e.beforeBody.concat(e.afterBody), w), m = t.displayColors ? i + 2 + t.boxPadding : 0, pt(s, (k) => {
    pt(k.before, w), pt(k.lines, w), pt(k.after, w);
  }), m = 0, a.font = u.string, pt(e.footer, w), a.restore(), b += f.width, {
    width: b,
    height: x
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
function co(e, t, a) {
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
function uo(e, t, a, s) {
  const { caretSize: n, caretPadding: o, cornerRadius: i } = e, { xAlign: r, yAlign: c } = a, d = n + o, { topLeft: u, topRight: h, bottomLeft: g, bottomRight: v } = Oe(i);
  let f = Su(t, r);
  const x = Du(t, c, d);
  return c === "center" ? r === "left" ? f += d : r === "right" && (f -= d) : r === "left" ? f -= Math.max(u, g) + n : r === "right" && (f += Math.max(h, v) + n), {
    x: Tt(f, 0, s.width - t.width),
    y: Tt(x, 0, s.height - t.height)
  };
}
function Ta(e, t, a) {
  const s = Yt(a.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - s.right : e.x + s.left;
}
function ho(e) {
  return Gt([], ae(e));
}
function Au(e, t, a) {
  return Le(e, {
    tooltip: t,
    tooltipItems: a,
    type: "tooltip"
  });
}
function fo(e, t) {
  const a = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return a ? e.override(a) : e;
}
const Ti = {
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
function Rt(e, t, a, s) {
  const n = e[t].call(a, s);
  return typeof n > "u" ? Ti[t].call(a, s) : n;
}
class go extends le {
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
    const a = this.chart, s = this.options.setContext(this.getContext()), n = s.enabled && a.options.animation && s.animations, o = new di(this.chart, n);
    return n._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = Au(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, a) {
    const { callbacks: s } = a, n = Rt(s, "beforeTitle", this, t), o = Rt(s, "title", this, t), i = Rt(s, "afterTitle", this, t);
    let r = [];
    return r = Gt(r, ae(n)), r = Gt(r, ae(o)), r = Gt(r, ae(i)), r;
  }
  getBeforeBody(t, a) {
    return ho(Rt(a.callbacks, "beforeBody", this, t));
  }
  getBody(t, a) {
    const { callbacks: s } = a, n = [];
    return pt(t, (o) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, r = fo(s, o);
      Gt(i.before, ae(Rt(r, "beforeLabel", this, o))), Gt(i.lines, Rt(r, "label", this, o)), Gt(i.after, ae(Rt(r, "afterLabel", this, o))), n.push(i);
    }), n;
  }
  getAfterBody(t, a) {
    return ho(Rt(a.callbacks, "afterBody", this, t));
  }
  getFooter(t, a) {
    const { callbacks: s } = a, n = Rt(s, "beforeFooter", this, t), o = Rt(s, "footer", this, t), i = Rt(s, "afterFooter", this, t);
    let r = [];
    return r = Gt(r, ae(n)), r = Gt(r, ae(o)), r = Gt(r, ae(i)), r;
  }
  _createItems(t) {
    const a = this._active, s = this.chart.data, n = [], o = [], i = [];
    let r = [], c, d;
    for (c = 0, d = a.length; c < d; ++c)
      r.push(wu(this.chart, a[c]));
    return t.filter && (r = r.filter((u, h, g) => t.filter(u, h, g, s))), t.itemSort && (r = r.sort((u, h) => t.itemSort(u, h, s))), pt(r, (u) => {
      const h = fo(t.callbacks, u);
      n.push(Rt(h, "labelColor", this, u)), o.push(Rt(h, "labelPointStyle", this, u)), i.push(Rt(h, "labelTextColor", this, u));
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
      const c = this._size = lo(this, s), d = Object.assign({}, r, c), u = co(this.chart, s, d), h = uo(s, d, u, this.chart);
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
    const { xAlign: n, yAlign: o } = this, { caretSize: i, cornerRadius: r } = s, { topLeft: c, topRight: d, bottomLeft: u, bottomRight: h } = Oe(r), { x: g, y: v } = t, { width: f, height: x } = a;
    let b, p, m, w, k, M;
    return o === "center" ? (k = v + x / 2, n === "left" ? (b = g, p = b - i, w = k + i, M = k - i) : (b = g + f, p = b + i, w = k - i, M = k + i), m = b) : (n === "left" ? p = g + Math.max(c, u) + i : n === "right" ? p = g + f - Math.max(d, h) - i : p = this.caretX, o === "top" ? (w = v, k = w - i, b = p - i, m = p + i) : (w = v + x, k = w + i, b = p + i, m = p - i), M = w), {
      x1: b,
      x2: p,
      x3: m,
      y1: w,
      y2: k,
      y3: M
    };
  }
  drawTitle(t, a, s) {
    const n = this.title, o = n.length;
    let i, r, c;
    if (o) {
      const d = Ve(s.rtl, this.x, this.width);
      for (t.x = Ta(this, s.titleAlign, s), a.textAlign = d.textAlign(s.titleAlign), a.textBaseline = "middle", i = Bt(s.titleFont), r = s.titleSpacing, a.fillStyle = s.titleColor, a.font = i.string, c = 0; c < o; ++c)
        a.fillText(n[c], d.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + r, c + 1 === o && (t.y += s.titleMarginBottom - r);
    }
  }
  _drawColorBox(t, a, s, n, o) {
    const i = this.labelColors[s], r = this.labelPointStyles[s], { boxHeight: c, boxWidth: d } = o, u = Bt(o.bodyFont), h = Ta(this, "left", o), g = n.x(h), v = c < u.lineHeight ? (u.lineHeight - c) / 2 : 0, f = a.y + v;
    if (o.usePointStyle) {
      const x = {
        radius: Math.min(d, c) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, b = n.leftForLtr(g, d) + d / 2, p = f + c / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, Ds(t, x, b, p), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, Ds(t, x, b, p);
    } else {
      t.lineWidth = ut(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const x = n.leftForLtr(g, d), b = n.leftForLtr(n.xPlus(g, 1), d - 2), p = Oe(i.borderRadius);
      Object.values(p).some((m) => m !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, Va(t, {
        x,
        y: f,
        w: d,
        h: c,
        radius: p
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), Va(t, {
        x: b,
        y: f + 1,
        w: d - 2,
        h: c - 2,
        radius: p
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(x, f, d, c), t.strokeRect(x, f, d, c), t.fillStyle = i.backgroundColor, t.fillRect(b, f + 1, d - 2, c - 2));
    }
    t.fillStyle = this.labelTextColors[s];
  }
  drawBody(t, a, s) {
    const { body: n } = this, { bodySpacing: o, bodyAlign: i, displayColors: r, boxHeight: c, boxWidth: d, boxPadding: u } = s, h = Bt(s.bodyFont);
    let g = h.lineHeight, v = 0;
    const f = Ve(s.rtl, this.x, this.width), x = function(A) {
      a.fillText(A, f.x(t.x + v), t.y + g / 2), t.y += g + o;
    }, b = f.textAlign(i);
    let p, m, w, k, M, S, D;
    for (a.textAlign = i, a.textBaseline = "middle", a.font = h.string, t.x = Ta(this, b, s), a.fillStyle = s.bodyColor, pt(this.beforeBody, x), v = r && b !== "right" ? i === "center" ? d / 2 + u : d + 2 + u : 0, k = 0, S = n.length; k < S; ++k) {
      for (p = n[k], m = this.labelTextColors[k], a.fillStyle = m, pt(p.before, x), w = p.lines, r && w.length && (this._drawColorBox(a, t, k, f, s), g = Math.max(h.lineHeight, c)), M = 0, D = w.length; M < D; ++M)
        x(w[M]), g = h.lineHeight;
      pt(p.after, x);
    }
    v = 0, g = h.lineHeight, pt(this.afterBody, x), t.y -= o;
  }
  drawFooter(t, a, s) {
    const n = this.footer, o = n.length;
    let i, r;
    if (o) {
      const c = Ve(s.rtl, this.x, this.width);
      for (t.x = Ta(this, s.footerAlign, s), t.y += s.footerMarginTop, a.textAlign = c.textAlign(s.footerAlign), a.textBaseline = "middle", i = Bt(s.footerFont), a.fillStyle = s.footerColor, a.font = i.string, r = 0; r < o; ++r)
        a.fillText(n[r], c.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + s.footerSpacing;
    }
  }
  drawBackground(t, a, s, n) {
    const { xAlign: o, yAlign: i } = this, { x: r, y: c } = t, { width: d, height: u } = s, { topLeft: h, topRight: g, bottomLeft: v, bottomRight: f } = Oe(n.cornerRadius);
    a.fillStyle = n.backgroundColor, a.strokeStyle = n.borderColor, a.lineWidth = n.borderWidth, a.beginPath(), a.moveTo(r + h, c), i === "top" && this.drawCaret(t, a, s, n), a.lineTo(r + d - g, c), a.quadraticCurveTo(r + d, c, r + d, c + g), i === "center" && o === "right" && this.drawCaret(t, a, s, n), a.lineTo(r + d, c + u - f), a.quadraticCurveTo(r + d, c + u, r + d - f, c + u), i === "bottom" && this.drawCaret(t, a, s, n), a.lineTo(r + v, c + u), a.quadraticCurveTo(r, c + u, r, c + u - v), i === "center" && o === "left" && this.drawCaret(t, a, s, n), a.lineTo(r, c + h), a.quadraticCurveTo(r, c, r + h, c), a.closePath(), a.fill(), n.borderWidth > 0 && a.stroke();
  }
  _updateAnimationTarget(t) {
    const a = this.chart, s = this.$animations, n = s && s.x, o = s && s.y;
    if (n || o) {
      const i = sa[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const r = this._size = lo(this, t), c = Object.assign({}, i, this._size), d = co(a, t, c), u = uo(t, c, d, a);
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
    a.enabled && r && (t.save(), t.globalAlpha = s, this.drawBackground(o, t, n, a), ni(t, a.textDirection), o.y += i.top, this.drawTitle(o, t, a), this.drawBody(o, t, a), this.drawFooter(o, t, a), oi(t, a.textDirection), t.restore());
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
var Gs = {
  id: "tooltip",
  _element: go,
  positioners: sa,
  afterInit(e, t, a) {
    a && (e.tooltip = new go({
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
    callbacks: Ti
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
function po(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Bi extends He {
  static id = "category";
  static defaults = {
    ticks: {
      callback: po
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
    return po.call(this, t);
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
  const a = [], { bounds: n, step: o, min: i, max: r, precision: c, count: d, maxTicks: u, maxDigits: h, includeBounds: g } = e, v = o || 1, f = u - 1, { min: x, max: b } = t, p = !gt(i), m = !gt(r), w = !gt(d), k = (b - x) / (h + 1);
  let M = dn((b - x) / f / v) * v, S, D, A, T;
  if (M < 1e-14 && !p && !m)
    return [
      {
        value: x
      },
      {
        value: b
      }
    ];
  T = Math.ceil(b / M) - Math.floor(x / M), T > f && (M = dn(T * M / f / v) * v), gt(c) || (S = Math.pow(10, c), M = Math.ceil(M * S) / S), n === "ticks" ? (D = Math.floor(x / M) * M, A = Math.ceil(b / M) * M) : (D = x, A = b), p && m && o && Lr((r - i) / o, M / 1e3) ? (T = Math.round(Math.min((r - i) / M, u)), M = (r - i) / T, D = i, A = r) : w ? (D = p ? i : D, A = m ? r : A, T = d - 1, M = (A - D) / T) : (T = (A - D) / M, oa(T, Math.round(T), M / 1e3) ? T = Math.round(T) : T = Math.ceil(T));
  const L = Math.max(un(M), un(D));
  S = Math.pow(10, gt(c) ? L : c), D = Math.round(D * S) / S, A = Math.round(A * S) / S;
  let I = 0;
  for (p && (g && D !== i ? (a.push({
    value: i
  }), D < i && I++, oa(Math.round((D + I * M) * S) / S, i, vo(i, k, e)) && I++) : D < i && I++); I < T; ++I) {
    const O = Math.round((D + I * M) * S) / S;
    if (m && O > r)
      break;
    a.push({
      value: O
    });
  }
  return m && g && A !== r ? a.length && oa(a[a.length - 1].value, r, vo(r, k, e)) ? a[a.length - 1].value = r : a.push({
    value: r
  }) : (!m || A === r) && a.push({
    value: A
  }), a;
}
function vo(e, t, { horizontal: a, minRotation: s }) {
  const n = ne(s), o = (a ? Math.sin(n) : Math.cos(n)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / o, i);
}
class Pu extends He {
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
    return Ns(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Li extends Pu {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: Go.formatters.numeric
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
const Ga = {
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
}, It = /* @__PURE__ */ Object.keys(Ga);
function bo(e, t) {
  return e - t;
}
function mo(e, t) {
  if (gt(t))
    return null;
  const a = e._adapter, { parser: s, round: n, isoWeekday: o } = e._parseOpts;
  let i = t;
  return typeof s == "function" && (i = s(i)), Lt(i) || (i = typeof s == "string" ? a.parse(i, s) : a.parse(i)), i === null ? null : (n && (i = n === "week" && (ha(o) || o === !0) ? a.startOf(i, "isoWeek", o) : a.startOf(i, n)), +i);
}
function yo(e, t, a, s) {
  const n = It.length;
  for (let o = It.indexOf(e); o < n - 1; ++o) {
    const i = Ga[It[o]], r = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((a - t) / (r * i.size)) <= s)
      return It[o];
  }
  return It[n - 1];
}
function Eu(e, t, a, s, n) {
  for (let o = It.length - 1; o >= It.indexOf(a); o--) {
    const i = It[o];
    if (Ga[i].common && e._adapter.diff(n, s, i) >= t - 1)
      return i;
  }
  return It[a ? It.indexOf(a) : 0];
}
function Ru(e) {
  for (let t = It.indexOf(e) + 1, a = It.length; t < a; ++t)
    if (Ga[It[t]].common)
      return It[t];
}
function _o(e, t, a) {
  if (!a)
    e[t] = !0;
  else if (a.length) {
    const { lo: s, hi: n } = Os(a, t), o = a[s] >= t ? a[s] : a[n];
    e[o] = !0;
  }
}
function Iu(e, t, a, s) {
  const n = e._adapter, o = +n.startOf(t[0].value, s), i = t[t.length - 1].value;
  let r, c;
  for (r = o; r <= i; r = +n.add(r, 1, s))
    c = a[r], c >= 0 && (t[c].major = !0);
  return t;
}
function xo(e, t, a) {
  const s = [], n = {}, o = t.length;
  let i, r;
  for (i = 0; i < o; ++i)
    r = t[i], n[r] = i, s.push({
      value: r,
      major: !1
    });
  return o === 0 || !a ? s : Iu(e, s, n, a);
}
class ko extends He {
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
    return t === void 0 ? null : mo(this, t);
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
    return this._unit = a.unit || (s.autoSkip ? yo(a.minUnit, this.min, this.max, this._getLabelCapacity(o)) : Eu(this, r.length, a.minUnit, this.min, this.max)), this._majorUnit = !s.major.enabled || this._unit === "year" ? void 0 : Ru(this._unit), this.initOffsets(n), t.reverse && r.reverse(), xo(this, r, this._majorUnit);
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
    const t = this._adapter, a = this.min, s = this.max, n = this.options, o = n.time, i = o.unit || yo(o.minUnit, a, s, this._getLabelCapacity(a)), r = it(n.ticks.stepSize, 1), c = i === "week" ? o.isoWeekday : !1, d = ha(c) || c === !0, u = {};
    let h = a, g, v;
    if (d && (h = +t.startOf(h, "isoWeek", c)), h = +t.startOf(h, d ? "day" : i), t.diff(s, a, i) > 1e5 * r)
      throw new Error(a + " and " + s + " are too far apart with stepSize of " + r + " " + i);
    const f = n.ticks.source === "data" && this.getDataTimestamps();
    for (g = h, v = 0; g < s; g = +t.add(g, r, i), v++)
      _o(u, g, f);
    return (g === s || n.bounds === "ticks" || v === 1) && _o(u, g, f), Object.keys(u).sort(bo).map((x) => +x);
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
      return mt(i, [
        t,
        a,
        s
      ], this);
    const r = o.time.displayFormats, c = this._unit, d = this._majorUnit, u = c && r[c], h = d && r[d], g = s[a], v = d && h && g && g.major;
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
    const a = this.options.time, s = a.displayFormats, n = s[a.unit] || s.millisecond, o = this._tickFormatFunction(t, 0, xo(this, [
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
      t.push(mo(this, n[a]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Uo(t.sort(bo));
  }
}
function Ba(e, t, a) {
  let s = 0, n = e.length - 1, o, i, r, c;
  a ? (t >= e[s].pos && t <= e[n].pos && ({ lo: s, hi: n } = De(e, "pos", t)), { pos: o, time: r } = e[s], { pos: i, time: c } = e[n]) : (t >= e[s].time && t <= e[n].time && ({ lo: s, hi: n } = De(e, "time", t)), { time: o, pos: r } = e[s], { time: i, pos: c } = e[n]);
  const d = i - o;
  return d ? r + (c - r) * (t - o) / d : r;
}
class PM extends ko {
  static id = "timeseries";
  static defaults = ko.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), a = this._table = this.buildLookupTable(t);
    this._minPos = Ba(a, this.min), this._tableRange = Ba(a, this.max) - this._minPos, super.initOffsets(t);
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
    return (Ba(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const a = this._offsets, s = this.getDecimalForPixel(t) / a.factor - a.end;
    return Ba(this._table, s * this._tableRange + this._minPos, !0);
  }
}
const Fi = {
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
  ...Fi,
  ...Ou
}, zu = Ui[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function Re(e) {
  return Po(e) ? $s(e) : e;
}
function Nu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return Po(t) ? new Proxy(e, {}) : e;
}
function Wu(e, t) {
  const a = e.options;
  a && t && Object.assign(a, t);
}
function Pi(e, t) {
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
  return Pi(a, e.labels), Ei(a, e.datasets, t), a;
}
const ju = J({
  props: Vu,
  setup(e, t) {
    let { expose: a, slots: s } = t;
    const n = at(null), o = Fo(null);
    a({
      chart: o
    });
    const i = () => {
      if (!n.value) return;
      const { type: d, data: u, options: h, plugins: g, datasetIdKey: v } = e, f = Hu(u, v), x = Nu(f, u);
      o.value = new je(n.value, {
        type: d,
        data: x,
        options: {
          ...h
        },
        plugins: g
      });
    }, r = () => {
      const d = $s(o.value);
      d && (e.destroyDelay > 0 ? setTimeout(() => {
        d.destroy(), o.value = null;
      }, e.destroyDelay) : (d.destroy(), o.value = null));
    }, c = (d) => {
      d.update(e.updateMode);
    };
    return re(i), We(r), Et([
      () => e.options,
      () => e.data
    ], (d, u) => {
      let [h, g] = d, [v, f] = u;
      const x = $s(o.value);
      if (!x)
        return;
      let b = !1;
      if (h) {
        const p = Re(h), m = Re(v);
        p && p !== m && (Wu(x, p), b = !0);
      }
      if (g) {
        const p = Re(g.labels), m = Re(f.labels), w = Re(g.datasets), k = Re(f.datasets);
        p !== m && (Pi(x.config.data, p), b = !0), w && w !== k && (Ei(x.config.data, w, e.datasetIdKey), b = !0);
      }
      b && Ct(() => {
        c(x);
      });
    }, {
      deep: !0
    }), () => ws("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: n
    }, [
      ws("p", {}, [
        s.default ? s.default() : ""
      ])
    ]);
  }
});
function Zs(e, t) {
  return je.register(t), J({
    props: Fi,
    setup(a, s) {
      let { expose: n } = s;
      const o = Fo(null), i = (r) => {
        o.value = r?.chart;
      };
      return n({
        chart: o
      }), () => ws(ju, zu({
        ref: i
      }, {
        type: e,
        ...a
      }));
    }
  });
}
const Yu = /* @__PURE__ */ Zs("bar", gc), Ku = /* @__PURE__ */ Zs("line", bc), Uu = /* @__PURE__ */ Zs("pie", mc), wo = {
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
}, $o = {
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
  const s = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", n = C(() => e?.value ? e.value : t.value), o = C(() => n.value === "dark"), i = C(() => o.value ? $o : wo), r = () => {
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
  }), We(() => {
    c();
  }), e && Et(e, () => {
  }), {
    isDark: o,
    currentTheme: n,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: wo,
    darkColors: $o,
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
    je.register(
      Bi,
      Li,
      Gd,
      Ai,
      Gs,
      Xs
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
    return t({ isDark: s }), (c, d) => (y(), _("div", Xu, [
      Q(B(Yu), {
        data: B(o),
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
    je.register(
      Bi,
      Li,
      jd,
      qa,
      Ai,
      Gs,
      Xs,
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
    return t({ isDark: s }), (c, d) => (y(), _("div", Zu, [
      Q(B(Ku), {
        data: B(o),
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
    je.register(Pd, Gs, Xs);
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
              return d.labels.length && d.datasets.length ? d.labels.map((u, h) => {
                const g = c.getDatasetMeta(0), v = d.datasets[0], f = v.data[h], x = Array.isArray(v.backgroundColor) ? v.backgroundColor[h] : v.backgroundColor;
                return {
                  text: `${i(u)}: ${f}`,
                  fillStyle: x,
                  hidden: g.data[h]?.hidden || !1,
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
              const d = c.label || "", u = c.parsed || 0, h = c.dataset.data.reduce((v, f) => v + f, 0), g = (u / h * 100).toFixed(1);
              return `${i(d)}: ${u} (${g}%)`;
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
    return t({ isDark: s }), (c, d) => (y(), _("div", Ju, [
      Q(B(Uu), {
        data: B(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Za = /* @__PURE__ */ nt(th, [["__scopeId", "data-v-23a84317"]]), eh = { class: "chart-container" }, ah = ["viewBox"], sh = ["transform"], nh = ["x", "width", "fill", "stroke"], oh = ["fill"], ih = ["x1", "y1", "x2", "y2", "stroke"], rh = ["points", "fill"], lh = ["x1", "y1", "x2", "y2", "stroke"], ch = ["x", "y", "fill"], dh = ["x1", "y1", "x2", "y2", "stroke"], uh = ["points", "fill"], hh = ["transform"], fh = ["y1", "y2"], gh = ["y1", "y2"], ph = ["y1", "y2"], vh = ["y1", "y2"], bh = ["y", "height"], mh = ["y1", "y2"], yh = ["y1", "y2"], _h = ["y1", "y2"], xh = ["y1", "y2"], kh = ["y", "height"], wh = ["cy", "stroke", "onMouseenter"], $h = ["cy", "stroke", "onMouseenter"], Mh = ["cy", "stroke", "onMouseenter"], Ch = ["cy", "stroke", "onMouseenter"], Sh = ["y1", "y2", "onMouseenter"], Dh = ["y1", "y2", "onMouseenter"], Ah = ["x", "y", "fill"], Th = ["x", "y", "fill"], Bh = ["transform"], Lh = { transform: "translate(-200, 0)" }, Fh = ["stroke"], Ph = ["fill"], Eh = { transform: "translate(-130, 0)" }, Rh = ["stroke"], Ih = ["fill"], Oh = { transform: "translate(-60, 0)" }, Vh = ["stroke"], zh = ["fill"], Nh = { transform: "translate(10, 0)" }, Wh = ["stroke"], Hh = ["fill"], jh = { transform: "translate(80, 0)" }, Yh = ["fill"], Kh = { transform: "translate(150, 0)" }, Uh = ["fill"], qh = /* @__PURE__ */ J({
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
    }), i = (g) => typeof g == "string" ? g.charAt(0).toUpperCase() + g.slice(1).toLowerCase() : g, r = (g, v) => {
      const f = g.currentTarget.closest("svg");
      if (!f) return;
      const x = f.getBoundingClientRect(), b = f.createSVGPoint();
      b.x = g.clientX - x.left, b.y = g.clientY - x.top, o.value = {
        visible: !0,
        x: b.x,
        y: b.y - 20,
        text: v
      };
    }, c = (g) => {
      if (o.value.visible) {
        const v = g.currentTarget, f = v.getBoundingClientRect(), x = v.createSVGPoint();
        x.x = g.clientX - f.left, x.y = g.clientY - f.top, o.value.x = x.x, o.value.y = x.y - 20;
      }
    }, d = () => {
      o.value.visible = !1;
    }, u = () => {
      o.value.visible = !1;
    }, h = C(() => {
      const g = [], f = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let x = 1; x <= 10; x++) {
        const b = x, p = (b - 1) / 9, m = a.chartMargin + f - p * f;
        g.push({ value: b, y: m });
      }
      return g;
    });
    return t({ isDark: s }), (g, v) => (y(), _("div", eh, [
      (y(), _("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: xt(`min-height: ${e.chartHeight}px;`),
        onMousemove: c,
        onMouseleave: d
      }, [
        o.value.visible ? (y(), _("g", {
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
        ], 8, sh)) : R("", !0),
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
        (y(!0), _(q, null, tt(h.value, (f, x) => (y(), _(q, { key: x }, [
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
        (y(!0), _(q, null, tt(e.boxplotData, (f, x) => (y(), _(q, { key: x }, [
          l("g", {
            transform: `translate(${f.centerX}, 0)`
          }, [
            f.isTotal ? (y(), _(q, { key: 0 }, [
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
            ], 64)) : (y(), _(q, { key: 1 }, [
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
            }, null, 40, Ch),
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
            }, null, 40, Sh),
            f.averageY ? (y(), _("line", {
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
            }, null, 40, Dh)) : R("", !0)
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
          f.responseCount ? (y(), _("text", {
            key: 0,
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: n.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + $(f.responseCount), 9, Th)) : R("", !0)
        ], 64))), 128)),
        e.showLegend ? (y(), _("g", {
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
          l("g", Eh, [
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
            }, " Q1 ", 8, Ih)
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
        ], 8, Bh)) : R("", !0)
      ], 44, ah))
    ]));
  }
}), Xh = /* @__PURE__ */ nt(qh, [["__scopeId", "data-v-520c623f"]]), Gh = { class: "chart-container" }, Zh = ["viewBox"], Qh = ["transform"], Jh = ["x", "y", "width", "height", "fill", "stroke"], tf = ["y", "fill"], ef = ["y", "fill"], af = ["x1", "y1", "x2", "y2", "stroke"], sf = ["points", "fill"], nf = ["x1", "y1", "x2", "y2", "stroke"], of = ["x1", "y1", "x2", "y2", "stroke"], rf = ["x", "y", "fill"], lf = ["x", "y", "fill", "transform"], cf = ["x1", "y1", "x2", "y2", "stroke"], df = ["points", "fill"], uf = ["transform"], hf = ["y1", "y2", "stroke", "onMouseenter"], ff = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], gf = ["x1", "y1", "x2", "y2", "onMouseenter"], pf = ["x1", "y1", "x2", "y2", "onMouseenter"], vf = ["cy", "stroke", "onMouseenter"], bf = ["cy", "stroke", "onMouseenter"], mf = ["x", "y", "fill"], yf = ["x", "y", "fill"], _f = ["transform"], xf = { transform: "translate(-180, 0)" }, kf = ["stroke"], wf = ["fill"], $f = { transform: "translate(-120, 0)" }, Mf = ["fill"], Cf = { transform: "translate(-60, 0)" }, Sf = ["fill"], Df = { transform: "translate(0, 0)" }, Af = ["stroke"], Tf = ["fill"], Bf = { transform: "translate(60, 0)" }, Lf = ["fill"], Ff = { transform: "translate(130, 0)" }, Pf = ["fill"], Ef = /* @__PURE__ */ J({
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
    }), i = (g) => typeof g == "string" ? g.charAt(0).toUpperCase() + g.slice(1).toLowerCase() : g, r = (g, v, f) => {
      const x = g.currentTarget.closest("svg");
      if (!x) return;
      const b = x.getBoundingClientRect(), p = x.createSVGPoint();
      p.x = g.clientX - b.left, p.y = g.clientY - b.top;
      let m = i(v.label), w = "";
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
        x: p.x,
        y: p.y - 20,
        title: m,
        text: w,
        width: k,
        height: M
      };
    }, c = (g) => {
      if (o.value.visible) {
        const v = g.currentTarget, f = v.getBoundingClientRect(), x = v.createSVGPoint();
        x.x = g.clientX - f.left, x.y = g.clientY - f.top, o.value.x = x.x, o.value.y = x.y - 20;
      }
    }, d = () => {
      o.value.visible = !1;
    }, u = () => {
      o.value.visible = !1;
    }, h = C(() => {
      const g = [], f = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let x = 1; x <= 10; x++) {
        const b = x, p = (b - 1) / 9, m = a.chartMargin + f - p * f;
        g.push({ value: b, y: m });
      }
      return g;
    });
    return t({ isDark: s }), (g, v) => (y(), _("div", Gh, [
      (y(), _("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: xt(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: c,
        onMouseleave: d
      }, [
        o.value.visible ? (y(), _("g", {
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
        ], 8, Qh)) : R("", !0),
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
        (y(!0), _(q, null, tt(h.value, (f, x) => (y(), _("line", {
          key: `grid-${x}`,
          x1: e.chartMargin,
          y1: f.y,
          x2: e.chartWidth - e.chartMargin,
          y2: f.y,
          stroke: n.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, nf))), 128)),
        (y(!0), _(q, null, tt(h.value, (f, x) => (y(), _(q, { key: x }, [
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
        (y(!0), _(q, null, tt(e.candlestickData, (f, x) => (y(), _(q, { key: x }, [
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
            f.medianY ? (y(), _("line", {
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
            }, null, 40, gf)) : R("", !0),
            f.averageY ? (y(), _("line", {
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
            }, null, 40, pf)) : R("", !0),
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
          f.responseCount ? (y(), _("text", {
            key: 0,
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: n.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + $(f.responseCount), 9, yf)) : R("", !0)
        ], 64))), 128)),
        e.showLegend ? (y(), _("g", {
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
        ], 8, _f)) : R("", !0)
      ], 44, Zh))
    ]));
  }
}), Ri = /* @__PURE__ */ nt(Ef, [["__scopeId", "data-v-61d0259c"]]), Rf = { class: "chart-container" }, If = ["viewBox"], Of = ["transform"], Vf = ["x", "y", "width", "height", "fill", "stroke"], zf = ["y", "fill"], Nf = ["y", "fill"], Wf = ["x1", "y1", "x2", "y2", "stroke"], Hf = ["x1", "y1", "x2", "y2", "stroke"], jf = ["points", "fill"], Yf = ["x1", "y1", "x2", "y2", "stroke"], Kf = ["x", "y", "fill"], Uf = ["x", "y", "fill", "transform"], qf = ["x1", "y1", "x2", "y2", "stroke"], Xf = ["points", "fill"], Gf = ["x1", "y1", "x2", "y2", "stroke"], Zf = ["x", "y", "fill"], Qf = ["x", "y", "fill"], Jf = ["d"], tg = ["x", "y", "width", "height", "onMouseenter"], eg = ["x1", "y1", "x2", "y2"], ag = ["x", "y"], sg = ["x1", "y1", "x2", "y2"], ng = ["x", "y"], og = ["x1", "y1", "x2", "y2"], ig = ["x", "y"], rg = ["x1", "y1", "x2", "y2"], lg = ["x", "y"], cg = ["x1", "y1", "x2", "y2"], dg = ["x", "y"], ug = ["x1", "y1", "x2", "y2"], hg = ["x", "y"], fg = ["transform"], gg = { transform: "translate(-220, 0)" }, pg = ["fill"], vg = { transform: "translate(-140, 0)" }, bg = ["fill"], mg = { transform: "translate(-80, 0)" }, yg = ["fill"], _g = { transform: "translate(-20, 0)" }, xg = ["fill"], kg = { transform: "translate(60, 0)" }, wg = ["fill"], $g = { transform: "translate(130, 0)" }, Mg = ["fill"], Cg = { transform: "translate(180, 0)" }, Sg = ["fill"], Dg = /* @__PURE__ */ J({
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
      const j = Math.max(...a.histogram.map((N) => N.count || 0), 1), H = Math.max(1, Math.ceil(j * 0.2));
      return j + H;
    }), u = C(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const j = a.averageScore || 0;
      let H = 0, N = 0;
      if (a.histogram.forEach((G) => {
        const Y = G.count || 0;
        H += Y;
        const ot = G.score - j;
        N += Y * (ot * ot);
      }), H === 0) return 1;
      const et = N / H;
      return Math.sqrt(et) || 1;
    }), h = (j, H, N) => {
      if (N === 0) return 0;
      const et = 1 / (N * Math.sqrt(2 * Math.PI)), G = -0.5 * Math.pow((j - H) / N, 2);
      return et * Math.exp(G);
    }, g = C(() => {
      if (!a.histogram || a.histogram.length === 0 || a.averageScore === 0 && u.value === 0) return null;
      const j = a.averageScore, H = u.value, N = 100, G = Math.max(...a.histogram.map((ft) => ft.count || 0), 1) / d.value * r.value;
      if (G <= 0) return null;
      let Y = 0;
      for (let ft = 0; ft <= N; ft++) {
        const Pt = 1 + 9 * (ft / N), Vt = h(Pt, j, H);
        Vt > Y && (Y = Vt);
      }
      if (Y <= 0) return null;
      const ot = G / Y, wt = [];
      for (let ft = 0; ft <= N; ft++) {
        const Pt = 1 + 9 * (ft / N), Vt = h(Pt, j, H) * ot, Kt = f(Pt);
        if (Kt !== null) {
          const rt = a.chartHeight - a.chartBottomMargin - Vt;
          wt.push(`${ft === 0 ? "M" : "L"} ${Kt} ${rt}`);
        }
      }
      return wt.join(" ");
    }), v = C(() => {
      if (!a.histogram || a.histogram.length === 0) return [];
      const j = i.value / 10;
      return a.histogram.map((H, N) => {
        const et = a.chartMargin + (N + 0.5) * j, G = H.count > 0 ? H.count / d.value * r.value : 0, Y = a.chartHeight - a.chartBottomMargin - G;
        return {
          score: H.score,
          count: H.count,
          x: et,
          y: Y,
          height: G
        };
      });
    }), f = (j) => {
      if (j < 1 || j > 10) return null;
      const H = i.value / 10;
      return a.chartMargin + (j - 0.5) * H;
    }, x = C(() => f(a.minScore)), b = C(() => f(a.maxScore)), p = C(() => f(a.q1Score)), m = C(() => f(a.medianScore)), w = C(() => f(a.q3Score)), k = C(() => f(a.averageScore)), M = C(() => a.minScore), S = C(() => a.maxScore), D = C(() => a.q1Score), A = C(() => a.medianScore), T = C(() => a.q3Score), L = C(() => a.averageScore), I = C(() => {
      const j = [], H = a.chartMargin - 8, N = 18;
      p.value !== null && j.push({
        x: p.value,
        y: H,
        value: a.q1Score,
        label: `Q1: ${D.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), m.value !== null && j.push({
        x: m.value,
        y: H - N,
        value: a.medianScore,
        label: `Median: ${A.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), k.value !== null && j.push({
        x: k.value,
        y: H - N,
        value: a.averageScore,
        label: `Avg: ${L.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), w.value !== null && j.push({
        x: w.value,
        y: H,
        value: a.q3Score,
        label: `Q3: ${T.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), j.sort((Y, ot) => (Y.x || 0) - (ot.x || 0));
      const et = [[], [], []];
      j.forEach((Y) => {
        if (Y.x === null) return;
        let ot = -1;
        for (let wt = 0; wt < et.length; wt++) {
          let ft = !1;
          for (const Pt of et[wt]) {
            if (Pt.x === null) continue;
            const Vt = Math.abs(Y.x - Pt.x), Kt = (Y.width + Pt.width) / 2 + 10;
            if (Vt < Kt) {
              ft = !0;
              break;
            }
          }
          if (!ft) {
            ot = wt;
            break;
          }
        }
        ot === -1 && (ot = et.length - 1), Y.y = H - ot * N, et[ot].push(Y);
      });
      const G = 15;
      return j.forEach((Y) => {
        Y.y < G && (Y.y = G);
      }), j;
    }), O = (j) => I.value.find((N) => N.id === j)?.y || a.chartMargin - 10, X = C(() => {
      const j = [];
      for (let N = 0; N <= 5; N++) {
        const et = Math.round(d.value / 5 * N), G = a.chartHeight - a.chartBottomMargin - N / 5 * r.value;
        j.push({ value: et, y: G });
      }
      return j;
    }), P = (j, H) => {
      const N = j.currentTarget.closest("svg");
      if (!N) return;
      const et = N.getBoundingClientRect(), G = N.createSVGPoint();
      G.x = j.clientX - et.left, G.y = j.clientY - et.top;
      const Y = `Score: ${H.score}`, ot = `Count: ${H.count}`, wt = 120, ft = 48;
      o.value = {
        visible: !0,
        x: G.x,
        y: G.y - 20,
        title: Y,
        text: ot,
        width: wt,
        height: ft
      };
    }, E = (j) => {
      if (o.value.visible) {
        const H = j.currentTarget, N = H.getBoundingClientRect(), et = H.createSVGPoint();
        et.x = j.clientX - N.left, et.y = j.clientY - N.top, o.value.x = et.x, o.value.y = et.y - 20;
      }
    }, V = () => {
      o.value.visible = !1;
    }, W = () => {
      o.value.visible = !1;
    };
    return t({ isDark: s }), (j, H) => (y(), _("div", Rf, [
      (y(), _("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: xt(`min-height: ${e.chartHeight}px;`),
        onMousemove: E,
        onMouseleave: V
      }, [
        o.value.visible ? (y(), _("g", {
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
        ], 8, Of)) : R("", !0),
        (y(!0), _(q, null, tt(X.value, (N, et) => (y(), _("line", {
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
        (y(!0), _(q, null, tt(X.value, (N, et) => (y(), _(q, {
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
        (y(!0), _(q, null, tt(v.value, (N, et) => (y(), _(q, {
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
        g.value ? (y(), _("path", {
          key: 1,
          d: g.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, Jf)) : R("", !0),
        (y(!0), _(q, null, tt(v.value, (N, et) => (y(), _("rect", {
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
          onMouseleave: W,
          style: { cursor: "pointer" }
        }, null, 40, tg))), 128)),
        x.value ? (y(), _("line", {
          key: 2,
          x1: x.value,
          y1: e.chartMargin,
          x2: x.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, eg)) : R("", !0),
        x.value ? (y(), _("text", {
          key: 3,
          x: x.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + $(M.value.toFixed(1)), 9, ag)) : R("", !0),
        p.value ? (y(), _("line", {
          key: 4,
          x1: p.value,
          y1: e.chartMargin,
          x2: p.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, sg)) : R("", !0),
        p.value ? (y(), _("text", {
          key: 5,
          x: p.value,
          y: O("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + $(D.value.toFixed(1)), 9, ng)) : R("", !0),
        m.value ? (y(), _("line", {
          key: 6,
          x1: m.value,
          y1: e.chartMargin,
          x2: m.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, og)) : R("", !0),
        m.value ? (y(), _("text", {
          key: 7,
          x: m.value,
          y: O("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + $(A.value.toFixed(1)), 9, ig)) : R("", !0),
        k.value ? (y(), _("line", {
          key: 8,
          x1: k.value,
          y1: e.chartMargin,
          x2: k.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, rg)) : R("", !0),
        k.value ? (y(), _("text", {
          key: 9,
          x: k.value,
          y: O("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + $(L.value.toFixed(1)), 9, lg)) : R("", !0),
        w.value ? (y(), _("line", {
          key: 10,
          x1: w.value,
          y1: e.chartMargin,
          x2: w.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, cg)) : R("", !0),
        w.value ? (y(), _("text", {
          key: 11,
          x: w.value,
          y: O("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + $(T.value.toFixed(1)), 9, dg)) : R("", !0),
        b.value ? (y(), _("line", {
          key: 12,
          x1: b.value,
          y1: e.chartMargin,
          x2: b.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, ug)) : R("", !0),
        b.value ? (y(), _("text", {
          key: 13,
          x: b.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + $(S.value.toFixed(1)), 9, hg)) : R("", !0),
        e.showLegend ? (y(), _("g", {
          key: 14,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          l("g", gg, [
            H[0] || (H[0] = l("line", {
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
            H[1] || (H[1] = l("line", {
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
            H[2] || (H[2] = l("line", {
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
            H[3] || (H[3] = l("line", {
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
            H[4] || (H[4] = l("line", {
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
            H[5] || (H[5] = l("line", {
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
            H[6] || (H[6] = l("line", {
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
        ], 8, fg)) : R("", !0)
      ], 44, If))
    ]));
  }
}), Ii = /* @__PURE__ */ nt(Dg, [["__scopeId", "data-v-64e657d9"]]), Ag = { class: "chart-container" }, Tg = {
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
    en.use([Xi, Gi, Zi, Qi]);
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
      ), k = Math.max(...w.map((D) => D.value), 1), M = Math.max(1, k * 0.01), S = w.map((D) => ({
        ...D,
        originalValue: D.value,
        value: D.value < k * 0.01 ? M : D.value
      }));
      return {
        nodes: a.data.nodes.filter((D) => D.name),
        links: S
      };
    }, g = (w) => w.map((k, M) => ({
      ...k,
      itemStyle: {
        color: a.nodeColors[k.name] || u[M % u.length],
        borderRadius: 8
      }
    })), v = (w) => (k) => {
      const M = k.dataType === "node", S = n.value.tooltipText, D = s.value ? "#d1d5db" : "#e2e8f0";
      if (M) {
        const O = w.filter((E) => E.target === k.name), X = w.filter((E) => E.source === k.name), P = O.length > 0 ? O.reduce((E, V) => E + (V.originalValue || V.value), 0) : X.reduce((E, V) => E + (V.originalValue || V.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${S};">${k.name}</div><div style="color: ${D}; font-size: 12px;">Count: ${P.toLocaleString()}</div>`;
      }
      const A = k.data?.source || k.source || "Unknown", T = k.data?.target || k.target || "Unknown", L = k.data?.originalValue || k.data?.value || k.value || 0, I = k.data?.label || `${L.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${S};">${A} → ${T}</div><div style="color: ${D}; font-size: 12px;">Flow: ${I}</div>`;
    }, f = () => {
      if (!(!c || !a.data.nodes?.length || !a.data.links?.length))
        try {
          const { nodes: w, links: k } = h(), M = g(w), S = {
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
          c.setOption(S);
        } catch (w) {
          console.error("Error setting Sankey chart options:", w), r.value = !0;
        }
    }, x = async () => {
      if (o.value)
        try {
          c = en.init(o.value), f(), window.addEventListener("resize", p);
        } catch (w) {
          console.error("Error initializing Sankey chart:", w), r.value = !0;
        } finally {
          i.value = !1;
        }
    }, b = async (w = 40) => {
      await Ct();
      for (let k = 0; k < w; k++) {
        if (o.value?.clientWidth && o.value.clientWidth > 0 && o.value?.clientHeight && o.value.clientHeight > 0)
          return await x();
        await new Promise((M) => setTimeout(M, 50));
      }
      await x(), setTimeout(p, 50);
    }, p = () => c?.resize(), m = () => {
      window.removeEventListener("resize", p), c && (c.dispose(), c = null);
    };
    return re(() => o.value && b()), Eo(m), Et(() => a.data, f, { deep: !0 }), Et(s, f), t({ isDark: s }), (w, k) => (y(), _("div", Ag, [
      r.value ? (y(), _("div", {
        key: 0,
        class: "error-state",
        style: xt({ height: e.height })
      }, [...k[0] || (k[0] = [
        st('<div class="error-content" data-v-d6d61034><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d6d61034><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-d6d61034></path></svg><p class="error-title" data-v-d6d61034>Chart could not be loaded</p><p class="error-description" data-v-d6d61034>Please check the data format.</p></div>', 1)
      ])], 4)) : (y(), _("div", Tg, [
        Ut(l("div", {
          ref_key: "chartEl",
          ref: o,
          class: "chart-content",
          style: xt({ height: e.height })
        }, null, 4), [
          [la, !i.value]
        ]),
        Ut(l("div", {
          class: "loading-state",
          style: xt({ height: e.height })
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
  return y(), _("svg", {
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
  return y(), _("svg", {
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
  return y(), _("svg", {
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
function Oi(e, t) {
  return y(), _("svg", {
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
function Ot(e, t) {
  return y(), _("svg", {
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
function Eg(e, t) {
  return y(), _("svg", {
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
function Vi(e, t) {
  return y(), _("svg", {
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
  return y(), _("svg", {
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
function Ig(e, t) {
  return y(), _("svg", {
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
  return y(), _("svg", {
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
function Mo(e, t) {
  return y(), _("svg", {
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
  return y(), _("svg", {
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
  return y(), _("svg", {
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
  return y(), _("svg", {
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
  return y(), _("svg", {
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
function zi(e, t) {
  return y(), _("svg", {
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
    return (i, r) => (y(), _("footer", Hg, [
      r[9] || (r[9] = l("div", { class: "footer-divider" }, null, -1)),
      l("div", jg, [
        r[8] || (r[8] = l("span", { class: "export-label" }, "Export", -1)),
        l("div", Yg, [
          n("pdf") ? (y(), _("button", {
            key: 0,
            type: "button",
            class: K(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download PDF",
            onClick: r[0] || (r[0] = (c) => o("pdf"))
          }, [
            e.loading ? (y(), _("svg", Ug, [...r[2] || (r[2] = [
              l("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              l("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (y(), _("svg", qg, [...r[3] || (r[3] = [
              st('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-672661d4></path><polyline points="14 2 14 8 20 8" data-v-672661d4></polyline><line x1="16" y1="13" x2="8" y2="13" data-v-672661d4></line><line x1="16" y1="17" x2="8" y2="17" data-v-672661d4></line><polyline points="10 9 9 9 8 9" data-v-672661d4></polyline>', 5)
            ])])),
            r[4] || (r[4] = l("span", null, "PDF", -1))
          ], 10, Kg)) : R("", !0),
          n("csv") ? (y(), _("button", {
            key: 1,
            type: "button",
            class: K(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download CSV",
            onClick: r[1] || (r[1] = (c) => o("csv"))
          }, [
            e.loading ? (y(), _("svg", Gg, [...r[5] || (r[5] = [
              l("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              l("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (y(), _("svg", Zg, [...r[6] || (r[6] = [
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
          ], 10, Xg)) : R("", !0)
        ])
      ])
    ]));
  }
}), _t = /* @__PURE__ */ nt(Qg, [["__scopeId", "data-v-672661d4"]]), Jg = { class: "agents-per-day-card" }, tp = {
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
    }, n = e, o = a, i = (g) => {
      o("export", g);
    }, { isDark: r, colors: c } = ct(lt(n, "theme")), d = (g) => {
      const v = new Date(g), f = String(v.getDate()).padStart(2, "0"), x = String(v.getMonth() + 1).padStart(2, "0");
      return `${f}-${x}`;
    }, u = C(() => {
      const g = n.data?.agents_by_day || {}, v = Object.keys(g).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const f = v.map((w) => d(w)), x = /* @__PURE__ */ new Set();
      for (const w of Object.values(g))
        for (const k of Object.keys(w))
          x.add(k);
      const b = Array.from(x), p = (w) => w, m = b.map((w) => ({
        label: w,
        data: v.map((k) => g[k]?.[w] || 0),
        backgroundColor: `${s[w] || "#94a3b8"}80`,
        borderColor: p(s[w] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: f,
        datasets: m
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
    return t({ isDark: r }), (g, v) => (y(), _("article", Jg, [
      v[3] || (v[3] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Agents Total Messages per Day"),
          l("p", { class: "card-subtitle" }, "Daily agent interactions (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), _("div", op, [...v[2] || (v[2] = [
        st('<div class="loading-container" data-v-4d18c22c><div class="chart-lines-loader" data-v-4d18c22c><div class="line line-1" data-v-4d18c22c></div><div class="line line-2" data-v-4d18c22c></div><div class="line line-3" data-v-4d18c22c></div><div class="line line-4" data-v-4d18c22c></div><div class="line line-5" data-v-4d18c22c></div></div><p class="loading-text" data-v-4d18c22c>Loading chart data...</p></div>', 1)
      ])])) : (y(), _("div", tp, [
        u.value.labels && u.value.labels.length ? (y(), _("section", ep, [
          Q(ie, {
            data: u.value,
            options: h.value,
            stacked: !0
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ht(B(_t), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : R("", !0)
        ])) : (y(), _("section", ap, [
          l("div", sp, [
            l("div", np, [
              Q(B(Ot), { class: "empty-icon" })
            ]),
            v[0] || (v[0] = l("p", { class: "empty-title" }, "No agents data per day", -1)),
            v[1] || (v[1] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see daily agent interactions.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), rp = /* @__PURE__ */ nt(ip, [["__scopeId", "data-v-4d18c22c"]]), U = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), vt = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
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
}, kp = { class: "table-wrapper" }, wp = { class: "data-table" }, $p = { class: "table-body" }, Mp = { class: "table-cell font-medium" }, Cp = { class: "table-cell text-center" }, Sp = { class: "table-cell text-center" }, Dp = { class: "percentage-text" }, Ap = { class: "table-cell text-center" }, Tp = { class: "table-cell" }, Bp = { class: "badges-container" }, Lp = { class: "badge badge-success" }, Fp = { class: "badge badge-error" }, Pp = { class: "table-cell" }, Ep = {
  key: 0,
  class: "badges-container"
}, Rp = {
  key: 1,
  class: "percentage-text"
}, Ip = { class: "table-cell" }, Op = { class: "badges-container" }, Vp = { class: "badge badge-error" }, zp = { class: "badge badge-warning" }, Np = { class: "badge badge-yellow" }, Wp = { class: "badge badge-error" }, Hp = {
  key: 1,
  class: "empty-state"
}, fs = 3, jp = /* @__PURE__ */ J({
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
    }, o = at(!1), i = C(() => a.data?.booking_manager_by_day ? [...a.data.booking_manager_by_day].sort(
      (b, p) => new Date(b.date).getTime() - new Date(p.date).getTime()
    ) : []), r = C(() => o.value ? i.value : i.value.slice(0, fs)), c = C(() => i.value.length > fs), d = C(() => a.data?.total_payment_success_value || []), u = (b) => b.payment_success_value || [], h = (b) => typeof b.payment_success_count == "number" ? b.payment_success_count : (b.payment_success_value || []).reduce((p, m) => p + (m.count || 0), 0), g = (b) => vt(b), v = C(() => {
      const b = a.data, p = b.total_booking_initiated || 0, m = b.total_booking_started || 0, w = b.total_payment_initiated || 0, k = b.total_not_found || 0, M = b.total_cancelled || 0, S = b.total_no_pending_balance || 0, D = b.total_errors || 0, A = typeof b.total_payment_success == "number" ? b.total_payment_success : (b.total_payment_success_value || []).reduce((E, V) => E + (V.count || 0), 0), T = b.total_payment_failed || 0, L = Math.max(0, p - m), I = Math.max(0, m - w - k - M - S - D), O = (E, V) => {
        const W = V > 0 ? Math.round(E / V * 100) : 0;
        return `${E.toLocaleString()} (${W}%)`;
      }, X = [
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
      return m > 0 && P.push({
        source: "Initiated",
        target: "Started",
        value: m,
        label: O(m, p)
      }), L > 0 && P.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: L,
        label: O(L, p)
      }), w > 0 && P.push({
        source: "Started",
        target: "Payment Initiated",
        value: w,
        label: O(w, m)
      }), k > 0 && P.push({
        source: "Started",
        target: "Not Found",
        value: k,
        label: O(k, m)
      }), M > 0 && P.push({
        source: "Started",
        target: "Cancelled",
        value: M,
        label: O(M, m)
      }), S > 0 && P.push({
        source: "Started",
        target: "No Pending Balance",
        value: S,
        label: O(S, m)
      }), D > 0 && P.push({
        source: "Started",
        target: "Errors",
        value: D,
        label: O(D, m)
      }), I > 0 && P.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: I,
        label: O(I, m)
      }), A > 0 && P.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: A,
        label: O(A, w)
      }), T > 0 && P.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: T,
        label: O(T, w)
      }), { nodes: X, links: P };
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
    }, x = (b, p) => !p || p === 0 ? "0%" : `${Math.round(b / p * 100)}%`;
    return (b, p) => (y(), _("article", lp, [
      l("header", cp, [
        l("div", dp, [
          p[2] || (p[2] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "Booking Manager Metrics"),
            l("p", { class: "card-subtitle" }, "Booking manager workflow tracking and analysis")
          ], -1)),
          a.loading ? R("", !0) : (y(), _("div", up, [
            p[1] || (p[1] = l("p", { class: "badge-label" }, "Payment Success Value", -1)),
            d.value.length > 0 ? (y(), _("div", hp, [
              (y(!0), _(q, null, tt(d.value, (m) => (y(), _("p", {
                key: m.currency,
                class: "currency-breakdown-item"
              }, $(m.currency) + " " + $(g(m.total_value)), 1))), 128))
            ])) : (y(), _("p", fp, $(g(0)), 1))
          ]))
        ])
      ]),
      a.loading ? (y(), _("div", gp, [...p[3] || (p[3] = [
        st('<div class="loading-container" data-v-15d5c773><div class="chart-flow-loader" data-v-15d5c773><div class="flow-line flow-1" data-v-15d5c773></div><div class="flow-line flow-2" data-v-15d5c773></div><div class="flow-line flow-3" data-v-15d5c773></div><div class="flow-line flow-4" data-v-15d5c773></div><div class="flow-line flow-5" data-v-15d5c773></div></div><p class="loading-text" data-v-15d5c773>Loading booking data...</p></div>', 1)
      ])])) : a.error ? (y(), _("div", pp, [
        l("div", vp, [
          p[4] || (p[4] = l("div", { class: "error-icon-wrapper" }, [
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
          p[5] || (p[5] = l("p", { class: "error-title" }, "Error loading data", -1)),
          l("p", bp, $(a.error), 1)
        ])
      ])) : (y(), _("div", mp, [
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
        i.value.length > 0 ? (y(), _("section", xp, [
          p[8] || (p[8] = l("div", { class: "section-header" }, [
            l("h4", { class: "section-title" }, "Daily Overview")
          ], -1)),
          l("div", kp, [
            l("table", wp, [
              p[6] || (p[6] = l("thead", null, [
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
                (y(!0), _(q, null, tt(r.value, (m) => (y(), _("tr", {
                  key: m.date,
                  class: "table-row"
                }, [
                  l("td", Mp, $(B(At)(m.date).format("DD/MM/YYYY")), 1),
                  l("td", Cp, $(B(U)(m.booking_initiated_count)), 1),
                  l("td", Sp, [
                    kt($(B(U)(m.booking_started_count)) + " ", 1),
                    l("span", Dp, " (" + $(x(m.booking_started_count, m.booking_initiated_count)) + ") ", 1)
                  ]),
                  l("td", Ap, $(B(U)(m.payment_initiated_count)), 1),
                  l("td", Tp, [
                    l("div", Bp, [
                      l("span", Lp, " Success: " + $(B(U)(h(m))), 1),
                      l("span", Fp, " Failed: " + $(B(U)(m.payment_failed_count || 0)), 1)
                    ])
                  ]),
                  l("td", Pp, [
                    u(m).length > 0 ? (y(), _("div", Ep, [
                      (y(!0), _(q, null, tt(u(m), (w) => (y(), _("span", {
                        key: `${m.date}-${w.currency}`,
                        class: "badge badge-currency"
                      }, $(w.currency) + " " + $(g(w.total_value)), 1))), 128))
                    ])) : (y(), _("span", Rp, "N/A"))
                  ]),
                  l("td", Ip, [
                    l("div", Op, [
                      l("span", Vp, " Not Found: " + $(m.not_found_count ? B(U)(m.not_found_count) : "N/A"), 1),
                      l("span", zp, " Cancelled: " + $(m.cancelled_count ? B(U)(m.cancelled_count) : "N/A"), 1),
                      l("span", Np, " No Balance: " + $(m.no_pending_balance_count ? B(U)(m.no_pending_balance_count) : "N/A"), 1),
                      l("span", Wp, " Errors: " + $(m.error_count ? B(U)(m.error_count) : "N/A"), 1)
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          c.value ? (y(), _("button", {
            key: 0,
            class: "view-more-btn",
            onClick: p[0] || (p[0] = (m) => o.value = !o.value)
          }, [
            kt($(o.value ? "View less" : `View more (${i.value.length - fs} more rows)`) + " ", 1),
            (y(), _("svg", {
              class: K(["view-more-icon", { "view-more-icon-rotated": o.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...p[7] || (p[7] = [
              l("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : R("", !0),
          e.enableExport ? (y(), ht(B(_t), {
            key: 1,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : R("", !0)
        ])) : (y(), _("section", Hp, [...p[9] || (p[9] = [
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
    }, r = at([]), c = C(() => {
      const b = n.data;
      return b && (Array.isArray(b.checkin_by_day) && b.checkin_by_day.length > 0 || (b.total_checkin_initiated ?? 0) > 0) ? { ...o, ...b } : n.checkinData ?? o;
    }), d = C(() => {
      const b = n.data;
      return b && (Array.isArray(b.failed_by_step_by_day) && b.failed_by_step_by_day.length > 0 || Array.isArray(b.unrecovered_by_step) && b.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: b.total_checkin_failed ?? 0,
        total_checkin_unrecovered: b.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: b.failed_by_step_by_day ?? [],
        unrecovered_by_step: b.unrecovered_by_step ?? [],
        unrecovered_by_day: b.unrecovered_by_day ?? []
      } : n.failedData ?? i;
    }), u = C(() => {
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
      return (d.value.unrecovered_by_step || []).forEach((m) => {
        const k = m.step_name.replace(/_/g, " ").split(" ").map((S) => S.charAt(0).toUpperCase() + S.slice(1)).join(" "), M = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        b[k] = M[k] || "#DC2626";
      }), b;
    }), h = (b, p) => !p || p === 0 ? "0%" : `${Math.round(b / p * 100)}%`, g = (b, p) => {
      const m = U(b), w = h(b, p);
      return `${m} (${w})`;
    }, v = (b) => b.reduce((p, m) => p + m.failed_count, 0), f = C(() => {
      const b = [], p = [];
      if (!c.value.total_checkin_initiated)
        return { nodes: b, links: p };
      b.push({ name: "Checkin Init" }), b.push({ name: "Booking retrive" }), b.push({ name: "Booking retrive success" }), b.push({ name: "Number of Passengers" }), b.push({ name: "Completed" }), b.push({ name: "Closed with BP" });
      const m = c.value.total_checkin_initiated, w = c.value.total_checkin_init, k = c.value.total_checkin_init_abandoned, M = w - k, S = c.value.total_checkin_started, D = c.value.total_checkin_completed, A = c.value.total_checkin_closed, T = d.value.unrecovered_by_step || [], L = T.reduce((P, E) => P + E.count, 0);
      if (w > 0) {
        const P = Math.round(w / m * 100);
        p.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: w,
          label: `${w.toLocaleString()} (${P}%)`
        });
      }
      const I = m - w;
      if (I > 0) {
        const P = Math.round(I / m * 100);
        b.push({ name: "Abandoned (Init)" }), p.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: I,
          label: `${I.toLocaleString()} (${P}%)`
        });
      }
      if (k > 0) {
        const P = Math.round(k / m * 100);
        b.push({ name: "Abandoned (Started)" }), p.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: k,
          label: `${k.toLocaleString()} (${P}%)`
        });
      }
      if (M > 0) {
        const P = Math.round(M / m * 100);
        p.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: M,
          label: `${M.toLocaleString()} (${P}%)`
        });
      }
      if (S > 0) {
        const P = Math.round(S / m * 100);
        p.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: S,
          label: `${S.toLocaleString()} (${P}%)`
        });
      }
      if (D > 0) {
        const P = Math.round(D / S * 100);
        p.push({
          source: "Number of Passengers",
          target: "Completed",
          value: D,
          label: `${D.toLocaleString()} (${P}%)`
        });
      }
      if (T.length > 0 && L > 0) {
        b.push({ name: "Unrecovered" });
        const P = Math.round(L / S * 100);
        p.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: L,
          label: `${L.toLocaleString()} (${P}%)`
        }), T.forEach((E) => {
          const W = E.step_name.replace(/_/g, " ").split(" ").map((H) => H.charAt(0).toUpperCase() + H.slice(1)).join(" "), j = Math.round(E.count / S * 100);
          b.push({ name: W }), p.push({
            source: "Unrecovered",
            target: W,
            value: E.count,
            label: `${E.count.toLocaleString()} (${j}%)`
          });
        });
      }
      const O = S - (D + L);
      if (O > 0) {
        const P = Math.round(O / S * 100);
        b.push({ name: "Abandoned (Flow)" }), p.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: O,
          label: `${O.toLocaleString()} (${P}%)`
        });
      }
      const X = D - A;
      if (X > 0) {
        const P = Math.round(X / S * 100);
        b.push({ name: "BP Error" }), p.push({
          source: "Completed",
          target: "BP Error",
          value: X,
          label: `${X.toLocaleString()} (${P}%)`
        });
      }
      if (A > 0) {
        const P = Math.round(A / S * 100);
        p.push({
          source: "Completed",
          target: "Closed with BP",
          value: A,
          label: `${A.toLocaleString()} (${P}%)`
        });
      }
      return { nodes: b, links: p };
    }), x = () => {
      const b = c.value.checkin_by_day || [], p = d.value.failed_by_step_by_day || [];
      if (b.length === 0) {
        r.value = [];
        return;
      }
      r.value = [...b].map((m) => {
        const w = p.find(
          (k) => k.date === m.date
        );
        return {
          ...m,
          failed_steps: w?.steps || []
        };
      }), r.value.sort((m, w) => new Date(m.date) - new Date(w.date));
    };
    return Et(
      [() => n.data, () => n.checkinData, () => n.failedData],
      () => {
        x();
      },
      { deep: !0, immediate: !0 }
    ), (b, p) => (y(), _("article", Kp, [
      p[3] || (p[3] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Check-in Metrics"),
          l("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      n.loading ? (y(), _("div", Up, [...p[0] || (p[0] = [
        st('<div class="loading-container" data-v-d527da09><div class="chart-flow-loader" data-v-d527da09><div class="flow-line flow-1" data-v-d527da09></div><div class="flow-line flow-2" data-v-d527da09></div><div class="flow-line flow-3" data-v-d527da09></div><div class="flow-line flow-4" data-v-d527da09></div><div class="flow-line flow-5" data-v-d527da09></div></div><p class="loading-text" data-v-d527da09>Loading check-in data...</p></div>', 1)
      ])])) : (y(), _("div", qp, [
        f.value.nodes.length > 0 ? (y(), _("section", Xp, [
          l("div", Gp, [
            Q(_e, {
              data: f.value,
              height: "500px",
              "node-colors": u.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : R("", !0),
        r.value && r.value.length > 0 ? (y(), _("section", Zp, [
          l("div", Qp, [
            l("table", Jp, [
              p[1] || (p[1] = l("thead", null, [
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
                (y(!0), _(q, null, tt(r.value, (m) => (y(), _("tr", {
                  key: m.date,
                  class: "table-row"
                }, [
                  l("td", e0, $(B(At)(m.date).format("DD/MM/YYYY")), 1),
                  l("td", a0, $(B(U)(m.checkin_initiated_count)), 1),
                  l("td", s0, $(g(m.checkin_init_count, m.checkin_initiated_count)), 1),
                  l("td", n0, $(B(U)(m.checkin_started_count)), 1),
                  l("td", o0, $(g(m.checkin_completed_count, m.checkin_started_count)), 1),
                  l("td", i0, $(g(m.checkin_closed_count, m.checkin_started_count)), 1),
                  l("td", r0, $(g(v(m.failed_steps), m.checkin_started_count)), 1),
                  l("td", l0, [
                    m.failed_steps && m.failed_steps.length > 0 ? (y(), _("div", c0, [
                      (y(!0), _(q, null, tt(m.failed_steps, (w) => (y(), _("div", {
                        key: w.step_name,
                        class: "failed-step-item"
                      }, [
                        l("span", d0, $(w.step_name.replace(/_/g, " ")) + ":", 1),
                        l("span", u0, $(w.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), _("div", h0, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), ht(B(_t), {
            key: 0,
            onExport: s,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : R("", !0)
        ])) : (y(), _("section", f0, [...p[2] || (p[2] = [
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
}, F0 = { class: "reason-name" }, P0 = { class: "reason-count" }, E0 = {
  key: 1,
  class: "no-reasons"
}, R0 = {
  key: 2,
  class: "empty-state"
}, I0 = { class: "empty-state-content" }, O0 = { class: "empty-icon-wrapper" }, gs = 3, V0 = /* @__PURE__ */ J({
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
      const k = new Date(w), M = String(k.getDate()).padStart(2, "0"), S = String(k.getMonth() + 1).padStart(2, "0"), D = k.getFullYear();
      return `${M}/${S}/${D}`;
    }, d = (w) => w.replace(/_/g, " ").replace(/\b\w/g, (k) => k.toUpperCase()), u = (w, k) => !k || k === 0 ? "0%" : `${Math.round(w / k * 100)}%`, h = (w, k) => {
      const M = w || 0, S = k || 0, D = r(M), A = u(M, S);
      return `${D} (${A})`;
    }, g = (w) => w ? w.reduce((k, M) => k + M.failed_count, 0) : 0, v = C(() => {
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
        const D = M.step_name.replace(/_/g, " ").split(" ").map((T) => T.charAt(0).toUpperCase() + T.slice(1)).join(" "), A = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        w[D] = A[D] || "#DC2626";
      }), w;
    }), f = at(!1), x = C(() => {
      const w = s.checkinData?.checkin_by_day || [], k = s.failedData?.failed_by_step_by_day || [];
      return w.map((S) => {
        const D = k.find((A) => A.date === S.date);
        return {
          ...S,
          failed_steps: D?.steps || []
        };
      }).sort((S, D) => new Date(S.date).getTime() - new Date(D.date).getTime());
    }), b = C(() => f.value ? x.value : x.value.slice(0, gs)), p = C(() => x.value.length > gs), m = C(() => {
      const w = [], k = [], M = /* @__PURE__ */ new Set(), S = (rt) => {
        M.has(rt) || (w.push({ name: rt }), M.add(rt));
      };
      if (!s.checkinData?.total_checkin_initiated)
        return { nodes: w, links: k };
      S("Checkin Init"), S("Booking retrive"), S("Booking retrive success"), S("Number of Passengers"), S("Completed"), S("Closed with BP");
      const D = s.checkinData.total_checkin_initiated || 0, A = s.checkinData.total_checkin_init || 0, T = s.checkinData.total_checkin_init_abandoned || 0, L = s.checkinData.total_checkin_pre_init_abandoned_error, I = s.checkinData.total_checkin_pre_init_abandoned_voluntary, O = L != null || I != null, X = O ? Math.max(Number(L) || 0, 0) : 0, P = O ? Math.max(Number(I) || 0, 0) : 0, E = s.checkinData.total_checkin_init_abandoned_error, V = s.checkinData.total_checkin_init_abandoned_voluntary, W = E != null || V != null, j = W ? Math.max(Number(E) || 0, 0) : 0, H = W ? Math.max(Number(V) || 0, 0) : 0, N = W ? Math.max(T - j - H, 0) : T, et = A - T, G = s.checkinData.total_checkin_started || 0, Y = s.checkinData.total_checkin_completed || 0, ot = s.checkinData.total_checkin_closed || 0, wt = s.failedData?.unrecovered_by_step || [], ft = wt.reduce((rt, de) => rt + de.count, 0);
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
          S("Abandoned (Init)"), k.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: P,
            label: `${P.toLocaleString()} (${rt}%)`
          });
        }
        if (X > 0) {
          const rt = Math.round(X / D * 100);
          S("Booking not retreived"), k.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: X,
            label: `${X.toLocaleString()} (${rt}%)`
          });
        }
      } else if (Pt > 0) {
        const rt = Math.round(Pt / D * 100);
        S("Abandoned (Init)"), k.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: Pt,
          label: `${Pt.toLocaleString()} (${rt}%)`
        });
      }
      if (W) {
        if (j > 0) {
          const rt = Math.round(j / D * 100);
          S("Error"), k.push({
            source: "Booking retrive",
            target: "Error",
            value: j,
            label: `${j.toLocaleString()} (${rt}%)`
          });
        }
        if (H > 0) {
          const rt = Math.round(H / D * 100);
          S("Abandoned (Started)"), k.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: H,
            label: `${H.toLocaleString()} (${rt}%)`
          });
        }
        if (N > 0) {
          const rt = Math.round(N / D * 100);
          S("Abandoned (Started)"), k.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: N,
            label: `${N.toLocaleString()} (${rt}%)`
          });
        }
      } else if (T > 0) {
        const rt = Math.round(T / D * 100);
        S("Abandoned (Started)"), k.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: T,
          label: `${T.toLocaleString()} (${rt}%)`
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
      if (Y > 0) {
        const rt = Math.round(Y / G * 100);
        k.push({
          source: "Number of Passengers",
          target: "Completed",
          value: Y,
          label: `${Y.toLocaleString()} (${rt}%)`
        });
      }
      if (wt.length > 0 && ft > 0) {
        S("Unrecovered");
        const rt = Math.round(ft / G * 100);
        k.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: ft,
          label: `${ft.toLocaleString()} (${rt}%)`
        }), wt.forEach((de) => {
          const Ye = de.step_name.replace(/_/g, " ").split(" ").map((Ke) => Ke.charAt(0).toUpperCase() + Ke.slice(1)).join(" "), ma = Math.round(de.count / G * 100);
          S(Ye), k.push({
            source: "Unrecovered",
            target: Ye,
            value: de.count,
            label: `${de.count.toLocaleString()} (${ma}%)`
          });
        });
      }
      const Vt = G - (Y + ft);
      if (Vt > 0) {
        const rt = Math.round(Vt / G * 100);
        S("Abandoned (Flow)"), k.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: Vt,
          label: `${Vt.toLocaleString()} (${rt}%)`
        });
      }
      const Kt = Y - ot;
      if (Kt > 0) {
        const rt = Math.round(Kt / G * 100);
        S("BP Error"), k.push({
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
    return t({ isDark: i }), (w, k) => (y(), _("article", v0, [
      k[6] || (k[6] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Check-in Metrics"),
          l("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      e.loading ? (y(), _("div", b0, [...k[1] || (k[1] = [
        st('<div class="loading-container" data-v-eefc834b><div class="chart-bars-loader" data-v-eefc834b><div class="bar bar-1" data-v-eefc834b></div><div class="bar bar-2" data-v-eefc834b></div><div class="bar bar-3" data-v-eefc834b></div><div class="bar bar-4" data-v-eefc834b></div><div class="bar bar-5" data-v-eefc834b></div></div><p class="loading-text" data-v-eefc834b>Loading check-in data...</p></div>', 1)
      ])])) : (y(), _("div", m0, [
        m.value.nodes.length > 0 ? (y(), _("div", y0, [
          Q(_e, {
            data: m.value,
            height: "500px",
            "node-colors": v.value,
            "use-gradient": !1,
            "node-gap": 30
          }, null, 8, ["data", "node-colors"])
        ])) : R("", !0),
        x.value && x.value.length > 0 ? (y(), _("div", _0, [
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
                (y(!0), _(q, null, tt(b.value, (M) => (y(), _("tr", {
                  key: M.date,
                  class: "table-row"
                }, [
                  l("td", $0, $(c(M.date)), 1),
                  l("td", M0, $(r(M.checkin_initiated_count)), 1),
                  l("td", C0, $(h(M.checkin_init_count, M.checkin_initiated_count)), 1),
                  l("td", S0, $(r(M.checkin_started_count)), 1),
                  l("td", D0, $(h(M.checkin_completed_count, M.checkin_started_count)), 1),
                  l("td", A0, $(h(M.checkin_closed_count, M.checkin_started_count)), 1),
                  l("td", T0, $(h(g(M.failed_steps), M.checkin_started_count)), 1),
                  l("td", B0, [
                    M.failed_steps && M.failed_steps.length > 0 ? (y(), _("div", L0, [
                      (y(!0), _(q, null, tt(M.failed_steps, (S) => (y(), _("div", {
                        key: S.step_name,
                        class: "reason-item"
                      }, [
                        l("span", F0, $(d(S.step_name)) + ":", 1),
                        l("span", P0, $(S.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), _("div", E0, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          p.value ? (y(), _("button", {
            key: 0,
            class: "view-more-btn",
            onClick: k[0] || (k[0] = (M) => f.value = !f.value)
          }, [
            kt($(f.value ? "View less" : `View more (${x.value.length - gs} more rows)`) + " ", 1),
            (y(), _("svg", {
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
          ])) : R("", !0),
          e.enableExport ? (y(), ht(B(_t), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : R("", !0)
        ])) : (y(), _("div", R0, [
          l("div", I0, [
            l("div", O0, [
              Q(B(Ot), { class: "empty-icon" })
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
}, ps = 3, hv = /* @__PURE__ */ J({
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
    }, { isDark: i } = ct(lt(s, "theme")), r = at(!1), c = C(() => r.value ? s.data : s.data.slice(0, ps)), d = C(() => s.data.length > ps), u = (v, f) => !f || f === 0 || !v ? "0%" : `${Math.round(v / f * 100)}%`, h = (v) => !v || v === "None" ? "-" : String(v).trim().replace(/_[0-9]+$/i, ""), g = (v) => {
      const f = h(v?.departure_airport), x = h(v?.arrival_airport);
      return f === "-" || x === "-" ? !1 : f === x;
    };
    return t({ isDark: i }), (v, f) => (y(), _("article", N0, [
      f[7] || (f[7] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Checkin Segments"),
          l("p", { class: "card-subtitle" }, "Breakdown by flight segment with connection when applicable")
        ])
      ], -1)),
      s.loading ? (y(), _("div", W0, [...f[1] || (f[1] = [
        st('<div class="loading-container" data-v-a1ebd82a><div class="chart-flow-loader" data-v-a1ebd82a><div class="flow-line flow-1" data-v-a1ebd82a></div><div class="flow-line flow-2" data-v-a1ebd82a></div><div class="flow-line flow-3" data-v-a1ebd82a></div><div class="flow-line flow-4" data-v-a1ebd82a></div><div class="flow-line flow-5" data-v-a1ebd82a></div></div><p class="loading-text" data-v-a1ebd82a>Loading segment data...</p></div>', 1)
      ])])) : (y(), _("div", H0, [
        s.data.length > 0 ? (y(), _("section", j0, [
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
                (y(!0), _(q, null, tt(c.value, (x, b) => (y(), _("tr", {
                  key: b,
                  class: "table-row"
                }, [
                  l("td", q0, [
                    l("span", X0, $(h(x.departure_airport)), 1)
                  ]),
                  l("td", G0, [
                    h(x.conexion_airport) !== "-" ? (y(), _("span", Z0, $(h(x.conexion_airport)), 1)) : (y(), _("span", Q0, "-"))
                  ]),
                  l("td", J0, [
                    l("span", tv, $(h(x.arrival_airport)), 1)
                  ]),
                  l("td", ev, [
                    g(x) ? (y(), _("span", av, [...f[2] || (f[2] = [
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
                    ])])) : (y(), _("span", sv, [...f[3] || (f[3] = [
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
                  l("td", nv, $(B(U)(x.segment_init_count)), 1),
                  l("td", ov, [
                    l("span", iv, $(u(x.segment_started_count, x.segment_init_count)), 1)
                  ]),
                  l("td", rv, [
                    l("span", lv, $(u(x.segment_completed_count, x.segment_init_count)), 1)
                  ]),
                  l("td", cv, [
                    l("span", dv, $(u(x.segment_closed_count, x.segment_init_count)), 1)
                  ])
                ]))), 128))
              ])
            ])
          ]),
          d.value ? (y(), _("button", {
            key: 0,
            class: "view-more-btn",
            onClick: f[0] || (f[0] = (x) => r.value = !r.value)
          }, [
            kt($(r.value ? "View less" : `View more (${s.data.length - ps} more rows)`) + " ", 1),
            (y(), _("svg", {
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
          ])) : R("", !0),
          e.enableExport ? (y(), ht(B(_t), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : R("", !0)
        ])) : (y(), _("section", uv, [...f[6] || (f[6] = [
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
}, Cv = { class: "table-wrapper" }, Sv = { class: "data-table" }, Dv = { class: "table-body" }, Av = { class: "table-cell font-medium text-center" }, Tv = { class: "table-cell text-center" }, Bv = { class: "table-cell text-center" }, Lv = { class: "percentage-text" }, Fv = { class: "table-cell text-center" }, Pv = { class: "abandoned-value" }, Ev = { class: "table-cell" }, Rv = { class: "badges-container badges-wrap" }, Iv = { class: "badge badge-vol" }, Ov = { class: "badge badge-confirm" }, Vv = { class: "badge badge-not-confirm" }, zv = { class: "badge badge-reject" }, Nv = { class: "badge badge-not-paid" }, Wv = { class: "badge badge-success" }, Hv = { class: "table-cell" }, jv = { class: "badges-container badges-wrap" }, Yv = { class: "badge badge-inv" }, Kv = { class: "badge badge-human" }, Uv = { class: "badge badge-accept" }, qv = {
  key: 1,
  class: "empty-state"
}, vs = 3, Xv = /* @__PURE__ */ J({
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
    }, o = at(!1), i = C(() => a.data?.disruption_by_day ? [...a.data.disruption_by_day].sort(
      (b, p) => new Date(b.date).getTime() - new Date(p.date).getTime()
    ) : []), r = C(() => o.value ? i.value : i.value.slice(0, vs)), c = C(() => i.value.length > vs), d = C(() => a.data?.total_payment_success || []), u = (b, p) => !p || p === 0 ? "0%" : `${Math.round(b / p * 100)}%`, h = (b) => vt(b), g = (b) => (b ?? []).reduce((p, m) => p + (m.count ?? 0), 0), v = (b) => typeof b.sell_success_count == "number" ? b.sell_success_count : g(b.payment_success_total), f = C(() => {
      const b = a.data, p = b.total_disruption_conversations || 0, m = b.total_disruption_initiated || 0, w = b.total_voluntary || 0, k = b.total_involuntary || 0, M = b.total_accepted || 0, S = b.total_confirmed || 0, D = typeof b.total_sell_success == "number" ? b.total_sell_success : g(b.total_payment_success), A = b.total_sell_failed || 0, T = Math.max(0, p - m), L = Math.max(0, m - w - k), I = Math.max(0, k - M), O = Math.max(0, w - S), X = A, P = Math.max(0, S - D - X), E = (j, H) => {
        const N = H > 0 ? Math.round(j / H * 100) : 0;
        return `${j.toLocaleString()} (${N}%)`;
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
      ], W = [];
      return m > 0 && W.push({
        source: "Initiated",
        target: "Started",
        value: m,
        label: E(m, p)
      }), T > 0 && W.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: T,
        label: E(T, p)
      }), w > 0 && W.push({
        source: "Started",
        target: "Voluntary",
        value: w,
        label: E(w, p)
      }), k > 0 && W.push({
        source: "Started",
        target: "Involuntary",
        value: k,
        label: E(k, p)
      }), L > 0 && W.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: L,
        label: E(L, p)
      }), M > 0 && W.push({
        source: "Involuntary",
        target: "Accepted",
        value: M,
        label: E(M, p)
      }), I > 0 && W.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: I,
        label: E(I, p)
      }), S > 0 && W.push({
        source: "Voluntary",
        target: "Confirmed",
        value: S,
        label: E(S, p)
      }), O > 0 && W.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: O,
        label: E(O, p)
      }), D > 0 && W.push({
        source: "Confirmed",
        target: "Paid",
        value: D,
        label: E(D, p)
      }), X > 0 && W.push({
        source: "Confirmed",
        target: "Rejected",
        value: X,
        label: E(X, p)
      }), P > 0 && W.push({
        source: "Confirmed",
        target: "Not Paid",
        value: P,
        label: E(P, p)
      }), { nodes: V, links: W };
    }), x = {
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
    return (b, p) => (y(), _("article", gv, [
      l("header", pv, [
        l("div", vv, [
          p[2] || (p[2] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "Disruption Manager Metrics"),
            l("p", { class: "card-subtitle" }, "Disruption workflow performance and completion tracking")
          ], -1)),
          a.loading ? R("", !0) : (y(), _("div", bv, [
            p[1] || (p[1] = l("p", { class: "badge-label" }, "Payment Success Value", -1)),
            d.value.length > 0 ? (y(), _("div", mv, [
              (y(!0), _(q, null, tt(d.value, (m) => (y(), _("p", {
                key: m.currency,
                class: "currency-breakdown-item"
              }, $(m.currency) + " " + $(h(m.total_value)), 1))), 128))
            ])) : (y(), _("p", yv, $(h(0)), 1))
          ]))
        ])
      ]),
      a.loading ? (y(), _("div", _v, [...p[3] || (p[3] = [
        st('<div class="loading-container" data-v-47c8f691><div class="chart-bars-loader" data-v-47c8f691><div class="bar bar-1" data-v-47c8f691></div><div class="bar bar-2" data-v-47c8f691></div><div class="bar bar-3" data-v-47c8f691></div><div class="bar bar-4" data-v-47c8f691></div><div class="bar bar-5" data-v-47c8f691></div></div><p class="loading-text" data-v-47c8f691>Loading disruption data...</p></div>', 1)
      ])])) : (y(), _("div", xv, [
        l("section", kv, [
          l("div", wv, [
            f.value.nodes.length > 0 && f.value.links.length > 0 ? (y(), ht(_e, {
              key: 0,
              data: f.value,
              "node-colors": x,
              height: "500px"
            }, null, 8, ["data"])) : (y(), _("div", $v, [...p[4] || (p[4] = [
              l("p", { class: "empty-chart-text" }, "No disruption data available for visualization", -1)
            ])]))
          ])
        ]),
        i.value && i.value.length > 0 ? (y(), _("section", Mv, [
          p[7] || (p[7] = st('<div class="section-header" data-v-47c8f691><h4 class="section-title" data-v-47c8f691>Daily Overview</h4></div><div class="legend-container" data-v-47c8f691><p class="legend-title" data-v-47c8f691>Legend</p><div class="legend-items" data-v-47c8f691><div class="legend-group" data-v-47c8f691><span class="legend-label" data-v-47c8f691>Voluntary:</span><span class="badge badge-vol" data-v-47c8f691>VOL</span></div><div class="legend-group" data-v-47c8f691><span class="legend-label" data-v-47c8f691>Involuntary:</span><span class="badge badge-inv" data-v-47c8f691>INV</span></div><div class="legend-note" data-v-47c8f691><span data-v-47c8f691>Vol=Voluntary</span><span data-v-47c8f691>•</span><span data-v-47c8f691>Inv=Involuntary</span></div></div></div>', 2)),
          l("div", Cv, [
            l("table", Sv, [
              p[5] || (p[5] = l("thead", null, [
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
                (y(!0), _(q, null, tt(r.value, (m) => (y(), _("tr", {
                  key: m.date,
                  class: "table-row"
                }, [
                  l("td", Av, $(B(At)(m.date).format("DD/MM")), 1),
                  l("td", Tv, $(B(U)(m.disruption_conversations)), 1),
                  l("td", Bv, [
                    kt($(B(U)(m.disruption_initiated_count)) + " ", 1),
                    l("span", Lv, " (" + $(u(m.disruption_initiated_count, m.disruption_conversations)) + ") ", 1)
                  ]),
                  l("td", Fv, [
                    l("span", Pv, $(B(U)(m.disruption_initiated_count - m.voluntary_count - m.involuntary_count)) + " (" + $(u(m.disruption_initiated_count - m.voluntary_count - m.involuntary_count, m.disruption_conversations)) + ") ", 1)
                  ]),
                  l("td", Ev, [
                    l("div", Rv, [
                      l("span", Iv, " VOL " + $(B(U)(m.voluntary_count)) + " (" + $(u(m.voluntary_count, m.disruption_conversations)) + ") ", 1),
                      l("span", Ov, " Confirm " + $(B(U)(m.confirmed_count)) + " (" + $(u(m.confirmed_count, m.disruption_conversations)) + ") ", 1),
                      l("span", Vv, " Not Confirm " + $(B(U)(m.voluntary_count - m.confirmed_count)) + " (" + $(u(m.voluntary_count - m.confirmed_count, m.disruption_conversations)) + ") ", 1),
                      l("span", zv, " Reject " + $(B(U)(m.sell_failed_count)) + " (" + $(u(m.sell_failed_count, m.disruption_conversations)) + ") ", 1),
                      l("span", Nv, " Not Paid " + $(B(U)(Math.max(0, m.confirmed_count - v(m) - m.sell_failed_count))) + " (" + $(u(Math.max(0, m.confirmed_count - v(m) - m.sell_failed_count), m.disruption_conversations)) + ") ", 1),
                      l("span", Wv, " Finish " + $(B(U)(v(m))) + " (" + $(u(v(m), m.disruption_conversations)) + ") ", 1),
                      (y(!0), _(q, null, tt(m.payment_success_total || [], (w) => (y(), _("span", {
                        key: `${m.date}-${w.currency}`,
                        class: "badge badge-currency"
                      }, $(w.currency) + " " + $(h(w.total_value)), 1))), 128))
                    ])
                  ]),
                  l("td", Hv, [
                    l("div", jv, [
                      l("span", Yv, " INV " + $(B(U)(m.involuntary_count)) + " (" + $(u(m.involuntary_count, m.disruption_conversations)) + ") ", 1),
                      l("span", Kv, " Human " + $(B(U)(m.involuntary_count - m.accepted_count)) + " (" + $(u(m.involuntary_count - m.accepted_count, m.disruption_conversations)) + ") ", 1),
                      l("span", Uv, " Accept " + $(B(U)(m.accepted_count)) + " (" + $(u(m.accepted_count, m.disruption_conversations)) + ") ", 1)
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          c.value ? (y(), _("button", {
            key: 0,
            class: "view-more-btn",
            onClick: p[0] || (p[0] = (m) => o.value = !o.value)
          }, [
            kt($(o.value ? "View less" : `View more (${i.value.length - vs} more rows)`) + " ", 1),
            (y(), _("svg", {
              class: K(["view-more-icon", { "view-more-icon-rotated": o.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...p[6] || (p[6] = [
              l("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : R("", !0),
          e.enableExport ? (y(), ht(B(_t), {
            key: 1,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : R("", !0)
        ])) : (y(), _("section", qv, [...p[8] || (p[8] = [
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
    const s = e, n = a, o = (g) => {
      n("export", g);
    }, { isDark: i, colors: r } = ct(lt(s, "theme")), c = at({ labels: [], datasets: [] }), d = C(() => s.data ?? {
      total_faq_events: 0,
      total_documents_found: 0,
      total_airline_information_retrieved: 0,
      total_booking_info_retrieved: 0,
      total_flight_status_retrieved: 0,
      faq_by_day: []
    }), u = C(() => ({
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
    })), h = (g) => {
      if (!g) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const v = g.faq_by_day || [];
      if (v.length > 0) {
        const f = v.map((m) => At(m.date).format("MMM DD")), x = v.map((m) => m.airline_information_retrieved_count || 0), b = v.map((m) => m.flight_status_retrieved_count || 0), p = v.map((m) => m.booking_info_retrieved_count || 0);
        c.value = {
          labels: f,
          datasets: [
            {
              label: "Airline Information",
              data: x,
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
              data: p,
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
    return Et(
      () => s.data,
      (g) => {
        h(g ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: i }), (g, v) => (y(), _("article", Zv, [
      v[7] || (v[7] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "FAQ Metrics"),
          l("p", { class: "card-subtitle" }, "Daily FAQ consultation and retrieval metrics")
        ])
      ], -1)),
      s.loading ? (y(), _("div", hb, [...v[6] || (v[6] = [
        st('<div class="loading-container" data-v-5d2c3c33><div class="chart-bars-loader" data-v-5d2c3c33><div class="bar bar-1" data-v-5d2c3c33></div><div class="bar bar-2" data-v-5d2c3c33></div><div class="bar bar-3" data-v-5d2c3c33></div><div class="bar bar-4" data-v-5d2c3c33></div><div class="bar bar-5" data-v-5d2c3c33></div></div><p class="loading-text" data-v-5d2c3c33>Loading FAQ metrics...</p></div>', 1)
      ])])) : (y(), _("div", Qv, [
        l("div", Jv, [
          l("div", tb, [
            v[0] || (v[0] = l("span", { class: "kpi-label" }, "Total FAQ", -1)),
            l("span", eb, $(B(U)(d.value.total_faq_events)), 1)
          ]),
          l("div", ab, [
            v[1] || (v[1] = l("span", { class: "kpi-label" }, "Documents Found", -1)),
            l("span", sb, $(B(U)(d.value.total_documents_found)), 1)
          ]),
          l("div", nb, [
            v[2] || (v[2] = l("div", { class: "kpi-label-row" }, [
              l("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              l("span", { class: "kpi-label" }, "Airline Info")
            ], -1)),
            l("span", ob, $(B(U)(d.value.total_airline_information_retrieved)), 1)
          ]),
          l("div", ib, [
            v[3] || (v[3] = l("div", { class: "kpi-label-row" }, [
              l("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              l("span", { class: "kpi-label" }, "Booking Info")
            ], -1)),
            l("span", rb, $(B(U)(d.value.total_booking_info_retrieved)), 1)
          ]),
          l("div", lb, [
            v[4] || (v[4] = l("div", { class: "kpi-label-row" }, [
              l("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              l("span", { class: "kpi-label" }, "Flight Status")
            ], -1)),
            l("span", cb, $(B(U)(d.value.total_flight_status_retrieved)), 1)
          ])
        ]),
        c.value.labels && c.value.labels.length ? (y(), _("section", db, [
          Q(ye, {
            data: c.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ht(B(_t), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : R("", !0)
        ])) : (y(), _("section", ub, [...v[5] || (v[5] = [
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
    }, { isDark: r, colors: c } = ct(lt(n, "theme")), d = C(() => {
      const h = n.data?.agents_by_day || {}, g = Object.keys(h).sort();
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const v = /* @__PURE__ */ new Set();
      for (const b of Object.values(h))
        for (const p of Object.keys(b))
          v.add(p);
      const x = Array.from(v).map((b) => {
        const p = s[b] || "#94a3b8";
        return {
          label: b.charAt(0).toUpperCase() + b.slice(1).replace(/_/g, " "),
          data: g.map((m) => h[m]?.[b] || 0),
          borderColor: p,
          backgroundColor: `${p}20`,
          pointBackgroundColor: p,
          pointBorderColor: r.value ? "#1a1a1d" : "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.3,
          fill: !1
        };
      });
      return {
        labels: g,
        datasets: x
      };
    }), u = C(() => n.options ? n.options : {
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
    return t({ isDark: r }), (h, g) => (y(), _("article", pb, [
      g[3] || (g[3] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Messages per Agent"),
          l("p", { class: "card-subtitle" }, "Agent interaction trends over time")
        ])
      ], -1)),
      e.loading ? (y(), _("div", xb, [...g[2] || (g[2] = [
        st('<div class="loading-container" data-v-b9368fc2><div class="chart-lines-loader" data-v-b9368fc2><div class="line line-1" data-v-b9368fc2></div><div class="line line-2" data-v-b9368fc2></div><div class="line line-3" data-v-b9368fc2></div><div class="line line-4" data-v-b9368fc2></div><div class="line line-5" data-v-b9368fc2></div></div><p class="loading-text" data-v-b9368fc2>Loading chart data...</p></div>', 1)
      ])])) : (y(), _("div", vb, [
        d.value.labels && d.value.labels.length ? (y(), _("section", bb, [
          Q(ye, {
            data: d.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ht(B(_t), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : R("", !0)
        ])) : (y(), _("section", mb, [
          l("div", yb, [
            l("div", _b, [
              Q(B(Ot), { class: "empty-icon" })
            ]),
            g[0] || (g[0] = l("p", { class: "empty-title" }, "No agent interactions data", -1)),
            g[1] || (g[1] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), wb = /* @__PURE__ */ nt(kb, [["__scopeId", "data-v-b9368fc2"]]), $b = { class: "record-locator-card" }, Mb = {
  key: 0,
  class: "loading-state"
}, Cb = {
  key: 1,
  class: "card-body"
}, Sb = {
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
}, Eb = { class: "table-body" }, Rb = { class: "table-cell font-medium" }, Ib = { class: "table-cell text-center" }, Ob = { class: "table-cell text-center" }, Vb = { class: "table-cell text-center" }, zb = { class: "table-cell text-center" }, Nb = { class: "table-cell text-center success-value" }, Wb = { class: "table-cell text-center failed-value" }, Hb = { class: "table-cell text-center warning-value" }, jb = {
  key: 0,
  class: "table-cell text-center"
}, Yb = {
  key: 1,
  class: "table-cell text-center failed-value"
}, Kb = {
  key: 2,
  class: "empty-state"
}, bs = 3, Ub = /* @__PURE__ */ J({
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
    }, { isDark: i } = ct(lt(s, "theme")), r = at(!1), c = C(() => s.data?.record_locator_by_day ? [...s.data.record_locator_by_day].sort(
      (b, p) => new Date(b.date).getTime() - new Date(p.date).getTime()
    ) : []), d = C(() => r.value ? c.value : c.value.slice(0, bs)), u = C(() => c.value.length > bs), h = C(() => s.data), g = C(() => ({
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
    })), v = (b, p) => !p || p === 0 ? "0%" : `${Math.round(b / p * 100)}%`, f = (b, p) => {
      const m = U(b), w = v(b, p);
      return `${m} (${w})`;
    }, x = C(() => {
      const b = [], p = [], m = /* @__PURE__ */ new Set(), w = (Y) => {
        m.has(Y) || (b.push({ name: Y }), m.add(Y));
      };
      if (!h.value.total_checkin_initiated)
        return { nodes: b, links: p };
      w("Checkin Init"), w("Booking retrive"), w("Checkin Started"), w("Checkin Completed"), w("Checkin Closed");
      const k = h.value.total_checkin_initiated, M = h.value.total_record_locator_init, S = h.value.total_record_locator_started, D = h.value.total_record_locator_completed, A = h.value.total_record_locator_closed, T = h.value.total_record_locator_failed, L = h.value.total_record_locator_abandoned, I = h.value.total_record_locator_init_abandoned, O = h.value.total_checkin_pre_init_abandoned_error, X = h.value.total_checkin_pre_init_abandoned_voluntary, P = O != null || X != null, E = P ? Math.max(Number(O) || 0, 0) : 0, V = P ? Math.max(Number(X) || 0, 0) : 0, W = h.value.total_record_locator_init_abandoned_error, j = h.value.total_record_locator_init_abandoned_voluntary, H = W != null || j != null, N = H ? Math.max(Number(W) || 0, 0) : 0, et = H ? Math.max(Number(j) || 0, 0) : 0;
      if (M > 0) {
        const Y = Math.round(M / k * 100);
        p.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: M,
          label: `${M.toLocaleString()} (${Y}%)`
        });
      }
      const G = k - M;
      if (P) {
        if (V > 0) {
          const Y = Math.round(V / k * 100);
          w("Abandoned (Init)"), p.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: V,
            label: `${V.toLocaleString()} (${Y}%)`
          });
        }
        if (E > 0) {
          const Y = Math.round(E / k * 100);
          w("Booking not retreived"), p.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: E,
            label: `${E.toLocaleString()} (${Y}%)`
          });
        }
      } else if (G > 0) {
        const Y = Math.round(G / k * 100);
        w("Abandoned (Init)"), p.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: G,
          label: `${G.toLocaleString()} (${Y}%)`
        });
      }
      if (S > 0) {
        const Y = Math.round(S / k * 100);
        p.push({
          source: "Booking retrive",
          target: "Checkin Started",
          value: S,
          label: `${S.toLocaleString()} (${Y}%)`
        });
      }
      if (H) {
        if (N > 0) {
          const Y = Math.round(N / k * 100);
          w("Error"), p.push({
            source: "Booking retrive",
            target: "Error",
            value: N,
            label: `${N.toLocaleString()} (${Y}%)`
          });
        }
        if (et > 0) {
          const Y = Math.round(et / k * 100);
          w("Abandoned (Started)"), p.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: et,
            label: `${et.toLocaleString()} (${Y}%)`
          });
        }
      } else if (I > 0) {
        const Y = Math.round(I / k * 100);
        w("Abandoned (Started)"), p.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: I,
          label: `${I.toLocaleString()} (${Y}%)`
        });
      }
      if (D > 0) {
        const Y = Math.round(D / S * 100);
        p.push({
          source: "Checkin Started",
          target: "Checkin Completed",
          value: D,
          label: `${D.toLocaleString()} (${Y}%)`
        });
      }
      if (A > 0) {
        const Y = Math.round(A / S * 100);
        p.push({
          source: "Checkin Completed",
          target: "Checkin Closed",
          value: A,
          label: `${A.toLocaleString()} (${Y}%)`
        });
      }
      if (T > 0) {
        const Y = Math.round(T / S * 100);
        w("Checkin Failed"), p.push({
          source: "Checkin Started",
          target: "Checkin Failed",
          value: T,
          label: `${T.toLocaleString()} (${Y}%)`
        });
      }
      if (L > 0) {
        const Y = Math.round(L / S * 100);
        w("Abandoned (Flow)"), p.push({
          source: "Checkin Started",
          target: "Abandoned (Flow)",
          value: L,
          label: `${L.toLocaleString()} (${Y}%)`
        });
      }
      return { nodes: b, links: p };
    });
    return t({ isDark: i }), (b, p) => (y(), _("article", $b, [
      p[12] || (p[12] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Checkin by Record Locator Metrics"),
          l("p", { class: "card-subtitle" }, "Checkin by record locator retrieval and completion analysis")
        ])
      ], -1)),
      s.loading ? (y(), _("div", Mb, [...p[1] || (p[1] = [
        st('<div class="loading-container" data-v-e48cea55><div class="chart-flow-loader" data-v-e48cea55><div class="flow-line flow-1" data-v-e48cea55></div><div class="flow-line flow-2" data-v-e48cea55></div><div class="flow-line flow-3" data-v-e48cea55></div><div class="flow-line flow-4" data-v-e48cea55></div><div class="flow-line flow-5" data-v-e48cea55></div></div><p class="loading-text" data-v-e48cea55>Loading record locator data...</p></div>', 1)
      ])])) : (y(), _("div", Cb, [
        x.value.nodes.length > 0 ? (y(), _("section", Sb, [
          l("div", Db, [
            Q(_e, {
              data: x.value,
              height: "500px",
              "node-colors": g.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : R("", !0),
        c.value && c.value.length > 0 ? (y(), _("section", Ab, [
          l("div", Tb, [
            l("table", Bb, [
              l("thead", null, [
                l("tr", Lb, [
                  p[2] || (p[2] = l("th", { class: "table-header" }, "Date", -1)),
                  p[3] || (p[3] = l("th", { class: "table-header" }, "Checkin Init", -1)),
                  p[4] || (p[4] = l("th", { class: "table-header" }, "Booking Retrieve (%)", -1)),
                  p[5] || (p[5] = l("th", { class: "table-header" }, "Checkin Started", -1)),
                  p[6] || (p[6] = l("th", { class: "table-header" }, "Checkin Completed (%)", -1)),
                  p[7] || (p[7] = l("th", { class: "table-header" }, "Checkin Closed (%)", -1)),
                  p[8] || (p[8] = l("th", { class: "table-header" }, "Checkin Failed (%)", -1)),
                  p[9] || (p[9] = l("th", { class: "table-header" }, "Abandoned (%)", -1)),
                  s.isAvianca ? (y(), _("th", Fb, "Create Payment")) : R("", !0),
                  s.isAvianca ? (y(), _("th", Pb, "Failed Payment")) : R("", !0)
                ])
              ]),
              l("tbody", Eb, [
                (y(!0), _(q, null, tt(d.value, (m) => (y(), _("tr", {
                  key: m.date,
                  class: "table-row"
                }, [
                  l("td", Rb, $(B(At)(m.date).format("DD/MM/YYYY")), 1),
                  l("td", Ib, $(B(U)(m.checkin_initiated)), 1),
                  l("td", Ob, $(f(m.record_locator_init_count, m.checkin_initiated)), 1),
                  l("td", Vb, $(B(U)(m.record_locator_started_count)), 1),
                  l("td", zb, $(f(m.record_locator_completed_count, m.record_locator_started_count)), 1),
                  l("td", Nb, $(f(m.record_locator_closed_count, m.record_locator_started_count)), 1),
                  l("td", Wb, $(f(m.record_locator_failed_count, m.record_locator_started_count)), 1),
                  l("td", Hb, $(f(m.record_locator_abandoned_count, m.record_locator_started_count)), 1),
                  s.isAvianca ? (y(), _("td", jb, $(B(U)(m.record_locator_create_payment_count)), 1)) : R("", !0),
                  s.isAvianca ? (y(), _("td", Yb, $(B(U)(m.record_locator_create_payment_failed_count)), 1)) : R("", !0)
                ]))), 128))
              ])
            ])
          ]),
          u.value ? (y(), _("button", {
            key: 0,
            class: "view-more-btn",
            onClick: p[0] || (p[0] = (m) => r.value = !r.value)
          }, [
            kt($(r.value ? "View less" : `View more (${c.value.length - bs} more rows)`) + " ", 1),
            (y(), _("svg", {
              class: K(["view-more-icon", { "view-more-icon-rotated": r.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...p[10] || (p[10] = [
              l("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : R("", !0),
          e.enableExport ? (y(), ht(B(_t), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : R("", !0)
        ])) : (y(), _("section", Kb, [...p[11] || (p[11] = [
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
    }, n = ["#B0C4DE", "#C9A0F2", "#F5C26B", "#8BE8B0", "#F2A07A", "#7BA3E8"], o = e, i = a, r = (g) => {
      i("export", g);
    }, { isDark: c } = ct(lt(o, "theme"));
    C(() => o.data?.total_sell_success ?? 0);
    const d = C(() => {
      const g = /* @__PURE__ */ new Set();
      for (const v of o.data?.sales_by_channel_by_day ?? [])
        for (const f of Object.keys(v.channels))
          g.add(f);
      return Array.from(g).sort();
    }), u = (g, v) => s[g.toLowerCase()] ?? n[v % n.length], h = C(() => {
      const g = o.data?.sales_by_channel_by_day ?? [];
      if (g.length === 0) return { labels: [], datasets: [] };
      const v = g.map((x) => At(x.date).format("MMM-DD")), f = d.value.map((x, b) => ({
        label: x,
        data: g.map((p) => p.channels[x] ?? 0),
        backgroundColor: u(x, b),
        borderRadius: 4
      }));
      return { labels: v, datasets: f };
    });
    return t({ isDark: c }), (g, v) => (y(), _("article", Xb, [
      v[5] || (v[5] = st('<header class="card-header" data-v-8b96a431><div class="header-content" data-v-8b96a431><div class="title-section" data-v-8b96a431><h3 class="card-title" data-v-8b96a431>Sales by Channel</h3><p class="card-subtitle" data-v-8b96a431>Successful sales breakdown by communication channel</p></div></div></header>', 1)),
      o.loading ? (y(), _("div", Gb, [...v[0] || (v[0] = [
        st('<div class="loading-container" data-v-8b96a431><div class="chart-bars-loader" data-v-8b96a431><div class="bar bar-1" data-v-8b96a431></div><div class="bar bar-2" data-v-8b96a431></div><div class="bar bar-3" data-v-8b96a431></div><div class="bar bar-4" data-v-8b96a431></div><div class="bar bar-5" data-v-8b96a431></div></div><p class="loading-text" data-v-8b96a431>Loading sales data...</p></div>', 1)
      ])])) : (y(), _("div", Zb, [
        h.value.labels.length > 0 ? (y(), _("section", Qb, [
          l("div", Jb, [
            Q(ie, {
              data: h.value,
              stacked: !0
            }, null, 8, ["data"])
          ]),
          e.enableExport ? (y(), ht(B(_t), {
            key: 0,
            onExport: r,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : R("", !0)
        ])) : (y(), _("section", tm, [...v[1] || (v[1] = [
          st('<div class="empty-state-content" data-v-8b96a431><div class="empty-icon-wrapper" data-v-8b96a431><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-8b96a431><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-8b96a431></path></svg></div><p class="empty-title" data-v-8b96a431>No sales data available</p><p class="empty-description" data-v-8b96a431>No sales by channel data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])])),
        e.channelComparison.length > 0 ? (y(), _("section", em, [
          l("div", am, [
            (y(!0), _(q, null, tt(e.channelComparison, (f) => (y(), _("div", {
              key: f.channel,
              class: "comparison-card"
            }, [
              l("div", {
                class: "comparison-color-bar",
                style: xt({ backgroundColor: u(f.channel, e.channelComparison.indexOf(f)) })
              }, null, 4),
              l("div", sm, [
                l("span", nm, $(f.channel), 1),
                l("span", om, $(B(U)(f.current)), 1),
                f.delta !== null ? (y(), _("div", im, [
                  l("span", {
                    class: K(["delta-badge", f.delta > 0 ? "delta-up" : f.delta < 0 ? "delta-down" : "delta-neutral"])
                  }, [
                    f.delta > 0 ? (y(), _("svg", rm, [...v[2] || (v[2] = [
                      l("path", {
                        "fill-rule": "evenodd",
                        d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
                        "clip-rule": "evenodd"
                      }, null, -1)
                    ])])) : f.delta < 0 ? (y(), _("svg", lm, [...v[3] || (v[3] = [
                      l("path", {
                        "fill-rule": "evenodd",
                        d: "M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z",
                        "clip-rule": "evenodd"
                      }, null, -1)
                    ])])) : R("", !0),
                    kt(" " + $(Math.abs(f.delta).toFixed(1)) + "% ", 1)
                  ], 2),
                  l("span", cm, "vs prev. period (" + $(B(U)(f.previous)) + ")", 1)
                ])) : (y(), _("div", dm, [...v[4] || (v[4] = [
                  l("span", { class: "delta-label" }, "No previous data", -1)
                ])]))
              ])
            ]))), 128))
          ])
        ])) : R("", !0)
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
}, Cm = {
  key: 0,
  class: "chart-section"
}, Sm = { class: "chart-wrapper" }, Dm = {
  key: 1,
  class: "empty-state"
}, Am = {
  key: 2,
  class: "table-section"
}, Tm = { class: "table-wrapper" }, Bm = { class: "data-table" }, Lm = { class: "table-body" }, Fm = { class: "table-cell font-medium" }, Pm = { class: "table-cell text-center" }, Em = { class: "table-cell text-center" }, Rm = { class: "table-cell text-center" }, Im = { class: "table-cell text-center" }, Om = { class: "table-cell text-center" }, Vm = { class: "table-cell text-center warning-value" }, zm = {
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
}, ms = 3, e1 = /* @__PURE__ */ J({
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
        const T = D.findIndex((L) => L.date === A.date);
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
    }), d = C(() => r.value ? c.value : c.value.slice(0, ms)), u = C(() => c.value.length > ms), h = C(() => s.sellerData), g = C(() => s.failedData), v = C(
      () => Array.isArray(s.sellerData.total_value_sell_success) ? s.sellerData.total_value_sell_success : []
    ), f = C(
      () => Array.isArray(s.sellerData.total_value_sell_bank_transfer) ? s.sellerData.total_value_sell_bank_transfer : []
    ), x = C(
      () => Array.isArray(s.sellerData.total_value_sell_cash_option) ? s.sellerData.total_value_sell_cash_option : []
    ), b = C(() => {
      const {
        total_seller_conversations: D = 0,
        total_sell_started: A = 0,
        total_sell_booking_created: T = 0,
        total_sell_success: L = 0,
        total_sell_bank_transfer: I = 0,
        total_sell_cash_option: O = 0
      } = h.value, { failed_by_reason_by_day: X = [] } = g.value;
      if (D === 0) return { nodes: [], links: [] };
      const P = [
        { name: "Sell Initiated", value: D },
        { name: "Sell Started", value: A },
        { name: "Booking Created", value: T },
        { name: "Sell Success", value: L }
      ], E = [], V = D - A;
      if (V > 0) {
        const N = Math.round(V / D * 100);
        P.push({ name: "Abandoned (Init)", value: V }), E.push({
          source: "Sell Initiated",
          target: "Abandoned (Init)",
          value: V,
          label: `${V.toLocaleString()} (${N}%)`
        });
      }
      if (A > 0) {
        const N = Math.round(A / D * 100);
        E.push({
          source: "Sell Initiated",
          target: "Sell Started",
          value: A,
          label: `${A.toLocaleString()} (${N}%)`
        });
      }
      const W = X.reduce((N, et) => (et.reasons && Array.isArray(et.reasons) && et.reasons.forEach((G) => {
        const Y = G.reason, ot = G.failed_count;
        N[Y] = (N[Y] || 0) + ot;
      }), N), {});
      if (T > 0) {
        const N = Math.round(T / D * 100);
        E.push({
          source: "Sell Started",
          target: "Booking Created",
          value: T,
          label: `${T.toLocaleString()} (${N}%)`
        });
      }
      if (I > 0) {
        const N = Math.round(I / D * 100);
        P.push({ name: "Bank Transfer", value: I }), E.push({
          source: "Booking Created",
          target: "Bank Transfer",
          value: I,
          label: `${I.toLocaleString()} (${N}%)`
        });
      }
      if (O > 0) {
        const N = Math.round(O / D * 100);
        P.push({ name: "Cash Option", value: O }), E.push({
          source: "Booking Created",
          target: "Cash Option",
          value: O,
          label: `${O.toLocaleString()} (${N}%)`
        });
      }
      if (L > 0) {
        const N = Math.round(L / D * 100);
        E.push({
          source: "Booking Created",
          target: "Sell Success",
          value: L,
          label: `${L.toLocaleString()} (${N}%)`
        });
      }
      const j = T - L - I - O;
      if (j > 0) {
        const N = Math.round(j / D * 100);
        P.push({ name: "Failed at Completion", value: j }), E.push({
          source: "Booking Created",
          target: "Failed at Completion",
          value: j,
          label: `${j.toLocaleString()} (${N}%)`
        });
      }
      const H = A - T;
      if (H > 0) {
        const N = Math.round(H / D * 100);
        P.push({ name: "Failed at Booking", value: H }), E.push({
          source: "Sell Started",
          target: "Failed at Booking",
          value: H,
          label: `${H.toLocaleString()} (${N}%)`
        });
      }
      if (Object.keys(W).length > 0) {
        const N = Object.values(W).reduce((G, Y) => G + Y, 0), et = H - N;
        if (Object.entries(W).filter(([, G]) => G > 0).sort(([, G], [, Y]) => Y - G).forEach(([G, Y]) => {
          const ot = Math.round(Y / D * 100);
          P.push({ name: `Failed: ${G}`, value: Y }), E.push({
            source: "Failed at Booking",
            target: `Failed: ${G}`,
            value: Y,
            label: `${Y.toLocaleString()} (${ot}%)`
          });
        }), et > 0) {
          const G = Math.round(et / D * 100);
          P.push({ name: "Failed: Without Reason", value: et }), E.push({
            source: "Failed at Booking",
            target: "Failed: Without Reason",
            value: et,
            label: `${et.toLocaleString()} (${G}%)`
          });
        }
      }
      return { nodes: P, links: E };
    }), p = {
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
    }, m = C(() => p), w = (D, A) => !A || A === 0 ? "0%" : `${Math.round(D / A * 100)}%`, k = (D, A) => {
      const T = U(D), L = w(D, A);
      return `${T} (${L})`;
    }, M = (D) => D == null ? 0 : typeof D == "number" ? D : Array.isArray(D) ? D.reduce((A, T) => A + (T.total_value || 0), 0) : 0, S = (D) => fe(M(D));
    return t({ isDark: i }), (D, A) => (y(), _("article", fm, [
      l("header", gm, [
        l("div", pm, [
          A[4] || (A[4] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "Seller Metrics"),
            l("p", { class: "card-subtitle" }, "Sales performance and failure analysis")
          ], -1)),
          l("div", vm, [
            s.loading ? R("", !0) : (y(), _("div", bm, [
              A[1] || (A[1] = l("p", { class: "badge-label" }, "Total Sales Value", -1)),
              v.value.length > 0 ? (y(), _("div", mm, [
                (y(!0), _(q, null, tt(v.value, (T) => (y(), _("p", {
                  key: T.currency,
                  class: "currency-breakdown-item"
                }, $(T.currency) + " " + $(B(fe)(T.total_value)), 1))), 128))
              ])) : (y(), _("p", ym, $(S(s.sellerData.total_value_sell_success)), 1))
            ])),
            !s.loading && f.value.length > 0 ? (y(), _("div", _m, [
              A[2] || (A[2] = l("p", { class: "badge-label-warning" }, "Bank Transfer Value", -1)),
              l("div", xm, [
                (y(!0), _(q, null, tt(f.value, (T) => (y(), _("p", {
                  key: "bt-" + T.currency,
                  class: "currency-breakdown-item-warning"
                }, $(T.currency) + " " + $(B(fe)(T.total_value)), 1))), 128))
              ])
            ])) : R("", !0),
            !s.loading && x.value.length > 0 ? (y(), _("div", km, [
              A[3] || (A[3] = l("p", { class: "badge-label-warning" }, "Cash Option Value", -1)),
              l("div", wm, [
                (y(!0), _(q, null, tt(x.value, (T) => (y(), _("p", {
                  key: "co-" + T.currency,
                  class: "currency-breakdown-item-warning"
                }, $(T.currency) + " " + $(B(fe)(T.total_value)), 1))), 128))
              ])
            ])) : R("", !0)
          ])
        ])
      ]),
      s.loading ? (y(), _("div", $m, [...A[5] || (A[5] = [
        st('<div class="loading-container" data-v-301db2b6><div class="chart-flow-loader" data-v-301db2b6><div class="flow-line flow-1" data-v-301db2b6></div><div class="flow-line flow-2" data-v-301db2b6></div><div class="flow-line flow-3" data-v-301db2b6></div><div class="flow-line flow-4" data-v-301db2b6></div><div class="flow-line flow-5" data-v-301db2b6></div></div><p class="loading-text" data-v-301db2b6>Loading sales data...</p></div>', 1)
      ])])) : (y(), _("div", Mm, [
        b.value.nodes.length > 0 ? (y(), _("section", Cm, [
          l("div", Sm, [
            Q(_e, {
              data: b.value,
              "node-colors": m.value,
              title: "",
              height: "320px"
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : (y(), _("section", Dm, [...A[6] || (A[6] = [
          st('<div class="empty-state-content" data-v-301db2b6><div class="empty-icon-wrapper" data-v-301db2b6><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-301db2b6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-301db2b6></path></svg></div><p class="empty-title" data-v-301db2b6>No sales data available</p><p class="empty-description" data-v-301db2b6>No sales data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])])),
        c.value && c.value.length > 0 ? (y(), _("section", Am, [
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
                (y(!0), _(q, null, tt(d.value, (T) => (y(), _("tr", {
                  key: T.date,
                  class: "table-row"
                }, [
                  l("td", Fm, $(B(At)(T.date).format("DD/MM/YYYY")), 1),
                  l("td", Pm, $(B(U)(T.seller_conversations || 0)), 1),
                  l("td", Em, $(k(T.sell_started_count, T.seller_conversations || T.sell_started_count)), 1),
                  l("td", Rm, $(k(T.sell_get_quote_count, T.seller_conversations || T.sell_started_count)), 1),
                  l("td", Im, $(k(T.sell_booking_created_count, T.seller_conversations || T.sell_started_count)), 1),
                  l("td", Om, $(B(U)(T.sell_bank_transfer_count || 0)), 1),
                  l("td", Vm, [
                    Array.isArray(T.daily_value_sell_bank_transfer) && T.daily_value_sell_bank_transfer.length > 0 ? (y(), _("div", zm, [
                      (y(!0), _(q, null, tt(T.daily_value_sell_bank_transfer, (L) => (y(), _("span", {
                        key: `${T.date}-bt-${L.currency}`
                      }, $(L.currency) + " " + $(B(fe)(L.total_value)), 1))), 128))
                    ])) : (y(), _("span", Nm, "-"))
                  ]),
                  l("td", Wm, $(B(U)(T.sell_cash_option_count || 0)), 1),
                  l("td", Hm, [
                    Array.isArray(T.daily_value_sell_cash_option) && T.daily_value_sell_cash_option.length > 0 ? (y(), _("div", jm, [
                      (y(!0), _(q, null, tt(T.daily_value_sell_cash_option, (L) => (y(), _("span", {
                        key: `${T.date}-co-${L.currency}`
                      }, $(L.currency) + " " + $(B(fe)(L.total_value)), 1))), 128))
                    ])) : (y(), _("span", Ym, "-"))
                  ]),
                  l("td", Km, $(k(T.sell_success_count, T.seller_conversations || T.sell_started_count)), 1),
                  l("td", Um, [
                    Array.isArray(T.daily_value_sell_success) && T.daily_value_sell_success.length > 0 ? (y(), _("div", qm, [
                      (y(!0), _(q, null, tt(T.daily_value_sell_success, (L) => (y(), _("span", {
                        key: `${T.date}-${L.currency}`
                      }, $(L.currency) + " " + $(B(fe)(L.total_value)), 1))), 128))
                    ])) : (y(), _("span", Xm, $(S(T.daily_value_sell_success)), 1))
                  ]),
                  l("td", Gm, [
                    T.reasons && T.reasons.length > 0 ? (y(), _("div", Zm, [
                      (y(!0), _(q, null, tt(T.reasons, (L) => (y(), _("div", {
                        key: L.reason,
                        class: "failed-reason-item"
                      }, [
                        l("span", Qm, $(L.reason) + ":", 1),
                        l("span", Jm, $(L.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), _("div", t1, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          u.value ? (y(), _("button", {
            key: 0,
            class: "view-more-btn",
            onClick: A[0] || (A[0] = (T) => r.value = !r.value)
          }, [
            kt($(r.value ? "View less" : `View more (${c.value.length - ms} more rows)`) + " ", 1),
            (y(), _("svg", {
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
          ])) : R("", !0),
          e.enableExport ? (y(), ht(B(_t), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : R("", !0)
        ])) : R("", !0)
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
    }, { isDark: r, colors: c } = ct(lt(n, "theme")), d = C(() => {
      const g = (n.data?.top_agents || []).filter(
        (b) => b.agent_type?.toLowerCase() !== "triage"
      );
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const v = g.reduce(
        (b, p) => b + (Number(p.conversations) || 0),
        0
      ), f = g.map((b) => {
        const p = b.agent_type?.toLowerCase();
        return s[p] || "#94a3b8";
      }), x = f.map((b) => `${b}80`);
      return {
        labels: g.map((b) => {
          const p = Number(b.conversations) || 0, m = v ? p / v * 100 : 0;
          return `${b.agent_type} - ${p.toLocaleString()} (${m.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: g.map((b) => b.conversations),
            backgroundColor: x,
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
              const g = (h.label || "").toString().split(" - ")[0], v = Number(h.parsed) || 0, f = (h.dataset.data || []).reduce(
                (b, p) => b + (Number(p) || 0),
                0
              ), x = f ? v / f * 100 : 0;
              return `${g}: ${v.toLocaleString()} (${x.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: r }), (h, g) => (y(), _("article", s1, [
      g[3] || (g[3] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Top Agents"),
          l("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (y(), _("div", c1, [...g[2] || (g[2] = [
        st('<div class="loading-container" data-v-501bf4c4><div class="chart-lines-loader" data-v-501bf4c4><div class="line line-1" data-v-501bf4c4></div><div class="line line-2" data-v-501bf4c4></div><div class="line line-3" data-v-501bf4c4></div><div class="line line-4" data-v-501bf4c4></div><div class="line line-5" data-v-501bf4c4></div></div><p class="loading-text" data-v-501bf4c4>Loading chart data...</p></div>', 1)
      ])])) : (y(), _("div", n1, [
        d.value.labels && d.value.labels.length ? (y(), _("section", o1, [
          Q(Za, {
            data: d.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ht(B(_t), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : R("", !0)
        ])) : (y(), _("section", i1, [
          l("div", r1, [
            l("div", l1, [
              Q(B(Eg), { class: "empty-icon" })
            ]),
            g[0] || (g[0] = l("p", { class: "empty-title" }, "No top agents data", -1)),
            g[1] || (g[1] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
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
}, M1 = { class: "payment-badge-wrapper" }, C1 = {
  key: 1,
  class: "empty-state"
}, S1 = { class: "empty-state-content" }, D1 = { class: "empty-icon-wrapper" }, A1 = {
  key: 2,
  class: "table-section"
}, T1 = { class: "table-wrapper" }, B1 = { class: "data-table" }, L1 = { class: "table-body" }, F1 = { class: "table-cell font-medium" }, P1 = { class: "table-cell text-center" }, E1 = { class: "table-cell text-center success-value" }, R1 = {
  key: 0,
  class: "currency-cell-list"
}, I1 = { key: 1 }, O1 = { class: "table-cell" }, V1 = { class: "payment-tags" }, z1 = { class: "tag-name" }, N1 = {
  key: 0,
  class: "tag-amount"
}, W1 = {
  key: 1,
  class: "tag-amount"
}, H1 = { class: "tag-count" }, j1 = {
  key: 3,
  class: "empty-table-state"
}, Y1 = "Not Registered", ys = 3, K1 = /* @__PURE__ */ J({
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
    }), c = C(() => r.value.payment_method_breakdown && r.value.payment_method_breakdown.length > 0), d = C(() => r.value.payment_method_by_day && r.value.payment_method_by_day.length > 0), u = at(!1), h = C(() => !r.value.payment_method_by_day || r.value.payment_method_by_day.length === 0 ? [] : [...r.value.payment_method_by_day].sort((P, E) => At(P.date).valueOf() - At(E.date).valueOf())), g = C(() => u.value ? h.value : h.value.slice(0, ys)), v = C(() => h.value.length > ys), f = (P) => {
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
      const E = (P.payment_method_breakdown || []).map((W) => ({
        payment_method: W.payment_method || "Unknown",
        total_amount: W.total_amount ?? 0,
        count: W.count ?? 0,
        total_amount_by_currency: W.total_amount_by_currency ?? []
      })), V = (P.payment_method_by_day || []).map((W) => ({
        date: W.date || "",
        total_count: W.total_count ?? 0,
        total_amount: W.total_amount ?? 0,
        total_amount_by_currency: W.total_amount_by_currency ?? [],
        payment_methods: (W.payment_methods || []).map((j) => ({
          payment_method: j.payment_method || "Unknown",
          total_amount: j.total_amount ?? 0,
          count: j.count ?? 0,
          total_amount_by_currency: j.total_amount_by_currency ?? []
        }))
      }));
      return {
        airline_name: P.airline_name || s.airlineName,
        start_date: P.start_date || "",
        end_date: P.end_date || "",
        total_conversations: P.total_conversations ?? 0,
        total_amount: P.total_amount ?? 0,
        total_amount_by_currency: P.total_amount_by_currency ?? [],
        payment_method_breakdown: E,
        payment_method_by_day: V
      };
    }, x = async () => {
      if (!(!s.fetchFunction || !s.dates || s.dates.length < 2 || !s.airlineName)) {
        i.value = !0;
        try {
          const [P, E] = s.dates.map((W) => At(W).format("YYYY-MM-DD")), V = await s.fetchFunction(s.airlineName, P, E);
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
    ], p = (P) => {
      const E = b[P % b.length];
      return {
        background: E.bg,
        borderColor: E.border
      };
    }, m = (P) => ({ color: b[P % b.length].text }), w = (P) => ({ color: b[P % b.length].value }), k = (P) => ({ color: b[P % b.length].icon }), M = (P) => ({ color: b[P % b.length].badge }), S = (P) => {
      const V = T(P).length;
      return V > 18 ? { fontSize: "0.75rem" } : V > 15 ? { fontSize: "0.875rem" } : V > 12 ? { fontSize: "1rem" } : { fontSize: "1.125rem" };
    }, D = (P) => {
      const E = P?.toLowerCase() || "";
      return !P || E === "unknown" ? Ng : E.includes("credit") || E.includes("debit") ? Mo : E.includes("cash") || E.includes("efectivo") ? Fg : E.includes("bank") || E.includes("transfer") ? Pg : E.includes("zelle") || E.includes("pago") || E.includes("movil") ? zg : E.includes("wallet") ? Wg : Vg;
    }, A = (P) => !P || P.toLowerCase() === "unknown" ? Y1 : P.replace(/_/g, " "), T = (P) => P == null ? "$0.00" : vt(P), L = (P) => P ? At(P).format("DD/MM/YYYY") : "-", I = (P) => P == null || Number.isNaN(Number(P)) ? 0 : Number(P), O = (P) => {
      n("export", P);
    };
    function X() {
      const P = s.data;
      P && (Array.isArray(P.payment_method_breakdown) && P.payment_method_breakdown.length > 0 || Array.isArray(P.payment_method_by_day) && P.payment_method_by_day.length > 0) && (i.value = !1, r.value = f(P));
    }
    return re(() => {
      s.data ? X() : x();
    }), Et(
      () => s.data,
      (P) => {
        P && X();
      },
      { deep: !0 }
    ), Et(
      () => s.dates,
      (P) => {
        s.data || P && P[0] && P[1] && x();
      },
      { deep: !0 }
    ), t({ isDark: o }), (P, E) => (y(), _("article", h1, [
      l("header", f1, [
        l("div", g1, [
          E[2] || (E[2] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "Payment Method Metrics"),
            l("p", { class: "card-subtitle" }, "Sales breakdown by payment method")
          ], -1)),
          !i.value && r.value.total_amount ? (y(), _("div", p1, [
            E[1] || (E[1] = l("p", { class: "badge-label" }, "Total Amount", -1)),
            r.value.total_amount_by_currency && r.value.total_amount_by_currency.length > 0 ? (y(), _("div", v1, [
              (y(!0), _(q, null, tt(r.value.total_amount_by_currency, (V) => (y(), _("p", {
                key: V.currency,
                class: "currency-breakdown-item"
              }, $(V.currency) + " " + $(T(V.total_value)), 1))), 128))
            ])) : (y(), _("p", b1, $(T(r.value.total_amount)), 1))
          ])) : R("", !0)
        ])
      ]),
      i.value ? (y(), _("div", m1, [...E[3] || (E[3] = [
        st('<div class="loading-container" data-v-ff4ce0b7><div class="chart-lines-loader" data-v-ff4ce0b7><div class="line line-1" data-v-ff4ce0b7></div><div class="line line-2" data-v-ff4ce0b7></div><div class="line line-3" data-v-ff4ce0b7></div><div class="line line-4" data-v-ff4ce0b7></div><div class="line line-5" data-v-ff4ce0b7></div></div><p class="loading-text" data-v-ff4ce0b7>Loading payment data...</p></div>', 1)
      ])])) : (y(), _("div", y1, [
        c.value ? (y(), _("section", _1, [
          E[4] || (E[4] = l("p", { class: "section-label" }, "Sales by Payment Method", -1)),
          l("div", x1, [
            (y(!0), _(q, null, tt(r.value.payment_method_breakdown, (V, W) => (y(), _("div", {
              key: V.payment_method,
              class: "payment-method-card-item",
              style: xt(p(W))
            }, [
              l("div", k1, [
                l("div", w1, [
                  (y(), ht(Fs(D(V.payment_method)), {
                    class: "payment-icon",
                    style: xt(k(W))
                  }, null, 8, ["style"])),
                  l("span", {
                    class: "payment-name",
                    style: xt(m(W))
                  }, $(A(V.payment_method)), 5)
                ]),
                l("p", {
                  class: "payment-amount",
                  style: xt([w(W), S(V.total_amount)])
                }, $(T(V.total_amount)), 5),
                V.total_amount_by_currency && V.total_amount_by_currency.length > 0 ? (y(), _("div", $1, [
                  (y(!0), _(q, null, tt(V.total_amount_by_currency, (j) => (y(), _("span", {
                    key: `${V.payment_method}-${j.currency}`
                  }, $(j.currency) + " " + $(T(j.total_value)), 1))), 128))
                ])) : R("", !0),
                l("div", M1, [
                  l("span", {
                    class: "payment-badge",
                    style: xt(M(W))
                  }, $(I(V.count)) + " " + $(I(V.count) === 1 ? "sale" : "sales"), 5)
                ])
              ])
            ], 4))), 128))
          ])
        ])) : (y(), _("section", C1, [
          l("div", S1, [
            l("div", D1, [
              Q(B(Mo), { class: "empty-icon" })
            ]),
            E[5] || (E[5] = l("p", { class: "empty-title" }, "No payment data available", -1)),
            E[6] || (E[6] = l("p", { class: "empty-description" }, "No payment method data found for the selected period. Try adjusting the date range.", -1))
          ])
        ])),
        d.value ? (y(), _("section", A1, [
          E[10] || (E[10] = l("p", { class: "section-label" }, "Daily Breakdown", -1)),
          l("div", T1, [
            l("table", B1, [
              E[8] || (E[8] = l("thead", null, [
                l("tr", { class: "table-header-row" }, [
                  l("th", { class: "table-header text-left" }, "Date"),
                  l("th", { class: "table-header text-center" }, "Total Sales"),
                  l("th", { class: "table-header text-center" }, "Total Amount"),
                  l("th", { class: "table-header text-left" }, "Payment Methods")
                ])
              ], -1)),
              l("tbody", L1, [
                (y(!0), _(q, null, tt(g.value, (V) => (y(), _("tr", {
                  key: V.date,
                  class: "table-row"
                }, [
                  l("td", F1, $(L(V.date)), 1),
                  l("td", P1, $(B(U)(V.total_count ?? 0)), 1),
                  l("td", E1, [
                    V.total_amount_by_currency && V.total_amount_by_currency.length > 0 ? (y(), _("div", R1, [
                      (y(!0), _(q, null, tt(V.total_amount_by_currency, (W) => (y(), _("span", {
                        key: `${V.date}-${W.currency}`
                      }, $(W.currency) + " " + $(T(W.total_value)), 1))), 128))
                    ])) : (y(), _("span", I1, $(T(V.total_amount)), 1))
                  ]),
                  l("td", O1, [
                    l("div", V1, [
                      (y(!0), _(q, null, tt(V.payment_methods || [], (W) => (y(), _("div", {
                        key: W.payment_method,
                        class: "payment-tag"
                      }, [
                        l("span", z1, $(A(W.payment_method)), 1),
                        E[7] || (E[7] = l("span", { class: "tag-separator" }, "•", -1)),
                        !W.total_amount_by_currency || W.total_amount_by_currency.length === 0 ? (y(), _("span", N1, $(T(W.total_amount)), 1)) : (y(), _("span", W1, $(W.total_amount_by_currency.map((j) => `${j.currency} ${T(j.total_value)}`).join(" / ")), 1)),
                        l("span", H1, "(" + $(I(W.count)) + ")", 1)
                      ]))), 128))
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          v.value ? (y(), _("button", {
            key: 0,
            class: "view-more-btn",
            onClick: E[0] || (E[0] = (V) => u.value = !u.value)
          }, [
            kt($(u.value ? "View less" : `View more (${h.value.length - ys} more rows)`) + " ", 1),
            (y(), _("svg", {
              class: K(["view-more-icon", { "view-more-icon-rotated": u.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...E[9] || (E[9] = [
              l("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : R("", !0),
          e.enableExport ? (y(), ht(B(_t), {
            key: 1,
            onExport: O,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : R("", !0)
        ])) : c.value ? (y(), _("div", j1, [...E[11] || (E[11] = [
          l("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
        ])])) : R("", !0)
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
}, uy = { class: "date-header" }, hy = { class: "date-title" }, fy = { class: "date-stats" }, gy = { class: "stat-item assigned-stat" }, py = { class: "stat-value" }, vy = { class: "stat-value" }, by = { class: "stat-item closed-stat" }, my = { class: "stat-value" }, yy = { class: "stat-value" }, _y = { class: "table-wrapper" }, xy = { class: "data-table" }, ky = { class: "table-body" }, wy = { class: "table-cell name-cell" }, $y = { class: "table-cell email-cell" }, My = { class: "table-cell text-center" }, Cy = { class: "metric-cell-content" }, Sy = { class: "badge assigned-badge" }, Dy = { class: "metric-cell-avg" }, Ay = { class: "table-cell text-center" }, Ty = { class: "metric-cell-content" }, By = { class: "badge closed-badge" }, Ly = { class: "metric-cell-avg" }, Fy = {
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
    }, { isDark: i } = ct(lt(s, "theme")), r = C(() => s.data?.agents_by_day && s.data.agents_by_day.length > 0), c = C(() => {
      if (!r.value) return {};
      const b = {};
      for (const w of s.data.agents_by_day)
        b[w.date] || (b[w.date] = []), b[w.date].push(w);
      const p = Object.keys(b).sort((w, k) => new Date(w).getTime() - new Date(k).getTime()), m = {};
      for (const w of p)
        m[w] = b[w];
      return m;
    }), d = (b) => b == null ? "0" : U(b), u = (b) => {
      if (b == null)
        return "AVG";
      if (b < 60)
        return `${Math.round(b)}s`;
      const p = Math.round(b), m = Math.floor(p / 60), w = p % 60;
      if (m < 60)
        return `${m}m ${w}s`;
      const k = Math.floor(m / 60), M = m % 60;
      return `${k}h ${M}m`;
    }, h = (b) => {
      const p = new Date(b), m = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return p.toLocaleDateString("en-US", m);
    }, g = (b) => b[0]?.day_total_assigned ?? 0, v = (b) => b[0]?.day_total_closed ?? 0, f = (b) => b[0]?.day_avg_time_to_assign_seconds ?? null, x = (b) => b[0]?.day_avg_conversation_duration_seconds ?? null;
    return t({ isDark: i }), (b, p) => (y(), _("article", q1, [
      p[11] || (p[11] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Agent Human Conversations"),
          l("p", { class: "card-subtitle" }, "Human conversation assignments and closures by agent")
        ])
      ], -1)),
      e.loading ? (y(), _("div", X1, [...p[0] || (p[0] = [
        st('<div class="loading-container" data-v-6cfba83b><div class="chart-bars-loader" data-v-6cfba83b><div class="bar bar-1" data-v-6cfba83b></div><div class="bar bar-2" data-v-6cfba83b></div><div class="bar bar-3" data-v-6cfba83b></div><div class="bar bar-4" data-v-6cfba83b></div><div class="bar bar-5" data-v-6cfba83b></div></div><p class="loading-text" data-v-6cfba83b>Loading agent data...</p></div>', 1)
      ])])) : (y(), _("div", G1, [
        l("div", Z1, [
          l("div", Q1, [
            p[3] || (p[3] = l("div", { class: "card-decoration" }, null, -1)),
            l("div", J1, [
              l("div", ty, [
                p[1] || (p[1] = l("p", { class: "card-label" }, "Total Assigned", -1)),
                l("p", ey, $(d(e.data.total_assigned)), 1)
              ]),
              l("div", ay, [
                p[2] || (p[2] = l("p", { class: "card-label" }, "AVG time to assign", -1)),
                l("p", sy, $(u(e.data.avg_time_to_assign_seconds)), 1)
              ])
            ])
          ]),
          l("div", ny, [
            p[6] || (p[6] = l("div", { class: "card-decoration" }, null, -1)),
            l("div", oy, [
              l("div", iy, [
                p[4] || (p[4] = l("p", { class: "card-label" }, "Total Closed", -1)),
                l("p", ry, $(d(e.data.total_closed)), 1)
              ]),
              l("div", ly, [
                p[5] || (p[5] = l("p", { class: "card-label" }, "AVG time to close", -1)),
                l("p", cy, $(u(e.data.avg_conversation_duration_seconds)), 1)
              ])
            ])
          ])
        ]),
        r.value ? (y(), _("div", dy, [
          (y(!0), _(q, null, tt(c.value, (m, w) => (y(), _("div", {
            key: w,
            class: "date-group"
          }, [
            l("div", uy, [
              l("h4", hy, $(h(w)), 1),
              l("div", fy, [
                l("span", gy, [
                  l("span", py, $(d(g(m))), 1),
                  p[7] || (p[7] = kt(" Assigned ", -1)),
                  l("span", vy, $(u(f(m))), 1)
                ]),
                l("span", by, [
                  l("span", my, $(d(v(m))), 1),
                  p[8] || (p[8] = kt(" Closed ", -1)),
                  l("span", yy, $(u(x(m))), 1)
                ])
              ])
            ]),
            l("div", _y, [
              l("table", xy, [
                p[9] || (p[9] = l("thead", null, [
                  l("tr", { class: "table-header-row" }, [
                    l("th", { class: "table-header" }, "Agent Name"),
                    l("th", { class: "table-header" }, "Email"),
                    l("th", { class: "table-header" }, "Assigned (AVG time to assign)"),
                    l("th", { class: "table-header" }, "Closed (AVG time to close)")
                  ])
                ], -1)),
                l("tbody", ky, [
                  (y(!0), _(q, null, tt(m, (k) => (y(), _("tr", {
                    key: `${w}-${k.agent_email}`,
                    class: "table-row"
                  }, [
                    l("td", wy, $(k.agent_name || "-"), 1),
                    l("td", $y, $(k.agent_email), 1),
                    l("td", My, [
                      l("div", Cy, [
                        l("span", Sy, $(d(k.assigned_count)), 1),
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
          e.enableExport ? (y(), ht(B(_t), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : R("", !0)
        ])) : (y(), _("div", Fy, [...p[10] || (p[10] = [
          st('<div class="empty-state-content" data-v-6cfba83b><div class="empty-icon-wrapper" data-v-6cfba83b><svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6cfba83b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-6cfba83b></path></svg></div><p class="empty-title" data-v-6cfba83b>No agent human conversation data available</p><p class="empty-description" data-v-6cfba83b>Try adjusting the date range or check your filters.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Ey = /* @__PURE__ */ nt(Py, [["__scopeId", "data-v-6cfba83b"]]), Ry = { class: "channel-metrics-card" }, Iy = {
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
    const s = e, n = a, o = (g) => {
      n("export", g);
    }, { isDark: i, colors: r } = ct(lt(s, "theme")), c = at({ labels: [], datasets: [] }), d = C(() => s.data ?? {
      channels_by_day: {},
      total_by_channel: {},
      total_conversations: 0
    }), u = C(() => ({
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
    })), h = (g) => {
      if (!g || !g.channels_by_day) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const v = g.channels_by_day, f = Object.keys(v).sort();
      if (f.length === 0) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const x = /* @__PURE__ */ new Set();
      for (const w of Object.values(v))
        for (const k of Object.keys(w))
          x.add(k);
      const b = Array.from(x), p = {
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
      }, m = b.map((w) => {
        const k = w.toLowerCase(), M = p[k] || "#9ca3af";
        return {
          label: w.toUpperCase(),
          data: f.map((S) => v[S]?.[w] || 0),
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
        datasets: m
      };
    };
    return Et(
      () => s.data,
      (g) => {
        h(g ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: i }), (g, v) => (y(), _("article", Ry, [
      v[3] || (v[3] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Channel Metrics"),
          l("p", { class: "card-subtitle" }, "Communication channels performance")
        ])
      ], -1)),
      s.loading ? (y(), _("div", Yy, [...v[2] || (v[2] = [
        st('<div class="loading-container" data-v-82f175d2><div class="chart-bars-loader" data-v-82f175d2><div class="bar bar-1" data-v-82f175d2></div><div class="bar bar-2" data-v-82f175d2></div><div class="bar bar-3" data-v-82f175d2></div><div class="bar bar-4" data-v-82f175d2></div><div class="bar bar-5" data-v-82f175d2></div></div><p class="loading-text" data-v-82f175d2>Loading channel metrics...</p></div>', 1)
      ])])) : (y(), _("div", Iy, [
        Object.keys(d.value.total_by_channel).length ? (y(), _("div", Oy, [
          (y(!0), _(q, null, tt(Object.keys(d.value.total_by_channel), (f) => (y(), _("div", {
            class: "kpi-card",
            key: f
          }, [
            l("span", Vy, $(f.toUpperCase()), 1),
            l("span", zy, $(B(U)(d.value.total_by_channel[f])), 1)
          ]))), 128)),
          l("div", Ny, [
            v[0] || (v[0] = l("span", { class: "kpi-label" }, "Total Conversations", -1)),
            l("span", Wy, $(B(U)(d.value.total_conversations)), 1)
          ])
        ])) : R("", !0),
        c.value.labels && c.value.labels.length ? (y(), _("section", Hy, [
          Q(ye, {
            data: c.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ht(B(_t), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : R("", !0)
        ])) : (y(), _("section", jy, [...v[1] || (v[1] = [
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
    const s = e, n = a, o = (p) => {
      n("export", p);
    }, { isDark: i, colors: r } = ct(lt(s, "theme")), c = C(() => {
      const p = s.data?.combinations || {}, m = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [w, k] of Object.entries(p)) {
        const M = w.split("+").filter(Boolean);
        if (!M.includes("triage")) continue;
        const S = M.filter((D) => D !== "triage").length;
        S >= 4 ? m["4p"] += Number(k) || 0 : m[S] += Number(k) || 0;
      }
      return m;
    }), d = C(() => {
      const p = c.value;
      return p[0] + p[1] + p[2] + p[3] + p["4p"] || 0;
    }), u = C(() => Object.keys(s.data?.combinations || {}).length > 0), h = C(() => {
      const p = d.value;
      if (!p) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const m = c.value;
      return {
        pct0: m[0] / p * 100,
        pct1: m[1] / p * 100,
        pct2: m[2] / p * 100,
        pct3: m[3] / p * 100,
        pct4p: m["4p"] / p * 100
      };
    }), g = {
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
    }, v = (p) => p?.replace("80", "") || "#888888", f = C(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [h.value.pct0],
          backgroundColor: g.c0,
          borderColor: v(g.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [h.value.pct1],
          backgroundColor: g.c1,
          borderColor: v(g.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [h.value.pct2],
          backgroundColor: g.c2,
          borderColor: v(g.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [h.value.pct3],
          backgroundColor: g.c3,
          borderColor: v(g.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [h.value.pct4p],
          backgroundColor: g.c4p,
          borderColor: v(g.c4p),
          borderWidth: 1
        }
      ]
    })), x = C(() => ({
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
            label: (p) => `${p.dataset.label} intent(s): ${Number(p.raw || 0).toFixed(0)}%`
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
    })), b = (p) => `${(Number(p) || 0).toFixed(0)}`;
    return t({ isDark: i }), (p, m) => (y(), _("article", qy, [
      l("header", Xy, [
        m[0] || (m[0] = l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Distribution of Number of Intents"),
          l("p", { class: "card-subtitle" }, "Analysis of intent combinations per conversation")
        ], -1)),
        l("span", Gy, " Total: " + $(d.value), 1)
      ]),
      e.loading ? (y(), _("div", d_, [...m[6] || (m[6] = [
        st('<div class="loading-container" data-v-cb93cda2><div class="chart-bars-loader" data-v-cb93cda2><div class="bar bar-1" data-v-cb93cda2></div><div class="bar bar-2" data-v-cb93cda2></div><div class="bar bar-3" data-v-cb93cda2></div><div class="bar bar-4" data-v-cb93cda2></div><div class="bar bar-5" data-v-cb93cda2></div></div><p class="loading-text" data-v-cb93cda2>Loading intent distribution...</p></div>', 1)
      ])])) : (y(), _("div", Zy, [
        u.value ? (y(), _(q, { key: 0 }, [
          l("div", Qy, [
            Q(ie, {
              data: f.value,
              options: x.value
            }, null, 8, ["data", "options"])
          ]),
          l("div", Jy, [
            m[3] || (m[3] = st('<div class="table-header" data-v-cb93cda2><div class="table-cell header-cell" data-v-cb93cda2>Number of intentions</div><div class="table-cell header-cell text-center" data-v-cb93cda2>0</div><div class="table-cell header-cell text-center" data-v-cb93cda2>1</div><div class="table-cell header-cell text-center" data-v-cb93cda2>2</div><div class="table-cell header-cell text-center" data-v-cb93cda2>3</div><div class="table-cell header-cell text-center" data-v-cb93cda2>4 or more</div></div>', 1)),
            l("div", t_, [
              m[1] || (m[1] = l("div", { class: "table-cell row-label" }, "% of total", -1)),
              l("div", {
                class: "table-cell text-center percentage-cell",
                style: xt({ color: v(g.c0) })
              }, $(b(h.value.pct0)) + "% ", 5),
              l("div", {
                class: "table-cell text-center percentage-cell",
                style: xt({ color: v(g.c1) })
              }, $(b(h.value.pct1)) + "% ", 5),
              l("div", {
                class: "table-cell text-center percentage-cell",
                style: xt({ color: v(g.c2) })
              }, $(b(h.value.pct2)) + "% ", 5),
              l("div", {
                class: "table-cell text-center percentage-cell",
                style: xt({ color: v(g.c3) })
              }, $(b(h.value.pct3)) + "% ", 5),
              l("div", {
                class: "table-cell text-center percentage-cell",
                style: xt({ color: v(g.c4p) })
              }, $(b(h.value.pct4p)) + "% ", 5)
            ]),
            l("div", e_, [
              m[2] || (m[2] = l("div", { class: "table-cell row-label" }, "Count", -1)),
              l("div", a_, $(B(U)(c.value[0])), 1),
              l("div", s_, $(B(U)(c.value[1])), 1),
              l("div", n_, $(B(U)(c.value[2])), 1),
              l("div", o_, $(B(U)(c.value[3])), 1),
              l("div", i_, $(B(U)(c.value["4p"])), 1)
            ])
          ]),
          e.enableExport ? (y(), ht(B(_t), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : R("", !0)
        ], 64)) : (y(), _("div", r_, [
          l("div", l_, [
            l("div", c_, [
              Q(B(Ot), { class: "empty-icon" })
            ]),
            m[4] || (m[4] = l("p", { class: "empty-title" }, "No triage combinations data", -1)),
            m[5] || (m[5] = l("p", { class: "empty-description" }, "No intent distribution data found for the selected period. Try adjusting the date range.", -1))
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
    }, r = (v) => i[v]?.label || v.toUpperCase(), c = C(
      () => a.data?.items && a.data.items.length > 0
    ), d = C(
      () => (a.data?.items || []).reduce((v, f) => v + f.count, 0)
    ), u = C(() => {
      const v = {};
      for (const f of a.data?.items || [])
        v[f.language] = (v[f.language] || 0) + f.count;
      return Object.entries(v).map(([f, x]) => ({ language: f, count: x })).sort((f, x) => x.count - f.count);
    }), h = C(() => ({
      labels: u.value.map((v) => r(v.language)),
      datasets: [{
        data: u.value.map((v) => v.count),
        backgroundColor: u.value.map((v, f) => o[f % o.length] + "80"),
        borderColor: u.value.map((v, f) => o[f % o.length]),
        borderWidth: 2,
        hoverOffset: 6
      }]
    })), g = C(() => ({
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
              const f = v.raw || 0, x = d.value > 0 ? (f / d.value * 100).toFixed(1) : "0";
              return ` ${v.label}: ${f} (${x}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: s }), (v, f) => (y(), _("article", f_, [
      l("header", g_, [
        l("div", p_, [
          f[1] || (f[1] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "Language Selection"),
            l("p", { class: "card-subtitle" }, "Language distribution across conversations")
          ], -1)),
          a.loading ? R("", !0) : (y(), _("div", v_, [
            f[0] || (f[0] = l("p", { class: "badge-label" }, "Total", -1)),
            l("p", b_, $(B(U)(d.value)), 1)
          ]))
        ])
      ]),
      a.loading ? (y(), _("div", m_, [...f[2] || (f[2] = [
        st('<div class="loading-container" data-v-216eadc2><div class="chart-bars-loader" data-v-216eadc2><div class="bar bar-1" data-v-216eadc2></div><div class="bar bar-2" data-v-216eadc2></div><div class="bar bar-3" data-v-216eadc2></div><div class="bar bar-4" data-v-216eadc2></div><div class="bar bar-5" data-v-216eadc2></div></div><p class="loading-text" data-v-216eadc2>Loading language data...</p></div>', 1)
      ])])) : (y(), _("div", y_, [
        c.value ? (y(), _("section", __, [
          Q(Za, {
            data: h.value,
            options: g.value
          }, null, 8, ["data", "options"])
        ])) : (y(), _("section", x_, [...f[3] || (f[3] = [
          st('<div class="empty-state-content" data-v-216eadc2><div class="empty-icon-wrapper" data-v-216eadc2><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-216eadc2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" data-v-216eadc2></path></svg></div><p class="empty-title" data-v-216eadc2>No language data available</p><p class="empty-description" data-v-216eadc2>No language selection data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), w_ = /* @__PURE__ */ nt(k_, [["__scopeId", "data-v-216eadc2"]]), $_ = { class: "guardrails-card" }, M_ = { class: "card-header" }, C_ = { class: "header-content" }, S_ = {
  key: 0,
  class: "total-badge"
}, D_ = { class: "badge-value" }, A_ = {
  key: 0,
  class: "loading-state"
}, T_ = {
  key: 1,
  class: "card-body"
}, B_ = { class: "summary-card" }, L_ = { class: "summary-items" }, F_ = { class: "summary-item" }, P_ = { class: "summary-value" }, E_ = { class: "summary-pct" }, R_ = { class: "summary-item" }, I_ = { class: "summary-pct" }, O_ = { class: "summary-item" }, V_ = { class: "summary-value" }, z_ = { class: "summary-pct" }, N_ = {
  key: 0,
  class: "table-section"
}, W_ = { class: "table-wrapper" }, H_ = { class: "data-table" }, j_ = { class: "table-body" }, Y_ = { class: "table-cell font-medium text-center" }, K_ = { class: "table-cell text-center font-semibold" }, U_ = { class: "table-cell" }, q_ = { class: "type-badges-row" }, X_ = {
  key: 1,
  class: "empty-state"
}, _s = 3, G_ = /* @__PURE__ */ J({
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
    const s = e, n = a, o = (p) => {
      n("export", p);
    }, { isDark: i } = ct(lt(s, "theme")), r = C(
      () => s.data?.items && s.data.items.length > 0
    ), c = C(
      () => (s.data?.items || []).reduce((p, m) => p + m.count, 0)
    ), d = (p) => {
      const m = {};
      for (const M of s.data?.items || [])
        m[M[p]] = (m[M[p]] || 0) + M.count;
      const w = Object.entries(m).sort((M, S) => S[1] - M[1]);
      if (w.length === 0) return { name: "—", pct: 0 };
      const k = c.value;
      return {
        name: w[0][0],
        pct: k > 0 ? Math.round(w[0][1] / k * 100) : 0
      };
    }, u = C(() => d("guardrail_type")), h = C(() => d("guardrail_action")), g = C(() => d("guardrail_source")), v = C(() => {
      const p = {};
      for (const m of s.data?.items || [])
        p[m.date] || (p[m.date] = {}), p[m.date][m.guardrail_type] = (p[m.date][m.guardrail_type] || 0) + m.count;
      return Object.entries(p).map(([m, w]) => ({
        date: m,
        total: Object.values(w).reduce((k, M) => k + M, 0),
        types: Object.entries(w).map(([k, M]) => ({ type: k, count: M })).sort((k, M) => M.count - k.count)
      })).sort((m, w) => new Date(m.date).getTime() - new Date(w.date).getTime());
    }), f = at(!1), x = C(() => f.value ? v.value : v.value.slice(0, _s)), b = C(() => v.value.length > _s);
    return t({ isDark: i }), (p, m) => (y(), _("article", $_, [
      l("header", M_, [
        l("div", C_, [
          m[2] || (m[2] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "Guardrails Metrics"),
            l("p", { class: "card-subtitle" }, "Content safety guardrail events and actions")
          ], -1)),
          s.loading ? R("", !0) : (y(), _("div", S_, [
            m[1] || (m[1] = l("p", { class: "badge-label" }, "Total Events", -1)),
            l("p", D_, $(B(U)(c.value)), 1)
          ]))
        ])
      ]),
      s.loading ? (y(), _("div", A_, [...m[3] || (m[3] = [
        st('<div class="loading-container" data-v-02a2e95e><div class="chart-bars-loader" data-v-02a2e95e><div class="bar bar-1" data-v-02a2e95e></div><div class="bar bar-2" data-v-02a2e95e></div><div class="bar bar-3" data-v-02a2e95e></div><div class="bar bar-4" data-v-02a2e95e></div><div class="bar bar-5" data-v-02a2e95e></div></div><p class="loading-text" data-v-02a2e95e>Loading guardrails data...</p></div>', 1)
      ])])) : (y(), _("div", T_, [
        r.value ? (y(), _(q, { key: 0 }, [
          l("div", B_, [
            l("div", L_, [
              l("div", F_, [
                m[4] || (m[4] = l("span", { class: "summary-label" }, "Top type:", -1)),
                l("span", P_, $(u.value.name), 1),
                l("span", E_, "(" + $(u.value.pct) + "%)", 1)
              ]),
              m[7] || (m[7] = l("span", { class: "summary-dot" }, "·", -1)),
              l("div", R_, [
                m[5] || (m[5] = l("span", { class: "summary-label" }, "Top action:", -1)),
                l("span", {
                  class: K(["summary-value", `summary-action-${h.value.name.toLowerCase()}`])
                }, $(h.value.name), 3),
                l("span", I_, "(" + $(h.value.pct) + "%)", 1)
              ]),
              m[8] || (m[8] = l("span", { class: "summary-dot" }, "·", -1)),
              l("div", O_, [
                m[6] || (m[6] = l("span", { class: "summary-label" }, "Top source:", -1)),
                l("span", V_, $(g.value.name), 1),
                l("span", z_, "(" + $(g.value.pct) + "%)", 1)
              ])
            ])
          ]),
          v.value.length > 0 ? (y(), _("section", N_, [
            m[11] || (m[11] = l("div", { class: "section-header" }, [
              l("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            l("div", W_, [
              l("table", H_, [
                m[9] || (m[9] = l("thead", null, [
                  l("tr", { class: "table-header-row" }, [
                    l("th", { class: "table-header" }, "Date"),
                    l("th", { class: "table-header text-center" }, "Count"),
                    l("th", { class: "table-header" }, "Types")
                  ])
                ], -1)),
                l("tbody", j_, [
                  (y(!0), _(q, null, tt(x.value, (w) => (y(), _("tr", {
                    key: w.date,
                    class: "table-row"
                  }, [
                    l("td", Y_, $(B(At)(w.date).format("DD/MM")), 1),
                    l("td", K_, $(B(U)(w.total)), 1),
                    l("td", U_, [
                      l("div", q_, [
                        (y(!0), _(q, null, tt(w.types, (k) => (y(), _("span", {
                          key: k.type,
                          class: "type-count-badge"
                        }, $(k.type) + " (" + $(k.count) + ") ", 1))), 128))
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ]),
            b.value ? (y(), _("button", {
              key: 0,
              class: "view-more-btn",
              onClick: m[0] || (m[0] = (w) => f.value = !f.value)
            }, [
              kt($(f.value ? "View less" : `View more (${v.value.length - _s} more rows)`) + " ", 1),
              (y(), _("svg", {
                class: K(["view-more-icon", { "view-more-icon-rotated": f.value }]),
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [...m[10] || (m[10] = [
                l("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M19 9l-7 7-7-7"
                }, null, -1)
              ])], 2))
            ])) : R("", !0),
            e.enableExport ? (y(), ht(B(_t), {
              key: 1,
              onExport: o,
              loading: e.exportLoading
            }, null, 8, ["loading"])) : R("", !0)
          ])) : R("", !0)
        ], 64)) : (y(), _("section", X_, [...m[12] || (m[12] = [
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
}, x2 = { class: "table-wrapper" }, k2 = { class: "data-table" }, w2 = { class: "table-body" }, $2 = { class: "table-cell text-left font-medium" }, M2 = { class: "table-cell text-center font-semibold" }, C2 = { class: "table-cell text-center" }, S2 = { class: "impact-bar-container" }, D2 = { class: "impact-label" }, A2 = {
  key: 1,
  class: "chart-section"
}, T2 = { class: "chart-wrapper" }, B2 = { class: "system-health" }, L2 = { class: "system-health-content" }, F2 = { class: "sys-kpi-grid" }, P2 = { class: "sys-kpi" }, E2 = { class: "sys-value" }, R2 = { class: "sys-kpi" }, I2 = { class: "sys-value" }, O2 = { class: "sys-kpi" }, V2 = { class: "sys-value sys-error" }, z2 = { class: "sys-kpi" }, N2 = { class: "sys-value" }, W2 = { class: "sys-kpi" }, H2 = { class: "sys-value" }, j2 = { class: "sys-kpi" }, Y2 = { class: "sys-value sys-error" }, K2 = {
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
    }, { isDark: i, colors: r } = ct(lt(s, "theme")), c = C(() => {
      const k = s.data?.documentCounts?.items || [], M = s.data?.processingCounts?.items || [];
      return k.length > 0 || M.length > 0;
    }), d = C(() => {
      const k = s.data?.documentCounts?.items || [];
      return {
        processing_started: k.reduce((M, S) => M + S.processing_started, 0),
        processing_completed: k.reduce((M, S) => M + S.processing_completed, 0),
        processing_failed: k.reduce((M, S) => M + S.processing_failed, 0),
        row_count_total: k.reduce((M, S) => M + S.row_count_total, 0)
      };
    }), u = C(() => {
      const k = s.data?.processingCounts?.items || [];
      return {
        processing_started: k.reduce((M, S) => M + S.processing_started, 0),
        processing_success: k.reduce((M, S) => M + S.processing_success, 0),
        notification_sent: k.reduce((M, S) => M + S.notification_sent, 0),
        notification_failed: k.reduce((M, S) => M + S.notification_failed, 0),
        dq_phone: k.reduce((M, S) => M + S.dq_error_phone_not_found, 0),
        dq_flight: k.reduce((M, S) => M + S.dq_error_flight_not_found, 0),
        dq_booking: k.reduce((M, S) => M + S.dq_error_booking_not_found, 0),
        dq_other: k.reduce((M, S) => M + S.dq_error_other, 0),
        totalDqErrors: k.reduce((M, S) => M + S.dq_error_phone_not_found + S.dq_error_flight_not_found + S.dq_error_booking_not_found + S.dq_error_other, 0)
      };
    }), h = C(() => d.value.row_count_total || u.value.processing_started), g = C(() => Math.max(0, h.value - u.value.notification_sent)), v = (k, M) => M ? `${Math.round(k / M * 100)}%` : "0%", f = C(() => {
      const k = [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].filter((M) => M.count > 0).sort((M, S) => S.count - M.count);
      return k.length > 0 ? k[0] : { reason: "None", count: 0 };
    }), x = C(() => {
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
    }), b = C(() => {
      const k = h.value, M = u.value.processing_success, S = Math.max(0, M - u.value.totalDqErrors), D = u.value.notification_sent, A = Math.max(0, k - M), T = u.value.totalDqErrors, L = Math.max(0, S - D), I = (P, E) => {
        const V = E > 0 ? Math.round(P / E * 100) : 0;
        return `${P.toLocaleString()} (${V}%)`;
      }, O = [
        { name: "Records Detected" },
        { name: "Valid Reservations" },
        { name: "Invalid / Unprocessed" },
        { name: "Contactable" },
        { name: "Data Quality Issues" },
        { name: "Notified" },
        { name: "Not Delivered" }
      ], X = [];
      return M > 0 && X.push({ source: "Records Detected", target: "Valid Reservations", value: M, label: I(M, k) }), A > 0 && X.push({ source: "Records Detected", target: "Invalid / Unprocessed", value: A, label: I(A, k) }), S > 0 && X.push({ source: "Valid Reservations", target: "Contactable", value: S, label: I(S, k) }), T > 0 && X.push({ source: "Valid Reservations", target: "Data Quality Issues", value: T, label: I(T, k) }), D > 0 && X.push({ source: "Contactable", target: "Notified", value: D, label: I(D, k) }), L > 0 && X.push({ source: "Contactable", target: "Not Delivered", value: L, label: I(L, k) }), { nodes: O, links: X };
    }), p = {
      "Records Detected": "#DBEAFE",
      "Valid Reservations": "#D1FAE5",
      "Invalid / Unprocessed": "#FEE2E2",
      Contactable: "#BBF7D0",
      "Data Quality Issues": "#FED7AA",
      Notified: "#86EFAC",
      "Not Delivered": "#FCA5A5"
    }, m = C(() => {
      const k = [...s.data?.processingCounts?.items || []].sort(
        (I, O) => new Date(I.date).getTime() - new Date(O.date).getTime()
      ), M = s.data?.documentCounts?.items || [], S = {};
      for (const I of M)
        S[I.date] = (S[I.date] || 0) + I.row_count_total;
      const D = [.../* @__PURE__ */ new Set([...k.map((I) => I.date), ...M.map((I) => I.date)])].sort(), A = D.map((I) => At(I).format("MMM DD")), T = D.map((I) => {
        const O = k.find((E) => E.date === I), X = O?.notification_sent || 0, P = S[I] || O?.processing_started || 0;
        return P > 0 ? Math.round(X / P * 100) : 0;
      }), L = D.map((I) => k.find((X) => X.date === I)?.notification_sent || 0);
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
    }), w = C(() => ({
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
    return t({ isDark: i }), (k, M) => (y(), _("article", Q_, [
      l("header", J_, [
        l("div", t2, [
          M[1] || (M[1] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "Disruption Notifier"),
            l("p", { class: "card-subtitle" }, "Passenger notification effectiveness and delivery analysis")
          ], -1)),
          s.loading ? R("", !0) : (y(), _("div", e2, [
            M[0] || (M[0] = l("p", { class: "badge-label" }, "Total Records", -1)),
            l("p", a2, $(B(U)(d.value.row_count_total)), 1)
          ]))
        ])
      ]),
      s.loading ? (y(), _("div", s2, [...M[2] || (M[2] = [
        st('<div class="loading-container" data-v-d8baf32c><div class="chart-bars-loader" data-v-d8baf32c><div class="bar bar-1" data-v-d8baf32c></div><div class="bar bar-2" data-v-d8baf32c></div><div class="bar bar-3" data-v-d8baf32c></div><div class="bar bar-4" data-v-d8baf32c></div><div class="bar bar-5" data-v-d8baf32c></div></div><p class="loading-text" data-v-d8baf32c>Loading disruption notifier data...</p></div>', 1)
      ])])) : (y(), _("div", n2, [
        c.value ? (y(), _(q, { key: 0 }, [
          l("div", o2, [
            l("div", i2, [
              M[3] || (M[3] = l("span", { class: "kpi-label" }, "Passengers Affected", -1)),
              l("span", r2, $(B(U)(h.value)), 1)
            ]),
            l("div", l2, [
              M[4] || (M[4] = l("span", { class: "kpi-label" }, "Successfully Notified", -1)),
              l("span", c2, $(B(U)(u.value.notification_sent)), 1),
              l("span", d2, $(v(u.value.notification_sent, h.value)), 1)
            ]),
            l("div", u2, [
              M[5] || (M[5] = l("span", { class: "kpi-label" }, "Not Notified", -1)),
              l("span", h2, $(B(U)(g.value)), 1),
              l("span", f2, $(v(g.value, h.value)), 1)
            ]),
            l("div", g2, [
              M[6] || (M[6] = l("span", { class: "kpi-label" }, "Main Failure Reason", -1)),
              l("span", p2, $(f.value.reason), 1),
              l("span", v2, $(B(U)(f.value.count)) + " cases", 1)
            ])
          ]),
          l("section", b2, [
            M[8] || (M[8] = l("div", { class: "chart-header" }, [
              l("h4", { class: "section-title" }, "Passenger Disruption Funnel")
            ], -1)),
            l("div", m2, [
              b.value.nodes.length > 0 && b.value.links.length > 0 ? (y(), ht(_e, {
                key: 0,
                data: b.value,
                "node-colors": p,
                height: "350px"
              }, null, 8, ["data"])) : (y(), _("div", y2, [...M[7] || (M[7] = [
                l("p", { class: "empty-chart-text" }, "No processing data available for visualization", -1)
              ])]))
            ])
          ]),
          x.value.length > 0 ? (y(), _("section", _2, [
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
                  (y(!0), _(q, null, tt(x.value, (S) => (y(), _("tr", {
                    key: S.reason,
                    class: "table-row"
                  }, [
                    l("td", $2, $(S.reason), 1),
                    l("td", M2, $(B(U)(S.count)), 1),
                    l("td", C2, [
                      l("div", S2, [
                        l("div", {
                          class: "impact-bar",
                          style: xt({ width: S.impactPct + "%" })
                        }, null, 4),
                        l("span", D2, $(S.impactPct) + "%", 1)
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ])
          ])) : R("", !0),
          m.value.labels.length > 0 ? (y(), _("section", A2, [
            M[11] || (M[11] = l("div", { class: "chart-header" }, [
              l("h4", { class: "section-title" }, "Notification Success Rate by Day")
            ], -1)),
            l("div", T2, [
              Q(ye, {
                data: m.value,
                options: w.value
              }, null, 8, ["data", "options"])
            ])
          ])) : R("", !0),
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
                  l("span", E2, $(B(U)(d.value.processing_started)), 1)
                ]),
                l("div", R2, [
                  M[13] || (M[13] = l("span", { class: "sys-label" }, "Docs Completed", -1)),
                  l("span", I2, $(B(U)(d.value.processing_completed)), 1)
                ]),
                l("div", O2, [
                  M[14] || (M[14] = l("span", { class: "sys-label" }, "Docs Failed", -1)),
                  l("span", V2, $(B(U)(d.value.processing_failed)), 1)
                ]),
                l("div", z2, [
                  M[15] || (M[15] = l("span", { class: "sys-label" }, "Processing Started", -1)),
                  l("span", N2, $(B(U)(u.value.processing_started)), 1)
                ]),
                l("div", W2, [
                  M[16] || (M[16] = l("span", { class: "sys-label" }, "Processing Success", -1)),
                  l("span", H2, $(B(U)(u.value.processing_success)), 1)
                ]),
                l("div", j2, [
                  M[17] || (M[17] = l("span", { class: "sys-label" }, "Notification Failed", -1)),
                  l("span", Y2, $(B(U)(u.value.notification_failed)), 1)
                ])
              ])
            ])
          ]),
          e.enableExport ? (y(), ht(B(_t), {
            key: 2,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : R("", !0)
        ], 64)) : (y(), _("section", K2, [...M[19] || (M[19] = [
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
    const a = e, { isDark: s } = ct(lt(a, "theme")), n = C(() => U(a.totalConversations)), o = C(
      () => a.previousTotalConversations !== null && a.previousTotalConversations !== void 0
    ), i = C(() => {
      if (!o.value) return 0;
      const d = a.previousTotalConversations;
      return d === 0 ? a.totalConversations > 0 ? 100 : 0 : (a.totalConversations - d) / d * 100;
    }), r = C(() => `${i.value > 0 ? "+" : ""}${i.value.toFixed(1)}% vs prev.`), c = C(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: s, changePercent: i }), (d, u) => (y(), _("article", {
      class: K(["highlight-card", { "highlight-card--dark": B(s) }])
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
        !e.loading && o.value ? (y(), _("div", {
          key: 0,
          class: K(["change-badge", c.value])
        }, $(r.value), 3)) : R("", !0)
      ]),
      e.loading ? (y(), _("div", G2, [...u[1] || (u[1] = [
        l("div", { class: "shimmer shimmer-value" }, null, -1),
        l("div", { class: "shimmer shimmer-label" }, null, -1)
      ])])) : (y(), _("div", Z2, [
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
    const a = e, { isDark: s } = ct(lt(a, "theme")), n = C(() => `${a.csatP95.toFixed(1)}`), o = C(
      () => a.previousCsatP95 !== null && a.previousCsatP95 !== void 0
    ), i = C(() => {
      if (!o.value) return 0;
      const d = a.previousCsatP95;
      return d === 0 ? a.csatP95 > 0 ? 100 : 0 : (a.csatP95 - d) / d * 100;
    }), r = C(() => `${i.value > 0 ? "+" : ""}${i.value.toFixed(1)}% vs prev.`), c = C(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: s, changePercent: i }), (d, u) => (y(), _("article", {
      class: K(["highlight-card", { "highlight-card--dark": B(s) }])
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
        !e.loading && o.value ? (y(), _("div", {
          key: 0,
          class: K(["change-badge", c.value])
        }, $(r.value), 3)) : R("", !0)
      ]),
      e.loading ? (y(), _("div", ax, [...u[1] || (u[1] = [
        l("div", { class: "shimmer shimmer-value" }, null, -1),
        l("div", { class: "shimmer shimmer-label" }, null, -1)
      ])])) : (y(), _("div", sx, [
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
    const a = e, { isDark: s } = ct(lt(a, "theme")), n = C(() => `${a.currencyCode} ${fe(a.totalRevenue)}`), o = C(
      () => a.previousTotalRevenue !== null && a.previousTotalRevenue !== void 0
    ), i = C(() => {
      if (!o.value) return 0;
      const d = a.previousTotalRevenue;
      return d === 0 ? a.totalRevenue > 0 ? 100 : 0 : (a.totalRevenue - d) / d * 100;
    }), r = C(() => `${i.value > 0 ? "+" : ""}${i.value.toFixed(1)}% vs prev.`), c = C(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: s, changePercent: i }), (d, u) => (y(), _("article", {
      class: K(["highlight-card", { "highlight-card--dark": B(s) }])
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
        !e.loading && o.value ? (y(), _("div", {
          key: 0,
          class: K(["change-badge", c.value])
        }, $(r.value), 3)) : R("", !0)
      ]),
      e.loading ? (y(), _("div", lx, [...u[1] || (u[1] = [
        l("div", { class: "shimmer shimmer-value" }, null, -1),
        l("div", { class: "shimmer shimmer-label" }, null, -1)
      ])])) : (y(), _("div", cx, [
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
}, _x = { class: "tooltip-content" }, xx = { class: "tooltip-title" }, kx = { class: "tooltip-stats" }, wx = { class: "tooltip-stat-row" }, $x = { class: "tooltip-value" }, Mx = { class: "tooltip-stat-row" }, Cx = { class: "tooltip-value" }, Sx = { class: "tooltip-stat-row" }, Dx = { class: "tooltip-value" }, Ax = { class: "tooltip-stat-row" }, Tx = { class: "tooltip-value" }, Bx = { class: "tooltip-stat-row" }, Lx = { class: "tooltip-value" }, Fx = { class: "tooltip-stat-row" }, Px = { class: "tooltip-value" }, Ex = {
  key: 2,
  class: "empty-state"
}, Co = 400, Qe = 60, So = 90, Do = 120, Rx = {
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
      const b = r.value.nps_by_day.length;
      return Math.max(800, Qe * 2 + b * Do);
    }), h = (b, p) => {
      const w = (b - 1) / 9;
      return Qe + p - w * p;
    }, g = (b) => b ? At(b).format("DD-MM-YYYY") : "", v = C(() => {
      if (!r.value || !r.value.nps_by_day || r.value.nps_by_day.length === 0)
        return [];
      const b = [], p = Co - Qe - So;
      return r.value.nps_by_day.forEach((m, w) => {
        const k = m.min_score || 0, M = m.q1_score || 0, S = m.median_score || 0, D = m.q3_score || 0, A = m.max_score || 0, T = m.average_score || 0;
        b.push({
          label: g(m.date),
          responseCount: m.nps_responses_count || 0,
          isTotal: !1,
          low: k,
          q1: M,
          median: S,
          q3: D,
          high: A,
          average: T,
          highY: h(A, p),
          lowY: h(k, p),
          q1Y: h(M, p),
          q3Y: h(D, p),
          medianY: h(S, p),
          averageY: T > 0 ? h(T, p) : null,
          centerX: Qe + (w + 1) * Do
        });
      }), b;
    }), f = (b, p) => {
      if (!c.value || !p || p.horizontal) return;
      const m = c.value.getBoundingClientRect(), w = b.clientX, k = b.clientY, M = 140, S = 160, D = 10, A = 15;
      let T = w - m.left - M / 2, L = k - m.top - S - A;
      T = Math.max(D, Math.min(T, m.width - M - D)), L < D && (L = k - m.top + A), L = Math.max(D, Math.min(L, m.height - S - D)), d.value = {
        visible: !0,
        x: T,
        y: L,
        date: p.label || "",
        min: p.low !== void 0 ? p.low.toFixed(1) : "N/A",
        max: p.high !== void 0 ? p.high.toFixed(1) : "N/A",
        q1: p.open !== void 0 ? p.open.toFixed(1) : "N/A",
        avg: p.average !== void 0 && p.average > 0 ? p.average.toFixed(1) : "N/A",
        q3: p.close !== void 0 ? p.close.toFixed(1) : "N/A",
        median: p.median !== void 0 ? p.median.toFixed(1) : "N/A"
      };
    }, x = () => {
      d.value.visible = !1;
    };
    return t({ isDark: i }), (b, p) => (y(), _("article", fx, [
      l("header", gx, [
        l("div", px, [
          p[1] || (p[1] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "CSAT Daily Metrics"),
            l("p", { class: "card-subtitle" }, "Daily CSAT Distribution")
          ], -1)),
          r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (y(), _("div", vx, [
            p[0] || (p[0] = l("p", { class: "badge-label" }, "Days", -1)),
            l("p", bx, $(r.value.nps_by_day.length), 1)
          ])) : R("", !0)
        ])
      ]),
      o.loading ? (y(), _("div", mx, [...p[2] || (p[2] = [
        st('<div class="loading-container" data-v-b20112a7><div class="chart-flow-loader" data-v-b20112a7><div class="flow-line flow-1" data-v-b20112a7></div><div class="flow-line flow-2" data-v-b20112a7></div><div class="flow-line flow-3" data-v-b20112a7></div><div class="flow-line flow-4" data-v-b20112a7></div><div class="flow-line flow-5" data-v-b20112a7></div></div><p class="loading-text" data-v-b20112a7>Loading daily NPS data...</p></div>', 1)
      ])])) : r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (y(), _("div", yx, [
        l("div", {
          class: "chart-wrapper",
          ref_key: "chartContainerRef",
          ref: c
        }, [
          v.value && v.value.length > 0 ? (y(), ht(Ri, {
            key: 0,
            "candlestick-data": v.value,
            "chart-width": u.value,
            "chart-height": Co,
            "chart-margin": Qe,
            "chart-bottom-margin": So,
            "show-legend": !0,
            rotation: 0,
            "candle-width": 30,
            onCandleHover: f,
            onCandleLeave: x
          }, null, 8, ["candlestick-data", "chart-width"])) : R("", !0),
          d.value.visible ? (y(), _("div", {
            key: 1,
            class: "tooltip-overlay",
            style: xt({
              left: `${d.value.x}px`,
              top: `${d.value.y}px`
            })
          }, [
            l("div", _x, [
              l("div", xx, $(d.value.date), 1),
              p[9] || (p[9] = l("div", { class: "tooltip-divider" }, null, -1)),
              l("div", kx, [
                l("div", wx, [
                  p[3] || (p[3] = l("span", { class: "tooltip-label tooltip-min" }, "Min:", -1)),
                  l("span", $x, $(d.value.min), 1)
                ]),
                l("div", Mx, [
                  p[4] || (p[4] = l("span", { class: "tooltip-label tooltip-q1" }, "Q1:", -1)),
                  l("span", Cx, $(d.value.q1), 1)
                ]),
                l("div", Sx, [
                  p[5] || (p[5] = l("span", { class: "tooltip-label tooltip-median" }, "Median:", -1)),
                  l("span", Dx, $(d.value.median), 1)
                ]),
                l("div", Ax, [
                  p[6] || (p[6] = l("span", { class: "tooltip-label tooltip-avg" }, "Avg:", -1)),
                  l("span", Tx, $(d.value.avg), 1)
                ]),
                l("div", Bx, [
                  p[7] || (p[7] = l("span", { class: "tooltip-label tooltip-q3" }, "Q3:", -1)),
                  l("span", Lx, $(d.value.q3), 1)
                ]),
                l("div", Fx, [
                  p[8] || (p[8] = l("span", { class: "tooltip-label tooltip-max" }, "Max:", -1)),
                  l("span", Px, $(d.value.max), 1)
                ])
              ])
            ])
          ], 4)) : R("", !0)
        ], 512),
        e.enableExport ? (y(), ht(B(_t), {
          key: 0,
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : R("", !0)
      ])) : (y(), _("div", Ex, [...p[10] || (p[10] = [
        st('<div class="empty-state-content" data-v-b20112a7><div class="empty-icon-wrapper" data-v-b20112a7><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-b20112a7><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-b20112a7></path></svg></div><p class="empty-title" data-v-b20112a7>No daily NPS data available</p><p class="empty-description" data-v-b20112a7>No daily NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, Ni = /* @__PURE__ */ nt(Rx, [["__scopeId", "data-v-b20112a7"]]), Ix = { class: "nps-overview-card" }, Ox = { class: "card-header" }, Vx = { class: "header-content" }, zx = { class: "header-badges" }, Nx = {
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
    }, o = e, { isDark: i } = ct(lt(o, "theme")), r = C(() => o.data), c = C(() => Math.max(600, window.innerWidth * 0.85));
    return t({ isDark: i }), (d, u) => (y(), _("article", Ix, [
      l("header", Ox, [
        l("div", Vx, [
          u[2] || (u[2] = l("div", { class: "title-section" }, [
            l("h3", { class: "card-title" }, "CSAT Overview Metrics"),
            l("p", { class: "card-subtitle" }, "Overall CSAT Distribution")
          ], -1)),
          l("div", zx, [
            r.value && r.value.total_nps_responses > 0 ? (y(), _("div", Nx, [
              u[0] || (u[0] = l("p", { class: "badge-label" }, "Responses", -1)),
              l("p", Wx, $(r.value.total_nps_responses), 1)
            ])) : R("", !0),
            r.value && r.value.p95_score > 0 ? (y(), _("div", Hx, [
              u[1] || (u[1] = l("p", { class: "badge-label" }, "Percentile 95", -1)),
              l("p", jx, $(r.value.p95_score || 0), 1)
            ])) : R("", !0)
          ])
        ])
      ]),
      o.loading ? (y(), _("div", Yx, [...u[3] || (u[3] = [
        st('<div class="loading-container" data-v-30fe5f88><div class="chart-flow-loader" data-v-30fe5f88><div class="flow-line flow-1" data-v-30fe5f88></div><div class="flow-line flow-2" data-v-30fe5f88></div><div class="flow-line flow-3" data-v-30fe5f88></div><div class="flow-line flow-4" data-v-30fe5f88></div><div class="flow-line flow-5" data-v-30fe5f88></div></div><p class="loading-text" data-v-30fe5f88>Loading NPS data...</p></div>', 1)
      ])])) : r.value && r.value.total_nps_responses > 0 ? (y(), _("div", Kx, [
        l("div", Ux, [
          Q(Ii, {
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
        e.enableExport ? (y(), ht(B(_t), {
          key: 0,
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : R("", !0)
      ])) : (y(), _("div", qx, [...u[4] || (u[4] = [
        st('<div class="empty-state-content" data-v-30fe5f88><div class="empty-icon-wrapper" data-v-30fe5f88><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-30fe5f88><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-30fe5f88></path></svg></div><p class="empty-title" data-v-30fe5f88>No NPS data available</p><p class="empty-description" data-v-30fe5f88>No NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, Wi = /* @__PURE__ */ nt(Qx, [["__scopeId", "data-v-30fe5f88"]]), Jx = { class: "nps-metrics-container" }, tk = {
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
    return (n, o) => (y(), _("div", Jx, [
      Q(Wi, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: s
      }, null, 8, ["data", "loading", "enable-export"]),
      Q(Ni, {
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
    const t = e, { isDark: a, colors: s } = ct(lt(t, "theme")), n = C(() => {
      const r = t.data ?? {}, c = r.daily, d = r.days, u = Array.isArray(c) && c.length > 0, h = Array.isArray(d) && d.length > 0 && Array.isArray(r.allocatedCostSeries) && r.allocatedCostSeries.length === d.length;
      let g = [];
      return u ? g = c : h && (g = d.map((v, f) => ({
        date: v,
        allocated_cost: r.allocatedCostSeries[f] ?? 0,
        aws_cost: r.awsCostSeries[f] ?? 0,
        airline_conversations: r.airlineConversationsSeries[f] ?? 0
      }))), {
        daily: g,
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
    return (r, c) => (y(), _("article", ak, [
      l("header", sk, [
        l("div", nk, [
          l("div", ok, [
            l("h3", ik, $(n.value.airline_name || "AWS Cost"), 1),
            c[0] || (c[0] = l("p", { class: "card-subtitle" }, "AWS vs Allocated costs over time", -1))
          ]),
          l("div", rk, [
            l("div", lk, [
              c[1] || (c[1] = l("span", { class: "stat-label" }, "Total Allocated", -1)),
              l("span", ck, $(B(vt)(n.value.total_allocated_cost)), 1)
            ]),
            l("div", dk, [
              c[2] || (c[2] = l("span", { class: "stat-label" }, "Total AWS", -1)),
              l("span", uk, $(B(vt)(n.value.total_cost)), 1)
            ])
          ])
        ])
      ]),
      l("div", hk, [
        e.loading ? (y(), _("div", fk, [...c[3] || (c[3] = [
          st('<div class="loading-container" data-v-c023bd59><div class="chart-lines-loader" data-v-c023bd59><div class="line line-1" data-v-c023bd59></div><div class="line line-2" data-v-c023bd59></div><div class="line line-3" data-v-c023bd59></div><div class="line line-4" data-v-c023bd59></div><div class="line line-5" data-v-c023bd59></div></div><p class="loading-text" data-v-c023bd59>Loading chart data...</p></div>', 1)
        ])])) : n.value.daily.length > 0 ? (y(), _("div", gk, [
          l("div", pk, [
            Q(ye, {
              data: o.value,
              options: i.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), _("section", vk, [
          l("div", bk, [
            l("div", mk, [
              Q(B(Ot), { class: "empty-icon" })
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
}, $k = { class: "chart-container" }, Mk = { class: "kpi-grid" }, Ck = { class: "kpi-card" }, Sk = { class: "kpi-value" }, Dk = { class: "kpi-card" }, Ak = { class: "kpi-value" }, Tk = { class: "kpi-card" }, Bk = { class: "kpi-value" }, Lk = { class: "kpi-card" }, Fk = { class: "kpi-value" }, Pk = { class: "kpi-card" }, Ek = { class: "kpi-value" }, Rk = { class: "kpi-card highlighted" }, Ik = { class: "kpi-value gradient-text" }, Ok = {
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
      const x = new Date(f), b = String(x.getDate()).padStart(2, "0"), p = String(x.getMonth() + 1).padStart(2, "0");
      return `${b}-${p}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, c = C(() => {
      const f = s.data?.costs_by_day || {};
      return Object.values(f).reduce((x, b) => x + (b.input_cost || 0), 0);
    }), d = C(() => {
      const f = s.data?.costs_by_day || {};
      return Object.values(f).reduce((x, b) => x + (b.output_cost || 0), 0);
    }), u = C(() => {
      const f = s.data?.costs_by_day || {};
      return Object.values(f).reduce((x, b) => x + (b.cache_read_cost || 0), 0);
    }), h = C(() => {
      const f = s.data?.costs_by_day || {};
      return Object.values(f).reduce((x, b) => x + (b.cache_write_cost || 0), 0);
    }), g = C(() => {
      const f = s.data?.costs_by_day || {}, x = Object.keys(f).sort();
      if (x.length === 0)
        return { labels: [], datasets: [] };
      const b = x.map((m) => i(m)), p = [
        {
          label: "Input Cost",
          data: x.map((m) => f[m]?.input_cost || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: x.map((m) => f[m]?.output_cost || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: x.map((m) => f[m]?.cache_read_cost || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: x.map((m) => f[m]?.cache_write_cost || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: b,
        datasets: p
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
              let x = f.dataset.label || "";
              return x && (x += ": "), f.parsed.y !== null && (x += vt(f.parsed.y)), x;
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
    return t({ isDark: n }), (f, x) => (y(), _("article", xk, [
      x[9] || (x[9] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Cost Usage"),
          l("p", { class: "card-subtitle" }, "Cost breakdown over time (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), _("div", Nk, [...x[8] || (x[8] = [
        st('<div class="loading-container" data-v-62f96954><div class="chart-lines-loader" data-v-62f96954><div class="line line-1" data-v-62f96954></div><div class="line line-2" data-v-62f96954></div><div class="line line-3" data-v-62f96954></div><div class="line line-4" data-v-62f96954></div><div class="line line-5" data-v-62f96954></div></div><p class="loading-text" data-v-62f96954>Loading chart data...</p></div>', 1)
      ])])) : (y(), _("div", kk, [
        g.value.labels && g.value.labels.length ? (y(), _("section", wk, [
          l("div", $k, [
            Q(ie, {
              data: g.value,
              options: v.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          l("footer", Mk, [
            l("div", Ck, [
              x[0] || (x[0] = l("span", { class: "kpi-label" }, "Total Cost", -1)),
              l("span", Sk, $(B(vt)(e.data.total_cost)), 1)
            ]),
            l("div", Dk, [
              x[1] || (x[1] = l("span", { class: "kpi-label" }, "Input Cost", -1)),
              l("span", Ak, $(B(vt)(c.value)), 1)
            ]),
            l("div", Tk, [
              x[2] || (x[2] = l("span", { class: "kpi-label" }, "Output Cost", -1)),
              l("span", Bk, $(B(vt)(d.value)), 1)
            ]),
            l("div", Lk, [
              x[3] || (x[3] = l("span", { class: "kpi-label" }, "Cache Read", -1)),
              l("span", Fk, $(B(vt)(u.value)), 1)
            ]),
            l("div", Pk, [
              x[4] || (x[4] = l("span", { class: "kpi-label" }, "Cache Write", -1)),
              l("span", Ek, $(B(vt)(h.value)), 1)
            ]),
            l("div", Rk, [
              x[5] || (x[5] = l("span", { class: "kpi-label" }, "Avg / Conv.", -1)),
              l("span", Ik, $(B(vt)(e.data.avg_cost_per_conversation)), 1)
            ])
          ])
        ])) : (y(), _("section", Ok, [
          l("div", Vk, [
            l("div", zk, [
              Q(B(Ot), { class: "empty-icon" })
            ]),
            x[6] || (x[6] = l("p", { class: "empty-title" }, "No cost usage data", -1)),
            x[7] || (x[7] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
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
      const h = new Date(u), g = String(h.getDate()).padStart(2, "0"), v = String(h.getMonth() + 1).padStart(2, "0");
      return `${g}-${v}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, c = C(() => {
      const u = s.data?.tokens_by_day || {}, h = Object.keys(u).sort();
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const g = h.map((f) => i(f)), v = [
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
        labels: g,
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
    return t({ isDark: n }), (u, h) => (y(), _("article", jk, [
      h[8] || (h[8] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Token Usage"),
          l("p", { class: "card-subtitle" }, "Token consumption over time (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), _("div", l5, [...h[7] || (h[7] = [
        st('<div class="loading-container" data-v-e9e355be><div class="chart-lines-loader" data-v-e9e355be><div class="line line-1" data-v-e9e355be></div><div class="line line-2" data-v-e9e355be></div><div class="line line-3" data-v-e9e355be></div><div class="line line-4" data-v-e9e355be></div><div class="line line-5" data-v-e9e355be></div></div><p class="loading-text" data-v-e9e355be>Loading chart data...</p></div>', 1)
      ])])) : (y(), _("div", Yk, [
        c.value.labels && c.value.labels.length ? (y(), _("section", Kk, [
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
              l("span", Gk, $(B(U)(e.data.total_tokens)), 1)
            ]),
            l("div", Zk, [
              h[1] || (h[1] = l("span", { class: "kpi-label" }, "Input", -1)),
              l("span", Qk, $(B(U)(e.data.total_input_tokens)), 1)
            ]),
            l("div", Jk, [
              h[2] || (h[2] = l("span", { class: "kpi-label" }, "Output", -1)),
              l("span", t5, $(B(U)(e.data.total_output_tokens)), 1)
            ]),
            l("div", e5, [
              h[3] || (h[3] = l("span", { class: "kpi-label" }, "Cache Read", -1)),
              l("span", a5, $(B(U)(e.data.total_cache_read_tokens)), 1)
            ]),
            l("div", s5, [
              h[4] || (h[4] = l("span", { class: "kpi-label" }, "Cache Write", -1)),
              l("span", n5, $(B(U)(e.data.total_cache_write_tokens)), 1)
            ])
          ])
        ])) : (y(), _("section", o5, [
          l("div", i5, [
            l("div", r5, [
              Q(B(Ot), { class: "empty-icon" })
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
      const u = d.map((g) => o(g)), h = [
        {
          label: "Conversations",
          data: d.map((g) => c[g] || 0),
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
    return t({ isDark: s }), (c, d) => (y(), _("article", u5, [
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
      e.loading ? (y(), _("div", k5, [...d[4] || (d[4] = [
        st('<div class="loading-container" data-v-846f24b1><div class="chart-lines-loader" data-v-846f24b1><div class="line line-1" data-v-846f24b1></div><div class="line line-2" data-v-846f24b1></div><div class="line line-3" data-v-846f24b1></div><div class="line line-4" data-v-846f24b1></div><div class="line line-5" data-v-846f24b1></div></div><p class="loading-text" data-v-846f24b1>Loading chart data...</p></div>', 1)
      ])])) : (y(), _("div", v5, [
        i.value.labels && i.value.labels.length ? (y(), _("section", b5, [
          l("div", m5, [
            Q(ye, {
              data: i.value,
              options: r.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), _("section", y5, [
          l("div", _5, [
            l("div", x5, [
              Q(B(Ot), { class: "empty-icon" })
            ]),
            d[2] || (d[2] = l("p", { class: "empty-title" }, "No conversation count data", -1)),
            d[3] || (d[3] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), $5 = /* @__PURE__ */ nt(w5, [["__scopeId", "data-v-846f24b1"]]), M5 = { class: "top-agents-card" }, C5 = {
  key: 0,
  class: "card-body"
}, S5 = {
  key: 0,
  class: "charts-grid"
}, D5 = { class: "chart-section" }, A5 = { class: "chart-container" }, T5 = { class: "chart-section" }, B5 = { class: "chart-container" }, L5 = {
  key: 1,
  class: "empty-state"
}, F5 = { class: "empty-state-content" }, P5 = { class: "empty-icon-wrapper" }, E5 = {
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
    const a = e, { isDark: s, colors: n } = ct(lt(a, "theme")), o = C(() => a.data?.top_agents && a.data.top_agents.length > 0), i = C(() => a.data?.top_agents ? [...a.data.top_agents].sort((g, v) => (v.total_cost || 0) - (g.total_cost || 0)) : []), r = C(() => a.data?.top_agents ? [...a.data.top_agents].sort((g, v) => (v.total_tokens || 0) - (g.total_tokens || 0)) : []), c = C(() => {
      const g = i.value;
      return g.length === 0 ? { labels: [], datasets: [] } : {
        labels: g.map((v) => v.agent_type),
        datasets: [
          {
            label: "Total Cost",
            data: g.map((v) => v.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), d = C(() => {
      const g = r.value;
      return g.length === 0 ? { labels: [], datasets: [] } : {
        labels: g.map((v) => v.agent_type),
        datasets: [
          {
            label: "Total Tokens",
            data: g.map((v) => v.total_tokens || 0),
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
            title: function(g) {
              return g[0]?.label || "";
            },
            label: function(g) {
              const v = g.label, f = a.data?.top_agents?.find((x) => x.agent_type === v);
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
            callback: function(g) {
              return vt(g);
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
            title: function(g) {
              return g[0]?.label || "";
            },
            label: function(g) {
              const v = g.label, f = a.data?.top_agents?.find((x) => x.agent_type === v);
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
            callback: function(g) {
              return g.toLocaleString();
            }
          }
        }
      }
    });
    return t({ isDark: s }), (g, v) => (y(), _("article", M5, [
      v[5] || (v[5] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Top Agents Analysis"),
          l("p", { class: "card-subtitle" }, "Cost and token usage by agent")
        ])
      ], -1)),
      e.loading ? (y(), _("div", E5, [...v[4] || (v[4] = [
        st('<div class="loading-container" data-v-78efa6dc><div class="chart-lines-loader" data-v-78efa6dc><div class="line line-1" data-v-78efa6dc></div><div class="line line-2" data-v-78efa6dc></div><div class="line line-3" data-v-78efa6dc></div><div class="line line-4" data-v-78efa6dc></div><div class="line line-5" data-v-78efa6dc></div></div><p class="loading-text" data-v-78efa6dc>Loading chart data...</p></div>', 1)
      ])])) : (y(), _("div", C5, [
        o.value ? (y(), _("div", S5, [
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
        ])) : (y(), _("section", L5, [
          l("div", F5, [
            l("div", P5, [
              Q(B(Ot), { class: "empty-icon" })
            ]),
            v[2] || (v[2] = l("p", { class: "empty-title" }, "No top agents data", -1)),
            v[3] || (v[3] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), I5 = /* @__PURE__ */ nt(R5, [["__scopeId", "data-v-78efa6dc"]]), O5 = { class: "top-agents-card" }, V5 = {
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
    }, i = C(() => a.data?.top_agents ? a.data.top_agents.filter(
      (h) => h.agent_type?.toLowerCase() !== "triage"
    ) : []), r = C(() => i.value.length > 0), c = C(() => i.value.reduce((h, g) => h + (g.conversations || 0), 0)), d = C(() => {
      const h = i.value;
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const g = h.map((x) => {
        const b = x.agent_type?.toLowerCase();
        return (o[b] || "#a78bfa") + "80";
      }), v = h.map((x) => {
        const b = x.agent_type?.toLowerCase();
        return o[b] || "#a78bfa";
      });
      return {
        labels: h.map((x) => {
          const b = x.conversations || 0, p = c.value ? b / c.value * 100 : 0;
          return `${x.agent_type} - ${b.toLocaleString()} (${p.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((x) => x.conversations || 0),
            backgroundColor: g,
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
              const g = (h.label || "").toString(), v = Number(h.parsed) || 0, f = (h.dataset.data || []).reduce((b, p) => b + (Number(p) || 0), 0), x = f ? v / f * 100 : 0;
              return `${g}: ${v.toLocaleString()} (${x.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: s }), (h, g) => (y(), _("article", O5, [
      g[3] || (g[3] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Top Agents"),
          l("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (y(), _("div", Y5, [...g[2] || (g[2] = [
        st('<div class="loading-container" data-v-05e3e74d><div class="chart-lines-loader" data-v-05e3e74d><div class="line line-1" data-v-05e3e74d></div><div class="line line-2" data-v-05e3e74d></div><div class="line line-3" data-v-05e3e74d></div><div class="line line-4" data-v-05e3e74d></div><div class="line line-5" data-v-05e3e74d></div></div><p class="loading-text" data-v-05e3e74d>Loading chart data...</p></div>', 1)
      ])])) : (y(), _("div", V5, [
        r.value ? (y(), _("section", z5, [
          l("div", N5, [
            Q(Za, {
              data: d.value,
              options: u.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), _("section", W5, [
          l("div", H5, [
            l("div", j5, [
              Q(B(Ot), { class: "empty-icon" })
            ]),
            g[0] || (g[0] = l("p", { class: "empty-title" }, "No top agents data", -1)),
            g[1] || (g[1] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
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
    }, i = C(() => {
      const d = a.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(d) && d.length > 0)
        return !0;
      const u = a.costData?.costs_by_day || {}, h = a.conversationData?.conversations_by_day || {};
      return Object.keys(u).length > 0 && Object.keys(h).length > 0;
    }), r = C(() => {
      const d = a.costData?.daily_mean_cost_per_conversation || [];
      if (d.length > 0) {
        const b = [...d].sort((p, m) => p.date.localeCompare(m.date));
        return {
          labels: b.map((p) => o(p.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: b.map((p) => Number(p.value) || 0),
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
      const f = v.map((b) => o(b)), x = v.map((b) => {
        const p = u[b]?.total_cost || 0, m = h[b] || 0;
        return m > 0 ? p / m : 0;
      });
      return {
        labels: f,
        datasets: [
          {
            label: "Mean USD/conv",
            data: x,
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
    return t({ isDark: s }), (d, u) => (y(), _("article", q5, [
      u[3] || (u[3] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Daily Cost Trends"),
          l("p", { class: "card-subtitle" }, "Mean USD/conversation per day")
        ])
      ], -1)),
      e.loading ? (y(), _("div", ew, [...u[2] || (u[2] = [
        st('<div class="loading-container" data-v-e5bac1c5><div class="chart-lines-loader" data-v-e5bac1c5><div class="line line-1" data-v-e5bac1c5></div><div class="line line-2" data-v-e5bac1c5></div><div class="line line-3" data-v-e5bac1c5></div><div class="line line-4" data-v-e5bac1c5></div><div class="line line-5" data-v-e5bac1c5></div></div><p class="loading-text" data-v-e5bac1c5>Loading chart data...</p></div>', 1)
      ])])) : (y(), _("div", X5, [
        i.value ? (y(), _("section", G5, [
          l("div", Z5, [
            Q(ye, {
              data: r.value,
              options: c.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), _("section", Q5, [
          l("div", J5, [
            l("div", tw, [
              Q(B(Ot), { class: "empty-icon" })
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
}, $w = { class: "empty-state-content" }, Mw = { class: "empty-icon-wrapper" }, Cw = /* @__PURE__ */ J({
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
    }, { isDark: i } = ct(lt(s, "theme")), r = at("by_model"), c = C(() => r.value === "by_model" ? s.data?.total_by_model || {} : s.data?.total_by_provider || {}), d = (h) => h == null ? "0" : U(h), u = (h) => h == null ? "$0.00" : vt(h);
    return t({ isDark: i }), (h, g) => (y(), _("article", nw, [
      g[10] || (g[10] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Model Usage"),
          l("p", { class: "card-subtitle" }, "AI model performance and costs")
        ])
      ], -1)),
      e.loading ? (y(), _("div", ow, [...g[2] || (g[2] = [
        st('<div class="loading-container" data-v-a7bf2d7b><div class="chart-bars-loader" data-v-a7bf2d7b><div class="bar bar-1" data-v-a7bf2d7b></div><div class="bar bar-2" data-v-a7bf2d7b></div><div class="bar bar-3" data-v-a7bf2d7b></div><div class="bar bar-4" data-v-a7bf2d7b></div><div class="bar bar-5" data-v-a7bf2d7b></div></div><p class="loading-text" data-v-a7bf2d7b>Loading model usage data...</p></div>', 1)
      ])])) : (y(), _("div", iw, [
        l("div", rw, [
          l("nav", lw, [
            l("button", {
              onClick: g[0] || (g[0] = (v) => r.value = "by_model"),
              class: K(["tab-button", { "tab-active": r.value === "by_model" }]),
              "aria-selected": r.value === "by_model",
              role: "tab"
            }, " Model ", 10, cw),
            l("button", {
              onClick: g[1] || (g[1] = (v) => r.value = "by_provider"),
              class: K(["tab-button", { "tab-active": r.value === "by_provider" }]),
              "aria-selected": r.value === "by_provider",
              role: "tab"
            }, " Provider ", 10, dw)
          ])
        ]),
        c.value && Object.keys(c.value).length > 0 ? (y(), _("div", uw, [
          l("div", hw, [
            l("table", fw, [
              l("thead", null, [
                l("tr", gw, [
                  l("th", pw, $(r.value === "by_model" ? "Model" : "Provider"), 1),
                  g[3] || (g[3] = l("th", { class: "table-header" }, "Avg cost per message", -1)),
                  g[4] || (g[4] = l("th", { class: "table-header" }, "Avg tokens per message", -1)),
                  g[5] || (g[5] = l("th", { class: "table-header" }, "Message count", -1)),
                  g[6] || (g[6] = l("th", { class: "table-header" }, "Total cost", -1)),
                  g[7] || (g[7] = l("th", { class: "table-header" }, "Total tokens", -1))
                ])
              ]),
              l("tbody", vw, [
                (y(!0), _(q, null, tt(c.value, (v, f) => (y(), _("tr", {
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
          e.enableExport ? (y(), ht(B(_t), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : R("", !0)
        ])) : (y(), _("div", ww, [
          l("div", $w, [
            l("div", Mw, [
              Q(B(Ot), { class: "empty-icon" })
            ]),
            g[8] || (g[8] = l("p", { class: "empty-title" }, "No model usage data available", -1)),
            g[9] || (g[9] = l("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Sw = /* @__PURE__ */ nt(Cw, [["__scopeId", "data-v-a7bf2d7b"]]), Dw = { class: "message-roles-card" }, Aw = {
  key: 0,
  class: "loading-state"
}, Tw = {
  key: 1,
  class: "card-body"
}, Bw = {
  key: 0,
  class: "table-section"
}, Lw = { class: "table-wrapper" }, Fw = { class: "data-table" }, Pw = { class: "table-body" }, Ew = { class: "table-cell name-cell" }, Rw = { class: "table-cell text-center" }, Iw = { class: "table-cell text-center" }, Ow = { class: "table-cell text-center" }, Vw = { class: "table-cell text-center cost-cell" }, zw = { class: "table-cell text-center" }, Nw = {
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
    }, { isDark: i } = ct(lt(s, "theme")), r = ["assistant", "system", "user"], c = C(() => s.data?.total_by_role || {}), d = C(() => Object.keys(c.value).length > 0), u = (v) => v == null ? "0" : U(v), h = (v) => v == null ? "$0.00" : vt(v), g = (v) => v.charAt(0).toUpperCase() + v.slice(1);
    return t({ isDark: i }), (v, f) => (y(), _("article", Dw, [
      f[4] || (f[4] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Message Roles"),
          l("p", { class: "card-subtitle" }, "Performance by message role")
        ])
      ], -1)),
      e.loading ? (y(), _("div", Aw, [...f[0] || (f[0] = [
        st('<div class="loading-container" data-v-6a953cfc><div class="chart-bars-loader" data-v-6a953cfc><div class="bar bar-1" data-v-6a953cfc></div><div class="bar bar-2" data-v-6a953cfc></div><div class="bar bar-3" data-v-6a953cfc></div><div class="bar bar-4" data-v-6a953cfc></div><div class="bar bar-5" data-v-6a953cfc></div></div><p class="loading-text" data-v-6a953cfc>Loading message role data...</p></div>', 1)
      ])])) : (y(), _("div", Tw, [
        d.value ? (y(), _("div", Bw, [
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
                (y(), _(q, null, tt(r, (x) => l("tr", {
                  key: x,
                  class: "table-row"
                }, [
                  l("td", Ew, $(g(x)), 1),
                  l("td", Rw, $(h(c.value[x]?.avg_cost_per_message)), 1),
                  l("td", Iw, $(u(c.value[x]?.avg_tokens_per_message)), 1),
                  l("td", Ow, $(u(c.value[x]?.message_count)), 1),
                  l("td", Vw, $(h(c.value[x]?.total_cost)), 1),
                  l("td", zw, $(u(c.value[x]?.total_tokens)), 1)
                ])), 64))
              ])
            ])
          ]),
          e.enableExport ? (y(), ht(B(_t), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : R("", !0)
        ])) : (y(), _("div", Nw, [
          l("div", Ww, [
            l("div", Hw, [
              Q(B(Ot), { class: "empty-icon" })
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
    const s = e, n = a, o = (m) => {
      n("export", m);
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
    }, d = (m) => m.agent_type || m.agent_id || m.agent_name || "", u = (m) => m.agent_name ? m.agent_name : d(m).split("_").map((k) => k.charAt(0).toUpperCase() + k.slice(1)).join(" ").replace(/V\d+$/, "").trim(), h = (m) => {
      const w = d(m).toLowerCase();
      for (const [k, M] of Object.entries(c))
        if (w.includes(k))
          return M;
      return "#9ca3af";
    }, g = C(() => [...s.data?.top_agents || []].sort((w, k) => k.avg_cost_per_conversation - w.avg_cost_per_conversation)), v = C(() => s.data?.total_conversations !== void 0 ? Number(s.data.total_conversations) || 0 : g.value.reduce((m, w) => m + w.conversations, 0)), f = C(() => s.data?.total_cost !== void 0 ? Number(s.data.total_cost) || 0 : g.value.reduce((m, w) => m + w.total_cost, 0)), x = C(() => s.data?.overall_avg_cost_per_conversation !== void 0 ? Number(s.data.overall_avg_cost_per_conversation) || 0 : v.value === 0 ? 0 : f.value / v.value), b = C(() => {
      const m = g.value;
      if (m.length === 0)
        return { labels: [], datasets: [] };
      const w = m.map((S) => u(S)), k = m.map((S) => S.avg_cost_per_conversation), M = m.map((S) => h(S));
      return {
        labels: w,
        datasets: [
          {
            label: "USD per conversation",
            data: k,
            backgroundColor: M.map((S) => `${S}80`),
            borderColor: M,
            borderWidth: 1
          }
        ]
      };
    }), p = C(() => s.options ? s.options : {
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
            label: function(m) {
              const w = g.value[m.dataIndex];
              return [
                `Cost: ${vt(m.parsed.x)}`,
                `Conversations: ${U(w.conversations)}`,
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
            callback: function(m) {
              return vt(m);
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
    return t({ isDark: i }), (m, w) => (y(), _("article", Kw, [
      w[7] || (w[7] = l("header", { class: "card-header" }, [
        l("div", { class: "header-content" }, [
          l("h3", { class: "card-title" }, "Cost Per Conversation"),
          l("p", { class: "card-subtitle" }, "USD per conversation by agent")
        ])
      ], -1)),
      e.loading ? (y(), _("div", l$, [...w[6] || (w[6] = [
        st('<div class="loading-container" data-v-17f6615c><div class="chart-bars-loader" data-v-17f6615c><div class="bar bar-1" data-v-17f6615c></div><div class="bar bar-2" data-v-17f6615c></div><div class="bar bar-3" data-v-17f6615c></div><div class="bar bar-4" data-v-17f6615c></div><div class="bar bar-5" data-v-17f6615c></div></div><p class="loading-text" data-v-17f6615c>Loading agent costs...</p></div>', 1)
      ])])) : (y(), _("div", Uw, [
        b.value.labels && b.value.labels.length ? (y(), _("section", qw, [
          l("div", Xw, [
            Q(ie, {
              data: b.value,
              options: p.value
            }, null, 8, ["data", "options"])
          ]),
          l("footer", Gw, [
            l("div", Zw, [
              w[0] || (w[0] = l("span", { class: "kpi-label" }, "Total Agents", -1)),
              l("span", Qw, $(g.value.length), 1)
            ]),
            l("div", Jw, [
              w[1] || (w[1] = l("span", { class: "kpi-label" }, "Total Conversations", -1)),
              l("span", t$, $(B(U)(v.value)), 1)
            ]),
            l("div", e$, [
              w[2] || (w[2] = l("span", { class: "kpi-label" }, "Total Cost", -1)),
              l("span", a$, $(B(vt)(f.value)), 1)
            ]),
            l("div", s$, [
              w[3] || (w[3] = l("span", { class: "kpi-label" }, "Avg Cost / Conv.", -1)),
              l("span", n$, $(B(vt)(x.value)), 1)
            ])
          ]),
          e.enableExport ? (y(), ht(B(_t), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : R("", !0)
        ])) : (y(), _("section", o$, [
          l("div", i$, [
            l("div", r$, [
              Q(B(Ot), { class: "empty-icon" })
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
    const a = e, s = t, n = at([]), o = `tabs-${Ft()}`, i = (f) => `${o}-tab-${f}`, r = C(
      () => a.items.map((f, x) => f.disabled ? -1 : x).filter((f) => f >= 0)
    );
    function c(f) {
      return f.value === a.modelValue;
    }
    function d(f) {
      const x = c(f), p = `${a.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-full min-h-0 cursor-pointer rounded-lg border border-transparent text-center outline-none transition-[background-color,color,box-shadow,opacity,transform] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return f.disabled ? `${p} cursor-not-allowed opacity-40` : x ? `${p} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${p} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function u(f, x) {
      f === x || a.items.find((p) => p.value === f)?.disabled || (s("update:modelValue", f), s("change", { value: f, previousValue: x }));
    }
    function h(f, x) {
      s("tab-click", { value: f.value, originalEvent: x }), !f.disabled && (u(f.value, a.modelValue), Ct(() => {
        n.value[a.items.indexOf(f)]?.focus();
      }));
    }
    function g(f, x) {
      const b = a.items.length;
      if (b === 0) return 0;
      let p = f;
      for (let m = 0; m < b; m++)
        if (p = (p + x + b) % b, !a.items[p]?.disabled) return p;
      return f;
    }
    async function v(f, x) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(f.key)) return;
      f.preventDefault();
      let p = x;
      f.key === "ArrowLeft" ? p = g(x, -1) : f.key === "ArrowRight" ? p = g(x, 1) : f.key === "Home" ? p = r.value[0] ?? 0 : f.key === "End" && (p = r.value[r.value.length - 1] ?? x);
      const m = a.items[p];
      !m || m.disabled || (u(m.value, a.modelValue), await Ct(), n.value[p]?.focus());
    }
    return (f, x) => (y(), _("div", u$, [
      l("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: K([
          "box-border h-10 flex-wrap items-stretch gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 p-0.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (y(!0), _(q, null, tt(e.items, (b, p) => (y(), _("button", {
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
          onClick: (m) => h(b, m),
          onKeydown: (m) => v(m, p)
        }, [
          l("span", {
            class: K(["flex h-full min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            b.icon ? (y(), ht(Fs(b.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : R("", !0),
            l("span", g$, $(b.label), 1)
          ], 2)
        ], 42, f$))), 128))
      ], 10, h$),
      f.$slots.default ? (y(), ht(Ro, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: ta(() => [
          (y(), _("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            Wt(f.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : R("", !0)
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
    function o(m) {
      return `cell-${m}`;
    }
    function i(m) {
      return m === "center" ? "text-center" : m === "right" ? "text-right" : "text-left";
    }
    function r(m, w) {
      if (typeof a.rowKey == "function")
        return a.rowKey(m);
      const k = m[a.rowKey];
      return k != null ? String(k) : `__index_${w}`;
    }
    function c(m, w) {
      return m[w];
    }
    function d(m) {
      return m == null || typeof m == "object" ? "" : String(m);
    }
    function u(m, w) {
      return r(m, w);
    }
    const h = C(() => a.rows.map((m, w) => r(m, w)));
    function g(m, w) {
      const k = r(m, w);
      return a.selectedKeys.includes(k);
    }
    const v = C(() => !a.selectable || a.rows.length === 0 ? !1 : h.value.every((m) => a.selectedKeys.includes(m))), f = C(() => {
      if (!a.selectable || a.rows.length === 0) return !1;
      const m = h.value.filter((w) => a.selectedKeys.includes(w));
      return m.length > 0 && m.length < a.rows.length;
    });
    Et(
      [f, v, () => a.selectable],
      async () => {
        await Ct();
        const m = n.value;
        m && (m.indeterminate = f.value && !v.value);
      },
      { immediate: !0 }
    );
    function x() {
      if (a.selectable)
        if (v.value) {
          const m = a.selectedKeys.filter((w) => !h.value.includes(w));
          s("update:selectedKeys", m);
        } else {
          const m = new Set(a.selectedKeys);
          h.value.forEach((w) => m.add(w)), s("update:selectedKeys", [...m]);
        }
    }
    function b(m, w) {
      if (!a.selectable) return;
      const k = r(m, w);
      a.selectedKeys.includes(k) ? s(
        "update:selectedKeys",
        a.selectedKeys.filter((S) => S !== k)
      ) : s("update:selectedKeys", [...a.selectedKeys, k]);
    }
    function p(m, w) {
      const k = r(m, w);
      return `${a.ariaLabelSelectRow} ${k}`;
    }
    return (m, w) => (y(), _("div", b$, [
      l("div", m$, [
        l("table", y$, [
          l("thead", null, [
            l("tr", _$, [
              e.selectable ? (y(), _("th", x$, [
                l("input", {
                  ref_key: "selectAllRef",
                  ref: n,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: v.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: x
                }, null, 40, k$)
              ])) : R("", !0),
              (y(!0), _(q, null, tt(e.columns, (k) => (y(), _("th", {
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
            (y(!0), _(q, null, tt(e.rows, (k, M) => (y(), _("tr", {
              key: u(k, M),
              class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]"
            }, [
              e.selectable ? (y(), _("td", w$, [
                l("input", {
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: g(k, M),
                  "aria-label": p(k, M),
                  onChange: (S) => b(k, M)
                }, null, 40, $$)
              ])) : R("", !0),
              (y(!0), _(q, null, tt(e.columns, (S) => (y(), _("td", {
                key: S.key,
                class: K([
                  "bg-transparent px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                  i(S.align),
                  S.cellClass ?? ""
                ])
              }, [
                Wt(m.$slots, o(S.key), {
                  row: k,
                  column: S,
                  value: c(k, S.key)
                }, () => [
                  kt($(d(c(k, S.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), C$ = /* @__PURE__ */ nt(M$, [["__scopeId", "data-v-1928de95"]]);
function S$(e, t) {
  return y(), _("svg", {
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
  return y(), _("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    l("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const A$ = ["aria-label"], T$ = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, B$ = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, L$ = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, F$ = ["aria-label", "aria-expanded", "aria-controls", "onClick"], P$ = { class: "truncate" }, E$ = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, R$ = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, I$ = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, O$ = ["aria-label", "onClick"], V$ = ["aria-label", "onClick"], z$ = ["aria-label"], N$ = ["aria-label"], W$ = {
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
    const a = e, s = t, n = Io(), i = `${`kiut-filters-${Ft()}`}-panel`, r = at(null), c = /* @__PURE__ */ new Map(), d = at(null), u = at(!1), h = at({}), g = at(null), v = at(""), f = at([]), x = at(""), b = at(""), p = C(() => d.value ? a.filterDefinitions.find((F) => F.id === d.value) ?? null : null), m = C(() => {
      const F = p.value;
      if (F)
        return F.type === "text" ? v.value : F.type === "select" ? f.value : { start: x.value, end: b.value };
    });
    function w(F, z) {
      z && z instanceof HTMLElement ? c.set(F, z) : c.delete(F);
    }
    function k(F) {
      return a.modelValue[F];
    }
    function M(F) {
      if (F == null) return [];
      if (Array.isArray(F))
        return F.filter((z) => typeof z == "string" && z.trim() !== "");
      if (typeof F == "string") {
        const z = F.trim();
        return z ? [z] : [];
      }
      return [];
    }
    function S(F, z) {
      if (z == null) return !0;
      if (F.type === "text") return String(z).trim() === "";
      if (F.type === "select") return M(z).length === 0;
      if (F.type === "dateRange") {
        const Z = z;
        return !Z?.start?.trim() || !Z?.end?.trim();
      }
      return !0;
    }
    const D = C(
      () => a.filterDefinitions.some((F) => !S(F, k(F.id)))
    ), A = C(() => {
      const F = [];
      for (const z of a.filterDefinitions) {
        const Z = k(z.id);
        if (!S(z, Z)) {
          if (z.type === "text")
            F.push({ kind: "text", def: z, key: z.id });
          else if (z.type === "dateRange")
            F.push({ kind: "dateRange", def: z, key: z.id });
          else if (z.type === "select")
            for (const dt of M(Z))
              F.push({
                kind: "select",
                def: z,
                optionValue: dt,
                key: `${z.id}::${dt}`
              });
        }
      }
      return F;
    });
    function T(F) {
      return F.type !== "select" ? 0 : M(k(F.id)).length;
    }
    function L(F) {
      const z = k(F.id), Z = F.label.replace(/^\+\s*/, "");
      if (F.type === "text") return `${Z}: ${String(z ?? "").trim()}`;
      if (F.type === "select") {
        const Yi = M(z).map((Js) => F.options.find((Ki) => Ki.value === Js)?.label ?? Js);
        return `${Z}: ${Yi.join(", ")}`;
      }
      const dt = z, zt = O(dt.start), ue = O(dt.end);
      return `${Z}: ${zt} – ${ue}`;
    }
    function I(F) {
      return F.kind === "text" || F.kind === "dateRange" ? L(F.def) : F.def.options.find((Z) => Z.value === F.optionValue)?.label ?? F.optionValue;
    }
    function O(F) {
      if (!F) return "";
      const z = At(F, "YYYY-MM-DD", !0);
      return z.isValid() ? z.format("L") : F;
    }
    function X(F) {
      const z = d.value === F.id && u.value, Z = !S(F, k(F.id));
      return z || Z ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-slate-400/90 text-[color:var(--kiut-text-secondary)] hover:border-[color:var(--kiut-primary)]/50 hover:bg-slate-50 dark:border-slate-500 dark:text-slate-400 dark:hover:border-[color:var(--kiut-primary-light)]/40 dark:hover:bg-white/[0.04]";
    }
    function P(F) {
      return S(F, k(F.id)) ? de(F) : `Editar filtro ${F.label.replace(/^\+\s*/, "")}`;
    }
    function E(F) {
      const z = k(F.id);
      if (F.type === "text") {
        v.value = z != null ? String(z) : "";
        return;
      }
      if (F.type === "select") {
        f.value = [...M(z)];
        return;
      }
      const Z = z;
      x.value = Z?.start?.trim() ?? "", b.value = Z?.end?.trim() ?? "";
    }
    function V() {
      const F = p.value;
      if (!F || F.type !== "select") return;
      const z = { ...a.modelValue };
      f.value.length === 0 ? delete z[F.id] : z[F.id] = [...f.value], s("update:modelValue", z), s("change", z);
    }
    function W(F) {
      const z = f.value.indexOf(F);
      z >= 0 ? f.value = f.value.filter((Z, dt) => dt !== z) : f.value = [...f.value, F], V();
    }
    function j(F) {
      if (!F) return;
      g.value = F;
      const z = F.getBoundingClientRect(), Z = 300;
      let dt = z.left;
      const zt = window.innerWidth - Z - 12;
      dt > zt && (dt = Math.max(12, zt)), dt < 12 && (dt = 12);
      const ue = z.bottom + 8;
      h.value = {
        top: `${ue}px`,
        left: `${dt}px`,
        width: `${Math.min(Z, window.innerWidth - 24)}px`
      };
    }
    function H(F, z) {
      if (d.value === F.id && u.value) {
        ot();
        return;
      }
      u.value && d.value !== F.id && ot(), d.value = F.id, u.value = !0, E(F), Ct().then(async () => {
        j(z.currentTarget), await Ct(), et();
      });
    }
    function N(F, z) {
      if (d.value === F.id && u.value) {
        ot();
        return;
      }
      u.value && d.value !== F.id && ot(), d.value = F.id, u.value = !0, E(F), Ct().then(async () => {
        const Z = c.get(F.id) ?? z.currentTarget;
        j(Z), await Ct(), et();
      });
    }
    function et() {
      const F = r.value;
      if (!F) return;
      F.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function G() {
      u.value = !1, d.value = null, g.value = null;
    }
    function Y(F) {
      const z = p.value;
      if (!z) return;
      if (z.type === "text") {
        v.value = F != null ? String(F) : "";
        return;
      }
      if (z.type === "select") {
        f.value = Array.isArray(F) ? F.filter((dt) => typeof dt == "string") : M(F);
        return;
      }
      const Z = F;
      x.value = Z?.start?.trim() ?? "", b.value = Z?.end?.trim() ?? "";
    }
    function ot() {
      const F = p.value;
      if (!F) return;
      if (F.type === "text") {
        const zt = v.value.trim(), ue = { ...a.modelValue };
        zt === "" ? delete ue[F.id] : ue[F.id] = zt, s("update:modelValue", ue), s("change", ue), G();
        return;
      }
      if (F.type === "select") {
        V(), G();
        return;
      }
      const z = x.value.trim(), Z = b.value.trim(), dt = { ...a.modelValue };
      !z || !Z || z > Z ? delete dt[F.id] : dt[F.id] = { start: z, end: Z }, s("update:modelValue", dt), s("change", dt), G();
    }
    function wt(F) {
      const z = { ...a.modelValue };
      delete z[F], s("update:modelValue", z), s("change", z), d.value === F && G();
    }
    function ft(F) {
      if (F.kind === "text" || F.kind === "dateRange") {
        wt(F.def.id);
        return;
      }
      const z = { ...a.modelValue }, dt = M(z[F.def.id]).filter((zt) => zt !== F.optionValue);
      dt.length === 0 ? delete z[F.def.id] : z[F.def.id] = dt, s("update:modelValue", z), s("change", z), d.value === F.def.id && E(F.def);
    }
    function Pt() {
      const F = {};
      s("update:modelValue", F), s("change", F), G();
    }
    const Vt = C(() => {
      const F = p.value;
      return F ? `Editar filtro: ${F.label}` : "Filtro";
    });
    function Kt(F) {
      const z = F.def.label.replace(/^\+\s*/, "");
      return F.kind === "select" ? `Quitar ${F.def.options.find((zt) => zt.value === F.optionValue)?.label ?? F.optionValue} del filtro ${z}` : `Quitar filtro ${z}`;
    }
    function rt(F) {
      const z = F.def.label.replace(/^\+\s*/, "");
      if (F.kind === "select") {
        const dt = F.def.options.find((zt) => zt.value === F.optionValue)?.label ?? F.optionValue;
        return `Editar filtro ${z}: ${dt}`;
      }
      return `Editar filtro ${z}`;
    }
    function de(F) {
      return `Añadir filtro ${F.label.replace(/^\+\s*/, "")}`;
    }
    const Qs = C(() => a.clearLabel);
    function Ye(F) {
      if (!u.value || !r.value) return;
      const z = F.target;
      if (!(r.value.contains(z) || (z instanceof Element ? z : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const dt of c.values())
          if (dt?.contains(z)) return;
        ot();
      }
    }
    function ma(F) {
      F.key === "Escape" && u.value && (F.preventDefault(), G());
    }
    function Ke() {
      !u.value || !g.value || j(g.value);
    }
    return re(() => {
      document.addEventListener("mousedown", Ye, !0), window.addEventListener("keydown", ma, !0), window.addEventListener("resize", Ke);
    }), Eo(() => {
      document.removeEventListener("mousedown", Ye, !0), window.removeEventListener("keydown", ma, !0), window.removeEventListener("resize", Ke);
    }), Et(
      () => a.modelValue,
      () => {
        const F = p.value;
        F && u.value && !n.panel && E(F);
      },
      { deep: !0 }
    ), (F, z) => (y(), _("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      l("div", T$, [
        l("span", B$, $(e.label), 1),
        l("div", L$, [
          (y(!0), _(q, null, tt(e.filterDefinitions, (Z) => (y(), _("button", {
            key: `pill-${Z.id}`,
            ref_for: !0,
            ref: (dt) => w(Z.id, dt),
            type: "button",
            class: K(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", X(Z)]),
            "aria-label": P(Z),
            "aria-expanded": d.value === Z.id,
            "aria-haspopup": !0,
            "aria-controls": d.value === Z.id ? i : void 0,
            onClick: (dt) => N(Z, dt)
          }, [
            Q(B(S$), {
              class: "h-3.5 w-3.5 shrink-0",
              "aria-hidden": "true"
            }),
            l("span", P$, $(Z.label), 1),
            Z.type === "select" && T(Z) > 0 ? (y(), _("span", E$, $(T(Z)), 1)) : R("", !0)
          ], 10, F$))), 128))
        ])
      ]),
      D.value ? (y(), _("div", R$, [
        l("div", I$, [
          (y(!0), _(q, null, tt(A.value, (Z) => (y(), _("div", {
            key: Z.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            l("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": rt(Z),
              onClick: (dt) => H(Z.def, dt)
            }, [
              Wt(F.$slots, "formatChip", {
                filter: Z.def,
                value: k(Z.def.id),
                optionValue: Z.kind === "select" ? Z.optionValue : void 0
              }, () => [
                kt($(I(Z)), 1)
              ], !0)
            ], 8, O$),
            l("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": Kt(Z),
              onClick: (dt) => ft(Z)
            }, [
              Q(B(D$), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, V$)
          ]))), 128))
        ]),
        l("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": Qs.value,
          onClick: Pt
        }, $(e.clearLabel), 9, z$)
      ])) : R("", !0),
      (y(), ht(Oo, { to: "body" }, [
        d.value && u.value ? (y(), _("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: r,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": Vt.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: xt(h.value),
          onKeydown: z[3] || (z[3] = Jt(() => {
          }, ["stop"]))
        }, [
          p.value ? (y(), _(q, { key: 0 }, [
            F.$slots.panel ? Wt(F.$slots, "panel", {
              key: 0,
              filter: p.value,
              close: ot,
              value: m.value,
              updateValue: Y
            }, void 0, !0) : (y(), _("div", W$, [
              p.value.type === "text" ? (y(), _(q, { key: 0 }, [
                l("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, $(p.value.label), 9, H$),
                Ut(l("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": z[0] || (z[0] = (Z) => v.value = Z),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: p.value.placeholder ?? "…",
                  onKeydown: Ea(Jt(ot, ["prevent"]), ["enter"])
                }, null, 40, j$), [
                  [Ie, v.value]
                ])
              ], 64)) : p.value.type === "select" ? (y(), _(q, { key: 1 }, [
                l("p", Y$, $(p.value.label), 1),
                l("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": p.value.label,
                  "aria-multiselectable": !0
                }, [
                  (y(!0), _(q, null, tt(p.value.options, (Z) => (y(), _("li", {
                    key: Z.value
                  }, [
                    l("label", U$, [
                      l("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: f.value.includes(Z.value),
                        onChange: (dt) => W(Z.value)
                      }, null, 40, q$),
                      l("span", X$, $(Z.label), 1)
                    ])
                  ]))), 128))
                ], 8, K$)
              ], 64)) : p.value.type === "dateRange" ? (y(), _(q, { key: 2 }, [
                l("p", G$, $(p.value.label), 1),
                l("div", Z$, [
                  l("div", Q$, [
                    l("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, J$),
                    Ut(l("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": z[1] || (z[1] = (Z) => x.value = Z),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, t4), [
                      [Ie, x.value]
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
                      [Ie, b.value]
                    ])
                  ])
                ])
              ], 64)) : R("", !0)
            ]))
          ], 64)) : R("", !0)
        ], 44, N$)) : R("", !0)
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
    const a = e, s = t, n = `kiut-input-text-${Ft()}`, o = C(() => a.id ?? n), i = C(() => `${o.value}-err`), r = C({
      get: () => a.modelValue,
      set: (c) => s("update:modelValue", c)
    });
    return (c, d) => (y(), _("div", i4, [
      e.label ? (y(), _("label", {
        key: 0,
        for: o.value,
        class: K(B(qt))
      }, $(e.label), 11, r4)) : R("", !0),
      Ut(l("input", {
        id: o.value,
        "onUpdate:modelValue": d[0] || (d[0] = (u) => r.value = u),
        type: "text",
        autocomplete: "off",
        class: K([B(ce), e.invalid ? B(Fe) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, l4), [
        [Ie, r.value]
      ]),
      e.errorText ? (y(), _("p", {
        key: 1,
        id: i.value,
        class: K(B(xe)),
        role: "alert"
      }, $(e.errorText), 11, c4)) : R("", !0)
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
    const a = e, s = t, n = `kiut-input-file-${Ft()}`, o = C(() => a.id ?? n), i = C(() => `${o.value}-err`), r = at(null), c = C(() => a.modelValue?.name ?? a.placeholder);
    function d(h) {
      const v = h.target.files?.[0] ?? null;
      s("update:modelValue", v);
    }
    function u() {
      s("update:modelValue", null), r.value && (r.value.value = "");
    }
    return (h, g) => (y(), _("div", u4, [
      e.label ? (y(), _("label", {
        key: 0,
        for: o.value,
        class: K(B(qt))
      }, $(e.label), 11, h4)) : R("", !0),
      l("div", {
        class: K([
          B(ce),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? B(Fe) : "",
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
          Q(B(Lg), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          kt(" " + $(e.chooseLabel), 1)
        ], 10, g4),
        l("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: c.value || void 0
        }, $(c.value), 9, p4),
        e.modelValue && !e.disabled ? (y(), _("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: u
        }, [
          Q(B(zi), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, v4)) : R("", !0)
      ], 2),
      e.errorText ? (y(), _("p", {
        key: 1,
        id: i.value,
        class: K(B(xe)),
        role: "alert"
      }, $(e.errorText), 11, b4)) : R("", !0)
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
    const a = e, s = t, n = `kiut-input-datetime-${Ft()}`, o = C(() => a.id ?? n), i = C(() => `${o.value}-err`), r = C(() => a.modelValue ?? "");
    function c(d) {
      const u = d.target.value;
      s("update:modelValue", u === "" ? null : u);
    }
    return (d, u) => (y(), _("div", y4, [
      e.label ? (y(), _("label", {
        key: 0,
        for: o.value,
        class: K(B(qt))
      }, $(e.label), 11, _4)) : R("", !0),
      l("div", x4, [
        Q(B(Oi), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        l("input", {
          id: o.value,
          value: r.value,
          type: "datetime-local",
          autocomplete: "off",
          class: K([
            B(ce),
            "pl-10",
            e.invalid ? B(Fe) : ""
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
      e.errorText ? (y(), _("p", {
        key: 1,
        id: i.value,
        class: K(B(xe)),
        role: "alert"
      }, $(e.errorText), 11, w4)) : R("", !0)
    ]));
  }
}), M4 = { class: "font-sans" }, C4 = ["for"], S4 = { class: "relative" }, D4 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], A4 = ["id"], T4 = /* @__PURE__ */ J({
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
      const g = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(h.trim());
      if (!g) return null;
      const v = Number(g[1]), f = Number(g[2]);
      return !Number.isInteger(v) || !Number.isInteger(f) || v < 0 || v > 23 || f < 0 || f > 59 ? null : `${String(v).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
    }
    function s(h) {
      return h === "" ? null : a(h);
    }
    const n = e, o = t, i = `kiut-input-time-${Ft()}`, r = C(() => n.id ?? i), c = C(() => `${r.value}-err`), d = C(() => n.modelValue == null || n.modelValue === "" ? "" : a(n.modelValue) ?? "");
    function u(h) {
      const g = h.target.value;
      o("update:modelValue", s(g));
    }
    return (h, g) => (y(), _("div", M4, [
      e.label ? (y(), _("label", {
        key: 0,
        for: r.value,
        class: K(B(qt))
      }, $(e.label), 11, C4)) : R("", !0),
      l("div", S4, [
        Q(B(Og), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        l("input", {
          id: r.value,
          value: d.value,
          type: "time",
          autocomplete: "off",
          class: K([
            B(ce),
            "pl-10",
            e.invalid ? B(Fe) : ""
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
      e.errorText ? (y(), _("p", {
        key: 1,
        id: c.value,
        class: K(B(xe)),
        role: "alert"
      }, $(e.errorText), 11, A4)) : R("", !0)
    ]));
  }
}), B4 = { class: "font-sans" }, L4 = ["for"], F4 = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, P4 = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], E4 = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, R4 = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, I4 = { class: "min-w-0 text-left leading-snug" }, O4 = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, V4 = { class: "min-w-0 text-right leading-snug" }, z4 = {
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
    const a = e, s = t, n = `kiut-input-range-${Ft()}`, o = C(() => a.id ?? n), i = C(() => `${o.value}-err`), r = C(() => {
      const v = [];
      return a.errorText && v.push(i.value), v.length ? v.join(" ") : void 0;
    }), c = C(
      () => !!(a.caption && !a.captionMin && !a.captionMax)
    ), d = C(() => !!(a.captionMin || a.captionMax)), u = C(() => {
      const { min: v, max: f, modelValue: x } = a;
      if (f === v) return 0;
      const b = (x - v) / (f - v);
      return Math.min(100, Math.max(0, b * 100));
    }), h = C(() => ({
      "--kiut-range-fill": `${u.value}%`,
      "--kiut-range-length": a.trackLength
    }));
    function g(v) {
      const f = Number(v.target.value);
      s("update:modelValue", Number.isNaN(f) ? a.min : f);
    }
    return (v, f) => (y(), _("div", B4, [
      e.label ? (y(), _("label", {
        key: 0,
        for: o.value,
        class: K(B(qt))
      }, $(e.label), 11, L4)) : R("", !0),
      l("div", {
        class: K(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (y(), _("p", F4, $(e.captionMax), 1)) : R("", !0),
        l("div", {
          class: K(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: xt(h.value)
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
            onInput: g
          }, null, 42, P4)
        ], 6),
        e.orientation === "horizontal" && c.value ? (y(), _("p", E4, $(e.caption), 1)) : e.orientation === "horizontal" && d.value ? (y(), _("div", R4, [
          l("span", I4, $(e.captionMin), 1),
          l("span", O4, $(e.caption), 1),
          l("span", V4, $(e.captionMax), 1)
        ])) : R("", !0),
        e.orientation === "vertical" && e.captionMin ? (y(), _("p", z4, $(e.captionMin), 1)) : R("", !0),
        e.orientation === "vertical" && e.caption ? (y(), _("p", N4, $(e.caption), 1)) : R("", !0)
      ], 2),
      e.errorText ? (y(), _("p", {
        key: 1,
        id: i.value,
        class: K(B(xe)),
        role: "alert"
      }, $(e.errorText), 11, W4)) : R("", !0)
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
      const h = u.target.value;
      if (h === "") {
        s("update:modelValue", null);
        return;
      }
      const g = Number(h);
      s("update:modelValue", Number.isNaN(g) ? null : g);
    }
    return (u, h) => (y(), _("div", Y4, [
      e.label ? (y(), _("label", {
        key: 0,
        for: o.value,
        class: K(B(qt))
      }, $(e.label), 11, K4)) : R("", !0),
      l("input", {
        id: o.value,
        value: c.value,
        type: "number",
        onInput: d,
        class: K([
          B(ce),
          e.invalid ? B(Fe) : "",
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
      e.errorText ? (y(), _("p", {
        key: 1,
        id: i.value,
        class: K(B(xe)),
        role: "alert"
      }, $(e.errorText), 11, q4)) : R("", !0)
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
      const x = f.trim(), b = /^#?([0-9a-fA-F]{6})$/.exec(x);
      if (b) return `#${b[1].toLowerCase()}`;
      const p = /^#?([0-9a-fA-F]{3})$/.exec(x);
      if (p) {
        const [m, w, k] = p[1].split("");
        return `#${m}${m}${w}${w}${k}${k}`.toLowerCase();
      }
      return null;
    }
    function s(f) {
      return a(f) ?? e3;
    }
    const n = e, o = t, i = `kiut-input-color-${Ft()}`, r = C(() => n.id ?? i), c = C(() => `${r.value}-err`), d = C(() => s(n.modelValue)), u = at(d.value), h = at(!1);
    Et(d, (f) => {
      h.value || (u.value = f);
    });
    function g(f) {
      const x = f.target, b = a(x.value);
      b && o("update:modelValue", b);
    }
    function v() {
      h.value = !1;
      const f = a(u.value);
      f ? (u.value = f, o("update:modelValue", f)) : u.value = d.value;
    }
    return Et(u, (f) => {
      if (!h.value) return;
      const x = a(f);
      x && o("update:modelValue", x);
    }), (f, x) => (y(), _("div", G4, [
      e.label ? (y(), _("label", {
        key: 0,
        for: r.value,
        class: K(B(qt))
      }, $(e.label), 11, Z4)) : R("", !0),
      l("div", {
        class: K([
          s3,
          e.invalid ? B(Fe) : "",
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
          onInput: g
        }, null, 40, Q4),
        e.showHexInput ? Ut((y(), _("input", {
          key: 0,
          "onUpdate:modelValue": x[0] || (x[0] = (b) => u.value = b),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: a3,
          onFocus: x[1] || (x[1] = (b) => h.value = !0),
          onBlur: v
        }, null, 40, J4)), [
          [Ie, u.value]
        ]) : R("", !0)
      ], 2),
      e.errorText ? (y(), _("p", {
        key: 1,
        id: c.value,
        class: K(B(xe)),
        role: "alert"
      }, $(e.errorText), 11, t3)) : R("", !0)
    ]));
  }
});
function Hi(e, t) {
  return y(), _("svg", {
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
}, l3 = { class: "min-w-0 flex-1" }, ji = /* @__PURE__ */ J({
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
    const a = e, s = t, n = `kiut-select-${Ft()}`, o = `${n}-label`, i = `${n}-btn`, r = `${n}-listbox`, c = at(null), d = at(null), u = at(!1), h = at(0), g = C(() => a.options.filter((A) => !A.disabled)), v = C(
      () => a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opción"
    ), f = C(() => a.modelValue === null || a.modelValue === void 0 || a.modelValue === "" ? a.placeholder : a.options.find((T) => T.value === a.modelValue)?.label ?? String(a.modelValue));
    function x(A) {
      return `${String(A.value)}-${A.label}`;
    }
    function b(A) {
      return a.modelValue === A.value;
    }
    function p(A, T) {
      const L = b(A), I = h.value === T;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        L ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !L && I ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function m(A) {
      s("update:modelValue", A.value), u.value = !1;
    }
    function w() {
      a.disabled || (u.value = !u.value);
    }
    function k(A) {
      if (A.stopPropagation(), !a.disabled && (w(), u.value)) {
        const T = Math.max(
          0,
          g.value.findIndex((L) => L.value === a.modelValue)
        );
        h.value = T, Ct(() => d.value?.focus());
      }
    }
    function M(A) {
      if (!u.value) return;
      const T = c.value;
      T && !T.contains(A.target) && (u.value = !1);
    }
    function S(A) {
      a.disabled || (A.key === "ArrowDown" || A.key === "Enter" || A.key === " ") && (A.preventDefault(), u.value || (u.value = !0, h.value = Math.max(
        0,
        g.value.findIndex((T) => T.value === a.modelValue)
      ), Ct(() => d.value?.focus())));
    }
    function D(A) {
      const T = g.value;
      if (T.length !== 0) {
        if (A.key === "Escape") {
          A.preventDefault(), u.value = !1;
          return;
        }
        if (A.key === "ArrowDown") {
          A.preventDefault(), h.value = Math.min(h.value + 1, T.length - 1);
          return;
        }
        if (A.key === "ArrowUp") {
          A.preventDefault(), h.value = Math.max(h.value - 1, 0);
          return;
        }
        if (A.key === "Enter") {
          A.preventDefault();
          const L = T[h.value];
          L && m(L);
        }
      }
    }
    return re(() => {
      document.addEventListener("click", M);
    }), We(() => {
      document.removeEventListener("click", M);
    }), (A, T) => (y(), _("div", {
      ref_key: "rootRef",
      ref: c,
      class: "relative font-sans"
    }, [
      e.label ? (y(), _("label", {
        key: 0,
        id: o,
        class: K(B(qt))
      }, $(e.label), 3)) : R("", !0),
      l("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: K([
          B(ce),
          "flex items-center justify-between gap-2 text-left",
          u.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": u.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : v.value,
        onClick: k,
        onKeydown: S
      }, [
        l("span", {
          class: K([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, $(f.value), 3),
        Q(B(Vi), {
          class: K(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", u.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, o3),
      Ut(l("ul", {
        id: r,
        ref_key: "listRef",
        ref: d,
        role: "listbox",
        tabindex: "-1",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: Jt(D, ["stop"])
      }, [
        (y(!0), _(q, null, tt(g.value, (L, I) => (y(), _("li", {
          key: x(L),
          role: "option",
          "aria-selected": b(L),
          class: K(p(L, I)),
          onClick: Jt((O) => m(L), ["stop"]),
          onMouseenter: (O) => h.value = I
        }, [
          e.showOptionCheck ? (y(), _("span", r3, [
            b(L) ? (y(), ht(B(Hi), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : R("", !0)
          ])) : R("", !0),
          l("span", l3, $(L.label), 1)
        ], 42, i3))), 128))
      ], 544), [
        [la, u.value]
      ])
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
    const a = e, s = t, n = `kiut-multiselect-${Ft()}`, o = `${n}-label`, i = `${n}-btn`, r = `${n}-listbox`, c = at(null), d = at(null), u = at(!1), h = at(0), g = C(() => a.options.filter((L) => !L.disabled)), v = C(() => new Set(a.modelValue ?? [])), f = C(
      () => a.options.filter((L) => v.value.has(L.value))
    ), x = C(() => {
      const L = a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opciones", I = f.value.length;
      return I === 0 ? L : `${L}, ${I} seleccionada${I === 1 ? "" : "s"}`;
    });
    function b(L) {
      return `${String(L.value)}-${L.label}`;
    }
    function p(L) {
      return v.value.has(L.value);
    }
    function m(L, I) {
      const O = p(L), X = h.value === I;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        O ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !O && X ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function w(L) {
      const I = [...a.modelValue ?? []], O = I.indexOf(L.value);
      O >= 0 ? I.splice(O, 1) : I.push(L.value), s("update:modelValue", I);
    }
    function k() {
      const L = g.value;
      if (L.length === 0) {
        h.value = 0;
        return;
      }
      const I = v.value, O = L.findIndex((X) => I.has(X.value));
      h.value = O >= 0 ? O : 0;
    }
    function M() {
      a.disabled || (u.value = !u.value);
    }
    function S(L) {
      L.stopPropagation(), !a.disabled && (M(), u.value && (k(), Ct(() => d.value?.focus())));
    }
    function D(L) {
      if (!u.value) return;
      const I = c.value;
      I && !I.contains(L.target) && (u.value = !1);
    }
    function A(L) {
      a.disabled || (L.key === "ArrowDown" || L.key === "Enter" || L.key === " ") && (L.preventDefault(), u.value || (u.value = !0, k(), Ct(() => d.value?.focus())));
    }
    function T(L) {
      const I = g.value;
      if (I.length !== 0) {
        if (L.key === "Escape") {
          L.preventDefault(), u.value = !1;
          return;
        }
        if (L.key === "ArrowDown") {
          L.preventDefault(), h.value = Math.min(h.value + 1, I.length - 1);
          return;
        }
        if (L.key === "ArrowUp") {
          L.preventDefault(), h.value = Math.max(h.value - 1, 0);
          return;
        }
        if (L.key === "Enter" || L.key === " ") {
          L.preventDefault();
          const O = I[h.value];
          O && w(O);
        }
      }
    }
    return re(() => {
      document.addEventListener("click", D);
    }), We(() => {
      document.removeEventListener("click", D);
    }), (L, I) => (y(), _("div", {
      ref_key: "rootRef",
      ref: c,
      class: "relative font-sans"
    }, [
      e.label ? (y(), _("label", {
        key: 0,
        id: o,
        class: K(B(qt))
      }, $(e.label), 3)) : R("", !0),
      l("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: K([
          B(ce),
          "flex items-start justify-between gap-2 text-left",
          u.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": u.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : x.value,
        onClick: S,
        onKeydown: A
      }, [
        l("div", d3, [
          f.value.length === 0 ? (y(), _("span", u3, $(e.placeholder), 1)) : (y(), _("div", h3, [
            (y(!0), _(q, null, tt(f.value, (O) => (y(), _("span", {
              key: b(O),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              l("span", f3, $(O.label), 1)
            ]))), 128))
          ]))
        ]),
        Q(B(Vi), {
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
        onKeydown: Jt(T, ["stop"])
      }, [
        (y(!0), _(q, null, tt(g.value, (O, X) => (y(), _("li", {
          key: b(O),
          role: "option",
          "aria-selected": p(O),
          class: K(m(O, X)),
          onClick: Jt((P) => w(O), ["stop"]),
          onMouseenter: (P) => h.value = X
        }, [
          l("span", p3, [
            p(O) ? (y(), ht(B(Hi), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : R("", !0)
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
    return (o, i) => (y(), _("button", {
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
        Ea(Jt(n, ["prevent", "stop"]), ["space"]),
        Ea(Jt(n, ["prevent"]), ["enter"])
      ]
    }, [
      l("span", {
        class: K(["pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", e.modelValue ? "translate-x-7" : "translate-x-0"]),
        "aria-hidden": "true"
      }, null, 2),
      l("span", y3, $(e.ariaLabel), 1)
    ], 42, m3));
  }
}), x3 = { class: "font-sans" }, k3 = ["for"], w3 = { class: "flex gap-2" }, $3 = { class: "w-[7.5rem] shrink-0" }, M3 = { class: "min-w-0 flex-1" }, C3 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], S3 = ["id"], D3 = /* @__PURE__ */ J({
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
    return (d, u) => (y(), _("div", x3, [
      e.label ? (y(), _("label", {
        key: 0,
        for: o.value,
        class: K(B(qt))
      }, $(e.label), 11, k3)) : R("", !0),
      l("div", w3, [
        l("div", $3, [
          Q(ji, {
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
            class: K([B(ce), e.invalid ? B(Fe) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, C3), [
            [Ie, c.value]
          ])
        ])
      ]),
      e.errorText ? (y(), _("p", {
        key: 1,
        id: i.value,
        class: K(B(xe)),
        role: "alert"
      }, $(e.errorText), 11, S3)) : R("", !0)
    ]));
  }
}), A3 = ["role", "aria-label"], T3 = { class: "flex flex-wrap gap-2" }, B3 = ["aria-checked", "role", "onClick"], L3 = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, F3 = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, P3 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, E3 = /* @__PURE__ */ J({
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
    return (c, d) => (y(), _("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      l("div", T3, [
        (y(!0), _(q, null, tt(e.items, (u) => (y(), _("button", {
          key: u.value,
          type: "button",
          class: K(i(u)),
          "aria-checked": o(u),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => r(u)
        }, [
          l("span", L3, [
            o(u) ? (y(), _("span", F3)) : R("", !0)
          ]),
          u.dotColor ? (y(), _("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: xt({ backgroundColor: u.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : R("", !0),
          l("span", P3, $(u.label), 1)
        ], 10, B3))), 128))
      ])
    ], 8, A3));
  }
}), R3 = ["aria-label"], I3 = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], O3 = { class: "truncate px-3 py-2 text-sm font-medium" }, V3 = /* @__PURE__ */ J({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, s = t, n = `kiut-seg-${Ft()}`, o = (x) => `${n}-seg-${x}`, i = at([]);
    function r(x, b) {
      x instanceof HTMLButtonElement ? i.value[b] = x : i.value[b] = null;
    }
    function c(x) {
      return x.value === a.modelValue;
    }
    function d(x) {
      const b = c(x), p = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return x.disabled ? `${p} cursor-not-allowed opacity-40` : b ? `${p} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${p} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function u(x) {
      x.disabled || x.value !== a.modelValue && s("update:modelValue", x.value);
    }
    function h(x, b, p) {
      u(x), Ct(() => i.value[b]?.focus());
    }
    const g = C(
      () => a.items.map((x, b) => x.disabled ? -1 : b).filter((x) => x >= 0)
    );
    function v(x, b) {
      const p = a.items.length;
      if (p === 0) return 0;
      let m = x;
      for (let w = 0; w < p; w++)
        if (m = (m + b + p) % p, !a.items[m]?.disabled) return m;
      return x;
    }
    function f(x, b) {
      if (x.key === "ArrowRight" || x.key === "ArrowDown") {
        x.preventDefault();
        const p = v(b, 1), m = a.items[p];
        m && u(m), Ct(() => i.value[p]?.focus());
      } else if (x.key === "ArrowLeft" || x.key === "ArrowUp") {
        x.preventDefault();
        const p = v(b, -1), m = a.items[p];
        m && u(m), Ct(() => i.value[p]?.focus());
      } else if (x.key === "Home") {
        x.preventDefault();
        const p = g.value[0];
        if (p !== void 0) {
          const m = a.items[p];
          m && u(m), Ct(() => i.value[p]?.focus());
        }
      } else if (x.key === "End") {
        x.preventDefault();
        const p = g.value[g.value.length - 1];
        if (p !== void 0) {
          const m = a.items[p];
          m && u(m), Ct(() => i.value[p]?.focus());
        }
      }
    }
    return (x, b) => (y(), _("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (y(!0), _(q, null, tt(e.items, (p, m) => (y(), _("button", {
        id: o(p.value),
        key: p.value,
        ref_for: !0,
        ref: (w) => r(w, m),
        type: "button",
        role: "tab",
        "aria-selected": c(p),
        "aria-disabled": p.disabled === !0,
        tabindex: c(p) ? 0 : -1,
        class: K(d(p)),
        onClick: (w) => h(p, m),
        onKeydown: (w) => f(w, m)
      }, [
        l("span", O3, $(p.label), 1)
      ], 42, I3))), 128))
    ], 8, R3));
  }
});
function Me(e) {
  const [t, a, s] = e.split("-").map(Number);
  return new Date(t, a - 1, s);
}
function Je(e) {
  const t = e.getFullYear(), a = String(e.getMonth() + 1).padStart(2, "0"), s = String(e.getDate()).padStart(2, "0");
  return `${t}-${a}-${s}`;
}
function he(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function xs(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function Ao(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function Qa(e, t) {
  const a = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), s = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return a < s ? -1 : a > s ? 1 : 0;
}
function To(e, t) {
  return Qa(e, t) === 0;
}
function ks(e, t) {
  return Qa(e, t) < 0;
}
function z3(e, t) {
  return Qa(e, t) >= 0;
}
function N3(e, t) {
  return Qa(e, t) <= 0;
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
function Bo(e) {
  return `${H3[e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function Lo(e) {
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
    const a = e, s = t, o = `${`kiut-drp-${Ft()}`}-lbl`, i = at(null), r = at(null), c = at(!1), d = at(null), u = at(xs(/* @__PURE__ */ new Date())), h = C(() => {
      const D = xs(u.value);
      return [D, Ao(D, 1)];
    }), g = C(() => a.ariaLabel ?? a.placeholder), v = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], f = C(() => {
      if (!a.modelValue.start || !a.modelValue.end) return a.placeholder;
      const D = Me(a.modelValue.start), A = Me(a.modelValue.end);
      return `${Bo(D)} – ${Bo(A)}`;
    });
    function x(D, A) {
      return D.getMonth() === A.getMonth() && D.getFullYear() === A.getFullYear();
    }
    function b(D) {
      const A = he(D);
      if (a.minDate) {
        const T = he(Me(a.minDate));
        if (ks(A, T)) return !0;
      }
      if (a.maxDate) {
        const T = he(Me(a.maxDate));
        if (ks(T, A)) return !0;
      }
      return !1;
    }
    function p(D, A) {
      const T = x(A, D), L = a.modelValue.start ? he(Me(a.modelValue.start)) : null, I = a.modelValue.end ? he(Me(a.modelValue.end)) : null, O = he(A), X = T ? "text-[color:var(--kiut-text-primary)] dark:text-slate-100" : "text-slate-400 dark:text-slate-500";
      if (!L || !I)
        return `${X} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
      const P = z3(O, L) && N3(O, I), E = To(O, L), V = To(O, I);
      return E || V ? "bg-[color:var(--kiut-primary)] font-semibold text-white shadow-sm" : P ? `${X} bg-violet-100/90 dark:bg-violet-950/35 hover:bg-violet-200/80 dark:hover:bg-violet-900/40` : `${X} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
    }
    function m(D) {
      if (b(D)) return;
      const A = he(D);
      if (!d.value) {
        d.value = new Date(A), s("update:modelValue", { start: Je(A), end: Je(A) });
        return;
      }
      let L = he(d.value), I = new Date(A);
      ks(I, L) && ([L, I] = [I, L]), s("update:modelValue", { start: Je(L), end: Je(I) }), d.value = null, c.value = !1;
    }
    function w(D) {
      u.value = Ao(u.value, D);
    }
    function k() {
      c.value = !1;
    }
    function M(D) {
      if (D.stopPropagation(), c.value = !c.value, c.value) {
        if (d.value = null, a.modelValue.start)
          try {
            u.value = xs(Me(a.modelValue.start));
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
    }), re(() => {
      document.addEventListener("click", S);
    }), We(() => {
      document.removeEventListener("click", S);
    }), (D, A) => (y(), _("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (y(), _("label", {
        key: 0,
        id: o,
        class: K(B(qt))
      }, $(e.label), 3)) : R("", !0),
      l("button", {
        type: "button",
        class: K([B(ce), "flex w-full items-center gap-2 text-left"]),
        "aria-expanded": c.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : g.value,
        onClick: M
      }, [
        Q(B(Oi), {
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
        onKeydown: Ea(Jt(k, ["stop"]), ["escape"])
      }, [
        l("div", U3, [
          l("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes anterior",
            onClick: A[0] || (A[0] = (T) => w(-1))
          }, [
            Q(B(Rg), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ]),
          l("div", q3, [
            l("span", X3, $(B(Lo)(h.value[0])), 1),
            l("span", G3, $(B(Lo)(h.value[1])), 1)
          ]),
          l("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes siguiente",
            onClick: A[1] || (A[1] = (T) => w(1))
          }, [
            Q(B(Ig), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ])
        ]),
        l("div", Z3, [
          (y(!0), _(q, null, tt(h.value, (T) => (y(), _("div", {
            key: `${T.getFullYear()}-${T.getMonth()}`,
            class: "min-w-0 flex-1"
          }, [
            l("div", Q3, [
              (y(), _(q, null, tt(v, (L) => l("span", { key: L }, $(L), 1)), 64))
            ]),
            l("div", J3, [
              (y(!0), _(q, null, tt(B(W3)(T), (L) => (y(), _("button", {
                key: B(Je)(L),
                type: "button",
                disabled: b(L),
                class: K(["relative flex h-9 items-center justify-center rounded-lg text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", p(T, L)]),
                onClick: (I) => m(L)
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
    return (r, c) => a.value ? (y(), _("span", {
      key: 0,
      role: "status",
      class: K(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", n.value])
    }, [
      e.statusLive === !0 ? (y(), _("span", aM, [...c[0] || (c[0] = [
        l("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        l("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : R("", !0),
      l("span", {
        class: K(["min-w-0 flex-1 text-center", o.value])
      }, $(s.value), 3)
    ], 2)) : (y(), _("span", {
      key: 1,
      class: K(["inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight", i.value])
    }, [
      Wt(r.$slots, "default", {}, () => [
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
}, Pa = /* @__PURE__ */ J({
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
    const t = e, a = qi(), s = C(() => !!t.tooltip?.trim()), n = C(() => t.variant === "action"), o = C(() => !n.value), i = C(() => {
      const u = a["aria-label"];
      if (typeof u == "string" && u.length > 0) return u;
      if (n.value && t.tooltip?.trim()) return t.tooltip.trim();
    }), r = C(() => {
      const u = a.type;
      return u === "submit" || u === "reset" || u === "button" ? u : "button";
    }), c = C(() => {
      const { class: u, type: h, "aria-label": g, ...v } = a;
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
    return (u, h) => s.value ? (y(), _("span", nM, [
      l("button", tn({
        type: r.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [d.value, B(a).class]],
        disabled: e.disabled,
        "aria-label": i.value
      }, c.value), [
        u.$slots.icon ? (y(), _("span", {
          key: 0,
          class: K(["inline-flex shrink-0", n.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          Wt(u.$slots, "icon")
        ], 2)) : R("", !0),
        o.value ? (y(), _("span", iM, [
          Wt(u.$slots, "default")
        ])) : R("", !0)
      ], 16, oM),
      l("span", rM, $(e.tooltip), 1)
    ])) : (y(), _("button", tn({
      key: 1,
      type: r.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [d.value, B(a).class]],
      disabled: e.disabled,
      "aria-label": i.value
    }, c.value), [
      u.$slots.icon ? (y(), _("span", {
        key: 0,
        class: K(["inline-flex shrink-0", n.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        Wt(u.$slots, "icon")
      ], 2)) : R("", !0),
      o.value ? (y(), _("span", cM, [
        Wt(u.$slots, "default")
      ])) : R("", !0)
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
    return Et(
      () => a.modelValue,
      (u) => {
        u && requestAnimationFrame(() => {
          i.value?.focus({ preventScroll: !0 });
        });
      }
    ), re(() => {
      document.addEventListener("keydown", d);
    }), We(() => {
      document.removeEventListener("keydown", d);
    }), (u, h) => (y(), ht(Oo, { to: "body" }, [
      Q(Ro, { name: "kiut-modal" }, {
        default: ta(() => [
          e.modelValue ? (y(), _("div", dM, [
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
                  e.subtitle ? (y(), _("p", hM, $(e.subtitle), 1)) : R("", !0)
                ]),
                Q(Pa, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  onClick: r
                }, {
                  icon: ta(() => [
                    Q(B(zi), { class: "h-5 w-5" })
                  ]),
                  _: 1
                })
              ], 2),
              l("div", fM, [
                Wt(u.$slots, "default", {}, void 0, !0)
              ]),
              l("footer", gM, [
                Q(Pa, {
                  variant: "secondary",
                  type: "button",
                  onClick: r
                }, {
                  default: ta(() => [
                    kt($(e.cancelLabel), 1)
                  ]),
                  _: 1
                }),
                Q(Pa, {
                  variant: "primary",
                  type: "button",
                  onClick: c
                }, {
                  default: ta(() => [
                    kt($(e.confirmLabel), 1)
                  ]),
                  _: 1
                })
              ])
            ], 512)
          ])) : R("", !0)
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
    const t = e, a = Io(), n = `${`kiut-section-${Ft()}`}-title`, o = C(() => !!(a.icon || t.icon));
    return (i, r) => (y(), _("section", {
      class: "mb-6 text-left font-['Inter',system-ui,sans-serif]",
      "aria-labelledby": n
    }, [
      l("header", bM, [
        l("div", mM, [
          l("div", yM, [
            o.value ? (y(), _("span", _M, [
              Wt(i.$slots, "icon", {}, () => [
                e.icon ? (y(), ht(Fs(e.icon), { key: 0 })) : R("", !0)
              ])
            ])) : R("", !0),
            l("h2", {
              id: n,
              class: "min-w-0 text-3xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
            }, $(e.title), 1)
          ]),
          e.subtitle ? (y(), _("p", xM, $(e.subtitle), 1)) : R("", !0)
        ]),
        i.$slots.actions ? (y(), _("div", kM, [
          Wt(i.$slots, "actions")
        ])) : R("", !0)
      ]),
      i.$slots.default ? (y(), _("div", wM, [
        Wt(i.$slots, "default")
      ])) : R("", !0)
    ]));
  }
}), EM = {
  install(e) {
    e.component("KiutChartBar", ie), e.component("KiutChartLine", ye), e.component("KiutPieChart", Za), e.component("KiutBoxplotChart", Xh), e.component("KiutCandlestickChart", Ri), e.component("KiutHistogramChart", Ii), e.component("KiutSankeyChart", _e), e.component("KiutAgentsPerDay", rp), e.component("KiutBookingManager", Yp), e.component("KiutCheckin", p0), e.component("KiutCheckinMetrics", z0), e.component("KiutCheckinSegments", fv), e.component("KiutDisruption", Gv), e.component("KiutFAQ", gb), e.component("KiutMessagesPerAgent", wb), e.component("KiutRecordLocator", qb), e.component("KiutSalesByChannel", hm), e.component("KiutSeller", a1), e.component("KiutTopAgents", u1), e.component("KiutPaymentMethod", U1), e.component("KiutAgentHumanConversations", Ey), e.component("KiutChannelMetrics", Uy), e.component("KiutTriageCombinations", h_), e.component("KiutSelectLanguage", w_), e.component("KiutGuardrails", Z_), e.component("KiutDisruptionNotifier", q2), e.component("KiutTotalConversationsCard", tx), e.component("KiutCsatP95Card", ix), e.component("KiutAiGeneratedRevenueCard", hx), e.component("KiutNpsDailyMetrics", Ni), e.component("KiutNpsMetrics", ek), e.component("KiutNpsOverviewMetrics", Wi), e.component("KiutAWSCost", _k), e.component("KiutCostUsage", Hk), e.component("KiutTokenUsage", d5), e.component("KiutConversationCount", $5), e.component("KiutTopAgentsAnalysis", I5), e.component("KiutTopAgentsPie", U5), e.component("KiutDailyCostTrends", sw), e.component("KiutModelUsage", Sw), e.component("KiutMessageRoles", Yw), e.component("KiutCostPerConversations", d$), e.component("Tabs", v$), e.component("Table", C$), e.component("Filters", o4), e.component("InputText", d4), e.component("InputFile", m4), e.component("InputDateTime", $4), e.component("InputTime", T4), e.component("InputRange", j4), e.component("InputNumber", X4), e.component("InputColorPicker", n3), e.component("Select", ji), e.component("MultiSelect", b3), e.component("Toggle", _3), e.component("InputPhone", D3), e.component("SelectablePills", E3), e.component("SegmentedControl", V3), e.component("DateRangePicker", eM), e.component("Tag", sM), e.component("Button", Pa), e.component("Modal", vM), e.component("Section", $M);
  }
};
export {
  _k as AWSCost,
  Ey as AgentHumanConversations,
  rp as AgentsPerDay,
  hx as AiGeneratedRevenueCard,
  Yp as BookingManager,
  Xh as BoxplotChart,
  Pa as Button,
  Ri as CandlestickChart,
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
  Ii as HistogramChart,
  n3 as InputColorPicker,
  $4 as InputDateTime,
  m4 as InputFile,
  X4 as InputNumber,
  D3 as InputPhone,
  j4 as InputRange,
  d4 as InputText,
  T4 as InputTime,
  EM as KiutUIPlugin,
  Yw as MessageRoles,
  wb as MessagesPerAgent,
  vM as Modal,
  Sw as ModelUsage,
  b3 as MultiSelect,
  Ni as NpsDailyMetrics,
  ek as NpsMetrics,
  Wi as NpsOverviewMetrics,
  U1 as PaymentMethod,
  Za as PieChart,
  qb as RecordLocator,
  hm as SalesByChannel,
  _e as SankeyChart,
  $M as Section,
  V3 as SegmentedControl,
  ji as Select,
  w_ as SelectLanguage,
  E3 as SelectablePills,
  a1 as Seller,
  C$ as Table,
  v$ as Tabs,
  sM as Tag,
  _3 as Toggle,
  d5 as TokenUsage,
  u1 as TopAgents,
  I5 as TopAgentsAnalysis,
  U5 as TopAgentsPie,
  tx as TotalConversationsCard,
  h_ as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
