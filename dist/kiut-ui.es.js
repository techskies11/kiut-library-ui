import { defineComponent as J, shallowRef as Ns, h as La, ref as ot, onMounted as te, onUnmounted as ue, watch as Bt, toRaw as Fa, nextTick as Ot, version as ul, isProxy as Ws, computed as C, toRef as pt, openBlock as b, createElementBlock as k, createVNode as V, unref as L, createElementVNode as u, Fragment as G, renderList as it, normalizeStyle as yt, normalizeClass as U, toDisplayString as A, createCommentVNode as O, onBeforeUnmount as js, createStaticVNode as go, withDirectives as Jt, vShow as an, useSlots as Na, renderSlot as wt, Comment as hl, createBlock as q, resolveDynamicComponent as tn, withCtx as I, createTextVNode as _t, vModelSelect as fl, Transition as xn, Teleport as Wa, withModifiers as ae, withKeys as $n, vModelText as Ke, useAttrs as da, inject as Hs, mergeProps as on } from "vue";
import * as po from "echarts/core";
import { TooltipComponent as gl, TitleComponent as pl } from "echarts/components";
import { SankeyChart as ml } from "echarts/charts";
import { CanvasRenderer as bl } from "echarts/renderers";
import Rt from "moment";
function En(t) {
  return t + 0.5 | 0;
}
const Ae = (t, e, n) => Math.max(Math.min(t, n), e);
function bn(t) {
  return Ae(En(t * 2.55), 0, 255);
}
function Ee(t) {
  return Ae(En(t * 255), 0, 255);
}
function ke(t) {
  return Ae(En(t / 2.55) / 100, 0, 1);
}
function mo(t) {
  return Ae(En(t * 100), 0, 100);
}
const se = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Pa = [..."0123456789ABCDEF"], vl = (t) => Pa[t & 15], yl = (t) => Pa[(t & 240) >> 4] + Pa[t & 15], On = (t) => (t & 240) >> 4 === (t & 15), xl = (t) => On(t.r) && On(t.g) && On(t.b) && On(t.a);
function _l(t) {
  var e = t.length, n;
  return t[0] === "#" && (e === 4 || e === 5 ? n = {
    r: 255 & se[t[1]] * 17,
    g: 255 & se[t[2]] * 17,
    b: 255 & se[t[3]] * 17,
    a: e === 5 ? se[t[4]] * 17 : 255
  } : (e === 7 || e === 9) && (n = {
    r: se[t[1]] << 4 | se[t[2]],
    g: se[t[3]] << 4 | se[t[4]],
    b: se[t[5]] << 4 | se[t[6]],
    a: e === 9 ? se[t[7]] << 4 | se[t[8]] : 255
  })), n;
}
const kl = (t, e) => t < 255 ? e(t) : "";
function wl(t) {
  var e = xl(t) ? vl : yl;
  return t ? "#" + e(t.r) + e(t.g) + e(t.b) + kl(t.a, e) : void 0;
}
const Cl = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Ys(t, e, n) {
  const a = e * Math.min(n, 1 - n), o = (s, i = (s + t / 30) % 12) => n - a * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [o(0), o(8), o(4)];
}
function $l(t, e, n) {
  const a = (o, s = (o + t / 60) % 6) => n - n * e * Math.max(Math.min(s, 4 - s, 1), 0);
  return [a(5), a(3), a(1)];
}
function Ml(t, e, n) {
  const a = Ys(t, 1, 0.5);
  let o;
  for (e + n > 1 && (o = 1 / (e + n), e *= o, n *= o), o = 0; o < 3; o++)
    a[o] *= 1 - e - n, a[o] += e;
  return a;
}
function Sl(t, e, n, a, o) {
  return t === o ? (e - n) / a + (e < n ? 6 : 0) : e === o ? (n - t) / a + 2 : (t - e) / a + 4;
}
function ja(t) {
  const n = t.r / 255, a = t.g / 255, o = t.b / 255, s = Math.max(n, a, o), i = Math.min(n, a, o), l = (s + i) / 2;
  let r, c, d;
  return s !== i && (d = s - i, c = l > 0.5 ? d / (2 - s - i) : d / (s + i), r = Sl(n, a, o, d, s), r = r * 60 + 0.5), [r | 0, c || 0, l];
}
function Ha(t, e, n, a) {
  return (Array.isArray(e) ? t(e[0], e[1], e[2]) : t(e, n, a)).map(Ee);
}
function Ya(t, e, n) {
  return Ha(Ys, t, e, n);
}
function Dl(t, e, n) {
  return Ha(Ml, t, e, n);
}
function Al(t, e, n) {
  return Ha($l, t, e, n);
}
function Ks(t) {
  return (t % 360 + 360) % 360;
}
function Tl(t) {
  const e = Cl.exec(t);
  let n = 255, a;
  if (!e)
    return;
  e[5] !== a && (n = e[6] ? bn(+e[5]) : Ee(+e[5]));
  const o = Ks(+e[2]), s = +e[3] / 100, i = +e[4] / 100;
  return e[1] === "hwb" ? a = Dl(o, s, i) : e[1] === "hsv" ? a = Al(o, s, i) : a = Ya(o, s, i), {
    r: a[0],
    g: a[1],
    b: a[2],
    a: n
  };
}
function Bl(t, e) {
  var n = ja(t);
  n[0] = Ks(n[0] + e), n = Ya(n), t.r = n[0], t.g = n[1], t.b = n[2];
}
function Ll(t) {
  if (!t)
    return;
  const e = ja(t), n = e[0], a = mo(e[1]), o = mo(e[2]);
  return t.a < 255 ? `hsla(${n}, ${a}%, ${o}%, ${ke(t.a)})` : `hsl(${n}, ${a}%, ${o}%)`;
}
const bo = {
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
}, vo = {
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
function Fl() {
  const t = {}, e = Object.keys(vo), n = Object.keys(bo);
  let a, o, s, i, l;
  for (a = 0; a < e.length; a++) {
    for (i = l = e[a], o = 0; o < n.length; o++)
      s = n[o], l = l.replace(s, bo[s]);
    s = parseInt(vo[i], 16), t[l] = [s >> 16 & 255, s >> 8 & 255, s & 255];
  }
  return t;
}
let Vn;
function Pl(t) {
  Vn || (Vn = Fl(), Vn.transparent = [0, 0, 0, 0]);
  const e = Vn[t.toLowerCase()];
  return e && {
    r: e[0],
    g: e[1],
    b: e[2],
    a: e.length === 4 ? e[3] : 255
  };
}
const El = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Il(t) {
  const e = El.exec(t);
  let n = 255, a, o, s;
  if (e) {
    if (e[7] !== a) {
      const i = +e[7];
      n = e[8] ? bn(i) : Ae(i * 255, 0, 255);
    }
    return a = +e[1], o = +e[3], s = +e[5], a = 255 & (e[2] ? bn(a) : Ae(a, 0, 255)), o = 255 & (e[4] ? bn(o) : Ae(o, 0, 255)), s = 255 & (e[6] ? bn(s) : Ae(s, 0, 255)), {
      r: a,
      g: o,
      b: s,
      a: n
    };
  }
}
function Rl(t) {
  return t && (t.a < 255 ? `rgba(${t.r}, ${t.g}, ${t.b}, ${ke(t.a)})` : `rgb(${t.r}, ${t.g}, ${t.b})`);
}
const ma = (t) => t <= 31308e-7 ? t * 12.92 : Math.pow(t, 1 / 2.4) * 1.055 - 0.055, Ze = (t) => t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
function Ol(t, e, n) {
  const a = Ze(ke(t.r)), o = Ze(ke(t.g)), s = Ze(ke(t.b));
  return {
    r: Ee(ma(a + n * (Ze(ke(e.r)) - a))),
    g: Ee(ma(o + n * (Ze(ke(e.g)) - o))),
    b: Ee(ma(s + n * (Ze(ke(e.b)) - s))),
    a: t.a + n * (e.a - t.a)
  };
}
function zn(t, e, n) {
  if (t) {
    let a = ja(t);
    a[e] = Math.max(0, Math.min(a[e] + a[e] * n, e === 0 ? 360 : 1)), a = Ya(a), t.r = a[0], t.g = a[1], t.b = a[2];
  }
}
function Us(t, e) {
  return t && Object.assign(e || {}, t);
}
function yo(t) {
  var e = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(t) ? t.length >= 3 && (e = { r: t[0], g: t[1], b: t[2], a: 255 }, t.length > 3 && (e.a = Ee(t[3]))) : (e = Us(t, { r: 0, g: 0, b: 0, a: 1 }), e.a = Ee(e.a)), e;
}
function Vl(t) {
  return t.charAt(0) === "r" ? Il(t) : Tl(t);
}
class Mn {
  constructor(e) {
    if (e instanceof Mn)
      return e;
    const n = typeof e;
    let a;
    n === "object" ? a = yo(e) : n === "string" && (a = _l(e) || Pl(e) || Vl(e)), this._rgb = a, this._valid = !!a;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var e = Us(this._rgb);
    return e && (e.a = ke(e.a)), e;
  }
  set rgb(e) {
    this._rgb = yo(e);
  }
  rgbString() {
    return this._valid ? Rl(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? wl(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? Ll(this._rgb) : void 0;
  }
  mix(e, n) {
    if (e) {
      const a = this.rgb, o = e.rgb;
      let s;
      const i = n === s ? 0.5 : n, l = 2 * i - 1, r = a.a - o.a, c = ((l * r === -1 ? l : (l + r) / (1 + l * r)) + 1) / 2;
      s = 1 - c, a.r = 255 & c * a.r + s * o.r + 0.5, a.g = 255 & c * a.g + s * o.g + 0.5, a.b = 255 & c * a.b + s * o.b + 0.5, a.a = i * a.a + (1 - i) * o.a, this.rgb = a;
    }
    return this;
  }
  interpolate(e, n) {
    return e && (this._rgb = Ol(this._rgb, e._rgb, n)), this;
  }
  clone() {
    return new Mn(this.rgb);
  }
  alpha(e) {
    return this._rgb.a = Ee(e), this;
  }
  clearer(e) {
    const n = this._rgb;
    return n.a *= 1 - e, this;
  }
  greyscale() {
    const e = this._rgb, n = En(e.r * 0.3 + e.g * 0.59 + e.b * 0.11);
    return e.r = e.g = e.b = n, this;
  }
  opaquer(e) {
    const n = this._rgb;
    return n.a *= 1 + e, this;
  }
  negate() {
    const e = this._rgb;
    return e.r = 255 - e.r, e.g = 255 - e.g, e.b = 255 - e.b, this;
  }
  lighten(e) {
    return zn(this._rgb, 2, e), this;
  }
  darken(e) {
    return zn(this._rgb, 2, -e), this;
  }
  saturate(e) {
    return zn(this._rgb, 1, e), this;
  }
  desaturate(e) {
    return zn(this._rgb, 1, -e), this;
  }
  rotate(e) {
    return Bl(this._rgb, e), this;
  }
}
function ye() {
}
const zl = /* @__PURE__ */ (() => {
  let t = 0;
  return () => t++;
})();
function $t(t) {
  return t == null;
}
function Vt(t) {
  if (Array.isArray && Array.isArray(t))
    return !0;
  const e = Object.prototype.toString.call(t);
  return e.slice(0, 7) === "[object" && e.slice(-6) === "Array]";
}
function kt(t) {
  return t !== null && Object.prototype.toString.call(t) === "[object Object]";
}
function le(t) {
  return (typeof t == "number" || t instanceof Number) && isFinite(+t);
}
function fe(t, e) {
  return le(t) ? t : e;
}
function ht(t, e) {
  return typeof t > "u" ? e : t;
}
const Nl = (t, e) => typeof t == "string" && t.endsWith("%") ? parseFloat(t) / 100 : +t / e, qs = (t, e) => typeof t == "string" && t.endsWith("%") ? parseFloat(t) / 100 * e : +t;
function Tt(t, e, n) {
  if (t && typeof t.call == "function")
    return t.apply(n, e);
}
function Mt(t, e, n, a) {
  let o, s, i;
  if (Vt(t))
    for (s = t.length, o = 0; o < s; o++)
      e.call(n, t[o], o);
  else if (kt(t))
    for (i = Object.keys(t), s = i.length, o = 0; o < s; o++)
      e.call(n, t[i[o]], i[o]);
}
function na(t, e) {
  let n, a, o, s;
  if (!t || !e || t.length !== e.length)
    return !1;
  for (n = 0, a = t.length; n < a; ++n)
    if (o = t[n], s = e[n], o.datasetIndex !== s.datasetIndex || o.index !== s.index)
      return !1;
  return !0;
}
function aa(t) {
  if (Vt(t))
    return t.map(aa);
  if (kt(t)) {
    const e = /* @__PURE__ */ Object.create(null), n = Object.keys(t), a = n.length;
    let o = 0;
    for (; o < a; ++o)
      e[n[o]] = aa(t[n[o]]);
    return e;
  }
  return t;
}
function Xs(t) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(t) === -1;
}
function Wl(t, e, n, a) {
  if (!Xs(t))
    return;
  const o = e[t], s = n[t];
  kt(o) && kt(s) ? Sn(o, s, a) : e[t] = aa(s);
}
function Sn(t, e, n) {
  const a = Vt(e) ? e : [
    e
  ], o = a.length;
  if (!kt(t))
    return t;
  n = n || {};
  const s = n.merger || Wl;
  let i;
  for (let l = 0; l < o; ++l) {
    if (i = a[l], !kt(i))
      continue;
    const r = Object.keys(i);
    for (let c = 0, d = r.length; c < d; ++c)
      s(r[c], t, i, n);
  }
  return t;
}
function _n(t, e) {
  return Sn(t, e, {
    merger: jl
  });
}
function jl(t, e, n) {
  if (!Xs(t))
    return;
  const a = e[t], o = n[t];
  kt(a) && kt(o) ? _n(a, o) : Object.prototype.hasOwnProperty.call(e, t) || (e[t] = aa(o));
}
const xo = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (t) => t,
  // default resolvers
  x: (t) => t.x,
  y: (t) => t.y
};
function Hl(t) {
  const e = t.split("."), n = [];
  let a = "";
  for (const o of e)
    a += o, a.endsWith("\\") ? a = a.slice(0, -1) + "." : (n.push(a), a = "");
  return n;
}
function Yl(t) {
  const e = Hl(t);
  return (n) => {
    for (const a of e) {
      if (a === "")
        break;
      n = n && n[a];
    }
    return n;
  };
}
function qe(t, e) {
  return (xo[e] || (xo[e] = Yl(e)))(t);
}
function Ka(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
const Dn = (t) => typeof t < "u", Re = (t) => typeof t == "function", _o = (t, e) => {
  if (t.size !== e.size)
    return !1;
  for (const n of t)
    if (!e.has(n))
      return !1;
  return !0;
};
function Kl(t) {
  return t.type === "mouseup" || t.type === "click" || t.type === "contextmenu";
}
const St = Math.PI, Pt = 2 * St, Ul = Pt + St, oa = Number.POSITIVE_INFINITY, ql = St / 180, zt = St / 2, ze = St / 4, ko = St * 2 / 3, Gs = Math.log10, me = Math.sign;
function kn(t, e, n) {
  return Math.abs(t - e) < n;
}
function wo(t) {
  const e = Math.round(t);
  t = kn(t, e, t / 1e3) ? e : t;
  const n = Math.pow(10, Math.floor(Gs(t))), a = t / n;
  return (a <= 1 ? 1 : a <= 2 ? 2 : a <= 5 ? 5 : 10) * n;
}
function Xl(t) {
  const e = [], n = Math.sqrt(t);
  let a;
  for (a = 1; a < n; a++)
    t % a === 0 && (e.push(a), e.push(t / a));
  return n === (n | 0) && e.push(n), e.sort((o, s) => o - s).pop(), e;
}
function Gl(t) {
  return typeof t == "symbol" || typeof t == "object" && t !== null && !(Symbol.toPrimitive in t || "toString" in t || "valueOf" in t);
}
function An(t) {
  return !Gl(t) && !isNaN(parseFloat(t)) && isFinite(t);
}
function Zl(t, e) {
  const n = Math.round(t);
  return n - e <= t && n + e >= t;
}
function Ql(t, e, n) {
  let a, o, s;
  for (a = 0, o = t.length; a < o; a++)
    s = t[a][n], isNaN(s) || (e.min = Math.min(e.min, s), e.max = Math.max(e.max, s));
}
function we(t) {
  return t * (St / 180);
}
function Jl(t) {
  return t * (180 / St);
}
function Co(t) {
  if (!le(t))
    return;
  let e = 1, n = 0;
  for (; Math.round(t * e) / e !== t; )
    e *= 10, n++;
  return n;
}
function Zs(t, e) {
  const n = e.x - t.x, a = e.y - t.y, o = Math.sqrt(n * n + a * a);
  let s = Math.atan2(a, n);
  return s < -0.5 * St && (s += Pt), {
    angle: s,
    distance: o
  };
}
function Ea(t, e) {
  return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}
function tr(t, e) {
  return (t - e + Ul) % Pt - St;
}
function de(t) {
  return (t % Pt + Pt) % Pt;
}
function Tn(t, e, n, a) {
  const o = de(t), s = de(e), i = de(n), l = de(s - o), r = de(i - o), c = de(o - s), d = de(o - i);
  return o === s || o === i || a && s === i || l > r && c < d;
}
function Kt(t, e, n) {
  return Math.max(e, Math.min(n, t));
}
function er(t) {
  return Kt(t, -32768, 32767);
}
function Te(t, e, n, a = 1e-6) {
  return t >= Math.min(e, n) - a && t <= Math.max(e, n) + a;
}
function Ua(t, e, n) {
  n = n || ((i) => t[i] < e);
  let a = t.length - 1, o = 0, s;
  for (; a - o > 1; )
    s = o + a >> 1, n(s) ? o = s : a = s;
  return {
    lo: o,
    hi: a
  };
}
const Ye = (t, e, n, a) => Ua(t, n, a ? (o) => {
  const s = t[o][e];
  return s < n || s === n && t[o + 1][e] === n;
} : (o) => t[o][e] < n), nr = (t, e, n) => Ua(t, n, (a) => t[a][e] >= n);
function ar(t, e, n) {
  let a = 0, o = t.length;
  for (; a < o && t[a] < e; )
    a++;
  for (; o > a && t[o - 1] > n; )
    o--;
  return a > 0 || o < t.length ? t.slice(a, o) : t;
}
const Qs = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function or(t, e) {
  if (t._chartjs) {
    t._chartjs.listeners.push(e);
    return;
  }
  Object.defineProperty(t, "_chartjs", {
    configurable: !0,
    enumerable: !1,
    value: {
      listeners: [
        e
      ]
    }
  }), Qs.forEach((n) => {
    const a = "_onData" + Ka(n), o = t[n];
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      value(...s) {
        const i = o.apply(this, s);
        return t._chartjs.listeners.forEach((l) => {
          typeof l[a] == "function" && l[a](...s);
        }), i;
      }
    });
  });
}
function $o(t, e) {
  const n = t._chartjs;
  if (!n)
    return;
  const a = n.listeners, o = a.indexOf(e);
  o !== -1 && a.splice(o, 1), !(a.length > 0) && (Qs.forEach((s) => {
    delete t[s];
  }), delete t._chartjs);
}
function Js(t) {
  const e = new Set(t);
  return e.size === t.length ? t : Array.from(e);
}
const ti = (function() {
  return typeof window > "u" ? function(t) {
    return t();
  } : window.requestAnimationFrame;
})();
function ei(t, e) {
  let n = [], a = !1;
  return function(...o) {
    n = o, a || (a = !0, ti.call(window, () => {
      a = !1, t.apply(e, n);
    }));
  };
}
function sr(t, e) {
  let n;
  return function(...a) {
    return e ? (clearTimeout(n), n = setTimeout(t, e, a)) : t.apply(this, a), e;
  };
}
const qa = (t) => t === "start" ? "left" : t === "end" ? "right" : "center", Ht = (t, e, n) => t === "start" ? e : t === "end" ? n : (e + n) / 2, ir = (t, e, n, a) => t === (a ? "left" : "right") ? n : t === "center" ? (e + n) / 2 : e;
function lr(t, e, n) {
  const a = e.length;
  let o = 0, s = a;
  if (t._sorted) {
    const { iScale: i, vScale: l, _parsed: r } = t, c = t.dataset && t.dataset.options ? t.dataset.options.spanGaps : null, d = i.axis, { min: h, max: p, minDefined: v, maxDefined: f } = i.getUserBounds();
    if (v) {
      if (o = Math.min(
        // @ts-expect-error Need to type _parsed
        Ye(r, d, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? a : Ye(e, d, i.getPixelForValue(h)).lo
      ), c) {
        const y = r.slice(0, o + 1).reverse().findIndex((_) => !$t(_[l.axis]));
        o -= Math.max(0, y);
      }
      o = Kt(o, 0, a - 1);
    }
    if (f) {
      let y = Math.max(
        // @ts-expect-error Need to type _parsed
        Ye(r, i.axis, p, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? 0 : Ye(e, d, i.getPixelForValue(p), !0).hi + 1
      );
      if (c) {
        const _ = r.slice(y - 1).findIndex((m) => !$t(m[l.axis]));
        y += Math.max(0, _);
      }
      s = Kt(y, o, a) - o;
    } else
      s = a - o;
  }
  return {
    start: o,
    count: s
  };
}
function rr(t) {
  const { xScale: e, yScale: n, _scaleRanges: a } = t, o = {
    xmin: e.min,
    xmax: e.max,
    ymin: n.min,
    ymax: n.max
  };
  if (!a)
    return t._scaleRanges = o, !0;
  const s = a.xmin !== e.min || a.xmax !== e.max || a.ymin !== n.min || a.ymax !== n.max;
  return Object.assign(a, o), s;
}
const Nn = (t) => t === 0 || t === 1, Mo = (t, e, n) => -(Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * Pt / n)), So = (t, e, n) => Math.pow(2, -10 * t) * Math.sin((t - e) * Pt / n) + 1, wn = {
  linear: (t) => t,
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => -t * (t - 2),
  easeInOutQuad: (t) => (t /= 0.5) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1),
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => (t -= 1) * t * t + 1,
  easeInOutCubic: (t) => (t /= 0.5) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2),
  easeInQuart: (t) => t * t * t * t,
  easeOutQuart: (t) => -((t -= 1) * t * t * t - 1),
  easeInOutQuart: (t) => (t /= 0.5) < 1 ? 0.5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2),
  easeInQuint: (t) => t * t * t * t * t,
  easeOutQuint: (t) => (t -= 1) * t * t * t * t + 1,
  easeInOutQuint: (t) => (t /= 0.5) < 1 ? 0.5 * t * t * t * t * t : 0.5 * ((t -= 2) * t * t * t * t + 2),
  easeInSine: (t) => -Math.cos(t * zt) + 1,
  easeOutSine: (t) => Math.sin(t * zt),
  easeInOutSine: (t) => -0.5 * (Math.cos(St * t) - 1),
  easeInExpo: (t) => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
  easeOutExpo: (t) => t === 1 ? 1 : -Math.pow(2, -10 * t) + 1,
  easeInOutExpo: (t) => Nn(t) ? t : t < 0.5 ? 0.5 * Math.pow(2, 10 * (t * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (t * 2 - 1)) + 2),
  easeInCirc: (t) => t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1),
  easeOutCirc: (t) => Math.sqrt(1 - (t -= 1) * t),
  easeInOutCirc: (t) => (t /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1),
  easeInElastic: (t) => Nn(t) ? t : Mo(t, 0.075, 0.3),
  easeOutElastic: (t) => Nn(t) ? t : So(t, 0.075, 0.3),
  easeInOutElastic(t) {
    return Nn(t) ? t : t < 0.5 ? 0.5 * Mo(t * 2, 0.1125, 0.45) : 0.5 + 0.5 * So(t * 2 - 1, 0.1125, 0.45);
  },
  easeInBack(t) {
    return t * t * ((1.70158 + 1) * t - 1.70158);
  },
  easeOutBack(t) {
    return (t -= 1) * t * ((1.70158 + 1) * t + 1.70158) + 1;
  },
  easeInOutBack(t) {
    let e = 1.70158;
    return (t /= 0.5) < 1 ? 0.5 * (t * t * (((e *= 1.525) + 1) * t - e)) : 0.5 * ((t -= 2) * t * (((e *= 1.525) + 1) * t + e) + 2);
  },
  easeInBounce: (t) => 1 - wn.easeOutBounce(1 - t),
  easeOutBounce(t) {
    return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
  },
  easeInOutBounce: (t) => t < 0.5 ? wn.easeInBounce(t * 2) * 0.5 : wn.easeOutBounce(t * 2 - 1) * 0.5 + 0.5
};
function Xa(t) {
  if (t && typeof t == "object") {
    const e = t.toString();
    return e === "[object CanvasPattern]" || e === "[object CanvasGradient]";
  }
  return !1;
}
function Do(t) {
  return Xa(t) ? t : new Mn(t);
}
function ba(t) {
  return Xa(t) ? t : new Mn(t).saturate(0.5).darken(0.1).hexString();
}
const cr = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], dr = [
  "color",
  "borderColor",
  "backgroundColor"
];
function ur(t) {
  t.set("animation", {
    delay: void 0,
    duration: 1e3,
    easing: "easeOutQuart",
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0
  }), t.describe("animation", {
    _fallback: !1,
    _indexable: !1,
    _scriptable: (e) => e !== "onProgress" && e !== "onComplete" && e !== "fn"
  }), t.set("animations", {
    colors: {
      type: "color",
      properties: dr
    },
    numbers: {
      type: "number",
      properties: cr
    }
  }), t.describe("animations", {
    _fallback: "animation"
  }), t.set("transitions", {
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
          fn: (e) => e | 0
        }
      }
    }
  });
}
function hr(t) {
  t.set("layout", {
    autoPadding: !0,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
}
const Ao = /* @__PURE__ */ new Map();
function fr(t, e) {
  e = e || {};
  const n = t + JSON.stringify(e);
  let a = Ao.get(n);
  return a || (a = new Intl.NumberFormat(t, e), Ao.set(n, a)), a;
}
function Ga(t, e, n) {
  return fr(e, n).format(t);
}
const gr = {
  values(t) {
    return Vt(t) ? t : "" + t;
  },
  numeric(t, e, n) {
    if (t === 0)
      return "0";
    const a = this.chart.options.locale;
    let o, s = t;
    if (n.length > 1) {
      const c = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
      (c < 1e-4 || c > 1e15) && (o = "scientific"), s = pr(t, n);
    }
    const i = Gs(Math.abs(s)), l = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), r = {
      notation: o,
      minimumFractionDigits: l,
      maximumFractionDigits: l
    };
    return Object.assign(r, this.options.ticks.format), Ga(t, a, r);
  }
};
function pr(t, e) {
  let n = e.length > 3 ? e[2].value - e[1].value : e[1].value - e[0].value;
  return Math.abs(n) >= 1 && t !== Math.floor(t) && (n = t - Math.floor(t)), n;
}
var ni = {
  formatters: gr
};
function mr(t) {
  t.set("scale", {
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
      tickWidth: (e, n) => n.lineWidth,
      tickColor: (e, n) => n.color,
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
      callback: ni.formatters.values,
      minor: {},
      major: {},
      align: "center",
      crossAlign: "near",
      showLabelBackdrop: !1,
      backdropColor: "rgba(255, 255, 255, 0.75)",
      backdropPadding: 2
    }
  }), t.route("scale.ticks", "color", "", "color"), t.route("scale.grid", "color", "", "borderColor"), t.route("scale.border", "color", "", "borderColor"), t.route("scale.title", "color", "", "color"), t.describe("scale", {
    _fallback: !1,
    _scriptable: (e) => !e.startsWith("before") && !e.startsWith("after") && e !== "callback" && e !== "parser",
    _indexable: (e) => e !== "borderDash" && e !== "tickBorderDash" && e !== "dash"
  }), t.describe("scales", {
    _fallback: "scale"
  }), t.describe("scale.ticks", {
    _scriptable: (e) => e !== "backdropPadding" && e !== "callback",
    _indexable: (e) => e !== "backdropPadding"
  });
}
const Xe = /* @__PURE__ */ Object.create(null), Ia = /* @__PURE__ */ Object.create(null);
function Cn(t, e) {
  if (!e)
    return t;
  const n = e.split(".");
  for (let a = 0, o = n.length; a < o; ++a) {
    const s = n[a];
    t = t[s] || (t[s] = /* @__PURE__ */ Object.create(null));
  }
  return t;
}
function va(t, e, n) {
  return typeof e == "string" ? Sn(Cn(t, e), n) : Sn(Cn(t, ""), e);
}
class br {
  constructor(e, n) {
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
    }, this.hover = {}, this.hoverBackgroundColor = (a, o) => ba(o.backgroundColor), this.hoverBorderColor = (a, o) => ba(o.borderColor), this.hoverColor = (a, o) => ba(o.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(e), this.apply(n);
  }
  set(e, n) {
    return va(this, e, n);
  }
  get(e) {
    return Cn(this, e);
  }
  describe(e, n) {
    return va(Ia, e, n);
  }
  override(e, n) {
    return va(Xe, e, n);
  }
  route(e, n, a, o) {
    const s = Cn(this, e), i = Cn(this, a), l = "_" + n;
    Object.defineProperties(s, {
      [l]: {
        value: s[n],
        writable: !0
      },
      [n]: {
        enumerable: !0,
        get() {
          const r = this[l], c = i[o];
          return kt(r) ? Object.assign({}, c, r) : ht(r, c);
        },
        set(r) {
          this[l] = r;
        }
      }
    });
  }
  apply(e) {
    e.forEach((n) => n(this));
  }
}
var It = /* @__PURE__ */ new br({
  _scriptable: (t) => !t.startsWith("on"),
  _indexable: (t) => t !== "events",
  hover: {
    _fallback: "interaction"
  },
  interaction: {
    _scriptable: !1,
    _indexable: !1
  }
}, [
  ur,
  hr,
  mr
]);
function vr(t) {
  return !t || $t(t.size) || $t(t.family) ? null : (t.style ? t.style + " " : "") + (t.weight ? t.weight + " " : "") + t.size + "px " + t.family;
}
function To(t, e, n, a, o) {
  let s = e[o];
  return s || (s = e[o] = t.measureText(o).width, n.push(o)), s > a && (a = s), a;
}
function Ne(t, e, n) {
  const a = t.currentDevicePixelRatio, o = n !== 0 ? Math.max(n / 2, 0.5) : 0;
  return Math.round((e - o) * a) / a + o;
}
function Bo(t, e) {
  !e && !t || (e = e || t.getContext("2d"), e.save(), e.resetTransform(), e.clearRect(0, 0, t.width, t.height), e.restore());
}
function Ra(t, e, n, a) {
  ai(t, e, n, a, null);
}
function ai(t, e, n, a, o) {
  let s, i, l, r, c, d, h, p;
  const v = e.pointStyle, f = e.rotation, y = e.radius;
  let _ = (f || 0) * ql;
  if (v && typeof v == "object" && (s = v.toString(), s === "[object HTMLImageElement]" || s === "[object HTMLCanvasElement]")) {
    t.save(), t.translate(n, a), t.rotate(_), t.drawImage(v, -v.width / 2, -v.height / 2, v.width, v.height), t.restore();
    return;
  }
  if (!(isNaN(y) || y <= 0)) {
    switch (t.beginPath(), v) {
      // Default includes circle
      default:
        o ? t.ellipse(n, a, o / 2, y, 0, 0, Pt) : t.arc(n, a, y, 0, Pt), t.closePath();
        break;
      case "triangle":
        d = o ? o / 2 : y, t.moveTo(n + Math.sin(_) * d, a - Math.cos(_) * y), _ += ko, t.lineTo(n + Math.sin(_) * d, a - Math.cos(_) * y), _ += ko, t.lineTo(n + Math.sin(_) * d, a - Math.cos(_) * y), t.closePath();
        break;
      case "rectRounded":
        c = y * 0.516, r = y - c, i = Math.cos(_ + ze) * r, h = Math.cos(_ + ze) * (o ? o / 2 - c : r), l = Math.sin(_ + ze) * r, p = Math.sin(_ + ze) * (o ? o / 2 - c : r), t.arc(n - h, a - l, c, _ - St, _ - zt), t.arc(n + p, a - i, c, _ - zt, _), t.arc(n + h, a + l, c, _, _ + zt), t.arc(n - p, a + i, c, _ + zt, _ + St), t.closePath();
        break;
      case "rect":
        if (!f) {
          r = Math.SQRT1_2 * y, d = o ? o / 2 : r, t.rect(n - d, a - r, 2 * d, 2 * r);
          break;
        }
        _ += ze;
      /* falls through */
      case "rectRot":
        h = Math.cos(_) * (o ? o / 2 : y), i = Math.cos(_) * y, l = Math.sin(_) * y, p = Math.sin(_) * (o ? o / 2 : y), t.moveTo(n - h, a - l), t.lineTo(n + p, a - i), t.lineTo(n + h, a + l), t.lineTo(n - p, a + i), t.closePath();
        break;
      case "crossRot":
        _ += ze;
      /* falls through */
      case "cross":
        h = Math.cos(_) * (o ? o / 2 : y), i = Math.cos(_) * y, l = Math.sin(_) * y, p = Math.sin(_) * (o ? o / 2 : y), t.moveTo(n - h, a - l), t.lineTo(n + h, a + l), t.moveTo(n + p, a - i), t.lineTo(n - p, a + i);
        break;
      case "star":
        h = Math.cos(_) * (o ? o / 2 : y), i = Math.cos(_) * y, l = Math.sin(_) * y, p = Math.sin(_) * (o ? o / 2 : y), t.moveTo(n - h, a - l), t.lineTo(n + h, a + l), t.moveTo(n + p, a - i), t.lineTo(n - p, a + i), _ += ze, h = Math.cos(_) * (o ? o / 2 : y), i = Math.cos(_) * y, l = Math.sin(_) * y, p = Math.sin(_) * (o ? o / 2 : y), t.moveTo(n - h, a - l), t.lineTo(n + h, a + l), t.moveTo(n + p, a - i), t.lineTo(n - p, a + i);
        break;
      case "line":
        i = o ? o / 2 : Math.cos(_) * y, l = Math.sin(_) * y, t.moveTo(n - i, a - l), t.lineTo(n + i, a + l);
        break;
      case "dash":
        t.moveTo(n, a), t.lineTo(n + Math.cos(_) * (o ? o / 2 : y), a + Math.sin(_) * y);
        break;
      case !1:
        t.closePath();
        break;
    }
    t.fill(), e.borderWidth > 0 && t.stroke();
  }
}
function Bn(t, e, n) {
  return n = n || 0.5, !e || t && t.x > e.left - n && t.x < e.right + n && t.y > e.top - n && t.y < e.bottom + n;
}
function Za(t, e) {
  t.save(), t.beginPath(), t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top), t.clip();
}
function Qa(t) {
  t.restore();
}
function yr(t, e, n, a, o) {
  if (!e)
    return t.lineTo(n.x, n.y);
  if (o === "middle") {
    const s = (e.x + n.x) / 2;
    t.lineTo(s, e.y), t.lineTo(s, n.y);
  } else o === "after" != !!a ? t.lineTo(e.x, n.y) : t.lineTo(n.x, e.y);
  t.lineTo(n.x, n.y);
}
function xr(t, e, n, a) {
  if (!e)
    return t.lineTo(n.x, n.y);
  t.bezierCurveTo(a ? e.cp1x : e.cp2x, a ? e.cp1y : e.cp2y, a ? n.cp2x : n.cp1x, a ? n.cp2y : n.cp1y, n.x, n.y);
}
function _r(t, e) {
  e.translation && t.translate(e.translation[0], e.translation[1]), $t(e.rotation) || t.rotate(e.rotation), e.color && (t.fillStyle = e.color), e.textAlign && (t.textAlign = e.textAlign), e.textBaseline && (t.textBaseline = e.textBaseline);
}
function kr(t, e, n, a, o) {
  if (o.strikethrough || o.underline) {
    const s = t.measureText(a), i = e - s.actualBoundingBoxLeft, l = e + s.actualBoundingBoxRight, r = n - s.actualBoundingBoxAscent, c = n + s.actualBoundingBoxDescent, d = o.strikethrough ? (r + c) / 2 : c;
    t.strokeStyle = t.fillStyle, t.beginPath(), t.lineWidth = o.decorationWidth || 2, t.moveTo(i, d), t.lineTo(l, d), t.stroke();
  }
}
function wr(t, e) {
  const n = t.fillStyle;
  t.fillStyle = e.color, t.fillRect(e.left, e.top, e.width, e.height), t.fillStyle = n;
}
function Ln(t, e, n, a, o, s = {}) {
  const i = Vt(e) ? e : [
    e
  ], l = s.strokeWidth > 0 && s.strokeColor !== "";
  let r, c;
  for (t.save(), t.font = o.string, _r(t, s), r = 0; r < i.length; ++r)
    c = i[r], s.backdrop && wr(t, s.backdrop), l && (s.strokeColor && (t.strokeStyle = s.strokeColor), $t(s.strokeWidth) || (t.lineWidth = s.strokeWidth), t.strokeText(c, n, a, s.maxWidth)), t.fillText(c, n, a, s.maxWidth), kr(t, n, a, c, s), a += Number(o.lineHeight);
  t.restore();
}
function sa(t, e) {
  const { x: n, y: a, w: o, h: s, radius: i } = e;
  t.arc(n + i.topLeft, a + i.topLeft, i.topLeft, 1.5 * St, St, !0), t.lineTo(n, a + s - i.bottomLeft), t.arc(n + i.bottomLeft, a + s - i.bottomLeft, i.bottomLeft, St, zt, !0), t.lineTo(n + o - i.bottomRight, a + s), t.arc(n + o - i.bottomRight, a + s - i.bottomRight, i.bottomRight, zt, 0, !0), t.lineTo(n + o, a + i.topRight), t.arc(n + o - i.topRight, a + i.topRight, i.topRight, 0, -zt, !0), t.lineTo(n + i.topLeft, a);
}
const Cr = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, $r = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Mr(t, e) {
  const n = ("" + t).match(Cr);
  if (!n || n[1] === "normal")
    return e * 1.2;
  switch (t = +n[2], n[3]) {
    case "px":
      return t;
    case "%":
      t /= 100;
      break;
  }
  return e * t;
}
const Sr = (t) => +t || 0;
function Ja(t, e) {
  const n = {}, a = kt(e), o = a ? Object.keys(e) : e, s = kt(t) ? a ? (i) => ht(t[i], t[e[i]]) : (i) => t[i] : () => t;
  for (const i of o)
    n[i] = Sr(s(i));
  return n;
}
function oi(t) {
  return Ja(t, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function en(t) {
  return Ja(t, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function re(t) {
  const e = oi(t);
  return e.width = e.left + e.right, e.height = e.top + e.bottom, e;
}
function Ut(t, e) {
  t = t || {}, e = e || It.font;
  let n = ht(t.size, e.size);
  typeof n == "string" && (n = parseInt(n, 10));
  let a = ht(t.style, e.style);
  a && !("" + a).match($r) && (console.warn('Invalid font style specified: "' + a + '"'), a = void 0);
  const o = {
    family: ht(t.family, e.family),
    lineHeight: Mr(ht(t.lineHeight, e.lineHeight), n),
    size: n,
    style: a,
    weight: ht(t.weight, e.weight),
    string: ""
  };
  return o.string = vr(o), o;
}
function Wn(t, e, n, a) {
  let o, s, i;
  for (o = 0, s = t.length; o < s; ++o)
    if (i = t[o], i !== void 0 && i !== void 0)
      return i;
}
function Dr(t, e, n) {
  const { min: a, max: o } = t, s = qs(e, (o - a) / 2), i = (l, r) => n && l === 0 ? 0 : l + r;
  return {
    min: i(a, -Math.abs(s)),
    max: i(o, s)
  };
}
function Ge(t, e) {
  return Object.assign(Object.create(t), e);
}
function to(t, e = [
  ""
], n, a, o = () => t[0]) {
  const s = n || t;
  typeof a > "u" && (a = ri("_fallback", t));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: t,
    _rootScopes: s,
    _fallback: a,
    _getTarget: o,
    override: (l) => to([
      l,
      ...t
    ], e, s, a)
  };
  return new Proxy(i, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(l, r) {
      return delete l[r], delete l._keys, delete t[0][r], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(l, r) {
      return ii(l, r, () => Ir(r, e, t, l));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(l, r) {
      return Reflect.getOwnPropertyDescriptor(l._scopes[0], r);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(t[0]);
    },
    /**
    * A trap for the in operator.
    */
    has(l, r) {
      return Fo(l).includes(r);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(l) {
      return Fo(l);
    },
    /**
    * A trap for setting property values.
    */
    set(l, r, c) {
      const d = l._storage || (l._storage = o());
      return l[r] = d[r] = c, delete l._keys, !0;
    }
  });
}
function sn(t, e, n, a) {
  const o = {
    _cacheable: !1,
    _proxy: t,
    _context: e,
    _subProxy: n,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: si(t, a),
    setContext: (s) => sn(t, s, n, a),
    override: (s) => sn(t.override(s), e, n, a)
  };
  return new Proxy(o, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(s, i) {
      return delete s[i], delete t[i], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(s, i, l) {
      return ii(s, i, () => Tr(s, i, l));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(s, i) {
      return s._descriptors.allKeys ? Reflect.has(t, i) ? {
        enumerable: !0,
        configurable: !0
      } : void 0 : Reflect.getOwnPropertyDescriptor(t, i);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(t);
    },
    /**
    * A trap for the in operator.
    */
    has(s, i) {
      return Reflect.has(t, i);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys() {
      return Reflect.ownKeys(t);
    },
    /**
    * A trap for setting property values.
    */
    set(s, i, l) {
      return t[i] = l, delete s[i], !0;
    }
  });
}
function si(t, e = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: n = e.scriptable, _indexable: a = e.indexable, _allKeys: o = e.allKeys } = t;
  return {
    allKeys: o,
    scriptable: n,
    indexable: a,
    isScriptable: Re(n) ? n : () => n,
    isIndexable: Re(a) ? a : () => a
  };
}
const Ar = (t, e) => t ? t + Ka(e) : e, eo = (t, e) => kt(e) && t !== "adapters" && (Object.getPrototypeOf(e) === null || e.constructor === Object);
function ii(t, e, n) {
  if (Object.prototype.hasOwnProperty.call(t, e) || e === "constructor")
    return t[e];
  const a = n();
  return t[e] = a, a;
}
function Tr(t, e, n) {
  const { _proxy: a, _context: o, _subProxy: s, _descriptors: i } = t;
  let l = a[e];
  return Re(l) && i.isScriptable(e) && (l = Br(e, l, t, n)), Vt(l) && l.length && (l = Lr(e, l, t, i.isIndexable)), eo(e, l) && (l = sn(l, o, s && s[e], i)), l;
}
function Br(t, e, n, a) {
  const { _proxy: o, _context: s, _subProxy: i, _stack: l } = n;
  if (l.has(t))
    throw new Error("Recursion detected: " + Array.from(l).join("->") + "->" + t);
  l.add(t);
  let r = e(s, i || a);
  return l.delete(t), eo(t, r) && (r = no(o._scopes, o, t, r)), r;
}
function Lr(t, e, n, a) {
  const { _proxy: o, _context: s, _subProxy: i, _descriptors: l } = n;
  if (typeof s.index < "u" && a(t))
    return e[s.index % e.length];
  if (kt(e[0])) {
    const r = e, c = o._scopes.filter((d) => d !== r);
    e = [];
    for (const d of r) {
      const h = no(c, o, t, d);
      e.push(sn(h, s, i && i[t], l));
    }
  }
  return e;
}
function li(t, e, n) {
  return Re(t) ? t(e, n) : t;
}
const Fr = (t, e) => t === !0 ? e : typeof t == "string" ? qe(e, t) : void 0;
function Pr(t, e, n, a, o) {
  for (const s of e) {
    const i = Fr(n, s);
    if (i) {
      t.add(i);
      const l = li(i._fallback, n, o);
      if (typeof l < "u" && l !== n && l !== a)
        return l;
    } else if (i === !1 && typeof a < "u" && n !== a)
      return null;
  }
  return !1;
}
function no(t, e, n, a) {
  const o = e._rootScopes, s = li(e._fallback, n, a), i = [
    ...t,
    ...o
  ], l = /* @__PURE__ */ new Set();
  l.add(a);
  let r = Lo(l, i, n, s || n, a);
  return r === null || typeof s < "u" && s !== n && (r = Lo(l, i, s, r, a), r === null) ? !1 : to(Array.from(l), [
    ""
  ], o, s, () => Er(e, n, a));
}
function Lo(t, e, n, a, o) {
  for (; n; )
    n = Pr(t, e, n, a, o);
  return n;
}
function Er(t, e, n) {
  const a = t._getTarget();
  e in a || (a[e] = {});
  const o = a[e];
  return Vt(o) && kt(n) ? n : o || {};
}
function Ir(t, e, n, a) {
  let o;
  for (const s of e)
    if (o = ri(Ar(s, t), n), typeof o < "u")
      return eo(t, o) ? no(n, a, t, o) : o;
}
function ri(t, e) {
  for (const n of e) {
    if (!n)
      continue;
    const a = n[t];
    if (typeof a < "u")
      return a;
  }
}
function Fo(t) {
  let e = t._keys;
  return e || (e = t._keys = Rr(t._scopes)), e;
}
function Rr(t) {
  const e = /* @__PURE__ */ new Set();
  for (const n of t)
    for (const a of Object.keys(n).filter((o) => !o.startsWith("_")))
      e.add(a);
  return Array.from(e);
}
const Or = Number.EPSILON || 1e-14, ln = (t, e) => e < t.length && !t[e].skip && t[e], ci = (t) => t === "x" ? "y" : "x";
function Vr(t, e, n, a) {
  const o = t.skip ? e : t, s = e, i = n.skip ? e : n, l = Ea(s, o), r = Ea(i, s);
  let c = l / (l + r), d = r / (l + r);
  c = isNaN(c) ? 0 : c, d = isNaN(d) ? 0 : d;
  const h = a * c, p = a * d;
  return {
    previous: {
      x: s.x - h * (i.x - o.x),
      y: s.y - h * (i.y - o.y)
    },
    next: {
      x: s.x + p * (i.x - o.x),
      y: s.y + p * (i.y - o.y)
    }
  };
}
function zr(t, e, n) {
  const a = t.length;
  let o, s, i, l, r, c = ln(t, 0);
  for (let d = 0; d < a - 1; ++d)
    if (r = c, c = ln(t, d + 1), !(!r || !c)) {
      if (kn(e[d], 0, Or)) {
        n[d] = n[d + 1] = 0;
        continue;
      }
      o = n[d] / e[d], s = n[d + 1] / e[d], l = Math.pow(o, 2) + Math.pow(s, 2), !(l <= 9) && (i = 3 / Math.sqrt(l), n[d] = o * i * e[d], n[d + 1] = s * i * e[d]);
    }
}
function Nr(t, e, n = "x") {
  const a = ci(n), o = t.length;
  let s, i, l, r = ln(t, 0);
  for (let c = 0; c < o; ++c) {
    if (i = l, l = r, r = ln(t, c + 1), !l)
      continue;
    const d = l[n], h = l[a];
    i && (s = (d - i[n]) / 3, l[`cp1${n}`] = d - s, l[`cp1${a}`] = h - s * e[c]), r && (s = (r[n] - d) / 3, l[`cp2${n}`] = d + s, l[`cp2${a}`] = h + s * e[c]);
  }
}
function Wr(t, e = "x") {
  const n = ci(e), a = t.length, o = Array(a).fill(0), s = Array(a);
  let i, l, r, c = ln(t, 0);
  for (i = 0; i < a; ++i)
    if (l = r, r = c, c = ln(t, i + 1), !!r) {
      if (c) {
        const d = c[e] - r[e];
        o[i] = d !== 0 ? (c[n] - r[n]) / d : 0;
      }
      s[i] = l ? c ? me(o[i - 1]) !== me(o[i]) ? 0 : (o[i - 1] + o[i]) / 2 : o[i - 1] : o[i];
    }
  zr(t, o, s), Nr(t, s, e);
}
function jn(t, e, n) {
  return Math.max(Math.min(t, n), e);
}
function jr(t, e) {
  let n, a, o, s, i, l = Bn(t[0], e);
  for (n = 0, a = t.length; n < a; ++n)
    i = s, s = l, l = n < a - 1 && Bn(t[n + 1], e), s && (o = t[n], i && (o.cp1x = jn(o.cp1x, e.left, e.right), o.cp1y = jn(o.cp1y, e.top, e.bottom)), l && (o.cp2x = jn(o.cp2x, e.left, e.right), o.cp2y = jn(o.cp2y, e.top, e.bottom)));
}
function Hr(t, e, n, a, o) {
  let s, i, l, r;
  if (e.spanGaps && (t = t.filter((c) => !c.skip)), e.cubicInterpolationMode === "monotone")
    Wr(t, o);
  else {
    let c = a ? t[t.length - 1] : t[0];
    for (s = 0, i = t.length; s < i; ++s)
      l = t[s], r = Vr(c, l, t[Math.min(s + 1, i - (a ? 0 : 1)) % i], e.tension), l.cp1x = r.previous.x, l.cp1y = r.previous.y, l.cp2x = r.next.x, l.cp2y = r.next.y, c = l;
  }
  e.capBezierPoints && jr(t, n);
}
function ao() {
  return typeof window < "u" && typeof document < "u";
}
function oo(t) {
  let e = t.parentNode;
  return e && e.toString() === "[object ShadowRoot]" && (e = e.host), e;
}
function ia(t, e, n) {
  let a;
  return typeof t == "string" ? (a = parseInt(t, 10), t.indexOf("%") !== -1 && (a = a / 100 * e.parentNode[n])) : a = t, a;
}
const ua = (t) => t.ownerDocument.defaultView.getComputedStyle(t, null);
function Yr(t, e) {
  return ua(t).getPropertyValue(e);
}
const Kr = [
  "top",
  "right",
  "bottom",
  "left"
];
function Ue(t, e, n) {
  const a = {};
  n = n ? "-" + n : "";
  for (let o = 0; o < 4; o++) {
    const s = Kr[o];
    a[s] = parseFloat(t[e + "-" + s + n]) || 0;
  }
  return a.width = a.left + a.right, a.height = a.top + a.bottom, a;
}
const Ur = (t, e, n) => (t > 0 || e > 0) && (!n || !n.shadowRoot);
function qr(t, e) {
  const n = t.touches, a = n && n.length ? n[0] : t, { offsetX: o, offsetY: s } = a;
  let i = !1, l, r;
  if (Ur(o, s, t.target))
    l = o, r = s;
  else {
    const c = e.getBoundingClientRect();
    l = a.clientX - c.left, r = a.clientY - c.top, i = !0;
  }
  return {
    x: l,
    y: r,
    box: i
  };
}
function je(t, e) {
  if ("native" in t)
    return t;
  const { canvas: n, currentDevicePixelRatio: a } = e, o = ua(n), s = o.boxSizing === "border-box", i = Ue(o, "padding"), l = Ue(o, "border", "width"), { x: r, y: c, box: d } = qr(t, n), h = i.left + (d && l.left), p = i.top + (d && l.top);
  let { width: v, height: f } = e;
  return s && (v -= i.width + l.width, f -= i.height + l.height), {
    x: Math.round((r - h) / v * n.width / a),
    y: Math.round((c - p) / f * n.height / a)
  };
}
function Xr(t, e, n) {
  let a, o;
  if (e === void 0 || n === void 0) {
    const s = t && oo(t);
    if (!s)
      e = t.clientWidth, n = t.clientHeight;
    else {
      const i = s.getBoundingClientRect(), l = ua(s), r = Ue(l, "border", "width"), c = Ue(l, "padding");
      e = i.width - c.width - r.width, n = i.height - c.height - r.height, a = ia(l.maxWidth, s, "clientWidth"), o = ia(l.maxHeight, s, "clientHeight");
    }
  }
  return {
    width: e,
    height: n,
    maxWidth: a || oa,
    maxHeight: o || oa
  };
}
const Be = (t) => Math.round(t * 10) / 10;
function Gr(t, e, n, a) {
  const o = ua(t), s = Ue(o, "margin"), i = ia(o.maxWidth, t, "clientWidth") || oa, l = ia(o.maxHeight, t, "clientHeight") || oa, r = Xr(t, e, n);
  let { width: c, height: d } = r;
  if (o.boxSizing === "content-box") {
    const p = Ue(o, "border", "width"), v = Ue(o, "padding");
    c -= v.width + p.width, d -= v.height + p.height;
  }
  return c = Math.max(0, c - s.width), d = Math.max(0, a ? c / a : d - s.height), c = Be(Math.min(c, i, r.maxWidth)), d = Be(Math.min(d, l, r.maxHeight)), c && !d && (d = Be(c / 2)), (e !== void 0 || n !== void 0) && a && r.height && d > r.height && (d = r.height, c = Be(Math.floor(d * a))), {
    width: c,
    height: d
  };
}
function Po(t, e, n) {
  const a = e || 1, o = Be(t.height * a), s = Be(t.width * a);
  t.height = Be(t.height), t.width = Be(t.width);
  const i = t.canvas;
  return i.style && (n || !i.style.height && !i.style.width) && (i.style.height = `${t.height}px`, i.style.width = `${t.width}px`), t.currentDevicePixelRatio !== a || i.height !== o || i.width !== s ? (t.currentDevicePixelRatio = a, i.height = o, i.width = s, t.ctx.setTransform(a, 0, 0, a, 0, 0), !0) : !1;
}
const Zr = (function() {
  let t = !1;
  try {
    const e = {
      get passive() {
        return t = !0, !1;
      }
    };
    ao() && (window.addEventListener("test", null, e), window.removeEventListener("test", null, e));
  } catch {
  }
  return t;
})();
function Eo(t, e) {
  const n = Yr(t, e), a = n && n.match(/^(\d+)(\.\d+)?px$/);
  return a ? +a[1] : void 0;
}
function He(t, e, n, a) {
  return {
    x: t.x + n * (e.x - t.x),
    y: t.y + n * (e.y - t.y)
  };
}
function Qr(t, e, n, a) {
  return {
    x: t.x + n * (e.x - t.x),
    y: a === "middle" ? n < 0.5 ? t.y : e.y : a === "after" ? n < 1 ? t.y : e.y : n > 0 ? e.y : t.y
  };
}
function Jr(t, e, n, a) {
  const o = {
    x: t.cp2x,
    y: t.cp2y
  }, s = {
    x: e.cp1x,
    y: e.cp1y
  }, i = He(t, o, n), l = He(o, s, n), r = He(s, e, n), c = He(i, l, n), d = He(l, r, n);
  return He(c, d, n);
}
const tc = function(t, e) {
  return {
    x(n) {
      return t + t + e - n;
    },
    setWidth(n) {
      e = n;
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
}, ec = function() {
  return {
    x(t) {
      return t;
    },
    setWidth(t) {
    },
    textAlign(t) {
      return t;
    },
    xPlus(t, e) {
      return t + e;
    },
    leftForLtr(t, e) {
      return t;
    }
  };
};
function nn(t, e, n) {
  return t ? tc(e, n) : ec();
}
function di(t, e) {
  let n, a;
  (e === "ltr" || e === "rtl") && (n = t.canvas.style, a = [
    n.getPropertyValue("direction"),
    n.getPropertyPriority("direction")
  ], n.setProperty("direction", e, "important"), t.prevTextDirection = a);
}
function ui(t, e) {
  e !== void 0 && (delete t.prevTextDirection, t.canvas.style.setProperty("direction", e[0], e[1]));
}
function hi(t) {
  return t === "angle" ? {
    between: Tn,
    compare: tr,
    normalize: de
  } : {
    between: Te,
    compare: (e, n) => e - n,
    normalize: (e) => e
  };
}
function Io({ start: t, end: e, count: n, loop: a, style: o }) {
  return {
    start: t % n,
    end: e % n,
    loop: a && (e - t + 1) % n === 0,
    style: o
  };
}
function nc(t, e, n) {
  const { property: a, start: o, end: s } = n, { between: i, normalize: l } = hi(a), r = e.length;
  let { start: c, end: d, loop: h } = t, p, v;
  if (h) {
    for (c += r, d += r, p = 0, v = r; p < v && i(l(e[c % r][a]), o, s); ++p)
      c--, d--;
    c %= r, d %= r;
  }
  return d < c && (d += r), {
    start: c,
    end: d,
    loop: h,
    style: t.style
  };
}
function ac(t, e, n) {
  if (!n)
    return [
      t
    ];
  const { property: a, start: o, end: s } = n, i = e.length, { compare: l, between: r, normalize: c } = hi(a), { start: d, end: h, loop: p, style: v } = nc(t, e, n), f = [];
  let y = !1, _ = null, m, g, x;
  const w = () => r(o, x, m) && l(o, x) !== 0, D = () => l(s, m) === 0 || r(s, x, m), S = () => y || w(), $ = () => !y || D();
  for (let M = d, F = d; M <= h; ++M)
    g = e[M % i], !g.skip && (m = c(g[a]), m !== x && (y = r(m, o, s), _ === null && S() && (_ = l(m, o) === 0 ? M : F), _ !== null && $() && (f.push(Io({
      start: _,
      end: M,
      loop: p,
      count: i,
      style: v
    })), _ = null), F = M, x = m));
  return _ !== null && f.push(Io({
    start: _,
    end: h,
    loop: p,
    count: i,
    style: v
  })), f;
}
function oc(t, e) {
  const n = [], a = t.segments;
  for (let o = 0; o < a.length; o++) {
    const s = ac(a[o], t.points, e);
    s.length && n.push(...s);
  }
  return n;
}
function sc(t, e, n, a) {
  let o = 0, s = e - 1;
  if (n && !a)
    for (; o < e && !t[o].skip; )
      o++;
  for (; o < e && t[o].skip; )
    o++;
  for (o %= e, n && (s += o); s > o && t[s % e].skip; )
    s--;
  return s %= e, {
    start: o,
    end: s
  };
}
function ic(t, e, n, a) {
  const o = t.length, s = [];
  let i = e, l = t[e], r;
  for (r = e + 1; r <= n; ++r) {
    const c = t[r % o];
    c.skip || c.stop ? l.skip || (a = !1, s.push({
      start: e % o,
      end: (r - 1) % o,
      loop: a
    }), e = i = c.stop ? r : null) : (i = r, l.skip && (e = r)), l = c;
  }
  return i !== null && s.push({
    start: e % o,
    end: i % o,
    loop: a
  }), s;
}
function lc(t, e) {
  const n = t.points, a = t.options.spanGaps, o = n.length;
  if (!o)
    return [];
  const s = !!t._loop, { start: i, end: l } = sc(n, o, s, a);
  if (a === !0)
    return Ro(t, [
      {
        start: i,
        end: l,
        loop: s
      }
    ], n, e);
  const r = l < i ? l + o : l, c = !!t._fullLoop && i === 0 && l === o - 1;
  return Ro(t, ic(n, i, r, c), n, e);
}
function Ro(t, e, n, a) {
  return !a || !a.setContext || !n ? e : rc(t, e, n, a);
}
function rc(t, e, n, a) {
  const o = t._chart.getContext(), s = Oo(t.options), { _datasetIndex: i, options: { spanGaps: l } } = t, r = n.length, c = [];
  let d = s, h = e[0].start, p = h;
  function v(f, y, _, m) {
    const g = l ? -1 : 1;
    if (f !== y) {
      for (f += r; n[f % r].skip; )
        f -= g;
      for (; n[y % r].skip; )
        y += g;
      f % r !== y % r && (c.push({
        start: f % r,
        end: y % r,
        loop: _,
        style: m
      }), d = m, h = y % r);
    }
  }
  for (const f of e) {
    h = l ? h : f.start;
    let y = n[h % r], _;
    for (p = h + 1; p <= f.end; p++) {
      const m = n[p % r];
      _ = Oo(a.setContext(Ge(o, {
        type: "segment",
        p0: y,
        p1: m,
        p0DataIndex: (p - 1) % r,
        p1DataIndex: p % r,
        datasetIndex: i
      }))), cc(_, d) && v(h, p - 1, f.loop, d), y = m, d = _;
    }
    h < p - 1 && v(h, p - 1, f.loop, d);
  }
  return c;
}
function Oo(t) {
  return {
    backgroundColor: t.backgroundColor,
    borderCapStyle: t.borderCapStyle,
    borderDash: t.borderDash,
    borderDashOffset: t.borderDashOffset,
    borderJoinStyle: t.borderJoinStyle,
    borderWidth: t.borderWidth,
    borderColor: t.borderColor
  };
}
function cc(t, e) {
  if (!e)
    return !1;
  const n = [], a = function(o, s) {
    return Xa(s) ? (n.includes(s) || n.push(s), n.indexOf(s)) : s;
  };
  return JSON.stringify(t, a) !== JSON.stringify(e, a);
}
function Hn(t, e, n) {
  return t.options.clip ? t[n] : e[n];
}
function dc(t, e) {
  const { xScale: n, yScale: a } = t;
  return n && a ? {
    left: Hn(n, e, "left"),
    right: Hn(n, e, "right"),
    top: Hn(a, e, "top"),
    bottom: Hn(a, e, "bottom")
  } : e;
}
function uc(t, e) {
  const n = e._clip;
  if (n.disabled)
    return !1;
  const a = dc(e, t.chartArea);
  return {
    left: n.left === !1 ? 0 : a.left - (n.left === !0 ? 0 : n.left),
    right: n.right === !1 ? t.width : a.right + (n.right === !0 ? 0 : n.right),
    top: n.top === !1 ? 0 : a.top - (n.top === !0 ? 0 : n.top),
    bottom: n.bottom === !1 ? t.height : a.bottom + (n.bottom === !0 ? 0 : n.bottom)
  };
}
class hc {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(e, n, a, o) {
    const s = n.listeners[o], i = n.duration;
    s.forEach((l) => l({
      chart: e,
      initial: n.initial,
      numSteps: i,
      currentStep: Math.min(a - n.start, i)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = ti.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(e = Date.now()) {
    let n = 0;
    this._charts.forEach((a, o) => {
      if (!a.running || !a.items.length)
        return;
      const s = a.items;
      let i = s.length - 1, l = !1, r;
      for (; i >= 0; --i)
        r = s[i], r._active ? (r._total > a.duration && (a.duration = r._total), r.tick(e), l = !0) : (s[i] = s[s.length - 1], s.pop());
      l && (o.draw(), this._notify(o, a, e, "progress")), s.length || (a.running = !1, this._notify(o, a, e, "complete"), a.initial = !1), n += s.length;
    }), this._lastDate = e, n === 0 && (this._running = !1);
  }
  _getAnims(e) {
    const n = this._charts;
    let a = n.get(e);
    return a || (a = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, n.set(e, a)), a;
  }
  listen(e, n, a) {
    this._getAnims(e).listeners[n].push(a);
  }
  add(e, n) {
    !n || !n.length || this._getAnims(e).items.push(...n);
  }
  has(e) {
    return this._getAnims(e).items.length > 0;
  }
  start(e) {
    const n = this._charts.get(e);
    n && (n.running = !0, n.start = Date.now(), n.duration = n.items.reduce((a, o) => Math.max(a, o._duration), 0), this._refresh());
  }
  running(e) {
    if (!this._running)
      return !1;
    const n = this._charts.get(e);
    return !(!n || !n.running || !n.items.length);
  }
  stop(e) {
    const n = this._charts.get(e);
    if (!n || !n.items.length)
      return;
    const a = n.items;
    let o = a.length - 1;
    for (; o >= 0; --o)
      a[o].cancel();
    n.items = [], this._notify(e, n, Date.now(), "complete");
  }
  remove(e) {
    return this._charts.delete(e);
  }
}
var xe = /* @__PURE__ */ new hc();
const Vo = "transparent", fc = {
  boolean(t, e, n) {
    return n > 0.5 ? e : t;
  },
  color(t, e, n) {
    const a = Do(t || Vo), o = a.valid && Do(e || Vo);
    return o && o.valid ? o.mix(a, n).hexString() : e;
  },
  number(t, e, n) {
    return t + (e - t) * n;
  }
};
class gc {
  constructor(e, n, a, o) {
    const s = n[a];
    o = Wn([
      e.to,
      o,
      s,
      e.from
    ]);
    const i = Wn([
      e.from,
      s,
      o
    ]);
    this._active = !0, this._fn = e.fn || fc[e.type || typeof i], this._easing = wn[e.easing] || wn.linear, this._start = Math.floor(Date.now() + (e.delay || 0)), this._duration = this._total = Math.floor(e.duration), this._loop = !!e.loop, this._target = n, this._prop = a, this._from = i, this._to = o, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(e, n, a) {
    if (this._active) {
      this._notify(!1);
      const o = this._target[this._prop], s = a - this._start, i = this._duration - s;
      this._start = a, this._duration = Math.floor(Math.max(i, e.duration)), this._total += s, this._loop = !!e.loop, this._to = Wn([
        e.to,
        n,
        o,
        e.from
      ]), this._from = Wn([
        e.from,
        o,
        n
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(e) {
    const n = e - this._start, a = this._duration, o = this._prop, s = this._from, i = this._loop, l = this._to;
    let r;
    if (this._active = s !== l && (i || n < a), !this._active) {
      this._target[o] = l, this._notify(!0);
      return;
    }
    if (n < 0) {
      this._target[o] = s;
      return;
    }
    r = n / a % 2, r = i && r > 1 ? 2 - r : r, r = this._easing(Math.min(1, Math.max(0, r))), this._target[o] = this._fn(s, l, r);
  }
  wait() {
    const e = this._promises || (this._promises = []);
    return new Promise((n, a) => {
      e.push({
        res: n,
        rej: a
      });
    });
  }
  _notify(e) {
    const n = e ? "res" : "rej", a = this._promises || [];
    for (let o = 0; o < a.length; o++)
      a[o][n]();
  }
}
class fi {
  constructor(e, n) {
    this._chart = e, this._properties = /* @__PURE__ */ new Map(), this.configure(n);
  }
  configure(e) {
    if (!kt(e))
      return;
    const n = Object.keys(It.animation), a = this._properties;
    Object.getOwnPropertyNames(e).forEach((o) => {
      const s = e[o];
      if (!kt(s))
        return;
      const i = {};
      for (const l of n)
        i[l] = s[l];
      (Vt(s.properties) && s.properties || [
        o
      ]).forEach((l) => {
        (l === o || !a.has(l)) && a.set(l, i);
      });
    });
  }
  _animateOptions(e, n) {
    const a = n.options, o = mc(e, a);
    if (!o)
      return [];
    const s = this._createAnimations(o, a);
    return a.$shared && pc(e.options.$animations, a).then(() => {
      e.options = a;
    }, () => {
    }), s;
  }
  _createAnimations(e, n) {
    const a = this._properties, o = [], s = e.$animations || (e.$animations = {}), i = Object.keys(n), l = Date.now();
    let r;
    for (r = i.length - 1; r >= 0; --r) {
      const c = i[r];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        o.push(...this._animateOptions(e, n));
        continue;
      }
      const d = n[c];
      let h = s[c];
      const p = a.get(c);
      if (h)
        if (p && h.active()) {
          h.update(p, d, l);
          continue;
        } else
          h.cancel();
      if (!p || !p.duration) {
        e[c] = d;
        continue;
      }
      s[c] = h = new gc(p, e, c, d), o.push(h);
    }
    return o;
  }
  update(e, n) {
    if (this._properties.size === 0) {
      Object.assign(e, n);
      return;
    }
    const a = this._createAnimations(e, n);
    if (a.length)
      return xe.add(this._chart, a), !0;
  }
}
function pc(t, e) {
  const n = [], a = Object.keys(e);
  for (let o = 0; o < a.length; o++) {
    const s = t[a[o]];
    s && s.active() && n.push(s.wait());
  }
  return Promise.all(n);
}
function mc(t, e) {
  if (!e)
    return;
  let n = t.options;
  if (!n) {
    t.options = e;
    return;
  }
  return n.$shared && (t.options = n = Object.assign({}, n, {
    $shared: !1,
    $animations: {}
  })), n;
}
function zo(t, e) {
  const n = t && t.options || {}, a = n.reverse, o = n.min === void 0 ? e : 0, s = n.max === void 0 ? e : 0;
  return {
    start: a ? s : o,
    end: a ? o : s
  };
}
function bc(t, e, n) {
  if (n === !1)
    return !1;
  const a = zo(t, n), o = zo(e, n);
  return {
    top: o.end,
    right: a.end,
    bottom: o.start,
    left: a.start
  };
}
function vc(t) {
  let e, n, a, o;
  return kt(t) ? (e = t.top, n = t.right, a = t.bottom, o = t.left) : e = n = a = o = t, {
    top: e,
    right: n,
    bottom: a,
    left: o,
    disabled: t === !1
  };
}
function gi(t, e) {
  const n = [], a = t._getSortedDatasetMetas(e);
  let o, s;
  for (o = 0, s = a.length; o < s; ++o)
    n.push(a[o].index);
  return n;
}
function No(t, e, n, a = {}) {
  const o = t.keys, s = a.mode === "single";
  let i, l, r, c;
  if (e === null)
    return;
  let d = !1;
  for (i = 0, l = o.length; i < l; ++i) {
    if (r = +o[i], r === n) {
      if (d = !0, a.all)
        continue;
      break;
    }
    c = t.values[r], le(c) && (s || e === 0 || me(e) === me(c)) && (e += c);
  }
  return !d && !a.all ? 0 : e;
}
function yc(t, e) {
  const { iScale: n, vScale: a } = e, o = n.axis === "x" ? "x" : "y", s = a.axis === "x" ? "x" : "y", i = Object.keys(t), l = new Array(i.length);
  let r, c, d;
  for (r = 0, c = i.length; r < c; ++r)
    d = i[r], l[r] = {
      [o]: d,
      [s]: t[d]
    };
  return l;
}
function ya(t, e) {
  const n = t && t.options.stacked;
  return n || n === void 0 && e.stack !== void 0;
}
function xc(t, e, n) {
  return `${t.id}.${e.id}.${n.stack || n.type}`;
}
function _c(t) {
  const { min: e, max: n, minDefined: a, maxDefined: o } = t.getUserBounds();
  return {
    min: a ? e : Number.NEGATIVE_INFINITY,
    max: o ? n : Number.POSITIVE_INFINITY
  };
}
function kc(t, e, n) {
  const a = t[e] || (t[e] = {});
  return a[n] || (a[n] = {});
}
function Wo(t, e, n, a) {
  for (const o of e.getMatchingVisibleMetas(a).reverse()) {
    const s = t[o.index];
    if (n && s > 0 || !n && s < 0)
      return o.index;
  }
  return null;
}
function jo(t, e) {
  const { chart: n, _cachedMeta: a } = t, o = n._stacks || (n._stacks = {}), { iScale: s, vScale: i, index: l } = a, r = s.axis, c = i.axis, d = xc(s, i, a), h = e.length;
  let p;
  for (let v = 0; v < h; ++v) {
    const f = e[v], { [r]: y, [c]: _ } = f, m = f._stacks || (f._stacks = {});
    p = m[c] = kc(o, d, y), p[l] = _, p._top = Wo(p, i, !0, a.type), p._bottom = Wo(p, i, !1, a.type);
    const g = p._visualValues || (p._visualValues = {});
    g[l] = _;
  }
}
function xa(t, e) {
  const n = t.scales;
  return Object.keys(n).filter((a) => n[a].axis === e).shift();
}
function wc(t, e) {
  return Ge(t, {
    active: !1,
    dataset: void 0,
    datasetIndex: e,
    index: e,
    mode: "default",
    type: "dataset"
  });
}
function Cc(t, e, n) {
  return Ge(t, {
    active: !1,
    dataIndex: e,
    parsed: void 0,
    raw: void 0,
    element: n,
    index: e,
    mode: "default",
    type: "data"
  });
}
function cn(t, e) {
  const n = t.controller.index, a = t.vScale && t.vScale.axis;
  if (a) {
    e = e || t._parsed;
    for (const o of e) {
      const s = o._stacks;
      if (!s || s[a] === void 0 || s[a][n] === void 0)
        return;
      delete s[a][n], s[a]._visualValues !== void 0 && s[a]._visualValues[n] !== void 0 && delete s[a]._visualValues[n];
    }
  }
}
const _a = (t) => t === "reset" || t === "none", Ho = (t, e) => e ? t : Object.assign({}, t), $c = (t, e, n) => t && !e.hidden && e._stacked && {
  keys: gi(n, !0),
  values: null
};
class ha {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(e, n) {
    this.chart = e, this._ctx = e.ctx, this.index = n, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const e = this._cachedMeta;
    this.configure(), this.linkScales(), e._stacked = ya(e.vScale, e), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(e) {
    this.index !== e && cn(this._cachedMeta), this.index = e;
  }
  linkScales() {
    const e = this.chart, n = this._cachedMeta, a = this.getDataset(), o = (h, p, v, f) => h === "x" ? p : h === "r" ? f : v, s = n.xAxisID = ht(a.xAxisID, xa(e, "x")), i = n.yAxisID = ht(a.yAxisID, xa(e, "y")), l = n.rAxisID = ht(a.rAxisID, xa(e, "r")), r = n.indexAxis, c = n.iAxisID = o(r, s, i, l), d = n.vAxisID = o(r, i, s, l);
    n.xScale = this.getScaleForId(s), n.yScale = this.getScaleForId(i), n.rScale = this.getScaleForId(l), n.iScale = this.getScaleForId(c), n.vScale = this.getScaleForId(d);
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(e) {
    return this.chart.scales[e];
  }
  _getOtherScale(e) {
    const n = this._cachedMeta;
    return e === n.iScale ? n.vScale : n.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const e = this._cachedMeta;
    this._data && $o(this._data, this), e._stacked && cn(e);
  }
  _dataCheck() {
    const e = this.getDataset(), n = e.data || (e.data = []), a = this._data;
    if (kt(n)) {
      const o = this._cachedMeta;
      this._data = yc(n, o);
    } else if (a !== n) {
      if (a) {
        $o(a, this);
        const o = this._cachedMeta;
        cn(o), o._parsed = [];
      }
      n && Object.isExtensible(n) && or(n, this), this._syncList = [], this._data = n;
    }
  }
  addElements() {
    const e = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (e.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(e) {
    const n = this._cachedMeta, a = this.getDataset();
    let o = !1;
    this._dataCheck();
    const s = n._stacked;
    n._stacked = ya(n.vScale, n), n.stack !== a.stack && (o = !0, cn(n), n.stack = a.stack), this._resyncElements(e), (o || s !== n._stacked) && (jo(this, n._parsed), n._stacked = ya(n.vScale, n));
  }
  configure() {
    const e = this.chart.config, n = e.datasetScopeKeys(this._type), a = e.getOptionScopes(this.getDataset(), n, !0);
    this.options = e.createResolver(a, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(e, n) {
    const { _cachedMeta: a, _data: o } = this, { iScale: s, _stacked: i } = a, l = s.axis;
    let r = e === 0 && n === o.length ? !0 : a._sorted, c = e > 0 && a._parsed[e - 1], d, h, p;
    if (this._parsing === !1)
      a._parsed = o, a._sorted = !0, p = o;
    else {
      Vt(o[e]) ? p = this.parseArrayData(a, o, e, n) : kt(o[e]) ? p = this.parseObjectData(a, o, e, n) : p = this.parsePrimitiveData(a, o, e, n);
      const v = () => h[l] === null || c && h[l] < c[l];
      for (d = 0; d < n; ++d)
        a._parsed[d + e] = h = p[d], r && (v() && (r = !1), c = h);
      a._sorted = r;
    }
    i && jo(this, p);
  }
  parsePrimitiveData(e, n, a, o) {
    const { iScale: s, vScale: i } = e, l = s.axis, r = i.axis, c = s.getLabels(), d = s === i, h = new Array(o);
    let p, v, f;
    for (p = 0, v = o; p < v; ++p)
      f = p + a, h[p] = {
        [l]: d || s.parse(c[f], f),
        [r]: i.parse(n[f], f)
      };
    return h;
  }
  parseArrayData(e, n, a, o) {
    const { xScale: s, yScale: i } = e, l = new Array(o);
    let r, c, d, h;
    for (r = 0, c = o; r < c; ++r)
      d = r + a, h = n[d], l[r] = {
        x: s.parse(h[0], d),
        y: i.parse(h[1], d)
      };
    return l;
  }
  parseObjectData(e, n, a, o) {
    const { xScale: s, yScale: i } = e, { xAxisKey: l = "x", yAxisKey: r = "y" } = this._parsing, c = new Array(o);
    let d, h, p, v;
    for (d = 0, h = o; d < h; ++d)
      p = d + a, v = n[p], c[d] = {
        x: s.parse(qe(v, l), p),
        y: i.parse(qe(v, r), p)
      };
    return c;
  }
  getParsed(e) {
    return this._cachedMeta._parsed[e];
  }
  getDataElement(e) {
    return this._cachedMeta.data[e];
  }
  applyStack(e, n, a) {
    const o = this.chart, s = this._cachedMeta, i = n[e.axis], l = {
      keys: gi(o, !0),
      values: n._stacks[e.axis]._visualValues
    };
    return No(l, i, s.index, {
      mode: a
    });
  }
  updateRangeFromParsed(e, n, a, o) {
    const s = a[n.axis];
    let i = s === null ? NaN : s;
    const l = o && a._stacks[n.axis];
    o && l && (o.values = l, i = No(o, s, this._cachedMeta.index)), e.min = Math.min(e.min, i), e.max = Math.max(e.max, i);
  }
  getMinMax(e, n) {
    const a = this._cachedMeta, o = a._parsed, s = a._sorted && e === a.iScale, i = o.length, l = this._getOtherScale(e), r = $c(n, a, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: d, max: h } = _c(l);
    let p, v;
    function f() {
      v = o[p];
      const y = v[l.axis];
      return !le(v[e.axis]) || d > y || h < y;
    }
    for (p = 0; p < i && !(!f() && (this.updateRangeFromParsed(c, e, v, r), s)); ++p)
      ;
    if (s) {
      for (p = i - 1; p >= 0; --p)
        if (!f()) {
          this.updateRangeFromParsed(c, e, v, r);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(e) {
    const n = this._cachedMeta._parsed, a = [];
    let o, s, i;
    for (o = 0, s = n.length; o < s; ++o)
      i = n[o][e.axis], le(i) && a.push(i);
    return a;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(e) {
    const n = this._cachedMeta, a = n.iScale, o = n.vScale, s = this.getParsed(e);
    return {
      label: a ? "" + a.getLabelForValue(s[a.axis]) : "",
      value: o ? "" + o.getLabelForValue(s[o.axis]) : ""
    };
  }
  _update(e) {
    const n = this._cachedMeta;
    this.update(e || "default"), n._clip = vc(ht(this.options.clip, bc(n.xScale, n.yScale, this.getMaxOverflow())));
  }
  update(e) {
  }
  draw() {
    const e = this._ctx, n = this.chart, a = this._cachedMeta, o = a.data || [], s = n.chartArea, i = [], l = this._drawStart || 0, r = this._drawCount || o.length - l, c = this.options.drawActiveElementsOnTop;
    let d;
    for (a.dataset && a.dataset.draw(e, s, l, r), d = l; d < l + r; ++d) {
      const h = o[d];
      h.hidden || (h.active && c ? i.push(h) : h.draw(e, s));
    }
    for (d = 0; d < i.length; ++d)
      i[d].draw(e, s);
  }
  getStyle(e, n) {
    const a = n ? "active" : "default";
    return e === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(a) : this.resolveDataElementOptions(e || 0, a);
  }
  getContext(e, n, a) {
    const o = this.getDataset();
    let s;
    if (e >= 0 && e < this._cachedMeta.data.length) {
      const i = this._cachedMeta.data[e];
      s = i.$context || (i.$context = Cc(this.getContext(), e, i)), s.parsed = this.getParsed(e), s.raw = o.data[e], s.index = s.dataIndex = e;
    } else
      s = this.$context || (this.$context = wc(this.chart.getContext(), this.index)), s.dataset = o, s.index = s.datasetIndex = this.index;
    return s.active = !!n, s.mode = a, s;
  }
  resolveDatasetElementOptions(e) {
    return this._resolveElementOptions(this.datasetElementType.id, e);
  }
  resolveDataElementOptions(e, n) {
    return this._resolveElementOptions(this.dataElementType.id, n, e);
  }
  _resolveElementOptions(e, n = "default", a) {
    const o = n === "active", s = this._cachedDataOpts, i = e + "-" + n, l = s[i], r = this.enableOptionSharing && Dn(a);
    if (l)
      return Ho(l, r);
    const c = this.chart.config, d = c.datasetElementScopeKeys(this._type, e), h = o ? [
      `${e}Hover`,
      "hover",
      e,
      ""
    ] : [
      e,
      ""
    ], p = c.getOptionScopes(this.getDataset(), d), v = Object.keys(It.elements[e]), f = () => this.getContext(a, o, n), y = c.resolveNamedOptions(p, v, f, h);
    return y.$shared && (y.$shared = r, s[i] = Object.freeze(Ho(y, r))), y;
  }
  _resolveAnimations(e, n, a) {
    const o = this.chart, s = this._cachedDataOpts, i = `animation-${n}`, l = s[i];
    if (l)
      return l;
    let r;
    if (o.options.animation !== !1) {
      const d = this.chart.config, h = d.datasetAnimationScopeKeys(this._type, n), p = d.getOptionScopes(this.getDataset(), h);
      r = d.createResolver(p, this.getContext(e, a, n));
    }
    const c = new fi(o, r && r.animations);
    return r && r._cacheable && (s[i] = Object.freeze(c)), c;
  }
  getSharedOptions(e) {
    if (e.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, e));
  }
  includeOptions(e, n) {
    return !n || _a(e) || this.chart._animationsDisabled;
  }
  _getSharedOptions(e, n) {
    const a = this.resolveDataElementOptions(e, n), o = this._sharedOptions, s = this.getSharedOptions(a), i = this.includeOptions(n, s) || s !== o;
    return this.updateSharedOptions(s, n, a), {
      sharedOptions: s,
      includeOptions: i
    };
  }
  updateElement(e, n, a, o) {
    _a(o) ? Object.assign(e, a) : this._resolveAnimations(n, o).update(e, a);
  }
  updateSharedOptions(e, n, a) {
    e && !_a(n) && this._resolveAnimations(void 0, n).update(e, a);
  }
  _setStyle(e, n, a, o) {
    e.active = o;
    const s = this.getStyle(n, o);
    this._resolveAnimations(n, a, o).update(e, {
      options: !o && this.getSharedOptions(s) || s
    });
  }
  removeHoverStyle(e, n, a) {
    this._setStyle(e, a, "active", !1);
  }
  setHoverStyle(e, n, a) {
    this._setStyle(e, a, "active", !0);
  }
  _removeDatasetHoverStyle() {
    const e = this._cachedMeta.dataset;
    e && this._setStyle(e, void 0, "active", !1);
  }
  _setDatasetHoverStyle() {
    const e = this._cachedMeta.dataset;
    e && this._setStyle(e, void 0, "active", !0);
  }
  _resyncElements(e) {
    const n = this._data, a = this._cachedMeta.data;
    for (const [l, r, c] of this._syncList)
      this[l](r, c);
    this._syncList = [];
    const o = a.length, s = n.length, i = Math.min(s, o);
    i && this.parse(0, i), s > o ? this._insertElements(o, s - o, e) : s < o && this._removeElements(s, o - s);
  }
  _insertElements(e, n, a = !0) {
    const o = this._cachedMeta, s = o.data, i = e + n;
    let l;
    const r = (c) => {
      for (c.length += n, l = c.length - 1; l >= i; l--)
        c[l] = c[l - n];
    };
    for (r(s), l = e; l < i; ++l)
      s[l] = new this.dataElementType();
    this._parsing && r(o._parsed), this.parse(e, n), a && this.updateElements(s, e, n, "reset");
  }
  updateElements(e, n, a, o) {
  }
  _removeElements(e, n) {
    const a = this._cachedMeta;
    if (this._parsing) {
      const o = a._parsed.splice(e, n);
      a._stacked && cn(a, o);
    }
    a.data.splice(e, n);
  }
  _sync(e) {
    if (this._parsing)
      this._syncList.push(e);
    else {
      const [n, a, o] = e;
      this[n](a, o);
    }
    this.chart._dataChanges.push([
      this.index,
      ...e
    ]);
  }
  _onDataPush() {
    const e = arguments.length;
    this._sync([
      "_insertElements",
      this.getDataset().data.length - e,
      e
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
  _onDataSplice(e, n) {
    n && this._sync([
      "_removeElements",
      e,
      n
    ]);
    const a = arguments.length - 2;
    a && this._sync([
      "_insertElements",
      e,
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
function Mc(t, e) {
  if (!t._cache.$bar) {
    const n = t.getMatchingVisibleMetas(e);
    let a = [];
    for (let o = 0, s = n.length; o < s; o++)
      a = a.concat(n[o].controller.getAllParsedValues(t));
    t._cache.$bar = Js(a.sort((o, s) => o - s));
  }
  return t._cache.$bar;
}
function Sc(t) {
  const e = t.iScale, n = Mc(e, t.type);
  let a = e._length, o, s, i, l;
  const r = () => {
    i === 32767 || i === -32768 || (Dn(l) && (a = Math.min(a, Math.abs(i - l) || a)), l = i);
  };
  for (o = 0, s = n.length; o < s; ++o)
    i = e.getPixelForValue(n[o]), r();
  for (l = void 0, o = 0, s = e.ticks.length; o < s; ++o)
    i = e.getPixelForTick(o), r();
  return a;
}
function Dc(t, e, n, a) {
  const o = n.barThickness;
  let s, i;
  return $t(o) ? (s = e.min * n.categoryPercentage, i = n.barPercentage) : (s = o * a, i = 1), {
    chunk: s / a,
    ratio: i,
    start: e.pixels[t] - s / 2
  };
}
function Ac(t, e, n, a) {
  const o = e.pixels, s = o[t];
  let i = t > 0 ? o[t - 1] : null, l = t < o.length - 1 ? o[t + 1] : null;
  const r = n.categoryPercentage;
  i === null && (i = s - (l === null ? e.end - e.start : l - s)), l === null && (l = s + s - i);
  const c = s - (s - Math.min(i, l)) / 2 * r;
  return {
    chunk: Math.abs(l - i) / 2 * r / a,
    ratio: n.barPercentage,
    start: c
  };
}
function Tc(t, e, n, a) {
  const o = n.parse(t[0], a), s = n.parse(t[1], a), i = Math.min(o, s), l = Math.max(o, s);
  let r = i, c = l;
  Math.abs(i) > Math.abs(l) && (r = l, c = i), e[n.axis] = c, e._custom = {
    barStart: r,
    barEnd: c,
    start: o,
    end: s,
    min: i,
    max: l
  };
}
function pi(t, e, n, a) {
  return Vt(t) ? Tc(t, e, n, a) : e[n.axis] = n.parse(t, a), e;
}
function Yo(t, e, n, a) {
  const o = t.iScale, s = t.vScale, i = o.getLabels(), l = o === s, r = [];
  let c, d, h, p;
  for (c = n, d = n + a; c < d; ++c)
    p = e[c], h = {}, h[o.axis] = l || o.parse(i[c], c), r.push(pi(p, h, s, c));
  return r;
}
function ka(t) {
  return t && t.barStart !== void 0 && t.barEnd !== void 0;
}
function Bc(t, e, n) {
  return t !== 0 ? me(t) : (e.isHorizontal() ? 1 : -1) * (e.min >= n ? 1 : -1);
}
function Lc(t) {
  let e, n, a, o, s;
  return t.horizontal ? (e = t.base > t.x, n = "left", a = "right") : (e = t.base < t.y, n = "bottom", a = "top"), e ? (o = "end", s = "start") : (o = "start", s = "end"), {
    start: n,
    end: a,
    reverse: e,
    top: o,
    bottom: s
  };
}
function Fc(t, e, n, a) {
  let o = e.borderSkipped;
  const s = {};
  if (!o) {
    t.borderSkipped = s;
    return;
  }
  if (o === !0) {
    t.borderSkipped = {
      top: !0,
      right: !0,
      bottom: !0,
      left: !0
    };
    return;
  }
  const { start: i, end: l, reverse: r, top: c, bottom: d } = Lc(t);
  o === "middle" && n && (t.enableBorderRadius = !0, (n._top || 0) === a ? o = c : (n._bottom || 0) === a ? o = d : (s[Ko(d, i, l, r)] = !0, o = c)), s[Ko(o, i, l, r)] = !0, t.borderSkipped = s;
}
function Ko(t, e, n, a) {
  return a ? (t = Pc(t, e, n), t = Uo(t, n, e)) : t = Uo(t, e, n), t;
}
function Pc(t, e, n) {
  return t === e ? n : t === n ? e : t;
}
function Uo(t, e, n) {
  return t === "start" ? e : t === "end" ? n : t;
}
function Ec(t, { inflateAmount: e }, n) {
  t.inflateAmount = e === "auto" ? n === 1 ? 0.33 : 0 : e;
}
class Ic extends ha {
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
  parsePrimitiveData(e, n, a, o) {
    return Yo(e, n, a, o);
  }
  parseArrayData(e, n, a, o) {
    return Yo(e, n, a, o);
  }
  parseObjectData(e, n, a, o) {
    const { iScale: s, vScale: i } = e, { xAxisKey: l = "x", yAxisKey: r = "y" } = this._parsing, c = s.axis === "x" ? l : r, d = i.axis === "x" ? l : r, h = [];
    let p, v, f, y;
    for (p = a, v = a + o; p < v; ++p)
      y = n[p], f = {}, f[s.axis] = s.parse(qe(y, c), p), h.push(pi(qe(y, d), f, i, p));
    return h;
  }
  updateRangeFromParsed(e, n, a, o) {
    super.updateRangeFromParsed(e, n, a, o);
    const s = a._custom;
    s && n === this._cachedMeta.vScale && (e.min = Math.min(e.min, s.min), e.max = Math.max(e.max, s.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(e) {
    const n = this._cachedMeta, { iScale: a, vScale: o } = n, s = this.getParsed(e), i = s._custom, l = ka(i) ? "[" + i.start + ", " + i.end + "]" : "" + o.getLabelForValue(s[o.axis]);
    return {
      label: "" + a.getLabelForValue(s[a.axis]),
      value: l
    };
  }
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
    const e = this._cachedMeta;
    e.stack = this.getDataset().stack;
  }
  update(e) {
    const n = this._cachedMeta;
    this.updateElements(n.data, 0, n.data.length, e);
  }
  updateElements(e, n, a, o) {
    const s = o === "reset", { index: i, _cachedMeta: { vScale: l } } = this, r = l.getBasePixel(), c = l.isHorizontal(), d = this._getRuler(), { sharedOptions: h, includeOptions: p } = this._getSharedOptions(n, o);
    for (let v = n; v < n + a; v++) {
      const f = this.getParsed(v), y = s || $t(f[l.axis]) ? {
        base: r,
        head: r
      } : this._calculateBarValuePixels(v), _ = this._calculateBarIndexPixels(v, d), m = (f._stacks || {})[l.axis], g = {
        horizontal: c,
        base: y.base,
        enableBorderRadius: !m || ka(f._custom) || i === m._top || i === m._bottom,
        x: c ? y.head : _.center,
        y: c ? _.center : y.head,
        height: c ? _.size : Math.abs(y.size),
        width: c ? Math.abs(y.size) : _.size
      };
      p && (g.options = h || this.resolveDataElementOptions(v, e[v].active ? "active" : o));
      const x = g.options || e[v].options;
      Fc(g, x, m, i), Ec(g, x, d.ratio), this.updateElement(e[v], v, g, o);
    }
  }
  _getStacks(e, n) {
    const { iScale: a } = this._cachedMeta, o = a.getMatchingVisibleMetas(this._type).filter((d) => d.controller.options.grouped), s = a.options.stacked, i = [], l = this._cachedMeta.controller.getParsed(n), r = l && l[a.axis], c = (d) => {
      const h = d._parsed.find((v) => v[a.axis] === r), p = h && h[d.vScale.axis];
      if ($t(p) || isNaN(p))
        return !0;
    };
    for (const d of o)
      if (!(n !== void 0 && c(d)) && ((s === !1 || i.indexOf(d.stack) === -1 || s === void 0 && d.stack === void 0) && i.push(d.stack), d.index === e))
        break;
    return i.length || i.push(void 0), i;
  }
  _getStackCount(e) {
    return this._getStacks(void 0, e).length;
  }
  _getAxisCount() {
    return this._getAxis().length;
  }
  getFirstScaleIdForIndexAxis() {
    const e = this.chart.scales, n = this.chart.options.indexAxis;
    return Object.keys(e).filter((a) => e[a].axis === n).shift();
  }
  _getAxis() {
    const e = {}, n = this.getFirstScaleIdForIndexAxis();
    for (const a of this.chart.data.datasets)
      e[ht(this.chart.options.indexAxis === "x" ? a.xAxisID : a.yAxisID, n)] = !0;
    return Object.keys(e);
  }
  _getStackIndex(e, n, a) {
    const o = this._getStacks(e, a), s = n !== void 0 ? o.indexOf(n) : -1;
    return s === -1 ? o.length - 1 : s;
  }
  _getRuler() {
    const e = this.options, n = this._cachedMeta, a = n.iScale, o = [];
    let s, i;
    for (s = 0, i = n.data.length; s < i; ++s)
      o.push(a.getPixelForValue(this.getParsed(s)[a.axis], s));
    const l = e.barThickness;
    return {
      min: l || Sc(n),
      pixels: o,
      start: a._startPixel,
      end: a._endPixel,
      stackCount: this._getStackCount(),
      scale: a,
      grouped: e.grouped,
      ratio: l ? 1 : e.categoryPercentage * e.barPercentage
    };
  }
  _calculateBarValuePixels(e) {
    const { _cachedMeta: { vScale: n, _stacked: a, index: o }, options: { base: s, minBarLength: i } } = this, l = s || 0, r = this.getParsed(e), c = r._custom, d = ka(c);
    let h = r[n.axis], p = 0, v = a ? this.applyStack(n, r, a) : h, f, y;
    v !== h && (p = v - h, v = h), d && (h = c.barStart, v = c.barEnd - c.barStart, h !== 0 && me(h) !== me(c.barEnd) && (p = 0), p += h);
    const _ = !$t(s) && !d ? s : p;
    let m = n.getPixelForValue(_);
    if (this.chart.getDataVisibility(e) ? f = n.getPixelForValue(p + v) : f = m, y = f - m, Math.abs(y) < i) {
      y = Bc(y, n, l) * i, h === l && (m -= y / 2);
      const g = n.getPixelForDecimal(0), x = n.getPixelForDecimal(1), w = Math.min(g, x), D = Math.max(g, x);
      m = Math.max(Math.min(m, D), w), f = m + y, a && !d && (r._stacks[n.axis]._visualValues[o] = n.getValueForPixel(f) - n.getValueForPixel(m));
    }
    if (m === n.getPixelForValue(l)) {
      const g = me(y) * n.getLineWidthForValue(l) / 2;
      m += g, y -= g;
    }
    return {
      size: y,
      base: m,
      head: f,
      center: f + y / 2
    };
  }
  _calculateBarIndexPixels(e, n) {
    const a = n.scale, o = this.options, s = o.skipNull, i = ht(o.maxBarThickness, 1 / 0);
    let l, r;
    const c = this._getAxisCount();
    if (n.grouped) {
      const d = s ? this._getStackCount(e) : n.stackCount, h = o.barThickness === "flex" ? Ac(e, n, o, d * c) : Dc(e, n, o, d * c), p = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, v = this._getAxis().indexOf(ht(p, this.getFirstScaleIdForIndexAxis())), f = this._getStackIndex(this.index, this._cachedMeta.stack, s ? e : void 0) + v;
      l = h.start + h.chunk * f + h.chunk / 2, r = Math.min(i, h.chunk * h.ratio);
    } else
      l = a.getPixelForValue(this.getParsed(e)[a.axis], e), r = Math.min(i, n.min * n.ratio);
    return {
      base: l - r / 2,
      head: l + r / 2,
      center: l,
      size: r
    };
  }
  draw() {
    const e = this._cachedMeta, n = e.vScale, a = e.data, o = a.length;
    let s = 0;
    for (; s < o; ++s)
      this.getParsed(s)[n.axis] !== null && !a[s].hidden && a[s].draw(this._ctx);
  }
}
function Rc(t, e, n) {
  let a = 1, o = 1, s = 0, i = 0;
  if (e < Pt) {
    const l = t, r = l + e, c = Math.cos(l), d = Math.sin(l), h = Math.cos(r), p = Math.sin(r), v = (x, w, D) => Tn(x, l, r, !0) ? 1 : Math.max(w, w * n, D, D * n), f = (x, w, D) => Tn(x, l, r, !0) ? -1 : Math.min(w, w * n, D, D * n), y = v(0, c, h), _ = v(zt, d, p), m = f(St, c, h), g = f(St + zt, d, p);
    a = (y - m) / 2, o = (_ - g) / 2, s = -(y + m) / 2, i = -(_ + g) / 2;
  }
  return {
    ratioX: a,
    ratioY: o,
    offsetX: s,
    offsetY: i
  };
}
class Oc extends ha {
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
    _scriptable: (e) => e !== "spacing",
    _indexable: (e) => e !== "spacing" && !e.startsWith("borderDash") && !e.startsWith("hoverBorderDash")
  };
  static overrides = {
    aspectRatio: 1,
    plugins: {
      legend: {
        labels: {
          generateLabels(e) {
            const n = e.data, { labels: { pointStyle: a, textAlign: o, color: s, useBorderRadius: i, borderRadius: l } } = e.legend.options;
            return n.labels.length && n.datasets.length ? n.labels.map((r, c) => {
              const h = e.getDatasetMeta(0).controller.getStyle(c);
              return {
                text: r,
                fillStyle: h.backgroundColor,
                fontColor: s,
                hidden: !e.getDataVisibility(c),
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
        onClick(e, n, a) {
          a.chart.toggleDataVisibility(n.index), a.chart.update();
        }
      }
    }
  };
  constructor(e, n) {
    super(e, n), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
  }
  linkScales() {
  }
  parse(e, n) {
    const a = this.getDataset().data, o = this._cachedMeta;
    if (this._parsing === !1)
      o._parsed = a;
    else {
      let s = (r) => +a[r];
      if (kt(a[e])) {
        const { key: r = "value" } = this._parsing;
        s = (c) => +qe(a[c], r);
      }
      let i, l;
      for (i = e, l = e + n; i < l; ++i)
        o._parsed[i] = s(i);
    }
  }
  _getRotation() {
    return we(this.options.rotation - 90);
  }
  _getCircumference() {
    return we(this.options.circumference);
  }
  _getRotationExtents() {
    let e = Pt, n = -Pt;
    for (let a = 0; a < this.chart.data.datasets.length; ++a)
      if (this.chart.isDatasetVisible(a) && this.chart.getDatasetMeta(a).type === this._type) {
        const o = this.chart.getDatasetMeta(a).controller, s = o._getRotation(), i = o._getCircumference();
        e = Math.min(e, s), n = Math.max(n, s + i);
      }
    return {
      rotation: e,
      circumference: n - e
    };
  }
  update(e) {
    const n = this.chart, { chartArea: a } = n, o = this._cachedMeta, s = o.data, i = this.getMaxBorderWidth() + this.getMaxOffset(s) + this.options.spacing, l = Math.max((Math.min(a.width, a.height) - i) / 2, 0), r = Math.min(Nl(this.options.cutout, l), 1), c = this._getRingWeight(this.index), { circumference: d, rotation: h } = this._getRotationExtents(), { ratioX: p, ratioY: v, offsetX: f, offsetY: y } = Rc(h, d, r), _ = (a.width - i) / p, m = (a.height - i) / v, g = Math.max(Math.min(_, m) / 2, 0), x = qs(this.options.radius, g), w = Math.max(x * r, 0), D = (x - w) / this._getVisibleDatasetWeightTotal();
    this.offsetX = f * x, this.offsetY = y * x, o.total = this.calculateTotal(), this.outerRadius = x - D * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - D * c, 0), this.updateElements(s, 0, s.length, e);
  }
  _circumference(e, n) {
    const a = this.options, o = this._cachedMeta, s = this._getCircumference();
    return n && a.animation.animateRotate || !this.chart.getDataVisibility(e) || o._parsed[e] === null || o.data[e].hidden ? 0 : this.calculateCircumference(o._parsed[e] * s / Pt);
  }
  updateElements(e, n, a, o) {
    const s = o === "reset", i = this.chart, l = i.chartArea, c = i.options.animation, d = (l.left + l.right) / 2, h = (l.top + l.bottom) / 2, p = s && c.animateScale, v = p ? 0 : this.innerRadius, f = p ? 0 : this.outerRadius, { sharedOptions: y, includeOptions: _ } = this._getSharedOptions(n, o);
    let m = this._getRotation(), g;
    for (g = 0; g < n; ++g)
      m += this._circumference(g, s);
    for (g = n; g < n + a; ++g) {
      const x = this._circumference(g, s), w = e[g], D = {
        x: d + this.offsetX,
        y: h + this.offsetY,
        startAngle: m,
        endAngle: m + x,
        circumference: x,
        outerRadius: f,
        innerRadius: v
      };
      _ && (D.options = y || this.resolveDataElementOptions(g, w.active ? "active" : o)), m += x, this.updateElement(w, g, D, o);
    }
  }
  calculateTotal() {
    const e = this._cachedMeta, n = e.data;
    let a = 0, o;
    for (o = 0; o < n.length; o++) {
      const s = e._parsed[o];
      s !== null && !isNaN(s) && this.chart.getDataVisibility(o) && !n[o].hidden && (a += Math.abs(s));
    }
    return a;
  }
  calculateCircumference(e) {
    const n = this._cachedMeta.total;
    return n > 0 && !isNaN(e) ? Pt * (Math.abs(e) / n) : 0;
  }
  getLabelAndValue(e) {
    const n = this._cachedMeta, a = this.chart, o = a.data.labels || [], s = Ga(n._parsed[e], a.options.locale);
    return {
      label: o[e] || "",
      value: s
    };
  }
  getMaxBorderWidth(e) {
    let n = 0;
    const a = this.chart;
    let o, s, i, l, r;
    if (!e) {
      for (o = 0, s = a.data.datasets.length; o < s; ++o)
        if (a.isDatasetVisible(o)) {
          i = a.getDatasetMeta(o), e = i.data, l = i.controller;
          break;
        }
    }
    if (!e)
      return 0;
    for (o = 0, s = e.length; o < s; ++o)
      r = l.resolveDataElementOptions(o), r.borderAlign !== "inner" && (n = Math.max(n, r.borderWidth || 0, r.hoverBorderWidth || 0));
    return n;
  }
  getMaxOffset(e) {
    let n = 0;
    for (let a = 0, o = e.length; a < o; ++a) {
      const s = this.resolveDataElementOptions(a);
      n = Math.max(n, s.offset || 0, s.hoverOffset || 0);
    }
    return n;
  }
  _getRingWeightOffset(e) {
    let n = 0;
    for (let a = 0; a < e; ++a)
      this.chart.isDatasetVisible(a) && (n += this._getRingWeight(a));
    return n;
  }
  _getRingWeight(e) {
    return Math.max(ht(this.chart.data.datasets[e].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class Vc extends ha {
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
  update(e) {
    const n = this._cachedMeta, { dataset: a, data: o = [], _dataset: s } = n, i = this.chart._animationsDisabled;
    let { start: l, count: r } = lr(n, o, i);
    this._drawStart = l, this._drawCount = r, rr(n) && (l = 0, r = o.length), a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!s._decimated, a.points = o;
    const c = this.resolveDatasetElementOptions(e);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(a, void 0, {
      animated: !i,
      options: c
    }, e), this.updateElements(o, l, r, e);
  }
  updateElements(e, n, a, o) {
    const s = o === "reset", { iScale: i, vScale: l, _stacked: r, _dataset: c } = this._cachedMeta, { sharedOptions: d, includeOptions: h } = this._getSharedOptions(n, o), p = i.axis, v = l.axis, { spanGaps: f, segment: y } = this.options, _ = An(f) ? f : Number.POSITIVE_INFINITY, m = this.chart._animationsDisabled || s || o === "none", g = n + a, x = e.length;
    let w = n > 0 && this.getParsed(n - 1);
    for (let D = 0; D < x; ++D) {
      const S = e[D], $ = m ? S : {};
      if (D < n || D >= g) {
        $.skip = !0;
        continue;
      }
      const M = this.getParsed(D), F = $t(M[v]), T = $[p] = i.getPixelForValue(M[p], D), B = $[v] = s || F ? l.getBasePixel() : l.getPixelForValue(r ? this.applyStack(l, M, r) : M[v], D);
      $.skip = isNaN(T) || isNaN(B) || F, $.stop = D > 0 && Math.abs(M[p] - w[p]) > _, y && ($.parsed = M, $.raw = c.data[D]), h && ($.options = d || this.resolveDataElementOptions(D, S.active ? "active" : o)), m || this.updateElement(S, D, $, o), w = M;
    }
  }
  getMaxOverflow() {
    const e = this._cachedMeta, n = e.dataset, a = n.options && n.options.borderWidth || 0, o = e.data || [];
    if (!o.length)
      return a;
    const s = o[0].size(this.resolveDataElementOptions(0)), i = o[o.length - 1].size(this.resolveDataElementOptions(o.length - 1));
    return Math.max(a, s, i) / 2;
  }
  draw() {
    const e = this._cachedMeta;
    e.dataset.updateControlPoints(this.chart.chartArea, e.iScale.axis), super.draw();
  }
}
class zc extends Oc {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function We() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class so {
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
  static override(e) {
    Object.assign(so.prototype, e);
  }
  options;
  constructor(e) {
    this.options = e || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return We();
  }
  parse() {
    return We();
  }
  format() {
    return We();
  }
  add() {
    return We();
  }
  diff() {
    return We();
  }
  startOf() {
    return We();
  }
  endOf() {
    return We();
  }
}
var Nc = {
  _date: so
};
function Wc(t, e, n, a) {
  const { controller: o, data: s, _sorted: i } = t, l = o._cachedMeta.iScale, r = t.dataset && t.dataset.options ? t.dataset.options.spanGaps : null;
  if (l && e === l.axis && e !== "r" && i && s.length) {
    const c = l._reversePixels ? nr : Ye;
    if (a) {
      if (o._sharedOptions) {
        const d = s[0], h = typeof d.getRange == "function" && d.getRange(e);
        if (h) {
          const p = c(s, e, n - h), v = c(s, e, n + h);
          return {
            lo: p.lo,
            hi: v.hi
          };
        }
      }
    } else {
      const d = c(s, e, n);
      if (r) {
        const { vScale: h } = o._cachedMeta, { _parsed: p } = t, v = p.slice(0, d.lo + 1).reverse().findIndex((y) => !$t(y[h.axis]));
        d.lo -= Math.max(0, v);
        const f = p.slice(d.hi).findIndex((y) => !$t(y[h.axis]));
        d.hi += Math.max(0, f);
      }
      return d;
    }
  }
  return {
    lo: 0,
    hi: s.length - 1
  };
}
function fa(t, e, n, a, o) {
  const s = t.getSortedVisibleDatasetMetas(), i = n[e];
  for (let l = 0, r = s.length; l < r; ++l) {
    const { index: c, data: d } = s[l], { lo: h, hi: p } = Wc(s[l], e, i, o);
    for (let v = h; v <= p; ++v) {
      const f = d[v];
      f.skip || a(f, c, v);
    }
  }
}
function jc(t) {
  const e = t.indexOf("x") !== -1, n = t.indexOf("y") !== -1;
  return function(a, o) {
    const s = e ? Math.abs(a.x - o.x) : 0, i = n ? Math.abs(a.y - o.y) : 0;
    return Math.sqrt(Math.pow(s, 2) + Math.pow(i, 2));
  };
}
function wa(t, e, n, a, o) {
  const s = [];
  return !o && !t.isPointInArea(e) || fa(t, n, e, function(l, r, c) {
    !o && !Bn(l, t.chartArea, 0) || l.inRange(e.x, e.y, a) && s.push({
      element: l,
      datasetIndex: r,
      index: c
    });
  }, !0), s;
}
function Hc(t, e, n, a) {
  let o = [];
  function s(i, l, r) {
    const { startAngle: c, endAngle: d } = i.getProps([
      "startAngle",
      "endAngle"
    ], a), { angle: h } = Zs(i, {
      x: e.x,
      y: e.y
    });
    Tn(h, c, d) && o.push({
      element: i,
      datasetIndex: l,
      index: r
    });
  }
  return fa(t, n, e, s), o;
}
function Yc(t, e, n, a, o, s) {
  let i = [];
  const l = jc(n);
  let r = Number.POSITIVE_INFINITY;
  function c(d, h, p) {
    const v = d.inRange(e.x, e.y, o);
    if (a && !v)
      return;
    const f = d.getCenterPoint(o);
    if (!(!!s || t.isPointInArea(f)) && !v)
      return;
    const _ = l(e, f);
    _ < r ? (i = [
      {
        element: d,
        datasetIndex: h,
        index: p
      }
    ], r = _) : _ === r && i.push({
      element: d,
      datasetIndex: h,
      index: p
    });
  }
  return fa(t, n, e, c), i;
}
function Ca(t, e, n, a, o, s) {
  return !s && !t.isPointInArea(e) ? [] : n === "r" && !a ? Hc(t, e, n, o) : Yc(t, e, n, a, o, s);
}
function qo(t, e, n, a, o) {
  const s = [], i = n === "x" ? "inXRange" : "inYRange";
  let l = !1;
  return fa(t, n, e, (r, c, d) => {
    r[i] && r[i](e[n], o) && (s.push({
      element: r,
      datasetIndex: c,
      index: d
    }), l = l || r.inRange(e.x, e.y, o));
  }), a && !l ? [] : s;
}
var Kc = {
  modes: {
    index(t, e, n, a) {
      const o = je(e, t), s = n.axis || "x", i = n.includeInvisible || !1, l = n.intersect ? wa(t, o, s, a, i) : Ca(t, o, s, !1, a, i), r = [];
      return l.length ? (t.getSortedVisibleDatasetMetas().forEach((c) => {
        const d = l[0].index, h = c.data[d];
        h && !h.skip && r.push({
          element: h,
          datasetIndex: c.index,
          index: d
        });
      }), r) : [];
    },
    dataset(t, e, n, a) {
      const o = je(e, t), s = n.axis || "xy", i = n.includeInvisible || !1;
      let l = n.intersect ? wa(t, o, s, a, i) : Ca(t, o, s, !1, a, i);
      if (l.length > 0) {
        const r = l[0].datasetIndex, c = t.getDatasetMeta(r).data;
        l = [];
        for (let d = 0; d < c.length; ++d)
          l.push({
            element: c[d],
            datasetIndex: r,
            index: d
          });
      }
      return l;
    },
    point(t, e, n, a) {
      const o = je(e, t), s = n.axis || "xy", i = n.includeInvisible || !1;
      return wa(t, o, s, a, i);
    },
    nearest(t, e, n, a) {
      const o = je(e, t), s = n.axis || "xy", i = n.includeInvisible || !1;
      return Ca(t, o, s, n.intersect, a, i);
    },
    x(t, e, n, a) {
      const o = je(e, t);
      return qo(t, o, "x", n.intersect, a);
    },
    y(t, e, n, a) {
      const o = je(e, t);
      return qo(t, o, "y", n.intersect, a);
    }
  }
};
const mi = [
  "left",
  "top",
  "right",
  "bottom"
];
function dn(t, e) {
  return t.filter((n) => n.pos === e);
}
function Xo(t, e) {
  return t.filter((n) => mi.indexOf(n.pos) === -1 && n.box.axis === e);
}
function un(t, e) {
  return t.sort((n, a) => {
    const o = e ? a : n, s = e ? n : a;
    return o.weight === s.weight ? o.index - s.index : o.weight - s.weight;
  });
}
function Uc(t) {
  const e = [];
  let n, a, o, s, i, l;
  for (n = 0, a = (t || []).length; n < a; ++n)
    o = t[n], { position: s, options: { stack: i, stackWeight: l = 1 } } = o, e.push({
      index: n,
      box: o,
      pos: s,
      horizontal: o.isHorizontal(),
      weight: o.weight,
      stack: i && s + i,
      stackWeight: l
    });
  return e;
}
function qc(t) {
  const e = {};
  for (const n of t) {
    const { stack: a, pos: o, stackWeight: s } = n;
    if (!a || !mi.includes(o))
      continue;
    const i = e[a] || (e[a] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    i.count++, i.weight += s;
  }
  return e;
}
function Xc(t, e) {
  const n = qc(t), { vBoxMaxWidth: a, hBoxMaxHeight: o } = e;
  let s, i, l;
  for (s = 0, i = t.length; s < i; ++s) {
    l = t[s];
    const { fullSize: r } = l.box, c = n[l.stack], d = c && l.stackWeight / c.weight;
    l.horizontal ? (l.width = d ? d * a : r && e.availableWidth, l.height = o) : (l.width = a, l.height = d ? d * o : r && e.availableHeight);
  }
  return n;
}
function Gc(t) {
  const e = Uc(t), n = un(e.filter((c) => c.box.fullSize), !0), a = un(dn(e, "left"), !0), o = un(dn(e, "right")), s = un(dn(e, "top"), !0), i = un(dn(e, "bottom")), l = Xo(e, "x"), r = Xo(e, "y");
  return {
    fullSize: n,
    leftAndTop: a.concat(s),
    rightAndBottom: o.concat(r).concat(i).concat(l),
    chartArea: dn(e, "chartArea"),
    vertical: a.concat(o).concat(r),
    horizontal: s.concat(i).concat(l)
  };
}
function Go(t, e, n, a) {
  return Math.max(t[n], e[n]) + Math.max(t[a], e[a]);
}
function bi(t, e) {
  t.top = Math.max(t.top, e.top), t.left = Math.max(t.left, e.left), t.bottom = Math.max(t.bottom, e.bottom), t.right = Math.max(t.right, e.right);
}
function Zc(t, e, n, a) {
  const { pos: o, box: s } = n, i = t.maxPadding;
  if (!kt(o)) {
    n.size && (t[o] -= n.size);
    const h = a[n.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, n.horizontal ? s.height : s.width), n.size = h.size / h.count, t[o] += n.size;
  }
  s.getPadding && bi(i, s.getPadding());
  const l = Math.max(0, e.outerWidth - Go(i, t, "left", "right")), r = Math.max(0, e.outerHeight - Go(i, t, "top", "bottom")), c = l !== t.w, d = r !== t.h;
  return t.w = l, t.h = r, n.horizontal ? {
    same: c,
    other: d
  } : {
    same: d,
    other: c
  };
}
function Qc(t) {
  const e = t.maxPadding;
  function n(a) {
    const o = Math.max(e[a] - t[a], 0);
    return t[a] += o, o;
  }
  t.y += n("top"), t.x += n("left"), n("right"), n("bottom");
}
function Jc(t, e) {
  const n = e.maxPadding;
  function a(o) {
    const s = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return o.forEach((i) => {
      s[i] = Math.max(e[i], n[i]);
    }), s;
  }
  return a(t ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function vn(t, e, n, a) {
  const o = [];
  let s, i, l, r, c, d;
  for (s = 0, i = t.length, c = 0; s < i; ++s) {
    l = t[s], r = l.box, r.update(l.width || e.w, l.height || e.h, Jc(l.horizontal, e));
    const { same: h, other: p } = Zc(e, n, l, a);
    c |= h && o.length, d = d || p, r.fullSize || o.push(l);
  }
  return c && vn(o, e, n, a) || d;
}
function Yn(t, e, n, a, o) {
  t.top = n, t.left = e, t.right = e + a, t.bottom = n + o, t.width = a, t.height = o;
}
function Zo(t, e, n, a) {
  const o = n.padding;
  let { x: s, y: i } = e;
  for (const l of t) {
    const r = l.box, c = a[l.stack] || {
      placed: 0,
      weight: 1
    }, d = l.stackWeight / c.weight || 1;
    if (l.horizontal) {
      const h = e.w * d, p = c.size || r.height;
      Dn(c.start) && (i = c.start), r.fullSize ? Yn(r, o.left, i, n.outerWidth - o.right - o.left, p) : Yn(r, e.left + c.placed, i, h, p), c.start = i, c.placed += h, i = r.bottom;
    } else {
      const h = e.h * d, p = c.size || r.width;
      Dn(c.start) && (s = c.start), r.fullSize ? Yn(r, s, o.top, p, n.outerHeight - o.bottom - o.top) : Yn(r, s, e.top + c.placed, p, h), c.start = s, c.placed += h, s = r.right;
    }
  }
  e.x = s, e.y = i;
}
var ie = {
  addBox(t, e) {
    t.boxes || (t.boxes = []), e.fullSize = e.fullSize || !1, e.position = e.position || "top", e.weight = e.weight || 0, e._layers = e._layers || function() {
      return [
        {
          z: 0,
          draw(n) {
            e.draw(n);
          }
        }
      ];
    }, t.boxes.push(e);
  },
  removeBox(t, e) {
    const n = t.boxes ? t.boxes.indexOf(e) : -1;
    n !== -1 && t.boxes.splice(n, 1);
  },
  configure(t, e, n) {
    e.fullSize = n.fullSize, e.position = n.position, e.weight = n.weight;
  },
  update(t, e, n, a) {
    if (!t)
      return;
    const o = re(t.options.layout.padding), s = Math.max(e - o.width, 0), i = Math.max(n - o.height, 0), l = Gc(t.boxes), r = l.vertical, c = l.horizontal;
    Mt(t.boxes, (y) => {
      typeof y.beforeLayout == "function" && y.beforeLayout();
    });
    const d = r.reduce((y, _) => _.box.options && _.box.options.display === !1 ? y : y + 1, 0) || 1, h = Object.freeze({
      outerWidth: e,
      outerHeight: n,
      padding: o,
      availableWidth: s,
      availableHeight: i,
      vBoxMaxWidth: s / 2 / d,
      hBoxMaxHeight: i / 2
    }), p = Object.assign({}, o);
    bi(p, re(a));
    const v = Object.assign({
      maxPadding: p,
      w: s,
      h: i,
      x: o.left,
      y: o.top
    }, o), f = Xc(r.concat(c), h);
    vn(l.fullSize, v, h, f), vn(r, v, h, f), vn(c, v, h, f) && vn(r, v, h, f), Qc(v), Zo(l.leftAndTop, v, h, f), v.x += v.w, v.y += v.h, Zo(l.rightAndBottom, v, h, f), t.chartArea = {
      left: v.left,
      top: v.top,
      right: v.left + v.w,
      bottom: v.top + v.h,
      height: v.h,
      width: v.w
    }, Mt(l.chartArea, (y) => {
      const _ = y.box;
      Object.assign(_, t.chartArea), _.update(v.w, v.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class vi {
  acquireContext(e, n) {
  }
  releaseContext(e) {
    return !1;
  }
  addEventListener(e, n, a) {
  }
  removeEventListener(e, n, a) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(e, n, a, o) {
    return n = Math.max(0, n || e.width), a = a || e.height, {
      width: n,
      height: Math.max(0, o ? Math.floor(n / o) : a)
    };
  }
  isAttached(e) {
    return !0;
  }
  updateConfig(e) {
  }
}
class td extends vi {
  acquireContext(e) {
    return e && e.getContext && e.getContext("2d") || null;
  }
  updateConfig(e) {
    e.options.animation = !1;
  }
}
const Jn = "$chartjs", ed = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Qo = (t) => t === null || t === "";
function nd(t, e) {
  const n = t.style, a = t.getAttribute("height"), o = t.getAttribute("width");
  if (t[Jn] = {
    initial: {
      height: a,
      width: o,
      style: {
        display: n.display,
        height: n.height,
        width: n.width
      }
    }
  }, n.display = n.display || "block", n.boxSizing = n.boxSizing || "border-box", Qo(o)) {
    const s = Eo(t, "width");
    s !== void 0 && (t.width = s);
  }
  if (Qo(a))
    if (t.style.height === "")
      t.height = t.width / (e || 2);
    else {
      const s = Eo(t, "height");
      s !== void 0 && (t.height = s);
    }
  return t;
}
const yi = Zr ? {
  passive: !0
} : !1;
function ad(t, e, n) {
  t && t.addEventListener(e, n, yi);
}
function od(t, e, n) {
  t && t.canvas && t.canvas.removeEventListener(e, n, yi);
}
function sd(t, e) {
  const n = ed[t.type] || t.type, { x: a, y: o } = je(t, e);
  return {
    type: n,
    chart: e,
    native: t,
    x: a !== void 0 ? a : null,
    y: o !== void 0 ? o : null
  };
}
function la(t, e) {
  for (const n of t)
    if (n === e || n.contains(e))
      return !0;
}
function id(t, e, n) {
  const a = t.canvas, o = new MutationObserver((s) => {
    let i = !1;
    for (const l of s)
      i = i || la(l.addedNodes, a), i = i && !la(l.removedNodes, a);
    i && n();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
function ld(t, e, n) {
  const a = t.canvas, o = new MutationObserver((s) => {
    let i = !1;
    for (const l of s)
      i = i || la(l.removedNodes, a), i = i && !la(l.addedNodes, a);
    i && n();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
const Fn = /* @__PURE__ */ new Map();
let Jo = 0;
function xi() {
  const t = window.devicePixelRatio;
  t !== Jo && (Jo = t, Fn.forEach((e, n) => {
    n.currentDevicePixelRatio !== t && e();
  }));
}
function rd(t, e) {
  Fn.size || window.addEventListener("resize", xi), Fn.set(t, e);
}
function cd(t) {
  Fn.delete(t), Fn.size || window.removeEventListener("resize", xi);
}
function dd(t, e, n) {
  const a = t.canvas, o = a && oo(a);
  if (!o)
    return;
  const s = ei((l, r) => {
    const c = o.clientWidth;
    n(l, r), c < o.clientWidth && n();
  }, window), i = new ResizeObserver((l) => {
    const r = l[0], c = r.contentRect.width, d = r.contentRect.height;
    c === 0 && d === 0 || s(c, d);
  });
  return i.observe(o), rd(t, s), i;
}
function $a(t, e, n) {
  n && n.disconnect(), e === "resize" && cd(t);
}
function ud(t, e, n) {
  const a = t.canvas, o = ei((s) => {
    t.ctx !== null && n(sd(s, t));
  }, t);
  return ad(a, e, o), o;
}
class hd extends vi {
  acquireContext(e, n) {
    const a = e && e.getContext && e.getContext("2d");
    return a && a.canvas === e ? (nd(e, n), a) : null;
  }
  releaseContext(e) {
    const n = e.canvas;
    if (!n[Jn])
      return !1;
    const a = n[Jn].initial;
    [
      "height",
      "width"
    ].forEach((s) => {
      const i = a[s];
      $t(i) ? n.removeAttribute(s) : n.setAttribute(s, i);
    });
    const o = a.style || {};
    return Object.keys(o).forEach((s) => {
      n.style[s] = o[s];
    }), n.width = n.width, delete n[Jn], !0;
  }
  addEventListener(e, n, a) {
    this.removeEventListener(e, n);
    const o = e.$proxies || (e.$proxies = {}), i = {
      attach: id,
      detach: ld,
      resize: dd
    }[n] || ud;
    o[n] = i(e, n, a);
  }
  removeEventListener(e, n) {
    const a = e.$proxies || (e.$proxies = {}), o = a[n];
    if (!o)
      return;
    ({
      attach: $a,
      detach: $a,
      resize: $a
    }[n] || od)(e, n, o), a[n] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(e, n, a, o) {
    return Gr(e, n, a, o);
  }
  isAttached(e) {
    const n = e && oo(e);
    return !!(n && n.isConnected);
  }
}
function fd(t) {
  return !ao() || typeof OffscreenCanvas < "u" && t instanceof OffscreenCanvas ? td : hd;
}
let $e = class {
  static defaults = {};
  static defaultRoutes = void 0;
  x;
  y;
  active = !1;
  options;
  $animations;
  tooltipPosition(e) {
    const { x: n, y: a } = this.getProps([
      "x",
      "y"
    ], e);
    return {
      x: n,
      y: a
    };
  }
  hasValue() {
    return An(this.x) && An(this.y);
  }
  getProps(e, n) {
    const a = this.$animations;
    if (!n || !a)
      return this;
    const o = {};
    return e.forEach((s) => {
      o[s] = a[s] && a[s].active() ? a[s]._to : this[s];
    }), o;
  }
};
function gd(t, e) {
  const n = t.options.ticks, a = pd(t), o = Math.min(n.maxTicksLimit || a, a), s = n.major.enabled ? bd(e) : [], i = s.length, l = s[0], r = s[i - 1], c = [];
  if (i > o)
    return vd(e, c, s, i / o), c;
  const d = md(s, e, o);
  if (i > 0) {
    let h, p;
    const v = i > 1 ? Math.round((r - l) / (i - 1)) : null;
    for (Kn(e, c, d, $t(v) ? 0 : l - v, l), h = 0, p = i - 1; h < p; h++)
      Kn(e, c, d, s[h], s[h + 1]);
    return Kn(e, c, d, r, $t(v) ? e.length : r + v), c;
  }
  return Kn(e, c, d), c;
}
function pd(t) {
  const e = t.options.offset, n = t._tickSize(), a = t._length / n + (e ? 0 : 1), o = t._maxLength / n;
  return Math.floor(Math.min(a, o));
}
function md(t, e, n) {
  const a = yd(t), o = e.length / n;
  if (!a)
    return Math.max(o, 1);
  const s = Xl(a);
  for (let i = 0, l = s.length - 1; i < l; i++) {
    const r = s[i];
    if (r > o)
      return r;
  }
  return Math.max(o, 1);
}
function bd(t) {
  const e = [];
  let n, a;
  for (n = 0, a = t.length; n < a; n++)
    t[n].major && e.push(n);
  return e;
}
function vd(t, e, n, a) {
  let o = 0, s = n[0], i;
  for (a = Math.ceil(a), i = 0; i < t.length; i++)
    i === s && (e.push(t[i]), o++, s = n[o * a]);
}
function Kn(t, e, n, a, o) {
  const s = ht(a, 0), i = Math.min(ht(o, t.length), t.length);
  let l = 0, r, c, d;
  for (n = Math.ceil(n), o && (r = o - a, n = r / Math.floor(r / n)), d = s; d < 0; )
    l++, d = Math.round(s + l * n);
  for (c = Math.max(s, 0); c < i; c++)
    c === d && (e.push(t[c]), l++, d = Math.round(s + l * n));
}
function yd(t) {
  const e = t.length;
  let n, a;
  if (e < 2)
    return !1;
  for (a = t[0], n = 1; n < e; ++n)
    if (t[n] - t[n - 1] !== a)
      return !1;
  return a;
}
const xd = (t) => t === "left" ? "right" : t === "right" ? "left" : t, ts = (t, e, n) => e === "top" || e === "left" ? t[e] + n : t[e] - n, es = (t, e) => Math.min(e || t, t);
function ns(t, e) {
  const n = [], a = t.length / e, o = t.length;
  let s = 0;
  for (; s < o; s += a)
    n.push(t[Math.floor(s)]);
  return n;
}
function _d(t, e, n) {
  const a = t.ticks.length, o = Math.min(e, a - 1), s = t._startPixel, i = t._endPixel, l = 1e-6;
  let r = t.getPixelForTick(o), c;
  if (!(n && (a === 1 ? c = Math.max(r - s, i - r) : e === 0 ? c = (t.getPixelForTick(1) - r) / 2 : c = (r - t.getPixelForTick(o - 1)) / 2, r += o < e ? c : -c, r < s - l || r > i + l)))
    return r;
}
function kd(t, e) {
  Mt(t, (n) => {
    const a = n.gc, o = a.length / 2;
    let s;
    if (o > e) {
      for (s = 0; s < o; ++s)
        delete n.data[a[s]];
      a.splice(0, o);
    }
  });
}
function hn(t) {
  return t.drawTicks ? t.tickLength : 0;
}
function as(t, e) {
  if (!t.display)
    return 0;
  const n = Ut(t.font, e), a = re(t.padding);
  return (Vt(t.text) ? t.text.length : 1) * n.lineHeight + a.height;
}
function wd(t, e) {
  return Ge(t, {
    scale: e,
    type: "scale"
  });
}
function Cd(t, e, n) {
  return Ge(t, {
    tick: n,
    index: e,
    type: "tick"
  });
}
function $d(t, e, n) {
  let a = qa(t);
  return (n && e !== "right" || !n && e === "right") && (a = xd(a)), a;
}
function Md(t, e, n, a) {
  const { top: o, left: s, bottom: i, right: l, chart: r } = t, { chartArea: c, scales: d } = r;
  let h = 0, p, v, f;
  const y = i - o, _ = l - s;
  if (t.isHorizontal()) {
    if (v = Ht(a, s, l), kt(n)) {
      const m = Object.keys(n)[0], g = n[m];
      f = d[m].getPixelForValue(g) + y - e;
    } else n === "center" ? f = (c.bottom + c.top) / 2 + y - e : f = ts(t, n, e);
    p = l - s;
  } else {
    if (kt(n)) {
      const m = Object.keys(n)[0], g = n[m];
      v = d[m].getPixelForValue(g) - _ + e;
    } else n === "center" ? v = (c.left + c.right) / 2 - _ + e : v = ts(t, n, e);
    f = Ht(a, i, o), h = n === "left" ? -zt : zt;
  }
  return {
    titleX: v,
    titleY: f,
    maxWidth: p,
    rotation: h
  };
}
class rn extends $e {
  constructor(e) {
    super(), this.id = e.id, this.type = e.type, this.options = void 0, this.ctx = e.ctx, this.chart = e.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0;
  }
  init(e) {
    this.options = e.setContext(this.getContext()), this.axis = e.axis, this._userMin = this.parse(e.min), this._userMax = this.parse(e.max), this._suggestedMin = this.parse(e.suggestedMin), this._suggestedMax = this.parse(e.suggestedMax);
  }
  parse(e, n) {
    return e;
  }
  getUserBounds() {
    let { _userMin: e, _userMax: n, _suggestedMin: a, _suggestedMax: o } = this;
    return e = fe(e, Number.POSITIVE_INFINITY), n = fe(n, Number.NEGATIVE_INFINITY), a = fe(a, Number.POSITIVE_INFINITY), o = fe(o, Number.NEGATIVE_INFINITY), {
      min: fe(e, a),
      max: fe(n, o),
      minDefined: le(e),
      maxDefined: le(n)
    };
  }
  getMinMax(e) {
    let { min: n, max: a, minDefined: o, maxDefined: s } = this.getUserBounds(), i;
    if (o && s)
      return {
        min: n,
        max: a
      };
    const l = this.getMatchingVisibleMetas();
    for (let r = 0, c = l.length; r < c; ++r)
      i = l[r].controller.getMinMax(this, e), o || (n = Math.min(n, i.min)), s || (a = Math.max(a, i.max));
    return n = s && n > a ? a : n, a = o && n > a ? n : a, {
      min: fe(n, fe(a, n)),
      max: fe(a, fe(n, a))
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
    const e = this.chart.data;
    return this.options.labels || (this.isHorizontal() ? e.xLabels : e.yLabels) || e.labels || [];
  }
  getLabelItems(e = this.chart.chartArea) {
    return this._labelItems || (this._labelItems = this._computeLabelItems(e));
  }
  beforeLayout() {
    this._cache = {}, this._dataLimitsCached = !1;
  }
  beforeUpdate() {
    Tt(this.options.beforeUpdate, [
      this
    ]);
  }
  update(e, n, a) {
    const { beginAtZero: o, grace: s, ticks: i } = this.options, l = i.sampleSize;
    this.beforeUpdate(), this.maxWidth = e, this.maxHeight = n, this._margins = a = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, a), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + a.left + a.right : this.height + a.top + a.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Dr(this, s, o), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const r = l < this.ticks.length;
    this._convertTicksToLabels(r ? ns(this.ticks, l) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = gd(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), r && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let e = this.options.reverse, n, a;
    this.isHorizontal() ? (n = this.left, a = this.right) : (n = this.top, a = this.bottom, e = !e), this._startPixel = n, this._endPixel = a, this._reversePixels = e, this._length = a - n, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    Tt(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    Tt(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    Tt(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(e) {
    this.chart.notifyPlugins(e, this.getContext()), Tt(this.options[e], [
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
    Tt(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(e) {
    const n = this.options.ticks;
    let a, o, s;
    for (a = 0, o = e.length; a < o; a++)
      s = e[a], s.label = Tt(n.callback, [
        s.value,
        a,
        e
      ], this);
  }
  afterTickToLabelConversion() {
    Tt(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    Tt(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const e = this.options, n = e.ticks, a = es(this.ticks.length, e.ticks.maxTicksLimit), o = n.minRotation || 0, s = n.maxRotation;
    let i = o, l, r, c;
    if (!this._isVisible() || !n.display || o >= s || a <= 1 || !this.isHorizontal()) {
      this.labelRotation = o;
      return;
    }
    const d = this._getLabelSizes(), h = d.widest.width, p = d.highest.height, v = Kt(this.chart.width - h, 0, this.maxWidth);
    l = e.offset ? this.maxWidth / a : v / (a - 1), h + 6 > l && (l = v / (a - (e.offset ? 0.5 : 1)), r = this.maxHeight - hn(e.grid) - n.padding - as(e.title, this.chart.options.font), c = Math.sqrt(h * h + p * p), i = Jl(Math.min(Math.asin(Kt((d.highest.height + 6) / l, -1, 1)), Math.asin(Kt(r / c, -1, 1)) - Math.asin(Kt(p / c, -1, 1)))), i = Math.max(o, Math.min(s, i))), this.labelRotation = i;
  }
  afterCalculateLabelRotation() {
    Tt(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    Tt(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const e = {
      width: 0,
      height: 0
    }, { chart: n, options: { ticks: a, title: o, grid: s } } = this, i = this._isVisible(), l = this.isHorizontal();
    if (i) {
      const r = as(o, n.options.font);
      if (l ? (e.width = this.maxWidth, e.height = hn(s) + r) : (e.height = this.maxHeight, e.width = hn(s) + r), a.display && this.ticks.length) {
        const { first: c, last: d, widest: h, highest: p } = this._getLabelSizes(), v = a.padding * 2, f = we(this.labelRotation), y = Math.cos(f), _ = Math.sin(f);
        if (l) {
          const m = a.mirror ? 0 : _ * h.width + y * p.height;
          e.height = Math.min(this.maxHeight, e.height + m + v);
        } else {
          const m = a.mirror ? 0 : y * h.width + _ * p.height;
          e.width = Math.min(this.maxWidth, e.width + m + v);
        }
        this._calculatePadding(c, d, _, y);
      }
    }
    this._handleMargins(), l ? (this.width = this._length = n.width - this._margins.left - this._margins.right, this.height = e.height) : (this.width = e.width, this.height = this._length = n.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(e, n, a, o) {
    const { ticks: { align: s, padding: i }, position: l } = this.options, r = this.labelRotation !== 0, c = l !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const d = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let p = 0, v = 0;
      r ? c ? (p = o * e.width, v = a * n.height) : (p = a * e.height, v = o * n.width) : s === "start" ? v = n.width : s === "end" ? p = e.width : s !== "inner" && (p = e.width / 2, v = n.width / 2), this.paddingLeft = Math.max((p - d + i) * this.width / (this.width - d), 0), this.paddingRight = Math.max((v - h + i) * this.width / (this.width - h), 0);
    } else {
      let d = n.height / 2, h = e.height / 2;
      s === "start" ? (d = 0, h = e.height) : s === "end" && (d = n.height, h = 0), this.paddingTop = d + i, this.paddingBottom = h + i;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    Tt(this.options.afterFit, [
      this
    ]);
  }
  isHorizontal() {
    const { axis: e, position: n } = this.options;
    return n === "top" || n === "bottom" || e === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(e) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(e);
    let n, a;
    for (n = 0, a = e.length; n < a; n++)
      $t(e[n].label) && (e.splice(n, 1), a--, n--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let e = this._labelSizes;
    if (!e) {
      const n = this.options.ticks.sampleSize;
      let a = this.ticks;
      n < a.length && (a = ns(a, n)), this._labelSizes = e = this._computeLabelSizes(a, a.length, this.options.ticks.maxTicksLimit);
    }
    return e;
  }
  _computeLabelSizes(e, n, a) {
    const { ctx: o, _longestTextCache: s } = this, i = [], l = [], r = Math.floor(n / es(n, a));
    let c = 0, d = 0, h, p, v, f, y, _, m, g, x, w, D;
    for (h = 0; h < n; h += r) {
      if (f = e[h].label, y = this._resolveTickFontOptions(h), o.font = _ = y.string, m = s[_] = s[_] || {
        data: {},
        gc: []
      }, g = y.lineHeight, x = w = 0, !$t(f) && !Vt(f))
        x = To(o, m.data, m.gc, x, f), w = g;
      else if (Vt(f))
        for (p = 0, v = f.length; p < v; ++p)
          D = f[p], !$t(D) && !Vt(D) && (x = To(o, m.data, m.gc, x, D), w += g);
      i.push(x), l.push(w), c = Math.max(x, c), d = Math.max(w, d);
    }
    kd(s, n);
    const S = i.indexOf(c), $ = l.indexOf(d), M = (F) => ({
      width: i[F] || 0,
      height: l[F] || 0
    });
    return {
      first: M(0),
      last: M(n - 1),
      widest: M(S),
      highest: M($),
      widths: i,
      heights: l
    };
  }
  getLabelForValue(e) {
    return e;
  }
  getPixelForValue(e, n) {
    return NaN;
  }
  getValueForPixel(e) {
  }
  getPixelForTick(e) {
    const n = this.ticks;
    return e < 0 || e > n.length - 1 ? null : this.getPixelForValue(n[e].value);
  }
  getPixelForDecimal(e) {
    this._reversePixels && (e = 1 - e);
    const n = this._startPixel + e * this._length;
    return er(this._alignToPixels ? Ne(this.chart, n, 0) : n);
  }
  getDecimalForPixel(e) {
    const n = (e - this._startPixel) / this._length;
    return this._reversePixels ? 1 - n : n;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: e, max: n } = this;
    return e < 0 && n < 0 ? n : e > 0 && n > 0 ? e : 0;
  }
  getContext(e) {
    const n = this.ticks || [];
    if (e >= 0 && e < n.length) {
      const a = n[e];
      return a.$context || (a.$context = Cd(this.getContext(), e, a));
    }
    return this.$context || (this.$context = wd(this.chart.getContext(), this));
  }
  _tickSize() {
    const e = this.options.ticks, n = we(this.labelRotation), a = Math.abs(Math.cos(n)), o = Math.abs(Math.sin(n)), s = this._getLabelSizes(), i = e.autoSkipPadding || 0, l = s ? s.widest.width + i : 0, r = s ? s.highest.height + i : 0;
    return this.isHorizontal() ? r * a > l * o ? l / a : r / o : r * o < l * a ? r / a : l / o;
  }
  _isVisible() {
    const e = this.options.display;
    return e !== "auto" ? !!e : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(e) {
    const n = this.axis, a = this.chart, o = this.options, { grid: s, position: i, border: l } = o, r = s.offset, c = this.isHorizontal(), h = this.ticks.length + (r ? 1 : 0), p = hn(s), v = [], f = l.setContext(this.getContext()), y = f.display ? f.width : 0, _ = y / 2, m = function(W) {
      return Ne(a, W, y);
    };
    let g, x, w, D, S, $, M, F, T, B, P, E;
    if (i === "top")
      g = m(this.bottom), $ = this.bottom - p, F = g - _, B = m(e.top) + _, E = e.bottom;
    else if (i === "bottom")
      g = m(this.top), B = e.top, E = m(e.bottom) - _, $ = g + _, F = this.top + p;
    else if (i === "left")
      g = m(this.right), S = this.right - p, M = g - _, T = m(e.left) + _, P = e.right;
    else if (i === "right")
      g = m(this.left), T = e.left, P = m(e.right) - _, S = g + _, M = this.left + p;
    else if (n === "x") {
      if (i === "center")
        g = m((e.top + e.bottom) / 2 + 0.5);
      else if (kt(i)) {
        const W = Object.keys(i)[0], Q = i[W];
        g = m(this.chart.scales[W].getPixelForValue(Q));
      }
      B = e.top, E = e.bottom, $ = g + _, F = $ + p;
    } else if (n === "y") {
      if (i === "center")
        g = m((e.left + e.right) / 2);
      else if (kt(i)) {
        const W = Object.keys(i)[0], Q = i[W];
        g = m(this.chart.scales[W].getPixelForValue(Q));
      }
      S = g - _, M = S - p, T = e.left, P = e.right;
    }
    const N = ht(o.ticks.maxTicksLimit, h), Y = Math.max(1, Math.ceil(h / N));
    for (x = 0; x < h; x += Y) {
      const W = this.getContext(x), Q = s.setContext(W), tt = l.setContext(W), ct = Q.lineWidth, z = Q.color, K = tt.dash || [], X = tt.dashOffset, lt = Q.tickWidth, st = Q.tickColor, Dt = Q.tickBorderDash || [], xt = Q.tickBorderDashOffset;
      w = _d(this, x, r), w !== void 0 && (D = Ne(a, w, ct), c ? S = M = T = P = D : $ = F = B = E = D, v.push({
        tx1: S,
        ty1: $,
        tx2: M,
        ty2: F,
        x1: T,
        y1: B,
        x2: P,
        y2: E,
        width: ct,
        color: z,
        borderDash: K,
        borderDashOffset: X,
        tickWidth: lt,
        tickColor: st,
        tickBorderDash: Dt,
        tickBorderDashOffset: xt
      }));
    }
    return this._ticksLength = h, this._borderValue = g, v;
  }
  _computeLabelItems(e) {
    const n = this.axis, a = this.options, { position: o, ticks: s } = a, i = this.isHorizontal(), l = this.ticks, { align: r, crossAlign: c, padding: d, mirror: h } = s, p = hn(a.grid), v = p + d, f = h ? -d : v, y = -we(this.labelRotation), _ = [];
    let m, g, x, w, D, S, $, M, F, T, B, P, E = "middle";
    if (o === "top")
      S = this.bottom - f, $ = this._getXAxisLabelAlignment();
    else if (o === "bottom")
      S = this.top + f, $ = this._getXAxisLabelAlignment();
    else if (o === "left") {
      const Y = this._getYAxisLabelAlignment(p);
      $ = Y.textAlign, D = Y.x;
    } else if (o === "right") {
      const Y = this._getYAxisLabelAlignment(p);
      $ = Y.textAlign, D = Y.x;
    } else if (n === "x") {
      if (o === "center")
        S = (e.top + e.bottom) / 2 + v;
      else if (kt(o)) {
        const Y = Object.keys(o)[0], W = o[Y];
        S = this.chart.scales[Y].getPixelForValue(W) + v;
      }
      $ = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (o === "center")
        D = (e.left + e.right) / 2 - v;
      else if (kt(o)) {
        const Y = Object.keys(o)[0], W = o[Y];
        D = this.chart.scales[Y].getPixelForValue(W);
      }
      $ = this._getYAxisLabelAlignment(p).textAlign;
    }
    n === "y" && (r === "start" ? E = "top" : r === "end" && (E = "bottom"));
    const N = this._getLabelSizes();
    for (m = 0, g = l.length; m < g; ++m) {
      x = l[m], w = x.label;
      const Y = s.setContext(this.getContext(m));
      M = this.getPixelForTick(m) + s.labelOffset, F = this._resolveTickFontOptions(m), T = F.lineHeight, B = Vt(w) ? w.length : 1;
      const W = B / 2, Q = Y.color, tt = Y.textStrokeColor, ct = Y.textStrokeWidth;
      let z = $;
      i ? (D = M, $ === "inner" && (m === g - 1 ? z = this.options.reverse ? "left" : "right" : m === 0 ? z = this.options.reverse ? "right" : "left" : z = "center"), o === "top" ? c === "near" || y !== 0 ? P = -B * T + T / 2 : c === "center" ? P = -N.highest.height / 2 - W * T + T : P = -N.highest.height + T / 2 : c === "near" || y !== 0 ? P = T / 2 : c === "center" ? P = N.highest.height / 2 - W * T : P = N.highest.height - B * T, h && (P *= -1), y !== 0 && !Y.showLabelBackdrop && (D += T / 2 * Math.sin(y))) : (S = M, P = (1 - B) * T / 2);
      let K;
      if (Y.showLabelBackdrop) {
        const X = re(Y.backdropPadding), lt = N.heights[m], st = N.widths[m];
        let Dt = P - X.top, xt = 0 - X.left;
        switch (E) {
          case "middle":
            Dt -= lt / 2;
            break;
          case "bottom":
            Dt -= lt;
            break;
        }
        switch ($) {
          case "center":
            xt -= st / 2;
            break;
          case "right":
            xt -= st;
            break;
          case "inner":
            m === g - 1 ? xt -= st : m > 0 && (xt -= st / 2);
            break;
        }
        K = {
          left: xt,
          top: Dt,
          width: st + X.width,
          height: lt + X.height,
          color: Y.backdropColor
        };
      }
      _.push({
        label: w,
        font: F,
        textOffset: P,
        options: {
          rotation: y,
          color: Q,
          strokeColor: tt,
          strokeWidth: ct,
          textAlign: z,
          textBaseline: E,
          translation: [
            D,
            S
          ],
          backdrop: K
        }
      });
    }
    return _;
  }
  _getXAxisLabelAlignment() {
    const { position: e, ticks: n } = this.options;
    if (-we(this.labelRotation))
      return e === "top" ? "left" : "right";
    let o = "center";
    return n.align === "start" ? o = "left" : n.align === "end" ? o = "right" : n.align === "inner" && (o = "inner"), o;
  }
  _getYAxisLabelAlignment(e) {
    const { position: n, ticks: { crossAlign: a, mirror: o, padding: s } } = this.options, i = this._getLabelSizes(), l = e + s, r = i.widest.width;
    let c, d;
    return n === "left" ? o ? (d = this.right + s, a === "near" ? c = "left" : a === "center" ? (c = "center", d += r / 2) : (c = "right", d += r)) : (d = this.right - l, a === "near" ? c = "right" : a === "center" ? (c = "center", d -= r / 2) : (c = "left", d = this.left)) : n === "right" ? o ? (d = this.left + s, a === "near" ? c = "right" : a === "center" ? (c = "center", d -= r / 2) : (c = "left", d -= r)) : (d = this.left + l, a === "near" ? c = "left" : a === "center" ? (c = "center", d += r / 2) : (c = "right", d = this.right)) : c = "right", {
      textAlign: c,
      x: d
    };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror)
      return;
    const e = this.chart, n = this.options.position;
    if (n === "left" || n === "right")
      return {
        top: 0,
        left: this.left,
        bottom: e.height,
        right: this.right
      };
    if (n === "top" || n === "bottom")
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: e.width
      };
  }
  drawBackground() {
    const { ctx: e, options: { backgroundColor: n }, left: a, top: o, width: s, height: i } = this;
    n && (e.save(), e.fillStyle = n, e.fillRect(a, o, s, i), e.restore());
  }
  getLineWidthForValue(e) {
    const n = this.options.grid;
    if (!this._isVisible() || !n.display)
      return 0;
    const o = this.ticks.findIndex((s) => s.value === e);
    return o >= 0 ? n.setContext(this.getContext(o)).lineWidth : 0;
  }
  drawGrid(e) {
    const n = this.options.grid, a = this.ctx, o = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(e));
    let s, i;
    const l = (r, c, d) => {
      !d.width || !d.color || (a.save(), a.lineWidth = d.width, a.strokeStyle = d.color, a.setLineDash(d.borderDash || []), a.lineDashOffset = d.borderDashOffset, a.beginPath(), a.moveTo(r.x, r.y), a.lineTo(c.x, c.y), a.stroke(), a.restore());
    };
    if (n.display)
      for (s = 0, i = o.length; s < i; ++s) {
        const r = o[s];
        n.drawOnChartArea && l({
          x: r.x1,
          y: r.y1
        }, {
          x: r.x2,
          y: r.y2
        }, r), n.drawTicks && l({
          x: r.tx1,
          y: r.ty1
        }, {
          x: r.tx2,
          y: r.ty2
        }, {
          color: r.tickColor,
          width: r.tickWidth,
          borderDash: r.tickBorderDash,
          borderDashOffset: r.tickBorderDashOffset
        });
      }
  }
  drawBorder() {
    const { chart: e, ctx: n, options: { border: a, grid: o } } = this, s = a.setContext(this.getContext()), i = a.display ? s.width : 0;
    if (!i)
      return;
    const l = o.setContext(this.getContext(0)).lineWidth, r = this._borderValue;
    let c, d, h, p;
    this.isHorizontal() ? (c = Ne(e, this.left, i) - i / 2, d = Ne(e, this.right, l) + l / 2, h = p = r) : (h = Ne(e, this.top, i) - i / 2, p = Ne(e, this.bottom, l) + l / 2, c = d = r), n.save(), n.lineWidth = s.width, n.strokeStyle = s.color, n.beginPath(), n.moveTo(c, h), n.lineTo(d, p), n.stroke(), n.restore();
  }
  drawLabels(e) {
    if (!this.options.ticks.display)
      return;
    const a = this.ctx, o = this._computeLabelArea();
    o && Za(a, o);
    const s = this.getLabelItems(e);
    for (const i of s) {
      const l = i.options, r = i.font, c = i.label, d = i.textOffset;
      Ln(a, c, 0, d, r, l);
    }
    o && Qa(a);
  }
  drawTitle() {
    const { ctx: e, options: { position: n, title: a, reverse: o } } = this;
    if (!a.display)
      return;
    const s = Ut(a.font), i = re(a.padding), l = a.align;
    let r = s.lineHeight / 2;
    n === "bottom" || n === "center" || kt(n) ? (r += i.bottom, Vt(a.text) && (r += s.lineHeight * (a.text.length - 1))) : r += i.top;
    const { titleX: c, titleY: d, maxWidth: h, rotation: p } = Md(this, r, n, l);
    Ln(e, a.text, 0, 0, s, {
      color: a.color,
      maxWidth: h,
      rotation: p,
      textAlign: $d(l, n, o),
      textBaseline: "middle",
      translation: [
        c,
        d
      ]
    });
  }
  draw(e) {
    this._isVisible() && (this.drawBackground(), this.drawGrid(e), this.drawBorder(), this.drawTitle(), this.drawLabels(e));
  }
  _layers() {
    const e = this.options, n = e.ticks && e.ticks.z || 0, a = ht(e.grid && e.grid.z, -1), o = ht(e.border && e.border.z, 0);
    return !this._isVisible() || this.draw !== rn.prototype.draw ? [
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
  getMatchingVisibleMetas(e) {
    const n = this.chart.getSortedVisibleDatasetMetas(), a = this.axis + "AxisID", o = [];
    let s, i;
    for (s = 0, i = n.length; s < i; ++s) {
      const l = n[s];
      l[a] === this.id && (!e || l.type === e) && o.push(l);
    }
    return o;
  }
  _resolveTickFontOptions(e) {
    const n = this.options.ticks.setContext(this.getContext(e));
    return Ut(n.font);
  }
  _maxDigits() {
    const e = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / e;
  }
}
class Un {
  constructor(e, n, a) {
    this.type = e, this.scope = n, this.override = a, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(e) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, e.prototype);
  }
  register(e) {
    const n = Object.getPrototypeOf(e);
    let a;
    Ad(n) && (a = this.register(n));
    const o = this.items, s = e.id, i = this.scope + "." + s;
    if (!s)
      throw new Error("class does not have id: " + e);
    return s in o || (o[s] = e, Sd(e, i, a), this.override && It.override(e.id, e.overrides)), i;
  }
  get(e) {
    return this.items[e];
  }
  unregister(e) {
    const n = this.items, a = e.id, o = this.scope;
    a in n && delete n[a], o && a in It[o] && (delete It[o][a], this.override && delete Xe[a]);
  }
}
function Sd(t, e, n) {
  const a = Sn(/* @__PURE__ */ Object.create(null), [
    n ? It.get(n) : {},
    It.get(e),
    t.defaults
  ]);
  It.set(e, a), t.defaultRoutes && Dd(e, t.defaultRoutes), t.descriptors && It.describe(e, t.descriptors);
}
function Dd(t, e) {
  Object.keys(e).forEach((n) => {
    const a = n.split("."), o = a.pop(), s = [
      t
    ].concat(a).join("."), i = e[n].split("."), l = i.pop(), r = i.join(".");
    It.route(s, o, r, l);
  });
}
function Ad(t) {
  return "id" in t && "defaults" in t;
}
class Td {
  constructor() {
    this.controllers = new Un(ha, "datasets", !0), this.elements = new Un($e, "elements"), this.plugins = new Un(Object, "plugins"), this.scales = new Un(rn, "scales"), this._typedRegistries = [
      this.controllers,
      this.scales,
      this.elements
    ];
  }
  add(...e) {
    this._each("register", e);
  }
  remove(...e) {
    this._each("unregister", e);
  }
  addControllers(...e) {
    this._each("register", e, this.controllers);
  }
  addElements(...e) {
    this._each("register", e, this.elements);
  }
  addPlugins(...e) {
    this._each("register", e, this.plugins);
  }
  addScales(...e) {
    this._each("register", e, this.scales);
  }
  getController(e) {
    return this._get(e, this.controllers, "controller");
  }
  getElement(e) {
    return this._get(e, this.elements, "element");
  }
  getPlugin(e) {
    return this._get(e, this.plugins, "plugin");
  }
  getScale(e) {
    return this._get(e, this.scales, "scale");
  }
  removeControllers(...e) {
    this._each("unregister", e, this.controllers);
  }
  removeElements(...e) {
    this._each("unregister", e, this.elements);
  }
  removePlugins(...e) {
    this._each("unregister", e, this.plugins);
  }
  removeScales(...e) {
    this._each("unregister", e, this.scales);
  }
  _each(e, n, a) {
    [
      ...n
    ].forEach((o) => {
      const s = a || this._getRegistryForType(o);
      a || s.isForType(o) || s === this.plugins && o.id ? this._exec(e, s, o) : Mt(o, (i) => {
        const l = a || this._getRegistryForType(i);
        this._exec(e, l, i);
      });
    });
  }
  _exec(e, n, a) {
    const o = Ka(e);
    Tt(a["before" + o], [], a), n[e](a), Tt(a["after" + o], [], a);
  }
  _getRegistryForType(e) {
    for (let n = 0; n < this._typedRegistries.length; n++) {
      const a = this._typedRegistries[n];
      if (a.isForType(e))
        return a;
    }
    return this.plugins;
  }
  _get(e, n, a) {
    const o = n.get(e);
    if (o === void 0)
      throw new Error('"' + e + '" is not a registered ' + a + ".");
    return o;
  }
}
var pe = /* @__PURE__ */ new Td();
class Bd {
  constructor() {
    this._init = void 0;
  }
  notify(e, n, a, o) {
    if (n === "beforeInit" && (this._init = this._createDescriptors(e, !0), this._notify(this._init, e, "install")), this._init === void 0)
      return;
    const s = o ? this._descriptors(e).filter(o) : this._descriptors(e), i = this._notify(s, e, n, a);
    return n === "afterDestroy" && (this._notify(s, e, "stop"), this._notify(this._init, e, "uninstall"), this._init = void 0), i;
  }
  _notify(e, n, a, o) {
    o = o || {};
    for (const s of e) {
      const i = s.plugin, l = i[a], r = [
        n,
        o,
        s.options
      ];
      if (Tt(l, r, i) === !1 && o.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    $t(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(e) {
    if (this._cache)
      return this._cache;
    const n = this._cache = this._createDescriptors(e);
    return this._notifyStateChanges(e), n;
  }
  _createDescriptors(e, n) {
    const a = e && e.config, o = ht(a.options && a.options.plugins, {}), s = Ld(a);
    return o === !1 && !n ? [] : Pd(e, s, o, n);
  }
  _notifyStateChanges(e) {
    const n = this._oldCache || [], a = this._cache, o = (s, i) => s.filter((l) => !i.some((r) => l.plugin.id === r.plugin.id));
    this._notify(o(n, a), e, "stop"), this._notify(o(a, n), e, "start");
  }
}
function Ld(t) {
  const e = {}, n = [], a = Object.keys(pe.plugins.items);
  for (let s = 0; s < a.length; s++)
    n.push(pe.getPlugin(a[s]));
  const o = t.plugins || [];
  for (let s = 0; s < o.length; s++) {
    const i = o[s];
    n.indexOf(i) === -1 && (n.push(i), e[i.id] = !0);
  }
  return {
    plugins: n,
    localIds: e
  };
}
function Fd(t, e) {
  return !e && t === !1 ? null : t === !0 ? {} : t;
}
function Pd(t, { plugins: e, localIds: n }, a, o) {
  const s = [], i = t.getContext();
  for (const l of e) {
    const r = l.id, c = Fd(a[r], o);
    c !== null && s.push({
      plugin: l,
      options: Ed(t.config, {
        plugin: l,
        local: n[r]
      }, c, i)
    });
  }
  return s;
}
function Ed(t, { plugin: e, local: n }, a, o) {
  const s = t.pluginScopeKeys(e), i = t.getOptionScopes(a, s);
  return n && e.defaults && i.push(e.defaults), t.createResolver(i, o, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Oa(t, e) {
  const n = It.datasets[t] || {};
  return ((e.datasets || {})[t] || {}).indexAxis || e.indexAxis || n.indexAxis || "x";
}
function Id(t, e) {
  let n = t;
  return t === "_index_" ? n = e : t === "_value_" && (n = e === "x" ? "y" : "x"), n;
}
function Rd(t, e) {
  return t === e ? "_index_" : "_value_";
}
function os(t) {
  if (t === "x" || t === "y" || t === "r")
    return t;
}
function Od(t) {
  if (t === "top" || t === "bottom")
    return "x";
  if (t === "left" || t === "right")
    return "y";
}
function Va(t, ...e) {
  if (os(t))
    return t;
  for (const n of e) {
    const a = n.axis || Od(n.position) || t.length > 1 && os(t[0].toLowerCase());
    if (a)
      return a;
  }
  throw new Error(`Cannot determine type of '${t}' axis. Please provide 'axis' or 'position' option.`);
}
function ss(t, e, n) {
  if (n[e + "AxisID"] === t)
    return {
      axis: e
    };
}
function Vd(t, e) {
  if (e.data && e.data.datasets) {
    const n = e.data.datasets.filter((a) => a.xAxisID === t || a.yAxisID === t);
    if (n.length)
      return ss(t, "x", n[0]) || ss(t, "y", n[0]);
  }
  return {};
}
function zd(t, e) {
  const n = Xe[t.type] || {
    scales: {}
  }, a = e.scales || {}, o = Oa(t.type, e), s = /* @__PURE__ */ Object.create(null);
  return Object.keys(a).forEach((i) => {
    const l = a[i];
    if (!kt(l))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (l._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const r = Va(i, l, Vd(i, t), It.scales[l.type]), c = Rd(r, o), d = n.scales || {};
    s[i] = _n(/* @__PURE__ */ Object.create(null), [
      {
        axis: r
      },
      l,
      d[r],
      d[c]
    ]);
  }), t.data.datasets.forEach((i) => {
    const l = i.type || t.type, r = i.indexAxis || Oa(l, e), d = (Xe[l] || {}).scales || {};
    Object.keys(d).forEach((h) => {
      const p = Id(h, r), v = i[p + "AxisID"] || p;
      s[v] = s[v] || /* @__PURE__ */ Object.create(null), _n(s[v], [
        {
          axis: p
        },
        a[v],
        d[h]
      ]);
    });
  }), Object.keys(s).forEach((i) => {
    const l = s[i];
    _n(l, [
      It.scales[l.type],
      It.scale
    ]);
  }), s;
}
function _i(t) {
  const e = t.options || (t.options = {});
  e.plugins = ht(e.plugins, {}), e.scales = zd(t, e);
}
function ki(t) {
  return t = t || {}, t.datasets = t.datasets || [], t.labels = t.labels || [], t;
}
function Nd(t) {
  return t = t || {}, t.data = ki(t.data), _i(t), t;
}
const is = /* @__PURE__ */ new Map(), wi = /* @__PURE__ */ new Set();
function qn(t, e) {
  let n = is.get(t);
  return n || (n = e(), is.set(t, n), wi.add(n)), n;
}
const fn = (t, e, n) => {
  const a = qe(e, n);
  a !== void 0 && t.add(a);
};
class Wd {
  constructor(e) {
    this._config = Nd(e), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
  }
  get platform() {
    return this._config.platform;
  }
  get type() {
    return this._config.type;
  }
  set type(e) {
    this._config.type = e;
  }
  get data() {
    return this._config.data;
  }
  set data(e) {
    this._config.data = ki(e);
  }
  get options() {
    return this._config.options;
  }
  set options(e) {
    this._config.options = e;
  }
  get plugins() {
    return this._config.plugins;
  }
  update() {
    const e = this._config;
    this.clearCache(), _i(e);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(e) {
    return qn(e, () => [
      [
        `datasets.${e}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(e, n) {
    return qn(`${e}.transition.${n}`, () => [
      [
        `datasets.${e}.transitions.${n}`,
        `transitions.${n}`
      ],
      [
        `datasets.${e}`,
        ""
      ]
    ]);
  }
  datasetElementScopeKeys(e, n) {
    return qn(`${e}-${n}`, () => [
      [
        `datasets.${e}.elements.${n}`,
        `datasets.${e}`,
        `elements.${n}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(e) {
    const n = e.id, a = this.type;
    return qn(`${a}-plugin-${n}`, () => [
      [
        `plugins.${n}`,
        ...e.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(e, n) {
    const a = this._scopeCache;
    let o = a.get(e);
    return (!o || n) && (o = /* @__PURE__ */ new Map(), a.set(e, o)), o;
  }
  getOptionScopes(e, n, a) {
    const { options: o, type: s } = this, i = this._cachedScopes(e, a), l = i.get(n);
    if (l)
      return l;
    const r = /* @__PURE__ */ new Set();
    n.forEach((d) => {
      e && (r.add(e), d.forEach((h) => fn(r, e, h))), d.forEach((h) => fn(r, o, h)), d.forEach((h) => fn(r, Xe[s] || {}, h)), d.forEach((h) => fn(r, It, h)), d.forEach((h) => fn(r, Ia, h));
    });
    const c = Array.from(r);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), wi.has(n) && i.set(n, c), c;
  }
  chartOptionScopes() {
    const { options: e, type: n } = this;
    return [
      e,
      Xe[n] || {},
      It.datasets[n] || {},
      {
        type: n
      },
      It,
      Ia
    ];
  }
  resolveNamedOptions(e, n, a, o = [
    ""
  ]) {
    const s = {
      $shared: !0
    }, { resolver: i, subPrefixes: l } = ls(this._resolverCache, e, o);
    let r = i;
    if (Hd(i, n)) {
      s.$shared = !1, a = Re(a) ? a() : a;
      const c = this.createResolver(e, a, l);
      r = sn(i, a, c);
    }
    for (const c of n)
      s[c] = r[c];
    return s;
  }
  createResolver(e, n, a = [
    ""
  ], o) {
    const { resolver: s } = ls(this._resolverCache, e, a);
    return kt(n) ? sn(s, n, void 0, o) : s;
  }
}
function ls(t, e, n) {
  let a = t.get(e);
  a || (a = /* @__PURE__ */ new Map(), t.set(e, a));
  const o = n.join();
  let s = a.get(o);
  return s || (s = {
    resolver: to(e, n),
    subPrefixes: n.filter((l) => !l.toLowerCase().includes("hover"))
  }, a.set(o, s)), s;
}
const jd = (t) => kt(t) && Object.getOwnPropertyNames(t).some((e) => Re(t[e]));
function Hd(t, e) {
  const { isScriptable: n, isIndexable: a } = si(t);
  for (const o of e) {
    const s = n(o), i = a(o), l = (i || s) && t[o];
    if (s && (Re(l) || jd(l)) || i && Vt(l))
      return !0;
  }
  return !1;
}
var Yd = "4.5.1";
const Kd = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function rs(t, e) {
  return t === "top" || t === "bottom" || Kd.indexOf(t) === -1 && e === "x";
}
function cs(t, e) {
  return function(n, a) {
    return n[t] === a[t] ? n[e] - a[e] : n[t] - a[t];
  };
}
function ds(t) {
  const e = t.chart, n = e.options.animation;
  e.notifyPlugins("afterRender"), Tt(n && n.onComplete, [
    t
  ], e);
}
function Ud(t) {
  const e = t.chart, n = e.options.animation;
  Tt(n && n.onProgress, [
    t
  ], e);
}
function Ci(t) {
  return ao() && typeof t == "string" ? t = document.getElementById(t) : t && t.length && (t = t[0]), t && t.canvas && (t = t.canvas), t;
}
const ta = {}, us = (t) => {
  const e = Ci(t);
  return Object.values(ta).filter((n) => n.canvas === e).pop();
};
function qd(t, e, n) {
  const a = Object.keys(t);
  for (const o of a) {
    const s = +o;
    if (s >= e) {
      const i = t[o];
      delete t[o], (n > 0 || s > e) && (t[s + n] = i);
    }
  }
}
function Xd(t, e, n, a) {
  return !n || t.type === "mouseout" ? null : a ? e : t;
}
let Oe = class {
  static defaults = It;
  static instances = ta;
  static overrides = Xe;
  static registry = pe;
  static version = Yd;
  static getChart = us;
  static register(...e) {
    pe.add(...e), hs();
  }
  static unregister(...e) {
    pe.remove(...e), hs();
  }
  constructor(e, n) {
    const a = this.config = new Wd(n), o = Ci(e), s = us(o);
    if (s)
      throw new Error("Canvas is already in use. Chart with ID '" + s.id + "' must be destroyed before the canvas with ID '" + s.canvas.id + "' can be reused.");
    const i = a.createResolver(a.chartOptionScopes(), this.getContext());
    this.platform = new (a.platform || fd(o))(), this.platform.updateConfig(a);
    const l = this.platform.acquireContext(o, i.aspectRatio), r = l && l.canvas, c = r && r.height, d = r && r.width;
    if (this.id = zl(), this.ctx = l, this.canvas = r, this.width = d, this.height = c, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Bd(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = sr((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], ta[this.id] = this, !l || !r) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    xe.listen(this, "complete", ds), xe.listen(this, "progress", Ud), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: e, maintainAspectRatio: n }, width: a, height: o, _aspectRatio: s } = this;
    return $t(e) ? n && s ? s : o ? a / o : null : e;
  }
  get data() {
    return this.config.data;
  }
  set data(e) {
    this.config.data = e;
  }
  get options() {
    return this._options;
  }
  set options(e) {
    this.config.options = e;
  }
  get registry() {
    return pe;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Po(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Bo(this.canvas, this.ctx), this;
  }
  stop() {
    return xe.stop(this), this;
  }
  resize(e, n) {
    xe.running(this) ? this._resizeBeforeDraw = {
      width: e,
      height: n
    } : this._resize(e, n);
  }
  _resize(e, n) {
    const a = this.options, o = this.canvas, s = a.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(o, e, n, s), l = a.devicePixelRatio || this.platform.getDevicePixelRatio(), r = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, Po(this, l, !0) && (this.notifyPlugins("resize", {
      size: i
    }), Tt(a.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(r) && this.render());
  }
  ensureScalesHaveIDs() {
    const n = this.options.scales || {};
    Mt(n, (a, o) => {
      a.id = o;
    });
  }
  buildOrUpdateScales() {
    const e = this.options, n = e.scales, a = this.scales, o = Object.keys(a).reduce((i, l) => (i[l] = !1, i), {});
    let s = [];
    n && (s = s.concat(Object.keys(n).map((i) => {
      const l = n[i], r = Va(i, l), c = r === "r", d = r === "x";
      return {
        options: l,
        dposition: c ? "chartArea" : d ? "bottom" : "left",
        dtype: c ? "radialLinear" : d ? "category" : "linear"
      };
    }))), Mt(s, (i) => {
      const l = i.options, r = l.id, c = Va(r, l), d = ht(l.type, i.dtype);
      (l.position === void 0 || rs(l.position, c) !== rs(i.dposition)) && (l.position = i.dposition), o[r] = !0;
      let h = null;
      if (r in a && a[r].type === d)
        h = a[r];
      else {
        const p = pe.getScale(d);
        h = new p({
          id: r,
          type: d,
          ctx: this.ctx,
          chart: this
        }), a[h.id] = h;
      }
      h.init(l, e);
    }), Mt(o, (i, l) => {
      i || delete a[l];
    }), Mt(a, (i) => {
      ie.configure(this, i, i.options), ie.addBox(this, i);
    });
  }
  _updateMetasets() {
    const e = this._metasets, n = this.data.datasets.length, a = e.length;
    if (e.sort((o, s) => o.index - s.index), a > n) {
      for (let o = n; o < a; ++o)
        this._destroyDatasetMeta(o);
      e.splice(n, a - n);
    }
    this._sortedMetasets = e.slice(0).sort(cs("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: e, data: { datasets: n } } = this;
    e.length > n.length && delete this._stacks, e.forEach((a, o) => {
      n.filter((s) => s === a._dataset).length === 0 && this._destroyDatasetMeta(o);
    });
  }
  buildOrUpdateControllers() {
    const e = [], n = this.data.datasets;
    let a, o;
    for (this._removeUnreferencedMetasets(), a = 0, o = n.length; a < o; a++) {
      const s = n[a];
      let i = this.getDatasetMeta(a);
      const l = s.type || this.config.type;
      if (i.type && i.type !== l && (this._destroyDatasetMeta(a), i = this.getDatasetMeta(a)), i.type = l, i.indexAxis = s.indexAxis || Oa(l, this.options), i.order = s.order || 0, i.index = a, i.label = "" + s.label, i.visible = this.isDatasetVisible(a), i.controller)
        i.controller.updateIndex(a), i.controller.linkScales();
      else {
        const r = pe.getController(l), { datasetElementType: c, dataElementType: d } = It.datasets[l];
        Object.assign(r, {
          dataElementType: pe.getElement(d),
          datasetElementType: c && pe.getElement(c)
        }), i.controller = new r(this, a), e.push(i.controller);
      }
    }
    return this._updateMetasets(), e;
  }
  _resetElements() {
    Mt(this.data.datasets, (e, n) => {
      this.getDatasetMeta(n).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(e) {
    const n = this.config;
    n.update();
    const a = this._options = n.createResolver(n.chartOptionScopes(), this.getContext()), o = this._animationsDisabled = !a.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: e,
      cancelable: !0
    }) === !1)
      return;
    const s = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let i = 0;
    for (let c = 0, d = this.data.datasets.length; c < d; c++) {
      const { controller: h } = this.getDatasetMeta(c), p = !o && s.indexOf(h) === -1;
      h.buildOrUpdateElements(p), i = Math.max(+h.getMaxOverflow(), i);
    }
    i = this._minPadding = a.layout.autoPadding ? i : 0, this._updateLayout(i), o || Mt(s, (c) => {
      c.reset();
    }), this._updateDatasets(e), this.notifyPlugins("afterUpdate", {
      mode: e
    }), this._layers.sort(cs("z", "_idx"));
    const { _active: l, _lastEvent: r } = this;
    r ? this._eventHandler(r, !0) : l.length && this._updateHoverStyles(l, l, !0), this.render();
  }
  _updateScales() {
    Mt(this.scales, (e) => {
      ie.removeBox(this, e);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const e = this.options, n = new Set(Object.keys(this._listeners)), a = new Set(e.events);
    (!_o(n, a) || !!this._responsiveListeners !== e.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: e } = this, n = this._getUniformDataChanges() || [];
    for (const { method: a, start: o, count: s } of n) {
      const i = a === "_removeElements" ? -s : s;
      qd(e, o, i);
    }
  }
  _getUniformDataChanges() {
    const e = this._dataChanges;
    if (!e || !e.length)
      return;
    this._dataChanges = [];
    const n = this.data.datasets.length, a = (s) => new Set(e.filter((i) => i[0] === s).map((i, l) => l + "," + i.splice(1).join(","))), o = a(0);
    for (let s = 1; s < n; s++)
      if (!_o(o, a(s)))
        return;
    return Array.from(o).map((s) => s.split(",")).map((s) => ({
      method: s[1],
      start: +s[2],
      count: +s[3]
    }));
  }
  _updateLayout(e) {
    if (this.notifyPlugins("beforeLayout", {
      cancelable: !0
    }) === !1)
      return;
    ie.update(this, this.width, this.height, e);
    const n = this.chartArea, a = n.width <= 0 || n.height <= 0;
    this._layers = [], Mt(this.boxes, (o) => {
      a && o.position === "chartArea" || (o.configure && o.configure(), this._layers.push(...o._layers()));
    }, this), this._layers.forEach((o, s) => {
      o._idx = s;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(e) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: e,
      cancelable: !0
    }) !== !1) {
      for (let n = 0, a = this.data.datasets.length; n < a; ++n)
        this.getDatasetMeta(n).controller.configure();
      for (let n = 0, a = this.data.datasets.length; n < a; ++n)
        this._updateDataset(n, Re(e) ? e({
          datasetIndex: n
        }) : e);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: e
      });
    }
  }
  _updateDataset(e, n) {
    const a = this.getDatasetMeta(e), o = {
      meta: a,
      index: e,
      mode: n,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", o) !== !1 && (a.controller._update(n), o.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", o));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (xe.has(this) ? this.attached && !xe.running(this) && xe.start(this) : (this.draw(), ds({
      chart: this
    })));
  }
  draw() {
    let e;
    if (this._resizeBeforeDraw) {
      const { width: a, height: o } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(a, o);
    }
    if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", {
      cancelable: !0
    }) === !1)
      return;
    const n = this._layers;
    for (e = 0; e < n.length && n[e].z <= 0; ++e)
      n[e].draw(this.chartArea);
    for (this._drawDatasets(); e < n.length; ++e)
      n[e].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(e) {
    const n = this._sortedMetasets, a = [];
    let o, s;
    for (o = 0, s = n.length; o < s; ++o) {
      const i = n[o];
      (!e || i.visible) && a.push(i);
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
    const e = this.getSortedVisibleDatasetMetas();
    for (let n = e.length - 1; n >= 0; --n)
      this._drawDataset(e[n]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(e) {
    const n = this.ctx, a = {
      meta: e,
      index: e.index,
      cancelable: !0
    }, o = uc(this, e);
    this.notifyPlugins("beforeDatasetDraw", a) !== !1 && (o && Za(n, o), e.controller.draw(), o && Qa(n), a.cancelable = !1, this.notifyPlugins("afterDatasetDraw", a));
  }
  isPointInArea(e) {
    return Bn(e, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(e, n, a, o) {
    const s = Kc.modes[n];
    return typeof s == "function" ? s(this, e, a, o) : [];
  }
  getDatasetMeta(e) {
    const n = this.data.datasets[e], a = this._metasets;
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
      index: e,
      _dataset: n,
      _parsed: [],
      _sorted: !1
    }, a.push(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = Ge(null, {
      chart: this,
      type: "chart"
    }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(e) {
    const n = this.data.datasets[e];
    if (!n)
      return !1;
    const a = this.getDatasetMeta(e);
    return typeof a.hidden == "boolean" ? !a.hidden : !n.hidden;
  }
  setDatasetVisibility(e, n) {
    const a = this.getDatasetMeta(e);
    a.hidden = !n;
  }
  toggleDataVisibility(e) {
    this._hiddenIndices[e] = !this._hiddenIndices[e];
  }
  getDataVisibility(e) {
    return !this._hiddenIndices[e];
  }
  _updateVisibility(e, n, a) {
    const o = a ? "show" : "hide", s = this.getDatasetMeta(e), i = s.controller._resolveAnimations(void 0, o);
    Dn(n) ? (s.data[n].hidden = !a, this.update()) : (this.setDatasetVisibility(e, a), i.update(s, {
      visible: a
    }), this.update((l) => l.datasetIndex === e ? o : void 0));
  }
  hide(e, n) {
    this._updateVisibility(e, n, !1);
  }
  show(e, n) {
    this._updateVisibility(e, n, !0);
  }
  _destroyDatasetMeta(e) {
    const n = this._metasets[e];
    n && n.controller && n.controller._destroy(), delete this._metasets[e];
  }
  _stop() {
    let e, n;
    for (this.stop(), xe.remove(this), e = 0, n = this.data.datasets.length; e < n; ++e)
      this._destroyDatasetMeta(e);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: e, ctx: n } = this;
    this._stop(), this.config.clearCache(), e && (this.unbindEvents(), Bo(e, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete ta[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...e) {
    return this.canvas.toDataURL(...e);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const e = this._listeners, n = this.platform, a = (s, i) => {
      n.addEventListener(this, s, i), e[s] = i;
    }, o = (s, i, l) => {
      s.offsetX = i, s.offsetY = l, this._eventHandler(s);
    };
    Mt(this.options.events, (s) => a(s, o));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const e = this._responsiveListeners, n = this.platform, a = (r, c) => {
      n.addEventListener(this, r, c), e[r] = c;
    }, o = (r, c) => {
      e[r] && (n.removeEventListener(this, r, c), delete e[r]);
    }, s = (r, c) => {
      this.canvas && this.resize(r, c);
    };
    let i;
    const l = () => {
      o("attach", l), this.attached = !0, this.resize(), a("resize", s), a("detach", i);
    };
    i = () => {
      this.attached = !1, o("resize", s), this._stop(), this._resize(0, 0), a("attach", l);
    }, n.isAttached(this.canvas) ? l() : i();
  }
  unbindEvents() {
    Mt(this._listeners, (e, n) => {
      this.platform.removeEventListener(this, n, e);
    }), this._listeners = {}, Mt(this._responsiveListeners, (e, n) => {
      this.platform.removeEventListener(this, n, e);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(e, n, a) {
    const o = a ? "set" : "remove";
    let s, i, l, r;
    for (n === "dataset" && (s = this.getDatasetMeta(e[0].datasetIndex), s.controller["_" + o + "DatasetHoverStyle"]()), l = 0, r = e.length; l < r; ++l) {
      i = e[l];
      const c = i && this.getDatasetMeta(i.datasetIndex).controller;
      c && c[o + "HoverStyle"](i.element, i.datasetIndex, i.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(e) {
    const n = this._active || [], a = e.map(({ datasetIndex: s, index: i }) => {
      const l = this.getDatasetMeta(s);
      if (!l)
        throw new Error("No dataset found at index " + s);
      return {
        datasetIndex: s,
        element: l.data[i],
        index: i
      };
    });
    !na(a, n) && (this._active = a, this._lastEvent = null, this._updateHoverStyles(a, n));
  }
  notifyPlugins(e, n, a) {
    return this._plugins.notify(this, e, n, a);
  }
  isPluginEnabled(e) {
    return this._plugins._cache.filter((n) => n.plugin.id === e).length === 1;
  }
  _updateHoverStyles(e, n, a) {
    const o = this.options.hover, s = (r, c) => r.filter((d) => !c.some((h) => d.datasetIndex === h.datasetIndex && d.index === h.index)), i = s(n, e), l = a ? e : s(e, n);
    i.length && this.updateHoverStyle(i, o.mode, !1), l.length && o.mode && this.updateHoverStyle(l, o.mode, !0);
  }
  _eventHandler(e, n) {
    const a = {
      event: e,
      replay: n,
      cancelable: !0,
      inChartArea: this.isPointInArea(e)
    }, o = (i) => (i.options.events || this.options.events).includes(e.native.type);
    if (this.notifyPlugins("beforeEvent", a, o) === !1)
      return;
    const s = this._handleEvent(e, n, a.inChartArea);
    return a.cancelable = !1, this.notifyPlugins("afterEvent", a, o), (s || a.changed) && this.render(), this;
  }
  _handleEvent(e, n, a) {
    const { _active: o = [], options: s } = this, i = n, l = this._getActiveElements(e, o, a, i), r = Kl(e), c = Xd(e, this._lastEvent, a, r);
    a && (this._lastEvent = null, Tt(s.onHover, [
      e,
      l,
      this
    ], this), r && Tt(s.onClick, [
      e,
      l,
      this
    ], this));
    const d = !na(l, o);
    return (d || n) && (this._active = l, this._updateHoverStyles(l, o, n)), this._lastEvent = c, d;
  }
  _getActiveElements(e, n, a, o) {
    if (e.type === "mouseout")
      return [];
    if (!a)
      return n;
    const s = this.options.hover;
    return this.getElementsAtEventForMode(e, s.mode, s, o);
  }
};
function hs() {
  return Mt(Oe.instances, (t) => t._plugins.invalidate());
}
function Gd(t, e, n) {
  const { startAngle: a, x: o, y: s, outerRadius: i, innerRadius: l, options: r } = e, { borderWidth: c, borderJoinStyle: d } = r, h = Math.min(c / i, de(a - n));
  if (t.beginPath(), t.arc(o, s, i - c / 2, a + h / 2, n - h / 2), l > 0) {
    const p = Math.min(c / l, de(a - n));
    t.arc(o, s, l + c / 2, n - p / 2, a + p / 2, !0);
  } else {
    const p = Math.min(c / 2, i * de(a - n));
    if (d === "round")
      t.arc(o, s, p, n - St / 2, a + St / 2, !0);
    else if (d === "bevel") {
      const v = 2 * p * p, f = -v * Math.cos(n + St / 2) + o, y = -v * Math.sin(n + St / 2) + s, _ = v * Math.cos(a + St / 2) + o, m = v * Math.sin(a + St / 2) + s;
      t.lineTo(f, y), t.lineTo(_, m);
    }
  }
  t.closePath(), t.moveTo(0, 0), t.rect(0, 0, t.canvas.width, t.canvas.height), t.clip("evenodd");
}
function Zd(t, e, n) {
  const { startAngle: a, pixelMargin: o, x: s, y: i, outerRadius: l, innerRadius: r } = e;
  let c = o / l;
  t.beginPath(), t.arc(s, i, l, a - c, n + c), r > o ? (c = o / r, t.arc(s, i, r, n + c, a - c, !0)) : t.arc(s, i, o, n + zt, a - zt), t.closePath(), t.clip();
}
function Qd(t) {
  return Ja(t, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Jd(t, e, n, a) {
  const o = Qd(t.options.borderRadius), s = (n - e) / 2, i = Math.min(s, a * e / 2), l = (r) => {
    const c = (n - Math.min(s, r)) * a / 2;
    return Kt(r, 0, Math.min(s, c));
  };
  return {
    outerStart: l(o.outerStart),
    outerEnd: l(o.outerEnd),
    innerStart: Kt(o.innerStart, 0, i),
    innerEnd: Kt(o.innerEnd, 0, i)
  };
}
function Qe(t, e, n, a) {
  return {
    x: n + t * Math.cos(e),
    y: a + t * Math.sin(e)
  };
}
function ra(t, e, n, a, o, s) {
  const { x: i, y: l, startAngle: r, pixelMargin: c, innerRadius: d } = e, h = Math.max(e.outerRadius + a + n - c, 0), p = d > 0 ? d + a + n + c : 0;
  let v = 0;
  const f = o - r;
  if (a) {
    const Y = d > 0 ? d - a : 0, W = h > 0 ? h - a : 0, Q = (Y + W) / 2, tt = Q !== 0 ? f * Q / (Q + a) : f;
    v = (f - tt) / 2;
  }
  const y = Math.max(1e-3, f * h - n / St) / h, _ = (f - y) / 2, m = r + _ + v, g = o - _ - v, { outerStart: x, outerEnd: w, innerStart: D, innerEnd: S } = Jd(e, p, h, g - m), $ = h - x, M = h - w, F = m + x / $, T = g - w / M, B = p + D, P = p + S, E = m + D / B, N = g - S / P;
  if (t.beginPath(), s) {
    const Y = (F + T) / 2;
    if (t.arc(i, l, h, F, Y), t.arc(i, l, h, Y, T), w > 0) {
      const ct = Qe(M, T, i, l);
      t.arc(ct.x, ct.y, w, T, g + zt);
    }
    const W = Qe(P, g, i, l);
    if (t.lineTo(W.x, W.y), S > 0) {
      const ct = Qe(P, N, i, l);
      t.arc(ct.x, ct.y, S, g + zt, N + Math.PI);
    }
    const Q = (g - S / p + (m + D / p)) / 2;
    if (t.arc(i, l, p, g - S / p, Q, !0), t.arc(i, l, p, Q, m + D / p, !0), D > 0) {
      const ct = Qe(B, E, i, l);
      t.arc(ct.x, ct.y, D, E + Math.PI, m - zt);
    }
    const tt = Qe($, m, i, l);
    if (t.lineTo(tt.x, tt.y), x > 0) {
      const ct = Qe($, F, i, l);
      t.arc(ct.x, ct.y, x, m - zt, F);
    }
  } else {
    t.moveTo(i, l);
    const Y = Math.cos(F) * h + i, W = Math.sin(F) * h + l;
    t.lineTo(Y, W);
    const Q = Math.cos(T) * h + i, tt = Math.sin(T) * h + l;
    t.lineTo(Q, tt);
  }
  t.closePath();
}
function tu(t, e, n, a, o) {
  const { fullCircles: s, startAngle: i, circumference: l } = e;
  let r = e.endAngle;
  if (s) {
    ra(t, e, n, a, r, o);
    for (let c = 0; c < s; ++c)
      t.fill();
    isNaN(l) || (r = i + (l % Pt || Pt));
  }
  return ra(t, e, n, a, r, o), t.fill(), r;
}
function eu(t, e, n, a, o) {
  const { fullCircles: s, startAngle: i, circumference: l, options: r } = e, { borderWidth: c, borderJoinStyle: d, borderDash: h, borderDashOffset: p, borderRadius: v } = r, f = r.borderAlign === "inner";
  if (!c)
    return;
  t.setLineDash(h || []), t.lineDashOffset = p, f ? (t.lineWidth = c * 2, t.lineJoin = d || "round") : (t.lineWidth = c, t.lineJoin = d || "bevel");
  let y = e.endAngle;
  if (s) {
    ra(t, e, n, a, y, o);
    for (let _ = 0; _ < s; ++_)
      t.stroke();
    isNaN(l) || (y = i + (l % Pt || Pt));
  }
  f && Zd(t, e, y), r.selfJoin && y - i >= St && v === 0 && d !== "miter" && Gd(t, e, y), s || (ra(t, e, n, a, y, o), t.stroke());
}
class nu extends $e {
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
    _indexable: (e) => e !== "borderDash"
  };
  circumference;
  endAngle;
  fullCircles;
  innerRadius;
  outerRadius;
  pixelMargin;
  startAngle;
  constructor(e) {
    super(), this.options = void 0, this.circumference = void 0, this.startAngle = void 0, this.endAngle = void 0, this.innerRadius = void 0, this.outerRadius = void 0, this.pixelMargin = 0, this.fullCircles = 0, e && Object.assign(this, e);
  }
  inRange(e, n, a) {
    const o = this.getProps([
      "x",
      "y"
    ], a), { angle: s, distance: i } = Zs(o, {
      x: e,
      y: n
    }), { startAngle: l, endAngle: r, innerRadius: c, outerRadius: d, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], a), p = (this.options.spacing + this.options.borderWidth) / 2, v = ht(h, r - l), f = Tn(s, l, r) && l !== r, y = v >= Pt || f, _ = Te(i, c + p, d + p);
    return y && _;
  }
  getCenterPoint(e) {
    const { x: n, y: a, startAngle: o, endAngle: s, innerRadius: i, outerRadius: l } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], e), { offset: r, spacing: c } = this.options, d = (o + s) / 2, h = (i + l + c + r) / 2;
    return {
      x: n + Math.cos(d) * h,
      y: a + Math.sin(d) * h
    };
  }
  tooltipPosition(e) {
    return this.getCenterPoint(e);
  }
  draw(e) {
    const { options: n, circumference: a } = this, o = (n.offset || 0) / 4, s = (n.spacing || 0) / 2, i = n.circular;
    if (this.pixelMargin = n.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = a > Pt ? Math.floor(a / Pt) : 0, a === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    e.save();
    const l = (this.startAngle + this.endAngle) / 2;
    e.translate(Math.cos(l) * o, Math.sin(l) * o);
    const r = 1 - Math.sin(Math.min(St, a || 0)), c = o * r;
    e.fillStyle = n.backgroundColor, e.strokeStyle = n.borderColor, tu(e, this, c, s, i), eu(e, this, c, s, i), e.restore();
  }
}
function $i(t, e, n = e) {
  t.lineCap = ht(n.borderCapStyle, e.borderCapStyle), t.setLineDash(ht(n.borderDash, e.borderDash)), t.lineDashOffset = ht(n.borderDashOffset, e.borderDashOffset), t.lineJoin = ht(n.borderJoinStyle, e.borderJoinStyle), t.lineWidth = ht(n.borderWidth, e.borderWidth), t.strokeStyle = ht(n.borderColor, e.borderColor);
}
function au(t, e, n) {
  t.lineTo(n.x, n.y);
}
function ou(t) {
  return t.stepped ? yr : t.tension || t.cubicInterpolationMode === "monotone" ? xr : au;
}
function Mi(t, e, n = {}) {
  const a = t.length, { start: o = 0, end: s = a - 1 } = n, { start: i, end: l } = e, r = Math.max(o, i), c = Math.min(s, l), d = o < i && s < i || o > l && s > l;
  return {
    count: a,
    start: r,
    loop: e.loop,
    ilen: c < r && !d ? a + c - r : c - r
  };
}
function su(t, e, n, a) {
  const { points: o, options: s } = e, { count: i, start: l, loop: r, ilen: c } = Mi(o, n, a), d = ou(s);
  let { move: h = !0, reverse: p } = a || {}, v, f, y;
  for (v = 0; v <= c; ++v)
    f = o[(l + (p ? c - v : v)) % i], !f.skip && (h ? (t.moveTo(f.x, f.y), h = !1) : d(t, y, f, p, s.stepped), y = f);
  return r && (f = o[(l + (p ? c : 0)) % i], d(t, y, f, p, s.stepped)), !!r;
}
function iu(t, e, n, a) {
  const o = e.points, { count: s, start: i, ilen: l } = Mi(o, n, a), { move: r = !0, reverse: c } = a || {};
  let d = 0, h = 0, p, v, f, y, _, m;
  const g = (w) => (i + (c ? l - w : w)) % s, x = () => {
    y !== _ && (t.lineTo(d, _), t.lineTo(d, y), t.lineTo(d, m));
  };
  for (r && (v = o[g(0)], t.moveTo(v.x, v.y)), p = 0; p <= l; ++p) {
    if (v = o[g(p)], v.skip)
      continue;
    const w = v.x, D = v.y, S = w | 0;
    S === f ? (D < y ? y = D : D > _ && (_ = D), d = (h * d + w) / ++h) : (x(), t.lineTo(w, D), f = S, h = 0, y = _ = D), m = D;
  }
  x();
}
function za(t) {
  const e = t.options, n = e.borderDash && e.borderDash.length;
  return !t._decimated && !t._loop && !e.tension && e.cubicInterpolationMode !== "monotone" && !e.stepped && !n ? iu : su;
}
function lu(t) {
  return t.stepped ? Qr : t.tension || t.cubicInterpolationMode === "monotone" ? Jr : He;
}
function ru(t, e, n, a) {
  let o = e._path;
  o || (o = e._path = new Path2D(), e.path(o, n, a) && o.closePath()), $i(t, e.options), t.stroke(o);
}
function cu(t, e, n, a) {
  const { segments: o, options: s } = e, i = za(e);
  for (const l of o)
    $i(t, s, l.style), t.beginPath(), i(t, e, l, {
      start: n,
      end: n + a - 1
    }) && t.closePath(), t.stroke();
}
const du = typeof Path2D == "function";
function uu(t, e, n, a) {
  du && !e.options.segment ? ru(t, e, n, a) : cu(t, e, n, a);
}
class hu extends $e {
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
    _indexable: (e) => e !== "borderDash" && e !== "fill"
  };
  constructor(e) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, e && Object.assign(this, e);
  }
  updateControlPoints(e, n) {
    const a = this.options;
    if ((a.tension || a.cubicInterpolationMode === "monotone") && !a.stepped && !this._pointsUpdated) {
      const o = a.spanGaps ? this._loop : this._fullLoop;
      Hr(this._points, a, e, o, n), this._pointsUpdated = !0;
    }
  }
  set points(e) {
    this._points = e, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = lc(this, this.options.segment));
  }
  first() {
    const e = this.segments, n = this.points;
    return e.length && n[e[0].start];
  }
  last() {
    const e = this.segments, n = this.points, a = e.length;
    return a && n[e[a - 1].end];
  }
  interpolate(e, n) {
    const a = this.options, o = e[n], s = this.points, i = oc(this, {
      property: n,
      start: o,
      end: o
    });
    if (!i.length)
      return;
    const l = [], r = lu(a);
    let c, d;
    for (c = 0, d = i.length; c < d; ++c) {
      const { start: h, end: p } = i[c], v = s[h], f = s[p];
      if (v === f) {
        l.push(v);
        continue;
      }
      const y = Math.abs((o - v[n]) / (f[n] - v[n])), _ = r(v, f, y, a.stepped);
      _[n] = e[n], l.push(_);
    }
    return l.length === 1 ? l[0] : l;
  }
  pathSegment(e, n, a) {
    return za(this)(e, this, n, a);
  }
  path(e, n, a) {
    const o = this.segments, s = za(this);
    let i = this._loop;
    n = n || 0, a = a || this.points.length - n;
    for (const l of o)
      i &= s(e, this, l, {
        start: n,
        end: n + a - 1
      });
    return !!i;
  }
  draw(e, n, a, o) {
    const s = this.options || {};
    (this.points || []).length && s.borderWidth && (e.save(), uu(e, this, a, o), e.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function fs(t, e, n, a) {
  const o = t.options, { [n]: s } = t.getProps([
    n
  ], a);
  return Math.abs(e - s) < o.radius + o.hitRadius;
}
class fu extends $e {
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
  constructor(e) {
    super(), this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, e && Object.assign(this, e);
  }
  inRange(e, n, a) {
    const o = this.options, { x: s, y: i } = this.getProps([
      "x",
      "y"
    ], a);
    return Math.pow(e - s, 2) + Math.pow(n - i, 2) < Math.pow(o.hitRadius + o.radius, 2);
  }
  inXRange(e, n) {
    return fs(this, e, "x", n);
  }
  inYRange(e, n) {
    return fs(this, e, "y", n);
  }
  getCenterPoint(e) {
    const { x: n, y: a } = this.getProps([
      "x",
      "y"
    ], e);
    return {
      x: n,
      y: a
    };
  }
  size(e) {
    e = e || this.options || {};
    let n = e.radius || 0;
    n = Math.max(n, n && e.hoverRadius || 0);
    const a = n && e.borderWidth || 0;
    return (n + a) * 2;
  }
  draw(e, n) {
    const a = this.options;
    this.skip || a.radius < 0.1 || !Bn(this, n, this.size(a) / 2) || (e.strokeStyle = a.borderColor, e.lineWidth = a.borderWidth, e.fillStyle = a.backgroundColor, Ra(e, a, this.x, this.y));
  }
  getRange() {
    const e = this.options || {};
    return e.radius + e.hitRadius;
  }
}
function Si(t, e) {
  const { x: n, y: a, base: o, width: s, height: i } = t.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], e);
  let l, r, c, d, h;
  return t.horizontal ? (h = i / 2, l = Math.min(n, o), r = Math.max(n, o), c = a - h, d = a + h) : (h = s / 2, l = n - h, r = n + h, c = Math.min(a, o), d = Math.max(a, o)), {
    left: l,
    top: c,
    right: r,
    bottom: d
  };
}
function Le(t, e, n, a) {
  return t ? 0 : Kt(e, n, a);
}
function gu(t, e, n) {
  const a = t.options.borderWidth, o = t.borderSkipped, s = oi(a);
  return {
    t: Le(o.top, s.top, 0, n),
    r: Le(o.right, s.right, 0, e),
    b: Le(o.bottom, s.bottom, 0, n),
    l: Le(o.left, s.left, 0, e)
  };
}
function pu(t, e, n) {
  const { enableBorderRadius: a } = t.getProps([
    "enableBorderRadius"
  ]), o = t.options.borderRadius, s = en(o), i = Math.min(e, n), l = t.borderSkipped, r = a || kt(o);
  return {
    topLeft: Le(!r || l.top || l.left, s.topLeft, 0, i),
    topRight: Le(!r || l.top || l.right, s.topRight, 0, i),
    bottomLeft: Le(!r || l.bottom || l.left, s.bottomLeft, 0, i),
    bottomRight: Le(!r || l.bottom || l.right, s.bottomRight, 0, i)
  };
}
function mu(t) {
  const e = Si(t), n = e.right - e.left, a = e.bottom - e.top, o = gu(t, n / 2, a / 2), s = pu(t, n / 2, a / 2);
  return {
    outer: {
      x: e.left,
      y: e.top,
      w: n,
      h: a,
      radius: s
    },
    inner: {
      x: e.left + o.l,
      y: e.top + o.t,
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
function Ma(t, e, n, a) {
  const o = e === null, s = n === null, l = t && !(o && s) && Si(t, a);
  return l && (o || Te(e, l.left, l.right)) && (s || Te(n, l.top, l.bottom));
}
function bu(t) {
  return t.topLeft || t.topRight || t.bottomLeft || t.bottomRight;
}
function vu(t, e) {
  t.rect(e.x, e.y, e.w, e.h);
}
function Sa(t, e, n = {}) {
  const a = t.x !== n.x ? -e : 0, o = t.y !== n.y ? -e : 0, s = (t.x + t.w !== n.x + n.w ? e : 0) - a, i = (t.y + t.h !== n.y + n.h ? e : 0) - o;
  return {
    x: t.x + a,
    y: t.y + o,
    w: t.w + s,
    h: t.h + i,
    radius: t.radius
  };
}
class yu extends $e {
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
  constructor(e) {
    super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, e && Object.assign(this, e);
  }
  draw(e) {
    const { inflateAmount: n, options: { borderColor: a, backgroundColor: o } } = this, { inner: s, outer: i } = mu(this), l = bu(i.radius) ? sa : vu;
    e.save(), (i.w !== s.w || i.h !== s.h) && (e.beginPath(), l(e, Sa(i, n, s)), e.clip(), l(e, Sa(s, -n, i)), e.fillStyle = a, e.fill("evenodd")), e.beginPath(), l(e, Sa(s, n)), e.fillStyle = o, e.fill(), e.restore();
  }
  inRange(e, n, a) {
    return Ma(this, e, n, a);
  }
  inXRange(e, n) {
    return Ma(this, e, null, n);
  }
  inYRange(e, n) {
    return Ma(this, null, e, n);
  }
  getCenterPoint(e) {
    const { x: n, y: a, base: o, horizontal: s } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], e);
    return {
      x: s ? (n + o) / 2 : n,
      y: s ? a : (a + o) / 2
    };
  }
  getRange(e) {
    return e === "x" ? this.width / 2 : this.height / 2;
  }
}
const gs = (t, e) => {
  let { boxHeight: n = e, boxWidth: a = e } = t;
  return t.usePointStyle && (n = Math.min(n, e), a = t.pointStyleWidth || Math.min(a, e)), {
    boxWidth: a,
    boxHeight: n,
    itemHeight: Math.max(e, n)
  };
}, xu = (t, e) => t !== null && e !== null && t.datasetIndex === e.datasetIndex && t.index === e.index;
class ps extends $e {
  constructor(e) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = e.chart, this.options = e.options, this.ctx = e.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(e, n, a) {
    this.maxWidth = e, this.maxHeight = n, this._margins = a, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const e = this.options.labels || {};
    let n = Tt(e.generateLabels, [
      this.chart
    ], this) || [];
    e.filter && (n = n.filter((a) => e.filter(a, this.chart.data))), e.sort && (n = n.sort((a, o) => e.sort(a, o, this.chart.data))), this.options.reverse && n.reverse(), this.legendItems = n;
  }
  fit() {
    const { options: e, ctx: n } = this;
    if (!e.display) {
      this.width = this.height = 0;
      return;
    }
    const a = e.labels, o = Ut(a.font), s = o.size, i = this._computeTitleHeight(), { boxWidth: l, itemHeight: r } = gs(a, s);
    let c, d;
    n.font = o.string, this.isHorizontal() ? (c = this.maxWidth, d = this._fitRows(i, s, l, r) + 10) : (d = this.maxHeight, c = this._fitCols(i, o, l, r) + 10), this.width = Math.min(c, e.maxWidth || this.maxWidth), this.height = Math.min(d, e.maxHeight || this.maxHeight);
  }
  _fitRows(e, n, a, o) {
    const { ctx: s, maxWidth: i, options: { labels: { padding: l } } } = this, r = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], d = o + l;
    let h = e;
    s.textAlign = "left", s.textBaseline = "middle";
    let p = -1, v = -d;
    return this.legendItems.forEach((f, y) => {
      const _ = a + n / 2 + s.measureText(f.text).width;
      (y === 0 || c[c.length - 1] + _ + 2 * l > i) && (h += d, c[c.length - (y > 0 ? 0 : 1)] = 0, v += d, p++), r[y] = {
        left: 0,
        top: v,
        row: p,
        width: _,
        height: o
      }, c[c.length - 1] += _ + l;
    }), h;
  }
  _fitCols(e, n, a, o) {
    const { ctx: s, maxHeight: i, options: { labels: { padding: l } } } = this, r = this.legendHitBoxes = [], c = this.columnSizes = [], d = i - e;
    let h = l, p = 0, v = 0, f = 0, y = 0;
    return this.legendItems.forEach((_, m) => {
      const { itemWidth: g, itemHeight: x } = _u(a, n, s, _, o);
      m > 0 && v + x + 2 * l > d && (h += p + l, c.push({
        width: p,
        height: v
      }), f += p + l, y++, p = v = 0), r[m] = {
        left: f,
        top: v,
        col: y,
        width: g,
        height: x
      }, p = Math.max(p, g), v += x + l;
    }), h += p, c.push({
      width: p,
      height: v
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const e = this._computeTitleHeight(), { legendHitBoxes: n, options: { align: a, labels: { padding: o }, rtl: s } } = this, i = nn(s, this.left, this.width);
    if (this.isHorizontal()) {
      let l = 0, r = Ht(a, this.left + o, this.right - this.lineWidths[l]);
      for (const c of n)
        l !== c.row && (l = c.row, r = Ht(a, this.left + o, this.right - this.lineWidths[l])), c.top += this.top + e + o, c.left = i.leftForLtr(i.x(r), c.width), r += c.width + o;
    } else {
      let l = 0, r = Ht(a, this.top + e + o, this.bottom - this.columnSizes[l].height);
      for (const c of n)
        c.col !== l && (l = c.col, r = Ht(a, this.top + e + o, this.bottom - this.columnSizes[l].height)), c.top = r, c.left += this.left + o, c.left = i.leftForLtr(i.x(c.left), c.width), r += c.height + o;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const e = this.ctx;
      Za(e, this), this._draw(), Qa(e);
    }
  }
  _draw() {
    const { options: e, columnSizes: n, lineWidths: a, ctx: o } = this, { align: s, labels: i } = e, l = It.color, r = nn(e.rtl, this.left, this.width), c = Ut(i.font), { padding: d } = i, h = c.size, p = h / 2;
    let v;
    this.drawTitle(), o.textAlign = r.textAlign("left"), o.textBaseline = "middle", o.lineWidth = 0.5, o.font = c.string;
    const { boxWidth: f, boxHeight: y, itemHeight: _ } = gs(i, h), m = function(S, $, M) {
      if (isNaN(f) || f <= 0 || isNaN(y) || y < 0)
        return;
      o.save();
      const F = ht(M.lineWidth, 1);
      if (o.fillStyle = ht(M.fillStyle, l), o.lineCap = ht(M.lineCap, "butt"), o.lineDashOffset = ht(M.lineDashOffset, 0), o.lineJoin = ht(M.lineJoin, "miter"), o.lineWidth = F, o.strokeStyle = ht(M.strokeStyle, l), o.setLineDash(ht(M.lineDash, [])), i.usePointStyle) {
        const T = {
          radius: y * Math.SQRT2 / 2,
          pointStyle: M.pointStyle,
          rotation: M.rotation,
          borderWidth: F
        }, B = r.xPlus(S, f / 2), P = $ + p;
        ai(o, T, B, P, i.pointStyleWidth && f);
      } else {
        const T = $ + Math.max((h - y) / 2, 0), B = r.leftForLtr(S, f), P = en(M.borderRadius);
        o.beginPath(), Object.values(P).some((E) => E !== 0) ? sa(o, {
          x: B,
          y: T,
          w: f,
          h: y,
          radius: P
        }) : o.rect(B, T, f, y), o.fill(), F !== 0 && o.stroke();
      }
      o.restore();
    }, g = function(S, $, M) {
      Ln(o, M.text, S, $ + _ / 2, c, {
        strikethrough: M.hidden,
        textAlign: r.textAlign(M.textAlign)
      });
    }, x = this.isHorizontal(), w = this._computeTitleHeight();
    x ? v = {
      x: Ht(s, this.left + d, this.right - a[0]),
      y: this.top + d + w,
      line: 0
    } : v = {
      x: this.left + d,
      y: Ht(s, this.top + w + d, this.bottom - n[0].height),
      line: 0
    }, di(this.ctx, e.textDirection);
    const D = _ + d;
    this.legendItems.forEach((S, $) => {
      o.strokeStyle = S.fontColor, o.fillStyle = S.fontColor;
      const M = o.measureText(S.text).width, F = r.textAlign(S.textAlign || (S.textAlign = i.textAlign)), T = f + p + M;
      let B = v.x, P = v.y;
      r.setWidth(this.width), x ? $ > 0 && B + T + d > this.right && (P = v.y += D, v.line++, B = v.x = Ht(s, this.left + d, this.right - a[v.line])) : $ > 0 && P + D > this.bottom && (B = v.x = B + n[v.line].width + d, v.line++, P = v.y = Ht(s, this.top + w + d, this.bottom - n[v.line].height));
      const E = r.x(B);
      if (m(E, P, S), B = ir(F, B + f + p, x ? B + T : this.right, e.rtl), g(r.x(B), P, S), x)
        v.x += T + d;
      else if (typeof S.text != "string") {
        const N = c.lineHeight;
        v.y += Di(S, N) + d;
      } else
        v.y += D;
    }), ui(this.ctx, e.textDirection);
  }
  drawTitle() {
    const e = this.options, n = e.title, a = Ut(n.font), o = re(n.padding);
    if (!n.display)
      return;
    const s = nn(e.rtl, this.left, this.width), i = this.ctx, l = n.position, r = a.size / 2, c = o.top + r;
    let d, h = this.left, p = this.width;
    if (this.isHorizontal())
      p = Math.max(...this.lineWidths), d = this.top + c, h = Ht(e.align, h, this.right - p);
    else {
      const f = this.columnSizes.reduce((y, _) => Math.max(y, _.height), 0);
      d = c + Ht(e.align, this.top, this.bottom - f - e.labels.padding - this._computeTitleHeight());
    }
    const v = Ht(l, h, h + p);
    i.textAlign = s.textAlign(qa(l)), i.textBaseline = "middle", i.strokeStyle = n.color, i.fillStyle = n.color, i.font = a.string, Ln(i, n.text, v, d, a);
  }
  _computeTitleHeight() {
    const e = this.options.title, n = Ut(e.font), a = re(e.padding);
    return e.display ? n.lineHeight + a.height : 0;
  }
  _getLegendItemAt(e, n) {
    let a, o, s;
    if (Te(e, this.left, this.right) && Te(n, this.top, this.bottom)) {
      for (s = this.legendHitBoxes, a = 0; a < s.length; ++a)
        if (o = s[a], Te(e, o.left, o.left + o.width) && Te(n, o.top, o.top + o.height))
          return this.legendItems[a];
    }
    return null;
  }
  handleEvent(e) {
    const n = this.options;
    if (!Cu(e.type, n))
      return;
    const a = this._getLegendItemAt(e.x, e.y);
    if (e.type === "mousemove" || e.type === "mouseout") {
      const o = this._hoveredItem, s = xu(o, a);
      o && !s && Tt(n.onLeave, [
        e,
        o,
        this
      ], this), this._hoveredItem = a, a && !s && Tt(n.onHover, [
        e,
        a,
        this
      ], this);
    } else a && Tt(n.onClick, [
      e,
      a,
      this
    ], this);
  }
}
function _u(t, e, n, a, o) {
  const s = ku(a, t, e, n), i = wu(o, a, e.lineHeight);
  return {
    itemWidth: s,
    itemHeight: i
  };
}
function ku(t, e, n, a) {
  let o = t.text;
  return o && typeof o != "string" && (o = o.reduce((s, i) => s.length > i.length ? s : i)), e + n.size / 2 + a.measureText(o).width;
}
function wu(t, e, n) {
  let a = t;
  return typeof e.text != "string" && (a = Di(e, n)), a;
}
function Di(t, e) {
  const n = t.text ? t.text.length : 0;
  return e * n;
}
function Cu(t, e) {
  return !!((t === "mousemove" || t === "mouseout") && (e.onHover || e.onLeave) || e.onClick && (t === "click" || t === "mouseup"));
}
var io = {
  id: "legend",
  _element: ps,
  start(t, e, n) {
    const a = t.legend = new ps({
      ctx: t.ctx,
      options: n,
      chart: t
    });
    ie.configure(t, a, n), ie.addBox(t, a);
  },
  stop(t) {
    ie.removeBox(t, t.legend), delete t.legend;
  },
  beforeUpdate(t, e, n) {
    const a = t.legend;
    ie.configure(t, a, n), a.options = n;
  },
  afterUpdate(t) {
    const e = t.legend;
    e.buildLabels(), e.adjustHitBoxes();
  },
  afterEvent(t, e) {
    e.replay || t.legend.handleEvent(e.event);
  },
  defaults: {
    display: !0,
    position: "top",
    align: "center",
    fullSize: !0,
    reverse: !1,
    weight: 1e3,
    onClick(t, e, n) {
      const a = e.datasetIndex, o = n.chart;
      o.isDatasetVisible(a) ? (o.hide(a), e.hidden = !0) : (o.show(a), e.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (t) => t.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(t) {
        const e = t.data.datasets, { labels: { usePointStyle: n, pointStyle: a, textAlign: o, color: s, useBorderRadius: i, borderRadius: l } } = t.legend.options;
        return t._getSortedDatasetMetas().map((r) => {
          const c = r.controller.getStyle(n ? 0 : void 0), d = re(c.borderWidth);
          return {
            text: e[r.index].label,
            fillStyle: c.backgroundColor,
            fontColor: s,
            hidden: !r.visible,
            lineCap: c.borderCapStyle,
            lineDash: c.borderDash,
            lineDashOffset: c.borderDashOffset,
            lineJoin: c.borderJoinStyle,
            lineWidth: (d.width + d.height) / 4,
            strokeStyle: c.borderColor,
            pointStyle: a || c.pointStyle,
            rotation: c.rotation,
            textAlign: o || c.textAlign,
            borderRadius: i && (l || c.borderRadius),
            datasetIndex: r.index
          };
        }, this);
      }
    },
    title: {
      color: (t) => t.chart.options.color,
      display: !1,
      position: "center",
      text: ""
    }
  },
  descriptors: {
    _scriptable: (t) => !t.startsWith("on"),
    labels: {
      _scriptable: (t) => ![
        "generateLabels",
        "filter",
        "sort"
      ].includes(t)
    }
  }
};
class Ai extends $e {
  constructor(e) {
    super(), this.chart = e.chart, this.options = e.options, this.ctx = e.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(e, n) {
    const a = this.options;
    if (this.left = 0, this.top = 0, !a.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = e, this.height = this.bottom = n;
    const o = Vt(a.text) ? a.text.length : 1;
    this._padding = re(a.padding);
    const s = o * Ut(a.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = s : this.width = s;
  }
  isHorizontal() {
    const e = this.options.position;
    return e === "top" || e === "bottom";
  }
  _drawArgs(e) {
    const { top: n, left: a, bottom: o, right: s, options: i } = this, l = i.align;
    let r = 0, c, d, h;
    return this.isHorizontal() ? (d = Ht(l, a, s), h = n + e, c = s - a) : (i.position === "left" ? (d = a + e, h = Ht(l, o, n), r = St * -0.5) : (d = s - e, h = Ht(l, n, o), r = St * 0.5), c = o - n), {
      titleX: d,
      titleY: h,
      maxWidth: c,
      rotation: r
    };
  }
  draw() {
    const e = this.ctx, n = this.options;
    if (!n.display)
      return;
    const a = Ut(n.font), s = a.lineHeight / 2 + this._padding.top, { titleX: i, titleY: l, maxWidth: r, rotation: c } = this._drawArgs(s);
    Ln(e, n.text, 0, 0, a, {
      color: n.color,
      maxWidth: r,
      rotation: c,
      textAlign: qa(n.align),
      textBaseline: "middle",
      translation: [
        i,
        l
      ]
    });
  }
}
function $u(t, e) {
  const n = new Ai({
    ctx: t.ctx,
    options: e,
    chart: t
  });
  ie.configure(t, n, e), ie.addBox(t, n), t.titleBlock = n;
}
var Ti = {
  id: "title",
  _element: Ai,
  start(t, e, n) {
    $u(t, n);
  },
  stop(t) {
    const e = t.titleBlock;
    ie.removeBox(t, e), delete t.titleBlock;
  },
  beforeUpdate(t, e, n) {
    const a = t.titleBlock;
    ie.configure(t, a, n), a.options = n;
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
const yn = {
  average(t) {
    if (!t.length)
      return !1;
    let e, n, a = /* @__PURE__ */ new Set(), o = 0, s = 0;
    for (e = 0, n = t.length; e < n; ++e) {
      const l = t[e].element;
      if (l && l.hasValue()) {
        const r = l.tooltipPosition();
        a.add(r.x), o += r.y, ++s;
      }
    }
    return s === 0 || a.size === 0 ? !1 : {
      x: [
        ...a
      ].reduce((l, r) => l + r) / a.size,
      y: o / s
    };
  },
  nearest(t, e) {
    if (!t.length)
      return !1;
    let n = e.x, a = e.y, o = Number.POSITIVE_INFINITY, s, i, l;
    for (s = 0, i = t.length; s < i; ++s) {
      const r = t[s].element;
      if (r && r.hasValue()) {
        const c = r.getCenterPoint(), d = Ea(e, c);
        d < o && (o = d, l = r);
      }
    }
    if (l) {
      const r = l.tooltipPosition();
      n = r.x, a = r.y;
    }
    return {
      x: n,
      y: a
    };
  }
};
function ge(t, e) {
  return e && (Vt(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t;
}
function _e(t) {
  return (typeof t == "string" || t instanceof String) && t.indexOf(`
`) > -1 ? t.split(`
`) : t;
}
function Mu(t, e) {
  const { element: n, datasetIndex: a, index: o } = e, s = t.getDatasetMeta(a).controller, { label: i, value: l } = s.getLabelAndValue(o);
  return {
    chart: t,
    label: i,
    parsed: s.getParsed(o),
    raw: t.data.datasets[a].data[o],
    formattedValue: l,
    dataset: s.getDataset(),
    dataIndex: o,
    datasetIndex: a,
    element: n
  };
}
function ms(t, e) {
  const n = t.chart.ctx, { body: a, footer: o, title: s } = t, { boxWidth: i, boxHeight: l } = e, r = Ut(e.bodyFont), c = Ut(e.titleFont), d = Ut(e.footerFont), h = s.length, p = o.length, v = a.length, f = re(e.padding);
  let y = f.height, _ = 0, m = a.reduce((w, D) => w + D.before.length + D.lines.length + D.after.length, 0);
  if (m += t.beforeBody.length + t.afterBody.length, h && (y += h * c.lineHeight + (h - 1) * e.titleSpacing + e.titleMarginBottom), m) {
    const w = e.displayColors ? Math.max(l, r.lineHeight) : r.lineHeight;
    y += v * w + (m - v) * r.lineHeight + (m - 1) * e.bodySpacing;
  }
  p && (y += e.footerMarginTop + p * d.lineHeight + (p - 1) * e.footerSpacing);
  let g = 0;
  const x = function(w) {
    _ = Math.max(_, n.measureText(w).width + g);
  };
  return n.save(), n.font = c.string, Mt(t.title, x), n.font = r.string, Mt(t.beforeBody.concat(t.afterBody), x), g = e.displayColors ? i + 2 + e.boxPadding : 0, Mt(a, (w) => {
    Mt(w.before, x), Mt(w.lines, x), Mt(w.after, x);
  }), g = 0, n.font = d.string, Mt(t.footer, x), n.restore(), _ += f.width, {
    width: _,
    height: y
  };
}
function Su(t, e) {
  const { y: n, height: a } = e;
  return n < a / 2 ? "top" : n > t.height - a / 2 ? "bottom" : "center";
}
function Du(t, e, n, a) {
  const { x: o, width: s } = a, i = n.caretSize + n.caretPadding;
  if (t === "left" && o + s + i > e.width || t === "right" && o - s - i < 0)
    return !0;
}
function Au(t, e, n, a) {
  const { x: o, width: s } = n, { width: i, chartArea: { left: l, right: r } } = t;
  let c = "center";
  return a === "center" ? c = o <= (l + r) / 2 ? "left" : "right" : o <= s / 2 ? c = "left" : o >= i - s / 2 && (c = "right"), Du(c, t, e, n) && (c = "center"), c;
}
function bs(t, e, n) {
  const a = n.yAlign || e.yAlign || Su(t, n);
  return {
    xAlign: n.xAlign || e.xAlign || Au(t, e, n, a),
    yAlign: a
  };
}
function Tu(t, e) {
  let { x: n, width: a } = t;
  return e === "right" ? n -= a : e === "center" && (n -= a / 2), n;
}
function Bu(t, e, n) {
  let { y: a, height: o } = t;
  return e === "top" ? a += n : e === "bottom" ? a -= o + n : a -= o / 2, a;
}
function vs(t, e, n, a) {
  const { caretSize: o, caretPadding: s, cornerRadius: i } = t, { xAlign: l, yAlign: r } = n, c = o + s, { topLeft: d, topRight: h, bottomLeft: p, bottomRight: v } = en(i);
  let f = Tu(e, l);
  const y = Bu(e, r, c);
  return r === "center" ? l === "left" ? f += c : l === "right" && (f -= c) : l === "left" ? f -= Math.max(d, p) + o : l === "right" && (f += Math.max(h, v) + o), {
    x: Kt(f, 0, a.width - e.width),
    y: Kt(y, 0, a.height - e.height)
  };
}
function Xn(t, e, n) {
  const a = re(n.padding);
  return e === "center" ? t.x + t.width / 2 : e === "right" ? t.x + t.width - a.right : t.x + a.left;
}
function ys(t) {
  return ge([], _e(t));
}
function Lu(t, e, n) {
  return Ge(t, {
    tooltip: e,
    tooltipItems: n,
    type: "tooltip"
  });
}
function xs(t, e) {
  const n = e && e.dataset && e.dataset.tooltip && e.dataset.tooltip.callbacks;
  return n ? t.override(n) : t;
}
const Bi = {
  beforeTitle: ye,
  title(t) {
    if (t.length > 0) {
      const e = t[0], n = e.chart.data.labels, a = n ? n.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return e.dataset.label || "";
      if (e.label)
        return e.label;
      if (a > 0 && e.dataIndex < a)
        return n[e.dataIndex];
    }
    return "";
  },
  afterTitle: ye,
  beforeBody: ye,
  beforeLabel: ye,
  label(t) {
    if (this && this.options && this.options.mode === "dataset")
      return t.label + ": " + t.formattedValue || t.formattedValue;
    let e = t.dataset.label || "";
    e && (e += ": ");
    const n = t.formattedValue;
    return $t(n) || (e += n), e;
  },
  labelColor(t) {
    const n = t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex);
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
  labelPointStyle(t) {
    const n = t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex);
    return {
      pointStyle: n.pointStyle,
      rotation: n.rotation
    };
  },
  afterLabel: ye,
  afterBody: ye,
  beforeFooter: ye,
  footer: ye,
  afterFooter: ye
};
function Xt(t, e, n, a) {
  const o = t[e].call(n, a);
  return typeof o > "u" ? Bi[e].call(n, a) : o;
}
class _s extends $e {
  static positioners = yn;
  constructor(e) {
    super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.chart = e.chart, this.options = e.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0;
  }
  initialize(e) {
    this.options = e, this._cachedAnimations = void 0, this.$context = void 0;
  }
  _resolveAnimations() {
    const e = this._cachedAnimations;
    if (e)
      return e;
    const n = this.chart, a = this.options.setContext(this.getContext()), o = a.enabled && n.options.animation && a.animations, s = new fi(this.chart, o);
    return o._cacheable && (this._cachedAnimations = Object.freeze(s)), s;
  }
  getContext() {
    return this.$context || (this.$context = Lu(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(e, n) {
    const { callbacks: a } = n, o = Xt(a, "beforeTitle", this, e), s = Xt(a, "title", this, e), i = Xt(a, "afterTitle", this, e);
    let l = [];
    return l = ge(l, _e(o)), l = ge(l, _e(s)), l = ge(l, _e(i)), l;
  }
  getBeforeBody(e, n) {
    return ys(Xt(n.callbacks, "beforeBody", this, e));
  }
  getBody(e, n) {
    const { callbacks: a } = n, o = [];
    return Mt(e, (s) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, l = xs(a, s);
      ge(i.before, _e(Xt(l, "beforeLabel", this, s))), ge(i.lines, Xt(l, "label", this, s)), ge(i.after, _e(Xt(l, "afterLabel", this, s))), o.push(i);
    }), o;
  }
  getAfterBody(e, n) {
    return ys(Xt(n.callbacks, "afterBody", this, e));
  }
  getFooter(e, n) {
    const { callbacks: a } = n, o = Xt(a, "beforeFooter", this, e), s = Xt(a, "footer", this, e), i = Xt(a, "afterFooter", this, e);
    let l = [];
    return l = ge(l, _e(o)), l = ge(l, _e(s)), l = ge(l, _e(i)), l;
  }
  _createItems(e) {
    const n = this._active, a = this.chart.data, o = [], s = [], i = [];
    let l = [], r, c;
    for (r = 0, c = n.length; r < c; ++r)
      l.push(Mu(this.chart, n[r]));
    return e.filter && (l = l.filter((d, h, p) => e.filter(d, h, p, a))), e.itemSort && (l = l.sort((d, h) => e.itemSort(d, h, a))), Mt(l, (d) => {
      const h = xs(e.callbacks, d);
      o.push(Xt(h, "labelColor", this, d)), s.push(Xt(h, "labelPointStyle", this, d)), i.push(Xt(h, "labelTextColor", this, d));
    }), this.labelColors = o, this.labelPointStyles = s, this.labelTextColors = i, this.dataPoints = l, l;
  }
  update(e, n) {
    const a = this.options.setContext(this.getContext()), o = this._active;
    let s, i = [];
    if (!o.length)
      this.opacity !== 0 && (s = {
        opacity: 0
      });
    else {
      const l = yn[a.position].call(this, o, this._eventPosition);
      i = this._createItems(a), this.title = this.getTitle(i, a), this.beforeBody = this.getBeforeBody(i, a), this.body = this.getBody(i, a), this.afterBody = this.getAfterBody(i, a), this.footer = this.getFooter(i, a);
      const r = this._size = ms(this, a), c = Object.assign({}, l, r), d = bs(this.chart, a, c), h = vs(a, c, d, this.chart);
      this.xAlign = d.xAlign, this.yAlign = d.yAlign, s = {
        opacity: 1,
        x: h.x,
        y: h.y,
        width: r.width,
        height: r.height,
        caretX: l.x,
        caretY: l.y
      };
    }
    this._tooltipItems = i, this.$context = void 0, s && this._resolveAnimations().update(this, s), e && a.external && a.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: n
    });
  }
  drawCaret(e, n, a, o) {
    const s = this.getCaretPosition(e, a, o);
    n.lineTo(s.x1, s.y1), n.lineTo(s.x2, s.y2), n.lineTo(s.x3, s.y3);
  }
  getCaretPosition(e, n, a) {
    const { xAlign: o, yAlign: s } = this, { caretSize: i, cornerRadius: l } = a, { topLeft: r, topRight: c, bottomLeft: d, bottomRight: h } = en(l), { x: p, y: v } = e, { width: f, height: y } = n;
    let _, m, g, x, w, D;
    return s === "center" ? (w = v + y / 2, o === "left" ? (_ = p, m = _ - i, x = w + i, D = w - i) : (_ = p + f, m = _ + i, x = w - i, D = w + i), g = _) : (o === "left" ? m = p + Math.max(r, d) + i : o === "right" ? m = p + f - Math.max(c, h) - i : m = this.caretX, s === "top" ? (x = v, w = x - i, _ = m - i, g = m + i) : (x = v + y, w = x + i, _ = m + i, g = m - i), D = x), {
      x1: _,
      x2: m,
      x3: g,
      y1: x,
      y2: w,
      y3: D
    };
  }
  drawTitle(e, n, a) {
    const o = this.title, s = o.length;
    let i, l, r;
    if (s) {
      const c = nn(a.rtl, this.x, this.width);
      for (e.x = Xn(this, a.titleAlign, a), n.textAlign = c.textAlign(a.titleAlign), n.textBaseline = "middle", i = Ut(a.titleFont), l = a.titleSpacing, n.fillStyle = a.titleColor, n.font = i.string, r = 0; r < s; ++r)
        n.fillText(o[r], c.x(e.x), e.y + i.lineHeight / 2), e.y += i.lineHeight + l, r + 1 === s && (e.y += a.titleMarginBottom - l);
    }
  }
  _drawColorBox(e, n, a, o, s) {
    const i = this.labelColors[a], l = this.labelPointStyles[a], { boxHeight: r, boxWidth: c } = s, d = Ut(s.bodyFont), h = Xn(this, "left", s), p = o.x(h), v = r < d.lineHeight ? (d.lineHeight - r) / 2 : 0, f = n.y + v;
    if (s.usePointStyle) {
      const y = {
        radius: Math.min(c, r) / 2,
        pointStyle: l.pointStyle,
        rotation: l.rotation,
        borderWidth: 1
      }, _ = o.leftForLtr(p, c) + c / 2, m = f + r / 2;
      e.strokeStyle = s.multiKeyBackground, e.fillStyle = s.multiKeyBackground, Ra(e, y, _, m), e.strokeStyle = i.borderColor, e.fillStyle = i.backgroundColor, Ra(e, y, _, m);
    } else {
      e.lineWidth = kt(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, e.strokeStyle = i.borderColor, e.setLineDash(i.borderDash || []), e.lineDashOffset = i.borderDashOffset || 0;
      const y = o.leftForLtr(p, c), _ = o.leftForLtr(o.xPlus(p, 1), c - 2), m = en(i.borderRadius);
      Object.values(m).some((g) => g !== 0) ? (e.beginPath(), e.fillStyle = s.multiKeyBackground, sa(e, {
        x: y,
        y: f,
        w: c,
        h: r,
        radius: m
      }), e.fill(), e.stroke(), e.fillStyle = i.backgroundColor, e.beginPath(), sa(e, {
        x: _,
        y: f + 1,
        w: c - 2,
        h: r - 2,
        radius: m
      }), e.fill()) : (e.fillStyle = s.multiKeyBackground, e.fillRect(y, f, c, r), e.strokeRect(y, f, c, r), e.fillStyle = i.backgroundColor, e.fillRect(_, f + 1, c - 2, r - 2));
    }
    e.fillStyle = this.labelTextColors[a];
  }
  drawBody(e, n, a) {
    const { body: o } = this, { bodySpacing: s, bodyAlign: i, displayColors: l, boxHeight: r, boxWidth: c, boxPadding: d } = a, h = Ut(a.bodyFont);
    let p = h.lineHeight, v = 0;
    const f = nn(a.rtl, this.x, this.width), y = function(M) {
      n.fillText(M, f.x(e.x + v), e.y + p / 2), e.y += p + s;
    }, _ = f.textAlign(i);
    let m, g, x, w, D, S, $;
    for (n.textAlign = i, n.textBaseline = "middle", n.font = h.string, e.x = Xn(this, _, a), n.fillStyle = a.bodyColor, Mt(this.beforeBody, y), v = l && _ !== "right" ? i === "center" ? c / 2 + d : c + 2 + d : 0, w = 0, S = o.length; w < S; ++w) {
      for (m = o[w], g = this.labelTextColors[w], n.fillStyle = g, Mt(m.before, y), x = m.lines, l && x.length && (this._drawColorBox(n, e, w, f, a), p = Math.max(h.lineHeight, r)), D = 0, $ = x.length; D < $; ++D)
        y(x[D]), p = h.lineHeight;
      Mt(m.after, y);
    }
    v = 0, p = h.lineHeight, Mt(this.afterBody, y), e.y -= s;
  }
  drawFooter(e, n, a) {
    const o = this.footer, s = o.length;
    let i, l;
    if (s) {
      const r = nn(a.rtl, this.x, this.width);
      for (e.x = Xn(this, a.footerAlign, a), e.y += a.footerMarginTop, n.textAlign = r.textAlign(a.footerAlign), n.textBaseline = "middle", i = Ut(a.footerFont), n.fillStyle = a.footerColor, n.font = i.string, l = 0; l < s; ++l)
        n.fillText(o[l], r.x(e.x), e.y + i.lineHeight / 2), e.y += i.lineHeight + a.footerSpacing;
    }
  }
  drawBackground(e, n, a, o) {
    const { xAlign: s, yAlign: i } = this, { x: l, y: r } = e, { width: c, height: d } = a, { topLeft: h, topRight: p, bottomLeft: v, bottomRight: f } = en(o.cornerRadius);
    n.fillStyle = o.backgroundColor, n.strokeStyle = o.borderColor, n.lineWidth = o.borderWidth, n.beginPath(), n.moveTo(l + h, r), i === "top" && this.drawCaret(e, n, a, o), n.lineTo(l + c - p, r), n.quadraticCurveTo(l + c, r, l + c, r + p), i === "center" && s === "right" && this.drawCaret(e, n, a, o), n.lineTo(l + c, r + d - f), n.quadraticCurveTo(l + c, r + d, l + c - f, r + d), i === "bottom" && this.drawCaret(e, n, a, o), n.lineTo(l + v, r + d), n.quadraticCurveTo(l, r + d, l, r + d - v), i === "center" && s === "left" && this.drawCaret(e, n, a, o), n.lineTo(l, r + h), n.quadraticCurveTo(l, r, l + h, r), n.closePath(), n.fill(), o.borderWidth > 0 && n.stroke();
  }
  _updateAnimationTarget(e) {
    const n = this.chart, a = this.$animations, o = a && a.x, s = a && a.y;
    if (o || s) {
      const i = yn[e.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const l = this._size = ms(this, e), r = Object.assign({}, i, this._size), c = bs(n, e, r), d = vs(e, r, c, n);
      (o._to !== d.x || s._to !== d.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = l.width, this.height = l.height, this.caretX = i.x, this.caretY = i.y, this._resolveAnimations().update(this, d));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(e) {
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
    const i = re(n.padding), l = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    n.enabled && l && (e.save(), e.globalAlpha = a, this.drawBackground(s, e, o, n), di(e, n.textDirection), s.y += i.top, this.drawTitle(s, e, n), this.drawBody(s, e, n), this.drawFooter(s, e, n), ui(e, n.textDirection), e.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(e, n) {
    const a = this._active, o = e.map(({ datasetIndex: l, index: r }) => {
      const c = this.chart.getDatasetMeta(l);
      if (!c)
        throw new Error("Cannot find a dataset at index " + l);
      return {
        datasetIndex: l,
        element: c.data[r],
        index: r
      };
    }), s = !na(a, o), i = this._positionChanged(o, n);
    (s || i) && (this._active = o, this._eventPosition = n, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(e, n, a = !0) {
    if (n && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const o = this.options, s = this._active || [], i = this._getActiveElements(e, s, n, a), l = this._positionChanged(i, e), r = n || !na(i, s) || l;
    return r && (this._active = i, (o.enabled || o.external) && (this._eventPosition = {
      x: e.x,
      y: e.y
    }, this.update(!0, n))), r;
  }
  _getActiveElements(e, n, a, o) {
    const s = this.options;
    if (e.type === "mouseout")
      return [];
    if (!o)
      return n.filter((l) => this.chart.data.datasets[l.datasetIndex] && this.chart.getDatasetMeta(l.datasetIndex).controller.getParsed(l.index) !== void 0);
    const i = this.chart.getElementsAtEventForMode(e, s.mode, s, a);
    return s.reverse && i.reverse(), i;
  }
  _positionChanged(e, n) {
    const { caretX: a, caretY: o, options: s } = this, i = yn[s.position].call(this, e, n);
    return i !== !1 && (a !== i.x || o !== i.y);
  }
}
var lo = {
  id: "tooltip",
  _element: _s,
  positioners: yn,
  afterInit(t, e, n) {
    n && (t.tooltip = new _s({
      chart: t,
      options: n
    }));
  },
  beforeUpdate(t, e, n) {
    t.tooltip && t.tooltip.initialize(n);
  },
  reset(t, e, n) {
    t.tooltip && t.tooltip.initialize(n);
  },
  afterDraw(t) {
    const e = t.tooltip;
    if (e && e._willRender()) {
      const n = {
        tooltip: e
      };
      if (t.notifyPlugins("beforeTooltipDraw", {
        ...n,
        cancelable: !0
      }) === !1)
        return;
      e.draw(t.ctx), t.notifyPlugins("afterTooltipDraw", n);
    }
  },
  afterEvent(t, e) {
    if (t.tooltip) {
      const n = e.replay;
      t.tooltip.handleEvent(e.event, n, e.inChartArea) && (e.changed = !0);
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
    boxHeight: (t, e) => e.bodyFont.size,
    boxWidth: (t, e) => e.bodyFont.size,
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
    _scriptable: (t) => t !== "filter" && t !== "itemSort" && t !== "external",
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
const Fu = (t, e, n, a) => (typeof e == "string" ? (n = t.push(e) - 1, a.unshift({
  index: n,
  label: e
})) : isNaN(e) && (n = null), n);
function Pu(t, e, n, a) {
  const o = t.indexOf(e);
  if (o === -1)
    return Fu(t, e, n, a);
  const s = t.lastIndexOf(e);
  return o !== s ? n : o;
}
const Eu = (t, e) => t === null ? null : Kt(Math.round(t), 0, e);
function ks(t) {
  const e = this.getLabels();
  return t >= 0 && t < e.length ? e[t] : t;
}
class Li extends rn {
  static id = "category";
  static defaults = {
    ticks: {
      callback: ks
    }
  };
  constructor(e) {
    super(e), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(e) {
    const n = this._addedLabels;
    if (n.length) {
      const a = this.getLabels();
      for (const { index: o, label: s } of n)
        a[o] === s && a.splice(o, 1);
      this._addedLabels = [];
    }
    super.init(e);
  }
  parse(e, n) {
    if ($t(e))
      return null;
    const a = this.getLabels();
    return n = isFinite(n) && a[n] === e ? n : Pu(a, e, ht(n, e), this._addedLabels), Eu(n, a.length - 1);
  }
  determineDataLimits() {
    const { minDefined: e, maxDefined: n } = this.getUserBounds();
    let { min: a, max: o } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (e || (a = 0), n || (o = this.getLabels().length - 1)), this.min = a, this.max = o;
  }
  buildTicks() {
    const e = this.min, n = this.max, a = this.options.offset, o = [];
    let s = this.getLabels();
    s = e === 0 && n === s.length - 1 ? s : s.slice(e, n + 1), this._valueRange = Math.max(s.length - (a ? 0 : 1), 1), this._startValue = this.min - (a ? 0.5 : 0);
    for (let i = e; i <= n; i++)
      o.push({
        value: i
      });
    return o;
  }
  getLabelForValue(e) {
    return ks.call(this, e);
  }
  configure() {
    super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
  }
  getPixelForValue(e) {
    return typeof e != "number" && (e = this.parse(e)), e === null ? NaN : this.getPixelForDecimal((e - this._startValue) / this._valueRange);
  }
  getPixelForTick(e) {
    const n = this.ticks;
    return e < 0 || e > n.length - 1 ? null : this.getPixelForValue(n[e].value);
  }
  getValueForPixel(e) {
    return Math.round(this._startValue + this.getDecimalForPixel(e) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
}
function Iu(t, e) {
  const n = [], { bounds: o, step: s, min: i, max: l, precision: r, count: c, maxTicks: d, maxDigits: h, includeBounds: p } = t, v = s || 1, f = d - 1, { min: y, max: _ } = e, m = !$t(i), g = !$t(l), x = !$t(c), w = (_ - y) / (h + 1);
  let D = wo((_ - y) / f / v) * v, S, $, M, F;
  if (D < 1e-14 && !m && !g)
    return [
      {
        value: y
      },
      {
        value: _
      }
    ];
  F = Math.ceil(_ / D) - Math.floor(y / D), F > f && (D = wo(F * D / f / v) * v), $t(r) || (S = Math.pow(10, r), D = Math.ceil(D * S) / S), o === "ticks" ? ($ = Math.floor(y / D) * D, M = Math.ceil(_ / D) * D) : ($ = y, M = _), m && g && s && Zl((l - i) / s, D / 1e3) ? (F = Math.round(Math.min((l - i) / D, d)), D = (l - i) / F, $ = i, M = l) : x ? ($ = m ? i : $, M = g ? l : M, F = c - 1, D = (M - $) / F) : (F = (M - $) / D, kn(F, Math.round(F), D / 1e3) ? F = Math.round(F) : F = Math.ceil(F));
  const T = Math.max(Co(D), Co($));
  S = Math.pow(10, $t(r) ? T : r), $ = Math.round($ * S) / S, M = Math.round(M * S) / S;
  let B = 0;
  for (m && (p && $ !== i ? (n.push({
    value: i
  }), $ < i && B++, kn(Math.round(($ + B * D) * S) / S, i, ws(i, w, t)) && B++) : $ < i && B++); B < F; ++B) {
    const P = Math.round(($ + B * D) * S) / S;
    if (g && P > l)
      break;
    n.push({
      value: P
    });
  }
  return g && p && M !== l ? n.length && kn(n[n.length - 1].value, l, ws(l, w, t)) ? n[n.length - 1].value = l : n.push({
    value: l
  }) : (!g || M === l) && n.push({
    value: M
  }), n;
}
function ws(t, e, { horizontal: n, minRotation: a }) {
  const o = we(a), s = (n ? Math.sin(o) : Math.cos(o)) || 1e-3, i = 0.75 * e * ("" + t).length;
  return Math.min(e / s, i);
}
class Ru extends rn {
  constructor(e) {
    super(e), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(e, n) {
    return $t(e) || (typeof e == "number" || e instanceof Number) && !isFinite(+e) ? null : +e;
  }
  handleTickRangeOptions() {
    const { beginAtZero: e } = this.options, { minDefined: n, maxDefined: a } = this.getUserBounds();
    let { min: o, max: s } = this;
    const i = (r) => o = n ? o : r, l = (r) => s = a ? s : r;
    if (e) {
      const r = me(o), c = me(s);
      r < 0 && c < 0 ? l(0) : r > 0 && c > 0 && i(0);
    }
    if (o === s) {
      let r = s === 0 ? 1 : Math.abs(s * 0.05);
      l(s + r), e || i(o - r);
    }
    this.min = o, this.max = s;
  }
  getTickLimit() {
    const e = this.options.ticks;
    let { maxTicksLimit: n, stepSize: a } = e, o;
    return a ? (o = Math.ceil(this.max / a) - Math.floor(this.min / a) + 1, o > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${a} would result generating up to ${o} ticks. Limiting to 1000.`), o = 1e3)) : (o = this.computeTickLimit(), n = n || 11), n && (o = Math.min(n, o)), o;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const e = this.options, n = e.ticks;
    let a = this.getTickLimit();
    a = Math.max(2, a);
    const o = {
      maxTicks: a,
      bounds: e.bounds,
      min: e.min,
      max: e.max,
      precision: n.precision,
      step: n.stepSize,
      count: n.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: n.minRotation || 0,
      includeBounds: n.includeBounds !== !1
    }, s = this._range || this, i = Iu(o, s);
    return e.bounds === "ticks" && Ql(i, this, "value"), e.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
  }
  configure() {
    const e = this.ticks;
    let n = this.min, a = this.max;
    if (super.configure(), this.options.offset && e.length) {
      const o = (a - n) / Math.max(e.length - 1, 1) / 2;
      n -= o, a += o;
    }
    this._startValue = n, this._endValue = a, this._valueRange = a - n;
  }
  getLabelForValue(e) {
    return Ga(e, this.chart.options.locale, this.options.ticks.format);
  }
}
class Fi extends Ru {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: ni.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: e, max: n } = this.getMinMax(!0);
    this.min = le(e) ? e : 0, this.max = le(n) ? n : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const e = this.isHorizontal(), n = e ? this.width : this.height, a = we(this.options.ticks.minRotation), o = (e ? Math.sin(a) : Math.cos(a)) || 1e-3, s = this._resolveTickFontOptions(0);
    return Math.ceil(n / Math.min(40, s.lineHeight / o));
  }
  getPixelForValue(e) {
    return e === null ? NaN : this.getPixelForDecimal((e - this._startValue) / this._valueRange);
  }
  getValueForPixel(e) {
    return this._startValue + this.getDecimalForPixel(e) * this._valueRange;
  }
}
const ga = {
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
}, Qt = /* @__PURE__ */ Object.keys(ga);
function Cs(t, e) {
  return t - e;
}
function $s(t, e) {
  if ($t(e))
    return null;
  const n = t._adapter, { parser: a, round: o, isoWeekday: s } = t._parseOpts;
  let i = e;
  return typeof a == "function" && (i = a(i)), le(i) || (i = typeof a == "string" ? n.parse(i, a) : n.parse(i)), i === null ? null : (o && (i = o === "week" && (An(s) || s === !0) ? n.startOf(i, "isoWeek", s) : n.startOf(i, o)), +i);
}
function Ms(t, e, n, a) {
  const o = Qt.length;
  for (let s = Qt.indexOf(t); s < o - 1; ++s) {
    const i = ga[Qt[s]], l = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((n - e) / (l * i.size)) <= a)
      return Qt[s];
  }
  return Qt[o - 1];
}
function Ou(t, e, n, a, o) {
  for (let s = Qt.length - 1; s >= Qt.indexOf(n); s--) {
    const i = Qt[s];
    if (ga[i].common && t._adapter.diff(o, a, i) >= e - 1)
      return i;
  }
  return Qt[n ? Qt.indexOf(n) : 0];
}
function Vu(t) {
  for (let e = Qt.indexOf(t) + 1, n = Qt.length; e < n; ++e)
    if (ga[Qt[e]].common)
      return Qt[e];
}
function Ss(t, e, n) {
  if (!n)
    t[e] = !0;
  else if (n.length) {
    const { lo: a, hi: o } = Ua(n, e), s = n[a] >= e ? n[a] : n[o];
    t[s] = !0;
  }
}
function zu(t, e, n, a) {
  const o = t._adapter, s = +o.startOf(e[0].value, a), i = e[e.length - 1].value;
  let l, r;
  for (l = s; l <= i; l = +o.add(l, 1, a))
    r = n[l], r >= 0 && (e[r].major = !0);
  return e;
}
function Ds(t, e, n) {
  const a = [], o = {}, s = e.length;
  let i, l;
  for (i = 0; i < s; ++i)
    l = e[i], o[l] = i, a.push({
      value: l,
      major: !1
    });
  return s === 0 || !n ? a : zu(t, a, o, n);
}
class As extends rn {
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
  constructor(e) {
    super(e), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(e, n = {}) {
    const a = e.time || (e.time = {}), o = this._adapter = new Nc._date(e.adapters.date);
    o.init(n), _n(a.displayFormats, o.formats()), this._parseOpts = {
      parser: a.parser,
      round: a.round,
      isoWeekday: a.isoWeekday
    }, super.init(e), this._normalized = n.normalized;
  }
  parse(e, n) {
    return e === void 0 ? null : $s(this, e);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const e = this.options, n = this._adapter, a = e.time.unit || "day";
    let { min: o, max: s, minDefined: i, maxDefined: l } = this.getUserBounds();
    function r(c) {
      !i && !isNaN(c.min) && (o = Math.min(o, c.min)), !l && !isNaN(c.max) && (s = Math.max(s, c.max));
    }
    (!i || !l) && (r(this._getLabelBounds()), (e.bounds !== "ticks" || e.ticks.source !== "labels") && r(this.getMinMax(!1))), o = le(o) && !isNaN(o) ? o : +n.startOf(Date.now(), a), s = le(s) && !isNaN(s) ? s : +n.endOf(Date.now(), a) + 1, this.min = Math.min(o, s - 1), this.max = Math.max(o + 1, s);
  }
  _getLabelBounds() {
    const e = this.getLabelTimestamps();
    let n = Number.POSITIVE_INFINITY, a = Number.NEGATIVE_INFINITY;
    return e.length && (n = e[0], a = e[e.length - 1]), {
      min: n,
      max: a
    };
  }
  buildTicks() {
    const e = this.options, n = e.time, a = e.ticks, o = a.source === "labels" ? this.getLabelTimestamps() : this._generate();
    e.bounds === "ticks" && o.length && (this.min = this._userMin || o[0], this.max = this._userMax || o[o.length - 1]);
    const s = this.min, i = this.max, l = ar(o, s, i);
    return this._unit = n.unit || (a.autoSkip ? Ms(n.minUnit, this.min, this.max, this._getLabelCapacity(s)) : Ou(this, l.length, n.minUnit, this.min, this.max)), this._majorUnit = !a.major.enabled || this._unit === "year" ? void 0 : Vu(this._unit), this.initOffsets(o), e.reverse && l.reverse(), Ds(this, l, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((e) => +e.value));
  }
  initOffsets(e = []) {
    let n = 0, a = 0, o, s;
    this.options.offset && e.length && (o = this.getDecimalForValue(e[0]), e.length === 1 ? n = 1 - o : n = (this.getDecimalForValue(e[1]) - o) / 2, s = this.getDecimalForValue(e[e.length - 1]), e.length === 1 ? a = s : a = (s - this.getDecimalForValue(e[e.length - 2])) / 2);
    const i = e.length < 3 ? 0.5 : 0.25;
    n = Kt(n, 0, i), a = Kt(a, 0, i), this._offsets = {
      start: n,
      end: a,
      factor: 1 / (n + 1 + a)
    };
  }
  _generate() {
    const e = this._adapter, n = this.min, a = this.max, o = this.options, s = o.time, i = s.unit || Ms(s.minUnit, n, a, this._getLabelCapacity(n)), l = ht(o.ticks.stepSize, 1), r = i === "week" ? s.isoWeekday : !1, c = An(r) || r === !0, d = {};
    let h = n, p, v;
    if (c && (h = +e.startOf(h, "isoWeek", r)), h = +e.startOf(h, c ? "day" : i), e.diff(a, n, i) > 1e5 * l)
      throw new Error(n + " and " + a + " are too far apart with stepSize of " + l + " " + i);
    const f = o.ticks.source === "data" && this.getDataTimestamps();
    for (p = h, v = 0; p < a; p = +e.add(p, l, i), v++)
      Ss(d, p, f);
    return (p === a || o.bounds === "ticks" || v === 1) && Ss(d, p, f), Object.keys(d).sort(Cs).map((y) => +y);
  }
  getLabelForValue(e) {
    const n = this._adapter, a = this.options.time;
    return a.tooltipFormat ? n.format(e, a.tooltipFormat) : n.format(e, a.displayFormats.datetime);
  }
  format(e, n) {
    const o = this.options.time.displayFormats, s = this._unit, i = n || o[s];
    return this._adapter.format(e, i);
  }
  _tickFormatFunction(e, n, a, o) {
    const s = this.options, i = s.ticks.callback;
    if (i)
      return Tt(i, [
        e,
        n,
        a
      ], this);
    const l = s.time.displayFormats, r = this._unit, c = this._majorUnit, d = r && l[r], h = c && l[c], p = a[n], v = c && h && p && p.major;
    return this._adapter.format(e, o || (v ? h : d));
  }
  generateTickLabels(e) {
    let n, a, o;
    for (n = 0, a = e.length; n < a; ++n)
      o = e[n], o.label = this._tickFormatFunction(o.value, n, e);
  }
  getDecimalForValue(e) {
    return e === null ? NaN : (e - this.min) / (this.max - this.min);
  }
  getPixelForValue(e) {
    const n = this._offsets, a = this.getDecimalForValue(e);
    return this.getPixelForDecimal((n.start + a) * n.factor);
  }
  getValueForPixel(e) {
    const n = this._offsets, a = this.getDecimalForPixel(e) / n.factor - n.end;
    return this.min + a * (this.max - this.min);
  }
  _getLabelSize(e) {
    const n = this.options.ticks, a = this.ctx.measureText(e).width, o = we(this.isHorizontal() ? n.maxRotation : n.minRotation), s = Math.cos(o), i = Math.sin(o), l = this._resolveTickFontOptions(0).size;
    return {
      w: a * s + l * i,
      h: a * i + l * s
    };
  }
  _getLabelCapacity(e) {
    const n = this.options.time, a = n.displayFormats, o = a[n.unit] || a.millisecond, s = this._tickFormatFunction(e, 0, Ds(this, [
      e
    ], this._majorUnit), o), i = this._getLabelSize(s), l = Math.floor(this.isHorizontal() ? this.width / i.w : this.height / i.h) - 1;
    return l > 0 ? l : 1;
  }
  getDataTimestamps() {
    let e = this._cache.data || [], n, a;
    if (e.length)
      return e;
    const o = this.getMatchingVisibleMetas();
    if (this._normalized && o.length)
      return this._cache.data = o[0].controller.getAllParsedValues(this);
    for (n = 0, a = o.length; n < a; ++n)
      e = e.concat(o[n].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(e);
  }
  getLabelTimestamps() {
    const e = this._cache.labels || [];
    let n, a;
    if (e.length)
      return e;
    const o = this.getLabels();
    for (n = 0, a = o.length; n < a; ++n)
      e.push($s(this, o[n]));
    return this._cache.labels = this._normalized ? e : this.normalize(e);
  }
  normalize(e) {
    return Js(e.sort(Cs));
  }
}
function Gn(t, e, n) {
  let a = 0, o = t.length - 1, s, i, l, r;
  n ? (e >= t[a].pos && e <= t[o].pos && ({ lo: a, hi: o } = Ye(t, "pos", e)), { pos: s, time: l } = t[a], { pos: i, time: r } = t[o]) : (e >= t[a].time && e <= t[o].time && ({ lo: a, hi: o } = Ye(t, "time", e)), { time: s, pos: l } = t[a], { time: i, pos: r } = t[o]);
  const c = i - s;
  return c ? l + (r - l) * (e - s) / c : l;
}
class d$ extends As {
  static id = "timeseries";
  static defaults = As.defaults;
  constructor(e) {
    super(e), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const e = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(e);
    this._minPos = Gn(n, this.min), this._tableRange = Gn(n, this.max) - this._minPos, super.initOffsets(e);
  }
  buildLookupTable(e) {
    const { min: n, max: a } = this, o = [], s = [];
    let i, l, r, c, d;
    for (i = 0, l = e.length; i < l; ++i)
      c = e[i], c >= n && c <= a && o.push(c);
    if (o.length < 2)
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
    for (i = 0, l = o.length; i < l; ++i)
      d = o[i + 1], r = o[i - 1], c = o[i], Math.round((d + r) / 2) !== c && s.push({
        time: c,
        pos: i / (l - 1)
      });
    return s;
  }
  _generate() {
    const e = this.min, n = this.max;
    let a = super.getDataTimestamps();
    return (!a.includes(e) || !a.length) && a.splice(0, 0, e), (!a.includes(n) || a.length === 1) && a.push(n), a.sort((o, s) => o - s);
  }
  _getTimestampsForTable() {
    let e = this._cache.all || [];
    if (e.length)
      return e;
    const n = this.getDataTimestamps(), a = this.getLabelTimestamps();
    return n.length && a.length ? e = this.normalize(n.concat(a)) : e = n.length ? n : a, e = this._cache.all = e, e;
  }
  getDecimalForValue(e) {
    return (Gn(this._table, e) - this._minPos) / this._tableRange;
  }
  getValueForPixel(e) {
    const n = this._offsets, a = this.getDecimalForPixel(e) / n.factor - n.end;
    return Gn(this._table, a * this._tableRange + this._minPos, !0);
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
}, Nu = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, Wu = {
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
  ...Nu
}, ju = ul[0] === "2" ? (t, e) => Object.assign(t, {
  attrs: e
}) : (t, e) => Object.assign(t, e);
function Je(t) {
  return Ws(t) ? Fa(t) : t;
}
function Hu(t) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : t;
  return Ws(e) ? new Proxy(t, {}) : t;
}
function Yu(t, e) {
  const n = t.options;
  n && e && Object.assign(n, e);
}
function Ei(t, e) {
  t.labels = e;
}
function Ii(t, e, n) {
  const a = [];
  t.datasets = e.map((o) => {
    const s = t.datasets.find((i) => i[n] === o[n]);
    return !s || !o.data || a.includes(s) ? {
      ...o
    } : (a.push(s), Object.assign(s, o), s);
  });
}
function Ku(t, e) {
  const n = {
    labels: [],
    datasets: []
  };
  return Ei(n, t.labels), Ii(n, t.datasets, e), n;
}
const Uu = J({
  props: Wu,
  setup(t, e) {
    let { expose: n, slots: a } = e;
    const o = ot(null), s = Ns(null);
    n({
      chart: s
    });
    const i = () => {
      if (!o.value) return;
      const { type: c, data: d, options: h, plugins: p, datasetIdKey: v } = t, f = Ku(d, v), y = Hu(f, d);
      s.value = new Oe(o.value, {
        type: c,
        data: y,
        options: {
          ...h
        },
        plugins: p
      });
    }, l = () => {
      const c = Fa(s.value);
      c && (t.destroyDelay > 0 ? setTimeout(() => {
        c.destroy(), s.value = null;
      }, t.destroyDelay) : (c.destroy(), s.value = null));
    }, r = (c) => {
      c.update(t.updateMode);
    };
    return te(i), ue(l), Bt([
      () => t.options,
      () => t.data
    ], (c, d) => {
      let [h, p] = c, [v, f] = d;
      const y = Fa(s.value);
      if (!y)
        return;
      let _ = !1;
      if (h) {
        const m = Je(h), g = Je(v);
        m && m !== g && (Yu(y, m), _ = !0);
      }
      if (p) {
        const m = Je(p.labels), g = Je(f.labels), x = Je(p.datasets), w = Je(f.datasets);
        m !== g && (Ei(y.config.data, m), _ = !0), x && x !== w && (Ii(y.config.data, x, t.datasetIdKey), _ = !0);
      }
      _ && Ot(() => {
        r(y);
      });
    }, {
      deep: !0
    }), () => La("canvas", {
      role: "img",
      "aria-label": t.ariaLabel,
      "aria-describedby": t.ariaDescribedby,
      ref: o
    }, [
      La("p", {}, [
        a.default ? a.default() : ""
      ])
    ]);
  }
});
function ro(t, e) {
  return Oe.register(e), J({
    props: Pi,
    setup(n, a) {
      let { expose: o } = a;
      const s = Ns(null), i = (l) => {
        s.value = l?.chart;
      };
      return o({
        chart: s
      }), () => La(Uu, ju({
        ref: i
      }, {
        type: t,
        ...n
      }));
    }
  });
}
const qu = /* @__PURE__ */ ro("bar", Ic), Xu = /* @__PURE__ */ ro("line", Vc), Gu = /* @__PURE__ */ ro("pie", zc), Ts = {
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
}, Bs = {
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
}, Zu = [
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
function vt(t) {
  const e = ot("light");
  let n = null;
  const a = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", o = C(() => t?.value ? t.value : e.value), s = C(() => o.value === "dark"), i = C(() => s.value ? Bs : Ts), l = () => {
    typeof document > "u" || (e.value = a(), n = new MutationObserver((c) => {
      for (const d of c)
        d.attributeName === "class" && (e.value = a());
    }), n.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class"]
    }));
  }, r = () => {
    n && (n.disconnect(), n = null);
  };
  return te(() => {
    l();
  }), ue(() => {
    r();
  }), t && Bt(t, () => {
  }), {
    isDark: s,
    currentTheme: o,
    colors: i,
    detectedTheme: e,
    // Export color constants for direct access if needed
    lightColors: Ts,
    darkColors: Bs,
    chartSeriesColors: Zu
  };
}
const co = 5, uo = 8, Qu = /^x\d*$/, Ju = /^y\d*$/;
function Ri(t) {
  if (!t || typeof t != "object") return t;
  const e = { ...t }, n = e.scales;
  if (!n || typeof n != "object") return e;
  const a = { ...n };
  for (const o of Object.keys(a)) {
    const s = a[o];
    if (!s || typeof s != "object") continue;
    const i = { ...s }, l = i.ticks, r = l && typeof l == "object" ? { ...l } : {};
    Qu.test(o) && (r.maxTicksLimit = uo, r.autoSkip = !0, r.minRotation = 0, r.maxRotation = 0, r.autoSkipPadding = r.autoSkipPadding ?? 8), Ju.test(o) && (r.maxTicksLimit = co), i.ticks = r, a[o] = i;
  }
  return e.scales = a, e;
}
const Gt = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", th = ["titleFont", "bodyFont", "footerFont"];
function Oi(t, e = Gt) {
  if (!t || typeof t != "object") return t;
  const n = { ...t }, a = typeof n.font == "object" && n.font !== null ? n.font : {};
  if (n.font = { ...a, family: e }, n.scales && typeof n.scales == "object") {
    const o = { ...n.scales };
    for (const s of Object.keys(o)) {
      const i = o[s];
      if (!i || typeof i != "object") continue;
      const l = { ...i }, r = l.ticks;
      if (r && typeof r == "object") {
        const d = { ...r }, h = typeof d.font == "object" && d.font !== null ? d.font : {};
        d.font = { ...h, family: e }, l.ticks = d;
      }
      const c = l.title;
      if (c && typeof c == "object") {
        const d = { ...c }, h = typeof d.font == "object" && d.font !== null ? d.font : {};
        d.font = { ...h, family: e }, l.title = d;
      }
      o[s] = l;
    }
    n.scales = o;
  }
  if (n.plugins && typeof n.plugins == "object") {
    const o = { ...n.plugins }, s = o.legend;
    if (s && typeof s == "object") {
      const l = { ...s }, r = l.labels;
      if (r && typeof r == "object") {
        const c = { ...r }, d = typeof c.font == "object" && c.font !== null ? c.font : {};
        c.font = { ...d, family: e }, l.labels = c;
      }
      o.legend = l;
    }
    const i = o.tooltip;
    if (i && typeof i == "object") {
      const l = { ...i };
      for (const r of th) {
        const c = l[r];
        c && typeof c == "object" && (l[r] = { ...c, family: e });
      }
      o.tooltip = l;
    }
    n.plugins = o;
  }
  return n;
}
const eh = { class: "relative h-[230px] w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Ls = 10, nh = /* @__PURE__ */ J({
  __name: "ChartBar",
  props: {
    data: {},
    options: {},
    stacked: { type: Boolean },
    uppercaseLegendLabels: { type: Boolean },
    theme: {}
  },
  setup(t, { expose: e }) {
    const n = t;
    Oe.register(Li, Fi, yu, Ti, lo, io), Oe.defaults.font.family = Gt;
    const { isDark: a, colors: o } = vt(pt(n, "theme")), s = C(() => n.data), i = (d) => typeof d == "string" ? d.charAt(0).toUpperCase() + d.slice(1).toLowerCase() : d, l = (d) => typeof d != "string" ? d : n.uppercaseLegendLabels ? d.toUpperCase() : i(d);
    function r(d, h) {
      if (h == null) return d;
      if (Array.isArray(h) || typeof h != "object" || d == null || Array.isArray(d) || typeof d != "object") return h;
      const p = { ...d };
      for (const v of Object.keys(h)) {
        const f = h[v];
        f !== void 0 && (p[v] = r(d[v], f));
      }
      return p;
    }
    const c = C(() => {
      const d = {
        font: {
          family: Gt
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
                family: Gt,
                size: 13,
                weight: "500"
              },
              padding: 12,
              boxWidth: Ls,
              boxHeight: Ls,
              usePointStyle: !1,
              generateLabels: function(p) {
                return p.data.datasets.map((f, y) => {
                  const _ = Array.isArray(f.backgroundColor) ? f.backgroundColor[0] : f.backgroundColor, m = Array.isArray(f.borderColor) ? f.borderColor[0] : f.borderColor, g = typeof m == "string" && m.length > 0 ? m : typeof _ == "string" && _.length > 0 ? _ : o.value.textSecondary;
                  return {
                    text: l(f.label || ""),
                    fillStyle: typeof _ == "string" ? _ : g,
                    strokeStyle: g,
                    lineWidth: 0,
                    fontColor: g,
                    hidden: !p.isDatasetVisible(y),
                    index: y,
                    datasetIndex: y
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
              family: Gt,
              size: 13,
              weight: "600"
            },
            bodyFont: {
              family: Gt,
              size: 12,
              weight: "500"
            },
            boxPadding: 6,
            callbacks: {
              title: function(p) {
                return p.length > 0 ? String(i(p[0].label)) : "";
              },
              label: function(p) {
                let v = String(i(p.dataset.label || ""));
                return v && (v += ": "), p.parsed.y !== null && (v += p.parsed.y), v;
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
              maxTicksLimit: co,
              font: {
                family: Gt,
                size: 12,
                weight: "500"
              },
              color: o.value.textSecondary,
              padding: 8,
              callback: function(p) {
                return i(p);
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
              maxTicksLimit: uo,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: Gt,
                size: 12,
                weight: "500"
              },
              color: o.value.textSecondary,
              padding: 8,
              callback: function(p) {
                const v = this.getLabelForValue(p);
                return i(v);
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
      }, h = n.options ? r(d, n.options) : d;
      return Oi(
        Ri(h)
      );
    });
    return e({ isDark: a }), (d, h) => (b(), k("div", eh, [
      V(L(qu), {
        data: s.value,
        options: c.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), rt = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [a, o] of e)
    n[a] = o;
  return n;
}, be = /* @__PURE__ */ rt(nh, [["__scopeId", "data-v-ee7ca6f2"]]), ah = { class: "chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] min-w-0" }, oh = { class: "chart-line-canvas-host relative min-h-0 w-full flex-1" }, sh = {
  key: 0,
  class: "chart-line-indicators mt-0 flex shrink-0 list-none flex-nowrap items-center justify-center gap-x-4 overflow-x-auto overflow-y-hidden px-1 pb-0.5 pt-0.5",
  role: "list"
}, ih = ["aria-pressed", "aria-label", "onClick"], lh = {
  class: "inline-flex shrink-0 items-center",
  "aria-hidden": "true"
}, rh = /* @__PURE__ */ J({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    uppercaseLegendLabels: { type: Boolean },
    theme: {}
  },
  setup(t, { expose: e }) {
    const n = t;
    Oe.register(
      Li,
      Fi,
      fu,
      hu,
      Ti,
      lo,
      io
    ), Oe.defaults.font.family = Gt;
    const a = ot(null), { isDark: o, colors: s } = vt(pt(n, "theme")), i = C(() => s.value.bgCard), l = C(() => {
      const _ = i.value;
      return {
        labels: n.data.labels,
        datasets: n.data.datasets.map((m) => {
          const g = m.borderColor, x = Array.isArray(g) ? g[0] : g, w = typeof x == "string" && x.length > 0 ? x : s.value.textSecondary, D = m.pointBackgroundColor !== void 0 ? m.pointBackgroundColor : _, S = m.pointHoverBackgroundColor !== void 0 ? m.pointHoverBackgroundColor : D, $ = m.pointBorderWidth ?? 2, M = m.pointHoverBorderWidth ?? $;
          return {
            ...m,
            fill: m.fill ?? !1,
            pointBackgroundColor: D,
            pointHoverBackgroundColor: S,
            pointBorderColor: m.pointBorderColor ?? w,
            pointHoverBorderColor: m.pointHoverBorderColor ?? w,
            pointBorderWidth: $,
            pointHoverBorderWidth: M
          };
        })
      };
    }), r = (_) => typeof _ == "string" ? _.charAt(0).toUpperCase() + _.slice(1).toLowerCase() : _, c = (_) => typeof _ != "string" ? _ : n.uppercaseLegendLabels ? _.toUpperCase() : r(_);
    function d(_) {
      const m = _.borderColor, g = Array.isArray(m) ? m[0] : m;
      return typeof g == "string" && g.length > 0 ? g : s.value.textSecondary;
    }
    const h = C(
      () => l.value.datasets.map((_, m) => ({
        key: `${_.label ?? "dataset"}-${m}`,
        label: c(_.label || ""),
        color: d(_)
      }))
    ), p = ot([]);
    Bt(
      () => l.value.datasets.length,
      (_) => {
        const m = Array.from({ length: _ }, (g, x) => p.value[x] ?? !0);
        p.value = m;
      },
      { immediate: !0 }
    );
    function v(_) {
      const g = a.value?.chart;
      if (!g || _ < 0 || _ >= g.data.datasets.length) return;
      const x = !g.isDatasetVisible(_);
      g.setDatasetVisibility(_, x), p.value[_] = x, g.update();
    }
    function f(_, m) {
      if (m == null) return _;
      if (Array.isArray(m) || typeof m != "object" || _ == null || Array.isArray(_) || typeof _ != "object") return m;
      const g = { ..._ };
      for (const x of Object.keys(m)) {
        const w = m[x];
        w !== void 0 && (g[x] = f(_[x], w));
      }
      return g;
    }
    const y = C(() => {
      const _ = {
        font: {
          family: Gt
        },
        color: s.value.textSecondary,
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
              family: Gt,
              size: 14,
              weight: "600"
            },
            bodyFont: {
              family: Gt,
              size: 13
            },
            callbacks: {
              title: function(x) {
                return x.length > 0 ? String(r(x[0].label)) : "";
              },
              label: function(x) {
                let w = String(r(x.dataset.label || ""));
                return w && (w += ": "), x.parsed.y !== null && (w += x.parsed.y), w;
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
              maxTicksLimit: uo,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: Gt,
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
              maxTicksLimit: co,
              font: {
                family: Gt,
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
      }, m = n.options ? f(_, n.options) : _;
      return Oi(
        Ri(m)
      );
    });
    return e({ isDark: o }), (_, m) => (b(), k("div", ah, [
      u("div", oh, [
        V(L(Xu), {
          ref_key: "lineChartRef",
          ref: a,
          data: l.value,
          options: y.value
        }, null, 8, ["data", "options"])
      ]),
      h.value.length > 0 ? (b(), k("ul", sh, [
        (b(!0), k(G, null, it(h.value, (g, x) => (b(), k("li", {
          key: g.key,
          role: "listitem"
        }, [
          u("button", {
            type: "button",
            class: U(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", p.value[x] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: yt({ color: g.color }),
            "aria-pressed": p.value[x] !== !1,
            "aria-label": `${g.label}. ${p.value[x] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (w) => v(x)
          }, [
            u("span", lh, [
              m[0] || (m[0] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1)),
              u("span", {
                class: "relative z-[1] box-border size-2 shrink-0 rounded-full border-2 bg-transparent",
                style: yt({ borderColor: g.color })
              }, null, 4),
              m[1] || (m[1] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1))
            ]),
            u("span", null, A(g.label), 1)
          ], 14, ih)
        ]))), 128))
      ])) : O("", !0)
    ]));
  }
}), he = /* @__PURE__ */ rt(rh, [["__scopeId", "data-v-fc764ffb"]]), ch = { class: "chart-container" }, dh = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", uh = /* @__PURE__ */ J({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(t, { expose: e }) {
    const n = t;
    Oe.register(nu, lo, io);
    const { isDark: a, colors: o } = vt(pt(n, "theme")), s = n.data, i = (r) => typeof r == "string" ? r.charAt(0).toUpperCase() + r.slice(1).toLowerCase() : r, l = C(() => n.options ? n.options : {
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
              family: dh,
              size: 13,
              weight: 500
            },
            padding: 16,
            boxWidth: 14,
            boxHeight: 14,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "circle",
            generateLabels: function(r) {
              const c = r.data;
              return c.labels.length && c.datasets.length ? c.labels.map((d, h) => {
                const v = r.getDatasetMeta(0).controller.getStyle(h), y = c.datasets[0].data[h], _ = typeof v.backgroundColor == "string" && v.backgroundColor.length > 0 ? v.backgroundColor : o.value.textSecondary;
                return {
                  text: `${i(d)}: ${y}`,
                  fillStyle: v.backgroundColor,
                  strokeStyle: v.borderColor,
                  lineWidth: v.borderWidth,
                  lineDash: v.borderDash,
                  lineDashOffset: v.borderDashOffset,
                  lineJoin: v.borderJoinStyle,
                  fontColor: _,
                  hidden: !r.getDataVisibility(h),
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
            title: function(r) {
              return r.length > 0 ? String(i(r[0].label)) : "";
            },
            label: function(r) {
              const c = r.label || "", d = r.parsed || 0, h = r.dataset.data.reduce((v, f) => v + f, 0), p = (d / h * 100).toFixed(1);
              return `${i(c)}: ${d} (${p}%)`;
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
    return e({ isDark: a }), (r, c) => (b(), k("div", ch, [
      V(L(Gu), {
        data: L(s),
        options: l.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), pa = /* @__PURE__ */ rt(uh, [["__scopeId", "data-v-0f7806d6"]]), hh = { class: "chart-container" }, fh = ["viewBox"], gh = ["transform"], ph = ["x", "width", "fill", "stroke"], mh = ["fill"], bh = ["x1", "y1", "x2", "y2", "stroke"], vh = ["points", "fill"], yh = ["x1", "y1", "x2", "y2", "stroke"], xh = ["x", "y", "fill"], _h = ["x1", "y1", "x2", "y2", "stroke"], kh = ["points", "fill"], wh = ["transform"], Ch = ["y1", "y2"], $h = ["y1", "y2"], Mh = ["y1", "y2"], Sh = ["y1", "y2"], Dh = ["y", "height"], Ah = ["y1", "y2"], Th = ["y1", "y2"], Bh = ["y1", "y2"], Lh = ["y1", "y2"], Fh = ["y", "height"], Ph = ["cy", "stroke", "onMouseenter"], Eh = ["cy", "stroke", "onMouseenter"], Ih = ["cy", "stroke", "onMouseenter"], Rh = ["cy", "stroke", "onMouseenter"], Oh = ["y1", "y2", "onMouseenter"], Vh = ["y1", "y2", "onMouseenter"], zh = ["x", "y", "fill"], Nh = ["x", "y", "fill"], Wh = ["transform"], jh = { transform: "translate(-200, 0)" }, Hh = ["stroke"], Yh = ["fill"], Kh = { transform: "translate(-130, 0)" }, Uh = ["stroke"], qh = ["fill"], Xh = { transform: "translate(-60, 0)" }, Gh = ["stroke"], Zh = ["fill"], Qh = { transform: "translate(10, 0)" }, Jh = ["stroke"], tf = ["fill"], ef = { transform: "translate(80, 0)" }, nf = ["fill"], af = { transform: "translate(150, 0)" }, of = ["fill"], sf = /* @__PURE__ */ J({
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
  setup(t, { expose: e }) {
    const n = t, { isDark: a } = vt(pt(n, "theme")), o = C(() => ({
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
    })), s = ot({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), i = (p) => typeof p == "string" ? p.charAt(0).toUpperCase() + p.slice(1).toLowerCase() : p, l = (p, v) => {
      const f = p.currentTarget.closest("svg");
      if (!f) return;
      const y = f.getBoundingClientRect(), _ = f.createSVGPoint();
      _.x = p.clientX - y.left, _.y = p.clientY - y.top, s.value = {
        visible: !0,
        x: _.x,
        y: _.y - 20,
        text: v
      };
    }, r = (p) => {
      if (s.value.visible) {
        const v = p.currentTarget, f = v.getBoundingClientRect(), y = v.createSVGPoint();
        y.x = p.clientX - f.left, y.y = p.clientY - f.top, s.value.x = y.x, s.value.y = y.y - 20;
      }
    }, c = () => {
      s.value.visible = !1;
    }, d = () => {
      s.value.visible = !1;
    }, h = C(() => {
      const p = [], f = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let y = 1; y <= 10; y++) {
        const _ = y, m = (_ - 1) / 9, g = n.chartMargin + f - m * f;
        p.push({ value: _, y: g });
      }
      return p;
    });
    return e({ isDark: a }), (p, v) => (b(), k("div", hh, [
      (b(), k("svg", {
        viewBox: `0 0 ${t.chartWidth} ${t.chartHeight}`,
        class: "w-full boxplot-svg",
        style: yt(`min-height: ${t.chartHeight}px;`),
        onMousemove: r,
        onMouseleave: c
      }, [
        s.value.visible ? (b(), k("g", {
          key: 0,
          transform: `translate(${s.value.x}, ${s.value.y})`
        }, [
          u("rect", {
            x: -(s.value.text.length * 6 + 10),
            y: -16,
            width: s.value.text.length * 12 + 20,
            height: "24",
            fill: o.value.tooltipBg,
            rx: "6",
            stroke: o.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, ph),
          u("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: o.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, A(s.value.text), 9, mh)
        ], 8, gh)) : O("", !0),
        u("line", {
          x1: t.chartMargin,
          y1: t.chartMargin,
          x2: t.chartMargin,
          y2: t.chartHeight - t.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, bh),
        u("polygon", {
          points: `${t.chartMargin - 4},${t.chartMargin} ${t.chartMargin + 4},${t.chartMargin} ${t.chartMargin},${t.chartMargin - 10}`,
          fill: o.value.axis
        }, null, 8, vh),
        (b(!0), k(G, null, it(h.value, (f, y) => (b(), k(G, { key: y }, [
          u("line", {
            x1: t.chartMargin - 6,
            y1: f.y,
            x2: t.chartMargin,
            y2: f.y,
            stroke: o.value.tickLine,
            "stroke-width": "1"
          }, null, 8, yh),
          u("text", {
            x: t.chartMargin - 12,
            y: f.y + 4,
            "text-anchor": "end",
            fill: o.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(f.value), 9, xh)
        ], 64))), 128)),
        u("line", {
          x1: t.chartMargin,
          y1: t.chartHeight - t.chartBottomMargin,
          x2: t.chartWidth - t.chartMargin,
          y2: t.chartHeight - t.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, _h),
        u("polygon", {
          points: `${t.chartWidth - t.chartMargin},${t.chartHeight - t.chartBottomMargin - 4} ${t.chartWidth - t.chartMargin},${t.chartHeight - t.chartBottomMargin + 4} ${t.chartWidth - t.chartMargin + 10},${t.chartHeight - t.chartBottomMargin}`,
          fill: o.value.axis
        }, null, 8, kh),
        (b(!0), k(G, null, it(t.boxplotData, (f, y) => (b(), k(G, { key: y }, [
          u("g", {
            transform: `translate(${f.centerX}, 0)`
          }, [
            f.isTotal ? (b(), k(G, { key: 0 }, [
              u("line", {
                x1: 0,
                y1: f.minY,
                x2: 0,
                y2: f.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Ch),
              u("line", {
                x1: 0,
                y1: f.q3Y,
                x2: 0,
                y2: f.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, $h),
              u("line", {
                x1: -18,
                y1: f.minY,
                x2: 18,
                y2: f.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Mh),
              u("line", {
                x1: -18,
                y1: f.maxY,
                x2: 18,
                y2: f.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Sh),
              u("rect", {
                x: -24,
                y: f.q3Y,
                width: "48",
                height: f.q1Y - f.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, Dh)
            ], 64)) : (b(), k(G, { key: 1 }, [
              u("line", {
                x1: 0,
                y1: f.minY,
                x2: 0,
                y2: f.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Ah),
              u("line", {
                x1: 0,
                y1: f.q3Y,
                x2: 0,
                y2: f.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Th),
              u("line", {
                x1: -18,
                y1: f.minY,
                x2: 18,
                y2: f.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Bh),
              u("line", {
                x1: -18,
                y1: f.maxY,
                x2: 18,
                y2: f.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Lh),
              u("rect", {
                x: -24,
                y: f.q3Y,
                width: "48",
                height: f.q1Y - f.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, Fh)
            ], 64)),
            u("circle", {
              cx: 0,
              cy: f.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (_) => l(_, `Min: ${f.min.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Ph),
            u("circle", {
              cx: 0,
              cy: f.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (_) => l(_, `Q1: ${f.q1.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Eh),
            u("circle", {
              cx: 0,
              cy: f.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (_) => l(_, `Q3: ${f.q3.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Ih),
            u("circle", {
              cx: 0,
              cy: f.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (_) => l(_, `Max: ${f.max.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Rh),
            u("line", {
              x1: -24,
              y1: f.medianY,
              x2: 24,
              y2: f.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (_) => l(_, `Median: ${f.median.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Oh),
            f.averageY ? (b(), k("line", {
              key: 2,
              x1: -24,
              y1: f.averageY,
              x2: 24,
              y2: f.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (_) => l(_, `Avg: ${f.average.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Vh)) : O("", !0)
          ], 8, wh),
          u("text", {
            x: f.centerX,
            y: t.chartHeight - t.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: o.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(i(f.label)), 9, zh),
          f.responseCount ? (b(), k("text", {
            key: 0,
            x: f.centerX,
            y: t.chartHeight - t.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: o.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(f.responseCount), 9, Nh)) : O("", !0)
        ], 64))), 128)),
        t.showLegend ? (b(), k("g", {
          key: 1,
          transform: `translate(${t.chartWidth / 2}, ${t.chartMargin - 35})`
        }, [
          u("g", jh, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Hh),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Yh)
          ]),
          u("g", Kh, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Uh),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, qh)
          ]),
          u("g", Xh, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Gh),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Zh)
          ]),
          u("g", Qh, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Jh),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, tf)
          ]),
          u("g", ef, [
            v[0] || (v[0] = u("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#f97316",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            u("text", {
              x: "18",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, nf)
          ]),
          u("g", af, [
            v[1] || (v[1] = u("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "2.5"
            }, null, -1)),
            u("text", {
              x: "18",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, of)
          ])
        ], 8, Wh)) : O("", !0)
      ], 44, fh))
    ]));
  }
}), lf = /* @__PURE__ */ rt(sf, [["__scopeId", "data-v-9ac5c075"]]), rf = { class: "chart-container" }, cf = ["viewBox"], df = ["x1", "y1", "x2", "y2", "stroke"], uf = ["points", "fill"], hf = ["x1", "y1", "x2", "y2", "stroke"], ff = ["x1", "y1", "x2", "y2", "stroke"], gf = ["x", "y", "fill"], pf = ["x", "y", "fill", "transform"], mf = ["x1", "y1", "x2", "y2", "stroke"], bf = ["points", "fill"], vf = ["transform"], yf = ["y1", "y2", "stroke", "onMouseenter"], xf = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], _f = ["x1", "y1", "x2", "y2", "onMouseenter"], kf = ["x1", "y1", "x2", "y2", "onMouseenter"], wf = ["cy", "stroke", "onMouseenter"], Cf = ["cy", "stroke", "onMouseenter"], $f = ["x", "y", "fill"], Mf = ["x", "y", "fill"], Sf = ["transform"], Df = { transform: "translate(-180, 0)" }, Af = ["stroke"], Tf = ["fill"], Bf = { transform: "translate(-120, 0)" }, Lf = ["fill"], Ff = { transform: "translate(-60, 0)" }, Pf = ["fill"], Ef = { transform: "translate(0, 0)" }, If = ["stroke"], Rf = ["fill"], Of = { transform: "translate(60, 0)" }, Vf = ["fill"], zf = { transform: "translate(130, 0)" }, Nf = ["fill"], Wf = ["transform"], jf = ["x", "y", "width", "height", "fill", "stroke"], Hf = ["y", "fill"], Yf = ["y", "fill"], Zn = 10, Kf = 14, Da = 13, Fs = 4, Ps = 12, Uf = /* @__PURE__ */ J({
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
  setup(t, { expose: e }) {
    const n = t, { isDark: a, colors: o } = vt(pt(n, "theme")), s = Zn + Da + Fs + Ps + Zn, i = C(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(g, x, w) {
      const D = w ? 0.6 : 0.535;
      return Math.ceil(Math.max(g, 1) * x * D);
    }
    function r(g, x) {
      return Math.max(
        l(g.length, Da, !0),
        l(x.length, Ps, !1),
        52
      ) + Kf * 2;
    }
    function c(g, x, w, D) {
      const S = w / 2, $ = 6, M = Math.min(
        Math.max(g, S + $),
        n.chartWidth - S - $
      ), F = $ + D + 10, T = n.chartHeight - $ + 10, B = Math.min(Math.max(x, F), T);
      return { x: M, y: B };
    }
    const d = C(() => ({
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
    })), h = ot({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), p = (g) => typeof g == "string" ? g.charAt(0).toUpperCase() + g.slice(1).toLowerCase() : g, v = (g, x, w) => {
      const D = g.currentTarget.closest("svg");
      if (!D) return;
      const S = D.getBoundingClientRect(), $ = D.createSVGPoint();
      $.x = g.clientX - S.left, $.y = g.clientY - S.top;
      let M = p(x.label), F = "";
      switch (w) {
        case "body":
          F = `Q1: ${x.q1.toFixed(1)} | Q3: ${x.q3.toFixed(1)}`;
          break;
        case "wick":
          F = `Min: ${x.low.toFixed(1)} | Max: ${x.high.toFixed(1)}`;
          break;
        case "median":
          F = `Median: ${x.median.toFixed(1)}`;
          break;
        case "average":
          F = `Average: ${x.average?.toFixed(1) ?? ""}`;
          break;
        case "min":
          F = `Min: ${x.low.toFixed(1)}`;
          break;
        case "max":
          F = `Max: ${x.high.toFixed(1)}`;
          break;
      }
      const T = r(M, F), B = s;
      let P = $.x, E = $.y - 20;
      const N = c(P, E, T, B);
      P = N.x, E = N.y, h.value = {
        visible: !0,
        x: P,
        y: E,
        title: M,
        text: F,
        width: T,
        height: B
      };
    }, f = (g) => {
      if (h.value.visible) {
        const x = g.currentTarget, w = x.getBoundingClientRect(), D = x.createSVGPoint();
        D.x = g.clientX - w.left, D.y = g.clientY - w.top;
        let S = D.x, $ = D.y - 20;
        const M = c(S, $, h.value.width, h.value.height);
        h.value.x = M.x, h.value.y = M.y;
      }
    }, y = () => {
      h.value.visible = !1;
    }, _ = () => {
      h.value.visible = !1;
    }, m = C(() => {
      const g = [], w = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let D = 1; D <= 10; D++) {
        const S = D, $ = (S - 1) / 9, M = n.chartMargin + w - $ * w;
        g.push({ value: S, y: M });
      }
      return g;
    });
    return e({ isDark: a }), (g, x) => (b(), k("div", rf, [
      (b(), k("svg", {
        viewBox: `0 0 ${t.chartWidth} ${t.chartHeight}`,
        class: "candlestick-svg",
        style: yt(`min-height: ${t.chartHeight}px; min-width: ${t.chartWidth}px;`),
        onMousemove: f,
        onMouseleave: y
      }, [
        x[4] || (x[4] = u("defs", null, [
          u("filter", {
            id: "candlestick-tooltip-shadow",
            x: "-50%",
            y: "-50%",
            width: "200%",
            height: "200%"
          }, [
            u("feDropShadow", {
              dx: "0",
              dy: "2",
              stdDeviation: "5",
              "flood-color": "#000000",
              "flood-opacity": "0.3"
            })
          ])
        ], -1)),
        u("line", {
          x1: t.chartMargin,
          y1: t.chartMargin,
          x2: t.chartMargin,
          y2: t.chartHeight - t.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, df),
        u("polygon", {
          points: `${t.chartMargin - 4},${t.chartMargin} ${t.chartMargin + 4},${t.chartMargin} ${t.chartMargin},${t.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, uf),
        (b(!0), k(G, null, it(m.value, (w, D) => (b(), k("line", {
          key: `grid-${D}`,
          x1: t.chartMargin,
          y1: w.y,
          x2: t.chartWidth - t.chartMargin,
          y2: w.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, hf))), 128)),
        (b(!0), k(G, null, it(m.value, (w, D) => (b(), k(G, { key: D }, [
          u("line", {
            x1: t.chartMargin - 6,
            y1: w.y,
            x2: t.chartMargin,
            y2: w.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, ff),
          u("text", {
            x: t.chartMargin - 12,
            y: w.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(w.value), 9, gf)
        ], 64))), 128)),
        u("text", {
          x: t.chartMargin - 35,
          y: t.chartHeight / 2,
          "text-anchor": "middle",
          fill: d.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${t.chartMargin - 35}, ${t.chartHeight / 2})`
        }, A(p(t.yAxisLabel)), 9, pf),
        u("line", {
          x1: t.chartMargin,
          y1: t.chartHeight - t.chartBottomMargin,
          x2: t.chartWidth - t.chartMargin,
          y2: t.chartHeight - t.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, mf),
        u("polygon", {
          points: `${t.chartWidth - t.chartMargin},${t.chartHeight - t.chartBottomMargin - 4} ${t.chartWidth - t.chartMargin},${t.chartHeight - t.chartBottomMargin + 4} ${t.chartWidth - t.chartMargin + 10},${t.chartHeight - t.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, bf),
        (b(!0), k(G, null, it(t.candlestickData, (w, D) => (b(), k(G, { key: D }, [
          u("g", {
            transform: `translate(${w.centerX}, 0)`
          }, [
            u("line", {
              x1: 0,
              y1: w.highY,
              x2: 0,
              y2: w.lowY,
              stroke: w.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "hover-line",
              onMouseenter: (S) => v(S, w, "wick"),
              onMouseleave: _,
              style: { cursor: "pointer" }
            }, null, 40, yf),
            u("rect", {
              x: -t.candleWidth / 2,
              y: Math.min(w.q1Y, w.q3Y) - (Math.abs(w.q3Y - w.q1Y) < 4 ? 4 : 0),
              width: t.candleWidth,
              height: Math.max(8, Math.abs(w.q3Y - w.q1Y)),
              fill: w.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: w.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (S) => v(S, w, "body"),
              onMouseleave: _,
              style: { cursor: "pointer" }
            }, null, 40, xf),
            w.medianY ? (b(), k("line", {
              key: 0,
              x1: -t.candleWidth / 2,
              y1: w.medianY,
              x2: t.candleWidth / 2,
              y2: w.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (S) => v(S, w, "median"),
              onMouseleave: _,
              style: { cursor: "pointer" }
            }, null, 40, _f)) : O("", !0),
            w.averageY ? (b(), k("line", {
              key: 1,
              x1: -t.candleWidth / 2,
              y1: w.averageY,
              x2: t.candleWidth / 2,
              y2: w.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (S) => v(S, w, "average"),
              onMouseleave: _,
              style: { cursor: "pointer" }
            }, null, 40, kf)) : O("", !0),
            u("circle", {
              cx: 0,
              cy: w.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (S) => v(S, w, "min"),
              onMouseleave: _,
              style: { cursor: "pointer" }
            }, null, 40, wf),
            u("circle", {
              cx: 0,
              cy: w.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (S) => v(S, w, "max"),
              onMouseleave: _,
              style: { cursor: "pointer" }
            }, null, 40, Cf)
          ], 8, vf),
          u("text", {
            x: w.centerX,
            y: t.chartHeight - t.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(p(w.label)), 9, $f),
          w.responseCount ? (b(), k("text", {
            key: 0,
            x: w.centerX,
            y: t.chartHeight - t.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: d.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(w.responseCount), 9, Mf)) : O("", !0)
        ], 64))), 128)),
        t.showLegend ? (b(), k("g", {
          key: 0,
          transform: `translate(${t.chartWidth / 2}, ${t.chartMargin - 35})`
        }, [
          u("g", Df, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: d.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Af),
            u("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Tf)
          ]),
          u("g", Bf, [
            x[0] || (x[0] = u("rect", {
              x: "-6",
              y: "-6",
              width: "12",
              height: "12",
              fill: "rgba(198, 125, 255, 0.15)",
              stroke: "#C67DFF",
              "stroke-width": "1.5",
              rx: "2"
            }, null, -1)),
            u("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Lf)
          ]),
          u("g", Ff, [
            x[1] || (x[1] = u("rect", {
              x: "-6",
              y: "-6",
              width: "12",
              height: "12",
              fill: "rgba(198, 125, 255, 0.15)",
              stroke: "#C67DFF",
              "stroke-width": "1.5",
              rx: "2"
            }, null, -1)),
            u("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Pf)
          ]),
          u("g", Ef, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: d.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, If),
            u("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Rf)
          ]),
          u("g", Of, [
            x[2] || (x[2] = u("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#f97316",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            u("text", {
              x: "18",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, Vf)
          ]),
          u("g", zf, [
            x[3] || (x[3] = u("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "2.5"
            }, null, -1)),
            u("text", {
              x: "18",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, Nf)
          ])
        ], 8, Sf)) : O("", !0),
        h.value.visible ? (b(), k("g", {
          key: 1,
          "pointer-events": "none",
          transform: `translate(${h.value.x}, ${h.value.y})`
        }, [
          u("rect", {
            filter: "url(#candlestick-tooltip-shadow)",
            x: -h.value.width / 2,
            y: -h.value.height - 10,
            width: h.value.width,
            height: h.value.height,
            fill: i.value.bg,
            rx: "8",
            stroke: i.value.border,
            "stroke-width": "1"
          }, null, 8, jf),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + Zn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.title), 9, Hf),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + Zn + Da + Fs,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.text), 9, Yf)
        ], 8, Wf)) : O("", !0)
      ], 44, cf))
    ]));
  }
}), qf = /* @__PURE__ */ rt(Uf, [["__scopeId", "data-v-22efd66d"]]), Xf = ["viewBox"], Gf = ["x1", "y1", "x2", "y2", "stroke"], Zf = ["x1", "y1", "x2", "y2", "stroke"], Qf = ["points", "fill"], Jf = ["x1", "y1", "x2", "y2", "stroke"], tg = ["x", "y", "fill"], eg = ["x", "y", "fill", "transform"], ng = ["x1", "y1", "x2", "y2", "stroke"], ag = ["points", "fill"], og = ["x1", "y1", "x2", "y2", "stroke"], sg = ["x", "y", "fill"], ig = ["x", "y", "fill"], lg = ["d"], rg = ["x", "y", "width", "height", "onMouseenter"], cg = ["x1", "y1", "x2", "y2"], dg = ["x", "y"], ug = ["x1", "y1", "x2", "y2"], hg = ["x", "y"], fg = ["x1", "y1", "x2", "y2"], gg = ["x", "y"], pg = ["x1", "y1", "x2", "y2"], mg = ["x", "y"], bg = ["x1", "y1", "x2", "y2"], vg = ["x", "y"], yg = ["x1", "y1", "x2", "y2"], xg = ["x", "y"], _g = ["transform"], kg = { transform: "translate(-220, 0)" }, wg = ["fill"], Cg = { transform: "translate(-140, 0)" }, $g = ["fill"], Mg = { transform: "translate(-80, 0)" }, Sg = ["fill"], Dg = { transform: "translate(-20, 0)" }, Ag = ["fill"], Tg = { transform: "translate(60, 0)" }, Bg = ["fill"], Lg = { transform: "translate(130, 0)" }, Fg = ["fill"], Pg = { transform: "translate(180, 0)" }, Eg = ["fill"], Ig = ["transform"], Rg = ["x", "y", "width", "height", "fill", "stroke"], Og = ["y", "fill"], Vg = ["y", "fill"], Qn = 10, zg = 14, Aa = 13, Es = 12, Is = 4, Ng = /* @__PURE__ */ J({
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
  setup(t, { expose: e }) {
    const n = t, { isDark: a, colors: o } = vt(pt(n, "theme")), s = Qn + Aa + Is + Es + Qn, i = C(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(j, et, nt) {
      const dt = nt ? 0.6 : 0.535;
      return Math.ceil(Math.max(j, 1) * et * dt);
    }
    function r(j, et) {
      return Math.max(
        l(j.length, Aa, !0),
        l(et.length, Es, !1),
        52
      ) + zg * 2;
    }
    function c(j, et, nt, dt) {
      const mt = nt / 2, bt = 6, At = Math.min(
        Math.max(j, mt + bt),
        n.chartWidth - mt - bt
      ), Nt = bt + dt + 10, Et = n.chartHeight - bt + 10, R = Math.min(Math.max(et, Nt), Et);
      return { x: At, y: R };
    }
    const d = C(() => ({
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
    })), h = ot({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0,
      /** Centro SVG X de la barra activa; fija tooltip horizontal sobre la columna correcta cuando el SVG escala por CSS */
      anchorX: null
    }), p = C(() => n.chartWidth - n.chartMargin * 2), v = C(() => n.chartHeight - n.chartMargin - n.chartBottomMargin), f = C(() => p.value / 10 * 0.6), y = C(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const j = Math.max(...n.histogram.map((nt) => nt.count || 0), 1), et = Math.max(1, Math.ceil(j * 0.2));
      return j + et;
    }), _ = C(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const j = n.averageScore || 0;
      let et = 0, nt = 0;
      if (n.histogram.forEach((mt) => {
        const bt = mt.count || 0;
        et += bt;
        const At = mt.score - j;
        nt += bt * (At * At);
      }), et === 0) return 1;
      const dt = nt / et;
      return Math.sqrt(dt) || 1;
    }), m = (j, et, nt) => {
      if (nt === 0) return 0;
      const dt = 1 / (nt * Math.sqrt(2 * Math.PI)), mt = -0.5 * Math.pow((j - et) / nt, 2);
      return dt * Math.exp(mt);
    }, g = C(() => {
      if (!n.histogram || n.histogram.length === 0 || n.averageScore === 0 && _.value === 0) return null;
      const j = n.averageScore, et = _.value, nt = 100, mt = Math.max(...n.histogram.map((Et) => Et.count || 0), 1) / y.value * v.value;
      if (mt <= 0) return null;
      let bt = 0;
      for (let Et = 0; Et <= nt; Et++) {
        const R = 1 + 9 * (Et / nt), H = m(R, j, et);
        H > bt && (bt = H);
      }
      if (bt <= 0) return null;
      const At = mt / bt, Nt = [];
      for (let Et = 0; Et <= nt; Et++) {
        const R = 1 + 9 * (Et / nt), H = m(R, j, et) * At, at = w(R);
        if (at !== null) {
          const ft = n.chartHeight - n.chartBottomMargin - H;
          Nt.push(`${Et === 0 ? "M" : "L"} ${at} ${ft}`);
        }
      }
      return Nt.join(" ");
    }), x = C(() => {
      if (!n.histogram || n.histogram.length === 0) return [];
      const j = p.value / 10;
      return n.histogram.map((et, nt) => {
        const dt = n.chartMargin + (nt + 0.5) * j, mt = et.count > 0 ? et.count / y.value * v.value : 0, bt = n.chartHeight - n.chartBottomMargin - mt;
        return {
          score: et.score,
          count: et.count,
          x: dt,
          y: bt,
          height: mt
        };
      });
    }), w = (j) => {
      if (j < 1 || j > 10) return null;
      const et = p.value / 10;
      return n.chartMargin + (j - 0.5) * et;
    }, D = C(() => w(n.minScore)), S = C(() => w(n.maxScore)), $ = C(() => w(n.q1Score)), M = C(() => w(n.medianScore)), F = C(() => w(n.q3Score)), T = C(() => w(n.averageScore)), B = C(() => n.minScore), P = C(() => n.maxScore), E = C(() => n.q1Score), N = C(() => n.medianScore), Y = C(() => n.q3Score), W = C(() => n.averageScore), Q = C(() => {
      const j = [], et = n.chartMargin - 8, nt = 18;
      $.value !== null && j.push({
        x: $.value,
        y: et,
        value: n.q1Score,
        label: `Q1: ${E.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), M.value !== null && j.push({
        x: M.value,
        y: et - nt,
        value: n.medianScore,
        label: `Median: ${N.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), T.value !== null && j.push({
        x: T.value,
        y: et - nt,
        value: n.averageScore,
        label: `Avg: ${W.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), F.value !== null && j.push({
        x: F.value,
        y: et,
        value: n.q3Score,
        label: `Q3: ${Y.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), j.sort((bt, At) => (bt.x || 0) - (At.x || 0));
      const dt = [[], [], []];
      j.forEach((bt) => {
        if (bt.x === null) return;
        let At = -1;
        for (let Nt = 0; Nt < dt.length; Nt++) {
          let Et = !1;
          for (const R of dt[Nt]) {
            if (R.x === null) continue;
            const H = Math.abs(bt.x - R.x), at = (bt.width + R.width) / 2 + 10;
            if (H < at) {
              Et = !0;
              break;
            }
          }
          if (!Et) {
            At = Nt;
            break;
          }
        }
        At === -1 && (At = dt.length - 1), bt.y = et - At * nt, dt[At].push(bt);
      });
      const mt = 15;
      return j.forEach((bt) => {
        bt.y < mt && (bt.y = mt);
      }), j;
    }), tt = (j) => Q.value.find((nt) => nt.id === j)?.y || n.chartMargin - 10, ct = C(() => {
      const j = [];
      for (let nt = 0; nt <= 5; nt++) {
        const dt = Math.round(y.value / 5 * nt), mt = n.chartHeight - n.chartBottomMargin - nt / 5 * v.value;
        j.push({ value: dt, y: mt });
      }
      return j;
    });
    function z(j, et, nt) {
      const dt = j.createSVGPoint();
      dt.x = et, dt.y = nt;
      const mt = j.getScreenCTM();
      if (!mt) {
        const At = j.getBoundingClientRect();
        return { x: et - At.left, y: nt - At.top };
      }
      const bt = dt.matrixTransform(mt.inverse());
      return { x: bt.x, y: bt.y };
    }
    const K = (j, et) => {
      n.interactive && lt(j, et);
    }, X = () => {
      n.interactive && xt();
    }, lt = (j, et) => {
      const nt = j.currentTarget.closest("svg");
      if (!nt) return;
      const { x: dt, y: mt } = z(nt, j.clientX, j.clientY), bt = `Score: ${et.score}`, At = `Count: ${Number(et.count ?? 0).toLocaleString()}`, Nt = r(bt, At), Et = s, R = typeof et?.x == "number" ? et.x : dt;
      let H = mt - 20;
      const at = c(R, H, Nt, Et);
      h.value = {
        visible: !0,
        x: at.x,
        y: at.y,
        title: bt,
        text: At,
        width: Nt,
        height: Et,
        anchorX: typeof et?.x == "number" ? et.x : null
      };
    }, st = (j) => {
      if (n.interactive && h.value.visible) {
        const et = j.currentTarget, { x: nt, y: dt } = z(et, j.clientX, j.clientY), mt = h.value.anchorX, bt = mt != null && Number.isFinite(mt) ? mt : nt;
        let At = dt - 20;
        const Nt = c(bt, At, h.value.width, h.value.height);
        h.value.x = Nt.x, h.value.y = Nt.y;
      }
    }, Dt = () => {
      xt();
    }, xt = () => {
      h.value.visible = !1, h.value.anchorX = null;
    };
    return e({ isDark: a }), (j, et) => (b(), k("div", {
      class: U(["chart-container", { "chart-container--static": !t.interactive }])
    }, [
      (b(), k("svg", {
        viewBox: `0 0 ${t.chartWidth} ${t.chartHeight}`,
        class: "w-full histogram-svg",
        style: yt(`min-height: ${t.chartHeight}px;`),
        onMousemove: st,
        onMouseleave: Dt
      }, [
        et[7] || (et[7] = u("defs", null, [
          u("filter", {
            id: "histogram-tooltip-shadow",
            x: "-50%",
            y: "-50%",
            width: "200%",
            height: "200%"
          }, [
            u("feDropShadow", {
              dx: "0",
              dy: "2",
              stdDeviation: "5",
              "flood-color": "#000000",
              "flood-opacity": "0.3"
            })
          ])
        ], -1)),
        (b(!0), k(G, null, it(ct.value, (nt, dt) => (b(), k("line", {
          key: `grid-${dt}`,
          x1: t.chartMargin,
          y1: nt.y,
          x2: t.chartWidth - t.chartMargin,
          y2: nt.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Gf))), 128)),
        u("line", {
          x1: t.chartMargin,
          y1: t.chartMargin,
          x2: t.chartMargin,
          y2: t.chartHeight - t.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, Zf),
        u("polygon", {
          points: `${t.chartMargin - 4},${t.chartMargin} ${t.chartMargin + 4},${t.chartMargin} ${t.chartMargin},${t.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, Qf),
        (b(!0), k(G, null, it(ct.value, (nt, dt) => (b(), k(G, {
          key: `y-tick-${dt}`
        }, [
          u("line", {
            x1: t.chartMargin - 6,
            y1: nt.y,
            x2: t.chartMargin,
            y2: nt.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Jf),
          u("text", {
            x: t.chartMargin - 12,
            y: nt.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(nt.value), 9, tg)
        ], 64))), 128)),
        u("text", {
          x: t.chartMargin - 35,
          y: t.chartHeight / 2,
          "text-anchor": "middle",
          fill: d.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${t.chartMargin - 35}, ${t.chartHeight / 2})`
        }, " Count ", 8, eg),
        u("line", {
          x1: t.chartMargin,
          y1: t.chartHeight - t.chartBottomMargin,
          x2: t.chartWidth - t.chartMargin,
          y2: t.chartHeight - t.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, ng),
        u("polygon", {
          points: `${t.chartWidth - t.chartMargin},${t.chartHeight - t.chartBottomMargin - 4} ${t.chartWidth - t.chartMargin},${t.chartHeight - t.chartBottomMargin + 4} ${t.chartWidth - t.chartMargin + 10},${t.chartHeight - t.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, ag),
        (b(!0), k(G, null, it(x.value, (nt, dt) => (b(), k(G, {
          key: `tick-${dt}`
        }, [
          u("line", {
            x1: nt.x,
            y1: t.chartHeight - t.chartBottomMargin,
            x2: nt.x,
            y2: t.chartHeight - t.chartBottomMargin + 5,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, og),
          u("text", {
            x: nt.x,
            y: t.chartHeight - t.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(nt.score), 9, sg)
        ], 64))), 128)),
        u("text", {
          x: t.chartWidth / 2,
          y: t.chartHeight - t.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: d.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, ig),
        g.value ? (b(), k("path", {
          key: 0,
          d: g.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, lg)) : O("", !0),
        (b(!0), k(G, null, it(x.value, (nt, dt) => (b(), k("rect", {
          key: `bar-${dt}`,
          x: nt.x - f.value / 2,
          y: nt.y,
          width: f.value,
          height: nt.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (mt) => K(mt, nt),
          onMouseleave: X,
          style: yt({ cursor: t.interactive ? "pointer" : "default" })
        }, null, 44, rg))), 128)),
        D.value ? (b(), k("line", {
          key: 1,
          x1: D.value,
          y1: t.chartMargin,
          x2: D.value,
          y2: t.chartHeight - t.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, cg)) : O("", !0),
        D.value ? (b(), k("text", {
          key: 2,
          x: D.value,
          y: t.chartHeight - t.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + A(B.value.toFixed(1)), 9, dg)) : O("", !0),
        $.value ? (b(), k("line", {
          key: 3,
          x1: $.value,
          y1: t.chartMargin,
          x2: $.value,
          y2: t.chartHeight - t.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, ug)) : O("", !0),
        $.value ? (b(), k("text", {
          key: 4,
          x: $.value,
          y: tt("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + A(E.value.toFixed(1)), 9, hg)) : O("", !0),
        M.value ? (b(), k("line", {
          key: 5,
          x1: M.value,
          y1: t.chartMargin,
          x2: M.value,
          y2: t.chartHeight - t.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, fg)) : O("", !0),
        M.value ? (b(), k("text", {
          key: 6,
          x: M.value,
          y: tt("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + A(N.value.toFixed(1)), 9, gg)) : O("", !0),
        T.value ? (b(), k("line", {
          key: 7,
          x1: T.value,
          y1: t.chartMargin,
          x2: T.value,
          y2: t.chartHeight - t.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, pg)) : O("", !0),
        T.value ? (b(), k("text", {
          key: 8,
          x: T.value,
          y: tt("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + A(W.value.toFixed(1)), 9, mg)) : O("", !0),
        F.value ? (b(), k("line", {
          key: 9,
          x1: F.value,
          y1: t.chartMargin,
          x2: F.value,
          y2: t.chartHeight - t.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, bg)) : O("", !0),
        F.value ? (b(), k("text", {
          key: 10,
          x: F.value,
          y: tt("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + A(Y.value.toFixed(1)), 9, vg)) : O("", !0),
        S.value ? (b(), k("line", {
          key: 11,
          x1: S.value,
          y1: t.chartMargin,
          x2: S.value,
          y2: t.chartHeight - t.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, yg)) : O("", !0),
        S.value ? (b(), k("text", {
          key: 12,
          x: S.value,
          y: t.chartHeight - t.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + A(P.value.toFixed(1)), 9, xg)) : O("", !0),
        t.showLegend ? (b(), k("g", {
          key: 13,
          transform: `translate(${t.chartWidth / 2}, ${t.chartMargin - 50})`
        }, [
          u("g", kg, [
            et[0] || (et[0] = u("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "2.5"
            }, null, -1)),
            u("text", {
              x: "24",
              y: "4",
              fill: d.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Gaussian ", 8, wg)
          ]),
          u("g", Cg, [
            et[1] || (et[1] = u("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#5d4b93",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            u("text", {
              x: "24",
              y: "4",
              fill: d.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, $g)
          ]),
          u("g", Mg, [
            et[2] || (et[2] = u("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#a855f7",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            u("text", {
              x: "24",
              y: "4",
              fill: d.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Sg)
          ]),
          u("g", Dg, [
            et[3] || (et[3] = u("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "3",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            u("text", {
              x: "24",
              y: "4",
              fill: d.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, Ag)
          ]),
          u("g", Tg, [
            et[4] || (et[4] = u("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            u("text", {
              x: "24",
              y: "4",
              fill: d.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, Bg)
          ]),
          u("g", Lg, [
            et[5] || (et[5] = u("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#7c3aed",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            u("text", {
              x: "24",
              y: "4",
              fill: d.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Fg)
          ]),
          u("g", Pg, [
            et[6] || (et[6] = u("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#C67DFF",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            u("text", {
              x: "24",
              y: "4",
              fill: d.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Eg)
          ])
        ], 8, _g)) : O("", !0),
        t.interactive && h.value.visible ? (b(), k("g", {
          key: 14,
          "pointer-events": "none",
          transform: `translate(${h.value.x}, ${h.value.y})`
        }, [
          u("rect", {
            filter: "url(#histogram-tooltip-shadow)",
            x: -h.value.width / 2,
            y: -h.value.height - 10,
            width: h.value.width,
            height: h.value.height,
            fill: i.value.bg,
            rx: "8",
            stroke: i.value.border,
            "stroke-width": "1"
          }, null, 8, Rg),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + Qn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.title), 9, Og),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + Qn + Aa + Is,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.text), 9, Vg)
        ], 8, Ig)) : O("", !0)
      ], 44, Xf))
    ], 2));
  }
}), Vi = /* @__PURE__ */ rt(Ng, [["__scopeId", "data-v-a1e39e34"]]), Wg = 639, zi = 1024;
function Rs(t) {
  return t < 640 ? "mobile" : t <= zi ? "tablet" : "desktop";
}
function jg() {
  const t = ot(
    typeof window > "u" ? "desktop" : Rs(window.innerWidth)
  ), e = () => {
    typeof window > "u" || (t.value = Rs(window.innerWidth));
  };
  let n = null, a = null, o = null, s = null;
  te(() => {
    typeof window > "u" || (e(), n = window.matchMedia(`(max-width: ${Wg}px)`), a = window.matchMedia(`(min-width: 640px) and (max-width: ${zi}px)`), o = window.matchMedia("(min-width: 1025px)"), s = () => {
      e();
    }, n.addEventListener("change", s), a.addEventListener("change", s), o.addEventListener("change", s));
  }), ue(() => {
    !s || !n || !a || !o || (n.removeEventListener("change", s), a.removeEventListener("change", s), o.removeEventListener("change", s));
  });
  const i = C(() => t.value === "mobile"), l = C(() => t.value === "tablet"), r = C(() => t.value === "desktop");
  return {
    breakpoint: t,
    isMobile: i,
    isTablet: l,
    isDesktop: r
  };
}
const Hg = { class: "chart-container" }, Yg = {
  key: 1,
  class: "chart-wrapper"
}, Kg = /* @__PURE__ */ J({
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
  setup(t, { expose: e }) {
    po.use([gl, pl, ml, bl]);
    const n = t, { isDark: a, colors: o } = vt(pt(n, "theme")), { breakpoint: s } = jg(), i = ot(null), l = ot(!0), r = ot(!1);
    let c = null;
    const d = {
      animation: { duration: 1e3, easing: "cubicOut" },
      margins: { left: "2%", right: "2%", top: "2%", bottom: "2%" },
      node: { width: 70, gap: 20, align: "left", iterations: 64 },
      style: {
        shadowBlur: 4,
        shadowColor: "rgba(139, 92, 246, 0.15)"
      }
    }, h = C(() => {
      const S = s.value;
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
        contentMargins: { ...d.margins }
      } : {
        orient: "horizontal",
        nodeWidth: d.node.width,
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
        contentMargins: { ...d.margins }
      };
    }), p = (S, $) => {
      const M = S.trim();
      if (!M || $ < 1) return S;
      if (M.length <= $) return M;
      const F = [];
      let T = 0;
      for (; T < M.length; ) {
        const B = Math.min(T + $, M.length);
        if (B >= M.length) {
          const N = M.slice(T).trim();
          N && F.push(N);
          break;
        }
        const P = M.slice(T, B), E = P.lastIndexOf(" ");
        if (E > 0)
          for (F.push(M.slice(T, T + E).trim()), T += E; T < M.length && M[T] === " "; ) T += 1;
        else
          F.push(P), T = B;
      }
      return F.join(`
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
      const S = n.data.links.filter(
        (T) => T.source && T.target && typeof T.value == "number"
      ), $ = Math.max(...S.map((T) => T.value), 1), M = Math.max(1, $ * 0.01), F = S.map((T) => ({
        ...T,
        originalValue: T.value,
        value: T.value < $ * 0.01 ? M : T.value
      }));
      return {
        nodes: n.data.nodes.filter((T) => T.name),
        links: F
      };
    }, y = (S) => S.map(($, M) => ({
      ...$,
      itemStyle: {
        color: n.nodeColors[$.name] || v[M % v.length],
        borderRadius: 8
      }
    })), _ = (S) => ($) => {
      const M = $.dataType === "node", F = o.value.tooltipText, T = a.value ? "#d1d5db" : "#e2e8f0";
      if (M) {
        const Y = S.filter((tt) => tt.target === $.name), W = S.filter((tt) => tt.source === $.name), Q = Y.length > 0 ? Y.reduce((tt, ct) => tt + (ct.originalValue || ct.value), 0) : W.reduce((tt, ct) => tt + (ct.originalValue || ct.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${F};">${$.name}</div><div style="color: ${T}; font-size: 12px;">Count: ${Q.toLocaleString()}</div>`;
      }
      const B = $.data?.source || $.source || "Unknown", P = $.data?.target || $.target || "Unknown", E = $.data?.originalValue || $.data?.value || $.value || 0, N = $.data?.label || `${E.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${F};">${B} → ${P}</div><div style="color: ${T}; font-size: 12px;">Flow: ${N}</div>`;
    }, m = () => {
      if (!c || !n.data.nodes?.length || !n.data.links?.length) return;
      const S = h.value, $ = a.value ? "rgb(34, 34, 45)" : "rgb(240, 240, 242)", M = a.value ? "rgb(34, 34, 45)" : "rgb(240, 240, 242)";
      try {
        const { nodes: F, links: T } = f(), B = y(F), P = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: _(T),
            backgroundColor: o.value.tooltipBg,
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
                  color: M,
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
              itemStyle: d.style,
              label: {
                show: !0,
                position: S.labelPosition,
                /** Dark: external labels (e.g. mobile `right`) use light text; inside nodes stay dark for contrast on pastel bars. */
                color: S.labelPosition === "right" && a.value ? o.value.textPrimary : "#0f172a",
                fontWeight: 600,
                fontSize: S.labelFontSize,
                ...S.labelWrap && S.labelLineHeight > 0 ? { lineHeight: S.labelLineHeight } : {},
                ...S.labelWrap && S.labelTextWidth > 0 ? { width: S.labelTextWidth, overflow: "none" } : {},
                ...S.labelDistance > 0 ? { distance: S.labelDistance } : {},
                fontFamily: "'DM Sans', sans-serif",
                formatter: (E) => {
                  const N = E.name || "";
                  if (S.labelWrap)
                    return p(N, Math.max(4, S.labelCharsPerLine));
                  const Y = S.labelMaxChars;
                  return N.length > Y ? `${N.substring(0, Y)}...` : N;
                }
              },
              edgeLabel: S.edgeLabelShow ? {
                show: !0,
                fontSize: S.edgeLabelFontSize,
                color: o.value.textSecondary,
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                formatter: (E) => {
                  const N = E.data?.originalValue || E.value || 0;
                  return E.data?.label || `${N.toLocaleString()}`;
                }
              } : { show: !1 },
              nodeAlign: d.node.align,
              nodeGap: S.nodeGap,
              nodeWidth: S.nodeWidth,
              layoutIterations: d.node.iterations,
              orient: S.orient,
              draggable: !1,
              ...S.contentMargins
            }
          ],
          backgroundColor: "transparent",
          animation: !0,
          animationDuration: d.animation.duration,
          animationEasing: d.animation.easing
        };
        c.setOption(P), c.resize();
      } catch (F) {
        console.error("Error setting Sankey chart options:", F), r.value = !0;
      }
    }, g = async () => {
      if (i.value)
        try {
          c = po.init(i.value), m(), window.addEventListener("resize", w);
        } catch (S) {
          console.error("Error initializing Sankey chart:", S), r.value = !0;
        } finally {
          l.value = !1;
        }
    }, x = async (S = 40) => {
      await Ot();
      for (let $ = 0; $ < S; $++) {
        if (i.value?.clientWidth && i.value.clientWidth > 0 && i.value?.clientHeight && i.value.clientHeight > 0)
          return await g();
        await new Promise((M) => setTimeout(M, 50));
      }
      await g(), setTimeout(w, 50);
    }, w = () => c?.resize(), D = () => {
      window.removeEventListener("resize", w), c && (c.dispose(), c = null);
    };
    return te(() => i.value && x()), js(D), Bt(() => n.data, m, { deep: !0 }), Bt(a, m), Bt(s, m), e({ isDark: a }), (S, $) => (b(), k("div", Hg, [
      r.value ? (b(), k("div", {
        key: 0,
        class: "error-state",
        style: yt({ height: t.height })
      }, [...$[0] || ($[0] = [
        go('<div class="error-content" data-v-eb927194><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eb927194><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-eb927194></path></svg><p class="error-title" data-v-eb927194>Chart could not be loaded</p><p class="error-description" data-v-eb927194>Please check the data format.</p></div>', 1)
      ])], 4)) : (b(), k("div", Yg, [
        Jt(u("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content",
          style: yt({ height: t.height })
        }, null, 4), [
          [an, !l.value]
        ]),
        Jt(u("div", {
          class: "loading-state",
          style: yt({ height: t.height })
        }, [...$[1] || ($[1] = [
          go('<div class="loading-container" data-v-eb927194><div class="sankey-loader" data-v-eb927194><div class="flow flow-1" data-v-eb927194></div><div class="flow flow-2" data-v-eb927194></div><div class="flow flow-3" data-v-eb927194></div><div class="flow flow-4" data-v-eb927194></div></div><p class="loading-text" data-v-eb927194>Loading Sankey diagram...</p></div>', 1)
        ])], 4), [
          [an, l.value]
        ])
      ]))
    ]));
  }
}), Ve = /* @__PURE__ */ rt(Kg, [["__scopeId", "data-v-eb927194"]]), Ug = ["open"], qg = { class: "card-header metric-collapsible__summary" }, Xg = { class: "header-content metric-header-content" }, Gg = { class: "metric-header-content__main" }, Zg = { class: "metric-header-content__text" }, Qg = {
  key: 0,
  class: "card-title"
}, Jg = {
  key: 0,
  class: "card-subtitle"
}, tp = {
  key: 0,
  class: "metric-header-content__export"
}, ep = {
  key: 0,
  class: "cmc-header-aside"
}, np = { class: "chart-metric-container__body" }, ap = {
  key: 1,
  class: "chart-metric-container chart-metric-container--static"
}, op = { class: "card-header" }, sp = { class: "header-content metric-header-content" }, ip = { class: "metric-header-content__main" }, lp = { class: "metric-header-content__text" }, rp = {
  key: 0,
  class: "ut-skeleton-container"
}, cp = {
  key: 0,
  class: "card-title"
}, dp = {
  key: 0,
  class: "card-subtitle"
}, up = {
  key: 0,
  class: "metric-header-content__export"
}, hp = {
  key: 0,
  class: "cmc-header-aside"
}, fp = { class: "chart-metric-container__body" }, gp = /* @__PURE__ */ J({
  __name: "ChartMetricContainer",
  props: {
    title: { default: "" },
    subtitle: {},
    collapsible: { type: Boolean, default: !0 },
    defaultOpen: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 }
  },
  setup(t) {
    const e = t, n = ot(e.defaultOpen), a = Na();
    function o(l) {
      return l.some((r) => {
        if (r.type === hl) return !1;
        if (r.type === Text) {
          const c = r.children;
          return typeof c == "string" && c.trim().length > 0;
        }
        return !!r.type;
      });
    }
    const s = C(() => {
      if (e.collapsible && !n.value) return !1;
      const l = a.headerExport;
      return l ? o(l()) : !1;
    });
    Bt(
      () => e.defaultOpen,
      (l) => {
        e.collapsible && (n.value = l);
      }
    );
    function i(l) {
      const r = l.currentTarget;
      r?.tagName === "DETAILS" && (n.value = r.open);
    }
    return (l, r) => t.collapsible ? (b(), k("details", {
      key: 0,
      class: "chart-metric-container metric-collapsible",
      open: n.value,
      onToggle: i
    }, [
      u("summary", qg, [
        u("div", Xg, [
          u("div", Gg, [
            u("div", Zg, [
              t.loading ? (b(), k(G, { key: 0 }, [
                r[0] || (r[0] = u("div", {
                  class: "ut-skeleton-blink ut-skeleton-title",
                  "aria-hidden": "true"
                }, null, -1)),
                r[1] || (r[1] = u("div", {
                  class: "ut-skeleton-blink ut-skeleton-subtitle",
                  "aria-hidden": "true"
                }, null, -1))
              ], 64)) : (b(), k(G, { key: 1 }, [
                wt(l.$slots, "title", {}, () => [
                  t.title ? (b(), k("h3", Qg, A(t.title), 1)) : O("", !0)
                ], !0),
                t.subtitle ? (b(), k("p", Jg, A(t.subtitle), 1)) : O("", !0),
                wt(l.$slots, "headerAppend", {}, void 0, !0)
              ], 64))
            ]),
            s.value ? (b(), k("div", tp, [
              wt(l.$slots, "headerExport", {}, void 0, !0)
            ])) : O("", !0)
          ]),
          l.$slots.headerAside ? (b(), k("div", ep, [
            wt(l.$slots, "headerAside", {}, void 0, !0)
          ])) : O("", !0)
        ]),
        r[2] || (r[2] = u("svg", {
          class: "metric-collapsible__chevron",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M19 9l-7 7-7-7"
          })
        ], -1))
      ]),
      u("div", np, [
        wt(l.$slots, "default", {}, void 0, !0)
      ])
    ], 40, Ug)) : (b(), k("div", ap, [
      u("div", op, [
        u("div", sp, [
          u("div", ip, [
            u("div", lp, [
              t.loading ? (b(), k("div", rp, [...r[3] || (r[3] = [
                u("div", { class: "ut-skeleton-title-subtitle" }, [
                  u("div", {
                    class: "ut-skeleton-blink ut-skeleton-title",
                    "aria-hidden": "true"
                  }),
                  u("div", {
                    class: "ut-skeleton-blink ut-skeleton-subtitle",
                    "aria-hidden": "true"
                  })
                ], -1),
                u("div", {
                  class: "ut-skeleton-blink ut-skeleton-options",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (b(), k(G, { key: 1 }, [
                wt(l.$slots, "title", {}, () => [
                  t.title ? (b(), k("h3", cp, A(t.title), 1)) : O("", !0)
                ], !0),
                t.subtitle ? (b(), k("p", dp, A(t.subtitle), 1)) : O("", !0),
                wt(l.$slots, "headerAppend", {}, void 0, !0)
              ], 64))
            ]),
            s.value ? (b(), k("div", up, [
              wt(l.$slots, "headerExport", {}, void 0, !0)
            ])) : O("", !0)
          ]),
          l.$slots.headerAside ? (b(), k("div", hp, [
            wt(l.$slots, "headerAside", {}, void 0, !0)
          ])) : O("", !0)
        ])
      ]),
      u("div", fp, [
        wt(l.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), gt = /* @__PURE__ */ rt(gp, [["__scopeId", "data-v-dbabb987"]]);
function pp(t, e) {
  return b(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
    })
  ]);
}
function ho(t, e) {
  return b(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
    })
  ]);
}
function qt(t, e) {
  return b(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
    })
  ]);
}
function mp(t, e) {
  return b(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
    }),
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
    })
  ]);
}
function Ni(t, e) {
  return b(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "m19.5 8.25-7.5 7.5-7.5-7.5"
    })
  ]);
}
function Wi(t, e) {
  return b(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15.75 19.5 8.25 12l7.5-7.5"
    })
  ]);
}
function ji(t, e) {
  return b(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "m8.25 4.5 7.5 7.5-7.5 7.5"
    })
  ]);
}
function bp(t, e) {
  return b(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    })
  ]);
}
function vp(t, e) {
  return b(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
    })
  ]);
}
function Hi(t, e) {
  return b(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    })
  ]);
}
const yp = {
  key: 0,
  class: "footer-divider"
}, xp = {
  key: 0,
  class: "export-label"
}, _p = { class: "export-buttons" }, kp = ["disabled"], wp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Cp = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, $p = ["disabled"], Mp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Sp = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Dp = /* @__PURE__ */ J({
  __name: "FooterExport",
  props: {
    formats: { default: () => ["pdf", "csv"] },
    loading: { type: Boolean, default: !1 },
    variant: { default: "footer" }
  },
  emits: ["export"],
  setup(t, { emit: e }) {
    const n = t, a = e, o = C(() => n.variant === "footer" ? "footer" : "div"), s = C(
      () => n.variant === "footer" ? "chart-footer" : "chart-export-inline"
    ), i = (r) => n.formats.includes(r), l = (r) => {
      n.loading || a("export", r);
    };
    return (r, c) => (b(), q(tn(o.value), {
      class: U(s.value)
    }, {
      default: I(() => [
        t.variant === "footer" ? (b(), k("div", yp)) : O("", !0),
        u("div", {
          class: U(["export-actions", { "export-actions--inline": t.variant === "inline" }])
        }, [
          t.variant === "footer" ? (b(), k("span", xp, "Export")) : O("", !0),
          u("div", _p, [
            i("pdf") ? (b(), k("button", {
              key: 0,
              type: "button",
              class: U(["export-btn", { "is-loading": t.loading }]),
              disabled: t.loading,
              title: "Download PDF",
              onClick: c[0] || (c[0] = (d) => l("pdf"))
            }, [
              t.loading ? (b(), k("svg", wp, [...c[2] || (c[2] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (b(), k("svg", Cp, [...c[3] || (c[3] = [
                u("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }, null, -1),
                u("polyline", { points: "14 2 14 8 20 8" }, null, -1),
                u("line", {
                  x1: "16",
                  y1: "13",
                  x2: "8",
                  y2: "13"
                }, null, -1),
                u("line", {
                  x1: "16",
                  y1: "17",
                  x2: "8",
                  y2: "17"
                }, null, -1),
                u("polyline", { points: "10 9 9 9 8 9" }, null, -1)
              ])])),
              c[4] || (c[4] = u("span", null, "PDF", -1))
            ], 10, kp)) : O("", !0),
            i("csv") ? (b(), k("button", {
              key: 1,
              type: "button",
              class: U(["export-btn", { "is-loading": t.loading }]),
              disabled: t.loading,
              title: "Download CSV",
              onClick: c[1] || (c[1] = (d) => l("csv"))
            }, [
              t.loading ? (b(), k("svg", Mp, [...c[5] || (c[5] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (b(), k("svg", Sp, [...c[6] || (c[6] = [
                u("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }, null, -1),
                u("polyline", { points: "14 2 14 8 20 8" }, null, -1),
                u("line", {
                  x1: "12",
                  y1: "18",
                  x2: "12",
                  y2: "12"
                }, null, -1),
                u("line", {
                  x1: "9",
                  y1: "15",
                  x2: "15",
                  y2: "15"
                }, null, -1)
              ])])),
              c[7] || (c[7] = u("span", null, "CSV", -1))
            ], 10, $p)) : O("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Lt = /* @__PURE__ */ rt(Dp, [["__scopeId", "data-v-ebfab47f"]]), Ap = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Tp = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Bp = { class: "w-full shrink-0 sm:pr-2" }, Lp = {
  key: 2,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, Fp = { class: "max-w-[360px] text-center" }, Pp = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Ep = /* @__PURE__ */ J({
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
  setup(t, { expose: e, emit: n }) {
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
    }, o = t, s = n, i = (p) => {
      s("export", p);
    }, l = pt(o, "theme"), r = pt(o, "options"), { isDark: c } = vt(l), d = (p) => {
      const v = new Date(p), f = String(v.getDate()).padStart(2, "0"), y = String(v.getMonth() + 1).padStart(2, "0");
      return `${f}-${y}`;
    }, h = C(() => {
      const p = o.data?.agents_by_day || {}, v = Object.keys(p).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const f = v.map((x) => d(x)), y = /* @__PURE__ */ new Set();
      for (const x of Object.values(p))
        for (const w of Object.keys(x))
          y.add(w);
      const _ = Array.from(y), m = (x) => x, g = _.map((x) => ({
        label: x,
        data: v.map((w) => p[w]?.[x] || 0),
        backgroundColor: `${a[x] || "#94a3b8"}80`,
        borderColor: m(a[x] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: f,
        datasets: g
      };
    });
    return e({ isDark: c }), (p, v) => (b(), q(gt, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1,
      loading: t.loading
    }, {
      headerExport: I(() => [
        t.enableExport && !t.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          loading: t.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        u("div", Ap, [
          t.loading ? (b(), k("div", {
            key: 0,
            class: U(["flex h-[320px] flex-col gap-3 px-4 pb-4", ["sk-root", { "sk-root--dark": L(c) }]]),
            "aria-busy": "true",
            "aria-label": "Loading chart"
          }, [...v[0] || (v[0] = [
            u("div", {
              class: "flex-1 skeleton-shimmer",
              style: { "border-radius": "10px" },
              "aria-hidden": "true"
            }, null, -1)
          ])], 2)) : h.value.labels && h.value.labels.length ? (b(), k("section", Tp, [
            u("div", Bp, [
              V(be, {
                data: h.value,
                stacked: !0,
                theme: l.value,
                options: r.value
              }, null, 8, ["data", "theme", "options"])
            ])
          ])) : (b(), k("section", Lp, [
            u("div", Fp, [
              u("div", Pp, [
                V(L(qt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
              ]),
              v[1] || (v[1] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agents data per day ", -1)),
              v[2] || (v[2] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see daily agent interactions. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Ip = /* @__PURE__ */ rt(Ep, [["__scopeId", "data-v-a76eaa8e"]]), Rp = { class: "flex w-full min-w-0 justify-center" }, Op = { class: "flex max-w-full min-w-0 items-center gap-2" }, Vp = { class: "min-w-0 truncate text-[12px] leading-normal" }, zp = { class: "text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, Np = {
  key: 0,
  class: "min-w-0 w-full truncate text-[10px] leading-normal"
}, Wp = /* @__PURE__ */ J({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(t) {
    return (e, n) => (b(), k("div", {
      class: U(["card-info box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]", t.subvalue ? "h-[75px]" : "h-[58px]"])
    }, [
      u("div", Rp, [
        u("div", Op, [
          t.color ? (b(), k("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: yt({ backgroundColor: t.color }),
            "aria-hidden": "true"
          }, null, 4)) : O("", !0),
          u("span", Vp, A(t.title), 1)
        ])
      ]),
      u("p", zp, A(t.value), 1),
      t.subvalue ? (b(), k("p", Np, A(t.subvalue), 1)) : O("", !0)
    ], 2));
  }
}), ut = /* @__PURE__ */ rt(Wp, [["__scopeId", "data-v-945ff8fb"]]), jp = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, jt = /* @__PURE__ */ J({
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
  setup(t) {
    const e = t, n = C(
      () => e.statusLive === !0 || e.statusLive === !1
    ), a = C(
      () => e.statusLive === !0 ? e.labelConnected : e.labelDisconnected
    ), o = C(() => e.statusLive === !0 ? [
      "border border-emerald-200 bg-emerald-50",
      "dark:border-emerald-800/80 dark:bg-emerald-950/40"
    ] : [
      "border border-transparent bg-slate-100 dark:border-slate-700/80 dark:bg-slate-800/90"
    ]), s = C(() => e.statusLive === !0 ? "text-emerald-700 dark:text-emerald-300" : "text-[color:var(--kiut-text-primary)] dark:text-slate-300"), i = C(() => {
      const l = e.outlined;
      switch (e.color) {
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
    return (l, r) => n.value ? (b(), k("span", {
      key: 0,
      role: "status",
      class: U(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", o.value])
    }, [
      t.statusLive === !0 ? (b(), k("span", jp, [...r[0] || (r[0] = [
        u("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        u("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : O("", !0),
      u("span", {
        class: U(["min-w-0 flex-1 text-center", s.value])
      }, A(a.value), 3)
    ], 2)) : (b(), k("span", {
      key: 1,
      class: U(["inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight", i.value])
    }, [
      wt(l.$slots, "default", {}, () => [
        _t(A(t.label), 1)
      ])
    ], 2));
  }
}), Z = (t) => t == null ? "0" : new Intl.NumberFormat("en-US").format(t), Ct = (t, e = "USD") => t == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: e,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(t), De = (t) => {
  if (t == null) return "0";
  const e = Math.abs(t), n = t < 0 ? "-" : "";
  return e >= 1e6 ? `${n}${(e / 1e6).toFixed(2)}M` : e > 99999 ? `${n}${(e / 1e3).toFixed(1)}K` : `${n}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(e)}`;
}, Hp = {
  class: "kiut-table-root table-section flex w-full min-w-0 flex-col rounded-xl font-sans antialiased text-[color:var(--kiut-text-primary,#1e293b)]",
  "data-component": "kiut-table"
}, Yp = { class: "overflow-x-auto" }, Kp = { class: "w-full table-auto border-collapse text-left text-[14px] leading-normal" }, Up = /* @__PURE__ */ J({
  __name: "Table",
  props: {
    columns: {},
    rows: {},
    maxVisibleRows: { default: 3 },
    viewMoreLabel: { default: "View more ({count} rows)" },
    viewLessLabel: { default: "View less" },
    rowKey: { type: [String, Function], default: "id" }
  },
  setup(t) {
    const e = t, n = ot(!1), a = "—";
    function o(y) {
      return y == null || y === "" ? a : String(y);
    }
    function s(y) {
      return y === "center" ? "text-center" : y === "right" ? "text-right" : "text-left";
    }
    function i(y) {
      return `cell-${y}`;
    }
    function l(y, _) {
      return y[_];
    }
    function r(y, _) {
      if (typeof e.rowKey == "function")
        return e.rowKey(y);
      const m = y[e.rowKey];
      return typeof m == "string" || typeof m == "number" ? m : _;
    }
    function c(y, _) {
      return r(y, _);
    }
    const d = C(() => e.rows?.length ?? 0), h = C(() => d.value > e.maxVisibleRows), p = C(() => Math.max(0, d.value - e.maxVisibleRows)), v = C(() => e.rows?.length ? n.value || !h.value ? e.rows : e.rows.slice(0, e.maxVisibleRows) : []), f = C(
      () => e.viewMoreLabel.replace(/\{count\}/g, String(p.value))
    );
    return (y, _) => (b(), k("div", Hp, [
      u("div", Yp, [
        u("table", Kp, [
          u("thead", null, [
            u("tr", null, [
              (b(!0), k(G, null, it(t.columns, (m) => (b(), k("th", {
                key: m.key,
                scope: "col",
                class: U(["kiut-table-th whitespace-nowrap px-3 py-2 text-left text-[#9191a1]", [s(m.align), m.headerClass]])
              }, A(m.label), 3))), 128))
            ])
          ]),
          u("tbody", null, [
            (b(!0), k(G, null, it(v.value, (m, g) => (b(), k("tr", {
              key: c(m, g)
            }, [
              (b(!0), k(G, null, it(t.columns, (x) => (b(), k("td", {
                key: `${g}-${x.key}`,
                class: U(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [s(x.align), x.cellClass]])
              }, [
                wt(y.$slots, i(x.key), {
                  row: m,
                  column: x,
                  value: l(m, x.key)
                }, () => [
                  _t(A(o(l(m, x.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ]),
      h.value ? (b(), k("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: _[0] || (_[0] = (m) => n.value = !n.value)
      }, [
        _t(A(n.value ? t.viewLessLabel : f.value) + " ", 1),
        (b(), k("svg", {
          class: U(["view-more-icon", { "view-more-icon-rotated": n.value }]),
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [..._[1] || (_[1] = [
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M19 9l-7 7-7-7"
          }, null, -1)
        ])], 2))
      ])) : O("", !0)
    ]));
  }
}), oe = /* @__PURE__ */ rt(Up, [["__scopeId", "data-v-58cfdc5e"]]), qp = {
  key: 0,
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Xp = {
  key: 1,
  class: "error-state"
}, Gp = { class: "error-content" }, Zp = { class: "error-description" }, Qp = {
  key: 2,
  class: "card-body"
}, Jp = { class: "chart-section" }, tm = { class: "chart-wrapper" }, em = { class: "payment-success-summary" }, nm = {
  key: 0,
  class: "booking-daily-section"
}, am = { class: "w-full min-w-0" }, om = { class: "font-medium" }, sm = { class: "percentage-text" }, im = { class: "badges-container" }, lm = {
  key: 0,
  class: "badges-container"
}, rm = {
  key: 1,
  class: "percentage-text"
}, cm = { class: "badges-container" }, dm = {
  key: 1,
  class: "empty-state"
}, um = /* @__PURE__ */ J({
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
  setup(t, { emit: e }) {
    function n(g) {
      return g;
    }
    const a = t, o = e, s = (g) => {
      o("export", g);
    }, i = C(() => a.data?.booking_manager_by_day ? [...a.data.booking_manager_by_day].sort(
      (g, x) => new Date(g.date).getTime() - new Date(x.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "paymentInitiated", label: "Payment Initiated", align: "center" },
      { key: "paymentResults", label: "Payment Results", align: "left" },
      { key: "paymentValue", label: "Payment Value", align: "left" },
      { key: "outcomes", label: "Outcomes", align: "left" }
    ], r = C(
      () => i.value.map((g) => ({
        id: g.date,
        ...g
      }))
    ), c = C(() => a.data?.total_payment_success_value || []), d = C(() => {
      const g = c.value;
      return g.length === 0 ? f(0) : g.map(
        (x) => `${x.currency} ${f(x.total_value)}`
      ).join(" · ");
    }), h = (g) => g.payment_success_value || [], p = (g) => typeof g.payment_success_count == "number" ? g.payment_success_count : (g.payment_success_value || []).reduce(
      (x, w) => x + (w.count || 0),
      0
    ), v = (g) => Ct(g), f = (g) => g == null ? "0" : De(g);
    C(() => (a.data?.total_payment_success_value || []).reduce(
      (g, x) => g + (x.total_value || 0),
      0
    ));
    const y = C(() => {
      const g = a.data, x = g.total_booking_initiated || 0, w = g.total_booking_started || 0, D = g.total_payment_initiated || 0, S = g.total_not_found || 0, $ = g.total_cancelled || 0, M = g.total_no_pending_balance || 0, F = g.total_errors || 0, T = typeof g.total_payment_success == "number" ? g.total_payment_success : (g.total_payment_success_value || []).reduce(
        (Q, tt) => Q + (tt.count || 0),
        0
      ), B = g.total_payment_failed || 0, P = Math.max(0, x - w), E = Math.max(
        0,
        w - D - S - $ - M - F
      ), N = (Q, tt) => {
        const ct = tt > 0 ? Math.round(Q / tt * 100) : 0;
        return `${Z(Q)} (${ct}%)`;
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
      ], W = [];
      return w > 0 && W.push({
        source: "Initiated",
        target: "Started",
        value: w,
        label: N(w, x)
      }), P > 0 && W.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: P,
        label: N(P, x)
      }), D > 0 && W.push({
        source: "Started",
        target: "Payment Initiated",
        value: D,
        label: N(D, w)
      }), S > 0 && W.push({
        source: "Started",
        target: "Not Found",
        value: S,
        label: N(S, w)
      }), $ > 0 && W.push({
        source: "Started",
        target: "Cancelled",
        value: $,
        label: N($, w)
      }), M > 0 && W.push({
        source: "Started",
        target: "No Pending Balance",
        value: M,
        label: N(M, w)
      }), F > 0 && W.push({
        source: "Started",
        target: "Errors",
        value: F,
        label: N(F, w)
      }), E > 0 && W.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: E,
        label: N(E, w)
      }), T > 0 && W.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: T,
        label: N(T, D)
      }), B > 0 && W.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: B,
        label: N(B, D)
      }), { nodes: Y, links: W };
    }), _ = {
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
    }, m = (g, x) => !x || x === 0 ? "0%" : `${Math.round(g / x * 100)}%`;
    return (g, x) => (b(), q(gt, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis",
      loading: t.loading
    }, {
      headerExport: I(() => [
        t.enableExport && !a.loading && !a.error ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: t.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        t.loading ? (b(), k("div", qp, [...x[0] || (x[0] = [
          u("div", {
            class: "flex-1 bm-skeleton-blink",
            "aria-hidden": "true"
          }, null, -1)
        ])])) : a.error ? (b(), k("div", Xp, [
          u("div", Gp, [
            x[1] || (x[1] = u("div", { class: "error-icon-wrapper" }, [
              u("svg", {
                class: "error-icon",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [
                u("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                })
              ])
            ], -1)),
            x[2] || (x[2] = u("p", { class: "error-title" }, "Error loading data", -1)),
            u("p", Zp, A(a.error), 1)
          ])
        ])) : (b(), k("div", Qp, [
          u("section", Jp, [
            u("div", tm, [
              V(Ve, {
                data: y.value,
                "node-colors": _,
                height: "500px",
                "node-gap": 15
              }, null, 8, ["data"])
            ])
          ]),
          u("section", em, [
            V(ut, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: d.value
            }, null, 8, ["value"])
          ]),
          i.value.length > 0 ? (b(), k("section", nm, [
            x[3] || (x[3] = u("div", { class: "section-header" }, [
              u("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            u("div", am, [
              V(oe, {
                columns: l,
                rows: r.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: w }) => [
                  u("span", om, A(L(Rt)(String(w.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": I(({ row: w }) => [
                  u("span", null, A(L(Z)(Number(w.booking_initiated_count))), 1)
                ]),
                "cell-started": I(({ row: w }) => [
                  u("span", null, [
                    _t(A(L(Z)(Number(w.booking_started_count))) + " ", 1),
                    u("span", sm, " (" + A(m(
                      Number(w.booking_started_count),
                      Number(w.booking_initiated_count)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-paymentInitiated": I(({ row: w }) => [
                  u("span", null, A(L(Z)(Number(w.payment_initiated_count))), 1)
                ]),
                "cell-paymentResults": I(({ row: w }) => [
                  u("div", im, [
                    V(jt, { color: "success" }, {
                      default: I(() => [
                        _t(" Success: " + A(L(Z)(
                          p(w)
                        )), 1)
                      ]),
                      _: 2
                    }, 1024),
                    V(jt, { color: "danger" }, {
                      default: I(() => [
                        _t(" Failed: " + A(L(Z)(Number(w.payment_failed_count) || 0)), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ])
                ]),
                "cell-paymentValue": I(({ row: w }) => [
                  h(w).length > 0 ? (b(), k("div", lm, [
                    (b(!0), k(G, null, it(h(
                      w
                    ), (D) => (b(), k("span", {
                      key: `${w.date}-${D.currency}`,
                      class: "badge badge-currency"
                    }, A(D.currency) + " " + A(v(D.total_value)), 1))), 128))
                  ])) : (b(), k("span", rm, "N/A"))
                ]),
                "cell-outcomes": I(({ row: w }) => [
                  u("div", cm, [
                    V(jt, { color: "danger" }, {
                      default: I(() => [
                        _t(" Not Found: " + A(w.not_found_count ? L(Z)(Number(w.not_found_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024),
                    V(jt, { color: "warning" }, {
                      default: I(() => [
                        _t(" Cancelled: " + A(w.cancelled_count ? L(Z)(Number(w.cancelled_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024),
                    V(jt, { color: "orange" }, {
                      default: I(() => [
                        _t(" No Balance: " + A(w.no_pending_balance_count ? L(Z)(Number(w.no_pending_balance_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024),
                    V(jt, { color: "danger" }, {
                      default: I(() => [
                        _t(" Errors: " + A(w.error_count ? L(Z)(Number(w.error_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (b(), k("section", dm, [...x[4] || (x[4] = [
            u("div", { class: "empty-state-content" }, [
              u("div", { class: "empty-icon-wrapper" }, [
                u("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  })
                ])
              ]),
              u("p", { class: "empty-title" }, "No booking manager data available"),
              u("p", { class: "empty-description" }, " No booking manager data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])]))
        ]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), hm = /* @__PURE__ */ rt(um, [["__scopeId", "data-v-968a4890"]]), fm = {
  key: 0,
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, gm = {
  key: 1,
  class: "card-body"
}, pm = {
  key: 0,
  class: "chart-section"
}, mm = { class: "chart-wrapper" }, bm = {
  key: 1,
  class: "checkin-daily-section"
}, vm = { class: "w-full min-w-0" }, ym = { class: "font-medium" }, xm = { class: "cell-success" }, _m = { class: "cell-danger" }, km = {
  key: 0,
  class: "reasons-list"
}, wm = { class: "reason-name" }, Cm = { class: "reason-count" }, $m = {
  key: 1,
  class: "no-reasons"
}, Mm = {
  key: 2,
  class: "empty-state"
}, Sm = {
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
  setup(t, { emit: e }) {
    const n = e, a = (g) => {
      n("export", g);
    }, o = t, s = {
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
    }, l = ot([]), r = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieve", label: "Booking Retrieve (%)", align: "center" },
      { key: "passengers", label: "Number of Passengers", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Failed (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], c = C(
      () => (l.value || []).map((g) => ({
        id: g.date,
        date: g.date,
        checkin_initiated_count: g.checkin_initiated_count,
        checkin_init_count: g.checkin_init_count,
        checkin_started_count: g.checkin_started_count,
        checkin_completed_count: g.checkin_completed_count,
        checkin_closed_count: g.checkin_closed_count,
        failed_steps: g.failed_steps
      }))
    ), d = C(() => {
      const g = o.data;
      return g && (Array.isArray(g.checkin_by_day) && g.checkin_by_day.length > 0 || (g.total_checkin_initiated ?? 0) > 0) ? { ...s, ...g } : o.checkinData ?? s;
    }), h = C(() => {
      const g = o.data;
      return g && (Array.isArray(g.failed_by_step_by_day) && g.failed_by_step_by_day.length > 0 || Array.isArray(g.unrecovered_by_step) && g.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: g.total_checkin_failed ?? 0,
        total_checkin_unrecovered: g.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: g.failed_by_step_by_day ?? [],
        unrecovered_by_step: g.unrecovered_by_step ?? [],
        unrecovered_by_day: g.unrecovered_by_day ?? []
      } : o.failedData ?? i;
    }), p = C(() => {
      const g = {
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
        const S = w.step_name.replace(/_/g, " ").split(" ").map((M) => M.charAt(0).toUpperCase() + M.slice(1)).join(" "), $ = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        g[S] = $[S] || "#DC2626";
      }), g;
    }), v = (g, x) => !x || x === 0 ? "0%" : `${Math.round(g / x * 100)}%`, f = (g, x) => {
      const w = Z(g), D = v(g, x);
      return `${w} (${D})`;
    }, y = (g) => g.reduce((x, w) => x + w.failed_count, 0), _ = C(() => {
      const g = [], x = [];
      if (!d.value.total_checkin_initiated)
        return { nodes: g, links: x };
      g.push({ name: "Checkin Init" }), g.push({ name: "Booking retrive" }), g.push({ name: "Booking retrive success" }), g.push({ name: "Number of Passengers" }), g.push({ name: "Completed" }), g.push({ name: "Closed with BP" });
      const w = d.value.total_checkin_initiated, D = d.value.total_checkin_init, S = d.value.total_checkin_init_abandoned, $ = D - S, M = d.value.total_checkin_started, F = d.value.total_checkin_completed, T = d.value.total_checkin_closed, B = h.value.unrecovered_by_step || [], P = B.reduce(
        (W, Q) => W + Q.count,
        0
      );
      if (D > 0) {
        const W = Math.round(D / w * 100);
        x.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: D,
          label: `${D.toLocaleString()} (${W}%)`
        });
      }
      const E = w - D;
      if (E > 0) {
        const W = Math.round(E / w * 100);
        g.push({ name: "Abandoned (Init)" }), x.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: E,
          label: `${E.toLocaleString()} (${W}%)`
        });
      }
      if (S > 0) {
        const W = Math.round(S / w * 100);
        g.push({ name: "Abandoned (Started)" }), x.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: S,
          label: `${S.toLocaleString()} (${W}%)`
        });
      }
      if ($ > 0) {
        const W = Math.round($ / w * 100);
        x.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: $,
          label: `${$.toLocaleString()} (${W}%)`
        });
      }
      if (M > 0) {
        const W = Math.round(M / w * 100);
        x.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: M,
          label: `${M.toLocaleString()} (${W}%)`
        });
      }
      if (F > 0) {
        const W = Math.round(F / M * 100);
        x.push({
          source: "Number of Passengers",
          target: "Completed",
          value: F,
          label: `${F.toLocaleString()} (${W}%)`
        });
      }
      if (B.length > 0 && P > 0) {
        g.push({ name: "Unrecovered" });
        const W = Math.round(P / M * 100);
        x.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: P,
          label: `${P.toLocaleString()} (${W}%)`
        }), B.forEach((Q) => {
          const ct = Q.step_name.replace(/_/g, " ").split(" ").map((K) => K.charAt(0).toUpperCase() + K.slice(1)).join(" "), z = Math.round(Q.count / M * 100);
          g.push({ name: ct }), x.push({
            source: "Unrecovered",
            target: ct,
            value: Q.count,
            label: `${Q.count.toLocaleString()} (${z}%)`
          });
        });
      }
      const N = M - (F + P);
      if (N > 0) {
        const W = Math.round(N / M * 100);
        g.push({ name: "Abandoned (Flow)" }), x.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: N,
          label: `${N.toLocaleString()} (${W}%)`
        });
      }
      const Y = F - T;
      if (Y > 0) {
        const W = Math.round(Y / M * 100);
        g.push({ name: "BP Error" }), x.push({
          source: "Completed",
          target: "BP Error",
          value: Y,
          label: `${Y.toLocaleString()} (${W}%)`
        });
      }
      if (T > 0) {
        const W = Math.round(T / M * 100);
        x.push({
          source: "Completed",
          target: "Closed with BP",
          value: T,
          label: `${T.toLocaleString()} (${W}%)`
        });
      }
      return { nodes: g, links: x };
    }), m = () => {
      const g = d.value.checkin_by_day || [], x = h.value.failed_by_step_by_day || [];
      if (g.length === 0) {
        l.value = [];
        return;
      }
      l.value = [...g].map((w) => {
        const D = x.find(
          (S) => S.date === w.date
        );
        return {
          ...w,
          failed_steps: D?.steps || []
        };
      }), l.value.sort((w, D) => new Date(w.date) - new Date(D.date));
    };
    return Bt(
      [() => o.data, () => o.checkinData, () => o.failedData],
      () => {
        m();
      },
      { deep: !0, immediate: !0 }
    ), (g, x) => (b(), q(gt, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: t.collapsible,
      "default-open": t.initiallyOpen,
      loading: t.loading
    }, {
      headerExport: I(() => [
        t.enableExport && !t.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: t.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        t.loading ? (b(), k("div", fm, [...x[0] || (x[0] = [
          u("div", {
            class: "flex-1 bm-skeleton-blink",
            "aria-hidden": "true"
          }, null, -1)
        ])])) : (b(), k("div", gm, [
          _.value.nodes.length > 0 ? (b(), k("section", pm, [
            u("div", mm, [
              V(Ve, {
                data: _.value,
                height: "500px",
                "node-colors": p.value,
                "use-gradient": !1,
                "node-gap": 30
              }, null, 8, ["data", "node-colors"])
            ])
          ])) : O("", !0),
          l.value && l.value.length > 0 ? (b(), k("section", bm, [
            u("div", vm, [
              V(oe, {
                columns: r,
                rows: c.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: w }) => [
                  u("span", ym, A(L(Rt)(String(w.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": I(({ row: w }) => [
                  u("span", null, A(L(Z)(w.checkin_initiated_count)), 1)
                ]),
                "cell-bookingRetrieve": I(({ row: w }) => [
                  u("span", null, A(f(
                    w.checkin_init_count,
                    w.checkin_initiated_count
                  )), 1)
                ]),
                "cell-passengers": I(({ row: w }) => [
                  u("span", null, A(L(Z)(w.checkin_started_count)), 1)
                ]),
                "cell-completed": I(({ row: w }) => [
                  u("span", null, A(f(
                    w.checkin_completed_count,
                    w.checkin_started_count
                  )), 1)
                ]),
                "cell-closed": I(({ row: w }) => [
                  u("span", xm, A(f(
                    w.checkin_closed_count,
                    w.checkin_started_count
                  )), 1)
                ]),
                "cell-failed": I(({ row: w }) => [
                  u("span", _m, A(f(
                    y(w.failed_steps),
                    w.checkin_started_count
                  )), 1)
                ]),
                "cell-reasons": I(({ row: w }) => [
                  w.failed_steps && w.failed_steps.length > 0 ? (b(), k("div", km, [
                    (b(!0), k(G, null, it(w.failed_steps, (D) => (b(), k("div", {
                      key: D.step_name,
                      class: "reason-item"
                    }, [
                      u("span", wm, A(D.step_name.replace(/_/g, " ")) + ":", 1),
                      u("span", Cm, A(D.failed_count), 1)
                    ]))), 128))
                  ])) : (b(), k("div", $m, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (b(), k("section", Mm, [...x[1] || (x[1] = [
            u("div", { class: "empty-state-content" }, [
              u("div", { class: "empty-icon-wrapper" }, [
                u("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  })
                ])
              ]),
              u("p", { class: "empty-title" }, "No check-in data available"),
              u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see check-in performance data. ")
            ], -1)
          ])]))
        ]))
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}, Yi = /* @__PURE__ */ rt(Sm, [["__scopeId", "data-v-2190f0cf"]]), Dm = {
  key: 0,
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Am = {
  key: 1,
  class: "card-body"
}, Tm = {
  key: 0,
  class: "sankey-section"
}, Bm = {
  key: 1,
  class: "checkin-metrics-daily-section"
}, Lm = { class: "w-full min-w-0" }, Fm = { class: "font-medium whitespace-nowrap" }, Pm = { class: "cell-success" }, Em = { class: "cell-danger" }, Im = {
  key: 0,
  class: "reasons-list"
}, Rm = { class: "reason-name" }, Om = { class: "reason-count" }, Vm = {
  key: 1,
  class: "no-reasons"
}, zm = {
  key: 2,
  class: "empty-state"
}, Nm = { class: "empty-state-content" }, Wm = { class: "empty-icon-wrapper" }, jm = /* @__PURE__ */ J({
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
  setup(t, { expose: e, emit: n }) {
    const a = t, o = n, s = (m) => {
      o("export", m);
    }, { isDark: i } = vt(pt(a, "theme")), l = (m) => m == null ? "0" : m.toLocaleString(), r = (m) => {
      const [g, x, w] = m.split("-").map(Number);
      return Rt([g, x - 1, w]).format("MMM DD");
    }, c = (m) => m.replace(/_/g, " ").replace(/\b\w/g, (g) => g.toUpperCase()), d = (m, g) => !g || g === 0 ? "0%" : `${Math.round(m / g * 100)}%`, h = (m, g) => {
      const x = m || 0, w = g || 0, D = l(x), S = d(x, w);
      return `${D} (${S})`;
    }, p = C(() => ({
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
    })), v = C(() => {
      const m = a.checkinData?.record_locator_by_day || [], g = a.failedData?.failed_by_step_by_day || [], x = a.failedData?.unrecovered_by_day || [];
      return m.map((D) => {
        const S = g.find((M) => M.date === D.date), $ = x.find(
          (M) => M.date === D.date
        );
        return {
          ...D,
          failed_steps: S?.steps || [],
          unrecovered_count: $?.unrecovered_count || 0
        };
      }).sort(
        (D, S) => new Date(D.date).getTime() - new Date(S.date).getTime()
      );
    }), f = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieval", label: "Booking Retrieval (%)", align: "center" },
      { key: "bookingRetrieved", label: "Booking Retrieved", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Errors (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], y = C(
      () => v.value.map((m) => ({
        id: m.date,
        date: m.date,
        checkin_initiated: m.checkin_initiated,
        record_locator_init_count: m.record_locator_init_count,
        record_locator_started_count: m.record_locator_started_count,
        record_locator_completed_count: m.record_locator_completed_count,
        record_locator_closed_count: m.record_locator_closed_count,
        unrecovered_count: m.unrecovered_count,
        failed_steps: m.failed_steps
      }))
    ), _ = C(() => {
      const m = [], g = [], x = /* @__PURE__ */ new Set(), w = (j) => {
        x.has(j) || (m.push({ name: j }), x.add(j));
      };
      if (!a.checkinData?.total_checkin_initiated)
        return { nodes: m, links: g };
      w("Checkin Init"), w("Booking Retrieval"), w("Booking Retrieved"), w("Completed"), w("Closed with BP");
      const D = a.checkinData.total_checkin_initiated || 0, S = a.checkinData.total_record_locator_init || 0, $ = a.checkinData.total_record_locator_init_abandoned || 0, M = a.checkinData.total_checkin_pre_init_abandoned_error, F = a.checkinData.total_checkin_pre_init_abandoned_voluntary, T = M != null || F != null, B = T ? Math.max(Number(M) || 0, 0) : 0, P = T ? Math.max(Number(F) || 0, 0) : 0, E = a.checkinData.total_record_locator_init_abandoned_error, N = a.checkinData.total_record_locator_init_abandoned_voluntary, Y = E != null || N != null, W = Y ? Math.max(Number(E) || 0, 0) : 0, Q = Y ? Math.max(Number(N) || 0, 0) : 0, tt = Y ? Math.max($ - W - Q, 0) : $, ct = S - $, z = a.checkinData.total_record_locator_started || 0, K = a.checkinData.total_record_locator_completed || 0, X = a.checkinData.total_record_locator_closed || 0, lt = a.checkinData.total_record_locator_unrecovered || 0;
      if (S > 0) {
        const j = Math.round(S / D * 100);
        g.push({
          source: "Checkin Init",
          target: "Booking Retrieval",
          value: S,
          label: `${S.toLocaleString()} (${j}%)`
        });
      }
      const st = D - S;
      if (T) {
        if (P > 0) {
          const j = Math.round(
            P / D * 100
          );
          w("Abandoned (Init)"), g.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: P,
            label: `${P.toLocaleString()} (${j}%)`
          });
        }
        if (B > 0) {
          const j = Math.round(B / D * 100);
          w("Booking not retreived"), g.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: B,
            label: `${B.toLocaleString()} (${j}%)`
          });
        }
      } else if (st > 0) {
        const j = Math.round(st / D * 100);
        w("Abandoned (Init)"), g.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: st,
          label: `${st.toLocaleString()} (${j}%)`
        });
      }
      if (Y) {
        if (W > 0) {
          const j = Math.round(W / D * 100);
          w("Error"), g.push({
            source: "Booking Retrieval",
            target: "Error",
            value: W,
            label: `${W.toLocaleString()} (${j}%)`
          });
        }
        if (Q > 0) {
          const j = Math.round(Q / D * 100);
          w("Abandoned (Started)"), g.push({
            source: "Booking Retrieval",
            target: "Abandoned (Started)",
            value: Q,
            label: `${Q.toLocaleString()} (${j}%)`
          });
        }
        if (tt > 0) {
          const j = Math.round(
            tt / D * 100
          );
          w("Abandoned (Started)"), g.push({
            source: "Booking Retrieval",
            target: "Abandoned (Started)",
            value: tt,
            label: `${tt.toLocaleString()} (${j}%)`
          });
        }
      } else if ($ > 0) {
        const j = Math.round($ / D * 100);
        w("Abandoned (Started)"), g.push({
          source: "Booking Retrieval",
          target: "Abandoned (Started)",
          value: $,
          label: `${$.toLocaleString()} (${j}%)`
        });
      }
      if (ct > 0) {
        const j = Math.round(ct / D * 100);
        g.push({
          source: "Booking Retrieval",
          target: "Booking Retrieved",
          value: ct,
          label: `${ct.toLocaleString()} (${j}%)`
        });
      }
      if (K > 0) {
        const j = Math.round(K / z * 100);
        g.push({
          source: "Booking Retrieved",
          target: "Completed",
          value: K,
          label: `${K.toLocaleString()} (${j}%)`
        });
      }
      if (lt > 0) {
        w("Errors");
        const j = Math.round(lt / z * 100);
        g.push({
          source: "Booking Retrieved",
          target: "Errors",
          value: lt,
          label: `${lt.toLocaleString()} (${j}%)`
        });
      }
      const Dt = z - (K + lt);
      if (Dt > 0) {
        const j = Math.round(Dt / z * 100);
        w("Abandoned (Flow)"), g.push({
          source: "Booking Retrieved",
          target: "Abandoned (Flow)",
          value: Dt,
          label: `${Dt.toLocaleString()} (${j}%)`
        });
      }
      const xt = K - X;
      if (xt > 0) {
        const j = Math.round(xt / z * 100);
        w("BP Error"), g.push({
          source: "Completed",
          target: "BP Error",
          value: xt,
          label: `${xt.toLocaleString()} (${j}%)`
        });
      }
      if (X > 0) {
        const j = Math.round(X / z * 100);
        g.push({
          source: "Completed",
          target: "Closed with BP",
          value: X,
          label: `${X.toLocaleString()} (${j}%)`
        });
      }
      return { nodes: m, links: g };
    });
    return e({ isDark: i }), (m, g) => (b(), q(gt, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      "default-open": t.initiallyOpen,
      loading: t.loading
    }, {
      headerExport: I(() => [
        t.enableExport && !t.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: t.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        t.loading ? (b(), k("div", Dm, [...g[0] || (g[0] = [
          u("div", {
            class: "flex-1 bm-skeleton-blink",
            "aria-hidden": "true"
          }, null, -1)
        ])])) : (b(), k("div", Am, [
          _.value.nodes.length > 0 ? (b(), k("div", Tm, [
            V(Ve, {
              data: _.value,
              height: "500px",
              "node-colors": p.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])) : O("", !0),
          v.value && v.value.length > 0 ? (b(), k("div", Bm, [
            u("div", Lm, [
              V(oe, {
                columns: f,
                rows: y.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: x }) => [
                  u("span", Fm, A(r(String(x.date))), 1)
                ]),
                "cell-checkinInit": I(({ row: x }) => [
                  u("span", null, A(l(x.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieval": I(({ row: x }) => [
                  u("span", null, A(h(
                    x.record_locator_init_count,
                    x.checkin_initiated
                  )), 1)
                ]),
                "cell-bookingRetrieved": I(({ row: x }) => [
                  u("span", null, A(h(
                    x.record_locator_started_count,
                    x.record_locator_init_count
                  )), 1)
                ]),
                "cell-completed": I(({ row: x }) => [
                  u("span", null, A(h(
                    x.record_locator_completed_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-closed": I(({ row: x }) => [
                  u("span", Pm, A(h(
                    x.record_locator_closed_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-failed": I(({ row: x }) => [
                  u("span", Em, A(h(
                    x.unrecovered_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-reasons": I(({ row: x }) => [
                  Array.isArray(x.failed_steps) && x.failed_steps.length > 0 ? (b(), k("div", Im, [
                    (b(!0), k(G, null, it(x.failed_steps, (w) => (b(), k("div", {
                      key: w.step_name,
                      class: "reason-item"
                    }, [
                      u("span", Rm, A(c(w.step_name)) + ":", 1),
                      u("span", Om, A(w.failed_count), 1)
                    ]))), 128))
                  ])) : (b(), k("div", Vm, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (b(), k("div", zm, [
            u("div", Nm, [
              u("div", Wm, [
                V(L(qt), { class: "empty-icon" })
              ]),
              g[1] || (g[1] = u("p", { class: "empty-title" }, "No check-in data available", -1)),
              g[2] || (g[2] = u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see check-in metrics. ", -1))
            ])
          ]))
        ]))
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), Hm = /* @__PURE__ */ rt(jm, [["__scopeId", "data-v-79f87857"]]), Ym = {
  key: 0,
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Km = {
  key: 1,
  class: "card-body"
}, Um = {
  key: 0,
  class: "chart-section"
}, qm = { class: "chart-wrapper" }, Xm = {
  key: 1,
  class: "record-locator-daily-section"
}, Gm = { class: "w-full min-w-0" }, Zm = { class: "cell-plain font-medium" }, Qm = { class: "cell-plain text-center" }, Jm = { class: "cell-plain text-center" }, t0 = { class: "cell-plain text-center" }, e0 = { class: "cell-plain text-center" }, n0 = { class: "cell-plain text-center success-value" }, a0 = { class: "cell-plain text-center failed-value" }, o0 = { class: "cell-plain text-center warning-value" }, s0 = { class: "cell-plain text-center" }, i0 = { class: "cell-plain text-center failed-value" }, l0 = {
  key: 2,
  class: "empty-state"
}, r0 = /* @__PURE__ */ J({
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
  setup(t, { expose: e, emit: n }) {
    const a = t, o = n, s = (m) => {
      o("export", m);
    }, { isDark: i } = vt(pt(a, "theme")), l = C(() => a.data?.record_locator_by_day ? [...a.data.record_locator_by_day].sort(
      (m, g) => new Date(m.date).getTime() - new Date(g.date).getTime()
    ) : []), r = [
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
    ], d = C(
      () => a.isAvianca ? [...r, ...c] : r
    ), h = C(
      () => l.value.map((m) => ({
        id: m.date,
        date: m.date,
        checkin_initiated: m.checkin_initiated,
        record_locator_init_count: m.record_locator_init_count,
        record_locator_started_count: m.record_locator_started_count,
        record_locator_completed_count: m.record_locator_completed_count,
        record_locator_closed_count: m.record_locator_closed_count,
        record_locator_failed_count: m.record_locator_failed_count,
        record_locator_abandoned_count: m.record_locator_abandoned_count,
        record_locator_create_payment_count: m.record_locator_create_payment_count,
        record_locator_create_payment_failed_count: m.record_locator_create_payment_failed_count
      }))
    ), p = C(() => a.data), v = C(() => ({
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
    })), f = (m, g) => !g || g === 0 ? "0%" : `${Math.round(m / g * 100)}%`, y = (m, g) => {
      const x = Z(m), w = f(m, g);
      return `${x} (${w})`;
    }, _ = C(() => {
      const m = [], g = [], x = /* @__PURE__ */ new Set(), w = (st) => {
        x.has(st) || (m.push({ name: st }), x.add(st));
      };
      if (!p.value.total_checkin_initiated)
        return { nodes: m, links: g };
      w("Checkin Init"), w("Booking retrive"), w("Checkin Started"), w("Checkin Completed"), w("Checkin Closed");
      const D = p.value.total_checkin_initiated, S = p.value.total_record_locator_init, $ = p.value.total_record_locator_started, M = p.value.total_record_locator_completed, F = p.value.total_record_locator_closed, T = p.value.total_record_locator_failed, B = p.value.total_record_locator_abandoned, P = p.value.total_record_locator_init_abandoned, E = p.value.total_checkin_pre_init_abandoned_error, N = p.value.total_checkin_pre_init_abandoned_voluntary, Y = E != null || N != null, W = Y ? Math.max(Number(E) || 0, 0) : 0, Q = Y ? Math.max(Number(N) || 0, 0) : 0, tt = p.value.total_record_locator_init_abandoned_error, ct = p.value.total_record_locator_init_abandoned_voluntary, z = tt != null || ct != null, K = z ? Math.max(Number(tt) || 0, 0) : 0, X = z ? Math.max(Number(ct) || 0, 0) : 0;
      if (S > 0) {
        const st = Math.round(S / D * 100);
        g.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: S,
          label: `${S.toLocaleString()} (${st}%)`
        });
      }
      const lt = D - S;
      if (Y) {
        if (Q > 0) {
          const st = Math.round(
            Q / D * 100
          );
          w("Abandoned (Init)"), g.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: Q,
            label: `${Q.toLocaleString()} (${st}%)`
          });
        }
        if (W > 0) {
          const st = Math.round(W / D * 100);
          w("Booking not retreived"), g.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: W,
            label: `${W.toLocaleString()} (${st}%)`
          });
        }
      } else if (lt > 0) {
        const st = Math.round(lt / D * 100);
        w("Abandoned (Init)"), g.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: lt,
          label: `${lt.toLocaleString()} (${st}%)`
        });
      }
      if ($ > 0) {
        const st = Math.round($ / D * 100);
        g.push({
          source: "Booking retrive",
          target: "Checkin Started",
          value: $,
          label: `${$.toLocaleString()} (${st}%)`
        });
      }
      if (z) {
        if (K > 0) {
          const st = Math.round(K / D * 100);
          w("Error"), g.push({
            source: "Booking retrive",
            target: "Error",
            value: K,
            label: `${K.toLocaleString()} (${st}%)`
          });
        }
        if (X > 0) {
          const st = Math.round(X / D * 100);
          w("Abandoned (Started)"), g.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: X,
            label: `${X.toLocaleString()} (${st}%)`
          });
        }
      } else if (P > 0) {
        const st = Math.round(
          P / D * 100
        );
        w("Abandoned (Started)"), g.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: P,
          label: `${P.toLocaleString()} (${st}%)`
        });
      }
      if (M > 0) {
        const st = Math.round(
          M / $ * 100
        );
        g.push({
          source: "Checkin Started",
          target: "Checkin Completed",
          value: M,
          label: `${M.toLocaleString()} (${st}%)`
        });
      }
      if (F > 0) {
        const st = Math.round(
          F / $ * 100
        );
        g.push({
          source: "Checkin Completed",
          target: "Checkin Closed",
          value: F,
          label: `${F.toLocaleString()} (${st}%)`
        });
      }
      if (T > 0) {
        const st = Math.round(
          T / $ * 100
        );
        w("Checkin Failed"), g.push({
          source: "Checkin Started",
          target: "Checkin Failed",
          value: T,
          label: `${T.toLocaleString()} (${st}%)`
        });
      }
      if (B > 0) {
        const st = Math.round(
          B / $ * 100
        );
        w("Abandoned (Flow)"), g.push({
          source: "Checkin Started",
          target: "Abandoned (Flow)",
          value: B,
          label: `${B.toLocaleString()} (${st}%)`
        });
      }
      return { nodes: m, links: g };
    });
    return e({ isDark: i }), (m, g) => (b(), q(gt, {
      class: "record-locator-root h-full min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: t.collapsible,
      loading: a.loading
    }, {
      headerExport: I(() => [
        t.enableExport && !a.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: t.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        a.loading ? (b(), k("div", Ym, [...g[0] || (g[0] = [
          u("div", {
            class: "flex-1 bm-skeleton-blink",
            "aria-hidden": "true"
          }, null, -1)
        ])])) : (b(), k("div", Km, [
          _.value.nodes.length > 0 ? (b(), k("section", Um, [
            u("div", qm, [
              V(Ve, {
                data: _.value,
                height: "500px",
                "node-colors": v.value,
                "use-gradient": !1,
                "node-gap": 30
              }, null, 8, ["data", "node-colors"])
            ])
          ])) : O("", !0),
          l.value && l.value.length > 0 ? (b(), k("section", Xm, [
            u("div", Gm, [
              V(oe, {
                columns: d.value,
                rows: h.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: x }) => [
                  u("span", Zm, A(L(Rt)(String(x.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": I(({ row: x }) => [
                  u("span", Qm, A(L(Z)(x.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieve": I(({ row: x }) => [
                  u("span", Jm, A(y(
                    x.record_locator_init_count,
                    x.checkin_initiated
                  )), 1)
                ]),
                "cell-checkinStarted": I(({ row: x }) => [
                  u("span", t0, A(L(Z)(x.record_locator_started_count)), 1)
                ]),
                "cell-checkinCompleted": I(({ row: x }) => [
                  u("span", e0, A(y(
                    x.record_locator_completed_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinClosed": I(({ row: x }) => [
                  u("span", n0, A(y(
                    x.record_locator_closed_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinFailed": I(({ row: x }) => [
                  u("span", a0, A(y(
                    x.record_locator_failed_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-abandoned": I(({ row: x }) => [
                  u("span", o0, A(y(
                    x.record_locator_abandoned_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-createPayment": I(({ row: x }) => [
                  u("span", s0, A(L(Z)(
                    x.record_locator_create_payment_count ?? 0
                  )), 1)
                ]),
                "cell-failedPayment": I(({ row: x }) => [
                  u("span", i0, A(L(Z)(
                    x.record_locator_create_payment_failed_count ?? 0
                  )), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (b(), k("section", l0, [...g[1] || (g[1] = [
            u("div", { class: "empty-state-content" }, [
              u("div", { class: "empty-icon-wrapper" }, [
                u("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  })
                ])
              ]),
              u("p", { class: "empty-title" }, "No record locator data available"),
              u("p", { class: "empty-description" }, " No record locator data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])]))
        ]))
      ]),
      _: 1
    }, 8, ["collapsible", "loading"]));
  }
}), Ki = /* @__PURE__ */ rt(r0, [["__scopeId", "data-v-b8e7daf9"]]), c0 = {
  key: 0,
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, d0 = {
  key: 1,
  class: "card-body"
}, u0 = {
  key: 0,
  class: "checkin-segments-daily-section"
}, h0 = { class: "w-full min-w-0" }, f0 = { class: "segment-plain" }, g0 = { class: "segment-plain" }, p0 = { class: "segment-plain" }, m0 = { class: "percentage-value" }, b0 = { class: "percentage-value" }, v0 = { class: "percentage-value success" }, y0 = {
  key: 1,
  class: "empty-state"
}, x0 = /* @__PURE__ */ J({
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
  setup(t, { expose: e, emit: n }) {
    const a = t, o = n, s = (p) => {
      o("export", p);
    }, { isDark: i } = vt(pt(a, "theme")), l = [
      { key: "departure", label: "Departure", align: "center" },
      { key: "connection", label: "Connection", align: "center" },
      { key: "arrival", label: "Arrival", align: "center" },
      { key: "trip", label: "Trip", align: "center" },
      { key: "init", label: "Init", align: "center" },
      { key: "started", label: "Started (%)", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed (%)", align: "center" }
    ], r = C(
      () => a.data.map((p, v) => ({
        id: `segment-${v}-${p.departure_airport}-${p.arrival_airport}-${p.segment_init_count}-${p.segment_started_count}`,
        departure_airport: p.departure_airport,
        conexion_airport: p.conexion_airport,
        arrival_airport: p.arrival_airport,
        segment_init_count: p.segment_init_count,
        segment_started_count: p.segment_started_count,
        segment_completed_count: p.segment_completed_count,
        segment_closed_count: p.segment_closed_count
      }))
    ), c = (p, v) => !v || v === 0 || !p ? "0%" : `${Math.round(p / v * 100)}%`, d = (p) => !p || p === "None" ? "-" : String(p).trim().replace(/_[0-9]+$/i, ""), h = (p) => {
      const v = d(p?.departure_airport), f = d(p?.arrival_airport);
      return v === "-" || f === "-" ? !1 : v === f;
    };
    return e({ isDark: i }), (p, v) => (b(), q(gt, {
      class: "checkin-segments-root h-full min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: t.collapsible,
      "default-open": t.initiallyOpen,
      loading: t.loading
    }, {
      headerExport: I(() => [
        t.enableExport && !a.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: t.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        t.loading ? (b(), k("div", c0, [...v[0] || (v[0] = [
          u("div", {
            class: "flex-1 bm-skeleton-blink",
            "aria-hidden": "true"
          }, null, -1)
        ])])) : (b(), k("div", d0, [
          a.data.length > 0 ? (b(), k("section", u0, [
            u("div", h0, [
              V(oe, {
                columns: l,
                rows: r.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-departure": I(({ row: f }) => [
                  u("span", f0, A(d(f.departure_airport)), 1)
                ]),
                "cell-connection": I(({ row: f }) => [
                  u("span", {
                    class: U(["segment-plain", {
                      "segment-plain--muted": d(f.conexion_airport) === "-"
                    }])
                  }, A(d(f.conexion_airport)), 3)
                ]),
                "cell-arrival": I(({ row: f }) => [
                  u("span", g0, A(d(f.arrival_airport)), 1)
                ]),
                "cell-trip": I(({ row: f }) => [
                  u("span", p0, A(h(f) ? "Roundtrip" : "One way"), 1)
                ]),
                "cell-init": I(({ row: f }) => [
                  _t(A(L(Z)(f.segment_init_count)), 1)
                ]),
                "cell-started": I(({ row: f }) => [
                  u("span", m0, A(c(
                    f.segment_started_count,
                    f.segment_init_count
                  )), 1)
                ]),
                "cell-completed": I(({ row: f }) => [
                  u("span", b0, A(c(
                    f.segment_completed_count,
                    f.segment_init_count
                  )), 1)
                ]),
                "cell-closed": I(({ row: f }) => [
                  u("span", v0, A(c(
                    f.segment_closed_count,
                    f.segment_init_count
                  )), 1)
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (b(), k("section", y0, [...v[1] || (v[1] = [
            u("div", { class: "empty-state-content" }, [
              u("div", { class: "empty-icon-wrapper" }, [
                u("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  })
                ])
              ]),
              u("p", { class: "empty-title" }, "No segment data available"),
              u("p", { class: "empty-description" }, " No flight segment data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])]))
        ]))
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}), Ui = /* @__PURE__ */ rt(x0, [["__scopeId", "data-v-4d0aad47"]]), _0 = { class: "checkin-container__body" }, k0 = /* @__PURE__ */ J({
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
  setup(t, { emit: e }) {
    const n = t, a = e, o = C(() => n.loading || n.checkinLoading);
    C(() => n.loading || n.checkinMetricsLoading);
    const s = C(() => n.loading || n.recordLocatorLoading || n.checkinMetricsLoading), i = C(() => n.loading || n.segmentsLoading), l = C(() => n.recordLocatorData ?? n.checkinMetricsData);
    function r(h, p) {
      a("export", { source: h, format: p });
    }
    function c(h) {
      return typeof h == "object" && h !== null && "source" in h;
    }
    function d(h) {
      if (c(h)) {
        a("export", h);
        return;
      }
      r("checkinSegments", h);
    }
    return (h, p) => (b(), q(gt, {
      class: "checkin-container-root w-full",
      title: "Check in",
      subtitle: "Check-in flows, metrics by record locator and segment breakdown.",
      "default-open": t.containerInitiallyOpen,
      loading: t.loading
    }, {
      default: I(() => [
        u("div", _0, [
          t.showCheckin ? (b(), q(Yi, {
            key: 0,
            class: "w-full min-h-0",
            collapsible: !1,
            "initially-open": t.childrenInitiallyOpen,
            loading: o.value,
            "checkin-data": t.checkinData,
            "failed-data": t.checkinFailedData,
            "enable-export": t.enableExport,
            "export-loading": t.exportLoading,
            onExport: p[0] || (p[0] = (v) => r("checkin", v))
          }, null, 8, ["initially-open", "loading", "checkin-data", "failed-data", "enable-export", "export-loading"])) : O("", !0),
          V(Ki, {
            collapsible: !1,
            loading: s.value,
            data: l.value,
            "is-avianca": t.isAvianca,
            theme: t.theme,
            "enable-export": t.enableExport,
            "export-loading": t.exportLoading,
            onExport: p[1] || (p[1] = (v) => r("recordLocator", v))
          }, null, 8, ["loading", "data", "is-avianca", "theme", "enable-export", "export-loading"]),
          V(Ui, {
            collapsible: !1,
            "initially-open": t.childrenInitiallyOpen,
            loading: i.value,
            data: t.segmentsData ?? [],
            theme: t.theme,
            "enable-export": t.enableExport,
            "export-loading": t.exportLoading,
            onExport: d
          }, null, 8, ["initially-open", "loading", "data", "theme", "enable-export", "export-loading"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), w0 = /* @__PURE__ */ rt(k0, [["__scopeId", "data-v-d7fe32b0"]]), C0 = {
  key: 0,
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, $0 = {
  key: 1,
  class: "card-body"
}, M0 = { class: "chart-section" }, S0 = { class: "chart-wrapper" }, D0 = {
  key: 1,
  class: "empty-chart"
}, A0 = { class: "payment-success-summary" }, T0 = {
  key: 0,
  class: "disruption-daily-section"
}, B0 = { class: "w-full min-w-0" }, L0 = { class: "font-medium text-center" }, F0 = { class: "text-center" }, P0 = { class: "text-center" }, E0 = { class: "percentage-text" }, I0 = { class: "text-center" }, R0 = { class: "abandoned-value" }, O0 = { class: "badges-container badges-wrap" }, V0 = { class: "badges-container badges-wrap" }, z0 = {
  key: 1,
  class: "empty-state"
}, N0 = /* @__PURE__ */ J({
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
  setup(t, { emit: e }) {
    function n(m) {
      return m;
    }
    const a = t, o = e, s = (m) => {
      o("export", m);
    }, i = C(() => a.data?.disruption_by_day ? [...a.data.disruption_by_day].sort(
      (m, g) => new Date(m.date).getTime() - new Date(g.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "abandoned", label: "Abandoned (%)", align: "center" },
      { key: "voluntary", label: "Voluntary", align: "left" },
      { key: "involuntary", label: "Involuntary", align: "left" }
    ], r = C(
      () => i.value.map((m) => ({
        id: m.date,
        ...m
      }))
    ), c = C(() => a.data?.total_payment_success || []), d = C(() => {
      const m = c.value;
      return m.length === 0 ? p(0) : m.map((g) => `${g.currency} ${p(g.total_value)}`).join(" · ");
    }), h = (m, g) => !g || g === 0 ? "0%" : `${Math.round(m / g * 100)}%`, p = (m) => Ct(m), v = (m) => (m ?? []).reduce((g, x) => g + (x.count ?? 0), 0), f = (m) => typeof m.sell_success_count == "number" ? m.sell_success_count : v(m.payment_success_total), y = C(() => {
      const m = a.data, g = m.total_disruption_conversations || 0, x = m.total_disruption_initiated || 0, w = m.total_voluntary || 0, D = m.total_involuntary || 0, S = m.total_accepted || 0, $ = m.total_confirmed || 0, M = typeof m.total_sell_success == "number" ? m.total_sell_success : v(m.total_payment_success), F = m.total_sell_failed || 0, T = Math.max(0, g - x), B = Math.max(
        0,
        x - w - D
      ), P = Math.max(0, D - S), E = Math.max(0, w - $), N = F, Y = Math.max(0, $ - M - N), W = (ct, z) => {
        const K = z > 0 ? Math.round(ct / z * 100) : 0;
        return `${ct.toLocaleString()} (${K}%)`;
      }, Q = [
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
      ], tt = [];
      return x > 0 && tt.push({
        source: "Initiated",
        target: "Started",
        value: x,
        label: W(x, g)
      }), T > 0 && tt.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: T,
        label: W(T, g)
      }), w > 0 && tt.push({
        source: "Started",
        target: "Voluntary",
        value: w,
        label: W(w, g)
      }), D > 0 && tt.push({
        source: "Started",
        target: "Involuntary",
        value: D,
        label: W(D, g)
      }), B > 0 && tt.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: B,
        label: W(B, g)
      }), S > 0 && tt.push({
        source: "Involuntary",
        target: "Accepted",
        value: S,
        label: W(S, g)
      }), P > 0 && tt.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: P,
        label: W(P, g)
      }), $ > 0 && tt.push({
        source: "Voluntary",
        target: "Confirmed",
        value: $,
        label: W($, g)
      }), E > 0 && tt.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: E,
        label: W(E, g)
      }), M > 0 && tt.push({
        source: "Confirmed",
        target: "Paid",
        value: M,
        label: W(M, g)
      }), N > 0 && tt.push({
        source: "Confirmed",
        target: "Rejected",
        value: N,
        label: W(N, g)
      }), Y > 0 && tt.push({
        source: "Confirmed",
        target: "Not Paid",
        value: Y,
        label: W(Y, g)
      }), { nodes: Q, links: tt };
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
    return (m, g) => (b(), q(gt, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking",
      loading: t.loading
    }, {
      headerExport: I(() => [
        t.enableExport && !a.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: t.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        t.loading ? (b(), k("div", C0, [...g[0] || (g[0] = [
          u("div", {
            class: "flex-1 bm-skeleton-blink",
            "aria-hidden": "true"
          }, null, -1)
        ])])) : (b(), k("div", $0, [
          u("section", M0, [
            u("div", S0, [
              y.value.nodes.length > 0 && y.value.links.length > 0 ? (b(), q(Ve, {
                key: 0,
                data: y.value,
                "node-colors": _,
                height: "500px"
              }, null, 8, ["data"])) : (b(), k("div", D0, [...g[1] || (g[1] = [
                u("p", { class: "empty-chart-text" }, " No disruption data available for visualization ", -1)
              ])]))
            ])
          ]),
          u("section", A0, [
            V(ut, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: d.value
            }, null, 8, ["value"])
          ]),
          i.value && i.value.length > 0 ? (b(), k("section", T0, [
            g[2] || (g[2] = u("div", { class: "section-header" }, [
              u("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            u("div", B0, [
              V(oe, {
                columns: l,
                rows: r.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: x }) => [
                  u("span", L0, A(L(Rt)(String(x.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": I(({ row: x }) => [
                  u("span", F0, A(L(Z)(Number(x.disruption_conversations))), 1)
                ]),
                "cell-started": I(({ row: x }) => [
                  u("span", P0, [
                    _t(A(L(Z)(Number(x.disruption_initiated_count))) + " ", 1),
                    u("span", E0, " (" + A(h(
                      Number(x.disruption_initiated_count),
                      Number(x.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-abandoned": I(({ row: x }) => [
                  u("span", I0, [
                    u("span", R0, A(L(Z)(
                      Number(x.disruption_initiated_count) - Number(x.voluntary_count) - Number(x.involuntary_count)
                    )) + " (" + A(h(
                      Number(x.disruption_initiated_count) - Number(x.voluntary_count) - Number(x.involuntary_count),
                      Number(x.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-voluntary": I(({ row: x }) => [
                  u("div", O0, [
                    (b(!0), k(G, null, it([x], (w, D) => (b(), k(G, { key: D }, [
                      V(jt, {
                        color: "neutral",
                        outlined: !0
                      }, {
                        default: I(() => [
                          _t(" VOL " + A(L(Z)(w.voluntary_count)) + " (" + A(h(
                            w.voluntary_count,
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      V(jt, { color: "success" }, {
                        default: I(() => [
                          _t(" Confirm " + A(L(Z)(w.confirmed_count)) + " (" + A(h(
                            w.confirmed_count,
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      V(jt, { color: "warning" }, {
                        default: I(() => [
                          _t(" Not Confirm " + A(L(Z)(w.voluntary_count - w.confirmed_count)) + " (" + A(h(
                            w.voluntary_count - w.confirmed_count,
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      V(jt, { color: "danger" }, {
                        default: I(() => [
                          _t(" Reject " + A(L(Z)(w.sell_failed_count)) + " (" + A(h(
                            w.sell_failed_count,
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      V(jt, { color: "orange" }, {
                        default: I(() => [
                          _t(" Not Paid " + A(L(Z)(
                            Math.max(
                              0,
                              w.confirmed_count - f(w) - w.sell_failed_count
                            )
                          )) + " (" + A(h(
                            Math.max(
                              0,
                              w.confirmed_count - f(w) - w.sell_failed_count
                            ),
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      V(jt, {
                        color: "success",
                        outlined: !0
                      }, {
                        default: I(() => [
                          _t(" Finish " + A(L(Z)(f(w))) + " (" + A(h(
                            f(w),
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      (b(!0), k(G, null, it(w.payment_success_total || [], (S) => (b(), q(jt, {
                        key: `${w.date}-${S.currency}`,
                        color: "neutral"
                      }, {
                        default: I(() => [
                          _t(A(S.currency) + " " + A(p(S.total_value)), 1)
                        ]),
                        _: 2
                      }, 1024))), 128))
                    ], 64))), 128))
                  ])
                ]),
                "cell-involuntary": I(({ row: x }) => [
                  u("div", V0, [
                    (b(!0), k(G, null, it([x], (w, D) => (b(), k(G, { key: D }, [
                      V(jt, { color: "purple" }, {
                        default: I(() => [
                          _t(" INV " + A(L(Z)(w.involuntary_count)) + " (" + A(h(
                            w.involuntary_count,
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      V(jt, { color: "danger" }, {
                        default: I(() => [
                          _t(" Human " + A(L(Z)(w.involuntary_count - w.accepted_count)) + " (" + A(h(
                            w.involuntary_count - w.accepted_count,
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      V(jt, { color: "success" }, {
                        default: I(() => [
                          _t(" Accept " + A(L(Z)(w.accepted_count)) + " (" + A(h(
                            w.accepted_count,
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024)
                    ], 64))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (b(), k("section", z0, [...g[3] || (g[3] = [
            u("div", { class: "empty-state-content" }, [
              u("div", { class: "empty-icon-wrapper" }, [
                u("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  })
                ])
              ]),
              u("p", { class: "empty-title" }, "No disruption data available"),
              u("p", { class: "empty-description" }, " No disruption data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])]))
        ]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), W0 = /* @__PURE__ */ rt(N0, [["__scopeId", "data-v-0e428bca"]]), j0 = {
  key: 0,
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, H0 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, Y0 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, K0 = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, U0 = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, q0 = /* @__PURE__ */ J({
  __name: "FAQ",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(t, { expose: e, emit: n }) {
    const a = t, o = n, s = (v) => {
      o("export", v);
    }, i = pt(a, "theme"), { isDark: l } = vt(i), r = {
      airline_information: "#8b5cf6",
      booking_info: "#f59e0b",
      flight_status: "#06b6d4"
    }, c = ot({
      labels: [],
      datasets: []
    }), d = C(
      () => a.data ?? {
        total_faq_events: 0,
        total_documents_found: 0,
        total_airline_information_retrieved: 0,
        total_booking_info_retrieved: 0,
        total_flight_status_retrieved: 0,
        faq_by_day: []
      }
    ), h = C(() => {
      const v = d.value, f = v.total_airline_information_retrieved + v.total_booking_info_retrieved + v.total_flight_status_retrieved, y = (g) => f > 0 ? (g / f * 100).toFixed(1) : "0.0", _ = v.total_faq_events, m = _ > 0 ? `${(v.total_documents_found / _ * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: r.airline_information,
          value: `${y(v.total_airline_information_retrieved)}%`,
          subvalue: `${Z(v.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: r.booking_info,
          value: `${y(v.total_booking_info_retrieved)}%`,
          subvalue: `${Z(v.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: r.flight_status,
          value: `${y(v.total_flight_status_retrieved)}%`,
          subvalue: `${Z(v.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: Z(v.total_documents_found),
          subvalue: m
        }
      ];
    }), p = (v) => {
      if (!v) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const f = v.faq_by_day || [];
      if (f.length > 0) {
        const y = f.map(
          (x) => Rt(x.date).format("MMM DD")
        ), _ = f.map(
          (x) => x.airline_information_retrieved_count || 0
        ), m = f.map(
          (x) => x.flight_status_retrieved_count || 0
        ), g = f.map(
          (x) => x.booking_info_retrieved_count || 0
        );
        c.value = {
          labels: y,
          datasets: [
            {
              label: "Airline Information",
              data: _,
              borderColor: r.airline_information,
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              fill: !0
            },
            {
              label: "Flight Status",
              data: m,
              borderColor: r.flight_status,
              backgroundColor: "rgba(6, 182, 212, 0.1)",
              fill: !0
            },
            {
              label: "Booking Information",
              data: g,
              borderColor: r.booking_info,
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              fill: !0
            }
          ]
        };
      } else
        c.value = { labels: [], datasets: [] };
    };
    return Bt(
      () => a.data,
      (v) => {
        p(v ?? null);
      },
      { deep: !0, immediate: !0 }
    ), e({ isDark: l }), (v, f) => (b(), q(gt, {
      class: "w-full min-h-0 self-start",
      title: "FAQ Metrics",
      subtitle: "FAQ volume by category",
      collapsible: !1,
      loading: a.loading
    }, {
      headerExport: I(() => [
        t.enableExport && !a.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          loading: t.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        u("div", {
          class: U(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          a.loading ? (b(), k("div", j0, [...f[0] || (f[0] = [
            u("div", {
              class: "flex-1 bm-skeleton-blink",
              "aria-hidden": "true"
            }, null, -1)
          ])])) : (b(), k(G, { key: 1 }, [
            c.value.labels && c.value.labels.length ? (b(), k("section", H0, [
              u("div", Y0, [
                V(he, {
                  data: c.value,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              u("div", K0, [
                (b(!0), k(G, null, it(h.value, (y) => (b(), q(ut, {
                  key: y.name,
                  class: "min-w-0",
                  color: y.color,
                  title: y.label,
                  value: y.value,
                  subvalue: y.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ])
            ])) : (b(), k("section", U0, [...f[1] || (f[1] = [
              u("div", { class: "max-w-[360px] px-4 text-center" }, [
                u("div", { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, [
                  u("svg", {
                    class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "aria-hidden": "true"
                  }, [
                    u("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    })
                  ])
                ]),
                u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No FAQ data available "),
                u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No FAQ consultation data found for the selected period. Try adjusting the date range. ")
              ], -1)
            ])]))
          ], 64))
        ], 2)
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), X0 = /* @__PURE__ */ rt(q0, [["__scopeId", "data-v-d1330990"]]), G0 = {
  key: 0,
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Z0 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, Q0 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, J0 = {
  key: 0,
  class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4"
}, tb = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, eb = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, nb = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, ab = { class: "max-w-[360px] px-4 text-center" }, ob = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, sb = /* @__PURE__ */ J({
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
  setup(t, { expose: e, emit: n }) {
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
    }, o = t, s = n, i = (p) => {
      s("export", p);
    }, l = pt(o, "theme"), { isDark: r } = vt(l), c = C(() => {
      const p = o.data?.agents_by_day || {}, v = Object.keys(p).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const f = /* @__PURE__ */ new Set();
      for (const m of Object.values(p))
        for (const g of Object.keys(m))
          f.add(g);
      const _ = Array.from(f).map((m) => {
        const g = m.toLowerCase(), x = a[g] || a[m] || "#94a3b8";
        return {
          label: m.charAt(0).toUpperCase() + m.slice(1).replace(/_/g, " "),
          data: v.map((w) => p[w]?.[m] || 0),
          borderColor: x
        };
      });
      return {
        labels: v.map((m) => Rt(m).format("MMM DD")),
        datasets: _
      };
    }), d = C(() => {
      const p = o.data?.agents_by_day || {}, v = {};
      for (const y of Object.values(p))
        for (const [_, m] of Object.entries(y))
          v[_] = (v[_] || 0) + m;
      const f = Object.values(v).reduce((y, _) => y + _, 0);
      return f === 0 ? [] : Object.entries(v).sort(([, y], [, _]) => _ - y).map(([y, _]) => {
        const m = y.toLowerCase();
        return {
          name: y,
          label: y.charAt(0).toUpperCase() + y.slice(1).replace(/_/g, " "),
          total: _,
          percentage: (_ / f * 100).toFixed(1),
          color: a[m] || a[y] || "#94a3b8"
        };
      });
    }), h = C(() => d.value.slice(0, 4));
    return e({ isDark: r }), (p, v) => (b(), q(gt, {
      class: "w-full min-h-0 self-start",
      title: "Interactions by Agent",
      subtitle: "Responses sent by AI agents",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: I(() => [
        t.enableExport && !o.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          loading: t.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        u("div", {
          class: U(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", o.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          o.loading ? (b(), k("div", G0, [...v[0] || (v[0] = [
            u("div", {
              class: "flex-1 bm-skeleton-blink",
              "aria-hidden": "true"
            }, null, -1)
          ])])) : (b(), k(G, { key: 1 }, [
            c.value.labels && c.value.labels.length ? (b(), k("section", Z0, [
              u("div", Q0, [
                V(he, {
                  data: c.value,
                  options: t.options,
                  theme: l.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              h.value.length ? (b(), k("div", J0, [
                (b(!0), k(G, null, it(h.value, (f) => (b(), q(ut, {
                  key: f.name,
                  class: "min-w-0",
                  color: f.color,
                  title: f.label,
                  value: `${f.percentage}%`,
                  subvalue: `${L(Z)(f.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ])) : O("", !0)
            ])) : d.value.length ? (b(), k("section", tb, [
              u("div", eb, [
                (b(!0), k(G, null, it(h.value, (f) => (b(), q(ut, {
                  key: f.name,
                  class: "min-w-0",
                  color: f.color,
                  title: f.label,
                  value: `${f.percentage}%`,
                  subvalue: `${L(Z)(f.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ])
            ])) : O("", !0),
            d.value.length ? O("", !0) : (b(), k("section", nb, [
              u("div", ab, [
                u("div", ob, [
                  V(L(qt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                v[1] || (v[1] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agent interactions data ", -1)),
                v[2] || (v[2] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
              ])
            ]))
          ], 64))
        ], 2)
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), ib = /* @__PURE__ */ rt(sb, [["__scopeId", "data-v-e31211f4"]]), lb = {
  key: 0,
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, rb = {
  key: 1,
  class: "card-body"
}, cb = {
  key: 0,
  class: "chart-section"
}, db = {
  key: 1,
  class: "empty-state"
}, ub = {
  key: 2,
  class: "comparison-section"
}, hb = { class: "comparison-grid" }, fb = /* @__PURE__ */ J({
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
  setup(t, { expose: e, emit: n }) {
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
    }, o = [
      "#B0C4DE",
      "#C9A0F2",
      "#F5C26B",
      "#8BE8B0",
      "#F2A07A",
      "#7BA3E8"
    ], s = t, i = n, l = (f) => {
      i("export", f);
    }, { isDark: r } = vt(pt(s, "theme"));
    C(() => s.data?.total_sell_success ?? 0);
    const c = C(() => {
      const f = /* @__PURE__ */ new Set();
      for (const y of s.data?.sales_by_channel_by_day ?? [])
        for (const _ of Object.keys(y.channels))
          f.add(_);
      return Array.from(f).sort();
    }), d = (f, y) => a[f.toLowerCase()] ?? o[y % o.length];
    function h(f) {
      return f.replace(/_/g, " ").toUpperCase();
    }
    function p(f) {
      if (f.delta === null) return "No previous data";
      const y = Z(f.previous), _ = `${Math.abs(f.delta).toFixed(1)}%`;
      return f.delta === 0 ? `0.0% vs prev. period (${y})` : `${f.delta > 0 ? "↑" : "↓"} ${_} vs prev. period (${y})`;
    }
    const v = C(() => {
      const f = s.data?.sales_by_channel_by_day ?? [];
      if (f.length === 0) return { labels: [], datasets: [] };
      const y = f.map((m) => Rt(m.date).format("MMM-DD")), _ = c.value.map((m, g) => ({
        label: m,
        data: f.map((x) => x.channels[m] ?? 0),
        backgroundColor: d(m, g),
        borderRadius: 4
      }));
      return { labels: y, datasets: _ };
    });
    return e({ isDark: r }), (f, y) => (b(), q(gt, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": t.initiallyOpen,
      loading: s.loading
    }, {
      headerExport: I(() => [
        t.enableExport && !s.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: l,
          loading: t.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        s.loading ? (b(), k("div", lb, [...y[0] || (y[0] = [
          u("div", {
            class: "flex-1 bm-skeleton-blink",
            "aria-hidden": "true"
          }, null, -1)
        ])])) : (b(), k("div", rb, [
          v.value.labels.length > 0 ? (b(), k("section", cb, [
            V(be, {
              data: v.value,
              stacked: !0
            }, null, 8, ["data"])
          ])) : (b(), k("section", db, [...y[1] || (y[1] = [
            u("div", { class: "empty-state-content" }, [
              u("div", { class: "empty-icon-wrapper" }, [
                u("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  })
                ])
              ]),
              u("p", { class: "empty-title" }, "No sales data available"),
              u("p", { class: "empty-description" }, " No sales by channel data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])])),
          t.channelComparison.length > 0 ? (b(), k("section", ub, [
            u("div", hb, [
              (b(!0), k(G, null, it(t.channelComparison, (_, m) => (b(), q(L(ut), {
                key: _.channel,
                color: d(_.channel, m),
                title: h(_.channel),
                value: L(Z)(_.current),
                subvalue: p(_)
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : O("", !0)
        ]))
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), qi = /* @__PURE__ */ rt(fb, [["__scopeId", "data-v-40176220"]]), gb = {
  key: 0,
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, pb = {
  key: 1,
  class: "card-body"
}, mb = {
  key: 0,
  class: "chart-section"
}, bb = { class: "chart-wrapper" }, vb = {
  key: 1,
  class: "empty-state"
}, yb = { class: "seller-value-cards" }, xb = {
  key: 2,
  class: "seller-daily-section"
}, _b = { class: "w-full min-w-0" }, kb = { class: "sl-cell font-medium" }, wb = { class: "sl-cell text-center" }, Cb = { class: "sl-cell text-center" }, $b = { class: "sl-cell text-center" }, Mb = { class: "sl-cell text-center" }, Sb = { class: "sl-cell text-center" }, Db = { class: "sl-cell text-center success-value" }, Ab = {
  key: 0,
  class: "currency-cell-list"
}, Tb = {
  key: 1,
  class: "empty-cell"
}, Bb = { class: "sl-cell text-center success-value" }, Lb = { class: "sl-cell text-center" }, Fb = { class: "sl-cell text-center success-value" }, Pb = {
  key: 0,
  class: "currency-cell-list"
}, Eb = {
  key: 1,
  class: "empty-cell"
}, Ib = { class: "sl-cell text-center success-value" }, Rb = { class: "sl-cell text-center" }, Ob = { class: "sl-cell text-center success-value" }, Vb = {
  key: 0,
  class: "currency-cell-list"
}, zb = { key: 1 }, Nb = {
  key: 0,
  class: "failed-reasons"
}, Wb = { class: "reason-name" }, jb = { class: "reason-count" }, Hb = {
  key: 1,
  class: "empty-cell"
}, Yb = /* @__PURE__ */ J({
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
  setup(t, { expose: e, emit: n }) {
    function a(B) {
      return B;
    }
    const o = t, s = n, i = (B) => {
      s("export", B);
    }, { isDark: l } = vt(pt(o, "theme")), r = C(() => {
      if (!o.sellerData?.seller_by_day) return [];
      const B = [...o.sellerData.seller_by_day];
      return o.failedData?.failed_by_reason_by_day && o.failedData.failed_by_reason_by_day.forEach((P) => {
        const E = B.findIndex(
          (N) => N.date === P.date
        );
        E !== -1 ? B[E] = { ...B[E], reasons: P.reasons } : B.push({
          date: P.date,
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
          reasons: P.reasons
        });
      }), B.sort(
        (P, E) => new Date(P.date).getTime() - new Date(E.date).getTime()
      );
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
    ], d = C(
      () => r.value.map((B) => ({
        id: B.date,
        ...B
      }))
    ), h = C(() => o.sellerData), p = C(() => o.failedData), v = C(
      () => Array.isArray(o.sellerData.total_value_sell_success) ? o.sellerData.total_value_sell_success : []
    ), f = C(
      () => Array.isArray(o.sellerData.total_value_sell_bank_transfer) ? o.sellerData.total_value_sell_bank_transfer : []
    ), y = C(
      () => Array.isArray(o.sellerData.total_value_sell_cash_option) ? o.sellerData.total_value_sell_cash_option : []
    ), _ = C(() => {
      const B = v.value;
      return B.length > 0 ? B.map(
        (P) => `${P.currency} ${De(P.total_value)}`
      ).join(" · ") : T(o.sellerData.total_value_sell_success);
    });
    function m(B) {
      return B.length > 0 ? B.map(
        (P) => `${P.currency} ${De(P.total_value)}`
      ).join(" · ") : "—";
    }
    const g = C(
      () => m(f.value)
    ), x = C(
      () => m(y.value)
    ), w = C(() => {
      const {
        total_seller_conversations: B = 0,
        total_sell_started: P = 0,
        total_sell_booking_created: E = 0,
        total_sell_success: N = 0,
        total_sell_bank_transfer: Y = 0,
        total_sell_cash_option: W = 0,
        total_sell_success_bank_transfer: Q = 0,
        total_sell_success_cash: tt = 0
      } = h.value, { failed_by_reason_by_day: ct = [] } = p.value;
      if (B === 0) return { nodes: [], links: [] };
      const z = Math.max(
        0,
        N - (Q ?? 0) - (tt ?? 0)
      ), K = [
        { name: "Sell Initiated", value: B },
        { name: "Sell Started", value: P },
        { name: "Booking Created", value: E },
        { name: "Sell Success", value: z }
      ], X = [], lt = B - P;
      if (lt > 0) {
        const j = Math.round(lt / B * 100);
        K.push({ name: "Abandoned (Init)", value: lt }), X.push({
          source: "Sell Initiated",
          target: "Abandoned (Init)",
          value: lt,
          label: `${lt.toLocaleString()} (${j}%)`
        });
      }
      if (P > 0) {
        const j = Math.round(P / B * 100);
        X.push({
          source: "Sell Initiated",
          target: "Sell Started",
          value: P,
          label: `${P.toLocaleString()} (${j}%)`
        });
      }
      const st = ct.reduce(
        (j, et) => (et.reasons && Array.isArray(et.reasons) && et.reasons.forEach((nt) => {
          const dt = nt.reason, mt = nt.failed_count;
          j[dt] = (j[dt] || 0) + mt;
        }), j),
        {}
      );
      if (E > 0) {
        const j = Math.round(E / B * 100);
        X.push({
          source: "Sell Started",
          target: "Booking Created",
          value: E,
          label: `${E.toLocaleString()} (${j}%)`
        });
      }
      if (Y > 0) {
        const j = Math.round(Y / B * 100);
        K.push({ name: "Bank Transfer", value: Y }), X.push({
          source: "Booking Created",
          target: "Bank Transfer",
          value: Y,
          label: `${Y.toLocaleString()} (${j}%)`
        });
      }
      if (W > 0) {
        const j = Math.round(W / B * 100);
        K.push({ name: "Cash Option", value: W }), X.push({
          source: "Booking Created",
          target: "Cash Option",
          value: W,
          label: `${W.toLocaleString()} (${j}%)`
        });
      }
      if (z > 0) {
        const j = Math.round(z / B * 100);
        X.push({
          source: "Booking Created",
          target: "Sell Success",
          value: z,
          label: `${z.toLocaleString()} (${j}%)`
        });
      }
      if ((Q ?? 0) > 0) {
        const j = Math.round(
          (Q ?? 0) / B * 100
        );
        K.push({
          name: "Bank Transfer Success",
          value: Q ?? 0
        }), X.push({
          source: "Bank Transfer",
          target: "Bank Transfer Success",
          value: Q ?? 0,
          label: `${(Q ?? 0).toLocaleString()} (${j}%)`
        });
      }
      if ((tt ?? 0) > 0) {
        const j = Math.round((tt ?? 0) / B * 100);
        K.push({ name: "Cash Option Success", value: tt ?? 0 }), X.push({
          source: "Cash Option",
          target: "Cash Option Success",
          value: tt ?? 0,
          label: `${(tt ?? 0).toLocaleString()} (${j}%)`
        });
      }
      const Dt = E - z - Y - W;
      if (Dt > 0) {
        const j = Math.round(Dt / B * 100);
        K.push({ name: "Failed at Completion", value: Dt }), X.push({
          source: "Booking Created",
          target: "Failed at Completion",
          value: Dt,
          label: `${Dt.toLocaleString()} (${j}%)`
        });
      }
      const xt = P - E;
      if (xt > 0) {
        const j = Math.round(xt / B * 100);
        K.push({ name: "Failed at Booking", value: xt }), X.push({
          source: "Sell Started",
          target: "Failed at Booking",
          value: xt,
          label: `${xt.toLocaleString()} (${j}%)`
        });
      }
      if (Object.keys(st).length > 0) {
        const j = Object.values(st).reduce(
          (nt, dt) => nt + dt,
          0
        ), et = xt - j;
        if (Object.entries(st).filter(([, nt]) => nt > 0).sort(([, nt], [, dt]) => dt - nt).forEach(([nt, dt]) => {
          const mt = Math.round(dt / B * 100);
          K.push({ name: `Failed: ${nt}`, value: dt }), X.push({
            source: "Failed at Booking",
            target: `Failed: ${nt}`,
            value: dt,
            label: `${dt.toLocaleString()} (${mt}%)`
          });
        }), et > 0) {
          const nt = Math.round(et / B * 100);
          K.push({ name: "Failed: Without Reason", value: et }), X.push({
            source: "Failed at Booking",
            target: "Failed: Without Reason",
            value: et,
            label: `${et.toLocaleString()} (${nt}%)`
          });
        }
      }
      return { nodes: K, links: X };
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
    }, S = C(() => D), $ = (B, P) => !P || P === 0 ? "0%" : `${Math.round(B / P * 100)}%`, M = (B, P) => {
      const E = Z(B), N = $(B, P);
      return `${E} (${N})`;
    }, F = (B) => B == null ? 0 : typeof B == "number" ? B : Array.isArray(B) ? B.reduce((P, E) => P + (E.total_value || 0), 0) : 0, T = (B) => De(F(B));
    return e({ isDark: l }), (B, P) => (b(), q(gt, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": t.initiallyOpen,
      loading: o.loading
    }, {
      headerExport: I(() => [
        t.enableExport && !o.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: t.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        o.loading ? (b(), k("div", gb, [...P[0] || (P[0] = [
          u("div", {
            class: "flex-1 bm-skeleton-blink",
            "aria-hidden": "true"
          }, null, -1)
        ])])) : (b(), k("div", pb, [
          w.value.nodes.length > 0 ? (b(), k("section", mb, [
            u("div", bb, [
              V(Ve, {
                data: w.value,
                "node-colors": S.value,
                title: "",
                height: "320px"
              }, null, 8, ["data", "node-colors"])
            ])
          ])) : (b(), k("section", vb, [...P[1] || (P[1] = [
            u("div", { class: "empty-state-content" }, [
              u("div", { class: "empty-icon-wrapper" }, [
                u("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  })
                ])
              ]),
              u("p", { class: "empty-title" }, "No sales data available"),
              u("p", { class: "empty-description" }, " No sales data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])])),
          u("section", yb, [
            V(ut, {
              class: "seller-value-card",
              color: "var(--kiut-success)",
              title: "Total Sales Value",
              value: _.value
            }, null, 8, ["value"]),
            V(ut, {
              class: "seller-value-card",
              color: "#d97706",
              title: "Bank Transfer Value",
              value: g.value
            }, null, 8, ["value"]),
            V(ut, {
              class: "seller-value-card",
              color: "#ca8a04",
              title: "Cash Option Value",
              value: x.value
            }, null, 8, ["value"])
          ]),
          r.value && r.value.length > 0 ? (b(), k("section", xb, [
            u("div", _b, [
              V(oe, {
                columns: c,
                rows: d.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: E }) => [
                  u("span", kb, A(L(Rt)(String(E.date)).format("MMM DD")), 1)
                ]),
                "cell-sellInitiated": I(({ row: E }) => [
                  u("span", wb, A(L(Z)(Number(E.seller_conversations) || 0)), 1)
                ]),
                "cell-sellStarted": I(({ row: E }) => [
                  u("span", Cb, A(M(
                    E.sell_started_count,
                    E.seller_conversations || E.sell_started_count
                  )), 1)
                ]),
                "cell-getQuote": I(({ row: E }) => [
                  u("span", $b, A(M(
                    E.sell_get_quote_count,
                    E.seller_conversations || E.sell_started_count
                  )), 1)
                ]),
                "cell-bookingCreated": I(({ row: E }) => [
                  u("span", Mb, A(M(
                    E.sell_booking_created_count,
                    E.seller_conversations || E.sell_started_count
                  )), 1)
                ]),
                "cell-bankTransfer": I(({ row: E }) => [
                  u("span", Sb, A(L(Z)(Number(E.sell_bank_transfer_count) || 0)), 1)
                ]),
                "cell-btValue": I(({ row: E }) => [
                  u("span", Db, [
                    Array.isArray(
                      E.daily_value_sell_success_bank_transfer
                    ) && E.daily_value_sell_success_bank_transfer.length > 0 ? (b(), k("div", Ab, [
                      (b(!0), k(G, null, it(E.daily_value_sell_success_bank_transfer, (N) => (b(), k("span", {
                        key: `${E.date}-bt-success-${N.currency}`
                      }, A(N.currency) + " " + A(L(De)(N.total_value)), 1))), 128))
                    ])) : (b(), k("span", Tb, "-"))
                  ])
                ]),
                "cell-btSuccess": I(({ row: E }) => [
                  u("span", Bb, A(L(Z)(
                    Number(
                      E.sell_success_bank_transfer_count
                    ) || 0
                  )), 1)
                ]),
                "cell-cashOption": I(({ row: E }) => [
                  u("span", Lb, A(L(Z)(Number(E.sell_cash_option_count) || 0)), 1)
                ]),
                "cell-coValue": I(({ row: E }) => [
                  u("span", Fb, [
                    Array.isArray(
                      E.daily_value_sell_success_cash
                    ) && E.daily_value_sell_success_cash.length > 0 ? (b(), k("div", Pb, [
                      (b(!0), k(G, null, it(E.daily_value_sell_success_cash, (N) => (b(), k("span", {
                        key: `${E.date}-co-success-${N.currency}`
                      }, A(N.currency) + " " + A(L(De)(N.total_value)), 1))), 128))
                    ])) : (b(), k("span", Eb, "-"))
                  ])
                ]),
                "cell-cashSuccess": I(({ row: E }) => [
                  u("span", Ib, A(L(Z)(
                    Number(E.sell_success_cash_count) || 0
                  )), 1)
                ]),
                "cell-sellSuccess": I(({ row: E }) => [
                  u("span", Rb, A(M(
                    E.sell_success_count,
                    E.seller_conversations || E.sell_started_count
                  )), 1)
                ]),
                "cell-totalSalesValue": I(({ row: E }) => [
                  u("span", Ob, [
                    Array.isArray(E.daily_value_sell_success) && E.daily_value_sell_success.length > 0 ? (b(), k("div", Vb, [
                      (b(!0), k(G, null, it(E.daily_value_sell_success, (N) => (b(), k("span", {
                        key: `${E.date}-${N.currency}`
                      }, A(N.currency) + " " + A(L(De)(N.total_value)), 1))), 128))
                    ])) : (b(), k("span", zb, A(T(
                      E.daily_value_sell_success
                    )), 1))
                  ])
                ]),
                "cell-failed": I(({ row: E }) => [
                  (E.reasons || []).length > 0 ? (b(), k("div", Nb, [
                    (b(!0), k(G, null, it(E.reasons || [], (N) => (b(), k("div", {
                      key: N.reason,
                      class: "failed-reason-item"
                    }, [
                      u("span", Wb, A(N.reason) + ":", 1),
                      u("span", jb, A(N.failed_count), 1)
                    ]))), 128))
                  ])) : (b(), k("div", Hb, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : O("", !0)
        ]))
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), Xi = /* @__PURE__ */ rt(Yb, [["__scopeId", "data-v-6eff5112"]]), Kb = { class: "seller-container__body" }, Ub = /* @__PURE__ */ J({
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
  setup(t, { emit: e }) {
    const n = t, a = e, o = C(() => n.loading || n.sellerLoading), s = C(() => n.loading || n.salesByChannelLoading), i = C(() => n.exportLoading || n.sellerExportLoading), l = C(() => n.exportLoading || n.salesByChannelExportLoading);
    function r(c, d) {
      a("export", { source: c, format: d });
    }
    return (c, d) => (b(), q(gt, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": t.containerInitiallyOpen,
      loading: t.loading
    }, {
      default: I(() => [
        u("div", Kb, [
          V(Xi, {
            "initially-open": t.childrenInitiallyOpen,
            "seller-data": t.sellerData,
            "failed-data": t.failedData,
            loading: o.value,
            theme: t.theme,
            "enable-export": t.enableExport,
            "export-loading": i.value,
            onExport: d[0] || (d[0] = (h) => r("seller", h))
          }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading"]),
          V(qi, {
            "initially-open": t.childrenInitiallyOpen,
            data: t.salesByChannelData,
            "channel-comparison": t.channelComparison,
            loading: s.value,
            theme: t.theme,
            "enable-export": t.enableExport,
            "export-loading": l.value,
            onExport: d[1] || (d[1] = (h) => r("salesByChannel", h))
          }, null, 8, ["initially-open", "data", "channel-comparison", "loading", "theme", "enable-export", "export-loading"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), qb = /* @__PURE__ */ rt(Ub, [["__scopeId", "data-v-a9f0dfd2"]]), Xb = {
  key: 0,
  class: "card-body"
}, Gb = {
  key: 0,
  class: "chart-section"
}, Zb = {
  key: 1,
  class: "empty-state"
}, Qb = { class: "empty-state-content" }, Jb = { class: "empty-icon-wrapper" }, tv = {
  key: 1,
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, ev = /* @__PURE__ */ J({
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
  setup(t, { expose: e, emit: n }) {
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
    }, o = t, s = n, i = (h) => {
      s("export", h);
    }, { isDark: l, colors: r } = vt(pt(o, "theme")), c = C(() => {
      const p = (o.data?.top_agents || []).filter(
        (_) => _.agent_type?.toLowerCase() !== "triage"
      );
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const v = p.reduce(
        (_, m) => _ + (Number(m.conversations) || 0),
        0
      ), f = p.map((_) => {
        const m = _.agent_type?.toLowerCase();
        return a[m] || "#94a3b8";
      }), y = f.map((_) => `${_}80`);
      return {
        labels: p.map((_) => {
          const m = Number(_.conversations) || 0, g = v ? m / v * 100 : 0;
          return `${_.agent_type} - ${m.toLocaleString()} (${g.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: p.map((_) => _.conversations),
            backgroundColor: y,
            borderColor: f,
            borderWidth: 2
          }
        ]
      };
    }), d = C(() => o.options ? o.options : {
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
            color: r.value.textSecondary
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: r.value.tooltipBg,
          titleColor: r.value.tooltipText,
          bodyColor: r.value.tooltipText,
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
              const p = (h.label || "").toString().split(" - ")[0], v = Number(h.parsed) || 0, f = (h.dataset.data || []).reduce(
                (_, m) => _ + (Number(m) || 0),
                0
              ), y = f ? v / f * 100 : 0;
              return `${p}: ${v.toLocaleString()} (${y.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return e({ isDark: l }), (h, p) => (b(), q(gt, {
      class: "top-agents-root h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: t.loading
    }, {
      headerExport: I(() => [
        t.enableExport && !t.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: t.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        t.loading ? (b(), k("div", tv, [...p[2] || (p[2] = [
          u("div", {
            class: "flex-1 bm-skeleton-blink",
            "aria-hidden": "true"
          }, null, -1)
        ])])) : (b(), k("div", Xb, [
          c.value.labels && c.value.labels.length ? (b(), k("section", Gb, [
            V(pa, {
              data: c.value,
              options: d.value
            }, null, 8, ["data", "options"])
          ])) : (b(), k("section", Zb, [
            u("div", Qb, [
              u("div", Jb, [
                V(L(mp), { class: "empty-icon" })
              ]),
              p[0] || (p[0] = u("p", { class: "empty-title" }, "No top agents data", -1)),
              p[1] || (p[1] = u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
            ])
          ]))
        ]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), nv = /* @__PURE__ */ rt(ev, [["__scopeId", "data-v-599a80bd"]]), av = {
  key: 0,
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, ov = {
  key: 1,
  class: "card-body"
}, sv = {
  key: 0,
  class: "payment-methods-section"
}, iv = { class: "payment-methods-grid" }, lv = {
  key: 1,
  class: "empty-state"
}, rv = { class: "empty-state-content" }, cv = { class: "empty-icon-wrapper" }, dv = {
  key: 2,
  class: "payment-method-daily-section"
}, uv = { class: "w-full min-w-0" }, hv = { class: "font-medium" }, fv = { class: "text-center" }, gv = { class: "text-center success-value" }, pv = {
  key: 0,
  class: "currency-cell-list"
}, mv = { class: "payment-tags" }, bv = { class: "tag-name" }, vv = {
  key: 0,
  class: "tag-amount"
}, yv = {
  key: 1,
  class: "tag-amount"
}, xv = { class: "tag-count" }, _v = {
  key: 3,
  class: "empty-table-state"
}, kv = "Not Registered", wv = /* @__PURE__ */ J({
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
  setup(t, { expose: e, emit: n }) {
    const a = t, o = n, { isDark: s } = vt(pt(a, "theme")), i = ot(!1), l = ot({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), r = C(() => l.value.payment_method_breakdown && l.value.payment_method_breakdown.length > 0), c = C(() => l.value.payment_method_by_day && l.value.payment_method_by_day.length > 0), d = C(() => !l.value.payment_method_by_day || l.value.payment_method_by_day.length === 0 ? [] : [...l.value.payment_method_by_day].sort(($, M) => Rt($.date).valueOf() - Rt(M.date).valueOf())), h = [
      { key: "date", label: "Date", align: "left" },
      { key: "totalSales", label: "Total Sales", align: "center" },
      { key: "totalAmount", label: "Total Amount", align: "center" },
      { key: "paymentMethods", label: "Payment Methods", align: "left" }
    ], p = C(
      () => d.value.map(($) => ({
        id: $.date,
        date: $.date,
        total_count: $.total_count,
        total_amount: $.total_amount,
        total_amount_by_currency: $.total_amount_by_currency,
        payment_methods: $.payment_methods
      }))
    ), v = ($) => {
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
      const M = ($.payment_method_breakdown || []).map(
        (T) => ({
          payment_method: T.payment_method || "Unknown",
          total_amount: T.total_amount ?? 0,
          count: T.count ?? 0,
          total_amount_by_currency: T.total_amount_by_currency ?? []
        })
      ), F = ($.payment_method_by_day || []).map((T) => ({
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
        payment_method_breakdown: M,
        payment_method_by_day: F
      };
    }, f = async () => {
      if (!(!a.fetchFunction || !a.dates || a.dates.length < 2 || !a.airlineName)) {
        i.value = !0;
        try {
          const [$, M] = a.dates.map(
            (T) => Rt(T).format("YYYY-MM-DD")
          ), F = await a.fetchFunction(
            a.airlineName,
            $,
            M
          );
          l.value = v(F);
        } catch ($) {
          console.error("Error fetching payment method metrics:", $), l.value = v(null);
        } finally {
          i.value = !1;
        }
      }
    }, y = [
      "#10b981",
      "#3b82f6",
      "#8b5cf6",
      "#f59e0b",
      "#f43f5e",
      "#06b6d4"
    ], _ = ($) => !$ || $.toLowerCase() === "unknown" ? kv : $.replace(/_/g, " "), m = ($) => $ == null ? "$0.00" : Ct($), g = ($) => {
      const M = $.total_amount_by_currency;
      return M && M.length > 0 ? M.map((F) => `${F.currency} ${m(F.total_value)}`).join(" · ") : m($.total_amount);
    }, x = ($) => $ ? Rt($).format("MMM DD") : "-", w = ($) => $ == null || Number.isNaN(Number($)) ? 0 : Number($), D = ($) => {
      o("export", $);
    };
    function S() {
      const $ = a.data;
      $ && (Array.isArray($.payment_method_breakdown) && $.payment_method_breakdown.length > 0 || Array.isArray($.payment_method_by_day) && $.payment_method_by_day.length > 0) && (i.value = !1, l.value = v($));
    }
    return te(() => {
      a.data ? S() : f();
    }), Bt(
      () => a.data,
      ($) => {
        $ && S();
      },
      { deep: !0 }
    ), Bt(
      () => a.dates,
      ($) => {
        a.data || $ && $[0] && $[1] && f();
      },
      { deep: !0 }
    ), e({ isDark: s }), ($, M) => (b(), q(gt, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method",
      loading: i.value
    }, {
      headerExport: I(() => [
        t.enableExport && !i.value ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: D,
          loading: t.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        i.value ? (b(), k("div", av, [...M[0] || (M[0] = [
          u("div", {
            class: "flex-1 bm-skeleton-blink",
            "aria-hidden": "true"
          }, null, -1)
        ])])) : (b(), k("div", ov, [
          r.value ? (b(), k("section", sv, [
            M[1] || (M[1] = u("p", { class: "section-label" }, "Sales by Payment Method", -1)),
            u("div", iv, [
              (b(!0), k(G, null, it(l.value.payment_method_breakdown, (F, T) => (b(), q(ut, {
                key: F.payment_method,
                class: "payment-method-card-item min-w-0",
                color: y[T % y.length],
                title: _(F.payment_method),
                value: g(F),
                subvalue: `${w(F.count)} ${w(F.count) === 1 ? "sale" : "sales"}`
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : (b(), k("section", lv, [
            u("div", rv, [
              u("div", cv, [
                V(L(vp), { class: "empty-icon" })
              ]),
              M[2] || (M[2] = u("p", { class: "empty-title" }, "No payment data available", -1)),
              M[3] || (M[3] = u("p", { class: "empty-description" }, " No payment method data found for the selected period. Try adjusting the date range. ", -1))
            ])
          ])),
          c.value ? (b(), k("section", dv, [
            M[5] || (M[5] = u("p", { class: "section-label" }, "Daily Breakdown", -1)),
            u("div", uv, [
              V(oe, {
                columns: h,
                rows: p.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: F }) => [
                  u("span", hv, A(x(String(F.date))), 1)
                ]),
                "cell-totalSales": I(({ row: F }) => [
                  u("span", fv, A(L(Z)(F.total_count ?? 0)), 1)
                ]),
                "cell-totalAmount": I(({ row: F }) => [
                  u("span", gv, [
                    Array.isArray(F.total_amount_by_currency) && F.total_amount_by_currency.length > 0 ? (b(), k("div", pv, [
                      (b(!0), k(G, null, it(F.total_amount_by_currency, (T) => (b(), k("span", {
                        key: `${F.date}-${T.currency}`
                      }, A(T.currency) + " " + A(m(T.total_value)), 1))), 128))
                    ])) : (b(), k(G, { key: 1 }, [
                      _t(A(m(Number(F.total_amount ?? 0))), 1)
                    ], 64))
                  ])
                ]),
                "cell-paymentMethods": I(({ row: F }) => [
                  u("div", mv, [
                    (b(!0), k(G, null, it(Array.isArray(F.payment_methods) ? F.payment_methods : [], (T) => (b(), k("div", {
                      key: T.payment_method,
                      class: "payment-tag"
                    }, [
                      u("span", bv, A(_(T.payment_method)), 1),
                      M[4] || (M[4] = u("span", { class: "tag-separator" }, "•", -1)),
                      !T.total_amount_by_currency || T.total_amount_by_currency.length === 0 ? (b(), k("span", vv, A(m(T.total_amount)), 1)) : (b(), k("span", yv, A(T.total_amount_by_currency.map(
                        (B) => `${B.currency} ${m(B.total_value)}`
                      ).join(" / ")), 1)),
                      u("span", xv, "(" + A(w(T.count)) + ")", 1)
                    ]))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : r.value ? (b(), k("div", _v, [...M[6] || (M[6] = [
            u("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
          ])])) : O("", !0)
        ]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Cv = /* @__PURE__ */ rt(wv, [["__scopeId", "data-v-252ffe28"]]), $v = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, Mv = { class: "overflow-x-auto" }, Sv = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, Dv = {
  key: 0,
  scope: "col",
  class: "w-12 px-4 py-3 text-center align-middle"
}, Av = ["checked", "aria-label"], Tv = {
  key: 0,
  class: "w-12 bg-transparent px-4 py-3 text-center align-middle"
}, Bv = ["checked", "aria-label", "onChange"], Lv = /* @__PURE__ */ J({
  name: "Table",
  __name: "Table",
  props: {
    columns: {},
    rows: {},
    selectable: { type: Boolean, default: !1 },
    rowKey: { type: [String, Function], default: "id" },
    selectedKeys: { default: () => [] },
    ariaLabelSelectAll: { default: "Seleccionar todas las filas" },
    ariaLabelSelectRow: { default: "Seleccionar fila" },
    fixedLayout: { type: Boolean, default: !1 },
    fullWidth: { type: Boolean, default: !0 }
  },
  emits: ["update:selectedKeys"],
  setup(t, { emit: e }) {
    const n = t, a = e, o = ot(null);
    function s(g) {
      return `cell-${g}`;
    }
    function i(g) {
      return g === "center" ? "text-center" : g === "right" ? "text-right" : "text-left";
    }
    function l(g, x) {
      if (typeof n.rowKey == "function")
        return n.rowKey(g);
      const w = g[n.rowKey];
      return w != null ? String(w) : `__index_${x}`;
    }
    function r(g, x) {
      return g[x];
    }
    function c(g) {
      return g == null || typeof g == "object" ? "" : String(g);
    }
    function d(g, x) {
      return l(g, x);
    }
    const h = C(() => n.rows.map((g, x) => l(g, x)));
    function p(g, x) {
      const w = l(g, x);
      return n.selectedKeys.includes(w);
    }
    const v = C(() => !n.selectable || n.rows.length === 0 ? !1 : h.value.every((g) => n.selectedKeys.includes(g))), f = C(() => {
      if (!n.selectable || n.rows.length === 0) return !1;
      const g = h.value.filter((x) => n.selectedKeys.includes(x));
      return g.length > 0 && g.length < n.rows.length;
    });
    Bt(
      [f, v, () => n.selectable],
      async () => {
        await Ot();
        const g = o.value;
        g && (g.indeterminate = f.value && !v.value);
      },
      { immediate: !0 }
    );
    function y() {
      if (n.selectable)
        if (v.value) {
          const g = n.selectedKeys.filter((x) => !h.value.includes(x));
          a("update:selectedKeys", g);
        } else {
          const g = new Set(n.selectedKeys);
          h.value.forEach((x) => g.add(x)), a("update:selectedKeys", [...g]);
        }
    }
    function _(g, x) {
      if (!n.selectable) return;
      const w = l(g, x);
      n.selectedKeys.includes(w) ? a(
        "update:selectedKeys",
        n.selectedKeys.filter((S) => S !== w)
      ) : a("update:selectedKeys", [...n.selectedKeys, w]);
    }
    function m(g, x) {
      const w = l(g, x);
      return `${n.ariaLabelSelectRow} ${w}`;
    }
    return (g, x) => (b(), k("div", $v, [
      u("div", Mv, [
        u("table", {
          class: U([
            "kiut-table min-w-[640px] border-collapse text-left text-sm",
            t.fullWidth ? "w-full" : "w-auto",
            t.fixedLayout ? "table-fixed" : ""
          ])
        }, [
          u("thead", null, [
            u("tr", Sv, [
              t.selectable ? (b(), k("th", Dv, [
                u("input", {
                  ref_key: "selectAllRef",
                  ref: o,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: v.value,
                  "aria-label": t.ariaLabelSelectAll,
                  onChange: y
                }, null, 40, Av)
              ])) : O("", !0),
              (b(!0), k(G, null, it(t.columns, (w) => (b(), k("th", {
                key: w.key,
                scope: "col",
                class: U([
                  "px-4 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  i(w.align),
                  w.headerClass ?? ""
                ])
              }, A(w.label), 3))), 128))
            ])
          ]),
          u("tbody", null, [
            (b(!0), k(G, null, it(t.rows, (w, D) => (b(), k("tr", {
              key: d(w, D),
              class: "h-14 border-b border-[#e5e7eb] last:border-b-0 bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]"
            }, [
              t.selectable ? (b(), k("td", Tv, [
                u("input", {
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: p(w, D),
                  "aria-label": m(w, D),
                  onChange: (S) => _(w, D)
                }, null, 40, Bv)
              ])) : O("", !0),
              (b(!0), k(G, null, it(t.columns, (S) => (b(), k("td", {
                key: S.key,
                class: U([
                  "bg-transparent px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                  i(S.align),
                  S.cellClass ?? ""
                ])
              }, [
                wt(g.$slots, s(S.key), {
                  row: w,
                  column: S,
                  value: r(w, S.key)
                }, () => [
                  _t(A(c(r(w, S.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ], 2)
      ])
    ]));
  }
}), Gi = /* @__PURE__ */ rt(Lv, [["__scopeId", "data-v-d50b70af"]]), Fv = {
  key: 0,
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Pv = {
  key: 1,
  class: "card-body"
}, Ev = { class: "summary-cards" }, Iv = {
  key: 0,
  class: "summary-card enqueued-card"
}, Rv = { class: "summary-card-content" }, Ov = { class: "card-content enqueued-content" }, Vv = { class: "card-value enqueued-value" }, zv = { class: "summary-card assigned-card" }, Nv = { class: "summary-card-content" }, Wv = { class: "card-content" }, jv = { class: "card-value assigned-value" }, Hv = { class: "card-content" }, Yv = { class: "card-value assigned-value" }, Kv = { class: "summary-card closed-card" }, Uv = { class: "summary-card-content" }, qv = { class: "card-content" }, Xv = { class: "card-value closed-value" }, Gv = { class: "card-content" }, Zv = { class: "card-value closed-value" }, Qv = {
  key: 0,
  class: "agents-section"
}, Jv = { class: "date-header" }, ty = { class: "date-title" }, ey = { class: "date-stats" }, ny = {
  key: 0,
  class: "stat-item enqueued-stat"
}, ay = { class: "stat-value" }, oy = { class: "stat-item assigned-stat" }, sy = { class: "stat-value" }, iy = { class: "stat-value" }, ly = { class: "stat-item closed-stat" }, ry = { class: "stat-value" }, cy = { class: "stat-value" }, dy = { class: "w-full min-w-0" }, uy = { class: "ah-cell name-cell" }, hy = { class: "ah-cell email-cell" }, fy = { class: "metric-cell-content" }, gy = { class: "badge assigned-badge" }, py = { class: "metric-cell-avg" }, my = { class: "metric-cell-content" }, by = { class: "badge closed-badge" }, vy = { class: "metric-cell-avg" }, yy = ["onClick"], xy = {
  key: 1,
  class: "empty-state"
}, Ta = 3, _y = /* @__PURE__ */ J({
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
  setup(t, { expose: e, emit: n }) {
    const a = t, o = n, s = (M) => {
      o("export", M);
    }, { isDark: i } = vt(pt(a, "theme")), l = C(() => {
      const M = a.data?.agents_by_day && a.data.agents_by_day.length > 0, F = (a.data?.total_enqueued ?? 0) > 0;
      return M || F;
    }), r = C(() => {
      if (!l.value) return {};
      const M = {};
      for (const B of a.data.agents_by_day)
        M[B.date] || (M[B.date] = []), M[B.date].push(B);
      const F = Object.keys(M).sort((B, P) => new Date(B).getTime() - new Date(P).getTime()), T = {};
      for (const B of F)
        T[B] = M[B];
      return T;
    }), c = ot({});
    function d(M) {
      c.value = {
        ...c.value,
        [M]: !c.value[M]
      };
    }
    function h(M, F) {
      return c.value[M] ? F : F.slice(0, Ta);
    }
    function p(M) {
      return Math.max(0, M.length - Ta);
    }
    function v(M) {
      return M.length > Ta;
    }
    const f = [
      { key: "agentName", label: "Agent Name", align: "left" },
      { key: "email", label: "Email", align: "left" },
      { key: "assigned", label: "Assigned (AVG time to assign)", align: "center" },
      { key: "closed", label: "Closed (AVG time to close)", align: "center" }
    ];
    function y(M, F) {
      return h(M, F).map((T, B) => ({
        id: `${M}-${T.agent_email}-${B}`,
        agent_name: T.agent_name,
        agent_email: T.agent_email,
        assigned_count: T.assigned_count,
        closed_count: T.closed_count,
        avg_time_to_assign_seconds: T.avg_time_to_assign_seconds,
        avg_conversation_duration_seconds: T.avg_conversation_duration_seconds
      }));
    }
    const _ = (M) => M == null ? "0" : Z(M), m = (M) => {
      if (M == null)
        return "AVG";
      if (M < 60)
        return `${Math.round(M)}s`;
      const F = Math.round(M), T = Math.floor(F / 60), B = F % 60;
      if (T < 60)
        return `${T}m ${B}s`;
      const P = Math.floor(T / 60), E = T % 60;
      return `${P}h ${E}m`;
    }, g = (M) => {
      const F = new Date(M), T = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return F.toLocaleDateString("en-US", T);
    }, x = (M) => M[0]?.day_total_enqueued ?? 0, w = (M) => M[0]?.day_total_assigned ?? 0, D = (M) => M[0]?.day_total_closed ?? 0, S = (M) => M[0]?.day_avg_time_to_assign_seconds ?? null, $ = (M) => M[0]?.day_avg_conversation_duration_seconds ?? null;
    return e({ isDark: i }), (M, F) => (b(), q(gt, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent",
      loading: t.loading
    }, {
      headerExport: I(() => [
        t.enableExport && !t.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: t.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        t.loading ? (b(), k("div", Fv, [...F[0] || (F[0] = [
          u("div", {
            class: "flex-1 bm-skeleton-blink",
            "aria-hidden": "true"
          }, null, -1)
        ])])) : (b(), k("div", Pv, [
          u("div", Ev, [
            t.data.total_enqueued ? (b(), k("div", Iv, [
              F[2] || (F[2] = u("div", { class: "card-decoration" }, null, -1)),
              u("div", Rv, [
                u("div", Ov, [
                  F[1] || (F[1] = u("p", { class: "card-label" }, "Total Enqueued", -1)),
                  u("p", Vv, A(_(t.data.total_enqueued)), 1)
                ])
              ])
            ])) : O("", !0),
            u("div", zv, [
              F[5] || (F[5] = u("div", { class: "card-decoration" }, null, -1)),
              u("div", Nv, [
                u("div", Wv, [
                  F[3] || (F[3] = u("p", { class: "card-label" }, "Total Assigned", -1)),
                  u("p", jv, A(_(t.data.total_assigned)), 1)
                ]),
                u("div", Hv, [
                  F[4] || (F[4] = u("p", { class: "card-label" }, "AVG time to assign", -1)),
                  u("p", Yv, A(m(t.data.avg_time_to_assign_seconds)), 1)
                ])
              ])
            ]),
            u("div", Kv, [
              F[8] || (F[8] = u("div", { class: "card-decoration" }, null, -1)),
              u("div", Uv, [
                u("div", qv, [
                  F[6] || (F[6] = u("p", { class: "card-label" }, "Total Closed", -1)),
                  u("p", Xv, A(_(t.data.total_closed)), 1)
                ]),
                u("div", Gv, [
                  F[7] || (F[7] = u("p", { class: "card-label" }, "AVG time to close", -1)),
                  u("p", Zv, A(m(t.data.avg_conversation_duration_seconds)), 1)
                ])
              ])
            ])
          ]),
          l.value ? (b(), k("div", Qv, [
            (b(!0), k(G, null, it(r.value, (T, B) => (b(), k("div", {
              key: B,
              class: "date-group"
            }, [
              u("div", Jv, [
                u("h4", ty, A(g(B)), 1),
                u("div", ey, [
                  x(T) ? (b(), k("span", ny, [
                    u("span", ay, A(_(x(T))), 1),
                    F[9] || (F[9] = _t(" Enqueued ", -1))
                  ])) : O("", !0),
                  u("span", oy, [
                    u("span", sy, A(_(w(T))), 1),
                    F[10] || (F[10] = _t(" Assigned ", -1)),
                    u("span", iy, A(m(S(T))), 1)
                  ]),
                  u("span", ly, [
                    u("span", ry, A(_(D(T))), 1),
                    F[11] || (F[11] = _t(" Closed ", -1)),
                    u("span", cy, A(m($(T))), 1)
                  ])
                ])
              ]),
              u("div", dy, [
                V(Gi, {
                  columns: f,
                  rows: y(String(B), T),
                  "row-key": "id"
                }, {
                  "cell-agentName": I(({ row: P }) => [
                    u("span", uy, A(P.agent_name || "-"), 1)
                  ]),
                  "cell-email": I(({ row: P }) => [
                    u("span", hy, A(P.agent_email), 1)
                  ]),
                  "cell-assigned": I(({ row: P }) => [
                    u("div", fy, [
                      u("span", gy, A(_(Number(P.assigned_count))), 1),
                      u("span", py, A(m(
                        Number(P.avg_time_to_assign_seconds)
                      )), 1)
                    ])
                  ]),
                  "cell-closed": I(({ row: P }) => [
                    u("div", my, [
                      u("span", by, A(_(Number(P.closed_count))), 1),
                      u("span", vy, A(m(
                        Number(P.avg_conversation_duration_seconds)
                      )), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ]),
              v(T) ? (b(), k("button", {
                key: 0,
                type: "button",
                class: "view-more-btn",
                onClick: (P) => d(String(B))
              }, [
                _t(A(c.value[B] ? "View less" : `View more (${p(T)} rows)`) + " ", 1),
                (b(), k("svg", {
                  class: U([
                    "view-more-icon",
                    { "view-more-icon-rotated": c.value[B] }
                  ]),
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [...F[12] || (F[12] = [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M19 9l-7 7-7-7"
                  }, null, -1)
                ])], 2))
              ], 8, yy)) : O("", !0)
            ]))), 128))
          ])) : (b(), k("div", xy, [...F[13] || (F[13] = [
            u("div", { class: "empty-state-content" }, [
              u("div", { class: "empty-icon-wrapper" }, [
                u("svg", {
                  class: "empty-icon",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  })
                ])
              ]),
              u("p", { class: "empty-title" }, "No agent human conversation data available"),
              u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters. ")
            ], -1)
          ])]))
        ]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), ky = /* @__PURE__ */ rt(_y, [["__scopeId", "data-v-14540dda"]]), wy = {
  key: 0,
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Cy = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, $y = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, My = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Sy = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Dy = { class: "max-w-[360px] px-4 text-center" }, Ay = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Os = 5, Ty = /* @__PURE__ */ J({
  __name: "ChannelMetrics",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(t, { expose: e, emit: n }) {
    const a = t, o = n, s = (y) => {
      o("export", y);
    }, i = pt(a, "theme"), { isDark: l } = vt(i), r = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, c = ot({
      labels: [],
      datasets: []
    }), d = C(
      () => a.data ?? {
        channels_by_day: {},
        total_by_channel: {},
        total_conversations: 0
      }
    ), h = C(() => {
      const y = d.value.total_by_channel || {}, _ = Object.values(y).reduce(
        (m, g) => m + g,
        0
      );
      return _ === 0 ? [] : Object.entries(y).sort(([, m], [, g]) => g - m).map(([m, g]) => ({
        name: m,
        label: m.toUpperCase(),
        total: g,
        percentage: (g / _ * 100).toFixed(1),
        color: r[m.toLowerCase()] || "#9ca3af"
      }));
    }), p = C(
      () => h.value.slice(0, Os)
    ), v = C(() => {
      const y = Math.min(p.value.length, Os);
      if (!(y <= 0))
        return { gridTemplateColumns: `repeat(${y}, minmax(0, 1fr))` };
    }), f = (y) => {
      if (!y || !y.channels_by_day) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const _ = y.channels_by_day, m = Object.keys(_).sort();
      if (m.length === 0) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const g = /* @__PURE__ */ new Set();
      for (const D of Object.values(_))
        for (const S of Object.keys(D))
          g.add(S);
      const w = Array.from(g).map((D) => {
        const S = D.toLowerCase(), $ = r[S] || "#9ca3af";
        return {
          label: D.toUpperCase(),
          data: m.map((M) => _[M]?.[D] || 0),
          borderColor: $
        };
      });
      c.value = {
        labels: m.map((D) => Rt(D).format("MMM DD")),
        datasets: w
      };
    };
    return Bt(
      () => a.data,
      (y) => {
        f(y ?? null);
      },
      { deep: !0, immediate: !0 }
    ), e({ isDark: l }), (y, _) => (b(), q(gt, {
      class: "w-full min-h-0 self-start",
      title: "Conversations by Channel",
      subtitle: "Conversations sent by AI agents",
      collapsible: !1,
      loading: a.loading
    }, {
      headerExport: I(() => [
        t.enableExport && !a.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          loading: t.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        u("div", {
          class: U(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          a.loading ? (b(), k("div", wy, [..._[0] || (_[0] = [
            u("div", {
              class: "flex-1 bm-skeleton-blink",
              "aria-hidden": "true"
            }, null, -1)
          ])])) : (b(), k(G, { key: 1 }, [
            c.value.labels && c.value.labels.length ? (b(), k("section", Cy, [
              u("div", $y, [
                V(he, {
                  data: c.value,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              p.value.length ? (b(), k("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: yt(v.value)
              }, [
                (b(!0), k(G, null, it(p.value, (m) => (b(), q(ut, {
                  key: m.name,
                  class: "min-w-0",
                  color: m.color,
                  title: m.label,
                  value: `${m.percentage}%`,
                  subvalue: `${L(Z)(m.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : O("", !0)
            ])) : h.value.length ? (b(), k("section", My, [
              u("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: yt(v.value)
              }, [
                (b(!0), k(G, null, it(p.value, (m) => (b(), q(ut, {
                  key: m.name,
                  class: "min-w-0",
                  color: m.color,
                  title: m.label,
                  value: `${m.percentage}%`,
                  subvalue: `${L(Z)(m.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : O("", !0),
            h.value.length ? O("", !0) : (b(), k("section", Sy, [
              u("div", Dy, [
                u("div", Ay, [
                  V(L(qt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                _[1] || (_[1] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No channel metrics data available ", -1)),
                _[2] || (_[2] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No channel data found for the selected period. Try adjusting the date range. ", -1))
              ])
            ]))
          ], 64))
        ], 2)
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), By = /* @__PURE__ */ rt(Ty, [["__scopeId", "data-v-2e6d0ac0"]]), Ly = {
  key: 0,
  class: "card-body"
}, Fy = { class: "chart-container" }, Py = { class: "triage-table-block w-full min-w-0" }, Ey = { class: "triage-row-label" }, Iy = {
  key: 1,
  class: "triage-count"
}, Ry = {
  key: 1,
  class: "triage-count"
}, Oy = {
  key: 1,
  class: "triage-count"
}, Vy = {
  key: 1,
  class: "triage-count"
}, zy = {
  key: 1,
  class: "triage-count"
}, Ny = {
  key: 1,
  class: "empty-state"
}, Wy = { class: "empty-state-content" }, jy = { class: "empty-icon-wrapper" }, Hy = {
  key: 1,
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Yy = /* @__PURE__ */ J({
  __name: "TriageCombinations",
  props: {
    data: { default: () => ({ combinations: {} }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(t, { expose: e, emit: n }) {
    const a = t, o = n, s = (x) => {
      o("export", x);
    }, { isDark: i, colors: l } = vt(
      pt(a, "theme")
    ), r = C(() => {
      const x = a.data?.combinations || {}, w = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [D, S] of Object.entries(x)) {
        const $ = D.split("+").filter(Boolean);
        if (!$.includes("triage")) continue;
        const M = $.filter((F) => F !== "triage").length;
        M >= 4 ? w["4p"] += Number(S) || 0 : w[M] += Number(S) || 0;
      }
      return w;
    }), c = C(() => {
      const x = r.value;
      return x[0] + x[1] + x[2] + x[3] + x["4p"] || 0;
    }), d = C(() => Object.keys(a.data?.combinations || {}).length > 0), h = C(() => {
      const x = c.value;
      if (!x) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const w = r.value;
      return {
        pct0: w[0] / x * 100,
        pct1: w[1] / x * 100,
        pct2: w[2] / x * 100,
        pct3: w[3] / x * 100,
        pct4p: w["4p"] / x * 100
      };
    }), p = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], v = C(() => {
      const x = h.value, w = r.value;
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
    }, y = (x) => x?.replace("80", "") || "#888888", _ = C(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [h.value.pct0],
          backgroundColor: f.c0,
          borderColor: y(f.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [h.value.pct1],
          backgroundColor: f.c1,
          borderColor: y(f.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [h.value.pct2],
          backgroundColor: f.c2,
          borderColor: y(f.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [h.value.pct3],
          backgroundColor: f.c3,
          borderColor: y(f.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [h.value.pct4p],
          backgroundColor: f.c4p,
          borderColor: y(f.c4p),
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
    })), g = (x) => `${(Number(x) || 0).toFixed(0)}`;
    return e({ isDark: i }), (x, w) => (b(), q(gt, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1,
      loading: t.loading
    }, {
      headerExport: I(() => [
        t.enableExport && !t.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: t.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        t.loading ? (b(), k("div", Hy, [...w[2] || (w[2] = [
          u("div", {
            class: "flex-1 bm-skeleton-blink",
            "aria-hidden": "true"
          }, null, -1)
        ])])) : (b(), k("div", Ly, [
          d.value ? (b(), k(G, { key: 0 }, [
            u("div", Fy, [
              V(be, {
                data: _.value,
                options: m.value
              }, null, 8, ["data", "options"])
            ]),
            V(ut, {
              class: "w-full min-w-0",
              title: "Total",
              value: L(Z)(c.value),
              subvalue: "Conversations with triage"
            }, null, 8, ["value"]),
            u("div", Py, [
              V(oe, {
                columns: p,
                rows: v.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-metric": I(({ row: D }) => [
                  u("span", Ey, A(D.metric), 1)
                ]),
                "cell-b0": I(({ row: D }) => [
                  D.id === "pct" ? (b(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: yt({ color: y(f.c0) })
                  }, A(g(Number(D.b0))) + "%", 5)) : (b(), k("span", Iy, A(L(Z)(Number(D.b0))), 1))
                ]),
                "cell-b1": I(({ row: D }) => [
                  D.id === "pct" ? (b(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: yt({ color: y(f.c1) })
                  }, A(g(Number(D.b1))) + "%", 5)) : (b(), k("span", Ry, A(L(Z)(Number(D.b1))), 1))
                ]),
                "cell-b2": I(({ row: D }) => [
                  D.id === "pct" ? (b(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: yt({ color: y(f.c2) })
                  }, A(g(Number(D.b2))) + "%", 5)) : (b(), k("span", Oy, A(L(Z)(Number(D.b2))), 1))
                ]),
                "cell-b3": I(({ row: D }) => [
                  D.id === "pct" ? (b(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: yt({ color: y(f.c3) })
                  }, A(g(Number(D.b3))) + "%", 5)) : (b(), k("span", Vy, A(L(Z)(Number(D.b3))), 1))
                ]),
                "cell-b4p": I(({ row: D }) => [
                  D.id === "pct" ? (b(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: yt({ color: y(f.c4p) })
                  }, A(g(Number(D.b4p))) + "%", 5)) : (b(), k("span", zy, A(L(Z)(Number(D.b4p))), 1))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ], 64)) : (b(), k("div", Ny, [
            u("div", Wy, [
              u("div", jy, [
                V(L(qt), { class: "empty-icon" })
              ]),
              w[0] || (w[0] = u("p", { class: "empty-title" }, "No triage combinations data", -1)),
              w[1] || (w[1] = u("p", { class: "empty-description" }, " No intent distribution data found for the selected period. Try adjusting the date range. ", -1))
            ])
          ]))
        ]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Ky = /* @__PURE__ */ rt(Yy, [["__scopeId", "data-v-6caf00a1"]]), Uy = {
  key: 0,
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, qy = {
  key: 1,
  class: "card-body"
}, Xy = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-3 min-h-0"
}, Gy = { class: "pie-section" }, Zy = {
  key: 1,
  class: "empty-state"
}, Qy = /* @__PURE__ */ J({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(t, { expose: e }) {
    const n = t, { isDark: a, colors: o } = vt(pt(n, "theme")), s = [
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
    }, l = (v) => i[v]?.label || v.toUpperCase(), r = C(
      () => n.data?.items && n.data.items.length > 0
    ), c = C(
      () => (n.data?.items || []).reduce((v, f) => v + f.count, 0)
    ), d = C(() => {
      const v = {};
      for (const f of n.data?.items || [])
        v[f.language] = (v[f.language] || 0) + f.count;
      return Object.entries(v).map(([f, y]) => ({ language: f, count: y })).sort((f, y) => y.count - f.count);
    }), h = C(() => ({
      labels: d.value.map((v) => l(v.language)),
      datasets: [
        {
          data: d.value.map((v) => v.count),
          backgroundColor: d.value.map(
            (v, f) => s[f % s.length] + "80"
          ),
          borderColor: d.value.map(
            (v, f) => s[f % s.length]
          ),
          borderWidth: 2,
          hoverOffset: 6
        }
      ]
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
          titleFont: {
            family: "'Space Grotesk', sans-serif",
            size: 13,
            weight: 600
          },
          bodyFont: { family: "'DM Sans', sans-serif", size: 12 },
          callbacks: {
            label: (v) => {
              const f = v.raw || 0, y = c.value > 0 ? (f / c.value * 100).toFixed(1) : "0";
              return ` ${v.label}: ${f} (${y}%)`;
            }
          }
        }
      }
    }));
    return e({ isDark: a }), (v, f) => (b(), q(gt, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1,
      loading: n.loading
    }, {
      default: I(() => [
        n.loading ? (b(), k("div", Uy, [...f[0] || (f[0] = [
          u("div", {
            class: "flex-1 bm-skeleton-blink",
            "aria-hidden": "true"
          }, null, -1)
        ])])) : (b(), k("div", qy, [
          r.value ? (b(), k("div", Xy, [
            u("section", Gy, [
              V(pa, {
                data: h.value,
                options: p.value
              }, null, 8, ["data", "options"])
            ]),
            V(ut, {
              class: "shrink-0",
              title: "Total",
              value: L(Z)(c.value),
              color: "#8b5cf6"
            }, null, 8, ["value"])
          ])) : (b(), k("section", Zy, [...f[1] || (f[1] = [
            u("div", { class: "empty-state-content" }, [
              u("div", { class: "empty-icon-wrapper" }, [
                u("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  })
                ])
              ]),
              u("p", { class: "empty-title" }, "No language data available"),
              u("p", { class: "empty-description" }, " No language selection data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])]))
        ]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Jy = /* @__PURE__ */ rt(Qy, [["__scopeId", "data-v-8277952c"]]), t1 = {
  key: 0,
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, e1 = {
  key: 1,
  class: "card-body"
}, n1 = {
  key: 0,
  class: "guardrails-daily-section"
}, a1 = { class: "w-full min-w-0" }, o1 = { class: "font-medium" }, s1 = { class: "font-semibold" }, i1 = { class: "type-badges-row" }, l1 = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, r1 = {
  key: 1,
  class: "empty-state"
}, c1 = /* @__PURE__ */ J({
  __name: "Guardrails",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(t, { expose: e, emit: n }) {
    const a = t, o = n, s = (_) => {
      o("export", _);
    }, { isDark: i } = vt(pt(a, "theme")), l = C(
      () => a.data?.items && a.data.items.length > 0
    ), r = C(
      () => (a.data?.items || []).reduce((_, m) => _ + m.count, 0)
    ), c = (_) => {
      const m = {};
      for (const w of a.data?.items || [])
        m[w[_]] = (m[w[_]] || 0) + w.count;
      const g = Object.entries(m).sort((w, D) => D[1] - w[1]);
      if (g.length === 0) return { name: "—", pct: 0 };
      const x = r.value;
      return {
        name: g[0][0],
        pct: x > 0 ? Math.round(g[0][1] / x * 100) : 0
      };
    }, d = C(() => c("guardrail_type")), h = C(() => c("guardrail_action")), p = C(() => c("guardrail_source")), v = C(() => {
      const _ = {};
      for (const m of a.data?.items || [])
        _[m.date] || (_[m.date] = {}), _[m.date][m.guardrail_type] = (_[m.date][m.guardrail_type] || 0) + m.count;
      return Object.entries(_).map(([m, g]) => ({
        date: m,
        total: Object.values(g).reduce((x, w) => x + w, 0),
        types: Object.entries(g).map(([x, w]) => ({ type: x, count: w })).sort((x, w) => w.count - x.count)
      })).sort((m, g) => new Date(m.date).getTime() - new Date(g.date).getTime());
    }), f = [
      { key: "date", label: "Date", align: "center" },
      { key: "count", label: "Count", align: "center" },
      { key: "types", label: "Types", align: "left" }
    ], y = C(
      () => v.value.map((_) => ({
        id: _.date,
        date: _.date,
        total: _.total,
        types: _.types
      }))
    );
    return e({ isDark: i }), (_, m) => (b(), q(gt, {
      class: "guardrails-root h-full min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1,
      loading: t.loading
    }, {
      headerExport: I(() => [
        t.enableExport && !a.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: t.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        t.loading ? (b(), k("div", t1, [...m[0] || (m[0] = [
          u("div", {
            class: "flex-1 bm-skeleton-blink",
            "aria-hidden": "true"
          }, null, -1)
        ])])) : (b(), k("div", e1, [
          l.value ? (b(), k(G, { key: 0 }, [
            v.value.length > 0 ? (b(), k("section", n1, [
              u("div", a1, [
                V(oe, {
                  columns: f,
                  rows: y.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-date": I(({ row: g }) => [
                    u("span", o1, A(L(Rt)(String(g.date)).format("MMM DD")), 1)
                  ]),
                  "cell-count": I(({ row: g }) => [
                    u("span", s1, A(L(Z)(g.total)), 1)
                  ]),
                  "cell-types": I(({ row: g }) => [
                    u("div", i1, [
                      (b(!0), k(G, null, it(g.types, (x) => (b(), k("span", {
                        key: x.type,
                        class: "type-count-badge"
                      }, A(x.type) + " (" + A(x.count) + ") ", 1))), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : O("", !0),
            u("section", l1, [
              V(ut, {
                title: "Total Events",
                value: L(Z)(r.value)
              }, null, 8, ["value"]),
              V(ut, {
                title: "Top type",
                value: d.value.name,
                subvalue: d.value.pct > 0 ? `(${d.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              V(ut, {
                title: "Top action",
                value: h.value.name,
                subvalue: h.value.pct > 0 ? `(${h.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              V(ut, {
                title: "Top source",
                value: p.value.name,
                subvalue: p.value.pct > 0 ? `(${p.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"])
            ])
          ], 64)) : (b(), k("section", r1, [...m[1] || (m[1] = [
            u("div", { class: "empty-state-content" }, [
              u("div", { class: "empty-icon-wrapper" }, [
                u("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  })
                ])
              ]),
              u("p", { class: "empty-title" }, "No guardrail events"),
              u("p", { class: "empty-description" }, "No content safety events found for the selected period. This is a good sign!")
            ], -1)
          ])]))
        ]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), d1 = /* @__PURE__ */ rt(c1, [["__scopeId", "data-v-97976dbf"]]), u1 = {
  key: 0,
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, h1 = {
  key: 1,
  class: "card-body"
}, f1 = { class: "chart-section" }, g1 = { class: "chart-wrapper" }, p1 = {
  key: 1,
  class: "empty-chart"
}, m1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, b1 = {
  key: 0,
  class: "dn-failure-section"
}, v1 = { class: "w-full min-w-0" }, y1 = { class: "failure-reason" }, x1 = { class: "failure-count" }, _1 = { class: "impact-bar-container" }, k1 = { class: "impact-label" }, w1 = { class: "dn-trend-health-block flex flex-col gap-0" }, C1 = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, $1 = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, M1 = { class: "system-health" }, S1 = { class: "system-health-content" }, D1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, A1 = {
  key: 1,
  class: "empty-state"
}, T1 = /* @__PURE__ */ J({
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
  setup(t, { expose: e, emit: n }) {
    const a = t, o = n, s = (S) => {
      o("export", S);
    }, { isDark: i, colors: l } = vt(pt(a, "theme")), r = C(() => {
      const S = a.data?.documentCounts?.items || [], $ = a.data?.processingCounts?.items || [];
      return S.length > 0 || $.length > 0;
    }), c = C(() => {
      const S = a.data?.documentCounts?.items || [];
      return {
        processing_started: S.reduce(($, M) => $ + M.processing_started, 0),
        processing_completed: S.reduce(($, M) => $ + M.processing_completed, 0),
        processing_failed: S.reduce(($, M) => $ + M.processing_failed, 0),
        row_count_total: S.reduce(($, M) => $ + M.row_count_total, 0)
      };
    }), d = C(() => {
      const S = a.data?.processingCounts?.items || [];
      return {
        processing_started: S.reduce(($, M) => $ + M.processing_started, 0),
        processing_success: S.reduce(($, M) => $ + M.processing_success, 0),
        notification_sent: S.reduce(($, M) => $ + M.notification_sent, 0),
        notification_failed: S.reduce(($, M) => $ + M.notification_failed, 0),
        dq_phone: S.reduce(($, M) => $ + M.dq_error_phone_not_found, 0),
        dq_flight: S.reduce(($, M) => $ + M.dq_error_flight_not_found, 0),
        dq_booking: S.reduce(($, M) => $ + M.dq_error_booking_not_found, 0),
        dq_other: S.reduce(($, M) => $ + M.dq_error_other, 0),
        totalDqErrors: S.reduce(
          ($, M) => $ + M.dq_error_phone_not_found + M.dq_error_flight_not_found + M.dq_error_booking_not_found + M.dq_error_other,
          0
        )
      };
    }), h = C(
      () => c.value.row_count_total || d.value.processing_started
    ), p = C(
      () => Math.max(0, h.value - d.value.notification_sent)
    ), v = (S, $) => $ ? `${Math.round(S / $ * 100)}%` : "0%", f = C(() => {
      const S = [
        { reason: "Booking not found", count: d.value.dq_booking },
        { reason: "Phone not found", count: d.value.dq_phone },
        { reason: "Flight not found", count: d.value.dq_flight },
        {
          reason: "Notification failed",
          count: d.value.notification_failed
        },
        { reason: "Other", count: d.value.dq_other }
      ].filter(($) => $.count > 0).sort(($, M) => M.count - $.count);
      return S.length > 0 ? S[0] : { reason: "None", count: 0 };
    }), y = C(() => {
      const S = h.value;
      return [
        { reason: "Booking not found", count: d.value.dq_booking },
        { reason: "Flight not found", count: d.value.dq_flight },
        { reason: "Phone not found", count: d.value.dq_phone },
        {
          reason: "Notification failed",
          count: d.value.notification_failed
        },
        { reason: "Other", count: d.value.dq_other }
      ].map(($) => ({
        ...$,
        impactPct: S > 0 ? Math.round($.count / S * 100) : 0
      }));
    }), _ = [
      { key: "reason", label: "Reason", align: "left" },
      { key: "count", label: "Count", align: "center" },
      { key: "impact", label: "Impact", align: "center" }
    ], m = C(
      () => y.value.map((S) => ({
        id: S.reason,
        reason: S.reason,
        count: S.count,
        impactPct: S.impactPct
      }))
    ), g = C(() => {
      const S = h.value, $ = d.value.processing_success, M = Math.max(0, $ - d.value.totalDqErrors), F = d.value.notification_sent, T = Math.max(0, S - $), B = d.value.totalDqErrors, P = Math.max(0, M - F), E = (W, Q) => {
        const tt = Q > 0 ? Math.round(W / Q * 100) : 0;
        return `${W.toLocaleString()} (${tt}%)`;
      }, N = [
        { name: "Records Detected" },
        { name: "Valid Reservations" },
        { name: "Invalid / Unprocessed" },
        { name: "Contactable" },
        { name: "Data Quality Issues" },
        { name: "Notified" },
        { name: "Not Delivered" }
      ], Y = [];
      return $ > 0 && Y.push({
        source: "Records Detected",
        target: "Valid Reservations",
        value: $,
        label: E($, S)
      }), T > 0 && Y.push({
        source: "Records Detected",
        target: "Invalid / Unprocessed",
        value: T,
        label: E(T, S)
      }), M > 0 && Y.push({
        source: "Valid Reservations",
        target: "Contactable",
        value: M,
        label: E(M, S)
      }), B > 0 && Y.push({
        source: "Valid Reservations",
        target: "Data Quality Issues",
        value: B,
        label: E(B, S)
      }), F > 0 && Y.push({
        source: "Contactable",
        target: "Notified",
        value: F,
        label: E(F, S)
      }), P > 0 && Y.push({
        source: "Contactable",
        target: "Not Delivered",
        value: P,
        label: E(P, S)
      }), { nodes: N, links: Y };
    }), x = {
      "Records Detected": "#DBEAFE",
      "Valid Reservations": "#D1FAE5",
      "Invalid / Unprocessed": "#FEE2E2",
      Contactable: "#BBF7D0",
      "Data Quality Issues": "#FED7AA",
      Notified: "#86EFAC",
      "Not Delivered": "#FCA5A5"
    }, w = C(() => {
      const S = [...a.data?.processingCounts?.items || []].sort(
        (E, N) => new Date(E.date).getTime() - new Date(N.date).getTime()
      ), $ = a.data?.documentCounts?.items || [], M = {};
      for (const E of $)
        M[E.date] = (M[E.date] || 0) + E.row_count_total;
      const F = [
        .../* @__PURE__ */ new Set([
          ...S.map((E) => E.date),
          ...$.map((E) => E.date)
        ])
      ].sort(), T = F.map((E) => Rt(E).format("MMM DD")), B = F.map((E) => {
        const N = S.find((Q) => Q.date === E), Y = N?.notification_sent || 0, W = M[E] || N?.processing_started || 0;
        return W > 0 ? Math.round(Y / W * 100) : 0;
      }), P = F.map((E) => S.find((Y) => Y.date === E)?.notification_sent || 0);
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
            data: P,
            borderColor: "#10b981",
            yAxisID: "y1"
          }
        ]
      };
    }), D = C(() => ({
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
    return e({ isDark: i }), (S, $) => (b(), q(gt, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis",
      loading: t.loading
    }, {
      headerExport: I(() => [
        t.enableExport && !a.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: t.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        t.loading ? (b(), k("div", u1, [...$[0] || ($[0] = [
          u("div", {
            class: "flex-1 bm-skeleton-blink",
            "aria-hidden": "true"
          }, null, -1)
        ])])) : (b(), k("div", h1, [
          r.value ? (b(), k(G, { key: 0 }, [
            u("section", f1, [
              $[2] || ($[2] = u("div", { class: "chart-header" }, [
                u("h4", { class: "section-title" }, "Passenger Disruption Funnel")
              ], -1)),
              u("div", g1, [
                g.value.nodes.length > 0 && g.value.links.length > 0 ? (b(), q(Ve, {
                  key: 0,
                  data: g.value,
                  "node-colors": x,
                  height: "350px"
                }, null, 8, ["data"])) : (b(), k("div", p1, [...$[1] || ($[1] = [
                  u("p", { class: "empty-chart-text" }, " No processing data available for visualization ", -1)
                ])]))
              ])
            ]),
            u("div", m1, [
              V(ut, {
                color: "#3b82f6",
                title: "Total Records",
                value: L(Z)(c.value.row_count_total)
              }, null, 8, ["value"]),
              V(ut, {
                color: "#8b5cf6",
                title: "Passengers Affected",
                value: L(Z)(h.value)
              }, null, 8, ["value"]),
              V(ut, {
                color: "#10b981",
                title: "Successfully Notified",
                value: L(Z)(d.value.notification_sent),
                subvalue: v(d.value.notification_sent, h.value)
              }, null, 8, ["value", "subvalue"]),
              V(ut, {
                color: "#ef4444",
                title: "Not Notified",
                value: L(Z)(p.value),
                subvalue: v(p.value, h.value)
              }, null, 8, ["value", "subvalue"]),
              V(ut, {
                color: "#f59e0b",
                title: "Main Failure Reason",
                value: f.value.reason,
                subvalue: f.value.count > 0 ? `${L(Z)(f.value.count)} cases` : void 0
              }, null, 8, ["value", "subvalue"])
            ]),
            y.value.length > 0 ? (b(), k("section", b1, [
              $[3] || ($[3] = u("div", { class: "section-header" }, [
                u("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
              ], -1)),
              u("div", v1, [
                V(oe, {
                  columns: _,
                  rows: m.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-reason": I(({ row: M }) => [
                    u("span", y1, A(M.reason), 1)
                  ]),
                  "cell-count": I(({ row: M }) => [
                    u("span", x1, A(L(Z)(M.count)), 1)
                  ]),
                  "cell-impact": I(({ row: M }) => [
                    u("div", _1, [
                      u("div", {
                        class: "impact-bar",
                        style: yt({ width: M.impactPct + "%" })
                      }, null, 4),
                      u("span", k1, A(M.impactPct) + "%", 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : O("", !0),
            u("div", w1, [
              w.value.labels.length > 0 ? (b(), k("section", C1, [
                $[4] || ($[4] = u("div", { class: "chart-header" }, [
                  u("h4", { class: "section-title" }, "Notification Success Rate by Day")
                ], -1)),
                u("div", $1, [
                  V(he, {
                    data: w.value,
                    options: D.value,
                    theme: a.theme
                  }, null, 8, ["data", "options", "theme"])
                ])
              ])) : O("", !0),
              u("details", M1, [
                $[5] || ($[5] = u("summary", { class: "system-health-toggle" }, [
                  u("svg", {
                    class: "toggle-icon",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    u("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    }),
                    u("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    })
                  ]),
                  _t(" System Health Details ")
                ], -1)),
                u("div", S1, [
                  u("div", D1, [
                    V(ut, {
                      title: "Docs Started",
                      value: L(Z)(c.value.processing_started)
                    }, null, 8, ["value"]),
                    V(ut, {
                      title: "Docs Completed",
                      value: L(Z)(c.value.processing_completed)
                    }, null, 8, ["value"]),
                    V(ut, {
                      title: "Docs Failed",
                      value: L(Z)(c.value.processing_failed)
                    }, null, 8, ["value"]),
                    V(ut, {
                      title: "Processing Started",
                      value: L(Z)(d.value.processing_started)
                    }, null, 8, ["value"]),
                    V(ut, {
                      title: "Processing Success",
                      value: L(Z)(d.value.processing_success)
                    }, null, 8, ["value"]),
                    V(ut, {
                      title: "Notification Failed",
                      value: L(Z)(d.value.notification_failed)
                    }, null, 8, ["value"])
                  ])
                ])
              ])
            ])
          ], 64)) : (b(), k("section", A1, [...$[6] || ($[6] = [
            u("div", { class: "empty-state-content" }, [
              u("div", { class: "empty-icon-wrapper" }, [
                u("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  })
                ])
              ]),
              u("p", { class: "empty-title" }, "No disruption notifier data"),
              u("p", { class: "empty-description" }, " No disruption notification data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])]))
        ]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), B1 = /* @__PURE__ */ rt(T1, [["__scopeId", "data-v-de6b24af"]]), L1 = {
  key: 0,
  class: "ut-skeleton-blink skeleton-icon",
  "aria-hidden": "true"
}, F1 = {
  key: 1,
  class: "header-title-group"
}, P1 = {
  class: "icon-wrapper",
  "aria-hidden": "true"
}, E1 = {
  key: 0,
  class: "ut-skeleton-blink skeleton-badge",
  "aria-hidden": "true"
}, I1 = {
  key: 0,
  class: "skeleton-body",
  "aria-busy": "true",
  "aria-label": "Loading metric"
}, R1 = {
  key: 1,
  class: "highlight-inner"
}, O1 = { class: "card-body" }, V1 = { class: "metric-row" }, z1 = {
  key: 0,
  class: "metric-prefix"
}, N1 = { class: "metric-label" }, W1 = /* @__PURE__ */ J({
  __name: "CardMetric",
  props: {
    label: {},
    value: {},
    prefix: { default: void 0 },
    valueSize: { default: "default" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    currentValue: { default: 0 },
    previousValue: { default: null }
  },
  setup(t, { expose: e }) {
    const n = t, { isDark: a } = vt(pt(n, "theme")), o = C(
      () => n.previousValue !== null && n.previousValue !== void 0
    ), s = C(() => {
      if (!o.value) return 0;
      const r = n.previousValue;
      return r === 0 ? n.currentValue > 0 ? 100 : 0 : (n.currentValue - r) / r * 100;
    }), i = C(() => {
      const r = s.value.toFixed(1);
      return s.value > 0 ? `+${r}%` : `${r}%`;
    }), l = C(() => s.value > 0 ? "change-badge--up" : s.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return e({ isDark: a, changePercent: s }), (r, c) => (b(), q(gt, {
      collapsible: !1,
      class: U(["card-metric", "w-full", { "card-metric--dark": L(a) }])
    }, {
      title: I(() => [
        t.loading ? (b(), k("div", L1)) : (b(), k("div", F1, [
          u("div", P1, [
            wt(r.$slots, "icon", {}, void 0, !0)
          ])
        ]))
      ]),
      headerAside: I(() => [
        t.loading ? (b(), k("div", E1)) : wt(r.$slots, "headerAside", { key: 1 }, () => [
          o.value ? (b(), k("div", {
            key: 0,
            class: U(["change-badge", l.value])
          }, A(i.value), 3)) : O("", !0)
        ], !0)
      ]),
      default: I(() => [
        t.loading ? (b(), k("div", I1, [...c[0] || (c[0] = [
          u("div", { class: "ut-skeleton-blink skeleton-value" }, null, -1),
          u("div", { class: "ut-skeleton-blink skeleton-label" }, null, -1)
        ])])) : (b(), k("div", R1, [
          u("div", O1, [
            wt(r.$slots, "value", {}, () => [
              u("div", V1, [
                t.prefix ? (b(), k("span", z1, A(t.prefix), 1)) : O("", !0),
                u("span", {
                  class: U(["metric-value", t.valueSize === "large" ? "metric-value--large" : ""])
                }, A(t.value), 3)
              ])
            ], !0),
            u("span", N1, A(t.label), 1)
          ])
        ]))
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), In = /* @__PURE__ */ rt(W1, [["__scopeId", "data-v-f0eb04ae"]]), j1 = /* @__PURE__ */ J({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(t, { expose: e }) {
    const n = t, a = ot(null), o = C(() => Z(n.totalConversations)), s = C(() => L(a.value?.isDark) ?? !1), i = C(() => L(a.value?.changePercent) ?? 0);
    return e({ isDark: s, changePercent: i }), (l, r) => (b(), q(In, {
      label: "Total Conversations",
      value: o.value,
      loading: t.loading,
      theme: t.theme,
      "current-value": t.totalConversations,
      "previous-value": t.previousTotalConversations,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: I(() => [...r[0] || (r[0] = [
        u("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
          })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), H1 = /* @__PURE__ */ J({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(t, { expose: e }) {
    const n = t, a = ot(null), o = C(() => `${n.csatP95.toFixed(1)}`), s = C(() => L(a.value?.isDark) ?? !1), i = C(() => L(a.value?.changePercent) ?? 0);
    return e({ isDark: s, changePercent: i }), (l, r) => (b(), q(In, {
      label: "CSAT P95",
      value: o.value,
      loading: t.loading,
      theme: t.theme,
      "current-value": t.csatP95,
      "previous-value": t.previousCsatP95,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: I(() => [...r[0] || (r[0] = [
        u("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321 1.01l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.41a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-1.01l5.518-.442a.563.563 0 00.475-.345l2.125-5.11z"
          })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), Y1 = /* @__PURE__ */ J({
  __name: "CsatPulseCard",
  props: {
    csatPulse: { default: 0 },
    previousCsatPulse: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(t, { expose: e }) {
    const n = t, a = ot(null), o = C(() => `${n.csatPulse.toFixed(1)}%`), s = C(() => L(a.value?.isDark) ?? !1), i = C(() => L(a.value?.changePercent) ?? 0);
    return e({ isDark: s, changePercent: i }), (l, r) => (b(), q(In, {
      label: "CSAT Pulse",
      value: o.value,
      loading: t.loading,
      theme: t.theme,
      "current-value": t.csatPulse,
      "previous-value": t.previousCsatPulse,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: I(() => [...r[0] || (r[0] = [
        u("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M3 12h3l2-6 4 12 3-8 2 2h4"
          })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), K1 = {
  key: 0,
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, U1 = {
  key: 1,
  class: "card-body"
}, q1 = { class: "chart-wrapper" }, X1 = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, G1 = {
  key: 2,
  class: "empty-state"
}, Z1 = 500, Q1 = 60, J1 = 80, tx = {
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
  setup(t, { expose: e, emit: n }) {
    const a = n, o = (c) => {
      a("export", c);
    }, s = t, { isDark: i } = vt(pt(s, "theme")), l = C(() => s.data), r = C(() => Math.max(600, window.innerWidth * 0.85));
    return e({ isDark: i }), (c, d) => (b(), q(gt, {
      class: "nps-overview-root h-full min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1,
      loading: s.loading
    }, {
      headerExport: I(() => [
        t.enableExport && !s.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: t.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        s.loading ? (b(), k("div", K1, [...d[0] || (d[0] = [
          u("div", {
            class: "flex-1 bm-skeleton-blink",
            "aria-hidden": "true"
          }, null, -1)
        ])])) : l.value && l.value.total_nps_responses > 0 ? (b(), k("div", U1, [
          u("div", q1, [
            V(Vi, {
              histogram: l.value.histogram || [],
              "min-score": l.value.min_score || 0,
              "max-score": l.value.max_score || 0,
              "q1-score": l.value.q1_score || 0,
              "median-score": l.value.median_score || 0,
              "q3-score": l.value.q3_score || 0,
              "average-score": l.value.average_score || 0,
              "chart-width": r.value,
              "chart-height": Z1,
              "chart-margin": Q1,
              "chart-bottom-margin": J1
            }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score", "chart-width"])
          ]),
          u("div", X1, [
            V(ut, {
              class: "min-w-0 flex-1",
              title: "Responses",
              value: String(l.value.total_nps_responses)
            }, null, 8, ["value"]),
            l.value.p95_score > 0 ? (b(), q(ut, {
              key: 0,
              class: "min-w-0 flex-1",
              title: "Percentile 95",
              value: String(l.value.p95_score)
            }, null, 8, ["value"])) : O("", !0)
          ])
        ])) : (b(), k("div", G1, [...d[1] || (d[1] = [
          u("div", { class: "empty-state-content" }, [
            u("div", { class: "empty-icon-wrapper" }, [
              u("svg", {
                class: "empty-icon",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [
                u("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                })
              ])
            ]),
            u("p", { class: "empty-title" }, "No NPS data available"),
            u("p", { class: "empty-description" }, " No NPS data found for the selected period. Try adjusting the date range. ")
          ], -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}, Zi = /* @__PURE__ */ rt(tx, [["__scopeId", "data-v-ad00f2fb"]]), ex = {
  key: 0,
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, nx = {
  key: 1,
  class: "card-body"
}, ax = {
  key: 2,
  class: "empty-state"
}, ox = {
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
  setup(t, { emit: e }) {
    const n = e, a = (c) => {
      n("export", c);
    }, o = t, s = C(() => o.data?.csat_p95_by_day || []), i = C(() => s.value.length > 0), l = C(() => ({
      labels: s.value.map((c) => Rt(c.date).format("DD-MM-YYYY")),
      datasets: [
        {
          label: "CSAT P95",
          data: s.value.map((c) => Number(c.p95_score || 0)),
          borderColor: "#7C3AED",
          pointBorderColor: "#7C3AED",
          pointBackgroundColor: "#FFFFFF",
          tension: 0.25
        }
      ]
    })), r = {
      scales: {
        y: {
          min: 0,
          max: 11,
          ticks: {
            callback: (c) => Number(c).toFixed(2)
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (c) => c.parsed.y.toFixed(2)
          }
        }
      }
    };
    return (c, d) => (b(), q(gt, {
      class: "nps-daily-root h-full min-h-0",
      title: "CSAT P95 by Date",
      subtitle: "Daily P95 trend for CSAT responses",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: I(() => [
        t.enableExport && !o.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: t.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        o.loading ? (b(), k("div", ex, [...d[0] || (d[0] = [
          u("div", {
            class: "flex-1 bm-skeleton-blink",
            "aria-hidden": "true"
          }, null, -1)
        ])])) : i.value ? (b(), k("div", nx, [
          V(he, {
            data: l.value,
            options: r,
            "uppercase-legend-labels": !0
          }, null, 8, ["data"])
        ])) : (b(), k("div", ax, [...d[1] || (d[1] = [
          u("p", { class: "empty-title" }, "No daily CSAT P95 available", -1),
          u("p", { class: "empty-description" }, " No CSAT P95 points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}, Qi = /* @__PURE__ */ rt(ox, [["__scopeId", "data-v-91d3b9d9"]]), sx = {
  key: 0,
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, ix = {
  key: 1,
  class: "card-body"
}, lx = {
  key: 2,
  class: "empty-state"
}, rx = /* @__PURE__ */ J({
  __name: "npsResolutionMetrics",
  props: {
    data: {
      type: Object,
      default: () => null
    },
    loading: {
      type: Boolean,
      default: !1
    }
  },
  setup(t) {
    const e = t, n = C(
      () => e.data?.resolution_breakdown || []
    ), a = C(
      () => n.value.some((i) => Number(i.count || 0) > 0)
    ), o = C(() => {
      const i = n.value;
      return {
        labels: i.map((l) => l.label || String(l.score)),
        datasets: [
          {
            label: "Resolution %",
            data: i.map((l) => Number(l.percentage || 0)),
            backgroundColor: ["#10B981", "#EF4444"],
            borderRadius: 8
          }
        ]
      };
    }), s = {
      plugins: {
        tooltip: {
          callbacks: {
            label: (i) => `${i.parsed.y.toFixed(2)}%`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: !0,
          max: 100,
          ticks: {
            callback: (i) => `${i}%`
          }
        }
      }
    };
    return (i, l) => (b(), q(gt, {
      class: "nps-resolution-root h-full min-h-0",
      title: "CSAT Resolution",
      subtitle: "Resolution answers distribution (1=Si, 2=No)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: I(() => [
        e.loading ? (b(), k("div", sx, [...l[0] || (l[0] = [
          u("div", {
            class: "flex-1 bm-skeleton-blink",
            "aria-hidden": "true"
          }, null, -1)
        ])])) : a.value ? (b(), k("div", ix, [
          V(be, {
            data: o.value,
            options: s,
            "uppercase-legend-labels": !0
          }, null, 8, ["data"])
        ])) : (b(), k("div", lx, [...l[1] || (l[1] = [
          u("p", { class: "empty-title" }, "No resolution answers available", -1),
          u("p", { class: "empty-description" }, " This airline has the resolution survey configured, but no responses were found for the selected dates. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), cx = /* @__PURE__ */ rt(rx, [["__scopeId", "data-v-385cdc25"]]), dx = {
  key: 0,
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, ux = {
  key: 1,
  class: "card-body"
}, hx = {
  key: 2,
  class: "empty-state"
}, fx = /* @__PURE__ */ J({
  __name: "npsPulseMetrics",
  props: {
    data: {
      type: Object,
      default: () => null
    },
    loading: {
      type: Boolean,
      default: !1
    }
  },
  setup(t) {
    const e = t, n = C(() => e.data?.csat_pulse_by_day || []), a = C(() => n.value.length > 0), o = C(() => ({
      labels: n.value.map((i) => i.date || ""),
      datasets: [
        {
          label: "CSAT Pulse",
          data: n.value.map((i) => Number(i.csat_pulse || 0)),
          borderColor: "#2563EB",
          pointBorderColor: "#2563EB",
          pointBackgroundColor: "#FFFFFF",
          tension: 0.25
        }
      ]
    })), s = {
      scales: {
        y: {
          min: -200,
          max: 100,
          ticks: {
            callback: (i) => `${i}%`
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (i) => `${i.parsed.y.toFixed(2)}%`
          }
        }
      }
    };
    return (i, l) => (b(), q(gt, {
      class: "nps-pulse-root h-full min-h-0",
      title: "CSAT Pulse",
      subtitle: "Weighted index: Σ(frequency × weight) / total surveys × 100",
      collapsible: !1,
      loading: e.loading
    }, {
      default: I(() => [
        e.loading ? (b(), k("div", dx, [...l[0] || (l[0] = [
          u("div", {
            class: "flex-1 bm-skeleton-blink",
            "aria-hidden": "true"
          }, null, -1)
        ])])) : a.value ? (b(), k("div", ux, [
          V(he, {
            data: o.value,
            options: s,
            "uppercase-legend-labels": !0
          }, null, 8, ["data"])
        ])) : (b(), k("div", hx, [...l[1] || (l[1] = [
          u("p", { class: "empty-title" }, "No CSAT Pulse data available", -1),
          u("p", { class: "empty-description" }, " No CSAT pulse points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), gx = /* @__PURE__ */ rt(fx, [["__scopeId", "data-v-f12369b6"]]), px = { class: "nps-metrics-container" }, mx = {
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
    },
    showResolutionChart: {
      type: Boolean,
      default: !1
    },
    showCsatPulseChart: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["export"],
  setup(t, { emit: e }) {
    const n = e, a = (l) => {
      n("export", l);
    }, o = t, s = C(() => o.showResolutionChart), i = C(() => o.showCsatPulseChart);
    return (l, r) => (b(), k("div", px, [
      V(Zi, {
        data: t.data,
        loading: t.loading,
        "enable-export": t.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"]),
      V(Qi, {
        data: t.data,
        loading: t.loading,
        "enable-export": t.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"]),
      s.value ? (b(), q(cx, {
        key: 0,
        data: t.data,
        loading: t.loading
      }, null, 8, ["data", "loading"])) : O("", !0),
      i.value ? (b(), q(gx, {
        key: 1,
        data: t.data,
        loading: t.loading
      }, null, 8, ["data", "loading"])) : O("", !0)
    ]));
  }
}, Ji = /* @__PURE__ */ rt(mx, [["__scopeId", "data-v-101623e8"]]), bx = { class: "csat-container__body" }, vx = /* @__PURE__ */ J({
  __name: "CSATContainer",
  props: {
    containerInitiallyOpen: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    enableExport: { type: Boolean, default: !1 },
    data: { default: void 0 },
    showResolutionChart: { type: Boolean, default: !1 },
    showCsatPulseChart: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(t, { emit: e }) {
    const n = e;
    function a(o) {
      n("export", { source: "npsMetrics", format: o });
    }
    return (o, s) => (b(), q(gt, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": t.containerInitiallyOpen,
      loading: t.loading
    }, {
      default: I(() => [
        u("div", bx, [
          V(Ji, {
            data: t.data,
            loading: t.loading,
            "enable-export": t.enableExport,
            "show-resolution-chart": t.showResolutionChart,
            "show-csat-pulse-chart": t.showCsatPulseChart,
            onExport: a
          }, null, 8, ["data", "loading", "enable-export", "show-resolution-chart", "show-csat-pulse-chart"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), yx = /* @__PURE__ */ rt(vx, [["__scopeId", "data-v-71605c0e"]]), xx = /* @__PURE__ */ J({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(t, { expose: e }) {
    const n = t, a = ot(null), o = C(() => De(n.totalRevenue)), s = C(() => L(a.value?.isDark) ?? !1), i = C(() => L(a.value?.changePercent) ?? 0);
    return e({ isDark: s, changePercent: i }), (l, r) => (b(), q(In, {
      label: "AI Revenue",
      value: o.value,
      prefix: t.currencyCode,
      "value-size": "large",
      loading: t.loading,
      theme: t.theme,
      "current-value": t.totalRevenue,
      "previous-value": t.previousTotalRevenue,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: I(() => [...r[0] || (r[0] = [
        u("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.75",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          u("path", { d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" }),
          u("path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" }),
          u("path", { d: "M12 18V6" })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "prefix", "loading", "theme", "current-value", "previous-value"]));
  }
}), _x = { class: "flex justify-end" }, kx = {
  key: 0,
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, wx = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Cx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, $x = { class: "flex flex-wrap gap-4" }, Mx = { class: "text-[var(--kiut-text-primary,#111827)]" }, Sx = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5" }, Dx = { class: "flex items-center gap-2 truncate text-sm font-medium text-[var(--kiut-text-secondary,#6b7280)]" }, Ax = { class: "truncate" }, Tx = { class: "mt-1 text-2xl font-bold text-[var(--kiut-text-primary,#111827)]" }, Bx = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Lx = /* @__PURE__ */ J({
  __name: "HumanEscalations",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(t, { expose: e, emit: n }) {
    const a = t, o = n, s = pt(a, "theme"), { isDark: i } = vt(s), l = ot(a.breakdownBy), r = C(() => a.data ?? {
      total_conversations: 0,
      total_escalated_conversations: 0,
      escalation_rate_percentage: 0,
      breakdown_by: "all",
      breakdown_items: [],
      breakdown_by_day: [],
      escalations_by_day: []
    }), c = ot({
      labels: [],
      datasets: []
    }), d = ot([]), h = ot(
      []
    ), p = [
      "#3b82f6",
      "#f59e0b",
      "#06b6d4",
      "#8b5cf6",
      "#22c55e",
      "#ef4444",
      "#14b8a6"
    ], v = (m) => p[m % p.length], f = () => {
      o("changeBreakdown", l.value);
    }, y = (m) => {
      if (!m) return "";
      const x = m.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return x ? x.charAt(0).toUpperCase() + x.slice(1) : "";
    }, _ = (m) => {
      if (l.value === "all") {
        const M = m?.escalations_by_day ?? [];
        if (!M.length) {
          c.value = { labels: [], datasets: [] }, d.value = [], h.value = [];
          return;
        }
        const F = [...M].sort((T, B) => T.date.localeCompare(B.date));
        c.value = {
          labels: F.map((T) => Rt(T.date).format("MMM DD")),
          datasets: [
            {
              label: "All",
              data: F.map(
                (T) => Number(T.escalation_rate_percentage || 0)
              ),
              borderColor: "#8b5cf6",
              backgroundColor: "transparent",
              fill: !1,
              tension: 0.35
            }
          ]
        }, d.value = [], h.value = [];
        return;
      }
      const g = m?.breakdown_by_day ?? [], x = m?.breakdown_items ?? [];
      if (!g.length) {
        c.value = { labels: [], datasets: [] }, d.value = [], h.value = [];
        return;
      }
      const w = [...g].sort(
        (M, F) => M.date.localeCompare(F.date)
      ), D = x.slice(0, 5).map((M) => M.key), S = w.map((M) => Rt(M.date).format("MMM DD")), $ = D.map((M, F) => {
        const T = x.find((B) => B.key === M);
        return {
          label: y(T?.label || M),
          data: w.map((B) => {
            const P = B.items.find((E) => E.key === M);
            return Number(P?.percentage || 0);
          }),
          borderColor: v(F),
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      c.value = {
        labels: S,
        datasets: $
      }, d.value = x.slice(0, 5).map((M, F) => ({
        key: M.key,
        label: y(M.label),
        percentage: Number(M.percentage || 0),
        color: v(F)
      })), h.value = x.slice(0, 5).map((M, F) => ({
        key: M.key,
        label: y(M.label),
        color: v(F)
      }));
    };
    return Bt(
      () => a.data,
      (m) => {
        _(m ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Bt(
      () => a.breakdownBy,
      (m) => {
        l.value = m, _(r.value);
      }
    ), e({ isDark: i }), (m, g) => (b(), q(gt, {
      class: "w-full min-h-0 self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1,
      loading: t.loading
    }, {
      headerAside: I(() => [
        u("div", _x, [
          Jt(u("select", {
            "onUpdate:modelValue": g[0] || (g[0] = (x) => l.value = x),
            class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: f
          }, [...g[1] || (g[1] = [
            u("option", { value: "all" }, "All", -1),
            u("option", { value: "agent" }, "By Agent", -1),
            u("option", { value: "channel" }, "By Channel", -1),
            u("option", { value: "agent_channel" }, "By Agent/Channel", -1)
          ])], 544), [
            [fl, l.value]
          ])
        ])
      ]),
      default: I(() => [
        u("div", {
          class: U(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          a.loading ? (b(), k("div", kx, [...g[2] || (g[2] = [
            u("div", {
              class: "flex-1 bm-skeleton-blink",
              "aria-hidden": "true"
            }, null, -1)
          ])])) : (b(), k(G, { key: 1 }, [
            c.value.labels && c.value.labels.length && c.value.datasets.length ? (b(), k("section", wx, [
              u("div", Cx, [
                V(he, {
                  data: c.value,
                  theme: s.value
                }, null, 8, ["data", "theme"])
              ]),
              u("div", $x, [
                (b(!0), k(G, null, it(h.value, (x) => (b(), k("div", {
                  key: `legend-${x.key}`,
                  class: "inline-flex items-center gap-2 text-sm"
                }, [
                  u("span", {
                    class: "inline-block h-2.5 w-2.5 rounded-full",
                    style: yt({ backgroundColor: x.color })
                  }, null, 4),
                  u("span", Mx, A(x.label), 1)
                ]))), 128))
              ]),
              u("div", Sx, [
                (b(!0), k(G, null, it(d.value, (x) => (b(), k("div", {
                  key: `card-${x.key}`,
                  class: "rounded-xl border border-[var(--kiut-border-light,#e5e7eb)] p-3"
                }, [
                  u("p", Dx, [
                    u("span", {
                      class: "inline-block h-2.5 w-2.5 rounded-full",
                      style: yt({ backgroundColor: x.color })
                    }, null, 4),
                    u("span", Ax, A(x.label), 1)
                  ]),
                  u("p", Tx, A(x.percentage.toFixed(1)) + "% ", 1)
                ]))), 128))
              ])
            ])) : (b(), k("section", Bx, [...g[3] || (g[3] = [
              u("div", { class: "max-w-[360px] px-4 text-center" }, [
                u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No human escalations data available "),
                u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No escalation data found for the selected period. Try adjusting the date range. ")
              ], -1)
            ])]))
          ], 64))
        ], 2)
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Fx = /* @__PURE__ */ rt(Lx, [["__scopeId", "data-v-1dea1792"]]), Px = /* @__PURE__ */ J({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(t, { expose: e }) {
    const n = t, a = ot(null), o = C(() => `${Number(n.escalationRatePercentage || 0).toFixed(2)}%`), s = C(() => L(a.value?.isDark) ?? !1), i = C(() => L(a.value?.changePercent) ?? 0);
    return e({ isDark: s, changePercent: i }), (l, r) => (b(), q(In, {
      label: "Human Escalations",
      value: o.value,
      loading: t.loading,
      theme: t.theme,
      "current-value": t.escalationRatePercentage,
      "previous-value": t.previousEscalationRatePercentage,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: I(() => [...r[0] || (r[0] = [
        u("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M15 7.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          }),
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M4.5 19.5a7.5 7.5 0 0 1 9.36-7.29"
          }),
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "m17.25 15.75 4.5 4.5"
          }),
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "m21.75 15.75-4.5 4.5"
          })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), Ex = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Ix = {
  key: 0,
  class: "flex min-h-[320px] flex-col items-center justify-center px-4"
}, Rx = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, Ox = {
  key: 1,
  class: "flex w-full shrink-0 flex-col min-h-0"
}, Vx = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, zx = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, Nx = {
  key: 2,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, Wx = { class: "max-w-[360px] text-center" }, jx = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, Hx = {
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
  setup(t) {
    const e = t, { isDark: n, colors: a } = vt(pt(e, "theme")), o = [30, 50, 70, 50, 40], s = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], i = C(() => {
      const c = e.data ?? {}, d = c.daily, h = c.days, p = Array.isArray(d) && d.length > 0, v = Array.isArray(h) && h.length > 0 && Array.isArray(c.allocatedCostSeries) && c.allocatedCostSeries.length === h.length;
      let f = [];
      return p ? f = d : v && (f = h.map((y, _) => ({
        date: y,
        allocated_cost: c.allocatedCostSeries[_] ?? 0,
        aws_cost: c.awsCostSeries[_] ?? 0,
        airline_conversations: c.airlineConversationsSeries[_] ?? 0
      }))), {
        daily: f,
        total_allocated_cost: c.total_allocated_cost ?? c.totalAllocated ?? 0,
        total_cost: c.total_cost ?? c.total ?? 0,
        total_conversations: c.total_conversations ?? c.totalConversations ?? 0,
        total_airline_conversations: c.total_airline_conversations ?? c.totalAirlineConversations ?? 0,
        airline_name: c.airline_name
      };
    }), l = C(() => {
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
    }), r = C(() => ({
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
              const d = c.dataset.label ? `${c.dataset.label}: ` : "", h = c.parsed.y;
              return c.dataset.yAxisID === "y" ? d + Ct(h) : d + String(h);
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
            callback: (c) => Ct(c)
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
    return (c, d) => (b(), q(gt, {
      title: i.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1
    }, {
      default: I(() => [
        u("div", Ex, [
          t.loading ? (b(), k("div", Ix, [
            u("div", Rx, [
              (b(), k(G, null, it(o, (h, p) => u("div", {
                key: p,
                class: U(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", s[p]]),
                style: yt({ height: `${h}%` })
              }, null, 6)), 64))
            ]),
            d[0] || (d[0] = u("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading chart data... ", -1))
          ])) : i.value.daily.length > 0 ? (b(), k("div", Ox, [
            u("div", Vx, [
              V(he, {
                class: "h-full min-h-0 w-full",
                data: l.value,
                options: r.value
              }, null, 8, ["data", "options"])
            ]),
            u("div", zx, [
              V(ut, {
                color: L(a).primaryLight,
                title: "Total Allocated",
                value: L(Ct)(i.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              V(ut, {
                color: "#FF9900",
                title: "Total AWS",
                value: L(Ct)(i.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (b(), k("section", Nx, [
            u("div", Wx, [
              u("div", jx, [
                V(L(qt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
              ]),
              d[1] || (d[1] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " Sin datos de costos ", -1)),
              d[2] || (d[2] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["title"]));
  }
}, Yx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Kx = {
  key: 0,
  class: "card-body"
}, Ux = {
  key: 0,
  class: "chart-section"
}, qx = { class: "chart-container" }, Xx = { class: "mt-auto grid grid-cols-2 gap-3 sm:grid-cols-3 max-[768px]:gap-2" }, Gx = {
  key: 1,
  class: "empty-state"
}, Zx = { class: "empty-state-content" }, Qx = { class: "empty-icon-wrapper" }, Jx = {
  key: 1,
  class: "loading-state"
}, gn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Vs = 10, t_ = /* @__PURE__ */ J({
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
  setup(t, { expose: e, emit: n }) {
    const a = t, { isDark: o, colors: s } = vt(pt(a, "theme")), i = (f) => {
      const y = new Date(f), _ = String(y.getDate()).padStart(2, "0"), m = String(y.getMonth() + 1).padStart(2, "0");
      return `${_}-${m}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, r = C(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((y, _) => y + (_.input_cost || 0), 0);
    }), c = C(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((y, _) => y + (_.output_cost || 0), 0);
    }), d = C(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((y, _) => y + (_.cache_read_cost || 0), 0);
    }), h = C(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((y, _) => y + (_.cache_write_cost || 0), 0);
    }), p = C(() => {
      const f = a.data?.costs_by_day || {}, y = Object.keys(f).sort();
      if (y.length === 0)
        return { labels: [], datasets: [] };
      const _ = y.map((g) => i(g)), m = [
        {
          label: "Input Cost",
          data: y.map((g) => f[g]?.input_cost || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: y.map((g) => f[g]?.output_cost || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: y.map((g) => f[g]?.cache_read_cost || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: y.map((g) => f[g]?.cache_write_cost || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: _,
        datasets: m
      };
    }), v = C(() => a.options ? a.options : {
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
              family: gn,
              size: 13,
              weight: "500"
            },
            color: s.value.textSecondary,
            padding: 12,
            boxWidth: Vs,
            boxHeight: Vs,
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
            family: gn,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: gn,
            size: 12,
            weight: "500"
          },
          callbacks: {
            label: function(f) {
              let y = f.dataset.label || "";
              return y && (y += ": "), f.parsed.y !== null && (y += Ct(f.parsed.y)), y;
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
            font: { family: gn, size: 12, weight: "500" },
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
            font: { family: gn, size: 12, weight: "500" },
            color: s.value.textSecondary,
            padding: 8,
            callback: function(f) {
              return Ct(f);
            }
          }
        }
      }
    });
    return e({ isDark: o }), (f, y) => (b(), q(gt, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1
    }, {
      default: I(() => [
        u("div", Yx, [
          t.loading ? (b(), k("div", Jx, [...y[2] || (y[2] = [
            u("div", { class: "loading-container" }, [
              u("div", { class: "chart-lines-loader" }, [
                u("div", { class: "line line-1" }),
                u("div", { class: "line line-2" }),
                u("div", { class: "line line-3" }),
                u("div", { class: "line line-4" }),
                u("div", { class: "line line-5" })
              ]),
              u("p", { class: "loading-text" }, "Loading chart data...")
            ], -1)
          ])])) : (b(), k("div", Kx, [
            p.value.labels && p.value.labels.length ? (b(), k("section", Ux, [
              u("div", qx, [
                V(be, {
                  data: p.value,
                  options: v.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", Xx, [
                V(ut, {
                  title: "Total Cost",
                  value: L(Ct)(t.data.total_cost)
                }, null, 8, ["value"]),
                V(ut, {
                  title: "Input Cost",
                  value: L(Ct)(r.value),
                  color: l.input
                }, null, 8, ["value", "color"]),
                V(ut, {
                  title: "Output Cost",
                  value: L(Ct)(c.value),
                  color: l.output
                }, null, 8, ["value", "color"]),
                V(ut, {
                  title: "Cache Read",
                  value: L(Ct)(d.value),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                V(ut, {
                  title: "Cache Write",
                  value: L(Ct)(h.value),
                  color: l.cache_write
                }, null, 8, ["value", "color"]),
                V(ut, {
                  title: "Avg / Conv.",
                  value: L(Ct)(t.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (b(), k("section", Gx, [
              u("div", Zx, [
                u("div", Qx, [
                  V(L(qt), { class: "empty-icon" })
                ]),
                y[0] || (y[0] = u("p", { class: "empty-title" }, "No cost usage data", -1)),
                y[1] || (y[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), e_ = /* @__PURE__ */ rt(t_, [["__scopeId", "data-v-39a5448c"]]), n_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, a_ = {
  key: 0,
  class: "card-body"
}, o_ = {
  key: 0,
  class: "chart-section"
}, s_ = { class: "chart-container" }, i_ = { class: "mt-auto flex w-full min-w-0 flex-nowrap items-stretch gap-2 sm:gap-3" }, l_ = {
  key: 1,
  class: "empty-state"
}, r_ = { class: "empty-state-content" }, c_ = { class: "empty-icon-wrapper" }, d_ = {
  key: 1,
  class: "loading-state"
}, pn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", zs = 10, u_ = /* @__PURE__ */ J({
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
  setup(t, { expose: e, emit: n }) {
    const a = t, { isDark: o, colors: s } = vt(pt(a, "theme")), i = (d) => {
      const h = new Date(d), p = String(h.getDate()).padStart(2, "0"), v = String(h.getMonth() + 1).padStart(2, "0");
      return `${p}-${v}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, r = C(() => {
      const d = a.data?.tokens_by_day || {}, h = Object.keys(d).sort();
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const p = h.map((f) => i(f)), v = [
        {
          label: "Input Tokens",
          data: h.map((f) => d[f]?.input_tokens || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: h.map((f) => d[f]?.output_tokens || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: h.map((f) => d[f]?.cache_read_tokens || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: h.map((f) => d[f]?.cache_write_tokens || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: p,
        datasets: v
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
          position: "bottom",
          align: "center",
          labels: {
            font: {
              family: pn,
              size: 13,
              weight: "500"
            },
            color: s.value.textSecondary,
            padding: 12,
            boxWidth: zs,
            boxHeight: zs,
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
            family: pn,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: pn,
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
            font: { family: pn, size: 12, weight: "500" },
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
            font: { family: pn, size: 12, weight: "500" },
            color: s.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return e({ isDark: o }), (d, h) => (b(), q(gt, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1
    }, {
      default: I(() => [
        u("div", n_, [
          t.loading ? (b(), k("div", d_, [...h[2] || (h[2] = [
            u("div", { class: "loading-container" }, [
              u("div", { class: "chart-lines-loader" }, [
                u("div", { class: "line line-1" }),
                u("div", { class: "line line-2" }),
                u("div", { class: "line line-3" }),
                u("div", { class: "line line-4" }),
                u("div", { class: "line line-5" })
              ]),
              u("p", { class: "loading-text" }, "Loading chart data...")
            ], -1)
          ])])) : (b(), k("div", a_, [
            r.value.labels && r.value.labels.length ? (b(), k("section", o_, [
              u("div", s_, [
                V(be, {
                  data: r.value,
                  options: c.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", i_, [
                V(ut, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: L(Z)(t.data.total_tokens)
                }, null, 8, ["value"]),
                V(ut, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: L(Z)(t.data.total_input_tokens),
                  color: l.input
                }, null, 8, ["value", "color"]),
                V(ut, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: L(Z)(t.data.total_output_tokens),
                  color: l.output
                }, null, 8, ["value", "color"]),
                V(ut, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: L(Z)(t.data.total_cache_read_tokens),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                V(ut, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: L(Z)(t.data.total_cache_write_tokens),
                  color: l.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (b(), k("section", l_, [
              u("div", r_, [
                u("div", c_, [
                  V(L(qt), { class: "empty-icon" })
                ]),
                h[0] || (h[0] = u("p", { class: "empty-title" }, "No token usage data", -1)),
                h[1] || (h[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see token consumption trends.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), h_ = /* @__PURE__ */ rt(u_, [["__scopeId", "data-v-70c6f3c7"]]), f_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, g_ = {
  key: 0,
  class: "card-body"
}, p_ = {
  key: 0,
  class: "chart-section"
}, m_ = { class: "chart-container" }, b_ = { class: "mt-4 w-full min-w-0" }, v_ = {
  key: 1,
  class: "empty-state"
}, y_ = { class: "empty-state-content" }, x_ = { class: "empty-icon-wrapper" }, __ = {
  key: 1,
  class: "loading-state"
}, k_ = /* @__PURE__ */ J({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(t, { expose: e }) {
    const n = t, { isDark: a, colors: o } = vt(pt(n, "theme")), s = (c) => {
      const d = new Date(c), h = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = C(
      () => Z(n.data?.total_conversations ?? 0)
    ), l = C(() => {
      const c = n.data?.conversations_by_day || {}, d = Object.keys(c).sort();
      if (d.length === 0)
        return { labels: [], datasets: [] };
      const h = d.map((v) => s(v)), p = [
        {
          label: "Conversations",
          data: d.map((v) => c[v] || 0),
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
        datasets: p
      };
    }), r = C(() => n.options ? n.options : {
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
              let d = c.dataset.label || "";
              return d && (d += ": "), c.parsed.y !== null && (d += c.parsed.y), d;
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
    return e({ isDark: a }), (c, d) => (b(), q(gt, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1
    }, {
      default: I(() => [
        u("div", f_, [
          t.loading ? (b(), k("div", __, [...d[2] || (d[2] = [
            u("div", { class: "loading-container" }, [
              u("div", { class: "chart-lines-loader" }, [
                u("div", { class: "line line-1" }),
                u("div", { class: "line line-2" }),
                u("div", { class: "line line-3" }),
                u("div", { class: "line line-4" }),
                u("div", { class: "line line-5" })
              ]),
              u("p", { class: "loading-text" }, "Loading chart data...")
            ], -1)
          ])])) : (b(), k("div", g_, [
            l.value.labels && l.value.labels.length ? (b(), k("section", p_, [
              u("div", m_, [
                V(he, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ]),
              u("div", b_, [
                V(ut, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (b(), k("section", v_, [
              u("div", y_, [
                u("div", x_, [
                  V(L(qt), { class: "empty-icon" })
                ]),
                d[0] || (d[0] = u("p", { class: "empty-title" }, "No conversation count data", -1)),
                d[1] || (d[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), w_ = /* @__PURE__ */ rt(k_, [["__scopeId", "data-v-b33e8627"]]), C_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, $_ = {
  key: 0,
  class: "card-body"
}, M_ = {
  key: 0,
  class: "charts-grid"
}, S_ = { class: "chart-section" }, D_ = { class: "chart-container" }, A_ = { class: "chart-section" }, T_ = { class: "chart-container" }, B_ = {
  key: 1,
  class: "empty-state"
}, L_ = { class: "empty-state-content" }, F_ = { class: "empty-icon-wrapper" }, P_ = {
  key: 1,
  class: "loading-state"
}, E_ = /* @__PURE__ */ J({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(t, { expose: e }) {
    const n = t, { isDark: a, colors: o } = vt(pt(n, "theme")), s = C(() => n.data?.top_agents && n.data.top_agents.length > 0), i = C(() => n.data?.top_agents ? [...n.data.top_agents].sort((p, v) => (v.total_cost || 0) - (p.total_cost || 0)) : []), l = C(() => n.data?.top_agents ? [...n.data.top_agents].sort((p, v) => (v.total_tokens || 0) - (p.total_tokens || 0)) : []), r = C(() => {
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
    }), c = C(() => {
      const p = l.value;
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
    }), d = C(() => n.options ? n.options : {
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
            title: function(p) {
              return p[0]?.label || "";
            },
            label: function(p) {
              const v = p.label, f = n.data?.top_agents?.find((y) => y.agent_type === v);
              return f ? [
                `Total Cost: ${Ct(f.total_cost)}`,
                `Input Cost: ${Ct(f.total_input_tokens_cost)}`,
                `Output Cost: ${Ct(f.total_output_tokens_cost)}`,
                `Cache Read: ${Ct(f.total_read_tokens_cost)}`,
                `Cache Write: ${Ct(f.total_write_tokens_cost)}`
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
            callback: function(p) {
              return Ct(p);
            }
          }
        }
      }
    }), h = C(() => n.options ? n.options : {
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
            title: function(p) {
              return p[0]?.label || "";
            },
            label: function(p) {
              const v = p.label, f = n.data?.top_agents?.find((y) => y.agent_type === v);
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
            callback: function(p) {
              return p.toLocaleString();
            }
          }
        }
      }
    });
    return e({ isDark: a }), (p, v) => (b(), q(gt, {
      class: "h-full min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1
    }, {
      default: I(() => [
        u("div", C_, [
          t.loading ? (b(), k("div", P_, [...v[4] || (v[4] = [
            u("div", { class: "loading-container" }, [
              u("div", { class: "chart-lines-loader" }, [
                u("div", { class: "line line-1" }),
                u("div", { class: "line line-2" }),
                u("div", { class: "line line-3" }),
                u("div", { class: "line line-4" }),
                u("div", { class: "line line-5" })
              ]),
              u("p", { class: "loading-text" }, "Loading chart data...")
            ], -1)
          ])])) : (b(), k("div", $_, [
            s.value ? (b(), k("div", M_, [
              u("section", S_, [
                v[0] || (v[0] = u("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                u("div", D_, [
                  V(be, {
                    data: r.value,
                    options: d.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              u("section", A_, [
                v[1] || (v[1] = u("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                u("div", T_, [
                  V(be, {
                    data: c.value,
                    options: h.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (b(), k("section", B_, [
              u("div", L_, [
                u("div", F_, [
                  V(L(qt), { class: "empty-icon" })
                ]),
                v[2] || (v[2] = u("p", { class: "empty-title" }, "No top agents data", -1)),
                v[3] || (v[3] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), I_ = /* @__PURE__ */ rt(E_, [["__scopeId", "data-v-a5014772"]]), R_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, O_ = {
  key: 0,
  class: "card-body"
}, V_ = {
  key: 0,
  class: "chart-section"
}, z_ = { class: "chart-container" }, N_ = {
  key: 1,
  class: "empty-state"
}, W_ = { class: "empty-state-content" }, j_ = { class: "empty-icon-wrapper" }, H_ = {
  key: 1,
  class: "loading-state"
}, Y_ = /* @__PURE__ */ J({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(t, { expose: e }) {
    const n = t, { isDark: a, colors: o } = vt(pt(n, "theme")), s = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, i = C(() => n.data?.top_agents ? n.data.top_agents.filter(
      (h) => h.agent_type?.toLowerCase() !== "triage"
    ) : []), l = C(() => i.value.length > 0), r = C(() => i.value.reduce((h, p) => h + (p.conversations || 0), 0)), c = C(() => {
      const h = i.value;
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const p = h.map((y) => {
        const _ = y.agent_type?.toLowerCase();
        return (s[_] || "#a78bfa") + "80";
      }), v = h.map((y) => {
        const _ = y.agent_type?.toLowerCase();
        return s[_] || "#a78bfa";
      });
      return {
        labels: h.map((y) => {
          const _ = y.conversations || 0, m = r.value ? _ / r.value * 100 : 0;
          return `${y.agent_type} - ${_.toLocaleString()} (${m.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((y) => y.conversations || 0),
            backgroundColor: p,
            borderColor: v,
            borderWidth: 2
          }
        ]
      };
    }), d = C(() => n.options ? n.options : {
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
              const p = (h.label || "").toString(), v = Number(h.parsed) || 0, f = (h.dataset.data || []).reduce((_, m) => _ + (Number(m) || 0), 0), y = f ? v / f * 100 : 0;
              return `${p}: ${v.toLocaleString()} (${y.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return e({ isDark: a }), (h, p) => (b(), q(gt, {
      class: "h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1
    }, {
      default: I(() => [
        u("div", R_, [
          t.loading ? (b(), k("div", H_, [...p[2] || (p[2] = [
            u("div", { class: "loading-container" }, [
              u("div", { class: "chart-lines-loader" }, [
                u("div", { class: "line line-1" }),
                u("div", { class: "line line-2" }),
                u("div", { class: "line line-3" }),
                u("div", { class: "line line-4" }),
                u("div", { class: "line line-5" })
              ]),
              u("p", { class: "loading-text" }, "Loading chart data...")
            ], -1)
          ])])) : (b(), k("div", O_, [
            l.value ? (b(), k("section", V_, [
              u("div", z_, [
                V(pa, {
                  data: c.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (b(), k("section", N_, [
              u("div", W_, [
                u("div", j_, [
                  V(L(qt), { class: "empty-icon" })
                ]),
                p[0] || (p[0] = u("p", { class: "empty-title" }, "No top agents data", -1)),
                p[1] || (p[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), K_ = /* @__PURE__ */ rt(Y_, [["__scopeId", "data-v-14445b91"]]), U_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, q_ = {
  key: 0,
  class: "card-body"
}, X_ = {
  key: 0,
  class: "chart-section"
}, G_ = { class: "chart-container" }, Z_ = {
  key: 1,
  class: "empty-state"
}, Q_ = { class: "empty-state-content" }, J_ = { class: "empty-icon-wrapper" }, tk = {
  key: 1,
  class: "loading-state"
}, ek = /* @__PURE__ */ J({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(t, { expose: e }) {
    const n = t, { isDark: a, colors: o } = vt(pt(n, "theme")), s = (c) => {
      const d = new Date(c), h = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = C(() => {
      const c = n.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(c) && c.length > 0)
        return !0;
      const d = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {};
      return Object.keys(d).length > 0 && Object.keys(h).length > 0;
    }), l = C(() => {
      const c = n.costData?.daily_mean_cost_per_conversation || [];
      if (c.length > 0) {
        const _ = [...c].sort((m, g) => m.date.localeCompare(g.date));
        return {
          labels: _.map((m) => s(m.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: _.map((m) => Number(m.value) || 0),
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
      const d = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {}, v = Object.keys(d).filter((_) => h[_]).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const f = v.map((_) => s(_)), y = v.map((_) => {
        const m = d[_]?.total_cost || 0, g = h[_] || 0;
        return g > 0 ? m / g : 0;
      });
      return {
        labels: f,
        datasets: [
          {
            label: "Mean USD/conv",
            data: y,
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
    }), r = C(() => n.options ? n.options : {
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
              let d = c.dataset.label || "";
              return d && (d += ": "), c.parsed.y !== null && (d += Ct(c.parsed.y)), d;
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
              return Ct(c);
            }
          }
        }
      }
    });
    return e({ isDark: a }), (c, d) => (b(), q(gt, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1
    }, {
      default: I(() => [
        u("div", U_, [
          t.loading ? (b(), k("div", tk, [...d[2] || (d[2] = [
            u("div", { class: "loading-container" }, [
              u("div", { class: "chart-lines-loader" }, [
                u("div", { class: "line line-1" }),
                u("div", { class: "line line-2" }),
                u("div", { class: "line line-3" }),
                u("div", { class: "line line-4" }),
                u("div", { class: "line line-5" })
              ]),
              u("p", { class: "loading-text" }, "Loading chart data...")
            ], -1)
          ])])) : (b(), k("div", q_, [
            i.value ? (b(), k("section", X_, [
              u("div", G_, [
                V(he, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (b(), k("section", Z_, [
              u("div", Q_, [
                u("div", J_, [
                  V(L(qt), { class: "empty-icon" })
                ]),
                d[0] || (d[0] = u("p", { class: "empty-title" }, "No daily cost trends data", -1)),
                d[1] || (d[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), nk = /* @__PURE__ */ rt(ek, [["__scopeId", "data-v-1e8204ea"]]);
function Wt() {
  const t = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(t), Array.from(t, (e) => e.toString(16).padStart(2, "0")).join("");
}
const ak = { class: "tabs text-sm" }, ok = ["aria-label"], sk = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], ik = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, lk = /* @__PURE__ */ J({
  name: "Tabs",
  __name: "Tabs",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Tabs" },
    fullWidth: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change", "tab-click"],
  setup(t, { emit: e }) {
    const n = t, a = e, o = ot([]), s = `tabs-${Wt()}`, i = (f) => `${s}-tab-${f}`, l = C(
      () => n.items.map((f, y) => f.disabled ? -1 : y).filter((f) => f >= 0)
    );
    function r(f) {
      return f.value === n.modelValue;
    }
    function c(f) {
      const y = r(f), m = `${n.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-8 max-h-8 min-h-8 items-stretch cursor-pointer rounded-lg border border-transparent text-center outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return f.disabled ? `${m} cursor-not-allowed opacity-40` : y ? `${m} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${m} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function d(f, y) {
      f === y || n.items.find((m) => m.value === f)?.disabled || (a("update:modelValue", f), a("change", { value: f, previousValue: y }));
    }
    function h(f, y) {
      a("tab-click", { value: f.value, originalEvent: y }), !f.disabled && (d(f.value, n.modelValue), Ot(() => {
        o.value[n.items.indexOf(f)]?.focus();
      }));
    }
    function p(f, y) {
      const _ = n.items.length;
      if (_ === 0) return 0;
      let m = f;
      for (let g = 0; g < _; g++)
        if (m = (m + y + _) % _, !n.items[m]?.disabled) return m;
      return f;
    }
    async function v(f, y) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(f.key)) return;
      f.preventDefault();
      let m = y;
      f.key === "ArrowLeft" ? m = p(y, -1) : f.key === "ArrowRight" ? m = p(y, 1) : f.key === "Home" ? m = l.value[0] ?? 0 : f.key === "End" && (m = l.value[l.value.length - 1] ?? y);
      const g = n.items[m];
      !g || g.disabled || (d(g.value, n.modelValue), await Ot(), o.value[m]?.focus());
    }
    return (f, y) => (b(), k("div", ak, [
      u("div", {
        role: "tablist",
        "aria-label": t.ariaLabel,
        class: U([
          "box-border h-10 max-h-10 min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 px-0.5 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          t.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (b(!0), k(G, null, it(t.items, (_, m) => (b(), k("button", {
          id: i(_.value),
          key: _.value,
          ref_for: !0,
          ref_key: "tabRefs",
          ref: o,
          type: "button",
          role: "tab",
          "aria-selected": r(_),
          "aria-disabled": _.disabled === !0,
          tabindex: r(_) ? 0 : -1,
          class: U(c(_)),
          onClick: (g) => h(_, g),
          onKeydown: (g) => v(g, m)
        }, [
          u("span", {
            class: U(["tabs-tab__label flex min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": t.fullWidth }])
          }, [
            _.icon ? (b(), q(tn(_.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : O("", !0),
            u("span", ik, A(_.label), 1)
          ], 2)
        ], 42, sk))), 128))
      ], 10, ok),
      f.$slots.default ? (b(), q(xn, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: I(() => [
          (b(), k("div", {
            key: t.modelValue,
            class: "tabs-panel mt-4"
          }, [
            wt(f.$slots, "default", { active: t.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : O("", !0)
    ]));
  }
}), tl = /* @__PURE__ */ rt(lk, [["__scopeId", "data-v-f9c367eb"]]), rk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, ck = {
  key: 0,
  class: "loading-state"
}, dk = {
  key: 1,
  class: "card-body"
}, uk = {
  key: 0,
  class: "model-usage-table-block"
}, hk = { class: "w-full min-w-0" }, fk = {
  key: 1,
  class: "empty-state"
}, gk = { class: "empty-state-content" }, pk = { class: "empty-icon-wrapper" }, mk = /* @__PURE__ */ J({
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
  setup(t, { expose: e, emit: n }) {
    const a = t, o = n, s = (f) => {
      o("export", f);
    }, { isDark: i } = vt(pt(a, "theme")), l = [
      { value: "by_model", label: "Model" },
      { value: "by_provider", label: "Provider" }
    ], r = ot("by_model"), c = C(() => r.value === "by_model" ? a.data?.total_by_model || {} : a.data?.total_by_provider || {}), d = C(() => [
      { key: "name", label: r.value === "by_model" ? "Model" : "Provider", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ]), h = C(
      () => Object.entries(c.value).map(([f, y]) => ({
        id: f,
        name: f,
        avgCost: v(y.avg_cost_per_message),
        avgTokens: p(y.avg_tokens_per_message),
        messageCount: p(y.message_count),
        totalCost: v(y.total_cost),
        totalTokens: p(y.total_tokens)
      }))
    ), p = (f) => f == null ? "0" : Z(f), v = (f) => f == null ? "$0.00" : Ct(f);
    return e({ isDark: i }), (f, y) => (b(), q(gt, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1
    }, {
      headerExport: I(() => [
        t.enableExport && !t.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: t.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        u("div", rk, [
          t.loading ? (b(), k("div", ck, [...y[1] || (y[1] = [
            u("div", { class: "loading-container" }, [
              u("div", { class: "chart-bars-loader" }, [
                u("div", { class: "bar bar-1" }),
                u("div", { class: "bar bar-2" }),
                u("div", { class: "bar bar-3" }),
                u("div", { class: "bar bar-4" }),
                u("div", { class: "bar bar-5" })
              ]),
              u("p", { class: "loading-text" }, "Loading model usage data...")
            ], -1)
          ])])) : (b(), k("div", dk, [
            V(tl, {
              modelValue: r.value,
              "onUpdate:modelValue": y[0] || (y[0] = (_) => r.value = _),
              items: l,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: I(() => [
                c.value && Object.keys(c.value).length > 0 ? (b(), k("div", uk, [
                  u("div", hk, [
                    V(oe, {
                      columns: d.value,
                      rows: h.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (b(), k("div", fk, [
                  u("div", gk, [
                    u("div", pk, [
                      V(L(qt), { class: "empty-icon" })
                    ]),
                    y[2] || (y[2] = u("p", { class: "empty-title" }, "No model usage data available", -1)),
                    y[3] || (y[3] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
                  ])
                ]))
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), bk = /* @__PURE__ */ rt(mk, [["__scopeId", "data-v-0c23d620"]]), vk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, yk = {
  key: 0,
  class: "loading-state"
}, xk = {
  key: 1,
  class: "card-body"
}, _k = {
  key: 0,
  class: "message-roles-table-block"
}, kk = { class: "w-full min-w-0" }, wk = {
  key: 1,
  class: "empty-state"
}, Ck = { class: "empty-state-content" }, $k = { class: "empty-icon-wrapper" }, Mk = /* @__PURE__ */ J({
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
  setup(t, { expose: e, emit: n }) {
    const a = t, o = n, s = (y) => {
      o("export", y);
    }, { isDark: i } = vt(pt(a, "theme")), l = ["assistant", "system", "user"], r = [
      { key: "role", label: "Role", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ], c = C(() => a.data?.total_by_role || {}), d = C(
      () => l.map((y) => ({
        id: y,
        role: f(y),
        avgCost: v(c.value[y]?.avg_cost_per_message),
        avgTokens: p(c.value[y]?.avg_tokens_per_message),
        messageCount: p(c.value[y]?.message_count),
        totalCost: v(c.value[y]?.total_cost),
        totalTokens: p(c.value[y]?.total_tokens)
      }))
    ), h = C(() => Object.keys(c.value).length > 0), p = (y) => y == null ? "0" : Z(y), v = (y) => y == null ? "$0.00" : Ct(y), f = (y) => y.charAt(0).toUpperCase() + y.slice(1);
    return e({ isDark: i }), (y, _) => (b(), q(gt, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1
    }, {
      headerExport: I(() => [
        t.enableExport && !t.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: t.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        u("div", vk, [
          t.loading ? (b(), k("div", yk, [..._[0] || (_[0] = [
            u("div", { class: "loading-container" }, [
              u("div", { class: "chart-bars-loader" }, [
                u("div", { class: "bar bar-1" }),
                u("div", { class: "bar bar-2" }),
                u("div", { class: "bar bar-3" }),
                u("div", { class: "bar bar-4" }),
                u("div", { class: "bar bar-5" })
              ]),
              u("p", { class: "loading-text" }, "Loading message role data...")
            ], -1)
          ])])) : (b(), k("div", xk, [
            h.value ? (b(), k("div", _k, [
              u("div", kk, [
                V(oe, {
                  columns: r,
                  rows: d.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (b(), k("div", wk, [
              u("div", Ck, [
                u("div", $k, [
                  V(L(qt), { class: "empty-icon" })
                ]),
                _[1] || (_[1] = u("p", { class: "empty-title" }, "No message role data available", -1)),
                _[2] || (_[2] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), Sk = /* @__PURE__ */ rt(Mk, [["__scopeId", "data-v-362c0dbc"]]), Dk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Ak = {
  key: 0,
  class: "card-body"
}, Tk = {
  key: 0,
  class: "chart-section"
}, Bk = { class: "chart-container" }, Lk = { class: "kpi-grid" }, Fk = {
  key: 1,
  class: "empty-state"
}, Pk = { class: "empty-state-content" }, Ek = { class: "empty-icon-wrapper" }, Ik = {
  key: 1,
  class: "loading-state"
}, Rk = /* @__PURE__ */ J({
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
  setup(t, { expose: e, emit: n }) {
    const a = t, o = n, s = (g) => {
      o("export", g);
    }, { isDark: i, colors: l } = vt(pt(a, "theme")), r = {
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
    }, c = (g) => g.agent_type || g.agent_id || g.agent_name || "", d = (g) => g.agent_name ? g.agent_name : c(g).split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ").replace(/V\d+$/, "").trim(), h = (g) => {
      const x = c(g).toLowerCase();
      for (const [w, D] of Object.entries(r))
        if (x.includes(w))
          return D;
      return "#9ca3af";
    }, p = C(() => [...a.data?.top_agents || []].sort((x, w) => w.avg_cost_per_conversation - x.avg_cost_per_conversation)), v = C(() => a.data?.total_conversations !== void 0 ? Number(a.data.total_conversations) || 0 : p.value.reduce((g, x) => g + x.conversations, 0)), f = C(() => a.data?.total_cost !== void 0 ? Number(a.data.total_cost) || 0 : p.value.reduce((g, x) => g + x.total_cost, 0)), y = C(() => a.data?.overall_avg_cost_per_conversation !== void 0 ? Number(a.data.overall_avg_cost_per_conversation) || 0 : v.value === 0 ? 0 : f.value / v.value), _ = C(() => {
      const g = p.value;
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const x = g.map((S) => d(S)), w = g.map((S) => S.avg_cost_per_conversation), D = g.map((S) => h(S));
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
    }), m = C(() => a.options ? a.options : {
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
            label: function(g) {
              const x = p.value[g.dataIndex];
              return [
                `Cost: ${Ct(g.parsed.x)}`,
                `Conversations: ${Z(x.conversations)}`,
                `Total Cost: ${Ct(x.total_cost)}`
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
            callback: function(g) {
              return Ct(g);
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
    return e({ isDark: i }), (g, x) => (b(), q(gt, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1
    }, {
      headerExport: I(() => [
        t.enableExport && !t.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: t.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        u("div", Dk, [
          t.loading ? (b(), k("div", Ik, [...x[2] || (x[2] = [
            u("div", { class: "loading-container" }, [
              u("div", { class: "chart-bars-loader" }, [
                u("div", { class: "bar bar-1" }),
                u("div", { class: "bar bar-2" }),
                u("div", { class: "bar bar-3" }),
                u("div", { class: "bar bar-4" }),
                u("div", { class: "bar bar-5" })
              ]),
              u("p", { class: "loading-text" }, "Loading agent costs...")
            ], -1)
          ])])) : (b(), k("div", Ak, [
            _.value.labels && _.value.labels.length ? (b(), k("section", Tk, [
              u("div", Bk, [
                V(be, {
                  data: _.value,
                  options: m.value
                }, null, 8, ["data", "options"])
              ]),
              u("footer", Lk, [
                V(L(ut), {
                  title: "Total Agents",
                  value: String(p.value.length)
                }, null, 8, ["value"]),
                V(L(ut), {
                  title: "Total Conversations",
                  value: L(Z)(v.value)
                }, null, 8, ["value"]),
                V(L(ut), {
                  title: "Total Cost",
                  value: L(Ct)(f.value)
                }, null, 8, ["value"]),
                V(L(ut), {
                  title: "Avg Cost / Conv.",
                  value: L(Ct)(y.value)
                }, null, 8, ["value"])
              ])
            ])) : (b(), k("section", Fk, [
              u("div", Pk, [
                u("div", Ek, [
                  V(L(qt), { class: "empty-icon" })
                ]),
                x[0] || (x[0] = u("p", { class: "empty-title" }, "No cost per conversation data", -1)),
                x[1] || (x[1] = u("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), Ok = /* @__PURE__ */ rt(Rk, [["__scopeId", "data-v-49068ad7"]]);
function Vk(t, e) {
  return b(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function zk(t, e) {
  return b(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const Nk = ["aria-label"], Wk = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, jk = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, Hk = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, Yk = ["aria-label", "aria-expanded", "aria-controls", "onClick"], Kk = { class: "truncate" }, Uk = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, qk = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, Xk = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, Gk = ["aria-label", "onClick"], Zk = ["aria-label", "onClick"], Qk = ["aria-label"], Jk = ["aria-label"], t2 = {
  key: 1,
  class: "space-y-2"
}, e2 = ["for"], n2 = ["id", "placeholder", "onKeydown"], a2 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, o2 = ["aria-label"], s2 = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, i2 = ["checked", "onChange"], l2 = { class: "min-w-0 flex-1" }, r2 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, c2 = { class: "flex flex-wrap items-end gap-2" }, d2 = { class: "min-w-[120px] flex-1" }, u2 = ["for"], h2 = ["id"], f2 = { class: "min-w-[120px] flex-1" }, g2 = ["for"], p2 = ["id"], m2 = /* @__PURE__ */ J({
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
  setup(t, { emit: e }) {
    const n = t, a = e, o = Na(), i = `${`kiut-filters-${Wt()}`}-panel`, l = ot(null), r = /* @__PURE__ */ new Map(), c = ot(null), d = ot(!1), h = ot({}), p = ot(null), v = ot(""), f = ot([]), y = ot(""), _ = ot(""), m = C(() => c.value ? n.filterDefinitions.find((R) => R.id === c.value) ?? null : null), g = C(() => {
      const R = m.value;
      if (R)
        return R.type === "text" ? v.value : R.type === "select" ? f.value : { start: y.value, end: _.value };
    });
    function x(R, H) {
      H && H instanceof HTMLElement ? r.set(R, H) : r.delete(R);
    }
    function w(R) {
      return n.modelValue[R];
    }
    function D(R) {
      if (R == null) return [];
      if (Array.isArray(R))
        return R.filter((H) => typeof H == "string" && H.trim() !== "");
      if (typeof R == "string") {
        const H = R.trim();
        return H ? [H] : [];
      }
      return [];
    }
    function S(R, H) {
      if (H == null) return !0;
      if (R.type === "text") return String(H).trim() === "";
      if (R.type === "select") return D(H).length === 0;
      if (R.type === "dateRange") {
        const at = H;
        return !at?.start?.trim() || !at?.end?.trim();
      }
      return !0;
    }
    const $ = C(
      () => n.filterDefinitions.some((R) => !S(R, w(R.id)))
    ), M = C(() => {
      const R = [];
      for (const H of n.filterDefinitions) {
        const at = w(H.id);
        if (!S(H, at)) {
          if (H.type === "text")
            R.push({ kind: "text", def: H, key: H.id });
          else if (H.type === "dateRange")
            R.push({ kind: "dateRange", def: H, key: H.id });
          else if (H.type === "select")
            for (const ft of D(at))
              R.push({
                kind: "select",
                def: H,
                optionValue: ft,
                key: `${H.id}::${ft}`
              });
        }
      }
      return R;
    });
    function F(R) {
      return R.type !== "select" ? 0 : D(w(R.id)).length;
    }
    function T(R) {
      const H = w(R.id), at = R.label.replace(/^\+\s*/, "");
      if (R.type === "text") return `${at}: ${String(H ?? "").trim()}`;
      if (R.type === "select") {
        const cl = D(H).map((fo) => R.options.find((dl) => dl.value === fo)?.label ?? fo);
        return `${at}: ${cl.join(", ")}`;
      }
      const ft = H, ne = P(ft.start), Se = P(ft.end);
      return `${at}: ${ne} – ${Se}`;
    }
    function B(R) {
      return R.kind === "text" || R.kind === "dateRange" ? T(R.def) : R.def.options.find((at) => at.value === R.optionValue)?.label ?? R.optionValue;
    }
    function P(R) {
      if (!R) return "";
      const H = Rt(R, "YYYY-MM-DD", !0);
      return H.isValid() ? H.format("L") : R;
    }
    function E(R) {
      const H = c.value === R.id && d.value, at = !S(R, w(R.id));
      return H || at ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function N(R) {
      return S(R, w(R.id)) ? mt(R) : `Editar filtro ${R.label.replace(/^\+\s*/, "")}`;
    }
    function Y(R) {
      const H = w(R.id);
      if (R.type === "text") {
        v.value = H != null ? String(H) : "";
        return;
      }
      if (R.type === "select") {
        f.value = [...D(H)];
        return;
      }
      const at = H;
      y.value = at?.start?.trim() ?? "", _.value = at?.end?.trim() ?? "";
    }
    function W() {
      const R = m.value;
      if (!R || R.type !== "select") return;
      const H = { ...n.modelValue };
      f.value.length === 0 ? delete H[R.id] : H[R.id] = [...f.value], a("update:modelValue", H), a("change", H);
    }
    function Q(R) {
      const H = f.value.indexOf(R);
      H >= 0 ? f.value = f.value.filter((at, ft) => ft !== H) : f.value = [...f.value, R], W();
    }
    function tt(R) {
      if (!R) return;
      p.value = R;
      const H = R.getBoundingClientRect(), at = 300;
      let ft = H.left;
      const ne = window.innerWidth - at - 12;
      ft > ne && (ft = Math.max(12, ne)), ft < 12 && (ft = 12);
      const Se = H.bottom + 8;
      h.value = {
        top: `${Se}px`,
        left: `${ft}px`,
        width: `${Math.min(at, window.innerWidth - 24)}px`
      };
    }
    function ct(R, H) {
      if (c.value === R.id && d.value) {
        st();
        return;
      }
      d.value && c.value !== R.id && st(), c.value = R.id, d.value = !0, Y(R), Ot().then(async () => {
        tt(H.currentTarget), await Ot(), K();
      });
    }
    function z(R, H) {
      if (c.value === R.id && d.value) {
        st();
        return;
      }
      d.value && c.value !== R.id && st(), c.value = R.id, d.value = !0, Y(R), Ot().then(async () => {
        const at = r.get(R.id) ?? H.currentTarget;
        tt(at), await Ot(), K();
      });
    }
    function K() {
      const R = l.value;
      if (!R) return;
      R.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function X() {
      d.value = !1, c.value = null, p.value = null;
    }
    function lt(R) {
      const H = m.value;
      if (!H) return;
      if (H.type === "text") {
        v.value = R != null ? String(R) : "";
        return;
      }
      if (H.type === "select") {
        f.value = Array.isArray(R) ? R.filter((ft) => typeof ft == "string") : D(R);
        return;
      }
      const at = R;
      y.value = at?.start?.trim() ?? "", _.value = at?.end?.trim() ?? "";
    }
    function st() {
      const R = m.value;
      if (!R) return;
      if (R.type === "text") {
        const ne = v.value.trim(), Se = { ...n.modelValue };
        ne === "" ? delete Se[R.id] : Se[R.id] = ne, a("update:modelValue", Se), a("change", Se), X();
        return;
      }
      if (R.type === "select") {
        W(), X();
        return;
      }
      const H = y.value.trim(), at = _.value.trim(), ft = { ...n.modelValue };
      !H || !at || H > at ? delete ft[R.id] : ft[R.id] = { start: H, end: at }, a("update:modelValue", ft), a("change", ft), X();
    }
    function Dt(R) {
      const H = { ...n.modelValue };
      delete H[R], a("update:modelValue", H), a("change", H), c.value === R && X();
    }
    function xt(R) {
      if (R.kind === "text" || R.kind === "dateRange") {
        Dt(R.def.id);
        return;
      }
      const H = { ...n.modelValue }, ft = D(H[R.def.id]).filter((ne) => ne !== R.optionValue);
      ft.length === 0 ? delete H[R.def.id] : H[R.def.id] = ft, a("update:modelValue", H), a("change", H), c.value === R.def.id && Y(R.def);
    }
    function j() {
      const R = {};
      a("update:modelValue", R), a("change", R), X();
    }
    const et = C(() => {
      const R = m.value;
      return R ? `Editar filtro: ${R.label}` : "Filtro";
    });
    function nt(R) {
      const H = R.def.label.replace(/^\+\s*/, "");
      return R.kind === "select" ? `Quitar ${R.def.options.find((ne) => ne.value === R.optionValue)?.label ?? R.optionValue} del filtro ${H}` : `Quitar filtro ${H}`;
    }
    function dt(R) {
      const H = R.def.label.replace(/^\+\s*/, "");
      if (R.kind === "select") {
        const ft = R.def.options.find((ne) => ne.value === R.optionValue)?.label ?? R.optionValue;
        return `Editar filtro ${H}: ${ft}`;
      }
      return `Editar filtro ${H}`;
    }
    function mt(R) {
      return `Añadir filtro ${R.label.replace(/^\+\s*/, "")}`;
    }
    const bt = C(() => n.clearLabel);
    function At(R) {
      if (!d.value || !l.value) return;
      const H = R.target;
      if (!(l.value.contains(H) || (H instanceof Element ? H : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const ft of r.values())
          if (ft?.contains(H)) return;
        st();
      }
    }
    function Nt(R) {
      R.key === "Escape" && d.value && (R.preventDefault(), X());
    }
    function Et() {
      !d.value || !p.value || tt(p.value);
    }
    return te(() => {
      document.addEventListener("mousedown", At, !0), window.addEventListener("keydown", Nt, !0), window.addEventListener("resize", Et);
    }), js(() => {
      document.removeEventListener("mousedown", At, !0), window.removeEventListener("keydown", Nt, !0), window.removeEventListener("resize", Et);
    }), Bt(
      () => n.modelValue,
      () => {
        const R = m.value;
        R && d.value && !o.panel && Y(R);
      },
      { deep: !0 }
    ), (R, H) => (b(), k("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": t.regionAriaLabel
    }, [
      u("div", Wk, [
        u("span", jk, A(t.label), 1),
        u("div", Hk, [
          (b(!0), k(G, null, it(t.filterDefinitions, (at) => (b(), k("button", {
            key: `pill-${at.id}`,
            ref_for: !0,
            ref: (ft) => x(at.id, ft),
            type: "button",
            class: U(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", E(at)]),
            "aria-label": N(at),
            "aria-expanded": c.value === at.id,
            "aria-haspopup": !0,
            "aria-controls": c.value === at.id ? i : void 0,
            onClick: (ft) => z(at, ft)
          }, [
            V(L(Vk), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            u("span", Kk, A(at.label), 1),
            at.type === "select" && F(at) > 0 ? (b(), k("span", Uk, A(F(at)), 1)) : O("", !0)
          ], 10, Yk))), 128))
        ])
      ]),
      $.value ? (b(), k("div", qk, [
        u("div", Xk, [
          (b(!0), k(G, null, it(M.value, (at) => (b(), k("div", {
            key: at.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            u("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": dt(at),
              onClick: (ft) => ct(at.def, ft)
            }, [
              wt(R.$slots, "formatChip", {
                filter: at.def,
                value: w(at.def.id),
                optionValue: at.kind === "select" ? at.optionValue : void 0
              }, () => [
                _t(A(B(at)), 1)
              ], !0)
            ], 8, Gk),
            u("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": nt(at),
              onClick: (ft) => xt(at)
            }, [
              V(L(zk), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, Zk)
          ]))), 128))
        ]),
        u("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": bt.value,
          onClick: j
        }, A(t.clearLabel), 9, Qk)
      ])) : O("", !0),
      (b(), q(Wa, { to: "body" }, [
        c.value && d.value ? (b(), k("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: l,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": et.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: yt(h.value),
          onKeydown: H[3] || (H[3] = ae(() => {
          }, ["stop"]))
        }, [
          m.value ? (b(), k(G, { key: 0 }, [
            R.$slots.panel ? wt(R.$slots, "panel", {
              key: 0,
              filter: m.value,
              close: st,
              value: g.value,
              updateValue: lt
            }, void 0, !0) : (b(), k("div", t2, [
              m.value.type === "text" ? (b(), k(G, { key: 0 }, [
                u("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, A(m.value.label), 9, e2),
                Jt(u("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": H[0] || (H[0] = (at) => v.value = at),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: m.value.placeholder ?? "…",
                  onKeydown: $n(ae(st, ["prevent"]), ["enter"])
                }, null, 40, n2), [
                  [Ke, v.value]
                ])
              ], 64)) : m.value.type === "select" ? (b(), k(G, { key: 1 }, [
                u("p", a2, A(m.value.label), 1),
                u("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": m.value.label,
                  "aria-multiselectable": !0
                }, [
                  (b(!0), k(G, null, it(m.value.options, (at) => (b(), k("li", {
                    key: at.value
                  }, [
                    u("label", s2, [
                      u("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: f.value.includes(at.value),
                        onChange: (ft) => Q(at.value)
                      }, null, 40, i2),
                      u("span", l2, A(at.label), 1)
                    ])
                  ]))), 128))
                ], 8, o2)
              ], 64)) : m.value.type === "dateRange" ? (b(), k(G, { key: 2 }, [
                u("p", r2, A(m.value.label), 1),
                u("div", c2, [
                  u("div", d2, [
                    u("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, u2),
                    Jt(u("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": H[1] || (H[1] = (at) => y.value = at),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, h2), [
                      [Ke, y.value]
                    ])
                  ]),
                  u("div", f2, [
                    u("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, g2),
                    Jt(u("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": H[2] || (H[2] = (at) => _.value = at),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, p2), [
                      [Ke, _.value]
                    ])
                  ])
                ])
              ], 64)) : O("", !0)
            ]))
          ], 64)) : O("", !0)
        ], 44, Jk)) : O("", !0)
      ]))
    ], 8, Nk));
  }
}), b2 = /* @__PURE__ */ rt(m2, [["__scopeId", "data-v-f38e0100"]]), ee = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", ce = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", v2 = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", Me = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", ve = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", y2 = { class: "font-sans" }, x2 = ["for"], _2 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], k2 = ["id"], w2 = /* @__PURE__ */ J({
  name: "InputText",
  inheritAttrs: !1,
  __name: "InputText",
  props: {
    modelValue: { default: "" },
    label: {},
    placeholder: {},
    id: {},
    name: {},
    type: { default: "text" },
    disabled: { type: Boolean },
    invalid: { type: Boolean },
    errorText: {}
  },
  emits: ["update:modelValue"],
  setup(t, { emit: e }) {
    const n = t, a = e, o = da(), s = Hs("$pcForm", null), i = `kiut-input-text-${Wt()}`, l = C(() => n.id ?? i), r = C(() => `${l.value}-err`), c = C(() => n.name ?? o.name ?? ""), d = ot(n.modelValue ?? "");
    Bt(
      () => n.modelValue,
      (m) => {
        d.value = m ?? "";
      }
    ), te(() => {
      s && c.value && s.register?.(c.value, {});
    }), ue(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const h = C(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? d.value : d.value), p = C(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? n.invalid ?? !1 : n.invalid ?? !1);
    function v(m) {
      const g = m.target.value;
      d.value = g, a("update:modelValue", g);
      const x = s?.fields?.[c.value]?.props;
      x?.onInput && x.onInput(m);
    }
    function f(m) {
      const g = s?.fields?.[c.value]?.props;
      g?.onChange && g.onChange(m);
    }
    function y(m) {
      const g = s?.fields?.[c.value]?.props;
      g?.onBlur && g.onBlur(m);
    }
    const _ = C(() => {
      const { name: m, id: g, type: x, ...w } = o;
      return w;
    });
    return (m, g) => (b(), k("div", y2, [
      t.label ? (b(), k("label", {
        key: 0,
        for: l.value,
        class: U(L(ee))
      }, A(t.label), 11, x2)) : O("", !0),
      u("input", on(_.value, {
        id: l.value,
        name: c.value,
        type: t.type,
        autocomplete: "off",
        class: [L(ce), p.value ? L(Me) : ""],
        placeholder: t.placeholder,
        disabled: t.disabled,
        value: h.value,
        "aria-invalid": p.value ? "true" : void 0,
        "aria-describedby": t.errorText ? r.value : void 0,
        onInput: v,
        onChange: f,
        onBlur: y
      }), null, 16, _2),
      t.errorText ? (b(), k("p", {
        key: 1,
        id: r.value,
        class: U(L(ve)),
        role: "alert"
      }, A(t.errorText), 11, k2)) : O("", !0)
    ]));
  }
}), C2 = { class: "font-sans" }, $2 = ["for"], M2 = { class: "relative" }, S2 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], D2 = ["aria-label"], A2 = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, T2 = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, B2 = ["id"], L2 = /* @__PURE__ */ J({
  name: "InputPassword",
  inheritAttrs: !1,
  __name: "InputPassword",
  props: {
    modelValue: { default: "" },
    label: {},
    placeholder: {},
    id: {},
    name: {},
    disabled: { type: Boolean },
    invalid: { type: Boolean },
    errorText: {}
  },
  emits: ["update:modelValue"],
  setup(t, { emit: e }) {
    const n = t, a = e, o = da(), s = Hs("$pcForm", null), i = `kiut-input-password-${Wt()}`, l = C(() => n.id ?? i), r = C(() => `${l.value}-err`), c = C(() => n.name ?? o.name ?? ""), d = ot(!1), h = ot(n.modelValue ?? "");
    Bt(
      () => n.modelValue,
      (g) => {
        g !== void 0 && g !== h.value && (h.value = g);
      }
    ), te(() => {
      s && c.value && s.register?.(c.value, {});
    }), ue(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const p = C(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? h.value : h.value), v = C(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? n.invalid ?? !1 : n.invalid ?? !1);
    function f(g) {
      const x = g.target.value;
      h.value = x, a("update:modelValue", x);
      const w = s?.fields?.[c.value]?.props;
      w?.onInput && w.onInput(g);
    }
    function y(g) {
      const x = s?.fields?.[c.value]?.props;
      x?.onChange && x.onChange(g);
    }
    function _(g) {
      const x = s?.fields?.[c.value]?.props;
      x?.onBlur && x.onBlur(g);
    }
    const m = C(() => {
      const { name: g, id: x, ...w } = o;
      return w;
    });
    return (g, x) => (b(), k("div", C2, [
      t.label ? (b(), k("label", {
        key: 0,
        for: l.value,
        class: U(L(ee))
      }, A(t.label), 11, $2)) : O("", !0),
      u("div", M2, [
        u("input", on(m.value, {
          id: l.value,
          name: c.value,
          type: d.value ? "text" : "password",
          autocomplete: "current-password",
          class: [L(ce), v.value ? L(Me) : "", "pr-10"],
          placeholder: t.placeholder,
          disabled: t.disabled,
          value: p.value,
          "aria-invalid": v.value ? "true" : void 0,
          "aria-describedby": t.errorText ? r.value : void 0,
          onInput: f,
          onChange: y,
          onBlur: _
        }), null, 16, S2),
        u("button", {
          type: "button",
          tabindex: "-1",
          onClick: x[0] || (x[0] = (w) => d.value = !d.value),
          class: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
          "aria-label": d.value ? "Hide password" : "Show password"
        }, [
          d.value ? (b(), k("svg", T2, [...x[2] || (x[2] = [
            u("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            }, null, -1)
          ])])) : (b(), k("svg", A2, [...x[1] || (x[1] = [
            u("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            }, null, -1),
            u("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            }, null, -1)
          ])]))
        ], 8, D2)
      ]),
      t.errorText ? (b(), k("p", {
        key: 1,
        id: r.value,
        class: U(L(ve)),
        role: "alert"
      }, A(t.errorText), 11, B2)) : O("", !0)
    ]));
  }
}), F2 = { class: "font-sans" }, P2 = ["for"], E2 = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], I2 = ["id"], R2 = /* @__PURE__ */ J({
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
  setup(t, { emit: e }) {
    const n = t, a = e, o = `kiut-input-textarea-${Wt()}`, s = C(() => n.id ?? o), i = C(() => `${s.value}-err`), l = C({
      get: () => n.modelValue,
      set: (r) => a("update:modelValue", r)
    });
    return (r, c) => (b(), k("div", F2, [
      t.label ? (b(), k("label", {
        key: 0,
        for: s.value,
        class: U(L(ee))
      }, A(t.label), 11, P2)) : O("", !0),
      Jt(u("textarea", {
        id: s.value,
        "onUpdate:modelValue": c[0] || (c[0] = (d) => l.value = d),
        rows: t.rows,
        autocomplete: "off",
        class: U([L(v2), t.invalid ? L(Me) : ""]),
        placeholder: t.placeholder,
        disabled: t.disabled,
        "aria-invalid": t.invalid ? "true" : void 0,
        "aria-describedby": t.errorText ? i.value : void 0
      }, null, 10, E2), [
        [Ke, l.value]
      ]),
      t.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: U(L(ve)),
        role: "alert"
      }, A(t.errorText), 11, I2)) : O("", !0)
    ]));
  }
}), O2 = { class: "font-sans" }, V2 = ["for"], z2 = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], N2 = ["for"], W2 = ["title"], j2 = ["aria-label"], H2 = ["id"], Y2 = /* @__PURE__ */ J({
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
  setup(t, { emit: e }) {
    const n = t, a = e, o = `kiut-input-file-${Wt()}`, s = C(() => n.id ?? o), i = C(() => `${s.value}-err`), l = ot(null), r = C(() => n.modelValue?.name ?? n.placeholder);
    function c(h) {
      const v = h.target.files?.[0] ?? null;
      a("update:modelValue", v);
    }
    function d() {
      a("update:modelValue", null), l.value && (l.value.value = "");
    }
    return (h, p) => (b(), k("div", O2, [
      t.label ? (b(), k("label", {
        key: 0,
        for: s.value,
        class: U(L(ee))
      }, A(t.label), 11, V2)) : O("", !0),
      u("div", {
        class: U([
          L(ce),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          t.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          t.invalid ? L(Me) : "",
          t.disabled ? "pointer-events-none" : ""
        ])
      }, [
        u("input", {
          id: s.value,
          ref_key: "fileInputRef",
          ref: l,
          type: "file",
          class: "sr-only focus:outline-none focus:ring-0",
          name: t.name,
          accept: t.accept,
          disabled: t.disabled,
          "aria-invalid": t.invalid ? "true" : void 0,
          "aria-describedby": t.errorText ? i.value : void 0,
          onChange: c
        }, null, 40, z2),
        u("label", {
          for: s.value,
          class: U(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", t.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          V(L(pp), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          _t(" " + A(t.chooseLabel), 1)
        ], 10, N2),
        u("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: r.value || void 0
        }, A(r.value), 9, W2),
        t.modelValue && !t.disabled ? (b(), k("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": t.clearAriaLabel,
          onClick: d
        }, [
          V(L(Hi), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, j2)) : O("", !0)
      ], 2),
      t.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: U(L(ve)),
        role: "alert"
      }, A(t.errorText), 11, H2)) : O("", !0)
    ]));
  }
}), K2 = { class: "font-sans" }, U2 = ["for"], q2 = { class: "relative" }, X2 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], G2 = ["id"], Z2 = /* @__PURE__ */ J({
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
  setup(t, { emit: e }) {
    const n = t, a = e, o = `kiut-input-datetime-${Wt()}`, s = C(() => n.id ?? o), i = C(() => `${s.value}-err`), l = C(() => n.modelValue ?? "");
    function r(c) {
      const d = c.target.value;
      a("update:modelValue", d === "" ? null : d);
    }
    return (c, d) => (b(), k("div", K2, [
      t.label ? (b(), k("label", {
        key: 0,
        for: s.value,
        class: U(L(ee))
      }, A(t.label), 11, U2)) : O("", !0),
      u("div", q2, [
        V(L(ho), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: s.value,
          value: l.value,
          type: "datetime-local",
          autocomplete: "off",
          class: U([
            L(ce),
            "pl-10",
            t.invalid ? L(Me) : ""
          ]),
          name: t.name,
          disabled: t.disabled,
          min: t.min,
          max: t.max,
          step: t.step,
          "aria-invalid": t.invalid ? "true" : void 0,
          "aria-describedby": t.errorText ? i.value : void 0,
          onInput: r
        }, null, 42, X2)
      ]),
      t.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: U(L(ve)),
        role: "alert"
      }, A(t.errorText), 11, G2)) : O("", !0)
    ]));
  }
}), Q2 = { class: "font-sans" }, J2 = ["for"], tw = { class: "relative" }, ew = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], nw = ["id"], aw = /* @__PURE__ */ J({
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
  setup(t, { emit: e }) {
    function n(h) {
      const p = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(h.trim());
      if (!p) return null;
      const v = Number(p[1]), f = Number(p[2]);
      return !Number.isInteger(v) || !Number.isInteger(f) || v < 0 || v > 23 || f < 0 || f > 59 ? null : `${String(v).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
    }
    function a(h) {
      return h === "" ? null : n(h);
    }
    const o = t, s = e, i = `kiut-input-time-${Wt()}`, l = C(() => o.id ?? i), r = C(() => `${l.value}-err`), c = C(() => o.modelValue == null || o.modelValue === "" ? "" : n(o.modelValue) ?? "");
    function d(h) {
      const p = h.target.value;
      s("update:modelValue", a(p));
    }
    return (h, p) => (b(), k("div", Q2, [
      t.label ? (b(), k("label", {
        key: 0,
        for: l.value,
        class: U(L(ee))
      }, A(t.label), 11, J2)) : O("", !0),
      u("div", tw, [
        V(L(bp), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: l.value,
          value: c.value,
          type: "time",
          autocomplete: "off",
          class: U([
            L(ce),
            "pl-10",
            t.invalid ? L(Me) : ""
          ]),
          name: t.name,
          disabled: t.disabled,
          min: t.min,
          max: t.max,
          step: t.step,
          "aria-invalid": t.invalid ? "true" : void 0,
          "aria-describedby": t.errorText ? r.value : void 0,
          onInput: d
        }, null, 42, ew)
      ]),
      t.errorText ? (b(), k("p", {
        key: 1,
        id: r.value,
        class: U(L(ve)),
        role: "alert"
      }, A(t.errorText), 11, nw)) : O("", !0)
    ]));
  }
}), ow = { class: "font-sans" }, sw = ["for"], iw = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, lw = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], rw = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, cw = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, dw = { class: "min-w-0 text-left leading-snug" }, uw = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, hw = { class: "min-w-0 text-right leading-snug" }, fw = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, gw = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, pw = ["id"], mw = /* @__PURE__ */ J({
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
  setup(t, { emit: e }) {
    const n = t, a = e, o = `kiut-input-range-${Wt()}`, s = C(() => n.id ?? o), i = C(() => `${s.value}-err`), l = C(() => {
      const v = [];
      return n.errorText && v.push(i.value), v.length ? v.join(" ") : void 0;
    }), r = C(
      () => !!(n.caption && !n.captionMin && !n.captionMax)
    ), c = C(() => !!(n.captionMin || n.captionMax)), d = C(() => {
      const { min: v, max: f, modelValue: y } = n;
      if (f === v) return 0;
      const _ = (y - v) / (f - v);
      return Math.min(100, Math.max(0, _ * 100));
    }), h = C(() => ({
      "--kiut-range-fill": `${d.value}%`,
      "--kiut-range-length": n.trackLength
    }));
    function p(v) {
      const f = Number(v.target.value);
      a("update:modelValue", Number.isNaN(f) ? n.min : f);
    }
    return (v, f) => (b(), k("div", ow, [
      t.label ? (b(), k("label", {
        key: 0,
        for: s.value,
        class: U(L(ee))
      }, A(t.label), 11, sw)) : O("", !0),
      u("div", {
        class: U(["flex flex-col items-center gap-2", (t.orientation === "vertical", "w-full")])
      }, [
        t.orientation === "vertical" && t.captionMax ? (b(), k("p", iw, A(t.captionMax), 1)) : O("", !0),
        u("div", {
          class: U(["flex items-center justify-center", [
            t.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: yt(h.value)
        }, [
          u("input", {
            id: s.value,
            type: "range",
            value: t.modelValue,
            min: t.min,
            max: t.max,
            step: t.step,
            disabled: t.disabled,
            "aria-orientation": t.orientation,
            "aria-invalid": t.invalid ? "true" : void 0,
            "aria-describedby": l.value,
            class: U([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              t.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: p
          }, null, 42, lw)
        ], 6),
        t.orientation === "horizontal" && r.value ? (b(), k("p", rw, A(t.caption), 1)) : t.orientation === "horizontal" && c.value ? (b(), k("div", cw, [
          u("span", dw, A(t.captionMin), 1),
          u("span", uw, A(t.caption), 1),
          u("span", hw, A(t.captionMax), 1)
        ])) : O("", !0),
        t.orientation === "vertical" && t.captionMin ? (b(), k("p", fw, A(t.captionMin), 1)) : O("", !0),
        t.orientation === "vertical" && t.caption ? (b(), k("p", gw, A(t.caption), 1)) : O("", !0)
      ], 2),
      t.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: U(L(ve)),
        role: "alert"
      }, A(t.errorText), 11, pw)) : O("", !0)
    ]));
  }
}), bw = /* @__PURE__ */ rt(mw, [["__scopeId", "data-v-a1343418"]]), vw = { class: "font-sans" }, yw = ["for"], xw = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], _w = ["id"], kw = /* @__PURE__ */ J({
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
  setup(t, { emit: e }) {
    const n = t, a = e, o = `kiut-input-number-${Wt()}`, s = C(() => n.id ?? o), i = C(() => `${s.value}-err`), l = C(() => {
      switch (n.align) {
        case "start":
          return "text-start";
        case "end":
          return "text-end";
        default:
          return "text-center";
      }
    }), r = C(
      () => n.modelValue === null || n.modelValue === void 0 ? "" : String(n.modelValue)
    );
    function c(d) {
      const h = d.target.value;
      if (h === "") {
        a("update:modelValue", null);
        return;
      }
      const p = Number(h);
      a("update:modelValue", Number.isNaN(p) ? null : p);
    }
    return (d, h) => (b(), k("div", vw, [
      t.label ? (b(), k("label", {
        key: 0,
        for: s.value,
        class: U(L(ee))
      }, A(t.label), 11, yw)) : O("", !0),
      u("input", {
        id: s.value,
        value: r.value,
        type: "number",
        onInput: c,
        class: U([
          L(ce),
          t.invalid ? L(Me) : "",
          l.value,
          "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        ]),
        placeholder: t.placeholder,
        disabled: t.disabled,
        min: t.min,
        max: t.max,
        step: t.step,
        "aria-invalid": t.invalid ? "true" : void 0,
        "aria-describedby": t.errorText ? i.value : void 0
      }, null, 42, xw),
      t.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: U(L(ve)),
        role: "alert"
      }, A(t.errorText), 11, _w)) : O("", !0)
    ]));
  }
}), ww = { class: "font-sans" }, Cw = ["for"], $w = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], Mw = ["disabled"], Sw = ["id"], Dw = "#3b82f6", Aw = "#aabbcc", Tw = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", Bw = /* @__PURE__ */ J({
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
  setup(t, { emit: e }) {
    function n(f) {
      const y = f.trim(), _ = /^#?([0-9a-fA-F]{6})$/.exec(y);
      if (_) return `#${_[1].toLowerCase()}`;
      const m = /^#?([0-9a-fA-F]{3})$/.exec(y);
      if (m) {
        const [g, x, w] = m[1].split("");
        return `#${g}${g}${x}${x}${w}${w}`.toLowerCase();
      }
      return null;
    }
    function a(f) {
      return n(f) ?? Dw;
    }
    const o = t, s = e, i = `kiut-input-color-${Wt()}`, l = C(() => o.id ?? i), r = C(() => `${l.value}-err`), c = C(() => a(o.modelValue)), d = ot(c.value), h = ot(!1);
    Bt(c, (f) => {
      h.value || (d.value = f);
    });
    function p(f) {
      const y = f.target, _ = n(y.value);
      _ && s("update:modelValue", _);
    }
    function v() {
      h.value = !1;
      const f = n(d.value);
      f ? (d.value = f, s("update:modelValue", f)) : d.value = c.value;
    }
    return Bt(d, (f) => {
      if (!h.value) return;
      const y = n(f);
      y && s("update:modelValue", y);
    }), (f, y) => (b(), k("div", ww, [
      t.label ? (b(), k("label", {
        key: 0,
        for: l.value,
        class: U(L(ee))
      }, A(t.label), 11, Cw)) : O("", !0),
      u("div", {
        class: U([
          Tw,
          t.invalid ? L(Me) : "",
          t.disabled ? "cursor-not-allowed opacity-50" : ""
        ])
      }, [
        u("input", {
          id: l.value,
          type: "color",
          value: c.value,
          disabled: t.disabled,
          "aria-invalid": t.invalid ? "true" : void 0,
          "aria-describedby": t.errorText ? r.value : void 0,
          class: "h-9 w-11 shrink-0 cursor-pointer rounded-lg border border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-0.5 shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/35 disabled:cursor-not-allowed dark:border-slate-600 dark:bg-slate-800/80",
          onInput: p
        }, null, 40, $w),
        t.showHexInput ? Jt((b(), k("input", {
          key: 0,
          "onUpdate:modelValue": y[0] || (y[0] = (_) => d.value = _),
          type: "text",
          disabled: t.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: Aw,
          onFocus: y[1] || (y[1] = (_) => h.value = !0),
          onBlur: v
        }, null, 40, Mw)), [
          [Ke, d.value]
        ]) : O("", !0)
      ], 2),
      t.errorText ? (b(), k("p", {
        key: 1,
        id: r.value,
        class: U(L(ve)),
        role: "alert"
      }, A(t.errorText), 11, Sw)) : O("", !0)
    ]));
  }
});
function el(t, e) {
  return b(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", {
      "fill-rule": "evenodd",
      d: "M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z",
      "clip-rule": "evenodd"
    })
  ]);
}
const Lw = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], Fw = {
  key: 0,
  class: "sticky top-0 z-10 border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-2 dark:border-[color:var(--kiut-border-light)]"
}, Pw = ["placeholder", "aria-label"], Ew = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Iw = ["aria-selected", "onClick", "onMouseenter"], Rw = {
  key: 0,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, Ow = { class: "min-w-0 flex-1" }, nl = /* @__PURE__ */ J({
  name: "Select",
  __name: "Select",
  props: {
    modelValue: {},
    options: {},
    label: {},
    ariaLabelTrigger: {},
    placeholder: { default: "Seleccionar…" },
    disabled: { type: Boolean },
    showOptionCheck: { type: Boolean, default: !0 },
    searchable: { type: Boolean, default: !1 },
    searchPlaceholder: { default: "Buscar…" },
    noResultsText: { default: "Sin resultados" }
  },
  emits: ["update:modelValue"],
  setup(t, { emit: e }) {
    const n = t, a = e, o = `kiut-select-${Wt()}`, s = `${o}-label`, i = `${o}-btn`, l = `${o}-listbox`, r = ot(null), c = ot(null), d = ot(null), h = ot(null), p = ot(null), v = ot(!1), f = ot(0), y = ot(""), _ = ot({});
    function m() {
      const z = c.value;
      if (!z) return;
      const K = z.getBoundingClientRect();
      _.value = {
        top: `${K.bottom - 3}px`,
        left: `${K.left}px`,
        width: `${K.width}px`
      };
    }
    const g = C(() => n.options.filter((z) => !z.disabled)), x = C(() => {
      if (!n.searchable) return g.value;
      const z = y.value.trim().toLowerCase();
      return z ? g.value.filter((K) => K.label.toLowerCase().includes(z)) : g.value;
    }), w = C(
      () => n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opción"
    ), D = C(() => n.modelValue === null || n.modelValue === void 0 || n.modelValue === "" ? n.placeholder : n.options.find((K) => K.value === n.modelValue)?.label ?? String(n.modelValue));
    function S(z) {
      return `${String(z.value)}-${z.label}`;
    }
    function $(z) {
      return n.modelValue === z.value;
    }
    function M(z, K) {
      const X = $(z), lt = f.value === K;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        X ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !X && lt ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function F() {
      f.value = Math.max(
        0,
        x.value.findIndex((z) => z.value === n.modelValue)
      );
    }
    function T() {
      if (n.searchable) {
        p.value?.focus();
        return;
      }
      h.value?.focus();
    }
    function B() {
      m(), y.value = "", F(), Ot(() => T());
    }
    function P() {
      v.value = !1, y.value = "";
    }
    function E(z) {
      a("update:modelValue", z.value), P();
    }
    function N() {
      if (!n.disabled) {
        if (v.value) {
          P();
          return;
        }
        v.value = !0, B();
      }
    }
    function Y(z) {
      z.stopPropagation(), !n.disabled && N();
    }
    function W(z) {
      if (!v.value) return;
      const K = z.target, X = r.value, lt = d.value;
      X && !X.contains(K) && (!lt || !lt.contains(K)) && P();
    }
    function Q(z) {
      n.disabled || (z.key === "ArrowDown" || z.key === "Enter" || z.key === " ") && (z.preventDefault(), v.value || (v.value = !0, B()));
    }
    function tt(z) {
      const K = x.value;
      if (z.key === "Escape") {
        z.preventDefault(), P();
        return;
      }
      if (z.key === "ArrowDown") {
        if (z.preventDefault(), K.length === 0) return;
        f.value = 0, h.value?.focus();
        return;
      }
      if (z.key === "ArrowUp") {
        if (z.preventDefault(), K.length === 0) return;
        f.value = K.length - 1, h.value?.focus();
        return;
      }
      if (z.key === "Enter") {
        z.preventDefault();
        const X = K[f.value];
        X && E(X);
      }
    }
    function ct(z) {
      const K = x.value;
      if (z.key === "Escape") {
        z.preventDefault(), P();
        return;
      }
      if (K.length !== 0) {
        if (z.key === "ArrowDown") {
          z.preventDefault(), f.value = Math.min(f.value + 1, K.length - 1);
          return;
        }
        if (z.key === "ArrowUp") {
          if (z.preventDefault(), f.value === 0 && n.searchable) {
            p.value?.focus();
            return;
          }
          f.value = Math.max(f.value - 1, 0);
          return;
        }
        if (z.key === "Enter") {
          z.preventDefault();
          const X = K[f.value];
          X && E(X);
        }
      }
    }
    return Bt(y, () => {
      f.value = 0;
    }), te(() => {
      document.addEventListener("click", W);
    }), ue(() => {
      document.removeEventListener("click", W);
    }), (z, K) => (b(), k("div", {
      ref_key: "rootRef",
      ref: r,
      class: "relative font-sans"
    }, [
      t.label ? (b(), k("label", {
        key: 0,
        id: s,
        class: U(L(ee))
      }, A(t.label), 3)) : O("", !0),
      u("button", {
        ref_key: "buttonRef",
        ref: c,
        id: i,
        type: "button",
        disabled: t.disabled,
        class: U([
          L(ce),
          "flex items-center justify-between gap-2 text-left",
          v.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": v.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": t.label ? s : void 0,
        "aria-label": t.label ? void 0 : w.value,
        onClick: Y,
        onKeydown: Q
      }, [
        u("span", {
          class: U([
            "min-w-0 flex-1 truncate",
            t.modelValue === null || t.modelValue === void 0 || t.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, A(D.value), 3),
        V(L(Ni), {
          class: U(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", v.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, Lw),
      (b(), q(Wa, { to: "body" }, [
        Jt(u("div", {
          ref_key: "panelRef",
          ref: d,
          style: yt(_.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          t.searchable ? (b(), k("div", Fw, [
            Jt(u("input", {
              ref_key: "searchInputRef",
              ref: p,
              "onUpdate:modelValue": K[0] || (K[0] = (X) => y.value = X),
              type: "search",
              class: U([L(ce), "min-h-0 py-1.5 text-sm"]),
              placeholder: t.searchPlaceholder,
              "aria-label": t.searchPlaceholder,
              onClick: K[1] || (K[1] = ae(() => {
              }, ["stop"])),
              onKeydown: ae(tt, ["stop"])
            }, null, 42, Pw), [
              [Ke, y.value]
            ])
          ])) : O("", !0),
          u("ul", {
            id: l,
            ref_key: "listRef",
            ref: h,
            role: "listbox",
            tabindex: "-1",
            class: "py-1",
            onKeydown: ae(ct, ["stop"])
          }, [
            x.value.length === 0 ? (b(), k("li", Ew, A(t.noResultsText), 1)) : O("", !0),
            (b(!0), k(G, null, it(x.value, (X, lt) => (b(), k("li", {
              key: S(X),
              role: "option",
              "aria-selected": $(X),
              class: U(M(X, lt)),
              onClick: ae((st) => E(X), ["stop"]),
              onMouseenter: (st) => f.value = lt
            }, [
              t.showOptionCheck ? (b(), k("span", Rw, [
                $(X) ? (b(), q(L(el), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : O("", !0)
              ])) : O("", !0),
              u("span", Ow, A(X.label), 1)
            ], 42, Iw))), 128))
          ], 544)
        ], 4), [
          [an, v.value]
        ])
      ]))
    ], 512));
  }
}), Vw = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], zw = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, Nw = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Ww = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, jw = { class: "truncate" }, Hw = ["aria-selected", "onClick", "onMouseenter"], Yw = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, Kw = { class: "min-w-0 flex-1" }, Uw = /* @__PURE__ */ J({
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
  setup(t, { emit: e }) {
    const n = t, a = e, o = `kiut-multiselect-${Wt()}`, s = `${o}-label`, i = `${o}-btn`, l = `${o}-listbox`, r = ot(null), c = ot(null), d = ot(!1), h = ot(0), p = C(() => n.options.filter((T) => !T.disabled)), v = C(() => new Set(n.modelValue ?? [])), f = C(
      () => n.options.filter((T) => v.value.has(T.value))
    ), y = C(() => {
      const T = n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opciones", B = f.value.length;
      return B === 0 ? T : `${T}, ${B} seleccionada${B === 1 ? "" : "s"}`;
    });
    function _(T) {
      return `${String(T.value)}-${T.label}`;
    }
    function m(T) {
      return v.value.has(T.value);
    }
    function g(T, B) {
      const P = m(T), E = h.value === B;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        P ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !P && E ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function x(T) {
      const B = [...n.modelValue ?? []], P = B.indexOf(T.value);
      P >= 0 ? B.splice(P, 1) : B.push(T.value), a("update:modelValue", B);
    }
    function w() {
      const T = p.value;
      if (T.length === 0) {
        h.value = 0;
        return;
      }
      const B = v.value, P = T.findIndex((E) => B.has(E.value));
      h.value = P >= 0 ? P : 0;
    }
    function D() {
      n.disabled || (d.value = !d.value);
    }
    function S(T) {
      T.stopPropagation(), !n.disabled && (D(), d.value && (w(), Ot(() => c.value?.focus())));
    }
    function $(T) {
      if (!d.value) return;
      const B = r.value;
      B && !B.contains(T.target) && (d.value = !1);
    }
    function M(T) {
      n.disabled || (T.key === "ArrowDown" || T.key === "Enter" || T.key === " ") && (T.preventDefault(), d.value || (d.value = !0, w(), Ot(() => c.value?.focus())));
    }
    function F(T) {
      const B = p.value;
      if (B.length !== 0) {
        if (T.key === "Escape") {
          T.preventDefault(), d.value = !1;
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
          const P = B[h.value];
          P && x(P);
        }
      }
    }
    return te(() => {
      document.addEventListener("click", $);
    }), ue(() => {
      document.removeEventListener("click", $);
    }), (T, B) => (b(), k("div", {
      ref_key: "rootRef",
      ref: r,
      class: "relative font-sans"
    }, [
      t.label ? (b(), k("label", {
        key: 0,
        id: s,
        class: U(L(ee))
      }, A(t.label), 3)) : O("", !0),
      u("button", {
        id: i,
        type: "button",
        disabled: t.disabled,
        class: U([
          L(ce),
          "flex items-start justify-between gap-2 text-left",
          d.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": d.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": t.label ? s : void 0,
        "aria-label": t.label ? void 0 : y.value,
        onClick: S,
        onKeydown: M
      }, [
        u("div", zw, [
          f.value.length === 0 ? (b(), k("span", Nw, A(t.placeholder), 1)) : (b(), k("div", Ww, [
            (b(!0), k(G, null, it(f.value, (P) => (b(), k("span", {
              key: _(P),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              u("span", jw, A(P.label), 1)
            ]))), 128))
          ]))
        ]),
        V(L(Ni), {
          class: U(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", d.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, Vw),
      Jt(u("ul", {
        id: l,
        ref_key: "listRef",
        ref: c,
        role: "listbox",
        tabindex: "-1",
        "aria-multiselectable": "true",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: ae(F, ["stop"])
      }, [
        (b(!0), k(G, null, it(p.value, (P, E) => (b(), k("li", {
          key: _(P),
          role: "option",
          "aria-selected": m(P),
          class: U(g(P, E)),
          onClick: ae((N) => x(P), ["stop"]),
          onMouseenter: (N) => h.value = E
        }, [
          u("span", Yw, [
            m(P) ? (b(), q(L(el), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : O("", !0)
          ]),
          u("span", Kw, A(P.label), 1)
        ], 42, Hw))), 128))
      ], 544), [
        [an, d.value]
      ])
    ], 512));
  }
}), qw = ["id", "aria-checked", "aria-disabled", "disabled", "onKeydown"], Xw = { class: "sr-only" }, Gw = /* @__PURE__ */ J({
  name: "Toggle",
  __name: "Toggle",
  props: {
    modelValue: { type: Boolean },
    disabled: { type: Boolean },
    id: {},
    ariaLabel: { default: "Interruptor" }
  },
  emits: ["update:modelValue"],
  setup(t, { emit: e }) {
    const n = t, a = e;
    function o() {
      n.disabled || a("update:modelValue", !n.modelValue);
    }
    return (s, i) => (b(), k("button", {
      id: t.id,
      type: "button",
      role: "switch",
      "aria-checked": t.modelValue,
      "aria-disabled": t.disabled ? "true" : void 0,
      disabled: t.disabled,
      class: U([
        "relative inline-flex h-8 w-[3.75rem] shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-sm transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        t.modelValue ? "bg-[color:var(--kiut-primary)]" : "bg-[#DEDEE3] dark:bg-slate-600"
      ]),
      onClick: o,
      onKeydown: [
        $n(ae(o, ["prevent", "stop"]), ["space"]),
        $n(ae(o, ["prevent"]), ["enter"])
      ]
    }, [
      u("span", {
        class: U(["pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", t.modelValue ? "translate-x-7" : "translate-x-0"]),
        "aria-hidden": "true"
      }, null, 2),
      u("span", Xw, A(t.ariaLabel), 1)
    ], 42, qw));
  }
}), Zw = { class: "font-sans" }, Qw = ["for"], Jw = { class: "flex gap-2" }, t5 = { class: "w-[7.5rem] shrink-0" }, e5 = { class: "min-w-0 flex-1" }, n5 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], a5 = ["id"], o5 = /* @__PURE__ */ J({
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
  setup(t, { emit: e }) {
    const n = t, a = e, o = `kiut-phone-${Wt()}`, s = C(() => n.id ?? `${o}-num`), i = C(() => `${s.value}-err`), l = C({
      get: () => n.modelValue.prefix,
      set: (c) => a("update:modelValue", { ...n.modelValue, prefix: c })
    }), r = C({
      get: () => n.modelValue.number,
      set: (c) => a("update:modelValue", { ...n.modelValue, number: c })
    });
    return (c, d) => (b(), k("div", Zw, [
      t.label ? (b(), k("label", {
        key: 0,
        for: s.value,
        class: U(L(ee))
      }, A(t.label), 11, Qw)) : O("", !0),
      u("div", Jw, [
        u("div", t5, [
          V(nl, {
            modelValue: l.value,
            "onUpdate:modelValue": d[0] || (d[0] = (h) => l.value = h),
            "aria-label-trigger": "Prefijo telefónico",
            options: t.prefixOptions,
            placeholder: t.prefixPlaceholder,
            disabled: t.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        u("div", e5, [
          Jt(u("input", {
            id: s.value,
            "onUpdate:modelValue": d[1] || (d[1] = (h) => r.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: U([L(ce), t.invalid ? L(Me) : ""]),
            placeholder: t.numberPlaceholder,
            disabled: t.disabled,
            "aria-invalid": t.invalid ? "true" : void 0,
            "aria-describedby": t.errorText ? i.value : void 0
          }, null, 10, n5), [
            [Ke, r.value]
          ])
        ])
      ]),
      t.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: U(L(ve)),
        role: "alert"
      }, A(t.errorText), 11, a5)) : O("", !0)
    ]));
  }
}), s5 = ["role", "aria-label"], i5 = { class: "flex flex-wrap gap-2" }, l5 = ["aria-checked", "role", "onClick"], r5 = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, c5 = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, d5 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, u5 = /* @__PURE__ */ J({
  name: "SelectablePills",
  __name: "SelectablePills",
  props: {
    items: {},
    multiple: { type: Boolean, default: !1 },
    modelValue: {},
    ariaLabel: { default: "Opciones" }
  },
  emits: ["update:modelValue"],
  setup(t, { emit: e }) {
    const n = t, a = e, o = C(() => n.multiple ? Array.isArray(n.modelValue) ? n.modelValue : [] : []);
    function s(r) {
      return n.multiple ? o.value.includes(r.value) : n.modelValue === r.value;
    }
    function i(r) {
      return [
        "inline-flex max-w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        s(r) ? "border-[color:var(--kiut-primary)]/50 bg-violet-50/80 dark:bg-violet-950/30" : "border-gray-300 bg-white dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]"
      ];
    }
    function l(r) {
      if (n.multiple) {
        const c = Array.isArray(n.modelValue) ? [...n.modelValue] : [], d = c.indexOf(r.value);
        d >= 0 ? c.splice(d, 1) : c.push(r.value), a("update:modelValue", c);
        return;
      }
      a("update:modelValue", r.value);
    }
    return (r, c) => (b(), k("div", {
      class: "font-sans",
      role: t.multiple ? "group" : "radiogroup",
      "aria-label": t.ariaLabel
    }, [
      u("div", i5, [
        (b(!0), k(G, null, it(t.items, (d) => (b(), k("button", {
          key: d.value,
          type: "button",
          class: U(i(d)),
          "aria-checked": s(d),
          role: t.multiple ? "checkbox" : "radio",
          onClick: (h) => l(d)
        }, [
          u("span", r5, [
            s(d) ? (b(), k("span", c5)) : O("", !0)
          ]),
          d.dotColor ? (b(), k("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: yt({ backgroundColor: d.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : O("", !0),
          u("span", d5, A(d.label), 1)
        ], 10, l5))), 128))
      ])
    ], 8, s5));
  }
}), h5 = ["aria-label"], f5 = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], g5 = { class: "truncate px-3 py-2 text-sm font-medium" }, p5 = /* @__PURE__ */ J({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(t, { emit: e }) {
    const n = t, a = e, o = `kiut-seg-${Wt()}`, s = (y) => `${o}-seg-${y}`, i = ot([]);
    function l(y, _) {
      y instanceof HTMLButtonElement ? i.value[_] = y : i.value[_] = null;
    }
    function r(y) {
      return y.value === n.modelValue;
    }
    function c(y) {
      const _ = r(y), m = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return y.disabled ? `${m} cursor-not-allowed opacity-40` : _ ? `${m} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${m} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function d(y) {
      y.disabled || y.value !== n.modelValue && a("update:modelValue", y.value);
    }
    function h(y, _, m) {
      d(y), Ot(() => i.value[_]?.focus());
    }
    const p = C(
      () => n.items.map((y, _) => y.disabled ? -1 : _).filter((y) => y >= 0)
    );
    function v(y, _) {
      const m = n.items.length;
      if (m === 0) return 0;
      let g = y;
      for (let x = 0; x < m; x++)
        if (g = (g + _ + m) % m, !n.items[g]?.disabled) return g;
      return y;
    }
    function f(y, _) {
      if (y.key === "ArrowRight" || y.key === "ArrowDown") {
        y.preventDefault();
        const m = v(_, 1), g = n.items[m];
        g && d(g), Ot(() => i.value[m]?.focus());
      } else if (y.key === "ArrowLeft" || y.key === "ArrowUp") {
        y.preventDefault();
        const m = v(_, -1), g = n.items[m];
        g && d(g), Ot(() => i.value[m]?.focus());
      } else if (y.key === "Home") {
        y.preventDefault();
        const m = p.value[0];
        if (m !== void 0) {
          const g = n.items[m];
          g && d(g), Ot(() => i.value[m]?.focus());
        }
      } else if (y.key === "End") {
        y.preventDefault();
        const m = p.value[p.value.length - 1];
        if (m !== void 0) {
          const g = n.items[m];
          g && d(g), Ot(() => i.value[m]?.focus());
        }
      }
    }
    return (y, _) => (b(), k("div", {
      role: "tablist",
      "aria-label": t.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (b(!0), k(G, null, it(t.items, (m, g) => (b(), k("button", {
        id: s(m.value),
        key: m.value,
        ref_for: !0,
        ref: (x) => l(x, g),
        type: "button",
        role: "tab",
        "aria-selected": r(m),
        "aria-disabled": m.disabled === !0,
        tabindex: r(m) ? 0 : -1,
        class: U(c(m)),
        onClick: (x) => h(m, g),
        onKeydown: (x) => f(x, g)
      }, [
        u("span", g5, A(m.label), 1)
      ], 42, f5))), 128))
    ], 8, h5));
  }
}), m5 = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  es: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
}, b5 = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
}, v5 = {
  en: [
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
  ],
  es: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ]
}, y5 = {
  es: {
    today: "Hoy",
    yesterday: "Ayer",
    last7: "Últimos 7 días",
    last14: "Últimos 14 días",
    last30: "Últimos 30 días",
    last90: "Últimos 90 días",
    thisMonth: "Este mes",
    lastMonth: "Mes anterior",
    yearToDate: "Año hasta hoy"
  },
  en: {
    today: "Today",
    yesterday: "Yesterday",
    last7: "Last 7 days",
    last14: "Last 14 days",
    last30: "Last 30 days",
    last90: "Last 90 days",
    thisMonth: "This month",
    lastMonth: "Last month",
    yearToDate: "Year to date"
  }
}, x5 = [
  "today",
  "yesterday",
  "last7",
  "last14",
  "last30",
  "last90",
  "thisMonth",
  "lastMonth",
  "yearToDate"
];
function _5(t = "en") {
  return m5[t];
}
function al(t = "en") {
  return x5.map((e) => ({ id: e, label: y5[t][e] }));
}
function k5(t = "en") {
  return "Presets";
}
al("es");
function Yt(t) {
  const [e, n, a] = t.split("-").map(Number);
  return new Date(e, n - 1, a);
}
function Zt(t) {
  const e = t.getFullYear(), n = String(t.getMonth() + 1).padStart(2, "0"), a = String(t.getDate()).padStart(2, "0");
  return `${e}-${n}-${a}`;
}
function Ft(t) {
  return new Date(t.getFullYear(), t.getMonth(), t.getDate());
}
function Ce(t) {
  return new Date(t.getFullYear(), t.getMonth(), 1);
}
function Pn(t, e) {
  return new Date(t.getFullYear(), t.getMonth() + e, t.getDate());
}
function w5(t, e) {
  const n = new Date(t.getFullYear(), t.getMonth(), t.getDate() + e);
  return Ft(n);
}
function mn(t, e) {
  return w5(t, -e);
}
function C5(t) {
  return new Date(t.getFullYear(), t.getMonth() + 1, 0);
}
function ol(t, e = /* @__PURE__ */ new Date()) {
  const n = Ft(e);
  switch (t) {
    case "today":
      return { start: n, end: n };
    case "yesterday": {
      const a = mn(n, 1);
      return { start: a, end: a };
    }
    case "last7":
      return { start: mn(n, 6), end: n };
    case "last14":
      return { start: mn(n, 13), end: n };
    case "last30":
      return { start: mn(n, 29), end: n };
    case "last90":
      return { start: mn(n, 89), end: n };
    case "thisMonth":
      return { start: Ce(n), end: n };
    case "lastMonth": {
      const a = Ce(Pn(n, -1));
      return { start: a, end: C5(a) };
    }
    case "yearToDate":
      return { start: new Date(n.getFullYear(), 0, 1), end: n };
  }
}
function sl(t, e, n) {
  let a = Ft(t.start), o = Ft(t.end);
  if (e) {
    const s = Ft(Yt(e));
    Ie(a, s) && (a = s), Ie(o, s) && (o = s);
  }
  if (n) {
    const s = Ft(Yt(n));
    Ba(a, s) && (a = s), Ba(o, s) && (o = s);
  }
  return Ba(a, o) ? { start: o, end: a } : { start: a, end: o };
}
function $5(t, e, n = /* @__PURE__ */ new Date(), a, o) {
  if (!t.start || !t.end) return !1;
  const s = sl(ol(e, n), a, o);
  return Zt(s.start) === t.start && Zt(s.end) === t.end;
}
function Rn(t, e) {
  const n = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()), a = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate());
  return n < a ? -1 : n > a ? 1 : 0;
}
function Fe(t, e) {
  return Rn(t, e) === 0;
}
function Ie(t, e) {
  return Rn(t, e) < 0;
}
function Ba(t, e) {
  return Rn(t, e) > 0;
}
function il(t, e) {
  return Rn(t, e) >= 0;
}
function ll(t, e) {
  return Rn(t, e) <= 0;
}
function rl(t) {
  const e = t.getFullYear(), n = t.getMonth(), a = new Date(e, n, 1), o = new Date(a);
  o.setDate(a.getDate() - a.getDay());
  const s = [], i = new Date(o);
  for (let l = 0; l < 42; l++)
    s.push(new Date(i)), i.setDate(i.getDate() + 1);
  return s;
}
function ca(t, e = "en") {
  return `${b5[e][t.getMonth()]} ${String(t.getDate()).padStart(2, "0")}`;
}
function Pe(t, e = "en") {
  return `${v5[e][t.getMonth()]} ${t.getFullYear()}`;
}
const M5 = ["aria-expanded", "aria-labelledby", "aria-label"], S5 = ["onKeydown"], D5 = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, A5 = { class: "mb-4 flex items-center justify-between gap-2" }, T5 = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, B5 = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, L5 = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, F5 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, P5 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, E5 = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, I5 = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, R5 = { class: "grid grid-cols-7 gap-y-2 mt-2" }, O5 = ["disabled", "onClick"], V5 = "rounded-lg text-[#61616b]", z5 = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", N5 = "opacity-30", W5 = "bg-[#6b35e9] font-medium text-white", j5 = "bg-[#895af6] font-semibold text-white", H5 = /* @__PURE__ */ J({
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
  setup(t, { emit: e }) {
    const n = t, a = e, s = `${`kiut-drp-${Wt()}`}-lbl`, i = ot(null), l = ot(null), r = ot(!1), c = ot(null), d = ot(Ce(/* @__PURE__ */ new Date())), h = C(() => !!(n.modelValue.start && n.modelValue.end)), p = C(() => {
      const B = Ce(d.value);
      return [B, Pn(B, 1)];
    }), v = C(() => n.ariaLabel ?? n.placeholder), f = C(() => {
      const B = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return n.panelAlign === "end" ? `right-0 left-auto ${B}` : `left-0 right-auto ${B}`;
    }), y = C(
      () => `${Pe(p.value[0])} – ${Pe(p.value[1])}`
    ), _ = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], m = C(() => {
      if (!n.modelValue.start || !n.modelValue.end) return n.placeholder;
      const B = Yt(n.modelValue.start), P = Yt(n.modelValue.end);
      return `${ca(B)} – ${ca(P)}`;
    });
    function g(B, P) {
      return B.getMonth() === P.getMonth() && B.getFullYear() === P.getFullYear();
    }
    function x(B) {
      const P = Ft(B);
      if (n.minDate) {
        const E = Ft(Yt(n.minDate));
        if (Ie(P, E)) return !0;
      }
      if (n.maxDate) {
        const E = Ft(Yt(n.maxDate));
        if (Ie(E, P)) return !0;
      }
      return !1;
    }
    function w(B, P, E) {
      const N = Fe(B, P), Y = Fe(B, E);
      if (N && Y) return "rounded-lg";
      const W = N || B.getDay() === 0, Q = Y || B.getDay() === 6;
      return W && Q ? "rounded-lg" : W ? "rounded-l-lg" : Q ? "rounded-r-lg" : "rounded-none";
    }
    function D(B, P) {
      const E = g(P, B), N = x(P), Y = n.modelValue.start ? Ft(Yt(n.modelValue.start)) : null, W = n.modelValue.end ? Ft(Yt(n.modelValue.end)) : null, Q = Ft(P);
      if (N)
        return V5;
      let tt = z5;
      if (Y && W && il(Q, Y) && ll(Q, W)) {
        const z = Fe(Q, Y), K = Fe(Q, W);
        tt = `${w(Q, Y, W)} ${z || K ? j5 : W5}`;
      }
      return E || (tt = `${tt} ${N5}`), tt;
    }
    function S(B) {
      if (x(B)) return;
      const P = Ft(B);
      if (!c.value) {
        c.value = new Date(P), a("update:modelValue", { start: Zt(P), end: Zt(P) });
        return;
      }
      let N = Ft(c.value), Y = new Date(P);
      Ie(Y, N) && ([N, Y] = [Y, N]), a("update:modelValue", { start: Zt(N), end: Zt(Y) }), c.value = null, r.value = !1;
    }
    function $(B) {
      d.value = Pn(d.value, B);
    }
    function M() {
      r.value = !1;
    }
    function F(B) {
      if (B?.stopPropagation(), !r.value) {
        if (r.value = !0, c.value = null, n.modelValue.start)
          try {
            d.value = Ce(Yt(n.modelValue.start));
          } catch {
          }
        Ot(() => l.value?.focus());
      }
    }
    function T(B) {
      if (!r.value) return;
      const P = i.value;
      P && !P.contains(B.target) && (r.value = !1);
    }
    return Bt(r, (B) => {
      B && (c.value = null);
    }), te(() => {
      document.addEventListener("click", T);
    }), ue(() => {
      document.removeEventListener("click", T);
    }), (B, P) => (b(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      t.label ? (b(), k("label", {
        key: 0,
        id: s,
        class: U(L(ee))
      }, A(t.label), 3)) : O("", !0),
      u("button", {
        type: "button",
        class: U([
          L(ce),
          "flex w-full items-center gap-2 text-left",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": t.label ? s : void 0,
        "aria-label": t.label ? void 0 : v.value,
        onFocus: F,
        onClick: F
      }, [
        V(L(ho), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: U([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, A(m.value), 3)
      ], 42, M5),
      Jt(u("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: U([
          f.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: $n(ae(M, ["stop"]), ["escape"])
      }, [
        u("div", D5, [
          u("div", A5, [
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes anterior",
              onClick: P[0] || (P[0] = (E) => $(-1))
            }, [
              V(L(Wi), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ]),
            u("div", T5, [
              u("span", B5, A(y.value), 1),
              u("div", L5, [
                u("span", F5, A(L(Pe)(p.value[0])), 1),
                u("span", P5, A(L(Pe)(p.value[1])), 1)
              ])
            ]),
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes siguiente",
              onClick: P[1] || (P[1] = (E) => $(1))
            }, [
              V(L(ji), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ])
          ]),
          u("div", E5, [
            (b(!0), k(G, null, it(p.value, (E) => (b(), k("div", {
              key: `${E.getFullYear()}-${E.getMonth()}`,
              class: "w-full max-w-[252px] shrink-0"
            }, [
              u("div", I5, [
                (b(), k(G, null, it(_, (N) => u("span", { key: N }, A(N), 1)), 64))
              ]),
              u("div", R5, [
                (b(!0), k(G, null, it(L(rl)(E), (N) => (b(), k("button", {
                  key: L(Zt)(N),
                  type: "button",
                  disabled: x(N),
                  class: U(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", D(E, N)]),
                  onClick: (Y) => S(N)
                }, A(N.getDate()), 11, O5))), 128))
              ])
            ]))), 128))
          ])
        ])
      ], 42, S5), [
        [an, r.value]
      ])
    ], 512));
  }
}), Y5 = ["aria-expanded", "aria-labelledby", "aria-label"], K5 = ["aria-label", "onKeydown"], U5 = { class: "flex flex-col sm:flex-row" }, q5 = ["aria-label"], X5 = { class: "px-2 pt-1 pb-1.5 text-[10px] font-semibold uppercase dark:text-[#61616b] text-[#e3e3e8]" }, G5 = { class: "flex flex-col gap-0.5" }, Z5 = ["onClick"], Q5 = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, J5 = { class: "mb-4 flex items-center justify-between gap-2" }, tC = ["aria-label"], eC = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, nC = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, aC = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, oC = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, sC = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, iC = ["aria-label"], lC = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, rC = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, cC = { class: "grid grid-cols-7 gap-y-2 mt-2" }, dC = ["disabled", "onClick"], uC = "rounded-lg text-[#61616b]", hC = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", fC = "opacity-30", gC = "bg-[#6b35e9] font-medium text-white", pC = "bg-[#895af6] font-semibold text-white", mC = /* @__PURE__ */ J({
  name: "DatePickerPresets",
  __name: "DatePickerPresets",
  props: {
    modelValue: {},
    label: {},
    placeholder: {},
    ariaLabel: {},
    minDate: {},
    maxDate: {},
    locale: { default: "es" },
    panelAlign: { default: "start" }
  },
  emits: ["update:modelValue"],
  setup(t, { emit: e }) {
    const n = t, a = e, s = `${`kiut-dpp-${Wt()}`}-lbl`, i = ot(null), l = ot(null), r = ot(!1), c = ot(null), d = ot(Ce(/* @__PURE__ */ new Date())), h = C(() => !!(n.modelValue.start && n.modelValue.end)), p = C(() => {
      const z = Ce(d.value);
      return [z, Pn(z, 1)];
    }), v = C(
      () => n.placeholder ?? (n.locale === "es" ? "Seleccionar fechas" : "Select dates")
    ), f = C(() => n.ariaLabel ?? v.value), y = C(() => al(n.locale)), _ = C(() => k5(n.locale)), m = C(() => _5(n.locale)), g = C(
      () => n.locale === "es" ? "Preajustes de rango" : "Range presets"
    ), x = C(
      () => n.locale === "es" ? "Mes anterior" : "Previous month"
    ), w = C(
      () => n.locale === "es" ? "Mes siguiente" : "Next month"
    ), D = C(
      () => n.locale === "es" ? "Calendario de rango con preajustes" : "Date range calendar with presets"
    ), S = C(() => {
      const z = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return n.panelAlign === "end" ? `right-0 left-auto ${z}` : `left-0 right-auto ${z}`;
    }), $ = C(
      () => `${Pe(p.value[0], n.locale)} – ${Pe(p.value[1], n.locale)}`
    ), M = C(() => {
      if (!n.modelValue.start || !n.modelValue.end) return v.value;
      const z = Yt(n.modelValue.start), K = Yt(n.modelValue.end);
      return `${ca(z, n.locale)} – ${ca(K, n.locale)}`;
    });
    function F(z, K) {
      return z.getMonth() === K.getMonth() && z.getFullYear() === K.getFullYear();
    }
    function T(z) {
      const K = Ft(z);
      if (n.minDate) {
        const X = Ft(Yt(n.minDate));
        if (Ie(K, X)) return !0;
      }
      if (n.maxDate) {
        const X = Ft(Yt(n.maxDate));
        if (Ie(X, K)) return !0;
      }
      return !1;
    }
    function B(z, K, X) {
      const lt = Fe(z, K), st = Fe(z, X);
      if (lt && st) return "rounded-lg";
      const Dt = lt || z.getDay() === 0, xt = st || z.getDay() === 6;
      return Dt && xt ? "rounded-lg" : Dt ? "rounded-l-lg" : xt ? "rounded-r-lg" : "rounded-none";
    }
    function P(z) {
      const K = $5(
        n.modelValue,
        z,
        /* @__PURE__ */ new Date(),
        n.minDate,
        n.maxDate
      ), X = "text-[#61616b] hover:bg-[#efeff0b3] dark:text-[#e3e3e8] dark:hover:bg-[#23232fb3]";
      return K ? `${X} font-medium` : X;
    }
    function E(z, K) {
      const X = F(K, z), lt = T(K), st = n.modelValue.start ? Ft(Yt(n.modelValue.start)) : null, Dt = n.modelValue.end ? Ft(Yt(n.modelValue.end)) : null, xt = Ft(K);
      if (lt)
        return uC;
      let j = hC;
      if (st && Dt && il(xt, st) && ll(xt, Dt)) {
        const nt = Fe(xt, st), dt = Fe(xt, Dt);
        j = `${B(xt, st, Dt)} ${nt || dt ? pC : gC}`;
      }
      return X || (j = `${j} ${fC}`), j;
    }
    function N(z) {
      const K = sl(ol(z), n.minDate, n.maxDate);
      a("update:modelValue", {
        start: Zt(K.start),
        end: Zt(K.end)
      }), d.value = Ce(K.start), c.value = null, r.value = !1;
    }
    function Y(z) {
      if (T(z)) return;
      const K = Ft(z);
      if (!c.value) {
        c.value = new Date(K), a("update:modelValue", { start: Zt(K), end: Zt(K) });
        return;
      }
      let lt = Ft(c.value), st = new Date(K);
      Ie(st, lt) && ([lt, st] = [st, lt]), a("update:modelValue", { start: Zt(lt), end: Zt(st) }), c.value = null, r.value = !1;
    }
    function W(z) {
      d.value = Pn(d.value, z);
    }
    function Q() {
      r.value = !1;
    }
    function tt(z) {
      if (z.stopPropagation(), r.value) {
        r.value = !1;
        return;
      }
      if (r.value = !0, c.value = null, n.modelValue.start)
        try {
          d.value = Ce(Yt(n.modelValue.start));
        } catch {
        }
      Ot(() => l.value?.focus());
    }
    function ct(z) {
      if (!r.value) return;
      const K = i.value;
      K && !K.contains(z.target) && (r.value = !1);
    }
    return Bt(r, (z) => {
      z && (c.value = null);
    }), te(() => {
      document.addEventListener("click", ct);
    }), ue(() => {
      document.removeEventListener("click", ct);
    }), (z, K) => (b(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      t.label ? (b(), k("label", {
        key: 0,
        id: s,
        class: U(L(ee))
      }, A(t.label), 3)) : O("", !0),
      u("button", {
        type: "button",
        class: U([
          L(ce),
          "group flex w-full items-center gap-2 text-left hover:bg-[#6b35e9] hover:text-white",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": t.label ? s : void 0,
        "aria-label": t.label ? void 0 : f.value,
        onClick: tt
      }, [
        V(L(ho), {
          class: "h-5 w-5 shrink-0 text-gray-500 transition-colors group-hover:text-white dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: U([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] group-hover:text-white dark:text-slate-500"
          ])
        }, A(M.value), 3)
      ], 10, Y5),
      Jt(u("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": D.value,
        class: U([
          S.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: $n(ae(Q, ["stop"]), ["escape"])
      }, [
        u("div", U5, [
          u("aside", {
            class: "w-full shrink-0 border-b border-gray-200 p-3 sm:w-[176px] sm:border-r sm:border-b-0 dark:border-[color:var(--kiut-border-light)]",
            "aria-label": g.value
          }, [
            u("p", X5, A(_.value), 1),
            u("ul", G5, [
              (b(!0), k(G, null, it(y.value, (X) => (b(), k("li", {
                key: X.id
              }, [
                u("button", {
                  type: "button",
                  class: U(["w-full rounded-lg px-2 py-1.5 text-left text-xs transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", P(X.id)]),
                  onClick: (lt) => N(X.id)
                }, A(X.label), 11, Z5)
              ]))), 128))
            ])
          ], 8, q5),
          u("div", Q5, [
            u("div", J5, [
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": x.value,
                onClick: K[0] || (K[0] = (X) => W(-1))
              }, [
                V(L(Wi), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, tC),
              u("div", eC, [
                u("span", nC, A($.value), 1),
                u("div", aC, [
                  u("span", oC, A(L(Pe)(p.value[0], t.locale)), 1),
                  u("span", sC, A(L(Pe)(p.value[1], t.locale)), 1)
                ])
              ]),
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": w.value,
                onClick: K[1] || (K[1] = (X) => W(1))
              }, [
                V(L(ji), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, iC)
            ]),
            u("div", lC, [
              (b(!0), k(G, null, it(p.value, (X) => (b(), k("div", {
                key: `${X.getFullYear()}-${X.getMonth()}`,
                class: "w-full max-w-[252px] shrink-0"
              }, [
                u("div", rC, [
                  (b(!0), k(G, null, it(m.value, (lt) => (b(), k("span", { key: lt }, A(lt), 1))), 128))
                ]),
                u("div", cC, [
                  (b(!0), k(G, null, it(L(rl)(X), (lt) => (b(), k("button", {
                    key: L(Zt)(lt),
                    type: "button",
                    disabled: T(lt),
                    class: U(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", E(X, lt)]),
                    onClick: (st) => Y(lt)
                  }, A(lt.getDate()), 11, dC))), 128))
                ])
              ]))), 128))
            ])
          ])
        ])
      ], 42, K5), [
        [an, r.value]
      ])
    ], 512));
  }
}), bC = {
  key: 0,
  class: "group relative inline-flex shrink-0"
}, vC = ["type", "disabled", "aria-label"], yC = {
  key: 1,
  class: "min-w-0 truncate"
}, xC = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, _C = ["type", "disabled", "aria-label"], kC = {
  key: 1,
  class: "min-w-0 truncate"
}, ea = /* @__PURE__ */ J({
  name: "Button",
  inheritAttrs: !1,
  __name: "Button",
  props: {
    variant: { default: "primary" },
    tone: { default: "default" },
    disabled: { type: Boolean, default: !1 },
    tooltip: {}
  },
  setup(t) {
    const e = t, n = da(), a = C(() => !!e.tooltip?.trim()), o = C(() => e.variant === "action"), s = C(() => !o.value), i = C(() => {
      const d = n["aria-label"];
      if (typeof d == "string" && d.length > 0) return d;
      if (o.value && e.tooltip?.trim()) return e.tooltip.trim();
    }), l = C(() => {
      const d = n.type;
      return d === "submit" || d === "reset" || d === "button" ? d : "button";
    }), r = C(() => {
      const { class: d, type: h, "aria-label": p, ...v } = n;
      return v;
    }), c = C(() => e.variant === "primary" ? [
      "px-4 py-2.5",
      "bg-[color:var(--kiut-primary)] text-white shadow-sm",
      "hover:bg-[color:var(--kiut-primary-hover)] active:bg-[color:var(--kiut-primary-dark)]",
      "dark:text-white dark:hover:brightness-110 dark:active:brightness-95"
    ] : e.variant === "secondary" ? [
      "px-4 py-2.5",
      "border border-slate-200 bg-slate-50 text-[color:var(--kiut-text-primary)]",
      "hover:border-slate-300 hover:bg-slate-100",
      "active:bg-slate-200/80",
      "dark:border-[color:var(--kiut-border-light)] dark:bg-slate-800/80 dark:text-slate-100",
      "dark:hover:border-white/[0.18] dark:hover:bg-slate-800",
      "dark:active:bg-slate-700/90"
    ] : e.tone === "danger" ? [
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
    return (d, h) => a.value ? (b(), k("span", bC, [
      u("button", on({
        type: l.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [c.value, L(n).class]],
        disabled: t.disabled,
        "aria-label": i.value
      }, r.value), [
        d.$slots.icon ? (b(), k("span", {
          key: 0,
          class: U(["inline-flex shrink-0", o.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          wt(d.$slots, "icon")
        ], 2)) : O("", !0),
        s.value ? (b(), k("span", yC, [
          wt(d.$slots, "default")
        ])) : O("", !0)
      ], 16, vC),
      u("span", xC, A(t.tooltip), 1)
    ])) : (b(), k("button", on({
      key: 1,
      type: l.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [c.value, L(n).class]],
      disabled: t.disabled,
      "aria-label": i.value
    }, r.value), [
      d.$slots.icon ? (b(), k("span", {
        key: 0,
        class: U(["inline-flex shrink-0", o.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        wt(d.$slots, "icon")
      ], 2)) : O("", !0),
      s.value ? (b(), k("span", kC, [
        wt(d.$slots, "default")
      ])) : O("", !0)
    ], 16, _C));
  }
}), wC = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, CC = { class: "min-w-0 flex-1 space-y-1" }, $C = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, MC = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, SC = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, DC = /* @__PURE__ */ J({
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
  setup(t, { emit: e }) {
    const n = t, a = e, s = `${`kiut-modal-${Wt()}`}-title`, i = ot(null);
    function l() {
      a("cancel"), a("update:modelValue", !1);
    }
    function r() {
      a("confirm");
    }
    function c(d) {
      n.modelValue && d.key === "Escape" && (d.preventDefault(), l());
    }
    return Bt(
      () => n.modelValue,
      (d) => {
        d && requestAnimationFrame(() => {
          i.value?.focus({ preventScroll: !0 });
        });
      }
    ), te(() => {
      document.addEventListener("keydown", c);
    }), ue(() => {
      document.removeEventListener("keydown", c);
    }), (d, h) => (b(), q(Wa, { to: "body" }, [
      V(xn, { name: "kiut-modal" }, {
        default: I(() => [
          t.modelValue ? (b(), k("div", wC, [
            u("div", {
              class: "absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] dark:bg-black/60",
              "aria-hidden": "true",
              onClick: l
            }),
            u("div", {
              ref_key: "panelRef",
              ref: i,
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": s,
              tabindex: "-1",
              class: "kiut-modal-panel relative z-10 flex max-h-[min(90vh,880px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] shadow-[var(--kiut-shadow-card)] dark:bg-[#252528] dark:shadow-black/40",
              onClick: h[0] || (h[0] = ae(() => {
              }, ["stop"]))
            }, [
              u("header", {
                class: U(["flex shrink-0 justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.02]", t.subtitle ? "items-start" : "items-center"])
              }, [
                u("div", CC, [
                  u("h2", {
                    id: s,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, A(t.title), 1),
                  t.subtitle ? (b(), k("p", $C, A(t.subtitle), 1)) : O("", !0)
                ]),
                V(ea, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  onClick: l
                }, {
                  icon: I(() => [
                    V(L(Hi), { class: "h-5 w-5" })
                  ]),
                  _: 1
                })
              ], 2),
              u("div", MC, [
                wt(d.$slots, "default", {}, void 0, !0)
              ]),
              u("footer", SC, [
                V(ea, {
                  variant: "secondary",
                  type: "button",
                  onClick: l
                }, {
                  default: I(() => [
                    _t(A(t.cancelLabel), 1)
                  ]),
                  _: 1
                }),
                V(ea, {
                  variant: "primary",
                  type: "button",
                  onClick: r
                }, {
                  default: I(() => [
                    _t(A(t.confirmLabel), 1)
                  ]),
                  _: 1
                })
              ])
            ], 512)
          ])) : O("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), AC = /* @__PURE__ */ rt(DC, [["__scopeId", "data-v-4ed7bb14"]]), TC = { class: "text-left font-['Inter',system-ui,sans-serif]" }, BC = {
  key: 0,
  class: ""
}, LC = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, FC = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, PC = {
  key: 1,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, EC = /* @__PURE__ */ J({
  name: "Section",
  __name: "Section",
  setup(t) {
    const e = Na(), n = C(() => {
      const a = !!e.filters, o = !!e.actions;
      return a && o ? "justify-between" : o ? "justify-end" : "";
    });
    return (a, o) => (b(), k("section", TC, [
      a.$slots.description || a.$slots.filters || a.$slots.actions ? (b(), k("header", BC, [
        a.$slots.description ? (b(), k("div", LC, [
          wt(a.$slots, "description")
        ])) : O("", !0),
        a.$slots.filters || a.$slots.actions ? (b(), k("div", {
          key: 1,
          class: U(["flex flex-wrap gap-2 items-center", n.value])
        }, [
          a.$slots.filters ? (b(), k("div", FC, [
            wt(a.$slots, "filters")
          ])) : O("", !0),
          a.$slots.actions ? (b(), k("div", PC, [
            wt(a.$slots, "actions")
          ])) : O("", !0)
        ], 2)) : O("", !0)
      ])) : O("", !0),
      a.$slots.content || a.$slots.default ? (b(), k("div", {
        key: 1,
        class: U({
          "mt-6": a.$slots.description || a.$slots.filters || a.$slots.actions
        })
      }, [
        wt(a.$slots, "content", {}, () => [
          wt(a.$slots, "default")
        ])
      ], 2)) : O("", !0)
    ]));
  }
}), IC = { class: "flex flex-1 min-h-0" }, RC = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, OC = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, VC = ["aria-current", "data-has-active", "title", "onClick"], zC = {
  key: 1,
  class: "footer-section shrink-0 border-t [background-color:var(--kiut-lateral-bg)]"
}, NC = { class: "px-4 py-4 shrink-0" }, WC = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, jC = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, HC = ["data-nav-id", "aria-current", "onClick"], YC = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, KC = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, UC = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, qC = ["data-nav-id", "aria-current", "onClick"], XC = { class: "truncate text-[15px]" }, GC = ["aria-current", "data-has-active", "onClick"], ZC = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, QC = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, JC = /* @__PURE__ */ J({
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
  setup(t, { emit: e }) {
    const n = ot(!1), a = t, o = e, s = da(), { class: i, ...l } = s, r = ot(!1);
    function c() {
      typeof window > "u" || (r.value = window.innerWidth < a.mobileBreakpoint);
    }
    te(() => {
      c(), window.addEventListener("resize", c);
    }), ue(() => {
      window.removeEventListener("resize", c);
    });
    const d = C(() => {
      const m = a.sections.find((g) => g.id === a.selectedSectionId);
      return m?.items?.length ? m : null;
    });
    function h(m) {
      return a.activePath ? a.activePath === m.path || a.activePath.startsWith(m.path + "/") : !1;
    }
    function p(m) {
      return m.items?.length ? m.items.some(h) : !a.activePath || !m.path ? !1 : a.activePath === m.path || a.activePath.startsWith(m.path + "/");
    }
    function v(m) {
      if (!m.items?.length) {
        o("update:selectedSectionId", null), o("navigate", {
          section: m,
          item: { id: m.id, label: m.label, path: m.path }
        });
        return;
      }
      const g = a.selectedSectionId === m.id ? null : m.id;
      o("update:selectedSectionId", g);
    }
    function f(m, g) {
      o("navigate", { section: m, item: g });
    }
    function y() {
      o("update:selectedSectionId", null);
    }
    function _(m, g) {
      f(m, g), y();
    }
    return (m, g) => r.value ? (b(), k("div", on({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      V(xn, { name: "ksn-overlay" }, {
        default: I(() => [
          d.value ? (b(), k("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: y
          })) : O("", !0)
        ]),
        _: 1
      }),
      V(xn, { name: "ksn-sheet" }, {
        default: I(() => [
          d.value ? (b(), k("div", {
            key: 0,
            class: "mobile-subsections fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t max-h-[70vh] flex flex-col",
            style: yt({ paddingBottom: a.mobileBarHeight })
          }, [
            g[3] || (g[3] = u("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              u("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            u("div", YC, [
              u("p", KC, A(d.value.label), 1),
              u("button", {
                type: "button",
                class: "w-8 h-8 flex items-center justify-center rounded-lg [color:var(--kiut-text-muted)] hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-colors",
                "aria-label": "Close",
                onClick: y
              }, [...g[2] || (g[2] = [
                u("svg", {
                  class: "w-4 h-4",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2.5",
                  "stroke-linecap": "round"
                }, [
                  u("path", { d: "M18 6L6 18M6 6l12 12" })
                ], -1)
              ])])
            ]),
            u("nav", UC, [
              (b(!0), k(G, null, it(d.value.items, (x) => (b(), k("button", {
                key: x.id,
                type: "button",
                "data-nav-id": x.id,
                "aria-current": h(x) ? "page" : void 0,
                class: "ksn-item-btn group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]",
                onClick: (w) => _(d.value, x)
              }, [
                x.icon ? (b(), q(tn(x.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : O("", !0),
                u("span", XC, A(x.label), 1)
              ], 8, qC))), 128))
            ])
          ], 4)) : O("", !0)
        ]),
        _: 1
      }),
      u("nav", {
        class: "ksn-mobile-bar fixed bottom-0 left-0 right-0 z-50 border-t flex items-stretch justify-around overflow-hidden",
        style: yt({ height: t.mobileBarHeight }),
        "aria-label": "Sections"
      }, [
        (b(!0), k(G, null, it(t.sections, (x) => (b(), k("button", {
          key: x.id,
          type: "button",
          "aria-current": t.selectedSectionId === x.id ? "true" : void 0,
          "data-has-active": p(x) ? "true" : void 0,
          class: "ksn-section-btn relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset",
          onClick: (w) => v(x)
        }, [
          t.selectedSectionId === x.id || p(x) ? (b(), k("span", ZC)) : O("", !0),
          x.icon ? (b(), q(tn(x.icon), {
            key: 1,
            class: "shrink-0",
            style: yt({ width: t.primaryIconSize, height: t.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : O("", !0),
          u("span", QC, A(x.label), 1)
        ], 8, GC))), 128))
      ], 4)
    ], 16)) : (b(), k("aside", on({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      u("div", IC, [
        u("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center",
          style: yt({
            "--expanded-width": t.expandedPrimaryWidth,
            width: t.primaryRailWidth
          }),
          onMouseenter: g[0] || (g[0] = (x) => n.value = !0),
          onMouseleave: g[1] || (g[1] = (x) => n.value = !1)
        }, [
          m.$slots.logo ? (b(), k("div", RC, [
            wt(m.$slots, "logo", { expanded: n.value }, void 0, !0)
          ])) : O("", !0),
          u("nav", OC, [
            (b(!0), k(G, null, it(t.sections, (x) => (b(), k("button", {
              key: x.id,
              type: "button",
              "aria-current": t.selectedSectionId === x.id ? "true" : void 0,
              "data-has-active": p(x) ? "true" : void 0,
              title: x.label,
              class: "ksn-section-btn group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
              onClick: (w) => v(x)
            }, [
              x.icon ? (b(), q(tn(x.icon), {
                key: 0,
                class: "shrink-0",
                style: yt({ width: t.primaryIconSize, height: t.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : O("", !0),
              u("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: yt({ fontSize: t.primaryFontSize })
              }, A(x.label), 5)
            ], 8, VC))), 128))
          ]),
          m.$slots.footer ? (b(), k("div", zC, [
            wt(m.$slots, "footer", { expanded: n.value }, void 0, !0)
          ])) : O("", !0)
        ], 36),
        V(xn, { name: "ksn-sub" }, {
          default: I(() => [
            d.value ? (b(), k("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: yt({ width: t.secondaryWidth })
            }, [
              u("div", NC, [
                u("p", WC, A(d.value.label), 1)
              ]),
              u("nav", jC, [
                (b(!0), k(G, null, it(d.value.items, (x) => (b(), k("button", {
                  key: x.id,
                  type: "button",
                  "data-nav-id": x.id,
                  "aria-current": h(x) ? "page" : void 0,
                  class: "ksn-item-btn group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
                  onClick: (w) => f(d.value, x)
                }, [
                  x.icon ? (b(), q(tn(x.icon), {
                    key: 0,
                    style: yt({ width: t.secondaryIconSize, height: t.secondaryIconSize })
                  }, null, 8, ["style"])) : O("", !0),
                  u("span", {
                    class: "truncate",
                    style: yt({ fontSize: t.secondaryFontSize })
                  }, A(x.label), 5)
                ], 8, HC))), 128))
              ])
            ], 4)) : O("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), t$ = /* @__PURE__ */ rt(JC, [["__scopeId", "data-v-e0ccb96c"]]), u$ = {
  install(t) {
    t.component("KiutChartBar", be), t.component("KiutChartLine", he), t.component("KiutPieChart", pa), t.component("KiutBoxplotChart", lf), t.component("KiutCandlestickChart", qf), t.component("KiutHistogramChart", Vi), t.component("KiutSankeyChart", Ve), t.component("KiutAgentsPerDay", Ip), t.component("KiutBookingManager", hm), t.component("KiutCheckin", Yi), t.component("KiutCheckinContainer", w0), t.component("KiutCheckinMetrics", Hm), t.component("KiutCheckinSegments", Ui), t.component("KiutDisruption", W0), t.component("KiutFAQ", X0), t.component("KiutMessagesPerAgent", ib), t.component("KiutRecordLocator", Ki), t.component("KiutSalesByChannel", qi), t.component("KiutSeller", Xi), t.component("KiutSellerContainer", qb), t.component("KiutTopAgents", nv), t.component("KiutPaymentMethod", Cv), t.component("KiutAgentHumanConversations", ky), t.component("KiutChannelMetrics", By), t.component("KiutTriageCombinations", Ky), t.component("KiutSelectLanguage", Jy), t.component("KiutGuardrails", d1), t.component("KiutDisruptionNotifier", B1), t.component("KiutTotalConversationsCard", j1), t.component("KiutCsatP95Card", H1), t.component("KiutCsatPulseCard", Y1), t.component("KiutCSATContainer", yx), t.component("KiutAiGeneratedRevenueCard", xx), t.component("KiutHumanEscalations", Fx), t.component("KiutHumanEscalationsCard", Px), t.component("KiutNpsDailyMetrics", Qi), t.component("KiutNpsMetrics", Ji), t.component("KiutNpsOverviewMetrics", Zi), t.component("KiutAWSCost", Hx), t.component("KiutCostUsage", e_), t.component("KiutTokenUsage", h_), t.component("KiutConversationCount", w_), t.component("KiutTopAgentsAnalysis", I_), t.component("KiutTopAgentsPie", K_), t.component("KiutDailyCostTrends", nk), t.component("KiutModelUsage", bk), t.component("KiutMessageRoles", Sk), t.component("KiutCostPerConversations", Ok), t.component("Tabs", tl), t.component("Table", Gi), t.component("Filters", b2), t.component("InputText", w2), t.component("InputPassword", L2), t.component("InputTextarea", R2), t.component("InputFile", Y2), t.component("InputDateTime", Z2), t.component("InputTime", aw), t.component("InputRange", bw), t.component("InputNumber", kw), t.component("InputColorPicker", Bw), t.component("Select", nl), t.component("MultiSelect", Uw), t.component("Toggle", Gw), t.component("InputPhone", o5), t.component("SelectablePills", u5), t.component("SegmentedControl", p5), t.component("DateRangePicker", H5), t.component("DatePickerPresets", mC), t.component("Tag", jt), t.component("Button", ea), t.component("Modal", AC), t.component("Section", EC), t.component("KiutAppShellNavigation", t$);
  }
};
export {
  Hx as AWSCost,
  ky as AgentHumanConversations,
  Ip as AgentsPerDay,
  xx as AiGeneratedRevenueCard,
  t$ as AppShellNavigation,
  hm as BookingManager,
  lf as BoxplotChart,
  ea as Button,
  yx as CSATContainer,
  qf as CandlestickChart,
  By as ChannelMetrics,
  be as ChartBar,
  he as ChartLine,
  Yi as Checkin,
  w0 as CheckinContainer,
  Hm as CheckinMetrics,
  Ui as CheckinSegments,
  w_ as ConversationCount,
  Ok as CostPerConversations,
  e_ as CostUsage,
  H1 as CsatP95Card,
  Y1 as CsatPulseCard,
  nk as DailyCostTrends,
  mC as DatePickerPresets,
  H5 as DateRangePicker,
  W0 as Disruption,
  B1 as DisruptionNotifier,
  X0 as FAQ,
  b2 as Filters,
  d1 as Guardrails,
  Vi as HistogramChart,
  Fx as HumanEscalations,
  Px as HumanEscalationsCard,
  Bw as InputColorPicker,
  Z2 as InputDateTime,
  Y2 as InputFile,
  kw as InputNumber,
  L2 as InputPassword,
  o5 as InputPhone,
  bw as InputRange,
  w2 as InputText,
  R2 as InputTextarea,
  aw as InputTime,
  u$ as KiutUIPlugin,
  Sk as MessageRoles,
  ib as MessagesPerAgent,
  AC as Modal,
  bk as ModelUsage,
  Uw as MultiSelect,
  Qi as NpsDailyMetrics,
  Ji as NpsMetrics,
  Zi as NpsOverviewMetrics,
  Cv as PaymentMethod,
  pa as PieChart,
  Ki as RecordLocator,
  qi as SalesByChannel,
  Ve as SankeyChart,
  EC as Section,
  p5 as SegmentedControl,
  nl as Select,
  Jy as SelectLanguage,
  u5 as SelectablePills,
  Xi as Seller,
  qb as SellerContainer,
  Gi as Table,
  tl as Tabs,
  jt as Tag,
  Gw as Toggle,
  h_ as TokenUsage,
  nv as TopAgents,
  I_ as TopAgentsAnalysis,
  K_ as TopAgentsPie,
  j1 as TotalConversationsCard,
  Ky as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
