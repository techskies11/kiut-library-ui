import { defineComponent as le, shallowRef as ei, h as ja, ref as ae, onMounted as tt, onUnmounted as pt, watch as Oe, toRaw as Ya, nextTick as He, version as yl, isProxy as ti, computed as $, toRef as we, openBlock as p, createElementBlock as k, createVNode as F, unref as T, createElementVNode as u, Fragment as ne, renderList as fe, normalizeStyle as Te, normalizeClass as J, toDisplayString as D, createCommentVNode as z, onBeforeUnmount as ni, createStaticVNode as Cs, useSlots as Ja, Transition as De, withCtx as B, renderSlot as $e, Comment as xl, createBlock as ee, resolveDynamicComponent as tn, createTextVNode as Be, Teleport as _a, withDirectives as ct, withModifiers as et, vModelText as an, vShow as Yn, createSlots as $s, vModelSelect as _l, withKeys as Rn, useAttrs as ka, inject as ai, mergeProps as sn } from "vue";
import * as Ss from "echarts/core";
import { TooltipComponent as kl, TitleComponent as wl } from "echarts/components";
import { SankeyChart as Cl } from "echarts/charts";
import { CanvasRenderer as $l } from "echarts/renderers";
import je from "moment";
function Kn(e) {
  return e + 0.5 | 0;
}
const Ft = (e, t, n) => Math.max(Math.min(e, n), t);
function Dn(e) {
  return Ft(Kn(e * 2.55), 0, 255);
}
function Wt(e) {
  return Ft(Kn(e * 255), 0, 255);
}
function At(e) {
  return Ft(Kn(e / 2.55) / 100, 0, 1);
}
function Ms(e) {
  return Ft(Kn(e * 100), 0, 100);
}
const ut = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Ka = [..."0123456789ABCDEF"], Sl = (e) => Ka[e & 15], Ml = (e) => Ka[(e & 240) >> 4] + Ka[e & 15], qn = (e) => (e & 240) >> 4 === (e & 15), Dl = (e) => qn(e.r) && qn(e.g) && qn(e.b) && qn(e.a);
function Tl(e) {
  var t = e.length, n;
  return e[0] === "#" && (t === 4 || t === 5 ? n = {
    r: 255 & ut[e[1]] * 17,
    g: 255 & ut[e[2]] * 17,
    b: 255 & ut[e[3]] * 17,
    a: t === 5 ? ut[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (n = {
    r: ut[e[1]] << 4 | ut[e[2]],
    g: ut[e[3]] << 4 | ut[e[4]],
    b: ut[e[5]] << 4 | ut[e[6]],
    a: t === 9 ? ut[e[7]] << 4 | ut[e[8]] : 255
  })), n;
}
const Al = (e, t) => e < 255 ? t(e) : "";
function Bl(e) {
  var t = Dl(e) ? Sl : Ml;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + Al(e.a, t) : void 0;
}
const Ll = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function si(e, t, n) {
  const a = t * Math.min(n, 1 - n), s = (o, i = (o + e / 30) % 12) => n - a * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [s(0), s(8), s(4)];
}
function Pl(e, t, n) {
  const a = (s, o = (s + e / 60) % 6) => n - n * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [a(5), a(3), a(1)];
}
function Il(e, t, n) {
  const a = si(e, 1, 0.5);
  let s;
  for (t + n > 1 && (s = 1 / (t + n), t *= s, n *= s), s = 0; s < 3; s++)
    a[s] *= 1 - t - n, a[s] += t;
  return a;
}
function Rl(e, t, n, a, s) {
  return e === s ? (t - n) / a + (t < n ? 6 : 0) : t === s ? (n - e) / a + 2 : (e - t) / a + 4;
}
function es(e) {
  const n = e.r / 255, a = e.g / 255, s = e.b / 255, o = Math.max(n, a, s), i = Math.min(n, a, s), l = (o + i) / 2;
  let r, c, d;
  return o !== i && (d = o - i, c = l > 0.5 ? d / (2 - o - i) : d / (o + i), r = Rl(n, a, s, d, o), r = r * 60 + 0.5), [r | 0, c || 0, l];
}
function ts(e, t, n, a) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, a)).map(Wt);
}
function ns(e, t, n) {
  return ts(si, e, t, n);
}
function Fl(e, t, n) {
  return ts(Il, e, t, n);
}
function El(e, t, n) {
  return ts(Pl, e, t, n);
}
function oi(e) {
  return (e % 360 + 360) % 360;
}
function Ol(e) {
  const t = Ll.exec(e);
  let n = 255, a;
  if (!t)
    return;
  t[5] !== a && (n = t[6] ? Dn(+t[5]) : Wt(+t[5]));
  const s = oi(+t[2]), o = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? a = Fl(s, o, i) : t[1] === "hsv" ? a = El(s, o, i) : a = ns(s, o, i), {
    r: a[0],
    g: a[1],
    b: a[2],
    a: n
  };
}
function Vl(e, t) {
  var n = es(e);
  n[0] = oi(n[0] + t), n = ns(n), e.r = n[0], e.g = n[1], e.b = n[2];
}
function zl(e) {
  if (!e)
    return;
  const t = es(e), n = t[0], a = Ms(t[1]), s = Ms(t[2]);
  return e.a < 255 ? `hsla(${n}, ${a}%, ${s}%, ${At(e.a)})` : `hsl(${n}, ${a}%, ${s}%)`;
}
const Ds = {
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
}, Ts = {
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
function Nl() {
  const e = {}, t = Object.keys(Ts), n = Object.keys(Ds);
  let a, s, o, i, l;
  for (a = 0; a < t.length; a++) {
    for (i = l = t[a], s = 0; s < n.length; s++)
      o = n[s], l = l.replace(o, Ds[o]);
    o = parseInt(Ts[i], 16), e[l] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return e;
}
let Xn;
function Wl(e) {
  Xn || (Xn = Nl(), Xn.transparent = [0, 0, 0, 0]);
  const t = Xn[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const Hl = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function jl(e) {
  const t = Hl.exec(e);
  let n = 255, a, s, o;
  if (t) {
    if (t[7] !== a) {
      const i = +t[7];
      n = t[8] ? Dn(i) : Ft(i * 255, 0, 255);
    }
    return a = +t[1], s = +t[3], o = +t[5], a = 255 & (t[2] ? Dn(a) : Ft(a, 0, 255)), s = 255 & (t[4] ? Dn(s) : Ft(s, 0, 255)), o = 255 & (t[6] ? Dn(o) : Ft(o, 0, 255)), {
      r: a,
      g: s,
      b: o,
      a: n
    };
  }
}
function Yl(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${At(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const Ta = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, hn = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function Kl(e, t, n) {
  const a = hn(At(e.r)), s = hn(At(e.g)), o = hn(At(e.b));
  return {
    r: Wt(Ta(a + n * (hn(At(t.r)) - a))),
    g: Wt(Ta(s + n * (hn(At(t.g)) - s))),
    b: Wt(Ta(o + n * (hn(At(t.b)) - o))),
    a: e.a + n * (t.a - e.a)
  };
}
function Gn(e, t, n) {
  if (e) {
    let a = es(e);
    a[t] = Math.max(0, Math.min(a[t] + a[t] * n, t === 0 ? 360 : 1)), a = ns(a), e.r = a[0], e.g = a[1], e.b = a[2];
  }
}
function ii(e, t) {
  return e && Object.assign(t || {}, e);
}
function As(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = Wt(e[3]))) : (t = ii(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = Wt(t.a)), t;
}
function Ul(e) {
  return e.charAt(0) === "r" ? jl(e) : Ol(e);
}
class Fn {
  constructor(t) {
    if (t instanceof Fn)
      return t;
    const n = typeof t;
    let a;
    n === "object" ? a = As(t) : n === "string" && (a = Tl(t) || Wl(t) || Ul(t)), this._rgb = a, this._valid = !!a;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = ii(this._rgb);
    return t && (t.a = At(t.a)), t;
  }
  set rgb(t) {
    this._rgb = As(t);
  }
  rgbString() {
    return this._valid ? Yl(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? Bl(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? zl(this._rgb) : void 0;
  }
  mix(t, n) {
    if (t) {
      const a = this.rgb, s = t.rgb;
      let o;
      const i = n === o ? 0.5 : n, l = 2 * i - 1, r = a.a - s.a, c = ((l * r === -1 ? l : (l + r) / (1 + l * r)) + 1) / 2;
      o = 1 - c, a.r = 255 & c * a.r + o * s.r + 0.5, a.g = 255 & c * a.g + o * s.g + 0.5, a.b = 255 & c * a.b + o * s.b + 0.5, a.a = i * a.a + (1 - i) * s.a, this.rgb = a;
    }
    return this;
  }
  interpolate(t, n) {
    return t && (this._rgb = Kl(this._rgb, t._rgb, n)), this;
  }
  clone() {
    return new Fn(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = Wt(t), this;
  }
  clearer(t) {
    const n = this._rgb;
    return n.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, n = Kn(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return Gn(this._rgb, 2, t), this;
  }
  darken(t) {
    return Gn(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return Gn(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return Gn(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return Vl(this._rgb, t), this;
  }
}
function Mt() {
}
const ql = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function Ie(e) {
  return e == null;
}
function Ye(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function Ae(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function ft(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function xt(e, t) {
  return ft(e) ? e : t;
}
function _e(e, t) {
  return typeof e > "u" ? t : e;
}
const Xl = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, li = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function Ee(e, t, n) {
  if (e && typeof e.call == "function")
    return e.apply(n, t);
}
function Re(e, t, n, a) {
  let s, o, i;
  if (Ye(e))
    for (o = e.length, s = 0; s < o; s++)
      t.call(n, e[s], s);
  else if (Ae(e))
    for (i = Object.keys(e), o = i.length, s = 0; s < o; s++)
      t.call(n, e[i[s]], i[s]);
}
function ha(e, t) {
  let n, a, s, o;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (n = 0, a = e.length; n < a; ++n)
    if (s = e[n], o = t[n], s.datasetIndex !== o.datasetIndex || s.index !== o.index)
      return !1;
  return !0;
}
function fa(e) {
  if (Ye(e))
    return e.map(fa);
  if (Ae(e)) {
    const t = /* @__PURE__ */ Object.create(null), n = Object.keys(e), a = n.length;
    let s = 0;
    for (; s < a; ++s)
      t[n[s]] = fa(e[n[s]]);
    return t;
  }
  return e;
}
function ri(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function Gl(e, t, n, a) {
  if (!ri(e))
    return;
  const s = t[e], o = n[e];
  Ae(s) && Ae(o) ? En(s, o, a) : t[e] = fa(o);
}
function En(e, t, n) {
  const a = Ye(t) ? t : [
    t
  ], s = a.length;
  if (!Ae(e))
    return e;
  n = n || {};
  const o = n.merger || Gl;
  let i;
  for (let l = 0; l < s; ++l) {
    if (i = a[l], !Ae(i))
      continue;
    const r = Object.keys(i);
    for (let c = 0, d = r.length; c < d; ++c)
      o(r[c], e, i, n);
  }
  return e;
}
function Bn(e, t) {
  return En(e, t, {
    merger: Zl
  });
}
function Zl(e, t, n) {
  if (!ri(e))
    return;
  const a = t[e], s = n[e];
  Ae(a) && Ae(s) ? Bn(a, s) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = fa(s));
}
const Bs = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function Ql(e) {
  const t = e.split("."), n = [];
  let a = "";
  for (const s of t)
    a += s, a.endsWith("\\") ? a = a.slice(0, -1) + "." : (n.push(a), a = "");
  return n;
}
function Jl(e) {
  const t = Ql(e);
  return (n) => {
    for (const a of t) {
      if (a === "")
        break;
      n = n && n[a];
    }
    return n;
  };
}
function ln(e, t) {
  return (Bs[t] || (Bs[t] = Jl(t)))(e);
}
function as(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const On = (e) => typeof e < "u", jt = (e) => typeof e == "function", Ls = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
};
function er(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const Fe = Math.PI, Ne = 2 * Fe, tr = Ne + Fe, ga = Number.POSITIVE_INFINITY, nr = Fe / 180, Ke = Fe / 2, Xt = Fe / 4, Ps = Fe * 2 / 3, ci = Math.log10, Ct = Math.sign;
function Ln(e, t, n) {
  return Math.abs(e - t) < n;
}
function Is(e) {
  const t = Math.round(e);
  e = Ln(e, t, e / 1e3) ? t : e;
  const n = Math.pow(10, Math.floor(ci(e))), a = e / n;
  return (a <= 1 ? 1 : a <= 2 ? 2 : a <= 5 ? 5 : 10) * n;
}
function ar(e) {
  const t = [], n = Math.sqrt(e);
  let a;
  for (a = 1; a < n; a++)
    e % a === 0 && (t.push(a), t.push(e / a));
  return n === (n | 0) && t.push(n), t.sort((s, o) => s - o).pop(), t;
}
function sr(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function Vn(e) {
  return !sr(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function or(e, t) {
  const n = Math.round(e);
  return n - t <= e && n + t >= e;
}
function ir(e, t, n) {
  let a, s, o;
  for (a = 0, s = e.length; a < s; a++)
    o = e[a][n], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function Bt(e) {
  return e * (Fe / 180);
}
function lr(e) {
  return e * (180 / Fe);
}
function Rs(e) {
  if (!ft(e))
    return;
  let t = 1, n = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, n++;
  return n;
}
function di(e, t) {
  const n = t.x - e.x, a = t.y - e.y, s = Math.sqrt(n * n + a * a);
  let o = Math.atan2(a, n);
  return o < -0.5 * Fe && (o += Ne), {
    angle: o,
    distance: s
  };
}
function Ua(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function rr(e, t) {
  return (e - t + tr) % Ne - Fe;
}
function bt(e) {
  return (e % Ne + Ne) % Ne;
}
function zn(e, t, n, a) {
  const s = bt(e), o = bt(t), i = bt(n), l = bt(o - s), r = bt(i - s), c = bt(s - o), d = bt(s - i);
  return s === o || s === i || a && o === i || l > r && c < d;
}
function Ze(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function cr(e) {
  return Ze(e, -32768, 32767);
}
function Et(e, t, n, a = 1e-6) {
  return e >= Math.min(t, n) - a && e <= Math.max(t, n) + a;
}
function ss(e, t, n) {
  n = n || ((i) => e[i] < t);
  let a = e.length - 1, s = 0, o;
  for (; a - s > 1; )
    o = s + a >> 1, n(o) ? s = o : a = o;
  return {
    lo: s,
    hi: a
  };
}
const nn = (e, t, n, a) => ss(e, n, a ? (s) => {
  const o = e[s][t];
  return o < n || o === n && e[s + 1][t] === n;
} : (s) => e[s][t] < n), dr = (e, t, n) => ss(e, n, (a) => e[a][t] >= n);
function ur(e, t, n) {
  let a = 0, s = e.length;
  for (; a < s && e[a] < t; )
    a++;
  for (; s > a && e[s - 1] > n; )
    s--;
  return a > 0 || s < e.length ? e.slice(a, s) : e;
}
const ui = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function hr(e, t) {
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
  }), ui.forEach((n) => {
    const a = "_onData" + as(n), s = e[n];
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
function Fs(e, t) {
  const n = e._chartjs;
  if (!n)
    return;
  const a = n.listeners, s = a.indexOf(t);
  s !== -1 && a.splice(s, 1), !(a.length > 0) && (ui.forEach((o) => {
    delete e[o];
  }), delete e._chartjs);
}
function hi(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const fi = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function gi(e, t) {
  let n = [], a = !1;
  return function(...s) {
    n = s, a || (a = !0, fi.call(window, () => {
      a = !1, e.apply(t, n);
    }));
  };
}
function fr(e, t) {
  let n;
  return function(...a) {
    return t ? (clearTimeout(n), n = setTimeout(e, t, a)) : e.apply(this, a), t;
  };
}
const os = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", Xe = (e, t, n) => e === "start" ? t : e === "end" ? n : (t + n) / 2, gr = (e, t, n, a) => e === (a ? "left" : "right") ? n : e === "center" ? (t + n) / 2 : t;
function mr(e, t, n) {
  const a = t.length;
  let s = 0, o = a;
  if (e._sorted) {
    const { iScale: i, vScale: l, _parsed: r } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, d = i.axis, { min: h, max: m, minDefined: v, maxDefined: g } = i.getUserBounds();
    if (v) {
      if (s = Math.min(
        // @ts-expect-error Need to type _parsed
        nn(r, d, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? a : nn(t, d, i.getPixelForValue(h)).lo
      ), c) {
        const y = r.slice(0, s + 1).reverse().findIndex((b) => !Ie(b[l.axis]));
        s -= Math.max(0, y);
      }
      s = Ze(s, 0, a - 1);
    }
    if (g) {
      let y = Math.max(
        // @ts-expect-error Need to type _parsed
        nn(r, i.axis, m, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? 0 : nn(t, d, i.getPixelForValue(m), !0).hi + 1
      );
      if (c) {
        const b = r.slice(y - 1).findIndex((f) => !Ie(f[l.axis]));
        y += Math.max(0, b);
      }
      o = Ze(y, s, a) - s;
    } else
      o = a - s;
  }
  return {
    start: s,
    count: o
  };
}
function pr(e) {
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
const Zn = (e) => e === 0 || e === 1, Es = (e, t, n) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * Ne / n)), Os = (e, t, n) => Math.pow(2, -10 * e) * Math.sin((e - t) * Ne / n) + 1, Pn = {
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
  easeInSine: (e) => -Math.cos(e * Ke) + 1,
  easeOutSine: (e) => Math.sin(e * Ke),
  easeInOutSine: (e) => -0.5 * (Math.cos(Fe * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => Zn(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => Zn(e) ? e : Es(e, 0.075, 0.3),
  easeOutElastic: (e) => Zn(e) ? e : Os(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return Zn(e) ? e : e < 0.5 ? 0.5 * Es(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * Os(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - Pn.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? Pn.easeInBounce(e * 2) * 0.5 : Pn.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function is(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Vs(e) {
  return is(e) ? e : new Fn(e);
}
function Aa(e) {
  return is(e) ? e : new Fn(e).saturate(0.5).darken(0.1).hexString();
}
const br = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], vr = [
  "color",
  "borderColor",
  "backgroundColor"
];
function yr(e) {
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
      properties: vr
    },
    numbers: {
      type: "number",
      properties: br
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
function xr(e) {
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
const zs = /* @__PURE__ */ new Map();
function _r(e, t) {
  t = t || {};
  const n = e + JSON.stringify(t);
  let a = zs.get(n);
  return a || (a = new Intl.NumberFormat(e, t), zs.set(n, a)), a;
}
function ls(e, t, n) {
  return _r(t, n).format(e);
}
const kr = {
  values(e) {
    return Ye(e) ? e : "" + e;
  },
  numeric(e, t, n) {
    if (e === 0)
      return "0";
    const a = this.chart.options.locale;
    let s, o = e;
    if (n.length > 1) {
      const c = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
      (c < 1e-4 || c > 1e15) && (s = "scientific"), o = wr(e, n);
    }
    const i = ci(Math.abs(o)), l = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), r = {
      notation: s,
      minimumFractionDigits: l,
      maximumFractionDigits: l
    };
    return Object.assign(r, this.options.ticks.format), ls(e, a, r);
  }
};
function wr(e, t) {
  let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var mi = {
  formatters: kr
};
function Cr(e) {
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
      callback: mi.formatters.values,
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
const rn = /* @__PURE__ */ Object.create(null), qa = /* @__PURE__ */ Object.create(null);
function In(e, t) {
  if (!t)
    return e;
  const n = t.split(".");
  for (let a = 0, s = n.length; a < s; ++a) {
    const o = n[a];
    e = e[o] || (e[o] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function Ba(e, t, n) {
  return typeof t == "string" ? En(In(e, t), n) : En(In(e, ""), t);
}
class $r {
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
    }, this.hover = {}, this.hoverBackgroundColor = (a, s) => Aa(s.backgroundColor), this.hoverBorderColor = (a, s) => Aa(s.borderColor), this.hoverColor = (a, s) => Aa(s.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(n);
  }
  set(t, n) {
    return Ba(this, t, n);
  }
  get(t) {
    return In(this, t);
  }
  describe(t, n) {
    return Ba(qa, t, n);
  }
  override(t, n) {
    return Ba(rn, t, n);
  }
  route(t, n, a, s) {
    const o = In(this, t), i = In(this, a), l = "_" + n;
    Object.defineProperties(o, {
      [l]: {
        value: o[n],
        writable: !0
      },
      [n]: {
        enumerable: !0,
        get() {
          const r = this[l], c = i[s];
          return Ae(r) ? Object.assign({}, c, r) : _e(r, c);
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
var We = /* @__PURE__ */ new $r({
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
  yr,
  xr,
  Cr
]);
function Sr(e) {
  return !e || Ie(e.size) || Ie(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function Ns(e, t, n, a, s) {
  let o = t[s];
  return o || (o = t[s] = e.measureText(s).width, n.push(s)), o > a && (a = o), a;
}
function Gt(e, t, n) {
  const a = e.currentDevicePixelRatio, s = n !== 0 ? Math.max(n / 2, 0.5) : 0;
  return Math.round((t - s) * a) / a + s;
}
function Ws(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Xa(e, t, n, a) {
  pi(e, t, n, a, null);
}
function pi(e, t, n, a, s) {
  let o, i, l, r, c, d, h, m;
  const v = t.pointStyle, g = t.rotation, y = t.radius;
  let b = (g || 0) * nr;
  if (v && typeof v == "object" && (o = v.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(n, a), e.rotate(b), e.drawImage(v, -v.width / 2, -v.height / 2, v.width, v.height), e.restore();
    return;
  }
  if (!(isNaN(y) || y <= 0)) {
    switch (e.beginPath(), v) {
      // Default includes circle
      default:
        s ? e.ellipse(n, a, s / 2, y, 0, 0, Ne) : e.arc(n, a, y, 0, Ne), e.closePath();
        break;
      case "triangle":
        d = s ? s / 2 : y, e.moveTo(n + Math.sin(b) * d, a - Math.cos(b) * y), b += Ps, e.lineTo(n + Math.sin(b) * d, a - Math.cos(b) * y), b += Ps, e.lineTo(n + Math.sin(b) * d, a - Math.cos(b) * y), e.closePath();
        break;
      case "rectRounded":
        c = y * 0.516, r = y - c, i = Math.cos(b + Xt) * r, h = Math.cos(b + Xt) * (s ? s / 2 - c : r), l = Math.sin(b + Xt) * r, m = Math.sin(b + Xt) * (s ? s / 2 - c : r), e.arc(n - h, a - l, c, b - Fe, b - Ke), e.arc(n + m, a - i, c, b - Ke, b), e.arc(n + h, a + l, c, b, b + Ke), e.arc(n - m, a + i, c, b + Ke, b + Fe), e.closePath();
        break;
      case "rect":
        if (!g) {
          r = Math.SQRT1_2 * y, d = s ? s / 2 : r, e.rect(n - d, a - r, 2 * d, 2 * r);
          break;
        }
        b += Xt;
      /* falls through */
      case "rectRot":
        h = Math.cos(b) * (s ? s / 2 : y), i = Math.cos(b) * y, l = Math.sin(b) * y, m = Math.sin(b) * (s ? s / 2 : y), e.moveTo(n - h, a - l), e.lineTo(n + m, a - i), e.lineTo(n + h, a + l), e.lineTo(n - m, a + i), e.closePath();
        break;
      case "crossRot":
        b += Xt;
      /* falls through */
      case "cross":
        h = Math.cos(b) * (s ? s / 2 : y), i = Math.cos(b) * y, l = Math.sin(b) * y, m = Math.sin(b) * (s ? s / 2 : y), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + m, a - i), e.lineTo(n - m, a + i);
        break;
      case "star":
        h = Math.cos(b) * (s ? s / 2 : y), i = Math.cos(b) * y, l = Math.sin(b) * y, m = Math.sin(b) * (s ? s / 2 : y), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + m, a - i), e.lineTo(n - m, a + i), b += Xt, h = Math.cos(b) * (s ? s / 2 : y), i = Math.cos(b) * y, l = Math.sin(b) * y, m = Math.sin(b) * (s ? s / 2 : y), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + m, a - i), e.lineTo(n - m, a + i);
        break;
      case "line":
        i = s ? s / 2 : Math.cos(b) * y, l = Math.sin(b) * y, e.moveTo(n - i, a - l), e.lineTo(n + i, a + l);
        break;
      case "dash":
        e.moveTo(n, a), e.lineTo(n + Math.cos(b) * (s ? s / 2 : y), a + Math.sin(b) * y);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function Nn(e, t, n) {
  return n = n || 0.5, !t || e && e.x > t.left - n && e.x < t.right + n && e.y > t.top - n && e.y < t.bottom + n;
}
function rs(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function cs(e) {
  e.restore();
}
function Mr(e, t, n, a, s) {
  if (!t)
    return e.lineTo(n.x, n.y);
  if (s === "middle") {
    const o = (t.x + n.x) / 2;
    e.lineTo(o, t.y), e.lineTo(o, n.y);
  } else s === "after" != !!a ? e.lineTo(t.x, n.y) : e.lineTo(n.x, t.y);
  e.lineTo(n.x, n.y);
}
function Dr(e, t, n, a) {
  if (!t)
    return e.lineTo(n.x, n.y);
  e.bezierCurveTo(a ? t.cp1x : t.cp2x, a ? t.cp1y : t.cp2y, a ? n.cp2x : n.cp1x, a ? n.cp2y : n.cp1y, n.x, n.y);
}
function Tr(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), Ie(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function Ar(e, t, n, a, s) {
  if (s.strikethrough || s.underline) {
    const o = e.measureText(a), i = t - o.actualBoundingBoxLeft, l = t + o.actualBoundingBoxRight, r = n - o.actualBoundingBoxAscent, c = n + o.actualBoundingBoxDescent, d = s.strikethrough ? (r + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = s.decorationWidth || 2, e.moveTo(i, d), e.lineTo(l, d), e.stroke();
  }
}
function Br(e, t) {
  const n = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = n;
}
function Wn(e, t, n, a, s, o = {}) {
  const i = Ye(t) ? t : [
    t
  ], l = o.strokeWidth > 0 && o.strokeColor !== "";
  let r, c;
  for (e.save(), e.font = s.string, Tr(e, o), r = 0; r < i.length; ++r)
    c = i[r], o.backdrop && Br(e, o.backdrop), l && (o.strokeColor && (e.strokeStyle = o.strokeColor), Ie(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(c, n, a, o.maxWidth)), e.fillText(c, n, a, o.maxWidth), Ar(e, n, a, c, o), a += Number(s.lineHeight);
  e.restore();
}
function ma(e, t) {
  const { x: n, y: a, w: s, h: o, radius: i } = t;
  e.arc(n + i.topLeft, a + i.topLeft, i.topLeft, 1.5 * Fe, Fe, !0), e.lineTo(n, a + o - i.bottomLeft), e.arc(n + i.bottomLeft, a + o - i.bottomLeft, i.bottomLeft, Fe, Ke, !0), e.lineTo(n + s - i.bottomRight, a + o), e.arc(n + s - i.bottomRight, a + o - i.bottomRight, i.bottomRight, Ke, 0, !0), e.lineTo(n + s, a + i.topRight), e.arc(n + s - i.topRight, a + i.topRight, i.topRight, 0, -Ke, !0), e.lineTo(n + i.topLeft, a);
}
const Lr = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, Pr = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Ir(e, t) {
  const n = ("" + e).match(Lr);
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
const Rr = (e) => +e || 0;
function ds(e, t) {
  const n = {}, a = Ae(t), s = a ? Object.keys(t) : t, o = Ae(e) ? a ? (i) => _e(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of s)
    n[i] = Rr(o(i));
  return n;
}
function bi(e) {
  return ds(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function mn(e) {
  return ds(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function gt(e) {
  const t = bi(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function Qe(e, t) {
  e = e || {}, t = t || We.font;
  let n = _e(e.size, t.size);
  typeof n == "string" && (n = parseInt(n, 10));
  let a = _e(e.style, t.style);
  a && !("" + a).match(Pr) && (console.warn('Invalid font style specified: "' + a + '"'), a = void 0);
  const s = {
    family: _e(e.family, t.family),
    lineHeight: Ir(_e(e.lineHeight, t.lineHeight), n),
    size: n,
    style: a,
    weight: _e(e.weight, t.weight),
    string: ""
  };
  return s.string = Sr(s), s;
}
function Qn(e, t, n, a) {
  let s, o, i;
  for (s = 0, o = e.length; s < o; ++s)
    if (i = e[s], i !== void 0 && i !== void 0)
      return i;
}
function Fr(e, t, n) {
  const { min: a, max: s } = e, o = li(t, (s - a) / 2), i = (l, r) => n && l === 0 ? 0 : l + r;
  return {
    min: i(a, -Math.abs(o)),
    max: i(s, o)
  };
}
function cn(e, t) {
  return Object.assign(Object.create(e), t);
}
function us(e, t = [
  ""
], n, a, s = () => e[0]) {
  const o = n || e;
  typeof a > "u" && (a = _i("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: o,
    _fallback: a,
    _getTarget: s,
    override: (l) => us([
      l,
      ...e
    ], t, o, a)
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
      return yi(l, r, () => jr(r, t, e, l));
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
      return js(l).includes(r);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(l) {
      return js(l);
    },
    /**
    * A trap for setting property values.
    */
    set(l, r, c) {
      const d = l._storage || (l._storage = s());
      return l[r] = d[r] = c, delete l._keys, !0;
    }
  });
}
function bn(e, t, n, a) {
  const s = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: n,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: vi(e, a),
    setContext: (o) => bn(e, o, n, a),
    override: (o) => bn(e.override(o), t, n, a)
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
      return yi(o, i, () => Or(o, i, l));
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
function vi(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: n = t.scriptable, _indexable: a = t.indexable, _allKeys: s = t.allKeys } = e;
  return {
    allKeys: s,
    scriptable: n,
    indexable: a,
    isScriptable: jt(n) ? n : () => n,
    isIndexable: jt(a) ? a : () => a
  };
}
const Er = (e, t) => e ? e + as(t) : t, hs = (e, t) => Ae(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function yi(e, t, n) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const a = n();
  return e[t] = a, a;
}
function Or(e, t, n) {
  const { _proxy: a, _context: s, _subProxy: o, _descriptors: i } = e;
  let l = a[t];
  return jt(l) && i.isScriptable(t) && (l = Vr(t, l, e, n)), Ye(l) && l.length && (l = zr(t, l, e, i.isIndexable)), hs(t, l) && (l = bn(l, s, o && o[t], i)), l;
}
function Vr(e, t, n, a) {
  const { _proxy: s, _context: o, _subProxy: i, _stack: l } = n;
  if (l.has(e))
    throw new Error("Recursion detected: " + Array.from(l).join("->") + "->" + e);
  l.add(e);
  let r = t(o, i || a);
  return l.delete(e), hs(e, r) && (r = fs(s._scopes, s, e, r)), r;
}
function zr(e, t, n, a) {
  const { _proxy: s, _context: o, _subProxy: i, _descriptors: l } = n;
  if (typeof o.index < "u" && a(e))
    return t[o.index % t.length];
  if (Ae(t[0])) {
    const r = t, c = s._scopes.filter((d) => d !== r);
    t = [];
    for (const d of r) {
      const h = fs(c, s, e, d);
      t.push(bn(h, o, i && i[e], l));
    }
  }
  return t;
}
function xi(e, t, n) {
  return jt(e) ? e(t, n) : e;
}
const Nr = (e, t) => e === !0 ? t : typeof e == "string" ? ln(t, e) : void 0;
function Wr(e, t, n, a, s) {
  for (const o of t) {
    const i = Nr(n, o);
    if (i) {
      e.add(i);
      const l = xi(i._fallback, n, s);
      if (typeof l < "u" && l !== n && l !== a)
        return l;
    } else if (i === !1 && typeof a < "u" && n !== a)
      return null;
  }
  return !1;
}
function fs(e, t, n, a) {
  const s = t._rootScopes, o = xi(t._fallback, n, a), i = [
    ...e,
    ...s
  ], l = /* @__PURE__ */ new Set();
  l.add(a);
  let r = Hs(l, i, n, o || n, a);
  return r === null || typeof o < "u" && o !== n && (r = Hs(l, i, o, r, a), r === null) ? !1 : us(Array.from(l), [
    ""
  ], s, o, () => Hr(t, n, a));
}
function Hs(e, t, n, a, s) {
  for (; n; )
    n = Wr(e, t, n, a, s);
  return n;
}
function Hr(e, t, n) {
  const a = e._getTarget();
  t in a || (a[t] = {});
  const s = a[t];
  return Ye(s) && Ae(n) ? n : s || {};
}
function jr(e, t, n, a) {
  let s;
  for (const o of t)
    if (s = _i(Er(o, e), n), typeof s < "u")
      return hs(e, s) ? fs(n, a, e, s) : s;
}
function _i(e, t) {
  for (const n of t) {
    if (!n)
      continue;
    const a = n[e];
    if (typeof a < "u")
      return a;
  }
}
function js(e) {
  let t = e._keys;
  return t || (t = e._keys = Yr(e._scopes)), t;
}
function Yr(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e)
    for (const a of Object.keys(n).filter((s) => !s.startsWith("_")))
      t.add(a);
  return Array.from(t);
}
const Kr = Number.EPSILON || 1e-14, vn = (e, t) => t < e.length && !e[t].skip && e[t], ki = (e) => e === "x" ? "y" : "x";
function Ur(e, t, n, a) {
  const s = e.skip ? t : e, o = t, i = n.skip ? t : n, l = Ua(o, s), r = Ua(i, o);
  let c = l / (l + r), d = r / (l + r);
  c = isNaN(c) ? 0 : c, d = isNaN(d) ? 0 : d;
  const h = a * c, m = a * d;
  return {
    previous: {
      x: o.x - h * (i.x - s.x),
      y: o.y - h * (i.y - s.y)
    },
    next: {
      x: o.x + m * (i.x - s.x),
      y: o.y + m * (i.y - s.y)
    }
  };
}
function qr(e, t, n) {
  const a = e.length;
  let s, o, i, l, r, c = vn(e, 0);
  for (let d = 0; d < a - 1; ++d)
    if (r = c, c = vn(e, d + 1), !(!r || !c)) {
      if (Ln(t[d], 0, Kr)) {
        n[d] = n[d + 1] = 0;
        continue;
      }
      s = n[d] / t[d], o = n[d + 1] / t[d], l = Math.pow(s, 2) + Math.pow(o, 2), !(l <= 9) && (i = 3 / Math.sqrt(l), n[d] = s * i * t[d], n[d + 1] = o * i * t[d]);
    }
}
function Xr(e, t, n = "x") {
  const a = ki(n), s = e.length;
  let o, i, l, r = vn(e, 0);
  for (let c = 0; c < s; ++c) {
    if (i = l, l = r, r = vn(e, c + 1), !l)
      continue;
    const d = l[n], h = l[a];
    i && (o = (d - i[n]) / 3, l[`cp1${n}`] = d - o, l[`cp1${a}`] = h - o * t[c]), r && (o = (r[n] - d) / 3, l[`cp2${n}`] = d + o, l[`cp2${a}`] = h + o * t[c]);
  }
}
function Gr(e, t = "x") {
  const n = ki(t), a = e.length, s = Array(a).fill(0), o = Array(a);
  let i, l, r, c = vn(e, 0);
  for (i = 0; i < a; ++i)
    if (l = r, r = c, c = vn(e, i + 1), !!r) {
      if (c) {
        const d = c[t] - r[t];
        s[i] = d !== 0 ? (c[n] - r[n]) / d : 0;
      }
      o[i] = l ? c ? Ct(s[i - 1]) !== Ct(s[i]) ? 0 : (s[i - 1] + s[i]) / 2 : s[i - 1] : s[i];
    }
  qr(e, s, o), Xr(e, o, t);
}
function Jn(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
function Zr(e, t) {
  let n, a, s, o, i, l = Nn(e[0], t);
  for (n = 0, a = e.length; n < a; ++n)
    i = o, o = l, l = n < a - 1 && Nn(e[n + 1], t), o && (s = e[n], i && (s.cp1x = Jn(s.cp1x, t.left, t.right), s.cp1y = Jn(s.cp1y, t.top, t.bottom)), l && (s.cp2x = Jn(s.cp2x, t.left, t.right), s.cp2y = Jn(s.cp2y, t.top, t.bottom)));
}
function Qr(e, t, n, a, s) {
  let o, i, l, r;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    Gr(e, s);
  else {
    let c = a ? e[e.length - 1] : e[0];
    for (o = 0, i = e.length; o < i; ++o)
      l = e[o], r = Ur(c, l, e[Math.min(o + 1, i - (a ? 0 : 1)) % i], t.tension), l.cp1x = r.previous.x, l.cp1y = r.previous.y, l.cp2x = r.next.x, l.cp2y = r.next.y, c = l;
  }
  t.capBezierPoints && Zr(e, n);
}
function gs() {
  return typeof window < "u" && typeof document < "u";
}
function ms(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function pa(e, t, n) {
  let a;
  return typeof e == "string" ? (a = parseInt(e, 10), e.indexOf("%") !== -1 && (a = a / 100 * t.parentNode[n])) : a = e, a;
}
const wa = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Jr(e, t) {
  return wa(e).getPropertyValue(t);
}
const ec = [
  "top",
  "right",
  "bottom",
  "left"
];
function on(e, t, n) {
  const a = {};
  n = n ? "-" + n : "";
  for (let s = 0; s < 4; s++) {
    const o = ec[s];
    a[o] = parseFloat(e[t + "-" + o + n]) || 0;
  }
  return a.width = a.left + a.right, a.height = a.top + a.bottom, a;
}
const tc = (e, t, n) => (e > 0 || t > 0) && (!n || !n.shadowRoot);
function nc(e, t) {
  const n = e.touches, a = n && n.length ? n[0] : e, { offsetX: s, offsetY: o } = a;
  let i = !1, l, r;
  if (tc(s, o, e.target))
    l = s, r = o;
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
function Jt(e, t) {
  if ("native" in e)
    return e;
  const { canvas: n, currentDevicePixelRatio: a } = t, s = wa(n), o = s.boxSizing === "border-box", i = on(s, "padding"), l = on(s, "border", "width"), { x: r, y: c, box: d } = nc(e, n), h = i.left + (d && l.left), m = i.top + (d && l.top);
  let { width: v, height: g } = t;
  return o && (v -= i.width + l.width, g -= i.height + l.height), {
    x: Math.round((r - h) / v * n.width / a),
    y: Math.round((c - m) / g * n.height / a)
  };
}
function ac(e, t, n) {
  let a, s;
  if (t === void 0 || n === void 0) {
    const o = e && ms(e);
    if (!o)
      t = e.clientWidth, n = e.clientHeight;
    else {
      const i = o.getBoundingClientRect(), l = wa(o), r = on(l, "border", "width"), c = on(l, "padding");
      t = i.width - c.width - r.width, n = i.height - c.height - r.height, a = pa(l.maxWidth, o, "clientWidth"), s = pa(l.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: n,
    maxWidth: a || ga,
    maxHeight: s || ga
  };
}
const Ot = (e) => Math.round(e * 10) / 10;
function sc(e, t, n, a) {
  const s = wa(e), o = on(s, "margin"), i = pa(s.maxWidth, e, "clientWidth") || ga, l = pa(s.maxHeight, e, "clientHeight") || ga, r = ac(e, t, n);
  let { width: c, height: d } = r;
  if (s.boxSizing === "content-box") {
    const m = on(s, "border", "width"), v = on(s, "padding");
    c -= v.width + m.width, d -= v.height + m.height;
  }
  return c = Math.max(0, c - o.width), d = Math.max(0, a ? c / a : d - o.height), c = Ot(Math.min(c, i, r.maxWidth)), d = Ot(Math.min(d, l, r.maxHeight)), c && !d && (d = Ot(c / 2)), (t !== void 0 || n !== void 0) && a && r.height && d > r.height && (d = r.height, c = Ot(Math.floor(d * a))), {
    width: c,
    height: d
  };
}
function Ys(e, t, n) {
  const a = t || 1, s = Ot(e.height * a), o = Ot(e.width * a);
  e.height = Ot(e.height), e.width = Ot(e.width);
  const i = e.canvas;
  return i.style && (n || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== a || i.height !== s || i.width !== o ? (e.currentDevicePixelRatio = a, i.height = s, i.width = o, e.ctx.setTransform(a, 0, 0, a, 0, 0), !0) : !1;
}
const oc = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    gs() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function Ks(e, t) {
  const n = Jr(e, t), a = n && n.match(/^(\d+)(\.\d+)?px$/);
  return a ? +a[1] : void 0;
}
function en(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: e.y + n * (t.y - e.y)
  };
}
function ic(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: a === "middle" ? n < 0.5 ? e.y : t.y : a === "after" ? n < 1 ? e.y : t.y : n > 0 ? t.y : e.y
  };
}
function lc(e, t, n, a) {
  const s = {
    x: e.cp2x,
    y: e.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, i = en(e, s, n), l = en(s, o, n), r = en(o, t, n), c = en(i, l, n), d = en(l, r, n);
  return en(c, d, n);
}
const rc = function(e, t) {
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
}, cc = function() {
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
function pn(e, t, n) {
  return e ? rc(t, n) : cc();
}
function wi(e, t) {
  let n, a;
  (t === "ltr" || t === "rtl") && (n = e.canvas.style, a = [
    n.getPropertyValue("direction"),
    n.getPropertyPriority("direction")
  ], n.setProperty("direction", t, "important"), e.prevTextDirection = a);
}
function Ci(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function $i(e) {
  return e === "angle" ? {
    between: zn,
    compare: rr,
    normalize: bt
  } : {
    between: Et,
    compare: (t, n) => t - n,
    normalize: (t) => t
  };
}
function Us({ start: e, end: t, count: n, loop: a, style: s }) {
  return {
    start: e % n,
    end: t % n,
    loop: a && (t - e + 1) % n === 0,
    style: s
  };
}
function dc(e, t, n) {
  const { property: a, start: s, end: o } = n, { between: i, normalize: l } = $i(a), r = t.length;
  let { start: c, end: d, loop: h } = e, m, v;
  if (h) {
    for (c += r, d += r, m = 0, v = r; m < v && i(l(t[c % r][a]), s, o); ++m)
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
function uc(e, t, n) {
  if (!n)
    return [
      e
    ];
  const { property: a, start: s, end: o } = n, i = t.length, { compare: l, between: r, normalize: c } = $i(a), { start: d, end: h, loop: m, style: v } = dc(e, t, n), g = [];
  let y = !1, b = null, f, x, _;
  const w = () => r(s, _, f) && l(s, _) !== 0, C = () => l(o, f) === 0 || r(o, _, f), M = () => y || w(), S = () => !y || C();
  for (let R = d, V = d; R <= h; ++R)
    x = t[R % i], !x.skip && (f = c(x[a]), f !== _ && (y = r(f, s, o), b === null && M() && (b = l(f, s) === 0 ? R : V), b !== null && S() && (g.push(Us({
      start: b,
      end: R,
      loop: m,
      count: i,
      style: v
    })), b = null), V = R, _ = f));
  return b !== null && g.push(Us({
    start: b,
    end: h,
    loop: m,
    count: i,
    style: v
  })), g;
}
function hc(e, t) {
  const n = [], a = e.segments;
  for (let s = 0; s < a.length; s++) {
    const o = uc(a[s], e.points, t);
    o.length && n.push(...o);
  }
  return n;
}
function fc(e, t, n, a) {
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
function gc(e, t, n, a) {
  const s = e.length, o = [];
  let i = t, l = e[t], r;
  for (r = t + 1; r <= n; ++r) {
    const c = e[r % s];
    c.skip || c.stop ? l.skip || (a = !1, o.push({
      start: t % s,
      end: (r - 1) % s,
      loop: a
    }), t = i = c.stop ? r : null) : (i = r, l.skip && (t = r)), l = c;
  }
  return i !== null && o.push({
    start: t % s,
    end: i % s,
    loop: a
  }), o;
}
function mc(e, t) {
  const n = e.points, a = e.options.spanGaps, s = n.length;
  if (!s)
    return [];
  const o = !!e._loop, { start: i, end: l } = fc(n, s, o, a);
  if (a === !0)
    return qs(e, [
      {
        start: i,
        end: l,
        loop: o
      }
    ], n, t);
  const r = l < i ? l + s : l, c = !!e._fullLoop && i === 0 && l === s - 1;
  return qs(e, gc(n, i, r, c), n, t);
}
function qs(e, t, n, a) {
  return !a || !a.setContext || !n ? t : pc(e, t, n, a);
}
function pc(e, t, n, a) {
  const s = e._chart.getContext(), o = Xs(e.options), { _datasetIndex: i, options: { spanGaps: l } } = e, r = n.length, c = [];
  let d = o, h = t[0].start, m = h;
  function v(g, y, b, f) {
    const x = l ? -1 : 1;
    if (g !== y) {
      for (g += r; n[g % r].skip; )
        g -= x;
      for (; n[y % r].skip; )
        y += x;
      g % r !== y % r && (c.push({
        start: g % r,
        end: y % r,
        loop: b,
        style: f
      }), d = f, h = y % r);
    }
  }
  for (const g of t) {
    h = l ? h : g.start;
    let y = n[h % r], b;
    for (m = h + 1; m <= g.end; m++) {
      const f = n[m % r];
      b = Xs(a.setContext(cn(s, {
        type: "segment",
        p0: y,
        p1: f,
        p0DataIndex: (m - 1) % r,
        p1DataIndex: m % r,
        datasetIndex: i
      }))), bc(b, d) && v(h, m - 1, g.loop, d), y = f, d = b;
    }
    h < m - 1 && v(h, m - 1, g.loop, d);
  }
  return c;
}
function Xs(e) {
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
function bc(e, t) {
  if (!t)
    return !1;
  const n = [], a = function(s, o) {
    return is(o) ? (n.includes(o) || n.push(o), n.indexOf(o)) : o;
  };
  return JSON.stringify(e, a) !== JSON.stringify(t, a);
}
function ea(e, t, n) {
  return e.options.clip ? e[n] : t[n];
}
function vc(e, t) {
  const { xScale: n, yScale: a } = e;
  return n && a ? {
    left: ea(n, t, "left"),
    right: ea(n, t, "right"),
    top: ea(a, t, "top"),
    bottom: ea(a, t, "bottom")
  } : t;
}
function yc(e, t) {
  const n = t._clip;
  if (n.disabled)
    return !1;
  const a = vc(t, e.chartArea);
  return {
    left: n.left === !1 ? 0 : a.left - (n.left === !0 ? 0 : n.left),
    right: n.right === !1 ? e.width : a.right + (n.right === !0 ? 0 : n.right),
    top: n.top === !1 ? 0 : a.top - (n.top === !0 ? 0 : n.top),
    bottom: n.bottom === !1 ? e.height : a.bottom + (n.bottom === !0 ? 0 : n.bottom)
  };
}
class xc {
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
    this._request || (this._running = !0, this._request = fi.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let n = 0;
    this._charts.forEach((a, s) => {
      if (!a.running || !a.items.length)
        return;
      const o = a.items;
      let i = o.length - 1, l = !1, r;
      for (; i >= 0; --i)
        r = o[i], r._active ? (r._total > a.duration && (a.duration = r._total), r.tick(t), l = !0) : (o[i] = o[o.length - 1], o.pop());
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
var Dt = /* @__PURE__ */ new xc();
const Gs = "transparent", _c = {
  boolean(e, t, n) {
    return n > 0.5 ? t : e;
  },
  color(e, t, n) {
    const a = Vs(e || Gs), s = a.valid && Vs(t || Gs);
    return s && s.valid ? s.mix(a, n).hexString() : t;
  },
  number(e, t, n) {
    return e + (t - e) * n;
  }
};
class kc {
  constructor(t, n, a, s) {
    const o = n[a];
    s = Qn([
      t.to,
      s,
      o,
      t.from
    ]);
    const i = Qn([
      t.from,
      o,
      s
    ]);
    this._active = !0, this._fn = t.fn || _c[t.type || typeof i], this._easing = Pn[t.easing] || Pn.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = n, this._prop = a, this._from = i, this._to = s, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, n, a) {
    if (this._active) {
      this._notify(!1);
      const s = this._target[this._prop], o = a - this._start, i = this._duration - o;
      this._start = a, this._duration = Math.floor(Math.max(i, t.duration)), this._total += o, this._loop = !!t.loop, this._to = Qn([
        t.to,
        n,
        s,
        t.from
      ]), this._from = Qn([
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
    let r;
    if (this._active = o !== l && (i || n < a), !this._active) {
      this._target[s] = l, this._notify(!0);
      return;
    }
    if (n < 0) {
      this._target[s] = o;
      return;
    }
    r = n / a % 2, r = i && r > 1 ? 2 - r : r, r = this._easing(Math.min(1, Math.max(0, r))), this._target[s] = this._fn(o, l, r);
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
class Si {
  constructor(t, n) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(n);
  }
  configure(t) {
    if (!Ae(t))
      return;
    const n = Object.keys(We.animation), a = this._properties;
    Object.getOwnPropertyNames(t).forEach((s) => {
      const o = t[s];
      if (!Ae(o))
        return;
      const i = {};
      for (const l of n)
        i[l] = o[l];
      (Ye(o.properties) && o.properties || [
        s
      ]).forEach((l) => {
        (l === s || !a.has(l)) && a.set(l, i);
      });
    });
  }
  _animateOptions(t, n) {
    const a = n.options, s = Cc(t, a);
    if (!s)
      return [];
    const o = this._createAnimations(s, a);
    return a.$shared && wc(t.options.$animations, a).then(() => {
      t.options = a;
    }, () => {
    }), o;
  }
  _createAnimations(t, n) {
    const a = this._properties, s = [], o = t.$animations || (t.$animations = {}), i = Object.keys(n), l = Date.now();
    let r;
    for (r = i.length - 1; r >= 0; --r) {
      const c = i[r];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        s.push(...this._animateOptions(t, n));
        continue;
      }
      const d = n[c];
      let h = o[c];
      const m = a.get(c);
      if (h)
        if (m && h.active()) {
          h.update(m, d, l);
          continue;
        } else
          h.cancel();
      if (!m || !m.duration) {
        t[c] = d;
        continue;
      }
      o[c] = h = new kc(m, t, c, d), s.push(h);
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
      return Dt.add(this._chart, a), !0;
  }
}
function wc(e, t) {
  const n = [], a = Object.keys(t);
  for (let s = 0; s < a.length; s++) {
    const o = e[a[s]];
    o && o.active() && n.push(o.wait());
  }
  return Promise.all(n);
}
function Cc(e, t) {
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
function Zs(e, t) {
  const n = e && e.options || {}, a = n.reverse, s = n.min === void 0 ? t : 0, o = n.max === void 0 ? t : 0;
  return {
    start: a ? o : s,
    end: a ? s : o
  };
}
function $c(e, t, n) {
  if (n === !1)
    return !1;
  const a = Zs(e, n), s = Zs(t, n);
  return {
    top: s.end,
    right: a.end,
    bottom: s.start,
    left: a.start
  };
}
function Sc(e) {
  let t, n, a, s;
  return Ae(e) ? (t = e.top, n = e.right, a = e.bottom, s = e.left) : t = n = a = s = e, {
    top: t,
    right: n,
    bottom: a,
    left: s,
    disabled: e === !1
  };
}
function Mi(e, t) {
  const n = [], a = e._getSortedDatasetMetas(t);
  let s, o;
  for (s = 0, o = a.length; s < o; ++s)
    n.push(a[s].index);
  return n;
}
function Qs(e, t, n, a = {}) {
  const s = e.keys, o = a.mode === "single";
  let i, l, r, c;
  if (t === null)
    return;
  let d = !1;
  for (i = 0, l = s.length; i < l; ++i) {
    if (r = +s[i], r === n) {
      if (d = !0, a.all)
        continue;
      break;
    }
    c = e.values[r], ft(c) && (o || t === 0 || Ct(t) === Ct(c)) && (t += c);
  }
  return !d && !a.all ? 0 : t;
}
function Mc(e, t) {
  const { iScale: n, vScale: a } = t, s = n.axis === "x" ? "x" : "y", o = a.axis === "x" ? "x" : "y", i = Object.keys(e), l = new Array(i.length);
  let r, c, d;
  for (r = 0, c = i.length; r < c; ++r)
    d = i[r], l[r] = {
      [s]: d,
      [o]: e[d]
    };
  return l;
}
function La(e, t) {
  const n = e && e.options.stacked;
  return n || n === void 0 && t.stack !== void 0;
}
function Dc(e, t, n) {
  return `${e.id}.${t.id}.${n.stack || n.type}`;
}
function Tc(e) {
  const { min: t, max: n, minDefined: a, maxDefined: s } = e.getUserBounds();
  return {
    min: a ? t : Number.NEGATIVE_INFINITY,
    max: s ? n : Number.POSITIVE_INFINITY
  };
}
function Ac(e, t, n) {
  const a = e[t] || (e[t] = {});
  return a[n] || (a[n] = {});
}
function Js(e, t, n, a) {
  for (const s of t.getMatchingVisibleMetas(a).reverse()) {
    const o = e[s.index];
    if (n && o > 0 || !n && o < 0)
      return s.index;
  }
  return null;
}
function eo(e, t) {
  const { chart: n, _cachedMeta: a } = e, s = n._stacks || (n._stacks = {}), { iScale: o, vScale: i, index: l } = a, r = o.axis, c = i.axis, d = Dc(o, i, a), h = t.length;
  let m;
  for (let v = 0; v < h; ++v) {
    const g = t[v], { [r]: y, [c]: b } = g, f = g._stacks || (g._stacks = {});
    m = f[c] = Ac(s, d, y), m[l] = b, m._top = Js(m, i, !0, a.type), m._bottom = Js(m, i, !1, a.type);
    const x = m._visualValues || (m._visualValues = {});
    x[l] = b;
  }
}
function Pa(e, t) {
  const n = e.scales;
  return Object.keys(n).filter((a) => n[a].axis === t).shift();
}
function Bc(e, t) {
  return cn(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function Lc(e, t, n) {
  return cn(e, {
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
function xn(e, t) {
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
const Ia = (e) => e === "reset" || e === "none", to = (e, t) => t ? e : Object.assign({}, e), Pc = (e, t, n) => e && !t.hidden && t._stacked && {
  keys: Mi(n, !0),
  values: null
};
class Ca {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, n) {
    this.chart = t, this._ctx = t.ctx, this.index = n, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = La(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && xn(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, n = this._cachedMeta, a = this.getDataset(), s = (h, m, v, g) => h === "x" ? m : h === "r" ? g : v, o = n.xAxisID = _e(a.xAxisID, Pa(t, "x")), i = n.yAxisID = _e(a.yAxisID, Pa(t, "y")), l = n.rAxisID = _e(a.rAxisID, Pa(t, "r")), r = n.indexAxis, c = n.iAxisID = s(r, o, i, l), d = n.vAxisID = s(r, i, o, l);
    n.xScale = this.getScaleForId(o), n.yScale = this.getScaleForId(i), n.rScale = this.getScaleForId(l), n.iScale = this.getScaleForId(c), n.vScale = this.getScaleForId(d);
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
    this._data && Fs(this._data, this), t._stacked && xn(t);
  }
  _dataCheck() {
    const t = this.getDataset(), n = t.data || (t.data = []), a = this._data;
    if (Ae(n)) {
      const s = this._cachedMeta;
      this._data = Mc(n, s);
    } else if (a !== n) {
      if (a) {
        Fs(a, this);
        const s = this._cachedMeta;
        xn(s), s._parsed = [];
      }
      n && Object.isExtensible(n) && hr(n, this), this._syncList = [], this._data = n;
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
    n._stacked = La(n.vScale, n), n.stack !== a.stack && (s = !0, xn(n), n.stack = a.stack), this._resyncElements(t), (s || o !== n._stacked) && (eo(this, n._parsed), n._stacked = La(n.vScale, n));
  }
  configure() {
    const t = this.chart.config, n = t.datasetScopeKeys(this._type), a = t.getOptionScopes(this.getDataset(), n, !0);
    this.options = t.createResolver(a, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, n) {
    const { _cachedMeta: a, _data: s } = this, { iScale: o, _stacked: i } = a, l = o.axis;
    let r = t === 0 && n === s.length ? !0 : a._sorted, c = t > 0 && a._parsed[t - 1], d, h, m;
    if (this._parsing === !1)
      a._parsed = s, a._sorted = !0, m = s;
    else {
      Ye(s[t]) ? m = this.parseArrayData(a, s, t, n) : Ae(s[t]) ? m = this.parseObjectData(a, s, t, n) : m = this.parsePrimitiveData(a, s, t, n);
      const v = () => h[l] === null || c && h[l] < c[l];
      for (d = 0; d < n; ++d)
        a._parsed[d + t] = h = m[d], r && (v() && (r = !1), c = h);
      a._sorted = r;
    }
    i && eo(this, m);
  }
  parsePrimitiveData(t, n, a, s) {
    const { iScale: o, vScale: i } = t, l = o.axis, r = i.axis, c = o.getLabels(), d = o === i, h = new Array(s);
    let m, v, g;
    for (m = 0, v = s; m < v; ++m)
      g = m + a, h[m] = {
        [l]: d || o.parse(c[g], g),
        [r]: i.parse(n[g], g)
      };
    return h;
  }
  parseArrayData(t, n, a, s) {
    const { xScale: o, yScale: i } = t, l = new Array(s);
    let r, c, d, h;
    for (r = 0, c = s; r < c; ++r)
      d = r + a, h = n[d], l[r] = {
        x: o.parse(h[0], d),
        y: i.parse(h[1], d)
      };
    return l;
  }
  parseObjectData(t, n, a, s) {
    const { xScale: o, yScale: i } = t, { xAxisKey: l = "x", yAxisKey: r = "y" } = this._parsing, c = new Array(s);
    let d, h, m, v;
    for (d = 0, h = s; d < h; ++d)
      m = d + a, v = n[m], c[d] = {
        x: o.parse(ln(v, l), m),
        y: i.parse(ln(v, r), m)
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
      keys: Mi(s, !0),
      values: n._stacks[t.axis]._visualValues
    };
    return Qs(l, i, o.index, {
      mode: a
    });
  }
  updateRangeFromParsed(t, n, a, s) {
    const o = a[n.axis];
    let i = o === null ? NaN : o;
    const l = s && a._stacks[n.axis];
    s && l && (s.values = l, i = Qs(s, o, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, n) {
    const a = this._cachedMeta, s = a._parsed, o = a._sorted && t === a.iScale, i = s.length, l = this._getOtherScale(t), r = Pc(n, a, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: d, max: h } = Tc(l);
    let m, v;
    function g() {
      v = s[m];
      const y = v[l.axis];
      return !ft(v[t.axis]) || d > y || h < y;
    }
    for (m = 0; m < i && !(!g() && (this.updateRangeFromParsed(c, t, v, r), o)); ++m)
      ;
    if (o) {
      for (m = i - 1; m >= 0; --m)
        if (!g()) {
          this.updateRangeFromParsed(c, t, v, r);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const n = this._cachedMeta._parsed, a = [];
    let s, o, i;
    for (s = 0, o = n.length; s < o; ++s)
      i = n[s][t.axis], ft(i) && a.push(i);
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
    this.update(t || "default"), n._clip = Sc(_e(this.options.clip, $c(n.xScale, n.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, n = this.chart, a = this._cachedMeta, s = a.data || [], o = n.chartArea, i = [], l = this._drawStart || 0, r = this._drawCount || s.length - l, c = this.options.drawActiveElementsOnTop;
    let d;
    for (a.dataset && a.dataset.draw(t, o, l, r), d = l; d < l + r; ++d) {
      const h = s[d];
      h.hidden || (h.active && c ? i.push(h) : h.draw(t, o));
    }
    for (d = 0; d < i.length; ++d)
      i[d].draw(t, o);
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
      o = i.$context || (i.$context = Lc(this.getContext(), t, i)), o.parsed = this.getParsed(t), o.raw = s.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = Bc(this.chart.getContext(), this.index)), o.dataset = s, o.index = o.datasetIndex = this.index;
    return o.active = !!n, o.mode = a, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, n) {
    return this._resolveElementOptions(this.dataElementType.id, n, t);
  }
  _resolveElementOptions(t, n = "default", a) {
    const s = n === "active", o = this._cachedDataOpts, i = t + "-" + n, l = o[i], r = this.enableOptionSharing && On(a);
    if (l)
      return to(l, r);
    const c = this.chart.config, d = c.datasetElementScopeKeys(this._type, t), h = s ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], m = c.getOptionScopes(this.getDataset(), d), v = Object.keys(We.elements[t]), g = () => this.getContext(a, s, n), y = c.resolveNamedOptions(m, v, g, h);
    return y.$shared && (y.$shared = r, o[i] = Object.freeze(to(y, r))), y;
  }
  _resolveAnimations(t, n, a) {
    const s = this.chart, o = this._cachedDataOpts, i = `animation-${n}`, l = o[i];
    if (l)
      return l;
    let r;
    if (s.options.animation !== !1) {
      const d = this.chart.config, h = d.datasetAnimationScopeKeys(this._type, n), m = d.getOptionScopes(this.getDataset(), h);
      r = d.createResolver(m, this.getContext(t, a, n));
    }
    const c = new Si(s, r && r.animations);
    return r && r._cacheable && (o[i] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, n) {
    return !n || Ia(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, n) {
    const a = this.resolveDataElementOptions(t, n), s = this._sharedOptions, o = this.getSharedOptions(a), i = this.includeOptions(n, o) || o !== s;
    return this.updateSharedOptions(o, n, a), {
      sharedOptions: o,
      includeOptions: i
    };
  }
  updateElement(t, n, a, s) {
    Ia(s) ? Object.assign(t, a) : this._resolveAnimations(n, s).update(t, a);
  }
  updateSharedOptions(t, n, a) {
    t && !Ia(n) && this._resolveAnimations(void 0, n).update(t, a);
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
    for (const [l, r, c] of this._syncList)
      this[l](r, c);
    this._syncList = [];
    const s = a.length, o = n.length, i = Math.min(o, s);
    i && this.parse(0, i), o > s ? this._insertElements(s, o - s, t) : o < s && this._removeElements(o, s - o);
  }
  _insertElements(t, n, a = !0) {
    const s = this._cachedMeta, o = s.data, i = t + n;
    let l;
    const r = (c) => {
      for (c.length += n, l = c.length - 1; l >= i; l--)
        c[l] = c[l - n];
    };
    for (r(o), l = t; l < i; ++l)
      o[l] = new this.dataElementType();
    this._parsing && r(s._parsed), this.parse(t, n), a && this.updateElements(o, t, n, "reset");
  }
  updateElements(t, n, a, s) {
  }
  _removeElements(t, n) {
    const a = this._cachedMeta;
    if (this._parsing) {
      const s = a._parsed.splice(t, n);
      a._stacked && xn(a, s);
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
function Ic(e, t) {
  if (!e._cache.$bar) {
    const n = e.getMatchingVisibleMetas(t);
    let a = [];
    for (let s = 0, o = n.length; s < o; s++)
      a = a.concat(n[s].controller.getAllParsedValues(e));
    e._cache.$bar = hi(a.sort((s, o) => s - o));
  }
  return e._cache.$bar;
}
function Rc(e) {
  const t = e.iScale, n = Ic(t, e.type);
  let a = t._length, s, o, i, l;
  const r = () => {
    i === 32767 || i === -32768 || (On(l) && (a = Math.min(a, Math.abs(i - l) || a)), l = i);
  };
  for (s = 0, o = n.length; s < o; ++s)
    i = t.getPixelForValue(n[s]), r();
  for (l = void 0, s = 0, o = t.ticks.length; s < o; ++s)
    i = t.getPixelForTick(s), r();
  return a;
}
function Fc(e, t, n, a) {
  const s = n.barThickness;
  let o, i;
  return Ie(s) ? (o = t.min * n.categoryPercentage, i = n.barPercentage) : (o = s * a, i = 1), {
    chunk: o / a,
    ratio: i,
    start: t.pixels[e] - o / 2
  };
}
function Ec(e, t, n, a) {
  const s = t.pixels, o = s[e];
  let i = e > 0 ? s[e - 1] : null, l = e < s.length - 1 ? s[e + 1] : null;
  const r = n.categoryPercentage;
  i === null && (i = o - (l === null ? t.end - t.start : l - o)), l === null && (l = o + o - i);
  const c = o - (o - Math.min(i, l)) / 2 * r;
  return {
    chunk: Math.abs(l - i) / 2 * r / a,
    ratio: n.barPercentage,
    start: c
  };
}
function Oc(e, t, n, a) {
  const s = n.parse(e[0], a), o = n.parse(e[1], a), i = Math.min(s, o), l = Math.max(s, o);
  let r = i, c = l;
  Math.abs(i) > Math.abs(l) && (r = l, c = i), t[n.axis] = c, t._custom = {
    barStart: r,
    barEnd: c,
    start: s,
    end: o,
    min: i,
    max: l
  };
}
function Di(e, t, n, a) {
  return Ye(e) ? Oc(e, t, n, a) : t[n.axis] = n.parse(e, a), t;
}
function no(e, t, n, a) {
  const s = e.iScale, o = e.vScale, i = s.getLabels(), l = s === o, r = [];
  let c, d, h, m;
  for (c = n, d = n + a; c < d; ++c)
    m = t[c], h = {}, h[s.axis] = l || s.parse(i[c], c), r.push(Di(m, h, o, c));
  return r;
}
function Ra(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function Vc(e, t, n) {
  return e !== 0 ? Ct(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= n ? 1 : -1);
}
function zc(e) {
  let t, n, a, s, o;
  return e.horizontal ? (t = e.base > e.x, n = "left", a = "right") : (t = e.base < e.y, n = "bottom", a = "top"), t ? (s = "end", o = "start") : (s = "start", o = "end"), {
    start: n,
    end: a,
    reverse: t,
    top: s,
    bottom: o
  };
}
function Nc(e, t, n, a) {
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
  const { start: i, end: l, reverse: r, top: c, bottom: d } = zc(e);
  s === "middle" && n && (e.enableBorderRadius = !0, (n._top || 0) === a ? s = c : (n._bottom || 0) === a ? s = d : (o[ao(d, i, l, r)] = !0, s = c)), o[ao(s, i, l, r)] = !0, e.borderSkipped = o;
}
function ao(e, t, n, a) {
  return a ? (e = Wc(e, t, n), e = so(e, n, t)) : e = so(e, t, n), e;
}
function Wc(e, t, n) {
  return e === t ? n : e === n ? t : e;
}
function so(e, t, n) {
  return e === "start" ? t : e === "end" ? n : e;
}
function Hc(e, { inflateAmount: t }, n) {
  e.inflateAmount = t === "auto" ? n === 1 ? 0.33 : 0 : t;
}
class jc extends Ca {
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
    return no(t, n, a, s);
  }
  parseArrayData(t, n, a, s) {
    return no(t, n, a, s);
  }
  parseObjectData(t, n, a, s) {
    const { iScale: o, vScale: i } = t, { xAxisKey: l = "x", yAxisKey: r = "y" } = this._parsing, c = o.axis === "x" ? l : r, d = i.axis === "x" ? l : r, h = [];
    let m, v, g, y;
    for (m = a, v = a + s; m < v; ++m)
      y = n[m], g = {}, g[o.axis] = o.parse(ln(y, c), m), h.push(Di(ln(y, d), g, i, m));
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
    const n = this._cachedMeta, { iScale: a, vScale: s } = n, o = this.getParsed(t), i = o._custom, l = Ra(i) ? "[" + i.start + ", " + i.end + "]" : "" + s.getLabelForValue(o[s.axis]);
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
    const o = s === "reset", { index: i, _cachedMeta: { vScale: l } } = this, r = l.getBasePixel(), c = l.isHorizontal(), d = this._getRuler(), { sharedOptions: h, includeOptions: m } = this._getSharedOptions(n, s);
    for (let v = n; v < n + a; v++) {
      const g = this.getParsed(v), y = o || Ie(g[l.axis]) ? {
        base: r,
        head: r
      } : this._calculateBarValuePixels(v), b = this._calculateBarIndexPixels(v, d), f = (g._stacks || {})[l.axis], x = {
        horizontal: c,
        base: y.base,
        enableBorderRadius: !f || Ra(g._custom) || i === f._top || i === f._bottom,
        x: c ? y.head : b.center,
        y: c ? b.center : y.head,
        height: c ? b.size : Math.abs(y.size),
        width: c ? Math.abs(y.size) : b.size
      };
      m && (x.options = h || this.resolveDataElementOptions(v, t[v].active ? "active" : s));
      const _ = x.options || t[v].options;
      Nc(x, _, f, i), Hc(x, _, d.ratio), this.updateElement(t[v], v, x, s);
    }
  }
  _getStacks(t, n) {
    const { iScale: a } = this._cachedMeta, s = a.getMatchingVisibleMetas(this._type).filter((d) => d.controller.options.grouped), o = a.options.stacked, i = [], l = this._cachedMeta.controller.getParsed(n), r = l && l[a.axis], c = (d) => {
      const h = d._parsed.find((v) => v[a.axis] === r), m = h && h[d.vScale.axis];
      if (Ie(m) || isNaN(m))
        return !0;
    };
    for (const d of s)
      if (!(n !== void 0 && c(d)) && ((o === !1 || i.indexOf(d.stack) === -1 || o === void 0 && d.stack === void 0) && i.push(d.stack), d.index === t))
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
      t[_e(this.chart.options.indexAxis === "x" ? a.xAxisID : a.yAxisID, n)] = !0;
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
      min: l || Rc(n),
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
    const { _cachedMeta: { vScale: n, _stacked: a, index: s }, options: { base: o, minBarLength: i } } = this, l = o || 0, r = this.getParsed(t), c = r._custom, d = Ra(c);
    let h = r[n.axis], m = 0, v = a ? this.applyStack(n, r, a) : h, g, y;
    v !== h && (m = v - h, v = h), d && (h = c.barStart, v = c.barEnd - c.barStart, h !== 0 && Ct(h) !== Ct(c.barEnd) && (m = 0), m += h);
    const b = !Ie(o) && !d ? o : m;
    let f = n.getPixelForValue(b);
    if (this.chart.getDataVisibility(t) ? g = n.getPixelForValue(m + v) : g = f, y = g - f, Math.abs(y) < i) {
      y = Vc(y, n, l) * i, h === l && (f -= y / 2);
      const x = n.getPixelForDecimal(0), _ = n.getPixelForDecimal(1), w = Math.min(x, _), C = Math.max(x, _);
      f = Math.max(Math.min(f, C), w), g = f + y, a && !d && (r._stacks[n.axis]._visualValues[s] = n.getValueForPixel(g) - n.getValueForPixel(f));
    }
    if (f === n.getPixelForValue(l)) {
      const x = Ct(y) * n.getLineWidthForValue(l) / 2;
      f += x, y -= x;
    }
    return {
      size: y,
      base: f,
      head: g,
      center: g + y / 2
    };
  }
  _calculateBarIndexPixels(t, n) {
    const a = n.scale, s = this.options, o = s.skipNull, i = _e(s.maxBarThickness, 1 / 0);
    let l, r;
    const c = this._getAxisCount();
    if (n.grouped) {
      const d = o ? this._getStackCount(t) : n.stackCount, h = s.barThickness === "flex" ? Ec(t, n, s, d * c) : Fc(t, n, s, d * c), m = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, v = this._getAxis().indexOf(_e(m, this.getFirstScaleIdForIndexAxis())), g = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + v;
      l = h.start + h.chunk * g + h.chunk / 2, r = Math.min(i, h.chunk * h.ratio);
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
    const t = this._cachedMeta, n = t.vScale, a = t.data, s = a.length;
    let o = 0;
    for (; o < s; ++o)
      this.getParsed(o)[n.axis] !== null && !a[o].hidden && a[o].draw(this._ctx);
  }
}
function Yc(e, t, n) {
  let a = 1, s = 1, o = 0, i = 0;
  if (t < Ne) {
    const l = e, r = l + t, c = Math.cos(l), d = Math.sin(l), h = Math.cos(r), m = Math.sin(r), v = (_, w, C) => zn(_, l, r, !0) ? 1 : Math.max(w, w * n, C, C * n), g = (_, w, C) => zn(_, l, r, !0) ? -1 : Math.min(w, w * n, C, C * n), y = v(0, c, h), b = v(Ke, d, m), f = g(Fe, c, h), x = g(Fe + Ke, d, m);
    a = (y - f) / 2, s = (b - x) / 2, o = -(y + f) / 2, i = -(b + x) / 2;
  }
  return {
    ratioX: a,
    ratioY: s,
    offsetX: o,
    offsetY: i
  };
}
class Kc extends Ca {
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
            return n.labels.length && n.datasets.length ? n.labels.map((r, c) => {
              const h = t.getDatasetMeta(0).controller.getStyle(c);
              return {
                text: r,
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
      let o = (r) => +a[r];
      if (Ae(a[t])) {
        const { key: r = "value" } = this._parsing;
        o = (c) => +ln(a[c], r);
      }
      let i, l;
      for (i = t, l = t + n; i < l; ++i)
        s._parsed[i] = o(i);
    }
  }
  _getRotation() {
    return Bt(this.options.rotation - 90);
  }
  _getCircumference() {
    return Bt(this.options.circumference);
  }
  _getRotationExtents() {
    let t = Ne, n = -Ne;
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
    const n = this.chart, { chartArea: a } = n, s = this._cachedMeta, o = s.data, i = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, l = Math.max((Math.min(a.width, a.height) - i) / 2, 0), r = Math.min(Xl(this.options.cutout, l), 1), c = this._getRingWeight(this.index), { circumference: d, rotation: h } = this._getRotationExtents(), { ratioX: m, ratioY: v, offsetX: g, offsetY: y } = Yc(h, d, r), b = (a.width - i) / m, f = (a.height - i) / v, x = Math.max(Math.min(b, f) / 2, 0), _ = li(this.options.radius, x), w = Math.max(_ * r, 0), C = (_ - w) / this._getVisibleDatasetWeightTotal();
    this.offsetX = g * _, this.offsetY = y * _, s.total = this.calculateTotal(), this.outerRadius = _ - C * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - C * c, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, n) {
    const a = this.options, s = this._cachedMeta, o = this._getCircumference();
    return n && a.animation.animateRotate || !this.chart.getDataVisibility(t) || s._parsed[t] === null || s.data[t].hidden ? 0 : this.calculateCircumference(s._parsed[t] * o / Ne);
  }
  updateElements(t, n, a, s) {
    const o = s === "reset", i = this.chart, l = i.chartArea, c = i.options.animation, d = (l.left + l.right) / 2, h = (l.top + l.bottom) / 2, m = o && c.animateScale, v = m ? 0 : this.innerRadius, g = m ? 0 : this.outerRadius, { sharedOptions: y, includeOptions: b } = this._getSharedOptions(n, s);
    let f = this._getRotation(), x;
    for (x = 0; x < n; ++x)
      f += this._circumference(x, o);
    for (x = n; x < n + a; ++x) {
      const _ = this._circumference(x, o), w = t[x], C = {
        x: d + this.offsetX,
        y: h + this.offsetY,
        startAngle: f,
        endAngle: f + _,
        circumference: _,
        outerRadius: g,
        innerRadius: v
      };
      b && (C.options = y || this.resolveDataElementOptions(x, w.active ? "active" : s)), f += _, this.updateElement(w, x, C, s);
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
    return n > 0 && !isNaN(t) ? Ne * (Math.abs(t) / n) : 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, a = this.chart, s = a.data.labels || [], o = ls(n._parsed[t], a.options.locale);
    return {
      label: s[t] || "",
      value: o
    };
  }
  getMaxBorderWidth(t) {
    let n = 0;
    const a = this.chart;
    let s, o, i, l, r;
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
      r = l.resolveDataElementOptions(s), r.borderAlign !== "inner" && (n = Math.max(n, r.borderWidth || 0, r.hoverBorderWidth || 0));
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
    return Math.max(_e(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class Uc extends Ca {
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
    let { start: l, count: r } = mr(n, s, i);
    this._drawStart = l, this._drawCount = r, pr(n) && (l = 0, r = s.length), a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!o._decimated, a.points = s;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(a, void 0, {
      animated: !i,
      options: c
    }, t), this.updateElements(s, l, r, t);
  }
  updateElements(t, n, a, s) {
    const o = s === "reset", { iScale: i, vScale: l, _stacked: r, _dataset: c } = this._cachedMeta, { sharedOptions: d, includeOptions: h } = this._getSharedOptions(n, s), m = i.axis, v = l.axis, { spanGaps: g, segment: y } = this.options, b = Vn(g) ? g : Number.POSITIVE_INFINITY, f = this.chart._animationsDisabled || o || s === "none", x = n + a, _ = t.length;
    let w = n > 0 && this.getParsed(n - 1);
    for (let C = 0; C < _; ++C) {
      const M = t[C], S = f ? M : {};
      if (C < n || C >= x) {
        S.skip = !0;
        continue;
      }
      const R = this.getParsed(C), V = Ie(R[v]), E = S[m] = i.getPixelForValue(R[m], C), A = S[v] = o || V ? l.getBasePixel() : l.getPixelForValue(r ? this.applyStack(l, R, r) : R[v], C);
      S.skip = isNaN(E) || isNaN(A) || V, S.stop = C > 0 && Math.abs(R[m] - w[m]) > b, y && (S.parsed = R, S.raw = c.data[C]), h && (S.options = d || this.resolveDataElementOptions(C, M.active ? "active" : s)), f || this.updateElement(M, C, S, s), w = R;
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
class qc extends Kc {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function Zt() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class ps {
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
    Object.assign(ps.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return Zt();
  }
  parse() {
    return Zt();
  }
  format() {
    return Zt();
  }
  add() {
    return Zt();
  }
  diff() {
    return Zt();
  }
  startOf() {
    return Zt();
  }
  endOf() {
    return Zt();
  }
}
var Xc = {
  _date: ps
};
function Gc(e, t, n, a) {
  const { controller: s, data: o, _sorted: i } = e, l = s._cachedMeta.iScale, r = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (l && t === l.axis && t !== "r" && i && o.length) {
    const c = l._reversePixels ? dr : nn;
    if (a) {
      if (s._sharedOptions) {
        const d = o[0], h = typeof d.getRange == "function" && d.getRange(t);
        if (h) {
          const m = c(o, t, n - h), v = c(o, t, n + h);
          return {
            lo: m.lo,
            hi: v.hi
          };
        }
      }
    } else {
      const d = c(o, t, n);
      if (r) {
        const { vScale: h } = s._cachedMeta, { _parsed: m } = e, v = m.slice(0, d.lo + 1).reverse().findIndex((y) => !Ie(y[h.axis]));
        d.lo -= Math.max(0, v);
        const g = m.slice(d.hi).findIndex((y) => !Ie(y[h.axis]));
        d.hi += Math.max(0, g);
      }
      return d;
    }
  }
  return {
    lo: 0,
    hi: o.length - 1
  };
}
function $a(e, t, n, a, s) {
  const o = e.getSortedVisibleDatasetMetas(), i = n[t];
  for (let l = 0, r = o.length; l < r; ++l) {
    const { index: c, data: d } = o[l], { lo: h, hi: m } = Gc(o[l], t, i, s);
    for (let v = h; v <= m; ++v) {
      const g = d[v];
      g.skip || a(g, c, v);
    }
  }
}
function Zc(e) {
  const t = e.indexOf("x") !== -1, n = e.indexOf("y") !== -1;
  return function(a, s) {
    const o = t ? Math.abs(a.x - s.x) : 0, i = n ? Math.abs(a.y - s.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(i, 2));
  };
}
function Fa(e, t, n, a, s) {
  const o = [];
  return !s && !e.isPointInArea(t) || $a(e, n, t, function(l, r, c) {
    !s && !Nn(l, e.chartArea, 0) || l.inRange(t.x, t.y, a) && o.push({
      element: l,
      datasetIndex: r,
      index: c
    });
  }, !0), o;
}
function Qc(e, t, n, a) {
  let s = [];
  function o(i, l, r) {
    const { startAngle: c, endAngle: d } = i.getProps([
      "startAngle",
      "endAngle"
    ], a), { angle: h } = di(i, {
      x: t.x,
      y: t.y
    });
    zn(h, c, d) && s.push({
      element: i,
      datasetIndex: l,
      index: r
    });
  }
  return $a(e, n, t, o), s;
}
function Jc(e, t, n, a, s, o) {
  let i = [];
  const l = Zc(n);
  let r = Number.POSITIVE_INFINITY;
  function c(d, h, m) {
    const v = d.inRange(t.x, t.y, s);
    if (a && !v)
      return;
    const g = d.getCenterPoint(s);
    if (!(!!o || e.isPointInArea(g)) && !v)
      return;
    const b = l(t, g);
    b < r ? (i = [
      {
        element: d,
        datasetIndex: h,
        index: m
      }
    ], r = b) : b === r && i.push({
      element: d,
      datasetIndex: h,
      index: m
    });
  }
  return $a(e, n, t, c), i;
}
function Ea(e, t, n, a, s, o) {
  return !o && !e.isPointInArea(t) ? [] : n === "r" && !a ? Qc(e, t, n, s) : Jc(e, t, n, a, s, o);
}
function oo(e, t, n, a, s) {
  const o = [], i = n === "x" ? "inXRange" : "inYRange";
  let l = !1;
  return $a(e, n, t, (r, c, d) => {
    r[i] && r[i](t[n], s) && (o.push({
      element: r,
      datasetIndex: c,
      index: d
    }), l = l || r.inRange(t.x, t.y, s));
  }), a && !l ? [] : o;
}
var ed = {
  modes: {
    index(e, t, n, a) {
      const s = Jt(t, e), o = n.axis || "x", i = n.includeInvisible || !1, l = n.intersect ? Fa(e, s, o, a, i) : Ea(e, s, o, !1, a, i), r = [];
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
      const s = Jt(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      let l = n.intersect ? Fa(e, s, o, a, i) : Ea(e, s, o, !1, a, i);
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
      const s = Jt(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      return Fa(e, s, o, a, i);
    },
    nearest(e, t, n, a) {
      const s = Jt(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      return Ea(e, s, o, n.intersect, a, i);
    },
    x(e, t, n, a) {
      const s = Jt(t, e);
      return oo(e, s, "x", n.intersect, a);
    },
    y(e, t, n, a) {
      const s = Jt(t, e);
      return oo(e, s, "y", n.intersect, a);
    }
  }
};
const Ti = [
  "left",
  "top",
  "right",
  "bottom"
];
function _n(e, t) {
  return e.filter((n) => n.pos === t);
}
function io(e, t) {
  return e.filter((n) => Ti.indexOf(n.pos) === -1 && n.box.axis === t);
}
function kn(e, t) {
  return e.sort((n, a) => {
    const s = t ? a : n, o = t ? n : a;
    return s.weight === o.weight ? s.index - o.index : s.weight - o.weight;
  });
}
function td(e) {
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
function nd(e) {
  const t = {};
  for (const n of e) {
    const { stack: a, pos: s, stackWeight: o } = n;
    if (!a || !Ti.includes(s))
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
function ad(e, t) {
  const n = nd(e), { vBoxMaxWidth: a, hBoxMaxHeight: s } = t;
  let o, i, l;
  for (o = 0, i = e.length; o < i; ++o) {
    l = e[o];
    const { fullSize: r } = l.box, c = n[l.stack], d = c && l.stackWeight / c.weight;
    l.horizontal ? (l.width = d ? d * a : r && t.availableWidth, l.height = s) : (l.width = a, l.height = d ? d * s : r && t.availableHeight);
  }
  return n;
}
function sd(e) {
  const t = td(e), n = kn(t.filter((c) => c.box.fullSize), !0), a = kn(_n(t, "left"), !0), s = kn(_n(t, "right")), o = kn(_n(t, "top"), !0), i = kn(_n(t, "bottom")), l = io(t, "x"), r = io(t, "y");
  return {
    fullSize: n,
    leftAndTop: a.concat(o),
    rightAndBottom: s.concat(r).concat(i).concat(l),
    chartArea: _n(t, "chartArea"),
    vertical: a.concat(s).concat(r),
    horizontal: o.concat(i).concat(l)
  };
}
function lo(e, t, n, a) {
  return Math.max(e[n], t[n]) + Math.max(e[a], t[a]);
}
function Ai(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function od(e, t, n, a) {
  const { pos: s, box: o } = n, i = e.maxPadding;
  if (!Ae(s)) {
    n.size && (e[s] -= n.size);
    const h = a[n.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, n.horizontal ? o.height : o.width), n.size = h.size / h.count, e[s] += n.size;
  }
  o.getPadding && Ai(i, o.getPadding());
  const l = Math.max(0, t.outerWidth - lo(i, e, "left", "right")), r = Math.max(0, t.outerHeight - lo(i, e, "top", "bottom")), c = l !== e.w, d = r !== e.h;
  return e.w = l, e.h = r, n.horizontal ? {
    same: c,
    other: d
  } : {
    same: d,
    other: c
  };
}
function id(e) {
  const t = e.maxPadding;
  function n(a) {
    const s = Math.max(t[a] - e[a], 0);
    return e[a] += s, s;
  }
  e.y += n("top"), e.x += n("left"), n("right"), n("bottom");
}
function ld(e, t) {
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
function Tn(e, t, n, a) {
  const s = [];
  let o, i, l, r, c, d;
  for (o = 0, i = e.length, c = 0; o < i; ++o) {
    l = e[o], r = l.box, r.update(l.width || t.w, l.height || t.h, ld(l.horizontal, t));
    const { same: h, other: m } = od(t, n, l, a);
    c |= h && s.length, d = d || m, r.fullSize || s.push(l);
  }
  return c && Tn(s, t, n, a) || d;
}
function ta(e, t, n, a, s) {
  e.top = n, e.left = t, e.right = t + a, e.bottom = n + s, e.width = a, e.height = s;
}
function ro(e, t, n, a) {
  const s = n.padding;
  let { x: o, y: i } = t;
  for (const l of e) {
    const r = l.box, c = a[l.stack] || {
      placed: 0,
      weight: 1
    }, d = l.stackWeight / c.weight || 1;
    if (l.horizontal) {
      const h = t.w * d, m = c.size || r.height;
      On(c.start) && (i = c.start), r.fullSize ? ta(r, s.left, i, n.outerWidth - s.right - s.left, m) : ta(r, t.left + c.placed, i, h, m), c.start = i, c.placed += h, i = r.bottom;
    } else {
      const h = t.h * d, m = c.size || r.width;
      On(c.start) && (o = c.start), r.fullSize ? ta(r, o, s.top, m, n.outerHeight - s.bottom - s.top) : ta(r, o, t.top + c.placed, m, h), c.start = o, c.placed += h, o = r.right;
    }
  }
  t.x = o, t.y = i;
}
var ht = {
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
    const s = gt(e.options.layout.padding), o = Math.max(t - s.width, 0), i = Math.max(n - s.height, 0), l = sd(e.boxes), r = l.vertical, c = l.horizontal;
    Re(e.boxes, (y) => {
      typeof y.beforeLayout == "function" && y.beforeLayout();
    });
    const d = r.reduce((y, b) => b.box.options && b.box.options.display === !1 ? y : y + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: n,
      padding: s,
      availableWidth: o,
      availableHeight: i,
      vBoxMaxWidth: o / 2 / d,
      hBoxMaxHeight: i / 2
    }), m = Object.assign({}, s);
    Ai(m, gt(a));
    const v = Object.assign({
      maxPadding: m,
      w: o,
      h: i,
      x: s.left,
      y: s.top
    }, s), g = ad(r.concat(c), h);
    Tn(l.fullSize, v, h, g), Tn(r, v, h, g), Tn(c, v, h, g) && Tn(r, v, h, g), id(v), ro(l.leftAndTop, v, h, g), v.x += v.w, v.y += v.h, ro(l.rightAndBottom, v, h, g), e.chartArea = {
      left: v.left,
      top: v.top,
      right: v.left + v.w,
      bottom: v.top + v.h,
      height: v.h,
      width: v.w
    }, Re(l.chartArea, (y) => {
      const b = y.box;
      Object.assign(b, e.chartArea), b.update(v.w, v.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class Bi {
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
class rd extends Bi {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const ca = "$chartjs", cd = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, co = (e) => e === null || e === "";
function dd(e, t) {
  const n = e.style, a = e.getAttribute("height"), s = e.getAttribute("width");
  if (e[ca] = {
    initial: {
      height: a,
      width: s,
      style: {
        display: n.display,
        height: n.height,
        width: n.width
      }
    }
  }, n.display = n.display || "block", n.boxSizing = n.boxSizing || "border-box", co(s)) {
    const o = Ks(e, "width");
    o !== void 0 && (e.width = o);
  }
  if (co(a))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const o = Ks(e, "height");
      o !== void 0 && (e.height = o);
    }
  return e;
}
const Li = oc ? {
  passive: !0
} : !1;
function ud(e, t, n) {
  e && e.addEventListener(t, n, Li);
}
function hd(e, t, n) {
  e && e.canvas && e.canvas.removeEventListener(t, n, Li);
}
function fd(e, t) {
  const n = cd[e.type] || e.type, { x: a, y: s } = Jt(e, t);
  return {
    type: n,
    chart: t,
    native: e,
    x: a !== void 0 ? a : null,
    y: s !== void 0 ? s : null
  };
}
function ba(e, t) {
  for (const n of e)
    if (n === t || n.contains(t))
      return !0;
}
function gd(e, t, n) {
  const a = e.canvas, s = new MutationObserver((o) => {
    let i = !1;
    for (const l of o)
      i = i || ba(l.addedNodes, a), i = i && !ba(l.removedNodes, a);
    i && n();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
function md(e, t, n) {
  const a = e.canvas, s = new MutationObserver((o) => {
    let i = !1;
    for (const l of o)
      i = i || ba(l.removedNodes, a), i = i && !ba(l.addedNodes, a);
    i && n();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
const Hn = /* @__PURE__ */ new Map();
let uo = 0;
function Pi() {
  const e = window.devicePixelRatio;
  e !== uo && (uo = e, Hn.forEach((t, n) => {
    n.currentDevicePixelRatio !== e && t();
  }));
}
function pd(e, t) {
  Hn.size || window.addEventListener("resize", Pi), Hn.set(e, t);
}
function bd(e) {
  Hn.delete(e), Hn.size || window.removeEventListener("resize", Pi);
}
function vd(e, t, n) {
  const a = e.canvas, s = a && ms(a);
  if (!s)
    return;
  const o = gi((l, r) => {
    const c = s.clientWidth;
    n(l, r), c < s.clientWidth && n();
  }, window), i = new ResizeObserver((l) => {
    const r = l[0], c = r.contentRect.width, d = r.contentRect.height;
    c === 0 && d === 0 || o(c, d);
  });
  return i.observe(s), pd(e, o), i;
}
function Oa(e, t, n) {
  n && n.disconnect(), t === "resize" && bd(e);
}
function yd(e, t, n) {
  const a = e.canvas, s = gi((o) => {
    e.ctx !== null && n(fd(o, e));
  }, e);
  return ud(a, t, s), s;
}
class xd extends Bi {
  acquireContext(t, n) {
    const a = t && t.getContext && t.getContext("2d");
    return a && a.canvas === t ? (dd(t, n), a) : null;
  }
  releaseContext(t) {
    const n = t.canvas;
    if (!n[ca])
      return !1;
    const a = n[ca].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const i = a[o];
      Ie(i) ? n.removeAttribute(o) : n.setAttribute(o, i);
    });
    const s = a.style || {};
    return Object.keys(s).forEach((o) => {
      n.style[o] = s[o];
    }), n.width = n.width, delete n[ca], !0;
  }
  addEventListener(t, n, a) {
    this.removeEventListener(t, n);
    const s = t.$proxies || (t.$proxies = {}), i = {
      attach: gd,
      detach: md,
      resize: vd
    }[n] || yd;
    s[n] = i(t, n, a);
  }
  removeEventListener(t, n) {
    const a = t.$proxies || (t.$proxies = {}), s = a[n];
    if (!s)
      return;
    ({
      attach: Oa,
      detach: Oa,
      resize: Oa
    }[n] || hd)(t, n, s), a[n] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, n, a, s) {
    return sc(t, n, a, s);
  }
  isAttached(t) {
    const n = t && ms(t);
    return !!(n && n.isConnected);
  }
}
function _d(e) {
  return !gs() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? rd : xd;
}
let Pt = class {
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
    return Vn(this.x) && Vn(this.y);
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
function kd(e, t) {
  const n = e.options.ticks, a = wd(e), s = Math.min(n.maxTicksLimit || a, a), o = n.major.enabled ? $d(t) : [], i = o.length, l = o[0], r = o[i - 1], c = [];
  if (i > s)
    return Sd(t, c, o, i / s), c;
  const d = Cd(o, t, s);
  if (i > 0) {
    let h, m;
    const v = i > 1 ? Math.round((r - l) / (i - 1)) : null;
    for (na(t, c, d, Ie(v) ? 0 : l - v, l), h = 0, m = i - 1; h < m; h++)
      na(t, c, d, o[h], o[h + 1]);
    return na(t, c, d, r, Ie(v) ? t.length : r + v), c;
  }
  return na(t, c, d), c;
}
function wd(e) {
  const t = e.options.offset, n = e._tickSize(), a = e._length / n + (t ? 0 : 1), s = e._maxLength / n;
  return Math.floor(Math.min(a, s));
}
function Cd(e, t, n) {
  const a = Md(e), s = t.length / n;
  if (!a)
    return Math.max(s, 1);
  const o = ar(a);
  for (let i = 0, l = o.length - 1; i < l; i++) {
    const r = o[i];
    if (r > s)
      return r;
  }
  return Math.max(s, 1);
}
function $d(e) {
  const t = [];
  let n, a;
  for (n = 0, a = e.length; n < a; n++)
    e[n].major && t.push(n);
  return t;
}
function Sd(e, t, n, a) {
  let s = 0, o = n[0], i;
  for (a = Math.ceil(a), i = 0; i < e.length; i++)
    i === o && (t.push(e[i]), s++, o = n[s * a]);
}
function na(e, t, n, a, s) {
  const o = _e(a, 0), i = Math.min(_e(s, e.length), e.length);
  let l = 0, r, c, d;
  for (n = Math.ceil(n), s && (r = s - a, n = r / Math.floor(r / n)), d = o; d < 0; )
    l++, d = Math.round(o + l * n);
  for (c = Math.max(o, 0); c < i; c++)
    c === d && (t.push(e[c]), l++, d = Math.round(o + l * n));
}
function Md(e) {
  const t = e.length;
  let n, a;
  if (t < 2)
    return !1;
  for (a = e[0], n = 1; n < t; ++n)
    if (e[n] - e[n - 1] !== a)
      return !1;
  return a;
}
const Dd = (e) => e === "left" ? "right" : e === "right" ? "left" : e, ho = (e, t, n) => t === "top" || t === "left" ? e[t] + n : e[t] - n, fo = (e, t) => Math.min(t || e, e);
function go(e, t) {
  const n = [], a = e.length / t, s = e.length;
  let o = 0;
  for (; o < s; o += a)
    n.push(e[Math.floor(o)]);
  return n;
}
function Td(e, t, n) {
  const a = e.ticks.length, s = Math.min(t, a - 1), o = e._startPixel, i = e._endPixel, l = 1e-6;
  let r = e.getPixelForTick(s), c;
  if (!(n && (a === 1 ? c = Math.max(r - o, i - r) : t === 0 ? c = (e.getPixelForTick(1) - r) / 2 : c = (r - e.getPixelForTick(s - 1)) / 2, r += s < t ? c : -c, r < o - l || r > i + l)))
    return r;
}
function Ad(e, t) {
  Re(e, (n) => {
    const a = n.gc, s = a.length / 2;
    let o;
    if (s > t) {
      for (o = 0; o < s; ++o)
        delete n.data[a[o]];
      a.splice(0, s);
    }
  });
}
function wn(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function mo(e, t) {
  if (!e.display)
    return 0;
  const n = Qe(e.font, t), a = gt(e.padding);
  return (Ye(e.text) ? e.text.length : 1) * n.lineHeight + a.height;
}
function Bd(e, t) {
  return cn(e, {
    scale: t,
    type: "scale"
  });
}
function Ld(e, t, n) {
  return cn(e, {
    tick: n,
    index: t,
    type: "tick"
  });
}
function Pd(e, t, n) {
  let a = os(e);
  return (n && t !== "right" || !n && t === "right") && (a = Dd(a)), a;
}
function Id(e, t, n, a) {
  const { top: s, left: o, bottom: i, right: l, chart: r } = e, { chartArea: c, scales: d } = r;
  let h = 0, m, v, g;
  const y = i - s, b = l - o;
  if (e.isHorizontal()) {
    if (v = Xe(a, o, l), Ae(n)) {
      const f = Object.keys(n)[0], x = n[f];
      g = d[f].getPixelForValue(x) + y - t;
    } else n === "center" ? g = (c.bottom + c.top) / 2 + y - t : g = ho(e, n, t);
    m = l - o;
  } else {
    if (Ae(n)) {
      const f = Object.keys(n)[0], x = n[f];
      v = d[f].getPixelForValue(x) - b + t;
    } else n === "center" ? v = (c.left + c.right) / 2 - b + t : v = ho(e, n, t);
    g = Xe(a, i, s), h = n === "left" ? -Ke : Ke;
  }
  return {
    titleX: v,
    titleY: g,
    maxWidth: m,
    rotation: h
  };
}
class yn extends Pt {
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
    return t = xt(t, Number.POSITIVE_INFINITY), n = xt(n, Number.NEGATIVE_INFINITY), a = xt(a, Number.POSITIVE_INFINITY), s = xt(s, Number.NEGATIVE_INFINITY), {
      min: xt(t, a),
      max: xt(n, s),
      minDefined: ft(t),
      maxDefined: ft(n)
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
    for (let r = 0, c = l.length; r < c; ++r)
      i = l[r].controller.getMinMax(this, t), s || (n = Math.min(n, i.min)), o || (a = Math.max(a, i.max));
    return n = o && n > a ? a : n, a = s && n > a ? n : a, {
      min: xt(n, xt(a, n)),
      max: xt(a, xt(n, a))
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
    Ee(this.options.beforeUpdate, [
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
    }, a), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + a.left + a.right : this.height + a.top + a.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Fr(this, o, s), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const r = l < this.ticks.length;
    this._convertTicksToLabels(r ? go(this.ticks, l) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = kd(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), r && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, n, a;
    this.isHorizontal() ? (n = this.left, a = this.right) : (n = this.top, a = this.bottom, t = !t), this._startPixel = n, this._endPixel = a, this._reversePixels = t, this._length = a - n, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    Ee(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    Ee(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    Ee(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), Ee(this.options[t], [
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
    Ee(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const n = this.options.ticks;
    let a, s, o;
    for (a = 0, s = t.length; a < s; a++)
      o = t[a], o.label = Ee(n.callback, [
        o.value,
        a,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    Ee(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    Ee(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, n = t.ticks, a = fo(this.ticks.length, t.ticks.maxTicksLimit), s = n.minRotation || 0, o = n.maxRotation;
    let i = s, l, r, c;
    if (!this._isVisible() || !n.display || s >= o || a <= 1 || !this.isHorizontal()) {
      this.labelRotation = s;
      return;
    }
    const d = this._getLabelSizes(), h = d.widest.width, m = d.highest.height, v = Ze(this.chart.width - h, 0, this.maxWidth);
    l = t.offset ? this.maxWidth / a : v / (a - 1), h + 6 > l && (l = v / (a - (t.offset ? 0.5 : 1)), r = this.maxHeight - wn(t.grid) - n.padding - mo(t.title, this.chart.options.font), c = Math.sqrt(h * h + m * m), i = lr(Math.min(Math.asin(Ze((d.highest.height + 6) / l, -1, 1)), Math.asin(Ze(r / c, -1, 1)) - Math.asin(Ze(m / c, -1, 1)))), i = Math.max(s, Math.min(o, i))), this.labelRotation = i;
  }
  afterCalculateLabelRotation() {
    Ee(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    Ee(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: n, options: { ticks: a, title: s, grid: o } } = this, i = this._isVisible(), l = this.isHorizontal();
    if (i) {
      const r = mo(s, n.options.font);
      if (l ? (t.width = this.maxWidth, t.height = wn(o) + r) : (t.height = this.maxHeight, t.width = wn(o) + r), a.display && this.ticks.length) {
        const { first: c, last: d, widest: h, highest: m } = this._getLabelSizes(), v = a.padding * 2, g = Bt(this.labelRotation), y = Math.cos(g), b = Math.sin(g);
        if (l) {
          const f = a.mirror ? 0 : b * h.width + y * m.height;
          t.height = Math.min(this.maxHeight, t.height + f + v);
        } else {
          const f = a.mirror ? 0 : y * h.width + b * m.height;
          t.width = Math.min(this.maxWidth, t.width + f + v);
        }
        this._calculatePadding(c, d, b, y);
      }
    }
    this._handleMargins(), l ? (this.width = this._length = n.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = n.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, n, a, s) {
    const { ticks: { align: o, padding: i }, position: l } = this.options, r = this.labelRotation !== 0, c = l !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const d = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let m = 0, v = 0;
      r ? c ? (m = s * t.width, v = a * n.height) : (m = a * t.height, v = s * n.width) : o === "start" ? v = n.width : o === "end" ? m = t.width : o !== "inner" && (m = t.width / 2, v = n.width / 2), this.paddingLeft = Math.max((m - d + i) * this.width / (this.width - d), 0), this.paddingRight = Math.max((v - h + i) * this.width / (this.width - h), 0);
    } else {
      let d = n.height / 2, h = t.height / 2;
      o === "start" ? (d = 0, h = t.height) : o === "end" && (d = n.height, h = 0), this.paddingTop = d + i, this.paddingBottom = h + i;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    Ee(this.options.afterFit, [
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
      Ie(t[n].label) && (t.splice(n, 1), a--, n--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const n = this.options.ticks.sampleSize;
      let a = this.ticks;
      n < a.length && (a = go(a, n)), this._labelSizes = t = this._computeLabelSizes(a, a.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, n, a) {
    const { ctx: s, _longestTextCache: o } = this, i = [], l = [], r = Math.floor(n / fo(n, a));
    let c = 0, d = 0, h, m, v, g, y, b, f, x, _, w, C;
    for (h = 0; h < n; h += r) {
      if (g = t[h].label, y = this._resolveTickFontOptions(h), s.font = b = y.string, f = o[b] = o[b] || {
        data: {},
        gc: []
      }, x = y.lineHeight, _ = w = 0, !Ie(g) && !Ye(g))
        _ = Ns(s, f.data, f.gc, _, g), w = x;
      else if (Ye(g))
        for (m = 0, v = g.length; m < v; ++m)
          C = g[m], !Ie(C) && !Ye(C) && (_ = Ns(s, f.data, f.gc, _, C), w += x);
      i.push(_), l.push(w), c = Math.max(_, c), d = Math.max(w, d);
    }
    Ad(o, n);
    const M = i.indexOf(c), S = l.indexOf(d), R = (V) => ({
      width: i[V] || 0,
      height: l[V] || 0
    });
    return {
      first: R(0),
      last: R(n - 1),
      widest: R(M),
      highest: R(S),
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
    return cr(this._alignToPixels ? Gt(this.chart, n, 0) : n);
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
      return a.$context || (a.$context = Ld(this.getContext(), t, a));
    }
    return this.$context || (this.$context = Bd(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, n = Bt(this.labelRotation), a = Math.abs(Math.cos(n)), s = Math.abs(Math.sin(n)), o = this._getLabelSizes(), i = t.autoSkipPadding || 0, l = o ? o.widest.width + i : 0, r = o ? o.highest.height + i : 0;
    return this.isHorizontal() ? r * a > l * s ? l / a : r / s : r * s < l * a ? r / a : l / s;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const n = this.axis, a = this.chart, s = this.options, { grid: o, position: i, border: l } = s, r = o.offset, c = this.isHorizontal(), h = this.ticks.length + (r ? 1 : 0), m = wn(o), v = [], g = l.setContext(this.getContext()), y = g.display ? g.width : 0, b = y / 2, f = function(ie) {
      return Gt(a, ie, y);
    };
    let x, _, w, C, M, S, R, V, E, A, L, O;
    if (i === "top")
      x = f(this.bottom), S = this.bottom - m, V = x - b, A = f(t.top) + b, O = t.bottom;
    else if (i === "bottom")
      x = f(this.top), A = t.top, O = f(t.bottom) - b, S = x + b, V = this.top + m;
    else if (i === "left")
      x = f(this.right), M = this.right - m, R = x - b, E = f(t.left) + b, L = t.right;
    else if (i === "right")
      x = f(this.left), E = t.left, L = f(t.right) - b, M = x + b, R = this.left + m;
    else if (n === "x") {
      if (i === "center")
        x = f((t.top + t.bottom) / 2 + 0.5);
      else if (Ae(i)) {
        const ie = Object.keys(i)[0], se = i[ie];
        x = f(this.chart.scales[ie].getPixelForValue(se));
      }
      A = t.top, O = t.bottom, S = x + b, V = S + m;
    } else if (n === "y") {
      if (i === "center")
        x = f((t.left + t.right) / 2);
      else if (Ae(i)) {
        const ie = Object.keys(i)[0], se = i[ie];
        x = f(this.chart.scales[ie].getPixelForValue(se));
      }
      M = x - b, R = M - m, E = t.left, L = t.right;
    }
    const q = _e(s.ticks.maxTicksLimit, h), X = Math.max(1, Math.ceil(h / q));
    for (_ = 0; _ < h; _ += X) {
      const ie = this.getContext(_), se = o.setContext(ie), Z = l.setContext(ie), he = se.lineWidth, K = se.color, G = Z.dash || [], te = Z.dashOffset, ge = se.tickWidth, ye = se.tickColor, Se = se.tickBorderDash || [], Me = se.tickBorderDashOffset;
      w = Td(this, _, r), w !== void 0 && (C = Gt(a, w, he), c ? M = R = E = L = C : S = V = A = O = C, v.push({
        tx1: M,
        ty1: S,
        tx2: R,
        ty2: V,
        x1: E,
        y1: A,
        x2: L,
        y2: O,
        width: he,
        color: K,
        borderDash: G,
        borderDashOffset: te,
        tickWidth: ge,
        tickColor: ye,
        tickBorderDash: Se,
        tickBorderDashOffset: Me
      }));
    }
    return this._ticksLength = h, this._borderValue = x, v;
  }
  _computeLabelItems(t) {
    const n = this.axis, a = this.options, { position: s, ticks: o } = a, i = this.isHorizontal(), l = this.ticks, { align: r, crossAlign: c, padding: d, mirror: h } = o, m = wn(a.grid), v = m + d, g = h ? -d : v, y = -Bt(this.labelRotation), b = [];
    let f, x, _, w, C, M, S, R, V, E, A, L, O = "middle";
    if (s === "top")
      M = this.bottom - g, S = this._getXAxisLabelAlignment();
    else if (s === "bottom")
      M = this.top + g, S = this._getXAxisLabelAlignment();
    else if (s === "left") {
      const X = this._getYAxisLabelAlignment(m);
      S = X.textAlign, C = X.x;
    } else if (s === "right") {
      const X = this._getYAxisLabelAlignment(m);
      S = X.textAlign, C = X.x;
    } else if (n === "x") {
      if (s === "center")
        M = (t.top + t.bottom) / 2 + v;
      else if (Ae(s)) {
        const X = Object.keys(s)[0], ie = s[X];
        M = this.chart.scales[X].getPixelForValue(ie) + v;
      }
      S = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (s === "center")
        C = (t.left + t.right) / 2 - v;
      else if (Ae(s)) {
        const X = Object.keys(s)[0], ie = s[X];
        C = this.chart.scales[X].getPixelForValue(ie);
      }
      S = this._getYAxisLabelAlignment(m).textAlign;
    }
    n === "y" && (r === "start" ? O = "top" : r === "end" && (O = "bottom"));
    const q = this._getLabelSizes();
    for (f = 0, x = l.length; f < x; ++f) {
      _ = l[f], w = _.label;
      const X = o.setContext(this.getContext(f));
      R = this.getPixelForTick(f) + o.labelOffset, V = this._resolveTickFontOptions(f), E = V.lineHeight, A = Ye(w) ? w.length : 1;
      const ie = A / 2, se = X.color, Z = X.textStrokeColor, he = X.textStrokeWidth;
      let K = S;
      i ? (C = R, S === "inner" && (f === x - 1 ? K = this.options.reverse ? "left" : "right" : f === 0 ? K = this.options.reverse ? "right" : "left" : K = "center"), s === "top" ? c === "near" || y !== 0 ? L = -A * E + E / 2 : c === "center" ? L = -q.highest.height / 2 - ie * E + E : L = -q.highest.height + E / 2 : c === "near" || y !== 0 ? L = E / 2 : c === "center" ? L = q.highest.height / 2 - ie * E : L = q.highest.height - A * E, h && (L *= -1), y !== 0 && !X.showLabelBackdrop && (C += E / 2 * Math.sin(y))) : (M = R, L = (1 - A) * E / 2);
      let G;
      if (X.showLabelBackdrop) {
        const te = gt(X.backdropPadding), ge = q.heights[f], ye = q.widths[f];
        let Se = L - te.top, Me = 0 - te.left;
        switch (O) {
          case "middle":
            Se -= ge / 2;
            break;
          case "bottom":
            Se -= ge;
            break;
        }
        switch (S) {
          case "center":
            Me -= ye / 2;
            break;
          case "right":
            Me -= ye;
            break;
          case "inner":
            f === x - 1 ? Me -= ye : f > 0 && (Me -= ye / 2);
            break;
        }
        G = {
          left: Me,
          top: Se,
          width: ye + te.width,
          height: ge + te.height,
          color: X.backdropColor
        };
      }
      b.push({
        label: w,
        font: V,
        textOffset: L,
        options: {
          rotation: y,
          color: se,
          strokeColor: Z,
          strokeWidth: he,
          textAlign: K,
          textBaseline: O,
          translation: [
            C,
            M
          ],
          backdrop: G
        }
      });
    }
    return b;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: n } = this.options;
    if (-Bt(this.labelRotation))
      return t === "top" ? "left" : "right";
    let s = "center";
    return n.align === "start" ? s = "left" : n.align === "end" ? s = "right" : n.align === "inner" && (s = "inner"), s;
  }
  _getYAxisLabelAlignment(t) {
    const { position: n, ticks: { crossAlign: a, mirror: s, padding: o } } = this.options, i = this._getLabelSizes(), l = t + o, r = i.widest.width;
    let c, d;
    return n === "left" ? s ? (d = this.right + o, a === "near" ? c = "left" : a === "center" ? (c = "center", d += r / 2) : (c = "right", d += r)) : (d = this.right - l, a === "near" ? c = "right" : a === "center" ? (c = "center", d -= r / 2) : (c = "left", d = this.left)) : n === "right" ? s ? (d = this.left + o, a === "near" ? c = "right" : a === "center" ? (c = "center", d -= r / 2) : (c = "left", d -= r)) : (d = this.left + l, a === "near" ? c = "left" : a === "center" ? (c = "center", d += r / 2) : (c = "right", d = this.right)) : c = "right", {
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
    const l = (r, c, d) => {
      !d.width || !d.color || (a.save(), a.lineWidth = d.width, a.strokeStyle = d.color, a.setLineDash(d.borderDash || []), a.lineDashOffset = d.borderDashOffset, a.beginPath(), a.moveTo(r.x, r.y), a.lineTo(c.x, c.y), a.stroke(), a.restore());
    };
    if (n.display)
      for (o = 0, i = s.length; o < i; ++o) {
        const r = s[o];
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
    const { chart: t, ctx: n, options: { border: a, grid: s } } = this, o = a.setContext(this.getContext()), i = a.display ? o.width : 0;
    if (!i)
      return;
    const l = s.setContext(this.getContext(0)).lineWidth, r = this._borderValue;
    let c, d, h, m;
    this.isHorizontal() ? (c = Gt(t, this.left, i) - i / 2, d = Gt(t, this.right, l) + l / 2, h = m = r) : (h = Gt(t, this.top, i) - i / 2, m = Gt(t, this.bottom, l) + l / 2, c = d = r), n.save(), n.lineWidth = o.width, n.strokeStyle = o.color, n.beginPath(), n.moveTo(c, h), n.lineTo(d, m), n.stroke(), n.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const a = this.ctx, s = this._computeLabelArea();
    s && rs(a, s);
    const o = this.getLabelItems(t);
    for (const i of o) {
      const l = i.options, r = i.font, c = i.label, d = i.textOffset;
      Wn(a, c, 0, d, r, l);
    }
    s && cs(a);
  }
  drawTitle() {
    const { ctx: t, options: { position: n, title: a, reverse: s } } = this;
    if (!a.display)
      return;
    const o = Qe(a.font), i = gt(a.padding), l = a.align;
    let r = o.lineHeight / 2;
    n === "bottom" || n === "center" || Ae(n) ? (r += i.bottom, Ye(a.text) && (r += o.lineHeight * (a.text.length - 1))) : r += i.top;
    const { titleX: c, titleY: d, maxWidth: h, rotation: m } = Id(this, r, n, l);
    Wn(t, a.text, 0, 0, o, {
      color: a.color,
      maxWidth: h,
      rotation: m,
      textAlign: Pd(l, n, s),
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
    const t = this.options, n = t.ticks && t.ticks.z || 0, a = _e(t.grid && t.grid.z, -1), s = _e(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== yn.prototype.draw ? [
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
    return Qe(n.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class aa {
  constructor(t, n, a) {
    this.type = t, this.scope = n, this.override = a, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const n = Object.getPrototypeOf(t);
    let a;
    Ed(n) && (a = this.register(n));
    const s = this.items, o = t.id, i = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in s || (s[o] = t, Rd(t, i, a), this.override && We.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const n = this.items, a = t.id, s = this.scope;
    a in n && delete n[a], s && a in We[s] && (delete We[s][a], this.override && delete rn[a]);
  }
}
function Rd(e, t, n) {
  const a = En(/* @__PURE__ */ Object.create(null), [
    n ? We.get(n) : {},
    We.get(t),
    e.defaults
  ]);
  We.set(t, a), e.defaultRoutes && Fd(t, e.defaultRoutes), e.descriptors && We.describe(t, e.descriptors);
}
function Fd(e, t) {
  Object.keys(t).forEach((n) => {
    const a = n.split("."), s = a.pop(), o = [
      e
    ].concat(a).join("."), i = t[n].split("."), l = i.pop(), r = i.join(".");
    We.route(o, s, r, l);
  });
}
function Ed(e) {
  return "id" in e && "defaults" in e;
}
class Od {
  constructor() {
    this.controllers = new aa(Ca, "datasets", !0), this.elements = new aa(Pt, "elements"), this.plugins = new aa(Object, "plugins"), this.scales = new aa(yn, "scales"), this._typedRegistries = [
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
      a || o.isForType(s) || o === this.plugins && s.id ? this._exec(t, o, s) : Re(s, (i) => {
        const l = a || this._getRegistryForType(i);
        this._exec(t, l, i);
      });
    });
  }
  _exec(t, n, a) {
    const s = as(t);
    Ee(a["before" + s], [], a), n[t](a), Ee(a["after" + s], [], a);
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
var kt = /* @__PURE__ */ new Od();
class Vd {
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
      const i = o.plugin, l = i[a], r = [
        n,
        s,
        o.options
      ];
      if (Ee(l, r, i) === !1 && s.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    Ie(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const n = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), n;
  }
  _createDescriptors(t, n) {
    const a = t && t.config, s = _e(a.options && a.options.plugins, {}), o = zd(a);
    return s === !1 && !n ? [] : Wd(t, o, s, n);
  }
  _notifyStateChanges(t) {
    const n = this._oldCache || [], a = this._cache, s = (o, i) => o.filter((l) => !i.some((r) => l.plugin.id === r.plugin.id));
    this._notify(s(n, a), t, "stop"), this._notify(s(a, n), t, "start");
  }
}
function zd(e) {
  const t = {}, n = [], a = Object.keys(kt.plugins.items);
  for (let o = 0; o < a.length; o++)
    n.push(kt.getPlugin(a[o]));
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
function Nd(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function Wd(e, { plugins: t, localIds: n }, a, s) {
  const o = [], i = e.getContext();
  for (const l of t) {
    const r = l.id, c = Nd(a[r], s);
    c !== null && o.push({
      plugin: l,
      options: Hd(e.config, {
        plugin: l,
        local: n[r]
      }, c, i)
    });
  }
  return o;
}
function Hd(e, { plugin: t, local: n }, a, s) {
  const o = e.pluginScopeKeys(t), i = e.getOptionScopes(a, o);
  return n && t.defaults && i.push(t.defaults), e.createResolver(i, s, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Ga(e, t) {
  const n = We.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || n.indexAxis || "x";
}
function jd(e, t) {
  let n = e;
  return e === "_index_" ? n = t : e === "_value_" && (n = t === "x" ? "y" : "x"), n;
}
function Yd(e, t) {
  return e === t ? "_index_" : "_value_";
}
function po(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function Kd(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Za(e, ...t) {
  if (po(e))
    return e;
  for (const n of t) {
    const a = n.axis || Kd(n.position) || e.length > 1 && po(e[0].toLowerCase());
    if (a)
      return a;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function bo(e, t, n) {
  if (n[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function Ud(e, t) {
  if (t.data && t.data.datasets) {
    const n = t.data.datasets.filter((a) => a.xAxisID === e || a.yAxisID === e);
    if (n.length)
      return bo(e, "x", n[0]) || bo(e, "y", n[0]);
  }
  return {};
}
function qd(e, t) {
  const n = rn[e.type] || {
    scales: {}
  }, a = t.scales || {}, s = Ga(e.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(a).forEach((i) => {
    const l = a[i];
    if (!Ae(l))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (l._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const r = Za(i, l, Ud(i, e), We.scales[l.type]), c = Yd(r, s), d = n.scales || {};
    o[i] = Bn(/* @__PURE__ */ Object.create(null), [
      {
        axis: r
      },
      l,
      d[r],
      d[c]
    ]);
  }), e.data.datasets.forEach((i) => {
    const l = i.type || e.type, r = i.indexAxis || Ga(l, t), d = (rn[l] || {}).scales || {};
    Object.keys(d).forEach((h) => {
      const m = jd(h, r), v = i[m + "AxisID"] || m;
      o[v] = o[v] || /* @__PURE__ */ Object.create(null), Bn(o[v], [
        {
          axis: m
        },
        a[v],
        d[h]
      ]);
    });
  }), Object.keys(o).forEach((i) => {
    const l = o[i];
    Bn(l, [
      We.scales[l.type],
      We.scale
    ]);
  }), o;
}
function Ii(e) {
  const t = e.options || (e.options = {});
  t.plugins = _e(t.plugins, {}), t.scales = qd(e, t);
}
function Ri(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function Xd(e) {
  return e = e || {}, e.data = Ri(e.data), Ii(e), e;
}
const vo = /* @__PURE__ */ new Map(), Fi = /* @__PURE__ */ new Set();
function sa(e, t) {
  let n = vo.get(e);
  return n || (n = t(), vo.set(e, n), Fi.add(n)), n;
}
const Cn = (e, t, n) => {
  const a = ln(t, n);
  a !== void 0 && e.add(a);
};
class Gd {
  constructor(t) {
    this._config = Xd(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = Ri(t);
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
    this.clearCache(), Ii(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return sa(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, n) {
    return sa(`${t}.transition.${n}`, () => [
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
    return sa(`${t}-${n}`, () => [
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
    return sa(`${a}-plugin-${n}`, () => [
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
    const r = /* @__PURE__ */ new Set();
    n.forEach((d) => {
      t && (r.add(t), d.forEach((h) => Cn(r, t, h))), d.forEach((h) => Cn(r, s, h)), d.forEach((h) => Cn(r, rn[o] || {}, h)), d.forEach((h) => Cn(r, We, h)), d.forEach((h) => Cn(r, qa, h));
    });
    const c = Array.from(r);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), Fi.has(n) && i.set(n, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: n } = this;
    return [
      t,
      rn[n] || {},
      We.datasets[n] || {},
      {
        type: n
      },
      We,
      qa
    ];
  }
  resolveNamedOptions(t, n, a, s = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: i, subPrefixes: l } = yo(this._resolverCache, t, s);
    let r = i;
    if (Qd(i, n)) {
      o.$shared = !1, a = jt(a) ? a() : a;
      const c = this.createResolver(t, a, l);
      r = bn(i, a, c);
    }
    for (const c of n)
      o[c] = r[c];
    return o;
  }
  createResolver(t, n, a = [
    ""
  ], s) {
    const { resolver: o } = yo(this._resolverCache, t, a);
    return Ae(n) ? bn(o, n, void 0, s) : o;
  }
}
function yo(e, t, n) {
  let a = e.get(t);
  a || (a = /* @__PURE__ */ new Map(), e.set(t, a));
  const s = n.join();
  let o = a.get(s);
  return o || (o = {
    resolver: us(t, n),
    subPrefixes: n.filter((l) => !l.toLowerCase().includes("hover"))
  }, a.set(s, o)), o;
}
const Zd = (e) => Ae(e) && Object.getOwnPropertyNames(e).some((t) => jt(e[t]));
function Qd(e, t) {
  const { isScriptable: n, isIndexable: a } = vi(e);
  for (const s of t) {
    const o = n(s), i = a(s), l = (i || o) && e[s];
    if (o && (jt(l) || Zd(l)) || i && Ye(l))
      return !0;
  }
  return !1;
}
var Jd = "4.5.1";
const eu = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function xo(e, t) {
  return e === "top" || e === "bottom" || eu.indexOf(e) === -1 && t === "x";
}
function _o(e, t) {
  return function(n, a) {
    return n[e] === a[e] ? n[t] - a[t] : n[e] - a[e];
  };
}
function ko(e) {
  const t = e.chart, n = t.options.animation;
  t.notifyPlugins("afterRender"), Ee(n && n.onComplete, [
    e
  ], t);
}
function tu(e) {
  const t = e.chart, n = t.options.animation;
  Ee(n && n.onProgress, [
    e
  ], t);
}
function Ei(e) {
  return gs() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const da = {}, wo = (e) => {
  const t = Ei(e);
  return Object.values(da).filter((n) => n.canvas === t).pop();
};
function nu(e, t, n) {
  const a = Object.keys(e);
  for (const s of a) {
    const o = +s;
    if (o >= t) {
      const i = e[s];
      delete e[s], (n > 0 || o > t) && (e[o + n] = i);
    }
  }
}
function au(e, t, n, a) {
  return !n || e.type === "mouseout" ? null : a ? t : e;
}
let Yt = class {
  static defaults = We;
  static instances = da;
  static overrides = rn;
  static registry = kt;
  static version = Jd;
  static getChart = wo;
  static register(...t) {
    kt.add(...t), Co();
  }
  static unregister(...t) {
    kt.remove(...t), Co();
  }
  constructor(t, n) {
    const a = this.config = new Gd(n), s = Ei(t), o = wo(s);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const i = a.createResolver(a.chartOptionScopes(), this.getContext());
    this.platform = new (a.platform || _d(s))(), this.platform.updateConfig(a);
    const l = this.platform.acquireContext(s, i.aspectRatio), r = l && l.canvas, c = r && r.height, d = r && r.width;
    if (this.id = ql(), this.ctx = l, this.canvas = r, this.width = d, this.height = c, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Vd(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = fr((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], da[this.id] = this, !l || !r) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Dt.listen(this, "complete", ko), Dt.listen(this, "progress", tu), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: n }, width: a, height: s, _aspectRatio: o } = this;
    return Ie(t) ? n && o ? o : s ? a / s : null : t;
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
    return kt;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Ys(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Ws(this.canvas, this.ctx), this;
  }
  stop() {
    return Dt.stop(this), this;
  }
  resize(t, n) {
    Dt.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: n
    } : this._resize(t, n);
  }
  _resize(t, n) {
    const a = this.options, s = this.canvas, o = a.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(s, t, n, o), l = a.devicePixelRatio || this.platform.getDevicePixelRatio(), r = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, Ys(this, l, !0) && (this.notifyPlugins("resize", {
      size: i
    }), Ee(a.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(r) && this.render());
  }
  ensureScalesHaveIDs() {
    const n = this.options.scales || {};
    Re(n, (a, s) => {
      a.id = s;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, n = t.scales, a = this.scales, s = Object.keys(a).reduce((i, l) => (i[l] = !1, i), {});
    let o = [];
    n && (o = o.concat(Object.keys(n).map((i) => {
      const l = n[i], r = Za(i, l), c = r === "r", d = r === "x";
      return {
        options: l,
        dposition: c ? "chartArea" : d ? "bottom" : "left",
        dtype: c ? "radialLinear" : d ? "category" : "linear"
      };
    }))), Re(o, (i) => {
      const l = i.options, r = l.id, c = Za(r, l), d = _e(l.type, i.dtype);
      (l.position === void 0 || xo(l.position, c) !== xo(i.dposition)) && (l.position = i.dposition), s[r] = !0;
      let h = null;
      if (r in a && a[r].type === d)
        h = a[r];
      else {
        const m = kt.getScale(d);
        h = new m({
          id: r,
          type: d,
          ctx: this.ctx,
          chart: this
        }), a[h.id] = h;
      }
      h.init(l, t);
    }), Re(s, (i, l) => {
      i || delete a[l];
    }), Re(a, (i) => {
      ht.configure(this, i, i.options), ht.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, n = this.data.datasets.length, a = t.length;
    if (t.sort((s, o) => s.index - o.index), a > n) {
      for (let s = n; s < a; ++s)
        this._destroyDatasetMeta(s);
      t.splice(n, a - n);
    }
    this._sortedMetasets = t.slice(0).sort(_o("order", "index"));
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
      if (i.type && i.type !== l && (this._destroyDatasetMeta(a), i = this.getDatasetMeta(a)), i.type = l, i.indexAxis = o.indexAxis || Ga(l, this.options), i.order = o.order || 0, i.index = a, i.label = "" + o.label, i.visible = this.isDatasetVisible(a), i.controller)
        i.controller.updateIndex(a), i.controller.linkScales();
      else {
        const r = kt.getController(l), { datasetElementType: c, dataElementType: d } = We.datasets[l];
        Object.assign(r, {
          dataElementType: kt.getElement(d),
          datasetElementType: c && kt.getElement(c)
        }), i.controller = new r(this, a), t.push(i.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    Re(this.data.datasets, (t, n) => {
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
    for (let c = 0, d = this.data.datasets.length; c < d; c++) {
      const { controller: h } = this.getDatasetMeta(c), m = !s && o.indexOf(h) === -1;
      h.buildOrUpdateElements(m), i = Math.max(+h.getMaxOverflow(), i);
    }
    i = this._minPadding = a.layout.autoPadding ? i : 0, this._updateLayout(i), s || Re(o, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(_o("z", "_idx"));
    const { _active: l, _lastEvent: r } = this;
    r ? this._eventHandler(r, !0) : l.length && this._updateHoverStyles(l, l, !0), this.render();
  }
  _updateScales() {
    Re(this.scales, (t) => {
      ht.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, n = new Set(Object.keys(this._listeners)), a = new Set(t.events);
    (!Ls(n, a) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, n = this._getUniformDataChanges() || [];
    for (const { method: a, start: s, count: o } of n) {
      const i = a === "_removeElements" ? -o : o;
      nu(t, s, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const n = this.data.datasets.length, a = (o) => new Set(t.filter((i) => i[0] === o).map((i, l) => l + "," + i.splice(1).join(","))), s = a(0);
    for (let o = 1; o < n; o++)
      if (!Ls(s, a(o)))
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
    ht.update(this, this.width, this.height, t);
    const n = this.chartArea, a = n.width <= 0 || n.height <= 0;
    this._layers = [], Re(this.boxes, (s) => {
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
        this._updateDataset(n, jt(t) ? t({
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
    }) !== !1 && (Dt.has(this) ? this.attached && !Dt.running(this) && Dt.start(this) : (this.draw(), ko({
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
    }, s = yc(this, t);
    this.notifyPlugins("beforeDatasetDraw", a) !== !1 && (s && rs(n, s), t.controller.draw(), s && cs(n), a.cancelable = !1, this.notifyPlugins("afterDatasetDraw", a));
  }
  isPointInArea(t) {
    return Nn(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, n, a, s) {
    const o = ed.modes[n];
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
    return this.$context || (this.$context = cn(null, {
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
    On(n) ? (o.data[n].hidden = !a, this.update()) : (this.setDatasetVisibility(t, a), i.update(o, {
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
    for (this.stop(), Dt.remove(this), t = 0, n = this.data.datasets.length; t < n; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: n } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Ws(t, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete da[this.id], this.notifyPlugins("afterDestroy");
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
    Re(this.options.events, (o) => a(o, s));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, n = this.platform, a = (r, c) => {
      n.addEventListener(this, r, c), t[r] = c;
    }, s = (r, c) => {
      t[r] && (n.removeEventListener(this, r, c), delete t[r]);
    }, o = (r, c) => {
      this.canvas && this.resize(r, c);
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
    Re(this._listeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._listeners = {}, Re(this._responsiveListeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, n, a) {
    const s = a ? "set" : "remove";
    let o, i, l, r;
    for (n === "dataset" && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + s + "DatasetHoverStyle"]()), l = 0, r = t.length; l < r; ++l) {
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
    !ha(a, n) && (this._active = a, this._lastEvent = null, this._updateHoverStyles(a, n));
  }
  notifyPlugins(t, n, a) {
    return this._plugins.notify(this, t, n, a);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((n) => n.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, n, a) {
    const s = this.options.hover, o = (r, c) => r.filter((d) => !c.some((h) => d.datasetIndex === h.datasetIndex && d.index === h.index)), i = o(n, t), l = a ? t : o(t, n);
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
    const { _active: s = [], options: o } = this, i = n, l = this._getActiveElements(t, s, a, i), r = er(t), c = au(t, this._lastEvent, a, r);
    a && (this._lastEvent = null, Ee(o.onHover, [
      t,
      l,
      this
    ], this), r && Ee(o.onClick, [
      t,
      l,
      this
    ], this));
    const d = !ha(l, s);
    return (d || n) && (this._active = l, this._updateHoverStyles(l, s, n)), this._lastEvent = c, d;
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
function Co() {
  return Re(Yt.instances, (e) => e._plugins.invalidate());
}
function su(e, t, n) {
  const { startAngle: a, x: s, y: o, outerRadius: i, innerRadius: l, options: r } = t, { borderWidth: c, borderJoinStyle: d } = r, h = Math.min(c / i, bt(a - n));
  if (e.beginPath(), e.arc(s, o, i - c / 2, a + h / 2, n - h / 2), l > 0) {
    const m = Math.min(c / l, bt(a - n));
    e.arc(s, o, l + c / 2, n - m / 2, a + m / 2, !0);
  } else {
    const m = Math.min(c / 2, i * bt(a - n));
    if (d === "round")
      e.arc(s, o, m, n - Fe / 2, a + Fe / 2, !0);
    else if (d === "bevel") {
      const v = 2 * m * m, g = -v * Math.cos(n + Fe / 2) + s, y = -v * Math.sin(n + Fe / 2) + o, b = v * Math.cos(a + Fe / 2) + s, f = v * Math.sin(a + Fe / 2) + o;
      e.lineTo(g, y), e.lineTo(b, f);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function ou(e, t, n) {
  const { startAngle: a, pixelMargin: s, x: o, y: i, outerRadius: l, innerRadius: r } = t;
  let c = s / l;
  e.beginPath(), e.arc(o, i, l, a - c, n + c), r > s ? (c = s / r, e.arc(o, i, r, n + c, a - c, !0)) : e.arc(o, i, s, n + Ke, a - Ke), e.closePath(), e.clip();
}
function iu(e) {
  return ds(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function lu(e, t, n, a) {
  const s = iu(e.options.borderRadius), o = (n - t) / 2, i = Math.min(o, a * t / 2), l = (r) => {
    const c = (n - Math.min(o, r)) * a / 2;
    return Ze(r, 0, Math.min(o, c));
  };
  return {
    outerStart: l(s.outerStart),
    outerEnd: l(s.outerEnd),
    innerStart: Ze(s.innerStart, 0, i),
    innerEnd: Ze(s.innerEnd, 0, i)
  };
}
function fn(e, t, n, a) {
  return {
    x: n + e * Math.cos(t),
    y: a + e * Math.sin(t)
  };
}
function va(e, t, n, a, s, o) {
  const { x: i, y: l, startAngle: r, pixelMargin: c, innerRadius: d } = t, h = Math.max(t.outerRadius + a + n - c, 0), m = d > 0 ? d + a + n + c : 0;
  let v = 0;
  const g = s - r;
  if (a) {
    const X = d > 0 ? d - a : 0, ie = h > 0 ? h - a : 0, se = (X + ie) / 2, Z = se !== 0 ? g * se / (se + a) : g;
    v = (g - Z) / 2;
  }
  const y = Math.max(1e-3, g * h - n / Fe) / h, b = (g - y) / 2, f = r + b + v, x = s - b - v, { outerStart: _, outerEnd: w, innerStart: C, innerEnd: M } = lu(t, m, h, x - f), S = h - _, R = h - w, V = f + _ / S, E = x - w / R, A = m + C, L = m + M, O = f + C / A, q = x - M / L;
  if (e.beginPath(), o) {
    const X = (V + E) / 2;
    if (e.arc(i, l, h, V, X), e.arc(i, l, h, X, E), w > 0) {
      const he = fn(R, E, i, l);
      e.arc(he.x, he.y, w, E, x + Ke);
    }
    const ie = fn(L, x, i, l);
    if (e.lineTo(ie.x, ie.y), M > 0) {
      const he = fn(L, q, i, l);
      e.arc(he.x, he.y, M, x + Ke, q + Math.PI);
    }
    const se = (x - M / m + (f + C / m)) / 2;
    if (e.arc(i, l, m, x - M / m, se, !0), e.arc(i, l, m, se, f + C / m, !0), C > 0) {
      const he = fn(A, O, i, l);
      e.arc(he.x, he.y, C, O + Math.PI, f - Ke);
    }
    const Z = fn(S, f, i, l);
    if (e.lineTo(Z.x, Z.y), _ > 0) {
      const he = fn(S, V, i, l);
      e.arc(he.x, he.y, _, f - Ke, V);
    }
  } else {
    e.moveTo(i, l);
    const X = Math.cos(V) * h + i, ie = Math.sin(V) * h + l;
    e.lineTo(X, ie);
    const se = Math.cos(E) * h + i, Z = Math.sin(E) * h + l;
    e.lineTo(se, Z);
  }
  e.closePath();
}
function ru(e, t, n, a, s) {
  const { fullCircles: o, startAngle: i, circumference: l } = t;
  let r = t.endAngle;
  if (o) {
    va(e, t, n, a, r, s);
    for (let c = 0; c < o; ++c)
      e.fill();
    isNaN(l) || (r = i + (l % Ne || Ne));
  }
  return va(e, t, n, a, r, s), e.fill(), r;
}
function cu(e, t, n, a, s) {
  const { fullCircles: o, startAngle: i, circumference: l, options: r } = t, { borderWidth: c, borderJoinStyle: d, borderDash: h, borderDashOffset: m, borderRadius: v } = r, g = r.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(h || []), e.lineDashOffset = m, g ? (e.lineWidth = c * 2, e.lineJoin = d || "round") : (e.lineWidth = c, e.lineJoin = d || "bevel");
  let y = t.endAngle;
  if (o) {
    va(e, t, n, a, y, s);
    for (let b = 0; b < o; ++b)
      e.stroke();
    isNaN(l) || (y = i + (l % Ne || Ne));
  }
  g && ou(e, t, y), r.selfJoin && y - i >= Fe && v === 0 && d !== "miter" && su(e, t, y), o || (va(e, t, n, a, y, s), e.stroke());
}
class du extends Pt {
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
    ], a), { angle: o, distance: i } = di(s, {
      x: t,
      y: n
    }), { startAngle: l, endAngle: r, innerRadius: c, outerRadius: d, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], a), m = (this.options.spacing + this.options.borderWidth) / 2, v = _e(h, r - l), g = zn(o, l, r) && l !== r, y = v >= Ne || g, b = Et(i, c + m, d + m);
    return y && b;
  }
  getCenterPoint(t) {
    const { x: n, y: a, startAngle: s, endAngle: o, innerRadius: i, outerRadius: l } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: r, spacing: c } = this.options, d = (s + o) / 2, h = (i + l + c + r) / 2;
    return {
      x: n + Math.cos(d) * h,
      y: a + Math.sin(d) * h
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: n, circumference: a } = this, s = (n.offset || 0) / 4, o = (n.spacing || 0) / 2, i = n.circular;
    if (this.pixelMargin = n.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = a > Ne ? Math.floor(a / Ne) : 0, a === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const l = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(l) * s, Math.sin(l) * s);
    const r = 1 - Math.sin(Math.min(Fe, a || 0)), c = s * r;
    t.fillStyle = n.backgroundColor, t.strokeStyle = n.borderColor, ru(t, this, c, o, i), cu(t, this, c, o, i), t.restore();
  }
}
function Oi(e, t, n = t) {
  e.lineCap = _e(n.borderCapStyle, t.borderCapStyle), e.setLineDash(_e(n.borderDash, t.borderDash)), e.lineDashOffset = _e(n.borderDashOffset, t.borderDashOffset), e.lineJoin = _e(n.borderJoinStyle, t.borderJoinStyle), e.lineWidth = _e(n.borderWidth, t.borderWidth), e.strokeStyle = _e(n.borderColor, t.borderColor);
}
function uu(e, t, n) {
  e.lineTo(n.x, n.y);
}
function hu(e) {
  return e.stepped ? Mr : e.tension || e.cubicInterpolationMode === "monotone" ? Dr : uu;
}
function Vi(e, t, n = {}) {
  const a = e.length, { start: s = 0, end: o = a - 1 } = n, { start: i, end: l } = t, r = Math.max(s, i), c = Math.min(o, l), d = s < i && o < i || s > l && o > l;
  return {
    count: a,
    start: r,
    loop: t.loop,
    ilen: c < r && !d ? a + c - r : c - r
  };
}
function fu(e, t, n, a) {
  const { points: s, options: o } = t, { count: i, start: l, loop: r, ilen: c } = Vi(s, n, a), d = hu(o);
  let { move: h = !0, reverse: m } = a || {}, v, g, y;
  for (v = 0; v <= c; ++v)
    g = s[(l + (m ? c - v : v)) % i], !g.skip && (h ? (e.moveTo(g.x, g.y), h = !1) : d(e, y, g, m, o.stepped), y = g);
  return r && (g = s[(l + (m ? c : 0)) % i], d(e, y, g, m, o.stepped)), !!r;
}
function gu(e, t, n, a) {
  const s = t.points, { count: o, start: i, ilen: l } = Vi(s, n, a), { move: r = !0, reverse: c } = a || {};
  let d = 0, h = 0, m, v, g, y, b, f;
  const x = (w) => (i + (c ? l - w : w)) % o, _ = () => {
    y !== b && (e.lineTo(d, b), e.lineTo(d, y), e.lineTo(d, f));
  };
  for (r && (v = s[x(0)], e.moveTo(v.x, v.y)), m = 0; m <= l; ++m) {
    if (v = s[x(m)], v.skip)
      continue;
    const w = v.x, C = v.y, M = w | 0;
    M === g ? (C < y ? y = C : C > b && (b = C), d = (h * d + w) / ++h) : (_(), e.lineTo(w, C), g = M, h = 0, y = b = C), f = C;
  }
  _();
}
function Qa(e) {
  const t = e.options, n = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !n ? gu : fu;
}
function mu(e) {
  return e.stepped ? ic : e.tension || e.cubicInterpolationMode === "monotone" ? lc : en;
}
function pu(e, t, n, a) {
  let s = t._path;
  s || (s = t._path = new Path2D(), t.path(s, n, a) && s.closePath()), Oi(e, t.options), e.stroke(s);
}
function bu(e, t, n, a) {
  const { segments: s, options: o } = t, i = Qa(t);
  for (const l of s)
    Oi(e, o, l.style), e.beginPath(), i(e, t, l, {
      start: n,
      end: n + a - 1
    }) && e.closePath(), e.stroke();
}
const vu = typeof Path2D == "function";
function yu(e, t, n, a) {
  vu && !t.options.segment ? pu(e, t, n, a) : bu(e, t, n, a);
}
class xu extends Pt {
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
      Qr(this._points, a, t, s, n), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = mc(this, this.options.segment));
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
    const a = this.options, s = t[n], o = this.points, i = hc(this, {
      property: n,
      start: s,
      end: s
    });
    if (!i.length)
      return;
    const l = [], r = mu(a);
    let c, d;
    for (c = 0, d = i.length; c < d; ++c) {
      const { start: h, end: m } = i[c], v = o[h], g = o[m];
      if (v === g) {
        l.push(v);
        continue;
      }
      const y = Math.abs((s - v[n]) / (g[n] - v[n])), b = r(v, g, y, a.stepped);
      b[n] = t[n], l.push(b);
    }
    return l.length === 1 ? l[0] : l;
  }
  pathSegment(t, n, a) {
    return Qa(this)(t, this, n, a);
  }
  path(t, n, a) {
    const s = this.segments, o = Qa(this);
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
    (this.points || []).length && o.borderWidth && (t.save(), yu(t, this, a, s), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function $o(e, t, n, a) {
  const s = e.options, { [n]: o } = e.getProps([
    n
  ], a);
  return Math.abs(t - o) < s.radius + s.hitRadius;
}
class _u extends Pt {
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
    return $o(this, t, "x", n);
  }
  inYRange(t, n) {
    return $o(this, t, "y", n);
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
    this.skip || a.radius < 0.1 || !Nn(this, n, this.size(a) / 2) || (t.strokeStyle = a.borderColor, t.lineWidth = a.borderWidth, t.fillStyle = a.backgroundColor, Xa(t, a, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function zi(e, t) {
  const { x: n, y: a, base: s, width: o, height: i } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let l, r, c, d, h;
  return e.horizontal ? (h = i / 2, l = Math.min(n, s), r = Math.max(n, s), c = a - h, d = a + h) : (h = o / 2, l = n - h, r = n + h, c = Math.min(a, s), d = Math.max(a, s)), {
    left: l,
    top: c,
    right: r,
    bottom: d
  };
}
function Vt(e, t, n, a) {
  return e ? 0 : Ze(t, n, a);
}
function ku(e, t, n) {
  const a = e.options.borderWidth, s = e.borderSkipped, o = bi(a);
  return {
    t: Vt(s.top, o.top, 0, n),
    r: Vt(s.right, o.right, 0, t),
    b: Vt(s.bottom, o.bottom, 0, n),
    l: Vt(s.left, o.left, 0, t)
  };
}
function wu(e, t, n) {
  const { enableBorderRadius: a } = e.getProps([
    "enableBorderRadius"
  ]), s = e.options.borderRadius, o = mn(s), i = Math.min(t, n), l = e.borderSkipped, r = a || Ae(s);
  return {
    topLeft: Vt(!r || l.top || l.left, o.topLeft, 0, i),
    topRight: Vt(!r || l.top || l.right, o.topRight, 0, i),
    bottomLeft: Vt(!r || l.bottom || l.left, o.bottomLeft, 0, i),
    bottomRight: Vt(!r || l.bottom || l.right, o.bottomRight, 0, i)
  };
}
function Cu(e) {
  const t = zi(e), n = t.right - t.left, a = t.bottom - t.top, s = ku(e, n / 2, a / 2), o = wu(e, n / 2, a / 2);
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
function Va(e, t, n, a) {
  const s = t === null, o = n === null, l = e && !(s && o) && zi(e, a);
  return l && (s || Et(t, l.left, l.right)) && (o || Et(n, l.top, l.bottom));
}
function $u(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function Su(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function za(e, t, n = {}) {
  const a = e.x !== n.x ? -t : 0, s = e.y !== n.y ? -t : 0, o = (e.x + e.w !== n.x + n.w ? t : 0) - a, i = (e.y + e.h !== n.y + n.h ? t : 0) - s;
  return {
    x: e.x + a,
    y: e.y + s,
    w: e.w + o,
    h: e.h + i,
    radius: e.radius
  };
}
class Mu extends Pt {
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
    const { inflateAmount: n, options: { borderColor: a, backgroundColor: s } } = this, { inner: o, outer: i } = Cu(this), l = $u(i.radius) ? ma : Su;
    t.save(), (i.w !== o.w || i.h !== o.h) && (t.beginPath(), l(t, za(i, n, o)), t.clip(), l(t, za(o, -n, i)), t.fillStyle = a, t.fill("evenodd")), t.beginPath(), l(t, za(o, n)), t.fillStyle = s, t.fill(), t.restore();
  }
  inRange(t, n, a) {
    return Va(this, t, n, a);
  }
  inXRange(t, n) {
    return Va(this, t, null, n);
  }
  inYRange(t, n) {
    return Va(this, null, t, n);
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
const So = (e, t) => {
  let { boxHeight: n = t, boxWidth: a = t } = e;
  return e.usePointStyle && (n = Math.min(n, t), a = e.pointStyleWidth || Math.min(a, t)), {
    boxWidth: a,
    boxHeight: n,
    itemHeight: Math.max(t, n)
  };
}, Du = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class Mo extends Pt {
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
    let n = Ee(t.generateLabels, [
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
    const a = t.labels, s = Qe(a.font), o = s.size, i = this._computeTitleHeight(), { boxWidth: l, itemHeight: r } = So(a, o);
    let c, d;
    n.font = s.string, this.isHorizontal() ? (c = this.maxWidth, d = this._fitRows(i, o, l, r) + 10) : (d = this.maxHeight, c = this._fitCols(i, s, l, r) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(d, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, n, a, s) {
    const { ctx: o, maxWidth: i, options: { labels: { padding: l } } } = this, r = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], d = s + l;
    let h = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let m = -1, v = -d;
    return this.legendItems.forEach((g, y) => {
      const b = a + n / 2 + o.measureText(g.text).width;
      (y === 0 || c[c.length - 1] + b + 2 * l > i) && (h += d, c[c.length - (y > 0 ? 0 : 1)] = 0, v += d, m++), r[y] = {
        left: 0,
        top: v,
        row: m,
        width: b,
        height: s
      }, c[c.length - 1] += b + l;
    }), h;
  }
  _fitCols(t, n, a, s) {
    const { ctx: o, maxHeight: i, options: { labels: { padding: l } } } = this, r = this.legendHitBoxes = [], c = this.columnSizes = [], d = i - t;
    let h = l, m = 0, v = 0, g = 0, y = 0;
    return this.legendItems.forEach((b, f) => {
      const { itemWidth: x, itemHeight: _ } = Tu(a, n, o, b, s);
      f > 0 && v + _ + 2 * l > d && (h += m + l, c.push({
        width: m,
        height: v
      }), g += m + l, y++, m = v = 0), r[f] = {
        left: g,
        top: v,
        col: y,
        width: x,
        height: _
      }, m = Math.max(m, x), v += _ + l;
    }), h += m, c.push({
      width: m,
      height: v
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: n, options: { align: a, labels: { padding: s }, rtl: o } } = this, i = pn(o, this.left, this.width);
    if (this.isHorizontal()) {
      let l = 0, r = Xe(a, this.left + s, this.right - this.lineWidths[l]);
      for (const c of n)
        l !== c.row && (l = c.row, r = Xe(a, this.left + s, this.right - this.lineWidths[l])), c.top += this.top + t + s, c.left = i.leftForLtr(i.x(r), c.width), r += c.width + s;
    } else {
      let l = 0, r = Xe(a, this.top + t + s, this.bottom - this.columnSizes[l].height);
      for (const c of n)
        c.col !== l && (l = c.col, r = Xe(a, this.top + t + s, this.bottom - this.columnSizes[l].height)), c.top = r, c.left += this.left + s, c.left = i.leftForLtr(i.x(c.left), c.width), r += c.height + s;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      rs(t, this), this._draw(), cs(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: n, lineWidths: a, ctx: s } = this, { align: o, labels: i } = t, l = We.color, r = pn(t.rtl, this.left, this.width), c = Qe(i.font), { padding: d } = i, h = c.size, m = h / 2;
    let v;
    this.drawTitle(), s.textAlign = r.textAlign("left"), s.textBaseline = "middle", s.lineWidth = 0.5, s.font = c.string;
    const { boxWidth: g, boxHeight: y, itemHeight: b } = So(i, h), f = function(M, S, R) {
      if (isNaN(g) || g <= 0 || isNaN(y) || y < 0)
        return;
      s.save();
      const V = _e(R.lineWidth, 1);
      if (s.fillStyle = _e(R.fillStyle, l), s.lineCap = _e(R.lineCap, "butt"), s.lineDashOffset = _e(R.lineDashOffset, 0), s.lineJoin = _e(R.lineJoin, "miter"), s.lineWidth = V, s.strokeStyle = _e(R.strokeStyle, l), s.setLineDash(_e(R.lineDash, [])), i.usePointStyle) {
        const E = {
          radius: y * Math.SQRT2 / 2,
          pointStyle: R.pointStyle,
          rotation: R.rotation,
          borderWidth: V
        }, A = r.xPlus(M, g / 2), L = S + m;
        pi(s, E, A, L, i.pointStyleWidth && g);
      } else {
        const E = S + Math.max((h - y) / 2, 0), A = r.leftForLtr(M, g), L = mn(R.borderRadius);
        s.beginPath(), Object.values(L).some((O) => O !== 0) ? ma(s, {
          x: A,
          y: E,
          w: g,
          h: y,
          radius: L
        }) : s.rect(A, E, g, y), s.fill(), V !== 0 && s.stroke();
      }
      s.restore();
    }, x = function(M, S, R) {
      Wn(s, R.text, M, S + b / 2, c, {
        strikethrough: R.hidden,
        textAlign: r.textAlign(R.textAlign)
      });
    }, _ = this.isHorizontal(), w = this._computeTitleHeight();
    _ ? v = {
      x: Xe(o, this.left + d, this.right - a[0]),
      y: this.top + d + w,
      line: 0
    } : v = {
      x: this.left + d,
      y: Xe(o, this.top + w + d, this.bottom - n[0].height),
      line: 0
    }, wi(this.ctx, t.textDirection);
    const C = b + d;
    this.legendItems.forEach((M, S) => {
      s.strokeStyle = M.fontColor, s.fillStyle = M.fontColor;
      const R = s.measureText(M.text).width, V = r.textAlign(M.textAlign || (M.textAlign = i.textAlign)), E = g + m + R;
      let A = v.x, L = v.y;
      r.setWidth(this.width), _ ? S > 0 && A + E + d > this.right && (L = v.y += C, v.line++, A = v.x = Xe(o, this.left + d, this.right - a[v.line])) : S > 0 && L + C > this.bottom && (A = v.x = A + n[v.line].width + d, v.line++, L = v.y = Xe(o, this.top + w + d, this.bottom - n[v.line].height));
      const O = r.x(A);
      if (f(O, L, M), A = gr(V, A + g + m, _ ? A + E : this.right, t.rtl), x(r.x(A), L, M), _)
        v.x += E + d;
      else if (typeof M.text != "string") {
        const q = c.lineHeight;
        v.y += Ni(M, q) + d;
      } else
        v.y += C;
    }), Ci(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, n = t.title, a = Qe(n.font), s = gt(n.padding);
    if (!n.display)
      return;
    const o = pn(t.rtl, this.left, this.width), i = this.ctx, l = n.position, r = a.size / 2, c = s.top + r;
    let d, h = this.left, m = this.width;
    if (this.isHorizontal())
      m = Math.max(...this.lineWidths), d = this.top + c, h = Xe(t.align, h, this.right - m);
    else {
      const g = this.columnSizes.reduce((y, b) => Math.max(y, b.height), 0);
      d = c + Xe(t.align, this.top, this.bottom - g - t.labels.padding - this._computeTitleHeight());
    }
    const v = Xe(l, h, h + m);
    i.textAlign = o.textAlign(os(l)), i.textBaseline = "middle", i.strokeStyle = n.color, i.fillStyle = n.color, i.font = a.string, Wn(i, n.text, v, d, a);
  }
  _computeTitleHeight() {
    const t = this.options.title, n = Qe(t.font), a = gt(t.padding);
    return t.display ? n.lineHeight + a.height : 0;
  }
  _getLegendItemAt(t, n) {
    let a, s, o;
    if (Et(t, this.left, this.right) && Et(n, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, a = 0; a < o.length; ++a)
        if (s = o[a], Et(t, s.left, s.left + s.width) && Et(n, s.top, s.top + s.height))
          return this.legendItems[a];
    }
    return null;
  }
  handleEvent(t) {
    const n = this.options;
    if (!Lu(t.type, n))
      return;
    const a = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const s = this._hoveredItem, o = Du(s, a);
      s && !o && Ee(n.onLeave, [
        t,
        s,
        this
      ], this), this._hoveredItem = a, a && !o && Ee(n.onHover, [
        t,
        a,
        this
      ], this);
    } else a && Ee(n.onClick, [
      t,
      a,
      this
    ], this);
  }
}
function Tu(e, t, n, a, s) {
  const o = Au(a, e, t, n), i = Bu(s, a, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: i
  };
}
function Au(e, t, n, a) {
  let s = e.text;
  return s && typeof s != "string" && (s = s.reduce((o, i) => o.length > i.length ? o : i)), t + n.size / 2 + a.measureText(s).width;
}
function Bu(e, t, n) {
  let a = e;
  return typeof t.text != "string" && (a = Ni(t, n)), a;
}
function Ni(e, t) {
  const n = e.text ? e.text.length : 0;
  return t * n;
}
function Lu(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var bs = {
  id: "legend",
  _element: Mo,
  start(e, t, n) {
    const a = e.legend = new Mo({
      ctx: e.ctx,
      options: n,
      chart: e
    });
    ht.configure(e, a, n), ht.addBox(e, a);
  },
  stop(e) {
    ht.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, n) {
    const a = e.legend;
    ht.configure(e, a, n), a.options = n;
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
        return e._getSortedDatasetMetas().map((r) => {
          const c = r.controller.getStyle(n ? 0 : void 0), d = gt(c.borderWidth);
          return {
            text: t[r.index].label,
            fillStyle: c.backgroundColor,
            fontColor: o,
            hidden: !r.visible,
            lineCap: c.borderCapStyle,
            lineDash: c.borderDash,
            lineDashOffset: c.borderDashOffset,
            lineJoin: c.borderJoinStyle,
            lineWidth: (d.width + d.height) / 4,
            strokeStyle: c.borderColor,
            pointStyle: a || c.pointStyle,
            rotation: c.rotation,
            textAlign: s || c.textAlign,
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
class Wi extends Pt {
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
    const s = Ye(a.text) ? a.text.length : 1;
    this._padding = gt(a.padding);
    const o = s * Qe(a.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = o : this.width = o;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: n, left: a, bottom: s, right: o, options: i } = this, l = i.align;
    let r = 0, c, d, h;
    return this.isHorizontal() ? (d = Xe(l, a, o), h = n + t, c = o - a) : (i.position === "left" ? (d = a + t, h = Xe(l, s, n), r = Fe * -0.5) : (d = o - t, h = Xe(l, n, s), r = Fe * 0.5), c = s - n), {
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
    const a = Qe(n.font), o = a.lineHeight / 2 + this._padding.top, { titleX: i, titleY: l, maxWidth: r, rotation: c } = this._drawArgs(o);
    Wn(t, n.text, 0, 0, a, {
      color: n.color,
      maxWidth: r,
      rotation: c,
      textAlign: os(n.align),
      textBaseline: "middle",
      translation: [
        i,
        l
      ]
    });
  }
}
function Pu(e, t) {
  const n = new Wi({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  ht.configure(e, n, t), ht.addBox(e, n), e.titleBlock = n;
}
var Hi = {
  id: "title",
  _element: Wi,
  start(e, t, n) {
    Pu(e, n);
  },
  stop(e) {
    const t = e.titleBlock;
    ht.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, n) {
    const a = e.titleBlock;
    ht.configure(e, a, n), a.options = n;
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
const An = {
  average(e) {
    if (!e.length)
      return !1;
    let t, n, a = /* @__PURE__ */ new Set(), s = 0, o = 0;
    for (t = 0, n = e.length; t < n; ++t) {
      const l = e[t].element;
      if (l && l.hasValue()) {
        const r = l.tooltipPosition();
        a.add(r.x), s += r.y, ++o;
      }
    }
    return o === 0 || a.size === 0 ? !1 : {
      x: [
        ...a
      ].reduce((l, r) => l + r) / a.size,
      y: s / o
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let n = t.x, a = t.y, s = Number.POSITIVE_INFINITY, o, i, l;
    for (o = 0, i = e.length; o < i; ++o) {
      const r = e[o].element;
      if (r && r.hasValue()) {
        const c = r.getCenterPoint(), d = Ua(t, c);
        d < s && (s = d, l = r);
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
function _t(e, t) {
  return t && (Ye(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function Tt(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function Iu(e, t) {
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
function Do(e, t) {
  const n = e.chart.ctx, { body: a, footer: s, title: o } = e, { boxWidth: i, boxHeight: l } = t, r = Qe(t.bodyFont), c = Qe(t.titleFont), d = Qe(t.footerFont), h = o.length, m = s.length, v = a.length, g = gt(t.padding);
  let y = g.height, b = 0, f = a.reduce((w, C) => w + C.before.length + C.lines.length + C.after.length, 0);
  if (f += e.beforeBody.length + e.afterBody.length, h && (y += h * c.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), f) {
    const w = t.displayColors ? Math.max(l, r.lineHeight) : r.lineHeight;
    y += v * w + (f - v) * r.lineHeight + (f - 1) * t.bodySpacing;
  }
  m && (y += t.footerMarginTop + m * d.lineHeight + (m - 1) * t.footerSpacing);
  let x = 0;
  const _ = function(w) {
    b = Math.max(b, n.measureText(w).width + x);
  };
  return n.save(), n.font = c.string, Re(e.title, _), n.font = r.string, Re(e.beforeBody.concat(e.afterBody), _), x = t.displayColors ? i + 2 + t.boxPadding : 0, Re(a, (w) => {
    Re(w.before, _), Re(w.lines, _), Re(w.after, _);
  }), x = 0, n.font = d.string, Re(e.footer, _), n.restore(), b += g.width, {
    width: b,
    height: y
  };
}
function Ru(e, t) {
  const { y: n, height: a } = t;
  return n < a / 2 ? "top" : n > e.height - a / 2 ? "bottom" : "center";
}
function Fu(e, t, n, a) {
  const { x: s, width: o } = a, i = n.caretSize + n.caretPadding;
  if (e === "left" && s + o + i > t.width || e === "right" && s - o - i < 0)
    return !0;
}
function Eu(e, t, n, a) {
  const { x: s, width: o } = n, { width: i, chartArea: { left: l, right: r } } = e;
  let c = "center";
  return a === "center" ? c = s <= (l + r) / 2 ? "left" : "right" : s <= o / 2 ? c = "left" : s >= i - o / 2 && (c = "right"), Fu(c, e, t, n) && (c = "center"), c;
}
function To(e, t, n) {
  const a = n.yAlign || t.yAlign || Ru(e, n);
  return {
    xAlign: n.xAlign || t.xAlign || Eu(e, t, n, a),
    yAlign: a
  };
}
function Ou(e, t) {
  let { x: n, width: a } = e;
  return t === "right" ? n -= a : t === "center" && (n -= a / 2), n;
}
function Vu(e, t, n) {
  let { y: a, height: s } = e;
  return t === "top" ? a += n : t === "bottom" ? a -= s + n : a -= s / 2, a;
}
function Ao(e, t, n, a) {
  const { caretSize: s, caretPadding: o, cornerRadius: i } = e, { xAlign: l, yAlign: r } = n, c = s + o, { topLeft: d, topRight: h, bottomLeft: m, bottomRight: v } = mn(i);
  let g = Ou(t, l);
  const y = Vu(t, r, c);
  return r === "center" ? l === "left" ? g += c : l === "right" && (g -= c) : l === "left" ? g -= Math.max(d, m) + s : l === "right" && (g += Math.max(h, v) + s), {
    x: Ze(g, 0, a.width - t.width),
    y: Ze(y, 0, a.height - t.height)
  };
}
function oa(e, t, n) {
  const a = gt(n.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - a.right : e.x + a.left;
}
function Bo(e) {
  return _t([], Tt(e));
}
function zu(e, t, n) {
  return cn(e, {
    tooltip: t,
    tooltipItems: n,
    type: "tooltip"
  });
}
function Lo(e, t) {
  const n = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return n ? e.override(n) : e;
}
const ji = {
  beforeTitle: Mt,
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
  afterTitle: Mt,
  beforeBody: Mt,
  beforeLabel: Mt,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const n = e.formattedValue;
    return Ie(n) || (t += n), t;
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
  afterLabel: Mt,
  afterBody: Mt,
  beforeFooter: Mt,
  footer: Mt,
  afterFooter: Mt
};
function at(e, t, n, a) {
  const s = e[t].call(n, a);
  return typeof s > "u" ? ji[t].call(n, a) : s;
}
class Po extends Pt {
  static positioners = An;
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
    const n = this.chart, a = this.options.setContext(this.getContext()), s = a.enabled && n.options.animation && a.animations, o = new Si(this.chart, s);
    return s._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = zu(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, n) {
    const { callbacks: a } = n, s = at(a, "beforeTitle", this, t), o = at(a, "title", this, t), i = at(a, "afterTitle", this, t);
    let l = [];
    return l = _t(l, Tt(s)), l = _t(l, Tt(o)), l = _t(l, Tt(i)), l;
  }
  getBeforeBody(t, n) {
    return Bo(at(n.callbacks, "beforeBody", this, t));
  }
  getBody(t, n) {
    const { callbacks: a } = n, s = [];
    return Re(t, (o) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, l = Lo(a, o);
      _t(i.before, Tt(at(l, "beforeLabel", this, o))), _t(i.lines, at(l, "label", this, o)), _t(i.after, Tt(at(l, "afterLabel", this, o))), s.push(i);
    }), s;
  }
  getAfterBody(t, n) {
    return Bo(at(n.callbacks, "afterBody", this, t));
  }
  getFooter(t, n) {
    const { callbacks: a } = n, s = at(a, "beforeFooter", this, t), o = at(a, "footer", this, t), i = at(a, "afterFooter", this, t);
    let l = [];
    return l = _t(l, Tt(s)), l = _t(l, Tt(o)), l = _t(l, Tt(i)), l;
  }
  _createItems(t) {
    const n = this._active, a = this.chart.data, s = [], o = [], i = [];
    let l = [], r, c;
    for (r = 0, c = n.length; r < c; ++r)
      l.push(Iu(this.chart, n[r]));
    return t.filter && (l = l.filter((d, h, m) => t.filter(d, h, m, a))), t.itemSort && (l = l.sort((d, h) => t.itemSort(d, h, a))), Re(l, (d) => {
      const h = Lo(t.callbacks, d);
      s.push(at(h, "labelColor", this, d)), o.push(at(h, "labelPointStyle", this, d)), i.push(at(h, "labelTextColor", this, d));
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
      const l = An[a.position].call(this, s, this._eventPosition);
      i = this._createItems(a), this.title = this.getTitle(i, a), this.beforeBody = this.getBeforeBody(i, a), this.body = this.getBody(i, a), this.afterBody = this.getAfterBody(i, a), this.footer = this.getFooter(i, a);
      const r = this._size = Do(this, a), c = Object.assign({}, l, r), d = To(this.chart, a, c), h = Ao(a, c, d, this.chart);
      this.xAlign = d.xAlign, this.yAlign = d.yAlign, o = {
        opacity: 1,
        x: h.x,
        y: h.y,
        width: r.width,
        height: r.height,
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
    const { xAlign: s, yAlign: o } = this, { caretSize: i, cornerRadius: l } = a, { topLeft: r, topRight: c, bottomLeft: d, bottomRight: h } = mn(l), { x: m, y: v } = t, { width: g, height: y } = n;
    let b, f, x, _, w, C;
    return o === "center" ? (w = v + y / 2, s === "left" ? (b = m, f = b - i, _ = w + i, C = w - i) : (b = m + g, f = b + i, _ = w - i, C = w + i), x = b) : (s === "left" ? f = m + Math.max(r, d) + i : s === "right" ? f = m + g - Math.max(c, h) - i : f = this.caretX, o === "top" ? (_ = v, w = _ - i, b = f - i, x = f + i) : (_ = v + y, w = _ + i, b = f + i, x = f - i), C = _), {
      x1: b,
      x2: f,
      x3: x,
      y1: _,
      y2: w,
      y3: C
    };
  }
  drawTitle(t, n, a) {
    const s = this.title, o = s.length;
    let i, l, r;
    if (o) {
      const c = pn(a.rtl, this.x, this.width);
      for (t.x = oa(this, a.titleAlign, a), n.textAlign = c.textAlign(a.titleAlign), n.textBaseline = "middle", i = Qe(a.titleFont), l = a.titleSpacing, n.fillStyle = a.titleColor, n.font = i.string, r = 0; r < o; ++r)
        n.fillText(s[r], c.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + l, r + 1 === o && (t.y += a.titleMarginBottom - l);
    }
  }
  _drawColorBox(t, n, a, s, o) {
    const i = this.labelColors[a], l = this.labelPointStyles[a], { boxHeight: r, boxWidth: c } = o, d = Qe(o.bodyFont), h = oa(this, "left", o), m = s.x(h), v = r < d.lineHeight ? (d.lineHeight - r) / 2 : 0, g = n.y + v;
    if (o.usePointStyle) {
      const y = {
        radius: Math.min(c, r) / 2,
        pointStyle: l.pointStyle,
        rotation: l.rotation,
        borderWidth: 1
      }, b = s.leftForLtr(m, c) + c / 2, f = g + r / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, Xa(t, y, b, f), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, Xa(t, y, b, f);
    } else {
      t.lineWidth = Ae(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const y = s.leftForLtr(m, c), b = s.leftForLtr(s.xPlus(m, 1), c - 2), f = mn(i.borderRadius);
      Object.values(f).some((x) => x !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, ma(t, {
        x: y,
        y: g,
        w: c,
        h: r,
        radius: f
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), ma(t, {
        x: b,
        y: g + 1,
        w: c - 2,
        h: r - 2,
        radius: f
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(y, g, c, r), t.strokeRect(y, g, c, r), t.fillStyle = i.backgroundColor, t.fillRect(b, g + 1, c - 2, r - 2));
    }
    t.fillStyle = this.labelTextColors[a];
  }
  drawBody(t, n, a) {
    const { body: s } = this, { bodySpacing: o, bodyAlign: i, displayColors: l, boxHeight: r, boxWidth: c, boxPadding: d } = a, h = Qe(a.bodyFont);
    let m = h.lineHeight, v = 0;
    const g = pn(a.rtl, this.x, this.width), y = function(R) {
      n.fillText(R, g.x(t.x + v), t.y + m / 2), t.y += m + o;
    }, b = g.textAlign(i);
    let f, x, _, w, C, M, S;
    for (n.textAlign = i, n.textBaseline = "middle", n.font = h.string, t.x = oa(this, b, a), n.fillStyle = a.bodyColor, Re(this.beforeBody, y), v = l && b !== "right" ? i === "center" ? c / 2 + d : c + 2 + d : 0, w = 0, M = s.length; w < M; ++w) {
      for (f = s[w], x = this.labelTextColors[w], n.fillStyle = x, Re(f.before, y), _ = f.lines, l && _.length && (this._drawColorBox(n, t, w, g, a), m = Math.max(h.lineHeight, r)), C = 0, S = _.length; C < S; ++C)
        y(_[C]), m = h.lineHeight;
      Re(f.after, y);
    }
    v = 0, m = h.lineHeight, Re(this.afterBody, y), t.y -= o;
  }
  drawFooter(t, n, a) {
    const s = this.footer, o = s.length;
    let i, l;
    if (o) {
      const r = pn(a.rtl, this.x, this.width);
      for (t.x = oa(this, a.footerAlign, a), t.y += a.footerMarginTop, n.textAlign = r.textAlign(a.footerAlign), n.textBaseline = "middle", i = Qe(a.footerFont), n.fillStyle = a.footerColor, n.font = i.string, l = 0; l < o; ++l)
        n.fillText(s[l], r.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + a.footerSpacing;
    }
  }
  drawBackground(t, n, a, s) {
    const { xAlign: o, yAlign: i } = this, { x: l, y: r } = t, { width: c, height: d } = a, { topLeft: h, topRight: m, bottomLeft: v, bottomRight: g } = mn(s.cornerRadius);
    n.fillStyle = s.backgroundColor, n.strokeStyle = s.borderColor, n.lineWidth = s.borderWidth, n.beginPath(), n.moveTo(l + h, r), i === "top" && this.drawCaret(t, n, a, s), n.lineTo(l + c - m, r), n.quadraticCurveTo(l + c, r, l + c, r + m), i === "center" && o === "right" && this.drawCaret(t, n, a, s), n.lineTo(l + c, r + d - g), n.quadraticCurveTo(l + c, r + d, l + c - g, r + d), i === "bottom" && this.drawCaret(t, n, a, s), n.lineTo(l + v, r + d), n.quadraticCurveTo(l, r + d, l, r + d - v), i === "center" && o === "left" && this.drawCaret(t, n, a, s), n.lineTo(l, r + h), n.quadraticCurveTo(l, r, l + h, r), n.closePath(), n.fill(), s.borderWidth > 0 && n.stroke();
  }
  _updateAnimationTarget(t) {
    const n = this.chart, a = this.$animations, s = a && a.x, o = a && a.y;
    if (s || o) {
      const i = An[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const l = this._size = Do(this, t), r = Object.assign({}, i, this._size), c = To(n, t, r), d = Ao(t, r, c, n);
      (s._to !== d.x || o._to !== d.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = l.width, this.height = l.height, this.caretX = i.x, this.caretY = i.y, this._resolveAnimations().update(this, d));
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
    const i = gt(n.padding), l = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    n.enabled && l && (t.save(), t.globalAlpha = a, this.drawBackground(o, t, s, n), wi(t, n.textDirection), o.y += i.top, this.drawTitle(o, t, n), this.drawBody(o, t, n), this.drawFooter(o, t, n), Ci(t, n.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, n) {
    const a = this._active, s = t.map(({ datasetIndex: l, index: r }) => {
      const c = this.chart.getDatasetMeta(l);
      if (!c)
        throw new Error("Cannot find a dataset at index " + l);
      return {
        datasetIndex: l,
        element: c.data[r],
        index: r
      };
    }), o = !ha(a, s), i = this._positionChanged(s, n);
    (o || i) && (this._active = s, this._eventPosition = n, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, n, a = !0) {
    if (n && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const s = this.options, o = this._active || [], i = this._getActiveElements(t, o, n, a), l = this._positionChanged(i, t), r = n || !ha(i, o) || l;
    return r && (this._active = i, (s.enabled || s.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, n))), r;
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
    const { caretX: a, caretY: s, options: o } = this, i = An[o.position].call(this, t, n);
    return i !== !1 && (a !== i.x || s !== i.y);
  }
}
var vs = {
  id: "tooltip",
  _element: Po,
  positioners: An,
  afterInit(e, t, n) {
    n && (e.tooltip = new Po({
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
    callbacks: ji
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
const Nu = (e, t, n, a) => (typeof t == "string" ? (n = e.push(t) - 1, a.unshift({
  index: n,
  label: t
})) : isNaN(t) && (n = null), n);
function Wu(e, t, n, a) {
  const s = e.indexOf(t);
  if (s === -1)
    return Nu(e, t, n, a);
  const o = e.lastIndexOf(t);
  return s !== o ? n : s;
}
const Hu = (e, t) => e === null ? null : Ze(Math.round(e), 0, t);
function Io(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Yi extends yn {
  static id = "category";
  static defaults = {
    ticks: {
      callback: Io
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
    if (Ie(t))
      return null;
    const a = this.getLabels();
    return n = isFinite(n) && a[n] === t ? n : Wu(a, t, _e(n, t), this._addedLabels), Hu(n, a.length - 1);
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
    return Io.call(this, t);
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
function ju(e, t) {
  const n = [], { bounds: s, step: o, min: i, max: l, precision: r, count: c, maxTicks: d, maxDigits: h, includeBounds: m } = e, v = o || 1, g = d - 1, { min: y, max: b } = t, f = !Ie(i), x = !Ie(l), _ = !Ie(c), w = (b - y) / (h + 1);
  let C = Is((b - y) / g / v) * v, M, S, R, V;
  if (C < 1e-14 && !f && !x)
    return [
      {
        value: y
      },
      {
        value: b
      }
    ];
  V = Math.ceil(b / C) - Math.floor(y / C), V > g && (C = Is(V * C / g / v) * v), Ie(r) || (M = Math.pow(10, r), C = Math.ceil(C * M) / M), s === "ticks" ? (S = Math.floor(y / C) * C, R = Math.ceil(b / C) * C) : (S = y, R = b), f && x && o && or((l - i) / o, C / 1e3) ? (V = Math.round(Math.min((l - i) / C, d)), C = (l - i) / V, S = i, R = l) : _ ? (S = f ? i : S, R = x ? l : R, V = c - 1, C = (R - S) / V) : (V = (R - S) / C, Ln(V, Math.round(V), C / 1e3) ? V = Math.round(V) : V = Math.ceil(V));
  const E = Math.max(Rs(C), Rs(S));
  M = Math.pow(10, Ie(r) ? E : r), S = Math.round(S * M) / M, R = Math.round(R * M) / M;
  let A = 0;
  for (f && (m && S !== i ? (n.push({
    value: i
  }), S < i && A++, Ln(Math.round((S + A * C) * M) / M, i, Ro(i, w, e)) && A++) : S < i && A++); A < V; ++A) {
    const L = Math.round((S + A * C) * M) / M;
    if (x && L > l)
      break;
    n.push({
      value: L
    });
  }
  return x && m && R !== l ? n.length && Ln(n[n.length - 1].value, l, Ro(l, w, e)) ? n[n.length - 1].value = l : n.push({
    value: l
  }) : (!x || R === l) && n.push({
    value: R
  }), n;
}
function Ro(e, t, { horizontal: n, minRotation: a }) {
  const s = Bt(a), o = (n ? Math.sin(s) : Math.cos(s)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / o, i);
}
class Yu extends yn {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, n) {
    return Ie(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: n, maxDefined: a } = this.getUserBounds();
    let { min: s, max: o } = this;
    const i = (r) => s = n ? s : r, l = (r) => o = a ? o : r;
    if (t) {
      const r = Ct(s), c = Ct(o);
      r < 0 && c < 0 ? l(0) : r > 0 && c > 0 && i(0);
    }
    if (s === o) {
      let r = o === 0 ? 1 : Math.abs(o * 0.05);
      l(o + r), t || i(s - r);
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
    }, o = this._range || this, i = ju(s, o);
    return t.bounds === "ticks" && ir(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
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
    return ls(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Ki extends Yu {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: mi.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!0);
    this.min = ft(t) ? t : 0, this.max = ft(n) ? n : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), n = t ? this.width : this.height, a = Bt(this.options.ticks.minRotation), s = (t ? Math.sin(a) : Math.cos(a)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(n / Math.min(40, o.lineHeight / s));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const Sa = {
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
}, it = /* @__PURE__ */ Object.keys(Sa);
function Fo(e, t) {
  return e - t;
}
function Eo(e, t) {
  if (Ie(t))
    return null;
  const n = e._adapter, { parser: a, round: s, isoWeekday: o } = e._parseOpts;
  let i = t;
  return typeof a == "function" && (i = a(i)), ft(i) || (i = typeof a == "string" ? n.parse(i, a) : n.parse(i)), i === null ? null : (s && (i = s === "week" && (Vn(o) || o === !0) ? n.startOf(i, "isoWeek", o) : n.startOf(i, s)), +i);
}
function Oo(e, t, n, a) {
  const s = it.length;
  for (let o = it.indexOf(e); o < s - 1; ++o) {
    const i = Sa[it[o]], l = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((n - t) / (l * i.size)) <= a)
      return it[o];
  }
  return it[s - 1];
}
function Ku(e, t, n, a, s) {
  for (let o = it.length - 1; o >= it.indexOf(n); o--) {
    const i = it[o];
    if (Sa[i].common && e._adapter.diff(s, a, i) >= t - 1)
      return i;
  }
  return it[n ? it.indexOf(n) : 0];
}
function Uu(e) {
  for (let t = it.indexOf(e) + 1, n = it.length; t < n; ++t)
    if (Sa[it[t]].common)
      return it[t];
}
function Vo(e, t, n) {
  if (!n)
    e[t] = !0;
  else if (n.length) {
    const { lo: a, hi: s } = ss(n, t), o = n[a] >= t ? n[a] : n[s];
    e[o] = !0;
  }
}
function qu(e, t, n, a) {
  const s = e._adapter, o = +s.startOf(t[0].value, a), i = t[t.length - 1].value;
  let l, r;
  for (l = o; l <= i; l = +s.add(l, 1, a))
    r = n[l], r >= 0 && (t[r].major = !0);
  return t;
}
function zo(e, t, n) {
  const a = [], s = {}, o = t.length;
  let i, l;
  for (i = 0; i < o; ++i)
    l = t[i], s[l] = i, a.push({
      value: l,
      major: !1
    });
  return o === 0 || !n ? a : qu(e, a, s, n);
}
class No extends yn {
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
    const a = t.time || (t.time = {}), s = this._adapter = new Xc._date(t.adapters.date);
    s.init(n), Bn(a.displayFormats, s.formats()), this._parseOpts = {
      parser: a.parser,
      round: a.round,
      isoWeekday: a.isoWeekday
    }, super.init(t), this._normalized = n.normalized;
  }
  parse(t, n) {
    return t === void 0 ? null : Eo(this, t);
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
    function r(c) {
      !i && !isNaN(c.min) && (s = Math.min(s, c.min)), !l && !isNaN(c.max) && (o = Math.max(o, c.max));
    }
    (!i || !l) && (r(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && r(this.getMinMax(!1))), s = ft(s) && !isNaN(s) ? s : +n.startOf(Date.now(), a), o = ft(o) && !isNaN(o) ? o : +n.endOf(Date.now(), a) + 1, this.min = Math.min(s, o - 1), this.max = Math.max(s + 1, o);
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
    const o = this.min, i = this.max, l = ur(s, o, i);
    return this._unit = n.unit || (a.autoSkip ? Oo(n.minUnit, this.min, this.max, this._getLabelCapacity(o)) : Ku(this, l.length, n.minUnit, this.min, this.max)), this._majorUnit = !a.major.enabled || this._unit === "year" ? void 0 : Uu(this._unit), this.initOffsets(s), t.reverse && l.reverse(), zo(this, l, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let n = 0, a = 0, s, o;
    this.options.offset && t.length && (s = this.getDecimalForValue(t[0]), t.length === 1 ? n = 1 - s : n = (this.getDecimalForValue(t[1]) - s) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? a = o : a = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    n = Ze(n, 0, i), a = Ze(a, 0, i), this._offsets = {
      start: n,
      end: a,
      factor: 1 / (n + 1 + a)
    };
  }
  _generate() {
    const t = this._adapter, n = this.min, a = this.max, s = this.options, o = s.time, i = o.unit || Oo(o.minUnit, n, a, this._getLabelCapacity(n)), l = _e(s.ticks.stepSize, 1), r = i === "week" ? o.isoWeekday : !1, c = Vn(r) || r === !0, d = {};
    let h = n, m, v;
    if (c && (h = +t.startOf(h, "isoWeek", r)), h = +t.startOf(h, c ? "day" : i), t.diff(a, n, i) > 1e5 * l)
      throw new Error(n + " and " + a + " are too far apart with stepSize of " + l + " " + i);
    const g = s.ticks.source === "data" && this.getDataTimestamps();
    for (m = h, v = 0; m < a; m = +t.add(m, l, i), v++)
      Vo(d, m, g);
    return (m === a || s.bounds === "ticks" || v === 1) && Vo(d, m, g), Object.keys(d).sort(Fo).map((y) => +y);
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
      return Ee(i, [
        t,
        n,
        a
      ], this);
    const l = o.time.displayFormats, r = this._unit, c = this._majorUnit, d = r && l[r], h = c && l[c], m = a[n], v = c && h && m && m.major;
    return this._adapter.format(t, s || (v ? h : d));
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
    const n = this.options.ticks, a = this.ctx.measureText(t).width, s = Bt(this.isHorizontal() ? n.maxRotation : n.minRotation), o = Math.cos(s), i = Math.sin(s), l = this._resolveTickFontOptions(0).size;
    return {
      w: a * o + l * i,
      h: a * i + l * o
    };
  }
  _getLabelCapacity(t) {
    const n = this.options.time, a = n.displayFormats, s = a[n.unit] || a.millisecond, o = this._tickFormatFunction(t, 0, zo(this, [
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
      t.push(Eo(this, s[n]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return hi(t.sort(Fo));
  }
}
function ia(e, t, n) {
  let a = 0, s = e.length - 1, o, i, l, r;
  n ? (t >= e[a].pos && t <= e[s].pos && ({ lo: a, hi: s } = nn(e, "pos", t)), { pos: o, time: l } = e[a], { pos: i, time: r } = e[s]) : (t >= e[a].time && t <= e[s].time && ({ lo: a, hi: s } = nn(e, "time", t)), { time: o, pos: l } = e[a], { time: i, pos: r } = e[s]);
  const c = i - o;
  return c ? l + (r - l) * (t - o) / c : l;
}
class C$ extends No {
  static id = "timeseries";
  static defaults = No.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(t);
    this._minPos = ia(n, this.min), this._tableRange = ia(n, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: n, max: a } = this, s = [], o = [];
    let i, l, r, c, d;
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
      d = s[i + 1], r = s[i - 1], c = s[i], Math.round((d + r) / 2) !== c && o.push({
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
    return (ia(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const n = this._offsets, a = this.getDecimalForPixel(t) / n.factor - n.end;
    return ia(this._table, a * this._tableRange + this._minPos, !0);
  }
}
const Ui = {
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
}, Xu = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, Gu = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...Ui,
  ...Xu
}, Zu = yl[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function gn(e) {
  return ti(e) ? Ya(e) : e;
}
function Qu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return ti(t) ? new Proxy(e, {}) : e;
}
function Ju(e, t) {
  const n = e.options;
  n && t && Object.assign(n, t);
}
function qi(e, t) {
  e.labels = t;
}
function Xi(e, t, n) {
  const a = [];
  e.datasets = t.map((s) => {
    const o = e.datasets.find((i) => i[n] === s[n]);
    return !o || !s.data || a.includes(o) ? {
      ...s
    } : (a.push(o), Object.assign(o, s), o);
  });
}
function eh(e, t) {
  const n = {
    labels: [],
    datasets: []
  };
  return qi(n, e.labels), Xi(n, e.datasets, t), n;
}
const th = le({
  props: Gu,
  setup(e, t) {
    let { expose: n, slots: a } = t;
    const s = ae(null), o = ei(null);
    n({
      chart: o
    });
    const i = () => {
      if (!s.value) return;
      const { type: c, data: d, options: h, plugins: m, datasetIdKey: v } = e, g = eh(d, v), y = Qu(g, d);
      o.value = new Yt(s.value, {
        type: c,
        data: y,
        options: {
          ...h
        },
        plugins: m
      });
    }, l = () => {
      const c = Ya(o.value);
      c && (e.destroyDelay > 0 ? setTimeout(() => {
        c.destroy(), o.value = null;
      }, e.destroyDelay) : (c.destroy(), o.value = null));
    }, r = (c) => {
      c.update(e.updateMode);
    };
    return tt(i), pt(l), Oe([
      () => e.options,
      () => e.data
    ], (c, d) => {
      let [h, m] = c, [v, g] = d;
      const y = Ya(o.value);
      if (!y)
        return;
      let b = !1;
      if (h) {
        const f = gn(h), x = gn(v);
        f && f !== x && (Ju(y, f), b = !0);
      }
      if (m) {
        const f = gn(m.labels), x = gn(g.labels), _ = gn(m.datasets), w = gn(g.datasets);
        f !== x && (qi(y.config.data, f), b = !0), _ && _ !== w && (Xi(y.config.data, _, e.datasetIdKey), b = !0);
      }
      b && He(() => {
        r(y);
      });
    }, {
      deep: !0
    }), () => ja("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: s
    }, [
      ja("p", {}, [
        a.default ? a.default() : ""
      ])
    ]);
  }
});
function ys(e, t) {
  return Yt.register(t), le({
    props: Ui,
    setup(n, a) {
      let { expose: s } = a;
      const o = ei(null), i = (l) => {
        o.value = l?.chart;
      };
      return s({
        chart: o
      }), () => ja(th, Zu({
        ref: i
      }, {
        type: e,
        ...n
      }));
    }
  });
}
const nh = /* @__PURE__ */ ys("bar", jc), ah = /* @__PURE__ */ ys("line", Uc), sh = /* @__PURE__ */ ys("pie", qc), Wo = {
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
}, Ho = {
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
}, oh = [
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
function Ce(e) {
  const t = ae("light");
  let n = null;
  const a = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", s = $(() => e?.value ? e.value : t.value), o = $(() => s.value === "dark"), i = $(() => o.value ? Ho : Wo), l = () => {
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
  }), pt(() => {
    r();
  }), e && Oe(e, () => {
  }), {
    isDark: o,
    currentTheme: s,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: Wo,
    darkColors: Ho,
    chartSeriesColors: oh
  };
}
const ya = 5, xs = 8, ih = /^x\d*$/, lh = /^y\d*$/;
function Gi(e) {
  if (!e || typeof e != "object") return e;
  const t = { ...e }, n = t.scales;
  if (!n || typeof n != "object") return t;
  const a = { ...n };
  for (const s of Object.keys(a)) {
    const o = a[s];
    if (!o || typeof o != "object") continue;
    const i = { ...o }, l = i.ticks, r = l && typeof l == "object" ? { ...l } : {};
    if (ih.test(s) && (r.maxTicksLimit = xs, r.autoSkip = !0, r.minRotation = 0, r.maxRotation = 0, r.autoSkipPadding = r.autoSkipPadding ?? 8), lh.test(s))
      if (Array.isArray(r.values) && r.values.length > 0)
        r.maxTicksLimit = r.values.length;
      else if (r.stepSize != null) {
        const c = Number(i.min ?? i.suggestedMin ?? 0), d = Number(i.max ?? i.suggestedMax ?? 0), h = Number(r.stepSize);
        d > c && h > 0 ? r.maxTicksLimit = Math.floor((d - c) / h) + 1 : r.maxTicksLimit = ya;
      } else
        r.maxTicksLimit = ya;
    i.ticks = r, a[s] = i;
  }
  return t.scales = a, t;
}
const st = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", rh = ["titleFont", "bodyFont", "footerFont"];
function Zi(e, t = st) {
  if (!e || typeof e != "object") return e;
  const n = { ...e }, a = typeof n.font == "object" && n.font !== null ? n.font : {};
  if (n.font = { ...a, family: t }, n.scales && typeof n.scales == "object") {
    const s = { ...n.scales };
    for (const o of Object.keys(s)) {
      const i = s[o];
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
      s[o] = l;
    }
    n.scales = s;
  }
  if (n.plugins && typeof n.plugins == "object") {
    const s = { ...n.plugins }, o = s.legend;
    if (o && typeof o == "object") {
      const l = { ...o }, r = l.labels;
      if (r && typeof r == "object") {
        const c = { ...r }, d = typeof c.font == "object" && c.font !== null ? c.font : {};
        c.font = { ...d, family: t }, l.labels = c;
      }
      s.legend = l;
    }
    const i = s.tooltip;
    if (i && typeof i == "object") {
      const l = { ...i };
      for (const r of rh) {
        const c = l[r];
        c && typeof c == "object" && (l[r] = { ...c, family: t });
      }
      s.tooltip = l;
    }
    n.plugins = s;
  }
  return n;
}
const ch = { class: "relative h-[230px] w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, jo = 10, dh = /* @__PURE__ */ le({
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
    Yt.register(Yi, Ki, Mu, Hi, vs, bs), Yt.defaults.font.family = st;
    const { isDark: a, colors: s } = Ce(we(n, "theme")), o = $(() => n.data), i = (d) => typeof d == "string" ? d.charAt(0).toUpperCase() + d.slice(1).toLowerCase() : d, l = (d) => typeof d != "string" ? d : n.uppercaseLegendLabels ? d.toUpperCase() : i(d);
    function r(d, h) {
      if (h == null) return d;
      if (Array.isArray(h) || typeof h != "object" || d == null || Array.isArray(d) || typeof d != "object") return h;
      const m = { ...d };
      for (const v of Object.keys(h)) {
        const g = h[v];
        g !== void 0 && (m[v] = r(d[v], g));
      }
      return m;
    }
    const c = $(() => {
      const d = {
        font: {
          family: st
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
                family: st,
                size: 13,
                weight: "500"
              },
              padding: 12,
              boxWidth: jo,
              boxHeight: jo,
              usePointStyle: !1,
              generateLabels: function(m) {
                return m.data.datasets.map((g, y) => {
                  const b = Array.isArray(g.backgroundColor) ? g.backgroundColor[0] : g.backgroundColor, f = Array.isArray(g.borderColor) ? g.borderColor[0] : g.borderColor, x = typeof f == "string" && f.length > 0 ? f : typeof b == "string" && b.length > 0 ? b : s.value.textSecondary;
                  return {
                    text: l(g.label || ""),
                    fillStyle: typeof b == "string" ? b : x,
                    strokeStyle: x,
                    lineWidth: 0,
                    fontColor: x,
                    hidden: !m.isDatasetVisible(y),
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
              family: st,
              size: 13,
              weight: "600"
            },
            bodyFont: {
              family: st,
              size: 12,
              weight: "500"
            },
            boxPadding: 6,
            callbacks: {
              title: function(m) {
                return m.length > 0 ? String(i(m[0].label)) : "";
              },
              label: function(m) {
                let v = String(i(m.dataset.label || ""));
                return v && (v += ": "), m.parsed.y !== null && (v += m.parsed.y), v;
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
              maxTicksLimit: ya,
              font: {
                family: st,
                size: 12,
                weight: "500"
              },
              color: s.value.textSecondary,
              padding: 8,
              callback: function(m) {
                return i(m);
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
              maxTicksLimit: xs,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: st,
                size: 12,
                weight: "500"
              },
              color: s.value.textSecondary,
              padding: 8,
              callback: function(m) {
                const v = this.getLabelForValue(m);
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
      return Zi(
        Gi(h)
      );
    });
    return t({ isDark: a }), (d, h) => (p(), k("div", ch, [
      F(T(nh), {
        data: o.value,
        options: c.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), me = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, $t = /* @__PURE__ */ me(dh, [["__scopeId", "data-v-ee7ca6f2"]]), uh = { class: "chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] min-w-0" }, hh = { class: "chart-line-canvas-host relative min-h-0 w-full flex-1" }, fh = {
  key: 0,
  class: "chart-line-indicators mt-0 flex shrink-0 list-none flex-nowrap items-center justify-center gap-x-4 overflow-x-auto overflow-y-hidden px-1 pb-0.5 pt-0.5",
  role: "list"
}, gh = ["aria-pressed", "aria-label", "onClick"], mh = {
  class: "inline-flex shrink-0 items-center",
  "aria-hidden": "true"
}, ph = /* @__PURE__ */ le({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    uppercaseLegendLabels: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Yt.register(
      Yi,
      Ki,
      _u,
      xu,
      Hi,
      vs,
      bs
    ), Yt.defaults.font.family = st;
    const a = ae(null), { isDark: s, colors: o } = Ce(we(n, "theme")), i = $(() => o.value.bgCard), l = $(() => {
      const b = i.value;
      return {
        labels: n.data.labels,
        datasets: n.data.datasets.map((f) => {
          const x = f.borderColor, _ = Array.isArray(x) ? x[0] : x, w = typeof _ == "string" && _.length > 0 ? _ : o.value.textSecondary, C = f.pointBackgroundColor !== void 0 ? f.pointBackgroundColor : b, M = f.pointHoverBackgroundColor !== void 0 ? f.pointHoverBackgroundColor : C, S = f.pointBorderWidth ?? 2, R = f.pointHoverBorderWidth ?? S;
          return {
            ...f,
            fill: f.fill ?? !1,
            pointBackgroundColor: C,
            pointHoverBackgroundColor: M,
            pointBorderColor: f.pointBorderColor ?? w,
            pointHoverBorderColor: f.pointHoverBorderColor ?? w,
            pointBorderWidth: S,
            pointHoverBorderWidth: R
          };
        })
      };
    }), r = (b) => typeof b == "string" ? b.charAt(0).toUpperCase() + b.slice(1).toLowerCase() : b, c = (b) => typeof b != "string" ? b : n.uppercaseLegendLabels ? b.toUpperCase() : r(b);
    function d(b) {
      const f = b.borderColor, x = Array.isArray(f) ? f[0] : f;
      return typeof x == "string" && x.length > 0 ? x : o.value.textSecondary;
    }
    const h = $(
      () => l.value.datasets.map((b, f) => ({
        key: `${b.label ?? "dataset"}-${f}`,
        label: c(b.label || ""),
        color: d(b)
      }))
    ), m = ae([]);
    Oe(
      () => l.value.datasets.length,
      (b) => {
        const f = Array.from({ length: b }, (x, _) => m.value[_] ?? !0);
        m.value = f;
      },
      { immediate: !0 }
    );
    function v(b) {
      const x = a.value?.chart;
      if (!x || b < 0 || b >= x.data.datasets.length) return;
      const _ = !x.isDatasetVisible(b);
      x.setDatasetVisibility(b, _), m.value[b] = _, x.update();
    }
    function g(b, f) {
      if (f == null) return b;
      if (Array.isArray(f) || typeof f != "object" || b == null || Array.isArray(b) || typeof b != "object") return f;
      const x = { ...b };
      for (const _ of Object.keys(f)) {
        const w = f[_];
        w !== void 0 && (x[_] = g(b[_], w));
      }
      return x;
    }
    const y = $(() => {
      const b = {
        font: {
          family: st
        },
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
            backgroundColor: o.value.tooltipBg,
            titleColor: o.value.tooltipText,
            bodyColor: o.value.textSecondary,
            borderColor: o.value.tooltipBorder,
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            displayColors: !0,
            titleFont: {
              family: st,
              size: 14,
              weight: "600"
            },
            bodyFont: {
              family: st,
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
              color: o.value.gridLines,
              lineWidth: 1,
              drawTicks: !1
            },
            ticks: {
              maxTicksLimit: xs,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: st,
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
              maxTicksLimit: ya,
              font: {
                family: st,
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
            radius: 4,
            hoverRadius: 6,
            borderWidth: 2,
            hoverBorderWidth: 2
          }
        }
      }, f = n.options ? g(b, n.options) : b;
      return Zi(
        Gi(f)
      );
    });
    return t({ isDark: s }), (b, f) => (p(), k("div", uh, [
      u("div", hh, [
        F(T(ah), {
          ref_key: "lineChartRef",
          ref: a,
          data: l.value,
          options: y.value
        }, null, 8, ["data", "options"])
      ]),
      h.value.length > 0 ? (p(), k("ul", fh, [
        (p(!0), k(ne, null, fe(h.value, (x, _) => (p(), k("li", {
          key: x.key,
          role: "listitem"
        }, [
          u("button", {
            type: "button",
            class: J(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", m.value[_] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: Te({ color: x.color }),
            "aria-pressed": m.value[_] !== !1,
            "aria-label": `${x.label}. ${m.value[_] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (w) => v(_)
          }, [
            u("span", mh, [
              f[0] || (f[0] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1)),
              u("span", {
                class: "relative z-[1] box-border size-2 shrink-0 rounded-full border-2 bg-transparent",
                style: Te({ borderColor: x.color })
              }, null, 4),
              f[1] || (f[1] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1))
            ]),
            u("span", null, D(x.label), 1)
          ], 14, gh)
        ]))), 128))
      ])) : z("", !0)
    ]));
  }
}), vt = /* @__PURE__ */ me(ph, [["__scopeId", "data-v-fc764ffb"]]), bh = { class: "chart-container" }, vh = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", yh = /* @__PURE__ */ le({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Yt.register(du, vs, bs);
    const { isDark: a, colors: s } = Ce(we(n, "theme")), o = n.data, i = (r) => typeof r == "string" ? r.charAt(0).toUpperCase() + r.slice(1).toLowerCase() : r, l = $(() => n.options ? n.options : {
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
              family: vh,
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
                const v = r.getDatasetMeta(0).controller.getStyle(h), y = c.datasets[0].data[h], b = typeof v.backgroundColor == "string" && v.backgroundColor.length > 0 ? v.backgroundColor : s.value.textSecondary;
                return {
                  text: `${i(d)}: ${y}`,
                  fillStyle: v.backgroundColor,
                  strokeStyle: v.borderColor,
                  lineWidth: v.borderWidth,
                  lineDash: v.borderDash,
                  lineDashOffset: v.borderDashOffset,
                  lineJoin: v.borderJoinStyle,
                  fontColor: b,
                  hidden: !r.getDataVisibility(h),
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
            title: function(r) {
              return r.length > 0 ? String(i(r[0].label)) : "";
            },
            label: function(r) {
              const c = r.label || "", d = r.parsed || 0, h = r.dataset.data.reduce((v, g) => v + g, 0), m = (d / h * 100).toFixed(1);
              return `${i(c)}: ${d} (${m}%)`;
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
    return t({ isDark: a }), (r, c) => (p(), k("div", bh, [
      F(T(sh), {
        data: T(o),
        options: l.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Ma = /* @__PURE__ */ me(yh, [["__scopeId", "data-v-0f7806d6"]]), xh = { class: "chart-container" }, _h = ["viewBox"], kh = ["transform"], wh = ["x", "width", "fill", "stroke"], Ch = ["fill"], $h = ["x1", "y1", "x2", "y2", "stroke"], Sh = ["points", "fill"], Mh = ["x1", "y1", "x2", "y2", "stroke"], Dh = ["x", "y", "fill"], Th = ["x1", "y1", "x2", "y2", "stroke"], Ah = ["points", "fill"], Bh = ["transform"], Lh = ["y1", "y2"], Ph = ["y1", "y2"], Ih = ["y1", "y2"], Rh = ["y1", "y2"], Fh = ["y", "height"], Eh = ["y1", "y2"], Oh = ["y1", "y2"], Vh = ["y1", "y2"], zh = ["y1", "y2"], Nh = ["y", "height"], Wh = ["cy", "stroke", "onMouseenter"], Hh = ["cy", "stroke", "onMouseenter"], jh = ["cy", "stroke", "onMouseenter"], Yh = ["cy", "stroke", "onMouseenter"], Kh = ["y1", "y2", "onMouseenter"], Uh = ["y1", "y2", "onMouseenter"], qh = ["x", "y", "fill"], Xh = ["x", "y", "fill"], Gh = ["transform"], Zh = { transform: "translate(-200, 0)" }, Qh = ["stroke"], Jh = ["fill"], ef = { transform: "translate(-130, 0)" }, tf = ["stroke"], nf = ["fill"], af = { transform: "translate(-60, 0)" }, sf = ["stroke"], of = ["fill"], lf = { transform: "translate(10, 0)" }, rf = ["stroke"], cf = ["fill"], df = { transform: "translate(80, 0)" }, uf = ["fill"], hf = { transform: "translate(150, 0)" }, ff = ["fill"], gf = /* @__PURE__ */ le({
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
    const n = e, { isDark: a } = Ce(we(n, "theme")), s = $(() => ({
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
    })), o = ae({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), i = (m) => typeof m == "string" ? m.charAt(0).toUpperCase() + m.slice(1).toLowerCase() : m, l = (m, v) => {
      const g = m.currentTarget.closest("svg");
      if (!g) return;
      const y = g.getBoundingClientRect(), b = g.createSVGPoint();
      b.x = m.clientX - y.left, b.y = m.clientY - y.top, o.value = {
        visible: !0,
        x: b.x,
        y: b.y - 20,
        text: v
      };
    }, r = (m) => {
      if (o.value.visible) {
        const v = m.currentTarget, g = v.getBoundingClientRect(), y = v.createSVGPoint();
        y.x = m.clientX - g.left, y.y = m.clientY - g.top, o.value.x = y.x, o.value.y = y.y - 20;
      }
    }, c = () => {
      o.value.visible = !1;
    }, d = () => {
      o.value.visible = !1;
    }, h = $(() => {
      const m = [], g = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let y = 1; y <= 10; y++) {
        const b = y, f = (b - 1) / 9, x = n.chartMargin + g - f * g;
        m.push({ value: b, y: x });
      }
      return m;
    });
    return t({ isDark: a }), (m, v) => (p(), k("div", xh, [
      (p(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: Te(`min-height: ${e.chartHeight}px;`),
        onMousemove: r,
        onMouseleave: c
      }, [
        o.value.visible ? (p(), k("g", {
          key: 0,
          transform: `translate(${o.value.x}, ${o.value.y})`
        }, [
          u("rect", {
            x: -(o.value.text.length * 6 + 10),
            y: -16,
            width: o.value.text.length * 12 + 20,
            height: "24",
            fill: s.value.tooltipBg,
            rx: "6",
            stroke: s.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, wh),
          u("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: s.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, D(o.value.text), 9, Ch)
        ], 8, kh)) : z("", !0),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: s.value.axis,
          "stroke-width": "2"
        }, null, 8, $h),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: s.value.axis
        }, null, 8, Sh),
        (p(!0), k(ne, null, fe(h.value, (g, y) => (p(), k(ne, { key: y }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: g.y,
            x2: e.chartMargin,
            y2: g.y,
            stroke: s.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Mh),
          u("text", {
            x: e.chartMargin - 12,
            y: g.y + 4,
            "text-anchor": "end",
            fill: s.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, D(g.value), 9, Dh)
        ], 64))), 128)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: s.value.axis,
          "stroke-width": "2"
        }, null, 8, Th),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: s.value.axis
        }, null, 8, Ah),
        (p(!0), k(ne, null, fe(e.boxplotData, (g, y) => (p(), k(ne, { key: y }, [
          u("g", {
            transform: `translate(${g.centerX}, 0)`
          }, [
            g.isTotal ? (p(), k(ne, { key: 0 }, [
              u("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Lh),
              u("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Ph),
              u("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Ih),
              u("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Rh),
              u("rect", {
                x: -24,
                y: g.q3Y,
                width: "48",
                height: g.q1Y - g.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, Fh)
            ], 64)) : (p(), k(ne, { key: 1 }, [
              u("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Eh),
              u("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Oh),
              u("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Vh),
              u("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, zh),
              u("rect", {
                x: -24,
                y: g.q3Y,
                width: "48",
                height: g.q1Y - g.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, Nh)
            ], 64)),
            u("circle", {
              cx: 0,
              cy: g.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => l(b, `Min: ${g.min.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Wh),
            u("circle", {
              cx: 0,
              cy: g.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => l(b, `Q1: ${g.q1.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Hh),
            u("circle", {
              cx: 0,
              cy: g.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => l(b, `Q3: ${g.q3.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, jh),
            u("circle", {
              cx: 0,
              cy: g.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => l(b, `Max: ${g.max.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Yh),
            u("line", {
              x1: -24,
              y1: g.medianY,
              x2: 24,
              y2: g.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (b) => l(b, `Median: ${g.median.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Kh),
            g.averageY ? (p(), k("line", {
              key: 2,
              x1: -24,
              y1: g.averageY,
              x2: 24,
              y2: g.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (b) => l(b, `Avg: ${g.average.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Uh)) : z("", !0)
          ], 8, Bh),
          u("text", {
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: s.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, D(i(g.label)), 9, qh),
          g.responseCount ? (p(), k("text", {
            key: 0,
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: s.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + D(g.responseCount), 9, Xh)) : z("", !0)
        ], 64))), 128)),
        e.showLegend ? (p(), k("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          u("g", Zh, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Qh),
            u("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Jh)
          ]),
          u("g", ef, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, tf),
            u("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, nf)
          ]),
          u("g", af, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, sf),
            u("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, of)
          ]),
          u("g", lf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, rf),
            u("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, cf)
          ]),
          u("g", df, [
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
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, uf)
          ]),
          u("g", hf, [
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
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, ff)
          ])
        ], 8, Gh)) : z("", !0)
      ], 44, _h))
    ]));
  }
}), mf = /* @__PURE__ */ me(gf, [["__scopeId", "data-v-9ac5c075"]]), pf = { class: "chart-container" }, bf = ["viewBox"], vf = ["x1", "y1", "x2", "y2", "stroke"], yf = ["points", "fill"], xf = ["x1", "y1", "x2", "y2", "stroke"], _f = ["x1", "y1", "x2", "y2", "stroke"], kf = ["x", "y", "fill"], wf = ["x", "y", "fill", "transform"], Cf = ["x1", "y1", "x2", "y2", "stroke"], $f = ["points", "fill"], Sf = ["transform"], Mf = ["y1", "y2", "stroke", "onMouseenter"], Df = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], Tf = ["x1", "y1", "x2", "y2", "onMouseenter"], Af = ["x1", "y1", "x2", "y2", "onMouseenter"], Bf = ["cy", "stroke", "onMouseenter"], Lf = ["cy", "stroke", "onMouseenter"], Pf = ["x", "y", "fill"], If = ["x", "y", "fill"], Rf = ["transform"], Ff = { transform: "translate(-180, 0)" }, Ef = ["stroke"], Of = ["fill"], Vf = { transform: "translate(-120, 0)" }, zf = ["fill"], Nf = { transform: "translate(-60, 0)" }, Wf = ["fill"], Hf = { transform: "translate(0, 0)" }, jf = ["stroke"], Yf = ["fill"], Kf = { transform: "translate(60, 0)" }, Uf = ["fill"], qf = { transform: "translate(130, 0)" }, Xf = ["fill"], Gf = ["transform"], Zf = ["x", "y", "width", "height", "fill", "stroke"], Qf = ["y", "fill"], Jf = ["y", "fill"], la = 10, eg = 14, Na = 13, Yo = 4, Ko = 12, tg = /* @__PURE__ */ le({
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
    const n = e, { isDark: a, colors: s } = Ce(we(n, "theme")), o = la + Na + Yo + Ko + la, i = $(() => ({
      bg: s.value.tooltipBg,
      border: s.value.tooltipBorder,
      text: s.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(x, _, w) {
      const C = w ? 0.6 : 0.535;
      return Math.ceil(Math.max(x, 1) * _ * C);
    }
    function r(x, _) {
      return Math.max(
        l(x.length, Na, !0),
        l(_.length, Ko, !1),
        52
      ) + eg * 2;
    }
    function c(x, _, w, C) {
      const M = w / 2, S = 6, R = Math.min(
        Math.max(x, M + S),
        n.chartWidth - M - S
      ), V = S + C + 10, E = n.chartHeight - S + 10, A = Math.min(Math.max(_, V), E);
      return { x: R, y: A };
    }
    const d = $(() => ({
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
    })), h = ae({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), m = (x) => typeof x == "string" ? x.charAt(0).toUpperCase() + x.slice(1).toLowerCase() : x, v = (x, _, w) => {
      const C = x.currentTarget.closest("svg");
      if (!C) return;
      const M = C.getBoundingClientRect(), S = C.createSVGPoint();
      S.x = x.clientX - M.left, S.y = x.clientY - M.top;
      let R = m(_.label), V = "";
      switch (w) {
        case "body":
          V = `Q1: ${_.q1.toFixed(1)} | Q3: ${_.q3.toFixed(1)}`;
          break;
        case "wick":
          V = `Min: ${_.low.toFixed(1)} | Max: ${_.high.toFixed(1)}`;
          break;
        case "median":
          V = `Median: ${_.median.toFixed(1)}`;
          break;
        case "average":
          V = `Average: ${_.average?.toFixed(1) ?? ""}`;
          break;
        case "min":
          V = `Min: ${_.low.toFixed(1)}`;
          break;
        case "max":
          V = `Max: ${_.high.toFixed(1)}`;
          break;
      }
      const E = r(R, V), A = o;
      let L = S.x, O = S.y - 20;
      const q = c(L, O, E, A);
      L = q.x, O = q.y, h.value = {
        visible: !0,
        x: L,
        y: O,
        title: R,
        text: V,
        width: E,
        height: A
      };
    }, g = (x) => {
      if (h.value.visible) {
        const _ = x.currentTarget, w = _.getBoundingClientRect(), C = _.createSVGPoint();
        C.x = x.clientX - w.left, C.y = x.clientY - w.top;
        let M = C.x, S = C.y - 20;
        const R = c(M, S, h.value.width, h.value.height);
        h.value.x = R.x, h.value.y = R.y;
      }
    }, y = () => {
      h.value.visible = !1;
    }, b = () => {
      h.value.visible = !1;
    }, f = $(() => {
      const x = [], w = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let C = 1; C <= 10; C++) {
        const M = C, S = (M - 1) / 9, R = n.chartMargin + w - S * w;
        x.push({ value: M, y: R });
      }
      return x;
    });
    return t({ isDark: a }), (x, _) => (p(), k("div", pf, [
      (p(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: Te(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: g,
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
        }, null, 8, vf),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, yf),
        (p(!0), k(ne, null, fe(f.value, (w, C) => (p(), k("line", {
          key: `grid-${C}`,
          x1: e.chartMargin,
          y1: w.y,
          x2: e.chartWidth - e.chartMargin,
          y2: w.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, xf))), 128)),
        (p(!0), k(ne, null, fe(f.value, (w, C) => (p(), k(ne, { key: C }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: w.y,
            x2: e.chartMargin,
            y2: w.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, _f),
          u("text", {
            x: e.chartMargin - 12,
            y: w.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, D(w.value), 9, kf)
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
        }, D(m(e.yAxisLabel)), 9, wf),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, Cf),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, $f),
        (p(!0), k(ne, null, fe(e.candlestickData, (w, C) => (p(), k(ne, { key: C }, [
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
              onMouseenter: (M) => v(M, w, "wick"),
              onMouseleave: b,
              style: { cursor: "pointer" }
            }, null, 40, Mf),
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
              onMouseenter: (M) => v(M, w, "body"),
              onMouseleave: b,
              style: { cursor: "pointer" }
            }, null, 40, Df),
            w.medianY ? (p(), k("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: w.medianY,
              x2: e.candleWidth / 2,
              y2: w.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (M) => v(M, w, "median"),
              onMouseleave: b,
              style: { cursor: "pointer" }
            }, null, 40, Tf)) : z("", !0),
            w.averageY ? (p(), k("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: w.averageY,
              x2: e.candleWidth / 2,
              y2: w.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (M) => v(M, w, "average"),
              onMouseleave: b,
              style: { cursor: "pointer" }
            }, null, 40, Af)) : z("", !0),
            u("circle", {
              cx: 0,
              cy: w.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (M) => v(M, w, "min"),
              onMouseleave: b,
              style: { cursor: "pointer" }
            }, null, 40, Bf),
            u("circle", {
              cx: 0,
              cy: w.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (M) => v(M, w, "max"),
              onMouseleave: b,
              style: { cursor: "pointer" }
            }, null, 40, Lf)
          ], 8, Sf),
          u("text", {
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, D(m(w.label)), 9, Pf),
          w.responseCount ? (p(), k("text", {
            key: 0,
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: d.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + D(w.responseCount), 9, If)) : z("", !0)
        ], 64))), 128)),
        e.showLegend ? (p(), k("g", {
          key: 0,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          u("g", Ff, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: d.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Ef),
            u("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Of)
          ]),
          u("g", Vf, [
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
            }, " Q1 ", 8, zf)
          ]),
          u("g", Nf, [
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
            }, " Q3 ", 8, Wf)
          ]),
          u("g", Hf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: d.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, jf),
            u("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Yf)
          ]),
          u("g", Kf, [
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
            }, " Avg ", 8, Uf)
          ]),
          u("g", qf, [
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
            }, " Median ", 8, Xf)
          ])
        ], 8, Rf)) : z("", !0),
        h.value.visible ? (p(), k("g", {
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
          }, null, 8, Zf),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + la,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, D(h.value.title), 9, Qf),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + la + Na + Yo,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, D(h.value.text), 9, Jf)
        ], 8, Gf)) : z("", !0)
      ], 44, bf))
    ]));
  }
}), ng = /* @__PURE__ */ me(tg, [["__scopeId", "data-v-22efd66d"]]), ag = ["viewBox"], sg = ["x1", "y1", "x2", "y2", "stroke"], og = ["x1", "y1", "x2", "y2", "stroke"], ig = ["points", "fill"], lg = ["x1", "y1", "x2", "y2", "stroke"], rg = ["x", "y", "fill"], cg = ["x", "y", "fill", "transform"], dg = ["x1", "y1", "x2", "y2", "stroke"], ug = ["points", "fill"], hg = ["x1", "y1", "x2", "y2", "stroke"], fg = ["x", "y", "fill"], gg = ["x", "y", "fill"], mg = ["d"], pg = ["x", "y", "width", "height", "onMouseenter"], bg = ["x1", "y1", "x2", "y2"], vg = ["x", "y"], yg = ["x1", "y1", "x2", "y2"], xg = ["x", "y"], _g = ["x1", "y1", "x2", "y2"], kg = ["x", "y"], wg = ["x1", "y1", "x2", "y2"], Cg = ["x", "y"], $g = ["x1", "y1", "x2", "y2"], Sg = ["x", "y"], Mg = ["x1", "y1", "x2", "y2"], Dg = ["x", "y"], Tg = ["transform"], Ag = { transform: "translate(-220, 0)" }, Bg = ["fill"], Lg = { transform: "translate(-140, 0)" }, Pg = ["fill"], Ig = { transform: "translate(-80, 0)" }, Rg = ["fill"], Fg = { transform: "translate(-20, 0)" }, Eg = ["fill"], Og = { transform: "translate(60, 0)" }, Vg = ["fill"], zg = { transform: "translate(130, 0)" }, Ng = ["fill"], Wg = { transform: "translate(180, 0)" }, Hg = ["fill"], jg = ["transform"], Yg = ["x", "y", "width", "height", "fill", "stroke"], Kg = ["y", "fill"], Ug = ["y", "fill"], ra = 10, qg = 14, Wa = 13, Uo = 12, qo = 4, Xg = /* @__PURE__ */ le({
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
    chartMarginRight: { default: void 0 },
    chartBottomMargin: { default: 80 },
    plotInset: { default: 6 },
    showLegend: { type: Boolean, default: !0 },
    showStatLabels: { type: Boolean, default: !0 },
    interactive: { type: Boolean, default: !0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = Ce(we(n, "theme")), o = ra + Wa + qo + Uo + ra, i = $(() => ({
      bg: s.value.tooltipBg,
      border: s.value.tooltipBorder,
      text: s.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(Y, W, U) {
      const re = U ? 0.6 : 0.535;
      return Math.ceil(Math.max(Y, 1) * W * re);
    }
    function r(Y, W) {
      return Math.max(
        l(Y.length, Wa, !0),
        l(W.length, Uo, !1),
        52
      ) + qg * 2;
    }
    function c(Y, W, U, re) {
      const ue = U / 2, P = 6, j = Math.min(
        Math.max(Y, ue + P),
        n.chartWidth - ue - P
      ), Q = P + re + 10, ce = n.chartHeight - P + 10, pe = Math.min(Math.max(W, Q), ce);
      return { x: j, y: pe };
    }
    const d = $(() => ({
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
    })), h = ae({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0,
      /** Centro SVG X de la barra activa; fija tooltip horizontal sobre la columna correcta cuando el SVG escala por CSS */
      anchorX: null
    }), m = $(
      () => n.chartMarginRight ?? n.chartMargin
    ), v = $(() => n.chartMargin + n.plotInset), g = $(
      () => n.chartWidth - m.value - n.plotInset
    ), y = $(() => Math.max(g.value - v.value, 1)), b = $(() => n.chartHeight - n.chartMargin - n.chartBottomMargin), f = $(() => y.value / 10 * 0.52);
    function x(Y) {
      if (Y < 1 || Y > 10) return null;
      const W = y.value / 10;
      return v.value + (Y - 0.5) * W;
    }
    const _ = $(
      () => Array.from({ length: 10 }, (Y, W) => {
        const U = W + 1, re = x(U);
        return re === null ? null : { score: U, x: re };
      }).filter((Y) => Y !== null)
    ), w = $(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const Y = Math.max(...n.histogram.map((U) => U.count || 0), 1), W = Math.max(1, Math.ceil(Y * 0.2));
      return Y + W;
    }), C = $(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const Y = n.averageScore || 0;
      let W = 0, U = 0;
      if (n.histogram.forEach((ue) => {
        const P = ue.count || 0;
        W += P;
        const j = ue.score - Y;
        U += P * (j * j);
      }), W === 0) return 1;
      const re = U / W;
      return Math.sqrt(re) || 1;
    }), M = (Y, W, U) => {
      if (U === 0) return 0;
      const re = 1 / (U * Math.sqrt(2 * Math.PI)), ue = -0.5 * Math.pow((Y - W) / U, 2);
      return re * Math.exp(ue);
    }, S = $(() => {
      if (!n.histogram || n.histogram.length === 0 || n.averageScore === 0 && C.value === 0) return null;
      const Y = n.averageScore, W = C.value, U = 100, ue = Math.max(...n.histogram.map((ce) => ce.count || 0), 1) / w.value * b.value;
      if (ue <= 0) return null;
      let P = 0;
      for (let ce = 0; ce <= U; ce++) {
        const pe = 1 + 9 * (ce / U), xe = M(pe, Y, W);
        xe > P && (P = xe);
      }
      if (P <= 0) return null;
      const j = ue / P, Q = [];
      for (let ce = 0; ce <= U; ce++) {
        const pe = 1 + 9 * (ce / U), xe = M(pe, Y, W) * j, Le = x(pe);
        if (Le !== null) {
          const Je = n.chartHeight - n.chartBottomMargin - xe;
          Q.push(`${ce === 0 ? "M" : "L"} ${Le} ${Je}`);
        }
      }
      return Q.join(" ");
    }), R = $(() => {
      if (!n.histogram || n.histogram.length === 0) return [];
      const Y = y.value / 10;
      return n.histogram.map((W) => {
        const U = Number(W.score);
        if (!Number.isFinite(U) || U < 1 || U > 10)
          return null;
        const re = v.value + (U - 0.5) * Y, ue = W.count > 0 ? W.count / w.value * b.value : 0, P = n.chartHeight - n.chartBottomMargin - ue;
        return {
          score: U,
          count: W.count,
          x: re,
          y: P,
          height: ue
        };
      }).filter((W) => W !== null);
    }), V = $(() => x(n.minScore)), E = $(() => x(n.maxScore)), A = $(() => x(n.q1Score)), L = $(() => x(n.medianScore)), O = $(() => x(n.q3Score)), q = $(() => x(n.averageScore)), X = $(() => n.minScore), ie = $(() => n.maxScore), se = $(() => n.q1Score), Z = $(() => n.medianScore), he = $(() => n.q3Score), K = $(() => n.averageScore), G = $(() => {
      const Y = [], W = n.chartMargin - 8, U = 18;
      A.value !== null && Y.push({
        x: A.value,
        y: W,
        value: n.q1Score,
        label: `Q1: ${se.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), L.value !== null && Y.push({
        x: L.value,
        y: W - U,
        value: n.medianScore,
        label: `Median: ${Z.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), q.value !== null && Y.push({
        x: q.value,
        y: W - U,
        value: n.averageScore,
        label: `Avg: ${K.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), O.value !== null && Y.push({
        x: O.value,
        y: W,
        value: n.q3Score,
        label: `Q3: ${he.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), Y.sort((P, j) => (P.x || 0) - (j.x || 0));
      const re = [[], [], []];
      Y.forEach((P) => {
        if (P.x === null) return;
        let j = -1;
        for (let Q = 0; Q < re.length; Q++) {
          let ce = !1;
          for (const pe of re[Q]) {
            if (pe.x === null) continue;
            const xe = Math.abs(P.x - pe.x), Le = (P.width + pe.width) / 2 + 10;
            if (xe < Le) {
              ce = !0;
              break;
            }
          }
          if (!ce) {
            j = Q;
            break;
          }
        }
        j === -1 && (j = re.length - 1), P.y = W - j * U, re[j].push(P);
      });
      const ue = 15;
      return Y.forEach((P) => {
        P.y < ue && (P.y = ue);
      }), Y;
    }), te = (Y) => G.value.find((U) => U.id === Y)?.y || n.chartMargin - 10, ge = $(() => {
      const Y = [];
      for (let U = 0; U <= 5; U++) {
        const re = Math.round(w.value / 5 * U), ue = n.chartHeight - n.chartBottomMargin - U / 5 * b.value;
        Y.push({ value: re, y: ue });
      }
      return Y;
    });
    function ye(Y, W, U) {
      const re = Y.createSVGPoint();
      re.x = W, re.y = U;
      const ue = Y.getScreenCTM();
      if (!ue) {
        const j = Y.getBoundingClientRect();
        return { x: W - j.left, y: U - j.top };
      }
      const P = re.matrixTransform(ue.inverse());
      return { x: P.x, y: P.y };
    }
    const Se = (Y, W) => {
      n.interactive && I(Y, W);
    }, Me = () => {
      n.interactive && de();
    }, I = (Y, W) => {
      const U = Y.currentTarget.closest("svg");
      if (!U) return;
      const { x: re, y: ue } = ye(U, Y.clientX, Y.clientY), P = `Score: ${W.score}`, j = `Count: ${Number(W.count ?? 0).toLocaleString()}`, Q = r(P, j), ce = o, pe = typeof W?.x == "number" ? W.x : re;
      let xe = ue - 20;
      const Le = c(pe, xe, Q, ce);
      h.value = {
        visible: !0,
        x: Le.x,
        y: Le.y,
        title: P,
        text: j,
        width: Q,
        height: ce,
        anchorX: typeof W?.x == "number" ? W.x : null
      };
    }, N = (Y) => {
      if (n.interactive && h.value.visible) {
        const W = Y.currentTarget, { x: U, y: re } = ye(W, Y.clientX, Y.clientY), ue = h.value.anchorX, P = ue != null && Number.isFinite(ue) ? ue : U;
        let j = re - 20;
        const Q = c(P, j, h.value.width, h.value.height);
        h.value.x = Q.x, h.value.y = Q.y;
      }
    }, H = () => {
      de();
    }, de = () => {
      h.value.visible = !1, h.value.anchorX = null;
    };
    return t({ isDark: a }), (Y, W) => (p(), k("div", {
      class: J(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (p(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: Te(`min-height: ${e.chartHeight}px;`),
        onMousemove: N,
        onMouseleave: H
      }, [
        W[7] || (W[7] = u("defs", null, [
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
        (p(!0), k(ne, null, fe(ge.value, (U, re) => (p(), k("line", {
          key: `grid-${re}`,
          x1: v.value,
          y1: U.y,
          x2: g.value,
          y2: U.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, sg))), 128)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, og),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, ig),
        (p(!0), k(ne, null, fe(ge.value, (U, re) => (p(), k(ne, {
          key: `y-tick-${re}`
        }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: U.y,
            x2: e.chartMargin,
            y2: U.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, lg),
          u("text", {
            x: e.chartMargin - 12,
            y: U.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, D(U.value), 9, rg)
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
        }, " Count ", 8, cg),
        u("line", {
          x1: v.value,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: g.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, dg),
        u("polygon", {
          points: `${g.value - 4},${e.chartHeight - e.chartBottomMargin - 4} ${g.value - 4},${e.chartHeight - e.chartBottomMargin + 4} ${g.value},${e.chartHeight - e.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, ug),
        (p(!0), k(ne, null, fe(_.value, (U) => (p(), k(ne, {
          key: `tick-${U.score}`
        }, [
          u("line", {
            x1: U.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: U.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, hg),
          u("text", {
            x: U.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, D(U.score), 9, fg)
        ], 64))), 128)),
        u("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: d.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, gg),
        S.value ? (p(), k("path", {
          key: 0,
          d: S.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, mg)) : z("", !0),
        (p(!0), k(ne, null, fe(R.value, (U, re) => (p(), k("rect", {
          key: `bar-${re}`,
          x: U.x - f.value / 2,
          y: U.y,
          width: f.value,
          height: U.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (ue) => Se(ue, U),
          onMouseleave: Me,
          style: Te({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, pg))), 128)),
        e.showStatLabels && V.value ? (p(), k("line", {
          key: 1,
          x1: V.value,
          y1: e.chartMargin,
          x2: V.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, bg)) : z("", !0),
        e.showStatLabels && V.value ? (p(), k("text", {
          key: 2,
          x: V.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + D(X.value.toFixed(1)), 9, vg)) : z("", !0),
        e.showStatLabels && A.value ? (p(), k("line", {
          key: 3,
          x1: A.value,
          y1: e.chartMargin,
          x2: A.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, yg)) : z("", !0),
        e.showStatLabels && A.value ? (p(), k("text", {
          key: 4,
          x: A.value,
          y: te("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + D(se.value.toFixed(1)), 9, xg)) : z("", !0),
        e.showStatLabels && L.value ? (p(), k("line", {
          key: 5,
          x1: L.value,
          y1: e.chartMargin,
          x2: L.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, _g)) : z("", !0),
        e.showStatLabels && L.value ? (p(), k("text", {
          key: 6,
          x: L.value,
          y: te("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + D(Z.value.toFixed(1)), 9, kg)) : z("", !0),
        e.showStatLabels && q.value ? (p(), k("line", {
          key: 7,
          x1: q.value,
          y1: e.chartMargin,
          x2: q.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, wg)) : z("", !0),
        e.showStatLabels && q.value ? (p(), k("text", {
          key: 8,
          x: q.value,
          y: te("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + D(K.value.toFixed(1)), 9, Cg)) : z("", !0),
        e.showStatLabels && O.value ? (p(), k("line", {
          key: 9,
          x1: O.value,
          y1: e.chartMargin,
          x2: O.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, $g)) : z("", !0),
        e.showStatLabels && O.value ? (p(), k("text", {
          key: 10,
          x: O.value,
          y: te("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + D(he.value.toFixed(1)), 9, Sg)) : z("", !0),
        e.showStatLabels && E.value ? (p(), k("line", {
          key: 11,
          x1: E.value,
          y1: e.chartMargin,
          x2: E.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Mg)) : z("", !0),
        e.showStatLabels && E.value ? (p(), k("text", {
          key: 12,
          x: E.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + D(ie.value.toFixed(1)), 9, Dg)) : z("", !0),
        e.showLegend ? (p(), k("g", {
          key: 13,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          u("g", Ag, [
            W[0] || (W[0] = u("line", {
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
            }, " Gaussian ", 8, Bg)
          ]),
          u("g", Lg, [
            W[1] || (W[1] = u("line", {
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
            }, " Min ", 8, Pg)
          ]),
          u("g", Ig, [
            W[2] || (W[2] = u("line", {
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
            }, " Q1 ", 8, Rg)
          ]),
          u("g", Fg, [
            W[3] || (W[3] = u("line", {
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
            }, " Median ", 8, Eg)
          ]),
          u("g", Og, [
            W[4] || (W[4] = u("line", {
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
            }, " Avg ", 8, Vg)
          ]),
          u("g", zg, [
            W[5] || (W[5] = u("line", {
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
            }, " Q3 ", 8, Ng)
          ]),
          u("g", Wg, [
            W[6] || (W[6] = u("line", {
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
            }, " Max ", 8, Hg)
          ])
        ], 8, Tg)) : z("", !0),
        e.interactive && h.value.visible ? (p(), k("g", {
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
          }, null, 8, Yg),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + ra,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, D(h.value.title), 9, Kg),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + ra + Wa + qo,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, D(h.value.text), 9, Ug)
        ], 8, jg)) : z("", !0)
      ], 44, ag))
    ], 2));
  }
}), Qi = /* @__PURE__ */ me(Xg, [["__scopeId", "data-v-8f9da805"]]), Gg = 639, Ji = 1024;
function Xo(e) {
  return e < 640 ? "mobile" : e <= Ji ? "tablet" : "desktop";
}
function Zg() {
  const e = ae(
    typeof window > "u" ? "desktop" : Xo(window.innerWidth)
  ), t = () => {
    typeof window > "u" || (e.value = Xo(window.innerWidth));
  };
  let n = null, a = null, s = null, o = null;
  tt(() => {
    typeof window > "u" || (t(), n = window.matchMedia(`(max-width: ${Gg}px)`), a = window.matchMedia(`(min-width: 640px) and (max-width: ${Ji}px)`), s = window.matchMedia("(min-width: 1025px)"), o = () => {
      t();
    }, n.addEventListener("change", o), a.addEventListener("change", o), s.addEventListener("change", o));
  }), pt(() => {
    !o || !n || !a || !s || (n.removeEventListener("change", o), a.removeEventListener("change", o), s.removeEventListener("change", o));
  });
  const i = $(() => e.value === "mobile"), l = $(() => e.value === "tablet"), r = $(() => e.value === "desktop");
  return {
    breakpoint: e,
    isMobile: i,
    isTablet: l,
    isDesktop: r
  };
}
const Qg = { class: "chart-container" }, Jg = {
  key: 0,
  class: "loading-state loading-overlay"
}, Qt = 12, em = /* @__PURE__ */ le({
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
    Ss.use([kl, wl, Cl, $l]);
    const n = e, { isDark: a, colors: s } = Ce(we(n, "theme")), { breakpoint: o } = Zg(), i = ae(null), l = ae(!0), r = ae(!1);
    let c = null, d = null;
    const h = {
      animation: { duration: 1e3, easing: "cubicOut" },
      margins: { left: "3%", right: "8%", top: "4%", bottom: "4%" },
      node: { width: 88, gap: 24, align: "left", iterations: 0 },
      style: {
        shadowBlur: 0,
        shadowColor: "transparent"
      }
    }, m = {
      success: "#66BB6A",
      abandon: "#FFA726",
      error: "#EF5350"
    }, v = {
      success: 0,
      abandon: 1,
      error: 2
    }, g = /abandon|exit|lost|bounce|cancelled|no pending|not paid|not confirmed|not delivered/i, y = /error|failed|unrecovered|not retreiv|bp error|not found|rejected|redirect to human|invalid|unprocessed|data quality|failed:/i, b = $(() => {
      const I = o.value;
      return I === "mobile" ? {
        orient: "vertical",
        nodeWidth: 18,
        nodeGap: 12,
        labelPosition: "right",
        labelFontSize: 10,
        edgeLabelShow: !0,
        edgeLabelFontSize: 8,
        labelWrap: !0,
        labelCharsPerLine: 10,
        labelLineHeight: 12,
        labelTextWidth: 200,
        labelDistance: 6,
        contentMargins: { left: 10, right: 10, top: 28, bottom: 20 }
      } : I === "tablet" ? {
        orient: "horizontal",
        nodeWidth: 72,
        nodeGap: 20,
        labelPosition: "inside",
        labelFontSize: 11,
        edgeLabelShow: !0,
        edgeLabelFontSize: 10,
        labelWrap: !0,
        labelCharsPerLine: 11,
        labelLineHeight: 14,
        labelTextWidth: 0,
        labelDistance: 0,
        contentMargins: { ...h.margins }
      } : {
        orient: "horizontal",
        nodeWidth: h.node.width,
        nodeGap: n.nodeGap,
        labelPosition: "inside",
        labelFontSize: 11,
        edgeLabelShow: !0,
        edgeLabelFontSize: 10,
        labelWrap: !0,
        labelCharsPerLine: 12,
        labelLineHeight: 15,
        labelTextWidth: 0,
        labelDistance: 0,
        contentMargins: { ...h.margins }
      };
    }), f = (I) => {
      const N = I.replace(/_/g, " ").replace(/\s+/g, " ").trim(), H = N.match(/^Failed:\s*(.+)$/i);
      return H ? `Failed:
${H[1].trim()}` : N;
    }, x = (I, N) => {
      const H = I.trim();
      if (!H || N < 1 || H.length <= N) return H;
      const de = [];
      let Y = 0;
      for (; Y < H.length; ) {
        const W = Math.min(Y + N, H.length);
        if (W >= H.length) {
          const ue = H.slice(Y).trim();
          ue && de.push(ue);
          break;
        }
        const U = H.slice(Y, W), re = U.lastIndexOf(" ");
        if (re > 0)
          for (de.push(H.slice(Y, Y + re).trim()), Y += re; Y < H.length && H[Y] === " "; ) Y += 1;
        else
          de.push(U), Y = W;
      }
      return de.join(`
`);
    }, _ = (I, N) => {
      const H = I.trim();
      return !H || N < 1 ? I : H.split(`
`).map((de) => x(de.trim(), N)).filter(Boolean).join(`
`);
    }, w = (I) => I.status ? I.status : g.test(I.name) ? "abandon" : y.test(I.name) ? "error" : "success", C = (I) => I.originalValue ?? I.value, M = (I, N) => {
      const H = new Set(N.map((Y) => Y.target)), de = I.filter((Y) => !H.has(Y.name));
      for (const Y of de) {
        if (typeof Y.value == "number" && Y.value > 0) return Y.value;
        const W = N.filter((U) => U.source === Y.name);
        if (W.length > 0)
          return W.reduce((U, re) => U + C(re), 0);
      }
      return N.reduce((Y, W) => Math.max(Y, C(W)), 0);
    }, S = (I, N, H) => {
      if (H && typeof H.value == "number") return H.value;
      const de = N.filter((W) => W.target === I);
      return de.length > 0 ? de.reduce((W, U) => W + C(U), 0) : N.filter((W) => W.source === I).reduce((W, U) => W + C(U), 0);
    }, R = (I, N) => {
      const H = /* @__PURE__ */ new Map(), de = new Set(N.map((W) => W.target)), Y = I.filter((W) => !de.has(W.name)).map((W) => ({ name: W.name, depth: 0 }));
      for (; Y.length > 0; ) {
        const { name: W, depth: U } = Y.shift(), re = H.get(W);
        if (!(re !== void 0 && re >= U)) {
          H.set(W, U);
          for (const ue of N)
            ue.source === W && Y.push({ name: ue.target, depth: U + 1 });
        }
      }
      for (const W of I)
        H.has(W.name) || H.set(W.name, 0);
      return H;
    }, V = (I, N) => {
      const H = /* @__PURE__ */ new Map(), de = new Set(N.map((re) => re.target)), Y = I.filter((re) => !de.has(re.name));
      let W = 0;
      const U = (re) => {
        let ue = re;
        for (; ue && !H.has(ue); )
          H.set(ue, W), W += 1, ue = N.filter(
            (j) => j.source === ue && w({ name: j.target }) === "success"
          ).sort((j, Q) => C(Q) - C(j))[0]?.target;
      };
      return Y.forEach((re) => U(re.name)), H;
    }, E = (I, N, H) => {
      const de = w(I);
      if (de === "success" && H.has(I.name))
        return H.get(I.name);
      if (de === "success") {
        const Y = N.filter((U) => U.target === I.name);
        return 200 + (Y.length ? Math.min(
          ...Y.map(
            (U) => H.has(U.source) ? (H.get(U.source) ?? 0) + 0.01 : 500
          )
        ) : 500);
      }
      return de === "abandon" ? 1e3 : 2e3;
    }, A = (I, N) => {
      const H = R(I, N), de = V(I, N);
      return [...I].sort((Y, W) => {
        const U = H.get(Y.name) ?? 0, re = H.get(W.name) ?? 0;
        if (U !== re) return U - re;
        const ue = v[w(Y)], P = v[w(W)];
        if (ue !== P) return ue - P;
        const j = E(Y, N, de), Q = E(W, N, de);
        return j !== Q ? j - Q : Y.name.localeCompare(W.name);
      });
    }, L = (I, N, H, de) => {
      const W = _(I, de).split(`
`), U = N * 0.58, ue = Math.max(...W.map((j) => j.length), 1) * U, P = W.length * H;
      return {
        lines: W,
        width: ue,
        height: P,
        nodeWidth: ue + Qt * 2
      };
    }, O = (I, N) => N ? `${(I / N * 100).toFixed(1)}%` : "0.0%", q = (I, N, H, de, Y) => {
      if (typeof I.label == "string" && I.label)
        return _(f(I.label), Y);
      const W = _(f(I.name), Y);
      if (N === "success" && H > 0) {
        const U = S(I.name, de, I), re = O(U, H);
        return `${W}
(${re})`;
      }
      return W;
    }, X = (I, N = 0) => {
      if (N > 0) return N;
      const H = I.match(/^(\d+(?:\.\d+)?)px$/);
      if (H) return Number(H[1]);
      const de = I.match(/^(\d+(?:\.\d+)?)vh$/);
      return de && typeof window < "u" ? Number(de[1]) / 100 * window.innerHeight : 500;
    }, ie = (I, N, H, de, Y) => {
      if (!N.length || !I.length || Y <= 0) return I;
      const W = I.map((pe) => ({ ...pe })), U = H.labelLineHeight || Math.round(H.labelFontSize * 1.25), re = Math.max(4, H.labelCharsPerLine), ue = Math.max(de * 0.88, 260), P = R(N, W), j = /* @__PURE__ */ new Map();
      N.forEach((pe) => {
        const xe = P.get(pe.name) ?? 0;
        j.set(xe, (j.get(xe) ?? 0) + 1);
      });
      const Q = (pe) => {
        const Le = N.find((qt) => qt.name === pe)?.displayLabel || pe, dt = L(Le, H.labelFontSize, U, re).height + Qt * 2, Ut = P.get(pe) ?? 0, yt = j.get(Ut) ?? 1, un = (Math.max(yt, 1) - 1) * H.nodeGap / Math.max(yt, 1), Da = Math.max(ue - un, dt);
        return Math.max(1, dt / Da * Y);
      }, ce = (pe) => {
        const xe = W.filter((Le) => Le.target === pe);
        return xe.length > 0 ? xe.reduce((Le, Je) => Le + Je.value, 0) : W.filter((Le) => Le.source === pe).reduce((Le, Je) => Le + Je.value, 0);
      };
      for (let pe = 0; pe < 16; pe += 1) {
        let xe = !1;
        for (const Le of N) {
          const Je = Q(Le.name), dt = ce(Le.name);
          if (dt >= Je) continue;
          const Ut = W.filter((qt) => qt.target === Le.name), yt = W.filter((qt) => qt.source === Le.name), un = Ut.length > 0 ? Ut : yt;
          if (un.length === 0) continue;
          const Da = Je / Math.max(dt, 1e-6);
          un.forEach((qt) => {
            qt.value *= Da;
          }), xe = !0;
        }
        if (!xe) break;
      }
      return W;
    }, se = (I, N, H) => {
      const de = M(I, N), Y = A(I, N), W = H.labelLineHeight || Math.round(H.labelFontSize * 1.25), U = Math.max(4, H.labelCharsPerLine);
      let re = H.nodeWidth;
      const ue = [], P = Y.map((Q, ce) => {
        const pe = w(Q), xe = q(
          Q,
          pe,
          de,
          N,
          U
        );
        ue.push(xe);
        const Le = L(xe, H.labelFontSize, W, U);
        H.orient === "vertical" ? re = Math.max(re, Le.height + Qt * 2) : re = Math.max(re, Le.nodeWidth);
        const Je = n.nodeColors[Q.name] || m[pe] || Z[ce % Z.length], dt = Math.max(Math.ceil(Le.nodeWidth - Qt * 2), 48);
        return {
          ...Q,
          displayLabel: xe,
          label: {
            width: dt,
            overflow: "none",
            lineHeight: W,
            fontSize: H.labelFontSize
          },
          itemStyle: {
            color: Je,
            borderRadius: 4,
            borderWidth: 0,
            shadowBlur: 0,
            shadowColor: "transparent"
          }
        };
      });
      let j = { ...H.contentMargins };
      if (H.orient === "vertical") {
        const Q = Math.max(
          ...ue.map(
            (pe) => L(pe, H.labelFontSize, W, U).width
          ),
          0
        ), ce = typeof j.right == "number" ? j.right : 10;
        j = {
          ...j,
          right: Math.max(ce, Q + Qt + H.labelDistance)
        };
      }
      return { nodes: P, maxNodeWidth: re, contentMargins: j, originTotal: de };
    }, Z = [
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
    ], he = () => {
      const I = n.data.links.filter(
        (Y) => Y.source && Y.target && typeof Y.value == "number"
      ), N = Math.max(...I.map((Y) => Y.value), 1), H = Math.max(1, N * 0.01), de = I.map((Y) => ({
        ...Y,
        originalValue: Y.value,
        value: Y.value < N * 0.01 ? H : Y.value
      }));
      return {
        nodes: n.data.nodes.filter((Y) => Y.name),
        links: de
      };
    }, K = (I) => (N) => {
      const H = N.dataType === "node", de = s.value.tooltipText, Y = a.value ? "#d1d5db" : "#e2e8f0";
      if (H) {
        const P = I.filter((ce) => ce.target === N.name), j = I.filter((ce) => ce.source === N.name), Q = P.length > 0 ? P.reduce((ce, pe) => ce + (pe.originalValue || pe.value), 0) : j.reduce((ce, pe) => ce + (pe.originalValue || pe.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${de};">${N.name}</div><div style="color: ${Y}; font-size: 12px;">Count: ${Q.toLocaleString()}</div>`;
      }
      const W = N.data?.source || N.source || "Unknown", U = N.data?.target || N.target || "Unknown", re = N.data?.originalValue || N.data?.value || N.value || 0, ue = N.data?.label || `${re.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${de};">${W} → ${U}</div><div style="color: ${Y}; font-size: 12px;">Flow: ${ue}</div>`;
    }, G = () => {
      if (!c || !n.data.nodes?.length || !n.data.links?.length) return;
      const I = b.value, N = a.value ? "rgba(110, 110, 120, 0.35)" : "rgba(148, 163, 184, 0.45)", H = a.value ? "rgba(130, 130, 140, 0.5)" : "rgba(100, 116, 139, 0.55)", de = a.value ? "rgba(203, 213, 225, 0.92)" : "#64748b", Y = I.labelPosition === "inside" ? "#ffffff" : a.value ? s.value.textPrimary : "#334155";
      try {
        const { nodes: W, links: U } = he(), { nodes: re, maxNodeWidth: ue, contentMargins: P, originTotal: j } = se(
          W,
          U,
          I
        ), Q = X(n.height, i.value?.clientHeight ?? 0), ce = ie(
          U,
          re,
          {
            labelFontSize: I.labelFontSize,
            labelLineHeight: I.labelLineHeight || Math.round(I.labelFontSize * 1.25),
            labelCharsPerLine: I.labelCharsPerLine,
            nodeGap: I.nodeGap
          },
          Q,
          j
        ), pe = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: K(ce),
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
              data: re,
              links: ce,
              emphasis: {
                focus: "adjacency",
                lineStyle: {
                  color: H,
                  opacity: 1
                }
              },
              lineStyle: {
                color: N,
                curveness: 0.5,
                opacity: 1
              },
              itemStyle: {
                ...h.style,
                borderWidth: 0
              },
              label: {
                show: !0,
                position: I.labelPosition,
                color: Y,
                fontWeight: 700,
                fontSize: I.labelFontSize,
                lineHeight: I.labelLineHeight || Math.round(I.labelFontSize * 1.25),
                padding: Qt,
                align: "center",
                verticalAlign: "middle",
                overflow: "none",
                ...I.orient === "horizontal" ? { width: Math.max(ue - Qt * 2, 48), overflow: "none" } : I.labelWrap && I.labelTextWidth > 0 ? { width: I.labelTextWidth, overflow: "none" } : {},
                ...I.labelDistance > 0 ? { distance: I.labelDistance } : {},
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (xe) => xe.data?.displayLabel || xe.name || ""
              },
              edgeLabel: I.edgeLabelShow ? {
                show: !0,
                fontSize: I.edgeLabelFontSize,
                color: de,
                fontWeight: 500,
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (xe) => {
                  if (xe.data?.label) return xe.data.label;
                  const Le = xe.data?.originalValue ?? xe.value ?? 0, Je = xe.data?.source ?? xe.source, dt = ce.filter((yt) => yt.source === Je).reduce((yt, un) => yt + C(un), 0), Ut = O(Le, dt);
                  return `${Number(Le).toLocaleString()} (${Ut})`;
                }
              } : { show: !1 },
              nodeAlign: h.node.align,
              nodeGap: I.nodeGap,
              nodeWidth: ue,
              layoutIterations: h.node.iterations,
              orient: I.orient,
              draggable: !1,
              ...P
            }
          ],
          backgroundColor: "transparent",
          animation: !0,
          animationDuration: h.animation.duration,
          animationEasing: h.animation.easing
        };
        c.setOption(pe), c.resize();
      } catch (W) {
        console.error("Error setting Sankey chart options:", W), r.value = !0;
      }
    }, te = async () => {
      if (i.value)
        try {
          c = Ss.init(i.value), G(), window.addEventListener("resize", Se);
        } catch (I) {
          console.error("Error initializing Sankey chart:", I), r.value = !0;
        } finally {
          l.value = !1;
        }
    }, ge = () => {
      const I = i.value;
      return !!(I && I.clientWidth > 0 && I.clientHeight > 0);
    }, ye = async () => {
      if (await He(), ge()) return te();
      await new Promise((I) => {
        const N = i.value;
        if (!N) {
          I();
          return;
        }
        d = new ResizeObserver(() => {
          ge() && (d?.disconnect(), d = null, te().then(I));
        }), d.observe(N);
      });
    }, Se = () => c?.resize(), Me = () => {
      window.removeEventListener("resize", Se), d?.disconnect(), d = null, c && (c.dispose(), c = null);
    };
    return tt(() => ye()), ni(Me), Oe(() => n.data, G, { deep: !0 }), Oe(a, G), Oe(o, G), t({ isDark: a }), (I, N) => (p(), k("div", Qg, [
      r.value ? (p(), k("div", {
        key: 0,
        class: "error-state",
        style: Te({ height: e.height })
      }, [...N[0] || (N[0] = [
        Cs('<div class="error-content" data-v-b04b208a><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b04b208a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-b04b208a></path></svg><p class="error-title" data-v-b04b208a>Chart could not be loaded</p><p class="error-description" data-v-b04b208a>Please check the data format.</p></div>', 1)
      ])], 4)) : (p(), k("div", {
        key: 1,
        class: "chart-wrapper",
        style: Te({ height: e.height })
      }, [
        u("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content"
        }, null, 512),
        l.value ? (p(), k("div", Jg, [...N[1] || (N[1] = [
          Cs('<div class="loading-container" data-v-b04b208a><div class="sankey-loader" data-v-b04b208a><div class="flow flow-1" data-v-b04b208a></div><div class="flow flow-2" data-v-b04b208a></div><div class="flow flow-3" data-v-b04b208a></div><div class="flow flow-4" data-v-b04b208a></div></div><p class="loading-text" data-v-b04b208a>Loading Sankey diagram...</p></div>', 1)
        ])])) : z("", !0)
      ], 4))
    ]));
  }
}), Kt = /* @__PURE__ */ me(em, [["__scopeId", "data-v-b04b208a"]]), tm = ["open"], nm = { class: "card-header metric-collapsible__summary" }, am = { class: "header-content metric-header-content" }, sm = { class: "metric-header-content__main" }, om = { class: "metric-header-content__text" }, im = {
  key: "header-skeleton",
  class: "ut-skeleton-blink ut-skeleton-collapsible-title",
  "aria-hidden": "true",
  "aria-busy": "true"
}, lm = {
  key: "header-content",
  class: "metric-header-content__loaded"
}, rm = {
  key: 0,
  class: "card-title"
}, cm = {
  key: 0,
  class: "card-subtitle"
}, dm = {
  key: 0,
  class: "metric-header-content__export"
}, um = {
  key: 0,
  class: "cmc-header-aside"
}, hm = { class: "chart-metric-container__body" }, fm = {
  key: 1,
  class: "chart-metric-container chart-metric-container--static"
}, gm = { class: "card-header" }, mm = { class: "header-content metric-header-content" }, pm = { class: "metric-header-content__main" }, bm = { class: "metric-header-content__text" }, vm = {
  key: "header-skeleton",
  class: "ut-skeleton-container",
  "aria-hidden": "true",
  "aria-busy": "true"
}, ym = {
  key: "header-content",
  class: "metric-header-content__loaded"
}, xm = {
  key: 0,
  class: "card-title"
}, _m = {
  key: 0,
  class: "card-subtitle"
}, km = {
  key: 0,
  class: "metric-header-content__export"
}, wm = {
  key: 0,
  class: "cmc-header-aside"
}, Cm = { class: "chart-metric-container__body" }, $m = /* @__PURE__ */ le({
  __name: "ChartMetricContainer",
  props: {
    title: { default: "" },
    subtitle: {},
    collapsible: { type: Boolean, default: !0 },
    defaultOpen: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, n = ae(t.defaultOpen), a = Ja();
    function s(l) {
      return l.some((r) => {
        if (r.type === xl) return !1;
        if (r.type === Text) {
          const c = r.children;
          return typeof c == "string" && c.trim().length > 0;
        }
        return !!r.type;
      });
    }
    const o = $(() => {
      if (t.collapsible && !n.value) return !1;
      const l = a.headerExport;
      return l ? s(l()) : !1;
    });
    Oe(
      () => t.defaultOpen,
      (l) => {
        t.collapsible && (n.value = l);
      }
    );
    function i(l) {
      const r = l.currentTarget;
      r?.tagName === "DETAILS" && (n.value = r.open);
    }
    return (l, r) => e.collapsible ? (p(), k("details", {
      key: 0,
      class: "chart-metric-container metric-collapsible",
      open: n.value,
      onToggle: i
    }, [
      u("summary", nm, [
        u("div", am, [
          u("div", sm, [
            u("div", om, [
              F(De, {
                name: "chart-metric-fade",
                mode: "out-in"
              }, {
                default: B(() => [
                  e.loading ? (p(), k("div", im)) : (p(), k("div", lm, [
                    $e(l.$slots, "title", {}, () => [
                      e.title ? (p(), k("h3", rm, D(e.title), 1)) : z("", !0)
                    ], !0),
                    e.subtitle ? (p(), k("p", cm, D(e.subtitle), 1)) : z("", !0),
                    $e(l.$slots, "headerAppend", {}, void 0, !0)
                  ]))
                ]),
                _: 3
              })
            ]),
            o.value ? (p(), k("div", dm, [
              $e(l.$slots, "headerExport", {}, void 0, !0)
            ])) : z("", !0)
          ]),
          l.$slots.headerAside ? (p(), k("div", um, [
            $e(l.$slots, "headerAside", {}, void 0, !0)
          ])) : z("", !0)
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
      u("div", hm, [
        $e(l.$slots, "default", {}, void 0, !0)
      ])
    ], 40, tm)) : (p(), k("div", fm, [
      u("div", gm, [
        u("div", mm, [
          u("div", pm, [
            u("div", bm, [
              F(De, {
                name: "chart-metric-fade",
                mode: "out-in"
              }, {
                default: B(() => [
                  e.loading ? (p(), k("div", vm, [...r[1] || (r[1] = [
                    u("div", { class: "ut-skeleton-title-subtitle" }, [
                      u("div", { class: "ut-skeleton-blink ut-skeleton-title" }),
                      u("div", { class: "ut-skeleton-blink ut-skeleton-subtitle" })
                    ], -1),
                    u("div", { class: "ut-skeleton-blink ut-skeleton-options" }, null, -1)
                  ])])) : (p(), k("div", ym, [
                    $e(l.$slots, "title", {}, () => [
                      e.title ? (p(), k("h3", xm, D(e.title), 1)) : z("", !0)
                    ], !0),
                    e.subtitle ? (p(), k("p", _m, D(e.subtitle), 1)) : z("", !0),
                    $e(l.$slots, "headerAppend", {}, void 0, !0)
                  ]))
                ]),
                _: 3
              })
            ]),
            o.value ? (p(), k("div", km, [
              $e(l.$slots, "headerExport", {}, void 0, !0)
            ])) : z("", !0)
          ]),
          l.$slots.headerAside ? (p(), k("div", wm, [
            $e(l.$slots, "headerAside", {}, void 0, !0)
          ])) : z("", !0)
        ])
      ]),
      u("div", Cm, [
        $e(l.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), ke = /* @__PURE__ */ me($m, [["__scopeId", "data-v-8741c0a0"]]);
function Sm(e, t) {
  return p(), k("svg", {
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
function _s(e, t) {
  return p(), k("svg", {
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
function nt(e, t) {
  return p(), k("svg", {
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
function Mm(e, t) {
  return p(), k("svg", {
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
function ks(e, t) {
  return p(), k("svg", {
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
function el(e, t) {
  return p(), k("svg", {
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
function tl(e, t) {
  return p(), k("svg", {
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
function Dm(e, t) {
  return p(), k("svg", {
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
function Tm(e, t) {
  return p(), k("svg", {
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
function nl(e, t) {
  return p(), k("svg", {
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
const Am = {
  key: 0,
  class: "footer-divider"
}, Bm = {
  key: 0,
  class: "export-label"
}, Lm = { class: "export-buttons" }, Pm = ["disabled"], Im = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Rm = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Fm = ["disabled"], Em = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Om = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Vm = /* @__PURE__ */ le({
  __name: "FooterExport",
  props: {
    formats: { default: () => ["pdf", "csv"] },
    loading: { type: Boolean, default: !1 },
    variant: { default: "footer" }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = $(() => n.variant === "footer" ? "footer" : "div"), o = $(
      () => n.variant === "footer" ? "chart-footer" : "chart-export-inline"
    ), i = (r) => n.formats.includes(r), l = (r) => {
      n.loading || a("export", r);
    };
    return (r, c) => (p(), ee(tn(s.value), {
      class: J(o.value)
    }, {
      default: B(() => [
        e.variant === "footer" ? (p(), k("div", Am)) : z("", !0),
        u("div", {
          class: J(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (p(), k("span", Bm, "Export")) : z("", !0),
          u("div", Lm, [
            i("pdf") ? (p(), k("button", {
              key: 0,
              type: "button",
              class: J(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: c[0] || (c[0] = (d) => l("pdf"))
            }, [
              e.loading ? (p(), k("svg", Im, [...c[2] || (c[2] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (p(), k("svg", Rm, [...c[3] || (c[3] = [
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
            ], 10, Pm)) : z("", !0),
            i("csv") ? (p(), k("button", {
              key: 1,
              type: "button",
              class: J(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: c[1] || (c[1] = (d) => l("csv"))
            }, [
              e.loading ? (p(), k("svg", Em, [...c[5] || (c[5] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (p(), k("svg", Om, [...c[6] || (c[6] = [
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
            ], 10, Fm)) : z("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Ve = /* @__PURE__ */ me(Vm, [["__scopeId", "data-v-ebfab47f"]]), zm = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Nm = {
  key: "chart",
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Wm = { class: "w-full shrink-0 sm:pr-2" }, Hm = {
  key: "empty",
  class: "flex min-h-[280px] w-full items-center justify-center"
}, jm = { class: "max-w-[360px] text-center" }, Ym = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Km = /* @__PURE__ */ le({
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
    }, s = e, o = n, i = (m) => {
      o("export", m);
    }, l = we(s, "theme"), r = we(s, "options"), { isDark: c } = Ce(l), d = (m) => {
      const v = new Date(m), g = String(v.getDate()).padStart(2, "0"), y = String(v.getMonth() + 1).padStart(2, "0");
      return `${g}-${y}`;
    }, h = $(() => {
      const m = s.data?.agents_by_day || {}, v = Object.keys(m).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const g = v.map((_) => d(_)), y = /* @__PURE__ */ new Set();
      for (const _ of Object.values(m))
        for (const w of Object.keys(_))
          y.add(w);
      const b = Array.from(y), f = (_) => _, x = b.map((_) => ({
        label: _,
        data: v.map((w) => m[w]?.[_] || 0),
        backgroundColor: `${a[_] || "#94a3b8"}80`,
        borderColor: f(a[_] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: g,
        datasets: x
      };
    });
    return t({ isDark: c }), (m, v) => (p(), ee(ke, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        u("div", zm, [
          F(De, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: B(() => [
              e.loading ? (p(), k("div", {
                key: "loading",
                class: J(["flex h-[320px] flex-col gap-3 px-4 pb-4", ["sk-root", { "sk-root--dark": T(c) }]]),
                "aria-busy": "true",
                "aria-label": "Loading chart"
              }, [...v[0] || (v[0] = [
                u("div", {
                  class: "flex-1 skeleton-shimmer",
                  style: { "border-radius": "10px" },
                  "aria-hidden": "true"
                }, null, -1)
              ])], 2)) : h.value.labels && h.value.labels.length ? (p(), k("section", Nm, [
                u("div", Wm, [
                  F($t, {
                    data: h.value,
                    stacked: !0,
                    theme: l.value,
                    options: r.value
                  }, null, 8, ["data", "theme", "options"])
                ])
              ])) : (p(), k("section", Hm, [
                u("div", jm, [
                  u("div", Ym, [
                    F(T(nt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}), Um = /* @__PURE__ */ me(Km, [["__scopeId", "data-v-36bec153"]]), dn = (e, t) => t ? `${(e / t * 100).toFixed(1)}%` : "0.0%", be = (e, t) => `${e.toLocaleString()} (${dn(e, t)})`, qm = { class: "flex w-full min-w-0 justify-center" }, Xm = { class: "flex max-w-full min-w-0 items-center gap-2" }, Gm = { class: "min-w-0 truncate text-[12px] leading-normal" }, Zm = { class: "text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, Qm = {
  key: 0,
  class: "min-w-0 w-full truncate text-[10px] leading-normal"
}, Jm = /* @__PURE__ */ le({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, n) => (p(), k("div", {
      class: J(["card-info box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]", e.subvalue ? "h-[75px]" : "h-[58px]"])
    }, [
      u("div", qm, [
        u("div", Xm, [
          e.color ? (p(), k("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: Te({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : z("", !0),
          u("span", Gm, D(e.title), 1)
        ])
      ]),
      u("p", Zm, D(e.value), 1),
      e.subvalue ? (p(), k("p", Qm, D(e.subvalue), 1)) : z("", !0)
    ], 2));
  }
}), ve = /* @__PURE__ */ me(Jm, [["__scopeId", "data-v-945ff8fb"]]), ep = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, qe = /* @__PURE__ */ le({
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
    const t = e, n = $(
      () => t.statusLive === !0 || t.statusLive === !1
    ), a = $(
      () => t.statusLive === !0 ? t.labelConnected : t.labelDisconnected
    ), s = $(() => t.statusLive === !0 ? [
      "border border-emerald-200 bg-emerald-50",
      "dark:border-emerald-800/80 dark:bg-emerald-950/40"
    ] : [
      "border border-transparent bg-slate-100 dark:border-slate-700/80 dark:bg-slate-800/90"
    ]), o = $(() => t.statusLive === !0 ? "text-emerald-700 dark:text-emerald-300" : "text-[color:var(--kiut-text-primary)] dark:text-slate-300"), i = $(() => {
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
    return (l, r) => n.value ? (p(), k("span", {
      key: 0,
      role: "status",
      class: J(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", s.value])
    }, [
      e.statusLive === !0 ? (p(), k("span", ep, [...r[0] || (r[0] = [
        u("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        u("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : z("", !0),
      u("span", {
        class: J(["min-w-0 flex-1 text-center", o.value])
      }, D(a.value), 3)
    ], 2)) : (p(), k("span", {
      key: 1,
      class: J(["inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight", i.value])
    }, [
      $e(l.$slots, "default", {}, () => [
        Be(D(e.label), 1)
      ])
    ], 2));
  }
}), oe = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), Pe = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), Rt = (e) => {
  if (e == null) return "0";
  const t = Math.abs(e), n = e < 0 ? "-" : "";
  return t >= 1e6 ? `${n}${(t / 1e6).toFixed(2)}M` : t > 99999 ? `${n}${(t / 1e3).toFixed(1)}K` : `${n}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(t)}`;
}, tp = {
  class: "kiut-table-root table-section flex w-full min-w-0 flex-col rounded-xl font-sans antialiased text-[color:var(--kiut-text-primary,#1e293b)]",
  "data-component": "kiut-table"
}, np = { class: "overflow-x-auto" }, ap = { class: "w-full table-auto border-collapse text-left text-[14px] leading-normal" }, sp = ["aria-sort", "onClick"], op = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, ip = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, lp = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, rp = /* @__PURE__ */ le({
  __name: "Table",
  props: {
    columns: {},
    rows: {},
    maxVisibleRows: { default: 3 },
    viewMoreLabel: { default: "View more ({count} rows)" },
    viewLessLabel: { default: "View less" },
    rowKey: { type: [String, Function], default: "id" },
    sortKey: { default: null },
    sortDirection: { default: null }
  },
  emits: ["sort"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = ae(!1), o = "—";
    function i(w) {
      return w == null || w === "" ? o : String(w);
    }
    function l(w) {
      return w === "center" ? "text-center" : w === "right" ? "text-right" : "text-left";
    }
    function r(w) {
      return `cell-${w}`;
    }
    function c(w, C) {
      return w[C];
    }
    function d(w, C) {
      if (typeof n.rowKey == "function")
        return n.rowKey(w);
      const M = w[n.rowKey];
      return typeof M == "string" || typeof M == "number" ? M : C;
    }
    function h(w, C) {
      return d(w, C);
    }
    function m(w) {
      return n.sortKey === w && n.sortDirection != null;
    }
    function v(w) {
      a("sort", w);
    }
    function g(w) {
      return m(w) ? n.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    const y = $(() => n.rows?.length ?? 0), b = $(() => y.value > n.maxVisibleRows), f = $(() => Math.max(0, y.value - n.maxVisibleRows)), x = $(() => n.rows?.length ? s.value || !b.value ? n.rows : n.rows.slice(0, n.maxVisibleRows) : []), _ = $(
      () => n.viewMoreLabel.replace(/\{count\}/g, String(f.value))
    );
    return (w, C) => (p(), k("div", tp, [
      u("div", np, [
        u("table", ap, [
          u("thead", null, [
            u("tr", null, [
              (p(!0), k(ne, null, fe(e.columns, (M) => (p(), k("th", {
                key: M.key,
                scope: "col",
                class: J(["kiut-table-th whitespace-nowrap px-3 py-2 text-left text-[#9191a1]", [l(M.align), M.headerClass]])
              }, [
                M.sortable ? (p(), k("button", {
                  key: 0,
                  type: "button",
                  class: J(["kiut-table-sort-btn inline-flex items-center gap-1", l(M.align)]),
                  "aria-sort": g(M.key),
                  onClick: (S) => v(M.key)
                }, [
                  u("span", null, D(M.label), 1),
                  u("span", op, [
                    m(M.key) ? (p(), k(ne, { key: 0 }, [
                      e.sortDirection === "asc" ? (p(), k("span", ip, "↑")) : e.sortDirection === "desc" ? (p(), k("span", lp, "↓")) : z("", !0)
                    ], 64)) : (p(), k(ne, { key: 1 }, [
                      C[1] || (C[1] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      C[2] || (C[2] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, sp)) : (p(), k(ne, { key: 1 }, [
                  Be(D(M.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          u("tbody", null, [
            (p(!0), k(ne, null, fe(x.value, (M, S) => (p(), k("tr", {
              key: h(M, S)
            }, [
              (p(!0), k(ne, null, fe(e.columns, (R) => (p(), k("td", {
                key: `${S}-${R.key}`,
                class: J(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [l(R.align), R.cellClass]])
              }, [
                $e(w.$slots, r(R.key), {
                  row: M,
                  column: R,
                  value: c(M, R.key)
                }, () => [
                  Be(D(i(c(M, R.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ]),
      b.value ? (p(), k("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: C[0] || (C[0] = (M) => s.value = !s.value)
      }, [
        Be(D(s.value ? e.viewLessLabel : _.value) + " ", 1),
        (p(), k("svg", {
          class: J(["view-more-icon", { "view-more-icon-rotated": s.value }]),
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [...C[3] || (C[3] = [
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M19 9l-7 7-7-7"
          }, null, -1)
        ])], 2))
      ])) : z("", !0)
    ]));
  }
}), lt = /* @__PURE__ */ me(rp, [["__scopeId", "data-v-22a97a18"]]), cp = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, dp = {
  key: "error",
  class: "error-state"
}, up = { class: "error-content" }, hp = { class: "error-description" }, fp = {
  key: "content",
  class: "card-body"
}, gp = { class: "chart-section" }, mp = { class: "chart-wrapper" }, pp = { class: "payment-success-summary" }, bp = {
  key: 0,
  class: "booking-daily-section"
}, vp = { class: "w-full min-w-0" }, yp = { class: "font-medium" }, xp = { class: "percentage-text" }, _p = { class: "badges-container" }, kp = {
  key: 0,
  class: "badges-container"
}, wp = {
  key: 1,
  class: "percentage-text"
}, Cp = { class: "badges-container" }, $p = {
  key: 1,
  class: "empty-state"
}, Sp = /* @__PURE__ */ le({
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
    const a = e, s = t, o = (f) => {
      s("export", f);
    }, i = $(() => a.data?.booking_manager_by_day ? [...a.data.booking_manager_by_day].sort(
      (f, x) => new Date(f.date).getTime() - new Date(x.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "paymentInitiated", label: "Payment Initiated", align: "center" },
      { key: "paymentResults", label: "Payment Results", align: "left" },
      { key: "paymentValue", label: "Payment Value", align: "left" },
      { key: "outcomes", label: "Outcomes", align: "left" }
    ], r = $(
      () => i.value.map((f) => ({
        id: f.date,
        ...f
      }))
    ), c = $(() => a.data?.total_payment_success_value || []), d = $(() => {
      const f = c.value;
      return f.length === 0 ? g(0) : f.map(
        (x) => `${x.currency} ${g(x.total_value)}`
      ).join(" · ");
    }), h = (f) => f.payment_success_value || [], m = (f) => typeof f.payment_success_count == "number" ? f.payment_success_count : (f.payment_success_value || []).reduce(
      (x, _) => x + (_.count || 0),
      0
    ), v = (f) => Pe(f), g = (f) => f == null ? "0" : Rt(f);
    $(() => (a.data?.total_payment_success_value || []).reduce(
      (f, x) => f + (x.total_value || 0),
      0
    ));
    const y = $(() => {
      const f = a.data, x = f.total_booking_initiated || 0, _ = f.total_booking_started || 0, w = f.total_payment_initiated || 0, C = f.total_not_found || 0, M = f.total_cancelled || 0, S = f.total_no_pending_balance || 0, R = f.total_errors || 0, V = typeof f.total_payment_success == "number" ? f.total_payment_success : (f.total_payment_success_value || []).reduce(
        (ie, se) => ie + (se.count || 0),
        0
      ), E = f.total_payment_failed || 0, A = Math.max(0, x - _), L = Math.max(
        0,
        _ - w - C - M - S - R
      ), O = (ie, se) => be(ie, se), q = [
        { name: "Initiated", status: "success" },
        { name: "Started", status: "success" },
        { name: "Payment Initiated", status: "success" },
        { name: "Not Found", status: "error" },
        { name: "Cancelled", status: "abandon" },
        { name: "No Pending Balance", status: "abandon" },
        { name: "Errors", status: "error" },
        { name: "Payment Success", status: "success" },
        { name: "Payment Failed", status: "error" },
        { name: "Abandoned (Init)", status: "abandon" },
        { name: "Abandoned (Start)", status: "abandon" }
      ], X = [];
      return _ > 0 && X.push({
        source: "Initiated",
        target: "Started",
        value: _,
        label: O(_, x)
      }), A > 0 && X.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: A,
        label: O(A, x)
      }), w > 0 && X.push({
        source: "Started",
        target: "Payment Initiated",
        value: w,
        label: O(w, _)
      }), C > 0 && X.push({
        source: "Started",
        target: "Not Found",
        value: C,
        label: O(C, _)
      }), M > 0 && X.push({
        source: "Started",
        target: "Cancelled",
        value: M,
        label: O(M, _)
      }), S > 0 && X.push({
        source: "Started",
        target: "No Pending Balance",
        value: S,
        label: O(S, _)
      }), R > 0 && X.push({
        source: "Started",
        target: "Errors",
        value: R,
        label: O(R, _)
      }), L > 0 && X.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: L,
        label: O(L, _)
      }), V > 0 && X.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: V,
        label: O(V, w)
      }), E > 0 && X.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: E,
        label: O(E, w)
      }), { nodes: q, links: X };
    }), b = (f, x) => dn(f, x);
    return (f, x) => (p(), ee(ke, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis",
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading && !a.error ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(De, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (p(), k("div", cp, [...x[0] || (x[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : a.error ? (p(), k("div", dp, [
              u("div", up, [
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
                u("p", hp, D(a.error), 1)
              ])
            ])) : (p(), k("div", fp, [
              u("section", gp, [
                u("div", mp, [
                  F(Kt, {
                    data: y.value,
                    height: "500px",
                    "use-gradient": !1,
                    "node-gap": 24
                  }, null, 8, ["data"])
                ])
              ]),
              u("section", pp, [
                F(ve, {
                  color: "#22c55e",
                  title: "Payment Success Value",
                  value: d.value
                }, null, 8, ["value"])
              ]),
              i.value.length > 0 ? (p(), k("section", bp, [
                x[3] || (x[3] = u("div", { class: "section-header" }, [
                  u("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                u("div", vp, [
                  F(lt, {
                    columns: l,
                    rows: r.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: _ }) => [
                      u("span", yp, D(T(je)(String(_.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": B(({ row: _ }) => [
                      u("span", null, D(T(oe)(Number(_.booking_initiated_count))), 1)
                    ]),
                    "cell-started": B(({ row: _ }) => [
                      u("span", null, [
                        Be(D(T(oe)(Number(_.booking_started_count))) + " ", 1),
                        u("span", xp, " (" + D(b(
                          Number(_.booking_started_count),
                          Number(_.booking_initiated_count)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-paymentInitiated": B(({ row: _ }) => [
                      u("span", null, D(T(oe)(Number(_.payment_initiated_count))), 1)
                    ]),
                    "cell-paymentResults": B(({ row: _ }) => [
                      u("div", _p, [
                        F(qe, { color: "success" }, {
                          default: B(() => [
                            Be(" Success: " + D(T(oe)(
                              m(_)
                            )), 1)
                          ]),
                          _: 2
                        }, 1024),
                        F(qe, { color: "danger" }, {
                          default: B(() => [
                            Be(" Failed: " + D(T(oe)(Number(_.payment_failed_count) || 0)), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    "cell-paymentValue": B(({ row: _ }) => [
                      h(_).length > 0 ? (p(), k("div", kp, [
                        (p(!0), k(ne, null, fe(h(
                          _
                        ), (w) => (p(), k("span", {
                          key: `${_.date}-${w.currency}`,
                          class: "badge badge-currency"
                        }, D(w.currency) + " " + D(v(w.total_value)), 1))), 128))
                      ])) : (p(), k("span", wp, "N/A"))
                    ]),
                    "cell-outcomes": B(({ row: _ }) => [
                      u("div", Cp, [
                        F(qe, { color: "danger" }, {
                          default: B(() => [
                            Be(" Not Found: " + D(_.not_found_count ? T(oe)(Number(_.not_found_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        F(qe, { color: "warning" }, {
                          default: B(() => [
                            Be(" Cancelled: " + D(_.cancelled_count ? T(oe)(Number(_.cancelled_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        F(qe, { color: "orange" }, {
                          default: B(() => [
                            Be(" No Balance: " + D(_.no_pending_balance_count ? T(oe)(Number(_.no_pending_balance_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        F(qe, { color: "danger" }, {
                          default: B(() => [
                            Be(" Errors: " + D(_.error_count ? T(oe)(Number(_.error_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (p(), k("section", $p, [...x[4] || (x[4] = [
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
}), Mp = /* @__PURE__ */ me(Sp, [["__scopeId", "data-v-2a80b433"]]), Dp = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Tp = {
  key: "content",
  class: "card-body"
}, Ap = {
  key: 0,
  class: "chart-section"
}, Bp = { class: "chart-wrapper" }, Lp = {
  key: 1,
  class: "checkin-daily-section"
}, Pp = { class: "w-full min-w-0" }, Ip = { class: "font-medium" }, Rp = { class: "cell-success" }, Fp = { class: "cell-danger" }, Ep = {
  key: 0,
  class: "reasons-list"
}, Op = { class: "reason-name" }, Vp = { class: "reason-count" }, zp = {
  key: 1,
  class: "no-reasons"
}, Np = {
  key: 2,
  class: "empty-state"
}, Wp = {
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
    }, l = ae([]), r = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieve", label: "Booking Retrieve (%)", align: "center" },
      { key: "passengers", label: "Number of Passengers", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Failed (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], c = $(
      () => (l.value || []).map((f) => ({
        id: f.date,
        date: f.date,
        checkin_initiated_count: f.checkin_initiated_count,
        checkin_init_count: f.checkin_init_count,
        checkin_started_count: f.checkin_started_count,
        checkin_completed_count: f.checkin_completed_count,
        checkin_closed_count: f.checkin_closed_count,
        failed_steps: f.failed_steps
      }))
    ), d = $(() => {
      const f = s.data;
      return f && (Array.isArray(f.checkin_by_day) && f.checkin_by_day.length > 0 || (f.total_checkin_initiated ?? 0) > 0) ? { ...o, ...f } : s.checkinData ?? o;
    }), h = $(() => {
      const f = s.data;
      return f && (Array.isArray(f.failed_by_step_by_day) && f.failed_by_step_by_day.length > 0 || Array.isArray(f.unrecovered_by_step) && f.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: f.total_checkin_failed ?? 0,
        total_checkin_unrecovered: f.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: f.failed_by_step_by_day ?? [],
        unrecovered_by_step: f.unrecovered_by_step ?? [],
        unrecovered_by_day: f.unrecovered_by_day ?? []
      } : s.failedData ?? i;
    }), m = (f, x) => !x || x === 0 ? "0.0%" : dn(f, x), v = (f, x) => {
      const _ = oe(f), w = m(f, x);
      return `${_} (${w})`;
    }, g = (f) => f.reduce((x, _) => x + _.failed_count, 0), y = $(() => {
      const f = [], x = [];
      if (!d.value.total_checkin_initiated)
        return { nodes: f, links: x };
      f.push({ name: "Checkin Init" }), f.push({ name: "Booking retrive" }), f.push({ name: "Booking retrive success" }), f.push({ name: "Number of Passengers" }), f.push({ name: "Completed" }), f.push({ name: "Closed with BP" });
      const _ = d.value.total_checkin_initiated, w = d.value.total_checkin_init, C = d.value.total_checkin_init_abandoned, M = w - C, S = d.value.total_checkin_started, R = d.value.total_checkin_completed, V = d.value.total_checkin_closed, E = h.value.unrecovered_by_step || [], A = E.reduce(
        (X, ie) => X + ie.count,
        0
      );
      w > 0 && x.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: w,
        label: be(w, _)
      });
      const L = _ - w;
      L > 0 && (f.push({ name: "Abandoned (Init)", status: "abandon" }), x.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: L,
        label: be(L, _)
      })), C > 0 && (f.push({ name: "Abandoned (Started)", status: "abandon" }), x.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: C,
        label: be(C, _)
      })), M > 0 && x.push({
        source: "Booking retrive",
        target: "Booking retrive success",
        value: M,
        label: be(M, _)
      }), S > 0 && x.push({
        source: "Booking retrive success",
        target: "Number of Passengers",
        value: S,
        label: be(S, _)
      }), R > 0 && x.push({
        source: "Number of Passengers",
        target: "Completed",
        value: R,
        label: be(R, S)
      }), E.length > 0 && A > 0 && (f.push({ name: "Unrecovered", status: "error" }), x.push({
        source: "Number of Passengers",
        target: "Unrecovered",
        value: A,
        label: be(A, S)
      }), E.forEach((X) => {
        const se = X.step_name.replace(/_/g, " ").split(" ").map((Z) => Z.charAt(0).toUpperCase() + Z.slice(1)).join(" ");
        f.push({ name: se, status: "error" }), x.push({
          source: "Unrecovered",
          target: se,
          value: X.count,
          label: be(X.count, S)
        });
      }));
      const O = S - (R + A);
      O > 0 && (f.push({ name: "Abandoned (Flow)", status: "abandon" }), x.push({
        source: "Number of Passengers",
        target: "Abandoned (Flow)",
        value: O,
        label: be(O, S)
      }));
      const q = R - V;
      return q > 0 && (f.push({ name: "BP Error", status: "error" }), x.push({
        source: "Completed",
        target: "BP Error",
        value: q,
        label: be(q, S)
      })), V > 0 && x.push({
        source: "Completed",
        target: "Closed with BP",
        value: V,
        label: be(V, S)
      }), { nodes: f, links: x };
    }), b = () => {
      const f = d.value.checkin_by_day || [], x = h.value.failed_by_step_by_day || [];
      if (f.length === 0) {
        l.value = [];
        return;
      }
      l.value = [...f].map((_) => {
        const w = x.find(
          (C) => C.date === _.date
        );
        return {
          ..._,
          failed_steps: w?.steps || []
        };
      }), l.value.sort((_, w) => new Date(_.date) - new Date(w.date));
    };
    return Oe(
      [() => s.data, () => s.checkinData, () => s.failedData],
      () => {
        b();
      },
      { deep: !0, immediate: !0 }
    ), (f, x) => (p(), ee(ke, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(De, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (p(), k("div", Dp, [...x[0] || (x[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", Tp, [
              y.value.nodes.length > 0 ? (p(), k("section", Ap, [
                u("div", Bp, [
                  F(Kt, {
                    data: y.value,
                    height: "500px",
                    "use-gradient": !1,
                    "node-gap": 24
                  }, null, 8, ["data"])
                ])
              ])) : z("", !0),
              l.value && l.value.length > 0 ? (p(), k("section", Lp, [
                u("div", Pp, [
                  F(lt, {
                    columns: r,
                    rows: c.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: _ }) => [
                      u("span", Ip, D(T(je)(String(_.date)).format("MMM DD")), 1)
                    ]),
                    "cell-checkinInit": B(({ row: _ }) => [
                      u("span", null, D(T(oe)(_.checkin_initiated_count)), 1)
                    ]),
                    "cell-bookingRetrieve": B(({ row: _ }) => [
                      u("span", null, D(v(
                        _.checkin_init_count,
                        _.checkin_initiated_count
                      )), 1)
                    ]),
                    "cell-passengers": B(({ row: _ }) => [
                      u("span", null, D(T(oe)(_.checkin_started_count)), 1)
                    ]),
                    "cell-completed": B(({ row: _ }) => [
                      u("span", null, D(v(
                        _.checkin_completed_count,
                        _.checkin_started_count
                      )), 1)
                    ]),
                    "cell-closed": B(({ row: _ }) => [
                      u("span", Rp, D(v(
                        _.checkin_closed_count,
                        _.checkin_started_count
                      )), 1)
                    ]),
                    "cell-failed": B(({ row: _ }) => [
                      u("span", Fp, D(v(
                        g(_.failed_steps),
                        _.checkin_started_count
                      )), 1)
                    ]),
                    "cell-reasons": B(({ row: _ }) => [
                      _.failed_steps && _.failed_steps.length > 0 ? (p(), k("div", Ep, [
                        (p(!0), k(ne, null, fe(_.failed_steps, (w) => (p(), k("div", {
                          key: w.step_name,
                          class: "reason-item"
                        }, [
                          u("span", Op, D(w.step_name.replace(/_/g, " ")) + ":", 1),
                          u("span", Vp, D(w.failed_count), 1)
                        ]))), 128))
                      ])) : (p(), k("div", zp, "-"))
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (p(), k("section", Np, [...x[1] || (x[1] = [
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
}, al = /* @__PURE__ */ me(Wp, [["__scopeId", "data-v-f12f3f34"]]), Hp = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, jp = {
  key: "content",
  class: "card-body"
}, Yp = {
  key: 0,
  class: "sankey-section"
}, Kp = {
  key: 1,
  class: "checkin-metrics-daily-section"
}, Up = { class: "w-full min-w-0" }, qp = { class: "font-medium whitespace-nowrap" }, Xp = { class: "cell-success" }, Gp = { class: "cell-danger" }, Zp = {
  key: 0,
  class: "reasons-list"
}, Qp = { class: "reason-name" }, Jp = { class: "reason-count" }, e0 = {
  key: 1,
  class: "no-reasons"
}, t0 = {
  key: 2,
  class: "empty-state"
}, n0 = { class: "empty-state-content" }, a0 = { class: "empty-icon-wrapper" }, s0 = /* @__PURE__ */ le({
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
    const a = e, s = n, o = (b) => {
      s("export", b);
    }, { isDark: i } = Ce(we(a, "theme")), l = (b) => b == null ? "0" : b.toLocaleString(), r = (b) => {
      const [f, x, _] = b.split("-").map(Number);
      return je([f, x - 1, _]).format("MMM DD");
    }, c = (b) => b.replace(/_/g, " ").replace(/\b\w/g, (f) => f.toUpperCase()), d = (b, f) => dn(b, f), h = (b, f) => {
      const x = b || 0, _ = f || 0, w = l(x), C = d(x, _);
      return `${w} (${C})`;
    }, m = $(() => {
      const b = a.checkinData?.record_locator_by_day || [], f = a.failedData?.failed_by_step_by_day || [], x = a.failedData?.unrecovered_by_day || [];
      return b.map((w) => {
        const C = f.find((S) => S.date === w.date), M = x.find(
          (S) => S.date === w.date
        );
        return {
          ...w,
          failed_steps: C?.steps || [],
          unrecovered_count: M?.unrecovered_count || 0
        };
      }).sort(
        (w, C) => new Date(w.date).getTime() - new Date(C.date).getTime()
      );
    }), v = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieval", label: "Booking Retrieval (%)", align: "center" },
      { key: "bookingRetrieved", label: "Booking Retrieved", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Errors (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], g = $(
      () => m.value.map((b) => ({
        id: b.date,
        date: b.date,
        checkin_initiated: b.checkin_initiated,
        record_locator_init_count: b.record_locator_init_count,
        record_locator_started_count: b.record_locator_started_count,
        record_locator_completed_count: b.record_locator_completed_count,
        record_locator_closed_count: b.record_locator_closed_count,
        unrecovered_count: b.unrecovered_count,
        failed_steps: b.failed_steps
      }))
    ), y = $(() => {
      const b = [], f = [], x = /* @__PURE__ */ new Set(), _ = (Me) => {
        x.has(Me) || (b.push({ name: Me }), x.add(Me));
      };
      if (!a.checkinData?.total_checkin_initiated)
        return { nodes: b, links: f };
      _("Checkin Init"), _("Booking Retrieval"), _("Booking Retrieved"), _("Completed"), _("Closed with BP");
      const w = a.checkinData.total_checkin_initiated || 0, C = a.checkinData.total_record_locator_init || 0, M = a.checkinData.total_record_locator_init_abandoned || 0, S = a.checkinData.total_checkin_pre_init_abandoned_error, R = a.checkinData.total_checkin_pre_init_abandoned_voluntary, V = S != null || R != null, E = V ? Math.max(Number(S) || 0, 0) : 0, A = V ? Math.max(Number(R) || 0, 0) : 0, L = a.checkinData.total_record_locator_init_abandoned_error, O = a.checkinData.total_record_locator_init_abandoned_voluntary, q = L != null || O != null, X = q ? Math.max(Number(L) || 0, 0) : 0, ie = q ? Math.max(Number(O) || 0, 0) : 0, se = q ? Math.max(M - X - ie, 0) : M, Z = C - M, he = a.checkinData.total_record_locator_started || 0, K = a.checkinData.total_record_locator_completed || 0, G = a.checkinData.total_record_locator_closed || 0, te = a.checkinData.total_record_locator_unrecovered || 0;
      C > 0 && f.push({
        source: "Checkin Init",
        target: "Booking Retrieval",
        value: C,
        label: be(C, w)
      });
      const ge = w - C;
      V ? (A > 0 && (_("Abandoned (Init)"), f.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: A,
        label: be(A, w)
      })), E > 0 && (_("Booking not retreived"), f.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: E,
        label: be(E, w)
      }))) : ge > 0 && (_("Abandoned (Init)"), f.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: ge,
        label: be(ge, w)
      })), q ? (X > 0 && (_("Error"), f.push({
        source: "Booking Retrieval",
        target: "Error",
        value: X,
        label: be(X, w)
      })), ie > 0 && (_("Abandoned (Started)"), f.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: ie,
        label: be(ie, w)
      })), se > 0 && (_("Abandoned (Started)"), f.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: se,
        label: be(se, w)
      }))) : M > 0 && (_("Abandoned (Started)"), f.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: M,
        label: be(M, w)
      })), Z > 0 && f.push({
        source: "Booking Retrieval",
        target: "Booking Retrieved",
        value: Z,
        label: be(Z, w)
      }), K > 0 && f.push({
        source: "Booking Retrieved",
        target: "Completed",
        value: K,
        label: be(K, he)
      }), te > 0 && (_("Errors"), f.push({
        source: "Booking Retrieved",
        target: "Errors",
        value: te,
        label: be(te, he)
      }));
      const ye = he - (K + te);
      ye > 0 && (_("Abandoned (Flow)"), f.push({
        source: "Booking Retrieved",
        target: "Abandoned (Flow)",
        value: ye,
        label: be(ye, he)
      }));
      const Se = K - G;
      return Se > 0 && (_("BP Error"), f.push({
        source: "Completed",
        target: "BP Error",
        value: Se,
        label: be(Se, he)
      })), G > 0 && f.push({
        source: "Completed",
        target: "Closed with BP",
        value: G,
        label: be(G, he)
      }), { nodes: b, links: f };
    });
    return t({ isDark: i }), (b, f) => (p(), ee(ke, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(De, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (p(), k("div", Hp, [...f[0] || (f[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", jp, [
              y.value.nodes.length > 0 ? (p(), k("div", Yp, [
                F(Kt, {
                  data: y.value,
                  height: "500px",
                  "use-gradient": !1,
                  "node-gap": 24
                }, null, 8, ["data"])
              ])) : z("", !0),
              m.value && m.value.length > 0 ? (p(), k("div", Kp, [
                u("div", Up, [
                  F(lt, {
                    columns: v,
                    rows: g.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: x }) => [
                      u("span", qp, D(r(String(x.date))), 1)
                    ]),
                    "cell-checkinInit": B(({ row: x }) => [
                      u("span", null, D(l(x.checkin_initiated)), 1)
                    ]),
                    "cell-bookingRetrieval": B(({ row: x }) => [
                      u("span", null, D(h(
                        x.record_locator_init_count,
                        x.checkin_initiated
                      )), 1)
                    ]),
                    "cell-bookingRetrieved": B(({ row: x }) => [
                      u("span", null, D(h(
                        x.record_locator_started_count,
                        x.record_locator_init_count
                      )), 1)
                    ]),
                    "cell-completed": B(({ row: x }) => [
                      u("span", null, D(h(
                        x.record_locator_completed_count,
                        x.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-closed": B(({ row: x }) => [
                      u("span", Xp, D(h(
                        x.record_locator_closed_count,
                        x.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-failed": B(({ row: x }) => [
                      u("span", Gp, D(h(
                        x.unrecovered_count,
                        x.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-reasons": B(({ row: x }) => [
                      Array.isArray(x.failed_steps) && x.failed_steps.length > 0 ? (p(), k("div", Zp, [
                        (p(!0), k(ne, null, fe(x.failed_steps, (_) => (p(), k("div", {
                          key: _.step_name,
                          class: "reason-item"
                        }, [
                          u("span", Qp, D(c(_.step_name)) + ":", 1),
                          u("span", Jp, D(_.failed_count), 1)
                        ]))), 128))
                      ])) : (p(), k("div", e0, "-"))
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (p(), k("div", t0, [
                u("div", n0, [
                  u("div", a0, [
                    F(T(nt), { class: "empty-icon" })
                  ]),
                  f[1] || (f[1] = u("p", { class: "empty-title" }, "No check-in data available", -1)),
                  f[2] || (f[2] = u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see check-in metrics. ", -1))
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
}), o0 = /* @__PURE__ */ me(s0, [["__scopeId", "data-v-b86b263c"]]), i0 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, l0 = {
  key: "content",
  class: "card-body"
}, r0 = {
  key: 0,
  class: "chart-section"
}, c0 = { class: "chart-wrapper" }, d0 = {
  key: 1,
  class: "record-locator-daily-section"
}, u0 = { class: "w-full min-w-0" }, h0 = { class: "cell-plain font-medium" }, f0 = { class: "cell-plain text-center" }, g0 = { class: "cell-plain text-center" }, m0 = { class: "cell-plain text-center" }, p0 = { class: "cell-plain text-center" }, b0 = { class: "cell-plain text-center success-value" }, v0 = { class: "cell-plain text-center failed-value" }, y0 = { class: "cell-plain text-center warning-value" }, x0 = { class: "cell-plain text-center" }, _0 = { class: "cell-plain text-center failed-value" }, k0 = {
  key: 2,
  class: "empty-state"
}, w0 = /* @__PURE__ */ le({
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
    const a = e, s = n, o = (b) => {
      s("export", b);
    }, { isDark: i } = Ce(we(a, "theme")), l = $(() => a.data?.record_locator_by_day ? [...a.data.record_locator_by_day].sort(
      (b, f) => new Date(b.date).getTime() - new Date(f.date).getTime()
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
    ], d = $(
      () => a.isAvianca ? [...r, ...c] : r
    ), h = $(
      () => l.value.map((b) => ({
        id: b.date,
        date: b.date,
        checkin_initiated: b.checkin_initiated,
        record_locator_init_count: b.record_locator_init_count,
        record_locator_started_count: b.record_locator_started_count,
        record_locator_completed_count: b.record_locator_completed_count,
        record_locator_closed_count: b.record_locator_closed_count,
        record_locator_failed_count: b.record_locator_failed_count,
        record_locator_abandoned_count: b.record_locator_abandoned_count,
        record_locator_create_payment_count: b.record_locator_create_payment_count,
        record_locator_create_payment_failed_count: b.record_locator_create_payment_failed_count
      }))
    ), m = $(() => a.data), v = (b, f) => dn(b, f), g = (b, f) => {
      const x = oe(b), _ = v(b, f);
      return `${x} (${_})`;
    }, y = $(() => {
      const b = [], f = [], x = /* @__PURE__ */ new Set(), _ = (ge) => {
        x.has(ge) || (b.push({ name: ge }), x.add(ge));
      };
      if (!m.value.total_checkin_initiated)
        return { nodes: b, links: f };
      _("Checkin Init"), _("Booking retrive"), _("Checkin Started"), _("Checkin Completed"), _("Checkin Closed");
      const w = m.value.total_checkin_initiated, C = m.value.total_record_locator_init, M = m.value.total_record_locator_started, S = m.value.total_record_locator_completed, R = m.value.total_record_locator_closed, V = m.value.total_record_locator_failed, E = m.value.total_record_locator_abandoned, A = m.value.total_record_locator_init_abandoned, L = m.value.total_checkin_pre_init_abandoned_error, O = m.value.total_checkin_pre_init_abandoned_voluntary, q = L != null || O != null, X = q ? Math.max(Number(L) || 0, 0) : 0, ie = q ? Math.max(Number(O) || 0, 0) : 0, se = m.value.total_record_locator_init_abandoned_error, Z = m.value.total_record_locator_init_abandoned_voluntary, he = se != null || Z != null, K = he ? Math.max(Number(se) || 0, 0) : 0, G = he ? Math.max(Number(Z) || 0, 0) : 0;
      C > 0 && f.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: C,
        label: be(C, w)
      });
      const te = w - C;
      return q ? (ie > 0 && (_("Abandoned (Init)"), f.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: ie,
        label: be(ie, w)
      })), X > 0 && (_("Booking not retreived"), f.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: X,
        label: be(X, w)
      }))) : te > 0 && (_("Abandoned (Init)"), f.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: te,
        label: be(te, w)
      })), M > 0 && f.push({
        source: "Booking retrive",
        target: "Checkin Started",
        value: M,
        label: be(M, w)
      }), he ? (K > 0 && (_("Error"), f.push({
        source: "Booking retrive",
        target: "Error",
        value: K,
        label: be(K, w)
      })), G > 0 && (_("Abandoned (Started)"), f.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: G,
        label: be(G, w)
      }))) : A > 0 && (_("Abandoned (Started)"), f.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: A,
        label: be(A, w)
      })), S > 0 && f.push({
        source: "Checkin Started",
        target: "Checkin Completed",
        value: S,
        label: be(S, M)
      }), R > 0 && f.push({
        source: "Checkin Completed",
        target: "Checkin Closed",
        value: R,
        label: be(R, M)
      }), V > 0 && (_("Checkin Failed"), f.push({
        source: "Checkin Started",
        target: "Checkin Failed",
        value: V,
        label: be(V, M)
      })), E > 0 && (_("Abandoned (Flow)"), f.push({
        source: "Checkin Started",
        target: "Abandoned (Flow)",
        value: E,
        label: be(E, M)
      })), { nodes: b, links: f };
    });
    return t({ isDark: i }), (b, f) => (p(), ee(ke, {
      class: "record-locator-root h-full min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: e.collapsible,
      loading: a.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(De, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            a.loading ? (p(), k("div", i0, [...f[0] || (f[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", l0, [
              y.value.nodes.length > 0 ? (p(), k("section", r0, [
                u("div", c0, [
                  F(Kt, {
                    data: y.value,
                    height: "500px",
                    "use-gradient": !1,
                    "node-gap": 24
                  }, null, 8, ["data"])
                ])
              ])) : z("", !0),
              l.value && l.value.length > 0 ? (p(), k("section", d0, [
                u("div", u0, [
                  F(lt, {
                    columns: d.value,
                    rows: h.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: x }) => [
                      u("span", h0, D(T(je)(String(x.date)).format("MMM DD")), 1)
                    ]),
                    "cell-checkinInit": B(({ row: x }) => [
                      u("span", f0, D(T(oe)(x.checkin_initiated)), 1)
                    ]),
                    "cell-bookingRetrieve": B(({ row: x }) => [
                      u("span", g0, D(g(
                        x.record_locator_init_count,
                        x.checkin_initiated
                      )), 1)
                    ]),
                    "cell-checkinStarted": B(({ row: x }) => [
                      u("span", m0, D(T(oe)(x.record_locator_started_count)), 1)
                    ]),
                    "cell-checkinCompleted": B(({ row: x }) => [
                      u("span", p0, D(g(
                        x.record_locator_completed_count,
                        x.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-checkinClosed": B(({ row: x }) => [
                      u("span", b0, D(g(
                        x.record_locator_closed_count,
                        x.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-checkinFailed": B(({ row: x }) => [
                      u("span", v0, D(g(
                        x.record_locator_failed_count,
                        x.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-abandoned": B(({ row: x }) => [
                      u("span", y0, D(g(
                        x.record_locator_abandoned_count,
                        x.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-createPayment": B(({ row: x }) => [
                      u("span", x0, D(T(oe)(
                        x.record_locator_create_payment_count ?? 0
                      )), 1)
                    ]),
                    "cell-failedPayment": B(({ row: x }) => [
                      u("span", _0, D(T(oe)(
                        x.record_locator_create_payment_failed_count ?? 0
                      )), 1)
                    ]),
                    _: 1
                  }, 8, ["columns", "rows"])
                ])
              ])) : (p(), k("section", k0, [...f[1] || (f[1] = [
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
}), sl = /* @__PURE__ */ me(w0, [["__scopeId", "data-v-00877097"]]), C0 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, $0 = {
  key: "content",
  class: "card-body"
}, S0 = {
  key: 0,
  class: "checkin-segments-daily-section"
}, M0 = { class: "w-full min-w-0" }, D0 = { class: "segment-plain" }, T0 = { class: "segment-plain" }, A0 = { class: "segment-plain" }, B0 = { class: "percentage-value" }, L0 = { class: "percentage-value" }, P0 = { class: "percentage-value success" }, I0 = {
  key: 1,
  class: "empty-state"
}, R0 = /* @__PURE__ */ le({
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
    const a = e, s = n, o = (m) => {
      s("export", m);
    }, { isDark: i } = Ce(we(a, "theme")), l = [
      { key: "departure", label: "Departure", align: "center" },
      { key: "connection", label: "Connection", align: "center" },
      { key: "arrival", label: "Arrival", align: "center" },
      { key: "trip", label: "Trip", align: "center" },
      { key: "init", label: "Init", align: "center" },
      { key: "started", label: "Started (%)", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed (%)", align: "center" }
    ], r = $(
      () => a.data.map((m, v) => ({
        id: `segment-${v}-${m.departure_airport}-${m.arrival_airport}-${m.segment_init_count}-${m.segment_started_count}`,
        departure_airport: m.departure_airport,
        conexion_airport: m.conexion_airport,
        arrival_airport: m.arrival_airport,
        segment_init_count: m.segment_init_count,
        segment_started_count: m.segment_started_count,
        segment_completed_count: m.segment_completed_count,
        segment_closed_count: m.segment_closed_count
      }))
    ), c = (m, v) => !v || v === 0 || !m ? "0%" : `${Math.round(m / v * 100)}%`, d = (m) => !m || m === "None" ? "-" : String(m).trim().replace(/_[0-9]+$/i, ""), h = (m) => {
      const v = d(m?.departure_airport), g = d(m?.arrival_airport);
      return v === "-" || g === "-" ? !1 : v === g;
    };
    return t({ isDark: i }), (m, v) => (p(), ee(ke, {
      class: "checkin-segments-root h-full min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(De, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (p(), k("div", C0, [...v[0] || (v[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", $0, [
              a.data.length > 0 ? (p(), k("section", S0, [
                u("div", M0, [
                  F(lt, {
                    columns: l,
                    rows: r.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-departure": B(({ row: g }) => [
                      u("span", D0, D(d(g.departure_airport)), 1)
                    ]),
                    "cell-connection": B(({ row: g }) => [
                      u("span", {
                        class: J(["segment-plain", {
                          "segment-plain--muted": d(g.conexion_airport) === "-"
                        }])
                      }, D(d(g.conexion_airport)), 3)
                    ]),
                    "cell-arrival": B(({ row: g }) => [
                      u("span", T0, D(d(g.arrival_airport)), 1)
                    ]),
                    "cell-trip": B(({ row: g }) => [
                      u("span", A0, D(h(g) ? "Roundtrip" : "One way"), 1)
                    ]),
                    "cell-init": B(({ row: g }) => [
                      Be(D(T(oe)(g.segment_init_count)), 1)
                    ]),
                    "cell-started": B(({ row: g }) => [
                      u("span", B0, D(c(
                        g.segment_started_count,
                        g.segment_init_count
                      )), 1)
                    ]),
                    "cell-completed": B(({ row: g }) => [
                      u("span", L0, D(c(
                        g.segment_completed_count,
                        g.segment_init_count
                      )), 1)
                    ]),
                    "cell-closed": B(({ row: g }) => [
                      u("span", P0, D(c(
                        g.segment_closed_count,
                        g.segment_init_count
                      )), 1)
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (p(), k("section", I0, [...v[1] || (v[1] = [
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
}), ol = /* @__PURE__ */ me(R0, [["__scopeId", "data-v-522b5823"]]), F0 = { class: "checkin-container__body" }, E0 = /* @__PURE__ */ le({
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
    const n = e, a = t, s = $(() => n.loading || n.checkinLoading);
    $(() => n.loading || n.checkinMetricsLoading);
    const o = $(() => n.loading || n.recordLocatorLoading || n.checkinMetricsLoading), i = $(() => n.loading || n.segmentsLoading), l = $(() => n.recordLocatorData ?? n.checkinMetricsData);
    function r(h, m) {
      a("export", { source: h, format: m });
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
    return (h, m) => (p(), ee(ke, {
      class: "checkin-container-root w-full",
      title: "Check in",
      subtitle: "Check-in flows, metrics by record locator and segment breakdown.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading
    }, {
      default: B(() => [
        u("div", F0, [
          e.showCheckin ? (p(), ee(al, {
            key: 0,
            class: "w-full min-h-0",
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: s.value,
            "checkin-data": e.checkinData,
            "failed-data": e.checkinFailedData,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: m[0] || (m[0] = (v) => r("checkin", v))
          }, null, 8, ["initially-open", "loading", "checkin-data", "failed-data", "enable-export", "export-loading"])) : z("", !0),
          F(sl, {
            collapsible: !1,
            loading: o.value,
            data: l.value,
            "is-avianca": e.isAvianca,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: m[1] || (m[1] = (v) => r("recordLocator", v))
          }, null, 8, ["loading", "data", "is-avianca", "theme", "enable-export", "export-loading"]),
          F(ol, {
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
}), O0 = /* @__PURE__ */ me(E0, [["__scopeId", "data-v-d7fe32b0"]]), V0 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, z0 = {
  key: "content",
  class: "card-body"
}, N0 = { class: "chart-section" }, W0 = { class: "chart-wrapper" }, H0 = {
  key: 1,
  class: "empty-chart"
}, j0 = { class: "payment-success-summary" }, Y0 = {
  key: 0,
  class: "disruption-daily-section"
}, K0 = { class: "w-full min-w-0" }, U0 = { class: "font-medium text-center" }, q0 = { class: "text-center" }, X0 = { class: "text-center" }, G0 = { class: "percentage-text" }, Z0 = { class: "text-center" }, Q0 = { class: "abandoned-value" }, J0 = { class: "badges-container badges-wrap" }, eb = { class: "badges-container badges-wrap" }, tb = {
  key: 1,
  class: "empty-state"
}, nb = /* @__PURE__ */ le({
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
    function n(b) {
      return b;
    }
    const a = e, s = t, o = (b) => {
      s("export", b);
    }, i = $(() => a.data?.disruption_by_day ? [...a.data.disruption_by_day].sort(
      (b, f) => new Date(b.date).getTime() - new Date(f.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "abandoned", label: "Abandoned (%)", align: "center" },
      { key: "voluntary", label: "Voluntary", align: "left" },
      { key: "involuntary", label: "Involuntary", align: "left" }
    ], r = $(
      () => i.value.map((b) => ({
        id: b.date,
        ...b
      }))
    ), c = $(() => a.data?.total_payment_success || []), d = $(() => {
      const b = c.value;
      return b.length === 0 ? m(0) : b.map((f) => `${f.currency} ${m(f.total_value)}`).join(" · ");
    }), h = (b, f) => dn(b, f), m = (b) => Pe(b), v = (b) => (b ?? []).reduce((f, x) => f + (x.count ?? 0), 0), g = (b) => typeof b.sell_success_count == "number" ? b.sell_success_count : v(b.payment_success_total), y = $(() => {
      const b = a.data, f = b.total_disruption_conversations || 0, x = b.total_disruption_initiated || 0, _ = b.total_voluntary || 0, w = b.total_involuntary || 0, C = b.total_accepted || 0, M = b.total_confirmed || 0, S = typeof b.total_sell_success == "number" ? b.total_sell_success : v(b.total_payment_success), R = b.total_sell_failed || 0, V = Math.max(0, f - x), E = Math.max(
        0,
        x - _ - w
      ), A = Math.max(0, w - C), L = Math.max(0, _ - M), O = R, q = Math.max(0, M - S - O), X = (Z, he) => be(Z, he), ie = [
        { name: "Initiated", status: "success" },
        { name: "Started", status: "success" },
        { name: "Voluntary", status: "success" },
        { name: "Confirmed", status: "success" },
        { name: "Paid", status: "success" },
        { name: "Not Paid", status: "abandon" },
        { name: "Rejected", status: "error" },
        { name: "Not Confirmed", status: "abandon" },
        { name: "Involuntary", status: "success" },
        { name: "Accepted", status: "success" },
        { name: "Redirect to Human", status: "error" },
        { name: "Abandoned (Init)", status: "abandon" },
        { name: "Abandoned (Start)", status: "abandon" }
      ], se = [];
      return x > 0 && se.push({
        source: "Initiated",
        target: "Started",
        value: x,
        label: X(x, f)
      }), V > 0 && se.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: V,
        label: X(V, f)
      }), _ > 0 && se.push({
        source: "Started",
        target: "Voluntary",
        value: _,
        label: X(_, f)
      }), w > 0 && se.push({
        source: "Started",
        target: "Involuntary",
        value: w,
        label: X(w, f)
      }), E > 0 && se.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: E,
        label: X(E, f)
      }), C > 0 && se.push({
        source: "Involuntary",
        target: "Accepted",
        value: C,
        label: X(C, f)
      }), A > 0 && se.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: A,
        label: X(A, f)
      }), M > 0 && se.push({
        source: "Voluntary",
        target: "Confirmed",
        value: M,
        label: X(M, f)
      }), L > 0 && se.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: L,
        label: X(L, f)
      }), S > 0 && se.push({
        source: "Confirmed",
        target: "Paid",
        value: S,
        label: X(S, f)
      }), O > 0 && se.push({
        source: "Confirmed",
        target: "Rejected",
        value: O,
        label: X(O, f)
      }), q > 0 && se.push({
        source: "Confirmed",
        target: "Not Paid",
        value: q,
        label: X(q, f)
      }), { nodes: ie, links: se };
    });
    return (b, f) => (p(), ee(ke, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking",
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(De, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (p(), k("div", V0, [...f[0] || (f[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", z0, [
              u("section", N0, [
                u("div", W0, [
                  y.value.nodes.length > 0 && y.value.links.length > 0 ? (p(), ee(Kt, {
                    key: 0,
                    data: y.value,
                    height: "500px",
                    "use-gradient": !1,
                    "node-gap": 24
                  }, null, 8, ["data"])) : (p(), k("div", H0, [...f[1] || (f[1] = [
                    u("p", { class: "empty-chart-text" }, " No disruption data available for visualization ", -1)
                  ])]))
                ])
              ]),
              u("section", j0, [
                F(ve, {
                  color: "#22c55e",
                  title: "Payment Success Value",
                  value: d.value
                }, null, 8, ["value"])
              ]),
              i.value && i.value.length > 0 ? (p(), k("section", Y0, [
                f[2] || (f[2] = u("div", { class: "section-header" }, [
                  u("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                u("div", K0, [
                  F(lt, {
                    columns: l,
                    rows: r.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: x }) => [
                      u("span", U0, D(T(je)(String(x.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": B(({ row: x }) => [
                      u("span", q0, D(T(oe)(Number(x.disruption_conversations))), 1)
                    ]),
                    "cell-started": B(({ row: x }) => [
                      u("span", X0, [
                        Be(D(T(oe)(Number(x.disruption_initiated_count))) + " ", 1),
                        u("span", G0, " (" + D(h(
                          Number(x.disruption_initiated_count),
                          Number(x.disruption_conversations)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-abandoned": B(({ row: x }) => [
                      u("span", Z0, [
                        u("span", Q0, D(T(oe)(
                          Number(x.disruption_initiated_count) - Number(x.voluntary_count) - Number(x.involuntary_count)
                        )) + " (" + D(h(
                          Number(x.disruption_initiated_count) - Number(x.voluntary_count) - Number(x.involuntary_count),
                          Number(x.disruption_conversations)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-voluntary": B(({ row: x }) => [
                      u("div", J0, [
                        (p(!0), k(ne, null, fe([x], (_, w) => (p(), k(ne, { key: w }, [
                          F(qe, {
                            color: "neutral",
                            outlined: !0
                          }, {
                            default: B(() => [
                              Be(" VOL " + D(T(oe)(_.voluntary_count)) + " (" + D(h(
                                _.voluntary_count,
                                _.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          F(qe, { color: "success" }, {
                            default: B(() => [
                              Be(" Confirm " + D(T(oe)(_.confirmed_count)) + " (" + D(h(
                                _.confirmed_count,
                                _.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          F(qe, { color: "warning" }, {
                            default: B(() => [
                              Be(" Not Confirm " + D(T(oe)(_.voluntary_count - _.confirmed_count)) + " (" + D(h(
                                _.voluntary_count - _.confirmed_count,
                                _.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          F(qe, { color: "danger" }, {
                            default: B(() => [
                              Be(" Reject " + D(T(oe)(_.sell_failed_count)) + " (" + D(h(
                                _.sell_failed_count,
                                _.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          F(qe, { color: "orange" }, {
                            default: B(() => [
                              Be(" Not Paid " + D(T(oe)(
                                Math.max(
                                  0,
                                  _.confirmed_count - g(_) - _.sell_failed_count
                                )
                              )) + " (" + D(h(
                                Math.max(
                                  0,
                                  _.confirmed_count - g(_) - _.sell_failed_count
                                ),
                                _.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          F(qe, {
                            color: "success",
                            outlined: !0
                          }, {
                            default: B(() => [
                              Be(" Finish " + D(T(oe)(g(_))) + " (" + D(h(
                                g(_),
                                _.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          (p(!0), k(ne, null, fe(_.payment_success_total || [], (C) => (p(), ee(qe, {
                            key: `${_.date}-${C.currency}`,
                            color: "neutral"
                          }, {
                            default: B(() => [
                              Be(D(C.currency) + " " + D(m(C.total_value)), 1)
                            ]),
                            _: 2
                          }, 1024))), 128))
                        ], 64))), 128))
                      ])
                    ]),
                    "cell-involuntary": B(({ row: x }) => [
                      u("div", eb, [
                        (p(!0), k(ne, null, fe([x], (_, w) => (p(), k(ne, { key: w }, [
                          F(qe, { color: "purple" }, {
                            default: B(() => [
                              Be(" INV " + D(T(oe)(_.involuntary_count)) + " (" + D(h(
                                _.involuntary_count,
                                _.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          F(qe, { color: "danger" }, {
                            default: B(() => [
                              Be(" Human " + D(T(oe)(_.involuntary_count - _.accepted_count)) + " (" + D(h(
                                _.involuntary_count - _.accepted_count,
                                _.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          F(qe, { color: "success" }, {
                            default: B(() => [
                              Be(" Accept " + D(T(oe)(_.accepted_count)) + " (" + D(h(
                                _.accepted_count,
                                _.disruption_conversations
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
              ])) : (p(), k("section", tb, [...f[3] || (f[3] = [
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
}), ab = /* @__PURE__ */ me(nb, [["__scopeId", "data-v-a60fbfa7"]]), sb = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, ob = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, ib = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, lb = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, rb = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, cb = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, db = /* @__PURE__ */ le({
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
    const a = e, s = n, o = (v) => {
      s("export", v);
    }, i = we(a, "theme"), { isDark: l } = Ce(i), r = {
      airline_information: "#8b5cf6",
      booking_info: "#f59e0b",
      flight_status: "#06b6d4"
    }, c = ae({
      labels: [],
      datasets: []
    }), d = $(
      () => a.data ?? {
        total_faq_events: 0,
        total_documents_found: 0,
        total_airline_information_retrieved: 0,
        total_booking_info_retrieved: 0,
        total_flight_status_retrieved: 0,
        faq_by_day: []
      }
    ), h = $(() => {
      const v = d.value, g = v.total_airline_information_retrieved + v.total_booking_info_retrieved + v.total_flight_status_retrieved, y = (x) => g > 0 ? (x / g * 100).toFixed(1) : "0.0", b = v.total_faq_events, f = b > 0 ? `${(v.total_documents_found / b * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: r.airline_information,
          value: `${y(v.total_airline_information_retrieved)}%`,
          subvalue: `${oe(v.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: r.booking_info,
          value: `${y(v.total_booking_info_retrieved)}%`,
          subvalue: `${oe(v.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: r.flight_status,
          value: `${y(v.total_flight_status_retrieved)}%`,
          subvalue: `${oe(v.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: oe(v.total_documents_found),
          subvalue: f
        }
      ];
    }), m = (v) => {
      if (!v) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const g = v.faq_by_day || [];
      if (g.length > 0) {
        const y = g.map(
          (_) => je(_.date).format("MMM DD")
        ), b = g.map(
          (_) => _.airline_information_retrieved_count || 0
        ), f = g.map(
          (_) => _.flight_status_retrieved_count || 0
        ), x = g.map(
          (_) => _.booking_info_retrieved_count || 0
        );
        c.value = {
          labels: y,
          datasets: [
            {
              label: "Airline Information",
              data: b,
              borderColor: r.airline_information,
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              fill: !0
            },
            {
              label: "Flight Status",
              data: f,
              borderColor: r.flight_status,
              backgroundColor: "rgba(6, 182, 212, 0.1)",
              fill: !0
            },
            {
              label: "Booking Information",
              data: x,
              borderColor: r.booking_info,
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              fill: !0
            }
          ]
        };
      } else
        c.value = { labels: [], datasets: [] };
    };
    return Oe(
      () => a.data,
      (v) => {
        m(v ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: l }), (v, g) => (p(), ee(ke, {
      class: "w-full min-h-0 self-start",
      title: "FAQ Metrics",
      subtitle: "FAQ volume by category",
      collapsible: !1,
      loading: a.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: o
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        u("div", {
          class: J(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          F(De, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: B(() => [
              a.loading ? (p(), k("div", sb, [...g[0] || (g[0] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (p(), k("div", ob, [
                c.value.labels && c.value.labels.length ? (p(), k("section", ib, [
                  u("div", lb, [
                    F(vt, {
                      data: c.value,
                      theme: i.value
                    }, null, 8, ["data", "theme"])
                  ]),
                  u("div", rb, [
                    (p(!0), k(ne, null, fe(h.value, (y) => (p(), ee(ve, {
                      key: y.name,
                      class: "min-w-0",
                      color: y.color,
                      title: y.label,
                      value: y.value,
                      subvalue: y.subvalue
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ])
                ])) : (p(), k("section", cb, [...g[1] || (g[1] = [
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
}), ub = /* @__PURE__ */ me(db, [["__scopeId", "data-v-5d7a0066"]]), hb = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, fb = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, gb = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, mb = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, pb = {
  key: 0,
  class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4"
}, bb = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, vb = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, yb = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, xb = { class: "max-w-[360px] px-4 text-center" }, _b = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, kb = /* @__PURE__ */ le({
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
    }, s = e, o = n, i = (m) => {
      o("export", m);
    }, l = we(s, "theme"), { isDark: r } = Ce(l), c = $(() => {
      const m = s.data?.agents_by_day || {}, v = Object.keys(m).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const g = /* @__PURE__ */ new Set();
      for (const f of Object.values(m))
        for (const x of Object.keys(f))
          g.add(x);
      const b = Array.from(g).map((f) => {
        const x = f.toLowerCase(), _ = a[x] || a[f] || "#94a3b8";
        return {
          label: f.charAt(0).toUpperCase() + f.slice(1).replace(/_/g, " "),
          data: v.map((w) => m[w]?.[f] || 0),
          borderColor: _
        };
      });
      return {
        labels: v.map((f) => je(f).format("MMM DD")),
        datasets: b
      };
    }), d = $(() => {
      const m = s.data?.agents_by_day || {}, v = {};
      for (const y of Object.values(m))
        for (const [b, f] of Object.entries(y))
          v[b] = (v[b] || 0) + f;
      const g = Object.values(v).reduce((y, b) => y + b, 0);
      return g === 0 ? [] : Object.entries(v).sort(([, y], [, b]) => b - y).map(([y, b]) => {
        const f = y.toLowerCase();
        return {
          name: y,
          label: y.charAt(0).toUpperCase() + y.slice(1).replace(/_/g, " "),
          total: b,
          percentage: (b / g * 100).toFixed(1),
          color: a[f] || a[y] || "#94a3b8"
        };
      });
    }), h = $(() => d.value.slice(0, 4));
    return t({ isDark: r }), (m, v) => (p(), ee(ke, {
      class: "w-full min-h-0 self-start",
      title: "Interactions by Agent",
      subtitle: "Responses sent by AI agents",
      collapsible: !1,
      loading: s.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !s.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        u("div", {
          class: J(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", s.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          F(De, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: B(() => [
              s.loading ? (p(), k("div", hb, [...v[0] || (v[0] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (p(), k("div", fb, [
                c.value.labels && c.value.labels.length ? (p(), k("section", gb, [
                  u("div", mb, [
                    F(vt, {
                      data: c.value,
                      options: e.options,
                      theme: l.value
                    }, null, 8, ["data", "options", "theme"])
                  ]),
                  h.value.length ? (p(), k("div", pb, [
                    (p(!0), k(ne, null, fe(h.value, (g) => (p(), ee(ve, {
                      key: g.name,
                      class: "min-w-0",
                      color: g.color,
                      title: g.label,
                      value: `${g.percentage}%`,
                      subvalue: `${T(oe)(g.total)} msgs`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ])) : z("", !0)
                ])) : d.value.length ? (p(), k("section", bb, [
                  u("div", vb, [
                    (p(!0), k(ne, null, fe(h.value, (g) => (p(), ee(ve, {
                      key: g.name,
                      class: "min-w-0",
                      color: g.color,
                      title: g.label,
                      value: `${g.percentage}%`,
                      subvalue: `${T(oe)(g.total)} msgs`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ])
                ])) : z("", !0),
                d.value.length ? z("", !0) : (p(), k("section", yb, [
                  u("div", xb, [
                    u("div", _b, [
                      F(T(nt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}), wb = /* @__PURE__ */ me(kb, [["__scopeId", "data-v-299d9c3f"]]), Cb = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, $b = {
  key: "content",
  class: "card-body"
}, Sb = {
  key: 0,
  class: "chart-section"
}, Mb = {
  key: 1,
  class: "empty-state"
}, Db = {
  key: 2,
  class: "comparison-section"
}, Tb = { class: "comparison-grid" }, Ab = /* @__PURE__ */ le({
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
    }, s = [
      "#B0C4DE",
      "#C9A0F2",
      "#F5C26B",
      "#8BE8B0",
      "#F2A07A",
      "#7BA3E8"
    ], o = e, i = n, l = (g) => {
      i("export", g);
    }, { isDark: r } = Ce(we(o, "theme"));
    $(() => o.data?.total_sell_success ?? 0);
    const c = $(() => {
      const g = /* @__PURE__ */ new Set();
      for (const y of o.data?.sales_by_channel_by_day ?? [])
        for (const b of Object.keys(y.channels))
          g.add(b);
      return Array.from(g).sort();
    }), d = (g, y) => a[g.toLowerCase()] ?? s[y % s.length];
    function h(g) {
      return g.replace(/_/g, " ").toUpperCase();
    }
    function m(g) {
      if (g.delta === null) return "No previous data";
      const y = oe(g.previous), b = `${Math.abs(g.delta).toFixed(1)}%`;
      return g.delta === 0 ? `0.0% vs prev. period (${y})` : `${g.delta > 0 ? "↑" : "↓"} ${b} vs prev. period (${y})`;
    }
    const v = $(() => {
      const g = o.data?.sales_by_channel_by_day ?? [];
      if (g.length === 0) return { labels: [], datasets: [] };
      const y = g.map((f) => je(f.date).format("MMM-DD")), b = c.value.map((f, x) => ({
        label: f,
        data: g.map((_) => _.channels[f] ?? 0),
        backgroundColor: d(f, x),
        borderRadius: 4
      }));
      return { labels: y, datasets: b };
    });
    return t({ isDark: r }), (g, y) => (p(), ee(ke, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen,
      loading: o.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !o.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: l,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(De, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            o.loading ? (p(), k("div", Cb, [...y[0] || (y[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", $b, [
              v.value.labels.length > 0 ? (p(), k("section", Sb, [
                F($t, {
                  data: v.value,
                  stacked: !0
                }, null, 8, ["data"])
              ])) : (p(), k("section", Mb, [...y[1] || (y[1] = [
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
              e.channelComparison.length > 0 ? (p(), k("section", Db, [
                u("div", Tb, [
                  (p(!0), k(ne, null, fe(e.channelComparison, (b, f) => (p(), ee(T(ve), {
                    key: b.channel,
                    color: d(b.channel, f),
                    title: h(b.channel),
                    value: T(oe)(b.current),
                    subvalue: m(b)
                  }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                ])
              ])) : z("", !0)
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), il = /* @__PURE__ */ me(Ab, [["__scopeId", "data-v-b99f46a5"]]), Bb = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Lb = {
  key: "content",
  class: "card-body"
}, Pb = {
  key: 0,
  class: "chart-section"
}, Ib = { class: "chart-wrapper" }, Rb = {
  key: 1,
  class: "empty-state"
}, Fb = { class: "seller-value-cards" }, Eb = {
  key: 2,
  class: "seller-daily-section"
}, Ob = { class: "w-full min-w-0" }, Vb = { class: "sl-cell font-medium" }, zb = { class: "sl-cell text-center" }, Nb = { class: "sl-cell text-center" }, Wb = { class: "sl-cell text-center" }, Hb = { class: "sl-cell text-center" }, jb = { class: "sl-cell text-center" }, Yb = { class: "sl-cell text-center success-value" }, Kb = {
  key: 0,
  class: "currency-cell-list"
}, Ub = {
  key: 1,
  class: "empty-cell"
}, qb = { class: "sl-cell text-center success-value" }, Xb = { class: "sl-cell text-center" }, Gb = { class: "sl-cell text-center success-value" }, Zb = {
  key: 0,
  class: "currency-cell-list"
}, Qb = {
  key: 1,
  class: "empty-cell"
}, Jb = { class: "sl-cell text-center success-value" }, ev = { class: "sl-cell text-center" }, tv = { class: "sl-cell text-center success-value" }, nv = {
  key: 0,
  class: "currency-cell-list"
}, av = { key: 1 }, sv = {
  key: 0,
  class: "failed-reasons"
}, ov = { class: "reason-name" }, iv = { class: "reason-count" }, lv = {
  key: 1,
  class: "empty-cell"
}, rv = /* @__PURE__ */ le({
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
    function a(A) {
      return A;
    }
    const s = e, o = n, i = (A) => {
      o("export", A);
    }, { isDark: l } = Ce(we(s, "theme")), r = $(() => {
      if (!s.sellerData?.seller_by_day) return [];
      const A = [...s.sellerData.seller_by_day];
      return s.failedData?.failed_by_reason_by_day && s.failedData.failed_by_reason_by_day.forEach((L) => {
        const O = A.findIndex(
          (q) => q.date === L.date
        );
        O !== -1 ? A[O] = { ...A[O], reasons: L.reasons } : A.push({
          date: L.date,
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
          reasons: L.reasons
        });
      }), A.sort(
        (L, O) => new Date(L.date).getTime() - new Date(O.date).getTime()
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
    ], d = $(
      () => r.value.map((A) => ({
        id: A.date,
        ...A
      }))
    ), h = $(() => s.sellerData), m = $(() => s.failedData), v = $(
      () => Array.isArray(s.sellerData.total_value_sell_success) ? s.sellerData.total_value_sell_success : []
    ), g = $(
      () => Array.isArray(s.sellerData.total_value_sell_bank_transfer) ? s.sellerData.total_value_sell_bank_transfer : []
    ), y = $(
      () => Array.isArray(s.sellerData.total_value_sell_cash_option) ? s.sellerData.total_value_sell_cash_option : []
    ), b = $(() => {
      const A = v.value;
      return A.length > 0 ? A.map(
        (L) => `${L.currency} ${Rt(L.total_value)}`
      ).join(" · ") : E(s.sellerData.total_value_sell_success);
    });
    function f(A) {
      return A.length > 0 ? A.map(
        (L) => `${L.currency} ${Rt(L.total_value)}`
      ).join(" · ") : "—";
    }
    const x = $(
      () => f(g.value)
    ), _ = $(
      () => f(y.value)
    ), w = (A) => A.replace(/_/g, " ").replace(/\b\w/g, (L) => L.toUpperCase()), C = (A) => `Failed:
${w(A)}`, M = $(() => {
      const {
        total_seller_conversations: A = 0,
        total_sell_started: L = 0,
        total_sell_booking_created: O = 0,
        total_sell_success: q = 0,
        total_sell_bank_transfer: X = 0,
        total_sell_cash_option: ie = 0,
        total_sell_success_bank_transfer: se = 0,
        total_sell_success_cash: Z = 0
      } = h.value, { failed_by_reason_by_day: he = [] } = m.value;
      if (A === 0) return { nodes: [], links: [] };
      const K = Math.max(
        0,
        q - (se ?? 0) - (Z ?? 0)
      ), G = [
        { name: "Sell Initiated", value: A, status: "success" },
        { name: "Sell Started", value: L, status: "success" },
        { name: "Booking Created", value: O, status: "success" },
        { name: "Sell Success", value: K, status: "success" }
      ], te = [], ge = A - L;
      ge > 0 && (G.push({
        name: "Abandoned (Init)",
        value: ge,
        status: "abandon"
      }), te.push({
        source: "Sell Initiated",
        target: "Abandoned (Init)",
        value: ge,
        label: be(ge, A)
      })), L > 0 && te.push({
        source: "Sell Initiated",
        target: "Sell Started",
        value: L,
        label: be(L, A)
      });
      const ye = he.reduce(
        (I, N) => (N.reasons && Array.isArray(N.reasons) && N.reasons.forEach((H) => {
          const de = H.reason, Y = H.failed_count;
          I[de] = (I[de] || 0) + Y;
        }), I),
        {}
      );
      O > 0 && te.push({
        source: "Sell Started",
        target: "Booking Created",
        value: O,
        label: be(O, A)
      }), X > 0 && (G.push({ name: "Bank Transfer", value: X, status: "success" }), te.push({
        source: "Booking Created",
        target: "Bank Transfer",
        value: X,
        label: be(X, A)
      })), ie > 0 && (G.push({ name: "Cash Option", value: ie, status: "success" }), te.push({
        source: "Booking Created",
        target: "Cash Option",
        value: ie,
        label: be(ie, A)
      })), K > 0 && te.push({
        source: "Booking Created",
        target: "Sell Success",
        value: K,
        label: be(K, A)
      }), (se ?? 0) > 0 && (G.push({
        name: "Bank Transfer Success",
        value: se ?? 0,
        status: "success"
      }), te.push({
        source: "Bank Transfer",
        target: "Bank Transfer Success",
        value: se ?? 0,
        label: be(se ?? 0, A)
      })), (Z ?? 0) > 0 && (G.push({
        name: "Cash Option Success",
        value: Z ?? 0,
        status: "success"
      }), te.push({
        source: "Cash Option",
        target: "Cash Option Success",
        value: Z ?? 0,
        label: be(Z ?? 0, A)
      }));
      const Se = O - K - X - ie;
      Se > 0 && (G.push({
        name: "Failed at Completion",
        value: Se,
        status: "error"
      }), te.push({
        source: "Booking Created",
        target: "Failed at Completion",
        value: Se,
        label: be(Se, A)
      }));
      const Me = L - O;
      if (Me > 0 && (G.push({
        name: "Failed at Booking",
        value: Me,
        status: "error"
      }), te.push({
        source: "Sell Started",
        target: "Failed at Booking",
        value: Me,
        label: be(Me, A)
      })), Object.keys(ye).length > 0) {
        const I = Object.values(ye).reduce(
          (H, de) => H + de,
          0
        ), N = Me - I;
        Object.entries(ye).filter(([, H]) => H > 0).sort(([, H], [, de]) => de - H).forEach(([H, de]) => {
          const Y = `Failed: ${H}`;
          G.push({
            name: Y,
            value: de,
            status: "error",
            label: C(H)
          }), te.push({
            source: "Failed at Booking",
            target: Y,
            value: de,
            label: be(de, A)
          });
        }), N > 0 && (G.push({
          name: "Failed: Without Reason",
          value: N,
          status: "error",
          label: `Failed:
Without Reason`
        }), te.push({
          source: "Failed at Booking",
          target: "Failed: Without Reason",
          value: N,
          label: be(N, A)
        }));
      }
      return { nodes: G, links: te };
    }), S = (A, L) => dn(A, L), R = (A, L) => {
      const O = oe(A), q = S(A, L);
      return `${O} (${q})`;
    }, V = (A) => A == null ? 0 : typeof A == "number" ? A : Array.isArray(A) ? A.reduce((L, O) => L + (O.total_value || 0), 0) : 0, E = (A) => Rt(V(A));
    return t({ isDark: l }), (A, L) => (p(), ee(ke, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: s.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !s.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(De, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            s.loading ? (p(), k("div", Bb, [...L[0] || (L[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", Lb, [
              M.value.nodes.length > 0 ? (p(), k("section", Pb, [
                u("div", Ib, [
                  F(Kt, {
                    data: M.value,
                    height: "560px"
                  }, null, 8, ["data"])
                ])
              ])) : (p(), k("section", Rb, [...L[1] || (L[1] = [
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
              u("section", Fb, [
                F(ve, {
                  class: "seller-value-card",
                  color: "var(--kiut-success)",
                  title: "Total Sales Value",
                  value: b.value
                }, null, 8, ["value"]),
                F(ve, {
                  class: "seller-value-card",
                  color: "#d97706",
                  title: "Bank Transfer Value",
                  value: x.value
                }, null, 8, ["value"]),
                F(ve, {
                  class: "seller-value-card",
                  color: "#ca8a04",
                  title: "Cash Option Value",
                  value: _.value
                }, null, 8, ["value"])
              ]),
              r.value && r.value.length > 0 ? (p(), k("section", Eb, [
                u("div", Ob, [
                  F(lt, {
                    columns: c,
                    rows: d.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: O }) => [
                      u("span", Vb, D(T(je)(String(O.date)).format("MMM DD")), 1)
                    ]),
                    "cell-sellInitiated": B(({ row: O }) => [
                      u("span", zb, D(T(oe)(Number(O.seller_conversations) || 0)), 1)
                    ]),
                    "cell-sellStarted": B(({ row: O }) => [
                      u("span", Nb, D(R(
                        O.sell_started_count,
                        O.seller_conversations || O.sell_started_count
                      )), 1)
                    ]),
                    "cell-getQuote": B(({ row: O }) => [
                      u("span", Wb, D(R(
                        O.sell_get_quote_count,
                        O.seller_conversations || O.sell_started_count
                      )), 1)
                    ]),
                    "cell-bookingCreated": B(({ row: O }) => [
                      u("span", Hb, D(R(
                        O.sell_booking_created_count,
                        O.seller_conversations || O.sell_started_count
                      )), 1)
                    ]),
                    "cell-bankTransfer": B(({ row: O }) => [
                      u("span", jb, D(T(oe)(Number(O.sell_bank_transfer_count) || 0)), 1)
                    ]),
                    "cell-btValue": B(({ row: O }) => [
                      u("span", Yb, [
                        Array.isArray(
                          O.daily_value_sell_success_bank_transfer
                        ) && O.daily_value_sell_success_bank_transfer.length > 0 ? (p(), k("div", Kb, [
                          (p(!0), k(ne, null, fe(O.daily_value_sell_success_bank_transfer, (q) => (p(), k("span", {
                            key: `${O.date}-bt-success-${q.currency}`
                          }, D(q.currency) + " " + D(T(Rt)(q.total_value)), 1))), 128))
                        ])) : (p(), k("span", Ub, "-"))
                      ])
                    ]),
                    "cell-btSuccess": B(({ row: O }) => [
                      u("span", qb, D(T(oe)(
                        Number(
                          O.sell_success_bank_transfer_count
                        ) || 0
                      )), 1)
                    ]),
                    "cell-cashOption": B(({ row: O }) => [
                      u("span", Xb, D(T(oe)(Number(O.sell_cash_option_count) || 0)), 1)
                    ]),
                    "cell-coValue": B(({ row: O }) => [
                      u("span", Gb, [
                        Array.isArray(
                          O.daily_value_sell_success_cash
                        ) && O.daily_value_sell_success_cash.length > 0 ? (p(), k("div", Zb, [
                          (p(!0), k(ne, null, fe(O.daily_value_sell_success_cash, (q) => (p(), k("span", {
                            key: `${O.date}-co-success-${q.currency}`
                          }, D(q.currency) + " " + D(T(Rt)(q.total_value)), 1))), 128))
                        ])) : (p(), k("span", Qb, "-"))
                      ])
                    ]),
                    "cell-cashSuccess": B(({ row: O }) => [
                      u("span", Jb, D(T(oe)(
                        Number(O.sell_success_cash_count) || 0
                      )), 1)
                    ]),
                    "cell-sellSuccess": B(({ row: O }) => [
                      u("span", ev, D(R(
                        O.sell_success_count,
                        O.seller_conversations || O.sell_started_count
                      )), 1)
                    ]),
                    "cell-totalSalesValue": B(({ row: O }) => [
                      u("span", tv, [
                        Array.isArray(O.daily_value_sell_success) && O.daily_value_sell_success.length > 0 ? (p(), k("div", nv, [
                          (p(!0), k(ne, null, fe(O.daily_value_sell_success, (q) => (p(), k("span", {
                            key: `${O.date}-${q.currency}`
                          }, D(q.currency) + " " + D(T(Rt)(q.total_value)), 1))), 128))
                        ])) : (p(), k("span", av, D(E(
                          O.daily_value_sell_success
                        )), 1))
                      ])
                    ]),
                    "cell-failed": B(({ row: O }) => [
                      (O.reasons || []).length > 0 ? (p(), k("div", sv, [
                        (p(!0), k(ne, null, fe(O.reasons || [], (q) => (p(), k("div", {
                          key: q.reason,
                          class: "failed-reason-item"
                        }, [
                          u("span", ov, D(q.reason) + ":", 1),
                          u("span", iv, D(q.failed_count), 1)
                        ]))), 128))
                      ])) : (p(), k("div", lv, "-"))
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : z("", !0)
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), ll = /* @__PURE__ */ me(rv, [["__scopeId", "data-v-d2f74abd"]]), cv = { class: "seller-container__body" }, dv = /* @__PURE__ */ le({
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
    const n = e, a = t, s = $(() => n.loading || n.sellerLoading), o = $(() => n.loading || n.salesByChannelLoading), i = $(() => n.exportLoading || n.sellerExportLoading), l = $(() => n.exportLoading || n.salesByChannelExportLoading);
    function r(c, d) {
      a("export", { source: c, format: d });
    }
    return (c, d) => (p(), ee(ke, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading
    }, {
      default: B(() => [
        u("div", cv, [
          F(ll, {
            "initially-open": e.childrenInitiallyOpen,
            "seller-data": e.sellerData,
            "failed-data": e.failedData,
            loading: s.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": i.value,
            onExport: d[0] || (d[0] = (h) => r("seller", h))
          }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading"]),
          F(il, {
            "initially-open": e.childrenInitiallyOpen,
            data: e.salesByChannelData,
            "channel-comparison": e.channelComparison,
            loading: o.value,
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
}), uv = /* @__PURE__ */ me(dv, [["__scopeId", "data-v-a9f0dfd2"]]), hv = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, fv = {
  key: "content",
  class: "card-body"
}, gv = {
  key: 0,
  class: "chart-section"
}, mv = {
  key: 1,
  class: "empty-state"
}, pv = { class: "empty-state-content" }, bv = { class: "empty-icon-wrapper" }, vv = /* @__PURE__ */ le({
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
    }, { isDark: l, colors: r } = Ce(we(s, "theme")), c = $(() => {
      const m = (s.data?.top_agents || []).filter(
        (b) => b.agent_type?.toLowerCase() !== "triage"
      );
      if (m.length === 0)
        return { labels: [], datasets: [] };
      const v = m.reduce(
        (b, f) => b + (Number(f.conversations) || 0),
        0
      ), g = m.map((b) => {
        const f = b.agent_type?.toLowerCase();
        return a[f] || "#94a3b8";
      }), y = g.map((b) => `${b}80`);
      return {
        labels: m.map((b) => {
          const f = Number(b.conversations) || 0, x = v ? f / v * 100 : 0;
          return `${b.agent_type} - ${f.toLocaleString()} (${x.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: m.map((b) => b.conversations),
            backgroundColor: y,
            borderColor: g,
            borderWidth: 2
          }
        ]
      };
    }), d = $(() => s.options ? s.options : {
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
              const m = (h.label || "").toString().split(" - ")[0], v = Number(h.parsed) || 0, g = (h.dataset.data || []).reduce(
                (b, f) => b + (Number(f) || 0),
                0
              ), y = g ? v / g * 100 : 0;
              return `${m}: ${v.toLocaleString()} (${y.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: l }), (h, m) => (p(), ee(ke, {
      class: "top-agents-root h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(De, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (p(), k("div", hv, [...m[0] || (m[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", fv, [
              c.value.labels && c.value.labels.length ? (p(), k("section", gv, [
                F(Ma, {
                  data: c.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ])) : (p(), k("section", mv, [
                u("div", pv, [
                  u("div", bv, [
                    F(T(Mm), { class: "empty-icon" })
                  ]),
                  m[1] || (m[1] = u("p", { class: "empty-title" }, "No top agents data", -1)),
                  m[2] || (m[2] = u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
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
}), yv = /* @__PURE__ */ me(vv, [["__scopeId", "data-v-a52fe7ae"]]), xv = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, _v = {
  key: "content",
  class: "card-body"
}, kv = {
  key: 0,
  class: "payment-methods-section"
}, wv = { class: "payment-methods-grid" }, Cv = {
  key: 1,
  class: "empty-state"
}, $v = { class: "empty-state-content" }, Sv = { class: "empty-icon-wrapper" }, Mv = {
  key: 2,
  class: "payment-method-daily-section"
}, Dv = { class: "w-full min-w-0" }, Tv = { class: "font-medium" }, Av = { class: "text-center" }, Bv = { class: "text-center success-value" }, Lv = {
  key: 0,
  class: "currency-cell-list"
}, Pv = { class: "payment-tags" }, Iv = { class: "tag-name" }, Rv = {
  key: 0,
  class: "tag-amount"
}, Fv = {
  key: 1,
  class: "tag-amount"
}, Ev = { class: "tag-count" }, Ov = {
  key: 3,
  class: "empty-table-state"
}, Vv = "Not Registered", zv = /* @__PURE__ */ le({
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
    const a = e, s = n, { isDark: o } = Ce(we(a, "theme")), i = ae(!1), l = ae({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), r = $(() => l.value.payment_method_breakdown && l.value.payment_method_breakdown.length > 0), c = $(() => l.value.payment_method_by_day && l.value.payment_method_by_day.length > 0), d = $(() => !l.value.payment_method_by_day || l.value.payment_method_by_day.length === 0 ? [] : [...l.value.payment_method_by_day].sort((S, R) => je(S.date).valueOf() - je(R.date).valueOf())), h = [
      { key: "date", label: "Date", align: "left" },
      { key: "totalSales", label: "Total Sales", align: "center" },
      { key: "totalAmount", label: "Total Amount", align: "center" },
      { key: "paymentMethods", label: "Payment Methods", align: "left" }
    ], m = $(
      () => d.value.map((S) => ({
        id: S.date,
        date: S.date,
        total_count: S.total_count,
        total_amount: S.total_amount,
        total_amount_by_currency: S.total_amount_by_currency,
        payment_methods: S.payment_methods
      }))
    ), v = (S) => {
      if (!S)
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
      const R = (S.payment_method_breakdown || []).map(
        (E) => ({
          payment_method: E.payment_method || "Unknown",
          total_amount: E.total_amount ?? 0,
          count: E.count ?? 0,
          total_amount_by_currency: E.total_amount_by_currency ?? []
        })
      ), V = (S.payment_method_by_day || []).map((E) => ({
        date: E.date || "",
        total_count: E.total_count ?? 0,
        total_amount: E.total_amount ?? 0,
        total_amount_by_currency: E.total_amount_by_currency ?? [],
        payment_methods: (E.payment_methods || []).map((A) => ({
          payment_method: A.payment_method || "Unknown",
          total_amount: A.total_amount ?? 0,
          count: A.count ?? 0,
          total_amount_by_currency: A.total_amount_by_currency ?? []
        }))
      }));
      return {
        airline_name: S.airline_name || a.airlineName,
        start_date: S.start_date || "",
        end_date: S.end_date || "",
        total_conversations: S.total_conversations ?? 0,
        total_amount: S.total_amount ?? 0,
        total_sell_usd: S.total_sell_usd,
        total_amount_by_currency: S.total_amount_by_currency ?? [],
        payment_method_breakdown: R,
        payment_method_by_day: V
      };
    }, g = async () => {
      if (!(!a.fetchFunction || !a.dates || a.dates.length < 2 || !a.airlineName)) {
        i.value = !0;
        try {
          const [S, R] = a.dates.map(
            (E) => je(E).format("YYYY-MM-DD")
          ), V = await a.fetchFunction(
            a.airlineName,
            S,
            R
          );
          l.value = v(V);
        } catch (S) {
          console.error("Error fetching payment method metrics:", S), l.value = v(null);
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
    ], b = (S) => !S || S.toLowerCase() === "unknown" ? Vv : S.replace(/_/g, " "), f = (S) => S == null ? "$0.00" : Pe(S), x = (S) => {
      const R = S.total_amount_by_currency;
      return R && R.length > 0 ? R.map((V) => `${V.currency} ${f(V.total_value)}`).join(" · ") : f(S.total_amount);
    }, _ = (S) => S ? je(S).format("MMM DD") : "-", w = (S) => S == null || Number.isNaN(Number(S)) ? 0 : Number(S), C = (S) => {
      s("export", S);
    };
    function M() {
      const S = a.data;
      S && (Array.isArray(S.payment_method_breakdown) && S.payment_method_breakdown.length > 0 || Array.isArray(S.payment_method_by_day) && S.payment_method_by_day.length > 0) && (i.value = !1, l.value = v(S));
    }
    return tt(() => {
      a.data ? M() : g();
    }), Oe(
      () => a.data,
      (S) => {
        S && M();
      },
      { deep: !0 }
    ), Oe(
      () => a.dates,
      (S) => {
        a.data || S && S[0] && S[1] && g();
      },
      { deep: !0 }
    ), t({ isDark: o }), (S, R) => (p(), ee(ke, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method",
      loading: i.value
    }, {
      headerExport: B(() => [
        e.enableExport && !i.value ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: C,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(De, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            i.value ? (p(), k("div", xv, [...R[0] || (R[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", _v, [
              r.value ? (p(), k("section", kv, [
                R[1] || (R[1] = u("p", { class: "section-label" }, "Sales by Payment Method", -1)),
                u("div", wv, [
                  (p(!0), k(ne, null, fe(l.value.payment_method_breakdown, (V, E) => (p(), ee(ve, {
                    key: V.payment_method,
                    class: "payment-method-card-item min-w-0",
                    color: y[E % y.length],
                    title: b(V.payment_method),
                    value: x(V),
                    subvalue: `${w(V.count)} ${w(V.count) === 1 ? "sale" : "sales"}`
                  }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                ])
              ])) : (p(), k("section", Cv, [
                u("div", $v, [
                  u("div", Sv, [
                    F(T(Tm), { class: "empty-icon" })
                  ]),
                  R[2] || (R[2] = u("p", { class: "empty-title" }, "No payment data available", -1)),
                  R[3] || (R[3] = u("p", { class: "empty-description" }, " No payment method data found for the selected period. Try adjusting the date range. ", -1))
                ])
              ])),
              c.value ? (p(), k("section", Mv, [
                R[5] || (R[5] = u("p", { class: "section-label" }, "Daily Breakdown", -1)),
                u("div", Dv, [
                  F(lt, {
                    columns: h,
                    rows: m.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: V }) => [
                      u("span", Tv, D(_(String(V.date))), 1)
                    ]),
                    "cell-totalSales": B(({ row: V }) => [
                      u("span", Av, D(T(oe)(V.total_count ?? 0)), 1)
                    ]),
                    "cell-totalAmount": B(({ row: V }) => [
                      u("span", Bv, [
                        Array.isArray(V.total_amount_by_currency) && V.total_amount_by_currency.length > 0 ? (p(), k("div", Lv, [
                          (p(!0), k(ne, null, fe(V.total_amount_by_currency, (E) => (p(), k("span", {
                            key: `${V.date}-${E.currency}`
                          }, D(E.currency) + " " + D(f(E.total_value)), 1))), 128))
                        ])) : (p(), k(ne, { key: 1 }, [
                          Be(D(f(Number(V.total_amount ?? 0))), 1)
                        ], 64))
                      ])
                    ]),
                    "cell-paymentMethods": B(({ row: V }) => [
                      u("div", Pv, [
                        (p(!0), k(ne, null, fe(Array.isArray(V.payment_methods) ? V.payment_methods : [], (E) => (p(), k("div", {
                          key: E.payment_method,
                          class: "payment-tag"
                        }, [
                          u("span", Iv, D(b(E.payment_method)), 1),
                          R[4] || (R[4] = u("span", { class: "tag-separator" }, "•", -1)),
                          !E.total_amount_by_currency || E.total_amount_by_currency.length === 0 ? (p(), k("span", Rv, D(f(E.total_amount)), 1)) : (p(), k("span", Fv, D(E.total_amount_by_currency.map(
                            (A) => `${A.currency} ${f(A.total_value)}`
                          ).join(" / ")), 1)),
                          u("span", Ev, "(" + D(w(E.count)) + ")", 1)
                        ]))), 128))
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : r.value ? (p(), k("div", Ov, [...R[6] || (R[6] = [
                u("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
              ])])) : z("", !0)
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Nv = /* @__PURE__ */ me(zv, [["__scopeId", "data-v-0d6d2847"]]), Wv = {
  key: "title-skeleton",
  class: "header-title-group",
  "aria-hidden": "true"
}, Hv = {
  key: 0,
  class: "ut-skeleton-blink skeleton-header-label"
}, jv = {
  key: "title-content",
  class: "header-title-group"
}, Yv = {
  class: "icon-wrapper",
  "aria-hidden": "true"
}, Kv = {
  key: 0,
  class: "metric-label metric-label--header"
}, Uv = {
  key: "aside-skeleton",
  class: "ut-skeleton-blink skeleton-badge",
  "aria-hidden": "true"
}, qv = { key: "aside-content" }, Xv = {
  key: "body-skeleton",
  class: "skeleton-body",
  "aria-busy": "true",
  "aria-label": "Loading metric"
}, Gv = {
  key: 0,
  class: "ut-skeleton-blink skeleton-label"
}, Zv = {
  key: "body-content",
  class: "highlight-inner"
}, Qv = { class: "card-body" }, Jv = { class: "metric-row" }, ey = {
  key: 0,
  class: "metric-prefix"
}, ty = {
  key: 0,
  class: "metric-label"
}, ny = /* @__PURE__ */ le({
  __name: "CardMetric",
  props: {
    label: {},
    value: {},
    prefix: { default: void 0 },
    valueSize: { default: "default" },
    labelPosition: { default: "below" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    currentValue: { default: 0 },
    previousValue: { default: null }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a } = Ce(we(n, "theme")), s = $(() => n.labelPosition === "header"), o = $(
      () => n.previousValue !== null && n.previousValue !== void 0
    ), i = $(() => {
      if (!o.value) return 0;
      const c = n.previousValue;
      return c === 0 ? n.currentValue > 0 ? 100 : 0 : (n.currentValue - c) / c * 100;
    }), l = $(() => {
      const c = i.value.toFixed(1);
      return i.value > 0 ? `+${c}%` : `${c}%`;
    }), r = $(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (c, d) => (p(), ee(ke, {
      collapsible: !1,
      class: J([
        "card-metric",
        "w-full",
        {
          "card-metric--dark": T(a),
          "card-metric--label-header": s.value
        }
      ])
    }, {
      title: B(() => [
        F(De, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (p(), k("div", Wv, [
              d[0] || (d[0] = u("div", { class: "ut-skeleton-blink skeleton-icon" }, null, -1)),
              s.value ? (p(), k("div", Hv)) : z("", !0)
            ])) : (p(), k("div", jv, [
              u("div", Yv, [
                $e(c.$slots, "icon", {}, void 0, !0)
              ]),
              s.value ? (p(), k("span", Kv, D(e.label), 1)) : z("", !0)
            ]))
          ]),
          _: 3
        })
      ]),
      headerAside: B(() => [
        F(De, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (p(), k("div", Uv)) : (p(), k("div", qv, [
              $e(c.$slots, "headerAside", {}, () => [
                o.value ? (p(), k("div", {
                  key: 0,
                  class: J(["change-badge", r.value])
                }, D(l.value), 3)) : z("", !0)
              ], !0)
            ]))
          ]),
          _: 3
        })
      ]),
      default: B(() => [
        F(De, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (p(), k("div", Xv, [
              d[1] || (d[1] = u("div", { class: "ut-skeleton-blink skeleton-value" }, null, -1)),
              s.value ? z("", !0) : (p(), k("div", Gv))
            ])) : (p(), k("div", Zv, [
              u("div", Qv, [
                $e(c.$slots, "value", {}, () => [
                  u("div", Jv, [
                    e.prefix ? (p(), k("span", ey, D(e.prefix), 1)) : z("", !0),
                    u("span", {
                      class: J(["metric-value", e.valueSize === "large" ? "metric-value--large" : ""])
                    }, D(e.value), 3)
                  ])
                ], !0),
                s.value ? z("", !0) : (p(), k("span", ty, D(e.label), 1))
              ])
            ]))
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), wt = /* @__PURE__ */ me(ny, [["__scopeId", "data-v-291e9a9e"]]);
function rl(e, t) {
  return p(), k("svg", {
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
function Ue() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const rt = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", mt = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", ay = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", It = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", St = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", sy = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], oy = {
  key: 0,
  class: "sticky top-0 z-10 border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-2 dark:border-[color:var(--kiut-border-light)]"
}, iy = ["placeholder", "aria-label"], ly = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, ry = ["aria-selected", "onClick", "onMouseenter"], cy = {
  key: 0,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, dy = { class: "min-w-0 flex-1" }, ws = /* @__PURE__ */ le({
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
    const n = e, a = t, s = `kiut-select-${Ue()}`, o = `${s}-label`, i = `${s}-btn`, l = `${s}-listbox`, r = ae(null), c = ae(null), d = ae(null), h = ae(null), m = ae(null), v = ae(!1), g = ae(0), y = ae(""), b = ae({});
    function f() {
      const K = c.value;
      if (!K) return;
      const G = K.getBoundingClientRect();
      b.value = {
        top: `${G.bottom - 3}px`,
        left: `${G.left}px`,
        width: `${G.width}px`
      };
    }
    const x = $(() => n.options.filter((K) => !K.disabled)), _ = $(() => {
      if (!n.searchable) return x.value;
      const K = y.value.trim().toLowerCase();
      return K ? x.value.filter((G) => G.label.toLowerCase().includes(K)) : x.value;
    }), w = $(
      () => n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opción"
    ), C = $(() => n.modelValue === null || n.modelValue === void 0 || n.modelValue === "" ? n.placeholder : n.options.find((G) => G.value === n.modelValue)?.label ?? String(n.modelValue));
    function M(K) {
      return `${String(K.value)}-${K.label}`;
    }
    function S(K) {
      return n.modelValue === K.value;
    }
    function R(K, G) {
      const te = S(K), ge = g.value === G;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        te ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !te && ge ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function V() {
      g.value = Math.max(
        0,
        _.value.findIndex((K) => K.value === n.modelValue)
      );
    }
    function E() {
      if (n.searchable) {
        m.value?.focus();
        return;
      }
      h.value?.focus();
    }
    function A() {
      f(), y.value = "", V(), He(() => E());
    }
    function L() {
      v.value = !1, y.value = "";
    }
    function O(K) {
      a("update:modelValue", K.value), L();
    }
    function q() {
      if (!n.disabled) {
        if (v.value) {
          L();
          return;
        }
        v.value = !0, A();
      }
    }
    function X(K) {
      K.stopPropagation(), !n.disabled && q();
    }
    function ie(K) {
      if (!v.value) return;
      const G = K.target, te = r.value, ge = d.value;
      te && !te.contains(G) && (!ge || !ge.contains(G)) && L();
    }
    function se(K) {
      n.disabled || (K.key === "ArrowDown" || K.key === "Enter" || K.key === " ") && (K.preventDefault(), v.value || (v.value = !0, A()));
    }
    function Z(K) {
      const G = _.value;
      if (K.key === "Escape") {
        K.preventDefault(), L();
        return;
      }
      if (K.key === "ArrowDown") {
        if (K.preventDefault(), G.length === 0) return;
        g.value = 0, h.value?.focus();
        return;
      }
      if (K.key === "ArrowUp") {
        if (K.preventDefault(), G.length === 0) return;
        g.value = G.length - 1, h.value?.focus();
        return;
      }
      if (K.key === "Enter") {
        K.preventDefault();
        const te = G[g.value];
        te && O(te);
      }
    }
    function he(K) {
      const G = _.value;
      if (K.key === "Escape") {
        K.preventDefault(), L();
        return;
      }
      if (G.length !== 0) {
        if (K.key === "ArrowDown") {
          K.preventDefault(), g.value = Math.min(g.value + 1, G.length - 1);
          return;
        }
        if (K.key === "ArrowUp") {
          if (K.preventDefault(), g.value === 0 && n.searchable) {
            m.value?.focus();
            return;
          }
          g.value = Math.max(g.value - 1, 0);
          return;
        }
        if (K.key === "Enter") {
          K.preventDefault();
          const te = G[g.value];
          te && O(te);
        }
      }
    }
    return Oe(y, () => {
      g.value = 0;
    }), tt(() => {
      document.addEventListener("click", ie);
    }), pt(() => {
      document.removeEventListener("click", ie);
    }), (K, G) => (p(), k("div", {
      ref_key: "rootRef",
      ref: r,
      class: "relative font-sans"
    }, [
      e.label ? (p(), k("label", {
        key: 0,
        id: o,
        class: J(T(rt))
      }, D(e.label), 3)) : z("", !0),
      u("button", {
        ref_key: "buttonRef",
        ref: c,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: J([
          T(mt),
          "flex items-center justify-between gap-2 text-left",
          v.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": v.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : w.value,
        onClick: X,
        onKeydown: se
      }, [
        u("span", {
          class: J([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, D(C.value), 3),
        F(T(ks), {
          class: J(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", v.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, sy),
      (p(), ee(_a, { to: "body" }, [
        ct(u("div", {
          ref_key: "panelRef",
          ref: d,
          style: Te(b.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          e.searchable ? (p(), k("div", oy, [
            ct(u("input", {
              ref_key: "searchInputRef",
              ref: m,
              "onUpdate:modelValue": G[0] || (G[0] = (te) => y.value = te),
              type: "search",
              class: J([T(mt), "min-h-0 py-1.5 text-sm"]),
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              onClick: G[1] || (G[1] = et(() => {
              }, ["stop"])),
              onKeydown: et(Z, ["stop"])
            }, null, 42, iy), [
              [an, y.value]
            ])
          ])) : z("", !0),
          u("ul", {
            id: l,
            ref_key: "listRef",
            ref: h,
            role: "listbox",
            tabindex: "-1",
            class: "py-1",
            onKeydown: et(he, ["stop"])
          }, [
            _.value.length === 0 ? (p(), k("li", ly, D(e.noResultsText), 1)) : z("", !0),
            (p(!0), k(ne, null, fe(_.value, (te, ge) => (p(), k("li", {
              key: M(te),
              role: "option",
              "aria-selected": S(te),
              class: J(R(te, ge)),
              onClick: et((ye) => O(te), ["stop"]),
              onMouseenter: (ye) => g.value = ge
            }, [
              e.showOptionCheck ? (p(), k("span", cy, [
                S(te) ? (p(), ee(T(rl), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : z("", !0)
              ])) : z("", !0),
              u("span", dy, D(te.label), 1)
            ], 42, ry))), 128))
          ], 544)
        ], 4), [
          [Yn, v.value]
        ])
      ]))
    ], 512));
  }
}), uy = {
  class: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4",
  "aria-hidden": "true"
}, hy = {
  class: "table-skeleton mt-6 w-full min-w-0",
  "aria-hidden": "true"
}, fy = { class: "table-skeleton__table" }, gy = {
  key: "content",
  class: "card-body"
}, my = { class: "kpi-closed-value" }, py = { class: "kpi-closed-value__main" }, by = {
  key: 0,
  class: "kpi-closed-value__pct"
}, vy = { class: "table-view-select flex justify-end" }, yy = { class: "table-section w-full min-w-0" }, xy = { class: "cell-plain" }, _y = { class: "cell-plain" }, ky = { class: "cell-plain cell-plain--muted" }, wy = { class: "cell-plain" }, Cy = { class: "cell-plain" }, $y = { class: "cell-plain" }, Sy = {
  key: 2,
  class: "empty-state"
}, Go = 6, My = /* @__PURE__ */ le({
  __name: "AgentHumanConversations",
  props: {
    data: { default: () => ({
      total_assigned: 0,
      total_closed: 0,
      total_enqueued: 0,
      avg_time_to_assign_seconds: null,
      avg_conversation_duration_seconds: null,
      agents_by_day: []
    }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 },
    previousTotalEnqueued: { default: null },
    previousTotalClosed: { default: null },
    previousAvgTimeToAssignSeconds: { default: null },
    previousAvgConversationDurationSeconds: { default: null }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = (I) => {
      s("export", I);
    }, { isDark: i } = Ce(we(a, "theme")), l = /* @__PURE__ */ new Set(["—", "-", "–", ""]);
    function r(I) {
      const N = I?.trim() ?? "";
      return N.length > 0 && !l.has(N);
    }
    function c(I) {
      if (!r(I.agent_email)) return !1;
      const N = I.assigned_count ?? 0, H = I.closed_count ?? 0;
      return N > 0 || H > 0;
    }
    function d(I) {
      return (I.assigned_count ?? 0) + (I.closed_count ?? 0);
    }
    function h(I) {
      const N = I?.trim();
      return N || "—";
    }
    const m = $(
      () => (a.data?.agents_by_day ?? []).filter(c)
    ), v = $(() => m.value.length > 0), g = $(() => {
      const I = (a.data?.total_enqueued ?? 0) > 0;
      return v.value || I;
    }), y = ae("by_date"), b = [
      { value: "by_date", label: "By date" },
      { value: "aggregated", label: "Aggregated" }
    ], f = ae("date"), x = ae("desc"), _ = Go;
    Oe(y, (I) => {
      I === "aggregated" ? (f.value = "name", x.value = "asc") : (f.value = "date", x.value = "desc");
    });
    function w(I, N) {
      return N == null ? null : N === 0 ? I > 0 ? 100 : 0 : (I - N) / N * 100;
    }
    function C(I) {
      const N = I.toFixed(1);
      return I > 0 ? `+${N}%` : `${N}%`;
    }
    function M(I, N = !1) {
      const H = N ? -I : I;
      return H > 0 ? "change-badge--up" : H < 0 ? "change-badge--down" : "change-badge--neutral";
    }
    function S(I, N) {
      if (I === null) return null;
      const H = w(I, N);
      return H === null ? null : {
        label: C(H),
        class: M(H, !0)
      };
    }
    function R(I) {
      if (!I) return null;
      const N = I.split(":").map(Number);
      return N.length !== 3 || N.some(isNaN) ? null : N[0] * 3600 + N[1] * 60 + N[2];
    }
    function V(I) {
      const N = Math.round(I), H = Math.floor(N / 3600), de = Math.floor(N % 3600 / 60), Y = N % 60;
      return `${String(H).padStart(2, "0")}:${String(de).padStart(2, "0")}:${String(Y).padStart(2, "0")}`;
    }
    const E = $(() => a.data?.total_enqueued ?? 0), A = $(() => a.data?.total_closed ?? 0), L = $(
      () => a.data?.avg_time_to_assign_seconds ?? null
    ), O = $(
      () => a.data?.avg_conversation_duration_seconds ?? null
    ), q = $(() => E.value <= 0 ? null : `(${(A.value / E.value * 100).toFixed(1)}%)`), X = $(
      () => S(
        R(L.value),
        a.previousAvgTimeToAssignSeconds
      )
    ), ie = $(
      () => S(
        R(O.value),
        a.previousAvgConversationDurationSeconds
      )
    );
    function se(I, N) {
      return {
        id: `${I.date}-${I.agent_email}-${N}`,
        date: I.date,
        dateSort: new Date(I.date).getTime(),
        agent_name: I.agent_name ?? "",
        agent_email: I.agent_email,
        handled: d(I),
        avg_assignation_seconds: R(I.avg_time_to_assign_seconds),
        avg_resolution_seconds: R(I.avg_conversation_duration_seconds),
        avg_assignation_display: I.avg_time_to_assign_seconds ?? "—",
        avg_resolution_display: I.avg_conversation_duration_seconds ?? "—"
      };
    }
    function Z(I) {
      const N = /* @__PURE__ */ new Map();
      for (const H of I) {
        if (!c(H)) continue;
        const de = H.agent_email.trim();
        N.has(de) || N.set(de, {
          agent_name: H.agent_name?.trim() ?? "",
          agent_email: de,
          handled: 0,
          assignSum: 0,
          assignWeight: 0,
          resolutionSum: 0,
          resolutionWeight: 0
        });
        const Y = N.get(de), W = H.assigned_count ?? 0, U = H.closed_count ?? 0;
        Y.handled += d(H), H.agent_name?.trim() && (Y.agent_name = H.agent_name.trim());
        const re = R(H.avg_time_to_assign_seconds);
        re !== null && W > 0 && (Y.assignSum += re * W, Y.assignWeight += W);
        const ue = R(H.avg_conversation_duration_seconds);
        ue !== null && U > 0 && (Y.resolutionSum += ue * U, Y.resolutionWeight += U);
      }
      return Array.from(N.values()).map((H, de) => {
        const Y = H.assignWeight > 0 ? H.assignSum / H.assignWeight : null, W = H.resolutionWeight > 0 ? H.resolutionSum / H.resolutionWeight : null;
        return {
          id: `agg-${H.agent_email}-${de}`,
          agent_name: H.agent_name,
          agent_email: H.agent_email,
          handled: H.handled,
          avg_assignation_seconds: Y,
          avg_resolution_seconds: W,
          avg_assignation_display: Y !== null ? V(Y) : "—",
          avg_resolution_display: W !== null ? V(W) : "—"
        };
      });
    }
    const he = $(() => {
      const I = m.value;
      return y.value === "aggregated" ? Z(I) : I.map(se);
    });
    function K(I, N, H, de) {
      const Y = de === "asc" ? 1 : -1;
      let W = 0;
      switch (H) {
        case "date":
          W = (I.dateSort ?? 0) - (N.dateSort ?? 0);
          break;
        case "name":
          W = (I.agent_name || "").localeCompare(N.agent_name || "", void 0, {
            sensitivity: "base"
          });
          break;
        case "email":
          W = I.agent_email.localeCompare(N.agent_email, void 0, {
            sensitivity: "base"
          });
          break;
        case "handled":
          W = I.handled - N.handled;
          break;
        case "avgAssignation":
          W = (I.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY) - (N.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY);
          break;
        case "avgResolution":
          W = (I.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY) - (N.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY);
          break;
      }
      if (W !== 0) return W * Y;
      if (y.value === "by_date" && H !== "date") {
        const U = (N.dateSort ?? 0) - (I.dateSort ?? 0);
        if (U !== 0) return U;
      }
      return (I.agent_name || "").localeCompare(N.agent_name || "", void 0, {
        sensitivity: "base"
      });
    }
    const G = $(() => {
      const I = [...he.value];
      return I.sort((N, H) => K(N, H, f.value, x.value)), I;
    }), te = $(
      () => G.value
    ), ge = $(() => {
      const I = [];
      return y.value === "by_date" && I.push({
        key: "date",
        label: "Date",
        align: "left",
        sortable: !0
      }), I.push(
        { key: "name", label: "Name", align: "left", sortable: !0 },
        { key: "email", label: "Email", align: "left", sortable: !0 },
        { key: "handled", label: "Handled", align: "center", sortable: !0 },
        {
          key: "avgAssignation",
          label: "Avg Assignation",
          align: "center",
          sortable: !0
        },
        {
          key: "avgResolution",
          label: "Avg Resolution",
          align: "center",
          sortable: !0
        }
      ), I;
    });
    function ye(I) {
      const N = I;
      if (f.value === N) {
        x.value = x.value === "asc" ? "desc" : "asc";
        return;
      }
      f.value = N, N === "date" ? x.value = "desc" : N === "name" || N === "email" ? x.value = "asc" : x.value = "desc";
    }
    const Se = (I) => I == null ? "0" : oe(I), Me = (I) => new Date(I).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    return t({ isDark: i }), (I, N) => (p(), ee(ke, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent",
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(De, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (p(), k("div", {
              key: "loading",
              class: J(["card-body loading-body", { "agent-human-conv--dark": T(i) }]),
              "aria-busy": "true",
              "aria-label": "Loading agent human conversations"
            }, [
              u("div", uy, [
                (p(), k(ne, null, fe(4, (H) => F(wt, {
                  key: `kpi-skeleton-${H}`,
                  label: "Loading",
                  value: "",
                  "label-position": "header",
                  loading: !0,
                  theme: e.theme
                }, null, 8, ["theme"])), 64))
              ]),
              u("section", hy, [
                N[2] || (N[2] = u("div", { class: "table-skeleton__header" }, [
                  u("div", { class: "table-skeleton__titles" }, [
                    u("div", { class: "bm-skeleton-blink skeleton-section-title" }),
                    u("div", { class: "bm-skeleton-blink skeleton-section-subtitle" })
                  ]),
                  u("div", { class: "bm-skeleton-blink skeleton-table-select" })
                ], -1)),
                u("div", fy, [
                  N[1] || (N[1] = u("div", { class: "bm-skeleton-blink skeleton-table-head" }, null, -1)),
                  (p(!0), k(ne, null, fe(T(_), (H) => (p(), k("div", {
                    key: `table-row-skeleton-${H}`,
                    class: "bm-skeleton-blink skeleton-table-row"
                  }))), 128))
                ])
              ])
            ], 2)) : (p(), k("div", gy, [
              g.value ? (p(), k("div", {
                key: 0,
                class: J(["grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4", { "agent-human-conv--dark": T(i) }])
              }, [
                F(wt, {
                  label: "Conversations Opened",
                  "label-position": "header",
                  value: Se(E.value),
                  theme: e.theme,
                  "current-value": E.value,
                  "previous-value": e.previousTotalEnqueued
                }, {
                  icon: B(() => [...N[3] || (N[3] = [
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
                }, 8, ["value", "theme", "current-value", "previous-value"]),
                F(wt, {
                  label: "Conversations Closed",
                  "label-position": "header",
                  value: Se(A.value),
                  theme: e.theme,
                  "current-value": A.value,
                  "previous-value": e.previousTotalClosed
                }, {
                  icon: B(() => [...N[4] || (N[4] = [
                    u("svg", {
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.5"
                    }, [
                      u("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      })
                    ], -1)
                  ])]),
                  value: B(() => [
                    u("div", my, [
                      u("span", py, D(Se(A.value)), 1),
                      q.value ? (p(), k("span", by, D(q.value), 1)) : z("", !0)
                    ])
                  ]),
                  _: 1
                }, 8, ["value", "theme", "current-value", "previous-value"]),
                F(wt, {
                  label: "Avg Time to Assign",
                  "label-position": "header",
                  value: L.value ?? "—",
                  theme: e.theme,
                  "current-value": R(L.value) ?? 0,
                  "previous-value": e.previousAvgTimeToAssignSeconds
                }, $s({
                  icon: B(() => [
                    N[5] || (N[5] = u("svg", {
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.5"
                    }, [
                      u("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      })
                    ], -1))
                  ]),
                  _: 2
                }, [
                  X.value ? {
                    name: "headerAside",
                    fn: B(() => [
                      u("div", {
                        class: J(["duration-trend-badge", X.value.class])
                      }, D(X.value.label), 3)
                    ]),
                    key: "0"
                  } : void 0
                ]), 1032, ["value", "theme", "current-value", "previous-value"]),
                F(wt, {
                  label: "Avg Resolution Time",
                  "label-position": "header",
                  value: O.value ?? "—",
                  theme: e.theme,
                  "current-value": R(O.value) ?? 0,
                  "previous-value": e.previousAvgConversationDurationSeconds
                }, $s({
                  icon: B(() => [
                    N[6] || (N[6] = u("svg", {
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.5"
                    }, [
                      u("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      })
                    ], -1))
                  ]),
                  _: 2
                }, [
                  ie.value ? {
                    name: "headerAside",
                    fn: B(() => [
                      u("div", {
                        class: J(["duration-trend-badge", ie.value.class])
                      }, D(ie.value.label), 3)
                    ]),
                    key: "0"
                  } : void 0
                ]), 1032, ["value", "theme", "current-value", "previous-value"])
              ], 2)) : z("", !0),
              v.value ? (p(), ee(ke, {
                key: 1,
                class: "agent-table-section mt-6",
                title: "Conversations Managed by Agent",
                subtitle: "Daily performance per human agent",
                collapsible: !1
              }, {
                headerAside: B(() => [
                  u("div", vy, [
                    F(ws, {
                      modelValue: y.value,
                      "onUpdate:modelValue": N[0] || (N[0] = (H) => y.value = H),
                      options: b,
                      "aria-label-trigger": "Table view mode",
                      "show-option-check": !1
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                default: B(() => [
                  u("div", yy, [
                    (p(), ee(lt, {
                      key: `${y.value}-${f.value}-${x.value}`,
                      columns: ge.value,
                      rows: te.value,
                      "sort-key": f.value,
                      "sort-direction": x.value,
                      "max-visible-rows": Go,
                      "row-key": "id",
                      onSort: ye
                    }, {
                      "cell-date": B(({ row: H }) => [
                        u("span", xy, D(Me(String(H.date))), 1)
                      ]),
                      "cell-name": B(({ row: H }) => [
                        u("span", _y, D(h(H.agent_name)), 1)
                      ]),
                      "cell-email": B(({ row: H }) => [
                        u("span", ky, D(H.agent_email), 1)
                      ]),
                      "cell-handled": B(({ row: H }) => [
                        u("span", wy, D(Se(Number(H.handled))), 1)
                      ]),
                      "cell-avgAssignation": B(({ row: H }) => [
                        u("span", Cy, D(H.avg_assignation_display), 1)
                      ]),
                      "cell-avgResolution": B(({ row: H }) => [
                        u("span", $y, D(H.avg_resolution_display), 1)
                      ]),
                      _: 1
                    }, 8, ["columns", "rows", "sort-key", "sort-direction"]))
                  ])
                ]),
                _: 1
              })) : g.value ? z("", !0) : (p(), k("div", Sy, [...N[7] || (N[7] = [
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
}), Dy = /* @__PURE__ */ me(My, [["__scopeId", "data-v-4fe2df89"]]), Ty = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Ay = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, By = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, Ly = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Py = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Iy = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Ry = { class: "max-w-[360px] px-4 text-center" }, Fy = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Zo = 5, Ey = /* @__PURE__ */ le({
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
    const a = e, s = n, o = (y) => {
      s("export", y);
    }, i = we(a, "theme"), { isDark: l } = Ce(i), r = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, c = ae({
      labels: [],
      datasets: []
    }), d = $(
      () => a.data ?? {
        channels_by_day: {},
        total_by_channel: {},
        total_conversations: 0
      }
    ), h = $(() => {
      const y = d.value.total_by_channel || {}, b = Object.values(y).reduce(
        (f, x) => f + x,
        0
      );
      return b === 0 ? [] : Object.entries(y).sort(([, f], [, x]) => x - f).map(([f, x]) => ({
        name: f,
        label: f.toUpperCase(),
        total: x,
        percentage: (x / b * 100).toFixed(1),
        color: r[f.toLowerCase()] || "#9ca3af"
      }));
    }), m = $(
      () => h.value.slice(0, Zo)
    ), v = $(() => {
      const y = Math.min(m.value.length, Zo);
      if (!(y <= 0))
        return { gridTemplateColumns: `repeat(${y}, minmax(0, 1fr))` };
    }), g = (y) => {
      if (!y || !y.channels_by_day) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const b = y.channels_by_day, f = Object.keys(b).sort();
      if (f.length === 0) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const x = /* @__PURE__ */ new Set();
      for (const C of Object.values(b))
        for (const M of Object.keys(C))
          x.add(M);
      const w = Array.from(x).map((C) => {
        const M = C.toLowerCase(), S = r[M] || "#9ca3af";
        return {
          label: C.toUpperCase(),
          data: f.map((R) => b[R]?.[C] || 0),
          borderColor: S
        };
      });
      c.value = {
        labels: f.map((C) => je(C).format("MMM DD")),
        datasets: w
      };
    };
    return Oe(
      () => a.data,
      (y) => {
        g(y ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: l }), (y, b) => (p(), ee(ke, {
      class: "w-full min-h-0 self-start",
      title: "Conversations by Channel",
      subtitle: "Conversations sent by AI agents",
      collapsible: !1,
      loading: a.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: o
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        u("div", {
          class: J(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          F(De, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: B(() => [
              a.loading ? (p(), k("div", Ty, [...b[0] || (b[0] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (p(), k("div", Ay, [
                c.value.labels && c.value.labels.length ? (p(), k("section", By, [
                  u("div", Ly, [
                    F(vt, {
                      data: c.value,
                      theme: i.value
                    }, null, 8, ["data", "theme"])
                  ]),
                  m.value.length ? (p(), k("div", {
                    key: 0,
                    class: "grid w-full gap-3 md:gap-4",
                    style: Te(v.value)
                  }, [
                    (p(!0), k(ne, null, fe(m.value, (f) => (p(), ee(ve, {
                      key: f.name,
                      class: "min-w-0",
                      color: f.color,
                      title: f.label,
                      value: `${f.percentage}%`,
                      subvalue: `${T(oe)(f.total)} msgs`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)) : z("", !0)
                ])) : h.value.length ? (p(), k("section", Py, [
                  u("div", {
                    class: "grid w-full gap-3 md:gap-4",
                    style: Te(v.value)
                  }, [
                    (p(!0), k(ne, null, fe(m.value, (f) => (p(), ee(ve, {
                      key: f.name,
                      class: "min-w-0",
                      color: f.color,
                      title: f.label,
                      value: `${f.percentage}%`,
                      subvalue: `${T(oe)(f.total)} msgs`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)
                ])) : z("", !0),
                h.value.length ? z("", !0) : (p(), k("section", Iy, [
                  u("div", Ry, [
                    u("div", Fy, [
                      F(T(nt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                    ]),
                    b[1] || (b[1] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No channel metrics data available ", -1)),
                    b[2] || (b[2] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No channel data found for the selected period. Try adjusting the date range. ", -1))
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
}), Oy = /* @__PURE__ */ me(Ey, [["__scopeId", "data-v-de07e6c8"]]), Vy = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, zy = {
  key: "content",
  class: "card-body"
}, Ny = { class: "chart-container" }, Wy = { class: "triage-table-block w-full min-w-0" }, Hy = { class: "triage-row-label" }, jy = {
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
  class: "triage-count"
}, Xy = {
  key: 1,
  class: "empty-state"
}, Gy = { class: "empty-state-content" }, Zy = { class: "empty-icon-wrapper" }, Qy = /* @__PURE__ */ le({
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
    const a = e, s = n, o = (_) => {
      s("export", _);
    }, { isDark: i, colors: l } = Ce(
      we(a, "theme")
    ), r = $(() => {
      const _ = a.data?.combinations || {}, w = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [C, M] of Object.entries(_)) {
        const S = C.split("+").filter(Boolean);
        if (!S.includes("triage")) continue;
        const R = S.filter((V) => V !== "triage").length;
        R >= 4 ? w["4p"] += Number(M) || 0 : w[R] += Number(M) || 0;
      }
      return w;
    }), c = $(() => {
      const _ = r.value;
      return _[0] + _[1] + _[2] + _[3] + _["4p"] || 0;
    }), d = $(() => Object.keys(a.data?.combinations || {}).length > 0), h = $(() => {
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
    }), m = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], v = $(() => {
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
    }, y = (_) => _?.replace("80", "") || "#888888", b = $(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [h.value.pct0],
          backgroundColor: g.c0,
          borderColor: y(g.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [h.value.pct1],
          backgroundColor: g.c1,
          borderColor: y(g.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [h.value.pct2],
          backgroundColor: g.c2,
          borderColor: y(g.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [h.value.pct3],
          backgroundColor: g.c3,
          borderColor: y(g.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [h.value.pct4p],
          backgroundColor: g.c4p,
          borderColor: y(g.c4p),
          borderWidth: 1
        }
      ]
    })), f = $(() => ({
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
    })), x = (_) => `${(Number(_) || 0).toFixed(0)}`;
    return t({ isDark: i }), (_, w) => (p(), ee(ke, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(De, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (p(), k("div", Vy, [...w[0] || (w[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", zy, [
              d.value ? (p(), k(ne, { key: 0 }, [
                u("div", Ny, [
                  F($t, {
                    data: b.value,
                    options: f.value
                  }, null, 8, ["data", "options"])
                ]),
                F(ve, {
                  class: "w-full min-w-0",
                  title: "Total",
                  value: T(oe)(c.value),
                  subvalue: "Conversations with triage"
                }, null, 8, ["value"]),
                u("div", Wy, [
                  F(lt, {
                    columns: m,
                    rows: v.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-metric": B(({ row: C }) => [
                      u("span", Hy, D(C.metric), 1)
                    ]),
                    "cell-b0": B(({ row: C }) => [
                      C.id === "pct" ? (p(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: Te({ color: y(g.c0) })
                      }, D(x(Number(C.b0))) + "%", 5)) : (p(), k("span", jy, D(T(oe)(Number(C.b0))), 1))
                    ]),
                    "cell-b1": B(({ row: C }) => [
                      C.id === "pct" ? (p(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: Te({ color: y(g.c1) })
                      }, D(x(Number(C.b1))) + "%", 5)) : (p(), k("span", Yy, D(T(oe)(Number(C.b1))), 1))
                    ]),
                    "cell-b2": B(({ row: C }) => [
                      C.id === "pct" ? (p(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: Te({ color: y(g.c2) })
                      }, D(x(Number(C.b2))) + "%", 5)) : (p(), k("span", Ky, D(T(oe)(Number(C.b2))), 1))
                    ]),
                    "cell-b3": B(({ row: C }) => [
                      C.id === "pct" ? (p(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: Te({ color: y(g.c3) })
                      }, D(x(Number(C.b3))) + "%", 5)) : (p(), k("span", Uy, D(T(oe)(Number(C.b3))), 1))
                    ]),
                    "cell-b4p": B(({ row: C }) => [
                      C.id === "pct" ? (p(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: Te({ color: y(g.c4p) })
                      }, D(x(Number(C.b4p))) + "%", 5)) : (p(), k("span", qy, D(T(oe)(Number(C.b4p))), 1))
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ], 64)) : (p(), k("div", Xy, [
                u("div", Gy, [
                  u("div", Zy, [
                    F(T(nt), { class: "empty-icon" })
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
}), Jy = /* @__PURE__ */ me(Qy, [["__scopeId", "data-v-4610c1a9"]]), e1 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, t1 = {
  key: "content",
  class: "card-body"
}, n1 = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-3 min-h-0"
}, a1 = { class: "pie-section" }, s1 = {
  key: 1,
  class: "empty-state"
}, o1 = /* @__PURE__ */ le({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = Ce(we(n, "theme")), o = [
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
    }, l = (v) => i[v]?.label || v.toUpperCase(), r = $(
      () => n.data?.items && n.data.items.length > 0
    ), c = $(
      () => (n.data?.items || []).reduce((v, g) => v + g.count, 0)
    ), d = $(() => {
      const v = {};
      for (const g of n.data?.items || [])
        v[g.language] = (v[g.language] || 0) + g.count;
      return Object.entries(v).map(([g, y]) => ({ language: g, count: y })).sort((g, y) => y.count - g.count);
    }), h = $(() => ({
      labels: d.value.map((v) => l(v.language)),
      datasets: [
        {
          data: d.value.map((v) => v.count),
          backgroundColor: d.value.map(
            (v, g) => o[g % o.length] + "80"
          ),
          borderColor: d.value.map(
            (v, g) => o[g % o.length]
          ),
          borderWidth: 2,
          hoverOffset: 6
        }
      ]
    })), m = $(() => ({
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
          titleFont: {
            family: "'Space Grotesk', sans-serif",
            size: 13,
            weight: 600
          },
          bodyFont: { family: "'DM Sans', sans-serif", size: 12 },
          callbacks: {
            label: (v) => {
              const g = v.raw || 0, y = c.value > 0 ? (g / c.value * 100).toFixed(1) : "0";
              return ` ${v.label}: ${g} (${y}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: a }), (v, g) => (p(), ee(ke, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1,
      loading: n.loading
    }, {
      default: B(() => [
        F(De, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            n.loading ? (p(), k("div", e1, [...g[0] || (g[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", t1, [
              r.value ? (p(), k("div", n1, [
                u("section", a1, [
                  F(Ma, {
                    data: h.value,
                    options: m.value
                  }, null, 8, ["data", "options"])
                ]),
                F(ve, {
                  class: "shrink-0",
                  title: "Total",
                  value: T(oe)(c.value),
                  color: "#8b5cf6"
                }, null, 8, ["value"])
              ])) : (p(), k("section", s1, [...g[1] || (g[1] = [
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
}), i1 = /* @__PURE__ */ me(o1, [["__scopeId", "data-v-8743ba33"]]), l1 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, r1 = {
  key: "content",
  class: "card-body"
}, c1 = {
  key: 0,
  class: "guardrails-daily-section"
}, d1 = { class: "w-full min-w-0" }, u1 = { class: "font-medium" }, h1 = { class: "font-semibold" }, f1 = { class: "type-badges-row" }, g1 = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, m1 = {
  key: 1,
  class: "empty-state"
}, p1 = /* @__PURE__ */ le({
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
    const a = e, s = n, o = (b) => {
      s("export", b);
    }, { isDark: i } = Ce(we(a, "theme")), l = $(
      () => a.data?.items && a.data.items.length > 0
    ), r = $(
      () => (a.data?.items || []).reduce((b, f) => b + f.count, 0)
    ), c = (b) => {
      const f = {};
      for (const w of a.data?.items || [])
        f[w[b]] = (f[w[b]] || 0) + w.count;
      const x = Object.entries(f).sort((w, C) => C[1] - w[1]);
      if (x.length === 0) return { name: "—", pct: 0 };
      const _ = r.value;
      return {
        name: x[0][0],
        pct: _ > 0 ? Math.round(x[0][1] / _ * 100) : 0
      };
    }, d = $(() => c("guardrail_type")), h = $(() => c("guardrail_action")), m = $(() => c("guardrail_source")), v = $(() => {
      const b = {};
      for (const f of a.data?.items || [])
        b[f.date] || (b[f.date] = {}), b[f.date][f.guardrail_type] = (b[f.date][f.guardrail_type] || 0) + f.count;
      return Object.entries(b).map(([f, x]) => ({
        date: f,
        total: Object.values(x).reduce((_, w) => _ + w, 0),
        types: Object.entries(x).map(([_, w]) => ({ type: _, count: w })).sort((_, w) => w.count - _.count)
      })).sort((f, x) => new Date(f.date).getTime() - new Date(x.date).getTime());
    }), g = [
      { key: "date", label: "Date", align: "center" },
      { key: "count", label: "Count", align: "center" },
      { key: "types", label: "Types", align: "left" }
    ], y = $(
      () => v.value.map((b) => ({
        id: b.date,
        date: b.date,
        total: b.total,
        types: b.types
      }))
    );
    return t({ isDark: i }), (b, f) => (p(), ee(ke, {
      class: "guardrails-root h-full min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(De, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (p(), k("div", l1, [...f[0] || (f[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", r1, [
              l.value ? (p(), k(ne, { key: 0 }, [
                v.value.length > 0 ? (p(), k("section", c1, [
                  u("div", d1, [
                    F(lt, {
                      columns: g,
                      rows: y.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, {
                      "cell-date": B(({ row: x }) => [
                        u("span", u1, D(T(je)(String(x.date)).format("MMM DD")), 1)
                      ]),
                      "cell-count": B(({ row: x }) => [
                        u("span", h1, D(T(oe)(x.total)), 1)
                      ]),
                      "cell-types": B(({ row: x }) => [
                        u("div", f1, [
                          (p(!0), k(ne, null, fe(x.types, (_) => (p(), k("span", {
                            key: _.type,
                            class: "type-count-badge"
                          }, D(_.type) + " (" + D(_.count) + ") ", 1))), 128))
                        ])
                      ]),
                      _: 1
                    }, 8, ["rows"])
                  ])
                ])) : z("", !0),
                u("section", g1, [
                  F(ve, {
                    title: "Total Events",
                    value: T(oe)(r.value)
                  }, null, 8, ["value"]),
                  F(ve, {
                    title: "Top type",
                    value: d.value.name,
                    subvalue: d.value.pct > 0 ? `(${d.value.pct}%)` : void 0
                  }, null, 8, ["value", "subvalue"]),
                  F(ve, {
                    title: "Top action",
                    value: h.value.name,
                    subvalue: h.value.pct > 0 ? `(${h.value.pct}%)` : void 0
                  }, null, 8, ["value", "subvalue"]),
                  F(ve, {
                    title: "Top source",
                    value: m.value.name,
                    subvalue: m.value.pct > 0 ? `(${m.value.pct}%)` : void 0
                  }, null, 8, ["value", "subvalue"])
                ])
              ], 64)) : (p(), k("section", m1, [...f[1] || (f[1] = [
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
}), b1 = /* @__PURE__ */ me(p1, [["__scopeId", "data-v-80a28b15"]]), v1 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, y1 = {
  key: "content",
  class: "card-body"
}, x1 = { class: "chart-section" }, _1 = { class: "chart-wrapper" }, k1 = {
  key: 1,
  class: "empty-chart"
}, w1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, C1 = {
  key: 0,
  class: "dn-failure-section"
}, $1 = { class: "w-full min-w-0" }, S1 = { class: "failure-reason" }, M1 = { class: "failure-count" }, D1 = { class: "impact-bar-container" }, T1 = { class: "impact-label" }, A1 = { class: "dn-trend-health-block flex flex-col gap-0" }, B1 = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, L1 = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, P1 = { class: "system-health" }, I1 = { class: "system-health-content" }, R1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, F1 = {
  key: 1,
  class: "empty-state"
}, E1 = /* @__PURE__ */ le({
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
    }, { isDark: i, colors: l } = Ce(we(a, "theme")), r = $(() => {
      const C = a.data?.documentCounts?.items || [], M = a.data?.processingCounts?.items || [];
      return C.length > 0 || M.length > 0;
    }), c = $(() => {
      const C = a.data?.documentCounts?.items || [];
      return {
        processing_started: C.reduce((M, S) => M + S.processing_started, 0),
        processing_completed: C.reduce((M, S) => M + S.processing_completed, 0),
        processing_failed: C.reduce((M, S) => M + S.processing_failed, 0),
        row_count_total: C.reduce((M, S) => M + S.row_count_total, 0)
      };
    }), d = $(() => {
      const C = a.data?.processingCounts?.items || [];
      return {
        processing_started: C.reduce((M, S) => M + S.processing_started, 0),
        processing_success: C.reduce((M, S) => M + S.processing_success, 0),
        notification_sent: C.reduce((M, S) => M + S.notification_sent, 0),
        notification_failed: C.reduce((M, S) => M + S.notification_failed, 0),
        dq_phone: C.reduce((M, S) => M + S.dq_error_phone_not_found, 0),
        dq_flight: C.reduce((M, S) => M + S.dq_error_flight_not_found, 0),
        dq_booking: C.reduce((M, S) => M + S.dq_error_booking_not_found, 0),
        dq_other: C.reduce((M, S) => M + S.dq_error_other, 0),
        totalDqErrors: C.reduce(
          (M, S) => M + S.dq_error_phone_not_found + S.dq_error_flight_not_found + S.dq_error_booking_not_found + S.dq_error_other,
          0
        )
      };
    }), h = $(
      () => c.value.row_count_total || d.value.processing_started
    ), m = $(
      () => Math.max(0, h.value - d.value.notification_sent)
    ), v = (C, M) => M ? `${Math.round(C / M * 100)}%` : "0%", g = $(() => {
      const C = [
        { reason: "Booking not found", count: d.value.dq_booking },
        { reason: "Phone not found", count: d.value.dq_phone },
        { reason: "Flight not found", count: d.value.dq_flight },
        {
          reason: "Notification failed",
          count: d.value.notification_failed
        },
        { reason: "Other", count: d.value.dq_other }
      ].filter((M) => M.count > 0).sort((M, S) => S.count - M.count);
      return C.length > 0 ? C[0] : { reason: "None", count: 0 };
    }), y = $(() => {
      const C = h.value;
      return [
        { reason: "Booking not found", count: d.value.dq_booking },
        { reason: "Flight not found", count: d.value.dq_flight },
        { reason: "Phone not found", count: d.value.dq_phone },
        {
          reason: "Notification failed",
          count: d.value.notification_failed
        },
        { reason: "Other", count: d.value.dq_other }
      ].map((M) => ({
        ...M,
        impactPct: C > 0 ? Math.round(M.count / C * 100) : 0
      }));
    }), b = [
      { key: "reason", label: "Reason", align: "left" },
      { key: "count", label: "Count", align: "center" },
      { key: "impact", label: "Impact", align: "center" }
    ], f = $(
      () => y.value.map((C) => ({
        id: C.reason,
        reason: C.reason,
        count: C.count,
        impactPct: C.impactPct
      }))
    ), x = $(() => {
      const C = h.value, M = d.value.processing_success, S = Math.max(0, M - d.value.totalDqErrors), R = d.value.notification_sent, V = Math.max(0, C - M), E = d.value.totalDqErrors, A = Math.max(0, S - R), L = (X, ie) => be(X, ie), O = [
        { name: "Records Detected", status: "success" },
        { name: "Valid Reservations", status: "success" },
        { name: "Invalid / Unprocessed", status: "error" },
        { name: "Contactable", status: "success" },
        { name: "Data Quality Issues", status: "error" },
        { name: "Notified", status: "success" },
        { name: "Not Delivered", status: "abandon" }
      ], q = [];
      return M > 0 && q.push({
        source: "Records Detected",
        target: "Valid Reservations",
        value: M,
        label: L(M, C)
      }), V > 0 && q.push({
        source: "Records Detected",
        target: "Invalid / Unprocessed",
        value: V,
        label: L(V, C)
      }), S > 0 && q.push({
        source: "Valid Reservations",
        target: "Contactable",
        value: S,
        label: L(S, C)
      }), E > 0 && q.push({
        source: "Valid Reservations",
        target: "Data Quality Issues",
        value: E,
        label: L(E, C)
      }), R > 0 && q.push({
        source: "Contactable",
        target: "Notified",
        value: R,
        label: L(R, C)
      }), A > 0 && q.push({
        source: "Contactable",
        target: "Not Delivered",
        value: A,
        label: L(A, C)
      }), { nodes: O, links: q };
    }), _ = $(() => {
      const C = [...a.data?.processingCounts?.items || []].sort(
        (L, O) => new Date(L.date).getTime() - new Date(O.date).getTime()
      ), M = a.data?.documentCounts?.items || [], S = {};
      for (const L of M)
        S[L.date] = (S[L.date] || 0) + L.row_count_total;
      const R = [
        .../* @__PURE__ */ new Set([
          ...C.map((L) => L.date),
          ...M.map((L) => L.date)
        ])
      ].sort(), V = R.map((L) => je(L).format("MMM DD")), E = R.map((L) => {
        const O = C.find((ie) => ie.date === L), q = O?.notification_sent || 0, X = S[L] || O?.processing_started || 0;
        return X > 0 ? Math.round(q / X * 100) : 0;
      }), A = R.map((L) => C.find((q) => q.date === L)?.notification_sent || 0);
      return {
        labels: V,
        datasets: [
          {
            label: "Success Rate (%)",
            data: E,
            borderColor: "#8b5cf6",
            yAxisID: "y"
          },
          {
            label: "Notifications Sent",
            data: A,
            borderColor: "#10b981",
            yAxisID: "y1"
          }
        ]
      };
    }), w = $(() => ({
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
    return t({ isDark: i }), (C, M) => (p(), ee(ke, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis",
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(De, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (p(), k("div", v1, [...M[0] || (M[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", y1, [
              r.value ? (p(), k(ne, { key: 0 }, [
                u("section", x1, [
                  M[2] || (M[2] = u("div", { class: "chart-header" }, [
                    u("h4", { class: "section-title" }, "Passenger Disruption Funnel")
                  ], -1)),
                  u("div", _1, [
                    x.value.nodes.length > 0 && x.value.links.length > 0 ? (p(), ee(Kt, {
                      key: 0,
                      data: x.value,
                      height: "350px",
                      "use-gradient": !1,
                      "node-gap": 24
                    }, null, 8, ["data"])) : (p(), k("div", k1, [...M[1] || (M[1] = [
                      u("p", { class: "empty-chart-text" }, " No processing data available for visualization ", -1)
                    ])]))
                  ])
                ]),
                u("div", w1, [
                  F(ve, {
                    color: "#3b82f6",
                    title: "Total Records",
                    value: T(oe)(c.value.row_count_total)
                  }, null, 8, ["value"]),
                  F(ve, {
                    color: "#8b5cf6",
                    title: "Passengers Affected",
                    value: T(oe)(h.value)
                  }, null, 8, ["value"]),
                  F(ve, {
                    color: "#10b981",
                    title: "Successfully Notified",
                    value: T(oe)(d.value.notification_sent),
                    subvalue: v(d.value.notification_sent, h.value)
                  }, null, 8, ["value", "subvalue"]),
                  F(ve, {
                    color: "#ef4444",
                    title: "Not Notified",
                    value: T(oe)(m.value),
                    subvalue: v(m.value, h.value)
                  }, null, 8, ["value", "subvalue"]),
                  F(ve, {
                    color: "#f59e0b",
                    title: "Main Failure Reason",
                    value: g.value.reason,
                    subvalue: g.value.count > 0 ? `${T(oe)(g.value.count)} cases` : void 0
                  }, null, 8, ["value", "subvalue"])
                ]),
                y.value.length > 0 ? (p(), k("section", C1, [
                  M[3] || (M[3] = u("div", { class: "section-header" }, [
                    u("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
                  ], -1)),
                  u("div", $1, [
                    F(lt, {
                      columns: b,
                      rows: f.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, {
                      "cell-reason": B(({ row: S }) => [
                        u("span", S1, D(S.reason), 1)
                      ]),
                      "cell-count": B(({ row: S }) => [
                        u("span", M1, D(T(oe)(S.count)), 1)
                      ]),
                      "cell-impact": B(({ row: S }) => [
                        u("div", D1, [
                          u("div", {
                            class: "impact-bar",
                            style: Te({ width: S.impactPct + "%" })
                          }, null, 4),
                          u("span", T1, D(S.impactPct) + "%", 1)
                        ])
                      ]),
                      _: 1
                    }, 8, ["rows"])
                  ])
                ])) : z("", !0),
                u("div", A1, [
                  _.value.labels.length > 0 ? (p(), k("section", B1, [
                    M[4] || (M[4] = u("div", { class: "chart-header" }, [
                      u("h4", { class: "section-title" }, "Notification Success Rate by Day")
                    ], -1)),
                    u("div", L1, [
                      F(vt, {
                        data: _.value,
                        options: w.value,
                        theme: a.theme
                      }, null, 8, ["data", "options", "theme"])
                    ])
                  ])) : z("", !0),
                  u("details", P1, [
                    M[5] || (M[5] = u("summary", { class: "system-health-toggle" }, [
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
                      Be(" System Health Details ")
                    ], -1)),
                    u("div", I1, [
                      u("div", R1, [
                        F(ve, {
                          title: "Docs Started",
                          value: T(oe)(c.value.processing_started)
                        }, null, 8, ["value"]),
                        F(ve, {
                          title: "Docs Completed",
                          value: T(oe)(c.value.processing_completed)
                        }, null, 8, ["value"]),
                        F(ve, {
                          title: "Docs Failed",
                          value: T(oe)(c.value.processing_failed)
                        }, null, 8, ["value"]),
                        F(ve, {
                          title: "Processing Started",
                          value: T(oe)(d.value.processing_started)
                        }, null, 8, ["value"]),
                        F(ve, {
                          title: "Processing Success",
                          value: T(oe)(d.value.processing_success)
                        }, null, 8, ["value"]),
                        F(ve, {
                          title: "Notification Failed",
                          value: T(oe)(d.value.notification_failed)
                        }, null, 8, ["value"])
                      ])
                    ])
                  ])
                ])
              ], 64)) : (p(), k("section", F1, [...M[6] || (M[6] = [
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
}), O1 = /* @__PURE__ */ me(E1, [["__scopeId", "data-v-c77ab172"]]), V1 = /* @__PURE__ */ le({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ae(null), s = $(() => oe(n.totalConversations)), o = $(() => T(a.value?.isDark) ?? !1), i = $(() => T(a.value?.changePercent) ?? 0);
    return t({ isDark: o, changePercent: i }), (l, r) => (p(), ee(wt, {
      label: "Total Conversations",
      value: s.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.totalConversations,
      "previous-value": e.previousTotalConversations,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: B(() => [...r[0] || (r[0] = [
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
}), z1 = /* @__PURE__ */ le({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ae(null), s = $(() => `${n.csatP95.toFixed(1)}`), o = $(() => T(a.value?.isDark) ?? !1), i = $(() => T(a.value?.changePercent) ?? 0);
    return t({ isDark: o, changePercent: i }), (l, r) => (p(), ee(wt, {
      label: "CSAT P95",
      value: s.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatP95,
      "previous-value": e.previousCsatP95,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: B(() => [...r[0] || (r[0] = [
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
}), N1 = /* @__PURE__ */ le({
  __name: "CsatPulseCard",
  props: {
    csatPulse: { default: 0 },
    previousCsatPulse: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ae(null), s = $(() => `${n.csatPulse.toFixed(1)}%`), o = $(() => T(a.value?.isDark) ?? !1), i = $(() => T(a.value?.changePercent) ?? 0);
    return t({ isDark: o, changePercent: i }), (l, r) => (p(), ee(wt, {
      label: "CSAT Pulse",
      value: s.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatPulse,
      "previous-value": e.previousCsatPulse,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: B(() => [...r[0] || (r[0] = [
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
}), W1 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, H1 = { key: "content" }, j1 = {
  key: 0,
  class: "card-body"
}, Y1 = { class: "chart-wrapper" }, K1 = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, U1 = {
  key: 1,
  class: "empty-state"
}, q1 = 520, X1 = 300, G1 = 40, Z1 = 48, Q1 = 48, J1 = {
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
    const a = n, s = (r) => {
      a("export", r);
    }, o = e, { isDark: i } = Ce(we(o, "theme")), l = $(() => o.data);
    return t({ isDark: i }), (r, c) => (p(), ee(ke, {
      class: "nps-overview-root min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !o.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(De, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            o.loading ? (p(), k("div", W1, [...c[0] || (c[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", H1, [
              l.value && l.value.total_nps_responses > 0 ? (p(), k("div", j1, [
                u("div", Y1, [
                  F(Qi, {
                    histogram: l.value.histogram || [],
                    "min-score": l.value.min_score || 0,
                    "max-score": l.value.max_score || 0,
                    "q1-score": l.value.q1_score || 0,
                    "median-score": l.value.median_score || 0,
                    "q3-score": l.value.q3_score || 0,
                    "average-score": l.value.average_score || 0,
                    "chart-width": q1,
                    "chart-height": X1,
                    "chart-margin": G1,
                    "chart-margin-right": Z1,
                    "chart-bottom-margin": Q1,
                    "plot-inset": 10,
                    "show-legend": !1,
                    "show-stat-labels": !1
                  }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score"])
                ]),
                u("div", K1, [
                  F(ve, {
                    class: "min-w-0 flex-1",
                    title: "Responses",
                    value: String(l.value.total_nps_responses)
                  }, null, 8, ["value"]),
                  l.value.p95_score > 0 ? (p(), ee(ve, {
                    key: 0,
                    class: "min-w-0 flex-1",
                    title: "Percentile 95",
                    value: String(l.value.p95_score)
                  }, null, 8, ["value"])) : z("", !0)
                ])
              ])) : (p(), k("div", U1, [...c[1] || (c[1] = [
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
}, cl = /* @__PURE__ */ me(J1, [["__scopeId", "data-v-3a3f4c10"]]), ex = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, tx = { key: "content" }, nx = {
  key: 0,
  class: "card-body"
}, ax = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, sx = {
  key: 1,
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
  setup(e, { emit: t }) {
    const n = t, a = (c) => {
      n("export", c);
    }, s = e, o = $(() => s.data?.csat_p95_by_day || []), i = $(() => o.value.length > 0), l = $(() => ({
      labels: o.value.map((c) => je(c.date).format("DD-MM-YYYY")),
      datasets: [
        {
          label: "CSAT P95",
          data: o.value.map((c) => Number(c.p95_score || 0)),
          borderColor: "#7C3AED",
          pointBorderColor: "#7C3AED",
          pointBackgroundColor: "#FFFFFF",
          tension: 0.25,
          clip: !1
        }
      ]
    })), r = {
      scales: {
        y: {
          min: 0,
          max: 10,
          grace: 1,
          ticks: {
            stepSize: 1,
            callback: (c) => {
              const d = Number(c);
              return !Number.isInteger(d) || d < 0 || d > 10 ? "" : String(d);
            }
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
    return (c, d) => (p(), ee(ke, {
      class: "nps-daily-root min-h-0",
      title: "CSAT P95",
      subtitle: "Daily P95 trend for CSAT responses",
      collapsible: !1,
      loading: s.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !s.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(De, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            s.loading ? (p(), k("div", ex, [...d[0] || (d[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", tx, [
              i.value ? (p(), k("div", nx, [
                u("div", ax, [
                  F(vt, {
                    data: l.value,
                    options: r,
                    "uppercase-legend-labels": !0
                  }, null, 8, ["data"])
                ])
              ])) : (p(), k("div", sx, [...d[1] || (d[1] = [
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
}, dl = /* @__PURE__ */ me(ox, [["__scopeId", "data-v-cd8c9258"]]), ix = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, lx = { key: "content" }, rx = {
  key: 0,
  class: "card-body"
}, cx = {
  key: 1,
  class: "empty-state"
}, dx = /* @__PURE__ */ le({
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
    const t = e, n = $(
      () => t.data?.resolution_breakdown || []
    ), a = $(
      () => n.value.some((i) => Number(i.count || 0) > 0)
    ), s = $(() => {
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
    }), o = {
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
    return (i, l) => (p(), ee(ke, {
      class: "nps-resolution-root min-h-0",
      title: "CSAT Resolution",
      subtitle: "Resolution answers distribution (1=Si, 2=No)",
      collapsible: !1,
      loading: t.loading
    }, {
      default: B(() => [
        F(De, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            t.loading ? (p(), k("div", ix, [...l[0] || (l[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", lx, [
              a.value ? (p(), k("div", rx, [
                F($t, {
                  data: s.value,
                  options: o,
                  "uppercase-legend-labels": !0
                }, null, 8, ["data"])
              ])) : (p(), k("div", cx, [...l[1] || (l[1] = [
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
}), ux = /* @__PURE__ */ me(dx, [["__scopeId", "data-v-f99eebba"]]), hx = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, fx = { key: "content" }, gx = {
  key: 0,
  class: "card-body"
}, mx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, px = {
  key: 1,
  class: "empty-state"
}, bx = /* @__PURE__ */ le({
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
    const t = e, n = $(() => t.data?.csat_pulse_by_day || []), a = $(() => n.value.length > 0), s = $(() => ({
      labels: n.value.map((i) => i.date || ""),
      datasets: [
        {
          label: "CSAT Pulse",
          data: n.value.map((i) => Number(i.csat_pulse || 0)),
          borderColor: "#7C3AED",
          pointBorderColor: "#7C3AED",
          pointBackgroundColor: "#FFFFFF",
          tension: 0.25
        }
      ]
    })), o = {
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
    return (i, l) => (p(), ee(ke, {
      class: "nps-pulse-root min-h-0",
      title: "CSAT Pulse",
      subtitle: "Weighted index: Σ(frequency × weight) / total surveys × 100",
      collapsible: !1,
      loading: t.loading
    }, {
      default: B(() => [
        F(De, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            t.loading ? (p(), k("div", hx, [...l[0] || (l[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", fx, [
              a.value ? (p(), k("div", gx, [
                u("div", mx, [
                  F(vt, {
                    data: s.value,
                    options: o,
                    "uppercase-legend-labels": !0
                  }, null, 8, ["data"])
                ])
              ])) : (p(), k("div", px, [...l[1] || (l[1] = [
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
}), vx = /* @__PURE__ */ me(bx, [["__scopeId", "data-v-c1c76b84"]]), yx = { class: "nps-metrics-container flex flex-col gap-6 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, xx = { class: "grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2" }, ul = {
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
    const n = t, a = (d) => {
      n("export", d);
    }, s = e, o = $(() => s.showResolutionChart), i = $(() => s.showCsatPulseChart), l = $(
      () => (o.value ? 1 : 0) + (i.value ? 1 : 0)
    ), r = $(() => l.value > 0), c = $(
      () => l.value > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
    );
    return (d, h) => (p(), k("div", yx, [
      u("div", xx, [
        F(cl, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: a
        }, null, 8, ["data", "loading", "enable-export"]),
        F(dl, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: a
        }, null, 8, ["data", "loading", "enable-export"])
      ]),
      r.value ? (p(), k("div", {
        key: 0,
        class: J(["grid w-full items-start gap-6", c.value])
      }, [
        o.value ? (p(), ee(ux, {
          key: 0,
          class: "min-w-0",
          data: e.data,
          loading: e.loading
        }, null, 8, ["data", "loading"])) : z("", !0),
        i.value ? (p(), ee(vx, {
          key: 1,
          class: "min-w-0",
          data: e.data,
          loading: e.loading
        }, null, 8, ["data", "loading"])) : z("", !0)
      ], 2)) : z("", !0)
    ]));
  }
}, _x = { class: "csat-container__body" }, kx = /* @__PURE__ */ le({
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
    function a(s) {
      n("export", { source: "npsMetrics", format: s });
    }
    return (s, o) => (p(), ee(ke, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading
    }, {
      default: B(() => [
        u("div", _x, [
          F(ul, {
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
}), wx = /* @__PURE__ */ me(kx, [["__scopeId", "data-v-71605c0e"]]), Cx = /* @__PURE__ */ le({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ae(null), s = $(() => Rt(n.totalRevenue)), o = $(() => T(a.value?.isDark) ?? !1), i = $(() => T(a.value?.changePercent) ?? 0);
    return t({ isDark: o, changePercent: i }), (l, r) => (p(), ee(wt, {
      label: "AI Revenue",
      value: s.value,
      prefix: e.currencyCode,
      "value-size": "large",
      loading: e.loading,
      theme: e.theme,
      "current-value": e.totalRevenue,
      "previous-value": e.previousTotalRevenue,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: B(() => [...r[0] || (r[0] = [
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
}), $x = { class: "flex justify-end" }, Sx = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Mx = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, Dx = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Tx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Ax = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5" }, Bx = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Lx = /* @__PURE__ */ le({
  __name: "HumanEscalations",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = we(a, "theme"), { isDark: i } = Ce(o), l = ae(a.breakdownBy), r = $(() => a.data ?? {
      total_conversations: 0,
      total_escalated_conversations: 0,
      escalation_rate_percentage: 0,
      breakdown_by: "all",
      breakdown_items: [],
      breakdown_by_day: [],
      escalations_by_day: []
    }), c = ae({
      labels: [],
      datasets: []
    }), d = ae([]), h = ae(
      []
    ), m = [
      "#3b82f6",
      "#f59e0b",
      "#06b6d4",
      "#8b5cf6",
      "#22c55e",
      "#ef4444",
      "#14b8a6"
    ], v = (x) => m[x % m.length], g = {
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 25,
            callback: (x) => `${x}%`
          }
        }
      }
    }, y = () => {
      s("changeBreakdown", l.value);
    }, b = (x) => {
      if (!x) return "";
      const w = x.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return w ? w.charAt(0).toUpperCase() + w.slice(1) : "";
    }, f = (x) => {
      if (l.value === "all") {
        const V = x?.escalations_by_day ?? [];
        if (!V.length) {
          c.value = { labels: [], datasets: [] }, d.value = [], h.value = [];
          return;
        }
        const E = [...V].sort((A, L) => A.date.localeCompare(L.date));
        c.value = {
          labels: E.map((A) => je(A.date).format("MMM DD")),
          datasets: [
            {
              label: "All",
              data: E.map(
                (A) => Number(A.escalation_rate_percentage || 0)
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
      const _ = x?.breakdown_by_day ?? [], w = x?.breakdown_items ?? [];
      if (!_.length) {
        c.value = { labels: [], datasets: [] }, d.value = [], h.value = [];
        return;
      }
      const C = [..._].sort(
        (V, E) => V.date.localeCompare(E.date)
      ), M = w.slice(0, 5).map((V) => V.key), S = C.map((V) => je(V.date).format("MMM DD")), R = M.map((V, E) => {
        const A = w.find((L) => L.key === V);
        return {
          label: b(A?.label || V),
          data: C.map((L) => {
            const O = L.items.find((q) => q.key === V);
            return Number(O?.percentage || 0);
          }),
          borderColor: v(E),
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      c.value = {
        labels: S,
        datasets: R
      }, d.value = w.slice(0, 5).map((V, E) => ({
        key: V.key,
        label: b(V.label),
        percentage: Number(V.percentage || 0),
        color: v(E)
      })), h.value = w.slice(0, 5).map((V, E) => ({
        key: V.key,
        label: b(V.label),
        color: v(E)
      }));
    };
    return Oe(
      () => a.data,
      (x) => {
        f(x ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Oe(
      () => a.breakdownBy,
      (x) => {
        l.value = x, f(r.value);
      }
    ), t({ isDark: i }), (x, _) => (p(), ee(ke, {
      class: "w-full min-h-0 self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerAside: B(() => [
        u("div", $x, [
          ct(u("select", {
            "onUpdate:modelValue": _[0] || (_[0] = (w) => l.value = w),
            class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: y
          }, [..._[1] || (_[1] = [
            u("option", { value: "all" }, "All", -1),
            u("option", { value: "agent" }, "By Agent", -1),
            u("option", { value: "channel" }, "By Channel", -1),
            u("option", { value: "agent_channel" }, "By Agent/Channel", -1)
          ])], 544), [
            [_l, l.value]
          ])
        ])
      ]),
      default: B(() => [
        u("div", {
          class: J(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          F(De, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: B(() => [
              a.loading ? (p(), k("div", Sx, [..._[2] || (_[2] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (p(), k("div", Mx, [
                c.value.labels && c.value.labels.length && c.value.datasets.length ? (p(), k("section", Dx, [
                  u("div", Tx, [
                    F(vt, {
                      data: c.value,
                      options: g,
                      theme: o.value
                    }, null, 8, ["data", "theme"])
                  ]),
                  u("div", Ax, [
                    (p(!0), k(ne, null, fe(d.value, (w) => (p(), ee(ve, {
                      key: `card-${w.key}`,
                      class: "min-w-0",
                      color: w.color,
                      title: w.label,
                      value: `${w.percentage.toFixed(1)}%`
                    }, null, 8, ["color", "title", "value"]))), 128))
                  ])
                ])) : (p(), k("section", Bx, [..._[3] || (_[3] = [
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
}), Px = /* @__PURE__ */ me(Lx, [["__scopeId", "data-v-126665b7"]]), Ix = /* @__PURE__ */ le({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ae(null), s = $(() => `${Number(n.escalationRatePercentage || 0).toFixed(2)}%`), o = $(() => T(a.value?.isDark) ?? !1), i = $(() => T(a.value?.changePercent) ?? 0);
    return t({ isDark: o, changePercent: i }), (l, r) => (p(), ee(wt, {
      label: "Human Escalations",
      value: s.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.escalationRatePercentage,
      "previous-value": e.previousEscalationRatePercentage,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: B(() => [...r[0] || (r[0] = [
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
}), Rx = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Fx = {
  key: 0,
  class: "flex min-h-[320px] flex-col items-center justify-center px-4"
}, Ex = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, Ox = {
  key: 1,
  class: "flex w-full shrink-0 flex-col min-h-0"
}, Vx = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, zx = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, Nx = {
  key: 2,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, Wx = { class: "max-w-[360px] text-center" }, Hx = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, jx = {
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
    const t = e, { isDark: n, colors: a } = Ce(we(t, "theme")), s = [30, 50, 70, 50, 40], o = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], i = $(() => {
      const c = t.data ?? {}, d = c.daily, h = c.days, m = Array.isArray(d) && d.length > 0, v = Array.isArray(h) && h.length > 0 && Array.isArray(c.allocatedCostSeries) && c.allocatedCostSeries.length === h.length;
      let g = [];
      return m ? g = d : v && (g = h.map((y, b) => ({
        date: y,
        allocated_cost: c.allocatedCostSeries[b] ?? 0,
        aws_cost: c.awsCostSeries[b] ?? 0,
        airline_conversations: c.airlineConversationsSeries[b] ?? 0
      }))), {
        daily: g,
        total_allocated_cost: c.total_allocated_cost ?? c.totalAllocated ?? 0,
        total_cost: c.total_cost ?? c.total ?? 0,
        total_conversations: c.total_conversations ?? c.totalConversations ?? 0,
        total_airline_conversations: c.total_airline_conversations ?? c.totalAirlineConversations ?? 0,
        airline_name: c.airline_name
      };
    }), l = $(() => {
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
    }), r = $(() => ({
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
              return c.dataset.yAxisID === "y" ? d + Pe(h) : d + String(h);
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
            callback: (c) => Pe(c)
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
    return (c, d) => (p(), ee(ke, {
      title: i.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", Rx, [
          e.loading ? (p(), k("div", Fx, [
            u("div", Ex, [
              (p(), k(ne, null, fe(s, (h, m) => u("div", {
                key: m,
                class: J(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", o[m]]),
                style: Te({ height: `${h}%` })
              }, null, 6)), 64))
            ]),
            d[0] || (d[0] = u("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading chart data... ", -1))
          ])) : i.value.daily.length > 0 ? (p(), k("div", Ox, [
            u("div", Vx, [
              F(vt, {
                class: "h-full min-h-0 w-full",
                data: l.value,
                options: r.value
              }, null, 8, ["data", "options"])
            ]),
            u("div", zx, [
              F(ve, {
                color: T(a).primaryLight,
                title: "Total Allocated",
                value: T(Pe)(i.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              F(ve, {
                color: "#FF9900",
                title: "Total AWS",
                value: T(Pe)(i.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (p(), k("section", Nx, [
            u("div", Wx, [
              u("div", Hx, [
                F(T(nt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}, $n = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Qo = 10, e_ = /* @__PURE__ */ le({
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
    const a = e, { isDark: s, colors: o } = Ce(we(a, "theme")), i = (g) => {
      const y = new Date(g), b = String(y.getDate()).padStart(2, "0"), f = String(y.getMonth() + 1).padStart(2, "0");
      return `${b}-${f}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, r = $(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((y, b) => y + (b.input_cost || 0), 0);
    }), c = $(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((y, b) => y + (b.output_cost || 0), 0);
    }), d = $(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((y, b) => y + (b.cache_read_cost || 0), 0);
    }), h = $(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((y, b) => y + (b.cache_write_cost || 0), 0);
    }), m = $(() => {
      const g = a.data?.costs_by_day || {}, y = Object.keys(g).sort();
      if (y.length === 0)
        return { labels: [], datasets: [] };
      const b = y.map((x) => i(x)), f = [
        {
          label: "Input Cost",
          data: y.map((x) => g[x]?.input_cost || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: y.map((x) => g[x]?.output_cost || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: y.map((x) => g[x]?.cache_read_cost || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: y.map((x) => g[x]?.cache_write_cost || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: b,
        datasets: f
      };
    }), v = $(() => a.options ? a.options : {
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
              family: $n,
              size: 13,
              weight: "500"
            },
            color: o.value.textSecondary,
            padding: 12,
            boxWidth: Qo,
            boxHeight: Qo,
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
            family: $n,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: $n,
            size: 12,
            weight: "500"
          },
          callbacks: {
            label: function(g) {
              let y = g.dataset.label || "";
              return y && (y += ": "), g.parsed.y !== null && (y += Pe(g.parsed.y)), y;
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
            font: { family: $n, size: 12, weight: "500" },
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
            font: { family: $n, size: 12, weight: "500" },
            color: o.value.textSecondary,
            padding: 8,
            callback: function(g) {
              return Pe(g);
            }
          }
        }
      }
    });
    return t({ isDark: s }), (g, y) => (p(), ee(ke, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", Yx, [
          e.loading ? (p(), k("div", Jx, [...y[2] || (y[2] = [
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
          ])])) : (p(), k("div", Kx, [
            m.value.labels && m.value.labels.length ? (p(), k("section", Ux, [
              u("div", qx, [
                F($t, {
                  data: m.value,
                  options: v.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", Xx, [
                F(ve, {
                  title: "Total Cost",
                  value: T(Pe)(e.data.total_cost)
                }, null, 8, ["value"]),
                F(ve, {
                  title: "Input Cost",
                  value: T(Pe)(r.value),
                  color: l.input
                }, null, 8, ["value", "color"]),
                F(ve, {
                  title: "Output Cost",
                  value: T(Pe)(c.value),
                  color: l.output
                }, null, 8, ["value", "color"]),
                F(ve, {
                  title: "Cache Read",
                  value: T(Pe)(d.value),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                F(ve, {
                  title: "Cache Write",
                  value: T(Pe)(h.value),
                  color: l.cache_write
                }, null, 8, ["value", "color"]),
                F(ve, {
                  title: "Avg / Conv.",
                  value: T(Pe)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (p(), k("section", Gx, [
              u("div", Zx, [
                u("div", Qx, [
                  F(T(nt), { class: "empty-icon" })
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
}), t_ = /* @__PURE__ */ me(e_, [["__scopeId", "data-v-39a5448c"]]), n_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, a_ = {
  key: 0,
  class: "card-body"
}, s_ = {
  key: 0,
  class: "chart-section"
}, o_ = { class: "chart-container" }, i_ = { class: "mt-auto flex w-full min-w-0 flex-nowrap items-stretch gap-2 sm:gap-3" }, l_ = {
  key: 1,
  class: "empty-state"
}, r_ = { class: "empty-state-content" }, c_ = { class: "empty-icon-wrapper" }, d_ = {
  key: 1,
  class: "loading-state"
}, Sn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Jo = 10, u_ = /* @__PURE__ */ le({
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
    const a = e, { isDark: s, colors: o } = Ce(we(a, "theme")), i = (d) => {
      const h = new Date(d), m = String(h.getDate()).padStart(2, "0"), v = String(h.getMonth() + 1).padStart(2, "0");
      return `${m}-${v}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, r = $(() => {
      const d = a.data?.tokens_by_day || {}, h = Object.keys(d).sort();
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const m = h.map((g) => i(g)), v = [
        {
          label: "Input Tokens",
          data: h.map((g) => d[g]?.input_tokens || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: h.map((g) => d[g]?.output_tokens || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: h.map((g) => d[g]?.cache_read_tokens || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: h.map((g) => d[g]?.cache_write_tokens || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: m,
        datasets: v
      };
    }), c = $(() => a.options ? a.options : {
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
              family: Sn,
              size: 13,
              weight: "500"
            },
            color: o.value.textSecondary,
            padding: 12,
            boxWidth: Jo,
            boxHeight: Jo,
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
            family: Sn,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: Sn,
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
            font: { family: Sn, size: 12, weight: "500" },
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
            font: { family: Sn, size: 12, weight: "500" },
            color: o.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: s }), (d, h) => (p(), ee(ke, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", n_, [
          e.loading ? (p(), k("div", d_, [...h[2] || (h[2] = [
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
          ])])) : (p(), k("div", a_, [
            r.value.labels && r.value.labels.length ? (p(), k("section", s_, [
              u("div", o_, [
                F($t, {
                  data: r.value,
                  options: c.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", i_, [
                F(ve, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: T(oe)(e.data.total_tokens)
                }, null, 8, ["value"]),
                F(ve, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: T(oe)(e.data.total_input_tokens),
                  color: l.input
                }, null, 8, ["value", "color"]),
                F(ve, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: T(oe)(e.data.total_output_tokens),
                  color: l.output
                }, null, 8, ["value", "color"]),
                F(ve, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: T(oe)(e.data.total_cache_read_tokens),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                F(ve, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: T(oe)(e.data.total_cache_write_tokens),
                  color: l.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (p(), k("section", l_, [
              u("div", r_, [
                u("div", c_, [
                  F(T(nt), { class: "empty-icon" })
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
}), h_ = /* @__PURE__ */ me(u_, [["__scopeId", "data-v-70c6f3c7"]]), f_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, g_ = {
  key: 0,
  class: "card-body"
}, m_ = {
  key: 0,
  class: "chart-section"
}, p_ = { class: "chart-container" }, b_ = { class: "mt-4 w-full min-w-0" }, v_ = {
  key: 1,
  class: "empty-state"
}, y_ = { class: "empty-state-content" }, x_ = { class: "empty-icon-wrapper" }, __ = {
  key: 1,
  class: "loading-state"
}, k_ = /* @__PURE__ */ le({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = Ce(we(n, "theme")), o = (c) => {
      const d = new Date(c), h = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = $(
      () => oe(n.data?.total_conversations ?? 0)
    ), l = $(() => {
      const c = n.data?.conversations_by_day || {}, d = Object.keys(c).sort();
      if (d.length === 0)
        return { labels: [], datasets: [] };
      const h = d.map((v) => o(v)), m = [
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
        datasets: m
      };
    }), r = $(() => n.options ? n.options : {
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
              let d = c.dataset.label || "";
              return d && (d += ": "), c.parsed.y !== null && (d += c.parsed.y), d;
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
    return t({ isDark: a }), (c, d) => (p(), ee(ke, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", f_, [
          e.loading ? (p(), k("div", __, [...d[2] || (d[2] = [
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
          ])])) : (p(), k("div", g_, [
            l.value.labels && l.value.labels.length ? (p(), k("section", m_, [
              u("div", p_, [
                F(vt, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ]),
              u("div", b_, [
                F(ve, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (p(), k("section", v_, [
              u("div", y_, [
                u("div", x_, [
                  F(T(nt), { class: "empty-icon" })
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
}), w_ = /* @__PURE__ */ me(k_, [["__scopeId", "data-v-b33e8627"]]), C_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, $_ = {
  key: 0,
  class: "card-body"
}, S_ = {
  key: 0,
  class: "charts-grid"
}, M_ = { class: "chart-section" }, D_ = { class: "chart-container" }, T_ = { class: "chart-section" }, A_ = { class: "chart-container" }, B_ = {
  key: 1,
  class: "empty-state"
}, L_ = { class: "empty-state-content" }, P_ = { class: "empty-icon-wrapper" }, I_ = {
  key: 1,
  class: "loading-state"
}, R_ = /* @__PURE__ */ le({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = Ce(we(n, "theme")), o = $(() => n.data?.top_agents && n.data.top_agents.length > 0), i = $(() => n.data?.top_agents ? [...n.data.top_agents].sort((m, v) => (v.total_cost || 0) - (m.total_cost || 0)) : []), l = $(() => n.data?.top_agents ? [...n.data.top_agents].sort((m, v) => (v.total_tokens || 0) - (m.total_tokens || 0)) : []), r = $(() => {
      const m = i.value;
      return m.length === 0 ? { labels: [], datasets: [] } : {
        labels: m.map((v) => v.agent_type),
        datasets: [
          {
            label: "Total Cost",
            data: m.map((v) => v.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), c = $(() => {
      const m = l.value;
      return m.length === 0 ? { labels: [], datasets: [] } : {
        labels: m.map((v) => v.agent_type),
        datasets: [
          {
            label: "Total Tokens",
            data: m.map((v) => v.total_tokens || 0),
            backgroundColor: "#f59e0b80",
            borderColor: "#f59e0b",
            borderWidth: 1
          }
        ]
      };
    }), d = $(() => n.options ? n.options : {
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
            title: function(m) {
              return m[0]?.label || "";
            },
            label: function(m) {
              const v = m.label, g = n.data?.top_agents?.find((y) => y.agent_type === v);
              return g ? [
                `Total Cost: ${Pe(g.total_cost)}`,
                `Input Cost: ${Pe(g.total_input_tokens_cost)}`,
                `Output Cost: ${Pe(g.total_output_tokens_cost)}`,
                `Cache Read: ${Pe(g.total_read_tokens_cost)}`,
                `Cache Write: ${Pe(g.total_write_tokens_cost)}`
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
            callback: function(m) {
              return Pe(m);
            }
          }
        }
      }
    }), h = $(() => n.options ? n.options : {
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
            title: function(m) {
              return m[0]?.label || "";
            },
            label: function(m) {
              const v = m.label, g = n.data?.top_agents?.find((y) => y.agent_type === v);
              return g ? [
                `Total Tokens: ${g.total_tokens.toLocaleString()}`,
                `Input Tokens: ${g.total_input_tokens.toLocaleString()}`,
                `Output Tokens: ${g.total_output_tokens.toLocaleString()}`,
                `Cache Read: ${g.total_read_tokens.toLocaleString()}`,
                `Cache Write: ${g.total_write_tokens.toLocaleString()}`
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
            callback: function(m) {
              return m.toLocaleString();
            }
          }
        }
      }
    });
    return t({ isDark: a }), (m, v) => (p(), ee(ke, {
      class: "h-full min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", C_, [
          e.loading ? (p(), k("div", I_, [...v[4] || (v[4] = [
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
          ])])) : (p(), k("div", $_, [
            o.value ? (p(), k("div", S_, [
              u("section", M_, [
                v[0] || (v[0] = u("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                u("div", D_, [
                  F($t, {
                    data: r.value,
                    options: d.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              u("section", T_, [
                v[1] || (v[1] = u("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                u("div", A_, [
                  F($t, {
                    data: c.value,
                    options: h.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (p(), k("section", B_, [
              u("div", L_, [
                u("div", P_, [
                  F(T(nt), { class: "empty-icon" })
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
}), F_ = /* @__PURE__ */ me(R_, [["__scopeId", "data-v-a5014772"]]), E_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, O_ = {
  key: 0,
  class: "card-body"
}, V_ = {
  key: 0,
  class: "chart-section"
}, z_ = { class: "chart-container" }, N_ = {
  key: 1,
  class: "empty-state"
}, W_ = { class: "empty-state-content" }, H_ = { class: "empty-icon-wrapper" }, j_ = {
  key: 1,
  class: "loading-state"
}, Y_ = /* @__PURE__ */ le({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = Ce(we(n, "theme")), o = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, i = $(() => n.data?.top_agents ? n.data.top_agents.filter(
      (h) => h.agent_type?.toLowerCase() !== "triage"
    ) : []), l = $(() => i.value.length > 0), r = $(() => i.value.reduce((h, m) => h + (m.conversations || 0), 0)), c = $(() => {
      const h = i.value;
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const m = h.map((y) => {
        const b = y.agent_type?.toLowerCase();
        return (o[b] || "#a78bfa") + "80";
      }), v = h.map((y) => {
        const b = y.agent_type?.toLowerCase();
        return o[b] || "#a78bfa";
      });
      return {
        labels: h.map((y) => {
          const b = y.conversations || 0, f = r.value ? b / r.value * 100 : 0;
          return `${y.agent_type} - ${b.toLocaleString()} (${f.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((y) => y.conversations || 0),
            backgroundColor: m,
            borderColor: v,
            borderWidth: 2
          }
        ]
      };
    }), d = $(() => n.options ? n.options : {
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
              const m = (h.label || "").toString(), v = Number(h.parsed) || 0, g = (h.dataset.data || []).reduce((b, f) => b + (Number(f) || 0), 0), y = g ? v / g * 100 : 0;
              return `${m}: ${v.toLocaleString()} (${y.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: a }), (h, m) => (p(), ee(ke, {
      class: "h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", E_, [
          e.loading ? (p(), k("div", j_, [...m[2] || (m[2] = [
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
          ])])) : (p(), k("div", O_, [
            l.value ? (p(), k("section", V_, [
              u("div", z_, [
                F(Ma, {
                  data: c.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (p(), k("section", N_, [
              u("div", W_, [
                u("div", H_, [
                  F(T(nt), { class: "empty-icon" })
                ]),
                m[0] || (m[0] = u("p", { class: "empty-title" }, "No top agents data", -1)),
                m[1] || (m[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), K_ = /* @__PURE__ */ me(Y_, [["__scopeId", "data-v-14445b91"]]), U_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, q_ = {
  key: 0,
  class: "card-body"
}, X_ = {
  key: 0,
  class: "chart-section"
}, G_ = { class: "chart-container" }, Z_ = {
  key: 1,
  class: "empty-state"
}, Q_ = { class: "empty-state-content" }, J_ = { class: "empty-icon-wrapper" }, ek = {
  key: 1,
  class: "loading-state"
}, tk = /* @__PURE__ */ le({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = Ce(we(n, "theme")), o = (c) => {
      const d = new Date(c), h = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = $(() => {
      const c = n.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(c) && c.length > 0)
        return !0;
      const d = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {};
      return Object.keys(d).length > 0 && Object.keys(h).length > 0;
    }), l = $(() => {
      const c = n.costData?.daily_mean_cost_per_conversation || [];
      if (c.length > 0) {
        const b = [...c].sort((f, x) => f.date.localeCompare(x.date));
        return {
          labels: b.map((f) => o(f.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: b.map((f) => Number(f.value) || 0),
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
      const d = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {}, v = Object.keys(d).filter((b) => h[b]).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const g = v.map((b) => o(b)), y = v.map((b) => {
        const f = d[b]?.total_cost || 0, x = h[b] || 0;
        return x > 0 ? f / x : 0;
      });
      return {
        labels: g,
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
    }), r = $(() => n.options ? n.options : {
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
              let d = c.dataset.label || "";
              return d && (d += ": "), c.parsed.y !== null && (d += Pe(c.parsed.y)), d;
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
              return Pe(c);
            }
          }
        }
      }
    });
    return t({ isDark: a }), (c, d) => (p(), ee(ke, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", U_, [
          e.loading ? (p(), k("div", ek, [...d[2] || (d[2] = [
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
          ])])) : (p(), k("div", q_, [
            i.value ? (p(), k("section", X_, [
              u("div", G_, [
                F(vt, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (p(), k("section", Z_, [
              u("div", Q_, [
                u("div", J_, [
                  F(T(nt), { class: "empty-icon" })
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
}), nk = /* @__PURE__ */ me(tk, [["__scopeId", "data-v-1e8204ea"]]), ak = { class: "tabs text-sm" }, sk = ["aria-label"], ok = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], ik = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, lk = /* @__PURE__ */ le({
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
    const n = e, a = t, s = ae([]), o = `tabs-${Ue()}`, i = (g) => `${o}-tab-${g}`, l = $(
      () => n.items.map((g, y) => g.disabled ? -1 : y).filter((g) => g >= 0)
    );
    function r(g) {
      return g.value === n.modelValue;
    }
    function c(g) {
      const y = r(g), f = `${n.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-8 max-h-8 min-h-8 items-stretch cursor-pointer rounded-lg border border-transparent text-center outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return g.disabled ? `${f} cursor-not-allowed opacity-40` : y ? `${f} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${f} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function d(g, y) {
      g === y || n.items.find((f) => f.value === g)?.disabled || (a("update:modelValue", g), a("change", { value: g, previousValue: y }));
    }
    function h(g, y) {
      a("tab-click", { value: g.value, originalEvent: y }), !g.disabled && (d(g.value, n.modelValue), He(() => {
        s.value[n.items.indexOf(g)]?.focus();
      }));
    }
    function m(g, y) {
      const b = n.items.length;
      if (b === 0) return 0;
      let f = g;
      for (let x = 0; x < b; x++)
        if (f = (f + y + b) % b, !n.items[f]?.disabled) return f;
      return g;
    }
    async function v(g, y) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(g.key)) return;
      g.preventDefault();
      let f = y;
      g.key === "ArrowLeft" ? f = m(y, -1) : g.key === "ArrowRight" ? f = m(y, 1) : g.key === "Home" ? f = l.value[0] ?? 0 : g.key === "End" && (f = l.value[l.value.length - 1] ?? y);
      const x = n.items[f];
      !x || x.disabled || (d(x.value, n.modelValue), await He(), s.value[f]?.focus());
    }
    return (g, y) => (p(), k("div", ak, [
      u("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: J([
          "box-border h-10 max-h-10 min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 px-0.5 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (p(!0), k(ne, null, fe(e.items, (b, f) => (p(), k("button", {
          id: i(b.value),
          key: b.value,
          ref_for: !0,
          ref_key: "tabRefs",
          ref: s,
          type: "button",
          role: "tab",
          "aria-selected": r(b),
          "aria-disabled": b.disabled === !0,
          tabindex: r(b) ? 0 : -1,
          class: J(c(b)),
          onClick: (x) => h(b, x),
          onKeydown: (x) => v(x, f)
        }, [
          u("span", {
            class: J(["tabs-tab__label flex min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            b.icon ? (p(), ee(tn(b.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : z("", !0),
            u("span", ik, D(b.label), 1)
          ], 2)
        ], 42, ok))), 128))
      ], 10, sk),
      g.$slots.default ? (p(), ee(De, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: B(() => [
          (p(), k("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            $e(g.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : z("", !0)
    ]));
  }
}), hl = /* @__PURE__ */ me(lk, [["__scopeId", "data-v-f9c367eb"]]), rk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, ck = {
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
}, gk = { class: "empty-state-content" }, mk = { class: "empty-icon-wrapper" }, pk = /* @__PURE__ */ le({
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
    const a = e, s = n, o = (g) => {
      s("export", g);
    }, { isDark: i } = Ce(we(a, "theme")), l = [
      { value: "by_model", label: "Model" },
      { value: "by_provider", label: "Provider" }
    ], r = ae("by_model"), c = $(() => r.value === "by_model" ? a.data?.total_by_model || {} : a.data?.total_by_provider || {}), d = $(() => [
      { key: "name", label: r.value === "by_model" ? "Model" : "Provider", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ]), h = $(
      () => Object.entries(c.value).map(([g, y]) => ({
        id: g,
        name: g,
        avgCost: v(y.avg_cost_per_message),
        avgTokens: m(y.avg_tokens_per_message),
        messageCount: m(y.message_count),
        totalCost: v(y.total_cost),
        totalTokens: m(y.total_tokens)
      }))
    ), m = (g) => g == null ? "0" : oe(g), v = (g) => g == null ? "$0.00" : Pe(g);
    return t({ isDark: i }), (g, y) => (p(), ee(ke, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        u("div", rk, [
          e.loading ? (p(), k("div", ck, [...y[1] || (y[1] = [
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
          ])])) : (p(), k("div", dk, [
            F(hl, {
              modelValue: r.value,
              "onUpdate:modelValue": y[0] || (y[0] = (b) => r.value = b),
              items: l,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: B(() => [
                c.value && Object.keys(c.value).length > 0 ? (p(), k("div", uk, [
                  u("div", hk, [
                    F(lt, {
                      columns: d.value,
                      rows: h.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (p(), k("div", fk, [
                  u("div", gk, [
                    u("div", mk, [
                      F(T(nt), { class: "empty-icon" })
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
}), bk = /* @__PURE__ */ me(pk, [["__scopeId", "data-v-0c23d620"]]), vk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, yk = {
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
}, Ck = { class: "empty-state-content" }, $k = { class: "empty-icon-wrapper" }, Sk = /* @__PURE__ */ le({
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
    const a = e, s = n, o = (y) => {
      s("export", y);
    }, { isDark: i } = Ce(we(a, "theme")), l = ["assistant", "system", "user"], r = [
      { key: "role", label: "Role", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ], c = $(() => a.data?.total_by_role || {}), d = $(
      () => l.map((y) => ({
        id: y,
        role: g(y),
        avgCost: v(c.value[y]?.avg_cost_per_message),
        avgTokens: m(c.value[y]?.avg_tokens_per_message),
        messageCount: m(c.value[y]?.message_count),
        totalCost: v(c.value[y]?.total_cost),
        totalTokens: m(c.value[y]?.total_tokens)
      }))
    ), h = $(() => Object.keys(c.value).length > 0), m = (y) => y == null ? "0" : oe(y), v = (y) => y == null ? "$0.00" : Pe(y), g = (y) => y.charAt(0).toUpperCase() + y.slice(1);
    return t({ isDark: i }), (y, b) => (p(), ee(ke, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        u("div", vk, [
          e.loading ? (p(), k("div", yk, [...b[0] || (b[0] = [
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
          ])])) : (p(), k("div", xk, [
            h.value ? (p(), k("div", _k, [
              u("div", kk, [
                F(lt, {
                  columns: r,
                  rows: d.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (p(), k("div", wk, [
              u("div", Ck, [
                u("div", $k, [
                  F(T(nt), { class: "empty-icon" })
                ]),
                b[1] || (b[1] = u("p", { class: "empty-title" }, "No message role data available", -1)),
                b[2] || (b[2] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), Mk = /* @__PURE__ */ me(Sk, [["__scopeId", "data-v-362c0dbc"]]), Dk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Tk = {
  key: 0,
  class: "card-body"
}, Ak = {
  key: 0,
  class: "chart-section"
}, Bk = { class: "chart-container" }, Lk = { class: "kpi-grid" }, Pk = {
  key: 1,
  class: "empty-state"
}, Ik = { class: "empty-state-content" }, Rk = { class: "empty-icon-wrapper" }, Fk = {
  key: 1,
  class: "loading-state"
}, Ek = /* @__PURE__ */ le({
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
    const a = e, s = n, o = (x) => {
      s("export", x);
    }, { isDark: i, colors: l } = Ce(we(a, "theme")), r = {
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
    }, c = (x) => x.agent_type || x.agent_id || x.agent_name || "", d = (x) => x.agent_name ? x.agent_name : c(x).split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ").replace(/V\d+$/, "").trim(), h = (x) => {
      const _ = c(x).toLowerCase();
      for (const [w, C] of Object.entries(r))
        if (_.includes(w))
          return C;
      return "#9ca3af";
    }, m = $(() => [...a.data?.top_agents || []].sort((_, w) => w.avg_cost_per_conversation - _.avg_cost_per_conversation)), v = $(() => a.data?.total_conversations !== void 0 ? Number(a.data.total_conversations) || 0 : m.value.reduce((x, _) => x + _.conversations, 0)), g = $(() => a.data?.total_cost !== void 0 ? Number(a.data.total_cost) || 0 : m.value.reduce((x, _) => x + _.total_cost, 0)), y = $(() => a.data?.overall_avg_cost_per_conversation !== void 0 ? Number(a.data.overall_avg_cost_per_conversation) || 0 : v.value === 0 ? 0 : g.value / v.value), b = $(() => {
      const x = m.value;
      if (x.length === 0)
        return { labels: [], datasets: [] };
      const _ = x.map((M) => d(M)), w = x.map((M) => M.avg_cost_per_conversation), C = x.map((M) => h(M));
      return {
        labels: _,
        datasets: [
          {
            label: "USD per conversation",
            data: w,
            backgroundColor: C.map((M) => `${M}80`),
            borderColor: C,
            borderWidth: 1
          }
        ]
      };
    }), f = $(() => a.options ? a.options : {
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
            label: function(x) {
              const _ = m.value[x.dataIndex];
              return [
                `Cost: ${Pe(x.parsed.x)}`,
                `Conversations: ${oe(_.conversations)}`,
                `Total Cost: ${Pe(_.total_cost)}`
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
            callback: function(x) {
              return Pe(x);
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
    return t({ isDark: i }), (x, _) => (p(), ee(ke, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        u("div", Dk, [
          e.loading ? (p(), k("div", Fk, [..._[2] || (_[2] = [
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
          ])])) : (p(), k("div", Tk, [
            b.value.labels && b.value.labels.length ? (p(), k("section", Ak, [
              u("div", Bk, [
                F($t, {
                  data: b.value,
                  options: f.value
                }, null, 8, ["data", "options"])
              ]),
              u("footer", Lk, [
                F(T(ve), {
                  title: "Total Agents",
                  value: String(m.value.length)
                }, null, 8, ["value"]),
                F(T(ve), {
                  title: "Total Conversations",
                  value: T(oe)(v.value)
                }, null, 8, ["value"]),
                F(T(ve), {
                  title: "Total Cost",
                  value: T(Pe)(g.value)
                }, null, 8, ["value"]),
                F(T(ve), {
                  title: "Avg Cost / Conv.",
                  value: T(Pe)(y.value)
                }, null, 8, ["value"])
              ])
            ])) : (p(), k("section", Pk, [
              u("div", Ik, [
                u("div", Rk, [
                  F(T(nt), { class: "empty-icon" })
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
}), Ok = /* @__PURE__ */ me(Ek, [["__scopeId", "data-v-49068ad7"]]), Vk = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, zk = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, Nk = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, Wk = {
  key: 0,
  scope: "col",
  class: "w-12 px-4 py-3 text-center align-middle"
}, Hk = ["checked", "aria-label"], jk = ["aria-sort", "onClick"], Yk = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, Kk = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, Uk = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, qk = {
  key: 0,
  class: "w-12 bg-transparent px-4 py-3 text-center align-middle"
}, Xk = ["checked", "aria-label", "onChange"], Gk = /* @__PURE__ */ le({
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
    sortKey: { default: null },
    sortDirection: { default: null }
  },
  emits: ["update:selectedKeys", "sort"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = ae(null);
    function o(C) {
      return `cell-${C}`;
    }
    function i(C) {
      return C === "center" ? "text-center" : C === "right" ? "text-right" : "text-left";
    }
    function l(C, M) {
      if (typeof n.rowKey == "function")
        return n.rowKey(C);
      const S = C[n.rowKey];
      return S != null ? String(S) : `__index_${M}`;
    }
    function r(C, M) {
      return C[M];
    }
    function c(C) {
      return C == null || typeof C == "object" ? "" : String(C);
    }
    function d(C, M) {
      return l(C, M);
    }
    const h = $(
      () => n.rows.map((C, M) => l(C, M))
    );
    function m(C, M) {
      const S = l(C, M);
      return n.selectedKeys.includes(S);
    }
    const v = $(() => !n.selectable || n.rows.length === 0 ? !1 : h.value.every((C) => n.selectedKeys.includes(C))), g = $(() => {
      if (!n.selectable || n.rows.length === 0) return !1;
      const C = h.value.filter((M) => n.selectedKeys.includes(M));
      return C.length > 0 && C.length < n.rows.length;
    });
    Oe(
      [g, v, () => n.selectable],
      async () => {
        await He();
        const C = s.value;
        C && (C.indeterminate = g.value && !v.value);
      },
      { immediate: !0 }
    );
    function y() {
      if (n.selectable)
        if (v.value) {
          const C = n.selectedKeys.filter((M) => !h.value.includes(M));
          a("update:selectedKeys", C);
        } else {
          const C = new Set(n.selectedKeys);
          h.value.forEach((M) => C.add(M)), a("update:selectedKeys", [...C]);
        }
    }
    function b(C, M) {
      if (!n.selectable) return;
      const S = l(C, M);
      n.selectedKeys.includes(S) ? a(
        "update:selectedKeys",
        n.selectedKeys.filter((V) => V !== S)
      ) : a("update:selectedKeys", [...n.selectedKeys, S]);
    }
    function f(C, M) {
      const S = l(C, M);
      return `${n.ariaLabelSelectRow} ${S}`;
    }
    function x(C) {
      a("sort", C);
    }
    function _(C) {
      return n.sortKey === C && n.sortDirection != null;
    }
    function w(C) {
      return _(C) ? n.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    return (C, M) => (p(), k("div", Vk, [
      u("div", zk, [
        u("table", {
          class: J([
            "kiut-table w-full min-w-[640px] overflow-hidden border-collapse text-left text-sm",
            e.fixedLayout ? "table-fixed" : ""
          ])
        }, [
          u("thead", null, [
            u("tr", Nk, [
              e.selectable ? (p(), k("th", Wk, [
                u("input", {
                  ref_key: "selectAllRef",
                  ref: s,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: v.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: y
                }, null, 40, Hk)
              ])) : z("", !0),
              (p(!0), k(ne, null, fe(e.columns, (S) => (p(), k("th", {
                key: S.key,
                scope: "col",
                class: J([
                  "px-4 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  i(S.align),
                  S.headerClass ?? ""
                ])
              }, [
                S.sortable ? (p(), k("button", {
                  key: 0,
                  type: "button",
                  class: J(["kiut-table-sort-btn inline-flex items-center gap-1", i(S.align)]),
                  "aria-sort": w(S.key),
                  onClick: (R) => x(S.key)
                }, [
                  u("span", null, D(S.label), 1),
                  u("span", Yk, [
                    _(S.key) ? (p(), k(ne, { key: 0 }, [
                      e.sortDirection === "asc" ? (p(), k("span", Kk, "↑")) : e.sortDirection === "desc" ? (p(), k("span", Uk, "↓")) : z("", !0)
                    ], 64)) : (p(), k(ne, { key: 1 }, [
                      M[0] || (M[0] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      M[1] || (M[1] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, jk)) : (p(), k(ne, { key: 1 }, [
                  Be(D(S.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          u("tbody", null, [
            (p(!0), k(ne, null, fe(e.rows, (S, R) => (p(), k("tr", {
              key: d(S, R),
              class: "h-14 border-b border-[#e5e7eb] last:border-b-0 bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]"
            }, [
              e.selectable ? (p(), k("td", qk, [
                u("input", {
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: m(S, R),
                  "aria-label": f(S, R),
                  onChange: (V) => b(S, R)
                }, null, 40, Xk)
              ])) : z("", !0),
              (p(!0), k(ne, null, fe(e.columns, (V) => (p(), k("td", {
                key: V.key,
                class: J([
                  "bg-transparent px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                  i(V.align),
                  V.cellClass ?? ""
                ])
              }, [
                $e(C.$slots, o(V.key), {
                  row: S,
                  column: V,
                  value: r(S, V.key)
                }, () => [
                  Be(D(c(r(S, V.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ], 2)
      ])
    ]));
  }
}), Zk = /* @__PURE__ */ me(Gk, [["__scopeId", "data-v-0bb9a9aa"]]);
function Qk(e, t) {
  return p(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function Jk(e, t) {
  return p(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const e2 = ["aria-label"], t2 = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, n2 = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, a2 = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, s2 = ["aria-label", "aria-expanded", "aria-controls", "onClick"], o2 = { class: "truncate" }, i2 = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, l2 = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, r2 = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, c2 = ["aria-label", "onClick"], d2 = ["aria-label", "onClick"], u2 = ["aria-label"], h2 = ["aria-label"], f2 = {
  key: 1,
  class: "space-y-2"
}, g2 = ["for"], m2 = ["id", "placeholder", "onKeydown"], p2 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, b2 = ["aria-label"], v2 = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, y2 = ["checked", "onChange"], x2 = { class: "min-w-0 flex-1" }, _2 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, k2 = { class: "flex flex-wrap items-end gap-2" }, w2 = { class: "min-w-[120px] flex-1" }, C2 = ["for"], $2 = ["id"], S2 = { class: "min-w-[120px] flex-1" }, M2 = ["for"], D2 = ["id"], T2 = /* @__PURE__ */ le({
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
    const n = e, a = t, s = Ja(), i = `${`kiut-filters-${Ue()}`}-panel`, l = ae(null), r = /* @__PURE__ */ new Map(), c = ae(null), d = ae(!1), h = ae({}), m = ae(null), v = ae(""), g = ae([]), y = ae(""), b = ae(""), f = $(() => c.value ? n.filterDefinitions.find((P) => P.id === c.value) ?? null : null), x = $(() => {
      const P = f.value;
      if (P)
        return P.type === "text" ? v.value : P.type === "select" ? g.value : { start: y.value, end: b.value };
    });
    function _(P, j) {
      j && j instanceof HTMLElement ? r.set(P, j) : r.delete(P);
    }
    function w(P) {
      return n.modelValue[P];
    }
    function C(P) {
      if (P == null) return [];
      if (Array.isArray(P))
        return P.filter((j) => typeof j == "string" && j.trim() !== "");
      if (typeof P == "string") {
        const j = P.trim();
        return j ? [j] : [];
      }
      return [];
    }
    function M(P, j) {
      if (j == null) return !0;
      if (P.type === "text") return String(j).trim() === "";
      if (P.type === "select") return C(j).length === 0;
      if (P.type === "dateRange") {
        const Q = j;
        return !Q?.start?.trim() || !Q?.end?.trim();
      }
      return !0;
    }
    const S = $(
      () => n.filterDefinitions.some((P) => !M(P, w(P.id)))
    ), R = $(() => {
      const P = [];
      for (const j of n.filterDefinitions) {
        const Q = w(j.id);
        if (!M(j, Q)) {
          if (j.type === "text")
            P.push({ kind: "text", def: j, key: j.id });
          else if (j.type === "dateRange")
            P.push({ kind: "dateRange", def: j, key: j.id });
          else if (j.type === "select")
            for (const ce of C(Q))
              P.push({
                kind: "select",
                def: j,
                optionValue: ce,
                key: `${j.id}::${ce}`
              });
        }
      }
      return P;
    });
    function V(P) {
      return P.type !== "select" ? 0 : C(w(P.id)).length;
    }
    function E(P) {
      const j = w(P.id), Q = P.label.replace(/^\+\s*/, "");
      if (P.type === "text") return `${Q}: ${String(j ?? "").trim()}`;
      if (P.type === "select") {
        const Je = C(j).map((dt) => P.options.find((yt) => yt.value === dt)?.label ?? dt);
        return `${Q}: ${Je.join(", ")}`;
      }
      const ce = j, pe = L(ce.start), xe = L(ce.end);
      return `${Q}: ${pe} – ${xe}`;
    }
    function A(P) {
      return P.kind === "text" || P.kind === "dateRange" ? E(P.def) : P.def.options.find((Q) => Q.value === P.optionValue)?.label ?? P.optionValue;
    }
    function L(P) {
      if (!P) return "";
      const j = je(P, "YYYY-MM-DD", !0);
      return j.isValid() ? j.format("L") : P;
    }
    function O(P) {
      const j = c.value === P.id && d.value, Q = !M(P, w(P.id));
      return j || Q ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function q(P) {
      return M(P, w(P.id)) ? Y(P) : `Editar filtro ${P.label.replace(/^\+\s*/, "")}`;
    }
    function X(P) {
      const j = w(P.id);
      if (P.type === "text") {
        v.value = j != null ? String(j) : "";
        return;
      }
      if (P.type === "select") {
        g.value = [...C(j)];
        return;
      }
      const Q = j;
      y.value = Q?.start?.trim() ?? "", b.value = Q?.end?.trim() ?? "";
    }
    function ie() {
      const P = f.value;
      if (!P || P.type !== "select") return;
      const j = { ...n.modelValue };
      g.value.length === 0 ? delete j[P.id] : j[P.id] = [...g.value], a("update:modelValue", j), a("change", j);
    }
    function se(P) {
      const j = g.value.indexOf(P);
      j >= 0 ? g.value = g.value.filter((Q, ce) => ce !== j) : g.value = [...g.value, P], ie();
    }
    function Z(P) {
      if (!P) return;
      m.value = P;
      const j = P.getBoundingClientRect(), Q = 300;
      let ce = j.left;
      const pe = window.innerWidth - Q - 12;
      ce > pe && (ce = Math.max(12, pe)), ce < 12 && (ce = 12);
      const xe = j.bottom + 8;
      h.value = {
        top: `${xe}px`,
        left: `${ce}px`,
        width: `${Math.min(Q, window.innerWidth - 24)}px`
      };
    }
    function he(P, j) {
      if (c.value === P.id && d.value) {
        ye();
        return;
      }
      d.value && c.value !== P.id && ye(), c.value = P.id, d.value = !0, X(P), He().then(async () => {
        Z(j.currentTarget), await He(), G();
      });
    }
    function K(P, j) {
      if (c.value === P.id && d.value) {
        ye();
        return;
      }
      d.value && c.value !== P.id && ye(), c.value = P.id, d.value = !0, X(P), He().then(async () => {
        const Q = r.get(P.id) ?? j.currentTarget;
        Z(Q), await He(), G();
      });
    }
    function G() {
      const P = l.value;
      if (!P) return;
      P.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function te() {
      d.value = !1, c.value = null, m.value = null;
    }
    function ge(P) {
      const j = f.value;
      if (!j) return;
      if (j.type === "text") {
        v.value = P != null ? String(P) : "";
        return;
      }
      if (j.type === "select") {
        g.value = Array.isArray(P) ? P.filter((ce) => typeof ce == "string") : C(P);
        return;
      }
      const Q = P;
      y.value = Q?.start?.trim() ?? "", b.value = Q?.end?.trim() ?? "";
    }
    function ye() {
      const P = f.value;
      if (!P) return;
      if (P.type === "text") {
        const pe = v.value.trim(), xe = { ...n.modelValue };
        pe === "" ? delete xe[P.id] : xe[P.id] = pe, a("update:modelValue", xe), a("change", xe), te();
        return;
      }
      if (P.type === "select") {
        ie(), te();
        return;
      }
      const j = y.value.trim(), Q = b.value.trim(), ce = { ...n.modelValue };
      !j || !Q || j > Q ? delete ce[P.id] : ce[P.id] = { start: j, end: Q }, a("update:modelValue", ce), a("change", ce), te();
    }
    function Se(P) {
      const j = { ...n.modelValue };
      delete j[P], a("update:modelValue", j), a("change", j), c.value === P && te();
    }
    function Me(P) {
      if (P.kind === "text" || P.kind === "dateRange") {
        Se(P.def.id);
        return;
      }
      const j = { ...n.modelValue }, ce = C(j[P.def.id]).filter((pe) => pe !== P.optionValue);
      ce.length === 0 ? delete j[P.def.id] : j[P.def.id] = ce, a("update:modelValue", j), a("change", j), c.value === P.def.id && X(P.def);
    }
    function I() {
      const P = {};
      a("update:modelValue", P), a("change", P), te();
    }
    const N = $(() => {
      const P = f.value;
      return P ? `Editar filtro: ${P.label}` : "Filtro";
    });
    function H(P) {
      const j = P.def.label.replace(/^\+\s*/, "");
      return P.kind === "select" ? `Quitar ${P.def.options.find((pe) => pe.value === P.optionValue)?.label ?? P.optionValue} del filtro ${j}` : `Quitar filtro ${j}`;
    }
    function de(P) {
      const j = P.def.label.replace(/^\+\s*/, "");
      if (P.kind === "select") {
        const ce = P.def.options.find((pe) => pe.value === P.optionValue)?.label ?? P.optionValue;
        return `Editar filtro ${j}: ${ce}`;
      }
      return `Editar filtro ${j}`;
    }
    function Y(P) {
      return `Añadir filtro ${P.label.replace(/^\+\s*/, "")}`;
    }
    const W = $(() => n.clearLabel);
    function U(P) {
      if (!d.value || !l.value) return;
      const j = P.target;
      if (!(l.value.contains(j) || (j instanceof Element ? j : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const ce of r.values())
          if (ce?.contains(j)) return;
        ye();
      }
    }
    function re(P) {
      P.key === "Escape" && d.value && (P.preventDefault(), te());
    }
    function ue() {
      !d.value || !m.value || Z(m.value);
    }
    return tt(() => {
      document.addEventListener("mousedown", U, !0), window.addEventListener("keydown", re, !0), window.addEventListener("resize", ue);
    }), ni(() => {
      document.removeEventListener("mousedown", U, !0), window.removeEventListener("keydown", re, !0), window.removeEventListener("resize", ue);
    }), Oe(
      () => n.modelValue,
      () => {
        const P = f.value;
        P && d.value && !s.panel && X(P);
      },
      { deep: !0 }
    ), (P, j) => (p(), k("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      u("div", t2, [
        u("span", n2, D(e.label), 1),
        u("div", a2, [
          (p(!0), k(ne, null, fe(e.filterDefinitions, (Q) => (p(), k("button", {
            key: `pill-${Q.id}`,
            ref_for: !0,
            ref: (ce) => _(Q.id, ce),
            type: "button",
            class: J(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", O(Q)]),
            "aria-label": q(Q),
            "aria-expanded": c.value === Q.id,
            "aria-haspopup": !0,
            "aria-controls": c.value === Q.id ? i : void 0,
            onClick: (ce) => K(Q, ce)
          }, [
            F(T(Qk), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            u("span", o2, D(Q.label), 1),
            Q.type === "select" && V(Q) > 0 ? (p(), k("span", i2, D(V(Q)), 1)) : z("", !0)
          ], 10, s2))), 128))
        ])
      ]),
      S.value ? (p(), k("div", l2, [
        u("div", r2, [
          (p(!0), k(ne, null, fe(R.value, (Q) => (p(), k("div", {
            key: Q.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            u("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": de(Q),
              onClick: (ce) => he(Q.def, ce)
            }, [
              $e(P.$slots, "formatChip", {
                filter: Q.def,
                value: w(Q.def.id),
                optionValue: Q.kind === "select" ? Q.optionValue : void 0
              }, () => [
                Be(D(A(Q)), 1)
              ], !0)
            ], 8, c2),
            u("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": H(Q),
              onClick: (ce) => Me(Q)
            }, [
              F(T(Jk), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, d2)
          ]))), 128))
        ]),
        u("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": W.value,
          onClick: I
        }, D(e.clearLabel), 9, u2)
      ])) : z("", !0),
      (p(), ee(_a, { to: "body" }, [
        c.value && d.value ? (p(), k("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: l,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": N.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: Te(h.value),
          onKeydown: j[3] || (j[3] = et(() => {
          }, ["stop"]))
        }, [
          f.value ? (p(), k(ne, { key: 0 }, [
            P.$slots.panel ? $e(P.$slots, "panel", {
              key: 0,
              filter: f.value,
              close: ye,
              value: x.value,
              updateValue: ge
            }, void 0, !0) : (p(), k("div", f2, [
              f.value.type === "text" ? (p(), k(ne, { key: 0 }, [
                u("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, D(f.value.label), 9, g2),
                ct(u("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": j[0] || (j[0] = (Q) => v.value = Q),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: f.value.placeholder ?? "…",
                  onKeydown: Rn(et(ye, ["prevent"]), ["enter"])
                }, null, 40, m2), [
                  [an, v.value]
                ])
              ], 64)) : f.value.type === "select" ? (p(), k(ne, { key: 1 }, [
                u("p", p2, D(f.value.label), 1),
                u("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": f.value.label,
                  "aria-multiselectable": !0
                }, [
                  (p(!0), k(ne, null, fe(f.value.options, (Q) => (p(), k("li", {
                    key: Q.value
                  }, [
                    u("label", v2, [
                      u("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: g.value.includes(Q.value),
                        onChange: (ce) => se(Q.value)
                      }, null, 40, y2),
                      u("span", x2, D(Q.label), 1)
                    ])
                  ]))), 128))
                ], 8, b2)
              ], 64)) : f.value.type === "dateRange" ? (p(), k(ne, { key: 2 }, [
                u("p", _2, D(f.value.label), 1),
                u("div", k2, [
                  u("div", w2, [
                    u("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, C2),
                    ct(u("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": j[1] || (j[1] = (Q) => y.value = Q),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, $2), [
                      [an, y.value]
                    ])
                  ]),
                  u("div", S2, [
                    u("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, M2),
                    ct(u("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": j[2] || (j[2] = (Q) => b.value = Q),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, D2), [
                      [an, b.value]
                    ])
                  ])
                ])
              ], 64)) : z("", !0)
            ]))
          ], 64)) : z("", !0)
        ], 44, h2)) : z("", !0)
      ]))
    ], 8, e2));
  }
}), A2 = /* @__PURE__ */ me(T2, [["__scopeId", "data-v-f38e0100"]]), B2 = { class: "font-sans" }, L2 = ["for"], P2 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], I2 = ["id"], R2 = /* @__PURE__ */ le({
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
    const n = e, a = t, s = ka(), o = ai("$pcForm", null), i = `kiut-input-text-${Ue()}`, l = $(() => n.id ?? i), r = $(() => `${l.value}-err`), c = $(() => n.name ?? s.name ?? ""), d = ae(n.modelValue ?? "");
    Oe(
      () => n.modelValue,
      (f) => {
        d.value = f ?? "";
      }
    ), tt(() => {
      o && c.value && o.register?.(c.value, {});
    }), pt(() => {
      o && c.value && o.deregister?.(c.value);
    });
    const h = $(() => o && c.value ? o.fields?.[c.value]?.states?.value ?? d.value : d.value), m = $(() => o && c.value ? o.fields?.[c.value]?.states?.invalid ?? n.invalid ?? !1 : n.invalid ?? !1);
    function v(f) {
      const x = f.target.value;
      d.value = x, a("update:modelValue", x);
      const _ = o?.fields?.[c.value]?.props;
      _?.onInput && _.onInput(f);
    }
    function g(f) {
      const x = o?.fields?.[c.value]?.props;
      x?.onChange && x.onChange(f);
    }
    function y(f) {
      const x = o?.fields?.[c.value]?.props;
      x?.onBlur && x.onBlur(f);
    }
    const b = $(() => {
      const { name: f, id: x, type: _, ...w } = s;
      return w;
    });
    return (f, x) => (p(), k("div", B2, [
      e.label ? (p(), k("label", {
        key: 0,
        for: l.value,
        class: J(T(rt))
      }, D(e.label), 11, L2)) : z("", !0),
      u("input", sn(b.value, {
        id: l.value,
        name: c.value,
        type: e.type,
        autocomplete: "off",
        class: [T(mt), m.value ? T(It) : ""],
        placeholder: e.placeholder,
        disabled: e.disabled,
        value: h.value,
        "aria-invalid": m.value ? "true" : void 0,
        "aria-describedby": e.errorText ? r.value : void 0,
        onInput: v,
        onChange: g,
        onBlur: y
      }), null, 16, P2),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: r.value,
        class: J(T(St)),
        role: "alert"
      }, D(e.errorText), 11, I2)) : z("", !0)
    ]));
  }
}), F2 = { class: "font-sans" }, E2 = ["for"], O2 = { class: "relative" }, V2 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], z2 = ["aria-label"], N2 = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, W2 = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, H2 = ["id"], j2 = /* @__PURE__ */ le({
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
    const n = e, a = t, s = ka(), o = ai("$pcForm", null), i = `kiut-input-password-${Ue()}`, l = $(() => n.id ?? i), r = $(() => `${l.value}-err`), c = $(() => n.name ?? s.name ?? ""), d = ae(!1), h = ae(n.modelValue ?? "");
    Oe(
      () => n.modelValue,
      (x) => {
        x !== void 0 && x !== h.value && (h.value = x);
      }
    ), tt(() => {
      o && c.value && o.register?.(c.value, {});
    }), pt(() => {
      o && c.value && o.deregister?.(c.value);
    });
    const m = $(() => o && c.value ? o.fields?.[c.value]?.states?.value ?? h.value : h.value), v = $(() => o && c.value ? o.fields?.[c.value]?.states?.invalid ?? n.invalid ?? !1 : n.invalid ?? !1);
    function g(x) {
      const _ = x.target.value;
      h.value = _, a("update:modelValue", _);
      const w = o?.fields?.[c.value]?.props;
      w?.onInput && w.onInput(x);
    }
    function y(x) {
      const _ = o?.fields?.[c.value]?.props;
      _?.onChange && _.onChange(x);
    }
    function b(x) {
      const _ = o?.fields?.[c.value]?.props;
      _?.onBlur && _.onBlur(x);
    }
    const f = $(() => {
      const { name: x, id: _, ...w } = s;
      return w;
    });
    return (x, _) => (p(), k("div", F2, [
      e.label ? (p(), k("label", {
        key: 0,
        for: l.value,
        class: J(T(rt))
      }, D(e.label), 11, E2)) : z("", !0),
      u("div", O2, [
        u("input", sn(f.value, {
          id: l.value,
          name: c.value,
          type: d.value ? "text" : "password",
          autocomplete: "current-password",
          class: [T(mt), v.value ? T(It) : "", "pr-10"],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: m.value,
          "aria-invalid": v.value ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: g,
          onChange: y,
          onBlur: b
        }), null, 16, V2),
        u("button", {
          type: "button",
          tabindex: "-1",
          onClick: _[0] || (_[0] = (w) => d.value = !d.value),
          class: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
          "aria-label": d.value ? "Hide password" : "Show password"
        }, [
          d.value ? (p(), k("svg", W2, [..._[2] || (_[2] = [
            u("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            }, null, -1)
          ])])) : (p(), k("svg", N2, [..._[1] || (_[1] = [
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
      e.errorText ? (p(), k("p", {
        key: 1,
        id: r.value,
        class: J(T(St)),
        role: "alert"
      }, D(e.errorText), 11, H2)) : z("", !0)
    ]));
  }
}), Y2 = { class: "font-sans" }, K2 = ["for"], U2 = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], q2 = ["id"], X2 = /* @__PURE__ */ le({
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
    const n = e, a = t, s = `kiut-input-textarea-${Ue()}`, o = $(() => n.id ?? s), i = $(() => `${o.value}-err`), l = $({
      get: () => n.modelValue,
      set: (r) => a("update:modelValue", r)
    });
    return (r, c) => (p(), k("div", Y2, [
      e.label ? (p(), k("label", {
        key: 0,
        for: o.value,
        class: J(T(rt))
      }, D(e.label), 11, K2)) : z("", !0),
      ct(u("textarea", {
        id: o.value,
        "onUpdate:modelValue": c[0] || (c[0] = (d) => l.value = d),
        rows: e.rows,
        autocomplete: "off",
        class: J([T(ay), e.invalid ? T(It) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, U2), [
        [an, l.value]
      ]),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: i.value,
        class: J(T(St)),
        role: "alert"
      }, D(e.errorText), 11, q2)) : z("", !0)
    ]));
  }
}), G2 = { class: "font-sans" }, Z2 = ["for"], Q2 = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], J2 = ["for"], ew = ["title"], tw = ["aria-label"], nw = ["id"], aw = /* @__PURE__ */ le({
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
    const n = e, a = t, s = `kiut-input-file-${Ue()}`, o = $(() => n.id ?? s), i = $(() => `${o.value}-err`), l = ae(null), r = $(() => n.modelValue?.name ?? n.placeholder);
    function c(h) {
      const v = h.target.files?.[0] ?? null;
      a("update:modelValue", v);
    }
    function d() {
      a("update:modelValue", null), l.value && (l.value.value = "");
    }
    return (h, m) => (p(), k("div", G2, [
      e.label ? (p(), k("label", {
        key: 0,
        for: o.value,
        class: J(T(rt))
      }, D(e.label), 11, Z2)) : z("", !0),
      u("div", {
        class: J([
          T(mt),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? T(It) : "",
          e.disabled ? "pointer-events-none" : ""
        ])
      }, [
        u("input", {
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
        }, null, 40, Q2),
        u("label", {
          for: o.value,
          class: J(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          F(T(Sm), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          Be(" " + D(e.chooseLabel), 1)
        ], 10, J2),
        u("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: r.value || void 0
        }, D(r.value), 9, ew),
        e.modelValue && !e.disabled ? (p(), k("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: d
        }, [
          F(T(nl), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, tw)) : z("", !0)
      ], 2),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: i.value,
        class: J(T(St)),
        role: "alert"
      }, D(e.errorText), 11, nw)) : z("", !0)
    ]));
  }
}), sw = { class: "font-sans" }, ow = ["for"], iw = { class: "relative" }, lw = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], rw = ["id"], cw = /* @__PURE__ */ le({
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
    const n = e, a = t, s = `kiut-input-datetime-${Ue()}`, o = $(() => n.id ?? s), i = $(() => `${o.value}-err`), l = $(() => n.modelValue ?? "");
    function r(c) {
      const d = c.target.value;
      a("update:modelValue", d === "" ? null : d);
    }
    return (c, d) => (p(), k("div", sw, [
      e.label ? (p(), k("label", {
        key: 0,
        for: o.value,
        class: J(T(rt))
      }, D(e.label), 11, ow)) : z("", !0),
      u("div", iw, [
        F(T(_s), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: o.value,
          value: l.value,
          type: "datetime-local",
          autocomplete: "off",
          class: J([
            T(mt),
            "pl-10",
            e.invalid ? T(It) : ""
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
      e.errorText ? (p(), k("p", {
        key: 1,
        id: i.value,
        class: J(T(St)),
        role: "alert"
      }, D(e.errorText), 11, rw)) : z("", !0)
    ]));
  }
}), dw = { class: "font-sans" }, uw = ["for"], hw = { class: "relative" }, fw = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], gw = ["id"], mw = /* @__PURE__ */ le({
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
      const m = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(h.trim());
      if (!m) return null;
      const v = Number(m[1]), g = Number(m[2]);
      return !Number.isInteger(v) || !Number.isInteger(g) || v < 0 || v > 23 || g < 0 || g > 59 ? null : `${String(v).padStart(2, "0")}:${String(g).padStart(2, "0")}`;
    }
    function a(h) {
      return h === "" ? null : n(h);
    }
    const s = e, o = t, i = `kiut-input-time-${Ue()}`, l = $(() => s.id ?? i), r = $(() => `${l.value}-err`), c = $(() => s.modelValue == null || s.modelValue === "" ? "" : n(s.modelValue) ?? "");
    function d(h) {
      const m = h.target.value;
      o("update:modelValue", a(m));
    }
    return (h, m) => (p(), k("div", dw, [
      e.label ? (p(), k("label", {
        key: 0,
        for: l.value,
        class: J(T(rt))
      }, D(e.label), 11, uw)) : z("", !0),
      u("div", hw, [
        F(T(Dm), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: l.value,
          value: c.value,
          type: "time",
          autocomplete: "off",
          class: J([
            T(mt),
            "pl-10",
            e.invalid ? T(It) : ""
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
      e.errorText ? (p(), k("p", {
        key: 1,
        id: r.value,
        class: J(T(St)),
        role: "alert"
      }, D(e.errorText), 11, gw)) : z("", !0)
    ]));
  }
}), pw = { class: "font-sans" }, bw = ["for"], vw = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, yw = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], xw = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, _w = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, kw = { class: "min-w-0 text-left leading-snug" }, ww = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, Cw = { class: "min-w-0 text-right leading-snug" }, $w = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Sw = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Mw = ["id"], Dw = /* @__PURE__ */ le({
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
    const n = e, a = t, s = `kiut-input-range-${Ue()}`, o = $(() => n.id ?? s), i = $(() => `${o.value}-err`), l = $(() => {
      const v = [];
      return n.errorText && v.push(i.value), v.length ? v.join(" ") : void 0;
    }), r = $(
      () => !!(n.caption && !n.captionMin && !n.captionMax)
    ), c = $(() => !!(n.captionMin || n.captionMax)), d = $(() => {
      const { min: v, max: g, modelValue: y } = n;
      if (g === v) return 0;
      const b = (y - v) / (g - v);
      return Math.min(100, Math.max(0, b * 100));
    }), h = $(() => ({
      "--kiut-range-fill": `${d.value}%`,
      "--kiut-range-length": n.trackLength
    }));
    function m(v) {
      const g = Number(v.target.value);
      a("update:modelValue", Number.isNaN(g) ? n.min : g);
    }
    return (v, g) => (p(), k("div", pw, [
      e.label ? (p(), k("label", {
        key: 0,
        for: o.value,
        class: J(T(rt))
      }, D(e.label), 11, bw)) : z("", !0),
      u("div", {
        class: J(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (p(), k("p", vw, D(e.captionMax), 1)) : z("", !0),
        u("div", {
          class: J(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: Te(h.value)
        }, [
          u("input", {
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
            class: J([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: m
          }, null, 42, yw)
        ], 6),
        e.orientation === "horizontal" && r.value ? (p(), k("p", xw, D(e.caption), 1)) : e.orientation === "horizontal" && c.value ? (p(), k("div", _w, [
          u("span", kw, D(e.captionMin), 1),
          u("span", ww, D(e.caption), 1),
          u("span", Cw, D(e.captionMax), 1)
        ])) : z("", !0),
        e.orientation === "vertical" && e.captionMin ? (p(), k("p", $w, D(e.captionMin), 1)) : z("", !0),
        e.orientation === "vertical" && e.caption ? (p(), k("p", Sw, D(e.caption), 1)) : z("", !0)
      ], 2),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: i.value,
        class: J(T(St)),
        role: "alert"
      }, D(e.errorText), 11, Mw)) : z("", !0)
    ]));
  }
}), Tw = /* @__PURE__ */ me(Dw, [["__scopeId", "data-v-a1343418"]]), Aw = { class: "font-sans" }, Bw = ["for"], Lw = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], Pw = ["id"], Iw = /* @__PURE__ */ le({
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
    const n = e, a = t, s = `kiut-input-number-${Ue()}`, o = $(() => n.id ?? s), i = $(() => `${o.value}-err`), l = $(() => {
      switch (n.align) {
        case "start":
          return "text-start";
        case "end":
          return "text-end";
        default:
          return "text-center";
      }
    }), r = $(
      () => n.modelValue === null || n.modelValue === void 0 ? "" : String(n.modelValue)
    );
    function c(d) {
      const h = d.target.value;
      if (h === "") {
        a("update:modelValue", null);
        return;
      }
      const m = Number(h);
      a("update:modelValue", Number.isNaN(m) ? null : m);
    }
    return (d, h) => (p(), k("div", Aw, [
      e.label ? (p(), k("label", {
        key: 0,
        for: o.value,
        class: J(T(rt))
      }, D(e.label), 11, Bw)) : z("", !0),
      u("input", {
        id: o.value,
        value: r.value,
        type: "number",
        onInput: c,
        class: J([
          T(mt),
          e.invalid ? T(It) : "",
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
      e.errorText ? (p(), k("p", {
        key: 1,
        id: i.value,
        class: J(T(St)),
        role: "alert"
      }, D(e.errorText), 11, Pw)) : z("", !0)
    ]));
  }
}), Rw = { class: "font-sans" }, Fw = ["for"], Ew = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], Ow = ["disabled"], Vw = ["id"], zw = "#3b82f6", Nw = "#aabbcc", Ww = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", Hw = /* @__PURE__ */ le({
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
    function n(g) {
      const y = g.trim(), b = /^#?([0-9a-fA-F]{6})$/.exec(y);
      if (b) return `#${b[1].toLowerCase()}`;
      const f = /^#?([0-9a-fA-F]{3})$/.exec(y);
      if (f) {
        const [x, _, w] = f[1].split("");
        return `#${x}${x}${_}${_}${w}${w}`.toLowerCase();
      }
      return null;
    }
    function a(g) {
      return n(g) ?? zw;
    }
    const s = e, o = t, i = `kiut-input-color-${Ue()}`, l = $(() => s.id ?? i), r = $(() => `${l.value}-err`), c = $(() => a(s.modelValue)), d = ae(c.value), h = ae(!1);
    Oe(c, (g) => {
      h.value || (d.value = g);
    });
    function m(g) {
      const y = g.target, b = n(y.value);
      b && o("update:modelValue", b);
    }
    function v() {
      h.value = !1;
      const g = n(d.value);
      g ? (d.value = g, o("update:modelValue", g)) : d.value = c.value;
    }
    return Oe(d, (g) => {
      if (!h.value) return;
      const y = n(g);
      y && o("update:modelValue", y);
    }), (g, y) => (p(), k("div", Rw, [
      e.label ? (p(), k("label", {
        key: 0,
        for: l.value,
        class: J(T(rt))
      }, D(e.label), 11, Fw)) : z("", !0),
      u("div", {
        class: J([
          Ww,
          e.invalid ? T(It) : "",
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
          onInput: m
        }, null, 40, Ew),
        e.showHexInput ? ct((p(), k("input", {
          key: 0,
          "onUpdate:modelValue": y[0] || (y[0] = (b) => d.value = b),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: Nw,
          onFocus: y[1] || (y[1] = (b) => h.value = !0),
          onBlur: v
        }, null, 40, Ow)), [
          [an, d.value]
        ]) : z("", !0)
      ], 2),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: r.value,
        class: J(T(St)),
        role: "alert"
      }, D(e.errorText), 11, Vw)) : z("", !0)
    ]));
  }
}), jw = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], Yw = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, Kw = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Uw = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, qw = { class: "truncate" }, Xw = ["aria-selected", "onClick", "onMouseenter"], Gw = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, Zw = { class: "min-w-0 flex-1" }, Qw = /* @__PURE__ */ le({
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
    const n = e, a = t, s = `kiut-multiselect-${Ue()}`, o = `${s}-label`, i = `${s}-btn`, l = `${s}-listbox`, r = ae(null), c = ae(null), d = ae(!1), h = ae(0), m = $(() => n.options.filter((E) => !E.disabled)), v = $(() => new Set(n.modelValue ?? [])), g = $(
      () => n.options.filter((E) => v.value.has(E.value))
    ), y = $(() => {
      const E = n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opciones", A = g.value.length;
      return A === 0 ? E : `${E}, ${A} seleccionada${A === 1 ? "" : "s"}`;
    });
    function b(E) {
      return `${String(E.value)}-${E.label}`;
    }
    function f(E) {
      return v.value.has(E.value);
    }
    function x(E, A) {
      const L = f(E), O = h.value === A;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        L ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !L && O ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function _(E) {
      const A = [...n.modelValue ?? []], L = A.indexOf(E.value);
      L >= 0 ? A.splice(L, 1) : A.push(E.value), a("update:modelValue", A);
    }
    function w() {
      const E = m.value;
      if (E.length === 0) {
        h.value = 0;
        return;
      }
      const A = v.value, L = E.findIndex((O) => A.has(O.value));
      h.value = L >= 0 ? L : 0;
    }
    function C() {
      n.disabled || (d.value = !d.value);
    }
    function M(E) {
      E.stopPropagation(), !n.disabled && (C(), d.value && (w(), He(() => c.value?.focus())));
    }
    function S(E) {
      if (!d.value) return;
      const A = r.value;
      A && !A.contains(E.target) && (d.value = !1);
    }
    function R(E) {
      n.disabled || (E.key === "ArrowDown" || E.key === "Enter" || E.key === " ") && (E.preventDefault(), d.value || (d.value = !0, w(), He(() => c.value?.focus())));
    }
    function V(E) {
      const A = m.value;
      if (A.length !== 0) {
        if (E.key === "Escape") {
          E.preventDefault(), d.value = !1;
          return;
        }
        if (E.key === "ArrowDown") {
          E.preventDefault(), h.value = Math.min(h.value + 1, A.length - 1);
          return;
        }
        if (E.key === "ArrowUp") {
          E.preventDefault(), h.value = Math.max(h.value - 1, 0);
          return;
        }
        if (E.key === "Enter" || E.key === " ") {
          E.preventDefault();
          const L = A[h.value];
          L && _(L);
        }
      }
    }
    return tt(() => {
      document.addEventListener("click", S);
    }), pt(() => {
      document.removeEventListener("click", S);
    }), (E, A) => (p(), k("div", {
      ref_key: "rootRef",
      ref: r,
      class: "relative font-sans"
    }, [
      e.label ? (p(), k("label", {
        key: 0,
        id: o,
        class: J(T(rt))
      }, D(e.label), 3)) : z("", !0),
      u("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: J([
          T(mt),
          "flex items-start justify-between gap-2 text-left",
          d.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": d.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : y.value,
        onClick: M,
        onKeydown: R
      }, [
        u("div", Yw, [
          g.value.length === 0 ? (p(), k("span", Kw, D(e.placeholder), 1)) : (p(), k("div", Uw, [
            (p(!0), k(ne, null, fe(g.value, (L) => (p(), k("span", {
              key: b(L),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              u("span", qw, D(L.label), 1)
            ]))), 128))
          ]))
        ]),
        F(T(ks), {
          class: J(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", d.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, jw),
      ct(u("ul", {
        id: l,
        ref_key: "listRef",
        ref: c,
        role: "listbox",
        tabindex: "-1",
        "aria-multiselectable": "true",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: et(V, ["stop"])
      }, [
        (p(!0), k(ne, null, fe(m.value, (L, O) => (p(), k("li", {
          key: b(L),
          role: "option",
          "aria-selected": f(L),
          class: J(x(L, O)),
          onClick: et((q) => _(L), ["stop"]),
          onMouseenter: (q) => h.value = O
        }, [
          u("span", Gw, [
            f(L) ? (p(), ee(T(rl), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : z("", !0)
          ]),
          u("span", Zw, D(L.label), 1)
        ], 42, Xw))), 128))
      ], 544), [
        [Yn, d.value]
      ])
    ], 512));
  }
}), Jw = ["id", "aria-checked", "aria-disabled", "disabled", "onKeydown"], e5 = { class: "sr-only" }, t5 = /* @__PURE__ */ le({
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
    return (o, i) => (p(), k("button", {
      id: e.id,
      type: "button",
      role: "switch",
      "aria-checked": e.modelValue,
      "aria-disabled": e.disabled ? "true" : void 0,
      disabled: e.disabled,
      class: J([
        "relative inline-flex h-8 w-[3.75rem] shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-sm transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        e.modelValue ? "bg-[color:var(--kiut-primary)]" : "bg-[#DEDEE3] dark:bg-slate-600"
      ]),
      onClick: s,
      onKeydown: [
        Rn(et(s, ["prevent", "stop"]), ["space"]),
        Rn(et(s, ["prevent"]), ["enter"])
      ]
    }, [
      u("span", {
        class: J(["pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", e.modelValue ? "translate-x-7" : "translate-x-0"]),
        "aria-hidden": "true"
      }, null, 2),
      u("span", e5, D(e.ariaLabel), 1)
    ], 42, Jw));
  }
}), n5 = { class: "font-sans" }, a5 = ["for"], s5 = { class: "flex gap-2" }, o5 = { class: "w-[7.5rem] shrink-0" }, i5 = { class: "min-w-0 flex-1" }, l5 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], r5 = ["id"], c5 = /* @__PURE__ */ le({
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
    const n = e, a = t, s = `kiut-phone-${Ue()}`, o = $(() => n.id ?? `${s}-num`), i = $(() => `${o.value}-err`), l = $({
      get: () => n.modelValue.prefix,
      set: (c) => a("update:modelValue", { ...n.modelValue, prefix: c })
    }), r = $({
      get: () => n.modelValue.number,
      set: (c) => a("update:modelValue", { ...n.modelValue, number: c })
    });
    return (c, d) => (p(), k("div", n5, [
      e.label ? (p(), k("label", {
        key: 0,
        for: o.value,
        class: J(T(rt))
      }, D(e.label), 11, a5)) : z("", !0),
      u("div", s5, [
        u("div", o5, [
          F(ws, {
            modelValue: l.value,
            "onUpdate:modelValue": d[0] || (d[0] = (h) => l.value = h),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        u("div", i5, [
          ct(u("input", {
            id: o.value,
            "onUpdate:modelValue": d[1] || (d[1] = (h) => r.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: J([T(mt), e.invalid ? T(It) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, l5), [
            [an, r.value]
          ])
        ])
      ]),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: i.value,
        class: J(T(St)),
        role: "alert"
      }, D(e.errorText), 11, r5)) : z("", !0)
    ]));
  }
}), d5 = ["role", "aria-label"], u5 = { class: "flex flex-wrap gap-2" }, h5 = ["aria-checked", "role", "onClick"], f5 = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, g5 = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, m5 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, p5 = /* @__PURE__ */ le({
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
    const n = e, a = t, s = $(() => n.multiple ? Array.isArray(n.modelValue) ? n.modelValue : [] : []);
    function o(r) {
      return n.multiple ? s.value.includes(r.value) : n.modelValue === r.value;
    }
    function i(r) {
      return [
        "inline-flex max-w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        o(r) ? "border-[color:var(--kiut-primary)]/50 bg-violet-50/80 dark:bg-violet-950/30" : "border-gray-300 bg-white dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]"
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
    return (r, c) => (p(), k("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      u("div", u5, [
        (p(!0), k(ne, null, fe(e.items, (d) => (p(), k("button", {
          key: d.value,
          type: "button",
          class: J(i(d)),
          "aria-checked": o(d),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => l(d)
        }, [
          u("span", f5, [
            o(d) ? (p(), k("span", g5)) : z("", !0)
          ]),
          d.dotColor ? (p(), k("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: Te({ backgroundColor: d.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : z("", !0),
          u("span", m5, D(d.label), 1)
        ], 10, h5))), 128))
      ])
    ], 8, d5));
  }
}), b5 = ["aria-label"], v5 = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], y5 = { class: "truncate px-3 py-2 text-sm font-medium" }, x5 = /* @__PURE__ */ le({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = `kiut-seg-${Ue()}`, o = (y) => `${s}-seg-${y}`, i = ae([]);
    function l(y, b) {
      y instanceof HTMLButtonElement ? i.value[b] = y : i.value[b] = null;
    }
    function r(y) {
      return y.value === n.modelValue;
    }
    function c(y) {
      const b = r(y), f = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return y.disabled ? `${f} cursor-not-allowed opacity-40` : b ? `${f} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${f} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function d(y) {
      y.disabled || y.value !== n.modelValue && a("update:modelValue", y.value);
    }
    function h(y, b, f) {
      d(y), He(() => i.value[b]?.focus());
    }
    const m = $(
      () => n.items.map((y, b) => y.disabled ? -1 : b).filter((y) => y >= 0)
    );
    function v(y, b) {
      const f = n.items.length;
      if (f === 0) return 0;
      let x = y;
      for (let _ = 0; _ < f; _++)
        if (x = (x + b + f) % f, !n.items[x]?.disabled) return x;
      return y;
    }
    function g(y, b) {
      if (y.key === "ArrowRight" || y.key === "ArrowDown") {
        y.preventDefault();
        const f = v(b, 1), x = n.items[f];
        x && d(x), He(() => i.value[f]?.focus());
      } else if (y.key === "ArrowLeft" || y.key === "ArrowUp") {
        y.preventDefault();
        const f = v(b, -1), x = n.items[f];
        x && d(x), He(() => i.value[f]?.focus());
      } else if (y.key === "Home") {
        y.preventDefault();
        const f = m.value[0];
        if (f !== void 0) {
          const x = n.items[f];
          x && d(x), He(() => i.value[f]?.focus());
        }
      } else if (y.key === "End") {
        y.preventDefault();
        const f = m.value[m.value.length - 1];
        if (f !== void 0) {
          const x = n.items[f];
          x && d(x), He(() => i.value[f]?.focus());
        }
      }
    }
    return (y, b) => (p(), k("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (p(!0), k(ne, null, fe(e.items, (f, x) => (p(), k("button", {
        id: o(f.value),
        key: f.value,
        ref_for: !0,
        ref: (_) => l(_, x),
        type: "button",
        role: "tab",
        "aria-selected": r(f),
        "aria-disabled": f.disabled === !0,
        tabindex: r(f) ? 0 : -1,
        class: J(c(f)),
        onClick: (_) => h(f, x),
        onKeydown: (_) => g(_, x)
      }, [
        u("span", y5, D(f.label), 1)
      ], 42, v5))), 128))
    ], 8, b5));
  }
}), _5 = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  es: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
}, k5 = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
}, w5 = {
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
}, C5 = {
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
}, $5 = [
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
function S5(e = "en") {
  return _5[e];
}
function fl(e = "en") {
  return $5.map((t) => ({ id: t, label: C5[e][t] }));
}
function M5(e = "en") {
  return "Presets";
}
fl("es");
function Ge(e) {
  const [t, n, a] = e.split("-").map(Number);
  return new Date(t, n - 1, a);
}
function ot(e) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), a = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${a}`;
}
function ze(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function Lt(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function jn(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function D5(e, t) {
  const n = new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
  return ze(n);
}
function Mn(e, t) {
  return D5(e, -t);
}
function T5(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function gl(e, t = /* @__PURE__ */ new Date()) {
  const n = ze(t);
  switch (e) {
    case "today":
      return { start: n, end: n };
    case "yesterday": {
      const a = Mn(n, 1);
      return { start: a, end: a };
    }
    case "last7":
      return { start: Mn(n, 6), end: n };
    case "last14":
      return { start: Mn(n, 13), end: n };
    case "last30":
      return { start: Mn(n, 29), end: n };
    case "last90":
      return { start: Mn(n, 89), end: n };
    case "thisMonth":
      return { start: Lt(n), end: n };
    case "lastMonth": {
      const a = Lt(jn(n, -1));
      return { start: a, end: T5(a) };
    }
    case "yearToDate":
      return { start: new Date(n.getFullYear(), 0, 1), end: n };
  }
}
function ml(e, t, n) {
  let a = ze(e.start), s = ze(e.end);
  if (t) {
    const o = ze(Ge(t));
    Ht(a, o) && (a = o), Ht(s, o) && (s = o);
  }
  if (n) {
    const o = ze(Ge(n));
    Ha(a, o) && (a = o), Ha(s, o) && (s = o);
  }
  return Ha(a, s) ? { start: s, end: a } : { start: a, end: s };
}
function A5(e, t, n = /* @__PURE__ */ new Date(), a, s) {
  if (!e.start || !e.end) return !1;
  const o = ml(gl(t, n), a, s);
  return ot(o.start) === e.start && ot(o.end) === e.end;
}
function Un(e, t) {
  const n = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), a = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return n < a ? -1 : n > a ? 1 : 0;
}
function zt(e, t) {
  return Un(e, t) === 0;
}
function Ht(e, t) {
  return Un(e, t) < 0;
}
function Ha(e, t) {
  return Un(e, t) > 0;
}
function pl(e, t) {
  return Un(e, t) >= 0;
}
function bl(e, t) {
  return Un(e, t) <= 0;
}
function vl(e) {
  const t = e.getFullYear(), n = e.getMonth(), a = new Date(t, n, 1), s = new Date(a);
  s.setDate(a.getDate() - a.getDay());
  const o = [], i = new Date(s);
  for (let l = 0; l < 42; l++)
    o.push(new Date(i)), i.setDate(i.getDate() + 1);
  return o;
}
function xa(e, t = "en") {
  return `${k5[t][e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function Nt(e, t = "en") {
  return `${w5[t][e.getMonth()]} ${e.getFullYear()}`;
}
const B5 = ["aria-expanded", "aria-labelledby", "aria-label"], L5 = ["onKeydown"], P5 = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, I5 = { class: "mb-4 flex items-center justify-between gap-2" }, R5 = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, F5 = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, E5 = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, O5 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, V5 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, z5 = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, N5 = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, W5 = { class: "grid grid-cols-7 gap-y-2 mt-2" }, H5 = ["disabled", "onClick"], j5 = "rounded-lg text-[#61616b]", Y5 = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", K5 = "opacity-30", U5 = "bg-[#6b35e9] font-medium text-white", q5 = "bg-[#895af6] font-semibold text-white", X5 = /* @__PURE__ */ le({
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
    const n = e, a = t, o = `${`kiut-drp-${Ue()}`}-lbl`, i = ae(null), l = ae(null), r = ae(!1), c = ae(null), d = ae(Lt(/* @__PURE__ */ new Date())), h = $(() => !!(n.modelValue.start && n.modelValue.end)), m = $(() => {
      const A = Lt(d.value);
      return [A, jn(A, 1)];
    }), v = $(() => n.ariaLabel ?? n.placeholder), g = $(() => {
      const A = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return n.panelAlign === "end" ? `right-0 left-auto ${A}` : `left-0 right-auto ${A}`;
    }), y = $(
      () => `${Nt(m.value[0])} – ${Nt(m.value[1])}`
    ), b = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], f = $(() => {
      if (!n.modelValue.start || !n.modelValue.end) return n.placeholder;
      const A = Ge(n.modelValue.start), L = Ge(n.modelValue.end);
      return `${xa(A)} – ${xa(L)}`;
    });
    function x(A, L) {
      return A.getMonth() === L.getMonth() && A.getFullYear() === L.getFullYear();
    }
    function _(A) {
      const L = ze(A);
      if (n.minDate) {
        const O = ze(Ge(n.minDate));
        if (Ht(L, O)) return !0;
      }
      if (n.maxDate) {
        const O = ze(Ge(n.maxDate));
        if (Ht(O, L)) return !0;
      }
      return !1;
    }
    function w(A, L, O) {
      const q = zt(A, L), X = zt(A, O);
      if (q && X) return "rounded-lg";
      const ie = q || A.getDay() === 0, se = X || A.getDay() === 6;
      return ie && se ? "rounded-lg" : ie ? "rounded-l-lg" : se ? "rounded-r-lg" : "rounded-none";
    }
    function C(A, L) {
      const O = x(L, A), q = _(L), X = n.modelValue.start ? ze(Ge(n.modelValue.start)) : null, ie = n.modelValue.end ? ze(Ge(n.modelValue.end)) : null, se = ze(L);
      if (q)
        return j5;
      let Z = Y5;
      if (X && ie && pl(se, X) && bl(se, ie)) {
        const K = zt(se, X), G = zt(se, ie);
        Z = `${w(se, X, ie)} ${K || G ? q5 : U5}`;
      }
      return O || (Z = `${Z} ${K5}`), Z;
    }
    function M(A) {
      if (_(A)) return;
      const L = ze(A);
      if (!c.value) {
        c.value = new Date(L), a("update:modelValue", { start: ot(L), end: ot(L) });
        return;
      }
      let q = ze(c.value), X = new Date(L);
      Ht(X, q) && ([q, X] = [X, q]), a("update:modelValue", { start: ot(q), end: ot(X) }), c.value = null, r.value = !1;
    }
    function S(A) {
      d.value = jn(d.value, A);
    }
    function R() {
      r.value = !1;
    }
    function V(A) {
      if (A?.stopPropagation(), !r.value) {
        if (r.value = !0, c.value = null, n.modelValue.start)
          try {
            d.value = Lt(Ge(n.modelValue.start));
          } catch {
          }
        He(() => l.value?.focus());
      }
    }
    function E(A) {
      if (!r.value) return;
      const L = i.value;
      L && !L.contains(A.target) && (r.value = !1);
    }
    return Oe(r, (A) => {
      A && (c.value = null);
    }), tt(() => {
      document.addEventListener("click", E);
    }), pt(() => {
      document.removeEventListener("click", E);
    }), (A, L) => (p(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (p(), k("label", {
        key: 0,
        id: o,
        class: J(T(rt))
      }, D(e.label), 3)) : z("", !0),
      u("button", {
        type: "button",
        class: J([
          T(mt),
          "flex w-full items-center gap-2 text-left",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : v.value,
        onFocus: V,
        onClick: V
      }, [
        F(T(_s), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: J([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, D(f.value), 3)
      ], 42, B5),
      ct(u("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: J([
          g.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Rn(et(R, ["stop"]), ["escape"])
      }, [
        u("div", P5, [
          u("div", I5, [
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes anterior",
              onClick: L[0] || (L[0] = (O) => S(-1))
            }, [
              F(T(el), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ]),
            u("div", R5, [
              u("span", F5, D(y.value), 1),
              u("div", E5, [
                u("span", O5, D(T(Nt)(m.value[0])), 1),
                u("span", V5, D(T(Nt)(m.value[1])), 1)
              ])
            ]),
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes siguiente",
              onClick: L[1] || (L[1] = (O) => S(1))
            }, [
              F(T(tl), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ])
          ]),
          u("div", z5, [
            (p(!0), k(ne, null, fe(m.value, (O) => (p(), k("div", {
              key: `${O.getFullYear()}-${O.getMonth()}`,
              class: "w-full max-w-[252px] shrink-0"
            }, [
              u("div", N5, [
                (p(), k(ne, null, fe(b, (q) => u("span", { key: q }, D(q), 1)), 64))
              ]),
              u("div", W5, [
                (p(!0), k(ne, null, fe(T(vl)(O), (q) => (p(), k("button", {
                  key: T(ot)(q),
                  type: "button",
                  disabled: _(q),
                  class: J(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", C(O, q)]),
                  onClick: (X) => M(q)
                }, D(q.getDate()), 11, H5))), 128))
              ])
            ]))), 128))
          ])
        ])
      ], 42, L5), [
        [Yn, r.value]
      ])
    ], 512));
  }
}), G5 = ["aria-expanded", "aria-labelledby", "aria-label"], Z5 = ["aria-label", "onKeydown"], Q5 = { class: "flex flex-col sm:flex-row" }, J5 = ["aria-label"], eC = { class: "px-2 pt-1 pb-1.5 text-[10px] font-semibold uppercase dark:text-[#61616b] text-[#e3e3e8]" }, tC = { class: "flex flex-col gap-0.5" }, nC = ["onClick"], aC = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, sC = { class: "mb-4 flex items-center justify-between gap-2" }, oC = ["aria-label"], iC = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, lC = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, rC = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, cC = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, dC = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, uC = ["aria-label"], hC = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, fC = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, gC = { class: "grid grid-cols-7 gap-y-2 mt-2" }, mC = ["disabled", "onClick"], pC = "rounded-lg text-[#61616b]", bC = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", vC = "opacity-30", yC = "bg-[#6b35e9] font-medium text-white", xC = "bg-[#895af6] font-semibold text-white", _C = /* @__PURE__ */ le({
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
    const n = e, a = t, o = `${`kiut-dpp-${Ue()}`}-lbl`, i = ae(null), l = ae(null), r = ae(!1), c = ae(null), d = ae(Lt(/* @__PURE__ */ new Date())), h = $(() => !!(n.modelValue.start && n.modelValue.end)), m = $(() => {
      const K = Lt(d.value);
      return [K, jn(K, 1)];
    }), v = $(
      () => n.placeholder ?? (n.locale === "es" ? "Seleccionar fechas" : "Select dates")
    ), g = $(() => n.ariaLabel ?? v.value), y = $(() => fl(n.locale)), b = $(() => M5(n.locale)), f = $(() => S5(n.locale)), x = $(
      () => n.locale === "es" ? "Preajustes de rango" : "Range presets"
    ), _ = $(
      () => n.locale === "es" ? "Mes anterior" : "Previous month"
    ), w = $(
      () => n.locale === "es" ? "Mes siguiente" : "Next month"
    ), C = $(
      () => n.locale === "es" ? "Calendario de rango con preajustes" : "Date range calendar with presets"
    ), M = $(() => {
      const K = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return n.panelAlign === "end" ? `right-0 left-auto ${K}` : `left-0 right-auto ${K}`;
    }), S = $(
      () => `${Nt(m.value[0], n.locale)} – ${Nt(m.value[1], n.locale)}`
    ), R = $(() => {
      if (!n.modelValue.start || !n.modelValue.end) return v.value;
      const K = Ge(n.modelValue.start), G = Ge(n.modelValue.end);
      return `${xa(K, n.locale)} – ${xa(G, n.locale)}`;
    });
    function V(K, G) {
      return K.getMonth() === G.getMonth() && K.getFullYear() === G.getFullYear();
    }
    function E(K) {
      const G = ze(K);
      if (n.minDate) {
        const te = ze(Ge(n.minDate));
        if (Ht(G, te)) return !0;
      }
      if (n.maxDate) {
        const te = ze(Ge(n.maxDate));
        if (Ht(te, G)) return !0;
      }
      return !1;
    }
    function A(K, G, te) {
      const ge = zt(K, G), ye = zt(K, te);
      if (ge && ye) return "rounded-lg";
      const Se = ge || K.getDay() === 0, Me = ye || K.getDay() === 6;
      return Se && Me ? "rounded-lg" : Se ? "rounded-l-lg" : Me ? "rounded-r-lg" : "rounded-none";
    }
    function L(K) {
      const G = A5(
        n.modelValue,
        K,
        /* @__PURE__ */ new Date(),
        n.minDate,
        n.maxDate
      ), te = "text-[#61616b] hover:bg-[#efeff0b3] dark:text-[#e3e3e8] dark:hover:bg-[#23232fb3]";
      return G ? `${te} font-medium` : te;
    }
    function O(K, G) {
      const te = V(G, K), ge = E(G), ye = n.modelValue.start ? ze(Ge(n.modelValue.start)) : null, Se = n.modelValue.end ? ze(Ge(n.modelValue.end)) : null, Me = ze(G);
      if (ge)
        return pC;
      let I = bC;
      if (ye && Se && pl(Me, ye) && bl(Me, Se)) {
        const H = zt(Me, ye), de = zt(Me, Se);
        I = `${A(Me, ye, Se)} ${H || de ? xC : yC}`;
      }
      return te || (I = `${I} ${vC}`), I;
    }
    function q(K) {
      const G = ml(gl(K), n.minDate, n.maxDate);
      a("update:modelValue", {
        start: ot(G.start),
        end: ot(G.end)
      }), d.value = Lt(G.start), c.value = null, r.value = !1;
    }
    function X(K) {
      if (E(K)) return;
      const G = ze(K);
      if (!c.value) {
        c.value = new Date(G), a("update:modelValue", { start: ot(G), end: ot(G) });
        return;
      }
      let ge = ze(c.value), ye = new Date(G);
      Ht(ye, ge) && ([ge, ye] = [ye, ge]), a("update:modelValue", { start: ot(ge), end: ot(ye) }), c.value = null, r.value = !1;
    }
    function ie(K) {
      d.value = jn(d.value, K);
    }
    function se() {
      r.value = !1;
    }
    function Z(K) {
      if (K.stopPropagation(), r.value) {
        r.value = !1;
        return;
      }
      if (r.value = !0, c.value = null, n.modelValue.start)
        try {
          d.value = Lt(Ge(n.modelValue.start));
        } catch {
        }
      He(() => l.value?.focus());
    }
    function he(K) {
      if (!r.value) return;
      const G = i.value;
      G && !G.contains(K.target) && (r.value = !1);
    }
    return Oe(r, (K) => {
      K && (c.value = null);
    }), tt(() => {
      document.addEventListener("click", he);
    }), pt(() => {
      document.removeEventListener("click", he);
    }), (K, G) => (p(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (p(), k("label", {
        key: 0,
        id: o,
        class: J(T(rt))
      }, D(e.label), 3)) : z("", !0),
      u("button", {
        type: "button",
        class: J([
          T(mt),
          "group flex w-full items-center gap-2 text-left hover:bg-[#6b35e9] hover:text-white",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : g.value,
        onClick: Z
      }, [
        F(T(_s), {
          class: "h-5 w-5 shrink-0 text-gray-500 transition-colors group-hover:text-white dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: J([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] group-hover:text-white dark:text-slate-500"
          ])
        }, D(R.value), 3)
      ], 10, G5),
      ct(u("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": C.value,
        class: J([
          M.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Rn(et(se, ["stop"]), ["escape"])
      }, [
        u("div", Q5, [
          u("aside", {
            class: "w-full shrink-0 border-b border-gray-200 p-3 sm:w-[176px] sm:border-r sm:border-b-0 dark:border-[color:var(--kiut-border-light)]",
            "aria-label": x.value
          }, [
            u("p", eC, D(b.value), 1),
            u("ul", tC, [
              (p(!0), k(ne, null, fe(y.value, (te) => (p(), k("li", {
                key: te.id
              }, [
                u("button", {
                  type: "button",
                  class: J(["w-full rounded-lg px-2 py-1.5 text-left text-xs transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", L(te.id)]),
                  onClick: (ge) => q(te.id)
                }, D(te.label), 11, nC)
              ]))), 128))
            ])
          ], 8, J5),
          u("div", aC, [
            u("div", sC, [
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": _.value,
                onClick: G[0] || (G[0] = (te) => ie(-1))
              }, [
                F(T(el), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, oC),
              u("div", iC, [
                u("span", lC, D(S.value), 1),
                u("div", rC, [
                  u("span", cC, D(T(Nt)(m.value[0], e.locale)), 1),
                  u("span", dC, D(T(Nt)(m.value[1], e.locale)), 1)
                ])
              ]),
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": w.value,
                onClick: G[1] || (G[1] = (te) => ie(1))
              }, [
                F(T(tl), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, uC)
            ]),
            u("div", hC, [
              (p(!0), k(ne, null, fe(m.value, (te) => (p(), k("div", {
                key: `${te.getFullYear()}-${te.getMonth()}`,
                class: "w-full max-w-[252px] shrink-0"
              }, [
                u("div", fC, [
                  (p(!0), k(ne, null, fe(f.value, (ge) => (p(), k("span", { key: ge }, D(ge), 1))), 128))
                ]),
                u("div", gC, [
                  (p(!0), k(ne, null, fe(T(vl)(te), (ge) => (p(), k("button", {
                    key: T(ot)(ge),
                    type: "button",
                    disabled: E(ge),
                    class: J(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", O(te, ge)]),
                    onClick: (ye) => X(ge)
                  }, D(ge.getDate()), 11, mC))), 128))
                ])
              ]))), 128))
            ])
          ])
        ])
      ], 42, Z5), [
        [Yn, r.value]
      ])
    ], 512));
  }
}), kC = ["disabled", "aria-expanded", "aria-label"], wC = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]",
  "aria-hidden": "true"
}, CC = { class: "min-w-0 truncate" }, $C = ["disabled", "onClick", "onMouseenter"], SC = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, MC = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, DC = { class: "min-w-0 flex-1 text-left" }, TC = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, AC = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, BC = {
  key: 1,
  class: "group relative inline-flex shrink-0"
}, LC = ["type", "disabled", "aria-label"], PC = {
  key: 1,
  class: "min-w-0 truncate"
}, IC = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, RC = ["type", "disabled", "aria-label"], FC = {
  key: 1,
  class: "min-w-0 truncate"
}, ua = /* @__PURE__ */ le({
  name: "Button",
  inheritAttrs: !1,
  __name: "Button",
  props: {
    variant: { default: "primary" },
    tone: { default: "default" },
    disabled: { type: Boolean, default: !1 },
    tooltip: {},
    options: { default: () => [] },
    menuMinWidth: { default: "280px" },
    menuAlign: { default: "left" }
  },
  emits: ["select"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = ka(), o = $(() => !!n.tooltip?.trim() && n.variant !== "dropdown"), i = $(() => n.variant === "dropdown"), l = $(() => n.variant === "action"), r = $(() => !l.value), c = $(() => {
      const Z = s["aria-label"];
      if (typeof Z == "string" && Z.length > 0) return Z;
      if (l.value && n.tooltip?.trim()) return n.tooltip.trim();
    }), d = $(() => {
      const Z = s.type;
      return Z === "submit" || Z === "reset" || Z === "button" ? Z : "button";
    }), h = $(() => {
      const { class: Z, type: he, "aria-label": K, ...G } = s;
      return G;
    }), m = $(() => n.variant === "primary" || n.variant === "dropdown" ? [
      "px-4 py-2.5",
      "bg-[color:var(--kiut-primary)] text-white shadow-sm",
      "hover:bg-[color:var(--kiut-primary-hover)] active:bg-[color:var(--kiut-primary-dark)]",
      "dark:text-white dark:hover:brightness-110 dark:active:brightness-95"
    ] : n.variant === "secondary" ? [
      "px-4 py-2.5",
      "border border-slate-200 bg-slate-50 text-[color:var(--kiut-text-primary)]",
      "hover:border-slate-300 hover:bg-slate-100",
      "active:bg-slate-200/80",
      "dark:border-[color:var(--kiut-border-light)] dark:bg-slate-800/80 dark:text-slate-100",
      "dark:hover:border-white/[0.18] dark:hover:bg-slate-800",
      "dark:active:bg-slate-700/90"
    ] : n.tone === "danger" ? [
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
    ]), v = `kiut-button-menu-${Ue()}`, g = `${v}-btn`, y = `${v}-menu`, b = ae(null), f = ae(null), x = ae(null), _ = ae(!1), w = ae(0), C = ae({}), M = $(() => n.options.filter((Z) => !Z.disabled));
    function S(Z) {
      return `${Z.value}-${Z.label}`;
    }
    function R() {
      const Z = f.value;
      if (!Z) return;
      const he = Z.getBoundingClientRect(), K = {
        top: `${he.bottom - 3}px`,
        minWidth: `max(${he.width}px, ${n.menuMinWidth})`
      };
      n.menuAlign === "right" ? (K.right = `${window.innerWidth - he.right}px`, K.left = "auto") : (K.left = `${he.left}px`, K.right = "auto"), C.value = K;
    }
    function V(Z) {
      return [
        "mx-1 flex w-full cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-left outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-45",
        w.value === Z ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function E() {
      _.value = !1;
    }
    function A() {
      R(), w.value = 0, He(() => x.value?.focus());
    }
    function L() {
      if (!n.disabled) {
        if (_.value) {
          E();
          return;
        }
        _.value = !0, A();
      }
    }
    function O(Z) {
      Z.disabled || (a("select", Z), E());
    }
    function q(Z) {
      Z.stopPropagation(), !n.disabled && L();
    }
    function X(Z) {
      if (!_.value) return;
      const he = Z.target, K = b.value, G = x.value;
      K && !K.contains(he) && (!G || !G.contains(he)) && E();
    }
    function ie(Z) {
      n.disabled || (Z.key === "ArrowDown" || Z.key === "Enter" || Z.key === " ") && (Z.preventDefault(), _.value || (_.value = !0, A()));
    }
    function se(Z) {
      const he = M.value;
      if (Z.key === "Escape") {
        Z.preventDefault(), E(), f.value?.focus();
        return;
      }
      if (he.length !== 0) {
        if (Z.key === "ArrowDown") {
          Z.preventDefault(), w.value = Math.min(w.value + 1, he.length - 1);
          return;
        }
        if (Z.key === "ArrowUp") {
          Z.preventDefault(), w.value = Math.max(w.value - 1, 0);
          return;
        }
        if (Z.key === "Enter" || Z.key === " ") {
          Z.preventDefault();
          const K = he[w.value];
          K && O(K);
        }
      }
    }
    return tt(() => {
      document.addEventListener("click", X);
    }), pt(() => {
      document.removeEventListener("click", X);
    }), (Z, he) => i.value ? (p(), k("div", {
      key: 0,
      ref_key: "rootRef",
      ref: b,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      u("button", sn({
        ref_key: "buttonRef",
        ref: f,
        id: g,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [m.value, T(s).class]],
        disabled: e.disabled,
        "aria-expanded": _.value,
        "aria-haspopup": "menu",
        "aria-controls": y,
        "aria-label": c.value
      }, h.value, {
        onClick: q,
        onKeydown: ie
      }), [
        Z.$slots.icon ? (p(), k("span", wC, [
          $e(Z.$slots, "icon")
        ])) : z("", !0),
        u("span", CC, [
          $e(Z.$slots, "default")
        ]),
        F(T(ks), {
          class: J(["h-[1.125rem] w-[1.125rem] shrink-0 transition-transform", _.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 16, kC),
      (p(), ee(_a, { to: "body" }, [
        ct(u("div", {
          ref_key: "panelRef",
          ref: x,
          id: y,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: Te(C.value),
          onKeydown: et(se, ["stop"])
        }, [
          (p(!0), k(ne, null, fe(M.value, (K, G) => (p(), k("button", {
            key: S(K),
            type: "button",
            role: "menuitem",
            disabled: K.disabled,
            class: J(V(G)),
            onClick: et((te) => O(K), ["stop"]),
            onMouseenter: (te) => w.value = G
          }, [
            K.icon ? (p(), k("span", SC, [
              (p(), ee(tn(K.icon), { class: "h-5 w-5" }))
            ])) : (p(), k("span", MC)),
            u("span", DC, [
              u("span", TC, D(K.label), 1),
              K.description ? (p(), k("span", AC, D(K.description), 1)) : z("", !0)
            ])
          ], 42, $C))), 128))
        ], 36), [
          [Yn, _.value]
        ])
      ]))
    ], 512)) : o.value ? (p(), k("span", BC, [
      u("button", sn({
        type: d.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [m.value, T(s).class]],
        disabled: e.disabled,
        "aria-label": c.value
      }, h.value), [
        Z.$slots.icon ? (p(), k("span", {
          key: 0,
          class: J(["inline-flex shrink-0", l.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          $e(Z.$slots, "icon")
        ], 2)) : z("", !0),
        r.value ? (p(), k("span", PC, [
          $e(Z.$slots, "default")
        ])) : z("", !0)
      ], 16, LC),
      u("span", IC, D(e.tooltip), 1)
    ])) : (p(), k("button", sn({
      key: 2,
      type: d.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [m.value, T(s).class]],
      disabled: e.disabled,
      "aria-label": c.value
    }, h.value), [
      Z.$slots.icon ? (p(), k("span", {
        key: 0,
        class: J(["inline-flex shrink-0", l.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        $e(Z.$slots, "icon")
      ], 2)) : z("", !0),
      r.value ? (p(), k("span", FC, [
        $e(Z.$slots, "default")
      ])) : z("", !0)
    ], 16, RC));
  }
}), EC = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, OC = { class: "min-w-0 flex-1 space-y-1" }, VC = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, zC = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, NC = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, WC = /* @__PURE__ */ le({
  name: "Modal",
  __name: "Modal",
  props: {
    modelValue: { type: Boolean },
    title: {},
    subtitle: {},
    cancelLabel: { default: "Cancelar" },
    confirmLabel: { default: "Guardar" },
    width: { default: 512 }
  },
  emits: ["update:modelValue", "cancel", "confirm"],
  setup(e, { emit: t }) {
    const n = e, a = $(() => ({ maxWidth: `${n.width}px` })), s = t, i = `${`kiut-modal-${Ue()}`}-title`, l = ae(null);
    function r() {
      s("cancel"), s("update:modelValue", !1);
    }
    function c() {
      s("confirm");
    }
    function d(h) {
      n.modelValue && h.key === "Escape" && (h.preventDefault(), r());
    }
    return Oe(
      () => n.modelValue,
      (h) => {
        h && requestAnimationFrame(() => {
          l.value?.focus({ preventScroll: !0 });
        });
      }
    ), tt(() => {
      document.addEventListener("keydown", d);
    }), pt(() => {
      document.removeEventListener("keydown", d);
    }), (h, m) => (p(), ee(_a, { to: "body" }, [
      F(De, { name: "kiut-modal" }, {
        default: B(() => [
          e.modelValue ? (p(), k("div", EC, [
            u("div", {
              class: "absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] dark:bg-black/60",
              "aria-hidden": "true",
              onClick: r
            }),
            u("div", {
              ref_key: "panelRef",
              ref: l,
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": i,
              tabindex: "-1",
              class: "kiut-modal-panel relative z-10 flex max-h-[min(90vh,880px)] w-full flex-col overflow-hidden rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] shadow-[var(--kiut-shadow-card)] dark:bg-[#252528] dark:shadow-black/40",
              style: Te(a.value),
              onClick: m[0] || (m[0] = et(() => {
              }, ["stop"]))
            }, [
              u("header", {
                class: J(["flex shrink-0 justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.02]", e.subtitle ? "items-start" : "items-center"])
              }, [
                u("div", OC, [
                  u("h2", {
                    id: i,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, D(e.title), 1),
                  e.subtitle ? (p(), k("p", VC, D(e.subtitle), 1)) : z("", !0)
                ]),
                F(ua, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  onClick: r
                }, {
                  icon: B(() => [
                    F(T(nl), { class: "h-5 w-5" })
                  ]),
                  _: 1
                })
              ], 2),
              u("div", zC, [
                $e(h.$slots, "default", {}, void 0, !0)
              ]),
              u("footer", NC, [
                F(ua, {
                  variant: "secondary",
                  type: "button",
                  onClick: r
                }, {
                  default: B(() => [
                    Be(D(e.cancelLabel), 1)
                  ]),
                  _: 1
                }),
                F(ua, {
                  variant: "primary",
                  type: "button",
                  onClick: c
                }, {
                  default: B(() => [
                    Be(D(e.confirmLabel), 1)
                  ]),
                  _: 1
                })
              ])
            ], 4)
          ])) : z("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), HC = /* @__PURE__ */ me(WC, [["__scopeId", "data-v-1c80d9ea"]]), jC = { class: "text-left font-['Inter',system-ui,sans-serif]" }, YC = {
  key: 0,
  class: ""
}, KC = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, UC = { class: "flex min-w-0 flex-1 items-center" }, qC = {
  key: 0,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, XC = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, GC = {
  key: 1,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, ZC = /* @__PURE__ */ le({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = Ja(), n = $(() => {
      const a = !!t.filters, s = !!t.actions;
      return a && s ? "justify-between" : s ? "justify-end" : "";
    });
    return (a, s) => (p(), k("section", jC, [
      a.$slots.description || a.$slots.tabs || a.$slots.filters || a.$slots.actions ? (p(), k("header", YC, [
        a.$slots.description ? (p(), k("div", KC, [
          $e(a.$slots, "description")
        ])) : z("", !0),
        a.$slots.tabs ? (p(), k("div", {
          key: 1,
          class: J(["flex flex-wrap items-center gap-2", a.$slots.filters ? "" : "justify-between"])
        }, [
          u("div", UC, [
            $e(a.$slots, "tabs")
          ]),
          a.$slots.actions && !a.$slots.filters ? (p(), k("div", qC, [
            $e(a.$slots, "actions")
          ])) : z("", !0)
        ], 2)) : z("", !0),
        a.$slots.filters || a.$slots.actions && !a.$slots.tabs ? (p(), k("div", {
          key: 2,
          class: J([
            "flex flex-wrap gap-2 items-center",
            a.$slots.tabs ? "mt-2" : "",
            n.value
          ])
        }, [
          a.$slots.filters ? (p(), k("div", XC, [
            $e(a.$slots, "filters")
          ])) : z("", !0),
          a.$slots.actions ? (p(), k("div", GC, [
            $e(a.$slots, "actions")
          ])) : z("", !0)
        ], 2)) : z("", !0)
      ])) : z("", !0),
      a.$slots.content || a.$slots.default ? (p(), k("div", {
        key: 1,
        class: J({
          "mt-6": a.$slots.description || a.$slots.tabs || a.$slots.filters || a.$slots.actions
        })
      }, [
        $e(a.$slots, "content", {}, () => [
          $e(a.$slots, "default")
        ])
      ], 2)) : z("", !0)
    ]));
  }
}), QC = { class: "flex flex-1 min-h-0" }, JC = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, e$ = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, t$ = ["aria-current", "data-has-active", "title", "onClick"], n$ = {
  key: 1,
  class: "footer-section shrink-0 border-t [background-color:var(--kiut-lateral-bg)]"
}, a$ = { class: "px-4 py-4 shrink-0" }, s$ = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, o$ = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, i$ = ["data-nav-id", "aria-current", "onClick"], l$ = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, r$ = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, c$ = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, d$ = ["data-nav-id", "aria-current", "onClick"], u$ = { class: "truncate text-[15px]" }, h$ = ["aria-current", "data-has-active", "onClick"], f$ = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, g$ = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, m$ = /* @__PURE__ */ le({
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
    const n = ae(!1), a = e, s = t, o = ka(), { class: i, ...l } = o, r = ae(!1);
    function c() {
      typeof window > "u" || (r.value = window.innerWidth < a.mobileBreakpoint);
    }
    tt(() => {
      c(), window.addEventListener("resize", c);
    }), pt(() => {
      window.removeEventListener("resize", c);
    });
    const d = $(() => {
      const f = a.sections.find((x) => x.id === a.selectedSectionId);
      return f?.items?.length ? f : null;
    });
    function h(f) {
      return a.activePath ? a.activePath === f.path || a.activePath.startsWith(f.path + "/") : !1;
    }
    function m(f) {
      return f.items?.length ? f.items.some(h) : !a.activePath || !f.path ? !1 : a.activePath === f.path || a.activePath.startsWith(f.path + "/");
    }
    function v(f) {
      if (!f.items?.length) {
        s("update:selectedSectionId", null), s("navigate", {
          section: f,
          item: { id: f.id, label: f.label, path: f.path }
        });
        return;
      }
      const x = a.selectedSectionId === f.id ? null : f.id;
      s("update:selectedSectionId", x);
    }
    function g(f, x) {
      s("navigate", { section: f, item: x });
    }
    function y() {
      s("update:selectedSectionId", null);
    }
    function b(f, x) {
      g(f, x), y();
    }
    return (f, x) => r.value ? (p(), k("div", sn({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      F(De, { name: "ksn-overlay" }, {
        default: B(() => [
          d.value ? (p(), k("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: y
          })) : z("", !0)
        ]),
        _: 1
      }),
      F(De, { name: "ksn-sheet" }, {
        default: B(() => [
          d.value ? (p(), k("div", {
            key: 0,
            class: "mobile-subsections fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t max-h-[70vh] flex flex-col",
            style: Te({ paddingBottom: a.mobileBarHeight })
          }, [
            x[3] || (x[3] = u("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              u("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            u("div", l$, [
              u("p", r$, D(d.value.label), 1),
              u("button", {
                type: "button",
                class: "w-8 h-8 flex items-center justify-center rounded-lg [color:var(--kiut-text-muted)] hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-colors",
                "aria-label": "Close",
                onClick: y
              }, [...x[2] || (x[2] = [
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
            u("nav", c$, [
              (p(!0), k(ne, null, fe(d.value.items, (_) => (p(), k("button", {
                key: _.id,
                type: "button",
                "data-nav-id": _.id,
                "aria-current": h(_) ? "page" : void 0,
                class: "ksn-item-btn group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]",
                onClick: (w) => b(d.value, _)
              }, [
                _.icon ? (p(), ee(tn(_.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : z("", !0),
                u("span", u$, D(_.label), 1)
              ], 8, d$))), 128))
            ])
          ], 4)) : z("", !0)
        ]),
        _: 1
      }),
      u("nav", {
        class: "ksn-mobile-bar fixed bottom-0 left-0 right-0 z-50 border-t flex items-stretch justify-around overflow-hidden",
        style: Te({ height: e.mobileBarHeight }),
        "aria-label": "Sections"
      }, [
        (p(!0), k(ne, null, fe(e.sections, (_) => (p(), k("button", {
          key: _.id,
          type: "button",
          "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
          "data-has-active": m(_) ? "true" : void 0,
          class: "ksn-section-btn relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset",
          onClick: (w) => v(_)
        }, [
          e.selectedSectionId === _.id || m(_) ? (p(), k("span", f$)) : z("", !0),
          _.icon ? (p(), ee(tn(_.icon), {
            key: 1,
            class: "shrink-0",
            style: Te({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : z("", !0),
          u("span", g$, D(_.label), 1)
        ], 8, h$))), 128))
      ], 4)
    ], 16)) : (p(), k("aside", sn({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      u("div", QC, [
        u("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center",
          style: Te({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: x[0] || (x[0] = (_) => n.value = !0),
          onMouseleave: x[1] || (x[1] = (_) => n.value = !1)
        }, [
          f.$slots.logo ? (p(), k("div", JC, [
            $e(f.$slots, "logo", { expanded: n.value }, void 0, !0)
          ])) : z("", !0),
          u("nav", e$, [
            (p(!0), k(ne, null, fe(e.sections, (_) => (p(), k("button", {
              key: _.id,
              type: "button",
              "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
              "data-has-active": m(_) ? "true" : void 0,
              title: _.label,
              class: "ksn-section-btn group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
              onClick: (w) => v(_)
            }, [
              _.icon ? (p(), ee(tn(_.icon), {
                key: 0,
                class: "shrink-0",
                style: Te({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : z("", !0),
              u("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: Te({ fontSize: e.primaryFontSize })
              }, D(_.label), 5)
            ], 8, t$))), 128))
          ]),
          f.$slots.footer ? (p(), k("div", n$, [
            $e(f.$slots, "footer", { expanded: n.value }, void 0, !0)
          ])) : z("", !0)
        ], 36),
        F(De, { name: "ksn-sub" }, {
          default: B(() => [
            d.value ? (p(), k("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: Te({ width: e.secondaryWidth })
            }, [
              u("div", a$, [
                u("p", s$, D(d.value.label), 1)
              ]),
              u("nav", o$, [
                (p(!0), k(ne, null, fe(d.value.items, (_) => (p(), k("button", {
                  key: _.id,
                  type: "button",
                  "data-nav-id": _.id,
                  "aria-current": h(_) ? "page" : void 0,
                  class: "ksn-item-btn group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
                  onClick: (w) => g(d.value, _)
                }, [
                  _.icon ? (p(), ee(tn(_.icon), {
                    key: 0,
                    style: Te({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : z("", !0),
                  u("span", {
                    class: "truncate",
                    style: Te({ fontSize: e.secondaryFontSize })
                  }, D(_.label), 5)
                ], 8, i$))), 128))
              ])
            ], 4)) : z("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), p$ = /* @__PURE__ */ me(m$, [["__scopeId", "data-v-e0ccb96c"]]), $$ = {
  install(e) {
    e.component("KiutChartBar", $t), e.component("KiutChartLine", vt), e.component("KiutPieChart", Ma), e.component("KiutBoxplotChart", mf), e.component("KiutCandlestickChart", ng), e.component("KiutHistogramChart", Qi), e.component("KiutSankeyChart", Kt), e.component("KiutAgentsPerDay", Um), e.component("KiutBookingManager", Mp), e.component("KiutCheckin", al), e.component("KiutCheckinContainer", O0), e.component("KiutCheckinMetrics", o0), e.component("KiutCheckinSegments", ol), e.component("KiutDisruption", ab), e.component("KiutFAQ", ub), e.component("KiutMessagesPerAgent", wb), e.component("KiutRecordLocator", sl), e.component("KiutSalesByChannel", il), e.component("KiutSeller", ll), e.component("KiutSellerContainer", uv), e.component("KiutTopAgents", yv), e.component("KiutPaymentMethod", Nv), e.component("KiutAgentHumanConversations", Dy), e.component("KiutChannelMetrics", Oy), e.component("KiutTriageCombinations", Jy), e.component("KiutSelectLanguage", i1), e.component("KiutGuardrails", b1), e.component("KiutDisruptionNotifier", O1), e.component("KiutTotalConversationsCard", V1), e.component("KiutCsatP95Card", z1), e.component("KiutCsatPulseCard", N1), e.component("KiutCSATContainer", wx), e.component("KiutAiGeneratedRevenueCard", Cx), e.component("KiutHumanEscalations", Px), e.component("KiutHumanEscalationsCard", Ix), e.component("KiutNpsDailyMetrics", dl), e.component("KiutNpsMetrics", ul), e.component("KiutNpsOverviewMetrics", cl), e.component("KiutAWSCost", jx), e.component("KiutCostUsage", t_), e.component("KiutTokenUsage", h_), e.component("KiutConversationCount", w_), e.component("KiutTopAgentsAnalysis", F_), e.component("KiutTopAgentsPie", K_), e.component("KiutDailyCostTrends", nk), e.component("KiutModelUsage", bk), e.component("KiutMessageRoles", Mk), e.component("KiutCostPerConversations", Ok), e.component("Tabs", hl), e.component("Table", Zk), e.component("Filters", A2), e.component("InputText", R2), e.component("InputPassword", j2), e.component("InputTextarea", X2), e.component("InputFile", aw), e.component("InputDateTime", cw), e.component("InputTime", mw), e.component("InputRange", Tw), e.component("InputNumber", Iw), e.component("InputColorPicker", Hw), e.component("Select", ws), e.component("MultiSelect", Qw), e.component("Toggle", t5), e.component("InputPhone", c5), e.component("SelectablePills", p5), e.component("SegmentedControl", x5), e.component("DateRangePicker", X5), e.component("DatePickerPresets", _C), e.component("Tag", qe), e.component("Button", ua), e.component("Modal", HC), e.component("Section", ZC), e.component("KiutAppShellNavigation", p$);
  }
};
export {
  jx as AWSCost,
  Dy as AgentHumanConversations,
  Um as AgentsPerDay,
  Cx as AiGeneratedRevenueCard,
  p$ as AppShellNavigation,
  Mp as BookingManager,
  mf as BoxplotChart,
  ua as Button,
  wx as CSATContainer,
  ng as CandlestickChart,
  Oy as ChannelMetrics,
  $t as ChartBar,
  vt as ChartLine,
  al as Checkin,
  O0 as CheckinContainer,
  o0 as CheckinMetrics,
  ol as CheckinSegments,
  w_ as ConversationCount,
  Ok as CostPerConversations,
  t_ as CostUsage,
  z1 as CsatP95Card,
  N1 as CsatPulseCard,
  nk as DailyCostTrends,
  _C as DatePickerPresets,
  X5 as DateRangePicker,
  ab as Disruption,
  O1 as DisruptionNotifier,
  ub as FAQ,
  A2 as Filters,
  b1 as Guardrails,
  Qi as HistogramChart,
  Px as HumanEscalations,
  Ix as HumanEscalationsCard,
  Hw as InputColorPicker,
  cw as InputDateTime,
  aw as InputFile,
  Iw as InputNumber,
  j2 as InputPassword,
  c5 as InputPhone,
  Tw as InputRange,
  R2 as InputText,
  X2 as InputTextarea,
  mw as InputTime,
  $$ as KiutUIPlugin,
  Mk as MessageRoles,
  wb as MessagesPerAgent,
  HC as Modal,
  bk as ModelUsage,
  Qw as MultiSelect,
  dl as NpsDailyMetrics,
  ul as NpsMetrics,
  cl as NpsOverviewMetrics,
  Nv as PaymentMethod,
  Ma as PieChart,
  sl as RecordLocator,
  il as SalesByChannel,
  Kt as SankeyChart,
  ZC as Section,
  x5 as SegmentedControl,
  ws as Select,
  i1 as SelectLanguage,
  p5 as SelectablePills,
  ll as Seller,
  uv as SellerContainer,
  Zk as Table,
  hl as Tabs,
  qe as Tag,
  t5 as Toggle,
  h_ as TokenUsage,
  yv as TopAgents,
  F_ as TopAgentsAnalysis,
  K_ as TopAgentsPie,
  V1 as TotalConversationsCard,
  Jy as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
