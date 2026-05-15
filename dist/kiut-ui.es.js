import { defineComponent as Q, shallowRef as Bo, h as xa, ref as st, onMounted as te, onUnmounted as $e, watch as Pt, toRaw as ka, nextTick as Lt, version as qi, isProxy as Lo, computed as M, toRef as ut, openBlock as _, createElementBlock as k, createVNode as R, unref as F, createElementVNode as r, Fragment as U, renderList as at, normalizeStyle as mt, normalizeClass as H, toDisplayString as A, createCommentVNode as z, onBeforeUnmount as Fo, createStaticVNode as es, withDirectives as Xt, vShow as mn, useSlots as Qn, renderSlot as kt, createBlock as nt, resolveDynamicComponent as je, withCtx as P, createSlots as Mt, createTextVNode as bt, Transition as un, Teleport as Ta, withModifiers as ie, withKeys as Hn, vModelText as Pe, useAttrs as Eo, mergeProps as jn } from "vue";
import * as ns from "echarts/core";
import { TooltipComponent as Ki, TitleComponent as Ui } from "echarts/components";
import { SankeyChart as Xi } from "echarts/charts";
import { CanvasRenderer as Gi } from "echarts/renderers";
import It from "moment";
function $n(e) {
  return e + 0.5 | 0;
}
const ye = (e, t, n) => Math.max(Math.min(e, n), t);
function rn(e) {
  return ye($n(e * 2.55), 0, 255);
}
function we(e) {
  return ye($n(e * 255), 0, 255);
}
function de(e) {
  return ye($n(e / 2.55) / 100, 0, 1);
}
function as(e) {
  return ye($n(e * 100), 0, 100);
}
const Kt = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, wa = [..."0123456789ABCDEF"], Zi = (e) => wa[e & 15], Qi = (e) => wa[(e & 240) >> 4] + wa[e & 15], Sn = (e) => (e & 240) >> 4 === (e & 15), Ji = (e) => Sn(e.r) && Sn(e.g) && Sn(e.b) && Sn(e.a);
function tl(e) {
  var t = e.length, n;
  return e[0] === "#" && (t === 4 || t === 5 ? n = {
    r: 255 & Kt[e[1]] * 17,
    g: 255 & Kt[e[2]] * 17,
    b: 255 & Kt[e[3]] * 17,
    a: t === 5 ? Kt[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (n = {
    r: Kt[e[1]] << 4 | Kt[e[2]],
    g: Kt[e[3]] << 4 | Kt[e[4]],
    b: Kt[e[5]] << 4 | Kt[e[6]],
    a: t === 9 ? Kt[e[7]] << 4 | Kt[e[8]] : 255
  })), n;
}
const el = (e, t) => e < 255 ? t(e) : "";
function nl(e) {
  var t = Ji(e) ? Zi : Qi;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + el(e.a, t) : void 0;
}
const al = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Io(e, t, n) {
  const a = t * Math.min(n, 1 - n), s = (o, i = (o + e / 30) % 12) => n - a * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [s(0), s(8), s(4)];
}
function sl(e, t, n) {
  const a = (s, o = (s + e / 60) % 6) => n - n * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [a(5), a(3), a(1)];
}
function ol(e, t, n) {
  const a = Io(e, 1, 0.5);
  let s;
  for (t + n > 1 && (s = 1 / (t + n), t *= s, n *= s), s = 0; s < 3; s++)
    a[s] *= 1 - t - n, a[s] += t;
  return a;
}
function il(e, t, n, a, s) {
  return e === s ? (t - n) / a + (t < n ? 6 : 0) : t === s ? (n - e) / a + 2 : (e - t) / a + 4;
}
function Ba(e) {
  const n = e.r / 255, a = e.g / 255, s = e.b / 255, o = Math.max(n, a, s), i = Math.min(n, a, s), l = (o + i) / 2;
  let d, c, u;
  return o !== i && (u = o - i, c = l > 0.5 ? u / (2 - o - i) : u / (o + i), d = il(n, a, s, u, o), d = d * 60 + 0.5), [d | 0, c || 0, l];
}
function La(e, t, n, a) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, a)).map(we);
}
function Fa(e, t, n) {
  return La(Io, e, t, n);
}
function ll(e, t, n) {
  return La(ol, e, t, n);
}
function rl(e, t, n) {
  return La(sl, e, t, n);
}
function Po(e) {
  return (e % 360 + 360) % 360;
}
function cl(e) {
  const t = al.exec(e);
  let n = 255, a;
  if (!t)
    return;
  t[5] !== a && (n = t[6] ? rn(+t[5]) : we(+t[5]));
  const s = Po(+t[2]), o = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? a = ll(s, o, i) : t[1] === "hsv" ? a = rl(s, o, i) : a = Fa(s, o, i), {
    r: a[0],
    g: a[1],
    b: a[2],
    a: n
  };
}
function dl(e, t) {
  var n = Ba(e);
  n[0] = Po(n[0] + t), n = Fa(n), e.r = n[0], e.g = n[1], e.b = n[2];
}
function ul(e) {
  if (!e)
    return;
  const t = Ba(e), n = t[0], a = as(t[1]), s = as(t[2]);
  return e.a < 255 ? `hsla(${n}, ${a}%, ${s}%, ${de(e.a)})` : `hsl(${n}, ${a}%, ${s}%)`;
}
const ss = {
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
}, os = {
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
function hl() {
  const e = {}, t = Object.keys(os), n = Object.keys(ss);
  let a, s, o, i, l;
  for (a = 0; a < t.length; a++) {
    for (i = l = t[a], s = 0; s < n.length; s++)
      o = n[s], l = l.replace(o, ss[o]);
    o = parseInt(os[i], 16), e[l] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return e;
}
let Mn;
function fl(e) {
  Mn || (Mn = hl(), Mn.transparent = [0, 0, 0, 0]);
  const t = Mn[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const gl = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function pl(e) {
  const t = gl.exec(e);
  let n = 255, a, s, o;
  if (t) {
    if (t[7] !== a) {
      const i = +t[7];
      n = t[8] ? rn(i) : ye(i * 255, 0, 255);
    }
    return a = +t[1], s = +t[3], o = +t[5], a = 255 & (t[2] ? rn(a) : ye(a, 0, 255)), s = 255 & (t[4] ? rn(s) : ye(s, 0, 255)), o = 255 & (t[6] ? rn(o) : ye(o, 0, 255)), {
      r: a,
      g: s,
      b: o,
      a: n
    };
  }
}
function ml(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${de(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const ia = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, Ne = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function bl(e, t, n) {
  const a = Ne(de(e.r)), s = Ne(de(e.g)), o = Ne(de(e.b));
  return {
    r: we(ia(a + n * (Ne(de(t.r)) - a))),
    g: we(ia(s + n * (Ne(de(t.g)) - s))),
    b: we(ia(o + n * (Ne(de(t.b)) - o))),
    a: e.a + n * (t.a - e.a)
  };
}
function Dn(e, t, n) {
  if (e) {
    let a = Ba(e);
    a[t] = Math.max(0, Math.min(a[t] + a[t] * n, t === 0 ? 360 : 1)), a = Fa(a), e.r = a[0], e.g = a[1], e.b = a[2];
  }
}
function Ro(e, t) {
  return e && Object.assign(t || {}, e);
}
function is(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = we(e[3]))) : (t = Ro(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = we(t.a)), t;
}
function vl(e) {
  return e.charAt(0) === "r" ? pl(e) : cl(e);
}
class bn {
  constructor(t) {
    if (t instanceof bn)
      return t;
    const n = typeof t;
    let a;
    n === "object" ? a = is(t) : n === "string" && (a = tl(t) || fl(t) || vl(t)), this._rgb = a, this._valid = !!a;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Ro(this._rgb);
    return t && (t.a = de(t.a)), t;
  }
  set rgb(t) {
    this._rgb = is(t);
  }
  rgbString() {
    return this._valid ? ml(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? nl(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? ul(this._rgb) : void 0;
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
    return t && (this._rgb = bl(this._rgb, t._rgb, n)), this;
  }
  clone() {
    return new bn(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = we(t), this;
  }
  clearer(t) {
    const n = this._rgb;
    return n.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, n = $n(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return Dn(this._rgb, 2, t), this;
  }
  darken(t) {
    return Dn(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return Dn(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return Dn(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return dl(this._rgb, t), this;
  }
}
function le() {
}
const yl = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function _t(e) {
  return e == null;
}
function Ft(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function vt(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function Gt(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function ne(e, t) {
  return Gt(e) ? e : t;
}
function dt(e, t) {
  return typeof e > "u" ? t : e;
}
const _l = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, Oo = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function $t(e, t, n) {
  if (e && typeof e.call == "function")
    return e.apply(n, t);
}
function xt(e, t, n, a) {
  let s, o, i;
  if (Ft(e))
    for (o = e.length, s = 0; s < o; s++)
      t.call(n, e[s], s);
  else if (vt(e))
    for (i = Object.keys(e), o = i.length, s = 0; s < o; s++)
      t.call(n, e[i[s]], i[s]);
}
function Yn(e, t) {
  let n, a, s, o;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (n = 0, a = e.length; n < a; ++n)
    if (s = e[n], o = t[n], s.datasetIndex !== o.datasetIndex || s.index !== o.index)
      return !1;
  return !0;
}
function qn(e) {
  if (Ft(e))
    return e.map(qn);
  if (vt(e)) {
    const t = /* @__PURE__ */ Object.create(null), n = Object.keys(e), a = n.length;
    let s = 0;
    for (; s < a; ++s)
      t[n[s]] = qn(e[n[s]]);
    return t;
  }
  return e;
}
function zo(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function xl(e, t, n, a) {
  if (!zo(e))
    return;
  const s = t[e], o = n[e];
  vt(s) && vt(o) ? vn(s, o, a) : t[e] = qn(o);
}
function vn(e, t, n) {
  const a = Ft(t) ? t : [
    t
  ], s = a.length;
  if (!vt(e))
    return e;
  n = n || {};
  const o = n.merger || xl;
  let i;
  for (let l = 0; l < s; ++l) {
    if (i = a[l], !vt(i))
      continue;
    const d = Object.keys(i);
    for (let c = 0, u = d.length; c < u; ++c)
      o(d[c], e, i, n);
  }
  return e;
}
function hn(e, t) {
  return vn(e, t, {
    merger: kl
  });
}
function kl(e, t, n) {
  if (!zo(e))
    return;
  const a = t[e], s = n[e];
  vt(a) && vt(s) ? hn(a, s) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = qn(s));
}
const ls = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function wl(e) {
  const t = e.split("."), n = [];
  let a = "";
  for (const s of t)
    a += s, a.endsWith("\\") ? a = a.slice(0, -1) + "." : (n.push(a), a = "");
  return n;
}
function Cl(e) {
  const t = wl(e);
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
  return (ls[t] || (ls[t] = Cl(t)))(e);
}
function Ea(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const yn = (e) => typeof e < "u", Ce = (e) => typeof e == "function", rs = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
};
function $l(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const wt = Math.PI, At = 2 * wt, Sl = At + wt, Kn = Number.POSITIVE_INFINITY, Ml = wt / 180, Et = wt / 2, Ae = wt / 4, cs = wt * 2 / 3, Vo = Math.log10, oe = Math.sign;
function fn(e, t, n) {
  return Math.abs(e - t) < n;
}
function ds(e) {
  const t = Math.round(e);
  e = fn(e, t, e / 1e3) ? t : e;
  const n = Math.pow(10, Math.floor(Vo(e))), a = e / n;
  return (a <= 1 ? 1 : a <= 2 ? 2 : a <= 5 ? 5 : 10) * n;
}
function Dl(e) {
  const t = [], n = Math.sqrt(e);
  let a;
  for (a = 1; a < n; a++)
    e % a === 0 && (t.push(a), t.push(e / a));
  return n === (n | 0) && t.push(n), t.sort((s, o) => s - o).pop(), t;
}
function Al(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function _n(e) {
  return !Al(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Tl(e, t) {
  const n = Math.round(e);
  return n - t <= e && n + t >= e;
}
function Bl(e, t, n) {
  let a, s, o;
  for (a = 0, s = e.length; a < s; a++)
    o = e[a][n], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function ue(e) {
  return e * (wt / 180);
}
function Ll(e) {
  return e * (180 / wt);
}
function us(e) {
  if (!Gt(e))
    return;
  let t = 1, n = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, n++;
  return n;
}
function No(e, t) {
  const n = t.x - e.x, a = t.y - e.y, s = Math.sqrt(n * n + a * a);
  let o = Math.atan2(a, n);
  return o < -0.5 * wt && (o += At), {
    angle: o,
    distance: s
  };
}
function Ca(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function Fl(e, t) {
  return (e - t + Sl) % At - wt;
}
function Jt(e) {
  return (e % At + At) % At;
}
function xn(e, t, n, a) {
  const s = Jt(e), o = Jt(t), i = Jt(n), l = Jt(o - s), d = Jt(i - s), c = Jt(s - o), u = Jt(s - i);
  return s === o || s === i || a && o === i || l > d && c < u;
}
function zt(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function El(e) {
  return zt(e, -32768, 32767);
}
function _e(e, t, n, a = 1e-6) {
  return e >= Math.min(t, n) - a && e <= Math.max(t, n) + a;
}
function Ia(e, t, n) {
  n = n || ((i) => e[i] < t);
  let a = e.length - 1, s = 0, o;
  for (; a - s > 1; )
    o = s + a >> 1, n(o) ? s = o : a = o;
  return {
    lo: s,
    hi: a
  };
}
const Ie = (e, t, n, a) => Ia(e, n, a ? (s) => {
  const o = e[s][t];
  return o < n || o === n && e[s + 1][t] === n;
} : (s) => e[s][t] < n), Il = (e, t, n) => Ia(e, n, (a) => e[a][t] >= n);
function Pl(e, t, n) {
  let a = 0, s = e.length;
  for (; a < s && e[a] < t; )
    a++;
  for (; s > a && e[s - 1] > n; )
    s--;
  return a > 0 || s < e.length ? e.slice(a, s) : e;
}
const Wo = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function Rl(e, t) {
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
  }), Wo.forEach((n) => {
    const a = "_onData" + Ea(n), s = e[n];
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
function hs(e, t) {
  const n = e._chartjs;
  if (!n)
    return;
  const a = n.listeners, s = a.indexOf(t);
  s !== -1 && a.splice(s, 1), !(a.length > 0) && (Wo.forEach((o) => {
    delete e[o];
  }), delete e._chartjs);
}
function Ho(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const jo = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function Yo(e, t) {
  let n = [], a = !1;
  return function(...s) {
    n = s, a || (a = !0, jo.call(window, () => {
      a = !1, e.apply(t, n);
    }));
  };
}
function Ol(e, t) {
  let n;
  return function(...a) {
    return t ? (clearTimeout(n), n = setTimeout(e, t, a)) : e.apply(this, a), t;
  };
}
const Pa = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", Ot = (e, t, n) => e === "start" ? t : e === "end" ? n : (t + n) / 2, zl = (e, t, n, a) => e === (a ? "left" : "right") ? n : e === "center" ? (t + n) / 2 : t;
function Vl(e, t, n) {
  const a = t.length;
  let s = 0, o = a;
  if (e._sorted) {
    const { iScale: i, vScale: l, _parsed: d } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, u = i.axis, { min: h, max: g, minDefined: y, maxDefined: f } = i.getUserBounds();
    if (y) {
      if (s = Math.min(
        // @ts-expect-error Need to type _parsed
        Ie(d, u, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? a : Ie(t, u, i.getPixelForValue(h)).lo
      ), c) {
        const m = d.slice(0, s + 1).reverse().findIndex((v) => !_t(v[l.axis]));
        s -= Math.max(0, m);
      }
      s = zt(s, 0, a - 1);
    }
    if (f) {
      let m = Math.max(
        // @ts-expect-error Need to type _parsed
        Ie(d, i.axis, g, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? 0 : Ie(t, u, i.getPixelForValue(g), !0).hi + 1
      );
      if (c) {
        const v = d.slice(m - 1).findIndex((p) => !_t(p[l.axis]));
        m += Math.max(0, v);
      }
      o = zt(m, s, a) - s;
    } else
      o = a - s;
  }
  return {
    start: s,
    count: o
  };
}
function Nl(e) {
  const { xScale: t, yScale: n, _scaleRanges: a } = e, s = {
    xmin: t.min,
    xmax: t.max,
    ymin: n.min,
    ymax: n.max
  };
  if (!a)
    return e._scaleRanges = s, !0;
  const o = a.xmin !== t.min || a.xmax !== t.max || a.ymin !== n.min || a.ymax !== n.max;
  return Object.assign(a, s), o;
}
const An = (e) => e === 0 || e === 1, fs = (e, t, n) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * At / n)), gs = (e, t, n) => Math.pow(2, -10 * e) * Math.sin((e - t) * At / n) + 1, gn = {
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
  easeInSine: (e) => -Math.cos(e * Et) + 1,
  easeOutSine: (e) => Math.sin(e * Et),
  easeInOutSine: (e) => -0.5 * (Math.cos(wt * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => An(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => An(e) ? e : fs(e, 0.075, 0.3),
  easeOutElastic: (e) => An(e) ? e : gs(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return An(e) ? e : e < 0.5 ? 0.5 * fs(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * gs(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - gn.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? gn.easeInBounce(e * 2) * 0.5 : gn.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function Ra(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function ps(e) {
  return Ra(e) ? e : new bn(e);
}
function la(e) {
  return Ra(e) ? e : new bn(e).saturate(0.5).darken(0.1).hexString();
}
const Wl = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], Hl = [
  "color",
  "borderColor",
  "backgroundColor"
];
function jl(e) {
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
      properties: Hl
    },
    numbers: {
      type: "number",
      properties: Wl
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
function Yl(e) {
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
  let a = ms.get(n);
  return a || (a = new Intl.NumberFormat(e, t), ms.set(n, a)), a;
}
function Oa(e, t, n) {
  return ql(t, n).format(e);
}
const Kl = {
  values(e) {
    return Ft(e) ? e : "" + e;
  },
  numeric(e, t, n) {
    if (e === 0)
      return "0";
    const a = this.chart.options.locale;
    let s, o = e;
    if (n.length > 1) {
      const c = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
      (c < 1e-4 || c > 1e15) && (s = "scientific"), o = Ul(e, n);
    }
    const i = Vo(Math.abs(o)), l = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), d = {
      notation: s,
      minimumFractionDigits: l,
      maximumFractionDigits: l
    };
    return Object.assign(d, this.options.ticks.format), Oa(e, a, d);
  }
};
function Ul(e, t) {
  let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var qo = {
  formatters: Kl
};
function Xl(e) {
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
      callback: qo.formatters.values,
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
const ze = /* @__PURE__ */ Object.create(null), $a = /* @__PURE__ */ Object.create(null);
function pn(e, t) {
  if (!t)
    return e;
  const n = t.split(".");
  for (let a = 0, s = n.length; a < s; ++a) {
    const o = n[a];
    e = e[o] || (e[o] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function ra(e, t, n) {
  return typeof t == "string" ? vn(pn(e, t), n) : vn(pn(e, ""), t);
}
class Gl {
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
    }, this.hover = {}, this.hoverBackgroundColor = (a, s) => la(s.backgroundColor), this.hoverBorderColor = (a, s) => la(s.borderColor), this.hoverColor = (a, s) => la(s.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(n);
  }
  set(t, n) {
    return ra(this, t, n);
  }
  get(t) {
    return pn(this, t);
  }
  describe(t, n) {
    return ra($a, t, n);
  }
  override(t, n) {
    return ra(ze, t, n);
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
          return vt(d) ? Object.assign({}, c, d) : dt(d, c);
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
var Tt = /* @__PURE__ */ new Gl({
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
  jl,
  Yl,
  Xl
]);
function Zl(e) {
  return !e || _t(e.size) || _t(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function bs(e, t, n, a, s) {
  let o = t[s];
  return o || (o = t[s] = e.measureText(s).width, n.push(s)), o > a && (a = o), a;
}
function Te(e, t, n) {
  const a = e.currentDevicePixelRatio, s = n !== 0 ? Math.max(n / 2, 0.5) : 0;
  return Math.round((t - s) * a) / a + s;
}
function vs(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Sa(e, t, n, a) {
  Ko(e, t, n, a, null);
}
function Ko(e, t, n, a, s) {
  let o, i, l, d, c, u, h, g;
  const y = t.pointStyle, f = t.rotation, m = t.radius;
  let v = (f || 0) * Ml;
  if (y && typeof y == "object" && (o = y.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(n, a), e.rotate(v), e.drawImage(y, -y.width / 2, -y.height / 2, y.width, y.height), e.restore();
    return;
  }
  if (!(isNaN(m) || m <= 0)) {
    switch (e.beginPath(), y) {
      // Default includes circle
      default:
        s ? e.ellipse(n, a, s / 2, m, 0, 0, At) : e.arc(n, a, m, 0, At), e.closePath();
        break;
      case "triangle":
        u = s ? s / 2 : m, e.moveTo(n + Math.sin(v) * u, a - Math.cos(v) * m), v += cs, e.lineTo(n + Math.sin(v) * u, a - Math.cos(v) * m), v += cs, e.lineTo(n + Math.sin(v) * u, a - Math.cos(v) * m), e.closePath();
        break;
      case "rectRounded":
        c = m * 0.516, d = m - c, i = Math.cos(v + Ae) * d, h = Math.cos(v + Ae) * (s ? s / 2 - c : d), l = Math.sin(v + Ae) * d, g = Math.sin(v + Ae) * (s ? s / 2 - c : d), e.arc(n - h, a - l, c, v - wt, v - Et), e.arc(n + g, a - i, c, v - Et, v), e.arc(n + h, a + l, c, v, v + Et), e.arc(n - g, a + i, c, v + Et, v + wt), e.closePath();
        break;
      case "rect":
        if (!f) {
          d = Math.SQRT1_2 * m, u = s ? s / 2 : d, e.rect(n - u, a - d, 2 * u, 2 * d);
          break;
        }
        v += Ae;
      /* falls through */
      case "rectRot":
        h = Math.cos(v) * (s ? s / 2 : m), i = Math.cos(v) * m, l = Math.sin(v) * m, g = Math.sin(v) * (s ? s / 2 : m), e.moveTo(n - h, a - l), e.lineTo(n + g, a - i), e.lineTo(n + h, a + l), e.lineTo(n - g, a + i), e.closePath();
        break;
      case "crossRot":
        v += Ae;
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
        e.moveTo(n, a), e.lineTo(n + Math.cos(v) * (s ? s / 2 : m), a + Math.sin(v) * m);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function kn(e, t, n) {
  return n = n || 0.5, !t || e && e.x > t.left - n && e.x < t.right + n && e.y > t.top - n && e.y < t.bottom + n;
}
function za(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function Va(e) {
  e.restore();
}
function Ql(e, t, n, a, s) {
  if (!t)
    return e.lineTo(n.x, n.y);
  if (s === "middle") {
    const o = (t.x + n.x) / 2;
    e.lineTo(o, t.y), e.lineTo(o, n.y);
  } else s === "after" != !!a ? e.lineTo(t.x, n.y) : e.lineTo(n.x, t.y);
  e.lineTo(n.x, n.y);
}
function Jl(e, t, n, a) {
  if (!t)
    return e.lineTo(n.x, n.y);
  e.bezierCurveTo(a ? t.cp1x : t.cp2x, a ? t.cp1y : t.cp2y, a ? n.cp2x : n.cp1x, a ? n.cp2y : n.cp1y, n.x, n.y);
}
function tr(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), _t(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function er(e, t, n, a, s) {
  if (s.strikethrough || s.underline) {
    const o = e.measureText(a), i = t - o.actualBoundingBoxLeft, l = t + o.actualBoundingBoxRight, d = n - o.actualBoundingBoxAscent, c = n + o.actualBoundingBoxDescent, u = s.strikethrough ? (d + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = s.decorationWidth || 2, e.moveTo(i, u), e.lineTo(l, u), e.stroke();
  }
}
function nr(e, t) {
  const n = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = n;
}
function wn(e, t, n, a, s, o = {}) {
  const i = Ft(t) ? t : [
    t
  ], l = o.strokeWidth > 0 && o.strokeColor !== "";
  let d, c;
  for (e.save(), e.font = s.string, tr(e, o), d = 0; d < i.length; ++d)
    c = i[d], o.backdrop && nr(e, o.backdrop), l && (o.strokeColor && (e.strokeStyle = o.strokeColor), _t(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(c, n, a, o.maxWidth)), e.fillText(c, n, a, o.maxWidth), er(e, n, a, c, o), a += Number(s.lineHeight);
  e.restore();
}
function Un(e, t) {
  const { x: n, y: a, w: s, h: o, radius: i } = t;
  e.arc(n + i.topLeft, a + i.topLeft, i.topLeft, 1.5 * wt, wt, !0), e.lineTo(n, a + o - i.bottomLeft), e.arc(n + i.bottomLeft, a + o - i.bottomLeft, i.bottomLeft, wt, Et, !0), e.lineTo(n + s - i.bottomRight, a + o), e.arc(n + s - i.bottomRight, a + o - i.bottomRight, i.bottomRight, Et, 0, !0), e.lineTo(n + s, a + i.topRight), e.arc(n + s - i.topRight, a + i.topRight, i.topRight, 0, -Et, !0), e.lineTo(n + i.topLeft, a);
}
const ar = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, sr = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function or(e, t) {
  const n = ("" + e).match(ar);
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
const ir = (e) => +e || 0;
function Na(e, t) {
  const n = {}, a = vt(t), s = a ? Object.keys(t) : t, o = vt(e) ? a ? (i) => dt(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of s)
    n[i] = ir(o(i));
  return n;
}
function Uo(e) {
  return Na(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function Ye(e) {
  return Na(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function Zt(e) {
  const t = Uo(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function Vt(e, t) {
  e = e || {}, t = t || Tt.font;
  let n = dt(e.size, t.size);
  typeof n == "string" && (n = parseInt(n, 10));
  let a = dt(e.style, t.style);
  a && !("" + a).match(sr) && (console.warn('Invalid font style specified: "' + a + '"'), a = void 0);
  const s = {
    family: dt(e.family, t.family),
    lineHeight: or(dt(e.lineHeight, t.lineHeight), n),
    size: n,
    style: a,
    weight: dt(e.weight, t.weight),
    string: ""
  };
  return s.string = Zl(s), s;
}
function Tn(e, t, n, a) {
  let s, o, i;
  for (s = 0, o = e.length; s < o; ++s)
    if (i = e[s], i !== void 0 && i !== void 0)
      return i;
}
function lr(e, t, n) {
  const { min: a, max: s } = e, o = Oo(t, (s - a) / 2), i = (l, d) => n && l === 0 ? 0 : l + d;
  return {
    min: i(a, -Math.abs(o)),
    max: i(s, o)
  };
}
function Ve(e, t) {
  return Object.assign(Object.create(e), t);
}
function Wa(e, t = [
  ""
], n, a, s = () => e[0]) {
  const o = n || e;
  typeof a > "u" && (a = Qo("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: o,
    _fallback: a,
    _getTarget: s,
    override: (l) => Wa([
      l,
      ...e
    ], t, o, a)
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
      return Go(l, d, () => pr(d, t, e, l));
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
function Ke(e, t, n, a) {
  const s = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: n,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: Xo(e, a),
    setContext: (o) => Ke(e, o, n, a),
    override: (o) => Ke(e.override(o), t, n, a)
  };
  return new Proxy(s, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(o, i) {
      return delete o[i], delete e[i], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(o, i, l) {
      return Go(o, i, () => cr(o, i, l));
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
    set(o, i, l) {
      return e[i] = l, delete o[i], !0;
    }
  });
}
function Xo(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: n = t.scriptable, _indexable: a = t.indexable, _allKeys: s = t.allKeys } = e;
  return {
    allKeys: s,
    scriptable: n,
    indexable: a,
    isScriptable: Ce(n) ? n : () => n,
    isIndexable: Ce(a) ? a : () => a
  };
}
const rr = (e, t) => e ? e + Ea(t) : t, Ha = (e, t) => vt(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Go(e, t, n) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const a = n();
  return e[t] = a, a;
}
function cr(e, t, n) {
  const { _proxy: a, _context: s, _subProxy: o, _descriptors: i } = e;
  let l = a[t];
  return Ce(l) && i.isScriptable(t) && (l = dr(t, l, e, n)), Ft(l) && l.length && (l = ur(t, l, e, i.isIndexable)), Ha(t, l) && (l = Ke(l, s, o && o[t], i)), l;
}
function dr(e, t, n, a) {
  const { _proxy: s, _context: o, _subProxy: i, _stack: l } = n;
  if (l.has(e))
    throw new Error("Recursion detected: " + Array.from(l).join("->") + "->" + e);
  l.add(e);
  let d = t(o, i || a);
  return l.delete(e), Ha(e, d) && (d = ja(s._scopes, s, e, d)), d;
}
function ur(e, t, n, a) {
  const { _proxy: s, _context: o, _subProxy: i, _descriptors: l } = n;
  if (typeof o.index < "u" && a(e))
    return t[o.index % t.length];
  if (vt(t[0])) {
    const d = t, c = s._scopes.filter((u) => u !== d);
    t = [];
    for (const u of d) {
      const h = ja(c, s, e, u);
      t.push(Ke(h, o, i && i[e], l));
    }
  }
  return t;
}
function Zo(e, t, n) {
  return Ce(e) ? e(t, n) : e;
}
const hr = (e, t) => e === !0 ? t : typeof e == "string" ? Oe(t, e) : void 0;
function fr(e, t, n, a, s) {
  for (const o of t) {
    const i = hr(n, o);
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
function ja(e, t, n, a) {
  const s = t._rootScopes, o = Zo(t._fallback, n, a), i = [
    ...e,
    ...s
  ], l = /* @__PURE__ */ new Set();
  l.add(a);
  let d = ys(l, i, n, o || n, a);
  return d === null || typeof o < "u" && o !== n && (d = ys(l, i, o, d, a), d === null) ? !1 : Wa(Array.from(l), [
    ""
  ], s, o, () => gr(t, n, a));
}
function ys(e, t, n, a, s) {
  for (; n; )
    n = fr(e, t, n, a, s);
  return n;
}
function gr(e, t, n) {
  const a = e._getTarget();
  t in a || (a[t] = {});
  const s = a[t];
  return Ft(s) && vt(n) ? n : s || {};
}
function pr(e, t, n, a) {
  let s;
  for (const o of t)
    if (s = Qo(rr(o, e), n), typeof s < "u")
      return Ha(e, s) ? ja(n, a, e, s) : s;
}
function Qo(e, t) {
  for (const n of t) {
    if (!n)
      continue;
    const a = n[e];
    if (typeof a < "u")
      return a;
  }
}
function _s(e) {
  let t = e._keys;
  return t || (t = e._keys = mr(e._scopes)), t;
}
function mr(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e)
    for (const a of Object.keys(n).filter((s) => !s.startsWith("_")))
      t.add(a);
  return Array.from(t);
}
const br = Number.EPSILON || 1e-14, Ue = (e, t) => t < e.length && !e[t].skip && e[t], Jo = (e) => e === "x" ? "y" : "x";
function vr(e, t, n, a) {
  const s = e.skip ? t : e, o = t, i = n.skip ? t : n, l = Ca(o, s), d = Ca(i, o);
  let c = l / (l + d), u = d / (l + d);
  c = isNaN(c) ? 0 : c, u = isNaN(u) ? 0 : u;
  const h = a * c, g = a * u;
  return {
    previous: {
      x: o.x - h * (i.x - s.x),
      y: o.y - h * (i.y - s.y)
    },
    next: {
      x: o.x + g * (i.x - s.x),
      y: o.y + g * (i.y - s.y)
    }
  };
}
function yr(e, t, n) {
  const a = e.length;
  let s, o, i, l, d, c = Ue(e, 0);
  for (let u = 0; u < a - 1; ++u)
    if (d = c, c = Ue(e, u + 1), !(!d || !c)) {
      if (fn(t[u], 0, br)) {
        n[u] = n[u + 1] = 0;
        continue;
      }
      s = n[u] / t[u], o = n[u + 1] / t[u], l = Math.pow(s, 2) + Math.pow(o, 2), !(l <= 9) && (i = 3 / Math.sqrt(l), n[u] = s * i * t[u], n[u + 1] = o * i * t[u]);
    }
}
function _r(e, t, n = "x") {
  const a = Jo(n), s = e.length;
  let o, i, l, d = Ue(e, 0);
  for (let c = 0; c < s; ++c) {
    if (i = l, l = d, d = Ue(e, c + 1), !l)
      continue;
    const u = l[n], h = l[a];
    i && (o = (u - i[n]) / 3, l[`cp1${n}`] = u - o, l[`cp1${a}`] = h - o * t[c]), d && (o = (d[n] - u) / 3, l[`cp2${n}`] = u + o, l[`cp2${a}`] = h + o * t[c]);
  }
}
function xr(e, t = "x") {
  const n = Jo(t), a = e.length, s = Array(a).fill(0), o = Array(a);
  let i, l, d, c = Ue(e, 0);
  for (i = 0; i < a; ++i)
    if (l = d, d = c, c = Ue(e, i + 1), !!d) {
      if (c) {
        const u = c[t] - d[t];
        s[i] = u !== 0 ? (c[n] - d[n]) / u : 0;
      }
      o[i] = l ? c ? oe(s[i - 1]) !== oe(s[i]) ? 0 : (s[i - 1] + s[i]) / 2 : s[i - 1] : s[i];
    }
  yr(e, s, o), _r(e, o, t);
}
function Bn(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
function kr(e, t) {
  let n, a, s, o, i, l = kn(e[0], t);
  for (n = 0, a = e.length; n < a; ++n)
    i = o, o = l, l = n < a - 1 && kn(e[n + 1], t), o && (s = e[n], i && (s.cp1x = Bn(s.cp1x, t.left, t.right), s.cp1y = Bn(s.cp1y, t.top, t.bottom)), l && (s.cp2x = Bn(s.cp2x, t.left, t.right), s.cp2y = Bn(s.cp2y, t.top, t.bottom)));
}
function wr(e, t, n, a, s) {
  let o, i, l, d;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    xr(e, s);
  else {
    let c = a ? e[e.length - 1] : e[0];
    for (o = 0, i = e.length; o < i; ++o)
      l = e[o], d = vr(c, l, e[Math.min(o + 1, i - (a ? 0 : 1)) % i], t.tension), l.cp1x = d.previous.x, l.cp1y = d.previous.y, l.cp2x = d.next.x, l.cp2y = d.next.y, c = l;
  }
  t.capBezierPoints && kr(e, n);
}
function Ya() {
  return typeof window < "u" && typeof document < "u";
}
function qa(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function Xn(e, t, n) {
  let a;
  return typeof e == "string" ? (a = parseInt(e, 10), e.indexOf("%") !== -1 && (a = a / 100 * t.parentNode[n])) : a = e, a;
}
const Jn = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Cr(e, t) {
  return Jn(e).getPropertyValue(t);
}
const $r = [
  "top",
  "right",
  "bottom",
  "left"
];
function Re(e, t, n) {
  const a = {};
  n = n ? "-" + n : "";
  for (let s = 0; s < 4; s++) {
    const o = $r[s];
    a[o] = parseFloat(e[t + "-" + o + n]) || 0;
  }
  return a.width = a.left + a.right, a.height = a.top + a.bottom, a;
}
const Sr = (e, t, n) => (e > 0 || t > 0) && (!n || !n.shadowRoot);
function Mr(e, t) {
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
function Fe(e, t) {
  if ("native" in e)
    return e;
  const { canvas: n, currentDevicePixelRatio: a } = t, s = Jn(n), o = s.boxSizing === "border-box", i = Re(s, "padding"), l = Re(s, "border", "width"), { x: d, y: c, box: u } = Mr(e, n), h = i.left + (u && l.left), g = i.top + (u && l.top);
  let { width: y, height: f } = t;
  return o && (y -= i.width + l.width, f -= i.height + l.height), {
    x: Math.round((d - h) / y * n.width / a),
    y: Math.round((c - g) / f * n.height / a)
  };
}
function Dr(e, t, n) {
  let a, s;
  if (t === void 0 || n === void 0) {
    const o = e && qa(e);
    if (!o)
      t = e.clientWidth, n = e.clientHeight;
    else {
      const i = o.getBoundingClientRect(), l = Jn(o), d = Re(l, "border", "width"), c = Re(l, "padding");
      t = i.width - c.width - d.width, n = i.height - c.height - d.height, a = Xn(l.maxWidth, o, "clientWidth"), s = Xn(l.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: n,
    maxWidth: a || Kn,
    maxHeight: s || Kn
  };
}
const xe = (e) => Math.round(e * 10) / 10;
function Ar(e, t, n, a) {
  const s = Jn(e), o = Re(s, "margin"), i = Xn(s.maxWidth, e, "clientWidth") || Kn, l = Xn(s.maxHeight, e, "clientHeight") || Kn, d = Dr(e, t, n);
  let { width: c, height: u } = d;
  if (s.boxSizing === "content-box") {
    const g = Re(s, "border", "width"), y = Re(s, "padding");
    c -= y.width + g.width, u -= y.height + g.height;
  }
  return c = Math.max(0, c - o.width), u = Math.max(0, a ? c / a : u - o.height), c = xe(Math.min(c, i, d.maxWidth)), u = xe(Math.min(u, l, d.maxHeight)), c && !u && (u = xe(c / 2)), (t !== void 0 || n !== void 0) && a && d.height && u > d.height && (u = d.height, c = xe(Math.floor(u * a))), {
    width: c,
    height: u
  };
}
function xs(e, t, n) {
  const a = t || 1, s = xe(e.height * a), o = xe(e.width * a);
  e.height = xe(e.height), e.width = xe(e.width);
  const i = e.canvas;
  return i.style && (n || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== a || i.height !== s || i.width !== o ? (e.currentDevicePixelRatio = a, i.height = s, i.width = o, e.ctx.setTransform(a, 0, 0, a, 0, 0), !0) : !1;
}
const Tr = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    Ya() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function ks(e, t) {
  const n = Cr(e, t), a = n && n.match(/^(\d+)(\.\d+)?px$/);
  return a ? +a[1] : void 0;
}
function Ee(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: e.y + n * (t.y - e.y)
  };
}
function Br(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: a === "middle" ? n < 0.5 ? e.y : t.y : a === "after" ? n < 1 ? e.y : t.y : n > 0 ? t.y : e.y
  };
}
function Lr(e, t, n, a) {
  const s = {
    x: e.cp2x,
    y: e.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, i = Ee(e, s, n), l = Ee(s, o, n), d = Ee(o, t, n), c = Ee(i, l, n), u = Ee(l, d, n);
  return Ee(c, u, n);
}
const Fr = function(e, t) {
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
}, Er = function() {
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
function qe(e, t, n) {
  return e ? Fr(t, n) : Er();
}
function ti(e, t) {
  let n, a;
  (t === "ltr" || t === "rtl") && (n = e.canvas.style, a = [
    n.getPropertyValue("direction"),
    n.getPropertyPriority("direction")
  ], n.setProperty("direction", t, "important"), e.prevTextDirection = a);
}
function ei(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function ni(e) {
  return e === "angle" ? {
    between: xn,
    compare: Fl,
    normalize: Jt
  } : {
    between: _e,
    compare: (t, n) => t - n,
    normalize: (t) => t
  };
}
function ws({ start: e, end: t, count: n, loop: a, style: s }) {
  return {
    start: e % n,
    end: t % n,
    loop: a && (t - e + 1) % n === 0,
    style: s
  };
}
function Ir(e, t, n) {
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
function Pr(e, t, n) {
  if (!n)
    return [
      e
    ];
  const { property: a, start: s, end: o } = n, i = t.length, { compare: l, between: d, normalize: c } = ni(a), { start: u, end: h, loop: g, style: y } = Ir(e, t, n), f = [];
  let m = !1, v = null, p, b, x;
  const w = () => d(s, x, p) && l(s, x) !== 0, D = () => l(o, p) === 0 || d(o, x, p), S = () => m || w(), C = () => !m || D();
  for (let $ = u, L = u; $ <= h; ++$)
    b = t[$ % i], !b.skip && (p = c(b[a]), p !== x && (m = d(p, s, o), v === null && S() && (v = l(p, s) === 0 ? $ : L), v !== null && C() && (f.push(ws({
      start: v,
      end: $,
      loop: g,
      count: i,
      style: y
    })), v = null), L = $, x = p));
  return v !== null && f.push(ws({
    start: v,
    end: h,
    loop: g,
    count: i,
    style: y
  })), f;
}
function Rr(e, t) {
  const n = [], a = e.segments;
  for (let s = 0; s < a.length; s++) {
    const o = Pr(a[s], e.points, t);
    o.length && n.push(...o);
  }
  return n;
}
function Or(e, t, n, a) {
  let s = 0, o = t - 1;
  if (n && !a)
    for (; s < t && !e[s].skip; )
      s++;
  for (; s < t && e[s].skip; )
    s++;
  for (s %= t, n && (o += s); o > s && e[o % t].skip; )
    o--;
  return o %= t, {
    start: s,
    end: o
  };
}
function zr(e, t, n, a) {
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
  return i !== null && o.push({
    start: t % s,
    end: i % s,
    loop: a
  }), o;
}
function Vr(e, t) {
  const n = e.points, a = e.options.spanGaps, s = n.length;
  if (!s)
    return [];
  const o = !!e._loop, { start: i, end: l } = Or(n, s, o, a);
  if (a === !0)
    return Cs(e, [
      {
        start: i,
        end: l,
        loop: o
      }
    ], n, t);
  const d = l < i ? l + s : l, c = !!e._fullLoop && i === 0 && l === s - 1;
  return Cs(e, zr(n, i, d, c), n, t);
}
function Cs(e, t, n, a) {
  return !a || !a.setContext || !n ? t : Nr(e, t, n, a);
}
function Nr(e, t, n, a) {
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
      }))), Wr(v, u) && y(h, g - 1, f.loop, u), m = p, u = v;
    }
    h < g - 1 && y(h, g - 1, f.loop, u);
  }
  return c;
}
function $s(e) {
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
function Wr(e, t) {
  if (!t)
    return !1;
  const n = [], a = function(s, o) {
    return Ra(o) ? (n.includes(o) || n.push(o), n.indexOf(o)) : o;
  };
  return JSON.stringify(e, a) !== JSON.stringify(t, a);
}
function Ln(e, t, n) {
  return e.options.clip ? e[n] : t[n];
}
function Hr(e, t) {
  const { xScale: n, yScale: a } = e;
  return n && a ? {
    left: Ln(n, t, "left"),
    right: Ln(n, t, "right"),
    top: Ln(a, t, "top"),
    bottom: Ln(a, t, "bottom")
  } : t;
}
function jr(e, t) {
  const n = t._clip;
  if (n.disabled)
    return !1;
  const a = Hr(t, e.chartArea);
  return {
    left: n.left === !1 ? 0 : a.left - (n.left === !0 ? 0 : n.left),
    right: n.right === !1 ? e.width : a.right + (n.right === !0 ? 0 : n.right),
    top: n.top === !1 ? 0 : a.top - (n.top === !0 ? 0 : n.top),
    bottom: n.bottom === !1 ? e.height : a.bottom + (n.bottom === !0 ? 0 : n.bottom)
  };
}
class Yr {
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
    this._request || (this._running = !0, this._request = jo.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let n = 0;
    this._charts.forEach((a, s) => {
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
    n && (n.running = !0, n.start = Date.now(), n.duration = n.items.reduce((a, s) => Math.max(a, s._duration), 0), this._refresh());
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
    let s = a.length - 1;
    for (; s >= 0; --s)
      a[s].cancel();
    n.items = [], this._notify(t, n, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var re = /* @__PURE__ */ new Yr();
const Ss = "transparent", qr = {
  boolean(e, t, n) {
    return n > 0.5 ? t : e;
  },
  color(e, t, n) {
    const a = ps(e || Ss), s = a.valid && ps(t || Ss);
    return s && s.valid ? s.mix(a, n).hexString() : t;
  },
  number(e, t, n) {
    return e + (t - e) * n;
  }
};
class Kr {
  constructor(t, n, a, s) {
    const o = n[a];
    s = Tn([
      t.to,
      s,
      o,
      t.from
    ]);
    const i = Tn([
      t.from,
      o,
      s
    ]);
    this._active = !0, this._fn = t.fn || qr[t.type || typeof i], this._easing = gn[t.easing] || gn.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = n, this._prop = a, this._from = i, this._to = s, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, n, a) {
    if (this._active) {
      this._notify(!1);
      const s = this._target[this._prop], o = a - this._start, i = this._duration - o;
      this._start = a, this._duration = Math.floor(Math.max(i, t.duration)), this._total += o, this._loop = !!t.loop, this._to = Tn([
        t.to,
        n,
        s,
        t.from
      ]), this._from = Tn([
        t.from,
        s,
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
      this._target[s] = o;
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
    for (let s = 0; s < a.length; s++)
      a[s][n]();
  }
}
class ai {
  constructor(t, n) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(n);
  }
  configure(t) {
    if (!vt(t))
      return;
    const n = Object.keys(Tt.animation), a = this._properties;
    Object.getOwnPropertyNames(t).forEach((s) => {
      const o = t[s];
      if (!vt(o))
        return;
      const i = {};
      for (const l of n)
        i[l] = o[l];
      (Ft(o.properties) && o.properties || [
        s
      ]).forEach((l) => {
        (l === s || !a.has(l)) && a.set(l, i);
      });
    });
  }
  _animateOptions(t, n) {
    const a = n.options, s = Xr(t, a);
    if (!s)
      return [];
    const o = this._createAnimations(s, a);
    return a.$shared && Ur(t.options.$animations, a).then(() => {
      t.options = a;
    }, () => {
    }), o;
  }
  _createAnimations(t, n) {
    const a = this._properties, s = [], o = t.$animations || (t.$animations = {}), i = Object.keys(n), l = Date.now();
    let d;
    for (d = i.length - 1; d >= 0; --d) {
      const c = i[d];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        s.push(...this._animateOptions(t, n));
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
      o[c] = h = new Kr(g, t, c, u), s.push(h);
    }
    return s;
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
function Ur(e, t) {
  const n = [], a = Object.keys(t);
  for (let s = 0; s < a.length; s++) {
    const o = e[a[s]];
    o && o.active() && n.push(o.wait());
  }
  return Promise.all(n);
}
function Xr(e, t) {
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
function Ms(e, t) {
  const n = e && e.options || {}, a = n.reverse, s = n.min === void 0 ? t : 0, o = n.max === void 0 ? t : 0;
  return {
    start: a ? o : s,
    end: a ? s : o
  };
}
function Gr(e, t, n) {
  if (n === !1)
    return !1;
  const a = Ms(e, n), s = Ms(t, n);
  return {
    top: s.end,
    right: a.end,
    bottom: s.start,
    left: a.start
  };
}
function Zr(e) {
  let t, n, a, s;
  return vt(e) ? (t = e.top, n = e.right, a = e.bottom, s = e.left) : t = n = a = s = e, {
    top: t,
    right: n,
    bottom: a,
    left: s,
    disabled: e === !1
  };
}
function si(e, t) {
  const n = [], a = e._getSortedDatasetMetas(t);
  let s, o;
  for (s = 0, o = a.length; s < o; ++s)
    n.push(a[s].index);
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
    c = e.values[d], Gt(c) && (o || t === 0 || oe(t) === oe(c)) && (t += c);
  }
  return !u && !a.all ? 0 : t;
}
function Qr(e, t) {
  const { iScale: n, vScale: a } = t, s = n.axis === "x" ? "x" : "y", o = a.axis === "x" ? "x" : "y", i = Object.keys(e), l = new Array(i.length);
  let d, c, u;
  for (d = 0, c = i.length; d < c; ++d)
    u = i[d], l[d] = {
      [s]: u,
      [o]: e[u]
    };
  return l;
}
function ca(e, t) {
  const n = e && e.options.stacked;
  return n || n === void 0 && t.stack !== void 0;
}
function Jr(e, t, n) {
  return `${e.id}.${t.id}.${n.stack || n.type}`;
}
function tc(e) {
  const { min: t, max: n, minDefined: a, maxDefined: s } = e.getUserBounds();
  return {
    min: a ? t : Number.NEGATIVE_INFINITY,
    max: s ? n : Number.POSITIVE_INFINITY
  };
}
function ec(e, t, n) {
  const a = e[t] || (e[t] = {});
  return a[n] || (a[n] = {});
}
function As(e, t, n, a) {
  for (const s of t.getMatchingVisibleMetas(a).reverse()) {
    const o = e[s.index];
    if (n && o > 0 || !n && o < 0)
      return s.index;
  }
  return null;
}
function Ts(e, t) {
  const { chart: n, _cachedMeta: a } = e, s = n._stacks || (n._stacks = {}), { iScale: o, vScale: i, index: l } = a, d = o.axis, c = i.axis, u = Jr(o, i, a), h = t.length;
  let g;
  for (let y = 0; y < h; ++y) {
    const f = t[y], { [d]: m, [c]: v } = f, p = f._stacks || (f._stacks = {});
    g = p[c] = ec(s, u, m), g[l] = v, g._top = As(g, i, !0, a.type), g._bottom = As(g, i, !1, a.type);
    const b = g._visualValues || (g._visualValues = {});
    b[l] = v;
  }
}
function da(e, t) {
  const n = e.scales;
  return Object.keys(n).filter((a) => n[a].axis === t).shift();
}
function nc(e, t) {
  return Ve(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function ac(e, t, n) {
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
function Ze(e, t) {
  const n = e.controller.index, a = e.vScale && e.vScale.axis;
  if (a) {
    t = t || e._parsed;
    for (const s of t) {
      const o = s._stacks;
      if (!o || o[a] === void 0 || o[a][n] === void 0)
        return;
      delete o[a][n], o[a]._visualValues !== void 0 && o[a]._visualValues[n] !== void 0 && delete o[a]._visualValues[n];
    }
  }
}
const ua = (e) => e === "reset" || e === "none", Bs = (e, t) => t ? e : Object.assign({}, e), sc = (e, t, n) => e && !t.hidden && t._stacked && {
  keys: si(n, !0),
  values: null
};
class ta {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, n) {
    this.chart = t, this._ctx = t.ctx, this.index = n, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = ca(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && Ze(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, n = this._cachedMeta, a = this.getDataset(), s = (h, g, y, f) => h === "x" ? g : h === "r" ? f : y, o = n.xAxisID = dt(a.xAxisID, da(t, "x")), i = n.yAxisID = dt(a.yAxisID, da(t, "y")), l = n.rAxisID = dt(a.rAxisID, da(t, "r")), d = n.indexAxis, c = n.iAxisID = s(d, o, i, l), u = n.vAxisID = s(d, i, o, l);
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
    this._data && hs(this._data, this), t._stacked && Ze(t);
  }
  _dataCheck() {
    const t = this.getDataset(), n = t.data || (t.data = []), a = this._data;
    if (vt(n)) {
      const s = this._cachedMeta;
      this._data = Qr(n, s);
    } else if (a !== n) {
      if (a) {
        hs(a, this);
        const s = this._cachedMeta;
        Ze(s), s._parsed = [];
      }
      n && Object.isExtensible(n) && Rl(n, this), this._syncList = [], this._data = n;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const n = this._cachedMeta, a = this.getDataset();
    let s = !1;
    this._dataCheck();
    const o = n._stacked;
    n._stacked = ca(n.vScale, n), n.stack !== a.stack && (s = !0, Ze(n), n.stack = a.stack), this._resyncElements(t), (s || o !== n._stacked) && (Ts(this, n._parsed), n._stacked = ca(n.vScale, n));
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
      Ft(s[t]) ? g = this.parseArrayData(a, s, t, n) : vt(s[t]) ? g = this.parseObjectData(a, s, t, n) : g = this.parsePrimitiveData(a, s, t, n);
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
    const a = this._cachedMeta, s = a._parsed, o = a._sorted && t === a.iScale, i = s.length, l = this._getOtherScale(t), d = sc(n, a, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: u, max: h } = tc(l);
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
    let s, o, i;
    for (s = 0, o = n.length; s < o; ++s)
      i = n[s][t.axis], Gt(i) && a.push(i);
    return a;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, a = n.iScale, s = n.vScale, o = this.getParsed(t);
    return {
      label: a ? "" + a.getLabelForValue(o[a.axis]) : "",
      value: s ? "" + s.getLabelForValue(o[s.axis]) : ""
    };
  }
  _update(t) {
    const n = this._cachedMeta;
    this.update(t || "default"), n._clip = Zr(dt(this.options.clip, Gr(n.xScale, n.yScale, this.getMaxOverflow())));
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
      i[u].draw(t, o);
  }
  getStyle(t, n) {
    const a = n ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(a) : this.resolveDataElementOptions(t || 0, a);
  }
  getContext(t, n, a) {
    const s = this.getDataset();
    let o;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const i = this._cachedMeta.data[t];
      o = i.$context || (i.$context = ac(this.getContext(), t, i)), o.parsed = this.getParsed(t), o.raw = s.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = nc(this.chart.getContext(), this.index)), o.dataset = s, o.index = o.datasetIndex = this.index;
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
    const c = new ai(s, d && d.animations);
    return d && d._cacheable && (o[i] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, n) {
    return !n || ua(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, n) {
    const a = this.resolveDataElementOptions(t, n), s = this._sharedOptions, o = this.getSharedOptions(a), i = this.includeOptions(n, o) || o !== s;
    return this.updateSharedOptions(o, n, a), {
      sharedOptions: o,
      includeOptions: i
    };
  }
  updateElement(t, n, a, s) {
    ua(s) ? Object.assign(t, a) : this._resolveAnimations(n, s).update(t, a);
  }
  updateSharedOptions(t, n, a) {
    t && !ua(n) && this._resolveAnimations(void 0, n).update(t, a);
  }
  _setStyle(t, n, a, s) {
    t.active = s;
    const o = this.getStyle(n, s);
    this._resolveAnimations(n, a, s).update(t, {
      options: !s && this.getSharedOptions(o) || o
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
    const s = a.length, o = n.length, i = Math.min(o, s);
    i && this.parse(0, i), o > s ? this._insertElements(s, o - s, t) : o < s && this._removeElements(o, s - o);
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
  updateElements(t, n, a, s) {
  }
  _removeElements(t, n) {
    const a = this._cachedMeta;
    if (this._parsing) {
      const s = a._parsed.splice(t, n);
      a._stacked && Ze(a, s);
    }
    a.data.splice(t, n);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [n, a, s] = t;
      this[n](a, s);
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
function oc(e, t) {
  if (!e._cache.$bar) {
    const n = e.getMatchingVisibleMetas(t);
    let a = [];
    for (let s = 0, o = n.length; s < o; s++)
      a = a.concat(n[s].controller.getAllParsedValues(e));
    e._cache.$bar = Ho(a.sort((s, o) => s - o));
  }
  return e._cache.$bar;
}
function ic(e) {
  const t = e.iScale, n = oc(t, e.type);
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
function lc(e, t, n, a) {
  const s = n.barThickness;
  let o, i;
  return _t(s) ? (o = t.min * n.categoryPercentage, i = n.barPercentage) : (o = s * a, i = 1), {
    chunk: o / a,
    ratio: i,
    start: t.pixels[e] - o / 2
  };
}
function rc(e, t, n, a) {
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
function cc(e, t, n, a) {
  const s = n.parse(e[0], a), o = n.parse(e[1], a), i = Math.min(s, o), l = Math.max(s, o);
  let d = i, c = l;
  Math.abs(i) > Math.abs(l) && (d = l, c = i), t[n.axis] = c, t._custom = {
    barStart: d,
    barEnd: c,
    start: s,
    end: o,
    min: i,
    max: l
  };
}
function oi(e, t, n, a) {
  return Ft(e) ? cc(e, t, n, a) : t[n.axis] = n.parse(e, a), t;
}
function Ls(e, t, n, a) {
  const s = e.iScale, o = e.vScale, i = s.getLabels(), l = s === o, d = [];
  let c, u, h, g;
  for (c = n, u = n + a; c < u; ++c)
    g = t[c], h = {}, h[s.axis] = l || s.parse(i[c], c), d.push(oi(g, h, o, c));
  return d;
}
function ha(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function dc(e, t, n) {
  return e !== 0 ? oe(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= n ? 1 : -1);
}
function uc(e) {
  let t, n, a, s, o;
  return e.horizontal ? (t = e.base > e.x, n = "left", a = "right") : (t = e.base < e.y, n = "bottom", a = "top"), t ? (s = "end", o = "start") : (s = "start", o = "end"), {
    start: n,
    end: a,
    reverse: t,
    top: s,
    bottom: o
  };
}
function hc(e, t, n, a) {
  let s = t.borderSkipped;
  const o = {};
  if (!s) {
    e.borderSkipped = o;
    return;
  }
  if (s === !0) {
    e.borderSkipped = {
      top: !0,
      right: !0,
      bottom: !0,
      left: !0
    };
    return;
  }
  const { start: i, end: l, reverse: d, top: c, bottom: u } = uc(e);
  s === "middle" && n && (e.enableBorderRadius = !0, (n._top || 0) === a ? s = c : (n._bottom || 0) === a ? s = u : (o[Fs(u, i, l, d)] = !0, s = c)), o[Fs(s, i, l, d)] = !0, e.borderSkipped = o;
}
function Fs(e, t, n, a) {
  return a ? (e = fc(e, t, n), e = Es(e, n, t)) : e = Es(e, t, n), e;
}
function fc(e, t, n) {
  return e === t ? n : e === n ? t : e;
}
function Es(e, t, n) {
  return e === "start" ? t : e === "end" ? n : e;
}
function gc(e, { inflateAmount: t }, n) {
  e.inflateAmount = t === "auto" ? n === 1 ? 0.33 : 0 : t;
}
class pc extends ta {
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
  parsePrimitiveData(t, n, a, s) {
    return Ls(t, n, a, s);
  }
  parseArrayData(t, n, a, s) {
    return Ls(t, n, a, s);
  }
  parseObjectData(t, n, a, s) {
    const { iScale: o, vScale: i } = t, { xAxisKey: l = "x", yAxisKey: d = "y" } = this._parsing, c = o.axis === "x" ? l : d, u = i.axis === "x" ? l : d, h = [];
    let g, y, f, m;
    for (g = a, y = a + s; g < y; ++g)
      m = n[g], f = {}, f[o.axis] = o.parse(Oe(m, c), g), h.push(oi(Oe(m, u), f, i, g));
    return h;
  }
  updateRangeFromParsed(t, n, a, s) {
    super.updateRangeFromParsed(t, n, a, s);
    const o = a._custom;
    o && n === this._cachedMeta.vScale && (t.min = Math.min(t.min, o.min), t.max = Math.max(t.max, o.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, { iScale: a, vScale: s } = n, o = this.getParsed(t), i = o._custom, l = ha(i) ? "[" + i.start + ", " + i.end + "]" : "" + s.getLabelForValue(o[s.axis]);
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
        enableBorderRadius: !p || ha(f._custom) || i === p._top || i === p._bottom,
        x: c ? m.head : v.center,
        y: c ? v.center : m.head,
        height: c ? v.size : Math.abs(m.size),
        width: c ? Math.abs(m.size) : v.size
      };
      g && (b.options = h || this.resolveDataElementOptions(y, t[y].active ? "active" : s));
      const x = b.options || t[y].options;
      hc(b, x, p, i), gc(b, x, u.ratio), this.updateElement(t[y], y, b, s);
    }
  }
  _getStacks(t, n) {
    const { iScale: a } = this._cachedMeta, s = a.getMatchingVisibleMetas(this._type).filter((u) => u.controller.options.grouped), o = a.options.stacked, i = [], l = this._cachedMeta.controller.getParsed(n), d = l && l[a.axis], c = (u) => {
      const h = u._parsed.find((y) => y[a.axis] === d), g = h && h[u.vScale.axis];
      if (_t(g) || isNaN(g))
        return !0;
    };
    for (const u of s)
      if (!(n !== void 0 && c(u)) && ((o === !1 || i.indexOf(u.stack) === -1 || o === void 0 && u.stack === void 0) && i.push(u.stack), u.index === t))
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
      t[dt(this.chart.options.indexAxis === "x" ? a.xAxisID : a.yAxisID, n)] = !0;
    return Object.keys(t);
  }
  _getStackIndex(t, n, a) {
    const s = this._getStacks(t, a), o = n !== void 0 ? s.indexOf(n) : -1;
    return o === -1 ? s.length - 1 : o;
  }
  _getRuler() {
    const t = this.options, n = this._cachedMeta, a = n.iScale, s = [];
    let o, i;
    for (o = 0, i = n.data.length; o < i; ++o)
      s.push(a.getPixelForValue(this.getParsed(o)[a.axis], o));
    const l = t.barThickness;
    return {
      min: l || ic(n),
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
    const { _cachedMeta: { vScale: n, _stacked: a, index: s }, options: { base: o, minBarLength: i } } = this, l = o || 0, d = this.getParsed(t), c = d._custom, u = ha(c);
    let h = d[n.axis], g = 0, y = a ? this.applyStack(n, d, a) : h, f, m;
    y !== h && (g = y - h, y = h), u && (h = c.barStart, y = c.barEnd - c.barStart, h !== 0 && oe(h) !== oe(c.barEnd) && (g = 0), g += h);
    const v = !_t(o) && !u ? o : g;
    let p = n.getPixelForValue(v);
    if (this.chart.getDataVisibility(t) ? f = n.getPixelForValue(g + y) : f = p, m = f - p, Math.abs(m) < i) {
      m = dc(m, n, l) * i, h === l && (p -= m / 2);
      const b = n.getPixelForDecimal(0), x = n.getPixelForDecimal(1), w = Math.min(b, x), D = Math.max(b, x);
      p = Math.max(Math.min(p, D), w), f = p + m, a && !u && (d._stacks[n.axis]._visualValues[s] = n.getValueForPixel(f) - n.getValueForPixel(p));
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
    const a = n.scale, s = this.options, o = s.skipNull, i = dt(s.maxBarThickness, 1 / 0);
    let l, d;
    const c = this._getAxisCount();
    if (n.grouped) {
      const u = o ? this._getStackCount(t) : n.stackCount, h = s.barThickness === "flex" ? rc(t, n, s, u * c) : lc(t, n, s, u * c), g = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, y = this._getAxis().indexOf(dt(g, this.getFirstScaleIdForIndexAxis())), f = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + y;
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
    const t = this._cachedMeta, n = t.vScale, a = t.data, s = a.length;
    let o = 0;
    for (; o < s; ++o)
      this.getParsed(o)[n.axis] !== null && !a[o].hidden && a[o].draw(this._ctx);
  }
}
function mc(e, t, n) {
  let a = 1, s = 1, o = 0, i = 0;
  if (t < At) {
    const l = e, d = l + t, c = Math.cos(l), u = Math.sin(l), h = Math.cos(d), g = Math.sin(d), y = (x, w, D) => xn(x, l, d, !0) ? 1 : Math.max(w, w * n, D, D * n), f = (x, w, D) => xn(x, l, d, !0) ? -1 : Math.min(w, w * n, D, D * n), m = y(0, c, h), v = y(Et, u, g), p = f(wt, c, h), b = f(wt + Et, u, g);
    a = (m - p) / 2, s = (v - b) / 2, o = -(m + p) / 2, i = -(v + b) / 2;
  }
  return {
    ratioX: a,
    ratioY: s,
    offsetX: o,
    offsetY: i
  };
}
class bc extends ta {
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
                fontColor: o,
                hidden: !t.getDataVisibility(c),
                lineDash: h.borderDash,
                lineDashOffset: h.borderDashOffset,
                lineJoin: h.borderJoinStyle,
                lineWidth: h.borderWidth,
                strokeStyle: h.borderColor,
                textAlign: s,
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
    const a = this.getDataset().data, s = this._cachedMeta;
    if (this._parsing === !1)
      s._parsed = a;
    else {
      let o = (d) => +a[d];
      if (vt(a[t])) {
        const { key: d = "value" } = this._parsing;
        o = (c) => +Oe(a[c], d);
      }
      let i, l;
      for (i = t, l = t + n; i < l; ++i)
        s._parsed[i] = o(i);
    }
  }
  _getRotation() {
    return ue(this.options.rotation - 90);
  }
  _getCircumference() {
    return ue(this.options.circumference);
  }
  _getRotationExtents() {
    let t = At, n = -At;
    for (let a = 0; a < this.chart.data.datasets.length; ++a)
      if (this.chart.isDatasetVisible(a) && this.chart.getDatasetMeta(a).type === this._type) {
        const s = this.chart.getDatasetMeta(a).controller, o = s._getRotation(), i = s._getCircumference();
        t = Math.min(t, o), n = Math.max(n, o + i);
      }
    return {
      rotation: t,
      circumference: n - t
    };
  }
  update(t) {
    const n = this.chart, { chartArea: a } = n, s = this._cachedMeta, o = s.data, i = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, l = Math.max((Math.min(a.width, a.height) - i) / 2, 0), d = Math.min(_l(this.options.cutout, l), 1), c = this._getRingWeight(this.index), { circumference: u, rotation: h } = this._getRotationExtents(), { ratioX: g, ratioY: y, offsetX: f, offsetY: m } = mc(h, u, d), v = (a.width - i) / g, p = (a.height - i) / y, b = Math.max(Math.min(v, p) / 2, 0), x = Oo(this.options.radius, b), w = Math.max(x * d, 0), D = (x - w) / this._getVisibleDatasetWeightTotal();
    this.offsetX = f * x, this.offsetY = m * x, s.total = this.calculateTotal(), this.outerRadius = x - D * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - D * c, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, n) {
    const a = this.options, s = this._cachedMeta, o = this._getCircumference();
    return n && a.animation.animateRotate || !this.chart.getDataVisibility(t) || s._parsed[t] === null || s.data[t].hidden ? 0 : this.calculateCircumference(s._parsed[t] * o / At);
  }
  updateElements(t, n, a, s) {
    const o = s === "reset", i = this.chart, l = i.chartArea, c = i.options.animation, u = (l.left + l.right) / 2, h = (l.top + l.bottom) / 2, g = o && c.animateScale, y = g ? 0 : this.innerRadius, f = g ? 0 : this.outerRadius, { sharedOptions: m, includeOptions: v } = this._getSharedOptions(n, s);
    let p = this._getRotation(), b;
    for (b = 0; b < n; ++b)
      p += this._circumference(b, o);
    for (b = n; b < n + a; ++b) {
      const x = this._circumference(b, o), w = t[b], D = {
        x: u + this.offsetX,
        y: h + this.offsetY,
        startAngle: p,
        endAngle: p + x,
        circumference: x,
        outerRadius: f,
        innerRadius: y
      };
      v && (D.options = m || this.resolveDataElementOptions(b, w.active ? "active" : s)), p += x, this.updateElement(w, b, D, s);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, n = t.data;
    let a = 0, s;
    for (s = 0; s < n.length; s++) {
      const o = t._parsed[s];
      o !== null && !isNaN(o) && this.chart.getDataVisibility(s) && !n[s].hidden && (a += Math.abs(o));
    }
    return a;
  }
  calculateCircumference(t) {
    const n = this._cachedMeta.total;
    return n > 0 && !isNaN(t) ? At * (Math.abs(t) / n) : 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, a = this.chart, s = a.data.labels || [], o = Oa(n._parsed[t], a.options.locale);
    return {
      label: s[t] || "",
      value: o
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
    for (let a = 0, s = t.length; a < s; ++a) {
      const o = this.resolveDataElementOptions(a);
      n = Math.max(n, o.offset || 0, o.hoverOffset || 0);
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
    return Math.max(dt(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class vc extends ta {
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
    let { start: l, count: d } = Vl(n, s, i);
    this._drawStart = l, this._drawCount = d, Nl(n) && (l = 0, d = s.length), a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!o._decimated, a.points = s;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(a, void 0, {
      animated: !i,
      options: c
    }, t), this.updateElements(s, l, d, t);
  }
  updateElements(t, n, a, s) {
    const o = s === "reset", { iScale: i, vScale: l, _stacked: d, _dataset: c } = this._cachedMeta, { sharedOptions: u, includeOptions: h } = this._getSharedOptions(n, s), g = i.axis, y = l.axis, { spanGaps: f, segment: m } = this.options, v = _n(f) ? f : Number.POSITIVE_INFINITY, p = this.chart._animationsDisabled || o || s === "none", b = n + a, x = t.length;
    let w = n > 0 && this.getParsed(n - 1);
    for (let D = 0; D < x; ++D) {
      const S = t[D], C = p ? S : {};
      if (D < n || D >= b) {
        C.skip = !0;
        continue;
      }
      const $ = this.getParsed(D), L = _t($[y]), T = C[g] = i.getPixelForValue($[g], D), B = C[y] = o || L ? l.getBasePixel() : l.getPixelForValue(d ? this.applyStack(l, $, d) : $[y], D);
      C.skip = isNaN(T) || isNaN(B) || L, C.stop = D > 0 && Math.abs($[g] - w[g]) > v, m && (C.parsed = $, C.raw = c.data[D]), h && (C.options = u || this.resolveDataElementOptions(D, S.active ? "active" : s)), p || this.updateElement(S, D, C, s), w = $;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, n = t.dataset, a = n.options && n.options.borderWidth || 0, s = t.data || [];
    if (!s.length)
      return a;
    const o = s[0].size(this.resolveDataElementOptions(0)), i = s[s.length - 1].size(this.resolveDataElementOptions(s.length - 1));
    return Math.max(a, o, i) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
class yc extends bc {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function Be() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class Ka {
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
    Object.assign(Ka.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return Be();
  }
  parse() {
    return Be();
  }
  format() {
    return Be();
  }
  add() {
    return Be();
  }
  diff() {
    return Be();
  }
  startOf() {
    return Be();
  }
  endOf() {
    return Be();
  }
}
var _c = {
  _date: Ka
};
function xc(e, t, n, a) {
  const { controller: s, data: o, _sorted: i } = e, l = s._cachedMeta.iScale, d = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (l && t === l.axis && t !== "r" && i && o.length) {
    const c = l._reversePixels ? Il : Ie;
    if (a) {
      if (s._sharedOptions) {
        const u = o[0], h = typeof u.getRange == "function" && u.getRange(t);
        if (h) {
          const g = c(o, t, n - h), y = c(o, t, n + h);
          return {
            lo: g.lo,
            hi: y.hi
          };
        }
      }
    } else {
      const u = c(o, t, n);
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
    hi: o.length - 1
  };
}
function ea(e, t, n, a, s) {
  const o = e.getSortedVisibleDatasetMetas(), i = n[t];
  for (let l = 0, d = o.length; l < d; ++l) {
    const { index: c, data: u } = o[l], { lo: h, hi: g } = xc(o[l], t, i, s);
    for (let y = h; y <= g; ++y) {
      const f = u[y];
      f.skip || a(f, c, y);
    }
  }
}
function kc(e) {
  const t = e.indexOf("x") !== -1, n = e.indexOf("y") !== -1;
  return function(a, s) {
    const o = t ? Math.abs(a.x - s.x) : 0, i = n ? Math.abs(a.y - s.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(i, 2));
  };
}
function fa(e, t, n, a, s) {
  const o = [];
  return !s && !e.isPointInArea(t) || ea(e, n, t, function(l, d, c) {
    !s && !kn(l, e.chartArea, 0) || l.inRange(t.x, t.y, a) && o.push({
      element: l,
      datasetIndex: d,
      index: c
    });
  }, !0), o;
}
function wc(e, t, n, a) {
  let s = [];
  function o(i, l, d) {
    const { startAngle: c, endAngle: u } = i.getProps([
      "startAngle",
      "endAngle"
    ], a), { angle: h } = No(i, {
      x: t.x,
      y: t.y
    });
    xn(h, c, u) && s.push({
      element: i,
      datasetIndex: l,
      index: d
    });
  }
  return ea(e, n, t, o), s;
}
function Cc(e, t, n, a, s, o) {
  let i = [];
  const l = kc(n);
  let d = Number.POSITIVE_INFINITY;
  function c(u, h, g) {
    const y = u.inRange(t.x, t.y, s);
    if (a && !y)
      return;
    const f = u.getCenterPoint(s);
    if (!(!!o || e.isPointInArea(f)) && !y)
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
  return ea(e, n, t, c), i;
}
function ga(e, t, n, a, s, o) {
  return !o && !e.isPointInArea(t) ? [] : n === "r" && !a ? wc(e, t, n, s) : Cc(e, t, n, a, s, o);
}
function Is(e, t, n, a, s) {
  const o = [], i = n === "x" ? "inXRange" : "inYRange";
  let l = !1;
  return ea(e, n, t, (d, c, u) => {
    d[i] && d[i](t[n], s) && (o.push({
      element: d,
      datasetIndex: c,
      index: u
    }), l = l || d.inRange(t.x, t.y, s));
  }), a && !l ? [] : o;
}
var $c = {
  modes: {
    index(e, t, n, a) {
      const s = Fe(t, e), o = n.axis || "x", i = n.includeInvisible || !1, l = n.intersect ? fa(e, s, o, a, i) : ga(e, s, o, !1, a, i), d = [];
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
      let l = n.intersect ? fa(e, s, o, a, i) : ga(e, s, o, !1, a, i);
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
      const s = Fe(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      return fa(e, s, o, a, i);
    },
    nearest(e, t, n, a) {
      const s = Fe(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      return ga(e, s, o, n.intersect, a, i);
    },
    x(e, t, n, a) {
      const s = Fe(t, e);
      return Is(e, s, "x", n.intersect, a);
    },
    y(e, t, n, a) {
      const s = Fe(t, e);
      return Is(e, s, "y", n.intersect, a);
    }
  }
};
const ii = [
  "left",
  "top",
  "right",
  "bottom"
];
function Qe(e, t) {
  return e.filter((n) => n.pos === t);
}
function Ps(e, t) {
  return e.filter((n) => ii.indexOf(n.pos) === -1 && n.box.axis === t);
}
function Je(e, t) {
  return e.sort((n, a) => {
    const s = t ? a : n, o = t ? n : a;
    return s.weight === o.weight ? s.index - o.index : s.weight - o.weight;
  });
}
function Sc(e) {
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
function Mc(e) {
  const t = {};
  for (const n of e) {
    const { stack: a, pos: s, stackWeight: o } = n;
    if (!a || !ii.includes(s))
      continue;
    const i = t[a] || (t[a] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    i.count++, i.weight += o;
  }
  return t;
}
function Dc(e, t) {
  const n = Mc(e), { vBoxMaxWidth: a, hBoxMaxHeight: s } = t;
  let o, i, l;
  for (o = 0, i = e.length; o < i; ++o) {
    l = e[o];
    const { fullSize: d } = l.box, c = n[l.stack], u = c && l.stackWeight / c.weight;
    l.horizontal ? (l.width = u ? u * a : d && t.availableWidth, l.height = s) : (l.width = a, l.height = u ? u * s : d && t.availableHeight);
  }
  return n;
}
function Ac(e) {
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
function Rs(e, t, n, a) {
  return Math.max(e[n], t[n]) + Math.max(e[a], t[a]);
}
function li(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Tc(e, t, n, a) {
  const { pos: s, box: o } = n, i = e.maxPadding;
  if (!vt(s)) {
    n.size && (e[s] -= n.size);
    const h = a[n.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, n.horizontal ? o.height : o.width), n.size = h.size / h.count, e[s] += n.size;
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
function Bc(e) {
  const t = e.maxPadding;
  function n(a) {
    const s = Math.max(t[a] - e[a], 0);
    return e[a] += s, s;
  }
  e.y += n("top"), e.x += n("left"), n("right"), n("bottom");
}
function Lc(e, t) {
  const n = t.maxPadding;
  function a(s) {
    const o = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return s.forEach((i) => {
      o[i] = Math.max(t[i], n[i]);
    }), o;
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
    l = e[o], d = l.box, d.update(l.width || t.w, l.height || t.h, Lc(l.horizontal, t));
    const { same: h, other: g } = Tc(t, n, l, a);
    c |= h && s.length, u = u || g, d.fullSize || s.push(l);
  }
  return c && cn(s, t, n, a) || u;
}
function Fn(e, t, n, a, s) {
  e.top = n, e.left = t, e.right = t + a, e.bottom = n + s, e.width = a, e.height = s;
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
  t.x = o, t.y = i;
}
var Ut = {
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
    const s = Zt(e.options.layout.padding), o = Math.max(t - s.width, 0), i = Math.max(n - s.height, 0), l = Ac(e.boxes), d = l.vertical, c = l.horizontal;
    xt(e.boxes, (m) => {
      typeof m.beforeLayout == "function" && m.beforeLayout();
    });
    const u = d.reduce((m, v) => v.box.options && v.box.options.display === !1 ? m : m + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: n,
      padding: s,
      availableWidth: o,
      availableHeight: i,
      vBoxMaxWidth: o / 2 / u,
      hBoxMaxHeight: i / 2
    }), g = Object.assign({}, s);
    li(g, Zt(a));
    const y = Object.assign({
      maxPadding: g,
      w: o,
      h: i,
      x: s.left,
      y: s.top
    }, s), f = Dc(d.concat(c), h);
    cn(l.fullSize, y, h, f), cn(d, y, h, f), cn(c, y, h, f) && cn(d, y, h, f), Bc(y), Os(l.leftAndTop, y, h, f), y.x += y.w, y.y += y.h, Os(l.rightAndBottom, y, h, f), e.chartArea = {
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
  getMaximumSize(t, n, a, s) {
    return n = Math.max(0, n || t.width), a = a || t.height, {
      width: n,
      height: Math.max(0, s ? Math.floor(n / s) : a)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class Fc extends ri {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const Vn = "$chartjs", Ec = {
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
function Ic(e, t) {
  const n = e.style, a = e.getAttribute("height"), s = e.getAttribute("width");
  if (e[Vn] = {
    initial: {
      height: a,
      width: s,
      style: {
        display: n.display,
        height: n.height,
        width: n.width
      }
    }
  }, n.display = n.display || "block", n.boxSizing = n.boxSizing || "border-box", zs(s)) {
    const o = ks(e, "width");
    o !== void 0 && (e.width = o);
  }
  if (zs(a))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const o = ks(e, "height");
      o !== void 0 && (e.height = o);
    }
  return e;
}
const ci = Tr ? {
  passive: !0
} : !1;
function Pc(e, t, n) {
  e && e.addEventListener(t, n, ci);
}
function Rc(e, t, n) {
  e && e.canvas && e.canvas.removeEventListener(t, n, ci);
}
function Oc(e, t) {
  const n = Ec[e.type] || e.type, { x: a, y: s } = Fe(e, t);
  return {
    type: n,
    chart: t,
    native: e,
    x: a !== void 0 ? a : null,
    y: s !== void 0 ? s : null
  };
}
function Gn(e, t) {
  for (const n of e)
    if (n === t || n.contains(t))
      return !0;
}
function zc(e, t, n) {
  const a = e.canvas, s = new MutationObserver((o) => {
    let i = !1;
    for (const l of o)
      i = i || Gn(l.addedNodes, a), i = i && !Gn(l.removedNodes, a);
    i && n();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
function Vc(e, t, n) {
  const a = e.canvas, s = new MutationObserver((o) => {
    let i = !1;
    for (const l of o)
      i = i || Gn(l.removedNodes, a), i = i && !Gn(l.addedNodes, a);
    i && n();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
const Cn = /* @__PURE__ */ new Map();
let Vs = 0;
function di() {
  const e = window.devicePixelRatio;
  e !== Vs && (Vs = e, Cn.forEach((t, n) => {
    n.currentDevicePixelRatio !== e && t();
  }));
}
function Nc(e, t) {
  Cn.size || window.addEventListener("resize", di), Cn.set(e, t);
}
function Wc(e) {
  Cn.delete(e), Cn.size || window.removeEventListener("resize", di);
}
function Hc(e, t, n) {
  const a = e.canvas, s = a && qa(a);
  if (!s)
    return;
  const o = Yo((l, d) => {
    const c = s.clientWidth;
    n(l, d), c < s.clientWidth && n();
  }, window), i = new ResizeObserver((l) => {
    const d = l[0], c = d.contentRect.width, u = d.contentRect.height;
    c === 0 && u === 0 || o(c, u);
  });
  return i.observe(s), Nc(e, o), i;
}
function pa(e, t, n) {
  n && n.disconnect(), t === "resize" && Wc(e);
}
function jc(e, t, n) {
  const a = e.canvas, s = Yo((o) => {
    e.ctx !== null && n(Oc(o, e));
  }, e);
  return Pc(a, t, s), s;
}
class Yc extends ri {
  acquireContext(t, n) {
    const a = t && t.getContext && t.getContext("2d");
    return a && a.canvas === t ? (Ic(t, n), a) : null;
  }
  releaseContext(t) {
    const n = t.canvas;
    if (!n[Vn])
      return !1;
    const a = n[Vn].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const i = a[o];
      _t(i) ? n.removeAttribute(o) : n.setAttribute(o, i);
    });
    const s = a.style || {};
    return Object.keys(s).forEach((o) => {
      n.style[o] = s[o];
    }), n.width = n.width, delete n[Vn], !0;
  }
  addEventListener(t, n, a) {
    this.removeEventListener(t, n);
    const s = t.$proxies || (t.$proxies = {}), i = {
      attach: zc,
      detach: Vc,
      resize: Hc
    }[n] || jc;
    s[n] = i(t, n, a);
  }
  removeEventListener(t, n) {
    const a = t.$proxies || (t.$proxies = {}), s = a[n];
    if (!s)
      return;
    ({
      attach: pa,
      detach: pa,
      resize: pa
    }[n] || Rc)(t, n, s), a[n] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, n, a, s) {
    return Ar(t, n, a, s);
  }
  isAttached(t) {
    const n = t && qa(t);
    return !!(n && n.isConnected);
  }
}
function qc(e) {
  return !Ya() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Fc : Yc;
}
let fe = class {
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
    return _n(this.x) && _n(this.y);
  }
  getProps(t, n) {
    const a = this.$animations;
    if (!n || !a)
      return this;
    const s = {};
    return t.forEach((o) => {
      s[o] = a[o] && a[o].active() ? a[o]._to : this[o];
    }), s;
  }
};
function Kc(e, t) {
  const n = e.options.ticks, a = Uc(e), s = Math.min(n.maxTicksLimit || a, a), o = n.major.enabled ? Gc(t) : [], i = o.length, l = o[0], d = o[i - 1], c = [];
  if (i > s)
    return Zc(t, c, o, i / s), c;
  const u = Xc(o, t, s);
  if (i > 0) {
    let h, g;
    const y = i > 1 ? Math.round((d - l) / (i - 1)) : null;
    for (En(t, c, u, _t(y) ? 0 : l - y, l), h = 0, g = i - 1; h < g; h++)
      En(t, c, u, o[h], o[h + 1]);
    return En(t, c, u, d, _t(y) ? t.length : d + y), c;
  }
  return En(t, c, u), c;
}
function Uc(e) {
  const t = e.options.offset, n = e._tickSize(), a = e._length / n + (t ? 0 : 1), s = e._maxLength / n;
  return Math.floor(Math.min(a, s));
}
function Xc(e, t, n) {
  const a = Qc(e), s = t.length / n;
  if (!a)
    return Math.max(s, 1);
  const o = Dl(a);
  for (let i = 0, l = o.length - 1; i < l; i++) {
    const d = o[i];
    if (d > s)
      return d;
  }
  return Math.max(s, 1);
}
function Gc(e) {
  const t = [];
  let n, a;
  for (n = 0, a = e.length; n < a; n++)
    e[n].major && t.push(n);
  return t;
}
function Zc(e, t, n, a) {
  let s = 0, o = n[0], i;
  for (a = Math.ceil(a), i = 0; i < e.length; i++)
    i === o && (t.push(e[i]), s++, o = n[s * a]);
}
function En(e, t, n, a, s) {
  const o = dt(a, 0), i = Math.min(dt(s, e.length), e.length);
  let l = 0, d, c, u;
  for (n = Math.ceil(n), s && (d = s - a, n = d / Math.floor(d / n)), u = o; u < 0; )
    l++, u = Math.round(o + l * n);
  for (c = Math.max(o, 0); c < i; c++)
    c === u && (t.push(e[c]), l++, u = Math.round(o + l * n));
}
function Qc(e) {
  const t = e.length;
  let n, a;
  if (t < 2)
    return !1;
  for (a = e[0], n = 1; n < t; ++n)
    if (e[n] - e[n - 1] !== a)
      return !1;
  return a;
}
const Jc = (e) => e === "left" ? "right" : e === "right" ? "left" : e, Ns = (e, t, n) => t === "top" || t === "left" ? e[t] + n : e[t] - n, Ws = (e, t) => Math.min(t || e, e);
function Hs(e, t) {
  const n = [], a = e.length / t, s = e.length;
  let o = 0;
  for (; o < s; o += a)
    n.push(e[Math.floor(o)]);
  return n;
}
function td(e, t, n) {
  const a = e.ticks.length, s = Math.min(t, a - 1), o = e._startPixel, i = e._endPixel, l = 1e-6;
  let d = e.getPixelForTick(s), c;
  if (!(n && (a === 1 ? c = Math.max(d - o, i - d) : t === 0 ? c = (e.getPixelForTick(1) - d) / 2 : c = (d - e.getPixelForTick(s - 1)) / 2, d += s < t ? c : -c, d < o - l || d > i + l)))
    return d;
}
function ed(e, t) {
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
function tn(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function js(e, t) {
  if (!e.display)
    return 0;
  const n = Vt(e.font, t), a = Zt(e.padding);
  return (Ft(e.text) ? e.text.length : 1) * n.lineHeight + a.height;
}
function nd(e, t) {
  return Ve(e, {
    scale: t,
    type: "scale"
  });
}
function ad(e, t, n) {
  return Ve(e, {
    tick: n,
    index: t,
    type: "tick"
  });
}
function sd(e, t, n) {
  let a = Pa(e);
  return (n && t !== "right" || !n && t === "right") && (a = Jc(a)), a;
}
function od(e, t, n, a) {
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
    f = Ot(a, i, s), h = n === "left" ? -Et : Et;
  }
  return {
    titleX: y,
    titleY: f,
    maxWidth: g,
    rotation: h
  };
}
class Xe extends fe {
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
    let { _userMin: t, _userMax: n, _suggestedMin: a, _suggestedMax: s } = this;
    return t = ne(t, Number.POSITIVE_INFINITY), n = ne(n, Number.NEGATIVE_INFINITY), a = ne(a, Number.POSITIVE_INFINITY), s = ne(s, Number.NEGATIVE_INFINITY), {
      min: ne(t, a),
      max: ne(n, s),
      minDefined: Gt(t),
      maxDefined: Gt(n)
    };
  }
  getMinMax(t) {
    let { min: n, max: a, minDefined: s, maxDefined: o } = this.getUserBounds(), i;
    if (s && o)
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
    $t(this.options.beforeUpdate, [
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
    }, a), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + a.left + a.right : this.height + a.top + a.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = lr(this, o, s), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const d = l < this.ticks.length;
    this._convertTicksToLabels(d ? Hs(this.ticks, l) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = Kc(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), d && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, n, a;
    this.isHorizontal() ? (n = this.left, a = this.right) : (n = this.top, a = this.bottom, t = !t), this._startPixel = n, this._endPixel = a, this._reversePixels = t, this._length = a - n, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    $t(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    $t(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    $t(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), $t(this.options[t], [
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
    $t(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const n = this.options.ticks;
    let a, s, o;
    for (a = 0, s = t.length; a < s; a++)
      o = t[a], o.label = $t(n.callback, [
        o.value,
        a,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    $t(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    $t(this.options.beforeCalculateLabelRotation, [
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
    l = t.offset ? this.maxWidth / a : y / (a - 1), h + 6 > l && (l = y / (a - (t.offset ? 0.5 : 1)), d = this.maxHeight - tn(t.grid) - n.padding - js(t.title, this.chart.options.font), c = Math.sqrt(h * h + g * g), i = Ll(Math.min(Math.asin(zt((u.highest.height + 6) / l, -1, 1)), Math.asin(zt(d / c, -1, 1)) - Math.asin(zt(g / c, -1, 1)))), i = Math.max(s, Math.min(o, i))), this.labelRotation = i;
  }
  afterCalculateLabelRotation() {
    $t(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    $t(this.options.beforeFit, [
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
        this._calculatePadding(c, u, v, m);
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
      o === "start" ? (u = 0, h = t.height) : o === "end" && (u = n.height, h = 0), this.paddingTop = u + i, this.paddingBottom = h + i;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    $t(this.options.afterFit, [
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
      _t(t[n].label) && (t.splice(n, 1), a--, n--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const n = this.options.ticks.sampleSize;
      let a = this.ticks;
      n < a.length && (a = Hs(a, n)), this._labelSizes = t = this._computeLabelSizes(a, a.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, n, a) {
    const { ctx: s, _longestTextCache: o } = this, i = [], l = [], d = Math.floor(n / Ws(n, a));
    let c = 0, u = 0, h, g, y, f, m, v, p, b, x, w, D;
    for (h = 0; h < n; h += d) {
      if (f = t[h].label, m = this._resolveTickFontOptions(h), s.font = v = m.string, p = o[v] = o[v] || {
        data: {},
        gc: []
      }, b = m.lineHeight, x = w = 0, !_t(f) && !Ft(f))
        x = bs(s, p.data, p.gc, x, f), w = b;
      else if (Ft(f))
        for (g = 0, y = f.length; g < y; ++g)
          D = f[g], !_t(D) && !Ft(D) && (x = bs(s, p.data, p.gc, x, D), w += b);
      i.push(x), l.push(w), c = Math.max(x, c), u = Math.max(w, u);
    }
    ed(o, n);
    const S = i.indexOf(c), C = l.indexOf(u), $ = (L) => ({
      width: i[L] || 0,
      height: l[L] || 0
    });
    return {
      first: $(0),
      last: $(n - 1),
      widest: $(S),
      highest: $(C),
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
    return El(this._alignToPixels ? Te(this.chart, n, 0) : n);
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
      return a.$context || (a.$context = ad(this.getContext(), t, a));
    }
    return this.$context || (this.$context = nd(this.chart.getContext(), this));
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
    const n = this.axis, a = this.chart, s = this.options, { grid: o, position: i, border: l } = s, d = o.offset, c = this.isHorizontal(), h = this.ticks.length + (d ? 1 : 0), g = tn(o), y = [], f = l.setContext(this.getContext()), m = f.display ? f.width : 0, v = m / 2, p = function(V) {
      return Te(a, V, m);
    };
    let b, x, w, D, S, C, $, L, T, B, E, I;
    if (i === "top")
      b = p(this.bottom), C = this.bottom - g, L = b - v, B = p(t.top) + v, I = t.bottom;
    else if (i === "bottom")
      b = p(this.top), B = t.top, I = p(t.bottom) - v, C = b + v, L = this.top + g;
    else if (i === "left")
      b = p(this.right), S = this.right - g, $ = b - v, T = p(t.left) + v, E = t.right;
    else if (i === "right")
      b = p(this.left), T = t.left, E = p(t.right) - v, S = b + v, $ = this.left + g;
    else if (n === "x") {
      if (i === "center")
        b = p((t.top + t.bottom) / 2 + 0.5);
      else if (vt(i)) {
        const V = Object.keys(i)[0], tt = i[V];
        b = p(this.chart.scales[V].getPixelForValue(tt));
      }
      B = t.top, I = t.bottom, C = b + v, L = C + g;
    } else if (n === "y") {
      if (i === "center")
        b = p((t.left + t.right) / 2);
      else if (vt(i)) {
        const V = Object.keys(i)[0], tt = i[V];
        b = p(this.chart.scales[V].getPixelForValue(tt));
      }
      S = b - v, $ = S - g, T = t.left, E = t.right;
    }
    const N = dt(s.ticks.maxTicksLimit, h), Y = Math.max(1, Math.ceil(h / N));
    for (x = 0; x < h; x += Y) {
      const V = this.getContext(x), tt = o.setContext(V), et = l.setContext(V), rt = tt.lineWidth, G = tt.color, q = et.dash || [], j = et.dashOffset, ot = tt.tickWidth, X = tt.tickColor, ct = tt.tickBorderDash || [], gt = tt.tickBorderDashOffset;
      w = td(this, x, d), w !== void 0 && (D = Te(a, w, rt), c ? S = $ = T = E = D : C = L = B = I = D, y.push({
        tx1: S,
        ty1: C,
        tx2: $,
        ty2: L,
        x1: T,
        y1: B,
        x2: E,
        y2: I,
        width: rt,
        color: G,
        borderDash: q,
        borderDashOffset: j,
        tickWidth: ot,
        tickColor: X,
        tickBorderDash: ct,
        tickBorderDashOffset: gt
      }));
    }
    return this._ticksLength = h, this._borderValue = b, y;
  }
  _computeLabelItems(t) {
    const n = this.axis, a = this.options, { position: s, ticks: o } = a, i = this.isHorizontal(), l = this.ticks, { align: d, crossAlign: c, padding: u, mirror: h } = o, g = tn(a.grid), y = g + u, f = h ? -u : y, m = -ue(this.labelRotation), v = [];
    let p, b, x, w, D, S, C, $, L, T, B, E, I = "middle";
    if (s === "top")
      S = this.bottom - f, C = this._getXAxisLabelAlignment();
    else if (s === "bottom")
      S = this.top + f, C = this._getXAxisLabelAlignment();
    else if (s === "left") {
      const Y = this._getYAxisLabelAlignment(g);
      C = Y.textAlign, D = Y.x;
    } else if (s === "right") {
      const Y = this._getYAxisLabelAlignment(g);
      C = Y.textAlign, D = Y.x;
    } else if (n === "x") {
      if (s === "center")
        S = (t.top + t.bottom) / 2 + y;
      else if (vt(s)) {
        const Y = Object.keys(s)[0], V = s[Y];
        S = this.chart.scales[Y].getPixelForValue(V) + y;
      }
      C = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (s === "center")
        D = (t.left + t.right) / 2 - y;
      else if (vt(s)) {
        const Y = Object.keys(s)[0], V = s[Y];
        D = this.chart.scales[Y].getPixelForValue(V);
      }
      C = this._getYAxisLabelAlignment(g).textAlign;
    }
    n === "y" && (d === "start" ? I = "top" : d === "end" && (I = "bottom"));
    const N = this._getLabelSizes();
    for (p = 0, b = l.length; p < b; ++p) {
      x = l[p], w = x.label;
      const Y = o.setContext(this.getContext(p));
      $ = this.getPixelForTick(p) + o.labelOffset, L = this._resolveTickFontOptions(p), T = L.lineHeight, B = Ft(w) ? w.length : 1;
      const V = B / 2, tt = Y.color, et = Y.textStrokeColor, rt = Y.textStrokeWidth;
      let G = C;
      i ? (D = $, C === "inner" && (p === b - 1 ? G = this.options.reverse ? "left" : "right" : p === 0 ? G = this.options.reverse ? "right" : "left" : G = "center"), s === "top" ? c === "near" || m !== 0 ? E = -B * T + T / 2 : c === "center" ? E = -N.highest.height / 2 - V * T + T : E = -N.highest.height + T / 2 : c === "near" || m !== 0 ? E = T / 2 : c === "center" ? E = N.highest.height / 2 - V * T : E = N.highest.height - B * T, h && (E *= -1), m !== 0 && !Y.showLabelBackdrop && (D += T / 2 * Math.sin(m))) : (S = $, E = (1 - B) * T / 2);
      let q;
      if (Y.showLabelBackdrop) {
        const j = Zt(Y.backdropPadding), ot = N.heights[p], X = N.widths[p];
        let ct = E - j.top, gt = 0 - j.left;
        switch (I) {
          case "middle":
            ct -= ot / 2;
            break;
          case "bottom":
            ct -= ot;
            break;
        }
        switch (C) {
          case "center":
            gt -= X / 2;
            break;
          case "right":
            gt -= X;
            break;
          case "inner":
            p === b - 1 ? gt -= X : p > 0 && (gt -= X / 2);
            break;
        }
        q = {
          left: gt,
          top: ct,
          width: X + j.width,
          height: ot + j.height,
          color: Y.backdropColor
        };
      }
      v.push({
        label: w,
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
            D,
            S
          ],
          backdrop: q
        }
      });
    }
    return v;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: n } = this.options;
    if (-ue(this.labelRotation))
      return t === "top" ? "left" : "right";
    let s = "center";
    return n.align === "start" ? s = "left" : n.align === "end" ? s = "right" : n.align === "inner" && (s = "inner"), s;
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
    const { ctx: t, options: { backgroundColor: n }, left: a, top: s, width: o, height: i } = this;
    n && (t.save(), t.fillStyle = n, t.fillRect(a, s, o, i), t.restore());
  }
  getLineWidthForValue(t) {
    const n = this.options.grid;
    if (!this._isVisible() || !n.display)
      return 0;
    const s = this.ticks.findIndex((o) => o.value === t);
    return s >= 0 ? n.setContext(this.getContext(s)).lineWidth : 0;
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
    const { chart: t, ctx: n, options: { border: a, grid: s } } = this, o = a.setContext(this.getContext()), i = a.display ? o.width : 0;
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
    s && Va(a);
  }
  drawTitle() {
    const { ctx: t, options: { position: n, title: a, reverse: s } } = this;
    if (!a.display)
      return;
    const o = Vt(a.font), i = Zt(a.padding), l = a.align;
    let d = o.lineHeight / 2;
    n === "bottom" || n === "center" || vt(n) ? (d += i.bottom, Ft(a.text) && (d += o.lineHeight * (a.text.length - 1))) : d += i.top;
    const { titleX: c, titleY: u, maxWidth: h, rotation: g } = od(this, d, n, l);
    wn(t, a.text, 0, 0, o, {
      color: a.color,
      maxWidth: h,
      rotation: g,
      textAlign: sd(l, n, s),
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
    const t = this.options, n = t.ticks && t.ticks.z || 0, a = dt(t.grid && t.grid.z, -1), s = dt(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== Xe.prototype.draw ? [
      {
        z: n,
        draw: (o) => {
          this.draw(o);
        }
      }
    ] : [
      {
        z: a,
        draw: (o) => {
          this.drawBackground(), this.drawGrid(o), this.drawTitle();
        }
      },
      {
        z: s,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: n,
        draw: (o) => {
          this.drawLabels(o);
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
    return s;
  }
  _resolveTickFontOptions(t) {
    const n = this.options.ticks.setContext(this.getContext(t));
    return Vt(n.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class In {
  constructor(t, n, a) {
    this.type = t, this.scope = n, this.override = a, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const n = Object.getPrototypeOf(t);
    let a;
    rd(n) && (a = this.register(n));
    const s = this.items, o = t.id, i = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in s || (s[o] = t, id(t, i, a), this.override && Tt.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const n = this.items, a = t.id, s = this.scope;
    a in n && delete n[a], s && a in Tt[s] && (delete Tt[s][a], this.override && delete ze[a]);
  }
}
function id(e, t, n) {
  const a = vn(/* @__PURE__ */ Object.create(null), [
    n ? Tt.get(n) : {},
    Tt.get(t),
    e.defaults
  ]);
  Tt.set(t, a), e.defaultRoutes && ld(t, e.defaultRoutes), e.descriptors && Tt.describe(t, e.descriptors);
}
function ld(e, t) {
  Object.keys(t).forEach((n) => {
    const a = n.split("."), s = a.pop(), o = [
      e
    ].concat(a).join("."), i = t[n].split("."), l = i.pop(), d = i.join(".");
    Tt.route(o, s, d, l);
  });
}
function rd(e) {
  return "id" in e && "defaults" in e;
}
class cd {
  constructor() {
    this.controllers = new In(ta, "datasets", !0), this.elements = new In(fe, "elements"), this.plugins = new In(Object, "plugins"), this.scales = new In(Xe, "scales"), this._typedRegistries = [
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
    const s = Ea(t);
    $t(a["before" + s], [], a), n[t](a), $t(a["after" + s], [], a);
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
    const s = n.get(t);
    if (s === void 0)
      throw new Error('"' + t + '" is not a registered ' + a + ".");
    return s;
  }
}
var se = /* @__PURE__ */ new cd();
class dd {
  constructor() {
    this._init = void 0;
  }
  notify(t, n, a, s) {
    if (n === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install")), this._init === void 0)
      return;
    const o = s ? this._descriptors(t).filter(s) : this._descriptors(t), i = this._notify(o, t, n, a);
    return n === "afterDestroy" && (this._notify(o, t, "stop"), this._notify(this._init, t, "uninstall"), this._init = void 0), i;
  }
  _notify(t, n, a, s) {
    s = s || {};
    for (const o of t) {
      const i = o.plugin, l = i[a], d = [
        n,
        s,
        o.options
      ];
      if ($t(l, d, i) === !1 && s.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    _t(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const n = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), n;
  }
  _createDescriptors(t, n) {
    const a = t && t.config, s = dt(a.options && a.options.plugins, {}), o = ud(a);
    return s === !1 && !n ? [] : fd(t, o, s, n);
  }
  _notifyStateChanges(t) {
    const n = this._oldCache || [], a = this._cache, s = (o, i) => o.filter((l) => !i.some((d) => l.plugin.id === d.plugin.id));
    this._notify(s(n, a), t, "stop"), this._notify(s(a, n), t, "start");
  }
}
function ud(e) {
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
function hd(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function fd(e, { plugins: t, localIds: n }, a, s) {
  const o = [], i = e.getContext();
  for (const l of t) {
    const d = l.id, c = hd(a[d], s);
    c !== null && o.push({
      plugin: l,
      options: gd(e.config, {
        plugin: l,
        local: n[d]
      }, c, i)
    });
  }
  return o;
}
function gd(e, { plugin: t, local: n }, a, s) {
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
function pd(e, t) {
  let n = e;
  return e === "_index_" ? n = t : e === "_value_" && (n = t === "x" ? "y" : "x"), n;
}
function md(e, t) {
  return e === t ? "_index_" : "_value_";
}
function Ys(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function bd(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Da(e, ...t) {
  if (Ys(e))
    return e;
  for (const n of t) {
    const a = n.axis || bd(n.position) || e.length > 1 && Ys(e[0].toLowerCase());
    if (a)
      return a;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function qs(e, t, n) {
  if (n[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function vd(e, t) {
  if (t.data && t.data.datasets) {
    const n = t.data.datasets.filter((a) => a.xAxisID === e || a.yAxisID === e);
    if (n.length)
      return qs(e, "x", n[0]) || qs(e, "y", n[0]);
  }
  return {};
}
function yd(e, t) {
  const n = ze[e.type] || {
    scales: {}
  }, a = t.scales || {}, s = Ma(e.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(a).forEach((i) => {
    const l = a[i];
    if (!vt(l))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (l._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const d = Da(i, l, vd(i, e), Tt.scales[l.type]), c = md(d, s), u = n.scales || {};
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
      const g = pd(h, d), y = i[g + "AxisID"] || g;
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
  }), o;
}
function ui(e) {
  const t = e.options || (e.options = {});
  t.plugins = dt(t.plugins, {}), t.scales = yd(e, t);
}
function hi(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function _d(e) {
  return e = e || {}, e.data = hi(e.data), ui(e), e;
}
const Ks = /* @__PURE__ */ new Map(), fi = /* @__PURE__ */ new Set();
function Pn(e, t) {
  let n = Ks.get(e);
  return n || (n = t(), Ks.set(e, n), fi.add(n)), n;
}
const en = (e, t, n) => {
  const a = Oe(t, n);
  a !== void 0 && e.add(a);
};
class xd {
  constructor(t) {
    this._config = _d(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = hi(t);
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
    this.clearCache(), ui(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return Pn(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, n) {
    return Pn(`${t}.transition.${n}`, () => [
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
    return Pn(`${t}-${n}`, () => [
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
    return Pn(`${a}-plugin-${n}`, () => [
      [
        `plugins.${n}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, n) {
    const a = this._scopeCache;
    let s = a.get(t);
    return (!s || n) && (s = /* @__PURE__ */ new Map(), a.set(t, s)), s;
  }
  getOptionScopes(t, n, a) {
    const { options: s, type: o } = this, i = this._cachedScopes(t, a), l = i.get(n);
    if (l)
      return l;
    const d = /* @__PURE__ */ new Set();
    n.forEach((u) => {
      t && (d.add(t), u.forEach((h) => en(d, t, h))), u.forEach((h) => en(d, s, h)), u.forEach((h) => en(d, ze[o] || {}, h)), u.forEach((h) => en(d, Tt, h)), u.forEach((h) => en(d, $a, h));
    });
    const c = Array.from(d);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), fi.has(n) && i.set(n, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: n } = this;
    return [
      t,
      ze[n] || {},
      Tt.datasets[n] || {},
      {
        type: n
      },
      Tt,
      $a
    ];
  }
  resolveNamedOptions(t, n, a, s = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: i, subPrefixes: l } = Us(this._resolverCache, t, s);
    let d = i;
    if (wd(i, n)) {
      o.$shared = !1, a = Ce(a) ? a() : a;
      const c = this.createResolver(t, a, l);
      d = Ke(i, a, c);
    }
    for (const c of n)
      o[c] = d[c];
    return o;
  }
  createResolver(t, n, a = [
    ""
  ], s) {
    const { resolver: o } = Us(this._resolverCache, t, a);
    return vt(n) ? Ke(o, n, void 0, s) : o;
  }
}
function Us(e, t, n) {
  let a = e.get(t);
  a || (a = /* @__PURE__ */ new Map(), e.set(t, a));
  const s = n.join();
  let o = a.get(s);
  return o || (o = {
    resolver: Wa(t, n),
    subPrefixes: n.filter((l) => !l.toLowerCase().includes("hover"))
  }, a.set(s, o)), o;
}
const kd = (e) => vt(e) && Object.getOwnPropertyNames(e).some((t) => Ce(e[t]));
function wd(e, t) {
  const { isScriptable: n, isIndexable: a } = Xo(e);
  for (const s of t) {
    const o = n(s), i = a(s), l = (i || o) && e[s];
    if (o && (Ce(l) || kd(l)) || i && Ft(l))
      return !0;
  }
  return !1;
}
var Cd = "4.5.1";
const $d = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Xs(e, t) {
  return e === "top" || e === "bottom" || $d.indexOf(e) === -1 && t === "x";
}
function Gs(e, t) {
  return function(n, a) {
    return n[e] === a[e] ? n[t] - a[t] : n[e] - a[e];
  };
}
function Zs(e) {
  const t = e.chart, n = t.options.animation;
  t.notifyPlugins("afterRender"), $t(n && n.onComplete, [
    e
  ], t);
}
function Sd(e) {
  const t = e.chart, n = t.options.animation;
  $t(n && n.onProgress, [
    e
  ], t);
}
function gi(e) {
  return Ya() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const Nn = {}, Qs = (e) => {
  const t = gi(e);
  return Object.values(Nn).filter((n) => n.canvas === t).pop();
};
function Md(e, t, n) {
  const a = Object.keys(e);
  for (const s of a) {
    const o = +s;
    if (o >= t) {
      const i = e[s];
      delete e[s], (n > 0 || o > t) && (e[o + n] = i);
    }
  }
}
function Dd(e, t, n, a) {
  return !n || e.type === "mouseout" ? null : a ? t : e;
}
let Ge = class {
  static defaults = Tt;
  static instances = Nn;
  static overrides = ze;
  static registry = se;
  static version = Cd;
  static getChart = Qs;
  static register(...t) {
    se.add(...t), Js();
  }
  static unregister(...t) {
    se.remove(...t), Js();
  }
  constructor(t, n) {
    const a = this.config = new xd(n), s = gi(t), o = Qs(s);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const i = a.createResolver(a.chartOptionScopes(), this.getContext());
    this.platform = new (a.platform || qc(s))(), this.platform.updateConfig(a);
    const l = this.platform.acquireContext(s, i.aspectRatio), d = l && l.canvas, c = d && d.height, u = d && d.width;
    if (this.id = yl(), this.ctx = l, this.canvas = d, this.width = u, this.height = c, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new dd(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Ol((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], Nn[this.id] = this, !l || !d) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    re.listen(this, "complete", Zs), re.listen(this, "progress", Sd), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: n }, width: a, height: s, _aspectRatio: o } = this;
    return _t(t) ? n && o ? o : s ? a / s : null : t;
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
    return se;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : xs(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return vs(this.canvas, this.ctx), this;
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
    }), $t(a.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(d) && this.render());
  }
  ensureScalesHaveIDs() {
    const n = this.options.scales || {};
    xt(n, (a, s) => {
      a.id = s;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, n = t.scales, a = this.scales, s = Object.keys(a).reduce((i, l) => (i[l] = !1, i), {});
    let o = [];
    n && (o = o.concat(Object.keys(n).map((i) => {
      const l = n[i], d = Da(i, l), c = d === "r", u = d === "x";
      return {
        options: l,
        dposition: c ? "chartArea" : u ? "bottom" : "left",
        dtype: c ? "radialLinear" : u ? "category" : "linear"
      };
    }))), xt(o, (i) => {
      const l = i.options, d = l.id, c = Da(d, l), u = dt(l.type, i.dtype);
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
      Ut.configure(this, i, i.options), Ut.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, n = this.data.datasets.length, a = t.length;
    if (t.sort((s, o) => s.index - o.index), a > n) {
      for (let s = n; s < a; ++s)
        this._destroyDatasetMeta(s);
      t.splice(n, a - n);
    }
    this._sortedMetasets = t.slice(0).sort(Gs("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: n } } = this;
    t.length > n.length && delete this._stacks, t.forEach((a, s) => {
      n.filter((o) => o === a._dataset).length === 0 && this._destroyDatasetMeta(s);
    });
  }
  buildOrUpdateControllers() {
    const t = [], n = this.data.datasets;
    let a, s;
    for (this._removeUnreferencedMetasets(), a = 0, s = n.length; a < s; a++) {
      const o = n[a];
      let i = this.getDatasetMeta(a);
      const l = o.type || this.config.type;
      if (i.type && i.type !== l && (this._destroyDatasetMeta(a), i = this.getDatasetMeta(a)), i.type = l, i.indexAxis = o.indexAxis || Ma(l, this.options), i.order = o.order || 0, i.index = a, i.label = "" + o.label, i.visible = this.isDatasetVisible(a), i.controller)
        i.controller.updateIndex(a), i.controller.linkScales();
      else {
        const d = se.getController(l), { datasetElementType: c, dataElementType: u } = Tt.datasets[l];
        Object.assign(d, {
          dataElementType: se.getElement(u),
          datasetElementType: c && se.getElement(c)
        }), i.controller = new d(this, a), t.push(i.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    xt(this.data.datasets, (t, n) => {
      this.getDatasetMeta(n).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const n = this.config;
    n.update();
    const a = this._options = n.createResolver(n.chartOptionScopes(), this.getContext()), s = this._animationsDisabled = !a.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const o = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let i = 0;
    for (let c = 0, u = this.data.datasets.length; c < u; c++) {
      const { controller: h } = this.getDatasetMeta(c), g = !s && o.indexOf(h) === -1;
      h.buildOrUpdateElements(g), i = Math.max(+h.getMaxOverflow(), i);
    }
    i = this._minPadding = a.layout.autoPadding ? i : 0, this._updateLayout(i), s || xt(o, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(Gs("z", "_idx"));
    const { _active: l, _lastEvent: d } = this;
    d ? this._eventHandler(d, !0) : l.length && this._updateHoverStyles(l, l, !0), this.render();
  }
  _updateScales() {
    xt(this.scales, (t) => {
      Ut.removeBox(this, t);
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
      Md(t, s, i);
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
    return Array.from(s).map((o) => o.split(",")).map((o) => ({
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
    Ut.update(this, this.width, this.height, t);
    const n = this.chartArea, a = n.width <= 0 || n.height <= 0;
    this._layers = [], xt(this.boxes, (s) => {
      a && s.position === "chartArea" || (s.configure && s.configure(), this._layers.push(...s._layers()));
    }, this), this._layers.forEach((s, o) => {
      s._idx = o;
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
        this._updateDataset(n, Ce(t) ? t({
          datasetIndex: n
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, n) {
    const a = this.getDatasetMeta(t), s = {
      meta: a,
      index: t,
      mode: n,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", s) !== !1 && (a.controller._update(n), s.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", s));
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
      const { width: a, height: s } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(a, s);
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
    let s, o;
    for (s = 0, o = n.length; s < o; ++s) {
      const i = n[s];
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
    }, s = jr(this, t);
    this.notifyPlugins("beforeDatasetDraw", a) !== !1 && (s && za(n, s), t.controller.draw(), s && Va(n), a.cancelable = !1, this.notifyPlugins("afterDatasetDraw", a));
  }
  isPointInArea(t) {
    return kn(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, n, a, s) {
    const o = $c.modes[n];
    return typeof o == "function" ? o(this, t, a, s) : [];
  }
  getDatasetMeta(t) {
    const n = this.data.datasets[t], a = this._metasets;
    let s = a.filter((o) => o && o._dataset === n).pop();
    return s || (s = {
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
    }, a.push(s)), s;
  }
  getContext() {
    return this.$context || (this.$context = Ve(null, {
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
    const s = a ? "show" : "hide", o = this.getDatasetMeta(t), i = o.controller._resolveAnimations(void 0, s);
    yn(n) ? (o.data[n].hidden = !a, this.update()) : (this.setDatasetVisibility(t, a), i.update(o, {
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
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), vs(t, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete Nn[this.id], this.notifyPlugins("afterDestroy");
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
    xt(this.options.events, (o) => a(o, s));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, n = this.platform, a = (d, c) => {
      n.addEventListener(this, d, c), t[d] = c;
    }, s = (d, c) => {
      t[d] && (n.removeEventListener(this, d, c), delete t[d]);
    }, o = (d, c) => {
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
    xt(this._listeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._listeners = {}, xt(this._responsiveListeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, n, a) {
    const s = a ? "set" : "remove";
    let o, i, l, d;
    for (n === "dataset" && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + s + "DatasetHoverStyle"]()), l = 0, d = t.length; l < d; ++l) {
      i = t[l];
      const c = i && this.getDatasetMeta(i.datasetIndex).controller;
      c && c[s + "HoverStyle"](i.element, i.datasetIndex, i.index);
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
    !Yn(a, n) && (this._active = a, this._lastEvent = null, this._updateHoverStyles(a, n));
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
    }, s = (i) => (i.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", a, s) === !1)
      return;
    const o = this._handleEvent(t, n, a.inChartArea);
    return a.cancelable = !1, this.notifyPlugins("afterEvent", a, s), (o || a.changed) && this.render(), this;
  }
  _handleEvent(t, n, a) {
    const { _active: s = [], options: o } = this, i = n, l = this._getActiveElements(t, s, a, i), d = $l(t), c = Dd(t, this._lastEvent, a, d);
    a && (this._lastEvent = null, $t(o.onHover, [
      t,
      l,
      this
    ], this), d && $t(o.onClick, [
      t,
      l,
      this
    ], this));
    const u = !Yn(l, s);
    return (u || n) && (this._active = l, this._updateHoverStyles(l, s, n)), this._lastEvent = c, u;
  }
  _getActiveElements(t, n, a, s) {
    if (t.type === "mouseout")
      return [];
    if (!a)
      return n;
    const o = this.options.hover;
    return this.getElementsAtEventForMode(t, o.mode, o, s);
  }
};
function Js() {
  return xt(Ge.instances, (e) => e._plugins.invalidate());
}
function Ad(e, t, n) {
  const { startAngle: a, x: s, y: o, outerRadius: i, innerRadius: l, options: d } = t, { borderWidth: c, borderJoinStyle: u } = d, h = Math.min(c / i, Jt(a - n));
  if (e.beginPath(), e.arc(s, o, i - c / 2, a + h / 2, n - h / 2), l > 0) {
    const g = Math.min(c / l, Jt(a - n));
    e.arc(s, o, l + c / 2, n - g / 2, a + g / 2, !0);
  } else {
    const g = Math.min(c / 2, i * Jt(a - n));
    if (u === "round")
      e.arc(s, o, g, n - wt / 2, a + wt / 2, !0);
    else if (u === "bevel") {
      const y = 2 * g * g, f = -y * Math.cos(n + wt / 2) + s, m = -y * Math.sin(n + wt / 2) + o, v = y * Math.cos(a + wt / 2) + s, p = y * Math.sin(a + wt / 2) + o;
      e.lineTo(f, m), e.lineTo(v, p);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Td(e, t, n) {
  const { startAngle: a, pixelMargin: s, x: o, y: i, outerRadius: l, innerRadius: d } = t;
  let c = s / l;
  e.beginPath(), e.arc(o, i, l, a - c, n + c), d > s ? (c = s / d, e.arc(o, i, d, n + c, a - c, !0)) : e.arc(o, i, s, n + Et, a - Et), e.closePath(), e.clip();
}
function Bd(e) {
  return Na(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Ld(e, t, n, a) {
  const s = Bd(e.options.borderRadius), o = (n - t) / 2, i = Math.min(o, a * t / 2), l = (d) => {
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
function We(e, t, n, a) {
  return {
    x: n + e * Math.cos(t),
    y: a + e * Math.sin(t)
  };
}
function Zn(e, t, n, a, s, o) {
  const { x: i, y: l, startAngle: d, pixelMargin: c, innerRadius: u } = t, h = Math.max(t.outerRadius + a + n - c, 0), g = u > 0 ? u + a + n + c : 0;
  let y = 0;
  const f = s - d;
  if (a) {
    const Y = u > 0 ? u - a : 0, V = h > 0 ? h - a : 0, tt = (Y + V) / 2, et = tt !== 0 ? f * tt / (tt + a) : f;
    y = (f - et) / 2;
  }
  const m = Math.max(1e-3, f * h - n / wt) / h, v = (f - m) / 2, p = d + v + y, b = s - v - y, { outerStart: x, outerEnd: w, innerStart: D, innerEnd: S } = Ld(t, g, h, b - p), C = h - x, $ = h - w, L = p + x / C, T = b - w / $, B = g + D, E = g + S, I = p + D / B, N = b - S / E;
  if (e.beginPath(), o) {
    const Y = (L + T) / 2;
    if (e.arc(i, l, h, L, Y), e.arc(i, l, h, Y, T), w > 0) {
      const rt = We($, T, i, l);
      e.arc(rt.x, rt.y, w, T, b + Et);
    }
    const V = We(E, b, i, l);
    if (e.lineTo(V.x, V.y), S > 0) {
      const rt = We(E, N, i, l);
      e.arc(rt.x, rt.y, S, b + Et, N + Math.PI);
    }
    const tt = (b - S / g + (p + D / g)) / 2;
    if (e.arc(i, l, g, b - S / g, tt, !0), e.arc(i, l, g, tt, p + D / g, !0), D > 0) {
      const rt = We(B, I, i, l);
      e.arc(rt.x, rt.y, D, I + Math.PI, p - Et);
    }
    const et = We(C, p, i, l);
    if (e.lineTo(et.x, et.y), x > 0) {
      const rt = We(C, L, i, l);
      e.arc(rt.x, rt.y, x, p - Et, L);
    }
  } else {
    e.moveTo(i, l);
    const Y = Math.cos(L) * h + i, V = Math.sin(L) * h + l;
    e.lineTo(Y, V);
    const tt = Math.cos(T) * h + i, et = Math.sin(T) * h + l;
    e.lineTo(tt, et);
  }
  e.closePath();
}
function Fd(e, t, n, a, s) {
  const { fullCircles: o, startAngle: i, circumference: l } = t;
  let d = t.endAngle;
  if (o) {
    Zn(e, t, n, a, d, s);
    for (let c = 0; c < o; ++c)
      e.fill();
    isNaN(l) || (d = i + (l % At || At));
  }
  return Zn(e, t, n, a, d, s), e.fill(), d;
}
function Ed(e, t, n, a, s) {
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
  f && Td(e, t, m), d.selfJoin && m - i >= wt && y === 0 && u !== "miter" && Ad(e, t, m), o || (Zn(e, t, n, a, m, s), e.stroke());
}
class Id extends fe {
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
    const s = this.getProps([
      "x",
      "y"
    ], a), { angle: o, distance: i } = No(s, {
      x: t,
      y: n
    }), { startAngle: l, endAngle: d, innerRadius: c, outerRadius: u, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], a), g = (this.options.spacing + this.options.borderWidth) / 2, y = dt(h, d - l), f = xn(o, l, d) && l !== d, m = y >= At || f, v = _e(i, c + g, u + g);
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
    const { options: n, circumference: a } = this, s = (n.offset || 0) / 4, o = (n.spacing || 0) / 2, i = n.circular;
    if (this.pixelMargin = n.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = a > At ? Math.floor(a / At) : 0, a === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const l = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(l) * s, Math.sin(l) * s);
    const d = 1 - Math.sin(Math.min(wt, a || 0)), c = s * d;
    t.fillStyle = n.backgroundColor, t.strokeStyle = n.borderColor, Fd(t, this, c, o, i), Ed(t, this, c, o, i), t.restore();
  }
}
function pi(e, t, n = t) {
  e.lineCap = dt(n.borderCapStyle, t.borderCapStyle), e.setLineDash(dt(n.borderDash, t.borderDash)), e.lineDashOffset = dt(n.borderDashOffset, t.borderDashOffset), e.lineJoin = dt(n.borderJoinStyle, t.borderJoinStyle), e.lineWidth = dt(n.borderWidth, t.borderWidth), e.strokeStyle = dt(n.borderColor, t.borderColor);
}
function Pd(e, t, n) {
  e.lineTo(n.x, n.y);
}
function Rd(e) {
  return e.stepped ? Ql : e.tension || e.cubicInterpolationMode === "monotone" ? Jl : Pd;
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
function Od(e, t, n, a) {
  const { points: s, options: o } = t, { count: i, start: l, loop: d, ilen: c } = mi(s, n, a), u = Rd(o);
  let { move: h = !0, reverse: g } = a || {}, y, f, m;
  for (y = 0; y <= c; ++y)
    f = s[(l + (g ? c - y : y)) % i], !f.skip && (h ? (e.moveTo(f.x, f.y), h = !1) : u(e, m, f, g, o.stepped), m = f);
  return d && (f = s[(l + (g ? c : 0)) % i], u(e, m, f, g, o.stepped)), !!d;
}
function zd(e, t, n, a) {
  const s = t.points, { count: o, start: i, ilen: l } = mi(s, n, a), { move: d = !0, reverse: c } = a || {};
  let u = 0, h = 0, g, y, f, m, v, p;
  const b = (w) => (i + (c ? l - w : w)) % o, x = () => {
    m !== v && (e.lineTo(u, v), e.lineTo(u, m), e.lineTo(u, p));
  };
  for (d && (y = s[b(0)], e.moveTo(y.x, y.y)), g = 0; g <= l; ++g) {
    if (y = s[b(g)], y.skip)
      continue;
    const w = y.x, D = y.y, S = w | 0;
    S === f ? (D < m ? m = D : D > v && (v = D), u = (h * u + w) / ++h) : (x(), e.lineTo(w, D), f = S, h = 0, m = v = D), p = D;
  }
  x();
}
function Aa(e) {
  const t = e.options, n = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !n ? zd : Od;
}
function Vd(e) {
  return e.stepped ? Br : e.tension || e.cubicInterpolationMode === "monotone" ? Lr : Ee;
}
function Nd(e, t, n, a) {
  let s = t._path;
  s || (s = t._path = new Path2D(), t.path(s, n, a) && s.closePath()), pi(e, t.options), e.stroke(s);
}
function Wd(e, t, n, a) {
  const { segments: s, options: o } = t, i = Aa(t);
  for (const l of s)
    pi(e, o, l.style), e.beginPath(), i(e, t, l, {
      start: n,
      end: n + a - 1
    }) && e.closePath(), e.stroke();
}
const Hd = typeof Path2D == "function";
function jd(e, t, n, a) {
  Hd && !t.options.segment ? Nd(e, t, n, a) : Wd(e, t, n, a);
}
class Yd extends fe {
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
      wr(this._points, a, t, s, n), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Vr(this, this.options.segment));
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
    const a = this.options, s = t[n], o = this.points, i = Rr(this, {
      property: n,
      start: s,
      end: s
    });
    if (!i.length)
      return;
    const l = [], d = Vd(a);
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
    return Aa(this)(t, this, n, a);
  }
  path(t, n, a) {
    const s = this.segments, o = Aa(this);
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
    (this.points || []).length && o.borderWidth && (t.save(), jd(t, this, a, s), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function to(e, t, n, a) {
  const s = e.options, { [n]: o } = e.getProps([
    n
  ], a);
  return Math.abs(t - o) < s.radius + s.hitRadius;
}
class qd extends fe {
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
    const s = this.options, { x: o, y: i } = this.getProps([
      "x",
      "y"
    ], a);
    return Math.pow(t - o, 2) + Math.pow(n - i, 2) < Math.pow(s.hitRadius + s.radius, 2);
  }
  inXRange(t, n) {
    return to(this, t, "x", n);
  }
  inYRange(t, n) {
    return to(this, t, "y", n);
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
    this.skip || a.radius < 0.1 || !kn(this, n, this.size(a) / 2) || (t.strokeStyle = a.borderColor, t.lineWidth = a.borderWidth, t.fillStyle = a.backgroundColor, Sa(t, a, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function bi(e, t) {
  const { x: n, y: a, base: s, width: o, height: i } = e.getProps([
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
function ke(e, t, n, a) {
  return e ? 0 : zt(t, n, a);
}
function Kd(e, t, n) {
  const a = e.options.borderWidth, s = e.borderSkipped, o = Uo(a);
  return {
    t: ke(s.top, o.top, 0, n),
    r: ke(s.right, o.right, 0, t),
    b: ke(s.bottom, o.bottom, 0, n),
    l: ke(s.left, o.left, 0, t)
  };
}
function Ud(e, t, n) {
  const { enableBorderRadius: a } = e.getProps([
    "enableBorderRadius"
  ]), s = e.options.borderRadius, o = Ye(s), i = Math.min(t, n), l = e.borderSkipped, d = a || vt(s);
  return {
    topLeft: ke(!d || l.top || l.left, o.topLeft, 0, i),
    topRight: ke(!d || l.top || l.right, o.topRight, 0, i),
    bottomLeft: ke(!d || l.bottom || l.left, o.bottomLeft, 0, i),
    bottomRight: ke(!d || l.bottom || l.right, o.bottomRight, 0, i)
  };
}
function Xd(e) {
  const t = bi(e), n = t.right - t.left, a = t.bottom - t.top, s = Kd(e, n / 2, a / 2), o = Ud(e, n / 2, a / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: n,
      h: a,
      radius: o
    },
    inner: {
      x: t.left + s.l,
      y: t.top + s.t,
      w: n - s.l - s.r,
      h: a - s.t - s.b,
      radius: {
        topLeft: Math.max(0, o.topLeft - Math.max(s.t, s.l)),
        topRight: Math.max(0, o.topRight - Math.max(s.t, s.r)),
        bottomLeft: Math.max(0, o.bottomLeft - Math.max(s.b, s.l)),
        bottomRight: Math.max(0, o.bottomRight - Math.max(s.b, s.r))
      }
    }
  };
}
function ma(e, t, n, a) {
  const s = t === null, o = n === null, l = e && !(s && o) && bi(e, a);
  return l && (s || _e(t, l.left, l.right)) && (o || _e(n, l.top, l.bottom));
}
function Gd(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function Zd(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function ba(e, t, n = {}) {
  const a = e.x !== n.x ? -t : 0, s = e.y !== n.y ? -t : 0, o = (e.x + e.w !== n.x + n.w ? t : 0) - a, i = (e.y + e.h !== n.y + n.h ? t : 0) - s;
  return {
    x: e.x + a,
    y: e.y + s,
    w: e.w + o,
    h: e.h + i,
    radius: e.radius
  };
}
class Qd extends fe {
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
    const { inflateAmount: n, options: { borderColor: a, backgroundColor: s } } = this, { inner: o, outer: i } = Xd(this), l = Gd(i.radius) ? Un : Zd;
    t.save(), (i.w !== o.w || i.h !== o.h) && (t.beginPath(), l(t, ba(i, n, o)), t.clip(), l(t, ba(o, -n, i)), t.fillStyle = a, t.fill("evenodd")), t.beginPath(), l(t, ba(o, n)), t.fillStyle = s, t.fill(), t.restore();
  }
  inRange(t, n, a) {
    return ma(this, t, n, a);
  }
  inXRange(t, n) {
    return ma(this, t, null, n);
  }
  inYRange(t, n) {
    return ma(this, null, t, n);
  }
  getCenterPoint(t) {
    const { x: n, y: a, base: s, horizontal: o } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], t);
    return {
      x: o ? (n + s) / 2 : n,
      y: o ? a : (a + s) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
const eo = (e, t) => {
  let { boxHeight: n = t, boxWidth: a = t } = e;
  return e.usePointStyle && (n = Math.min(n, t), a = e.pointStyleWidth || Math.min(a, t)), {
    boxWidth: a,
    boxHeight: n,
    itemHeight: Math.max(t, n)
  };
}, Jd = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
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
    let n = $t(t.generateLabels, [
      this.chart
    ], this) || [];
    t.filter && (n = n.filter((a) => t.filter(a, this.chart.data))), t.sort && (n = n.sort((a, s) => t.sort(a, s, this.chart.data))), this.options.reverse && n.reverse(), this.legendItems = n;
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
      const { itemWidth: b, itemHeight: x } = tu(a, n, o, v, s);
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
    const t = this._computeTitleHeight(), { legendHitBoxes: n, options: { align: a, labels: { padding: s }, rtl: o } } = this, i = qe(o, this.left, this.width);
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
      za(t, this), this._draw(), Va(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: n, lineWidths: a, ctx: s } = this, { align: o, labels: i } = t, l = Tt.color, d = qe(t.rtl, this.left, this.width), c = Vt(i.font), { padding: u } = i, h = c.size, g = h / 2;
    let y;
    this.drawTitle(), s.textAlign = d.textAlign("left"), s.textBaseline = "middle", s.lineWidth = 0.5, s.font = c.string;
    const { boxWidth: f, boxHeight: m, itemHeight: v } = eo(i, h), p = function(S, C, $) {
      if (isNaN(f) || f <= 0 || isNaN(m) || m < 0)
        return;
      s.save();
      const L = dt($.lineWidth, 1);
      if (s.fillStyle = dt($.fillStyle, l), s.lineCap = dt($.lineCap, "butt"), s.lineDashOffset = dt($.lineDashOffset, 0), s.lineJoin = dt($.lineJoin, "miter"), s.lineWidth = L, s.strokeStyle = dt($.strokeStyle, l), s.setLineDash(dt($.lineDash, [])), i.usePointStyle) {
        const T = {
          radius: m * Math.SQRT2 / 2,
          pointStyle: $.pointStyle,
          rotation: $.rotation,
          borderWidth: L
        }, B = d.xPlus(S, f / 2), E = C + g;
        Ko(s, T, B, E, i.pointStyleWidth && f);
      } else {
        const T = C + Math.max((h - m) / 2, 0), B = d.leftForLtr(S, f), E = Ye($.borderRadius);
        s.beginPath(), Object.values(E).some((I) => I !== 0) ? Un(s, {
          x: B,
          y: T,
          w: f,
          h: m,
          radius: E
        }) : s.rect(B, T, f, m), s.fill(), L !== 0 && s.stroke();
      }
      s.restore();
    }, b = function(S, C, $) {
      wn(s, $.text, S, C + v / 2, c, {
        strikethrough: $.hidden,
        textAlign: d.textAlign($.textAlign)
      });
    }, x = this.isHorizontal(), w = this._computeTitleHeight();
    x ? y = {
      x: Ot(o, this.left + u, this.right - a[0]),
      y: this.top + u + w,
      line: 0
    } : y = {
      x: this.left + u,
      y: Ot(o, this.top + w + u, this.bottom - n[0].height),
      line: 0
    }, ti(this.ctx, t.textDirection);
    const D = v + u;
    this.legendItems.forEach((S, C) => {
      s.strokeStyle = S.fontColor, s.fillStyle = S.fontColor;
      const $ = s.measureText(S.text).width, L = d.textAlign(S.textAlign || (S.textAlign = i.textAlign)), T = f + g + $;
      let B = y.x, E = y.y;
      d.setWidth(this.width), x ? C > 0 && B + T + u > this.right && (E = y.y += D, y.line++, B = y.x = Ot(o, this.left + u, this.right - a[y.line])) : C > 0 && E + D > this.bottom && (B = y.x = B + n[y.line].width + u, y.line++, E = y.y = Ot(o, this.top + w + u, this.bottom - n[y.line].height));
      const I = d.x(B);
      if (p(I, E, S), B = zl(L, B + f + g, x ? B + T : this.right, t.rtl), b(d.x(B), E, S), x)
        y.x += T + u;
      else if (typeof S.text != "string") {
        const N = c.lineHeight;
        y.y += vi(S, N) + u;
      } else
        y.y += D;
    }), ei(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, n = t.title, a = Vt(n.font), s = Zt(n.padding);
    if (!n.display)
      return;
    const o = qe(t.rtl, this.left, this.width), i = this.ctx, l = n.position, d = a.size / 2, c = s.top + d;
    let u, h = this.left, g = this.width;
    if (this.isHorizontal())
      g = Math.max(...this.lineWidths), u = this.top + c, h = Ot(t.align, h, this.right - g);
    else {
      const f = this.columnSizes.reduce((m, v) => Math.max(m, v.height), 0);
      u = c + Ot(t.align, this.top, this.bottom - f - t.labels.padding - this._computeTitleHeight());
    }
    const y = Ot(l, h, h + g);
    i.textAlign = o.textAlign(Pa(l)), i.textBaseline = "middle", i.strokeStyle = n.color, i.fillStyle = n.color, i.font = a.string, wn(i, n.text, y, u, a);
  }
  _computeTitleHeight() {
    const t = this.options.title, n = Vt(t.font), a = Zt(t.padding);
    return t.display ? n.lineHeight + a.height : 0;
  }
  _getLegendItemAt(t, n) {
    let a, s, o;
    if (_e(t, this.left, this.right) && _e(n, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, a = 0; a < o.length; ++a)
        if (s = o[a], _e(t, s.left, s.left + s.width) && _e(n, s.top, s.top + s.height))
          return this.legendItems[a];
    }
    return null;
  }
  handleEvent(t) {
    const n = this.options;
    if (!au(t.type, n))
      return;
    const a = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const s = this._hoveredItem, o = Jd(s, a);
      s && !o && $t(n.onLeave, [
        t,
        s,
        this
      ], this), this._hoveredItem = a, a && !o && $t(n.onHover, [
        t,
        a,
        this
      ], this);
    } else a && $t(n.onClick, [
      t,
      a,
      this
    ], this);
  }
}
function tu(e, t, n, a, s) {
  const o = eu(a, e, t, n), i = nu(s, a, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: i
  };
}
function eu(e, t, n, a) {
  let s = e.text;
  return s && typeof s != "string" && (s = s.reduce((o, i) => o.length > i.length ? o : i)), t + n.size / 2 + a.measureText(s).width;
}
function nu(e, t, n) {
  let a = e;
  return typeof t.text != "string" && (a = vi(t, n)), a;
}
function vi(e, t) {
  const n = e.text ? e.text.length : 0;
  return t * n;
}
function au(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var Ua = {
  id: "legend",
  _element: no,
  start(e, t, n) {
    const a = e.legend = new no({
      ctx: e.ctx,
      options: n,
      chart: e
    });
    Ut.configure(e, a, n), Ut.addBox(e, a);
  },
  stop(e) {
    Ut.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, n) {
    const a = e.legend;
    Ut.configure(e, a, n), a.options = n;
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
      const a = t.datasetIndex, s = n.chart;
      s.isDatasetVisible(a) ? (s.hide(a), t.hidden = !0) : (s.show(a), t.hidden = !1);
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
          const c = d.controller.getStyle(n ? 0 : void 0), u = Zt(c.borderWidth);
          return {
            text: t[d.index].label,
            fillStyle: c.backgroundColor,
            fontColor: o,
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
class yi extends fe {
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
    const s = Ft(a.text) ? a.text.length : 1;
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
    return this.isHorizontal() ? (u = Ot(l, a, o), h = n + t, c = o - a) : (i.position === "left" ? (u = a + t, h = Ot(l, s, n), d = wt * -0.5) : (u = o - t, h = Ot(l, n, s), d = wt * 0.5), c = s - n), {
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
      textAlign: Pa(n.align),
      textBaseline: "middle",
      translation: [
        i,
        l
      ]
    });
  }
}
function su(e, t) {
  const n = new yi({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  Ut.configure(e, n, t), Ut.addBox(e, n), e.titleBlock = n;
}
var _i = {
  id: "title",
  _element: yi,
  start(e, t, n) {
    su(e, n);
  },
  stop(e) {
    const t = e.titleBlock;
    Ut.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, n) {
    const a = e.titleBlock;
    Ut.configure(e, a, n), a.options = n;
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
const dn = {
  average(e) {
    if (!e.length)
      return !1;
    let t, n, a = /* @__PURE__ */ new Set(), s = 0, o = 0;
    for (t = 0, n = e.length; t < n; ++t) {
      const l = e[t].element;
      if (l && l.hasValue()) {
        const d = l.tooltipPosition();
        a.add(d.x), s += d.y, ++o;
      }
    }
    return o === 0 || a.size === 0 ? !1 : {
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
        const c = d.getCenterPoint(), u = Ca(t, c);
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
  return t && (Ft(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function ce(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function ou(e, t) {
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
  let m = f.height, v = 0, p = a.reduce((w, D) => w + D.before.length + D.lines.length + D.after.length, 0);
  if (p += e.beforeBody.length + e.afterBody.length, h && (m += h * c.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), p) {
    const w = t.displayColors ? Math.max(l, d.lineHeight) : d.lineHeight;
    m += y * w + (p - y) * d.lineHeight + (p - 1) * t.bodySpacing;
  }
  g && (m += t.footerMarginTop + g * u.lineHeight + (g - 1) * t.footerSpacing);
  let b = 0;
  const x = function(w) {
    v = Math.max(v, n.measureText(w).width + b);
  };
  return n.save(), n.font = c.string, xt(e.title, x), n.font = d.string, xt(e.beforeBody.concat(e.afterBody), x), b = t.displayColors ? i + 2 + t.boxPadding : 0, xt(a, (w) => {
    xt(w.before, x), xt(w.lines, x), xt(w.after, x);
  }), b = 0, n.font = u.string, xt(e.footer, x), n.restore(), v += f.width, {
    width: v,
    height: m
  };
}
function iu(e, t) {
  const { y: n, height: a } = t;
  return n < a / 2 ? "top" : n > e.height - a / 2 ? "bottom" : "center";
}
function lu(e, t, n, a) {
  const { x: s, width: o } = a, i = n.caretSize + n.caretPadding;
  if (e === "left" && s + o + i > t.width || e === "right" && s - o - i < 0)
    return !0;
}
function ru(e, t, n, a) {
  const { x: s, width: o } = n, { width: i, chartArea: { left: l, right: d } } = e;
  let c = "center";
  return a === "center" ? c = s <= (l + d) / 2 ? "left" : "right" : s <= o / 2 ? c = "left" : s >= i - o / 2 && (c = "right"), lu(c, e, t, n) && (c = "center"), c;
}
function so(e, t, n) {
  const a = n.yAlign || t.yAlign || iu(e, n);
  return {
    xAlign: n.xAlign || t.xAlign || ru(e, t, n, a),
    yAlign: a
  };
}
function cu(e, t) {
  let { x: n, width: a } = e;
  return t === "right" ? n -= a : t === "center" && (n -= a / 2), n;
}
function du(e, t, n) {
  let { y: a, height: s } = e;
  return t === "top" ? a += n : t === "bottom" ? a -= s + n : a -= s / 2, a;
}
function oo(e, t, n, a) {
  const { caretSize: s, caretPadding: o, cornerRadius: i } = e, { xAlign: l, yAlign: d } = n, c = s + o, { topLeft: u, topRight: h, bottomLeft: g, bottomRight: y } = Ye(i);
  let f = cu(t, l);
  const m = du(t, d, c);
  return d === "center" ? l === "left" ? f += c : l === "right" && (f -= c) : l === "left" ? f -= Math.max(u, g) + s : l === "right" && (f += Math.max(h, y) + s), {
    x: zt(f, 0, a.width - t.width),
    y: zt(m, 0, a.height - t.height)
  };
}
function Rn(e, t, n) {
  const a = Zt(n.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - a.right : e.x + a.left;
}
function io(e) {
  return ae([], ce(e));
}
function uu(e, t, n) {
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
    return _t(n) || (t += n), t;
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
function Ht(e, t, n, a) {
  const s = e[t].call(n, a);
  return typeof s > "u" ? xi[t].call(n, a) : s;
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
    const n = this.chart, a = this.options.setContext(this.getContext()), s = a.enabled && n.options.animation && a.animations, o = new ai(this.chart, s);
    return s._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = uu(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, n) {
    const { callbacks: a } = n, s = Ht(a, "beforeTitle", this, t), o = Ht(a, "title", this, t), i = Ht(a, "afterTitle", this, t);
    let l = [];
    return l = ae(l, ce(s)), l = ae(l, ce(o)), l = ae(l, ce(i)), l;
  }
  getBeforeBody(t, n) {
    return io(Ht(n.callbacks, "beforeBody", this, t));
  }
  getBody(t, n) {
    const { callbacks: a } = n, s = [];
    return xt(t, (o) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, l = lo(a, o);
      ae(i.before, ce(Ht(l, "beforeLabel", this, o))), ae(i.lines, Ht(l, "label", this, o)), ae(i.after, ce(Ht(l, "afterLabel", this, o))), s.push(i);
    }), s;
  }
  getAfterBody(t, n) {
    return io(Ht(n.callbacks, "afterBody", this, t));
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
      l.push(ou(this.chart, n[d]));
    return t.filter && (l = l.filter((u, h, g) => t.filter(u, h, g, a))), t.itemSort && (l = l.sort((u, h) => t.itemSort(u, h, a))), xt(l, (u) => {
      const h = lo(t.callbacks, u);
      s.push(Ht(h, "labelColor", this, u)), o.push(Ht(h, "labelPointStyle", this, u)), i.push(Ht(h, "labelTextColor", this, u));
    }), this.labelColors = s, this.labelPointStyles = o, this.labelTextColors = i, this.dataPoints = l, l;
  }
  update(t, n) {
    const a = this.options.setContext(this.getContext()), s = this._active;
    let o, i = [];
    if (!s.length)
      this.opacity !== 0 && (o = {
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
    this._tooltipItems = i, this.$context = void 0, o && this._resolveAnimations().update(this, o), t && a.external && a.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: n
    });
  }
  drawCaret(t, n, a, s) {
    const o = this.getCaretPosition(t, a, s);
    n.lineTo(o.x1, o.y1), n.lineTo(o.x2, o.y2), n.lineTo(o.x3, o.y3);
  }
  getCaretPosition(t, n, a) {
    const { xAlign: s, yAlign: o } = this, { caretSize: i, cornerRadius: l } = a, { topLeft: d, topRight: c, bottomLeft: u, bottomRight: h } = Ye(l), { x: g, y } = t, { width: f, height: m } = n;
    let v, p, b, x, w, D;
    return o === "center" ? (w = y + m / 2, s === "left" ? (v = g, p = v - i, x = w + i, D = w - i) : (v = g + f, p = v + i, x = w - i, D = w + i), b = v) : (s === "left" ? p = g + Math.max(d, u) + i : s === "right" ? p = g + f - Math.max(c, h) - i : p = this.caretX, o === "top" ? (x = y, w = x - i, v = p - i, b = p + i) : (x = y + m, w = x + i, v = p + i, b = p - i), D = x), {
      x1: v,
      x2: p,
      x3: b,
      y1: x,
      y2: w,
      y3: D
    };
  }
  drawTitle(t, n, a) {
    const s = this.title, o = s.length;
    let i, l, d;
    if (o) {
      const c = qe(a.rtl, this.x, this.width);
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
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, Sa(t, m, v, p), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, Sa(t, m, v, p);
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
        y: f + 1,
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
    const f = qe(a.rtl, this.x, this.width), m = function($) {
      n.fillText($, f.x(t.x + y), t.y + g / 2), t.y += g + o;
    }, v = f.textAlign(i);
    let p, b, x, w, D, S, C;
    for (n.textAlign = i, n.textBaseline = "middle", n.font = h.string, t.x = Rn(this, v, a), n.fillStyle = a.bodyColor, xt(this.beforeBody, m), y = l && v !== "right" ? i === "center" ? c / 2 + u : c + 2 + u : 0, w = 0, S = s.length; w < S; ++w) {
      for (p = s[w], b = this.labelTextColors[w], n.fillStyle = b, xt(p.before, m), x = p.lines, l && x.length && (this._drawColorBox(n, t, w, f, a), g = Math.max(h.lineHeight, d)), D = 0, C = x.length; D < C; ++D)
        m(x[D]), g = h.lineHeight;
      xt(p.after, m);
    }
    y = 0, g = h.lineHeight, xt(this.afterBody, m), t.y -= o;
  }
  drawFooter(t, n, a) {
    const s = this.footer, o = s.length;
    let i, l;
    if (o) {
      const d = qe(a.rtl, this.x, this.width);
      for (t.x = Rn(this, a.footerAlign, a), t.y += a.footerMarginTop, n.textAlign = d.textAlign(a.footerAlign), n.textBaseline = "middle", i = Vt(a.footerFont), n.fillStyle = a.footerColor, n.font = i.string, l = 0; l < o; ++l)
        n.fillText(s[l], d.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + a.footerSpacing;
    }
  }
  drawBackground(t, n, a, s) {
    const { xAlign: o, yAlign: i } = this, { x: l, y: d } = t, { width: c, height: u } = a, { topLeft: h, topRight: g, bottomLeft: y, bottomRight: f } = Ye(s.cornerRadius);
    n.fillStyle = s.backgroundColor, n.strokeStyle = s.borderColor, n.lineWidth = s.borderWidth, n.beginPath(), n.moveTo(l + h, d), i === "top" && this.drawCaret(t, n, a, s), n.lineTo(l + c - g, d), n.quadraticCurveTo(l + c, d, l + c, d + g), i === "center" && o === "right" && this.drawCaret(t, n, a, s), n.lineTo(l + c, d + u - f), n.quadraticCurveTo(l + c, d + u, l + c - f, d + u), i === "bottom" && this.drawCaret(t, n, a, s), n.lineTo(l + y, d + u), n.quadraticCurveTo(l, d + u, l, d + u - y), i === "center" && o === "left" && this.drawCaret(t, n, a, s), n.lineTo(l, d + h), n.quadraticCurveTo(l, d, l + h, d), n.closePath(), n.fill(), s.borderWidth > 0 && n.stroke();
  }
  _updateAnimationTarget(t) {
    const n = this.chart, a = this.$animations, s = a && a.x, o = a && a.y;
    if (s || o) {
      const i = dn[t.position].call(this, this._active, this._eventPosition);
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
    const s = {
      width: this.width,
      height: this.height
    }, o = {
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
    }), o = !Yn(a, s), i = this._positionChanged(s, n);
    (o || i) && (this._active = s, this._eventPosition = n, this._ignoreReplayEvents = !0, this.update(!0));
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
  _getActiveElements(t, n, a, s) {
    const o = this.options;
    if (t.type === "mouseout")
      return [];
    if (!s)
      return n.filter((l) => this.chart.data.datasets[l.datasetIndex] && this.chart.getDatasetMeta(l.datasetIndex).controller.getParsed(l.index) !== void 0);
    const i = this.chart.getElementsAtEventForMode(t, o.mode, o, a);
    return o.reverse && i.reverse(), i;
  }
  _positionChanged(t, n) {
    const { caretX: a, caretY: s, options: o } = this, i = dn[o.position].call(this, t, n);
    return i !== !1 && (a !== i.x || s !== i.y);
  }
}
var Xa = {
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
    callbacks: xi
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
const hu = (e, t, n, a) => (typeof t == "string" ? (n = e.push(t) - 1, a.unshift({
  index: n,
  label: t
})) : isNaN(t) && (n = null), n);
function fu(e, t, n, a) {
  const s = e.indexOf(t);
  if (s === -1)
    return hu(e, t, n, a);
  const o = e.lastIndexOf(t);
  return s !== o ? n : s;
}
const gu = (e, t) => e === null ? null : zt(Math.round(e), 0, t);
function co(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class ki extends Xe {
  static id = "category";
  static defaults = {
    ticks: {
      callback: co
    }
  };
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const n = this._addedLabels;
    if (n.length) {
      const a = this.getLabels();
      for (const { index: s, label: o } of n)
        a[s] === o && a.splice(s, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, n) {
    if (_t(t))
      return null;
    const a = this.getLabels();
    return n = isFinite(n) && a[n] === t ? n : fu(a, t, dt(n, t), this._addedLabels), gu(n, a.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: n } = this.getUserBounds();
    let { min: a, max: s } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (a = 0), n || (s = this.getLabels().length - 1)), this.min = a, this.max = s;
  }
  buildTicks() {
    const t = this.min, n = this.max, a = this.options.offset, s = [];
    let o = this.getLabels();
    o = t === 0 && n === o.length - 1 ? o : o.slice(t, n + 1), this._valueRange = Math.max(o.length - (a ? 0 : 1), 1), this._startValue = this.min - (a ? 0.5 : 0);
    for (let i = t; i <= n; i++)
      s.push({
        value: i
      });
    return s;
  }
  getLabelForValue(t) {
    return co.call(this, t);
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
function pu(e, t) {
  const n = [], { bounds: s, step: o, min: i, max: l, precision: d, count: c, maxTicks: u, maxDigits: h, includeBounds: g } = e, y = o || 1, f = u - 1, { min: m, max: v } = t, p = !_t(i), b = !_t(l), x = !_t(c), w = (v - m) / (h + 1);
  let D = ds((v - m) / f / y) * y, S, C, $, L;
  if (D < 1e-14 && !p && !b)
    return [
      {
        value: m
      },
      {
        value: v
      }
    ];
  L = Math.ceil(v / D) - Math.floor(m / D), L > f && (D = ds(L * D / f / y) * y), _t(d) || (S = Math.pow(10, d), D = Math.ceil(D * S) / S), s === "ticks" ? (C = Math.floor(m / D) * D, $ = Math.ceil(v / D) * D) : (C = m, $ = v), p && b && o && Tl((l - i) / o, D / 1e3) ? (L = Math.round(Math.min((l - i) / D, u)), D = (l - i) / L, C = i, $ = l) : x ? (C = p ? i : C, $ = b ? l : $, L = c - 1, D = ($ - C) / L) : (L = ($ - C) / D, fn(L, Math.round(L), D / 1e3) ? L = Math.round(L) : L = Math.ceil(L));
  const T = Math.max(us(D), us(C));
  S = Math.pow(10, _t(d) ? T : d), C = Math.round(C * S) / S, $ = Math.round($ * S) / S;
  let B = 0;
  for (p && (g && C !== i ? (n.push({
    value: i
  }), C < i && B++, fn(Math.round((C + B * D) * S) / S, i, uo(i, w, e)) && B++) : C < i && B++); B < L; ++B) {
    const E = Math.round((C + B * D) * S) / S;
    if (b && E > l)
      break;
    n.push({
      value: E
    });
  }
  return b && g && $ !== l ? n.length && fn(n[n.length - 1].value, l, uo(l, w, e)) ? n[n.length - 1].value = l : n.push({
    value: l
  }) : (!b || $ === l) && n.push({
    value: $
  }), n;
}
function uo(e, t, { horizontal: n, minRotation: a }) {
  const s = ue(a), o = (n ? Math.sin(s) : Math.cos(s)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / o, i);
}
class mu extends Xe {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, n) {
    return _t(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
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
    this.min = s, this.max = o;
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: n, stepSize: a } = t, s;
    return a ? (s = Math.ceil(this.max / a) - Math.floor(this.min / a) + 1, s > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${a} would result generating up to ${s} ticks. Limiting to 1000.`), s = 1e3)) : (s = this.computeTickLimit(), n = n || 11), n && (s = Math.min(n, s)), s;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, n = t.ticks;
    let a = this.getTickLimit();
    a = Math.max(2, a);
    const s = {
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
    }, o = this._range || this, i = pu(s, o);
    return t.bounds === "ticks" && Bl(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
  }
  configure() {
    const t = this.ticks;
    let n = this.min, a = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const s = (a - n) / Math.max(t.length - 1, 1) / 2;
      n -= s, a += s;
    }
    this._startValue = n, this._endValue = a, this._valueRange = a - n;
  }
  getLabelForValue(t) {
    return Oa(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class wi extends mu {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: qo.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!0);
    this.min = Gt(t) ? t : 0, this.max = Gt(n) ? n : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), n = t ? this.width : this.height, a = ue(this.options.ticks.minRotation), s = (t ? Math.sin(a) : Math.cos(a)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(n / Math.min(40, o.lineHeight / s));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const na = {
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
}, jt = /* @__PURE__ */ Object.keys(na);
function ho(e, t) {
  return e - t;
}
function fo(e, t) {
  if (_t(t))
    return null;
  const n = e._adapter, { parser: a, round: s, isoWeekday: o } = e._parseOpts;
  let i = t;
  return typeof a == "function" && (i = a(i)), Gt(i) || (i = typeof a == "string" ? n.parse(i, a) : n.parse(i)), i === null ? null : (s && (i = s === "week" && (_n(o) || o === !0) ? n.startOf(i, "isoWeek", o) : n.startOf(i, s)), +i);
}
function go(e, t, n, a) {
  const s = jt.length;
  for (let o = jt.indexOf(e); o < s - 1; ++o) {
    const i = na[jt[o]], l = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((n - t) / (l * i.size)) <= a)
      return jt[o];
  }
  return jt[s - 1];
}
function bu(e, t, n, a, s) {
  for (let o = jt.length - 1; o >= jt.indexOf(n); o--) {
    const i = jt[o];
    if (na[i].common && e._adapter.diff(s, a, i) >= t - 1)
      return i;
  }
  return jt[n ? jt.indexOf(n) : 0];
}
function vu(e) {
  for (let t = jt.indexOf(e) + 1, n = jt.length; t < n; ++t)
    if (na[jt[t]].common)
      return jt[t];
}
function po(e, t, n) {
  if (!n)
    e[t] = !0;
  else if (n.length) {
    const { lo: a, hi: s } = Ia(n, t), o = n[a] >= t ? n[a] : n[s];
    e[o] = !0;
  }
}
function yu(e, t, n, a) {
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
  return o === 0 || !n ? a : yu(e, a, s, n);
}
class bo extends Xe {
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
    const a = t.time || (t.time = {}), s = this._adapter = new _c._date(t.adapters.date);
    s.init(n), hn(a.displayFormats, s.formats()), this._parseOpts = {
      parser: a.parser,
      round: a.round,
      isoWeekday: a.isoWeekday
    }, super.init(t), this._normalized = n.normalized;
  }
  parse(t, n) {
    return t === void 0 ? null : fo(this, t);
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
    const o = this.min, i = this.max, l = Pl(s, o, i);
    return this._unit = n.unit || (a.autoSkip ? go(n.minUnit, this.min, this.max, this._getLabelCapacity(o)) : bu(this, l.length, n.minUnit, this.min, this.max)), this._majorUnit = !a.major.enabled || this._unit === "year" ? void 0 : vu(this._unit), this.initOffsets(s), t.reverse && l.reverse(), mo(this, l, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let n = 0, a = 0, s, o;
    this.options.offset && t.length && (s = this.getDecimalForValue(t[0]), t.length === 1 ? n = 1 - s : n = (this.getDecimalForValue(t[1]) - s) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? a = o : a = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    n = zt(n, 0, i), a = zt(a, 0, i), this._offsets = {
      start: n,
      end: a,
      factor: 1 / (n + 1 + a)
    };
  }
  _generate() {
    const t = this._adapter, n = this.min, a = this.max, s = this.options, o = s.time, i = o.unit || go(o.minUnit, n, a, this._getLabelCapacity(n)), l = dt(s.ticks.stepSize, 1), d = i === "week" ? o.isoWeekday : !1, c = _n(d) || d === !0, u = {};
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
    const s = this.options.time.displayFormats, o = this._unit, i = n || s[o];
    return this._adapter.format(t, i);
  }
  _tickFormatFunction(t, n, a, s) {
    const o = this.options, i = o.ticks.callback;
    if (i)
      return $t(i, [
        t,
        n,
        a
      ], this);
    const l = o.time.displayFormats, d = this._unit, c = this._majorUnit, u = d && l[d], h = c && l[c], g = a[n], y = c && h && g && g.major;
    return this._adapter.format(t, s || (y ? h : u));
  }
  generateTickLabels(t) {
    let n, a, s;
    for (n = 0, a = t.length; n < a; ++n)
      s = t[n], s.label = this._tickFormatFunction(s.value, n, t);
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
    const n = this.options.time, a = n.displayFormats, s = a[n.unit] || a.millisecond, o = this._tickFormatFunction(t, 0, mo(this, [
      t
    ], this._majorUnit), s), i = this._getLabelSize(o), l = Math.floor(this.isHorizontal() ? this.width / i.w : this.height / i.h) - 1;
    return l > 0 ? l : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], n, a;
    if (t.length)
      return t;
    const s = this.getMatchingVisibleMetas();
    if (this._normalized && s.length)
      return this._cache.data = s[0].controller.getAllParsedValues(this);
    for (n = 0, a = s.length; n < a; ++n)
      t = t.concat(s[n].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let n, a;
    if (t.length)
      return t;
    const s = this.getLabels();
    for (n = 0, a = s.length; n < a; ++n)
      t.push(fo(this, s[n]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Ho(t.sort(ho));
  }
}
function On(e, t, n) {
  let a = 0, s = e.length - 1, o, i, l, d;
  n ? (t >= e[a].pos && t <= e[s].pos && ({ lo: a, hi: s } = Ie(e, "pos", t)), { pos: o, time: l } = e[a], { pos: i, time: d } = e[s]) : (t >= e[a].time && t <= e[s].time && ({ lo: a, hi: s } = Ie(e, "time", t)), { time: o, pos: l } = e[a], { time: i, pos: d } = e[s]);
  const c = i - o;
  return c ? l + (d - l) * (t - o) / c : l;
}
class F5 extends bo {
  static id = "timeseries";
  static defaults = bo.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(t);
    this._minPos = On(n, this.min), this._tableRange = On(n, this.max) - this._minPos, super.initOffsets(t);
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
    return o;
  }
  _generate() {
    const t = this.min, n = this.max;
    let a = super.getDataTimestamps();
    return (!a.includes(t) || !a.length) && a.splice(0, 0, t), (!a.includes(n) || a.length === 1) && a.push(n), a.sort((s, o) => s - o);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const n = this.getDataTimestamps(), a = this.getLabelTimestamps();
    return n.length && a.length ? t = this.normalize(n.concat(a)) : t = n.length ? n : a, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (On(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const n = this._offsets, a = this.getDecimalForPixel(t) / n.factor - n.end;
    return On(this._table, a * this._tableRange + this._minPos, !0);
  }
}
const Ci = {
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
}, _u = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, xu = {
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
  ..._u
}, ku = qi[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function He(e) {
  return Lo(e) ? ka(e) : e;
}
function wu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return Lo(t) ? new Proxy(e, {}) : e;
}
function Cu(e, t) {
  const n = e.options;
  n && t && Object.assign(n, t);
}
function $i(e, t) {
  e.labels = t;
}
function Si(e, t, n) {
  const a = [];
  e.datasets = t.map((s) => {
    const o = e.datasets.find((i) => i[n] === s[n]);
    return !o || !s.data || a.includes(o) ? {
      ...s
    } : (a.push(o), Object.assign(o, s), o);
  });
}
function $u(e, t) {
  const n = {
    labels: [],
    datasets: []
  };
  return $i(n, e.labels), Si(n, e.datasets, t), n;
}
const Su = Q({
  props: xu,
  setup(e, t) {
    let { expose: n, slots: a } = t;
    const s = st(null), o = Bo(null);
    n({
      chart: o
    });
    const i = () => {
      if (!s.value) return;
      const { type: c, data: u, options: h, plugins: g, datasetIdKey: y } = e, f = $u(u, y), m = wu(f, u);
      o.value = new Ge(s.value, {
        type: c,
        data: m,
        options: {
          ...h
        },
        plugins: g
      });
    }, l = () => {
      const c = ka(o.value);
      c && (e.destroyDelay > 0 ? setTimeout(() => {
        c.destroy(), o.value = null;
      }, e.destroyDelay) : (c.destroy(), o.value = null));
    }, d = (c) => {
      c.update(e.updateMode);
    };
    return te(i), $e(l), Pt([
      () => e.options,
      () => e.data
    ], (c, u) => {
      let [h, g] = c, [y, f] = u;
      const m = ka(o.value);
      if (!m)
        return;
      let v = !1;
      if (h) {
        const p = He(h), b = He(y);
        p && p !== b && (Cu(m, p), v = !0);
      }
      if (g) {
        const p = He(g.labels), b = He(f.labels), x = He(g.datasets), w = He(f.datasets);
        p !== b && ($i(m.config.data, p), v = !0), x && x !== w && (Si(m.config.data, x, e.datasetIdKey), v = !0);
      }
      v && Lt(() => {
        d(m);
      });
    }, {
      deep: !0
    }), () => xa("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: s
    }, [
      xa("p", {}, [
        a.default ? a.default() : ""
      ])
    ]);
  }
});
function Ga(e, t) {
  return Ge.register(t), Q({
    props: Ci,
    setup(n, a) {
      let { expose: s } = a;
      const o = Bo(null), i = (l) => {
        o.value = l?.chart;
      };
      return s({
        chart: o
      }), () => xa(Su, ku({
        ref: i
      }, {
        type: e,
        ...n
      }));
    }
  });
}
const Mu = /* @__PURE__ */ Ga("bar", pc), Du = /* @__PURE__ */ Ga("line", vc), Au = /* @__PURE__ */ Ga("pie", yc), vo = {
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
}, yo = {
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
}, Tu = [
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
function ht(e) {
  const t = st("light");
  let n = null;
  const a = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", s = M(() => e?.value ? e.value : t.value), o = M(() => s.value === "dark"), i = M(() => o.value ? yo : vo), l = () => {
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
  }), $e(() => {
    d();
  }), e && Pt(e, () => {
  }), {
    isDark: o,
    currentTheme: s,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: vo,
    darkColors: yo,
    chartSeriesColors: Tu
  };
}
const Bu = { class: "relative h-[230px] w-full shrink-0 bg-transparent font-sans" }, nn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", _o = 10, Lu = /* @__PURE__ */ Q({
  __name: "ChartBar",
  props: {
    data: {},
    options: {},
    stacked: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Ge.register(ki, wi, Qd, _i, Xa, Ua);
    const { isDark: a, colors: s } = ht(ut(n, "theme")), o = M(() => n.data), i = (c) => typeof c == "string" ? c.charAt(0).toUpperCase() + c.slice(1).toLowerCase() : c;
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
    const d = M(() => {
      const c = {
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
                family: nn,
                size: 13,
                weight: "500"
              },
              padding: 12,
              boxWidth: _o,
              boxHeight: _o,
              usePointStyle: !1,
              generateLabels: function(u) {
                return u.data.datasets.map((g, y) => {
                  const f = Array.isArray(g.backgroundColor) ? g.backgroundColor[0] : g.backgroundColor, m = Array.isArray(g.borderColor) ? g.borderColor[0] : g.borderColor, v = typeof m == "string" && m.length > 0 ? m : typeof f == "string" && f.length > 0 ? f : s.value.textSecondary;
                  return {
                    text: i(g.label || ""),
                    fillStyle: typeof f == "string" ? f : v,
                    strokeStyle: v,
                    lineWidth: 0,
                    fontColor: v,
                    hidden: !u.isDatasetVisible(y),
                    index: y,
                    datasetIndex: y
                  };
                });
              }
            }
          },
          tooltip: {
            enabled: !0,
            backgroundColor: s.value.tooltipBg,
            titleColor: s.value.tooltipText,
            bodyColor: a.value ? "#d1d5db" : "#e2e8f0",
            borderColor: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            displayColors: !0,
            titleFont: {
              family: nn,
              size: 13,
              weight: "600"
            },
            bodyFont: {
              family: nn,
              size: 12,
              weight: "500"
            },
            boxPadding: 6,
            callbacks: {
              title: function(u) {
                return u.length > 0 ? String(i(u[0].label)) : "";
              },
              label: function(u) {
                let h = String(i(u.dataset.label || ""));
                return h && (h += ": "), u.parsed.y !== null && (h += u.parsed.y), h;
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
              font: {
                family: nn,
                size: 12,
                weight: "500"
              },
              color: s.value.textSecondary,
              padding: 8,
              callback: function(u) {
                return i(u);
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
              font: {
                family: nn,
                size: 12,
                weight: "500"
              },
              color: s.value.textSecondary,
              padding: 8,
              callback: function(u) {
                const h = this.getLabelForValue(u);
                return i(h);
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
    return t({ isDark: a }), (c, u) => (_(), k("div", Bu, [
      R(F(Mu), {
        data: o.value,
        options: d.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), it = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, he = /* @__PURE__ */ it(Lu, [["__scopeId", "data-v-406e0e92"]]), Fu = { class: "chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-sans min-w-0" }, Eu = { class: "chart-line-canvas-host relative min-h-0 w-full flex-1" }, Iu = {
  key: 0,
  class: "chart-line-indicators mt-0 flex shrink-0 list-none flex-nowrap items-center justify-center gap-x-4 overflow-x-auto overflow-y-hidden px-1 pb-0.5 pt-0.5",
  role: "list"
}, Pu = ["aria-pressed", "aria-label", "onClick"], zn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Ru = /* @__PURE__ */ Q({
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
      Yd,
      _i,
      Xa,
      Ua
    );
    const a = st(null), { isDark: s, colors: o } = ht(ut(n, "theme")), i = M(() => o.value.bgCard), l = M(() => {
      const m = i.value;
      return {
        labels: n.data.labels,
        datasets: n.data.datasets.map((v) => {
          const p = v.borderColor, b = Array.isArray(p) ? p[0] : p, x = typeof b == "string" && b.length > 0 ? b : o.value.textSecondary, w = v.pointBackgroundColor !== void 0 ? v.pointBackgroundColor : m, D = v.pointHoverBackgroundColor !== void 0 ? v.pointHoverBackgroundColor : w, S = v.pointBorderWidth ?? 2, C = v.pointHoverBorderWidth ?? S;
          return {
            ...v,
            fill: v.fill ?? !1,
            pointBackgroundColor: w,
            pointHoverBackgroundColor: D,
            pointBorderColor: v.pointBorderColor ?? x,
            pointHoverBorderColor: v.pointHoverBorderColor ?? x,
            pointBorderWidth: S,
            pointHoverBorderWidth: C
          };
        })
      };
    }), d = (m) => typeof m == "string" ? m.charAt(0).toUpperCase() + m.slice(1).toLowerCase() : m;
    function c(m) {
      const v = m.borderColor, p = Array.isArray(v) ? v[0] : v;
      return typeof p == "string" && p.length > 0 ? p : o.value.textSecondary;
    }
    const u = M(
      () => l.value.datasets.map((m, v) => ({
        key: `${m.label ?? "dataset"}-${v}`,
        label: d(m.label || ""),
        color: c(m)
      }))
    ), h = st([]);
    Pt(
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
    const f = M(() => {
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
          legend: {
            display: !1
          },
          tooltip: {
            enabled: !0,
            mode: "index",
            intersect: !1,
            backgroundColor: o.value.tooltipBg,
            titleColor: o.value.tooltipText,
            bodyColor: o.value.textSecondary,
            borderColor: o.value.tooltipBorder,
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            displayColors: !0,
            titleFont: {
              family: zn,
              size: 14,
              weight: "600"
            },
            bodyFont: {
              family: zn,
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
              color: o.value.gridLines,
              lineWidth: 1,
              drawTicks: !1
            },
            ticks: {
              font: {
                family: zn,
                size: 11
              },
              color: o.value.textSecondary
            }
          },
          y: {
            type: "linear",
            display: !0,
            position: "left",
            beginAtZero: !0,
            grid: {
              color: o.value.gridLines
            },
            ticks: {
              font: {
                family: zn,
                size: 11
              },
              color: o.value.textSecondary
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
            radius: 5,
            hoverRadius: 7,
            borderWidth: 2,
            hoverBorderWidth: 2
          }
        }
      };
      return n.options ? y(m, n.options) : m;
    });
    return t({ isDark: s }), (m, v) => (_(), k("div", Fu, [
      r("div", Eu, [
        R(F(Du), {
          ref_key: "lineChartRef",
          ref: a,
          data: l.value,
          options: f.value
        }, null, 8, ["data", "options"])
      ]),
      u.value.length > 0 ? (_(), k("ul", Iu, [
        (_(!0), k(U, null, at(u.value, (p, b) => (_(), k("li", {
          key: p.key,
          role: "listitem"
        }, [
          r("button", {
            type: "button",
            class: H(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-sans text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", h.value[b] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: mt({ color: p.color }),
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
          ], 14, Pu)
        ]))), 128))
      ])) : z("", !0)
    ]));
  }
}), Se = /* @__PURE__ */ it(Ru, [["__scopeId", "data-v-1ba3294e"]]), Ou = { class: "chart-container" }, zu = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Vu = /* @__PURE__ */ Q({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Ge.register(Id, Xa, Ua);
    const { isDark: a, colors: s } = ht(ut(n, "theme")), o = n.data, i = (d) => typeof d == "string" ? d.charAt(0).toUpperCase() + d.slice(1).toLowerCase() : d, l = M(() => n.options ? n.options : {
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
              family: zu,
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
                const y = d.getDatasetMeta(0).controller.getStyle(h), m = c.datasets[0].data[h], v = typeof y.backgroundColor == "string" && y.backgroundColor.length > 0 ? y.backgroundColor : s.value.textSecondary;
                return {
                  text: `${i(u)}: ${m}`,
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
          backgroundColor: s.value.tooltipBg,
          titleColor: s.value.tooltipText,
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
    return t({ isDark: a }), (d, c) => (_(), k("div", Ou, [
      R(F(Au), {
        data: F(o),
        options: l.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), aa = /* @__PURE__ */ it(Vu, [["__scopeId", "data-v-0f7806d6"]]), Nu = { class: "chart-container" }, Wu = ["viewBox"], Hu = ["transform"], ju = ["x", "width", "fill", "stroke"], Yu = ["fill"], qu = ["x1", "y1", "x2", "y2", "stroke"], Ku = ["points", "fill"], Uu = ["x1", "y1", "x2", "y2", "stroke"], Xu = ["x", "y", "fill"], Gu = ["x1", "y1", "x2", "y2", "stroke"], Zu = ["points", "fill"], Qu = ["transform"], Ju = ["y1", "y2"], th = ["y1", "y2"], eh = ["y1", "y2"], nh = ["y1", "y2"], ah = ["y", "height"], sh = ["y1", "y2"], oh = ["y1", "y2"], ih = ["y1", "y2"], lh = ["y1", "y2"], rh = ["y", "height"], ch = ["cy", "stroke", "onMouseenter"], dh = ["cy", "stroke", "onMouseenter"], uh = ["cy", "stroke", "onMouseenter"], hh = ["cy", "stroke", "onMouseenter"], fh = ["y1", "y2", "onMouseenter"], gh = ["y1", "y2", "onMouseenter"], ph = ["x", "y", "fill"], mh = ["x", "y", "fill"], bh = ["transform"], vh = { transform: "translate(-200, 0)" }, yh = ["stroke"], _h = ["fill"], xh = { transform: "translate(-130, 0)" }, kh = ["stroke"], wh = ["fill"], Ch = { transform: "translate(-60, 0)" }, $h = ["stroke"], Sh = ["fill"], Mh = { transform: "translate(10, 0)" }, Dh = ["stroke"], Ah = ["fill"], Th = { transform: "translate(80, 0)" }, Bh = ["fill"], Lh = { transform: "translate(150, 0)" }, Fh = ["fill"], Eh = /* @__PURE__ */ Q({
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
    const n = e, { isDark: a } = ht(ut(n, "theme")), s = M(() => ({
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
    })), o = st({
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
      o.value.visible = !1;
    }, u = () => {
      o.value.visible = !1;
    }, h = M(() => {
      const g = [], f = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let m = 1; m <= 10; m++) {
        const v = m, p = (v - 1) / 9, b = n.chartMargin + f - p * f;
        g.push({ value: v, y: b });
      }
      return g;
    });
    return t({ isDark: a }), (g, y) => (_(), k("div", Nu, [
      (_(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: mt(`min-height: ${e.chartHeight}px;`),
        onMousemove: d,
        onMouseleave: c
      }, [
        o.value.visible ? (_(), k("g", {
          key: 0,
          transform: `translate(${o.value.x}, ${o.value.y})`
        }, [
          r("rect", {
            x: -(o.value.text.length * 6 + 10),
            y: -16,
            width: o.value.text.length * 12 + 20,
            height: "24",
            fill: s.value.tooltipBg,
            rx: "6",
            stroke: s.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, ju),
          r("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: s.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, A(o.value.text), 9, Yu)
        ], 8, Hu)) : z("", !0),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: s.value.axis,
          "stroke-width": "2"
        }, null, 8, qu),
        r("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: s.value.axis
        }, null, 8, Ku),
        (_(!0), k(U, null, at(h.value, (f, m) => (_(), k(U, { key: m }, [
          r("line", {
            x1: e.chartMargin - 6,
            y1: f.y,
            x2: e.chartMargin,
            y2: f.y,
            stroke: s.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Uu),
          r("text", {
            x: e.chartMargin - 12,
            y: f.y + 4,
            "text-anchor": "end",
            fill: s.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(f.value), 9, Xu)
        ], 64))), 128)),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: s.value.axis,
          "stroke-width": "2"
        }, null, 8, Gu),
        r("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: s.value.axis
        }, null, 8, Zu),
        (_(!0), k(U, null, at(e.boxplotData, (f, m) => (_(), k(U, { key: m }, [
          r("g", {
            transform: `translate(${f.centerX}, 0)`
          }, [
            f.isTotal ? (_(), k(U, { key: 0 }, [
              r("line", {
                x1: 0,
                y1: f.minY,
                x2: 0,
                y2: f.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Ju),
              r("line", {
                x1: 0,
                y1: f.q3Y,
                x2: 0,
                y2: f.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, th),
              r("line", {
                x1: -18,
                y1: f.minY,
                x2: 18,
                y2: f.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, eh),
              r("line", {
                x1: -18,
                y1: f.maxY,
                x2: 18,
                y2: f.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, nh),
              r("rect", {
                x: -24,
                y: f.q3Y,
                width: "48",
                height: f.q1Y - f.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, ah)
            ], 64)) : (_(), k(U, { key: 1 }, [
              r("line", {
                x1: 0,
                y1: f.minY,
                x2: 0,
                y2: f.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, sh),
              r("line", {
                x1: 0,
                y1: f.q3Y,
                x2: 0,
                y2: f.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, oh),
              r("line", {
                x1: -18,
                y1: f.minY,
                x2: 18,
                y2: f.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, ih),
              r("line", {
                x1: -18,
                y1: f.maxY,
                x2: 18,
                y2: f.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, lh),
              r("rect", {
                x: -24,
                y: f.q3Y,
                width: "48",
                height: f.q1Y - f.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, rh)
            ], 64)),
            r("circle", {
              cx: 0,
              cy: f.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Min: ${f.min.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, ch),
            r("circle", {
              cx: 0,
              cy: f.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Q1: ${f.q1.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, dh),
            r("circle", {
              cx: 0,
              cy: f.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Q3: ${f.q3.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, uh),
            r("circle", {
              cx: 0,
              cy: f.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Max: ${f.max.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, hh),
            r("line", {
              x1: -24,
              y1: f.medianY,
              x2: 24,
              y2: f.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (v) => l(v, `Median: ${f.median.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, fh),
            f.averageY ? (_(), k("line", {
              key: 2,
              x1: -24,
              y1: f.averageY,
              x2: 24,
              y2: f.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (v) => l(v, `Avg: ${f.average.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, gh)) : z("", !0)
          ], 8, Qu),
          r("text", {
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: s.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(i(f.label)), 9, ph),
          f.responseCount ? (_(), k("text", {
            key: 0,
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: s.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(f.responseCount), 9, mh)) : z("", !0)
        ], 64))), 128)),
        e.showLegend ? (_(), k("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          r("g", vh, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, yh),
            r("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, _h)
          ]),
          r("g", xh, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, kh),
            r("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, wh)
          ]),
          r("g", Ch, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, $h),
            r("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Sh)
          ]),
          r("g", Mh, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Dh),
            r("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Ah)
          ]),
          r("g", Th, [
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
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, Bh)
          ]),
          r("g", Lh, [
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
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, Fh)
          ])
        ], 8, bh)) : z("", !0)
      ], 44, Wu))
    ]));
  }
}), Ih = /* @__PURE__ */ it(Eh, [["__scopeId", "data-v-9ac5c075"]]), Ph = { class: "chart-container" }, Rh = ["viewBox"], Oh = ["transform"], zh = ["x", "y", "width", "height", "fill", "stroke"], Vh = ["y", "fill"], Nh = ["y", "fill"], Wh = ["x1", "y1", "x2", "y2", "stroke"], Hh = ["points", "fill"], jh = ["x1", "y1", "x2", "y2", "stroke"], Yh = ["x1", "y1", "x2", "y2", "stroke"], qh = ["x", "y", "fill"], Kh = ["x", "y", "fill", "transform"], Uh = ["x1", "y1", "x2", "y2", "stroke"], Xh = ["points", "fill"], Gh = ["transform"], Zh = ["y1", "y2", "stroke", "onMouseenter"], Qh = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], Jh = ["x1", "y1", "x2", "y2", "onMouseenter"], tf = ["x1", "y1", "x2", "y2", "onMouseenter"], ef = ["cy", "stroke", "onMouseenter"], nf = ["cy", "stroke", "onMouseenter"], af = ["x", "y", "fill"], sf = ["x", "y", "fill"], of = ["transform"], lf = { transform: "translate(-180, 0)" }, rf = ["stroke"], cf = ["fill"], df = { transform: "translate(-120, 0)" }, uf = ["fill"], hf = { transform: "translate(-60, 0)" }, ff = ["fill"], gf = { transform: "translate(0, 0)" }, pf = ["stroke"], mf = ["fill"], bf = { transform: "translate(60, 0)" }, vf = ["fill"], yf = { transform: "translate(130, 0)" }, _f = ["fill"], xf = /* @__PURE__ */ Q({
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
    const n = e, { isDark: a } = ht(ut(n, "theme")), s = M(() => ({
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
    })), o = st({
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
          x = `Q1: ${y.q1.toFixed(1)} | Q3: ${y.q3.toFixed(1)}`;
          break;
        case "wick":
          x = `Min: ${y.low.toFixed(1)} | Max: ${y.high.toFixed(1)}`;
          break;
        case "median":
          x = `Median: ${y.median.toFixed(1)}`;
          break;
        case "average":
          x = `Average: ${y.average?.toFixed(1)}`;
          break;
        case "min":
          x = `Min: ${y.low.toFixed(1)}`;
          break;
        case "max":
          x = `Max: ${y.high.toFixed(1)}`;
          break;
      }
      const w = Math.max(180, x.length * 7 + 40), D = 48;
      o.value = {
        visible: !0,
        x: p.x,
        y: p.y - 20,
        title: b,
        text: x,
        width: w,
        height: D
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
    }, h = M(() => {
      const g = [], f = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let m = 1; m <= 10; m++) {
        const v = m, p = (v - 1) / 9, b = n.chartMargin + f - p * f;
        g.push({ value: v, y: b });
      }
      return g;
    });
    return t({ isDark: a }), (g, y) => (_(), k("div", Ph, [
      (_(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: mt(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
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
          }, null, 8, zh),
          r("text", {
            x: "0",
            y: -o.value.height + 8,
            "text-anchor": "middle",
            fill: s.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(o.value.title), 9, Vh),
          r("text", {
            x: "0",
            y: -o.value.height + 26,
            "text-anchor": "middle",
            fill: s.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(o.value.text), 9, Nh)
        ], 8, Oh)) : z("", !0),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: s.value.axis,
          "stroke-width": "2"
        }, null, 8, Wh),
        r("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: s.value.axis
        }, null, 8, Hh),
        (_(!0), k(U, null, at(h.value, (f, m) => (_(), k("line", {
          key: `grid-${m}`,
          x1: e.chartMargin,
          y1: f.y,
          x2: e.chartWidth - e.chartMargin,
          y2: f.y,
          stroke: s.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, jh))), 128)),
        (_(!0), k(U, null, at(h.value, (f, m) => (_(), k(U, { key: m }, [
          r("line", {
            x1: e.chartMargin - 6,
            y1: f.y,
            x2: e.chartMargin,
            y2: f.y,
            stroke: s.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Yh),
          r("text", {
            x: e.chartMargin - 12,
            y: f.y + 4,
            "text-anchor": "end",
            fill: s.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(f.value), 9, qh)
        ], 64))), 128)),
        r("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: s.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, A(i(e.yAxisLabel)), 9, Kh),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: s.value.axis,
          "stroke-width": "2"
        }, null, 8, Uh),
        r("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: s.value.axis
        }, null, 8, Xh),
        (_(!0), k(U, null, at(e.candlestickData, (f, m) => (_(), k(U, { key: m }, [
          r("g", {
            transform: `translate(${f.centerX}, 0)`
          }, [
            r("line", {
              x1: 0,
              y1: f.highY,
              x2: 0,
              y2: f.lowY,
              stroke: f.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "hover-line",
              onMouseenter: (v) => l(v, f, "wick"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Zh),
            r("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(f.q1Y, f.q3Y) - (Math.abs(f.q3Y - f.q1Y) < 4 ? 4 : 0),
              width: e.candleWidth,
              height: Math.max(8, Math.abs(f.q3Y - f.q1Y)),
              fill: f.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: f.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (v) => l(v, f, "body"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Qh),
            f.medianY ? (_(), k("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: f.medianY,
              x2: e.candleWidth / 2,
              y2: f.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (v) => l(v, f, "median"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Jh)) : z("", !0),
            f.averageY ? (_(), k("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: f.averageY,
              x2: e.candleWidth / 2,
              y2: f.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (v) => l(v, f, "average"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, tf)) : z("", !0),
            r("circle", {
              cx: 0,
              cy: f.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, f, "min"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, ef),
            r("circle", {
              cx: 0,
              cy: f.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, f, "max"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, nf)
          ], 8, Gh),
          r("text", {
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: s.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(i(f.label)), 9, af),
          f.responseCount ? (_(), k("text", {
            key: 0,
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: s.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(f.responseCount), 9, sf)) : z("", !0)
        ], 64))), 128)),
        e.showLegend ? (_(), k("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          r("g", lf, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, rf),
            r("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, cf)
          ]),
          r("g", df, [
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
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, uf)
          ]),
          r("g", hf, [
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
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, ff)
          ]),
          r("g", gf, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, pf),
            r("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, mf)
          ]),
          r("g", bf, [
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
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, vf)
          ]),
          r("g", yf, [
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
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, _f)
          ])
        ], 8, of)) : z("", !0)
      ], 44, Rh))
    ]));
  }
}), Mi = /* @__PURE__ */ it(xf, [["__scopeId", "data-v-e792fb9f"]]), kf = ["viewBox"], wf = ["transform"], Cf = ["x", "y", "width", "height", "fill", "stroke"], $f = ["y", "fill"], Sf = ["y", "fill"], Mf = ["x1", "y1", "x2", "y2", "stroke"], Df = ["x1", "y1", "x2", "y2", "stroke"], Af = ["points", "fill"], Tf = ["x1", "y1", "x2", "y2", "stroke"], Bf = ["x", "y", "fill"], Lf = ["x", "y", "fill", "transform"], Ff = ["x1", "y1", "x2", "y2", "stroke"], Ef = ["points", "fill"], If = ["x1", "y1", "x2", "y2", "stroke"], Pf = ["x", "y", "fill"], Rf = ["x", "y", "fill"], Of = ["d"], zf = ["x", "y", "width", "height", "onMouseenter"], Vf = ["x1", "y1", "x2", "y2"], Nf = ["x", "y"], Wf = ["x1", "y1", "x2", "y2"], Hf = ["x", "y"], jf = ["x1", "y1", "x2", "y2"], Yf = ["x", "y"], qf = ["x1", "y1", "x2", "y2"], Kf = ["x", "y"], Uf = ["x1", "y1", "x2", "y2"], Xf = ["x", "y"], Gf = ["x1", "y1", "x2", "y2"], Zf = ["x", "y"], Qf = ["transform"], Jf = { transform: "translate(-220, 0)" }, tg = ["fill"], eg = { transform: "translate(-140, 0)" }, ng = ["fill"], ag = { transform: "translate(-80, 0)" }, sg = ["fill"], og = { transform: "translate(-20, 0)" }, ig = ["fill"], lg = { transform: "translate(60, 0)" }, rg = ["fill"], cg = { transform: "translate(130, 0)" }, dg = ["fill"], ug = { transform: "translate(180, 0)" }, hg = ["fill"], fg = /* @__PURE__ */ Q({
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
    const n = e, { isDark: a } = ht(ut(n, "theme")), s = M(() => ({
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
    })), o = st({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), i = M(() => n.chartWidth - n.chartMargin * 2), l = M(() => n.chartHeight - n.chartMargin - n.chartBottomMargin), d = M(() => i.value / 10 * 0.6), c = M(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const G = Math.max(...n.histogram.map((j) => j.count || 0), 1), q = Math.max(1, Math.ceil(G * 0.2));
      return G + q;
    }), u = M(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const G = n.averageScore || 0;
      let q = 0, j = 0;
      if (n.histogram.forEach((X) => {
        const ct = X.count || 0;
        q += ct;
        const gt = X.score - G;
        j += ct * (gt * gt);
      }), q === 0) return 1;
      const ot = j / q;
      return Math.sqrt(ot) || 1;
    }), h = (G, q, j) => {
      if (j === 0) return 0;
      const ot = 1 / (j * Math.sqrt(2 * Math.PI)), X = -0.5 * Math.pow((G - q) / j, 2);
      return ot * Math.exp(X);
    }, g = M(() => {
      if (!n.histogram || n.histogram.length === 0 || n.averageScore === 0 && u.value === 0) return null;
      const G = n.averageScore, q = u.value, j = 100, X = Math.max(...n.histogram.map((Ct) => Ct.count || 0), 1) / c.value * l.value;
      if (X <= 0) return null;
      let ct = 0;
      for (let Ct = 0; Ct <= j; Ct++) {
        const St = 1 + 9 * (Ct / j), Bt = h(St, G, q);
        Bt > ct && (ct = Bt);
      }
      if (ct <= 0) return null;
      const gt = X / ct, Z = [];
      for (let Ct = 0; Ct <= j; Ct++) {
        const St = 1 + 9 * (Ct / j), Bt = h(St, G, q) * gt, ee = f(St);
        if (ee !== null) {
          const oa = n.chartHeight - n.chartBottomMargin - Bt;
          Z.push(`${Ct === 0 ? "M" : "L"} ${ee} ${oa}`);
        }
      }
      return Z.join(" ");
    }), y = M(() => {
      if (!n.histogram || n.histogram.length === 0) return [];
      const G = i.value / 10;
      return n.histogram.map((q, j) => {
        const ot = n.chartMargin + (j + 0.5) * G, X = q.count > 0 ? q.count / c.value * l.value : 0, ct = n.chartHeight - n.chartBottomMargin - X;
        return {
          score: q.score,
          count: q.count,
          x: ot,
          y: ct,
          height: X
        };
      });
    }), f = (G) => {
      if (G < 1 || G > 10) return null;
      const q = i.value / 10;
      return n.chartMargin + (G - 0.5) * q;
    }, m = M(() => f(n.minScore)), v = M(() => f(n.maxScore)), p = M(() => f(n.q1Score)), b = M(() => f(n.medianScore)), x = M(() => f(n.q3Score)), w = M(() => f(n.averageScore)), D = M(() => n.minScore), S = M(() => n.maxScore), C = M(() => n.q1Score), $ = M(() => n.medianScore), L = M(() => n.q3Score), T = M(() => n.averageScore), B = M(() => {
      const G = [], q = n.chartMargin - 8, j = 18;
      p.value !== null && G.push({
        x: p.value,
        y: q,
        value: n.q1Score,
        label: `Q1: ${C.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), b.value !== null && G.push({
        x: b.value,
        y: q - j,
        value: n.medianScore,
        label: `Median: ${$.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), w.value !== null && G.push({
        x: w.value,
        y: q - j,
        value: n.averageScore,
        label: `Avg: ${T.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), x.value !== null && G.push({
        x: x.value,
        y: q,
        value: n.q3Score,
        label: `Q3: ${L.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), G.sort((ct, gt) => (ct.x || 0) - (gt.x || 0));
      const ot = [[], [], []];
      G.forEach((ct) => {
        if (ct.x === null) return;
        let gt = -1;
        for (let Z = 0; Z < ot.length; Z++) {
          let Ct = !1;
          for (const St of ot[Z]) {
            if (St.x === null) continue;
            const Bt = Math.abs(ct.x - St.x), ee = (ct.width + St.width) / 2 + 10;
            if (Bt < ee) {
              Ct = !0;
              break;
            }
          }
          if (!Ct) {
            gt = Z;
            break;
          }
        }
        gt === -1 && (gt = ot.length - 1), ct.y = q - gt * j, ot[gt].push(ct);
      });
      const X = 15;
      return G.forEach((ct) => {
        ct.y < X && (ct.y = X);
      }), G;
    }), E = (G) => B.value.find((j) => j.id === G)?.y || n.chartMargin - 10, I = M(() => {
      const G = [];
      for (let j = 0; j <= 5; j++) {
        const ot = Math.round(c.value / 5 * j), X = n.chartHeight - n.chartBottomMargin - j / 5 * l.value;
        G.push({ value: ot, y: X });
      }
      return G;
    }), N = (G, q) => {
      n.interactive && V(G, q);
    }, Y = () => {
      n.interactive && rt();
    }, V = (G, q) => {
      const j = G.currentTarget.closest("svg");
      if (!j) return;
      const ot = j.getBoundingClientRect(), X = j.createSVGPoint();
      X.x = G.clientX - ot.left, X.y = G.clientY - ot.top;
      const ct = `Score: ${q.score}`, gt = `Count: ${q.count}`, Z = 120, Ct = 48;
      o.value = {
        visible: !0,
        x: X.x,
        y: X.y - 20,
        title: ct,
        text: gt,
        width: Z,
        height: Ct
      };
    }, tt = (G) => {
      if (n.interactive && o.value.visible) {
        const q = G.currentTarget, j = q.getBoundingClientRect(), ot = q.createSVGPoint();
        ot.x = G.clientX - j.left, ot.y = G.clientY - j.top, o.value.x = ot.x, o.value.y = ot.y - 20;
      }
    }, et = () => {
      o.value.visible = !1;
    }, rt = () => {
      o.value.visible = !1;
    };
    return t({ isDark: a }), (G, q) => (_(), k("div", {
      class: H(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (_(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: mt(`min-height: ${e.chartHeight}px;`),
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
          }, null, 8, Cf),
          r("text", {
            x: "0",
            y: -o.value.height + 8,
            "text-anchor": "middle",
            fill: s.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(o.value.title), 9, $f),
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
        ], 8, wf)) : z("", !0),
        (_(!0), k(U, null, at(I.value, (j, ot) => (_(), k("line", {
          key: `grid-${ot}`,
          x1: e.chartMargin,
          y1: j.y,
          x2: e.chartWidth - e.chartMargin,
          y2: j.y,
          stroke: s.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Mf))), 128)),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: s.value.axis,
          "stroke-width": "2"
        }, null, 8, Df),
        r("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: s.value.axis
        }, null, 8, Af),
        (_(!0), k(U, null, at(I.value, (j, ot) => (_(), k(U, {
          key: `y-tick-${ot}`
        }, [
          r("line", {
            x1: e.chartMargin - 6,
            y1: j.y,
            x2: e.chartMargin,
            y2: j.y,
            stroke: s.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Tf),
          r("text", {
            x: e.chartMargin - 12,
            y: j.y + 4,
            "text-anchor": "end",
            fill: s.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(j.value), 9, Bf)
        ], 64))), 128)),
        r("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: s.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, " Count ", 8, Lf),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: s.value.axis,
          "stroke-width": "2"
        }, null, 8, Ff),
        r("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: s.value.axis
        }, null, 8, Ef),
        (_(!0), k(U, null, at(y.value, (j, ot) => (_(), k(U, {
          key: `tick-${ot}`
        }, [
          r("line", {
            x1: j.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: j.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: s.value.tickLine,
            "stroke-width": "1"
          }, null, 8, If),
          r("text", {
            x: j.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: s.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(j.score), 9, Pf)
        ], 64))), 128)),
        r("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: s.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, Rf),
        g.value ? (_(), k("path", {
          key: 1,
          d: g.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, Of)) : z("", !0),
        (_(!0), k(U, null, at(y.value, (j, ot) => (_(), k("rect", {
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
          onMouseenter: (X) => N(X, j),
          onMouseleave: Y,
          style: mt({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, zf))), 128)),
        m.value ? (_(), k("line", {
          key: 2,
          x1: m.value,
          y1: e.chartMargin,
          x2: m.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Vf)) : z("", !0),
        m.value ? (_(), k("text", {
          key: 3,
          x: m.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + A(D.value.toFixed(1)), 9, Nf)) : z("", !0),
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
        }, null, 8, Wf)) : z("", !0),
        p.value ? (_(), k("text", {
          key: 5,
          x: p.value,
          y: E("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + A(C.value.toFixed(1)), 9, Hf)) : z("", !0),
        b.value ? (_(), k("line", {
          key: 6,
          x1: b.value,
          y1: e.chartMargin,
          x2: b.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, jf)) : z("", !0),
        b.value ? (_(), k("text", {
          key: 7,
          x: b.value,
          y: E("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + A($.value.toFixed(1)), 9, Yf)) : z("", !0),
        w.value ? (_(), k("line", {
          key: 8,
          x1: w.value,
          y1: e.chartMargin,
          x2: w.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, qf)) : z("", !0),
        w.value ? (_(), k("text", {
          key: 9,
          x: w.value,
          y: E("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + A(T.value.toFixed(1)), 9, Kf)) : z("", !0),
        x.value ? (_(), k("line", {
          key: 10,
          x1: x.value,
          y1: e.chartMargin,
          x2: x.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Uf)) : z("", !0),
        x.value ? (_(), k("text", {
          key: 11,
          x: x.value,
          y: E("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + A(L.value.toFixed(1)), 9, Xf)) : z("", !0),
        v.value ? (_(), k("line", {
          key: 12,
          x1: v.value,
          y1: e.chartMargin,
          x2: v.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Gf)) : z("", !0),
        v.value ? (_(), k("text", {
          key: 13,
          x: v.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + A(S.value.toFixed(1)), 9, Zf)) : z("", !0),
        e.showLegend ? (_(), k("g", {
          key: 14,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          r("g", Jf, [
            q[0] || (q[0] = r("line", {
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
              fill: s.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Gaussian ", 8, tg)
          ]),
          r("g", eg, [
            q[1] || (q[1] = r("line", {
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
              fill: s.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, ng)
          ]),
          r("g", ag, [
            q[2] || (q[2] = r("line", {
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
              fill: s.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, sg)
          ]),
          r("g", og, [
            q[3] || (q[3] = r("line", {
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
              fill: s.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, ig)
          ]),
          r("g", lg, [
            q[4] || (q[4] = r("line", {
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
              fill: s.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, rg)
          ]),
          r("g", cg, [
            q[5] || (q[5] = r("line", {
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
              fill: s.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, dg)
          ]),
          r("g", ug, [
            q[6] || (q[6] = r("line", {
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
              fill: s.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, hg)
          ])
        ], 8, Qf)) : z("", !0)
      ], 44, kf))
    ], 2));
  }
}), Di = /* @__PURE__ */ it(fg, [["__scopeId", "data-v-5bd71051"]]), gg = 639, Ai = 1024;
function xo(e) {
  return e < 640 ? "mobile" : e <= Ai ? "tablet" : "desktop";
}
function pg() {
  const e = st(
    typeof window > "u" ? "desktop" : xo(window.innerWidth)
  ), t = () => {
    typeof window > "u" || (e.value = xo(window.innerWidth));
  };
  let n = null, a = null, s = null, o = null;
  te(() => {
    typeof window > "u" || (t(), n = window.matchMedia(`(max-width: ${gg}px)`), a = window.matchMedia(`(min-width: 640px) and (max-width: ${Ai}px)`), s = window.matchMedia("(min-width: 1025px)"), o = () => {
      t();
    }, n.addEventListener("change", o), a.addEventListener("change", o), s.addEventListener("change", o));
  }), $e(() => {
    !o || !n || !a || !s || (n.removeEventListener("change", o), a.removeEventListener("change", o), s.removeEventListener("change", o));
  });
  const i = M(() => e.value === "mobile"), l = M(() => e.value === "tablet"), d = M(() => e.value === "desktop");
  return {
    breakpoint: e,
    isMobile: i,
    isTablet: l,
    isDesktop: d
  };
}
const mg = { class: "chart-container" }, bg = {
  key: 1,
  class: "chart-wrapper"
}, vg = /* @__PURE__ */ Q({
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
    ns.use([Ki, Ui, Xi, Gi]);
    const n = e, { isDark: a, colors: s } = ht(ut(n, "theme")), { breakpoint: o } = pg(), i = st(null), l = st(!0), d = st(!1);
    let c = null;
    const u = {
      animation: { duration: 1e3, easing: "cubicOut" },
      margins: { left: "2%", right: "2%", top: "2%", bottom: "2%" },
      node: { width: 70, gap: 20, align: "left", iterations: 64 },
      style: {
        shadowBlur: 4,
        shadowColor: "rgba(139, 92, 246, 0.15)"
      }
    }, h = M(() => {
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
    }), g = (S, C) => {
      const $ = S.trim();
      if (!$ || C < 1) return S;
      if ($.length <= C) return $;
      const L = [];
      let T = 0;
      for (; T < $.length; ) {
        const B = Math.min(T + C, $.length);
        if (B >= $.length) {
          const N = $.slice(T).trim();
          N && L.push(N);
          break;
        }
        const E = $.slice(T, B), I = E.lastIndexOf(" ");
        if (I > 0)
          for (L.push($.slice(T, T + I).trim()), T += I; T < $.length && $[T] === " "; ) T += 1;
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
    ], f = () => {
      const S = n.data.links.filter(
        (T) => T.source && T.target && typeof T.value == "number"
      ), C = Math.max(...S.map((T) => T.value), 1), $ = Math.max(1, C * 0.01), L = S.map((T) => ({
        ...T,
        originalValue: T.value,
        value: T.value < C * 0.01 ? $ : T.value
      }));
      return {
        nodes: n.data.nodes.filter((T) => T.name),
        links: L
      };
    }, m = (S) => S.map((C, $) => ({
      ...C,
      itemStyle: {
        color: n.nodeColors[C.name] || y[$ % y.length],
        borderRadius: 8
      }
    })), v = (S) => (C) => {
      const $ = C.dataType === "node", L = s.value.tooltipText, T = a.value ? "#d1d5db" : "#e2e8f0";
      if ($) {
        const Y = S.filter((et) => et.target === C.name), V = S.filter((et) => et.source === C.name), tt = Y.length > 0 ? Y.reduce((et, rt) => et + (rt.originalValue || rt.value), 0) : V.reduce((et, rt) => et + (rt.originalValue || rt.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${L};">${C.name}</div><div style="color: ${T}; font-size: 12px;">Count: ${tt.toLocaleString()}</div>`;
      }
      const B = C.data?.source || C.source || "Unknown", E = C.data?.target || C.target || "Unknown", I = C.data?.originalValue || C.data?.value || C.value || 0, N = C.data?.label || `${I.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${L};">${B} → ${E}</div><div style="color: ${T}; font-size: 12px;">Flow: ${N}</div>`;
    }, p = () => {
      if (!c || !n.data.nodes?.length || !n.data.links?.length) return;
      const S = h.value, C = a.value ? "rgb(34, 34, 45)" : "rgb(240, 240, 242)", $ = a.value ? "rgb(34, 34, 45)" : "rgb(240, 240, 242)";
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
              color: s.value.tooltipText,
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
                  color: $,
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
                  lineStyle: { color: C, opacity: 1 }
                },
                {
                  depth: 1,
                  itemStyle: {
                    color: "#8b5cf6",
                    borderRadius: 8
                  },
                  lineStyle: { color: C, opacity: 1 }
                }
              ],
              lineStyle: {
                color: C,
                curveness: 0.5,
                opacity: 1
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
                formatter: (I) => {
                  const N = I.name || "";
                  if (S.labelWrap)
                    return g(N, Math.max(4, S.labelCharsPerLine));
                  const Y = S.labelMaxChars;
                  return N.length > Y ? `${N.substring(0, Y)}...` : N;
                }
              },
              edgeLabel: S.edgeLabelShow ? {
                show: !0,
                fontSize: S.edgeLabelFontSize,
                color: s.value.textSecondary,
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                formatter: (I) => {
                  const N = I.data?.originalValue || I.value || 0;
                  return I.data?.label || `${N.toLocaleString()}`;
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
        c.setOption(E), c.resize();
      } catch (L) {
        console.error("Error setting Sankey chart options:", L), d.value = !0;
      }
    }, b = async () => {
      if (i.value)
        try {
          c = ns.init(i.value), p(), window.addEventListener("resize", w);
        } catch (S) {
          console.error("Error initializing Sankey chart:", S), d.value = !0;
        } finally {
          l.value = !1;
        }
    }, x = async (S = 40) => {
      await Lt();
      for (let C = 0; C < S; C++) {
        if (i.value?.clientWidth && i.value.clientWidth > 0 && i.value?.clientHeight && i.value.clientHeight > 0)
          return await b();
        await new Promise(($) => setTimeout($, 50));
      }
      await b(), setTimeout(w, 50);
    }, w = () => c?.resize(), D = () => {
      window.removeEventListener("resize", w), c && (c.dispose(), c = null);
    };
    return te(() => i.value && x()), Fo(D), Pt(() => n.data, p, { deep: !0 }), Pt(a, p), Pt(o, p), t({ isDark: a }), (S, C) => (_(), k("div", mg, [
      d.value ? (_(), k("div", {
        key: 0,
        class: "error-state",
        style: mt({ height: e.height })
      }, [...C[0] || (C[0] = [
        es('<div class="error-content" data-v-ccb2fb1d><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ccb2fb1d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-ccb2fb1d></path></svg><p class="error-title" data-v-ccb2fb1d>Chart could not be loaded</p><p class="error-description" data-v-ccb2fb1d>Please check the data format.</p></div>', 1)
      ])], 4)) : (_(), k("div", bg, [
        Xt(r("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content",
          style: mt({ height: e.height })
        }, null, 4), [
          [mn, !l.value]
        ]),
        Xt(r("div", {
          class: "loading-state",
          style: mt({ height: e.height })
        }, [...C[1] || (C[1] = [
          es('<div class="loading-container" data-v-ccb2fb1d><div class="sankey-loader" data-v-ccb2fb1d><div class="flow flow-1" data-v-ccb2fb1d></div><div class="flow flow-2" data-v-ccb2fb1d></div><div class="flow flow-3" data-v-ccb2fb1d></div><div class="flow flow-4" data-v-ccb2fb1d></div></div><p class="loading-text" data-v-ccb2fb1d>Loading Sankey diagram...</p></div>', 1)
        ])], 4), [
          [mn, l.value]
        ])
      ]))
    ]));
  }
}), Me = /* @__PURE__ */ it(vg, [["__scopeId", "data-v-ccb2fb1d"]]), yg = ["open"], _g = { class: "card-header metric-collapsible__summary" }, xg = { class: "header-content metric-header-content" }, kg = { class: "metric-header-content__main" }, wg = { class: "metric-header-content__text" }, Cg = { class: "card-title" }, $g = {
  key: 0,
  class: "card-subtitle"
}, Sg = {
  key: 0,
  class: "metric-header-content__export"
}, Mg = {
  key: 0,
  class: "cmc-header-aside"
}, Dg = { class: "chart-metric-container__body" }, Ag = {
  key: 1,
  class: "chart-metric-container chart-metric-container--static"
}, Tg = { class: "card-header" }, Bg = { class: "header-content metric-header-content" }, Lg = { class: "metric-header-content__main" }, Fg = { class: "metric-header-content__text" }, Eg = { class: "card-title" }, Ig = {
  key: 0,
  class: "card-subtitle"
}, Pg = {
  key: 0,
  class: "metric-header-content__export"
}, Rg = {
  key: 0,
  class: "cmc-header-aside"
}, Og = { class: "chart-metric-container__body" }, zg = /* @__PURE__ */ Q({
  __name: "ChartMetricContainer",
  props: {
    title: {},
    subtitle: {},
    collapsible: { type: Boolean, default: !0 },
    defaultOpen: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, n = st(t.defaultOpen), a = Qn(), s = M(() => a.headerExport ? !t.collapsible || n.value : !1);
    Pt(
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
      onToggle: o
    }, [
      r("summary", _g, [
        r("div", xg, [
          r("div", kg, [
            r("div", wg, [
              kt(i.$slots, "title", {}, () => [
                r("h3", Cg, A(e.title), 1)
              ], !0),
              e.subtitle ? (_(), k("p", $g, A(e.subtitle), 1)) : z("", !0),
              kt(i.$slots, "headerAppend", {}, void 0, !0)
            ]),
            s.value ? (_(), k("div", Sg, [
              kt(i.$slots, "headerExport", {}, void 0, !0)
            ])) : z("", !0)
          ]),
          i.$slots.headerAside ? (_(), k("div", Mg, [
            kt(i.$slots, "headerAside", {}, void 0, !0)
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
      r("div", Dg, [
        kt(i.$slots, "default", {}, void 0, !0)
      ])
    ], 40, yg)) : (_(), k("div", Ag, [
      r("div", Tg, [
        r("div", Bg, [
          r("div", Lg, [
            r("div", Fg, [
              kt(i.$slots, "title", {}, () => [
                r("h3", Eg, A(e.title), 1)
              ], !0),
              e.subtitle ? (_(), k("p", Ig, A(e.subtitle), 1)) : z("", !0),
              kt(i.$slots, "headerAppend", {}, void 0, !0)
            ]),
            s.value ? (_(), k("div", Pg, [
              kt(i.$slots, "headerExport", {}, void 0, !0)
            ])) : z("", !0)
          ]),
          i.$slots.headerAside ? (_(), k("div", Rg, [
            kt(i.$slots, "headerAside", {}, void 0, !0)
          ])) : z("", !0)
        ])
      ]),
      r("div", Og, [
        kt(i.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), ft = /* @__PURE__ */ it(zg, [["__scopeId", "data-v-6de54ee8"]]);
function Vg(e, t) {
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
function Ti(e, t) {
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
      d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
    })
  ]);
}
function Wt(e, t) {
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
      d: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
    })
  ]);
}
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
      d: "M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
    }),
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
    })
  ]);
}
function Bi(e, t) {
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
      d: "m19.5 8.25-7.5 7.5-7.5-7.5"
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
      d: "M15.75 19.5 8.25 12l7.5-7.5"
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
      d: "m8.25 4.5 7.5 7.5-7.5 7.5"
    })
  ]);
}
function jg(e, t) {
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
      d: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    })
  ]);
}
function Yg(e, t) {
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
function Li(e, t) {
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
      d: "M6 18 18 6M6 6l12 12"
    })
  ]);
}
const qg = {
  key: 0,
  class: "footer-divider"
}, Kg = {
  key: 0,
  class: "export-label"
}, Ug = { class: "export-buttons" }, Xg = ["disabled"], Gg = {
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
}, Qg = ["disabled"], Jg = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, tp = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, ep = /* @__PURE__ */ Q({
  __name: "FooterExport",
  props: {
    formats: { default: () => ["pdf", "csv"] },
    loading: { type: Boolean, default: !1 },
    variant: { default: "footer" }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = M(() => n.variant === "footer" ? "footer" : "div"), o = M(
      () => n.variant === "footer" ? "chart-footer" : "chart-export-inline"
    ), i = (d) => n.formats.includes(d), l = (d) => {
      n.loading || a("export", d);
    };
    return (d, c) => (_(), nt(je(s.value), {
      class: H(o.value)
    }, {
      default: P(() => [
        e.variant === "footer" ? (_(), k("div", qg)) : z("", !0),
        r("div", {
          class: H(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (_(), k("span", Kg, "Export")) : z("", !0),
          r("div", Ug, [
            i("pdf") ? (_(), k("button", {
              key: 0,
              type: "button",
              class: H(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: c[0] || (c[0] = (u) => l("pdf"))
            }, [
              e.loading ? (_(), k("svg", Gg, [...c[2] || (c[2] = [
                r("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                r("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (_(), k("svg", Zg, [...c[3] || (c[3] = [
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
            ], 10, Xg)) : z("", !0),
            i("csv") ? (_(), k("button", {
              key: 1,
              type: "button",
              class: H(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: c[1] || (c[1] = (u) => l("csv"))
            }, [
              e.loading ? (_(), k("svg", Jg, [...c[5] || (c[5] = [
                r("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                r("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (_(), k("svg", tp, [...c[6] || (c[6] = [
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
            ], 10, Qg)) : z("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Dt = /* @__PURE__ */ it(ep, [["__scopeId", "data-v-32629e66"]]), np = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, ap = {
  key: 0,
  class: "flex min-h-[320px] flex-col items-center justify-center px-4"
}, sp = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, op = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, ip = { class: "w-full shrink-0 sm:pr-2" }, lp = {
  key: 2,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, rp = { class: "max-w-[360px] text-center" }, cp = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, dp = /* @__PURE__ */ Q({
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
    }, l = [30, 50, 70, 50, 40], d = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], c = ut(s, "theme"), u = ut(s, "options"), { isDark: h } = ht(c), g = (f) => {
      const m = new Date(f), v = String(m.getDate()).padStart(2, "0"), p = String(m.getMonth() + 1).padStart(2, "0");
      return `${v}-${p}`;
    }, y = M(() => {
      const f = s.data?.agents_by_day || {}, m = Object.keys(f).sort();
      if (m.length === 0)
        return { labels: [], datasets: [] };
      const v = m.map((D) => g(D)), p = /* @__PURE__ */ new Set();
      for (const D of Object.values(f))
        for (const S of Object.keys(D))
          p.add(S);
      const b = Array.from(p), x = (D) => D, w = b.map((D) => ({
        label: D,
        data: m.map((S) => f[S]?.[D] || 0),
        backgroundColor: `${a[D] || "#94a3b8"}80`,
        borderColor: x(a[D] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: v,
        datasets: w
      };
    });
    return t({ isDark: h }), (f, m) => (_(), nt(ft, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1
    }, Mt({
      default: P(() => [
        r("div", np, [
          e.loading ? (_(), k("div", ap, [
            r("div", sp, [
              (_(), k(U, null, at(l, (v, p) => r("div", {
                key: p,
                class: H(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", d[p]]),
                style: mt({ height: `${v}%` })
              }, null, 6)), 64))
            ]),
            m[0] || (m[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading chart data... ", -1))
          ])) : y.value.labels && y.value.labels.length ? (_(), k("section", op, [
            r("div", ip, [
              R(he, {
                data: y.value,
                stacked: !0,
                theme: c.value,
                options: u.value
              }, null, 8, ["data", "theme", "options"])
            ])
          ])) : (_(), k("section", lp, [
            r("div", rp, [
              r("div", cp, [
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
      e.enableExport && !e.loading && y.value.labels && y.value.labels.length ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Dt), {
            variant: "inline",
            loading: e.exportLoading,
            onExport: i
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), up = { class: "flex w-full min-w-0 flex-col items-center gap-2 rounded-2xl border border-[color:var(--kiut-border-light,rgba(0,0,0,0.05))] bg-[color:var(--kiut-bg-stats-badge,#fafafa)] p-4 text-center font-sans text-[color:var(--kiut-text-secondary,#64748b)]" }, hp = { class: "flex min-w-0 w-full max-w-full items-center justify-center gap-2" }, fp = { class: "min-w-0 max-w-full truncate text-[12px] leading-normal" }, gp = { class: "text-[16px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, pp = {
  key: 0,
  class: "text-[12px] leading-normal"
}, lt = /* @__PURE__ */ Q({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, n) => (_(), k("div", up, [
      r("div", hp, [
        e.color ? (_(), k("span", {
          key: 0,
          class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
          style: mt({ backgroundColor: e.color }),
          "aria-hidden": "true"
        }, null, 4)) : z("", !0),
        r("span", fp, A(e.title), 1)
      ]),
      r("p", gp, A(e.value), 1),
      e.subvalue ? (_(), k("p", pp, A(e.subvalue), 1)) : z("", !0)
    ]));
  }
}), mp = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, Rt = /* @__PURE__ */ Q({
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
    const t = e, n = M(
      () => t.statusLive === !0 || t.statusLive === !1
    ), a = M(
      () => t.statusLive === !0 ? t.labelConnected : t.labelDisconnected
    ), s = M(() => t.statusLive === !0 ? [
      "border border-emerald-200 bg-emerald-50",
      "dark:border-emerald-800/80 dark:bg-emerald-950/40"
    ] : [
      "border border-transparent bg-slate-100 dark:border-slate-700/80 dark:bg-slate-800/90"
    ]), o = M(() => t.statusLive === !0 ? "text-emerald-700 dark:text-emerald-300" : "text-[color:var(--kiut-text-primary)] dark:text-slate-300"), i = M(() => {
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
        default:
          return l ? "border border-slate-400 bg-transparent text-[color:var(--kiut-text-primary)] dark:border-slate-500 dark:text-slate-200" : "border border-slate-200 bg-slate-100 text-[color:var(--kiut-text-primary)] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200";
      }
    });
    return (l, d) => n.value ? (_(), k("span", {
      key: 0,
      role: "status",
      class: H(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", s.value])
    }, [
      e.statusLive === !0 ? (_(), k("span", mp, [...d[0] || (d[0] = [
        r("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        r("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : z("", !0),
      r("span", {
        class: H(["min-w-0 flex-1 text-center", o.value])
      }, A(a.value), 3)
    ], 2)) : (_(), k("span", {
      key: 1,
      class: H(["inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight", i.value])
    }, [
      kt(l.$slots, "default", {}, () => [
        bt(A(e.label), 1)
      ])
    ], 2));
  }
}), K = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), yt = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), ve = (e) => {
  if (e == null) return "0";
  const t = Math.abs(e), n = e < 0 ? "-" : "";
  return t >= 1e6 ? `${n}${(t / 1e6).toFixed(2)}M` : t > 99999 ? `${n}${(t / 1e3).toFixed(1)}K` : `${n}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(t)}`;
}, bp = {
  class: "kiut-table-root table-section flex w-full min-w-0 flex-col rounded-xl font-sans antialiased text-[color:var(--kiut-text-primary,#1e293b)]",
  "data-component": "kiut-table"
}, vp = { class: "overflow-x-auto" }, yp = { class: "w-full table-auto border-collapse text-left text-[14px] leading-normal" }, _p = /* @__PURE__ */ Q({
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
    const t = e, n = st(!1), a = "—";
    function s(m) {
      return m == null || m === "" ? a : String(m);
    }
    function o(m) {
      return m === "center" ? "text-center" : m === "right" ? "text-right" : "text-left";
    }
    function i(m) {
      return `cell-${m}`;
    }
    function l(m, v) {
      return m[v];
    }
    function d(m, v) {
      if (typeof t.rowKey == "function")
        return t.rowKey(m);
      const p = m[t.rowKey];
      return typeof p == "string" || typeof p == "number" ? p : v;
    }
    function c(m, v) {
      return d(m, v);
    }
    const u = M(() => t.rows?.length ?? 0), h = M(() => u.value > t.maxVisibleRows), g = M(() => Math.max(0, u.value - t.maxVisibleRows)), y = M(() => t.rows?.length ? n.value || !h.value ? t.rows : t.rows.slice(0, t.maxVisibleRows) : []), f = M(
      () => t.viewMoreLabel.replace(/\{count\}/g, String(g.value))
    );
    return (m, v) => (_(), k("div", bp, [
      r("div", vp, [
        r("table", yp, [
          r("thead", null, [
            r("tr", null, [
              (_(!0), k(U, null, at(e.columns, (p) => (_(), k("th", {
                key: p.key,
                scope: "col",
                class: H(["kiut-table-th whitespace-nowrap px-3 py-2 text-left text-[#9191a1]", [o(p.align), p.headerClass]])
              }, A(p.label), 3))), 128))
            ])
          ]),
          r("tbody", null, [
            (_(!0), k(U, null, at(y.value, (p, b) => (_(), k("tr", {
              key: c(p, b)
            }, [
              (_(!0), k(U, null, at(e.columns, (x) => (_(), k("td", {
                key: `${b}-${x.key}`,
                class: H(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [o(x.align), x.cellClass]])
              }, [
                kt(m.$slots, i(x.key), {
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
      h.value ? (_(), k("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: v[0] || (v[0] = (p) => n.value = !n.value)
      }, [
        bt(A(n.value ? e.viewLessLabel : f.value) + " ", 1),
        (_(), k("svg", {
          class: H(["view-more-icon", { "view-more-icon-rotated": n.value }]),
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
}), qt = /* @__PURE__ */ it(_p, [["__scopeId", "data-v-58cfdc5e"]]), xp = {
  key: 0,
  class: "loading-state"
}, kp = {
  key: 1,
  class: "error-state"
}, wp = { class: "error-content" }, Cp = { class: "error-description" }, $p = {
  key: 2,
  class: "card-body"
}, Sp = { class: "chart-section" }, Mp = { class: "chart-wrapper" }, Dp = { class: "payment-success-summary" }, Ap = {
  key: 0,
  class: "booking-daily-section"
}, Tp = { class: "w-full min-w-0" }, Bp = { class: "font-medium" }, Lp = { class: "percentage-text" }, Fp = { class: "badges-container" }, Ep = {
  key: 0,
  class: "badges-container"
}, Ip = {
  key: 1,
  class: "percentage-text"
}, Pp = { class: "badges-container" }, Rp = {
  key: 1,
  class: "empty-state"
}, Op = /* @__PURE__ */ Q({
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
    function n(b) {
      return b;
    }
    const a = e, s = t, o = (b) => {
      s("export", b);
    }, i = M(() => a.data?.booking_manager_by_day ? [...a.data.booking_manager_by_day].sort(
      (b, x) => new Date(b.date).getTime() - new Date(x.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "paymentInitiated", label: "Payment Initiated", align: "center" },
      { key: "paymentResults", label: "Payment Results", align: "left" },
      { key: "paymentValue", label: "Payment Value", align: "left" },
      { key: "outcomes", label: "Outcomes", align: "left" }
    ], d = M(
      () => i.value.map((b) => ({
        id: b.date,
        ...b
      }))
    ), c = M(() => a.data?.total_payment_success_value || []), u = M(() => {
      const b = c.value;
      return b.length === 0 ? f(0) : b.map((x) => `${x.currency} ${f(x.total_value)}`).join(" · ");
    }), h = (b) => b.payment_success_value || [], g = (b) => typeof b.payment_success_count == "number" ? b.payment_success_count : (b.payment_success_value || []).reduce((x, w) => x + (w.count || 0), 0), y = (b) => yt(b), f = (b) => b == null ? "0" : ve(b);
    M(() => (a.data?.total_payment_success_value || []).reduce((b, x) => b + (x.total_value || 0), 0));
    const m = M(() => {
      const b = a.data, x = b.total_booking_initiated || 0, w = b.total_booking_started || 0, D = b.total_payment_initiated || 0, S = b.total_not_found || 0, C = b.total_cancelled || 0, $ = b.total_no_pending_balance || 0, L = b.total_errors || 0, T = typeof b.total_payment_success == "number" ? b.total_payment_success : (b.total_payment_success_value || []).reduce((tt, et) => tt + (et.count || 0), 0), B = b.total_payment_failed || 0, E = Math.max(0, x - w), I = Math.max(0, w - D - S - C - $ - L), N = (tt, et) => {
        const rt = et > 0 ? Math.round(tt / et * 100) : 0;
        return `${K(tt)} (${rt}%)`;
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
      ], V = [];
      return w > 0 && V.push({
        source: "Initiated",
        target: "Started",
        value: w,
        label: N(w, x)
      }), E > 0 && V.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: E,
        label: N(E, x)
      }), D > 0 && V.push({
        source: "Started",
        target: "Payment Initiated",
        value: D,
        label: N(D, w)
      }), S > 0 && V.push({
        source: "Started",
        target: "Not Found",
        value: S,
        label: N(S, w)
      }), C > 0 && V.push({
        source: "Started",
        target: "Cancelled",
        value: C,
        label: N(C, w)
      }), $ > 0 && V.push({
        source: "Started",
        target: "No Pending Balance",
        value: $,
        label: N($, w)
      }), L > 0 && V.push({
        source: "Started",
        target: "Errors",
        value: L,
        label: N(L, w)
      }), I > 0 && V.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: I,
        label: N(I, w)
      }), T > 0 && V.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: T,
        label: N(T, D)
      }), B > 0 && V.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: B,
        label: N(B, D)
      }), { nodes: Y, links: V };
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
    }, Mt({
      default: P(() => [
        a.loading ? (_(), k("div", xp, [...x[0] || (x[0] = [
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
        ])])) : a.error ? (_(), k("div", kp, [
          r("div", wp, [
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
            r("p", Cp, A(a.error), 1)
          ])
        ])) : (_(), k("div", $p, [
          r("section", Sp, [
            r("div", Mp, [
              R(Me, {
                data: m.value,
                "node-colors": v,
                height: "500px",
                "node-gap": 15
              }, null, 8, ["data"])
            ])
          ]),
          r("section", Dp, [
            R(lt, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: u.value
            }, null, 8, ["value"])
          ]),
          i.value.length > 0 ? (_(), k("section", Ap, [
            x[3] || (x[3] = r("div", { class: "section-header" }, [
              r("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            r("div", Tp, [
              R(qt, {
                columns: l,
                rows: d.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": P(({ row: w }) => [
                  r("span", Bp, A(F(It)(String(w.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": P(({ row: w }) => [
                  r("span", null, A(F(K)(Number(w.booking_initiated_count))), 1)
                ]),
                "cell-started": P(({ row: w }) => [
                  r("span", null, [
                    bt(A(F(K)(Number(w.booking_started_count))) + " ", 1),
                    r("span", Lp, " (" + A(p(Number(w.booking_started_count), Number(w.booking_initiated_count))) + ") ", 1)
                  ])
                ]),
                "cell-paymentInitiated": P(({ row: w }) => [
                  r("span", null, A(F(K)(Number(w.payment_initiated_count))), 1)
                ]),
                "cell-paymentResults": P(({ row: w }) => [
                  r("div", Fp, [
                    R(Rt, { color: "success" }, {
                      default: P(() => [
                        bt(" Success: " + A(F(K)(g(w))), 1)
                      ]),
                      _: 2
                    }, 1024),
                    R(Rt, { color: "danger" }, {
                      default: P(() => [
                        bt(" Failed: " + A(F(K)(Number(w.payment_failed_count) || 0)), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ])
                ]),
                "cell-paymentValue": P(({ row: w }) => [
                  h(w).length > 0 ? (_(), k("div", Ep, [
                    (_(!0), k(U, null, at(h(w), (D) => (_(), k("span", {
                      key: `${w.date}-${D.currency}`,
                      class: "badge badge-currency"
                    }, A(D.currency) + " " + A(y(D.total_value)), 1))), 128))
                  ])) : (_(), k("span", Ip, "N/A"))
                ]),
                "cell-outcomes": P(({ row: w }) => [
                  r("div", Pp, [
                    R(Rt, { color: "danger" }, {
                      default: P(() => [
                        bt(" Not Found: " + A(w.not_found_count ? F(K)(Number(w.not_found_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024),
                    R(Rt, { color: "warning" }, {
                      default: P(() => [
                        bt(" Cancelled: " + A(w.cancelled_count ? F(K)(Number(w.cancelled_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024),
                    R(Rt, { color: "orange" }, {
                      default: P(() => [
                        bt(" No Balance: " + A(w.no_pending_balance_count ? F(K)(Number(w.no_pending_balance_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024),
                    R(Rt, { color: "danger" }, {
                      default: P(() => [
                        bt(" Errors: " + A(w.error_count ? F(K)(Number(w.error_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (_(), k("section", Rp, [...x[4] || (x[4] = [
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
      e.enableExport && !a.loading && !a.error && i.value.length > 0 ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Dt), {
            variant: "inline",
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), zp = /* @__PURE__ */ it(Op, [["__scopeId", "data-v-b908c60c"]]), Vp = {
  key: 0,
  class: "loading-state"
}, Np = {
  key: 1,
  class: "card-body"
}, Wp = {
  key: 0,
  class: "chart-section"
}, Hp = { class: "chart-wrapper" }, jp = {
  key: 1,
  class: "checkin-daily-section"
}, Yp = { class: "w-full min-w-0" }, qp = { class: "font-medium" }, Kp = {
  key: 0,
  class: "failed-steps"
}, Up = { class: "step-name" }, Xp = { class: "step-count" }, Gp = {
  key: 1,
  class: "empty-cell"
}, Zp = {
  key: 2,
  class: "empty-state"
}, Qp = {
  __name: "Checkin",
  props: {
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
    const n = t, a = (b) => {
      n("export", b);
    }, s = e, o = {
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
    ], c = M(
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
    ), u = M(() => {
      const b = s.data;
      return b && (Array.isArray(b.checkin_by_day) && b.checkin_by_day.length > 0 || (b.total_checkin_initiated ?? 0) > 0) ? { ...o, ...b } : s.checkinData ?? o;
    }), h = M(() => {
      const b = s.data;
      return b && (Array.isArray(b.failed_by_step_by_day) && b.failed_by_step_by_day.length > 0 || Array.isArray(b.unrecovered_by_step) && b.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: b.total_checkin_failed ?? 0,
        total_checkin_unrecovered: b.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: b.failed_by_step_by_day ?? [],
        unrecovered_by_step: b.unrecovered_by_step ?? [],
        unrecovered_by_day: b.unrecovered_by_day ?? []
      } : s.failedData ?? i;
    }), g = M(() => {
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
      return (h.value.unrecovered_by_step || []).forEach((w) => {
        const S = w.step_name.replace(/_/g, " ").split(" ").map(($) => $.charAt(0).toUpperCase() + $.slice(1)).join(" "), C = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        b[S] = C[S] || "#DC2626";
      }), b;
    }), y = (b, x) => !x || x === 0 ? "0%" : `${Math.round(b / x * 100)}%`, f = (b, x) => {
      const w = K(b), D = y(b, x);
      return `${w} (${D})`;
    }, m = (b) => b.reduce((x, w) => x + w.failed_count, 0), v = M(() => {
      const b = [], x = [];
      if (!u.value.total_checkin_initiated)
        return { nodes: b, links: x };
      b.push({ name: "Checkin Init" }), b.push({ name: "Booking retrive" }), b.push({ name: "Booking retrive success" }), b.push({ name: "Number of Passengers" }), b.push({ name: "Completed" }), b.push({ name: "Closed with BP" });
      const w = u.value.total_checkin_initiated, D = u.value.total_checkin_init, S = u.value.total_checkin_init_abandoned, C = D - S, $ = u.value.total_checkin_started, L = u.value.total_checkin_completed, T = u.value.total_checkin_closed, B = h.value.unrecovered_by_step || [], E = B.reduce((V, tt) => V + tt.count, 0);
      if (D > 0) {
        const V = Math.round(D / w * 100);
        x.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: D,
          label: `${D.toLocaleString()} (${V}%)`
        });
      }
      const I = w - D;
      if (I > 0) {
        const V = Math.round(I / w * 100);
        b.push({ name: "Abandoned (Init)" }), x.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: I,
          label: `${I.toLocaleString()} (${V}%)`
        });
      }
      if (S > 0) {
        const V = Math.round(S / w * 100);
        b.push({ name: "Abandoned (Started)" }), x.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: S,
          label: `${S.toLocaleString()} (${V}%)`
        });
      }
      if (C > 0) {
        const V = Math.round(C / w * 100);
        x.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: C,
          label: `${C.toLocaleString()} (${V}%)`
        });
      }
      if ($ > 0) {
        const V = Math.round($ / w * 100);
        x.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: $,
          label: `${$.toLocaleString()} (${V}%)`
        });
      }
      if (L > 0) {
        const V = Math.round(L / $ * 100);
        x.push({
          source: "Number of Passengers",
          target: "Completed",
          value: L,
          label: `${L.toLocaleString()} (${V}%)`
        });
      }
      if (B.length > 0 && E > 0) {
        b.push({ name: "Unrecovered" });
        const V = Math.round(E / $ * 100);
        x.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: E,
          label: `${E.toLocaleString()} (${V}%)`
        }), B.forEach((tt) => {
          const rt = tt.step_name.replace(/_/g, " ").split(" ").map((q) => q.charAt(0).toUpperCase() + q.slice(1)).join(" "), G = Math.round(tt.count / $ * 100);
          b.push({ name: rt }), x.push({
            source: "Unrecovered",
            target: rt,
            value: tt.count,
            label: `${tt.count.toLocaleString()} (${G}%)`
          });
        });
      }
      const N = $ - (L + E);
      if (N > 0) {
        const V = Math.round(N / $ * 100);
        b.push({ name: "Abandoned (Flow)" }), x.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: N,
          label: `${N.toLocaleString()} (${V}%)`
        });
      }
      const Y = L - T;
      if (Y > 0) {
        const V = Math.round(Y / $ * 100);
        b.push({ name: "BP Error" }), x.push({
          source: "Completed",
          target: "BP Error",
          value: Y,
          label: `${Y.toLocaleString()} (${V}%)`
        });
      }
      if (T > 0) {
        const V = Math.round(T / $ * 100);
        x.push({
          source: "Completed",
          target: "Closed with BP",
          value: T,
          label: `${T.toLocaleString()} (${V}%)`
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
        const D = x.find(
          (S) => S.date === w.date
        );
        return {
          ...w,
          failed_steps: D?.steps || []
        };
      }), l.value.sort((w, D) => new Date(w.date) - new Date(D.date));
    };
    return Pt(
      [() => s.data, () => s.checkinData, () => s.failedData],
      () => {
        p();
      },
      { deep: !0, immediate: !0 }
    ), (b, x) => (_(), nt(ft, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      "default-open": e.initiallyOpen
    }, Mt({
      default: P(() => [
        s.loading ? (_(), k("div", Vp, [...x[0] || (x[0] = [
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
        ])])) : (_(), k("div", Np, [
          v.value.nodes.length > 0 ? (_(), k("section", Wp, [
            r("div", Hp, [
              R(Me, {
                data: v.value,
                height: "500px",
                "node-colors": g.value,
                "use-gradient": !1,
                "node-gap": 30
              }, null, 8, ["data", "node-colors"])
            ])
          ])) : z("", !0),
          l.value && l.value.length > 0 ? (_(), k("section", jp, [
            r("div", Yp, [
              R(qt, {
                columns: d,
                rows: c.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": P(({ row: w }) => [
                  r("span", qp, A(F(It)(String(w.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": P(({ row: w }) => [
                  r("span", null, A(F(K)(w.checkin_initiated_count)), 1)
                ]),
                "cell-bookingRetrieve": P(({ row: w }) => [
                  r("span", null, A(f(w.checkin_init_count, w.checkin_initiated_count)), 1)
                ]),
                "cell-passengers": P(({ row: w }) => [
                  r("span", null, A(F(K)(w.checkin_started_count)), 1)
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
                  w.failed_steps && w.failed_steps.length > 0 ? (_(), k("div", Kp, [
                    (_(!0), k(U, null, at(w.failed_steps, (D) => (_(), k("div", {
                      key: D.step_name,
                      class: "failed-step-item"
                    }, [
                      r("span", Up, A(D.step_name.replace(/_/g, " ")) + ":", 1),
                      r("span", Xp, A(D.failed_count), 1)
                    ]))), 128))
                  ])) : (_(), k("div", Gp, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (_(), k("section", Zp, [...x[1] || (x[1] = [
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
      e.enableExport && !s.loading && l.value && l.value.length > 0 ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Dt), {
            variant: "inline",
            onExport: a,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["default-open"]));
  }
}, Jp = /* @__PURE__ */ it(Qp, [["__scopeId", "data-v-6b54c2f6"]]), tm = {
  key: 0,
  class: "loading-state"
}, em = {
  key: 1,
  class: "card-body"
}, nm = {
  key: 0,
  class: "sankey-section"
}, am = {
  key: 1,
  class: "checkin-metrics-daily-section"
}, sm = { class: "w-full min-w-0" }, om = { class: "font-medium whitespace-nowrap" }, im = { class: "cell-success" }, lm = { class: "cell-danger" }, rm = {
  key: 0,
  class: "reasons-list"
}, cm = { class: "reason-name" }, dm = { class: "reason-count" }, um = {
  key: 1,
  class: "no-reasons"
}, hm = {
  key: 2,
  class: "empty-state"
}, fm = { class: "empty-state-content" }, gm = { class: "empty-icon-wrapper" }, pm = /* @__PURE__ */ Q({
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
    }, { isDark: i } = ht(ut(a, "theme")), l = (p) => p == null ? "0" : p.toLocaleString(), d = (p) => {
      const [b, x, w] = p.split("-").map(Number);
      return It([b, x - 1, w]).format("MMM DD");
    }, c = (p) => p.replace(/_/g, " ").replace(/\b\w/g, (b) => b.toUpperCase()), u = (p, b) => !b || b === 0 ? "0%" : `${Math.round(p / b * 100)}%`, h = (p, b) => {
      const x = p || 0, w = b || 0, D = l(x), S = u(x, w);
      return `${D} (${S})`;
    }, g = M(() => ({
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
    })), y = M(() => {
      const p = a.checkinData?.record_locator_by_day || [], b = a.failedData?.failed_by_step_by_day || [], x = a.failedData?.unrecovered_by_day || [];
      return p.map((D) => {
        const S = b.find(($) => $.date === D.date), C = x.find(($) => $.date === D.date);
        return {
          ...D,
          failed_steps: S?.steps || [],
          unrecovered_count: C?.unrecovered_count || 0
        };
      }).sort((D, S) => new Date(D.date).getTime() - new Date(S.date).getTime());
    }), f = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieval", label: "Booking Retrieval (%)", align: "center" },
      { key: "bookingRetrieved", label: "Booking Retrieved", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Errors (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], m = M(
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
    ), v = M(() => {
      const p = [], b = [], x = /* @__PURE__ */ new Set(), w = (Z) => {
        x.has(Z) || (p.push({ name: Z }), x.add(Z));
      };
      if (!a.checkinData?.total_checkin_initiated)
        return { nodes: p, links: b };
      w("Checkin Init"), w("Booking Retrieval"), w("Booking Retrieved"), w("Completed"), w("Closed with BP");
      const D = a.checkinData.total_checkin_initiated || 0, S = a.checkinData.total_record_locator_init || 0, C = a.checkinData.total_record_locator_init_abandoned || 0, $ = a.checkinData.total_checkin_pre_init_abandoned_error, L = a.checkinData.total_checkin_pre_init_abandoned_voluntary, T = $ != null || L != null, B = T ? Math.max(Number($) || 0, 0) : 0, E = T ? Math.max(Number(L) || 0, 0) : 0, I = a.checkinData.total_record_locator_init_abandoned_error, N = a.checkinData.total_record_locator_init_abandoned_voluntary, Y = I != null || N != null, V = Y ? Math.max(Number(I) || 0, 0) : 0, tt = Y ? Math.max(Number(N) || 0, 0) : 0, et = Y ? Math.max(C - V - tt, 0) : C, rt = S - C, G = a.checkinData.total_record_locator_started || 0, q = a.checkinData.total_record_locator_completed || 0, j = a.checkinData.total_record_locator_closed || 0, ot = a.checkinData.total_record_locator_unrecovered || 0;
      if (S > 0) {
        const Z = Math.round(S / D * 100);
        b.push({
          source: "Checkin Init",
          target: "Booking Retrieval",
          value: S,
          label: `${S.toLocaleString()} (${Z}%)`
        });
      }
      const X = D - S;
      if (T) {
        if (E > 0) {
          const Z = Math.round(E / D * 100);
          w("Abandoned (Init)"), b.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: E,
            label: `${E.toLocaleString()} (${Z}%)`
          });
        }
        if (B > 0) {
          const Z = Math.round(B / D * 100);
          w("Booking not retreived"), b.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: B,
            label: `${B.toLocaleString()} (${Z}%)`
          });
        }
      } else if (X > 0) {
        const Z = Math.round(X / D * 100);
        w("Abandoned (Init)"), b.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: X,
          label: `${X.toLocaleString()} (${Z}%)`
        });
      }
      if (Y) {
        if (V > 0) {
          const Z = Math.round(V / D * 100);
          w("Error"), b.push({
            source: "Booking Retrieval",
            target: "Error",
            value: V,
            label: `${V.toLocaleString()} (${Z}%)`
          });
        }
        if (tt > 0) {
          const Z = Math.round(tt / D * 100);
          w("Abandoned (Started)"), b.push({
            source: "Booking Retrieval",
            target: "Abandoned (Started)",
            value: tt,
            label: `${tt.toLocaleString()} (${Z}%)`
          });
        }
        if (et > 0) {
          const Z = Math.round(et / D * 100);
          w("Abandoned (Started)"), b.push({
            source: "Booking Retrieval",
            target: "Abandoned (Started)",
            value: et,
            label: `${et.toLocaleString()} (${Z}%)`
          });
        }
      } else if (C > 0) {
        const Z = Math.round(C / D * 100);
        w("Abandoned (Started)"), b.push({
          source: "Booking Retrieval",
          target: "Abandoned (Started)",
          value: C,
          label: `${C.toLocaleString()} (${Z}%)`
        });
      }
      if (rt > 0) {
        const Z = Math.round(rt / D * 100);
        b.push({
          source: "Booking Retrieval",
          target: "Booking Retrieved",
          value: rt,
          label: `${rt.toLocaleString()} (${Z}%)`
        });
      }
      if (q > 0) {
        const Z = Math.round(q / G * 100);
        b.push({
          source: "Booking Retrieved",
          target: "Completed",
          value: q,
          label: `${q.toLocaleString()} (${Z}%)`
        });
      }
      if (ot > 0) {
        w("Errors");
        const Z = Math.round(ot / G * 100);
        b.push({
          source: "Booking Retrieved",
          target: "Errors",
          value: ot,
          label: `${ot.toLocaleString()} (${Z}%)`
        });
      }
      const ct = G - (q + ot);
      if (ct > 0) {
        const Z = Math.round(ct / G * 100);
        w("Abandoned (Flow)"), b.push({
          source: "Booking Retrieved",
          target: "Abandoned (Flow)",
          value: ct,
          label: `${ct.toLocaleString()} (${Z}%)`
        });
      }
      const gt = q - j;
      if (gt > 0) {
        const Z = Math.round(gt / G * 100);
        w("BP Error"), b.push({
          source: "Completed",
          target: "BP Error",
          value: gt,
          label: `${gt.toLocaleString()} (${Z}%)`
        });
      }
      if (j > 0) {
        const Z = Math.round(j / G * 100);
        b.push({
          source: "Completed",
          target: "Closed with BP",
          value: j,
          label: `${j.toLocaleString()} (${Z}%)`
        });
      }
      return { nodes: p, links: b };
    });
    return t({ isDark: i }), (p, b) => (_(), nt(ft, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      "default-open": e.initiallyOpen
    }, Mt({
      default: P(() => [
        e.loading ? (_(), k("div", tm, [...b[0] || (b[0] = [
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
        ])])) : (_(), k("div", em, [
          v.value.nodes.length > 0 ? (_(), k("div", nm, [
            R(Me, {
              data: v.value,
              height: "500px",
              "node-colors": g.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])) : z("", !0),
          y.value && y.value.length > 0 ? (_(), k("div", am, [
            r("div", sm, [
              R(qt, {
                columns: f,
                rows: m.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": P(({ row: x }) => [
                  r("span", om, A(d(String(x.date))), 1)
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
                  r("span", im, A(h(x.record_locator_closed_count, x.record_locator_started_count)), 1)
                ]),
                "cell-failed": P(({ row: x }) => [
                  r("span", lm, A(h(x.unrecovered_count, x.record_locator_started_count)), 1)
                ]),
                "cell-reasons": P(({ row: x }) => [
                  Array.isArray(x.failed_steps) && x.failed_steps.length > 0 ? (_(), k("div", rm, [
                    (_(!0), k(U, null, at(x.failed_steps, (w) => (_(), k("div", {
                      key: w.step_name,
                      class: "reason-item"
                    }, [
                      r("span", cm, A(c(w.step_name)) + ":", 1),
                      r("span", dm, A(w.failed_count), 1)
                    ]))), 128))
                  ])) : (_(), k("div", um, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (_(), k("div", hm, [
            r("div", fm, [
              r("div", gm, [
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
      e.enableExport && !e.loading && y.value && y.value.length > 0 ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Dt), {
            variant: "inline",
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["default-open"]));
  }
}), mm = /* @__PURE__ */ it(pm, [["__scopeId", "data-v-76946aee"]]), bm = {
  key: 0,
  class: "loading-state"
}, vm = {
  key: 1,
  class: "card-body"
}, ym = {
  key: 0,
  class: "chart-section"
}, _m = { class: "chart-wrapper" }, xm = {
  key: 1,
  class: "record-locator-daily-section"
}, km = { class: "w-full min-w-0" }, wm = { class: "cell-plain font-medium" }, Cm = { class: "cell-plain text-center" }, $m = { class: "cell-plain text-center" }, Sm = { class: "cell-plain text-center" }, Mm = { class: "cell-plain text-center" }, Dm = { class: "cell-plain text-center success-value" }, Am = { class: "cell-plain text-center failed-value" }, Tm = { class: "cell-plain text-center warning-value" }, Bm = { class: "cell-plain text-center" }, Lm = { class: "cell-plain text-center failed-value" }, Fm = {
  key: 2,
  class: "empty-state"
}, Em = /* @__PURE__ */ Q({
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
    }, { isDark: i } = ht(ut(a, "theme")), l = M(() => a.data?.record_locator_by_day ? [...a.data.record_locator_by_day].sort(
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
    ], u = M(
      () => a.isAvianca ? [...d, ...c] : d
    ), h = M(
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
    ), g = M(() => a.data), y = M(() => ({
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
      const x = K(p), w = f(p, b);
      return `${x} (${w})`;
    }, v = M(() => {
      const p = [], b = [], x = /* @__PURE__ */ new Set(), w = (X) => {
        x.has(X) || (p.push({ name: X }), x.add(X));
      };
      if (!g.value.total_checkin_initiated)
        return { nodes: p, links: b };
      w("Checkin Init"), w("Booking retrive"), w("Checkin Started"), w("Checkin Completed"), w("Checkin Closed");
      const D = g.value.total_checkin_initiated, S = g.value.total_record_locator_init, C = g.value.total_record_locator_started, $ = g.value.total_record_locator_completed, L = g.value.total_record_locator_closed, T = g.value.total_record_locator_failed, B = g.value.total_record_locator_abandoned, E = g.value.total_record_locator_init_abandoned, I = g.value.total_checkin_pre_init_abandoned_error, N = g.value.total_checkin_pre_init_abandoned_voluntary, Y = I != null || N != null, V = Y ? Math.max(Number(I) || 0, 0) : 0, tt = Y ? Math.max(Number(N) || 0, 0) : 0, et = g.value.total_record_locator_init_abandoned_error, rt = g.value.total_record_locator_init_abandoned_voluntary, G = et != null || rt != null, q = G ? Math.max(Number(et) || 0, 0) : 0, j = G ? Math.max(Number(rt) || 0, 0) : 0;
      if (S > 0) {
        const X = Math.round(S / D * 100);
        b.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: S,
          label: `${S.toLocaleString()} (${X}%)`
        });
      }
      const ot = D - S;
      if (Y) {
        if (tt > 0) {
          const X = Math.round(tt / D * 100);
          w("Abandoned (Init)"), b.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: tt,
            label: `${tt.toLocaleString()} (${X}%)`
          });
        }
        if (V > 0) {
          const X = Math.round(V / D * 100);
          w("Booking not retreived"), b.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: V,
            label: `${V.toLocaleString()} (${X}%)`
          });
        }
      } else if (ot > 0) {
        const X = Math.round(ot / D * 100);
        w("Abandoned (Init)"), b.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: ot,
          label: `${ot.toLocaleString()} (${X}%)`
        });
      }
      if (C > 0) {
        const X = Math.round(C / D * 100);
        b.push({
          source: "Booking retrive",
          target: "Checkin Started",
          value: C,
          label: `${C.toLocaleString()} (${X}%)`
        });
      }
      if (G) {
        if (q > 0) {
          const X = Math.round(q / D * 100);
          w("Error"), b.push({
            source: "Booking retrive",
            target: "Error",
            value: q,
            label: `${q.toLocaleString()} (${X}%)`
          });
        }
        if (j > 0) {
          const X = Math.round(j / D * 100);
          w("Abandoned (Started)"), b.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: j,
            label: `${j.toLocaleString()} (${X}%)`
          });
        }
      } else if (E > 0) {
        const X = Math.round(E / D * 100);
        w("Abandoned (Started)"), b.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: E,
          label: `${E.toLocaleString()} (${X}%)`
        });
      }
      if ($ > 0) {
        const X = Math.round($ / C * 100);
        b.push({
          source: "Checkin Started",
          target: "Checkin Completed",
          value: $,
          label: `${$.toLocaleString()} (${X}%)`
        });
      }
      if (L > 0) {
        const X = Math.round(L / C * 100);
        b.push({
          source: "Checkin Completed",
          target: "Checkin Closed",
          value: L,
          label: `${L.toLocaleString()} (${X}%)`
        });
      }
      if (T > 0) {
        const X = Math.round(T / C * 100);
        w("Checkin Failed"), b.push({
          source: "Checkin Started",
          target: "Checkin Failed",
          value: T,
          label: `${T.toLocaleString()} (${X}%)`
        });
      }
      if (B > 0) {
        const X = Math.round(B / C * 100);
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
    }, Mt({
      default: P(() => [
        a.loading ? (_(), k("div", bm, [...b[0] || (b[0] = [
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
        ])])) : (_(), k("div", vm, [
          v.value.nodes.length > 0 ? (_(), k("section", ym, [
            r("div", _m, [
              R(Me, {
                data: v.value,
                height: "500px",
                "node-colors": y.value,
                "use-gradient": !1,
                "node-gap": 30
              }, null, 8, ["data", "node-colors"])
            ])
          ])) : z("", !0),
          l.value && l.value.length > 0 ? (_(), k("section", xm, [
            r("div", km, [
              R(qt, {
                columns: u.value,
                rows: h.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": P(({ row: x }) => [
                  r("span", wm, A(F(It)(String(x.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": P(({ row: x }) => [
                  r("span", Cm, A(F(K)(x.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieve": P(({ row: x }) => [
                  r("span", $m, A(m(x.record_locator_init_count, x.checkin_initiated)), 1)
                ]),
                "cell-checkinStarted": P(({ row: x }) => [
                  r("span", Sm, A(F(K)(x.record_locator_started_count)), 1)
                ]),
                "cell-checkinCompleted": P(({ row: x }) => [
                  r("span", Mm, A(m(x.record_locator_completed_count, x.record_locator_started_count)), 1)
                ]),
                "cell-checkinClosed": P(({ row: x }) => [
                  r("span", Dm, A(m(x.record_locator_closed_count, x.record_locator_started_count)), 1)
                ]),
                "cell-checkinFailed": P(({ row: x }) => [
                  r("span", Am, A(m(x.record_locator_failed_count, x.record_locator_started_count)), 1)
                ]),
                "cell-abandoned": P(({ row: x }) => [
                  r("span", Tm, A(m(x.record_locator_abandoned_count, x.record_locator_started_count)), 1)
                ]),
                "cell-createPayment": P(({ row: x }) => [
                  r("span", Bm, A(F(K)(x.record_locator_create_payment_count ?? 0)), 1)
                ]),
                "cell-failedPayment": P(({ row: x }) => [
                  r("span", Lm, A(F(K)(x.record_locator_create_payment_failed_count ?? 0)), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (_(), k("section", Fm, [...b[1] || (b[1] = [
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
      e.enableExport && !a.loading && l.value && l.value.length > 0 ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Dt), {
            variant: "inline",
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["collapsible"]));
  }
}), Fi = /* @__PURE__ */ it(Em, [["__scopeId", "data-v-9df37098"]]), Im = {
  key: 0,
  class: "loading-state"
}, Pm = {
  key: 1,
  class: "card-body"
}, Rm = {
  key: 0,
  class: "checkin-segments-daily-section"
}, Om = { class: "w-full min-w-0" }, zm = { class: "segment-plain" }, Vm = { class: "segment-plain" }, Nm = { class: "segment-plain" }, Wm = { class: "percentage-value" }, Hm = { class: "percentage-value" }, jm = { class: "percentage-value success" }, Ym = {
  key: 1,
  class: "empty-state"
}, qm = /* @__PURE__ */ Q({
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
    }, { isDark: i } = ht(ut(a, "theme")), l = [
      { key: "departure", label: "Departure", align: "center" },
      { key: "connection", label: "Connection", align: "center" },
      { key: "arrival", label: "Arrival", align: "center" },
      { key: "trip", label: "Trip", align: "center" },
      { key: "init", label: "Init", align: "center" },
      { key: "started", label: "Started (%)", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed (%)", align: "center" }
    ], d = M(
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
    }, Mt({
      default: P(() => [
        a.loading ? (_(), k("div", Im, [...y[0] || (y[0] = [
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
        ])])) : (_(), k("div", Pm, [
          a.data.length > 0 ? (_(), k("section", Rm, [
            r("div", Om, [
              R(qt, {
                columns: l,
                rows: d.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-departure": P(({ row: f }) => [
                  r("span", zm, A(u(f.departure_airport)), 1)
                ]),
                "cell-connection": P(({ row: f }) => [
                  r("span", {
                    class: H(["segment-plain", {
                      "segment-plain--muted": u(f.conexion_airport) === "-"
                    }])
                  }, A(u(f.conexion_airport)), 3)
                ]),
                "cell-arrival": P(({ row: f }) => [
                  r("span", Vm, A(u(f.arrival_airport)), 1)
                ]),
                "cell-trip": P(({ row: f }) => [
                  r("span", Nm, A(h(f) ? "Roundtrip" : "One way"), 1)
                ]),
                "cell-init": P(({ row: f }) => [
                  bt(A(F(K)(f.segment_init_count)), 1)
                ]),
                "cell-started": P(({ row: f }) => [
                  r("span", Wm, A(c(f.segment_started_count, f.segment_init_count)), 1)
                ]),
                "cell-completed": P(({ row: f }) => [
                  r("span", Hm, A(c(f.segment_completed_count, f.segment_init_count)), 1)
                ]),
                "cell-closed": P(({ row: f }) => [
                  r("span", jm, A(c(f.segment_closed_count, f.segment_init_count)), 1)
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (_(), k("section", Ym, [...y[1] || (y[1] = [
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
      e.enableExport && !a.loading && a.data.length > 0 ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Dt), {
            variant: "inline",
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["collapsible", "default-open"]));
  }
}), Ei = /* @__PURE__ */ it(qm, [["__scopeId", "data-v-5499182a"]]), Km = { class: "checkin-container__body" }, Um = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = M(() => n.loading || n.checkinLoading), o = M(() => n.loading || n.checkinMetricsLoading), i = M(() => n.loading || n.recordLocatorLoading || n.checkinMetricsLoading), l = M(() => n.loading || n.segmentsLoading), d = M(() => n.recordLocatorData ?? n.checkinMetricsData);
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
        r("div", Km, [
          R(Fi, {
            collapsible: !1,
            loading: i.value,
            data: d.value,
            "is-avianca": e.isAvianca,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: y[0] || (y[0] = (f) => c("recordLocator", f))
          }, null, 8, ["loading", "data", "is-avianca", "theme", "enable-export", "export-loading"]),
          R(Ei, {
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
            onExport: h
          }, null, 8, ["initially-open", "loading", "data", "show-checkin", "show-checkin-metrics", "checkin-loading", "checkin-metrics-loading", "checkin-data", "checkin-failed-data", "checkin-metrics-data", "checkin-metrics-failed-data", "theme", "enable-export", "export-loading"])
        ])
      ]),
      _: 1
    }, 8, ["default-open"]));
  }
}), Xm = /* @__PURE__ */ it(Um, [["__scopeId", "data-v-bbfe0486"]]), Gm = {
  key: 0,
  class: "loading-state"
}, Zm = {
  key: 1,
  class: "card-body"
}, Qm = { class: "chart-section" }, Jm = { class: "chart-wrapper" }, t0 = {
  key: 1,
  class: "empty-chart"
}, e0 = { class: "payment-success-summary" }, n0 = {
  key: 0,
  class: "disruption-daily-section"
}, a0 = { class: "w-full min-w-0" }, s0 = { class: "font-medium text-center" }, o0 = { class: "text-center" }, i0 = { class: "text-center" }, l0 = { class: "percentage-text" }, r0 = { class: "text-center" }, c0 = { class: "abandoned-value" }, d0 = { class: "badges-container badges-wrap" }, u0 = { class: "badges-container badges-wrap" }, h0 = {
  key: 1,
  class: "empty-state"
}, f0 = /* @__PURE__ */ Q({
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
    }, i = M(() => a.data?.disruption_by_day ? [...a.data.disruption_by_day].sort(
      (p, b) => new Date(p.date).getTime() - new Date(b.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "abandoned", label: "Abandoned (%)", align: "center" },
      { key: "voluntary", label: "Voluntary", align: "left" },
      { key: "involuntary", label: "Involuntary", align: "left" }
    ], d = M(
      () => i.value.map((p) => ({
        id: p.date,
        ...p
      }))
    ), c = M(() => a.data?.total_payment_success || []), u = M(() => {
      const p = c.value;
      return p.length === 0 ? g(0) : p.map((b) => `${b.currency} ${g(b.total_value)}`).join(" · ");
    }), h = (p, b) => !b || b === 0 ? "0%" : `${Math.round(p / b * 100)}%`, g = (p) => yt(p), y = (p) => (p ?? []).reduce((b, x) => b + (x.count ?? 0), 0), f = (p) => typeof p.sell_success_count == "number" ? p.sell_success_count : y(p.payment_success_total), m = M(() => {
      const p = a.data, b = p.total_disruption_conversations || 0, x = p.total_disruption_initiated || 0, w = p.total_voluntary || 0, D = p.total_involuntary || 0, S = p.total_accepted || 0, C = p.total_confirmed || 0, $ = typeof p.total_sell_success == "number" ? p.total_sell_success : y(p.total_payment_success), L = p.total_sell_failed || 0, T = Math.max(0, b - x), B = Math.max(0, x - w - D), E = Math.max(0, D - S), I = Math.max(0, w - C), N = L, Y = Math.max(0, C - $ - N), V = (rt, G) => {
        const q = G > 0 ? Math.round(rt / G * 100) : 0;
        return `${rt.toLocaleString()} (${q}%)`;
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
      ], et = [];
      return x > 0 && et.push({
        source: "Initiated",
        target: "Started",
        value: x,
        label: V(x, b)
      }), T > 0 && et.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: T,
        label: V(T, b)
      }), w > 0 && et.push({
        source: "Started",
        target: "Voluntary",
        value: w,
        label: V(w, b)
      }), D > 0 && et.push({
        source: "Started",
        target: "Involuntary",
        value: D,
        label: V(D, b)
      }), B > 0 && et.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: B,
        label: V(B, b)
      }), S > 0 && et.push({
        source: "Involuntary",
        target: "Accepted",
        value: S,
        label: V(S, b)
      }), E > 0 && et.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: E,
        label: V(E, b)
      }), C > 0 && et.push({
        source: "Voluntary",
        target: "Confirmed",
        value: C,
        label: V(C, b)
      }), I > 0 && et.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: I,
        label: V(I, b)
      }), $ > 0 && et.push({
        source: "Confirmed",
        target: "Paid",
        value: $,
        label: V($, b)
      }), N > 0 && et.push({
        source: "Confirmed",
        target: "Rejected",
        value: N,
        label: V(N, b)
      }), Y > 0 && et.push({
        source: "Confirmed",
        target: "Not Paid",
        value: Y,
        label: V(Y, b)
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
    }, Mt({
      default: P(() => [
        a.loading ? (_(), k("div", Gm, [...b[0] || (b[0] = [
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
        ])])) : (_(), k("div", Zm, [
          r("section", Qm, [
            r("div", Jm, [
              m.value.nodes.length > 0 && m.value.links.length > 0 ? (_(), nt(Me, {
                key: 0,
                data: m.value,
                "node-colors": v,
                height: "500px"
              }, null, 8, ["data"])) : (_(), k("div", t0, [...b[1] || (b[1] = [
                r("p", { class: "empty-chart-text" }, "No disruption data available for visualization", -1)
              ])]))
            ])
          ]),
          r("section", e0, [
            R(lt, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: u.value
            }, null, 8, ["value"])
          ]),
          i.value && i.value.length > 0 ? (_(), k("section", n0, [
            b[2] || (b[2] = r("div", { class: "section-header" }, [
              r("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            r("div", a0, [
              R(qt, {
                columns: l,
                rows: d.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": P(({ row: x }) => [
                  r("span", s0, A(F(It)(String(x.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": P(({ row: x }) => [
                  r("span", o0, A(F(K)(Number(x.disruption_conversations))), 1)
                ]),
                "cell-started": P(({ row: x }) => [
                  r("span", i0, [
                    bt(A(F(K)(Number(x.disruption_initiated_count))) + " ", 1),
                    r("span", l0, " (" + A(h(Number(x.disruption_initiated_count), Number(x.disruption_conversations))) + ") ", 1)
                  ])
                ]),
                "cell-abandoned": P(({ row: x }) => [
                  r("span", r0, [
                    r("span", c0, A(F(K)(Number(x.disruption_initiated_count) - Number(x.voluntary_count) - Number(x.involuntary_count))) + " (" + A(h(Number(x.disruption_initiated_count) - Number(x.voluntary_count) - Number(x.involuntary_count), Number(x.disruption_conversations))) + ") ", 1)
                  ])
                ]),
                "cell-voluntary": P(({ row: x }) => [
                  r("div", d0, [
                    (_(!0), k(U, null, at([x], (w, D) => (_(), k(U, { key: D }, [
                      R(Rt, {
                        color: "neutral",
                        outlined: !0
                      }, {
                        default: P(() => [
                          bt(" VOL " + A(F(K)(w.voluntary_count)) + " (" + A(h(w.voluntary_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      R(Rt, { color: "success" }, {
                        default: P(() => [
                          bt(" Confirm " + A(F(K)(w.confirmed_count)) + " (" + A(h(w.confirmed_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      R(Rt, { color: "warning" }, {
                        default: P(() => [
                          bt(" Not Confirm " + A(F(K)(w.voluntary_count - w.confirmed_count)) + " (" + A(h(w.voluntary_count - w.confirmed_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      R(Rt, { color: "danger" }, {
                        default: P(() => [
                          bt(" Reject " + A(F(K)(w.sell_failed_count)) + " (" + A(h(w.sell_failed_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      R(Rt, { color: "orange" }, {
                        default: P(() => [
                          bt(" Not Paid " + A(F(K)(Math.max(0, w.confirmed_count - f(w) - w.sell_failed_count))) + " (" + A(h(Math.max(0, w.confirmed_count - f(w) - w.sell_failed_count), w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      R(Rt, {
                        color: "success",
                        outlined: !0
                      }, {
                        default: P(() => [
                          bt(" Finish " + A(F(K)(f(w))) + " (" + A(h(f(w), w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      (_(!0), k(U, null, at(w.payment_success_total || [], (S) => (_(), nt(Rt, {
                        key: `${w.date}-${S.currency}`,
                        color: "neutral"
                      }, {
                        default: P(() => [
                          bt(A(S.currency) + " " + A(g(S.total_value)), 1)
                        ]),
                        _: 2
                      }, 1024))), 128))
                    ], 64))), 128))
                  ])
                ]),
                "cell-involuntary": P(({ row: x }) => [
                  r("div", u0, [
                    (_(!0), k(U, null, at([x], (w, D) => (_(), k(U, { key: D }, [
                      R(Rt, { color: "purple" }, {
                        default: P(() => [
                          bt(" INV " + A(F(K)(w.involuntary_count)) + " (" + A(h(w.involuntary_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      R(Rt, { color: "danger" }, {
                        default: P(() => [
                          bt(" Human " + A(F(K)(w.involuntary_count - w.accepted_count)) + " (" + A(h(w.involuntary_count - w.accepted_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      R(Rt, { color: "success" }, {
                        default: P(() => [
                          bt(" Accept " + A(F(K)(w.accepted_count)) + " (" + A(h(w.accepted_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024)
                    ], 64))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (_(), k("section", h0, [...b[3] || (b[3] = [
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
      e.enableExport && !a.loading && i.value && i.value.length > 0 ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Dt), {
            variant: "inline",
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), g0 = /* @__PURE__ */ it(f0, [["__scopeId", "data-v-dee558a4"]]), p0 = {
  key: 0,
  class: "flex min-h-[380px] flex-1 flex-col items-center justify-center px-4"
}, m0 = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, b0 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, v0 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, y0 = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, _0 = /* @__PURE__ */ Q({
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
    }, d = ut(o, "theme"), { isDark: c } = ht(d), u = {
      airline_information: "#8b5cf6",
      booking_info: "#f59e0b",
      flight_status: "#06b6d4"
    }, h = st({ labels: [], datasets: [] }), g = M(
      () => o.data ?? {
        total_faq_events: 0,
        total_documents_found: 0,
        total_airline_information_retrieved: 0,
        total_booking_info_retrieved: 0,
        total_flight_status_retrieved: 0,
        faq_by_day: []
      }
    ), y = M(() => {
      const v = g.value, p = v.total_airline_information_retrieved + v.total_booking_info_retrieved + v.total_flight_status_retrieved, b = (D) => p > 0 ? (D / p * 100).toFixed(1) : "0.0", x = v.total_faq_events, w = x > 0 ? `${(v.total_documents_found / x * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: u.airline_information,
          value: `${b(v.total_airline_information_retrieved)}%`,
          subvalue: `${K(v.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: u.booking_info,
          value: `${b(v.total_booking_info_retrieved)}%`,
          subvalue: `${K(v.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: u.flight_status,
          value: `${b(v.total_flight_status_retrieved)}%`,
          subvalue: `${K(v.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: K(v.total_documents_found),
          subvalue: w
        }
      ];
    }), f = M(() => {
      const v = y.value.length;
      return v <= 1 ? "grid w-full grid-cols-1 gap-3 sm:gap-4" : v === 2 ? "grid w-full grid-cols-2 gap-3 sm:gap-4" : v === 3 ? "grid w-full grid-cols-3 gap-3 sm:gap-4" : "grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4";
    }), m = (v) => {
      if (!v) {
        h.value = { labels: [], datasets: [] };
        return;
      }
      const p = v.faq_by_day || [];
      if (p.length > 0) {
        const b = p.map((S) => It(S.date).format("MMM DD")), x = p.map((S) => S.airline_information_retrieved_count || 0), w = p.map((S) => S.flight_status_retrieved_count || 0), D = p.map((S) => S.booking_info_retrieved_count || 0);
        h.value = {
          labels: b,
          datasets: [
            {
              label: "Airline Information",
              data: x,
              borderColor: u.airline_information,
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              fill: !0
            },
            {
              label: "Flight Status",
              data: w,
              borderColor: u.flight_status,
              backgroundColor: "rgba(6, 182, 212, 0.1)",
              fill: !0
            },
            {
              label: "Booking Information",
              data: D,
              borderColor: u.booking_info,
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              fill: !0
            }
          ]
        };
      } else
        h.value = { labels: [], datasets: [] };
    };
    return Pt(
      () => o.data,
      (v) => {
        m(v ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: c }), (v, p) => (_(), nt(ft, {
      class: "w-full min-h-0 self-start",
      title: "FAQ Metrics",
      subtitle: "FAQ volume by category",
      collapsible: !1
    }, Mt({
      default: P(() => [
        r("div", {
          class: H(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", o.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          o.loading ? (_(), k("div", p0, [
            r("div", m0, [
              (_(), k(U, null, at(a, (b, x) => r("div", {
                key: x,
                class: H(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", s[x]]),
                style: mt({ height: `${b}%` })
              }, null, 6)), 64))
            ]),
            p[0] || (p[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading FAQ metrics... ", -1))
          ])) : (_(), k(U, { key: 1 }, [
            h.value.labels && h.value.labels.length ? (_(), k("section", b0, [
              r("div", v0, [
                R(Se, {
                  data: h.value,
                  theme: d.value
                }, null, 8, ["data", "theme"])
              ]),
              r("div", {
                class: H(f.value)
              }, [
                (_(!0), k(U, null, at(y.value, (b) => (_(), nt(lt, {
                  key: b.name,
                  color: b.color,
                  title: b.label,
                  value: b.value,
                  subvalue: b.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 2)
            ])) : (_(), k("section", y0, [...p[1] || (p[1] = [
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
      e.enableExport && !o.loading && h.value.labels && h.value.labels.length ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Dt), {
            variant: "inline",
            loading: e.exportLoading,
            onExport: l
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), x0 = /* @__PURE__ */ it(_0, [["__scopeId", "data-v-8412bad4"]]), k0 = {
  key: 0,
  class: "flex min-h-[380px] flex-1 flex-col items-center justify-center px-4"
}, w0 = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, C0 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, $0 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, S0 = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, M0 = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, D0 = { class: "max-w-[360px] px-4 text-center" }, A0 = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, T0 = /* @__PURE__ */ Q({
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
    const a = [30, 50, 70, 50, 40], s = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], o = {
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
    }, c = ut(i, "theme"), { isDark: u } = ht(c), h = M(() => {
      const m = i.data?.agents_by_day || {}, v = Object.keys(m).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const p = /* @__PURE__ */ new Set();
      for (const w of Object.values(m))
        for (const D of Object.keys(w))
          p.add(D);
      const x = Array.from(p).map((w) => {
        const D = w.toLowerCase(), S = o[D] || o[w] || "#94a3b8";
        return {
          label: w.charAt(0).toUpperCase() + w.slice(1).replace(/_/g, " "),
          data: v.map((C) => m[C]?.[w] || 0),
          borderColor: S
        };
      });
      return {
        labels: v.map((w) => It(w).format("MMM DD")),
        datasets: x
      };
    }), g = M(() => {
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
    }), y = M(() => g.value.slice(0, 4)), f = M(() => {
      const m = y.value.length;
      return m <= 1 ? "grid w-full grid-cols-1 gap-3 sm:gap-4" : m === 2 ? "grid w-full grid-cols-2 gap-3 sm:gap-4" : m === 3 ? "grid w-full grid-cols-3 gap-3 sm:gap-4" : "grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4";
    });
    return t({ isDark: u }), (m, v) => (_(), nt(ft, {
      class: "w-full min-h-0 self-start",
      title: "Interactions by Agent",
      subtitle: "Responses sent by AI agents",
      collapsible: !1
    }, Mt({
      default: P(() => [
        r("div", {
          class: H(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", i.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          i.loading ? (_(), k("div", k0, [
            r("div", w0, [
              (_(), k(U, null, at(a, (p, b) => r("div", {
                key: b,
                class: H(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", s[b]]),
                style: mt({ height: `${p}%` })
              }, null, 6)), 64))
            ]),
            v[0] || (v[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading agent metrics... ", -1))
          ])) : (_(), k(U, { key: 1 }, [
            h.value.labels && h.value.labels.length ? (_(), k("section", C0, [
              r("div", $0, [
                R(Se, {
                  data: h.value,
                  options: e.options,
                  theme: c.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              y.value.length ? (_(), k("div", {
                key: 0,
                class: H(f.value)
              }, [
                (_(!0), k(U, null, at(y.value, (p) => (_(), nt(lt, {
                  key: p.name,
                  color: p.color,
                  title: p.label,
                  value: `${p.percentage}%`,
                  subvalue: `${F(K)(p.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 2)) : z("", !0)
            ])) : g.value.length ? (_(), k("section", S0, [
              r("div", {
                class: H(f.value)
              }, [
                (_(!0), k(U, null, at(y.value, (p) => (_(), nt(lt, {
                  key: p.name,
                  color: p.color,
                  title: p.label,
                  value: `${p.percentage}%`,
                  subvalue: `${F(K)(p.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 2)
            ])) : z("", !0),
            g.value.length ? z("", !0) : (_(), k("section", M0, [
              r("div", D0, [
                r("div", A0, [
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
      e.enableExport && !i.loading && (h.value.labels && h.value.labels.length > 0 || g.value.length > 0) ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Dt), {
            variant: "inline",
            loading: e.exportLoading,
            onExport: d
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), B0 = /* @__PURE__ */ it(T0, [["__scopeId", "data-v-27e089ee"]]), L0 = {
  key: 0,
  class: "loading-state"
}, F0 = {
  key: 1,
  class: "card-body"
}, E0 = {
  key: 0,
  class: "chart-section"
}, I0 = {
  key: 1,
  class: "empty-state"
}, P0 = {
  key: 2,
  class: "comparison-section"
}, R0 = { class: "comparison-grid" }, O0 = /* @__PURE__ */ Q({
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
    }, { isDark: d } = ht(ut(o, "theme"));
    M(() => o.data?.total_sell_success ?? 0);
    const c = M(() => {
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
      const m = K(f.previous), v = `${Math.abs(f.delta).toFixed(1)}%`;
      return f.delta === 0 ? `0.0% vs prev. period (${m})` : `${f.delta > 0 ? "↑" : "↓"} ${v} vs prev. period (${m})`;
    }
    const y = M(() => {
      const f = o.data?.sales_by_channel_by_day ?? [];
      if (f.length === 0) return { labels: [], datasets: [] };
      const m = f.map((p) => It(p.date).format("MMM-DD")), v = c.value.map((p, b) => ({
        label: p,
        data: f.map((x) => x.channels[p] ?? 0),
        backgroundColor: u(p, b),
        borderRadius: 4
      }));
      return { labels: m, datasets: v };
    });
    return t({ isDark: d }), (f, m) => (_(), nt(ft, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen
    }, Mt({
      default: P(() => [
        o.loading ? (_(), k("div", L0, [...m[0] || (m[0] = [
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
        ])])) : (_(), k("div", F0, [
          y.value.labels.length > 0 ? (_(), k("section", E0, [
            R(he, {
              data: y.value,
              stacked: !0
            }, null, 8, ["data"])
          ])) : (_(), k("section", I0, [...m[1] || (m[1] = [
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
          e.channelComparison.length > 0 ? (_(), k("section", P0, [
            r("div", R0, [
              (_(!0), k(U, null, at(e.channelComparison, (v, p) => (_(), nt(F(lt), {
                key: v.channel,
                color: u(v.channel, p),
                title: h(v.channel),
                value: F(K)(v.current),
                subvalue: g(v)
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : z("", !0)
        ]))
      ]),
      _: 2
    }, [
      e.enableExport && !o.loading && y.value.labels.length > 0 ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Dt), {
            variant: "inline",
            onExport: l,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["default-open"]));
  }
}), Ii = /* @__PURE__ */ it(O0, [["__scopeId", "data-v-bdc9df0d"]]), z0 = {
  key: 0,
  class: "loading-state"
}, V0 = {
  key: 1,
  class: "card-body"
}, N0 = {
  key: 0,
  class: "chart-section"
}, W0 = { class: "chart-wrapper" }, H0 = {
  key: 1,
  class: "empty-state"
}, j0 = { class: "seller-value-cards" }, Y0 = {
  key: 2,
  class: "seller-daily-section"
}, q0 = { class: "w-full min-w-0" }, K0 = { class: "sl-cell font-medium" }, U0 = { class: "sl-cell text-center" }, X0 = { class: "sl-cell text-center" }, G0 = { class: "sl-cell text-center" }, Z0 = { class: "sl-cell text-center" }, Q0 = { class: "sl-cell text-center" }, J0 = { class: "sl-cell text-center success-value" }, tb = {
  key: 0,
  class: "currency-cell-list"
}, eb = {
  key: 1,
  class: "empty-cell"
}, nb = { class: "sl-cell text-center success-value" }, ab = { class: "sl-cell text-center" }, sb = { class: "sl-cell text-center success-value" }, ob = {
  key: 0,
  class: "currency-cell-list"
}, ib = {
  key: 1,
  class: "empty-cell"
}, lb = { class: "sl-cell text-center success-value" }, rb = { class: "sl-cell text-center" }, cb = { class: "sl-cell text-center success-value" }, db = {
  key: 0,
  class: "currency-cell-list"
}, ub = { key: 1 }, hb = {
  key: 0,
  class: "failed-reasons"
}, fb = { class: "reason-name" }, gb = { class: "reason-count" }, pb = {
  key: 1,
  class: "empty-cell"
}, mb = /* @__PURE__ */ Q({
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
    }, { isDark: l } = ht(ut(s, "theme")), d = M(() => {
      if (!s.sellerData?.seller_by_day) return [];
      const B = [...s.sellerData.seller_by_day];
      return s.failedData?.failed_by_reason_by_day && s.failedData.failed_by_reason_by_day.forEach((E) => {
        const I = B.findIndex((N) => N.date === E.date);
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
    ], u = M(
      () => d.value.map((B) => ({
        id: B.date,
        ...B
      }))
    ), h = M(() => s.sellerData), g = M(() => s.failedData), y = M(
      () => Array.isArray(s.sellerData.total_value_sell_success) ? s.sellerData.total_value_sell_success : []
    ), f = M(
      () => Array.isArray(s.sellerData.total_value_sell_bank_transfer) ? s.sellerData.total_value_sell_bank_transfer : []
    ), m = M(
      () => Array.isArray(s.sellerData.total_value_sell_cash_option) ? s.sellerData.total_value_sell_cash_option : []
    ), v = M(() => {
      const B = y.value;
      return B.length > 0 ? B.map((E) => `${E.currency} ${ve(E.total_value)}`).join(" · ") : T(s.sellerData.total_value_sell_success);
    });
    function p(B) {
      return B.length > 0 ? B.map((E) => `${E.currency} ${ve(E.total_value)}`).join(" · ") : "—";
    }
    const b = M(
      () => p(f.value)
    ), x = M(
      () => p(m.value)
    ), w = M(() => {
      const {
        total_seller_conversations: B = 0,
        total_sell_started: E = 0,
        total_sell_booking_created: I = 0,
        total_sell_success: N = 0,
        total_sell_bank_transfer: Y = 0,
        total_sell_cash_option: V = 0,
        total_sell_success_bank_transfer: tt = 0,
        total_sell_success_cash: et = 0
      } = h.value, { failed_by_reason_by_day: rt = [] } = g.value;
      if (B === 0) return { nodes: [], links: [] };
      const G = Math.max(0, N - (tt ?? 0) - (et ?? 0)), q = [
        { name: "Sell Initiated", value: B },
        { name: "Sell Started", value: E },
        { name: "Booking Created", value: I },
        { name: "Sell Success", value: G }
      ], j = [], ot = B - E;
      if (ot > 0) {
        const Z = Math.round(ot / B * 100);
        q.push({ name: "Abandoned (Init)", value: ot }), j.push({
          source: "Sell Initiated",
          target: "Abandoned (Init)",
          value: ot,
          label: `${ot.toLocaleString()} (${Z}%)`
        });
      }
      if (E > 0) {
        const Z = Math.round(E / B * 100);
        j.push({
          source: "Sell Initiated",
          target: "Sell Started",
          value: E,
          label: `${E.toLocaleString()} (${Z}%)`
        });
      }
      const X = rt.reduce((Z, Ct) => (Ct.reasons && Array.isArray(Ct.reasons) && Ct.reasons.forEach((St) => {
        const Bt = St.reason, ee = St.failed_count;
        Z[Bt] = (Z[Bt] || 0) + ee;
      }), Z), {});
      if (I > 0) {
        const Z = Math.round(I / B * 100);
        j.push({
          source: "Sell Started",
          target: "Booking Created",
          value: I,
          label: `${I.toLocaleString()} (${Z}%)`
        });
      }
      if (Y > 0) {
        const Z = Math.round(Y / B * 100);
        q.push({ name: "Bank Transfer", value: Y }), j.push({
          source: "Booking Created",
          target: "Bank Transfer",
          value: Y,
          label: `${Y.toLocaleString()} (${Z}%)`
        });
      }
      if (V > 0) {
        const Z = Math.round(V / B * 100);
        q.push({ name: "Cash Option", value: V }), j.push({
          source: "Booking Created",
          target: "Cash Option",
          value: V,
          label: `${V.toLocaleString()} (${Z}%)`
        });
      }
      if (G > 0) {
        const Z = Math.round(G / B * 100);
        j.push({
          source: "Booking Created",
          target: "Sell Success",
          value: G,
          label: `${G.toLocaleString()} (${Z}%)`
        });
      }
      if ((tt ?? 0) > 0) {
        const Z = Math.round((tt ?? 0) / B * 100);
        q.push({ name: "Bank Transfer Success", value: tt ?? 0 }), j.push({
          source: "Bank Transfer",
          target: "Bank Transfer Success",
          value: tt ?? 0,
          label: `${(tt ?? 0).toLocaleString()} (${Z}%)`
        });
      }
      if ((et ?? 0) > 0) {
        const Z = Math.round((et ?? 0) / B * 100);
        q.push({ name: "Cash Option Success", value: et ?? 0 }), j.push({
          source: "Cash Option",
          target: "Cash Option Success",
          value: et ?? 0,
          label: `${(et ?? 0).toLocaleString()} (${Z}%)`
        });
      }
      const ct = I - G - Y - V;
      if (ct > 0) {
        const Z = Math.round(ct / B * 100);
        q.push({ name: "Failed at Completion", value: ct }), j.push({
          source: "Booking Created",
          target: "Failed at Completion",
          value: ct,
          label: `${ct.toLocaleString()} (${Z}%)`
        });
      }
      const gt = E - I;
      if (gt > 0) {
        const Z = Math.round(gt / B * 100);
        q.push({ name: "Failed at Booking", value: gt }), j.push({
          source: "Sell Started",
          target: "Failed at Booking",
          value: gt,
          label: `${gt.toLocaleString()} (${Z}%)`
        });
      }
      if (Object.keys(X).length > 0) {
        const Z = Object.values(X).reduce((St, Bt) => St + Bt, 0), Ct = gt - Z;
        if (Object.entries(X).filter(([, St]) => St > 0).sort(([, St], [, Bt]) => Bt - St).forEach(([St, Bt]) => {
          const ee = Math.round(Bt / B * 100);
          q.push({ name: `Failed: ${St}`, value: Bt }), j.push({
            source: "Failed at Booking",
            target: `Failed: ${St}`,
            value: Bt,
            label: `${Bt.toLocaleString()} (${ee}%)`
          });
        }), Ct > 0) {
          const St = Math.round(Ct / B * 100);
          q.push({ name: "Failed: Without Reason", value: Ct }), j.push({
            source: "Failed at Booking",
            target: "Failed: Without Reason",
            value: Ct,
            label: `${Ct.toLocaleString()} (${St}%)`
          });
        }
      }
      return { nodes: q, links: j };
    }), D = {
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
    }, S = M(() => D), C = (B, E) => !E || E === 0 ? "0%" : `${Math.round(B / E * 100)}%`, $ = (B, E) => {
      const I = K(B), N = C(B, E);
      return `${I} (${N})`;
    }, L = (B) => B == null ? 0 : typeof B == "number" ? B : Array.isArray(B) ? B.reduce((E, I) => E + (I.total_value || 0), 0) : 0, T = (B) => ve(L(B));
    return t({ isDark: l }), (B, E) => (_(), nt(ft, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen
    }, Mt({
      default: P(() => [
        s.loading ? (_(), k("div", z0, [...E[0] || (E[0] = [
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
        ])])) : (_(), k("div", V0, [
          w.value.nodes.length > 0 ? (_(), k("section", N0, [
            r("div", W0, [
              R(Me, {
                data: w.value,
                "node-colors": S.value,
                title: "",
                height: "320px"
              }, null, 8, ["data", "node-colors"])
            ])
          ])) : (_(), k("section", H0, [...E[1] || (E[1] = [
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
          r("section", j0, [
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
              value: b.value
            }, null, 8, ["value"]),
            R(lt, {
              class: "seller-value-card",
              color: "#ca8a04",
              title: "Cash Option Value",
              value: x.value
            }, null, 8, ["value"])
          ]),
          d.value && d.value.length > 0 ? (_(), k("section", Y0, [
            r("div", q0, [
              R(qt, {
                columns: c,
                rows: u.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": P(({ row: I }) => [
                  r("span", K0, A(F(It)(String(I.date)).format("MMM DD")), 1)
                ]),
                "cell-sellInitiated": P(({ row: I }) => [
                  r("span", U0, A(F(K)(Number(I.seller_conversations) || 0)), 1)
                ]),
                "cell-sellStarted": P(({ row: I }) => [
                  r("span", X0, A($(I.sell_started_count, I.seller_conversations || I.sell_started_count)), 1)
                ]),
                "cell-getQuote": P(({ row: I }) => [
                  r("span", G0, A($(I.sell_get_quote_count, I.seller_conversations || I.sell_started_count)), 1)
                ]),
                "cell-bookingCreated": P(({ row: I }) => [
                  r("span", Z0, A($(I.sell_booking_created_count, I.seller_conversations || I.sell_started_count)), 1)
                ]),
                "cell-bankTransfer": P(({ row: I }) => [
                  r("span", Q0, A(F(K)(Number(I.sell_bank_transfer_count) || 0)), 1)
                ]),
                "cell-btValue": P(({ row: I }) => [
                  r("span", J0, [
                    Array.isArray(I.daily_value_sell_success_bank_transfer) && I.daily_value_sell_success_bank_transfer.length > 0 ? (_(), k("div", tb, [
                      (_(!0), k(U, null, at(I.daily_value_sell_success_bank_transfer, (N) => (_(), k("span", {
                        key: `${I.date}-bt-success-${N.currency}`
                      }, A(N.currency) + " " + A(F(ve)(N.total_value)), 1))), 128))
                    ])) : (_(), k("span", eb, "-"))
                  ])
                ]),
                "cell-btSuccess": P(({ row: I }) => [
                  r("span", nb, A(F(K)(Number(I.sell_success_bank_transfer_count) || 0)), 1)
                ]),
                "cell-cashOption": P(({ row: I }) => [
                  r("span", ab, A(F(K)(Number(I.sell_cash_option_count) || 0)), 1)
                ]),
                "cell-coValue": P(({ row: I }) => [
                  r("span", sb, [
                    Array.isArray(I.daily_value_sell_success_cash) && I.daily_value_sell_success_cash.length > 0 ? (_(), k("div", ob, [
                      (_(!0), k(U, null, at(I.daily_value_sell_success_cash, (N) => (_(), k("span", {
                        key: `${I.date}-co-success-${N.currency}`
                      }, A(N.currency) + " " + A(F(ve)(N.total_value)), 1))), 128))
                    ])) : (_(), k("span", ib, "-"))
                  ])
                ]),
                "cell-cashSuccess": P(({ row: I }) => [
                  r("span", lb, A(F(K)(Number(I.sell_success_cash_count) || 0)), 1)
                ]),
                "cell-sellSuccess": P(({ row: I }) => [
                  r("span", rb, A($(I.sell_success_count, I.seller_conversations || I.sell_started_count)), 1)
                ]),
                "cell-totalSalesValue": P(({ row: I }) => [
                  r("span", cb, [
                    Array.isArray(I.daily_value_sell_success) && I.daily_value_sell_success.length > 0 ? (_(), k("div", db, [
                      (_(!0), k(U, null, at(I.daily_value_sell_success, (N) => (_(), k("span", {
                        key: `${I.date}-${N.currency}`
                      }, A(N.currency) + " " + A(F(ve)(N.total_value)), 1))), 128))
                    ])) : (_(), k("span", ub, A(T(I.daily_value_sell_success)), 1))
                  ])
                ]),
                "cell-failed": P(({ row: I }) => [
                  (I.reasons || []).length > 0 ? (_(), k("div", hb, [
                    (_(!0), k(U, null, at(I.reasons || [], (N) => (_(), k("div", {
                      key: N.reason,
                      class: "failed-reason-item"
                    }, [
                      r("span", fb, A(N.reason) + ":", 1),
                      r("span", gb, A(N.failed_count), 1)
                    ]))), 128))
                  ])) : (_(), k("div", pb, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : z("", !0)
        ]))
      ]),
      _: 2
    }, [
      e.enableExport && !s.loading && d.value && d.value.length > 0 ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Dt), {
            variant: "inline",
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["default-open"]));
  }
}), Pi = /* @__PURE__ */ it(mb, [["__scopeId", "data-v-6b2126de"]]), bb = { class: "seller-container__body" }, vb = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = M(() => n.loading || n.sellerLoading), o = M(() => n.loading || n.salesByChannelLoading), i = M(() => n.exportLoading || n.sellerExportLoading), l = M(() => n.exportLoading || n.salesByChannelExportLoading);
    function d(c, u) {
      a("export", { source: c, format: u });
    }
    return (c, u) => (_(), nt(ft, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen
    }, {
      default: P(() => [
        r("div", bb, [
          R(Pi, {
            "initially-open": e.childrenInitiallyOpen,
            "seller-data": e.sellerData,
            "failed-data": e.failedData,
            loading: s.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": i.value,
            onExport: u[0] || (u[0] = (h) => d("seller", h))
          }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading"]),
          R(Ii, {
            "initially-open": e.childrenInitiallyOpen,
            data: e.salesByChannelData,
            "channel-comparison": e.channelComparison,
            loading: o.value,
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
}), yb = /* @__PURE__ */ it(vb, [["__scopeId", "data-v-878fdbc6"]]), _b = {
  key: 0,
  class: "card-body"
}, xb = {
  key: 0,
  class: "chart-section"
}, kb = {
  key: 1,
  class: "empty-state"
}, wb = { class: "empty-state-content" }, Cb = { class: "empty-icon-wrapper" }, $b = {
  key: 1,
  class: "loading-state"
}, Sb = /* @__PURE__ */ Q({
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
    }, { isDark: l, colors: d } = ht(ut(s, "theme")), c = M(() => {
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
    }), u = M(() => s.options ? s.options : {
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
    }, Mt({
      default: P(() => [
        e.loading ? (_(), k("div", $b, [...g[2] || (g[2] = [
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
        ])])) : (_(), k("div", _b, [
          c.value.labels && c.value.labels.length ? (_(), k("section", xb, [
            R(aa, {
              data: c.value,
              options: u.value
            }, null, 8, ["data", "options"])
          ])) : (_(), k("section", kb, [
            r("div", wb, [
              r("div", Cb, [
                R(F(Ng), { class: "empty-icon" })
              ]),
              g[0] || (g[0] = r("p", { class: "empty-title" }, "No top agents data", -1)),
              g[1] || (g[1] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
            ])
          ]))
        ]))
      ]),
      _: 2
    }, [
      e.enableExport && !e.loading && c.value.labels && c.value.labels.length ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Dt), {
            variant: "inline",
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), Mb = /* @__PURE__ */ it(Sb, [["__scopeId", "data-v-9c91e3f0"]]), Db = {
  key: 0,
  class: "loading-state"
}, Ab = {
  key: 1,
  class: "card-body"
}, Tb = {
  key: 0,
  class: "payment-methods-section"
}, Bb = { class: "payment-methods-grid" }, Lb = {
  key: 1,
  class: "empty-state"
}, Fb = { class: "empty-state-content" }, Eb = { class: "empty-icon-wrapper" }, Ib = {
  key: 2,
  class: "payment-method-daily-section"
}, Pb = { class: "w-full min-w-0" }, Rb = { class: "font-medium" }, Ob = { class: "text-center" }, zb = { class: "text-center success-value" }, Vb = {
  key: 0,
  class: "currency-cell-list"
}, Nb = { class: "payment-tags" }, Wb = { class: "tag-name" }, Hb = {
  key: 0,
  class: "tag-amount"
}, jb = {
  key: 1,
  class: "tag-amount"
}, Yb = { class: "tag-count" }, qb = {
  key: 3,
  class: "empty-table-state"
}, Kb = "Not Registered", Ub = /* @__PURE__ */ Q({
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
    const a = e, s = n, { isDark: o } = ht(ut(a, "theme")), i = st(!1), l = st({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), d = M(() => l.value.payment_method_breakdown && l.value.payment_method_breakdown.length > 0), c = M(() => l.value.payment_method_by_day && l.value.payment_method_by_day.length > 0), u = M(() => !l.value.payment_method_by_day || l.value.payment_method_by_day.length === 0 ? [] : [...l.value.payment_method_by_day].sort((C, $) => It(C.date).valueOf() - It($.date).valueOf())), h = [
      { key: "date", label: "Date", align: "left" },
      { key: "totalSales", label: "Total Sales", align: "center" },
      { key: "totalAmount", label: "Total Amount", align: "center" },
      { key: "paymentMethods", label: "Payment Methods", align: "left" }
    ], g = M(
      () => u.value.map((C) => ({
        id: C.date,
        date: C.date,
        total_count: C.total_count,
        total_amount: C.total_amount,
        total_amount_by_currency: C.total_amount_by_currency,
        payment_methods: C.payment_methods
      }))
    ), y = (C) => {
      if (!C)
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
      const $ = (C.payment_method_breakdown || []).map((T) => ({
        payment_method: T.payment_method || "Unknown",
        total_amount: T.total_amount ?? 0,
        count: T.count ?? 0,
        total_amount_by_currency: T.total_amount_by_currency ?? []
      })), L = (C.payment_method_by_day || []).map((T) => ({
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
        airline_name: C.airline_name || a.airlineName,
        start_date: C.start_date || "",
        end_date: C.end_date || "",
        total_conversations: C.total_conversations ?? 0,
        total_amount: C.total_amount ?? 0,
        total_sell_usd: C.total_sell_usd,
        total_amount_by_currency: C.total_amount_by_currency ?? [],
        payment_method_breakdown: $,
        payment_method_by_day: L
      };
    }, f = async () => {
      if (!(!a.fetchFunction || !a.dates || a.dates.length < 2 || !a.airlineName)) {
        i.value = !0;
        try {
          const [C, $] = a.dates.map((T) => It(T).format("YYYY-MM-DD")), L = await a.fetchFunction(a.airlineName, C, $);
          l.value = y(L);
        } catch (C) {
          console.error("Error fetching payment method metrics:", C), l.value = y(null);
        } finally {
          i.value = !1;
        }
      }
    }, m = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#f43f5e", "#06b6d4"], v = (C) => !C || C.toLowerCase() === "unknown" ? Kb : C.replace(/_/g, " "), p = (C) => C == null ? "$0.00" : yt(C), b = (C) => {
      const $ = C.total_amount_by_currency;
      return $ && $.length > 0 ? $.map((L) => `${L.currency} ${p(L.total_value)}`).join(" · ") : p(C.total_amount);
    }, x = (C) => C ? It(C).format("MMM DD") : "-", w = (C) => C == null || Number.isNaN(Number(C)) ? 0 : Number(C), D = (C) => {
      s("export", C);
    };
    function S() {
      const C = a.data;
      C && (Array.isArray(C.payment_method_breakdown) && C.payment_method_breakdown.length > 0 || Array.isArray(C.payment_method_by_day) && C.payment_method_by_day.length > 0) && (i.value = !1, l.value = y(C));
    }
    return te(() => {
      a.data ? S() : f();
    }), Pt(
      () => a.data,
      (C) => {
        C && S();
      },
      { deep: !0 }
    ), Pt(
      () => a.dates,
      (C) => {
        a.data || C && C[0] && C[1] && f();
      },
      { deep: !0 }
    ), t({ isDark: o }), (C, $) => (_(), nt(ft, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method"
    }, Mt({
      default: P(() => [
        i.value ? (_(), k("div", Db, [...$[0] || ($[0] = [
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
        ])])) : (_(), k("div", Ab, [
          d.value ? (_(), k("section", Tb, [
            $[1] || ($[1] = r("p", { class: "section-label" }, "Sales by Payment Method", -1)),
            r("div", Bb, [
              (_(!0), k(U, null, at(l.value.payment_method_breakdown, (L, T) => (_(), nt(lt, {
                key: L.payment_method,
                class: "payment-method-card-item min-w-0",
                color: m[T % m.length],
                title: v(L.payment_method),
                value: b(L),
                subvalue: `${w(L.count)} ${w(L.count) === 1 ? "sale" : "sales"}`
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : (_(), k("section", Lb, [
            r("div", Fb, [
              r("div", Eb, [
                R(F(Yg), { class: "empty-icon" })
              ]),
              $[2] || ($[2] = r("p", { class: "empty-title" }, "No payment data available", -1)),
              $[3] || ($[3] = r("p", { class: "empty-description" }, "No payment method data found for the selected period. Try adjusting the date range.", -1))
            ])
          ])),
          c.value ? (_(), k("section", Ib, [
            $[5] || ($[5] = r("p", { class: "section-label" }, "Daily Breakdown", -1)),
            r("div", Pb, [
              R(qt, {
                columns: h,
                rows: g.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": P(({ row: L }) => [
                  r("span", Rb, A(x(String(L.date))), 1)
                ]),
                "cell-totalSales": P(({ row: L }) => [
                  r("span", Ob, A(F(K)(L.total_count ?? 0)), 1)
                ]),
                "cell-totalAmount": P(({ row: L }) => [
                  r("span", zb, [
                    Array.isArray(L.total_amount_by_currency) && L.total_amount_by_currency.length > 0 ? (_(), k("div", Vb, [
                      (_(!0), k(U, null, at(L.total_amount_by_currency, (T) => (_(), k("span", {
                        key: `${L.date}-${T.currency}`
                      }, A(T.currency) + " " + A(p(T.total_value)), 1))), 128))
                    ])) : (_(), k(U, { key: 1 }, [
                      bt(A(p(Number(L.total_amount ?? 0))), 1)
                    ], 64))
                  ])
                ]),
                "cell-paymentMethods": P(({ row: L }) => [
                  r("div", Nb, [
                    (_(!0), k(U, null, at(Array.isArray(L.payment_methods) ? L.payment_methods : [], (T) => (_(), k("div", {
                      key: T.payment_method,
                      class: "payment-tag"
                    }, [
                      r("span", Wb, A(v(T.payment_method)), 1),
                      $[4] || ($[4] = r("span", { class: "tag-separator" }, "•", -1)),
                      !T.total_amount_by_currency || T.total_amount_by_currency.length === 0 ? (_(), k("span", Hb, A(p(T.total_amount)), 1)) : (_(), k("span", jb, A(T.total_amount_by_currency.map((B) => `${B.currency} ${p(B.total_value)}`).join(" / ")), 1)),
                      r("span", Yb, "(" + A(w(T.count)) + ")", 1)
                    ]))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : d.value ? (_(), k("div", qb, [...$[6] || ($[6] = [
            r("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
          ])])) : z("", !0)
        ]))
      ]),
      _: 2
    }, [
      e.enableExport && !i.value && c.value ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Dt), {
            variant: "inline",
            onExport: D,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), Xb = /* @__PURE__ */ it(Ub, [["__scopeId", "data-v-83dac240"]]), Gb = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, Zb = { class: "overflow-x-auto" }, Qb = { class: "kiut-table w-full min-w-[640px] border-collapse text-left text-sm" }, Jb = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, tv = {
  key: 0,
  scope: "col",
  class: "w-12 px-4 py-3 text-center align-middle"
}, ev = ["checked", "aria-label"], nv = {
  key: 0,
  class: "w-12 bg-transparent px-4 py-3 text-center align-middle"
}, av = ["checked", "aria-label", "onChange"], sv = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = st(null);
    function o(b) {
      return `cell-${b}`;
    }
    function i(b) {
      return b === "center" ? "text-center" : b === "right" ? "text-right" : "text-left";
    }
    function l(b, x) {
      if (typeof n.rowKey == "function")
        return n.rowKey(b);
      const w = b[n.rowKey];
      return w != null ? String(w) : `__index_${x}`;
    }
    function d(b, x) {
      return b[x];
    }
    function c(b) {
      return b == null || typeof b == "object" ? "" : String(b);
    }
    function u(b, x) {
      return l(b, x);
    }
    const h = M(() => n.rows.map((b, x) => l(b, x)));
    function g(b, x) {
      const w = l(b, x);
      return n.selectedKeys.includes(w);
    }
    const y = M(() => !n.selectable || n.rows.length === 0 ? !1 : h.value.every((b) => n.selectedKeys.includes(b))), f = M(() => {
      if (!n.selectable || n.rows.length === 0) return !1;
      const b = h.value.filter((x) => n.selectedKeys.includes(x));
      return b.length > 0 && b.length < n.rows.length;
    });
    Pt(
      [f, y, () => n.selectable],
      async () => {
        await Lt();
        const b = s.value;
        b && (b.indeterminate = f.value && !y.value);
      },
      { immediate: !0 }
    );
    function m() {
      if (n.selectable)
        if (y.value) {
          const b = n.selectedKeys.filter((x) => !h.value.includes(x));
          a("update:selectedKeys", b);
        } else {
          const b = new Set(n.selectedKeys);
          h.value.forEach((x) => b.add(x)), a("update:selectedKeys", [...b]);
        }
    }
    function v(b, x) {
      if (!n.selectable) return;
      const w = l(b, x);
      n.selectedKeys.includes(w) ? a(
        "update:selectedKeys",
        n.selectedKeys.filter((S) => S !== w)
      ) : a("update:selectedKeys", [...n.selectedKeys, w]);
    }
    function p(b, x) {
      const w = l(b, x);
      return `${n.ariaLabelSelectRow} ${w}`;
    }
    return (b, x) => (_(), k("div", Gb, [
      r("div", Zb, [
        r("table", Qb, [
          r("thead", null, [
            r("tr", Jb, [
              e.selectable ? (_(), k("th", tv, [
                r("input", {
                  ref_key: "selectAllRef",
                  ref: s,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: y.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: m
                }, null, 40, ev)
              ])) : z("", !0),
              (_(!0), k(U, null, at(e.columns, (w) => (_(), k("th", {
                key: w.key,
                scope: "col",
                class: H([
                  "px-4 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  i(w.align),
                  w.headerClass ?? ""
                ])
              }, A(w.label), 3))), 128))
            ])
          ]),
          r("tbody", null, [
            (_(!0), k(U, null, at(e.rows, (w, D) => (_(), k("tr", {
              key: u(w, D),
              class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]"
            }, [
              e.selectable ? (_(), k("td", nv, [
                r("input", {
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: g(w, D),
                  "aria-label": p(w, D),
                  onChange: (S) => v(w, D)
                }, null, 40, av)
              ])) : z("", !0),
              (_(!0), k(U, null, at(e.columns, (S) => (_(), k("td", {
                key: S.key,
                class: H([
                  "bg-transparent px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                  i(S.align),
                  S.cellClass ?? ""
                ])
              }, [
                kt(b.$slots, o(S.key), {
                  row: w,
                  column: S,
                  value: d(w, S.key)
                }, () => [
                  bt(A(c(d(w, S.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), Ri = /* @__PURE__ */ it(sv, [["__scopeId", "data-v-95fc0bc9"]]), ov = {
  key: 0,
  class: "loading-state"
}, iv = {
  key: 1,
  class: "card-body"
}, lv = { class: "summary-cards" }, rv = {
  key: 0,
  class: "summary-card enqueued-card"
}, cv = { class: "summary-card-content" }, dv = { class: "card-content enqueued-content" }, uv = { class: "card-value enqueued-value" }, hv = { class: "summary-card assigned-card" }, fv = { class: "summary-card-content" }, gv = { class: "card-content" }, pv = { class: "card-value assigned-value" }, mv = { class: "card-content" }, bv = { class: "card-value assigned-value" }, vv = { class: "summary-card closed-card" }, yv = { class: "summary-card-content" }, _v = { class: "card-content" }, xv = { class: "card-value closed-value" }, kv = { class: "card-content" }, wv = { class: "card-value closed-value" }, Cv = {
  key: 0,
  class: "agents-section"
}, $v = { class: "date-header" }, Sv = { class: "date-title" }, Mv = { class: "date-stats" }, Dv = {
  key: 0,
  class: "stat-item enqueued-stat"
}, Av = { class: "stat-value" }, Tv = { class: "stat-item assigned-stat" }, Bv = { class: "stat-value" }, Lv = { class: "stat-value" }, Fv = { class: "stat-item closed-stat" }, Ev = { class: "stat-value" }, Iv = { class: "stat-value" }, Pv = { class: "w-full min-w-0" }, Rv = { class: "ah-cell name-cell" }, Ov = { class: "ah-cell email-cell" }, zv = { class: "metric-cell-content" }, Vv = { class: "badge assigned-badge" }, Nv = { class: "metric-cell-avg" }, Wv = { class: "metric-cell-content" }, Hv = { class: "badge closed-badge" }, jv = { class: "metric-cell-avg" }, Yv = ["onClick"], qv = {
  key: 1,
  class: "empty-state"
}, va = 3, Kv = /* @__PURE__ */ Q({
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
    const a = e, s = n, o = ($) => {
      s("export", $);
    }, { isDark: i } = ht(ut(a, "theme")), l = M(() => {
      const $ = a.data?.agents_by_day && a.data.agents_by_day.length > 0, L = (a.data?.total_enqueued ?? 0) > 0;
      return $ || L;
    }), d = M(() => {
      if (!l.value) return {};
      const $ = {};
      for (const B of a.data.agents_by_day)
        $[B.date] || ($[B.date] = []), $[B.date].push(B);
      const L = Object.keys($).sort((B, E) => new Date(B).getTime() - new Date(E).getTime()), T = {};
      for (const B of L)
        T[B] = $[B];
      return T;
    }), c = st({});
    function u($) {
      c.value = {
        ...c.value,
        [$]: !c.value[$]
      };
    }
    function h($, L) {
      return c.value[$] ? L : L.slice(0, va);
    }
    function g($) {
      return Math.max(0, $.length - va);
    }
    function y($) {
      return $.length > va;
    }
    const f = [
      { key: "agentName", label: "Agent Name", align: "left" },
      { key: "email", label: "Email", align: "left" },
      { key: "assigned", label: "Assigned (AVG time to assign)", align: "center" },
      { key: "closed", label: "Closed (AVG time to close)", align: "center" }
    ];
    function m($, L) {
      return h($, L).map((T, B) => ({
        id: `${$}-${T.agent_email}-${B}`,
        agent_name: T.agent_name,
        agent_email: T.agent_email,
        assigned_count: T.assigned_count,
        closed_count: T.closed_count,
        avg_time_to_assign_seconds: T.avg_time_to_assign_seconds,
        avg_conversation_duration_seconds: T.avg_conversation_duration_seconds
      }));
    }
    const v = ($) => $ == null ? "0" : K($), p = ($) => {
      if ($ == null)
        return "AVG";
      if ($ < 60)
        return `${Math.round($)}s`;
      const L = Math.round($), T = Math.floor(L / 60), B = L % 60;
      if (T < 60)
        return `${T}m ${B}s`;
      const E = Math.floor(T / 60), I = T % 60;
      return `${E}h ${I}m`;
    }, b = ($) => {
      const L = new Date($), T = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return L.toLocaleDateString("en-US", T);
    }, x = ($) => $[0]?.day_total_enqueued ?? 0, w = ($) => $[0]?.day_total_assigned ?? 0, D = ($) => $[0]?.day_total_closed ?? 0, S = ($) => $[0]?.day_avg_time_to_assign_seconds ?? null, C = ($) => $[0]?.day_avg_conversation_duration_seconds ?? null;
    return t({ isDark: i }), ($, L) => (_(), nt(ft, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent"
    }, Mt({
      default: P(() => [
        e.loading ? (_(), k("div", ov, [...L[0] || (L[0] = [
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
        ])])) : (_(), k("div", iv, [
          r("div", lv, [
            e.data.total_enqueued ? (_(), k("div", rv, [
              L[2] || (L[2] = r("div", { class: "card-decoration" }, null, -1)),
              r("div", cv, [
                r("div", dv, [
                  L[1] || (L[1] = r("p", { class: "card-label" }, "Total Enqueued", -1)),
                  r("p", uv, A(v(e.data.total_enqueued)), 1)
                ])
              ])
            ])) : z("", !0),
            r("div", hv, [
              L[5] || (L[5] = r("div", { class: "card-decoration" }, null, -1)),
              r("div", fv, [
                r("div", gv, [
                  L[3] || (L[3] = r("p", { class: "card-label" }, "Total Assigned", -1)),
                  r("p", pv, A(v(e.data.total_assigned)), 1)
                ]),
                r("div", mv, [
                  L[4] || (L[4] = r("p", { class: "card-label" }, "AVG time to assign", -1)),
                  r("p", bv, A(p(e.data.avg_time_to_assign_seconds)), 1)
                ])
              ])
            ]),
            r("div", vv, [
              L[8] || (L[8] = r("div", { class: "card-decoration" }, null, -1)),
              r("div", yv, [
                r("div", _v, [
                  L[6] || (L[6] = r("p", { class: "card-label" }, "Total Closed", -1)),
                  r("p", xv, A(v(e.data.total_closed)), 1)
                ]),
                r("div", kv, [
                  L[7] || (L[7] = r("p", { class: "card-label" }, "AVG time to close", -1)),
                  r("p", wv, A(p(e.data.avg_conversation_duration_seconds)), 1)
                ])
              ])
            ])
          ]),
          l.value ? (_(), k("div", Cv, [
            (_(!0), k(U, null, at(d.value, (T, B) => (_(), k("div", {
              key: B,
              class: "date-group"
            }, [
              r("div", $v, [
                r("h4", Sv, A(b(B)), 1),
                r("div", Mv, [
                  x(T) ? (_(), k("span", Dv, [
                    r("span", Av, A(v(x(T))), 1),
                    L[9] || (L[9] = bt(" Enqueued ", -1))
                  ])) : z("", !0),
                  r("span", Tv, [
                    r("span", Bv, A(v(w(T))), 1),
                    L[10] || (L[10] = bt(" Assigned ", -1)),
                    r("span", Lv, A(p(S(T))), 1)
                  ]),
                  r("span", Fv, [
                    r("span", Ev, A(v(D(T))), 1),
                    L[11] || (L[11] = bt(" Closed ", -1)),
                    r("span", Iv, A(p(C(T))), 1)
                  ])
                ])
              ]),
              r("div", Pv, [
                R(Ri, {
                  columns: f,
                  rows: m(String(B), T),
                  "row-key": "id"
                }, {
                  "cell-agentName": P(({ row: E }) => [
                    r("span", Rv, A(E.agent_name || "-"), 1)
                  ]),
                  "cell-email": P(({ row: E }) => [
                    r("span", Ov, A(E.agent_email), 1)
                  ]),
                  "cell-assigned": P(({ row: E }) => [
                    r("div", zv, [
                      r("span", Vv, A(v(Number(E.assigned_count))), 1),
                      r("span", Nv, A(p(Number(E.avg_time_to_assign_seconds))), 1)
                    ])
                  ]),
                  "cell-closed": P(({ row: E }) => [
                    r("div", Wv, [
                      r("span", Hv, A(v(Number(E.closed_count))), 1),
                      r("span", jv, A(p(Number(E.avg_conversation_duration_seconds))), 1)
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
                  class: H(["view-more-icon", { "view-more-icon-rotated": c.value[B] }]),
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
              ], 8, Yv)) : z("", !0)
            ]))), 128))
          ])) : (_(), k("div", qv, [...L[13] || (L[13] = [
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
      e.enableExport && !e.loading && l.value ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Dt), {
            variant: "inline",
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), Uv = /* @__PURE__ */ it(Kv, [["__scopeId", "data-v-339fdbaf"]]), Xv = {
  key: 0,
  class: "flex min-h-[380px] flex-1 flex-col items-center justify-center px-4"
}, Gv = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, Zv = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Qv = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Jv = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, ty = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, ey = { class: "max-w-[360px] px-4 text-center" }, ny = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, ay = /* @__PURE__ */ Q({
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
    }, d = ut(o, "theme"), { isDark: c } = ht(d), u = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, h = st({ labels: [], datasets: [] }), g = M(
      () => o.data ?? {
        channels_by_day: {},
        total_by_channel: {},
        total_conversations: 0
      }
    ), y = M(() => {
      const p = g.value.total_by_channel || {}, b = Object.values(p).reduce((x, w) => x + w, 0);
      return b === 0 ? [] : Object.entries(p).sort(([, x], [, w]) => w - x).map(([x, w]) => ({
        name: x,
        label: x.toUpperCase(),
        total: w,
        percentage: (w / b * 100).toFixed(1),
        color: u[x.toLowerCase()] || "#9ca3af"
      }));
    }), f = M(() => y.value.slice(0, 4)), m = M(() => {
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
      const w = /* @__PURE__ */ new Set();
      for (const C of Object.values(b))
        for (const $ of Object.keys(C))
          w.add($);
      const S = Array.from(w).map((C) => {
        const $ = C.toLowerCase(), L = u[$] || "#9ca3af";
        return {
          label: C.toUpperCase(),
          data: x.map((T) => b[T]?.[C] || 0),
          borderColor: L
        };
      });
      h.value = {
        labels: x.map((C) => It(C).format("MMM DD")),
        datasets: S
      };
    };
    return Pt(
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
    }, Mt({
      default: P(() => [
        r("div", {
          class: H(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", o.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          o.loading ? (_(), k("div", Xv, [
            r("div", Gv, [
              (_(), k(U, null, at(a, (x, w) => r("div", {
                key: w,
                class: H(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", s[w]]),
                style: mt({ height: `${x}%` })
              }, null, 6)), 64))
            ]),
            b[0] || (b[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading channel metrics... ", -1))
          ])) : (_(), k(U, { key: 1 }, [
            h.value.labels && h.value.labels.length ? (_(), k("section", Zv, [
              r("div", Qv, [
                R(Se, {
                  data: h.value,
                  theme: d.value
                }, null, 8, ["data", "theme"])
              ]),
              f.value.length ? (_(), k("div", {
                key: 0,
                class: H(m.value)
              }, [
                (_(!0), k(U, null, at(f.value, (x) => (_(), nt(lt, {
                  key: x.name,
                  color: x.color,
                  title: x.label,
                  value: `${x.percentage}%`,
                  subvalue: `${F(K)(x.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 2)) : z("", !0)
            ])) : y.value.length ? (_(), k("section", Jv, [
              r("div", {
                class: H(m.value)
              }, [
                (_(!0), k(U, null, at(f.value, (x) => (_(), nt(lt, {
                  key: x.name,
                  color: x.color,
                  title: x.label,
                  value: `${x.percentage}%`,
                  subvalue: `${F(K)(x.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 2)
            ])) : z("", !0),
            y.value.length ? z("", !0) : (_(), k("section", ty, [
              r("div", ey, [
                r("div", ny, [
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
      e.enableExport && !o.loading && (h.value.labels && h.value.labels.length > 0 || y.value.length > 0) ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Dt), {
            variant: "inline",
            loading: e.exportLoading,
            onExport: l
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), sy = /* @__PURE__ */ it(ay, [["__scopeId", "data-v-42aec2c8"]]), oy = {
  key: 0,
  class: "card-body"
}, iy = { class: "chart-container" }, ly = { class: "triage-table-block w-full min-w-0" }, ry = { class: "triage-row-label" }, cy = {
  key: 1,
  class: "triage-count"
}, dy = {
  key: 1,
  class: "triage-count"
}, uy = {
  key: 1,
  class: "triage-count"
}, hy = {
  key: 1,
  class: "triage-count"
}, fy = {
  key: 1,
  class: "triage-count"
}, gy = {
  key: 1,
  class: "empty-state"
}, py = { class: "empty-state-content" }, my = { class: "empty-icon-wrapper" }, by = {
  key: 1,
  class: "loading-state"
}, vy = /* @__PURE__ */ Q({
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
    }, { isDark: i, colors: l } = ht(ut(a, "theme")), d = M(() => {
      const x = a.data?.combinations || {}, w = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [D, S] of Object.entries(x)) {
        const C = D.split("+").filter(Boolean);
        if (!C.includes("triage")) continue;
        const $ = C.filter((L) => L !== "triage").length;
        $ >= 4 ? w["4p"] += Number(S) || 0 : w[$] += Number(S) || 0;
      }
      return w;
    }), c = M(() => {
      const x = d.value;
      return x[0] + x[1] + x[2] + x[3] + x["4p"] || 0;
    }), u = M(() => Object.keys(a.data?.combinations || {}).length > 0), h = M(() => {
      const x = c.value;
      if (!x) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const w = d.value;
      return {
        pct0: w[0] / x * 100,
        pct1: w[1] / x * 100,
        pct2: w[2] / x * 100,
        pct3: w[3] / x * 100,
        pct4p: w["4p"] / x * 100
      };
    }), g = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], y = M(() => {
      const x = h.value, w = d.value;
      return [
        {
          id: "pct",
          metric: "% of total",
          b0: x.pct0,
          b1: x.pct1,
          b2: x.pct2,
          b3: x.pct3,
          b4p: x.pct4p
        },
        {
          id: "count",
          metric: "Count",
          b0: w[0],
          b1: w[1],
          b2: w[2],
          b3: w[3],
          b4p: w["4p"]
        }
      ];
    }), f = {
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
    }, m = (x) => x?.replace("80", "") || "#888888", v = M(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [h.value.pct0],
          backgroundColor: f.c0,
          borderColor: m(f.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [h.value.pct1],
          backgroundColor: f.c1,
          borderColor: m(f.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [h.value.pct2],
          backgroundColor: f.c2,
          borderColor: m(f.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [h.value.pct3],
          backgroundColor: f.c3,
          borderColor: m(f.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [h.value.pct4p],
          backgroundColor: f.c4p,
          borderColor: m(f.c4p),
          borderWidth: 1
        }
      ]
    })), p = M(() => ({
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
            label: (x) => `${x.dataset.label} intent(s): ${Number(x.raw || 0).toFixed(0)}%`
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
    })), b = (x) => `${(Number(x) || 0).toFixed(0)}`;
    return t({ isDark: i }), (x, w) => (_(), nt(ft, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1
    }, Mt({
      default: P(() => [
        e.loading ? (_(), k("div", by, [...w[2] || (w[2] = [
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
        ])])) : (_(), k("div", oy, [
          u.value ? (_(), k(U, { key: 0 }, [
            r("div", iy, [
              R(he, {
                data: v.value,
                options: p.value
              }, null, 8, ["data", "options"])
            ]),
            R(lt, {
              class: "w-full min-w-0",
              title: "Total",
              value: F(K)(c.value),
              subvalue: "Conversations with triage"
            }, null, 8, ["value"]),
            r("div", ly, [
              R(qt, {
                columns: g,
                rows: y.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-metric": P(({ row: D }) => [
                  r("span", ry, A(D.metric), 1)
                ]),
                "cell-b0": P(({ row: D }) => [
                  D.id === "pct" ? (_(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: mt({ color: m(f.c0) })
                  }, A(b(Number(D.b0))) + "%", 5)) : (_(), k("span", cy, A(F(K)(Number(D.b0))), 1))
                ]),
                "cell-b1": P(({ row: D }) => [
                  D.id === "pct" ? (_(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: mt({ color: m(f.c1) })
                  }, A(b(Number(D.b1))) + "%", 5)) : (_(), k("span", dy, A(F(K)(Number(D.b1))), 1))
                ]),
                "cell-b2": P(({ row: D }) => [
                  D.id === "pct" ? (_(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: mt({ color: m(f.c2) })
                  }, A(b(Number(D.b2))) + "%", 5)) : (_(), k("span", uy, A(F(K)(Number(D.b2))), 1))
                ]),
                "cell-b3": P(({ row: D }) => [
                  D.id === "pct" ? (_(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: mt({ color: m(f.c3) })
                  }, A(b(Number(D.b3))) + "%", 5)) : (_(), k("span", hy, A(F(K)(Number(D.b3))), 1))
                ]),
                "cell-b4p": P(({ row: D }) => [
                  D.id === "pct" ? (_(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: mt({ color: m(f.c4p) })
                  }, A(b(Number(D.b4p))) + "%", 5)) : (_(), k("span", fy, A(F(K)(Number(D.b4p))), 1))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ], 64)) : (_(), k("div", gy, [
            r("div", py, [
              r("div", my, [
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
      e.enableExport && !e.loading && u.value ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Dt), {
            variant: "inline",
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), yy = /* @__PURE__ */ it(vy, [["__scopeId", "data-v-3d7375f1"]]), _y = {
  key: 0,
  class: "loading-state"
}, xy = {
  key: 1,
  class: "card-body"
}, ky = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-4 min-h-0"
}, wy = { class: "pie-section" }, Cy = {
  key: 1,
  class: "empty-state"
}, $y = /* @__PURE__ */ Q({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = ht(ut(n, "theme")), o = [
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
    }, l = (y) => i[y]?.label || y.toUpperCase(), d = M(
      () => n.data?.items && n.data.items.length > 0
    ), c = M(
      () => (n.data?.items || []).reduce((y, f) => y + f.count, 0)
    ), u = M(() => {
      const y = {};
      for (const f of n.data?.items || [])
        y[f.language] = (y[f.language] || 0) + f.count;
      return Object.entries(y).map(([f, m]) => ({ language: f, count: m })).sort((f, m) => m.count - f.count);
    }), h = M(() => ({
      labels: u.value.map((y) => l(y.language)),
      datasets: [{
        data: u.value.map((y) => y.count),
        backgroundColor: u.value.map((y, f) => o[f % o.length] + "80"),
        borderColor: u.value.map((y, f) => o[f % o.length]),
        borderWidth: 2,
        hoverOffset: 6
      }]
    })), g = M(() => ({
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
            color: s.value.textSecondary
          }
        },
        tooltip: {
          backgroundColor: s.value.tooltipBg,
          titleColor: s.value.tooltipText,
          bodyColor: s.value.tooltipText,
          borderColor: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: { family: "'Space Grotesk', sans-serif", size: 13, weight: 600 },
          bodyFont: { family: "'DM Sans', sans-serif", size: 12 },
          callbacks: {
            label: (y) => {
              const f = y.raw || 0, m = c.value > 0 ? (f / c.value * 100).toFixed(1) : "0";
              return ` ${y.label}: ${f} (${m}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: a }), (y, f) => (_(), nt(ft, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1
    }, {
      default: P(() => [
        n.loading ? (_(), k("div", _y, [...f[0] || (f[0] = [
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
        ])])) : (_(), k("div", xy, [
          d.value ? (_(), k("div", ky, [
            r("section", wy, [
              R(aa, {
                data: h.value,
                options: g.value
              }, null, 8, ["data", "options"])
            ]),
            R(lt, {
              class: "shrink-0",
              title: "Total",
              value: F(K)(c.value),
              color: "#8b5cf6"
            }, null, 8, ["value"])
          ])) : (_(), k("section", Cy, [...f[1] || (f[1] = [
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
}), Sy = /* @__PURE__ */ it($y, [["__scopeId", "data-v-020e89a6"]]), My = {
  key: 0,
  class: "loading-state"
}, Dy = {
  key: 1,
  class: "card-body"
}, Ay = {
  key: 0,
  class: "guardrails-daily-section"
}, Ty = { class: "w-full min-w-0" }, By = { class: "font-medium" }, Ly = { class: "font-semibold" }, Fy = { class: "type-badges-row" }, Ey = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, Iy = {
  key: 1,
  class: "empty-state"
}, Py = /* @__PURE__ */ Q({
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
    }, { isDark: i } = ht(ut(a, "theme")), l = M(
      () => a.data?.items && a.data.items.length > 0
    ), d = M(
      () => (a.data?.items || []).reduce((v, p) => v + p.count, 0)
    ), c = (v) => {
      const p = {};
      for (const w of a.data?.items || [])
        p[w[v]] = (p[w[v]] || 0) + w.count;
      const b = Object.entries(p).sort((w, D) => D[1] - w[1]);
      if (b.length === 0) return { name: "—", pct: 0 };
      const x = d.value;
      return {
        name: b[0][0],
        pct: x > 0 ? Math.round(b[0][1] / x * 100) : 0
      };
    }, u = M(() => c("guardrail_type")), h = M(() => c("guardrail_action")), g = M(() => c("guardrail_source")), y = M(() => {
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
    ], m = M(
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
    }, Mt({
      default: P(() => [
        a.loading ? (_(), k("div", My, [...p[0] || (p[0] = [
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
        ])])) : (_(), k("div", Dy, [
          l.value ? (_(), k(U, { key: 0 }, [
            y.value.length > 0 ? (_(), k("section", Ay, [
              r("div", Ty, [
                R(qt, {
                  columns: f,
                  rows: m.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-date": P(({ row: b }) => [
                    r("span", By, A(F(It)(String(b.date)).format("MMM DD")), 1)
                  ]),
                  "cell-count": P(({ row: b }) => [
                    r("span", Ly, A(F(K)(b.total)), 1)
                  ]),
                  "cell-types": P(({ row: b }) => [
                    r("div", Fy, [
                      (_(!0), k(U, null, at(b.types, (x) => (_(), k("span", {
                        key: x.type,
                        class: "type-count-badge"
                      }, A(x.type) + " (" + A(x.count) + ") ", 1))), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : z("", !0),
            r("section", Ey, [
              R(lt, {
                title: "Total Events",
                value: F(K)(d.value)
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
          ], 64)) : (_(), k("section", Iy, [...p[1] || (p[1] = [
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
      e.enableExport && !a.loading && l.value && y.value.length > 0 ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Dt), {
            variant: "inline",
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), Ry = /* @__PURE__ */ it(Py, [["__scopeId", "data-v-3c414be3"]]), Oy = {
  key: 0,
  class: "loading-state"
}, zy = {
  key: 1,
  class: "card-body"
}, Vy = { class: "chart-section" }, Ny = { class: "chart-wrapper" }, Wy = {
  key: 1,
  class: "empty-chart"
}, Hy = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, jy = {
  key: 0,
  class: "dn-failure-section"
}, Yy = { class: "w-full min-w-0" }, qy = { class: "failure-reason" }, Ky = { class: "failure-count" }, Uy = { class: "impact-bar-container" }, Xy = { class: "impact-label" }, Gy = { class: "dn-trend-health-block flex flex-col gap-0" }, Zy = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, Qy = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, Jy = { class: "system-health" }, t1 = { class: "system-health-content" }, e1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, n1 = {
  key: 1,
  class: "empty-state"
}, a1 = /* @__PURE__ */ Q({
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
    const a = e, s = n, o = (S) => {
      s("export", S);
    }, { isDark: i, colors: l } = ht(ut(a, "theme")), d = M(() => {
      const S = a.data?.documentCounts?.items || [], C = a.data?.processingCounts?.items || [];
      return S.length > 0 || C.length > 0;
    }), c = M(() => {
      const S = a.data?.documentCounts?.items || [];
      return {
        processing_started: S.reduce((C, $) => C + $.processing_started, 0),
        processing_completed: S.reduce((C, $) => C + $.processing_completed, 0),
        processing_failed: S.reduce((C, $) => C + $.processing_failed, 0),
        row_count_total: S.reduce((C, $) => C + $.row_count_total, 0)
      };
    }), u = M(() => {
      const S = a.data?.processingCounts?.items || [];
      return {
        processing_started: S.reduce((C, $) => C + $.processing_started, 0),
        processing_success: S.reduce((C, $) => C + $.processing_success, 0),
        notification_sent: S.reduce((C, $) => C + $.notification_sent, 0),
        notification_failed: S.reduce((C, $) => C + $.notification_failed, 0),
        dq_phone: S.reduce((C, $) => C + $.dq_error_phone_not_found, 0),
        dq_flight: S.reduce((C, $) => C + $.dq_error_flight_not_found, 0),
        dq_booking: S.reduce((C, $) => C + $.dq_error_booking_not_found, 0),
        dq_other: S.reduce((C, $) => C + $.dq_error_other, 0),
        totalDqErrors: S.reduce((C, $) => C + $.dq_error_phone_not_found + $.dq_error_flight_not_found + $.dq_error_booking_not_found + $.dq_error_other, 0)
      };
    }), h = M(() => c.value.row_count_total || u.value.processing_started), g = M(() => Math.max(0, h.value - u.value.notification_sent)), y = (S, C) => C ? `${Math.round(S / C * 100)}%` : "0%", f = M(() => {
      const S = [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].filter((C) => C.count > 0).sort((C, $) => $.count - C.count);
      return S.length > 0 ? S[0] : { reason: "None", count: 0 };
    }), m = M(() => {
      const S = h.value;
      return [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].map((C) => ({
        ...C,
        impactPct: S > 0 ? Math.round(C.count / S * 100) : 0
      }));
    }), v = [
      { key: "reason", label: "Reason", align: "left" },
      { key: "count", label: "Count", align: "center" },
      { key: "impact", label: "Impact", align: "center" }
    ], p = M(
      () => m.value.map((S) => ({
        id: S.reason,
        reason: S.reason,
        count: S.count,
        impactPct: S.impactPct
      }))
    ), b = M(() => {
      const S = h.value, C = u.value.processing_success, $ = Math.max(0, C - u.value.totalDqErrors), L = u.value.notification_sent, T = Math.max(0, S - C), B = u.value.totalDqErrors, E = Math.max(0, $ - L), I = (V, tt) => {
        const et = tt > 0 ? Math.round(V / tt * 100) : 0;
        return `${V.toLocaleString()} (${et}%)`;
      }, N = [
        { name: "Records Detected" },
        { name: "Valid Reservations" },
        { name: "Invalid / Unprocessed" },
        { name: "Contactable" },
        { name: "Data Quality Issues" },
        { name: "Notified" },
        { name: "Not Delivered" }
      ], Y = [];
      return C > 0 && Y.push({ source: "Records Detected", target: "Valid Reservations", value: C, label: I(C, S) }), T > 0 && Y.push({ source: "Records Detected", target: "Invalid / Unprocessed", value: T, label: I(T, S) }), $ > 0 && Y.push({ source: "Valid Reservations", target: "Contactable", value: $, label: I($, S) }), B > 0 && Y.push({ source: "Valid Reservations", target: "Data Quality Issues", value: B, label: I(B, S) }), L > 0 && Y.push({ source: "Contactable", target: "Notified", value: L, label: I(L, S) }), E > 0 && Y.push({ source: "Contactable", target: "Not Delivered", value: E, label: I(E, S) }), { nodes: N, links: Y };
    }), x = {
      "Records Detected": "#DBEAFE",
      "Valid Reservations": "#D1FAE5",
      "Invalid / Unprocessed": "#FEE2E2",
      Contactable: "#BBF7D0",
      "Data Quality Issues": "#FED7AA",
      Notified: "#86EFAC",
      "Not Delivered": "#FCA5A5"
    }, w = M(() => {
      const S = [...a.data?.processingCounts?.items || []].sort(
        (I, N) => new Date(I.date).getTime() - new Date(N.date).getTime()
      ), C = a.data?.documentCounts?.items || [], $ = {};
      for (const I of C)
        $[I.date] = ($[I.date] || 0) + I.row_count_total;
      const L = [.../* @__PURE__ */ new Set([...S.map((I) => I.date), ...C.map((I) => I.date)])].sort(), T = L.map((I) => It(I).format("MMM DD")), B = L.map((I) => {
        const N = S.find((tt) => tt.date === I), Y = N?.notification_sent || 0, V = $[I] || N?.processing_started || 0;
        return V > 0 ? Math.round(Y / V * 100) : 0;
      }), E = L.map((I) => S.find((Y) => Y.date === I)?.notification_sent || 0);
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
    }), D = M(() => ({
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
            label: (S) => S.datasetIndex === 0 ? ` Success Rate: ${S.raw}%` : ` Notifications: ${S.raw}`
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
            callback: (S) => `${S}%`
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
    return t({ isDark: i }), (S, C) => (_(), nt(ft, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis"
    }, Mt({
      default: P(() => [
        a.loading ? (_(), k("div", Oy, [...C[0] || (C[0] = [
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
        ])])) : (_(), k("div", zy, [
          d.value ? (_(), k(U, { key: 0 }, [
            r("section", Vy, [
              C[2] || (C[2] = r("div", { class: "chart-header" }, [
                r("h4", { class: "section-title" }, "Passenger Disruption Funnel")
              ], -1)),
              r("div", Ny, [
                b.value.nodes.length > 0 && b.value.links.length > 0 ? (_(), nt(Me, {
                  key: 0,
                  data: b.value,
                  "node-colors": x,
                  height: "350px"
                }, null, 8, ["data"])) : (_(), k("div", Wy, [...C[1] || (C[1] = [
                  r("p", { class: "empty-chart-text" }, "No processing data available for visualization", -1)
                ])]))
              ])
            ]),
            r("div", Hy, [
              R(lt, {
                color: "#3b82f6",
                title: "Total Records",
                value: F(K)(c.value.row_count_total)
              }, null, 8, ["value"]),
              R(lt, {
                color: "#8b5cf6",
                title: "Passengers Affected",
                value: F(K)(h.value)
              }, null, 8, ["value"]),
              R(lt, {
                color: "#10b981",
                title: "Successfully Notified",
                value: F(K)(u.value.notification_sent),
                subvalue: y(u.value.notification_sent, h.value)
              }, null, 8, ["value", "subvalue"]),
              R(lt, {
                color: "#ef4444",
                title: "Not Notified",
                value: F(K)(g.value),
                subvalue: y(g.value, h.value)
              }, null, 8, ["value", "subvalue"]),
              R(lt, {
                color: "#f59e0b",
                title: "Main Failure Reason",
                value: f.value.reason,
                subvalue: f.value.count > 0 ? `${F(K)(f.value.count)} cases` : void 0
              }, null, 8, ["value", "subvalue"])
            ]),
            m.value.length > 0 ? (_(), k("section", jy, [
              C[3] || (C[3] = r("div", { class: "section-header" }, [
                r("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
              ], -1)),
              r("div", Yy, [
                R(qt, {
                  columns: v,
                  rows: p.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-reason": P(({ row: $ }) => [
                    r("span", qy, A($.reason), 1)
                  ]),
                  "cell-count": P(({ row: $ }) => [
                    r("span", Ky, A(F(K)($.count)), 1)
                  ]),
                  "cell-impact": P(({ row: $ }) => [
                    r("div", Uy, [
                      r("div", {
                        class: "impact-bar",
                        style: mt({ width: $.impactPct + "%" })
                      }, null, 4),
                      r("span", Xy, A($.impactPct) + "%", 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : z("", !0),
            r("div", Gy, [
              w.value.labels.length > 0 ? (_(), k("section", Zy, [
                C[4] || (C[4] = r("div", { class: "chart-header" }, [
                  r("h4", { class: "section-title" }, "Notification Success Rate by Day")
                ], -1)),
                r("div", Qy, [
                  R(Se, {
                    data: w.value,
                    options: D.value,
                    theme: a.theme
                  }, null, 8, ["data", "options", "theme"])
                ])
              ])) : z("", !0),
              r("details", Jy, [
                C[5] || (C[5] = r("summary", { class: "system-health-toggle" }, [
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
                  bt(" System Health Details ")
                ], -1)),
                r("div", t1, [
                  r("div", e1, [
                    R(lt, {
                      title: "Docs Started",
                      value: F(K)(c.value.processing_started)
                    }, null, 8, ["value"]),
                    R(lt, {
                      title: "Docs Completed",
                      value: F(K)(c.value.processing_completed)
                    }, null, 8, ["value"]),
                    R(lt, {
                      title: "Docs Failed",
                      value: F(K)(c.value.processing_failed)
                    }, null, 8, ["value"]),
                    R(lt, {
                      title: "Processing Started",
                      value: F(K)(u.value.processing_started)
                    }, null, 8, ["value"]),
                    R(lt, {
                      title: "Processing Success",
                      value: F(K)(u.value.processing_success)
                    }, null, 8, ["value"]),
                    R(lt, {
                      title: "Notification Failed",
                      value: F(K)(u.value.notification_failed)
                    }, null, 8, ["value"])
                  ])
                ])
              ])
            ])
          ], 64)) : (_(), k("section", n1, [...C[6] || (C[6] = [
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
      e.enableExport && !a.loading && d.value ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Dt), {
            variant: "inline",
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), s1 = /* @__PURE__ */ it(a1, [["__scopeId", "data-v-88a60931"]]), o1 = {
  key: 0,
  class: "loading-state"
}, i1 = {
  key: 1,
  class: "card-body"
}, l1 = { class: "metric-value" }, r1 = /* @__PURE__ */ Q({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a } = ht(ut(n, "theme")), s = M(() => K(n.totalConversations)), o = M(
      () => n.previousTotalConversations !== null && n.previousTotalConversations !== void 0
    ), i = M(() => {
      if (!o.value) return 0;
      const c = n.previousTotalConversations;
      return c === 0 ? n.totalConversations > 0 ? 100 : 0 : (n.totalConversations - c) / c * 100;
    }), l = M(() => `${i.value > 0 ? "+" : ""}${i.value.toFixed(1)}% vs prev.`), d = M(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (c, u) => (_(), nt(ft, {
      title: "Total Conversations",
      collapsible: !1,
      class: "total-conv-metric w-full"
    }, {
      title: P(() => [...u[0] || (u[0] = [
        r("div", { class: "header-title-group" }, [
          r("div", { class: "icon-wrapper" }, [
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
          ]),
          r("span", { class: "kpi-heading-text" }, "Total Conversations")
        ], -1)
      ])]),
      headerAside: P(() => [
        !e.loading && o.value ? (_(), k("div", {
          key: 0,
          class: H(["change-badge", d.value])
        }, A(l.value), 3)) : z("", !0)
      ]),
      default: P(() => [
        r("div", {
          class: H(["highlight-inner", { "highlight-inner--dark": F(a) }])
        }, [
          e.loading ? (_(), k("div", o1, [...u[1] || (u[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (_(), k("div", i1, [
            r("span", l1, A(s.value), 1),
            u[2] || (u[2] = r("span", { class: "metric-label" }, "Total Conversations", -1))
          ]))
        ], 2)
      ]),
      _: 1
    }));
  }
}), c1 = /* @__PURE__ */ it(r1, [["__scopeId", "data-v-c937c389"]]), d1 = {
  key: 0,
  class: "loading-state"
}, u1 = {
  key: 1,
  class: "card-body"
}, h1 = { class: "metric-value" }, f1 = /* @__PURE__ */ Q({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a } = ht(ut(n, "theme")), s = M(() => `${n.csatP95.toFixed(1)}`), o = M(
      () => n.previousCsatP95 !== null && n.previousCsatP95 !== void 0
    ), i = M(() => {
      if (!o.value) return 0;
      const c = n.previousCsatP95;
      return c === 0 ? n.csatP95 > 0 ? 100 : 0 : (n.csatP95 - c) / c * 100;
    }), l = M(() => `${i.value > 0 ? "+" : ""}${i.value.toFixed(1)}% vs prev.`), d = M(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (c, u) => (_(), nt(ft, {
      title: "CSAT Metrics",
      collapsible: !1,
      class: "csat-p95-metric w-full"
    }, {
      title: P(() => [...u[0] || (u[0] = [
        r("div", { class: "header-title-group" }, [
          r("div", { class: "icon-wrapper" }, [
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
          ]),
          r("span", { class: "csat-p95-title-text" }, "CSAT Metrics")
        ], -1)
      ])]),
      headerAside: P(() => [
        !e.loading && o.value ? (_(), k("div", {
          key: 0,
          class: H(["change-badge", d.value])
        }, A(l.value), 3)) : z("", !0)
      ]),
      default: P(() => [
        r("div", {
          class: H(["csat-p95-inner", { "csat-p95-inner--dark": F(a) }])
        }, [
          e.loading ? (_(), k("div", d1, [...u[1] || (u[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (_(), k("div", u1, [
            r("span", h1, A(s.value), 1),
            u[2] || (u[2] = r("span", { class: "metric-label" }, "CSAT P95", -1))
          ]))
        ], 2)
      ]),
      _: 1
    }));
  }
}), g1 = /* @__PURE__ */ it(f1, [["__scopeId", "data-v-9b3e40a4"]]), p1 = {
  key: 0,
  class: "loading-state"
}, m1 = {
  key: 1,
  class: "card-body"
}, b1 = { class: "chart-wrapper" }, v1 = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, y1 = {
  key: 2,
  class: "empty-state"
}, _1 = 500, x1 = 60, k1 = 80, w1 = {
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
    const a = n, s = (c) => {
      a("export", c);
    }, o = e, { isDark: i } = ht(ut(o, "theme")), l = M(() => o.data), d = M(() => Math.max(600, window.innerWidth * 0.85));
    return t({ isDark: i }), (c, u) => (_(), nt(ft, {
      class: "nps-overview-root h-full min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1
    }, Mt({
      default: P(() => [
        o.loading ? (_(), k("div", p1, [...u[0] || (u[0] = [
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
        ])])) : l.value && l.value.total_nps_responses > 0 ? (_(), k("div", m1, [
          r("div", b1, [
            R(Di, {
              histogram: l.value.histogram || [],
              "min-score": l.value.min_score || 0,
              "max-score": l.value.max_score || 0,
              "q1-score": l.value.q1_score || 0,
              "median-score": l.value.median_score || 0,
              "q3-score": l.value.q3_score || 0,
              "average-score": l.value.average_score || 0,
              "chart-width": d.value,
              "chart-height": _1,
              "chart-margin": x1,
              "chart-bottom-margin": k1,
              interactive: !1
            }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score", "chart-width"])
          ]),
          r("div", v1, [
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
        ])) : (_(), k("div", y1, [...u[1] || (u[1] = [
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
      e.enableExport && !o.loading && l.value && l.value.total_nps_responses > 0 ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Dt), {
            variant: "inline",
            onExport: s,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}, Oi = /* @__PURE__ */ it(w1, [["__scopeId", "data-v-6c2c0ce6"]]), C1 = {
  key: 0,
  class: "loading-state"
}, $1 = {
  key: 1,
  class: "card-body"
}, S1 = { class: "tooltip-content" }, M1 = { class: "tooltip-title" }, D1 = { class: "tooltip-stats" }, A1 = { class: "tooltip-stat-row" }, T1 = { class: "tooltip-value" }, B1 = { class: "tooltip-stat-row" }, L1 = { class: "tooltip-value" }, F1 = { class: "tooltip-stat-row" }, E1 = { class: "tooltip-value" }, I1 = { class: "tooltip-stat-row" }, P1 = { class: "tooltip-value" }, R1 = { class: "tooltip-stat-row" }, O1 = { class: "tooltip-value" }, z1 = { class: "tooltip-stat-row" }, V1 = { class: "tooltip-value" }, N1 = { class: "mt-4 flex w-full justify-start" }, W1 = {
  key: 2,
  class: "empty-state"
}, ko = 400, an = 60, wo = 90, Co = 120, H1 = {
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
    const a = n, s = (v) => {
      a("export", v);
    }, o = e, { isDark: i } = ht(ut(o, "theme")), l = M(() => o.data), d = st(null), c = st({
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
    }), u = M(() => {
      if (!l.value || !l.value.nps_by_day) return 800;
      const v = l.value.nps_by_day.length;
      return Math.max(800, an * 2 + v * Co);
    }), h = (v, p) => {
      const x = (v - 1) / 9;
      return an + p - x * p;
    }, g = (v) => v ? It(v).format("DD-MM-YYYY") : "", y = M(() => {
      if (!l.value || !l.value.nps_by_day || l.value.nps_by_day.length === 0)
        return [];
      const v = [], p = ko - an - wo;
      return l.value.nps_by_day.forEach((b, x) => {
        const w = b.min_score || 0, D = b.q1_score || 0, S = b.median_score || 0, C = b.q3_score || 0, $ = b.max_score || 0, L = b.average_score || 0;
        v.push({
          label: g(b.date),
          responseCount: b.nps_responses_count || 0,
          isTotal: !1,
          low: w,
          q1: D,
          median: S,
          q3: C,
          high: $,
          average: L,
          highY: h($, p),
          lowY: h(w, p),
          q1Y: h(D, p),
          q3Y: h(C, p),
          medianY: h(S, p),
          averageY: L > 0 ? h(L, p) : null,
          centerX: an + (x + 1) * Co
        });
      }), v;
    }), f = (v, p) => {
      if (!d.value || !p || p.horizontal) return;
      const b = d.value.getBoundingClientRect(), x = v.clientX, w = v.clientY, D = 140, S = 160, C = 10, $ = 15;
      let L = x - b.left - D / 2, T = w - b.top - S - $;
      L = Math.max(C, Math.min(L, b.width - D - C)), T < C && (T = w - b.top + $), T = Math.max(C, Math.min(T, b.height - S - C)), c.value = {
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
    }, m = () => {
      c.value.visible = !1;
    };
    return t({ isDark: i }), (v, p) => (_(), nt(ft, {
      class: "nps-daily-root h-full min-h-0",
      title: "CSAT Daily Metrics",
      subtitle: "Daily CSAT Distribution",
      collapsible: !1
    }, Mt({
      default: P(() => [
        o.loading ? (_(), k("div", C1, [...p[0] || (p[0] = [
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
        ])])) : l.value && l.value.nps_by_day && l.value.nps_by_day.length > 0 ? (_(), k("div", $1, [
          r("div", {
            class: "chart-wrapper",
            ref_key: "chartContainerRef",
            ref: d
          }, [
            y.value && y.value.length > 0 ? (_(), nt(Mi, {
              key: 0,
              "candlestick-data": y.value,
              "chart-width": u.value,
              "chart-height": ko,
              "chart-margin": an,
              "chart-bottom-margin": wo,
              "show-legend": !0,
              rotation: 0,
              "candle-width": 30,
              onCandleHover: f,
              onCandleLeave: m
            }, null, 8, ["candlestick-data", "chart-width"])) : z("", !0),
            c.value.visible ? (_(), k("div", {
              key: 1,
              class: "tooltip-overlay",
              style: mt({
                left: `${c.value.x}px`,
                top: `${c.value.y}px`
              })
            }, [
              r("div", S1, [
                r("div", M1, A(c.value.date), 1),
                p[7] || (p[7] = r("div", { class: "tooltip-divider" }, null, -1)),
                r("div", D1, [
                  r("div", A1, [
                    p[1] || (p[1] = r("span", { class: "tooltip-label tooltip-min" }, "Min:", -1)),
                    r("span", T1, A(c.value.min), 1)
                  ]),
                  r("div", B1, [
                    p[2] || (p[2] = r("span", { class: "tooltip-label tooltip-q1" }, "Q1:", -1)),
                    r("span", L1, A(c.value.q1), 1)
                  ]),
                  r("div", F1, [
                    p[3] || (p[3] = r("span", { class: "tooltip-label tooltip-median" }, "Median:", -1)),
                    r("span", E1, A(c.value.median), 1)
                  ]),
                  r("div", I1, [
                    p[4] || (p[4] = r("span", { class: "tooltip-label tooltip-avg" }, "Avg:", -1)),
                    r("span", P1, A(c.value.avg), 1)
                  ]),
                  r("div", R1, [
                    p[5] || (p[5] = r("span", { class: "tooltip-label tooltip-q3" }, "Q3:", -1)),
                    r("span", O1, A(c.value.q3), 1)
                  ]),
                  r("div", z1, [
                    p[6] || (p[6] = r("span", { class: "tooltip-label tooltip-max" }, "Max:", -1)),
                    r("span", V1, A(c.value.max), 1)
                  ])
                ])
              ])
            ], 4)) : z("", !0)
          ], 512),
          r("div", N1, [
            R(lt, {
              title: "Days",
              value: String(l.value.nps_by_day.length),
              class: "min-w-0 w-full max-w-xs"
            }, null, 8, ["value"])
          ])
        ])) : (_(), k("div", W1, [...p[8] || (p[8] = [
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
      e.enableExport && !o.loading && l.value && l.value.nps_by_day && l.value.nps_by_day.length > 0 ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Dt), {
            variant: "inline",
            onExport: s,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}, zi = /* @__PURE__ */ it(H1, [["__scopeId", "data-v-83a30dcc"]]), j1 = { class: "nps-metrics-container" }, Y1 = {
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
    const n = t, a = (s) => {
      n("export", s);
    };
    return (s, o) => (_(), k("div", j1, [
      R(Oi, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"]),
      R(zi, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"])
    ]));
  }
}, Vi = /* @__PURE__ */ it(Y1, [["__scopeId", "data-v-25fe3b80"]]), q1 = { class: "csat-container__body" }, K1 = /* @__PURE__ */ Q({
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
    function a(s) {
      n("export", { source: "npsMetrics", format: s });
    }
    return (s, o) => (_(), nt(ft, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen
    }, {
      default: P(() => [
        r("div", q1, [
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
}), U1 = /* @__PURE__ */ it(K1, [["__scopeId", "data-v-29e9904b"]]), X1 = {
  key: 0,
  class: "loading-state"
}, G1 = {
  key: 1,
  class: "card-body"
}, Z1 = { class: "metric-value" }, Q1 = /* @__PURE__ */ Q({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a } = ht(ut(n, "theme")), s = M(() => `${n.currencyCode} ${ve(n.totalRevenue)}`), o = M(
      () => n.previousTotalRevenue !== null && n.previousTotalRevenue !== void 0
    ), i = M(() => {
      if (!o.value) return 0;
      const c = n.previousTotalRevenue;
      return c === 0 ? n.totalRevenue > 0 ? 100 : 0 : (n.totalRevenue - c) / c * 100;
    }), l = M(() => `${i.value > 0 ? "+" : ""}${i.value.toFixed(1)}% vs prev.`), d = M(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (c, u) => (_(), nt(ft, {
      title: "Total Conversations",
      collapsible: !1,
      class: "total-conv-metric w-full"
    }, {
      title: P(() => [...u[0] || (u[0] = [
        r("div", { class: "header-title-group" }, [
          r("div", { class: "icon-wrapper" }, [
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
                d: "M9.813 15.904L9 18.75l-2.407-1.204a5.97 5.97 0 01-1.593-.98l-3.5-2.625a2.25 2.25 0 010-3.602l3.5-2.625a5.97 5.97 0 011.593-.98L9 5.25l.813 2.846a2.25 2.25 0 001.341 1.457l2.846.813-2.846.813a2.25 2.25 0 00-1.341 1.457zM15.75 5.25l.537 1.879a1.5 1.5 0 00.894.975l1.879.537-1.879.537a1.5 1.5 0 00-.894.975l-.537 1.879-.537-1.879a1.5 1.5 0 00-.894-.975l-1.879-.537 1.879-.537a1.5 1.5 0 00.894-.975l.537-1.879zM18 12.75l.537 1.879a1.5 1.5 0 00.894.975l1.879.537-1.879.537a1.5 1.5 0 00-.894.975L18 19.53l-.537-1.879a1.5 1.5 0 00-.894-.975l-1.879-.537 1.879-.537a1.5 1.5 0 00.894-.975L18 12.75z"
              })
            ])
          ]),
          r("span", { class: "kpi-heading-text" }, "AI-Generated Revenue")
        ], -1)
      ])]),
      headerAside: P(() => [
        !e.loading && o.value ? (_(), k("div", {
          key: 0,
          class: H(["change-badge", d.value])
        }, A(l.value), 3)) : z("", !0)
      ]),
      default: P(() => [
        r("div", {
          class: H(["highlight-inner", { "highlight-inner--dark": F(a) }])
        }, [
          e.loading ? (_(), k("div", X1, [...u[1] || (u[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (_(), k("div", G1, [
            r("span", Z1, A(s.value), 1),
            u[2] || (u[2] = r("span", { class: "metric-label" }, "AI-Generated Revenue", -1))
          ]))
        ], 2)
      ]),
      _: 1
    }));
  }
}), J1 = /* @__PURE__ */ it(Q1, [["__scopeId", "data-v-38e48d81"]]), t_ = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, e_ = {
  key: 0,
  class: "flex min-h-[320px] flex-col items-center justify-center px-4"
}, n_ = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, a_ = {
  key: 1,
  class: "flex w-full shrink-0 flex-col min-h-0"
}, s_ = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, o_ = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, i_ = {
  key: 2,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, l_ = { class: "max-w-[360px] text-center" }, r_ = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, c_ = {
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
    const t = e, { isDark: n, colors: a } = ht(ut(t, "theme")), s = [30, 50, 70, 50, 40], o = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], i = M(() => {
      const c = t.data ?? {}, u = c.daily, h = c.days, g = Array.isArray(u) && u.length > 0, y = Array.isArray(h) && h.length > 0 && Array.isArray(c.allocatedCostSeries) && c.allocatedCostSeries.length === h.length;
      let f = [];
      return g ? f = u : y && (f = h.map((m, v) => ({
        date: m,
        allocated_cost: c.allocatedCostSeries[v] ?? 0,
        aws_cost: c.awsCostSeries[v] ?? 0,
        airline_conversations: c.airlineConversationsSeries[v] ?? 0
      }))), {
        daily: f,
        total_allocated_cost: c.total_allocated_cost ?? c.totalAllocated ?? 0,
        total_cost: c.total_cost ?? c.total ?? 0,
        total_conversations: c.total_conversations ?? c.totalConversations ?? 0,
        total_airline_conversations: c.total_airline_conversations ?? c.totalAirlineConversations ?? 0,
        airline_name: c.airline_name
      };
    }), l = M(() => {
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
    }), d = M(() => ({
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
              return c.dataset.yAxisID === "y" ? u + yt(h) : u + String(h);
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
            callback: (c) => yt(c)
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
    return (c, u) => (_(), nt(ft, {
      title: i.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1
    }, {
      default: P(() => [
        r("div", t_, [
          e.loading ? (_(), k("div", e_, [
            r("div", n_, [
              (_(), k(U, null, at(s, (h, g) => r("div", {
                key: g,
                class: H(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", o[g]]),
                style: mt({ height: `${h}%` })
              }, null, 6)), 64))
            ]),
            u[0] || (u[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading chart data... ", -1))
          ])) : i.value.daily.length > 0 ? (_(), k("div", a_, [
            r("div", s_, [
              R(Se, {
                class: "h-full min-h-0 w-full",
                data: l.value,
                options: d.value
              }, null, 8, ["data", "options"])
            ]),
            r("div", o_, [
              R(lt, {
                color: F(a).primaryLight,
                title: "Total Allocated",
                value: F(yt)(i.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              R(lt, {
                color: "#FF9900",
                title: "Total AWS",
                value: F(yt)(i.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (_(), k("section", i_, [
            r("div", l_, [
              r("div", r_, [
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
}, d_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, u_ = {
  key: 0,
  class: "card-body"
}, h_ = {
  key: 0,
  class: "chart-section"
}, f_ = { class: "chart-container" }, g_ = { class: "mt-auto grid grid-cols-2 gap-3 sm:grid-cols-3 max-[768px]:gap-2" }, p_ = {
  key: 1,
  class: "empty-state"
}, m_ = { class: "empty-state-content" }, b_ = { class: "empty-icon-wrapper" }, v_ = {
  key: 1,
  class: "loading-state"
}, sn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", $o = 10, y_ = /* @__PURE__ */ Q({
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
    const a = e, { isDark: s, colors: o } = ht(ut(a, "theme")), i = (f) => {
      const m = new Date(f), v = String(m.getDate()).padStart(2, "0"), p = String(m.getMonth() + 1).padStart(2, "0");
      return `${v}-${p}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, d = M(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((m, v) => m + (v.input_cost || 0), 0);
    }), c = M(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((m, v) => m + (v.output_cost || 0), 0);
    }), u = M(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((m, v) => m + (v.cache_read_cost || 0), 0);
    }), h = M(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((m, v) => m + (v.cache_write_cost || 0), 0);
    }), g = M(() => {
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
    }), y = M(() => a.options ? a.options : {
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
              family: sn,
              size: 13,
              weight: "500"
            },
            color: o.value.textSecondary,
            padding: 12,
            boxWidth: $o,
            boxHeight: $o,
            usePointStyle: !1
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: o.value.tooltipBg,
          titleColor: o.value.tooltipText,
          bodyColor: o.value.tooltipText,
          borderColor: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            family: sn,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: sn,
            size: 12,
            weight: "500"
          },
          callbacks: {
            label: function(f) {
              let m = f.dataset.label || "";
              return m && (m += ": "), f.parsed.y !== null && (m += yt(f.parsed.y)), m;
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
            font: { family: sn, size: 12, weight: "500" },
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
            font: { family: sn, size: 12, weight: "500" },
            color: o.value.textSecondary,
            padding: 8,
            callback: function(f) {
              return yt(f);
            }
          }
        }
      }
    });
    return t({ isDark: s }), (f, m) => (_(), nt(ft, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1
    }, {
      default: P(() => [
        r("div", d_, [
          e.loading ? (_(), k("div", v_, [...m[2] || (m[2] = [
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
          ])])) : (_(), k("div", u_, [
            g.value.labels && g.value.labels.length ? (_(), k("section", h_, [
              r("div", f_, [
                R(he, {
                  data: g.value,
                  options: y.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              r("footer", g_, [
                R(lt, {
                  title: "Total Cost",
                  value: F(yt)(e.data.total_cost)
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
                  value: F(yt)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (_(), k("section", p_, [
              r("div", m_, [
                r("div", b_, [
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
}), __ = /* @__PURE__ */ it(y_, [["__scopeId", "data-v-39a5448c"]]), x_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, k_ = {
  key: 0,
  class: "card-body"
}, w_ = {
  key: 0,
  class: "chart-section"
}, C_ = { class: "chart-container" }, $_ = { class: "mt-auto flex w-full min-w-0 flex-nowrap items-stretch gap-2 sm:gap-3" }, S_ = {
  key: 1,
  class: "empty-state"
}, M_ = { class: "empty-state-content" }, D_ = { class: "empty-icon-wrapper" }, A_ = {
  key: 1,
  class: "loading-state"
}, on = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", So = 10, T_ = /* @__PURE__ */ Q({
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
    const a = e, { isDark: s, colors: o } = ht(ut(a, "theme")), i = (u) => {
      const h = new Date(u), g = String(h.getDate()).padStart(2, "0"), y = String(h.getMonth() + 1).padStart(2, "0");
      return `${g}-${y}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, d = M(() => {
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
    }), c = M(() => a.options ? a.options : {
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
              family: on,
              size: 13,
              weight: "500"
            },
            color: o.value.textSecondary,
            padding: 12,
            boxWidth: So,
            boxHeight: So,
            usePointStyle: !1
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: o.value.tooltipBg,
          titleColor: o.value.tooltipText,
          bodyColor: o.value.tooltipText,
          borderColor: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            family: on,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: on,
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
            font: { family: on, size: 12, weight: "500" },
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
            font: { family: on, size: 12, weight: "500" },
            color: o.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: s }), (u, h) => (_(), nt(ft, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1
    }, {
      default: P(() => [
        r("div", x_, [
          e.loading ? (_(), k("div", A_, [...h[2] || (h[2] = [
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
          ])])) : (_(), k("div", k_, [
            d.value.labels && d.value.labels.length ? (_(), k("section", w_, [
              r("div", C_, [
                R(he, {
                  data: d.value,
                  options: c.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              r("footer", $_, [
                R(lt, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: F(K)(e.data.total_tokens)
                }, null, 8, ["value"]),
                R(lt, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: F(K)(e.data.total_input_tokens),
                  color: l.input
                }, null, 8, ["value", "color"]),
                R(lt, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: F(K)(e.data.total_output_tokens),
                  color: l.output
                }, null, 8, ["value", "color"]),
                R(lt, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: F(K)(e.data.total_cache_read_tokens),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                R(lt, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: F(K)(e.data.total_cache_write_tokens),
                  color: l.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (_(), k("section", S_, [
              r("div", M_, [
                r("div", D_, [
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
}), B_ = /* @__PURE__ */ it(T_, [["__scopeId", "data-v-70c6f3c7"]]), L_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, F_ = {
  key: 0,
  class: "card-body"
}, E_ = {
  key: 0,
  class: "chart-section"
}, I_ = { class: "chart-container" }, P_ = { class: "mt-4 w-full min-w-0" }, R_ = {
  key: 1,
  class: "empty-state"
}, O_ = { class: "empty-state-content" }, z_ = { class: "empty-icon-wrapper" }, V_ = {
  key: 1,
  class: "loading-state"
}, N_ = /* @__PURE__ */ Q({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = ht(ut(n, "theme")), o = (c) => {
      const u = new Date(c), h = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = M(
      () => K(n.data?.total_conversations ?? 0)
    ), l = M(() => {
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
    }), d = M(() => n.options ? n.options : {
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
            color: s.value.textSecondary,
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
          backgroundColor: s.value.tooltipBg,
          titleColor: s.value.tooltipText,
          bodyColor: s.value.tooltipText,
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
          grid: { color: s.value.gridLines, lineWidth: 1, drawTicks: !1 },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: s.value.textSecondary,
            padding: 8
          }
        },
        y: {
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: s.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: s.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: a }), (c, u) => (_(), nt(ft, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1
    }, {
      default: P(() => [
        r("div", L_, [
          e.loading ? (_(), k("div", V_, [...u[2] || (u[2] = [
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
          ])])) : (_(), k("div", F_, [
            l.value.labels && l.value.labels.length ? (_(), k("section", E_, [
              r("div", I_, [
                R(Se, {
                  data: l.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ]),
              r("div", P_, [
                R(lt, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (_(), k("section", R_, [
              r("div", O_, [
                r("div", z_, [
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
}), W_ = /* @__PURE__ */ it(N_, [["__scopeId", "data-v-b33e8627"]]), H_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, j_ = {
  key: 0,
  class: "card-body"
}, Y_ = {
  key: 0,
  class: "charts-grid"
}, q_ = { class: "chart-section" }, K_ = { class: "chart-container" }, U_ = { class: "chart-section" }, X_ = { class: "chart-container" }, G_ = {
  key: 1,
  class: "empty-state"
}, Z_ = { class: "empty-state-content" }, Q_ = { class: "empty-icon-wrapper" }, J_ = {
  key: 1,
  class: "loading-state"
}, tx = /* @__PURE__ */ Q({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = ht(ut(n, "theme")), o = M(() => n.data?.top_agents && n.data.top_agents.length > 0), i = M(() => n.data?.top_agents ? [...n.data.top_agents].sort((g, y) => (y.total_cost || 0) - (g.total_cost || 0)) : []), l = M(() => n.data?.top_agents ? [...n.data.top_agents].sort((g, y) => (y.total_tokens || 0) - (g.total_tokens || 0)) : []), d = M(() => {
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
    }), c = M(() => {
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
    }), u = M(() => n.options ? n.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !1
        },
        tooltip: {
          enabled: !0,
          backgroundColor: s.value.tooltipBg,
          titleColor: s.value.tooltipText,
          bodyColor: s.value.tooltipText,
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
            color: s.value.textSecondary,
            padding: 8
          }
        },
        y: {
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: s.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: s.value.textSecondary,
            padding: 8,
            callback: function(g) {
              return yt(g);
            }
          }
        }
      }
    }), h = M(() => n.options ? n.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !1
        },
        tooltip: {
          enabled: !0,
          backgroundColor: s.value.tooltipBg,
          titleColor: s.value.tooltipText,
          bodyColor: s.value.tooltipText,
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
            color: s.value.textSecondary,
            padding: 8
          }
        },
        y: {
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: s.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: s.value.textSecondary,
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
        r("div", H_, [
          e.loading ? (_(), k("div", J_, [...y[4] || (y[4] = [
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
          ])])) : (_(), k("div", j_, [
            o.value ? (_(), k("div", Y_, [
              r("section", q_, [
                y[0] || (y[0] = r("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                r("div", K_, [
                  R(he, {
                    data: d.value,
                    options: u.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              r("section", U_, [
                y[1] || (y[1] = r("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                r("div", X_, [
                  R(he, {
                    data: c.value,
                    options: h.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (_(), k("section", G_, [
              r("div", Z_, [
                r("div", Q_, [
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
}), ex = /* @__PURE__ */ it(tx, [["__scopeId", "data-v-a5014772"]]), nx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, ax = {
  key: 0,
  class: "card-body"
}, sx = {
  key: 0,
  class: "chart-section"
}, ox = { class: "chart-container" }, ix = {
  key: 1,
  class: "empty-state"
}, lx = { class: "empty-state-content" }, rx = { class: "empty-icon-wrapper" }, cx = {
  key: 1,
  class: "loading-state"
}, dx = /* @__PURE__ */ Q({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = ht(ut(n, "theme")), o = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, i = M(() => n.data?.top_agents ? n.data.top_agents.filter(
      (h) => h.agent_type?.toLowerCase() !== "triage"
    ) : []), l = M(() => i.value.length > 0), d = M(() => i.value.reduce((h, g) => h + (g.conversations || 0), 0)), c = M(() => {
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
    }), u = M(() => n.options ? n.options : {
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
            color: s.value.textSecondary,
            usePointStyle: !0,
            padding: 16,
            boxWidth: 8,
            boxHeight: 8
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: s.value.tooltipBg,
          titleColor: s.value.tooltipText,
          bodyColor: s.value.tooltipText,
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
        r("div", nx, [
          e.loading ? (_(), k("div", cx, [...g[2] || (g[2] = [
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
          ])])) : (_(), k("div", ax, [
            l.value ? (_(), k("section", sx, [
              r("div", ox, [
                R(aa, {
                  data: c.value,
                  options: u.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (_(), k("section", ix, [
              r("div", lx, [
                r("div", rx, [
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
}), ux = /* @__PURE__ */ it(dx, [["__scopeId", "data-v-14445b91"]]), hx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, fx = {
  key: 0,
  class: "card-body"
}, gx = {
  key: 0,
  class: "chart-section"
}, px = { class: "chart-container" }, mx = {
  key: 1,
  class: "empty-state"
}, bx = { class: "empty-state-content" }, vx = { class: "empty-icon-wrapper" }, yx = {
  key: 1,
  class: "loading-state"
}, _x = /* @__PURE__ */ Q({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = ht(ut(n, "theme")), o = (c) => {
      const u = new Date(c), h = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = M(() => {
      const c = n.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(c) && c.length > 0)
        return !0;
      const u = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {};
      return Object.keys(u).length > 0 && Object.keys(h).length > 0;
    }), l = M(() => {
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
    }), d = M(() => n.options ? n.options : {
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
            color: s.value.textSecondary,
            padding: 12,
            boxWidth: 40,
            boxHeight: 12,
            borderRadius: 4,
            usePointStyle: !1
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: s.value.tooltipBg,
          titleColor: s.value.tooltipText,
          bodyColor: s.value.tooltipText,
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
              return u && (u += ": "), c.parsed.y !== null && (u += yt(c.parsed.y)), u;
            }
          }
        }
      },
      scales: {
        x: {
          border: { display: !1 },
          grid: { color: s.value.gridLines, lineWidth: 1, drawTicks: !1 },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: s.value.textSecondary,
            padding: 8
          }
        },
        y: {
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: s.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: s.value.textSecondary,
            padding: 8,
            callback: function(c) {
              return yt(c);
            }
          }
        }
      }
    });
    return t({ isDark: a }), (c, u) => (_(), nt(ft, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1
    }, {
      default: P(() => [
        r("div", hx, [
          e.loading ? (_(), k("div", yx, [...u[2] || (u[2] = [
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
          ])])) : (_(), k("div", fx, [
            i.value ? (_(), k("section", gx, [
              r("div", px, [
                R(Se, {
                  data: l.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (_(), k("section", mx, [
              r("div", bx, [
                r("div", vx, [
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
}), xx = /* @__PURE__ */ it(_x, [["__scopeId", "data-v-1e8204ea"]]);
function Nt() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const kx = { class: "tabs text-sm" }, wx = ["aria-label"], Cx = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], $x = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, Sx = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = st([]), o = `tabs-${Nt()}`, i = (f) => `${o}-tab-${f}`, l = M(
      () => n.items.map((f, m) => f.disabled ? -1 : m).filter((f) => f >= 0)
    );
    function d(f) {
      return f.value === n.modelValue;
    }
    function c(f) {
      const m = d(f), p = `${n.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-full min-h-0 cursor-pointer rounded-lg border border-transparent text-center outline-none transition-[background-color,color,box-shadow,opacity,transform] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return f.disabled ? `${p} cursor-not-allowed opacity-40` : m ? `${p} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${p} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function u(f, m) {
      f === m || n.items.find((p) => p.value === f)?.disabled || (a("update:modelValue", f), a("change", { value: f, previousValue: m }));
    }
    function h(f, m) {
      a("tab-click", { value: f.value, originalEvent: m }), !f.disabled && (u(f.value, n.modelValue), Lt(() => {
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
      !b || b.disabled || (u(b.value, n.modelValue), await Lt(), s.value[p]?.focus());
    }
    return (f, m) => (_(), k("div", kx, [
      r("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: H([
          "box-border h-10 flex-wrap items-stretch gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 p-0.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (_(!0), k(U, null, at(e.items, (v, p) => (_(), k("button", {
          id: i(v.value),
          key: v.value,
          ref_for: !0,
          ref_key: "tabRefs",
          ref: s,
          type: "button",
          role: "tab",
          "aria-selected": d(v),
          "aria-disabled": v.disabled === !0,
          tabindex: d(v) ? 0 : -1,
          class: H(c(v)),
          onClick: (b) => h(v, b),
          onKeydown: (b) => y(b, p)
        }, [
          r("span", {
            class: H(["flex h-full min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            v.icon ? (_(), nt(je(v.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : z("", !0),
            r("span", $x, A(v.label), 1)
          ], 2)
        ], 42, Cx))), 128))
      ], 10, wx),
      f.$slots.default ? (_(), nt(un, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: P(() => [
          (_(), k("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            kt(f.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : z("", !0)
    ]));
  }
}), Ni = /* @__PURE__ */ it(Sx, [["__scopeId", "data-v-0cc67b12"]]), Mx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Dx = {
  key: 0,
  class: "loading-state"
}, Ax = {
  key: 1,
  class: "card-body"
}, Tx = {
  key: 0,
  class: "model-usage-table-block"
}, Bx = { class: "w-full min-w-0" }, Lx = {
  key: 1,
  class: "empty-state"
}, Fx = { class: "empty-state-content" }, Ex = { class: "empty-icon-wrapper" }, Ix = /* @__PURE__ */ Q({
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
    }, { isDark: i } = ht(ut(a, "theme")), l = [
      { value: "by_model", label: "Model" },
      { value: "by_provider", label: "Provider" }
    ], d = st("by_model"), c = M(() => d.value === "by_model" ? a.data?.total_by_model || {} : a.data?.total_by_provider || {}), u = M(() => [
      { key: "name", label: d.value === "by_model" ? "Model" : "Provider", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ]), h = M(
      () => Object.entries(c.value).map(([f, m]) => ({
        id: f,
        name: f,
        avgCost: y(m.avg_cost_per_message),
        avgTokens: g(m.avg_tokens_per_message),
        messageCount: g(m.message_count),
        totalCost: y(m.total_cost),
        totalTokens: g(m.total_tokens)
      }))
    ), g = (f) => f == null ? "0" : K(f), y = (f) => f == null ? "$0.00" : yt(f);
    return t({ isDark: i }), (f, m) => (_(), nt(ft, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1
    }, Mt({
      default: P(() => [
        r("div", Mx, [
          e.loading ? (_(), k("div", Dx, [...m[1] || (m[1] = [
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
          ])])) : (_(), k("div", Ax, [
            R(Ni, {
              modelValue: d.value,
              "onUpdate:modelValue": m[0] || (m[0] = (v) => d.value = v),
              items: l,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: P(() => [
                c.value && Object.keys(c.value).length > 0 ? (_(), k("div", Tx, [
                  r("div", Bx, [
                    R(qt, {
                      columns: u.value,
                      rows: h.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (_(), k("div", Lx, [
                  r("div", Fx, [
                    r("div", Ex, [
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
      e.enableExport && !e.loading && c.value && Object.keys(c.value).length > 0 ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Dt), {
            variant: "inline",
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), Px = /* @__PURE__ */ it(Ix, [["__scopeId", "data-v-c4ed8ee5"]]), Rx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Ox = {
  key: 0,
  class: "loading-state"
}, zx = {
  key: 1,
  class: "card-body"
}, Vx = {
  key: 0,
  class: "message-roles-table-block"
}, Nx = { class: "w-full min-w-0" }, Wx = {
  key: 1,
  class: "empty-state"
}, Hx = { class: "empty-state-content" }, jx = { class: "empty-icon-wrapper" }, Yx = /* @__PURE__ */ Q({
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
    }, { isDark: i } = ht(ut(a, "theme")), l = ["assistant", "system", "user"], d = [
      { key: "role", label: "Role", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ], c = M(() => a.data?.total_by_role || {}), u = M(
      () => l.map((m) => ({
        id: m,
        role: f(m),
        avgCost: y(c.value[m]?.avg_cost_per_message),
        avgTokens: g(c.value[m]?.avg_tokens_per_message),
        messageCount: g(c.value[m]?.message_count),
        totalCost: y(c.value[m]?.total_cost),
        totalTokens: g(c.value[m]?.total_tokens)
      }))
    ), h = M(() => Object.keys(c.value).length > 0), g = (m) => m == null ? "0" : K(m), y = (m) => m == null ? "$0.00" : yt(m), f = (m) => m.charAt(0).toUpperCase() + m.slice(1);
    return t({ isDark: i }), (m, v) => (_(), nt(ft, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1
    }, Mt({
      default: P(() => [
        r("div", Rx, [
          e.loading ? (_(), k("div", Ox, [...v[0] || (v[0] = [
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
          ])])) : (_(), k("div", zx, [
            h.value ? (_(), k("div", Vx, [
              r("div", Nx, [
                R(qt, {
                  columns: d,
                  rows: u.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (_(), k("div", Wx, [
              r("div", Hx, [
                r("div", jx, [
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
      e.enableExport && !e.loading && h.value ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Dt), {
            variant: "inline",
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), qx = /* @__PURE__ */ it(Yx, [["__scopeId", "data-v-d58c5538"]]), Kx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Ux = {
  key: 0,
  class: "card-body"
}, Xx = {
  key: 0,
  class: "chart-section"
}, Gx = { class: "chart-container" }, Zx = { class: "kpi-grid" }, Qx = {
  key: 1,
  class: "empty-state"
}, Jx = { class: "empty-state-content" }, tk = { class: "empty-icon-wrapper" }, ek = {
  key: 1,
  class: "loading-state"
}, nk = /* @__PURE__ */ Q({
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
    }, { isDark: i, colors: l } = ht(ut(a, "theme")), d = {
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
      for (const [w, D] of Object.entries(d))
        if (x.includes(w))
          return D;
      return "#9ca3af";
    }, g = M(() => [...a.data?.top_agents || []].sort((x, w) => w.avg_cost_per_conversation - x.avg_cost_per_conversation)), y = M(() => a.data?.total_conversations !== void 0 ? Number(a.data.total_conversations) || 0 : g.value.reduce((b, x) => b + x.conversations, 0)), f = M(() => a.data?.total_cost !== void 0 ? Number(a.data.total_cost) || 0 : g.value.reduce((b, x) => b + x.total_cost, 0)), m = M(() => a.data?.overall_avg_cost_per_conversation !== void 0 ? Number(a.data.overall_avg_cost_per_conversation) || 0 : y.value === 0 ? 0 : f.value / y.value), v = M(() => {
      const b = g.value;
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const x = b.map((S) => u(S)), w = b.map((S) => S.avg_cost_per_conversation), D = b.map((S) => h(S));
      return {
        labels: x,
        datasets: [
          {
            label: "USD per conversation",
            data: w,
            backgroundColor: D.map((S) => `${S}80`),
            borderColor: D,
            borderWidth: 1
          }
        ]
      };
    }), p = M(() => a.options ? a.options : {
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
                `Conversations: ${K(x.conversations)}`,
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
            callback: function(b) {
              return yt(b);
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
    return t({ isDark: i }), (b, x) => (_(), nt(ft, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1
    }, Mt({
      default: P(() => [
        r("div", Kx, [
          e.loading ? (_(), k("div", ek, [...x[2] || (x[2] = [
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
          ])])) : (_(), k("div", Ux, [
            v.value.labels && v.value.labels.length ? (_(), k("section", Xx, [
              r("div", Gx, [
                R(he, {
                  data: v.value,
                  options: p.value
                }, null, 8, ["data", "options"])
              ]),
              r("footer", Zx, [
                R(F(lt), {
                  title: "Total Agents",
                  value: String(g.value.length)
                }, null, 8, ["value"]),
                R(F(lt), {
                  title: "Total Conversations",
                  value: F(K)(y.value)
                }, null, 8, ["value"]),
                R(F(lt), {
                  title: "Total Cost",
                  value: F(yt)(f.value)
                }, null, 8, ["value"]),
                R(F(lt), {
                  title: "Avg Cost / Conv.",
                  value: F(yt)(m.value)
                }, null, 8, ["value"])
              ])
            ])) : (_(), k("section", Qx, [
              r("div", Jx, [
                r("div", tk, [
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
      e.enableExport && !e.loading && v.value.labels && v.value.labels.length ? {
        name: "headerExport",
        fn: P(() => [
          R(F(Dt), {
            variant: "inline",
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), ak = /* @__PURE__ */ it(nk, [["__scopeId", "data-v-34ff88cf"]]);
function sk(e, t) {
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
function ok(e, t) {
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
const ik = ["aria-label"], lk = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, rk = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, ck = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, dk = ["aria-label", "aria-expanded", "aria-controls", "onClick"], uk = { class: "truncate" }, hk = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, fk = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, gk = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, pk = ["aria-label", "onClick"], mk = ["aria-label", "onClick"], bk = ["aria-label"], vk = ["aria-label"], yk = {
  key: 1,
  class: "space-y-2"
}, _k = ["for"], xk = ["id", "placeholder", "onKeydown"], kk = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, wk = ["aria-label"], Ck = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, $k = ["checked", "onChange"], Sk = { class: "min-w-0 flex-1" }, Mk = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, Dk = { class: "flex flex-wrap items-end gap-2" }, Ak = { class: "min-w-[120px] flex-1" }, Tk = ["for"], Bk = ["id"], Lk = { class: "min-w-[120px] flex-1" }, Fk = ["for"], Ek = ["id"], Ik = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = Qn(), i = `${`kiut-filters-${Nt()}`}-panel`, l = st(null), d = /* @__PURE__ */ new Map(), c = st(null), u = st(!1), h = st({}), g = st(null), y = st(""), f = st([]), m = st(""), v = st(""), p = M(() => c.value ? n.filterDefinitions.find((O) => O.id === c.value) ?? null : null), b = M(() => {
      const O = p.value;
      if (O)
        return O.type === "text" ? y.value : O.type === "select" ? f.value : { start: m.value, end: v.value };
    });
    function x(O, W) {
      W && W instanceof HTMLElement ? d.set(O, W) : d.delete(O);
    }
    function w(O) {
      return n.modelValue[O];
    }
    function D(O) {
      if (O == null) return [];
      if (Array.isArray(O))
        return O.filter((W) => typeof W == "string" && W.trim() !== "");
      if (typeof O == "string") {
        const W = O.trim();
        return W ? [W] : [];
      }
      return [];
    }
    function S(O, W) {
      if (W == null) return !0;
      if (O.type === "text") return String(W).trim() === "";
      if (O.type === "select") return D(W).length === 0;
      if (O.type === "dateRange") {
        const J = W;
        return !J?.start?.trim() || !J?.end?.trim();
      }
      return !0;
    }
    const C = M(
      () => n.filterDefinitions.some((O) => !S(O, w(O.id)))
    ), $ = M(() => {
      const O = [];
      for (const W of n.filterDefinitions) {
        const J = w(W.id);
        if (!S(W, J)) {
          if (W.type === "text")
            O.push({ kind: "text", def: W, key: W.id });
          else if (W.type === "dateRange")
            O.push({ kind: "dateRange", def: W, key: W.id });
          else if (W.type === "select")
            for (const pt of D(J))
              O.push({
                kind: "select",
                def: W,
                optionValue: pt,
                key: `${W.id}::${pt}`
              });
        }
      }
      return O;
    });
    function L(O) {
      return O.type !== "select" ? 0 : D(w(O.id)).length;
    }
    function T(O) {
      const W = w(O.id), J = O.label.replace(/^\+\s*/, "");
      if (O.type === "text") return `${J}: ${String(W ?? "").trim()}`;
      if (O.type === "select") {
        const ji = D(W).map((ts) => O.options.find((Yi) => Yi.value === ts)?.label ?? ts);
        return `${J}: ${ji.join(", ")}`;
      }
      const pt = W, Yt = E(pt.start), me = E(pt.end);
      return `${J}: ${Yt} – ${me}`;
    }
    function B(O) {
      return O.kind === "text" || O.kind === "dateRange" ? T(O.def) : O.def.options.find((J) => J.value === O.optionValue)?.label ?? O.optionValue;
    }
    function E(O) {
      if (!O) return "";
      const W = It(O, "YYYY-MM-DD", !0);
      return W.isValid() ? W.format("L") : O;
    }
    function I(O) {
      const W = c.value === O.id && u.value, J = !S(O, w(O.id));
      return W || J ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function N(O) {
      return S(O, w(O.id)) ? ee(O) : `Editar filtro ${O.label.replace(/^\+\s*/, "")}`;
    }
    function Y(O) {
      const W = w(O.id);
      if (O.type === "text") {
        y.value = W != null ? String(W) : "";
        return;
      }
      if (O.type === "select") {
        f.value = [...D(W)];
        return;
      }
      const J = W;
      m.value = J?.start?.trim() ?? "", v.value = J?.end?.trim() ?? "";
    }
    function V() {
      const O = p.value;
      if (!O || O.type !== "select") return;
      const W = { ...n.modelValue };
      f.value.length === 0 ? delete W[O.id] : W[O.id] = [...f.value], a("update:modelValue", W), a("change", W);
    }
    function tt(O) {
      const W = f.value.indexOf(O);
      W >= 0 ? f.value = f.value.filter((J, pt) => pt !== W) : f.value = [...f.value, O], V();
    }
    function et(O) {
      if (!O) return;
      g.value = O;
      const W = O.getBoundingClientRect(), J = 300;
      let pt = W.left;
      const Yt = window.innerWidth - J - 12;
      pt > Yt && (pt = Math.max(12, Yt)), pt < 12 && (pt = 12);
      const me = W.bottom + 8;
      h.value = {
        top: `${me}px`,
        left: `${pt}px`,
        width: `${Math.min(J, window.innerWidth - 24)}px`
      };
    }
    function rt(O, W) {
      if (c.value === O.id && u.value) {
        X();
        return;
      }
      u.value && c.value !== O.id && X(), c.value = O.id, u.value = !0, Y(O), Lt().then(async () => {
        et(W.currentTarget), await Lt(), q();
      });
    }
    function G(O, W) {
      if (c.value === O.id && u.value) {
        X();
        return;
      }
      u.value && c.value !== O.id && X(), c.value = O.id, u.value = !0, Y(O), Lt().then(async () => {
        const J = d.get(O.id) ?? W.currentTarget;
        et(J), await Lt(), q();
      });
    }
    function q() {
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
      const W = p.value;
      if (!W) return;
      if (W.type === "text") {
        y.value = O != null ? String(O) : "";
        return;
      }
      if (W.type === "select") {
        f.value = Array.isArray(O) ? O.filter((pt) => typeof pt == "string") : D(O);
        return;
      }
      const J = O;
      m.value = J?.start?.trim() ?? "", v.value = J?.end?.trim() ?? "";
    }
    function X() {
      const O = p.value;
      if (!O) return;
      if (O.type === "text") {
        const Yt = y.value.trim(), me = { ...n.modelValue };
        Yt === "" ? delete me[O.id] : me[O.id] = Yt, a("update:modelValue", me), a("change", me), j();
        return;
      }
      if (O.type === "select") {
        V(), j();
        return;
      }
      const W = m.value.trim(), J = v.value.trim(), pt = { ...n.modelValue };
      !W || !J || W > J ? delete pt[O.id] : pt[O.id] = { start: W, end: J }, a("update:modelValue", pt), a("change", pt), j();
    }
    function ct(O) {
      const W = { ...n.modelValue };
      delete W[O], a("update:modelValue", W), a("change", W), c.value === O && j();
    }
    function gt(O) {
      if (O.kind === "text" || O.kind === "dateRange") {
        ct(O.def.id);
        return;
      }
      const W = { ...n.modelValue }, pt = D(W[O.def.id]).filter((Yt) => Yt !== O.optionValue);
      pt.length === 0 ? delete W[O.def.id] : W[O.def.id] = pt, a("update:modelValue", W), a("change", W), c.value === O.def.id && Y(O.def);
    }
    function Z() {
      const O = {};
      a("update:modelValue", O), a("change", O), j();
    }
    const Ct = M(() => {
      const O = p.value;
      return O ? `Editar filtro: ${O.label}` : "Filtro";
    });
    function St(O) {
      const W = O.def.label.replace(/^\+\s*/, "");
      return O.kind === "select" ? `Quitar ${O.def.options.find((Yt) => Yt.value === O.optionValue)?.label ?? O.optionValue} del filtro ${W}` : `Quitar filtro ${W}`;
    }
    function Bt(O) {
      const W = O.def.label.replace(/^\+\s*/, "");
      if (O.kind === "select") {
        const pt = O.def.options.find((Yt) => Yt.value === O.optionValue)?.label ?? O.optionValue;
        return `Editar filtro ${W}: ${pt}`;
      }
      return `Editar filtro ${W}`;
    }
    function ee(O) {
      return `Añadir filtro ${O.label.replace(/^\+\s*/, "")}`;
    }
    const oa = M(() => n.clearLabel);
    function Za(O) {
      if (!u.value || !l.value) return;
      const W = O.target;
      if (!(l.value.contains(W) || (W instanceof Element ? W : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const pt of d.values())
          if (pt?.contains(W)) return;
        X();
      }
    }
    function Qa(O) {
      O.key === "Escape" && u.value && (O.preventDefault(), j());
    }
    function Ja() {
      !u.value || !g.value || et(g.value);
    }
    return te(() => {
      document.addEventListener("mousedown", Za, !0), window.addEventListener("keydown", Qa, !0), window.addEventListener("resize", Ja);
    }), Fo(() => {
      document.removeEventListener("mousedown", Za, !0), window.removeEventListener("keydown", Qa, !0), window.removeEventListener("resize", Ja);
    }), Pt(
      () => n.modelValue,
      () => {
        const O = p.value;
        O && u.value && !s.panel && Y(O);
      },
      { deep: !0 }
    ), (O, W) => (_(), k("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      r("div", lk, [
        r("span", rk, A(e.label), 1),
        r("div", ck, [
          (_(!0), k(U, null, at(e.filterDefinitions, (J) => (_(), k("button", {
            key: `pill-${J.id}`,
            ref_for: !0,
            ref: (pt) => x(J.id, pt),
            type: "button",
            class: H(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", I(J)]),
            "aria-label": N(J),
            "aria-expanded": c.value === J.id,
            "aria-haspopup": !0,
            "aria-controls": c.value === J.id ? i : void 0,
            onClick: (pt) => G(J, pt)
          }, [
            R(F(sk), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            r("span", uk, A(J.label), 1),
            J.type === "select" && L(J) > 0 ? (_(), k("span", hk, A(L(J)), 1)) : z("", !0)
          ], 10, dk))), 128))
        ])
      ]),
      C.value ? (_(), k("div", fk, [
        r("div", gk, [
          (_(!0), k(U, null, at($.value, (J) => (_(), k("div", {
            key: J.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            r("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": Bt(J),
              onClick: (pt) => rt(J.def, pt)
            }, [
              kt(O.$slots, "formatChip", {
                filter: J.def,
                value: w(J.def.id),
                optionValue: J.kind === "select" ? J.optionValue : void 0
              }, () => [
                bt(A(B(J)), 1)
              ], !0)
            ], 8, pk),
            r("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": St(J),
              onClick: (pt) => gt(J)
            }, [
              R(F(ok), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, mk)
          ]))), 128))
        ]),
        r("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": oa.value,
          onClick: Z
        }, A(e.clearLabel), 9, bk)
      ])) : z("", !0),
      (_(), nt(Ta, { to: "body" }, [
        c.value && u.value ? (_(), k("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: l,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": Ct.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: mt(h.value),
          onKeydown: W[3] || (W[3] = ie(() => {
          }, ["stop"]))
        }, [
          p.value ? (_(), k(U, { key: 0 }, [
            O.$slots.panel ? kt(O.$slots, "panel", {
              key: 0,
              filter: p.value,
              close: X,
              value: b.value,
              updateValue: ot
            }, void 0, !0) : (_(), k("div", yk, [
              p.value.type === "text" ? (_(), k(U, { key: 0 }, [
                r("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, A(p.value.label), 9, _k),
                Xt(r("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": W[0] || (W[0] = (J) => y.value = J),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: p.value.placeholder ?? "…",
                  onKeydown: Hn(ie(X, ["prevent"]), ["enter"])
                }, null, 40, xk), [
                  [Pe, y.value]
                ])
              ], 64)) : p.value.type === "select" ? (_(), k(U, { key: 1 }, [
                r("p", kk, A(p.value.label), 1),
                r("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": p.value.label,
                  "aria-multiselectable": !0
                }, [
                  (_(!0), k(U, null, at(p.value.options, (J) => (_(), k("li", {
                    key: J.value
                  }, [
                    r("label", Ck, [
                      r("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: f.value.includes(J.value),
                        onChange: (pt) => tt(J.value)
                      }, null, 40, $k),
                      r("span", Sk, A(J.label), 1)
                    ])
                  ]))), 128))
                ], 8, wk)
              ], 64)) : p.value.type === "dateRange" ? (_(), k(U, { key: 2 }, [
                r("p", Mk, A(p.value.label), 1),
                r("div", Dk, [
                  r("div", Ak, [
                    r("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, Tk),
                    Xt(r("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": W[1] || (W[1] = (J) => m.value = J),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, Bk), [
                      [Pe, m.value]
                    ])
                  ]),
                  r("div", Lk, [
                    r("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, Fk),
                    Xt(r("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": W[2] || (W[2] = (J) => v.value = J),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, Ek), [
                      [Pe, v.value]
                    ])
                  ])
                ])
              ], 64)) : z("", !0)
            ]))
          ], 64)) : z("", !0)
        ], 44, vk)) : z("", !0)
      ]))
    ], 8, ik));
  }
}), Pk = /* @__PURE__ */ it(Ik, [["__scopeId", "data-v-f38e0100"]]), Qt = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", ge = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", Rk = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", De = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", pe = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", Ok = { class: "font-sans" }, zk = ["for"], Vk = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], Nk = ["id"], Wk = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = `kiut-input-text-${Nt()}`, o = M(() => n.id ?? s), i = M(() => `${o.value}-err`), l = M({
      get: () => n.modelValue,
      set: (d) => a("update:modelValue", d)
    });
    return (d, c) => (_(), k("div", Ok, [
      e.label ? (_(), k("label", {
        key: 0,
        for: o.value,
        class: H(F(Qt))
      }, A(e.label), 11, zk)) : z("", !0),
      Xt(r("input", {
        id: o.value,
        "onUpdate:modelValue": c[0] || (c[0] = (u) => l.value = u),
        type: "text",
        autocomplete: "off",
        class: H([F(ge), e.invalid ? F(De) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, Vk), [
        [Pe, l.value]
      ]),
      e.errorText ? (_(), k("p", {
        key: 1,
        id: i.value,
        class: H(F(pe)),
        role: "alert"
      }, A(e.errorText), 11, Nk)) : z("", !0)
    ]));
  }
}), Hk = { class: "font-sans" }, jk = ["for"], Yk = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], qk = ["id"], Kk = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = `kiut-input-textarea-${Nt()}`, o = M(() => n.id ?? s), i = M(() => `${o.value}-err`), l = M({
      get: () => n.modelValue,
      set: (d) => a("update:modelValue", d)
    });
    return (d, c) => (_(), k("div", Hk, [
      e.label ? (_(), k("label", {
        key: 0,
        for: o.value,
        class: H(F(Qt))
      }, A(e.label), 11, jk)) : z("", !0),
      Xt(r("textarea", {
        id: o.value,
        "onUpdate:modelValue": c[0] || (c[0] = (u) => l.value = u),
        rows: e.rows,
        autocomplete: "off",
        class: H([F(Rk), e.invalid ? F(De) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, Yk), [
        [Pe, l.value]
      ]),
      e.errorText ? (_(), k("p", {
        key: 1,
        id: i.value,
        class: H(F(pe)),
        role: "alert"
      }, A(e.errorText), 11, qk)) : z("", !0)
    ]));
  }
}), Uk = { class: "font-sans" }, Xk = ["for"], Gk = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], Zk = ["for"], Qk = ["title"], Jk = ["aria-label"], t2 = ["id"], e2 = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = `kiut-input-file-${Nt()}`, o = M(() => n.id ?? s), i = M(() => `${o.value}-err`), l = st(null), d = M(() => n.modelValue?.name ?? n.placeholder);
    function c(h) {
      const y = h.target.files?.[0] ?? null;
      a("update:modelValue", y);
    }
    function u() {
      a("update:modelValue", null), l.value && (l.value.value = "");
    }
    return (h, g) => (_(), k("div", Uk, [
      e.label ? (_(), k("label", {
        key: 0,
        for: o.value,
        class: H(F(Qt))
      }, A(e.label), 11, Xk)) : z("", !0),
      r("div", {
        class: H([
          F(ge),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? F(De) : "",
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
        }, null, 40, Gk),
        r("label", {
          for: o.value,
          class: H(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          R(F(Vg), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          bt(" " + A(e.chooseLabel), 1)
        ], 10, Zk),
        r("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: d.value || void 0
        }, A(d.value), 9, Qk),
        e.modelValue && !e.disabled ? (_(), k("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: u
        }, [
          R(F(Li), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, Jk)) : z("", !0)
      ], 2),
      e.errorText ? (_(), k("p", {
        key: 1,
        id: i.value,
        class: H(F(pe)),
        role: "alert"
      }, A(e.errorText), 11, t2)) : z("", !0)
    ]));
  }
}), n2 = { class: "font-sans" }, a2 = ["for"], s2 = { class: "relative" }, o2 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], i2 = ["id"], l2 = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = `kiut-input-datetime-${Nt()}`, o = M(() => n.id ?? s), i = M(() => `${o.value}-err`), l = M(() => n.modelValue ?? "");
    function d(c) {
      const u = c.target.value;
      a("update:modelValue", u === "" ? null : u);
    }
    return (c, u) => (_(), k("div", n2, [
      e.label ? (_(), k("label", {
        key: 0,
        for: o.value,
        class: H(F(Qt))
      }, A(e.label), 11, a2)) : z("", !0),
      r("div", s2, [
        R(F(Ti), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        r("input", {
          id: o.value,
          value: l.value,
          type: "datetime-local",
          autocomplete: "off",
          class: H([
            F(ge),
            "pl-10",
            e.invalid ? F(De) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onInput: d
        }, null, 42, o2)
      ]),
      e.errorText ? (_(), k("p", {
        key: 1,
        id: i.value,
        class: H(F(pe)),
        role: "alert"
      }, A(e.errorText), 11, i2)) : z("", !0)
    ]));
  }
}), r2 = { class: "font-sans" }, c2 = ["for"], d2 = { class: "relative" }, u2 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], h2 = ["id"], f2 = /* @__PURE__ */ Q({
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
    const s = e, o = t, i = `kiut-input-time-${Nt()}`, l = M(() => s.id ?? i), d = M(() => `${l.value}-err`), c = M(() => s.modelValue == null || s.modelValue === "" ? "" : n(s.modelValue) ?? "");
    function u(h) {
      const g = h.target.value;
      o("update:modelValue", a(g));
    }
    return (h, g) => (_(), k("div", r2, [
      e.label ? (_(), k("label", {
        key: 0,
        for: l.value,
        class: H(F(Qt))
      }, A(e.label), 11, c2)) : z("", !0),
      r("div", d2, [
        R(F(jg), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        r("input", {
          id: l.value,
          value: c.value,
          type: "time",
          autocomplete: "off",
          class: H([
            F(ge),
            "pl-10",
            e.invalid ? F(De) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? d.value : void 0,
          onInput: u
        }, null, 42, u2)
      ]),
      e.errorText ? (_(), k("p", {
        key: 1,
        id: d.value,
        class: H(F(pe)),
        role: "alert"
      }, A(e.errorText), 11, h2)) : z("", !0)
    ]));
  }
}), g2 = { class: "font-sans" }, p2 = ["for"], m2 = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, b2 = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], v2 = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, y2 = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, _2 = { class: "min-w-0 text-left leading-snug" }, x2 = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, k2 = { class: "min-w-0 text-right leading-snug" }, w2 = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, C2 = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, $2 = ["id"], S2 = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = `kiut-input-range-${Nt()}`, o = M(() => n.id ?? s), i = M(() => `${o.value}-err`), l = M(() => {
      const y = [];
      return n.errorText && y.push(i.value), y.length ? y.join(" ") : void 0;
    }), d = M(
      () => !!(n.caption && !n.captionMin && !n.captionMax)
    ), c = M(() => !!(n.captionMin || n.captionMax)), u = M(() => {
      const { min: y, max: f, modelValue: m } = n;
      if (f === y) return 0;
      const v = (m - y) / (f - y);
      return Math.min(100, Math.max(0, v * 100));
    }), h = M(() => ({
      "--kiut-range-fill": `${u.value}%`,
      "--kiut-range-length": n.trackLength
    }));
    function g(y) {
      const f = Number(y.target.value);
      a("update:modelValue", Number.isNaN(f) ? n.min : f);
    }
    return (y, f) => (_(), k("div", g2, [
      e.label ? (_(), k("label", {
        key: 0,
        for: o.value,
        class: H(F(Qt))
      }, A(e.label), 11, p2)) : z("", !0),
      r("div", {
        class: H(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (_(), k("p", m2, A(e.captionMax), 1)) : z("", !0),
        r("div", {
          class: H(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: mt(h.value)
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
            class: H([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: g
          }, null, 42, b2)
        ], 6),
        e.orientation === "horizontal" && d.value ? (_(), k("p", v2, A(e.caption), 1)) : e.orientation === "horizontal" && c.value ? (_(), k("div", y2, [
          r("span", _2, A(e.captionMin), 1),
          r("span", x2, A(e.caption), 1),
          r("span", k2, A(e.captionMax), 1)
        ])) : z("", !0),
        e.orientation === "vertical" && e.captionMin ? (_(), k("p", w2, A(e.captionMin), 1)) : z("", !0),
        e.orientation === "vertical" && e.caption ? (_(), k("p", C2, A(e.caption), 1)) : z("", !0)
      ], 2),
      e.errorText ? (_(), k("p", {
        key: 1,
        id: i.value,
        class: H(F(pe)),
        role: "alert"
      }, A(e.errorText), 11, $2)) : z("", !0)
    ]));
  }
}), M2 = /* @__PURE__ */ it(S2, [["__scopeId", "data-v-a1343418"]]), D2 = { class: "font-sans" }, A2 = ["for"], T2 = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], B2 = ["id"], L2 = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = `kiut-input-number-${Nt()}`, o = M(() => n.id ?? s), i = M(() => `${o.value}-err`), l = M(() => {
      switch (n.align) {
        case "start":
          return "text-start";
        case "end":
          return "text-end";
        default:
          return "text-center";
      }
    }), d = M(
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
    return (u, h) => (_(), k("div", D2, [
      e.label ? (_(), k("label", {
        key: 0,
        for: o.value,
        class: H(F(Qt))
      }, A(e.label), 11, A2)) : z("", !0),
      r("input", {
        id: o.value,
        value: d.value,
        type: "number",
        onInput: c,
        class: H([
          F(ge),
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
      }, null, 42, T2),
      e.errorText ? (_(), k("p", {
        key: 1,
        id: i.value,
        class: H(F(pe)),
        role: "alert"
      }, A(e.errorText), 11, B2)) : z("", !0)
    ]));
  }
}), F2 = { class: "font-sans" }, E2 = ["for"], I2 = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], P2 = ["disabled"], R2 = ["id"], O2 = "#3b82f6", z2 = "#aabbcc", V2 = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", N2 = /* @__PURE__ */ Q({
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
    function n(f) {
      const m = f.trim(), v = /^#?([0-9a-fA-F]{6})$/.exec(m);
      if (v) return `#${v[1].toLowerCase()}`;
      const p = /^#?([0-9a-fA-F]{3})$/.exec(m);
      if (p) {
        const [b, x, w] = p[1].split("");
        return `#${b}${b}${x}${x}${w}${w}`.toLowerCase();
      }
      return null;
    }
    function a(f) {
      return n(f) ?? O2;
    }
    const s = e, o = t, i = `kiut-input-color-${Nt()}`, l = M(() => s.id ?? i), d = M(() => `${l.value}-err`), c = M(() => a(s.modelValue)), u = st(c.value), h = st(!1);
    Pt(c, (f) => {
      h.value || (u.value = f);
    });
    function g(f) {
      const m = f.target, v = n(m.value);
      v && o("update:modelValue", v);
    }
    function y() {
      h.value = !1;
      const f = n(u.value);
      f ? (u.value = f, o("update:modelValue", f)) : u.value = c.value;
    }
    return Pt(u, (f) => {
      if (!h.value) return;
      const m = n(f);
      m && o("update:modelValue", m);
    }), (f, m) => (_(), k("div", F2, [
      e.label ? (_(), k("label", {
        key: 0,
        for: l.value,
        class: H(F(Qt))
      }, A(e.label), 11, E2)) : z("", !0),
      r("div", {
        class: H([
          V2,
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
        }, null, 40, I2),
        e.showHexInput ? Xt((_(), k("input", {
          key: 0,
          "onUpdate:modelValue": m[0] || (m[0] = (v) => u.value = v),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: z2,
          onFocus: m[1] || (m[1] = (v) => h.value = !0),
          onBlur: y
        }, null, 40, P2)), [
          [Pe, u.value]
        ]) : z("", !0)
      ], 2),
      e.errorText ? (_(), k("p", {
        key: 1,
        id: d.value,
        class: H(F(pe)),
        role: "alert"
      }, A(e.errorText), 11, R2)) : z("", !0)
    ]));
  }
});
function Wi(e, t) {
  return _(), k("svg", {
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
const W2 = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], H2 = ["aria-selected", "onClick", "onMouseenter"], j2 = {
  key: 0,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, Y2 = { class: "min-w-0 flex-1" }, Hi = /* @__PURE__ */ Q({
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
    const m = M(() => n.options.filter((B) => !B.disabled)), v = M(
      () => n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opción"
    ), p = M(() => n.modelValue === null || n.modelValue === void 0 || n.modelValue === "" ? n.placeholder : n.options.find((E) => E.value === n.modelValue)?.label ?? String(n.modelValue));
    function b(B) {
      return `${String(B.value)}-${B.label}`;
    }
    function x(B) {
      return n.modelValue === B.value;
    }
    function w(B, E) {
      const I = x(B), N = g.value === E;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        I ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !I && N ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function D(B) {
      a("update:modelValue", B.value), h.value = !1;
    }
    function S() {
      n.disabled || (h.value = !h.value);
    }
    function C(B) {
      if (B.stopPropagation(), !n.disabled && (S(), h.value)) {
        f();
        const E = Math.max(
          0,
          m.value.findIndex((I) => I.value === n.modelValue)
        );
        g.value = E, Lt(() => u.value?.focus());
      }
    }
    function $(B) {
      if (!h.value) return;
      const E = B.target, I = d.value, N = u.value;
      I && !I.contains(E) && (!N || !N.contains(E)) && (h.value = !1);
    }
    function L(B) {
      n.disabled || (B.key === "ArrowDown" || B.key === "Enter" || B.key === " ") && (B.preventDefault(), h.value || (h.value = !0, f(), g.value = Math.max(
        0,
        m.value.findIndex((E) => E.value === n.modelValue)
      ), Lt(() => u.value?.focus())));
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
          I && D(I);
        }
      }
    }
    return te(() => {
      document.addEventListener("click", $);
    }), $e(() => {
      document.removeEventListener("click", $);
    }), (B, E) => (_(), k("div", {
      ref_key: "rootRef",
      ref: d,
      class: "relative font-sans"
    }, [
      e.label ? (_(), k("label", {
        key: 0,
        id: o,
        class: H(F(Qt))
      }, A(e.label), 3)) : z("", !0),
      r("button", {
        ref_key: "buttonRef",
        ref: c,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: H([
          F(ge),
          "flex items-center justify-between gap-2 text-left",
          h.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": h.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : v.value,
        onClick: C,
        onKeydown: L
      }, [
        r("span", {
          class: H([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, A(p.value), 3),
        R(F(Bi), {
          class: H(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", h.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, W2),
      (_(), nt(Ta, { to: "body" }, [
        Xt(r("ul", {
          id: l,
          ref_key: "listRef",
          ref: u,
          role: "listbox",
          tabindex: "-1",
          style: mt(y.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          onKeydown: ie(T, ["stop"])
        }, [
          (_(!0), k(U, null, at(m.value, (I, N) => (_(), k("li", {
            key: b(I),
            role: "option",
            "aria-selected": x(I),
            class: H(w(I, N)),
            onClick: ie((Y) => D(I), ["stop"]),
            onMouseenter: (Y) => g.value = N
          }, [
            e.showOptionCheck ? (_(), k("span", j2, [
              x(I) ? (_(), nt(F(Wi), {
                key: 0,
                class: "h-4 w-4 text-white"
              })) : z("", !0)
            ])) : z("", !0),
            r("span", Y2, A(I.label), 1)
          ], 42, H2))), 128))
        ], 36), [
          [mn, h.value]
        ])
      ]))
    ], 512));
  }
}), q2 = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], K2 = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, U2 = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, X2 = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, G2 = { class: "truncate" }, Z2 = ["aria-selected", "onClick", "onMouseenter"], Q2 = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, J2 = { class: "min-w-0 flex-1" }, tw = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = `kiut-multiselect-${Nt()}`, o = `${s}-label`, i = `${s}-btn`, l = `${s}-listbox`, d = st(null), c = st(null), u = st(!1), h = st(0), g = M(() => n.options.filter((T) => !T.disabled)), y = M(() => new Set(n.modelValue ?? [])), f = M(
      () => n.options.filter((T) => y.value.has(T.value))
    ), m = M(() => {
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
    function D() {
      n.disabled || (u.value = !u.value);
    }
    function S(T) {
      T.stopPropagation(), !n.disabled && (D(), u.value && (w(), Lt(() => c.value?.focus())));
    }
    function C(T) {
      if (!u.value) return;
      const B = d.value;
      B && !B.contains(T.target) && (u.value = !1);
    }
    function $(T) {
      n.disabled || (T.key === "ArrowDown" || T.key === "Enter" || T.key === " ") && (T.preventDefault(), u.value || (u.value = !0, w(), Lt(() => c.value?.focus())));
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
    return te(() => {
      document.addEventListener("click", C);
    }), $e(() => {
      document.removeEventListener("click", C);
    }), (T, B) => (_(), k("div", {
      ref_key: "rootRef",
      ref: d,
      class: "relative font-sans"
    }, [
      e.label ? (_(), k("label", {
        key: 0,
        id: o,
        class: H(F(Qt))
      }, A(e.label), 3)) : z("", !0),
      r("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: H([
          F(ge),
          "flex items-start justify-between gap-2 text-left",
          u.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": u.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : m.value,
        onClick: S,
        onKeydown: $
      }, [
        r("div", K2, [
          f.value.length === 0 ? (_(), k("span", U2, A(e.placeholder), 1)) : (_(), k("div", X2, [
            (_(!0), k(U, null, at(f.value, (E) => (_(), k("span", {
              key: v(E),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              r("span", G2, A(E.label), 1)
            ]))), 128))
          ]))
        ]),
        R(F(Bi), {
          class: H(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", u.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, q2),
      Xt(r("ul", {
        id: l,
        ref_key: "listRef",
        ref: c,
        role: "listbox",
        tabindex: "-1",
        "aria-multiselectable": "true",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: ie(L, ["stop"])
      }, [
        (_(!0), k(U, null, at(g.value, (E, I) => (_(), k("li", {
          key: v(E),
          role: "option",
          "aria-selected": p(E),
          class: H(b(E, I)),
          onClick: ie((N) => x(E), ["stop"]),
          onMouseenter: (N) => h.value = I
        }, [
          r("span", Q2, [
            p(E) ? (_(), nt(F(Wi), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : z("", !0)
          ]),
          r("span", J2, A(E.label), 1)
        ], 42, Z2))), 128))
      ], 544), [
        [mn, u.value]
      ])
    ], 512));
  }
}), ew = ["id", "aria-checked", "aria-disabled", "disabled", "onKeydown"], nw = { class: "sr-only" }, aw = /* @__PURE__ */ Q({
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
    function s() {
      n.disabled || a("update:modelValue", !n.modelValue);
    }
    return (o, i) => (_(), k("button", {
      id: e.id,
      type: "button",
      role: "switch",
      "aria-checked": e.modelValue,
      "aria-disabled": e.disabled ? "true" : void 0,
      disabled: e.disabled,
      class: H([
        "relative inline-flex h-8 w-[3.75rem] shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-sm transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        e.modelValue ? "bg-[color:var(--kiut-primary)]" : "bg-[#DEDEE3] dark:bg-slate-600"
      ]),
      onClick: s,
      onKeydown: [
        Hn(ie(s, ["prevent", "stop"]), ["space"]),
        Hn(ie(s, ["prevent"]), ["enter"])
      ]
    }, [
      r("span", {
        class: H(["pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", e.modelValue ? "translate-x-7" : "translate-x-0"]),
        "aria-hidden": "true"
      }, null, 2),
      r("span", nw, A(e.ariaLabel), 1)
    ], 42, ew));
  }
}), sw = { class: "font-sans" }, ow = ["for"], iw = { class: "flex gap-2" }, lw = { class: "w-[7.5rem] shrink-0" }, rw = { class: "min-w-0 flex-1" }, cw = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], dw = ["id"], uw = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = `kiut-phone-${Nt()}`, o = M(() => n.id ?? `${s}-num`), i = M(() => `${o.value}-err`), l = M({
      get: () => n.modelValue.prefix,
      set: (c) => a("update:modelValue", { ...n.modelValue, prefix: c })
    }), d = M({
      get: () => n.modelValue.number,
      set: (c) => a("update:modelValue", { ...n.modelValue, number: c })
    });
    return (c, u) => (_(), k("div", sw, [
      e.label ? (_(), k("label", {
        key: 0,
        for: o.value,
        class: H(F(Qt))
      }, A(e.label), 11, ow)) : z("", !0),
      r("div", iw, [
        r("div", lw, [
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
        r("div", rw, [
          Xt(r("input", {
            id: o.value,
            "onUpdate:modelValue": u[1] || (u[1] = (h) => d.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: H([F(ge), e.invalid ? F(De) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, cw), [
            [Pe, d.value]
          ])
        ])
      ]),
      e.errorText ? (_(), k("p", {
        key: 1,
        id: i.value,
        class: H(F(pe)),
        role: "alert"
      }, A(e.errorText), 11, dw)) : z("", !0)
    ]));
  }
}), hw = ["role", "aria-label"], fw = { class: "flex flex-wrap gap-2" }, gw = ["aria-checked", "role", "onClick"], pw = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, mw = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, bw = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, vw = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = M(() => n.multiple ? Array.isArray(n.modelValue) ? n.modelValue : [] : []);
    function o(d) {
      return n.multiple ? s.value.includes(d.value) : n.modelValue === d.value;
    }
    function i(d) {
      return [
        "inline-flex max-w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        o(d) ? "border-[color:var(--kiut-primary)]/50 bg-violet-50/80 dark:bg-violet-950/30" : "border-gray-300 bg-white dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]"
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
    return (d, c) => (_(), k("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      r("div", fw, [
        (_(!0), k(U, null, at(e.items, (u) => (_(), k("button", {
          key: u.value,
          type: "button",
          class: H(i(u)),
          "aria-checked": o(u),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => l(u)
        }, [
          r("span", pw, [
            o(u) ? (_(), k("span", mw)) : z("", !0)
          ]),
          u.dotColor ? (_(), k("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: mt({ backgroundColor: u.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : z("", !0),
          r("span", bw, A(u.label), 1)
        ], 10, gw))), 128))
      ])
    ], 8, hw));
  }
}), yw = ["aria-label"], _w = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], xw = { class: "truncate px-3 py-2 text-sm font-medium" }, kw = /* @__PURE__ */ Q({
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
    function d(m) {
      return m.value === n.modelValue;
    }
    function c(m) {
      const v = d(m), p = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return m.disabled ? `${p} cursor-not-allowed opacity-40` : v ? `${p} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${p} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function u(m) {
      m.disabled || m.value !== n.modelValue && a("update:modelValue", m.value);
    }
    function h(m, v, p) {
      u(m), Lt(() => i.value[v]?.focus());
    }
    const g = M(
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
        b && u(b), Lt(() => i.value[p]?.focus());
      } else if (m.key === "ArrowLeft" || m.key === "ArrowUp") {
        m.preventDefault();
        const p = y(v, -1), b = n.items[p];
        b && u(b), Lt(() => i.value[p]?.focus());
      } else if (m.key === "Home") {
        m.preventDefault();
        const p = g.value[0];
        if (p !== void 0) {
          const b = n.items[p];
          b && u(b), Lt(() => i.value[p]?.focus());
        }
      } else if (m.key === "End") {
        m.preventDefault();
        const p = g.value[g.value.length - 1];
        if (p !== void 0) {
          const b = n.items[p];
          b && u(b), Lt(() => i.value[p]?.focus());
        }
      }
    }
    return (m, v) => (_(), k("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (_(!0), k(U, null, at(e.items, (p, b) => (_(), k("button", {
        id: o(p.value),
        key: p.value,
        ref_for: !0,
        ref: (x) => l(x, b),
        type: "button",
        role: "tab",
        "aria-selected": d(p),
        "aria-disabled": p.disabled === !0,
        tabindex: d(p) ? 0 : -1,
        class: H(c(p)),
        onClick: (x) => h(p, b),
        onKeydown: (x) => f(x, b)
      }, [
        r("span", xw, A(p.label), 1)
      ], 42, _w))), 128))
    ], 8, yw));
  }
});
function Le(e) {
  const [t, n, a] = e.split("-").map(Number);
  return new Date(t, n - 1, a);
}
function ln(e) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), a = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${a}`;
}
function be(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function ya(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function Mo(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function sa(e, t) {
  const n = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), a = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return n < a ? -1 : n > a ? 1 : 0;
}
function Do(e, t) {
  return sa(e, t) === 0;
}
function _a(e, t) {
  return sa(e, t) < 0;
}
function ww(e, t) {
  return sa(e, t) >= 0;
}
function Cw(e, t) {
  return sa(e, t) <= 0;
}
function $w(e) {
  const t = e.getFullYear(), n = e.getMonth(), a = new Date(t, n, 1), s = new Date(a);
  s.setDate(a.getDate() - a.getDay());
  const o = [], i = new Date(s);
  for (let l = 0; l < 42; l++)
    o.push(new Date(i)), i.setDate(i.getDate() + 1);
  return o;
}
const Sw = [
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
], Mw = [
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
  return `${Sw[e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function To(e) {
  return `${Mw[e.getMonth()]} ${e.getFullYear()}`;
}
const Dw = ["aria-expanded", "aria-labelledby", "aria-label"], Aw = ["onKeydown"], Tw = { class: "mb-4 flex items-center justify-between gap-2" }, Bw = { class: "flex min-w-0 flex-1 justify-center gap-8 text-center text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, Lw = { class: "min-w-0 truncate" }, Fw = { class: "min-w-0 truncate" }, Ew = { class: "flex flex-col gap-6 sm:flex-row sm:gap-8" }, Iw = { class: "mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-wide text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, Pw = { class: "grid grid-cols-7 gap-y-1" }, Rw = ["disabled", "onClick"], Ow = /* @__PURE__ */ Q({
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
    const n = e, a = t, o = `${`kiut-drp-${Nt()}`}-lbl`, i = st(null), l = st(null), d = st(!1), c = st(null), u = st(ya(/* @__PURE__ */ new Date())), h = M(() => {
      const C = ya(u.value);
      return [C, Mo(C, 1)];
    }), g = M(() => n.ariaLabel ?? n.placeholder), y = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], f = M(() => {
      if (!n.modelValue.start || !n.modelValue.end) return n.placeholder;
      const C = Le(n.modelValue.start), $ = Le(n.modelValue.end);
      return `${Ao(C)} – ${Ao($)}`;
    });
    function m(C, $) {
      return C.getMonth() === $.getMonth() && C.getFullYear() === $.getFullYear();
    }
    function v(C) {
      const $ = be(C);
      if (n.minDate) {
        const L = be(Le(n.minDate));
        if (_a($, L)) return !0;
      }
      if (n.maxDate) {
        const L = be(Le(n.maxDate));
        if (_a(L, $)) return !0;
      }
      return !1;
    }
    function p(C, $) {
      const L = m($, C), T = n.modelValue.start ? be(Le(n.modelValue.start)) : null, B = n.modelValue.end ? be(Le(n.modelValue.end)) : null, E = be($), I = L ? "text-[color:var(--kiut-text-primary)] dark:text-slate-100" : "text-slate-400 dark:text-slate-500";
      if (!T || !B)
        return `${I} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
      const N = ww(E, T) && Cw(E, B), Y = Do(E, T), V = Do(E, B);
      return Y || V ? "bg-[color:var(--kiut-primary)] font-semibold text-white shadow-sm" : N ? `${I} bg-violet-100/90 dark:bg-violet-950/35 hover:bg-violet-200/80 dark:hover:bg-violet-900/40` : `${I} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
    }
    function b(C) {
      if (v(C)) return;
      const $ = be(C);
      if (!c.value) {
        c.value = new Date($), a("update:modelValue", { start: ln($), end: ln($) });
        return;
      }
      let T = be(c.value), B = new Date($);
      _a(B, T) && ([T, B] = [B, T]), a("update:modelValue", { start: ln(T), end: ln(B) }), c.value = null, d.value = !1;
    }
    function x(C) {
      u.value = Mo(u.value, C);
    }
    function w() {
      d.value = !1;
    }
    function D(C) {
      if (C?.stopPropagation(), !d.value) {
        if (d.value = !0, c.value = null, n.modelValue.start)
          try {
            u.value = ya(Le(n.modelValue.start));
          } catch {
          }
        Lt(() => l.value?.focus());
      }
    }
    function S(C) {
      if (!d.value) return;
      const $ = i.value;
      $ && !$.contains(C.target) && (d.value = !1);
    }
    return Pt(d, (C) => {
      C && (c.value = null);
    }), te(() => {
      document.addEventListener("click", S);
    }), $e(() => {
      document.removeEventListener("click", S);
    }), (C, $) => (_(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (_(), k("label", {
        key: 0,
        id: o,
        class: H(F(Qt))
      }, A(e.label), 3)) : z("", !0),
      r("button", {
        type: "button",
        class: H([F(ge), "flex w-full items-center gap-2 text-left"]),
        "aria-expanded": d.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : g.value,
        onFocus: D,
        onClick: D
      }, [
        R(F(Ti), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        r("span", {
          class: H([
            "min-w-0 flex-1 truncate",
            !e.modelValue.start || !e.modelValue.end ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, A(f.value), 3)
      ], 42, Dw),
      Xt(r("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: "absolute left-0 top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[100vw] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] p-4 shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]",
        onKeydown: Hn(ie(w, ["stop"]), ["escape"])
      }, [
        r("div", Tw, [
          r("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes anterior",
            onClick: $[0] || ($[0] = (L) => x(-1))
          }, [
            R(F(Wg), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ]),
          r("div", Bw, [
            r("span", Lw, A(F(To)(h.value[0])), 1),
            r("span", Fw, A(F(To)(h.value[1])), 1)
          ]),
          r("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes siguiente",
            onClick: $[1] || ($[1] = (L) => x(1))
          }, [
            R(F(Hg), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ])
        ]),
        r("div", Ew, [
          (_(!0), k(U, null, at(h.value, (L) => (_(), k("div", {
            key: `${L.getFullYear()}-${L.getMonth()}`,
            class: "min-w-0 flex-1"
          }, [
            r("div", Iw, [
              (_(), k(U, null, at(y, (T) => r("span", { key: T }, A(T), 1)), 64))
            ]),
            r("div", Pw, [
              (_(!0), k(U, null, at(F($w)(L), (T) => (_(), k("button", {
                key: F(ln)(T),
                type: "button",
                disabled: v(T),
                class: H(["relative flex h-9 items-center justify-center rounded-lg text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", p(L, T)]),
                onClick: (B) => b(T)
              }, A(T.getDate()), 11, Rw))), 128))
            ])
          ]))), 128))
        ])
      ], 40, Aw), [
        [mn, d.value]
      ])
    ], 512));
  }
}), zw = {
  key: 0,
  class: "group relative inline-flex shrink-0"
}, Vw = ["type", "disabled", "aria-label"], Nw = {
  key: 1,
  class: "min-w-0 truncate"
}, Ww = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, Hw = ["type", "disabled", "aria-label"], jw = {
  key: 1,
  class: "min-w-0 truncate"
}, Wn = /* @__PURE__ */ Q({
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
    const t = e, n = Eo(), a = M(() => !!t.tooltip?.trim()), s = M(() => t.variant === "action"), o = M(() => !s.value), i = M(() => {
      const u = n["aria-label"];
      if (typeof u == "string" && u.length > 0) return u;
      if (s.value && t.tooltip?.trim()) return t.tooltip.trim();
    }), l = M(() => {
      const u = n.type;
      return u === "submit" || u === "reset" || u === "button" ? u : "button";
    }), d = M(() => {
      const { class: u, type: h, "aria-label": g, ...y } = n;
      return y;
    }), c = M(() => t.variant === "primary" ? [
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
    return (u, h) => a.value ? (_(), k("span", zw, [
      r("button", jn({
        type: l.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [c.value, F(n).class]],
        disabled: e.disabled,
        "aria-label": i.value
      }, d.value), [
        u.$slots.icon ? (_(), k("span", {
          key: 0,
          class: H(["inline-flex shrink-0", s.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          kt(u.$slots, "icon")
        ], 2)) : z("", !0),
        o.value ? (_(), k("span", Nw, [
          kt(u.$slots, "default")
        ])) : z("", !0)
      ], 16, Vw),
      r("span", Ww, A(e.tooltip), 1)
    ])) : (_(), k("button", jn({
      key: 1,
      type: l.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [c.value, F(n).class]],
      disabled: e.disabled,
      "aria-label": i.value
    }, d.value), [
      u.$slots.icon ? (_(), k("span", {
        key: 0,
        class: H(["inline-flex shrink-0", s.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        kt(u.$slots, "icon")
      ], 2)) : z("", !0),
      o.value ? (_(), k("span", jw, [
        kt(u.$slots, "default")
      ])) : z("", !0)
    ], 16, Hw));
  }
}), Yw = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, qw = { class: "min-w-0 flex-1 space-y-1" }, Kw = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, Uw = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, Xw = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, Gw = /* @__PURE__ */ Q({
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
    return Pt(
      () => n.modelValue,
      (u) => {
        u && requestAnimationFrame(() => {
          i.value?.focus({ preventScroll: !0 });
        });
      }
    ), te(() => {
      document.addEventListener("keydown", c);
    }), $e(() => {
      document.removeEventListener("keydown", c);
    }), (u, h) => (_(), nt(Ta, { to: "body" }, [
      R(un, { name: "kiut-modal" }, {
        default: P(() => [
          e.modelValue ? (_(), k("div", Yw, [
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
              "aria-labelledby": o,
              tabindex: "-1",
              class: "kiut-modal-panel relative z-10 flex max-h-[min(90vh,880px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] shadow-[var(--kiut-shadow-card)] dark:bg-[#252528] dark:shadow-black/40",
              onClick: h[0] || (h[0] = ie(() => {
              }, ["stop"]))
            }, [
              r("header", {
                class: H(["flex shrink-0 justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.02]", e.subtitle ? "items-start" : "items-center"])
              }, [
                r("div", qw, [
                  r("h2", {
                    id: o,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, A(e.title), 1),
                  e.subtitle ? (_(), k("p", Kw, A(e.subtitle), 1)) : z("", !0)
                ]),
                R(Wn, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  onClick: l
                }, {
                  icon: P(() => [
                    R(F(Li), { class: "h-5 w-5" })
                  ]),
                  _: 1
                })
              ], 2),
              r("div", Uw, [
                kt(u.$slots, "default", {}, void 0, !0)
              ]),
              r("footer", Xw, [
                R(Wn, {
                  variant: "secondary",
                  type: "button",
                  onClick: l
                }, {
                  default: P(() => [
                    bt(A(e.cancelLabel), 1)
                  ]),
                  _: 1
                }),
                R(Wn, {
                  variant: "primary",
                  type: "button",
                  onClick: d
                }, {
                  default: P(() => [
                    bt(A(e.confirmLabel), 1)
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
}), Zw = /* @__PURE__ */ it(Gw, [["__scopeId", "data-v-4ed7bb14"]]), Qw = { class: "text-left font-['Inter',system-ui,sans-serif]" }, Jw = {
  key: 0,
  class: ""
}, t5 = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, e5 = {
  key: 1,
  class: "flex flex-row justify-between items-center gap-2"
}, n5 = {
  key: 0,
  class: "flex shrink-0 flex-wrap items-center justify-end gap-2"
}, a5 = {
  key: 1,
  class: "flex shrink-0 flex-wrap items-center justify-end gap-2"
}, s5 = /* @__PURE__ */ Q({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = Qn();
    return M(() => {
      const n = !!t.description, a = !!t.actions, s = !!t.filters, o = a || s;
      return n && o ? "sm:justify-between sm:items-start" : !n && o ? "max-sm:items-end sm:justify-end" : n && !o ? "sm:items-start" : "";
    }), (n, a) => (_(), k("section", Qw, [
      n.$slots.description || n.$slots.filters || n.$slots.actions ? (_(), k("header", Jw, [
        n.$slots.description ? (_(), k("div", t5, [
          kt(n.$slots, "description")
        ])) : z("", !0),
        n.$slots.filters || n.$slots.actions ? (_(), k("div", e5, [
          n.$slots.filters ? (_(), k("div", n5, [
            kt(n.$slots, "filters")
          ])) : z("", !0),
          n.$slots.actions ? (_(), k("div", a5, [
            kt(n.$slots, "actions")
          ])) : z("", !0)
        ])) : z("", !0)
      ])) : z("", !0),
      n.$slots.content || n.$slots.default ? (_(), k("div", {
        key: 1,
        class: H({ "mt-6": n.$slots.description || n.$slots.filters || n.$slots.actions })
      }, [
        kt(n.$slots, "content", {}, () => [
          kt(n.$slots, "default")
        ])
      ], 2)) : z("", !0)
    ]));
  }
}), o5 = { class: "flex flex-1 min-h-0" }, i5 = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, l5 = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, r5 = ["aria-current", "title", "onClick"], c5 = {
  key: 1,
  class: "shrink-0 border-t [border-color:var(--kiut-lateral-border-color)] [background-color:var(--kiut-lateral-bg)]"
}, d5 = { class: "px-4 py-4 shrink-0" }, u5 = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, h5 = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, f5 = ["data-nav-id", "aria-current", "onClick"], g5 = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, p5 = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, m5 = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, b5 = ["data-nav-id", "aria-current", "onClick"], v5 = { class: "truncate text-[15px]" }, y5 = ["aria-current", "onClick"], _5 = {
  key: 0,
  class: "absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, x5 = { class: "text-[10px] font-semibold leading-none truncate w-full text-center px-0.5" }, k5 = /* @__PURE__ */ Q({
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
    mobileBarHeight: { default: "4rem" },
    mobileFooterHeight: { default: "3rem" }
  },
  emits: ["update:selectedSectionId", "navigate"],
  setup(e, { emit: t }) {
    const n = st(!1), a = e, s = t, o = Eo(), { class: i, ...l } = o, d = Qn(), c = M(
      () => d.footer ? `calc(${a.mobileBarHeight} + ${a.mobileFooterHeight})` : a.mobileBarHeight
    ), u = st(!1);
    function h() {
      typeof window > "u" || (u.value = window.innerWidth < a.mobileBreakpoint);
    }
    te(() => {
      h(), window.addEventListener("resize", h);
    }), $e(() => {
      window.removeEventListener("resize", h);
    });
    const g = M(() => {
      const S = a.sections.find((C) => C.id === a.selectedSectionId);
      return S?.items?.length ? S : null;
    });
    function y(S) {
      return a.activePath ? a.activePath === S.path || a.activePath.startsWith(S.path + "/") : !1;
    }
    function f(S) {
      return S.items?.length ? S.items.some(y) : !a.activePath || !S.path ? !1 : a.activePath === S.path || a.activePath.startsWith(S.path + "/");
    }
    function m(S) {
      if (!S.items?.length) {
        s("update:selectedSectionId", null), s("navigate", {
          section: S,
          item: { id: S.id, label: S.label, path: S.path }
        });
        return;
      }
      const C = a.selectedSectionId === S.id ? null : S.id;
      s("update:selectedSectionId", C);
    }
    function v(S, C) {
      s("navigate", { section: S, item: C });
    }
    function p() {
      s("update:selectedSectionId", null);
    }
    function b(S, C) {
      v(S, C), p();
    }
    function x(S) {
      return a.selectedSectionId === S.id ? [
        "[background-color:var(--kiut-primary-section)] text-white shadow-sm dark:text-purple-300"
      ] : f(S) ? [
        "[color:var(--kiut-primary)]",
        "text-purple-800/90 dark:text-purple-400"
      ] : [
        "[color:var(--kiut-text-secondary)]",
        "hover:bg-purple-100 hover:text-purple-900",
        "dark:hover:bg-purple-400/20 dark:hover:text-purple-50"
      ];
    }
    function w(S) {
      return y(S) ? [
        "[background-color:var(--kiut-secondary-section)] text-white",
        "dark:text-purple-300"
      ] : [
        "[color:var(--kiut-text-primary)]",
        "hover:bg-purple-100 hover:text-purple-700",
        "dark:hover:bg-purple-500/30 dark:hover:text-purple-50"
      ];
    }
    function D(S) {
      return a.selectedSectionId === S.id ? ["[color:var(--kiut-primary)]"] : f(S) ? ["[color:var(--kiut-primary)]", "opacity-75"] : [
        "[color:var(--kiut-text-muted)]",
        "active:[color:var(--kiut-text-secondary)]"
      ];
    }
    return (S, C) => u.value ? (_(), k("div", jn({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      R(un, { name: "ksn-overlay" }, {
        default: P(() => [
          g.value ? (_(), k("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: p
          })) : z("", !0)
        ]),
        _: 1
      }),
      R(un, { name: "ksn-sheet" }, {
        default: P(() => [
          g.value ? (_(), k("div", {
            key: 0,
            class: "fixed left-0 right-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t [border-color:var(--kiut-lateral-border-color)] max-h-[70vh] flex flex-col",
            style: mt({ bottom: c.value })
          }, [
            C[3] || (C[3] = r("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              r("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            r("div", g5, [
              r("p", p5, A(g.value.label), 1),
              r("button", {
                type: "button",
                class: "w-8 h-8 flex items-center justify-center rounded-lg [color:var(--kiut-text-muted)] hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-colors",
                "aria-label": "Close",
                onClick: p
              }, [...C[2] || (C[2] = [
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
            r("nav", m5, [
              (_(!0), k(U, null, at(g.value.items, ($) => (_(), k("button", {
                key: $.id,
                type: "button",
                "data-nav-id": $.id,
                "aria-current": y($) ? "page" : void 0,
                class: H(["group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]", w($)]),
                onClick: (L) => b(g.value, $)
              }, [
                $.icon ? (_(), nt(je($.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : z("", !0),
                r("span", v5, A($.label), 1)
              ], 10, b5))), 128))
            ])
          ], 4)) : z("", !0)
        ]),
        _: 1
      }),
      S.$slots.footer ? (_(), k("div", {
        key: 0,
        class: "fixed left-0 right-0 z-50 [background-color:var(--kiut-lateral-bg)] border-t [border-color:var(--kiut-lateral-border-color)] flex items-center justify-center",
        style: mt({ bottom: e.mobileBarHeight, height: e.mobileFooterHeight })
      }, [
        kt(S.$slots, "footer", { expanded: !0 }, void 0, !0)
      ], 4)) : z("", !0),
      r("nav", {
        class: "fixed bottom-0 left-0 right-0 z-50 [background-color:var(--kiut-lateral-bg)] border-t [border-color:var(--kiut-lateral-border-color)] flex items-stretch justify-around overflow-hidden",
        style: mt({ height: e.mobileBarHeight }),
        "aria-label": "Sections"
      }, [
        (_(!0), k(U, null, at(e.sections, ($) => (_(), k("button", {
          key: $.id,
          type: "button",
          "aria-current": e.selectedSectionId === $.id ? "true" : void 0,
          class: H(["relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--kiut-primary)]/30", D($)]),
          onClick: (L) => m($)
        }, [
          e.selectedSectionId === $.id || f($) ? (_(), k("span", _5)) : z("", !0),
          $.icon ? (_(), nt(je($.icon), {
            key: 1,
            class: "shrink-0",
            style: mt({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : z("", !0),
          r("span", x5, A($.label), 1)
        ], 10, y5))), 128))
      ], 4)
    ], 16)) : (_(), k("aside", jn({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      r("div", o5, [
        r("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center [border-color:var(--kiut-lateral-border-color)]",
          style: mt({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: C[0] || (C[0] = ($) => n.value = !0),
          onMouseleave: C[1] || (C[1] = ($) => n.value = !1)
        }, [
          S.$slots.logo ? (_(), k("div", i5, [
            kt(S.$slots, "logo", { expanded: n.value }, void 0, !0)
          ])) : z("", !0),
          r("nav", l5, [
            (_(!0), k(U, null, at(e.sections, ($) => (_(), k("button", {
              key: $.id,
              type: "button",
              "aria-current": e.selectedSectionId === $.id ? "true" : void 0,
              title: $.label,
              class: H(["group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20", x($)]),
              onClick: (L) => m($)
            }, [
              $.icon ? (_(), nt(je($.icon), {
                key: 0,
                class: "shrink-0",
                style: mt({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : z("", !0),
              r("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: mt({ fontSize: e.primaryFontSize })
              }, A($.label), 5)
            ], 10, r5))), 128))
          ]),
          S.$slots.footer ? (_(), k("div", c5, [
            kt(S.$slots, "footer", { expanded: n.value }, void 0, !0)
          ])) : z("", !0)
        ], 36),
        R(un, { name: "ksn-sub" }, {
          default: P(() => [
            g.value ? (_(), k("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: mt({ width: e.secondaryWidth })
            }, [
              r("div", d5, [
                r("p", u5, A(g.value.label), 1)
              ]),
              r("nav", h5, [
                (_(!0), k(U, null, at(g.value.items, ($) => (_(), k("button", {
                  key: $.id,
                  type: "button",
                  "data-nav-id": $.id,
                  "aria-current": y($) ? "page" : void 0,
                  class: H(["group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20", w($)]),
                  onClick: (L) => v(g.value, $)
                }, [
                  $.icon ? (_(), nt(je($.icon), {
                    key: 0,
                    style: mt({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : z("", !0),
                  r("span", {
                    class: "truncate",
                    style: mt({ fontSize: e.secondaryFontSize })
                  }, A($.label), 5)
                ], 10, f5))), 128))
              ])
            ], 4)) : z("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), w5 = /* @__PURE__ */ it(k5, [["__scopeId", "data-v-b37426de"]]), E5 = {
  install(e) {
    e.component("KiutChartBar", he), e.component("KiutChartLine", Se), e.component("KiutPieChart", aa), e.component("KiutBoxplotChart", Ih), e.component("KiutCandlestickChart", Mi), e.component("KiutHistogramChart", Di), e.component("KiutSankeyChart", Me), e.component("KiutAgentsPerDay", dp), e.component("KiutBookingManager", zp), e.component("KiutCheckin", Jp), e.component("KiutCheckinContainer", Xm), e.component("KiutCheckinMetrics", mm), e.component("KiutCheckinSegments", Ei), e.component("KiutDisruption", g0), e.component("KiutFAQ", x0), e.component("KiutMessagesPerAgent", B0), e.component("KiutRecordLocator", Fi), e.component("KiutSalesByChannel", Ii), e.component("KiutSeller", Pi), e.component("KiutSellerContainer", yb), e.component("KiutTopAgents", Mb), e.component("KiutPaymentMethod", Xb), e.component("KiutAgentHumanConversations", Uv), e.component("KiutChannelMetrics", sy), e.component("KiutTriageCombinations", yy), e.component("KiutSelectLanguage", Sy), e.component("KiutGuardrails", Ry), e.component("KiutDisruptionNotifier", s1), e.component("KiutTotalConversationsCard", c1), e.component("KiutCsatP95Card", g1), e.component("KiutCSATContainer", U1), e.component("KiutAiGeneratedRevenueCard", J1), e.component("KiutNpsDailyMetrics", zi), e.component("KiutNpsMetrics", Vi), e.component("KiutNpsOverviewMetrics", Oi), e.component("KiutAWSCost", c_), e.component("KiutCostUsage", __), e.component("KiutTokenUsage", B_), e.component("KiutConversationCount", W_), e.component("KiutTopAgentsAnalysis", ex), e.component("KiutTopAgentsPie", ux), e.component("KiutDailyCostTrends", xx), e.component("KiutModelUsage", Px), e.component("KiutMessageRoles", qx), e.component("KiutCostPerConversations", ak), e.component("Tabs", Ni), e.component("Table", Ri), e.component("Filters", Pk), e.component("InputText", Wk), e.component("InputTextarea", Kk), e.component("InputFile", e2), e.component("InputDateTime", l2), e.component("InputTime", f2), e.component("InputRange", M2), e.component("InputNumber", L2), e.component("InputColorPicker", N2), e.component("Select", Hi), e.component("MultiSelect", tw), e.component("Toggle", aw), e.component("InputPhone", uw), e.component("SelectablePills", vw), e.component("SegmentedControl", kw), e.component("DateRangePicker", Ow), e.component("Tag", Rt), e.component("Button", Wn), e.component("Modal", Zw), e.component("Section", s5), e.component("KiutAppShellNavigation", w5);
  }
};
export {
  c_ as AWSCost,
  Uv as AgentHumanConversations,
  dp as AgentsPerDay,
  J1 as AiGeneratedRevenueCard,
  w5 as AppShellNavigation,
  zp as BookingManager,
  Ih as BoxplotChart,
  Wn as Button,
  U1 as CSATContainer,
  Mi as CandlestickChart,
  sy as ChannelMetrics,
  he as ChartBar,
  Se as ChartLine,
  Jp as Checkin,
  Xm as CheckinContainer,
  mm as CheckinMetrics,
  Ei as CheckinSegments,
  W_ as ConversationCount,
  ak as CostPerConversations,
  __ as CostUsage,
  g1 as CsatP95Card,
  xx as DailyCostTrends,
  Ow as DateRangePicker,
  g0 as Disruption,
  s1 as DisruptionNotifier,
  x0 as FAQ,
  Pk as Filters,
  Ry as Guardrails,
  Di as HistogramChart,
  N2 as InputColorPicker,
  l2 as InputDateTime,
  e2 as InputFile,
  L2 as InputNumber,
  uw as InputPhone,
  M2 as InputRange,
  Wk as InputText,
  Kk as InputTextarea,
  f2 as InputTime,
  E5 as KiutUIPlugin,
  qx as MessageRoles,
  B0 as MessagesPerAgent,
  Zw as Modal,
  Px as ModelUsage,
  tw as MultiSelect,
  zi as NpsDailyMetrics,
  Vi as NpsMetrics,
  Oi as NpsOverviewMetrics,
  Xb as PaymentMethod,
  aa as PieChart,
  Fi as RecordLocator,
  Ii as SalesByChannel,
  Me as SankeyChart,
  s5 as Section,
  kw as SegmentedControl,
  Hi as Select,
  Sy as SelectLanguage,
  vw as SelectablePills,
  Pi as Seller,
  yb as SellerContainer,
  Ri as Table,
  Ni as Tabs,
  Rt as Tag,
  aw as Toggle,
  B_ as TokenUsage,
  Mb as TopAgents,
  ex as TopAgentsAnalysis,
  ux as TopAgentsPie,
  c1 as TotalConversationsCard,
  yy as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
