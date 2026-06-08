import { defineComponent as J, shallowRef as Ns, h as La, ref as oe, onMounted as tt, onUnmounted as ht, watch as Le, toRaw as Fa, nextTick as Ve, version as ul, isProxy as js, computed as C, toRef as pe, openBlock as b, createElementBlock as k, createVNode as R, unref as L, createElementVNode as u, Fragment as Z, renderList as ie, normalizeStyle as ye, normalizeClass as U, toDisplayString as A, createCommentVNode as V, onBeforeUnmount as Ws, createStaticVNode as go, withDirectives as et, vShow as on, useSlots as Na, Transition as _e, withCtx as P, renderSlot as Ce, Comment as hl, createBlock as q, resolveDynamicComponent as tn, createTextVNode as ke, vModelSelect as fl, Teleport as ja, withModifiers as ot, withKeys as $n, vModelText as Ut, useAttrs as da, inject as Hs, mergeProps as sn } from "vue";
import * as po from "echarts/core";
import { TooltipComponent as gl, TitleComponent as pl } from "echarts/components";
import { SankeyChart as ml } from "echarts/charts";
import { CanvasRenderer as bl } from "echarts/renderers";
import Oe from "moment";
function En(e) {
  return e + 0.5 | 0;
}
const Tt = (e, t, n) => Math.max(Math.min(e, n), t);
function vn(e) {
  return Tt(En(e * 2.55), 0, 255);
}
function It(e) {
  return Tt(En(e * 255), 0, 255);
}
function wt(e) {
  return Tt(En(e / 2.55) / 100, 0, 1);
}
function mo(e) {
  return Tt(En(e * 100), 0, 100);
}
const it = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Pa = [..."0123456789ABCDEF"], vl = (e) => Pa[e & 15], yl = (e) => Pa[(e & 240) >> 4] + Pa[e & 15], On = (e) => (e & 240) >> 4 === (e & 15), _l = (e) => On(e.r) && On(e.g) && On(e.b) && On(e.a);
function xl(e) {
  var t = e.length, n;
  return e[0] === "#" && (t === 4 || t === 5 ? n = {
    r: 255 & it[e[1]] * 17,
    g: 255 & it[e[2]] * 17,
    b: 255 & it[e[3]] * 17,
    a: t === 5 ? it[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (n = {
    r: it[e[1]] << 4 | it[e[2]],
    g: it[e[3]] << 4 | it[e[4]],
    b: it[e[5]] << 4 | it[e[6]],
    a: t === 9 ? it[e[7]] << 4 | it[e[8]] : 255
  })), n;
}
const kl = (e, t) => e < 255 ? t(e) : "";
function wl(e) {
  var t = _l(e) ? vl : yl;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + kl(e.a, t) : void 0;
}
const Cl = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Ys(e, t, n) {
  const a = t * Math.min(n, 1 - n), o = (s, i = (s + e / 30) % 12) => n - a * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [o(0), o(8), o(4)];
}
function $l(e, t, n) {
  const a = (o, s = (o + e / 60) % 6) => n - n * t * Math.max(Math.min(s, 4 - s, 1), 0);
  return [a(5), a(3), a(1)];
}
function Ml(e, t, n) {
  const a = Ys(e, 1, 0.5);
  let o;
  for (t + n > 1 && (o = 1 / (t + n), t *= o, n *= o), o = 0; o < 3; o++)
    a[o] *= 1 - t - n, a[o] += t;
  return a;
}
function Sl(e, t, n, a, o) {
  return e === o ? (t - n) / a + (t < n ? 6 : 0) : t === o ? (n - e) / a + 2 : (e - t) / a + 4;
}
function Wa(e) {
  const n = e.r / 255, a = e.g / 255, o = e.b / 255, s = Math.max(n, a, o), i = Math.min(n, a, o), l = (s + i) / 2;
  let r, c, d;
  return s !== i && (d = s - i, c = l > 0.5 ? d / (2 - s - i) : d / (s + i), r = Sl(n, a, o, d, s), r = r * 60 + 0.5), [r | 0, c || 0, l];
}
function Ha(e, t, n, a) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, a)).map(It);
}
function Ya(e, t, n) {
  return Ha(Ys, e, t, n);
}
function Dl(e, t, n) {
  return Ha(Ml, e, t, n);
}
function Al(e, t, n) {
  return Ha($l, e, t, n);
}
function Ks(e) {
  return (e % 360 + 360) % 360;
}
function Tl(e) {
  const t = Cl.exec(e);
  let n = 255, a;
  if (!t)
    return;
  t[5] !== a && (n = t[6] ? vn(+t[5]) : It(+t[5]));
  const o = Ks(+t[2]), s = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? a = Dl(o, s, i) : t[1] === "hsv" ? a = Al(o, s, i) : a = Ya(o, s, i), {
    r: a[0],
    g: a[1],
    b: a[2],
    a: n
  };
}
function Bl(e, t) {
  var n = Wa(e);
  n[0] = Ks(n[0] + t), n = Ya(n), e.r = n[0], e.g = n[1], e.b = n[2];
}
function Ll(e) {
  if (!e)
    return;
  const t = Wa(e), n = t[0], a = mo(t[1]), o = mo(t[2]);
  return e.a < 255 ? `hsla(${n}, ${a}%, ${o}%, ${wt(e.a)})` : `hsl(${n}, ${a}%, ${o}%)`;
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
  const e = {}, t = Object.keys(vo), n = Object.keys(bo);
  let a, o, s, i, l;
  for (a = 0; a < t.length; a++) {
    for (i = l = t[a], o = 0; o < n.length; o++)
      s = n[o], l = l.replace(s, bo[s]);
    s = parseInt(vo[i], 16), e[l] = [s >> 16 & 255, s >> 8 & 255, s & 255];
  }
  return e;
}
let Vn;
function Pl(e) {
  Vn || (Vn = Fl(), Vn.transparent = [0, 0, 0, 0]);
  const t = Vn[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const El = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Il(e) {
  const t = El.exec(e);
  let n = 255, a, o, s;
  if (t) {
    if (t[7] !== a) {
      const i = +t[7];
      n = t[8] ? vn(i) : Tt(i * 255, 0, 255);
    }
    return a = +t[1], o = +t[3], s = +t[5], a = 255 & (t[2] ? vn(a) : Tt(a, 0, 255)), o = 255 & (t[4] ? vn(o) : Tt(o, 0, 255)), s = 255 & (t[6] ? vn(s) : Tt(s, 0, 255)), {
      r: a,
      g: o,
      b: s,
      a: n
    };
  }
}
function Rl(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${wt(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const ma = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, Qt = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function Ol(e, t, n) {
  const a = Qt(wt(e.r)), o = Qt(wt(e.g)), s = Qt(wt(e.b));
  return {
    r: It(ma(a + n * (Qt(wt(t.r)) - a))),
    g: It(ma(o + n * (Qt(wt(t.g)) - o))),
    b: It(ma(s + n * (Qt(wt(t.b)) - s))),
    a: e.a + n * (t.a - e.a)
  };
}
function zn(e, t, n) {
  if (e) {
    let a = Wa(e);
    a[t] = Math.max(0, Math.min(a[t] + a[t] * n, t === 0 ? 360 : 1)), a = Ya(a), e.r = a[0], e.g = a[1], e.b = a[2];
  }
}
function Us(e, t) {
  return e && Object.assign(t || {}, e);
}
function yo(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = It(e[3]))) : (t = Us(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = It(t.a)), t;
}
function Vl(e) {
  return e.charAt(0) === "r" ? Il(e) : Tl(e);
}
class Mn {
  constructor(t) {
    if (t instanceof Mn)
      return t;
    const n = typeof t;
    let a;
    n === "object" ? a = yo(t) : n === "string" && (a = xl(t) || Pl(t) || Vl(t)), this._rgb = a, this._valid = !!a;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Us(this._rgb);
    return t && (t.a = wt(t.a)), t;
  }
  set rgb(t) {
    this._rgb = yo(t);
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
  mix(t, n) {
    if (t) {
      const a = this.rgb, o = t.rgb;
      let s;
      const i = n === s ? 0.5 : n, l = 2 * i - 1, r = a.a - o.a, c = ((l * r === -1 ? l : (l + r) / (1 + l * r)) + 1) / 2;
      s = 1 - c, a.r = 255 & c * a.r + s * o.r + 0.5, a.g = 255 & c * a.g + s * o.g + 0.5, a.b = 255 & c * a.b + s * o.b + 0.5, a.a = i * a.a + (1 - i) * o.a, this.rgb = a;
    }
    return this;
  }
  interpolate(t, n) {
    return t && (this._rgb = Ol(this._rgb, t._rgb, n)), this;
  }
  clone() {
    return new Mn(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = It(t), this;
  }
  clearer(t) {
    const n = this._rgb;
    return n.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, n = En(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return zn(this._rgb, 2, t), this;
  }
  darken(t) {
    return zn(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return zn(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return zn(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return Bl(this._rgb, t), this;
  }
}
function _t() {
}
const zl = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function Me(e) {
  return e == null;
}
function ze(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function we(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function rt(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function gt(e, t) {
  return rt(e) ? e : t;
}
function he(e, t) {
  return typeof e > "u" ? t : e;
}
const Nl = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, qs = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function Be(e, t, n) {
  if (e && typeof e.call == "function")
    return e.apply(n, t);
}
function Se(e, t, n, a) {
  let o, s, i;
  if (ze(e))
    for (s = e.length, o = 0; o < s; o++)
      t.call(n, e[o], o);
  else if (we(e))
    for (i = Object.keys(e), s = i.length, o = 0; o < s; o++)
      t.call(n, e[i[o]], i[o]);
}
function na(e, t) {
  let n, a, o, s;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (n = 0, a = e.length; n < a; ++n)
    if (o = e[n], s = t[n], o.datasetIndex !== s.datasetIndex || o.index !== s.index)
      return !1;
  return !0;
}
function aa(e) {
  if (ze(e))
    return e.map(aa);
  if (we(e)) {
    const t = /* @__PURE__ */ Object.create(null), n = Object.keys(e), a = n.length;
    let o = 0;
    for (; o < a; ++o)
      t[n[o]] = aa(e[n[o]]);
    return t;
  }
  return e;
}
function Xs(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function jl(e, t, n, a) {
  if (!Xs(e))
    return;
  const o = t[e], s = n[e];
  we(o) && we(s) ? Sn(o, s, a) : t[e] = aa(s);
}
function Sn(e, t, n) {
  const a = ze(t) ? t : [
    t
  ], o = a.length;
  if (!we(e))
    return e;
  n = n || {};
  const s = n.merger || jl;
  let i;
  for (let l = 0; l < o; ++l) {
    if (i = a[l], !we(i))
      continue;
    const r = Object.keys(i);
    for (let c = 0, d = r.length; c < d; ++c)
      s(r[c], e, i, n);
  }
  return e;
}
function xn(e, t) {
  return Sn(e, t, {
    merger: Wl
  });
}
function Wl(e, t, n) {
  if (!Xs(e))
    return;
  const a = t[e], o = n[e];
  we(a) && we(o) ? xn(a, o) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = aa(o));
}
const _o = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function Hl(e) {
  const t = e.split("."), n = [];
  let a = "";
  for (const o of t)
    a += o, a.endsWith("\\") ? a = a.slice(0, -1) + "." : (n.push(a), a = "");
  return n;
}
function Yl(e) {
  const t = Hl(e);
  return (n) => {
    for (const a of t) {
      if (a === "")
        break;
      n = n && n[a];
    }
    return n;
  };
}
function Xt(e, t) {
  return (_o[t] || (_o[t] = Yl(t)))(e);
}
function Ka(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const Dn = (e) => typeof e < "u", Ot = (e) => typeof e == "function", xo = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
};
function Kl(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const De = Math.PI, Ee = 2 * De, Ul = Ee + De, oa = Number.POSITIVE_INFINITY, ql = De / 180, Ne = De / 2, Nt = De / 4, ko = De * 2 / 3, Gs = Math.log10, bt = Math.sign;
function kn(e, t, n) {
  return Math.abs(e - t) < n;
}
function wo(e) {
  const t = Math.round(e);
  e = kn(e, t, e / 1e3) ? t : e;
  const n = Math.pow(10, Math.floor(Gs(e))), a = e / n;
  return (a <= 1 ? 1 : a <= 2 ? 2 : a <= 5 ? 5 : 10) * n;
}
function Xl(e) {
  const t = [], n = Math.sqrt(e);
  let a;
  for (a = 1; a < n; a++)
    e % a === 0 && (t.push(a), t.push(e / a));
  return n === (n | 0) && t.push(n), t.sort((o, s) => o - s).pop(), t;
}
function Gl(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function An(e) {
  return !Gl(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Zl(e, t) {
  const n = Math.round(e);
  return n - t <= e && n + t >= e;
}
function Ql(e, t, n) {
  let a, o, s;
  for (a = 0, o = e.length; a < o; a++)
    s = e[a][n], isNaN(s) || (t.min = Math.min(t.min, s), t.max = Math.max(t.max, s));
}
function Ct(e) {
  return e * (De / 180);
}
function Jl(e) {
  return e * (180 / De);
}
function Co(e) {
  if (!rt(e))
    return;
  let t = 1, n = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, n++;
  return n;
}
function Zs(e, t) {
  const n = t.x - e.x, a = t.y - e.y, o = Math.sqrt(n * n + a * a);
  let s = Math.atan2(a, n);
  return s < -0.5 * De && (s += Ee), {
    angle: s,
    distance: o
  };
}
function Ea(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function er(e, t) {
  return (e - t + Ul) % Ee - De;
}
function ut(e) {
  return (e % Ee + Ee) % Ee;
}
function Tn(e, t, n, a) {
  const o = ut(e), s = ut(t), i = ut(n), l = ut(s - o), r = ut(i - o), c = ut(o - s), d = ut(o - i);
  return o === s || o === i || a && s === i || l > r && c < d;
}
function Ue(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function tr(e) {
  return Ue(e, -32768, 32767);
}
function Bt(e, t, n, a = 1e-6) {
  return e >= Math.min(t, n) - a && e <= Math.max(t, n) + a;
}
function Ua(e, t, n) {
  n = n || ((i) => e[i] < t);
  let a = e.length - 1, o = 0, s;
  for (; a - o > 1; )
    s = o + a >> 1, n(s) ? o = s : a = s;
  return {
    lo: o,
    hi: a
  };
}
const Kt = (e, t, n, a) => Ua(e, n, a ? (o) => {
  const s = e[o][t];
  return s < n || s === n && e[o + 1][t] === n;
} : (o) => e[o][t] < n), nr = (e, t, n) => Ua(e, n, (a) => e[a][t] >= n);
function ar(e, t, n) {
  let a = 0, o = e.length;
  for (; a < o && e[a] < t; )
    a++;
  for (; o > a && e[o - 1] > n; )
    o--;
  return a > 0 || o < e.length ? e.slice(a, o) : e;
}
const Qs = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function or(e, t) {
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
  }), Qs.forEach((n) => {
    const a = "_onData" + Ka(n), o = e[n];
    Object.defineProperty(e, n, {
      configurable: !0,
      enumerable: !1,
      value(...s) {
        const i = o.apply(this, s);
        return e._chartjs.listeners.forEach((l) => {
          typeof l[a] == "function" && l[a](...s);
        }), i;
      }
    });
  });
}
function $o(e, t) {
  const n = e._chartjs;
  if (!n)
    return;
  const a = n.listeners, o = a.indexOf(t);
  o !== -1 && a.splice(o, 1), !(a.length > 0) && (Qs.forEach((s) => {
    delete e[s];
  }), delete e._chartjs);
}
function Js(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const ei = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function ti(e, t) {
  let n = [], a = !1;
  return function(...o) {
    n = o, a || (a = !0, ei.call(window, () => {
      a = !1, e.apply(t, n);
    }));
  };
}
function sr(e, t) {
  let n;
  return function(...a) {
    return t ? (clearTimeout(n), n = setTimeout(e, t, a)) : e.apply(this, a), t;
  };
}
const qa = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", Ye = (e, t, n) => e === "start" ? t : e === "end" ? n : (t + n) / 2, ir = (e, t, n, a) => e === (a ? "left" : "right") ? n : e === "center" ? (t + n) / 2 : t;
function lr(e, t, n) {
  const a = t.length;
  let o = 0, s = a;
  if (e._sorted) {
    const { iScale: i, vScale: l, _parsed: r } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, d = i.axis, { min: h, max: p, minDefined: v, maxDefined: f } = i.getUserBounds();
    if (v) {
      if (o = Math.min(
        // @ts-expect-error Need to type _parsed
        Kt(r, d, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? a : Kt(t, d, i.getPixelForValue(h)).lo
      ), c) {
        const y = r.slice(0, o + 1).reverse().findIndex((x) => !Me(x[l.axis]));
        o -= Math.max(0, y);
      }
      o = Ue(o, 0, a - 1);
    }
    if (f) {
      let y = Math.max(
        // @ts-expect-error Need to type _parsed
        Kt(r, i.axis, p, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? 0 : Kt(t, d, i.getPixelForValue(p), !0).hi + 1
      );
      if (c) {
        const x = r.slice(y - 1).findIndex((m) => !Me(m[l.axis]));
        y += Math.max(0, x);
      }
      s = Ue(y, o, a) - o;
    } else
      s = a - o;
  }
  return {
    start: o,
    count: s
  };
}
function rr(e) {
  const { xScale: t, yScale: n, _scaleRanges: a } = e, o = {
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
const Nn = (e) => e === 0 || e === 1, Mo = (e, t, n) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * Ee / n)), So = (e, t, n) => Math.pow(2, -10 * e) * Math.sin((e - t) * Ee / n) + 1, wn = {
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
  easeInSine: (e) => -Math.cos(e * Ne) + 1,
  easeOutSine: (e) => Math.sin(e * Ne),
  easeInOutSine: (e) => -0.5 * (Math.cos(De * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => Nn(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => Nn(e) ? e : Mo(e, 0.075, 0.3),
  easeOutElastic: (e) => Nn(e) ? e : So(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return Nn(e) ? e : e < 0.5 ? 0.5 * Mo(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * So(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - wn.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? wn.easeInBounce(e * 2) * 0.5 : wn.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function Xa(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Do(e) {
  return Xa(e) ? e : new Mn(e);
}
function ba(e) {
  return Xa(e) ? e : new Mn(e).saturate(0.5).darken(0.1).hexString();
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
function ur(e) {
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
      properties: dr
    },
    numbers: {
      type: "number",
      properties: cr
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
function hr(e) {
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
const Ao = /* @__PURE__ */ new Map();
function fr(e, t) {
  t = t || {};
  const n = e + JSON.stringify(t);
  let a = Ao.get(n);
  return a || (a = new Intl.NumberFormat(e, t), Ao.set(n, a)), a;
}
function Ga(e, t, n) {
  return fr(t, n).format(e);
}
const gr = {
  values(e) {
    return ze(e) ? e : "" + e;
  },
  numeric(e, t, n) {
    if (e === 0)
      return "0";
    const a = this.chart.options.locale;
    let o, s = e;
    if (n.length > 1) {
      const c = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
      (c < 1e-4 || c > 1e15) && (o = "scientific"), s = pr(e, n);
    }
    const i = Gs(Math.abs(s)), l = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), r = {
      notation: o,
      minimumFractionDigits: l,
      maximumFractionDigits: l
    };
    return Object.assign(r, this.options.ticks.format), Ga(e, a, r);
  }
};
function pr(e, t) {
  let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var ni = {
  formatters: gr
};
function mr(e) {
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
      callback: ni.formatters.values,
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
const Gt = /* @__PURE__ */ Object.create(null), Ia = /* @__PURE__ */ Object.create(null);
function Cn(e, t) {
  if (!t)
    return e;
  const n = t.split(".");
  for (let a = 0, o = n.length; a < o; ++a) {
    const s = n[a];
    e = e[s] || (e[s] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function va(e, t, n) {
  return typeof t == "string" ? Sn(Cn(e, t), n) : Sn(Cn(e, ""), t);
}
class br {
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
    }, this.hover = {}, this.hoverBackgroundColor = (a, o) => ba(o.backgroundColor), this.hoverBorderColor = (a, o) => ba(o.borderColor), this.hoverColor = (a, o) => ba(o.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(n);
  }
  set(t, n) {
    return va(this, t, n);
  }
  get(t) {
    return Cn(this, t);
  }
  describe(t, n) {
    return va(Ia, t, n);
  }
  override(t, n) {
    return va(Gt, t, n);
  }
  route(t, n, a, o) {
    const s = Cn(this, t), i = Cn(this, a), l = "_" + n;
    Object.defineProperties(s, {
      [l]: {
        value: s[n],
        writable: !0
      },
      [n]: {
        enumerable: !0,
        get() {
          const r = this[l], c = i[o];
          return we(r) ? Object.assign({}, c, r) : he(r, c);
        },
        set(r) {
          this[l] = r;
        }
      }
    });
  }
  apply(t) {
    t.forEach((n) => n(this));
  }
}
var Re = /* @__PURE__ */ new br({
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
  ur,
  hr,
  mr
]);
function vr(e) {
  return !e || Me(e.size) || Me(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function To(e, t, n, a, o) {
  let s = t[o];
  return s || (s = t[o] = e.measureText(o).width, n.push(o)), s > a && (a = s), a;
}
function jt(e, t, n) {
  const a = e.currentDevicePixelRatio, o = n !== 0 ? Math.max(n / 2, 0.5) : 0;
  return Math.round((t - o) * a) / a + o;
}
function Bo(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Ra(e, t, n, a) {
  ai(e, t, n, a, null);
}
function ai(e, t, n, a, o) {
  let s, i, l, r, c, d, h, p;
  const v = t.pointStyle, f = t.rotation, y = t.radius;
  let x = (f || 0) * ql;
  if (v && typeof v == "object" && (s = v.toString(), s === "[object HTMLImageElement]" || s === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(n, a), e.rotate(x), e.drawImage(v, -v.width / 2, -v.height / 2, v.width, v.height), e.restore();
    return;
  }
  if (!(isNaN(y) || y <= 0)) {
    switch (e.beginPath(), v) {
      // Default includes circle
      default:
        o ? e.ellipse(n, a, o / 2, y, 0, 0, Ee) : e.arc(n, a, y, 0, Ee), e.closePath();
        break;
      case "triangle":
        d = o ? o / 2 : y, e.moveTo(n + Math.sin(x) * d, a - Math.cos(x) * y), x += ko, e.lineTo(n + Math.sin(x) * d, a - Math.cos(x) * y), x += ko, e.lineTo(n + Math.sin(x) * d, a - Math.cos(x) * y), e.closePath();
        break;
      case "rectRounded":
        c = y * 0.516, r = y - c, i = Math.cos(x + Nt) * r, h = Math.cos(x + Nt) * (o ? o / 2 - c : r), l = Math.sin(x + Nt) * r, p = Math.sin(x + Nt) * (o ? o / 2 - c : r), e.arc(n - h, a - l, c, x - De, x - Ne), e.arc(n + p, a - i, c, x - Ne, x), e.arc(n + h, a + l, c, x, x + Ne), e.arc(n - p, a + i, c, x + Ne, x + De), e.closePath();
        break;
      case "rect":
        if (!f) {
          r = Math.SQRT1_2 * y, d = o ? o / 2 : r, e.rect(n - d, a - r, 2 * d, 2 * r);
          break;
        }
        x += Nt;
      /* falls through */
      case "rectRot":
        h = Math.cos(x) * (o ? o / 2 : y), i = Math.cos(x) * y, l = Math.sin(x) * y, p = Math.sin(x) * (o ? o / 2 : y), e.moveTo(n - h, a - l), e.lineTo(n + p, a - i), e.lineTo(n + h, a + l), e.lineTo(n - p, a + i), e.closePath();
        break;
      case "crossRot":
        x += Nt;
      /* falls through */
      case "cross":
        h = Math.cos(x) * (o ? o / 2 : y), i = Math.cos(x) * y, l = Math.sin(x) * y, p = Math.sin(x) * (o ? o / 2 : y), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + p, a - i), e.lineTo(n - p, a + i);
        break;
      case "star":
        h = Math.cos(x) * (o ? o / 2 : y), i = Math.cos(x) * y, l = Math.sin(x) * y, p = Math.sin(x) * (o ? o / 2 : y), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + p, a - i), e.lineTo(n - p, a + i), x += Nt, h = Math.cos(x) * (o ? o / 2 : y), i = Math.cos(x) * y, l = Math.sin(x) * y, p = Math.sin(x) * (o ? o / 2 : y), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + p, a - i), e.lineTo(n - p, a + i);
        break;
      case "line":
        i = o ? o / 2 : Math.cos(x) * y, l = Math.sin(x) * y, e.moveTo(n - i, a - l), e.lineTo(n + i, a + l);
        break;
      case "dash":
        e.moveTo(n, a), e.lineTo(n + Math.cos(x) * (o ? o / 2 : y), a + Math.sin(x) * y);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function Bn(e, t, n) {
  return n = n || 0.5, !t || e && e.x > t.left - n && e.x < t.right + n && e.y > t.top - n && e.y < t.bottom + n;
}
function Za(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function Qa(e) {
  e.restore();
}
function yr(e, t, n, a, o) {
  if (!t)
    return e.lineTo(n.x, n.y);
  if (o === "middle") {
    const s = (t.x + n.x) / 2;
    e.lineTo(s, t.y), e.lineTo(s, n.y);
  } else o === "after" != !!a ? e.lineTo(t.x, n.y) : e.lineTo(n.x, t.y);
  e.lineTo(n.x, n.y);
}
function _r(e, t, n, a) {
  if (!t)
    return e.lineTo(n.x, n.y);
  e.bezierCurveTo(a ? t.cp1x : t.cp2x, a ? t.cp1y : t.cp2y, a ? n.cp2x : n.cp1x, a ? n.cp2y : n.cp1y, n.x, n.y);
}
function xr(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), Me(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function kr(e, t, n, a, o) {
  if (o.strikethrough || o.underline) {
    const s = e.measureText(a), i = t - s.actualBoundingBoxLeft, l = t + s.actualBoundingBoxRight, r = n - s.actualBoundingBoxAscent, c = n + s.actualBoundingBoxDescent, d = o.strikethrough ? (r + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = o.decorationWidth || 2, e.moveTo(i, d), e.lineTo(l, d), e.stroke();
  }
}
function wr(e, t) {
  const n = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = n;
}
function Ln(e, t, n, a, o, s = {}) {
  const i = ze(t) ? t : [
    t
  ], l = s.strokeWidth > 0 && s.strokeColor !== "";
  let r, c;
  for (e.save(), e.font = o.string, xr(e, s), r = 0; r < i.length; ++r)
    c = i[r], s.backdrop && wr(e, s.backdrop), l && (s.strokeColor && (e.strokeStyle = s.strokeColor), Me(s.strokeWidth) || (e.lineWidth = s.strokeWidth), e.strokeText(c, n, a, s.maxWidth)), e.fillText(c, n, a, s.maxWidth), kr(e, n, a, c, s), a += Number(o.lineHeight);
  e.restore();
}
function sa(e, t) {
  const { x: n, y: a, w: o, h: s, radius: i } = t;
  e.arc(n + i.topLeft, a + i.topLeft, i.topLeft, 1.5 * De, De, !0), e.lineTo(n, a + s - i.bottomLeft), e.arc(n + i.bottomLeft, a + s - i.bottomLeft, i.bottomLeft, De, Ne, !0), e.lineTo(n + o - i.bottomRight, a + s), e.arc(n + o - i.bottomRight, a + s - i.bottomRight, i.bottomRight, Ne, 0, !0), e.lineTo(n + o, a + i.topRight), e.arc(n + o - i.topRight, a + i.topRight, i.topRight, 0, -Ne, !0), e.lineTo(n + i.topLeft, a);
}
const Cr = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, $r = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Mr(e, t) {
  const n = ("" + e).match(Cr);
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
const Sr = (e) => +e || 0;
function Ja(e, t) {
  const n = {}, a = we(t), o = a ? Object.keys(t) : t, s = we(e) ? a ? (i) => he(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of o)
    n[i] = Sr(s(i));
  return n;
}
function oi(e) {
  return Ja(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function nn(e) {
  return Ja(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function ct(e) {
  const t = oi(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function qe(e, t) {
  e = e || {}, t = t || Re.font;
  let n = he(e.size, t.size);
  typeof n == "string" && (n = parseInt(n, 10));
  let a = he(e.style, t.style);
  a && !("" + a).match($r) && (console.warn('Invalid font style specified: "' + a + '"'), a = void 0);
  const o = {
    family: he(e.family, t.family),
    lineHeight: Mr(he(e.lineHeight, t.lineHeight), n),
    size: n,
    style: a,
    weight: he(e.weight, t.weight),
    string: ""
  };
  return o.string = vr(o), o;
}
function jn(e, t, n, a) {
  let o, s, i;
  for (o = 0, s = e.length; o < s; ++o)
    if (i = e[o], i !== void 0 && i !== void 0)
      return i;
}
function Dr(e, t, n) {
  const { min: a, max: o } = e, s = qs(t, (o - a) / 2), i = (l, r) => n && l === 0 ? 0 : l + r;
  return {
    min: i(a, -Math.abs(s)),
    max: i(o, s)
  };
}
function Zt(e, t) {
  return Object.assign(Object.create(e), t);
}
function eo(e, t = [
  ""
], n, a, o = () => e[0]) {
  const s = n || e;
  typeof a > "u" && (a = ri("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: s,
    _fallback: a,
    _getTarget: o,
    override: (l) => eo([
      l,
      ...e
    ], t, s, a)
  };
  return new Proxy(i, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(l, r) {
      return delete l[r], delete l._keys, delete e[0][r], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(l, r) {
      return ii(l, r, () => Ir(r, t, e, l));
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
      return Reflect.getPrototypeOf(e[0]);
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
function ln(e, t, n, a) {
  const o = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: n,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: si(e, a),
    setContext: (s) => ln(e, s, n, a),
    override: (s) => ln(e.override(s), t, n, a)
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
    get(s, i, l) {
      return ii(s, i, () => Tr(s, i, l));
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
    set(s, i, l) {
      return e[i] = l, delete s[i], !0;
    }
  });
}
function si(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: n = t.scriptable, _indexable: a = t.indexable, _allKeys: o = t.allKeys } = e;
  return {
    allKeys: o,
    scriptable: n,
    indexable: a,
    isScriptable: Ot(n) ? n : () => n,
    isIndexable: Ot(a) ? a : () => a
  };
}
const Ar = (e, t) => e ? e + Ka(t) : t, to = (e, t) => we(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function ii(e, t, n) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const a = n();
  return e[t] = a, a;
}
function Tr(e, t, n) {
  const { _proxy: a, _context: o, _subProxy: s, _descriptors: i } = e;
  let l = a[t];
  return Ot(l) && i.isScriptable(t) && (l = Br(t, l, e, n)), ze(l) && l.length && (l = Lr(t, l, e, i.isIndexable)), to(t, l) && (l = ln(l, o, s && s[t], i)), l;
}
function Br(e, t, n, a) {
  const { _proxy: o, _context: s, _subProxy: i, _stack: l } = n;
  if (l.has(e))
    throw new Error("Recursion detected: " + Array.from(l).join("->") + "->" + e);
  l.add(e);
  let r = t(s, i || a);
  return l.delete(e), to(e, r) && (r = no(o._scopes, o, e, r)), r;
}
function Lr(e, t, n, a) {
  const { _proxy: o, _context: s, _subProxy: i, _descriptors: l } = n;
  if (typeof s.index < "u" && a(e))
    return t[s.index % t.length];
  if (we(t[0])) {
    const r = t, c = o._scopes.filter((d) => d !== r);
    t = [];
    for (const d of r) {
      const h = no(c, o, e, d);
      t.push(ln(h, s, i && i[e], l));
    }
  }
  return t;
}
function li(e, t, n) {
  return Ot(e) ? e(t, n) : e;
}
const Fr = (e, t) => e === !0 ? t : typeof e == "string" ? Xt(t, e) : void 0;
function Pr(e, t, n, a, o) {
  for (const s of t) {
    const i = Fr(n, s);
    if (i) {
      e.add(i);
      const l = li(i._fallback, n, o);
      if (typeof l < "u" && l !== n && l !== a)
        return l;
    } else if (i === !1 && typeof a < "u" && n !== a)
      return null;
  }
  return !1;
}
function no(e, t, n, a) {
  const o = t._rootScopes, s = li(t._fallback, n, a), i = [
    ...e,
    ...o
  ], l = /* @__PURE__ */ new Set();
  l.add(a);
  let r = Lo(l, i, n, s || n, a);
  return r === null || typeof s < "u" && s !== n && (r = Lo(l, i, s, r, a), r === null) ? !1 : eo(Array.from(l), [
    ""
  ], o, s, () => Er(t, n, a));
}
function Lo(e, t, n, a, o) {
  for (; n; )
    n = Pr(e, t, n, a, o);
  return n;
}
function Er(e, t, n) {
  const a = e._getTarget();
  t in a || (a[t] = {});
  const o = a[t];
  return ze(o) && we(n) ? n : o || {};
}
function Ir(e, t, n, a) {
  let o;
  for (const s of t)
    if (o = ri(Ar(s, e), n), typeof o < "u")
      return to(e, o) ? no(n, a, e, o) : o;
}
function ri(e, t) {
  for (const n of t) {
    if (!n)
      continue;
    const a = n[e];
    if (typeof a < "u")
      return a;
  }
}
function Fo(e) {
  let t = e._keys;
  return t || (t = e._keys = Rr(e._scopes)), t;
}
function Rr(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e)
    for (const a of Object.keys(n).filter((o) => !o.startsWith("_")))
      t.add(a);
  return Array.from(t);
}
const Or = Number.EPSILON || 1e-14, rn = (e, t) => t < e.length && !e[t].skip && e[t], ci = (e) => e === "x" ? "y" : "x";
function Vr(e, t, n, a) {
  const o = e.skip ? t : e, s = t, i = n.skip ? t : n, l = Ea(s, o), r = Ea(i, s);
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
function zr(e, t, n) {
  const a = e.length;
  let o, s, i, l, r, c = rn(e, 0);
  for (let d = 0; d < a - 1; ++d)
    if (r = c, c = rn(e, d + 1), !(!r || !c)) {
      if (kn(t[d], 0, Or)) {
        n[d] = n[d + 1] = 0;
        continue;
      }
      o = n[d] / t[d], s = n[d + 1] / t[d], l = Math.pow(o, 2) + Math.pow(s, 2), !(l <= 9) && (i = 3 / Math.sqrt(l), n[d] = o * i * t[d], n[d + 1] = s * i * t[d]);
    }
}
function Nr(e, t, n = "x") {
  const a = ci(n), o = e.length;
  let s, i, l, r = rn(e, 0);
  for (let c = 0; c < o; ++c) {
    if (i = l, l = r, r = rn(e, c + 1), !l)
      continue;
    const d = l[n], h = l[a];
    i && (s = (d - i[n]) / 3, l[`cp1${n}`] = d - s, l[`cp1${a}`] = h - s * t[c]), r && (s = (r[n] - d) / 3, l[`cp2${n}`] = d + s, l[`cp2${a}`] = h + s * t[c]);
  }
}
function jr(e, t = "x") {
  const n = ci(t), a = e.length, o = Array(a).fill(0), s = Array(a);
  let i, l, r, c = rn(e, 0);
  for (i = 0; i < a; ++i)
    if (l = r, r = c, c = rn(e, i + 1), !!r) {
      if (c) {
        const d = c[t] - r[t];
        o[i] = d !== 0 ? (c[n] - r[n]) / d : 0;
      }
      s[i] = l ? c ? bt(o[i - 1]) !== bt(o[i]) ? 0 : (o[i - 1] + o[i]) / 2 : o[i - 1] : o[i];
    }
  zr(e, o, s), Nr(e, s, t);
}
function Wn(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
function Wr(e, t) {
  let n, a, o, s, i, l = Bn(e[0], t);
  for (n = 0, a = e.length; n < a; ++n)
    i = s, s = l, l = n < a - 1 && Bn(e[n + 1], t), s && (o = e[n], i && (o.cp1x = Wn(o.cp1x, t.left, t.right), o.cp1y = Wn(o.cp1y, t.top, t.bottom)), l && (o.cp2x = Wn(o.cp2x, t.left, t.right), o.cp2y = Wn(o.cp2y, t.top, t.bottom)));
}
function Hr(e, t, n, a, o) {
  let s, i, l, r;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    jr(e, o);
  else {
    let c = a ? e[e.length - 1] : e[0];
    for (s = 0, i = e.length; s < i; ++s)
      l = e[s], r = Vr(c, l, e[Math.min(s + 1, i - (a ? 0 : 1)) % i], t.tension), l.cp1x = r.previous.x, l.cp1y = r.previous.y, l.cp2x = r.next.x, l.cp2y = r.next.y, c = l;
  }
  t.capBezierPoints && Wr(e, n);
}
function ao() {
  return typeof window < "u" && typeof document < "u";
}
function oo(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function ia(e, t, n) {
  let a;
  return typeof e == "string" ? (a = parseInt(e, 10), e.indexOf("%") !== -1 && (a = a / 100 * t.parentNode[n])) : a = e, a;
}
const ua = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Yr(e, t) {
  return ua(e).getPropertyValue(t);
}
const Kr = [
  "top",
  "right",
  "bottom",
  "left"
];
function qt(e, t, n) {
  const a = {};
  n = n ? "-" + n : "";
  for (let o = 0; o < 4; o++) {
    const s = Kr[o];
    a[s] = parseFloat(e[t + "-" + s + n]) || 0;
  }
  return a.width = a.left + a.right, a.height = a.top + a.bottom, a;
}
const Ur = (e, t, n) => (e > 0 || t > 0) && (!n || !n.shadowRoot);
function qr(e, t) {
  const n = e.touches, a = n && n.length ? n[0] : e, { offsetX: o, offsetY: s } = a;
  let i = !1, l, r;
  if (Ur(o, s, e.target))
    l = o, r = s;
  else {
    const c = t.getBoundingClientRect();
    l = a.clientX - c.left, r = a.clientY - c.top, i = !0;
  }
  return {
    x: l,
    y: r,
    box: i
  };
}
function Ht(e, t) {
  if ("native" in e)
    return e;
  const { canvas: n, currentDevicePixelRatio: a } = t, o = ua(n), s = o.boxSizing === "border-box", i = qt(o, "padding"), l = qt(o, "border", "width"), { x: r, y: c, box: d } = qr(e, n), h = i.left + (d && l.left), p = i.top + (d && l.top);
  let { width: v, height: f } = t;
  return s && (v -= i.width + l.width, f -= i.height + l.height), {
    x: Math.round((r - h) / v * n.width / a),
    y: Math.round((c - p) / f * n.height / a)
  };
}
function Xr(e, t, n) {
  let a, o;
  if (t === void 0 || n === void 0) {
    const s = e && oo(e);
    if (!s)
      t = e.clientWidth, n = e.clientHeight;
    else {
      const i = s.getBoundingClientRect(), l = ua(s), r = qt(l, "border", "width"), c = qt(l, "padding");
      t = i.width - c.width - r.width, n = i.height - c.height - r.height, a = ia(l.maxWidth, s, "clientWidth"), o = ia(l.maxHeight, s, "clientHeight");
    }
  }
  return {
    width: t,
    height: n,
    maxWidth: a || oa,
    maxHeight: o || oa
  };
}
const Lt = (e) => Math.round(e * 10) / 10;
function Gr(e, t, n, a) {
  const o = ua(e), s = qt(o, "margin"), i = ia(o.maxWidth, e, "clientWidth") || oa, l = ia(o.maxHeight, e, "clientHeight") || oa, r = Xr(e, t, n);
  let { width: c, height: d } = r;
  if (o.boxSizing === "content-box") {
    const p = qt(o, "border", "width"), v = qt(o, "padding");
    c -= v.width + p.width, d -= v.height + p.height;
  }
  return c = Math.max(0, c - s.width), d = Math.max(0, a ? c / a : d - s.height), c = Lt(Math.min(c, i, r.maxWidth)), d = Lt(Math.min(d, l, r.maxHeight)), c && !d && (d = Lt(c / 2)), (t !== void 0 || n !== void 0) && a && r.height && d > r.height && (d = r.height, c = Lt(Math.floor(d * a))), {
    width: c,
    height: d
  };
}
function Po(e, t, n) {
  const a = t || 1, o = Lt(e.height * a), s = Lt(e.width * a);
  e.height = Lt(e.height), e.width = Lt(e.width);
  const i = e.canvas;
  return i.style && (n || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== a || i.height !== o || i.width !== s ? (e.currentDevicePixelRatio = a, i.height = o, i.width = s, e.ctx.setTransform(a, 0, 0, a, 0, 0), !0) : !1;
}
const Zr = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    ao() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function Eo(e, t) {
  const n = Yr(e, t), a = n && n.match(/^(\d+)(\.\d+)?px$/);
  return a ? +a[1] : void 0;
}
function Yt(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: e.y + n * (t.y - e.y)
  };
}
function Qr(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: a === "middle" ? n < 0.5 ? e.y : t.y : a === "after" ? n < 1 ? e.y : t.y : n > 0 ? t.y : e.y
  };
}
function Jr(e, t, n, a) {
  const o = {
    x: e.cp2x,
    y: e.cp2y
  }, s = {
    x: t.cp1x,
    y: t.cp1y
  }, i = Yt(e, o, n), l = Yt(o, s, n), r = Yt(s, t, n), c = Yt(i, l, n), d = Yt(l, r, n);
  return Yt(c, d, n);
}
const ec = function(e, t) {
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
}, tc = function() {
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
function an(e, t, n) {
  return e ? ec(t, n) : tc();
}
function di(e, t) {
  let n, a;
  (t === "ltr" || t === "rtl") && (n = e.canvas.style, a = [
    n.getPropertyValue("direction"),
    n.getPropertyPriority("direction")
  ], n.setProperty("direction", t, "important"), e.prevTextDirection = a);
}
function ui(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function hi(e) {
  return e === "angle" ? {
    between: Tn,
    compare: er,
    normalize: ut
  } : {
    between: Bt,
    compare: (t, n) => t - n,
    normalize: (t) => t
  };
}
function Io({ start: e, end: t, count: n, loop: a, style: o }) {
  return {
    start: e % n,
    end: t % n,
    loop: a && (t - e + 1) % n === 0,
    style: o
  };
}
function nc(e, t, n) {
  const { property: a, start: o, end: s } = n, { between: i, normalize: l } = hi(a), r = t.length;
  let { start: c, end: d, loop: h } = e, p, v;
  if (h) {
    for (c += r, d += r, p = 0, v = r; p < v && i(l(t[c % r][a]), o, s); ++p)
      c--, d--;
    c %= r, d %= r;
  }
  return d < c && (d += r), {
    start: c,
    end: d,
    loop: h,
    style: e.style
  };
}
function ac(e, t, n) {
  if (!n)
    return [
      e
    ];
  const { property: a, start: o, end: s } = n, i = t.length, { compare: l, between: r, normalize: c } = hi(a), { start: d, end: h, loop: p, style: v } = nc(e, t, n), f = [];
  let y = !1, x = null, m, g, _;
  const w = () => r(o, _, m) && l(o, _) !== 0, D = () => l(s, m) === 0 || r(s, _, m), S = () => y || w(), $ = () => !y || D();
  for (let M = d, F = d; M <= h; ++M)
    g = t[M % i], !g.skip && (m = c(g[a]), m !== _ && (y = r(m, o, s), x === null && S() && (x = l(m, o) === 0 ? M : F), x !== null && $() && (f.push(Io({
      start: x,
      end: M,
      loop: p,
      count: i,
      style: v
    })), x = null), F = M, _ = m));
  return x !== null && f.push(Io({
    start: x,
    end: h,
    loop: p,
    count: i,
    style: v
  })), f;
}
function oc(e, t) {
  const n = [], a = e.segments;
  for (let o = 0; o < a.length; o++) {
    const s = ac(a[o], e.points, t);
    s.length && n.push(...s);
  }
  return n;
}
function sc(e, t, n, a) {
  let o = 0, s = t - 1;
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
function ic(e, t, n, a) {
  const o = e.length, s = [];
  let i = t, l = e[t], r;
  for (r = t + 1; r <= n; ++r) {
    const c = e[r % o];
    c.skip || c.stop ? l.skip || (a = !1, s.push({
      start: t % o,
      end: (r - 1) % o,
      loop: a
    }), t = i = c.stop ? r : null) : (i = r, l.skip && (t = r)), l = c;
  }
  return i !== null && s.push({
    start: t % o,
    end: i % o,
    loop: a
  }), s;
}
function lc(e, t) {
  const n = e.points, a = e.options.spanGaps, o = n.length;
  if (!o)
    return [];
  const s = !!e._loop, { start: i, end: l } = sc(n, o, s, a);
  if (a === !0)
    return Ro(e, [
      {
        start: i,
        end: l,
        loop: s
      }
    ], n, t);
  const r = l < i ? l + o : l, c = !!e._fullLoop && i === 0 && l === o - 1;
  return Ro(e, ic(n, i, r, c), n, t);
}
function Ro(e, t, n, a) {
  return !a || !a.setContext || !n ? t : rc(e, t, n, a);
}
function rc(e, t, n, a) {
  const o = e._chart.getContext(), s = Oo(e.options), { _datasetIndex: i, options: { spanGaps: l } } = e, r = n.length, c = [];
  let d = s, h = t[0].start, p = h;
  function v(f, y, x, m) {
    const g = l ? -1 : 1;
    if (f !== y) {
      for (f += r; n[f % r].skip; )
        f -= g;
      for (; n[y % r].skip; )
        y += g;
      f % r !== y % r && (c.push({
        start: f % r,
        end: y % r,
        loop: x,
        style: m
      }), d = m, h = y % r);
    }
  }
  for (const f of t) {
    h = l ? h : f.start;
    let y = n[h % r], x;
    for (p = h + 1; p <= f.end; p++) {
      const m = n[p % r];
      x = Oo(a.setContext(Zt(o, {
        type: "segment",
        p0: y,
        p1: m,
        p0DataIndex: (p - 1) % r,
        p1DataIndex: p % r,
        datasetIndex: i
      }))), cc(x, d) && v(h, p - 1, f.loop, d), y = m, d = x;
    }
    h < p - 1 && v(h, p - 1, f.loop, d);
  }
  return c;
}
function Oo(e) {
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
function cc(e, t) {
  if (!t)
    return !1;
  const n = [], a = function(o, s) {
    return Xa(s) ? (n.includes(s) || n.push(s), n.indexOf(s)) : s;
  };
  return JSON.stringify(e, a) !== JSON.stringify(t, a);
}
function Hn(e, t, n) {
  return e.options.clip ? e[n] : t[n];
}
function dc(e, t) {
  const { xScale: n, yScale: a } = e;
  return n && a ? {
    left: Hn(n, t, "left"),
    right: Hn(n, t, "right"),
    top: Hn(a, t, "top"),
    bottom: Hn(a, t, "bottom")
  } : t;
}
function uc(e, t) {
  const n = t._clip;
  if (n.disabled)
    return !1;
  const a = dc(t, e.chartArea);
  return {
    left: n.left === !1 ? 0 : a.left - (n.left === !0 ? 0 : n.left),
    right: n.right === !1 ? e.width : a.right + (n.right === !0 ? 0 : n.right),
    top: n.top === !1 ? 0 : a.top - (n.top === !0 ? 0 : n.top),
    bottom: n.bottom === !1 ? e.height : a.bottom + (n.bottom === !0 ? 0 : n.bottom)
  };
}
class hc {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, n, a, o) {
    const s = n.listeners[o], i = n.duration;
    s.forEach((l) => l({
      chart: t,
      initial: n.initial,
      numSteps: i,
      currentStep: Math.min(a - n.start, i)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = ei.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let n = 0;
    this._charts.forEach((a, o) => {
      if (!a.running || !a.items.length)
        return;
      const s = a.items;
      let i = s.length - 1, l = !1, r;
      for (; i >= 0; --i)
        r = s[i], r._active ? (r._total > a.duration && (a.duration = r._total), r.tick(t), l = !0) : (s[i] = s[s.length - 1], s.pop());
      l && (o.draw(), this._notify(o, a, t, "progress")), s.length || (a.running = !1, this._notify(o, a, t, "complete"), a.initial = !1), n += s.length;
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
var xt = /* @__PURE__ */ new hc();
const Vo = "transparent", fc = {
  boolean(e, t, n) {
    return n > 0.5 ? t : e;
  },
  color(e, t, n) {
    const a = Do(e || Vo), o = a.valid && Do(t || Vo);
    return o && o.valid ? o.mix(a, n).hexString() : t;
  },
  number(e, t, n) {
    return e + (t - e) * n;
  }
};
class gc {
  constructor(t, n, a, o) {
    const s = n[a];
    o = jn([
      t.to,
      o,
      s,
      t.from
    ]);
    const i = jn([
      t.from,
      s,
      o
    ]);
    this._active = !0, this._fn = t.fn || fc[t.type || typeof i], this._easing = wn[t.easing] || wn.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = n, this._prop = a, this._from = i, this._to = o, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, n, a) {
    if (this._active) {
      this._notify(!1);
      const o = this._target[this._prop], s = a - this._start, i = this._duration - s;
      this._start = a, this._duration = Math.floor(Math.max(i, t.duration)), this._total += s, this._loop = !!t.loop, this._to = jn([
        t.to,
        n,
        o,
        t.from
      ]), this._from = jn([
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
    const n = t - this._start, a = this._duration, o = this._prop, s = this._from, i = this._loop, l = this._to;
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
class fi {
  constructor(t, n) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(n);
  }
  configure(t) {
    if (!we(t))
      return;
    const n = Object.keys(Re.animation), a = this._properties;
    Object.getOwnPropertyNames(t).forEach((o) => {
      const s = t[o];
      if (!we(s))
        return;
      const i = {};
      for (const l of n)
        i[l] = s[l];
      (ze(s.properties) && s.properties || [
        o
      ]).forEach((l) => {
        (l === o || !a.has(l)) && a.set(l, i);
      });
    });
  }
  _animateOptions(t, n) {
    const a = n.options, o = mc(t, a);
    if (!o)
      return [];
    const s = this._createAnimations(o, a);
    return a.$shared && pc(t.options.$animations, a).then(() => {
      t.options = a;
    }, () => {
    }), s;
  }
  _createAnimations(t, n) {
    const a = this._properties, o = [], s = t.$animations || (t.$animations = {}), i = Object.keys(n), l = Date.now();
    let r;
    for (r = i.length - 1; r >= 0; --r) {
      const c = i[r];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        o.push(...this._animateOptions(t, n));
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
        t[c] = d;
        continue;
      }
      s[c] = h = new gc(p, t, c, d), o.push(h);
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
      return xt.add(this._chart, a), !0;
  }
}
function pc(e, t) {
  const n = [], a = Object.keys(t);
  for (let o = 0; o < a.length; o++) {
    const s = e[a[o]];
    s && s.active() && n.push(s.wait());
  }
  return Promise.all(n);
}
function mc(e, t) {
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
function zo(e, t) {
  const n = e && e.options || {}, a = n.reverse, o = n.min === void 0 ? t : 0, s = n.max === void 0 ? t : 0;
  return {
    start: a ? s : o,
    end: a ? o : s
  };
}
function bc(e, t, n) {
  if (n === !1)
    return !1;
  const a = zo(e, n), o = zo(t, n);
  return {
    top: o.end,
    right: a.end,
    bottom: o.start,
    left: a.start
  };
}
function vc(e) {
  let t, n, a, o;
  return we(e) ? (t = e.top, n = e.right, a = e.bottom, o = e.left) : t = n = a = o = e, {
    top: t,
    right: n,
    bottom: a,
    left: o,
    disabled: e === !1
  };
}
function gi(e, t) {
  const n = [], a = e._getSortedDatasetMetas(t);
  let o, s;
  for (o = 0, s = a.length; o < s; ++o)
    n.push(a[o].index);
  return n;
}
function No(e, t, n, a = {}) {
  const o = e.keys, s = a.mode === "single";
  let i, l, r, c;
  if (t === null)
    return;
  let d = !1;
  for (i = 0, l = o.length; i < l; ++i) {
    if (r = +o[i], r === n) {
      if (d = !0, a.all)
        continue;
      break;
    }
    c = e.values[r], rt(c) && (s || t === 0 || bt(t) === bt(c)) && (t += c);
  }
  return !d && !a.all ? 0 : t;
}
function yc(e, t) {
  const { iScale: n, vScale: a } = t, o = n.axis === "x" ? "x" : "y", s = a.axis === "x" ? "x" : "y", i = Object.keys(e), l = new Array(i.length);
  let r, c, d;
  for (r = 0, c = i.length; r < c; ++r)
    d = i[r], l[r] = {
      [o]: d,
      [s]: e[d]
    };
  return l;
}
function ya(e, t) {
  const n = e && e.options.stacked;
  return n || n === void 0 && t.stack !== void 0;
}
function _c(e, t, n) {
  return `${e.id}.${t.id}.${n.stack || n.type}`;
}
function xc(e) {
  const { min: t, max: n, minDefined: a, maxDefined: o } = e.getUserBounds();
  return {
    min: a ? t : Number.NEGATIVE_INFINITY,
    max: o ? n : Number.POSITIVE_INFINITY
  };
}
function kc(e, t, n) {
  const a = e[t] || (e[t] = {});
  return a[n] || (a[n] = {});
}
function jo(e, t, n, a) {
  for (const o of t.getMatchingVisibleMetas(a).reverse()) {
    const s = e[o.index];
    if (n && s > 0 || !n && s < 0)
      return o.index;
  }
  return null;
}
function Wo(e, t) {
  const { chart: n, _cachedMeta: a } = e, o = n._stacks || (n._stacks = {}), { iScale: s, vScale: i, index: l } = a, r = s.axis, c = i.axis, d = _c(s, i, a), h = t.length;
  let p;
  for (let v = 0; v < h; ++v) {
    const f = t[v], { [r]: y, [c]: x } = f, m = f._stacks || (f._stacks = {});
    p = m[c] = kc(o, d, y), p[l] = x, p._top = jo(p, i, !0, a.type), p._bottom = jo(p, i, !1, a.type);
    const g = p._visualValues || (p._visualValues = {});
    g[l] = x;
  }
}
function _a(e, t) {
  const n = e.scales;
  return Object.keys(n).filter((a) => n[a].axis === t).shift();
}
function wc(e, t) {
  return Zt(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function Cc(e, t, n) {
  return Zt(e, {
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
function dn(e, t) {
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
const xa = (e) => e === "reset" || e === "none", Ho = (e, t) => t ? e : Object.assign({}, e), $c = (e, t, n) => e && !t.hidden && t._stacked && {
  keys: gi(n, !0),
  values: null
};
class ha {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, n) {
    this.chart = t, this._ctx = t.ctx, this.index = n, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = ya(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && dn(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, n = this._cachedMeta, a = this.getDataset(), o = (h, p, v, f) => h === "x" ? p : h === "r" ? f : v, s = n.xAxisID = he(a.xAxisID, _a(t, "x")), i = n.yAxisID = he(a.yAxisID, _a(t, "y")), l = n.rAxisID = he(a.rAxisID, _a(t, "r")), r = n.indexAxis, c = n.iAxisID = o(r, s, i, l), d = n.vAxisID = o(r, i, s, l);
    n.xScale = this.getScaleForId(s), n.yScale = this.getScaleForId(i), n.rScale = this.getScaleForId(l), n.iScale = this.getScaleForId(c), n.vScale = this.getScaleForId(d);
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
    this._data && $o(this._data, this), t._stacked && dn(t);
  }
  _dataCheck() {
    const t = this.getDataset(), n = t.data || (t.data = []), a = this._data;
    if (we(n)) {
      const o = this._cachedMeta;
      this._data = yc(n, o);
    } else if (a !== n) {
      if (a) {
        $o(a, this);
        const o = this._cachedMeta;
        dn(o), o._parsed = [];
      }
      n && Object.isExtensible(n) && or(n, this), this._syncList = [], this._data = n;
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
    const s = n._stacked;
    n._stacked = ya(n.vScale, n), n.stack !== a.stack && (o = !0, dn(n), n.stack = a.stack), this._resyncElements(t), (o || s !== n._stacked) && (Wo(this, n._parsed), n._stacked = ya(n.vScale, n));
  }
  configure() {
    const t = this.chart.config, n = t.datasetScopeKeys(this._type), a = t.getOptionScopes(this.getDataset(), n, !0);
    this.options = t.createResolver(a, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, n) {
    const { _cachedMeta: a, _data: o } = this, { iScale: s, _stacked: i } = a, l = s.axis;
    let r = t === 0 && n === o.length ? !0 : a._sorted, c = t > 0 && a._parsed[t - 1], d, h, p;
    if (this._parsing === !1)
      a._parsed = o, a._sorted = !0, p = o;
    else {
      ze(o[t]) ? p = this.parseArrayData(a, o, t, n) : we(o[t]) ? p = this.parseObjectData(a, o, t, n) : p = this.parsePrimitiveData(a, o, t, n);
      const v = () => h[l] === null || c && h[l] < c[l];
      for (d = 0; d < n; ++d)
        a._parsed[d + t] = h = p[d], r && (v() && (r = !1), c = h);
      a._sorted = r;
    }
    i && Wo(this, p);
  }
  parsePrimitiveData(t, n, a, o) {
    const { iScale: s, vScale: i } = t, l = s.axis, r = i.axis, c = s.getLabels(), d = s === i, h = new Array(o);
    let p, v, f;
    for (p = 0, v = o; p < v; ++p)
      f = p + a, h[p] = {
        [l]: d || s.parse(c[f], f),
        [r]: i.parse(n[f], f)
      };
    return h;
  }
  parseArrayData(t, n, a, o) {
    const { xScale: s, yScale: i } = t, l = new Array(o);
    let r, c, d, h;
    for (r = 0, c = o; r < c; ++r)
      d = r + a, h = n[d], l[r] = {
        x: s.parse(h[0], d),
        y: i.parse(h[1], d)
      };
    return l;
  }
  parseObjectData(t, n, a, o) {
    const { xScale: s, yScale: i } = t, { xAxisKey: l = "x", yAxisKey: r = "y" } = this._parsing, c = new Array(o);
    let d, h, p, v;
    for (d = 0, h = o; d < h; ++d)
      p = d + a, v = n[p], c[d] = {
        x: s.parse(Xt(v, l), p),
        y: i.parse(Xt(v, r), p)
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
    const o = this.chart, s = this._cachedMeta, i = n[t.axis], l = {
      keys: gi(o, !0),
      values: n._stacks[t.axis]._visualValues
    };
    return No(l, i, s.index, {
      mode: a
    });
  }
  updateRangeFromParsed(t, n, a, o) {
    const s = a[n.axis];
    let i = s === null ? NaN : s;
    const l = o && a._stacks[n.axis];
    o && l && (o.values = l, i = No(o, s, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, n) {
    const a = this._cachedMeta, o = a._parsed, s = a._sorted && t === a.iScale, i = o.length, l = this._getOtherScale(t), r = $c(n, a, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: d, max: h } = xc(l);
    let p, v;
    function f() {
      v = o[p];
      const y = v[l.axis];
      return !rt(v[t.axis]) || d > y || h < y;
    }
    for (p = 0; p < i && !(!f() && (this.updateRangeFromParsed(c, t, v, r), s)); ++p)
      ;
    if (s) {
      for (p = i - 1; p >= 0; --p)
        if (!f()) {
          this.updateRangeFromParsed(c, t, v, r);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const n = this._cachedMeta._parsed, a = [];
    let o, s, i;
    for (o = 0, s = n.length; o < s; ++o)
      i = n[o][t.axis], rt(i) && a.push(i);
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
    this.update(t || "default"), n._clip = vc(he(this.options.clip, bc(n.xScale, n.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, n = this.chart, a = this._cachedMeta, o = a.data || [], s = n.chartArea, i = [], l = this._drawStart || 0, r = this._drawCount || o.length - l, c = this.options.drawActiveElementsOnTop;
    let d;
    for (a.dataset && a.dataset.draw(t, s, l, r), d = l; d < l + r; ++d) {
      const h = o[d];
      h.hidden || (h.active && c ? i.push(h) : h.draw(t, s));
    }
    for (d = 0; d < i.length; ++d)
      i[d].draw(t, s);
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
      s = i.$context || (i.$context = Cc(this.getContext(), t, i)), s.parsed = this.getParsed(t), s.raw = o.data[t], s.index = s.dataIndex = t;
    } else
      s = this.$context || (this.$context = wc(this.chart.getContext(), this.index)), s.dataset = o, s.index = s.datasetIndex = this.index;
    return s.active = !!n, s.mode = a, s;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, n) {
    return this._resolveElementOptions(this.dataElementType.id, n, t);
  }
  _resolveElementOptions(t, n = "default", a) {
    const o = n === "active", s = this._cachedDataOpts, i = t + "-" + n, l = s[i], r = this.enableOptionSharing && Dn(a);
    if (l)
      return Ho(l, r);
    const c = this.chart.config, d = c.datasetElementScopeKeys(this._type, t), h = o ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], p = c.getOptionScopes(this.getDataset(), d), v = Object.keys(Re.elements[t]), f = () => this.getContext(a, o, n), y = c.resolveNamedOptions(p, v, f, h);
    return y.$shared && (y.$shared = r, s[i] = Object.freeze(Ho(y, r))), y;
  }
  _resolveAnimations(t, n, a) {
    const o = this.chart, s = this._cachedDataOpts, i = `animation-${n}`, l = s[i];
    if (l)
      return l;
    let r;
    if (o.options.animation !== !1) {
      const d = this.chart.config, h = d.datasetAnimationScopeKeys(this._type, n), p = d.getOptionScopes(this.getDataset(), h);
      r = d.createResolver(p, this.getContext(t, a, n));
    }
    const c = new fi(o, r && r.animations);
    return r && r._cacheable && (s[i] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, n) {
    return !n || xa(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, n) {
    const a = this.resolveDataElementOptions(t, n), o = this._sharedOptions, s = this.getSharedOptions(a), i = this.includeOptions(n, s) || s !== o;
    return this.updateSharedOptions(s, n, a), {
      sharedOptions: s,
      includeOptions: i
    };
  }
  updateElement(t, n, a, o) {
    xa(o) ? Object.assign(t, a) : this._resolveAnimations(n, o).update(t, a);
  }
  updateSharedOptions(t, n, a) {
    t && !xa(n) && this._resolveAnimations(void 0, n).update(t, a);
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
    for (const [l, r, c] of this._syncList)
      this[l](r, c);
    this._syncList = [];
    const o = a.length, s = n.length, i = Math.min(s, o);
    i && this.parse(0, i), s > o ? this._insertElements(o, s - o, t) : s < o && this._removeElements(s, o - s);
  }
  _insertElements(t, n, a = !0) {
    const o = this._cachedMeta, s = o.data, i = t + n;
    let l;
    const r = (c) => {
      for (c.length += n, l = c.length - 1; l >= i; l--)
        c[l] = c[l - n];
    };
    for (r(s), l = t; l < i; ++l)
      s[l] = new this.dataElementType();
    this._parsing && r(o._parsed), this.parse(t, n), a && this.updateElements(s, t, n, "reset");
  }
  updateElements(t, n, a, o) {
  }
  _removeElements(t, n) {
    const a = this._cachedMeta;
    if (this._parsing) {
      const o = a._parsed.splice(t, n);
      a._stacked && dn(a, o);
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
function Mc(e, t) {
  if (!e._cache.$bar) {
    const n = e.getMatchingVisibleMetas(t);
    let a = [];
    for (let o = 0, s = n.length; o < s; o++)
      a = a.concat(n[o].controller.getAllParsedValues(e));
    e._cache.$bar = Js(a.sort((o, s) => o - s));
  }
  return e._cache.$bar;
}
function Sc(e) {
  const t = e.iScale, n = Mc(t, e.type);
  let a = t._length, o, s, i, l;
  const r = () => {
    i === 32767 || i === -32768 || (Dn(l) && (a = Math.min(a, Math.abs(i - l) || a)), l = i);
  };
  for (o = 0, s = n.length; o < s; ++o)
    i = t.getPixelForValue(n[o]), r();
  for (l = void 0, o = 0, s = t.ticks.length; o < s; ++o)
    i = t.getPixelForTick(o), r();
  return a;
}
function Dc(e, t, n, a) {
  const o = n.barThickness;
  let s, i;
  return Me(o) ? (s = t.min * n.categoryPercentage, i = n.barPercentage) : (s = o * a, i = 1), {
    chunk: s / a,
    ratio: i,
    start: t.pixels[e] - s / 2
  };
}
function Ac(e, t, n, a) {
  const o = t.pixels, s = o[e];
  let i = e > 0 ? o[e - 1] : null, l = e < o.length - 1 ? o[e + 1] : null;
  const r = n.categoryPercentage;
  i === null && (i = s - (l === null ? t.end - t.start : l - s)), l === null && (l = s + s - i);
  const c = s - (s - Math.min(i, l)) / 2 * r;
  return {
    chunk: Math.abs(l - i) / 2 * r / a,
    ratio: n.barPercentage,
    start: c
  };
}
function Tc(e, t, n, a) {
  const o = n.parse(e[0], a), s = n.parse(e[1], a), i = Math.min(o, s), l = Math.max(o, s);
  let r = i, c = l;
  Math.abs(i) > Math.abs(l) && (r = l, c = i), t[n.axis] = c, t._custom = {
    barStart: r,
    barEnd: c,
    start: o,
    end: s,
    min: i,
    max: l
  };
}
function pi(e, t, n, a) {
  return ze(e) ? Tc(e, t, n, a) : t[n.axis] = n.parse(e, a), t;
}
function Yo(e, t, n, a) {
  const o = e.iScale, s = e.vScale, i = o.getLabels(), l = o === s, r = [];
  let c, d, h, p;
  for (c = n, d = n + a; c < d; ++c)
    p = t[c], h = {}, h[o.axis] = l || o.parse(i[c], c), r.push(pi(p, h, s, c));
  return r;
}
function ka(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function Bc(e, t, n) {
  return e !== 0 ? bt(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= n ? 1 : -1);
}
function Lc(e) {
  let t, n, a, o, s;
  return e.horizontal ? (t = e.base > e.x, n = "left", a = "right") : (t = e.base < e.y, n = "bottom", a = "top"), t ? (o = "end", s = "start") : (o = "start", s = "end"), {
    start: n,
    end: a,
    reverse: t,
    top: o,
    bottom: s
  };
}
function Fc(e, t, n, a) {
  let o = t.borderSkipped;
  const s = {};
  if (!o) {
    e.borderSkipped = s;
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
  const { start: i, end: l, reverse: r, top: c, bottom: d } = Lc(e);
  o === "middle" && n && (e.enableBorderRadius = !0, (n._top || 0) === a ? o = c : (n._bottom || 0) === a ? o = d : (s[Ko(d, i, l, r)] = !0, o = c)), s[Ko(o, i, l, r)] = !0, e.borderSkipped = s;
}
function Ko(e, t, n, a) {
  return a ? (e = Pc(e, t, n), e = Uo(e, n, t)) : e = Uo(e, t, n), e;
}
function Pc(e, t, n) {
  return e === t ? n : e === n ? t : e;
}
function Uo(e, t, n) {
  return e === "start" ? t : e === "end" ? n : e;
}
function Ec(e, { inflateAmount: t }, n) {
  e.inflateAmount = t === "auto" ? n === 1 ? 0.33 : 0 : t;
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
  parsePrimitiveData(t, n, a, o) {
    return Yo(t, n, a, o);
  }
  parseArrayData(t, n, a, o) {
    return Yo(t, n, a, o);
  }
  parseObjectData(t, n, a, o) {
    const { iScale: s, vScale: i } = t, { xAxisKey: l = "x", yAxisKey: r = "y" } = this._parsing, c = s.axis === "x" ? l : r, d = i.axis === "x" ? l : r, h = [];
    let p, v, f, y;
    for (p = a, v = a + o; p < v; ++p)
      y = n[p], f = {}, f[s.axis] = s.parse(Xt(y, c), p), h.push(pi(Xt(y, d), f, i, p));
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
    const n = this._cachedMeta, { iScale: a, vScale: o } = n, s = this.getParsed(t), i = s._custom, l = ka(i) ? "[" + i.start + ", " + i.end + "]" : "" + o.getLabelForValue(s[o.axis]);
    return {
      label: "" + a.getLabelForValue(s[a.axis]),
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
  updateElements(t, n, a, o) {
    const s = o === "reset", { index: i, _cachedMeta: { vScale: l } } = this, r = l.getBasePixel(), c = l.isHorizontal(), d = this._getRuler(), { sharedOptions: h, includeOptions: p } = this._getSharedOptions(n, o);
    for (let v = n; v < n + a; v++) {
      const f = this.getParsed(v), y = s || Me(f[l.axis]) ? {
        base: r,
        head: r
      } : this._calculateBarValuePixels(v), x = this._calculateBarIndexPixels(v, d), m = (f._stacks || {})[l.axis], g = {
        horizontal: c,
        base: y.base,
        enableBorderRadius: !m || ka(f._custom) || i === m._top || i === m._bottom,
        x: c ? y.head : x.center,
        y: c ? x.center : y.head,
        height: c ? x.size : Math.abs(y.size),
        width: c ? Math.abs(y.size) : x.size
      };
      p && (g.options = h || this.resolveDataElementOptions(v, t[v].active ? "active" : o));
      const _ = g.options || t[v].options;
      Fc(g, _, m, i), Ec(g, _, d.ratio), this.updateElement(t[v], v, g, o);
    }
  }
  _getStacks(t, n) {
    const { iScale: a } = this._cachedMeta, o = a.getMatchingVisibleMetas(this._type).filter((d) => d.controller.options.grouped), s = a.options.stacked, i = [], l = this._cachedMeta.controller.getParsed(n), r = l && l[a.axis], c = (d) => {
      const h = d._parsed.find((v) => v[a.axis] === r), p = h && h[d.vScale.axis];
      if (Me(p) || isNaN(p))
        return !0;
    };
    for (const d of o)
      if (!(n !== void 0 && c(d)) && ((s === !1 || i.indexOf(d.stack) === -1 || s === void 0 && d.stack === void 0) && i.push(d.stack), d.index === t))
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
      t[he(this.chart.options.indexAxis === "x" ? a.xAxisID : a.yAxisID, n)] = !0;
    return Object.keys(t);
  }
  _getStackIndex(t, n, a) {
    const o = this._getStacks(t, a), s = n !== void 0 ? o.indexOf(n) : -1;
    return s === -1 ? o.length - 1 : s;
  }
  _getRuler() {
    const t = this.options, n = this._cachedMeta, a = n.iScale, o = [];
    let s, i;
    for (s = 0, i = n.data.length; s < i; ++s)
      o.push(a.getPixelForValue(this.getParsed(s)[a.axis], s));
    const l = t.barThickness;
    return {
      min: l || Sc(n),
      pixels: o,
      start: a._startPixel,
      end: a._endPixel,
      stackCount: this._getStackCount(),
      scale: a,
      grouped: t.grouped,
      ratio: l ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: n, _stacked: a, index: o }, options: { base: s, minBarLength: i } } = this, l = s || 0, r = this.getParsed(t), c = r._custom, d = ka(c);
    let h = r[n.axis], p = 0, v = a ? this.applyStack(n, r, a) : h, f, y;
    v !== h && (p = v - h, v = h), d && (h = c.barStart, v = c.barEnd - c.barStart, h !== 0 && bt(h) !== bt(c.barEnd) && (p = 0), p += h);
    const x = !Me(s) && !d ? s : p;
    let m = n.getPixelForValue(x);
    if (this.chart.getDataVisibility(t) ? f = n.getPixelForValue(p + v) : f = m, y = f - m, Math.abs(y) < i) {
      y = Bc(y, n, l) * i, h === l && (m -= y / 2);
      const g = n.getPixelForDecimal(0), _ = n.getPixelForDecimal(1), w = Math.min(g, _), D = Math.max(g, _);
      m = Math.max(Math.min(m, D), w), f = m + y, a && !d && (r._stacks[n.axis]._visualValues[o] = n.getValueForPixel(f) - n.getValueForPixel(m));
    }
    if (m === n.getPixelForValue(l)) {
      const g = bt(y) * n.getLineWidthForValue(l) / 2;
      m += g, y -= g;
    }
    return {
      size: y,
      base: m,
      head: f,
      center: f + y / 2
    };
  }
  _calculateBarIndexPixels(t, n) {
    const a = n.scale, o = this.options, s = o.skipNull, i = he(o.maxBarThickness, 1 / 0);
    let l, r;
    const c = this._getAxisCount();
    if (n.grouped) {
      const d = s ? this._getStackCount(t) : n.stackCount, h = o.barThickness === "flex" ? Ac(t, n, o, d * c) : Dc(t, n, o, d * c), p = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, v = this._getAxis().indexOf(he(p, this.getFirstScaleIdForIndexAxis())), f = this._getStackIndex(this.index, this._cachedMeta.stack, s ? t : void 0) + v;
      l = h.start + h.chunk * f + h.chunk / 2, r = Math.min(i, h.chunk * h.ratio);
    } else
      l = a.getPixelForValue(this.getParsed(t)[a.axis], t), r = Math.min(i, n.min * n.ratio);
    return {
      base: l - r / 2,
      head: l + r / 2,
      center: l,
      size: r
    };
  }
  draw() {
    const t = this._cachedMeta, n = t.vScale, a = t.data, o = a.length;
    let s = 0;
    for (; s < o; ++s)
      this.getParsed(s)[n.axis] !== null && !a[s].hidden && a[s].draw(this._ctx);
  }
}
function Rc(e, t, n) {
  let a = 1, o = 1, s = 0, i = 0;
  if (t < Ee) {
    const l = e, r = l + t, c = Math.cos(l), d = Math.sin(l), h = Math.cos(r), p = Math.sin(r), v = (_, w, D) => Tn(_, l, r, !0) ? 1 : Math.max(w, w * n, D, D * n), f = (_, w, D) => Tn(_, l, r, !0) ? -1 : Math.min(w, w * n, D, D * n), y = v(0, c, h), x = v(Ne, d, p), m = f(De, c, h), g = f(De + Ne, d, p);
    a = (y - m) / 2, o = (x - g) / 2, s = -(y + m) / 2, i = -(x + g) / 2;
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
    _scriptable: (t) => t !== "spacing",
    _indexable: (t) => t !== "spacing" && !t.startsWith("borderDash") && !t.startsWith("hoverBorderDash")
  };
  static overrides = {
    aspectRatio: 1,
    plugins: {
      legend: {
        labels: {
          generateLabels(t) {
            const n = t.data, { labels: { pointStyle: a, textAlign: o, color: s, useBorderRadius: i, borderRadius: l } } = t.legend.options;
            return n.labels.length && n.datasets.length ? n.labels.map((r, c) => {
              const h = t.getDatasetMeta(0).controller.getStyle(c);
              return {
                text: r,
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
      let s = (r) => +a[r];
      if (we(a[t])) {
        const { key: r = "value" } = this._parsing;
        s = (c) => +Xt(a[c], r);
      }
      let i, l;
      for (i = t, l = t + n; i < l; ++i)
        o._parsed[i] = s(i);
    }
  }
  _getRotation() {
    return Ct(this.options.rotation - 90);
  }
  _getCircumference() {
    return Ct(this.options.circumference);
  }
  _getRotationExtents() {
    let t = Ee, n = -Ee;
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
    const n = this.chart, { chartArea: a } = n, o = this._cachedMeta, s = o.data, i = this.getMaxBorderWidth() + this.getMaxOffset(s) + this.options.spacing, l = Math.max((Math.min(a.width, a.height) - i) / 2, 0), r = Math.min(Nl(this.options.cutout, l), 1), c = this._getRingWeight(this.index), { circumference: d, rotation: h } = this._getRotationExtents(), { ratioX: p, ratioY: v, offsetX: f, offsetY: y } = Rc(h, d, r), x = (a.width - i) / p, m = (a.height - i) / v, g = Math.max(Math.min(x, m) / 2, 0), _ = qs(this.options.radius, g), w = Math.max(_ * r, 0), D = (_ - w) / this._getVisibleDatasetWeightTotal();
    this.offsetX = f * _, this.offsetY = y * _, o.total = this.calculateTotal(), this.outerRadius = _ - D * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - D * c, 0), this.updateElements(s, 0, s.length, t);
  }
  _circumference(t, n) {
    const a = this.options, o = this._cachedMeta, s = this._getCircumference();
    return n && a.animation.animateRotate || !this.chart.getDataVisibility(t) || o._parsed[t] === null || o.data[t].hidden ? 0 : this.calculateCircumference(o._parsed[t] * s / Ee);
  }
  updateElements(t, n, a, o) {
    const s = o === "reset", i = this.chart, l = i.chartArea, c = i.options.animation, d = (l.left + l.right) / 2, h = (l.top + l.bottom) / 2, p = s && c.animateScale, v = p ? 0 : this.innerRadius, f = p ? 0 : this.outerRadius, { sharedOptions: y, includeOptions: x } = this._getSharedOptions(n, o);
    let m = this._getRotation(), g;
    for (g = 0; g < n; ++g)
      m += this._circumference(g, s);
    for (g = n; g < n + a; ++g) {
      const _ = this._circumference(g, s), w = t[g], D = {
        x: d + this.offsetX,
        y: h + this.offsetY,
        startAngle: m,
        endAngle: m + _,
        circumference: _,
        outerRadius: f,
        innerRadius: v
      };
      x && (D.options = y || this.resolveDataElementOptions(g, w.active ? "active" : o)), m += _, this.updateElement(w, g, D, o);
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
    return n > 0 && !isNaN(t) ? Ee * (Math.abs(t) / n) : 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, a = this.chart, o = a.data.labels || [], s = Ga(n._parsed[t], a.options.locale);
    return {
      label: o[t] || "",
      value: s
    };
  }
  getMaxBorderWidth(t) {
    let n = 0;
    const a = this.chart;
    let o, s, i, l, r;
    if (!t) {
      for (o = 0, s = a.data.datasets.length; o < s; ++o)
        if (a.isDatasetVisible(o)) {
          i = a.getDatasetMeta(o), t = i.data, l = i.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (o = 0, s = t.length; o < s; ++o)
      r = l.resolveDataElementOptions(o), r.borderAlign !== "inner" && (n = Math.max(n, r.borderWidth || 0, r.hoverBorderWidth || 0));
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
    return Math.max(he(this.chart.data.datasets[t].weight, 1), 0);
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
  update(t) {
    const n = this._cachedMeta, { dataset: a, data: o = [], _dataset: s } = n, i = this.chart._animationsDisabled;
    let { start: l, count: r } = lr(n, o, i);
    this._drawStart = l, this._drawCount = r, rr(n) && (l = 0, r = o.length), a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!s._decimated, a.points = o;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(a, void 0, {
      animated: !i,
      options: c
    }, t), this.updateElements(o, l, r, t);
  }
  updateElements(t, n, a, o) {
    const s = o === "reset", { iScale: i, vScale: l, _stacked: r, _dataset: c } = this._cachedMeta, { sharedOptions: d, includeOptions: h } = this._getSharedOptions(n, o), p = i.axis, v = l.axis, { spanGaps: f, segment: y } = this.options, x = An(f) ? f : Number.POSITIVE_INFINITY, m = this.chart._animationsDisabled || s || o === "none", g = n + a, _ = t.length;
    let w = n > 0 && this.getParsed(n - 1);
    for (let D = 0; D < _; ++D) {
      const S = t[D], $ = m ? S : {};
      if (D < n || D >= g) {
        $.skip = !0;
        continue;
      }
      const M = this.getParsed(D), F = Me(M[v]), T = $[p] = i.getPixelForValue(M[p], D), B = $[v] = s || F ? l.getBasePixel() : l.getPixelForValue(r ? this.applyStack(l, M, r) : M[v], D);
      $.skip = isNaN(T) || isNaN(B) || F, $.stop = D > 0 && Math.abs(M[p] - w[p]) > x, y && ($.parsed = M, $.raw = c.data[D]), h && ($.options = d || this.resolveDataElementOptions(D, S.active ? "active" : o)), m || this.updateElement(S, D, $, o), w = M;
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
class zc extends Oc {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function Wt() {
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
  static override(t) {
    Object.assign(so.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return Wt();
  }
  parse() {
    return Wt();
  }
  format() {
    return Wt();
  }
  add() {
    return Wt();
  }
  diff() {
    return Wt();
  }
  startOf() {
    return Wt();
  }
  endOf() {
    return Wt();
  }
}
var Nc = {
  _date: so
};
function jc(e, t, n, a) {
  const { controller: o, data: s, _sorted: i } = e, l = o._cachedMeta.iScale, r = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (l && t === l.axis && t !== "r" && i && s.length) {
    const c = l._reversePixels ? nr : Kt;
    if (a) {
      if (o._sharedOptions) {
        const d = s[0], h = typeof d.getRange == "function" && d.getRange(t);
        if (h) {
          const p = c(s, t, n - h), v = c(s, t, n + h);
          return {
            lo: p.lo,
            hi: v.hi
          };
        }
      }
    } else {
      const d = c(s, t, n);
      if (r) {
        const { vScale: h } = o._cachedMeta, { _parsed: p } = e, v = p.slice(0, d.lo + 1).reverse().findIndex((y) => !Me(y[h.axis]));
        d.lo -= Math.max(0, v);
        const f = p.slice(d.hi).findIndex((y) => !Me(y[h.axis]));
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
function fa(e, t, n, a, o) {
  const s = e.getSortedVisibleDatasetMetas(), i = n[t];
  for (let l = 0, r = s.length; l < r; ++l) {
    const { index: c, data: d } = s[l], { lo: h, hi: p } = jc(s[l], t, i, o);
    for (let v = h; v <= p; ++v) {
      const f = d[v];
      f.skip || a(f, c, v);
    }
  }
}
function Wc(e) {
  const t = e.indexOf("x") !== -1, n = e.indexOf("y") !== -1;
  return function(a, o) {
    const s = t ? Math.abs(a.x - o.x) : 0, i = n ? Math.abs(a.y - o.y) : 0;
    return Math.sqrt(Math.pow(s, 2) + Math.pow(i, 2));
  };
}
function wa(e, t, n, a, o) {
  const s = [];
  return !o && !e.isPointInArea(t) || fa(e, n, t, function(l, r, c) {
    !o && !Bn(l, e.chartArea, 0) || l.inRange(t.x, t.y, a) && s.push({
      element: l,
      datasetIndex: r,
      index: c
    });
  }, !0), s;
}
function Hc(e, t, n, a) {
  let o = [];
  function s(i, l, r) {
    const { startAngle: c, endAngle: d } = i.getProps([
      "startAngle",
      "endAngle"
    ], a), { angle: h } = Zs(i, {
      x: t.x,
      y: t.y
    });
    Tn(h, c, d) && o.push({
      element: i,
      datasetIndex: l,
      index: r
    });
  }
  return fa(e, n, t, s), o;
}
function Yc(e, t, n, a, o, s) {
  let i = [];
  const l = Wc(n);
  let r = Number.POSITIVE_INFINITY;
  function c(d, h, p) {
    const v = d.inRange(t.x, t.y, o);
    if (a && !v)
      return;
    const f = d.getCenterPoint(o);
    if (!(!!s || e.isPointInArea(f)) && !v)
      return;
    const x = l(t, f);
    x < r ? (i = [
      {
        element: d,
        datasetIndex: h,
        index: p
      }
    ], r = x) : x === r && i.push({
      element: d,
      datasetIndex: h,
      index: p
    });
  }
  return fa(e, n, t, c), i;
}
function Ca(e, t, n, a, o, s) {
  return !s && !e.isPointInArea(t) ? [] : n === "r" && !a ? Hc(e, t, n, o) : Yc(e, t, n, a, o, s);
}
function qo(e, t, n, a, o) {
  const s = [], i = n === "x" ? "inXRange" : "inYRange";
  let l = !1;
  return fa(e, n, t, (r, c, d) => {
    r[i] && r[i](t[n], o) && (s.push({
      element: r,
      datasetIndex: c,
      index: d
    }), l = l || r.inRange(t.x, t.y, o));
  }), a && !l ? [] : s;
}
var Kc = {
  modes: {
    index(e, t, n, a) {
      const o = Ht(t, e), s = n.axis || "x", i = n.includeInvisible || !1, l = n.intersect ? wa(e, o, s, a, i) : Ca(e, o, s, !1, a, i), r = [];
      return l.length ? (e.getSortedVisibleDatasetMetas().forEach((c) => {
        const d = l[0].index, h = c.data[d];
        h && !h.skip && r.push({
          element: h,
          datasetIndex: c.index,
          index: d
        });
      }), r) : [];
    },
    dataset(e, t, n, a) {
      const o = Ht(t, e), s = n.axis || "xy", i = n.includeInvisible || !1;
      let l = n.intersect ? wa(e, o, s, a, i) : Ca(e, o, s, !1, a, i);
      if (l.length > 0) {
        const r = l[0].datasetIndex, c = e.getDatasetMeta(r).data;
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
    point(e, t, n, a) {
      const o = Ht(t, e), s = n.axis || "xy", i = n.includeInvisible || !1;
      return wa(e, o, s, a, i);
    },
    nearest(e, t, n, a) {
      const o = Ht(t, e), s = n.axis || "xy", i = n.includeInvisible || !1;
      return Ca(e, o, s, n.intersect, a, i);
    },
    x(e, t, n, a) {
      const o = Ht(t, e);
      return qo(e, o, "x", n.intersect, a);
    },
    y(e, t, n, a) {
      const o = Ht(t, e);
      return qo(e, o, "y", n.intersect, a);
    }
  }
};
const mi = [
  "left",
  "top",
  "right",
  "bottom"
];
function un(e, t) {
  return e.filter((n) => n.pos === t);
}
function Xo(e, t) {
  return e.filter((n) => mi.indexOf(n.pos) === -1 && n.box.axis === t);
}
function hn(e, t) {
  return e.sort((n, a) => {
    const o = t ? a : n, s = t ? n : a;
    return o.weight === s.weight ? o.index - s.index : o.weight - s.weight;
  });
}
function Uc(e) {
  const t = [];
  let n, a, o, s, i, l;
  for (n = 0, a = (e || []).length; n < a; ++n)
    o = e[n], { position: s, options: { stack: i, stackWeight: l = 1 } } = o, t.push({
      index: n,
      box: o,
      pos: s,
      horizontal: o.isHorizontal(),
      weight: o.weight,
      stack: i && s + i,
      stackWeight: l
    });
  return t;
}
function qc(e) {
  const t = {};
  for (const n of e) {
    const { stack: a, pos: o, stackWeight: s } = n;
    if (!a || !mi.includes(o))
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
function Xc(e, t) {
  const n = qc(e), { vBoxMaxWidth: a, hBoxMaxHeight: o } = t;
  let s, i, l;
  for (s = 0, i = e.length; s < i; ++s) {
    l = e[s];
    const { fullSize: r } = l.box, c = n[l.stack], d = c && l.stackWeight / c.weight;
    l.horizontal ? (l.width = d ? d * a : r && t.availableWidth, l.height = o) : (l.width = a, l.height = d ? d * o : r && t.availableHeight);
  }
  return n;
}
function Gc(e) {
  const t = Uc(e), n = hn(t.filter((c) => c.box.fullSize), !0), a = hn(un(t, "left"), !0), o = hn(un(t, "right")), s = hn(un(t, "top"), !0), i = hn(un(t, "bottom")), l = Xo(t, "x"), r = Xo(t, "y");
  return {
    fullSize: n,
    leftAndTop: a.concat(s),
    rightAndBottom: o.concat(r).concat(i).concat(l),
    chartArea: un(t, "chartArea"),
    vertical: a.concat(o).concat(r),
    horizontal: s.concat(i).concat(l)
  };
}
function Go(e, t, n, a) {
  return Math.max(e[n], t[n]) + Math.max(e[a], t[a]);
}
function bi(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Zc(e, t, n, a) {
  const { pos: o, box: s } = n, i = e.maxPadding;
  if (!we(o)) {
    n.size && (e[o] -= n.size);
    const h = a[n.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, n.horizontal ? s.height : s.width), n.size = h.size / h.count, e[o] += n.size;
  }
  s.getPadding && bi(i, s.getPadding());
  const l = Math.max(0, t.outerWidth - Go(i, e, "left", "right")), r = Math.max(0, t.outerHeight - Go(i, e, "top", "bottom")), c = l !== e.w, d = r !== e.h;
  return e.w = l, e.h = r, n.horizontal ? {
    same: c,
    other: d
  } : {
    same: d,
    other: c
  };
}
function Qc(e) {
  const t = e.maxPadding;
  function n(a) {
    const o = Math.max(t[a] - e[a], 0);
    return e[a] += o, o;
  }
  e.y += n("top"), e.x += n("left"), n("right"), n("bottom");
}
function Jc(e, t) {
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
function yn(e, t, n, a) {
  const o = [];
  let s, i, l, r, c, d;
  for (s = 0, i = e.length, c = 0; s < i; ++s) {
    l = e[s], r = l.box, r.update(l.width || t.w, l.height || t.h, Jc(l.horizontal, t));
    const { same: h, other: p } = Zc(t, n, l, a);
    c |= h && o.length, d = d || p, r.fullSize || o.push(l);
  }
  return c && yn(o, t, n, a) || d;
}
function Yn(e, t, n, a, o) {
  e.top = n, e.left = t, e.right = t + a, e.bottom = n + o, e.width = a, e.height = o;
}
function Zo(e, t, n, a) {
  const o = n.padding;
  let { x: s, y: i } = t;
  for (const l of e) {
    const r = l.box, c = a[l.stack] || {
      placed: 0,
      weight: 1
    }, d = l.stackWeight / c.weight || 1;
    if (l.horizontal) {
      const h = t.w * d, p = c.size || r.height;
      Dn(c.start) && (i = c.start), r.fullSize ? Yn(r, o.left, i, n.outerWidth - o.right - o.left, p) : Yn(r, t.left + c.placed, i, h, p), c.start = i, c.placed += h, i = r.bottom;
    } else {
      const h = t.h * d, p = c.size || r.width;
      Dn(c.start) && (s = c.start), r.fullSize ? Yn(r, s, o.top, p, n.outerHeight - o.bottom - o.top) : Yn(r, s, t.top + c.placed, p, h), c.start = s, c.placed += h, s = r.right;
    }
  }
  t.x = s, t.y = i;
}
var lt = {
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
    const o = ct(e.options.layout.padding), s = Math.max(t - o.width, 0), i = Math.max(n - o.height, 0), l = Gc(e.boxes), r = l.vertical, c = l.horizontal;
    Se(e.boxes, (y) => {
      typeof y.beforeLayout == "function" && y.beforeLayout();
    });
    const d = r.reduce((y, x) => x.box.options && x.box.options.display === !1 ? y : y + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: n,
      padding: o,
      availableWidth: s,
      availableHeight: i,
      vBoxMaxWidth: s / 2 / d,
      hBoxMaxHeight: i / 2
    }), p = Object.assign({}, o);
    bi(p, ct(a));
    const v = Object.assign({
      maxPadding: p,
      w: s,
      h: i,
      x: o.left,
      y: o.top
    }, o), f = Xc(r.concat(c), h);
    yn(l.fullSize, v, h, f), yn(r, v, h, f), yn(c, v, h, f) && yn(r, v, h, f), Qc(v), Zo(l.leftAndTop, v, h, f), v.x += v.w, v.y += v.h, Zo(l.rightAndBottom, v, h, f), e.chartArea = {
      left: v.left,
      top: v.top,
      right: v.left + v.w,
      bottom: v.top + v.h,
      height: v.h,
      width: v.w
    }, Se(l.chartArea, (y) => {
      const x = y.box;
      Object.assign(x, e.chartArea), x.update(v.w, v.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class vi {
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
class ed extends vi {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const Jn = "$chartjs", td = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Qo = (e) => e === null || e === "";
function nd(e, t) {
  const n = e.style, a = e.getAttribute("height"), o = e.getAttribute("width");
  if (e[Jn] = {
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
    const s = Eo(e, "width");
    s !== void 0 && (e.width = s);
  }
  if (Qo(a))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const s = Eo(e, "height");
      s !== void 0 && (e.height = s);
    }
  return e;
}
const yi = Zr ? {
  passive: !0
} : !1;
function ad(e, t, n) {
  e && e.addEventListener(t, n, yi);
}
function od(e, t, n) {
  e && e.canvas && e.canvas.removeEventListener(t, n, yi);
}
function sd(e, t) {
  const n = td[e.type] || e.type, { x: a, y: o } = Ht(e, t);
  return {
    type: n,
    chart: t,
    native: e,
    x: a !== void 0 ? a : null,
    y: o !== void 0 ? o : null
  };
}
function la(e, t) {
  for (const n of e)
    if (n === t || n.contains(t))
      return !0;
}
function id(e, t, n) {
  const a = e.canvas, o = new MutationObserver((s) => {
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
function ld(e, t, n) {
  const a = e.canvas, o = new MutationObserver((s) => {
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
function _i() {
  const e = window.devicePixelRatio;
  e !== Jo && (Jo = e, Fn.forEach((t, n) => {
    n.currentDevicePixelRatio !== e && t();
  }));
}
function rd(e, t) {
  Fn.size || window.addEventListener("resize", _i), Fn.set(e, t);
}
function cd(e) {
  Fn.delete(e), Fn.size || window.removeEventListener("resize", _i);
}
function dd(e, t, n) {
  const a = e.canvas, o = a && oo(a);
  if (!o)
    return;
  const s = ti((l, r) => {
    const c = o.clientWidth;
    n(l, r), c < o.clientWidth && n();
  }, window), i = new ResizeObserver((l) => {
    const r = l[0], c = r.contentRect.width, d = r.contentRect.height;
    c === 0 && d === 0 || s(c, d);
  });
  return i.observe(o), rd(e, s), i;
}
function $a(e, t, n) {
  n && n.disconnect(), t === "resize" && cd(e);
}
function ud(e, t, n) {
  const a = e.canvas, o = ti((s) => {
    e.ctx !== null && n(sd(s, e));
  }, e);
  return ad(a, t, o), o;
}
class hd extends vi {
  acquireContext(t, n) {
    const a = t && t.getContext && t.getContext("2d");
    return a && a.canvas === t ? (nd(t, n), a) : null;
  }
  releaseContext(t) {
    const n = t.canvas;
    if (!n[Jn])
      return !1;
    const a = n[Jn].initial;
    [
      "height",
      "width"
    ].forEach((s) => {
      const i = a[s];
      Me(i) ? n.removeAttribute(s) : n.setAttribute(s, i);
    });
    const o = a.style || {};
    return Object.keys(o).forEach((s) => {
      n.style[s] = o[s];
    }), n.width = n.width, delete n[Jn], !0;
  }
  addEventListener(t, n, a) {
    this.removeEventListener(t, n);
    const o = t.$proxies || (t.$proxies = {}), i = {
      attach: id,
      detach: ld,
      resize: dd
    }[n] || ud;
    o[n] = i(t, n, a);
  }
  removeEventListener(t, n) {
    const a = t.$proxies || (t.$proxies = {}), o = a[n];
    if (!o)
      return;
    ({
      attach: $a,
      detach: $a,
      resize: $a
    }[n] || od)(t, n, o), a[n] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, n, a, o) {
    return Gr(t, n, a, o);
  }
  isAttached(t) {
    const n = t && oo(t);
    return !!(n && n.isConnected);
  }
}
function fd(e) {
  return !ao() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? ed : hd;
}
let Mt = class {
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
    return An(this.x) && An(this.y);
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
function gd(e, t) {
  const n = e.options.ticks, a = pd(e), o = Math.min(n.maxTicksLimit || a, a), s = n.major.enabled ? bd(t) : [], i = s.length, l = s[0], r = s[i - 1], c = [];
  if (i > o)
    return vd(t, c, s, i / o), c;
  const d = md(s, t, o);
  if (i > 0) {
    let h, p;
    const v = i > 1 ? Math.round((r - l) / (i - 1)) : null;
    for (Kn(t, c, d, Me(v) ? 0 : l - v, l), h = 0, p = i - 1; h < p; h++)
      Kn(t, c, d, s[h], s[h + 1]);
    return Kn(t, c, d, r, Me(v) ? t.length : r + v), c;
  }
  return Kn(t, c, d), c;
}
function pd(e) {
  const t = e.options.offset, n = e._tickSize(), a = e._length / n + (t ? 0 : 1), o = e._maxLength / n;
  return Math.floor(Math.min(a, o));
}
function md(e, t, n) {
  const a = yd(e), o = t.length / n;
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
function bd(e) {
  const t = [];
  let n, a;
  for (n = 0, a = e.length; n < a; n++)
    e[n].major && t.push(n);
  return t;
}
function vd(e, t, n, a) {
  let o = 0, s = n[0], i;
  for (a = Math.ceil(a), i = 0; i < e.length; i++)
    i === s && (t.push(e[i]), o++, s = n[o * a]);
}
function Kn(e, t, n, a, o) {
  const s = he(a, 0), i = Math.min(he(o, e.length), e.length);
  let l = 0, r, c, d;
  for (n = Math.ceil(n), o && (r = o - a, n = r / Math.floor(r / n)), d = s; d < 0; )
    l++, d = Math.round(s + l * n);
  for (c = Math.max(s, 0); c < i; c++)
    c === d && (t.push(e[c]), l++, d = Math.round(s + l * n));
}
function yd(e) {
  const t = e.length;
  let n, a;
  if (t < 2)
    return !1;
  for (a = e[0], n = 1; n < t; ++n)
    if (e[n] - e[n - 1] !== a)
      return !1;
  return a;
}
const _d = (e) => e === "left" ? "right" : e === "right" ? "left" : e, es = (e, t, n) => t === "top" || t === "left" ? e[t] + n : e[t] - n, ts = (e, t) => Math.min(t || e, e);
function ns(e, t) {
  const n = [], a = e.length / t, o = e.length;
  let s = 0;
  for (; s < o; s += a)
    n.push(e[Math.floor(s)]);
  return n;
}
function xd(e, t, n) {
  const a = e.ticks.length, o = Math.min(t, a - 1), s = e._startPixel, i = e._endPixel, l = 1e-6;
  let r = e.getPixelForTick(o), c;
  if (!(n && (a === 1 ? c = Math.max(r - s, i - r) : t === 0 ? c = (e.getPixelForTick(1) - r) / 2 : c = (r - e.getPixelForTick(o - 1)) / 2, r += o < t ? c : -c, r < s - l || r > i + l)))
    return r;
}
function kd(e, t) {
  Se(e, (n) => {
    const a = n.gc, o = a.length / 2;
    let s;
    if (o > t) {
      for (s = 0; s < o; ++s)
        delete n.data[a[s]];
      a.splice(0, o);
    }
  });
}
function fn(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function as(e, t) {
  if (!e.display)
    return 0;
  const n = qe(e.font, t), a = ct(e.padding);
  return (ze(e.text) ? e.text.length : 1) * n.lineHeight + a.height;
}
function wd(e, t) {
  return Zt(e, {
    scale: t,
    type: "scale"
  });
}
function Cd(e, t, n) {
  return Zt(e, {
    tick: n,
    index: t,
    type: "tick"
  });
}
function $d(e, t, n) {
  let a = qa(e);
  return (n && t !== "right" || !n && t === "right") && (a = _d(a)), a;
}
function Md(e, t, n, a) {
  const { top: o, left: s, bottom: i, right: l, chart: r } = e, { chartArea: c, scales: d } = r;
  let h = 0, p, v, f;
  const y = i - o, x = l - s;
  if (e.isHorizontal()) {
    if (v = Ye(a, s, l), we(n)) {
      const m = Object.keys(n)[0], g = n[m];
      f = d[m].getPixelForValue(g) + y - t;
    } else n === "center" ? f = (c.bottom + c.top) / 2 + y - t : f = es(e, n, t);
    p = l - s;
  } else {
    if (we(n)) {
      const m = Object.keys(n)[0], g = n[m];
      v = d[m].getPixelForValue(g) - x + t;
    } else n === "center" ? v = (c.left + c.right) / 2 - x + t : v = es(e, n, t);
    f = Ye(a, i, o), h = n === "left" ? -Ne : Ne;
  }
  return {
    titleX: v,
    titleY: f,
    maxWidth: p,
    rotation: h
  };
}
class cn extends Mt {
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
    return t = gt(t, Number.POSITIVE_INFINITY), n = gt(n, Number.NEGATIVE_INFINITY), a = gt(a, Number.POSITIVE_INFINITY), o = gt(o, Number.NEGATIVE_INFINITY), {
      min: gt(t, a),
      max: gt(n, o),
      minDefined: rt(t),
      maxDefined: rt(n)
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
    for (let r = 0, c = l.length; r < c; ++r)
      i = l[r].controller.getMinMax(this, t), o || (n = Math.min(n, i.min)), s || (a = Math.max(a, i.max));
    return n = s && n > a ? a : n, a = o && n > a ? n : a, {
      min: gt(n, gt(a, n)),
      max: gt(a, gt(n, a))
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
    Be(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, n, a) {
    const { beginAtZero: o, grace: s, ticks: i } = this.options, l = i.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = n, this._margins = a = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, a), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + a.left + a.right : this.height + a.top + a.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Dr(this, s, o), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const r = l < this.ticks.length;
    this._convertTicksToLabels(r ? ns(this.ticks, l) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = gd(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), r && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, n, a;
    this.isHorizontal() ? (n = this.left, a = this.right) : (n = this.top, a = this.bottom, t = !t), this._startPixel = n, this._endPixel = a, this._reversePixels = t, this._length = a - n, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    Be(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    Be(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    Be(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), Be(this.options[t], [
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
    Be(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const n = this.options.ticks;
    let a, o, s;
    for (a = 0, o = t.length; a < o; a++)
      s = t[a], s.label = Be(n.callback, [
        s.value,
        a,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    Be(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    Be(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, n = t.ticks, a = ts(this.ticks.length, t.ticks.maxTicksLimit), o = n.minRotation || 0, s = n.maxRotation;
    let i = o, l, r, c;
    if (!this._isVisible() || !n.display || o >= s || a <= 1 || !this.isHorizontal()) {
      this.labelRotation = o;
      return;
    }
    const d = this._getLabelSizes(), h = d.widest.width, p = d.highest.height, v = Ue(this.chart.width - h, 0, this.maxWidth);
    l = t.offset ? this.maxWidth / a : v / (a - 1), h + 6 > l && (l = v / (a - (t.offset ? 0.5 : 1)), r = this.maxHeight - fn(t.grid) - n.padding - as(t.title, this.chart.options.font), c = Math.sqrt(h * h + p * p), i = Jl(Math.min(Math.asin(Ue((d.highest.height + 6) / l, -1, 1)), Math.asin(Ue(r / c, -1, 1)) - Math.asin(Ue(p / c, -1, 1)))), i = Math.max(o, Math.min(s, i))), this.labelRotation = i;
  }
  afterCalculateLabelRotation() {
    Be(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    Be(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: n, options: { ticks: a, title: o, grid: s } } = this, i = this._isVisible(), l = this.isHorizontal();
    if (i) {
      const r = as(o, n.options.font);
      if (l ? (t.width = this.maxWidth, t.height = fn(s) + r) : (t.height = this.maxHeight, t.width = fn(s) + r), a.display && this.ticks.length) {
        const { first: c, last: d, widest: h, highest: p } = this._getLabelSizes(), v = a.padding * 2, f = Ct(this.labelRotation), y = Math.cos(f), x = Math.sin(f);
        if (l) {
          const m = a.mirror ? 0 : x * h.width + y * p.height;
          t.height = Math.min(this.maxHeight, t.height + m + v);
        } else {
          const m = a.mirror ? 0 : y * h.width + x * p.height;
          t.width = Math.min(this.maxWidth, t.width + m + v);
        }
        this._calculatePadding(c, d, x, y);
      }
    }
    this._handleMargins(), l ? (this.width = this._length = n.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = n.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, n, a, o) {
    const { ticks: { align: s, padding: i }, position: l } = this.options, r = this.labelRotation !== 0, c = l !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const d = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let p = 0, v = 0;
      r ? c ? (p = o * t.width, v = a * n.height) : (p = a * t.height, v = o * n.width) : s === "start" ? v = n.width : s === "end" ? p = t.width : s !== "inner" && (p = t.width / 2, v = n.width / 2), this.paddingLeft = Math.max((p - d + i) * this.width / (this.width - d), 0), this.paddingRight = Math.max((v - h + i) * this.width / (this.width - h), 0);
    } else {
      let d = n.height / 2, h = t.height / 2;
      s === "start" ? (d = 0, h = t.height) : s === "end" && (d = n.height, h = 0), this.paddingTop = d + i, this.paddingBottom = h + i;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    Be(this.options.afterFit, [
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
      Me(t[n].label) && (t.splice(n, 1), a--, n--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const n = this.options.ticks.sampleSize;
      let a = this.ticks;
      n < a.length && (a = ns(a, n)), this._labelSizes = t = this._computeLabelSizes(a, a.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, n, a) {
    const { ctx: o, _longestTextCache: s } = this, i = [], l = [], r = Math.floor(n / ts(n, a));
    let c = 0, d = 0, h, p, v, f, y, x, m, g, _, w, D;
    for (h = 0; h < n; h += r) {
      if (f = t[h].label, y = this._resolveTickFontOptions(h), o.font = x = y.string, m = s[x] = s[x] || {
        data: {},
        gc: []
      }, g = y.lineHeight, _ = w = 0, !Me(f) && !ze(f))
        _ = To(o, m.data, m.gc, _, f), w = g;
      else if (ze(f))
        for (p = 0, v = f.length; p < v; ++p)
          D = f[p], !Me(D) && !ze(D) && (_ = To(o, m.data, m.gc, _, D), w += g);
      i.push(_), l.push(w), c = Math.max(_, c), d = Math.max(w, d);
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
    return tr(this._alignToPixels ? jt(this.chart, n, 0) : n);
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
      return a.$context || (a.$context = Cd(this.getContext(), t, a));
    }
    return this.$context || (this.$context = wd(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, n = Ct(this.labelRotation), a = Math.abs(Math.cos(n)), o = Math.abs(Math.sin(n)), s = this._getLabelSizes(), i = t.autoSkipPadding || 0, l = s ? s.widest.width + i : 0, r = s ? s.highest.height + i : 0;
    return this.isHorizontal() ? r * a > l * o ? l / a : r / o : r * o < l * a ? r / a : l / o;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const n = this.axis, a = this.chart, o = this.options, { grid: s, position: i, border: l } = o, r = s.offset, c = this.isHorizontal(), h = this.ticks.length + (r ? 1 : 0), p = fn(s), v = [], f = l.setContext(this.getContext()), y = f.display ? f.width : 0, x = y / 2, m = function(j) {
      return jt(a, j, y);
    };
    let g, _, w, D, S, $, M, F, T, B, E, I;
    if (i === "top")
      g = m(this.bottom), $ = this.bottom - p, F = g - x, B = m(t.top) + x, I = t.bottom;
    else if (i === "bottom")
      g = m(this.top), B = t.top, I = m(t.bottom) - x, $ = g + x, F = this.top + p;
    else if (i === "left")
      g = m(this.right), S = this.right - p, M = g - x, T = m(t.left) + x, E = t.right;
    else if (i === "right")
      g = m(this.left), T = t.left, E = m(t.right) - x, S = g + x, M = this.left + p;
    else if (n === "x") {
      if (i === "center")
        g = m((t.top + t.bottom) / 2 + 0.5);
      else if (we(i)) {
        const j = Object.keys(i)[0], Q = i[j];
        g = m(this.chart.scales[j].getPixelForValue(Q));
      }
      B = t.top, I = t.bottom, $ = g + x, F = $ + p;
    } else if (n === "y") {
      if (i === "center")
        g = m((t.left + t.right) / 2);
      else if (we(i)) {
        const j = Object.keys(i)[0], Q = i[j];
        g = m(this.chart.scales[j].getPixelForValue(Q));
      }
      S = g - x, M = S - p, T = t.left, E = t.right;
    }
    const N = he(o.ticks.maxTicksLimit, h), Y = Math.max(1, Math.ceil(h / N));
    for (_ = 0; _ < h; _ += Y) {
      const j = this.getContext(_), Q = s.setContext(j), ee = l.setContext(j), ce = Q.lineWidth, z = Q.color, K = ee.dash || [], X = ee.dashOffset, le = Q.tickWidth, se = Q.tickColor, Ae = Q.tickBorderDash || [], xe = Q.tickBorderDashOffset;
      w = xd(this, _, r), w !== void 0 && (D = jt(a, w, ce), c ? S = M = T = E = D : $ = F = B = I = D, v.push({
        tx1: S,
        ty1: $,
        tx2: M,
        ty2: F,
        x1: T,
        y1: B,
        x2: E,
        y2: I,
        width: ce,
        color: z,
        borderDash: K,
        borderDashOffset: X,
        tickWidth: le,
        tickColor: se,
        tickBorderDash: Ae,
        tickBorderDashOffset: xe
      }));
    }
    return this._ticksLength = h, this._borderValue = g, v;
  }
  _computeLabelItems(t) {
    const n = this.axis, a = this.options, { position: o, ticks: s } = a, i = this.isHorizontal(), l = this.ticks, { align: r, crossAlign: c, padding: d, mirror: h } = s, p = fn(a.grid), v = p + d, f = h ? -d : v, y = -Ct(this.labelRotation), x = [];
    let m, g, _, w, D, S, $, M, F, T, B, E, I = "middle";
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
        S = (t.top + t.bottom) / 2 + v;
      else if (we(o)) {
        const Y = Object.keys(o)[0], j = o[Y];
        S = this.chart.scales[Y].getPixelForValue(j) + v;
      }
      $ = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (o === "center")
        D = (t.left + t.right) / 2 - v;
      else if (we(o)) {
        const Y = Object.keys(o)[0], j = o[Y];
        D = this.chart.scales[Y].getPixelForValue(j);
      }
      $ = this._getYAxisLabelAlignment(p).textAlign;
    }
    n === "y" && (r === "start" ? I = "top" : r === "end" && (I = "bottom"));
    const N = this._getLabelSizes();
    for (m = 0, g = l.length; m < g; ++m) {
      _ = l[m], w = _.label;
      const Y = s.setContext(this.getContext(m));
      M = this.getPixelForTick(m) + s.labelOffset, F = this._resolveTickFontOptions(m), T = F.lineHeight, B = ze(w) ? w.length : 1;
      const j = B / 2, Q = Y.color, ee = Y.textStrokeColor, ce = Y.textStrokeWidth;
      let z = $;
      i ? (D = M, $ === "inner" && (m === g - 1 ? z = this.options.reverse ? "left" : "right" : m === 0 ? z = this.options.reverse ? "right" : "left" : z = "center"), o === "top" ? c === "near" || y !== 0 ? E = -B * T + T / 2 : c === "center" ? E = -N.highest.height / 2 - j * T + T : E = -N.highest.height + T / 2 : c === "near" || y !== 0 ? E = T / 2 : c === "center" ? E = N.highest.height / 2 - j * T : E = N.highest.height - B * T, h && (E *= -1), y !== 0 && !Y.showLabelBackdrop && (D += T / 2 * Math.sin(y))) : (S = M, E = (1 - B) * T / 2);
      let K;
      if (Y.showLabelBackdrop) {
        const X = ct(Y.backdropPadding), le = N.heights[m], se = N.widths[m];
        let Ae = E - X.top, xe = 0 - X.left;
        switch (I) {
          case "middle":
            Ae -= le / 2;
            break;
          case "bottom":
            Ae -= le;
            break;
        }
        switch ($) {
          case "center":
            xe -= se / 2;
            break;
          case "right":
            xe -= se;
            break;
          case "inner":
            m === g - 1 ? xe -= se : m > 0 && (xe -= se / 2);
            break;
        }
        K = {
          left: xe,
          top: Ae,
          width: se + X.width,
          height: le + X.height,
          color: Y.backdropColor
        };
      }
      x.push({
        label: w,
        font: F,
        textOffset: E,
        options: {
          rotation: y,
          color: Q,
          strokeColor: ee,
          strokeWidth: ce,
          textAlign: z,
          textBaseline: I,
          translation: [
            D,
            S
          ],
          backdrop: K
        }
      });
    }
    return x;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: n } = this.options;
    if (-Ct(this.labelRotation))
      return t === "top" ? "left" : "right";
    let o = "center";
    return n.align === "start" ? o = "left" : n.align === "end" ? o = "right" : n.align === "inner" && (o = "inner"), o;
  }
  _getYAxisLabelAlignment(t) {
    const { position: n, ticks: { crossAlign: a, mirror: o, padding: s } } = this.options, i = this._getLabelSizes(), l = t + s, r = i.widest.width;
    let c, d;
    return n === "left" ? o ? (d = this.right + s, a === "near" ? c = "left" : a === "center" ? (c = "center", d += r / 2) : (c = "right", d += r)) : (d = this.right - l, a === "near" ? c = "right" : a === "center" ? (c = "center", d -= r / 2) : (c = "left", d = this.left)) : n === "right" ? o ? (d = this.left + s, a === "near" ? c = "right" : a === "center" ? (c = "center", d -= r / 2) : (c = "left", d -= r)) : (d = this.left + l, a === "near" ? c = "left" : a === "center" ? (c = "center", d += r / 2) : (c = "right", d = this.right)) : c = "right", {
      textAlign: c,
      x: d
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
    const n = this.options.grid, a = this.ctx, o = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
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
    const { chart: t, ctx: n, options: { border: a, grid: o } } = this, s = a.setContext(this.getContext()), i = a.display ? s.width : 0;
    if (!i)
      return;
    const l = o.setContext(this.getContext(0)).lineWidth, r = this._borderValue;
    let c, d, h, p;
    this.isHorizontal() ? (c = jt(t, this.left, i) - i / 2, d = jt(t, this.right, l) + l / 2, h = p = r) : (h = jt(t, this.top, i) - i / 2, p = jt(t, this.bottom, l) + l / 2, c = d = r), n.save(), n.lineWidth = s.width, n.strokeStyle = s.color, n.beginPath(), n.moveTo(c, h), n.lineTo(d, p), n.stroke(), n.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const a = this.ctx, o = this._computeLabelArea();
    o && Za(a, o);
    const s = this.getLabelItems(t);
    for (const i of s) {
      const l = i.options, r = i.font, c = i.label, d = i.textOffset;
      Ln(a, c, 0, d, r, l);
    }
    o && Qa(a);
  }
  drawTitle() {
    const { ctx: t, options: { position: n, title: a, reverse: o } } = this;
    if (!a.display)
      return;
    const s = qe(a.font), i = ct(a.padding), l = a.align;
    let r = s.lineHeight / 2;
    n === "bottom" || n === "center" || we(n) ? (r += i.bottom, ze(a.text) && (r += s.lineHeight * (a.text.length - 1))) : r += i.top;
    const { titleX: c, titleY: d, maxWidth: h, rotation: p } = Md(this, r, n, l);
    Ln(t, a.text, 0, 0, s, {
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
  draw(t) {
    this._isVisible() && (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t));
  }
  _layers() {
    const t = this.options, n = t.ticks && t.ticks.z || 0, a = he(t.grid && t.grid.z, -1), o = he(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== cn.prototype.draw ? [
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
    const n = this.chart.getSortedVisibleDatasetMetas(), a = this.axis + "AxisID", o = [];
    let s, i;
    for (s = 0, i = n.length; s < i; ++s) {
      const l = n[s];
      l[a] === this.id && (!t || l.type === t) && o.push(l);
    }
    return o;
  }
  _resolveTickFontOptions(t) {
    const n = this.options.ticks.setContext(this.getContext(t));
    return qe(n.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class Un {
  constructor(t, n, a) {
    this.type = t, this.scope = n, this.override = a, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const n = Object.getPrototypeOf(t);
    let a;
    Ad(n) && (a = this.register(n));
    const o = this.items, s = t.id, i = this.scope + "." + s;
    if (!s)
      throw new Error("class does not have id: " + t);
    return s in o || (o[s] = t, Sd(t, i, a), this.override && Re.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const n = this.items, a = t.id, o = this.scope;
    a in n && delete n[a], o && a in Re[o] && (delete Re[o][a], this.override && delete Gt[a]);
  }
}
function Sd(e, t, n) {
  const a = Sn(/* @__PURE__ */ Object.create(null), [
    n ? Re.get(n) : {},
    Re.get(t),
    e.defaults
  ]);
  Re.set(t, a), e.defaultRoutes && Dd(t, e.defaultRoutes), e.descriptors && Re.describe(t, e.descriptors);
}
function Dd(e, t) {
  Object.keys(t).forEach((n) => {
    const a = n.split("."), o = a.pop(), s = [
      e
    ].concat(a).join("."), i = t[n].split("."), l = i.pop(), r = i.join(".");
    Re.route(s, o, r, l);
  });
}
function Ad(e) {
  return "id" in e && "defaults" in e;
}
class Td {
  constructor() {
    this.controllers = new Un(ha, "datasets", !0), this.elements = new Un(Mt, "elements"), this.plugins = new Un(Object, "plugins"), this.scales = new Un(cn, "scales"), this._typedRegistries = [
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
    ].forEach((o) => {
      const s = a || this._getRegistryForType(o);
      a || s.isForType(o) || s === this.plugins && o.id ? this._exec(t, s, o) : Se(o, (i) => {
        const l = a || this._getRegistryForType(i);
        this._exec(t, l, i);
      });
    });
  }
  _exec(t, n, a) {
    const o = Ka(t);
    Be(a["before" + o], [], a), n[t](a), Be(a["after" + o], [], a);
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
var mt = /* @__PURE__ */ new Td();
class Bd {
  constructor() {
    this._init = void 0;
  }
  notify(t, n, a, o) {
    if (n === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install")), this._init === void 0)
      return;
    const s = o ? this._descriptors(t).filter(o) : this._descriptors(t), i = this._notify(s, t, n, a);
    return n === "afterDestroy" && (this._notify(s, t, "stop"), this._notify(this._init, t, "uninstall"), this._init = void 0), i;
  }
  _notify(t, n, a, o) {
    o = o || {};
    for (const s of t) {
      const i = s.plugin, l = i[a], r = [
        n,
        o,
        s.options
      ];
      if (Be(l, r, i) === !1 && o.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    Me(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const n = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), n;
  }
  _createDescriptors(t, n) {
    const a = t && t.config, o = he(a.options && a.options.plugins, {}), s = Ld(a);
    return o === !1 && !n ? [] : Pd(t, s, o, n);
  }
  _notifyStateChanges(t) {
    const n = this._oldCache || [], a = this._cache, o = (s, i) => s.filter((l) => !i.some((r) => l.plugin.id === r.plugin.id));
    this._notify(o(n, a), t, "stop"), this._notify(o(a, n), t, "start");
  }
}
function Ld(e) {
  const t = {}, n = [], a = Object.keys(mt.plugins.items);
  for (let s = 0; s < a.length; s++)
    n.push(mt.getPlugin(a[s]));
  const o = e.plugins || [];
  for (let s = 0; s < o.length; s++) {
    const i = o[s];
    n.indexOf(i) === -1 && (n.push(i), t[i.id] = !0);
  }
  return {
    plugins: n,
    localIds: t
  };
}
function Fd(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function Pd(e, { plugins: t, localIds: n }, a, o) {
  const s = [], i = e.getContext();
  for (const l of t) {
    const r = l.id, c = Fd(a[r], o);
    c !== null && s.push({
      plugin: l,
      options: Ed(e.config, {
        plugin: l,
        local: n[r]
      }, c, i)
    });
  }
  return s;
}
function Ed(e, { plugin: t, local: n }, a, o) {
  const s = e.pluginScopeKeys(t), i = e.getOptionScopes(a, s);
  return n && t.defaults && i.push(t.defaults), e.createResolver(i, o, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Oa(e, t) {
  const n = Re.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || n.indexAxis || "x";
}
function Id(e, t) {
  let n = e;
  return e === "_index_" ? n = t : e === "_value_" && (n = t === "x" ? "y" : "x"), n;
}
function Rd(e, t) {
  return e === t ? "_index_" : "_value_";
}
function os(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function Od(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Va(e, ...t) {
  if (os(e))
    return e;
  for (const n of t) {
    const a = n.axis || Od(n.position) || e.length > 1 && os(e[0].toLowerCase());
    if (a)
      return a;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function ss(e, t, n) {
  if (n[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function Vd(e, t) {
  if (t.data && t.data.datasets) {
    const n = t.data.datasets.filter((a) => a.xAxisID === e || a.yAxisID === e);
    if (n.length)
      return ss(e, "x", n[0]) || ss(e, "y", n[0]);
  }
  return {};
}
function zd(e, t) {
  const n = Gt[e.type] || {
    scales: {}
  }, a = t.scales || {}, o = Oa(e.type, t), s = /* @__PURE__ */ Object.create(null);
  return Object.keys(a).forEach((i) => {
    const l = a[i];
    if (!we(l))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (l._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const r = Va(i, l, Vd(i, e), Re.scales[l.type]), c = Rd(r, o), d = n.scales || {};
    s[i] = xn(/* @__PURE__ */ Object.create(null), [
      {
        axis: r
      },
      l,
      d[r],
      d[c]
    ]);
  }), e.data.datasets.forEach((i) => {
    const l = i.type || e.type, r = i.indexAxis || Oa(l, t), d = (Gt[l] || {}).scales || {};
    Object.keys(d).forEach((h) => {
      const p = Id(h, r), v = i[p + "AxisID"] || p;
      s[v] = s[v] || /* @__PURE__ */ Object.create(null), xn(s[v], [
        {
          axis: p
        },
        a[v],
        d[h]
      ]);
    });
  }), Object.keys(s).forEach((i) => {
    const l = s[i];
    xn(l, [
      Re.scales[l.type],
      Re.scale
    ]);
  }), s;
}
function xi(e) {
  const t = e.options || (e.options = {});
  t.plugins = he(t.plugins, {}), t.scales = zd(e, t);
}
function ki(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function Nd(e) {
  return e = e || {}, e.data = ki(e.data), xi(e), e;
}
const is = /* @__PURE__ */ new Map(), wi = /* @__PURE__ */ new Set();
function qn(e, t) {
  let n = is.get(e);
  return n || (n = t(), is.set(e, n), wi.add(n)), n;
}
const gn = (e, t, n) => {
  const a = Xt(t, n);
  a !== void 0 && e.add(a);
};
class jd {
  constructor(t) {
    this._config = Nd(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = ki(t);
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
    this.clearCache(), xi(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return qn(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, n) {
    return qn(`${t}.transition.${n}`, () => [
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
    return qn(`${t}-${n}`, () => [
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
    return qn(`${a}-plugin-${n}`, () => [
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
    const { options: o, type: s } = this, i = this._cachedScopes(t, a), l = i.get(n);
    if (l)
      return l;
    const r = /* @__PURE__ */ new Set();
    n.forEach((d) => {
      t && (r.add(t), d.forEach((h) => gn(r, t, h))), d.forEach((h) => gn(r, o, h)), d.forEach((h) => gn(r, Gt[s] || {}, h)), d.forEach((h) => gn(r, Re, h)), d.forEach((h) => gn(r, Ia, h));
    });
    const c = Array.from(r);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), wi.has(n) && i.set(n, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: n } = this;
    return [
      t,
      Gt[n] || {},
      Re.datasets[n] || {},
      {
        type: n
      },
      Re,
      Ia
    ];
  }
  resolveNamedOptions(t, n, a, o = [
    ""
  ]) {
    const s = {
      $shared: !0
    }, { resolver: i, subPrefixes: l } = ls(this._resolverCache, t, o);
    let r = i;
    if (Hd(i, n)) {
      s.$shared = !1, a = Ot(a) ? a() : a;
      const c = this.createResolver(t, a, l);
      r = ln(i, a, c);
    }
    for (const c of n)
      s[c] = r[c];
    return s;
  }
  createResolver(t, n, a = [
    ""
  ], o) {
    const { resolver: s } = ls(this._resolverCache, t, a);
    return we(n) ? ln(s, n, void 0, o) : s;
  }
}
function ls(e, t, n) {
  let a = e.get(t);
  a || (a = /* @__PURE__ */ new Map(), e.set(t, a));
  const o = n.join();
  let s = a.get(o);
  return s || (s = {
    resolver: eo(t, n),
    subPrefixes: n.filter((l) => !l.toLowerCase().includes("hover"))
  }, a.set(o, s)), s;
}
const Wd = (e) => we(e) && Object.getOwnPropertyNames(e).some((t) => Ot(e[t]));
function Hd(e, t) {
  const { isScriptable: n, isIndexable: a } = si(e);
  for (const o of t) {
    const s = n(o), i = a(o), l = (i || s) && e[o];
    if (s && (Ot(l) || Wd(l)) || i && ze(l))
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
function rs(e, t) {
  return e === "top" || e === "bottom" || Kd.indexOf(e) === -1 && t === "x";
}
function cs(e, t) {
  return function(n, a) {
    return n[e] === a[e] ? n[t] - a[t] : n[e] - a[e];
  };
}
function ds(e) {
  const t = e.chart, n = t.options.animation;
  t.notifyPlugins("afterRender"), Be(n && n.onComplete, [
    e
  ], t);
}
function Ud(e) {
  const t = e.chart, n = t.options.animation;
  Be(n && n.onProgress, [
    e
  ], t);
}
function Ci(e) {
  return ao() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const ea = {}, us = (e) => {
  const t = Ci(e);
  return Object.values(ea).filter((n) => n.canvas === t).pop();
};
function qd(e, t, n) {
  const a = Object.keys(e);
  for (const o of a) {
    const s = +o;
    if (s >= t) {
      const i = e[o];
      delete e[o], (n > 0 || s > t) && (e[s + n] = i);
    }
  }
}
function Xd(e, t, n, a) {
  return !n || e.type === "mouseout" ? null : a ? t : e;
}
let Vt = class {
  static defaults = Re;
  static instances = ea;
  static overrides = Gt;
  static registry = mt;
  static version = Yd;
  static getChart = us;
  static register(...t) {
    mt.add(...t), hs();
  }
  static unregister(...t) {
    mt.remove(...t), hs();
  }
  constructor(t, n) {
    const a = this.config = new jd(n), o = Ci(t), s = us(o);
    if (s)
      throw new Error("Canvas is already in use. Chart with ID '" + s.id + "' must be destroyed before the canvas with ID '" + s.canvas.id + "' can be reused.");
    const i = a.createResolver(a.chartOptionScopes(), this.getContext());
    this.platform = new (a.platform || fd(o))(), this.platform.updateConfig(a);
    const l = this.platform.acquireContext(o, i.aspectRatio), r = l && l.canvas, c = r && r.height, d = r && r.width;
    if (this.id = zl(), this.ctx = l, this.canvas = r, this.width = d, this.height = c, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Bd(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = sr((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], ea[this.id] = this, !l || !r) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    xt.listen(this, "complete", ds), xt.listen(this, "progress", Ud), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: n }, width: a, height: o, _aspectRatio: s } = this;
    return Me(t) ? n && s ? s : o ? a / o : null : t;
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
    return mt;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Po(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Bo(this.canvas, this.ctx), this;
  }
  stop() {
    return xt.stop(this), this;
  }
  resize(t, n) {
    xt.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: n
    } : this._resize(t, n);
  }
  _resize(t, n) {
    const a = this.options, o = this.canvas, s = a.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(o, t, n, s), l = a.devicePixelRatio || this.platform.getDevicePixelRatio(), r = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, Po(this, l, !0) && (this.notifyPlugins("resize", {
      size: i
    }), Be(a.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(r) && this.render());
  }
  ensureScalesHaveIDs() {
    const n = this.options.scales || {};
    Se(n, (a, o) => {
      a.id = o;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, n = t.scales, a = this.scales, o = Object.keys(a).reduce((i, l) => (i[l] = !1, i), {});
    let s = [];
    n && (s = s.concat(Object.keys(n).map((i) => {
      const l = n[i], r = Va(i, l), c = r === "r", d = r === "x";
      return {
        options: l,
        dposition: c ? "chartArea" : d ? "bottom" : "left",
        dtype: c ? "radialLinear" : d ? "category" : "linear"
      };
    }))), Se(s, (i) => {
      const l = i.options, r = l.id, c = Va(r, l), d = he(l.type, i.dtype);
      (l.position === void 0 || rs(l.position, c) !== rs(i.dposition)) && (l.position = i.dposition), o[r] = !0;
      let h = null;
      if (r in a && a[r].type === d)
        h = a[r];
      else {
        const p = mt.getScale(d);
        h = new p({
          id: r,
          type: d,
          ctx: this.ctx,
          chart: this
        }), a[h.id] = h;
      }
      h.init(l, t);
    }), Se(o, (i, l) => {
      i || delete a[l];
    }), Se(a, (i) => {
      lt.configure(this, i, i.options), lt.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, n = this.data.datasets.length, a = t.length;
    if (t.sort((o, s) => o.index - s.index), a > n) {
      for (let o = n; o < a; ++o)
        this._destroyDatasetMeta(o);
      t.splice(n, a - n);
    }
    this._sortedMetasets = t.slice(0).sort(cs("order", "index"));
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
      const l = s.type || this.config.type;
      if (i.type && i.type !== l && (this._destroyDatasetMeta(a), i = this.getDatasetMeta(a)), i.type = l, i.indexAxis = s.indexAxis || Oa(l, this.options), i.order = s.order || 0, i.index = a, i.label = "" + s.label, i.visible = this.isDatasetVisible(a), i.controller)
        i.controller.updateIndex(a), i.controller.linkScales();
      else {
        const r = mt.getController(l), { datasetElementType: c, dataElementType: d } = Re.datasets[l];
        Object.assign(r, {
          dataElementType: mt.getElement(d),
          datasetElementType: c && mt.getElement(c)
        }), i.controller = new r(this, a), t.push(i.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    Se(this.data.datasets, (t, n) => {
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
    for (let c = 0, d = this.data.datasets.length; c < d; c++) {
      const { controller: h } = this.getDatasetMeta(c), p = !o && s.indexOf(h) === -1;
      h.buildOrUpdateElements(p), i = Math.max(+h.getMaxOverflow(), i);
    }
    i = this._minPadding = a.layout.autoPadding ? i : 0, this._updateLayout(i), o || Se(s, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(cs("z", "_idx"));
    const { _active: l, _lastEvent: r } = this;
    r ? this._eventHandler(r, !0) : l.length && this._updateHoverStyles(l, l, !0), this.render();
  }
  _updateScales() {
    Se(this.scales, (t) => {
      lt.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, n = new Set(Object.keys(this._listeners)), a = new Set(t.events);
    (!xo(n, a) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, n = this._getUniformDataChanges() || [];
    for (const { method: a, start: o, count: s } of n) {
      const i = a === "_removeElements" ? -s : s;
      qd(t, o, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const n = this.data.datasets.length, a = (s) => new Set(t.filter((i) => i[0] === s).map((i, l) => l + "," + i.splice(1).join(","))), o = a(0);
    for (let s = 1; s < n; s++)
      if (!xo(o, a(s)))
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
    lt.update(this, this.width, this.height, t);
    const n = this.chartArea, a = n.width <= 0 || n.height <= 0;
    this._layers = [], Se(this.boxes, (o) => {
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
        this._updateDataset(n, Ot(t) ? t({
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
    }) !== !1 && (xt.has(this) ? this.attached && !xt.running(this) && xt.start(this) : (this.draw(), ds({
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
    }, o = uc(this, t);
    this.notifyPlugins("beforeDatasetDraw", a) !== !1 && (o && Za(n, o), t.controller.draw(), o && Qa(n), a.cancelable = !1, this.notifyPlugins("afterDatasetDraw", a));
  }
  isPointInArea(t) {
    return Bn(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, n, a, o) {
    const s = Kc.modes[n];
    return typeof s == "function" ? s(this, t, a, o) : [];
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
    return this.$context || (this.$context = Zt(null, {
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
    Dn(n) ? (s.data[n].hidden = !a, this.update()) : (this.setDatasetVisibility(t, a), i.update(s, {
      visible: a
    }), this.update((l) => l.datasetIndex === t ? o : void 0));
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
    for (this.stop(), xt.remove(this), t = 0, n = this.data.datasets.length; t < n; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: n } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Bo(t, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete ea[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, n = this.platform, a = (s, i) => {
      n.addEventListener(this, s, i), t[s] = i;
    }, o = (s, i, l) => {
      s.offsetX = i, s.offsetY = l, this._eventHandler(s);
    };
    Se(this.options.events, (s) => a(s, o));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, n = this.platform, a = (r, c) => {
      n.addEventListener(this, r, c), t[r] = c;
    }, o = (r, c) => {
      t[r] && (n.removeEventListener(this, r, c), delete t[r]);
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
    Se(this._listeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._listeners = {}, Se(this._responsiveListeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, n, a) {
    const o = a ? "set" : "remove";
    let s, i, l, r;
    for (n === "dataset" && (s = this.getDatasetMeta(t[0].datasetIndex), s.controller["_" + o + "DatasetHoverStyle"]()), l = 0, r = t.length; l < r; ++l) {
      i = t[l];
      const c = i && this.getDatasetMeta(i.datasetIndex).controller;
      c && c[o + "HoverStyle"](i.element, i.datasetIndex, i.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const n = this._active || [], a = t.map(({ datasetIndex: s, index: i }) => {
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
  notifyPlugins(t, n, a) {
    return this._plugins.notify(this, t, n, a);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((n) => n.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, n, a) {
    const o = this.options.hover, s = (r, c) => r.filter((d) => !c.some((h) => d.datasetIndex === h.datasetIndex && d.index === h.index)), i = s(n, t), l = a ? t : s(t, n);
    i.length && this.updateHoverStyle(i, o.mode, !1), l.length && o.mode && this.updateHoverStyle(l, o.mode, !0);
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
    const { _active: o = [], options: s } = this, i = n, l = this._getActiveElements(t, o, a, i), r = Kl(t), c = Xd(t, this._lastEvent, a, r);
    a && (this._lastEvent = null, Be(s.onHover, [
      t,
      l,
      this
    ], this), r && Be(s.onClick, [
      t,
      l,
      this
    ], this));
    const d = !na(l, o);
    return (d || n) && (this._active = l, this._updateHoverStyles(l, o, n)), this._lastEvent = c, d;
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
function hs() {
  return Se(Vt.instances, (e) => e._plugins.invalidate());
}
function Gd(e, t, n) {
  const { startAngle: a, x: o, y: s, outerRadius: i, innerRadius: l, options: r } = t, { borderWidth: c, borderJoinStyle: d } = r, h = Math.min(c / i, ut(a - n));
  if (e.beginPath(), e.arc(o, s, i - c / 2, a + h / 2, n - h / 2), l > 0) {
    const p = Math.min(c / l, ut(a - n));
    e.arc(o, s, l + c / 2, n - p / 2, a + p / 2, !0);
  } else {
    const p = Math.min(c / 2, i * ut(a - n));
    if (d === "round")
      e.arc(o, s, p, n - De / 2, a + De / 2, !0);
    else if (d === "bevel") {
      const v = 2 * p * p, f = -v * Math.cos(n + De / 2) + o, y = -v * Math.sin(n + De / 2) + s, x = v * Math.cos(a + De / 2) + o, m = v * Math.sin(a + De / 2) + s;
      e.lineTo(f, y), e.lineTo(x, m);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Zd(e, t, n) {
  const { startAngle: a, pixelMargin: o, x: s, y: i, outerRadius: l, innerRadius: r } = t;
  let c = o / l;
  e.beginPath(), e.arc(s, i, l, a - c, n + c), r > o ? (c = o / r, e.arc(s, i, r, n + c, a - c, !0)) : e.arc(s, i, o, n + Ne, a - Ne), e.closePath(), e.clip();
}
function Qd(e) {
  return Ja(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Jd(e, t, n, a) {
  const o = Qd(e.options.borderRadius), s = (n - t) / 2, i = Math.min(s, a * t / 2), l = (r) => {
    const c = (n - Math.min(s, r)) * a / 2;
    return Ue(r, 0, Math.min(s, c));
  };
  return {
    outerStart: l(o.outerStart),
    outerEnd: l(o.outerEnd),
    innerStart: Ue(o.innerStart, 0, i),
    innerEnd: Ue(o.innerEnd, 0, i)
  };
}
function Jt(e, t, n, a) {
  return {
    x: n + e * Math.cos(t),
    y: a + e * Math.sin(t)
  };
}
function ra(e, t, n, a, o, s) {
  const { x: i, y: l, startAngle: r, pixelMargin: c, innerRadius: d } = t, h = Math.max(t.outerRadius + a + n - c, 0), p = d > 0 ? d + a + n + c : 0;
  let v = 0;
  const f = o - r;
  if (a) {
    const Y = d > 0 ? d - a : 0, j = h > 0 ? h - a : 0, Q = (Y + j) / 2, ee = Q !== 0 ? f * Q / (Q + a) : f;
    v = (f - ee) / 2;
  }
  const y = Math.max(1e-3, f * h - n / De) / h, x = (f - y) / 2, m = r + x + v, g = o - x - v, { outerStart: _, outerEnd: w, innerStart: D, innerEnd: S } = Jd(t, p, h, g - m), $ = h - _, M = h - w, F = m + _ / $, T = g - w / M, B = p + D, E = p + S, I = m + D / B, N = g - S / E;
  if (e.beginPath(), s) {
    const Y = (F + T) / 2;
    if (e.arc(i, l, h, F, Y), e.arc(i, l, h, Y, T), w > 0) {
      const ce = Jt(M, T, i, l);
      e.arc(ce.x, ce.y, w, T, g + Ne);
    }
    const j = Jt(E, g, i, l);
    if (e.lineTo(j.x, j.y), S > 0) {
      const ce = Jt(E, N, i, l);
      e.arc(ce.x, ce.y, S, g + Ne, N + Math.PI);
    }
    const Q = (g - S / p + (m + D / p)) / 2;
    if (e.arc(i, l, p, g - S / p, Q, !0), e.arc(i, l, p, Q, m + D / p, !0), D > 0) {
      const ce = Jt(B, I, i, l);
      e.arc(ce.x, ce.y, D, I + Math.PI, m - Ne);
    }
    const ee = Jt($, m, i, l);
    if (e.lineTo(ee.x, ee.y), _ > 0) {
      const ce = Jt($, F, i, l);
      e.arc(ce.x, ce.y, _, m - Ne, F);
    }
  } else {
    e.moveTo(i, l);
    const Y = Math.cos(F) * h + i, j = Math.sin(F) * h + l;
    e.lineTo(Y, j);
    const Q = Math.cos(T) * h + i, ee = Math.sin(T) * h + l;
    e.lineTo(Q, ee);
  }
  e.closePath();
}
function eu(e, t, n, a, o) {
  const { fullCircles: s, startAngle: i, circumference: l } = t;
  let r = t.endAngle;
  if (s) {
    ra(e, t, n, a, r, o);
    for (let c = 0; c < s; ++c)
      e.fill();
    isNaN(l) || (r = i + (l % Ee || Ee));
  }
  return ra(e, t, n, a, r, o), e.fill(), r;
}
function tu(e, t, n, a, o) {
  const { fullCircles: s, startAngle: i, circumference: l, options: r } = t, { borderWidth: c, borderJoinStyle: d, borderDash: h, borderDashOffset: p, borderRadius: v } = r, f = r.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(h || []), e.lineDashOffset = p, f ? (e.lineWidth = c * 2, e.lineJoin = d || "round") : (e.lineWidth = c, e.lineJoin = d || "bevel");
  let y = t.endAngle;
  if (s) {
    ra(e, t, n, a, y, o);
    for (let x = 0; x < s; ++x)
      e.stroke();
    isNaN(l) || (y = i + (l % Ee || Ee));
  }
  f && Zd(e, t, y), r.selfJoin && y - i >= De && v === 0 && d !== "miter" && Gd(e, t, y), s || (ra(e, t, n, a, y, o), e.stroke());
}
class nu extends Mt {
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
    ], a), { angle: s, distance: i } = Zs(o, {
      x: t,
      y: n
    }), { startAngle: l, endAngle: r, innerRadius: c, outerRadius: d, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], a), p = (this.options.spacing + this.options.borderWidth) / 2, v = he(h, r - l), f = Tn(s, l, r) && l !== r, y = v >= Ee || f, x = Bt(i, c + p, d + p);
    return y && x;
  }
  getCenterPoint(t) {
    const { x: n, y: a, startAngle: o, endAngle: s, innerRadius: i, outerRadius: l } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: r, spacing: c } = this.options, d = (o + s) / 2, h = (i + l + c + r) / 2;
    return {
      x: n + Math.cos(d) * h,
      y: a + Math.sin(d) * h
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: n, circumference: a } = this, o = (n.offset || 0) / 4, s = (n.spacing || 0) / 2, i = n.circular;
    if (this.pixelMargin = n.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = a > Ee ? Math.floor(a / Ee) : 0, a === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const l = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(l) * o, Math.sin(l) * o);
    const r = 1 - Math.sin(Math.min(De, a || 0)), c = o * r;
    t.fillStyle = n.backgroundColor, t.strokeStyle = n.borderColor, eu(t, this, c, s, i), tu(t, this, c, s, i), t.restore();
  }
}
function $i(e, t, n = t) {
  e.lineCap = he(n.borderCapStyle, t.borderCapStyle), e.setLineDash(he(n.borderDash, t.borderDash)), e.lineDashOffset = he(n.borderDashOffset, t.borderDashOffset), e.lineJoin = he(n.borderJoinStyle, t.borderJoinStyle), e.lineWidth = he(n.borderWidth, t.borderWidth), e.strokeStyle = he(n.borderColor, t.borderColor);
}
function au(e, t, n) {
  e.lineTo(n.x, n.y);
}
function ou(e) {
  return e.stepped ? yr : e.tension || e.cubicInterpolationMode === "monotone" ? _r : au;
}
function Mi(e, t, n = {}) {
  const a = e.length, { start: o = 0, end: s = a - 1 } = n, { start: i, end: l } = t, r = Math.max(o, i), c = Math.min(s, l), d = o < i && s < i || o > l && s > l;
  return {
    count: a,
    start: r,
    loop: t.loop,
    ilen: c < r && !d ? a + c - r : c - r
  };
}
function su(e, t, n, a) {
  const { points: o, options: s } = t, { count: i, start: l, loop: r, ilen: c } = Mi(o, n, a), d = ou(s);
  let { move: h = !0, reverse: p } = a || {}, v, f, y;
  for (v = 0; v <= c; ++v)
    f = o[(l + (p ? c - v : v)) % i], !f.skip && (h ? (e.moveTo(f.x, f.y), h = !1) : d(e, y, f, p, s.stepped), y = f);
  return r && (f = o[(l + (p ? c : 0)) % i], d(e, y, f, p, s.stepped)), !!r;
}
function iu(e, t, n, a) {
  const o = t.points, { count: s, start: i, ilen: l } = Mi(o, n, a), { move: r = !0, reverse: c } = a || {};
  let d = 0, h = 0, p, v, f, y, x, m;
  const g = (w) => (i + (c ? l - w : w)) % s, _ = () => {
    y !== x && (e.lineTo(d, x), e.lineTo(d, y), e.lineTo(d, m));
  };
  for (r && (v = o[g(0)], e.moveTo(v.x, v.y)), p = 0; p <= l; ++p) {
    if (v = o[g(p)], v.skip)
      continue;
    const w = v.x, D = v.y, S = w | 0;
    S === f ? (D < y ? y = D : D > x && (x = D), d = (h * d + w) / ++h) : (_(), e.lineTo(w, D), f = S, h = 0, y = x = D), m = D;
  }
  _();
}
function za(e) {
  const t = e.options, n = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !n ? iu : su;
}
function lu(e) {
  return e.stepped ? Qr : e.tension || e.cubicInterpolationMode === "monotone" ? Jr : Yt;
}
function ru(e, t, n, a) {
  let o = t._path;
  o || (o = t._path = new Path2D(), t.path(o, n, a) && o.closePath()), $i(e, t.options), e.stroke(o);
}
function cu(e, t, n, a) {
  const { segments: o, options: s } = t, i = za(t);
  for (const l of o)
    $i(e, s, l.style), e.beginPath(), i(e, t, l, {
      start: n,
      end: n + a - 1
    }) && e.closePath(), e.stroke();
}
const du = typeof Path2D == "function";
function uu(e, t, n, a) {
  du && !t.options.segment ? ru(e, t, n, a) : cu(e, t, n, a);
}
class hu extends Mt {
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
      const o = a.spanGaps ? this._loop : this._fullLoop;
      Hr(this._points, a, t, o, n), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = lc(this, this.options.segment));
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
    const a = this.options, o = t[n], s = this.points, i = oc(this, {
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
      const y = Math.abs((o - v[n]) / (f[n] - v[n])), x = r(v, f, y, a.stepped);
      x[n] = t[n], l.push(x);
    }
    return l.length === 1 ? l[0] : l;
  }
  pathSegment(t, n, a) {
    return za(this)(t, this, n, a);
  }
  path(t, n, a) {
    const o = this.segments, s = za(this);
    let i = this._loop;
    n = n || 0, a = a || this.points.length - n;
    for (const l of o)
      i &= s(t, this, l, {
        start: n,
        end: n + a - 1
      });
    return !!i;
  }
  draw(t, n, a, o) {
    const s = this.options || {};
    (this.points || []).length && s.borderWidth && (t.save(), uu(t, this, a, o), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function fs(e, t, n, a) {
  const o = e.options, { [n]: s } = e.getProps([
    n
  ], a);
  return Math.abs(t - s) < o.radius + o.hitRadius;
}
class fu extends Mt {
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
    return fs(this, t, "x", n);
  }
  inYRange(t, n) {
    return fs(this, t, "y", n);
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
    this.skip || a.radius < 0.1 || !Bn(this, n, this.size(a) / 2) || (t.strokeStyle = a.borderColor, t.lineWidth = a.borderWidth, t.fillStyle = a.backgroundColor, Ra(t, a, this.x, this.y));
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
  let l, r, c, d, h;
  return e.horizontal ? (h = i / 2, l = Math.min(n, o), r = Math.max(n, o), c = a - h, d = a + h) : (h = s / 2, l = n - h, r = n + h, c = Math.min(a, o), d = Math.max(a, o)), {
    left: l,
    top: c,
    right: r,
    bottom: d
  };
}
function Ft(e, t, n, a) {
  return e ? 0 : Ue(t, n, a);
}
function gu(e, t, n) {
  const a = e.options.borderWidth, o = e.borderSkipped, s = oi(a);
  return {
    t: Ft(o.top, s.top, 0, n),
    r: Ft(o.right, s.right, 0, t),
    b: Ft(o.bottom, s.bottom, 0, n),
    l: Ft(o.left, s.left, 0, t)
  };
}
function pu(e, t, n) {
  const { enableBorderRadius: a } = e.getProps([
    "enableBorderRadius"
  ]), o = e.options.borderRadius, s = nn(o), i = Math.min(t, n), l = e.borderSkipped, r = a || we(o);
  return {
    topLeft: Ft(!r || l.top || l.left, s.topLeft, 0, i),
    topRight: Ft(!r || l.top || l.right, s.topRight, 0, i),
    bottomLeft: Ft(!r || l.bottom || l.left, s.bottomLeft, 0, i),
    bottomRight: Ft(!r || l.bottom || l.right, s.bottomRight, 0, i)
  };
}
function mu(e) {
  const t = Si(e), n = t.right - t.left, a = t.bottom - t.top, o = gu(e, n / 2, a / 2), s = pu(e, n / 2, a / 2);
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
function Ma(e, t, n, a) {
  const o = t === null, s = n === null, l = e && !(o && s) && Si(e, a);
  return l && (o || Bt(t, l.left, l.right)) && (s || Bt(n, l.top, l.bottom));
}
function bu(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function vu(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function Sa(e, t, n = {}) {
  const a = e.x !== n.x ? -t : 0, o = e.y !== n.y ? -t : 0, s = (e.x + e.w !== n.x + n.w ? t : 0) - a, i = (e.y + e.h !== n.y + n.h ? t : 0) - o;
  return {
    x: e.x + a,
    y: e.y + o,
    w: e.w + s,
    h: e.h + i,
    radius: e.radius
  };
}
class yu extends Mt {
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
    const { inflateAmount: n, options: { borderColor: a, backgroundColor: o } } = this, { inner: s, outer: i } = mu(this), l = bu(i.radius) ? sa : vu;
    t.save(), (i.w !== s.w || i.h !== s.h) && (t.beginPath(), l(t, Sa(i, n, s)), t.clip(), l(t, Sa(s, -n, i)), t.fillStyle = a, t.fill("evenodd")), t.beginPath(), l(t, Sa(s, n)), t.fillStyle = o, t.fill(), t.restore();
  }
  inRange(t, n, a) {
    return Ma(this, t, n, a);
  }
  inXRange(t, n) {
    return Ma(this, t, null, n);
  }
  inYRange(t, n) {
    return Ma(this, null, t, n);
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
const gs = (e, t) => {
  let { boxHeight: n = t, boxWidth: a = t } = e;
  return e.usePointStyle && (n = Math.min(n, t), a = e.pointStyleWidth || Math.min(a, t)), {
    boxWidth: a,
    boxHeight: n,
    itemHeight: Math.max(t, n)
  };
}, _u = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class ps extends Mt {
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
    let n = Be(t.generateLabels, [
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
    const a = t.labels, o = qe(a.font), s = o.size, i = this._computeTitleHeight(), { boxWidth: l, itemHeight: r } = gs(a, s);
    let c, d;
    n.font = o.string, this.isHorizontal() ? (c = this.maxWidth, d = this._fitRows(i, s, l, r) + 10) : (d = this.maxHeight, c = this._fitCols(i, o, l, r) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(d, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, n, a, o) {
    const { ctx: s, maxWidth: i, options: { labels: { padding: l } } } = this, r = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], d = o + l;
    let h = t;
    s.textAlign = "left", s.textBaseline = "middle";
    let p = -1, v = -d;
    return this.legendItems.forEach((f, y) => {
      const x = a + n / 2 + s.measureText(f.text).width;
      (y === 0 || c[c.length - 1] + x + 2 * l > i) && (h += d, c[c.length - (y > 0 ? 0 : 1)] = 0, v += d, p++), r[y] = {
        left: 0,
        top: v,
        row: p,
        width: x,
        height: o
      }, c[c.length - 1] += x + l;
    }), h;
  }
  _fitCols(t, n, a, o) {
    const { ctx: s, maxHeight: i, options: { labels: { padding: l } } } = this, r = this.legendHitBoxes = [], c = this.columnSizes = [], d = i - t;
    let h = l, p = 0, v = 0, f = 0, y = 0;
    return this.legendItems.forEach((x, m) => {
      const { itemWidth: g, itemHeight: _ } = xu(a, n, s, x, o);
      m > 0 && v + _ + 2 * l > d && (h += p + l, c.push({
        width: p,
        height: v
      }), f += p + l, y++, p = v = 0), r[m] = {
        left: f,
        top: v,
        col: y,
        width: g,
        height: _
      }, p = Math.max(p, g), v += _ + l;
    }), h += p, c.push({
      width: p,
      height: v
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: n, options: { align: a, labels: { padding: o }, rtl: s } } = this, i = an(s, this.left, this.width);
    if (this.isHorizontal()) {
      let l = 0, r = Ye(a, this.left + o, this.right - this.lineWidths[l]);
      for (const c of n)
        l !== c.row && (l = c.row, r = Ye(a, this.left + o, this.right - this.lineWidths[l])), c.top += this.top + t + o, c.left = i.leftForLtr(i.x(r), c.width), r += c.width + o;
    } else {
      let l = 0, r = Ye(a, this.top + t + o, this.bottom - this.columnSizes[l].height);
      for (const c of n)
        c.col !== l && (l = c.col, r = Ye(a, this.top + t + o, this.bottom - this.columnSizes[l].height)), c.top = r, c.left += this.left + o, c.left = i.leftForLtr(i.x(c.left), c.width), r += c.height + o;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      Za(t, this), this._draw(), Qa(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: n, lineWidths: a, ctx: o } = this, { align: s, labels: i } = t, l = Re.color, r = an(t.rtl, this.left, this.width), c = qe(i.font), { padding: d } = i, h = c.size, p = h / 2;
    let v;
    this.drawTitle(), o.textAlign = r.textAlign("left"), o.textBaseline = "middle", o.lineWidth = 0.5, o.font = c.string;
    const { boxWidth: f, boxHeight: y, itemHeight: x } = gs(i, h), m = function(S, $, M) {
      if (isNaN(f) || f <= 0 || isNaN(y) || y < 0)
        return;
      o.save();
      const F = he(M.lineWidth, 1);
      if (o.fillStyle = he(M.fillStyle, l), o.lineCap = he(M.lineCap, "butt"), o.lineDashOffset = he(M.lineDashOffset, 0), o.lineJoin = he(M.lineJoin, "miter"), o.lineWidth = F, o.strokeStyle = he(M.strokeStyle, l), o.setLineDash(he(M.lineDash, [])), i.usePointStyle) {
        const T = {
          radius: y * Math.SQRT2 / 2,
          pointStyle: M.pointStyle,
          rotation: M.rotation,
          borderWidth: F
        }, B = r.xPlus(S, f / 2), E = $ + p;
        ai(o, T, B, E, i.pointStyleWidth && f);
      } else {
        const T = $ + Math.max((h - y) / 2, 0), B = r.leftForLtr(S, f), E = nn(M.borderRadius);
        o.beginPath(), Object.values(E).some((I) => I !== 0) ? sa(o, {
          x: B,
          y: T,
          w: f,
          h: y,
          radius: E
        }) : o.rect(B, T, f, y), o.fill(), F !== 0 && o.stroke();
      }
      o.restore();
    }, g = function(S, $, M) {
      Ln(o, M.text, S, $ + x / 2, c, {
        strikethrough: M.hidden,
        textAlign: r.textAlign(M.textAlign)
      });
    }, _ = this.isHorizontal(), w = this._computeTitleHeight();
    _ ? v = {
      x: Ye(s, this.left + d, this.right - a[0]),
      y: this.top + d + w,
      line: 0
    } : v = {
      x: this.left + d,
      y: Ye(s, this.top + w + d, this.bottom - n[0].height),
      line: 0
    }, di(this.ctx, t.textDirection);
    const D = x + d;
    this.legendItems.forEach((S, $) => {
      o.strokeStyle = S.fontColor, o.fillStyle = S.fontColor;
      const M = o.measureText(S.text).width, F = r.textAlign(S.textAlign || (S.textAlign = i.textAlign)), T = f + p + M;
      let B = v.x, E = v.y;
      r.setWidth(this.width), _ ? $ > 0 && B + T + d > this.right && (E = v.y += D, v.line++, B = v.x = Ye(s, this.left + d, this.right - a[v.line])) : $ > 0 && E + D > this.bottom && (B = v.x = B + n[v.line].width + d, v.line++, E = v.y = Ye(s, this.top + w + d, this.bottom - n[v.line].height));
      const I = r.x(B);
      if (m(I, E, S), B = ir(F, B + f + p, _ ? B + T : this.right, t.rtl), g(r.x(B), E, S), _)
        v.x += T + d;
      else if (typeof S.text != "string") {
        const N = c.lineHeight;
        v.y += Di(S, N) + d;
      } else
        v.y += D;
    }), ui(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, n = t.title, a = qe(n.font), o = ct(n.padding);
    if (!n.display)
      return;
    const s = an(t.rtl, this.left, this.width), i = this.ctx, l = n.position, r = a.size / 2, c = o.top + r;
    let d, h = this.left, p = this.width;
    if (this.isHorizontal())
      p = Math.max(...this.lineWidths), d = this.top + c, h = Ye(t.align, h, this.right - p);
    else {
      const f = this.columnSizes.reduce((y, x) => Math.max(y, x.height), 0);
      d = c + Ye(t.align, this.top, this.bottom - f - t.labels.padding - this._computeTitleHeight());
    }
    const v = Ye(l, h, h + p);
    i.textAlign = s.textAlign(qa(l)), i.textBaseline = "middle", i.strokeStyle = n.color, i.fillStyle = n.color, i.font = a.string, Ln(i, n.text, v, d, a);
  }
  _computeTitleHeight() {
    const t = this.options.title, n = qe(t.font), a = ct(t.padding);
    return t.display ? n.lineHeight + a.height : 0;
  }
  _getLegendItemAt(t, n) {
    let a, o, s;
    if (Bt(t, this.left, this.right) && Bt(n, this.top, this.bottom)) {
      for (s = this.legendHitBoxes, a = 0; a < s.length; ++a)
        if (o = s[a], Bt(t, o.left, o.left + o.width) && Bt(n, o.top, o.top + o.height))
          return this.legendItems[a];
    }
    return null;
  }
  handleEvent(t) {
    const n = this.options;
    if (!Cu(t.type, n))
      return;
    const a = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const o = this._hoveredItem, s = _u(o, a);
      o && !s && Be(n.onLeave, [
        t,
        o,
        this
      ], this), this._hoveredItem = a, a && !s && Be(n.onHover, [
        t,
        a,
        this
      ], this);
    } else a && Be(n.onClick, [
      t,
      a,
      this
    ], this);
  }
}
function xu(e, t, n, a, o) {
  const s = ku(a, e, t, n), i = wu(o, a, t.lineHeight);
  return {
    itemWidth: s,
    itemHeight: i
  };
}
function ku(e, t, n, a) {
  let o = e.text;
  return o && typeof o != "string" && (o = o.reduce((s, i) => s.length > i.length ? s : i)), t + n.size / 2 + a.measureText(o).width;
}
function wu(e, t, n) {
  let a = e;
  return typeof t.text != "string" && (a = Di(t, n)), a;
}
function Di(e, t) {
  const n = e.text ? e.text.length : 0;
  return t * n;
}
function Cu(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var io = {
  id: "legend",
  _element: ps,
  start(e, t, n) {
    const a = e.legend = new ps({
      ctx: e.ctx,
      options: n,
      chart: e
    });
    lt.configure(e, a, n), lt.addBox(e, a);
  },
  stop(e) {
    lt.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, n) {
    const a = e.legend;
    lt.configure(e, a, n), a.options = n;
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
        const t = e.data.datasets, { labels: { usePointStyle: n, pointStyle: a, textAlign: o, color: s, useBorderRadius: i, borderRadius: l } } = e.legend.options;
        return e._getSortedDatasetMetas().map((r) => {
          const c = r.controller.getStyle(n ? 0 : void 0), d = ct(c.borderWidth);
          return {
            text: t[r.index].label,
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
class Ai extends Mt {
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
    const o = ze(a.text) ? a.text.length : 1;
    this._padding = ct(a.padding);
    const s = o * qe(a.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = s : this.width = s;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: n, left: a, bottom: o, right: s, options: i } = this, l = i.align;
    let r = 0, c, d, h;
    return this.isHorizontal() ? (d = Ye(l, a, s), h = n + t, c = s - a) : (i.position === "left" ? (d = a + t, h = Ye(l, o, n), r = De * -0.5) : (d = s - t, h = Ye(l, n, o), r = De * 0.5), c = o - n), {
      titleX: d,
      titleY: h,
      maxWidth: c,
      rotation: r
    };
  }
  draw() {
    const t = this.ctx, n = this.options;
    if (!n.display)
      return;
    const a = qe(n.font), s = a.lineHeight / 2 + this._padding.top, { titleX: i, titleY: l, maxWidth: r, rotation: c } = this._drawArgs(s);
    Ln(t, n.text, 0, 0, a, {
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
function $u(e, t) {
  const n = new Ai({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  lt.configure(e, n, t), lt.addBox(e, n), e.titleBlock = n;
}
var Ti = {
  id: "title",
  _element: Ai,
  start(e, t, n) {
    $u(e, n);
  },
  stop(e) {
    const t = e.titleBlock;
    lt.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, n) {
    const a = e.titleBlock;
    lt.configure(e, a, n), a.options = n;
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
const _n = {
  average(e) {
    if (!e.length)
      return !1;
    let t, n, a = /* @__PURE__ */ new Set(), o = 0, s = 0;
    for (t = 0, n = e.length; t < n; ++t) {
      const l = e[t].element;
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
  nearest(e, t) {
    if (!e.length)
      return !1;
    let n = t.x, a = t.y, o = Number.POSITIVE_INFINITY, s, i, l;
    for (s = 0, i = e.length; s < i; ++s) {
      const r = e[s].element;
      if (r && r.hasValue()) {
        const c = r.getCenterPoint(), d = Ea(t, c);
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
function pt(e, t) {
  return t && (ze(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function kt(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function Mu(e, t) {
  const { element: n, datasetIndex: a, index: o } = t, s = e.getDatasetMeta(a).controller, { label: i, value: l } = s.getLabelAndValue(o);
  return {
    chart: e,
    label: i,
    parsed: s.getParsed(o),
    raw: e.data.datasets[a].data[o],
    formattedValue: l,
    dataset: s.getDataset(),
    dataIndex: o,
    datasetIndex: a,
    element: n
  };
}
function ms(e, t) {
  const n = e.chart.ctx, { body: a, footer: o, title: s } = e, { boxWidth: i, boxHeight: l } = t, r = qe(t.bodyFont), c = qe(t.titleFont), d = qe(t.footerFont), h = s.length, p = o.length, v = a.length, f = ct(t.padding);
  let y = f.height, x = 0, m = a.reduce((w, D) => w + D.before.length + D.lines.length + D.after.length, 0);
  if (m += e.beforeBody.length + e.afterBody.length, h && (y += h * c.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), m) {
    const w = t.displayColors ? Math.max(l, r.lineHeight) : r.lineHeight;
    y += v * w + (m - v) * r.lineHeight + (m - 1) * t.bodySpacing;
  }
  p && (y += t.footerMarginTop + p * d.lineHeight + (p - 1) * t.footerSpacing);
  let g = 0;
  const _ = function(w) {
    x = Math.max(x, n.measureText(w).width + g);
  };
  return n.save(), n.font = c.string, Se(e.title, _), n.font = r.string, Se(e.beforeBody.concat(e.afterBody), _), g = t.displayColors ? i + 2 + t.boxPadding : 0, Se(a, (w) => {
    Se(w.before, _), Se(w.lines, _), Se(w.after, _);
  }), g = 0, n.font = d.string, Se(e.footer, _), n.restore(), x += f.width, {
    width: x,
    height: y
  };
}
function Su(e, t) {
  const { y: n, height: a } = t;
  return n < a / 2 ? "top" : n > e.height - a / 2 ? "bottom" : "center";
}
function Du(e, t, n, a) {
  const { x: o, width: s } = a, i = n.caretSize + n.caretPadding;
  if (e === "left" && o + s + i > t.width || e === "right" && o - s - i < 0)
    return !0;
}
function Au(e, t, n, a) {
  const { x: o, width: s } = n, { width: i, chartArea: { left: l, right: r } } = e;
  let c = "center";
  return a === "center" ? c = o <= (l + r) / 2 ? "left" : "right" : o <= s / 2 ? c = "left" : o >= i - s / 2 && (c = "right"), Du(c, e, t, n) && (c = "center"), c;
}
function bs(e, t, n) {
  const a = n.yAlign || t.yAlign || Su(e, n);
  return {
    xAlign: n.xAlign || t.xAlign || Au(e, t, n, a),
    yAlign: a
  };
}
function Tu(e, t) {
  let { x: n, width: a } = e;
  return t === "right" ? n -= a : t === "center" && (n -= a / 2), n;
}
function Bu(e, t, n) {
  let { y: a, height: o } = e;
  return t === "top" ? a += n : t === "bottom" ? a -= o + n : a -= o / 2, a;
}
function vs(e, t, n, a) {
  const { caretSize: o, caretPadding: s, cornerRadius: i } = e, { xAlign: l, yAlign: r } = n, c = o + s, { topLeft: d, topRight: h, bottomLeft: p, bottomRight: v } = nn(i);
  let f = Tu(t, l);
  const y = Bu(t, r, c);
  return r === "center" ? l === "left" ? f += c : l === "right" && (f -= c) : l === "left" ? f -= Math.max(d, p) + o : l === "right" && (f += Math.max(h, v) + o), {
    x: Ue(f, 0, a.width - t.width),
    y: Ue(y, 0, a.height - t.height)
  };
}
function Xn(e, t, n) {
  const a = ct(n.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - a.right : e.x + a.left;
}
function ys(e) {
  return pt([], kt(e));
}
function Lu(e, t, n) {
  return Zt(e, {
    tooltip: t,
    tooltipItems: n,
    type: "tooltip"
  });
}
function _s(e, t) {
  const n = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return n ? e.override(n) : e;
}
const Bi = {
  beforeTitle: _t,
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
  afterTitle: _t,
  beforeBody: _t,
  beforeLabel: _t,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const n = e.formattedValue;
    return Me(n) || (t += n), t;
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
  afterLabel: _t,
  afterBody: _t,
  beforeFooter: _t,
  footer: _t,
  afterFooter: _t
};
function Ge(e, t, n, a) {
  const o = e[t].call(n, a);
  return typeof o > "u" ? Bi[t].call(n, a) : o;
}
class xs extends Mt {
  static positioners = _n;
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
    const n = this.chart, a = this.options.setContext(this.getContext()), o = a.enabled && n.options.animation && a.animations, s = new fi(this.chart, o);
    return o._cacheable && (this._cachedAnimations = Object.freeze(s)), s;
  }
  getContext() {
    return this.$context || (this.$context = Lu(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, n) {
    const { callbacks: a } = n, o = Ge(a, "beforeTitle", this, t), s = Ge(a, "title", this, t), i = Ge(a, "afterTitle", this, t);
    let l = [];
    return l = pt(l, kt(o)), l = pt(l, kt(s)), l = pt(l, kt(i)), l;
  }
  getBeforeBody(t, n) {
    return ys(Ge(n.callbacks, "beforeBody", this, t));
  }
  getBody(t, n) {
    const { callbacks: a } = n, o = [];
    return Se(t, (s) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, l = _s(a, s);
      pt(i.before, kt(Ge(l, "beforeLabel", this, s))), pt(i.lines, Ge(l, "label", this, s)), pt(i.after, kt(Ge(l, "afterLabel", this, s))), o.push(i);
    }), o;
  }
  getAfterBody(t, n) {
    return ys(Ge(n.callbacks, "afterBody", this, t));
  }
  getFooter(t, n) {
    const { callbacks: a } = n, o = Ge(a, "beforeFooter", this, t), s = Ge(a, "footer", this, t), i = Ge(a, "afterFooter", this, t);
    let l = [];
    return l = pt(l, kt(o)), l = pt(l, kt(s)), l = pt(l, kt(i)), l;
  }
  _createItems(t) {
    const n = this._active, a = this.chart.data, o = [], s = [], i = [];
    let l = [], r, c;
    for (r = 0, c = n.length; r < c; ++r)
      l.push(Mu(this.chart, n[r]));
    return t.filter && (l = l.filter((d, h, p) => t.filter(d, h, p, a))), t.itemSort && (l = l.sort((d, h) => t.itemSort(d, h, a))), Se(l, (d) => {
      const h = _s(t.callbacks, d);
      o.push(Ge(h, "labelColor", this, d)), s.push(Ge(h, "labelPointStyle", this, d)), i.push(Ge(h, "labelTextColor", this, d));
    }), this.labelColors = o, this.labelPointStyles = s, this.labelTextColors = i, this.dataPoints = l, l;
  }
  update(t, n) {
    const a = this.options.setContext(this.getContext()), o = this._active;
    let s, i = [];
    if (!o.length)
      this.opacity !== 0 && (s = {
        opacity: 0
      });
    else {
      const l = _n[a.position].call(this, o, this._eventPosition);
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
    const { xAlign: o, yAlign: s } = this, { caretSize: i, cornerRadius: l } = a, { topLeft: r, topRight: c, bottomLeft: d, bottomRight: h } = nn(l), { x: p, y: v } = t, { width: f, height: y } = n;
    let x, m, g, _, w, D;
    return s === "center" ? (w = v + y / 2, o === "left" ? (x = p, m = x - i, _ = w + i, D = w - i) : (x = p + f, m = x + i, _ = w - i, D = w + i), g = x) : (o === "left" ? m = p + Math.max(r, d) + i : o === "right" ? m = p + f - Math.max(c, h) - i : m = this.caretX, s === "top" ? (_ = v, w = _ - i, x = m - i, g = m + i) : (_ = v + y, w = _ + i, x = m + i, g = m - i), D = _), {
      x1: x,
      x2: m,
      x3: g,
      y1: _,
      y2: w,
      y3: D
    };
  }
  drawTitle(t, n, a) {
    const o = this.title, s = o.length;
    let i, l, r;
    if (s) {
      const c = an(a.rtl, this.x, this.width);
      for (t.x = Xn(this, a.titleAlign, a), n.textAlign = c.textAlign(a.titleAlign), n.textBaseline = "middle", i = qe(a.titleFont), l = a.titleSpacing, n.fillStyle = a.titleColor, n.font = i.string, r = 0; r < s; ++r)
        n.fillText(o[r], c.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + l, r + 1 === s && (t.y += a.titleMarginBottom - l);
    }
  }
  _drawColorBox(t, n, a, o, s) {
    const i = this.labelColors[a], l = this.labelPointStyles[a], { boxHeight: r, boxWidth: c } = s, d = qe(s.bodyFont), h = Xn(this, "left", s), p = o.x(h), v = r < d.lineHeight ? (d.lineHeight - r) / 2 : 0, f = n.y + v;
    if (s.usePointStyle) {
      const y = {
        radius: Math.min(c, r) / 2,
        pointStyle: l.pointStyle,
        rotation: l.rotation,
        borderWidth: 1
      }, x = o.leftForLtr(p, c) + c / 2, m = f + r / 2;
      t.strokeStyle = s.multiKeyBackground, t.fillStyle = s.multiKeyBackground, Ra(t, y, x, m), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, Ra(t, y, x, m);
    } else {
      t.lineWidth = we(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const y = o.leftForLtr(p, c), x = o.leftForLtr(o.xPlus(p, 1), c - 2), m = nn(i.borderRadius);
      Object.values(m).some((g) => g !== 0) ? (t.beginPath(), t.fillStyle = s.multiKeyBackground, sa(t, {
        x: y,
        y: f,
        w: c,
        h: r,
        radius: m
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), sa(t, {
        x,
        y: f + 1,
        w: c - 2,
        h: r - 2,
        radius: m
      }), t.fill()) : (t.fillStyle = s.multiKeyBackground, t.fillRect(y, f, c, r), t.strokeRect(y, f, c, r), t.fillStyle = i.backgroundColor, t.fillRect(x, f + 1, c - 2, r - 2));
    }
    t.fillStyle = this.labelTextColors[a];
  }
  drawBody(t, n, a) {
    const { body: o } = this, { bodySpacing: s, bodyAlign: i, displayColors: l, boxHeight: r, boxWidth: c, boxPadding: d } = a, h = qe(a.bodyFont);
    let p = h.lineHeight, v = 0;
    const f = an(a.rtl, this.x, this.width), y = function(M) {
      n.fillText(M, f.x(t.x + v), t.y + p / 2), t.y += p + s;
    }, x = f.textAlign(i);
    let m, g, _, w, D, S, $;
    for (n.textAlign = i, n.textBaseline = "middle", n.font = h.string, t.x = Xn(this, x, a), n.fillStyle = a.bodyColor, Se(this.beforeBody, y), v = l && x !== "right" ? i === "center" ? c / 2 + d : c + 2 + d : 0, w = 0, S = o.length; w < S; ++w) {
      for (m = o[w], g = this.labelTextColors[w], n.fillStyle = g, Se(m.before, y), _ = m.lines, l && _.length && (this._drawColorBox(n, t, w, f, a), p = Math.max(h.lineHeight, r)), D = 0, $ = _.length; D < $; ++D)
        y(_[D]), p = h.lineHeight;
      Se(m.after, y);
    }
    v = 0, p = h.lineHeight, Se(this.afterBody, y), t.y -= s;
  }
  drawFooter(t, n, a) {
    const o = this.footer, s = o.length;
    let i, l;
    if (s) {
      const r = an(a.rtl, this.x, this.width);
      for (t.x = Xn(this, a.footerAlign, a), t.y += a.footerMarginTop, n.textAlign = r.textAlign(a.footerAlign), n.textBaseline = "middle", i = qe(a.footerFont), n.fillStyle = a.footerColor, n.font = i.string, l = 0; l < s; ++l)
        n.fillText(o[l], r.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + a.footerSpacing;
    }
  }
  drawBackground(t, n, a, o) {
    const { xAlign: s, yAlign: i } = this, { x: l, y: r } = t, { width: c, height: d } = a, { topLeft: h, topRight: p, bottomLeft: v, bottomRight: f } = nn(o.cornerRadius);
    n.fillStyle = o.backgroundColor, n.strokeStyle = o.borderColor, n.lineWidth = o.borderWidth, n.beginPath(), n.moveTo(l + h, r), i === "top" && this.drawCaret(t, n, a, o), n.lineTo(l + c - p, r), n.quadraticCurveTo(l + c, r, l + c, r + p), i === "center" && s === "right" && this.drawCaret(t, n, a, o), n.lineTo(l + c, r + d - f), n.quadraticCurveTo(l + c, r + d, l + c - f, r + d), i === "bottom" && this.drawCaret(t, n, a, o), n.lineTo(l + v, r + d), n.quadraticCurveTo(l, r + d, l, r + d - v), i === "center" && s === "left" && this.drawCaret(t, n, a, o), n.lineTo(l, r + h), n.quadraticCurveTo(l, r, l + h, r), n.closePath(), n.fill(), o.borderWidth > 0 && n.stroke();
  }
  _updateAnimationTarget(t) {
    const n = this.chart, a = this.$animations, o = a && a.x, s = a && a.y;
    if (o || s) {
      const i = _n[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const l = this._size = ms(this, t), r = Object.assign({}, i, this._size), c = bs(n, t, r), d = vs(t, r, c, n);
      (o._to !== d.x || s._to !== d.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = l.width, this.height = l.height, this.caretX = i.x, this.caretY = i.y, this._resolveAnimations().update(this, d));
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
    const i = ct(n.padding), l = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    n.enabled && l && (t.save(), t.globalAlpha = a, this.drawBackground(s, t, o, n), di(t, n.textDirection), s.y += i.top, this.drawTitle(s, t, n), this.drawBody(s, t, n), this.drawFooter(s, t, n), ui(t, n.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, n) {
    const a = this._active, o = t.map(({ datasetIndex: l, index: r }) => {
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
  handleEvent(t, n, a = !0) {
    if (n && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const o = this.options, s = this._active || [], i = this._getActiveElements(t, s, n, a), l = this._positionChanged(i, t), r = n || !na(i, s) || l;
    return r && (this._active = i, (o.enabled || o.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, n))), r;
  }
  _getActiveElements(t, n, a, o) {
    const s = this.options;
    if (t.type === "mouseout")
      return [];
    if (!o)
      return n.filter((l) => this.chart.data.datasets[l.datasetIndex] && this.chart.getDatasetMeta(l.datasetIndex).controller.getParsed(l.index) !== void 0);
    const i = this.chart.getElementsAtEventForMode(t, s.mode, s, a);
    return s.reverse && i.reverse(), i;
  }
  _positionChanged(t, n) {
    const { caretX: a, caretY: o, options: s } = this, i = _n[s.position].call(this, t, n);
    return i !== !1 && (a !== i.x || o !== i.y);
  }
}
var lo = {
  id: "tooltip",
  _element: xs,
  positioners: _n,
  afterInit(e, t, n) {
    n && (e.tooltip = new xs({
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
const Fu = (e, t, n, a) => (typeof t == "string" ? (n = e.push(t) - 1, a.unshift({
  index: n,
  label: t
})) : isNaN(t) && (n = null), n);
function Pu(e, t, n, a) {
  const o = e.indexOf(t);
  if (o === -1)
    return Fu(e, t, n, a);
  const s = e.lastIndexOf(t);
  return o !== s ? n : o;
}
const Eu = (e, t) => e === null ? null : Ue(Math.round(e), 0, t);
function ks(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Li extends cn {
  static id = "category";
  static defaults = {
    ticks: {
      callback: ks
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
    if (Me(t))
      return null;
    const a = this.getLabels();
    return n = isFinite(n) && a[n] === t ? n : Pu(a, t, he(n, t), this._addedLabels), Eu(n, a.length - 1);
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
    return ks.call(this, t);
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
function Iu(e, t) {
  const n = [], { bounds: o, step: s, min: i, max: l, precision: r, count: c, maxTicks: d, maxDigits: h, includeBounds: p } = e, v = s || 1, f = d - 1, { min: y, max: x } = t, m = !Me(i), g = !Me(l), _ = !Me(c), w = (x - y) / (h + 1);
  let D = wo((x - y) / f / v) * v, S, $, M, F;
  if (D < 1e-14 && !m && !g)
    return [
      {
        value: y
      },
      {
        value: x
      }
    ];
  F = Math.ceil(x / D) - Math.floor(y / D), F > f && (D = wo(F * D / f / v) * v), Me(r) || (S = Math.pow(10, r), D = Math.ceil(D * S) / S), o === "ticks" ? ($ = Math.floor(y / D) * D, M = Math.ceil(x / D) * D) : ($ = y, M = x), m && g && s && Zl((l - i) / s, D / 1e3) ? (F = Math.round(Math.min((l - i) / D, d)), D = (l - i) / F, $ = i, M = l) : _ ? ($ = m ? i : $, M = g ? l : M, F = c - 1, D = (M - $) / F) : (F = (M - $) / D, kn(F, Math.round(F), D / 1e3) ? F = Math.round(F) : F = Math.ceil(F));
  const T = Math.max(Co(D), Co($));
  S = Math.pow(10, Me(r) ? T : r), $ = Math.round($ * S) / S, M = Math.round(M * S) / S;
  let B = 0;
  for (m && (p && $ !== i ? (n.push({
    value: i
  }), $ < i && B++, kn(Math.round(($ + B * D) * S) / S, i, ws(i, w, e)) && B++) : $ < i && B++); B < F; ++B) {
    const E = Math.round(($ + B * D) * S) / S;
    if (g && E > l)
      break;
    n.push({
      value: E
    });
  }
  return g && p && M !== l ? n.length && kn(n[n.length - 1].value, l, ws(l, w, e)) ? n[n.length - 1].value = l : n.push({
    value: l
  }) : (!g || M === l) && n.push({
    value: M
  }), n;
}
function ws(e, t, { horizontal: n, minRotation: a }) {
  const o = Ct(a), s = (n ? Math.sin(o) : Math.cos(o)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / s, i);
}
class Ru extends cn {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, n) {
    return Me(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: n, maxDefined: a } = this.getUserBounds();
    let { min: o, max: s } = this;
    const i = (r) => o = n ? o : r, l = (r) => s = a ? s : r;
    if (t) {
      const r = bt(o), c = bt(s);
      r < 0 && c < 0 ? l(0) : r > 0 && c > 0 && i(0);
    }
    if (o === s) {
      let r = s === 0 ? 1 : Math.abs(s * 0.05);
      l(s + r), t || i(o - r);
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
    }, s = this._range || this, i = Iu(o, s);
    return t.bounds === "ticks" && Ql(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
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
    return Ga(t, this.chart.options.locale, this.options.ticks.format);
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
    const { min: t, max: n } = this.getMinMax(!0);
    this.min = rt(t) ? t : 0, this.max = rt(n) ? n : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), n = t ? this.width : this.height, a = Ct(this.options.ticks.minRotation), o = (t ? Math.sin(a) : Math.cos(a)) || 1e-3, s = this._resolveTickFontOptions(0);
    return Math.ceil(n / Math.min(40, s.lineHeight / o));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
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
}, Je = /* @__PURE__ */ Object.keys(ga);
function Cs(e, t) {
  return e - t;
}
function $s(e, t) {
  if (Me(t))
    return null;
  const n = e._adapter, { parser: a, round: o, isoWeekday: s } = e._parseOpts;
  let i = t;
  return typeof a == "function" && (i = a(i)), rt(i) || (i = typeof a == "string" ? n.parse(i, a) : n.parse(i)), i === null ? null : (o && (i = o === "week" && (An(s) || s === !0) ? n.startOf(i, "isoWeek", s) : n.startOf(i, o)), +i);
}
function Ms(e, t, n, a) {
  const o = Je.length;
  for (let s = Je.indexOf(e); s < o - 1; ++s) {
    const i = ga[Je[s]], l = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((n - t) / (l * i.size)) <= a)
      return Je[s];
  }
  return Je[o - 1];
}
function Ou(e, t, n, a, o) {
  for (let s = Je.length - 1; s >= Je.indexOf(n); s--) {
    const i = Je[s];
    if (ga[i].common && e._adapter.diff(o, a, i) >= t - 1)
      return i;
  }
  return Je[n ? Je.indexOf(n) : 0];
}
function Vu(e) {
  for (let t = Je.indexOf(e) + 1, n = Je.length; t < n; ++t)
    if (ga[Je[t]].common)
      return Je[t];
}
function Ss(e, t, n) {
  if (!n)
    e[t] = !0;
  else if (n.length) {
    const { lo: a, hi: o } = Ua(n, t), s = n[a] >= t ? n[a] : n[o];
    e[s] = !0;
  }
}
function zu(e, t, n, a) {
  const o = e._adapter, s = +o.startOf(t[0].value, a), i = t[t.length - 1].value;
  let l, r;
  for (l = s; l <= i; l = +o.add(l, 1, a))
    r = n[l], r >= 0 && (t[r].major = !0);
  return t;
}
function Ds(e, t, n) {
  const a = [], o = {}, s = t.length;
  let i, l;
  for (i = 0; i < s; ++i)
    l = t[i], o[l] = i, a.push({
      value: l,
      major: !1
    });
  return s === 0 || !n ? a : zu(e, a, o, n);
}
class As extends cn {
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
    const a = t.time || (t.time = {}), o = this._adapter = new Nc._date(t.adapters.date);
    o.init(n), xn(a.displayFormats, o.formats()), this._parseOpts = {
      parser: a.parser,
      round: a.round,
      isoWeekday: a.isoWeekday
    }, super.init(t), this._normalized = n.normalized;
  }
  parse(t, n) {
    return t === void 0 ? null : $s(this, t);
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
    let { min: o, max: s, minDefined: i, maxDefined: l } = this.getUserBounds();
    function r(c) {
      !i && !isNaN(c.min) && (o = Math.min(o, c.min)), !l && !isNaN(c.max) && (s = Math.max(s, c.max));
    }
    (!i || !l) && (r(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && r(this.getMinMax(!1))), o = rt(o) && !isNaN(o) ? o : +n.startOf(Date.now(), a), s = rt(s) && !isNaN(s) ? s : +n.endOf(Date.now(), a) + 1, this.min = Math.min(o, s - 1), this.max = Math.max(o + 1, s);
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
    const t = this.options, n = t.time, a = t.ticks, o = a.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && o.length && (this.min = this._userMin || o[0], this.max = this._userMax || o[o.length - 1]);
    const s = this.min, i = this.max, l = ar(o, s, i);
    return this._unit = n.unit || (a.autoSkip ? Ms(n.minUnit, this.min, this.max, this._getLabelCapacity(s)) : Ou(this, l.length, n.minUnit, this.min, this.max)), this._majorUnit = !a.major.enabled || this._unit === "year" ? void 0 : Vu(this._unit), this.initOffsets(o), t.reverse && l.reverse(), Ds(this, l, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let n = 0, a = 0, o, s;
    this.options.offset && t.length && (o = this.getDecimalForValue(t[0]), t.length === 1 ? n = 1 - o : n = (this.getDecimalForValue(t[1]) - o) / 2, s = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? a = s : a = (s - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    n = Ue(n, 0, i), a = Ue(a, 0, i), this._offsets = {
      start: n,
      end: a,
      factor: 1 / (n + 1 + a)
    };
  }
  _generate() {
    const t = this._adapter, n = this.min, a = this.max, o = this.options, s = o.time, i = s.unit || Ms(s.minUnit, n, a, this._getLabelCapacity(n)), l = he(o.ticks.stepSize, 1), r = i === "week" ? s.isoWeekday : !1, c = An(r) || r === !0, d = {};
    let h = n, p, v;
    if (c && (h = +t.startOf(h, "isoWeek", r)), h = +t.startOf(h, c ? "day" : i), t.diff(a, n, i) > 1e5 * l)
      throw new Error(n + " and " + a + " are too far apart with stepSize of " + l + " " + i);
    const f = o.ticks.source === "data" && this.getDataTimestamps();
    for (p = h, v = 0; p < a; p = +t.add(p, l, i), v++)
      Ss(d, p, f);
    return (p === a || o.bounds === "ticks" || v === 1) && Ss(d, p, f), Object.keys(d).sort(Cs).map((y) => +y);
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
      return Be(i, [
        t,
        n,
        a
      ], this);
    const l = s.time.displayFormats, r = this._unit, c = this._majorUnit, d = r && l[r], h = c && l[c], p = a[n], v = c && h && p && p.major;
    return this._adapter.format(t, o || (v ? h : d));
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
    const n = this.options.ticks, a = this.ctx.measureText(t).width, o = Ct(this.isHorizontal() ? n.maxRotation : n.minRotation), s = Math.cos(o), i = Math.sin(o), l = this._resolveTickFontOptions(0).size;
    return {
      w: a * s + l * i,
      h: a * i + l * s
    };
  }
  _getLabelCapacity(t) {
    const n = this.options.time, a = n.displayFormats, o = a[n.unit] || a.millisecond, s = this._tickFormatFunction(t, 0, Ds(this, [
      t
    ], this._majorUnit), o), i = this._getLabelSize(s), l = Math.floor(this.isHorizontal() ? this.width / i.w : this.height / i.h) - 1;
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
      t.push($s(this, o[n]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Js(t.sort(Cs));
  }
}
function Gn(e, t, n) {
  let a = 0, o = e.length - 1, s, i, l, r;
  n ? (t >= e[a].pos && t <= e[o].pos && ({ lo: a, hi: o } = Kt(e, "pos", t)), { pos: s, time: l } = e[a], { pos: i, time: r } = e[o]) : (t >= e[a].time && t <= e[o].time && ({ lo: a, hi: o } = Kt(e, "time", t)), { time: s, pos: l } = e[a], { time: i, pos: r } = e[o]);
  const c = i - s;
  return c ? l + (r - l) * (t - s) / c : l;
}
class k$ extends As {
  static id = "timeseries";
  static defaults = As.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(t);
    this._minPos = Gn(n, this.min), this._tableRange = Gn(n, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: n, max: a } = this, o = [], s = [];
    let i, l, r, c, d;
    for (i = 0, l = t.length; i < l; ++i)
      c = t[i], c >= n && c <= a && o.push(c);
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
    return (Gn(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const n = this._offsets, a = this.getDecimalForPixel(t) / n.factor - n.end;
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
}, ju = {
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
}, Wu = ul[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function en(e) {
  return js(e) ? Fa(e) : e;
}
function Hu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return js(t) ? new Proxy(e, {}) : e;
}
function Yu(e, t) {
  const n = e.options;
  n && t && Object.assign(n, t);
}
function Ei(e, t) {
  e.labels = t;
}
function Ii(e, t, n) {
  const a = [];
  e.datasets = t.map((o) => {
    const s = e.datasets.find((i) => i[n] === o[n]);
    return !s || !o.data || a.includes(s) ? {
      ...o
    } : (a.push(s), Object.assign(s, o), s);
  });
}
function Ku(e, t) {
  const n = {
    labels: [],
    datasets: []
  };
  return Ei(n, e.labels), Ii(n, e.datasets, t), n;
}
const Uu = J({
  props: ju,
  setup(e, t) {
    let { expose: n, slots: a } = t;
    const o = oe(null), s = Ns(null);
    n({
      chart: s
    });
    const i = () => {
      if (!o.value) return;
      const { type: c, data: d, options: h, plugins: p, datasetIdKey: v } = e, f = Ku(d, v), y = Hu(f, d);
      s.value = new Vt(o.value, {
        type: c,
        data: y,
        options: {
          ...h
        },
        plugins: p
      });
    }, l = () => {
      const c = Fa(s.value);
      c && (e.destroyDelay > 0 ? setTimeout(() => {
        c.destroy(), s.value = null;
      }, e.destroyDelay) : (c.destroy(), s.value = null));
    }, r = (c) => {
      c.update(e.updateMode);
    };
    return tt(i), ht(l), Le([
      () => e.options,
      () => e.data
    ], (c, d) => {
      let [h, p] = c, [v, f] = d;
      const y = Fa(s.value);
      if (!y)
        return;
      let x = !1;
      if (h) {
        const m = en(h), g = en(v);
        m && m !== g && (Yu(y, m), x = !0);
      }
      if (p) {
        const m = en(p.labels), g = en(f.labels), _ = en(p.datasets), w = en(f.datasets);
        m !== g && (Ei(y.config.data, m), x = !0), _ && _ !== w && (Ii(y.config.data, _, e.datasetIdKey), x = !0);
      }
      x && Ve(() => {
        r(y);
      });
    }, {
      deep: !0
    }), () => La("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: o
    }, [
      La("p", {}, [
        a.default ? a.default() : ""
      ])
    ]);
  }
});
function ro(e, t) {
  return Vt.register(t), J({
    props: Pi,
    setup(n, a) {
      let { expose: o } = a;
      const s = Ns(null), i = (l) => {
        s.value = l?.chart;
      };
      return o({
        chart: s
      }), () => La(Uu, Wu({
        ref: i
      }, {
        type: e,
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
function ve(e) {
  const t = oe("light");
  let n = null;
  const a = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", o = C(() => e?.value ? e.value : t.value), s = C(() => o.value === "dark"), i = C(() => s.value ? Bs : Ts), l = () => {
    typeof document > "u" || (t.value = a(), n = new MutationObserver((c) => {
      for (const d of c)
        d.attributeName === "class" && (t.value = a());
    }), n.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class"]
    }));
  }, r = () => {
    n && (n.disconnect(), n = null);
  };
  return tt(() => {
    l();
  }), ht(() => {
    r();
  }), e && Le(e, () => {
  }), {
    isDark: s,
    currentTheme: o,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: Ts,
    darkColors: Bs,
    chartSeriesColors: Zu
  };
}
const co = 5, uo = 8, Qu = /^x\d*$/, Ju = /^y\d*$/;
function Ri(e) {
  if (!e || typeof e != "object") return e;
  const t = { ...e }, n = t.scales;
  if (!n || typeof n != "object") return t;
  const a = { ...n };
  for (const o of Object.keys(a)) {
    const s = a[o];
    if (!s || typeof s != "object") continue;
    const i = { ...s }, l = i.ticks, r = l && typeof l == "object" ? { ...l } : {};
    Qu.test(o) && (r.maxTicksLimit = uo, r.autoSkip = !0, r.minRotation = 0, r.maxRotation = 0, r.autoSkipPadding = r.autoSkipPadding ?? 8), Ju.test(o) && (r.maxTicksLimit = co), i.ticks = r, a[o] = i;
  }
  return t.scales = a, t;
}
const Ze = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", eh = ["titleFont", "bodyFont", "footerFont"];
function Oi(e, t = Ze) {
  if (!e || typeof e != "object") return e;
  const n = { ...e }, a = typeof n.font == "object" && n.font !== null ? n.font : {};
  if (n.font = { ...a, family: t }, n.scales && typeof n.scales == "object") {
    const o = { ...n.scales };
    for (const s of Object.keys(o)) {
      const i = o[s];
      if (!i || typeof i != "object") continue;
      const l = { ...i }, r = l.ticks;
      if (r && typeof r == "object") {
        const d = { ...r }, h = typeof d.font == "object" && d.font !== null ? d.font : {};
        d.font = { ...h, family: t }, l.ticks = d;
      }
      const c = l.title;
      if (c && typeof c == "object") {
        const d = { ...c }, h = typeof d.font == "object" && d.font !== null ? d.font : {};
        d.font = { ...h, family: t }, l.title = d;
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
        c.font = { ...d, family: t }, l.labels = c;
      }
      o.legend = l;
    }
    const i = o.tooltip;
    if (i && typeof i == "object") {
      const l = { ...i };
      for (const r of eh) {
        const c = l[r];
        c && typeof c == "object" && (l[r] = { ...c, family: t });
      }
      o.tooltip = l;
    }
    n.plugins = o;
  }
  return n;
}
const th = { class: "relative h-[230px] w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Ls = 10, nh = /* @__PURE__ */ J({
  __name: "ChartBar",
  props: {
    data: {},
    options: {},
    stacked: { type: Boolean },
    uppercaseLegendLabels: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Vt.register(Li, Fi, yu, Ti, lo, io), Vt.defaults.font.family = Ze;
    const { isDark: a, colors: o } = ve(pe(n, "theme")), s = C(() => n.data), i = (d) => typeof d == "string" ? d.charAt(0).toUpperCase() + d.slice(1).toLowerCase() : d, l = (d) => typeof d != "string" ? d : n.uppercaseLegendLabels ? d.toUpperCase() : i(d);
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
          family: Ze
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
                family: Ze,
                size: 13,
                weight: "500"
              },
              padding: 12,
              boxWidth: Ls,
              boxHeight: Ls,
              usePointStyle: !1,
              generateLabels: function(p) {
                return p.data.datasets.map((f, y) => {
                  const x = Array.isArray(f.backgroundColor) ? f.backgroundColor[0] : f.backgroundColor, m = Array.isArray(f.borderColor) ? f.borderColor[0] : f.borderColor, g = typeof m == "string" && m.length > 0 ? m : typeof x == "string" && x.length > 0 ? x : o.value.textSecondary;
                  return {
                    text: l(f.label || ""),
                    fillStyle: typeof x == "string" ? x : g,
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
              family: Ze,
              size: 13,
              weight: "600"
            },
            bodyFont: {
              family: Ze,
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
                family: Ze,
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
                family: Ze,
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
    return t({ isDark: a }), (d, h) => (b(), k("div", th, [
      R(L(qu), {
        data: s.value,
        options: c.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), re = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, o] of t)
    n[a] = o;
  return n;
}, vt = /* @__PURE__ */ re(nh, [["__scopeId", "data-v-ee7ca6f2"]]), ah = { class: "chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] min-w-0" }, oh = { class: "chart-line-canvas-host relative min-h-0 w-full flex-1" }, sh = {
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
  setup(e, { expose: t }) {
    const n = e;
    Vt.register(
      Li,
      Fi,
      fu,
      hu,
      Ti,
      lo,
      io
    ), Vt.defaults.font.family = Ze;
    const a = oe(null), { isDark: o, colors: s } = ve(pe(n, "theme")), i = C(() => s.value.bgCard), l = C(() => {
      const x = i.value;
      return {
        labels: n.data.labels,
        datasets: n.data.datasets.map((m) => {
          const g = m.borderColor, _ = Array.isArray(g) ? g[0] : g, w = typeof _ == "string" && _.length > 0 ? _ : s.value.textSecondary, D = m.pointBackgroundColor !== void 0 ? m.pointBackgroundColor : x, S = m.pointHoverBackgroundColor !== void 0 ? m.pointHoverBackgroundColor : D, $ = m.pointBorderWidth ?? 2, M = m.pointHoverBorderWidth ?? $;
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
    }), r = (x) => typeof x == "string" ? x.charAt(0).toUpperCase() + x.slice(1).toLowerCase() : x, c = (x) => typeof x != "string" ? x : n.uppercaseLegendLabels ? x.toUpperCase() : r(x);
    function d(x) {
      const m = x.borderColor, g = Array.isArray(m) ? m[0] : m;
      return typeof g == "string" && g.length > 0 ? g : s.value.textSecondary;
    }
    const h = C(
      () => l.value.datasets.map((x, m) => ({
        key: `${x.label ?? "dataset"}-${m}`,
        label: c(x.label || ""),
        color: d(x)
      }))
    ), p = oe([]);
    Le(
      () => l.value.datasets.length,
      (x) => {
        const m = Array.from({ length: x }, (g, _) => p.value[_] ?? !0);
        p.value = m;
      },
      { immediate: !0 }
    );
    function v(x) {
      const g = a.value?.chart;
      if (!g || x < 0 || x >= g.data.datasets.length) return;
      const _ = !g.isDatasetVisible(x);
      g.setDatasetVisibility(x, _), p.value[x] = _, g.update();
    }
    function f(x, m) {
      if (m == null) return x;
      if (Array.isArray(m) || typeof m != "object" || x == null || Array.isArray(x) || typeof x != "object") return m;
      const g = { ...x };
      for (const _ of Object.keys(m)) {
        const w = m[_];
        w !== void 0 && (g[_] = f(x[_], w));
      }
      return g;
    }
    const y = C(() => {
      const x = {
        font: {
          family: Ze
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
              family: Ze,
              size: 14,
              weight: "600"
            },
            bodyFont: {
              family: Ze,
              size: 13
            },
            callbacks: {
              title: function(_) {
                return _.length > 0 ? String(r(_[0].label)) : "";
              },
              label: function(_) {
                let w = String(r(_.dataset.label || ""));
                return w && (w += ": "), _.parsed.y !== null && (w += _.parsed.y), w;
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
                family: Ze,
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
                family: Ze,
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
      }, m = n.options ? f(x, n.options) : x;
      return Oi(
        Ri(m)
      );
    });
    return t({ isDark: o }), (x, m) => (b(), k("div", ah, [
      u("div", oh, [
        R(L(Xu), {
          ref_key: "lineChartRef",
          ref: a,
          data: l.value,
          options: y.value
        }, null, 8, ["data", "options"])
      ]),
      h.value.length > 0 ? (b(), k("ul", sh, [
        (b(!0), k(Z, null, ie(h.value, (g, _) => (b(), k("li", {
          key: g.key,
          role: "listitem"
        }, [
          u("button", {
            type: "button",
            class: U(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", p.value[_] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: ye({ color: g.color }),
            "aria-pressed": p.value[_] !== !1,
            "aria-label": `${g.label}. ${p.value[_] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (w) => v(_)
          }, [
            u("span", lh, [
              m[0] || (m[0] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1)),
              u("span", {
                class: "relative z-[1] box-border size-2 shrink-0 rounded-full border-2 bg-transparent",
                style: ye({ borderColor: g.color })
              }, null, 4),
              m[1] || (m[1] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1))
            ]),
            u("span", null, A(g.label), 1)
          ], 14, ih)
        ]))), 128))
      ])) : V("", !0)
    ]));
  }
}), ft = /* @__PURE__ */ re(rh, [["__scopeId", "data-v-fc764ffb"]]), ch = { class: "chart-container" }, dh = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", uh = /* @__PURE__ */ J({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Vt.register(nu, lo, io);
    const { isDark: a, colors: o } = ve(pe(n, "theme")), s = n.data, i = (r) => typeof r == "string" ? r.charAt(0).toUpperCase() + r.slice(1).toLowerCase() : r, l = C(() => n.options ? n.options : {
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
                const v = r.getDatasetMeta(0).controller.getStyle(h), y = c.datasets[0].data[h], x = typeof v.backgroundColor == "string" && v.backgroundColor.length > 0 ? v.backgroundColor : o.value.textSecondary;
                return {
                  text: `${i(d)}: ${y}`,
                  fillStyle: v.backgroundColor,
                  strokeStyle: v.borderColor,
                  lineWidth: v.borderWidth,
                  lineDash: v.borderDash,
                  lineDashOffset: v.borderDashOffset,
                  lineJoin: v.borderJoinStyle,
                  fontColor: x,
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
    return t({ isDark: a }), (r, c) => (b(), k("div", ch, [
      R(L(Gu), {
        data: L(s),
        options: l.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), pa = /* @__PURE__ */ re(uh, [["__scopeId", "data-v-0f7806d6"]]), hh = { class: "chart-container" }, fh = ["viewBox"], gh = ["transform"], ph = ["x", "width", "fill", "stroke"], mh = ["fill"], bh = ["x1", "y1", "x2", "y2", "stroke"], vh = ["points", "fill"], yh = ["x1", "y1", "x2", "y2", "stroke"], _h = ["x", "y", "fill"], xh = ["x1", "y1", "x2", "y2", "stroke"], kh = ["points", "fill"], wh = ["transform"], Ch = ["y1", "y2"], $h = ["y1", "y2"], Mh = ["y1", "y2"], Sh = ["y1", "y2"], Dh = ["y", "height"], Ah = ["y1", "y2"], Th = ["y1", "y2"], Bh = ["y1", "y2"], Lh = ["y1", "y2"], Fh = ["y", "height"], Ph = ["cy", "stroke", "onMouseenter"], Eh = ["cy", "stroke", "onMouseenter"], Ih = ["cy", "stroke", "onMouseenter"], Rh = ["cy", "stroke", "onMouseenter"], Oh = ["y1", "y2", "onMouseenter"], Vh = ["y1", "y2", "onMouseenter"], zh = ["x", "y", "fill"], Nh = ["x", "y", "fill"], jh = ["transform"], Wh = { transform: "translate(-200, 0)" }, Hh = ["stroke"], Yh = ["fill"], Kh = { transform: "translate(-130, 0)" }, Uh = ["stroke"], qh = ["fill"], Xh = { transform: "translate(-60, 0)" }, Gh = ["stroke"], Zh = ["fill"], Qh = { transform: "translate(10, 0)" }, Jh = ["stroke"], ef = ["fill"], tf = { transform: "translate(80, 0)" }, nf = ["fill"], af = { transform: "translate(150, 0)" }, of = ["fill"], sf = /* @__PURE__ */ J({
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
    const n = e, { isDark: a } = ve(pe(n, "theme")), o = C(() => ({
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
    })), s = oe({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), i = (p) => typeof p == "string" ? p.charAt(0).toUpperCase() + p.slice(1).toLowerCase() : p, l = (p, v) => {
      const f = p.currentTarget.closest("svg");
      if (!f) return;
      const y = f.getBoundingClientRect(), x = f.createSVGPoint();
      x.x = p.clientX - y.left, x.y = p.clientY - y.top, s.value = {
        visible: !0,
        x: x.x,
        y: x.y - 20,
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
        const x = y, m = (x - 1) / 9, g = n.chartMargin + f - m * f;
        p.push({ value: x, y: g });
      }
      return p;
    });
    return t({ isDark: a }), (p, v) => (b(), k("div", hh, [
      (b(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: ye(`min-height: ${e.chartHeight}px;`),
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
        ], 8, gh)) : V("", !0),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, bh),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: o.value.axis
        }, null, 8, vh),
        (b(!0), k(Z, null, ie(h.value, (f, y) => (b(), k(Z, { key: y }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: f.y,
            x2: e.chartMargin,
            y2: f.y,
            stroke: o.value.tickLine,
            "stroke-width": "1"
          }, null, 8, yh),
          u("text", {
            x: e.chartMargin - 12,
            y: f.y + 4,
            "text-anchor": "end",
            fill: o.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(f.value), 9, _h)
        ], 64))), 128)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, xh),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: o.value.axis
        }, null, 8, kh),
        (b(!0), k(Z, null, ie(e.boxplotData, (f, y) => (b(), k(Z, { key: y }, [
          u("g", {
            transform: `translate(${f.centerX}, 0)`
          }, [
            f.isTotal ? (b(), k(Z, { key: 0 }, [
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
            ], 64)) : (b(), k(Z, { key: 1 }, [
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
              onMouseenter: (x) => l(x, `Min: ${f.min.toFixed(1)}`),
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
              onMouseenter: (x) => l(x, `Q1: ${f.q1.toFixed(1)}`),
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
              onMouseenter: (x) => l(x, `Q3: ${f.q3.toFixed(1)}`),
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
              onMouseenter: (x) => l(x, `Max: ${f.max.toFixed(1)}`),
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
              onMouseenter: (x) => l(x, `Median: ${f.median.toFixed(1)}`),
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
              onMouseenter: (x) => l(x, `Avg: ${f.average.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Vh)) : V("", !0)
          ], 8, wh),
          u("text", {
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: o.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(i(f.label)), 9, zh),
          f.responseCount ? (b(), k("text", {
            key: 0,
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: o.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(f.responseCount), 9, Nh)) : V("", !0)
        ], 64))), 128)),
        e.showLegend ? (b(), k("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          u("g", Wh, [
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
            }, " Max ", 8, ef)
          ]),
          u("g", tf, [
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
        ], 8, jh)) : V("", !0)
      ], 44, fh))
    ]));
  }
}), lf = /* @__PURE__ */ re(sf, [["__scopeId", "data-v-9ac5c075"]]), rf = { class: "chart-container" }, cf = ["viewBox"], df = ["x1", "y1", "x2", "y2", "stroke"], uf = ["points", "fill"], hf = ["x1", "y1", "x2", "y2", "stroke"], ff = ["x1", "y1", "x2", "y2", "stroke"], gf = ["x", "y", "fill"], pf = ["x", "y", "fill", "transform"], mf = ["x1", "y1", "x2", "y2", "stroke"], bf = ["points", "fill"], vf = ["transform"], yf = ["y1", "y2", "stroke", "onMouseenter"], _f = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], xf = ["x1", "y1", "x2", "y2", "onMouseenter"], kf = ["x1", "y1", "x2", "y2", "onMouseenter"], wf = ["cy", "stroke", "onMouseenter"], Cf = ["cy", "stroke", "onMouseenter"], $f = ["x", "y", "fill"], Mf = ["x", "y", "fill"], Sf = ["transform"], Df = { transform: "translate(-180, 0)" }, Af = ["stroke"], Tf = ["fill"], Bf = { transform: "translate(-120, 0)" }, Lf = ["fill"], Ff = { transform: "translate(-60, 0)" }, Pf = ["fill"], Ef = { transform: "translate(0, 0)" }, If = ["stroke"], Rf = ["fill"], Of = { transform: "translate(60, 0)" }, Vf = ["fill"], zf = { transform: "translate(130, 0)" }, Nf = ["fill"], jf = ["transform"], Wf = ["x", "y", "width", "height", "fill", "stroke"], Hf = ["y", "fill"], Yf = ["y", "fill"], Zn = 10, Kf = 14, Da = 13, Fs = 4, Ps = 12, Uf = /* @__PURE__ */ J({
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
    const n = e, { isDark: a, colors: o } = ve(pe(n, "theme")), s = Zn + Da + Fs + Ps + Zn, i = C(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(g, _, w) {
      const D = w ? 0.6 : 0.535;
      return Math.ceil(Math.max(g, 1) * _ * D);
    }
    function r(g, _) {
      return Math.max(
        l(g.length, Da, !0),
        l(_.length, Ps, !1),
        52
      ) + Kf * 2;
    }
    function c(g, _, w, D) {
      const S = w / 2, $ = 6, M = Math.min(
        Math.max(g, S + $),
        n.chartWidth - S - $
      ), F = $ + D + 10, T = n.chartHeight - $ + 10, B = Math.min(Math.max(_, F), T);
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
    })), h = oe({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), p = (g) => typeof g == "string" ? g.charAt(0).toUpperCase() + g.slice(1).toLowerCase() : g, v = (g, _, w) => {
      const D = g.currentTarget.closest("svg");
      if (!D) return;
      const S = D.getBoundingClientRect(), $ = D.createSVGPoint();
      $.x = g.clientX - S.left, $.y = g.clientY - S.top;
      let M = p(_.label), F = "";
      switch (w) {
        case "body":
          F = `Q1: ${_.q1.toFixed(1)} | Q3: ${_.q3.toFixed(1)}`;
          break;
        case "wick":
          F = `Min: ${_.low.toFixed(1)} | Max: ${_.high.toFixed(1)}`;
          break;
        case "median":
          F = `Median: ${_.median.toFixed(1)}`;
          break;
        case "average":
          F = `Average: ${_.average?.toFixed(1) ?? ""}`;
          break;
        case "min":
          F = `Min: ${_.low.toFixed(1)}`;
          break;
        case "max":
          F = `Max: ${_.high.toFixed(1)}`;
          break;
      }
      const T = r(M, F), B = s;
      let E = $.x, I = $.y - 20;
      const N = c(E, I, T, B);
      E = N.x, I = N.y, h.value = {
        visible: !0,
        x: E,
        y: I,
        title: M,
        text: F,
        width: T,
        height: B
      };
    }, f = (g) => {
      if (h.value.visible) {
        const _ = g.currentTarget, w = _.getBoundingClientRect(), D = _.createSVGPoint();
        D.x = g.clientX - w.left, D.y = g.clientY - w.top;
        let S = D.x, $ = D.y - 20;
        const M = c(S, $, h.value.width, h.value.height);
        h.value.x = M.x, h.value.y = M.y;
      }
    }, y = () => {
      h.value.visible = !1;
    }, x = () => {
      h.value.visible = !1;
    }, m = C(() => {
      const g = [], w = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let D = 1; D <= 10; D++) {
        const S = D, $ = (S - 1) / 9, M = n.chartMargin + w - $ * w;
        g.push({ value: S, y: M });
      }
      return g;
    });
    return t({ isDark: a }), (g, _) => (b(), k("div", rf, [
      (b(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: ye(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: f,
        onMouseleave: y
      }, [
        _[4] || (_[4] = u("defs", null, [
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
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, df),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, uf),
        (b(!0), k(Z, null, ie(m.value, (w, D) => (b(), k("line", {
          key: `grid-${D}`,
          x1: e.chartMargin,
          y1: w.y,
          x2: e.chartWidth - e.chartMargin,
          y2: w.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, hf))), 128)),
        (b(!0), k(Z, null, ie(m.value, (w, D) => (b(), k(Z, { key: D }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: w.y,
            x2: e.chartMargin,
            y2: w.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, ff),
          u("text", {
            x: e.chartMargin - 12,
            y: w.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(w.value), 9, gf)
        ], 64))), 128)),
        u("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: d.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, A(p(e.yAxisLabel)), 9, pf),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, mf),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, bf),
        (b(!0), k(Z, null, ie(e.candlestickData, (w, D) => (b(), k(Z, { key: D }, [
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
              onMouseleave: x,
              style: { cursor: "pointer" }
            }, null, 40, yf),
            u("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(w.q1Y, w.q3Y) - (Math.abs(w.q3Y - w.q1Y) < 4 ? 4 : 0),
              width: e.candleWidth,
              height: Math.max(8, Math.abs(w.q3Y - w.q1Y)),
              fill: w.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: w.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (S) => v(S, w, "body"),
              onMouseleave: x,
              style: { cursor: "pointer" }
            }, null, 40, _f),
            w.medianY ? (b(), k("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: w.medianY,
              x2: e.candleWidth / 2,
              y2: w.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (S) => v(S, w, "median"),
              onMouseleave: x,
              style: { cursor: "pointer" }
            }, null, 40, xf)) : V("", !0),
            w.averageY ? (b(), k("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: w.averageY,
              x2: e.candleWidth / 2,
              y2: w.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (S) => v(S, w, "average"),
              onMouseleave: x,
              style: { cursor: "pointer" }
            }, null, 40, kf)) : V("", !0),
            u("circle", {
              cx: 0,
              cy: w.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (S) => v(S, w, "min"),
              onMouseleave: x,
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
              onMouseleave: x,
              style: { cursor: "pointer" }
            }, null, 40, Cf)
          ], 8, vf),
          u("text", {
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(p(w.label)), 9, $f),
          w.responseCount ? (b(), k("text", {
            key: 0,
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: d.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(w.responseCount), 9, Mf)) : V("", !0)
        ], 64))), 128)),
        e.showLegend ? (b(), k("g", {
          key: 0,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
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
            _[0] || (_[0] = u("rect", {
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
            _[1] || (_[1] = u("rect", {
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
            _[2] || (_[2] = u("line", {
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
            _[3] || (_[3] = u("line", {
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
        ], 8, Sf)) : V("", !0),
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
          }, null, 8, Wf),
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
        ], 8, jf)) : V("", !0)
      ], 44, cf))
    ]));
  }
}), qf = /* @__PURE__ */ re(Uf, [["__scopeId", "data-v-22efd66d"]]), Xf = ["viewBox"], Gf = ["x1", "y1", "x2", "y2", "stroke"], Zf = ["x1", "y1", "x2", "y2", "stroke"], Qf = ["points", "fill"], Jf = ["x1", "y1", "x2", "y2", "stroke"], eg = ["x", "y", "fill"], tg = ["x", "y", "fill", "transform"], ng = ["x1", "y1", "x2", "y2", "stroke"], ag = ["points", "fill"], og = ["x1", "y1", "x2", "y2", "stroke"], sg = ["x", "y", "fill"], ig = ["x", "y", "fill"], lg = ["d"], rg = ["x", "y", "width", "height", "onMouseenter"], cg = ["x1", "y1", "x2", "y2"], dg = ["x", "y"], ug = ["x1", "y1", "x2", "y2"], hg = ["x", "y"], fg = ["x1", "y1", "x2", "y2"], gg = ["x", "y"], pg = ["x1", "y1", "x2", "y2"], mg = ["x", "y"], bg = ["x1", "y1", "x2", "y2"], vg = ["x", "y"], yg = ["x1", "y1", "x2", "y2"], _g = ["x", "y"], xg = ["transform"], kg = { transform: "translate(-220, 0)" }, wg = ["fill"], Cg = { transform: "translate(-140, 0)" }, $g = ["fill"], Mg = { transform: "translate(-80, 0)" }, Sg = ["fill"], Dg = { transform: "translate(-20, 0)" }, Ag = ["fill"], Tg = { transform: "translate(60, 0)" }, Bg = ["fill"], Lg = { transform: "translate(130, 0)" }, Fg = ["fill"], Pg = { transform: "translate(180, 0)" }, Eg = ["fill"], Ig = ["transform"], Rg = ["x", "y", "width", "height", "fill", "stroke"], Og = ["y", "fill"], Vg = ["y", "fill"], Qn = 10, zg = 14, Aa = 13, Es = 12, Is = 4, Ng = /* @__PURE__ */ J({
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
    const n = e, { isDark: a, colors: o } = ve(pe(n, "theme")), s = Qn + Aa + Is + Es + Qn, i = C(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(W, te, ne) {
      const de = ne ? 0.6 : 0.535;
      return Math.ceil(Math.max(W, 1) * te * de);
    }
    function r(W, te) {
      return Math.max(
        l(W.length, Aa, !0),
        l(te.length, Es, !1),
        52
      ) + zg * 2;
    }
    function c(W, te, ne, de) {
      const me = ne / 2, be = 6, Te = Math.min(
        Math.max(W, me + be),
        n.chartWidth - me - be
      ), je = be + de + 10, Ie = n.chartHeight - be + 10, O = Math.min(Math.max(te, je), Ie);
      return { x: Te, y: O };
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
    })), h = oe({
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
      const W = Math.max(...n.histogram.map((ne) => ne.count || 0), 1), te = Math.max(1, Math.ceil(W * 0.2));
      return W + te;
    }), x = C(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const W = n.averageScore || 0;
      let te = 0, ne = 0;
      if (n.histogram.forEach((me) => {
        const be = me.count || 0;
        te += be;
        const Te = me.score - W;
        ne += be * (Te * Te);
      }), te === 0) return 1;
      const de = ne / te;
      return Math.sqrt(de) || 1;
    }), m = (W, te, ne) => {
      if (ne === 0) return 0;
      const de = 1 / (ne * Math.sqrt(2 * Math.PI)), me = -0.5 * Math.pow((W - te) / ne, 2);
      return de * Math.exp(me);
    }, g = C(() => {
      if (!n.histogram || n.histogram.length === 0 || n.averageScore === 0 && x.value === 0) return null;
      const W = n.averageScore, te = x.value, ne = 100, me = Math.max(...n.histogram.map((Ie) => Ie.count || 0), 1) / y.value * v.value;
      if (me <= 0) return null;
      let be = 0;
      for (let Ie = 0; Ie <= ne; Ie++) {
        const O = 1 + 9 * (Ie / ne), H = m(O, W, te);
        H > be && (be = H);
      }
      if (be <= 0) return null;
      const Te = me / be, je = [];
      for (let Ie = 0; Ie <= ne; Ie++) {
        const O = 1 + 9 * (Ie / ne), H = m(O, W, te) * Te, ae = w(O);
        if (ae !== null) {
          const fe = n.chartHeight - n.chartBottomMargin - H;
          je.push(`${Ie === 0 ? "M" : "L"} ${ae} ${fe}`);
        }
      }
      return je.join(" ");
    }), _ = C(() => {
      if (!n.histogram || n.histogram.length === 0) return [];
      const W = p.value / 10;
      return n.histogram.map((te, ne) => {
        const de = n.chartMargin + (ne + 0.5) * W, me = te.count > 0 ? te.count / y.value * v.value : 0, be = n.chartHeight - n.chartBottomMargin - me;
        return {
          score: te.score,
          count: te.count,
          x: de,
          y: be,
          height: me
        };
      });
    }), w = (W) => {
      if (W < 1 || W > 10) return null;
      const te = p.value / 10;
      return n.chartMargin + (W - 0.5) * te;
    }, D = C(() => w(n.minScore)), S = C(() => w(n.maxScore)), $ = C(() => w(n.q1Score)), M = C(() => w(n.medianScore)), F = C(() => w(n.q3Score)), T = C(() => w(n.averageScore)), B = C(() => n.minScore), E = C(() => n.maxScore), I = C(() => n.q1Score), N = C(() => n.medianScore), Y = C(() => n.q3Score), j = C(() => n.averageScore), Q = C(() => {
      const W = [], te = n.chartMargin - 8, ne = 18;
      $.value !== null && W.push({
        x: $.value,
        y: te,
        value: n.q1Score,
        label: `Q1: ${I.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), M.value !== null && W.push({
        x: M.value,
        y: te - ne,
        value: n.medianScore,
        label: `Median: ${N.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), T.value !== null && W.push({
        x: T.value,
        y: te - ne,
        value: n.averageScore,
        label: `Avg: ${j.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), F.value !== null && W.push({
        x: F.value,
        y: te,
        value: n.q3Score,
        label: `Q3: ${Y.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), W.sort((be, Te) => (be.x || 0) - (Te.x || 0));
      const de = [[], [], []];
      W.forEach((be) => {
        if (be.x === null) return;
        let Te = -1;
        for (let je = 0; je < de.length; je++) {
          let Ie = !1;
          for (const O of de[je]) {
            if (O.x === null) continue;
            const H = Math.abs(be.x - O.x), ae = (be.width + O.width) / 2 + 10;
            if (H < ae) {
              Ie = !0;
              break;
            }
          }
          if (!Ie) {
            Te = je;
            break;
          }
        }
        Te === -1 && (Te = de.length - 1), be.y = te - Te * ne, de[Te].push(be);
      });
      const me = 15;
      return W.forEach((be) => {
        be.y < me && (be.y = me);
      }), W;
    }), ee = (W) => Q.value.find((ne) => ne.id === W)?.y || n.chartMargin - 10, ce = C(() => {
      const W = [];
      for (let ne = 0; ne <= 5; ne++) {
        const de = Math.round(y.value / 5 * ne), me = n.chartHeight - n.chartBottomMargin - ne / 5 * v.value;
        W.push({ value: de, y: me });
      }
      return W;
    });
    function z(W, te, ne) {
      const de = W.createSVGPoint();
      de.x = te, de.y = ne;
      const me = W.getScreenCTM();
      if (!me) {
        const Te = W.getBoundingClientRect();
        return { x: te - Te.left, y: ne - Te.top };
      }
      const be = de.matrixTransform(me.inverse());
      return { x: be.x, y: be.y };
    }
    const K = (W, te) => {
      n.interactive && le(W, te);
    }, X = () => {
      n.interactive && xe();
    }, le = (W, te) => {
      const ne = W.currentTarget.closest("svg");
      if (!ne) return;
      const { x: de, y: me } = z(ne, W.clientX, W.clientY), be = `Score: ${te.score}`, Te = `Count: ${Number(te.count ?? 0).toLocaleString()}`, je = r(be, Te), Ie = s, O = typeof te?.x == "number" ? te.x : de;
      let H = me - 20;
      const ae = c(O, H, je, Ie);
      h.value = {
        visible: !0,
        x: ae.x,
        y: ae.y,
        title: be,
        text: Te,
        width: je,
        height: Ie,
        anchorX: typeof te?.x == "number" ? te.x : null
      };
    }, se = (W) => {
      if (n.interactive && h.value.visible) {
        const te = W.currentTarget, { x: ne, y: de } = z(te, W.clientX, W.clientY), me = h.value.anchorX, be = me != null && Number.isFinite(me) ? me : ne;
        let Te = de - 20;
        const je = c(be, Te, h.value.width, h.value.height);
        h.value.x = je.x, h.value.y = je.y;
      }
    }, Ae = () => {
      xe();
    }, xe = () => {
      h.value.visible = !1, h.value.anchorX = null;
    };
    return t({ isDark: a }), (W, te) => (b(), k("div", {
      class: U(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (b(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: ye(`min-height: ${e.chartHeight}px;`),
        onMousemove: se,
        onMouseleave: Ae
      }, [
        te[7] || (te[7] = u("defs", null, [
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
        (b(!0), k(Z, null, ie(ce.value, (ne, de) => (b(), k("line", {
          key: `grid-${de}`,
          x1: e.chartMargin,
          y1: ne.y,
          x2: e.chartWidth - e.chartMargin,
          y2: ne.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Gf))), 128)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, Zf),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, Qf),
        (b(!0), k(Z, null, ie(ce.value, (ne, de) => (b(), k(Z, {
          key: `y-tick-${de}`
        }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: ne.y,
            x2: e.chartMargin,
            y2: ne.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Jf),
          u("text", {
            x: e.chartMargin - 12,
            y: ne.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(ne.value), 9, eg)
        ], 64))), 128)),
        u("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: d.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, " Count ", 8, tg),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, ng),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, ag),
        (b(!0), k(Z, null, ie(_.value, (ne, de) => (b(), k(Z, {
          key: `tick-${de}`
        }, [
          u("line", {
            x1: ne.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: ne.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, og),
          u("text", {
            x: ne.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(ne.score), 9, sg)
        ], 64))), 128)),
        u("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
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
        }, null, 8, lg)) : V("", !0),
        (b(!0), k(Z, null, ie(_.value, (ne, de) => (b(), k("rect", {
          key: `bar-${de}`,
          x: ne.x - f.value / 2,
          y: ne.y,
          width: f.value,
          height: ne.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (me) => K(me, ne),
          onMouseleave: X,
          style: ye({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, rg))), 128)),
        D.value ? (b(), k("line", {
          key: 1,
          x1: D.value,
          y1: e.chartMargin,
          x2: D.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, cg)) : V("", !0),
        D.value ? (b(), k("text", {
          key: 2,
          x: D.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + A(B.value.toFixed(1)), 9, dg)) : V("", !0),
        $.value ? (b(), k("line", {
          key: 3,
          x1: $.value,
          y1: e.chartMargin,
          x2: $.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, ug)) : V("", !0),
        $.value ? (b(), k("text", {
          key: 4,
          x: $.value,
          y: ee("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + A(I.value.toFixed(1)), 9, hg)) : V("", !0),
        M.value ? (b(), k("line", {
          key: 5,
          x1: M.value,
          y1: e.chartMargin,
          x2: M.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, fg)) : V("", !0),
        M.value ? (b(), k("text", {
          key: 6,
          x: M.value,
          y: ee("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + A(N.value.toFixed(1)), 9, gg)) : V("", !0),
        T.value ? (b(), k("line", {
          key: 7,
          x1: T.value,
          y1: e.chartMargin,
          x2: T.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, pg)) : V("", !0),
        T.value ? (b(), k("text", {
          key: 8,
          x: T.value,
          y: ee("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + A(j.value.toFixed(1)), 9, mg)) : V("", !0),
        F.value ? (b(), k("line", {
          key: 9,
          x1: F.value,
          y1: e.chartMargin,
          x2: F.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, bg)) : V("", !0),
        F.value ? (b(), k("text", {
          key: 10,
          x: F.value,
          y: ee("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + A(Y.value.toFixed(1)), 9, vg)) : V("", !0),
        S.value ? (b(), k("line", {
          key: 11,
          x1: S.value,
          y1: e.chartMargin,
          x2: S.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, yg)) : V("", !0),
        S.value ? (b(), k("text", {
          key: 12,
          x: S.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + A(E.value.toFixed(1)), 9, _g)) : V("", !0),
        e.showLegend ? (b(), k("g", {
          key: 13,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          u("g", kg, [
            te[0] || (te[0] = u("line", {
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
            te[1] || (te[1] = u("line", {
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
            te[2] || (te[2] = u("line", {
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
            te[3] || (te[3] = u("line", {
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
            te[4] || (te[4] = u("line", {
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
            te[5] || (te[5] = u("line", {
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
            te[6] || (te[6] = u("line", {
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
        ], 8, xg)) : V("", !0),
        e.interactive && h.value.visible ? (b(), k("g", {
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
        ], 8, Ig)) : V("", !0)
      ], 44, Xf))
    ], 2));
  }
}), Vi = /* @__PURE__ */ re(Ng, [["__scopeId", "data-v-a1e39e34"]]), jg = 639, zi = 1024;
function Rs(e) {
  return e < 640 ? "mobile" : e <= zi ? "tablet" : "desktop";
}
function Wg() {
  const e = oe(
    typeof window > "u" ? "desktop" : Rs(window.innerWidth)
  ), t = () => {
    typeof window > "u" || (e.value = Rs(window.innerWidth));
  };
  let n = null, a = null, o = null, s = null;
  tt(() => {
    typeof window > "u" || (t(), n = window.matchMedia(`(max-width: ${jg}px)`), a = window.matchMedia(`(min-width: 640px) and (max-width: ${zi}px)`), o = window.matchMedia("(min-width: 1025px)"), s = () => {
      t();
    }, n.addEventListener("change", s), a.addEventListener("change", s), o.addEventListener("change", s));
  }), ht(() => {
    !s || !n || !a || !o || (n.removeEventListener("change", s), a.removeEventListener("change", s), o.removeEventListener("change", s));
  });
  const i = C(() => e.value === "mobile"), l = C(() => e.value === "tablet"), r = C(() => e.value === "desktop");
  return {
    breakpoint: e,
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
  setup(e, { expose: t }) {
    po.use([gl, pl, ml, bl]);
    const n = e, { isDark: a, colors: o } = ve(pe(n, "theme")), { breakpoint: s } = Wg(), i = oe(null), l = oe(!0), r = oe(!1);
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
        const E = M.slice(T, B), I = E.lastIndexOf(" ");
        if (I > 0)
          for (F.push(M.slice(T, T + I).trim()), T += I; T < M.length && M[T] === " "; ) T += 1;
        else
          F.push(E), T = B;
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
    })), x = (S) => ($) => {
      const M = $.dataType === "node", F = o.value.tooltipText, T = a.value ? "#d1d5db" : "#e2e8f0";
      if (M) {
        const Y = S.filter((ee) => ee.target === $.name), j = S.filter((ee) => ee.source === $.name), Q = Y.length > 0 ? Y.reduce((ee, ce) => ee + (ce.originalValue || ce.value), 0) : j.reduce((ee, ce) => ee + (ce.originalValue || ce.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${F};">${$.name}</div><div style="color: ${T}; font-size: 12px;">Count: ${Q.toLocaleString()}</div>`;
      }
      const B = $.data?.source || $.source || "Unknown", E = $.data?.target || $.target || "Unknown", I = $.data?.originalValue || $.data?.value || $.value || 0, N = $.data?.label || `${I.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${F};">${B} → ${E}</div><div style="color: ${T}; font-size: 12px;">Flow: ${N}</div>`;
    }, m = () => {
      if (!c || !n.data.nodes?.length || !n.data.links?.length) return;
      const S = h.value, $ = a.value ? "rgb(34, 34, 45)" : "rgb(240, 240, 242)", M = a.value ? "rgb(34, 34, 45)" : "rgb(240, 240, 242)";
      try {
        const { nodes: F, links: T } = f(), B = y(F), E = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: x(T),
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
                formatter: (I) => {
                  const N = I.name || "";
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
                formatter: (I) => {
                  const N = I.data?.originalValue || I.value || 0;
                  return I.data?.label || `${N.toLocaleString()}`;
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
        c.setOption(E), c.resize();
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
    }, _ = async (S = 40) => {
      await Ve();
      for (let $ = 0; $ < S; $++) {
        if (i.value?.clientWidth && i.value.clientWidth > 0 && i.value?.clientHeight && i.value.clientHeight > 0)
          return await g();
        await new Promise((M) => setTimeout(M, 50));
      }
      await g(), setTimeout(w, 50);
    }, w = () => c?.resize(), D = () => {
      window.removeEventListener("resize", w), c && (c.dispose(), c = null);
    };
    return tt(() => i.value && _()), Ws(D), Le(() => n.data, m, { deep: !0 }), Le(a, m), Le(s, m), t({ isDark: a }), (S, $) => (b(), k("div", Hg, [
      r.value ? (b(), k("div", {
        key: 0,
        class: "error-state",
        style: ye({ height: e.height })
      }, [...$[0] || ($[0] = [
        go('<div class="error-content" data-v-eb927194><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eb927194><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-eb927194></path></svg><p class="error-title" data-v-eb927194>Chart could not be loaded</p><p class="error-description" data-v-eb927194>Please check the data format.</p></div>', 1)
      ])], 4)) : (b(), k("div", Yg, [
        et(u("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content",
          style: ye({ height: e.height })
        }, null, 4), [
          [on, !l.value]
        ]),
        et(u("div", {
          class: "loading-state",
          style: ye({ height: e.height })
        }, [...$[1] || ($[1] = [
          go('<div class="loading-container" data-v-eb927194><div class="sankey-loader" data-v-eb927194><div class="flow flow-1" data-v-eb927194></div><div class="flow flow-2" data-v-eb927194></div><div class="flow flow-3" data-v-eb927194></div><div class="flow flow-4" data-v-eb927194></div></div><p class="loading-text" data-v-eb927194>Loading Sankey diagram...</p></div>', 1)
        ])], 4), [
          [on, l.value]
        ])
      ]))
    ]));
  }
}), zt = /* @__PURE__ */ re(Kg, [["__scopeId", "data-v-eb927194"]]), Ug = ["open"], qg = { class: "card-header metric-collapsible__summary" }, Xg = { class: "header-content metric-header-content" }, Gg = { class: "metric-header-content__main" }, Zg = { class: "metric-header-content__text" }, Qg = {
  key: "header-skeleton",
  class: "ut-skeleton-blink ut-skeleton-collapsible-title",
  "aria-hidden": "true",
  "aria-busy": "true"
}, Jg = {
  key: "header-content",
  class: "metric-header-content__loaded"
}, ep = {
  key: 0,
  class: "card-title"
}, tp = {
  key: 0,
  class: "card-subtitle"
}, np = {
  key: 0,
  class: "metric-header-content__export"
}, ap = {
  key: 0,
  class: "cmc-header-aside"
}, op = { class: "chart-metric-container__body" }, sp = {
  key: 1,
  class: "chart-metric-container chart-metric-container--static"
}, ip = { class: "card-header" }, lp = { class: "header-content metric-header-content" }, rp = { class: "metric-header-content__main" }, cp = { class: "metric-header-content__text" }, dp = {
  key: "header-skeleton",
  class: "ut-skeleton-container",
  "aria-hidden": "true",
  "aria-busy": "true"
}, up = {
  key: "header-content",
  class: "metric-header-content__loaded"
}, hp = {
  key: 0,
  class: "card-title"
}, fp = {
  key: 0,
  class: "card-subtitle"
}, gp = {
  key: 0,
  class: "metric-header-content__export"
}, pp = {
  key: 0,
  class: "cmc-header-aside"
}, mp = { class: "chart-metric-container__body" }, bp = /* @__PURE__ */ J({
  __name: "ChartMetricContainer",
  props: {
    title: { default: "" },
    subtitle: {},
    collapsible: { type: Boolean, default: !0 },
    defaultOpen: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, n = oe(t.defaultOpen), a = Na();
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
      if (t.collapsible && !n.value) return !1;
      const l = a.headerExport;
      return l ? o(l()) : !1;
    });
    Le(
      () => t.defaultOpen,
      (l) => {
        t.collapsible && (n.value = l);
      }
    );
    function i(l) {
      const r = l.currentTarget;
      r?.tagName === "DETAILS" && (n.value = r.open);
    }
    return (l, r) => e.collapsible ? (b(), k("details", {
      key: 0,
      class: "chart-metric-container metric-collapsible",
      open: n.value,
      onToggle: i
    }, [
      u("summary", qg, [
        u("div", Xg, [
          u("div", Gg, [
            u("div", Zg, [
              R(_e, {
                name: "chart-metric-fade",
                mode: "out-in"
              }, {
                default: P(() => [
                  e.loading ? (b(), k("div", Qg)) : (b(), k("div", Jg, [
                    Ce(l.$slots, "title", {}, () => [
                      e.title ? (b(), k("h3", ep, A(e.title), 1)) : V("", !0)
                    ], !0),
                    e.subtitle ? (b(), k("p", tp, A(e.subtitle), 1)) : V("", !0),
                    Ce(l.$slots, "headerAppend", {}, void 0, !0)
                  ]))
                ]),
                _: 3
              })
            ]),
            s.value ? (b(), k("div", np, [
              Ce(l.$slots, "headerExport", {}, void 0, !0)
            ])) : V("", !0)
          ]),
          l.$slots.headerAside ? (b(), k("div", ap, [
            Ce(l.$slots, "headerAside", {}, void 0, !0)
          ])) : V("", !0)
        ]),
        r[0] || (r[0] = u("svg", {
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
      u("div", op, [
        Ce(l.$slots, "default", {}, void 0, !0)
      ])
    ], 40, Ug)) : (b(), k("div", sp, [
      u("div", ip, [
        u("div", lp, [
          u("div", rp, [
            u("div", cp, [
              R(_e, {
                name: "chart-metric-fade",
                mode: "out-in"
              }, {
                default: P(() => [
                  e.loading ? (b(), k("div", dp, [...r[1] || (r[1] = [
                    u("div", { class: "ut-skeleton-title-subtitle" }, [
                      u("div", { class: "ut-skeleton-blink ut-skeleton-title" }),
                      u("div", { class: "ut-skeleton-blink ut-skeleton-subtitle" })
                    ], -1),
                    u("div", { class: "ut-skeleton-blink ut-skeleton-options" }, null, -1)
                  ])])) : (b(), k("div", up, [
                    Ce(l.$slots, "title", {}, () => [
                      e.title ? (b(), k("h3", hp, A(e.title), 1)) : V("", !0)
                    ], !0),
                    e.subtitle ? (b(), k("p", fp, A(e.subtitle), 1)) : V("", !0),
                    Ce(l.$slots, "headerAppend", {}, void 0, !0)
                  ]))
                ]),
                _: 3
              })
            ]),
            s.value ? (b(), k("div", gp, [
              Ce(l.$slots, "headerExport", {}, void 0, !0)
            ])) : V("", !0)
          ]),
          l.$slots.headerAside ? (b(), k("div", pp, [
            Ce(l.$slots, "headerAside", {}, void 0, !0)
          ])) : V("", !0)
        ])
      ]),
      u("div", mp, [
        Ce(l.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), ge = /* @__PURE__ */ re(bp, [["__scopeId", "data-v-8741c0a0"]]);
function vp(e, t) {
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
function ho(e, t) {
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
function Xe(e, t) {
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
function yp(e, t) {
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
function Ni(e, t) {
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
function ji(e, t) {
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
function Wi(e, t) {
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
function _p(e, t) {
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
function xp(e, t) {
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
function Hi(e, t) {
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
const kp = {
  key: 0,
  class: "footer-divider"
}, wp = {
  key: 0,
  class: "export-label"
}, Cp = { class: "export-buttons" }, $p = ["disabled"], Mp = {
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
}, Dp = ["disabled"], Ap = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Tp = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Bp = /* @__PURE__ */ J({
  __name: "FooterExport",
  props: {
    formats: { default: () => ["pdf", "csv"] },
    loading: { type: Boolean, default: !1 },
    variant: { default: "footer" }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = C(() => n.variant === "footer" ? "footer" : "div"), s = C(
      () => n.variant === "footer" ? "chart-footer" : "chart-export-inline"
    ), i = (r) => n.formats.includes(r), l = (r) => {
      n.loading || a("export", r);
    };
    return (r, c) => (b(), q(tn(o.value), {
      class: U(s.value)
    }, {
      default: P(() => [
        e.variant === "footer" ? (b(), k("div", kp)) : V("", !0),
        u("div", {
          class: U(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (b(), k("span", wp, "Export")) : V("", !0),
          u("div", Cp, [
            i("pdf") ? (b(), k("button", {
              key: 0,
              type: "button",
              class: U(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: c[0] || (c[0] = (d) => l("pdf"))
            }, [
              e.loading ? (b(), k("svg", Mp, [...c[2] || (c[2] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (b(), k("svg", Sp, [...c[3] || (c[3] = [
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
            ], 10, $p)) : V("", !0),
            i("csv") ? (b(), k("button", {
              key: 1,
              type: "button",
              class: U(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: c[1] || (c[1] = (d) => l("csv"))
            }, [
              e.loading ? (b(), k("svg", Ap, [...c[5] || (c[5] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (b(), k("svg", Tp, [...c[6] || (c[6] = [
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
            ], 10, Dp)) : V("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Fe = /* @__PURE__ */ re(Bp, [["__scopeId", "data-v-ebfab47f"]]), Lp = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Fp = {
  key: "chart",
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Pp = { class: "w-full shrink-0 sm:pr-2" }, Ep = {
  key: "empty",
  class: "flex min-h-[280px] w-full items-center justify-center"
}, Ip = { class: "max-w-[360px] text-center" }, Rp = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Op = /* @__PURE__ */ J({
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
    }, o = e, s = n, i = (p) => {
      s("export", p);
    }, l = pe(o, "theme"), r = pe(o, "options"), { isDark: c } = ve(l), d = (p) => {
      const v = new Date(p), f = String(v.getDate()).padStart(2, "0"), y = String(v.getMonth() + 1).padStart(2, "0");
      return `${f}-${y}`;
    }, h = C(() => {
      const p = o.data?.agents_by_day || {}, v = Object.keys(p).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const f = v.map((_) => d(_)), y = /* @__PURE__ */ new Set();
      for (const _ of Object.values(p))
        for (const w of Object.keys(_))
          y.add(w);
      const x = Array.from(y), m = (_) => _, g = x.map((_) => ({
        label: _,
        data: v.map((w) => p[w]?.[_] || 0),
        backgroundColor: `${a[_] || "#94a3b8"}80`,
        borderColor: m(a[_] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: f,
        datasets: g
      };
    });
    return t({ isDark: c }), (p, v) => (b(), q(ge, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !e.loading ? (b(), q(L(Fe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        u("div", Lp, [
          R(_e, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: P(() => [
              e.loading ? (b(), k("div", {
                key: "loading",
                class: U(["flex h-[320px] flex-col gap-3 px-4 pb-4", ["sk-root", { "sk-root--dark": L(c) }]]),
                "aria-busy": "true",
                "aria-label": "Loading chart"
              }, [...v[0] || (v[0] = [
                u("div", {
                  class: "flex-1 skeleton-shimmer",
                  style: { "border-radius": "10px" },
                  "aria-hidden": "true"
                }, null, -1)
              ])], 2)) : h.value.labels && h.value.labels.length ? (b(), k("section", Fp, [
                u("div", Pp, [
                  R(vt, {
                    data: h.value,
                    stacked: !0,
                    theme: l.value,
                    options: r.value
                  }, null, 8, ["data", "theme", "options"])
                ])
              ])) : (b(), k("section", Ep, [
                u("div", Ip, [
                  u("div", Rp, [
                    R(L(Xe), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                  ]),
                  v[1] || (v[1] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agents data per day ", -1)),
                  v[2] || (v[2] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see daily agent interactions. ", -1))
                ])
              ]))
            ]),
            _: 1
          })
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Vp = /* @__PURE__ */ re(Op, [["__scopeId", "data-v-36bec153"]]), zp = { class: "flex w-full min-w-0 justify-center" }, Np = { class: "flex max-w-full min-w-0 items-center gap-2" }, jp = { class: "min-w-0 truncate text-[12px] leading-normal" }, Wp = { class: "text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, Hp = {
  key: 0,
  class: "min-w-0 w-full truncate text-[10px] leading-normal"
}, Yp = /* @__PURE__ */ J({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, n) => (b(), k("div", {
      class: U(["card-info box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]", e.subvalue ? "h-[75px]" : "h-[58px]"])
    }, [
      u("div", zp, [
        u("div", Np, [
          e.color ? (b(), k("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: ye({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : V("", !0),
          u("span", jp, A(e.title), 1)
        ])
      ]),
      u("p", Wp, A(e.value), 1),
      e.subvalue ? (b(), k("p", Hp, A(e.subvalue), 1)) : V("", !0)
    ], 2));
  }
}), ue = /* @__PURE__ */ re(Yp, [["__scopeId", "data-v-945ff8fb"]]), Kp = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, He = /* @__PURE__ */ J({
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
    const t = e, n = C(
      () => t.statusLive === !0 || t.statusLive === !1
    ), a = C(
      () => t.statusLive === !0 ? t.labelConnected : t.labelDisconnected
    ), o = C(() => t.statusLive === !0 ? [
      "border border-emerald-200 bg-emerald-50",
      "dark:border-emerald-800/80 dark:bg-emerald-950/40"
    ] : [
      "border border-transparent bg-slate-100 dark:border-slate-700/80 dark:bg-slate-800/90"
    ]), s = C(() => t.statusLive === !0 ? "text-emerald-700 dark:text-emerald-300" : "text-[color:var(--kiut-text-primary)] dark:text-slate-300"), i = C(() => {
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
    return (l, r) => n.value ? (b(), k("span", {
      key: 0,
      role: "status",
      class: U(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", o.value])
    }, [
      e.statusLive === !0 ? (b(), k("span", Kp, [...r[0] || (r[0] = [
        u("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        u("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : V("", !0),
      u("span", {
        class: U(["min-w-0 flex-1 text-center", s.value])
      }, A(a.value), 3)
    ], 2)) : (b(), k("span", {
      key: 1,
      class: U(["inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight", i.value])
    }, [
      Ce(l.$slots, "default", {}, () => [
        ke(A(e.label), 1)
      ])
    ], 2));
  }
}), G = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), $e = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), At = (e) => {
  if (e == null) return "0";
  const t = Math.abs(e), n = e < 0 ? "-" : "";
  return t >= 1e6 ? `${n}${(t / 1e6).toFixed(2)}M` : t > 99999 ? `${n}${(t / 1e3).toFixed(1)}K` : `${n}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(t)}`;
}, Up = {
  class: "kiut-table-root table-section flex w-full min-w-0 flex-col rounded-xl font-sans antialiased text-[color:var(--kiut-text-primary,#1e293b)]",
  "data-component": "kiut-table"
}, qp = { class: "overflow-x-auto" }, Xp = { class: "w-full table-auto border-collapse text-left text-[14px] leading-normal" }, Gp = /* @__PURE__ */ J({
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
    const t = e, n = oe(!1), a = "—";
    function o(y) {
      return y == null || y === "" ? a : String(y);
    }
    function s(y) {
      return y === "center" ? "text-center" : y === "right" ? "text-right" : "text-left";
    }
    function i(y) {
      return `cell-${y}`;
    }
    function l(y, x) {
      return y[x];
    }
    function r(y, x) {
      if (typeof t.rowKey == "function")
        return t.rowKey(y);
      const m = y[t.rowKey];
      return typeof m == "string" || typeof m == "number" ? m : x;
    }
    function c(y, x) {
      return r(y, x);
    }
    const d = C(() => t.rows?.length ?? 0), h = C(() => d.value > t.maxVisibleRows), p = C(() => Math.max(0, d.value - t.maxVisibleRows)), v = C(() => t.rows?.length ? n.value || !h.value ? t.rows : t.rows.slice(0, t.maxVisibleRows) : []), f = C(
      () => t.viewMoreLabel.replace(/\{count\}/g, String(p.value))
    );
    return (y, x) => (b(), k("div", Up, [
      u("div", qp, [
        u("table", Xp, [
          u("thead", null, [
            u("tr", null, [
              (b(!0), k(Z, null, ie(e.columns, (m) => (b(), k("th", {
                key: m.key,
                scope: "col",
                class: U(["kiut-table-th whitespace-nowrap px-3 py-2 text-left text-[#9191a1]", [s(m.align), m.headerClass]])
              }, A(m.label), 3))), 128))
            ])
          ]),
          u("tbody", null, [
            (b(!0), k(Z, null, ie(v.value, (m, g) => (b(), k("tr", {
              key: c(m, g)
            }, [
              (b(!0), k(Z, null, ie(e.columns, (_) => (b(), k("td", {
                key: `${g}-${_.key}`,
                class: U(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [s(_.align), _.cellClass]])
              }, [
                Ce(y.$slots, i(_.key), {
                  row: m,
                  column: _,
                  value: l(m, _.key)
                }, () => [
                  ke(A(o(l(m, _.key))), 1)
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
        onClick: x[0] || (x[0] = (m) => n.value = !n.value)
      }, [
        ke(A(n.value ? e.viewLessLabel : f.value) + " ", 1),
        (b(), k("svg", {
          class: U(["view-more-icon", { "view-more-icon-rotated": n.value }]),
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [...x[1] || (x[1] = [
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M19 9l-7 7-7-7"
          }, null, -1)
        ])], 2))
      ])) : V("", !0)
    ]));
  }
}), st = /* @__PURE__ */ re(Gp, [["__scopeId", "data-v-58cfdc5e"]]), Zp = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Qp = {
  key: "error",
  class: "error-state"
}, Jp = { class: "error-content" }, em = { class: "error-description" }, tm = {
  key: "content",
  class: "card-body"
}, nm = { class: "chart-section" }, am = { class: "chart-wrapper" }, om = { class: "payment-success-summary" }, sm = {
  key: 0,
  class: "booking-daily-section"
}, im = { class: "w-full min-w-0" }, lm = { class: "font-medium" }, rm = { class: "percentage-text" }, cm = { class: "badges-container" }, dm = {
  key: 0,
  class: "badges-container"
}, um = {
  key: 1,
  class: "percentage-text"
}, hm = { class: "badges-container" }, fm = {
  key: 1,
  class: "empty-state"
}, gm = /* @__PURE__ */ J({
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
    function n(g) {
      return g;
    }
    const a = e, o = t, s = (g) => {
      o("export", g);
    }, i = C(() => a.data?.booking_manager_by_day ? [...a.data.booking_manager_by_day].sort(
      (g, _) => new Date(g.date).getTime() - new Date(_.date).getTime()
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
        (_) => `${_.currency} ${f(_.total_value)}`
      ).join(" · ");
    }), h = (g) => g.payment_success_value || [], p = (g) => typeof g.payment_success_count == "number" ? g.payment_success_count : (g.payment_success_value || []).reduce(
      (_, w) => _ + (w.count || 0),
      0
    ), v = (g) => $e(g), f = (g) => g == null ? "0" : At(g);
    C(() => (a.data?.total_payment_success_value || []).reduce(
      (g, _) => g + (_.total_value || 0),
      0
    ));
    const y = C(() => {
      const g = a.data, _ = g.total_booking_initiated || 0, w = g.total_booking_started || 0, D = g.total_payment_initiated || 0, S = g.total_not_found || 0, $ = g.total_cancelled || 0, M = g.total_no_pending_balance || 0, F = g.total_errors || 0, T = typeof g.total_payment_success == "number" ? g.total_payment_success : (g.total_payment_success_value || []).reduce(
        (Q, ee) => Q + (ee.count || 0),
        0
      ), B = g.total_payment_failed || 0, E = Math.max(0, _ - w), I = Math.max(
        0,
        w - D - S - $ - M - F
      ), N = (Q, ee) => {
        const ce = ee > 0 ? Math.round(Q / ee * 100) : 0;
        return `${G(Q)} (${ce}%)`;
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
      ], j = [];
      return w > 0 && j.push({
        source: "Initiated",
        target: "Started",
        value: w,
        label: N(w, _)
      }), E > 0 && j.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: E,
        label: N(E, _)
      }), D > 0 && j.push({
        source: "Started",
        target: "Payment Initiated",
        value: D,
        label: N(D, w)
      }), S > 0 && j.push({
        source: "Started",
        target: "Not Found",
        value: S,
        label: N(S, w)
      }), $ > 0 && j.push({
        source: "Started",
        target: "Cancelled",
        value: $,
        label: N($, w)
      }), M > 0 && j.push({
        source: "Started",
        target: "No Pending Balance",
        value: M,
        label: N(M, w)
      }), F > 0 && j.push({
        source: "Started",
        target: "Errors",
        value: F,
        label: N(F, w)
      }), I > 0 && j.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: I,
        label: N(I, w)
      }), T > 0 && j.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: T,
        label: N(T, D)
      }), B > 0 && j.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: B,
        label: N(B, D)
      }), { nodes: Y, links: j };
    }), x = {
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
    }, m = (g, _) => !_ || _ === 0 ? "0%" : `${Math.round(g / _ * 100)}%`;
    return (g, _) => (b(), q(ge, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis",
      loading: e.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !a.loading && !a.error ? (b(), q(L(Fe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        R(_e, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: P(() => [
            e.loading ? (b(), k("div", Zp, [..._[0] || (_[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : a.error ? (b(), k("div", Qp, [
              u("div", Jp, [
                _[1] || (_[1] = u("div", { class: "error-icon-wrapper" }, [
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
                _[2] || (_[2] = u("p", { class: "error-title" }, "Error loading data", -1)),
                u("p", em, A(a.error), 1)
              ])
            ])) : (b(), k("div", tm, [
              u("section", nm, [
                u("div", am, [
                  R(zt, {
                    data: y.value,
                    "node-colors": x,
                    height: "500px",
                    "node-gap": 15
                  }, null, 8, ["data"])
                ])
              ]),
              u("section", om, [
                R(ue, {
                  color: "#22c55e",
                  title: "Payment Success Value",
                  value: d.value
                }, null, 8, ["value"])
              ]),
              i.value.length > 0 ? (b(), k("section", sm, [
                _[3] || (_[3] = u("div", { class: "section-header" }, [
                  u("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                u("div", im, [
                  R(st, {
                    columns: l,
                    rows: r.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": P(({ row: w }) => [
                      u("span", lm, A(L(Oe)(String(w.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": P(({ row: w }) => [
                      u("span", null, A(L(G)(Number(w.booking_initiated_count))), 1)
                    ]),
                    "cell-started": P(({ row: w }) => [
                      u("span", null, [
                        ke(A(L(G)(Number(w.booking_started_count))) + " ", 1),
                        u("span", rm, " (" + A(m(
                          Number(w.booking_started_count),
                          Number(w.booking_initiated_count)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-paymentInitiated": P(({ row: w }) => [
                      u("span", null, A(L(G)(Number(w.payment_initiated_count))), 1)
                    ]),
                    "cell-paymentResults": P(({ row: w }) => [
                      u("div", cm, [
                        R(He, { color: "success" }, {
                          default: P(() => [
                            ke(" Success: " + A(L(G)(
                              p(w)
                            )), 1)
                          ]),
                          _: 2
                        }, 1024),
                        R(He, { color: "danger" }, {
                          default: P(() => [
                            ke(" Failed: " + A(L(G)(Number(w.payment_failed_count) || 0)), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    "cell-paymentValue": P(({ row: w }) => [
                      h(w).length > 0 ? (b(), k("div", dm, [
                        (b(!0), k(Z, null, ie(h(
                          w
                        ), (D) => (b(), k("span", {
                          key: `${w.date}-${D.currency}`,
                          class: "badge badge-currency"
                        }, A(D.currency) + " " + A(v(D.total_value)), 1))), 128))
                      ])) : (b(), k("span", um, "N/A"))
                    ]),
                    "cell-outcomes": P(({ row: w }) => [
                      u("div", hm, [
                        R(He, { color: "danger" }, {
                          default: P(() => [
                            ke(" Not Found: " + A(w.not_found_count ? L(G)(Number(w.not_found_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        R(He, { color: "warning" }, {
                          default: P(() => [
                            ke(" Cancelled: " + A(w.cancelled_count ? L(G)(Number(w.cancelled_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        R(He, { color: "orange" }, {
                          default: P(() => [
                            ke(" No Balance: " + A(w.no_pending_balance_count ? L(G)(Number(w.no_pending_balance_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        R(He, { color: "danger" }, {
                          default: P(() => [
                            ke(" Errors: " + A(w.error_count ? L(G)(Number(w.error_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (b(), k("section", fm, [..._[4] || (_[4] = [
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
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), pm = /* @__PURE__ */ re(gm, [["__scopeId", "data-v-c2cd8b09"]]), mm = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, bm = {
  key: "content",
  class: "card-body"
}, vm = {
  key: 0,
  class: "chart-section"
}, ym = { class: "chart-wrapper" }, _m = {
  key: 1,
  class: "checkin-daily-section"
}, xm = { class: "w-full min-w-0" }, km = { class: "font-medium" }, wm = { class: "cell-success" }, Cm = { class: "cell-danger" }, $m = {
  key: 0,
  class: "reasons-list"
}, Mm = { class: "reason-name" }, Sm = { class: "reason-count" }, Dm = {
  key: 1,
  class: "no-reasons"
}, Am = {
  key: 2,
  class: "empty-state"
}, Tm = {
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
    const n = t, a = (g) => {
      n("export", g);
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
    }, l = oe([]), r = [
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
    }), v = (g, _) => !_ || _ === 0 ? "0%" : `${Math.round(g / _ * 100)}%`, f = (g, _) => {
      const w = G(g), D = v(g, _);
      return `${w} (${D})`;
    }, y = (g) => g.reduce((_, w) => _ + w.failed_count, 0), x = C(() => {
      const g = [], _ = [];
      if (!d.value.total_checkin_initiated)
        return { nodes: g, links: _ };
      g.push({ name: "Checkin Init" }), g.push({ name: "Booking retrive" }), g.push({ name: "Booking retrive success" }), g.push({ name: "Number of Passengers" }), g.push({ name: "Completed" }), g.push({ name: "Closed with BP" });
      const w = d.value.total_checkin_initiated, D = d.value.total_checkin_init, S = d.value.total_checkin_init_abandoned, $ = D - S, M = d.value.total_checkin_started, F = d.value.total_checkin_completed, T = d.value.total_checkin_closed, B = h.value.unrecovered_by_step || [], E = B.reduce(
        (j, Q) => j + Q.count,
        0
      );
      if (D > 0) {
        const j = Math.round(D / w * 100);
        _.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: D,
          label: `${D.toLocaleString()} (${j}%)`
        });
      }
      const I = w - D;
      if (I > 0) {
        const j = Math.round(I / w * 100);
        g.push({ name: "Abandoned (Init)" }), _.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: I,
          label: `${I.toLocaleString()} (${j}%)`
        });
      }
      if (S > 0) {
        const j = Math.round(S / w * 100);
        g.push({ name: "Abandoned (Started)" }), _.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: S,
          label: `${S.toLocaleString()} (${j}%)`
        });
      }
      if ($ > 0) {
        const j = Math.round($ / w * 100);
        _.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: $,
          label: `${$.toLocaleString()} (${j}%)`
        });
      }
      if (M > 0) {
        const j = Math.round(M / w * 100);
        _.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: M,
          label: `${M.toLocaleString()} (${j}%)`
        });
      }
      if (F > 0) {
        const j = Math.round(F / M * 100);
        _.push({
          source: "Number of Passengers",
          target: "Completed",
          value: F,
          label: `${F.toLocaleString()} (${j}%)`
        });
      }
      if (B.length > 0 && E > 0) {
        g.push({ name: "Unrecovered" });
        const j = Math.round(E / M * 100);
        _.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: E,
          label: `${E.toLocaleString()} (${j}%)`
        }), B.forEach((Q) => {
          const ce = Q.step_name.replace(/_/g, " ").split(" ").map((K) => K.charAt(0).toUpperCase() + K.slice(1)).join(" "), z = Math.round(Q.count / M * 100);
          g.push({ name: ce }), _.push({
            source: "Unrecovered",
            target: ce,
            value: Q.count,
            label: `${Q.count.toLocaleString()} (${z}%)`
          });
        });
      }
      const N = M - (F + E);
      if (N > 0) {
        const j = Math.round(N / M * 100);
        g.push({ name: "Abandoned (Flow)" }), _.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: N,
          label: `${N.toLocaleString()} (${j}%)`
        });
      }
      const Y = F - T;
      if (Y > 0) {
        const j = Math.round(Y / M * 100);
        g.push({ name: "BP Error" }), _.push({
          source: "Completed",
          target: "BP Error",
          value: Y,
          label: `${Y.toLocaleString()} (${j}%)`
        });
      }
      if (T > 0) {
        const j = Math.round(T / M * 100);
        _.push({
          source: "Completed",
          target: "Closed with BP",
          value: T,
          label: `${T.toLocaleString()} (${j}%)`
        });
      }
      return { nodes: g, links: _ };
    }), m = () => {
      const g = d.value.checkin_by_day || [], _ = h.value.failed_by_step_by_day || [];
      if (g.length === 0) {
        l.value = [];
        return;
      }
      l.value = [...g].map((w) => {
        const D = _.find(
          (S) => S.date === w.date
        );
        return {
          ...w,
          failed_steps: D?.steps || []
        };
      }), l.value.sort((w, D) => new Date(w.date) - new Date(D.date));
    };
    return Le(
      [() => o.data, () => o.checkinData, () => o.failedData],
      () => {
        m();
      },
      { deep: !0, immediate: !0 }
    ), (g, _) => (b(), q(ge, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !e.loading ? (b(), q(L(Fe), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        R(_e, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: P(() => [
            e.loading ? (b(), k("div", mm, [..._[0] || (_[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (b(), k("div", bm, [
              x.value.nodes.length > 0 ? (b(), k("section", vm, [
                u("div", ym, [
                  R(zt, {
                    data: x.value,
                    height: "500px",
                    "node-colors": p.value,
                    "use-gradient": !1,
                    "node-gap": 30
                  }, null, 8, ["data", "node-colors"])
                ])
              ])) : V("", !0),
              l.value && l.value.length > 0 ? (b(), k("section", _m, [
                u("div", xm, [
                  R(st, {
                    columns: r,
                    rows: c.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": P(({ row: w }) => [
                      u("span", km, A(L(Oe)(String(w.date)).format("MMM DD")), 1)
                    ]),
                    "cell-checkinInit": P(({ row: w }) => [
                      u("span", null, A(L(G)(w.checkin_initiated_count)), 1)
                    ]),
                    "cell-bookingRetrieve": P(({ row: w }) => [
                      u("span", null, A(f(
                        w.checkin_init_count,
                        w.checkin_initiated_count
                      )), 1)
                    ]),
                    "cell-passengers": P(({ row: w }) => [
                      u("span", null, A(L(G)(w.checkin_started_count)), 1)
                    ]),
                    "cell-completed": P(({ row: w }) => [
                      u("span", null, A(f(
                        w.checkin_completed_count,
                        w.checkin_started_count
                      )), 1)
                    ]),
                    "cell-closed": P(({ row: w }) => [
                      u("span", wm, A(f(
                        w.checkin_closed_count,
                        w.checkin_started_count
                      )), 1)
                    ]),
                    "cell-failed": P(({ row: w }) => [
                      u("span", Cm, A(f(
                        y(w.failed_steps),
                        w.checkin_started_count
                      )), 1)
                    ]),
                    "cell-reasons": P(({ row: w }) => [
                      w.failed_steps && w.failed_steps.length > 0 ? (b(), k("div", $m, [
                        (b(!0), k(Z, null, ie(w.failed_steps, (D) => (b(), k("div", {
                          key: D.step_name,
                          class: "reason-item"
                        }, [
                          u("span", Mm, A(D.step_name.replace(/_/g, " ")) + ":", 1),
                          u("span", Sm, A(D.failed_count), 1)
                        ]))), 128))
                      ])) : (b(), k("div", Dm, "-"))
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (b(), k("section", Am, [..._[1] || (_[1] = [
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
        })
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}, Yi = /* @__PURE__ */ re(Tm, [["__scopeId", "data-v-052a84f4"]]), Bm = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Lm = {
  key: "content",
  class: "card-body"
}, Fm = {
  key: 0,
  class: "sankey-section"
}, Pm = {
  key: 1,
  class: "checkin-metrics-daily-section"
}, Em = { class: "w-full min-w-0" }, Im = { class: "font-medium whitespace-nowrap" }, Rm = { class: "cell-success" }, Om = { class: "cell-danger" }, Vm = {
  key: 0,
  class: "reasons-list"
}, zm = { class: "reason-name" }, Nm = { class: "reason-count" }, jm = {
  key: 1,
  class: "no-reasons"
}, Wm = {
  key: 2,
  class: "empty-state"
}, Hm = { class: "empty-state-content" }, Ym = { class: "empty-icon-wrapper" }, Km = /* @__PURE__ */ J({
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
    const a = e, o = n, s = (m) => {
      o("export", m);
    }, { isDark: i } = ve(pe(a, "theme")), l = (m) => m == null ? "0" : m.toLocaleString(), r = (m) => {
      const [g, _, w] = m.split("-").map(Number);
      return Oe([g, _ - 1, w]).format("MMM DD");
    }, c = (m) => m.replace(/_/g, " ").replace(/\b\w/g, (g) => g.toUpperCase()), d = (m, g) => !g || g === 0 ? "0%" : `${Math.round(m / g * 100)}%`, h = (m, g) => {
      const _ = m || 0, w = g || 0, D = l(_), S = d(_, w);
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
      const m = a.checkinData?.record_locator_by_day || [], g = a.failedData?.failed_by_step_by_day || [], _ = a.failedData?.unrecovered_by_day || [];
      return m.map((D) => {
        const S = g.find((M) => M.date === D.date), $ = _.find(
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
    ), x = C(() => {
      const m = [], g = [], _ = /* @__PURE__ */ new Set(), w = (W) => {
        _.has(W) || (m.push({ name: W }), _.add(W));
      };
      if (!a.checkinData?.total_checkin_initiated)
        return { nodes: m, links: g };
      w("Checkin Init"), w("Booking Retrieval"), w("Booking Retrieved"), w("Completed"), w("Closed with BP");
      const D = a.checkinData.total_checkin_initiated || 0, S = a.checkinData.total_record_locator_init || 0, $ = a.checkinData.total_record_locator_init_abandoned || 0, M = a.checkinData.total_checkin_pre_init_abandoned_error, F = a.checkinData.total_checkin_pre_init_abandoned_voluntary, T = M != null || F != null, B = T ? Math.max(Number(M) || 0, 0) : 0, E = T ? Math.max(Number(F) || 0, 0) : 0, I = a.checkinData.total_record_locator_init_abandoned_error, N = a.checkinData.total_record_locator_init_abandoned_voluntary, Y = I != null || N != null, j = Y ? Math.max(Number(I) || 0, 0) : 0, Q = Y ? Math.max(Number(N) || 0, 0) : 0, ee = Y ? Math.max($ - j - Q, 0) : $, ce = S - $, z = a.checkinData.total_record_locator_started || 0, K = a.checkinData.total_record_locator_completed || 0, X = a.checkinData.total_record_locator_closed || 0, le = a.checkinData.total_record_locator_unrecovered || 0;
      if (S > 0) {
        const W = Math.round(S / D * 100);
        g.push({
          source: "Checkin Init",
          target: "Booking Retrieval",
          value: S,
          label: `${S.toLocaleString()} (${W}%)`
        });
      }
      const se = D - S;
      if (T) {
        if (E > 0) {
          const W = Math.round(
            E / D * 100
          );
          w("Abandoned (Init)"), g.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: E,
            label: `${E.toLocaleString()} (${W}%)`
          });
        }
        if (B > 0) {
          const W = Math.round(B / D * 100);
          w("Booking not retreived"), g.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: B,
            label: `${B.toLocaleString()} (${W}%)`
          });
        }
      } else if (se > 0) {
        const W = Math.round(se / D * 100);
        w("Abandoned (Init)"), g.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: se,
          label: `${se.toLocaleString()} (${W}%)`
        });
      }
      if (Y) {
        if (j > 0) {
          const W = Math.round(j / D * 100);
          w("Error"), g.push({
            source: "Booking Retrieval",
            target: "Error",
            value: j,
            label: `${j.toLocaleString()} (${W}%)`
          });
        }
        if (Q > 0) {
          const W = Math.round(Q / D * 100);
          w("Abandoned (Started)"), g.push({
            source: "Booking Retrieval",
            target: "Abandoned (Started)",
            value: Q,
            label: `${Q.toLocaleString()} (${W}%)`
          });
        }
        if (ee > 0) {
          const W = Math.round(
            ee / D * 100
          );
          w("Abandoned (Started)"), g.push({
            source: "Booking Retrieval",
            target: "Abandoned (Started)",
            value: ee,
            label: `${ee.toLocaleString()} (${W}%)`
          });
        }
      } else if ($ > 0) {
        const W = Math.round($ / D * 100);
        w("Abandoned (Started)"), g.push({
          source: "Booking Retrieval",
          target: "Abandoned (Started)",
          value: $,
          label: `${$.toLocaleString()} (${W}%)`
        });
      }
      if (ce > 0) {
        const W = Math.round(ce / D * 100);
        g.push({
          source: "Booking Retrieval",
          target: "Booking Retrieved",
          value: ce,
          label: `${ce.toLocaleString()} (${W}%)`
        });
      }
      if (K > 0) {
        const W = Math.round(K / z * 100);
        g.push({
          source: "Booking Retrieved",
          target: "Completed",
          value: K,
          label: `${K.toLocaleString()} (${W}%)`
        });
      }
      if (le > 0) {
        w("Errors");
        const W = Math.round(le / z * 100);
        g.push({
          source: "Booking Retrieved",
          target: "Errors",
          value: le,
          label: `${le.toLocaleString()} (${W}%)`
        });
      }
      const Ae = z - (K + le);
      if (Ae > 0) {
        const W = Math.round(Ae / z * 100);
        w("Abandoned (Flow)"), g.push({
          source: "Booking Retrieved",
          target: "Abandoned (Flow)",
          value: Ae,
          label: `${Ae.toLocaleString()} (${W}%)`
        });
      }
      const xe = K - X;
      if (xe > 0) {
        const W = Math.round(xe / z * 100);
        w("BP Error"), g.push({
          source: "Completed",
          target: "BP Error",
          value: xe,
          label: `${xe.toLocaleString()} (${W}%)`
        });
      }
      if (X > 0) {
        const W = Math.round(X / z * 100);
        g.push({
          source: "Completed",
          target: "Closed with BP",
          value: X,
          label: `${X.toLocaleString()} (${W}%)`
        });
      }
      return { nodes: m, links: g };
    });
    return t({ isDark: i }), (m, g) => (b(), q(ge, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !e.loading ? (b(), q(L(Fe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        R(_e, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: P(() => [
            e.loading ? (b(), k("div", Bm, [...g[0] || (g[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (b(), k("div", Lm, [
              x.value.nodes.length > 0 ? (b(), k("div", Fm, [
                R(zt, {
                  data: x.value,
                  height: "500px",
                  "node-colors": p.value,
                  "use-gradient": !1,
                  "node-gap": 30
                }, null, 8, ["data", "node-colors"])
              ])) : V("", !0),
              v.value && v.value.length > 0 ? (b(), k("div", Pm, [
                u("div", Em, [
                  R(st, {
                    columns: f,
                    rows: y.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": P(({ row: _ }) => [
                      u("span", Im, A(r(String(_.date))), 1)
                    ]),
                    "cell-checkinInit": P(({ row: _ }) => [
                      u("span", null, A(l(_.checkin_initiated)), 1)
                    ]),
                    "cell-bookingRetrieval": P(({ row: _ }) => [
                      u("span", null, A(h(
                        _.record_locator_init_count,
                        _.checkin_initiated
                      )), 1)
                    ]),
                    "cell-bookingRetrieved": P(({ row: _ }) => [
                      u("span", null, A(h(
                        _.record_locator_started_count,
                        _.record_locator_init_count
                      )), 1)
                    ]),
                    "cell-completed": P(({ row: _ }) => [
                      u("span", null, A(h(
                        _.record_locator_completed_count,
                        _.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-closed": P(({ row: _ }) => [
                      u("span", Rm, A(h(
                        _.record_locator_closed_count,
                        _.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-failed": P(({ row: _ }) => [
                      u("span", Om, A(h(
                        _.unrecovered_count,
                        _.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-reasons": P(({ row: _ }) => [
                      Array.isArray(_.failed_steps) && _.failed_steps.length > 0 ? (b(), k("div", Vm, [
                        (b(!0), k(Z, null, ie(_.failed_steps, (w) => (b(), k("div", {
                          key: w.step_name,
                          class: "reason-item"
                        }, [
                          u("span", zm, A(c(w.step_name)) + ":", 1),
                          u("span", Nm, A(w.failed_count), 1)
                        ]))), 128))
                      ])) : (b(), k("div", jm, "-"))
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (b(), k("div", Wm, [
                u("div", Hm, [
                  u("div", Ym, [
                    R(L(Xe), { class: "empty-icon" })
                  ]),
                  g[1] || (g[1] = u("p", { class: "empty-title" }, "No check-in data available", -1)),
                  g[2] || (g[2] = u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see check-in metrics. ", -1))
                ])
              ]))
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), Um = /* @__PURE__ */ re(Km, [["__scopeId", "data-v-0845cd9f"]]), qm = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Xm = {
  key: "content",
  class: "card-body"
}, Gm = {
  key: 0,
  class: "chart-section"
}, Zm = { class: "chart-wrapper" }, Qm = {
  key: 1,
  class: "record-locator-daily-section"
}, Jm = { class: "w-full min-w-0" }, e0 = { class: "cell-plain font-medium" }, t0 = { class: "cell-plain text-center" }, n0 = { class: "cell-plain text-center" }, a0 = { class: "cell-plain text-center" }, o0 = { class: "cell-plain text-center" }, s0 = { class: "cell-plain text-center success-value" }, i0 = { class: "cell-plain text-center failed-value" }, l0 = { class: "cell-plain text-center warning-value" }, r0 = { class: "cell-plain text-center" }, c0 = { class: "cell-plain text-center failed-value" }, d0 = {
  key: 2,
  class: "empty-state"
}, u0 = /* @__PURE__ */ J({
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
    const a = e, o = n, s = (m) => {
      o("export", m);
    }, { isDark: i } = ve(pe(a, "theme")), l = C(() => a.data?.record_locator_by_day ? [...a.data.record_locator_by_day].sort(
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
      const _ = G(m), w = f(m, g);
      return `${_} (${w})`;
    }, x = C(() => {
      const m = [], g = [], _ = /* @__PURE__ */ new Set(), w = (se) => {
        _.has(se) || (m.push({ name: se }), _.add(se));
      };
      if (!p.value.total_checkin_initiated)
        return { nodes: m, links: g };
      w("Checkin Init"), w("Booking retrive"), w("Checkin Started"), w("Checkin Completed"), w("Checkin Closed");
      const D = p.value.total_checkin_initiated, S = p.value.total_record_locator_init, $ = p.value.total_record_locator_started, M = p.value.total_record_locator_completed, F = p.value.total_record_locator_closed, T = p.value.total_record_locator_failed, B = p.value.total_record_locator_abandoned, E = p.value.total_record_locator_init_abandoned, I = p.value.total_checkin_pre_init_abandoned_error, N = p.value.total_checkin_pre_init_abandoned_voluntary, Y = I != null || N != null, j = Y ? Math.max(Number(I) || 0, 0) : 0, Q = Y ? Math.max(Number(N) || 0, 0) : 0, ee = p.value.total_record_locator_init_abandoned_error, ce = p.value.total_record_locator_init_abandoned_voluntary, z = ee != null || ce != null, K = z ? Math.max(Number(ee) || 0, 0) : 0, X = z ? Math.max(Number(ce) || 0, 0) : 0;
      if (S > 0) {
        const se = Math.round(S / D * 100);
        g.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: S,
          label: `${S.toLocaleString()} (${se}%)`
        });
      }
      const le = D - S;
      if (Y) {
        if (Q > 0) {
          const se = Math.round(
            Q / D * 100
          );
          w("Abandoned (Init)"), g.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: Q,
            label: `${Q.toLocaleString()} (${se}%)`
          });
        }
        if (j > 0) {
          const se = Math.round(j / D * 100);
          w("Booking not retreived"), g.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: j,
            label: `${j.toLocaleString()} (${se}%)`
          });
        }
      } else if (le > 0) {
        const se = Math.round(le / D * 100);
        w("Abandoned (Init)"), g.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: le,
          label: `${le.toLocaleString()} (${se}%)`
        });
      }
      if ($ > 0) {
        const se = Math.round($ / D * 100);
        g.push({
          source: "Booking retrive",
          target: "Checkin Started",
          value: $,
          label: `${$.toLocaleString()} (${se}%)`
        });
      }
      if (z) {
        if (K > 0) {
          const se = Math.round(K / D * 100);
          w("Error"), g.push({
            source: "Booking retrive",
            target: "Error",
            value: K,
            label: `${K.toLocaleString()} (${se}%)`
          });
        }
        if (X > 0) {
          const se = Math.round(X / D * 100);
          w("Abandoned (Started)"), g.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: X,
            label: `${X.toLocaleString()} (${se}%)`
          });
        }
      } else if (E > 0) {
        const se = Math.round(
          E / D * 100
        );
        w("Abandoned (Started)"), g.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: E,
          label: `${E.toLocaleString()} (${se}%)`
        });
      }
      if (M > 0) {
        const se = Math.round(
          M / $ * 100
        );
        g.push({
          source: "Checkin Started",
          target: "Checkin Completed",
          value: M,
          label: `${M.toLocaleString()} (${se}%)`
        });
      }
      if (F > 0) {
        const se = Math.round(
          F / $ * 100
        );
        g.push({
          source: "Checkin Completed",
          target: "Checkin Closed",
          value: F,
          label: `${F.toLocaleString()} (${se}%)`
        });
      }
      if (T > 0) {
        const se = Math.round(
          T / $ * 100
        );
        w("Checkin Failed"), g.push({
          source: "Checkin Started",
          target: "Checkin Failed",
          value: T,
          label: `${T.toLocaleString()} (${se}%)`
        });
      }
      if (B > 0) {
        const se = Math.round(
          B / $ * 100
        );
        w("Abandoned (Flow)"), g.push({
          source: "Checkin Started",
          target: "Abandoned (Flow)",
          value: B,
          label: `${B.toLocaleString()} (${se}%)`
        });
      }
      return { nodes: m, links: g };
    });
    return t({ isDark: i }), (m, g) => (b(), q(ge, {
      class: "record-locator-root h-full min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: e.collapsible,
      loading: a.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !a.loading ? (b(), q(L(Fe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        R(_e, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: P(() => [
            a.loading ? (b(), k("div", qm, [...g[0] || (g[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (b(), k("div", Xm, [
              x.value.nodes.length > 0 ? (b(), k("section", Gm, [
                u("div", Zm, [
                  R(zt, {
                    data: x.value,
                    height: "500px",
                    "node-colors": v.value,
                    "use-gradient": !1,
                    "node-gap": 30
                  }, null, 8, ["data", "node-colors"])
                ])
              ])) : V("", !0),
              l.value && l.value.length > 0 ? (b(), k("section", Qm, [
                u("div", Jm, [
                  R(st, {
                    columns: d.value,
                    rows: h.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": P(({ row: _ }) => [
                      u("span", e0, A(L(Oe)(String(_.date)).format("MMM DD")), 1)
                    ]),
                    "cell-checkinInit": P(({ row: _ }) => [
                      u("span", t0, A(L(G)(_.checkin_initiated)), 1)
                    ]),
                    "cell-bookingRetrieve": P(({ row: _ }) => [
                      u("span", n0, A(y(
                        _.record_locator_init_count,
                        _.checkin_initiated
                      )), 1)
                    ]),
                    "cell-checkinStarted": P(({ row: _ }) => [
                      u("span", a0, A(L(G)(_.record_locator_started_count)), 1)
                    ]),
                    "cell-checkinCompleted": P(({ row: _ }) => [
                      u("span", o0, A(y(
                        _.record_locator_completed_count,
                        _.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-checkinClosed": P(({ row: _ }) => [
                      u("span", s0, A(y(
                        _.record_locator_closed_count,
                        _.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-checkinFailed": P(({ row: _ }) => [
                      u("span", i0, A(y(
                        _.record_locator_failed_count,
                        _.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-abandoned": P(({ row: _ }) => [
                      u("span", l0, A(y(
                        _.record_locator_abandoned_count,
                        _.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-createPayment": P(({ row: _ }) => [
                      u("span", r0, A(L(G)(
                        _.record_locator_create_payment_count ?? 0
                      )), 1)
                    ]),
                    "cell-failedPayment": P(({ row: _ }) => [
                      u("span", c0, A(L(G)(
                        _.record_locator_create_payment_failed_count ?? 0
                      )), 1)
                    ]),
                    _: 1
                  }, 8, ["columns", "rows"])
                ])
              ])) : (b(), k("section", d0, [...g[1] || (g[1] = [
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
        })
      ]),
      _: 1
    }, 8, ["collapsible", "loading"]));
  }
}), Ki = /* @__PURE__ */ re(u0, [["__scopeId", "data-v-6dd73a19"]]), h0 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, f0 = {
  key: "content",
  class: "card-body"
}, g0 = {
  key: 0,
  class: "checkin-segments-daily-section"
}, p0 = { class: "w-full min-w-0" }, m0 = { class: "segment-plain" }, b0 = { class: "segment-plain" }, v0 = { class: "segment-plain" }, y0 = { class: "percentage-value" }, _0 = { class: "percentage-value" }, x0 = { class: "percentage-value success" }, k0 = {
  key: 1,
  class: "empty-state"
}, w0 = /* @__PURE__ */ J({
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
    const a = e, o = n, s = (p) => {
      o("export", p);
    }, { isDark: i } = ve(pe(a, "theme")), l = [
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
    return t({ isDark: i }), (p, v) => (b(), q(ge, {
      class: "checkin-segments-root h-full min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !a.loading ? (b(), q(L(Fe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        R(_e, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: P(() => [
            e.loading ? (b(), k("div", h0, [...v[0] || (v[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (b(), k("div", f0, [
              a.data.length > 0 ? (b(), k("section", g0, [
                u("div", p0, [
                  R(st, {
                    columns: l,
                    rows: r.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-departure": P(({ row: f }) => [
                      u("span", m0, A(d(f.departure_airport)), 1)
                    ]),
                    "cell-connection": P(({ row: f }) => [
                      u("span", {
                        class: U(["segment-plain", {
                          "segment-plain--muted": d(f.conexion_airport) === "-"
                        }])
                      }, A(d(f.conexion_airport)), 3)
                    ]),
                    "cell-arrival": P(({ row: f }) => [
                      u("span", b0, A(d(f.arrival_airport)), 1)
                    ]),
                    "cell-trip": P(({ row: f }) => [
                      u("span", v0, A(h(f) ? "Roundtrip" : "One way"), 1)
                    ]),
                    "cell-init": P(({ row: f }) => [
                      ke(A(L(G)(f.segment_init_count)), 1)
                    ]),
                    "cell-started": P(({ row: f }) => [
                      u("span", y0, A(c(
                        f.segment_started_count,
                        f.segment_init_count
                      )), 1)
                    ]),
                    "cell-completed": P(({ row: f }) => [
                      u("span", _0, A(c(
                        f.segment_completed_count,
                        f.segment_init_count
                      )), 1)
                    ]),
                    "cell-closed": P(({ row: f }) => [
                      u("span", x0, A(c(
                        f.segment_closed_count,
                        f.segment_init_count
                      )), 1)
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (b(), k("section", k0, [...v[1] || (v[1] = [
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
        })
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}), Ui = /* @__PURE__ */ re(w0, [["__scopeId", "data-v-522b5823"]]), C0 = { class: "checkin-container__body" }, $0 = /* @__PURE__ */ J({
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
    const n = e, a = t, o = C(() => n.loading || n.checkinLoading);
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
    return (h, p) => (b(), q(ge, {
      class: "checkin-container-root w-full",
      title: "Check in",
      subtitle: "Check-in flows, metrics by record locator and segment breakdown.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading
    }, {
      default: P(() => [
        u("div", C0, [
          e.showCheckin ? (b(), q(Yi, {
            key: 0,
            class: "w-full min-h-0",
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: o.value,
            "checkin-data": e.checkinData,
            "failed-data": e.checkinFailedData,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: p[0] || (p[0] = (v) => r("checkin", v))
          }, null, 8, ["initially-open", "loading", "checkin-data", "failed-data", "enable-export", "export-loading"])) : V("", !0),
          R(Ki, {
            collapsible: !1,
            loading: s.value,
            data: l.value,
            "is-avianca": e.isAvianca,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: p[1] || (p[1] = (v) => r("recordLocator", v))
          }, null, 8, ["loading", "data", "is-avianca", "theme", "enable-export", "export-loading"]),
          R(Ui, {
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: i.value,
            data: e.segmentsData ?? [],
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: d
          }, null, 8, ["initially-open", "loading", "data", "theme", "enable-export", "export-loading"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), M0 = /* @__PURE__ */ re($0, [["__scopeId", "data-v-d7fe32b0"]]), S0 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, D0 = {
  key: "content",
  class: "card-body"
}, A0 = { class: "chart-section" }, T0 = { class: "chart-wrapper" }, B0 = {
  key: 1,
  class: "empty-chart"
}, L0 = { class: "payment-success-summary" }, F0 = {
  key: 0,
  class: "disruption-daily-section"
}, P0 = { class: "w-full min-w-0" }, E0 = { class: "font-medium text-center" }, I0 = { class: "text-center" }, R0 = { class: "text-center" }, O0 = { class: "percentage-text" }, V0 = { class: "text-center" }, z0 = { class: "abandoned-value" }, N0 = { class: "badges-container badges-wrap" }, j0 = { class: "badges-container badges-wrap" }, W0 = {
  key: 1,
  class: "empty-state"
}, H0 = /* @__PURE__ */ J({
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
    function n(m) {
      return m;
    }
    const a = e, o = t, s = (m) => {
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
    }), h = (m, g) => !g || g === 0 ? "0%" : `${Math.round(m / g * 100)}%`, p = (m) => $e(m), v = (m) => (m ?? []).reduce((g, _) => g + (_.count ?? 0), 0), f = (m) => typeof m.sell_success_count == "number" ? m.sell_success_count : v(m.payment_success_total), y = C(() => {
      const m = a.data, g = m.total_disruption_conversations || 0, _ = m.total_disruption_initiated || 0, w = m.total_voluntary || 0, D = m.total_involuntary || 0, S = m.total_accepted || 0, $ = m.total_confirmed || 0, M = typeof m.total_sell_success == "number" ? m.total_sell_success : v(m.total_payment_success), F = m.total_sell_failed || 0, T = Math.max(0, g - _), B = Math.max(
        0,
        _ - w - D
      ), E = Math.max(0, D - S), I = Math.max(0, w - $), N = F, Y = Math.max(0, $ - M - N), j = (ce, z) => {
        const K = z > 0 ? Math.round(ce / z * 100) : 0;
        return `${ce.toLocaleString()} (${K}%)`;
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
      ], ee = [];
      return _ > 0 && ee.push({
        source: "Initiated",
        target: "Started",
        value: _,
        label: j(_, g)
      }), T > 0 && ee.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: T,
        label: j(T, g)
      }), w > 0 && ee.push({
        source: "Started",
        target: "Voluntary",
        value: w,
        label: j(w, g)
      }), D > 0 && ee.push({
        source: "Started",
        target: "Involuntary",
        value: D,
        label: j(D, g)
      }), B > 0 && ee.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: B,
        label: j(B, g)
      }), S > 0 && ee.push({
        source: "Involuntary",
        target: "Accepted",
        value: S,
        label: j(S, g)
      }), E > 0 && ee.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: E,
        label: j(E, g)
      }), $ > 0 && ee.push({
        source: "Voluntary",
        target: "Confirmed",
        value: $,
        label: j($, g)
      }), I > 0 && ee.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: I,
        label: j(I, g)
      }), M > 0 && ee.push({
        source: "Confirmed",
        target: "Paid",
        value: M,
        label: j(M, g)
      }), N > 0 && ee.push({
        source: "Confirmed",
        target: "Rejected",
        value: N,
        label: j(N, g)
      }), Y > 0 && ee.push({
        source: "Confirmed",
        target: "Not Paid",
        value: Y,
        label: j(Y, g)
      }), { nodes: Q, links: ee };
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
    return (m, g) => (b(), q(ge, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking",
      loading: e.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !a.loading ? (b(), q(L(Fe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        R(_e, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: P(() => [
            e.loading ? (b(), k("div", S0, [...g[0] || (g[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (b(), k("div", D0, [
              u("section", A0, [
                u("div", T0, [
                  y.value.nodes.length > 0 && y.value.links.length > 0 ? (b(), q(zt, {
                    key: 0,
                    data: y.value,
                    "node-colors": x,
                    height: "500px"
                  }, null, 8, ["data"])) : (b(), k("div", B0, [...g[1] || (g[1] = [
                    u("p", { class: "empty-chart-text" }, " No disruption data available for visualization ", -1)
                  ])]))
                ])
              ]),
              u("section", L0, [
                R(ue, {
                  color: "#22c55e",
                  title: "Payment Success Value",
                  value: d.value
                }, null, 8, ["value"])
              ]),
              i.value && i.value.length > 0 ? (b(), k("section", F0, [
                g[2] || (g[2] = u("div", { class: "section-header" }, [
                  u("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                u("div", P0, [
                  R(st, {
                    columns: l,
                    rows: r.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": P(({ row: _ }) => [
                      u("span", E0, A(L(Oe)(String(_.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": P(({ row: _ }) => [
                      u("span", I0, A(L(G)(Number(_.disruption_conversations))), 1)
                    ]),
                    "cell-started": P(({ row: _ }) => [
                      u("span", R0, [
                        ke(A(L(G)(Number(_.disruption_initiated_count))) + " ", 1),
                        u("span", O0, " (" + A(h(
                          Number(_.disruption_initiated_count),
                          Number(_.disruption_conversations)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-abandoned": P(({ row: _ }) => [
                      u("span", V0, [
                        u("span", z0, A(L(G)(
                          Number(_.disruption_initiated_count) - Number(_.voluntary_count) - Number(_.involuntary_count)
                        )) + " (" + A(h(
                          Number(_.disruption_initiated_count) - Number(_.voluntary_count) - Number(_.involuntary_count),
                          Number(_.disruption_conversations)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-voluntary": P(({ row: _ }) => [
                      u("div", N0, [
                        (b(!0), k(Z, null, ie([_], (w, D) => (b(), k(Z, { key: D }, [
                          R(He, {
                            color: "neutral",
                            outlined: !0
                          }, {
                            default: P(() => [
                              ke(" VOL " + A(L(G)(w.voluntary_count)) + " (" + A(h(
                                w.voluntary_count,
                                w.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          R(He, { color: "success" }, {
                            default: P(() => [
                              ke(" Confirm " + A(L(G)(w.confirmed_count)) + " (" + A(h(
                                w.confirmed_count,
                                w.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          R(He, { color: "warning" }, {
                            default: P(() => [
                              ke(" Not Confirm " + A(L(G)(w.voluntary_count - w.confirmed_count)) + " (" + A(h(
                                w.voluntary_count - w.confirmed_count,
                                w.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          R(He, { color: "danger" }, {
                            default: P(() => [
                              ke(" Reject " + A(L(G)(w.sell_failed_count)) + " (" + A(h(
                                w.sell_failed_count,
                                w.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          R(He, { color: "orange" }, {
                            default: P(() => [
                              ke(" Not Paid " + A(L(G)(
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
                          R(He, {
                            color: "success",
                            outlined: !0
                          }, {
                            default: P(() => [
                              ke(" Finish " + A(L(G)(f(w))) + " (" + A(h(
                                f(w),
                                w.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          (b(!0), k(Z, null, ie(w.payment_success_total || [], (S) => (b(), q(He, {
                            key: `${w.date}-${S.currency}`,
                            color: "neutral"
                          }, {
                            default: P(() => [
                              ke(A(S.currency) + " " + A(p(S.total_value)), 1)
                            ]),
                            _: 2
                          }, 1024))), 128))
                        ], 64))), 128))
                      ])
                    ]),
                    "cell-involuntary": P(({ row: _ }) => [
                      u("div", j0, [
                        (b(!0), k(Z, null, ie([_], (w, D) => (b(), k(Z, { key: D }, [
                          R(He, { color: "purple" }, {
                            default: P(() => [
                              ke(" INV " + A(L(G)(w.involuntary_count)) + " (" + A(h(
                                w.involuntary_count,
                                w.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          R(He, { color: "danger" }, {
                            default: P(() => [
                              ke(" Human " + A(L(G)(w.involuntary_count - w.accepted_count)) + " (" + A(h(
                                w.involuntary_count - w.accepted_count,
                                w.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          R(He, { color: "success" }, {
                            default: P(() => [
                              ke(" Accept " + A(L(G)(w.accepted_count)) + " (" + A(h(
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
              ])) : (b(), k("section", W0, [...g[3] || (g[3] = [
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
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Y0 = /* @__PURE__ */ re(H0, [["__scopeId", "data-v-9dea57da"]]), K0 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, U0 = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, q0 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, X0 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, G0 = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, Z0 = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Q0 = /* @__PURE__ */ J({
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
    const a = e, o = n, s = (v) => {
      o("export", v);
    }, i = pe(a, "theme"), { isDark: l } = ve(i), r = {
      airline_information: "#8b5cf6",
      booking_info: "#f59e0b",
      flight_status: "#06b6d4"
    }, c = oe({
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
      const v = d.value, f = v.total_airline_information_retrieved + v.total_booking_info_retrieved + v.total_flight_status_retrieved, y = (g) => f > 0 ? (g / f * 100).toFixed(1) : "0.0", x = v.total_faq_events, m = x > 0 ? `${(v.total_documents_found / x * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: r.airline_information,
          value: `${y(v.total_airline_information_retrieved)}%`,
          subvalue: `${G(v.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: r.booking_info,
          value: `${y(v.total_booking_info_retrieved)}%`,
          subvalue: `${G(v.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: r.flight_status,
          value: `${y(v.total_flight_status_retrieved)}%`,
          subvalue: `${G(v.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: G(v.total_documents_found),
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
          (_) => Oe(_.date).format("MMM DD")
        ), x = f.map(
          (_) => _.airline_information_retrieved_count || 0
        ), m = f.map(
          (_) => _.flight_status_retrieved_count || 0
        ), g = f.map(
          (_) => _.booking_info_retrieved_count || 0
        );
        c.value = {
          labels: y,
          datasets: [
            {
              label: "Airline Information",
              data: x,
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
    return Le(
      () => a.data,
      (v) => {
        p(v ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: l }), (v, f) => (b(), q(ge, {
      class: "w-full min-h-0 self-start",
      title: "FAQ Metrics",
      subtitle: "FAQ volume by category",
      collapsible: !1,
      loading: a.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !a.loading ? (b(), q(L(Fe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        u("div", {
          class: U(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          R(_e, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: P(() => [
              a.loading ? (b(), k("div", K0, [...f[0] || (f[0] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (b(), k("div", U0, [
                c.value.labels && c.value.labels.length ? (b(), k("section", q0, [
                  u("div", X0, [
                    R(ft, {
                      data: c.value,
                      theme: i.value
                    }, null, 8, ["data", "theme"])
                  ]),
                  u("div", G0, [
                    (b(!0), k(Z, null, ie(h.value, (y) => (b(), q(ue, {
                      key: y.name,
                      class: "min-w-0",
                      color: y.color,
                      title: y.label,
                      value: y.value,
                      subvalue: y.subvalue
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ])
                ])) : (b(), k("section", Z0, [...f[1] || (f[1] = [
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
              ]))
            ]),
            _: 1
          })
        ], 2)
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), J0 = /* @__PURE__ */ re(Q0, [["__scopeId", "data-v-5d7a0066"]]), eb = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, tb = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, nb = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, ab = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, ob = {
  key: 0,
  class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4"
}, sb = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, ib = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, lb = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, rb = { class: "max-w-[360px] px-4 text-center" }, cb = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, db = /* @__PURE__ */ J({
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
    }, o = e, s = n, i = (p) => {
      s("export", p);
    }, l = pe(o, "theme"), { isDark: r } = ve(l), c = C(() => {
      const p = o.data?.agents_by_day || {}, v = Object.keys(p).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const f = /* @__PURE__ */ new Set();
      for (const m of Object.values(p))
        for (const g of Object.keys(m))
          f.add(g);
      const x = Array.from(f).map((m) => {
        const g = m.toLowerCase(), _ = a[g] || a[m] || "#94a3b8";
        return {
          label: m.charAt(0).toUpperCase() + m.slice(1).replace(/_/g, " "),
          data: v.map((w) => p[w]?.[m] || 0),
          borderColor: _
        };
      });
      return {
        labels: v.map((m) => Oe(m).format("MMM DD")),
        datasets: x
      };
    }), d = C(() => {
      const p = o.data?.agents_by_day || {}, v = {};
      for (const y of Object.values(p))
        for (const [x, m] of Object.entries(y))
          v[x] = (v[x] || 0) + m;
      const f = Object.values(v).reduce((y, x) => y + x, 0);
      return f === 0 ? [] : Object.entries(v).sort(([, y], [, x]) => x - y).map(([y, x]) => {
        const m = y.toLowerCase();
        return {
          name: y,
          label: y.charAt(0).toUpperCase() + y.slice(1).replace(/_/g, " "),
          total: x,
          percentage: (x / f * 100).toFixed(1),
          color: a[m] || a[y] || "#94a3b8"
        };
      });
    }), h = C(() => d.value.slice(0, 4));
    return t({ isDark: r }), (p, v) => (b(), q(ge, {
      class: "w-full min-h-0 self-start",
      title: "Interactions by Agent",
      subtitle: "Responses sent by AI agents",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !o.loading ? (b(), q(L(Fe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        u("div", {
          class: U(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", o.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          R(_e, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: P(() => [
              o.loading ? (b(), k("div", eb, [...v[0] || (v[0] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (b(), k("div", tb, [
                c.value.labels && c.value.labels.length ? (b(), k("section", nb, [
                  u("div", ab, [
                    R(ft, {
                      data: c.value,
                      options: e.options,
                      theme: l.value
                    }, null, 8, ["data", "options", "theme"])
                  ]),
                  h.value.length ? (b(), k("div", ob, [
                    (b(!0), k(Z, null, ie(h.value, (f) => (b(), q(ue, {
                      key: f.name,
                      class: "min-w-0",
                      color: f.color,
                      title: f.label,
                      value: `${f.percentage}%`,
                      subvalue: `${L(G)(f.total)} msgs`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ])) : V("", !0)
                ])) : d.value.length ? (b(), k("section", sb, [
                  u("div", ib, [
                    (b(!0), k(Z, null, ie(h.value, (f) => (b(), q(ue, {
                      key: f.name,
                      class: "min-w-0",
                      color: f.color,
                      title: f.label,
                      value: `${f.percentage}%`,
                      subvalue: `${L(G)(f.total)} msgs`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ])
                ])) : V("", !0),
                d.value.length ? V("", !0) : (b(), k("section", lb, [
                  u("div", rb, [
                    u("div", cb, [
                      R(L(Xe), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                    ]),
                    v[1] || (v[1] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agent interactions data ", -1)),
                    v[2] || (v[2] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
                  ])
                ]))
              ]))
            ]),
            _: 1
          })
        ], 2)
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), ub = /* @__PURE__ */ re(db, [["__scopeId", "data-v-299d9c3f"]]), hb = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, fb = {
  key: "content",
  class: "card-body"
}, gb = {
  key: 0,
  class: "chart-section"
}, pb = {
  key: 1,
  class: "empty-state"
}, mb = {
  key: 2,
  class: "comparison-section"
}, bb = { class: "comparison-grid" }, vb = /* @__PURE__ */ J({
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
    }, o = [
      "#B0C4DE",
      "#C9A0F2",
      "#F5C26B",
      "#8BE8B0",
      "#F2A07A",
      "#7BA3E8"
    ], s = e, i = n, l = (f) => {
      i("export", f);
    }, { isDark: r } = ve(pe(s, "theme"));
    C(() => s.data?.total_sell_success ?? 0);
    const c = C(() => {
      const f = /* @__PURE__ */ new Set();
      for (const y of s.data?.sales_by_channel_by_day ?? [])
        for (const x of Object.keys(y.channels))
          f.add(x);
      return Array.from(f).sort();
    }), d = (f, y) => a[f.toLowerCase()] ?? o[y % o.length];
    function h(f) {
      return f.replace(/_/g, " ").toUpperCase();
    }
    function p(f) {
      if (f.delta === null) return "No previous data";
      const y = G(f.previous), x = `${Math.abs(f.delta).toFixed(1)}%`;
      return f.delta === 0 ? `0.0% vs prev. period (${y})` : `${f.delta > 0 ? "↑" : "↓"} ${x} vs prev. period (${y})`;
    }
    const v = C(() => {
      const f = s.data?.sales_by_channel_by_day ?? [];
      if (f.length === 0) return { labels: [], datasets: [] };
      const y = f.map((m) => Oe(m.date).format("MMM-DD")), x = c.value.map((m, g) => ({
        label: m,
        data: f.map((_) => _.channels[m] ?? 0),
        backgroundColor: d(m, g),
        borderRadius: 4
      }));
      return { labels: y, datasets: x };
    });
    return t({ isDark: r }), (f, y) => (b(), q(ge, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen,
      loading: s.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !s.loading ? (b(), q(L(Fe), {
          key: 0,
          variant: "inline",
          onExport: l,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        R(_e, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: P(() => [
            s.loading ? (b(), k("div", hb, [...y[0] || (y[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (b(), k("div", fb, [
              v.value.labels.length > 0 ? (b(), k("section", gb, [
                R(vt, {
                  data: v.value,
                  stacked: !0
                }, null, 8, ["data"])
              ])) : (b(), k("section", pb, [...y[1] || (y[1] = [
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
              e.channelComparison.length > 0 ? (b(), k("section", mb, [
                u("div", bb, [
                  (b(!0), k(Z, null, ie(e.channelComparison, (x, m) => (b(), q(L(ue), {
                    key: x.channel,
                    color: d(x.channel, m),
                    title: h(x.channel),
                    value: L(G)(x.current),
                    subvalue: p(x)
                  }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                ])
              ])) : V("", !0)
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), qi = /* @__PURE__ */ re(vb, [["__scopeId", "data-v-b99f46a5"]]), yb = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, _b = {
  key: "content",
  class: "card-body"
}, xb = {
  key: 0,
  class: "chart-section"
}, kb = { class: "chart-wrapper" }, wb = {
  key: 1,
  class: "empty-state"
}, Cb = { class: "seller-value-cards" }, $b = {
  key: 2,
  class: "seller-daily-section"
}, Mb = { class: "w-full min-w-0" }, Sb = { class: "sl-cell font-medium" }, Db = { class: "sl-cell text-center" }, Ab = { class: "sl-cell text-center" }, Tb = { class: "sl-cell text-center" }, Bb = { class: "sl-cell text-center" }, Lb = { class: "sl-cell text-center" }, Fb = { class: "sl-cell text-center success-value" }, Pb = {
  key: 0,
  class: "currency-cell-list"
}, Eb = {
  key: 1,
  class: "empty-cell"
}, Ib = { class: "sl-cell text-center success-value" }, Rb = { class: "sl-cell text-center" }, Ob = { class: "sl-cell text-center success-value" }, Vb = {
  key: 0,
  class: "currency-cell-list"
}, zb = {
  key: 1,
  class: "empty-cell"
}, Nb = { class: "sl-cell text-center success-value" }, jb = { class: "sl-cell text-center" }, Wb = { class: "sl-cell text-center success-value" }, Hb = {
  key: 0,
  class: "currency-cell-list"
}, Yb = { key: 1 }, Kb = {
  key: 0,
  class: "failed-reasons"
}, Ub = { class: "reason-name" }, qb = { class: "reason-count" }, Xb = {
  key: 1,
  class: "empty-cell"
}, Gb = /* @__PURE__ */ J({
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
    const o = e, s = n, i = (B) => {
      s("export", B);
    }, { isDark: l } = ve(pe(o, "theme")), r = C(() => {
      if (!o.sellerData?.seller_by_day) return [];
      const B = [...o.sellerData.seller_by_day];
      return o.failedData?.failed_by_reason_by_day && o.failedData.failed_by_reason_by_day.forEach((E) => {
        const I = B.findIndex(
          (N) => N.date === E.date
        );
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
      }), B.sort(
        (E, I) => new Date(E.date).getTime() - new Date(I.date).getTime()
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
    ), x = C(() => {
      const B = v.value;
      return B.length > 0 ? B.map(
        (E) => `${E.currency} ${At(E.total_value)}`
      ).join(" · ") : T(o.sellerData.total_value_sell_success);
    });
    function m(B) {
      return B.length > 0 ? B.map(
        (E) => `${E.currency} ${At(E.total_value)}`
      ).join(" · ") : "—";
    }
    const g = C(
      () => m(f.value)
    ), _ = C(
      () => m(y.value)
    ), w = C(() => {
      const {
        total_seller_conversations: B = 0,
        total_sell_started: E = 0,
        total_sell_booking_created: I = 0,
        total_sell_success: N = 0,
        total_sell_bank_transfer: Y = 0,
        total_sell_cash_option: j = 0,
        total_sell_success_bank_transfer: Q = 0,
        total_sell_success_cash: ee = 0
      } = h.value, { failed_by_reason_by_day: ce = [] } = p.value;
      if (B === 0) return { nodes: [], links: [] };
      const z = Math.max(
        0,
        N - (Q ?? 0) - (ee ?? 0)
      ), K = [
        { name: "Sell Initiated", value: B },
        { name: "Sell Started", value: E },
        { name: "Booking Created", value: I },
        { name: "Sell Success", value: z }
      ], X = [], le = B - E;
      if (le > 0) {
        const W = Math.round(le / B * 100);
        K.push({ name: "Abandoned (Init)", value: le }), X.push({
          source: "Sell Initiated",
          target: "Abandoned (Init)",
          value: le,
          label: `${le.toLocaleString()} (${W}%)`
        });
      }
      if (E > 0) {
        const W = Math.round(E / B * 100);
        X.push({
          source: "Sell Initiated",
          target: "Sell Started",
          value: E,
          label: `${E.toLocaleString()} (${W}%)`
        });
      }
      const se = ce.reduce(
        (W, te) => (te.reasons && Array.isArray(te.reasons) && te.reasons.forEach((ne) => {
          const de = ne.reason, me = ne.failed_count;
          W[de] = (W[de] || 0) + me;
        }), W),
        {}
      );
      if (I > 0) {
        const W = Math.round(I / B * 100);
        X.push({
          source: "Sell Started",
          target: "Booking Created",
          value: I,
          label: `${I.toLocaleString()} (${W}%)`
        });
      }
      if (Y > 0) {
        const W = Math.round(Y / B * 100);
        K.push({ name: "Bank Transfer", value: Y }), X.push({
          source: "Booking Created",
          target: "Bank Transfer",
          value: Y,
          label: `${Y.toLocaleString()} (${W}%)`
        });
      }
      if (j > 0) {
        const W = Math.round(j / B * 100);
        K.push({ name: "Cash Option", value: j }), X.push({
          source: "Booking Created",
          target: "Cash Option",
          value: j,
          label: `${j.toLocaleString()} (${W}%)`
        });
      }
      if (z > 0) {
        const W = Math.round(z / B * 100);
        X.push({
          source: "Booking Created",
          target: "Sell Success",
          value: z,
          label: `${z.toLocaleString()} (${W}%)`
        });
      }
      if ((Q ?? 0) > 0) {
        const W = Math.round(
          (Q ?? 0) / B * 100
        );
        K.push({
          name: "Bank Transfer Success",
          value: Q ?? 0
        }), X.push({
          source: "Bank Transfer",
          target: "Bank Transfer Success",
          value: Q ?? 0,
          label: `${(Q ?? 0).toLocaleString()} (${W}%)`
        });
      }
      if ((ee ?? 0) > 0) {
        const W = Math.round((ee ?? 0) / B * 100);
        K.push({ name: "Cash Option Success", value: ee ?? 0 }), X.push({
          source: "Cash Option",
          target: "Cash Option Success",
          value: ee ?? 0,
          label: `${(ee ?? 0).toLocaleString()} (${W}%)`
        });
      }
      const Ae = I - z - Y - j;
      if (Ae > 0) {
        const W = Math.round(Ae / B * 100);
        K.push({ name: "Failed at Completion", value: Ae }), X.push({
          source: "Booking Created",
          target: "Failed at Completion",
          value: Ae,
          label: `${Ae.toLocaleString()} (${W}%)`
        });
      }
      const xe = E - I;
      if (xe > 0) {
        const W = Math.round(xe / B * 100);
        K.push({ name: "Failed at Booking", value: xe }), X.push({
          source: "Sell Started",
          target: "Failed at Booking",
          value: xe,
          label: `${xe.toLocaleString()} (${W}%)`
        });
      }
      if (Object.keys(se).length > 0) {
        const W = Object.values(se).reduce(
          (ne, de) => ne + de,
          0
        ), te = xe - W;
        if (Object.entries(se).filter(([, ne]) => ne > 0).sort(([, ne], [, de]) => de - ne).forEach(([ne, de]) => {
          const me = Math.round(de / B * 100);
          K.push({ name: `Failed: ${ne}`, value: de }), X.push({
            source: "Failed at Booking",
            target: `Failed: ${ne}`,
            value: de,
            label: `${de.toLocaleString()} (${me}%)`
          });
        }), te > 0) {
          const ne = Math.round(te / B * 100);
          K.push({ name: "Failed: Without Reason", value: te }), X.push({
            source: "Failed at Booking",
            target: "Failed: Without Reason",
            value: te,
            label: `${te.toLocaleString()} (${ne}%)`
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
    }, S = C(() => D), $ = (B, E) => !E || E === 0 ? "0%" : `${Math.round(B / E * 100)}%`, M = (B, E) => {
      const I = G(B), N = $(B, E);
      return `${I} (${N})`;
    }, F = (B) => B == null ? 0 : typeof B == "number" ? B : Array.isArray(B) ? B.reduce((E, I) => E + (I.total_value || 0), 0) : 0, T = (B) => At(F(B));
    return t({ isDark: l }), (B, E) => (b(), q(ge, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: o.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !o.loading ? (b(), q(L(Fe), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        R(_e, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: P(() => [
            o.loading ? (b(), k("div", yb, [...E[0] || (E[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (b(), k("div", _b, [
              w.value.nodes.length > 0 ? (b(), k("section", xb, [
                u("div", kb, [
                  R(zt, {
                    data: w.value,
                    "node-colors": S.value,
                    title: "",
                    height: "320px"
                  }, null, 8, ["data", "node-colors"])
                ])
              ])) : (b(), k("section", wb, [...E[1] || (E[1] = [
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
              u("section", Cb, [
                R(ue, {
                  class: "seller-value-card",
                  color: "var(--kiut-success)",
                  title: "Total Sales Value",
                  value: x.value
                }, null, 8, ["value"]),
                R(ue, {
                  class: "seller-value-card",
                  color: "#d97706",
                  title: "Bank Transfer Value",
                  value: g.value
                }, null, 8, ["value"]),
                R(ue, {
                  class: "seller-value-card",
                  color: "#ca8a04",
                  title: "Cash Option Value",
                  value: _.value
                }, null, 8, ["value"])
              ]),
              r.value && r.value.length > 0 ? (b(), k("section", $b, [
                u("div", Mb, [
                  R(st, {
                    columns: c,
                    rows: d.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": P(({ row: I }) => [
                      u("span", Sb, A(L(Oe)(String(I.date)).format("MMM DD")), 1)
                    ]),
                    "cell-sellInitiated": P(({ row: I }) => [
                      u("span", Db, A(L(G)(Number(I.seller_conversations) || 0)), 1)
                    ]),
                    "cell-sellStarted": P(({ row: I }) => [
                      u("span", Ab, A(M(
                        I.sell_started_count,
                        I.seller_conversations || I.sell_started_count
                      )), 1)
                    ]),
                    "cell-getQuote": P(({ row: I }) => [
                      u("span", Tb, A(M(
                        I.sell_get_quote_count,
                        I.seller_conversations || I.sell_started_count
                      )), 1)
                    ]),
                    "cell-bookingCreated": P(({ row: I }) => [
                      u("span", Bb, A(M(
                        I.sell_booking_created_count,
                        I.seller_conversations || I.sell_started_count
                      )), 1)
                    ]),
                    "cell-bankTransfer": P(({ row: I }) => [
                      u("span", Lb, A(L(G)(Number(I.sell_bank_transfer_count) || 0)), 1)
                    ]),
                    "cell-btValue": P(({ row: I }) => [
                      u("span", Fb, [
                        Array.isArray(
                          I.daily_value_sell_success_bank_transfer
                        ) && I.daily_value_sell_success_bank_transfer.length > 0 ? (b(), k("div", Pb, [
                          (b(!0), k(Z, null, ie(I.daily_value_sell_success_bank_transfer, (N) => (b(), k("span", {
                            key: `${I.date}-bt-success-${N.currency}`
                          }, A(N.currency) + " " + A(L(At)(N.total_value)), 1))), 128))
                        ])) : (b(), k("span", Eb, "-"))
                      ])
                    ]),
                    "cell-btSuccess": P(({ row: I }) => [
                      u("span", Ib, A(L(G)(
                        Number(
                          I.sell_success_bank_transfer_count
                        ) || 0
                      )), 1)
                    ]),
                    "cell-cashOption": P(({ row: I }) => [
                      u("span", Rb, A(L(G)(Number(I.sell_cash_option_count) || 0)), 1)
                    ]),
                    "cell-coValue": P(({ row: I }) => [
                      u("span", Ob, [
                        Array.isArray(
                          I.daily_value_sell_success_cash
                        ) && I.daily_value_sell_success_cash.length > 0 ? (b(), k("div", Vb, [
                          (b(!0), k(Z, null, ie(I.daily_value_sell_success_cash, (N) => (b(), k("span", {
                            key: `${I.date}-co-success-${N.currency}`
                          }, A(N.currency) + " " + A(L(At)(N.total_value)), 1))), 128))
                        ])) : (b(), k("span", zb, "-"))
                      ])
                    ]),
                    "cell-cashSuccess": P(({ row: I }) => [
                      u("span", Nb, A(L(G)(
                        Number(I.sell_success_cash_count) || 0
                      )), 1)
                    ]),
                    "cell-sellSuccess": P(({ row: I }) => [
                      u("span", jb, A(M(
                        I.sell_success_count,
                        I.seller_conversations || I.sell_started_count
                      )), 1)
                    ]),
                    "cell-totalSalesValue": P(({ row: I }) => [
                      u("span", Wb, [
                        Array.isArray(I.daily_value_sell_success) && I.daily_value_sell_success.length > 0 ? (b(), k("div", Hb, [
                          (b(!0), k(Z, null, ie(I.daily_value_sell_success, (N) => (b(), k("span", {
                            key: `${I.date}-${N.currency}`
                          }, A(N.currency) + " " + A(L(At)(N.total_value)), 1))), 128))
                        ])) : (b(), k("span", Yb, A(T(
                          I.daily_value_sell_success
                        )), 1))
                      ])
                    ]),
                    "cell-failed": P(({ row: I }) => [
                      (I.reasons || []).length > 0 ? (b(), k("div", Kb, [
                        (b(!0), k(Z, null, ie(I.reasons || [], (N) => (b(), k("div", {
                          key: N.reason,
                          class: "failed-reason-item"
                        }, [
                          u("span", Ub, A(N.reason) + ":", 1),
                          u("span", qb, A(N.failed_count), 1)
                        ]))), 128))
                      ])) : (b(), k("div", Xb, "-"))
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : V("", !0)
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), Xi = /* @__PURE__ */ re(Gb, [["__scopeId", "data-v-24bbf22b"]]), Zb = { class: "seller-container__body" }, Qb = /* @__PURE__ */ J({
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
    const n = e, a = t, o = C(() => n.loading || n.sellerLoading), s = C(() => n.loading || n.salesByChannelLoading), i = C(() => n.exportLoading || n.sellerExportLoading), l = C(() => n.exportLoading || n.salesByChannelExportLoading);
    function r(c, d) {
      a("export", { source: c, format: d });
    }
    return (c, d) => (b(), q(ge, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading
    }, {
      default: P(() => [
        u("div", Zb, [
          R(Xi, {
            "initially-open": e.childrenInitiallyOpen,
            "seller-data": e.sellerData,
            "failed-data": e.failedData,
            loading: o.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": i.value,
            onExport: d[0] || (d[0] = (h) => r("seller", h))
          }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading"]),
          R(qi, {
            "initially-open": e.childrenInitiallyOpen,
            data: e.salesByChannelData,
            "channel-comparison": e.channelComparison,
            loading: s.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": l.value,
            onExport: d[1] || (d[1] = (h) => r("salesByChannel", h))
          }, null, 8, ["initially-open", "data", "channel-comparison", "loading", "theme", "enable-export", "export-loading"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), Jb = /* @__PURE__ */ re(Qb, [["__scopeId", "data-v-a9f0dfd2"]]), ev = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, tv = {
  key: "content",
  class: "card-body"
}, nv = {
  key: 0,
  class: "chart-section"
}, av = {
  key: 1,
  class: "empty-state"
}, ov = { class: "empty-state-content" }, sv = { class: "empty-icon-wrapper" }, iv = /* @__PURE__ */ J({
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
    }, o = e, s = n, i = (h) => {
      s("export", h);
    }, { isDark: l, colors: r } = ve(pe(o, "theme")), c = C(() => {
      const p = (o.data?.top_agents || []).filter(
        (x) => x.agent_type?.toLowerCase() !== "triage"
      );
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const v = p.reduce(
        (x, m) => x + (Number(m.conversations) || 0),
        0
      ), f = p.map((x) => {
        const m = x.agent_type?.toLowerCase();
        return a[m] || "#94a3b8";
      }), y = f.map((x) => `${x}80`);
      return {
        labels: p.map((x) => {
          const m = Number(x.conversations) || 0, g = v ? m / v * 100 : 0;
          return `${x.agent_type} - ${m.toLocaleString()} (${g.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: p.map((x) => x.conversations),
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
                (x, m) => x + (Number(m) || 0),
                0
              ), y = f ? v / f * 100 : 0;
              return `${p}: ${v.toLocaleString()} (${y.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: l }), (h, p) => (b(), q(ge, {
      class: "top-agents-root h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !e.loading ? (b(), q(L(Fe), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        R(_e, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: P(() => [
            e.loading ? (b(), k("div", ev, [...p[0] || (p[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (b(), k("div", tv, [
              c.value.labels && c.value.labels.length ? (b(), k("section", nv, [
                R(pa, {
                  data: c.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ])) : (b(), k("section", av, [
                u("div", ov, [
                  u("div", sv, [
                    R(L(yp), { class: "empty-icon" })
                  ]),
                  p[1] || (p[1] = u("p", { class: "empty-title" }, "No top agents data", -1)),
                  p[2] || (p[2] = u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
                ])
              ]))
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), lv = /* @__PURE__ */ re(iv, [["__scopeId", "data-v-a52fe7ae"]]), rv = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, cv = {
  key: "content",
  class: "card-body"
}, dv = {
  key: 0,
  class: "payment-methods-section"
}, uv = { class: "payment-methods-grid" }, hv = {
  key: 1,
  class: "empty-state"
}, fv = { class: "empty-state-content" }, gv = { class: "empty-icon-wrapper" }, pv = {
  key: 2,
  class: "payment-method-daily-section"
}, mv = { class: "w-full min-w-0" }, bv = { class: "font-medium" }, vv = { class: "text-center" }, yv = { class: "text-center success-value" }, _v = {
  key: 0,
  class: "currency-cell-list"
}, xv = { class: "payment-tags" }, kv = { class: "tag-name" }, wv = {
  key: 0,
  class: "tag-amount"
}, Cv = {
  key: 1,
  class: "tag-amount"
}, $v = { class: "tag-count" }, Mv = {
  key: 3,
  class: "empty-table-state"
}, Sv = "Not Registered", Dv = /* @__PURE__ */ J({
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
    const a = e, o = n, { isDark: s } = ve(pe(a, "theme")), i = oe(!1), l = oe({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), r = C(() => l.value.payment_method_breakdown && l.value.payment_method_breakdown.length > 0), c = C(() => l.value.payment_method_by_day && l.value.payment_method_by_day.length > 0), d = C(() => !l.value.payment_method_by_day || l.value.payment_method_by_day.length === 0 ? [] : [...l.value.payment_method_by_day].sort(($, M) => Oe($.date).valueOf() - Oe(M.date).valueOf())), h = [
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
            (T) => Oe(T).format("YYYY-MM-DD")
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
    ], x = ($) => !$ || $.toLowerCase() === "unknown" ? Sv : $.replace(/_/g, " "), m = ($) => $ == null ? "$0.00" : $e($), g = ($) => {
      const M = $.total_amount_by_currency;
      return M && M.length > 0 ? M.map((F) => `${F.currency} ${m(F.total_value)}`).join(" · ") : m($.total_amount);
    }, _ = ($) => $ ? Oe($).format("MMM DD") : "-", w = ($) => $ == null || Number.isNaN(Number($)) ? 0 : Number($), D = ($) => {
      o("export", $);
    };
    function S() {
      const $ = a.data;
      $ && (Array.isArray($.payment_method_breakdown) && $.payment_method_breakdown.length > 0 || Array.isArray($.payment_method_by_day) && $.payment_method_by_day.length > 0) && (i.value = !1, l.value = v($));
    }
    return tt(() => {
      a.data ? S() : f();
    }), Le(
      () => a.data,
      ($) => {
        $ && S();
      },
      { deep: !0 }
    ), Le(
      () => a.dates,
      ($) => {
        a.data || $ && $[0] && $[1] && f();
      },
      { deep: !0 }
    ), t({ isDark: s }), ($, M) => (b(), q(ge, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method",
      loading: i.value
    }, {
      headerExport: P(() => [
        e.enableExport && !i.value ? (b(), q(L(Fe), {
          key: 0,
          variant: "inline",
          onExport: D,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        R(_e, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: P(() => [
            i.value ? (b(), k("div", rv, [...M[0] || (M[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (b(), k("div", cv, [
              r.value ? (b(), k("section", dv, [
                M[1] || (M[1] = u("p", { class: "section-label" }, "Sales by Payment Method", -1)),
                u("div", uv, [
                  (b(!0), k(Z, null, ie(l.value.payment_method_breakdown, (F, T) => (b(), q(ue, {
                    key: F.payment_method,
                    class: "payment-method-card-item min-w-0",
                    color: y[T % y.length],
                    title: x(F.payment_method),
                    value: g(F),
                    subvalue: `${w(F.count)} ${w(F.count) === 1 ? "sale" : "sales"}`
                  }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                ])
              ])) : (b(), k("section", hv, [
                u("div", fv, [
                  u("div", gv, [
                    R(L(xp), { class: "empty-icon" })
                  ]),
                  M[2] || (M[2] = u("p", { class: "empty-title" }, "No payment data available", -1)),
                  M[3] || (M[3] = u("p", { class: "empty-description" }, " No payment method data found for the selected period. Try adjusting the date range. ", -1))
                ])
              ])),
              c.value ? (b(), k("section", pv, [
                M[5] || (M[5] = u("p", { class: "section-label" }, "Daily Breakdown", -1)),
                u("div", mv, [
                  R(st, {
                    columns: h,
                    rows: p.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": P(({ row: F }) => [
                      u("span", bv, A(_(String(F.date))), 1)
                    ]),
                    "cell-totalSales": P(({ row: F }) => [
                      u("span", vv, A(L(G)(F.total_count ?? 0)), 1)
                    ]),
                    "cell-totalAmount": P(({ row: F }) => [
                      u("span", yv, [
                        Array.isArray(F.total_amount_by_currency) && F.total_amount_by_currency.length > 0 ? (b(), k("div", _v, [
                          (b(!0), k(Z, null, ie(F.total_amount_by_currency, (T) => (b(), k("span", {
                            key: `${F.date}-${T.currency}`
                          }, A(T.currency) + " " + A(m(T.total_value)), 1))), 128))
                        ])) : (b(), k(Z, { key: 1 }, [
                          ke(A(m(Number(F.total_amount ?? 0))), 1)
                        ], 64))
                      ])
                    ]),
                    "cell-paymentMethods": P(({ row: F }) => [
                      u("div", xv, [
                        (b(!0), k(Z, null, ie(Array.isArray(F.payment_methods) ? F.payment_methods : [], (T) => (b(), k("div", {
                          key: T.payment_method,
                          class: "payment-tag"
                        }, [
                          u("span", kv, A(x(T.payment_method)), 1),
                          M[4] || (M[4] = u("span", { class: "tag-separator" }, "•", -1)),
                          !T.total_amount_by_currency || T.total_amount_by_currency.length === 0 ? (b(), k("span", wv, A(m(T.total_amount)), 1)) : (b(), k("span", Cv, A(T.total_amount_by_currency.map(
                            (B) => `${B.currency} ${m(B.total_value)}`
                          ).join(" / ")), 1)),
                          u("span", $v, "(" + A(w(T.count)) + ")", 1)
                        ]))), 128))
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : r.value ? (b(), k("div", Mv, [...M[6] || (M[6] = [
                u("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
              ])])) : V("", !0)
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Av = /* @__PURE__ */ re(Dv, [["__scopeId", "data-v-0d6d2847"]]), Tv = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, Bv = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, Lv = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, Fv = {
  key: 0,
  scope: "col",
  class: "w-12 px-4 py-3 text-center align-middle"
}, Pv = ["checked", "aria-label"], Ev = {
  key: 0,
  class: "w-12 bg-transparent px-4 py-3 text-center align-middle"
}, Iv = ["checked", "aria-label", "onChange"], Rv = /* @__PURE__ */ J({
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
    fixedLayout: { type: Boolean, default: !1 }
  },
  emits: ["update:selectedKeys"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = oe(null);
    function s(g) {
      return `cell-${g}`;
    }
    function i(g) {
      return g === "center" ? "text-center" : g === "right" ? "text-right" : "text-left";
    }
    function l(g, _) {
      if (typeof n.rowKey == "function")
        return n.rowKey(g);
      const w = g[n.rowKey];
      return w != null ? String(w) : `__index_${_}`;
    }
    function r(g, _) {
      return g[_];
    }
    function c(g) {
      return g == null || typeof g == "object" ? "" : String(g);
    }
    function d(g, _) {
      return l(g, _);
    }
    const h = C(
      () => n.rows.map((g, _) => l(g, _))
    );
    function p(g, _) {
      const w = l(g, _);
      return n.selectedKeys.includes(w);
    }
    const v = C(() => !n.selectable || n.rows.length === 0 ? !1 : h.value.every((g) => n.selectedKeys.includes(g))), f = C(() => {
      if (!n.selectable || n.rows.length === 0) return !1;
      const g = h.value.filter((_) => n.selectedKeys.includes(_));
      return g.length > 0 && g.length < n.rows.length;
    });
    Le(
      [f, v, () => n.selectable],
      async () => {
        await Ve();
        const g = o.value;
        g && (g.indeterminate = f.value && !v.value);
      },
      { immediate: !0 }
    );
    function y() {
      if (n.selectable)
        if (v.value) {
          const g = n.selectedKeys.filter((_) => !h.value.includes(_));
          a("update:selectedKeys", g);
        } else {
          const g = new Set(n.selectedKeys);
          h.value.forEach((_) => g.add(_)), a("update:selectedKeys", [...g]);
        }
    }
    function x(g, _) {
      if (!n.selectable) return;
      const w = l(g, _);
      n.selectedKeys.includes(w) ? a(
        "update:selectedKeys",
        n.selectedKeys.filter((S) => S !== w)
      ) : a("update:selectedKeys", [...n.selectedKeys, w]);
    }
    function m(g, _) {
      const w = l(g, _);
      return `${n.ariaLabelSelectRow} ${w}`;
    }
    return (g, _) => (b(), k("div", Tv, [
      u("div", Bv, [
        u("table", {
          class: U([
            "kiut-table w-full min-w-[640px] overflow-hidden border-collapse text-left text-sm",
            e.fixedLayout ? "table-fixed" : ""
          ])
        }, [
          u("thead", null, [
            u("tr", Lv, [
              e.selectable ? (b(), k("th", Fv, [
                u("input", {
                  ref_key: "selectAllRef",
                  ref: o,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: v.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: y
                }, null, 40, Pv)
              ])) : V("", !0),
              (b(!0), k(Z, null, ie(e.columns, (w) => (b(), k("th", {
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
            (b(!0), k(Z, null, ie(e.rows, (w, D) => (b(), k("tr", {
              key: d(w, D),
              class: "h-14 border-b border-[#e5e7eb] last:border-b-0 bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]"
            }, [
              e.selectable ? (b(), k("td", Ev, [
                u("input", {
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: p(w, D),
                  "aria-label": m(w, D),
                  onChange: (S) => x(w, D)
                }, null, 40, Iv)
              ])) : V("", !0),
              (b(!0), k(Z, null, ie(e.columns, (S) => (b(), k("td", {
                key: S.key,
                class: U([
                  "bg-transparent px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                  i(S.align),
                  S.cellClass ?? ""
                ])
              }, [
                Ce(g.$slots, s(S.key), {
                  row: w,
                  column: S,
                  value: r(w, S.key)
                }, () => [
                  ke(A(c(r(w, S.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ], 2)
      ])
    ]));
  }
}), Gi = /* @__PURE__ */ re(Rv, [["__scopeId", "data-v-a393173c"]]), Ov = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Vv = {
  key: "content",
  class: "card-body"
}, zv = { class: "summary-cards" }, Nv = {
  key: 0,
  class: "summary-card enqueued-card"
}, jv = { class: "summary-card-content" }, Wv = { class: "card-content enqueued-content" }, Hv = { class: "card-value enqueued-value" }, Yv = { class: "summary-card assigned-card" }, Kv = { class: "summary-card-content" }, Uv = { class: "card-content" }, qv = { class: "card-value assigned-value" }, Xv = { class: "card-content" }, Gv = { class: "card-value assigned-value" }, Zv = { class: "summary-card closed-card" }, Qv = { class: "summary-card-content" }, Jv = { class: "card-content" }, ey = { class: "card-value closed-value" }, ty = { class: "card-content" }, ny = { class: "card-value closed-value" }, ay = {
  key: 0,
  class: "agents-section"
}, oy = { class: "date-header" }, sy = { class: "date-title" }, iy = { class: "date-stats" }, ly = {
  key: 0,
  class: "stat-item enqueued-stat"
}, ry = { class: "stat-value" }, cy = { class: "stat-item assigned-stat" }, dy = { class: "stat-value" }, uy = { class: "stat-value" }, hy = { class: "stat-item closed-stat" }, fy = { class: "stat-value" }, gy = { class: "stat-value" }, py = { class: "w-full min-w-0" }, my = { class: "ah-cell name-cell" }, by = { class: "ah-cell email-cell" }, vy = { class: "metric-cell-content" }, yy = { class: "badge assigned-badge" }, _y = { class: "metric-cell-avg" }, xy = { class: "metric-cell-content" }, ky = { class: "badge closed-badge" }, wy = { class: "metric-cell-avg" }, Cy = ["onClick"], $y = {
  key: 1,
  class: "empty-state"
}, Ta = 3, My = /* @__PURE__ */ J({
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
    const a = e, o = n, s = (M) => {
      o("export", M);
    }, { isDark: i } = ve(pe(a, "theme")), l = C(() => {
      const M = a.data?.agents_by_day && a.data.agents_by_day.length > 0, F = (a.data?.total_enqueued ?? 0) > 0;
      return M || F;
    }), r = C(() => {
      if (!l.value) return {};
      const M = {};
      for (const B of a.data.agents_by_day)
        M[B.date] || (M[B.date] = []), M[B.date].push(B);
      const F = Object.keys(M).sort((B, E) => new Date(B).getTime() - new Date(E).getTime()), T = {};
      for (const B of F)
        T[B] = M[B];
      return T;
    }), c = oe({});
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
    const x = (M) => M == null ? "0" : G(M), m = (M) => {
      if (M == null)
        return "AVG";
      if (M < 60)
        return `${Math.round(M)}s`;
      const F = Math.round(M), T = Math.floor(F / 60), B = F % 60;
      if (T < 60)
        return `${T}m ${B}s`;
      const E = Math.floor(T / 60), I = T % 60;
      return `${E}h ${I}m`;
    }, g = (M) => {
      const F = new Date(M), T = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return F.toLocaleDateString("en-US", T);
    }, _ = (M) => M[0]?.day_total_enqueued ?? 0, w = (M) => M[0]?.day_total_assigned ?? 0, D = (M) => M[0]?.day_total_closed ?? 0, S = (M) => M[0]?.day_avg_time_to_assign_seconds ?? null, $ = (M) => M[0]?.day_avg_conversation_duration_seconds ?? null;
    return t({ isDark: i }), (M, F) => (b(), q(ge, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent",
      loading: e.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !e.loading ? (b(), q(L(Fe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        R(_e, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: P(() => [
            e.loading ? (b(), k("div", Ov, [...F[0] || (F[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (b(), k("div", Vv, [
              u("div", zv, [
                e.data.total_enqueued ? (b(), k("div", Nv, [
                  F[2] || (F[2] = u("div", { class: "card-decoration" }, null, -1)),
                  u("div", jv, [
                    u("div", Wv, [
                      F[1] || (F[1] = u("p", { class: "card-label" }, "Total Enqueued", -1)),
                      u("p", Hv, A(x(e.data.total_enqueued)), 1)
                    ])
                  ])
                ])) : V("", !0),
                u("div", Yv, [
                  F[5] || (F[5] = u("div", { class: "card-decoration" }, null, -1)),
                  u("div", Kv, [
                    u("div", Uv, [
                      F[3] || (F[3] = u("p", { class: "card-label" }, "Total Assigned", -1)),
                      u("p", qv, A(x(e.data.total_assigned)), 1)
                    ]),
                    u("div", Xv, [
                      F[4] || (F[4] = u("p", { class: "card-label" }, "AVG time to assign", -1)),
                      u("p", Gv, A(m(e.data.avg_time_to_assign_seconds)), 1)
                    ])
                  ])
                ]),
                u("div", Zv, [
                  F[8] || (F[8] = u("div", { class: "card-decoration" }, null, -1)),
                  u("div", Qv, [
                    u("div", Jv, [
                      F[6] || (F[6] = u("p", { class: "card-label" }, "Total Closed", -1)),
                      u("p", ey, A(x(e.data.total_closed)), 1)
                    ]),
                    u("div", ty, [
                      F[7] || (F[7] = u("p", { class: "card-label" }, "AVG time to close", -1)),
                      u("p", ny, A(m(e.data.avg_conversation_duration_seconds)), 1)
                    ])
                  ])
                ])
              ]),
              l.value ? (b(), k("div", ay, [
                (b(!0), k(Z, null, ie(r.value, (T, B) => (b(), k("div", {
                  key: B,
                  class: "date-group"
                }, [
                  u("div", oy, [
                    u("h4", sy, A(g(B)), 1),
                    u("div", iy, [
                      _(T) ? (b(), k("span", ly, [
                        u("span", ry, A(x(_(T))), 1),
                        F[9] || (F[9] = ke(" Enqueued ", -1))
                      ])) : V("", !0),
                      u("span", cy, [
                        u("span", dy, A(x(w(T))), 1),
                        F[10] || (F[10] = ke(" Assigned ", -1)),
                        u("span", uy, A(m(S(T))), 1)
                      ]),
                      u("span", hy, [
                        u("span", fy, A(x(D(T))), 1),
                        F[11] || (F[11] = ke(" Closed ", -1)),
                        u("span", gy, A(m($(T))), 1)
                      ])
                    ])
                  ]),
                  u("div", py, [
                    R(Gi, {
                      columns: f,
                      rows: y(String(B), T),
                      "row-key": "id"
                    }, {
                      "cell-agentName": P(({ row: E }) => [
                        u("span", my, A(E.agent_name || "-"), 1)
                      ]),
                      "cell-email": P(({ row: E }) => [
                        u("span", by, A(E.agent_email), 1)
                      ]),
                      "cell-assigned": P(({ row: E }) => [
                        u("div", vy, [
                          u("span", yy, A(x(Number(E.assigned_count))), 1),
                          u("span", _y, A(m(
                            Number(E.avg_time_to_assign_seconds)
                          )), 1)
                        ])
                      ]),
                      "cell-closed": P(({ row: E }) => [
                        u("div", xy, [
                          u("span", ky, A(x(Number(E.closed_count))), 1),
                          u("span", wy, A(m(
                            Number(E.avg_conversation_duration_seconds)
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
                    onClick: (E) => d(String(B))
                  }, [
                    ke(A(c.value[B] ? "View less" : `View more (${p(T)} rows)`) + " ", 1),
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
                  ], 8, Cy)) : V("", !0)
                ]))), 128))
              ])) : (b(), k("div", $y, [...F[13] || (F[13] = [
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
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Sy = /* @__PURE__ */ re(My, [["__scopeId", "data-v-9d7f8635"]]), Dy = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Ay = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, Ty = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, By = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Ly = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Fy = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Py = { class: "max-w-[360px] px-4 text-center" }, Ey = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Os = 5, Iy = /* @__PURE__ */ J({
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
    const a = e, o = n, s = (y) => {
      o("export", y);
    }, i = pe(a, "theme"), { isDark: l } = ve(i), r = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, c = oe({
      labels: [],
      datasets: []
    }), d = C(
      () => a.data ?? {
        channels_by_day: {},
        total_by_channel: {},
        total_conversations: 0
      }
    ), h = C(() => {
      const y = d.value.total_by_channel || {}, x = Object.values(y).reduce(
        (m, g) => m + g,
        0
      );
      return x === 0 ? [] : Object.entries(y).sort(([, m], [, g]) => g - m).map(([m, g]) => ({
        name: m,
        label: m.toUpperCase(),
        total: g,
        percentage: (g / x * 100).toFixed(1),
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
      const x = y.channels_by_day, m = Object.keys(x).sort();
      if (m.length === 0) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const g = /* @__PURE__ */ new Set();
      for (const D of Object.values(x))
        for (const S of Object.keys(D))
          g.add(S);
      const w = Array.from(g).map((D) => {
        const S = D.toLowerCase(), $ = r[S] || "#9ca3af";
        return {
          label: D.toUpperCase(),
          data: m.map((M) => x[M]?.[D] || 0),
          borderColor: $
        };
      });
      c.value = {
        labels: m.map((D) => Oe(D).format("MMM DD")),
        datasets: w
      };
    };
    return Le(
      () => a.data,
      (y) => {
        f(y ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: l }), (y, x) => (b(), q(ge, {
      class: "w-full min-h-0 self-start",
      title: "Conversations by Channel",
      subtitle: "Conversations sent by AI agents",
      collapsible: !1,
      loading: a.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !a.loading ? (b(), q(L(Fe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        u("div", {
          class: U(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          R(_e, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: P(() => [
              a.loading ? (b(), k("div", Dy, [...x[0] || (x[0] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (b(), k("div", Ay, [
                c.value.labels && c.value.labels.length ? (b(), k("section", Ty, [
                  u("div", By, [
                    R(ft, {
                      data: c.value,
                      theme: i.value
                    }, null, 8, ["data", "theme"])
                  ]),
                  p.value.length ? (b(), k("div", {
                    key: 0,
                    class: "grid w-full gap-3 md:gap-4",
                    style: ye(v.value)
                  }, [
                    (b(!0), k(Z, null, ie(p.value, (m) => (b(), q(ue, {
                      key: m.name,
                      class: "min-w-0",
                      color: m.color,
                      title: m.label,
                      value: `${m.percentage}%`,
                      subvalue: `${L(G)(m.total)} msgs`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)) : V("", !0)
                ])) : h.value.length ? (b(), k("section", Ly, [
                  u("div", {
                    class: "grid w-full gap-3 md:gap-4",
                    style: ye(v.value)
                  }, [
                    (b(!0), k(Z, null, ie(p.value, (m) => (b(), q(ue, {
                      key: m.name,
                      class: "min-w-0",
                      color: m.color,
                      title: m.label,
                      value: `${m.percentage}%`,
                      subvalue: `${L(G)(m.total)} msgs`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)
                ])) : V("", !0),
                h.value.length ? V("", !0) : (b(), k("section", Fy, [
                  u("div", Py, [
                    u("div", Ey, [
                      R(L(Xe), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                    ]),
                    x[1] || (x[1] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No channel metrics data available ", -1)),
                    x[2] || (x[2] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No channel data found for the selected period. Try adjusting the date range. ", -1))
                  ])
                ]))
              ]))
            ]),
            _: 1
          })
        ], 2)
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Ry = /* @__PURE__ */ re(Iy, [["__scopeId", "data-v-de07e6c8"]]), Oy = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Vy = {
  key: "content",
  class: "card-body"
}, zy = { class: "chart-container" }, Ny = { class: "triage-table-block w-full min-w-0" }, jy = { class: "triage-row-label" }, Wy = {
  key: 1,
  class: "triage-count"
}, Hy = {
  key: 1,
  class: "triage-count"
}, Yy = {
  key: 1,
  class: "triage-count"
}, Ky = {
  key: 1,
  class: "triage-count"
}, Uy = {
  key: 1,
  class: "triage-count"
}, qy = {
  key: 1,
  class: "empty-state"
}, Xy = { class: "empty-state-content" }, Gy = { class: "empty-icon-wrapper" }, Zy = /* @__PURE__ */ J({
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
    const a = e, o = n, s = (_) => {
      o("export", _);
    }, { isDark: i, colors: l } = ve(
      pe(a, "theme")
    ), r = C(() => {
      const _ = a.data?.combinations || {}, w = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [D, S] of Object.entries(_)) {
        const $ = D.split("+").filter(Boolean);
        if (!$.includes("triage")) continue;
        const M = $.filter((F) => F !== "triage").length;
        M >= 4 ? w["4p"] += Number(S) || 0 : w[M] += Number(S) || 0;
      }
      return w;
    }), c = C(() => {
      const _ = r.value;
      return _[0] + _[1] + _[2] + _[3] + _["4p"] || 0;
    }), d = C(() => Object.keys(a.data?.combinations || {}).length > 0), h = C(() => {
      const _ = c.value;
      if (!_) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const w = r.value;
      return {
        pct0: w[0] / _ * 100,
        pct1: w[1] / _ * 100,
        pct2: w[2] / _ * 100,
        pct3: w[3] / _ * 100,
        pct4p: w["4p"] / _ * 100
      };
    }), p = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], v = C(() => {
      const _ = h.value, w = r.value;
      return [
        {
          id: "pct",
          metric: "% of total",
          b0: _.pct0,
          b1: _.pct1,
          b2: _.pct2,
          b3: _.pct3,
          b4p: _.pct4p
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
    }, y = (_) => _?.replace("80", "") || "#888888", x = C(() => ({
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
            label: (_) => `${_.dataset.label} intent(s): ${Number(_.raw || 0).toFixed(0)}%`
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
    })), g = (_) => `${(Number(_) || 0).toFixed(0)}`;
    return t({ isDark: i }), (_, w) => (b(), q(ge, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !e.loading ? (b(), q(L(Fe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        R(_e, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: P(() => [
            e.loading ? (b(), k("div", Oy, [...w[0] || (w[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (b(), k("div", Vy, [
              d.value ? (b(), k(Z, { key: 0 }, [
                u("div", zy, [
                  R(vt, {
                    data: x.value,
                    options: m.value
                  }, null, 8, ["data", "options"])
                ]),
                R(ue, {
                  class: "w-full min-w-0",
                  title: "Total",
                  value: L(G)(c.value),
                  subvalue: "Conversations with triage"
                }, null, 8, ["value"]),
                u("div", Ny, [
                  R(st, {
                    columns: p,
                    rows: v.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-metric": P(({ row: D }) => [
                      u("span", jy, A(D.metric), 1)
                    ]),
                    "cell-b0": P(({ row: D }) => [
                      D.id === "pct" ? (b(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: ye({ color: y(f.c0) })
                      }, A(g(Number(D.b0))) + "%", 5)) : (b(), k("span", Wy, A(L(G)(Number(D.b0))), 1))
                    ]),
                    "cell-b1": P(({ row: D }) => [
                      D.id === "pct" ? (b(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: ye({ color: y(f.c1) })
                      }, A(g(Number(D.b1))) + "%", 5)) : (b(), k("span", Hy, A(L(G)(Number(D.b1))), 1))
                    ]),
                    "cell-b2": P(({ row: D }) => [
                      D.id === "pct" ? (b(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: ye({ color: y(f.c2) })
                      }, A(g(Number(D.b2))) + "%", 5)) : (b(), k("span", Yy, A(L(G)(Number(D.b2))), 1))
                    ]),
                    "cell-b3": P(({ row: D }) => [
                      D.id === "pct" ? (b(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: ye({ color: y(f.c3) })
                      }, A(g(Number(D.b3))) + "%", 5)) : (b(), k("span", Ky, A(L(G)(Number(D.b3))), 1))
                    ]),
                    "cell-b4p": P(({ row: D }) => [
                      D.id === "pct" ? (b(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: ye({ color: y(f.c4p) })
                      }, A(g(Number(D.b4p))) + "%", 5)) : (b(), k("span", Uy, A(L(G)(Number(D.b4p))), 1))
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ], 64)) : (b(), k("div", qy, [
                u("div", Xy, [
                  u("div", Gy, [
                    R(L(Xe), { class: "empty-icon" })
                  ]),
                  w[1] || (w[1] = u("p", { class: "empty-title" }, "No triage combinations data", -1)),
                  w[2] || (w[2] = u("p", { class: "empty-description" }, " No intent distribution data found for the selected period. Try adjusting the date range. ", -1))
                ])
              ]))
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Qy = /* @__PURE__ */ re(Zy, [["__scopeId", "data-v-4610c1a9"]]), Jy = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, e1 = {
  key: "content",
  class: "card-body"
}, t1 = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-3 min-h-0"
}, n1 = { class: "pie-section" }, a1 = {
  key: 1,
  class: "empty-state"
}, o1 = /* @__PURE__ */ J({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = ve(pe(n, "theme")), s = [
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
    return t({ isDark: a }), (v, f) => (b(), q(ge, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1,
      loading: n.loading
    }, {
      default: P(() => [
        R(_e, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: P(() => [
            n.loading ? (b(), k("div", Jy, [...f[0] || (f[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (b(), k("div", e1, [
              r.value ? (b(), k("div", t1, [
                u("section", n1, [
                  R(pa, {
                    data: h.value,
                    options: p.value
                  }, null, 8, ["data", "options"])
                ]),
                R(ue, {
                  class: "shrink-0",
                  title: "Total",
                  value: L(G)(c.value),
                  color: "#8b5cf6"
                }, null, 8, ["value"])
              ])) : (b(), k("section", a1, [...f[1] || (f[1] = [
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
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), s1 = /* @__PURE__ */ re(o1, [["__scopeId", "data-v-8743ba33"]]), i1 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, l1 = {
  key: "content",
  class: "card-body"
}, r1 = {
  key: 0,
  class: "guardrails-daily-section"
}, c1 = { class: "w-full min-w-0" }, d1 = { class: "font-medium" }, u1 = { class: "font-semibold" }, h1 = { class: "type-badges-row" }, f1 = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, g1 = {
  key: 1,
  class: "empty-state"
}, p1 = /* @__PURE__ */ J({
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
    const a = e, o = n, s = (x) => {
      o("export", x);
    }, { isDark: i } = ve(pe(a, "theme")), l = C(
      () => a.data?.items && a.data.items.length > 0
    ), r = C(
      () => (a.data?.items || []).reduce((x, m) => x + m.count, 0)
    ), c = (x) => {
      const m = {};
      for (const w of a.data?.items || [])
        m[w[x]] = (m[w[x]] || 0) + w.count;
      const g = Object.entries(m).sort((w, D) => D[1] - w[1]);
      if (g.length === 0) return { name: "—", pct: 0 };
      const _ = r.value;
      return {
        name: g[0][0],
        pct: _ > 0 ? Math.round(g[0][1] / _ * 100) : 0
      };
    }, d = C(() => c("guardrail_type")), h = C(() => c("guardrail_action")), p = C(() => c("guardrail_source")), v = C(() => {
      const x = {};
      for (const m of a.data?.items || [])
        x[m.date] || (x[m.date] = {}), x[m.date][m.guardrail_type] = (x[m.date][m.guardrail_type] || 0) + m.count;
      return Object.entries(x).map(([m, g]) => ({
        date: m,
        total: Object.values(g).reduce((_, w) => _ + w, 0),
        types: Object.entries(g).map(([_, w]) => ({ type: _, count: w })).sort((_, w) => w.count - _.count)
      })).sort((m, g) => new Date(m.date).getTime() - new Date(g.date).getTime());
    }), f = [
      { key: "date", label: "Date", align: "center" },
      { key: "count", label: "Count", align: "center" },
      { key: "types", label: "Types", align: "left" }
    ], y = C(
      () => v.value.map((x) => ({
        id: x.date,
        date: x.date,
        total: x.total,
        types: x.types
      }))
    );
    return t({ isDark: i }), (x, m) => (b(), q(ge, {
      class: "guardrails-root h-full min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !a.loading ? (b(), q(L(Fe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        R(_e, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: P(() => [
            e.loading ? (b(), k("div", i1, [...m[0] || (m[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (b(), k("div", l1, [
              l.value ? (b(), k(Z, { key: 0 }, [
                v.value.length > 0 ? (b(), k("section", r1, [
                  u("div", c1, [
                    R(st, {
                      columns: f,
                      rows: y.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, {
                      "cell-date": P(({ row: g }) => [
                        u("span", d1, A(L(Oe)(String(g.date)).format("MMM DD")), 1)
                      ]),
                      "cell-count": P(({ row: g }) => [
                        u("span", u1, A(L(G)(g.total)), 1)
                      ]),
                      "cell-types": P(({ row: g }) => [
                        u("div", h1, [
                          (b(!0), k(Z, null, ie(g.types, (_) => (b(), k("span", {
                            key: _.type,
                            class: "type-count-badge"
                          }, A(_.type) + " (" + A(_.count) + ") ", 1))), 128))
                        ])
                      ]),
                      _: 1
                    }, 8, ["rows"])
                  ])
                ])) : V("", !0),
                u("section", f1, [
                  R(ue, {
                    title: "Total Events",
                    value: L(G)(r.value)
                  }, null, 8, ["value"]),
                  R(ue, {
                    title: "Top type",
                    value: d.value.name,
                    subvalue: d.value.pct > 0 ? `(${d.value.pct}%)` : void 0
                  }, null, 8, ["value", "subvalue"]),
                  R(ue, {
                    title: "Top action",
                    value: h.value.name,
                    subvalue: h.value.pct > 0 ? `(${h.value.pct}%)` : void 0
                  }, null, 8, ["value", "subvalue"]),
                  R(ue, {
                    title: "Top source",
                    value: p.value.name,
                    subvalue: p.value.pct > 0 ? `(${p.value.pct}%)` : void 0
                  }, null, 8, ["value", "subvalue"])
                ])
              ], 64)) : (b(), k("section", g1, [...m[1] || (m[1] = [
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
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), m1 = /* @__PURE__ */ re(p1, [["__scopeId", "data-v-80a28b15"]]), b1 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, v1 = {
  key: "content",
  class: "card-body"
}, y1 = { class: "chart-section" }, _1 = { class: "chart-wrapper" }, x1 = {
  key: 1,
  class: "empty-chart"
}, k1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, w1 = {
  key: 0,
  class: "dn-failure-section"
}, C1 = { class: "w-full min-w-0" }, $1 = { class: "failure-reason" }, M1 = { class: "failure-count" }, S1 = { class: "impact-bar-container" }, D1 = { class: "impact-label" }, A1 = { class: "dn-trend-health-block flex flex-col gap-0" }, T1 = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, B1 = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, L1 = { class: "system-health" }, F1 = { class: "system-health-content" }, P1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, E1 = {
  key: 1,
  class: "empty-state"
}, I1 = /* @__PURE__ */ J({
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
    const a = e, o = n, s = (S) => {
      o("export", S);
    }, { isDark: i, colors: l } = ve(pe(a, "theme")), r = C(() => {
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
    }), x = [
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
      const S = h.value, $ = d.value.processing_success, M = Math.max(0, $ - d.value.totalDqErrors), F = d.value.notification_sent, T = Math.max(0, S - $), B = d.value.totalDqErrors, E = Math.max(0, M - F), I = (j, Q) => {
        const ee = Q > 0 ? Math.round(j / Q * 100) : 0;
        return `${j.toLocaleString()} (${ee}%)`;
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
        label: I($, S)
      }), T > 0 && Y.push({
        source: "Records Detected",
        target: "Invalid / Unprocessed",
        value: T,
        label: I(T, S)
      }), M > 0 && Y.push({
        source: "Valid Reservations",
        target: "Contactable",
        value: M,
        label: I(M, S)
      }), B > 0 && Y.push({
        source: "Valid Reservations",
        target: "Data Quality Issues",
        value: B,
        label: I(B, S)
      }), F > 0 && Y.push({
        source: "Contactable",
        target: "Notified",
        value: F,
        label: I(F, S)
      }), E > 0 && Y.push({
        source: "Contactable",
        target: "Not Delivered",
        value: E,
        label: I(E, S)
      }), { nodes: N, links: Y };
    }), _ = {
      "Records Detected": "#DBEAFE",
      "Valid Reservations": "#D1FAE5",
      "Invalid / Unprocessed": "#FEE2E2",
      Contactable: "#BBF7D0",
      "Data Quality Issues": "#FED7AA",
      Notified: "#86EFAC",
      "Not Delivered": "#FCA5A5"
    }, w = C(() => {
      const S = [...a.data?.processingCounts?.items || []].sort(
        (I, N) => new Date(I.date).getTime() - new Date(N.date).getTime()
      ), $ = a.data?.documentCounts?.items || [], M = {};
      for (const I of $)
        M[I.date] = (M[I.date] || 0) + I.row_count_total;
      const F = [
        .../* @__PURE__ */ new Set([
          ...S.map((I) => I.date),
          ...$.map((I) => I.date)
        ])
      ].sort(), T = F.map((I) => Oe(I).format("MMM DD")), B = F.map((I) => {
        const N = S.find((Q) => Q.date === I), Y = N?.notification_sent || 0, j = M[I] || N?.processing_started || 0;
        return j > 0 ? Math.round(Y / j * 100) : 0;
      }), E = F.map((I) => S.find((Y) => Y.date === I)?.notification_sent || 0);
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
    return t({ isDark: i }), (S, $) => (b(), q(ge, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis",
      loading: e.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !a.loading ? (b(), q(L(Fe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        R(_e, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: P(() => [
            e.loading ? (b(), k("div", b1, [...$[0] || ($[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (b(), k("div", v1, [
              r.value ? (b(), k(Z, { key: 0 }, [
                u("section", y1, [
                  $[2] || ($[2] = u("div", { class: "chart-header" }, [
                    u("h4", { class: "section-title" }, "Passenger Disruption Funnel")
                  ], -1)),
                  u("div", _1, [
                    g.value.nodes.length > 0 && g.value.links.length > 0 ? (b(), q(zt, {
                      key: 0,
                      data: g.value,
                      "node-colors": _,
                      height: "350px"
                    }, null, 8, ["data"])) : (b(), k("div", x1, [...$[1] || ($[1] = [
                      u("p", { class: "empty-chart-text" }, " No processing data available for visualization ", -1)
                    ])]))
                  ])
                ]),
                u("div", k1, [
                  R(ue, {
                    color: "#3b82f6",
                    title: "Total Records",
                    value: L(G)(c.value.row_count_total)
                  }, null, 8, ["value"]),
                  R(ue, {
                    color: "#8b5cf6",
                    title: "Passengers Affected",
                    value: L(G)(h.value)
                  }, null, 8, ["value"]),
                  R(ue, {
                    color: "#10b981",
                    title: "Successfully Notified",
                    value: L(G)(d.value.notification_sent),
                    subvalue: v(d.value.notification_sent, h.value)
                  }, null, 8, ["value", "subvalue"]),
                  R(ue, {
                    color: "#ef4444",
                    title: "Not Notified",
                    value: L(G)(p.value),
                    subvalue: v(p.value, h.value)
                  }, null, 8, ["value", "subvalue"]),
                  R(ue, {
                    color: "#f59e0b",
                    title: "Main Failure Reason",
                    value: f.value.reason,
                    subvalue: f.value.count > 0 ? `${L(G)(f.value.count)} cases` : void 0
                  }, null, 8, ["value", "subvalue"])
                ]),
                y.value.length > 0 ? (b(), k("section", w1, [
                  $[3] || ($[3] = u("div", { class: "section-header" }, [
                    u("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
                  ], -1)),
                  u("div", C1, [
                    R(st, {
                      columns: x,
                      rows: m.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, {
                      "cell-reason": P(({ row: M }) => [
                        u("span", $1, A(M.reason), 1)
                      ]),
                      "cell-count": P(({ row: M }) => [
                        u("span", M1, A(L(G)(M.count)), 1)
                      ]),
                      "cell-impact": P(({ row: M }) => [
                        u("div", S1, [
                          u("div", {
                            class: "impact-bar",
                            style: ye({ width: M.impactPct + "%" })
                          }, null, 4),
                          u("span", D1, A(M.impactPct) + "%", 1)
                        ])
                      ]),
                      _: 1
                    }, 8, ["rows"])
                  ])
                ])) : V("", !0),
                u("div", A1, [
                  w.value.labels.length > 0 ? (b(), k("section", T1, [
                    $[4] || ($[4] = u("div", { class: "chart-header" }, [
                      u("h4", { class: "section-title" }, "Notification Success Rate by Day")
                    ], -1)),
                    u("div", B1, [
                      R(ft, {
                        data: w.value,
                        options: D.value,
                        theme: a.theme
                      }, null, 8, ["data", "options", "theme"])
                    ])
                  ])) : V("", !0),
                  u("details", L1, [
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
                      ke(" System Health Details ")
                    ], -1)),
                    u("div", F1, [
                      u("div", P1, [
                        R(ue, {
                          title: "Docs Started",
                          value: L(G)(c.value.processing_started)
                        }, null, 8, ["value"]),
                        R(ue, {
                          title: "Docs Completed",
                          value: L(G)(c.value.processing_completed)
                        }, null, 8, ["value"]),
                        R(ue, {
                          title: "Docs Failed",
                          value: L(G)(c.value.processing_failed)
                        }, null, 8, ["value"]),
                        R(ue, {
                          title: "Processing Started",
                          value: L(G)(d.value.processing_started)
                        }, null, 8, ["value"]),
                        R(ue, {
                          title: "Processing Success",
                          value: L(G)(d.value.processing_success)
                        }, null, 8, ["value"]),
                        R(ue, {
                          title: "Notification Failed",
                          value: L(G)(d.value.notification_failed)
                        }, null, 8, ["value"])
                      ])
                    ])
                  ])
                ])
              ], 64)) : (b(), k("section", E1, [...$[6] || ($[6] = [
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
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), R1 = /* @__PURE__ */ re(I1, [["__scopeId", "data-v-aff0a7ad"]]), O1 = {
  key: "title-skeleton",
  class: "ut-skeleton-blink skeleton-icon",
  "aria-hidden": "true"
}, V1 = {
  key: "title-content",
  class: "header-title-group"
}, z1 = {
  class: "icon-wrapper",
  "aria-hidden": "true"
}, N1 = {
  key: "aside-skeleton",
  class: "ut-skeleton-blink skeleton-badge",
  "aria-hidden": "true"
}, j1 = { key: "aside-content" }, W1 = {
  key: "body-skeleton",
  class: "skeleton-body",
  "aria-busy": "true",
  "aria-label": "Loading metric"
}, H1 = {
  key: "body-content",
  class: "highlight-inner"
}, Y1 = { class: "card-body" }, K1 = { class: "metric-row" }, U1 = {
  key: 0,
  class: "metric-prefix"
}, q1 = { class: "metric-label" }, X1 = /* @__PURE__ */ J({
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
  setup(e, { expose: t }) {
    const n = e, { isDark: a } = ve(pe(n, "theme")), o = C(
      () => n.previousValue !== null && n.previousValue !== void 0
    ), s = C(() => {
      if (!o.value) return 0;
      const r = n.previousValue;
      return r === 0 ? n.currentValue > 0 ? 100 : 0 : (n.currentValue - r) / r * 100;
    }), i = C(() => {
      const r = s.value.toFixed(1);
      return s.value > 0 ? `+${r}%` : `${r}%`;
    }), l = C(() => s.value > 0 ? "change-badge--up" : s.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: s }), (r, c) => (b(), q(ge, {
      collapsible: !1,
      class: U(["card-metric", "w-full", { "card-metric--dark": L(a) }])
    }, {
      title: P(() => [
        R(_e, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: P(() => [
            e.loading ? (b(), k("div", O1)) : (b(), k("div", V1, [
              u("div", z1, [
                Ce(r.$slots, "icon", {}, void 0, !0)
              ])
            ]))
          ]),
          _: 3
        })
      ]),
      headerAside: P(() => [
        R(_e, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: P(() => [
            e.loading ? (b(), k("div", N1)) : (b(), k("div", j1, [
              Ce(r.$slots, "headerAside", {}, () => [
                o.value ? (b(), k("div", {
                  key: 0,
                  class: U(["change-badge", l.value])
                }, A(i.value), 3)) : V("", !0)
              ], !0)
            ]))
          ]),
          _: 3
        })
      ]),
      default: P(() => [
        R(_e, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: P(() => [
            e.loading ? (b(), k("div", W1, [...c[0] || (c[0] = [
              u("div", { class: "ut-skeleton-blink skeleton-value" }, null, -1),
              u("div", { class: "ut-skeleton-blink skeleton-label" }, null, -1)
            ])])) : (b(), k("div", H1, [
              u("div", Y1, [
                Ce(r.$slots, "value", {}, () => [
                  u("div", K1, [
                    e.prefix ? (b(), k("span", U1, A(e.prefix), 1)) : V("", !0),
                    u("span", {
                      class: U(["metric-value", e.valueSize === "large" ? "metric-value--large" : ""])
                    }, A(e.value), 3)
                  ])
                ], !0),
                u("span", q1, A(e.label), 1)
              ])
            ]))
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), In = /* @__PURE__ */ re(X1, [["__scopeId", "data-v-e429aea9"]]), G1 = /* @__PURE__ */ J({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = oe(null), o = C(() => G(n.totalConversations)), s = C(() => L(a.value?.isDark) ?? !1), i = C(() => L(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (b(), q(In, {
      label: "Total Conversations",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.totalConversations,
      "previous-value": e.previousTotalConversations,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: P(() => [...r[0] || (r[0] = [
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
}), Z1 = /* @__PURE__ */ J({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = oe(null), o = C(() => `${n.csatP95.toFixed(1)}`), s = C(() => L(a.value?.isDark) ?? !1), i = C(() => L(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (b(), q(In, {
      label: "CSAT P95",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatP95,
      "previous-value": e.previousCsatP95,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: P(() => [...r[0] || (r[0] = [
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
}), Q1 = /* @__PURE__ */ J({
  __name: "CsatPulseCard",
  props: {
    csatPulse: { default: 0 },
    previousCsatPulse: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = oe(null), o = C(() => `${n.csatPulse.toFixed(1)}%`), s = C(() => L(a.value?.isDark) ?? !1), i = C(() => L(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (b(), q(In, {
      label: "CSAT Pulse",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatPulse,
      "previous-value": e.previousCsatPulse,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: P(() => [...r[0] || (r[0] = [
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
}), J1 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, e_ = { key: "content" }, t_ = {
  key: 0,
  class: "card-body"
}, n_ = { class: "chart-wrapper" }, a_ = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, o_ = {
  key: 1,
  class: "empty-state"
}, s_ = 500, i_ = 60, l_ = 80, r_ = {
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
    }, s = e, { isDark: i } = ve(pe(s, "theme")), l = C(() => s.data), r = C(() => Math.max(600, window.innerWidth * 0.85));
    return t({ isDark: i }), (c, d) => (b(), q(ge, {
      class: "nps-overview-root h-full min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1,
      loading: s.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !s.loading ? (b(), q(L(Fe), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        R(_e, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: P(() => [
            s.loading ? (b(), k("div", J1, [...d[0] || (d[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (b(), k("div", e_, [
              l.value && l.value.total_nps_responses > 0 ? (b(), k("div", t_, [
                u("div", n_, [
                  R(Vi, {
                    histogram: l.value.histogram || [],
                    "min-score": l.value.min_score || 0,
                    "max-score": l.value.max_score || 0,
                    "q1-score": l.value.q1_score || 0,
                    "median-score": l.value.median_score || 0,
                    "q3-score": l.value.q3_score || 0,
                    "average-score": l.value.average_score || 0,
                    "chart-width": r.value,
                    "chart-height": s_,
                    "chart-margin": i_,
                    "chart-bottom-margin": l_
                  }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score", "chart-width"])
                ]),
                u("div", a_, [
                  R(ue, {
                    class: "min-w-0 flex-1",
                    title: "Responses",
                    value: String(l.value.total_nps_responses)
                  }, null, 8, ["value"]),
                  l.value.p95_score > 0 ? (b(), q(ue, {
                    key: 0,
                    class: "min-w-0 flex-1",
                    title: "Percentile 95",
                    value: String(l.value.p95_score)
                  }, null, 8, ["value"])) : V("", !0)
                ])
              ])) : (b(), k("div", o_, [...d[1] || (d[1] = [
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
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}, Zi = /* @__PURE__ */ re(r_, [["__scopeId", "data-v-62338982"]]), c_ = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, d_ = { key: "content" }, u_ = {
  key: 0,
  class: "card-body"
}, h_ = {
  key: 1,
  class: "empty-state"
}, f_ = {
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
  setup(e, { emit: t }) {
    const n = t, a = (c) => {
      n("export", c);
    }, o = e, s = C(() => o.data?.csat_p95_by_day || []), i = C(() => s.value.length > 0), l = C(() => ({
      labels: s.value.map((c) => Oe(c.date).format("DD-MM-YYYY")),
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
    return (c, d) => (b(), q(ge, {
      class: "nps-daily-root h-full min-h-0",
      title: "CSAT P95 by Date",
      subtitle: "Daily P95 trend for CSAT responses",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !o.loading ? (b(), q(L(Fe), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        R(_e, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: P(() => [
            o.loading ? (b(), k("div", c_, [...d[0] || (d[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (b(), k("div", d_, [
              i.value ? (b(), k("div", u_, [
                R(ft, {
                  data: l.value,
                  options: r,
                  "uppercase-legend-labels": !0
                }, null, 8, ["data"])
              ])) : (b(), k("div", h_, [...d[1] || (d[1] = [
                u("p", { class: "empty-title" }, "No daily CSAT P95 available", -1),
                u("p", { class: "empty-description" }, " No CSAT P95 points were found for the selected date range. ", -1)
              ])]))
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}, Qi = /* @__PURE__ */ re(f_, [["__scopeId", "data-v-800748a4"]]), g_ = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, p_ = { key: "content" }, m_ = {
  key: 0,
  class: "card-body"
}, b_ = {
  key: 1,
  class: "empty-state"
}, v_ = /* @__PURE__ */ J({
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
  setup(e) {
    const t = e, n = C(
      () => t.data?.resolution_breakdown || []
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
    return (i, l) => (b(), q(ge, {
      class: "nps-resolution-root h-full min-h-0",
      title: "CSAT Resolution",
      subtitle: "Resolution answers distribution (1=Si, 2=No)",
      collapsible: !1,
      loading: t.loading
    }, {
      default: P(() => [
        R(_e, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: P(() => [
            t.loading ? (b(), k("div", g_, [...l[0] || (l[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (b(), k("div", p_, [
              a.value ? (b(), k("div", m_, [
                R(vt, {
                  data: o.value,
                  options: s,
                  "uppercase-legend-labels": !0
                }, null, 8, ["data"])
              ])) : (b(), k("div", b_, [...l[1] || (l[1] = [
                u("p", { class: "empty-title" }, "No resolution answers available", -1),
                u("p", { class: "empty-description" }, " This airline has the resolution survey configured, but no responses were found for the selected dates. ", -1)
              ])]))
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), y_ = /* @__PURE__ */ re(v_, [["__scopeId", "data-v-94bc19ef"]]), __ = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, x_ = { key: "content" }, k_ = {
  key: 0,
  class: "card-body"
}, w_ = {
  key: 1,
  class: "empty-state"
}, C_ = /* @__PURE__ */ J({
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
  setup(e) {
    const t = e, n = C(() => t.data?.csat_pulse_by_day || []), a = C(() => n.value.length > 0), o = C(() => ({
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
    return (i, l) => (b(), q(ge, {
      class: "nps-pulse-root h-full min-h-0",
      title: "CSAT Pulse",
      subtitle: "Weighted index: Σ(frequency × weight) / total surveys × 100",
      collapsible: !1,
      loading: t.loading
    }, {
      default: P(() => [
        R(_e, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: P(() => [
            t.loading ? (b(), k("div", __, [...l[0] || (l[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (b(), k("div", x_, [
              a.value ? (b(), k("div", k_, [
                R(ft, {
                  data: o.value,
                  options: s,
                  "uppercase-legend-labels": !0
                }, null, 8, ["data"])
              ])) : (b(), k("div", w_, [...l[1] || (l[1] = [
                u("p", { class: "empty-title" }, "No CSAT Pulse data available", -1),
                u("p", { class: "empty-description" }, " No CSAT pulse points were found for the selected date range. ", -1)
              ])]))
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), $_ = /* @__PURE__ */ re(C_, [["__scopeId", "data-v-a093b7a2"]]), M_ = { class: "nps-metrics-container" }, S_ = {
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
  setup(e, { emit: t }) {
    const n = t, a = (l) => {
      n("export", l);
    }, o = e, s = C(() => o.showResolutionChart), i = C(() => o.showCsatPulseChart);
    return (l, r) => (b(), k("div", M_, [
      R(Zi, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"]),
      R(Qi, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"]),
      s.value ? (b(), q(y_, {
        key: 0,
        data: e.data,
        loading: e.loading
      }, null, 8, ["data", "loading"])) : V("", !0),
      i.value ? (b(), q($_, {
        key: 1,
        data: e.data,
        loading: e.loading
      }, null, 8, ["data", "loading"])) : V("", !0)
    ]));
  }
}, Ji = /* @__PURE__ */ re(S_, [["__scopeId", "data-v-101623e8"]]), D_ = { class: "csat-container__body" }, A_ = /* @__PURE__ */ J({
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
  setup(e, { emit: t }) {
    const n = t;
    function a(o) {
      n("export", { source: "npsMetrics", format: o });
    }
    return (o, s) => (b(), q(ge, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading
    }, {
      default: P(() => [
        u("div", D_, [
          R(Ji, {
            data: e.data,
            loading: e.loading,
            "enable-export": e.enableExport,
            "show-resolution-chart": e.showResolutionChart,
            "show-csat-pulse-chart": e.showCsatPulseChart,
            onExport: a
          }, null, 8, ["data", "loading", "enable-export", "show-resolution-chart", "show-csat-pulse-chart"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), T_ = /* @__PURE__ */ re(A_, [["__scopeId", "data-v-71605c0e"]]), B_ = /* @__PURE__ */ J({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = oe(null), o = C(() => At(n.totalRevenue)), s = C(() => L(a.value?.isDark) ?? !1), i = C(() => L(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (b(), q(In, {
      label: "AI Revenue",
      value: o.value,
      prefix: e.currencyCode,
      "value-size": "large",
      loading: e.loading,
      theme: e.theme,
      "current-value": e.totalRevenue,
      "previous-value": e.previousTotalRevenue,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: P(() => [...r[0] || (r[0] = [
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
}), L_ = { class: "flex justify-end" }, F_ = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, P_ = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, E_ = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, I_ = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, R_ = { class: "flex flex-wrap gap-4" }, O_ = { class: "text-[var(--kiut-text-primary,#111827)]" }, V_ = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5" }, z_ = { class: "flex items-center gap-2 truncate text-sm font-medium text-[var(--kiut-text-secondary,#6b7280)]" }, N_ = { class: "truncate" }, j_ = { class: "mt-1 text-2xl font-bold text-[var(--kiut-text-primary,#111827)]" }, W_ = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, H_ = /* @__PURE__ */ J({
  __name: "HumanEscalations",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, s = pe(a, "theme"), { isDark: i } = ve(s), l = oe(a.breakdownBy), r = C(() => a.data ?? {
      total_conversations: 0,
      total_escalated_conversations: 0,
      escalation_rate_percentage: 0,
      breakdown_by: "all",
      breakdown_items: [],
      breakdown_by_day: [],
      escalations_by_day: []
    }), c = oe({
      labels: [],
      datasets: []
    }), d = oe([]), h = oe(
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
      const _ = m.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return _ ? _.charAt(0).toUpperCase() + _.slice(1) : "";
    }, x = (m) => {
      if (l.value === "all") {
        const M = m?.escalations_by_day ?? [];
        if (!M.length) {
          c.value = { labels: [], datasets: [] }, d.value = [], h.value = [];
          return;
        }
        const F = [...M].sort((T, B) => T.date.localeCompare(B.date));
        c.value = {
          labels: F.map((T) => Oe(T.date).format("MMM DD")),
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
      const g = m?.breakdown_by_day ?? [], _ = m?.breakdown_items ?? [];
      if (!g.length) {
        c.value = { labels: [], datasets: [] }, d.value = [], h.value = [];
        return;
      }
      const w = [...g].sort(
        (M, F) => M.date.localeCompare(F.date)
      ), D = _.slice(0, 5).map((M) => M.key), S = w.map((M) => Oe(M.date).format("MMM DD")), $ = D.map((M, F) => {
        const T = _.find((B) => B.key === M);
        return {
          label: y(T?.label || M),
          data: w.map((B) => {
            const E = B.items.find((I) => I.key === M);
            return Number(E?.percentage || 0);
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
      }, d.value = _.slice(0, 5).map((M, F) => ({
        key: M.key,
        label: y(M.label),
        percentage: Number(M.percentage || 0),
        color: v(F)
      })), h.value = _.slice(0, 5).map((M, F) => ({
        key: M.key,
        label: y(M.label),
        color: v(F)
      }));
    };
    return Le(
      () => a.data,
      (m) => {
        x(m ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Le(
      () => a.breakdownBy,
      (m) => {
        l.value = m, x(r.value);
      }
    ), t({ isDark: i }), (m, g) => (b(), q(ge, {
      class: "w-full min-h-0 self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerAside: P(() => [
        u("div", L_, [
          et(u("select", {
            "onUpdate:modelValue": g[0] || (g[0] = (_) => l.value = _),
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
      default: P(() => [
        u("div", {
          class: U(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          R(_e, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: P(() => [
              a.loading ? (b(), k("div", F_, [...g[2] || (g[2] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (b(), k("div", P_, [
                c.value.labels && c.value.labels.length && c.value.datasets.length ? (b(), k("section", E_, [
                  u("div", I_, [
                    R(ft, {
                      data: c.value,
                      theme: s.value
                    }, null, 8, ["data", "theme"])
                  ]),
                  u("div", R_, [
                    (b(!0), k(Z, null, ie(h.value, (_) => (b(), k("div", {
                      key: `legend-${_.key}`,
                      class: "inline-flex items-center gap-2 text-sm"
                    }, [
                      u("span", {
                        class: "inline-block h-2.5 w-2.5 rounded-full",
                        style: ye({ backgroundColor: _.color })
                      }, null, 4),
                      u("span", O_, A(_.label), 1)
                    ]))), 128))
                  ]),
                  u("div", V_, [
                    (b(!0), k(Z, null, ie(d.value, (_) => (b(), k("div", {
                      key: `card-${_.key}`,
                      class: "rounded-xl border border-[var(--kiut-border-light,#e5e7eb)] p-3"
                    }, [
                      u("p", z_, [
                        u("span", {
                          class: "inline-block h-2.5 w-2.5 rounded-full",
                          style: ye({ backgroundColor: _.color })
                        }, null, 4),
                        u("span", N_, A(_.label), 1)
                      ]),
                      u("p", j_, A(_.percentage.toFixed(1)) + "% ", 1)
                    ]))), 128))
                  ])
                ])) : (b(), k("section", W_, [...g[3] || (g[3] = [
                  u("div", { class: "max-w-[360px] px-4 text-center" }, [
                    u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No human escalations data available "),
                    u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No escalation data found for the selected period. Try adjusting the date range. ")
                  ], -1)
                ])]))
              ]))
            ]),
            _: 1
          })
        ], 2)
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Y_ = /* @__PURE__ */ re(H_, [["__scopeId", "data-v-97430e89"]]), K_ = /* @__PURE__ */ J({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = oe(null), o = C(() => `${Number(n.escalationRatePercentage || 0).toFixed(2)}%`), s = C(() => L(a.value?.isDark) ?? !1), i = C(() => L(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (b(), q(In, {
      label: "Human Escalations",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.escalationRatePercentage,
      "previous-value": e.previousEscalationRatePercentage,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: P(() => [...r[0] || (r[0] = [
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
}), U_ = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, q_ = {
  key: 0,
  class: "flex min-h-[320px] flex-col items-center justify-center px-4"
}, X_ = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, G_ = {
  key: 1,
  class: "flex w-full shrink-0 flex-col min-h-0"
}, Z_ = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, Q_ = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, J_ = {
  key: 2,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, ex = { class: "max-w-[360px] text-center" }, tx = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, nx = {
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
    const t = e, { isDark: n, colors: a } = ve(pe(t, "theme")), o = [30, 50, 70, 50, 40], s = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], i = C(() => {
      const c = t.data ?? {}, d = c.daily, h = c.days, p = Array.isArray(d) && d.length > 0, v = Array.isArray(h) && h.length > 0 && Array.isArray(c.allocatedCostSeries) && c.allocatedCostSeries.length === h.length;
      let f = [];
      return p ? f = d : v && (f = h.map((y, x) => ({
        date: y,
        allocated_cost: c.allocatedCostSeries[x] ?? 0,
        aws_cost: c.awsCostSeries[x] ?? 0,
        airline_conversations: c.airlineConversationsSeries[x] ?? 0
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
              return c.dataset.yAxisID === "y" ? d + $e(h) : d + String(h);
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
            callback: (c) => $e(c)
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
    return (c, d) => (b(), q(ge, {
      title: i.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1
    }, {
      default: P(() => [
        u("div", U_, [
          e.loading ? (b(), k("div", q_, [
            u("div", X_, [
              (b(), k(Z, null, ie(o, (h, p) => u("div", {
                key: p,
                class: U(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", s[p]]),
                style: ye({ height: `${h}%` })
              }, null, 6)), 64))
            ]),
            d[0] || (d[0] = u("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading chart data... ", -1))
          ])) : i.value.daily.length > 0 ? (b(), k("div", G_, [
            u("div", Z_, [
              R(ft, {
                class: "h-full min-h-0 w-full",
                data: l.value,
                options: r.value
              }, null, 8, ["data", "options"])
            ]),
            u("div", Q_, [
              R(ue, {
                color: L(a).primaryLight,
                title: "Total Allocated",
                value: L($e)(i.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              R(ue, {
                color: "#FF9900",
                title: "Total AWS",
                value: L($e)(i.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (b(), k("section", J_, [
            u("div", ex, [
              u("div", tx, [
                R(L(Xe), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}, ax = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, ox = {
  key: 0,
  class: "card-body"
}, sx = {
  key: 0,
  class: "chart-section"
}, ix = { class: "chart-container" }, lx = { class: "mt-auto grid grid-cols-2 gap-3 sm:grid-cols-3 max-[768px]:gap-2" }, rx = {
  key: 1,
  class: "empty-state"
}, cx = { class: "empty-state-content" }, dx = { class: "empty-icon-wrapper" }, ux = {
  key: 1,
  class: "loading-state"
}, pn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Vs = 10, hx = /* @__PURE__ */ J({
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
    const a = e, { isDark: o, colors: s } = ve(pe(a, "theme")), i = (f) => {
      const y = new Date(f), x = String(y.getDate()).padStart(2, "0"), m = String(y.getMonth() + 1).padStart(2, "0");
      return `${x}-${m}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, r = C(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((y, x) => y + (x.input_cost || 0), 0);
    }), c = C(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((y, x) => y + (x.output_cost || 0), 0);
    }), d = C(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((y, x) => y + (x.cache_read_cost || 0), 0);
    }), h = C(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((y, x) => y + (x.cache_write_cost || 0), 0);
    }), p = C(() => {
      const f = a.data?.costs_by_day || {}, y = Object.keys(f).sort();
      if (y.length === 0)
        return { labels: [], datasets: [] };
      const x = y.map((g) => i(g)), m = [
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
        labels: x,
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
              family: pn,
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
            family: pn,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: pn,
            size: 12,
            weight: "500"
          },
          callbacks: {
            label: function(f) {
              let y = f.dataset.label || "";
              return y && (y += ": "), f.parsed.y !== null && (y += $e(f.parsed.y)), y;
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
            padding: 8,
            callback: function(f) {
              return $e(f);
            }
          }
        }
      }
    });
    return t({ isDark: o }), (f, y) => (b(), q(ge, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1
    }, {
      default: P(() => [
        u("div", ax, [
          e.loading ? (b(), k("div", ux, [...y[2] || (y[2] = [
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
          ])])) : (b(), k("div", ox, [
            p.value.labels && p.value.labels.length ? (b(), k("section", sx, [
              u("div", ix, [
                R(vt, {
                  data: p.value,
                  options: v.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", lx, [
                R(ue, {
                  title: "Total Cost",
                  value: L($e)(e.data.total_cost)
                }, null, 8, ["value"]),
                R(ue, {
                  title: "Input Cost",
                  value: L($e)(r.value),
                  color: l.input
                }, null, 8, ["value", "color"]),
                R(ue, {
                  title: "Output Cost",
                  value: L($e)(c.value),
                  color: l.output
                }, null, 8, ["value", "color"]),
                R(ue, {
                  title: "Cache Read",
                  value: L($e)(d.value),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                R(ue, {
                  title: "Cache Write",
                  value: L($e)(h.value),
                  color: l.cache_write
                }, null, 8, ["value", "color"]),
                R(ue, {
                  title: "Avg / Conv.",
                  value: L($e)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (b(), k("section", rx, [
              u("div", cx, [
                u("div", dx, [
                  R(L(Xe), { class: "empty-icon" })
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
}), fx = /* @__PURE__ */ re(hx, [["__scopeId", "data-v-39a5448c"]]), gx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, px = {
  key: 0,
  class: "card-body"
}, mx = {
  key: 0,
  class: "chart-section"
}, bx = { class: "chart-container" }, vx = { class: "mt-auto flex w-full min-w-0 flex-nowrap items-stretch gap-2 sm:gap-3" }, yx = {
  key: 1,
  class: "empty-state"
}, _x = { class: "empty-state-content" }, xx = { class: "empty-icon-wrapper" }, kx = {
  key: 1,
  class: "loading-state"
}, mn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", zs = 10, wx = /* @__PURE__ */ J({
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
    const a = e, { isDark: o, colors: s } = ve(pe(a, "theme")), i = (d) => {
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
              family: mn,
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
            family: mn,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: mn,
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
            font: { family: mn, size: 12, weight: "500" },
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
            font: { family: mn, size: 12, weight: "500" },
            color: s.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: o }), (d, h) => (b(), q(ge, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1
    }, {
      default: P(() => [
        u("div", gx, [
          e.loading ? (b(), k("div", kx, [...h[2] || (h[2] = [
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
          ])])) : (b(), k("div", px, [
            r.value.labels && r.value.labels.length ? (b(), k("section", mx, [
              u("div", bx, [
                R(vt, {
                  data: r.value,
                  options: c.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", vx, [
                R(ue, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: L(G)(e.data.total_tokens)
                }, null, 8, ["value"]),
                R(ue, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: L(G)(e.data.total_input_tokens),
                  color: l.input
                }, null, 8, ["value", "color"]),
                R(ue, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: L(G)(e.data.total_output_tokens),
                  color: l.output
                }, null, 8, ["value", "color"]),
                R(ue, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: L(G)(e.data.total_cache_read_tokens),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                R(ue, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: L(G)(e.data.total_cache_write_tokens),
                  color: l.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (b(), k("section", yx, [
              u("div", _x, [
                u("div", xx, [
                  R(L(Xe), { class: "empty-icon" })
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
}), Cx = /* @__PURE__ */ re(wx, [["__scopeId", "data-v-70c6f3c7"]]), $x = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Mx = {
  key: 0,
  class: "card-body"
}, Sx = {
  key: 0,
  class: "chart-section"
}, Dx = { class: "chart-container" }, Ax = { class: "mt-4 w-full min-w-0" }, Tx = {
  key: 1,
  class: "empty-state"
}, Bx = { class: "empty-state-content" }, Lx = { class: "empty-icon-wrapper" }, Fx = {
  key: 1,
  class: "loading-state"
}, Px = /* @__PURE__ */ J({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = ve(pe(n, "theme")), s = (c) => {
      const d = new Date(c), h = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = C(
      () => G(n.data?.total_conversations ?? 0)
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
    return t({ isDark: a }), (c, d) => (b(), q(ge, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1
    }, {
      default: P(() => [
        u("div", $x, [
          e.loading ? (b(), k("div", Fx, [...d[2] || (d[2] = [
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
          ])])) : (b(), k("div", Mx, [
            l.value.labels && l.value.labels.length ? (b(), k("section", Sx, [
              u("div", Dx, [
                R(ft, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ]),
              u("div", Ax, [
                R(ue, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (b(), k("section", Tx, [
              u("div", Bx, [
                u("div", Lx, [
                  R(L(Xe), { class: "empty-icon" })
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
}), Ex = /* @__PURE__ */ re(Px, [["__scopeId", "data-v-b33e8627"]]), Ix = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Rx = {
  key: 0,
  class: "card-body"
}, Ox = {
  key: 0,
  class: "charts-grid"
}, Vx = { class: "chart-section" }, zx = { class: "chart-container" }, Nx = { class: "chart-section" }, jx = { class: "chart-container" }, Wx = {
  key: 1,
  class: "empty-state"
}, Hx = { class: "empty-state-content" }, Yx = { class: "empty-icon-wrapper" }, Kx = {
  key: 1,
  class: "loading-state"
}, Ux = /* @__PURE__ */ J({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = ve(pe(n, "theme")), s = C(() => n.data?.top_agents && n.data.top_agents.length > 0), i = C(() => n.data?.top_agents ? [...n.data.top_agents].sort((p, v) => (v.total_cost || 0) - (p.total_cost || 0)) : []), l = C(() => n.data?.top_agents ? [...n.data.top_agents].sort((p, v) => (v.total_tokens || 0) - (p.total_tokens || 0)) : []), r = C(() => {
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
                `Total Cost: ${$e(f.total_cost)}`,
                `Input Cost: ${$e(f.total_input_tokens_cost)}`,
                `Output Cost: ${$e(f.total_output_tokens_cost)}`,
                `Cache Read: ${$e(f.total_read_tokens_cost)}`,
                `Cache Write: ${$e(f.total_write_tokens_cost)}`
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
              return $e(p);
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
    return t({ isDark: a }), (p, v) => (b(), q(ge, {
      class: "h-full min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1
    }, {
      default: P(() => [
        u("div", Ix, [
          e.loading ? (b(), k("div", Kx, [...v[4] || (v[4] = [
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
          ])])) : (b(), k("div", Rx, [
            s.value ? (b(), k("div", Ox, [
              u("section", Vx, [
                v[0] || (v[0] = u("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                u("div", zx, [
                  R(vt, {
                    data: r.value,
                    options: d.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              u("section", Nx, [
                v[1] || (v[1] = u("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                u("div", jx, [
                  R(vt, {
                    data: c.value,
                    options: h.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (b(), k("section", Wx, [
              u("div", Hx, [
                u("div", Yx, [
                  R(L(Xe), { class: "empty-icon" })
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
}), qx = /* @__PURE__ */ re(Ux, [["__scopeId", "data-v-a5014772"]]), Xx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Gx = {
  key: 0,
  class: "card-body"
}, Zx = {
  key: 0,
  class: "chart-section"
}, Qx = { class: "chart-container" }, Jx = {
  key: 1,
  class: "empty-state"
}, ek = { class: "empty-state-content" }, tk = { class: "empty-icon-wrapper" }, nk = {
  key: 1,
  class: "loading-state"
}, ak = /* @__PURE__ */ J({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = ve(pe(n, "theme")), s = {
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
        const x = y.agent_type?.toLowerCase();
        return (s[x] || "#a78bfa") + "80";
      }), v = h.map((y) => {
        const x = y.agent_type?.toLowerCase();
        return s[x] || "#a78bfa";
      });
      return {
        labels: h.map((y) => {
          const x = y.conversations || 0, m = r.value ? x / r.value * 100 : 0;
          return `${y.agent_type} - ${x.toLocaleString()} (${m.toFixed(1)}%)`;
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
              const p = (h.label || "").toString(), v = Number(h.parsed) || 0, f = (h.dataset.data || []).reduce((x, m) => x + (Number(m) || 0), 0), y = f ? v / f * 100 : 0;
              return `${p}: ${v.toLocaleString()} (${y.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: a }), (h, p) => (b(), q(ge, {
      class: "h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1
    }, {
      default: P(() => [
        u("div", Xx, [
          e.loading ? (b(), k("div", nk, [...p[2] || (p[2] = [
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
          ])])) : (b(), k("div", Gx, [
            l.value ? (b(), k("section", Zx, [
              u("div", Qx, [
                R(pa, {
                  data: c.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (b(), k("section", Jx, [
              u("div", ek, [
                u("div", tk, [
                  R(L(Xe), { class: "empty-icon" })
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
}), ok = /* @__PURE__ */ re(ak, [["__scopeId", "data-v-14445b91"]]), sk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, ik = {
  key: 0,
  class: "card-body"
}, lk = {
  key: 0,
  class: "chart-section"
}, rk = { class: "chart-container" }, ck = {
  key: 1,
  class: "empty-state"
}, dk = { class: "empty-state-content" }, uk = { class: "empty-icon-wrapper" }, hk = {
  key: 1,
  class: "loading-state"
}, fk = /* @__PURE__ */ J({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = ve(pe(n, "theme")), s = (c) => {
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
        const x = [...c].sort((m, g) => m.date.localeCompare(g.date));
        return {
          labels: x.map((m) => s(m.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: x.map((m) => Number(m.value) || 0),
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
      const d = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {}, v = Object.keys(d).filter((x) => h[x]).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const f = v.map((x) => s(x)), y = v.map((x) => {
        const m = d[x]?.total_cost || 0, g = h[x] || 0;
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
              return d && (d += ": "), c.parsed.y !== null && (d += $e(c.parsed.y)), d;
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
              return $e(c);
            }
          }
        }
      }
    });
    return t({ isDark: a }), (c, d) => (b(), q(ge, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1
    }, {
      default: P(() => [
        u("div", sk, [
          e.loading ? (b(), k("div", hk, [...d[2] || (d[2] = [
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
          ])])) : (b(), k("div", ik, [
            i.value ? (b(), k("section", lk, [
              u("div", rk, [
                R(ft, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (b(), k("section", ck, [
              u("div", dk, [
                u("div", uk, [
                  R(L(Xe), { class: "empty-icon" })
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
}), gk = /* @__PURE__ */ re(fk, [["__scopeId", "data-v-1e8204ea"]]);
function We() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const pk = { class: "tabs text-sm" }, mk = ["aria-label"], bk = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], vk = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, yk = /* @__PURE__ */ J({
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
    const n = e, a = t, o = oe([]), s = `tabs-${We()}`, i = (f) => `${s}-tab-${f}`, l = C(
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
      a("tab-click", { value: f.value, originalEvent: y }), !f.disabled && (d(f.value, n.modelValue), Ve(() => {
        o.value[n.items.indexOf(f)]?.focus();
      }));
    }
    function p(f, y) {
      const x = n.items.length;
      if (x === 0) return 0;
      let m = f;
      for (let g = 0; g < x; g++)
        if (m = (m + y + x) % x, !n.items[m]?.disabled) return m;
      return f;
    }
    async function v(f, y) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(f.key)) return;
      f.preventDefault();
      let m = y;
      f.key === "ArrowLeft" ? m = p(y, -1) : f.key === "ArrowRight" ? m = p(y, 1) : f.key === "Home" ? m = l.value[0] ?? 0 : f.key === "End" && (m = l.value[l.value.length - 1] ?? y);
      const g = n.items[m];
      !g || g.disabled || (d(g.value, n.modelValue), await Ve(), o.value[m]?.focus());
    }
    return (f, y) => (b(), k("div", pk, [
      u("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: U([
          "box-border h-10 max-h-10 min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 px-0.5 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (b(!0), k(Z, null, ie(e.items, (x, m) => (b(), k("button", {
          id: i(x.value),
          key: x.value,
          ref_for: !0,
          ref_key: "tabRefs",
          ref: o,
          type: "button",
          role: "tab",
          "aria-selected": r(x),
          "aria-disabled": x.disabled === !0,
          tabindex: r(x) ? 0 : -1,
          class: U(c(x)),
          onClick: (g) => h(x, g),
          onKeydown: (g) => v(g, m)
        }, [
          u("span", {
            class: U(["tabs-tab__label flex min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            x.icon ? (b(), q(tn(x.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : V("", !0),
            u("span", vk, A(x.label), 1)
          ], 2)
        ], 42, bk))), 128))
      ], 10, mk),
      f.$slots.default ? (b(), q(_e, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: P(() => [
          (b(), k("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            Ce(f.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : V("", !0)
    ]));
  }
}), el = /* @__PURE__ */ re(yk, [["__scopeId", "data-v-f9c367eb"]]), _k = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, xk = {
  key: 0,
  class: "loading-state"
}, kk = {
  key: 1,
  class: "card-body"
}, wk = {
  key: 0,
  class: "model-usage-table-block"
}, Ck = { class: "w-full min-w-0" }, $k = {
  key: 1,
  class: "empty-state"
}, Mk = { class: "empty-state-content" }, Sk = { class: "empty-icon-wrapper" }, Dk = /* @__PURE__ */ J({
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
    const a = e, o = n, s = (f) => {
      o("export", f);
    }, { isDark: i } = ve(pe(a, "theme")), l = [
      { value: "by_model", label: "Model" },
      { value: "by_provider", label: "Provider" }
    ], r = oe("by_model"), c = C(() => r.value === "by_model" ? a.data?.total_by_model || {} : a.data?.total_by_provider || {}), d = C(() => [
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
    ), p = (f) => f == null ? "0" : G(f), v = (f) => f == null ? "$0.00" : $e(f);
    return t({ isDark: i }), (f, y) => (b(), q(ge, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1
    }, {
      headerExport: P(() => [
        e.enableExport && !e.loading ? (b(), q(L(Fe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        u("div", _k, [
          e.loading ? (b(), k("div", xk, [...y[1] || (y[1] = [
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
          ])])) : (b(), k("div", kk, [
            R(el, {
              modelValue: r.value,
              "onUpdate:modelValue": y[0] || (y[0] = (x) => r.value = x),
              items: l,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: P(() => [
                c.value && Object.keys(c.value).length > 0 ? (b(), k("div", wk, [
                  u("div", Ck, [
                    R(st, {
                      columns: d.value,
                      rows: h.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (b(), k("div", $k, [
                  u("div", Mk, [
                    u("div", Sk, [
                      R(L(Xe), { class: "empty-icon" })
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
}), Ak = /* @__PURE__ */ re(Dk, [["__scopeId", "data-v-0c23d620"]]), Tk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Bk = {
  key: 0,
  class: "loading-state"
}, Lk = {
  key: 1,
  class: "card-body"
}, Fk = {
  key: 0,
  class: "message-roles-table-block"
}, Pk = { class: "w-full min-w-0" }, Ek = {
  key: 1,
  class: "empty-state"
}, Ik = { class: "empty-state-content" }, Rk = { class: "empty-icon-wrapper" }, Ok = /* @__PURE__ */ J({
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
    const a = e, o = n, s = (y) => {
      o("export", y);
    }, { isDark: i } = ve(pe(a, "theme")), l = ["assistant", "system", "user"], r = [
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
    ), h = C(() => Object.keys(c.value).length > 0), p = (y) => y == null ? "0" : G(y), v = (y) => y == null ? "$0.00" : $e(y), f = (y) => y.charAt(0).toUpperCase() + y.slice(1);
    return t({ isDark: i }), (y, x) => (b(), q(ge, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1
    }, {
      headerExport: P(() => [
        e.enableExport && !e.loading ? (b(), q(L(Fe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        u("div", Tk, [
          e.loading ? (b(), k("div", Bk, [...x[0] || (x[0] = [
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
          ])])) : (b(), k("div", Lk, [
            h.value ? (b(), k("div", Fk, [
              u("div", Pk, [
                R(st, {
                  columns: r,
                  rows: d.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (b(), k("div", Ek, [
              u("div", Ik, [
                u("div", Rk, [
                  R(L(Xe), { class: "empty-icon" })
                ]),
                x[1] || (x[1] = u("p", { class: "empty-title" }, "No message role data available", -1)),
                x[2] || (x[2] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), Vk = /* @__PURE__ */ re(Ok, [["__scopeId", "data-v-362c0dbc"]]), zk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Nk = {
  key: 0,
  class: "card-body"
}, jk = {
  key: 0,
  class: "chart-section"
}, Wk = { class: "chart-container" }, Hk = { class: "kpi-grid" }, Yk = {
  key: 1,
  class: "empty-state"
}, Kk = { class: "empty-state-content" }, Uk = { class: "empty-icon-wrapper" }, qk = {
  key: 1,
  class: "loading-state"
}, Xk = /* @__PURE__ */ J({
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
    const a = e, o = n, s = (g) => {
      o("export", g);
    }, { isDark: i, colors: l } = ve(pe(a, "theme")), r = {
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
      const _ = c(g).toLowerCase();
      for (const [w, D] of Object.entries(r))
        if (_.includes(w))
          return D;
      return "#9ca3af";
    }, p = C(() => [...a.data?.top_agents || []].sort((_, w) => w.avg_cost_per_conversation - _.avg_cost_per_conversation)), v = C(() => a.data?.total_conversations !== void 0 ? Number(a.data.total_conversations) || 0 : p.value.reduce((g, _) => g + _.conversations, 0)), f = C(() => a.data?.total_cost !== void 0 ? Number(a.data.total_cost) || 0 : p.value.reduce((g, _) => g + _.total_cost, 0)), y = C(() => a.data?.overall_avg_cost_per_conversation !== void 0 ? Number(a.data.overall_avg_cost_per_conversation) || 0 : v.value === 0 ? 0 : f.value / v.value), x = C(() => {
      const g = p.value;
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const _ = g.map((S) => d(S)), w = g.map((S) => S.avg_cost_per_conversation), D = g.map((S) => h(S));
      return {
        labels: _,
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
              const _ = p.value[g.dataIndex];
              return [
                `Cost: ${$e(g.parsed.x)}`,
                `Conversations: ${G(_.conversations)}`,
                `Total Cost: ${$e(_.total_cost)}`
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
              return $e(g);
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
    return t({ isDark: i }), (g, _) => (b(), q(ge, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1
    }, {
      headerExport: P(() => [
        e.enableExport && !e.loading ? (b(), q(L(Fe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        u("div", zk, [
          e.loading ? (b(), k("div", qk, [..._[2] || (_[2] = [
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
          ])])) : (b(), k("div", Nk, [
            x.value.labels && x.value.labels.length ? (b(), k("section", jk, [
              u("div", Wk, [
                R(vt, {
                  data: x.value,
                  options: m.value
                }, null, 8, ["data", "options"])
              ]),
              u("footer", Hk, [
                R(L(ue), {
                  title: "Total Agents",
                  value: String(p.value.length)
                }, null, 8, ["value"]),
                R(L(ue), {
                  title: "Total Conversations",
                  value: L(G)(v.value)
                }, null, 8, ["value"]),
                R(L(ue), {
                  title: "Total Cost",
                  value: L($e)(f.value)
                }, null, 8, ["value"]),
                R(L(ue), {
                  title: "Avg Cost / Conv.",
                  value: L($e)(y.value)
                }, null, 8, ["value"])
              ])
            ])) : (b(), k("section", Yk, [
              u("div", Kk, [
                u("div", Uk, [
                  R(L(Xe), { class: "empty-icon" })
                ]),
                _[0] || (_[0] = u("p", { class: "empty-title" }, "No cost per conversation data", -1)),
                _[1] || (_[1] = u("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), Gk = /* @__PURE__ */ re(Xk, [["__scopeId", "data-v-49068ad7"]]);
function Zk(e, t) {
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
function Qk(e, t) {
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
const Jk = ["aria-label"], e2 = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, t2 = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, n2 = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, a2 = ["aria-label", "aria-expanded", "aria-controls", "onClick"], o2 = { class: "truncate" }, s2 = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, i2 = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, l2 = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, r2 = ["aria-label", "onClick"], c2 = ["aria-label", "onClick"], d2 = ["aria-label"], u2 = ["aria-label"], h2 = {
  key: 1,
  class: "space-y-2"
}, f2 = ["for"], g2 = ["id", "placeholder", "onKeydown"], p2 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, m2 = ["aria-label"], b2 = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, v2 = ["checked", "onChange"], y2 = { class: "min-w-0 flex-1" }, _2 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, x2 = { class: "flex flex-wrap items-end gap-2" }, k2 = { class: "min-w-[120px] flex-1" }, w2 = ["for"], C2 = ["id"], $2 = { class: "min-w-[120px] flex-1" }, M2 = ["for"], S2 = ["id"], D2 = /* @__PURE__ */ J({
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
    const n = e, a = t, o = Na(), i = `${`kiut-filters-${We()}`}-panel`, l = oe(null), r = /* @__PURE__ */ new Map(), c = oe(null), d = oe(!1), h = oe({}), p = oe(null), v = oe(""), f = oe([]), y = oe(""), x = oe(""), m = C(() => c.value ? n.filterDefinitions.find((O) => O.id === c.value) ?? null : null), g = C(() => {
      const O = m.value;
      if (O)
        return O.type === "text" ? v.value : O.type === "select" ? f.value : { start: y.value, end: x.value };
    });
    function _(O, H) {
      H && H instanceof HTMLElement ? r.set(O, H) : r.delete(O);
    }
    function w(O) {
      return n.modelValue[O];
    }
    function D(O) {
      if (O == null) return [];
      if (Array.isArray(O))
        return O.filter((H) => typeof H == "string" && H.trim() !== "");
      if (typeof O == "string") {
        const H = O.trim();
        return H ? [H] : [];
      }
      return [];
    }
    function S(O, H) {
      if (H == null) return !0;
      if (O.type === "text") return String(H).trim() === "";
      if (O.type === "select") return D(H).length === 0;
      if (O.type === "dateRange") {
        const ae = H;
        return !ae?.start?.trim() || !ae?.end?.trim();
      }
      return !0;
    }
    const $ = C(
      () => n.filterDefinitions.some((O) => !S(O, w(O.id)))
    ), M = C(() => {
      const O = [];
      for (const H of n.filterDefinitions) {
        const ae = w(H.id);
        if (!S(H, ae)) {
          if (H.type === "text")
            O.push({ kind: "text", def: H, key: H.id });
          else if (H.type === "dateRange")
            O.push({ kind: "dateRange", def: H, key: H.id });
          else if (H.type === "select")
            for (const fe of D(ae))
              O.push({
                kind: "select",
                def: H,
                optionValue: fe,
                key: `${H.id}::${fe}`
              });
        }
      }
      return O;
    });
    function F(O) {
      return O.type !== "select" ? 0 : D(w(O.id)).length;
    }
    function T(O) {
      const H = w(O.id), ae = O.label.replace(/^\+\s*/, "");
      if (O.type === "text") return `${ae}: ${String(H ?? "").trim()}`;
      if (O.type === "select") {
        const cl = D(H).map((fo) => O.options.find((dl) => dl.value === fo)?.label ?? fo);
        return `${ae}: ${cl.join(", ")}`;
      }
      const fe = H, at = E(fe.start), Dt = E(fe.end);
      return `${ae}: ${at} – ${Dt}`;
    }
    function B(O) {
      return O.kind === "text" || O.kind === "dateRange" ? T(O.def) : O.def.options.find((ae) => ae.value === O.optionValue)?.label ?? O.optionValue;
    }
    function E(O) {
      if (!O) return "";
      const H = Oe(O, "YYYY-MM-DD", !0);
      return H.isValid() ? H.format("L") : O;
    }
    function I(O) {
      const H = c.value === O.id && d.value, ae = !S(O, w(O.id));
      return H || ae ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function N(O) {
      return S(O, w(O.id)) ? me(O) : `Editar filtro ${O.label.replace(/^\+\s*/, "")}`;
    }
    function Y(O) {
      const H = w(O.id);
      if (O.type === "text") {
        v.value = H != null ? String(H) : "";
        return;
      }
      if (O.type === "select") {
        f.value = [...D(H)];
        return;
      }
      const ae = H;
      y.value = ae?.start?.trim() ?? "", x.value = ae?.end?.trim() ?? "";
    }
    function j() {
      const O = m.value;
      if (!O || O.type !== "select") return;
      const H = { ...n.modelValue };
      f.value.length === 0 ? delete H[O.id] : H[O.id] = [...f.value], a("update:modelValue", H), a("change", H);
    }
    function Q(O) {
      const H = f.value.indexOf(O);
      H >= 0 ? f.value = f.value.filter((ae, fe) => fe !== H) : f.value = [...f.value, O], j();
    }
    function ee(O) {
      if (!O) return;
      p.value = O;
      const H = O.getBoundingClientRect(), ae = 300;
      let fe = H.left;
      const at = window.innerWidth - ae - 12;
      fe > at && (fe = Math.max(12, at)), fe < 12 && (fe = 12);
      const Dt = H.bottom + 8;
      h.value = {
        top: `${Dt}px`,
        left: `${fe}px`,
        width: `${Math.min(ae, window.innerWidth - 24)}px`
      };
    }
    function ce(O, H) {
      if (c.value === O.id && d.value) {
        se();
        return;
      }
      d.value && c.value !== O.id && se(), c.value = O.id, d.value = !0, Y(O), Ve().then(async () => {
        ee(H.currentTarget), await Ve(), K();
      });
    }
    function z(O, H) {
      if (c.value === O.id && d.value) {
        se();
        return;
      }
      d.value && c.value !== O.id && se(), c.value = O.id, d.value = !0, Y(O), Ve().then(async () => {
        const ae = r.get(O.id) ?? H.currentTarget;
        ee(ae), await Ve(), K();
      });
    }
    function K() {
      const O = l.value;
      if (!O) return;
      O.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function X() {
      d.value = !1, c.value = null, p.value = null;
    }
    function le(O) {
      const H = m.value;
      if (!H) return;
      if (H.type === "text") {
        v.value = O != null ? String(O) : "";
        return;
      }
      if (H.type === "select") {
        f.value = Array.isArray(O) ? O.filter((fe) => typeof fe == "string") : D(O);
        return;
      }
      const ae = O;
      y.value = ae?.start?.trim() ?? "", x.value = ae?.end?.trim() ?? "";
    }
    function se() {
      const O = m.value;
      if (!O) return;
      if (O.type === "text") {
        const at = v.value.trim(), Dt = { ...n.modelValue };
        at === "" ? delete Dt[O.id] : Dt[O.id] = at, a("update:modelValue", Dt), a("change", Dt), X();
        return;
      }
      if (O.type === "select") {
        j(), X();
        return;
      }
      const H = y.value.trim(), ae = x.value.trim(), fe = { ...n.modelValue };
      !H || !ae || H > ae ? delete fe[O.id] : fe[O.id] = { start: H, end: ae }, a("update:modelValue", fe), a("change", fe), X();
    }
    function Ae(O) {
      const H = { ...n.modelValue };
      delete H[O], a("update:modelValue", H), a("change", H), c.value === O && X();
    }
    function xe(O) {
      if (O.kind === "text" || O.kind === "dateRange") {
        Ae(O.def.id);
        return;
      }
      const H = { ...n.modelValue }, fe = D(H[O.def.id]).filter((at) => at !== O.optionValue);
      fe.length === 0 ? delete H[O.def.id] : H[O.def.id] = fe, a("update:modelValue", H), a("change", H), c.value === O.def.id && Y(O.def);
    }
    function W() {
      const O = {};
      a("update:modelValue", O), a("change", O), X();
    }
    const te = C(() => {
      const O = m.value;
      return O ? `Editar filtro: ${O.label}` : "Filtro";
    });
    function ne(O) {
      const H = O.def.label.replace(/^\+\s*/, "");
      return O.kind === "select" ? `Quitar ${O.def.options.find((at) => at.value === O.optionValue)?.label ?? O.optionValue} del filtro ${H}` : `Quitar filtro ${H}`;
    }
    function de(O) {
      const H = O.def.label.replace(/^\+\s*/, "");
      if (O.kind === "select") {
        const fe = O.def.options.find((at) => at.value === O.optionValue)?.label ?? O.optionValue;
        return `Editar filtro ${H}: ${fe}`;
      }
      return `Editar filtro ${H}`;
    }
    function me(O) {
      return `Añadir filtro ${O.label.replace(/^\+\s*/, "")}`;
    }
    const be = C(() => n.clearLabel);
    function Te(O) {
      if (!d.value || !l.value) return;
      const H = O.target;
      if (!(l.value.contains(H) || (H instanceof Element ? H : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const fe of r.values())
          if (fe?.contains(H)) return;
        se();
      }
    }
    function je(O) {
      O.key === "Escape" && d.value && (O.preventDefault(), X());
    }
    function Ie() {
      !d.value || !p.value || ee(p.value);
    }
    return tt(() => {
      document.addEventListener("mousedown", Te, !0), window.addEventListener("keydown", je, !0), window.addEventListener("resize", Ie);
    }), Ws(() => {
      document.removeEventListener("mousedown", Te, !0), window.removeEventListener("keydown", je, !0), window.removeEventListener("resize", Ie);
    }), Le(
      () => n.modelValue,
      () => {
        const O = m.value;
        O && d.value && !o.panel && Y(O);
      },
      { deep: !0 }
    ), (O, H) => (b(), k("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      u("div", e2, [
        u("span", t2, A(e.label), 1),
        u("div", n2, [
          (b(!0), k(Z, null, ie(e.filterDefinitions, (ae) => (b(), k("button", {
            key: `pill-${ae.id}`,
            ref_for: !0,
            ref: (fe) => _(ae.id, fe),
            type: "button",
            class: U(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", I(ae)]),
            "aria-label": N(ae),
            "aria-expanded": c.value === ae.id,
            "aria-haspopup": !0,
            "aria-controls": c.value === ae.id ? i : void 0,
            onClick: (fe) => z(ae, fe)
          }, [
            R(L(Zk), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            u("span", o2, A(ae.label), 1),
            ae.type === "select" && F(ae) > 0 ? (b(), k("span", s2, A(F(ae)), 1)) : V("", !0)
          ], 10, a2))), 128))
        ])
      ]),
      $.value ? (b(), k("div", i2, [
        u("div", l2, [
          (b(!0), k(Z, null, ie(M.value, (ae) => (b(), k("div", {
            key: ae.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            u("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": de(ae),
              onClick: (fe) => ce(ae.def, fe)
            }, [
              Ce(O.$slots, "formatChip", {
                filter: ae.def,
                value: w(ae.def.id),
                optionValue: ae.kind === "select" ? ae.optionValue : void 0
              }, () => [
                ke(A(B(ae)), 1)
              ], !0)
            ], 8, r2),
            u("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": ne(ae),
              onClick: (fe) => xe(ae)
            }, [
              R(L(Qk), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, c2)
          ]))), 128))
        ]),
        u("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": be.value,
          onClick: W
        }, A(e.clearLabel), 9, d2)
      ])) : V("", !0),
      (b(), q(ja, { to: "body" }, [
        c.value && d.value ? (b(), k("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: l,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": te.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: ye(h.value),
          onKeydown: H[3] || (H[3] = ot(() => {
          }, ["stop"]))
        }, [
          m.value ? (b(), k(Z, { key: 0 }, [
            O.$slots.panel ? Ce(O.$slots, "panel", {
              key: 0,
              filter: m.value,
              close: se,
              value: g.value,
              updateValue: le
            }, void 0, !0) : (b(), k("div", h2, [
              m.value.type === "text" ? (b(), k(Z, { key: 0 }, [
                u("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, A(m.value.label), 9, f2),
                et(u("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": H[0] || (H[0] = (ae) => v.value = ae),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: m.value.placeholder ?? "…",
                  onKeydown: $n(ot(se, ["prevent"]), ["enter"])
                }, null, 40, g2), [
                  [Ut, v.value]
                ])
              ], 64)) : m.value.type === "select" ? (b(), k(Z, { key: 1 }, [
                u("p", p2, A(m.value.label), 1),
                u("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": m.value.label,
                  "aria-multiselectable": !0
                }, [
                  (b(!0), k(Z, null, ie(m.value.options, (ae) => (b(), k("li", {
                    key: ae.value
                  }, [
                    u("label", b2, [
                      u("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: f.value.includes(ae.value),
                        onChange: (fe) => Q(ae.value)
                      }, null, 40, v2),
                      u("span", y2, A(ae.label), 1)
                    ])
                  ]))), 128))
                ], 8, m2)
              ], 64)) : m.value.type === "dateRange" ? (b(), k(Z, { key: 2 }, [
                u("p", _2, A(m.value.label), 1),
                u("div", x2, [
                  u("div", k2, [
                    u("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, w2),
                    et(u("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": H[1] || (H[1] = (ae) => y.value = ae),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, C2), [
                      [Ut, y.value]
                    ])
                  ]),
                  u("div", $2, [
                    u("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, M2),
                    et(u("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": H[2] || (H[2] = (ae) => x.value = ae),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, S2), [
                      [Ut, x.value]
                    ])
                  ])
                ])
              ], 64)) : V("", !0)
            ]))
          ], 64)) : V("", !0)
        ], 44, u2)) : V("", !0)
      ]))
    ], 8, Jk));
  }
}), A2 = /* @__PURE__ */ re(D2, [["__scopeId", "data-v-f38e0100"]]), nt = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", dt = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", T2 = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", St = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", yt = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", B2 = { class: "font-sans" }, L2 = ["for"], F2 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], P2 = ["id"], E2 = /* @__PURE__ */ J({
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
  setup(e, { emit: t }) {
    const n = e, a = t, o = da(), s = Hs("$pcForm", null), i = `kiut-input-text-${We()}`, l = C(() => n.id ?? i), r = C(() => `${l.value}-err`), c = C(() => n.name ?? o.name ?? ""), d = oe(n.modelValue ?? "");
    Le(
      () => n.modelValue,
      (m) => {
        d.value = m ?? "";
      }
    ), tt(() => {
      s && c.value && s.register?.(c.value, {});
    }), ht(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const h = C(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? d.value : d.value), p = C(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? n.invalid ?? !1 : n.invalid ?? !1);
    function v(m) {
      const g = m.target.value;
      d.value = g, a("update:modelValue", g);
      const _ = s?.fields?.[c.value]?.props;
      _?.onInput && _.onInput(m);
    }
    function f(m) {
      const g = s?.fields?.[c.value]?.props;
      g?.onChange && g.onChange(m);
    }
    function y(m) {
      const g = s?.fields?.[c.value]?.props;
      g?.onBlur && g.onBlur(m);
    }
    const x = C(() => {
      const { name: m, id: g, type: _, ...w } = o;
      return w;
    });
    return (m, g) => (b(), k("div", B2, [
      e.label ? (b(), k("label", {
        key: 0,
        for: l.value,
        class: U(L(nt))
      }, A(e.label), 11, L2)) : V("", !0),
      u("input", sn(x.value, {
        id: l.value,
        name: c.value,
        type: e.type,
        autocomplete: "off",
        class: [L(dt), p.value ? L(St) : ""],
        placeholder: e.placeholder,
        disabled: e.disabled,
        value: h.value,
        "aria-invalid": p.value ? "true" : void 0,
        "aria-describedby": e.errorText ? r.value : void 0,
        onInput: v,
        onChange: f,
        onBlur: y
      }), null, 16, F2),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: r.value,
        class: U(L(yt)),
        role: "alert"
      }, A(e.errorText), 11, P2)) : V("", !0)
    ]));
  }
}), I2 = { class: "font-sans" }, R2 = ["for"], O2 = { class: "relative" }, V2 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], z2 = ["aria-label"], N2 = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, j2 = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, W2 = ["id"], H2 = /* @__PURE__ */ J({
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
  setup(e, { emit: t }) {
    const n = e, a = t, o = da(), s = Hs("$pcForm", null), i = `kiut-input-password-${We()}`, l = C(() => n.id ?? i), r = C(() => `${l.value}-err`), c = C(() => n.name ?? o.name ?? ""), d = oe(!1), h = oe(n.modelValue ?? "");
    Le(
      () => n.modelValue,
      (g) => {
        g !== void 0 && g !== h.value && (h.value = g);
      }
    ), tt(() => {
      s && c.value && s.register?.(c.value, {});
    }), ht(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const p = C(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? h.value : h.value), v = C(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? n.invalid ?? !1 : n.invalid ?? !1);
    function f(g) {
      const _ = g.target.value;
      h.value = _, a("update:modelValue", _);
      const w = s?.fields?.[c.value]?.props;
      w?.onInput && w.onInput(g);
    }
    function y(g) {
      const _ = s?.fields?.[c.value]?.props;
      _?.onChange && _.onChange(g);
    }
    function x(g) {
      const _ = s?.fields?.[c.value]?.props;
      _?.onBlur && _.onBlur(g);
    }
    const m = C(() => {
      const { name: g, id: _, ...w } = o;
      return w;
    });
    return (g, _) => (b(), k("div", I2, [
      e.label ? (b(), k("label", {
        key: 0,
        for: l.value,
        class: U(L(nt))
      }, A(e.label), 11, R2)) : V("", !0),
      u("div", O2, [
        u("input", sn(m.value, {
          id: l.value,
          name: c.value,
          type: d.value ? "text" : "password",
          autocomplete: "current-password",
          class: [L(dt), v.value ? L(St) : "", "pr-10"],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: p.value,
          "aria-invalid": v.value ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: f,
          onChange: y,
          onBlur: x
        }), null, 16, V2),
        u("button", {
          type: "button",
          tabindex: "-1",
          onClick: _[0] || (_[0] = (w) => d.value = !d.value),
          class: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
          "aria-label": d.value ? "Hide password" : "Show password"
        }, [
          d.value ? (b(), k("svg", j2, [..._[2] || (_[2] = [
            u("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            }, null, -1)
          ])])) : (b(), k("svg", N2, [..._[1] || (_[1] = [
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
        ], 8, z2)
      ]),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: r.value,
        class: U(L(yt)),
        role: "alert"
      }, A(e.errorText), 11, W2)) : V("", !0)
    ]));
  }
}), Y2 = { class: "font-sans" }, K2 = ["for"], U2 = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], q2 = ["id"], X2 = /* @__PURE__ */ J({
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
    const n = e, a = t, o = `kiut-input-textarea-${We()}`, s = C(() => n.id ?? o), i = C(() => `${s.value}-err`), l = C({
      get: () => n.modelValue,
      set: (r) => a("update:modelValue", r)
    });
    return (r, c) => (b(), k("div", Y2, [
      e.label ? (b(), k("label", {
        key: 0,
        for: s.value,
        class: U(L(nt))
      }, A(e.label), 11, K2)) : V("", !0),
      et(u("textarea", {
        id: s.value,
        "onUpdate:modelValue": c[0] || (c[0] = (d) => l.value = d),
        rows: e.rows,
        autocomplete: "off",
        class: U([L(T2), e.invalid ? L(St) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, U2), [
        [Ut, l.value]
      ]),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: U(L(yt)),
        role: "alert"
      }, A(e.errorText), 11, q2)) : V("", !0)
    ]));
  }
}), G2 = { class: "font-sans" }, Z2 = ["for"], Q2 = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], J2 = ["for"], ew = ["title"], tw = ["aria-label"], nw = ["id"], aw = /* @__PURE__ */ J({
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
    const n = e, a = t, o = `kiut-input-file-${We()}`, s = C(() => n.id ?? o), i = C(() => `${s.value}-err`), l = oe(null), r = C(() => n.modelValue?.name ?? n.placeholder);
    function c(h) {
      const v = h.target.files?.[0] ?? null;
      a("update:modelValue", v);
    }
    function d() {
      a("update:modelValue", null), l.value && (l.value.value = "");
    }
    return (h, p) => (b(), k("div", G2, [
      e.label ? (b(), k("label", {
        key: 0,
        for: s.value,
        class: U(L(nt))
      }, A(e.label), 11, Z2)) : V("", !0),
      u("div", {
        class: U([
          L(dt),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? L(St) : "",
          e.disabled ? "pointer-events-none" : ""
        ])
      }, [
        u("input", {
          id: s.value,
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
        }, null, 40, Q2),
        u("label", {
          for: s.value,
          class: U(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          R(L(vp), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          ke(" " + A(e.chooseLabel), 1)
        ], 10, J2),
        u("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: r.value || void 0
        }, A(r.value), 9, ew),
        e.modelValue && !e.disabled ? (b(), k("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: d
        }, [
          R(L(Hi), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, tw)) : V("", !0)
      ], 2),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: U(L(yt)),
        role: "alert"
      }, A(e.errorText), 11, nw)) : V("", !0)
    ]));
  }
}), ow = { class: "font-sans" }, sw = ["for"], iw = { class: "relative" }, lw = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], rw = ["id"], cw = /* @__PURE__ */ J({
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
    const n = e, a = t, o = `kiut-input-datetime-${We()}`, s = C(() => n.id ?? o), i = C(() => `${s.value}-err`), l = C(() => n.modelValue ?? "");
    function r(c) {
      const d = c.target.value;
      a("update:modelValue", d === "" ? null : d);
    }
    return (c, d) => (b(), k("div", ow, [
      e.label ? (b(), k("label", {
        key: 0,
        for: s.value,
        class: U(L(nt))
      }, A(e.label), 11, sw)) : V("", !0),
      u("div", iw, [
        R(L(ho), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: s.value,
          value: l.value,
          type: "datetime-local",
          autocomplete: "off",
          class: U([
            L(dt),
            "pl-10",
            e.invalid ? L(St) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onInput: r
        }, null, 42, lw)
      ]),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: U(L(yt)),
        role: "alert"
      }, A(e.errorText), 11, rw)) : V("", !0)
    ]));
  }
}), dw = { class: "font-sans" }, uw = ["for"], hw = { class: "relative" }, fw = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], gw = ["id"], pw = /* @__PURE__ */ J({
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
      const p = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(h.trim());
      if (!p) return null;
      const v = Number(p[1]), f = Number(p[2]);
      return !Number.isInteger(v) || !Number.isInteger(f) || v < 0 || v > 23 || f < 0 || f > 59 ? null : `${String(v).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
    }
    function a(h) {
      return h === "" ? null : n(h);
    }
    const o = e, s = t, i = `kiut-input-time-${We()}`, l = C(() => o.id ?? i), r = C(() => `${l.value}-err`), c = C(() => o.modelValue == null || o.modelValue === "" ? "" : n(o.modelValue) ?? "");
    function d(h) {
      const p = h.target.value;
      s("update:modelValue", a(p));
    }
    return (h, p) => (b(), k("div", dw, [
      e.label ? (b(), k("label", {
        key: 0,
        for: l.value,
        class: U(L(nt))
      }, A(e.label), 11, uw)) : V("", !0),
      u("div", hw, [
        R(L(_p), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: l.value,
          value: c.value,
          type: "time",
          autocomplete: "off",
          class: U([
            L(dt),
            "pl-10",
            e.invalid ? L(St) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: d
        }, null, 42, fw)
      ]),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: r.value,
        class: U(L(yt)),
        role: "alert"
      }, A(e.errorText), 11, gw)) : V("", !0)
    ]));
  }
}), mw = { class: "font-sans" }, bw = ["for"], vw = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, yw = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], _w = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, xw = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, kw = { class: "min-w-0 text-left leading-snug" }, ww = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, Cw = { class: "min-w-0 text-right leading-snug" }, $w = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Mw = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Sw = ["id"], Dw = /* @__PURE__ */ J({
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
    const n = e, a = t, o = `kiut-input-range-${We()}`, s = C(() => n.id ?? o), i = C(() => `${s.value}-err`), l = C(() => {
      const v = [];
      return n.errorText && v.push(i.value), v.length ? v.join(" ") : void 0;
    }), r = C(
      () => !!(n.caption && !n.captionMin && !n.captionMax)
    ), c = C(() => !!(n.captionMin || n.captionMax)), d = C(() => {
      const { min: v, max: f, modelValue: y } = n;
      if (f === v) return 0;
      const x = (y - v) / (f - v);
      return Math.min(100, Math.max(0, x * 100));
    }), h = C(() => ({
      "--kiut-range-fill": `${d.value}%`,
      "--kiut-range-length": n.trackLength
    }));
    function p(v) {
      const f = Number(v.target.value);
      a("update:modelValue", Number.isNaN(f) ? n.min : f);
    }
    return (v, f) => (b(), k("div", mw, [
      e.label ? (b(), k("label", {
        key: 0,
        for: s.value,
        class: U(L(nt))
      }, A(e.label), 11, bw)) : V("", !0),
      u("div", {
        class: U(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (b(), k("p", vw, A(e.captionMax), 1)) : V("", !0),
        u("div", {
          class: U(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: ye(h.value)
        }, [
          u("input", {
            id: s.value,
            type: "range",
            value: e.modelValue,
            min: e.min,
            max: e.max,
            step: e.step,
            disabled: e.disabled,
            "aria-orientation": e.orientation,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": l.value,
            class: U([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: p
          }, null, 42, yw)
        ], 6),
        e.orientation === "horizontal" && r.value ? (b(), k("p", _w, A(e.caption), 1)) : e.orientation === "horizontal" && c.value ? (b(), k("div", xw, [
          u("span", kw, A(e.captionMin), 1),
          u("span", ww, A(e.caption), 1),
          u("span", Cw, A(e.captionMax), 1)
        ])) : V("", !0),
        e.orientation === "vertical" && e.captionMin ? (b(), k("p", $w, A(e.captionMin), 1)) : V("", !0),
        e.orientation === "vertical" && e.caption ? (b(), k("p", Mw, A(e.caption), 1)) : V("", !0)
      ], 2),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: U(L(yt)),
        role: "alert"
      }, A(e.errorText), 11, Sw)) : V("", !0)
    ]));
  }
}), Aw = /* @__PURE__ */ re(Dw, [["__scopeId", "data-v-a1343418"]]), Tw = { class: "font-sans" }, Bw = ["for"], Lw = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], Fw = ["id"], Pw = /* @__PURE__ */ J({
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
    const n = e, a = t, o = `kiut-input-number-${We()}`, s = C(() => n.id ?? o), i = C(() => `${s.value}-err`), l = C(() => {
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
    return (d, h) => (b(), k("div", Tw, [
      e.label ? (b(), k("label", {
        key: 0,
        for: s.value,
        class: U(L(nt))
      }, A(e.label), 11, Bw)) : V("", !0),
      u("input", {
        id: s.value,
        value: r.value,
        type: "number",
        onInput: c,
        class: U([
          L(dt),
          e.invalid ? L(St) : "",
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
      }, null, 42, Lw),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: U(L(yt)),
        role: "alert"
      }, A(e.errorText), 11, Fw)) : V("", !0)
    ]));
  }
}), Ew = { class: "font-sans" }, Iw = ["for"], Rw = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], Ow = ["disabled"], Vw = ["id"], zw = "#3b82f6", Nw = "#aabbcc", jw = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", Ww = /* @__PURE__ */ J({
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
      const y = f.trim(), x = /^#?([0-9a-fA-F]{6})$/.exec(y);
      if (x) return `#${x[1].toLowerCase()}`;
      const m = /^#?([0-9a-fA-F]{3})$/.exec(y);
      if (m) {
        const [g, _, w] = m[1].split("");
        return `#${g}${g}${_}${_}${w}${w}`.toLowerCase();
      }
      return null;
    }
    function a(f) {
      return n(f) ?? zw;
    }
    const o = e, s = t, i = `kiut-input-color-${We()}`, l = C(() => o.id ?? i), r = C(() => `${l.value}-err`), c = C(() => a(o.modelValue)), d = oe(c.value), h = oe(!1);
    Le(c, (f) => {
      h.value || (d.value = f);
    });
    function p(f) {
      const y = f.target, x = n(y.value);
      x && s("update:modelValue", x);
    }
    function v() {
      h.value = !1;
      const f = n(d.value);
      f ? (d.value = f, s("update:modelValue", f)) : d.value = c.value;
    }
    return Le(d, (f) => {
      if (!h.value) return;
      const y = n(f);
      y && s("update:modelValue", y);
    }), (f, y) => (b(), k("div", Ew, [
      e.label ? (b(), k("label", {
        key: 0,
        for: l.value,
        class: U(L(nt))
      }, A(e.label), 11, Iw)) : V("", !0),
      u("div", {
        class: U([
          jw,
          e.invalid ? L(St) : "",
          e.disabled ? "cursor-not-allowed opacity-50" : ""
        ])
      }, [
        u("input", {
          id: l.value,
          type: "color",
          value: c.value,
          disabled: e.disabled,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          class: "h-9 w-11 shrink-0 cursor-pointer rounded-lg border border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-0.5 shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/35 disabled:cursor-not-allowed dark:border-slate-600 dark:bg-slate-800/80",
          onInput: p
        }, null, 40, Rw),
        e.showHexInput ? et((b(), k("input", {
          key: 0,
          "onUpdate:modelValue": y[0] || (y[0] = (x) => d.value = x),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: Nw,
          onFocus: y[1] || (y[1] = (x) => h.value = !0),
          onBlur: v
        }, null, 40, Ow)), [
          [Ut, d.value]
        ]) : V("", !0)
      ], 2),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: r.value,
        class: U(L(yt)),
        role: "alert"
      }, A(e.errorText), 11, Vw)) : V("", !0)
    ]));
  }
});
function tl(e, t) {
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
const Hw = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], Yw = {
  key: 0,
  class: "sticky top-0 z-10 border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-2 dark:border-[color:var(--kiut-border-light)]"
}, Kw = ["placeholder", "aria-label"], Uw = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, qw = ["aria-selected", "onClick", "onMouseenter"], Xw = {
  key: 0,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, Gw = { class: "min-w-0 flex-1" }, nl = /* @__PURE__ */ J({
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
  setup(e, { emit: t }) {
    const n = e, a = t, o = `kiut-select-${We()}`, s = `${o}-label`, i = `${o}-btn`, l = `${o}-listbox`, r = oe(null), c = oe(null), d = oe(null), h = oe(null), p = oe(null), v = oe(!1), f = oe(0), y = oe(""), x = oe({});
    function m() {
      const z = c.value;
      if (!z) return;
      const K = z.getBoundingClientRect();
      x.value = {
        top: `${K.bottom - 3}px`,
        left: `${K.left}px`,
        width: `${K.width}px`
      };
    }
    const g = C(() => n.options.filter((z) => !z.disabled)), _ = C(() => {
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
      const X = $(z), le = f.value === K;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        X ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !X && le ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function F() {
      f.value = Math.max(
        0,
        _.value.findIndex((z) => z.value === n.modelValue)
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
      m(), y.value = "", F(), Ve(() => T());
    }
    function E() {
      v.value = !1, y.value = "";
    }
    function I(z) {
      a("update:modelValue", z.value), E();
    }
    function N() {
      if (!n.disabled) {
        if (v.value) {
          E();
          return;
        }
        v.value = !0, B();
      }
    }
    function Y(z) {
      z.stopPropagation(), !n.disabled && N();
    }
    function j(z) {
      if (!v.value) return;
      const K = z.target, X = r.value, le = d.value;
      X && !X.contains(K) && (!le || !le.contains(K)) && E();
    }
    function Q(z) {
      n.disabled || (z.key === "ArrowDown" || z.key === "Enter" || z.key === " ") && (z.preventDefault(), v.value || (v.value = !0, B()));
    }
    function ee(z) {
      const K = _.value;
      if (z.key === "Escape") {
        z.preventDefault(), E();
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
        X && I(X);
      }
    }
    function ce(z) {
      const K = _.value;
      if (z.key === "Escape") {
        z.preventDefault(), E();
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
          X && I(X);
        }
      }
    }
    return Le(y, () => {
      f.value = 0;
    }), tt(() => {
      document.addEventListener("click", j);
    }), ht(() => {
      document.removeEventListener("click", j);
    }), (z, K) => (b(), k("div", {
      ref_key: "rootRef",
      ref: r,
      class: "relative font-sans"
    }, [
      e.label ? (b(), k("label", {
        key: 0,
        id: s,
        class: U(L(nt))
      }, A(e.label), 3)) : V("", !0),
      u("button", {
        ref_key: "buttonRef",
        ref: c,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: U([
          L(dt),
          "flex items-center justify-between gap-2 text-left",
          v.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": v.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : w.value,
        onClick: Y,
        onKeydown: Q
      }, [
        u("span", {
          class: U([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, A(D.value), 3),
        R(L(Ni), {
          class: U(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", v.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, Hw),
      (b(), q(ja, { to: "body" }, [
        et(u("div", {
          ref_key: "panelRef",
          ref: d,
          style: ye(x.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          e.searchable ? (b(), k("div", Yw, [
            et(u("input", {
              ref_key: "searchInputRef",
              ref: p,
              "onUpdate:modelValue": K[0] || (K[0] = (X) => y.value = X),
              type: "search",
              class: U([L(dt), "min-h-0 py-1.5 text-sm"]),
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              onClick: K[1] || (K[1] = ot(() => {
              }, ["stop"])),
              onKeydown: ot(ee, ["stop"])
            }, null, 42, Kw), [
              [Ut, y.value]
            ])
          ])) : V("", !0),
          u("ul", {
            id: l,
            ref_key: "listRef",
            ref: h,
            role: "listbox",
            tabindex: "-1",
            class: "py-1",
            onKeydown: ot(ce, ["stop"])
          }, [
            _.value.length === 0 ? (b(), k("li", Uw, A(e.noResultsText), 1)) : V("", !0),
            (b(!0), k(Z, null, ie(_.value, (X, le) => (b(), k("li", {
              key: S(X),
              role: "option",
              "aria-selected": $(X),
              class: U(M(X, le)),
              onClick: ot((se) => I(X), ["stop"]),
              onMouseenter: (se) => f.value = le
            }, [
              e.showOptionCheck ? (b(), k("span", Xw, [
                $(X) ? (b(), q(L(tl), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : V("", !0)
              ])) : V("", !0),
              u("span", Gw, A(X.label), 1)
            ], 42, qw))), 128))
          ], 544)
        ], 4), [
          [on, v.value]
        ])
      ]))
    ], 512));
  }
}), Zw = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], Qw = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, Jw = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, e5 = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, t5 = { class: "truncate" }, n5 = ["aria-selected", "onClick", "onMouseenter"], a5 = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, o5 = { class: "min-w-0 flex-1" }, s5 = /* @__PURE__ */ J({
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
    const n = e, a = t, o = `kiut-multiselect-${We()}`, s = `${o}-label`, i = `${o}-btn`, l = `${o}-listbox`, r = oe(null), c = oe(null), d = oe(!1), h = oe(0), p = C(() => n.options.filter((T) => !T.disabled)), v = C(() => new Set(n.modelValue ?? [])), f = C(
      () => n.options.filter((T) => v.value.has(T.value))
    ), y = C(() => {
      const T = n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opciones", B = f.value.length;
      return B === 0 ? T : `${T}, ${B} seleccionada${B === 1 ? "" : "s"}`;
    });
    function x(T) {
      return `${String(T.value)}-${T.label}`;
    }
    function m(T) {
      return v.value.has(T.value);
    }
    function g(T, B) {
      const E = m(T), I = h.value === B;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        E ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !E && I ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function _(T) {
      const B = [...n.modelValue ?? []], E = B.indexOf(T.value);
      E >= 0 ? B.splice(E, 1) : B.push(T.value), a("update:modelValue", B);
    }
    function w() {
      const T = p.value;
      if (T.length === 0) {
        h.value = 0;
        return;
      }
      const B = v.value, E = T.findIndex((I) => B.has(I.value));
      h.value = E >= 0 ? E : 0;
    }
    function D() {
      n.disabled || (d.value = !d.value);
    }
    function S(T) {
      T.stopPropagation(), !n.disabled && (D(), d.value && (w(), Ve(() => c.value?.focus())));
    }
    function $(T) {
      if (!d.value) return;
      const B = r.value;
      B && !B.contains(T.target) && (d.value = !1);
    }
    function M(T) {
      n.disabled || (T.key === "ArrowDown" || T.key === "Enter" || T.key === " ") && (T.preventDefault(), d.value || (d.value = !0, w(), Ve(() => c.value?.focus())));
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
          const E = B[h.value];
          E && _(E);
        }
      }
    }
    return tt(() => {
      document.addEventListener("click", $);
    }), ht(() => {
      document.removeEventListener("click", $);
    }), (T, B) => (b(), k("div", {
      ref_key: "rootRef",
      ref: r,
      class: "relative font-sans"
    }, [
      e.label ? (b(), k("label", {
        key: 0,
        id: s,
        class: U(L(nt))
      }, A(e.label), 3)) : V("", !0),
      u("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: U([
          L(dt),
          "flex items-start justify-between gap-2 text-left",
          d.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": d.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : y.value,
        onClick: S,
        onKeydown: M
      }, [
        u("div", Qw, [
          f.value.length === 0 ? (b(), k("span", Jw, A(e.placeholder), 1)) : (b(), k("div", e5, [
            (b(!0), k(Z, null, ie(f.value, (E) => (b(), k("span", {
              key: x(E),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              u("span", t5, A(E.label), 1)
            ]))), 128))
          ]))
        ]),
        R(L(Ni), {
          class: U(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", d.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, Zw),
      et(u("ul", {
        id: l,
        ref_key: "listRef",
        ref: c,
        role: "listbox",
        tabindex: "-1",
        "aria-multiselectable": "true",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: ot(F, ["stop"])
      }, [
        (b(!0), k(Z, null, ie(p.value, (E, I) => (b(), k("li", {
          key: x(E),
          role: "option",
          "aria-selected": m(E),
          class: U(g(E, I)),
          onClick: ot((N) => _(E), ["stop"]),
          onMouseenter: (N) => h.value = I
        }, [
          u("span", a5, [
            m(E) ? (b(), q(L(tl), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : V("", !0)
          ]),
          u("span", o5, A(E.label), 1)
        ], 42, n5))), 128))
      ], 544), [
        [on, d.value]
      ])
    ], 512));
  }
}), i5 = ["id", "aria-checked", "aria-disabled", "disabled", "onKeydown"], l5 = { class: "sr-only" }, r5 = /* @__PURE__ */ J({
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
    return (s, i) => (b(), k("button", {
      id: e.id,
      type: "button",
      role: "switch",
      "aria-checked": e.modelValue,
      "aria-disabled": e.disabled ? "true" : void 0,
      disabled: e.disabled,
      class: U([
        "relative inline-flex h-8 w-[3.75rem] shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-sm transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        e.modelValue ? "bg-[color:var(--kiut-primary)]" : "bg-[#DEDEE3] dark:bg-slate-600"
      ]),
      onClick: o,
      onKeydown: [
        $n(ot(o, ["prevent", "stop"]), ["space"]),
        $n(ot(o, ["prevent"]), ["enter"])
      ]
    }, [
      u("span", {
        class: U(["pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", e.modelValue ? "translate-x-7" : "translate-x-0"]),
        "aria-hidden": "true"
      }, null, 2),
      u("span", l5, A(e.ariaLabel), 1)
    ], 42, i5));
  }
}), c5 = { class: "font-sans" }, d5 = ["for"], u5 = { class: "flex gap-2" }, h5 = { class: "w-[7.5rem] shrink-0" }, f5 = { class: "min-w-0 flex-1" }, g5 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], p5 = ["id"], m5 = /* @__PURE__ */ J({
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
    const n = e, a = t, o = `kiut-phone-${We()}`, s = C(() => n.id ?? `${o}-num`), i = C(() => `${s.value}-err`), l = C({
      get: () => n.modelValue.prefix,
      set: (c) => a("update:modelValue", { ...n.modelValue, prefix: c })
    }), r = C({
      get: () => n.modelValue.number,
      set: (c) => a("update:modelValue", { ...n.modelValue, number: c })
    });
    return (c, d) => (b(), k("div", c5, [
      e.label ? (b(), k("label", {
        key: 0,
        for: s.value,
        class: U(L(nt))
      }, A(e.label), 11, d5)) : V("", !0),
      u("div", u5, [
        u("div", h5, [
          R(nl, {
            modelValue: l.value,
            "onUpdate:modelValue": d[0] || (d[0] = (h) => l.value = h),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        u("div", f5, [
          et(u("input", {
            id: s.value,
            "onUpdate:modelValue": d[1] || (d[1] = (h) => r.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: U([L(dt), e.invalid ? L(St) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, g5), [
            [Ut, r.value]
          ])
        ])
      ]),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: U(L(yt)),
        role: "alert"
      }, A(e.errorText), 11, p5)) : V("", !0)
    ]));
  }
}), b5 = ["role", "aria-label"], v5 = { class: "flex flex-wrap gap-2" }, y5 = ["aria-checked", "role", "onClick"], _5 = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, x5 = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, k5 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, w5 = /* @__PURE__ */ J({
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
    const n = e, a = t, o = C(() => n.multiple ? Array.isArray(n.modelValue) ? n.modelValue : [] : []);
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
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      u("div", v5, [
        (b(!0), k(Z, null, ie(e.items, (d) => (b(), k("button", {
          key: d.value,
          type: "button",
          class: U(i(d)),
          "aria-checked": s(d),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => l(d)
        }, [
          u("span", _5, [
            s(d) ? (b(), k("span", x5)) : V("", !0)
          ]),
          d.dotColor ? (b(), k("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: ye({ backgroundColor: d.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : V("", !0),
          u("span", k5, A(d.label), 1)
        ], 10, y5))), 128))
      ])
    ], 8, b5));
  }
}), C5 = ["aria-label"], $5 = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], M5 = { class: "truncate px-3 py-2 text-sm font-medium" }, S5 = /* @__PURE__ */ J({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = `kiut-seg-${We()}`, s = (y) => `${o}-seg-${y}`, i = oe([]);
    function l(y, x) {
      y instanceof HTMLButtonElement ? i.value[x] = y : i.value[x] = null;
    }
    function r(y) {
      return y.value === n.modelValue;
    }
    function c(y) {
      const x = r(y), m = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return y.disabled ? `${m} cursor-not-allowed opacity-40` : x ? `${m} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${m} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function d(y) {
      y.disabled || y.value !== n.modelValue && a("update:modelValue", y.value);
    }
    function h(y, x, m) {
      d(y), Ve(() => i.value[x]?.focus());
    }
    const p = C(
      () => n.items.map((y, x) => y.disabled ? -1 : x).filter((y) => y >= 0)
    );
    function v(y, x) {
      const m = n.items.length;
      if (m === 0) return 0;
      let g = y;
      for (let _ = 0; _ < m; _++)
        if (g = (g + x + m) % m, !n.items[g]?.disabled) return g;
      return y;
    }
    function f(y, x) {
      if (y.key === "ArrowRight" || y.key === "ArrowDown") {
        y.preventDefault();
        const m = v(x, 1), g = n.items[m];
        g && d(g), Ve(() => i.value[m]?.focus());
      } else if (y.key === "ArrowLeft" || y.key === "ArrowUp") {
        y.preventDefault();
        const m = v(x, -1), g = n.items[m];
        g && d(g), Ve(() => i.value[m]?.focus());
      } else if (y.key === "Home") {
        y.preventDefault();
        const m = p.value[0];
        if (m !== void 0) {
          const g = n.items[m];
          g && d(g), Ve(() => i.value[m]?.focus());
        }
      } else if (y.key === "End") {
        y.preventDefault();
        const m = p.value[p.value.length - 1];
        if (m !== void 0) {
          const g = n.items[m];
          g && d(g), Ve(() => i.value[m]?.focus());
        }
      }
    }
    return (y, x) => (b(), k("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (b(!0), k(Z, null, ie(e.items, (m, g) => (b(), k("button", {
        id: s(m.value),
        key: m.value,
        ref_for: !0,
        ref: (_) => l(_, g),
        type: "button",
        role: "tab",
        "aria-selected": r(m),
        "aria-disabled": m.disabled === !0,
        tabindex: r(m) ? 0 : -1,
        class: U(c(m)),
        onClick: (_) => h(m, g),
        onKeydown: (_) => f(_, g)
      }, [
        u("span", M5, A(m.label), 1)
      ], 42, $5))), 128))
    ], 8, C5));
  }
}), D5 = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  es: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
}, A5 = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
}, T5 = {
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
}, B5 = {
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
}, L5 = [
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
function F5(e = "en") {
  return D5[e];
}
function al(e = "en") {
  return L5.map((t) => ({ id: t, label: B5[e][t] }));
}
function P5(e = "en") {
  return "Presets";
}
al("es");
function Ke(e) {
  const [t, n, a] = e.split("-").map(Number);
  return new Date(t, n - 1, a);
}
function Qe(e) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), a = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${a}`;
}
function Pe(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function $t(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function Pn(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function E5(e, t) {
  const n = new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
  return Pe(n);
}
function bn(e, t) {
  return E5(e, -t);
}
function I5(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function ol(e, t = /* @__PURE__ */ new Date()) {
  const n = Pe(t);
  switch (e) {
    case "today":
      return { start: n, end: n };
    case "yesterday": {
      const a = bn(n, 1);
      return { start: a, end: a };
    }
    case "last7":
      return { start: bn(n, 6), end: n };
    case "last14":
      return { start: bn(n, 13), end: n };
    case "last30":
      return { start: bn(n, 29), end: n };
    case "last90":
      return { start: bn(n, 89), end: n };
    case "thisMonth":
      return { start: $t(n), end: n };
    case "lastMonth": {
      const a = $t(Pn(n, -1));
      return { start: a, end: I5(a) };
    }
    case "yearToDate":
      return { start: new Date(n.getFullYear(), 0, 1), end: n };
  }
}
function sl(e, t, n) {
  let a = Pe(e.start), o = Pe(e.end);
  if (t) {
    const s = Pe(Ke(t));
    Rt(a, s) && (a = s), Rt(o, s) && (o = s);
  }
  if (n) {
    const s = Pe(Ke(n));
    Ba(a, s) && (a = s), Ba(o, s) && (o = s);
  }
  return Ba(a, o) ? { start: o, end: a } : { start: a, end: o };
}
function R5(e, t, n = /* @__PURE__ */ new Date(), a, o) {
  if (!e.start || !e.end) return !1;
  const s = sl(ol(t, n), a, o);
  return Qe(s.start) === e.start && Qe(s.end) === e.end;
}
function Rn(e, t) {
  const n = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), a = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return n < a ? -1 : n > a ? 1 : 0;
}
function Pt(e, t) {
  return Rn(e, t) === 0;
}
function Rt(e, t) {
  return Rn(e, t) < 0;
}
function Ba(e, t) {
  return Rn(e, t) > 0;
}
function il(e, t) {
  return Rn(e, t) >= 0;
}
function ll(e, t) {
  return Rn(e, t) <= 0;
}
function rl(e) {
  const t = e.getFullYear(), n = e.getMonth(), a = new Date(t, n, 1), o = new Date(a);
  o.setDate(a.getDate() - a.getDay());
  const s = [], i = new Date(o);
  for (let l = 0; l < 42; l++)
    s.push(new Date(i)), i.setDate(i.getDate() + 1);
  return s;
}
function ca(e, t = "en") {
  return `${A5[t][e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function Et(e, t = "en") {
  return `${T5[t][e.getMonth()]} ${e.getFullYear()}`;
}
const O5 = ["aria-expanded", "aria-labelledby", "aria-label"], V5 = ["onKeydown"], z5 = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, N5 = { class: "mb-4 flex items-center justify-between gap-2" }, j5 = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, W5 = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, H5 = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, Y5 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, K5 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, U5 = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, q5 = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, X5 = { class: "grid grid-cols-7 gap-y-2 mt-2" }, G5 = ["disabled", "onClick"], Z5 = "rounded-lg text-[#61616b]", Q5 = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", J5 = "opacity-30", eC = "bg-[#6b35e9] font-medium text-white", tC = "bg-[#895af6] font-semibold text-white", nC = /* @__PURE__ */ J({
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
    const n = e, a = t, s = `${`kiut-drp-${We()}`}-lbl`, i = oe(null), l = oe(null), r = oe(!1), c = oe(null), d = oe($t(/* @__PURE__ */ new Date())), h = C(() => !!(n.modelValue.start && n.modelValue.end)), p = C(() => {
      const B = $t(d.value);
      return [B, Pn(B, 1)];
    }), v = C(() => n.ariaLabel ?? n.placeholder), f = C(() => {
      const B = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return n.panelAlign === "end" ? `right-0 left-auto ${B}` : `left-0 right-auto ${B}`;
    }), y = C(
      () => `${Et(p.value[0])} – ${Et(p.value[1])}`
    ), x = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], m = C(() => {
      if (!n.modelValue.start || !n.modelValue.end) return n.placeholder;
      const B = Ke(n.modelValue.start), E = Ke(n.modelValue.end);
      return `${ca(B)} – ${ca(E)}`;
    });
    function g(B, E) {
      return B.getMonth() === E.getMonth() && B.getFullYear() === E.getFullYear();
    }
    function _(B) {
      const E = Pe(B);
      if (n.minDate) {
        const I = Pe(Ke(n.minDate));
        if (Rt(E, I)) return !0;
      }
      if (n.maxDate) {
        const I = Pe(Ke(n.maxDate));
        if (Rt(I, E)) return !0;
      }
      return !1;
    }
    function w(B, E, I) {
      const N = Pt(B, E), Y = Pt(B, I);
      if (N && Y) return "rounded-lg";
      const j = N || B.getDay() === 0, Q = Y || B.getDay() === 6;
      return j && Q ? "rounded-lg" : j ? "rounded-l-lg" : Q ? "rounded-r-lg" : "rounded-none";
    }
    function D(B, E) {
      const I = g(E, B), N = _(E), Y = n.modelValue.start ? Pe(Ke(n.modelValue.start)) : null, j = n.modelValue.end ? Pe(Ke(n.modelValue.end)) : null, Q = Pe(E);
      if (N)
        return Z5;
      let ee = Q5;
      if (Y && j && il(Q, Y) && ll(Q, j)) {
        const z = Pt(Q, Y), K = Pt(Q, j);
        ee = `${w(Q, Y, j)} ${z || K ? tC : eC}`;
      }
      return I || (ee = `${ee} ${J5}`), ee;
    }
    function S(B) {
      if (_(B)) return;
      const E = Pe(B);
      if (!c.value) {
        c.value = new Date(E), a("update:modelValue", { start: Qe(E), end: Qe(E) });
        return;
      }
      let N = Pe(c.value), Y = new Date(E);
      Rt(Y, N) && ([N, Y] = [Y, N]), a("update:modelValue", { start: Qe(N), end: Qe(Y) }), c.value = null, r.value = !1;
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
            d.value = $t(Ke(n.modelValue.start));
          } catch {
          }
        Ve(() => l.value?.focus());
      }
    }
    function T(B) {
      if (!r.value) return;
      const E = i.value;
      E && !E.contains(B.target) && (r.value = !1);
    }
    return Le(r, (B) => {
      B && (c.value = null);
    }), tt(() => {
      document.addEventListener("click", T);
    }), ht(() => {
      document.removeEventListener("click", T);
    }), (B, E) => (b(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (b(), k("label", {
        key: 0,
        id: s,
        class: U(L(nt))
      }, A(e.label), 3)) : V("", !0),
      u("button", {
        type: "button",
        class: U([
          L(dt),
          "flex w-full items-center gap-2 text-left",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : v.value,
        onFocus: F,
        onClick: F
      }, [
        R(L(ho), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: U([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, A(m.value), 3)
      ], 42, O5),
      et(u("div", {
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
        onKeydown: $n(ot(M, ["stop"]), ["escape"])
      }, [
        u("div", z5, [
          u("div", N5, [
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes anterior",
              onClick: E[0] || (E[0] = (I) => $(-1))
            }, [
              R(L(ji), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ]),
            u("div", j5, [
              u("span", W5, A(y.value), 1),
              u("div", H5, [
                u("span", Y5, A(L(Et)(p.value[0])), 1),
                u("span", K5, A(L(Et)(p.value[1])), 1)
              ])
            ]),
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes siguiente",
              onClick: E[1] || (E[1] = (I) => $(1))
            }, [
              R(L(Wi), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ])
          ]),
          u("div", U5, [
            (b(!0), k(Z, null, ie(p.value, (I) => (b(), k("div", {
              key: `${I.getFullYear()}-${I.getMonth()}`,
              class: "w-full max-w-[252px] shrink-0"
            }, [
              u("div", q5, [
                (b(), k(Z, null, ie(x, (N) => u("span", { key: N }, A(N), 1)), 64))
              ]),
              u("div", X5, [
                (b(!0), k(Z, null, ie(L(rl)(I), (N) => (b(), k("button", {
                  key: L(Qe)(N),
                  type: "button",
                  disabled: _(N),
                  class: U(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", D(I, N)]),
                  onClick: (Y) => S(N)
                }, A(N.getDate()), 11, G5))), 128))
              ])
            ]))), 128))
          ])
        ])
      ], 42, V5), [
        [on, r.value]
      ])
    ], 512));
  }
}), aC = ["aria-expanded", "aria-labelledby", "aria-label"], oC = ["aria-label", "onKeydown"], sC = { class: "flex flex-col sm:flex-row" }, iC = ["aria-label"], lC = { class: "px-2 pt-1 pb-1.5 text-[10px] font-semibold uppercase dark:text-[#61616b] text-[#e3e3e8]" }, rC = { class: "flex flex-col gap-0.5" }, cC = ["onClick"], dC = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, uC = { class: "mb-4 flex items-center justify-between gap-2" }, hC = ["aria-label"], fC = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, gC = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, pC = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, mC = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, bC = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, vC = ["aria-label"], yC = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, _C = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, xC = { class: "grid grid-cols-7 gap-y-2 mt-2" }, kC = ["disabled", "onClick"], wC = "rounded-lg text-[#61616b]", CC = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", $C = "opacity-30", MC = "bg-[#6b35e9] font-medium text-white", SC = "bg-[#895af6] font-semibold text-white", DC = /* @__PURE__ */ J({
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
  setup(e, { emit: t }) {
    const n = e, a = t, s = `${`kiut-dpp-${We()}`}-lbl`, i = oe(null), l = oe(null), r = oe(!1), c = oe(null), d = oe($t(/* @__PURE__ */ new Date())), h = C(() => !!(n.modelValue.start && n.modelValue.end)), p = C(() => {
      const z = $t(d.value);
      return [z, Pn(z, 1)];
    }), v = C(
      () => n.placeholder ?? (n.locale === "es" ? "Seleccionar fechas" : "Select dates")
    ), f = C(() => n.ariaLabel ?? v.value), y = C(() => al(n.locale)), x = C(() => P5(n.locale)), m = C(() => F5(n.locale)), g = C(
      () => n.locale === "es" ? "Preajustes de rango" : "Range presets"
    ), _ = C(
      () => n.locale === "es" ? "Mes anterior" : "Previous month"
    ), w = C(
      () => n.locale === "es" ? "Mes siguiente" : "Next month"
    ), D = C(
      () => n.locale === "es" ? "Calendario de rango con preajustes" : "Date range calendar with presets"
    ), S = C(() => {
      const z = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return n.panelAlign === "end" ? `right-0 left-auto ${z}` : `left-0 right-auto ${z}`;
    }), $ = C(
      () => `${Et(p.value[0], n.locale)} – ${Et(p.value[1], n.locale)}`
    ), M = C(() => {
      if (!n.modelValue.start || !n.modelValue.end) return v.value;
      const z = Ke(n.modelValue.start), K = Ke(n.modelValue.end);
      return `${ca(z, n.locale)} – ${ca(K, n.locale)}`;
    });
    function F(z, K) {
      return z.getMonth() === K.getMonth() && z.getFullYear() === K.getFullYear();
    }
    function T(z) {
      const K = Pe(z);
      if (n.minDate) {
        const X = Pe(Ke(n.minDate));
        if (Rt(K, X)) return !0;
      }
      if (n.maxDate) {
        const X = Pe(Ke(n.maxDate));
        if (Rt(X, K)) return !0;
      }
      return !1;
    }
    function B(z, K, X) {
      const le = Pt(z, K), se = Pt(z, X);
      if (le && se) return "rounded-lg";
      const Ae = le || z.getDay() === 0, xe = se || z.getDay() === 6;
      return Ae && xe ? "rounded-lg" : Ae ? "rounded-l-lg" : xe ? "rounded-r-lg" : "rounded-none";
    }
    function E(z) {
      const K = R5(
        n.modelValue,
        z,
        /* @__PURE__ */ new Date(),
        n.minDate,
        n.maxDate
      ), X = "text-[#61616b] hover:bg-[#efeff0b3] dark:text-[#e3e3e8] dark:hover:bg-[#23232fb3]";
      return K ? `${X} font-medium` : X;
    }
    function I(z, K) {
      const X = F(K, z), le = T(K), se = n.modelValue.start ? Pe(Ke(n.modelValue.start)) : null, Ae = n.modelValue.end ? Pe(Ke(n.modelValue.end)) : null, xe = Pe(K);
      if (le)
        return wC;
      let W = CC;
      if (se && Ae && il(xe, se) && ll(xe, Ae)) {
        const ne = Pt(xe, se), de = Pt(xe, Ae);
        W = `${B(xe, se, Ae)} ${ne || de ? SC : MC}`;
      }
      return X || (W = `${W} ${$C}`), W;
    }
    function N(z) {
      const K = sl(ol(z), n.minDate, n.maxDate);
      a("update:modelValue", {
        start: Qe(K.start),
        end: Qe(K.end)
      }), d.value = $t(K.start), c.value = null, r.value = !1;
    }
    function Y(z) {
      if (T(z)) return;
      const K = Pe(z);
      if (!c.value) {
        c.value = new Date(K), a("update:modelValue", { start: Qe(K), end: Qe(K) });
        return;
      }
      let le = Pe(c.value), se = new Date(K);
      Rt(se, le) && ([le, se] = [se, le]), a("update:modelValue", { start: Qe(le), end: Qe(se) }), c.value = null, r.value = !1;
    }
    function j(z) {
      d.value = Pn(d.value, z);
    }
    function Q() {
      r.value = !1;
    }
    function ee(z) {
      if (z.stopPropagation(), r.value) {
        r.value = !1;
        return;
      }
      if (r.value = !0, c.value = null, n.modelValue.start)
        try {
          d.value = $t(Ke(n.modelValue.start));
        } catch {
        }
      Ve(() => l.value?.focus());
    }
    function ce(z) {
      if (!r.value) return;
      const K = i.value;
      K && !K.contains(z.target) && (r.value = !1);
    }
    return Le(r, (z) => {
      z && (c.value = null);
    }), tt(() => {
      document.addEventListener("click", ce);
    }), ht(() => {
      document.removeEventListener("click", ce);
    }), (z, K) => (b(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (b(), k("label", {
        key: 0,
        id: s,
        class: U(L(nt))
      }, A(e.label), 3)) : V("", !0),
      u("button", {
        type: "button",
        class: U([
          L(dt),
          "group flex w-full items-center gap-2 text-left hover:bg-[#6b35e9] hover:text-white",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : f.value,
        onClick: ee
      }, [
        R(L(ho), {
          class: "h-5 w-5 shrink-0 text-gray-500 transition-colors group-hover:text-white dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: U([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] group-hover:text-white dark:text-slate-500"
          ])
        }, A(M.value), 3)
      ], 10, aC),
      et(u("div", {
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
        onKeydown: $n(ot(Q, ["stop"]), ["escape"])
      }, [
        u("div", sC, [
          u("aside", {
            class: "w-full shrink-0 border-b border-gray-200 p-3 sm:w-[176px] sm:border-r sm:border-b-0 dark:border-[color:var(--kiut-border-light)]",
            "aria-label": g.value
          }, [
            u("p", lC, A(x.value), 1),
            u("ul", rC, [
              (b(!0), k(Z, null, ie(y.value, (X) => (b(), k("li", {
                key: X.id
              }, [
                u("button", {
                  type: "button",
                  class: U(["w-full rounded-lg px-2 py-1.5 text-left text-xs transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", E(X.id)]),
                  onClick: (le) => N(X.id)
                }, A(X.label), 11, cC)
              ]))), 128))
            ])
          ], 8, iC),
          u("div", dC, [
            u("div", uC, [
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": _.value,
                onClick: K[0] || (K[0] = (X) => j(-1))
              }, [
                R(L(ji), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, hC),
              u("div", fC, [
                u("span", gC, A($.value), 1),
                u("div", pC, [
                  u("span", mC, A(L(Et)(p.value[0], e.locale)), 1),
                  u("span", bC, A(L(Et)(p.value[1], e.locale)), 1)
                ])
              ]),
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": w.value,
                onClick: K[1] || (K[1] = (X) => j(1))
              }, [
                R(L(Wi), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, vC)
            ]),
            u("div", yC, [
              (b(!0), k(Z, null, ie(p.value, (X) => (b(), k("div", {
                key: `${X.getFullYear()}-${X.getMonth()}`,
                class: "w-full max-w-[252px] shrink-0"
              }, [
                u("div", _C, [
                  (b(!0), k(Z, null, ie(m.value, (le) => (b(), k("span", { key: le }, A(le), 1))), 128))
                ]),
                u("div", xC, [
                  (b(!0), k(Z, null, ie(L(rl)(X), (le) => (b(), k("button", {
                    key: L(Qe)(le),
                    type: "button",
                    disabled: T(le),
                    class: U(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", I(X, le)]),
                    onClick: (se) => Y(le)
                  }, A(le.getDate()), 11, kC))), 128))
                ])
              ]))), 128))
            ])
          ])
        ])
      ], 42, oC), [
        [on, r.value]
      ])
    ], 512));
  }
}), AC = {
  key: 0,
  class: "group relative inline-flex shrink-0"
}, TC = ["type", "disabled", "aria-label"], BC = {
  key: 1,
  class: "min-w-0 truncate"
}, LC = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, FC = ["type", "disabled", "aria-label"], PC = {
  key: 1,
  class: "min-w-0 truncate"
}, ta = /* @__PURE__ */ J({
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
    const t = e, n = da(), a = C(() => !!t.tooltip?.trim()), o = C(() => t.variant === "action"), s = C(() => !o.value), i = C(() => {
      const d = n["aria-label"];
      if (typeof d == "string" && d.length > 0) return d;
      if (o.value && t.tooltip?.trim()) return t.tooltip.trim();
    }), l = C(() => {
      const d = n.type;
      return d === "submit" || d === "reset" || d === "button" ? d : "button";
    }), r = C(() => {
      const { class: d, type: h, "aria-label": p, ...v } = n;
      return v;
    }), c = C(() => t.variant === "primary" ? [
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
    return (d, h) => a.value ? (b(), k("span", AC, [
      u("button", sn({
        type: l.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [c.value, L(n).class]],
        disabled: e.disabled,
        "aria-label": i.value
      }, r.value), [
        d.$slots.icon ? (b(), k("span", {
          key: 0,
          class: U(["inline-flex shrink-0", o.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          Ce(d.$slots, "icon")
        ], 2)) : V("", !0),
        s.value ? (b(), k("span", BC, [
          Ce(d.$slots, "default")
        ])) : V("", !0)
      ], 16, TC),
      u("span", LC, A(e.tooltip), 1)
    ])) : (b(), k("button", sn({
      key: 1,
      type: l.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [c.value, L(n).class]],
      disabled: e.disabled,
      "aria-label": i.value
    }, r.value), [
      d.$slots.icon ? (b(), k("span", {
        key: 0,
        class: U(["inline-flex shrink-0", o.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        Ce(d.$slots, "icon")
      ], 2)) : V("", !0),
      s.value ? (b(), k("span", PC, [
        Ce(d.$slots, "default")
      ])) : V("", !0)
    ], 16, FC));
  }
}), EC = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, IC = { class: "min-w-0 flex-1 space-y-1" }, RC = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, OC = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, VC = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, zC = /* @__PURE__ */ J({
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
    const n = e, a = t, s = `${`kiut-modal-${We()}`}-title`, i = oe(null);
    function l() {
      a("cancel"), a("update:modelValue", !1);
    }
    function r() {
      a("confirm");
    }
    function c(d) {
      n.modelValue && d.key === "Escape" && (d.preventDefault(), l());
    }
    return Le(
      () => n.modelValue,
      (d) => {
        d && requestAnimationFrame(() => {
          i.value?.focus({ preventScroll: !0 });
        });
      }
    ), tt(() => {
      document.addEventListener("keydown", c);
    }), ht(() => {
      document.removeEventListener("keydown", c);
    }), (d, h) => (b(), q(ja, { to: "body" }, [
      R(_e, { name: "kiut-modal" }, {
        default: P(() => [
          e.modelValue ? (b(), k("div", EC, [
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
              onClick: h[0] || (h[0] = ot(() => {
              }, ["stop"]))
            }, [
              u("header", {
                class: U(["flex shrink-0 justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.02]", e.subtitle ? "items-start" : "items-center"])
              }, [
                u("div", IC, [
                  u("h2", {
                    id: s,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, A(e.title), 1),
                  e.subtitle ? (b(), k("p", RC, A(e.subtitle), 1)) : V("", !0)
                ]),
                R(ta, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  onClick: l
                }, {
                  icon: P(() => [
                    R(L(Hi), { class: "h-5 w-5" })
                  ]),
                  _: 1
                })
              ], 2),
              u("div", OC, [
                Ce(d.$slots, "default", {}, void 0, !0)
              ]),
              u("footer", VC, [
                R(ta, {
                  variant: "secondary",
                  type: "button",
                  onClick: l
                }, {
                  default: P(() => [
                    ke(A(e.cancelLabel), 1)
                  ]),
                  _: 1
                }),
                R(ta, {
                  variant: "primary",
                  type: "button",
                  onClick: r
                }, {
                  default: P(() => [
                    ke(A(e.confirmLabel), 1)
                  ]),
                  _: 1
                })
              ])
            ], 512)
          ])) : V("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), NC = /* @__PURE__ */ re(zC, [["__scopeId", "data-v-4ed7bb14"]]), jC = { class: "text-left font-['Inter',system-ui,sans-serif]" }, WC = {
  key: 0,
  class: ""
}, HC = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, YC = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, KC = {
  key: 1,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, UC = /* @__PURE__ */ J({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = Na(), n = C(() => {
      const a = !!t.filters, o = !!t.actions;
      return a && o ? "justify-between" : o ? "justify-end" : "";
    });
    return (a, o) => (b(), k("section", jC, [
      a.$slots.description || a.$slots.filters || a.$slots.actions ? (b(), k("header", WC, [
        a.$slots.description ? (b(), k("div", HC, [
          Ce(a.$slots, "description")
        ])) : V("", !0),
        a.$slots.filters || a.$slots.actions ? (b(), k("div", {
          key: 1,
          class: U(["flex flex-wrap gap-2 items-center", n.value])
        }, [
          a.$slots.filters ? (b(), k("div", YC, [
            Ce(a.$slots, "filters")
          ])) : V("", !0),
          a.$slots.actions ? (b(), k("div", KC, [
            Ce(a.$slots, "actions")
          ])) : V("", !0)
        ], 2)) : V("", !0)
      ])) : V("", !0),
      a.$slots.content || a.$slots.default ? (b(), k("div", {
        key: 1,
        class: U({
          "mt-6": a.$slots.description || a.$slots.filters || a.$slots.actions
        })
      }, [
        Ce(a.$slots, "content", {}, () => [
          Ce(a.$slots, "default")
        ])
      ], 2)) : V("", !0)
    ]));
  }
}), qC = { class: "flex flex-1 min-h-0" }, XC = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, GC = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, ZC = ["aria-current", "data-has-active", "title", "onClick"], QC = {
  key: 1,
  class: "footer-section shrink-0 border-t [background-color:var(--kiut-lateral-bg)]"
}, JC = { class: "px-4 py-4 shrink-0" }, e$ = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, t$ = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, n$ = ["data-nav-id", "aria-current", "onClick"], a$ = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, o$ = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, s$ = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, i$ = ["data-nav-id", "aria-current", "onClick"], l$ = { class: "truncate text-[15px]" }, r$ = ["aria-current", "data-has-active", "onClick"], c$ = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, d$ = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, u$ = /* @__PURE__ */ J({
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
    const n = oe(!1), a = e, o = t, s = da(), { class: i, ...l } = s, r = oe(!1);
    function c() {
      typeof window > "u" || (r.value = window.innerWidth < a.mobileBreakpoint);
    }
    tt(() => {
      c(), window.addEventListener("resize", c);
    }), ht(() => {
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
    function x(m, g) {
      f(m, g), y();
    }
    return (m, g) => r.value ? (b(), k("div", sn({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      R(_e, { name: "ksn-overlay" }, {
        default: P(() => [
          d.value ? (b(), k("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: y
          })) : V("", !0)
        ]),
        _: 1
      }),
      R(_e, { name: "ksn-sheet" }, {
        default: P(() => [
          d.value ? (b(), k("div", {
            key: 0,
            class: "mobile-subsections fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t max-h-[70vh] flex flex-col",
            style: ye({ paddingBottom: a.mobileBarHeight })
          }, [
            g[3] || (g[3] = u("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              u("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            u("div", a$, [
              u("p", o$, A(d.value.label), 1),
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
            u("nav", s$, [
              (b(!0), k(Z, null, ie(d.value.items, (_) => (b(), k("button", {
                key: _.id,
                type: "button",
                "data-nav-id": _.id,
                "aria-current": h(_) ? "page" : void 0,
                class: "ksn-item-btn group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]",
                onClick: (w) => x(d.value, _)
              }, [
                _.icon ? (b(), q(tn(_.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : V("", !0),
                u("span", l$, A(_.label), 1)
              ], 8, i$))), 128))
            ])
          ], 4)) : V("", !0)
        ]),
        _: 1
      }),
      u("nav", {
        class: "ksn-mobile-bar fixed bottom-0 left-0 right-0 z-50 border-t flex items-stretch justify-around overflow-hidden",
        style: ye({ height: e.mobileBarHeight }),
        "aria-label": "Sections"
      }, [
        (b(!0), k(Z, null, ie(e.sections, (_) => (b(), k("button", {
          key: _.id,
          type: "button",
          "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
          "data-has-active": p(_) ? "true" : void 0,
          class: "ksn-section-btn relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset",
          onClick: (w) => v(_)
        }, [
          e.selectedSectionId === _.id || p(_) ? (b(), k("span", c$)) : V("", !0),
          _.icon ? (b(), q(tn(_.icon), {
            key: 1,
            class: "shrink-0",
            style: ye({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : V("", !0),
          u("span", d$, A(_.label), 1)
        ], 8, r$))), 128))
      ], 4)
    ], 16)) : (b(), k("aside", sn({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      u("div", qC, [
        u("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center",
          style: ye({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: g[0] || (g[0] = (_) => n.value = !0),
          onMouseleave: g[1] || (g[1] = (_) => n.value = !1)
        }, [
          m.$slots.logo ? (b(), k("div", XC, [
            Ce(m.$slots, "logo", { expanded: n.value }, void 0, !0)
          ])) : V("", !0),
          u("nav", GC, [
            (b(!0), k(Z, null, ie(e.sections, (_) => (b(), k("button", {
              key: _.id,
              type: "button",
              "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
              "data-has-active": p(_) ? "true" : void 0,
              title: _.label,
              class: "ksn-section-btn group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
              onClick: (w) => v(_)
            }, [
              _.icon ? (b(), q(tn(_.icon), {
                key: 0,
                class: "shrink-0",
                style: ye({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : V("", !0),
              u("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: ye({ fontSize: e.primaryFontSize })
              }, A(_.label), 5)
            ], 8, ZC))), 128))
          ]),
          m.$slots.footer ? (b(), k("div", QC, [
            Ce(m.$slots, "footer", { expanded: n.value }, void 0, !0)
          ])) : V("", !0)
        ], 36),
        R(_e, { name: "ksn-sub" }, {
          default: P(() => [
            d.value ? (b(), k("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: ye({ width: e.secondaryWidth })
            }, [
              u("div", JC, [
                u("p", e$, A(d.value.label), 1)
              ]),
              u("nav", t$, [
                (b(!0), k(Z, null, ie(d.value.items, (_) => (b(), k("button", {
                  key: _.id,
                  type: "button",
                  "data-nav-id": _.id,
                  "aria-current": h(_) ? "page" : void 0,
                  class: "ksn-item-btn group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
                  onClick: (w) => f(d.value, _)
                }, [
                  _.icon ? (b(), q(tn(_.icon), {
                    key: 0,
                    style: ye({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : V("", !0),
                  u("span", {
                    class: "truncate",
                    style: ye({ fontSize: e.secondaryFontSize })
                  }, A(_.label), 5)
                ], 8, n$))), 128))
              ])
            ], 4)) : V("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), h$ = /* @__PURE__ */ re(u$, [["__scopeId", "data-v-e0ccb96c"]]), w$ = {
  install(e) {
    e.component("KiutChartBar", vt), e.component("KiutChartLine", ft), e.component("KiutPieChart", pa), e.component("KiutBoxplotChart", lf), e.component("KiutCandlestickChart", qf), e.component("KiutHistogramChart", Vi), e.component("KiutSankeyChart", zt), e.component("KiutAgentsPerDay", Vp), e.component("KiutBookingManager", pm), e.component("KiutCheckin", Yi), e.component("KiutCheckinContainer", M0), e.component("KiutCheckinMetrics", Um), e.component("KiutCheckinSegments", Ui), e.component("KiutDisruption", Y0), e.component("KiutFAQ", J0), e.component("KiutMessagesPerAgent", ub), e.component("KiutRecordLocator", Ki), e.component("KiutSalesByChannel", qi), e.component("KiutSeller", Xi), e.component("KiutSellerContainer", Jb), e.component("KiutTopAgents", lv), e.component("KiutPaymentMethod", Av), e.component("KiutAgentHumanConversations", Sy), e.component("KiutChannelMetrics", Ry), e.component("KiutTriageCombinations", Qy), e.component("KiutSelectLanguage", s1), e.component("KiutGuardrails", m1), e.component("KiutDisruptionNotifier", R1), e.component("KiutTotalConversationsCard", G1), e.component("KiutCsatP95Card", Z1), e.component("KiutCsatPulseCard", Q1), e.component("KiutCSATContainer", T_), e.component("KiutAiGeneratedRevenueCard", B_), e.component("KiutHumanEscalations", Y_), e.component("KiutHumanEscalationsCard", K_), e.component("KiutNpsDailyMetrics", Qi), e.component("KiutNpsMetrics", Ji), e.component("KiutNpsOverviewMetrics", Zi), e.component("KiutAWSCost", nx), e.component("KiutCostUsage", fx), e.component("KiutTokenUsage", Cx), e.component("KiutConversationCount", Ex), e.component("KiutTopAgentsAnalysis", qx), e.component("KiutTopAgentsPie", ok), e.component("KiutDailyCostTrends", gk), e.component("KiutModelUsage", Ak), e.component("KiutMessageRoles", Vk), e.component("KiutCostPerConversations", Gk), e.component("Tabs", el), e.component("Table", Gi), e.component("Filters", A2), e.component("InputText", E2), e.component("InputPassword", H2), e.component("InputTextarea", X2), e.component("InputFile", aw), e.component("InputDateTime", cw), e.component("InputTime", pw), e.component("InputRange", Aw), e.component("InputNumber", Pw), e.component("InputColorPicker", Ww), e.component("Select", nl), e.component("MultiSelect", s5), e.component("Toggle", r5), e.component("InputPhone", m5), e.component("SelectablePills", w5), e.component("SegmentedControl", S5), e.component("DateRangePicker", nC), e.component("DatePickerPresets", DC), e.component("Tag", He), e.component("Button", ta), e.component("Modal", NC), e.component("Section", UC), e.component("KiutAppShellNavigation", h$);
  }
};
export {
  nx as AWSCost,
  Sy as AgentHumanConversations,
  Vp as AgentsPerDay,
  B_ as AiGeneratedRevenueCard,
  h$ as AppShellNavigation,
  pm as BookingManager,
  lf as BoxplotChart,
  ta as Button,
  T_ as CSATContainer,
  qf as CandlestickChart,
  Ry as ChannelMetrics,
  vt as ChartBar,
  ft as ChartLine,
  Yi as Checkin,
  M0 as CheckinContainer,
  Um as CheckinMetrics,
  Ui as CheckinSegments,
  Ex as ConversationCount,
  Gk as CostPerConversations,
  fx as CostUsage,
  Z1 as CsatP95Card,
  Q1 as CsatPulseCard,
  gk as DailyCostTrends,
  DC as DatePickerPresets,
  nC as DateRangePicker,
  Y0 as Disruption,
  R1 as DisruptionNotifier,
  J0 as FAQ,
  A2 as Filters,
  m1 as Guardrails,
  Vi as HistogramChart,
  Y_ as HumanEscalations,
  K_ as HumanEscalationsCard,
  Ww as InputColorPicker,
  cw as InputDateTime,
  aw as InputFile,
  Pw as InputNumber,
  H2 as InputPassword,
  m5 as InputPhone,
  Aw as InputRange,
  E2 as InputText,
  X2 as InputTextarea,
  pw as InputTime,
  w$ as KiutUIPlugin,
  Vk as MessageRoles,
  ub as MessagesPerAgent,
  NC as Modal,
  Ak as ModelUsage,
  s5 as MultiSelect,
  Qi as NpsDailyMetrics,
  Ji as NpsMetrics,
  Zi as NpsOverviewMetrics,
  Av as PaymentMethod,
  pa as PieChart,
  Ki as RecordLocator,
  qi as SalesByChannel,
  zt as SankeyChart,
  UC as Section,
  S5 as SegmentedControl,
  nl as Select,
  s1 as SelectLanguage,
  w5 as SelectablePills,
  Xi as Seller,
  Jb as SellerContainer,
  Gi as Table,
  el as Tabs,
  He as Tag,
  r5 as Toggle,
  Cx as TokenUsage,
  lv as TopAgents,
  qx as TopAgentsAnalysis,
  ok as TopAgentsPie,
  G1 as TotalConversationsCard,
  Qy as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
