import { defineComponent as Z, shallowRef as Bo, h as _a, ref as st, onMounted as te, onUnmounted as Me, watch as Ft, toRaw as xa, nextTick as Et, version as Ki, isProxy as Lo, computed as D, toRef as dt, openBlock as _, createElementBlock as k, createVNode as R, unref as F, createElementVNode as r, Fragment as q, renderList as at, normalizeStyle as gt, normalizeClass as W, toDisplayString as A, createCommentVNode as z, onBeforeUnmount as Fo, createStaticVNode as es, withDirectives as Kt, vShow as mn, useSlots as Aa, renderSlot as wt, createBlock as nt, resolveDynamicComponent as je, withCtx as P, createSlots as St, createTextVNode as bt, vModelSelect as qi, Transition as un, Teleport as Ta, withModifiers as ie, withKeys as Hn, vModelText as Pe, useAttrs as Eo, mergeProps as jn } from "vue";
import * as ns from "echarts/core";
import { TooltipComponent as Ui, TitleComponent as Xi } from "echarts/components";
import { SankeyChart as Gi } from "echarts/charts";
import { CanvasRenderer as Zi } from "echarts/renderers";
import Lt from "moment";
function $n(e) {
  return e + 0.5 | 0;
}
const _e = (e, t, n) => Math.max(Math.min(e, n), t);
function rn(e) {
  return _e($n(e * 2.55), 0, 255);
}
function Ce(e) {
  return _e($n(e * 255), 0, 255);
}
function de(e) {
  return _e($n(e / 2.55) / 100, 0, 1);
}
function as(e) {
  return _e($n(e * 100), 0, 100);
}
const Ut = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, ka = [..."0123456789ABCDEF"], Qi = (e) => ka[e & 15], Ji = (e) => ka[(e & 240) >> 4] + ka[e & 15], Mn = (e) => (e & 240) >> 4 === (e & 15), tl = (e) => Mn(e.r) && Mn(e.g) && Mn(e.b) && Mn(e.a);
function el(e) {
  var t = e.length, n;
  return e[0] === "#" && (t === 4 || t === 5 ? n = {
    r: 255 & Ut[e[1]] * 17,
    g: 255 & Ut[e[2]] * 17,
    b: 255 & Ut[e[3]] * 17,
    a: t === 5 ? Ut[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (n = {
    r: Ut[e[1]] << 4 | Ut[e[2]],
    g: Ut[e[3]] << 4 | Ut[e[4]],
    b: Ut[e[5]] << 4 | Ut[e[6]],
    a: t === 9 ? Ut[e[7]] << 4 | Ut[e[8]] : 255
  })), n;
}
const nl = (e, t) => e < 255 ? t(e) : "";
function al(e) {
  var t = tl(e) ? Qi : Ji;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + nl(e.a, t) : void 0;
}
const sl = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Io(e, t, n) {
  const a = t * Math.min(n, 1 - n), s = (o, i = (o + e / 30) % 12) => n - a * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [s(0), s(8), s(4)];
}
function ol(e, t, n) {
  const a = (s, o = (s + e / 60) % 6) => n - n * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [a(5), a(3), a(1)];
}
function il(e, t, n) {
  const a = Io(e, 1, 0.5);
  let s;
  for (t + n > 1 && (s = 1 / (t + n), t *= s, n *= s), s = 0; s < 3; s++)
    a[s] *= 1 - t - n, a[s] += t;
  return a;
}
function ll(e, t, n, a, s) {
  return e === s ? (t - n) / a + (t < n ? 6 : 0) : t === s ? (n - e) / a + 2 : (e - t) / a + 4;
}
function Ba(e) {
  const n = e.r / 255, a = e.g / 255, s = e.b / 255, o = Math.max(n, a, s), i = Math.min(n, a, s), l = (o + i) / 2;
  let d, c, u;
  return o !== i && (u = o - i, c = l > 0.5 ? u / (2 - o - i) : u / (o + i), d = ll(n, a, s, u, o), d = d * 60 + 0.5), [d | 0, c || 0, l];
}
function La(e, t, n, a) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, a)).map(Ce);
}
function za(e, t, n) {
  return Oa(Hs, e, t, n);
}
function rl(e, t, n) {
  return La(il, e, t, n);
}
function cl(e, t, n) {
  return La(ol, e, t, n);
}
function Ys(e) {
  return (e % 360 + 360) % 360;
}
function dl(e) {
  const t = sl.exec(e);
  let n = 255, a;
  if (!t)
    return;
  t[5] !== a && (n = t[6] ? rn(+t[5]) : Ce(+t[5]));
  const s = Po(+t[2]), o = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? a = rl(s, o, i) : t[1] === "hsv" ? a = cl(s, o, i) : a = Fa(s, o, i), {
    r: a[0],
    g: a[1],
    b: a[2],
    a: n
  };
}
function ul(e, t) {
  var n = Ba(e);
  n[0] = Po(n[0] + t), n = Fa(n), e.r = n[0], e.g = n[1], e.b = n[2];
}
function hl(e) {
  if (!e)
    return;
  const t = Ra(e), n = t[0], a = ro(t[1]), o = ro(t[2]);
  return e.a < 255 ? `hsla(${n}, ${a}%, ${o}%, ${pe(e.a)})` : `hsl(${n}, ${a}%, ${o}%)`;
}
const co = {
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
}, uo = {
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
function fl() {
  const e = {}, t = Object.keys(os), n = Object.keys(ss);
  let a, s, o, i, l;
  for (a = 0; a < t.length; a++) {
    for (i = l = t[a], s = 0; s < n.length; s++)
      o = n[s], l = l.replace(o, ss[o]);
    o = parseInt(os[i], 16), e[l] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return e;
}
let Sn;
function gl(e) {
  Sn || (Sn = fl(), Sn.transparent = [0, 0, 0, 0]);
  const t = Sn[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const pl = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function ml(e) {
  const t = pl.exec(e);
  let n = 255, a, s, o;
  if (t) {
    if (t[7] !== a) {
      const i = +t[7];
      n = t[8] ? rn(i) : _e(i * 255, 0, 255);
    }
    return a = +t[1], s = +t[3], o = +t[5], a = 255 & (t[2] ? rn(a) : _e(a, 0, 255)), s = 255 & (t[4] ? rn(s) : _e(s, 0, 255)), o = 255 & (t[6] ? rn(o) : _e(o, 0, 255)), {
      r: a,
      g: o,
      b: s,
      a: n
    };
  }
}
function bl(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${de(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const oa = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, Ne = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function vl(e, t, n) {
  const a = Ne(de(e.r)), s = Ne(de(e.g)), o = Ne(de(e.b));
  return {
    r: Ce(oa(a + n * (Ne(de(t.r)) - a))),
    g: Ce(oa(s + n * (Ne(de(t.g)) - s))),
    b: Ce(oa(o + n * (Ne(de(t.b)) - o))),
    a: e.a + n * (t.a - e.a)
  };
}
function Ln(e, t, n) {
  if (e) {
    let a = Ra(e);
    a[t] = Math.max(0, Math.min(a[t] + a[t] * n, t === 0 ? 360 : 1)), a = za(a), e.r = a[0], e.g = a[1], e.b = a[2];
  }
}
function Ks(e, t) {
  return e && Object.assign(t || {}, e);
}
function ho(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = Ce(e[3]))) : (t = Ro(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = Ce(t.a)), t;
}
function yl(e) {
  return e.charAt(0) === "r" ? ml(e) : dl(e);
}
class xn {
  constructor(t) {
    if (t instanceof xn)
      return t;
    const n = typeof t;
    let a;
    n === "object" ? a = is(t) : n === "string" && (a = el(t) || gl(t) || yl(t)), this._rgb = a, this._valid = !!a;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Ks(this._rgb);
    return t && (t.a = pe(t.a)), t;
  }
  set rgb(t) {
    this._rgb = ho(t);
  }
  rgbString() {
    return this._valid ? bl(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? al(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? hl(this._rgb) : void 0;
  }
  mix(t, n) {
    if (t) {
      const a = this.rgb, s = t.rgb;
      let o;
      const i = n === o ? 0.5 : n, l = 2 * i - 1, d = a.a - s.a, c = ((l * d === -1 ? l : (l + d) / (1 + l * d)) + 1) / 2;
      o = 1 - c, a.r = 255 & c * a.r + o * s.r + 0.5, a.g = 255 & c * a.g + o * s.g + 0.5, a.b = 255 & c * a.b + o * s.b + 0.5, a.a = i * a.a + (1 - i) * s.a, this.rgb = a;
    }
    return this;
  }
  interpolate(t, n) {
    return t && (this._rgb = vl(this._rgb, t._rgb, n)), this;
  }
  clone() {
    return new xn(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = Ce(t), this;
  }
  clearer(t) {
    const n = this._rgb;
    return n.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, n = An(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
    return t.r = t.g = t.b = n, this;
  }
  opaquer(t) {
    const n = this._rgb;
    return n.a *= 1 + t, this;
  }
  negate() {
    const t = this._rgb;
    return t.r = 255 - t.r, t.g = 255 - t.g, t.b = 255 - t.b, this;
  }
  lighten(t) {
    return Ln(this._rgb, 2, t), this;
  }
  darken(t) {
    return Ln(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return Ln(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return Ln(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return ul(this._rgb, t), this;
  }
}
function le() {
}
const _l = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function kt(e) {
  return e == null;
}
function It(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function _t(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function ne(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function le(e, t) {
  return ne(e) ? e : t;
}
function ht(e, t) {
  return typeof e > "u" ? t : e;
}
const xl = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, Oo = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function $t(e, t, n) {
  if (e && typeof e.call == "function")
    return e.apply(n, t);
}
function xt(e, t, n, a) {
  let s, o, i;
  if (It(e))
    for (o = e.length, s = 0; s < o; s++)
      t.call(n, e[s], s);
  else if (vt(e))
    for (i = Object.keys(e), o = i.length, s = 0; s < o; s++)
      t.call(n, e[i[s]], i[s]);
}
function Gn(e, t) {
  let n, a, o, s;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (n = 0, a = e.length; n < a; ++n)
    if (o = e[n], s = t[n], o.datasetIndex !== s.datasetIndex || o.index !== s.index)
      return !1;
  return !0;
}
function Kn(e) {
  if (It(e))
    return e.map(Kn);
  if (vt(e)) {
    const t = /* @__PURE__ */ Object.create(null), n = Object.keys(e), a = n.length;
    let s = 0;
    for (; s < a; ++s)
      t[n[s]] = Kn(e[n[s]]);
    return t;
  }
  return e;
}
function Us(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function kl(e, t, n, a) {
  if (!zo(e))
    return;
  const s = t[e], o = n[e];
  vt(s) && vt(o) ? vn(s, o, a) : t[e] = Kn(o);
}
function vn(e, t, n) {
  const a = It(t) ? t : [
    t
  ], o = a.length;
  if (!_t(e))
    return e;
  n = n || {};
  const o = n.merger || kl;
  let i;
  for (let l = 0; l < s; ++l) {
    if (i = a[l], !vt(i))
      continue;
    const d = Object.keys(i);
    for (let c = 0, u = d.length; c < u; ++c)
      s(d[c], e, i, n);
  }
  return e;
}
function hn(e, t) {
  return vn(e, t, {
    merger: wl
  });
}
function wl(e, t, n) {
  if (!zo(e))
    return;
  const a = t[e], s = n[e];
  vt(a) && vt(s) ? hn(a, s) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = Kn(s));
}
const ls = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function Cl(e) {
  const t = e.split("."), n = [];
  let a = "";
  for (const o of t)
    a += o, a.endsWith("\\") ? a = a.slice(0, -1) + "." : (n.push(a), a = "");
  return n;
}
function $l(e) {
  const t = Cl(e);
  return (n) => {
    for (const a of t) {
      if (a === "")
        break;
      n = n && n[a];
    }
    return n;
  };
}
function Oe(e, t) {
  return (ls[t] || (ls[t] = $l(t)))(e);
}
function Va(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const yn = (e) => typeof e < "u", $e = (e) => typeof e == "function", rs = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
};
function Ml(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const kt = Math.PI, At = 2 * kt, Sl = At + kt, qn = Number.POSITIVE_INFINITY, Dl = kt / 180, Pt = kt / 2, Ae = kt / 4, cs = kt * 2 / 3, Vo = Math.log10, oe = Math.sign;
function fn(e, t, n) {
  return Math.abs(e - t) < n;
}
function mo(e) {
  const t = Math.round(e);
  e = bn(e, t, e / 1e3) ? t : e;
  const n = Math.pow(10, Math.floor(Xs(e))), a = e / n;
  return (a <= 1 ? 1 : a <= 2 ? 2 : a <= 5 ? 5 : 10) * n;
}
function Al(e) {
  const t = [], n = Math.sqrt(e);
  let a;
  for (a = 1; a < n; a++)
    e % a === 0 && (t.push(a), t.push(e / a));
  return n === (n | 0) && t.push(n), t.sort((o, s) => o - s).pop(), t;
}
function Tl(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function _n(e) {
  return !Tl(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Bl(e, t) {
  const n = Math.round(e);
  return n - t <= e && n + t >= e;
}
function Ll(e, t, n) {
  let a, s, o;
  for (a = 0, s = e.length; a < s; a++)
    o = e[a][n], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function me(e) {
  return e * (Ct / 180);
}
function Fl(e) {
  return e * (180 / kt);
}
function bo(e) {
  if (!ne(e))
    return;
  let t = 1, n = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, n++;
  return n;
}
function Gs(e, t) {
  const n = t.x - e.x, a = t.y - e.y, o = Math.sqrt(n * n + a * a);
  let s = Math.atan2(a, n);
  return s < -0.5 * Ct && (s += Lt), {
    angle: s,
    distance: o
  };
}
function Aa(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function El(e, t) {
  return (e - t + Sl) % At - kt;
}
function se(e) {
  return (e % Lt + Lt) % Lt;
}
function xn(e, t, n, a) {
  const s = Jt(e), o = Jt(t), i = Jt(n), l = Jt(o - s), d = Jt(i - s), c = Jt(s - o), u = Jt(s - i);
  return s === o || s === i || a && o === i || l > d && c < u;
}
function Ht(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function Il(e) {
  return zt(e, -32768, 32767);
}
function xe(e, t, n, a = 1e-6) {
  return e >= Math.min(t, n) - a && e <= Math.max(t, n) + a;
}
function Na(e, t, n) {
  n = n || ((i) => e[i] < t);
  let a = e.length - 1, o = 0, s;
  for (; a - o > 1; )
    s = o + a >> 1, n(s) ? o = s : a = s;
  return {
    lo: o,
    hi: a
  };
}
const Ie = (e, t, n, a) => Ia(e, n, a ? (s) => {
  const o = e[s][t];
  return o < n || o === n && e[s + 1][t] === n;
} : (s) => e[s][t] < n), Pl = (e, t, n) => Ia(e, n, (a) => e[a][t] >= n);
function Rl(e, t, n) {
  let a = 0, s = e.length;
  for (; a < s && e[a] < t; )
    a++;
  for (; o > a && e[o - 1] > n; )
    o--;
  return a > 0 || o < e.length ? e.slice(a, o) : e;
}
const Zs = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function Ol(e, t) {
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
  }), Zs.forEach((n) => {
    const a = "_onData" + Va(n), o = e[n];
    Object.defineProperty(e, n, {
      configurable: !0,
      enumerable: !1,
      value(...o) {
        const i = s.apply(this, o);
        return e._chartjs.listeners.forEach((l) => {
          typeof l[a] == "function" && l[a](...o);
        }), i;
      }
    });
  });
}
function vo(e, t) {
  const n = e._chartjs;
  if (!n)
    return;
  const a = n.listeners, o = a.indexOf(t);
  o !== -1 && a.splice(o, 1), !(a.length > 0) && (Zs.forEach((s) => {
    delete e[s];
  }), delete e._chartjs);
}
function Qs(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const Js = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function ti(e, t) {
  let n = [], a = !1;
  return function(...o) {
    n = o, a || (a = !0, Js.call(window, () => {
      a = !1, e.apply(t, n);
    }));
  };
}
function zl(e, t) {
  let n;
  return function(...a) {
    return t ? (clearTimeout(n), n = setTimeout(e, t, a)) : e.apply(this, a), t;
  };
}
const Pa = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", Ot = (e, t, n) => e === "start" ? t : e === "end" ? n : (t + n) / 2, Vl = (e, t, n, a) => e === (a ? "left" : "right") ? n : e === "center" ? (t + n) / 2 : t;
function Nl(e, t, n) {
  const a = t.length;
  let o = 0, s = a;
  if (e._sorted) {
    const { iScale: i, vScale: l, _parsed: d } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, u = i.axis, { min: h, max: g, minDefined: y, maxDefined: f } = i.getUserBounds();
    if (y) {
      if (o = Math.min(
        // @ts-expect-error Need to type _parsed
        Ne(d, u, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? a : Ne(t, u, i.getPixelForValue(h)).lo
      ), c) {
        const m = d.slice(0, s + 1).reverse().findIndex((v) => !_t(v[l.axis]));
        s -= Math.max(0, m);
      }
      o = Ht(o, 0, a - 1);
    }
    if (p) {
      let b = Math.max(
        // @ts-expect-error Need to type _parsed
        Ie(d, i.axis, g, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? 0 : Ie(t, u, i.getPixelForValue(g), !0).hi + 1
      );
      if (c) {
        const v = d.slice(m - 1).findIndex((p) => !_t(p[l.axis]));
        m += Math.max(0, v);
      }
      s = Ht(b, o, a) - o;
    } else
      s = a - o;
  }
  return {
    start: o,
    count: s
  };
}
function Wl(e) {
  const { xScale: t, yScale: n, _scaleRanges: a } = e, s = {
    xmin: t.min,
    xmax: t.max,
    ymin: n.min,
    ymax: n.max
  };
  if (!a)
    return e._scaleRanges = o, !0;
  const s = a.xmin !== t.min || a.xmax !== t.max || a.ymin !== n.min || a.ymax !== n.max;
  return Object.assign(a, o), s;
}
const Fn = (e) => e === 0 || e === 1, yo = (e, t, n) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * Lt / n)), _o = (e, t, n) => Math.pow(2, -10 * e) * Math.sin((e - t) * Lt / n) + 1, vn = {
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
  easeInSine: (e) => -Math.cos(e * Pt) + 1,
  easeOutSine: (e) => Math.sin(e * Pt),
  easeInOutSine: (e) => -0.5 * (Math.cos(kt * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => Fn(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => Fn(e) ? e : yo(e, 0.075, 0.3),
  easeOutElastic: (e) => Fn(e) ? e : _o(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return Fn(e) ? e : e < 0.5 ? 0.5 * yo(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * _o(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - vn.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? vn.easeInBounce(e * 2) * 0.5 : vn.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function ja(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function xo(e) {
  return ja(e) ? e : new xn(e);
}
function da(e) {
  return ja(e) ? e : new xn(e).saturate(0.5).darken(0.1).hexString();
}
const Hl = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], jl = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Yl(e) {
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
      properties: jl
    },
    numbers: {
      type: "number",
      properties: Hl
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
function Kl(e) {
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
const ms = /* @__PURE__ */ new Map();
function ql(e, t) {
  t = t || {};
  const n = e + JSON.stringify(t);
  let a = ko.get(n);
  return a || (a = new Intl.NumberFormat(e, t), ko.set(n, a)), a;
}
function Oa(e, t, n) {
  return ql(t, n).format(e);
}
const Ul = {
  values(e) {
    return It(e) ? e : "" + e;
  },
  numeric(e, t, n) {
    if (e === 0)
      return "0";
    const a = this.chart.options.locale;
    let o, s = e;
    if (n.length > 1) {
      const c = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
      (c < 1e-4 || c > 1e15) && (s = "scientific"), o = Xl(e, n);
    }
    const i = Vo(Math.abs(o)), l = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), d = {
      notation: s,
      minimumFractionDigits: l,
      maximumFractionDigits: l
    };
    return Object.assign(d, this.options.ticks.format), Ha(e, a, d);
  }
};
function Xl(e, t) {
  let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var Ko = {
  formatters: Ul
};
function Gl(e) {
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
      tickWidth: (t, n) => n.lineWidth,
      tickColor: (t, n) => n.color,
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
      callback: Ko.formatters.values,
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
const Ye = /* @__PURE__ */ Object.create(null), Ta = /* @__PURE__ */ Object.create(null);
function yn(e, t) {
  if (!t)
    return e;
  const n = t.split(".");
  for (let a = 0, o = n.length; a < o; ++a) {
    const s = n[a];
    e = e[s] || (e[s] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function la(e, t, n) {
  return typeof t == "string" ? vn(pn(e, t), n) : vn(pn(e, ""), t);
}
class Zl {
  constructor(t, n) {
    this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (a) => a.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
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
    }, this.hover = {}, this.hoverBackgroundColor = (a, o) => da(o.backgroundColor), this.hoverBorderColor = (a, o) => da(o.borderColor), this.hoverColor = (a, o) => da(o.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(n);
  }
  set(t, n) {
    return la(this, t, n);
  }
  get(t) {
    return yn(this, t);
  }
  describe(t, n) {
    return la(Ca, t, n);
  }
  override(t, n) {
    return la(ze, t, n);
  }
  route(t, n, a, s) {
    const o = pn(this, t), i = pn(this, a), l = "_" + n;
    Object.defineProperties(o, {
      [l]: {
        value: o[n],
        writable: !0
      },
      [n]: {
        enumerable: !0,
        get() {
          const d = this[l], c = i[s];
          return vt(d) ? Object.assign({}, c, d) : ht(d, c);
        },
        set(d) {
          this[l] = d;
        }
      }
    });
  }
  apply(t) {
    t.forEach((n) => n(this));
  }
}
var Tt = /* @__PURE__ */ new Zl({
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
  Yl,
  Kl,
  Gl
]);
function Ql(e) {
  return !e || _t(e.size) || _t(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function wo(e, t, n, a, o) {
  let s = t[o];
  return s || (s = t[o] = e.measureText(o).width, n.push(o)), s > a && (a = s), a;
}
function Pe(e, t, n) {
  const a = e.currentDevicePixelRatio, o = n !== 0 ? Math.max(n / 2, 0.5) : 0;
  return Math.round((t - o) * a) / a + o;
}
function Co(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function $a(e, t, n, a) {
  qo(e, t, n, a, null);
}
function qo(e, t, n, a, s) {
  let o, i, l, d, c, u, h, g;
  const y = t.pointStyle, f = t.rotation, m = t.radius;
  let v = (f || 0) * Dl;
  if (y && typeof y == "object" && (o = y.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(n, a), e.rotate(v), e.drawImage(y, -y.width / 2, -y.height / 2, y.width, y.height), e.restore();
    return;
  }
  if (!(isNaN(b) || b <= 0)) {
    switch (e.beginPath(), y) {
      // Default includes circle
      default:
        o ? e.ellipse(n, a, o / 2, b, 0, 0, Lt) : e.arc(n, a, b, 0, Lt), e.closePath();
        break;
      case "triangle":
        u = o ? o / 2 : b, e.moveTo(n + Math.sin(v) * u, a - Math.cos(v) * b), v += po, e.lineTo(n + Math.sin(v) * u, a - Math.cos(v) * b), v += po, e.lineTo(n + Math.sin(v) * u, a - Math.cos(v) * b), e.closePath();
        break;
      case "rectRounded":
        c = m * 0.516, d = m - c, i = Math.cos(v + Ae) * d, h = Math.cos(v + Ae) * (s ? s / 2 - c : d), l = Math.sin(v + Ae) * d, g = Math.sin(v + Ae) * (s ? s / 2 - c : d), e.arc(n - h, a - l, c, v - kt, v - Pt), e.arc(n + g, a - i, c, v - Pt, v), e.arc(n + h, a + l, c, v, v + Pt), e.arc(n - g, a + i, c, v + Pt, v + kt), e.closePath();
        break;
      case "rect":
        if (!p) {
          d = Math.SQRT1_2 * b, u = o ? o / 2 : d, e.rect(n - u, a - d, 2 * u, 2 * d);
          break;
        }
        v += Ie;
      /* falls through */
      case "rectRot":
        h = Math.cos(v) * (s ? s / 2 : m), i = Math.cos(v) * m, l = Math.sin(v) * m, g = Math.sin(v) * (s ? s / 2 : m), e.moveTo(n - h, a - l), e.lineTo(n + g, a - i), e.lineTo(n + h, a + l), e.lineTo(n - g, a + i), e.closePath();
        break;
      case "crossRot":
        v += Ie;
      /* falls through */
      case "cross":
        h = Math.cos(v) * (s ? s / 2 : m), i = Math.cos(v) * m, l = Math.sin(v) * m, g = Math.sin(v) * (s ? s / 2 : m), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + g, a - i), e.lineTo(n - g, a + i);
        break;
      case "star":
        h = Math.cos(v) * (s ? s / 2 : m), i = Math.cos(v) * m, l = Math.sin(v) * m, g = Math.sin(v) * (s ? s / 2 : m), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + g, a - i), e.lineTo(n - g, a + i), v += Ae, h = Math.cos(v) * (s ? s / 2 : m), i = Math.cos(v) * m, l = Math.sin(v) * m, g = Math.sin(v) * (s ? s / 2 : m), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + g, a - i), e.lineTo(n - g, a + i);
        break;
      case "line":
        i = s ? s / 2 : Math.cos(v) * m, l = Math.sin(v) * m, e.moveTo(n - i, a - l), e.lineTo(n + i, a + l);
        break;
      case "dash":
        e.moveTo(n, a), e.lineTo(n + Math.cos(v) * (o ? o / 2 : b), a + Math.sin(v) * b);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function Sn(e, t, n) {
  return n = n || 0.5, !t || e && e.x > t.left - n && e.x < t.right + n && e.y > t.top - n && e.y < t.bottom + n;
}
function Ya(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function Ka(e) {
  e.restore();
}
function Jl(e, t, n, a, s) {
  if (!t)
    return e.lineTo(n.x, n.y);
  if (o === "middle") {
    const s = (t.x + n.x) / 2;
    e.lineTo(s, t.y), e.lineTo(s, n.y);
  } else o === "after" != !!a ? e.lineTo(t.x, n.y) : e.lineTo(n.x, t.y);
  e.lineTo(n.x, n.y);
}
function tr(e, t, n, a) {
  if (!t)
    return e.lineTo(n.x, n.y);
  e.bezierCurveTo(a ? t.cp1x : t.cp2x, a ? t.cp1y : t.cp2y, a ? n.cp2x : n.cp1x, a ? n.cp2y : n.cp1y, n.x, n.y);
}
function er(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), _t(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function nr(e, t, n, a, s) {
  if (s.strikethrough || s.underline) {
    const o = e.measureText(a), i = t - o.actualBoundingBoxLeft, l = t + o.actualBoundingBoxRight, d = n - o.actualBoundingBoxAscent, c = n + o.actualBoundingBoxDescent, u = s.strikethrough ? (d + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = s.decorationWidth || 2, e.moveTo(i, u), e.lineTo(l, u), e.stroke();
  }
}
function ar(e, t) {
  const n = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = n;
}
function wn(e, t, n, a, s, o = {}) {
  const i = It(t) ? t : [
    t
  ], l = o.strokeWidth > 0 && o.strokeColor !== "";
  let d, c;
  for (e.save(), e.font = s.string, er(e, o), d = 0; d < i.length; ++d)
    c = i[d], o.backdrop && ar(e, o.backdrop), l && (o.strokeColor && (e.strokeStyle = o.strokeColor), _t(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(c, n, a, o.maxWidth)), e.fillText(c, n, a, o.maxWidth), nr(e, n, a, c, o), a += Number(s.lineHeight);
  e.restore();
}
function Un(e, t) {
  const { x: n, y: a, w: s, h: o, radius: i } = t;
  e.arc(n + i.topLeft, a + i.topLeft, i.topLeft, 1.5 * kt, kt, !0), e.lineTo(n, a + o - i.bottomLeft), e.arc(n + i.bottomLeft, a + o - i.bottomLeft, i.bottomLeft, kt, Pt, !0), e.lineTo(n + s - i.bottomRight, a + o), e.arc(n + s - i.bottomRight, a + o - i.bottomRight, i.bottomRight, Pt, 0, !0), e.lineTo(n + s, a + i.topRight), e.arc(n + s - i.topRight, a + i.topRight, i.topRight, 0, -Pt, !0), e.lineTo(n + i.topLeft, a);
}
const sr = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, or = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function ir(e, t) {
  const n = ("" + e).match(sr);
  if (!n || n[1] === "normal")
    return t * 1.2;
  switch (e = +n[2], n[3]) {
    case "px":
      return e;
    case "%":
      e /= 100;
      break;
  }
  return t * e;
}
const lr = (e) => +e || 0;
function Na(e, t) {
  const n = {}, a = vt(t), s = a ? Object.keys(t) : t, o = vt(e) ? a ? (i) => ht(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of s)
    n[i] = lr(o(i));
  return n;
}
function ai(e) {
  return qa(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function Ze(e) {
  return qa(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function ae(e) {
  const t = ai(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function Vt(e, t) {
  e = e || {}, t = t || Tt.font;
  let n = ht(e.size, t.size);
  typeof n == "string" && (n = parseInt(n, 10));
  let a = ht(e.style, t.style);
  a && !("" + a).match(or) && (console.warn('Invalid font style specified: "' + a + '"'), a = void 0);
  const s = {
    family: ht(e.family, t.family),
    lineHeight: ir(ht(e.lineHeight, t.lineHeight), n),
    size: n,
    style: a,
    weight: ht(e.weight, t.weight),
    string: ""
  };
  return s.string = Ql(s), s;
}
function En(e, t, n, a) {
  let o, s, i;
  for (o = 0, s = e.length; o < s; ++o)
    if (i = e[o], i !== void 0 && i !== void 0)
      return i;
}
function rr(e, t, n) {
  const { min: a, max: s } = e, o = Oo(t, (s - a) / 2), i = (l, d) => n && l === 0 ? 0 : l + d;
  return {
    min: i(a, -Math.abs(s)),
    max: i(o, s)
  };
}
function Ke(e, t) {
  return Object.assign(Object.create(e), t);
}
function Ua(e, t = [
  ""
], n, a, o = () => e[0]) {
  const s = n || e;
  typeof a > "u" && (a = li("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: s,
    _fallback: a,
    _getTarget: s,
    override: (l) => Wa([
      l,
      ...e
    ], t, s, a)
  };
  return new Proxy(i, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(l, d) {
      return delete l[d], delete l._keys, delete e[0][d], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(l, d) {
      return Go(l, d, () => mr(d, t, e, l));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(l, d) {
      return Reflect.getOwnPropertyDescriptor(l._scopes[0], d);
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
    has(l, d) {
      return _s(l).includes(d);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(l) {
      return _s(l);
    },
    /**
    * A trap for setting property values.
    */
    set(l, d, c) {
      const u = l._storage || (l._storage = s());
      return l[d] = u[d] = c, delete l._keys, !0;
    }
  });
}
function qe(e, t, n, a) {
  const s = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: n,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: Xo(e, a),
    setContext: (o) => qe(e, o, n, a),
    override: (o) => qe(e.override(o), t, n, a)
  };
  return new Proxy(o, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(s, i) {
      return delete s[i], delete e[i], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(o, i, l) {
      return Go(o, i, () => dr(o, i, l));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(s, i) {
      return s._descriptors.allKeys ? Reflect.has(e, i) ? {
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
    has(s, i) {
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
    set(o, i, l) {
      return e[i] = l, delete o[i], !0;
    }
  });
}
function oi(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: n = t.scriptable, _indexable: a = t.indexable, _allKeys: o = t.allKeys } = e;
  return {
    allKeys: o,
    scriptable: n,
    indexable: a,
    isScriptable: $e(n) ? n : () => n,
    isIndexable: $e(a) ? a : () => a
  };
}
const cr = (e, t) => e ? e + Ea(t) : t, Ha = (e, t) => vt(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Go(e, t, n) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const a = n();
  return e[t] = a, a;
}
function dr(e, t, n) {
  const { _proxy: a, _context: s, _subProxy: o, _descriptors: i } = e;
  let l = a[t];
  return $e(l) && i.isScriptable(t) && (l = ur(t, l, e, n)), It(l) && l.length && (l = hr(t, l, e, i.isIndexable)), Ha(t, l) && (l = qe(l, s, o && o[t], i)), l;
}
function ur(e, t, n, a) {
  const { _proxy: s, _context: o, _subProxy: i, _stack: l } = n;
  if (l.has(e))
    throw new Error("Recursion detected: " + Array.from(l).join("->") + "->" + e);
  l.add(e);
  let d = t(o, i || a);
  return l.delete(e), Ha(e, d) && (d = ja(s._scopes, s, e, d)), d;
}
function hr(e, t, n, a) {
  const { _proxy: s, _context: o, _subProxy: i, _descriptors: l } = n;
  if (typeof o.index < "u" && a(e))
    return t[o.index % t.length];
  if (vt(t[0])) {
    const d = t, c = s._scopes.filter((u) => u !== d);
    t = [];
    for (const u of d) {
      const h = ja(c, s, e, u);
      t.push(qe(h, o, i && i[e], l));
    }
  }
  return t;
}
function Zo(e, t, n) {
  return $e(e) ? e(t, n) : e;
}
const fr = (e, t) => e === !0 ? t : typeof e == "string" ? Oe(t, e) : void 0;
function gr(e, t, n, a, s) {
  for (const o of t) {
    const i = fr(n, o);
    if (i) {
      e.add(i);
      const l = Zo(i._fallback, n, s);
      if (typeof l < "u" && l !== n && l !== a)
        return l;
    } else if (i === !1 && typeof a < "u" && n !== a)
      return null;
  }
  return !1;
}
function Ga(e, t, n, a) {
  const o = t._rootScopes, s = ii(t._fallback, n, a), i = [
    ...e,
    ...s
  ], l = /* @__PURE__ */ new Set();
  l.add(a);
  let d = ys(l, i, n, o || n, a);
  return d === null || typeof o < "u" && o !== n && (d = ys(l, i, o, d, a), d === null) ? !1 : Wa(Array.from(l), [
    ""
  ], s, o, () => pr(t, n, a));
}
function $o(e, t, n, a, o) {
  for (; n; )
    n = gr(e, t, n, a, s);
  return n;
}
function pr(e, t, n) {
  const a = e._getTarget();
  t in a || (a[t] = {});
  const s = a[t];
  return It(s) && vt(n) ? n : s || {};
}
function mr(e, t, n, a) {
  let s;
  for (const o of t)
    if (s = Qo(cr(o, e), n), typeof s < "u")
      return Ha(e, s) ? ja(n, a, e, s) : s;
}
function li(e, t) {
  for (const n of t) {
    if (!n)
      continue;
    const a = n[e];
    if (typeof a < "u")
      return a;
  }
}
function So(e) {
  let t = e._keys;
  return t || (t = e._keys = br(e._scopes)), t;
}
function br(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e)
    for (const a of Object.keys(n).filter((o) => !o.startsWith("_")))
      t.add(a);
  return Array.from(t);
}
const vr = Number.EPSILON || 1e-14, Ue = (e, t) => t < e.length && !e[t].skip && e[t], Jo = (e) => e === "x" ? "y" : "x";
function yr(e, t, n, a) {
  const s = e.skip ? t : e, o = t, i = n.skip ? t : n, l = wa(o, s), d = wa(i, o);
  let c = l / (l + d), u = d / (l + d);
  c = isNaN(c) ? 0 : c, u = isNaN(u) ? 0 : u;
  const h = a * c, g = a * u;
  return {
    previous: {
      x: s.x - h * (i.x - o.x),
      y: s.y - h * (i.y - o.y)
    },
    next: {
      x: o.x + g * (i.x - s.x),
      y: o.y + g * (i.y - s.y)
    }
  };
}
function _r(e, t, n) {
  const a = e.length;
  let s, o, i, l, d, c = Ue(e, 0);
  for (let u = 0; u < a - 1; ++u)
    if (d = c, c = Ue(e, u + 1), !(!d || !c)) {
      if (fn(t[u], 0, vr)) {
        n[u] = n[u + 1] = 0;
        continue;
      }
      s = n[u] / t[u], o = n[u + 1] / t[u], l = Math.pow(s, 2) + Math.pow(o, 2), !(l <= 9) && (i = 3 / Math.sqrt(l), n[u] = s * i * t[u], n[u + 1] = o * i * t[u]);
    }
}
function xr(e, t, n = "x") {
  const a = Jo(n), s = e.length;
  let o, i, l, d = Ue(e, 0);
  for (let c = 0; c < s; ++c) {
    if (i = l, l = d, d = Ue(e, c + 1), !l)
      continue;
    const u = l[n], h = l[a];
    i && (o = (u - i[n]) / 3, l[`cp1${n}`] = u - o, l[`cp1${a}`] = h - o * t[c]), d && (o = (d[n] - u) / 3, l[`cp2${n}`] = u + o, l[`cp2${a}`] = h + o * t[c]);
  }
}
function kr(e, t = "x") {
  const n = Jo(t), a = e.length, s = Array(a).fill(0), o = Array(a);
  let i, l, d, c = Ue(e, 0);
  for (i = 0; i < a; ++i)
    if (l = d, d = c, c = Ue(e, i + 1), !!d) {
      if (c) {
        const u = c[t] - d[t];
        o[i] = u !== 0 ? (c[n] - d[n]) / u : 0;
      }
      o[i] = l ? c ? oe(s[i - 1]) !== oe(s[i]) ? 0 : (s[i - 1] + s[i]) / 2 : s[i - 1] : s[i];
    }
  _r(e, s, o), xr(e, o, t);
}
function In(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
function wr(e, t) {
  let n, a, s, o, i, l = kn(e[0], t);
  for (n = 0, a = e.length; n < a; ++n)
    i = o, o = l, l = n < a - 1 && kn(e[n + 1], t), o && (s = e[n], i && (s.cp1x = Bn(s.cp1x, t.left, t.right), s.cp1y = Bn(s.cp1y, t.top, t.bottom)), l && (s.cp2x = Bn(s.cp2x, t.left, t.right), s.cp2y = Bn(s.cp2y, t.top, t.bottom)));
}
function Cr(e, t, n, a, s) {
  let o, i, l, d;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    kr(e, s);
  else {
    let c = a ? e[e.length - 1] : e[0];
    for (o = 0, i = e.length; o < i; ++o)
      l = e[o], d = yr(c, l, e[Math.min(o + 1, i - (a ? 0 : 1)) % i], t.tension), l.cp1x = d.previous.x, l.cp1y = d.previous.y, l.cp2x = d.next.x, l.cp2y = d.next.y, c = l;
  }
  t.capBezierPoints && wr(e, n);
}
function Za() {
  return typeof window < "u" && typeof document < "u";
}
function Ka(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function ta(e, t, n) {
  let a;
  return typeof e == "string" ? (a = parseInt(e, 10), e.indexOf("%") !== -1 && (a = a / 100 * t.parentNode[n])) : a = e, a;
}
const Qn = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function $r(e, t) {
  return Qn(e).getPropertyValue(t);
}
const Mr = [
  "top",
  "right",
  "bottom",
  "left"
];
function je(e, t, n) {
  const a = {};
  n = n ? "-" + n : "";
  for (let s = 0; s < 4; s++) {
    const o = Mr[s];
    a[o] = parseFloat(e[t + "-" + o + n]) || 0;
  }
  return a.width = a.left + a.right, a.height = a.top + a.bottom, a;
}
const Sr = (e, t, n) => (e > 0 || t > 0) && (!n || !n.shadowRoot);
function Dr(e, t) {
  const n = e.touches, a = n && n.length ? n[0] : e, { offsetX: s, offsetY: o } = a;
  let i = !1, l, d;
  if (Sr(s, o, e.target))
    l = s, d = o;
  else {
    const c = t.getBoundingClientRect();
    l = a.clientX - c.left, d = a.clientY - c.top, i = !0;
  }
  return {
    x: l,
    y: d,
    box: i
  };
}
function ze(e, t) {
  if ("native" in e)
    return e;
  const { canvas: n, currentDevicePixelRatio: a } = t, s = Qn(n), o = s.boxSizing === "border-box", i = Re(s, "padding"), l = Re(s, "border", "width"), { x: d, y: c, box: u } = Dr(e, n), h = i.left + (u && l.left), g = i.top + (u && l.top);
  let { width: y, height: f } = t;
  return o && (y -= i.width + l.width, f -= i.height + l.height), {
    x: Math.round((d - h) / y * n.width / a),
    y: Math.round((c - g) / f * n.height / a)
  };
}
function Ar(e, t, n) {
  let a, s;
  if (t === void 0 || n === void 0) {
    const o = e && Ka(e);
    if (!o)
      t = e.clientWidth, n = e.clientHeight;
    else {
      const i = o.getBoundingClientRect(), l = Qn(o), d = Re(l, "border", "width"), c = Re(l, "padding");
      t = i.width - c.width - d.width, n = i.height - c.height - d.height, a = Xn(l.maxWidth, o, "clientWidth"), s = Xn(l.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: n,
    maxWidth: a || qn,
    maxHeight: s || qn
  };
}
const ke = (e) => Math.round(e * 10) / 10;
function Tr(e, t, n, a) {
  const s = Qn(e), o = Re(s, "margin"), i = Xn(s.maxWidth, e, "clientWidth") || qn, l = Xn(s.maxHeight, e, "clientHeight") || qn, d = Ar(e, t, n);
  let { width: c, height: u } = d;
  if (s.boxSizing === "content-box") {
    const g = Re(s, "border", "width"), y = Re(s, "padding");
    c -= y.width + g.width, u -= y.height + g.height;
  }
  return c = Math.max(0, c - o.width), u = Math.max(0, a ? c / a : u - o.height), c = ke(Math.min(c, i, d.maxWidth)), u = ke(Math.min(u, l, d.maxHeight)), c && !u && (u = ke(c / 2)), (t !== void 0 || n !== void 0) && a && d.height && u > d.height && (u = d.height, c = ke(Math.floor(u * a))), {
    width: c,
    height: u
  };
}
function xs(e, t, n) {
  const a = t || 1, s = ke(e.height * a), o = ke(e.width * a);
  e.height = ke(e.height), e.width = ke(e.width);
  const i = e.canvas;
  return i.style && (n || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== a || i.height !== o || i.width !== s ? (e.currentDevicePixelRatio = a, i.height = o, i.width = s, e.ctx.setTransform(a, 0, 0, a, 0, 0), !0) : !1;
}
const Br = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    Za() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function ks(e, t) {
  const n = $r(e, t), a = n && n.match(/^(\d+)(\.\d+)?px$/);
  return a ? +a[1] : void 0;
}
function Ve(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: e.y + n * (t.y - e.y)
  };
}
function Lr(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: a === "middle" ? n < 0.5 ? e.y : t.y : a === "after" ? n < 1 ? e.y : t.y : n > 0 ? t.y : e.y
  };
}
function Fr(e, t, n, a) {
  const s = {
    x: e.cp2x,
    y: e.cp2y
  }, s = {
    x: t.cp1x,
    y: t.cp1y
  }, i = Ee(e, s, n), l = Ee(s, o, n), d = Ee(o, t, n), c = Ee(i, l, n), u = Ee(l, d, n);
  return Ee(c, u, n);
}
const Er = function(e, t) {
  return {
    x(n) {
      return e + e + t - n;
    },
    setWidth(n) {
      t = n;
    },
    textAlign(n) {
      return n === "center" ? n : n === "right" ? "left" : "right";
    },
    xPlus(n, a) {
      return n - a;
    },
    leftForLtr(n, a) {
      return n - a;
    }
  };
}, Ir = function() {
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
function Ke(e, t, n) {
  return e ? Er(t, n) : Ir();
}
function ci(e, t) {
  let n, a;
  (t === "ltr" || t === "rtl") && (n = e.canvas.style, a = [
    n.getPropertyValue("direction"),
    n.getPropertyPriority("direction")
  ], n.setProperty("direction", t, "important"), e.prevTextDirection = a);
}
function di(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function ui(e) {
  return e === "angle" ? {
    between: xn,
    compare: El,
    normalize: Jt
  } : {
    between: xe,
    compare: (t, n) => t - n,
    normalize: (t) => t
  };
}
function Ao({ start: e, end: t, count: n, loop: a, style: o }) {
  return {
    start: e % n,
    end: t % n,
    loop: a && (t - e + 1) % n === 0,
    style: o
  };
}
function Pr(e, t, n) {
  const { property: a, start: s, end: o } = n, { between: i, normalize: l } = ni(a), d = t.length;
  let { start: c, end: u, loop: h } = e, g, y;
  if (h) {
    for (c += d, u += d, g = 0, y = d; g < y && i(l(t[c % d][a]), s, o); ++g)
      c--, u--;
    c %= d, u %= d;
  }
  return u < c && (u += d), {
    start: c,
    end: u,
    loop: h,
    style: e.style
  };
}
function Rr(e, t, n) {
  if (!n)
    return [
      e
    ];
  const { property: a, start: s, end: o } = n, i = t.length, { compare: l, between: d, normalize: c } = ni(a), { start: u, end: h, loop: g, style: y } = Pr(e, t, n), f = [];
  let m = !1, v = null, p, b, x;
  const w = () => d(s, x, p) && l(s, x) !== 0, M = () => l(o, p) === 0 || d(o, x, p), C = () => m || w(), $ = () => !m || M();
  for (let S = u, L = u; S <= h; ++S)
    b = t[S % i], !b.skip && (p = c(b[a]), p !== x && (m = d(p, s, o), v === null && C() && (v = l(p, s) === 0 ? S : L), v !== null && $() && (f.push(ws({
      start: v,
      end: S,
      loop: g,
      count: i,
      style: y
    })), v = null), L = S, x = p));
  return v !== null && f.push(ws({
    start: v,
    end: h,
    loop: g,
    count: i,
    style: y
  })), p;
}
function Or(e, t) {
  const n = [], a = e.segments;
  for (let s = 0; s < a.length; s++) {
    const o = Rr(a[s], e.points, t);
    o.length && n.push(...o);
  }
  return n;
}
function zr(e, t, n, a) {
  let s = 0, o = t - 1;
  if (n && !a)
    for (; o < t && !e[o].skip; )
      o++;
  for (; o < t && e[o].skip; )
    o++;
  for (o %= t, n && (s += o); s > o && e[s % t].skip; )
    s--;
  return s %= t, {
    start: o,
    end: s
  };
}
function Vr(e, t, n, a) {
  const s = e.length, o = [];
  let i = t, l = e[t], d;
  for (d = t + 1; d <= n; ++d) {
    const c = e[d % s];
    c.skip || c.stop ? l.skip || (a = !1, o.push({
      start: t % s,
      end: (d - 1) % s,
      loop: a
    }), t = i = c.stop ? d : null) : (i = d, l.skip && (t = d)), l = c;
  }
  return i !== null && s.push({
    start: t % o,
    end: i % o,
    loop: a
  }), s;
}
function Nr(e, t) {
  const n = e.points, a = e.options.spanGaps, s = n.length;
  if (!s)
    return [];
  const o = !!e._loop, { start: i, end: l } = zr(n, s, o, a);
  if (a === !0)
    return To(e, [
      {
        start: i,
        end: l,
        loop: o
      }
    ], n, t);
  const d = l < i ? l + s : l, c = !!e._fullLoop && i === 0 && l === s - 1;
  return Cs(e, Vr(n, i, d, c), n, t);
}
function Cs(e, t, n, a) {
  return !a || !a.setContext || !n ? t : Wr(e, t, n, a);
}
function Wr(e, t, n, a) {
  const s = e._chart.getContext(), o = $s(e.options), { _datasetIndex: i, options: { spanGaps: l } } = e, d = n.length, c = [];
  let u = o, h = t[0].start, g = h;
  function y(f, m, v, p) {
    const b = l ? -1 : 1;
    if (f !== m) {
      for (f += d; n[f % d].skip; )
        f -= b;
      for (; n[m % d].skip; )
        m += b;
      f % d !== m % d && (c.push({
        start: f % d,
        end: m % d,
        loop: v,
        style: p
      }), u = p, h = m % d);
    }
  }
  for (const f of t) {
    h = l ? h : f.start;
    let m = n[h % d], v;
    for (g = h + 1; g <= f.end; g++) {
      const p = n[g % d];
      v = $s(a.setContext(Ve(s, {
        type: "segment",
        p0: m,
        p1: p,
        p0DataIndex: (g - 1) % d,
        p1DataIndex: g % d,
        datasetIndex: i
      }))), Hr(v, u) && y(h, g - 1, f.loop, u), m = p, u = v;
    }
    h < g - 1 && y(h, g - 1, f.loop, u);
  }
  return c;
}
function Bo(e) {
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
function Hr(e, t) {
  if (!t)
    return !1;
  const n = [], a = function(o, s) {
    return ja(s) ? (n.includes(s) || n.push(s), n.indexOf(s)) : s;
  };
  return JSON.stringify(e, a) !== JSON.stringify(t, a);
}
function Pn(e, t, n) {
  return e.options.clip ? e[n] : t[n];
}
function jr(e, t) {
  const { xScale: n, yScale: a } = e;
  return n && a ? {
    left: Pn(n, t, "left"),
    right: Pn(n, t, "right"),
    top: Pn(a, t, "top"),
    bottom: Pn(a, t, "bottom")
  } : t;
}
function Yr(e, t) {
  const n = t._clip;
  if (n.disabled)
    return !1;
  const a = jr(t, e.chartArea);
  return {
    left: n.left === !1 ? 0 : a.left - (n.left === !0 ? 0 : n.left),
    right: n.right === !1 ? e.width : a.right + (n.right === !0 ? 0 : n.right),
    top: n.top === !1 ? 0 : a.top - (n.top === !0 ? 0 : n.top),
    bottom: n.bottom === !1 ? e.height : a.bottom + (n.bottom === !0 ? 0 : n.bottom)
  };
}
class Kr {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, n, a, s) {
    const o = n.listeners[s], i = n.duration;
    o.forEach((l) => l({
      chart: t,
      initial: n.initial,
      numSteps: i,
      currentStep: Math.min(a - n.start, i)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = Js.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let n = 0;
    this._charts.forEach((a, o) => {
      if (!a.running || !a.items.length)
        return;
      const o = a.items;
      let i = o.length - 1, l = !1, d;
      for (; i >= 0; --i)
        d = o[i], d._active ? (d._total > a.duration && (a.duration = d._total), d.tick(t), l = !0) : (o[i] = o[o.length - 1], o.pop());
      l && (s.draw(), this._notify(s, a, t, "progress")), o.length || (a.running = !1, this._notify(s, a, t, "complete"), a.initial = !1), n += o.length;
    }), this._lastDate = t, n === 0 && (this._running = !1);
  }
  _getAnims(t) {
    const n = this._charts;
    let a = n.get(t);
    return a || (a = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, n.set(t, a)), a;
  }
  listen(t, n, a) {
    this._getAnims(t).listeners[n].push(a);
  }
  add(t, n) {
    !n || !n.length || this._getAnims(t).items.push(...n);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const n = this._charts.get(t);
    n && (n.running = !0, n.start = Date.now(), n.duration = n.items.reduce((a, o) => Math.max(a, o._duration), 0), this._refresh());
  }
  running(t) {
    if (!this._running)
      return !1;
    const n = this._charts.get(t);
    return !(!n || !n.running || !n.items.length);
  }
  stop(t) {
    const n = this._charts.get(t);
    if (!n || !n.items.length)
      return;
    const a = n.items;
    let o = a.length - 1;
    for (; o >= 0; --o)
      a[o].cancel();
    n.items = [], this._notify(t, n, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var re = /* @__PURE__ */ new Kr();
const Ms = "transparent", qr = {
  boolean(e, t, n) {
    return n > 0.5 ? t : e;
  },
  color(e, t, n) {
    const a = ps(e || Ms), s = a.valid && ps(t || Ms);
    return s && s.valid ? s.mix(a, n).hexString() : t;
  },
  number(e, t, n) {
    return e + (t - e) * n;
  }
};
class Ur {
  constructor(t, n, a, s) {
    const o = n[a];
    s = Tn([
      t.to,
      o,
      s,
      t.from
    ]);
    const i = En([
      t.from,
      s,
      o
    ]);
    this._active = !0, this._fn = t.fn || qr[t.type || typeof i], this._easing = gn[t.easing] || gn.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = n, this._prop = a, this._from = i, this._to = s, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, n, a) {
    if (this._active) {
      this._notify(!1);
      const o = this._target[this._prop], s = a - this._start, i = this._duration - s;
      this._start = a, this._duration = Math.floor(Math.max(i, t.duration)), this._total += s, this._loop = !!t.loop, this._to = En([
        t.to,
        n,
        o,
        t.from
      ]), this._from = En([
        t.from,
        o,
        n
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const n = t - this._start, a = this._duration, s = this._prop, o = this._from, i = this._loop, l = this._to;
    let d;
    if (this._active = o !== l && (i || n < a), !this._active) {
      this._target[s] = l, this._notify(!0);
      return;
    }
    if (n < 0) {
      this._target[o] = s;
      return;
    }
    d = n / a % 2, d = i && d > 1 ? 2 - d : d, d = this._easing(Math.min(1, Math.max(0, d))), this._target[s] = this._fn(o, l, d);
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((n, a) => {
      t.push({
        res: n,
        rej: a
      });
    });
  }
  _notify(t) {
    const n = t ? "res" : "rej", a = this._promises || [];
    for (let o = 0; o < a.length; o++)
      a[o][n]();
  }
}
class hi {
  constructor(t, n) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(n);
  }
  configure(t) {
    if (!_t(t))
      return;
    const n = Object.keys(Et.animation), a = this._properties;
    Object.getOwnPropertyNames(t).forEach((o) => {
      const s = t[o];
      if (!_t(s))
        return;
      const i = {};
      for (const l of n)
        i[l] = o[l];
      (It(o.properties) && o.properties || [
        s
      ]).forEach((l) => {
        (l === s || !a.has(l)) && a.set(l, i);
      });
    });
  }
  _animateOptions(t, n) {
    const a = n.options, s = Gr(t, a);
    if (!s)
      return [];
    const o = this._createAnimations(s, a);
    return a.$shared && Xr(t.options.$animations, a).then(() => {
      t.options = a;
    }, () => {
    }), s;
  }
  _createAnimations(t, n) {
    const a = this._properties, s = [], o = t.$animations || (t.$animations = {}), i = Object.keys(n), l = Date.now();
    let d;
    for (d = i.length - 1; d >= 0; --d) {
      const c = i[d];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        o.push(...this._animateOptions(t, n));
        continue;
      }
      const u = n[c];
      let h = o[c];
      const g = a.get(c);
      if (h)
        if (g && h.active()) {
          h.update(g, u, l);
          continue;
        } else
          h.cancel();
      if (!g || !g.duration) {
        t[c] = u;
        continue;
      }
      o[c] = h = new Ur(g, t, c, u), s.push(h);
    }
    return o;
  }
  update(t, n) {
    if (this._properties.size === 0) {
      Object.assign(t, n);
      return;
    }
    const a = this._createAnimations(t, n);
    if (a.length)
      return re.add(this._chart, a), !0;
  }
}
function Xr(e, t) {
  const n = [], a = Object.keys(t);
  for (let o = 0; o < a.length; o++) {
    const s = e[a[o]];
    s && s.active() && n.push(s.wait());
  }
  return Promise.all(n);
}
function Gr(e, t) {
  if (!t)
    return;
  let n = e.options;
  if (!n) {
    e.options = t;
    return;
  }
  return n.$shared && (e.options = n = Object.assign({}, n, {
    $shared: !1,
    $animations: {}
  })), n;
}
function Ss(e, t) {
  const n = e && e.options || {}, a = n.reverse, s = n.min === void 0 ? t : 0, o = n.max === void 0 ? t : 0;
  return {
    start: a ? s : o,
    end: a ? o : s
  };
}
function Zr(e, t, n) {
  if (n === !1)
    return !1;
  const a = Ss(e, n), s = Ss(t, n);
  return {
    top: o.end,
    right: a.end,
    bottom: o.start,
    left: a.start
  };
}
function Qr(e) {
  let t, n, a, s;
  return vt(e) ? (t = e.top, n = e.right, a = e.bottom, s = e.left) : t = n = a = s = e, {
    top: t,
    right: n,
    bottom: a,
    left: o,
    disabled: e === !1
  };
}
function fi(e, t) {
  const n = [], a = e._getSortedDatasetMetas(t);
  let o, s;
  for (o = 0, s = a.length; o < s; ++o)
    n.push(a[o].index);
  return n;
}
function Ds(e, t, n, a = {}) {
  const s = e.keys, o = a.mode === "single";
  let i, l, d, c;
  if (t === null)
    return;
  let u = !1;
  for (i = 0, l = s.length; i < l; ++i) {
    if (d = +s[i], d === n) {
      if (u = !0, a.all)
        continue;
      break;
    }
    c = e.values[d], ne(c) && (s || t === 0 || de(t) === de(c)) && (t += c);
  }
  return !u && !a.all ? 0 : t;
}
function Jr(e, t) {
  const { iScale: n, vScale: a } = t, s = n.axis === "x" ? "x" : "y", o = a.axis === "x" ? "x" : "y", i = Object.keys(e), l = new Array(i.length);
  let d, c, u;
  for (d = 0, c = i.length; d < c; ++d)
    u = i[d], l[d] = {
      [s]: u,
      [o]: e[u]
    };
  return l;
}
function ra(e, t) {
  const n = e && e.options.stacked;
  return n || n === void 0 && t.stack !== void 0;
}
function tc(e, t, n) {
  return `${e.id}.${t.id}.${n.stack || n.type}`;
}
function ec(e) {
  const { min: t, max: n, minDefined: a, maxDefined: s } = e.getUserBounds();
  return {
    min: a ? t : Number.NEGATIVE_INFINITY,
    max: o ? n : Number.POSITIVE_INFINITY
  };
}
function nc(e, t, n) {
  const a = e[t] || (e[t] = {});
  return a[n] || (a[n] = {});
}
function Io(e, t, n, a) {
  for (const o of t.getMatchingVisibleMetas(a).reverse()) {
    const s = e[o.index];
    if (n && s > 0 || !n && s < 0)
      return o.index;
  }
  return null;
}
function Ts(e, t) {
  const { chart: n, _cachedMeta: a } = e, s = n._stacks || (n._stacks = {}), { iScale: o, vScale: i, index: l } = a, d = o.axis, c = i.axis, u = tc(o, i, a), h = t.length;
  let g;
  for (let y = 0; y < h; ++y) {
    const f = t[y], { [d]: m, [c]: v } = f, p = f._stacks || (f._stacks = {});
    g = p[c] = nc(s, u, m), g[l] = v, g._top = As(g, i, !0, a.type), g._bottom = As(g, i, !1, a.type);
    const b = g._visualValues || (g._visualValues = {});
    b[l] = v;
  }
}
function fa(e, t) {
  const n = e.scales;
  return Object.keys(n).filter((a) => n[a].axis === t).shift();
}
function ac(e, t) {
  return Ve(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function sc(e, t, n) {
  return Ve(e, {
    active: !1,
    dataIndex: t,
    parsed: void 0,
    raw: void 0,
    element: n,
    index: t,
    mode: "default",
    type: "data"
  });
}
function nn(e, t) {
  const n = e.controller.index, a = e.vScale && e.vScale.axis;
  if (a) {
    t = t || e._parsed;
    for (const o of t) {
      const s = o._stacks;
      if (!s || s[a] === void 0 || s[a][n] === void 0)
        return;
      delete s[a][n], s[a]._visualValues !== void 0 && s[a]._visualValues[n] !== void 0 && delete s[a]._visualValues[n];
    }
  }
}
const da = (e) => e === "reset" || e === "none", Bs = (e, t) => t ? e : Object.assign({}, e), oc = (e, t, n) => e && !t.hidden && t._stacked && {
  keys: si(n, !0),
  values: null
};
class oa {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, n) {
    this.chart = t, this._ctx = t.ctx, this.index = n, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = ra(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && nn(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, n = this._cachedMeta, a = this.getDataset(), s = (h, g, y, f) => h === "x" ? g : h === "r" ? f : y, o = n.xAxisID = ht(a.xAxisID, ca(t, "x")), i = n.yAxisID = ht(a.yAxisID, ca(t, "y")), l = n.rAxisID = ht(a.rAxisID, ca(t, "r")), d = n.indexAxis, c = n.iAxisID = s(d, o, i, l), u = n.vAxisID = s(d, i, o, l);
    n.xScale = this.getScaleForId(o), n.yScale = this.getScaleForId(i), n.rScale = this.getScaleForId(l), n.iScale = this.getScaleForId(c), n.vScale = this.getScaleForId(u);
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
    const n = this._cachedMeta;
    return t === n.iScale ? n.vScale : n.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const t = this._cachedMeta;
    this._data && vo(this._data, this), t._stacked && nn(t);
  }
  _dataCheck() {
    const t = this.getDataset(), n = t.data || (t.data = []), a = this._data;
    if (vt(n)) {
      const s = this._cachedMeta;
      this._data = Jr(n, s);
    } else if (a !== n) {
      if (a) {
        vo(a, this);
        const o = this._cachedMeta;
        nn(o), o._parsed = [];
      }
      n && Object.isExtensible(n) && Ol(n, this), this._syncList = [], this._data = n;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const n = this._cachedMeta, a = this.getDataset();
    let o = !1;
    this._dataCheck();
    const o = n._stacked;
    n._stacked = ra(n.vScale, n), n.stack !== a.stack && (s = !0, Ze(n), n.stack = a.stack), this._resyncElements(t), (s || o !== n._stacked) && (Ts(this, n._parsed), n._stacked = ra(n.vScale, n));
  }
  configure() {
    const t = this.chart.config, n = t.datasetScopeKeys(this._type), a = t.getOptionScopes(this.getDataset(), n, !0);
    this.options = t.createResolver(a, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, n) {
    const { _cachedMeta: a, _data: s } = this, { iScale: o, _stacked: i } = a, l = o.axis;
    let d = t === 0 && n === s.length ? !0 : a._sorted, c = t > 0 && a._parsed[t - 1], u, h, g;
    if (this._parsing === !1)
      a._parsed = s, a._sorted = !0, g = s;
    else {
      It(s[t]) ? g = this.parseArrayData(a, s, t, n) : vt(s[t]) ? g = this.parseObjectData(a, s, t, n) : g = this.parsePrimitiveData(a, s, t, n);
      const y = () => h[l] === null || c && h[l] < c[l];
      for (u = 0; u < n; ++u)
        a._parsed[u + t] = h = g[u], d && (y() && (d = !1), c = h);
      a._sorted = d;
    }
    i && Ts(this, g);
  }
  parsePrimitiveData(t, n, a, s) {
    const { iScale: o, vScale: i } = t, l = o.axis, d = i.axis, c = o.getLabels(), u = o === i, h = new Array(s);
    let g, y, f;
    for (g = 0, y = s; g < y; ++g)
      f = g + a, h[g] = {
        [l]: u || o.parse(c[f], f),
        [d]: i.parse(n[f], f)
      };
    return h;
  }
  parseArrayData(t, n, a, s) {
    const { xScale: o, yScale: i } = t, l = new Array(s);
    let d, c, u, h;
    for (d = 0, c = s; d < c; ++d)
      u = d + a, h = n[u], l[d] = {
        x: o.parse(h[0], u),
        y: i.parse(h[1], u)
      };
    return l;
  }
  parseObjectData(t, n, a, s) {
    const { xScale: o, yScale: i } = t, { xAxisKey: l = "x", yAxisKey: d = "y" } = this._parsing, c = new Array(s);
    let u, h, g, y;
    for (u = 0, h = s; u < h; ++u)
      g = u + a, y = n[g], c[u] = {
        x: o.parse(Oe(y, l), g),
        y: i.parse(Oe(y, d), g)
      };
    return c;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, n, a) {
    const s = this.chart, o = this._cachedMeta, i = n[t.axis], l = {
      keys: si(s, !0),
      values: n._stacks[t.axis]._visualValues
    };
    return Ds(l, i, o.index, {
      mode: a
    });
  }
  updateRangeFromParsed(t, n, a, s) {
    const o = a[n.axis];
    let i = o === null ? NaN : o;
    const l = s && a._stacks[n.axis];
    s && l && (s.values = l, i = Ds(s, o, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, n) {
    const a = this._cachedMeta, s = a._parsed, o = a._sorted && t === a.iScale, i = s.length, l = this._getOtherScale(t), d = oc(n, a, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: u, max: h } = ec(l);
    let g, y;
    function f() {
      y = s[g];
      const m = y[l.axis];
      return !Gt(y[t.axis]) || u > m || h < m;
    }
    for (g = 0; g < i && !(!f() && (this.updateRangeFromParsed(c, t, y, d), o)); ++g)
      ;
    if (o) {
      for (g = i - 1; g >= 0; --g)
        if (!f()) {
          this.updateRangeFromParsed(c, t, y, d);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const n = this._cachedMeta._parsed, a = [];
    let o, s, i;
    for (o = 0, s = n.length; o < s; ++o)
      i = n[o][t.axis], ne(i) && a.push(i);
    return a;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, a = n.iScale, o = n.vScale, s = this.getParsed(t);
    return {
      label: a ? "" + a.getLabelForValue(s[a.axis]) : "",
      value: o ? "" + o.getLabelForValue(s[o.axis]) : ""
    };
  }
  _update(t) {
    const n = this._cachedMeta;
    this.update(t || "default"), n._clip = Qr(ht(this.options.clip, Zr(n.xScale, n.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, n = this.chart, a = this._cachedMeta, s = a.data || [], o = n.chartArea, i = [], l = this._drawStart || 0, d = this._drawCount || s.length - l, c = this.options.drawActiveElementsOnTop;
    let u;
    for (a.dataset && a.dataset.draw(t, o, l, d), u = l; u < l + d; ++u) {
      const h = s[u];
      h.hidden || (h.active && c ? i.push(h) : h.draw(t, o));
    }
    for (u = 0; u < i.length; ++u)
      i[u].draw(t, s);
  }
  getStyle(t, n) {
    const a = n ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(a) : this.resolveDataElementOptions(t || 0, a);
  }
  getContext(t, n, a) {
    const o = this.getDataset();
    let s;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const i = this._cachedMeta.data[t];
      o = i.$context || (i.$context = sc(this.getContext(), t, i)), o.parsed = this.getParsed(t), o.raw = s.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = ac(this.chart.getContext(), this.index)), o.dataset = s, o.index = o.datasetIndex = this.index;
    return o.active = !!n, o.mode = a, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, n) {
    return this._resolveElementOptions(this.dataElementType.id, n, t);
  }
  _resolveElementOptions(t, n = "default", a) {
    const s = n === "active", o = this._cachedDataOpts, i = t + "-" + n, l = o[i], d = this.enableOptionSharing && yn(a);
    if (l)
      return Bs(l, d);
    const c = this.chart.config, u = c.datasetElementScopeKeys(this._type, t), h = s ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], g = c.getOptionScopes(this.getDataset(), u), y = Object.keys(Tt.elements[t]), f = () => this.getContext(a, s, n), m = c.resolveNamedOptions(g, y, f, h);
    return m.$shared && (m.$shared = d, o[i] = Object.freeze(Bs(m, d))), m;
  }
  _resolveAnimations(t, n, a) {
    const s = this.chart, o = this._cachedDataOpts, i = `animation-${n}`, l = o[i];
    if (l)
      return l;
    let d;
    if (s.options.animation !== !1) {
      const u = this.chart.config, h = u.datasetAnimationScopeKeys(this._type, n), g = u.getOptionScopes(this.getDataset(), h);
      d = u.createResolver(g, this.getContext(t, a, n));
    }
    const c = new hi(o, d && d.animations);
    return d && d._cacheable && (s[i] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, n) {
    return !n || ga(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, n) {
    const a = this.resolveDataElementOptions(t, n), o = this._sharedOptions, s = this.getSharedOptions(a), i = this.includeOptions(n, s) || s !== o;
    return this.updateSharedOptions(s, n, a), {
      sharedOptions: s,
      includeOptions: i
    };
  }
  updateElement(t, n, a, o) {
    ga(o) ? Object.assign(t, a) : this._resolveAnimations(n, o).update(t, a);
  }
  updateSharedOptions(t, n, a) {
    t && !ga(n) && this._resolveAnimations(void 0, n).update(t, a);
  }
  _setStyle(t, n, a, o) {
    t.active = o;
    const s = this.getStyle(n, o);
    this._resolveAnimations(n, a, o).update(t, {
      options: !o && this.getSharedOptions(s) || s
    });
  }
  removeHoverStyle(t, n, a) {
    this._setStyle(t, a, "active", !1);
  }
  setHoverStyle(t, n, a) {
    this._setStyle(t, a, "active", !0);
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
    const n = this._data, a = this._cachedMeta.data;
    for (const [l, d, c] of this._syncList)
      this[l](d, c);
    this._syncList = [];
    const o = a.length, s = n.length, i = Math.min(s, o);
    i && this.parse(0, i), s > o ? this._insertElements(o, s - o, t) : s < o && this._removeElements(s, o - s);
  }
  _insertElements(t, n, a = !0) {
    const s = this._cachedMeta, o = s.data, i = t + n;
    let l;
    const d = (c) => {
      for (c.length += n, l = c.length - 1; l >= i; l--)
        c[l] = c[l - n];
    };
    for (d(o), l = t; l < i; ++l)
      o[l] = new this.dataElementType();
    this._parsing && d(s._parsed), this.parse(t, n), a && this.updateElements(o, t, n, "reset");
  }
  updateElements(t, n, a, o) {
  }
  _removeElements(t, n) {
    const a = this._cachedMeta;
    if (this._parsing) {
      const o = a._parsed.splice(t, n);
      a._stacked && nn(a, o);
    }
    a.data.splice(t, n);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [n, a, o] = t;
      this[n](a, o);
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
  _onDataSplice(t, n) {
    n && this._sync([
      "_removeElements",
      t,
      n
    ]);
    const a = arguments.length - 2;
    a && this._sync([
      "_insertElements",
      t,
      a
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
    const n = e.getMatchingVisibleMetas(t);
    let a = [];
    for (let o = 0, s = n.length; o < s; o++)
      a = a.concat(n[o].controller.getAllParsedValues(e));
    e._cache.$bar = Qs(a.sort((o, s) => o - s));
  }
  return e._cache.$bar;
}
function lc(e) {
  const t = e.iScale, n = ic(t, e.type);
  let a = t._length, s, o, i, l;
  const d = () => {
    i === 32767 || i === -32768 || (yn(l) && (a = Math.min(a, Math.abs(i - l) || a)), l = i);
  };
  for (s = 0, o = n.length; s < o; ++s)
    i = t.getPixelForValue(n[s]), d();
  for (l = void 0, s = 0, o = t.ticks.length; s < o; ++s)
    i = t.getPixelForTick(s), d();
  return a;
}
function yc(e, t, n, a) {
  const o = n.barThickness;
  let s, i;
  return kt(o) ? (s = t.min * n.categoryPercentage, i = n.barPercentage) : (s = o * a, i = 1), {
    chunk: s / a,
    ratio: i,
    start: t.pixels[e] - s / 2
  };
}
function cc(e, t, n, a) {
  const s = t.pixels, o = s[e];
  let i = e > 0 ? s[e - 1] : null, l = e < s.length - 1 ? s[e + 1] : null;
  const d = n.categoryPercentage;
  i === null && (i = o - (l === null ? t.end - t.start : l - o)), l === null && (l = o + o - i);
  const c = o - (o - Math.min(i, l)) / 2 * d;
  return {
    chunk: Math.abs(l - i) / 2 * d / a,
    ratio: n.barPercentage,
    start: c
  };
}
function dc(e, t, n, a) {
  const s = n.parse(e[0], a), o = n.parse(e[1], a), i = Math.min(s, o), l = Math.max(s, o);
  let d = i, c = l;
  Math.abs(i) > Math.abs(l) && (d = l, c = i), t[n.axis] = c, t._custom = {
    barStart: d,
    barEnd: c,
    start: o,
    end: s,
    min: i,
    max: l
  };
}
function oi(e, t, n, a) {
  return It(e) ? dc(e, t, n, a) : t[n.axis] = n.parse(e, a), t;
}
function Ls(e, t, n, a) {
  const s = e.iScale, o = e.vScale, i = s.getLabels(), l = s === o, d = [];
  let c, u, h, g;
  for (c = n, u = n + a; c < u; ++c)
    g = t[c], h = {}, h[s.axis] = l || s.parse(i[c], c), d.push(oi(g, h, o, c));
  return d;
}
function pa(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function uc(e, t, n) {
  return e !== 0 ? oe(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= n ? 1 : -1);
}
function hc(e) {
  let t, n, a, s, o;
  return e.horizontal ? (t = e.base > e.x, n = "left", a = "right") : (t = e.base < e.y, n = "bottom", a = "top"), t ? (s = "end", o = "start") : (s = "start", o = "end"), {
    start: n,
    end: a,
    reverse: t,
    top: o,
    bottom: s
  };
}
function fc(e, t, n, a) {
  let s = t.borderSkipped;
  const o = {};
  if (!s) {
    e.borderSkipped = o;
    return;
  }
  if (o === !0) {
    e.borderSkipped = {
      top: !0,
      right: !0,
      bottom: !0,
      left: !0
    };
    return;
  }
  const { start: i, end: l, reverse: d, top: c, bottom: u } = hc(e);
  s === "middle" && n && (e.enableBorderRadius = !0, (n._top || 0) === a ? s = c : (n._bottom || 0) === a ? s = u : (o[Fs(u, i, l, d)] = !0, s = c)), o[Fs(s, i, l, d)] = !0, e.borderSkipped = o;
}
function Fs(e, t, n, a) {
  return a ? (e = gc(e, t, n), e = Es(e, n, t)) : e = Es(e, t, n), e;
}
function gc(e, t, n) {
  return e === t ? n : e === n ? t : e;
}
function Vo(e, t, n) {
  return e === "start" ? t : e === "end" ? n : e;
}
function pc(e, { inflateAmount: t }, n) {
  e.inflateAmount = t === "auto" ? n === 1 ? 0.33 : 0 : t;
}
class mc extends Jn {
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
  parsePrimitiveData(t, n, a, o) {
    return Oo(t, n, a, o);
  }
  parseArrayData(t, n, a, o) {
    return Oo(t, n, a, o);
  }
  parseObjectData(t, n, a, s) {
    const { iScale: o, vScale: i } = t, { xAxisKey: l = "x", yAxisKey: d = "y" } = this._parsing, c = o.axis === "x" ? l : d, u = i.axis === "x" ? l : d, h = [];
    let g, y, f, m;
    for (g = a, y = a + s; g < y; ++g)
      m = n[g], f = {}, f[o.axis] = o.parse(Oe(m, c), g), h.push(oi(Oe(m, u), f, i, g));
    return h;
  }
  updateRangeFromParsed(t, n, a, o) {
    super.updateRangeFromParsed(t, n, a, o);
    const s = a._custom;
    s && n === this._cachedMeta.vScale && (t.min = Math.min(t.min, s.min), t.max = Math.max(t.max, s.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, { iScale: a, vScale: s } = n, o = this.getParsed(t), i = o._custom, l = ua(i) ? "[" + i.start + ", " + i.end + "]" : "" + s.getLabelForValue(o[s.axis]);
    return {
      label: "" + a.getLabelForValue(o[a.axis]),
      value: l
    };
  }
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
    const t = this._cachedMeta;
    t.stack = this.getDataset().stack;
  }
  update(t) {
    const n = this._cachedMeta;
    this.updateElements(n.data, 0, n.data.length, t);
  }
  updateElements(t, n, a, s) {
    const o = s === "reset", { index: i, _cachedMeta: { vScale: l } } = this, d = l.getBasePixel(), c = l.isHorizontal(), u = this._getRuler(), { sharedOptions: h, includeOptions: g } = this._getSharedOptions(n, s);
    for (let y = n; y < n + a; y++) {
      const f = this.getParsed(y), m = o || _t(f[l.axis]) ? {
        base: d,
        head: d
      } : this._calculateBarValuePixels(y), v = this._calculateBarIndexPixels(y, u), p = (f._stacks || {})[l.axis], b = {
        horizontal: c,
        base: m.base,
        enableBorderRadius: !p || ua(f._custom) || i === p._top || i === p._bottom,
        x: c ? m.head : v.center,
        y: c ? v.center : m.head,
        height: c ? v.size : Math.abs(m.size),
        width: c ? Math.abs(m.size) : v.size
      };
      g && (b.options = h || this.resolveDataElementOptions(y, t[y].active ? "active" : s));
      const x = b.options || t[y].options;
      fc(b, x, p, i), pc(b, x, u.ratio), this.updateElement(t[y], y, b, s);
    }
  }
  _getStacks(t, n) {
    const { iScale: a } = this._cachedMeta, s = a.getMatchingVisibleMetas(this._type).filter((u) => u.controller.options.grouped), o = a.options.stacked, i = [], l = this._cachedMeta.controller.getParsed(n), d = l && l[a.axis], c = (u) => {
      const h = u._parsed.find((y) => y[a.axis] === d), g = h && h[u.vScale.axis];
      if (_t(g) || isNaN(g))
        return !0;
    };
    for (const u of o)
      if (!(n !== void 0 && c(u)) && ((s === !1 || i.indexOf(u.stack) === -1 || s === void 0 && u.stack === void 0) && i.push(u.stack), u.index === t))
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
    const t = this.chart.scales, n = this.chart.options.indexAxis;
    return Object.keys(t).filter((a) => t[a].axis === n).shift();
  }
  _getAxis() {
    const t = {}, n = this.getFirstScaleIdForIndexAxis();
    for (const a of this.chart.data.datasets)
      t[ht(this.chart.options.indexAxis === "x" ? a.xAxisID : a.yAxisID, n)] = !0;
    return Object.keys(t);
  }
  _getStackIndex(t, n, a) {
    const o = this._getStacks(t, a), s = n !== void 0 ? o.indexOf(n) : -1;
    return s === -1 ? o.length - 1 : s;
  }
  _getRuler() {
    const t = this.options, n = this._cachedMeta, a = n.iScale, s = [];
    let o, i;
    for (o = 0, i = n.data.length; o < i; ++o)
      s.push(a.getPixelForValue(this.getParsed(o)[a.axis], o));
    const l = t.barThickness;
    return {
      min: l || lc(n),
      pixels: s,
      start: a._startPixel,
      end: a._endPixel,
      stackCount: this._getStackCount(),
      scale: a,
      grouped: t.grouped,
      ratio: l ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: n, _stacked: a, index: s }, options: { base: o, minBarLength: i } } = this, l = o || 0, d = this.getParsed(t), c = d._custom, u = ua(c);
    let h = d[n.axis], g = 0, y = a ? this.applyStack(n, d, a) : h, f, m;
    y !== h && (g = y - h, y = h), u && (h = c.barStart, y = c.barEnd - c.barStart, h !== 0 && oe(h) !== oe(c.barEnd) && (g = 0), g += h);
    const v = !_t(o) && !u ? o : g;
    let p = n.getPixelForValue(v);
    if (this.chart.getDataVisibility(t) ? f = n.getPixelForValue(g + y) : f = p, m = f - p, Math.abs(m) < i) {
      m = uc(m, n, l) * i, h === l && (p -= m / 2);
      const b = n.getPixelForDecimal(0), x = n.getPixelForDecimal(1), w = Math.min(b, x), M = Math.max(b, x);
      p = Math.max(Math.min(p, M), w), f = p + m, a && !u && (d._stacks[n.axis]._visualValues[s] = n.getValueForPixel(f) - n.getValueForPixel(p));
    }
    if (p === n.getPixelForValue(l)) {
      const b = oe(m) * n.getLineWidthForValue(l) / 2;
      p += b, m -= b;
    }
    return {
      size: m,
      base: p,
      head: f,
      center: f + m / 2
    };
  }
  _calculateBarIndexPixels(t, n) {
    const a = n.scale, s = this.options, o = s.skipNull, i = ht(s.maxBarThickness, 1 / 0);
    let l, d;
    const c = this._getAxisCount();
    if (n.grouped) {
      const u = o ? this._getStackCount(t) : n.stackCount, h = s.barThickness === "flex" ? cc(t, n, s, u * c) : rc(t, n, s, u * c), g = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, y = this._getAxis().indexOf(ht(g, this.getFirstScaleIdForIndexAxis())), f = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + y;
      l = h.start + h.chunk * f + h.chunk / 2, d = Math.min(i, h.chunk * h.ratio);
    } else
      l = a.getPixelForValue(this.getParsed(t)[a.axis], t), d = Math.min(i, n.min * n.ratio);
    return {
      base: l - d / 2,
      head: l + d / 2,
      center: l,
      size: d
    };
  }
  draw() {
    const t = this._cachedMeta, n = t.vScale, a = t.data, o = a.length;
    let s = 0;
    for (; s < o; ++s)
      this.getParsed(s)[n.axis] !== null && !a[s].hidden && a[s].draw(this._ctx);
  }
}
function bc(e, t, n) {
  let a = 1, s = 1, o = 0, i = 0;
  if (t < At) {
    const l = e, d = l + t, c = Math.cos(l), u = Math.sin(l), h = Math.cos(d), g = Math.sin(d), y = (x, w, M) => xn(x, l, d, !0) ? 1 : Math.max(w, w * n, M, M * n), f = (x, w, M) => xn(x, l, d, !0) ? -1 : Math.min(w, w * n, M, M * n), m = y(0, c, h), v = y(Pt, u, g), p = f(kt, c, h), b = f(kt + Pt, u, g);
    a = (m - p) / 2, s = (v - b) / 2, o = -(m + p) / 2, i = -(v + b) / 2;
  }
  return {
    ratioX: a,
    ratioY: o,
    offsetX: s,
    offsetY: i
  };
}
class vc extends Jn {
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
            const n = t.data, { labels: { pointStyle: a, textAlign: s, color: o, useBorderRadius: i, borderRadius: l } } = t.legend.options;
            return n.labels.length && n.datasets.length ? n.labels.map((d, c) => {
              const h = t.getDatasetMeta(0).controller.getStyle(c);
              return {
                text: d,
                fillStyle: h.backgroundColor,
                fontColor: s,
                hidden: !t.getDataVisibility(c),
                lineDash: h.borderDash,
                lineDashOffset: h.borderDashOffset,
                lineJoin: h.borderJoinStyle,
                lineWidth: h.borderWidth,
                strokeStyle: h.borderColor,
                textAlign: o,
                pointStyle: a,
                borderRadius: i && (l || h.borderRadius),
                index: c
              };
            }) : [];
          }
        },
        onClick(t, n, a) {
          a.chart.toggleDataVisibility(n.index), a.chart.update();
        }
      }
    }
  };
  constructor(t, n) {
    super(t, n), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
  }
  linkScales() {
  }
  parse(t, n) {
    const a = this.getDataset().data, o = this._cachedMeta;
    if (this._parsing === !1)
      o._parsed = a;
    else {
      let s = (d) => +a[d];
      if (_t(a[t])) {
        const { key: d = "value" } = this._parsing;
        s = (c) => +He(a[c], d);
      }
      let i, l;
      for (i = t, l = t + n; i < l; ++i)
        s._parsed[i] = o(i);
    }
  }
  _getRotation() {
    return me(this.options.rotation - 90);
  }
  _getCircumference() {
    return me(this.options.circumference);
  }
  _getRotationExtents() {
    let t = Lt, n = -Lt;
    for (let a = 0; a < this.chart.data.datasets.length; ++a)
      if (this.chart.isDatasetVisible(a) && this.chart.getDatasetMeta(a).type === this._type) {
        const o = this.chart.getDatasetMeta(a).controller, s = o._getRotation(), i = o._getCircumference();
        t = Math.min(t, s), n = Math.max(n, s + i);
      }
    return {
      rotation: t,
      circumference: n - t
    };
  }
  update(t) {
    const n = this.chart, { chartArea: a } = n, s = this._cachedMeta, o = s.data, i = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, l = Math.max((Math.min(a.width, a.height) - i) / 2, 0), d = Math.min(xl(this.options.cutout, l), 1), c = this._getRingWeight(this.index), { circumference: u, rotation: h } = this._getRotationExtents(), { ratioX: g, ratioY: y, offsetX: f, offsetY: m } = bc(h, u, d), v = (a.width - i) / g, p = (a.height - i) / y, b = Math.max(Math.min(v, p) / 2, 0), x = Oo(this.options.radius, b), w = Math.max(x * d, 0), M = (x - w) / this._getVisibleDatasetWeightTotal();
    this.offsetX = f * x, this.offsetY = m * x, s.total = this.calculateTotal(), this.outerRadius = x - M * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - M * c, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, n) {
    const a = this.options, o = this._cachedMeta, s = this._getCircumference();
    return n && a.animation.animateRotate || !this.chart.getDataVisibility(t) || o._parsed[t] === null || o.data[t].hidden ? 0 : this.calculateCircumference(o._parsed[t] * s / Lt);
  }
  updateElements(t, n, a, s) {
    const o = s === "reset", i = this.chart, l = i.chartArea, c = i.options.animation, u = (l.left + l.right) / 2, h = (l.top + l.bottom) / 2, g = o && c.animateScale, y = g ? 0 : this.innerRadius, f = g ? 0 : this.outerRadius, { sharedOptions: m, includeOptions: v } = this._getSharedOptions(n, s);
    let p = this._getRotation(), b;
    for (b = 0; b < n; ++b)
      p += this._circumference(b, o);
    for (b = n; b < n + a; ++b) {
      const x = this._circumference(b, o), w = t[b], M = {
        x: u + this.offsetX,
        y: h + this.offsetY,
        startAngle: p,
        endAngle: p + x,
        circumference: x,
        outerRadius: f,
        innerRadius: y
      };
      v && (M.options = m || this.resolveDataElementOptions(b, w.active ? "active" : s)), p += x, this.updateElement(w, b, M, s);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, n = t.data;
    let a = 0, o;
    for (o = 0; o < n.length; o++) {
      const s = t._parsed[o];
      s !== null && !isNaN(s) && this.chart.getDataVisibility(o) && !n[o].hidden && (a += Math.abs(s));
    }
    return a;
  }
  calculateCircumference(t) {
    const n = this._cachedMeta.total;
    return n > 0 && !isNaN(t) ? Lt * (Math.abs(t) / n) : 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, a = this.chart, o = a.data.labels || [], s = Ha(n._parsed[t], a.options.locale);
    return {
      label: o[t] || "",
      value: s
    };
  }
  getMaxBorderWidth(t) {
    let n = 0;
    const a = this.chart;
    let s, o, i, l, d;
    if (!t) {
      for (s = 0, o = a.data.datasets.length; s < o; ++s)
        if (a.isDatasetVisible(s)) {
          i = a.getDatasetMeta(s), t = i.data, l = i.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (s = 0, o = t.length; s < o; ++s)
      d = l.resolveDataElementOptions(s), d.borderAlign !== "inner" && (n = Math.max(n, d.borderWidth || 0, d.hoverBorderWidth || 0));
    return n;
  }
  getMaxOffset(t) {
    let n = 0;
    for (let a = 0, o = t.length; a < o; ++a) {
      const s = this.resolveDataElementOptions(a);
      n = Math.max(n, s.offset || 0, s.hoverOffset || 0);
    }
    return n;
  }
  _getRingWeightOffset(t) {
    let n = 0;
    for (let a = 0; a < t; ++a)
      this.chart.isDatasetVisible(a) && (n += this._getRingWeight(a));
    return n;
  }
  _getRingWeight(t) {
    return Math.max(ht(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class yc extends Jn {
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
    const n = this._cachedMeta, { dataset: a, data: s = [], _dataset: o } = n, i = this.chart._animationsDisabled;
    let { start: l, count: d } = Nl(n, s, i);
    this._drawStart = l, this._drawCount = d, Wl(n) && (l = 0, d = s.length), a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!o._decimated, a.points = s;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(a, void 0, {
      animated: !i,
      options: c
    }, t), this.updateElements(s, l, d, t);
  }
  updateElements(t, n, a, s) {
    const o = s === "reset", { iScale: i, vScale: l, _stacked: d, _dataset: c } = this._cachedMeta, { sharedOptions: u, includeOptions: h } = this._getSharedOptions(n, s), g = i.axis, y = l.axis, { spanGaps: f, segment: m } = this.options, v = _n(f) ? f : Number.POSITIVE_INFINITY, p = this.chart._animationsDisabled || o || s === "none", b = n + a, x = t.length;
    let w = n > 0 && this.getParsed(n - 1);
    for (let M = 0; M < x; ++M) {
      const C = t[M], $ = p ? C : {};
      if (M < n || M >= b) {
        $.skip = !0;
        continue;
      }
      const S = this.getParsed(M), L = _t(S[y]), T = $[g] = i.getPixelForValue(S[g], M), B = $[y] = o || L ? l.getBasePixel() : l.getPixelForValue(d ? this.applyStack(l, S, d) : S[y], M);
      $.skip = isNaN(T) || isNaN(B) || L, $.stop = M > 0 && Math.abs(S[g] - w[g]) > v, m && ($.parsed = S, $.raw = c.data[M]), h && ($.options = u || this.resolveDataElementOptions(M, C.active ? "active" : s)), p || this.updateElement(C, M, $, s), w = S;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, n = t.dataset, a = n.options && n.options.borderWidth || 0, o = t.data || [];
    if (!o.length)
      return a;
    const s = o[0].size(this.resolveDataElementOptions(0)), i = o[o.length - 1].size(this.resolveDataElementOptions(o.length - 1));
    return Math.max(a, s, i) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
class _c extends vc {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function Re() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class qa {
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
    Object.assign(qa.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return Re();
  }
  parse() {
    return Re();
  }
  format() {
    return Re();
  }
  add() {
    return Re();
  }
  diff() {
    return Re();
  }
  startOf() {
    return Re();
  }
  endOf() {
    return Re();
  }
}
var xc = {
  _date: qa
};
function kc(e, t, n, a) {
  const { controller: s, data: o, _sorted: i } = e, l = s._cachedMeta.iScale, d = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (l && t === l.axis && t !== "r" && i && o.length) {
    const c = l._reversePixels ? Pl : Ie;
    if (a) {
      if (o._sharedOptions) {
        const u = s[0], h = typeof u.getRange == "function" && u.getRange(t);
        if (h) {
          const g = c(o, t, n - h), y = c(o, t, n + h);
          return {
            lo: g.lo,
            hi: y.hi
          };
        }
      }
    } else {
      const u = c(s, t, n);
      if (d) {
        const { vScale: h } = s._cachedMeta, { _parsed: g } = e, y = g.slice(0, u.lo + 1).reverse().findIndex((m) => !_t(m[h.axis]));
        u.lo -= Math.max(0, y);
        const f = g.slice(u.hi).findIndex((m) => !_t(m[h.axis]));
        u.hi += Math.max(0, f);
      }
      return u;
    }
  }
  return {
    lo: 0,
    hi: s.length - 1
  };
}
function ta(e, t, n, a, s) {
  const o = e.getSortedVisibleDatasetMetas(), i = n[t];
  for (let l = 0, d = o.length; l < d; ++l) {
    const { index: c, data: u } = o[l], { lo: h, hi: g } = kc(o[l], t, i, s);
    for (let y = h; y <= g; ++y) {
      const f = u[y];
      f.skip || a(f, c, y);
    }
  }
}
function wc(e) {
  const t = e.indexOf("x") !== -1, n = e.indexOf("y") !== -1;
  return function(a, o) {
    const s = t ? Math.abs(a.x - o.x) : 0, i = n ? Math.abs(a.y - o.y) : 0;
    return Math.sqrt(Math.pow(s, 2) + Math.pow(i, 2));
  };
}
function ha(e, t, n, a, s) {
  const o = [];
  return !s && !e.isPointInArea(t) || ta(e, n, t, function(l, d, c) {
    !s && !kn(l, e.chartArea, 0) || l.inRange(t.x, t.y, a) && o.push({
      element: l,
      datasetIndex: d,
      index: c
    });
  }, !0), s;
}
function Cc(e, t, n, a) {
  let s = [];
  function o(i, l, d) {
    const { startAngle: c, endAngle: u } = i.getProps([
      "startAngle",
      "endAngle"
    ], a), { angle: h } = Gs(i, {
      x: t.x,
      y: t.y
    });
    $n(h, c, u) && o.push({
      element: i,
      datasetIndex: l,
      index: d
    });
  }
  return sa(e, n, t, s), o;
}
function $c(e, t, n, a, s, o) {
  let i = [];
  const l = wc(n);
  let d = Number.POSITIVE_INFINITY;
  function c(u, h, g) {
    const y = u.inRange(t.x, t.y, s);
    if (a && !y)
      return;
    const p = u.getCenterPoint(o);
    if (!(!!s || e.isPointInArea(p)) && !y)
      return;
    const v = l(t, f);
    v < d ? (i = [
      {
        element: u,
        datasetIndex: h,
        index: g
      }
    ], d = v) : v === d && i.push({
      element: u,
      datasetIndex: h,
      index: g
    });
  }
  return sa(e, n, t, c), i;
}
function fa(e, t, n, a, s, o) {
  return !o && !e.isPointInArea(t) ? [] : n === "r" && !a ? Cc(e, t, n, s) : $c(e, t, n, a, s, o);
}
function Is(e, t, n, a, s) {
  const o = [], i = n === "x" ? "inXRange" : "inYRange";
  let l = !1;
  return ta(e, n, t, (d, c, u) => {
    d[i] && d[i](t[n], s) && (o.push({
      element: d,
      datasetIndex: c,
      index: u
    }), l = l || d.inRange(t.x, t.y, s));
  }), a && !l ? [] : o;
}
var Mc = {
  modes: {
    index(e, t, n, a) {
      const s = Fe(t, e), o = n.axis || "x", i = n.includeInvisible || !1, l = n.intersect ? ha(e, s, o, a, i) : fa(e, s, o, !1, a, i), d = [];
      return l.length ? (e.getSortedVisibleDatasetMetas().forEach((c) => {
        const u = l[0].index, h = c.data[u];
        h && !h.skip && d.push({
          element: h,
          datasetIndex: c.index,
          index: u
        });
      }), d) : [];
    },
    dataset(e, t, n, a) {
      const s = Fe(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      let l = n.intersect ? ha(e, s, o, a, i) : fa(e, s, o, !1, a, i);
      if (l.length > 0) {
        const d = l[0].datasetIndex, c = e.getDatasetMeta(d).data;
        l = [];
        for (let u = 0; u < c.length; ++u)
          l.push({
            element: c[u],
            datasetIndex: d,
            index: u
          });
      }
      return l;
    },
    point(e, t, n, a) {
      const o = ze(t, e), s = n.axis || "xy", i = n.includeInvisible || !1;
      return ma(e, o, s, a, i);
    },
    nearest(e, t, n, a) {
      const o = ze(t, e), s = n.axis || "xy", i = n.includeInvisible || !1;
      return ba(e, o, s, n.intersect, a, i);
    },
    x(e, t, n, a) {
      const o = ze(t, e);
      return No(e, o, "x", n.intersect, a);
    },
    y(e, t, n, a) {
      const o = ze(t, e);
      return No(e, o, "y", n.intersect, a);
    }
  }
};
const pi = [
  "left",
  "top",
  "right",
  "bottom"
];
function an(e, t) {
  return e.filter((n) => n.pos === t);
}
function Wo(e, t) {
  return e.filter((n) => pi.indexOf(n.pos) === -1 && n.box.axis === t);
}
function on(e, t) {
  return e.sort((n, a) => {
    const o = t ? a : n, s = t ? n : a;
    return o.weight === s.weight ? o.index - s.index : o.weight - s.weight;
  });
}
function Oc(e) {
  const t = [];
  let n, a, s, o, i, l;
  for (n = 0, a = (e || []).length; n < a; ++n)
    s = e[n], { position: o, options: { stack: i, stackWeight: l = 1 } } = s, t.push({
      index: n,
      box: s,
      pos: o,
      horizontal: s.isHorizontal(),
      weight: s.weight,
      stack: i && o + i,
      stackWeight: l
    });
  return t;
}
function Dc(e) {
  const t = {};
  for (const n of e) {
    const { stack: a, pos: o, stackWeight: s } = n;
    if (!a || !pi.includes(o))
      continue;
    const i = t[a] || (t[a] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    i.count++, i.weight += s;
  }
  return t;
}
function Ac(e, t) {
  const n = Dc(e), { vBoxMaxWidth: a, hBoxMaxHeight: s } = t;
  let o, i, l;
  for (o = 0, i = e.length; o < i; ++o) {
    l = e[o];
    const { fullSize: d } = l.box, c = n[l.stack], u = c && l.stackWeight / c.weight;
    l.horizontal ? (l.width = u ? u * a : d && t.availableWidth, l.height = s) : (l.width = a, l.height = u ? u * s : d && t.availableHeight);
  }
  return n;
}
function Tc(e) {
  const t = Sc(e), n = Je(t.filter((c) => c.box.fullSize), !0), a = Je(Qe(t, "left"), !0), s = Je(Qe(t, "right")), o = Je(Qe(t, "top"), !0), i = Je(Qe(t, "bottom")), l = Ps(t, "x"), d = Ps(t, "y");
  return {
    fullSize: n,
    leftAndTop: a.concat(o),
    rightAndBottom: s.concat(d).concat(i).concat(l),
    chartArea: Qe(t, "chartArea"),
    vertical: a.concat(s).concat(d),
    horizontal: o.concat(i).concat(l)
  };
}
function jo(e, t, n, a) {
  return Math.max(e[n], t[n]) + Math.max(e[a], t[a]);
}
function li(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Bc(e, t, n, a) {
  const { pos: s, box: o } = n, i = e.maxPadding;
  if (!vt(s)) {
    n.size && (e[s] -= n.size);
    const h = a[n.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, n.horizontal ? s.height : s.width), n.size = h.size / h.count, e[o] += n.size;
  }
  o.getPadding && li(i, o.getPadding());
  const l = Math.max(0, t.outerWidth - Rs(i, e, "left", "right")), d = Math.max(0, t.outerHeight - Rs(i, e, "top", "bottom")), c = l !== e.w, u = d !== e.h;
  return e.w = l, e.h = d, n.horizontal ? {
    same: c,
    other: u
  } : {
    same: u,
    other: c
  };
}
function Lc(e) {
  const t = e.maxPadding;
  function n(a) {
    const o = Math.max(t[a] - e[a], 0);
    return e[a] += o, o;
  }
  e.y += n("top"), e.x += n("left"), n("right"), n("bottom");
}
function Fc(e, t) {
  const n = t.maxPadding;
  function a(o) {
    const s = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return o.forEach((i) => {
      s[i] = Math.max(t[i], n[i]);
    }), s;
  }
  return a(e ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function cn(e, t, n, a) {
  const s = [];
  let o, i, l, d, c, u;
  for (o = 0, i = e.length, c = 0; o < i; ++o) {
    l = e[o], d = l.box, d.update(l.width || t.w, l.height || t.h, Fc(l.horizontal, t));
    const { same: h, other: g } = Bc(t, n, l, a);
    c |= h && s.length, u = u || g, d.fullSize || s.push(l);
  }
  return c && fn(o, t, n, a) || u;
}
function Rn(e, t, n, a, o) {
  e.top = n, e.left = t, e.right = t + a, e.bottom = n + o, e.width = a, e.height = o;
}
function Os(e, t, n, a) {
  const s = n.padding;
  let { x: o, y: i } = t;
  for (const l of e) {
    const d = l.box, c = a[l.stack] || {
      placed: 0,
      weight: 1
    }, u = l.stackWeight / c.weight || 1;
    if (l.horizontal) {
      const h = t.w * u, g = c.size || d.height;
      yn(c.start) && (i = c.start), d.fullSize ? Fn(d, s.left, i, n.outerWidth - s.right - s.left, g) : Fn(d, t.left + c.placed, i, h, g), c.start = i, c.placed += h, i = d.bottom;
    } else {
      const h = t.h * u, g = c.size || d.width;
      yn(c.start) && (o = c.start), d.fullSize ? Fn(d, o, s.top, g, n.outerHeight - s.bottom - s.top) : Fn(d, o, t.top + c.placed, g, h), c.start = o, c.placed += h, o = d.right;
    }
  }
  t.x = s, t.y = i;
}
var Xt = {
  addBox(e, t) {
    e.boxes || (e.boxes = []), t.fullSize = t.fullSize || !1, t.position = t.position || "top", t.weight = t.weight || 0, t._layers = t._layers || function() {
      return [
        {
          z: 0,
          draw(n) {
            t.draw(n);
          }
        }
      ];
    }, e.boxes.push(t);
  },
  removeBox(e, t) {
    const n = e.boxes ? e.boxes.indexOf(t) : -1;
    n !== -1 && e.boxes.splice(n, 1);
  },
  configure(e, t, n) {
    t.fullSize = n.fullSize, t.position = n.position, t.weight = n.weight;
  },
  update(e, t, n, a) {
    if (!e)
      return;
    const s = Zt(e.options.layout.padding), o = Math.max(t - s.width, 0), i = Math.max(n - s.height, 0), l = Tc(e.boxes), d = l.vertical, c = l.horizontal;
    xt(e.boxes, (m) => {
      typeof m.beforeLayout == "function" && m.beforeLayout();
    });
    const u = d.reduce((b, v) => v.box.options && v.box.options.display === !1 ? b : b + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: n,
      padding: o,
      availableWidth: s,
      availableHeight: i,
      vBoxMaxWidth: s / 2 / u,
      hBoxMaxHeight: i / 2
    }), g = Object.assign({}, s);
    li(g, Zt(a));
    const y = Object.assign({
      maxPadding: g,
      w: o,
      h: i,
      x: s.left,
      y: s.top
    }, s), f = Ac(d.concat(c), h);
    cn(l.fullSize, y, h, f), cn(d, y, h, f), cn(c, y, h, f) && cn(d, y, h, f), Lc(y), Os(l.leftAndTop, y, h, f), y.x += y.w, y.y += y.h, Os(l.rightAndBottom, y, h, f), e.chartArea = {
      left: y.left,
      top: y.top,
      right: y.left + y.w,
      bottom: y.top + y.h,
      height: y.h,
      width: y.w
    }, xt(l.chartArea, (m) => {
      const v = m.box;
      Object.assign(v, e.chartArea), v.update(y.w, y.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class ri {
  acquireContext(t, n) {
  }
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, n, a) {
  }
  removeEventListener(t, n, a) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, n, a, o) {
    return n = Math.max(0, n || t.width), a = a || t.height, {
      width: n,
      height: Math.max(0, o ? Math.floor(n / o) : a)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class Ec extends ri {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const Vn = "$chartjs", Ic = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, zs = (e) => e === null || e === "";
function Pc(e, t) {
  const n = e.style, a = e.getAttribute("height"), s = e.getAttribute("width");
  if (e[Vn] = {
    initial: {
      height: a,
      width: o,
      style: {
        display: n.display,
        height: n.height,
        width: n.width
      }
    }
  }, n.display = n.display || "block", n.boxSizing = n.boxSizing || "border-box", Yo(o)) {
    const s = Do(e, "width");
    s !== void 0 && (e.width = s);
  }
  if (Yo(a))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const s = Do(e, "height");
      s !== void 0 && (e.height = s);
    }
  return e;
}
const ci = Br ? {
  passive: !0
} : !1;
function Rc(e, t, n) {
  e && e.addEventListener(t, n, ci);
}
function Oc(e, t, n) {
  e && e.canvas && e.canvas.removeEventListener(t, n, ci);
}
function zc(e, t) {
  const n = Ic[e.type] || e.type, { x: a, y: s } = Fe(e, t);
  return {
    type: n,
    chart: t,
    native: e,
    x: a !== void 0 ? a : null,
    y: o !== void 0 ? o : null
  };
}
function ea(e, t) {
  for (const n of e)
    if (n === t || n.contains(t))
      return !0;
}
function Vc(e, t, n) {
  const a = e.canvas, s = new MutationObserver((o) => {
    let i = !1;
    for (const l of o)
      i = i || Gn(l.addedNodes, a), i = i && !Gn(l.removedNodes, a);
    i && n();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
function Nc(e, t, n) {
  const a = e.canvas, s = new MutationObserver((o) => {
    let i = !1;
    for (const l of o)
      i = i || Gn(l.removedNodes, a), i = i && !Gn(l.addedNodes, a);
    i && n();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
const Dn = /* @__PURE__ */ new Map();
let Ko = 0;
function yi() {
  const e = window.devicePixelRatio;
  e !== Ko && (Ko = e, Dn.forEach((t, n) => {
    n.currentDevicePixelRatio !== e && t();
  }));
}
function Wc(e, t) {
  Cn.size || window.addEventListener("resize", di), Cn.set(e, t);
}
function Hc(e) {
  Cn.delete(e), Cn.size || window.removeEventListener("resize", di);
}
function jc(e, t, n) {
  const a = e.canvas, s = a && Ka(a);
  if (!s)
    return;
  const o = Yo((l, d) => {
    const c = s.clientWidth;
    n(l, d), c < s.clientWidth && n();
  }, window), i = new ResizeObserver((l) => {
    const d = l[0], c = d.contentRect.width, u = d.contentRect.height;
    c === 0 && u === 0 || o(c, u);
  });
  return i.observe(s), Wc(e, o), i;
}
function ga(e, t, n) {
  n && n.disconnect(), t === "resize" && Hc(e);
}
function Yc(e, t, n) {
  const a = e.canvas, s = Yo((o) => {
    e.ctx !== null && n(zc(o, e));
  }, e);
  return Rc(a, t, s), s;
}
class Kc extends ri {
  acquireContext(t, n) {
    const a = t && t.getContext && t.getContext("2d");
    return a && a.canvas === t ? (Pc(t, n), a) : null;
  }
  releaseContext(t) {
    const n = t.canvas;
    if (!n[Yn])
      return !1;
    const a = n[Yn].initial;
    [
      "height",
      "width"
    ].forEach((s) => {
      const i = a[s];
      kt(i) ? n.removeAttribute(s) : n.setAttribute(s, i);
    });
    const o = a.style || {};
    return Object.keys(o).forEach((s) => {
      n.style[s] = o[s];
    }), n.width = n.width, delete n[Yn], !0;
  }
  addEventListener(t, n, a) {
    this.removeEventListener(t, n);
    const s = t.$proxies || (t.$proxies = {}), i = {
      attach: Vc,
      detach: Nc,
      resize: jc
    }[n] || Yc;
    s[n] = i(t, n, a);
  }
  removeEventListener(t, n) {
    const a = t.$proxies || (t.$proxies = {}), o = a[n];
    if (!o)
      return;
    ({
      attach: ga,
      detach: ga,
      resize: ga
    }[n] || Oc)(t, n, s), a[n] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, n, a, s) {
    return Tr(t, n, a, s);
  }
  isAttached(t) {
    const n = t && Ka(t);
    return !!(n && n.isConnected);
  }
}
function qc(e) {
  return !Ya() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Ec : Kc;
}
let ve = class {
  static defaults = {};
  static defaultRoutes = void 0;
  x;
  y;
  active = !1;
  options;
  $animations;
  tooltipPosition(t) {
    const { x: n, y: a } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: n,
      y: a
    };
  }
  hasValue() {
    return Cn(this.x) && Cn(this.y);
  }
  getProps(t, n) {
    const a = this.$animations;
    if (!n || !a)
      return this;
    const o = {};
    return t.forEach((s) => {
      o[s] = a[s] && a[s].active() ? a[s]._to : this[s];
    }), o;
  }
};
function Uc(e, t) {
  const n = e.options.ticks, a = Xc(e), s = Math.min(n.maxTicksLimit || a, a), o = n.major.enabled ? Zc(t) : [], i = o.length, l = o[0], d = o[i - 1], c = [];
  if (i > s)
    return Qc(t, c, o, i / s), c;
  const u = Gc(o, t, s);
  if (i > 0) {
    let h, g;
    const y = i > 1 ? Math.round((d - l) / (i - 1)) : null;
    for (En(t, c, u, _t(y) ? 0 : l - y, l), h = 0, g = i - 1; h < g; h++)
      En(t, c, u, o[h], o[h + 1]);
    return En(t, c, u, d, _t(y) ? t.length : d + y), c;
  }
  return On(t, c, u), c;
}
function Xc(e) {
  const t = e.options.offset, n = e._tickSize(), a = e._length / n + (t ? 0 : 1), s = e._maxLength / n;
  return Math.floor(Math.min(a, s));
}
function Gc(e, t, n) {
  const a = Jc(e), s = t.length / n;
  if (!a)
    return Math.max(s, 1);
  const o = Al(a);
  for (let i = 0, l = o.length - 1; i < l; i++) {
    const d = o[i];
    if (d > s)
      return d;
  }
  return Math.max(o, 1);
}
function Zc(e) {
  const t = [];
  let n, a;
  for (n = 0, a = e.length; n < a; n++)
    e[n].major && t.push(n);
  return t;
}
function Qc(e, t, n, a) {
  let s = 0, o = n[0], i;
  for (a = Math.ceil(a), i = 0; i < e.length; i++)
    i === s && (t.push(e[i]), o++, s = n[o * a]);
}
function En(e, t, n, a, s) {
  const o = ht(a, 0), i = Math.min(ht(s, e.length), e.length);
  let l = 0, d, c, u;
  for (n = Math.ceil(n), s && (d = s - a, n = d / Math.floor(d / n)), u = o; u < 0; )
    l++, u = Math.round(o + l * n);
  for (c = Math.max(o, 0); c < i; c++)
    c === u && (t.push(e[c]), l++, u = Math.round(o + l * n));
}
function Jc(e) {
  const t = e.length;
  let n, a;
  if (t < 2)
    return !1;
  for (a = e[0], n = 1; n < t; ++n)
    if (e[n] - e[n - 1] !== a)
      return !1;
  return a;
}
const td = (e) => e === "left" ? "right" : e === "right" ? "left" : e, Ns = (e, t, n) => t === "top" || t === "left" ? e[t] + n : e[t] - n, Ws = (e, t) => Math.min(t || e, e);
function Hs(e, t) {
  const n = [], a = e.length / t, s = e.length;
  let o = 0;
  for (; o < s; o += a)
    n.push(e[Math.floor(o)]);
  return n;
}
function ed(e, t, n) {
  const a = e.ticks.length, s = Math.min(t, a - 1), o = e._startPixel, i = e._endPixel, l = 1e-6;
  let d = e.getPixelForTick(s), c;
  if (!(n && (a === 1 ? c = Math.max(d - o, i - d) : t === 0 ? c = (e.getPixelForTick(1) - d) / 2 : c = (d - e.getPixelForTick(s - 1)) / 2, d += s < t ? c : -c, d < o - l || d > i + l)))
    return d;
}
function nd(e, t) {
  xt(e, (n) => {
    const a = n.gc, s = a.length / 2;
    let o;
    if (s > t) {
      for (o = 0; o < s; ++o)
        delete n.data[a[o]];
      a.splice(0, s);
    }
  });
}
function sn(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function Go(e, t) {
  if (!e.display)
    return 0;
  const n = Vt(e.font, t), a = Zt(e.padding);
  return (It(e.text) ? e.text.length : 1) * n.lineHeight + a.height;
}
function ad(e, t) {
  return Ve(e, {
    scale: t,
    type: "scale"
  });
}
function sd(e, t, n) {
  return Ve(e, {
    tick: n,
    index: t,
    type: "tick"
  });
}
function od(e, t, n) {
  let a = Pa(e);
  return (n && t !== "right" || !n && t === "right") && (a = td(a)), a;
}
function id(e, t, n, a) {
  const { top: s, left: o, bottom: i, right: l, chart: d } = e, { chartArea: c, scales: u } = d;
  let h = 0, g, y, f;
  const m = i - s, v = l - o;
  if (e.isHorizontal()) {
    if (y = Ot(a, o, l), vt(n)) {
      const p = Object.keys(n)[0], b = n[p];
      f = u[p].getPixelForValue(b) + m - t;
    } else n === "center" ? f = (c.bottom + c.top) / 2 + m - t : f = Ns(e, n, t);
    g = l - o;
  } else {
    if (vt(n)) {
      const p = Object.keys(n)[0], b = n[p];
      y = u[p].getPixelForValue(b) - v + t;
    } else n === "center" ? y = (c.left + c.right) / 2 - v + t : y = Ns(e, n, t);
    f = Ot(a, i, s), h = n === "left" ? -Pt : Pt;
  }
  return {
    titleX: y,
    titleY: f,
    maxWidth: g,
    rotation: h
  };
}
class en extends ve {
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
  parse(t, n) {
    return t;
  }
  getUserBounds() {
    let { _userMin: t, _userMax: n, _suggestedMin: a, _suggestedMax: o } = this;
    return t = le(t, Number.POSITIVE_INFINITY), n = le(n, Number.NEGATIVE_INFINITY), a = le(a, Number.POSITIVE_INFINITY), o = le(o, Number.NEGATIVE_INFINITY), {
      min: le(t, a),
      max: le(n, o),
      minDefined: ne(t),
      maxDefined: ne(n)
    };
  }
  getMinMax(t) {
    let { min: n, max: a, minDefined: o, maxDefined: s } = this.getUserBounds(), i;
    if (o && s)
      return {
        min: n,
        max: a
      };
    const l = this.getMatchingVisibleMetas();
    for (let d = 0, c = l.length; d < c; ++d)
      i = l[d].controller.getMinMax(this, t), s || (n = Math.min(n, i.min)), o || (a = Math.max(a, i.max));
    return n = o && n > a ? a : n, a = s && n > a ? n : a, {
      min: ne(n, ne(a, n)),
      max: ne(a, ne(n, a))
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
    Dt(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, n, a) {
    const { beginAtZero: s, grace: o, ticks: i } = this.options, l = i.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = n, this._margins = a = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, a), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + a.left + a.right : this.height + a.top + a.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = rr(this, o, s), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const d = l < this.ticks.length;
    this._convertTicksToLabels(d ? Hs(this.ticks, l) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = Uc(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), d && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, n, a;
    this.isHorizontal() ? (n = this.left, a = this.right) : (n = this.top, a = this.bottom, t = !t), this._startPixel = n, this._endPixel = a, this._reversePixels = t, this._length = a - n, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    Dt(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    Dt(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    Dt(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), Dt(this.options[t], [
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
    Dt(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const n = this.options.ticks;
    let a, o, s;
    for (a = 0, o = t.length; a < o; a++)
      s = t[a], s.label = Dt(n.callback, [
        s.value,
        a,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    Dt(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    Dt(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, n = t.ticks, a = Ws(this.ticks.length, t.ticks.maxTicksLimit), s = n.minRotation || 0, o = n.maxRotation;
    let i = s, l, d, c;
    if (!this._isVisible() || !n.display || s >= o || a <= 1 || !this.isHorizontal()) {
      this.labelRotation = s;
      return;
    }
    const u = this._getLabelSizes(), h = u.widest.width, g = u.highest.height, y = zt(this.chart.width - h, 0, this.maxWidth);
    l = t.offset ? this.maxWidth / a : y / (a - 1), h + 6 > l && (l = y / (a - (t.offset ? 0.5 : 1)), d = this.maxHeight - tn(t.grid) - n.padding - js(t.title, this.chart.options.font), c = Math.sqrt(h * h + g * g), i = Fl(Math.min(Math.asin(zt((u.highest.height + 6) / l, -1, 1)), Math.asin(zt(d / c, -1, 1)) - Math.asin(zt(g / c, -1, 1)))), i = Math.max(s, Math.min(o, i))), this.labelRotation = i;
  }
  afterCalculateLabelRotation() {
    Dt(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    Dt(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: n, options: { ticks: a, title: s, grid: o } } = this, i = this._isVisible(), l = this.isHorizontal();
    if (i) {
      const d = js(s, n.options.font);
      if (l ? (t.width = this.maxWidth, t.height = tn(o) + d) : (t.height = this.maxHeight, t.width = tn(o) + d), a.display && this.ticks.length) {
        const { first: c, last: u, widest: h, highest: g } = this._getLabelSizes(), y = a.padding * 2, f = ue(this.labelRotation), m = Math.cos(f), v = Math.sin(f);
        if (l) {
          const p = a.mirror ? 0 : v * h.width + m * g.height;
          t.height = Math.min(this.maxHeight, t.height + p + y);
        } else {
          const p = a.mirror ? 0 : m * h.width + v * g.height;
          t.width = Math.min(this.maxWidth, t.width + p + y);
        }
        this._calculatePadding(c, u, v, b);
      }
    }
    this._handleMargins(), l ? (this.width = this._length = n.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = n.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, n, a, s) {
    const { ticks: { align: o, padding: i }, position: l } = this.options, d = this.labelRotation !== 0, c = l !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const u = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let g = 0, y = 0;
      d ? c ? (g = s * t.width, y = a * n.height) : (g = a * t.height, y = s * n.width) : o === "start" ? y = n.width : o === "end" ? g = t.width : o !== "inner" && (g = t.width / 2, y = n.width / 2), this.paddingLeft = Math.max((g - u + i) * this.width / (this.width - u), 0), this.paddingRight = Math.max((y - h + i) * this.width / (this.width - h), 0);
    } else {
      let u = n.height / 2, h = t.height / 2;
      s === "start" ? (u = 0, h = t.height) : s === "end" && (u = n.height, h = 0), this.paddingTop = u + i, this.paddingBottom = h + i;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    Dt(this.options.afterFit, [
      this
    ]);
  }
  isHorizontal() {
    const { axis: t, position: n } = this.options;
    return n === "top" || n === "bottom" || t === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(t) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(t);
    let n, a;
    for (n = 0, a = t.length; n < a; n++)
      kt(t[n].label) && (t.splice(n, 1), a--, n--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const n = this.options.ticks.sampleSize;
      let a = this.ticks;
      n < a.length && (a = Xo(a, n)), this._labelSizes = t = this._computeLabelSizes(a, a.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, n, a) {
    const { ctx: s, _longestTextCache: o } = this, i = [], l = [], d = Math.floor(n / Ws(n, a));
    let c = 0, u = 0, h, g, y, f, m, v, p, b, x, w, M;
    for (h = 0; h < n; h += d) {
      if (f = t[h].label, m = this._resolveTickFontOptions(h), s.font = v = m.string, p = o[v] = o[v] || {
        data: {},
        gc: []
      }, b = m.lineHeight, x = w = 0, !_t(f) && !It(f))
        x = bs(s, p.data, p.gc, x, f), w = b;
      else if (It(f))
        for (g = 0, y = f.length; g < y; ++g)
          M = f[g], !_t(M) && !It(M) && (x = bs(s, p.data, p.gc, x, M), w += b);
      i.push(x), l.push(w), c = Math.max(x, c), u = Math.max(w, u);
    }
    nd(o, n);
    const C = i.indexOf(c), $ = l.indexOf(u), S = (L) => ({
      width: i[L] || 0,
      height: l[L] || 0
    });
    return {
      first: S(0),
      last: S(n - 1),
      widest: S(C),
      highest: S($),
      widths: i,
      heights: l
    };
  }
  getLabelForValue(t) {
    return t;
  }
  getPixelForValue(t, n) {
    return NaN;
  }
  getValueForPixel(t) {
  }
  getPixelForTick(t) {
    const n = this.ticks;
    return t < 0 || t > n.length - 1 ? null : this.getPixelForValue(n[t].value);
  }
  getPixelForDecimal(t) {
    this._reversePixels && (t = 1 - t);
    const n = this._startPixel + t * this._length;
    return Il(this._alignToPixels ? Te(this.chart, n, 0) : n);
  }
  getDecimalForPixel(t) {
    const n = (t - this._startPixel) / this._length;
    return this._reversePixels ? 1 - n : n;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: t, max: n } = this;
    return t < 0 && n < 0 ? n : t > 0 && n > 0 ? t : 0;
  }
  getContext(t) {
    const n = this.ticks || [];
    if (t >= 0 && t < n.length) {
      const a = n[t];
      return a.$context || (a.$context = sd(this.getContext(), t, a));
    }
    return this.$context || (this.$context = ad(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, n = ue(this.labelRotation), a = Math.abs(Math.cos(n)), s = Math.abs(Math.sin(n)), o = this._getLabelSizes(), i = t.autoSkipPadding || 0, l = o ? o.widest.width + i : 0, d = o ? o.highest.height + i : 0;
    return this.isHorizontal() ? d * a > l * s ? l / a : d / s : d * s < l * a ? d / a : l / s;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const n = this.axis, a = this.chart, s = this.options, { grid: o, position: i, border: l } = s, d = o.offset, c = this.isHorizontal(), h = this.ticks.length + (d ? 1 : 0), g = tn(o), y = [], f = l.setContext(this.getContext()), m = f.display ? f.width : 0, v = m / 2, p = function(N) {
      return Te(a, N, m);
    };
    let b, x, w, M, C, $, S, L, T, B, E, I;
    if (i === "top")
      b = p(this.bottom), $ = this.bottom - g, L = b - v, B = p(t.top) + v, I = t.bottom;
    else if (i === "bottom")
      b = p(this.top), B = t.top, I = p(t.bottom) - v, $ = b + v, L = this.top + g;
    else if (i === "left")
      b = p(this.right), C = this.right - g, S = b - v, T = p(t.left) + v, E = t.right;
    else if (i === "right")
      b = p(this.left), T = t.left, E = p(t.right) - v, C = b + v, S = this.left + g;
    else if (n === "x") {
      if (i === "center")
        b = p((t.top + t.bottom) / 2 + 0.5);
      else if (vt(i)) {
        const N = Object.keys(i)[0], tt = i[N];
        b = p(this.chart.scales[N].getPixelForValue(tt));
      }
      B = t.top, I = t.bottom, $ = b + v, L = $ + g;
    } else if (n === "y") {
      if (i === "center")
        b = p((t.left + t.right) / 2);
      else if (vt(i)) {
        const N = Object.keys(i)[0], tt = i[N];
        b = p(this.chart.scales[N].getPixelForValue(tt));
      }
      C = b - v, S = C - g, T = t.left, E = t.right;
    }
    const V = ht(s.ticks.maxTicksLimit, h), Y = Math.max(1, Math.ceil(h / V));
    for (x = 0; x < h; x += Y) {
      const N = this.getContext(x), tt = o.setContext(N), et = l.setContext(N), rt = tt.lineWidth, G = tt.color, K = et.dash || [], j = et.dashOffset, ot = tt.tickWidth, X = tt.tickColor, ct = tt.tickBorderDash || [], pt = tt.tickBorderDashOffset;
      w = ed(this, x, d), w !== void 0 && (M = Te(a, w, rt), c ? C = S = T = E = M : $ = L = B = I = M, y.push({
        tx1: C,
        ty1: $,
        tx2: S,
        ty2: L,
        x1: T,
        y1: B,
        x2: E,
        y2: I,
        width: rt,
        color: G,
        borderDash: K,
        borderDashOffset: j,
        tickWidth: ot,
        tickColor: X,
        tickBorderDash: ct,
        tickBorderDashOffset: pt
      }));
    }
    return this._ticksLength = h, this._borderValue = f, y;
  }
  _computeLabelItems(t) {
    const n = this.axis, a = this.options, { position: s, ticks: o } = a, i = this.isHorizontal(), l = this.ticks, { align: d, crossAlign: c, padding: u, mirror: h } = o, g = tn(a.grid), y = g + u, f = h ? -u : y, m = -ue(this.labelRotation), v = [];
    let p, b, x, w, M, C, $, S, L, T, B, E, I = "middle";
    if (s === "top")
      C = this.bottom - f, $ = this._getXAxisLabelAlignment();
    else if (s === "bottom")
      C = this.top + f, $ = this._getXAxisLabelAlignment();
    else if (s === "left") {
      const Y = this._getYAxisLabelAlignment(g);
      $ = Y.textAlign, M = Y.x;
    } else if (s === "right") {
      const Y = this._getYAxisLabelAlignment(g);
      $ = Y.textAlign, M = Y.x;
    } else if (n === "x") {
      if (o === "center")
        C = (t.top + t.bottom) / 2 + y;
      else if (vt(s)) {
        const Y = Object.keys(s)[0], N = s[Y];
        C = this.chart.scales[Y].getPixelForValue(N) + y;
      }
      $ = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (s === "center")
        M = (t.left + t.right) / 2 - y;
      else if (vt(s)) {
        const Y = Object.keys(s)[0], N = s[Y];
        M = this.chart.scales[Y].getPixelForValue(N);
      }
      $ = this._getYAxisLabelAlignment(g).textAlign;
    }
    n === "y" && (d === "start" ? I = "top" : d === "end" && (I = "bottom"));
    const V = this._getLabelSizes();
    for (p = 0, b = l.length; p < b; ++p) {
      x = l[p], w = x.label;
      const Y = o.setContext(this.getContext(p));
      S = this.getPixelForTick(p) + o.labelOffset, L = this._resolveTickFontOptions(p), T = L.lineHeight, B = It(w) ? w.length : 1;
      const N = B / 2, tt = Y.color, et = Y.textStrokeColor, rt = Y.textStrokeWidth;
      let G = $;
      i ? (M = S, $ === "inner" && (p === b - 1 ? G = this.options.reverse ? "left" : "right" : p === 0 ? G = this.options.reverse ? "right" : "left" : G = "center"), s === "top" ? c === "near" || m !== 0 ? E = -B * T + T / 2 : c === "center" ? E = -V.highest.height / 2 - N * T + T : E = -V.highest.height + T / 2 : c === "near" || m !== 0 ? E = T / 2 : c === "center" ? E = V.highest.height / 2 - N * T : E = V.highest.height - B * T, h && (E *= -1), m !== 0 && !Y.showLabelBackdrop && (M += T / 2 * Math.sin(m))) : (C = S, E = (1 - B) * T / 2);
      let K;
      if (Y.showLabelBackdrop) {
        const j = Zt(Y.backdropPadding), ot = V.heights[p], X = V.widths[p];
        let ct = E - j.top, pt = 0 - j.left;
        switch (I) {
          case "middle":
            It -= St / 2;
            break;
          case "bottom":
            It -= St;
            break;
        }
        switch ($) {
          case "center":
            pt -= X / 2;
            break;
          case "right":
            pt -= X;
            break;
          case "inner":
            p === b - 1 ? pt -= X : p > 0 && (pt -= X / 2);
            break;
        }
        K = {
          left: pt,
          top: ct,
          width: X + j.width,
          height: ot + j.height,
          color: Y.backdropColor
        };
      }
      v.push({
        label: x,
        font: L,
        textOffset: E,
        options: {
          rotation: m,
          color: tt,
          strokeColor: et,
          strokeWidth: rt,
          textAlign: G,
          textBaseline: I,
          translation: [
            M,
            C
          ],
          backdrop: K
        }
      });
    }
    return v;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: n } = this.options;
    if (-me(this.labelRotation))
      return t === "top" ? "left" : "right";
    let o = "center";
    return n.align === "start" ? o = "left" : n.align === "end" ? o = "right" : n.align === "inner" && (o = "inner"), o;
  }
  _getYAxisLabelAlignment(t) {
    const { position: n, ticks: { crossAlign: a, mirror: s, padding: o } } = this.options, i = this._getLabelSizes(), l = t + o, d = i.widest.width;
    let c, u;
    return n === "left" ? s ? (u = this.right + o, a === "near" ? c = "left" : a === "center" ? (c = "center", u += d / 2) : (c = "right", u += d)) : (u = this.right - l, a === "near" ? c = "right" : a === "center" ? (c = "center", u -= d / 2) : (c = "left", u = this.left)) : n === "right" ? s ? (u = this.left + o, a === "near" ? c = "right" : a === "center" ? (c = "center", u -= d / 2) : (c = "left", u -= d)) : (u = this.left + l, a === "near" ? c = "left" : a === "center" ? (c = "center", u += d / 2) : (c = "right", u = this.right)) : c = "right", {
      textAlign: c,
      x: u
    };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror)
      return;
    const t = this.chart, n = this.options.position;
    if (n === "left" || n === "right")
      return {
        top: 0,
        left: this.left,
        bottom: t.height,
        right: this.right
      };
    if (n === "top" || n === "bottom")
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: t.width
      };
  }
  drawBackground() {
    const { ctx: t, options: { backgroundColor: n }, left: a, top: o, width: s, height: i } = this;
    n && (t.save(), t.fillStyle = n, t.fillRect(a, o, s, i), t.restore());
  }
  getLineWidthForValue(t) {
    const n = this.options.grid;
    if (!this._isVisible() || !n.display)
      return 0;
    const o = this.ticks.findIndex((s) => s.value === t);
    return o >= 0 ? n.setContext(this.getContext(o)).lineWidth : 0;
  }
  drawGrid(t) {
    const n = this.options.grid, a = this.ctx, s = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let o, i;
    const l = (d, c, u) => {
      !u.width || !u.color || (a.save(), a.lineWidth = u.width, a.strokeStyle = u.color, a.setLineDash(u.borderDash || []), a.lineDashOffset = u.borderDashOffset, a.beginPath(), a.moveTo(d.x, d.y), a.lineTo(c.x, c.y), a.stroke(), a.restore());
    };
    if (n.display)
      for (o = 0, i = s.length; o < i; ++o) {
        const d = s[o];
        n.drawOnChartArea && l({
          x: d.x1,
          y: d.y1
        }, {
          x: d.x2,
          y: d.y2
        }, d), n.drawTicks && l({
          x: d.tx1,
          y: d.ty1
        }, {
          x: d.tx2,
          y: d.ty2
        }, {
          color: d.tickColor,
          width: d.tickWidth,
          borderDash: d.tickBorderDash,
          borderDashOffset: d.tickBorderDashOffset
        });
      }
  }
  drawBorder() {
    const { chart: t, ctx: n, options: { border: a, grid: o } } = this, s = a.setContext(this.getContext()), i = a.display ? s.width : 0;
    if (!i)
      return;
    const l = s.setContext(this.getContext(0)).lineWidth, d = this._borderValue;
    let c, u, h, g;
    this.isHorizontal() ? (c = Te(t, this.left, i) - i / 2, u = Te(t, this.right, l) + l / 2, h = g = d) : (h = Te(t, this.top, i) - i / 2, g = Te(t, this.bottom, l) + l / 2, c = u = d), n.save(), n.lineWidth = o.width, n.strokeStyle = o.color, n.beginPath(), n.moveTo(c, h), n.lineTo(u, g), n.stroke(), n.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const a = this.ctx, s = this._computeLabelArea();
    s && za(a, s);
    const o = this.getLabelItems(t);
    for (const i of o) {
      const l = i.options, d = i.font, c = i.label, u = i.textOffset;
      wn(a, c, 0, u, d, l);
    }
    o && Ka(a);
  }
  drawTitle() {
    const { ctx: t, options: { position: n, title: a, reverse: o } } = this;
    if (!a.display)
      return;
    const o = Vt(a.font), i = Zt(a.padding), l = a.align;
    let d = o.lineHeight / 2;
    n === "bottom" || n === "center" || vt(n) ? (d += i.bottom, It(a.text) && (d += o.lineHeight * (a.text.length - 1))) : d += i.top;
    const { titleX: c, titleY: u, maxWidth: h, rotation: g } = id(this, d, n, l);
    wn(t, a.text, 0, 0, o, {
      color: a.color,
      maxWidth: h,
      rotation: g,
      textAlign: od(l, n, s),
      textBaseline: "middle",
      translation: [
        c,
        u
      ]
    });
  }
  draw(t) {
    this._isVisible() && (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t));
  }
  _layers() {
    const t = this.options, n = t.ticks && t.ticks.z || 0, a = ht(t.grid && t.grid.z, -1), s = ht(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== Xe.prototype.draw ? [
      {
        z: n,
        draw: (s) => {
          this.draw(s);
        }
      }
    ] : [
      {
        z: a,
        draw: (s) => {
          this.drawBackground(), this.drawGrid(s), this.drawTitle();
        }
      },
      {
        z: o,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: n,
        draw: (s) => {
          this.drawLabels(s);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const n = this.chart.getSortedVisibleDatasetMetas(), a = this.axis + "AxisID", s = [];
    let o, i;
    for (o = 0, i = n.length; o < i; ++o) {
      const l = n[o];
      l[a] === this.id && (!t || l.type === t) && s.push(l);
    }
    return o;
  }
  _resolveTickFontOptions(t) {
    const n = this.options.ticks.setContext(this.getContext(t));
    return Yt(n.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class zn {
  constructor(t, n, a) {
    this.type = t, this.scope = n, this.override = a, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const n = Object.getPrototypeOf(t);
    let a;
    cd(n) && (a = this.register(n));
    const s = this.items, o = t.id, i = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in s || (s[o] = t, ld(t, i, a), this.override && Tt.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const n = this.items, a = t.id, o = this.scope;
    a in n && delete n[a], o && a in Et[o] && (delete Et[o][a], this.override && delete Ye[a]);
  }
}
function ld(e, t, n) {
  const a = vn(/* @__PURE__ */ Object.create(null), [
    n ? Tt.get(n) : {},
    Tt.get(t),
    e.defaults
  ]);
  Et.set(t, a), e.defaultRoutes && yd(t, e.defaultRoutes), e.descriptors && Et.describe(t, e.descriptors);
}
function yd(e, t) {
  Object.keys(t).forEach((n) => {
    const a = n.split("."), o = a.pop(), s = [
      e
    ].concat(a).join("."), i = t[n].split("."), l = i.pop(), d = i.join(".");
    Tt.route(o, s, d, l);
  });
}
function cd(e) {
  return "id" in e && "defaults" in e;
}
class dd {
  constructor() {
    this.controllers = new zn(oa, "datasets", !0), this.elements = new zn(ve, "elements"), this.plugins = new zn(Object, "plugins"), this.scales = new zn(en, "scales"), this._typedRegistries = [
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
  _each(t, n, a) {
    [
      ...n
    ].forEach((s) => {
      const o = a || this._getRegistryForType(s);
      a || o.isForType(s) || o === this.plugins && s.id ? this._exec(t, o, s) : xt(s, (i) => {
        const l = a || this._getRegistryForType(i);
        this._exec(t, l, i);
      });
    });
  }
  _exec(t, n, a) {
    const o = Va(t);
    Dt(a["before" + o], [], a), n[t](a), Dt(a["after" + o], [], a);
  }
  _getRegistryForType(t) {
    for (let n = 0; n < this._typedRegistries.length; n++) {
      const a = this._typedRegistries[n];
      if (a.isForType(t))
        return a;
    }
    return this.plugins;
  }
  _get(t, n, a) {
    const o = n.get(t);
    if (o === void 0)
      throw new Error('"' + t + '" is not a registered ' + a + ".");
    return o;
  }
}
var se = /* @__PURE__ */ new dd();
class ud {
  constructor() {
    this._init = void 0;
  }
  notify(t, n, a, o) {
    if (n === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install")), this._init === void 0)
      return;
    const s = o ? this._descriptors(t).filter(o) : this._descriptors(t), i = this._notify(s, t, n, a);
    return n === "afterDestroy" && (this._notify(s, t, "stop"), this._notify(this._init, t, "uninstall"), this._init = void 0), i;
  }
  _notify(t, n, a, s) {
    s = s || {};
    for (const o of t) {
      const i = o.plugin, l = i[a], d = [
        n,
        o,
        s.options
      ];
      if ($t(l, d, i) === !1 && s.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    kt(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const n = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), n;
  }
  _createDescriptors(t, n) {
    const a = t && t.config, s = ht(a.options && a.options.plugins, {}), o = hd(a);
    return s === !1 && !n ? [] : gd(t, o, s, n);
  }
  _notifyStateChanges(t) {
    const n = this._oldCache || [], a = this._cache, s = (o, i) => o.filter((l) => !i.some((d) => l.plugin.id === d.plugin.id));
    this._notify(s(n, a), t, "stop"), this._notify(s(a, n), t, "start");
  }
}
function hd(e) {
  const t = {}, n = [], a = Object.keys(se.plugins.items);
  for (let o = 0; o < a.length; o++)
    n.push(se.getPlugin(a[o]));
  const s = e.plugins || [];
  for (let o = 0; o < s.length; o++) {
    const i = s[o];
    n.indexOf(i) === -1 && (n.push(i), t[i.id] = !0);
  }
  return {
    plugins: n,
    localIds: t
  };
}
function fd(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function gd(e, { plugins: t, localIds: n }, a, s) {
  const o = [], i = e.getContext();
  for (const l of t) {
    const d = l.id, c = fd(a[d], s);
    c !== null && o.push({
      plugin: l,
      options: pd(e.config, {
        plugin: l,
        local: n[d]
      }, c, i)
    });
  }
  return s;
}
function pd(e, { plugin: t, local: n }, a, s) {
  const o = e.pluginScopeKeys(t), i = e.getOptionScopes(a, o);
  return n && t.defaults && i.push(t.defaults), e.createResolver(i, s, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Ma(e, t) {
  const n = Tt.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || n.indexAxis || "x";
}
function md(e, t) {
  let n = e;
  return e === "_index_" ? n = t : e === "_value_" && (n = t === "x" ? "y" : "x"), n;
}
function bd(e, t) {
  return e === t ? "_index_" : "_value_";
}
function Zo(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function vd(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Sa(e, ...t) {
  if (Ys(e))
    return e;
  for (const n of t) {
    const a = n.axis || vd(n.position) || e.length > 1 && Ys(e[0].toLowerCase());
    if (a)
      return a;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function Ks(e, t, n) {
  if (n[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function yd(e, t) {
  if (t.data && t.data.datasets) {
    const n = t.data.datasets.filter((a) => a.xAxisID === e || a.yAxisID === e);
    if (n.length)
      return Ks(e, "x", n[0]) || Ks(e, "y", n[0]);
  }
  return {};
}
function _d(e, t) {
  const n = ze[e.type] || {
    scales: {}
  }, a = t.scales || {}, s = Ma(e.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(a).forEach((i) => {
    const l = a[i];
    if (!vt(l))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (l._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const d = Sa(i, l, yd(i, e), Tt.scales[l.type]), c = bd(d, s), u = n.scales || {};
    o[i] = hn(/* @__PURE__ */ Object.create(null), [
      {
        axis: d
      },
      l,
      u[d],
      u[c]
    ]);
  }), e.data.datasets.forEach((i) => {
    const l = i.type || e.type, d = i.indexAxis || Ma(l, t), u = (ze[l] || {}).scales || {};
    Object.keys(u).forEach((h) => {
      const g = md(h, d), y = i[g + "AxisID"] || g;
      o[y] = o[y] || /* @__PURE__ */ Object.create(null), hn(o[y], [
        {
          axis: g
        },
        a[y],
        u[h]
      ]);
    });
  }), Object.keys(o).forEach((i) => {
    const l = o[i];
    hn(l, [
      Tt.scales[l.type],
      Tt.scale
    ]);
  }), s;
}
function _i(e) {
  const t = e.options || (e.options = {});
  t.plugins = ht(t.plugins, {}), t.scales = _d(e, t);
}
function xi(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function xd(e) {
  return e = e || {}, e.data = hi(e.data), ui(e), e;
}
const qs = /* @__PURE__ */ new Map(), fi = /* @__PURE__ */ new Set();
function Pn(e, t) {
  let n = qs.get(e);
  return n || (n = t(), qs.set(e, n), fi.add(n)), n;
}
const ln = (e, t, n) => {
  const a = He(t, n);
  a !== void 0 && e.add(a);
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
    return Vn(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, n) {
    return Vn(`${t}.transition.${n}`, () => [
      [
        `datasets.${t}.transitions.${n}`,
        `transitions.${n}`
      ],
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetElementScopeKeys(t, n) {
    return Vn(`${t}-${n}`, () => [
      [
        `datasets.${t}.elements.${n}`,
        `datasets.${t}`,
        `elements.${n}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(t) {
    const n = t.id, a = this.type;
    return Vn(`${a}-plugin-${n}`, () => [
      [
        `plugins.${n}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, n) {
    const a = this._scopeCache;
    let o = a.get(t);
    return (!o || n) && (o = /* @__PURE__ */ new Map(), a.set(t, o)), o;
  }
  getOptionScopes(t, n, a) {
    const { options: s, type: o } = this, i = this._cachedScopes(t, a), l = i.get(n);
    if (l)
      return l;
    const d = /* @__PURE__ */ new Set();
    n.forEach((u) => {
      t && (d.add(t), u.forEach((h) => ln(d, t, h))), u.forEach((h) => ln(d, o, h)), u.forEach((h) => ln(d, Ye[s] || {}, h)), u.forEach((h) => ln(d, Et, h)), u.forEach((h) => ln(d, Ta, h));
    });
    const c = Array.from(d);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), ki.has(n) && i.set(n, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: n } = this;
    return [
      t,
      Ye[n] || {},
      Et.datasets[n] || {},
      {
        type: n
      },
      Et,
      Ta
    ];
  }
  resolveNamedOptions(t, n, a, o = [
    ""
  ]) {
    const s = {
      $shared: !0
    }, { resolver: i, subPrefixes: l } = Us(this._resolverCache, t, s);
    let d = i;
    if (Cd(i, n)) {
      o.$shared = !1, a = $e(a) ? a() : a;
      const c = this.createResolver(t, a, l);
      d = qe(i, a, c);
    }
    for (const c of n)
      s[c] = d[c];
    return s;
  }
  createResolver(t, n, a = [
    ""
  ], s) {
    const { resolver: o } = Us(this._resolverCache, t, a);
    return vt(n) ? qe(o, n, void 0, s) : o;
  }
}
function ts(e, t, n) {
  let a = e.get(t);
  a || (a = /* @__PURE__ */ new Map(), e.set(t, a));
  const s = n.join();
  let o = a.get(s);
  return o || (o = {
    resolver: Wa(t, n),
    subPrefixes: n.filter((l) => !l.toLowerCase().includes("hover"))
  }, a.set(s, o)), o;
}
const wd = (e) => vt(e) && Object.getOwnPropertyNames(e).some((t) => $e(e[t]));
function Cd(e, t) {
  const { isScriptable: n, isIndexable: a } = Xo(e);
  for (const s of t) {
    const o = n(s), i = a(s), l = (i || o) && e[s];
    if (o && ($e(l) || wd(l)) || i && It(l))
      return !0;
  }
  return !1;
}
var $d = "4.5.1";
const Md = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Xs(e, t) {
  return e === "top" || e === "bottom" || Md.indexOf(e) === -1 && t === "x";
}
function ns(e, t) {
  return function(n, a) {
    return n[e] === a[e] ? n[t] - a[t] : n[e] - a[e];
  };
}
function as(e) {
  const t = e.chart, n = t.options.animation;
  t.notifyPlugins("afterRender"), Dt(n && n.onComplete, [
    e
  ], t);
}
function Od(e) {
  const t = e.chart, n = t.options.animation;
  Dt(n && n.onProgress, [
    e
  ], t);
}
function wi(e) {
  return Za() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const Kn = {}, os = (e) => {
  const t = wi(e);
  return Object.values(Kn).filter((n) => n.canvas === t).pop();
};
function Dd(e, t, n) {
  const a = Object.keys(e);
  for (const o of a) {
    const s = +o;
    if (s >= t) {
      const i = e[o];
      delete e[o], (n > 0 || s > t) && (e[s + n] = i);
    }
  }
}
function Ad(e, t, n, a) {
  return !n || e.type === "mouseout" ? null : a ? t : e;
}
let Ge = class {
  static defaults = Tt;
  static instances = Nn;
  static overrides = ze;
  static registry = se;
  static version = $d;
  static getChart = Qs;
  static register(...t) {
    ce.add(...t), ss();
  }
  static unregister(...t) {
    ce.remove(...t), ss();
  }
  constructor(t, n) {
    const a = this.config = new kd(n), s = gi(t), o = Qs(s);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const i = a.createResolver(a.chartOptionScopes(), this.getContext());
    this.platform = new (a.platform || qc(s))(), this.platform.updateConfig(a);
    const l = this.platform.acquireContext(s, i.aspectRatio), d = l && l.canvas, c = d && d.height, u = d && d.width;
    if (this.id = _l(), this.ctx = l, this.canvas = d, this.width = u, this.height = c, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new ud(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = zl((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], Nn[this.id] = this, !l || !d) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    re.listen(this, "complete", Zs), re.listen(this, "progress", Sd), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: n }, width: a, height: o, _aspectRatio: s } = this;
    return kt(t) ? n && s ? s : o ? a / o : null : t;
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
    return ce;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Mo(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Co(this.canvas, this.ctx), this;
  }
  stop() {
    return re.stop(this), this;
  }
  resize(t, n) {
    re.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: n
    } : this._resize(t, n);
  }
  _resize(t, n) {
    const a = this.options, s = this.canvas, o = a.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(s, t, n, o), l = a.devicePixelRatio || this.platform.getDevicePixelRatio(), d = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, xs(this, l, !0) && (this.notifyPlugins("resize", {
      size: i
    }), Dt(a.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(d) && this.render());
  }
  ensureScalesHaveIDs() {
    const n = this.options.scales || {};
    wt(n, (a, o) => {
      a.id = o;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, n = t.scales, a = this.scales, s = Object.keys(a).reduce((i, l) => (i[l] = !1, i), {});
    let o = [];
    n && (o = o.concat(Object.keys(n).map((i) => {
      const l = n[i], d = Sa(i, l), c = d === "r", u = d === "x";
      return {
        options: l,
        dposition: c ? "chartArea" : u ? "bottom" : "left",
        dtype: c ? "radialLinear" : u ? "category" : "linear"
      };
    }))), xt(o, (i) => {
      const l = i.options, d = l.id, c = Sa(d, l), u = ht(l.type, i.dtype);
      (l.position === void 0 || Xs(l.position, c) !== Xs(i.dposition)) && (l.position = i.dposition), s[d] = !0;
      let h = null;
      if (d in a && a[d].type === u)
        h = a[d];
      else {
        const g = se.getScale(u);
        h = new g({
          id: d,
          type: u,
          ctx: this.ctx,
          chart: this
        }), a[h.id] = h;
      }
      h.init(l, t);
    }), xt(s, (i, l) => {
      i || delete a[l];
    }), xt(a, (i) => {
      Xt.configure(this, i, i.options), Xt.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, n = this.data.datasets.length, a = t.length;
    if (t.sort((o, s) => o.index - s.index), a > n) {
      for (let o = n; o < a; ++o)
        this._destroyDatasetMeta(o);
      t.splice(n, a - n);
    }
    this._sortedMetasets = t.slice(0).sort(ns("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: n } } = this;
    t.length > n.length && delete this._stacks, t.forEach((a, o) => {
      n.filter((s) => s === a._dataset).length === 0 && this._destroyDatasetMeta(o);
    });
  }
  buildOrUpdateControllers() {
    const t = [], n = this.data.datasets;
    let a, o;
    for (this._removeUnreferencedMetasets(), a = 0, o = n.length; a < o; a++) {
      const s = n[a];
      let i = this.getDatasetMeta(a);
      const l = o.type || this.config.type;
      if (i.type && i.type !== l && (this._destroyDatasetMeta(a), i = this.getDatasetMeta(a)), i.type = l, i.indexAxis = o.indexAxis || Ma(l, this.options), i.order = o.order || 0, i.index = a, i.label = "" + o.label, i.visible = this.isDatasetVisible(a), i.controller)
        i.controller.updateIndex(a), i.controller.linkScales();
      else {
        const d = se.getController(l), { datasetElementType: c, dataElementType: u } = Tt.datasets[l];
        Object.assign(d, {
          dataElementType: ce.getElement(u),
          datasetElementType: c && ce.getElement(c)
        }), i.controller = new d(this, a), t.push(i.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    wt(this.data.datasets, (t, n) => {
      this.getDatasetMeta(n).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const n = this.config;
    n.update();
    const a = this._options = n.createResolver(n.chartOptionScopes(), this.getContext()), o = this._animationsDisabled = !a.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const s = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let i = 0;
    for (let c = 0, u = this.data.datasets.length; c < u; c++) {
      const { controller: h } = this.getDatasetMeta(c), g = !s && o.indexOf(h) === -1;
      h.buildOrUpdateElements(g), i = Math.max(+h.getMaxOverflow(), i);
    }
    i = this._minPadding = a.layout.autoPadding ? i : 0, this._updateLayout(i), o || wt(s, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(Gs("z", "_idx"));
    const { _active: l, _lastEvent: d } = this;
    d ? this._eventHandler(d, !0) : l.length && this._updateHoverStyles(l, l, !0), this.render();
  }
  _updateScales() {
    xt(this.scales, (t) => {
      Xt.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, n = new Set(Object.keys(this._listeners)), a = new Set(t.events);
    (!rs(n, a) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, n = this._getUniformDataChanges() || [];
    for (const { method: a, start: s, count: o } of n) {
      const i = a === "_removeElements" ? -o : o;
      Dd(t, s, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const n = this.data.datasets.length, a = (o) => new Set(t.filter((i) => i[0] === o).map((i, l) => l + "," + i.splice(1).join(","))), s = a(0);
    for (let o = 1; o < n; o++)
      if (!rs(s, a(o)))
        return;
    return Array.from(o).map((s) => s.split(",")).map((s) => ({
      method: s[1],
      start: +s[2],
      count: +s[3]
    }));
  }
  _updateLayout(t) {
    if (this.notifyPlugins("beforeLayout", {
      cancelable: !0
    }) === !1)
      return;
    Xt.update(this, this.width, this.height, t);
    const n = this.chartArea, a = n.width <= 0 || n.height <= 0;
    this._layers = [], wt(this.boxes, (o) => {
      a && o.position === "chartArea" || (o.configure && o.configure(), this._layers.push(...o._layers()));
    }, this), this._layers.forEach((o, s) => {
      o._idx = s;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(t) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: t,
      cancelable: !0
    }) !== !1) {
      for (let n = 0, a = this.data.datasets.length; n < a; ++n)
        this.getDatasetMeta(n).controller.configure();
      for (let n = 0, a = this.data.datasets.length; n < a; ++n)
        this._updateDataset(n, $e(t) ? t({
          datasetIndex: n
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, n) {
    const a = this.getDatasetMeta(t), o = {
      meta: a,
      index: t,
      mode: n,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", o) !== !1 && (a.controller._update(n), o.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", o));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (re.has(this) ? this.attached && !re.running(this) && re.start(this) : (this.draw(), Zs({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: a, height: o } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(a, o);
    }
    if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", {
      cancelable: !0
    }) === !1)
      return;
    const n = this._layers;
    for (t = 0; t < n.length && n[t].z <= 0; ++t)
      n[t].draw(this.chartArea);
    for (this._drawDatasets(); t < n.length; ++t)
      n[t].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(t) {
    const n = this._sortedMetasets, a = [];
    let o, s;
    for (o = 0, s = n.length; o < s; ++o) {
      const i = n[o];
      (!t || i.visible) && a.push(i);
    }
    return a;
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
    for (let n = t.length - 1; n >= 0; --n)
      this._drawDataset(t[n]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(t) {
    const n = this.ctx, a = {
      meta: t,
      index: t.index,
      cancelable: !0
    }, s = Yr(this, t);
    this.notifyPlugins("beforeDatasetDraw", a) !== !1 && (s && za(n, s), t.controller.draw(), s && Va(n), a.cancelable = !1, this.notifyPlugins("afterDatasetDraw", a));
  }
  isPointInArea(t) {
    return Sn(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, n, a, s) {
    const o = Mc.modes[n];
    return typeof o == "function" ? o(this, t, a, s) : [];
  }
  getDatasetMeta(t) {
    const n = this.data.datasets[t], a = this._metasets;
    let o = a.filter((s) => s && s._dataset === n).pop();
    return o || (o = {
      type: null,
      data: [],
      dataset: null,
      controller: null,
      hidden: null,
      xAxisID: null,
      yAxisID: null,
      order: n && n.order || 0,
      index: t,
      _dataset: n,
      _parsed: [],
      _sorted: !1
    }, a.push(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = Ke(null, {
      chart: this,
      type: "chart"
    }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(t) {
    const n = this.data.datasets[t];
    if (!n)
      return !1;
    const a = this.getDatasetMeta(t);
    return typeof a.hidden == "boolean" ? !a.hidden : !n.hidden;
  }
  setDatasetVisibility(t, n) {
    const a = this.getDatasetMeta(t);
    a.hidden = !n;
  }
  toggleDataVisibility(t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t];
  }
  getDataVisibility(t) {
    return !this._hiddenIndices[t];
  }
  _updateVisibility(t, n, a) {
    const o = a ? "show" : "hide", s = this.getDatasetMeta(t), i = s.controller._resolveAnimations(void 0, o);
    wn(n) ? (s.data[n].hidden = !a, this.update()) : (this.setDatasetVisibility(t, a), i.update(s, {
      visible: a
    }), this.update((l) => l.datasetIndex === t ? s : void 0));
  }
  hide(t, n) {
    this._updateVisibility(t, n, !1);
  }
  show(t, n) {
    this._updateVisibility(t, n, !0);
  }
  _destroyDatasetMeta(t) {
    const n = this._metasets[t];
    n && n.controller && n.controller._destroy(), delete this._metasets[t];
  }
  _stop() {
    let t, n;
    for (this.stop(), re.remove(this), t = 0, n = this.data.datasets.length; t < n; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: n } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Co(t, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete Kn[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, n = this.platform, a = (o, i) => {
      n.addEventListener(this, o, i), t[o] = i;
    }, s = (o, i, l) => {
      o.offsetX = i, o.offsetY = l, this._eventHandler(o);
    };
    wt(this.options.events, (s) => a(s, o));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, n = this.platform, a = (d, c) => {
      n.addEventListener(this, d, c), t[d] = c;
    }, o = (d, c) => {
      t[d] && (n.removeEventListener(this, d, c), delete t[d]);
    }, s = (d, c) => {
      this.canvas && this.resize(d, c);
    };
    let i;
    const l = () => {
      s("attach", l), this.attached = !0, this.resize(), a("resize", o), a("detach", i);
    };
    i = () => {
      this.attached = !1, s("resize", o), this._stop(), this._resize(0, 0), a("attach", l);
    }, n.isAttached(this.canvas) ? l() : i();
  }
  unbindEvents() {
    wt(this._listeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._listeners = {}, wt(this._responsiveListeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, n, a) {
    const s = a ? "set" : "remove";
    let o, i, l, d;
    for (n === "dataset" && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + s + "DatasetHoverStyle"]()), l = 0, d = t.length; l < d; ++l) {
      i = t[l];
      const c = i && this.getDatasetMeta(i.datasetIndex).controller;
      c && c[o + "HoverStyle"](i.element, i.datasetIndex, i.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const n = this._active || [], a = t.map(({ datasetIndex: o, index: i }) => {
      const l = this.getDatasetMeta(o);
      if (!l)
        throw new Error("No dataset found at index " + o);
      return {
        datasetIndex: o,
        element: l.data[i],
        index: i
      };
    });
    !Gn(a, n) && (this._active = a, this._lastEvent = null, this._updateHoverStyles(a, n));
  }
  notifyPlugins(t, n, a) {
    return this._plugins.notify(this, t, n, a);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((n) => n.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, n, a) {
    const s = this.options.hover, o = (d, c) => d.filter((u) => !c.some((h) => u.datasetIndex === h.datasetIndex && u.index === h.index)), i = o(n, t), l = a ? t : o(t, n);
    i.length && this.updateHoverStyle(i, s.mode, !1), l.length && s.mode && this.updateHoverStyle(l, s.mode, !0);
  }
  _eventHandler(t, n) {
    const a = {
      event: t,
      replay: n,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, o = (i) => (i.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", a, o) === !1)
      return;
    const s = this._handleEvent(t, n, a.inChartArea);
    return a.cancelable = !1, this.notifyPlugins("afterEvent", a, o), (s || a.changed) && this.render(), this;
  }
  _handleEvent(t, n, a) {
    const { _active: s = [], options: o } = this, i = n, l = this._getActiveElements(t, s, a, i), d = Ml(t), c = Ad(t, this._lastEvent, a, d);
    a && (this._lastEvent = null, $t(o.onHover, [
      t,
      l,
      this
    ], this), d && Dt(s.onClick, [
      t,
      l,
      this
    ], this));
    const u = !Yn(l, s);
    return (u || n) && (this._active = l, this._updateHoverStyles(l, s, n)), this._lastEvent = c, u;
  }
  _getActiveElements(t, n, a, o) {
    if (t.type === "mouseout")
      return [];
    if (!a)
      return n;
    const s = this.options.hover;
    return this.getElementsAtEventForMode(t, s.mode, s, o);
  }
};
function ss() {
  return wt(Te.instances, (e) => e._plugins.invalidate());
}
function Td(e, t, n) {
  const { startAngle: a, x: s, y: o, outerRadius: i, innerRadius: l, options: d } = t, { borderWidth: c, borderJoinStyle: u } = d, h = Math.min(c / i, Jt(a - n));
  if (e.beginPath(), e.arc(s, o, i - c / 2, a + h / 2, n - h / 2), l > 0) {
    const g = Math.min(c / l, Jt(a - n));
    e.arc(s, o, l + c / 2, n - g / 2, a + g / 2, !0);
  } else {
    const g = Math.min(c / 2, i * Jt(a - n));
    if (u === "round")
      e.arc(s, o, g, n - kt / 2, a + kt / 2, !0);
    else if (u === "bevel") {
      const y = 2 * g * g, f = -y * Math.cos(n + kt / 2) + s, m = -y * Math.sin(n + kt / 2) + o, v = y * Math.cos(a + kt / 2) + s, p = y * Math.sin(a + kt / 2) + o;
      e.lineTo(f, m), e.lineTo(v, p);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Bd(e, t, n) {
  const { startAngle: a, pixelMargin: s, x: o, y: i, outerRadius: l, innerRadius: d } = t;
  let c = s / l;
  e.beginPath(), e.arc(o, i, l, a - c, n + c), d > s ? (c = s / d, e.arc(o, i, d, n + c, a - c, !0)) : e.arc(o, i, s, n + Pt, a - Pt), e.closePath(), e.clip();
}
function Ld(e) {
  return Na(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Fd(e, t, n, a) {
  const s = Ld(e.options.borderRadius), o = (n - t) / 2, i = Math.min(o, a * t / 2), l = (d) => {
    const c = (n - Math.min(o, d)) * a / 2;
    return zt(d, 0, Math.min(o, c));
  };
  return {
    outerStart: l(s.outerStart),
    outerEnd: l(s.outerEnd),
    innerStart: zt(s.innerStart, 0, i),
    innerEnd: zt(s.innerEnd, 0, i)
  };
}
function Ue(e, t, n, a) {
  return {
    x: n + e * Math.cos(t),
    y: a + e * Math.sin(t)
  };
}
function Zn(e, t, n, a, s, o) {
  const { x: i, y: l, startAngle: d, pixelMargin: c, innerRadius: u } = t, h = Math.max(t.outerRadius + a + n - c, 0), g = u > 0 ? u + a + n + c : 0;
  let y = 0;
  const p = o - d;
  if (a) {
    const Y = u > 0 ? u - a : 0, N = h > 0 ? h - a : 0, tt = (Y + N) / 2, et = tt !== 0 ? f * tt / (tt + a) : f;
    y = (f - et) / 2;
  }
  const m = Math.max(1e-3, f * h - n / kt) / h, v = (f - m) / 2, p = d + v + y, b = s - v - y, { outerStart: x, outerEnd: w, innerStart: M, innerEnd: C } = Fd(t, g, h, b - p), $ = h - x, S = h - w, L = p + x / $, T = b - w / S, B = g + M, E = g + C, I = p + M / B, V = b - C / E;
  if (e.beginPath(), o) {
    const Y = (L + T) / 2;
    if (e.arc(i, l, h, L, Y), e.arc(i, l, h, Y, T), w > 0) {
      const rt = We(S, T, i, l);
      e.arc(rt.x, rt.y, w, T, b + Pt);
    }
    const N = We(E, b, i, l);
    if (e.lineTo(N.x, N.y), C > 0) {
      const rt = We(E, V, i, l);
      e.arc(rt.x, rt.y, C, b + Pt, V + Math.PI);
    }
    const tt = (b - C / g + (p + M / g)) / 2;
    if (e.arc(i, l, g, b - C / g, tt, !0), e.arc(i, l, g, tt, p + M / g, !0), M > 0) {
      const rt = We(B, I, i, l);
      e.arc(rt.x, rt.y, M, I + Math.PI, p - Pt);
    }
    const et = We($, p, i, l);
    if (e.lineTo(et.x, et.y), x > 0) {
      const rt = We($, L, i, l);
      e.arc(rt.x, rt.y, x, p - Pt, L);
    }
  } else {
    e.moveTo(i, l);
    const Y = Math.cos(L) * h + i, N = Math.sin(L) * h + l;
    e.lineTo(Y, N);
    const tt = Math.cos(T) * h + i, et = Math.sin(T) * h + l;
    e.lineTo(tt, et);
  }
  e.closePath();
}
function Ed(e, t, n, a, s) {
  const { fullCircles: o, startAngle: i, circumference: l } = t;
  let d = t.endAngle;
  if (s) {
    na(e, t, n, a, d, o);
    for (let c = 0; c < s; ++c)
      e.fill();
    isNaN(l) || (d = i + (l % At || At));
  }
  return na(e, t, n, a, d, o), e.fill(), d;
}
function Id(e, t, n, a, s) {
  const { fullCircles: o, startAngle: i, circumference: l, options: d } = t, { borderWidth: c, borderJoinStyle: u, borderDash: h, borderDashOffset: g, borderRadius: y } = d, f = d.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(h || []), e.lineDashOffset = g, f ? (e.lineWidth = c * 2, e.lineJoin = u || "round") : (e.lineWidth = c, e.lineJoin = u || "bevel");
  let m = t.endAngle;
  if (o) {
    Zn(e, t, n, a, m, s);
    for (let v = 0; v < o; ++v)
      e.stroke();
    isNaN(l) || (m = i + (l % At || At));
  }
  f && Bd(e, t, m), d.selfJoin && m - i >= kt && y === 0 && u !== "miter" && Td(e, t, m), o || (Zn(e, t, n, a, m, s), e.stroke());
}
class Pd extends fe {
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
  inRange(t, n, a) {
    const o = this.getProps([
      "x",
      "y"
    ], a), { angle: s, distance: i } = Gs(o, {
      x: t,
      y: n
    }), { startAngle: l, endAngle: d, innerRadius: c, outerRadius: u, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], a), g = (this.options.spacing + this.options.borderWidth) / 2, y = ht(h, d - l), f = xn(o, l, d) && l !== d, m = y >= At || f, v = xe(i, c + g, u + g);
    return m && v;
  }
  getCenterPoint(t) {
    const { x: n, y: a, startAngle: s, endAngle: o, innerRadius: i, outerRadius: l } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: d, spacing: c } = this.options, u = (s + o) / 2, h = (i + l + c + d) / 2;
    return {
      x: n + Math.cos(u) * h,
      y: a + Math.sin(u) * h
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: n, circumference: a } = this, o = (n.offset || 0) / 4, s = (n.spacing || 0) / 2, i = n.circular;
    if (this.pixelMargin = n.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = a > Lt ? Math.floor(a / Lt) : 0, a === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const l = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(l) * s, Math.sin(l) * s);
    const d = 1 - Math.sin(Math.min(kt, a || 0)), c = s * d;
    t.fillStyle = n.backgroundColor, t.strokeStyle = n.borderColor, Ed(t, this, c, o, i), Id(t, this, c, o, i), t.restore();
  }
}
function pi(e, t, n = t) {
  e.lineCap = ht(n.borderCapStyle, t.borderCapStyle), e.setLineDash(ht(n.borderDash, t.borderDash)), e.lineDashOffset = ht(n.borderDashOffset, t.borderDashOffset), e.lineJoin = ht(n.borderJoinStyle, t.borderJoinStyle), e.lineWidth = ht(n.borderWidth, t.borderWidth), e.strokeStyle = ht(n.borderColor, t.borderColor);
}
function Rd(e, t, n) {
  e.lineTo(n.x, n.y);
}
function Od(e) {
  return e.stepped ? Jl : e.tension || e.cubicInterpolationMode === "monotone" ? tr : Rd;
}
function mi(e, t, n = {}) {
  const a = e.length, { start: s = 0, end: o = a - 1 } = n, { start: i, end: l } = t, d = Math.max(s, i), c = Math.min(o, l), u = s < i && o < i || s > l && o > l;
  return {
    count: a,
    start: d,
    loop: t.loop,
    ilen: c < d && !u ? a + c - d : c - d
  };
}
function zd(e, t, n, a) {
  const { points: s, options: o } = t, { count: i, start: l, loop: d, ilen: c } = mi(s, n, a), u = Od(o);
  let { move: h = !0, reverse: g } = a || {}, y, f, m;
  for (y = 0; y <= c; ++y)
    f = s[(l + (g ? c - y : y)) % i], !f.skip && (h ? (e.moveTo(f.x, f.y), h = !1) : u(e, m, f, g, o.stepped), m = f);
  return d && (f = s[(l + (g ? c : 0)) % i], u(e, m, f, g, o.stepped)), !!d;
}
function Vd(e, t, n, a) {
  const s = t.points, { count: o, start: i, ilen: l } = mi(s, n, a), { move: d = !0, reverse: c } = a || {};
  let u = 0, h = 0, g, y, f, m, v, p;
  const b = (w) => (i + (c ? l - w : w)) % o, x = () => {
    m !== v && (e.lineTo(u, v), e.lineTo(u, m), e.lineTo(u, p));
  };
  for (d && (y = s[b(0)], e.moveTo(y.x, y.y)), g = 0; g <= l; ++g) {
    if (y = s[b(g)], y.skip)
      continue;
    const w = y.x, M = y.y, C = w | 0;
    C === f ? (M < m ? m = M : M > v && (v = M), u = (h * u + w) / ++h) : (x(), e.lineTo(w, M), f = C, h = 0, m = v = M), p = M;
  }
  k();
}
function Ea(e) {
  const t = e.options, n = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !n ? Vd : zd;
}
function Nd(e) {
  return e.stepped ? Lr : e.tension || e.cubicInterpolationMode === "monotone" ? Fr : Ee;
}
function Wd(e, t, n, a) {
  let s = t._path;
  s || (s = t._path = new Path2D(), t.path(s, n, a) && s.closePath()), pi(e, t.options), e.stroke(s);
}
function Hd(e, t, n, a) {
  const { segments: s, options: o } = t, i = Da(t);
  for (const l of s)
    pi(e, o, l.style), e.beginPath(), i(e, t, l, {
      start: n,
      end: n + a - 1
    }) && e.closePath(), e.stroke();
}
const jd = typeof Path2D == "function";
function Yd(e, t, n, a) {
  jd && !t.options.segment ? Wd(e, t, n, a) : Hd(e, t, n, a);
}
class Kd extends fe {
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
  updateControlPoints(t, n) {
    const a = this.options;
    if ((a.tension || a.cubicInterpolationMode === "monotone") && !a.stepped && !this._pointsUpdated) {
      const s = a.spanGaps ? this._loop : this._fullLoop;
      Cr(this._points, a, t, s, n), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Nr(this, this.options.segment));
  }
  first() {
    const t = this.segments, n = this.points;
    return t.length && n[t[0].start];
  }
  last() {
    const t = this.segments, n = this.points, a = t.length;
    return a && n[t[a - 1].end];
  }
  interpolate(t, n) {
    const a = this.options, s = t[n], o = this.points, i = Or(this, {
      property: n,
      start: o,
      end: o
    });
    if (!i.length)
      return;
    const l = [], d = Nd(a);
    let c, u;
    for (c = 0, u = i.length; c < u; ++c) {
      const { start: h, end: g } = i[c], y = o[h], f = o[g];
      if (y === f) {
        l.push(y);
        continue;
      }
      const m = Math.abs((s - y[n]) / (f[n] - y[n])), v = d(y, f, m, a.stepped);
      v[n] = t[n], l.push(v);
    }
    return l.length === 1 ? l[0] : l;
  }
  pathSegment(t, n, a) {
    return Ea(this)(t, this, n, a);
  }
  path(t, n, a) {
    const o = this.segments, s = Ea(this);
    let i = this._loop;
    n = n || 0, a = a || this.points.length - n;
    for (const l of s)
      i &= o(t, this, l, {
        start: n,
        end: n + a - 1
      });
    return !!i;
  }
  draw(t, n, a, s) {
    const o = this.options || {};
    (this.points || []).length && o.borderWidth && (t.save(), Yd(t, this, a, s), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function is(e, t, n, a) {
  const o = e.options, { [n]: s } = e.getProps([
    n
  ], a);
  return Math.abs(t - s) < o.radius + o.hitRadius;
}
class ou extends ve {
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
  inRange(t, n, a) {
    const o = this.options, { x: s, y: i } = this.getProps([
      "x",
      "y"
    ], a);
    return Math.pow(t - s, 2) + Math.pow(n - i, 2) < Math.pow(o.hitRadius + o.radius, 2);
  }
  inXRange(t, n) {
    return is(this, t, "x", n);
  }
  inYRange(t, n) {
    return is(this, t, "y", n);
  }
  getCenterPoint(t) {
    const { x: n, y: a } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: n,
      y: a
    };
  }
  size(t) {
    t = t || this.options || {};
    let n = t.radius || 0;
    n = Math.max(n, n && t.hoverRadius || 0);
    const a = n && t.borderWidth || 0;
    return (n + a) * 2;
  }
  draw(t, n) {
    const a = this.options;
    this.skip || a.radius < 0.1 || !Sn(this, n, this.size(a) / 2) || (t.strokeStyle = a.borderColor, t.lineWidth = a.borderWidth, t.fillStyle = a.backgroundColor, Ba(t, a, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function Si(e, t) {
  const { x: n, y: a, base: o, width: s, height: i } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let l, d, c, u, h;
  return e.horizontal ? (h = i / 2, l = Math.min(n, s), d = Math.max(n, s), c = a - h, u = a + h) : (h = o / 2, l = n - h, d = n + h, c = Math.min(a, s), u = Math.max(a, s)), {
    left: l,
    top: c,
    right: d,
    bottom: u
  };
}
function we(e, t, n, a) {
  return e ? 0 : zt(t, n, a);
}
function Ud(e, t, n) {
  const a = e.options.borderWidth, s = e.borderSkipped, o = Uo(a);
  return {
    t: we(s.top, o.top, 0, n),
    r: we(s.right, o.right, 0, t),
    b: we(s.bottom, o.bottom, 0, n),
    l: we(s.left, o.left, 0, t)
  };
}
function Xd(e, t, n) {
  const { enableBorderRadius: a } = e.getProps([
    "enableBorderRadius"
  ]), s = e.options.borderRadius, o = Ye(s), i = Math.min(t, n), l = e.borderSkipped, d = a || vt(s);
  return {
    topLeft: we(!d || l.top || l.left, o.topLeft, 0, i),
    topRight: we(!d || l.top || l.right, o.topRight, 0, i),
    bottomLeft: we(!d || l.bottom || l.left, o.bottomLeft, 0, i),
    bottomRight: we(!d || l.bottom || l.right, o.bottomRight, 0, i)
  };
}
function Gd(e) {
  const t = bi(e), n = t.right - t.left, a = t.bottom - t.top, s = Ud(e, n / 2, a / 2), o = Xd(e, n / 2, a / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: n,
      h: a,
      radius: s
    },
    inner: {
      x: t.left + o.l,
      y: t.top + o.t,
      w: n - o.l - o.r,
      h: a - o.t - o.b,
      radius: {
        topLeft: Math.max(0, s.topLeft - Math.max(o.t, o.l)),
        topRight: Math.max(0, s.topRight - Math.max(o.t, o.r)),
        bottomLeft: Math.max(0, s.bottomLeft - Math.max(o.b, o.l)),
        bottomRight: Math.max(0, s.bottomRight - Math.max(o.b, o.r))
      }
    }
  };
}
function pa(e, t, n, a) {
  const s = t === null, o = n === null, l = e && !(s && o) && bi(e, a);
  return l && (s || xe(t, l.left, l.right)) && (o || xe(n, l.top, l.bottom));
}
function Zd(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function Qd(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function _a(e, t, n = {}) {
  const a = e.x !== n.x ? -t : 0, o = e.y !== n.y ? -t : 0, s = (e.x + e.w !== n.x + n.w ? t : 0) - a, i = (e.y + e.h !== n.y + n.h ? t : 0) - o;
  return {
    x: e.x + a,
    y: e.y + o,
    w: e.w + s,
    h: e.h + i,
    radius: e.radius
  };
}
class Jd extends fe {
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
    const { inflateAmount: n, options: { borderColor: a, backgroundColor: s } } = this, { inner: o, outer: i } = Gd(this), l = Zd(i.radius) ? Un : Qd;
    t.save(), (i.w !== o.w || i.h !== o.h) && (t.beginPath(), l(t, ma(i, n, o)), t.clip(), l(t, ma(o, -n, i)), t.fillStyle = a, t.fill("evenodd")), t.beginPath(), l(t, ma(o, n)), t.fillStyle = s, t.fill(), t.restore();
  }
  inRange(t, n, a) {
    return ya(this, t, n, a);
  }
  inXRange(t, n) {
    return ya(this, t, null, n);
  }
  inYRange(t, n) {
    return ya(this, null, t, n);
  }
  getCenterPoint(t) {
    const { x: n, y: a, base: o, horizontal: s } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], t);
    return {
      x: s ? (n + o) / 2 : n,
      y: s ? a : (a + o) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
const ls = (e, t) => {
  let { boxHeight: n = t, boxWidth: a = t } = e;
  return e.usePointStyle && (n = Math.min(n, t), a = e.pointStyleWidth || Math.min(a, t)), {
    boxWidth: a,
    boxHeight: n,
    itemHeight: Math.max(t, n)
  };
}, tu = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class no extends fe {
  constructor(t) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, n, a) {
    this.maxWidth = t, this.maxHeight = n, this._margins = a, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const t = this.options.labels || {};
    let n = Dt(t.generateLabels, [
      this.chart
    ], this) || [];
    t.filter && (n = n.filter((a) => t.filter(a, this.chart.data))), t.sort && (n = n.sort((a, o) => t.sort(a, o, this.chart.data))), this.options.reverse && n.reverse(), this.legendItems = n;
  }
  fit() {
    const { options: t, ctx: n } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const a = t.labels, s = Vt(a.font), o = s.size, i = this._computeTitleHeight(), { boxWidth: l, itemHeight: d } = eo(a, o);
    let c, u;
    n.font = s.string, this.isHorizontal() ? (c = this.maxWidth, u = this._fitRows(i, o, l, d) + 10) : (u = this.maxHeight, c = this._fitCols(i, s, l, d) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(u, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, n, a, s) {
    const { ctx: o, maxWidth: i, options: { labels: { padding: l } } } = this, d = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], u = s + l;
    let h = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let g = -1, y = -u;
    return this.legendItems.forEach((f, m) => {
      const v = a + n / 2 + o.measureText(f.text).width;
      (m === 0 || c[c.length - 1] + v + 2 * l > i) && (h += u, c[c.length - (m > 0 ? 0 : 1)] = 0, y += u, g++), d[m] = {
        left: 0,
        top: y,
        row: g,
        width: v,
        height: s
      }, c[c.length - 1] += v + l;
    }), h;
  }
  _fitCols(t, n, a, s) {
    const { ctx: o, maxHeight: i, options: { labels: { padding: l } } } = this, d = this.legendHitBoxes = [], c = this.columnSizes = [], u = i - t;
    let h = l, g = 0, y = 0, f = 0, m = 0;
    return this.legendItems.forEach((v, p) => {
      const { itemWidth: b, itemHeight: x } = eu(a, n, o, v, s);
      p > 0 && y + x + 2 * l > u && (h += g + l, c.push({
        width: g,
        height: y
      }), f += g + l, m++, g = y = 0), d[p] = {
        left: f,
        top: y,
        col: m,
        width: b,
        height: x
      }, g = Math.max(g, b), y += x + l;
    }), h += g, c.push({
      width: g,
      height: y
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: n, options: { align: a, labels: { padding: s }, rtl: o } } = this, i = Ke(o, this.left, this.width);
    if (this.isHorizontal()) {
      let l = 0, d = Ot(a, this.left + s, this.right - this.lineWidths[l]);
      for (const c of n)
        l !== c.row && (l = c.row, d = Ot(a, this.left + s, this.right - this.lineWidths[l])), c.top += this.top + t + s, c.left = i.leftForLtr(i.x(d), c.width), d += c.width + s;
    } else {
      let l = 0, d = Ot(a, this.top + t + s, this.bottom - this.columnSizes[l].height);
      for (const c of n)
        c.col !== l && (l = c.col, d = Ot(a, this.top + t + s, this.bottom - this.columnSizes[l].height)), c.top = d, c.left += this.left + s, c.left = i.leftForLtr(i.x(c.left), c.width), d += c.height + s;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      Ya(t, this), this._draw(), Ka(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: n, lineWidths: a, ctx: s } = this, { align: o, labels: i } = t, l = Tt.color, d = Ke(t.rtl, this.left, this.width), c = Vt(i.font), { padding: u } = i, h = c.size, g = h / 2;
    let y;
    this.drawTitle(), s.textAlign = d.textAlign("left"), s.textBaseline = "middle", s.lineWidth = 0.5, s.font = c.string;
    const { boxWidth: f, boxHeight: m, itemHeight: v } = eo(i, h), p = function(C, $, S) {
      if (isNaN(f) || f <= 0 || isNaN(m) || m < 0)
        return;
      s.save();
      const L = ht(S.lineWidth, 1);
      if (s.fillStyle = ht(S.fillStyle, l), s.lineCap = ht(S.lineCap, "butt"), s.lineDashOffset = ht(S.lineDashOffset, 0), s.lineJoin = ht(S.lineJoin, "miter"), s.lineWidth = L, s.strokeStyle = ht(S.strokeStyle, l), s.setLineDash(ht(S.lineDash, [])), i.usePointStyle) {
        const T = {
          radius: m * Math.SQRT2 / 2,
          pointStyle: S.pointStyle,
          rotation: S.rotation,
          borderWidth: L
        }, B = d.xPlus(C, f / 2), E = $ + g;
        qo(s, T, B, E, i.pointStyleWidth && f);
      } else {
        const T = $ + Math.max((h - m) / 2, 0), B = d.leftForLtr(C, f), E = Ye(S.borderRadius);
        s.beginPath(), Object.values(E).some((I) => I !== 0) ? Un(s, {
          x: B,
          y: T,
          w: f,
          h: m,
          radius: E
        }) : s.rect(B, T, f, m), s.fill(), L !== 0 && s.stroke();
      }
      o.restore();
    }, f = function(C, $, S) {
      Mn(o, S.text, C, $ + v / 2, c, {
        strikethrough: S.hidden,
        textAlign: d.textAlign(S.textAlign)
      });
    }, k = this.isHorizontal(), x = this._computeTitleHeight();
    k ? y = {
      x: jt(s, this.left + u, this.right - a[0]),
      y: this.top + u + x,
      line: 0
    } : y = {
      x: this.left + u,
      y: jt(s, this.top + x + u, this.bottom - n[0].height),
      line: 0
    }, ti(this.ctx, t.textDirection);
    const M = v + u;
    this.legendItems.forEach((C, $) => {
      s.strokeStyle = C.fontColor, s.fillStyle = C.fontColor;
      const S = s.measureText(C.text).width, L = d.textAlign(C.textAlign || (C.textAlign = i.textAlign)), T = f + g + S;
      let B = y.x, E = y.y;
      d.setWidth(this.width), x ? $ > 0 && B + T + u > this.right && (E = y.y += M, y.line++, B = y.x = Ot(o, this.left + u, this.right - a[y.line])) : $ > 0 && E + M > this.bottom && (B = y.x = B + n[y.line].width + u, y.line++, E = y.y = Ot(o, this.top + w + u, this.bottom - n[y.line].height));
      const I = d.x(B);
      if (p(I, E, C), B = Vl(L, B + f + g, x ? B + T : this.right, t.rtl), b(d.x(B), E, C), x)
        y.x += T + u;
      else if (typeof C.text != "string") {
        const V = c.lineHeight;
        y.y += vi(C, V) + u;
      } else
        y.y += M;
    }), ei(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, n = t.title, a = Yt(n.font), o = ae(n.padding);
    if (!n.display)
      return;
    const o = Ke(t.rtl, this.left, this.width), i = this.ctx, l = n.position, d = a.size / 2, c = s.top + d;
    let u, h = this.left, g = this.width;
    if (this.isHorizontal())
      g = Math.max(...this.lineWidths), u = this.top + c, h = Ot(t.align, h, this.right - g);
    else {
      const p = this.columnSizes.reduce((b, v) => Math.max(b, v.height), 0);
      u = c + jt(t.align, this.top, this.bottom - p - t.labels.padding - this._computeTitleHeight());
    }
    const y = Ot(l, h, h + g);
    i.textAlign = o.textAlign(Pa(l)), i.textBaseline = "middle", i.strokeStyle = n.color, i.fillStyle = n.color, i.font = a.string, wn(i, n.text, y, u, a);
  }
  _computeTitleHeight() {
    const t = this.options.title, n = Yt(t.font), a = ae(t.padding);
    return t.display ? n.lineHeight + a.height : 0;
  }
  _getLegendItemAt(t, n) {
    let a, s, o;
    if (xe(t, this.left, this.right) && xe(n, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, a = 0; a < o.length; ++a)
        if (s = o[a], xe(t, s.left, s.left + s.width) && xe(n, s.top, s.top + s.height))
          return this.legendItems[a];
    }
    return null;
  }
  handleEvent(t) {
    const n = this.options;
    if (!su(t.type, n))
      return;
    const a = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const s = this._hoveredItem, o = tu(s, a);
      s && !o && $t(n.onLeave, [
        t,
        o,
        this
      ], this), this._hoveredItem = a, a && !s && Dt(n.onHover, [
        t,
        a,
        this
      ], this);
    } else a && Dt(n.onClick, [
      t,
      a,
      this
    ], this);
  }
}
function eu(e, t, n, a, s) {
  const o = nu(a, e, t, n), i = au(s, a, t.lineHeight);
  return {
    itemWidth: s,
    itemHeight: i
  };
}
function nu(e, t, n, a) {
  let s = e.text;
  return s && typeof s != "string" && (s = s.reduce((o, i) => o.length > i.length ? o : i)), t + n.size / 2 + a.measureText(s).width;
}
function au(e, t, n) {
  let a = e;
  return typeof t.text != "string" && (a = Mi(t, n)), a;
}
function Mi(e, t) {
  const n = e.text ? e.text.length : 0;
  return t * n;
}
function su(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var to = {
  id: "legend",
  _element: rs,
  start(e, t, n) {
    const a = e.legend = new rs({
      ctx: e.ctx,
      options: n,
      chart: e
    });
    Xt.configure(e, a, n), Xt.addBox(e, a);
  },
  stop(e) {
    Xt.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, n) {
    const a = e.legend;
    Xt.configure(e, a, n), a.options = n;
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
    onClick(e, t, n) {
      const a = t.datasetIndex, o = n.chart;
      o.isDatasetVisible(a) ? (o.hide(a), t.hidden = !0) : (o.show(a), t.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (e) => e.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(e) {
        const t = e.data.datasets, { labels: { usePointStyle: n, pointStyle: a, textAlign: s, color: o, useBorderRadius: i, borderRadius: l } } = e.legend.options;
        return e._getSortedDatasetMetas().map((d) => {
          const c = d.controller.getStyle(n ? 0 : void 0), u = ae(c.borderWidth);
          return {
            text: t[d.index].label,
            fillStyle: c.backgroundColor,
            fontColor: s,
            hidden: !d.visible,
            lineCap: c.borderCapStyle,
            lineDash: c.borderDash,
            lineDashOffset: c.borderDashOffset,
            lineJoin: c.borderJoinStyle,
            lineWidth: (u.width + u.height) / 4,
            strokeStyle: c.borderColor,
            pointStyle: a || c.pointStyle,
            rotation: c.rotation,
            textAlign: s || c.textAlign,
            borderRadius: i && (l || c.borderRadius),
            datasetIndex: d.index
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
class Di extends ve {
  constructor(t) {
    super(), this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, n) {
    const a = this.options;
    if (this.left = 0, this.top = 0, !a.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = t, this.height = this.bottom = n;
    const s = It(a.text) ? a.text.length : 1;
    this._padding = Zt(a.padding);
    const o = s * Vt(a.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = o : this.width = o;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: n, left: a, bottom: s, right: o, options: i } = this, l = i.align;
    let d = 0, c, u, h;
    return this.isHorizontal() ? (u = Ot(l, a, o), h = n + t, c = o - a) : (i.position === "left" ? (u = a + t, h = Ot(l, s, n), d = kt * -0.5) : (u = o - t, h = Ot(l, n, s), d = kt * 0.5), c = s - n), {
      titleX: u,
      titleY: h,
      maxWidth: c,
      rotation: d
    };
  }
  draw() {
    const t = this.ctx, n = this.options;
    if (!n.display)
      return;
    const a = Vt(n.font), o = a.lineHeight / 2 + this._padding.top, { titleX: i, titleY: l, maxWidth: d, rotation: c } = this._drawArgs(o);
    wn(t, n.text, 0, 0, a, {
      color: n.color,
      maxWidth: d,
      rotation: c,
      textAlign: Wa(n.align),
      textBaseline: "middle",
      translation: [
        i,
        l
      ]
    });
  }
}
function ou(e, t) {
  const n = new yi({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  Xt.configure(e, n, t), Xt.addBox(e, n), e.titleBlock = n;
}
var Ai = {
  id: "title",
  _element: Di,
  start(e, t, n) {
    ou(e, n);
  },
  stop(e) {
    const t = e.titleBlock;
    Xt.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, n) {
    const a = e.titleBlock;
    Xt.configure(e, a, n), a.options = n;
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
const gn = {
  average(e) {
    if (!e.length)
      return !1;
    let t, n, a = /* @__PURE__ */ new Set(), o = 0, s = 0;
    for (t = 0, n = e.length; t < n; ++t) {
      const l = e[t].element;
      if (l && l.hasValue()) {
        const d = l.tooltipPosition();
        a.add(d.x), s += d.y, ++o;
      }
    }
    return s === 0 || a.size === 0 ? !1 : {
      x: [
        ...a
      ].reduce((l, d) => l + d) / a.size,
      y: s / o
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let n = t.x, a = t.y, s = Number.POSITIVE_INFINITY, o, i, l;
    for (o = 0, i = e.length; o < i; ++o) {
      const d = e[o].element;
      if (d && d.hasValue()) {
        const c = d.getCenterPoint(), u = wa(t, c);
        u < s && (s = u, l = d);
      }
    }
    if (l) {
      const d = l.tooltipPosition();
      n = d.x, a = d.y;
    }
    return {
      x: n,
      y: a
    };
  }
};
function ae(e, t) {
  return t && (It(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function ge(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function iu(e, t) {
  const { element: n, datasetIndex: a, index: s } = t, o = e.getDatasetMeta(a).controller, { label: i, value: l } = o.getLabelAndValue(s);
  return {
    chart: e,
    label: i,
    parsed: o.getParsed(s),
    raw: e.data.datasets[a].data[s],
    formattedValue: l,
    dataset: o.getDataset(),
    dataIndex: s,
    datasetIndex: a,
    element: n
  };
}
function ao(e, t) {
  const n = e.chart.ctx, { body: a, footer: s, title: o } = e, { boxWidth: i, boxHeight: l } = t, d = Vt(t.bodyFont), c = Vt(t.titleFont), u = Vt(t.footerFont), h = o.length, g = s.length, y = a.length, f = Zt(t.padding);
  let m = f.height, v = 0, p = a.reduce((w, M) => w + M.before.length + M.lines.length + M.after.length, 0);
  if (p += e.beforeBody.length + e.afterBody.length, h && (m += h * c.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), p) {
    const w = t.displayColors ? Math.max(l, d.lineHeight) : d.lineHeight;
    m += y * w + (p - y) * d.lineHeight + (p - 1) * t.bodySpacing;
  }
  g && (m += t.footerMarginTop + g * u.lineHeight + (g - 1) * t.footerSpacing);
  let b = 0;
  const x = function(w) {
    v = Math.max(v, n.measureText(w).width + b);
  };
  return n.save(), n.font = c.string, wt(e.title, k), n.font = d.string, wt(e.beforeBody.concat(e.afterBody), k), f = t.displayColors ? i + 2 + t.boxPadding : 0, wt(a, (x) => {
    wt(x.before, k), wt(x.lines, k), wt(x.after, k);
  }), f = 0, n.font = u.string, wt(e.footer, k), n.restore(), v += p.width, {
    width: v,
    height: b
  };
}
function lu(e, t) {
  const { y: n, height: a } = t;
  return n < a / 2 ? "top" : n > e.height - a / 2 ? "bottom" : "center";
}
function yu(e, t, n, a) {
  const { x: o, width: s } = a, i = n.caretSize + n.caretPadding;
  if (e === "left" && o + s + i > t.width || e === "right" && o - s - i < 0)
    return !0;
}
function cu(e, t, n, a) {
  const { x: s, width: o } = n, { width: i, chartArea: { left: l, right: d } } = e;
  let c = "center";
  return a === "center" ? c = s <= (l + d) / 2 ? "left" : "right" : s <= o / 2 ? c = "left" : s >= i - o / 2 && (c = "right"), ru(c, e, t, n) && (c = "center"), c;
}
function so(e, t, n) {
  const a = n.yAlign || t.yAlign || lu(e, n);
  return {
    xAlign: n.xAlign || t.xAlign || cu(e, t, n, a),
    yAlign: a
  };
}
function du(e, t) {
  let { x: n, width: a } = e;
  return t === "right" ? n -= a : t === "center" && (n -= a / 2), n;
}
function uu(e, t, n) {
  let { y: a, height: s } = e;
  return t === "top" ? a += n : t === "bottom" ? a -= s + n : a -= s / 2, a;
}
function oo(e, t, n, a) {
  const { caretSize: s, caretPadding: o, cornerRadius: i } = e, { xAlign: l, yAlign: d } = n, c = s + o, { topLeft: u, topRight: h, bottomLeft: g, bottomRight: y } = Ye(i);
  let f = du(t, l);
  const m = uu(t, d, c);
  return d === "center" ? l === "left" ? f += c : l === "right" && (f -= c) : l === "left" ? f -= Math.max(u, g) + s : l === "right" && (f += Math.max(h, y) + s), {
    x: zt(f, 0, a.width - t.width),
    y: zt(m, 0, a.height - t.height)
  };
}
function Nn(e, t, n) {
  const a = ae(n.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - a.right : e.x + a.left;
}
function hs(e) {
  return re([], ge(e));
}
function hu(e, t, n) {
  return Ve(e, {
    tooltip: t,
    tooltipItems: n,
    type: "tooltip"
  });
}
function lo(e, t) {
  const n = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return n ? e.override(n) : e;
}
const xi = {
  beforeTitle: le,
  title(e) {
    if (e.length > 0) {
      const t = e[0], n = t.chart.data.labels, a = n ? n.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return t.dataset.label || "";
      if (t.label)
        return t.label;
      if (a > 0 && t.dataIndex < a)
        return n[t.dataIndex];
    }
    return "";
  },
  afterTitle: le,
  beforeBody: le,
  beforeLabel: le,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const n = e.formattedValue;
    return kt(n) || (t += n), t;
  },
  labelColor(e) {
    const n = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
    return {
      borderColor: n.borderColor,
      backgroundColor: n.backgroundColor,
      borderWidth: n.borderWidth,
      borderDash: n.borderDash,
      borderDashOffset: n.borderDashOffset,
      borderRadius: 0
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(e) {
    const n = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
    return {
      pointStyle: n.pointStyle,
      rotation: n.rotation
    };
  },
  afterLabel: le,
  afterBody: le,
  beforeFooter: le,
  footer: le,
  afterFooter: le
};
function Ut(e, t, n, a) {
  const o = e[t].call(n, a);
  return typeof o > "u" ? Ti[t].call(n, a) : o;
}
class ro extends fe {
  static positioners = dn;
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
    const n = this.chart, a = this.options.setContext(this.getContext()), o = a.enabled && n.options.animation && a.animations, s = new hi(this.chart, o);
    return o._cacheable && (this._cachedAnimations = Object.freeze(s)), s;
  }
  getContext() {
    return this.$context || (this.$context = hu(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, n) {
    const { callbacks: a } = n, s = Ht(a, "beforeTitle", this, t), o = Ht(a, "title", this, t), i = Ht(a, "afterTitle", this, t);
    let l = [];
    return l = ae(l, ce(s)), l = ae(l, ce(o)), l = ae(l, ce(i)), l;
  }
  getBeforeBody(t, n) {
    return hs(Ut(n.callbacks, "beforeBody", this, t));
  }
  getBody(t, n) {
    const { callbacks: a } = n, o = [];
    return wt(t, (s) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, l = lo(a, o);
      ae(i.before, ce(Ht(l, "beforeLabel", this, o))), ae(i.lines, Ht(l, "label", this, o)), ae(i.after, ce(Ht(l, "afterLabel", this, o))), s.push(i);
    }), s;
  }
  getAfterBody(t, n) {
    return hs(Ut(n.callbacks, "afterBody", this, t));
  }
  getFooter(t, n) {
    const { callbacks: a } = n, s = Ht(a, "beforeFooter", this, t), o = Ht(a, "footer", this, t), i = Ht(a, "afterFooter", this, t);
    let l = [];
    return l = ae(l, ce(s)), l = ae(l, ce(o)), l = ae(l, ce(i)), l;
  }
  _createItems(t) {
    const n = this._active, a = this.chart.data, s = [], o = [], i = [];
    let l = [], d, c;
    for (d = 0, c = n.length; d < c; ++d)
      l.push(iu(this.chart, n[d]));
    return t.filter && (l = l.filter((u, h, g) => t.filter(u, h, g, a))), t.itemSort && (l = l.sort((u, h) => t.itemSort(u, h, a))), xt(l, (u) => {
      const h = lo(t.callbacks, u);
      s.push(Ht(h, "labelColor", this, u)), o.push(Ht(h, "labelPointStyle", this, u)), i.push(Ht(h, "labelTextColor", this, u));
    }), this.labelColors = s, this.labelPointStyles = o, this.labelTextColors = i, this.dataPoints = l, l;
  }
  update(t, n) {
    const a = this.options.setContext(this.getContext()), o = this._active;
    let s, i = [];
    if (!o.length)
      this.opacity !== 0 && (s = {
        opacity: 0
      });
    else {
      const l = dn[a.position].call(this, s, this._eventPosition);
      i = this._createItems(a), this.title = this.getTitle(i, a), this.beforeBody = this.getBeforeBody(i, a), this.body = this.getBody(i, a), this.afterBody = this.getAfterBody(i, a), this.footer = this.getFooter(i, a);
      const d = this._size = ao(this, a), c = Object.assign({}, l, d), u = so(this.chart, a, c), h = oo(a, c, u, this.chart);
      this.xAlign = u.xAlign, this.yAlign = u.yAlign, o = {
        opacity: 1,
        x: h.x,
        y: h.y,
        width: d.width,
        height: d.height,
        caretX: l.x,
        caretY: l.y
      };
    }
    this._tooltipItems = i, this.$context = void 0, s && this._resolveAnimations().update(this, s), t && a.external && a.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: n
    });
  }
  drawCaret(t, n, a, o) {
    const s = this.getCaretPosition(t, a, o);
    n.lineTo(s.x1, s.y1), n.lineTo(s.x2, s.y2), n.lineTo(s.x3, s.y3);
  }
  getCaretPosition(t, n, a) {
    const { xAlign: s, yAlign: o } = this, { caretSize: i, cornerRadius: l } = a, { topLeft: d, topRight: c, bottomLeft: u, bottomRight: h } = Ye(l), { x: g, y } = t, { width: f, height: m } = n;
    let v, p, b, x, w, M;
    return o === "center" ? (w = y + m / 2, s === "left" ? (v = g, p = v - i, x = w + i, M = w - i) : (v = g + f, p = v + i, x = w - i, M = w + i), b = v) : (s === "left" ? p = g + Math.max(d, u) + i : s === "right" ? p = g + f - Math.max(c, h) - i : p = this.caretX, o === "top" ? (x = y, w = x - i, v = p - i, b = p + i) : (x = y + m, w = x + i, v = p + i, b = p - i), M = x), {
      x1: v,
      x2: p,
      x3: b,
      y1: x,
      y2: w,
      y3: M
    };
  }
  drawTitle(t, n, a) {
    const s = this.title, o = s.length;
    let i, l, d;
    if (o) {
      const c = Ke(a.rtl, this.x, this.width);
      for (t.x = Rn(this, a.titleAlign, a), n.textAlign = c.textAlign(a.titleAlign), n.textBaseline = "middle", i = Vt(a.titleFont), l = a.titleSpacing, n.fillStyle = a.titleColor, n.font = i.string, d = 0; d < o; ++d)
        n.fillText(s[d], c.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + l, d + 1 === o && (t.y += a.titleMarginBottom - l);
    }
  }
  _drawColorBox(t, n, a, s, o) {
    const i = this.labelColors[a], l = this.labelPointStyles[a], { boxHeight: d, boxWidth: c } = o, u = Vt(o.bodyFont), h = Rn(this, "left", o), g = s.x(h), y = d < u.lineHeight ? (u.lineHeight - d) / 2 : 0, f = n.y + y;
    if (o.usePointStyle) {
      const m = {
        radius: Math.min(c, d) / 2,
        pointStyle: l.pointStyle,
        rotation: l.rotation,
        borderWidth: 1
      }, v = s.leftForLtr(g, c) + c / 2, p = f + d / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, $a(t, m, v, p), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, $a(t, m, v, p);
    } else {
      t.lineWidth = vt(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const m = s.leftForLtr(g, c), v = s.leftForLtr(s.xPlus(g, 1), c - 2), p = Ye(i.borderRadius);
      Object.values(p).some((b) => b !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, Un(t, {
        x: m,
        y: f,
        w: c,
        h: d,
        radius: p
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), Un(t, {
        x: v,
        y: p + 1,
        w: c - 2,
        h: d - 2,
        radius: p
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(m, f, c, d), t.strokeRect(m, f, c, d), t.fillStyle = i.backgroundColor, t.fillRect(v, f + 1, c - 2, d - 2));
    }
    t.fillStyle = this.labelTextColors[a];
  }
  drawBody(t, n, a) {
    const { body: s } = this, { bodySpacing: o, bodyAlign: i, displayColors: l, boxHeight: d, boxWidth: c, boxPadding: u } = a, h = Vt(a.bodyFont);
    let g = h.lineHeight, y = 0;
    const f = Ke(a.rtl, this.x, this.width), m = function(S) {
      n.fillText(S, f.x(t.x + y), t.y + g / 2), t.y += g + o;
    }, v = f.textAlign(i);
    let p, b, x, w, M, C, $;
    for (n.textAlign = i, n.textBaseline = "middle", n.font = h.string, t.x = Rn(this, v, a), n.fillStyle = a.bodyColor, xt(this.beforeBody, m), y = l && v !== "right" ? i === "center" ? c / 2 + u : c + 2 + u : 0, w = 0, C = s.length; w < C; ++w) {
      for (p = s[w], b = this.labelTextColors[w], n.fillStyle = b, xt(p.before, m), x = p.lines, l && x.length && (this._drawColorBox(n, t, w, f, a), g = Math.max(h.lineHeight, d)), M = 0, $ = x.length; M < $; ++M)
        m(x[M]), g = h.lineHeight;
      xt(p.after, m);
    }
    y = 0, g = h.lineHeight, xt(this.afterBody, m), t.y -= o;
  }
  drawFooter(t, n, a) {
    const s = this.footer, o = s.length;
    let i, l;
    if (o) {
      const d = Ke(a.rtl, this.x, this.width);
      for (t.x = Rn(this, a.footerAlign, a), t.y += a.footerMarginTop, n.textAlign = d.textAlign(a.footerAlign), n.textBaseline = "middle", i = Vt(a.footerFont), n.fillStyle = a.footerColor, n.font = i.string, l = 0; l < o; ++l)
        n.fillText(s[l], d.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + a.footerSpacing;
    }
  }
  drawBackground(t, n, a, s) {
    const { xAlign: o, yAlign: i } = this, { x: l, y: d } = t, { width: c, height: u } = a, { topLeft: h, topRight: g, bottomLeft: y, bottomRight: f } = Ye(s.cornerRadius);
    n.fillStyle = s.backgroundColor, n.strokeStyle = s.borderColor, n.lineWidth = s.borderWidth, n.beginPath(), n.moveTo(l + h, d), i === "top" && this.drawCaret(t, n, a, s), n.lineTo(l + c - g, d), n.quadraticCurveTo(l + c, d, l + c, d + g), i === "center" && o === "right" && this.drawCaret(t, n, a, s), n.lineTo(l + c, d + u - f), n.quadraticCurveTo(l + c, d + u, l + c - f, d + u), i === "bottom" && this.drawCaret(t, n, a, s), n.lineTo(l + y, d + u), n.quadraticCurveTo(l, d + u, l, d + u - y), i === "center" && o === "left" && this.drawCaret(t, n, a, s), n.lineTo(l, d + h), n.quadraticCurveTo(l, d, l + h, d), n.closePath(), n.fill(), s.borderWidth > 0 && n.stroke();
  }
  _updateAnimationTarget(t) {
    const n = this.chart, a = this.$animations, o = a && a.x, s = a && a.y;
    if (o || s) {
      const i = gn[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const l = this._size = ao(this, t), d = Object.assign({}, i, this._size), c = so(n, t, d), u = oo(t, d, c, n);
      (s._to !== u.x || o._to !== u.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = l.width, this.height = l.height, this.caretX = i.x, this.caretY = i.y, this._resolveAnimations().update(this, u));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(t) {
    const n = this.options.setContext(this.getContext());
    let a = this.opacity;
    if (!a)
      return;
    this._updateAnimationTarget(n);
    const o = {
      width: this.width,
      height: this.height
    }, s = {
      x: this.x,
      y: this.y
    };
    a = Math.abs(a) < 1e-3 ? 0 : a;
    const i = Zt(n.padding), l = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    n.enabled && l && (t.save(), t.globalAlpha = a, this.drawBackground(o, t, s, n), ti(t, n.textDirection), o.y += i.top, this.drawTitle(o, t, n), this.drawBody(o, t, n), this.drawFooter(o, t, n), ei(t, n.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, n) {
    const a = this._active, s = t.map(({ datasetIndex: l, index: d }) => {
      const c = this.chart.getDatasetMeta(l);
      if (!c)
        throw new Error("Cannot find a dataset at index " + l);
      return {
        datasetIndex: l,
        element: c.data[d],
        index: d
      };
    }), s = !Gn(a, o), i = this._positionChanged(o, n);
    (s || i) && (this._active = o, this._eventPosition = n, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, n, a = !0) {
    if (n && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const s = this.options, o = this._active || [], i = this._getActiveElements(t, o, n, a), l = this._positionChanged(i, t), d = n || !Yn(i, o) || l;
    return d && (this._active = i, (s.enabled || s.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, n))), d;
  }
  _getActiveElements(t, n, a, o) {
    const s = this.options;
    if (t.type === "mouseout")
      return [];
    if (!s)
      return n.filter((l) => this.chart.data.datasets[l.datasetIndex] && this.chart.getDatasetMeta(l.datasetIndex).controller.getParsed(l.index) !== void 0);
    const i = this.chart.getElementsAtEventForMode(t, o.mode, o, a);
    return o.reverse && i.reverse(), i;
  }
  _positionChanged(t, n) {
    const { caretX: a, caretY: o, options: s } = this, i = gn[s.position].call(this, t, n);
    return i !== !1 && (a !== i.x || o !== i.y);
  }
}
var eo = {
  id: "tooltip",
  _element: ro,
  positioners: dn,
  afterInit(e, t, n) {
    n && (e.tooltip = new ro({
      chart: e,
      options: n
    }));
  },
  beforeUpdate(e, t, n) {
    e.tooltip && e.tooltip.initialize(n);
  },
  reset(e, t, n) {
    e.tooltip && e.tooltip.initialize(n);
  },
  afterDraw(e) {
    const t = e.tooltip;
    if (t && t._willRender()) {
      const n = {
        tooltip: t
      };
      if (e.notifyPlugins("beforeTooltipDraw", {
        ...n,
        cancelable: !0
      }) === !1)
        return;
      t.draw(e.ctx), e.notifyPlugins("afterTooltipDraw", n);
    }
  },
  afterEvent(e, t) {
    if (e.tooltip) {
      const n = t.replay;
      e.tooltip.handleEvent(t.event, n, t.inChartArea) && (t.changed = !0);
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
const fu = (e, t, n, a) => (typeof t == "string" ? (n = e.push(t) - 1, a.unshift({
  index: n,
  label: t
})) : isNaN(t) && (n = null), n);
function gu(e, t, n, a) {
  const s = e.indexOf(t);
  if (s === -1)
    return fu(e, t, n, a);
  const o = e.lastIndexOf(t);
  return s !== o ? n : s;
}
const pu = (e, t) => e === null ? null : zt(Math.round(e), 0, t);
function co(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Bi extends en {
  static id = "category";
  static defaults = {
    ticks: {
      callback: ps
    }
  };
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const n = this._addedLabels;
    if (n.length) {
      const a = this.getLabels();
      for (const { index: o, label: s } of n)
        a[o] === s && a.splice(o, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, n) {
    if (kt(t))
      return null;
    const a = this.getLabels();
    return n = isFinite(n) && a[n] === t ? n : gu(a, t, ht(n, t), this._addedLabels), pu(n, a.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: n } = this.getUserBounds();
    let { min: a, max: o } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (a = 0), n || (o = this.getLabels().length - 1)), this.min = a, this.max = o;
  }
  buildTicks() {
    const t = this.min, n = this.max, a = this.options.offset, o = [];
    let s = this.getLabels();
    s = t === 0 && n === s.length - 1 ? s : s.slice(t, n + 1), this._valueRange = Math.max(s.length - (a ? 0 : 1), 1), this._startValue = this.min - (a ? 0.5 : 0);
    for (let i = t; i <= n; i++)
      o.push({
        value: i
      });
    return o;
  }
  getLabelForValue(t) {
    return ps.call(this, t);
  }
  configure() {
    super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
  }
  getPixelForValue(t) {
    return typeof t != "number" && (t = this.parse(t)), t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getPixelForTick(t) {
    const n = this.ticks;
    return t < 0 || t > n.length - 1 ? null : this.getPixelForValue(n[t].value);
  }
  getValueForPixel(t) {
    return Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
}
function mu(e, t) {
  const n = [], { bounds: s, step: o, min: i, max: l, precision: d, count: c, maxTicks: u, maxDigits: h, includeBounds: g } = e, y = o || 1, f = u - 1, { min: m, max: v } = t, p = !_t(i), b = !_t(l), x = !_t(c), w = (v - m) / (h + 1);
  let M = ds((v - m) / f / y) * y, C, $, S, L;
  if (M < 1e-14 && !p && !b)
    return [
      {
        value: b
      },
      {
        value: v
      }
    ];
  L = Math.ceil(v / M) - Math.floor(m / M), L > f && (M = ds(L * M / f / y) * y), _t(d) || (C = Math.pow(10, d), M = Math.ceil(M * C) / C), s === "ticks" ? ($ = Math.floor(m / M) * M, S = Math.ceil(v / M) * M) : ($ = m, S = v), p && b && o && Bl((l - i) / o, M / 1e3) ? (L = Math.round(Math.min((l - i) / M, u)), M = (l - i) / L, $ = i, S = l) : x ? ($ = p ? i : $, S = b ? l : S, L = c - 1, M = (S - $) / L) : (L = (S - $) / M, fn(L, Math.round(L), M / 1e3) ? L = Math.round(L) : L = Math.ceil(L));
  const T = Math.max(us(M), us($));
  C = Math.pow(10, _t(d) ? T : d), $ = Math.round($ * C) / C, S = Math.round(S * C) / C;
  let B = 0;
  for (p && (g && $ !== i ? (n.push({
    value: i
  }), $ < i && B++, fn(Math.round(($ + B * M) * C) / C, i, uo(i, w, e)) && B++) : $ < i && B++); B < L; ++B) {
    const E = Math.round(($ + B * M) * C) / C;
    if (b && E > l)
      break;
    n.push({
      value: E
    });
  }
  return b && g && S !== l ? n.length && fn(n[n.length - 1].value, l, uo(l, w, e)) ? n[n.length - 1].value = l : n.push({
    value: l
  }) : (!b || S === l) && n.push({
    value: S
  }), n;
}
function ms(e, t, { horizontal: n, minRotation: a }) {
  const o = me(a), s = (n ? Math.sin(o) : Math.cos(o)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / s, i);
}
class bu extends Xe {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, n) {
    return kt(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: n, maxDefined: a } = this.getUserBounds();
    let { min: s, max: o } = this;
    const i = (d) => s = n ? s : d, l = (d) => o = a ? o : d;
    if (t) {
      const d = oe(s), c = oe(o);
      d < 0 && c < 0 ? l(0) : d > 0 && c > 0 && i(0);
    }
    if (s === o) {
      let d = o === 0 ? 1 : Math.abs(o * 0.05);
      l(o + d), t || i(s - d);
    }
    this.min = o, this.max = s;
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: n, stepSize: a } = t, o;
    return a ? (o = Math.ceil(this.max / a) - Math.floor(this.min / a) + 1, o > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${a} would result generating up to ${o} ticks. Limiting to 1000.`), o = 1e3)) : (o = this.computeTickLimit(), n = n || 11), n && (o = Math.min(n, o)), o;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, n = t.ticks;
    let a = this.getTickLimit();
    a = Math.max(2, a);
    const o = {
      maxTicks: a,
      bounds: t.bounds,
      min: t.min,
      max: t.max,
      precision: n.precision,
      step: n.stepSize,
      count: n.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: n.minRotation || 0,
      includeBounds: n.includeBounds !== !1
    }, o = this._range || this, i = mu(s, o);
    return t.bounds === "ticks" && Ll(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
  }
  configure() {
    const t = this.ticks;
    let n = this.min, a = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const o = (a - n) / Math.max(t.length - 1, 1) / 2;
      n -= o, a += o;
    }
    this._startValue = n, this._endValue = a, this._valueRange = a - n;
  }
  getLabelForValue(t) {
    return Ha(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class wi extends bu {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: Ko.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!0);
    this.min = ne(t) ? t : 0, this.max = ne(n) ? n : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), n = t ? this.width : this.height, a = me(this.options.ticks.minRotation), o = (t ? Math.sin(a) : Math.cos(a)) || 1e-3, s = this._resolveTickFontOptions(0);
    return Math.ceil(n / Math.min(40, s.lineHeight / o));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const ia = {
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
}, Gt = /* @__PURE__ */ Object.keys(ia);
function bs(e, t) {
  return e - t;
}
function vs(e, t) {
  if (kt(t))
    return null;
  const n = e._adapter, { parser: a, round: o, isoWeekday: s } = e._parseOpts;
  let i = t;
  return typeof a == "function" && (i = a(i)), ne(i) || (i = typeof a == "string" ? n.parse(i, a) : n.parse(i)), i === null ? null : (o && (i = o === "week" && (Cn(s) || s === !0) ? n.startOf(i, "isoWeek", s) : n.startOf(i, o)), +i);
}
function go(e, t, n, a) {
  const s = jt.length;
  for (let o = jt.indexOf(e); o < s - 1; ++o) {
    const i = ea[jt[o]], l = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((n - t) / (l * i.size)) <= a)
      return jt[o];
  }
  return Gt[o - 1];
}
function vu(e, t, n, a, s) {
  for (let o = jt.length - 1; o >= jt.indexOf(n); o--) {
    const i = jt[o];
    if (ea[i].common && e._adapter.diff(s, a, i) >= t - 1)
      return i;
  }
  return Gt[n ? Gt.indexOf(n) : 0];
}
function yu(e) {
  for (let t = jt.indexOf(e) + 1, n = jt.length; t < n; ++t)
    if (ea[jt[t]].common)
      return jt[t];
}
function _s(e, t, n) {
  if (!n)
    e[t] = !0;
  else if (n.length) {
    const { lo: a, hi: o } = Na(n, t), s = n[a] >= t ? n[a] : n[o];
    e[s] = !0;
  }
}
function _u(e, t, n, a) {
  const s = e._adapter, o = +s.startOf(t[0].value, a), i = t[t.length - 1].value;
  let l, d;
  for (l = o; l <= i; l = +s.add(l, 1, a))
    d = n[l], d >= 0 && (t[d].major = !0);
  return t;
}
function mo(e, t, n) {
  const a = [], s = {}, o = t.length;
  let i, l;
  for (i = 0; i < o; ++i)
    l = t[i], s[l] = i, a.push({
      value: l,
      major: !1
    });
  return o === 0 || !n ? a : _u(e, a, s, n);
}
class ks extends en {
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
  init(t, n = {}) {
    const a = t.time || (t.time = {}), s = this._adapter = new xc._date(t.adapters.date);
    s.init(n), hn(a.displayFormats, s.formats()), this._parseOpts = {
      parser: a.parser,
      round: a.round,
      isoWeekday: a.isoWeekday
    }, super.init(t), this._normalized = n.normalized;
  }
  parse(t, n) {
    return t === void 0 ? null : vs(this, t);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const t = this.options, n = this._adapter, a = t.time.unit || "day";
    let { min: s, max: o, minDefined: i, maxDefined: l } = this.getUserBounds();
    function d(c) {
      !i && !isNaN(c.min) && (s = Math.min(s, c.min)), !l && !isNaN(c.max) && (o = Math.max(o, c.max));
    }
    (!i || !l) && (d(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && d(this.getMinMax(!1))), s = Gt(s) && !isNaN(s) ? s : +n.startOf(Date.now(), a), o = Gt(o) && !isNaN(o) ? o : +n.endOf(Date.now(), a) + 1, this.min = Math.min(s, o - 1), this.max = Math.max(s + 1, o);
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let n = Number.POSITIVE_INFINITY, a = Number.NEGATIVE_INFINITY;
    return t.length && (n = t[0], a = t[t.length - 1]), {
      min: n,
      max: a
    };
  }
  buildTicks() {
    const t = this.options, n = t.time, a = t.ticks, s = a.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && s.length && (this.min = this._userMin || s[0], this.max = this._userMax || s[s.length - 1]);
    const o = this.min, i = this.max, l = Rl(s, o, i);
    return this._unit = n.unit || (a.autoSkip ? go(n.minUnit, this.min, this.max, this._getLabelCapacity(o)) : vu(this, l.length, n.minUnit, this.min, this.max)), this._majorUnit = !a.major.enabled || this._unit === "year" ? void 0 : yu(this._unit), this.initOffsets(s), t.reverse && l.reverse(), mo(this, l, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let n = 0, a = 0, o, s;
    this.options.offset && t.length && (o = this.getDecimalForValue(t[0]), t.length === 1 ? n = 1 - o : n = (this.getDecimalForValue(t[1]) - o) / 2, s = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? a = s : a = (s - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    n = Ht(n, 0, i), a = Ht(a, 0, i), this._offsets = {
      start: n,
      end: a,
      factor: 1 / (n + 1 + a)
    };
  }
  _generate() {
    const t = this._adapter, n = this.min, a = this.max, s = this.options, o = s.time, i = o.unit || go(o.minUnit, n, a, this._getLabelCapacity(n)), l = ht(s.ticks.stepSize, 1), d = i === "week" ? o.isoWeekday : !1, c = _n(d) || d === !0, u = {};
    let h = n, g, y;
    if (c && (h = +t.startOf(h, "isoWeek", d)), h = +t.startOf(h, c ? "day" : i), t.diff(a, n, i) > 1e5 * l)
      throw new Error(n + " and " + a + " are too far apart with stepSize of " + l + " " + i);
    const f = s.ticks.source === "data" && this.getDataTimestamps();
    for (g = h, y = 0; g < a; g = +t.add(g, l, i), y++)
      po(u, g, f);
    return (g === a || s.bounds === "ticks" || y === 1) && po(u, g, f), Object.keys(u).sort(ho).map((m) => +m);
  }
  getLabelForValue(t) {
    const n = this._adapter, a = this.options.time;
    return a.tooltipFormat ? n.format(t, a.tooltipFormat) : n.format(t, a.displayFormats.datetime);
  }
  format(t, n) {
    const o = this.options.time.displayFormats, s = this._unit, i = n || o[s];
    return this._adapter.format(t, i);
  }
  _tickFormatFunction(t, n, a, o) {
    const s = this.options, i = s.ticks.callback;
    if (i)
      return Dt(i, [
        t,
        n,
        a
      ], this);
    const l = o.time.displayFormats, d = this._unit, c = this._majorUnit, u = d && l[d], h = c && l[c], g = a[n], y = c && h && g && g.major;
    return this._adapter.format(t, s || (y ? h : u));
  }
  generateTickLabels(t) {
    let n, a, o;
    for (n = 0, a = t.length; n < a; ++n)
      o = t[n], o.label = this._tickFormatFunction(o.value, n, t);
  }
  getDecimalForValue(t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const n = this._offsets, a = this.getDecimalForValue(t);
    return this.getPixelForDecimal((n.start + a) * n.factor);
  }
  getValueForPixel(t) {
    const n = this._offsets, a = this.getDecimalForPixel(t) / n.factor - n.end;
    return this.min + a * (this.max - this.min);
  }
  _getLabelSize(t) {
    const n = this.options.ticks, a = this.ctx.measureText(t).width, s = ue(this.isHorizontal() ? n.maxRotation : n.minRotation), o = Math.cos(s), i = Math.sin(s), l = this._resolveTickFontOptions(0).size;
    return {
      w: a * o + l * i,
      h: a * i + l * o
    };
  }
  _getLabelCapacity(t) {
    const n = this.options.time, a = n.displayFormats, o = a[n.unit] || a.millisecond, s = this._tickFormatFunction(t, 0, xs(this, [
      t
    ], this._majorUnit), s), i = this._getLabelSize(o), l = Math.floor(this.isHorizontal() ? this.width / i.w : this.height / i.h) - 1;
    return l > 0 ? l : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], n, a;
    if (t.length)
      return t;
    const o = this.getMatchingVisibleMetas();
    if (this._normalized && o.length)
      return this._cache.data = o[0].controller.getAllParsedValues(this);
    for (n = 0, a = o.length; n < a; ++n)
      t = t.concat(o[n].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let n, a;
    if (t.length)
      return t;
    const o = this.getLabels();
    for (n = 0, a = o.length; n < a; ++n)
      t.push(vs(this, o[n]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Qs(t.sort(bs));
  }
}
function On(e, t, n) {
  let a = 0, s = e.length - 1, o, i, l, d;
  n ? (t >= e[a].pos && t <= e[s].pos && ({ lo: a, hi: s } = Ie(e, "pos", t)), { pos: o, time: l } = e[a], { pos: i, time: d } = e[s]) : (t >= e[a].time && t <= e[s].time && ({ lo: a, hi: s } = Ie(e, "time", t)), { time: o, pos: l } = e[a], { time: i, pos: d } = e[s]);
  const c = i - o;
  return c ? l + (d - l) * (t - o) / c : l;
}
class oC extends bo {
  static id = "timeseries";
  static defaults = ks.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(t);
    this._minPos = Wn(n, this.min), this._tableRange = Wn(n, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: n, max: a } = this, s = [], o = [];
    let i, l, d, c, u;
    for (i = 0, l = t.length; i < l; ++i)
      c = t[i], c >= n && c <= a && s.push(c);
    if (s.length < 2)
      return [
        {
          time: n,
          pos: 0
        },
        {
          time: a,
          pos: 1
        }
      ];
    for (i = 0, l = s.length; i < l; ++i)
      u = s[i + 1], d = s[i - 1], c = s[i], Math.round((u + d) / 2) !== c && o.push({
        time: c,
        pos: i / (l - 1)
      });
    return s;
  }
  _generate() {
    const t = this.min, n = this.max;
    let a = super.getDataTimestamps();
    return (!a.includes(t) || !a.length) && a.splice(0, 0, t), (!a.includes(n) || a.length === 1) && a.push(n), a.sort((o, s) => o - s);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const n = this.getDataTimestamps(), a = this.getLabelTimestamps();
    return n.length && a.length ? t = this.normalize(n.concat(a)) : t = n.length ? n : a, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (Wn(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const n = this._offsets, a = this.getDecimalForPixel(t) / n.factor - n.end;
    return Wn(this._table, a * this._tableRange + this._minPos, !0);
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
}, xu = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, ku = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...Ci,
  ...xu
}, wu = Ki[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function Xe(e) {
  return Ns(e) ? Ma(e) : e;
}
function Cu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return Ns(t) ? new Proxy(e, {}) : e;
}
function $u(e, t) {
  const n = e.options;
  n && t && Object.assign(n, t);
}
function Ei(e, t) {
  e.labels = t;
}
function Mi(e, t, n) {
  const a = [];
  e.datasets = t.map((o) => {
    const s = e.datasets.find((i) => i[n] === o[n]);
    return !s || !o.data || a.includes(s) ? {
      ...o
    } : (a.push(s), Object.assign(s, o), s);
  });
}
function Mu(e, t) {
  const n = {
    labels: [],
    datasets: []
  };
  return $i(n, e.labels), Mi(n, e.datasets, t), n;
}
const Su = Z({
  props: ku,
  setup(e, t) {
    let { expose: n, slots: a } = t;
    const o = nt(null), s = Vs(null);
    n({
      chart: s
    });
    const i = () => {
      if (!s.value) return;
      const { type: c, data: u, options: h, plugins: g, datasetIdKey: y } = e, f = Mu(u, y), m = Cu(f, u);
      o.value = new Ge(s.value, {
        type: c,
        data: b,
        options: {
          ...h
        },
        plugins: g
      });
    }, l = () => {
      const c = xa(o.value);
      c && (e.destroyDelay > 0 ? setTimeout(() => {
        c.destroy(), s.value = null;
      }, e.destroyDelay) : (c.destroy(), s.value = null));
    }, d = (c) => {
      c.update(e.updateMode);
    };
    return te(i), Me(l), Ft([
      () => e.options,
      () => e.data
    ], (c, u) => {
      let [h, g] = c, [y, f] = u;
      const m = xa(o.value);
      if (!m)
        return;
      let v = !1;
      if (h) {
        const p = He(h), b = He(y);
        p && p !== b && ($u(m, p), v = !0);
      }
      if (g) {
        const p = He(g.labels), b = He(f.labels), x = He(g.datasets), w = He(f.datasets);
        p !== b && ($i(m.config.data, p), v = !0), x && x !== w && (Mi(m.config.data, x, e.datasetIdKey), v = !0);
      }
      v && Et(() => {
        d(m);
      });
    }, {
      deep: !0
    }), () => Sa("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: o
    }, [
      Sa("p", {}, [
        a.default ? a.default() : ""
      ])
    ]);
  }
});
function Ga(e, t) {
  return Ge.register(t), Z({
    props: Ci,
    setup(n, a) {
      let { expose: s } = a;
      const o = Bo(null), i = (l) => {
        o.value = l?.chart;
      };
      return s({
        chart: o
      }), () => _a(Su, wu({
        ref: i
      }, {
        type: e,
        ...n
      }));
    }
  });
}
const Du = /* @__PURE__ */ Ga("bar", mc), Au = /* @__PURE__ */ Ga("line", yc), Tu = /* @__PURE__ */ Ga("pie", _c), vo = {
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
}, Cs = {
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
  textPrimary: "#e3e3e8",
  textSecondary: "#9191a1",
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
}, Bu = [
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
function ut(e) {
  const t = st("light");
  let n = null;
  const a = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", s = D(() => e?.value ? e.value : t.value), o = D(() => s.value === "dark"), i = D(() => o.value ? yo : vo), l = () => {
    typeof document > "u" || (t.value = a(), n = new MutationObserver((c) => {
      for (const u of c)
        u.attributeName === "class" && (t.value = a());
    }), n.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class"]
    }));
  }, d = () => {
    n && (n.disconnect(), n = null);
  };
  return te(() => {
    l();
  }), Me(() => {
    d();
  }), e && Ft(e, () => {
  }), {
    isDark: s,
    currentTheme: o,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: vo,
    darkColors: yo,
    chartSeriesColors: Bu
  };
}
const Lu = { class: "relative h-[230px] w-full shrink-0 bg-transparent font-sans" }, nn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", _o = 10, Fu = /* @__PURE__ */ Z({
  __name: "ChartBar",
  props: {
    data: {},
    options: {},
    stacked: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Ge.register(ki, wi, Jd, _i, Xa, Ua);
    const { isDark: a, colors: s } = ut(dt(n, "theme")), o = D(() => n.data), i = (c) => typeof c == "string" ? c.charAt(0).toUpperCase() + c.slice(1).toLowerCase() : c;
    function l(c, u) {
      if (u == null) return c;
      if (Array.isArray(u) || typeof u != "object" || c == null || Array.isArray(c) || typeof c != "object") return u;
      const h = { ...c };
      for (const g of Object.keys(u)) {
        const y = u[g];
        y !== void 0 && (h[g] = l(c[g], y));
      }
      return h;
    }
    const d = D(() => {
      const c = {
        font: {
          family: Xt
        },
        responsive: !0,
        maintainAspectRatio: !1,
        interaction: {
          mode: "index",
          intersect: !1
        },
        plugins: {
          legend: {
            display: !0,
            position: "bottom",
            align: "center",
            labels: {
              font: {
                family: Xt,
                size: 13,
                weight: "500"
              },
              padding: 12,
              boxWidth: $s,
              boxHeight: $s,
              usePointStyle: !1,
              generateLabels: function(u) {
                return u.data.datasets.map((g, y) => {
                  const f = Array.isArray(g.backgroundColor) ? g.backgroundColor[0] : g.backgroundColor, m = Array.isArray(g.borderColor) ? g.borderColor[0] : g.borderColor, v = typeof m == "string" && m.length > 0 ? m : typeof f == "string" && f.length > 0 ? f : s.value.textSecondary;
                  return {
                    text: i(g.label || ""),
                    fillStyle: typeof f == "string" ? f : v,
                    strokeStyle: v,
                    lineWidth: 0,
                    fontColor: g,
                    hidden: !h.isDatasetVisible(p),
                    index: p,
                    datasetIndex: p
                  };
                });
              }
            }
          },
          tooltip: {
            enabled: !0,
            backgroundColor: o.value.tooltipBg,
            titleColor: o.value.tooltipText,
            bodyColor: a.value ? "#d1d5db" : "#e2e8f0",
            borderColor: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            displayColors: !0,
            titleFont: {
              family: Xt,
              size: 13,
              weight: "600"
            },
            bodyFont: {
              family: Xt,
              size: 12,
              weight: "500"
            },
            boxPadding: 6,
            callbacks: {
              title: function(h) {
                return h.length > 0 ? String(i(h[0].label)) : "";
              },
              label: function(h) {
                let m = String(i(h.dataset.label || ""));
                return m && (m += ": "), h.parsed.y !== null && (m += h.parsed.y), m;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: !0,
            stacked: n.stacked || !1,
            border: {
              display: !1
            },
            grid: {
              display: !1,
              drawTicks: !1
            },
            ticks: {
              maxTicksLimit: ao,
              font: {
                family: Xt,
                size: 12,
                weight: "500"
              },
              color: o.value.textSecondary,
              padding: 8,
              callback: function(h) {
                return i(h);
              }
            }
          },
          x: {
            stacked: n.stacked || !1,
            offset: !0,
            border: {
              display: !1
            },
            grid: {
              display: !1,
              drawTicks: !1
            },
            ticks: {
              maxTicksLimit: oo,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: Xt,
                size: 12,
                weight: "500"
              },
              color: o.value.textSecondary,
              padding: 8,
              callback: function(h) {
                const m = this.getLabelForValue(h);
                return i(m);
              }
            }
          }
        },
        elements: {
          bar: {
            borderRadius: 8,
            borderWidth: 0
          }
        },
        datasets: {
          bar: {
            maxBarThickness: 52,
            categoryPercentage: 0.58,
            barPercentage: 0.82
          }
        }
      };
      return n.options ? l(c, n.options) : c;
    });
    return t({ isDark: a }), (c, u) => (_(), k("div", Lu, [
      R(F(Du), {
        data: o.value,
        options: d.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), ot = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, o] of t)
    n[a] = o;
  return n;
}, he = /* @__PURE__ */ it(Fu, [["__scopeId", "data-v-406e0e92"]]), Eu = { class: "chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-sans min-w-0" }, Iu = { class: "chart-line-canvas-host relative min-h-0 w-full flex-1" }, Pu = {
  key: 0,
  class: "chart-line-indicators mt-0 flex shrink-0 list-none flex-nowrap items-center justify-center gap-x-4 overflow-x-auto overflow-y-hidden px-1 pb-0.5 pt-0.5",
  role: "list"
}, Ru = ["aria-pressed", "aria-label", "onClick"], zn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Ou = /* @__PURE__ */ Z({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Ge.register(
      ki,
      wi,
      qd,
      Kd,
      _i,
      Xa,
      Ua
    );
    const a = st(null), { isDark: s, colors: o } = ut(dt(n, "theme")), i = D(() => o.value.bgCard), l = D(() => {
      const m = i.value;
      return {
        labels: n.data.labels,
        datasets: n.data.datasets.map((v) => {
          const p = v.borderColor, b = Array.isArray(p) ? p[0] : p, x = typeof b == "string" && b.length > 0 ? b : o.value.textSecondary, w = v.pointBackgroundColor !== void 0 ? v.pointBackgroundColor : m, M = v.pointHoverBackgroundColor !== void 0 ? v.pointHoverBackgroundColor : w, C = v.pointBorderWidth ?? 2, $ = v.pointHoverBorderWidth ?? C;
          return {
            ...v,
            fill: v.fill ?? !1,
            pointBackgroundColor: w,
            pointHoverBackgroundColor: M,
            pointBorderColor: v.pointBorderColor ?? x,
            pointHoverBorderColor: v.pointHoverBorderColor ?? x,
            pointBorderWidth: C,
            pointHoverBorderWidth: $
          };
        })
      };
    }), d = (m) => typeof m == "string" ? m.charAt(0).toUpperCase() + m.slice(1).toLowerCase() : m;
    function c(m) {
      const v = m.borderColor, p = Array.isArray(v) ? v[0] : v;
      return typeof p == "string" && p.length > 0 ? p : o.value.textSecondary;
    }
    const u = D(
      () => l.value.datasets.map((m, v) => ({
        key: `${m.label ?? "dataset"}-${v}`,
        label: d(m.label || ""),
        color: c(m)
      }))
    ), h = st([]);
    Ft(
      () => l.value.datasets.length,
      (m) => {
        const v = Array.from({ length: m }, (p, b) => h.value[b] ?? !0);
        h.value = v;
      },
      { immediate: !0 }
    );
    function g(m) {
      const p = a.value?.chart;
      if (!p || m < 0 || m >= p.data.datasets.length) return;
      const b = !p.isDatasetVisible(m);
      p.setDatasetVisibility(m, b), h.value[m] = b, p.update();
    }
    function y(m, v) {
      if (v == null) return m;
      if (Array.isArray(v) || typeof v != "object" || m == null || Array.isArray(m) || typeof m != "object") return v;
      const p = { ...m };
      for (const b of Object.keys(v)) {
        const x = v[b];
        x !== void 0 && (p[b] = y(m[b], x));
      }
      return p;
    }
    const f = D(() => {
      const m = {
        color: o.value.textSecondary,
        responsive: !0,
        maintainAspectRatio: !1,
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: !1
        },
        plugins: {
          colors: { enabled: !1 },
          legend: {
            display: !1
          },
          tooltip: {
            enabled: !0,
            mode: "index",
            intersect: !1,
            backgroundColor: s.value.tooltipBg,
            titleColor: s.value.tooltipText,
            bodyColor: s.value.textSecondary,
            borderColor: s.value.tooltipBorder,
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            displayColors: !0,
            titleFont: {
              family: Xt,
              size: 14,
              weight: "600"
            },
            bodyFont: {
              family: Xt,
              size: 13
            },
            callbacks: {
              title: function(p) {
                return p.length > 0 ? String(d(p[0].label)) : "";
              },
              label: function(p) {
                let b = String(d(p.dataset.label || ""));
                return b && (b += ": "), p.parsed.y !== null && (b += p.parsed.y), b;
              }
            }
          }
        },
        scales: {
          x: {
            display: !0,
            grid: {
              color: s.value.gridLines,
              lineWidth: 1,
              drawTicks: !1
            },
            ticks: {
              maxTicksLimit: oo,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: Xt,
                size: 11
              },
              color: s.value.textSecondary
            }
          },
          y: {
            type: "linear",
            display: !0,
            position: "left",
            beginAtZero: !0,
            grid: {
              color: s.value.gridLines
            },
            ticks: {
              maxTicksLimit: ao,
              font: {
                family: Xt,
                size: 11
              },
              color: s.value.textSecondary
            }
          }
        },
        elements: {
          line: {
            tension: 0.4,
            borderWidth: 2,
            borderCapStyle: "round"
          },
          point: {
            radius: 4,
            hoverRadius: 6,
            borderWidth: 2,
            hoverBorderWidth: 2
          }
        }
      }, v = n.options ? y(b, n.options) : b;
      return Ri(
        Pi(v)
      );
    });
    return t({ isDark: s }), (m, v) => (_(), k("div", Eu, [
      r("div", Iu, [
        R(F(Au), {
          ref_key: "lineChartRef",
          ref: a,
          data: l.value,
          options: f.value
        }, null, 8, ["data", "options"])
      ]),
      u.value.length > 0 ? (_(), k("ul", Pu, [
        (_(!0), k(q, null, at(u.value, (p, b) => (_(), k("li", {
          key: p.key,
          role: "listitem"
        }, [
          r("button", {
            type: "button",
            class: W(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-sans text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", h.value[b] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: gt({ color: p.color }),
            "aria-pressed": h.value[b] !== !1,
            "aria-label": `${p.label}. ${h.value[b] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (x) => g(b)
          }, [
            v[0] || (v[0] = r("span", {
              class: "inline-flex shrink-0 items-center",
              "aria-hidden": "true"
            }, [
              r("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }),
              r("span", { class: "relative z-[1] box-border size-2 shrink-0 rounded-full border-2 border-current bg-transparent" }),
              r("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" })
            ], -1)),
            r("span", null, A(p.label), 1)
          ], 14, Ru)
        ]))), 128))
      ])) : z("", !0)
    ]));
  }
}), ge = /* @__PURE__ */ it(Ou, [["__scopeId", "data-v-1ba3294e"]]), zu = { class: "chart-container" }, Vu = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Nu = /* @__PURE__ */ Z({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Ge.register(Pd, Xa, Ua);
    const { isDark: a, colors: s } = ut(dt(n, "theme")), o = n.data, i = (d) => typeof d == "string" ? d.charAt(0).toUpperCase() + d.slice(1).toLowerCase() : d, l = D(() => n.options ? n.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      cutout: n.doughnut ? "60%" : 0,
      plugins: {
        legend: {
          display: !0,
          position: "bottom",
          align: "center",
          labels: {
            font: {
              family: Vu,
              size: 13,
              weight: 500
            },
            padding: 16,
            boxWidth: 14,
            boxHeight: 14,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "circle",
            generateLabels: function(d) {
              const c = d.data;
              return c.labels.length && c.datasets.length ? c.labels.map((u, h) => {
                const y = d.getDatasetMeta(0).controller.getStyle(h), b = c.datasets[0].data[h], v = typeof y.backgroundColor == "string" && y.backgroundColor.length > 0 ? y.backgroundColor : o.value.textSecondary;
                return {
                  text: `${i(u)}: ${b}`,
                  fillStyle: y.backgroundColor,
                  strokeStyle: y.borderColor,
                  lineWidth: y.borderWidth,
                  lineDash: y.borderDash,
                  lineDashOffset: y.borderDashOffset,
                  lineJoin: y.borderJoinStyle,
                  fontColor: v,
                  hidden: !d.getDataVisibility(h),
                  index: h
                };
              }) : [];
            }
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: o.value.tooltipBg,
          titleColor: o.value.tooltipText,
          bodyColor: a.value ? "#d1d5db" : "#e2e8f0",
          borderColor: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
            title: function(d) {
              return d.length > 0 ? String(i(d[0].label)) : "";
            },
            label: function(d) {
              const c = d.label || "", u = d.parsed || 0, h = d.dataset.data.reduce((y, f) => y + f, 0), g = (u / h * 100).toFixed(1);
              return `${i(c)}: ${u} (${g}%)`;
            }
          }
        }
      },
      elements: {
        arc: {
          borderWidth: 2,
          borderColor: a.value ? "#1a1a1d" : "#ffffff",
          hoverOffset: 8
        }
      },
      animation: {
        animateRotate: !0,
        animateScale: !0
      }
    });
    return t({ isDark: a }), (d, c) => (_(), k("div", zu, [
      R(F(Tu), {
        data: F(o),
        options: l.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), na = /* @__PURE__ */ it(Nu, [["__scopeId", "data-v-0f7806d6"]]), Wu = { class: "chart-container" }, Hu = ["viewBox"], ju = ["transform"], Yu = ["x", "width", "fill", "stroke"], Ku = ["fill"], qu = ["x1", "y1", "x2", "y2", "stroke"], Uu = ["points", "fill"], Xu = ["x1", "y1", "x2", "y2", "stroke"], Gu = ["x", "y", "fill"], Zu = ["x1", "y1", "x2", "y2", "stroke"], Qu = ["points", "fill"], Ju = ["transform"], th = ["y1", "y2"], eh = ["y1", "y2"], nh = ["y1", "y2"], ah = ["y1", "y2"], sh = ["y", "height"], oh = ["y1", "y2"], ih = ["y1", "y2"], lh = ["y1", "y2"], rh = ["y1", "y2"], ch = ["y", "height"], dh = ["cy", "stroke", "onMouseenter"], uh = ["cy", "stroke", "onMouseenter"], hh = ["cy", "stroke", "onMouseenter"], fh = ["cy", "stroke", "onMouseenter"], gh = ["y1", "y2", "onMouseenter"], ph = ["y1", "y2", "onMouseenter"], mh = ["x", "y", "fill"], bh = ["x", "y", "fill"], vh = ["transform"], yh = { transform: "translate(-200, 0)" }, _h = ["stroke"], xh = ["fill"], kh = { transform: "translate(-130, 0)" }, wh = ["stroke"], Ch = ["fill"], $h = { transform: "translate(-60, 0)" }, Mh = ["stroke"], Sh = ["fill"], Dh = { transform: "translate(10, 0)" }, Ah = ["stroke"], Th = ["fill"], Bh = { transform: "translate(80, 0)" }, Lh = ["fill"], Fh = { transform: "translate(150, 0)" }, Eh = ["fill"], Ih = /* @__PURE__ */ Z({
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
    const n = e, { isDark: a } = ut(dt(n, "theme")), s = D(() => ({
      // Tooltip
      tooltipBg: a.value ? "rgba(26, 26, 29, 0.98)" : "rgba(15, 23, 42, 0.95)",
      tooltipBorder: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
      tooltipText: a.value ? "#f8f9fa" : "#f1f5f9",
      // Axis
      axis: a.value ? "#9ca3af" : "#475569",
      // Ticks
      tickLine: a.value ? "#4b5563" : "#cbd5e1",
      tickText: a.value ? "#9ca3af" : "#64748b",
      // Labels
      labelText: a.value ? "#d1d5db" : "#475569",
      legendText: a.value ? "#d1d5db" : "#475569",
      // Dots
      dotStroke: a.value ? "#1a1a1d" : "#ffffff"
    })), s = nt({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), i = (g) => typeof g == "string" ? g.charAt(0).toUpperCase() + g.slice(1).toLowerCase() : g, l = (g, y) => {
      const f = g.currentTarget.closest("svg");
      if (!f) return;
      const m = f.getBoundingClientRect(), v = f.createSVGPoint();
      v.x = g.clientX - m.left, v.y = g.clientY - m.top, o.value = {
        visible: !0,
        x: v.x,
        y: v.y - 20,
        text: y
      };
    }, d = (g) => {
      if (o.value.visible) {
        const y = g.currentTarget, f = y.getBoundingClientRect(), m = y.createSVGPoint();
        m.x = g.clientX - f.left, m.y = g.clientY - f.top, o.value.x = m.x, o.value.y = m.y - 20;
      }
    }, c = () => {
      s.value.visible = !1;
    }, u = () => {
      o.value.visible = !1;
    }, h = D(() => {
      const g = [], f = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let m = 1; m <= 10; m++) {
        const v = m, p = (v - 1) / 9, b = n.chartMargin + f - p * f;
        g.push({ value: v, y: b });
      }
      return g;
    });
    return t({ isDark: a }), (g, y) => (_(), k("div", Wu, [
      (_(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: gt(`min-height: ${e.chartHeight}px;`),
        onMousemove: d,
        onMouseleave: c
      }, [
        s.value.visible ? (_(), w("g", {
          key: 0,
          transform: `translate(${s.value.x}, ${s.value.y})`
        }, [
          r("rect", {
            x: -(o.value.text.length * 6 + 10),
            y: -16,
            width: s.value.text.length * 12 + 20,
            height: "24",
            fill: o.value.tooltipBg,
            rx: "6",
            stroke: o.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, Yu),
          r("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: o.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, A(o.value.text), 9, Ku)
        ], 8, ju)) : z("", !0),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, qu),
        r("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: s.value.axis
        }, null, 8, Uu),
        (_(!0), k(q, null, at(h.value, (f, m) => (_(), k(q, { key: m }, [
          r("line", {
            x1: e.chartMargin - 6,
            y1: p.y,
            x2: e.chartMargin,
            y2: p.y,
            stroke: o.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Xu),
          r("text", {
            x: e.chartMargin - 12,
            y: p.y + 4,
            "text-anchor": "end",
            fill: o.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(f.value), 9, Gu)
        ], 64))), 128)),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, Zu),
        r("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: s.value.axis
        }, null, 8, Qu),
        (_(!0), k(q, null, at(e.boxplotData, (f, m) => (_(), k(q, { key: m }, [
          r("g", {
            transform: `translate(${f.centerX}, 0)`
          }, [
            f.isTotal ? (_(), k(q, { key: 0 }, [
              r("line", {
                x1: 0,
                y1: p.minY,
                x2: 0,
                y2: p.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, th),
              r("line", {
                x1: 0,
                y1: p.q3Y,
                x2: 0,
                y2: p.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, eh),
              r("line", {
                x1: -18,
                y1: p.minY,
                x2: 18,
                y2: p.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, nh),
              r("line", {
                x1: -18,
                y1: p.maxY,
                x2: 18,
                y2: p.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, ah),
              r("rect", {
                x: -24,
                y: p.q3Y,
                width: "48",
                height: p.q1Y - p.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, sh)
            ], 64)) : (_(), k(q, { key: 1 }, [
              r("line", {
                x1: 0,
                y1: p.minY,
                x2: 0,
                y2: p.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, oh),
              r("line", {
                x1: 0,
                y1: p.q3Y,
                x2: 0,
                y2: p.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, ih),
              r("line", {
                x1: -18,
                y1: p.minY,
                x2: 18,
                y2: p.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, lh),
              r("line", {
                x1: -18,
                y1: p.maxY,
                x2: 18,
                y2: p.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, rh),
              r("rect", {
                x: -24,
                y: p.q3Y,
                width: "48",
                height: p.q1Y - p.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, ch)
            ], 64)),
            r("circle", {
              cx: 0,
              cy: p.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Min: ${f.min.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, dh),
            r("circle", {
              cx: 0,
              cy: p.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Q1: ${f.q1.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, uh),
            r("circle", {
              cx: 0,
              cy: p.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Q3: ${f.q3.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, hh),
            r("circle", {
              cx: 0,
              cy: p.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Max: ${f.max.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, fh),
            r("line", {
              x1: -24,
              y1: p.medianY,
              x2: 24,
              y2: p.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (v) => l(v, `Median: ${f.median.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, gh),
            f.averageY ? (_(), k("line", {
              key: 2,
              x1: -24,
              y1: p.averageY,
              x2: 24,
              y2: p.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (v) => l(v, `Avg: ${f.average.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, ph)) : z("", !0)
          ], 8, Ju),
          r("text", {
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: o.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(i(f.label)), 9, mh),
          f.responseCount ? (_(), k("text", {
            key: 0,
            x: p.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: o.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(f.responseCount), 9, bh)) : z("", !0)
        ], 64))), 128)),
        e.showLegend ? (_(), w("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          r("g", yh, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, _h),
            r("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, xh)
          ]),
          r("g", kh, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, wh),
            r("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Ch)
          ]),
          r("g", $h, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Mh),
            r("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Wh)
          ]),
          r("g", Dh, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Ah),
            r("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Th)
          ]),
          r("g", Bh, [
            y[0] || (y[0] = r("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#f97316",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            r("text", {
              x: "18",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, Lh)
          ]),
          r("g", Fh, [
            y[1] || (y[1] = r("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "2.5"
            }, null, -1)),
            r("text", {
              x: "18",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, Eh)
          ])
        ], 8, vh)) : z("", !0)
      ], 44, Hu))
    ]));
  }
}), Ph = /* @__PURE__ */ it(Ih, [["__scopeId", "data-v-9ac5c075"]]), Rh = { class: "chart-container" }, Oh = ["viewBox"], zh = ["transform"], Vh = ["x", "y", "width", "height", "fill", "stroke"], Nh = ["y", "fill"], Wh = ["y", "fill"], Hh = ["x1", "y1", "x2", "y2", "stroke"], jh = ["points", "fill"], Yh = ["x1", "y1", "x2", "y2", "stroke"], Kh = ["x1", "y1", "x2", "y2", "stroke"], qh = ["x", "y", "fill"], Uh = ["x", "y", "fill", "transform"], Xh = ["x1", "y1", "x2", "y2", "stroke"], Gh = ["points", "fill"], Zh = ["transform"], Qh = ["y1", "y2", "stroke", "onMouseenter"], Jh = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], tf = ["x1", "y1", "x2", "y2", "onMouseenter"], ef = ["x1", "y1", "x2", "y2", "onMouseenter"], nf = ["cy", "stroke", "onMouseenter"], af = ["cy", "stroke", "onMouseenter"], sf = ["x", "y", "fill"], of = ["x", "y", "fill"], lf = ["transform"], rf = { transform: "translate(-180, 0)" }, cf = ["stroke"], df = ["fill"], uf = { transform: "translate(-120, 0)" }, hf = ["fill"], ff = { transform: "translate(-60, 0)" }, gf = ["fill"], pf = { transform: "translate(0, 0)" }, mf = ["stroke"], bf = ["fill"], vf = { transform: "translate(60, 0)" }, yf = ["fill"], _f = { transform: "translate(130, 0)" }, xf = ["fill"], kf = /* @__PURE__ */ Z({
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
    const n = e, { isDark: a } = ut(dt(n, "theme")), s = D(() => ({
      // Tooltip
      tooltipBg: a.value ? "rgba(26, 26, 29, 0.98)" : "rgba(15, 23, 42, 0.95)",
      tooltipBorder: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
      tooltipText: a.value ? "#f8f9fa" : "#f1f5f9",
      tooltipTextSecondary: a.value ? "#d1d5db" : "#e2e8f0",
      // Axis
      axis: a.value ? "#9ca3af" : "#475569",
      // Grid
      gridLine: a.value ? "#374151" : "#e5e7eb",
      // Ticks
      tickLine: a.value ? "#4b5563" : "#cbd5e1",
      tickText: a.value ? "#9ca3af" : "#64748b",
      // Labels
      labelText: a.value ? "#d1d5db" : "#475569",
      legendText: a.value ? "#d1d5db" : "#475569",
      // Dots
      dotStroke: a.value ? "#1a1a1d" : "#ffffff"
    })), h = nt({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), i = (g) => typeof g == "string" ? g.charAt(0).toUpperCase() + g.slice(1).toLowerCase() : g, l = (g, y, f) => {
      const m = g.currentTarget.closest("svg");
      if (!m) return;
      const v = m.getBoundingClientRect(), p = m.createSVGPoint();
      p.x = g.clientX - v.left, p.y = g.clientY - v.top;
      let b = i(y.label), x = "";
      switch (f) {
        case "body":
          L = `Q1: ${k.q1.toFixed(1)} | Q3: ${k.q3.toFixed(1)}`;
          break;
        case "wick":
          L = `Min: ${k.low.toFixed(1)} | Max: ${k.high.toFixed(1)}`;
          break;
        case "median":
          L = `Median: ${k.median.toFixed(1)}`;
          break;
        case "average":
          L = `Average: ${k.average?.toFixed(1) ?? ""}`;
          break;
        case "min":
          L = `Min: ${k.low.toFixed(1)}`;
          break;
        case "max":
          L = `Max: ${k.high.toFixed(1)}`;
          break;
      }
      const w = Math.max(180, x.length * 7 + 40), M = 48;
      o.value = {
        visible: !0,
        x: p.x,
        y: p.y - 20,
        title: b,
        text: x,
        width: w,
        height: M
      };
    }, d = (g) => {
      if (o.value.visible) {
        const y = g.currentTarget, f = y.getBoundingClientRect(), m = y.createSVGPoint();
        m.x = g.clientX - f.left, m.y = g.clientY - f.top, o.value.x = m.x, o.value.y = m.y - 20;
      }
    }, c = () => {
      o.value.visible = !1;
    }, u = () => {
      o.value.visible = !1;
    }, h = D(() => {
      const g = [], f = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let m = 1; m <= 10; m++) {
        const v = m, p = (v - 1) / 9, b = n.chartMargin + f - p * f;
        g.push({ value: v, y: b });
      }
      return g;
    });
    return t({ isDark: a }), (g, y) => (_(), k("div", Rh, [
      (_(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: gt(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: d,
        onMouseleave: c
      }, [
        o.value.visible ? (_(), k("g", {
          key: 0,
          transform: `translate(${o.value.x}, ${o.value.y})`
        }, [
          r("rect", {
            x: -o.value.width / 2,
            y: -o.value.height - 10,
            width: o.value.width,
            height: o.value.height,
            fill: s.value.tooltipBg,
            rx: "8",
            stroke: s.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, Vh),
          r("text", {
            x: "0",
            y: -o.value.height + 8,
            "text-anchor": "middle",
            fill: s.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(o.value.title), 9, Nh),
          r("text", {
            x: "0",
            y: -o.value.height + 26,
            "text-anchor": "middle",
            fill: s.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(o.value.text), 9, Wh)
        ], 8, zh)) : z("", !0),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, Hh),
        r("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: s.value.axis
        }, null, 8, jh),
        (_(!0), k(q, null, at(h.value, (f, m) => (_(), k("line", {
          key: `grid-${m}`,
          x1: e.chartMargin,
          y1: x.y,
          x2: e.chartWidth - e.chartMargin,
          y2: x.y,
          stroke: u.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Yh))), 128)),
        (_(!0), k(q, null, at(h.value, (f, m) => (_(), k(q, { key: m }, [
          r("line", {
            x1: e.chartMargin - 6,
            y1: x.y,
            x2: e.chartMargin,
            y2: x.y,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Kh),
          r("text", {
            x: e.chartMargin - 12,
            y: x.y + 4,
            "text-anchor": "end",
            fill: u.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(x.value), 9, of)
        ], 64))), 128)),
        r("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: u.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, A(i(e.yAxisLabel)), 9, Uh),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, Xh),
        r("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: s.value.axis
        }, null, 8, Gh),
        (_(!0), k(q, null, at(e.candlestickData, (f, m) => (_(), k(q, { key: m }, [
          r("g", {
            transform: `translate(${f.centerX}, 0)`
          }, [
            r("line", {
              x1: 0,
              y1: x.highY,
              x2: 0,
              y2: x.lowY,
              stroke: x.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "hover-line",
              onMouseenter: (v) => l(v, f, "wick"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Qh),
            r("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(x.q1Y, x.q3Y) - (Math.abs(x.q3Y - x.q1Y) < 4 ? 4 : 0),
              width: e.candleWidth,
              height: Math.max(8, Math.abs(x.q3Y - x.q1Y)),
              fill: x.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: x.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (v) => l(v, f, "body"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Jh),
            f.medianY ? (_(), k("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: x.medianY,
              x2: e.candleWidth / 2,
              y2: x.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (v) => l(v, f, "median"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, tf)) : z("", !0),
            f.averageY ? (_(), k("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: x.averageY,
              x2: e.candleWidth / 2,
              y2: x.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (v) => l(v, f, "average"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, ef)) : z("", !0),
            r("circle", {
              cx: 0,
              cy: x.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: u.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, f, "min"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, nf),
            r("circle", {
              cx: 0,
              cy: x.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: u.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, f, "max"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, af)
          ], 8, Zh),
          r("text", {
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: u.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(i(f.label)), 9, sf),
          f.responseCount ? (_(), k("text", {
            key: 0,
            x: x.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: u.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(f.responseCount), 9, of)) : z("", !0)
        ], 64))), 128)),
        e.showLegend ? (_(), w("g", {
          key: 0,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          r("g", rf, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: u.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, cf),
            r("text", {
              x: "10",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, df)
          ]),
          r("g", uf, [
            y[0] || (y[0] = r("rect", {
              x: "-6",
              y: "-6",
              width: "12",
              height: "12",
              fill: "rgba(198, 125, 255, 0.15)",
              stroke: "#C67DFF",
              "stroke-width": "1.5",
              rx: "2"
            }, null, -1)),
            r("text", {
              x: "10",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, hf)
          ]),
          r("g", ff, [
            y[1] || (y[1] = r("rect", {
              x: "-6",
              y: "-6",
              width: "12",
              height: "12",
              fill: "rgba(198, 125, 255, 0.15)",
              stroke: "#C67DFF",
              "stroke-width": "1.5",
              rx: "2"
            }, null, -1)),
            r("text", {
              x: "10",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, gf)
          ]),
          r("g", pf, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: u.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, mf),
            r("text", {
              x: "10",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, bf)
          ]),
          r("g", vf, [
            y[2] || (y[2] = r("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#f97316",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            r("text", {
              x: "18",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, yf)
          ]),
          r("g", _f, [
            y[3] || (y[3] = r("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "2.5"
            }, null, -1)),
            r("text", {
              x: "18",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, xf)
          ])
        ], 8, lf)) : z("", !0)
      ], 44, Oh))
    ]));
  }
}), Si = /* @__PURE__ */ it(kf, [["__scopeId", "data-v-e792fb9f"]]), wf = ["viewBox"], Cf = ["transform"], $f = ["x", "y", "width", "height", "fill", "stroke"], Mf = ["y", "fill"], Sf = ["y", "fill"], Df = ["x1", "y1", "x2", "y2", "stroke"], Af = ["x1", "y1", "x2", "y2", "stroke"], Tf = ["points", "fill"], Bf = ["x1", "y1", "x2", "y2", "stroke"], Lf = ["x", "y", "fill"], Ff = ["x", "y", "fill", "transform"], Ef = ["x1", "y1", "x2", "y2", "stroke"], If = ["points", "fill"], Pf = ["x1", "y1", "x2", "y2", "stroke"], Rf = ["x", "y", "fill"], Of = ["x", "y", "fill"], zf = ["d"], Vf = ["x", "y", "width", "height", "onMouseenter"], Nf = ["x1", "y1", "x2", "y2"], Wf = ["x", "y"], Hf = ["x1", "y1", "x2", "y2"], jf = ["x", "y"], Yf = ["x1", "y1", "x2", "y2"], Kf = ["x", "y"], qf = ["x1", "y1", "x2", "y2"], Uf = ["x", "y"], Xf = ["x1", "y1", "x2", "y2"], Gf = ["x", "y"], Zf = ["x1", "y1", "x2", "y2"], Qf = ["x", "y"], Jf = ["transform"], tg = { transform: "translate(-220, 0)" }, eg = ["fill"], ng = { transform: "translate(-140, 0)" }, ag = ["fill"], sg = { transform: "translate(-80, 0)" }, og = ["fill"], ig = { transform: "translate(-20, 0)" }, lg = ["fill"], rg = { transform: "translate(60, 0)" }, cg = ["fill"], dg = { transform: "translate(130, 0)" }, ug = ["fill"], hg = { transform: "translate(180, 0)" }, fg = ["fill"], gg = /* @__PURE__ */ Z({
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
    interactive: { type: Boolean, default: !0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a } = ut(dt(n, "theme")), s = D(() => ({
      // Tooltip
      tooltipBg: a.value ? "rgba(26, 26, 29, 0.98)" : "rgba(15, 23, 42, 0.95)",
      tooltipBorder: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
      tooltipText: a.value ? "#f8f9fa" : "#f1f5f9",
      tooltipTextSecondary: a.value ? "#d1d5db" : "#e2e8f0",
      // Axis
      axis: a.value ? "#9ca3af" : "#475569",
      // Grid
      gridLine: a.value ? "#374151" : "#e5e7eb",
      // Ticks
      tickLine: a.value ? "#4b5563" : "#cbd5e1",
      tickText: a.value ? "#9ca3af" : "#64748b",
      // Labels
      labelText: a.value ? "#d1d5db" : "#475569",
      legendText: a.value ? "#d1d5db" : "#475569"
    })), h = nt({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), i = D(() => n.chartWidth - n.chartMargin * 2), l = D(() => n.chartHeight - n.chartMargin - n.chartBottomMargin), d = D(() => i.value / 10 * 0.6), c = D(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const G = Math.max(...n.histogram.map((j) => j.count || 0), 1), K = Math.max(1, Math.ceil(G * 0.2));
      return G + K;
    }), u = D(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const G = n.averageScore || 0;
      let K = 0, j = 0;
      if (n.histogram.forEach((X) => {
        const ct = X.count || 0;
        K += ct;
        const pt = X.score - G;
        j += ct * (pt * pt);
      }), K === 0) return 1;
      const ot = j / K;
      return Math.sqrt(ot) || 1;
    }), h = (G, K, j) => {
      if (j === 0) return 0;
      const ot = 1 / (j * Math.sqrt(2 * Math.PI)), X = -0.5 * Math.pow((G - K) / j, 2);
      return ot * Math.exp(X);
    }, g = D(() => {
      if (!n.histogram || n.histogram.length === 0 || n.averageScore === 0 && u.value === 0) return null;
      const G = n.averageScore, K = u.value, j = 100, X = Math.max(...n.histogram.map((Ct) => Ct.count || 0), 1) / c.value * l.value;
      if (X <= 0) return null;
      let ct = 0;
      for (let Ct = 0; Ct <= j; Ct++) {
        const Mt = 1 + 9 * (Ct / j), Bt = h(Mt, G, K);
        Bt > ct && (ct = Bt);
      }
      if (ct <= 0) return null;
      const pt = X / ct, Q = [];
      for (let Ct = 0; Ct <= j; Ct++) {
        const Mt = 1 + 9 * (Ct / j), Bt = h(Mt, G, K) * pt, ee = f(Mt);
        if (ee !== null) {
          const sa = n.chartHeight - n.chartBottomMargin - Bt;
          Q.push(`${Ct === 0 ? "M" : "L"} ${ee} ${sa}`);
        }
      }
      return Q.join(" ");
    }), y = D(() => {
      if (!n.histogram || n.histogram.length === 0) return [];
      const G = i.value / 10;
      return n.histogram.map((K, j) => {
        const ot = n.chartMargin + (j + 0.5) * G, X = K.count > 0 ? K.count / c.value * l.value : 0, ct = n.chartHeight - n.chartBottomMargin - X;
        return {
          score: K.score,
          count: K.count,
          x: ot,
          y: ct,
          height: X
        };
      });
    }), f = (G) => {
      if (G < 1 || G > 10) return null;
      const K = i.value / 10;
      return n.chartMargin + (G - 0.5) * K;
    }, m = D(() => f(n.minScore)), v = D(() => f(n.maxScore)), p = D(() => f(n.q1Score)), b = D(() => f(n.medianScore)), x = D(() => f(n.q3Score)), w = D(() => f(n.averageScore)), M = D(() => n.minScore), C = D(() => n.maxScore), $ = D(() => n.q1Score), S = D(() => n.medianScore), L = D(() => n.q3Score), T = D(() => n.averageScore), B = D(() => {
      const G = [], K = n.chartMargin - 8, j = 18;
      p.value !== null && G.push({
        x: p.value,
        y: K,
        value: n.q1Score,
        label: `Q1: ${I.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), b.value !== null && G.push({
        x: b.value,
        y: K - j,
        value: n.medianScore,
        label: `Median: ${N.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), w.value !== null && G.push({
        x: w.value,
        y: K - j,
        value: n.averageScore,
        label: `Avg: ${T.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), x.value !== null && G.push({
        x: x.value,
        y: K,
        value: n.q3Score,
        label: `Q3: ${Y.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), G.sort((ct, pt) => (ct.x || 0) - (pt.x || 0));
      const ot = [[], [], []];
      G.forEach((ct) => {
        if (ct.x === null) return;
        let pt = -1;
        for (let Q = 0; Q < ot.length; Q++) {
          let Ct = !1;
          for (const Mt of ot[Q]) {
            if (Mt.x === null) continue;
            const Bt = Math.abs(ct.x - Mt.x), ee = (ct.width + Mt.width) / 2 + 10;
            if (Bt < ee) {
              Ct = !0;
              break;
            }
          }
          if (!Ct) {
            pt = Q;
            break;
          }
        }
        pt === -1 && (pt = ot.length - 1), ct.y = K - pt * j, ot[pt].push(ct);
      });
      const X = 15;
      return G.forEach((ct) => {
        ct.y < X && (ct.y = X);
      }), G;
    }), E = (G) => B.value.find((j) => j.id === G)?.y || n.chartMargin - 10, I = D(() => {
      const G = [];
      for (let j = 0; j <= 5; j++) {
        const ot = Math.round(c.value / 5 * j), X = n.chartHeight - n.chartBottomMargin - j / 5 * l.value;
        G.push({ value: ot, y: X });
      }
      return G;
    }), V = (G, K) => {
      n.interactive && N(G, K);
    }, Y = () => {
      n.interactive && rt();
    }, N = (G, K) => {
      const j = G.currentTarget.closest("svg");
      if (!j) return;
      const ot = j.getBoundingClientRect(), X = j.createSVGPoint();
      X.x = G.clientX - ot.left, X.y = G.clientY - ot.top;
      const ct = `Score: ${K.score}`, pt = `Count: ${K.count}`, Q = 120, Ct = 48;
      o.value = {
        visible: !0,
        x: X.x,
        y: X.y - 20,
        title: ct,
        text: pt,
        width: Q,
        height: Ct
      };
    }, tt = (G) => {
      if (n.interactive && o.value.visible) {
        const K = G.currentTarget, j = K.getBoundingClientRect(), ot = K.createSVGPoint();
        ot.x = G.clientX - j.left, ot.y = G.clientY - j.top, o.value.x = ot.x, o.value.y = ot.y - 20;
      }
    }, et = () => {
      o.value.visible = !1;
    }, rt = () => {
      o.value.visible = !1;
    };
    return t({ isDark: a }), (G, K) => (_(), k("div", {
      class: W(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (_(), w("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: gt(`min-height: ${e.chartHeight}px;`),
        onMousemove: tt,
        onMouseleave: et
      }, [
        e.interactive && o.value.visible ? (_(), k("g", {
          key: 0,
          transform: `translate(${o.value.x}, ${o.value.y})`
        }, [
          r("rect", {
            x: -o.value.width / 2,
            y: -o.value.height - 10,
            width: o.value.width,
            height: o.value.height,
            fill: s.value.tooltipBg,
            rx: "8",
            stroke: s.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, $f),
          r("text", {
            x: "0",
            y: -o.value.height + 8,
            "text-anchor": "middle",
            fill: s.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(o.value.title), 9, Mf),
          r("text", {
            x: "0",
            y: -o.value.height + 26,
            "text-anchor": "middle",
            fill: s.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(o.value.text), 9, Sf)
        ], 8, Cf)) : z("", !0),
        (_(!0), k(q, null, at(I.value, (j, ot) => (_(), k("line", {
          key: `grid-${ot}`,
          x1: e.chartMargin,
          y1: G.y,
          x2: e.chartWidth - e.chartMargin,
          y2: G.y,
          stroke: u.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Df))), 128)),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, Af),
        r("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: s.value.axis
        }, null, 8, Tf),
        (_(!0), k(q, null, at(I.value, (j, ot) => (_(), k(q, {
          key: `y-tick-${ot}`
        }, [
          r("line", {
            x1: e.chartMargin - 6,
            y1: G.y,
            x2: e.chartMargin,
            y2: G.y,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Bf),
          r("text", {
            x: e.chartMargin - 12,
            y: G.y + 4,
            "text-anchor": "end",
            fill: u.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(j.value), 9, Lf)
        ], 64))), 128)),
        r("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: u.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, " Count ", 8, Ff),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, Ef),
        r("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: s.value.axis
        }, null, 8, If),
        (_(!0), k(q, null, at(y.value, (j, ot) => (_(), k(q, {
          key: `tick-${ot}`
        }, [
          r("line", {
            x1: j.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: G.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Pf),
          r("text", {
            x: j.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: u.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(j.score), 9, Rf)
        ], 64))), 128)),
        r("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: u.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, Of),
        g.value ? (_(), k("path", {
          key: 1,
          d: g.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, zf)) : z("", !0),
        (_(!0), k(q, null, at(y.value, (j, ot) => (_(), k("rect", {
          key: `bar-${ot}`,
          x: j.x - d.value / 2,
          y: j.y,
          width: d.value,
          height: j.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (X) => V(X, j),
          onMouseleave: Y,
          style: gt({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, Vf))), 128)),
        m.value ? (_(), k("line", {
          key: 2,
          x1: m.value,
          y1: e.chartMargin,
          x2: M.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Nf)) : z("", !0),
        m.value ? (_(), k("text", {
          key: 3,
          x: m.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + A(M.value.toFixed(1)), 9, Wf)) : z("", !0),
        p.value ? (_(), k("line", {
          key: 4,
          x1: p.value,
          y1: e.chartMargin,
          x2: p.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Hf)) : z("", !0),
        p.value ? (_(), k("text", {
          key: 5,
          x: p.value,
          y: E("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + A($.value.toFixed(1)), 9, jf)) : z("", !0),
        b.value ? (_(), k("line", {
          key: 6,
          x1: b.value,
          y1: e.chartMargin,
          x2: S.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Yf)) : z("", !0),
        b.value ? (_(), k("text", {
          key: 7,
          x: b.value,
          y: E("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + A(S.value.toFixed(1)), 9, Kf)) : z("", !0),
        w.value ? (_(), k("line", {
          key: 8,
          x1: w.value,
          y1: e.chartMargin,
          x2: B.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, sg)) : z("", !0),
        B.value ? (_(), w("text", {
          key: 8,
          x: B.value,
          y: J("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + A(T.value.toFixed(1)), 9, Uf)) : z("", !0),
        x.value ? (_(), k("line", {
          key: 10,
          x1: x.value,
          y1: e.chartMargin,
          x2: L.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Xf)) : z("", !0),
        x.value ? (_(), k("text", {
          key: 11,
          x: x.value,
          y: E("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + A(L.value.toFixed(1)), 9, Gf)) : z("", !0),
        v.value ? (_(), k("line", {
          key: 12,
          x1: v.value,
          y1: e.chartMargin,
          x2: C.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Zf)) : z("", !0),
        v.value ? (_(), k("text", {
          key: 13,
          x: v.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + A(C.value.toFixed(1)), 9, Qf)) : z("", !0),
        e.showLegend ? (_(), k("g", {
          key: 14,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          r("g", tg, [
            K[0] || (K[0] = r("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "2.5"
            }, null, -1)),
            r("text", {
              x: "24",
              y: "4",
              fill: u.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Gaussian ", 8, eg)
          ]),
          r("g", ng, [
            K[1] || (K[1] = r("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#5d4b93",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            r("text", {
              x: "24",
              y: "4",
              fill: u.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, ag)
          ]),
          r("g", sg, [
            K[2] || (K[2] = r("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#a855f7",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            r("text", {
              x: "24",
              y: "4",
              fill: u.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, og)
          ]),
          r("g", ig, [
            K[3] || (K[3] = r("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "3",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            r("text", {
              x: "24",
              y: "4",
              fill: u.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, lg)
          ]),
          r("g", rg, [
            K[4] || (K[4] = r("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            r("text", {
              x: "24",
              y: "4",
              fill: u.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, cg)
          ]),
          r("g", dg, [
            K[5] || (K[5] = r("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#7c3aed",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            r("text", {
              x: "24",
              y: "4",
              fill: u.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, ug)
          ]),
          r("g", hg, [
            K[6] || (K[6] = r("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#C67DFF",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            r("text", {
              x: "24",
              y: "4",
              fill: u.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, fg)
          ])
        ], 8, Jf)) : z("", !0)
      ], 44, wf))
    ], 2));
  }
}), Di = /* @__PURE__ */ it(gg, [["__scopeId", "data-v-5bd71051"]]), pg = 639, Ai = 1024;
function xo(e) {
  return e < 640 ? "mobile" : e <= Ai ? "tablet" : "desktop";
}
function mg() {
  const e = st(
    typeof window > "u" ? "desktop" : xo(window.innerWidth)
  ), t = () => {
    typeof window > "u" || (e.value = Ts(window.innerWidth));
  };
  let n = null, a = null, s = null, o = null;
  te(() => {
    typeof window > "u" || (t(), n = window.matchMedia(`(max-width: ${pg}px)`), a = window.matchMedia(`(min-width: 640px) and (max-width: ${Ai}px)`), s = window.matchMedia("(min-width: 1025px)"), o = () => {
      t();
    }, n.addEventListener("change", o), a.addEventListener("change", o), s.addEventListener("change", o));
  }), Me(() => {
    !o || !n || !a || !s || (n.removeEventListener("change", o), a.removeEventListener("change", o), s.removeEventListener("change", o));
  });
  const i = D(() => e.value === "mobile"), l = D(() => e.value === "tablet"), d = D(() => e.value === "desktop");
  return {
    breakpoint: e,
    isMobile: i,
    isTablet: l,
    isDesktop: d
  };
}
const bg = { class: "chart-container" }, vg = {
  key: 1,
  class: "chart-wrapper"
}, yg = /* @__PURE__ */ Z({
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
    ns.use([Ui, Xi, Gi, Zi]);
    const n = e, { isDark: a, colors: s } = ut(dt(n, "theme")), { breakpoint: o } = mg(), i = st(null), l = st(!0), d = st(!1);
    let c = null;
    const u = {
      animation: { duration: 1e3, easing: "cubicOut" },
      margins: { left: "2%", right: "2%", top: "2%", bottom: "2%" },
      node: { width: 70, gap: 20, align: "left", iterations: 64 },
      style: {
        shadowBlur: 4,
        shadowColor: "rgba(139, 92, 246, 0.15)"
      }
    }, h = D(() => {
      const C = o.value;
      return C === "mobile" ? {
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
      } : C === "tablet" ? {
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
        nodeGap: n.nodeGap,
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
    }), g = (C, $) => {
      const S = C.trim();
      if (!S || $ < 1) return C;
      if (S.length <= $) return S;
      const L = [];
      let T = 0;
      for (; T < S.length; ) {
        const B = Math.min(T + $, S.length);
        if (B >= S.length) {
          const V = S.slice(T).trim();
          V && L.push(V);
          break;
        }
        const E = S.slice(T, B), I = E.lastIndexOf(" ");
        if (I > 0)
          for (L.push(S.slice(T, T + I).trim()), T += I; T < S.length && S[T] === " "; ) T += 1;
        else
          L.push(E), T = B;
      }
      return L.join(`
`);
    }, y = [
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
    ], p = () => {
      const C = n.data.links.filter(
        (T) => T.source && T.target && typeof T.value == "number"
      ), $ = Math.max(...C.map((T) => T.value), 1), S = Math.max(1, $ * 0.01), L = C.map((T) => ({
        ...T,
        originalValue: T.value,
        value: T.value < $ * 0.01 ? S : T.value
      }));
      return {
        nodes: n.data.nodes.filter((T) => T.name),
        links: L
      };
    }, b = (C) => C.map(($, S) => ({
      ...$,
      itemStyle: {
        color: n.nodeColors[$.name] || y[S % y.length],
        borderRadius: 8
      }
    })), v = (C) => ($) => {
      const S = $.dataType === "node", L = s.value.tooltipText, T = a.value ? "#d1d5db" : "#e2e8f0";
      if (S) {
        const Y = C.filter((et) => et.target === $.name), N = C.filter((et) => et.source === $.name), tt = Y.length > 0 ? Y.reduce((et, rt) => et + (rt.originalValue || rt.value), 0) : N.reduce((et, rt) => et + (rt.originalValue || rt.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${L};">${$.name}</div><div style="color: ${T}; font-size: 12px;">Count: ${tt.toLocaleString()}</div>`;
      }
      const B = $.data?.source || $.source || "Unknown", E = $.data?.target || $.target || "Unknown", I = $.data?.originalValue || $.data?.value || $.value || 0, V = $.data?.label || `${I.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${L};">${B} → ${E}</div><div style="color: ${T}; font-size: 12px;">Flow: ${V}</div>`;
    }, p = () => {
      if (!c || !n.data.nodes?.length || !n.data.links?.length) return;
      const C = h.value, $ = a.value ? "rgb(34, 34, 45)" : "rgb(240, 240, 242)", S = a.value ? "rgb(34, 34, 45)" : "rgb(240, 240, 242)";
      try {
        const { nodes: L, links: T } = f(), B = m(L), E = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: v(T),
            backgroundColor: s.value.tooltipBg,
            borderColor: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
            borderWidth: 1,
            borderRadius: 8,
            padding: [10, 14],
            textStyle: {
              color: o.value.tooltipText,
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
              data: B,
              links: T,
              emphasis: {
                focus: "adjacency",
                lineStyle: {
                  color: S,
                  opacity: 1
                }
              },
              levels: [
                {
                  depth: 0,
                  itemStyle: {
                    color: "#8b5cf6",
                    borderRadius: 8
                  },
                  lineStyle: { color: $, opacity: 1 }
                },
                {
                  depth: 1,
                  itemStyle: {
                    color: "#8b5cf6",
                    borderRadius: 8
                  },
                  lineStyle: { color: $, opacity: 1 }
                }
              ],
              lineStyle: {
                color: $,
                curveness: 0.5,
                opacity: 1
              },
              itemStyle: u.style,
              label: {
                show: !0,
                position: C.labelPosition,
                /** Dark: external labels (e.g. mobile `right`) use light text; inside nodes stay dark for contrast on pastel bars. */
                color: C.labelPosition === "right" && a.value ? o.value.textPrimary : "#0f172a",
                fontWeight: 600,
                fontSize: C.labelFontSize,
                ...C.labelWrap && C.labelLineHeight > 0 ? { lineHeight: C.labelLineHeight } : {},
                ...C.labelWrap && C.labelTextWidth > 0 ? { width: C.labelTextWidth, overflow: "none" } : {},
                ...C.labelDistance > 0 ? { distance: C.labelDistance } : {},
                fontFamily: "'DM Sans', sans-serif",
                formatter: (I) => {
                  const V = I.name || "";
                  if (C.labelWrap)
                    return g(V, Math.max(4, C.labelCharsPerLine));
                  const Y = C.labelMaxChars;
                  return V.length > Y ? `${V.substring(0, Y)}...` : V;
                }
              },
              edgeLabel: C.edgeLabelShow ? {
                show: !0,
                fontSize: C.edgeLabelFontSize,
                color: o.value.textSecondary,
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                formatter: (I) => {
                  const V = I.data?.originalValue || I.value || 0;
                  return I.data?.label || `${V.toLocaleString()}`;
                }
              } : { show: !1 },
              nodeAlign: u.node.align,
              nodeGap: C.nodeGap,
              nodeWidth: C.nodeWidth,
              layoutIterations: u.node.iterations,
              orient: C.orient,
              draggable: !1,
              ...C.contentMargins
            }
          ],
          backgroundColor: "transparent",
          animation: !0,
          animationDuration: u.animation.duration,
          animationEasing: u.animation.easing
        };
        c.setOption(E), c.resize();
      } catch (L) {
        console.error("Error setting Sankey chart options:", L), d.value = !0;
      }
    }, f = async () => {
      if (i.value)
        try {
          c = ns.init(i.value), p(), window.addEventListener("resize", w);
        } catch (C) {
          console.error("Error initializing Sankey chart:", C), d.value = !0;
        } finally {
          l.value = !1;
        }
    }, x = async (C = 40) => {
      await Et();
      for (let $ = 0; $ < C; $++) {
        if (i.value?.clientWidth && i.value.clientWidth > 0 && i.value?.clientHeight && i.value.clientHeight > 0)
          return await f();
        await new Promise((S) => setTimeout(S, 50));
      }
      await b(), setTimeout(w, 50);
    }, w = () => c?.resize(), M = () => {
      window.removeEventListener("resize", w), c && (c.dispose(), c = null);
    };
    return te(() => i.value && x()), Fo(M), Ft(() => n.data, p, { deep: !0 }), Ft(a, p), Ft(o, p), t({ isDark: a }), (C, $) => (_(), k("div", bg, [
      d.value ? (_(), k("div", {
        key: 0,
        class: "error-state",
        style: gt({ height: e.height })
      }, [...$[0] || ($[0] = [
        es('<div class="error-content" data-v-ccb2fb1d><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ccb2fb1d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-ccb2fb1d></path></svg><p class="error-title" data-v-ccb2fb1d>Chart could not be loaded</p><p class="error-description" data-v-ccb2fb1d>Please check the data format.</p></div>', 1)
      ])], 4)) : (_(), k("div", vg, [
        Kt(r("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content",
          style: gt({ height: e.height })
        }, null, 4), [
          [mn, !l.value]
        ]),
        Kt(r("div", {
          class: "loading-state",
          style: gt({ height: e.height })
        }, [...$[1] || ($[1] = [
          io('<div class="loading-container" data-v-eb927194><div class="sankey-loader" data-v-eb927194><div class="flow flow-1" data-v-eb927194></div><div class="flow flow-2" data-v-eb927194></div><div class="flow flow-3" data-v-eb927194></div><div class="flow flow-4" data-v-eb927194></div></div><p class="loading-text" data-v-eb927194>Loading Sankey diagram...</p></div>', 1)
        ])], 4), [
          [mn, l.value]
        ])
      ]))
    ]));
  }
}), Se = /* @__PURE__ */ it(yg, [["__scopeId", "data-v-ccb2fb1d"]]), _g = ["open"], xg = { class: "card-header metric-collapsible__summary" }, kg = { class: "header-content metric-header-content" }, wg = { class: "metric-header-content__main" }, Cg = { class: "metric-header-content__text" }, $g = {
  key: 0,
  class: "card-title"
}, Mg = {
  key: 0,
  class: "card-subtitle"
}, Hg = {
  key: 0,
  class: "metric-header-content__export"
}, Dg = {
  key: 0,
  class: "cmc-header-aside"
}, Ag = { class: "chart-metric-container__body" }, Tg = {
  key: 1,
  class: "chart-metric-container chart-metric-container--static"
}, Bg = { class: "card-header" }, Lg = { class: "header-content metric-header-content" }, Fg = { class: "metric-header-content__main" }, Eg = { class: "metric-header-content__text" }, Ig = {
  key: 0,
  class: "card-title"
}, Pg = {
  key: 0,
  class: "card-subtitle"
}, Rg = {
  key: 0,
  class: "metric-header-content__export"
}, Og = {
  key: 0,
  class: "cmc-header-aside"
}, zg = { class: "chart-metric-container__body" }, Vg = /* @__PURE__ */ Z({
  __name: "ChartMetricContainer",
  props: {
    title: { default: "" },
    subtitle: {},
    collapsible: { type: Boolean, default: !0 },
    defaultOpen: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, n = st(t.defaultOpen), a = Aa(), s = D(() => a.headerExport ? !t.collapsible || n.value : !1);
    Ft(
      () => t.defaultOpen,
      (i) => {
        t.collapsible && (n.value = i);
      }
    );
    function o(i) {
      const l = i.currentTarget;
      l?.tagName === "DETAILS" && (n.value = l.open);
    }
    return (i, l) => e.collapsible ? (_(), k("details", {
      key: 0,
      class: "chart-metric-container metric-collapsible",
      open: n.value,
      onToggle: s
    }, [
      r("summary", xg, [
        r("div", kg, [
          r("div", wg, [
            r("div", Cg, [
              wt(i.$slots, "title", {}, () => [
                e.title ? (_(), k("h3", $g, A(e.title), 1)) : z("", !0)
              ], !0),
              e.subtitle ? (_(), k("p", Mg, A(e.subtitle), 1)) : z("", !0),
              wt(i.$slots, "headerAppend", {}, void 0, !0)
            ]),
            o.value ? (_(), w("div", Hg, [
              $t(i.$slots, "headerExport", {}, void 0, !0)
            ])) : z("", !0)
          ]),
          i.$slots.headerAside ? (_(), k("div", Dg, [
            wt(i.$slots, "headerAside", {}, void 0, !0)
          ])) : z("", !0)
        ]),
        l[0] || (l[0] = r("svg", {
          class: "metric-collapsible__chevron",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [
          r("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M19 9l-7 7-7-7"
          })
        ], -1))
      ]),
      r("div", Ag, [
        wt(i.$slots, "default", {}, void 0, !0)
      ])
    ], 40, _g)) : (_(), k("div", Tg, [
      r("div", Bg, [
        r("div", Lg, [
          r("div", Fg, [
            r("div", Eg, [
              wt(i.$slots, "title", {}, () => [
                e.title ? (_(), k("h3", Ig, A(e.title), 1)) : z("", !0)
              ], !0),
              e.subtitle ? (_(), k("p", Pg, A(e.subtitle), 1)) : z("", !0),
              wt(i.$slots, "headerAppend", {}, void 0, !0)
            ]),
            s.value ? (_(), k("div", Rg, [
              wt(i.$slots, "headerExport", {}, void 0, !0)
            ])) : z("", !0)
          ]),
          i.$slots.headerAside ? (_(), k("div", Og, [
            wt(i.$slots, "headerAside", {}, void 0, !0)
          ])) : z("", !0)
        ])
      ]),
      r("div", zg, [
        wt(i.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), ft = /* @__PURE__ */ it(Vg, [["__scopeId", "data-v-3ce6da66"]]);
function Ng(e, t) {
  return _(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
    })
  ]);
}
function Ni(e, t) {
  return _(), w("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
    })
  ]);
}
function qt(e, t) {
  return _(), w("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
    })
  ]);
}
function Wg(e, t) {
  return _(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
    }),
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
    })
  ]);
}
function Wi(e, t) {
  return _(), w("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "m19.5 8.25-7.5 7.5-7.5-7.5"
    })
  ]);
}
function Hg(e, t) {
  return _(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15.75 19.5 8.25 12l7.5-7.5"
    })
  ]);
}
function rp(e, t) {
  return _(), w("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "m8.25 4.5 7.5 7.5-7.5 7.5"
    })
  ]);
}
function cp(e, t) {
  return _(), w("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    })
  ]);
}
function Kg(e, t) {
  return _(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
    })
  ]);
}
function ji(e, t) {
  return _(), w("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    })
  ]);
}
const dp = {
  key: 0,
  class: "footer-divider"
}, Ug = {
  key: 0,
  class: "export-label"
}, Xg = { class: "export-buttons" }, Gg = ["disabled"], Zg = {
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
}, np = /* @__PURE__ */ Z({
  __name: "FooterExport",
  props: {
    formats: { default: () => ["pdf", "csv"] },
    loading: { type: Boolean, default: !1 },
    variant: { default: "footer" }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = D(() => n.variant === "footer" ? "footer" : "div"), o = D(
      () => n.variant === "footer" ? "chart-footer" : "chart-export-inline"
    ), i = (d) => n.formats.includes(d), l = (d) => {
      n.loading || a("export", d);
    };
    return (d, c) => (_(), nt(je(s.value), {
      class: W(o.value)
    }, {
      default: P(() => [
        e.variant === "footer" ? (_(), k("div", qg)) : z("", !0),
        r("div", {
          class: W(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (_(), k("span", Ug, "Export")) : z("", !0),
          r("div", Xg, [
            i("pdf") ? (_(), k("button", {
              key: 0,
              type: "button",
              class: W(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: c[0] || (c[0] = (u) => l("pdf"))
            }, [
              e.loading ? (_(), k("svg", Zg, [...c[2] || (c[2] = [
                r("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                r("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (_(), k("svg", Qg, [...c[3] || (c[3] = [
                r("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }, null, -1),
                r("polyline", { points: "14 2 14 8 20 8" }, null, -1),
                r("line", {
                  x1: "16",
                  y1: "13",
                  x2: "8",
                  y2: "13"
                }, null, -1),
                r("line", {
                  x1: "16",
                  y1: "17",
                  x2: "8",
                  y2: "17"
                }, null, -1),
                r("polyline", { points: "10 9 9 9 8 9" }, null, -1)
              ])])),
              c[4] || (c[4] = r("span", null, "PDF", -1))
            ], 10, Gg)) : z("", !0),
            i("csv") ? (_(), k("button", {
              key: 1,
              type: "button",
              class: W(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: c[1] || (c[1] = (u) => l("csv"))
            }, [
              e.loading ? (_(), k("svg", tp, [...c[5] || (c[5] = [
                r("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                r("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (_(), k("svg", ep, [...c[6] || (c[6] = [
                r("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }, null, -1),
                r("polyline", { points: "14 2 14 8 20 8" }, null, -1),
                r("line", {
                  x1: "12",
                  y1: "18",
                  x2: "12",
                  y2: "12"
                }, null, -1),
                r("line", {
                  x1: "9",
                  y1: "15",
                  x2: "15",
                  y2: "15"
                }, null, -1)
              ])])),
              c[7] || (c[7] = r("span", null, "CSV", -1))
            ], 10, Jg)) : z("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Dt = /* @__PURE__ */ it(np, [["__scopeId", "data-v-32629e66"]]), ap = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, sp = {
  key: 0,
  class: "flex min-h-[320px] flex-col items-center justify-center px-4"
}, op = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, ip = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, lp = { class: "w-full shrink-0 sm:pr-2" }, rp = {
  key: 2,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, cp = { class: "max-w-[360px] text-center" }, dp = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, up = /* @__PURE__ */ Z({
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
  setup(e, { expose: t, emit: n }) {
    const a = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, s = e, o = n, i = (f) => {
      o("export", f);
    }, l = [30, 50, 70, 50, 40], d = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], c = dt(s, "theme"), u = dt(s, "options"), { isDark: h } = ut(c), g = (f) => {
      const m = new Date(f), v = String(m.getDate()).padStart(2, "0"), p = String(m.getMonth() + 1).padStart(2, "0");
      return `${v}-${p}`;
    }, y = D(() => {
      const f = s.data?.agents_by_day || {}, m = Object.keys(f).sort();
      if (m.length === 0)
        return { labels: [], datasets: [] };
      const v = m.map((M) => g(M)), p = /* @__PURE__ */ new Set();
      for (const M of Object.values(f))
        for (const C of Object.keys(M))
          p.add(C);
      const b = Array.from(p), x = (M) => M, w = b.map((M) => ({
        label: M,
        data: m.map((C) => f[C]?.[M] || 0),
        backgroundColor: `${a[M] || "#94a3b8"}80`,
        borderColor: x(a[M] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: v,
        datasets: x
      };
    });
    return t({ isDark: h }), (p, b) => (_(), tt(gt, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1
    }, St({
      default: P(() => [
        r("div", ap, [
          e.loading ? (_(), k("div", sp, [
            r("div", op, [
              (_(), k(q, null, at(l, (v, p) => r("div", {
                key: p,
                class: W(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", d[p]]),
                style: gt({ height: `${v}%` })
              }, null, 6)), 64))
            ]),
            m[0] || (m[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading chart data... ", -1))
          ])) : y.value.labels && y.value.labels.length ? (_(), k("section", ip, [
            r("div", lp, [
              R(he, {
                data: y.value,
                stacked: !0,
                theme: c.value,
                options: u.value
              }, null, 8, ["data", "theme", "options"])
            ])
          ])) : (_(), k("section", rp, [
            r("div", cp, [
              r("div", dp, [
                R(F(Wt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
              ]),
              m[1] || (m[1] = r("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agents data per day ", -1)),
              m[2] || (m[2] = r("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see daily agent interactions. ", -1))
            ])
          ]))
        ])
      ]),
      _: 2
    }, [
      e.enableExport && !e.loading ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Bt), {
            variant: "inline",
            loading: e.exportLoading,
            onExport: i
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), hp = { class: "flex w-full min-w-0 flex-col items-center gap-2 rounded-2xl border border-[color:var(--kiut-border-light,rgba(0,0,0,0.05))] bg-[color:var(--kiut-bg-stats-badge,#fafafa)] p-4 text-center font-sans text-[color:var(--kiut-text-secondary,#64748b)]" }, fp = { class: "flex w-full min-w-0 justify-center" }, gp = { class: "flex max-w-full min-w-0 items-center gap-2" }, pp = { class: "min-w-0 truncate text-[12px] leading-normal" }, mp = { class: "text-[16px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, bp = {
  key: 0,
  class: "min-w-0 w-full truncate text-[12px] leading-normal"
}, lt = /* @__PURE__ */ Z({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, n) => (_(), k("div", hp, [
      r("div", fp, [
        r("div", gp, [
          e.color ? (_(), k("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: gt({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : z("", !0),
          r("span", pp, A(e.title), 1)
        ])
      ]),
      r("p", mp, A(e.value), 1),
      e.subvalue ? (_(), k("p", bp, A(e.subvalue), 1)) : z("", !0)
    ]));
  }
}), vp = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, Rt = /* @__PURE__ */ Z({
  name: "Tag",
  __name: "Tag",
  props: {
    statusLive: { type: Boolean, default: void 0 },
    color: { default: "neutral" },
    outlined: { type: Boolean, default: !1 },
    label: {},
    labelConnected: { default: "Connected" },
    labelDisconnected: { default: "Disconnected" }
  },
  setup(e) {
    const t = e, n = D(
      () => t.statusLive === !0 || t.statusLive === !1
    ), a = D(
      () => t.statusLive === !0 ? t.labelConnected : t.labelDisconnected
    ), s = D(() => t.statusLive === !0 ? [
      "border border-emerald-200 bg-emerald-50",
      "dark:border-emerald-800/80 dark:bg-emerald-950/40"
    ] : [
      "border border-transparent bg-slate-100 dark:border-slate-700/80 dark:bg-slate-800/90"
    ]), o = D(() => t.statusLive === !0 ? "text-emerald-700 dark:text-emerald-300" : "text-[color:var(--kiut-text-primary)] dark:text-slate-300"), i = D(() => {
      const l = t.outlined;
      switch (t.color) {
        case "purple":
          return l ? "border border-violet-500 bg-transparent text-violet-700 dark:border-violet-400 dark:text-violet-300" : "border border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-700 dark:bg-violet-950/40 dark:text-violet-300";
        case "warning":
          return l ? "border border-amber-500 bg-transparent text-amber-800 dark:border-amber-400 dark:text-amber-200" : "border border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/35 dark:text-amber-200";
        case "success":
          return l ? "border border-emerald-500 bg-transparent text-emerald-800 dark:border-emerald-400 dark:text-emerald-200" : "border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/35 dark:text-emerald-200";
        case "danger":
          return l ? "border border-red-500 bg-transparent text-red-800 dark:border-red-400 dark:text-red-200" : "border border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/35 dark:text-red-200";
        case "orange":
          return l ? "border border-orange-500 bg-transparent text-orange-800 dark:border-orange-400 dark:text-orange-200" : "border border-orange-200 bg-orange-50 text-orange-800 dark:border-orange-800 dark:bg-orange-950/35 dark:text-orange-200";
        case "neutral":
        default:
          return l ? "border border-slate-400 bg-transparent text-[color:var(--kiut-text-primary)] dark:border-slate-500 dark:text-slate-200" : "border border-slate-200 bg-slate-100 text-[color:var(--kiut-text-primary)] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200";
      }
    });
    return (l, d) => n.value ? (_(), k("span", {
      key: 0,
      role: "status",
      class: W(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", s.value])
    }, [
      e.statusLive === !0 ? (_(), k("span", vp, [...d[0] || (d[0] = [
        r("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        r("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : z("", !0),
      r("span", {
        class: W(["min-w-0 flex-1 text-center", o.value])
      }, A(a.value), 3)
    ], 2)) : (_(), w("span", {
      key: 1,
      class: W(["inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight", i.value])
    }, [
      wt(l.$slots, "default", {}, () => [
        bt(A(e.label), 1)
      ])
    ], 2));
  }
}), U = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), yt = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), ye = (e) => {
  if (e == null) return "0";
  const t = Math.abs(e), n = e < 0 ? "-" : "";
  return t >= 1e6 ? `${n}${(t / 1e6).toFixed(2)}M` : t > 99999 ? `${n}${(t / 1e3).toFixed(1)}K` : `${n}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(t)}`;
}, yp = {
  class: "kiut-table-root table-section flex w-full min-w-0 flex-col rounded-xl font-sans antialiased text-[color:var(--kiut-text-primary,#1e293b)]",
  "data-component": "kiut-table"
}, _p = { class: "overflow-x-auto" }, xp = { class: "w-full table-auto border-collapse text-left text-[14px] leading-normal" }, kp = /* @__PURE__ */ Z({
  __name: "Table",
  props: {
    columns: {},
    rows: {},
    maxVisibleRows: { default: 3 },
    viewMoreLabel: { default: "View more ({count} rows)" },
    viewLessLabel: { default: "View less" },
    rowKey: { type: [String, Function], default: "id" }
  },
  setup(e) {
    const t = e, n = nt(!1), a = "—";
    function o(b) {
      return b == null || b === "" ? a : String(b);
    }
    function s(b) {
      return b === "center" ? "text-center" : b === "right" ? "text-right" : "text-left";
    }
    function i(b) {
      return `cell-${b}`;
    }
    function l(m, v) {
      return m[v];
    }
    function d(b, v) {
      if (typeof t.rowKey == "function")
        return t.rowKey(m);
      const p = m[t.rowKey];
      return typeof p == "string" || typeof p == "number" ? p : v;
    }
    function c(b, v) {
      return d(b, v);
    }
    const u = D(() => t.rows?.length ?? 0), h = D(() => u.value > t.maxVisibleRows), g = D(() => Math.max(0, u.value - t.maxVisibleRows)), y = D(() => t.rows?.length ? n.value || !h.value ? t.rows : t.rows.slice(0, t.maxVisibleRows) : []), f = D(
      () => t.viewMoreLabel.replace(/\{count\}/g, String(g.value))
    );
    return (m, v) => (_(), k("div", yp, [
      r("div", _p, [
        r("table", xp, [
          r("thead", null, [
            r("tr", null, [
              (_(!0), k(q, null, at(e.columns, (p) => (_(), k("th", {
                key: p.key,
                scope: "col",
                class: W(["kiut-table-th whitespace-nowrap px-3 py-2 text-left text-[#9191a1]", [o(p.align), p.headerClass]])
              }, A(p.label), 3))), 128))
            ])
          ]),
          r("tbody", null, [
            (_(!0), k(q, null, at(y.value, (p, b) => (_(), k("tr", {
              key: c(p, b)
            }, [
              (_(!0), k(q, null, at(e.columns, (x) => (_(), k("td", {
                key: `${b}-${x.key}`,
                class: W(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [o(x.align), x.cellClass]])
              }, [
                wt(m.$slots, i(x.key), {
                  row: p,
                  column: x,
                  value: l(p, x.key)
                }, () => [
                  bt(A(s(l(p, x.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ]),
      h.value ? (_(), w("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: v[0] || (v[0] = (p) => n.value = !n.value)
      }, [
        bt(A(n.value ? e.viewLessLabel : f.value) + " ", 1),
        (_(), k("svg", {
          class: W(["view-more-icon", { "view-more-icon-rotated": n.value }]),
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [...v[1] || (v[1] = [
          r("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M19 9l-7 7-7-7"
          }, null, -1)
        ])], 2))
      ])) : z("", !0)
    ]));
  }
}), qt = /* @__PURE__ */ it(kp, [["__scopeId", "data-v-58cfdc5e"]]), wp = {
  key: 0,
  class: "loading-state"
}, Cp = {
  key: 1,
  class: "error-state"
}, $p = { class: "error-content" }, Mp = { class: "error-description" }, Sp = {
  key: 2,
  class: "card-body"
}, Dp = { class: "chart-section" }, Ap = { class: "chart-wrapper" }, Tp = { class: "payment-success-summary" }, Bp = {
  key: 0,
  class: "booking-daily-section"
}, Lp = { class: "w-full min-w-0" }, Fp = { class: "font-medium" }, Ep = { class: "percentage-text" }, Ip = { class: "badges-container" }, Pp = {
  key: 0,
  class: "badges-container"
}, Rp = {
  key: 1,
  class: "percentage-text"
}, Op = { class: "badges-container" }, zp = {
  key: 1,
  class: "empty-state"
}, Vp = /* @__PURE__ */ Z({
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
    function n(f) {
      return f;
    }
    const a = e, s = t, o = (b) => {
      s("export", b);
    }, i = D(() => a.data?.booking_manager_by_day ? [...a.data.booking_manager_by_day].sort(
      (b, x) => new Date(b.date).getTime() - new Date(x.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "paymentInitiated", label: "Payment Initiated", align: "center" },
      { key: "paymentResults", label: "Payment Results", align: "left" },
      { key: "paymentValue", label: "Payment Value", align: "left" },
      { key: "outcomes", label: "Outcomes", align: "left" }
    ], d = D(
      () => i.value.map((b) => ({
        id: b.date,
        ...b
      }))
    ), c = D(() => a.data?.total_payment_success_value || []), u = D(() => {
      const b = c.value;
      return b.length === 0 ? f(0) : b.map((x) => `${x.currency} ${f(x.total_value)}`).join(" · ");
    }), h = (b) => b.payment_success_value || [], g = (b) => typeof b.payment_success_count == "number" ? b.payment_success_count : (b.payment_success_value || []).reduce((x, w) => x + (w.count || 0), 0), y = (b) => yt(b), f = (b) => b == null ? "0" : ye(b);
    D(() => (a.data?.total_payment_success_value || []).reduce((b, x) => b + (x.total_value || 0), 0));
    const m = D(() => {
      const b = a.data, x = b.total_booking_initiated || 0, w = b.total_booking_started || 0, M = b.total_payment_initiated || 0, C = b.total_not_found || 0, $ = b.total_cancelled || 0, S = b.total_no_pending_balance || 0, L = b.total_errors || 0, T = typeof b.total_payment_success == "number" ? b.total_payment_success : (b.total_payment_success_value || []).reduce((tt, et) => tt + (et.count || 0), 0), B = b.total_payment_failed || 0, E = Math.max(0, x - w), I = Math.max(0, w - M - C - $ - S - L), V = (tt, et) => {
        const rt = et > 0 ? Math.round(tt / et * 100) : 0;
        return `${U(tt)} (${rt}%)`;
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
      ], N = [];
      return w > 0 && N.push({
        source: "Initiated",
        target: "Started",
        value: w,
        label: V(w, x)
      }), E > 0 && N.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: E,
        label: V(E, x)
      }), M > 0 && N.push({
        source: "Started",
        target: "Payment Initiated",
        value: M,
        label: V(M, w)
      }), C > 0 && N.push({
        source: "Started",
        target: "Not Found",
        value: C,
        label: V(C, w)
      }), $ > 0 && N.push({
        source: "Started",
        target: "Cancelled",
        value: $,
        label: V($, w)
      }), S > 0 && N.push({
        source: "Started",
        target: "No Pending Balance",
        value: S,
        label: V(S, w)
      }), L > 0 && N.push({
        source: "Started",
        target: "Errors",
        value: L,
        label: V(L, w)
      }), I > 0 && N.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: I,
        label: V(I, w)
      }), T > 0 && N.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: T,
        label: V(T, M)
      }), B > 0 && N.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: B,
        label: V(B, M)
      }), { nodes: Y, links: N };
    }), v = {
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
    }, p = (b, x) => !x || x === 0 ? "0%" : `${Math.round(b / x * 100)}%`;
    return (b, x) => (_(), nt(ft, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis"
    }, St({
      default: P(() => [
        a.loading ? (_(), k("div", wp, [...x[0] || (x[0] = [
          r("div", { class: "loading-container" }, [
            r("div", { class: "chart-flow-loader" }, [
              r("div", { class: "flow-line flow-1" }),
              r("div", { class: "flow-line flow-2" }),
              r("div", { class: "flow-line flow-3" }),
              r("div", { class: "flow-line flow-4" }),
              r("div", { class: "flow-line flow-5" })
            ]),
            r("p", { class: "loading-text" }, "Loading booking data...")
          ], -1)
        ])])) : a.error ? (_(), k("div", Cp, [
          r("div", $p, [
            x[1] || (x[1] = r("div", { class: "error-icon-wrapper" }, [
              r("svg", {
                class: "error-icon",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [
                r("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                })
              ])
            ], -1)),
            x[2] || (x[2] = r("p", { class: "error-title" }, "Error loading data", -1)),
            r("p", Mp, A(a.error), 1)
          ])
        ])) : (_(), k("div", Sp, [
          r("section", Dp, [
            r("div", Ap, [
              R(Se, {
                data: m.value,
                "node-colors": v,
                height: "500px",
                "node-gap": 15
              }, null, 8, ["data"])
            ])
          ]),
          r("section", Tp, [
            R(lt, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: u.value
            }, null, 8, ["value"])
          ]),
          i.value.length > 0 ? (_(), k("section", Bp, [
            x[3] || (x[3] = r("div", { class: "section-header" }, [
              r("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            r("div", Lp, [
              R(qt, {
                columns: l,
                rows: d.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": P(({ row: w }) => [
                  r("span", Fp, A(F(Lt)(String(w.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": P(({ row: w }) => [
                  r("span", null, A(F(U)(Number(w.booking_initiated_count))), 1)
                ]),
                "cell-started": P(({ row: w }) => [
                  r("span", null, [
                    bt(A(F(U)(Number(w.booking_started_count))) + " ", 1),
                    r("span", Ep, " (" + A(p(Number(w.booking_started_count), Number(w.booking_initiated_count))) + ") ", 1)
                  ])
                ]),
                "cell-paymentInitiated": P(({ row: w }) => [
                  r("span", null, A(F(U)(Number(w.payment_initiated_count))), 1)
                ]),
                "cell-paymentResults": P(({ row: w }) => [
                  r("div", Ip, [
                    R(Rt, { color: "success" }, {
                      default: P(() => [
                        bt(" Success: " + A(F(U)(g(w))), 1)
                      ]),
                      _: 2
                    }, 1024),
                    R(Wt, { color: "danger" }, {
                      default: P(() => [
                        bt(" Failed: " + A(F(U)(Number(w.payment_failed_count) || 0)), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ])
                ]),
                "cell-paymentValue": P(({ row: w }) => [
                  h(w).length > 0 ? (_(), k("div", Pp, [
                    (_(!0), k(q, null, at(h(w), (M) => (_(), k("span", {
                      key: `${w.date}-${M.currency}`,
                      class: "badge badge-currency"
                    }, A(M.currency) + " " + A(y(M.total_value)), 1))), 128))
                  ])) : (_(), k("span", Rp, "N/A"))
                ]),
                "cell-outcomes": P(({ row: w }) => [
                  r("div", Op, [
                    R(Rt, { color: "danger" }, {
                      default: P(() => [
                        bt(" Not Found: " + A(w.not_found_count ? F(U)(Number(w.not_found_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024),
                    R(Wt, { color: "warning" }, {
                      default: P(() => [
                        bt(" Cancelled: " + A(w.cancelled_count ? F(U)(Number(w.cancelled_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024),
                    R(Wt, { color: "orange" }, {
                      default: P(() => [
                        bt(" No Balance: " + A(w.no_pending_balance_count ? F(U)(Number(w.no_pending_balance_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024),
                    R(Wt, { color: "danger" }, {
                      default: P(() => [
                        bt(" Errors: " + A(w.error_count ? F(U)(Number(w.error_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (_(), k("section", zp, [...x[4] || (x[4] = [
            r("div", { class: "empty-state-content" }, [
              r("div", { class: "empty-icon-wrapper" }, [
                r("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  })
                ])
              ]),
              r("p", { class: "empty-title" }, "No booking manager data available"),
              r("p", { class: "empty-description" }, "No booking manager data found for the selected period. Try adjusting the date range.")
            ], -1)
          ])]))
        ]))
      ]),
      _: 2
    }, [
      e.enableExport && !a.loading && !a.error ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Bt), {
            variant: "inline",
            onExport: s,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), Np = /* @__PURE__ */ it(Vp, [["__scopeId", "data-v-1f89ffbb"]]), Wp = {
  key: 0,
  class: "loading-state"
}, Hp = {
  key: 1,
  class: "card-body"
}, jp = {
  key: 0,
  class: "chart-section"
}, Yp = { class: "chart-wrapper" }, Kp = {
  key: 1,
  class: "checkin-daily-section"
}, qp = { class: "w-full min-w-0" }, Up = { class: "font-medium" }, Xp = {
  key: 0,
  class: "failed-steps"
}, Gp = { class: "step-name" }, Zp = { class: "step-count" }, Qp = {
  key: 1,
  class: "empty-cell"
}, Jp = {
  key: 2,
  class: "empty-state"
}, tm = {
  __name: "Checkin",
  props: {
    /** Si es false, el bloque no usa <details> ni chevron (p. ej. anidado en CheckinContainer). */
    collapsible: {
      type: Boolean,
      default: !0
    },
    initiallyOpen: {
      type: Boolean,
      default: !1
    },
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
    const n = t, a = (f) => {
      n("export", f);
    }, o = e, s = {
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
    }, l = st([]), d = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieve", label: "Booking Retrieve (%)", align: "center" },
      { key: "passengers", label: "Number of Passengers", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Failed (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], c = D(
      () => (l.value || []).map((b) => ({
        id: b.date,
        date: b.date,
        checkin_initiated_count: b.checkin_initiated_count,
        checkin_init_count: b.checkin_init_count,
        checkin_started_count: b.checkin_started_count,
        checkin_completed_count: b.checkin_completed_count,
        checkin_closed_count: b.checkin_closed_count,
        failed_steps: b.failed_steps
      }))
    ), u = D(() => {
      const b = s.data;
      return b && (Array.isArray(b.checkin_by_day) && b.checkin_by_day.length > 0 || (b.total_checkin_initiated ?? 0) > 0) ? { ...o, ...b } : s.checkinData ?? o;
    }), h = D(() => {
      const b = s.data;
      return b && (Array.isArray(b.failed_by_step_by_day) && b.failed_by_step_by_day.length > 0 || Array.isArray(b.unrecovered_by_step) && b.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: b.total_checkin_failed ?? 0,
        total_checkin_unrecovered: b.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: b.failed_by_step_by_day ?? [],
        unrecovered_by_step: b.unrecovered_by_step ?? [],
        unrecovered_by_day: b.unrecovered_by_day ?? []
      } : s.failedData ?? i;
    }), g = D(() => {
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
      return (h.value.unrecovered_by_step || []).forEach((x) => {
        const C = x.step_name.replace(/_/g, " ").split(" ").map((S) => S.charAt(0).toUpperCase() + S.slice(1)).join(" "), $ = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        b[C] = $[C] || "#DC2626";
      }), b;
    }), y = (b, x) => !x || x === 0 ? "0%" : `${Math.round(b / x * 100)}%`, f = (b, x) => {
      const w = U(b), M = y(b, x);
      return `${w} (${M})`;
    }, m = (b) => b.reduce((x, w) => x + w.failed_count, 0), v = D(() => {
      const b = [], x = [];
      if (!u.value.total_checkin_initiated)
        return { nodes: b, links: x };
      b.push({ name: "Checkin Init" }), b.push({ name: "Booking retrive" }), b.push({ name: "Booking retrive success" }), b.push({ name: "Number of Passengers" }), b.push({ name: "Completed" }), b.push({ name: "Closed with BP" });
      const w = u.value.total_checkin_initiated, M = u.value.total_checkin_init, C = u.value.total_checkin_init_abandoned, $ = M - C, S = u.value.total_checkin_started, L = u.value.total_checkin_completed, T = u.value.total_checkin_closed, B = h.value.unrecovered_by_step || [], E = B.reduce((N, tt) => N + tt.count, 0);
      if (M > 0) {
        const N = Math.round(M / w * 100);
        x.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: M,
          label: `${M.toLocaleString()} (${N}%)`
        });
      }
      const I = w - M;
      if (I > 0) {
        const N = Math.round(I / w * 100);
        b.push({ name: "Abandoned (Init)" }), x.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: I,
          label: `${I.toLocaleString()} (${N}%)`
        });
      }
      if (C > 0) {
        const N = Math.round(C / w * 100);
        b.push({ name: "Abandoned (Started)" }), x.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: C,
          label: `${C.toLocaleString()} (${N}%)`
        });
      }
      if ($ > 0) {
        const N = Math.round($ / w * 100);
        x.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: $,
          label: `${$.toLocaleString()} (${N}%)`
        });
      }
      if (S > 0) {
        const N = Math.round(S / w * 100);
        x.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: S,
          label: `${S.toLocaleString()} (${N}%)`
        });
      }
      if (L > 0) {
        const N = Math.round(L / S * 100);
        x.push({
          source: "Number of Passengers",
          target: "Completed",
          value: L,
          label: `${L.toLocaleString()} (${N}%)`
        });
      }
      if (B.length > 0 && E > 0) {
        b.push({ name: "Unrecovered" });
        const N = Math.round(E / S * 100);
        x.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: E,
          label: `${E.toLocaleString()} (${N}%)`
        }), B.forEach((tt) => {
          const rt = tt.step_name.replace(/_/g, " ").split(" ").map((K) => K.charAt(0).toUpperCase() + K.slice(1)).join(" "), G = Math.round(tt.count / S * 100);
          b.push({ name: rt }), x.push({
            source: "Unrecovered",
            target: rt,
            value: tt.count,
            label: `${tt.count.toLocaleString()} (${G}%)`
          });
        });
      }
      const V = S - (L + E);
      if (V > 0) {
        const N = Math.round(V / S * 100);
        b.push({ name: "Abandoned (Flow)" }), x.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: V,
          label: `${V.toLocaleString()} (${N}%)`
        });
      }
      const Y = L - T;
      if (Y > 0) {
        const N = Math.round(Y / S * 100);
        b.push({ name: "BP Error" }), x.push({
          source: "Completed",
          target: "BP Error",
          value: Y,
          label: `${Y.toLocaleString()} (${N}%)`
        });
      }
      if (T > 0) {
        const N = Math.round(T / S * 100);
        x.push({
          source: "Completed",
          target: "Closed with BP",
          value: T,
          label: `${T.toLocaleString()} (${N}%)`
        });
      }
      return { nodes: b, links: x };
    }), p = () => {
      const b = u.value.checkin_by_day || [], x = h.value.failed_by_step_by_day || [];
      if (b.length === 0) {
        l.value = [];
        return;
      }
      l.value = [...b].map((w) => {
        const M = x.find(
          (C) => C.date === w.date
        );
        return {
          ...w,
          failed_steps: M?.steps || []
        };
      }), l.value.sort((w, M) => new Date(w.date) - new Date(M.date));
    };
    return Ft(
      [() => s.data, () => s.checkinData, () => s.failedData],
      () => {
        p();
      },
      { deep: !0, immediate: !0 }
    ), (f, k) => (_(), tt(gt, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen
    }, St({
      default: P(() => [
        s.loading ? (_(), k("div", Wp, [...x[0] || (x[0] = [
          r("div", { class: "loading-container" }, [
            r("div", { class: "chart-flow-loader" }, [
              r("div", { class: "flow-line flow-1" }),
              r("div", { class: "flow-line flow-2" }),
              r("div", { class: "flow-line flow-3" }),
              r("div", { class: "flow-line flow-4" }),
              r("div", { class: "flow-line flow-5" })
            ]),
            r("p", { class: "loading-text" }, "Loading check-in data...")
          ], -1)
        ])])) : (_(), k("div", Hp, [
          v.value.nodes.length > 0 ? (_(), k("section", jp, [
            r("div", Yp, [
              R(Se, {
                data: v.value,
                height: "500px",
                "node-colors": g.value,
                "use-gradient": !1,
                "node-gap": 30
              }, null, 8, ["data", "node-colors"])
            ])
          ])) : z("", !0),
          l.value && l.value.length > 0 ? (_(), k("section", Kp, [
            r("div", qp, [
              R(qt, {
                columns: d,
                rows: c.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": P(({ row: w }) => [
                  r("span", Up, A(F(Lt)(String(w.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": P(({ row: w }) => [
                  r("span", null, A(F(U)(w.checkin_initiated_count)), 1)
                ]),
                "cell-bookingRetrieve": P(({ row: w }) => [
                  r("span", null, A(f(w.checkin_init_count, w.checkin_initiated_count)), 1)
                ]),
                "cell-passengers": P(({ row: w }) => [
                  r("span", null, A(F(U)(w.checkin_started_count)), 1)
                ]),
                "cell-completed": P(({ row: w }) => [
                  r("span", null, A(f(w.checkin_completed_count, w.checkin_started_count)), 1)
                ]),
                "cell-closed": P(({ row: w }) => [
                  r("span", null, A(f(w.checkin_closed_count, w.checkin_started_count)), 1)
                ]),
                "cell-failed": P(({ row: w }) => [
                  r("span", null, A(f(m(w.failed_steps), w.checkin_started_count)), 1)
                ]),
                "cell-reasons": P(({ row: w }) => [
                  w.failed_steps && w.failed_steps.length > 0 ? (_(), k("div", Xp, [
                    (_(!0), k(q, null, at(w.failed_steps, (M) => (_(), k("div", {
                      key: M.step_name,
                      class: "failed-step-item"
                    }, [
                      r("span", Gp, A(M.step_name.replace(/_/g, " ")) + ":", 1),
                      r("span", Zp, A(M.failed_count), 1)
                    ]))), 128))
                  ])) : (_(), k("div", Qp, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (_(), k("section", Jp, [...x[1] || (x[1] = [
            r("div", { class: "empty-state-content" }, [
              r("div", { class: "empty-icon-wrapper" }, [
                r("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  })
                ])
              ]),
              r("p", { class: "empty-title" }, "No check-in data available"),
              r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see check-in performance data.")
            ], -1)
          ])]))
        ]))
      ]),
      _: 2
    }, [
      e.enableExport && !o.loading ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Bt), {
            variant: "inline",
            onExport: a,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["collapsible", "default-open"]));
  }
}, em = /* @__PURE__ */ it(tm, [["__scopeId", "data-v-d8523917"]]), nm = {
  key: 0,
  class: "loading-state"
}, am = {
  key: 1,
  class: "card-body"
}, sm = {
  key: 0,
  class: "sankey-section"
}, om = {
  key: 1,
  class: "checkin-metrics-daily-section"
}, im = { class: "w-full min-w-0" }, lm = { class: "font-medium whitespace-nowrap" }, rm = { class: "cell-success" }, cm = { class: "cell-danger" }, dm = {
  key: 0,
  class: "reasons-list"
}, um = { class: "reason-name" }, hm = { class: "reason-count" }, fm = {
  key: 1,
  class: "no-reasons"
}, gm = {
  key: 2,
  class: "empty-state"
}, pm = { class: "empty-state-content" }, mm = { class: "empty-icon-wrapper" }, bm = /* @__PURE__ */ Z({
  __name: "CheckinMetrics",
  props: {
    initiallyOpen: { type: Boolean, default: !1 },
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
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = (p) => {
      s("export", p);
    }, { isDark: i } = ut(dt(a, "theme")), l = (p) => p == null ? "0" : p.toLocaleString(), d = (p) => {
      const [b, x, w] = p.split("-").map(Number);
      return Lt([b, x - 1, w]).format("MMM DD");
    }, c = (p) => p.replace(/_/g, " ").replace(/\b\w/g, (b) => b.toUpperCase()), u = (p, b) => !b || b === 0 ? "0%" : `${Math.round(p / b * 100)}%`, h = (p, b) => {
      const x = p || 0, w = b || 0, M = l(x), C = u(x, w);
      return `${M} (${C})`;
    }, g = D(() => ({
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
      Errors: "#F87171"
    })), y = D(() => {
      const p = a.checkinData?.record_locator_by_day || [], b = a.failedData?.failed_by_step_by_day || [], x = a.failedData?.unrecovered_by_day || [];
      return p.map((M) => {
        const C = b.find((S) => S.date === M.date), $ = x.find((S) => S.date === M.date);
        return {
          ...M,
          failed_steps: C?.steps || [],
          unrecovered_count: $?.unrecovered_count || 0
        };
      }).sort((M, C) => new Date(M.date).getTime() - new Date(C.date).getTime());
    }), f = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieval", label: "Booking Retrieval (%)", align: "center" },
      { key: "bookingRetrieved", label: "Booking Retrieved", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Errors (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], m = D(
      () => y.value.map((p) => ({
        id: p.date,
        date: p.date,
        checkin_initiated: p.checkin_initiated,
        record_locator_init_count: p.record_locator_init_count,
        record_locator_started_count: p.record_locator_started_count,
        record_locator_completed_count: p.record_locator_completed_count,
        record_locator_closed_count: p.record_locator_closed_count,
        unrecovered_count: p.unrecovered_count,
        failed_steps: p.failed_steps
      }))
    ), v = D(() => {
      const p = [], b = [], x = /* @__PURE__ */ new Set(), w = (Q) => {
        x.has(Q) || (p.push({ name: Q }), x.add(Q));
      };
      if (!a.checkinData?.total_checkin_initiated)
        return { nodes: p, links: b };
      w("Checkin Init"), w("Booking Retrieval"), w("Booking Retrieved"), w("Completed"), w("Closed with BP");
      const M = a.checkinData.total_checkin_initiated || 0, C = a.checkinData.total_record_locator_init || 0, $ = a.checkinData.total_record_locator_init_abandoned || 0, S = a.checkinData.total_checkin_pre_init_abandoned_error, L = a.checkinData.total_checkin_pre_init_abandoned_voluntary, T = S != null || L != null, B = T ? Math.max(Number(S) || 0, 0) : 0, E = T ? Math.max(Number(L) || 0, 0) : 0, I = a.checkinData.total_record_locator_init_abandoned_error, V = a.checkinData.total_record_locator_init_abandoned_voluntary, Y = I != null || V != null, N = Y ? Math.max(Number(I) || 0, 0) : 0, tt = Y ? Math.max(Number(V) || 0, 0) : 0, et = Y ? Math.max($ - N - tt, 0) : $, rt = C - $, G = a.checkinData.total_record_locator_started || 0, K = a.checkinData.total_record_locator_completed || 0, j = a.checkinData.total_record_locator_closed || 0, ot = a.checkinData.total_record_locator_unrecovered || 0;
      if (C > 0) {
        const Q = Math.round(C / M * 100);
        b.push({
          source: "Checkin Init",
          target: "Booking Retrieval",
          value: C,
          label: `${C.toLocaleString()} (${Q}%)`
        });
      }
      const X = M - C;
      if (T) {
        if (E > 0) {
          const Q = Math.round(E / M * 100);
          w("Abandoned (Init)"), b.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: E,
            label: `${E.toLocaleString()} (${Q}%)`
          });
        }
        if (B > 0) {
          const Q = Math.round(B / M * 100);
          w("Booking not retreived"), b.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: B,
            label: `${B.toLocaleString()} (${Q}%)`
          });
        }
      } else if (X > 0) {
        const Q = Math.round(X / M * 100);
        w("Abandoned (Init)"), b.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: X,
          label: `${X.toLocaleString()} (${Q}%)`
        });
      }
      if (Y) {
        if (N > 0) {
          const Q = Math.round(N / M * 100);
          w("Error"), b.push({
            source: "Booking Retrieval",
            target: "Error",
            value: N,
            label: `${N.toLocaleString()} (${Q}%)`
          });
        }
        if (tt > 0) {
          const Q = Math.round(tt / M * 100);
          w("Abandoned (Started)"), b.push({
            source: "Booking Retrieval",
            target: "Abandoned (Started)",
            value: tt,
            label: `${tt.toLocaleString()} (${Q}%)`
          });
        }
        if (et > 0) {
          const Q = Math.round(et / M * 100);
          w("Abandoned (Started)"), b.push({
            source: "Booking Retrieval",
            target: "Abandoned (Started)",
            value: et,
            label: `${et.toLocaleString()} (${Q}%)`
          });
        }
      } else if ($ > 0) {
        const Q = Math.round($ / M * 100);
        w("Abandoned (Started)"), b.push({
          source: "Booking Retrieval",
          target: "Abandoned (Started)",
          value: $,
          label: `${$.toLocaleString()} (${Q}%)`
        });
      }
      if (rt > 0) {
        const Q = Math.round(rt / M * 100);
        b.push({
          source: "Booking Retrieval",
          target: "Booking Retrieved",
          value: rt,
          label: `${rt.toLocaleString()} (${Q}%)`
        });
      }
      if (K > 0) {
        const Q = Math.round(K / G * 100);
        b.push({
          source: "Booking Retrieved",
          target: "Completed",
          value: K,
          label: `${K.toLocaleString()} (${Q}%)`
        });
      }
      if (ot > 0) {
        w("Errors");
        const Q = Math.round(ot / G * 100);
        b.push({
          source: "Booking Retrieved",
          target: "Errors",
          value: ot,
          label: `${ot.toLocaleString()} (${Q}%)`
        });
      }
      const ct = G - (K + ot);
      if (ct > 0) {
        const Q = Math.round(ct / G * 100);
        w("Abandoned (Flow)"), b.push({
          source: "Booking Retrieved",
          target: "Abandoned (Flow)",
          value: ct,
          label: `${ct.toLocaleString()} (${Q}%)`
        });
      }
      const pt = K - j;
      if (pt > 0) {
        const Q = Math.round(pt / G * 100);
        w("BP Error"), b.push({
          source: "Completed",
          target: "BP Error",
          value: pt,
          label: `${pt.toLocaleString()} (${Q}%)`
        });
      }
      if (j > 0) {
        const Q = Math.round(j / G * 100);
        b.push({
          source: "Completed",
          target: "Closed with BP",
          value: j,
          label: `${j.toLocaleString()} (${Q}%)`
        });
      }
      return { nodes: p, links: b };
    });
    return t({ isDark: i }), (p, b) => (_(), nt(ft, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      "default-open": e.initiallyOpen
    }, St({
      default: P(() => [
        e.loading ? (_(), k("div", nm, [...b[0] || (b[0] = [
          r("div", { class: "loading-container" }, [
            r("div", { class: "chart-bars-loader" }, [
              r("div", { class: "bar bar-1" }),
              r("div", { class: "bar bar-2" }),
              r("div", { class: "bar bar-3" }),
              r("div", { class: "bar bar-4" }),
              r("div", { class: "bar bar-5" })
            ]),
            r("p", { class: "loading-text" }, "Loading check-in data...")
          ], -1)
        ])])) : (_(), k("div", am, [
          v.value.nodes.length > 0 ? (_(), k("div", sm, [
            R(Se, {
              data: v.value,
              height: "500px",
              "node-colors": g.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])) : z("", !0),
          y.value && y.value.length > 0 ? (_(), k("div", om, [
            r("div", im, [
              R(qt, {
                columns: f,
                rows: m.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": P(({ row: x }) => [
                  r("span", lm, A(d(String(x.date))), 1)
                ]),
                "cell-checkinInit": P(({ row: x }) => [
                  r("span", null, A(l(x.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieval": P(({ row: x }) => [
                  r("span", null, A(h(x.record_locator_init_count, x.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieved": P(({ row: x }) => [
                  r("span", null, A(h(x.record_locator_started_count, x.record_locator_init_count)), 1)
                ]),
                "cell-completed": P(({ row: x }) => [
                  r("span", null, A(h(x.record_locator_completed_count, x.record_locator_started_count)), 1)
                ]),
                "cell-closed": P(({ row: x }) => [
                  r("span", rm, A(h(x.record_locator_closed_count, x.record_locator_started_count)), 1)
                ]),
                "cell-failed": P(({ row: x }) => [
                  r("span", cm, A(h(x.unrecovered_count, x.record_locator_started_count)), 1)
                ]),
                "cell-reasons": P(({ row: x }) => [
                  Array.isArray(x.failed_steps) && x.failed_steps.length > 0 ? (_(), k("div", dm, [
                    (_(!0), k(q, null, at(x.failed_steps, (w) => (_(), k("div", {
                      key: w.step_name,
                      class: "reason-item"
                    }, [
                      r("span", um, A(c(w.step_name)) + ":", 1),
                      r("span", hm, A(w.failed_count), 1)
                    ]))), 128))
                  ])) : (_(), k("div", fm, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (_(), k("div", gm, [
            r("div", pm, [
              r("div", mm, [
                R(F(Wt), { class: "empty-icon" })
              ]),
              b[1] || (b[1] = r("p", { class: "empty-title" }, "No check-in data available", -1)),
              b[2] || (b[2] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see check-in metrics.", -1))
            ])
          ]))
        ]))
      ]),
      _: 2
    }, [
      e.enableExport && !e.loading ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Bt), {
            variant: "inline",
            onExport: s,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["default-open"]));
  }
}), vm = /* @__PURE__ */ it(bm, [["__scopeId", "data-v-4b78de4b"]]), ym = {
  key: 0,
  class: "loading-state"
}, _m = {
  key: 1,
  class: "card-body"
}, xm = {
  key: 0,
  class: "chart-section"
}, km = { class: "chart-wrapper" }, wm = {
  key: 1,
  class: "record-locator-daily-section"
}, Cm = { class: "w-full min-w-0" }, $m = { class: "cell-plain font-medium" }, Mm = { class: "cell-plain text-center" }, Sm = { class: "cell-plain text-center" }, Dm = { class: "cell-plain text-center" }, Am = { class: "cell-plain text-center" }, Tm = { class: "cell-plain text-center success-value" }, Bm = { class: "cell-plain text-center failed-value" }, Lm = { class: "cell-plain text-center warning-value" }, Fm = { class: "cell-plain text-center" }, Em = { class: "cell-plain text-center failed-value" }, Im = {
  key: 2,
  class: "empty-state"
}, Pm = /* @__PURE__ */ Z({
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
    exportLoading: { type: Boolean, default: !1 },
    collapsible: { type: Boolean, default: !0 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = (p) => {
      s("export", p);
    }, { isDark: i } = ut(dt(a, "theme")), l = D(() => a.data?.record_locator_by_day ? [...a.data.record_locator_by_day].sort(
      (p, b) => new Date(p.date).getTime() - new Date(b.date).getTime()
    ) : []), d = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieve", label: "Booking Retrieve (%)", align: "center" },
      { key: "checkinStarted", label: "Checkin Started", align: "center" },
      { key: "checkinCompleted", label: "Checkin Completed (%)", align: "center" },
      { key: "checkinClosed", label: "Checkin Closed (%)", align: "center" },
      { key: "checkinFailed", label: "Checkin Failed (%)", align: "center" },
      { key: "abandoned", label: "Abandoned (%)", align: "center" }
    ], c = [
      { key: "createPayment", label: "Create Payment", align: "center" },
      { key: "failedPayment", label: "Failed Payment", align: "center" }
    ], u = D(
      () => a.isAvianca ? [...d, ...c] : d
    ), h = D(
      () => l.value.map((p) => ({
        id: p.date,
        date: p.date,
        checkin_initiated: p.checkin_initiated,
        record_locator_init_count: p.record_locator_init_count,
        record_locator_started_count: p.record_locator_started_count,
        record_locator_completed_count: p.record_locator_completed_count,
        record_locator_closed_count: p.record_locator_closed_count,
        record_locator_failed_count: p.record_locator_failed_count,
        record_locator_abandoned_count: p.record_locator_abandoned_count,
        record_locator_create_payment_count: p.record_locator_create_payment_count,
        record_locator_create_payment_failed_count: p.record_locator_create_payment_failed_count
      }))
    ), g = D(() => a.data), y = D(() => ({
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
    })), f = (p, b) => !b || b === 0 ? "0%" : `${Math.round(p / b * 100)}%`, m = (p, b) => {
      const x = U(p), w = f(p, b);
      return `${x} (${w})`;
    }, v = D(() => {
      const p = [], b = [], x = /* @__PURE__ */ new Set(), w = (X) => {
        x.has(X) || (p.push({ name: X }), x.add(X));
      };
      if (!g.value.total_checkin_initiated)
        return { nodes: p, links: b };
      w("Checkin Init"), w("Booking retrive"), w("Checkin Started"), w("Checkin Completed"), w("Checkin Closed");
      const M = g.value.total_checkin_initiated, C = g.value.total_record_locator_init, $ = g.value.total_record_locator_started, S = g.value.total_record_locator_completed, L = g.value.total_record_locator_closed, T = g.value.total_record_locator_failed, B = g.value.total_record_locator_abandoned, E = g.value.total_record_locator_init_abandoned, I = g.value.total_checkin_pre_init_abandoned_error, V = g.value.total_checkin_pre_init_abandoned_voluntary, Y = I != null || V != null, N = Y ? Math.max(Number(I) || 0, 0) : 0, tt = Y ? Math.max(Number(V) || 0, 0) : 0, et = g.value.total_record_locator_init_abandoned_error, rt = g.value.total_record_locator_init_abandoned_voluntary, G = et != null || rt != null, K = G ? Math.max(Number(et) || 0, 0) : 0, j = G ? Math.max(Number(rt) || 0, 0) : 0;
      if (C > 0) {
        const X = Math.round(C / M * 100);
        b.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: C,
          label: `${C.toLocaleString()} (${at}%)`
        });
      }
      const ot = M - C;
      if (Y) {
        if (tt > 0) {
          const X = Math.round(tt / M * 100);
          w("Abandoned (Init)"), b.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: tt,
            label: `${tt.toLocaleString()} (${X}%)`
          });
        }
        if (N > 0) {
          const X = Math.round(N / M * 100);
          w("Booking not retreived"), b.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: N,
            label: `${N.toLocaleString()} (${X}%)`
          });
        }
      } else if (ot > 0) {
        const X = Math.round(ot / M * 100);
        w("Abandoned (Init)"), b.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: ot,
          label: `${ot.toLocaleString()} (${X}%)`
        });
      }
      if ($ > 0) {
        const X = Math.round($ / M * 100);
        b.push({
          source: "Booking retrive",
          target: "Checkin Started",
          value: $,
          label: `${$.toLocaleString()} (${X}%)`
        });
      }
      if (G) {
        if (K > 0) {
          const X = Math.round(K / M * 100);
          w("Error"), b.push({
            source: "Booking retrive",
            target: "Error",
            value: K,
            label: `${K.toLocaleString()} (${X}%)`
          });
        }
        if (j > 0) {
          const X = Math.round(j / M * 100);
          w("Abandoned (Started)"), b.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: rt,
            label: `${rt.toLocaleString()} (${at}%)`
          });
        }
      } else if (E > 0) {
        const X = Math.round(E / M * 100);
        w("Abandoned (Started)"), b.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: E,
          label: `${E.toLocaleString()} (${at}%)`
        });
      }
      if (S > 0) {
        const at = Math.round(S / $ * 100);
        f.push({
          source: "Checkin Started",
          target: "Checkin Completed",
          value: S,
          label: `${S.toLocaleString()} (${at}%)`
        });
      }
      if (L > 0) {
        const at = Math.round(L / $ * 100);
        f.push({
          source: "Checkin Completed",
          target: "Checkin Closed",
          value: L,
          label: `${L.toLocaleString()} (${at}%)`
        });
      }
      if (T > 0) {
        const X = Math.round(T / $ * 100);
        w("Checkin Failed"), b.push({
          source: "Checkin Started",
          target: "Checkin Failed",
          value: T,
          label: `${T.toLocaleString()} (${at}%)`
        });
      }
      if (B > 0) {
        const X = Math.round(B / $ * 100);
        w("Abandoned (Flow)"), b.push({
          source: "Checkin Started",
          target: "Abandoned (Flow)",
          value: B,
          label: `${B.toLocaleString()} (${X}%)`
        });
      }
      return { nodes: p, links: b };
    });
    return t({ isDark: i }), (p, b) => (_(), nt(ft, {
      class: "record-locator-root h-full min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: e.collapsible
    }, St({
      default: P(() => [
        a.loading ? (_(), k("div", ym, [...b[0] || (b[0] = [
          r("div", { class: "loading-container" }, [
            r("div", { class: "chart-flow-loader" }, [
              r("div", { class: "flow-line flow-1" }),
              r("div", { class: "flow-line flow-2" }),
              r("div", { class: "flow-line flow-3" }),
              r("div", { class: "flow-line flow-4" }),
              r("div", { class: "flow-line flow-5" })
            ]),
            r("p", { class: "loading-text" }, "Loading record locator data...")
          ], -1)
        ])])) : (_(), k("div", _m, [
          v.value.nodes.length > 0 ? (_(), k("section", xm, [
            r("div", km, [
              R(Se, {
                data: v.value,
                height: "500px",
                "node-colors": y.value,
                "use-gradient": !1,
                "node-gap": 30
              }, null, 8, ["data", "node-colors"])
            ])
          ])) : z("", !0),
          l.value && l.value.length > 0 ? (_(), k("section", wm, [
            r("div", Cm, [
              R(qt, {
                columns: u.value,
                rows: h.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": P(({ row: x }) => [
                  r("span", $m, A(F(Lt)(String(x.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": P(({ row: x }) => [
                  r("span", Mm, A(F(U)(x.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieve": P(({ row: x }) => [
                  r("span", Sm, A(m(x.record_locator_init_count, x.checkin_initiated)), 1)
                ]),
                "cell-checkinStarted": P(({ row: x }) => [
                  r("span", Dm, A(F(U)(x.record_locator_started_count)), 1)
                ]),
                "cell-checkinCompleted": P(({ row: x }) => [
                  r("span", Am, A(m(x.record_locator_completed_count, x.record_locator_started_count)), 1)
                ]),
                "cell-checkinClosed": P(({ row: x }) => [
                  r("span", Tm, A(m(x.record_locator_closed_count, x.record_locator_started_count)), 1)
                ]),
                "cell-checkinFailed": P(({ row: x }) => [
                  r("span", Bm, A(m(x.record_locator_failed_count, x.record_locator_started_count)), 1)
                ]),
                "cell-abandoned": P(({ row: x }) => [
                  r("span", Lm, A(m(x.record_locator_abandoned_count, x.record_locator_started_count)), 1)
                ]),
                "cell-createPayment": P(({ row: x }) => [
                  r("span", Fm, A(F(U)(x.record_locator_create_payment_count ?? 0)), 1)
                ]),
                "cell-failedPayment": P(({ row: x }) => [
                  r("span", Em, A(F(U)(x.record_locator_create_payment_failed_count ?? 0)), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (_(), k("section", Im, [...b[1] || (b[1] = [
            r("div", { class: "empty-state-content" }, [
              r("div", { class: "empty-icon-wrapper" }, [
                r("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  })
                ])
              ]),
              r("p", { class: "empty-title" }, "No record locator data available"),
              r("p", { class: "empty-description" }, "No record locator data found for the selected period. Try adjusting the date range.")
            ], -1)
          ])]))
        ]))
      ]),
      _: 2
    }, [
      e.enableExport && !a.loading ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Bt), {
            variant: "inline",
            onExport: s,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["collapsible"]));
  }
}), Fi = /* @__PURE__ */ it(Pm, [["__scopeId", "data-v-b0afdda5"]]), Rm = {
  key: 0,
  class: "loading-state"
}, Om = {
  key: 1,
  class: "card-body"
}, zm = {
  key: 0,
  class: "checkin-segments-daily-section"
}, Vm = { class: "w-full min-w-0" }, Nm = { class: "segment-plain" }, Wm = { class: "segment-plain" }, Hm = { class: "segment-plain" }, jm = { class: "percentage-value" }, Ym = { class: "percentage-value" }, Km = { class: "percentage-value success" }, qm = {
  key: 1,
  class: "empty-state"
}, Um = /* @__PURE__ */ Z({
  __name: "checkinSegments",
  props: {
    data: { default: () => [] },
    loading: { type: Boolean, default: !1 },
    initiallyOpen: { type: Boolean, default: !1 },
    collapsible: { type: Boolean, default: !0 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = (g) => {
      s("export", g);
    }, { isDark: i } = ut(dt(a, "theme")), l = [
      { key: "departure", label: "Departure", align: "center" },
      { key: "connection", label: "Connection", align: "center" },
      { key: "arrival", label: "Arrival", align: "center" },
      { key: "trip", label: "Trip", align: "center" },
      { key: "init", label: "Init", align: "center" },
      { key: "started", label: "Started (%)", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed (%)", align: "center" }
    ], d = D(
      () => a.data.map((g, y) => ({
        id: `segment-${y}-${g.departure_airport}-${g.arrival_airport}-${g.segment_init_count}-${g.segment_started_count}`,
        departure_airport: g.departure_airport,
        conexion_airport: g.conexion_airport,
        arrival_airport: g.arrival_airport,
        segment_init_count: g.segment_init_count,
        segment_started_count: g.segment_started_count,
        segment_completed_count: g.segment_completed_count,
        segment_closed_count: g.segment_closed_count
      }))
    ), c = (g, y) => !y || y === 0 || !g ? "0%" : `${Math.round(g / y * 100)}%`, u = (g) => !g || g === "None" ? "-" : String(g).trim().replace(/_[0-9]+$/i, ""), h = (g) => {
      const y = u(g?.departure_airport), f = u(g?.arrival_airport);
      return y === "-" || f === "-" ? !1 : y === f;
    };
    return t({ isDark: i }), (g, y) => (_(), nt(ft, {
      class: "checkin-segments-root h-full min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen
    }, St({
      default: P(() => [
        a.loading ? (_(), k("div", Rm, [...y[0] || (y[0] = [
          r("div", { class: "loading-container" }, [
            r("div", { class: "chart-flow-loader" }, [
              r("div", { class: "flow-line flow-1" }),
              r("div", { class: "flow-line flow-2" }),
              r("div", { class: "flow-line flow-3" }),
              r("div", { class: "flow-line flow-4" }),
              r("div", { class: "flow-line flow-5" })
            ]),
            r("p", { class: "loading-text" }, "Loading segment data...")
          ], -1)
        ])])) : (_(), k("div", Om, [
          a.data.length > 0 ? (_(), k("section", zm, [
            r("div", Vm, [
              R(qt, {
                columns: l,
                rows: d.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-departure": P(({ row: f }) => [
                  r("span", Nm, A(u(f.departure_airport)), 1)
                ]),
                "cell-connection": P(({ row: f }) => [
                  r("span", {
                    class: W(["segment-plain", {
                      "segment-plain--muted": u(f.conexion_airport) === "-"
                    }])
                  }, A(u(p.conexion_airport)), 3)
                ]),
                "cell-arrival": P(({ row: f }) => [
                  r("span", Wm, A(u(f.arrival_airport)), 1)
                ]),
                "cell-trip": P(({ row: f }) => [
                  r("span", Hm, A(h(f) ? "Roundtrip" : "One way"), 1)
                ]),
                "cell-init": P(({ row: f }) => [
                  bt(A(F(U)(f.segment_init_count)), 1)
                ]),
                "cell-started": P(({ row: f }) => [
                  r("span", jm, A(c(f.segment_started_count, f.segment_init_count)), 1)
                ]),
                "cell-completed": P(({ row: f }) => [
                  r("span", Ym, A(c(f.segment_completed_count, f.segment_init_count)), 1)
                ]),
                "cell-closed": P(({ row: f }) => [
                  r("span", Km, A(c(f.segment_closed_count, f.segment_init_count)), 1)
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (_(), k("section", qm, [...y[1] || (y[1] = [
            r("div", { class: "empty-state-content" }, [
              r("div", { class: "empty-icon-wrapper" }, [
                r("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  })
                ])
              ]),
              r("p", { class: "empty-title" }, "No segment data available"),
              r("p", { class: "empty-description" }, "No flight segment data found for the selected period. Try adjusting the date range.")
            ], -1)
          ])]))
        ]))
      ]),
      _: 2
    }, [
      e.enableExport && !a.loading ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Bt), {
            variant: "inline",
            onExport: s,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["collapsible", "default-open"]));
  }
}), Ei = /* @__PURE__ */ it(Um, [["__scopeId", "data-v-22b55b09"]]), Xm = { class: "checkin-container__body" }, Gm = /* @__PURE__ */ Z({
  __name: "CheckinContainer",
  props: {
    containerInitiallyOpen: { type: Boolean, default: !1 },
    childrenInitiallyOpen: { type: Boolean, default: !0 },
    loading: { type: Boolean, default: !1 },
    checkinLoading: { type: Boolean, default: !1 },
    checkinMetricsLoading: { type: Boolean, default: !1 },
    recordLocatorLoading: { type: Boolean, default: !1 },
    segmentsLoading: { type: Boolean, default: !1 },
    showCheckin: { type: Boolean, default: !0 },
    showCheckinMetrics: { type: Boolean, default: !1 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 },
    isAvianca: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    checkinData: {},
    checkinFailedData: {},
    checkinMetricsData: {},
    checkinMetricsFailedData: {},
    recordLocatorData: {},
    segmentsData: {}
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = D(() => n.loading || n.checkinLoading), o = D(() => n.loading || n.checkinMetricsLoading), i = D(() => n.loading || n.recordLocatorLoading || n.checkinMetricsLoading), l = D(() => n.loading || n.segmentsLoading), d = D(() => n.recordLocatorData ?? n.checkinMetricsData);
    function c(g, y) {
      a("export", { source: g, format: y });
    }
    function u(g) {
      return typeof g == "object" && g !== null && "source" in g;
    }
    function h(g) {
      if (u(g)) {
        a("export", g);
        return;
      }
      c("checkinSegments", g);
    }
    return (g, y) => (_(), nt(ft, {
      class: "checkin-container-root w-full",
      title: "Check in",
      subtitle: "Check-in flows, metrics by record locator and segment breakdown.",
      "default-open": e.containerInitiallyOpen
    }, {
      default: P(() => [
        r("div", Xm, [
          R(Fi, {
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: o.value,
            "checkin-data": e.checkinData,
            "failed-data": e.checkinFailedData,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: m[0] || (m[0] = (y) => d("checkin", y))
          }, null, 8, ["initially-open", "loading", "checkin-data", "failed-data", "enable-export", "export-loading"])) : z("", !0),
          R(Yi, {
            collapsible: !1,
            loading: s.value,
            data: l.value,
            "is-avianca": e.isAvianca,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: m[1] || (m[1] = (y) => d("recordLocator", y))
          }, null, 8, ["loading", "data", "is-avianca", "theme", "enable-export", "export-loading"]),
          R(Ki, {
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: l.value,
            data: e.segmentsData,
            "show-checkin": e.showCheckin,
            "show-checkin-metrics": e.showCheckinMetrics,
            "checkin-loading": s.value,
            "checkin-metrics-loading": o.value,
            "checkin-data": e.checkinData,
            "checkin-failed-data": e.checkinFailedData,
            "checkin-metrics-data": e.checkinMetricsData,
            "checkin-metrics-failed-data": e.checkinMetricsFailedData,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: u
          }, null, 8, ["initially-open", "loading", "data", "theme", "enable-export", "export-loading"])
        ])
      ]),
      _: 1
    }, 8, ["default-open"]));
  }
}), Zm = /* @__PURE__ */ it(Gm, [["__scopeId", "data-v-bbfe0486"]]), Qm = {
  key: 0,
  class: "loading-state"
}, Jm = {
  key: 1,
  class: "card-body"
}, t0 = { class: "chart-section" }, e0 = { class: "chart-wrapper" }, n0 = {
  key: 1,
  class: "empty-chart"
}, a0 = { class: "payment-success-summary" }, s0 = {
  key: 0,
  class: "disruption-daily-section"
}, o0 = { class: "w-full min-w-0" }, i0 = { class: "font-medium text-center" }, l0 = { class: "text-center" }, r0 = { class: "text-center" }, c0 = { class: "percentage-text" }, d0 = { class: "text-center" }, u0 = { class: "abandoned-value" }, h0 = { class: "badges-container badges-wrap" }, f0 = { class: "badges-container badges-wrap" }, g0 = {
  key: 1,
  class: "empty-state"
}, p0 = /* @__PURE__ */ Z({
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
    function n(p) {
      return p;
    }
    const a = e, s = t, o = (p) => {
      s("export", p);
    }, i = D(() => a.data?.disruption_by_day ? [...a.data.disruption_by_day].sort(
      (p, b) => new Date(p.date).getTime() - new Date(b.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "abandoned", label: "Abandoned (%)", align: "center" },
      { key: "voluntary", label: "Voluntary", align: "left" },
      { key: "involuntary", label: "Involuntary", align: "left" }
    ], d = D(
      () => i.value.map((p) => ({
        id: p.date,
        ...p
      }))
    ), c = D(() => a.data?.total_payment_success || []), u = D(() => {
      const p = c.value;
      return p.length === 0 ? g(0) : p.map((b) => `${b.currency} ${g(b.total_value)}`).join(" · ");
    }), h = (p, b) => !b || b === 0 ? "0%" : `${Math.round(p / b * 100)}%`, g = (p) => yt(p), y = (p) => (p ?? []).reduce((b, x) => b + (x.count ?? 0), 0), f = (p) => typeof p.sell_success_count == "number" ? p.sell_success_count : y(p.payment_success_total), m = D(() => {
      const p = a.data, b = p.total_disruption_conversations || 0, x = p.total_disruption_initiated || 0, w = p.total_voluntary || 0, M = p.total_involuntary || 0, C = p.total_accepted || 0, $ = p.total_confirmed || 0, S = typeof p.total_sell_success == "number" ? p.total_sell_success : y(p.total_payment_success), L = p.total_sell_failed || 0, T = Math.max(0, b - x), B = Math.max(0, x - w - M), E = Math.max(0, M - C), I = Math.max(0, w - $), V = L, Y = Math.max(0, $ - S - V), N = (rt, G) => {
        const K = G > 0 ? Math.round(rt / G * 100) : 0;
        return `${rt.toLocaleString()} (${K}%)`;
      }, tt = [
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
      ], J = [];
      return k > 0 && J.push({
        source: "Initiated",
        target: "Started",
        value: x,
        label: N(x, b)
      }), T > 0 && et.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: T,
        label: N(T, b)
      }), w > 0 && et.push({
        source: "Started",
        target: "Voluntary",
        value: w,
        label: N(w, b)
      }), M > 0 && et.push({
        source: "Started",
        target: "Involuntary",
        value: M,
        label: N(M, b)
      }), B > 0 && et.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: B,
        label: N(B, b)
      }), C > 0 && et.push({
        source: "Involuntary",
        target: "Accepted",
        value: C,
        label: N(C, b)
      }), E > 0 && et.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: E,
        label: N(E, b)
      }), $ > 0 && et.push({
        source: "Voluntary",
        target: "Confirmed",
        value: $,
        label: N($, b)
      }), I > 0 && et.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: I,
        label: N(I, b)
      }), S > 0 && et.push({
        source: "Confirmed",
        target: "Paid",
        value: S,
        label: N(S, b)
      }), V > 0 && et.push({
        source: "Confirmed",
        target: "Rejected",
        value: V,
        label: N(V, b)
      }), Y > 0 && et.push({
        source: "Confirmed",
        target: "Not Paid",
        value: Y,
        label: N(Y, b)
      }), { nodes: tt, links: et };
    }), v = {
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
    return (p, b) => (_(), nt(ft, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking"
    }, St({
      default: P(() => [
        a.loading ? (_(), k("div", Qm, [...b[0] || (b[0] = [
          r("div", { class: "loading-container" }, [
            r("div", { class: "chart-bars-loader" }, [
              r("div", { class: "bar bar-1" }),
              r("div", { class: "bar bar-2" }),
              r("div", { class: "bar bar-3" }),
              r("div", { class: "bar bar-4" }),
              r("div", { class: "bar bar-5" })
            ]),
            r("p", { class: "loading-text" }, "Loading disruption data...")
          ], -1)
        ])])) : (_(), k("div", Jm, [
          r("section", t0, [
            r("div", e0, [
              m.value.nodes.length > 0 && m.value.links.length > 0 ? (_(), nt(Se, {
                key: 0,
                data: b.value,
                "node-colors": v,
                height: "500px"
              }, null, 8, ["data"])) : (_(), k("div", n0, [...b[1] || (b[1] = [
                r("p", { class: "empty-chart-text" }, "No disruption data available for visualization", -1)
              ])]))
            ])
          ]),
          r("section", a0, [
            R(lt, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: u.value
            }, null, 8, ["value"])
          ]),
          i.value && i.value.length > 0 ? (_(), k("section", s0, [
            b[2] || (b[2] = r("div", { class: "section-header" }, [
              r("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            r("div", o0, [
              R(qt, {
                columns: l,
                rows: d.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": P(({ row: x }) => [
                  r("span", i0, A(F(Lt)(String(x.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": P(({ row: x }) => [
                  r("span", l0, A(F(U)(Number(x.disruption_conversations))), 1)
                ]),
                "cell-started": P(({ row: x }) => [
                  r("span", r0, [
                    bt(A(F(U)(Number(x.disruption_initiated_count))) + " ", 1),
                    r("span", c0, " (" + A(h(Number(x.disruption_initiated_count), Number(x.disruption_conversations))) + ") ", 1)
                  ])
                ]),
                "cell-abandoned": P(({ row: x }) => [
                  r("span", d0, [
                    r("span", u0, A(F(U)(Number(x.disruption_initiated_count) - Number(x.voluntary_count) - Number(x.involuntary_count))) + " (" + A(h(Number(x.disruption_initiated_count) - Number(x.voluntary_count) - Number(x.involuntary_count), Number(x.disruption_conversations))) + ") ", 1)
                  ])
                ]),
                "cell-voluntary": P(({ row: x }) => [
                  r("div", h0, [
                    (_(!0), k(q, null, at([x], (w, M) => (_(), k(q, { key: M }, [
                      R(Rt, {
                        color: "neutral",
                        outlined: !0
                      }, {
                        default: P(() => [
                          bt(" VOL " + A(F(U)(w.voluntary_count)) + " (" + A(h(w.voluntary_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      R(Wt, { color: "success" }, {
                        default: P(() => [
                          bt(" Confirm " + A(F(U)(w.confirmed_count)) + " (" + A(h(w.confirmed_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      R(Wt, { color: "warning" }, {
                        default: P(() => [
                          bt(" Not Confirm " + A(F(U)(w.voluntary_count - w.confirmed_count)) + " (" + A(h(w.voluntary_count - w.confirmed_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      R(Wt, { color: "danger" }, {
                        default: P(() => [
                          bt(" Reject " + A(F(U)(w.sell_failed_count)) + " (" + A(h(w.sell_failed_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      R(Wt, { color: "orange" }, {
                        default: P(() => [
                          bt(" Not Paid " + A(F(U)(Math.max(0, w.confirmed_count - f(w) - w.sell_failed_count))) + " (" + A(h(Math.max(0, w.confirmed_count - f(w) - w.sell_failed_count), w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      R(Wt, {
                        color: "success",
                        outlined: !0
                      }, {
                        default: P(() => [
                          bt(" Finish " + A(F(U)(f(w))) + " (" + A(h(f(w), w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      (_(!0), k(q, null, at(w.payment_success_total || [], (C) => (_(), nt(Rt, {
                        key: `${w.date}-${C.currency}`,
                        color: "neutral"
                      }, {
                        default: P(() => [
                          bt(A(C.currency) + " " + A(g(C.total_value)), 1)
                        ]),
                        _: 2
                      }, 1024))), 128))
                    ], 64))), 128))
                  ])
                ]),
                "cell-involuntary": P(({ row: x }) => [
                  r("div", f0, [
                    (_(!0), k(q, null, at([x], (w, M) => (_(), k(q, { key: M }, [
                      R(Rt, { color: "purple" }, {
                        default: P(() => [
                          bt(" INV " + A(F(U)(w.involuntary_count)) + " (" + A(h(w.involuntary_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      R(Wt, { color: "danger" }, {
                        default: P(() => [
                          bt(" Human " + A(F(U)(w.involuntary_count - w.accepted_count)) + " (" + A(h(w.involuntary_count - w.accepted_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      R(Wt, { color: "success" }, {
                        default: P(() => [
                          bt(" Accept " + A(F(U)(w.accepted_count)) + " (" + A(h(w.accepted_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024)
                    ], 64))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (_(), k("section", g0, [...b[3] || (b[3] = [
            r("div", { class: "empty-state-content" }, [
              r("div", { class: "empty-icon-wrapper" }, [
                r("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  })
                ])
              ]),
              r("p", { class: "empty-title" }, "No disruption data available"),
              r("p", { class: "empty-description" }, "No disruption data found for the selected period. Try adjusting the date range.")
            ], -1)
          ])]))
        ]))
      ]),
      _: 2
    }, [
      e.enableExport && !a.loading ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Bt), {
            variant: "inline",
            onExport: s,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), m0 = /* @__PURE__ */ it(p0, [["__scopeId", "data-v-430625b7"]]), b0 = {
  key: 0,
  class: "flex min-h-[380px] flex-1 flex-col items-center justify-center px-4"
}, v0 = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, y0 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, _0 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, x0 = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, k0 = /* @__PURE__ */ Z({
  __name: "FAQ",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: n }) {
    const a = [30, 50, 70, 50, 40], s = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], o = e, i = n, l = (v) => {
      i("export", v);
    }, d = dt(o, "theme"), { isDark: c } = ut(d), u = {
      airline_information: "#8b5cf6",
      booking_info: "#f59e0b",
      flight_status: "#06b6d4"
    }, h = st({ labels: [], datasets: [] }), g = D(
      () => o.data ?? {
        total_faq_events: 0,
        total_documents_found: 0,
        total_airline_information_retrieved: 0,
        total_booking_info_retrieved: 0,
        total_flight_status_retrieved: 0,
        faq_by_day: []
      }
    ), y = D(() => {
      const v = g.value, p = v.total_airline_information_retrieved + v.total_booking_info_retrieved + v.total_flight_status_retrieved, b = (M) => p > 0 ? (M / p * 100).toFixed(1) : "0.0", x = v.total_faq_events, w = x > 0 ? `${(v.total_documents_found / x * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: u.airline_information,
          value: `${b(v.total_airline_information_retrieved)}%`,
          subvalue: `${U(v.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: u.booking_info,
          value: `${b(v.total_booking_info_retrieved)}%`,
          subvalue: `${U(v.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: u.flight_status,
          value: `${b(v.total_flight_status_retrieved)}%`,
          subvalue: `${U(v.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: U(v.total_documents_found),
          subvalue: w
        }
      ];
    }), f = D(() => {
      const v = y.value.length;
      return v <= 1 ? "grid w-full grid-cols-1 gap-3 sm:gap-4" : v === 2 ? "grid w-full grid-cols-2 gap-3 sm:gap-4" : v === 3 ? "grid w-full grid-cols-3 gap-3 sm:gap-4" : "grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4";
    }), b = (v) => {
      if (!v) {
        h.value = { labels: [], datasets: [] };
        return;
      }
      const p = v.faq_by_day || [];
      if (p.length > 0) {
        const b = p.map((C) => Lt(C.date).format("MMM DD")), x = p.map((C) => C.airline_information_retrieved_count || 0), w = p.map((C) => C.flight_status_retrieved_count || 0), M = p.map((C) => C.booking_info_retrieved_count || 0);
        h.value = {
          labels: f,
          datasets: [
            {
              label: "Airline Information",
              data: k,
              borderColor: u.airline_information,
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              fill: !0
            },
            {
              label: "Flight Status",
              data: x,
              borderColor: u.flight_status,
              backgroundColor: "rgba(6, 182, 212, 0.1)",
              fill: !0
            },
            {
              label: "Booking Information",
              data: M,
              borderColor: u.booking_info,
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              fill: !0
            }
          ]
        };
      } else
        h.value = { labels: [], datasets: [] };
    };
    return Ft(
      () => o.data,
      (v) => {
        b(v ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: c }), (v, p) => (_(), nt(ft, {
      class: "w-full min-h-0 self-start",
      title: "FAQ Metrics",
      subtitle: "FAQ volume by category",
      collapsible: !1
    }, St({
      default: P(() => [
        r("div", {
          class: W(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", o.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          o.loading ? (_(), k("div", b0, [
            r("div", v0, [
              (_(), k(q, null, at(a, (b, x) => r("div", {
                key: x,
                class: W(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", s[x]]),
                style: gt({ height: `${b}%` })
              }, null, 6)), 64))
            ]),
            p[0] || (p[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading FAQ metrics... ", -1))
          ])) : (_(), k(q, { key: 1 }, [
            h.value.labels && h.value.labels.length ? (_(), k("section", y0, [
              r("div", _0, [
                R(ge, {
                  data: h.value,
                  theme: d.value
                }, null, 8, ["data", "theme"])
              ]),
              r("div", {
                class: W(f.value)
              }, [
                (_(!0), k(q, null, at(y.value, (b) => (_(), nt(lt, {
                  key: b.name,
                  color: b.color,
                  title: b.label,
                  value: b.value,
                  subvalue: b.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 2)
            ])) : (_(), k("section", x0, [...p[1] || (p[1] = [
              r("div", { class: "max-w-[360px] px-4 text-center" }, [
                r("div", { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, [
                  r("svg", {
                    class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "aria-hidden": "true"
                  }, [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    })
                  ])
                ]),
                r("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No FAQ data available "),
                r("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No FAQ consultation data found for the selected period. Try adjusting the date range. ")
              ], -1)
            ])]))
          ], 64))
        ], 2)
      ]),
      _: 2
    }, [
      e.enableExport && !s.loading ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Bt), {
            variant: "inline",
            loading: e.exportLoading,
            onExport: l
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), w0 = /* @__PURE__ */ it(k0, [["__scopeId", "data-v-92007b9a"]]), C0 = {
  key: 0,
  class: "flex min-h-[380px] flex-1 flex-col items-center justify-center px-4"
}, $0 = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, M0 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, S0 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, D0 = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, A0 = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, T0 = { class: "max-w-[360px] px-4 text-center" }, B0 = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, L0 = /* @__PURE__ */ Z({
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
  setup(e, { expose: t, emit: n }) {
    const a = [30, 50, 70, 50, 40], o = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], s = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, i = e, l = n, d = (m) => {
      l("export", m);
    }, c = dt(i, "theme"), { isDark: u } = ut(c), h = D(() => {
      const m = i.data?.agents_by_day || {}, v = Object.keys(m).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const p = /* @__PURE__ */ new Set();
      for (const w of Object.values(m))
        for (const M of Object.keys(w))
          p.add(M);
      const x = Array.from(p).map((w) => {
        const M = w.toLowerCase(), C = o[M] || o[w] || "#94a3b8";
        return {
          label: x.charAt(0).toUpperCase() + x.slice(1).replace(/_/g, " "),
          data: v.map(($) => b[$]?.[x] || 0),
          borderColor: C
        };
      });
      return {
        labels: v.map((w) => Lt(w).format("MMM DD")),
        datasets: x
      };
    }), g = D(() => {
      const m = i.data?.agents_by_day || {}, v = {};
      for (const b of Object.values(m))
        for (const [x, w] of Object.entries(b))
          v[x] = (v[x] || 0) + w;
      const p = Object.values(v).reduce((b, x) => b + x, 0);
      return p === 0 ? [] : Object.entries(v).sort(([, b], [, x]) => x - b).map(([b, x]) => {
        const w = b.toLowerCase();
        return {
          name: b,
          label: b.charAt(0).toUpperCase() + b.slice(1).replace(/_/g, " "),
          total: x,
          percentage: (x / p * 100).toFixed(1),
          color: o[w] || o[b] || "#94a3b8"
        };
      });
    }), y = D(() => g.value.slice(0, 4)), f = D(() => {
      const m = y.value.length;
      return m <= 1 ? "grid w-full grid-cols-1 gap-3 sm:gap-4" : m === 2 ? "grid w-full grid-cols-2 gap-3 sm:gap-4" : m === 3 ? "grid w-full grid-cols-3 gap-3 sm:gap-4" : "grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4";
    });
    return t({ isDark: u }), (b, v) => (_(), tt(gt, {
      class: "w-full min-h-0 self-start",
      title: "Interactions by Agent",
      subtitle: "Responses sent by AI agents",
      collapsible: !1
    }, St({
      default: P(() => [
        r("div", {
          class: W(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", i.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          i.loading ? (_(), k("div", C0, [
            r("div", $0, [
              (_(), k(q, null, at(a, (p, b) => r("div", {
                key: b,
                class: W(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", s[b]]),
                style: gt({ height: `${p}%` })
              }, null, 6)), 64))
            ]),
            v[0] || (v[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading agent metrics... ", -1))
          ])) : (_(), k(q, { key: 1 }, [
            h.value.labels && h.value.labels.length ? (_(), k("section", M0, [
              r("div", S0, [
                R(ge, {
                  data: h.value,
                  options: e.options,
                  theme: c.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              y.value.length ? (_(), w("div", {
                key: 0,
                class: W(f.value)
              }, [
                (_(!0), k(q, null, at(y.value, (p) => (_(), nt(lt, {
                  key: p.name,
                  color: p.color,
                  title: p.label,
                  value: `${p.percentage}%`,
                  subvalue: `${F(U)(p.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 2)) : z("", !0)
            ])) : g.value.length ? (_(), k("section", D0, [
              r("div", {
                class: W(f.value)
              }, [
                (_(!0), k(q, null, at(y.value, (p) => (_(), nt(lt, {
                  key: p.name,
                  color: p.color,
                  title: p.label,
                  value: `${p.percentage}%`,
                  subvalue: `${F(U)(p.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 2)
            ])) : z("", !0),
            g.value.length ? z("", !0) : (_(), k("section", A0, [
              r("div", T0, [
                r("div", B0, [
                  R(F(Wt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                v[1] || (v[1] = r("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agent interactions data ", -1)),
                v[2] || (v[2] = r("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
              ])
            ]))
          ], 64))
        ], 2)
      ]),
      _: 2
    }, [
      e.enableExport && !i.loading ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Bt), {
            variant: "inline",
            loading: e.exportLoading,
            onExport: d
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), F0 = /* @__PURE__ */ it(L0, [["__scopeId", "data-v-75264875"]]), E0 = {
  key: 0,
  class: "loading-state"
}, I0 = {
  key: 1,
  class: "card-body"
}, P0 = {
  key: 0,
  class: "chart-section"
}, R0 = {
  key: 1,
  class: "empty-state"
}, O0 = {
  key: 2,
  class: "comparison-section"
}, z0 = { class: "comparison-grid" }, V0 = /* @__PURE__ */ Z({
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
    channelComparison: { default: () => [] },
    initiallyOpen: { type: Boolean, default: !0 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: n }) {
    const a = {
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
    }, s = ["#B0C4DE", "#C9A0F2", "#F5C26B", "#8BE8B0", "#F2A07A", "#7BA3E8"], o = e, i = n, l = (f) => {
      i("export", f);
    }, { isDark: d } = ut(dt(o, "theme"));
    D(() => o.data?.total_sell_success ?? 0);
    const c = D(() => {
      const f = /* @__PURE__ */ new Set();
      for (const m of o.data?.sales_by_channel_by_day ?? [])
        for (const v of Object.keys(m.channels))
          f.add(v);
      return Array.from(f).sort();
    }), u = (f, m) => a[f.toLowerCase()] ?? s[m % s.length];
    function h(f) {
      return f.replace(/_/g, " ").toUpperCase();
    }
    function g(f) {
      if (f.delta === null) return "No previous data";
      const m = U(f.previous), v = `${Math.abs(f.delta).toFixed(1)}%`;
      return f.delta === 0 ? `0.0% vs prev. period (${m})` : `${f.delta > 0 ? "↑" : "↓"} ${v} vs prev. period (${m})`;
    }
    const y = D(() => {
      const f = o.data?.sales_by_channel_by_day ?? [];
      if (f.length === 0) return { labels: [], datasets: [] };
      const m = f.map((p) => Lt(p.date).format("MMM-DD")), v = c.value.map((p, b) => ({
        label: p,
        data: f.map((x) => x.channels[p] ?? 0),
        backgroundColor: u(p, b),
        borderRadius: 4
      }));
      return { labels: b, datasets: v };
    });
    return t({ isDark: d }), (p, b) => (_(), tt(gt, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen
    }, St({
      default: P(() => [
        o.loading ? (_(), k("div", E0, [...m[0] || (m[0] = [
          r("div", { class: "loading-container" }, [
            r("div", { class: "chart-bars-loader" }, [
              r("div", { class: "bar bar-1" }),
              r("div", { class: "bar bar-2" }),
              r("div", { class: "bar bar-3" }),
              r("div", { class: "bar bar-4" }),
              r("div", { class: "bar bar-5" })
            ]),
            r("p", { class: "loading-text" }, "Loading sales data...")
          ], -1)
        ])])) : (_(), k("div", I0, [
          y.value.labels.length > 0 ? (_(), k("section", P0, [
            R(he, {
              data: y.value,
              stacked: !0
            }, null, 8, ["data"])
          ])) : (_(), k("section", R0, [...m[1] || (m[1] = [
            r("div", { class: "empty-state-content" }, [
              r("div", { class: "empty-icon-wrapper" }, [
                r("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  })
                ])
              ]),
              r("p", { class: "empty-title" }, "No sales data available"),
              r("p", { class: "empty-description" }, "No sales by channel data found for the selected period. Try adjusting the date range.")
            ], -1)
          ])])),
          e.channelComparison.length > 0 ? (_(), k("section", O0, [
            r("div", z0, [
              (_(!0), k(q, null, at(e.channelComparison, (v, p) => (_(), nt(F(lt), {
                key: v.channel,
                color: u(v.channel, p),
                title: h(v.channel),
                value: F(U)(v.current),
                subvalue: g(v)
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : z("", !0)
        ]))
      ]),
      _: 2
    }, [
      e.enableExport && !s.loading ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Bt), {
            variant: "inline",
            onExport: l,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["default-open"]));
  }
}), Ii = /* @__PURE__ */ it(V0, [["__scopeId", "data-v-a7a085c2"]]), N0 = {
  key: 0,
  class: "loading-state"
}, W0 = {
  key: 1,
  class: "card-body"
}, H0 = {
  key: 0,
  class: "chart-section"
}, j0 = { class: "chart-wrapper" }, Y0 = {
  key: 1,
  class: "empty-state"
}, K0 = { class: "seller-value-cards" }, q0 = {
  key: 2,
  class: "seller-daily-section"
}, U0 = { class: "w-full min-w-0" }, X0 = { class: "sl-cell font-medium" }, G0 = { class: "sl-cell text-center" }, Z0 = { class: "sl-cell text-center" }, Q0 = { class: "sl-cell text-center" }, J0 = { class: "sl-cell text-center" }, tb = { class: "sl-cell text-center" }, eb = { class: "sl-cell text-center success-value" }, nb = {
  key: 0,
  class: "currency-cell-list"
}, ab = {
  key: 1,
  class: "empty-cell"
}, sb = { class: "sl-cell text-center success-value" }, ob = { class: "sl-cell text-center" }, ib = { class: "sl-cell text-center success-value" }, lb = {
  key: 0,
  class: "currency-cell-list"
}, Sb = {
  key: 1,
  class: "empty-cell"
}, cb = { class: "sl-cell text-center success-value" }, db = { class: "sl-cell text-center" }, ub = { class: "sl-cell text-center success-value" }, hb = {
  key: 0,
  class: "currency-cell-list"
}, fb = { key: 1 }, gb = {
  key: 0,
  class: "failed-reasons"
}, pb = { class: "reason-name" }, mb = { class: "reason-count" }, bb = {
  key: 1,
  class: "empty-cell"
}, vb = /* @__PURE__ */ Z({
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
    exportLoading: { type: Boolean, default: !1 },
    initiallyOpen: { type: Boolean, default: !0 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: n }) {
    function a(B) {
      return B;
    }
    const s = e, o = n, i = (B) => {
      o("export", B);
    }, { isDark: l } = ut(dt(s, "theme")), d = D(() => {
      if (!s.sellerData?.seller_by_day) return [];
      const B = [...s.sellerData.seller_by_day];
      return s.failedData?.failed_by_reason_by_day && s.failedData.failed_by_reason_by_day.forEach((E) => {
        const I = B.findIndex((V) => V.date === E.date);
        I !== -1 ? B[I] = { ...B[I], reasons: E.reasons } : B.push({
          date: E.date,
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
          reasons: E.reasons
        });
      }), B.sort((E, I) => new Date(E.date).getTime() - new Date(I.date).getTime());
    }), c = [
      { key: "date", label: "Date", align: "center" },
      { key: "sellInitiated", label: "Sell Initiated", align: "center" },
      { key: "sellStarted", label: "Sell Started", align: "center" },
      { key: "getQuote", label: "Get Quote", align: "center" },
      { key: "bookingCreated", label: "Booking Created", align: "center" },
      { key: "bankTransfer", label: "Bank Transfer", align: "center" },
      { key: "btValue", label: "BT Success Value", align: "center" },
      { key: "btSuccess", label: "BT Success", align: "center" },
      { key: "cashOption", label: "Cash Option", align: "center" },
      { key: "coValue", label: "CO Success Value", align: "center" },
      { key: "cashSuccess", label: "Cash Success", align: "center" },
      { key: "sellSuccess", label: "Sell Success", align: "center" },
      { key: "totalSalesValue", label: "Total Sales Value", align: "center" },
      { key: "failed", label: "Failed", align: "left" }
    ], u = D(
      () => d.value.map((B) => ({
        id: B.date,
        ...B
      }))
    ), h = D(() => s.sellerData), g = D(() => s.failedData), y = D(
      () => Array.isArray(s.sellerData.total_value_sell_success) ? s.sellerData.total_value_sell_success : []
    ), f = D(
      () => Array.isArray(s.sellerData.total_value_sell_bank_transfer) ? s.sellerData.total_value_sell_bank_transfer : []
    ), m = D(
      () => Array.isArray(s.sellerData.total_value_sell_cash_option) ? s.sellerData.total_value_sell_cash_option : []
    ), v = D(() => {
      const B = y.value;
      return B.length > 0 ? B.map((E) => `${E.currency} ${ye(E.total_value)}`).join(" · ") : T(s.sellerData.total_value_sell_success);
    });
    function p(B) {
      return B.length > 0 ? B.map((E) => `${E.currency} ${ye(E.total_value)}`).join(" · ") : "—";
    }
    const b = D(
      () => p(f.value)
    ), x = D(
      () => p(m.value)
    ), w = D(() => {
      const {
        total_seller_conversations: B = 0,
        total_sell_started: E = 0,
        total_sell_booking_created: I = 0,
        total_sell_success: V = 0,
        total_sell_bank_transfer: Y = 0,
        total_sell_cash_option: N = 0,
        total_sell_success_bank_transfer: tt = 0,
        total_sell_success_cash: et = 0
      } = h.value, { failed_by_reason_by_day: rt = [] } = g.value;
      if (B === 0) return { nodes: [], links: [] };
      const G = Math.max(0, V - (tt ?? 0) - (et ?? 0)), K = [
        { name: "Sell Initiated", value: B },
        { name: "Sell Started", value: E },
        { name: "Booking Created", value: I },
        { name: "Sell Success", value: G }
      ], j = [], ot = B - E;
      if (ot > 0) {
        const Q = Math.round(ot / B * 100);
        K.push({ name: "Abandoned (Init)", value: ot }), j.push({
          source: "Sell Initiated",
          target: "Abandoned (Init)",
          value: ot,
          label: `${ot.toLocaleString()} (${Q}%)`
        });
      }
      if (E > 0) {
        const Q = Math.round(E / B * 100);
        j.push({
          source: "Sell Initiated",
          target: "Sell Started",
          value: E,
          label: `${E.toLocaleString()} (${Q}%)`
        });
      }
      const X = rt.reduce((Q, Ct) => (Ct.reasons && Array.isArray(Ct.reasons) && Ct.reasons.forEach((Mt) => {
        const Bt = Mt.reason, ee = Mt.failed_count;
        Q[Bt] = (Q[Bt] || 0) + ee;
      }), Q), {});
      if (I > 0) {
        const Q = Math.round(I / B * 100);
        j.push({
          source: "Sell Started",
          target: "Booking Created",
          value: I,
          label: `${I.toLocaleString()} (${Q}%)`
        });
      }
      if (Y > 0) {
        const Q = Math.round(Y / B * 100);
        K.push({ name: "Bank Transfer", value: Y }), j.push({
          source: "Booking Created",
          target: "Bank Transfer",
          value: Y,
          label: `${Y.toLocaleString()} (${Q}%)`
        });
      }
      if (N > 0) {
        const Q = Math.round(N / B * 100);
        K.push({ name: "Cash Option", value: N }), j.push({
          source: "Booking Created",
          target: "Cash Option",
          value: N,
          label: `${N.toLocaleString()} (${Q}%)`
        });
      }
      if (G > 0) {
        const Q = Math.round(G / B * 100);
        j.push({
          source: "Booking Created",
          target: "Sell Success",
          value: G,
          label: `${G.toLocaleString()} (${Q}%)`
        });
      }
      if ((tt ?? 0) > 0) {
        const Q = Math.round((tt ?? 0) / B * 100);
        K.push({ name: "Bank Transfer Success", value: tt ?? 0 }), j.push({
          source: "Bank Transfer",
          target: "Bank Transfer Success",
          value: tt ?? 0,
          label: `${(tt ?? 0).toLocaleString()} (${Q}%)`
        });
      }
      if ((et ?? 0) > 0) {
        const Q = Math.round((et ?? 0) / B * 100);
        K.push({ name: "Cash Option Success", value: et ?? 0 }), j.push({
          source: "Cash Option",
          target: "Cash Option Success",
          value: et ?? 0,
          label: `${(et ?? 0).toLocaleString()} (${Q}%)`
        });
      }
      const ct = I - G - Y - N;
      if (ct > 0) {
        const Q = Math.round(ct / B * 100);
        K.push({ name: "Failed at Completion", value: ct }), j.push({
          source: "Booking Created",
          target: "Failed at Completion",
          value: ct,
          label: `${ct.toLocaleString()} (${Q}%)`
        });
      }
      const pt = E - I;
      if (pt > 0) {
        const Q = Math.round(pt / B * 100);
        K.push({ name: "Failed at Booking", value: pt }), j.push({
          source: "Sell Started",
          target: "Failed at Booking",
          value: pt,
          label: `${pt.toLocaleString()} (${Q}%)`
        });
      }
      if (Object.keys(X).length > 0) {
        const Q = Object.values(X).reduce((Mt, Bt) => Mt + Bt, 0), Ct = pt - Q;
        if (Object.entries(X).filter(([, Mt]) => Mt > 0).sort(([, Mt], [, Bt]) => Bt - Mt).forEach(([Mt, Bt]) => {
          const ee = Math.round(Bt / B * 100);
          K.push({ name: `Failed: ${Mt}`, value: Bt }), j.push({
            source: "Failed at Booking",
            target: `Failed: ${Mt}`,
            value: Bt,
            label: `${Bt.toLocaleString()} (${ee}%)`
          });
        }), Ct > 0) {
          const Mt = Math.round(Ct / B * 100);
          K.push({ name: "Failed: Without Reason", value: Ct }), j.push({
            source: "Failed at Booking",
            target: "Failed: Without Reason",
            value: Ct,
            label: `${Ct.toLocaleString()} (${Mt}%)`
          });
        }
      }
      return { nodes: K, links: j };
    }), M = {
      "Sell Initiated": "#DBEAFE",
      "Abandoned (Init)": "#FEE2E2",
      "Sell Started": "#93C5FD",
      "Get Quote": "#C7D2FE",
      "Booking Created": "#8B8CF6",
      "Bank Transfer": "#fde68a",
      "Cash Option": "#fde68a",
      "Bank Transfer Success": "#4ade80",
      "Cash Option Success": "#4ade80",
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
    }, C = D(() => M), $ = (B, E) => !E || E === 0 ? "0%" : `${Math.round(B / E * 100)}%`, S = (B, E) => {
      const I = U(B), V = $(B, E);
      return `${I} (${V})`;
    }, L = (B) => B == null ? 0 : typeof B == "number" ? B : Array.isArray(B) ? B.reduce((E, I) => E + (I.total_value || 0), 0) : 0, T = (B) => ye(L(B));
    return t({ isDark: l }), (B, E) => (_(), nt(ft, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen
    }, St({
      default: P(() => [
        s.loading ? (_(), k("div", N0, [...E[0] || (E[0] = [
          r("div", { class: "loading-container" }, [
            r("div", { class: "chart-flow-loader" }, [
              r("div", { class: "flow-line flow-1" }),
              r("div", { class: "flow-line flow-2" }),
              r("div", { class: "flow-line flow-3" }),
              r("div", { class: "flow-line flow-4" }),
              r("div", { class: "flow-line flow-5" })
            ]),
            r("p", { class: "loading-text" }, "Loading sales data...")
          ], -1)
        ])])) : (_(), k("div", W0, [
          w.value.nodes.length > 0 ? (_(), k("section", H0, [
            r("div", j0, [
              R(Se, {
                data: w.value,
                "node-colors": C.value,
                title: "",
                height: "320px"
              }, null, 8, ["data", "node-colors"])
            ])
          ])) : (_(), k("section", Y0, [...E[1] || (E[1] = [
            r("div", { class: "empty-state-content" }, [
              r("div", { class: "empty-icon-wrapper" }, [
                r("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  })
                ])
              ]),
              r("p", { class: "empty-title" }, "No sales data available"),
              r("p", { class: "empty-description" }, "No sales data found for the selected period. Try adjusting the date range.")
            ], -1)
          ])])),
          r("section", K0, [
            R(lt, {
              class: "seller-value-card",
              color: "var(--kiut-success)",
              title: "Total Sales Value",
              value: v.value
            }, null, 8, ["value"]),
            R(lt, {
              class: "seller-value-card",
              color: "#d97706",
              title: "Bank Transfer Value",
              value: f.value
            }, null, 8, ["value"]),
            R(lt, {
              class: "seller-value-card",
              color: "#ca8a04",
              title: "Cash Option Value",
              value: k.value
            }, null, 8, ["value"])
          ]),
          d.value && d.value.length > 0 ? (_(), k("section", q0, [
            r("div", U0, [
              R(qt, {
                columns: c,
                rows: u.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": P(({ row: I }) => [
                  r("span", X0, A(F(Lt)(String(I.date)).format("MMM DD")), 1)
                ]),
                "cell-sellInitiated": P(({ row: I }) => [
                  r("span", G0, A(F(U)(Number(I.seller_conversations) || 0)), 1)
                ]),
                "cell-sellStarted": P(({ row: I }) => [
                  r("span", Z0, A(S(I.sell_started_count, I.seller_conversations || I.sell_started_count)), 1)
                ]),
                "cell-getQuote": P(({ row: I }) => [
                  r("span", Q0, A(S(I.sell_get_quote_count, I.seller_conversations || I.sell_started_count)), 1)
                ]),
                "cell-bookingCreated": P(({ row: I }) => [
                  r("span", J0, A(S(I.sell_booking_created_count, I.seller_conversations || I.sell_started_count)), 1)
                ]),
                "cell-bankTransfer": P(({ row: I }) => [
                  r("span", tb, A(F(U)(Number(I.sell_bank_transfer_count) || 0)), 1)
                ]),
                "cell-btValue": P(({ row: I }) => [
                  r("span", eb, [
                    Array.isArray(I.daily_value_sell_success_bank_transfer) && I.daily_value_sell_success_bank_transfer.length > 0 ? (_(), k("div", nb, [
                      (_(!0), k(q, null, at(I.daily_value_sell_success_bank_transfer, (V) => (_(), k("span", {
                        key: `${I.date}-bt-success-${V.currency}`
                      }, A(V.currency) + " " + A(F(ye)(V.total_value)), 1))), 128))
                    ])) : (_(), k("span", ab, "-"))
                  ])
                ]),
                "cell-btSuccess": P(({ row: I }) => [
                  r("span", sb, A(F(U)(Number(I.sell_success_bank_transfer_count) || 0)), 1)
                ]),
                "cell-cashOption": P(({ row: I }) => [
                  r("span", ob, A(F(U)(Number(I.sell_cash_option_count) || 0)), 1)
                ]),
                "cell-coValue": P(({ row: I }) => [
                  r("span", ib, [
                    Array.isArray(I.daily_value_sell_success_cash) && I.daily_value_sell_success_cash.length > 0 ? (_(), k("div", lb, [
                      (_(!0), k(q, null, at(I.daily_value_sell_success_cash, (V) => (_(), k("span", {
                        key: `${I.date}-co-success-${V.currency}`
                      }, A(V.currency) + " " + A(F(ye)(V.total_value)), 1))), 128))
                    ])) : (_(), k("span", rb, "-"))
                  ])
                ]),
                "cell-cashSuccess": P(({ row: I }) => [
                  r("span", cb, A(F(U)(Number(I.sell_success_cash_count) || 0)), 1)
                ]),
                "cell-sellSuccess": P(({ row: I }) => [
                  r("span", db, A(S(I.sell_success_count, I.seller_conversations || I.sell_started_count)), 1)
                ]),
                "cell-totalSalesValue": P(({ row: I }) => [
                  r("span", ub, [
                    Array.isArray(I.daily_value_sell_success) && I.daily_value_sell_success.length > 0 ? (_(), k("div", hb, [
                      (_(!0), k(q, null, at(I.daily_value_sell_success, (V) => (_(), k("span", {
                        key: `${I.date}-${V.currency}`
                      }, A(V.currency) + " " + A(F(ye)(V.total_value)), 1))), 128))
                    ])) : (_(), k("span", fb, A(T(I.daily_value_sell_success)), 1))
                  ])
                ]),
                "cell-failed": P(({ row: I }) => [
                  (I.reasons || []).length > 0 ? (_(), k("div", gb, [
                    (_(!0), k(q, null, at(I.reasons || [], (V) => (_(), k("div", {
                      key: V.reason,
                      class: "failed-reason-item"
                    }, [
                      r("span", pb, A(V.reason) + ":", 1),
                      r("span", mb, A(V.failed_count), 1)
                    ]))), 128))
                  ])) : (_(), k("div", bb, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : z("", !0)
        ]))
      ]),
      _: 2
    }, [
      e.enableExport && !o.loading ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Bt), {
            variant: "inline",
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["default-open"]));
  }
}), Pi = /* @__PURE__ */ it(vb, [["__scopeId", "data-v-036ff257"]]), yb = { class: "seller-container__body" }, _b = /* @__PURE__ */ Z({
  __name: "SellerContainer",
  props: {
    containerInitiallyOpen: { type: Boolean, default: !1 },
    childrenInitiallyOpen: { type: Boolean, default: !0 },
    loading: { type: Boolean, default: !1 },
    sellerLoading: { type: Boolean, default: !1 },
    salesByChannelLoading: { type: Boolean, default: !1 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 },
    sellerExportLoading: { type: Boolean, default: !1 },
    salesByChannelExportLoading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    sellerData: {},
    failedData: {},
    salesByChannelData: {},
    channelComparison: { default: () => [] }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = D(() => n.loading || n.sellerLoading), o = D(() => n.loading || n.salesByChannelLoading), i = D(() => n.exportLoading || n.sellerExportLoading), l = D(() => n.exportLoading || n.salesByChannelExportLoading);
    function d(c, u) {
      a("export", { source: c, format: u });
    }
    return (c, u) => (_(), tt(gt, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen
    }, {
      default: P(() => [
        r("div", yb, [
          R(Pi, {
            "initially-open": e.childrenInitiallyOpen,
            "seller-data": e.sellerData,
            "failed-data": e.failedData,
            loading: o.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": i.value,
            onExport: u[0] || (u[0] = (h) => d("seller", h))
          }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading"]),
          R(qi, {
            "initially-open": e.childrenInitiallyOpen,
            data: e.salesByChannelData,
            "channel-comparison": e.channelComparison,
            loading: s.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": l.value,
            onExport: u[1] || (u[1] = (h) => d("salesByChannel", h))
          }, null, 8, ["initially-open", "data", "channel-comparison", "loading", "theme", "enable-export", "export-loading"])
        ])
      ]),
      _: 1
    }, 8, ["default-open"]));
  }
}), xb = /* @__PURE__ */ it(_b, [["__scopeId", "data-v-878fdbc6"]]), kb = {
  key: 0,
  class: "card-body"
}, wb = {
  key: 0,
  class: "chart-section"
}, Cb = {
  key: 1,
  class: "empty-state"
}, $b = { class: "empty-state-content" }, Mb = { class: "empty-icon-wrapper" }, Sb = {
  key: 1,
  class: "loading-state"
}, Db = /* @__PURE__ */ Z({
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
  setup(e, { expose: t, emit: n }) {
    const a = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, s = e, o = n, i = (h) => {
      o("export", h);
    }, { isDark: l, colors: d } = ut(dt(s, "theme")), c = D(() => {
      const g = (s.data?.top_agents || []).filter(
        (v) => v.agent_type?.toLowerCase() !== "triage"
      );
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const y = g.reduce(
        (v, p) => v + (Number(p.conversations) || 0),
        0
      ), f = g.map((v) => {
        const p = v.agent_type?.toLowerCase();
        return a[p] || "#94a3b8";
      }), m = f.map((v) => `${v}80`);
      return {
        labels: g.map((v) => {
          const p = Number(v.conversations) || 0, b = y ? p / y * 100 : 0;
          return `${v.agent_type} - ${p.toLocaleString()} (${b.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: g.map((v) => v.conversations),
            backgroundColor: m,
            borderColor: f,
            borderWidth: 2
          }
        ]
      };
    }), u = D(() => s.options ? s.options : {
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
            color: d.value.textSecondary
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: d.value.tooltipBg,
          titleColor: d.value.tooltipText,
          bodyColor: d.value.tooltipText,
          borderColor: l.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
              const g = (h.label || "").toString().split(" - ")[0], y = Number(h.parsed) || 0, f = (h.dataset.data || []).reduce(
                (v, p) => v + (Number(p) || 0),
                0
              ), m = f ? y / f * 100 : 0;
              return `${g}: ${y.toLocaleString()} (${m.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: l }), (h, g) => (_(), nt(ft, {
      class: "top-agents-root h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1
    }, St({
      default: P(() => [
        e.loading ? (_(), k("div", Sb, [...g[2] || (g[2] = [
          r("div", { class: "loading-container" }, [
            r("div", { class: "chart-lines-loader" }, [
              r("div", { class: "line line-1" }),
              r("div", { class: "line line-2" }),
              r("div", { class: "line line-3" }),
              r("div", { class: "line line-4" }),
              r("div", { class: "line line-5" })
            ]),
            r("p", { class: "loading-text" }, "Loading chart data...")
          ], -1)
        ])])) : (_(), k("div", kb, [
          c.value.labels && c.value.labels.length ? (_(), k("section", wb, [
            R(na, {
              data: c.value,
              options: u.value
            }, null, 8, ["data", "options"])
          ])) : (_(), k("section", Cb, [
            r("div", $b, [
              r("div", Mb, [
                R(F(Wg), { class: "empty-icon" })
              ]),
              g[0] || (g[0] = r("p", { class: "empty-title" }, "No top agents data", -1)),
              g[1] || (g[1] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
            ])
          ]))
        ]))
      ]),
      _: 2
    }, [
      e.enableExport && !e.loading ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Bt), {
            variant: "inline",
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), Ab = /* @__PURE__ */ it(Db, [["__scopeId", "data-v-b027642a"]]), Tb = {
  key: 0,
  class: "loading-state"
}, Bb = {
  key: 1,
  class: "card-body"
}, Lb = {
  key: 0,
  class: "payment-methods-section"
}, Fb = { class: "payment-methods-grid" }, Eb = {
  key: 1,
  class: "empty-state"
}, Ib = { class: "empty-state-content" }, Pb = { class: "empty-icon-wrapper" }, Rb = {
  key: 2,
  class: "payment-method-daily-section"
}, Ob = { class: "w-full min-w-0" }, zb = { class: "font-medium" }, Vb = { class: "text-center" }, Nb = { class: "text-center success-value" }, Wb = {
  key: 0,
  class: "currency-cell-list"
}, Hb = { class: "payment-tags" }, jb = { class: "tag-name" }, Yb = {
  key: 0,
  class: "tag-amount"
}, Kb = {
  key: 1,
  class: "tag-amount"
}, qb = { class: "tag-count" }, Ub = {
  key: 3,
  class: "empty-table-state"
}, Xb = "Not Registered", Gb = /* @__PURE__ */ Z({
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
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, { isDark: o } = ut(dt(a, "theme")), i = st(!1), l = st({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), d = D(() => l.value.payment_method_breakdown && l.value.payment_method_breakdown.length > 0), c = D(() => l.value.payment_method_by_day && l.value.payment_method_by_day.length > 0), u = D(() => !l.value.payment_method_by_day || l.value.payment_method_by_day.length === 0 ? [] : [...l.value.payment_method_by_day].sort(($, S) => Lt($.date).valueOf() - Lt(S.date).valueOf())), h = [
      { key: "date", label: "Date", align: "left" },
      { key: "totalSales", label: "Total Sales", align: "center" },
      { key: "totalAmount", label: "Total Amount", align: "center" },
      { key: "paymentMethods", label: "Payment Methods", align: "left" }
    ], g = D(
      () => u.value.map(($) => ({
        id: $.date,
        date: $.date,
        total_count: $.total_count,
        total_amount: $.total_amount,
        total_amount_by_currency: $.total_amount_by_currency,
        payment_methods: $.payment_methods
      }))
    ), y = ($) => {
      if (!$)
        return {
          airline_name: a.airlineName,
          start_date: "",
          end_date: "",
          total_conversations: 0,
          total_amount: 0,
          total_amount_by_currency: [],
          payment_method_breakdown: [],
          payment_method_by_day: []
        };
      const S = ($.payment_method_breakdown || []).map((T) => ({
        payment_method: T.payment_method || "Unknown",
        total_amount: T.total_amount ?? 0,
        count: T.count ?? 0,
        total_amount_by_currency: T.total_amount_by_currency ?? []
      })), L = ($.payment_method_by_day || []).map((T) => ({
        date: T.date || "",
        total_count: T.total_count ?? 0,
        total_amount: T.total_amount ?? 0,
        total_amount_by_currency: T.total_amount_by_currency ?? [],
        payment_methods: (T.payment_methods || []).map((B) => ({
          payment_method: B.payment_method || "Unknown",
          total_amount: B.total_amount ?? 0,
          count: B.count ?? 0,
          total_amount_by_currency: B.total_amount_by_currency ?? []
        }))
      }));
      return {
        airline_name: $.airline_name || a.airlineName,
        start_date: $.start_date || "",
        end_date: $.end_date || "",
        total_conversations: $.total_conversations ?? 0,
        total_amount: $.total_amount ?? 0,
        total_sell_usd: $.total_sell_usd,
        total_amount_by_currency: $.total_amount_by_currency ?? [],
        payment_method_breakdown: S,
        payment_method_by_day: L
      };
    }, p = async () => {
      if (!(!a.fetchFunction || !a.dates || a.dates.length < 2 || !a.airlineName)) {
        i.value = !0;
        try {
          const [$, S] = a.dates.map((T) => Lt(T).format("YYYY-MM-DD")), L = await a.fetchFunction(a.airlineName, $, S);
          l.value = y(L);
        } catch ($) {
          console.error("Error fetching payment method metrics:", $), l.value = y(null);
        } finally {
          i.value = !1;
        }
      }
    }, m = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#f43f5e", "#06b6d4"], v = ($) => !$ || $.toLowerCase() === "unknown" ? Xb : $.replace(/_/g, " "), p = ($) => $ == null ? "$0.00" : yt($), b = ($) => {
      const S = $.total_amount_by_currency;
      return S && S.length > 0 ? S.map((L) => `${L.currency} ${p(L.total_value)}`).join(" · ") : p($.total_amount);
    }, x = ($) => $ ? Lt($).format("MMM DD") : "-", w = ($) => $ == null || Number.isNaN(Number($)) ? 0 : Number($), M = ($) => {
      s("export", $);
    };
    function C() {
      const $ = a.data;
      $ && (Array.isArray($.payment_method_breakdown) && $.payment_method_breakdown.length > 0 || Array.isArray($.payment_method_by_day) && $.payment_method_by_day.length > 0) && (i.value = !1, l.value = y($));
    }
    return te(() => {
      a.data ? C() : f();
    }), Ft(
      () => a.data,
      ($) => {
        $ && C();
      },
      { deep: !0 }
    ), Ft(
      () => a.dates,
      ($) => {
        a.data || $ && $[0] && $[1] && p();
      },
      { deep: !0 }
    ), t({ isDark: s }), ($, S) => (_(), tt(gt, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method"
    }, St({
      default: P(() => [
        i.value ? (_(), k("div", Tb, [...S[0] || (S[0] = [
          r("div", { class: "loading-container" }, [
            r("div", { class: "chart-lines-loader" }, [
              r("div", { class: "line line-1" }),
              r("div", { class: "line line-2" }),
              r("div", { class: "line line-3" }),
              r("div", { class: "line line-4" }),
              r("div", { class: "line line-5" })
            ]),
            r("p", { class: "loading-text" }, "Loading payment data...")
          ], -1)
        ])])) : (_(), k("div", Bb, [
          d.value ? (_(), k("section", Lb, [
            S[1] || (S[1] = r("p", { class: "section-label" }, "Sales by Payment Method", -1)),
            r("div", Fb, [
              (_(!0), k(q, null, at(l.value.payment_method_breakdown, (L, T) => (_(), nt(lt, {
                key: L.payment_method,
                class: "payment-method-card-item min-w-0",
                color: m[T % m.length],
                title: v(L.payment_method),
                value: f(L),
                subvalue: `${x(L.count)} ${x(L.count) === 1 ? "sale" : "sales"}`
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : (_(), k("section", Eb, [
            r("div", Ib, [
              r("div", Pb, [
                R(F(Kg), { class: "empty-icon" })
              ]),
              S[2] || (S[2] = r("p", { class: "empty-title" }, "No payment data available", -1)),
              S[3] || (S[3] = r("p", { class: "empty-description" }, "No payment method data found for the selected period. Try adjusting the date range.", -1))
            ])
          ])),
          c.value ? (_(), k("section", Rb, [
            S[5] || (S[5] = r("p", { class: "section-label" }, "Daily Breakdown", -1)),
            r("div", Ob, [
              R(qt, {
                columns: h,
                rows: g.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": P(({ row: L }) => [
                  r("span", zb, A(x(String(L.date))), 1)
                ]),
                "cell-totalSales": P(({ row: L }) => [
                  r("span", Vb, A(F(U)(L.total_count ?? 0)), 1)
                ]),
                "cell-totalAmount": P(({ row: L }) => [
                  r("span", Nb, [
                    Array.isArray(L.total_amount_by_currency) && L.total_amount_by_currency.length > 0 ? (_(), k("div", Wb, [
                      (_(!0), k(q, null, at(L.total_amount_by_currency, (T) => (_(), k("span", {
                        key: `${L.date}-${T.currency}`
                      }, A(T.currency) + " " + A(p(T.total_value)), 1))), 128))
                    ])) : (_(), k(q, { key: 1 }, [
                      bt(A(p(Number(L.total_amount ?? 0))), 1)
                    ], 64))
                  ])
                ]),
                "cell-paymentMethods": P(({ row: L }) => [
                  r("div", Hb, [
                    (_(!0), k(q, null, at(Array.isArray(L.payment_methods) ? L.payment_methods : [], (T) => (_(), k("div", {
                      key: T.payment_method,
                      class: "payment-tag"
                    }, [
                      r("span", jb, A(v(T.payment_method)), 1),
                      S[4] || (S[4] = r("span", { class: "tag-separator" }, "•", -1)),
                      !T.total_amount_by_currency || T.total_amount_by_currency.length === 0 ? (_(), k("span", Yb, A(p(T.total_amount)), 1)) : (_(), k("span", Kb, A(T.total_amount_by_currency.map((B) => `${B.currency} ${p(B.total_value)}`).join(" / ")), 1)),
                      r("span", qb, "(" + A(w(T.count)) + ")", 1)
                    ]))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : d.value ? (_(), k("div", Ub, [...S[6] || (S[6] = [
            r("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
          ])])) : z("", !0)
        ]))
      ]),
      _: 2
    }, [
      e.enableExport && !i.value ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Bt), {
            variant: "inline",
            onExport: M,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), Zb = /* @__PURE__ */ it(Gb, [["__scopeId", "data-v-21b6865b"]]), Qb = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, Jb = { class: "overflow-x-auto" }, tv = { class: "kiut-table w-full min-w-[640px] border-collapse text-left text-sm" }, ev = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, nv = {
  key: 0,
  scope: "col",
  class: "w-12 px-4 py-3 text-center align-middle"
}, av = ["checked", "aria-label"], sv = {
  key: 0,
  class: "w-12 bg-transparent px-4 py-3 text-center align-middle"
}, ov = ["checked", "aria-label", "onChange"], iv = /* @__PURE__ */ Z({
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
    const n = e, a = t, o = nt(null);
    function s(f) {
      return `cell-${f}`;
    }
    function i(f) {
      return f === "center" ? "text-center" : f === "right" ? "text-right" : "text-left";
    }
    function l(b, x) {
      if (typeof n.rowKey == "function")
        return n.rowKey(f);
      const x = f[n.rowKey];
      return x != null ? String(x) : `__index_${k}`;
    }
    function d(f, k) {
      return f[k];
    }
    function c(f) {
      return f == null || typeof f == "object" ? "" : String(f);
    }
    function u(b, x) {
      return l(b, x);
    }
    const h = D(() => n.rows.map((b, x) => l(b, x)));
    function g(b, x) {
      const w = l(b, x);
      return n.selectedKeys.includes(w);
    }
    const y = D(() => !n.selectable || n.rows.length === 0 ? !1 : h.value.every((b) => n.selectedKeys.includes(b))), f = D(() => {
      if (!n.selectable || n.rows.length === 0) return !1;
      const f = h.value.filter((k) => n.selectedKeys.includes(k));
      return f.length > 0 && f.length < n.rows.length;
    });
    Ft(
      [f, y, () => n.selectable],
      async () => {
        await Et();
        const b = s.value;
        b && (b.indeterminate = f.value && !y.value);
      },
      { immediate: !0 }
    );
    function b() {
      if (n.selectable)
        if (y.value) {
          const f = n.selectedKeys.filter((k) => !h.value.includes(k));
          a("update:selectedKeys", f);
        } else {
          const f = new Set(n.selectedKeys);
          h.value.forEach((k) => f.add(k)), a("update:selectedKeys", [...f]);
        }
    }
    function v(f, k) {
      if (!n.selectable) return;
      const w = l(b, x);
      n.selectedKeys.includes(w) ? a(
        "update:selectedKeys",
        n.selectedKeys.filter((C) => C !== x)
      ) : a("update:selectedKeys", [...n.selectedKeys, x]);
    }
    function p(b, x) {
      const w = l(b, x);
      return `${n.ariaLabelSelectRow} ${w}`;
    }
    return (b, x) => (_(), k("div", Qb, [
      r("div", Jb, [
        r("table", tv, [
          r("thead", null, [
            r("tr", ev, [
              e.selectable ? (_(), k("th", nv, [
                r("input", {
                  ref_key: "selectAllRef",
                  ref: o,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: y.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: m
                }, null, 40, av)
              ])) : z("", !0),
              (_(!0), k(q, null, at(e.columns, (w) => (_(), k("th", {
                key: w.key,
                scope: "col",
                class: W([
                  "px-4 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  i(x.align),
                  x.headerClass ?? ""
                ])
              }, A(x.label), 3))), 128))
            ])
          ]),
          r("tbody", null, [
            (_(!0), k(q, null, at(e.rows, (w, M) => (_(), k("tr", {
              key: u(w, M),
              class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]"
            }, [
              e.selectable ? (_(), k("td", sv, [
                r("input", {
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: g(w, M),
                  "aria-label": p(w, M),
                  onChange: (C) => v(w, M)
                }, null, 40, ov)
              ])) : z("", !0),
              (_(!0), k(q, null, at(e.columns, (C) => (_(), k("td", {
                key: C.key,
                class: W([
                  "bg-transparent px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                  i(C.align),
                  C.cellClass ?? ""
                ])
              }, [
                $t(f.$slots, s(C.key), {
                  row: x,
                  column: C,
                  value: d(x, C.key)
                }, () => [
                  yt(A(c(d(x, C.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), Ri = /* @__PURE__ */ it(iv, [["__scopeId", "data-v-95fc0bc9"]]), lv = {
  key: 0,
  class: "loading-state"
}, Sv = {
  key: 1,
  class: "card-body"
}, cv = { class: "summary-cards" }, dv = {
  key: 0,
  class: "summary-card enqueued-card"
}, uv = { class: "summary-card-content" }, hv = { class: "card-content enqueued-content" }, fv = { class: "card-value enqueued-value" }, gv = { class: "summary-card assigned-card" }, pv = { class: "summary-card-content" }, mv = { class: "card-content" }, bv = { class: "card-value assigned-value" }, vv = { class: "card-content" }, yv = { class: "card-value assigned-value" }, _v = { class: "summary-card closed-card" }, xv = { class: "summary-card-content" }, kv = { class: "card-content" }, wv = { class: "card-value closed-value" }, Cv = { class: "card-content" }, $v = { class: "card-value closed-value" }, Mv = {
  key: 0,
  class: "agents-section"
}, Sv = { class: "date-header" }, Dv = { class: "date-title" }, Av = { class: "date-stats" }, Tv = {
  key: 0,
  class: "stat-item enqueued-stat"
}, Bv = { class: "stat-value" }, Lv = { class: "stat-item assigned-stat" }, Fv = { class: "stat-value" }, Ev = { class: "stat-value" }, Iv = { class: "stat-item closed-stat" }, Pv = { class: "stat-value" }, Rv = { class: "stat-value" }, Ov = { class: "w-full min-w-0" }, zv = { class: "ah-cell name-cell" }, Vv = { class: "ah-cell email-cell" }, Nv = { class: "metric-cell-content" }, Wv = { class: "badge assigned-badge" }, Hv = { class: "metric-cell-avg" }, jv = { class: "metric-cell-content" }, Yv = { class: "badge closed-badge" }, Kv = { class: "metric-cell-avg" }, qv = ["onClick"], Uv = {
  key: 1,
  class: "empty-state"
}, ba = 3, Xv = /* @__PURE__ */ Z({
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
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = (S) => {
      s("export", S);
    }, { isDark: i } = ut(dt(a, "theme")), l = D(() => {
      const S = a.data?.agents_by_day && a.data.agents_by_day.length > 0, L = (a.data?.total_enqueued ?? 0) > 0;
      return S || L;
    }), d = D(() => {
      if (!l.value) return {};
      const S = {};
      for (const B of a.data.agents_by_day)
        S[B.date] || (S[B.date] = []), S[B.date].push(B);
      const L = Object.keys(S).sort((B, E) => new Date(B).getTime() - new Date(E).getTime()), T = {};
      for (const B of L)
        T[B] = S[B];
      return T;
    }), c = st({});
    function u(S) {
      c.value = {
        ...c.value,
        [S]: !c.value[S]
      };
    }
    function h(S, L) {
      return c.value[S] ? L : L.slice(0, wa);
    }
    function g(S) {
      return Math.max(0, S.length - ba);
    }
    function y(S) {
      return S.length > wa;
    }
    const p = [
      { key: "agentName", label: "Agent Name", align: "left" },
      { key: "email", label: "Email", align: "left" },
      { key: "assigned", label: "Assigned (AVG time to assign)", align: "center" },
      { key: "closed", label: "Closed (AVG time to close)", align: "center" }
    ];
    function m(S, L) {
      return h(S, L).map((T, B) => ({
        id: `${S}-${T.agent_email}-${B}`,
        agent_name: T.agent_name,
        agent_email: T.agent_email,
        assigned_count: T.assigned_count,
        closed_count: T.closed_count,
        avg_time_to_assign_seconds: T.avg_time_to_assign_seconds,
        avg_conversation_duration_seconds: T.avg_conversation_duration_seconds
      }));
    }
    const v = (S) => S == null ? "0" : U(S), p = (S) => {
      if (S == null)
        return "AVG";
      if (S < 60)
        return `${Math.round(S)}s`;
      const L = Math.round(S), T = Math.floor(L / 60), B = L % 60;
      if (T < 60)
        return `${T}m ${B}s`;
      const E = Math.floor(T / 60), I = T % 60;
      return `${E}h ${I}m`;
    }, b = (S) => {
      const L = new Date(S), T = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return L.toLocaleDateString("en-US", T);
    }, x = (S) => S[0]?.day_total_enqueued ?? 0, w = (S) => S[0]?.day_total_assigned ?? 0, M = (S) => S[0]?.day_total_closed ?? 0, C = (S) => S[0]?.day_avg_time_to_assign_seconds ?? null, $ = (S) => S[0]?.day_avg_conversation_duration_seconds ?? null;
    return t({ isDark: i }), (S, L) => (_(), nt(ft, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent"
    }, St({
      default: P(() => [
        e.loading ? (_(), k("div", lv, [...L[0] || (L[0] = [
          r("div", { class: "loading-container" }, [
            r("div", { class: "chart-bars-loader" }, [
              r("div", { class: "bar bar-1" }),
              r("div", { class: "bar bar-2" }),
              r("div", { class: "bar bar-3" }),
              r("div", { class: "bar bar-4" }),
              r("div", { class: "bar bar-5" })
            ]),
            r("p", { class: "loading-text" }, "Loading agent data...")
          ], -1)
        ])])) : (_(), k("div", rv, [
          r("div", cv, [
            e.data.total_enqueued ? (_(), k("div", dv, [
              L[2] || (L[2] = r("div", { class: "card-decoration" }, null, -1)),
              r("div", uv, [
                r("div", hv, [
                  L[1] || (L[1] = r("p", { class: "card-label" }, "Total Enqueued", -1)),
                  r("p", fv, A(v(e.data.total_enqueued)), 1)
                ])
              ])
            ])) : z("", !0),
            r("div", gv, [
              L[5] || (L[5] = r("div", { class: "card-decoration" }, null, -1)),
              r("div", pv, [
                r("div", mv, [
                  L[3] || (L[3] = r("p", { class: "card-label" }, "Total Assigned", -1)),
                  r("p", bv, A(v(e.data.total_assigned)), 1)
                ]),
                r("div", vv, [
                  L[4] || (L[4] = r("p", { class: "card-label" }, "AVG time to assign", -1)),
                  r("p", yv, A(p(e.data.avg_time_to_assign_seconds)), 1)
                ])
              ])
            ]),
            r("div", _v, [
              L[8] || (L[8] = r("div", { class: "card-decoration" }, null, -1)),
              r("div", xv, [
                r("div", kv, [
                  L[6] || (L[6] = r("p", { class: "card-label" }, "Total Closed", -1)),
                  r("p", wv, A(v(e.data.total_closed)), 1)
                ]),
                r("div", Cv, [
                  L[7] || (L[7] = r("p", { class: "card-label" }, "AVG time to close", -1)),
                  r("p", $v, A(p(e.data.avg_conversation_duration_seconds)), 1)
                ])
              ])
            ])
          ]),
          l.value ? (_(), k("div", Mv, [
            (_(!0), k(q, null, at(d.value, (T, B) => (_(), k("div", {
              key: B,
              class: "date-group"
            }, [
              r("div", Sv, [
                r("h4", Dv, A(b(B)), 1),
                r("div", Av, [
                  x(T) ? (_(), k("span", Tv, [
                    r("span", Bv, A(v(x(T))), 1),
                    L[9] || (L[9] = bt(" Enqueued ", -1))
                  ])) : z("", !0),
                  r("span", Lv, [
                    r("span", Fv, A(v(w(T))), 1),
                    L[10] || (L[10] = bt(" Assigned ", -1)),
                    r("span", Ev, A(p(C(T))), 1)
                  ]),
                  r("span", Iv, [
                    r("span", Pv, A(v(M(T))), 1),
                    L[11] || (L[11] = bt(" Closed ", -1)),
                    r("span", Rv, A(p($(T))), 1)
                  ])
                ])
              ]),
              r("div", Ov, [
                R(Ri, {
                  columns: f,
                  rows: m(String(B), T),
                  "row-key": "id"
                }, {
                  "cell-agentName": P(({ row: E }) => [
                    r("span", zv, A(E.agent_name || "-"), 1)
                  ]),
                  "cell-email": P(({ row: E }) => [
                    r("span", Vv, A(E.agent_email), 1)
                  ]),
                  "cell-assigned": P(({ row: E }) => [
                    r("div", Nv, [
                      r("span", Wv, A(v(Number(E.assigned_count))), 1),
                      r("span", Hv, A(p(Number(E.avg_time_to_assign_seconds))), 1)
                    ])
                  ]),
                  "cell-closed": P(({ row: E }) => [
                    r("div", jv, [
                      r("span", Yv, A(v(Number(E.closed_count))), 1),
                      r("span", Kv, A(p(Number(E.avg_conversation_duration_seconds))), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ]),
              y(T) ? (_(), k("button", {
                key: 0,
                type: "button",
                class: "view-more-btn",
                onClick: (E) => u(String(B))
              }, [
                bt(A(c.value[B] ? "View less" : `View more (${g(T)} rows)`) + " ", 1),
                (_(), k("svg", {
                  class: W(["view-more-icon", { "view-more-icon-rotated": c.value[B] }]),
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [...L[12] || (L[12] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M19 9l-7 7-7-7"
                  }, null, -1)
                ])], 2))
              ], 8, uy)) : z("", !0)
            ]))), 128))
          ])) : (_(), k("div", Uv, [...L[13] || (L[13] = [
            r("div", { class: "empty-state-content" }, [
              r("div", { class: "empty-icon-wrapper" }, [
                r("svg", {
                  class: "empty-icon",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  })
                ])
              ]),
              r("p", { class: "empty-title" }, "No agent human conversation data available"),
              r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.")
            ], -1)
          ])]))
        ]))
      ]),
      _: 2
    }, [
      e.enableExport && !e.loading ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Bt), {
            variant: "inline",
            onExport: s,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), Gv = /* @__PURE__ */ it(Xv, [["__scopeId", "data-v-d6171363"]]), Zv = {
  key: 0,
  class: "flex min-h-[380px] flex-1 flex-col items-center justify-center px-4"
}, Qv = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, Jv = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, ty = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, ey = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, ny = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, ay = { class: "max-w-[360px] px-4 text-center" }, sy = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, oy = /* @__PURE__ */ Z({
  __name: "ChannelMetrics",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: n }) {
    const a = [30, 50, 70, 50, 40], s = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], o = e, i = n, l = (p) => {
      i("export", p);
    }, d = dt(o, "theme"), { isDark: c } = ut(d), u = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, h = st({ labels: [], datasets: [] }), g = D(
      () => o.data ?? {
        channels_by_day: {},
        total_by_channel: {},
        total_conversations: 0
      }
    ), y = D(() => {
      const p = g.value.total_by_channel || {}, b = Object.values(p).reduce((x, w) => x + w, 0);
      return b === 0 ? [] : Object.entries(p).sort(([, x], [, w]) => w - x).map(([x, w]) => ({
        name: x,
        label: x.toUpperCase(),
        total: w,
        percentage: (w / b * 100).toFixed(1),
        color: u[x.toLowerCase()] || "#9ca3af"
      }));
    }), f = D(() => y.value.slice(0, 4)), m = D(() => {
      const p = f.value.length;
      return p <= 1 ? "grid w-full grid-cols-1 gap-3 sm:gap-4" : p === 2 ? "grid w-full grid-cols-2 gap-3 sm:gap-4" : p === 3 ? "grid w-full grid-cols-3 gap-3 sm:gap-4" : "grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4";
    }), v = (p) => {
      if (!p || !p.channels_by_day) {
        h.value = { labels: [], datasets: [] };
        return;
      }
      const b = p.channels_by_day, x = Object.keys(b).sort();
      if (x.length === 0) {
        h.value = { labels: [], datasets: [] };
        return;
      }
      const x = /* @__PURE__ */ new Set();
      for (const $ of Object.values(f))
        for (const S of Object.keys($))
          x.add(S);
      const C = Array.from(x).map(($) => {
        const S = $.toLowerCase(), L = u[S] || "#9ca3af";
        return {
          label: $.toUpperCase(),
          data: x.map((T) => b[T]?.[$] || 0),
          borderColor: L
        };
      });
      h.value = {
        labels: x.map(($) => Lt($).format("MMM DD")),
        datasets: C
      };
    };
    return Ft(
      () => o.data,
      (p) => {
        v(p ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: c }), (p, b) => (_(), nt(ft, {
      class: "w-full min-h-0 self-start",
      title: "Interactions by Channel",
      subtitle: "Responses sent by AI agents",
      collapsible: !1
    }, St({
      default: P(() => [
        r("div", {
          class: W(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", o.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          o.loading ? (_(), k("div", Zv, [
            r("div", Qv, [
              (_(), k(q, null, at(a, (x, w) => r("div", {
                key: w,
                class: W(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", s[w]]),
                style: gt({ height: `${x}%` })
              }, null, 6)), 64))
            ]),
            b[0] || (b[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading channel metrics... ", -1))
          ])) : (_(), k(q, { key: 1 }, [
            h.value.labels && h.value.labels.length ? (_(), k("section", Jv, [
              r("div", ty, [
                R(ge, {
                  data: h.value,
                  theme: d.value
                }, null, 8, ["data", "theme"])
              ]),
              p.value.length ? (_(), w("div", {
                key: 0,
                class: W(m.value)
              }, [
                (_(!0), k(q, null, at(f.value, (x) => (_(), nt(lt, {
                  key: x.name,
                  color: x.color,
                  title: x.label,
                  value: `${x.percentage}%`,
                  subvalue: `${F(U)(x.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 2)) : z("", !0)
            ])) : y.value.length ? (_(), k("section", ey, [
              r("div", {
                class: W(m.value)
              }, [
                (_(!0), k(q, null, at(f.value, (x) => (_(), nt(lt, {
                  key: x.name,
                  color: x.color,
                  title: x.label,
                  value: `${x.percentage}%`,
                  subvalue: `${F(U)(x.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 2)
            ])) : z("", !0),
            y.value.length ? z("", !0) : (_(), k("section", ny, [
              r("div", ay, [
                r("div", sy, [
                  R(F(Wt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                b[1] || (b[1] = r("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No channel metrics data available ", -1)),
                b[2] || (b[2] = r("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No channel data found for the selected period. Try adjusting the date range. ", -1))
              ])
            ]))
          ], 64))
        ], 2)
      ]),
      _: 2
    }, [
      e.enableExport && !s.loading ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Bt), {
            variant: "inline",
            loading: e.exportLoading,
            onExport: l
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), iy = /* @__PURE__ */ it(oy, [["__scopeId", "data-v-567110f7"]]), ly = {
  key: 0,
  class: "card-body"
}, ry = { class: "chart-container" }, cy = { class: "triage-table-block w-full min-w-0" }, dy = { class: "triage-row-label" }, uy = {
  key: 1,
  class: "triage-count"
}, By = {
  key: 1,
  class: "triage-count"
}, Ly = {
  key: 1,
  class: "triage-count"
}, Fy = {
  key: 1,
  class: "triage-count"
}, Ey = {
  key: 1,
  class: "triage-count"
}, my = {
  key: 1,
  class: "empty-state"
}, by = { class: "empty-state-content" }, vy = { class: "empty-icon-wrapper" }, yy = {
  key: 1,
  class: "loading-state"
}, _y = /* @__PURE__ */ Z({
  __name: "TriageCombinations",
  props: {
    data: { default: () => ({ combinations: {} }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = (x) => {
      s("export", x);
    }, { isDark: i, colors: l } = ut(dt(a, "theme")), d = D(() => {
      const x = a.data?.combinations || {}, w = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [M, C] of Object.entries(x)) {
        const $ = M.split("+").filter(Boolean);
        if (!$.includes("triage")) continue;
        const S = $.filter((L) => L !== "triage").length;
        S >= 4 ? x["4p"] += Number(C) || 0 : x[S] += Number(C) || 0;
      }
      return w;
    }), c = D(() => {
      const x = d.value;
      return x[0] + x[1] + x[2] + x[3] + x["4p"] || 0;
    }), u = D(() => Object.keys(a.data?.combinations || {}).length > 0), h = D(() => {
      const x = c.value;
      if (!x) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const w = d.value;
      return {
        pct0: x[0] / k * 100,
        pct1: x[1] / k * 100,
        pct2: x[2] / k * 100,
        pct3: x[3] / k * 100,
        pct4p: x["4p"] / k * 100
      };
    }), g = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], y = D(() => {
      const x = h.value, w = d.value;
      return [
        {
          id: "pct",
          metric: "% of total",
          b0: k.pct0,
          b1: k.pct1,
          b2: k.pct2,
          b3: k.pct3,
          b4p: k.pct4p
        },
        {
          id: "count",
          metric: "Count",
          b0: x[0],
          b1: x[1],
          b2: x[2],
          b3: x[3],
          b4p: x["4p"]
        }
      ];
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
    }, m = (x) => x?.replace("80", "") || "#888888", v = D(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [h.value.pct0],
          backgroundColor: p.c0,
          borderColor: b(p.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [h.value.pct1],
          backgroundColor: p.c1,
          borderColor: b(p.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [h.value.pct2],
          backgroundColor: p.c2,
          borderColor: b(p.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [h.value.pct3],
          backgroundColor: p.c3,
          borderColor: b(p.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [h.value.pct4p],
          backgroundColor: p.c4p,
          borderColor: b(p.c4p),
          borderWidth: 1
        }
      ]
    })), p = D(() => ({
      responsive: !0,
      maintainAspectRatio: !1,
      indexAxis: "y",
      plugins: {
        legend: { display: !1 },
        tooltip: {
          enabled: !0,
          backgroundColor: l.value.tooltipBg,
          titleColor: l.value.tooltipText,
          bodyColor: l.value.tooltipText,
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
            label: (k) => `${k.dataset.label} intent(s): ${Number(k.raw || 0).toFixed(0)}%`
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
    })), f = (k) => `${(Number(k) || 0).toFixed(0)}`;
    return t({ isDark: i }), (k, x) => (_(), tt(gt, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1
    }, St({
      default: P(() => [
        e.loading ? (_(), k("div", yy, [...w[2] || (w[2] = [
          r("div", { class: "loading-container" }, [
            r("div", { class: "chart-bars-loader" }, [
              r("div", { class: "bar bar-1" }),
              r("div", { class: "bar bar-2" }),
              r("div", { class: "bar bar-3" }),
              r("div", { class: "bar bar-4" }),
              r("div", { class: "bar bar-5" })
            ]),
            r("p", { class: "loading-text" }, "Loading intent distribution...")
          ], -1)
        ])])) : (_(), k("div", ly, [
          u.value ? (_(), k(q, { key: 0 }, [
            r("div", ry, [
              R(he, {
                data: v.value,
                options: p.value
              }, null, 8, ["data", "options"])
            ]),
            R(lt, {
              class: "w-full min-w-0",
              title: "Total",
              value: F(U)(c.value),
              subvalue: "Conversations with triage"
            }, null, 8, ["value"]),
            r("div", cy, [
              R(qt, {
                columns: g,
                rows: y.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-metric": P(({ row: M }) => [
                  r("span", dy, A(M.metric), 1)
                ]),
                "cell-b0": P(({ row: M }) => [
                  M.id === "pct" ? (_(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: m(f.c0) })
                  }, A(b(Number(M.b0))) + "%", 5)) : (_(), k("span", uy, A(F(U)(Number(M.b0))), 1))
                ]),
                "cell-b1": P(({ row: M }) => [
                  M.id === "pct" ? (_(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: m(f.c1) })
                  }, A(b(Number(M.b1))) + "%", 5)) : (_(), k("span", hy, A(F(U)(Number(M.b1))), 1))
                ]),
                "cell-b2": P(({ row: M }) => [
                  M.id === "pct" ? (_(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: m(f.c2) })
                  }, A(b(Number(M.b2))) + "%", 5)) : (_(), k("span", fy, A(F(U)(Number(M.b2))), 1))
                ]),
                "cell-b3": P(({ row: M }) => [
                  M.id === "pct" ? (_(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: m(f.c3) })
                  }, A(b(Number(M.b3))) + "%", 5)) : (_(), k("span", gy, A(F(U)(Number(M.b3))), 1))
                ]),
                "cell-b4p": P(({ row: M }) => [
                  M.id === "pct" ? (_(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: m(f.c4p) })
                  }, A(b(Number(M.b4p))) + "%", 5)) : (_(), k("span", py, A(F(U)(Number(M.b4p))), 1))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ], 64)) : (_(), k("div", my, [
            r("div", by, [
              r("div", vy, [
                R(F(Wt), { class: "empty-icon" })
              ]),
              w[0] || (w[0] = r("p", { class: "empty-title" }, "No triage combinations data", -1)),
              w[1] || (w[1] = r("p", { class: "empty-description" }, "No intent distribution data found for the selected period. Try adjusting the date range.", -1))
            ])
          ]))
        ]))
      ]),
      _: 2
    }, [
      e.enableExport && !e.loading ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Bt), {
            variant: "inline",
            onExport: s,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), xy = /* @__PURE__ */ it(_y, [["__scopeId", "data-v-c0931082"]]), ky = {
  key: 0,
  class: "loading-state"
}, wy = {
  key: 1,
  class: "card-body"
}, Cy = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-4 min-h-0"
}, $y = { class: "pie-section" }, My = {
  key: 1,
  class: "empty-state"
}, Sy = /* @__PURE__ */ Z({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = ut(dt(n, "theme")), o = [
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
    }, l = (y) => i[y]?.label || y.toUpperCase(), d = D(
      () => n.data?.items && n.data.items.length > 0
    ), c = D(
      () => (n.data?.items || []).reduce((y, f) => y + f.count, 0)
    ), u = D(() => {
      const y = {};
      for (const f of n.data?.items || [])
        y[f.language] = (y[f.language] || 0) + f.count;
      return Object.entries(y).map(([f, m]) => ({ language: f, count: m })).sort((f, m) => m.count - f.count);
    }), h = D(() => ({
      labels: u.value.map((y) => l(y.language)),
      datasets: [{
        data: u.value.map((y) => y.count),
        backgroundColor: u.value.map((y, p) => s[p % s.length] + "80"),
        borderColor: u.value.map((y, p) => s[p % s.length]),
        borderWidth: 2,
        hoverOffset: 6
      }]
    })), g = D(() => ({
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
            color: o.value.textSecondary
          }
        },
        tooltip: {
          backgroundColor: o.value.tooltipBg,
          titleColor: o.value.tooltipText,
          bodyColor: o.value.tooltipText,
          borderColor: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: { family: "'Space Grotesk', sans-serif", size: 13, weight: 600 },
          bodyFont: { family: "'DM Sans', sans-serif", size: 12 },
          callbacks: {
            label: (y) => {
              const p = y.raw || 0, b = c.value > 0 ? (p / c.value * 100).toFixed(1) : "0";
              return ` ${y.label}: ${p} (${b}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: a }), (y, p) => (_(), tt(gt, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1
    }, {
      default: P(() => [
        n.loading ? (_(), k("div", ky, [...f[0] || (f[0] = [
          r("div", { class: "loading-container" }, [
            r("div", { class: "chart-bars-loader" }, [
              r("div", { class: "bar bar-1" }),
              r("div", { class: "bar bar-2" }),
              r("div", { class: "bar bar-3" }),
              r("div", { class: "bar bar-4" }),
              r("div", { class: "bar bar-5" })
            ]),
            r("p", { class: "loading-text" }, "Loading language data...")
          ], -1)
        ])])) : (_(), k("div", wy, [
          d.value ? (_(), k("div", Cy, [
            r("section", $y, [
              R(na, {
                data: h.value,
                options: g.value
              }, null, 8, ["data", "options"])
            ]),
            R(lt, {
              class: "shrink-0",
              title: "Total",
              value: F(U)(c.value),
              color: "#8b5cf6"
            }, null, 8, ["value"])
          ])) : (_(), k("section", My, [...f[1] || (f[1] = [
            r("div", { class: "empty-state-content" }, [
              r("div", { class: "empty-icon-wrapper" }, [
                r("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  })
                ])
              ]),
              r("p", { class: "empty-title" }, "No language data available"),
              r("p", { class: "empty-description" }, "No language selection data found for the selected period. Try adjusting the date range.")
            ], -1)
          ])]))
        ]))
      ]),
      _: 1
    }));
  }
}), Dy = /* @__PURE__ */ it(Sy, [["__scopeId", "data-v-020e89a6"]]), Ay = {
  key: 0,
  class: "loading-state"
}, Ty = {
  key: 1,
  class: "card-body"
}, By = {
  key: 0,
  class: "guardrails-daily-section"
}, Ly = { class: "w-full min-w-0" }, Fy = { class: "font-medium" }, Ey = { class: "font-semibold" }, Iy = { class: "type-badges-row" }, Py = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, Ry = {
  key: 1,
  class: "empty-state"
}, Oy = /* @__PURE__ */ Z({
  __name: "Guardrails",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = (v) => {
      s("export", v);
    }, { isDark: i } = ut(dt(a, "theme")), l = D(
      () => a.data?.items && a.data.items.length > 0
    ), d = D(
      () => (a.data?.items || []).reduce((v, p) => v + p.count, 0)
    ), c = (v) => {
      const p = {};
      for (const w of a.data?.items || [])
        p[w[v]] = (p[w[v]] || 0) + w.count;
      const b = Object.entries(p).sort((w, M) => M[1] - w[1]);
      if (b.length === 0) return { name: "—", pct: 0 };
      const x = d.value;
      return {
        name: f[0][0],
        pct: k > 0 ? Math.round(f[0][1] / k * 100) : 0
      };
    }, u = D(() => c("guardrail_type")), h = D(() => c("guardrail_action")), g = D(() => c("guardrail_source")), y = D(() => {
      const v = {};
      for (const p of a.data?.items || [])
        v[p.date] || (v[p.date] = {}), v[p.date][p.guardrail_type] = (v[p.date][p.guardrail_type] || 0) + p.count;
      return Object.entries(v).map(([p, b]) => ({
        date: p,
        total: Object.values(b).reduce((x, w) => x + w, 0),
        types: Object.entries(b).map(([x, w]) => ({ type: x, count: w })).sort((x, w) => w.count - x.count)
      })).sort((p, b) => new Date(p.date).getTime() - new Date(b.date).getTime());
    }), f = [
      { key: "date", label: "Date", align: "center" },
      { key: "count", label: "Count", align: "center" },
      { key: "types", label: "Types", align: "left" }
    ], m = D(
      () => y.value.map((v) => ({
        id: v.date,
        date: v.date,
        total: v.total,
        types: v.types
      }))
    );
    return t({ isDark: i }), (v, p) => (_(), nt(ft, {
      class: "guardrails-root h-full min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1
    }, St({
      default: P(() => [
        a.loading ? (_(), k("div", Ay, [...p[0] || (p[0] = [
          r("div", { class: "loading-container" }, [
            r("div", { class: "chart-bars-loader" }, [
              r("div", { class: "bar bar-1" }),
              r("div", { class: "bar bar-2" }),
              r("div", { class: "bar bar-3" }),
              r("div", { class: "bar bar-4" }),
              r("div", { class: "bar bar-5" })
            ]),
            r("p", { class: "loading-text" }, "Loading guardrails data...")
          ], -1)
        ])])) : (_(), k("div", Ty, [
          l.value ? (_(), k(q, { key: 0 }, [
            y.value.length > 0 ? (_(), k("section", By, [
              r("div", Ly, [
                R(qt, {
                  columns: f,
                  rows: m.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-date": P(({ row: b }) => [
                    r("span", Fy, A(F(Lt)(String(b.date)).format("MMM DD")), 1)
                  ]),
                  "cell-count": P(({ row: b }) => [
                    r("span", Ey, A(F(U)(b.total)), 1)
                  ]),
                  "cell-types": P(({ row: b }) => [
                    r("div", Iy, [
                      (_(!0), k(q, null, at(b.types, (x) => (_(), k("span", {
                        key: x.type,
                        class: "type-count-badge"
                      }, A(k.type) + " (" + A(k.count) + ") ", 1))), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : z("", !0),
            r("section", Py, [
              R(lt, {
                title: "Total Events",
                value: F(U)(d.value)
              }, null, 8, ["value"]),
              R(lt, {
                title: "Top type",
                value: u.value.name,
                subvalue: u.value.pct > 0 ? `(${u.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              R(lt, {
                title: "Top action",
                value: h.value.name,
                subvalue: h.value.pct > 0 ? `(${h.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              R(lt, {
                title: "Top source",
                value: g.value.name,
                subvalue: g.value.pct > 0 ? `(${g.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"])
            ])
          ], 64)) : (_(), k("section", Ry, [...p[1] || (p[1] = [
            r("div", { class: "empty-state-content" }, [
              r("div", { class: "empty-icon-wrapper" }, [
                r("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  })
                ])
              ]),
              r("p", { class: "empty-title" }, "No guardrail events"),
              r("p", { class: "empty-description" }, "No content safety events found for the selected period. This is a good sign!")
            ], -1)
          ])]))
        ]))
      ]),
      _: 2
    }, [
      e.enableExport && !a.loading ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Bt), {
            variant: "inline",
            onExport: s,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), zy = /* @__PURE__ */ it(Oy, [["__scopeId", "data-v-0416b73e"]]), Vy = {
  key: 0,
  class: "loading-state"
}, Ny = {
  key: 1,
  class: "card-body"
}, Wy = { class: "chart-section" }, Hy = { class: "chart-wrapper" }, jy = {
  key: 1,
  class: "empty-chart"
}, Yy = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, Ky = {
  key: 0,
  class: "dn-failure-section"
}, qy = { class: "w-full min-w-0" }, Uy = { class: "failure-reason" }, Xy = { class: "failure-count" }, Gy = { class: "impact-bar-container" }, Zy = { class: "impact-label" }, Qy = { class: "dn-trend-health-block flex flex-col gap-0" }, Jy = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, t1 = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, e1 = { class: "system-health" }, n1 = { class: "system-health-content" }, a1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, s1 = {
  key: 1,
  class: "empty-state"
}, o1 = /* @__PURE__ */ Z({
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
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = (C) => {
      s("export", C);
    }, { isDark: i, colors: l } = ut(dt(a, "theme")), d = D(() => {
      const C = a.data?.documentCounts?.items || [], $ = a.data?.processingCounts?.items || [];
      return C.length > 0 || $.length > 0;
    }), c = D(() => {
      const C = a.data?.documentCounts?.items || [];
      return {
        processing_started: C.reduce(($, S) => $ + S.processing_started, 0),
        processing_completed: C.reduce(($, S) => $ + S.processing_completed, 0),
        processing_failed: C.reduce(($, S) => $ + S.processing_failed, 0),
        row_count_total: C.reduce(($, S) => $ + S.row_count_total, 0)
      };
    }), u = D(() => {
      const C = a.data?.processingCounts?.items || [];
      return {
        processing_started: C.reduce(($, S) => $ + S.processing_started, 0),
        processing_success: C.reduce(($, S) => $ + S.processing_success, 0),
        notification_sent: C.reduce(($, S) => $ + S.notification_sent, 0),
        notification_failed: C.reduce(($, S) => $ + S.notification_failed, 0),
        dq_phone: C.reduce(($, S) => $ + S.dq_error_phone_not_found, 0),
        dq_flight: C.reduce(($, S) => $ + S.dq_error_flight_not_found, 0),
        dq_booking: C.reduce(($, S) => $ + S.dq_error_booking_not_found, 0),
        dq_other: C.reduce(($, S) => $ + S.dq_error_other, 0),
        totalDqErrors: C.reduce(($, S) => $ + S.dq_error_phone_not_found + S.dq_error_flight_not_found + S.dq_error_booking_not_found + S.dq_error_other, 0)
      };
    }), h = D(() => c.value.row_count_total || u.value.processing_started), g = D(() => Math.max(0, h.value - u.value.notification_sent)), y = (C, $) => $ ? `${Math.round(C / $ * 100)}%` : "0%", f = D(() => {
      const C = [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].filter(($) => $.count > 0).sort(($, S) => S.count - $.count);
      return C.length > 0 ? C[0] : { reason: "None", count: 0 };
    }), m = D(() => {
      const C = h.value;
      return [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].map(($) => ({
        ...$,
        impactPct: C > 0 ? Math.round($.count / C * 100) : 0
      }));
    }), v = [
      { key: "reason", label: "Reason", align: "left" },
      { key: "count", label: "Count", align: "center" },
      { key: "impact", label: "Impact", align: "center" }
    ], p = D(
      () => m.value.map((C) => ({
        id: C.reason,
        reason: C.reason,
        count: C.count,
        impactPct: C.impactPct
      }))
    ), b = D(() => {
      const C = h.value, $ = u.value.processing_success, S = Math.max(0, $ - u.value.totalDqErrors), L = u.value.notification_sent, T = Math.max(0, C - $), B = u.value.totalDqErrors, E = Math.max(0, S - L), I = (N, tt) => {
        const et = tt > 0 ? Math.round(N / tt * 100) : 0;
        return `${N.toLocaleString()} (${et}%)`;
      }, V = [
        { name: "Records Detected" },
        { name: "Valid Reservations" },
        { name: "Invalid / Unprocessed" },
        { name: "Contactable" },
        { name: "Data Quality Issues" },
        { name: "Notified" },
        { name: "Not Delivered" }
      ], Y = [];
      return $ > 0 && Y.push({ source: "Records Detected", target: "Valid Reservations", value: $, label: I($, C) }), T > 0 && Y.push({ source: "Records Detected", target: "Invalid / Unprocessed", value: T, label: I(T, C) }), S > 0 && Y.push({ source: "Valid Reservations", target: "Contactable", value: S, label: I(S, C) }), B > 0 && Y.push({ source: "Valid Reservations", target: "Data Quality Issues", value: B, label: I(B, C) }), L > 0 && Y.push({ source: "Contactable", target: "Notified", value: L, label: I(L, C) }), E > 0 && Y.push({ source: "Contactable", target: "Not Delivered", value: E, label: I(E, C) }), { nodes: V, links: Y };
    }), x = {
      "Records Detected": "#DBEAFE",
      "Valid Reservations": "#D1FAE5",
      "Invalid / Unprocessed": "#FEE2E2",
      Contactable: "#BBF7D0",
      "Data Quality Issues": "#FED7AA",
      Notified: "#86EFAC",
      "Not Delivered": "#FCA5A5"
    }, w = D(() => {
      const C = [...a.data?.processingCounts?.items || []].sort(
        (I, V) => new Date(I.date).getTime() - new Date(V.date).getTime()
      ), $ = a.data?.documentCounts?.items || [], S = {};
      for (const I of $)
        S[I.date] = (S[I.date] || 0) + I.row_count_total;
      const L = [.../* @__PURE__ */ new Set([...C.map((I) => I.date), ...$.map((I) => I.date)])].sort(), T = L.map((I) => Lt(I).format("MMM DD")), B = L.map((I) => {
        const V = C.find((tt) => tt.date === I), Y = V?.notification_sent || 0, N = S[I] || V?.processing_started || 0;
        return N > 0 ? Math.round(Y / N * 100) : 0;
      }), E = L.map((I) => C.find((Y) => Y.date === I)?.notification_sent || 0);
      return {
        labels: T,
        datasets: [
          {
            label: "Success Rate (%)",
            data: B,
            borderColor: "#8b5cf6",
            yAxisID: "y"
          },
          {
            label: "Notifications Sent",
            data: E,
            borderColor: "#10b981",
            yAxisID: "y1"
          }
        ]
      };
    }), M = D(() => ({
      responsive: !0,
      maintainAspectRatio: !1,
      layout: {
        padding: {
          top: 18,
          bottom: 2,
          left: 4,
          right: 8
        }
      },
      interaction: { mode: "index", intersect: !1 },
      plugins: {
        legend: {
          display: !1
        },
        tooltip: {
          mode: "index",
          intersect: !1,
          backgroundColor: l.value.tooltipBg,
          titleColor: l.value.tooltipText,
          bodyColor: l.value.textSecondary,
          borderColor: i.value ? "rgba(198,125,255,0.2)" : "rgba(0,0,0,0.1)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: (C) => C.datasetIndex === 0 ? ` Success Rate: ${C.raw}%` : ` Notifications: ${C.raw}`
          }
        }
      },
      scales: {
        x: {
          display: !0,
          grid: { display: !1 },
          ticks: {
            font: {
              family: "'Inter', ui-sans-serif, system-ui, sans-serif",
              size: 11
            },
            color: l.value.textSecondary
          }
        },
        y: {
          type: "linear",
          display: !0,
          position: "left",
          beginAtZero: !0,
          max: 100,
          grid: { color: l.value.gridLines },
          ticks: {
            font: {
              family: "'Inter', ui-sans-serif, system-ui, sans-serif",
              size: 11
            },
            color: l.value.textSecondary,
            callback: (C) => `${C}%`
          },
          title: {
            display: !0,
            text: "Success Rate",
            font: {
              family: "'Inter', ui-sans-serif, system-ui, sans-serif",
              size: 11
            },
            color: l.value.textSecondary
          }
        },
        y1: {
          type: "linear",
          display: !0,
          position: "right",
          beginAtZero: !0,
          grid: { drawOnChartArea: !1 },
          ticks: {
            font: {
              family: "'Inter', ui-sans-serif, system-ui, sans-serif",
              size: 11
            },
            color: l.value.textSecondary
          },
          title: {
            display: !0,
            text: "Volume",
            font: {
              family: "'Inter', ui-sans-serif, system-ui, sans-serif",
              size: 11
            },
            color: l.value.textSecondary
          }
        }
      }
    }));
    return t({ isDark: i }), (C, $) => (_(), tt(gt, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis"
    }, St({
      default: P(() => [
        a.loading ? (_(), k("div", Vy, [...$[0] || ($[0] = [
          r("div", { class: "loading-container" }, [
            r("div", { class: "chart-bars-loader" }, [
              r("div", { class: "bar bar-1" }),
              r("div", { class: "bar bar-2" }),
              r("div", { class: "bar bar-3" }),
              r("div", { class: "bar bar-4" }),
              r("div", { class: "bar bar-5" })
            ]),
            r("p", { class: "loading-text" }, "Loading disruption notifier data...")
          ], -1)
        ])])) : (_(), k("div", Ny, [
          d.value ? (_(), k(q, { key: 0 }, [
            r("section", Wy, [
              $[2] || ($[2] = r("div", { class: "chart-header" }, [
                r("h4", { class: "section-title" }, "Passenger Disruption Funnel")
              ], -1)),
              r("div", Hy, [
                b.value.nodes.length > 0 && b.value.links.length > 0 ? (_(), nt(Se, {
                  key: 0,
                  data: f.value,
                  "node-colors": k,
                  height: "350px"
                }, null, 8, ["data"])) : (_(), k("div", jy, [...$[1] || ($[1] = [
                  r("p", { class: "empty-chart-text" }, "No processing data available for visualization", -1)
                ])]))
              ])
            ]),
            r("div", Yy, [
              R(lt, {
                color: "#3b82f6",
                title: "Total Records",
                value: F(U)(c.value.row_count_total)
              }, null, 8, ["value"]),
              R(lt, {
                color: "#8b5cf6",
                title: "Passengers Affected",
                value: F(U)(h.value)
              }, null, 8, ["value"]),
              R(lt, {
                color: "#10b981",
                title: "Successfully Notified",
                value: F(U)(u.value.notification_sent),
                subvalue: y(u.value.notification_sent, h.value)
              }, null, 8, ["value", "subvalue"]),
              R(lt, {
                color: "#ef4444",
                title: "Not Notified",
                value: F(U)(g.value),
                subvalue: y(g.value, h.value)
              }, null, 8, ["value", "subvalue"]),
              R(lt, {
                color: "#f59e0b",
                title: "Main Failure Reason",
                value: f.value.reason,
                subvalue: f.value.count > 0 ? `${F(U)(f.value.count)} cases` : void 0
              }, null, 8, ["value", "subvalue"])
            ]),
            m.value.length > 0 ? (_(), k("section", Ky, [
              $[3] || ($[3] = r("div", { class: "section-header" }, [
                r("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
              ], -1)),
              r("div", qy, [
                R(qt, {
                  columns: v,
                  rows: p.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-reason": P(({ row: S }) => [
                    r("span", Uy, A(S.reason), 1)
                  ]),
                  "cell-count": P(({ row: S }) => [
                    r("span", Xy, A(F(U)(S.count)), 1)
                  ]),
                  "cell-impact": P(({ row: S }) => [
                    r("div", Gy, [
                      r("div", {
                        class: "impact-bar",
                        style: gt({ width: S.impactPct + "%" })
                      }, null, 4),
                      r("span", Zy, A(S.impactPct) + "%", 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : z("", !0),
            r("div", Qy, [
              w.value.labels.length > 0 ? (_(), k("section", Jy, [
                $[4] || ($[4] = r("div", { class: "chart-header" }, [
                  r("h4", { class: "section-title" }, "Notification Success Rate by Day")
                ], -1)),
                r("div", t1, [
                  R(ge, {
                    data: w.value,
                    options: M.value,
                    theme: a.theme
                  }, null, 8, ["data", "options", "theme"])
                ])
              ])) : z("", !0),
              r("details", e1, [
                $[5] || ($[5] = r("summary", { class: "system-health-toggle" }, [
                  r("svg", {
                    class: "toggle-icon",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    }),
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    })
                  ]),
                  yt(" System Health Details ")
                ], -1)),
                r("div", n1, [
                  r("div", a1, [
                    R(lt, {
                      title: "Docs Started",
                      value: F(U)(c.value.processing_started)
                    }, null, 8, ["value"]),
                    R(lt, {
                      title: "Docs Completed",
                      value: F(U)(c.value.processing_completed)
                    }, null, 8, ["value"]),
                    R(lt, {
                      title: "Docs Failed",
                      value: F(U)(c.value.processing_failed)
                    }, null, 8, ["value"]),
                    R(lt, {
                      title: "Processing Started",
                      value: F(U)(u.value.processing_started)
                    }, null, 8, ["value"]),
                    R(lt, {
                      title: "Processing Success",
                      value: F(U)(u.value.processing_success)
                    }, null, 8, ["value"]),
                    R(lt, {
                      title: "Notification Failed",
                      value: F(U)(u.value.notification_failed)
                    }, null, 8, ["value"])
                  ])
                ])
              ])
            ])
          ], 64)) : (_(), k("section", s1, [...$[6] || ($[6] = [
            r("div", { class: "empty-state-content" }, [
              r("div", { class: "empty-icon-wrapper" }, [
                r("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  })
                ])
              ]),
              r("p", { class: "empty-title" }, "No disruption notifier data"),
              r("p", { class: "empty-description" }, "No disruption notification data found for the selected period. Try adjusting the date range.")
            ], -1)
          ])]))
        ]))
      ]),
      _: 2
    }, [
      e.enableExport && !a.loading ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Bt), {
            variant: "inline",
            onExport: s,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), i1 = /* @__PURE__ */ it(o1, [["__scopeId", "data-v-3e21a8c3"]]), l1 = { class: "highlight-inner" }, r1 = {
  key: 0,
  class: "loading-state"
}, c1 = {
  key: 1,
  class: "card-body"
}, d1 = { class: "metric-value" }, u1 = /* @__PURE__ */ Z({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a } = ut(dt(n, "theme")), s = D(() => U(n.totalConversations)), o = D(
      () => n.previousTotalConversations !== null && n.previousTotalConversations !== void 0
    ), i = D(() => {
      if (!o.value) return 0;
      const c = n.previousTotalConversations;
      return c === 0 ? n.totalConversations > 0 ? 100 : 0 : (n.totalConversations - c) / c * 100;
    }), l = D(() => {
      const c = i.value.toFixed(1);
      return i.value > 0 ? `+${c}% vs prev.` : `${c}% vs prev.`;
    }), d = D(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (c, u) => (_(), nt(ft, {
      title: "",
      collapsible: !1,
      class: W(["total-conv-metric", "w-full", { "total-conv-metric--dark": F(a) }])
    }, {
      title: P(() => [...u[0] || (u[0] = [
        r("div", { class: "header-title-group" }, [
          r("div", {
            class: "icon-wrapper",
            "aria-hidden": "true"
          }, [
            r("svg", {
              class: "card-icon",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "1.5"
            }, [
              r("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                d: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
              })
            ])
          ])
        ], -1)
      ])]),
      headerAside: P(() => [
        !e.loading && s.value ? (_(), w("div", {
          key: 0,
          class: W(["change-badge", d.value])
        }, A(l.value), 3)) : z("", !0)
      ]),
      default: P(() => [
        r("div", l1, [
          e.loading ? (_(), k("div", r1, [...u[1] || (u[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (_(), k("div", c1, [
            r("span", d1, A(s.value), 1),
            u[2] || (u[2] = r("span", { class: "metric-label" }, "Total Conversations", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), h1 = /* @__PURE__ */ it(u1, [["__scopeId", "data-v-56df95e6"]]), f1 = { class: "highlight-inner" }, g1 = {
  key: 0,
  class: "loading-state"
}, p1 = {
  key: 1,
  class: "card-body"
}, m1 = { class: "metric-value" }, b1 = /* @__PURE__ */ Z({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a } = ut(dt(n, "theme")), s = D(() => `${n.csatP95.toFixed(1)}`), o = D(
      () => n.previousCsatP95 !== null && n.previousCsatP95 !== void 0
    ), i = D(() => {
      if (!o.value) return 0;
      const c = n.previousCsatP95;
      return c === 0 ? n.csatP95 > 0 ? 100 : 0 : (n.csatP95 - c) / c * 100;
    }), l = D(() => {
      const c = i.value.toFixed(1);
      return i.value > 0 ? `+${c}% vs prev.` : `${c}% vs prev.`;
    }), d = D(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (c, u) => (_(), nt(ft, {
      collapsible: !1,
      class: W(["csat-p95-metric", "w-full", { "csat-p95-metric--dark": F(a) }])
    }, {
      title: P(() => [...u[0] || (u[0] = [
        r("div", { class: "header-title-group" }, [
          r("div", {
            class: "icon-wrapper",
            "aria-hidden": "true"
          }, [
            r("svg", {
              class: "card-icon",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "1.5"
            }, [
              r("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                d: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321 1.01l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.41a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-1.01l5.518-.442a.563.563 0 00.475-.345l2.125-5.11z"
              })
            ])
          ])
        ], -1)
      ])]),
      headerAside: P(() => [
        !e.loading && s.value ? (_(), w("div", {
          key: 0,
          class: W(["change-badge", d.value])
        }, A(l.value), 3)) : z("", !0)
      ]),
      default: P(() => [
        r("div", f1, [
          e.loading ? (_(), k("div", g1, [...u[1] || (u[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (_(), k("div", p1, [
            r("span", m1, A(s.value), 1),
            u[2] || (u[2] = r("span", { class: "metric-label" }, "CSAT P95", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), v1 = /* @__PURE__ */ it(b1, [["__scopeId", "data-v-fe943ad6"]]), y1 = {
  key: 0,
  class: "loading-state"
}, _1 = {
  key: 1,
  class: "card-body"
}, x1 = { class: "chart-wrapper" }, k1 = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, w1 = {
  key: 2,
  class: "empty-state"
}, C1 = 500, $1 = 60, M1 = 80, S1 = {
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
  setup(e, { expose: t, emit: n }) {
    const a = n, o = (c) => {
      a("export", c);
    }, o = e, { isDark: i } = ut(dt(o, "theme")), l = D(() => o.data), d = D(() => Math.max(600, window.innerWidth * 0.85));
    return t({ isDark: i }), (c, u) => (_(), nt(ft, {
      class: "nps-overview-root h-full min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1
    }, St({
      default: P(() => [
        o.loading ? (_(), k("div", y1, [...u[0] || (u[0] = [
          r("div", { class: "loading-container" }, [
            r("div", { class: "chart-flow-loader" }, [
              r("div", { class: "flow-line flow-1" }),
              r("div", { class: "flow-line flow-2" }),
              r("div", { class: "flow-line flow-3" }),
              r("div", { class: "flow-line flow-4" }),
              r("div", { class: "flow-line flow-5" })
            ]),
            r("p", { class: "loading-text" }, "Loading NPS data...")
          ], -1)
        ])])) : l.value && l.value.total_nps_responses > 0 ? (_(), k("div", _1, [
          r("div", x1, [
            R(Di, {
              histogram: l.value.histogram || [],
              "min-score": l.value.min_score || 0,
              "max-score": l.value.max_score || 0,
              "q1-score": l.value.q1_score || 0,
              "median-score": l.value.median_score || 0,
              "q3-score": l.value.q3_score || 0,
              "average-score": l.value.average_score || 0,
              "chart-width": d.value,
              "chart-height": C1,
              "chart-margin": $1,
              "chart-bottom-margin": M1,
              interactive: !1
            }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score", "chart-width"])
          ]),
          r("div", k1, [
            R(lt, {
              class: "min-w-0 flex-1",
              title: "Responses",
              value: String(l.value.total_nps_responses)
            }, null, 8, ["value"]),
            l.value.p95_score > 0 ? (_(), nt(lt, {
              key: 0,
              class: "min-w-0 flex-1",
              title: "Percentile 95",
              value: String(l.value.p95_score)
            }, null, 8, ["value"])) : z("", !0)
          ])
        ])) : (_(), k("div", w1, [...u[1] || (u[1] = [
          r("div", { class: "empty-state-content" }, [
            r("div", { class: "empty-icon-wrapper" }, [
              r("svg", {
                class: "empty-icon",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [
                r("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                })
              ])
            ]),
            r("p", { class: "empty-title" }, "No NPS data available"),
            r("p", { class: "empty-description" }, "No NPS data found for the selected period. Try adjusting the date range.")
          ], -1)
        ])]))
      ]),
      _: 2
    }, [
      e.enableExport && !s.loading ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Bt), {
            variant: "inline",
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}, Oi = /* @__PURE__ */ it(S1, [["__scopeId", "data-v-28b39eb9"]]), D1 = {
  key: 0,
  class: "loading-state"
}, A1 = {
  key: 1,
  class: "card-body"
}, T1 = { class: "tooltip-content" }, B1 = { class: "tooltip-title" }, L1 = { class: "tooltip-stats" }, F1 = { class: "tooltip-stat-row" }, E1 = { class: "tooltip-value" }, I1 = { class: "tooltip-stat-row" }, P1 = { class: "tooltip-value" }, R1 = { class: "tooltip-stat-row" }, O1 = { class: "tooltip-value" }, z1 = { class: "tooltip-stat-row" }, V1 = { class: "tooltip-value" }, N1 = { class: "tooltip-stat-row" }, W1 = { class: "tooltip-value" }, H1 = { class: "tooltip-stat-row" }, j1 = { class: "tooltip-value" }, Y1 = { class: "mt-4 flex w-full justify-start" }, K1 = {
  key: 2,
  class: "empty-state"
}, Bs = 400, rn = 60, Ls = 90, Fs = 120, u_ = {
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
  setup(e, { expose: t, emit: n }) {
    const a = n, o = (v) => {
      a("export", v);
    }, o = e, { isDark: i } = ut(dt(o, "theme")), l = D(() => o.data), d = st(null), c = st({
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
    }), u = D(() => {
      if (!l.value || !l.value.nps_by_day) return 800;
      const v = l.value.nps_by_day.length;
      return Math.max(800, an * 2 + v * Co);
    }), h = (v, p) => {
      const x = (v - 1) / 9;
      return an + p - x * p;
    }, g = (v) => v ? Lt(v).format("DD-MM-YYYY") : "", y = D(() => {
      if (!l.value || !l.value.nps_by_day || l.value.nps_by_day.length === 0)
        return [];
      const v = [], p = ko - an - wo;
      return l.value.nps_by_day.forEach((b, x) => {
        const w = b.min_score || 0, M = b.q1_score || 0, C = b.median_score || 0, $ = b.q3_score || 0, S = b.max_score || 0, L = b.average_score || 0;
        v.push({
          label: g(b.date),
          responseCount: b.nps_responses_count || 0,
          isTotal: !1,
          low: w,
          q1: M,
          median: C,
          q3: $,
          high: S,
          average: L,
          highY: h(S, p),
          lowY: h(w, p),
          q1Y: h(M, p),
          q3Y: h($, p),
          medianY: h(C, p),
          averageY: L > 0 ? h(L, p) : null,
          centerX: an + (x + 1) * Co
        });
      }), v;
    }), f = (v, p) => {
      if (!d.value || !p || p.horizontal) return;
      const b = d.value.getBoundingClientRect(), x = v.clientX, w = v.clientY, M = 140, C = 160, $ = 10, S = 15;
      let L = x - b.left - M / 2, T = w - b.top - C - S;
      L = Math.max($, Math.min(L, b.width - M - $)), T < $ && (T = w - b.top + S), T = Math.max($, Math.min(T, b.height - C - $)), c.value = {
        visible: !0,
        x: L,
        y: T,
        date: p.label || "",
        min: p.low !== void 0 ? p.low.toFixed(1) : "N/A",
        max: p.high !== void 0 ? p.high.toFixed(1) : "N/A",
        q1: p.open !== void 0 ? p.open.toFixed(1) : "N/A",
        avg: p.average !== void 0 && p.average > 0 ? p.average.toFixed(1) : "N/A",
        q3: p.close !== void 0 ? p.close.toFixed(1) : "N/A",
        median: p.median !== void 0 ? p.median.toFixed(1) : "N/A"
      };
    }, b = () => {
      c.value.visible = !1;
    };
    return t({ isDark: i }), (v, p) => (_(), nt(ft, {
      class: "nps-daily-root h-full min-h-0",
      title: "CSAT Daily Metrics",
      subtitle: "Daily CSAT Distribution",
      collapsible: !1
    }, St({
      default: P(() => [
        o.loading ? (_(), k("div", D1, [...p[0] || (p[0] = [
          r("div", { class: "loading-container" }, [
            r("div", { class: "chart-flow-loader" }, [
              r("div", { class: "flow-line flow-1" }),
              r("div", { class: "flow-line flow-2" }),
              r("div", { class: "flow-line flow-3" }),
              r("div", { class: "flow-line flow-4" }),
              r("div", { class: "flow-line flow-5" })
            ]),
            r("p", { class: "loading-text" }, "Loading daily NPS data...")
          ], -1)
        ])])) : l.value && l.value.nps_by_day && l.value.nps_by_day.length > 0 ? (_(), k("div", A1, [
          r("div", {
            class: "chart-wrapper",
            ref_key: "chartContainerRef",
            ref: d
          }, [
            y.value && y.value.length > 0 ? (_(), nt(Si, {
              key: 0,
              "candlestick-data": y.value,
              "chart-width": u.value,
              "chart-height": Bs,
              "chart-margin": rn,
              "chart-bottom-margin": Ls,
              "show-legend": !0,
              rotation: 0,
              "candle-width": 30,
              onCandleHover: p,
              onCandleLeave: b
            }, null, 8, ["candlestick-data", "chart-width"])) : z("", !0),
            c.value.visible ? (_(), w("div", {
              key: 1,
              class: "tooltip-overlay",
              style: gt({
                left: `${c.value.x}px`,
                top: `${c.value.y}px`
              })
            }, [
              r("div", T1, [
                r("div", B1, A(c.value.date), 1),
                p[7] || (p[7] = r("div", { class: "tooltip-divider" }, null, -1)),
                r("div", L1, [
                  r("div", F1, [
                    p[1] || (p[1] = r("span", { class: "tooltip-label tooltip-min" }, "Min:", -1)),
                    r("span", E1, A(c.value.min), 1)
                  ]),
                  r("div", I1, [
                    p[2] || (p[2] = r("span", { class: "tooltip-label tooltip-q1" }, "Q1:", -1)),
                    r("span", P1, A(c.value.q1), 1)
                  ]),
                  r("div", R1, [
                    p[3] || (p[3] = r("span", { class: "tooltip-label tooltip-median" }, "Median:", -1)),
                    r("span", O1, A(c.value.median), 1)
                  ]),
                  r("div", z1, [
                    p[4] || (p[4] = r("span", { class: "tooltip-label tooltip-avg" }, "Avg:", -1)),
                    r("span", V1, A(c.value.avg), 1)
                  ]),
                  r("div", N1, [
                    p[5] || (p[5] = r("span", { class: "tooltip-label tooltip-q3" }, "Q3:", -1)),
                    r("span", W1, A(c.value.q3), 1)
                  ]),
                  r("div", H1, [
                    p[6] || (p[6] = r("span", { class: "tooltip-label tooltip-max" }, "Max:", -1)),
                    r("span", j1, A(c.value.max), 1)
                  ])
                ])
              ])
            ], 4)) : z("", !0)
          ], 512),
          r("div", Y1, [
            R(lt, {
              title: "Days",
              value: String(l.value.nps_by_day.length),
              class: "min-w-0 w-full max-w-xs"
            }, null, 8, ["value"])
          ])
        ])) : (_(), k("div", K1, [...p[8] || (p[8] = [
          r("div", { class: "empty-state-content" }, [
            r("div", { class: "empty-icon-wrapper" }, [
              r("svg", {
                class: "empty-icon",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [
                r("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                })
              ])
            ]),
            r("p", { class: "empty-title" }, "No daily NPS data available"),
            r("p", { class: "empty-description" }, "No daily NPS data found for the selected period. Try adjusting the date range.")
          ], -1)
        ])]))
      ]),
      _: 2
    }, [
      e.enableExport && !s.loading ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Bt), {
            variant: "inline",
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}, zi = /* @__PURE__ */ it(q1, [["__scopeId", "data-v-59bff16f"]]), U1 = { class: "nps-metrics-container" }, X1 = {
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
    const n = t, a = (o) => {
      n("export", o);
    };
    return (s, o) => (_(), k("div", U1, [
      R(Oi, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"]),
      R(Zi, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"])
    ]));
  }
}, Vi = /* @__PURE__ */ it(X1, [["__scopeId", "data-v-25fe3b80"]]), G1 = { class: "csat-container__body" }, Z1 = /* @__PURE__ */ Z({
  __name: "CSATContainer",
  props: {
    containerInitiallyOpen: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    enableExport: { type: Boolean, default: !1 },
    data: { default: void 0 }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const n = t;
    function a(o) {
      n("export", { source: "npsMetrics", format: o });
    }
    return (o, s) => (_(), tt(gt, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen
    }, {
      default: P(() => [
        r("div", G1, [
          R(Vi, {
            data: e.data,
            loading: e.loading,
            "enable-export": e.enableExport,
            onExport: a
          }, null, 8, ["data", "loading", "enable-export"])
        ])
      ]),
      _: 1
    }, 8, ["default-open"]));
  }
}), Q1 = /* @__PURE__ */ it(Z1, [["__scopeId", "data-v-29e9904b"]]), J1 = { class: "highlight-inner" }, t_ = {
  key: 0,
  class: "loading-state"
}, e_ = {
  key: 1,
  class: "card-body"
}, n_ = { class: "metric-row" }, a_ = { class: "metric-currency" }, s_ = { class: "metric-value" }, o_ = /* @__PURE__ */ Z({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a } = ut(dt(n, "theme")), s = D(() => ye(n.totalRevenue)), o = D(
      () => n.previousTotalRevenue !== null && n.previousTotalRevenue !== void 0
    ), i = D(() => {
      if (!o.value) return 0;
      const c = n.previousTotalRevenue;
      return c === 0 ? n.totalRevenue > 0 ? 100 : 0 : (n.totalRevenue - c) / c * 100;
    }), l = D(() => {
      const c = i.value.toFixed(1);
      return i.value > 0 ? `+${c}% vs prev.` : `${c}% vs prev.`;
    }), d = D(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (c, u) => (_(), nt(ft, {
      collapsible: !1,
      class: W(["ai-revenue-metric", "w-full", { "ai-revenue-metric--dark": F(a) }])
    }, {
      title: P(() => [...u[0] || (u[0] = [
        r("div", { class: "header-title-group" }, [
          r("div", {
            class: "icon-wrapper",
            "aria-hidden": "true"
          }, [
            r("svg", {
              class: "card-icon",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "1.75",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }, [
              r("path", { d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" }),
              r("path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" }),
              r("path", { d: "M12 18V6" })
            ])
          ])
        ], -1)
      ])]),
      headerAside: P(() => [
        !e.loading && s.value ? (_(), w("div", {
          key: 0,
          class: W(["change-badge", d.value])
        }, A(l.value), 3)) : z("", !0)
      ]),
      default: P(() => [
        r("div", J1, [
          e.loading ? (_(), k("div", t_, [...u[1] || (u[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (_(), k("div", e_, [
            r("div", n_, [
              r("span", a_, A(n.currencyCode), 1),
              r("span", s_, A(s.value), 1)
            ]),
            u[2] || (u[2] = r("span", { class: "metric-label" }, "AI Revenue", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), i_ = /* @__PURE__ */ it(o_, [["__scopeId", "data-v-fc6d7eea"]]), l_ = { class: "flex justify-end" }, r_ = {
  key: 0,
  class: "flex min-h-[380px] flex-1 flex-col items-center justify-center px-4"
}, c_ = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, d_ = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, u_ = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, h_ = { class: "flex flex-wrap gap-4" }, f_ = { class: "text-[var(--kiut-text-primary,#111827)]" }, g_ = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5" }, p_ = { class: "flex items-center gap-2 truncate text-sm font-medium text-[var(--kiut-text-secondary,#6b7280)]" }, m_ = { class: "truncate" }, b_ = { class: "mt-1 text-2xl font-bold text-[var(--kiut-text-primary,#111827)]" }, v_ = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, y_ = /* @__PURE__ */ Z({
  __name: "HumanEscalations",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = [30, 50, 70, 50, 40], i = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], l = dt(a, "theme"), { isDark: d } = ut(l), c = st(a.breakdownBy), u = D(() => a.data ?? {
      total_conversations: 0,
      total_escalated_conversations: 0,
      escalation_rate_percentage: 0,
      breakdown_by: "all",
      breakdown_items: [],
      breakdown_by_day: [],
      escalations_by_day: []
    }), h = st({ labels: [], datasets: [] }), g = st([]), y = st([]), f = ["#3b82f6", "#f59e0b", "#06b6d4", "#8b5cf6", "#22c55e", "#ef4444", "#14b8a6"], m = (x) => f[x % f.length], v = () => {
      s("changeBreakdown", c.value);
    }, p = (x) => {
      if (!x) return "";
      const M = x.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return M ? M.charAt(0).toUpperCase() + M.slice(1) : "";
    }, b = (x) => {
      if (c.value === "all") {
        const T = x?.escalations_by_day ?? [];
        if (!T.length) {
          h.value = { labels: [], datasets: [] }, g.value = [], y.value = [];
          return;
        }
        const B = [...T].sort((E, I) => E.date.localeCompare(I.date));
        h.value = {
          labels: B.map((E) => Lt(E.date).format("MMM DD")),
          datasets: [
            {
              label: "All",
              data: B.map((E) => Number(E.escalation_rate_percentage || 0)),
              borderColor: "#8b5cf6",
              backgroundColor: "transparent",
              fill: !1,
              tension: 0.35
            }
          ]
        }, g.value = [], y.value = [];
        return;
      }
      const w = x?.breakdown_by_day ?? [], M = x?.breakdown_items ?? [];
      if (!w.length) {
        h.value = { labels: [], datasets: [] }, g.value = [], y.value = [];
        return;
      }
      const C = [...w].sort((T, B) => T.date.localeCompare(B.date)), $ = M.slice(0, 5).map((T) => T.key), S = C.map((T) => Lt(T.date).format("MMM DD")), L = $.map((T, B) => {
        const E = M.find((I) => I.key === T);
        return {
          label: p(E?.label || T),
          data: C.map((I) => {
            const V = I.items.find((Y) => Y.key === T);
            return Number(V?.percentage || 0);
          }),
          borderColor: m(B),
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      h.value = {
        labels: S,
        datasets: L
      }, g.value = M.slice(0, 5).map((T, B) => ({
        key: T.key,
        label: p(T.label),
        percentage: Number(T.percentage || 0),
        color: m(B)
      })), y.value = M.slice(0, 5).map((T, B) => ({
        key: T.key,
        label: p(T.label),
        color: m(B)
      }));
    };
    return Ft(
      () => a.data,
      (x) => {
        b(x ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Ft(
      () => a.breakdownBy,
      (x) => {
        c.value = x, b(u.value);
      }
    ), t({ isDark: d }), (x, w) => (_(), nt(ft, {
      class: "w-full min-h-0 self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1
    }, {
      headerAside: P(() => [
        r("div", l_, [
          Kt(r("select", {
            "onUpdate:modelValue": w[0] || (w[0] = (M) => c.value = M),
            class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: v
          }, [...w[1] || (w[1] = [
            r("option", { value: "all" }, "All", -1),
            r("option", { value: "agent" }, "By Agent", -1),
            r("option", { value: "channel" }, "By Channel", -1),
            r("option", { value: "agent_channel" }, "By Agent/Channel", -1)
          ])], 544), [
            [qi, c.value]
          ])
        ])
      ]),
      default: P(() => [
        r("div", {
          class: W(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          a.loading ? (_(), k("div", r_, [
            r("div", c_, [
              (_(), k(q, null, at(o, (M, C) => r("div", {
                key: C,
                class: W(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70", i[C]]),
                style: gt({ height: `${M}%` })
              }, null, 6)), 64))
            ]),
            w[2] || (w[2] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading human escalations... ", -1))
          ])) : (_(), k(q, { key: 1 }, [
            h.value.labels && h.value.labels.length && h.value.datasets.length ? (_(), k("section", d_, [
              r("div", u_, [
                R(ge, {
                  data: h.value,
                  theme: l.value
                }, null, 8, ["data", "theme"])
              ]),
              r("div", h_, [
                (_(!0), k(q, null, at(y.value, (M) => (_(), k("div", {
                  key: `legend-${M.key}`,
                  class: "inline-flex items-center gap-2 text-sm"
                }, [
                  r("span", {
                    class: "inline-block h-2.5 w-2.5 rounded-full",
                    style: gt({ backgroundColor: M.color })
                  }, null, 4),
                  r("span", f_, A(M.label), 1)
                ]))), 128))
              ]),
              r("div", g_, [
                (_(!0), k(q, null, at(g.value, (M) => (_(), k("div", {
                  key: `card-${M.key}`,
                  class: "rounded-xl border border-[var(--kiut-border-light,#e5e7eb)] p-3"
                }, [
                  r("p", p_, [
                    r("span", {
                      class: "inline-block h-2.5 w-2.5 rounded-full",
                      style: gt({ backgroundColor: M.color })
                    }, null, 4),
                    r("span", m_, A(M.label), 1)
                  ]),
                  r("p", b_, A(M.percentage.toFixed(1)) + "% ", 1)
                ]))), 128))
              ])
            ])) : (_(), k("section", v_, [...w[3] || (w[3] = [
              r("div", { class: "max-w-[360px] px-4 text-center" }, [
                r("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No human escalations data available "),
                r("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No escalation data found for the selected period. Try adjusting the date range. ")
              ], -1)
            ])]))
          ], 64))
        ], 2)
      ]),
      _: 1
    }));
  }
}), __ = /* @__PURE__ */ it(y_, [["__scopeId", "data-v-809d3c8c"]]), x_ = { class: "highlight-inner" }, k_ = {
  key: 0,
  class: "loading-state"
}, w_ = {
  key: 1,
  class: "card-body"
}, C_ = { class: "metric-value" }, $_ = /* @__PURE__ */ Z({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e) {
    const t = e, { isDark: n } = ut(dt(t, "theme")), a = D(() => `${Number(t.escalationRatePercentage || 0).toFixed(2)}%`), s = D(
      () => t.previousEscalationRatePercentage !== null && t.previousEscalationRatePercentage !== void 0
    ), o = D(() => {
      if (!s.value) return 0;
      const d = t.previousEscalationRatePercentage;
      return d === 0 ? t.escalationRatePercentage > 0 ? 100 : 0 : (t.escalationRatePercentage - d) / d * 100;
    }), i = D(() => {
      const d = o.value.toFixed(1);
      return o.value > 0 ? `+${d}% vs prev.` : `${d}% vs prev.`;
    }), l = D(() => o.value > 0 ? "change-badge--up" : o.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return (d, c) => (_(), nt(ft, {
      collapsible: !1,
      class: W(["human-escalations-metric", "w-full", { "human-escalations-metric--dark": F(n) }])
    }, {
      title: P(() => [...c[0] || (c[0] = [
        r("div", { class: "header-title-group" }, [
          r("div", {
            class: "icon-wrapper",
            "aria-hidden": "true"
          }, [
            r("svg", {
              class: "card-icon",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "1.5"
            }, [
              r("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                d: "M15 7.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              }),
              r("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                d: "M4.5 19.5a7.5 7.5 0 0 1 9.36-7.29"
              }),
              r("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                d: "m17.25 15.75 4.5 4.5"
              }),
              r("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                d: "m21.75 15.75-4.5 4.5"
              })
            ])
          ])
        ], -1)
      ])]),
      headerAside: P(() => [
        !e.loading && s.value ? (_(), k("div", {
          key: 0,
          class: W(["change-badge", l.value])
        }, A(i.value), 3)) : z("", !0)
      ]),
      default: P(() => [
        r("div", x_, [
          e.loading ? (_(), k("div", k_, [...c[1] || (c[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (_(), k("div", w_, [
            r("span", C_, A(a.value), 1),
            c[2] || (c[2] = r("span", { class: "metric-label" }, "Human Escalations", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), M_ = /* @__PURE__ */ it($_, [["__scopeId", "data-v-4a985726"]]), S_ = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, D_ = {
  key: 0,
  class: "flex min-h-[320px] flex-col items-center justify-center px-4"
}, A_ = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, T_ = {
  key: 1,
  class: "flex w-full shrink-0 flex-col min-h-0"
}, B_ = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, L_ = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, F_ = {
  key: 2,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, E_ = { class: "max-w-[360px] text-center" }, I_ = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, P_ = {
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
    const t = e, { isDark: n, colors: a } = ut(dt(t, "theme")), s = [30, 50, 70, 50, 40], o = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], i = D(() => {
      const c = t.data ?? {}, u = c.daily, h = c.days, g = Array.isArray(u) && u.length > 0, y = Array.isArray(h) && h.length > 0 && Array.isArray(c.allocatedCostSeries) && c.allocatedCostSeries.length === h.length;
      let f = [];
      return g ? f = u : y && (f = h.map((m, v) => ({
        date: m,
        allocated_cost: c.allocatedCostSeries[v] ?? 0,
        aws_cost: c.awsCostSeries[v] ?? 0,
        airline_conversations: c.airlineConversationsSeries[v] ?? 0
      }))), {
        daily: p,
        total_allocated_cost: c.total_allocated_cost ?? c.totalAllocated ?? 0,
        total_cost: c.total_cost ?? c.total ?? 0,
        total_conversations: c.total_conversations ?? c.totalConversations ?? 0,
        total_airline_conversations: c.total_airline_conversations ?? c.totalAirlineConversations ?? 0,
        airline_name: c.airline_name
      };
    }), l = D(() => {
      const c = i.value.daily;
      return {
        labels: c.map((h) => h.date),
        datasets: [
          {
            label: "Allocated Cost",
            data: c.map((h) => h.allocated_cost),
            borderColor: a.value.primaryLight,
            backgroundColor: n.value ? "rgba(198, 125, 255, 0.15)" : "rgba(198, 125, 255, 0.08)",
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.4,
            fill: !0,
            yAxisID: "y"
          },
          {
            label: "AWS Cost",
            data: c.map((h) => h.aws_cost),
            borderColor: "#FF9900",
            backgroundColor: "transparent",
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.4,
            fill: !1,
            yAxisID: "y"
          },
          {
            label: "Airline Conv.",
            data: c.map((h) => h.airline_conversations),
            borderColor: a.value.info,
            backgroundColor: n.value ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)",
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.4,
            yAxisID: "y1"
          }
        ]
      };
    }), d = D(() => ({
      responsive: !0,
      maintainAspectRatio: !1,
      layout: {
        padding: {
          top: 6,
          bottom: 4,
          left: 0,
          right: 4
        }
      },
      interaction: {
        mode: "index",
        intersect: !1
      },
      plugins: {
        tooltip: {
          padding: 12,
          backgroundColor: a.value.tooltipBg,
          titleColor: a.value.tooltipText,
          bodyColor: a.value.tooltipText,
          borderColor: a.value.tooltipBorder,
          borderWidth: 1,
          cornerRadius: 12,
          displayColors: !0,
          usePointStyle: !0,
          callbacks: {
            label(c) {
              const u = c.dataset.label ? `${c.dataset.label}: ` : "", h = c.parsed.y;
              return c.dataset.yAxisID === "y" ? u + xt(h) : u + String(h);
            }
          }
        }
      },
      scales: {
        y: {
          type: "linear",
          display: !0,
          position: "left",
          grid: {
            color: a.value.gridLines,
            drawBorder: !1
          },
          ticks: {
            color: a.value.textSecondary,
            font: { family: "'Inter', ui-sans-serif, system-ui, sans-serif", size: 10 },
            callback: (c) => xt(c)
          }
        },
        y1: {
          type: "linear",
          display: !0,
          position: "right",
          grid: { display: !1 },
          ticks: {
            color: a.value.textSecondary,
            font: { family: "'Inter', ui-sans-serif, system-ui, sans-serif", size: 10 }
          }
        },
        x: {
          grid: { display: !1 },
          ticks: {
            color: a.value.textSecondary,
            font: { family: "'Inter', ui-sans-serif, system-ui, sans-serif", size: 10 }
          }
        }
      }
    }));
    return (c, u) => (_(), tt(gt, {
      title: i.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1
    }, {
      default: P(() => [
        r("div", S_, [
          e.loading ? (_(), k("div", D_, [
            r("div", A_, [
              (_(), k(q, null, at(s, (h, g) => r("div", {
                key: g,
                class: W(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", o[g]]),
                style: gt({ height: `${h}%` })
              }, null, 6)), 64))
            ]),
            u[0] || (u[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading chart data... ", -1))
          ])) : i.value.daily.length > 0 ? (_(), k("div", T_, [
            r("div", B_, [
              R(ge, {
                class: "h-full min-h-0 w-full",
                data: l.value,
                options: d.value
              }, null, 8, ["data", "options"])
            ]),
            r("div", L_, [
              R(lt, {
                color: F(a).primaryLight,
                title: "Total Allocated",
                value: F(xt)(i.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              R(lt, {
                color: "#FF9900",
                title: "Total AWS",
                value: F(xt)(i.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (_(), k("section", F_, [
            r("div", E_, [
              r("div", I_, [
                R(F(Wt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
              ]),
              u[1] || (u[1] = r("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " Sin datos de costos ", -1)),
              u[2] || (u[2] = r("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["title"]));
  }
}, R_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, O_ = {
  key: 0,
  class: "card-body"
}, z_ = {
  key: 0,
  class: "chart-section"
}, V_ = { class: "chart-container" }, N_ = { class: "mt-auto grid grid-cols-2 gap-3 sm:grid-cols-3 max-[768px]:gap-2" }, W_ = {
  key: 1,
  class: "empty-state"
}, H_ = { class: "empty-state-content" }, j_ = { class: "empty-icon-wrapper" }, Y_ = {
  key: 1,
  class: "loading-state"
}, sn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", $o = 10, K_ = /* @__PURE__ */ Z({
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
  setup(e, { expose: t, emit: n }) {
    const a = e, { isDark: s, colors: o } = ut(dt(a, "theme")), i = (f) => {
      const m = new Date(f), v = String(m.getDate()).padStart(2, "0"), p = String(m.getMonth() + 1).padStart(2, "0");
      return `${v}-${p}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, d = D(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((m, v) => m + (v.input_cost || 0), 0);
    }), c = D(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((m, v) => m + (v.output_cost || 0), 0);
    }), u = D(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((m, v) => m + (v.cache_read_cost || 0), 0);
    }), h = D(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((m, v) => m + (v.cache_write_cost || 0), 0);
    }), g = D(() => {
      const f = a.data?.costs_by_day || {}, m = Object.keys(f).sort();
      if (m.length === 0)
        return { labels: [], datasets: [] };
      const v = m.map((b) => i(b)), p = [
        {
          label: "Input Cost",
          data: m.map((b) => f[b]?.input_cost || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: m.map((b) => f[b]?.output_cost || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: m.map((b) => f[b]?.cache_read_cost || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: m.map((b) => f[b]?.cache_write_cost || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: v,
        datasets: p
      };
    }), y = D(() => a.options ? a.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      interaction: {
        mode: "index",
        intersect: !1
      },
      plugins: {
        legend: {
          display: !0,
          position: "bottom",
          align: "center",
          labels: {
            font: {
              family: cn,
              size: 13,
              weight: "500"
            },
            color: s.value.textSecondary,
            padding: 12,
            boxWidth: Es,
            boxHeight: Es,
            usePointStyle: !1
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: s.value.tooltipBg,
          titleColor: s.value.tooltipText,
          bodyColor: s.value.tooltipText,
          borderColor: o.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            family: cn,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: cn,
            size: 12,
            weight: "500"
          },
          callbacks: {
            label: function(p) {
              let b = p.dataset.label || "";
              return b && (b += ": "), p.parsed.y !== null && (b += xt(p.parsed.y)), b;
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
            font: { family: cn, size: 12, weight: "500" },
            color: s.value.textSecondary,
            padding: 8
          }
        },
        y: {
          stacked: !0,
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: s.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: cn, size: 12, weight: "500" },
            color: s.value.textSecondary,
            padding: 8,
            callback: function(p) {
              return xt(p);
            }
          }
        }
      }
    });
    return t({ isDark: o }), (p, b) => (_(), tt(gt, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1
    }, {
      default: P(() => [
        r("div", R_, [
          e.loading ? (_(), k("div", Y_, [...m[2] || (m[2] = [
            r("div", { class: "loading-container" }, [
              r("div", { class: "chart-lines-loader" }, [
                r("div", { class: "line line-1" }),
                r("div", { class: "line line-2" }),
                r("div", { class: "line line-3" }),
                r("div", { class: "line line-4" }),
                r("div", { class: "line line-5" })
              ]),
              r("p", { class: "loading-text" }, "Loading chart data...")
            ], -1)
          ])])) : (_(), k("div", O_, [
            g.value.labels && g.value.labels.length ? (_(), k("section", z_, [
              r("div", V_, [
                R(he, {
                  data: g.value,
                  options: y.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              r("footer", N_, [
                R(lt, {
                  title: "Total Cost",
                  value: F(xt)(e.data.total_cost)
                }, null, 8, ["value"]),
                R(lt, {
                  title: "Input Cost",
                  value: F(yt)(d.value),
                  color: l.input
                }, null, 8, ["value", "color"]),
                R(lt, {
                  title: "Output Cost",
                  value: F(yt)(c.value),
                  color: l.output
                }, null, 8, ["value", "color"]),
                R(lt, {
                  title: "Cache Read",
                  value: F(yt)(u.value),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                R(lt, {
                  title: "Cache Write",
                  value: F(yt)(h.value),
                  color: l.cache_write
                }, null, 8, ["value", "color"]),
                R(lt, {
                  title: "Avg / Conv.",
                  value: F(xt)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (_(), k("section", W_, [
              r("div", H_, [
                r("div", j_, [
                  R(F(Wt), { class: "empty-icon" })
                ]),
                m[0] || (m[0] = r("p", { class: "empty-title" }, "No cost usage data", -1)),
                m[1] || (m[1] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), q_ = /* @__PURE__ */ it(K_, [["__scopeId", "data-v-39a5448c"]]), U_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, X_ = {
  key: 0,
  class: "card-body"
}, G_ = {
  key: 0,
  class: "chart-section"
}, Z_ = { class: "chart-container" }, Q_ = { class: "mt-auto flex w-full min-w-0 flex-nowrap items-stretch gap-2 sm:gap-3" }, J_ = {
  key: 1,
  class: "empty-state"
}, tx = { class: "empty-state-content" }, ex = { class: "empty-icon-wrapper" }, nx = {
  key: 1,
  class: "loading-state"
}, on = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Mo = 10, ax = /* @__PURE__ */ Z({
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
  setup(e, { expose: t, emit: n }) {
    const a = e, { isDark: s, colors: o } = ut(dt(a, "theme")), i = (u) => {
      const h = new Date(u), g = String(h.getDate()).padStart(2, "0"), y = String(h.getMonth() + 1).padStart(2, "0");
      return `${g}-${y}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, d = D(() => {
      const u = a.data?.tokens_by_day || {}, h = Object.keys(u).sort();
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const g = h.map((f) => i(f)), y = [
        {
          label: "Input Tokens",
          data: h.map((f) => u[f]?.input_tokens || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: h.map((f) => u[f]?.output_tokens || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: h.map((f) => u[f]?.cache_read_tokens || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: h.map((f) => u[f]?.cache_write_tokens || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: g,
        datasets: y
      };
    }), c = D(() => a.options ? a.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      interaction: {
        mode: "index",
        intersect: !1
      },
      plugins: {
        legend: {
          display: !0,
          position: "bottom",
          align: "center",
          labels: {
            font: {
              family: dn,
              size: 13,
              weight: "500"
            },
            color: s.value.textSecondary,
            padding: 12,
            boxWidth: Mo,
            boxHeight: Mo,
            usePointStyle: !1
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: s.value.tooltipBg,
          titleColor: s.value.tooltipText,
          bodyColor: s.value.tooltipText,
          borderColor: o.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            family: dn,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: dn,
            size: 12,
            weight: "500"
          }
        }
      },
      scales: {
        x: {
          stacked: !0,
          border: { display: !1 },
          grid: { display: !1 },
          ticks: {
            font: { family: dn, size: 12, weight: "500" },
            color: s.value.textSecondary,
            padding: 8
          }
        },
        y: {
          stacked: !0,
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: s.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: dn, size: 12, weight: "500" },
            color: s.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: o }), (u, h) => (_(), tt(gt, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1
    }, {
      default: P(() => [
        r("div", U_, [
          e.loading ? (_(), k("div", nx, [...h[2] || (h[2] = [
            r("div", { class: "loading-container" }, [
              r("div", { class: "chart-lines-loader" }, [
                r("div", { class: "line line-1" }),
                r("div", { class: "line line-2" }),
                r("div", { class: "line line-3" }),
                r("div", { class: "line line-4" }),
                r("div", { class: "line line-5" })
              ]),
              r("p", { class: "loading-text" }, "Loading chart data...")
            ], -1)
          ])])) : (_(), k("div", X_, [
            d.value.labels && d.value.labels.length ? (_(), k("section", G_, [
              r("div", Z_, [
                R(he, {
                  data: d.value,
                  options: c.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              r("footer", Q_, [
                R(lt, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: F(U)(e.data.total_tokens)
                }, null, 8, ["value"]),
                R(lt, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: F(U)(e.data.total_input_tokens),
                  color: l.input
                }, null, 8, ["value", "color"]),
                R(lt, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: F(U)(e.data.total_output_tokens),
                  color: l.output
                }, null, 8, ["value", "color"]),
                R(lt, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: F(U)(e.data.total_cache_read_tokens),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                R(lt, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: F(U)(e.data.total_cache_write_tokens),
                  color: l.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (_(), k("section", J_, [
              r("div", tx, [
                r("div", ex, [
                  R(F(Wt), { class: "empty-icon" })
                ]),
                h[0] || (h[0] = r("p", { class: "empty-title" }, "No token usage data", -1)),
                h[1] || (h[1] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see token consumption trends.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), sx = /* @__PURE__ */ it(ax, [["__scopeId", "data-v-70c6f3c7"]]), ox = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, ix = {
  key: 0,
  class: "card-body"
}, lx = {
  key: 0,
  class: "chart-section"
}, rx = { class: "chart-container" }, cx = { class: "mt-4 w-full min-w-0" }, dx = {
  key: 1,
  class: "empty-state"
}, ux = { class: "empty-state-content" }, hx = { class: "empty-icon-wrapper" }, fx = {
  key: 1,
  class: "loading-state"
}, gx = /* @__PURE__ */ Z({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = ut(dt(n, "theme")), o = (c) => {
      const u = new Date(c), h = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = D(
      () => U(n.data?.total_conversations ?? 0)
    ), l = D(() => {
      const c = n.data?.conversations_by_day || {}, u = Object.keys(c).sort();
      if (u.length === 0)
        return { labels: [], datasets: [] };
      const h = u.map((y) => o(y)), g = [
        {
          label: "Conversations",
          data: u.map((y) => c[y] || 0),
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
        labels: h,
        datasets: g
      };
    }), d = D(() => n.options ? n.options : {
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
            pointStyle: "circle"
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: o.value.tooltipBg,
          titleColor: o.value.tooltipText,
          bodyColor: o.value.tooltipText,
          borderColor: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
              let u = c.dataset.label || "";
              return u && (u += ": "), c.parsed.y !== null && (u += c.parsed.y), u;
            }
          }
        }
      },
      scales: {
        x: {
          border: { display: !1 },
          grid: { color: o.value.gridLines, lineWidth: 1, drawTicks: !1 },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: o.value.textSecondary,
            padding: 8
          }
        },
        y: {
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
    return t({ isDark: a }), (c, u) => (_(), tt(gt, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1
    }, {
      default: P(() => [
        r("div", ox, [
          e.loading ? (_(), k("div", fx, [...u[2] || (u[2] = [
            r("div", { class: "loading-container" }, [
              r("div", { class: "chart-lines-loader" }, [
                r("div", { class: "line line-1" }),
                r("div", { class: "line line-2" }),
                r("div", { class: "line line-3" }),
                r("div", { class: "line line-4" }),
                r("div", { class: "line line-5" })
              ]),
              r("p", { class: "loading-text" }, "Loading chart data...")
            ], -1)
          ])])) : (_(), k("div", ix, [
            l.value.labels && l.value.labels.length ? (_(), k("section", lx, [
              r("div", rx, [
                R(ge, {
                  data: l.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ]),
              r("div", cx, [
                R(lt, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (_(), k("section", dx, [
              r("div", ux, [
                r("div", hx, [
                  R(F(Wt), { class: "empty-icon" })
                ]),
                u[0] || (u[0] = r("p", { class: "empty-title" }, "No conversation count data", -1)),
                u[1] || (u[1] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), px = /* @__PURE__ */ it(gx, [["__scopeId", "data-v-b33e8627"]]), mx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, bx = {
  key: 0,
  class: "card-body"
}, vx = {
  key: 0,
  class: "charts-grid"
}, yx = { class: "chart-section" }, _x = { class: "chart-container" }, xx = { class: "chart-section" }, kx = { class: "chart-container" }, wx = {
  key: 1,
  class: "empty-state"
}, Cx = { class: "empty-state-content" }, $x = { class: "empty-icon-wrapper" }, Mx = {
  key: 1,
  class: "loading-state"
}, Sx = /* @__PURE__ */ Z({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = ut(dt(n, "theme")), o = D(() => n.data?.top_agents && n.data.top_agents.length > 0), i = D(() => n.data?.top_agents ? [...n.data.top_agents].sort((g, y) => (y.total_cost || 0) - (g.total_cost || 0)) : []), l = D(() => n.data?.top_agents ? [...n.data.top_agents].sort((g, y) => (y.total_tokens || 0) - (g.total_tokens || 0)) : []), d = D(() => {
      const g = i.value;
      return g.length === 0 ? { labels: [], datasets: [] } : {
        labels: g.map((y) => y.agent_type),
        datasets: [
          {
            label: "Total Cost",
            data: g.map((y) => y.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), c = D(() => {
      const g = l.value;
      return g.length === 0 ? { labels: [], datasets: [] } : {
        labels: g.map((y) => y.agent_type),
        datasets: [
          {
            label: "Total Tokens",
            data: g.map((y) => y.total_tokens || 0),
            backgroundColor: "#f59e0b80",
            borderColor: "#f59e0b",
            borderWidth: 1
          }
        ]
      };
    }), u = D(() => n.options ? n.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !1
        },
        tooltip: {
          enabled: !0,
          backgroundColor: o.value.tooltipBg,
          titleColor: o.value.tooltipText,
          bodyColor: o.value.tooltipText,
          borderColor: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
              const y = g.label, f = n.data?.top_agents?.find((m) => m.agent_type === y);
              return f ? [
                `Total Cost: ${yt(f.total_cost)}`,
                `Input Cost: ${yt(f.total_input_tokens_cost)}`,
                `Output Cost: ${yt(f.total_output_tokens_cost)}`,
                `Cache Read: ${yt(f.total_read_tokens_cost)}`,
                `Cache Write: ${yt(f.total_write_tokens_cost)}`
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
            color: o.value.textSecondary,
            padding: 8
          }
        },
        y: {
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
            callback: function(g) {
              return yt(g);
            }
          }
        }
      }
    }), h = D(() => n.options ? n.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !1
        },
        tooltip: {
          enabled: !0,
          backgroundColor: o.value.tooltipBg,
          titleColor: o.value.tooltipText,
          bodyColor: o.value.tooltipText,
          borderColor: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
              const y = g.label, f = n.data?.top_agents?.find((m) => m.agent_type === y);
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
            color: o.value.textSecondary,
            padding: 8
          }
        },
        y: {
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
            callback: function(g) {
              return g.toLocaleString();
            }
          }
        }
      }
    });
    return t({ isDark: a }), (g, y) => (_(), nt(ft, {
      class: "h-full min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1
    }, {
      default: P(() => [
        r("div", mx, [
          e.loading ? (_(), k("div", Mx, [...y[4] || (y[4] = [
            r("div", { class: "loading-container" }, [
              r("div", { class: "chart-lines-loader" }, [
                r("div", { class: "line line-1" }),
                r("div", { class: "line line-2" }),
                r("div", { class: "line line-3" }),
                r("div", { class: "line line-4" }),
                r("div", { class: "line line-5" })
              ]),
              r("p", { class: "loading-text" }, "Loading chart data...")
            ], -1)
          ])])) : (_(), k("div", bx, [
            o.value ? (_(), k("div", vx, [
              r("section", yx, [
                y[0] || (y[0] = r("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                r("div", _x, [
                  R(he, {
                    data: d.value,
                    options: u.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              r("section", xx, [
                y[1] || (y[1] = r("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                r("div", kx, [
                  R(he, {
                    data: c.value,
                    options: h.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (_(), k("section", wx, [
              r("div", Cx, [
                r("div", $x, [
                  R(F(Wt), { class: "empty-icon" })
                ]),
                y[2] || (y[2] = r("p", { class: "empty-title" }, "No top agents data", -1)),
                y[3] || (y[3] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), Dx = /* @__PURE__ */ it(Sx, [["__scopeId", "data-v-a5014772"]]), Ax = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Tx = {
  key: 0,
  class: "card-body"
}, Bx = {
  key: 0,
  class: "chart-section"
}, Lx = { class: "chart-container" }, Fx = {
  key: 1,
  class: "empty-state"
}, Ex = { class: "empty-state-content" }, Ix = { class: "empty-icon-wrapper" }, Px = {
  key: 1,
  class: "loading-state"
}, Rx = /* @__PURE__ */ Z({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = ut(dt(n, "theme")), o = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, i = D(() => n.data?.top_agents ? n.data.top_agents.filter(
      (h) => h.agent_type?.toLowerCase() !== "triage"
    ) : []), l = D(() => i.value.length > 0), d = D(() => i.value.reduce((h, g) => h + (g.conversations || 0), 0)), c = D(() => {
      const h = i.value;
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const g = h.map((m) => {
        const v = m.agent_type?.toLowerCase();
        return (o[v] || "#a78bfa") + "80";
      }), y = h.map((m) => {
        const v = m.agent_type?.toLowerCase();
        return o[v] || "#a78bfa";
      });
      return {
        labels: h.map((m) => {
          const v = m.conversations || 0, p = d.value ? v / d.value * 100 : 0;
          return `${m.agent_type} - ${v.toLocaleString()} (${p.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((m) => m.conversations || 0),
            backgroundColor: g,
            borderColor: y,
            borderWidth: 2
          }
        ]
      };
    }), u = D(() => n.options ? n.options : {
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
            color: o.value.textSecondary,
            usePointStyle: !0,
            padding: 16,
            boxWidth: 8,
            boxHeight: 8
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: o.value.tooltipBg,
          titleColor: o.value.tooltipText,
          bodyColor: o.value.tooltipText,
          borderColor: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
              const g = (h.label || "").toString(), y = Number(h.parsed) || 0, f = (h.dataset.data || []).reduce((v, p) => v + (Number(p) || 0), 0), m = f ? y / f * 100 : 0;
              return `${g}: ${y.toLocaleString()} (${m.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: a }), (h, g) => (_(), nt(ft, {
      class: "h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1
    }, {
      default: P(() => [
        r("div", Ax, [
          e.loading ? (_(), k("div", Px, [...g[2] || (g[2] = [
            r("div", { class: "loading-container" }, [
              r("div", { class: "chart-lines-loader" }, [
                r("div", { class: "line line-1" }),
                r("div", { class: "line line-2" }),
                r("div", { class: "line line-3" }),
                r("div", { class: "line line-4" }),
                r("div", { class: "line line-5" })
              ]),
              r("p", { class: "loading-text" }, "Loading chart data...")
            ], -1)
          ])])) : (_(), k("div", Tx, [
            l.value ? (_(), k("section", Bx, [
              r("div", Lx, [
                R(na, {
                  data: c.value,
                  options: u.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (_(), k("section", Fx, [
              r("div", Ex, [
                r("div", Ix, [
                  R(F(Wt), { class: "empty-icon" })
                ]),
                g[0] || (g[0] = r("p", { class: "empty-title" }, "No top agents data", -1)),
                g[1] || (g[1] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), Ox = /* @__PURE__ */ it(Rx, [["__scopeId", "data-v-14445b91"]]), zx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Vx = {
  key: 0,
  class: "card-body"
}, Nx = {
  key: 0,
  class: "chart-section"
}, Wx = { class: "chart-container" }, Hx = {
  key: 1,
  class: "empty-state"
}, jx = { class: "empty-state-content" }, Yx = { class: "empty-icon-wrapper" }, Kx = {
  key: 1,
  class: "loading-state"
}, qx = /* @__PURE__ */ Z({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = ut(dt(n, "theme")), o = (c) => {
      const u = new Date(c), h = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = D(() => {
      const c = n.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(c) && c.length > 0)
        return !0;
      const u = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {};
      return Object.keys(u).length > 0 && Object.keys(h).length > 0;
    }), l = D(() => {
      const c = n.costData?.daily_mean_cost_per_conversation || [];
      if (c.length > 0) {
        const v = [...c].sort((p, b) => p.date.localeCompare(b.date));
        return {
          labels: v.map((p) => o(p.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: v.map((p) => Number(p.value) || 0),
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
      const u = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {}, y = Object.keys(u).filter((v) => h[v]).sort();
      if (y.length === 0)
        return { labels: [], datasets: [] };
      const f = y.map((v) => o(v)), m = y.map((v) => {
        const p = u[v]?.total_cost || 0, b = h[v] || 0;
        return b > 0 ? p / b : 0;
      });
      return {
        labels: p,
        datasets: [
          {
            label: "Mean USD/conv",
            data: b,
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
    }), d = D(() => n.options ? n.options : {
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
            color: o.value.textSecondary,
            padding: 12,
            boxWidth: 40,
            boxHeight: 12,
            borderRadius: 4,
            usePointStyle: !1
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: o.value.tooltipBg,
          titleColor: o.value.tooltipText,
          bodyColor: o.value.tooltipText,
          borderColor: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
              let u = c.dataset.label || "";
              return u && (u += ": "), c.parsed.y !== null && (u += xt(c.parsed.y)), u;
            }
          }
        }
      },
      scales: {
        x: {
          border: { display: !1 },
          grid: { color: o.value.gridLines, lineWidth: 1, drawTicks: !1 },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: o.value.textSecondary,
            padding: 8
          }
        },
        y: {
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
            callback: function(c) {
              return xt(c);
            }
          }
        }
      }
    });
    return t({ isDark: a }), (c, u) => (_(), tt(gt, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1
    }, {
      default: P(() => [
        r("div", zx, [
          e.loading ? (_(), k("div", Kx, [...u[2] || (u[2] = [
            r("div", { class: "loading-container" }, [
              r("div", { class: "chart-lines-loader" }, [
                r("div", { class: "line line-1" }),
                r("div", { class: "line line-2" }),
                r("div", { class: "line line-3" }),
                r("div", { class: "line line-4" }),
                r("div", { class: "line line-5" })
              ]),
              r("p", { class: "loading-text" }, "Loading chart data...")
            ], -1)
          ])])) : (_(), k("div", Vx, [
            i.value ? (_(), k("section", Nx, [
              r("div", Wx, [
                R(ge, {
                  data: l.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (_(), k("section", Hx, [
              r("div", jx, [
                r("div", Yx, [
                  R(F(Wt), { class: "empty-icon" })
                ]),
                u[0] || (u[0] = r("p", { class: "empty-title" }, "No daily cost trends data", -1)),
                u[1] || (u[1] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), Ux = /* @__PURE__ */ it(qx, [["__scopeId", "data-v-1e8204ea"]]);
function Nt() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const Xx = { class: "tabs text-sm" }, Gx = ["aria-label"], Zx = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], Qx = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, Jx = /* @__PURE__ */ Z({
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
    const n = e, a = t, s = st([]), o = `tabs-${Nt()}`, i = (f) => `${o}-tab-${f}`, l = D(
      () => n.items.map((f, m) => f.disabled ? -1 : m).filter((f) => f >= 0)
    );
    function d(p) {
      return p.value === n.modelValue;
    }
    function c(f) {
      const m = d(f), p = `${n.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-full min-h-0 cursor-pointer rounded-lg border border-transparent text-center outline-none transition-[background-color,color,box-shadow,opacity,transform] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return f.disabled ? `${p} cursor-not-allowed opacity-40` : m ? `${p} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${p} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function u(f, m) {
      f === m || n.items.find((p) => p.value === f)?.disabled || (a("update:modelValue", f), a("change", { value: f, previousValue: m }));
    }
    function h(f, m) {
      a("tab-click", { value: f.value, originalEvent: m }), !f.disabled && (u(f.value, n.modelValue), Et(() => {
        s.value[n.items.indexOf(f)]?.focus();
      }));
    }
    function g(f, m) {
      const v = n.items.length;
      if (v === 0) return 0;
      let p = f;
      for (let b = 0; b < v; b++)
        if (p = (p + m + v) % v, !n.items[p]?.disabled) return p;
      return f;
    }
    async function y(f, m) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(f.key)) return;
      f.preventDefault();
      let p = m;
      f.key === "ArrowLeft" ? p = g(m, -1) : f.key === "ArrowRight" ? p = g(m, 1) : f.key === "Home" ? p = l.value[0] ?? 0 : f.key === "End" && (p = l.value[l.value.length - 1] ?? m);
      const b = n.items[p];
      !b || b.disabled || (u(b.value, n.modelValue), await Et(), s.value[p]?.focus());
    }
    return (f, m) => (_(), k("div", Xx, [
      r("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: W([
          "box-border min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 p-0.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (_(!0), k(q, null, at(e.items, (v, p) => (_(), k("button", {
          id: i(v.value),
          key: v.value,
          ref_for: !0,
          ref_key: "tabRefs",
          ref: o,
          type: "button",
          role: "tab",
          "aria-selected": d(v),
          "aria-disabled": v.disabled === !0,
          tabindex: d(v) ? 0 : -1,
          class: W(c(v)),
          onClick: (b) => h(v, b),
          onKeydown: (b) => y(b, p)
        }, [
          r("span", {
            class: W(["flex h-full min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            v.icon ? (_(), tt(Ge(v.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : z("", !0),
            r("span", Qx, A(v.label), 1)
          ], 2)
        ], 42, Zx))), 128))
      ], 10, Gx),
      f.$slots.default ? (_(), nt(un, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: P(() => [
          (_(), w("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            $t(p.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : z("", !0)
    ]));
  }
}), Ni = /* @__PURE__ */ it(Jx, [["__scopeId", "data-v-552ce048"]]), tk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, ek = {
  key: 0,
  class: "loading-state"
}, nk = {
  key: 1,
  class: "card-body"
}, ak = {
  key: 0,
  class: "model-usage-table-block"
}, sk = { class: "w-full min-w-0" }, ok = {
  key: 1,
  class: "empty-state"
}, ik = { class: "empty-state-content" }, lk = { class: "empty-icon-wrapper" }, rk = /* @__PURE__ */ Z({
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
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = (f) => {
      s("export", f);
    }, { isDark: i } = ut(dt(a, "theme")), l = [
      { value: "by_model", label: "Model" },
      { value: "by_provider", label: "Provider" }
    ], d = st("by_model"), c = D(() => d.value === "by_model" ? a.data?.total_by_model || {} : a.data?.total_by_provider || {}), u = D(() => [
      { key: "name", label: d.value === "by_model" ? "Model" : "Provider", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ]), h = D(
      () => Object.entries(c.value).map(([f, m]) => ({
        id: f,
        name: f,
        avgCost: y(m.avg_cost_per_message),
        avgTokens: g(m.avg_tokens_per_message),
        messageCount: g(m.message_count),
        totalCost: y(m.total_cost),
        totalTokens: g(m.total_tokens)
      }))
    ), g = (f) => f == null ? "0" : U(f), y = (f) => f == null ? "$0.00" : yt(f);
    return t({ isDark: i }), (f, m) => (_(), nt(ft, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1
    }, St({
      default: P(() => [
        r("div", tk, [
          e.loading ? (_(), k("div", ek, [...m[1] || (m[1] = [
            r("div", { class: "loading-container" }, [
              r("div", { class: "chart-bars-loader" }, [
                r("div", { class: "bar bar-1" }),
                r("div", { class: "bar bar-2" }),
                r("div", { class: "bar bar-3" }),
                r("div", { class: "bar bar-4" }),
                r("div", { class: "bar bar-5" })
              ]),
              r("p", { class: "loading-text" }, "Loading model usage data...")
            ], -1)
          ])])) : (_(), k("div", nk, [
            R(Ni, {
              modelValue: d.value,
              "onUpdate:modelValue": m[0] || (m[0] = (v) => d.value = v),
              items: l,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: P(() => [
                c.value && Object.keys(c.value).length > 0 ? (_(), k("div", ak, [
                  r("div", sk, [
                    R(qt, {
                      columns: u.value,
                      rows: h.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (_(), k("div", ok, [
                  r("div", ik, [
                    r("div", lk, [
                      R(F(Wt), { class: "empty-icon" })
                    ]),
                    m[2] || (m[2] = r("p", { class: "empty-title" }, "No model usage data available", -1)),
                    m[3] || (m[3] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
                  ])
                ]))
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]))
        ])
      ]),
      _: 2
    }, [
      e.enableExport && !e.loading ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Bt), {
            variant: "inline",
            onExport: s,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), ck = /* @__PURE__ */ it(rk, [["__scopeId", "data-v-3e03d526"]]), dk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, uk = {
  key: 0,
  class: "loading-state"
}, hk = {
  key: 1,
  class: "card-body"
}, fk = {
  key: 0,
  class: "message-roles-table-block"
}, gk = { class: "w-full min-w-0" }, pk = {
  key: 1,
  class: "empty-state"
}, mk = { class: "empty-state-content" }, bk = { class: "empty-icon-wrapper" }, vk = /* @__PURE__ */ Z({
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
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = (m) => {
      s("export", m);
    }, { isDark: i } = ut(dt(a, "theme")), l = ["assistant", "system", "user"], d = [
      { key: "role", label: "Role", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ], c = D(() => a.data?.total_by_role || {}), u = D(
      () => l.map((m) => ({
        id: m,
        role: f(m),
        avgCost: y(c.value[m]?.avg_cost_per_message),
        avgTokens: g(c.value[m]?.avg_tokens_per_message),
        messageCount: g(c.value[m]?.message_count),
        totalCost: y(c.value[m]?.total_cost),
        totalTokens: g(c.value[m]?.total_tokens)
      }))
    ), h = D(() => Object.keys(c.value).length > 0), g = (m) => m == null ? "0" : U(m), y = (m) => m == null ? "$0.00" : yt(m), f = (m) => m.charAt(0).toUpperCase() + m.slice(1);
    return t({ isDark: i }), (m, v) => (_(), nt(ft, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1
    }, St({
      default: P(() => [
        r("div", dk, [
          e.loading ? (_(), k("div", uk, [...v[0] || (v[0] = [
            r("div", { class: "loading-container" }, [
              r("div", { class: "chart-bars-loader" }, [
                r("div", { class: "bar bar-1" }),
                r("div", { class: "bar bar-2" }),
                r("div", { class: "bar bar-3" }),
                r("div", { class: "bar bar-4" }),
                r("div", { class: "bar bar-5" })
              ]),
              r("p", { class: "loading-text" }, "Loading message role data...")
            ], -1)
          ])])) : (_(), k("div", hk, [
            h.value ? (_(), k("div", fk, [
              r("div", gk, [
                R(qt, {
                  columns: d,
                  rows: u.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (_(), k("div", pk, [
              r("div", mk, [
                r("div", bk, [
                  R(F(Wt), { class: "empty-icon" })
                ]),
                v[1] || (v[1] = r("p", { class: "empty-title" }, "No message role data available", -1)),
                v[2] || (v[2] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 2
    }, [
      e.enableExport && !e.loading ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Bt), {
            variant: "inline",
            onExport: s,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), yk = /* @__PURE__ */ it(vk, [["__scopeId", "data-v-57850103"]]), _k = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, xk = {
  key: 0,
  class: "card-body"
}, kk = {
  key: 0,
  class: "chart-section"
}, wk = { class: "chart-container" }, Ck = { class: "kpi-grid" }, $k = {
  key: 1,
  class: "empty-state"
}, Mk = { class: "empty-state-content" }, Sk = { class: "empty-icon-wrapper" }, Dk = {
  key: 1,
  class: "loading-state"
}, Ak = /* @__PURE__ */ Z({
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
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = (b) => {
      s("export", b);
    }, { isDark: i, colors: l } = ut(dt(a, "theme")), d = {
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
    }, c = (b) => b.agent_type || b.agent_id || b.agent_name || "", u = (b) => b.agent_name ? b.agent_name : c(b).split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ").replace(/V\d+$/, "").trim(), h = (b) => {
      const x = c(b).toLowerCase();
      for (const [w, M] of Object.entries(d))
        if (x.includes(w))
          return M;
      return "#9ca3af";
    }, g = D(() => [...a.data?.top_agents || []].sort((x, w) => w.avg_cost_per_conversation - x.avg_cost_per_conversation)), y = D(() => a.data?.total_conversations !== void 0 ? Number(a.data.total_conversations) || 0 : g.value.reduce((b, x) => b + x.conversations, 0)), f = D(() => a.data?.total_cost !== void 0 ? Number(a.data.total_cost) || 0 : g.value.reduce((b, x) => b + x.total_cost, 0)), m = D(() => a.data?.overall_avg_cost_per_conversation !== void 0 ? Number(a.data.overall_avg_cost_per_conversation) || 0 : y.value === 0 ? 0 : f.value / y.value), v = D(() => {
      const b = g.value;
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const x = b.map((C) => u(C)), w = b.map((C) => C.avg_cost_per_conversation), M = b.map((C) => h(C));
      return {
        labels: k,
        datasets: [
          {
            label: "USD per conversation",
            data: w,
            backgroundColor: M.map((C) => `${C}80`),
            borderColor: M,
            borderWidth: 1
          }
        ]
      };
    }), p = D(() => a.options ? a.options : {
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
          backgroundColor: l.value.tooltipBg,
          titleColor: l.value.tooltipText,
          bodyColor: l.value.tooltipText,
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
              const x = g.value[b.dataIndex];
              return [
                `Cost: ${yt(b.parsed.x)}`,
                `Conversations: ${U(x.conversations)}`,
                `Total Cost: ${yt(x.total_cost)}`
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
            color: l.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: l.value.textSecondary,
            padding: 8,
            callback: function(f) {
              return xt(f);
            }
          }
        },
        y: {
          border: { display: !1 },
          grid: { color: l.value.gridLines, lineWidth: 1, drawTicks: !1 },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: l.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: i }), (f, k) => (_(), tt(gt, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1
    }, St({
      default: P(() => [
        r("div", _k, [
          e.loading ? (_(), k("div", Dk, [...x[2] || (x[2] = [
            r("div", { class: "loading-container" }, [
              r("div", { class: "chart-bars-loader" }, [
                r("div", { class: "bar bar-1" }),
                r("div", { class: "bar bar-2" }),
                r("div", { class: "bar bar-3" }),
                r("div", { class: "bar bar-4" }),
                r("div", { class: "bar bar-5" })
              ]),
              r("p", { class: "loading-text" }, "Loading agent costs...")
            ], -1)
          ])])) : (_(), k("div", xk, [
            v.value.labels && v.value.labels.length ? (_(), k("section", kk, [
              r("div", wk, [
                R(he, {
                  data: v.value,
                  options: p.value
                }, null, 8, ["data", "options"])
              ]),
              r("footer", Ck, [
                R(F(lt), {
                  title: "Total Agents",
                  value: String(g.value.length)
                }, null, 8, ["value"]),
                R(F(lt), {
                  title: "Total Conversations",
                  value: F(U)(y.value)
                }, null, 8, ["value"]),
                R(F(lt), {
                  title: "Total Cost",
                  value: F(xt)(p.value)
                }, null, 8, ["value"]),
                R(F(lt), {
                  title: "Avg Cost / Conv.",
                  value: F(xt)(b.value)
                }, null, 8, ["value"])
              ])
            ])) : (_(), k("section", $k, [
              r("div", Mk, [
                r("div", Sk, [
                  R(F(Wt), { class: "empty-icon" })
                ]),
                x[0] || (x[0] = r("p", { class: "empty-title" }, "No cost per conversation data", -1)),
                x[1] || (x[1] = r("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 2
    }, [
      e.enableExport && !e.loading ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Bt), {
            variant: "inline",
            onExport: s,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), Tk = /* @__PURE__ */ it(Ak, [["__scopeId", "data-v-cd2a584a"]]);
function Bk(e, t) {
  return _(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    r("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function Lk(e, t) {
  return _(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    r("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const Fk = ["aria-label"], Ek = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, Ik = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, Pk = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, Rk = ["aria-label", "aria-expanded", "aria-controls", "onClick"], Ok = { class: "truncate" }, zk = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, Vk = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, Nk = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, Wk = ["aria-label", "onClick"], Hk = ["aria-label", "onClick"], jk = ["aria-label"], Yk = ["aria-label"], Kk = {
  key: 1,
  class: "space-y-2"
}, qk = ["for"], Uk = ["id", "placeholder", "onKeydown"], Xk = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, Gk = ["aria-label"], Zk = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, Qk = ["checked", "onChange"], Jk = { class: "min-w-0 flex-1" }, t2 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, e2 = { class: "flex flex-wrap items-end gap-2" }, n2 = { class: "min-w-[120px] flex-1" }, a2 = ["for"], s2 = ["id"], o2 = { class: "min-w-[120px] flex-1" }, i2 = ["for"], l2 = ["id"], r2 = /* @__PURE__ */ Z({
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
    const n = e, a = t, s = Aa(), i = `${`kiut-filters-${Nt()}`}-panel`, l = st(null), d = /* @__PURE__ */ new Map(), c = st(null), u = st(!1), h = st({}), g = st(null), y = st(""), f = st([]), m = st(""), v = st(""), p = D(() => c.value ? n.filterDefinitions.find((O) => O.id === c.value) ?? null : null), b = D(() => {
      const O = p.value;
      if (O)
        return O.type === "text" ? y.value : O.type === "select" ? p.value : { start: b.value, end: v.value };
    });
    function x(O, H) {
      H && H instanceof HTMLElement ? d.set(O, H) : d.delete(O);
    }
    function x(O) {
      return n.modelValue[O];
    }
    function M(O) {
      if (O == null) return [];
      if (Array.isArray(O))
        return O.filter((H) => typeof H == "string" && H.trim() !== "");
      if (typeof O == "string") {
        const H = O.trim();
        return H ? [H] : [];
      }
      return [];
    }
    function C(O, H) {
      if (H == null) return !0;
      if (O.type === "text") return String(H).trim() === "";
      if (O.type === "select") return M(H).length === 0;
      if (O.type === "dateRange") {
        const J = H;
        return !J?.start?.trim() || !J?.end?.trim();
      }
      return !0;
    }
    const $ = D(
      () => n.filterDefinitions.some((O) => !C(O, w(O.id)))
    ), S = D(() => {
      const O = [];
      for (const H of n.filterDefinitions) {
        const J = w(H.id);
        if (!C(H, J)) {
          if (H.type === "text")
            O.push({ kind: "text", def: H, key: H.id });
          else if (H.type === "dateRange")
            O.push({ kind: "dateRange", def: H, key: H.id });
          else if (H.type === "select")
            for (const mt of M(J))
              O.push({
                kind: "select",
                def: H,
                optionValue: mt,
                key: `${H.id}::${mt}`
              });
        }
      }
      return O;
    });
    function L(O) {
      return O.type !== "select" ? 0 : M(w(O.id)).length;
    }
    function T(O) {
      const H = w(O.id), J = O.label.replace(/^\+\s*/, "");
      if (O.type === "text") return `${J}: ${String(H ?? "").trim()}`;
      if (O.type === "select") {
        const ji = M(H).map((ts) => O.options.find((Yi) => Yi.value === ts)?.label ?? ts);
        return `${J}: ${ji.join(", ")}`;
      }
      const mt = H, Yt = E(mt.start), be = E(mt.end);
      return `${J}: ${Yt} – ${be}`;
    }
    function B(O) {
      return O.kind === "text" || O.kind === "dateRange" ? T(O.def) : O.def.options.find((J) => J.value === O.optionValue)?.label ?? O.optionValue;
    }
    function E(O) {
      if (!O) return "";
      const H = Lt(O, "YYYY-MM-DD", !0);
      return H.isValid() ? H.format("L") : O;
    }
    function I(O) {
      const H = c.value === O.id && u.value, J = !C(O, w(O.id));
      return H || J ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function V(O) {
      return C(O, w(O.id)) ? ee(O) : `Editar filtro ${O.label.replace(/^\+\s*/, "")}`;
    }
    function Y(O) {
      const H = w(O.id);
      if (O.type === "text") {
        y.value = H != null ? String(H) : "";
        return;
      }
      if (O.type === "select") {
        f.value = [...M(H)];
        return;
      }
      const J = H;
      m.value = J?.start?.trim() ?? "", v.value = J?.end?.trim() ?? "";
    }
    function N() {
      const O = p.value;
      if (!O || O.type !== "select") return;
      const H = { ...n.modelValue };
      f.value.length === 0 ? delete H[O.id] : H[O.id] = [...f.value], a("update:modelValue", H), a("change", H);
    }
    function tt(O) {
      const H = f.value.indexOf(O);
      H >= 0 ? f.value = f.value.filter((J, mt) => mt !== H) : f.value = [...f.value, O], N();
    }
    function J(O) {
      if (!O) return;
      g.value = O;
      const H = O.getBoundingClientRect(), J = 300;
      let mt = H.left;
      const Yt = window.innerWidth - J - 12;
      mt > Yt && (mt = Math.max(12, Yt)), mt < 12 && (mt = 12);
      const be = H.bottom + 8;
      h.value = {
        top: `${be}px`,
        left: `${mt}px`,
        width: `${Math.min(J, window.innerWidth - 24)}px`
      };
    }
    function rt(O, H) {
      if (c.value === O.id && u.value) {
        at();
        return;
      }
      u.value && c.value !== O.id && X(), c.value = O.id, u.value = !0, Y(O), Et().then(async () => {
        et(H.currentTarget), await Et(), K();
      });
    }
    function G(O, H) {
      if (c.value === O.id && u.value) {
        at();
        return;
      }
      u.value && c.value !== O.id && X(), c.value = O.id, u.value = !0, Y(O), Et().then(async () => {
        const J = d.get(O.id) ?? H.currentTarget;
        et(J), await Et(), K();
      });
    }
    function K() {
      const O = l.value;
      if (!O) return;
      O.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function j() {
      u.value = !1, c.value = null, g.value = null;
    }
    function ot(O) {
      const H = p.value;
      if (!H) return;
      if (H.type === "text") {
        y.value = O != null ? String(O) : "";
        return;
      }
      if (H.type === "select") {
        f.value = Array.isArray(O) ? O.filter((mt) => typeof mt == "string") : M(O);
        return;
      }
      const U = O;
      b.value = U?.start?.trim() ?? "", v.value = U?.end?.trim() ?? "";
    }
    function X() {
      const O = p.value;
      if (!O) return;
      if (O.type === "text") {
        const Yt = y.value.trim(), be = { ...n.modelValue };
        Yt === "" ? delete be[O.id] : be[O.id] = Yt, a("update:modelValue", be), a("change", be), j();
        return;
      }
      if (O.type === "select") {
        N(), j();
        return;
      }
      const H = m.value.trim(), J = v.value.trim(), mt = { ...n.modelValue };
      !H || !J || H > J ? delete mt[O.id] : mt[O.id] = { start: H, end: J }, a("update:modelValue", mt), a("change", mt), j();
    }
    function ct(O) {
      const H = { ...n.modelValue };
      delete H[O], a("update:modelValue", H), a("change", H), c.value === O && j();
    }
    function pt(O) {
      if (O.kind === "text" || O.kind === "dateRange") {
        It(O.def.id);
        return;
      }
      const H = { ...n.modelValue }, mt = M(H[O.def.id]).filter((Yt) => Yt !== O.optionValue);
      mt.length === 0 ? delete H[O.def.id] : H[O.def.id] = mt, a("update:modelValue", H), a("change", H), c.value === O.def.id && Y(O.def);
    }
    function Q() {
      const O = {};
      a("update:modelValue", O), a("change", O), rt();
    }
    const Ct = D(() => {
      const O = p.value;
      return O ? `Editar filtro: ${O.label}` : "Filtro";
    });
    function Mt(O) {
      const H = O.def.label.replace(/^\+\s*/, "");
      return O.kind === "select" ? `Quitar ${O.def.options.find((Yt) => Yt.value === O.optionValue)?.label ?? O.optionValue} del filtro ${H}` : `Quitar filtro ${H}`;
    }
    function Bt(O) {
      const H = O.def.label.replace(/^\+\s*/, "");
      if (O.kind === "select") {
        const mt = O.def.options.find((Yt) => Yt.value === O.optionValue)?.label ?? O.optionValue;
        return `Editar filtro ${H}: ${mt}`;
      }
      return `Editar filtro ${H}`;
    }
    function pt(O) {
      return `Añadir filtro ${O.label.replace(/^\+\s*/, "")}`;
    }
    const sa = D(() => n.clearLabel);
    function Za(O) {
      if (!u.value || !l.value) return;
      const H = O.target;
      if (!(l.value.contains(H) || (H instanceof Element ? H : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const mt of d.values())
          if (mt?.contains(H)) return;
        X();
      }
    }
    function zt(O) {
      O.key === "Escape" && u.value && (O.preventDefault(), rt());
    }
    function Ja() {
      !u.value || !g.value || et(g.value);
    }
    return te(() => {
      document.addEventListener("mousedown", Za, !0), window.addEventListener("keydown", Qa, !0), window.addEventListener("resize", Ja);
    }), Fo(() => {
      document.removeEventListener("mousedown", Za, !0), window.removeEventListener("keydown", Qa, !0), window.removeEventListener("resize", Ja);
    }), Ft(
      () => n.modelValue,
      () => {
        const O = p.value;
        O && u.value && !s.panel && Y(O);
      },
      { deep: !0 }
    ), (O, H) => (_(), k("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      r("div", Ek, [
        r("span", Ik, A(e.label), 1),
        r("div", Pk, [
          (_(!0), k(q, null, at(e.filterDefinitions, (J) => (_(), k("button", {
            key: `pill-${J.id}`,
            ref_for: !0,
            ref: (mt) => x(J.id, mt),
            type: "button",
            class: W(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", I(J)]),
            "aria-label": V(J),
            "aria-expanded": c.value === J.id,
            "aria-haspopup": !0,
            "aria-controls": c.value === J.id ? i : void 0,
            onClick: (mt) => G(J, mt)
          }, [
            R(F(Bk), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            r("span", Ok, A(J.label), 1),
            J.type === "select" && L(J) > 0 ? (_(), k("span", zk, A(L(J)), 1)) : z("", !0)
          ], 10, Rk))), 128))
        ])
      ]),
      $.value ? (_(), k("div", Vk, [
        r("div", Nk, [
          (_(!0), k(q, null, at(S.value, (J) => (_(), k("div", {
            key: J.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            r("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": Bt(J),
              onClick: (mt) => rt(J.def, mt)
            }, [
              $t(O.$slots, "formatChip", {
                filter: U.def,
                value: x(U.def.id),
                optionValue: U.kind === "select" ? U.optionValue : void 0
              }, () => [
                bt(A(B(J)), 1)
              ], !0)
            ], 8, Wk),
            r("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": Mt(J),
              onClick: (mt) => pt(J)
            }, [
              R(F(Lk), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, Hk)
          ]))), 128))
        ]),
        r("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": sa.value,
          onClick: Q
        }, A(e.clearLabel), 9, jk)
      ])) : z("", !0),
      (_(), tt(Pa, { to: "body" }, [
        c.value && u.value ? (_(), w("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: l,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": X.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: gt(h.value),
          onKeydown: H[3] || (H[3] = ie(() => {
          }, ["stop"]))
        }, [
          p.value ? (_(), k(q, { key: 0 }, [
            O.$slots.panel ? wt(O.$slots, "panel", {
              key: 0,
              filter: p.value,
              close: X,
              value: b.value,
              updateValue: ot
            }, void 0, !0) : (_(), k("div", Kk, [
              p.value.type === "text" ? (_(), k(q, { key: 0 }, [
                r("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, A(p.value.label), 9, qk),
                Kt(r("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": H[0] || (H[0] = (J) => y.value = J),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: p.value.placeholder ?? "…",
                  onKeydown: Hn(ie(X, ["prevent"]), ["enter"])
                }, null, 40, Uk), [
                  [Pe, y.value]
                ])
              ], 64)) : p.value.type === "select" ? (_(), k(q, { key: 1 }, [
                r("p", Xk, A(p.value.label), 1),
                r("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": p.value.label,
                  "aria-multiselectable": !0
                }, [
                  (_(!0), k(q, null, at(p.value.options, (J) => (_(), k("li", {
                    key: J.value
                  }, [
                    r("label", Zk, [
                      r("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: f.value.includes(J.value),
                        onChange: (mt) => tt(J.value)
                      }, null, 40, Qk),
                      r("span", Jk, A(J.label), 1)
                    ])
                  ]))), 128))
                ], 8, Gk)
              ], 64)) : p.value.type === "dateRange" ? (_(), k(q, { key: 2 }, [
                r("p", t2, A(p.value.label), 1),
                r("div", e2, [
                  r("div", n2, [
                    r("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, a2),
                    Kt(r("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": H[1] || (H[1] = (J) => m.value = J),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, s2), [
                      [Pe, m.value]
                    ])
                  ]),
                  r("div", o2, [
                    r("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, i2),
                    Kt(r("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": H[2] || (H[2] = (J) => v.value = J),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, l2), [
                      [Pe, v.value]
                    ])
                  ])
                ])
              ], 64)) : z("", !0)
            ]))
          ], 64)) : z("", !0)
        ], 44, Yk)) : z("", !0)
      ]))
    ], 8, Fk));
  }
}), c2 = /* @__PURE__ */ it(r2, [["__scopeId", "data-v-f38e0100"]]), Qt = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", pe = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", d2 = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", De = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", me = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", u2 = { class: "font-sans" }, h2 = ["for"], f2 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], g2 = ["id"], p2 = /* @__PURE__ */ Z({
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
    const n = e, a = t, s = `kiut-input-text-${Nt()}`, o = D(() => n.id ?? s), i = D(() => `${o.value}-err`), l = D({
      get: () => n.modelValue,
      set: (d) => a("update:modelValue", d)
    });
    return (d, c) => (_(), k("div", u2, [
      e.label ? (_(), k("label", {
        key: 0,
        for: o.value,
        class: W(F(Qt))
      }, A(e.label), 11, h2)) : z("", !0),
      Kt(r("input", {
        id: o.value,
        "onUpdate:modelValue": c[0] || (c[0] = (u) => l.value = u),
        type: "text",
        autocomplete: "off",
        class: W([F(pe), e.invalid ? F(De) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, f2), [
        [Pe, l.value]
      ]),
      e.errorText ? (_(), w("p", {
        key: 1,
        id: i.value,
        class: W(F(me)),
        role: "alert"
      }, A(e.errorText), 11, g2)) : z("", !0)
    ]));
  }
}), m2 = { class: "font-sans" }, b2 = ["for"], v2 = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], y2 = ["id"], _2 = /* @__PURE__ */ Z({
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
    const n = e, a = t, s = `kiut-input-textarea-${Nt()}`, o = D(() => n.id ?? s), i = D(() => `${o.value}-err`), l = D({
      get: () => n.modelValue,
      set: (d) => a("update:modelValue", d)
    });
    return (d, c) => (_(), k("div", m2, [
      e.label ? (_(), k("label", {
        key: 0,
        for: o.value,
        class: W(F(Qt))
      }, A(e.label), 11, b2)) : z("", !0),
      Kt(r("textarea", {
        id: o.value,
        "onUpdate:modelValue": c[0] || (c[0] = (u) => l.value = u),
        rows: e.rows,
        autocomplete: "off",
        class: W([F(d2), e.invalid ? F(De) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, v2), [
        [Pe, l.value]
      ]),
      e.errorText ? (_(), w("p", {
        key: 1,
        id: i.value,
        class: W(F(me)),
        role: "alert"
      }, A(e.errorText), 11, y2)) : z("", !0)
    ]));
  }
}), x2 = { class: "font-sans" }, k2 = ["for"], w2 = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], C2 = ["for"], $2 = ["title"], M2 = ["aria-label"], S2 = ["id"], D2 = /* @__PURE__ */ Z({
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
    const n = e, a = t, s = `kiut-input-file-${Nt()}`, o = D(() => n.id ?? s), i = D(() => `${o.value}-err`), l = st(null), d = D(() => n.modelValue?.name ?? n.placeholder);
    function c(h) {
      const y = h.target.files?.[0] ?? null;
      a("update:modelValue", y);
    }
    function u() {
      a("update:modelValue", null), l.value && (l.value.value = "");
    }
    return (h, g) => (_(), k("div", x2, [
      e.label ? (_(), k("label", {
        key: 0,
        for: o.value,
        class: W(F(Qt))
      }, A(e.label), 11, k2)) : z("", !0),
      r("div", {
        class: W([
          F(pe),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? F(Ee) : "",
          e.disabled ? "pointer-events-none" : ""
        ])
      }, [
        r("input", {
          id: o.value,
          ref_key: "fileInputRef",
          ref: l,
          type: "file",
          class: "sr-only focus:outline-none focus:ring-0",
          name: e.name,
          accept: e.accept,
          disabled: e.disabled,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onChange: c
        }, null, 40, w2),
        r("label", {
          for: o.value,
          class: W(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          R(F(Ng), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          bt(" " + A(e.chooseLabel), 1)
        ], 10, C2),
        r("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: d.value || void 0
        }, A(d.value), 9, $2),
        e.modelValue && !e.disabled ? (_(), k("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: u
        }, [
          R(F(ji), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, M2)) : z("", !0)
      ], 2),
      e.errorText ? (_(), w("p", {
        key: 1,
        id: i.value,
        class: W(F(me)),
        role: "alert"
      }, A(e.errorText), 11, S2)) : z("", !0)
    ]));
  }
}), A2 = { class: "font-sans" }, T2 = ["for"], B2 = { class: "relative" }, L2 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], F2 = ["id"], E2 = /* @__PURE__ */ Z({
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
    const n = e, a = t, s = `kiut-input-datetime-${Nt()}`, o = D(() => n.id ?? s), i = D(() => `${o.value}-err`), l = D(() => n.modelValue ?? "");
    function d(c) {
      const u = c.target.value;
      a("update:modelValue", u === "" ? null : u);
    }
    return (c, u) => (_(), k("div", A2, [
      e.label ? (_(), k("label", {
        key: 0,
        for: o.value,
        class: W(F(Qt))
      }, A(e.label), 11, T2)) : z("", !0),
      r("div", B2, [
        R(F(Ti), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        r("input", {
          id: o.value,
          value: l.value,
          type: "datetime-local",
          autocomplete: "off",
          class: W([
            F(pe),
            "pl-10",
            e.invalid ? F(Ee) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onInput: d
        }, null, 42, L2)
      ]),
      e.errorText ? (_(), w("p", {
        key: 1,
        id: i.value,
        class: W(F(me)),
        role: "alert"
      }, A(e.errorText), 11, F2)) : z("", !0)
    ]));
  }
}), I2 = { class: "font-sans" }, P2 = ["for"], R2 = { class: "relative" }, O2 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], z2 = ["id"], V2 = /* @__PURE__ */ Z({
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
    function n(h) {
      const g = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(h.trim());
      if (!g) return null;
      const y = Number(g[1]), f = Number(g[2]);
      return !Number.isInteger(y) || !Number.isInteger(f) || y < 0 || y > 23 || f < 0 || f > 59 ? null : `${String(y).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
    }
    function a(h) {
      return h === "" ? null : n(h);
    }
    const s = e, o = t, i = `kiut-input-time-${Nt()}`, l = D(() => s.id ?? i), d = D(() => `${l.value}-err`), c = D(() => s.modelValue == null || s.modelValue === "" ? "" : n(s.modelValue) ?? "");
    function u(h) {
      const g = h.target.value;
      o("update:modelValue", a(g));
    }
    return (h, g) => (_(), k("div", I2, [
      e.label ? (_(), k("label", {
        key: 0,
        for: l.value,
        class: W(F(Qt))
      }, A(e.label), 11, P2)) : z("", !0),
      r("div", R2, [
        R(F(Yg), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        r("input", {
          id: l.value,
          value: c.value,
          type: "time",
          autocomplete: "off",
          class: W([
            F(pe),
            "pl-10",
            e.invalid ? F(Ee) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? d.value : void 0,
          onInput: u
        }, null, 42, O2)
      ]),
      e.errorText ? (_(), w("p", {
        key: 1,
        id: d.value,
        class: W(F(me)),
        role: "alert"
      }, A(e.errorText), 11, z2)) : z("", !0)
    ]));
  }
}), N2 = { class: "font-sans" }, W2 = ["for"], H2 = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, j2 = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], Y2 = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, K2 = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, q2 = { class: "min-w-0 text-left leading-snug" }, U2 = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, X2 = { class: "min-w-0 text-right leading-snug" }, G2 = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Z2 = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Q2 = ["id"], J2 = /* @__PURE__ */ Z({
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
    const n = e, a = t, s = `kiut-input-range-${Nt()}`, o = D(() => n.id ?? s), i = D(() => `${o.value}-err`), l = D(() => {
      const y = [];
      return n.errorText && y.push(i.value), y.length ? y.join(" ") : void 0;
    }), d = D(
      () => !!(n.caption && !n.captionMin && !n.captionMax)
    ), c = D(() => !!(n.captionMin || n.captionMax)), u = D(() => {
      const { min: y, max: f, modelValue: m } = n;
      if (f === y) return 0;
      const v = (m - y) / (f - y);
      return Math.min(100, Math.max(0, v * 100));
    }), h = D(() => ({
      "--kiut-range-fill": `${u.value}%`,
      "--kiut-range-length": n.trackLength
    }));
    function g(y) {
      const f = Number(y.target.value);
      a("update:modelValue", Number.isNaN(f) ? n.min : f);
    }
    return (y, f) => (_(), k("div", N2, [
      e.label ? (_(), k("label", {
        key: 0,
        for: o.value,
        class: W(F(Qt))
      }, A(e.label), 11, W2)) : z("", !0),
      r("div", {
        class: W(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (_(), k("p", H2, A(e.captionMax), 1)) : z("", !0),
        r("div", {
          class: W(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: gt(h.value)
        }, [
          r("input", {
            id: o.value,
            type: "range",
            value: e.modelValue,
            min: e.min,
            max: e.max,
            step: e.step,
            disabled: e.disabled,
            "aria-orientation": e.orientation,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": l.value,
            class: W([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: g
          }, null, 42, j2)
        ], 6),
        e.orientation === "horizontal" && d.value ? (_(), k("p", Y2, A(e.caption), 1)) : e.orientation === "horizontal" && c.value ? (_(), k("div", K2, [
          r("span", q2, A(e.captionMin), 1),
          r("span", U2, A(e.caption), 1),
          r("span", X2, A(e.captionMax), 1)
        ])) : z("", !0),
        e.orientation === "vertical" && e.captionMin ? (_(), k("p", G2, A(e.captionMin), 1)) : z("", !0),
        e.orientation === "vertical" && e.caption ? (_(), k("p", Z2, A(e.caption), 1)) : z("", !0)
      ], 2),
      e.errorText ? (_(), w("p", {
        key: 1,
        id: i.value,
        class: W(F(me)),
        role: "alert"
      }, A(e.errorText), 11, Q2)) : z("", !0)
    ]));
  }
}), tw = /* @__PURE__ */ it(J2, [["__scopeId", "data-v-a1343418"]]), ew = { class: "font-sans" }, nw = ["for"], aw = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], sw = ["id"], ow = /* @__PURE__ */ Z({
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
    const n = e, a = t, s = `kiut-input-number-${Nt()}`, o = D(() => n.id ?? s), i = D(() => `${o.value}-err`), l = D(() => {
      switch (n.align) {
        case "start":
          return "text-start";
        case "end":
          return "text-end";
        default:
          return "text-center";
      }
    }), d = D(
      () => n.modelValue === null || n.modelValue === void 0 ? "" : String(n.modelValue)
    );
    function c(u) {
      const h = u.target.value;
      if (h === "") {
        a("update:modelValue", null);
        return;
      }
      const g = Number(h);
      a("update:modelValue", Number.isNaN(g) ? null : g);
    }
    return (u, h) => (_(), k("div", ew, [
      e.label ? (_(), k("label", {
        key: 0,
        for: o.value,
        class: W(F(Qt))
      }, A(e.label), 11, nw)) : z("", !0),
      r("input", {
        id: o.value,
        value: d.value,
        type: "number",
        onInput: c,
        class: W([
          F(pe),
          e.invalid ? F(De) : "",
          l.value,
          "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        ]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        min: e.min,
        max: e.max,
        step: e.step,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 42, aw),
      e.errorText ? (_(), k("p", {
        key: 1,
        id: i.value,
        class: W(F(me)),
        role: "alert"
      }, A(e.errorText), 11, sw)) : z("", !0)
    ]));
  }
}), iw = { class: "font-sans" }, lw = ["for"], rw = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], cw = ["disabled"], dw = ["id"], uw = "#3b82f6", hw = "#aabbcc", fw = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", gw = /* @__PURE__ */ Z({
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
    function n(p) {
      const b = p.trim(), v = /^#?([0-9a-fA-F]{6})$/.exec(b);
      if (v) return `#${v[1].toLowerCase()}`;
      const p = /^#?([0-9a-fA-F]{3})$/.exec(m);
      if (p) {
        const [b, x, w] = p[1].split("");
        return `#${b}${b}${x}${x}${w}${w}`.toLowerCase();
      }
      return null;
    }
    function a(f) {
      return n(f) ?? uw;
    }
    const s = e, o = t, i = `kiut-input-color-${Nt()}`, l = D(() => s.id ?? i), d = D(() => `${l.value}-err`), c = D(() => a(s.modelValue)), u = st(c.value), h = st(!1);
    Ft(c, (f) => {
      h.value || (u.value = f);
    });
    function g(f) {
      const m = f.target, v = n(m.value);
      v && o("update:modelValue", v);
    }
    function y() {
      h.value = !1;
      const p = n(u.value);
      p ? (u.value = p, s("update:modelValue", p)) : u.value = c.value;
    }
    return Ft(u, (f) => {
      if (!h.value) return;
      const m = n(f);
      m && o("update:modelValue", m);
    }), (f, m) => (_(), k("div", iw, [
      e.label ? (_(), k("label", {
        key: 0,
        for: l.value,
        class: W(F(Qt))
      }, A(e.label), 11, lw)) : z("", !0),
      r("div", {
        class: W([
          fw,
          e.invalid ? F(De) : "",
          e.disabled ? "cursor-not-allowed opacity-50" : ""
        ])
      }, [
        r("input", {
          id: l.value,
          type: "color",
          value: c.value,
          disabled: e.disabled,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? d.value : void 0,
          class: "h-9 w-11 shrink-0 cursor-pointer rounded-lg border border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-0.5 shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/35 disabled:cursor-not-allowed dark:border-slate-600 dark:bg-slate-800/80",
          onInput: g
        }, null, 40, rw),
        e.showHexInput ? Kt((_(), k("input", {
          key: 0,
          "onUpdate:modelValue": b[0] || (b[0] = (v) => u.value = v),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: hw,
          onFocus: m[1] || (m[1] = (v) => h.value = !0),
          onBlur: y
        }, null, 40, cw)), [
          [Pe, u.value]
        ]) : z("", !0)
      ], 2),
      e.errorText ? (_(), w("p", {
        key: 1,
        id: d.value,
        class: W(F(me)),
        role: "alert"
      }, A(e.errorText), 11, dw)) : z("", !0)
    ]));
  }
});
function tl(e, t) {
  return _(), w("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    r("path", {
      "fill-rule": "evenodd",
      d: "M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z",
      "clip-rule": "evenodd"
    })
  ]);
}
const pw = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], mw = ["aria-selected", "onClick", "onMouseenter"], bw = {
  key: 0,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, vw = { class: "min-w-0 flex-1" }, Hi = /* @__PURE__ */ Z({
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
    const n = e, a = t, s = `kiut-select-${Nt()}`, o = `${s}-label`, i = `${s}-btn`, l = `${s}-listbox`, d = st(null), c = st(null), u = st(null), h = st(!1), g = st(0), y = st({});
    function f() {
      const B = c.value;
      if (!B) return;
      const E = B.getBoundingClientRect();
      y.value = {
        top: `${E.bottom - 3}px`,
        left: `${E.left}px`,
        width: `${E.width}px`
      };
    }
    const m = D(() => n.options.filter((B) => !B.disabled)), v = D(
      () => n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opción"
    ), p = D(() => n.modelValue === null || n.modelValue === void 0 || n.modelValue === "" ? n.placeholder : n.options.find((E) => E.value === n.modelValue)?.label ?? String(n.modelValue));
    function b(B) {
      return `${String(B.value)}-${B.label}`;
    }
    function x(B) {
      return n.modelValue === B.value;
    }
    function w(B, E) {
      const I = x(B), V = g.value === E;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        I ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !I && V ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function M(B) {
      a("update:modelValue", B.value), h.value = !1;
    }
    function C() {
      n.disabled || (h.value = !h.value);
    }
    function $(B) {
      if (B.stopPropagation(), !n.disabled && (C(), h.value)) {
        f();
        const E = Math.max(
          0,
          b.value.findIndex((I) => I.value === n.modelValue)
        );
        g.value = E, Et(() => u.value?.focus());
      }
    }
    function S(B) {
      if (!h.value) return;
      const E = B.target, I = d.value, V = u.value;
      I && !I.contains(E) && (!V || !V.contains(E)) && (h.value = !1);
    }
    function L(B) {
      n.disabled || (B.key === "ArrowDown" || B.key === "Enter" || B.key === " ") && (B.preventDefault(), h.value || (h.value = !0, f(), g.value = Math.max(
        0,
        m.value.findIndex((E) => E.value === n.modelValue)
      ), Et(() => u.value?.focus())));
    }
    function T(B) {
      const E = m.value;
      if (E.length !== 0) {
        if (B.key === "Escape") {
          B.preventDefault(), h.value = !1;
          return;
        }
        if (B.key === "ArrowDown") {
          B.preventDefault(), g.value = Math.min(g.value + 1, E.length - 1);
          return;
        }
        if (B.key === "ArrowUp") {
          B.preventDefault(), g.value = Math.max(g.value - 1, 0);
          return;
        }
        if (B.key === "Enter") {
          B.preventDefault();
          const I = E[g.value];
          I && M(I);
        }
      }
    }
    return ie(() => {
      document.addEventListener("click", S);
    }), Me(() => {
      document.removeEventListener("click", S);
    }), (B, E) => (_(), k("div", {
      ref_key: "rootRef",
      ref: d,
      class: "relative font-sans"
    }, [
      e.label ? (_(), w("label", {
        key: 0,
        id: o,
        class: W(F(Qt))
      }, A(e.label), 3)) : z("", !0),
      r("button", {
        ref_key: "buttonRef",
        ref: c,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: W([
          F(pe),
          "flex items-center justify-between gap-2 text-left",
          h.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": h.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : v.value,
        onClick: $,
        onKeydown: L
      }, [
        r("span", {
          class: W([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, A(p.value), 3),
        R(F(Bi), {
          class: W(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", h.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, pw),
      (_(), nt(Ta, { to: "body" }, [
        Kt(r("ul", {
          id: l,
          ref_key: "listRef",
          ref: u,
          role: "listbox",
          tabindex: "-1",
          style: gt(y.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          onKeydown: ie(T, ["stop"])
        }, [
          (_(!0), k(q, null, at(m.value, (I, V) => (_(), k("li", {
            key: b(I),
            role: "option",
            "aria-selected": x(I),
            class: W(w(I, V)),
            onClick: ie((Y) => M(I), ["stop"]),
            onMouseenter: (Y) => g.value = V
          }, [
            e.showOptionCheck ? (_(), k("span", bw, [
              x(I) ? (_(), nt(F(Wi), {
                key: 0,
                class: "h-4 w-4 text-white"
              })) : z("", !0)
            ])) : z("", !0),
            r("span", vw, A(I.label), 1)
          ], 42, mw))), 128))
        ], 36), [
          [_n, h.value]
        ])
      ]))
    ], 512));
  }
}), yw = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], _w = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, xw = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, kw = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, ww = { class: "truncate" }, Cw = ["aria-selected", "onClick", "onMouseenter"], $w = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, Mw = { class: "min-w-0 flex-1" }, Sw = /* @__PURE__ */ Z({
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
    const n = e, a = t, s = `kiut-multiselect-${Nt()}`, o = `${s}-label`, i = `${s}-btn`, l = `${s}-listbox`, d = st(null), c = st(null), u = st(!1), h = st(0), g = D(() => n.options.filter((T) => !T.disabled)), y = D(() => new Set(n.modelValue ?? [])), f = D(
      () => n.options.filter((T) => y.value.has(T.value))
    ), m = D(() => {
      const T = n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opciones", B = f.value.length;
      return B === 0 ? T : `${T}, ${B} seleccionada${B === 1 ? "" : "s"}`;
    });
    function v(T) {
      return `${String(T.value)}-${T.label}`;
    }
    function p(T) {
      return y.value.has(T.value);
    }
    function b(T, B) {
      const E = p(T), I = h.value === B;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        E ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !E && I ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function x(T) {
      const B = [...n.modelValue ?? []], E = B.indexOf(T.value);
      E >= 0 ? B.splice(E, 1) : B.push(T.value), a("update:modelValue", B);
    }
    function w() {
      const T = g.value;
      if (T.length === 0) {
        h.value = 0;
        return;
      }
      const B = y.value, E = T.findIndex((I) => B.has(I.value));
      h.value = E >= 0 ? E : 0;
    }
    function M() {
      n.disabled || (u.value = !u.value);
    }
    function C(T) {
      T.stopPropagation(), !n.disabled && (M(), u.value && (w(), Et(() => c.value?.focus())));
    }
    function $(T) {
      if (!u.value) return;
      const B = d.value;
      B && !B.contains(T.target) && (u.value = !1);
    }
    function S(T) {
      n.disabled || (T.key === "ArrowDown" || T.key === "Enter" || T.key === " ") && (T.preventDefault(), u.value || (u.value = !0, w(), Et(() => c.value?.focus())));
    }
    function L(T) {
      const B = g.value;
      if (B.length !== 0) {
        if (T.key === "Escape") {
          T.preventDefault(), u.value = !1;
          return;
        }
        if (T.key === "ArrowDown") {
          T.preventDefault(), h.value = Math.min(h.value + 1, B.length - 1);
          return;
        }
        if (T.key === "ArrowUp") {
          T.preventDefault(), h.value = Math.max(h.value - 1, 0);
          return;
        }
        if (T.key === "Enter" || T.key === " ") {
          T.preventDefault();
          const E = B[h.value];
          E && x(E);
        }
      }
    }
    return ie(() => {
      document.addEventListener("click", $);
    }), Me(() => {
      document.removeEventListener("click", $);
    }), (T, B) => (_(), k("div", {
      ref_key: "rootRef",
      ref: d,
      class: "relative font-sans"
    }, [
      e.label ? (_(), w("label", {
        key: 0,
        id: o,
        class: W(F(Qt))
      }, A(e.label), 3)) : z("", !0),
      r("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: W([
          F(pe),
          "flex items-start justify-between gap-2 text-left",
          u.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": u.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : m.value,
        onClick: C,
        onKeydown: S
      }, [
        r("div", _w, [
          f.value.length === 0 ? (_(), k("span", xw, A(e.placeholder), 1)) : (_(), k("div", kw, [
            (_(!0), k(q, null, at(f.value, (E) => (_(), k("span", {
              key: v(E),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              r("span", ww, A(E.label), 1)
            ]))), 128))
          ]))
        ]),
        R(F(Bi), {
          class: W(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", u.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, yw),
      Kt(r("ul", {
        id: l,
        ref_key: "listRef",
        ref: c,
        role: "listbox",
        tabindex: "-1",
        "aria-multiselectable": "true",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: ue(L, ["stop"])
      }, [
        (_(!0), k(q, null, at(g.value, (E, I) => (_(), k("li", {
          key: v(E),
          role: "option",
          "aria-selected": p(E),
          class: W(b(E, I)),
          onClick: ie((V) => x(E), ["stop"]),
          onMouseenter: (V) => h.value = I
        }, [
          r("span", $w, [
            p(E) ? (_(), nt(F(Wi), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : z("", !0)
          ]),
          r("span", Mw, A(E.label), 1)
        ], 42, Cw))), 128))
      ], 544), [
        [_n, u.value]
      ])
    ], 512));
  }
}), Dw = ["id", "aria-checked", "aria-disabled", "disabled", "onKeydown"], Aw = { class: "sr-only" }, Tw = /* @__PURE__ */ Z({
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
    const n = e, a = t;
    function o() {
      n.disabled || a("update:modelValue", !n.modelValue);
    }
    return (s, i) => (_(), w("button", {
      id: e.id,
      type: "button",
      role: "switch",
      "aria-checked": e.modelValue,
      "aria-disabled": e.disabled ? "true" : void 0,
      disabled: e.disabled,
      class: W([
        "relative inline-flex h-8 w-[3.75rem] shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-sm transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        e.modelValue ? "bg-[color:var(--kiut-primary)]" : "bg-[#DEDEE3] dark:bg-slate-600"
      ]),
      onClick: o,
      onKeydown: [
        Un(ue(o, ["prevent", "stop"]), ["space"]),
        Un(ue(o, ["prevent"]), ["enter"])
      ]
    }, [
      r("span", {
        class: W(["pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", e.modelValue ? "translate-x-7" : "translate-x-0"]),
        "aria-hidden": "true"
      }, null, 2),
      r("span", Aw, A(e.ariaLabel), 1)
    ], 42, Dw));
  }
}), Bw = { class: "font-sans" }, Lw = ["for"], Fw = { class: "flex gap-2" }, Ew = { class: "w-[7.5rem] shrink-0" }, Iw = { class: "min-w-0 flex-1" }, Pw = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], Rw = ["id"], Ow = /* @__PURE__ */ Z({
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
    const n = e, a = t, s = `kiut-phone-${Nt()}`, o = D(() => n.id ?? `${s}-num`), i = D(() => `${o.value}-err`), l = D({
      get: () => n.modelValue.prefix,
      set: (c) => a("update:modelValue", { ...n.modelValue, prefix: c })
    }), d = D({
      get: () => n.modelValue.number,
      set: (c) => a("update:modelValue", { ...n.modelValue, number: c })
    });
    return (c, u) => (_(), k("div", Bw, [
      e.label ? (_(), k("label", {
        key: 0,
        for: o.value,
        class: W(F(Qt))
      }, A(e.label), 11, Lw)) : z("", !0),
      r("div", Fw, [
        r("div", Ew, [
          R(Hi, {
            modelValue: l.value,
            "onUpdate:modelValue": u[0] || (u[0] = (h) => l.value = h),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        r("div", Iw, [
          Kt(r("input", {
            id: o.value,
            "onUpdate:modelValue": u[1] || (u[1] = (h) => d.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: W([F(pe), e.invalid ? F(De) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, Pw), [
            [Pe, d.value]
          ])
        ])
      ]),
      e.errorText ? (_(), w("p", {
        key: 1,
        id: i.value,
        class: W(F(me)),
        role: "alert"
      }, A(e.errorText), 11, Rw)) : z("", !0)
    ]));
  }
}), zw = ["role", "aria-label"], Vw = { class: "flex flex-wrap gap-2" }, Nw = ["aria-checked", "role", "onClick"], Ww = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, Hw = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, jw = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, Yw = /* @__PURE__ */ Z({
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
    const n = e, a = t, s = D(() => n.multiple ? Array.isArray(n.modelValue) ? n.modelValue : [] : []);
    function o(d) {
      return n.multiple ? s.value.includes(d.value) : n.modelValue === d.value;
    }
    function i(d) {
      return [
        "inline-flex max-w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        s(d) ? "border-[color:var(--kiut-primary)]/50 bg-violet-50/80 dark:bg-violet-950/30" : "border-gray-300 bg-white dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]"
      ];
    }
    function l(d) {
      if (n.multiple) {
        const c = Array.isArray(n.modelValue) ? [...n.modelValue] : [], u = c.indexOf(d.value);
        u >= 0 ? c.splice(u, 1) : c.push(d.value), a("update:modelValue", c);
        return;
      }
      a("update:modelValue", d.value);
    }
    return (d, c) => (_(), w("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      r("div", Vw, [
        (_(!0), k(q, null, at(e.items, (u) => (_(), k("button", {
          key: u.value,
          type: "button",
          class: W(i(u)),
          "aria-checked": o(u),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => l(u)
        }, [
          r("span", Ww, [
            o(u) ? (_(), k("span", Hw)) : z("", !0)
          ]),
          u.dotColor ? (_(), w("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: gt({ backgroundColor: u.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : z("", !0),
          r("span", jw, A(u.label), 1)
        ], 10, Nw))), 128))
      ])
    ], 8, zw));
  }
}), Kw = ["aria-label"], qw = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], Uw = { class: "truncate px-3 py-2 text-sm font-medium" }, Xw = /* @__PURE__ */ Z({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = `kiut-seg-${Nt()}`, o = (m) => `${s}-seg-${m}`, i = st([]);
    function l(m, v) {
      m instanceof HTMLButtonElement ? i.value[v] = m : i.value[v] = null;
    }
    function d(b) {
      return b.value === n.modelValue;
    }
    function c(m) {
      const v = d(m), p = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return m.disabled ? `${p} cursor-not-allowed opacity-40` : v ? `${p} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${p} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function u(b) {
      b.disabled || b.value !== n.modelValue && a("update:modelValue", b.value);
    }
    function h(m, v, p) {
      u(m), Et(() => i.value[v]?.focus());
    }
    const g = D(
      () => n.items.map((m, v) => m.disabled ? -1 : v).filter((m) => m >= 0)
    );
    function y(m, v) {
      const p = n.items.length;
      if (p === 0) return 0;
      let b = m;
      for (let x = 0; x < p; x++)
        if (b = (b + v + p) % p, !n.items[b]?.disabled) return b;
      return m;
    }
    function f(m, v) {
      if (m.key === "ArrowRight" || m.key === "ArrowDown") {
        m.preventDefault();
        const p = y(v, 1), b = n.items[p];
        b && u(b), Et(() => i.value[p]?.focus());
      } else if (m.key === "ArrowLeft" || m.key === "ArrowUp") {
        m.preventDefault();
        const p = y(v, -1), b = n.items[p];
        b && u(b), Et(() => i.value[p]?.focus());
      } else if (m.key === "Home") {
        m.preventDefault();
        const p = g.value[0];
        if (p !== void 0) {
          const b = n.items[p];
          b && u(b), Et(() => i.value[p]?.focus());
        }
      } else if (m.key === "End") {
        m.preventDefault();
        const p = g.value[g.value.length - 1];
        if (p !== void 0) {
          const b = n.items[p];
          b && u(b), Et(() => i.value[p]?.focus());
        }
      }
    }
    return (b, v) => (_(), w("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (_(!0), k(q, null, at(e.items, (p, b) => (_(), k("button", {
        id: o(p.value),
        key: p.value,
        ref_for: !0,
        ref: (x) => l(x, b),
        type: "button",
        role: "tab",
        "aria-selected": d(p),
        "aria-disabled": p.disabled === !0,
        tabindex: d(p) ? 0 : -1,
        class: W(c(p)),
        onClick: (x) => h(p, b),
        onKeydown: (x) => f(x, b)
      }, [
        r("span", Uw, A(p.label), 1)
      ], 42, qw))), 128))
    ], 8, Kw));
  }
});
function Oe(e) {
  const [t, n, a] = e.split("-").map(Number);
  return new Date(t, n - 1, a);
}
function ln(e) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), a = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${a}`;
}
function ve(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function Ca(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function So(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function ra(e, t) {
  const n = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), a = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return n < a ? -1 : n > a ? 1 : 0;
}
function Rs(e, t) {
  return ra(e, t) === 0;
}
function $a(e, t) {
  return ra(e, t) < 0;
}
function Gw(e, t) {
  return aa(e, t) >= 0;
}
function Zw(e, t) {
  return aa(e, t) <= 0;
}
function Qw(e) {
  const t = e.getFullYear(), n = e.getMonth(), a = new Date(t, n, 1), s = new Date(a);
  s.setDate(a.getDate() - a.getDay());
  const o = [], i = new Date(s);
  for (let l = 0; l < 42; l++)
    o.push(new Date(i)), i.setDate(i.getDate() + 1);
  return o;
}
const Jw = [
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
], t5 = [
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
function Ao(e) {
  return `${Jw[e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function To(e) {
  return `${t5[e.getMonth()]} ${e.getFullYear()}`;
}
const e5 = ["aria-expanded", "aria-labelledby", "aria-label"], n5 = ["onKeydown"], a5 = { class: "mb-4 flex items-center justify-between gap-2" }, s5 = { class: "flex min-w-0 flex-1 justify-center gap-8 text-center text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, o5 = { class: "min-w-0 truncate" }, i5 = { class: "min-w-0 truncate" }, l5 = { class: "flex flex-col gap-6 sm:flex-row sm:gap-8" }, r5 = { class: "mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-wide text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, c5 = { class: "grid grid-cols-7 gap-y-1" }, d5 = ["disabled", "onClick"], u5 = /* @__PURE__ */ Z({
  name: "DateRangePicker",
  __name: "DateRangePicker",
  props: {
    modelValue: {},
    label: {},
    placeholder: { default: "Seleccionar fechas" },
    ariaLabel: {},
    minDate: {},
    maxDate: {},
    panelAlign: { default: "start" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = `${`kiut-drp-${Nt()}`}-lbl`, i = st(null), l = st(null), d = st(!1), c = st(null), u = st(va(/* @__PURE__ */ new Date())), h = D(() => {
      const S = va(u.value);
      return [S, So(S, 1)];
    }), g = D(() => n.ariaLabel ?? n.placeholder), y = D(
      () => n.panelAlign === "end" ? "right-0 left-auto" : "left-0 right-auto"
    ), f = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], m = D(() => {
      if (!n.modelValue.start || !n.modelValue.end) return n.placeholder;
      const S = Oe(n.modelValue.start), L = Oe(n.modelValue.end);
      return `${Os(S)} – ${Os(L)}`;
    });
    function v(S, L) {
      return S.getMonth() === L.getMonth() && S.getFullYear() === L.getFullYear();
    }
    function p(S) {
      const L = ve(S);
      if (n.minDate) {
        const T = ve(Le(n.minDate));
        if (ya(L, T)) return !0;
      }
      if (n.maxDate) {
        const T = ve(Le(n.maxDate));
        if (ya(T, L)) return !0;
      }
      return !1;
    }
    function b(S, L) {
      const T = v(L, S), B = n.modelValue.start ? ve(Le(n.modelValue.start)) : null, E = n.modelValue.end ? ve(Le(n.modelValue.end)) : null, I = ve(L), V = T ? "text-[color:var(--kiut-text-primary)] dark:text-slate-100" : "text-slate-400 dark:text-slate-500";
      if (!B || !E)
        return `${V} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
      const Y = Gw(I, B) && Zw(I, E), N = Do(I, B), tt = Do(I, E);
      return N || tt ? "bg-[color:var(--kiut-primary)] font-semibold text-white shadow-sm" : Y ? `${V} bg-violet-100/90 dark:bg-violet-950/35 hover:bg-violet-200/80 dark:hover:bg-violet-900/40` : `${V} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
    }
    function x(S) {
      if (p(S)) return;
      const L = ve(S);
      if (!c.value) {
        c.value = new Date(L), a("update:modelValue", { start: ln(L), end: ln(L) });
        return;
      }
      let B = ve(c.value), E = new Date(L);
      ya(E, B) && ([B, E] = [E, B]), a("update:modelValue", { start: ln(B), end: ln(E) }), c.value = null, d.value = !1;
    }
    function w(S) {
      u.value = So(u.value, S);
    }
    function M() {
      d.value = !1;
    }
    function C(S) {
      if (S?.stopPropagation(), !d.value) {
        if (d.value = !0, c.value = null, n.modelValue.start)
          try {
            u.value = Ca(Oe(n.modelValue.start));
          } catch {
          }
        Et(() => l.value?.focus());
      }
    }
    function $(S) {
      if (!d.value) return;
      const L = i.value;
      L && !L.contains(S.target) && (d.value = !1);
    }
    return Ft(d, (S) => {
      S && (c.value = null);
    }), ie(() => {
      document.addEventListener("click", $);
    }), Me(() => {
      document.removeEventListener("click", $);
    }), (S, L) => (_(), w("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (_(), w("label", {
        key: 0,
        id: o,
        class: W(F(Qt))
      }, A(e.label), 3)) : z("", !0),
      r("button", {
        type: "button",
        class: W([F(pe), "flex w-full items-center gap-2 text-left"]),
        "aria-expanded": d.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : g.value,
        onFocus: C,
        onClick: C
      }, [
        R(F(Ni), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        r("span", {
          class: W([
            "min-w-0 flex-1 truncate",
            !e.modelValue.start || !e.modelValue.end ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, A(m.value), 3)
      ], 42, e5),
      Kt(r("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: W([
          y.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[100vw] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] p-4 shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Hn(ie(M, ["stop"]), ["escape"])
      }, [
        r("div", a5, [
          r("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes anterior",
            onClick: L[0] || (L[0] = (T) => w(-1))
          }, [
            R(F(lp), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ]),
          r("div", s5, [
            r("span", o5, A(F(To)(h.value[0])), 1),
            r("span", i5, A(F(To)(h.value[1])), 1)
          ]),
          r("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes siguiente",
            onClick: L[1] || (L[1] = (T) => w(1))
          }, [
            R(F(jg), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ])
        ]),
        r("div", l5, [
          (_(!0), k(q, null, at(h.value, (T) => (_(), k("div", {
            key: `${T.getFullYear()}-${T.getMonth()}`,
            class: "min-w-0 flex-1"
          }, [
            r("div", r5, [
              (_(), k(q, null, at(f, (B) => r("span", { key: B }, A(B), 1)), 64))
            ]),
            r("div", c5, [
              (_(!0), k(q, null, at(F(Qw)(T), (B) => (_(), k("button", {
                key: F(ln)(B),
                type: "button",
                disabled: p(B),
                class: W(["relative flex h-9 items-center justify-center rounded-lg text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", b(T, B)]),
                onClick: (E) => x(B)
              }, A(B.getDate()), 11, d5))), 128))
            ])
          ]))), 128))
        ])
      ], 42, n5), [
        [mn, d.value]
      ])
    ], 512));
  }
}), h5 = {
  key: 0,
  class: "group relative inline-flex shrink-0"
}, f5 = ["type", "disabled", "aria-label"], g5 = {
  key: 1,
  class: "min-w-0 truncate"
}, p5 = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, m5 = ["type", "disabled", "aria-label"], b5 = {
  key: 1,
  class: "min-w-0 truncate"
}, Wn = /* @__PURE__ */ Z({
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
    const t = e, n = Eo(), a = D(() => !!t.tooltip?.trim()), s = D(() => t.variant === "action"), o = D(() => !s.value), i = D(() => {
      const u = n["aria-label"];
      if (typeof u == "string" && u.length > 0) return u;
      if (s.value && t.tooltip?.trim()) return t.tooltip.trim();
    }), l = D(() => {
      const u = n.type;
      return u === "submit" || u === "reset" || u === "button" ? u : "button";
    }), d = D(() => {
      const { class: u, type: h, "aria-label": g, ...y } = n;
      return y;
    }), c = D(() => t.variant === "primary" ? [
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
    return (u, h) => a.value ? (_(), k("span", h5, [
      r("button", jn({
        type: l.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [c.value, F(n).class]],
        disabled: e.disabled,
        "aria-label": i.value
      }, d.value), [
        u.$slots.icon ? (_(), w("span", {
          key: 0,
          class: W(["inline-flex shrink-0", s.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          $t(u.$slots, "icon")
        ], 2)) : z("", !0),
        o.value ? (_(), k("span", g5, [
          wt(u.$slots, "default")
        ])) : z("", !0)
      ], 16, f5),
      r("span", p5, A(e.tooltip), 1)
    ])) : (_(), k("button", jn({
      key: 1,
      type: l.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [c.value, F(n).class]],
      disabled: e.disabled,
      "aria-label": i.value
    }, d.value), [
      u.$slots.icon ? (_(), w("span", {
        key: 0,
        class: W(["inline-flex shrink-0", s.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        $t(u.$slots, "icon")
      ], 2)) : z("", !0),
      o.value ? (_(), k("span", b5, [
        wt(u.$slots, "default")
      ])) : z("", !0)
    ], 16, m5));
  }
}), v5 = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, y5 = { class: "min-w-0 flex-1 space-y-1" }, _5 = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, x5 = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, k5 = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, w5 = /* @__PURE__ */ Z({
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
    const n = e, a = t, o = `${`kiut-modal-${Nt()}`}-title`, i = st(null);
    function l() {
      a("cancel"), a("update:modelValue", !1);
    }
    function d() {
      a("confirm");
    }
    function c(u) {
      n.modelValue && u.key === "Escape" && (u.preventDefault(), l());
    }
    return Ft(
      () => n.modelValue,
      (u) => {
        u && requestAnimationFrame(() => {
          i.value?.focus({ preventScroll: !0 });
        });
      }
    ), ie(() => {
      document.addEventListener("keydown", c);
    }), Me(() => {
      document.removeEventListener("keydown", c);
    }), (u, h) => (_(), tt(Pa, { to: "body" }, [
      R(pn, { name: "kiut-modal" }, {
        default: P(() => [
          e.modelValue ? (_(), k("div", v5, [
            r("div", {
              class: "absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] dark:bg-black/60",
              "aria-hidden": "true",
              onClick: l
            }),
            r("div", {
              ref_key: "panelRef",
              ref: i,
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": s,
              tabindex: "-1",
              class: "kiut-modal-panel relative z-10 flex max-h-[min(90vh,880px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] shadow-[var(--kiut-shadow-card)] dark:bg-[#252528] dark:shadow-black/40",
              onClick: h[0] || (h[0] = ue(() => {
              }, ["stop"]))
            }, [
              r("header", {
                class: W(["flex shrink-0 justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.02]", e.subtitle ? "items-start" : "items-center"])
              }, [
                r("div", y5, [
                  r("h2", {
                    id: o,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, A(e.title), 1),
                  e.subtitle ? (_(), k("p", _5, A(e.subtitle), 1)) : z("", !0)
                ]),
                R(qn, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  onClick: l
                }, {
                  icon: P(() => [
                    R(F(ji), { class: "h-5 w-5" })
                  ]),
                  _: 1
                })
              ], 2),
              r("div", x5, [
                wt(u.$slots, "default", {}, void 0, !0)
              ]),
              r("footer", k5, [
                R(Wn, {
                  variant: "secondary",
                  type: "button",
                  onClick: l
                }, {
                  default: P(() => [
                    yt(A(e.cancelLabel), 1)
                  ]),
                  _: 1
                }),
                R(qn, {
                  variant: "primary",
                  type: "button",
                  onClick: d
                }, {
                  default: P(() => [
                    yt(A(e.confirmLabel), 1)
                  ]),
                  _: 1
                })
              ])
            ], 512)
          ])) : z("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), C5 = /* @__PURE__ */ it(w5, [["__scopeId", "data-v-4ed7bb14"]]), $5 = { class: "text-left font-['Inter',system-ui,sans-serif]" }, M5 = {
  key: 0,
  class: ""
}, S5 = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, D5 = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, A5 = {
  key: 1,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, T5 = /* @__PURE__ */ Z({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = Aa(), n = D(() => {
      const a = !!t.filters, s = !!t.actions;
      return a ? "justify-between" : s ? "justify-end" : "";
    });
    return (a, s) => (_(), k("section", $5, [
      a.$slots.description || a.$slots.filters || a.$slots.actions ? (_(), k("header", M5, [
        a.$slots.description ? (_(), k("div", S5, [
          wt(a.$slots, "description")
        ])) : z("", !0),
        a.$slots.filters || a.$slots.actions ? (_(), w("div", {
          key: 1,
          class: W(["flex flex-wrap gap-2 items-center", n.value])
        }, [
          a.$slots.filters ? (_(), k("div", D5, [
            wt(a.$slots, "filters")
          ])) : z("", !0),
          a.$slots.actions ? (_(), k("div", A5, [
            wt(a.$slots, "actions")
          ])) : z("", !0)
        ], 2)) : z("", !0)
      ])) : z("", !0),
      a.$slots.content || a.$slots.default ? (_(), w("div", {
        key: 1,
        class: W({
          "mt-6": a.$slots.description || a.$slots.filters || a.$slots.actions
        })
      }, [
        $t(a.$slots, "content", {}, () => [
          $t(a.$slots, "default")
        ])
      ], 2)) : z("", !0)
    ]));
  }
}), B5 = { class: "flex flex-1 min-h-0" }, L5 = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, F5 = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, E5 = ["aria-current", "title", "onClick"], I5 = {
  key: 1,
  class: "shrink-0 border-t [border-color:var(--kiut-lateral-border-color)] [background-color:var(--kiut-lateral-bg)]"
}, P5 = { class: "px-4 py-4 shrink-0" }, R5 = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, O5 = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, z5 = ["data-nav-id", "aria-current", "onClick"], V5 = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, N5 = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, W5 = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, H5 = ["data-nav-id", "aria-current", "onClick"], j5 = { class: "truncate text-[15px]" }, Y5 = ["aria-current", "onClick"], K5 = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, q5 = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, U5 = /* @__PURE__ */ Z({
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
    primaryRailWidth: { default: "3.4rem" },
    mobileBreakpoint: { default: 768 },
    mobileBarHeight: { default: "4rem" }
  },
  emits: ["update:selectedSectionId", "navigate"],
  setup(e, { emit: t }) {
    const n = st(!1), a = e, s = t, o = Eo(), { class: i, ...l } = o, d = st(!1);
    function c() {
      typeof window > "u" || (d.value = window.innerWidth < a.mobileBreakpoint);
    }
    ie(() => {
      c(), window.addEventListener("resize", c);
    }), Me(() => {
      window.removeEventListener("resize", c);
    });
    const u = D(() => {
      const w = a.sections.find((M) => M.id === a.selectedSectionId);
      return w?.items?.length ? w : null;
    });
    function h(x) {
      return a.activePath ? a.activePath === x.path || a.activePath.startsWith(x.path + "/") : !1;
    }
    function g(w) {
      return w.items?.length ? w.items.some(h) : !a.activePath || !w.path ? !1 : a.activePath === w.path || a.activePath.startsWith(w.path + "/");
    }
    function y(x) {
      if (!x.items?.length) {
        o("update:selectedSectionId", null), o("navigate", {
          section: x,
          item: { id: x.id, label: x.label, path: x.path }
        });
        return;
      }
      const M = a.selectedSectionId === w.id ? null : w.id;
      s("update:selectedSectionId", M);
    }
    function f(w, M) {
      s("navigate", { section: w, item: M });
    }
    function b() {
      o("update:selectedSectionId", null);
    }
    function v(w, M) {
      f(w, M), m();
    }
    function p(w) {
      return a.selectedSectionId === w.id ? [
        "[background-color:var(--kiut-primary-section)] text-white shadow-sm dark:text-purple-300"
      ] : g(w) ? [
        "[color:var(--kiut-primary)]",
        "text-purple-800/90 dark:text-purple-400"
      ] : [
        "[color:var(--kiut-text-secondary)]",
        "hover:bg-purple-100 hover:text-purple-900",
        "dark:hover:bg-purple-400/20 dark:hover:text-purple-50"
      ];
    }
    function f(x) {
      return h(x) ? [
        "[background-color:var(--kiut-secondary-section)] text-white",
        "dark:text-purple-300"
      ] : [
        "[color:var(--kiut-text-primary)]",
        "hover:bg-purple-100 hover:text-purple-700",
        "dark:hover:bg-purple-500/30 dark:hover:text-purple-50"
      ];
    }
    function x(w) {
      return a.selectedSectionId === w.id ? ["[color:var(--kiut-primary)]"] : g(w) ? ["[color:var(--kiut-primary)]", "opacity-75"] : [
        "[color:var(--kiut-text-muted)]",
        "active:[color:var(--kiut-text-secondary)]"
      ];
    }
    return (w, M) => d.value ? (_(), k("div", jn({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      R(un, { name: "ksn-overlay" }, {
        default: P(() => [
          u.value ? (_(), w("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: b
          })) : z("", !0)
        ]),
        _: 1
      }),
      R(pn, { name: "ksn-sheet" }, {
        default: P(() => [
          u.value ? (_(), w("div", {
            key: 0,
            class: "fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t [border-color:var(--kiut-lateral-border-color)] max-h-[70vh] flex flex-col",
            style: gt({ paddingBottom: a.mobileBarHeight })
          }, [
            M[3] || (M[3] = r("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              r("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            r("div", V5, [
              r("p", N5, A(u.value.label), 1),
              r("button", {
                type: "button",
                class: "w-8 h-8 flex items-center justify-center rounded-lg [color:var(--kiut-text-muted)] hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-colors",
                "aria-label": "Close",
                onClick: m
              }, [...M[2] || (M[2] = [
                r("svg", {
                  class: "w-4 h-4",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2.5",
                  "stroke-linecap": "round"
                }, [
                  r("path", { d: "M18 6L6 18M6 6l12 12" })
                ], -1)
              ])])
            ]),
            r("nav", W5, [
              (_(!0), k(q, null, at(u.value.items, (C) => (_(), k("button", {
                key: C.id,
                type: "button",
                "data-nav-id": C.id,
                "aria-current": h(C) ? "page" : void 0,
                class: W(["group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]", b(C)]),
                onClick: ($) => v(u.value, C)
              }, [
                C.icon ? (_(), tt(Ge(C.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : z("", !0),
                r("span", j5, A(C.label), 1)
              ], 10, H5))), 128))
            ])
          ], 4)) : z("", !0)
        ]),
        _: 1
      }),
      r("nav", {
        class: "fixed bottom-0 left-0 right-0 z-50 [background-color:var(--kiut-lateral-bg)] border-t [border-color:var(--kiut-lateral-border-color)] flex items-stretch justify-around overflow-hidden",
        style: gt({ height: e.mobileBarHeight }),
        "aria-label": "Sections"
      }, [
        (_(!0), k(q, null, at(e.sections, (C) => (_(), k("button", {
          key: C.id,
          type: "button",
          "aria-current": e.selectedSectionId === C.id ? "true" : void 0,
          class: W(["relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--kiut-primary)]/30", x(C)]),
          onClick: ($) => y(C)
        }, [
          e.selectedSectionId === C.id || g(C) ? (_(), k("span", K5)) : z("", !0),
          C.icon ? (_(), nt(je(C.icon), {
            key: 1,
            class: "shrink-0",
            style: gt({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : z("", !0),
          r("span", q5, A(C.label), 1)
        ], 10, Y5))), 128))
      ], 4)
    ], 16)) : (_(), w("aside", Xn({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      r("div", B5, [
        r("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center [border-color:var(--kiut-lateral-border-color)]",
          style: gt({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: M[0] || (M[0] = (C) => n.value = !0),
          onMouseleave: M[1] || (M[1] = (C) => n.value = !1)
        }, [
          w.$slots.logo ? (_(), k("div", L5, [
            wt(w.$slots, "logo", { expanded: n.value }, void 0, !0)
          ])) : z("", !0),
          r("nav", F5, [
            (_(!0), k(q, null, at(e.sections, (C) => (_(), k("button", {
              key: C.id,
              type: "button",
              "aria-current": e.selectedSectionId === C.id ? "true" : void 0,
              title: C.label,
              class: W(["group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20", p(C)]),
              onClick: ($) => y(C)
            }, [
              C.icon ? (_(), tt(Ge(C.icon), {
                key: 0,
                class: "shrink-0",
                style: gt({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : z("", !0),
              r("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: gt({ fontSize: e.primaryFontSize })
              }, A(C.label), 5)
            ], 10, E5))), 128))
          ]),
          w.$slots.footer ? (_(), k("div", I5, [
            wt(w.$slots, "footer", { expanded: n.value }, void 0, !0)
          ])) : z("", !0)
        ], 36),
        R(pn, { name: "ksn-sub" }, {
          default: P(() => [
            u.value ? (_(), w("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: gt({ width: e.secondaryWidth })
            }, [
              r("div", P5, [
                r("p", R5, A(u.value.label), 1)
              ]),
              r("nav", O5, [
                (_(!0), k(q, null, at(u.value.items, (C) => (_(), k("button", {
                  key: C.id,
                  type: "button",
                  "data-nav-id": C.id,
                  "aria-current": h(C) ? "page" : void 0,
                  class: W(["group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20", b(C)]),
                  onClick: ($) => f(u.value, C)
                }, [
                  C.icon ? (_(), tt(Ge(C.icon), {
                    key: 0,
                    style: gt({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : z("", !0),
                  r("span", {
                    class: "truncate",
                    style: gt({ fontSize: e.secondaryFontSize })
                  }, A(C.label), 5)
                ], 10, z5))), 128))
              ])
            ], 4)) : z("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), X5 = /* @__PURE__ */ it(U5, [["__scopeId", "data-v-d3ebd9b8"]]), iC = {
  install(e) {
    e.component("KiutChartBar", he), e.component("KiutChartLine", ge), e.component("KiutPieChart", na), e.component("KiutBoxplotChart", Ph), e.component("KiutCandlestickChart", Si), e.component("KiutHistogramChart", Di), e.component("KiutSankeyChart", Se), e.component("KiutAgentsPerDay", up), e.component("KiutBookingManager", Np), e.component("KiutCheckin", em), e.component("KiutCheckinContainer", Zm), e.component("KiutCheckinMetrics", vm), e.component("KiutCheckinSegments", Ei), e.component("KiutDisruption", m0), e.component("KiutFAQ", w0), e.component("KiutMessagesPerAgent", F0), e.component("KiutRecordLocator", Fi), e.component("KiutSalesByChannel", Ii), e.component("KiutSeller", Pi), e.component("KiutSellerContainer", xb), e.component("KiutTopAgents", Ab), e.component("KiutPaymentMethod", Zb), e.component("KiutAgentHumanConversations", Gv), e.component("KiutChannelMetrics", iy), e.component("KiutTriageCombinations", xy), e.component("KiutSelectLanguage", Dy), e.component("KiutGuardrails", zy), e.component("KiutDisruptionNotifier", i1), e.component("KiutTotalConversationsCard", h1), e.component("KiutCsatP95Card", v1), e.component("KiutCSATContainer", Q1), e.component("KiutAiGeneratedRevenueCard", i_), e.component("KiutHumanEscalations", __), e.component("KiutHumanEscalationsCard", M_), e.component("KiutNpsDailyMetrics", zi), e.component("KiutNpsMetrics", Vi), e.component("KiutNpsOverviewMetrics", Oi), e.component("KiutAWSCost", P_), e.component("KiutCostUsage", q_), e.component("KiutTokenUsage", sx), e.component("KiutConversationCount", px), e.component("KiutTopAgentsAnalysis", Dx), e.component("KiutTopAgentsPie", Ox), e.component("KiutDailyCostTrends", Ux), e.component("KiutModelUsage", ck), e.component("KiutMessageRoles", yk), e.component("KiutCostPerConversations", Tk), e.component("Tabs", Ni), e.component("Table", Ri), e.component("Filters", c2), e.component("InputText", p2), e.component("InputTextarea", _2), e.component("InputFile", D2), e.component("InputDateTime", E2), e.component("InputTime", V2), e.component("InputRange", tw), e.component("InputNumber", ow), e.component("InputColorPicker", gw), e.component("Select", Hi), e.component("MultiSelect", Sw), e.component("Toggle", Tw), e.component("InputPhone", Ow), e.component("SelectablePills", Yw), e.component("SegmentedControl", Xw), e.component("DateRangePicker", u5), e.component("Tag", Rt), e.component("Button", Wn), e.component("Modal", C5), e.component("Section", T5), e.component("KiutAppShellNavigation", X5);
  }
};
export {
  P_ as AWSCost,
  Gv as AgentHumanConversations,
  up as AgentsPerDay,
  i_ as AiGeneratedRevenueCard,
  X5 as AppShellNavigation,
  Np as BookingManager,
  Ph as BoxplotChart,
  Wn as Button,
  Q1 as CSATContainer,
  Si as CandlestickChart,
  iy as ChannelMetrics,
  he as ChartBar,
  ge as ChartLine,
  em as Checkin,
  Zm as CheckinContainer,
  vm as CheckinMetrics,
  Ei as CheckinSegments,
  px as ConversationCount,
  Tk as CostPerConversations,
  q_ as CostUsage,
  v1 as CsatP95Card,
  Ux as DailyCostTrends,
  u5 as DateRangePicker,
  m0 as Disruption,
  i1 as DisruptionNotifier,
  w0 as FAQ,
  c2 as Filters,
  zy as Guardrails,
  Di as HistogramChart,
  __ as HumanEscalations,
  M_ as HumanEscalationsCard,
  gw as InputColorPicker,
  E2 as InputDateTime,
  D2 as InputFile,
  ow as InputNumber,
  Ow as InputPhone,
  tw as InputRange,
  p2 as InputText,
  _2 as InputTextarea,
  V2 as InputTime,
  iC as KiutUIPlugin,
  yk as MessageRoles,
  F0 as MessagesPerAgent,
  C5 as Modal,
  ck as ModelUsage,
  Sw as MultiSelect,
  zi as NpsDailyMetrics,
  Vi as NpsMetrics,
  Oi as NpsOverviewMetrics,
  Zb as PaymentMethod,
  na as PieChart,
  Fi as RecordLocator,
  Ii as SalesByChannel,
  Se as SankeyChart,
  T5 as Section,
  Xw as SegmentedControl,
  Hi as Select,
  Dy as SelectLanguage,
  Yw as SelectablePills,
  Pi as Seller,
  xb as SellerContainer,
  Ri as Table,
  Ni as Tabs,
  Rt as Tag,
  Tw as Toggle,
  sx as TokenUsage,
  Ab as TopAgents,
  Dx as TopAgentsAnalysis,
  Ox as TopAgentsPie,
  h1 as TotalConversationsCard,
  xy as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
