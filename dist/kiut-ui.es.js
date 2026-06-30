import { defineComponent as le, shallowRef as oi, h as Ka, ref as oe, onMounted as Je, onUnmounted as ct, watch as Fe, toRaw as Ya, nextTick as Ne, version as Sl, isProxy as si, computed as C, toRef as Se, openBlock as y, createElementBlock as k, createVNode as z, unref as B, createElementVNode as u, Fragment as se, renderList as pe, normalizeStyle as $e, normalizeClass as ee, toDisplayString as D, createCommentVNode as V, onBeforeUnmount as ii, createStaticVNode as Mo, useSlots as eo, renderSlot as ke, Transition as ft, withCtx as P, Comment as Ml, createBlock as te, resolveDynamicComponent as Ot, createTextVNode as Te, Teleport as xn, withDirectives as tt, withModifiers as He, vModelText as sn, vShow as rn, createSlots as Do, vModelSelect as Dl, mergeProps as wt, useAttrs as wa, withKeys as Vn, inject as li } from "vue";
import * as To from "echarts/core";
import { TooltipComponent as Tl, TitleComponent as Al } from "echarts/components";
import { SankeyChart as Bl } from "echarts/charts";
import { CanvasRenderer as Ll } from "echarts/renderers";
import We from "moment";
function Xn(e) {
  return e + 0.5 | 0;
}
const Vt = (e, t, n) => Math.max(Math.min(e, n), t);
function Ln(e) {
  return Vt(Xn(e * 2.55), 0, 255);
}
function Kt(e) {
  return Vt(Xn(e * 255), 0, 255);
}
function Bt(e) {
  return Vt(Xn(e / 2.55) / 100, 0, 1);
}
function Ao(e) {
  return Vt(Xn(e * 100), 0, 100);
}
const ut = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Ua = [..."0123456789ABCDEF"], Pl = (e) => Ua[e & 15], Rl = (e) => Ua[(e & 240) >> 4] + Ua[e & 15], Zn = (e) => (e & 240) >> 4 === (e & 15), Il = (e) => Zn(e.r) && Zn(e.g) && Zn(e.b) && Zn(e.a);
function El(e) {
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
const Fl = (e, t) => e < 255 ? t(e) : "";
function Ol(e) {
  var t = Il(e) ? Pl : Rl;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + Fl(e.a, t) : void 0;
}
const Vl = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function ri(e, t, n) {
  const a = t * Math.min(n, 1 - n), o = (s, i = (s + e / 30) % 12) => n - a * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [o(0), o(8), o(4)];
}
function zl(e, t, n) {
  const a = (o, s = (o + e / 60) % 6) => n - n * t * Math.max(Math.min(s, 4 - s, 1), 0);
  return [a(5), a(3), a(1)];
}
function Nl(e, t, n) {
  const a = ri(e, 1, 0.5);
  let o;
  for (t + n > 1 && (o = 1 / (t + n), t *= o, n *= o), o = 0; o < 3; o++)
    a[o] *= 1 - t - n, a[o] += t;
  return a;
}
function Hl(e, t, n, a, o) {
  return e === o ? (t - n) / a + (t < n ? 6 : 0) : t === o ? (n - e) / a + 2 : (e - t) / a + 4;
}
function to(e) {
  const n = e.r / 255, a = e.g / 255, o = e.b / 255, s = Math.max(n, a, o), i = Math.min(n, a, o), l = (s + i) / 2;
  let r, c, d;
  return s !== i && (d = s - i, c = l > 0.5 ? d / (2 - s - i) : d / (s + i), r = Hl(n, a, o, d, s), r = r * 60 + 0.5), [r | 0, c || 0, l];
}
function no(e, t, n, a) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, a)).map(Kt);
}
function ao(e, t, n) {
  return no(ri, e, t, n);
}
function jl(e, t, n) {
  return no(Nl, e, t, n);
}
function Wl(e, t, n) {
  return no(zl, e, t, n);
}
function ci(e) {
  return (e % 360 + 360) % 360;
}
function Kl(e) {
  const t = Vl.exec(e);
  let n = 255, a;
  if (!t)
    return;
  t[5] !== a && (n = t[6] ? Ln(+t[5]) : Kt(+t[5]));
  const o = ci(+t[2]), s = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? a = jl(o, s, i) : t[1] === "hsv" ? a = Wl(o, s, i) : a = ao(o, s, i), {
    r: a[0],
    g: a[1],
    b: a[2],
    a: n
  };
}
function Yl(e, t) {
  var n = to(e);
  n[0] = ci(n[0] + t), n = ao(n), e.r = n[0], e.g = n[1], e.b = n[2];
}
function Ul(e) {
  if (!e)
    return;
  const t = to(e), n = t[0], a = Ao(t[1]), o = Ao(t[2]);
  return e.a < 255 ? `hsla(${n}, ${a}%, ${o}%, ${Bt(e.a)})` : `hsl(${n}, ${a}%, ${o}%)`;
}
const Bo = {
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
}, Lo = {
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
function ql() {
  const e = {}, t = Object.keys(Lo), n = Object.keys(Bo);
  let a, o, s, i, l;
  for (a = 0; a < t.length; a++) {
    for (i = l = t[a], o = 0; o < n.length; o++)
      s = n[o], l = l.replace(s, Bo[s]);
    s = parseInt(Lo[i], 16), e[l] = [s >> 16 & 255, s >> 8 & 255, s & 255];
  }
  return e;
}
let Qn;
function Xl(e) {
  Qn || (Qn = ql(), Qn.transparent = [0, 0, 0, 0]);
  const t = Qn[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const Gl = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Zl(e) {
  const t = Gl.exec(e);
  let n = 255, a, o, s;
  if (t) {
    if (t[7] !== a) {
      const i = +t[7];
      n = t[8] ? Ln(i) : Vt(i * 255, 0, 255);
    }
    return a = +t[1], o = +t[3], s = +t[5], a = 255 & (t[2] ? Ln(a) : Vt(a, 0, 255)), o = 255 & (t[4] ? Ln(o) : Vt(o, 0, 255)), s = 255 & (t[6] ? Ln(s) : Vt(s, 0, 255)), {
      r: a,
      g: o,
      b: s,
      a: n
    };
  }
}
function Ql(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${Bt(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const Aa = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, pn = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function Jl(e, t, n) {
  const a = pn(Bt(e.r)), o = pn(Bt(e.g)), s = pn(Bt(e.b));
  return {
    r: Kt(Aa(a + n * (pn(Bt(t.r)) - a))),
    g: Kt(Aa(o + n * (pn(Bt(t.g)) - o))),
    b: Kt(Aa(s + n * (pn(Bt(t.b)) - s))),
    a: e.a + n * (t.a - e.a)
  };
}
function Jn(e, t, n) {
  if (e) {
    let a = to(e);
    a[t] = Math.max(0, Math.min(a[t] + a[t] * n, t === 0 ? 360 : 1)), a = ao(a), e.r = a[0], e.g = a[1], e.b = a[2];
  }
}
function di(e, t) {
  return e && Object.assign(t || {}, e);
}
function Po(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = Kt(e[3]))) : (t = di(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = Kt(t.a)), t;
}
function er(e) {
  return e.charAt(0) === "r" ? Zl(e) : Kl(e);
}
class zn {
  constructor(t) {
    if (t instanceof zn)
      return t;
    const n = typeof t;
    let a;
    n === "object" ? a = Po(t) : n === "string" && (a = El(t) || Xl(t) || er(t)), this._rgb = a, this._valid = !!a;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = di(this._rgb);
    return t && (t.a = Bt(t.a)), t;
  }
  set rgb(t) {
    this._rgb = Po(t);
  }
  rgbString() {
    return this._valid ? Ql(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? Ol(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? Ul(this._rgb) : void 0;
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
    return t && (this._rgb = Jl(this._rgb, t._rgb, n)), this;
  }
  clone() {
    return new zn(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = Kt(t), this;
  }
  clearer(t) {
    const n = this._rgb;
    return n.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, n = Xn(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return Jn(this._rgb, 2, t), this;
  }
  darken(t) {
    return Jn(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return Jn(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return Jn(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return Yl(this._rgb, t), this;
  }
}
function Dt() {
}
const tr = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function Pe(e) {
  return e == null;
}
function Ue(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function Ae(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function gt(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function xt(e, t) {
  return gt(e) ? e : t;
}
function we(e, t) {
  return typeof e > "u" ? t : e;
}
const nr = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, ui = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function Ee(e, t, n) {
  if (e && typeof e.call == "function")
    return e.apply(n, t);
}
function Re(e, t, n, a) {
  let o, s, i;
  if (Ue(e))
    for (s = e.length, o = 0; o < s; o++)
      t.call(n, e[o], o);
  else if (Ae(e))
    for (i = Object.keys(e), s = i.length, o = 0; o < s; o++)
      t.call(n, e[i[o]], i[o]);
}
function ga(e, t) {
  let n, a, o, s;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (n = 0, a = e.length; n < a; ++n)
    if (o = e[n], s = t[n], o.datasetIndex !== s.datasetIndex || o.index !== s.index)
      return !1;
  return !0;
}
function pa(e) {
  if (Ue(e))
    return e.map(pa);
  if (Ae(e)) {
    const t = /* @__PURE__ */ Object.create(null), n = Object.keys(e), a = n.length;
    let o = 0;
    for (; o < a; ++o)
      t[n[o]] = pa(e[n[o]]);
    return t;
  }
  return e;
}
function hi(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function ar(e, t, n, a) {
  if (!hi(e))
    return;
  const o = t[e], s = n[e];
  Ae(o) && Ae(s) ? Nn(o, s, a) : t[e] = pa(s);
}
function Nn(e, t, n) {
  const a = Ue(t) ? t : [
    t
  ], o = a.length;
  if (!Ae(e))
    return e;
  n = n || {};
  const s = n.merger || ar;
  let i;
  for (let l = 0; l < o; ++l) {
    if (i = a[l], !Ae(i))
      continue;
    const r = Object.keys(i);
    for (let c = 0, d = r.length; c < d; ++c)
      s(r[c], e, i, n);
  }
  return e;
}
function In(e, t) {
  return Nn(e, t, {
    merger: or
  });
}
function or(e, t, n) {
  if (!hi(e))
    return;
  const a = t[e], o = n[e];
  Ae(a) && Ae(o) ? In(a, o) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = pa(o));
}
const Ro = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function sr(e) {
  const t = e.split("."), n = [];
  let a = "";
  for (const o of t)
    a += o, a.endsWith("\\") ? a = a.slice(0, -1) + "." : (n.push(a), a = "");
  return n;
}
function ir(e) {
  const t = sr(e);
  return (n) => {
    for (const a of t) {
      if (a === "")
        break;
      n = n && n[a];
    }
    return n;
  };
}
function cn(e, t) {
  return (Ro[t] || (Ro[t] = ir(t)))(e);
}
function oo(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const Hn = (e) => typeof e < "u", Ut = (e) => typeof e == "function", Io = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
};
function lr(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const Ie = Math.PI, ze = 2 * Ie, rr = ze + Ie, ma = Number.POSITIVE_INFINITY, cr = Ie / 180, qe = Ie / 2, Qt = Ie / 4, Eo = Ie * 2 / 3, fi = Math.log10, $t = Math.sign;
function En(e, t, n) {
  return Math.abs(e - t) < n;
}
function Fo(e) {
  const t = Math.round(e);
  e = En(e, t, e / 1e3) ? t : e;
  const n = Math.pow(10, Math.floor(fi(e))), a = e / n;
  return (a <= 1 ? 1 : a <= 2 ? 2 : a <= 5 ? 5 : 10) * n;
}
function dr(e) {
  const t = [], n = Math.sqrt(e);
  let a;
  for (a = 1; a < n; a++)
    e % a === 0 && (t.push(a), t.push(e / a));
  return n === (n | 0) && t.push(n), t.sort((o, s) => o - s).pop(), t;
}
function ur(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function jn(e) {
  return !ur(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function hr(e, t) {
  const n = Math.round(e);
  return n - t <= e && n + t >= e;
}
function fr(e, t, n) {
  let a, o, s;
  for (a = 0, o = e.length; a < o; a++)
    s = e[a][n], isNaN(s) || (t.min = Math.min(t.min, s), t.max = Math.max(t.max, s));
}
function Pt(e) {
  return e * (Ie / 180);
}
function gr(e) {
  return e * (180 / Ie);
}
function Oo(e) {
  if (!gt(e))
    return;
  let t = 1, n = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, n++;
  return n;
}
function gi(e, t) {
  const n = t.x - e.x, a = t.y - e.y, o = Math.sqrt(n * n + a * a);
  let s = Math.atan2(a, n);
  return s < -0.5 * Ie && (s += ze), {
    angle: s,
    distance: o
  };
}
function qa(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function pr(e, t) {
  return (e - t + rr) % ze - Ie;
}
function bt(e) {
  return (e % ze + ze) % ze;
}
function Wn(e, t, n, a) {
  const o = bt(e), s = bt(t), i = bt(n), l = bt(s - o), r = bt(i - o), c = bt(o - s), d = bt(o - i);
  return o === s || o === i || a && s === i || l > r && c < d;
}
function Ze(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function mr(e) {
  return Ze(e, -32768, 32767);
}
function zt(e, t, n, a = 1e-6) {
  return e >= Math.min(t, n) - a && e <= Math.max(t, n) + a;
}
function so(e, t, n) {
  n = n || ((i) => e[i] < t);
  let a = e.length - 1, o = 0, s;
  for (; a - o > 1; )
    s = o + a >> 1, n(s) ? o = s : a = s;
  return {
    lo: o,
    hi: a
  };
}
const on = (e, t, n, a) => so(e, n, a ? (o) => {
  const s = e[o][t];
  return s < n || s === n && e[o + 1][t] === n;
} : (o) => e[o][t] < n), br = (e, t, n) => so(e, n, (a) => e[a][t] >= n);
function vr(e, t, n) {
  let a = 0, o = e.length;
  for (; a < o && e[a] < t; )
    a++;
  for (; o > a && e[o - 1] > n; )
    o--;
  return a > 0 || o < e.length ? e.slice(a, o) : e;
}
const pi = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function yr(e, t) {
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
  }), pi.forEach((n) => {
    const a = "_onData" + oo(n), o = e[n];
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
function Vo(e, t) {
  const n = e._chartjs;
  if (!n)
    return;
  const a = n.listeners, o = a.indexOf(t);
  o !== -1 && a.splice(o, 1), !(a.length > 0) && (pi.forEach((s) => {
    delete e[s];
  }), delete e._chartjs);
}
function mi(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const bi = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function vi(e, t) {
  let n = [], a = !1;
  return function(...o) {
    n = o, a || (a = !0, bi.call(window, () => {
      a = !1, e.apply(t, n);
    }));
  };
}
function xr(e, t) {
  let n;
  return function(...a) {
    return t ? (clearTimeout(n), n = setTimeout(e, t, a)) : e.apply(this, a), t;
  };
}
const io = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", Xe = (e, t, n) => e === "start" ? t : e === "end" ? n : (t + n) / 2, _r = (e, t, n, a) => e === (a ? "left" : "right") ? n : e === "center" ? (t + n) / 2 : t;
function kr(e, t, n) {
  const a = t.length;
  let o = 0, s = a;
  if (e._sorted) {
    const { iScale: i, vScale: l, _parsed: r } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, d = i.axis, { min: h, max: f, minDefined: b, maxDefined: g } = i.getUserBounds();
    if (b) {
      if (o = Math.min(
        // @ts-expect-error Need to type _parsed
        on(r, d, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? a : on(t, d, i.getPixelForValue(h)).lo
      ), c) {
        const m = r.slice(0, o + 1).reverse().findIndex((v) => !Pe(v[l.axis]));
        o -= Math.max(0, m);
      }
      o = Ze(o, 0, a - 1);
    }
    if (g) {
      let m = Math.max(
        // @ts-expect-error Need to type _parsed
        on(r, i.axis, f, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? 0 : on(t, d, i.getPixelForValue(f), !0).hi + 1
      );
      if (c) {
        const v = r.slice(m - 1).findIndex((p) => !Pe(p[l.axis]));
        m += Math.max(0, v);
      }
      s = Ze(m, o, a) - o;
    } else
      s = a - o;
  }
  return {
    start: o,
    count: s
  };
}
function wr(e) {
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
const ea = (e) => e === 0 || e === 1, zo = (e, t, n) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * ze / n)), No = (e, t, n) => Math.pow(2, -10 * e) * Math.sin((e - t) * ze / n) + 1, Fn = {
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
  easeInSine: (e) => -Math.cos(e * qe) + 1,
  easeOutSine: (e) => Math.sin(e * qe),
  easeInOutSine: (e) => -0.5 * (Math.cos(Ie * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => ea(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => ea(e) ? e : zo(e, 0.075, 0.3),
  easeOutElastic: (e) => ea(e) ? e : No(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return ea(e) ? e : e < 0.5 ? 0.5 * zo(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * No(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - Fn.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? Fn.easeInBounce(e * 2) * 0.5 : Fn.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function lo(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Ho(e) {
  return lo(e) ? e : new zn(e);
}
function Ba(e) {
  return lo(e) ? e : new zn(e).saturate(0.5).darken(0.1).hexString();
}
const Cr = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], $r = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Sr(e) {
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
      properties: $r
    },
    numbers: {
      type: "number",
      properties: Cr
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
function Mr(e) {
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
const jo = /* @__PURE__ */ new Map();
function Dr(e, t) {
  t = t || {};
  const n = e + JSON.stringify(t);
  let a = jo.get(n);
  return a || (a = new Intl.NumberFormat(e, t), jo.set(n, a)), a;
}
function ro(e, t, n) {
  return Dr(t, n).format(e);
}
const Tr = {
  values(e) {
    return Ue(e) ? e : "" + e;
  },
  numeric(e, t, n) {
    if (e === 0)
      return "0";
    const a = this.chart.options.locale;
    let o, s = e;
    if (n.length > 1) {
      const c = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
      (c < 1e-4 || c > 1e15) && (o = "scientific"), s = Ar(e, n);
    }
    const i = fi(Math.abs(s)), l = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), r = {
      notation: o,
      minimumFractionDigits: l,
      maximumFractionDigits: l
    };
    return Object.assign(r, this.options.ticks.format), ro(e, a, r);
  }
};
function Ar(e, t) {
  let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var yi = {
  formatters: Tr
};
function Br(e) {
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
      callback: yi.formatters.values,
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
const dn = /* @__PURE__ */ Object.create(null), Xa = /* @__PURE__ */ Object.create(null);
function On(e, t) {
  if (!t)
    return e;
  const n = t.split(".");
  for (let a = 0, o = n.length; a < o; ++a) {
    const s = n[a];
    e = e[s] || (e[s] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function La(e, t, n) {
  return typeof t == "string" ? Nn(On(e, t), n) : Nn(On(e, ""), t);
}
class Lr {
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
    }, this.hover = {}, this.hoverBackgroundColor = (a, o) => Ba(o.backgroundColor), this.hoverBorderColor = (a, o) => Ba(o.borderColor), this.hoverColor = (a, o) => Ba(o.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(n);
  }
  set(t, n) {
    return La(this, t, n);
  }
  get(t) {
    return On(this, t);
  }
  describe(t, n) {
    return La(Xa, t, n);
  }
  override(t, n) {
    return La(dn, t, n);
  }
  route(t, n, a, o) {
    const s = On(this, t), i = On(this, a), l = "_" + n;
    Object.defineProperties(s, {
      [l]: {
        value: s[n],
        writable: !0
      },
      [n]: {
        enumerable: !0,
        get() {
          const r = this[l], c = i[o];
          return Ae(r) ? Object.assign({}, c, r) : we(r, c);
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
var je = /* @__PURE__ */ new Lr({
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
  Sr,
  Mr,
  Br
]);
function Pr(e) {
  return !e || Pe(e.size) || Pe(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function Wo(e, t, n, a, o) {
  let s = t[o];
  return s || (s = t[o] = e.measureText(o).width, n.push(o)), s > a && (a = s), a;
}
function Jt(e, t, n) {
  const a = e.currentDevicePixelRatio, o = n !== 0 ? Math.max(n / 2, 0.5) : 0;
  return Math.round((t - o) * a) / a + o;
}
function Ko(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Ga(e, t, n, a) {
  xi(e, t, n, a, null);
}
function xi(e, t, n, a, o) {
  let s, i, l, r, c, d, h, f;
  const b = t.pointStyle, g = t.rotation, m = t.radius;
  let v = (g || 0) * cr;
  if (b && typeof b == "object" && (s = b.toString(), s === "[object HTMLImageElement]" || s === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(n, a), e.rotate(v), e.drawImage(b, -b.width / 2, -b.height / 2, b.width, b.height), e.restore();
    return;
  }
  if (!(isNaN(m) || m <= 0)) {
    switch (e.beginPath(), b) {
      // Default includes circle
      default:
        o ? e.ellipse(n, a, o / 2, m, 0, 0, ze) : e.arc(n, a, m, 0, ze), e.closePath();
        break;
      case "triangle":
        d = o ? o / 2 : m, e.moveTo(n + Math.sin(v) * d, a - Math.cos(v) * m), v += Eo, e.lineTo(n + Math.sin(v) * d, a - Math.cos(v) * m), v += Eo, e.lineTo(n + Math.sin(v) * d, a - Math.cos(v) * m), e.closePath();
        break;
      case "rectRounded":
        c = m * 0.516, r = m - c, i = Math.cos(v + Qt) * r, h = Math.cos(v + Qt) * (o ? o / 2 - c : r), l = Math.sin(v + Qt) * r, f = Math.sin(v + Qt) * (o ? o / 2 - c : r), e.arc(n - h, a - l, c, v - Ie, v - qe), e.arc(n + f, a - i, c, v - qe, v), e.arc(n + h, a + l, c, v, v + qe), e.arc(n - f, a + i, c, v + qe, v + Ie), e.closePath();
        break;
      case "rect":
        if (!g) {
          r = Math.SQRT1_2 * m, d = o ? o / 2 : r, e.rect(n - d, a - r, 2 * d, 2 * r);
          break;
        }
        v += Qt;
      /* falls through */
      case "rectRot":
        h = Math.cos(v) * (o ? o / 2 : m), i = Math.cos(v) * m, l = Math.sin(v) * m, f = Math.sin(v) * (o ? o / 2 : m), e.moveTo(n - h, a - l), e.lineTo(n + f, a - i), e.lineTo(n + h, a + l), e.lineTo(n - f, a + i), e.closePath();
        break;
      case "crossRot":
        v += Qt;
      /* falls through */
      case "cross":
        h = Math.cos(v) * (o ? o / 2 : m), i = Math.cos(v) * m, l = Math.sin(v) * m, f = Math.sin(v) * (o ? o / 2 : m), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + f, a - i), e.lineTo(n - f, a + i);
        break;
      case "star":
        h = Math.cos(v) * (o ? o / 2 : m), i = Math.cos(v) * m, l = Math.sin(v) * m, f = Math.sin(v) * (o ? o / 2 : m), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + f, a - i), e.lineTo(n - f, a + i), v += Qt, h = Math.cos(v) * (o ? o / 2 : m), i = Math.cos(v) * m, l = Math.sin(v) * m, f = Math.sin(v) * (o ? o / 2 : m), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + f, a - i), e.lineTo(n - f, a + i);
        break;
      case "line":
        i = o ? o / 2 : Math.cos(v) * m, l = Math.sin(v) * m, e.moveTo(n - i, a - l), e.lineTo(n + i, a + l);
        break;
      case "dash":
        e.moveTo(n, a), e.lineTo(n + Math.cos(v) * (o ? o / 2 : m), a + Math.sin(v) * m);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function Kn(e, t, n) {
  return n = n || 0.5, !t || e && e.x > t.left - n && e.x < t.right + n && e.y > t.top - n && e.y < t.bottom + n;
}
function co(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function uo(e) {
  e.restore();
}
function Rr(e, t, n, a, o) {
  if (!t)
    return e.lineTo(n.x, n.y);
  if (o === "middle") {
    const s = (t.x + n.x) / 2;
    e.lineTo(s, t.y), e.lineTo(s, n.y);
  } else o === "after" != !!a ? e.lineTo(t.x, n.y) : e.lineTo(n.x, t.y);
  e.lineTo(n.x, n.y);
}
function Ir(e, t, n, a) {
  if (!t)
    return e.lineTo(n.x, n.y);
  e.bezierCurveTo(a ? t.cp1x : t.cp2x, a ? t.cp1y : t.cp2y, a ? n.cp2x : n.cp1x, a ? n.cp2y : n.cp1y, n.x, n.y);
}
function Er(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), Pe(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function Fr(e, t, n, a, o) {
  if (o.strikethrough || o.underline) {
    const s = e.measureText(a), i = t - s.actualBoundingBoxLeft, l = t + s.actualBoundingBoxRight, r = n - s.actualBoundingBoxAscent, c = n + s.actualBoundingBoxDescent, d = o.strikethrough ? (r + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = o.decorationWidth || 2, e.moveTo(i, d), e.lineTo(l, d), e.stroke();
  }
}
function Or(e, t) {
  const n = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = n;
}
function Yn(e, t, n, a, o, s = {}) {
  const i = Ue(t) ? t : [
    t
  ], l = s.strokeWidth > 0 && s.strokeColor !== "";
  let r, c;
  for (e.save(), e.font = o.string, Er(e, s), r = 0; r < i.length; ++r)
    c = i[r], s.backdrop && Or(e, s.backdrop), l && (s.strokeColor && (e.strokeStyle = s.strokeColor), Pe(s.strokeWidth) || (e.lineWidth = s.strokeWidth), e.strokeText(c, n, a, s.maxWidth)), e.fillText(c, n, a, s.maxWidth), Fr(e, n, a, c, s), a += Number(o.lineHeight);
  e.restore();
}
function ba(e, t) {
  const { x: n, y: a, w: o, h: s, radius: i } = t;
  e.arc(n + i.topLeft, a + i.topLeft, i.topLeft, 1.5 * Ie, Ie, !0), e.lineTo(n, a + s - i.bottomLeft), e.arc(n + i.bottomLeft, a + s - i.bottomLeft, i.bottomLeft, Ie, qe, !0), e.lineTo(n + o - i.bottomRight, a + s), e.arc(n + o - i.bottomRight, a + s - i.bottomRight, i.bottomRight, qe, 0, !0), e.lineTo(n + o, a + i.topRight), e.arc(n + o - i.topRight, a + i.topRight, i.topRight, 0, -qe, !0), e.lineTo(n + i.topLeft, a);
}
const Vr = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, zr = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Nr(e, t) {
  const n = ("" + e).match(Vr);
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
const Hr = (e) => +e || 0;
function ho(e, t) {
  const n = {}, a = Ae(t), o = a ? Object.keys(t) : t, s = Ae(e) ? a ? (i) => we(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of o)
    n[i] = Hr(s(i));
  return n;
}
function _i(e) {
  return ho(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function vn(e) {
  return ho(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function pt(e) {
  const t = _i(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function Qe(e, t) {
  e = e || {}, t = t || je.font;
  let n = we(e.size, t.size);
  typeof n == "string" && (n = parseInt(n, 10));
  let a = we(e.style, t.style);
  a && !("" + a).match(zr) && (console.warn('Invalid font style specified: "' + a + '"'), a = void 0);
  const o = {
    family: we(e.family, t.family),
    lineHeight: Nr(we(e.lineHeight, t.lineHeight), n),
    size: n,
    style: a,
    weight: we(e.weight, t.weight),
    string: ""
  };
  return o.string = Pr(o), o;
}
function ta(e, t, n, a) {
  let o, s, i;
  for (o = 0, s = e.length; o < s; ++o)
    if (i = e[o], i !== void 0 && i !== void 0)
      return i;
}
function jr(e, t, n) {
  const { min: a, max: o } = e, s = ui(t, (o - a) / 2), i = (l, r) => n && l === 0 ? 0 : l + r;
  return {
    min: i(a, -Math.abs(s)),
    max: i(o, s)
  };
}
function hn(e, t) {
  return Object.assign(Object.create(e), t);
}
function fo(e, t = [
  ""
], n, a, o = () => e[0]) {
  const s = n || e;
  typeof a > "u" && (a = $i("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: s,
    _fallback: a,
    _getTarget: o,
    override: (l) => fo([
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
      return wi(l, r, () => Zr(r, t, e, l));
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
      return Uo(l).includes(r);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(l) {
      return Uo(l);
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
function _n(e, t, n, a) {
  const o = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: n,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: ki(e, a),
    setContext: (s) => _n(e, s, n, a),
    override: (s) => _n(e.override(s), t, n, a)
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
      return wi(s, i, () => Kr(s, i, l));
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
function ki(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: n = t.scriptable, _indexable: a = t.indexable, _allKeys: o = t.allKeys } = e;
  return {
    allKeys: o,
    scriptable: n,
    indexable: a,
    isScriptable: Ut(n) ? n : () => n,
    isIndexable: Ut(a) ? a : () => a
  };
}
const Wr = (e, t) => e ? e + oo(t) : t, go = (e, t) => Ae(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function wi(e, t, n) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const a = n();
  return e[t] = a, a;
}
function Kr(e, t, n) {
  const { _proxy: a, _context: o, _subProxy: s, _descriptors: i } = e;
  let l = a[t];
  return Ut(l) && i.isScriptable(t) && (l = Yr(t, l, e, n)), Ue(l) && l.length && (l = Ur(t, l, e, i.isIndexable)), go(t, l) && (l = _n(l, o, s && s[t], i)), l;
}
function Yr(e, t, n, a) {
  const { _proxy: o, _context: s, _subProxy: i, _stack: l } = n;
  if (l.has(e))
    throw new Error("Recursion detected: " + Array.from(l).join("->") + "->" + e);
  l.add(e);
  let r = t(s, i || a);
  return l.delete(e), go(e, r) && (r = po(o._scopes, o, e, r)), r;
}
function Ur(e, t, n, a) {
  const { _proxy: o, _context: s, _subProxy: i, _descriptors: l } = n;
  if (typeof s.index < "u" && a(e))
    return t[s.index % t.length];
  if (Ae(t[0])) {
    const r = t, c = o._scopes.filter((d) => d !== r);
    t = [];
    for (const d of r) {
      const h = po(c, o, e, d);
      t.push(_n(h, s, i && i[e], l));
    }
  }
  return t;
}
function Ci(e, t, n) {
  return Ut(e) ? e(t, n) : e;
}
const qr = (e, t) => e === !0 ? t : typeof e == "string" ? cn(t, e) : void 0;
function Xr(e, t, n, a, o) {
  for (const s of t) {
    const i = qr(n, s);
    if (i) {
      e.add(i);
      const l = Ci(i._fallback, n, o);
      if (typeof l < "u" && l !== n && l !== a)
        return l;
    } else if (i === !1 && typeof a < "u" && n !== a)
      return null;
  }
  return !1;
}
function po(e, t, n, a) {
  const o = t._rootScopes, s = Ci(t._fallback, n, a), i = [
    ...e,
    ...o
  ], l = /* @__PURE__ */ new Set();
  l.add(a);
  let r = Yo(l, i, n, s || n, a);
  return r === null || typeof s < "u" && s !== n && (r = Yo(l, i, s, r, a), r === null) ? !1 : fo(Array.from(l), [
    ""
  ], o, s, () => Gr(t, n, a));
}
function Yo(e, t, n, a, o) {
  for (; n; )
    n = Xr(e, t, n, a, o);
  return n;
}
function Gr(e, t, n) {
  const a = e._getTarget();
  t in a || (a[t] = {});
  const o = a[t];
  return Ue(o) && Ae(n) ? n : o || {};
}
function Zr(e, t, n, a) {
  let o;
  for (const s of t)
    if (o = $i(Wr(s, e), n), typeof o < "u")
      return go(e, o) ? po(n, a, e, o) : o;
}
function $i(e, t) {
  for (const n of t) {
    if (!n)
      continue;
    const a = n[e];
    if (typeof a < "u")
      return a;
  }
}
function Uo(e) {
  let t = e._keys;
  return t || (t = e._keys = Qr(e._scopes)), t;
}
function Qr(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e)
    for (const a of Object.keys(n).filter((o) => !o.startsWith("_")))
      t.add(a);
  return Array.from(t);
}
const Jr = Number.EPSILON || 1e-14, kn = (e, t) => t < e.length && !e[t].skip && e[t], Si = (e) => e === "x" ? "y" : "x";
function ec(e, t, n, a) {
  const o = e.skip ? t : e, s = t, i = n.skip ? t : n, l = qa(s, o), r = qa(i, s);
  let c = l / (l + r), d = r / (l + r);
  c = isNaN(c) ? 0 : c, d = isNaN(d) ? 0 : d;
  const h = a * c, f = a * d;
  return {
    previous: {
      x: s.x - h * (i.x - o.x),
      y: s.y - h * (i.y - o.y)
    },
    next: {
      x: s.x + f * (i.x - o.x),
      y: s.y + f * (i.y - o.y)
    }
  };
}
function tc(e, t, n) {
  const a = e.length;
  let o, s, i, l, r, c = kn(e, 0);
  for (let d = 0; d < a - 1; ++d)
    if (r = c, c = kn(e, d + 1), !(!r || !c)) {
      if (En(t[d], 0, Jr)) {
        n[d] = n[d + 1] = 0;
        continue;
      }
      o = n[d] / t[d], s = n[d + 1] / t[d], l = Math.pow(o, 2) + Math.pow(s, 2), !(l <= 9) && (i = 3 / Math.sqrt(l), n[d] = o * i * t[d], n[d + 1] = s * i * t[d]);
    }
}
function nc(e, t, n = "x") {
  const a = Si(n), o = e.length;
  let s, i, l, r = kn(e, 0);
  for (let c = 0; c < o; ++c) {
    if (i = l, l = r, r = kn(e, c + 1), !l)
      continue;
    const d = l[n], h = l[a];
    i && (s = (d - i[n]) / 3, l[`cp1${n}`] = d - s, l[`cp1${a}`] = h - s * t[c]), r && (s = (r[n] - d) / 3, l[`cp2${n}`] = d + s, l[`cp2${a}`] = h + s * t[c]);
  }
}
function ac(e, t = "x") {
  const n = Si(t), a = e.length, o = Array(a).fill(0), s = Array(a);
  let i, l, r, c = kn(e, 0);
  for (i = 0; i < a; ++i)
    if (l = r, r = c, c = kn(e, i + 1), !!r) {
      if (c) {
        const d = c[t] - r[t];
        o[i] = d !== 0 ? (c[n] - r[n]) / d : 0;
      }
      s[i] = l ? c ? $t(o[i - 1]) !== $t(o[i]) ? 0 : (o[i - 1] + o[i]) / 2 : o[i - 1] : o[i];
    }
  tc(e, o, s), nc(e, s, t);
}
function na(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
function oc(e, t) {
  let n, a, o, s, i, l = Kn(e[0], t);
  for (n = 0, a = e.length; n < a; ++n)
    i = s, s = l, l = n < a - 1 && Kn(e[n + 1], t), s && (o = e[n], i && (o.cp1x = na(o.cp1x, t.left, t.right), o.cp1y = na(o.cp1y, t.top, t.bottom)), l && (o.cp2x = na(o.cp2x, t.left, t.right), o.cp2y = na(o.cp2y, t.top, t.bottom)));
}
function sc(e, t, n, a, o) {
  let s, i, l, r;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    ac(e, o);
  else {
    let c = a ? e[e.length - 1] : e[0];
    for (s = 0, i = e.length; s < i; ++s)
      l = e[s], r = ec(c, l, e[Math.min(s + 1, i - (a ? 0 : 1)) % i], t.tension), l.cp1x = r.previous.x, l.cp1y = r.previous.y, l.cp2x = r.next.x, l.cp2y = r.next.y, c = l;
  }
  t.capBezierPoints && oc(e, n);
}
function mo() {
  return typeof window < "u" && typeof document < "u";
}
function bo(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function va(e, t, n) {
  let a;
  return typeof e == "string" ? (a = parseInt(e, 10), e.indexOf("%") !== -1 && (a = a / 100 * t.parentNode[n])) : a = e, a;
}
const Ca = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function ic(e, t) {
  return Ca(e).getPropertyValue(t);
}
const lc = [
  "top",
  "right",
  "bottom",
  "left"
];
function ln(e, t, n) {
  const a = {};
  n = n ? "-" + n : "";
  for (let o = 0; o < 4; o++) {
    const s = lc[o];
    a[s] = parseFloat(e[t + "-" + s + n]) || 0;
  }
  return a.width = a.left + a.right, a.height = a.top + a.bottom, a;
}
const rc = (e, t, n) => (e > 0 || t > 0) && (!n || !n.shadowRoot);
function cc(e, t) {
  const n = e.touches, a = n && n.length ? n[0] : e, { offsetX: o, offsetY: s } = a;
  let i = !1, l, r;
  if (rc(o, s, e.target))
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
function nn(e, t) {
  if ("native" in e)
    return e;
  const { canvas: n, currentDevicePixelRatio: a } = t, o = Ca(n), s = o.boxSizing === "border-box", i = ln(o, "padding"), l = ln(o, "border", "width"), { x: r, y: c, box: d } = cc(e, n), h = i.left + (d && l.left), f = i.top + (d && l.top);
  let { width: b, height: g } = t;
  return s && (b -= i.width + l.width, g -= i.height + l.height), {
    x: Math.round((r - h) / b * n.width / a),
    y: Math.round((c - f) / g * n.height / a)
  };
}
function dc(e, t, n) {
  let a, o;
  if (t === void 0 || n === void 0) {
    const s = e && bo(e);
    if (!s)
      t = e.clientWidth, n = e.clientHeight;
    else {
      const i = s.getBoundingClientRect(), l = Ca(s), r = ln(l, "border", "width"), c = ln(l, "padding");
      t = i.width - c.width - r.width, n = i.height - c.height - r.height, a = va(l.maxWidth, s, "clientWidth"), o = va(l.maxHeight, s, "clientHeight");
    }
  }
  return {
    width: t,
    height: n,
    maxWidth: a || ma,
    maxHeight: o || ma
  };
}
const Nt = (e) => Math.round(e * 10) / 10;
function uc(e, t, n, a) {
  const o = Ca(e), s = ln(o, "margin"), i = va(o.maxWidth, e, "clientWidth") || ma, l = va(o.maxHeight, e, "clientHeight") || ma, r = dc(e, t, n);
  let { width: c, height: d } = r;
  if (o.boxSizing === "content-box") {
    const f = ln(o, "border", "width"), b = ln(o, "padding");
    c -= b.width + f.width, d -= b.height + f.height;
  }
  return c = Math.max(0, c - s.width), d = Math.max(0, a ? c / a : d - s.height), c = Nt(Math.min(c, i, r.maxWidth)), d = Nt(Math.min(d, l, r.maxHeight)), c && !d && (d = Nt(c / 2)), (t !== void 0 || n !== void 0) && a && r.height && d > r.height && (d = r.height, c = Nt(Math.floor(d * a))), {
    width: c,
    height: d
  };
}
function qo(e, t, n) {
  const a = t || 1, o = Nt(e.height * a), s = Nt(e.width * a);
  e.height = Nt(e.height), e.width = Nt(e.width);
  const i = e.canvas;
  return i.style && (n || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== a || i.height !== o || i.width !== s ? (e.currentDevicePixelRatio = a, i.height = o, i.width = s, e.ctx.setTransform(a, 0, 0, a, 0, 0), !0) : !1;
}
const hc = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    mo() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function Xo(e, t) {
  const n = ic(e, t), a = n && n.match(/^(\d+)(\.\d+)?px$/);
  return a ? +a[1] : void 0;
}
function an(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: e.y + n * (t.y - e.y)
  };
}
function fc(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: a === "middle" ? n < 0.5 ? e.y : t.y : a === "after" ? n < 1 ? e.y : t.y : n > 0 ? t.y : e.y
  };
}
function gc(e, t, n, a) {
  const o = {
    x: e.cp2x,
    y: e.cp2y
  }, s = {
    x: t.cp1x,
    y: t.cp1y
  }, i = an(e, o, n), l = an(o, s, n), r = an(s, t, n), c = an(i, l, n), d = an(l, r, n);
  return an(c, d, n);
}
const pc = function(e, t) {
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
}, mc = function() {
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
function yn(e, t, n) {
  return e ? pc(t, n) : mc();
}
function Mi(e, t) {
  let n, a;
  (t === "ltr" || t === "rtl") && (n = e.canvas.style, a = [
    n.getPropertyValue("direction"),
    n.getPropertyPriority("direction")
  ], n.setProperty("direction", t, "important"), e.prevTextDirection = a);
}
function Di(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function Ti(e) {
  return e === "angle" ? {
    between: Wn,
    compare: pr,
    normalize: bt
  } : {
    between: zt,
    compare: (t, n) => t - n,
    normalize: (t) => t
  };
}
function Go({ start: e, end: t, count: n, loop: a, style: o }) {
  return {
    start: e % n,
    end: t % n,
    loop: a && (t - e + 1) % n === 0,
    style: o
  };
}
function bc(e, t, n) {
  const { property: a, start: o, end: s } = n, { between: i, normalize: l } = Ti(a), r = t.length;
  let { start: c, end: d, loop: h } = e, f, b;
  if (h) {
    for (c += r, d += r, f = 0, b = r; f < b && i(l(t[c % r][a]), o, s); ++f)
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
function vc(e, t, n) {
  if (!n)
    return [
      e
    ];
  const { property: a, start: o, end: s } = n, i = t.length, { compare: l, between: r, normalize: c } = Ti(a), { start: d, end: h, loop: f, style: b } = bc(e, t, n), g = [];
  let m = !1, v = null, p, x, _;
  const w = () => r(o, _, p) && l(o, _) !== 0, $ = () => l(s, p) === 0 || r(s, _, p), S = () => m || w(), M = () => !m || $();
  for (let O = d, j = d; O <= h; ++O)
    x = t[O % i], !x.skip && (p = c(x[a]), p !== _ && (m = r(p, o, s), v === null && S() && (v = l(p, o) === 0 ? O : j), v !== null && M() && (g.push(Go({
      start: v,
      end: O,
      loop: f,
      count: i,
      style: b
    })), v = null), j = O, _ = p));
  return v !== null && g.push(Go({
    start: v,
    end: h,
    loop: f,
    count: i,
    style: b
  })), g;
}
function yc(e, t) {
  const n = [], a = e.segments;
  for (let o = 0; o < a.length; o++) {
    const s = vc(a[o], e.points, t);
    s.length && n.push(...s);
  }
  return n;
}
function xc(e, t, n, a) {
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
function _c(e, t, n, a) {
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
function kc(e, t) {
  const n = e.points, a = e.options.spanGaps, o = n.length;
  if (!o)
    return [];
  const s = !!e._loop, { start: i, end: l } = xc(n, o, s, a);
  if (a === !0)
    return Zo(e, [
      {
        start: i,
        end: l,
        loop: s
      }
    ], n, t);
  const r = l < i ? l + o : l, c = !!e._fullLoop && i === 0 && l === o - 1;
  return Zo(e, _c(n, i, r, c), n, t);
}
function Zo(e, t, n, a) {
  return !a || !a.setContext || !n ? t : wc(e, t, n, a);
}
function wc(e, t, n, a) {
  const o = e._chart.getContext(), s = Qo(e.options), { _datasetIndex: i, options: { spanGaps: l } } = e, r = n.length, c = [];
  let d = s, h = t[0].start, f = h;
  function b(g, m, v, p) {
    const x = l ? -1 : 1;
    if (g !== m) {
      for (g += r; n[g % r].skip; )
        g -= x;
      for (; n[m % r].skip; )
        m += x;
      g % r !== m % r && (c.push({
        start: g % r,
        end: m % r,
        loop: v,
        style: p
      }), d = p, h = m % r);
    }
  }
  for (const g of t) {
    h = l ? h : g.start;
    let m = n[h % r], v;
    for (f = h + 1; f <= g.end; f++) {
      const p = n[f % r];
      v = Qo(a.setContext(hn(o, {
        type: "segment",
        p0: m,
        p1: p,
        p0DataIndex: (f - 1) % r,
        p1DataIndex: f % r,
        datasetIndex: i
      }))), Cc(v, d) && b(h, f - 1, g.loop, d), m = p, d = v;
    }
    h < f - 1 && b(h, f - 1, g.loop, d);
  }
  return c;
}
function Qo(e) {
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
function Cc(e, t) {
  if (!t)
    return !1;
  const n = [], a = function(o, s) {
    return lo(s) ? (n.includes(s) || n.push(s), n.indexOf(s)) : s;
  };
  return JSON.stringify(e, a) !== JSON.stringify(t, a);
}
function aa(e, t, n) {
  return e.options.clip ? e[n] : t[n];
}
function $c(e, t) {
  const { xScale: n, yScale: a } = e;
  return n && a ? {
    left: aa(n, t, "left"),
    right: aa(n, t, "right"),
    top: aa(a, t, "top"),
    bottom: aa(a, t, "bottom")
  } : t;
}
function Sc(e, t) {
  const n = t._clip;
  if (n.disabled)
    return !1;
  const a = $c(t, e.chartArea);
  return {
    left: n.left === !1 ? 0 : a.left - (n.left === !0 ? 0 : n.left),
    right: n.right === !1 ? e.width : a.right + (n.right === !0 ? 0 : n.right),
    top: n.top === !1 ? 0 : a.top - (n.top === !0 ? 0 : n.top),
    bottom: n.bottom === !1 ? e.height : a.bottom + (n.bottom === !0 ? 0 : n.bottom)
  };
}
class Mc {
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
    this._request || (this._running = !0, this._request = bi.call(window, () => {
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
var Tt = /* @__PURE__ */ new Mc();
const Jo = "transparent", Dc = {
  boolean(e, t, n) {
    return n > 0.5 ? t : e;
  },
  color(e, t, n) {
    const a = Ho(e || Jo), o = a.valid && Ho(t || Jo);
    return o && o.valid ? o.mix(a, n).hexString() : t;
  },
  number(e, t, n) {
    return e + (t - e) * n;
  }
};
class Tc {
  constructor(t, n, a, o) {
    const s = n[a];
    o = ta([
      t.to,
      o,
      s,
      t.from
    ]);
    const i = ta([
      t.from,
      s,
      o
    ]);
    this._active = !0, this._fn = t.fn || Dc[t.type || typeof i], this._easing = Fn[t.easing] || Fn.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = n, this._prop = a, this._from = i, this._to = o, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, n, a) {
    if (this._active) {
      this._notify(!1);
      const o = this._target[this._prop], s = a - this._start, i = this._duration - s;
      this._start = a, this._duration = Math.floor(Math.max(i, t.duration)), this._total += s, this._loop = !!t.loop, this._to = ta([
        t.to,
        n,
        o,
        t.from
      ]), this._from = ta([
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
class Ai {
  constructor(t, n) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(n);
  }
  configure(t) {
    if (!Ae(t))
      return;
    const n = Object.keys(je.animation), a = this._properties;
    Object.getOwnPropertyNames(t).forEach((o) => {
      const s = t[o];
      if (!Ae(s))
        return;
      const i = {};
      for (const l of n)
        i[l] = s[l];
      (Ue(s.properties) && s.properties || [
        o
      ]).forEach((l) => {
        (l === o || !a.has(l)) && a.set(l, i);
      });
    });
  }
  _animateOptions(t, n) {
    const a = n.options, o = Bc(t, a);
    if (!o)
      return [];
    const s = this._createAnimations(o, a);
    return a.$shared && Ac(t.options.$animations, a).then(() => {
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
      const f = a.get(c);
      if (h)
        if (f && h.active()) {
          h.update(f, d, l);
          continue;
        } else
          h.cancel();
      if (!f || !f.duration) {
        t[c] = d;
        continue;
      }
      s[c] = h = new Tc(f, t, c, d), o.push(h);
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
      return Tt.add(this._chart, a), !0;
  }
}
function Ac(e, t) {
  const n = [], a = Object.keys(t);
  for (let o = 0; o < a.length; o++) {
    const s = e[a[o]];
    s && s.active() && n.push(s.wait());
  }
  return Promise.all(n);
}
function Bc(e, t) {
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
function es(e, t) {
  const n = e && e.options || {}, a = n.reverse, o = n.min === void 0 ? t : 0, s = n.max === void 0 ? t : 0;
  return {
    start: a ? s : o,
    end: a ? o : s
  };
}
function Lc(e, t, n) {
  if (n === !1)
    return !1;
  const a = es(e, n), o = es(t, n);
  return {
    top: o.end,
    right: a.end,
    bottom: o.start,
    left: a.start
  };
}
function Pc(e) {
  let t, n, a, o;
  return Ae(e) ? (t = e.top, n = e.right, a = e.bottom, o = e.left) : t = n = a = o = e, {
    top: t,
    right: n,
    bottom: a,
    left: o,
    disabled: e === !1
  };
}
function Bi(e, t) {
  const n = [], a = e._getSortedDatasetMetas(t);
  let o, s;
  for (o = 0, s = a.length; o < s; ++o)
    n.push(a[o].index);
  return n;
}
function ts(e, t, n, a = {}) {
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
    c = e.values[r], gt(c) && (s || t === 0 || $t(t) === $t(c)) && (t += c);
  }
  return !d && !a.all ? 0 : t;
}
function Rc(e, t) {
  const { iScale: n, vScale: a } = t, o = n.axis === "x" ? "x" : "y", s = a.axis === "x" ? "x" : "y", i = Object.keys(e), l = new Array(i.length);
  let r, c, d;
  for (r = 0, c = i.length; r < c; ++r)
    d = i[r], l[r] = {
      [o]: d,
      [s]: e[d]
    };
  return l;
}
function Pa(e, t) {
  const n = e && e.options.stacked;
  return n || n === void 0 && t.stack !== void 0;
}
function Ic(e, t, n) {
  return `${e.id}.${t.id}.${n.stack || n.type}`;
}
function Ec(e) {
  const { min: t, max: n, minDefined: a, maxDefined: o } = e.getUserBounds();
  return {
    min: a ? t : Number.NEGATIVE_INFINITY,
    max: o ? n : Number.POSITIVE_INFINITY
  };
}
function Fc(e, t, n) {
  const a = e[t] || (e[t] = {});
  return a[n] || (a[n] = {});
}
function ns(e, t, n, a) {
  for (const o of t.getMatchingVisibleMetas(a).reverse()) {
    const s = e[o.index];
    if (n && s > 0 || !n && s < 0)
      return o.index;
  }
  return null;
}
function as(e, t) {
  const { chart: n, _cachedMeta: a } = e, o = n._stacks || (n._stacks = {}), { iScale: s, vScale: i, index: l } = a, r = s.axis, c = i.axis, d = Ic(s, i, a), h = t.length;
  let f;
  for (let b = 0; b < h; ++b) {
    const g = t[b], { [r]: m, [c]: v } = g, p = g._stacks || (g._stacks = {});
    f = p[c] = Fc(o, d, m), f[l] = v, f._top = ns(f, i, !0, a.type), f._bottom = ns(f, i, !1, a.type);
    const x = f._visualValues || (f._visualValues = {});
    x[l] = v;
  }
}
function Ra(e, t) {
  const n = e.scales;
  return Object.keys(n).filter((a) => n[a].axis === t).shift();
}
function Oc(e, t) {
  return hn(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function Vc(e, t, n) {
  return hn(e, {
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
function Cn(e, t) {
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
const Ia = (e) => e === "reset" || e === "none", os = (e, t) => t ? e : Object.assign({}, e), zc = (e, t, n) => e && !t.hidden && t._stacked && {
  keys: Bi(n, !0),
  values: null
};
class $a {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, n) {
    this.chart = t, this._ctx = t.ctx, this.index = n, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = Pa(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && Cn(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, n = this._cachedMeta, a = this.getDataset(), o = (h, f, b, g) => h === "x" ? f : h === "r" ? g : b, s = n.xAxisID = we(a.xAxisID, Ra(t, "x")), i = n.yAxisID = we(a.yAxisID, Ra(t, "y")), l = n.rAxisID = we(a.rAxisID, Ra(t, "r")), r = n.indexAxis, c = n.iAxisID = o(r, s, i, l), d = n.vAxisID = o(r, i, s, l);
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
    this._data && Vo(this._data, this), t._stacked && Cn(t);
  }
  _dataCheck() {
    const t = this.getDataset(), n = t.data || (t.data = []), a = this._data;
    if (Ae(n)) {
      const o = this._cachedMeta;
      this._data = Rc(n, o);
    } else if (a !== n) {
      if (a) {
        Vo(a, this);
        const o = this._cachedMeta;
        Cn(o), o._parsed = [];
      }
      n && Object.isExtensible(n) && yr(n, this), this._syncList = [], this._data = n;
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
    n._stacked = Pa(n.vScale, n), n.stack !== a.stack && (o = !0, Cn(n), n.stack = a.stack), this._resyncElements(t), (o || s !== n._stacked) && (as(this, n._parsed), n._stacked = Pa(n.vScale, n));
  }
  configure() {
    const t = this.chart.config, n = t.datasetScopeKeys(this._type), a = t.getOptionScopes(this.getDataset(), n, !0);
    this.options = t.createResolver(a, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, n) {
    const { _cachedMeta: a, _data: o } = this, { iScale: s, _stacked: i } = a, l = s.axis;
    let r = t === 0 && n === o.length ? !0 : a._sorted, c = t > 0 && a._parsed[t - 1], d, h, f;
    if (this._parsing === !1)
      a._parsed = o, a._sorted = !0, f = o;
    else {
      Ue(o[t]) ? f = this.parseArrayData(a, o, t, n) : Ae(o[t]) ? f = this.parseObjectData(a, o, t, n) : f = this.parsePrimitiveData(a, o, t, n);
      const b = () => h[l] === null || c && h[l] < c[l];
      for (d = 0; d < n; ++d)
        a._parsed[d + t] = h = f[d], r && (b() && (r = !1), c = h);
      a._sorted = r;
    }
    i && as(this, f);
  }
  parsePrimitiveData(t, n, a, o) {
    const { iScale: s, vScale: i } = t, l = s.axis, r = i.axis, c = s.getLabels(), d = s === i, h = new Array(o);
    let f, b, g;
    for (f = 0, b = o; f < b; ++f)
      g = f + a, h[f] = {
        [l]: d || s.parse(c[g], g),
        [r]: i.parse(n[g], g)
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
    let d, h, f, b;
    for (d = 0, h = o; d < h; ++d)
      f = d + a, b = n[f], c[d] = {
        x: s.parse(cn(b, l), f),
        y: i.parse(cn(b, r), f)
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
      keys: Bi(o, !0),
      values: n._stacks[t.axis]._visualValues
    };
    return ts(l, i, s.index, {
      mode: a
    });
  }
  updateRangeFromParsed(t, n, a, o) {
    const s = a[n.axis];
    let i = s === null ? NaN : s;
    const l = o && a._stacks[n.axis];
    o && l && (o.values = l, i = ts(o, s, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, n) {
    const a = this._cachedMeta, o = a._parsed, s = a._sorted && t === a.iScale, i = o.length, l = this._getOtherScale(t), r = zc(n, a, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: d, max: h } = Ec(l);
    let f, b;
    function g() {
      b = o[f];
      const m = b[l.axis];
      return !gt(b[t.axis]) || d > m || h < m;
    }
    for (f = 0; f < i && !(!g() && (this.updateRangeFromParsed(c, t, b, r), s)); ++f)
      ;
    if (s) {
      for (f = i - 1; f >= 0; --f)
        if (!g()) {
          this.updateRangeFromParsed(c, t, b, r);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const n = this._cachedMeta._parsed, a = [];
    let o, s, i;
    for (o = 0, s = n.length; o < s; ++o)
      i = n[o][t.axis], gt(i) && a.push(i);
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
    this.update(t || "default"), n._clip = Pc(we(this.options.clip, Lc(n.xScale, n.yScale, this.getMaxOverflow())));
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
      s = i.$context || (i.$context = Vc(this.getContext(), t, i)), s.parsed = this.getParsed(t), s.raw = o.data[t], s.index = s.dataIndex = t;
    } else
      s = this.$context || (this.$context = Oc(this.chart.getContext(), this.index)), s.dataset = o, s.index = s.datasetIndex = this.index;
    return s.active = !!n, s.mode = a, s;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, n) {
    return this._resolveElementOptions(this.dataElementType.id, n, t);
  }
  _resolveElementOptions(t, n = "default", a) {
    const o = n === "active", s = this._cachedDataOpts, i = t + "-" + n, l = s[i], r = this.enableOptionSharing && Hn(a);
    if (l)
      return os(l, r);
    const c = this.chart.config, d = c.datasetElementScopeKeys(this._type, t), h = o ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], f = c.getOptionScopes(this.getDataset(), d), b = Object.keys(je.elements[t]), g = () => this.getContext(a, o, n), m = c.resolveNamedOptions(f, b, g, h);
    return m.$shared && (m.$shared = r, s[i] = Object.freeze(os(m, r))), m;
  }
  _resolveAnimations(t, n, a) {
    const o = this.chart, s = this._cachedDataOpts, i = `animation-${n}`, l = s[i];
    if (l)
      return l;
    let r;
    if (o.options.animation !== !1) {
      const d = this.chart.config, h = d.datasetAnimationScopeKeys(this._type, n), f = d.getOptionScopes(this.getDataset(), h);
      r = d.createResolver(f, this.getContext(t, a, n));
    }
    const c = new Ai(o, r && r.animations);
    return r && r._cacheable && (s[i] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, n) {
    return !n || Ia(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, n) {
    const a = this.resolveDataElementOptions(t, n), o = this._sharedOptions, s = this.getSharedOptions(a), i = this.includeOptions(n, s) || s !== o;
    return this.updateSharedOptions(s, n, a), {
      sharedOptions: s,
      includeOptions: i
    };
  }
  updateElement(t, n, a, o) {
    Ia(o) ? Object.assign(t, a) : this._resolveAnimations(n, o).update(t, a);
  }
  updateSharedOptions(t, n, a) {
    t && !Ia(n) && this._resolveAnimations(void 0, n).update(t, a);
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
      a._stacked && Cn(a, o);
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
function Nc(e, t) {
  if (!e._cache.$bar) {
    const n = e.getMatchingVisibleMetas(t);
    let a = [];
    for (let o = 0, s = n.length; o < s; o++)
      a = a.concat(n[o].controller.getAllParsedValues(e));
    e._cache.$bar = mi(a.sort((o, s) => o - s));
  }
  return e._cache.$bar;
}
function Hc(e) {
  const t = e.iScale, n = Nc(t, e.type);
  let a = t._length, o, s, i, l;
  const r = () => {
    i === 32767 || i === -32768 || (Hn(l) && (a = Math.min(a, Math.abs(i - l) || a)), l = i);
  };
  for (o = 0, s = n.length; o < s; ++o)
    i = t.getPixelForValue(n[o]), r();
  for (l = void 0, o = 0, s = t.ticks.length; o < s; ++o)
    i = t.getPixelForTick(o), r();
  return a;
}
function jc(e, t, n, a) {
  const o = n.barThickness;
  let s, i;
  return Pe(o) ? (s = t.min * n.categoryPercentage, i = n.barPercentage) : (s = o * a, i = 1), {
    chunk: s / a,
    ratio: i,
    start: t.pixels[e] - s / 2
  };
}
function Wc(e, t, n, a) {
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
function Kc(e, t, n, a) {
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
function Li(e, t, n, a) {
  return Ue(e) ? Kc(e, t, n, a) : t[n.axis] = n.parse(e, a), t;
}
function ss(e, t, n, a) {
  const o = e.iScale, s = e.vScale, i = o.getLabels(), l = o === s, r = [];
  let c, d, h, f;
  for (c = n, d = n + a; c < d; ++c)
    f = t[c], h = {}, h[o.axis] = l || o.parse(i[c], c), r.push(Li(f, h, s, c));
  return r;
}
function Ea(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function Yc(e, t, n) {
  return e !== 0 ? $t(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= n ? 1 : -1);
}
function Uc(e) {
  let t, n, a, o, s;
  return e.horizontal ? (t = e.base > e.x, n = "left", a = "right") : (t = e.base < e.y, n = "bottom", a = "top"), t ? (o = "end", s = "start") : (o = "start", s = "end"), {
    start: n,
    end: a,
    reverse: t,
    top: o,
    bottom: s
  };
}
function qc(e, t, n, a) {
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
  const { start: i, end: l, reverse: r, top: c, bottom: d } = Uc(e);
  o === "middle" && n && (e.enableBorderRadius = !0, (n._top || 0) === a ? o = c : (n._bottom || 0) === a ? o = d : (s[is(d, i, l, r)] = !0, o = c)), s[is(o, i, l, r)] = !0, e.borderSkipped = s;
}
function is(e, t, n, a) {
  return a ? (e = Xc(e, t, n), e = ls(e, n, t)) : e = ls(e, t, n), e;
}
function Xc(e, t, n) {
  return e === t ? n : e === n ? t : e;
}
function ls(e, t, n) {
  return e === "start" ? t : e === "end" ? n : e;
}
function Gc(e, { inflateAmount: t }, n) {
  e.inflateAmount = t === "auto" ? n === 1 ? 0.33 : 0 : t;
}
class Zc extends $a {
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
    return ss(t, n, a, o);
  }
  parseArrayData(t, n, a, o) {
    return ss(t, n, a, o);
  }
  parseObjectData(t, n, a, o) {
    const { iScale: s, vScale: i } = t, { xAxisKey: l = "x", yAxisKey: r = "y" } = this._parsing, c = s.axis === "x" ? l : r, d = i.axis === "x" ? l : r, h = [];
    let f, b, g, m;
    for (f = a, b = a + o; f < b; ++f)
      m = n[f], g = {}, g[s.axis] = s.parse(cn(m, c), f), h.push(Li(cn(m, d), g, i, f));
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
    const n = this._cachedMeta, { iScale: a, vScale: o } = n, s = this.getParsed(t), i = s._custom, l = Ea(i) ? "[" + i.start + ", " + i.end + "]" : "" + o.getLabelForValue(s[o.axis]);
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
    const s = o === "reset", { index: i, _cachedMeta: { vScale: l } } = this, r = l.getBasePixel(), c = l.isHorizontal(), d = this._getRuler(), { sharedOptions: h, includeOptions: f } = this._getSharedOptions(n, o);
    for (let b = n; b < n + a; b++) {
      const g = this.getParsed(b), m = s || Pe(g[l.axis]) ? {
        base: r,
        head: r
      } : this._calculateBarValuePixels(b), v = this._calculateBarIndexPixels(b, d), p = (g._stacks || {})[l.axis], x = {
        horizontal: c,
        base: m.base,
        enableBorderRadius: !p || Ea(g._custom) || i === p._top || i === p._bottom,
        x: c ? m.head : v.center,
        y: c ? v.center : m.head,
        height: c ? v.size : Math.abs(m.size),
        width: c ? Math.abs(m.size) : v.size
      };
      f && (x.options = h || this.resolveDataElementOptions(b, t[b].active ? "active" : o));
      const _ = x.options || t[b].options;
      qc(x, _, p, i), Gc(x, _, d.ratio), this.updateElement(t[b], b, x, o);
    }
  }
  _getStacks(t, n) {
    const { iScale: a } = this._cachedMeta, o = a.getMatchingVisibleMetas(this._type).filter((d) => d.controller.options.grouped), s = a.options.stacked, i = [], l = this._cachedMeta.controller.getParsed(n), r = l && l[a.axis], c = (d) => {
      const h = d._parsed.find((b) => b[a.axis] === r), f = h && h[d.vScale.axis];
      if (Pe(f) || isNaN(f))
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
      t[we(this.chart.options.indexAxis === "x" ? a.xAxisID : a.yAxisID, n)] = !0;
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
      min: l || Hc(n),
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
    const { _cachedMeta: { vScale: n, _stacked: a, index: o }, options: { base: s, minBarLength: i } } = this, l = s || 0, r = this.getParsed(t), c = r._custom, d = Ea(c);
    let h = r[n.axis], f = 0, b = a ? this.applyStack(n, r, a) : h, g, m;
    b !== h && (f = b - h, b = h), d && (h = c.barStart, b = c.barEnd - c.barStart, h !== 0 && $t(h) !== $t(c.barEnd) && (f = 0), f += h);
    const v = !Pe(s) && !d ? s : f;
    let p = n.getPixelForValue(v);
    if (this.chart.getDataVisibility(t) ? g = n.getPixelForValue(f + b) : g = p, m = g - p, Math.abs(m) < i) {
      m = Yc(m, n, l) * i, h === l && (p -= m / 2);
      const x = n.getPixelForDecimal(0), _ = n.getPixelForDecimal(1), w = Math.min(x, _), $ = Math.max(x, _);
      p = Math.max(Math.min(p, $), w), g = p + m, a && !d && (r._stacks[n.axis]._visualValues[o] = n.getValueForPixel(g) - n.getValueForPixel(p));
    }
    if (p === n.getPixelForValue(l)) {
      const x = $t(m) * n.getLineWidthForValue(l) / 2;
      p += x, m -= x;
    }
    return {
      size: m,
      base: p,
      head: g,
      center: g + m / 2
    };
  }
  _calculateBarIndexPixels(t, n) {
    const a = n.scale, o = this.options, s = o.skipNull, i = we(o.maxBarThickness, 1 / 0);
    let l, r;
    const c = this._getAxisCount();
    if (n.grouped) {
      const d = s ? this._getStackCount(t) : n.stackCount, h = o.barThickness === "flex" ? Wc(t, n, o, d * c) : jc(t, n, o, d * c), f = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, b = this._getAxis().indexOf(we(f, this.getFirstScaleIdForIndexAxis())), g = this._getStackIndex(this.index, this._cachedMeta.stack, s ? t : void 0) + b;
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
    const t = this._cachedMeta, n = t.vScale, a = t.data, o = a.length;
    let s = 0;
    for (; s < o; ++s)
      this.getParsed(s)[n.axis] !== null && !a[s].hidden && a[s].draw(this._ctx);
  }
}
function Qc(e, t, n) {
  let a = 1, o = 1, s = 0, i = 0;
  if (t < ze) {
    const l = e, r = l + t, c = Math.cos(l), d = Math.sin(l), h = Math.cos(r), f = Math.sin(r), b = (_, w, $) => Wn(_, l, r, !0) ? 1 : Math.max(w, w * n, $, $ * n), g = (_, w, $) => Wn(_, l, r, !0) ? -1 : Math.min(w, w * n, $, $ * n), m = b(0, c, h), v = b(qe, d, f), p = g(Ie, c, h), x = g(Ie + qe, d, f);
    a = (m - p) / 2, o = (v - x) / 2, s = -(m + p) / 2, i = -(v + x) / 2;
  }
  return {
    ratioX: a,
    ratioY: o,
    offsetX: s,
    offsetY: i
  };
}
class Jc extends $a {
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
      if (Ae(a[t])) {
        const { key: r = "value" } = this._parsing;
        s = (c) => +cn(a[c], r);
      }
      let i, l;
      for (i = t, l = t + n; i < l; ++i)
        o._parsed[i] = s(i);
    }
  }
  _getRotation() {
    return Pt(this.options.rotation - 90);
  }
  _getCircumference() {
    return Pt(this.options.circumference);
  }
  _getRotationExtents() {
    let t = ze, n = -ze;
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
    const n = this.chart, { chartArea: a } = n, o = this._cachedMeta, s = o.data, i = this.getMaxBorderWidth() + this.getMaxOffset(s) + this.options.spacing, l = Math.max((Math.min(a.width, a.height) - i) / 2, 0), r = Math.min(nr(this.options.cutout, l), 1), c = this._getRingWeight(this.index), { circumference: d, rotation: h } = this._getRotationExtents(), { ratioX: f, ratioY: b, offsetX: g, offsetY: m } = Qc(h, d, r), v = (a.width - i) / f, p = (a.height - i) / b, x = Math.max(Math.min(v, p) / 2, 0), _ = ui(this.options.radius, x), w = Math.max(_ * r, 0), $ = (_ - w) / this._getVisibleDatasetWeightTotal();
    this.offsetX = g * _, this.offsetY = m * _, o.total = this.calculateTotal(), this.outerRadius = _ - $ * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - $ * c, 0), this.updateElements(s, 0, s.length, t);
  }
  _circumference(t, n) {
    const a = this.options, o = this._cachedMeta, s = this._getCircumference();
    return n && a.animation.animateRotate || !this.chart.getDataVisibility(t) || o._parsed[t] === null || o.data[t].hidden ? 0 : this.calculateCircumference(o._parsed[t] * s / ze);
  }
  updateElements(t, n, a, o) {
    const s = o === "reset", i = this.chart, l = i.chartArea, c = i.options.animation, d = (l.left + l.right) / 2, h = (l.top + l.bottom) / 2, f = s && c.animateScale, b = f ? 0 : this.innerRadius, g = f ? 0 : this.outerRadius, { sharedOptions: m, includeOptions: v } = this._getSharedOptions(n, o);
    let p = this._getRotation(), x;
    for (x = 0; x < n; ++x)
      p += this._circumference(x, s);
    for (x = n; x < n + a; ++x) {
      const _ = this._circumference(x, s), w = t[x], $ = {
        x: d + this.offsetX,
        y: h + this.offsetY,
        startAngle: p,
        endAngle: p + _,
        circumference: _,
        outerRadius: g,
        innerRadius: b
      };
      v && ($.options = m || this.resolveDataElementOptions(x, w.active ? "active" : o)), p += _, this.updateElement(w, x, $, o);
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
    return n > 0 && !isNaN(t) ? ze * (Math.abs(t) / n) : 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, a = this.chart, o = a.data.labels || [], s = ro(n._parsed[t], a.options.locale);
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
    return Math.max(we(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class ed extends $a {
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
    let { start: l, count: r } = kr(n, o, i);
    this._drawStart = l, this._drawCount = r, wr(n) && (l = 0, r = o.length), a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!s._decimated, a.points = o;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(a, void 0, {
      animated: !i,
      options: c
    }, t), this.updateElements(o, l, r, t);
  }
  updateElements(t, n, a, o) {
    const s = o === "reset", { iScale: i, vScale: l, _stacked: r, _dataset: c } = this._cachedMeta, { sharedOptions: d, includeOptions: h } = this._getSharedOptions(n, o), f = i.axis, b = l.axis, { spanGaps: g, segment: m } = this.options, v = jn(g) ? g : Number.POSITIVE_INFINITY, p = this.chart._animationsDisabled || s || o === "none", x = n + a, _ = t.length;
    let w = n > 0 && this.getParsed(n - 1);
    for (let $ = 0; $ < _; ++$) {
      const S = t[$], M = p ? S : {};
      if ($ < n || $ >= x) {
        M.skip = !0;
        continue;
      }
      const O = this.getParsed($), j = Pe(O[b]), F = M[f] = i.getPixelForValue(O[f], $), A = M[b] = s || j ? l.getBasePixel() : l.getPixelForValue(r ? this.applyStack(l, O, r) : O[b], $);
      M.skip = isNaN(F) || isNaN(A) || j, M.stop = $ > 0 && Math.abs(O[f] - w[f]) > v, m && (M.parsed = O, M.raw = c.data[$]), h && (M.options = d || this.resolveDataElementOptions($, S.active ? "active" : o)), p || this.updateElement(S, $, M, o), w = O;
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
class td extends Jc {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function en() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class vo {
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
    Object.assign(vo.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return en();
  }
  parse() {
    return en();
  }
  format() {
    return en();
  }
  add() {
    return en();
  }
  diff() {
    return en();
  }
  startOf() {
    return en();
  }
  endOf() {
    return en();
  }
}
var nd = {
  _date: vo
};
function ad(e, t, n, a) {
  const { controller: o, data: s, _sorted: i } = e, l = o._cachedMeta.iScale, r = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (l && t === l.axis && t !== "r" && i && s.length) {
    const c = l._reversePixels ? br : on;
    if (a) {
      if (o._sharedOptions) {
        const d = s[0], h = typeof d.getRange == "function" && d.getRange(t);
        if (h) {
          const f = c(s, t, n - h), b = c(s, t, n + h);
          return {
            lo: f.lo,
            hi: b.hi
          };
        }
      }
    } else {
      const d = c(s, t, n);
      if (r) {
        const { vScale: h } = o._cachedMeta, { _parsed: f } = e, b = f.slice(0, d.lo + 1).reverse().findIndex((m) => !Pe(m[h.axis]));
        d.lo -= Math.max(0, b);
        const g = f.slice(d.hi).findIndex((m) => !Pe(m[h.axis]));
        d.hi += Math.max(0, g);
      }
      return d;
    }
  }
  return {
    lo: 0,
    hi: s.length - 1
  };
}
function Sa(e, t, n, a, o) {
  const s = e.getSortedVisibleDatasetMetas(), i = n[t];
  for (let l = 0, r = s.length; l < r; ++l) {
    const { index: c, data: d } = s[l], { lo: h, hi: f } = ad(s[l], t, i, o);
    for (let b = h; b <= f; ++b) {
      const g = d[b];
      g.skip || a(g, c, b);
    }
  }
}
function od(e) {
  const t = e.indexOf("x") !== -1, n = e.indexOf("y") !== -1;
  return function(a, o) {
    const s = t ? Math.abs(a.x - o.x) : 0, i = n ? Math.abs(a.y - o.y) : 0;
    return Math.sqrt(Math.pow(s, 2) + Math.pow(i, 2));
  };
}
function Fa(e, t, n, a, o) {
  const s = [];
  return !o && !e.isPointInArea(t) || Sa(e, n, t, function(l, r, c) {
    !o && !Kn(l, e.chartArea, 0) || l.inRange(t.x, t.y, a) && s.push({
      element: l,
      datasetIndex: r,
      index: c
    });
  }, !0), s;
}
function sd(e, t, n, a) {
  let o = [];
  function s(i, l, r) {
    const { startAngle: c, endAngle: d } = i.getProps([
      "startAngle",
      "endAngle"
    ], a), { angle: h } = gi(i, {
      x: t.x,
      y: t.y
    });
    Wn(h, c, d) && o.push({
      element: i,
      datasetIndex: l,
      index: r
    });
  }
  return Sa(e, n, t, s), o;
}
function id(e, t, n, a, o, s) {
  let i = [];
  const l = od(n);
  let r = Number.POSITIVE_INFINITY;
  function c(d, h, f) {
    const b = d.inRange(t.x, t.y, o);
    if (a && !b)
      return;
    const g = d.getCenterPoint(o);
    if (!(!!s || e.isPointInArea(g)) && !b)
      return;
    const v = l(t, g);
    v < r ? (i = [
      {
        element: d,
        datasetIndex: h,
        index: f
      }
    ], r = v) : v === r && i.push({
      element: d,
      datasetIndex: h,
      index: f
    });
  }
  return Sa(e, n, t, c), i;
}
function Oa(e, t, n, a, o, s) {
  return !s && !e.isPointInArea(t) ? [] : n === "r" && !a ? sd(e, t, n, o) : id(e, t, n, a, o, s);
}
function rs(e, t, n, a, o) {
  const s = [], i = n === "x" ? "inXRange" : "inYRange";
  let l = !1;
  return Sa(e, n, t, (r, c, d) => {
    r[i] && r[i](t[n], o) && (s.push({
      element: r,
      datasetIndex: c,
      index: d
    }), l = l || r.inRange(t.x, t.y, o));
  }), a && !l ? [] : s;
}
var ld = {
  modes: {
    index(e, t, n, a) {
      const o = nn(t, e), s = n.axis || "x", i = n.includeInvisible || !1, l = n.intersect ? Fa(e, o, s, a, i) : Oa(e, o, s, !1, a, i), r = [];
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
      const o = nn(t, e), s = n.axis || "xy", i = n.includeInvisible || !1;
      let l = n.intersect ? Fa(e, o, s, a, i) : Oa(e, o, s, !1, a, i);
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
      const o = nn(t, e), s = n.axis || "xy", i = n.includeInvisible || !1;
      return Fa(e, o, s, a, i);
    },
    nearest(e, t, n, a) {
      const o = nn(t, e), s = n.axis || "xy", i = n.includeInvisible || !1;
      return Oa(e, o, s, n.intersect, a, i);
    },
    x(e, t, n, a) {
      const o = nn(t, e);
      return rs(e, o, "x", n.intersect, a);
    },
    y(e, t, n, a) {
      const o = nn(t, e);
      return rs(e, o, "y", n.intersect, a);
    }
  }
};
const Pi = [
  "left",
  "top",
  "right",
  "bottom"
];
function $n(e, t) {
  return e.filter((n) => n.pos === t);
}
function cs(e, t) {
  return e.filter((n) => Pi.indexOf(n.pos) === -1 && n.box.axis === t);
}
function Sn(e, t) {
  return e.sort((n, a) => {
    const o = t ? a : n, s = t ? n : a;
    return o.weight === s.weight ? o.index - s.index : o.weight - s.weight;
  });
}
function rd(e) {
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
function cd(e) {
  const t = {};
  for (const n of e) {
    const { stack: a, pos: o, stackWeight: s } = n;
    if (!a || !Pi.includes(o))
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
function dd(e, t) {
  const n = cd(e), { vBoxMaxWidth: a, hBoxMaxHeight: o } = t;
  let s, i, l;
  for (s = 0, i = e.length; s < i; ++s) {
    l = e[s];
    const { fullSize: r } = l.box, c = n[l.stack], d = c && l.stackWeight / c.weight;
    l.horizontal ? (l.width = d ? d * a : r && t.availableWidth, l.height = o) : (l.width = a, l.height = d ? d * o : r && t.availableHeight);
  }
  return n;
}
function ud(e) {
  const t = rd(e), n = Sn(t.filter((c) => c.box.fullSize), !0), a = Sn($n(t, "left"), !0), o = Sn($n(t, "right")), s = Sn($n(t, "top"), !0), i = Sn($n(t, "bottom")), l = cs(t, "x"), r = cs(t, "y");
  return {
    fullSize: n,
    leftAndTop: a.concat(s),
    rightAndBottom: o.concat(r).concat(i).concat(l),
    chartArea: $n(t, "chartArea"),
    vertical: a.concat(o).concat(r),
    horizontal: s.concat(i).concat(l)
  };
}
function ds(e, t, n, a) {
  return Math.max(e[n], t[n]) + Math.max(e[a], t[a]);
}
function Ri(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function hd(e, t, n, a) {
  const { pos: o, box: s } = n, i = e.maxPadding;
  if (!Ae(o)) {
    n.size && (e[o] -= n.size);
    const h = a[n.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, n.horizontal ? s.height : s.width), n.size = h.size / h.count, e[o] += n.size;
  }
  s.getPadding && Ri(i, s.getPadding());
  const l = Math.max(0, t.outerWidth - ds(i, e, "left", "right")), r = Math.max(0, t.outerHeight - ds(i, e, "top", "bottom")), c = l !== e.w, d = r !== e.h;
  return e.w = l, e.h = r, n.horizontal ? {
    same: c,
    other: d
  } : {
    same: d,
    other: c
  };
}
function fd(e) {
  const t = e.maxPadding;
  function n(a) {
    const o = Math.max(t[a] - e[a], 0);
    return e[a] += o, o;
  }
  e.y += n("top"), e.x += n("left"), n("right"), n("bottom");
}
function gd(e, t) {
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
function Pn(e, t, n, a) {
  const o = [];
  let s, i, l, r, c, d;
  for (s = 0, i = e.length, c = 0; s < i; ++s) {
    l = e[s], r = l.box, r.update(l.width || t.w, l.height || t.h, gd(l.horizontal, t));
    const { same: h, other: f } = hd(t, n, l, a);
    c |= h && o.length, d = d || f, r.fullSize || o.push(l);
  }
  return c && Pn(o, t, n, a) || d;
}
function oa(e, t, n, a, o) {
  e.top = n, e.left = t, e.right = t + a, e.bottom = n + o, e.width = a, e.height = o;
}
function us(e, t, n, a) {
  const o = n.padding;
  let { x: s, y: i } = t;
  for (const l of e) {
    const r = l.box, c = a[l.stack] || {
      placed: 0,
      weight: 1
    }, d = l.stackWeight / c.weight || 1;
    if (l.horizontal) {
      const h = t.w * d, f = c.size || r.height;
      Hn(c.start) && (i = c.start), r.fullSize ? oa(r, o.left, i, n.outerWidth - o.right - o.left, f) : oa(r, t.left + c.placed, i, h, f), c.start = i, c.placed += h, i = r.bottom;
    } else {
      const h = t.h * d, f = c.size || r.width;
      Hn(c.start) && (s = c.start), r.fullSize ? oa(r, s, o.top, f, n.outerHeight - o.bottom - o.top) : oa(r, s, t.top + c.placed, f, h), c.start = s, c.placed += h, s = r.right;
    }
  }
  t.x = s, t.y = i;
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
    const o = pt(e.options.layout.padding), s = Math.max(t - o.width, 0), i = Math.max(n - o.height, 0), l = ud(e.boxes), r = l.vertical, c = l.horizontal;
    Re(e.boxes, (m) => {
      typeof m.beforeLayout == "function" && m.beforeLayout();
    });
    const d = r.reduce((m, v) => v.box.options && v.box.options.display === !1 ? m : m + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: n,
      padding: o,
      availableWidth: s,
      availableHeight: i,
      vBoxMaxWidth: s / 2 / d,
      hBoxMaxHeight: i / 2
    }), f = Object.assign({}, o);
    Ri(f, pt(a));
    const b = Object.assign({
      maxPadding: f,
      w: s,
      h: i,
      x: o.left,
      y: o.top
    }, o), g = dd(r.concat(c), h);
    Pn(l.fullSize, b, h, g), Pn(r, b, h, g), Pn(c, b, h, g) && Pn(r, b, h, g), fd(b), us(l.leftAndTop, b, h, g), b.x += b.w, b.y += b.h, us(l.rightAndBottom, b, h, g), e.chartArea = {
      left: b.left,
      top: b.top,
      right: b.left + b.w,
      bottom: b.top + b.h,
      height: b.h,
      width: b.w
    }, Re(l.chartArea, (m) => {
      const v = m.box;
      Object.assign(v, e.chartArea), v.update(b.w, b.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class Ii {
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
class pd extends Ii {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const ha = "$chartjs", md = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, hs = (e) => e === null || e === "";
function bd(e, t) {
  const n = e.style, a = e.getAttribute("height"), o = e.getAttribute("width");
  if (e[ha] = {
    initial: {
      height: a,
      width: o,
      style: {
        display: n.display,
        height: n.height,
        width: n.width
      }
    }
  }, n.display = n.display || "block", n.boxSizing = n.boxSizing || "border-box", hs(o)) {
    const s = Xo(e, "width");
    s !== void 0 && (e.width = s);
  }
  if (hs(a))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const s = Xo(e, "height");
      s !== void 0 && (e.height = s);
    }
  return e;
}
const Ei = hc ? {
  passive: !0
} : !1;
function vd(e, t, n) {
  e && e.addEventListener(t, n, Ei);
}
function yd(e, t, n) {
  e && e.canvas && e.canvas.removeEventListener(t, n, Ei);
}
function xd(e, t) {
  const n = md[e.type] || e.type, { x: a, y: o } = nn(e, t);
  return {
    type: n,
    chart: t,
    native: e,
    x: a !== void 0 ? a : null,
    y: o !== void 0 ? o : null
  };
}
function ya(e, t) {
  for (const n of e)
    if (n === t || n.contains(t))
      return !0;
}
function _d(e, t, n) {
  const a = e.canvas, o = new MutationObserver((s) => {
    let i = !1;
    for (const l of s)
      i = i || ya(l.addedNodes, a), i = i && !ya(l.removedNodes, a);
    i && n();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
function kd(e, t, n) {
  const a = e.canvas, o = new MutationObserver((s) => {
    let i = !1;
    for (const l of s)
      i = i || ya(l.removedNodes, a), i = i && !ya(l.addedNodes, a);
    i && n();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
const Un = /* @__PURE__ */ new Map();
let fs = 0;
function Fi() {
  const e = window.devicePixelRatio;
  e !== fs && (fs = e, Un.forEach((t, n) => {
    n.currentDevicePixelRatio !== e && t();
  }));
}
function wd(e, t) {
  Un.size || window.addEventListener("resize", Fi), Un.set(e, t);
}
function Cd(e) {
  Un.delete(e), Un.size || window.removeEventListener("resize", Fi);
}
function $d(e, t, n) {
  const a = e.canvas, o = a && bo(a);
  if (!o)
    return;
  const s = vi((l, r) => {
    const c = o.clientWidth;
    n(l, r), c < o.clientWidth && n();
  }, window), i = new ResizeObserver((l) => {
    const r = l[0], c = r.contentRect.width, d = r.contentRect.height;
    c === 0 && d === 0 || s(c, d);
  });
  return i.observe(o), wd(e, s), i;
}
function Va(e, t, n) {
  n && n.disconnect(), t === "resize" && Cd(e);
}
function Sd(e, t, n) {
  const a = e.canvas, o = vi((s) => {
    e.ctx !== null && n(xd(s, e));
  }, e);
  return vd(a, t, o), o;
}
class Md extends Ii {
  acquireContext(t, n) {
    const a = t && t.getContext && t.getContext("2d");
    return a && a.canvas === t ? (bd(t, n), a) : null;
  }
  releaseContext(t) {
    const n = t.canvas;
    if (!n[ha])
      return !1;
    const a = n[ha].initial;
    [
      "height",
      "width"
    ].forEach((s) => {
      const i = a[s];
      Pe(i) ? n.removeAttribute(s) : n.setAttribute(s, i);
    });
    const o = a.style || {};
    return Object.keys(o).forEach((s) => {
      n.style[s] = o[s];
    }), n.width = n.width, delete n[ha], !0;
  }
  addEventListener(t, n, a) {
    this.removeEventListener(t, n);
    const o = t.$proxies || (t.$proxies = {}), i = {
      attach: _d,
      detach: kd,
      resize: $d
    }[n] || Sd;
    o[n] = i(t, n, a);
  }
  removeEventListener(t, n) {
    const a = t.$proxies || (t.$proxies = {}), o = a[n];
    if (!o)
      return;
    ({
      attach: Va,
      detach: Va,
      resize: Va
    }[n] || yd)(t, n, o), a[n] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, n, a, o) {
    return uc(t, n, a, o);
  }
  isAttached(t) {
    const n = t && bo(t);
    return !!(n && n.isConnected);
  }
}
function Dd(e) {
  return !mo() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? pd : Md;
}
let It = class {
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
    return jn(this.x) && jn(this.y);
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
function Td(e, t) {
  const n = e.options.ticks, a = Ad(e), o = Math.min(n.maxTicksLimit || a, a), s = n.major.enabled ? Ld(t) : [], i = s.length, l = s[0], r = s[i - 1], c = [];
  if (i > o)
    return Pd(t, c, s, i / o), c;
  const d = Bd(s, t, o);
  if (i > 0) {
    let h, f;
    const b = i > 1 ? Math.round((r - l) / (i - 1)) : null;
    for (sa(t, c, d, Pe(b) ? 0 : l - b, l), h = 0, f = i - 1; h < f; h++)
      sa(t, c, d, s[h], s[h + 1]);
    return sa(t, c, d, r, Pe(b) ? t.length : r + b), c;
  }
  return sa(t, c, d), c;
}
function Ad(e) {
  const t = e.options.offset, n = e._tickSize(), a = e._length / n + (t ? 0 : 1), o = e._maxLength / n;
  return Math.floor(Math.min(a, o));
}
function Bd(e, t, n) {
  const a = Rd(e), o = t.length / n;
  if (!a)
    return Math.max(o, 1);
  const s = dr(a);
  for (let i = 0, l = s.length - 1; i < l; i++) {
    const r = s[i];
    if (r > o)
      return r;
  }
  return Math.max(o, 1);
}
function Ld(e) {
  const t = [];
  let n, a;
  for (n = 0, a = e.length; n < a; n++)
    e[n].major && t.push(n);
  return t;
}
function Pd(e, t, n, a) {
  let o = 0, s = n[0], i;
  for (a = Math.ceil(a), i = 0; i < e.length; i++)
    i === s && (t.push(e[i]), o++, s = n[o * a]);
}
function sa(e, t, n, a, o) {
  const s = we(a, 0), i = Math.min(we(o, e.length), e.length);
  let l = 0, r, c, d;
  for (n = Math.ceil(n), o && (r = o - a, n = r / Math.floor(r / n)), d = s; d < 0; )
    l++, d = Math.round(s + l * n);
  for (c = Math.max(s, 0); c < i; c++)
    c === d && (t.push(e[c]), l++, d = Math.round(s + l * n));
}
function Rd(e) {
  const t = e.length;
  let n, a;
  if (t < 2)
    return !1;
  for (a = e[0], n = 1; n < t; ++n)
    if (e[n] - e[n - 1] !== a)
      return !1;
  return a;
}
const Id = (e) => e === "left" ? "right" : e === "right" ? "left" : e, gs = (e, t, n) => t === "top" || t === "left" ? e[t] + n : e[t] - n, ps = (e, t) => Math.min(t || e, e);
function ms(e, t) {
  const n = [], a = e.length / t, o = e.length;
  let s = 0;
  for (; s < o; s += a)
    n.push(e[Math.floor(s)]);
  return n;
}
function Ed(e, t, n) {
  const a = e.ticks.length, o = Math.min(t, a - 1), s = e._startPixel, i = e._endPixel, l = 1e-6;
  let r = e.getPixelForTick(o), c;
  if (!(n && (a === 1 ? c = Math.max(r - s, i - r) : t === 0 ? c = (e.getPixelForTick(1) - r) / 2 : c = (r - e.getPixelForTick(o - 1)) / 2, r += o < t ? c : -c, r < s - l || r > i + l)))
    return r;
}
function Fd(e, t) {
  Re(e, (n) => {
    const a = n.gc, o = a.length / 2;
    let s;
    if (o > t) {
      for (s = 0; s < o; ++s)
        delete n.data[a[s]];
      a.splice(0, o);
    }
  });
}
function Mn(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function bs(e, t) {
  if (!e.display)
    return 0;
  const n = Qe(e.font, t), a = pt(e.padding);
  return (Ue(e.text) ? e.text.length : 1) * n.lineHeight + a.height;
}
function Od(e, t) {
  return hn(e, {
    scale: t,
    type: "scale"
  });
}
function Vd(e, t, n) {
  return hn(e, {
    tick: n,
    index: t,
    type: "tick"
  });
}
function zd(e, t, n) {
  let a = io(e);
  return (n && t !== "right" || !n && t === "right") && (a = Id(a)), a;
}
function Nd(e, t, n, a) {
  const { top: o, left: s, bottom: i, right: l, chart: r } = e, { chartArea: c, scales: d } = r;
  let h = 0, f, b, g;
  const m = i - o, v = l - s;
  if (e.isHorizontal()) {
    if (b = Xe(a, s, l), Ae(n)) {
      const p = Object.keys(n)[0], x = n[p];
      g = d[p].getPixelForValue(x) + m - t;
    } else n === "center" ? g = (c.bottom + c.top) / 2 + m - t : g = gs(e, n, t);
    f = l - s;
  } else {
    if (Ae(n)) {
      const p = Object.keys(n)[0], x = n[p];
      b = d[p].getPixelForValue(x) - v + t;
    } else n === "center" ? b = (c.left + c.right) / 2 - v + t : b = gs(e, n, t);
    g = Xe(a, i, o), h = n === "left" ? -qe : qe;
  }
  return {
    titleX: b,
    titleY: g,
    maxWidth: f,
    rotation: h
  };
}
class wn extends It {
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
    return t = xt(t, Number.POSITIVE_INFINITY), n = xt(n, Number.NEGATIVE_INFINITY), a = xt(a, Number.POSITIVE_INFINITY), o = xt(o, Number.NEGATIVE_INFINITY), {
      min: xt(t, a),
      max: xt(n, o),
      minDefined: gt(t),
      maxDefined: gt(n)
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
    const { beginAtZero: o, grace: s, ticks: i } = this.options, l = i.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = n, this._margins = a = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, a), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + a.left + a.right : this.height + a.top + a.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = jr(this, s, o), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const r = l < this.ticks.length;
    this._convertTicksToLabels(r ? ms(this.ticks, l) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = Td(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), r && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
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
    let a, o, s;
    for (a = 0, o = t.length; a < o; a++)
      s = t[a], s.label = Ee(n.callback, [
        s.value,
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
    const t = this.options, n = t.ticks, a = ps(this.ticks.length, t.ticks.maxTicksLimit), o = n.minRotation || 0, s = n.maxRotation;
    let i = o, l, r, c;
    if (!this._isVisible() || !n.display || o >= s || a <= 1 || !this.isHorizontal()) {
      this.labelRotation = o;
      return;
    }
    const d = this._getLabelSizes(), h = d.widest.width, f = d.highest.height, b = Ze(this.chart.width - h, 0, this.maxWidth);
    l = t.offset ? this.maxWidth / a : b / (a - 1), h + 6 > l && (l = b / (a - (t.offset ? 0.5 : 1)), r = this.maxHeight - Mn(t.grid) - n.padding - bs(t.title, this.chart.options.font), c = Math.sqrt(h * h + f * f), i = gr(Math.min(Math.asin(Ze((d.highest.height + 6) / l, -1, 1)), Math.asin(Ze(r / c, -1, 1)) - Math.asin(Ze(f / c, -1, 1)))), i = Math.max(o, Math.min(s, i))), this.labelRotation = i;
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
    }, { chart: n, options: { ticks: a, title: o, grid: s } } = this, i = this._isVisible(), l = this.isHorizontal();
    if (i) {
      const r = bs(o, n.options.font);
      if (l ? (t.width = this.maxWidth, t.height = Mn(s) + r) : (t.height = this.maxHeight, t.width = Mn(s) + r), a.display && this.ticks.length) {
        const { first: c, last: d, widest: h, highest: f } = this._getLabelSizes(), b = a.padding * 2, g = Pt(this.labelRotation), m = Math.cos(g), v = Math.sin(g);
        if (l) {
          const p = a.mirror ? 0 : v * h.width + m * f.height;
          t.height = Math.min(this.maxHeight, t.height + p + b);
        } else {
          const p = a.mirror ? 0 : m * h.width + v * f.height;
          t.width = Math.min(this.maxWidth, t.width + p + b);
        }
        this._calculatePadding(c, d, v, m);
      }
    }
    this._handleMargins(), l ? (this.width = this._length = n.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = n.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, n, a, o) {
    const { ticks: { align: s, padding: i }, position: l } = this.options, r = this.labelRotation !== 0, c = l !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const d = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let f = 0, b = 0;
      r ? c ? (f = o * t.width, b = a * n.height) : (f = a * t.height, b = o * n.width) : s === "start" ? b = n.width : s === "end" ? f = t.width : s !== "inner" && (f = t.width / 2, b = n.width / 2), this.paddingLeft = Math.max((f - d + i) * this.width / (this.width - d), 0), this.paddingRight = Math.max((b - h + i) * this.width / (this.width - h), 0);
    } else {
      let d = n.height / 2, h = t.height / 2;
      s === "start" ? (d = 0, h = t.height) : s === "end" && (d = n.height, h = 0), this.paddingTop = d + i, this.paddingBottom = h + i;
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
      Pe(t[n].label) && (t.splice(n, 1), a--, n--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const n = this.options.ticks.sampleSize;
      let a = this.ticks;
      n < a.length && (a = ms(a, n)), this._labelSizes = t = this._computeLabelSizes(a, a.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, n, a) {
    const { ctx: o, _longestTextCache: s } = this, i = [], l = [], r = Math.floor(n / ps(n, a));
    let c = 0, d = 0, h, f, b, g, m, v, p, x, _, w, $;
    for (h = 0; h < n; h += r) {
      if (g = t[h].label, m = this._resolveTickFontOptions(h), o.font = v = m.string, p = s[v] = s[v] || {
        data: {},
        gc: []
      }, x = m.lineHeight, _ = w = 0, !Pe(g) && !Ue(g))
        _ = Wo(o, p.data, p.gc, _, g), w = x;
      else if (Ue(g))
        for (f = 0, b = g.length; f < b; ++f)
          $ = g[f], !Pe($) && !Ue($) && (_ = Wo(o, p.data, p.gc, _, $), w += x);
      i.push(_), l.push(w), c = Math.max(_, c), d = Math.max(w, d);
    }
    Fd(s, n);
    const S = i.indexOf(c), M = l.indexOf(d), O = (j) => ({
      width: i[j] || 0,
      height: l[j] || 0
    });
    return {
      first: O(0),
      last: O(n - 1),
      widest: O(S),
      highest: O(M),
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
    return mr(this._alignToPixels ? Jt(this.chart, n, 0) : n);
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
      return a.$context || (a.$context = Vd(this.getContext(), t, a));
    }
    return this.$context || (this.$context = Od(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, n = Pt(this.labelRotation), a = Math.abs(Math.cos(n)), o = Math.abs(Math.sin(n)), s = this._getLabelSizes(), i = t.autoSkipPadding || 0, l = s ? s.widest.width + i : 0, r = s ? s.highest.height + i : 0;
    return this.isHorizontal() ? r * a > l * o ? l / a : r / o : r * o < l * a ? r / a : l / o;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const n = this.axis, a = this.chart, o = this.options, { grid: s, position: i, border: l } = o, r = s.offset, c = this.isHorizontal(), h = this.ticks.length + (r ? 1 : 0), f = Mn(s), b = [], g = l.setContext(this.getContext()), m = g.display ? g.width : 0, v = m / 2, p = function(Z) {
      return Jt(a, Z, m);
    };
    let x, _, w, $, S, M, O, j, F, A, L, E;
    if (i === "top")
      x = p(this.bottom), M = this.bottom - f, j = x - v, A = p(t.top) + v, E = t.bottom;
    else if (i === "bottom")
      x = p(this.top), A = t.top, E = p(t.bottom) - v, M = x + v, j = this.top + f;
    else if (i === "left")
      x = p(this.right), S = this.right - f, O = x - v, F = p(t.left) + v, L = t.right;
    else if (i === "right")
      x = p(this.left), F = t.left, L = p(t.right) - v, S = x + v, O = this.left + f;
    else if (n === "x") {
      if (i === "center")
        x = p((t.top + t.bottom) / 2 + 0.5);
      else if (Ae(i)) {
        const Z = Object.keys(i)[0], ae = i[Z];
        x = p(this.chart.scales[Z].getPixelForValue(ae));
      }
      A = t.top, E = t.bottom, M = x + v, j = M + f;
    } else if (n === "y") {
      if (i === "center")
        x = p((t.left + t.right) / 2);
      else if (Ae(i)) {
        const Z = Object.keys(i)[0], ae = i[Z];
        x = p(this.chart.scales[Z].getPixelForValue(ae));
      }
      S = x - v, O = S - f, F = t.left, L = t.right;
    }
    const G = we(o.ticks.maxTicksLimit, h), Q = Math.max(1, Math.ceil(h / G));
    for (_ = 0; _ < h; _ += Q) {
      const Z = this.getContext(_), ae = s.setContext(Z), ue = l.setContext(Z), fe = ae.lineWidth, X = ae.color, T = ue.dash || [], H = ue.dashOffset, W = ae.tickWidth, re = ae.tickColor, xe = ae.tickBorderDash || [], De = ae.tickBorderDashOffset;
      w = Ed(this, _, r), w !== void 0 && ($ = Jt(a, w, fe), c ? S = O = F = L = $ : M = j = A = E = $, b.push({
        tx1: S,
        ty1: M,
        tx2: O,
        ty2: j,
        x1: F,
        y1: A,
        x2: L,
        y2: E,
        width: fe,
        color: X,
        borderDash: T,
        borderDashOffset: H,
        tickWidth: W,
        tickColor: re,
        tickBorderDash: xe,
        tickBorderDashOffset: De
      }));
    }
    return this._ticksLength = h, this._borderValue = x, b;
  }
  _computeLabelItems(t) {
    const n = this.axis, a = this.options, { position: o, ticks: s } = a, i = this.isHorizontal(), l = this.ticks, { align: r, crossAlign: c, padding: d, mirror: h } = s, f = Mn(a.grid), b = f + d, g = h ? -d : b, m = -Pt(this.labelRotation), v = [];
    let p, x, _, w, $, S, M, O, j, F, A, L, E = "middle";
    if (o === "top")
      S = this.bottom - g, M = this._getXAxisLabelAlignment();
    else if (o === "bottom")
      S = this.top + g, M = this._getXAxisLabelAlignment();
    else if (o === "left") {
      const Q = this._getYAxisLabelAlignment(f);
      M = Q.textAlign, $ = Q.x;
    } else if (o === "right") {
      const Q = this._getYAxisLabelAlignment(f);
      M = Q.textAlign, $ = Q.x;
    } else if (n === "x") {
      if (o === "center")
        S = (t.top + t.bottom) / 2 + b;
      else if (Ae(o)) {
        const Q = Object.keys(o)[0], Z = o[Q];
        S = this.chart.scales[Q].getPixelForValue(Z) + b;
      }
      M = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (o === "center")
        $ = (t.left + t.right) / 2 - b;
      else if (Ae(o)) {
        const Q = Object.keys(o)[0], Z = o[Q];
        $ = this.chart.scales[Q].getPixelForValue(Z);
      }
      M = this._getYAxisLabelAlignment(f).textAlign;
    }
    n === "y" && (r === "start" ? E = "top" : r === "end" && (E = "bottom"));
    const G = this._getLabelSizes();
    for (p = 0, x = l.length; p < x; ++p) {
      _ = l[p], w = _.label;
      const Q = s.setContext(this.getContext(p));
      O = this.getPixelForTick(p) + s.labelOffset, j = this._resolveTickFontOptions(p), F = j.lineHeight, A = Ue(w) ? w.length : 1;
      const Z = A / 2, ae = Q.color, ue = Q.textStrokeColor, fe = Q.textStrokeWidth;
      let X = M;
      i ? ($ = O, M === "inner" && (p === x - 1 ? X = this.options.reverse ? "left" : "right" : p === 0 ? X = this.options.reverse ? "right" : "left" : X = "center"), o === "top" ? c === "near" || m !== 0 ? L = -A * F + F / 2 : c === "center" ? L = -G.highest.height / 2 - Z * F + F : L = -G.highest.height + F / 2 : c === "near" || m !== 0 ? L = F / 2 : c === "center" ? L = G.highest.height / 2 - Z * F : L = G.highest.height - A * F, h && (L *= -1), m !== 0 && !Q.showLabelBackdrop && ($ += F / 2 * Math.sin(m))) : (S = O, L = (1 - A) * F / 2);
      let T;
      if (Q.showLabelBackdrop) {
        const H = pt(Q.backdropPadding), W = G.heights[p], re = G.widths[p];
        let xe = L - H.top, De = 0 - H.left;
        switch (E) {
          case "middle":
            xe -= W / 2;
            break;
          case "bottom":
            xe -= W;
            break;
        }
        switch (M) {
          case "center":
            De -= re / 2;
            break;
          case "right":
            De -= re;
            break;
          case "inner":
            p === x - 1 ? De -= re : p > 0 && (De -= re / 2);
            break;
        }
        T = {
          left: De,
          top: xe,
          width: re + H.width,
          height: W + H.height,
          color: Q.backdropColor
        };
      }
      v.push({
        label: w,
        font: j,
        textOffset: L,
        options: {
          rotation: m,
          color: ae,
          strokeColor: ue,
          strokeWidth: fe,
          textAlign: X,
          textBaseline: E,
          translation: [
            $,
            S
          ],
          backdrop: T
        }
      });
    }
    return v;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: n } = this.options;
    if (-Pt(this.labelRotation))
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
    let c, d, h, f;
    this.isHorizontal() ? (c = Jt(t, this.left, i) - i / 2, d = Jt(t, this.right, l) + l / 2, h = f = r) : (h = Jt(t, this.top, i) - i / 2, f = Jt(t, this.bottom, l) + l / 2, c = d = r), n.save(), n.lineWidth = s.width, n.strokeStyle = s.color, n.beginPath(), n.moveTo(c, h), n.lineTo(d, f), n.stroke(), n.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const a = this.ctx, o = this._computeLabelArea();
    o && co(a, o);
    const s = this.getLabelItems(t);
    for (const i of s) {
      const l = i.options, r = i.font, c = i.label, d = i.textOffset;
      Yn(a, c, 0, d, r, l);
    }
    o && uo(a);
  }
  drawTitle() {
    const { ctx: t, options: { position: n, title: a, reverse: o } } = this;
    if (!a.display)
      return;
    const s = Qe(a.font), i = pt(a.padding), l = a.align;
    let r = s.lineHeight / 2;
    n === "bottom" || n === "center" || Ae(n) ? (r += i.bottom, Ue(a.text) && (r += s.lineHeight * (a.text.length - 1))) : r += i.top;
    const { titleX: c, titleY: d, maxWidth: h, rotation: f } = Nd(this, r, n, l);
    Yn(t, a.text, 0, 0, s, {
      color: a.color,
      maxWidth: h,
      rotation: f,
      textAlign: zd(l, n, o),
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
    const t = this.options, n = t.ticks && t.ticks.z || 0, a = we(t.grid && t.grid.z, -1), o = we(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== wn.prototype.draw ? [
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
    return Qe(n.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class ia {
  constructor(t, n, a) {
    this.type = t, this.scope = n, this.override = a, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const n = Object.getPrototypeOf(t);
    let a;
    Wd(n) && (a = this.register(n));
    const o = this.items, s = t.id, i = this.scope + "." + s;
    if (!s)
      throw new Error("class does not have id: " + t);
    return s in o || (o[s] = t, Hd(t, i, a), this.override && je.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const n = this.items, a = t.id, o = this.scope;
    a in n && delete n[a], o && a in je[o] && (delete je[o][a], this.override && delete dn[a]);
  }
}
function Hd(e, t, n) {
  const a = Nn(/* @__PURE__ */ Object.create(null), [
    n ? je.get(n) : {},
    je.get(t),
    e.defaults
  ]);
  je.set(t, a), e.defaultRoutes && jd(t, e.defaultRoutes), e.descriptors && je.describe(t, e.descriptors);
}
function jd(e, t) {
  Object.keys(t).forEach((n) => {
    const a = n.split("."), o = a.pop(), s = [
      e
    ].concat(a).join("."), i = t[n].split("."), l = i.pop(), r = i.join(".");
    je.route(s, o, r, l);
  });
}
function Wd(e) {
  return "id" in e && "defaults" in e;
}
class Kd {
  constructor() {
    this.controllers = new ia($a, "datasets", !0), this.elements = new ia(It, "elements"), this.plugins = new ia(Object, "plugins"), this.scales = new ia(wn, "scales"), this._typedRegistries = [
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
      a || s.isForType(o) || s === this.plugins && o.id ? this._exec(t, s, o) : Re(o, (i) => {
        const l = a || this._getRegistryForType(i);
        this._exec(t, l, i);
      });
    });
  }
  _exec(t, n, a) {
    const o = oo(t);
    Ee(a["before" + o], [], a), n[t](a), Ee(a["after" + o], [], a);
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
var kt = /* @__PURE__ */ new Kd();
class Yd {
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
      if (Ee(l, r, i) === !1 && o.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    Pe(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const n = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), n;
  }
  _createDescriptors(t, n) {
    const a = t && t.config, o = we(a.options && a.options.plugins, {}), s = Ud(a);
    return o === !1 && !n ? [] : Xd(t, s, o, n);
  }
  _notifyStateChanges(t) {
    const n = this._oldCache || [], a = this._cache, o = (s, i) => s.filter((l) => !i.some((r) => l.plugin.id === r.plugin.id));
    this._notify(o(n, a), t, "stop"), this._notify(o(a, n), t, "start");
  }
}
function Ud(e) {
  const t = {}, n = [], a = Object.keys(kt.plugins.items);
  for (let s = 0; s < a.length; s++)
    n.push(kt.getPlugin(a[s]));
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
function qd(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function Xd(e, { plugins: t, localIds: n }, a, o) {
  const s = [], i = e.getContext();
  for (const l of t) {
    const r = l.id, c = qd(a[r], o);
    c !== null && s.push({
      plugin: l,
      options: Gd(e.config, {
        plugin: l,
        local: n[r]
      }, c, i)
    });
  }
  return s;
}
function Gd(e, { plugin: t, local: n }, a, o) {
  const s = e.pluginScopeKeys(t), i = e.getOptionScopes(a, s);
  return n && t.defaults && i.push(t.defaults), e.createResolver(i, o, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Za(e, t) {
  const n = je.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || n.indexAxis || "x";
}
function Zd(e, t) {
  let n = e;
  return e === "_index_" ? n = t : e === "_value_" && (n = t === "x" ? "y" : "x"), n;
}
function Qd(e, t) {
  return e === t ? "_index_" : "_value_";
}
function vs(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function Jd(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Qa(e, ...t) {
  if (vs(e))
    return e;
  for (const n of t) {
    const a = n.axis || Jd(n.position) || e.length > 1 && vs(e[0].toLowerCase());
    if (a)
      return a;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function ys(e, t, n) {
  if (n[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function eu(e, t) {
  if (t.data && t.data.datasets) {
    const n = t.data.datasets.filter((a) => a.xAxisID === e || a.yAxisID === e);
    if (n.length)
      return ys(e, "x", n[0]) || ys(e, "y", n[0]);
  }
  return {};
}
function tu(e, t) {
  const n = dn[e.type] || {
    scales: {}
  }, a = t.scales || {}, o = Za(e.type, t), s = /* @__PURE__ */ Object.create(null);
  return Object.keys(a).forEach((i) => {
    const l = a[i];
    if (!Ae(l))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (l._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const r = Qa(i, l, eu(i, e), je.scales[l.type]), c = Qd(r, o), d = n.scales || {};
    s[i] = In(/* @__PURE__ */ Object.create(null), [
      {
        axis: r
      },
      l,
      d[r],
      d[c]
    ]);
  }), e.data.datasets.forEach((i) => {
    const l = i.type || e.type, r = i.indexAxis || Za(l, t), d = (dn[l] || {}).scales || {};
    Object.keys(d).forEach((h) => {
      const f = Zd(h, r), b = i[f + "AxisID"] || f;
      s[b] = s[b] || /* @__PURE__ */ Object.create(null), In(s[b], [
        {
          axis: f
        },
        a[b],
        d[h]
      ]);
    });
  }), Object.keys(s).forEach((i) => {
    const l = s[i];
    In(l, [
      je.scales[l.type],
      je.scale
    ]);
  }), s;
}
function Oi(e) {
  const t = e.options || (e.options = {});
  t.plugins = we(t.plugins, {}), t.scales = tu(e, t);
}
function Vi(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function nu(e) {
  return e = e || {}, e.data = Vi(e.data), Oi(e), e;
}
const xs = /* @__PURE__ */ new Map(), zi = /* @__PURE__ */ new Set();
function la(e, t) {
  let n = xs.get(e);
  return n || (n = t(), xs.set(e, n), zi.add(n)), n;
}
const Dn = (e, t, n) => {
  const a = cn(t, n);
  a !== void 0 && e.add(a);
};
class au {
  constructor(t) {
    this._config = nu(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = Vi(t);
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
    this.clearCache(), Oi(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return la(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, n) {
    return la(`${t}.transition.${n}`, () => [
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
    return la(`${t}-${n}`, () => [
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
    return la(`${a}-plugin-${n}`, () => [
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
      t && (r.add(t), d.forEach((h) => Dn(r, t, h))), d.forEach((h) => Dn(r, o, h)), d.forEach((h) => Dn(r, dn[s] || {}, h)), d.forEach((h) => Dn(r, je, h)), d.forEach((h) => Dn(r, Xa, h));
    });
    const c = Array.from(r);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), zi.has(n) && i.set(n, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: n } = this;
    return [
      t,
      dn[n] || {},
      je.datasets[n] || {},
      {
        type: n
      },
      je,
      Xa
    ];
  }
  resolveNamedOptions(t, n, a, o = [
    ""
  ]) {
    const s = {
      $shared: !0
    }, { resolver: i, subPrefixes: l } = _s(this._resolverCache, t, o);
    let r = i;
    if (su(i, n)) {
      s.$shared = !1, a = Ut(a) ? a() : a;
      const c = this.createResolver(t, a, l);
      r = _n(i, a, c);
    }
    for (const c of n)
      s[c] = r[c];
    return s;
  }
  createResolver(t, n, a = [
    ""
  ], o) {
    const { resolver: s } = _s(this._resolverCache, t, a);
    return Ae(n) ? _n(s, n, void 0, o) : s;
  }
}
function _s(e, t, n) {
  let a = e.get(t);
  a || (a = /* @__PURE__ */ new Map(), e.set(t, a));
  const o = n.join();
  let s = a.get(o);
  return s || (s = {
    resolver: fo(t, n),
    subPrefixes: n.filter((l) => !l.toLowerCase().includes("hover"))
  }, a.set(o, s)), s;
}
const ou = (e) => Ae(e) && Object.getOwnPropertyNames(e).some((t) => Ut(e[t]));
function su(e, t) {
  const { isScriptable: n, isIndexable: a } = ki(e);
  for (const o of t) {
    const s = n(o), i = a(o), l = (i || s) && e[o];
    if (s && (Ut(l) || ou(l)) || i && Ue(l))
      return !0;
  }
  return !1;
}
var iu = "4.5.1";
const lu = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function ks(e, t) {
  return e === "top" || e === "bottom" || lu.indexOf(e) === -1 && t === "x";
}
function ws(e, t) {
  return function(n, a) {
    return n[e] === a[e] ? n[t] - a[t] : n[e] - a[e];
  };
}
function Cs(e) {
  const t = e.chart, n = t.options.animation;
  t.notifyPlugins("afterRender"), Ee(n && n.onComplete, [
    e
  ], t);
}
function ru(e) {
  const t = e.chart, n = t.options.animation;
  Ee(n && n.onProgress, [
    e
  ], t);
}
function Ni(e) {
  return mo() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const fa = {}, $s = (e) => {
  const t = Ni(e);
  return Object.values(fa).filter((n) => n.canvas === t).pop();
};
function cu(e, t, n) {
  const a = Object.keys(e);
  for (const o of a) {
    const s = +o;
    if (s >= t) {
      const i = e[o];
      delete e[o], (n > 0 || s > t) && (e[s + n] = i);
    }
  }
}
function du(e, t, n, a) {
  return !n || e.type === "mouseout" ? null : a ? t : e;
}
let qt = class {
  static defaults = je;
  static instances = fa;
  static overrides = dn;
  static registry = kt;
  static version = iu;
  static getChart = $s;
  static register(...t) {
    kt.add(...t), Ss();
  }
  static unregister(...t) {
    kt.remove(...t), Ss();
  }
  constructor(t, n) {
    const a = this.config = new au(n), o = Ni(t), s = $s(o);
    if (s)
      throw new Error("Canvas is already in use. Chart with ID '" + s.id + "' must be destroyed before the canvas with ID '" + s.canvas.id + "' can be reused.");
    const i = a.createResolver(a.chartOptionScopes(), this.getContext());
    this.platform = new (a.platform || Dd(o))(), this.platform.updateConfig(a);
    const l = this.platform.acquireContext(o, i.aspectRatio), r = l && l.canvas, c = r && r.height, d = r && r.width;
    if (this.id = tr(), this.ctx = l, this.canvas = r, this.width = d, this.height = c, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Yd(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = xr((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], fa[this.id] = this, !l || !r) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Tt.listen(this, "complete", Cs), Tt.listen(this, "progress", ru), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: n }, width: a, height: o, _aspectRatio: s } = this;
    return Pe(t) ? n && s ? s : o ? a / o : null : t;
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
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : qo(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Ko(this.canvas, this.ctx), this;
  }
  stop() {
    return Tt.stop(this), this;
  }
  resize(t, n) {
    Tt.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: n
    } : this._resize(t, n);
  }
  _resize(t, n) {
    const a = this.options, o = this.canvas, s = a.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(o, t, n, s), l = a.devicePixelRatio || this.platform.getDevicePixelRatio(), r = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, qo(this, l, !0) && (this.notifyPlugins("resize", {
      size: i
    }), Ee(a.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(r) && this.render());
  }
  ensureScalesHaveIDs() {
    const n = this.options.scales || {};
    Re(n, (a, o) => {
      a.id = o;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, n = t.scales, a = this.scales, o = Object.keys(a).reduce((i, l) => (i[l] = !1, i), {});
    let s = [];
    n && (s = s.concat(Object.keys(n).map((i) => {
      const l = n[i], r = Qa(i, l), c = r === "r", d = r === "x";
      return {
        options: l,
        dposition: c ? "chartArea" : d ? "bottom" : "left",
        dtype: c ? "radialLinear" : d ? "category" : "linear"
      };
    }))), Re(s, (i) => {
      const l = i.options, r = l.id, c = Qa(r, l), d = we(l.type, i.dtype);
      (l.position === void 0 || ks(l.position, c) !== ks(i.dposition)) && (l.position = i.dposition), o[r] = !0;
      let h = null;
      if (r in a && a[r].type === d)
        h = a[r];
      else {
        const f = kt.getScale(d);
        h = new f({
          id: r,
          type: d,
          ctx: this.ctx,
          chart: this
        }), a[h.id] = h;
      }
      h.init(l, t);
    }), Re(o, (i, l) => {
      i || delete a[l];
    }), Re(a, (i) => {
      ht.configure(this, i, i.options), ht.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, n = this.data.datasets.length, a = t.length;
    if (t.sort((o, s) => o.index - s.index), a > n) {
      for (let o = n; o < a; ++o)
        this._destroyDatasetMeta(o);
      t.splice(n, a - n);
    }
    this._sortedMetasets = t.slice(0).sort(ws("order", "index"));
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
      if (i.type && i.type !== l && (this._destroyDatasetMeta(a), i = this.getDatasetMeta(a)), i.type = l, i.indexAxis = s.indexAxis || Za(l, this.options), i.order = s.order || 0, i.index = a, i.label = "" + s.label, i.visible = this.isDatasetVisible(a), i.controller)
        i.controller.updateIndex(a), i.controller.linkScales();
      else {
        const r = kt.getController(l), { datasetElementType: c, dataElementType: d } = je.datasets[l];
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
      const { controller: h } = this.getDatasetMeta(c), f = !o && s.indexOf(h) === -1;
      h.buildOrUpdateElements(f), i = Math.max(+h.getMaxOverflow(), i);
    }
    i = this._minPadding = a.layout.autoPadding ? i : 0, this._updateLayout(i), o || Re(s, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(ws("z", "_idx"));
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
    (!Io(n, a) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, n = this._getUniformDataChanges() || [];
    for (const { method: a, start: o, count: s } of n) {
      const i = a === "_removeElements" ? -s : s;
      cu(t, o, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const n = this.data.datasets.length, a = (s) => new Set(t.filter((i) => i[0] === s).map((i, l) => l + "," + i.splice(1).join(","))), o = a(0);
    for (let s = 1; s < n; s++)
      if (!Io(o, a(s)))
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
    ht.update(this, this.width, this.height, t);
    const n = this.chartArea, a = n.width <= 0 || n.height <= 0;
    this._layers = [], Re(this.boxes, (o) => {
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
        this._updateDataset(n, Ut(t) ? t({
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
    }) !== !1 && (Tt.has(this) ? this.attached && !Tt.running(this) && Tt.start(this) : (this.draw(), Cs({
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
    }, o = Sc(this, t);
    this.notifyPlugins("beforeDatasetDraw", a) !== !1 && (o && co(n, o), t.controller.draw(), o && uo(n), a.cancelable = !1, this.notifyPlugins("afterDatasetDraw", a));
  }
  isPointInArea(t) {
    return Kn(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, n, a, o) {
    const s = ld.modes[n];
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
    return this.$context || (this.$context = hn(null, {
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
    Hn(n) ? (s.data[n].hidden = !a, this.update()) : (this.setDatasetVisibility(t, a), i.update(s, {
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
    for (this.stop(), Tt.remove(this), t = 0, n = this.data.datasets.length; t < n; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: n } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Ko(t, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete fa[this.id], this.notifyPlugins("afterDestroy");
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
    Re(this.options.events, (s) => a(s, o));
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
    Re(this._listeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._listeners = {}, Re(this._responsiveListeners, (t, n) => {
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
    !ga(a, n) && (this._active = a, this._lastEvent = null, this._updateHoverStyles(a, n));
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
    const { _active: o = [], options: s } = this, i = n, l = this._getActiveElements(t, o, a, i), r = lr(t), c = du(t, this._lastEvent, a, r);
    a && (this._lastEvent = null, Ee(s.onHover, [
      t,
      l,
      this
    ], this), r && Ee(s.onClick, [
      t,
      l,
      this
    ], this));
    const d = !ga(l, o);
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
function Ss() {
  return Re(qt.instances, (e) => e._plugins.invalidate());
}
function uu(e, t, n) {
  const { startAngle: a, x: o, y: s, outerRadius: i, innerRadius: l, options: r } = t, { borderWidth: c, borderJoinStyle: d } = r, h = Math.min(c / i, bt(a - n));
  if (e.beginPath(), e.arc(o, s, i - c / 2, a + h / 2, n - h / 2), l > 0) {
    const f = Math.min(c / l, bt(a - n));
    e.arc(o, s, l + c / 2, n - f / 2, a + f / 2, !0);
  } else {
    const f = Math.min(c / 2, i * bt(a - n));
    if (d === "round")
      e.arc(o, s, f, n - Ie / 2, a + Ie / 2, !0);
    else if (d === "bevel") {
      const b = 2 * f * f, g = -b * Math.cos(n + Ie / 2) + o, m = -b * Math.sin(n + Ie / 2) + s, v = b * Math.cos(a + Ie / 2) + o, p = b * Math.sin(a + Ie / 2) + s;
      e.lineTo(g, m), e.lineTo(v, p);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function hu(e, t, n) {
  const { startAngle: a, pixelMargin: o, x: s, y: i, outerRadius: l, innerRadius: r } = t;
  let c = o / l;
  e.beginPath(), e.arc(s, i, l, a - c, n + c), r > o ? (c = o / r, e.arc(s, i, r, n + c, a - c, !0)) : e.arc(s, i, o, n + qe, a - qe), e.closePath(), e.clip();
}
function fu(e) {
  return ho(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function gu(e, t, n, a) {
  const o = fu(e.options.borderRadius), s = (n - t) / 2, i = Math.min(s, a * t / 2), l = (r) => {
    const c = (n - Math.min(s, r)) * a / 2;
    return Ze(r, 0, Math.min(s, c));
  };
  return {
    outerStart: l(o.outerStart),
    outerEnd: l(o.outerEnd),
    innerStart: Ze(o.innerStart, 0, i),
    innerEnd: Ze(o.innerEnd, 0, i)
  };
}
function mn(e, t, n, a) {
  return {
    x: n + e * Math.cos(t),
    y: a + e * Math.sin(t)
  };
}
function xa(e, t, n, a, o, s) {
  const { x: i, y: l, startAngle: r, pixelMargin: c, innerRadius: d } = t, h = Math.max(t.outerRadius + a + n - c, 0), f = d > 0 ? d + a + n + c : 0;
  let b = 0;
  const g = o - r;
  if (a) {
    const Q = d > 0 ? d - a : 0, Z = h > 0 ? h - a : 0, ae = (Q + Z) / 2, ue = ae !== 0 ? g * ae / (ae + a) : g;
    b = (g - ue) / 2;
  }
  const m = Math.max(1e-3, g * h - n / Ie) / h, v = (g - m) / 2, p = r + v + b, x = o - v - b, { outerStart: _, outerEnd: w, innerStart: $, innerEnd: S } = gu(t, f, h, x - p), M = h - _, O = h - w, j = p + _ / M, F = x - w / O, A = f + $, L = f + S, E = p + $ / A, G = x - S / L;
  if (e.beginPath(), s) {
    const Q = (j + F) / 2;
    if (e.arc(i, l, h, j, Q), e.arc(i, l, h, Q, F), w > 0) {
      const fe = mn(O, F, i, l);
      e.arc(fe.x, fe.y, w, F, x + qe);
    }
    const Z = mn(L, x, i, l);
    if (e.lineTo(Z.x, Z.y), S > 0) {
      const fe = mn(L, G, i, l);
      e.arc(fe.x, fe.y, S, x + qe, G + Math.PI);
    }
    const ae = (x - S / f + (p + $ / f)) / 2;
    if (e.arc(i, l, f, x - S / f, ae, !0), e.arc(i, l, f, ae, p + $ / f, !0), $ > 0) {
      const fe = mn(A, E, i, l);
      e.arc(fe.x, fe.y, $, E + Math.PI, p - qe);
    }
    const ue = mn(M, p, i, l);
    if (e.lineTo(ue.x, ue.y), _ > 0) {
      const fe = mn(M, j, i, l);
      e.arc(fe.x, fe.y, _, p - qe, j);
    }
  } else {
    e.moveTo(i, l);
    const Q = Math.cos(j) * h + i, Z = Math.sin(j) * h + l;
    e.lineTo(Q, Z);
    const ae = Math.cos(F) * h + i, ue = Math.sin(F) * h + l;
    e.lineTo(ae, ue);
  }
  e.closePath();
}
function pu(e, t, n, a, o) {
  const { fullCircles: s, startAngle: i, circumference: l } = t;
  let r = t.endAngle;
  if (s) {
    xa(e, t, n, a, r, o);
    for (let c = 0; c < s; ++c)
      e.fill();
    isNaN(l) || (r = i + (l % ze || ze));
  }
  return xa(e, t, n, a, r, o), e.fill(), r;
}
function mu(e, t, n, a, o) {
  const { fullCircles: s, startAngle: i, circumference: l, options: r } = t, { borderWidth: c, borderJoinStyle: d, borderDash: h, borderDashOffset: f, borderRadius: b } = r, g = r.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(h || []), e.lineDashOffset = f, g ? (e.lineWidth = c * 2, e.lineJoin = d || "round") : (e.lineWidth = c, e.lineJoin = d || "bevel");
  let m = t.endAngle;
  if (s) {
    xa(e, t, n, a, m, o);
    for (let v = 0; v < s; ++v)
      e.stroke();
    isNaN(l) || (m = i + (l % ze || ze));
  }
  g && hu(e, t, m), r.selfJoin && m - i >= Ie && b === 0 && d !== "miter" && uu(e, t, m), s || (xa(e, t, n, a, m, o), e.stroke());
}
class bu extends It {
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
    ], a), { angle: s, distance: i } = gi(o, {
      x: t,
      y: n
    }), { startAngle: l, endAngle: r, innerRadius: c, outerRadius: d, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], a), f = (this.options.spacing + this.options.borderWidth) / 2, b = we(h, r - l), g = Wn(s, l, r) && l !== r, m = b >= ze || g, v = zt(i, c + f, d + f);
    return m && v;
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
    if (this.pixelMargin = n.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = a > ze ? Math.floor(a / ze) : 0, a === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const l = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(l) * o, Math.sin(l) * o);
    const r = 1 - Math.sin(Math.min(Ie, a || 0)), c = o * r;
    t.fillStyle = n.backgroundColor, t.strokeStyle = n.borderColor, pu(t, this, c, s, i), mu(t, this, c, s, i), t.restore();
  }
}
function Hi(e, t, n = t) {
  e.lineCap = we(n.borderCapStyle, t.borderCapStyle), e.setLineDash(we(n.borderDash, t.borderDash)), e.lineDashOffset = we(n.borderDashOffset, t.borderDashOffset), e.lineJoin = we(n.borderJoinStyle, t.borderJoinStyle), e.lineWidth = we(n.borderWidth, t.borderWidth), e.strokeStyle = we(n.borderColor, t.borderColor);
}
function vu(e, t, n) {
  e.lineTo(n.x, n.y);
}
function yu(e) {
  return e.stepped ? Rr : e.tension || e.cubicInterpolationMode === "monotone" ? Ir : vu;
}
function ji(e, t, n = {}) {
  const a = e.length, { start: o = 0, end: s = a - 1 } = n, { start: i, end: l } = t, r = Math.max(o, i), c = Math.min(s, l), d = o < i && s < i || o > l && s > l;
  return {
    count: a,
    start: r,
    loop: t.loop,
    ilen: c < r && !d ? a + c - r : c - r
  };
}
function xu(e, t, n, a) {
  const { points: o, options: s } = t, { count: i, start: l, loop: r, ilen: c } = ji(o, n, a), d = yu(s);
  let { move: h = !0, reverse: f } = a || {}, b, g, m;
  for (b = 0; b <= c; ++b)
    g = o[(l + (f ? c - b : b)) % i], !g.skip && (h ? (e.moveTo(g.x, g.y), h = !1) : d(e, m, g, f, s.stepped), m = g);
  return r && (g = o[(l + (f ? c : 0)) % i], d(e, m, g, f, s.stepped)), !!r;
}
function _u(e, t, n, a) {
  const o = t.points, { count: s, start: i, ilen: l } = ji(o, n, a), { move: r = !0, reverse: c } = a || {};
  let d = 0, h = 0, f, b, g, m, v, p;
  const x = (w) => (i + (c ? l - w : w)) % s, _ = () => {
    m !== v && (e.lineTo(d, v), e.lineTo(d, m), e.lineTo(d, p));
  };
  for (r && (b = o[x(0)], e.moveTo(b.x, b.y)), f = 0; f <= l; ++f) {
    if (b = o[x(f)], b.skip)
      continue;
    const w = b.x, $ = b.y, S = w | 0;
    S === g ? ($ < m ? m = $ : $ > v && (v = $), d = (h * d + w) / ++h) : (_(), e.lineTo(w, $), g = S, h = 0, m = v = $), p = $;
  }
  _();
}
function Ja(e) {
  const t = e.options, n = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !n ? _u : xu;
}
function ku(e) {
  return e.stepped ? fc : e.tension || e.cubicInterpolationMode === "monotone" ? gc : an;
}
function wu(e, t, n, a) {
  let o = t._path;
  o || (o = t._path = new Path2D(), t.path(o, n, a) && o.closePath()), Hi(e, t.options), e.stroke(o);
}
function Cu(e, t, n, a) {
  const { segments: o, options: s } = t, i = Ja(t);
  for (const l of o)
    Hi(e, s, l.style), e.beginPath(), i(e, t, l, {
      start: n,
      end: n + a - 1
    }) && e.closePath(), e.stroke();
}
const $u = typeof Path2D == "function";
function Su(e, t, n, a) {
  $u && !t.options.segment ? wu(e, t, n, a) : Cu(e, t, n, a);
}
class Mu extends It {
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
      sc(this._points, a, t, o, n), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = kc(this, this.options.segment));
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
    const a = this.options, o = t[n], s = this.points, i = yc(this, {
      property: n,
      start: o,
      end: o
    });
    if (!i.length)
      return;
    const l = [], r = ku(a);
    let c, d;
    for (c = 0, d = i.length; c < d; ++c) {
      const { start: h, end: f } = i[c], b = s[h], g = s[f];
      if (b === g) {
        l.push(b);
        continue;
      }
      const m = Math.abs((o - b[n]) / (g[n] - b[n])), v = r(b, g, m, a.stepped);
      v[n] = t[n], l.push(v);
    }
    return l.length === 1 ? l[0] : l;
  }
  pathSegment(t, n, a) {
    return Ja(this)(t, this, n, a);
  }
  path(t, n, a) {
    const o = this.segments, s = Ja(this);
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
    (this.points || []).length && s.borderWidth && (t.save(), Su(t, this, a, o), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function Ms(e, t, n, a) {
  const o = e.options, { [n]: s } = e.getProps([
    n
  ], a);
  return Math.abs(t - s) < o.radius + o.hitRadius;
}
class Du extends It {
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
    return Ms(this, t, "x", n);
  }
  inYRange(t, n) {
    return Ms(this, t, "y", n);
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
    this.skip || a.radius < 0.1 || !Kn(this, n, this.size(a) / 2) || (t.strokeStyle = a.borderColor, t.lineWidth = a.borderWidth, t.fillStyle = a.backgroundColor, Ga(t, a, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function Wi(e, t) {
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
function Ht(e, t, n, a) {
  return e ? 0 : Ze(t, n, a);
}
function Tu(e, t, n) {
  const a = e.options.borderWidth, o = e.borderSkipped, s = _i(a);
  return {
    t: Ht(o.top, s.top, 0, n),
    r: Ht(o.right, s.right, 0, t),
    b: Ht(o.bottom, s.bottom, 0, n),
    l: Ht(o.left, s.left, 0, t)
  };
}
function Au(e, t, n) {
  const { enableBorderRadius: a } = e.getProps([
    "enableBorderRadius"
  ]), o = e.options.borderRadius, s = vn(o), i = Math.min(t, n), l = e.borderSkipped, r = a || Ae(o);
  return {
    topLeft: Ht(!r || l.top || l.left, s.topLeft, 0, i),
    topRight: Ht(!r || l.top || l.right, s.topRight, 0, i),
    bottomLeft: Ht(!r || l.bottom || l.left, s.bottomLeft, 0, i),
    bottomRight: Ht(!r || l.bottom || l.right, s.bottomRight, 0, i)
  };
}
function Bu(e) {
  const t = Wi(e), n = t.right - t.left, a = t.bottom - t.top, o = Tu(e, n / 2, a / 2), s = Au(e, n / 2, a / 2);
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
function za(e, t, n, a) {
  const o = t === null, s = n === null, l = e && !(o && s) && Wi(e, a);
  return l && (o || zt(t, l.left, l.right)) && (s || zt(n, l.top, l.bottom));
}
function Lu(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function Pu(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function Na(e, t, n = {}) {
  const a = e.x !== n.x ? -t : 0, o = e.y !== n.y ? -t : 0, s = (e.x + e.w !== n.x + n.w ? t : 0) - a, i = (e.y + e.h !== n.y + n.h ? t : 0) - o;
  return {
    x: e.x + a,
    y: e.y + o,
    w: e.w + s,
    h: e.h + i,
    radius: e.radius
  };
}
class Ru extends It {
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
    const { inflateAmount: n, options: { borderColor: a, backgroundColor: o } } = this, { inner: s, outer: i } = Bu(this), l = Lu(i.radius) ? ba : Pu;
    t.save(), (i.w !== s.w || i.h !== s.h) && (t.beginPath(), l(t, Na(i, n, s)), t.clip(), l(t, Na(s, -n, i)), t.fillStyle = a, t.fill("evenodd")), t.beginPath(), l(t, Na(s, n)), t.fillStyle = o, t.fill(), t.restore();
  }
  inRange(t, n, a) {
    return za(this, t, n, a);
  }
  inXRange(t, n) {
    return za(this, t, null, n);
  }
  inYRange(t, n) {
    return za(this, null, t, n);
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
const Ds = (e, t) => {
  let { boxHeight: n = t, boxWidth: a = t } = e;
  return e.usePointStyle && (n = Math.min(n, t), a = e.pointStyleWidth || Math.min(a, t)), {
    boxWidth: a,
    boxHeight: n,
    itemHeight: Math.max(t, n)
  };
}, Iu = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class Ts extends It {
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
    t.filter && (n = n.filter((a) => t.filter(a, this.chart.data))), t.sort && (n = n.sort((a, o) => t.sort(a, o, this.chart.data))), this.options.reverse && n.reverse(), this.legendItems = n;
  }
  fit() {
    const { options: t, ctx: n } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const a = t.labels, o = Qe(a.font), s = o.size, i = this._computeTitleHeight(), { boxWidth: l, itemHeight: r } = Ds(a, s);
    let c, d;
    n.font = o.string, this.isHorizontal() ? (c = this.maxWidth, d = this._fitRows(i, s, l, r) + 10) : (d = this.maxHeight, c = this._fitCols(i, o, l, r) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(d, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, n, a, o) {
    const { ctx: s, maxWidth: i, options: { labels: { padding: l } } } = this, r = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], d = o + l;
    let h = t;
    s.textAlign = "left", s.textBaseline = "middle";
    let f = -1, b = -d;
    return this.legendItems.forEach((g, m) => {
      const v = a + n / 2 + s.measureText(g.text).width;
      (m === 0 || c[c.length - 1] + v + 2 * l > i) && (h += d, c[c.length - (m > 0 ? 0 : 1)] = 0, b += d, f++), r[m] = {
        left: 0,
        top: b,
        row: f,
        width: v,
        height: o
      }, c[c.length - 1] += v + l;
    }), h;
  }
  _fitCols(t, n, a, o) {
    const { ctx: s, maxHeight: i, options: { labels: { padding: l } } } = this, r = this.legendHitBoxes = [], c = this.columnSizes = [], d = i - t;
    let h = l, f = 0, b = 0, g = 0, m = 0;
    return this.legendItems.forEach((v, p) => {
      const { itemWidth: x, itemHeight: _ } = Eu(a, n, s, v, o);
      p > 0 && b + _ + 2 * l > d && (h += f + l, c.push({
        width: f,
        height: b
      }), g += f + l, m++, f = b = 0), r[p] = {
        left: g,
        top: b,
        col: m,
        width: x,
        height: _
      }, f = Math.max(f, x), b += _ + l;
    }), h += f, c.push({
      width: f,
      height: b
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: n, options: { align: a, labels: { padding: o }, rtl: s } } = this, i = yn(s, this.left, this.width);
    if (this.isHorizontal()) {
      let l = 0, r = Xe(a, this.left + o, this.right - this.lineWidths[l]);
      for (const c of n)
        l !== c.row && (l = c.row, r = Xe(a, this.left + o, this.right - this.lineWidths[l])), c.top += this.top + t + o, c.left = i.leftForLtr(i.x(r), c.width), r += c.width + o;
    } else {
      let l = 0, r = Xe(a, this.top + t + o, this.bottom - this.columnSizes[l].height);
      for (const c of n)
        c.col !== l && (l = c.col, r = Xe(a, this.top + t + o, this.bottom - this.columnSizes[l].height)), c.top = r, c.left += this.left + o, c.left = i.leftForLtr(i.x(c.left), c.width), r += c.height + o;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      co(t, this), this._draw(), uo(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: n, lineWidths: a, ctx: o } = this, { align: s, labels: i } = t, l = je.color, r = yn(t.rtl, this.left, this.width), c = Qe(i.font), { padding: d } = i, h = c.size, f = h / 2;
    let b;
    this.drawTitle(), o.textAlign = r.textAlign("left"), o.textBaseline = "middle", o.lineWidth = 0.5, o.font = c.string;
    const { boxWidth: g, boxHeight: m, itemHeight: v } = Ds(i, h), p = function(S, M, O) {
      if (isNaN(g) || g <= 0 || isNaN(m) || m < 0)
        return;
      o.save();
      const j = we(O.lineWidth, 1);
      if (o.fillStyle = we(O.fillStyle, l), o.lineCap = we(O.lineCap, "butt"), o.lineDashOffset = we(O.lineDashOffset, 0), o.lineJoin = we(O.lineJoin, "miter"), o.lineWidth = j, o.strokeStyle = we(O.strokeStyle, l), o.setLineDash(we(O.lineDash, [])), i.usePointStyle) {
        const F = {
          radius: m * Math.SQRT2 / 2,
          pointStyle: O.pointStyle,
          rotation: O.rotation,
          borderWidth: j
        }, A = r.xPlus(S, g / 2), L = M + f;
        xi(o, F, A, L, i.pointStyleWidth && g);
      } else {
        const F = M + Math.max((h - m) / 2, 0), A = r.leftForLtr(S, g), L = vn(O.borderRadius);
        o.beginPath(), Object.values(L).some((E) => E !== 0) ? ba(o, {
          x: A,
          y: F,
          w: g,
          h: m,
          radius: L
        }) : o.rect(A, F, g, m), o.fill(), j !== 0 && o.stroke();
      }
      o.restore();
    }, x = function(S, M, O) {
      Yn(o, O.text, S, M + v / 2, c, {
        strikethrough: O.hidden,
        textAlign: r.textAlign(O.textAlign)
      });
    }, _ = this.isHorizontal(), w = this._computeTitleHeight();
    _ ? b = {
      x: Xe(s, this.left + d, this.right - a[0]),
      y: this.top + d + w,
      line: 0
    } : b = {
      x: this.left + d,
      y: Xe(s, this.top + w + d, this.bottom - n[0].height),
      line: 0
    }, Mi(this.ctx, t.textDirection);
    const $ = v + d;
    this.legendItems.forEach((S, M) => {
      o.strokeStyle = S.fontColor, o.fillStyle = S.fontColor;
      const O = o.measureText(S.text).width, j = r.textAlign(S.textAlign || (S.textAlign = i.textAlign)), F = g + f + O;
      let A = b.x, L = b.y;
      r.setWidth(this.width), _ ? M > 0 && A + F + d > this.right && (L = b.y += $, b.line++, A = b.x = Xe(s, this.left + d, this.right - a[b.line])) : M > 0 && L + $ > this.bottom && (A = b.x = A + n[b.line].width + d, b.line++, L = b.y = Xe(s, this.top + w + d, this.bottom - n[b.line].height));
      const E = r.x(A);
      if (p(E, L, S), A = _r(j, A + g + f, _ ? A + F : this.right, t.rtl), x(r.x(A), L, S), _)
        b.x += F + d;
      else if (typeof S.text != "string") {
        const G = c.lineHeight;
        b.y += Ki(S, G) + d;
      } else
        b.y += $;
    }), Di(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, n = t.title, a = Qe(n.font), o = pt(n.padding);
    if (!n.display)
      return;
    const s = yn(t.rtl, this.left, this.width), i = this.ctx, l = n.position, r = a.size / 2, c = o.top + r;
    let d, h = this.left, f = this.width;
    if (this.isHorizontal())
      f = Math.max(...this.lineWidths), d = this.top + c, h = Xe(t.align, h, this.right - f);
    else {
      const g = this.columnSizes.reduce((m, v) => Math.max(m, v.height), 0);
      d = c + Xe(t.align, this.top, this.bottom - g - t.labels.padding - this._computeTitleHeight());
    }
    const b = Xe(l, h, h + f);
    i.textAlign = s.textAlign(io(l)), i.textBaseline = "middle", i.strokeStyle = n.color, i.fillStyle = n.color, i.font = a.string, Yn(i, n.text, b, d, a);
  }
  _computeTitleHeight() {
    const t = this.options.title, n = Qe(t.font), a = pt(t.padding);
    return t.display ? n.lineHeight + a.height : 0;
  }
  _getLegendItemAt(t, n) {
    let a, o, s;
    if (zt(t, this.left, this.right) && zt(n, this.top, this.bottom)) {
      for (s = this.legendHitBoxes, a = 0; a < s.length; ++a)
        if (o = s[a], zt(t, o.left, o.left + o.width) && zt(n, o.top, o.top + o.height))
          return this.legendItems[a];
    }
    return null;
  }
  handleEvent(t) {
    const n = this.options;
    if (!Vu(t.type, n))
      return;
    const a = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const o = this._hoveredItem, s = Iu(o, a);
      o && !s && Ee(n.onLeave, [
        t,
        o,
        this
      ], this), this._hoveredItem = a, a && !s && Ee(n.onHover, [
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
function Eu(e, t, n, a, o) {
  const s = Fu(a, e, t, n), i = Ou(o, a, t.lineHeight);
  return {
    itemWidth: s,
    itemHeight: i
  };
}
function Fu(e, t, n, a) {
  let o = e.text;
  return o && typeof o != "string" && (o = o.reduce((s, i) => s.length > i.length ? s : i)), t + n.size / 2 + a.measureText(o).width;
}
function Ou(e, t, n) {
  let a = e;
  return typeof t.text != "string" && (a = Ki(t, n)), a;
}
function Ki(e, t) {
  const n = e.text ? e.text.length : 0;
  return t * n;
}
function Vu(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var yo = {
  id: "legend",
  _element: Ts,
  start(e, t, n) {
    const a = e.legend = new Ts({
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
          const c = r.controller.getStyle(n ? 0 : void 0), d = pt(c.borderWidth);
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
class Yi extends It {
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
    const o = Ue(a.text) ? a.text.length : 1;
    this._padding = pt(a.padding);
    const s = o * Qe(a.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = s : this.width = s;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: n, left: a, bottom: o, right: s, options: i } = this, l = i.align;
    let r = 0, c, d, h;
    return this.isHorizontal() ? (d = Xe(l, a, s), h = n + t, c = s - a) : (i.position === "left" ? (d = a + t, h = Xe(l, o, n), r = Ie * -0.5) : (d = s - t, h = Xe(l, n, o), r = Ie * 0.5), c = o - n), {
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
    const a = Qe(n.font), s = a.lineHeight / 2 + this._padding.top, { titleX: i, titleY: l, maxWidth: r, rotation: c } = this._drawArgs(s);
    Yn(t, n.text, 0, 0, a, {
      color: n.color,
      maxWidth: r,
      rotation: c,
      textAlign: io(n.align),
      textBaseline: "middle",
      translation: [
        i,
        l
      ]
    });
  }
}
function zu(e, t) {
  const n = new Yi({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  ht.configure(e, n, t), ht.addBox(e, n), e.titleBlock = n;
}
var Ui = {
  id: "title",
  _element: Yi,
  start(e, t, n) {
    zu(e, n);
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
const Rn = {
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
        const c = r.getCenterPoint(), d = qa(t, c);
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
function _t(e, t) {
  return t && (Ue(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function At(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function Nu(e, t) {
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
function As(e, t) {
  const n = e.chart.ctx, { body: a, footer: o, title: s } = e, { boxWidth: i, boxHeight: l } = t, r = Qe(t.bodyFont), c = Qe(t.titleFont), d = Qe(t.footerFont), h = s.length, f = o.length, b = a.length, g = pt(t.padding);
  let m = g.height, v = 0, p = a.reduce((w, $) => w + $.before.length + $.lines.length + $.after.length, 0);
  if (p += e.beforeBody.length + e.afterBody.length, h && (m += h * c.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), p) {
    const w = t.displayColors ? Math.max(l, r.lineHeight) : r.lineHeight;
    m += b * w + (p - b) * r.lineHeight + (p - 1) * t.bodySpacing;
  }
  f && (m += t.footerMarginTop + f * d.lineHeight + (f - 1) * t.footerSpacing);
  let x = 0;
  const _ = function(w) {
    v = Math.max(v, n.measureText(w).width + x);
  };
  return n.save(), n.font = c.string, Re(e.title, _), n.font = r.string, Re(e.beforeBody.concat(e.afterBody), _), x = t.displayColors ? i + 2 + t.boxPadding : 0, Re(a, (w) => {
    Re(w.before, _), Re(w.lines, _), Re(w.after, _);
  }), x = 0, n.font = d.string, Re(e.footer, _), n.restore(), v += g.width, {
    width: v,
    height: m
  };
}
function Hu(e, t) {
  const { y: n, height: a } = t;
  return n < a / 2 ? "top" : n > e.height - a / 2 ? "bottom" : "center";
}
function ju(e, t, n, a) {
  const { x: o, width: s } = a, i = n.caretSize + n.caretPadding;
  if (e === "left" && o + s + i > t.width || e === "right" && o - s - i < 0)
    return !0;
}
function Wu(e, t, n, a) {
  const { x: o, width: s } = n, { width: i, chartArea: { left: l, right: r } } = e;
  let c = "center";
  return a === "center" ? c = o <= (l + r) / 2 ? "left" : "right" : o <= s / 2 ? c = "left" : o >= i - s / 2 && (c = "right"), ju(c, e, t, n) && (c = "center"), c;
}
function Bs(e, t, n) {
  const a = n.yAlign || t.yAlign || Hu(e, n);
  return {
    xAlign: n.xAlign || t.xAlign || Wu(e, t, n, a),
    yAlign: a
  };
}
function Ku(e, t) {
  let { x: n, width: a } = e;
  return t === "right" ? n -= a : t === "center" && (n -= a / 2), n;
}
function Yu(e, t, n) {
  let { y: a, height: o } = e;
  return t === "top" ? a += n : t === "bottom" ? a -= o + n : a -= o / 2, a;
}
function Ls(e, t, n, a) {
  const { caretSize: o, caretPadding: s, cornerRadius: i } = e, { xAlign: l, yAlign: r } = n, c = o + s, { topLeft: d, topRight: h, bottomLeft: f, bottomRight: b } = vn(i);
  let g = Ku(t, l);
  const m = Yu(t, r, c);
  return r === "center" ? l === "left" ? g += c : l === "right" && (g -= c) : l === "left" ? g -= Math.max(d, f) + o : l === "right" && (g += Math.max(h, b) + o), {
    x: Ze(g, 0, a.width - t.width),
    y: Ze(m, 0, a.height - t.height)
  };
}
function ra(e, t, n) {
  const a = pt(n.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - a.right : e.x + a.left;
}
function Ps(e) {
  return _t([], At(e));
}
function Uu(e, t, n) {
  return hn(e, {
    tooltip: t,
    tooltipItems: n,
    type: "tooltip"
  });
}
function Rs(e, t) {
  const n = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return n ? e.override(n) : e;
}
const qi = {
  beforeTitle: Dt,
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
  afterTitle: Dt,
  beforeBody: Dt,
  beforeLabel: Dt,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const n = e.formattedValue;
    return Pe(n) || (t += n), t;
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
  afterLabel: Dt,
  afterBody: Dt,
  beforeFooter: Dt,
  footer: Dt,
  afterFooter: Dt
};
function at(e, t, n, a) {
  const o = e[t].call(n, a);
  return typeof o > "u" ? qi[t].call(n, a) : o;
}
class Is extends It {
  static positioners = Rn;
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
    const n = this.chart, a = this.options.setContext(this.getContext()), o = a.enabled && n.options.animation && a.animations, s = new Ai(this.chart, o);
    return o._cacheable && (this._cachedAnimations = Object.freeze(s)), s;
  }
  getContext() {
    return this.$context || (this.$context = Uu(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, n) {
    const { callbacks: a } = n, o = at(a, "beforeTitle", this, t), s = at(a, "title", this, t), i = at(a, "afterTitle", this, t);
    let l = [];
    return l = _t(l, At(o)), l = _t(l, At(s)), l = _t(l, At(i)), l;
  }
  getBeforeBody(t, n) {
    return Ps(at(n.callbacks, "beforeBody", this, t));
  }
  getBody(t, n) {
    const { callbacks: a } = n, o = [];
    return Re(t, (s) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, l = Rs(a, s);
      _t(i.before, At(at(l, "beforeLabel", this, s))), _t(i.lines, at(l, "label", this, s)), _t(i.after, At(at(l, "afterLabel", this, s))), o.push(i);
    }), o;
  }
  getAfterBody(t, n) {
    return Ps(at(n.callbacks, "afterBody", this, t));
  }
  getFooter(t, n) {
    const { callbacks: a } = n, o = at(a, "beforeFooter", this, t), s = at(a, "footer", this, t), i = at(a, "afterFooter", this, t);
    let l = [];
    return l = _t(l, At(o)), l = _t(l, At(s)), l = _t(l, At(i)), l;
  }
  _createItems(t) {
    const n = this._active, a = this.chart.data, o = [], s = [], i = [];
    let l = [], r, c;
    for (r = 0, c = n.length; r < c; ++r)
      l.push(Nu(this.chart, n[r]));
    return t.filter && (l = l.filter((d, h, f) => t.filter(d, h, f, a))), t.itemSort && (l = l.sort((d, h) => t.itemSort(d, h, a))), Re(l, (d) => {
      const h = Rs(t.callbacks, d);
      o.push(at(h, "labelColor", this, d)), s.push(at(h, "labelPointStyle", this, d)), i.push(at(h, "labelTextColor", this, d));
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
      const l = Rn[a.position].call(this, o, this._eventPosition);
      i = this._createItems(a), this.title = this.getTitle(i, a), this.beforeBody = this.getBeforeBody(i, a), this.body = this.getBody(i, a), this.afterBody = this.getAfterBody(i, a), this.footer = this.getFooter(i, a);
      const r = this._size = As(this, a), c = Object.assign({}, l, r), d = Bs(this.chart, a, c), h = Ls(a, c, d, this.chart);
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
    const { xAlign: o, yAlign: s } = this, { caretSize: i, cornerRadius: l } = a, { topLeft: r, topRight: c, bottomLeft: d, bottomRight: h } = vn(l), { x: f, y: b } = t, { width: g, height: m } = n;
    let v, p, x, _, w, $;
    return s === "center" ? (w = b + m / 2, o === "left" ? (v = f, p = v - i, _ = w + i, $ = w - i) : (v = f + g, p = v + i, _ = w - i, $ = w + i), x = v) : (o === "left" ? p = f + Math.max(r, d) + i : o === "right" ? p = f + g - Math.max(c, h) - i : p = this.caretX, s === "top" ? (_ = b, w = _ - i, v = p - i, x = p + i) : (_ = b + m, w = _ + i, v = p + i, x = p - i), $ = _), {
      x1: v,
      x2: p,
      x3: x,
      y1: _,
      y2: w,
      y3: $
    };
  }
  drawTitle(t, n, a) {
    const o = this.title, s = o.length;
    let i, l, r;
    if (s) {
      const c = yn(a.rtl, this.x, this.width);
      for (t.x = ra(this, a.titleAlign, a), n.textAlign = c.textAlign(a.titleAlign), n.textBaseline = "middle", i = Qe(a.titleFont), l = a.titleSpacing, n.fillStyle = a.titleColor, n.font = i.string, r = 0; r < s; ++r)
        n.fillText(o[r], c.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + l, r + 1 === s && (t.y += a.titleMarginBottom - l);
    }
  }
  _drawColorBox(t, n, a, o, s) {
    const i = this.labelColors[a], l = this.labelPointStyles[a], { boxHeight: r, boxWidth: c } = s, d = Qe(s.bodyFont), h = ra(this, "left", s), f = o.x(h), b = r < d.lineHeight ? (d.lineHeight - r) / 2 : 0, g = n.y + b;
    if (s.usePointStyle) {
      const m = {
        radius: Math.min(c, r) / 2,
        pointStyle: l.pointStyle,
        rotation: l.rotation,
        borderWidth: 1
      }, v = o.leftForLtr(f, c) + c / 2, p = g + r / 2;
      t.strokeStyle = s.multiKeyBackground, t.fillStyle = s.multiKeyBackground, Ga(t, m, v, p), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, Ga(t, m, v, p);
    } else {
      t.lineWidth = Ae(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const m = o.leftForLtr(f, c), v = o.leftForLtr(o.xPlus(f, 1), c - 2), p = vn(i.borderRadius);
      Object.values(p).some((x) => x !== 0) ? (t.beginPath(), t.fillStyle = s.multiKeyBackground, ba(t, {
        x: m,
        y: g,
        w: c,
        h: r,
        radius: p
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), ba(t, {
        x: v,
        y: g + 1,
        w: c - 2,
        h: r - 2,
        radius: p
      }), t.fill()) : (t.fillStyle = s.multiKeyBackground, t.fillRect(m, g, c, r), t.strokeRect(m, g, c, r), t.fillStyle = i.backgroundColor, t.fillRect(v, g + 1, c - 2, r - 2));
    }
    t.fillStyle = this.labelTextColors[a];
  }
  drawBody(t, n, a) {
    const { body: o } = this, { bodySpacing: s, bodyAlign: i, displayColors: l, boxHeight: r, boxWidth: c, boxPadding: d } = a, h = Qe(a.bodyFont);
    let f = h.lineHeight, b = 0;
    const g = yn(a.rtl, this.x, this.width), m = function(O) {
      n.fillText(O, g.x(t.x + b), t.y + f / 2), t.y += f + s;
    }, v = g.textAlign(i);
    let p, x, _, w, $, S, M;
    for (n.textAlign = i, n.textBaseline = "middle", n.font = h.string, t.x = ra(this, v, a), n.fillStyle = a.bodyColor, Re(this.beforeBody, m), b = l && v !== "right" ? i === "center" ? c / 2 + d : c + 2 + d : 0, w = 0, S = o.length; w < S; ++w) {
      for (p = o[w], x = this.labelTextColors[w], n.fillStyle = x, Re(p.before, m), _ = p.lines, l && _.length && (this._drawColorBox(n, t, w, g, a), f = Math.max(h.lineHeight, r)), $ = 0, M = _.length; $ < M; ++$)
        m(_[$]), f = h.lineHeight;
      Re(p.after, m);
    }
    b = 0, f = h.lineHeight, Re(this.afterBody, m), t.y -= s;
  }
  drawFooter(t, n, a) {
    const o = this.footer, s = o.length;
    let i, l;
    if (s) {
      const r = yn(a.rtl, this.x, this.width);
      for (t.x = ra(this, a.footerAlign, a), t.y += a.footerMarginTop, n.textAlign = r.textAlign(a.footerAlign), n.textBaseline = "middle", i = Qe(a.footerFont), n.fillStyle = a.footerColor, n.font = i.string, l = 0; l < s; ++l)
        n.fillText(o[l], r.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + a.footerSpacing;
    }
  }
  drawBackground(t, n, a, o) {
    const { xAlign: s, yAlign: i } = this, { x: l, y: r } = t, { width: c, height: d } = a, { topLeft: h, topRight: f, bottomLeft: b, bottomRight: g } = vn(o.cornerRadius);
    n.fillStyle = o.backgroundColor, n.strokeStyle = o.borderColor, n.lineWidth = o.borderWidth, n.beginPath(), n.moveTo(l + h, r), i === "top" && this.drawCaret(t, n, a, o), n.lineTo(l + c - f, r), n.quadraticCurveTo(l + c, r, l + c, r + f), i === "center" && s === "right" && this.drawCaret(t, n, a, o), n.lineTo(l + c, r + d - g), n.quadraticCurveTo(l + c, r + d, l + c - g, r + d), i === "bottom" && this.drawCaret(t, n, a, o), n.lineTo(l + b, r + d), n.quadraticCurveTo(l, r + d, l, r + d - b), i === "center" && s === "left" && this.drawCaret(t, n, a, o), n.lineTo(l, r + h), n.quadraticCurveTo(l, r, l + h, r), n.closePath(), n.fill(), o.borderWidth > 0 && n.stroke();
  }
  _updateAnimationTarget(t) {
    const n = this.chart, a = this.$animations, o = a && a.x, s = a && a.y;
    if (o || s) {
      const i = Rn[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const l = this._size = As(this, t), r = Object.assign({}, i, this._size), c = Bs(n, t, r), d = Ls(t, r, c, n);
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
    const i = pt(n.padding), l = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    n.enabled && l && (t.save(), t.globalAlpha = a, this.drawBackground(s, t, o, n), Mi(t, n.textDirection), s.y += i.top, this.drawTitle(s, t, n), this.drawBody(s, t, n), this.drawFooter(s, t, n), Di(t, n.textDirection), t.restore());
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
    }), s = !ga(a, o), i = this._positionChanged(o, n);
    (s || i) && (this._active = o, this._eventPosition = n, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, n, a = !0) {
    if (n && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const o = this.options, s = this._active || [], i = this._getActiveElements(t, s, n, a), l = this._positionChanged(i, t), r = n || !ga(i, s) || l;
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
    const { caretX: a, caretY: o, options: s } = this, i = Rn[s.position].call(this, t, n);
    return i !== !1 && (a !== i.x || o !== i.y);
  }
}
var xo = {
  id: "tooltip",
  _element: Is,
  positioners: Rn,
  afterInit(e, t, n) {
    n && (e.tooltip = new Is({
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
    callbacks: qi
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
const qu = (e, t, n, a) => (typeof t == "string" ? (n = e.push(t) - 1, a.unshift({
  index: n,
  label: t
})) : isNaN(t) && (n = null), n);
function Xu(e, t, n, a) {
  const o = e.indexOf(t);
  if (o === -1)
    return qu(e, t, n, a);
  const s = e.lastIndexOf(t);
  return o !== s ? n : o;
}
const Gu = (e, t) => e === null ? null : Ze(Math.round(e), 0, t);
function Es(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Xi extends wn {
  static id = "category";
  static defaults = {
    ticks: {
      callback: Es
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
    if (Pe(t))
      return null;
    const a = this.getLabels();
    return n = isFinite(n) && a[n] === t ? n : Xu(a, t, we(n, t), this._addedLabels), Gu(n, a.length - 1);
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
    return Es.call(this, t);
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
function Zu(e, t) {
  const n = [], { bounds: o, step: s, min: i, max: l, precision: r, count: c, maxTicks: d, maxDigits: h, includeBounds: f } = e, b = s || 1, g = d - 1, { min: m, max: v } = t, p = !Pe(i), x = !Pe(l), _ = !Pe(c), w = (v - m) / (h + 1);
  let $ = Fo((v - m) / g / b) * b, S, M, O, j;
  if ($ < 1e-14 && !p && !x)
    return [
      {
        value: m
      },
      {
        value: v
      }
    ];
  j = Math.ceil(v / $) - Math.floor(m / $), j > g && ($ = Fo(j * $ / g / b) * b), Pe(r) || (S = Math.pow(10, r), $ = Math.ceil($ * S) / S), o === "ticks" ? (M = Math.floor(m / $) * $, O = Math.ceil(v / $) * $) : (M = m, O = v), p && x && s && hr((l - i) / s, $ / 1e3) ? (j = Math.round(Math.min((l - i) / $, d)), $ = (l - i) / j, M = i, O = l) : _ ? (M = p ? i : M, O = x ? l : O, j = c - 1, $ = (O - M) / j) : (j = (O - M) / $, En(j, Math.round(j), $ / 1e3) ? j = Math.round(j) : j = Math.ceil(j));
  const F = Math.max(Oo($), Oo(M));
  S = Math.pow(10, Pe(r) ? F : r), M = Math.round(M * S) / S, O = Math.round(O * S) / S;
  let A = 0;
  for (p && (f && M !== i ? (n.push({
    value: i
  }), M < i && A++, En(Math.round((M + A * $) * S) / S, i, Fs(i, w, e)) && A++) : M < i && A++); A < j; ++A) {
    const L = Math.round((M + A * $) * S) / S;
    if (x && L > l)
      break;
    n.push({
      value: L
    });
  }
  return x && f && O !== l ? n.length && En(n[n.length - 1].value, l, Fs(l, w, e)) ? n[n.length - 1].value = l : n.push({
    value: l
  }) : (!x || O === l) && n.push({
    value: O
  }), n;
}
function Fs(e, t, { horizontal: n, minRotation: a }) {
  const o = Pt(a), s = (n ? Math.sin(o) : Math.cos(o)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / s, i);
}
class Qu extends wn {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, n) {
    return Pe(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: n, maxDefined: a } = this.getUserBounds();
    let { min: o, max: s } = this;
    const i = (r) => o = n ? o : r, l = (r) => s = a ? s : r;
    if (t) {
      const r = $t(o), c = $t(s);
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
    }, s = this._range || this, i = Zu(o, s);
    return t.bounds === "ticks" && fr(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
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
    return ro(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Gi extends Qu {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: yi.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!0);
    this.min = gt(t) ? t : 0, this.max = gt(n) ? n : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), n = t ? this.width : this.height, a = Pt(this.options.ticks.minRotation), o = (t ? Math.sin(a) : Math.cos(a)) || 1e-3, s = this._resolveTickFontOptions(0);
    return Math.ceil(n / Math.min(40, s.lineHeight / o));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const Ma = {
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
}, it = /* @__PURE__ */ Object.keys(Ma);
function Os(e, t) {
  return e - t;
}
function Vs(e, t) {
  if (Pe(t))
    return null;
  const n = e._adapter, { parser: a, round: o, isoWeekday: s } = e._parseOpts;
  let i = t;
  return typeof a == "function" && (i = a(i)), gt(i) || (i = typeof a == "string" ? n.parse(i, a) : n.parse(i)), i === null ? null : (o && (i = o === "week" && (jn(s) || s === !0) ? n.startOf(i, "isoWeek", s) : n.startOf(i, o)), +i);
}
function zs(e, t, n, a) {
  const o = it.length;
  for (let s = it.indexOf(e); s < o - 1; ++s) {
    const i = Ma[it[s]], l = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((n - t) / (l * i.size)) <= a)
      return it[s];
  }
  return it[o - 1];
}
function Ju(e, t, n, a, o) {
  for (let s = it.length - 1; s >= it.indexOf(n); s--) {
    const i = it[s];
    if (Ma[i].common && e._adapter.diff(o, a, i) >= t - 1)
      return i;
  }
  return it[n ? it.indexOf(n) : 0];
}
function eh(e) {
  for (let t = it.indexOf(e) + 1, n = it.length; t < n; ++t)
    if (Ma[it[t]].common)
      return it[t];
}
function Ns(e, t, n) {
  if (!n)
    e[t] = !0;
  else if (n.length) {
    const { lo: a, hi: o } = so(n, t), s = n[a] >= t ? n[a] : n[o];
    e[s] = !0;
  }
}
function th(e, t, n, a) {
  const o = e._adapter, s = +o.startOf(t[0].value, a), i = t[t.length - 1].value;
  let l, r;
  for (l = s; l <= i; l = +o.add(l, 1, a))
    r = n[l], r >= 0 && (t[r].major = !0);
  return t;
}
function Hs(e, t, n) {
  const a = [], o = {}, s = t.length;
  let i, l;
  for (i = 0; i < s; ++i)
    l = t[i], o[l] = i, a.push({
      value: l,
      major: !1
    });
  return s === 0 || !n ? a : th(e, a, o, n);
}
class js extends wn {
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
    const a = t.time || (t.time = {}), o = this._adapter = new nd._date(t.adapters.date);
    o.init(n), In(a.displayFormats, o.formats()), this._parseOpts = {
      parser: a.parser,
      round: a.round,
      isoWeekday: a.isoWeekday
    }, super.init(t), this._normalized = n.normalized;
  }
  parse(t, n) {
    return t === void 0 ? null : Vs(this, t);
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
    (!i || !l) && (r(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && r(this.getMinMax(!1))), o = gt(o) && !isNaN(o) ? o : +n.startOf(Date.now(), a), s = gt(s) && !isNaN(s) ? s : +n.endOf(Date.now(), a) + 1, this.min = Math.min(o, s - 1), this.max = Math.max(o + 1, s);
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
    const s = this.min, i = this.max, l = vr(o, s, i);
    return this._unit = n.unit || (a.autoSkip ? zs(n.minUnit, this.min, this.max, this._getLabelCapacity(s)) : Ju(this, l.length, n.minUnit, this.min, this.max)), this._majorUnit = !a.major.enabled || this._unit === "year" ? void 0 : eh(this._unit), this.initOffsets(o), t.reverse && l.reverse(), Hs(this, l, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let n = 0, a = 0, o, s;
    this.options.offset && t.length && (o = this.getDecimalForValue(t[0]), t.length === 1 ? n = 1 - o : n = (this.getDecimalForValue(t[1]) - o) / 2, s = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? a = s : a = (s - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    n = Ze(n, 0, i), a = Ze(a, 0, i), this._offsets = {
      start: n,
      end: a,
      factor: 1 / (n + 1 + a)
    };
  }
  _generate() {
    const t = this._adapter, n = this.min, a = this.max, o = this.options, s = o.time, i = s.unit || zs(s.minUnit, n, a, this._getLabelCapacity(n)), l = we(o.ticks.stepSize, 1), r = i === "week" ? s.isoWeekday : !1, c = jn(r) || r === !0, d = {};
    let h = n, f, b;
    if (c && (h = +t.startOf(h, "isoWeek", r)), h = +t.startOf(h, c ? "day" : i), t.diff(a, n, i) > 1e5 * l)
      throw new Error(n + " and " + a + " are too far apart with stepSize of " + l + " " + i);
    const g = o.ticks.source === "data" && this.getDataTimestamps();
    for (f = h, b = 0; f < a; f = +t.add(f, l, i), b++)
      Ns(d, f, g);
    return (f === a || o.bounds === "ticks" || b === 1) && Ns(d, f, g), Object.keys(d).sort(Os).map((m) => +m);
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
      return Ee(i, [
        t,
        n,
        a
      ], this);
    const l = s.time.displayFormats, r = this._unit, c = this._majorUnit, d = r && l[r], h = c && l[c], f = a[n], b = c && h && f && f.major;
    return this._adapter.format(t, o || (b ? h : d));
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
    const n = this.options.ticks, a = this.ctx.measureText(t).width, o = Pt(this.isHorizontal() ? n.maxRotation : n.minRotation), s = Math.cos(o), i = Math.sin(o), l = this._resolveTickFontOptions(0).size;
    return {
      w: a * s + l * i,
      h: a * i + l * s
    };
  }
  _getLabelCapacity(t) {
    const n = this.options.time, a = n.displayFormats, o = a[n.unit] || a.millisecond, s = this._tickFormatFunction(t, 0, Hs(this, [
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
      t.push(Vs(this, o[n]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return mi(t.sort(Os));
  }
}
function ca(e, t, n) {
  let a = 0, o = e.length - 1, s, i, l, r;
  n ? (t >= e[a].pos && t <= e[o].pos && ({ lo: a, hi: o } = on(e, "pos", t)), { pos: s, time: l } = e[a], { pos: i, time: r } = e[o]) : (t >= e[a].time && t <= e[o].time && ({ lo: a, hi: o } = on(e, "time", t)), { time: s, pos: l } = e[a], { time: i, pos: r } = e[o]);
  const c = i - s;
  return c ? l + (r - l) * (t - s) / c : l;
}
class oS extends js {
  static id = "timeseries";
  static defaults = js.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(t);
    this._minPos = ca(n, this.min), this._tableRange = ca(n, this.max) - this._minPos, super.initOffsets(t);
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
    return (ca(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const n = this._offsets, a = this.getDecimalForPixel(t) / n.factor - n.end;
    return ca(this._table, a * this._tableRange + this._minPos, !0);
  }
}
const Zi = {
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
}, nh = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, ah = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...Zi,
  ...nh
}, oh = Sl[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function bn(e) {
  return si(e) ? Ya(e) : e;
}
function sh(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return si(t) ? new Proxy(e, {}) : e;
}
function ih(e, t) {
  const n = e.options;
  n && t && Object.assign(n, t);
}
function Qi(e, t) {
  e.labels = t;
}
function Ji(e, t, n) {
  const a = [];
  e.datasets = t.map((o) => {
    const s = e.datasets.find((i) => i[n] === o[n]);
    return !s || !o.data || a.includes(s) ? {
      ...o
    } : (a.push(s), Object.assign(s, o), s);
  });
}
function lh(e, t) {
  const n = {
    labels: [],
    datasets: []
  };
  return Qi(n, e.labels), Ji(n, e.datasets, t), n;
}
const rh = le({
  props: ah,
  setup(e, t) {
    let { expose: n, slots: a } = t;
    const o = oe(null), s = oi(null);
    n({
      chart: s
    });
    const i = () => {
      if (!o.value) return;
      const { type: c, data: d, options: h, plugins: f, datasetIdKey: b } = e, g = lh(d, b), m = sh(g, d);
      s.value = new qt(o.value, {
        type: c,
        data: m,
        options: {
          ...h
        },
        plugins: f
      });
    }, l = () => {
      const c = Ya(s.value);
      c && (e.destroyDelay > 0 ? setTimeout(() => {
        c.destroy(), s.value = null;
      }, e.destroyDelay) : (c.destroy(), s.value = null));
    }, r = (c) => {
      c.update(e.updateMode);
    };
    return Je(i), ct(l), Fe([
      () => e.options,
      () => e.data
    ], (c, d) => {
      let [h, f] = c, [b, g] = d;
      const m = Ya(s.value);
      if (!m)
        return;
      let v = !1;
      if (h) {
        const p = bn(h), x = bn(b);
        p && p !== x && (ih(m, p), v = !0);
      }
      if (f) {
        const p = bn(f.labels), x = bn(g.labels), _ = bn(f.datasets), w = bn(g.datasets);
        p !== x && (Qi(m.config.data, p), v = !0), _ && _ !== w && (Ji(m.config.data, _, e.datasetIdKey), v = !0);
      }
      v && Ne(() => {
        r(m);
      });
    }, {
      deep: !0
    }), () => Ka("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: o
    }, [
      Ka("p", {}, [
        a.default ? a.default() : ""
      ])
    ]);
  }
});
function _o(e, t) {
  return qt.register(t), le({
    props: Zi,
    setup(n, a) {
      let { expose: o } = a;
      const s = oi(null), i = (l) => {
        s.value = l?.chart;
      };
      return o({
        chart: s
      }), () => Ka(rh, oh({
        ref: i
      }, {
        type: e,
        ...n
      }));
    }
  });
}
const ch = /* @__PURE__ */ _o("bar", Zc), dh = /* @__PURE__ */ _o("line", ed), uh = /* @__PURE__ */ _o("pie", td), Ws = {
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
}, Ks = {
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
}, hh = [
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
function Me(e) {
  const t = oe("light");
  let n = null;
  const a = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", o = C(() => e?.value ? e.value : t.value), s = C(() => o.value === "dark"), i = C(() => s.value ? Ks : Ws), l = () => {
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
  return Je(() => {
    l();
  }), ct(() => {
    r();
  }), e && Fe(e, () => {
  }), {
    isDark: s,
    currentTheme: o,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: Ws,
    darkColors: Ks,
    chartSeriesColors: hh
  };
}
const _a = 5, ko = 8, fh = /^x\d*$/, gh = /^y\d*$/;
function el(e) {
  if (!e || typeof e != "object") return e;
  const t = { ...e }, n = t.scales;
  if (!n || typeof n != "object") return t;
  const a = { ...n };
  for (const o of Object.keys(a)) {
    const s = a[o];
    if (!s || typeof s != "object") continue;
    const i = { ...s }, l = i.ticks, r = l && typeof l == "object" ? { ...l } : {};
    if (fh.test(o) && (r.maxTicksLimit = ko, r.autoSkip = !0, r.minRotation = 0, r.maxRotation = 0, r.autoSkipPadding = r.autoSkipPadding ?? 8), gh.test(o))
      if (Array.isArray(r.values) && r.values.length > 0)
        r.maxTicksLimit = r.values.length;
      else if (r.stepSize != null) {
        const c = Number(i.min ?? i.suggestedMin ?? 0), d = Number(i.max ?? i.suggestedMax ?? 0), h = Number(r.stepSize);
        d > c && h > 0 ? r.maxTicksLimit = Math.floor((d - c) / h) + 1 : r.maxTicksLimit = _a;
      } else
        r.maxTicksLimit = _a;
    i.ticks = r, a[o] = i;
  }
  return t.scales = a, t;
}
const ot = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", ph = ["titleFont", "bodyFont", "footerFont"];
function tl(e, t = ot) {
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
      for (const r of ph) {
        const c = l[r];
        c && typeof c == "object" && (l[r] = { ...c, family: t });
      }
      o.tooltip = l;
    }
    n.plugins = o;
  }
  return n;
}
const mh = { class: "relative h-[230px] w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Ys = 10, bh = /* @__PURE__ */ le({
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
    qt.register(Xi, Gi, Ru, Ui, xo, yo), qt.defaults.font.family = ot;
    const { isDark: a, colors: o } = Me(Se(n, "theme")), s = C(() => n.data), i = (d) => typeof d == "string" ? d.charAt(0).toUpperCase() + d.slice(1).toLowerCase() : d, l = (d) => typeof d != "string" ? d : n.uppercaseLegendLabels ? d.toUpperCase() : i(d);
    function r(d, h) {
      if (h == null) return d;
      if (Array.isArray(h) || typeof h != "object" || d == null || Array.isArray(d) || typeof d != "object") return h;
      const f = { ...d };
      for (const b of Object.keys(h)) {
        const g = h[b];
        g !== void 0 && (f[b] = r(d[b], g));
      }
      return f;
    }
    const c = C(() => {
      const d = {
        font: {
          family: ot
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
                family: ot,
                size: 13,
                weight: "500"
              },
              padding: 12,
              boxWidth: Ys,
              boxHeight: Ys,
              usePointStyle: !1,
              generateLabels: function(f) {
                return f.data.datasets.map((g, m) => {
                  const v = Array.isArray(g.backgroundColor) ? g.backgroundColor[0] : g.backgroundColor, p = Array.isArray(g.borderColor) ? g.borderColor[0] : g.borderColor, x = typeof p == "string" && p.length > 0 ? p : typeof v == "string" && v.length > 0 ? v : o.value.textSecondary;
                  return {
                    text: l(g.label || ""),
                    fillStyle: typeof v == "string" ? v : x,
                    strokeStyle: x,
                    lineWidth: 0,
                    fontColor: x,
                    hidden: !f.isDatasetVisible(m),
                    index: m,
                    datasetIndex: m
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
              family: ot,
              size: 13,
              weight: "600"
            },
            bodyFont: {
              family: ot,
              size: 12,
              weight: "500"
            },
            boxPadding: 6,
            callbacks: {
              title: function(f) {
                return f.length > 0 ? String(i(f[0].label)) : "";
              },
              label: function(f) {
                let b = String(i(f.dataset.label || ""));
                return b && (b += ": "), f.parsed.y !== null && (b += f.parsed.y), b;
              }
            }
          }
        },
        scales: {
          y: {
            type: "linear",
            display: !0,
            position: "left",
            beginAtZero: !0,
            stacked: n.stacked || !1,
            grid: {
              color: o.value.gridLines
            },
            ticks: {
              maxTicksLimit: _a,
              font: {
                family: ot,
                size: 12,
                weight: "500"
              },
              color: o.value.textSecondary,
              padding: 8,
              callback: function(f) {
                return i(f);
              }
            }
          },
          x: {
            display: !0,
            stacked: n.stacked || !1,
            offset: !0,
            grid: {
              color: o.value.gridLines,
              lineWidth: 1,
              drawTicks: !1
            },
            ticks: {
              maxTicksLimit: ko,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: ot,
                size: 12,
                weight: "500"
              },
              color: o.value.textSecondary,
              padding: 8,
              callback: function(f) {
                const b = this.getLabelForValue(f);
                return i(b);
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
      return tl(
        el(h)
      );
    });
    return t({ isDark: a }), (d, h) => (y(), k("div", mh, [
      z(B(ch), {
        data: s.value,
        options: c.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), me = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, o] of t)
    n[a] = o;
  return n;
}, St = /* @__PURE__ */ me(bh, [["__scopeId", "data-v-2a91c92d"]]), vh = { class: "chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] min-w-0" }, yh = { class: "chart-line-canvas-host relative min-h-0 w-full flex-1" }, xh = {
  key: 0,
  class: "chart-line-indicators mt-0 flex shrink-0 list-none flex-nowrap items-center justify-center gap-x-4 overflow-x-auto overflow-y-hidden px-1 pb-0.5 pt-0.5",
  role: "list"
}, _h = ["aria-pressed", "aria-label", "onClick"], kh = {
  class: "inline-flex shrink-0 items-center",
  "aria-hidden": "true"
}, wh = /* @__PURE__ */ le({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    uppercaseLegendLabels: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    qt.register(
      Xi,
      Gi,
      Du,
      Mu,
      Ui,
      xo,
      yo
    ), qt.defaults.font.family = ot;
    const a = oe(null), { isDark: o, colors: s } = Me(Se(n, "theme")), i = C(() => s.value.bgCard), l = C(() => {
      const v = i.value;
      return {
        labels: n.data.labels,
        datasets: n.data.datasets.map((p) => {
          const x = p.borderColor, _ = Array.isArray(x) ? x[0] : x, w = typeof _ == "string" && _.length > 0 ? _ : s.value.textSecondary, $ = p.pointBackgroundColor !== void 0 ? p.pointBackgroundColor : v, S = p.pointHoverBackgroundColor !== void 0 ? p.pointHoverBackgroundColor : $, M = p.pointBorderWidth ?? 2, O = p.pointHoverBorderWidth ?? M;
          return {
            ...p,
            fill: p.fill ?? !1,
            clip: p.clip ?? !1,
            pointBackgroundColor: $,
            pointHoverBackgroundColor: S,
            pointBorderColor: p.pointBorderColor ?? w,
            pointHoverBorderColor: p.pointHoverBorderColor ?? w,
            pointBorderWidth: M,
            pointHoverBorderWidth: O
          };
        })
      };
    }), r = (v) => typeof v == "string" ? v.charAt(0).toUpperCase() + v.slice(1).toLowerCase() : v, c = (v) => typeof v != "string" ? v : n.uppercaseLegendLabels ? v.toUpperCase() : r(v);
    function d(v) {
      const p = v.borderColor, x = Array.isArray(p) ? p[0] : p;
      return typeof x == "string" && x.length > 0 ? x : s.value.textSecondary;
    }
    const h = C(
      () => l.value.datasets.map((v, p) => ({
        key: `${v.label ?? "dataset"}-${p}`,
        label: c(v.label || ""),
        color: d(v)
      }))
    ), f = oe([]);
    Fe(
      () => l.value.datasets.length,
      (v) => {
        const p = Array.from({ length: v }, (x, _) => f.value[_] ?? !0);
        f.value = p;
      },
      { immediate: !0 }
    );
    function b(v) {
      const x = a.value?.chart;
      if (!x || v < 0 || v >= x.data.datasets.length) return;
      const _ = !x.isDatasetVisible(v);
      x.setDatasetVisibility(v, _), f.value[v] = _, x.update();
    }
    function g(v, p) {
      if (p == null) return v;
      if (Array.isArray(p) || typeof p != "object" || v == null || Array.isArray(v) || typeof v != "object") return p;
      const x = { ...v };
      for (const _ of Object.keys(p)) {
        const w = p[_];
        w !== void 0 && (x[_] = g(v[_], w));
      }
      return x;
    }
    const m = C(() => {
      const v = {
        font: {
          family: ot
        },
        color: s.value.textSecondary,
        responsive: !0,
        maintainAspectRatio: !1,
        layout: {
          padding: {
            top: 8,
            bottom: 8,
            left: 4,
            right: 4
          }
        },
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
              family: ot,
              size: 14,
              weight: "600"
            },
            bodyFont: {
              family: ot,
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
              maxTicksLimit: ko,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: ot,
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
              maxTicksLimit: _a,
              font: {
                family: ot,
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
      }, p = n.options ? g(v, n.options) : v;
      return tl(
        el(p)
      );
    });
    return t({ isDark: o }), (v, p) => (y(), k("div", vh, [
      u("div", yh, [
        z(B(dh), {
          ref_key: "lineChartRef",
          ref: a,
          data: l.value,
          options: m.value
        }, null, 8, ["data", "options"])
      ]),
      h.value.length > 0 ? (y(), k("ul", xh, [
        (y(!0), k(se, null, pe(h.value, (x, _) => (y(), k("li", {
          key: x.key,
          role: "listitem"
        }, [
          u("button", {
            type: "button",
            class: ee(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", f.value[_] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: $e({ color: x.color }),
            "aria-pressed": f.value[_] !== !1,
            "aria-label": `${x.label}. ${f.value[_] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (w) => b(_)
          }, [
            u("span", kh, [
              p[0] || (p[0] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1)),
              u("span", {
                class: "relative z-[1] box-border size-2 shrink-0 rounded-full border-2 bg-transparent",
                style: $e({ borderColor: x.color })
              }, null, 4),
              p[1] || (p[1] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1))
            ]),
            u("span", null, D(x.label), 1)
          ], 14, _h)
        ]))), 128))
      ])) : V("", !0)
    ]));
  }
}), vt = /* @__PURE__ */ me(wh, [["__scopeId", "data-v-426e23d5"]]), Ch = { class: "chart-container" }, $h = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Sh = /* @__PURE__ */ le({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    qt.register(bu, xo, yo);
    const { isDark: a, colors: o } = Me(Se(n, "theme")), s = n.data, i = (r) => typeof r == "string" ? r.charAt(0).toUpperCase() + r.slice(1).toLowerCase() : r, l = C(() => n.options ? n.options : {
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
              family: $h,
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
                const b = r.getDatasetMeta(0).controller.getStyle(h), m = c.datasets[0].data[h], v = typeof b.backgroundColor == "string" && b.backgroundColor.length > 0 ? b.backgroundColor : o.value.textSecondary;
                return {
                  text: `${i(d)}: ${m}`,
                  fillStyle: b.backgroundColor,
                  strokeStyle: b.borderColor,
                  lineWidth: b.borderWidth,
                  lineDash: b.borderDash,
                  lineDashOffset: b.borderDashOffset,
                  lineJoin: b.borderJoinStyle,
                  fontColor: v,
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
              const c = r.label || "", d = r.parsed || 0, h = r.dataset.data.reduce((b, g) => b + g, 0), f = (d / h * 100).toFixed(1);
              return `${i(c)}: ${d} (${f}%)`;
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
    return t({ isDark: a }), (r, c) => (y(), k("div", Ch, [
      z(B(uh), {
        data: B(s),
        options: l.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Da = /* @__PURE__ */ me(Sh, [["__scopeId", "data-v-0f7806d6"]]), Mh = { class: "chart-container" }, Dh = ["viewBox"], Th = ["transform"], Ah = ["x", "width", "fill", "stroke"], Bh = ["fill"], Lh = ["x1", "y1", "x2", "y2", "stroke"], Ph = ["points", "fill"], Rh = ["x1", "y1", "x2", "y2", "stroke"], Ih = ["x", "y", "fill"], Eh = ["x1", "y1", "x2", "y2", "stroke"], Fh = ["points", "fill"], Oh = ["transform"], Vh = ["y1", "y2"], zh = ["y1", "y2"], Nh = ["y1", "y2"], Hh = ["y1", "y2"], jh = ["y", "height"], Wh = ["y1", "y2"], Kh = ["y1", "y2"], Yh = ["y1", "y2"], Uh = ["y1", "y2"], qh = ["y", "height"], Xh = ["cy", "stroke", "onMouseenter"], Gh = ["cy", "stroke", "onMouseenter"], Zh = ["cy", "stroke", "onMouseenter"], Qh = ["cy", "stroke", "onMouseenter"], Jh = ["y1", "y2", "onMouseenter"], ef = ["y1", "y2", "onMouseenter"], tf = ["x", "y", "fill"], nf = ["x", "y", "fill"], af = ["transform"], of = { transform: "translate(-200, 0)" }, sf = ["stroke"], lf = ["fill"], rf = { transform: "translate(-130, 0)" }, cf = ["stroke"], df = ["fill"], uf = { transform: "translate(-60, 0)" }, hf = ["stroke"], ff = ["fill"], gf = { transform: "translate(10, 0)" }, pf = ["stroke"], mf = ["fill"], bf = { transform: "translate(80, 0)" }, vf = ["fill"], yf = { transform: "translate(150, 0)" }, xf = ["fill"], _f = /* @__PURE__ */ le({
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
    const n = e, { isDark: a } = Me(Se(n, "theme")), o = C(() => ({
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
    }), i = (f) => typeof f == "string" ? f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() : f, l = (f, b) => {
      const g = f.currentTarget.closest("svg");
      if (!g) return;
      const m = g.getBoundingClientRect(), v = g.createSVGPoint();
      v.x = f.clientX - m.left, v.y = f.clientY - m.top, s.value = {
        visible: !0,
        x: v.x,
        y: v.y - 20,
        text: b
      };
    }, r = (f) => {
      if (s.value.visible) {
        const b = f.currentTarget, g = b.getBoundingClientRect(), m = b.createSVGPoint();
        m.x = f.clientX - g.left, m.y = f.clientY - g.top, s.value.x = m.x, s.value.y = m.y - 20;
      }
    }, c = () => {
      s.value.visible = !1;
    }, d = () => {
      s.value.visible = !1;
    }, h = C(() => {
      const f = [], g = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let m = 1; m <= 10; m++) {
        const v = m, p = (v - 1) / 9, x = n.chartMargin + g - p * g;
        f.push({ value: v, y: x });
      }
      return f;
    });
    return t({ isDark: a }), (f, b) => (y(), k("div", Mh, [
      (y(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: $e(`min-height: ${e.chartHeight}px;`),
        onMousemove: r,
        onMouseleave: c
      }, [
        s.value.visible ? (y(), k("g", {
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
          }, null, 8, Ah),
          u("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: o.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, D(s.value.text), 9, Bh)
        ], 8, Th)) : V("", !0),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, Lh),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: o.value.axis
        }, null, 8, Ph),
        (y(!0), k(se, null, pe(h.value, (g, m) => (y(), k(se, { key: m }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: g.y,
            x2: e.chartMargin,
            y2: g.y,
            stroke: o.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Rh),
          u("text", {
            x: e.chartMargin - 12,
            y: g.y + 4,
            "text-anchor": "end",
            fill: o.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, D(g.value), 9, Ih)
        ], 64))), 128)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, Eh),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: o.value.axis
        }, null, 8, Fh),
        (y(!0), k(se, null, pe(e.boxplotData, (g, m) => (y(), k(se, { key: m }, [
          u("g", {
            transform: `translate(${g.centerX}, 0)`
          }, [
            g.isTotal ? (y(), k(se, { key: 0 }, [
              u("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Vh),
              u("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, zh),
              u("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Nh),
              u("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Hh),
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
              }, null, 8, jh)
            ], 64)) : (y(), k(se, { key: 1 }, [
              u("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Wh),
              u("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Kh),
              u("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Yh),
              u("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Uh),
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
              }, null, 8, qh)
            ], 64)),
            u("circle", {
              cx: 0,
              cy: g.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Min: ${g.min.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Xh),
            u("circle", {
              cx: 0,
              cy: g.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Q1: ${g.q1.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Gh),
            u("circle", {
              cx: 0,
              cy: g.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Q3: ${g.q3.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Zh),
            u("circle", {
              cx: 0,
              cy: g.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Max: ${g.max.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Qh),
            u("line", {
              x1: -24,
              y1: g.medianY,
              x2: 24,
              y2: g.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (v) => l(v, `Median: ${g.median.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Jh),
            g.averageY ? (y(), k("line", {
              key: 2,
              x1: -24,
              y1: g.averageY,
              x2: 24,
              y2: g.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (v) => l(v, `Avg: ${g.average.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, ef)) : V("", !0)
          ], 8, Oh),
          u("text", {
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: o.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, D(i(g.label)), 9, tf),
          g.responseCount ? (y(), k("text", {
            key: 0,
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: o.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + D(g.responseCount), 9, nf)) : V("", !0)
        ], 64))), 128)),
        e.showLegend ? (y(), k("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          u("g", of, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, sf),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, lf)
          ]),
          u("g", rf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, cf),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, df)
          ]),
          u("g", uf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, hf),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, ff)
          ]),
          u("g", gf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, pf),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, mf)
          ]),
          u("g", bf, [
            b[0] || (b[0] = u("line", {
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
            }, " Avg ", 8, vf)
          ]),
          u("g", yf, [
            b[1] || (b[1] = u("line", {
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
            }, " Median ", 8, xf)
          ])
        ], 8, af)) : V("", !0)
      ], 44, Dh))
    ]));
  }
}), kf = /* @__PURE__ */ me(_f, [["__scopeId", "data-v-9ac5c075"]]), wf = { class: "chart-container" }, Cf = ["viewBox"], $f = ["x1", "y1", "x2", "y2", "stroke"], Sf = ["points", "fill"], Mf = ["x1", "y1", "x2", "y2", "stroke"], Df = ["x1", "y1", "x2", "y2", "stroke"], Tf = ["x", "y", "fill"], Af = ["x", "y", "fill", "transform"], Bf = ["x1", "y1", "x2", "y2", "stroke"], Lf = ["points", "fill"], Pf = ["transform"], Rf = ["y1", "y2", "stroke", "onMouseenter"], If = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], Ef = ["x1", "y1", "x2", "y2", "onMouseenter"], Ff = ["x1", "y1", "x2", "y2", "onMouseenter"], Of = ["cy", "stroke", "onMouseenter"], Vf = ["cy", "stroke", "onMouseenter"], zf = ["x", "y", "fill"], Nf = ["x", "y", "fill"], Hf = ["transform"], jf = { transform: "translate(-180, 0)" }, Wf = ["stroke"], Kf = ["fill"], Yf = { transform: "translate(-120, 0)" }, Uf = ["fill"], qf = { transform: "translate(-60, 0)" }, Xf = ["fill"], Gf = { transform: "translate(0, 0)" }, Zf = ["stroke"], Qf = ["fill"], Jf = { transform: "translate(60, 0)" }, eg = ["fill"], tg = { transform: "translate(130, 0)" }, ng = ["fill"], ag = ["transform"], og = ["x", "y", "width", "height", "fill", "stroke"], sg = ["y", "fill"], ig = ["y", "fill"], da = 10, lg = 14, Ha = 13, Us = 4, qs = 12, rg = /* @__PURE__ */ le({
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
    const n = e, { isDark: a, colors: o } = Me(Se(n, "theme")), s = da + Ha + Us + qs + da, i = C(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(x, _, w) {
      const $ = w ? 0.6 : 0.535;
      return Math.ceil(Math.max(x, 1) * _ * $);
    }
    function r(x, _) {
      return Math.max(
        l(x.length, Ha, !0),
        l(_.length, qs, !1),
        52
      ) + lg * 2;
    }
    function c(x, _, w, $) {
      const S = w / 2, M = 6, O = Math.min(
        Math.max(x, S + M),
        n.chartWidth - S - M
      ), j = M + $ + 10, F = n.chartHeight - M + 10, A = Math.min(Math.max(_, j), F);
      return { x: O, y: A };
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
    }), f = (x) => typeof x == "string" ? x.charAt(0).toUpperCase() + x.slice(1).toLowerCase() : x, b = (x, _, w) => {
      const $ = x.currentTarget.closest("svg");
      if (!$) return;
      const S = $.getBoundingClientRect(), M = $.createSVGPoint();
      M.x = x.clientX - S.left, M.y = x.clientY - S.top;
      let O = f(_.label), j = "";
      switch (w) {
        case "body":
          j = `Q1: ${_.q1.toFixed(1)} | Q3: ${_.q3.toFixed(1)}`;
          break;
        case "wick":
          j = `Min: ${_.low.toFixed(1)} | Max: ${_.high.toFixed(1)}`;
          break;
        case "median":
          j = `Median: ${_.median.toFixed(1)}`;
          break;
        case "average":
          j = `Average: ${_.average?.toFixed(1) ?? ""}`;
          break;
        case "min":
          j = `Min: ${_.low.toFixed(1)}`;
          break;
        case "max":
          j = `Max: ${_.high.toFixed(1)}`;
          break;
      }
      const F = r(O, j), A = s;
      let L = M.x, E = M.y - 20;
      const G = c(L, E, F, A);
      L = G.x, E = G.y, h.value = {
        visible: !0,
        x: L,
        y: E,
        title: O,
        text: j,
        width: F,
        height: A
      };
    }, g = (x) => {
      if (h.value.visible) {
        const _ = x.currentTarget, w = _.getBoundingClientRect(), $ = _.createSVGPoint();
        $.x = x.clientX - w.left, $.y = x.clientY - w.top;
        let S = $.x, M = $.y - 20;
        const O = c(S, M, h.value.width, h.value.height);
        h.value.x = O.x, h.value.y = O.y;
      }
    }, m = () => {
      h.value.visible = !1;
    }, v = () => {
      h.value.visible = !1;
    }, p = C(() => {
      const x = [], w = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let $ = 1; $ <= 10; $++) {
        const S = $, M = (S - 1) / 9, O = n.chartMargin + w - M * w;
        x.push({ value: S, y: O });
      }
      return x;
    });
    return t({ isDark: a }), (x, _) => (y(), k("div", wf, [
      (y(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: $e(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: g,
        onMouseleave: m
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
        }, null, 8, $f),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, Sf),
        (y(!0), k(se, null, pe(p.value, (w, $) => (y(), k("line", {
          key: `grid-${$}`,
          x1: e.chartMargin,
          y1: w.y,
          x2: e.chartWidth - e.chartMargin,
          y2: w.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Mf))), 128)),
        (y(!0), k(se, null, pe(p.value, (w, $) => (y(), k(se, { key: $ }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: w.y,
            x2: e.chartMargin,
            y2: w.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Df),
          u("text", {
            x: e.chartMargin - 12,
            y: w.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, D(w.value), 9, Tf)
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
        }, D(f(e.yAxisLabel)), 9, Af),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, Bf),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, Lf),
        (y(!0), k(se, null, pe(e.candlestickData, (w, $) => (y(), k(se, { key: $ }, [
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
              onMouseenter: (S) => b(S, w, "wick"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, Rf),
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
              onMouseenter: (S) => b(S, w, "body"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, If),
            w.medianY ? (y(), k("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: w.medianY,
              x2: e.candleWidth / 2,
              y2: w.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (S) => b(S, w, "median"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, Ef)) : V("", !0),
            w.averageY ? (y(), k("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: w.averageY,
              x2: e.candleWidth / 2,
              y2: w.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (S) => b(S, w, "average"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, Ff)) : V("", !0),
            u("circle", {
              cx: 0,
              cy: w.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (S) => b(S, w, "min"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, Of),
            u("circle", {
              cx: 0,
              cy: w.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (S) => b(S, w, "max"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, Vf)
          ], 8, Pf),
          u("text", {
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, D(f(w.label)), 9, zf),
          w.responseCount ? (y(), k("text", {
            key: 0,
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: d.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + D(w.responseCount), 9, Nf)) : V("", !0)
        ], 64))), 128)),
        e.showLegend ? (y(), k("g", {
          key: 0,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          u("g", jf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: d.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Wf),
            u("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Kf)
          ]),
          u("g", Yf, [
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
            }, " Q1 ", 8, Uf)
          ]),
          u("g", qf, [
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
            }, " Q3 ", 8, Xf)
          ]),
          u("g", Gf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: d.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Zf),
            u("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Qf)
          ]),
          u("g", Jf, [
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
            }, " Avg ", 8, eg)
          ]),
          u("g", tg, [
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
            }, " Median ", 8, ng)
          ])
        ], 8, Hf)) : V("", !0),
        h.value.visible ? (y(), k("g", {
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
          }, null, 8, og),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + da,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, D(h.value.title), 9, sg),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + da + Ha + Us,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, D(h.value.text), 9, ig)
        ], 8, ag)) : V("", !0)
      ], 44, Cf))
    ]));
  }
}), cg = /* @__PURE__ */ me(rg, [["__scopeId", "data-v-22efd66d"]]), dg = ["viewBox"], ug = ["x1", "y1", "x2", "y2", "stroke"], hg = ["x1", "y1", "x2", "y2", "stroke"], fg = ["points", "fill"], gg = ["x1", "y1", "x2", "y2", "stroke"], pg = ["x", "y", "fill"], mg = ["x", "y", "fill", "transform"], bg = ["x1", "y1", "x2", "y2", "stroke"], vg = ["points", "fill"], yg = ["x1", "y1", "x2", "y2", "stroke"], xg = ["x", "y", "fill"], _g = ["x", "y", "fill"], kg = ["d"], wg = ["x", "y", "width", "height", "onMouseenter"], Cg = ["x1", "y1", "x2", "y2"], $g = ["x", "y"], Sg = ["x1", "y1", "x2", "y2"], Mg = ["x", "y"], Dg = ["x1", "y1", "x2", "y2"], Tg = ["x", "y"], Ag = ["x1", "y1", "x2", "y2"], Bg = ["x", "y"], Lg = ["x1", "y1", "x2", "y2"], Pg = ["x", "y"], Rg = ["x1", "y1", "x2", "y2"], Ig = ["x", "y"], Eg = ["transform"], Fg = { transform: "translate(-220, 0)" }, Og = ["fill"], Vg = { transform: "translate(-140, 0)" }, zg = ["fill"], Ng = { transform: "translate(-80, 0)" }, Hg = ["fill"], jg = { transform: "translate(-20, 0)" }, Wg = ["fill"], Kg = { transform: "translate(60, 0)" }, Yg = ["fill"], Ug = { transform: "translate(130, 0)" }, qg = ["fill"], Xg = { transform: "translate(180, 0)" }, Gg = ["fill"], Zg = ["transform"], Qg = ["x", "y", "width", "height", "fill", "stroke"], Jg = ["y", "fill"], ep = ["y", "fill"], ua = 10, tp = 14, ja = 13, Xs = 12, Gs = 4, np = /* @__PURE__ */ le({
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
    const n = e, { isDark: a, colors: o } = Me(Se(n, "theme")), s = ua + ja + Gs + Xs + ua, i = C(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(q, K, J) {
      const de = J ? 0.6 : 0.535;
      return Math.ceil(Math.max(q, 1) * K * de);
    }
    function r(q, K) {
      return Math.max(
        l(q.length, ja, !0),
        l(K.length, Xs, !1),
        52
      ) + tp * 2;
    }
    function c(q, K, J, de) {
      const ge = J / 2, R = 6, U = Math.min(
        Math.max(q, ge + R),
        n.chartWidth - ge - R
      ), ne = R + de + 10, he = n.chartHeight - R + 10, be = Math.min(Math.max(K, ne), he);
      return { x: U, y: be };
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
    }), f = C(
      () => n.chartMarginRight ?? n.chartMargin
    ), b = C(() => n.chartMargin + n.plotInset), g = C(
      () => n.chartWidth - f.value - n.plotInset
    ), m = C(() => Math.max(g.value - b.value, 1)), v = C(() => n.chartHeight - n.chartMargin - n.chartBottomMargin), p = C(() => m.value / 10 * 0.52);
    function x(q) {
      if (q < 1 || q > 10) return null;
      const K = m.value / 10;
      return b.value + (q - 0.5) * K;
    }
    const _ = C(
      () => Array.from({ length: 10 }, (q, K) => {
        const J = K + 1, de = x(J);
        return de === null ? null : { score: J, x: de };
      }).filter((q) => q !== null)
    ), w = C(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const q = Math.max(...n.histogram.map((J) => J.count || 0), 1), K = Math.max(1, Math.ceil(q * 0.2));
      return q + K;
    }), $ = C(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const q = n.averageScore || 0;
      let K = 0, J = 0;
      if (n.histogram.forEach((ge) => {
        const R = ge.count || 0;
        K += R;
        const U = ge.score - q;
        J += R * (U * U);
      }), K === 0) return 1;
      const de = J / K;
      return Math.sqrt(de) || 1;
    }), S = (q, K, J) => {
      if (J === 0) return 0;
      const de = 1 / (J * Math.sqrt(2 * Math.PI)), ge = -0.5 * Math.pow((q - K) / J, 2);
      return de * Math.exp(ge);
    }, M = C(() => {
      if (!n.histogram || n.histogram.length === 0 || n.averageScore === 0 && $.value === 0) return null;
      const q = n.averageScore, K = $.value, J = 100, ge = Math.max(...n.histogram.map((he) => he.count || 0), 1) / w.value * v.value;
      if (ge <= 0) return null;
      let R = 0;
      for (let he = 0; he <= J; he++) {
        const be = 1 + 9 * (he / J), _e = S(be, q, K);
        _e > R && (R = _e);
      }
      if (R <= 0) return null;
      const U = ge / R, ne = [];
      for (let he = 0; he <= J; he++) {
        const be = 1 + 9 * (he / J), _e = S(be, q, K) * U, Be = x(be);
        if (Be !== null) {
          const et = n.chartHeight - n.chartBottomMargin - _e;
          ne.push(`${he === 0 ? "M" : "L"} ${Be} ${et}`);
        }
      }
      return ne.join(" ");
    }), O = C(() => {
      if (!n.histogram || n.histogram.length === 0) return [];
      const q = m.value / 10;
      return n.histogram.map((K) => {
        const J = Number(K.score);
        if (!Number.isFinite(J) || J < 1 || J > 10)
          return null;
        const de = b.value + (J - 0.5) * q, ge = K.count > 0 ? K.count / w.value * v.value : 0, R = n.chartHeight - n.chartBottomMargin - ge;
        return {
          score: J,
          count: K.count,
          x: de,
          y: R,
          height: ge
        };
      }).filter((K) => K !== null);
    }), j = C(() => x(n.minScore)), F = C(() => x(n.maxScore)), A = C(() => x(n.q1Score)), L = C(() => x(n.medianScore)), E = C(() => x(n.q3Score)), G = C(() => x(n.averageScore)), Q = C(() => n.minScore), Z = C(() => n.maxScore), ae = C(() => n.q1Score), ue = C(() => n.medianScore), fe = C(() => n.q3Score), X = C(() => n.averageScore), T = C(() => {
      const q = [], K = n.chartMargin - 8, J = 18;
      A.value !== null && q.push({
        x: A.value,
        y: K,
        value: n.q1Score,
        label: `Q1: ${ae.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), L.value !== null && q.push({
        x: L.value,
        y: K - J,
        value: n.medianScore,
        label: `Median: ${ue.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), G.value !== null && q.push({
        x: G.value,
        y: K - J,
        value: n.averageScore,
        label: `Avg: ${X.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), E.value !== null && q.push({
        x: E.value,
        y: K,
        value: n.q3Score,
        label: `Q3: ${fe.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), q.sort((R, U) => (R.x || 0) - (U.x || 0));
      const de = [[], [], []];
      q.forEach((R) => {
        if (R.x === null) return;
        let U = -1;
        for (let ne = 0; ne < de.length; ne++) {
          let he = !1;
          for (const be of de[ne]) {
            if (be.x === null) continue;
            const _e = Math.abs(R.x - be.x), Be = (R.width + be.width) / 2 + 10;
            if (_e < Be) {
              he = !0;
              break;
            }
          }
          if (!he) {
            U = ne;
            break;
          }
        }
        U === -1 && (U = de.length - 1), R.y = K - U * J, de[U].push(R);
      });
      const ge = 15;
      return q.forEach((R) => {
        R.y < ge && (R.y = ge);
      }), q;
    }), H = (q) => T.value.find((J) => J.id === q)?.y || n.chartMargin - 10, W = C(() => {
      const q = [];
      for (let J = 0; J <= 5; J++) {
        const de = Math.round(w.value / 5 * J), ge = n.chartHeight - n.chartBottomMargin - J / 5 * v.value;
        q.push({ value: de, y: ge });
      }
      return q;
    });
    function re(q, K, J) {
      const de = q.createSVGPoint();
      de.x = K, de.y = J;
      const ge = q.getScreenCTM();
      if (!ge) {
        const U = q.getBoundingClientRect();
        return { x: K - U.left, y: J - U.top };
      }
      const R = de.matrixTransform(ge.inverse());
      return { x: R.x, y: R.y };
    }
    const xe = (q, K) => {
      n.interactive && I(q, K);
    }, De = () => {
      n.interactive && ce();
    }, I = (q, K) => {
      const J = q.currentTarget.closest("svg");
      if (!J) return;
      const { x: de, y: ge } = re(J, q.clientX, q.clientY), R = `Score: ${K.score}`, U = `Count: ${Number(K.count ?? 0).toLocaleString()}`, ne = r(R, U), he = s, be = typeof K?.x == "number" ? K.x : de;
      let _e = ge - 20;
      const Be = c(be, _e, ne, he);
      h.value = {
        visible: !0,
        x: Be.x,
        y: Be.y,
        title: R,
        text: U,
        width: ne,
        height: he,
        anchorX: typeof K?.x == "number" ? K.x : null
      };
    }, N = (q) => {
      if (n.interactive && h.value.visible) {
        const K = q.currentTarget, { x: J, y: de } = re(K, q.clientX, q.clientY), ge = h.value.anchorX, R = ge != null && Number.isFinite(ge) ? ge : J;
        let U = de - 20;
        const ne = c(R, U, h.value.width, h.value.height);
        h.value.x = ne.x, h.value.y = ne.y;
      }
    }, Y = () => {
      ce();
    }, ce = () => {
      h.value.visible = !1, h.value.anchorX = null;
    };
    return t({ isDark: a }), (q, K) => (y(), k("div", {
      class: ee(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (y(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: $e(`min-height: ${e.chartHeight}px;`),
        onMousemove: N,
        onMouseleave: Y
      }, [
        K[7] || (K[7] = u("defs", null, [
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
        (y(!0), k(se, null, pe(W.value, (J, de) => (y(), k("line", {
          key: `grid-${de}`,
          x1: b.value,
          y1: J.y,
          x2: g.value,
          y2: J.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, ug))), 128)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, hg),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, fg),
        (y(!0), k(se, null, pe(W.value, (J, de) => (y(), k(se, {
          key: `y-tick-${de}`
        }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: J.y,
            x2: e.chartMargin,
            y2: J.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, gg),
          u("text", {
            x: e.chartMargin - 12,
            y: J.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, D(J.value), 9, pg)
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
        }, " Count ", 8, mg),
        u("line", {
          x1: b.value,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: g.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, bg),
        u("polygon", {
          points: `${g.value - 4},${e.chartHeight - e.chartBottomMargin - 4} ${g.value - 4},${e.chartHeight - e.chartBottomMargin + 4} ${g.value},${e.chartHeight - e.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, vg),
        (y(!0), k(se, null, pe(_.value, (J) => (y(), k(se, {
          key: `tick-${J.score}`
        }, [
          u("line", {
            x1: J.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: J.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, yg),
          u("text", {
            x: J.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, D(J.score), 9, xg)
        ], 64))), 128)),
        u("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: d.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, _g),
        M.value ? (y(), k("path", {
          key: 0,
          d: M.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, kg)) : V("", !0),
        (y(!0), k(se, null, pe(O.value, (J, de) => (y(), k("rect", {
          key: `bar-${de}`,
          x: J.x - p.value / 2,
          y: J.y,
          width: p.value,
          height: J.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (ge) => xe(ge, J),
          onMouseleave: De,
          style: $e({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, wg))), 128)),
        e.showStatLabels && j.value ? (y(), k("line", {
          key: 1,
          x1: j.value,
          y1: e.chartMargin,
          x2: j.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Cg)) : V("", !0),
        e.showStatLabels && j.value ? (y(), k("text", {
          key: 2,
          x: j.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + D(Q.value.toFixed(1)), 9, $g)) : V("", !0),
        e.showStatLabels && A.value ? (y(), k("line", {
          key: 3,
          x1: A.value,
          y1: e.chartMargin,
          x2: A.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Sg)) : V("", !0),
        e.showStatLabels && A.value ? (y(), k("text", {
          key: 4,
          x: A.value,
          y: H("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + D(ae.value.toFixed(1)), 9, Mg)) : V("", !0),
        e.showStatLabels && L.value ? (y(), k("line", {
          key: 5,
          x1: L.value,
          y1: e.chartMargin,
          x2: L.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Dg)) : V("", !0),
        e.showStatLabels && L.value ? (y(), k("text", {
          key: 6,
          x: L.value,
          y: H("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + D(ue.value.toFixed(1)), 9, Tg)) : V("", !0),
        e.showStatLabels && G.value ? (y(), k("line", {
          key: 7,
          x1: G.value,
          y1: e.chartMargin,
          x2: G.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Ag)) : V("", !0),
        e.showStatLabels && G.value ? (y(), k("text", {
          key: 8,
          x: G.value,
          y: H("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + D(X.value.toFixed(1)), 9, Bg)) : V("", !0),
        e.showStatLabels && E.value ? (y(), k("line", {
          key: 9,
          x1: E.value,
          y1: e.chartMargin,
          x2: E.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Lg)) : V("", !0),
        e.showStatLabels && E.value ? (y(), k("text", {
          key: 10,
          x: E.value,
          y: H("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + D(fe.value.toFixed(1)), 9, Pg)) : V("", !0),
        e.showStatLabels && F.value ? (y(), k("line", {
          key: 11,
          x1: F.value,
          y1: e.chartMargin,
          x2: F.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Rg)) : V("", !0),
        e.showStatLabels && F.value ? (y(), k("text", {
          key: 12,
          x: F.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + D(Z.value.toFixed(1)), 9, Ig)) : V("", !0),
        e.showLegend ? (y(), k("g", {
          key: 13,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          u("g", Fg, [
            K[0] || (K[0] = u("line", {
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
            }, " Gaussian ", 8, Og)
          ]),
          u("g", Vg, [
            K[1] || (K[1] = u("line", {
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
            }, " Min ", 8, zg)
          ]),
          u("g", Ng, [
            K[2] || (K[2] = u("line", {
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
            }, " Q1 ", 8, Hg)
          ]),
          u("g", jg, [
            K[3] || (K[3] = u("line", {
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
            }, " Median ", 8, Wg)
          ]),
          u("g", Kg, [
            K[4] || (K[4] = u("line", {
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
            }, " Avg ", 8, Yg)
          ]),
          u("g", Ug, [
            K[5] || (K[5] = u("line", {
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
            }, " Q3 ", 8, qg)
          ]),
          u("g", Xg, [
            K[6] || (K[6] = u("line", {
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
            }, " Max ", 8, Gg)
          ])
        ], 8, Eg)) : V("", !0),
        e.interactive && h.value.visible ? (y(), k("g", {
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
          }, null, 8, Qg),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + ua,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, D(h.value.title), 9, Jg),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + ua + ja + Gs,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, D(h.value.text), 9, ep)
        ], 8, Zg)) : V("", !0)
      ], 44, dg))
    ], 2));
  }
}), nl = /* @__PURE__ */ me(np, [["__scopeId", "data-v-8f9da805"]]), ap = 639, al = 1024;
function Zs(e) {
  return e < 640 ? "mobile" : e <= al ? "tablet" : "desktop";
}
function op() {
  const e = oe(
    typeof window > "u" ? "desktop" : Zs(window.innerWidth)
  ), t = () => {
    typeof window > "u" || (e.value = Zs(window.innerWidth));
  };
  let n = null, a = null, o = null, s = null;
  Je(() => {
    typeof window > "u" || (t(), n = window.matchMedia(`(max-width: ${ap}px)`), a = window.matchMedia(`(min-width: 640px) and (max-width: ${al}px)`), o = window.matchMedia("(min-width: 1025px)"), s = () => {
      t();
    }, n.addEventListener("change", s), a.addEventListener("change", s), o.addEventListener("change", s));
  }), ct(() => {
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
const sp = { class: "chart-container" }, ip = {
  key: 0,
  class: "loading-state loading-overlay"
}, tn = 12, lp = /* @__PURE__ */ le({
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
    To.use([Tl, Al, Bl, Ll]);
    const n = e, { isDark: a, colors: o } = Me(Se(n, "theme")), { breakpoint: s } = op(), i = oe(null), l = oe(!0), r = oe(!1);
    let c = null, d = null;
    const h = {
      animation: { duration: 1e3, easing: "cubicOut" },
      margins: { left: "3%", right: "8%", top: "4%", bottom: "4%" },
      node: { width: 88, gap: 24, align: "left", iterations: 0 },
      style: {
        shadowBlur: 0,
        shadowColor: "transparent"
      }
    }, f = {
      success: "#66BB6A",
      abandon: "#FFA726",
      error: "#EF5350"
    }, b = {
      success: 0,
      abandon: 1,
      error: 2
    }, g = /abandon|exit|lost|bounce|cancelled|no pending|not paid|not confirmed|not delivered/i, m = /error|failed|unrecovered|not retreiv|bp error|not found|rejected|redirect to human|invalid|unprocessed|data quality|failed:/i, v = C(() => {
      const I = s.value;
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
    }), p = (I) => {
      const N = I.replace(/_/g, " ").replace(/\s+/g, " ").trim(), Y = N.match(/^Failed:\s*(.+)$/i);
      return Y ? `Failed:
${Y[1].trim()}` : N;
    }, x = (I, N) => {
      const Y = I.trim();
      if (!Y || N < 1 || Y.length <= N) return Y;
      const ce = [];
      let q = 0;
      for (; q < Y.length; ) {
        const K = Math.min(q + N, Y.length);
        if (K >= Y.length) {
          const ge = Y.slice(q).trim();
          ge && ce.push(ge);
          break;
        }
        const J = Y.slice(q, K), de = J.lastIndexOf(" ");
        if (de > 0)
          for (ce.push(Y.slice(q, q + de).trim()), q += de; q < Y.length && Y[q] === " "; ) q += 1;
        else
          ce.push(J), q = K;
      }
      return ce.join(`
`);
    }, _ = (I, N) => {
      const Y = I.trim();
      return !Y || N < 1 ? I : Y.split(`
`).map((ce) => x(ce.trim(), N)).filter(Boolean).join(`
`);
    }, w = (I) => I.status ? I.status : g.test(I.name) ? "abandon" : m.test(I.name) ? "error" : "success", $ = (I) => I.originalValue ?? I.value, S = (I, N) => {
      const Y = new Set(N.map((q) => q.target)), ce = I.filter((q) => !Y.has(q.name));
      for (const q of ce) {
        if (typeof q.value == "number" && q.value > 0) return q.value;
        const K = N.filter((J) => J.source === q.name);
        if (K.length > 0)
          return K.reduce((J, de) => J + $(de), 0);
      }
      return N.reduce((q, K) => Math.max(q, $(K)), 0);
    }, M = (I, N, Y) => {
      if (Y && typeof Y.value == "number") return Y.value;
      const ce = N.filter((K) => K.target === I);
      return ce.length > 0 ? ce.reduce((K, J) => K + $(J), 0) : N.filter((K) => K.source === I).reduce((K, J) => K + $(J), 0);
    }, O = (I, N) => {
      const Y = /* @__PURE__ */ new Map(), ce = new Set(N.map((K) => K.target)), q = I.filter((K) => !ce.has(K.name)).map((K) => ({ name: K.name, depth: 0 }));
      for (; q.length > 0; ) {
        const { name: K, depth: J } = q.shift(), de = Y.get(K);
        if (!(de !== void 0 && de >= J)) {
          Y.set(K, J);
          for (const ge of N)
            ge.source === K && q.push({ name: ge.target, depth: J + 1 });
        }
      }
      for (const K of I)
        Y.has(K.name) || Y.set(K.name, 0);
      return Y;
    }, j = (I, N) => {
      const Y = /* @__PURE__ */ new Map(), ce = new Set(N.map((de) => de.target)), q = I.filter((de) => !ce.has(de.name));
      let K = 0;
      const J = (de) => {
        let ge = de;
        for (; ge && !Y.has(ge); )
          Y.set(ge, K), K += 1, ge = N.filter(
            (U) => U.source === ge && w({ name: U.target }) === "success"
          ).sort((U, ne) => $(ne) - $(U))[0]?.target;
      };
      return q.forEach((de) => J(de.name)), Y;
    }, F = (I, N, Y) => {
      const ce = w(I);
      if (ce === "success" && Y.has(I.name))
        return Y.get(I.name);
      if (ce === "success") {
        const q = N.filter((J) => J.target === I.name);
        return 200 + (q.length ? Math.min(
          ...q.map(
            (J) => Y.has(J.source) ? (Y.get(J.source) ?? 0) + 0.01 : 500
          )
        ) : 500);
      }
      return ce === "abandon" ? 1e3 : 2e3;
    }, A = (I, N) => {
      const Y = O(I, N), ce = j(I, N);
      return [...I].sort((q, K) => {
        const J = Y.get(q.name) ?? 0, de = Y.get(K.name) ?? 0;
        if (J !== de) return J - de;
        const ge = b[w(q)], R = b[w(K)];
        if (ge !== R) return ge - R;
        const U = F(q, N, ce), ne = F(K, N, ce);
        return U !== ne ? U - ne : q.name.localeCompare(K.name);
      });
    }, L = (I, N, Y, ce) => {
      const K = _(I, ce).split(`
`), J = N * 0.58, ge = Math.max(...K.map((U) => U.length), 1) * J, R = K.length * Y;
      return {
        lines: K,
        width: ge,
        height: R,
        nodeWidth: ge + tn * 2
      };
    }, E = (I, N) => N ? `${(I / N * 100).toFixed(1)}%` : "0.0%", G = (I, N, Y, ce, q) => {
      if (typeof I.label == "string" && I.label)
        return _(p(I.label), q);
      const K = _(p(I.name), q);
      if (N === "success" && Y > 0) {
        const J = M(I.name, ce, I), de = E(J, Y);
        return `${K}
(${de})`;
      }
      return K;
    }, Q = (I, N = 0) => {
      if (N > 0) return N;
      const Y = I.match(/^(\d+(?:\.\d+)?)px$/);
      if (Y) return Number(Y[1]);
      const ce = I.match(/^(\d+(?:\.\d+)?)vh$/);
      return ce && typeof window < "u" ? Number(ce[1]) / 100 * window.innerHeight : 500;
    }, Z = (I, N, Y, ce, q) => {
      if (!N.length || !I.length || q <= 0) return I;
      const K = I.map((be) => ({ ...be })), J = Y.labelLineHeight || Math.round(Y.labelFontSize * 1.25), de = Math.max(4, Y.labelCharsPerLine), ge = Math.max(ce * 0.88, 260), R = O(N, K), U = /* @__PURE__ */ new Map();
      N.forEach((be) => {
        const _e = R.get(be.name) ?? 0;
        U.set(_e, (U.get(_e) ?? 0) + 1);
      });
      const ne = (be) => {
        const Be = N.find((Zt) => Zt.name === be)?.displayLabel || be, dt = L(Be, Y.labelFontSize, J, de).height + tn * 2, Gt = R.get(be) ?? 0, yt = U.get(Gt) ?? 1, gn = (Math.max(yt, 1) - 1) * Y.nodeGap / Math.max(yt, 1), Ta = Math.max(ge - gn, dt);
        return Math.max(1, dt / Ta * q);
      }, he = (be) => {
        const _e = K.filter((Be) => Be.target === be);
        return _e.length > 0 ? _e.reduce((Be, et) => Be + et.value, 0) : K.filter((Be) => Be.source === be).reduce((Be, et) => Be + et.value, 0);
      };
      for (let be = 0; be < 16; be += 1) {
        let _e = !1;
        for (const Be of N) {
          const et = ne(Be.name), dt = he(Be.name);
          if (dt >= et) continue;
          const Gt = K.filter((Zt) => Zt.target === Be.name), yt = K.filter((Zt) => Zt.source === Be.name), gn = Gt.length > 0 ? Gt : yt;
          if (gn.length === 0) continue;
          const Ta = et / Math.max(dt, 1e-6);
          gn.forEach((Zt) => {
            Zt.value *= Ta;
          }), _e = !0;
        }
        if (!_e) break;
      }
      return K;
    }, ae = (I, N, Y) => {
      const ce = S(I, N), q = A(I, N), K = Y.labelLineHeight || Math.round(Y.labelFontSize * 1.25), J = Math.max(4, Y.labelCharsPerLine);
      let de = Y.nodeWidth;
      const ge = [], R = q.map((ne, he) => {
        const be = w(ne), _e = G(
          ne,
          be,
          ce,
          N,
          J
        );
        ge.push(_e);
        const Be = L(_e, Y.labelFontSize, K, J);
        Y.orient === "vertical" ? de = Math.max(de, Be.height + tn * 2) : de = Math.max(de, Be.nodeWidth);
        const et = n.nodeColors[ne.name] || f[be] || ue[he % ue.length], dt = Math.max(Math.ceil(Be.nodeWidth - tn * 2), 48);
        return {
          ...ne,
          displayLabel: _e,
          label: {
            width: dt,
            overflow: "none",
            lineHeight: K,
            fontSize: Y.labelFontSize
          },
          itemStyle: {
            color: et,
            borderRadius: 4,
            borderWidth: 0,
            shadowBlur: 0,
            shadowColor: "transparent"
          }
        };
      });
      let U = { ...Y.contentMargins };
      if (Y.orient === "vertical") {
        const ne = Math.max(
          ...ge.map(
            (be) => L(be, Y.labelFontSize, K, J).width
          ),
          0
        ), he = typeof U.right == "number" ? U.right : 10;
        U = {
          ...U,
          right: Math.max(he, ne + tn + Y.labelDistance)
        };
      }
      return { nodes: R, maxNodeWidth: de, contentMargins: U, originTotal: ce };
    }, ue = [
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
    ], fe = () => {
      const I = n.data.links.filter(
        (q) => q.source && q.target && typeof q.value == "number"
      ), N = Math.max(...I.map((q) => q.value), 1), Y = Math.max(1, N * 0.01), ce = I.map((q) => ({
        ...q,
        originalValue: q.value,
        value: q.value < N * 0.01 ? Y : q.value
      }));
      return {
        nodes: n.data.nodes.filter((q) => q.name),
        links: ce
      };
    }, X = (I) => (N) => {
      const Y = N.dataType === "node", ce = o.value.tooltipText, q = a.value ? "#d1d5db" : "#e2e8f0";
      if (Y) {
        const R = I.filter((he) => he.target === N.name), U = I.filter((he) => he.source === N.name), ne = R.length > 0 ? R.reduce((he, be) => he + (be.originalValue || be.value), 0) : U.reduce((he, be) => he + (be.originalValue || be.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${ce};">${N.name}</div><div style="color: ${q}; font-size: 12px;">Count: ${ne.toLocaleString()}</div>`;
      }
      const K = N.data?.source || N.source || "Unknown", J = N.data?.target || N.target || "Unknown", de = N.data?.originalValue || N.data?.value || N.value || 0, ge = N.data?.label || `${de.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${ce};">${K} → ${J}</div><div style="color: ${q}; font-size: 12px;">Flow: ${ge}</div>`;
    }, T = () => {
      if (!c || !n.data.nodes?.length || !n.data.links?.length) return;
      const I = v.value, N = a.value ? "rgba(110, 110, 120, 0.35)" : "rgba(148, 163, 184, 0.45)", Y = a.value ? "rgba(130, 130, 140, 0.5)" : "rgba(100, 116, 139, 0.55)", ce = a.value ? "rgba(203, 213, 225, 0.92)" : "#64748b", q = I.labelPosition === "inside" ? "#ffffff" : a.value ? o.value.textPrimary : "#334155";
      try {
        const { nodes: K, links: J } = fe(), { nodes: de, maxNodeWidth: ge, contentMargins: R, originTotal: U } = ae(
          K,
          J,
          I
        ), ne = Q(n.height, i.value?.clientHeight ?? 0), he = Z(
          J,
          de,
          {
            labelFontSize: I.labelFontSize,
            labelLineHeight: I.labelLineHeight || Math.round(I.labelFontSize * 1.25),
            labelCharsPerLine: I.labelCharsPerLine,
            nodeGap: I.nodeGap
          },
          ne,
          U
        ), be = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: X(he),
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
              data: de,
              links: he,
              emphasis: {
                focus: "adjacency",
                lineStyle: {
                  color: Y,
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
                color: q,
                fontWeight: 700,
                fontSize: I.labelFontSize,
                lineHeight: I.labelLineHeight || Math.round(I.labelFontSize * 1.25),
                padding: tn,
                align: "center",
                verticalAlign: "middle",
                overflow: "none",
                ...I.orient === "horizontal" ? { width: Math.max(ge - tn * 2, 48), overflow: "none" } : I.labelWrap && I.labelTextWidth > 0 ? { width: I.labelTextWidth, overflow: "none" } : {},
                ...I.labelDistance > 0 ? { distance: I.labelDistance } : {},
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (_e) => _e.data?.displayLabel || _e.name || ""
              },
              edgeLabel: I.edgeLabelShow ? {
                show: !0,
                fontSize: I.edgeLabelFontSize,
                color: ce,
                fontWeight: 500,
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (_e) => {
                  if (_e.data?.label) return _e.data.label;
                  const Be = _e.data?.originalValue ?? _e.value ?? 0, et = _e.data?.source ?? _e.source, dt = he.filter((yt) => yt.source === et).reduce((yt, gn) => yt + $(gn), 0), Gt = E(Be, dt);
                  return `${Number(Be).toLocaleString()} (${Gt})`;
                }
              } : { show: !1 },
              nodeAlign: h.node.align,
              nodeGap: I.nodeGap,
              nodeWidth: ge,
              layoutIterations: h.node.iterations,
              orient: I.orient,
              draggable: !1,
              ...R
            }
          ],
          backgroundColor: "transparent",
          animation: !0,
          animationDuration: h.animation.duration,
          animationEasing: h.animation.easing
        };
        c.setOption(be), c.resize();
      } catch (K) {
        console.error("Error setting Sankey chart options:", K), r.value = !0;
      }
    }, H = async () => {
      if (i.value)
        try {
          c = To.init(i.value), T(), window.addEventListener("resize", xe);
        } catch (I) {
          console.error("Error initializing Sankey chart:", I), r.value = !0;
        } finally {
          l.value = !1;
        }
    }, W = () => {
      const I = i.value;
      return !!(I && I.clientWidth > 0 && I.clientHeight > 0);
    }, re = async () => {
      if (await Ne(), W()) return H();
      await new Promise((I) => {
        const N = i.value;
        if (!N) {
          I();
          return;
        }
        d = new ResizeObserver(() => {
          W() && (d?.disconnect(), d = null, H().then(I));
        }), d.observe(N);
      });
    }, xe = () => c?.resize(), De = () => {
      window.removeEventListener("resize", xe), d?.disconnect(), d = null, c && (c.dispose(), c = null);
    };
    return Je(() => re()), ii(De), Fe(() => n.data, T, { deep: !0 }), Fe(a, T), Fe(s, T), t({ isDark: a }), (I, N) => (y(), k("div", sp, [
      r.value ? (y(), k("div", {
        key: 0,
        class: "error-state",
        style: $e({ height: e.height })
      }, [...N[0] || (N[0] = [
        Mo('<div class="error-content" data-v-b04b208a><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b04b208a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-b04b208a></path></svg><p class="error-title" data-v-b04b208a>Chart could not be loaded</p><p class="error-description" data-v-b04b208a>Please check the data format.</p></div>', 1)
      ])], 4)) : (y(), k("div", {
        key: 1,
        class: "chart-wrapper",
        style: $e({ height: e.height })
      }, [
        u("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content"
        }, null, 512),
        l.value ? (y(), k("div", ip, [...N[1] || (N[1] = [
          Mo('<div class="loading-container" data-v-b04b208a><div class="sankey-loader" data-v-b04b208a><div class="flow flow-1" data-v-b04b208a></div><div class="flow flow-2" data-v-b04b208a></div><div class="flow flow-3" data-v-b04b208a></div><div class="flow flow-4" data-v-b04b208a></div></div><p class="loading-text" data-v-b04b208a>Loading Sankey diagram...</p></div>', 1)
        ])])) : V("", !0)
      ], 4))
    ]));
  }
}), Xt = /* @__PURE__ */ me(lp, [["__scopeId", "data-v-b04b208a"]]), rp = ["open"], cp = { class: "card-header metric-collapsible__summary" }, dp = { class: "header-content metric-header-content" }, up = { class: "metric-header-content__main" }, hp = { class: "metric-header-content__text" }, fp = { class: "metric-header-content__loaded" }, gp = {
  key: 0,
  class: "card-title"
}, pp = {
  key: 0,
  class: "card-subtitle"
}, mp = {
  key: 0,
  class: "metric-header-content__export"
}, bp = {
  key: 0,
  class: "cmc-header-aside"
}, vp = {
  key: 0,
  class: "chart-metric-container__body"
}, yp = {
  key: "body-loading",
  class: "cmc-body-loading",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, xp = { key: "body-content" }, _p = {
  key: 1,
  class: "chart-metric-container chart-metric-container--static"
}, kp = { class: "card-header" }, wp = { class: "header-content metric-header-content" }, Cp = { class: "metric-header-content__main" }, $p = { class: "metric-header-content__text" }, Sp = { class: "metric-header-content__loaded" }, Mp = {
  key: 0,
  class: "card-title"
}, Dp = {
  key: 0,
  class: "card-subtitle"
}, Tp = {
  key: 0,
  class: "metric-header-content__export"
}, Ap = {
  key: 0,
  class: "cmc-header-aside"
}, Bp = {
  key: 0,
  class: "chart-metric-container__body"
}, Lp = {
  key: "body-loading",
  class: "cmc-body-loading",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Pp = { key: "body-content" }, Rp = /* @__PURE__ */ le({
  __name: "ChartMetricContainer",
  props: {
    title: { default: "" },
    subtitle: {},
    collapsible: { type: Boolean, default: !0 },
    defaultOpen: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    lazyMount: { type: Boolean, default: !1 }
  },
  emits: ["open", "toggle"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = oe(n.defaultOpen), s = oe(n.defaultOpen), i = eo();
    function l(f) {
      return f.some((b) => {
        if (b.type === Ml) return !1;
        if (b.type === Text) {
          const g = b.children;
          return typeof g == "string" && g.trim().length > 0;
        }
        return !!b.type;
      });
    }
    const r = C(() => n.collapsible ? n.lazyMount ? s.value : o.value : !0), c = C(() => n.loading && r.value), d = C(() => {
      if (n.collapsible && !o.value) return !1;
      const f = i.headerExport;
      return f ? l(f()) : !1;
    });
    Fe(
      () => n.defaultOpen,
      (f) => {
        n.collapsible && (o.value = f, f && (s.value = !0));
      }
    );
    function h(f) {
      const b = f.currentTarget;
      if (b?.tagName !== "DETAILS") return;
      const g = o.value, m = b.open;
      o.value = m, m && !g && (s.value = !0, a("open")), a("toggle", m);
    }
    return (f, b) => e.collapsible ? (y(), k("details", {
      key: 0,
      class: "chart-metric-container metric-collapsible",
      open: o.value,
      onToggle: h
    }, [
      u("summary", cp, [
        u("div", dp, [
          u("div", up, [
            u("div", hp, [
              u("div", fp, [
                ke(f.$slots, "title", {}, () => [
                  e.title ? (y(), k("h3", gp, D(e.title), 1)) : V("", !0)
                ], !0),
                e.subtitle ? (y(), k("p", pp, D(e.subtitle), 1)) : V("", !0),
                ke(f.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            d.value ? (y(), k("div", mp, [
              ke(f.$slots, "headerExport", {}, void 0, !0)
            ])) : V("", !0)
          ]),
          f.$slots.headerAside ? (y(), k("div", bp, [
            ke(f.$slots, "headerAside", {}, void 0, !0)
          ])) : V("", !0)
        ]),
        b[0] || (b[0] = u("svg", {
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
      r.value ? (y(), k("div", vp, [
        z(ft, {
          name: "chart-metric-fade",
          mode: "out-in"
        }, {
          default: P(() => [
            c.value ? (y(), k("div", yp, [
              ke(f.$slots, "loading", {}, () => [
                b[1] || (b[1] = u("div", {
                  class: "cmc-body-loading__skeleton ut-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1))
              ], !0)
            ])) : (y(), k("div", xp, [
              ke(f.$slots, "default", {}, void 0, !0)
            ]))
          ]),
          _: 3
        })
      ])) : V("", !0)
    ], 40, rp)) : (y(), k("div", _p, [
      u("div", kp, [
        u("div", wp, [
          u("div", Cp, [
            u("div", $p, [
              u("div", Sp, [
                ke(f.$slots, "title", {}, () => [
                  e.title ? (y(), k("h3", Mp, D(e.title), 1)) : V("", !0)
                ], !0),
                e.subtitle ? (y(), k("p", Dp, D(e.subtitle), 1)) : V("", !0),
                ke(f.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            d.value ? (y(), k("div", Tp, [
              ke(f.$slots, "headerExport", {}, void 0, !0)
            ])) : V("", !0)
          ]),
          f.$slots.headerAside ? (y(), k("div", Ap, [
            ke(f.$slots, "headerAside", {}, void 0, !0)
          ])) : V("", !0)
        ])
      ]),
      r.value ? (y(), k("div", Bp, [
        z(ft, {
          name: "chart-metric-fade",
          mode: "out-in"
        }, {
          default: P(() => [
            c.value ? (y(), k("div", Lp, [
              ke(f.$slots, "loading", {}, () => [
                b[2] || (b[2] = u("div", {
                  class: "cmc-body-loading__skeleton ut-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1))
              ], !0)
            ])) : (y(), k("div", Pp, [
              ke(f.$slots, "default", {}, void 0, !0)
            ]))
          ]),
          _: 3
        })
      ])) : V("", !0)
    ]));
  }
}), Ce = /* @__PURE__ */ me(Rp, [["__scopeId", "data-v-569e6db2"]]);
function Ip(e, t) {
  return y(), k("svg", {
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
function wo(e, t) {
  return y(), k("svg", {
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
  return y(), k("svg", {
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
function Ep(e, t) {
  return y(), k("svg", {
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
function un(e, t) {
  return y(), k("svg", {
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
function ol(e, t) {
  return y(), k("svg", {
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
function sl(e, t) {
  return y(), k("svg", {
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
function Fp(e, t) {
  return y(), k("svg", {
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
function Op(e, t) {
  return y(), k("svg", {
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
function Vp(e, t) {
  return y(), k("svg", {
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
      d: "M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
    })
  ]);
}
function Qs(e, t) {
  return y(), k("svg", {
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
      d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
    }),
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    })
  ]);
}
function zp(e, t) {
  return y(), k("svg", {
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
      d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
    })
  ]);
}
function Np(e, t) {
  return y(), k("svg", {
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
      d: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
    })
  ]);
}
function il(e, t) {
  return y(), k("svg", {
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
const Hp = {
  key: 0,
  class: "footer-divider"
}, jp = {
  key: 0,
  class: "export-label"
}, Wp = { class: "export-buttons" }, Kp = ["disabled"], Yp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Up = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, qp = ["disabled"], Xp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Gp = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Zp = /* @__PURE__ */ le({
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
    return (r, c) => (y(), te(Ot(o.value), {
      class: ee(s.value)
    }, {
      default: P(() => [
        e.variant === "footer" ? (y(), k("div", Hp)) : V("", !0),
        u("div", {
          class: ee(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (y(), k("span", jp, "Export")) : V("", !0),
          u("div", Wp, [
            i("pdf") ? (y(), k("button", {
              key: 0,
              type: "button",
              class: ee(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: c[0] || (c[0] = (d) => l("pdf"))
            }, [
              e.loading ? (y(), k("svg", Yp, [...c[2] || (c[2] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (y(), k("svg", Up, [...c[3] || (c[3] = [
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
            ], 10, Kp)) : V("", !0),
            i("csv") ? (y(), k("button", {
              key: 1,
              type: "button",
              class: ee(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: c[1] || (c[1] = (d) => l("csv"))
            }, [
              e.loading ? (y(), k("svg", Xp, [...c[5] || (c[5] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (y(), k("svg", Gp, [...c[6] || (c[6] = [
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
            ], 10, qp)) : V("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Oe = /* @__PURE__ */ me(Zp, [["__scopeId", "data-v-ebfab47f"]]), Qp = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Jp = {
  key: "chart",
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, em = { class: "w-full shrink-0 sm:pr-2" }, tm = {
  key: "empty",
  class: "flex min-h-[280px] w-full items-center justify-center"
}, nm = { class: "max-w-[360px] text-center" }, am = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, om = /* @__PURE__ */ le({
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
    }, o = e, s = n, i = (f) => {
      s("export", f);
    }, l = Se(o, "theme"), r = Se(o, "options"), { isDark: c } = Me(l), d = (f) => {
      const b = new Date(f), g = String(b.getDate()).padStart(2, "0"), m = String(b.getMonth() + 1).padStart(2, "0");
      return `${g}-${m}`;
    }, h = C(() => {
      const f = o.data?.agents_by_day || {}, b = Object.keys(f).sort();
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const g = b.map((_) => d(_)), m = /* @__PURE__ */ new Set();
      for (const _ of Object.values(f))
        for (const w of Object.keys(_))
          m.add(w);
      const v = Array.from(m), p = (_) => _, x = v.map((_) => ({
        label: _,
        data: b.map((w) => f[w]?.[_] || 0),
        backgroundColor: `${a[_] || "#94a3b8"}80`,
        borderColor: p(a[_] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: g,
        datasets: x
      };
    });
    return t({ isDark: c }), (f, b) => (y(), te(Ce, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !e.loading ? (y(), te(B(Oe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        u("div", Qp, [
          z(ft, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: P(() => [
              h.value.labels && h.value.labels.length ? (y(), k("section", Jp, [
                u("div", em, [
                  z(St, {
                    data: h.value,
                    stacked: !0,
                    theme: l.value,
                    options: r.value
                  }, null, 8, ["data", "theme", "options"])
                ])
              ])) : (y(), k("section", tm, [
                u("div", nm, [
                  u("div", am, [
                    z(B(nt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                  ]),
                  b[0] || (b[0] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agents data per day ", -1)),
                  b[1] || (b[1] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see daily agent interactions. ", -1))
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
}), sm = /* @__PURE__ */ me(om, [["__scopeId", "data-v-f8d0ec91"]]), fn = (e, t) => t ? `${(e / t * 100).toFixed(1)}%` : "0.0%", ve = (e, t) => `${e.toLocaleString()} (${fn(e, t)})`, im = { class: "flex w-full min-w-0 justify-center" }, lm = { class: "flex max-w-full min-w-0 items-center gap-2" }, rm = { class: "min-w-0 truncate text-[12px] leading-normal capitalize" }, cm = { class: "text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, dm = {
  key: 0,
  class: "min-w-0 w-full truncate text-[10px] leading-normal"
}, um = /* @__PURE__ */ le({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, n) => (y(), k("div", {
      class: ee(["card-info box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]", e.subvalue ? "h-[75px]" : "h-[58px]"])
    }, [
      u("div", im, [
        u("div", lm, [
          e.color ? (y(), k("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: $e({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : V("", !0),
          u("span", rm, D(e.title), 1)
        ])
      ]),
      u("p", cm, D(e.value), 1),
      e.subvalue ? (y(), k("p", dm, D(e.subvalue), 1)) : V("", !0)
    ], 2));
  }
}), ye = /* @__PURE__ */ me(um, [["__scopeId", "data-v-0d546967"]]), ll = "inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight";
function rl(e, t) {
  switch (e) {
    case "purple":
      return t ? "border border-violet-500 bg-violet-500/10 text-violet-700 dark:border-violet-400 dark:bg-violet-950/40 dark:text-violet-300" : "border border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-700 dark:bg-violet-950/40 dark:text-violet-300";
    case "warning":
      return t ? "border border-amber-500 bg-amber-500/10 text-amber-800 dark:border-amber-400 dark:bg-amber-950/35 dark:text-amber-200" : "border border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/35 dark:text-amber-200";
    case "success":
      return t ? "border border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:border-emerald-400 dark:bg-emerald-950/35 dark:text-emerald-200" : "border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/35 dark:text-emerald-200";
    case "danger":
      return t ? "border border-red-500 bg-red-500/10 text-red-800 dark:border-red-400 dark:bg-red-950/35 dark:text-red-200" : "border border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/35 dark:text-red-200";
    case "orange":
      return t ? "border border-orange-500 bg-orange-500/10 text-orange-800 dark:border-orange-400 dark:bg-orange-950/35 dark:text-orange-200" : "border border-orange-200 bg-orange-50 text-orange-800 dark:border-orange-800 dark:bg-orange-950/35 dark:text-orange-200";
    default:
      return t ? "border border-slate-400 bg-slate-400/10 text-[color:var(--kiut-text-primary)] dark:border-slate-500 dark:bg-slate-800/90 dark:text-slate-200" : "border border-slate-200 bg-slate-100 text-[color:var(--kiut-text-primary)] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200";
  }
}
const hm = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, Ye = /* @__PURE__ */ le({
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
    ]), s = C(() => t.statusLive === !0 ? "text-emerald-700 dark:text-emerald-300" : "text-[color:var(--kiut-text-primary)] dark:text-slate-300"), i = C(
      () => rl(t.color, t.outlined)
    );
    return (l, r) => n.value ? (y(), k("span", {
      key: 0,
      role: "status",
      class: ee(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", o.value])
    }, [
      e.statusLive === !0 ? (y(), k("span", hm, [...r[0] || (r[0] = [
        u("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        u("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : V("", !0),
      u("span", {
        class: ee(["min-w-0 flex-1 text-center", s.value])
      }, D(a.value), 3)
    ], 2)) : (y(), k("span", {
      key: 1,
      class: ee([B(ll), i.value])
    }, [
      ke(l.$slots, "default", {}, () => [
        Te(D(e.label), 1)
      ])
    ], 2));
  }
}), ie = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), Le = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), Ft = (e) => {
  if (e == null) return "0";
  const t = Math.abs(e), n = e < 0 ? "-" : "";
  return t >= 1e6 ? `${n}${(t / 1e6).toFixed(2)}M` : t > 99999 ? `${n}${(t / 1e3).toFixed(1)}K` : `${n}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(t)}`;
}, fm = {
  class: "kiut-table-root table-section flex w-full min-w-0 flex-col rounded-xl font-sans antialiased text-[color:var(--kiut-text-primary,#1e293b)]",
  "data-component": "kiut-table"
}, gm = { class: "overflow-x-auto" }, pm = { class: "w-full table-auto border-collapse text-left text-[14px] leading-normal" }, mm = ["aria-sort", "onClick"], bm = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, vm = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, ym = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, xm = /* @__PURE__ */ le({
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
    const n = e, a = t, o = oe(!1), s = "—";
    function i(w) {
      return w == null || w === "" ? s : String(w);
    }
    function l(w) {
      return w === "center" ? "text-center" : w === "right" ? "text-right" : "text-left";
    }
    function r(w) {
      return `cell-${w}`;
    }
    function c(w, $) {
      return w[$];
    }
    function d(w, $) {
      if (typeof n.rowKey == "function")
        return n.rowKey(w);
      const S = w[n.rowKey];
      return typeof S == "string" || typeof S == "number" ? S : $;
    }
    function h(w, $) {
      return d(w, $);
    }
    function f(w) {
      return n.sortKey === w && n.sortDirection != null;
    }
    function b(w) {
      a("sort", w);
    }
    function g(w) {
      return f(w) ? n.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    const m = C(() => n.rows?.length ?? 0), v = C(() => m.value > n.maxVisibleRows), p = C(() => Math.max(0, m.value - n.maxVisibleRows)), x = C(() => n.rows?.length ? o.value || !v.value ? n.rows : n.rows.slice(0, n.maxVisibleRows) : []), _ = C(
      () => n.viewMoreLabel.replace(/\{count\}/g, String(p.value))
    );
    return (w, $) => (y(), k("div", fm, [
      u("div", gm, [
        u("table", pm, [
          u("thead", null, [
            u("tr", null, [
              (y(!0), k(se, null, pe(e.columns, (S) => (y(), k("th", {
                key: S.key,
                scope: "col",
                class: ee(["kiut-table-th whitespace-nowrap px-3 py-2 text-left text-[#9191a1]", [l(S.align), S.headerClass]])
              }, [
                S.sortable ? (y(), k("button", {
                  key: 0,
                  type: "button",
                  class: ee(["kiut-table-sort-btn inline-flex items-center gap-1", l(S.align)]),
                  "aria-sort": g(S.key),
                  onClick: (M) => b(S.key)
                }, [
                  u("span", null, D(S.label), 1),
                  u("span", bm, [
                    f(S.key) ? (y(), k(se, { key: 0 }, [
                      e.sortDirection === "asc" ? (y(), k("span", vm, "↑")) : e.sortDirection === "desc" ? (y(), k("span", ym, "↓")) : V("", !0)
                    ], 64)) : (y(), k(se, { key: 1 }, [
                      $[1] || ($[1] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      $[2] || ($[2] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, mm)) : (y(), k(se, { key: 1 }, [
                  Te(D(S.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          u("tbody", null, [
            (y(!0), k(se, null, pe(x.value, (S, M) => (y(), k("tr", {
              key: h(S, M)
            }, [
              (y(!0), k(se, null, pe(e.columns, (O) => (y(), k("td", {
                key: `${M}-${O.key}`,
                class: ee(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [l(O.align), O.cellClass]])
              }, [
                ke(w.$slots, r(O.key), {
                  row: S,
                  column: O,
                  value: c(S, O.key)
                }, () => [
                  Te(D(i(c(S, O.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ]),
      v.value ? (y(), k("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: $[0] || ($[0] = (S) => o.value = !o.value)
      }, [
        Te(D(o.value ? e.viewLessLabel : _.value) + " ", 1),
        (y(), k("svg", {
          class: ee(["view-more-icon", { "view-more-icon-rotated": o.value }]),
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [...$[3] || ($[3] = [
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
}), lt = /* @__PURE__ */ me(xm, [["__scopeId", "data-v-22a97a18"]]), _m = {
  key: "error",
  class: "error-state"
}, km = { class: "error-content" }, wm = { class: "error-description" }, Cm = {
  key: "content",
  class: "card-body"
}, $m = { class: "chart-section" }, Sm = { class: "chart-wrapper" }, Mm = { class: "payment-success-summary" }, Dm = {
  key: 0,
  class: "booking-daily-section"
}, Tm = { class: "w-full min-w-0" }, Am = { class: "font-medium" }, Bm = { class: "percentage-text" }, Lm = { class: "badges-container" }, Pm = {
  key: 0,
  class: "badges-container"
}, Rm = {
  key: 1,
  class: "percentage-text"
}, Im = { class: "badges-container" }, Em = {
  key: 1,
  class: "empty-state"
}, Fm = /* @__PURE__ */ le({
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
    function n(p) {
      return p;
    }
    const a = e, o = t, s = (p) => {
      o("export", p);
    }, i = C(() => a.data?.booking_manager_by_day ? [...a.data.booking_manager_by_day].sort(
      (p, x) => new Date(p.date).getTime() - new Date(x.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "paymentInitiated", label: "Payment Initiated", align: "center" },
      { key: "paymentResults", label: "Payment Results", align: "left" },
      { key: "paymentValue", label: "Payment Value", align: "left" },
      { key: "outcomes", label: "Outcomes", align: "left" }
    ], r = C(
      () => i.value.map((p) => ({
        id: p.date,
        ...p
      }))
    ), c = C(() => a.data?.total_payment_success_value || []), d = C(() => {
      const p = c.value;
      return p.length === 0 ? g(0) : p.map(
        (x) => `${x.currency} ${g(x.total_value)}`
      ).join(" · ");
    }), h = (p) => p.payment_success_value || [], f = (p) => typeof p.payment_success_count == "number" ? p.payment_success_count : (p.payment_success_value || []).reduce(
      (x, _) => x + (_.count || 0),
      0
    ), b = (p) => Le(p), g = (p) => p == null ? "0" : Ft(p);
    C(() => (a.data?.total_payment_success_value || []).reduce(
      (p, x) => p + (x.total_value || 0),
      0
    ));
    const m = C(() => {
      const p = a.data, x = p.total_booking_initiated || 0, _ = p.total_booking_started || 0, w = p.total_payment_initiated || 0, $ = p.total_not_found || 0, S = p.total_cancelled || 0, M = p.total_no_pending_balance || 0, O = p.total_errors || 0, j = typeof p.total_payment_success == "number" ? p.total_payment_success : (p.total_payment_success_value || []).reduce(
        (Z, ae) => Z + (ae.count || 0),
        0
      ), F = p.total_payment_failed || 0, A = Math.max(0, x - _), L = Math.max(
        0,
        _ - w - $ - S - M - O
      ), E = (Z, ae) => ve(Z, ae), G = [
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
      ], Q = [];
      return _ > 0 && Q.push({
        source: "Initiated",
        target: "Started",
        value: _,
        label: E(_, x)
      }), A > 0 && Q.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: A,
        label: E(A, x)
      }), w > 0 && Q.push({
        source: "Started",
        target: "Payment Initiated",
        value: w,
        label: E(w, _)
      }), $ > 0 && Q.push({
        source: "Started",
        target: "Not Found",
        value: $,
        label: E($, _)
      }), S > 0 && Q.push({
        source: "Started",
        target: "Cancelled",
        value: S,
        label: E(S, _)
      }), M > 0 && Q.push({
        source: "Started",
        target: "No Pending Balance",
        value: M,
        label: E(M, _)
      }), O > 0 && Q.push({
        source: "Started",
        target: "Errors",
        value: O,
        label: E(O, _)
      }), L > 0 && Q.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: L,
        label: E(L, _)
      }), j > 0 && Q.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: j,
        label: E(j, w)
      }), F > 0 && Q.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: F,
        label: E(F, w)
      }), { nodes: G, links: Q };
    }), v = (p, x) => fn(p, x);
    return (p, x) => (y(), te(Ce, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis",
      loading: e.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !a.loading && !a.error ? (y(), te(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        z(ft, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: P(() => [
            a.error ? (y(), k("div", _m, [
              u("div", km, [
                x[0] || (x[0] = u("div", { class: "error-icon-wrapper" }, [
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
                x[1] || (x[1] = u("p", { class: "error-title" }, "Error loading data", -1)),
                u("p", wm, D(a.error), 1)
              ])
            ])) : (y(), k("div", Cm, [
              u("section", $m, [
                u("div", Sm, [
                  z(Xt, {
                    data: m.value,
                    height: "500px",
                    "use-gradient": !1,
                    "node-gap": 24
                  }, null, 8, ["data"])
                ])
              ]),
              u("section", Mm, [
                z(ye, {
                  color: "#22c55e",
                  title: "Payment Success Value",
                  value: d.value
                }, null, 8, ["value"])
              ]),
              i.value.length > 0 ? (y(), k("section", Dm, [
                x[2] || (x[2] = u("div", { class: "section-header" }, [
                  u("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                u("div", Tm, [
                  z(lt, {
                    columns: l,
                    rows: r.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": P(({ row: _ }) => [
                      u("span", Am, D(B(We)(String(_.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": P(({ row: _ }) => [
                      u("span", null, D(B(ie)(Number(_.booking_initiated_count))), 1)
                    ]),
                    "cell-started": P(({ row: _ }) => [
                      u("span", null, [
                        Te(D(B(ie)(Number(_.booking_started_count))) + " ", 1),
                        u("span", Bm, " (" + D(v(
                          Number(_.booking_started_count),
                          Number(_.booking_initiated_count)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-paymentInitiated": P(({ row: _ }) => [
                      u("span", null, D(B(ie)(Number(_.payment_initiated_count))), 1)
                    ]),
                    "cell-paymentResults": P(({ row: _ }) => [
                      u("div", Lm, [
                        z(Ye, { color: "success" }, {
                          default: P(() => [
                            Te(" Success: " + D(B(ie)(
                              f(_)
                            )), 1)
                          ]),
                          _: 2
                        }, 1024),
                        z(Ye, { color: "danger" }, {
                          default: P(() => [
                            Te(" Failed: " + D(B(ie)(Number(_.payment_failed_count) || 0)), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    "cell-paymentValue": P(({ row: _ }) => [
                      h(_).length > 0 ? (y(), k("div", Pm, [
                        (y(!0), k(se, null, pe(h(
                          _
                        ), (w) => (y(), k("span", {
                          key: `${_.date}-${w.currency}`,
                          class: "badge badge-currency"
                        }, D(w.currency) + " " + D(b(w.total_value)), 1))), 128))
                      ])) : (y(), k("span", Rm, "N/A"))
                    ]),
                    "cell-outcomes": P(({ row: _ }) => [
                      u("div", Im, [
                        z(Ye, { color: "danger" }, {
                          default: P(() => [
                            Te(" Not Found: " + D(_.not_found_count ? B(ie)(Number(_.not_found_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        z(Ye, { color: "warning" }, {
                          default: P(() => [
                            Te(" Cancelled: " + D(_.cancelled_count ? B(ie)(Number(_.cancelled_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        z(Ye, { color: "orange" }, {
                          default: P(() => [
                            Te(" No Balance: " + D(_.no_pending_balance_count ? B(ie)(Number(_.no_pending_balance_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        z(Ye, { color: "danger" }, {
                          default: P(() => [
                            Te(" Errors: " + D(_.error_count ? B(ie)(Number(_.error_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (y(), k("section", Em, [...x[3] || (x[3] = [
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
}), Om = /* @__PURE__ */ me(Fm, [["__scopeId", "data-v-d95c5fa3"]]), Vm = { class: "card-body" }, zm = {
  key: 0,
  class: "chart-section"
}, Nm = { class: "chart-wrapper" }, Hm = {
  key: 1,
  class: "checkin-daily-section"
}, jm = { class: "w-full min-w-0" }, Wm = { class: "font-medium" }, Km = { class: "cell-success" }, Ym = { class: "cell-danger" }, Um = {
  key: 0,
  class: "reasons-list"
}, qm = { class: "reason-name" }, Xm = { class: "reason-count" }, Gm = {
  key: 1,
  class: "no-reasons"
}, Zm = {
  key: 2,
  class: "empty-state"
}, Qm = {
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
    /** Muestra la columna de links de pago generados (record_locator_create_payment_count). */
    showPaymentLinks: {
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
    const n = t, a = (w) => {
      n("export", w);
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
      { key: "date", label: "Date", align: "right" },
      { key: "checkinInit", label: "Checkin Init", align: "right" },
      { key: "bookingRetrieve", label: "Booking Retrieve (%)", align: "right" },
      { key: "passengers", label: "Number of Passengers", align: "right" },
      { key: "completed", label: "Completed (%)", align: "right" },
      { key: "closed", label: "Closed with BP (%)", align: "right" },
      { key: "failed", label: "Failed (%)", align: "right" },
      { key: "reasons", label: "Failed (Reasons)", align: "right" }
    ], c = {
      key: "createPayment",
      label: "Create Payment",
      align: "right"
    }, d = C(
      () => o.showPaymentLinks ? [...r, c] : r
    ), h = C(
      () => (l.value || []).map((w) => ({
        id: w.date,
        date: w.date,
        checkin_initiated_count: w.checkin_initiated_count,
        checkin_init_count: w.checkin_init_count,
        checkin_started_count: w.checkin_started_count,
        checkin_completed_count: w.checkin_completed_count,
        checkin_closed_count: w.checkin_closed_count,
        failed_steps: w.failed_steps,
        record_locator_create_payment_count: w.record_locator_create_payment_count
      }))
    ), f = C(() => {
      const w = o.data;
      return w && (Array.isArray(w.checkin_by_day) && w.checkin_by_day.length > 0 || (w.total_checkin_initiated ?? 0) > 0) ? { ...s, ...w } : o.checkinData ?? s;
    }), b = C(() => {
      const w = o.data;
      return w && (Array.isArray(w.failed_by_step_by_day) && w.failed_by_step_by_day.length > 0 || Array.isArray(w.unrecovered_by_step) && w.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: w.total_checkin_failed ?? 0,
        total_checkin_unrecovered: w.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: w.failed_by_step_by_day ?? [],
        unrecovered_by_step: w.unrecovered_by_step ?? [],
        unrecovered_by_day: w.unrecovered_by_day ?? []
      } : o.failedData ?? i;
    }), g = (w, $) => !$ || $ === 0 ? "0.0%" : fn(w, $), m = (w, $) => {
      const S = ie(w), M = g(w, $);
      return `${S} (${M})`;
    }, v = (w) => w.reduce(($, S) => $ + S.failed_count, 0), p = C(() => {
      const w = [], $ = [];
      if (!f.value.total_checkin_initiated)
        return { nodes: w, links: $ };
      w.push({ name: "Checkin Init" }), w.push({ name: "Booking retrive" }), w.push({ name: "Booking retrive success" }), w.push({ name: "Number of Passengers" }), w.push({ name: "Completed" }), w.push({ name: "Closed with BP" });
      const S = f.value.total_checkin_initiated, M = f.value.total_checkin_init, O = f.value.total_checkin_init_abandoned, j = M - O, F = f.value.total_checkin_started, A = f.value.total_checkin_completed, L = f.value.total_checkin_closed, E = b.value.unrecovered_by_step || [], G = E.reduce(
        (ue, fe) => ue + fe.count,
        0
      );
      M > 0 && $.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: M,
        label: ve(M, S)
      });
      const Q = S - M;
      Q > 0 && (w.push({ name: "Abandoned (Init)", status: "abandon" }), $.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: Q,
        label: ve(Q, S)
      })), O > 0 && (w.push({ name: "Abandoned (Started)", status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: O,
        label: ve(O, S)
      })), j > 0 && $.push({
        source: "Booking retrive",
        target: "Booking retrive success",
        value: j,
        label: ve(j, S)
      }), F > 0 && $.push({
        source: "Booking retrive success",
        target: "Number of Passengers",
        value: F,
        label: ve(F, S)
      }), A > 0 && $.push({
        source: "Number of Passengers",
        target: "Completed",
        value: A,
        label: ve(A, F)
      }), E.length > 0 && G > 0 && (w.push({ name: "Unrecovered", status: "error" }), $.push({
        source: "Number of Passengers",
        target: "Unrecovered",
        value: G,
        label: ve(G, F)
      }), E.forEach((ue) => {
        const X = ue.step_name.replace(/_/g, " ").split(" ").map((T) => T.charAt(0).toUpperCase() + T.slice(1)).join(" ");
        w.push({ name: X, status: "error" }), $.push({
          source: "Unrecovered",
          target: X,
          value: ue.count,
          label: ve(ue.count, F)
        });
      }));
      const Z = F - (A + G);
      Z > 0 && (w.push({ name: "Abandoned (Flow)", status: "abandon" }), $.push({
        source: "Number of Passengers",
        target: "Abandoned (Flow)",
        value: Z,
        label: ve(Z, F)
      }));
      const ae = A - L;
      return ae > 0 && (w.push({ name: "BP Error", status: "error" }), $.push({
        source: "Completed",
        target: "BP Error",
        value: ae,
        label: ve(ae, F)
      })), L > 0 && $.push({
        source: "Completed",
        target: "Closed with BP",
        value: L,
        label: ve(L, F)
      }), { nodes: w, links: $ };
    }), x = () => {
      const w = o.data?.record_locator_by_day;
      if (Array.isArray(w) && w.length > 0) return w;
      const $ = o.checkinData?.record_locator_by_day;
      return Array.isArray($) && $.length > 0 ? $ : [];
    }, _ = () => {
      const w = f.value.checkin_by_day || [], $ = b.value.failed_by_step_by_day || [], S = x();
      if (w.length === 0) {
        l.value = [];
        return;
      }
      l.value = [...w].map((M) => {
        const O = $.find(
          (F) => F.date === M.date
        ), j = S.find(
          (F) => F.date === M.date
        );
        return {
          ...M,
          failed_steps: O?.steps || [],
          record_locator_create_payment_count: M.record_locator_create_payment_count ?? j?.record_locator_create_payment_count ?? 0
        };
      }), l.value.sort((M, O) => new Date(M.date) - new Date(O.date));
    };
    return Fe(
      [() => o.data, () => o.checkinData, () => o.failedData],
      () => {
        _();
      },
      { deep: !0, immediate: !0 }
    ), (w, $) => (y(), te(Ce, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !e.loading ? (y(), te(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        u("div", Vm, [
          p.value.nodes.length > 0 ? (y(), k("section", zm, [
            u("div", Nm, [
              z(Xt, {
                data: p.value,
                height: "500px",
                "use-gradient": !1,
                "node-gap": 24
              }, null, 8, ["data"])
            ])
          ])) : V("", !0),
          l.value && l.value.length > 0 ? (y(), k("section", Hm, [
            u("div", jm, [
              z(lt, {
                columns: d.value,
                rows: h.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": P(({ row: S }) => [
                  u("span", Wm, D(B(We)(String(S.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": P(({ row: S }) => [
                  u("span", null, D(B(ie)(S.checkin_initiated_count)), 1)
                ]),
                "cell-bookingRetrieve": P(({ row: S }) => [
                  u("span", null, D(m(
                    S.checkin_init_count,
                    S.checkin_initiated_count
                  )), 1)
                ]),
                "cell-passengers": P(({ row: S }) => [
                  u("span", null, D(B(ie)(S.checkin_started_count)), 1)
                ]),
                "cell-completed": P(({ row: S }) => [
                  u("span", null, D(m(
                    S.checkin_completed_count,
                    S.checkin_started_count
                  )), 1)
                ]),
                "cell-closed": P(({ row: S }) => [
                  u("span", Km, D(m(
                    S.checkin_closed_count,
                    S.checkin_started_count
                  )), 1)
                ]),
                "cell-failed": P(({ row: S }) => [
                  u("span", Ym, D(m(
                    v(S.failed_steps),
                    S.checkin_started_count
                  )), 1)
                ]),
                "cell-reasons": P(({ row: S }) => [
                  S.failed_steps && S.failed_steps.length > 0 ? (y(), k("div", Um, [
                    (y(!0), k(se, null, pe(S.failed_steps, (M) => (y(), k("div", {
                      key: M.step_name,
                      class: "reason-item"
                    }, [
                      u("span", qm, D(M.step_name.replace(/_/g, " ")) + ":", 1),
                      u("span", Xm, D(M.failed_count), 1)
                    ]))), 128))
                  ])) : (y(), k("div", Gm, "-"))
                ]),
                "cell-createPayment": P(({ row: S }) => [
                  u("span", null, D(B(ie)(S.record_locator_create_payment_count ?? 0)), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (y(), k("section", Zm, [...$[0] || ($[0] = [
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
        ])
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}, cl = /* @__PURE__ */ me(Qm, [["__scopeId", "data-v-d623189e"]]), Jm = { class: "card-body" }, e0 = {
  key: 0,
  class: "sankey-section"
}, t0 = {
  key: 1,
  class: "checkin-metrics-daily-section"
}, n0 = { class: "w-full min-w-0" }, a0 = { class: "font-medium whitespace-nowrap" }, o0 = { class: "cell-success" }, s0 = { class: "cell-danger" }, i0 = {
  key: 0,
  class: "reasons-list"
}, l0 = { class: "reason-name" }, r0 = { class: "reason-count" }, c0 = {
  key: 1,
  class: "no-reasons"
}, d0 = {
  key: 2,
  class: "empty-state"
}, u0 = { class: "empty-state-content" }, h0 = { class: "empty-icon-wrapper" }, f0 = /* @__PURE__ */ le({
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
    const a = e, o = n, s = (v) => {
      o("export", v);
    }, { isDark: i } = Me(Se(a, "theme")), l = (v) => v == null ? "0" : v.toLocaleString(), r = (v) => {
      const [p, x, _] = v.split("-").map(Number);
      return We([p, x - 1, _]).format("MMM DD");
    }, c = (v) => v.replace(/_/g, " ").replace(/\b\w/g, (p) => p.toUpperCase()), d = (v, p) => fn(v, p), h = (v, p) => {
      const x = v || 0, _ = p || 0, w = l(x), $ = d(x, _);
      return `${w} (${$})`;
    }, f = C(() => {
      const v = a.checkinData?.record_locator_by_day || [], p = a.failedData?.failed_by_step_by_day || [], x = a.failedData?.unrecovered_by_day || [];
      return v.map((w) => {
        const $ = p.find((M) => M.date === w.date), S = x.find(
          (M) => M.date === w.date
        );
        return {
          ...w,
          failed_steps: $?.steps || [],
          unrecovered_count: S?.unrecovered_count || 0
        };
      }).sort(
        (w, $) => new Date(w.date).getTime() - new Date($.date).getTime()
      );
    }), b = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieval", label: "Booking Retrieval (%)", align: "center" },
      { key: "bookingRetrieved", label: "Booking Retrieved", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Errors (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], g = C(
      () => f.value.map((v) => ({
        id: v.date,
        date: v.date,
        checkin_initiated: v.checkin_initiated,
        record_locator_init_count: v.record_locator_init_count,
        record_locator_started_count: v.record_locator_started_count,
        record_locator_completed_count: v.record_locator_completed_count,
        record_locator_closed_count: v.record_locator_closed_count,
        unrecovered_count: v.unrecovered_count,
        failed_steps: v.failed_steps
      }))
    ), m = C(() => {
      const v = [], p = [], x = /* @__PURE__ */ new Set(), _ = (De) => {
        x.has(De) || (v.push({ name: De }), x.add(De));
      };
      if (!a.checkinData?.total_checkin_initiated)
        return { nodes: v, links: p };
      _("Checkin Init"), _("Booking Retrieval"), _("Booking Retrieved"), _("Completed"), _("Closed with BP");
      const w = a.checkinData.total_checkin_initiated || 0, $ = a.checkinData.total_record_locator_init || 0, S = a.checkinData.total_record_locator_init_abandoned || 0, M = a.checkinData.total_checkin_pre_init_abandoned_error, O = a.checkinData.total_checkin_pre_init_abandoned_voluntary, j = M != null || O != null, F = j ? Math.max(Number(M) || 0, 0) : 0, A = j ? Math.max(Number(O) || 0, 0) : 0, L = a.checkinData.total_record_locator_init_abandoned_error, E = a.checkinData.total_record_locator_init_abandoned_voluntary, G = L != null || E != null, Q = G ? Math.max(Number(L) || 0, 0) : 0, Z = G ? Math.max(Number(E) || 0, 0) : 0, ae = G ? Math.max(S - Q - Z, 0) : S, ue = $ - S, fe = a.checkinData.total_record_locator_started || 0, X = a.checkinData.total_record_locator_completed || 0, T = a.checkinData.total_record_locator_closed || 0, H = a.checkinData.total_record_locator_unrecovered || 0;
      $ > 0 && p.push({
        source: "Checkin Init",
        target: "Booking Retrieval",
        value: $,
        label: ve($, w)
      });
      const W = w - $;
      j ? (A > 0 && (_("Abandoned (Init)"), p.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: A,
        label: ve(A, w)
      })), F > 0 && (_("Booking not retreived"), p.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: F,
        label: ve(F, w)
      }))) : W > 0 && (_("Abandoned (Init)"), p.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: W,
        label: ve(W, w)
      })), G ? (Q > 0 && (_("Error"), p.push({
        source: "Booking Retrieval",
        target: "Error",
        value: Q,
        label: ve(Q, w)
      })), Z > 0 && (_("Abandoned (Started)"), p.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: Z,
        label: ve(Z, w)
      })), ae > 0 && (_("Abandoned (Started)"), p.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: ae,
        label: ve(ae, w)
      }))) : S > 0 && (_("Abandoned (Started)"), p.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: S,
        label: ve(S, w)
      })), ue > 0 && p.push({
        source: "Booking Retrieval",
        target: "Booking Retrieved",
        value: ue,
        label: ve(ue, w)
      }), X > 0 && p.push({
        source: "Booking Retrieved",
        target: "Completed",
        value: X,
        label: ve(X, fe)
      }), H > 0 && (_("Errors"), p.push({
        source: "Booking Retrieved",
        target: "Errors",
        value: H,
        label: ve(H, fe)
      }));
      const re = fe - (X + H);
      re > 0 && (_("Abandoned (Flow)"), p.push({
        source: "Booking Retrieved",
        target: "Abandoned (Flow)",
        value: re,
        label: ve(re, fe)
      }));
      const xe = X - T;
      return xe > 0 && (_("BP Error"), p.push({
        source: "Completed",
        target: "BP Error",
        value: xe,
        label: ve(xe, fe)
      })), T > 0 && p.push({
        source: "Completed",
        target: "Closed with BP",
        value: T,
        label: ve(T, fe)
      }), { nodes: v, links: p };
    });
    return t({ isDark: i }), (v, p) => (y(), te(Ce, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !e.loading ? (y(), te(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        u("div", Jm, [
          m.value.nodes.length > 0 ? (y(), k("div", e0, [
            z(Xt, {
              data: m.value,
              height: "500px",
              "use-gradient": !1,
              "node-gap": 24
            }, null, 8, ["data"])
          ])) : V("", !0),
          f.value && f.value.length > 0 ? (y(), k("div", t0, [
            u("div", n0, [
              z(lt, {
                columns: b,
                rows: g.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": P(({ row: x }) => [
                  u("span", a0, D(r(String(x.date))), 1)
                ]),
                "cell-checkinInit": P(({ row: x }) => [
                  u("span", null, D(l(x.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieval": P(({ row: x }) => [
                  u("span", null, D(h(
                    x.record_locator_init_count,
                    x.checkin_initiated
                  )), 1)
                ]),
                "cell-bookingRetrieved": P(({ row: x }) => [
                  u("span", null, D(h(
                    x.record_locator_started_count,
                    x.record_locator_init_count
                  )), 1)
                ]),
                "cell-completed": P(({ row: x }) => [
                  u("span", null, D(h(
                    x.record_locator_completed_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-closed": P(({ row: x }) => [
                  u("span", o0, D(h(
                    x.record_locator_closed_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-failed": P(({ row: x }) => [
                  u("span", s0, D(h(
                    x.unrecovered_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-reasons": P(({ row: x }) => [
                  Array.isArray(x.failed_steps) && x.failed_steps.length > 0 ? (y(), k("div", i0, [
                    (y(!0), k(se, null, pe(x.failed_steps, (_) => (y(), k("div", {
                      key: _.step_name,
                      class: "reason-item"
                    }, [
                      u("span", l0, D(c(_.step_name)) + ":", 1),
                      u("span", r0, D(_.failed_count), 1)
                    ]))), 128))
                  ])) : (y(), k("div", c0, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (y(), k("div", d0, [
            u("div", u0, [
              u("div", h0, [
                z(B(nt), { class: "empty-icon" })
              ]),
              p[0] || (p[0] = u("p", { class: "empty-title" }, "No check-in data available", -1)),
              p[1] || (p[1] = u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see check-in metrics. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), g0 = /* @__PURE__ */ me(f0, [["__scopeId", "data-v-70c373c1"]]), p0 = { class: "card-body" }, m0 = {
  key: 0,
  class: "checkin-segments-daily-section"
}, b0 = { class: "w-full min-w-0" }, v0 = { class: "segment-plain" }, y0 = { class: "segment-plain" }, x0 = { class: "segment-plain" }, _0 = { class: "percentage-value" }, k0 = { class: "percentage-value" }, w0 = { class: "percentage-value success" }, C0 = {
  key: 1,
  class: "empty-state"
}, $0 = /* @__PURE__ */ le({
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
    const a = e, o = n, s = (f) => {
      o("export", f);
    }, { isDark: i } = Me(Se(a, "theme")), l = [
      { key: "departure", label: "Departure", align: "center" },
      { key: "connection", label: "Connection", align: "center" },
      { key: "arrival", label: "Arrival", align: "center" },
      { key: "trip", label: "Trip", align: "center" },
      { key: "init", label: "Init", align: "center" },
      { key: "started", label: "Started (%)", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed (%)", align: "center" }
    ], r = C(
      () => a.data.map((f, b) => ({
        id: `segment-${b}-${f.departure_airport}-${f.arrival_airport}-${f.segment_init_count}-${f.segment_started_count}`,
        departure_airport: f.departure_airport,
        conexion_airport: f.conexion_airport,
        arrival_airport: f.arrival_airport,
        segment_init_count: f.segment_init_count,
        segment_started_count: f.segment_started_count,
        segment_completed_count: f.segment_completed_count,
        segment_closed_count: f.segment_closed_count
      }))
    ), c = (f, b) => !b || b === 0 || !f ? "0%" : `${Math.round(f / b * 100)}%`, d = (f) => !f || f === "None" ? "-" : String(f).trim().replace(/_[0-9]+$/i, ""), h = (f) => {
      const b = d(f?.departure_airport), g = d(f?.arrival_airport);
      return b === "-" || g === "-" ? !1 : b === g;
    };
    return t({ isDark: i }), (f, b) => (y(), te(Ce, {
      class: "checkin-segments-root h-full min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !a.loading ? (y(), te(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        u("div", p0, [
          a.data.length > 0 ? (y(), k("section", m0, [
            u("div", b0, [
              z(lt, {
                columns: l,
                rows: r.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-departure": P(({ row: g }) => [
                  u("span", v0, D(d(g.departure_airport)), 1)
                ]),
                "cell-connection": P(({ row: g }) => [
                  u("span", {
                    class: ee(["segment-plain", {
                      "segment-plain--muted": d(g.conexion_airport) === "-"
                    }])
                  }, D(d(g.conexion_airport)), 3)
                ]),
                "cell-arrival": P(({ row: g }) => [
                  u("span", y0, D(d(g.arrival_airport)), 1)
                ]),
                "cell-trip": P(({ row: g }) => [
                  u("span", x0, D(h(g) ? "Roundtrip" : "One way"), 1)
                ]),
                "cell-init": P(({ row: g }) => [
                  Te(D(B(ie)(g.segment_init_count)), 1)
                ]),
                "cell-started": P(({ row: g }) => [
                  u("span", _0, D(c(
                    g.segment_started_count,
                    g.segment_init_count
                  )), 1)
                ]),
                "cell-completed": P(({ row: g }) => [
                  u("span", k0, D(c(
                    g.segment_completed_count,
                    g.segment_init_count
                  )), 1)
                ]),
                "cell-closed": P(({ row: g }) => [
                  u("span", w0, D(c(
                    g.segment_closed_count,
                    g.segment_init_count
                  )), 1)
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (y(), k("section", C0, [...b[0] || (b[0] = [
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
        ])
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}), dl = /* @__PURE__ */ me($0, [["__scopeId", "data-v-b8704d3c"]]), S0 = { class: "checkin-container__body" }, M0 = /* @__PURE__ */ le({
  __name: "CheckinContainer",
  props: {
    containerInitiallyOpen: { type: Boolean, default: !1 },
    childrenInitiallyOpen: { type: Boolean, default: !0 },
    loading: { type: Boolean, default: !1 },
    checkinLoading: { type: Boolean, default: !1 },
    segmentsLoading: { type: Boolean, default: !1 },
    showCheckin: { type: Boolean, default: !0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    checkinData: {},
    checkinFailedData: {},
    segmentsData: {},
    showPaymentLinks: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = C(
      () => n.loading ? !1 : n.checkinLoading
    ), s = C(
      () => n.loading ? !1 : n.segmentsLoading
    );
    function i(c, d) {
      a("export", { source: c, format: d });
    }
    function l(c) {
      return typeof c == "object" && c !== null && "source" in c;
    }
    function r(c) {
      if (l(c)) {
        a("export", c);
        return;
      }
      i("checkinSegments", c);
    }
    return (c, d) => (y(), te(Ce, {
      class: "checkin-container-root w-full",
      title: "Check in",
      subtitle: "Check-in flows and segment breakdown.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading
    }, {
      default: P(() => [
        u("div", S0, [
          e.showCheckin ? (y(), te(cl, {
            key: 0,
            class: "w-full min-h-0",
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: o.value,
            "checkin-data": e.checkinData,
            "failed-data": e.checkinFailedData,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            "show-payment-links": e.showPaymentLinks,
            onExport: d[0] || (d[0] = (h) => i("checkin", h))
          }, null, 8, ["initially-open", "loading", "checkin-data", "failed-data", "enable-export", "export-loading", "show-payment-links"])) : V("", !0),
          z(dl, {
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: s.value,
            data: e.segmentsData ?? [],
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: r
          }, null, 8, ["initially-open", "loading", "data", "theme", "enable-export", "export-loading"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), D0 = /* @__PURE__ */ me(M0, [["__scopeId", "data-v-f1ea17ca"]]), T0 = { class: "card-body" }, A0 = { class: "chart-section" }, B0 = { class: "chart-wrapper" }, L0 = {
  key: 1,
  class: "empty-chart"
}, P0 = { class: "payment-success-summary" }, R0 = {
  key: 0,
  class: "disruption-daily-section"
}, I0 = { class: "w-full min-w-0" }, E0 = { class: "font-medium text-center" }, F0 = { class: "text-center" }, O0 = { class: "text-center" }, V0 = { class: "percentage-text" }, z0 = { class: "text-center" }, N0 = { class: "abandoned-value" }, H0 = { class: "badges-container badges-wrap" }, j0 = { class: "badges-container badges-wrap" }, W0 = {
  key: 1,
  class: "empty-state"
}, K0 = /* @__PURE__ */ le({
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
    function n(v) {
      return v;
    }
    const a = e, o = t, s = (v) => {
      o("export", v);
    }, i = C(() => a.data?.disruption_by_day ? [...a.data.disruption_by_day].sort(
      (v, p) => new Date(v.date).getTime() - new Date(p.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "abandoned", label: "Abandoned (%)", align: "center" },
      { key: "voluntary", label: "Voluntary", align: "left" },
      { key: "involuntary", label: "Involuntary", align: "left" }
    ], r = C(
      () => i.value.map((v) => ({
        id: v.date,
        ...v
      }))
    ), c = C(() => a.data?.total_payment_success || []), d = C(() => {
      const v = c.value;
      return v.length === 0 ? f(0) : v.map((p) => `${p.currency} ${f(p.total_value)}`).join(" · ");
    }), h = (v, p) => fn(v, p), f = (v) => Le(v), b = (v) => (v ?? []).reduce((p, x) => p + (x.count ?? 0), 0), g = (v) => typeof v.sell_success_count == "number" ? v.sell_success_count : b(v.payment_success_total), m = C(() => {
      const v = a.data, p = v.total_disruption_conversations || 0, x = v.total_disruption_initiated || 0, _ = v.total_voluntary || 0, w = v.total_involuntary || 0, $ = v.total_accepted || 0, S = v.total_confirmed || 0, M = typeof v.total_sell_success == "number" ? v.total_sell_success : b(v.total_payment_success), O = v.total_sell_failed || 0, j = Math.max(0, p - x), F = Math.max(
        0,
        x - _ - w
      ), A = Math.max(0, w - $), L = Math.max(0, _ - S), E = O, G = Math.max(0, S - M - E), Q = (ue, fe) => ve(ue, fe), Z = [
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
      ], ae = [];
      return x > 0 && ae.push({
        source: "Initiated",
        target: "Started",
        value: x,
        label: Q(x, p)
      }), j > 0 && ae.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: j,
        label: Q(j, p)
      }), _ > 0 && ae.push({
        source: "Started",
        target: "Voluntary",
        value: _,
        label: Q(_, p)
      }), w > 0 && ae.push({
        source: "Started",
        target: "Involuntary",
        value: w,
        label: Q(w, p)
      }), F > 0 && ae.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: F,
        label: Q(F, p)
      }), $ > 0 && ae.push({
        source: "Involuntary",
        target: "Accepted",
        value: $,
        label: Q($, p)
      }), A > 0 && ae.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: A,
        label: Q(A, p)
      }), S > 0 && ae.push({
        source: "Voluntary",
        target: "Confirmed",
        value: S,
        label: Q(S, p)
      }), L > 0 && ae.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: L,
        label: Q(L, p)
      }), M > 0 && ae.push({
        source: "Confirmed",
        target: "Paid",
        value: M,
        label: Q(M, p)
      }), E > 0 && ae.push({
        source: "Confirmed",
        target: "Rejected",
        value: E,
        label: Q(E, p)
      }), G > 0 && ae.push({
        source: "Confirmed",
        target: "Not Paid",
        value: G,
        label: Q(G, p)
      }), { nodes: Z, links: ae };
    });
    return (v, p) => (y(), te(Ce, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking",
      loading: e.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !a.loading ? (y(), te(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        u("div", T0, [
          u("section", A0, [
            u("div", B0, [
              m.value.nodes.length > 0 && m.value.links.length > 0 ? (y(), te(Xt, {
                key: 0,
                data: m.value,
                height: "500px",
                "use-gradient": !1,
                "node-gap": 24
              }, null, 8, ["data"])) : (y(), k("div", L0, [...p[0] || (p[0] = [
                u("p", { class: "empty-chart-text" }, " No disruption data available for visualization ", -1)
              ])]))
            ])
          ]),
          u("section", P0, [
            z(ye, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: d.value
            }, null, 8, ["value"])
          ]),
          i.value && i.value.length > 0 ? (y(), k("section", R0, [
            p[1] || (p[1] = u("div", { class: "section-header" }, [
              u("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            u("div", I0, [
              z(lt, {
                columns: l,
                rows: r.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": P(({ row: x }) => [
                  u("span", E0, D(B(We)(String(x.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": P(({ row: x }) => [
                  u("span", F0, D(B(ie)(Number(x.disruption_conversations))), 1)
                ]),
                "cell-started": P(({ row: x }) => [
                  u("span", O0, [
                    Te(D(B(ie)(Number(x.disruption_initiated_count))) + " ", 1),
                    u("span", V0, " (" + D(h(
                      Number(x.disruption_initiated_count),
                      Number(x.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-abandoned": P(({ row: x }) => [
                  u("span", z0, [
                    u("span", N0, D(B(ie)(
                      Number(x.disruption_initiated_count) - Number(x.voluntary_count) - Number(x.involuntary_count)
                    )) + " (" + D(h(
                      Number(x.disruption_initiated_count) - Number(x.voluntary_count) - Number(x.involuntary_count),
                      Number(x.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-voluntary": P(({ row: x }) => [
                  u("div", H0, [
                    (y(!0), k(se, null, pe([x], (_, w) => (y(), k(se, { key: w }, [
                      z(Ye, {
                        color: "neutral",
                        outlined: !0
                      }, {
                        default: P(() => [
                          Te(" VOL " + D(B(ie)(_.voluntary_count)) + " (" + D(h(
                            _.voluntary_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Ye, { color: "success" }, {
                        default: P(() => [
                          Te(" Confirm " + D(B(ie)(_.confirmed_count)) + " (" + D(h(
                            _.confirmed_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Ye, { color: "warning" }, {
                        default: P(() => [
                          Te(" Not Confirm " + D(B(ie)(_.voluntary_count - _.confirmed_count)) + " (" + D(h(
                            _.voluntary_count - _.confirmed_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Ye, { color: "danger" }, {
                        default: P(() => [
                          Te(" Reject " + D(B(ie)(_.sell_failed_count)) + " (" + D(h(
                            _.sell_failed_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Ye, { color: "orange" }, {
                        default: P(() => [
                          Te(" Not Paid " + D(B(ie)(
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
                      z(Ye, {
                        color: "success",
                        outlined: !0
                      }, {
                        default: P(() => [
                          Te(" Finish " + D(B(ie)(g(_))) + " (" + D(h(
                            g(_),
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      (y(!0), k(se, null, pe(_.payment_success_total || [], ($) => (y(), te(Ye, {
                        key: `${_.date}-${$.currency}`,
                        color: "neutral"
                      }, {
                        default: P(() => [
                          Te(D($.currency) + " " + D(f($.total_value)), 1)
                        ]),
                        _: 2
                      }, 1024))), 128))
                    ], 64))), 128))
                  ])
                ]),
                "cell-involuntary": P(({ row: x }) => [
                  u("div", j0, [
                    (y(!0), k(se, null, pe([x], (_, w) => (y(), k(se, { key: w }, [
                      z(Ye, { color: "purple" }, {
                        default: P(() => [
                          Te(" INV " + D(B(ie)(_.involuntary_count)) + " (" + D(h(
                            _.involuntary_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Ye, { color: "danger" }, {
                        default: P(() => [
                          Te(" Human " + D(B(ie)(_.involuntary_count - _.accepted_count)) + " (" + D(h(
                            _.involuntary_count - _.accepted_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Ye, { color: "success" }, {
                        default: P(() => [
                          Te(" Accept " + D(B(ie)(_.accepted_count)) + " (" + D(h(
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
          ])) : (y(), k("section", W0, [...p[2] || (p[2] = [
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
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Y0 = /* @__PURE__ */ me(K0, [["__scopeId", "data-v-d7ae167f"]]), U0 = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, q0 = { class: "w-full shrink-0 flex min-h-0 flex-col" }, X0 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, G0 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Z0 = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, Q0 = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, J0 = /* @__PURE__ */ le({
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
    const a = e, o = n, s = (b) => {
      o("export", b);
    }, i = Se(a, "theme"), { isDark: l } = Me(i), r = {
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
      const b = d.value, g = b.total_airline_information_retrieved + b.total_booking_info_retrieved + b.total_flight_status_retrieved, m = (x) => g > 0 ? (x / g * 100).toFixed(1) : "0.0", v = b.total_faq_events, p = v > 0 ? `${(b.total_documents_found / v * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: r.airline_information,
          value: `${m(b.total_airline_information_retrieved)}%`,
          subvalue: `${ie(b.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: r.booking_info,
          value: `${m(b.total_booking_info_retrieved)}%`,
          subvalue: `${ie(b.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: r.flight_status,
          value: `${m(b.total_flight_status_retrieved)}%`,
          subvalue: `${ie(b.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: ie(b.total_documents_found),
          subvalue: p
        }
      ];
    }), f = (b) => {
      if (!b) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const g = b.faq_by_day || [];
      if (g.length > 0) {
        const m = g.map(
          (_) => We(_.date).format("MMM DD")
        ), v = g.map(
          (_) => _.airline_information_retrieved_count || 0
        ), p = g.map(
          (_) => _.flight_status_retrieved_count || 0
        ), x = g.map(
          (_) => _.booking_info_retrieved_count || 0
        );
        c.value = {
          labels: m,
          datasets: [
            {
              label: "Airline Information",
              data: v,
              borderColor: r.airline_information,
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              fill: !0
            },
            {
              label: "Flight Status",
              data: p,
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
    return Fe(
      () => a.data,
      (b) => {
        f(b ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: l }), (b, g) => (y(), te(Ce, {
      class: "w-full min-h-0 self-start",
      title: "FAQ Metrics",
      subtitle: "FAQ volume by category",
      collapsible: !1,
      loading: a.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !a.loading ? (y(), te(B(Oe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        u("div", U0, [
          u("div", q0, [
            c.value.labels && c.value.labels.length ? (y(), k("section", X0, [
              u("div", G0, [
                z(vt, {
                  data: c.value,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              u("div", Z0, [
                (y(!0), k(se, null, pe(h.value, (m) => (y(), te(ye, {
                  key: m.name,
                  class: "min-w-0",
                  color: m.color,
                  title: m.label,
                  value: m.value,
                  subvalue: m.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ])
            ])) : (y(), k("section", Q0, [...g[0] || (g[0] = [
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
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), eb = /* @__PURE__ */ me(J0, [["__scopeId", "data-v-b6ea961f"]]), tb = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, nb = { class: "w-full shrink-0 flex min-h-0 flex-col" }, ab = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, ob = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, sb = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, ib = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, lb = { class: "max-w-[360px] px-4 text-center" }, rb = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, cb = /* @__PURE__ */ le({
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
    }, o = e, s = n, i = (b) => {
      s("export", b);
    }, l = Se(o, "theme"), { isDark: r } = Me(l), c = C(() => {
      const b = o.data?.agents_by_day || {}, g = Object.keys(b).sort();
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const m = /* @__PURE__ */ new Set();
      for (const x of Object.values(b))
        for (const _ of Object.keys(x))
          m.add(_);
      const p = Array.from(m).map((x) => {
        const _ = x.toLowerCase(), w = a[_] || a[x] || "#94a3b8";
        return {
          label: x.charAt(0).toUpperCase() + x.slice(1).replace(/_/g, " "),
          data: g.map(($) => b[$]?.[x] || 0),
          borderColor: w
        };
      });
      return {
        labels: g.map((x) => We(x).format("MMM DD")),
        datasets: p
      };
    }), d = C(() => {
      const b = o.data?.agents_by_day || {}, g = {};
      for (const v of Object.values(b))
        for (const [p, x] of Object.entries(v))
          g[p] = (g[p] || 0) + x;
      const m = Object.values(g).reduce((v, p) => v + p, 0);
      return m === 0 ? [] : Object.entries(g).sort(([, v], [, p]) => p - v).map(([v, p]) => {
        const x = v.toLowerCase();
        return {
          name: v,
          label: v.charAt(0).toUpperCase() + v.slice(1).replace(/_/g, " "),
          total: p,
          percentage: (p / m * 100).toFixed(1),
          color: a[x] || a[v] || "#94a3b8"
        };
      });
    }), h = C(() => d.value.slice(0, 4)), f = C(() => {
      const b = h.value.length;
      if (!(b <= 0))
        return { gridTemplateColumns: `repeat(${b}, minmax(0, 1fr))` };
    });
    return t({ isDark: r }), (b, g) => (y(), te(Ce, {
      class: "w-full min-h-0 self-start",
      title: "Interactions by Agent",
      subtitle: "Responses sent by AI agents",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !o.loading ? (y(), te(B(Oe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        u("div", tb, [
          u("div", nb, [
            c.value.labels && c.value.labels.length ? (y(), k("section", ab, [
              u("div", ob, [
                z(vt, {
                  data: c.value,
                  options: e.options,
                  theme: l.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              h.value.length ? (y(), k("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: $e(f.value)
              }, [
                (y(!0), k(se, null, pe(h.value, (m) => (y(), te(ye, {
                  key: m.name,
                  class: "min-w-0",
                  color: m.color,
                  title: m.label,
                  value: `${m.percentage}%`,
                  subvalue: `${B(ie)(m.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : V("", !0)
            ])) : d.value.length ? (y(), k("section", sb, [
              u("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: $e(f.value)
              }, [
                (y(!0), k(se, null, pe(h.value, (m) => (y(), te(ye, {
                  key: m.name,
                  class: "min-w-0",
                  color: m.color,
                  title: m.label,
                  value: `${m.percentage}%`,
                  subvalue: `${B(ie)(m.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : V("", !0),
            d.value.length ? V("", !0) : (y(), k("section", ib, [
              u("div", lb, [
                u("div", rb, [
                  z(B(nt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                g[0] || (g[0] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agent interactions data ", -1)),
                g[1] || (g[1] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), db = /* @__PURE__ */ me(cb, [["__scopeId", "data-v-932f6fac"]]), ub = { class: "card-body" }, hb = {
  key: 0,
  class: "chart-section"
}, fb = { class: "chart-wrapper" }, gb = {
  key: 1,
  class: "record-locator-daily-section"
}, pb = { class: "w-full min-w-0" }, mb = { class: "cell-plain font-medium" }, bb = { class: "cell-plain text-center" }, vb = { class: "cell-plain text-center" }, yb = { class: "cell-plain text-center" }, xb = { class: "cell-plain text-center" }, _b = { class: "cell-plain text-center success-value" }, kb = { class: "cell-plain text-center failed-value" }, wb = { class: "cell-plain text-center warning-value" }, Cb = { class: "cell-plain text-center" }, $b = { class: "cell-plain text-center failed-value" }, Sb = {
  key: 2,
  class: "empty-state"
}, Mb = /* @__PURE__ */ le({
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
    const a = e, o = n, s = (v) => {
      o("export", v);
    }, { isDark: i } = Me(Se(a, "theme")), l = C(() => a.data?.record_locator_by_day ? [...a.data.record_locator_by_day].sort(
      (v, p) => new Date(v.date).getTime() - new Date(p.date).getTime()
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
      () => l.value.map((v) => ({
        id: v.date,
        date: v.date,
        checkin_initiated: v.checkin_initiated,
        record_locator_init_count: v.record_locator_init_count,
        record_locator_started_count: v.record_locator_started_count,
        record_locator_completed_count: v.record_locator_completed_count,
        record_locator_closed_count: v.record_locator_closed_count,
        record_locator_failed_count: v.record_locator_failed_count,
        record_locator_abandoned_count: v.record_locator_abandoned_count,
        record_locator_create_payment_count: v.record_locator_create_payment_count,
        record_locator_create_payment_failed_count: v.record_locator_create_payment_failed_count
      }))
    ), f = C(() => a.data), b = (v, p) => fn(v, p), g = (v, p) => {
      const x = ie(v), _ = b(v, p);
      return `${x} (${_})`;
    }, m = C(() => {
      const v = [], p = [], x = /* @__PURE__ */ new Set(), _ = (W) => {
        x.has(W) || (v.push({ name: W }), x.add(W));
      };
      if (!f.value.total_checkin_initiated)
        return { nodes: v, links: p };
      _("Checkin Init"), _("Booking retrive"), _("Checkin Started"), _("Checkin Completed"), _("Checkin Closed");
      const w = f.value.total_checkin_initiated, $ = f.value.total_record_locator_init, S = f.value.total_record_locator_started, M = f.value.total_record_locator_completed, O = f.value.total_record_locator_closed, j = f.value.total_record_locator_failed, F = f.value.total_record_locator_abandoned, A = f.value.total_record_locator_init_abandoned, L = f.value.total_checkin_pre_init_abandoned_error, E = f.value.total_checkin_pre_init_abandoned_voluntary, G = L != null || E != null, Q = G ? Math.max(Number(L) || 0, 0) : 0, Z = G ? Math.max(Number(E) || 0, 0) : 0, ae = f.value.total_record_locator_init_abandoned_error, ue = f.value.total_record_locator_init_abandoned_voluntary, fe = ae != null || ue != null, X = fe ? Math.max(Number(ae) || 0, 0) : 0, T = fe ? Math.max(Number(ue) || 0, 0) : 0;
      $ > 0 && p.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: $,
        label: ve($, w)
      });
      const H = w - $;
      return G ? (Z > 0 && (_("Abandoned (Init)"), p.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: Z,
        label: ve(Z, w)
      })), Q > 0 && (_("Booking not retreived"), p.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: Q,
        label: ve(Q, w)
      }))) : H > 0 && (_("Abandoned (Init)"), p.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: H,
        label: ve(H, w)
      })), S > 0 && p.push({
        source: "Booking retrive",
        target: "Checkin Started",
        value: S,
        label: ve(S, w)
      }), fe ? (X > 0 && (_("Error"), p.push({
        source: "Booking retrive",
        target: "Error",
        value: X,
        label: ve(X, w)
      })), T > 0 && (_("Abandoned (Started)"), p.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: T,
        label: ve(T, w)
      }))) : A > 0 && (_("Abandoned (Started)"), p.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: A,
        label: ve(A, w)
      })), M > 0 && p.push({
        source: "Checkin Started",
        target: "Checkin Completed",
        value: M,
        label: ve(M, S)
      }), O > 0 && p.push({
        source: "Checkin Completed",
        target: "Checkin Closed",
        value: O,
        label: ve(O, S)
      }), j > 0 && (_("Checkin Failed"), p.push({
        source: "Checkin Started",
        target: "Checkin Failed",
        value: j,
        label: ve(j, S)
      })), F > 0 && (_("Abandoned (Flow)"), p.push({
        source: "Checkin Started",
        target: "Abandoned (Flow)",
        value: F,
        label: ve(F, S)
      })), { nodes: v, links: p };
    });
    return t({ isDark: i }), (v, p) => (y(), te(Ce, {
      class: "record-locator-root h-full min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: e.collapsible,
      loading: a.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !a.loading ? (y(), te(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        u("div", ub, [
          m.value.nodes.length > 0 ? (y(), k("section", hb, [
            u("div", fb, [
              z(Xt, {
                data: m.value,
                height: "500px",
                "use-gradient": !1,
                "node-gap": 24
              }, null, 8, ["data"])
            ])
          ])) : V("", !0),
          l.value && l.value.length > 0 ? (y(), k("section", gb, [
            u("div", pb, [
              z(lt, {
                columns: d.value,
                rows: h.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": P(({ row: x }) => [
                  u("span", mb, D(B(We)(String(x.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": P(({ row: x }) => [
                  u("span", bb, D(B(ie)(x.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieve": P(({ row: x }) => [
                  u("span", vb, D(g(
                    x.record_locator_init_count,
                    x.checkin_initiated
                  )), 1)
                ]),
                "cell-checkinStarted": P(({ row: x }) => [
                  u("span", yb, D(B(ie)(x.record_locator_started_count)), 1)
                ]),
                "cell-checkinCompleted": P(({ row: x }) => [
                  u("span", xb, D(g(
                    x.record_locator_completed_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinClosed": P(({ row: x }) => [
                  u("span", _b, D(g(
                    x.record_locator_closed_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinFailed": P(({ row: x }) => [
                  u("span", kb, D(g(
                    x.record_locator_failed_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-abandoned": P(({ row: x }) => [
                  u("span", wb, D(g(
                    x.record_locator_abandoned_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-createPayment": P(({ row: x }) => [
                  u("span", Cb, D(B(ie)(
                    x.record_locator_create_payment_count ?? 0
                  )), 1)
                ]),
                "cell-failedPayment": P(({ row: x }) => [
                  u("span", $b, D(B(ie)(
                    x.record_locator_create_payment_failed_count ?? 0
                  )), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (y(), k("section", Sb, [...p[0] || (p[0] = [
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
        ])
      ]),
      _: 1
    }, 8, ["collapsible", "loading"]));
  }
}), Db = /* @__PURE__ */ me(Mb, [["__scopeId", "data-v-68053ff9"]]), Tb = { class: "card-body" }, Ab = {
  key: 0,
  class: "chart-section"
}, Bb = {
  key: 1,
  class: "empty-state"
}, Lb = {
  key: 2,
  class: "comparison-section"
}, Pb = { class: "comparison-grid" }, Rb = /* @__PURE__ */ le({
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
    ], s = e, i = n, l = (g) => {
      i("export", g);
    }, { isDark: r } = Me(Se(s, "theme"));
    C(() => s.data?.total_sell_success ?? 0);
    const c = C(() => {
      const g = /* @__PURE__ */ new Set();
      for (const m of s.data?.sales_by_channel_by_day ?? [])
        for (const v of Object.keys(m.channels))
          g.add(v);
      return Array.from(g).sort();
    }), d = (g, m) => a[g.toLowerCase()] ?? o[m % o.length];
    function h(g) {
      return g.replace(/_/g, " ").toUpperCase();
    }
    function f(g) {
      if (g.delta === null) return "No previous data";
      const m = ie(g.previous), v = `${Math.abs(g.delta).toFixed(1)}%`;
      return g.delta === 0 ? `0.0% vs prev. period (${m})` : `${g.delta > 0 ? "↑" : "↓"} ${v} vs prev. period (${m})`;
    }
    const b = C(() => {
      const g = s.data?.sales_by_channel_by_day ?? [];
      if (g.length === 0) return { labels: [], datasets: [] };
      const m = g.map((p) => We(p.date).format("MMM-DD")), v = c.value.map((p, x) => ({
        label: p,
        data: g.map((_) => _.channels[p] ?? 0),
        backgroundColor: d(p, x),
        borderRadius: 4
      }));
      return { labels: m, datasets: v };
    });
    return t({ isDark: r }), (g, m) => (y(), te(Ce, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen,
      loading: s.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !s.loading ? (y(), te(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: l,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        u("div", Tb, [
          b.value.labels.length > 0 ? (y(), k("section", Ab, [
            z(St, {
              data: b.value,
              stacked: !0
            }, null, 8, ["data"])
          ])) : (y(), k("section", Bb, [...m[0] || (m[0] = [
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
          e.channelComparison.length > 0 ? (y(), k("section", Lb, [
            u("div", Pb, [
              (y(!0), k(se, null, pe(e.channelComparison, (v, p) => (y(), te(B(ye), {
                key: v.channel,
                color: d(v.channel, p),
                title: h(v.channel),
                value: B(ie)(v.current),
                subvalue: f(v)
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : V("", !0)
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), ul = /* @__PURE__ */ me(Rb, [["__scopeId", "data-v-4879d791"]]), Ib = { class: "card-body" }, Eb = {
  key: 0,
  class: "chart-section"
}, Fb = { class: "chart-wrapper" }, Ob = {
  key: 1,
  class: "empty-state"
}, Vb = { class: "seller-value-cards" }, zb = {
  key: 2,
  class: "seller-daily-section"
}, Nb = { class: "w-full min-w-0" }, Hb = { class: "sl-cell font-medium" }, jb = { class: "sl-cell text-center" }, Wb = { class: "sl-cell text-center" }, Kb = { class: "sl-cell text-center" }, Yb = { class: "sl-cell text-center" }, Ub = { class: "sl-cell text-center" }, qb = { class: "sl-cell text-center success-value" }, Xb = {
  key: 0,
  class: "currency-cell-list"
}, Gb = {
  key: 1,
  class: "empty-cell"
}, Zb = { class: "sl-cell text-center success-value" }, Qb = { class: "sl-cell text-center" }, Jb = { class: "sl-cell text-center success-value" }, ev = {
  key: 0,
  class: "currency-cell-list"
}, tv = {
  key: 1,
  class: "empty-cell"
}, nv = { class: "sl-cell text-center success-value" }, av = { class: "sl-cell text-center" }, ov = { class: "sl-cell text-center success-value" }, sv = {
  key: 0,
  class: "currency-cell-list"
}, iv = { key: 1 }, lv = {
  key: 0,
  class: "failed-reasons"
}, rv = { class: "reason-name" }, cv = { class: "reason-count" }, dv = {
  key: 1,
  class: "empty-cell"
}, uv = /* @__PURE__ */ le({
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
    const o = e, s = n, i = (A) => {
      s("export", A);
    }, { isDark: l } = Me(Se(o, "theme")), r = C(() => {
      if (!o.sellerData?.seller_by_day) return [];
      const A = [...o.sellerData.seller_by_day];
      return o.failedData?.failed_by_reason_by_day && o.failedData.failed_by_reason_by_day.forEach((L) => {
        const E = A.findIndex(
          (G) => G.date === L.date
        );
        E !== -1 ? A[E] = { ...A[E], reasons: L.reasons } : A.push({
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
        (L, E) => new Date(L.date).getTime() - new Date(E.date).getTime()
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
      () => r.value.map((A) => ({
        id: A.date,
        ...A
      }))
    ), h = C(() => o.sellerData), f = C(() => o.failedData), b = C(
      () => Array.isArray(o.sellerData.total_value_sell_success) ? o.sellerData.total_value_sell_success : []
    ), g = C(
      () => Array.isArray(o.sellerData.total_value_sell_bank_transfer) ? o.sellerData.total_value_sell_bank_transfer : []
    ), m = C(
      () => Array.isArray(o.sellerData.total_value_sell_cash_option) ? o.sellerData.total_value_sell_cash_option : []
    ), v = C(() => {
      const A = b.value;
      return A.length > 0 ? A.map(
        (L) => `${L.currency} ${Ft(L.total_value)}`
      ).join(" · ") : F(o.sellerData.total_value_sell_success);
    });
    function p(A) {
      return A.length > 0 ? A.map(
        (L) => `${L.currency} ${Ft(L.total_value)}`
      ).join(" · ") : "—";
    }
    const x = C(
      () => p(g.value)
    ), _ = C(
      () => p(m.value)
    ), w = (A) => A.replace(/_/g, " ").replace(/\b\w/g, (L) => L.toUpperCase()), $ = (A) => `Failed:
${w(A)}`, S = C(() => {
      const {
        total_seller_conversations: A = 0,
        total_sell_started: L = 0,
        total_sell_booking_created: E = 0,
        total_sell_success: G = 0,
        total_sell_bank_transfer: Q = 0,
        total_sell_cash_option: Z = 0,
        total_sell_success_bank_transfer: ae = 0,
        total_sell_success_cash: ue = 0
      } = h.value, { failed_by_reason_by_day: fe = [] } = f.value;
      if (A === 0) return { nodes: [], links: [] };
      const X = Math.max(
        0,
        G - (ae ?? 0) - (ue ?? 0)
      ), T = [
        { name: "Sell Initiated", value: A, status: "success" },
        { name: "Sell Started", value: L, status: "success" },
        { name: "Booking Created", value: E, status: "success" },
        { name: "Sell Success", value: X, status: "success" }
      ], H = [], W = A - L;
      W > 0 && (T.push({
        name: "Abandoned (Init)",
        value: W,
        status: "abandon"
      }), H.push({
        source: "Sell Initiated",
        target: "Abandoned (Init)",
        value: W,
        label: ve(W, A)
      })), L > 0 && H.push({
        source: "Sell Initiated",
        target: "Sell Started",
        value: L,
        label: ve(L, A)
      });
      const re = fe.reduce(
        (I, N) => (N.reasons && Array.isArray(N.reasons) && N.reasons.forEach((Y) => {
          const ce = Y.reason, q = Y.failed_count;
          I[ce] = (I[ce] || 0) + q;
        }), I),
        {}
      );
      E > 0 && H.push({
        source: "Sell Started",
        target: "Booking Created",
        value: E,
        label: ve(E, A)
      }), Q > 0 && (T.push({ name: "Bank Transfer", value: Q, status: "success" }), H.push({
        source: "Booking Created",
        target: "Bank Transfer",
        value: Q,
        label: ve(Q, A)
      })), Z > 0 && (T.push({ name: "Cash Option", value: Z, status: "success" }), H.push({
        source: "Booking Created",
        target: "Cash Option",
        value: Z,
        label: ve(Z, A)
      })), X > 0 && H.push({
        source: "Booking Created",
        target: "Sell Success",
        value: X,
        label: ve(X, A)
      }), (ae ?? 0) > 0 && (T.push({
        name: "Bank Transfer Success",
        value: ae ?? 0,
        status: "success"
      }), H.push({
        source: "Bank Transfer",
        target: "Bank Transfer Success",
        value: ae ?? 0,
        label: ve(ae ?? 0, A)
      })), (ue ?? 0) > 0 && (T.push({
        name: "Cash Option Success",
        value: ue ?? 0,
        status: "success"
      }), H.push({
        source: "Cash Option",
        target: "Cash Option Success",
        value: ue ?? 0,
        label: ve(ue ?? 0, A)
      }));
      const xe = E - X - Q - Z;
      xe > 0 && (T.push({
        name: "Failed at Completion",
        value: xe,
        status: "error"
      }), H.push({
        source: "Booking Created",
        target: "Failed at Completion",
        value: xe,
        label: ve(xe, A)
      }));
      const De = L - E;
      if (De > 0 && (T.push({
        name: "Failed at Booking",
        value: De,
        status: "error"
      }), H.push({
        source: "Sell Started",
        target: "Failed at Booking",
        value: De,
        label: ve(De, A)
      })), Object.keys(re).length > 0) {
        const I = Object.values(re).reduce(
          (Y, ce) => Y + ce,
          0
        ), N = De - I;
        Object.entries(re).filter(([, Y]) => Y > 0).sort(([, Y], [, ce]) => ce - Y).forEach(([Y, ce]) => {
          const q = `Failed: ${Y}`;
          T.push({
            name: q,
            value: ce,
            status: "error",
            label: $(Y)
          }), H.push({
            source: "Failed at Booking",
            target: q,
            value: ce,
            label: ve(ce, A)
          });
        }), N > 0 && (T.push({
          name: "Failed: Without Reason",
          value: N,
          status: "error",
          label: `Failed:
Without Reason`
        }), H.push({
          source: "Failed at Booking",
          target: "Failed: Without Reason",
          value: N,
          label: ve(N, A)
        }));
      }
      return { nodes: T, links: H };
    }), M = (A, L) => fn(A, L), O = (A, L) => {
      const E = ie(A), G = M(A, L);
      return `${E} (${G})`;
    }, j = (A) => A == null ? 0 : typeof A == "number" ? A : Array.isArray(A) ? A.reduce((L, E) => L + (E.total_value || 0), 0) : 0, F = (A) => Ft(j(A));
    return t({ isDark: l }), (A, L) => (y(), te(Ce, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: o.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !o.loading ? (y(), te(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        u("div", Ib, [
          S.value.nodes.length > 0 ? (y(), k("section", Eb, [
            u("div", Fb, [
              z(Xt, {
                data: S.value,
                height: "560px"
              }, null, 8, ["data"])
            ])
          ])) : (y(), k("section", Ob, [...L[0] || (L[0] = [
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
          u("section", Vb, [
            z(ye, {
              class: "seller-value-card",
              color: "var(--kiut-success)",
              title: "Total Sales Value",
              value: v.value
            }, null, 8, ["value"]),
            z(ye, {
              class: "seller-value-card",
              color: "#d97706",
              title: "Bank Transfer Value",
              value: x.value
            }, null, 8, ["value"]),
            z(ye, {
              class: "seller-value-card",
              color: "#ca8a04",
              title: "Cash Option Value",
              value: _.value
            }, null, 8, ["value"])
          ]),
          r.value && r.value.length > 0 ? (y(), k("section", zb, [
            u("div", Nb, [
              z(lt, {
                columns: c,
                rows: d.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": P(({ row: E }) => [
                  u("span", Hb, D(B(We)(String(E.date)).format("MMM DD")), 1)
                ]),
                "cell-sellInitiated": P(({ row: E }) => [
                  u("span", jb, D(B(ie)(Number(E.seller_conversations) || 0)), 1)
                ]),
                "cell-sellStarted": P(({ row: E }) => [
                  u("span", Wb, D(O(
                    E.sell_started_count,
                    E.seller_conversations || E.sell_started_count
                  )), 1)
                ]),
                "cell-getQuote": P(({ row: E }) => [
                  u("span", Kb, D(O(
                    E.sell_get_quote_count,
                    E.seller_conversations || E.sell_started_count
                  )), 1)
                ]),
                "cell-bookingCreated": P(({ row: E }) => [
                  u("span", Yb, D(O(
                    E.sell_booking_created_count,
                    E.seller_conversations || E.sell_started_count
                  )), 1)
                ]),
                "cell-bankTransfer": P(({ row: E }) => [
                  u("span", Ub, D(B(ie)(Number(E.sell_bank_transfer_count) || 0)), 1)
                ]),
                "cell-btValue": P(({ row: E }) => [
                  u("span", qb, [
                    Array.isArray(
                      E.daily_value_sell_success_bank_transfer
                    ) && E.daily_value_sell_success_bank_transfer.length > 0 ? (y(), k("div", Xb, [
                      (y(!0), k(se, null, pe(E.daily_value_sell_success_bank_transfer, (G) => (y(), k("span", {
                        key: `${E.date}-bt-success-${G.currency}`
                      }, D(G.currency) + " " + D(B(Ft)(G.total_value)), 1))), 128))
                    ])) : (y(), k("span", Gb, "-"))
                  ])
                ]),
                "cell-btSuccess": P(({ row: E }) => [
                  u("span", Zb, D(B(ie)(
                    Number(
                      E.sell_success_bank_transfer_count
                    ) || 0
                  )), 1)
                ]),
                "cell-cashOption": P(({ row: E }) => [
                  u("span", Qb, D(B(ie)(Number(E.sell_cash_option_count) || 0)), 1)
                ]),
                "cell-coValue": P(({ row: E }) => [
                  u("span", Jb, [
                    Array.isArray(
                      E.daily_value_sell_success_cash
                    ) && E.daily_value_sell_success_cash.length > 0 ? (y(), k("div", ev, [
                      (y(!0), k(se, null, pe(E.daily_value_sell_success_cash, (G) => (y(), k("span", {
                        key: `${E.date}-co-success-${G.currency}`
                      }, D(G.currency) + " " + D(B(Ft)(G.total_value)), 1))), 128))
                    ])) : (y(), k("span", tv, "-"))
                  ])
                ]),
                "cell-cashSuccess": P(({ row: E }) => [
                  u("span", nv, D(B(ie)(
                    Number(E.sell_success_cash_count) || 0
                  )), 1)
                ]),
                "cell-sellSuccess": P(({ row: E }) => [
                  u("span", av, D(O(
                    E.sell_success_count,
                    E.seller_conversations || E.sell_started_count
                  )), 1)
                ]),
                "cell-totalSalesValue": P(({ row: E }) => [
                  u("span", ov, [
                    Array.isArray(E.daily_value_sell_success) && E.daily_value_sell_success.length > 0 ? (y(), k("div", sv, [
                      (y(!0), k(se, null, pe(E.daily_value_sell_success, (G) => (y(), k("span", {
                        key: `${E.date}-${G.currency}`
                      }, D(G.currency) + " " + D(B(Ft)(G.total_value)), 1))), 128))
                    ])) : (y(), k("span", iv, D(F(
                      E.daily_value_sell_success
                    )), 1))
                  ])
                ]),
                "cell-failed": P(({ row: E }) => [
                  (E.reasons || []).length > 0 ? (y(), k("div", lv, [
                    (y(!0), k(se, null, pe(E.reasons || [], (G) => (y(), k("div", {
                      key: G.reason,
                      class: "failed-reason-item"
                    }, [
                      u("span", rv, D(G.reason) + ":", 1),
                      u("span", cv, D(G.failed_count), 1)
                    ]))), 128))
                  ])) : (y(), k("div", dv, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : V("", !0)
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), hl = /* @__PURE__ */ me(uv, [["__scopeId", "data-v-bdae6055"]]), hv = { class: "seller-container__body" }, fv = /* @__PURE__ */ le({
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
    const n = e, a = t, o = C(
      () => n.loading ? !1 : n.sellerLoading
    ), s = C(
      () => n.loading ? !1 : n.salesByChannelLoading
    ), i = C(() => n.exportLoading || n.sellerExportLoading), l = C(() => n.exportLoading || n.salesByChannelExportLoading);
    function r(c, d) {
      a("export", { source: c, format: d });
    }
    return (c, d) => (y(), te(Ce, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading
    }, {
      default: P(() => [
        u("div", hv, [
          z(hl, {
            "initially-open": e.childrenInitiallyOpen,
            "seller-data": e.sellerData,
            "failed-data": e.failedData,
            loading: o.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": i.value,
            onExport: d[0] || (d[0] = (h) => r("seller", h))
          }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading"]),
          z(ul, {
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
}), gv = /* @__PURE__ */ me(fv, [["__scopeId", "data-v-22b0304c"]]), pv = { class: "card-body" }, mv = {
  key: 0,
  class: "chart-section"
}, bv = {
  key: 1,
  class: "empty-state"
}, vv = { class: "empty-state-content" }, yv = { class: "empty-icon-wrapper" }, xv = /* @__PURE__ */ le({
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
    }, { isDark: l, colors: r } = Me(Se(o, "theme")), c = C(() => {
      const f = (o.data?.top_agents || []).filter(
        (v) => v.agent_type?.toLowerCase() !== "triage"
      );
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const b = f.reduce(
        (v, p) => v + (Number(p.conversations) || 0),
        0
      ), g = f.map((v) => {
        const p = v.agent_type?.toLowerCase();
        return a[p] || "#94a3b8";
      }), m = g.map((v) => `${v}80`);
      return {
        labels: f.map((v) => {
          const p = Number(v.conversations) || 0, x = b ? p / b * 100 : 0;
          return `${v.agent_type} - ${p.toLocaleString()} (${x.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: f.map((v) => v.conversations),
            backgroundColor: m,
            borderColor: g,
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
              const f = (h.label || "").toString().split(" - ")[0], b = Number(h.parsed) || 0, g = (h.dataset.data || []).reduce(
                (v, p) => v + (Number(p) || 0),
                0
              ), m = g ? b / g * 100 : 0;
              return `${f}: ${b.toLocaleString()} (${m.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: l }), (h, f) => (y(), te(Ce, {
      class: "top-agents-root h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !e.loading ? (y(), te(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        u("div", pv, [
          c.value.labels && c.value.labels.length ? (y(), k("section", mv, [
            z(Da, {
              data: c.value,
              options: d.value
            }, null, 8, ["data", "options"])
          ])) : (y(), k("section", bv, [
            u("div", vv, [
              u("div", yv, [
                z(B(Ep), { class: "empty-icon" })
              ]),
              f[0] || (f[0] = u("p", { class: "empty-title" }, "No top agents data", -1)),
              f[1] || (f[1] = u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), _v = /* @__PURE__ */ me(xv, [["__scopeId", "data-v-08639fed"]]), kv = { class: "card-body" }, wv = {
  key: 0,
  class: "payment-methods-section"
}, Cv = { class: "payment-methods-grid" }, $v = {
  key: 1,
  class: "empty-state"
}, Sv = { class: "empty-state-content" }, Mv = { class: "empty-icon-wrapper" }, Dv = {
  key: 2,
  class: "payment-method-daily-section"
}, Tv = { class: "w-full min-w-0" }, Av = { class: "font-medium" }, Bv = { class: "text-center" }, Lv = { class: "text-center success-value" }, Pv = {
  key: 0,
  class: "currency-cell-list"
}, Rv = { class: "payment-tags" }, Iv = { class: "tag-name" }, Ev = {
  key: 0,
  class: "tag-amount"
}, Fv = {
  key: 1,
  class: "tag-amount"
}, Ov = { class: "tag-count" }, Vv = {
  key: 3,
  class: "empty-table-state"
}, zv = "Not Registered", Nv = /* @__PURE__ */ le({
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
    const a = e, o = n, { isDark: s } = Me(Se(a, "theme")), i = oe(!1), l = oe({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), r = C(() => l.value.payment_method_breakdown && l.value.payment_method_breakdown.length > 0), c = C(() => l.value.payment_method_by_day && l.value.payment_method_by_day.length > 0), d = C(() => !l.value.payment_method_by_day || l.value.payment_method_by_day.length === 0 ? [] : [...l.value.payment_method_by_day].sort((M, O) => We(M.date).valueOf() - We(O.date).valueOf())), h = [
      { key: "date", label: "Date", align: "left" },
      { key: "totalSales", label: "Total Sales", align: "center" },
      { key: "totalAmount", label: "Total Amount", align: "center" },
      { key: "paymentMethods", label: "Payment Methods", align: "left" }
    ], f = C(
      () => d.value.map((M) => ({
        id: M.date,
        date: M.date,
        total_count: M.total_count,
        total_amount: M.total_amount,
        total_amount_by_currency: M.total_amount_by_currency,
        payment_methods: M.payment_methods
      }))
    ), b = (M) => {
      if (!M)
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
      const O = (M.payment_method_breakdown || []).map(
        (F) => ({
          payment_method: F.payment_method || "Unknown",
          total_amount: F.total_amount ?? 0,
          count: F.count ?? 0,
          total_amount_by_currency: F.total_amount_by_currency ?? []
        })
      ), j = (M.payment_method_by_day || []).map((F) => ({
        date: F.date || "",
        total_count: F.total_count ?? 0,
        total_amount: F.total_amount ?? 0,
        total_amount_by_currency: F.total_amount_by_currency ?? [],
        payment_methods: (F.payment_methods || []).map((A) => ({
          payment_method: A.payment_method || "Unknown",
          total_amount: A.total_amount ?? 0,
          count: A.count ?? 0,
          total_amount_by_currency: A.total_amount_by_currency ?? []
        }))
      }));
      return {
        airline_name: M.airline_name || a.airlineName,
        start_date: M.start_date || "",
        end_date: M.end_date || "",
        total_conversations: M.total_conversations ?? 0,
        total_amount: M.total_amount ?? 0,
        total_sell_usd: M.total_sell_usd,
        total_amount_by_currency: M.total_amount_by_currency ?? [],
        payment_method_breakdown: O,
        payment_method_by_day: j
      };
    }, g = async () => {
      if (!(!a.fetchFunction || !a.dates || a.dates.length < 2 || !a.airlineName)) {
        i.value = !0;
        try {
          const [M, O] = a.dates.map(
            (F) => We(F).format("YYYY-MM-DD")
          ), j = await a.fetchFunction(
            a.airlineName,
            M,
            O
          );
          l.value = b(j);
        } catch (M) {
          console.error("Error fetching payment method metrics:", M), l.value = b(null);
        } finally {
          i.value = !1;
        }
      }
    }, m = [
      "#10b981",
      "#3b82f6",
      "#8b5cf6",
      "#f59e0b",
      "#f43f5e",
      "#06b6d4"
    ], v = (M) => !M || M.toLowerCase() === "unknown" ? zv : M.replace(/_/g, " "), p = (M) => M == null ? "$0.00" : Le(M), x = (M) => {
      const O = M.total_amount_by_currency;
      return O && O.length > 0 ? O.map((j) => `${j.currency} ${p(j.total_value)}`).join(" · ") : p(M.total_amount);
    }, _ = (M) => M ? We(M).format("MMM DD") : "-", w = (M) => M == null || Number.isNaN(Number(M)) ? 0 : Number(M), $ = (M) => {
      o("export", M);
    };
    function S() {
      const M = a.data;
      M && (Array.isArray(M.payment_method_breakdown) && M.payment_method_breakdown.length > 0 || Array.isArray(M.payment_method_by_day) && M.payment_method_by_day.length > 0) && (i.value = !1, l.value = b(M));
    }
    return Je(() => {
      a.data ? S() : g();
    }), Fe(
      () => a.data,
      (M) => {
        M && S();
      },
      { deep: !0 }
    ), Fe(
      () => a.dates,
      (M) => {
        a.data || M && M[0] && M[1] && g();
      },
      { deep: !0 }
    ), t({ isDark: s }), (M, O) => (y(), te(Ce, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method",
      loading: i.value
    }, {
      headerExport: P(() => [
        e.enableExport && !i.value ? (y(), te(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: $,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        u("div", kv, [
          r.value ? (y(), k("section", wv, [
            O[0] || (O[0] = u("p", { class: "section-label" }, "Sales by Payment Method", -1)),
            u("div", Cv, [
              (y(!0), k(se, null, pe(l.value.payment_method_breakdown, (j, F) => (y(), te(ye, {
                key: j.payment_method,
                class: "payment-method-card-item min-w-0",
                color: m[F % m.length],
                title: v(j.payment_method),
                value: x(j),
                subvalue: `${w(j.count)} ${w(j.count) === 1 ? "sale" : "sales"}`
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : (y(), k("section", $v, [
            u("div", Sv, [
              u("div", Mv, [
                z(B(Op), { class: "empty-icon" })
              ]),
              O[1] || (O[1] = u("p", { class: "empty-title" }, "No payment data available", -1)),
              O[2] || (O[2] = u("p", { class: "empty-description" }, " No payment method data found for the selected period. Try adjusting the date range. ", -1))
            ])
          ])),
          c.value ? (y(), k("section", Dv, [
            O[4] || (O[4] = u("p", { class: "section-label" }, "Daily Breakdown", -1)),
            u("div", Tv, [
              z(lt, {
                columns: h,
                rows: f.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": P(({ row: j }) => [
                  u("span", Av, D(_(String(j.date))), 1)
                ]),
                "cell-totalSales": P(({ row: j }) => [
                  u("span", Bv, D(B(ie)(j.total_count ?? 0)), 1)
                ]),
                "cell-totalAmount": P(({ row: j }) => [
                  u("span", Lv, [
                    Array.isArray(j.total_amount_by_currency) && j.total_amount_by_currency.length > 0 ? (y(), k("div", Pv, [
                      (y(!0), k(se, null, pe(j.total_amount_by_currency, (F) => (y(), k("span", {
                        key: `${j.date}-${F.currency}`
                      }, D(F.currency) + " " + D(p(F.total_value)), 1))), 128))
                    ])) : (y(), k(se, { key: 1 }, [
                      Te(D(p(Number(j.total_amount ?? 0))), 1)
                    ], 64))
                  ])
                ]),
                "cell-paymentMethods": P(({ row: j }) => [
                  u("div", Rv, [
                    (y(!0), k(se, null, pe(Array.isArray(j.payment_methods) ? j.payment_methods : [], (F) => (y(), k("div", {
                      key: F.payment_method,
                      class: "payment-tag"
                    }, [
                      u("span", Iv, D(v(F.payment_method)), 1),
                      O[3] || (O[3] = u("span", { class: "tag-separator" }, "•", -1)),
                      !F.total_amount_by_currency || F.total_amount_by_currency.length === 0 ? (y(), k("span", Ev, D(p(F.total_amount)), 1)) : (y(), k("span", Fv, D(F.total_amount_by_currency.map(
                        (A) => `${A.currency} ${p(A.total_value)}`
                      ).join(" / ")), 1)),
                      u("span", Ov, "(" + D(w(F.count)) + ")", 1)
                    ]))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : r.value ? (y(), k("div", Vv, [...O[5] || (O[5] = [
            u("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
          ])])) : V("", !0)
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Hv = /* @__PURE__ */ me(Nv, [["__scopeId", "data-v-3358b026"]]), jv = {
  key: "title-skeleton",
  class: "header-title-group",
  "aria-hidden": "true"
}, Wv = {
  key: 0,
  class: "ut-skeleton-blink skeleton-header-label"
}, Kv = {
  key: "title-content",
  class: "header-title-group"
}, Yv = {
  class: "icon-wrapper",
  "aria-hidden": "true"
}, Uv = {
  key: 0,
  class: "metric-label metric-label--header"
}, qv = {
  key: "aside-skeleton",
  class: "ut-skeleton-blink skeleton-badge",
  "aria-hidden": "true"
}, Xv = { key: "aside-content" }, Gv = {
  key: "body-skeleton",
  class: "skeleton-body",
  "aria-busy": "true",
  "aria-label": "Loading metric"
}, Zv = {
  key: 0,
  class: "ut-skeleton-blink skeleton-label"
}, Qv = {
  key: "body-content",
  class: "highlight-inner"
}, Jv = { class: "card-body" }, ey = { class: "metric-row" }, ty = {
  key: 0,
  class: "metric-prefix"
}, ny = {
  key: 0,
  class: "metric-label"
}, ay = /* @__PURE__ */ le({
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
    const n = e, { isDark: a } = Me(Se(n, "theme")), o = C(() => n.labelPosition === "header"), s = C(
      () => n.previousValue !== null && n.previousValue !== void 0
    ), i = C(() => {
      if (!s.value) return 0;
      const c = n.previousValue;
      return c === 0 ? n.currentValue > 0 ? 100 : 0 : (n.currentValue - c) / c * 100;
    }), l = C(() => {
      const c = i.value;
      if (Number.isNaN(c)) return "-";
      const d = c.toFixed(1);
      return c > 0 ? `+${d}%` : `${d}%`;
    }), r = C(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (c, d) => (y(), te(Ce, {
      collapsible: !1,
      class: ee([
        "card-metric",
        "w-full",
        {
          "card-metric--dark": B(a),
          "card-metric--label-header": o.value
        }
      ])
    }, {
      title: P(() => [
        z(ft, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: P(() => [
            e.loading ? (y(), k("div", jv, [
              d[0] || (d[0] = u("div", { class: "ut-skeleton-blink skeleton-icon" }, null, -1)),
              o.value ? (y(), k("div", Wv)) : V("", !0)
            ])) : (y(), k("div", Kv, [
              u("div", Yv, [
                ke(c.$slots, "icon", {}, void 0, !0)
              ]),
              o.value ? (y(), k("span", Uv, D(e.label), 1)) : V("", !0)
            ]))
          ]),
          _: 3
        })
      ]),
      headerAside: P(() => [
        z(ft, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: P(() => [
            e.loading ? (y(), k("div", qv)) : (y(), k("div", Xv, [
              ke(c.$slots, "headerAside", {}, () => [
                s.value ? (y(), k("div", {
                  key: 0,
                  class: ee(["change-badge", r.value])
                }, D(l.value), 3)) : V("", !0)
              ], !0)
            ]))
          ]),
          _: 3
        })
      ]),
      default: P(() => [
        z(ft, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: P(() => [
            e.loading ? (y(), k("div", Gv, [
              d[1] || (d[1] = u("div", { class: "ut-skeleton-blink skeleton-value" }, null, -1)),
              o.value ? V("", !0) : (y(), k("div", Zv))
            ])) : (y(), k("div", Qv, [
              u("div", Jv, [
                ke(c.$slots, "value", {}, () => [
                  u("div", ey, [
                    e.prefix ? (y(), k("span", ty, D(e.prefix), 1)) : V("", !0),
                    u("span", {
                      class: ee(["metric-value", e.valueSize === "large" ? "metric-value--large" : ""])
                    }, D(e.value), 3)
                  ])
                ], !0),
                o.value ? V("", !0) : (y(), k("span", ny, D(e.label), 1))
              ])
            ]))
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), Ct = /* @__PURE__ */ me(ay, [["__scopeId", "data-v-c81268f4"]]);
function Co(e, t) {
  return y(), k("svg", {
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
function Ke() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const rt = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", mt = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", oy = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", Et = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", Mt = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", sy = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], iy = {
  key: 0,
  class: "sticky top-0 z-10 border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-2 dark:border-[color:var(--kiut-border-light)]"
}, ly = ["placeholder", "aria-label"], ry = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, cy = ["aria-selected", "onClick", "onMouseenter"], dy = {
  key: 0,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, uy = { class: "min-w-0 flex-1" }, $o = /* @__PURE__ */ le({
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
    const n = e, a = t, o = `kiut-select-${Ke()}`, s = `${o}-label`, i = `${o}-btn`, l = `${o}-listbox`, r = oe(null), c = oe(null), d = oe(null), h = oe(null), f = oe(null), b = oe(!1), g = oe(0), m = oe(""), v = oe({});
    function p() {
      const X = c.value;
      if (!X) return;
      const T = X.getBoundingClientRect();
      v.value = {
        top: `${T.bottom - 3}px`,
        left: `${T.left}px`,
        width: `${T.width}px`
      };
    }
    const x = C(() => n.options.filter((X) => !X.disabled)), _ = C(() => {
      if (!n.searchable) return x.value;
      const X = m.value.trim().toLowerCase();
      return X ? x.value.filter((T) => T.label.toLowerCase().includes(X)) : x.value;
    }), w = C(
      () => n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opción"
    ), $ = C(() => n.modelValue === null || n.modelValue === void 0 || n.modelValue === "" ? n.placeholder : n.options.find((T) => T.value === n.modelValue)?.label ?? String(n.modelValue));
    function S(X) {
      return `${String(X.value)}-${X.label}`;
    }
    function M(X) {
      return n.modelValue === X.value;
    }
    function O(X, T) {
      const H = M(X), W = g.value === T;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        H ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !H && W ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function j() {
      g.value = Math.max(
        0,
        _.value.findIndex((X) => X.value === n.modelValue)
      );
    }
    function F() {
      if (n.searchable) {
        f.value?.focus();
        return;
      }
      h.value?.focus();
    }
    function A() {
      p(), m.value = "", j(), Ne(() => F());
    }
    function L() {
      b.value = !1, m.value = "";
    }
    function E(X) {
      a("update:modelValue", X.value), L();
    }
    function G() {
      if (!n.disabled) {
        if (b.value) {
          L();
          return;
        }
        b.value = !0, A();
      }
    }
    function Q(X) {
      X.stopPropagation(), !n.disabled && G();
    }
    function Z(X) {
      if (!b.value) return;
      const T = X.target, H = r.value, W = d.value;
      H && !H.contains(T) && (!W || !W.contains(T)) && L();
    }
    function ae(X) {
      n.disabled || (X.key === "ArrowDown" || X.key === "Enter" || X.key === " ") && (X.preventDefault(), b.value || (b.value = !0, A()));
    }
    function ue(X) {
      const T = _.value;
      if (X.key === "Escape") {
        X.preventDefault(), L();
        return;
      }
      if (X.key === "ArrowDown") {
        if (X.preventDefault(), T.length === 0) return;
        g.value = 0, h.value?.focus();
        return;
      }
      if (X.key === "ArrowUp") {
        if (X.preventDefault(), T.length === 0) return;
        g.value = T.length - 1, h.value?.focus();
        return;
      }
      if (X.key === "Enter") {
        X.preventDefault();
        const H = T[g.value];
        H && E(H);
      }
    }
    function fe(X) {
      const T = _.value;
      if (X.key === "Escape") {
        X.preventDefault(), L();
        return;
      }
      if (T.length !== 0) {
        if (X.key === "ArrowDown") {
          X.preventDefault(), g.value = Math.min(g.value + 1, T.length - 1);
          return;
        }
        if (X.key === "ArrowUp") {
          if (X.preventDefault(), g.value === 0 && n.searchable) {
            f.value?.focus();
            return;
          }
          g.value = Math.max(g.value - 1, 0);
          return;
        }
        if (X.key === "Enter") {
          X.preventDefault();
          const H = T[g.value];
          H && E(H);
        }
      }
    }
    return Fe(m, () => {
      g.value = 0;
    }), Je(() => {
      document.addEventListener("click", Z);
    }), ct(() => {
      document.removeEventListener("click", Z);
    }), (X, T) => (y(), k("div", {
      ref_key: "rootRef",
      ref: r,
      class: "relative font-sans"
    }, [
      e.label ? (y(), k("label", {
        key: 0,
        id: s,
        class: ee(B(rt))
      }, D(e.label), 3)) : V("", !0),
      u("button", {
        ref_key: "buttonRef",
        ref: c,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: ee([
          B(mt),
          "flex items-center justify-between gap-2 text-left",
          b.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": b.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : w.value,
        onClick: Q,
        onKeydown: ae
      }, [
        u("span", {
          class: ee([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, D($.value), 3),
        z(B(un), {
          class: ee(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", b.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, sy),
      (y(), te(xn, { to: "body" }, [
        tt(u("div", {
          ref_key: "panelRef",
          ref: d,
          style: $e(v.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          e.searchable ? (y(), k("div", iy, [
            tt(u("input", {
              ref_key: "searchInputRef",
              ref: f,
              "onUpdate:modelValue": T[0] || (T[0] = (H) => m.value = H),
              type: "search",
              class: ee([B(mt), "min-h-0 py-1.5 text-sm"]),
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              onClick: T[1] || (T[1] = He(() => {
              }, ["stop"])),
              onKeydown: He(ue, ["stop"])
            }, null, 42, ly), [
              [sn, m.value]
            ])
          ])) : V("", !0),
          u("ul", {
            id: l,
            ref_key: "listRef",
            ref: h,
            role: "listbox",
            tabindex: "-1",
            class: "py-1",
            onKeydown: He(fe, ["stop"])
          }, [
            _.value.length === 0 ? (y(), k("li", ry, D(e.noResultsText), 1)) : V("", !0),
            (y(!0), k(se, null, pe(_.value, (H, W) => (y(), k("li", {
              key: S(H),
              role: "option",
              "aria-selected": M(H),
              class: ee(O(H, W)),
              onClick: He((re) => E(H), ["stop"]),
              onMouseenter: (re) => g.value = W
            }, [
              e.showOptionCheck ? (y(), k("span", dy, [
                M(H) ? (y(), te(B(Co), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : V("", !0)
              ])) : V("", !0),
              u("span", uy, D(H.label), 1)
            ], 42, cy))), 128))
          ], 544)
        ], 4), [
          [rn, b.value]
        ])
      ]))
    ], 512));
  }
}), hy = { class: "card-body" }, fy = { class: "kpi-closed-value" }, gy = { class: "kpi-closed-value__main" }, py = {
  key: 0,
  class: "kpi-closed-value__pct"
}, my = { class: "table-view-select flex justify-end" }, by = { class: "table-section w-full min-w-0" }, vy = { class: "cell-plain" }, yy = { class: "cell-plain" }, xy = { class: "cell-plain cell-plain--muted" }, _y = { class: "cell-plain" }, ky = { class: "cell-plain" }, wy = { class: "cell-plain" }, Cy = {
  key: 2,
  class: "empty-state"
}, $y = 6, Sy = /* @__PURE__ */ le({
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
    const a = e, o = n, s = (I) => {
      o("export", I);
    }, { isDark: i } = Me(Se(a, "theme")), l = /* @__PURE__ */ new Set(["—", "-", "–", ""]);
    function r(I) {
      const N = I?.trim() ?? "";
      return N.length > 0 && !l.has(N);
    }
    function c(I) {
      if (!r(I.agent_email)) return !1;
      const N = I.assigned_count ?? 0, Y = I.closed_count ?? 0;
      return N > 0 || Y > 0;
    }
    function d(I) {
      return I.closed_count ?? 0;
    }
    function h(I) {
      const N = I?.trim();
      return N || "—";
    }
    const f = C(
      () => (a.data?.agents_by_day ?? []).filter(c)
    ), b = C(() => f.value.length > 0), g = C(() => {
      const I = (a.data?.total_enqueued ?? 0) > 0;
      return b.value || I;
    }), m = oe("by_date"), v = [
      { value: "by_date", label: "By date" },
      { value: "aggregated", label: "Aggregated" }
    ], p = oe("date"), x = oe("desc");
    Fe(m, (I) => {
      I === "aggregated" ? (p.value = "name", x.value = "asc") : (p.value = "date", x.value = "desc");
    });
    function _(I, N) {
      return N == null ? null : N === 0 ? I > 0 ? 100 : 0 : (I - N) / N * 100;
    }
    function w(I) {
      const N = I.toFixed(1);
      return I > 0 ? `+${N}%` : `${N}%`;
    }
    function $(I, N = !1) {
      const Y = N ? -I : I;
      return Y > 0 ? "change-badge--up" : Y < 0 ? "change-badge--down" : "change-badge--neutral";
    }
    function S(I, N) {
      if (I === null) return null;
      const Y = _(I, N);
      return Y === null ? null : {
        label: w(Y),
        class: $(Y, !0)
      };
    }
    function M(I) {
      if (I == null || I === "") return null;
      if (typeof I == "number")
        return Number.isFinite(I) ? I : null;
      const N = I.trim();
      if (!N) return null;
      if (N.includes(":")) {
        const ce = N.split(":").map(Number);
        return ce.length !== 3 || ce.some(isNaN) ? null : ce[0] * 3600 + ce[1] * 60 + ce[2];
      }
      const Y = Number(N);
      return Number.isFinite(Y) ? Y : null;
    }
    function O(I) {
      const N = Math.round(I), Y = Math.floor(N / 3600), ce = Math.floor(N % 3600 / 60), q = N % 60;
      return `${String(Y).padStart(2, "0")}:${String(ce).padStart(2, "0")}:${String(q).padStart(2, "0")}`;
    }
    function j(I) {
      const N = M(I);
      return N === null ? "—" : typeof I == "string" && I.includes(":") ? I.trim() : O(N);
    }
    const F = C(() => a.data?.total_enqueued ?? 0), A = C(() => a.data?.total_closed ?? 0), L = C(
      () => a.data?.avg_time_to_assign_seconds ?? null
    ), E = C(
      () => a.data?.avg_conversation_duration_seconds ?? null
    ), G = C(() => F.value <= 0 ? null : `(${(A.value / F.value * 100).toFixed(1)}%)`), Q = C(
      () => S(
        M(L.value),
        a.previousAvgTimeToAssignSeconds
      )
    ), Z = C(
      () => S(
        M(E.value),
        a.previousAvgConversationDurationSeconds
      )
    );
    function ae(I, N) {
      return {
        id: `${I.date}-${I.agent_email}-${N}`,
        date: I.date,
        dateSort: new Date(I.date).getTime(),
        agent_name: I.agent_name ?? "",
        agent_email: I.agent_email,
        handled: d(I),
        avg_assignation_seconds: M(I.avg_time_to_assign_seconds),
        avg_resolution_seconds: M(I.avg_conversation_duration_seconds),
        avg_assignation_display: j(I.avg_time_to_assign_seconds),
        avg_resolution_display: j(I.avg_conversation_duration_seconds)
      };
    }
    function ue(I) {
      const N = /* @__PURE__ */ new Map();
      for (const Y of I) {
        if (!c(Y)) continue;
        const ce = Y.agent_email.trim();
        N.has(ce) || N.set(ce, {
          agent_name: Y.agent_name?.trim() ?? "",
          agent_email: ce,
          handled: 0,
          assignSum: 0,
          assignWeight: 0,
          resolutionSum: 0,
          resolutionWeight: 0
        });
        const q = N.get(ce), K = Y.assigned_count ?? 0, J = Y.closed_count ?? 0;
        q.handled += d(Y), Y.agent_name?.trim() && (q.agent_name = Y.agent_name.trim());
        const de = M(Y.avg_time_to_assign_seconds);
        de !== null && K > 0 && (q.assignSum += de * K, q.assignWeight += K);
        const ge = M(Y.avg_conversation_duration_seconds);
        ge !== null && J > 0 && (q.resolutionSum += ge * J, q.resolutionWeight += J);
      }
      return Array.from(N.values()).map((Y, ce) => {
        const q = Y.assignWeight > 0 ? Y.assignSum / Y.assignWeight : null, K = Y.resolutionWeight > 0 ? Y.resolutionSum / Y.resolutionWeight : null;
        return {
          id: `agg-${Y.agent_email}-${ce}`,
          agent_name: Y.agent_name,
          agent_email: Y.agent_email,
          handled: Y.handled,
          avg_assignation_seconds: q,
          avg_resolution_seconds: K,
          avg_assignation_display: q !== null ? O(q) : "—",
          avg_resolution_display: K !== null ? O(K) : "—"
        };
      });
    }
    const fe = C(() => {
      const I = f.value;
      return m.value === "aggregated" ? ue(I) : I.map(ae);
    });
    function X(I, N, Y, ce) {
      const q = ce === "asc" ? 1 : -1;
      let K = 0;
      switch (Y) {
        case "date":
          K = (I.dateSort ?? 0) - (N.dateSort ?? 0);
          break;
        case "name":
          K = (I.agent_name || "").localeCompare(N.agent_name || "", void 0, {
            sensitivity: "base"
          });
          break;
        case "email":
          K = I.agent_email.localeCompare(N.agent_email, void 0, {
            sensitivity: "base"
          });
          break;
        case "handled":
          K = I.handled - N.handled;
          break;
        case "avgAssignation":
          K = (I.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY) - (N.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY);
          break;
        case "avgResolution":
          K = (I.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY) - (N.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY);
          break;
      }
      if (K !== 0) return K * q;
      if (m.value === "by_date" && Y !== "date") {
        const J = (N.dateSort ?? 0) - (I.dateSort ?? 0);
        if (J !== 0) return J;
      }
      return (I.agent_name || "").localeCompare(N.agent_name || "", void 0, {
        sensitivity: "base"
      });
    }
    const T = C(() => {
      const I = [...fe.value];
      return I.sort((N, Y) => X(N, Y, p.value, x.value)), I;
    }), H = C(
      () => T.value
    ), W = C(() => {
      const I = [];
      return m.value === "by_date" && I.push({
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
    function re(I) {
      const N = I;
      if (p.value === N) {
        x.value = x.value === "asc" ? "desc" : "asc";
        return;
      }
      p.value = N, N === "date" ? x.value = "desc" : N === "name" || N === "email" ? x.value = "asc" : x.value = "desc";
    }
    const xe = (I) => I == null ? "0" : ie(I), De = (I) => new Date(I).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    return t({ isDark: i }), (I, N) => (y(), te(Ce, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent",
      loading: e.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !e.loading ? (y(), te(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        u("div", hy, [
          g.value ? (y(), k("div", {
            key: 0,
            class: ee(["grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4", { "agent-human-conv--dark": B(i) }])
          }, [
            z(Ct, {
              label: "Conversations Opened",
              "label-position": "header",
              value: xe(F.value),
              theme: e.theme,
              "current-value": F.value,
              "previous-value": e.previousTotalEnqueued
            }, {
              icon: P(() => [...N[1] || (N[1] = [
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
            z(Ct, {
              label: "Conversations Closed",
              "label-position": "header",
              value: xe(A.value),
              theme: e.theme,
              "current-value": A.value,
              "previous-value": e.previousTotalClosed
            }, {
              icon: P(() => [...N[2] || (N[2] = [
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
              value: P(() => [
                u("div", fy, [
                  u("span", gy, D(xe(A.value)), 1),
                  G.value ? (y(), k("span", py, D(G.value), 1)) : V("", !0)
                ])
              ]),
              _: 1
            }, 8, ["value", "theme", "current-value", "previous-value"]),
            z(Ct, {
              label: "Avg Time to Assign",
              "label-position": "header",
              value: j(L.value),
              theme: e.theme,
              "current-value": M(L.value) ?? 0,
              "previous-value": e.previousAvgTimeToAssignSeconds
            }, Do({
              icon: P(() => [
                N[3] || (N[3] = u("svg", {
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
              Q.value ? {
                name: "headerAside",
                fn: P(() => [
                  u("div", {
                    class: ee(["duration-trend-badge", Q.value.class])
                  }, D(Q.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"]),
            z(Ct, {
              label: "Avg Resolution Time",
              "label-position": "header",
              value: j(E.value),
              theme: e.theme,
              "current-value": M(E.value) ?? 0,
              "previous-value": e.previousAvgConversationDurationSeconds
            }, Do({
              icon: P(() => [
                N[4] || (N[4] = u("svg", {
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
              Z.value ? {
                name: "headerAside",
                fn: P(() => [
                  u("div", {
                    class: ee(["duration-trend-badge", Z.value.class])
                  }, D(Z.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"])
          ], 2)) : V("", !0),
          b.value ? (y(), te(Ce, {
            key: 1,
            class: "agent-table-section mt-6",
            title: "Conversations Managed by Agent",
            subtitle: "Daily performance per human agent",
            collapsible: !1
          }, {
            headerAside: P(() => [
              u("div", my, [
                z($o, {
                  modelValue: m.value,
                  "onUpdate:modelValue": N[0] || (N[0] = (Y) => m.value = Y),
                  options: v,
                  "aria-label-trigger": "Table view mode",
                  "show-option-check": !1
                }, null, 8, ["modelValue"])
              ])
            ]),
            default: P(() => [
              u("div", by, [
                (y(), te(lt, {
                  key: `${m.value}-${p.value}-${x.value}`,
                  columns: W.value,
                  rows: H.value,
                  "sort-key": p.value,
                  "sort-direction": x.value,
                  "max-visible-rows": $y,
                  "row-key": "id",
                  onSort: re
                }, {
                  "cell-date": P(({ row: Y }) => [
                    u("span", vy, D(De(String(Y.date))), 1)
                  ]),
                  "cell-name": P(({ row: Y }) => [
                    u("span", yy, D(h(Y.agent_name)), 1)
                  ]),
                  "cell-email": P(({ row: Y }) => [
                    u("span", xy, D(Y.agent_email), 1)
                  ]),
                  "cell-handled": P(({ row: Y }) => [
                    u("span", _y, D(xe(Number(Y.handled))), 1)
                  ]),
                  "cell-avgAssignation": P(({ row: Y }) => [
                    u("span", ky, D(Y.avg_assignation_display), 1)
                  ]),
                  "cell-avgResolution": P(({ row: Y }) => [
                    u("span", wy, D(Y.avg_resolution_display), 1)
                  ]),
                  _: 1
                }, 8, ["columns", "rows", "sort-key", "sort-direction"]))
              ])
            ]),
            _: 1
          })) : g.value ? V("", !0) : (y(), k("div", Cy, [...N[5] || (N[5] = [
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
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), My = /* @__PURE__ */ me(Sy, [["__scopeId", "data-v-451f9361"]]), Dy = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Ty = { class: "w-full shrink-0 flex min-h-0 flex-col" }, Ay = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, By = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Ly = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Py = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Ry = { class: "max-w-[360px] px-4 text-center" }, Iy = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Js = 5, Ey = /* @__PURE__ */ le({
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
    const a = e, o = n, s = (m) => {
      o("export", m);
    }, i = Se(a, "theme"), { isDark: l } = Me(i), r = {
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
      const m = d.value.total_by_channel || {}, v = Object.values(m).reduce(
        (p, x) => p + x,
        0
      );
      return v === 0 ? [] : Object.entries(m).sort(([, p], [, x]) => x - p).map(([p, x]) => ({
        name: p,
        label: p.toUpperCase(),
        total: x,
        percentage: (x / v * 100).toFixed(1),
        color: r[p.toLowerCase()] || "#9ca3af"
      }));
    }), f = C(
      () => h.value.slice(0, Js)
    ), b = C(() => {
      const m = Math.min(f.value.length, Js);
      if (!(m <= 0))
        return { gridTemplateColumns: `repeat(${m}, minmax(0, 1fr))` };
    }), g = (m) => {
      if (!m || !m.channels_by_day) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const v = m.channels_by_day, p = Object.keys(v).sort();
      if (p.length === 0) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const x = /* @__PURE__ */ new Set();
      for (const $ of Object.values(v))
        for (const S of Object.keys($))
          x.add(S);
      const w = Array.from(x).map(($) => {
        const S = $.toLowerCase(), M = r[S] || "#9ca3af";
        return {
          label: $.toUpperCase(),
          data: p.map((O) => v[O]?.[$] || 0),
          borderColor: M
        };
      });
      c.value = {
        labels: p.map(($) => We($).format("MMM DD")),
        datasets: w
      };
    };
    return Fe(
      () => a.data,
      (m) => {
        g(m ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: l }), (m, v) => (y(), te(Ce, {
      class: "w-full min-h-0 self-start",
      title: "Conversations by Channel",
      subtitle: "Conversations sent by AI agents",
      collapsible: !1,
      loading: a.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !a.loading ? (y(), te(B(Oe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        u("div", Dy, [
          u("div", Ty, [
            c.value.labels && c.value.labels.length ? (y(), k("section", Ay, [
              u("div", By, [
                z(vt, {
                  data: c.value,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              f.value.length ? (y(), k("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: $e(b.value)
              }, [
                (y(!0), k(se, null, pe(f.value, (p) => (y(), te(ye, {
                  key: p.name,
                  class: "min-w-0",
                  color: p.color,
                  title: p.label,
                  value: `${p.percentage}%`,
                  subvalue: `${B(ie)(p.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : V("", !0)
            ])) : h.value.length ? (y(), k("section", Ly, [
              u("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: $e(b.value)
              }, [
                (y(!0), k(se, null, pe(f.value, (p) => (y(), te(ye, {
                  key: p.name,
                  class: "min-w-0",
                  color: p.color,
                  title: p.label,
                  value: `${p.percentage}%`,
                  subvalue: `${B(ie)(p.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : V("", !0),
            h.value.length ? V("", !0) : (y(), k("section", Py, [
              u("div", Ry, [
                u("div", Iy, [
                  z(B(nt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                v[0] || (v[0] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No channel metrics data available ", -1)),
                v[1] || (v[1] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No channel data found for the selected period. Try adjusting the date range. ", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Fy = /* @__PURE__ */ me(Ey, [["__scopeId", "data-v-d3f89004"]]), Oy = { class: "card-body" }, Vy = { class: "chart-container" }, zy = { class: "triage-table-block w-full min-w-0" }, Ny = { class: "triage-row-label" }, Hy = {
  key: 1,
  class: "triage-count"
}, jy = {
  key: 1,
  class: "triage-count"
}, Wy = {
  key: 1,
  class: "triage-count"
}, Ky = {
  key: 1,
  class: "triage-count"
}, Yy = {
  key: 1,
  class: "triage-count"
}, Uy = {
  key: 1,
  class: "empty-state"
}, qy = { class: "empty-state-content" }, Xy = { class: "empty-icon-wrapper" }, Gy = /* @__PURE__ */ le({
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
    }, { isDark: i, colors: l } = Me(
      Se(a, "theme")
    ), r = C(() => {
      const _ = a.data?.combinations || {}, w = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [$, S] of Object.entries(_)) {
        const M = $.split("+").filter(Boolean);
        if (!M.includes("triage")) continue;
        const O = M.filter((j) => j !== "triage").length;
        O >= 4 ? w["4p"] += Number(S) || 0 : w[O] += Number(S) || 0;
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
    }), f = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], b = C(() => {
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
    }, m = (_) => _?.replace("80", "") || "#888888", v = C(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [h.value.pct0],
          backgroundColor: g.c0,
          borderColor: m(g.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [h.value.pct1],
          backgroundColor: g.c1,
          borderColor: m(g.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [h.value.pct2],
          backgroundColor: g.c2,
          borderColor: m(g.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [h.value.pct3],
          backgroundColor: g.c3,
          borderColor: m(g.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [h.value.pct4p],
          backgroundColor: g.c4p,
          borderColor: m(g.c4p),
          borderWidth: 1
        }
      ]
    })), p = C(() => ({
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
    return t({ isDark: i }), (_, w) => (y(), te(Ce, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !e.loading ? (y(), te(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        u("div", Oy, [
          d.value ? (y(), k(se, { key: 0 }, [
            u("div", Vy, [
              z(St, {
                data: v.value,
                options: p.value
              }, null, 8, ["data", "options"])
            ]),
            z(ye, {
              class: "w-full min-w-0",
              title: "Total",
              value: B(ie)(c.value),
              subvalue: "Conversations with triage"
            }, null, 8, ["value"]),
            u("div", zy, [
              z(lt, {
                columns: f,
                rows: b.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-metric": P(({ row: $ }) => [
                  u("span", Ny, D($.metric), 1)
                ]),
                "cell-b0": P(({ row: $ }) => [
                  $.id === "pct" ? (y(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: $e({ color: m(g.c0) })
                  }, D(x(Number($.b0))) + "%", 5)) : (y(), k("span", Hy, D(B(ie)(Number($.b0))), 1))
                ]),
                "cell-b1": P(({ row: $ }) => [
                  $.id === "pct" ? (y(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: $e({ color: m(g.c1) })
                  }, D(x(Number($.b1))) + "%", 5)) : (y(), k("span", jy, D(B(ie)(Number($.b1))), 1))
                ]),
                "cell-b2": P(({ row: $ }) => [
                  $.id === "pct" ? (y(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: $e({ color: m(g.c2) })
                  }, D(x(Number($.b2))) + "%", 5)) : (y(), k("span", Wy, D(B(ie)(Number($.b2))), 1))
                ]),
                "cell-b3": P(({ row: $ }) => [
                  $.id === "pct" ? (y(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: $e({ color: m(g.c3) })
                  }, D(x(Number($.b3))) + "%", 5)) : (y(), k("span", Ky, D(B(ie)(Number($.b3))), 1))
                ]),
                "cell-b4p": P(({ row: $ }) => [
                  $.id === "pct" ? (y(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: $e({ color: m(g.c4p) })
                  }, D(x(Number($.b4p))) + "%", 5)) : (y(), k("span", Yy, D(B(ie)(Number($.b4p))), 1))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ], 64)) : (y(), k("div", Uy, [
            u("div", qy, [
              u("div", Xy, [
                z(B(nt), { class: "empty-icon" })
              ]),
              w[0] || (w[0] = u("p", { class: "empty-title" }, "No triage combinations data", -1)),
              w[1] || (w[1] = u("p", { class: "empty-description" }, " No intent distribution data found for the selected period. Try adjusting the date range. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Zy = /* @__PURE__ */ me(Gy, [["__scopeId", "data-v-be7d2c0c"]]), Qy = { class: "card-body" }, Jy = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-3 min-h-0"
}, e1 = { class: "pie-section" }, t1 = {
  key: 1,
  class: "empty-state"
}, n1 = /* @__PURE__ */ le({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = Me(Se(n, "theme")), s = [
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
    }, l = (b) => i[b]?.label || b.toUpperCase(), r = C(
      () => n.data?.items && n.data.items.length > 0
    ), c = C(
      () => (n.data?.items || []).reduce((b, g) => b + g.count, 0)
    ), d = C(() => {
      const b = {};
      for (const g of n.data?.items || [])
        b[g.language] = (b[g.language] || 0) + g.count;
      return Object.entries(b).map(([g, m]) => ({ language: g, count: m })).sort((g, m) => m.count - g.count);
    }), h = C(() => ({
      labels: d.value.map((b) => l(b.language)),
      datasets: [
        {
          data: d.value.map((b) => b.count),
          backgroundColor: d.value.map(
            (b, g) => s[g % s.length] + "80"
          ),
          borderColor: d.value.map(
            (b, g) => s[g % s.length]
          ),
          borderWidth: 2,
          hoverOffset: 6
        }
      ]
    })), f = C(() => ({
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
            label: (b) => {
              const g = b.raw || 0, m = c.value > 0 ? (g / c.value * 100).toFixed(1) : "0";
              return ` ${b.label}: ${g} (${m}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: a }), (b, g) => (y(), te(Ce, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1,
      loading: n.loading
    }, {
      default: P(() => [
        u("div", Qy, [
          r.value ? (y(), k("div", Jy, [
            u("section", e1, [
              z(Da, {
                data: h.value,
                options: f.value
              }, null, 8, ["data", "options"])
            ]),
            z(ye, {
              class: "shrink-0",
              title: "Total",
              value: B(ie)(c.value),
              color: "#8b5cf6"
            }, null, 8, ["value"])
          ])) : (y(), k("section", t1, [...g[0] || (g[0] = [
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
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), a1 = /* @__PURE__ */ me(n1, [["__scopeId", "data-v-9385c088"]]), o1 = { class: "card-body" }, s1 = {
  key: 0,
  class: "guardrails-daily-section"
}, i1 = { class: "w-full min-w-0" }, l1 = { class: "font-medium" }, r1 = { class: "font-semibold" }, c1 = { class: "type-badges-row" }, d1 = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, u1 = {
  key: 1,
  class: "empty-state"
}, h1 = /* @__PURE__ */ le({
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
    const a = e, o = n, s = (v) => {
      o("export", v);
    }, { isDark: i } = Me(Se(a, "theme")), l = C(
      () => a.data?.items && a.data.items.length > 0
    ), r = C(
      () => (a.data?.items || []).reduce((v, p) => v + p.count, 0)
    ), c = (v) => {
      const p = {};
      for (const w of a.data?.items || [])
        p[w[v]] = (p[w[v]] || 0) + w.count;
      const x = Object.entries(p).sort((w, $) => $[1] - w[1]);
      if (x.length === 0) return { name: "—", pct: 0 };
      const _ = r.value;
      return {
        name: x[0][0],
        pct: _ > 0 ? Math.round(x[0][1] / _ * 100) : 0
      };
    }, d = C(() => c("guardrail_type")), h = C(() => c("guardrail_action")), f = C(() => c("guardrail_source")), b = C(() => {
      const v = {};
      for (const p of a.data?.items || [])
        v[p.date] || (v[p.date] = {}), v[p.date][p.guardrail_type] = (v[p.date][p.guardrail_type] || 0) + p.count;
      return Object.entries(v).map(([p, x]) => ({
        date: p,
        total: Object.values(x).reduce((_, w) => _ + w, 0),
        types: Object.entries(x).map(([_, w]) => ({ type: _, count: w })).sort((_, w) => w.count - _.count)
      })).sort((p, x) => new Date(p.date).getTime() - new Date(x.date).getTime());
    }), g = [
      { key: "date", label: "Date", align: "center" },
      { key: "count", label: "Count", align: "center" },
      { key: "types", label: "Types", align: "left" }
    ], m = C(
      () => b.value.map((v) => ({
        id: v.date,
        date: v.date,
        total: v.total,
        types: v.types
      }))
    );
    return t({ isDark: i }), (v, p) => (y(), te(Ce, {
      class: "guardrails-root h-full min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !a.loading ? (y(), te(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        u("div", o1, [
          l.value ? (y(), k(se, { key: 0 }, [
            b.value.length > 0 ? (y(), k("section", s1, [
              u("div", i1, [
                z(lt, {
                  columns: g,
                  rows: m.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-date": P(({ row: x }) => [
                    u("span", l1, D(B(We)(String(x.date)).format("MMM DD")), 1)
                  ]),
                  "cell-count": P(({ row: x }) => [
                    u("span", r1, D(B(ie)(x.total)), 1)
                  ]),
                  "cell-types": P(({ row: x }) => [
                    u("div", c1, [
                      (y(!0), k(se, null, pe(x.types, (_) => (y(), k("span", {
                        key: _.type,
                        class: "type-count-badge"
                      }, D(_.type) + " (" + D(_.count) + ") ", 1))), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : V("", !0),
            u("section", d1, [
              z(ye, {
                title: "Total Events",
                value: B(ie)(r.value)
              }, null, 8, ["value"]),
              z(ye, {
                title: "Top type",
                value: d.value.name,
                subvalue: d.value.pct > 0 ? `(${d.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              z(ye, {
                title: "Top action",
                value: h.value.name,
                subvalue: h.value.pct > 0 ? `(${h.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              z(ye, {
                title: "Top source",
                value: f.value.name,
                subvalue: f.value.pct > 0 ? `(${f.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"])
            ])
          ], 64)) : (y(), k("section", u1, [...p[0] || (p[0] = [
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
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), f1 = /* @__PURE__ */ me(h1, [["__scopeId", "data-v-c042ede0"]]), g1 = { class: "card-body" }, p1 = { class: "chart-section" }, m1 = { class: "chart-wrapper" }, b1 = {
  key: 1,
  class: "empty-chart"
}, v1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, y1 = {
  key: 0,
  class: "dn-failure-section"
}, x1 = { class: "w-full min-w-0" }, _1 = { class: "failure-reason" }, k1 = { class: "failure-count" }, w1 = { class: "impact-bar-container" }, C1 = { class: "impact-label" }, $1 = { class: "dn-trend-health-block flex flex-col gap-0" }, S1 = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, M1 = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, D1 = { class: "system-health" }, T1 = { class: "system-health-content" }, A1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, B1 = {
  key: 1,
  class: "empty-state"
}, L1 = /* @__PURE__ */ le({
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
    const a = e, o = n, s = ($) => {
      o("export", $);
    }, { isDark: i, colors: l } = Me(Se(a, "theme")), r = C(() => {
      const $ = a.data?.documentCounts?.items || [], S = a.data?.processingCounts?.items || [];
      return $.length > 0 || S.length > 0;
    }), c = C(() => {
      const $ = a.data?.documentCounts?.items || [];
      return {
        processing_started: $.reduce((S, M) => S + M.processing_started, 0),
        processing_completed: $.reduce((S, M) => S + M.processing_completed, 0),
        processing_failed: $.reduce((S, M) => S + M.processing_failed, 0),
        row_count_total: $.reduce((S, M) => S + M.row_count_total, 0)
      };
    }), d = C(() => {
      const $ = a.data?.processingCounts?.items || [];
      return {
        processing_started: $.reduce((S, M) => S + M.processing_started, 0),
        processing_success: $.reduce((S, M) => S + M.processing_success, 0),
        notification_sent: $.reduce((S, M) => S + M.notification_sent, 0),
        notification_failed: $.reduce((S, M) => S + M.notification_failed, 0),
        dq_phone: $.reduce((S, M) => S + M.dq_error_phone_not_found, 0),
        dq_flight: $.reduce((S, M) => S + M.dq_error_flight_not_found, 0),
        dq_booking: $.reduce((S, M) => S + M.dq_error_booking_not_found, 0),
        dq_other: $.reduce((S, M) => S + M.dq_error_other, 0),
        totalDqErrors: $.reduce(
          (S, M) => S + M.dq_error_phone_not_found + M.dq_error_flight_not_found + M.dq_error_booking_not_found + M.dq_error_other,
          0
        )
      };
    }), h = C(
      () => c.value.row_count_total || d.value.processing_started
    ), f = C(
      () => Math.max(0, h.value - d.value.notification_sent)
    ), b = ($, S) => S ? `${Math.round($ / S * 100)}%` : "0%", g = C(() => {
      const $ = [
        { reason: "Booking not found", count: d.value.dq_booking },
        { reason: "Phone not found", count: d.value.dq_phone },
        { reason: "Flight not found", count: d.value.dq_flight },
        {
          reason: "Notification failed",
          count: d.value.notification_failed
        },
        { reason: "Other", count: d.value.dq_other }
      ].filter((S) => S.count > 0).sort((S, M) => M.count - S.count);
      return $.length > 0 ? $[0] : { reason: "None", count: 0 };
    }), m = C(() => {
      const $ = h.value;
      return [
        { reason: "Booking not found", count: d.value.dq_booking },
        { reason: "Flight not found", count: d.value.dq_flight },
        { reason: "Phone not found", count: d.value.dq_phone },
        {
          reason: "Notification failed",
          count: d.value.notification_failed
        },
        { reason: "Other", count: d.value.dq_other }
      ].map((S) => ({
        ...S,
        impactPct: $ > 0 ? Math.round(S.count / $ * 100) : 0
      }));
    }), v = [
      { key: "reason", label: "Reason", align: "left" },
      { key: "count", label: "Count", align: "center" },
      { key: "impact", label: "Impact", align: "center" }
    ], p = C(
      () => m.value.map(($) => ({
        id: $.reason,
        reason: $.reason,
        count: $.count,
        impactPct: $.impactPct
      }))
    ), x = C(() => {
      const $ = h.value, S = d.value.processing_success, M = Math.max(0, S - d.value.totalDqErrors), O = d.value.notification_sent, j = Math.max(0, $ - S), F = d.value.totalDqErrors, A = Math.max(0, M - O), L = (Q, Z) => ve(Q, Z), E = [
        { name: "Records Detected", status: "success" },
        { name: "Valid Reservations", status: "success" },
        { name: "Invalid / Unprocessed", status: "error" },
        { name: "Contactable", status: "success" },
        { name: "Data Quality Issues", status: "error" },
        { name: "Notified", status: "success" },
        { name: "Not Delivered", status: "abandon" }
      ], G = [];
      return S > 0 && G.push({
        source: "Records Detected",
        target: "Valid Reservations",
        value: S,
        label: L(S, $)
      }), j > 0 && G.push({
        source: "Records Detected",
        target: "Invalid / Unprocessed",
        value: j,
        label: L(j, $)
      }), M > 0 && G.push({
        source: "Valid Reservations",
        target: "Contactable",
        value: M,
        label: L(M, $)
      }), F > 0 && G.push({
        source: "Valid Reservations",
        target: "Data Quality Issues",
        value: F,
        label: L(F, $)
      }), O > 0 && G.push({
        source: "Contactable",
        target: "Notified",
        value: O,
        label: L(O, $)
      }), A > 0 && G.push({
        source: "Contactable",
        target: "Not Delivered",
        value: A,
        label: L(A, $)
      }), { nodes: E, links: G };
    }), _ = C(() => {
      const $ = [...a.data?.processingCounts?.items || []].sort(
        (L, E) => new Date(L.date).getTime() - new Date(E.date).getTime()
      ), S = a.data?.documentCounts?.items || [], M = {};
      for (const L of S)
        M[L.date] = (M[L.date] || 0) + L.row_count_total;
      const O = [
        .../* @__PURE__ */ new Set([
          ...$.map((L) => L.date),
          ...S.map((L) => L.date)
        ])
      ].sort(), j = O.map((L) => We(L).format("MMM DD")), F = O.map((L) => {
        const E = $.find((Z) => Z.date === L), G = E?.notification_sent || 0, Q = M[L] || E?.processing_started || 0;
        return Q > 0 ? Math.round(G / Q * 100) : 0;
      }), A = O.map((L) => $.find((G) => G.date === L)?.notification_sent || 0);
      return {
        labels: j,
        datasets: [
          {
            label: "Success Rate (%)",
            data: F,
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
    }), w = C(() => ({
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
            label: ($) => $.datasetIndex === 0 ? ` Success Rate: ${$.raw}%` : ` Notifications: ${$.raw}`
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
            callback: ($) => `${$}%`
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
    return t({ isDark: i }), ($, S) => (y(), te(Ce, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis",
      loading: e.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !a.loading ? (y(), te(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        u("div", g1, [
          r.value ? (y(), k(se, { key: 0 }, [
            u("section", p1, [
              S[1] || (S[1] = u("div", { class: "chart-header" }, [
                u("h4", { class: "section-title" }, "Passenger Disruption Funnel")
              ], -1)),
              u("div", m1, [
                x.value.nodes.length > 0 && x.value.links.length > 0 ? (y(), te(Xt, {
                  key: 0,
                  data: x.value,
                  height: "350px",
                  "use-gradient": !1,
                  "node-gap": 24
                }, null, 8, ["data"])) : (y(), k("div", b1, [...S[0] || (S[0] = [
                  u("p", { class: "empty-chart-text" }, " No processing data available for visualization ", -1)
                ])]))
              ])
            ]),
            u("div", v1, [
              z(ye, {
                color: "#3b82f6",
                title: "Total Records",
                value: B(ie)(c.value.row_count_total)
              }, null, 8, ["value"]),
              z(ye, {
                color: "#8b5cf6",
                title: "Passengers Affected",
                value: B(ie)(h.value)
              }, null, 8, ["value"]),
              z(ye, {
                color: "#10b981",
                title: "Successfully Notified",
                value: B(ie)(d.value.notification_sent),
                subvalue: b(d.value.notification_sent, h.value)
              }, null, 8, ["value", "subvalue"]),
              z(ye, {
                color: "#ef4444",
                title: "Not Notified",
                value: B(ie)(f.value),
                subvalue: b(f.value, h.value)
              }, null, 8, ["value", "subvalue"]),
              z(ye, {
                color: "#f59e0b",
                title: "Main Failure Reason",
                value: g.value.reason,
                subvalue: g.value.count > 0 ? `${B(ie)(g.value.count)} cases` : void 0
              }, null, 8, ["value", "subvalue"])
            ]),
            m.value.length > 0 ? (y(), k("section", y1, [
              S[2] || (S[2] = u("div", { class: "section-header" }, [
                u("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
              ], -1)),
              u("div", x1, [
                z(lt, {
                  columns: v,
                  rows: p.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-reason": P(({ row: M }) => [
                    u("span", _1, D(M.reason), 1)
                  ]),
                  "cell-count": P(({ row: M }) => [
                    u("span", k1, D(B(ie)(M.count)), 1)
                  ]),
                  "cell-impact": P(({ row: M }) => [
                    u("div", w1, [
                      u("div", {
                        class: "impact-bar",
                        style: $e({ width: M.impactPct + "%" })
                      }, null, 4),
                      u("span", C1, D(M.impactPct) + "%", 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : V("", !0),
            u("div", $1, [
              _.value.labels.length > 0 ? (y(), k("section", S1, [
                S[3] || (S[3] = u("div", { class: "chart-header" }, [
                  u("h4", { class: "section-title" }, "Notification Success Rate by Day")
                ], -1)),
                u("div", M1, [
                  z(vt, {
                    data: _.value,
                    options: w.value,
                    theme: a.theme
                  }, null, 8, ["data", "options", "theme"])
                ])
              ])) : V("", !0),
              u("details", D1, [
                S[4] || (S[4] = u("summary", { class: "system-health-toggle" }, [
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
                  Te(" System Health Details ")
                ], -1)),
                u("div", T1, [
                  u("div", A1, [
                    z(ye, {
                      title: "Docs Started",
                      value: B(ie)(c.value.processing_started)
                    }, null, 8, ["value"]),
                    z(ye, {
                      title: "Docs Completed",
                      value: B(ie)(c.value.processing_completed)
                    }, null, 8, ["value"]),
                    z(ye, {
                      title: "Docs Failed",
                      value: B(ie)(c.value.processing_failed)
                    }, null, 8, ["value"]),
                    z(ye, {
                      title: "Processing Started",
                      value: B(ie)(d.value.processing_started)
                    }, null, 8, ["value"]),
                    z(ye, {
                      title: "Processing Success",
                      value: B(ie)(d.value.processing_success)
                    }, null, 8, ["value"]),
                    z(ye, {
                      title: "Notification Failed",
                      value: B(ie)(d.value.notification_failed)
                    }, null, 8, ["value"])
                  ])
                ])
              ])
            ])
          ], 64)) : (y(), k("section", B1, [...S[5] || (S[5] = [
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
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), P1 = /* @__PURE__ */ me(L1, [["__scopeId", "data-v-6598fb25"]]), R1 = /* @__PURE__ */ le({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = oe(null), o = C(() => ie(n.totalConversations)), s = C(() => B(a.value?.isDark) ?? !1), i = C(() => B(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (y(), te(Ct, {
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
}), I1 = /* @__PURE__ */ le({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = oe(null), o = C(() => `${n.csatP95.toFixed(1)}`), s = C(() => B(a.value?.isDark) ?? !1), i = C(() => B(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (y(), te(Ct, {
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
}), E1 = /* @__PURE__ */ le({
  __name: "CsatPulseCard",
  props: {
    csatPulse: { default: 0 },
    previousCsatPulse: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = oe(null), o = C(() => `${n.csatPulse.toFixed(1)}%`), s = C(() => B(a.value?.isDark) ?? !1), i = C(() => B(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (y(), te(Ct, {
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
}), F1 = {
  key: 0,
  class: "card-body"
}, O1 = { class: "chart-wrapper" }, V1 = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, z1 = {
  key: 1,
  class: "empty-state"
}, N1 = 520, H1 = 300, j1 = 40, W1 = 48, K1 = 48, Y1 = {
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
    const a = n, o = (r) => {
      a("export", r);
    }, s = e, { isDark: i } = Me(Se(s, "theme")), l = C(() => s.data);
    return t({ isDark: i }), (r, c) => (y(), te(Ce, {
      class: "nps-overview-root min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1,
      loading: s.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !s.loading ? (y(), te(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        l.value && l.value.total_nps_responses > 0 ? (y(), k("div", F1, [
          u("div", O1, [
            z(nl, {
              histogram: l.value.histogram || [],
              "min-score": l.value.min_score || 0,
              "max-score": l.value.max_score || 0,
              "q1-score": l.value.q1_score || 0,
              "median-score": l.value.median_score || 0,
              "q3-score": l.value.q3_score || 0,
              "average-score": l.value.average_score || 0,
              "chart-width": N1,
              "chart-height": H1,
              "chart-margin": j1,
              "chart-margin-right": W1,
              "chart-bottom-margin": K1,
              "plot-inset": 10,
              "show-legend": !1,
              "show-stat-labels": !1
            }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score"])
          ]),
          u("div", V1, [
            z(ye, {
              class: "min-w-0 flex-1",
              title: "Responses",
              value: String(l.value.total_nps_responses)
            }, null, 8, ["value"]),
            l.value.p95_score > 0 ? (y(), te(ye, {
              key: 0,
              class: "min-w-0 flex-1",
              title: "Percentile 95",
              value: String(l.value.p95_score)
            }, null, 8, ["value"])) : V("", !0)
          ])
        ])) : (y(), k("div", z1, [...c[0] || (c[0] = [
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
}, fl = /* @__PURE__ */ me(Y1, [["__scopeId", "data-v-e98fe9b2"]]), U1 = {
  key: 0,
  class: "card-body"
}, q1 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, X1 = {
  key: 1,
  class: "empty-state"
}, G1 = {
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
      labels: s.value.map((c) => We(c.date).format("DD-MM-YYYY")),
      datasets: [
        {
          label: "CSAT P95",
          data: s.value.map((c) => Number(c.p95_score || 0)),
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
    return (c, d) => (y(), te(Ce, {
      class: "nps-daily-root min-h-0",
      title: "CSAT P95",
      subtitle: "Daily P95 trend for CSAT responses",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !o.loading ? (y(), te(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        i.value ? (y(), k("div", U1, [
          u("div", q1, [
            z(vt, {
              data: l.value,
              options: r,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (y(), k("div", X1, [...d[0] || (d[0] = [
          u("p", { class: "empty-title" }, "No daily CSAT P95 available", -1),
          u("p", { class: "empty-description" }, " No CSAT P95 points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}, gl = /* @__PURE__ */ me(G1, [["__scopeId", "data-v-5207cfa7"]]), Z1 = {
  key: 0,
  class: "card-body"
}, Q1 = {
  key: 1,
  class: "empty-state"
}, J1 = /* @__PURE__ */ le({
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
    return (i, l) => (y(), te(Ce, {
      class: "nps-resolution-root min-h-0",
      title: "CSAT Resolution",
      subtitle: "Resolution answers distribution (1=Si, 2=No)",
      collapsible: !1,
      loading: t.loading
    }, {
      default: P(() => [
        a.value ? (y(), k("div", Z1, [
          z(St, {
            data: o.value,
            options: s,
            "uppercase-legend-labels": !0
          }, null, 8, ["data"])
        ])) : (y(), k("div", Q1, [...l[0] || (l[0] = [
          u("p", { class: "empty-title" }, "No resolution answers available", -1),
          u("p", { class: "empty-description" }, " This airline has the resolution survey configured, but no responses were found for the selected dates. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), ex = /* @__PURE__ */ me(J1, [["__scopeId", "data-v-6849ef24"]]), tx = {
  key: 0,
  class: "card-body"
}, nx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, ax = {
  key: 1,
  class: "empty-state"
}, ox = /* @__PURE__ */ le({
  __name: "npsPulseMetrics",
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
    }, o = e, s = C(() => o.data?.csat_pulse_by_day || []), i = C(() => s.value.length > 0), l = C(() => ({
      labels: s.value.map((c) => c.date || ""),
      datasets: [
        {
          label: "CSAT Pulse",
          data: s.value.map((c) => Number(c.csat_pulse || 0)),
          borderColor: "#7C3AED",
          pointBorderColor: "#7C3AED",
          pointBackgroundColor: "#FFFFFF",
          tension: 0.25,
          clip: !1
        }
      ]
    })), r = {
      layout: {
        padding: {
          top: 18,
          bottom: 10,
          left: 10,
          right: 10
        }
      },
      scales: {
        x: {
          offset: !0
        },
        y: {
          min: -200,
          max: 100,
          ticks: {
            callback: (c) => `${c}%`
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (c) => `${c.parsed.y.toFixed(2)}%`
          }
        }
      }
    };
    return (c, d) => (y(), te(Ce, {
      class: "nps-pulse-root min-h-0",
      title: "CSAT Pulse",
      subtitle: "Weighted index: Σ(frequency × weight) / total surveys × 100",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !o.loading ? (y(), te(B(Oe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: a
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        i.value ? (y(), k("div", tx, [
          u("div", nx, [
            z(vt, {
              data: l.value,
              options: r,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (y(), k("div", ax, [...d[0] || (d[0] = [
          u("p", { class: "empty-title" }, "No CSAT Pulse data available", -1),
          u("p", { class: "empty-description" }, " No CSAT pulse points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), sx = /* @__PURE__ */ me(ox, [["__scopeId", "data-v-72955d9a"]]), ix = { class: "nps-metrics-container flex flex-col gap-6 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, lx = { class: "grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2" }, pl = {
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
    }, o = e, s = C(() => o.showResolutionChart), i = C(() => o.showCsatPulseChart), l = C(
      () => (s.value ? 1 : 0) + (i.value ? 1 : 0)
    ), r = C(() => l.value > 0), c = C(
      () => l.value > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
    );
    return (d, h) => (y(), k("div", ix, [
      u("div", lx, [
        z(fl, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: a
        }, null, 8, ["data", "loading", "enable-export"]),
        z(gl, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: a
        }, null, 8, ["data", "loading", "enable-export"])
      ]),
      r.value ? (y(), k("div", {
        key: 0,
        class: ee(["grid w-full items-start gap-6", c.value])
      }, [
        s.value ? (y(), te(ex, {
          key: 0,
          class: "min-w-0",
          data: e.data,
          loading: e.loading
        }, null, 8, ["data", "loading"])) : V("", !0),
        i.value ? (y(), te(sx, {
          key: 1,
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: a
        }, null, 8, ["data", "loading", "enable-export"])) : V("", !0)
      ], 2)) : V("", !0)
    ]));
  }
}, rx = { class: "csat-container__body" }, cx = /* @__PURE__ */ le({
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
    return (o, s) => (y(), te(Ce, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading
    }, {
      default: P(() => [
        u("div", rx, [
          z(pl, {
            data: e.data,
            "enable-export": e.enableExport,
            "show-resolution-chart": e.showResolutionChart,
            "show-csat-pulse-chart": e.showCsatPulseChart,
            onExport: a
          }, null, 8, ["data", "enable-export", "show-resolution-chart", "show-csat-pulse-chart"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), dx = /* @__PURE__ */ me(cx, [["__scopeId", "data-v-115d8ea1"]]), ux = /* @__PURE__ */ le({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = oe(null), o = C(() => Ft(n.totalRevenue)), s = C(() => B(a.value?.isDark) ?? !1), i = C(() => B(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (y(), te(Ct, {
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
}), ei = 1, hx = /* @__PURE__ */ le({
  __name: "CostCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = oe(null), { isDark: o } = Me(Se(n, "theme")), s = C(() => n.totalConversations * ei), i = C(() => n.previousTotalConversations === null || n.previousTotalConversations === void 0 ? null : n.previousTotalConversations * ei), l = C(() => ie(s.value)), r = C(
      () => i.value !== null && i.value !== void 0
    ), c = C(() => {
      if (!r.value) return 0;
      const f = i.value;
      return f === 0 ? s.value > 0 ? 100 : 0 : (s.value - f) / f * 100;
    }), d = C(() => {
      const f = c.value.toFixed(1);
      return c.value > 0 ? `+${f}%` : `${f}%`;
    }), h = C(() => c.value < 0 ? "change-badge--up" : c.value > 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: o, changePercent: c }), (f, b) => (y(), te(Ct, {
      label: "Cost",
      value: l.value,
      prefix: "USD",
      loading: e.loading,
      theme: e.theme,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: P(() => [...b[0] || (b[0] = [
        u("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          u("path", { d: "M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" })
        ], -1)
      ])]),
      headerAside: P(() => [
        r.value ? (y(), k("div", {
          key: 0,
          class: ee(["change-badge", h.value, { "change-badge--dark": B(o) }])
        }, D(d.value), 3)) : V("", !0)
      ]),
      _: 1
    }, 8, ["value", "loading", "theme"]));
  }
}), fx = /* @__PURE__ */ me(hx, [["__scopeId", "data-v-411e0735"]]), gx = { class: "flex justify-end" }, px = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, mx = { class: "w-full shrink-0 flex min-h-0 flex-col" }, bx = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, vx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, yx = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, xx = /* @__PURE__ */ le({
  __name: "HumanEscalations",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["changeBreakdown", "export"],
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, s = (w) => {
      o("export", w);
    }, i = Se(a, "theme"), { isDark: l } = Me(i), r = oe(a.breakdownBy), c = C(() => a.data ?? {
      total_conversations: 0,
      total_escalated_conversations: 0,
      escalation_rate_percentage: 0,
      breakdown_by: "all",
      breakdown_items: [],
      breakdown_by_day: [],
      escalations_by_day: []
    }), d = oe({
      labels: [],
      datasets: []
    }), h = oe([]), f = C(() => {
      const w = h.value.length;
      if (!(w <= 0))
        return { gridTemplateColumns: `repeat(${w}, minmax(0, 1fr))` };
    }), b = oe(
      []
    ), g = [
      "#3b82f6",
      "#f59e0b",
      "#06b6d4",
      "#8b5cf6",
      "#22c55e",
      "#ef4444",
      "#14b8a6"
    ], m = (w) => g[w % g.length], v = {
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 25,
            callback: (w) => `${w}%`
          }
        }
      }
    }, p = () => {
      o("changeBreakdown", r.value);
    }, x = (w) => {
      if (!w) return "";
      const S = w.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return S ? S.charAt(0).toUpperCase() + S.slice(1) : "";
    }, _ = (w) => {
      if (r.value === "all") {
        const A = w?.escalations_by_day ?? [];
        if (!A.length) {
          d.value = { labels: [], datasets: [] }, h.value = [], b.value = [];
          return;
        }
        const L = [...A].sort((E, G) => E.date.localeCompare(G.date));
        d.value = {
          labels: L.map((E) => We(E.date).format("MMM DD")),
          datasets: [
            {
              label: "All",
              data: L.map(
                (E) => Number(E.escalation_rate_percentage || 0)
              ),
              borderColor: "#8b5cf6",
              backgroundColor: "transparent",
              fill: !1,
              tension: 0.35
            }
          ]
        }, h.value = [], b.value = [];
        return;
      }
      const $ = w?.breakdown_by_day ?? [], S = w?.breakdown_items ?? [];
      if (!$.length) {
        d.value = { labels: [], datasets: [] }, h.value = [], b.value = [];
        return;
      }
      const M = [...$].sort(
        (A, L) => A.date.localeCompare(L.date)
      ), O = S.slice(0, 5).map((A) => A.key), j = M.map((A) => We(A.date).format("MMM DD")), F = O.map((A, L) => {
        const E = S.find((G) => G.key === A);
        return {
          label: x(E?.label || A),
          data: M.map((G) => {
            const Q = G.items.find((Z) => Z.key === A);
            return Number(Q?.percentage || 0);
          }),
          borderColor: m(L),
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      d.value = {
        labels: j,
        datasets: F
      }, h.value = S.slice(0, 5).map((A, L) => ({
        key: A.key,
        label: x(A.label),
        percentage: Number(A.percentage || 0),
        color: m(L)
      })), b.value = S.slice(0, 5).map((A, L) => ({
        key: A.key,
        label: x(A.label),
        color: m(L)
      }));
    };
    return Fe(
      () => a.data,
      (w) => {
        _(w ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Fe(
      () => a.breakdownBy,
      (w) => {
        r.value = w, _(c.value);
      }
    ), t({ isDark: l }), (w, $) => (y(), te(Ce, {
      class: "w-full min-h-0 self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !e.loading ? (y(), te(B(Oe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      headerAside: P(() => [
        u("div", gx, [
          tt(u("select", {
            "onUpdate:modelValue": $[0] || ($[0] = (S) => r.value = S),
            class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: p
          }, [...$[1] || ($[1] = [
            u("option", { value: "all" }, "All", -1),
            u("option", { value: "agent" }, "By Agent", -1)
          ])], 544), [
            [Dl, r.value]
          ])
        ])
      ]),
      default: P(() => [
        u("div", px, [
          u("div", mx, [
            d.value.labels && d.value.labels.length && d.value.datasets.length ? (y(), k("section", bx, [
              u("div", vx, [
                z(vt, {
                  data: d.value,
                  options: v,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              h.value.length ? (y(), k("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: $e(f.value)
              }, [
                (y(!0), k(se, null, pe(h.value, (S) => (y(), te(ye, {
                  key: `card-${S.key}`,
                  class: "min-w-0",
                  color: S.color,
                  title: S.label,
                  value: `${S.percentage.toFixed(1)}%`
                }, null, 8, ["color", "title", "value"]))), 128))
              ], 4)) : V("", !0)
            ])) : (y(), k("section", yx, [...$[2] || ($[2] = [
              u("div", { class: "max-w-[360px] px-4 text-center" }, [
                u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No human escalations data available "),
                u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No escalation data found for the selected period. Try adjusting the date range. ")
              ], -1)
            ])]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), _x = /* @__PURE__ */ me(xx, [["__scopeId", "data-v-b18e0ebd"]]), kx = /* @__PURE__ */ le({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = oe(null), o = C(() => `${Number(n.escalationRatePercentage || 0).toFixed(2)}%`), s = C(() => B(a.value?.isDark) ?? !1), i = C(() => B(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (y(), te(Ct, {
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
}), wx = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Cx = {
  key: 0,
  class: "flex w-full shrink-0 flex-col min-h-0"
}, $x = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, Sx = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, Mx = {
  key: 1,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, Dx = { class: "max-w-[360px] text-center" }, Tx = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, Ax = {
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
    const t = e, { isDark: n, colors: a } = Me(Se(t, "theme")), o = C(() => {
      const l = t.data ?? {}, r = l.daily, c = l.days, d = Array.isArray(r) && r.length > 0, h = Array.isArray(c) && c.length > 0 && Array.isArray(l.allocatedCostSeries) && l.allocatedCostSeries.length === c.length;
      let f = [];
      return d ? f = r : h && (f = c.map((b, g) => ({
        date: b,
        allocated_cost: l.allocatedCostSeries[g] ?? 0,
        aws_cost: l.awsCostSeries[g] ?? 0,
        airline_conversations: l.airlineConversationsSeries[g] ?? 0
      }))), {
        daily: f,
        total_allocated_cost: l.total_allocated_cost ?? l.totalAllocated ?? 0,
        total_cost: l.total_cost ?? l.total ?? 0,
        total_conversations: l.total_conversations ?? l.totalConversations ?? 0,
        total_airline_conversations: l.total_airline_conversations ?? l.totalAirlineConversations ?? 0,
        airline_name: l.airline_name
      };
    }), s = C(() => {
      const l = o.value.daily;
      return {
        labels: l.map((c) => c.date),
        datasets: [
          {
            label: "Allocated Cost",
            data: l.map((c) => c.allocated_cost),
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
            data: l.map((c) => c.aws_cost),
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
            data: l.map((c) => c.airline_conversations),
            borderColor: a.value.info,
            backgroundColor: n.value ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)",
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.4,
            yAxisID: "y1"
          }
        ]
      };
    }), i = C(() => ({
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
            label(l) {
              const r = l.dataset.label ? `${l.dataset.label}: ` : "", c = l.parsed.y;
              return l.dataset.yAxisID === "y" ? r + Le(c) : r + String(c);
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
            callback: (l) => Le(l)
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
    return (l, r) => (y(), te(Ce, {
      title: o.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1,
      loading: e.loading
    }, {
      default: P(() => [
        u("div", wx, [
          o.value.daily.length > 0 ? (y(), k("div", Cx, [
            u("div", $x, [
              z(vt, {
                class: "h-full min-h-0 w-full",
                data: s.value,
                options: i.value
              }, null, 8, ["data", "options"])
            ]),
            u("div", Sx, [
              z(ye, {
                color: B(a).primaryLight,
                title: "Total Allocated",
                value: B(Le)(o.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              z(ye, {
                color: "#FF9900",
                title: "Total AWS",
                value: B(Le)(o.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (y(), k("section", Mx, [
            u("div", Dx, [
              u("div", Tx, [
                z(B(nt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
              ]),
              r[0] || (r[0] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " Sin datos de costos ", -1)),
              r[1] || (r[1] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["title", "loading"]));
  }
}, Bx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Lx = { class: "card-body" }, Px = {
  key: 0,
  class: "chart-section"
}, Rx = { class: "chart-container" }, Ix = { class: "mt-auto grid grid-cols-2 gap-3 sm:grid-cols-3 max-[768px]:gap-2" }, Ex = {
  key: 1,
  class: "empty-state"
}, Fx = { class: "empty-state-content" }, Ox = { class: "empty-icon-wrapper" }, Tn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", ti = 10, Vx = /* @__PURE__ */ le({
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
    const a = e, { isDark: o, colors: s } = Me(Se(a, "theme")), i = (g) => {
      const m = new Date(g), v = String(m.getDate()).padStart(2, "0"), p = String(m.getMonth() + 1).padStart(2, "0");
      return `${v}-${p}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, r = C(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((m, v) => m + (v.input_cost || 0), 0);
    }), c = C(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((m, v) => m + (v.output_cost || 0), 0);
    }), d = C(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((m, v) => m + (v.cache_read_cost || 0), 0);
    }), h = C(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((m, v) => m + (v.cache_write_cost || 0), 0);
    }), f = C(() => {
      const g = a.data?.costs_by_day || {}, m = Object.keys(g).sort();
      if (m.length === 0)
        return { labels: [], datasets: [] };
      const v = m.map((x) => i(x)), p = [
        {
          label: "Input Cost",
          data: m.map((x) => g[x]?.input_cost || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: m.map((x) => g[x]?.output_cost || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: m.map((x) => g[x]?.cache_read_cost || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: m.map((x) => g[x]?.cache_write_cost || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: v,
        datasets: p
      };
    }), b = C(() => a.options ? a.options : {
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
              family: Tn,
              size: 13,
              weight: "500"
            },
            color: s.value.textSecondary,
            padding: 12,
            boxWidth: ti,
            boxHeight: ti,
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
            family: Tn,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: Tn,
            size: 12,
            weight: "500"
          },
          callbacks: {
            label: function(g) {
              let m = g.dataset.label || "";
              return m && (m += ": "), g.parsed.y !== null && (m += Le(g.parsed.y)), m;
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
            font: { family: Tn, size: 12, weight: "500" },
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
            font: { family: Tn, size: 12, weight: "500" },
            color: s.value.textSecondary,
            padding: 8,
            callback: function(g) {
              return Le(g);
            }
          }
        }
      }
    });
    return t({ isDark: o }), (g, m) => (y(), te(Ce, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: P(() => [
        u("div", Bx, [
          u("div", Lx, [
            f.value.labels && f.value.labels.length ? (y(), k("section", Px, [
              u("div", Rx, [
                z(St, {
                  data: f.value,
                  options: b.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", Ix, [
                z(ye, {
                  title: "Total Cost",
                  value: B(Le)(e.data.total_cost)
                }, null, 8, ["value"]),
                z(ye, {
                  title: "Input Cost",
                  value: B(Le)(r.value),
                  color: l.input
                }, null, 8, ["value", "color"]),
                z(ye, {
                  title: "Output Cost",
                  value: B(Le)(c.value),
                  color: l.output
                }, null, 8, ["value", "color"]),
                z(ye, {
                  title: "Cache Read",
                  value: B(Le)(d.value),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                z(ye, {
                  title: "Cache Write",
                  value: B(Le)(h.value),
                  color: l.cache_write
                }, null, 8, ["value", "color"]),
                z(ye, {
                  title: "Avg / Conv.",
                  value: B(Le)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (y(), k("section", Ex, [
              u("div", Fx, [
                u("div", Ox, [
                  z(B(nt), { class: "empty-icon" })
                ]),
                m[0] || (m[0] = u("p", { class: "empty-title" }, "No cost usage data", -1)),
                m[1] || (m[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), zx = /* @__PURE__ */ me(Vx, [["__scopeId", "data-v-e1c4a95b"]]), Nx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Hx = { class: "card-body" }, jx = {
  key: 0,
  class: "chart-section"
}, Wx = { class: "chart-container" }, Kx = { class: "mt-auto flex w-full min-w-0 flex-nowrap items-stretch gap-2 sm:gap-3" }, Yx = {
  key: 1,
  class: "empty-state"
}, Ux = { class: "empty-state-content" }, qx = { class: "empty-icon-wrapper" }, An = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", ni = 10, Xx = /* @__PURE__ */ le({
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
    const a = e, { isDark: o, colors: s } = Me(Se(a, "theme")), i = (d) => {
      const h = new Date(d), f = String(h.getDate()).padStart(2, "0"), b = String(h.getMonth() + 1).padStart(2, "0");
      return `${f}-${b}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, r = C(() => {
      const d = a.data?.tokens_by_day || {}, h = Object.keys(d).sort();
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const f = h.map((g) => i(g)), b = [
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
        labels: f,
        datasets: b
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
              family: An,
              size: 13,
              weight: "500"
            },
            color: s.value.textSecondary,
            padding: 12,
            boxWidth: ni,
            boxHeight: ni,
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
            family: An,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: An,
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
            font: { family: An, size: 12, weight: "500" },
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
            font: { family: An, size: 12, weight: "500" },
            color: s.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: o }), (d, h) => (y(), te(Ce, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: P(() => [
        u("div", Nx, [
          u("div", Hx, [
            r.value.labels && r.value.labels.length ? (y(), k("section", jx, [
              u("div", Wx, [
                z(St, {
                  data: r.value,
                  options: c.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", Kx, [
                z(ye, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: B(ie)(e.data.total_tokens)
                }, null, 8, ["value"]),
                z(ye, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: B(ie)(e.data.total_input_tokens),
                  color: l.input
                }, null, 8, ["value", "color"]),
                z(ye, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: B(ie)(e.data.total_output_tokens),
                  color: l.output
                }, null, 8, ["value", "color"]),
                z(ye, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: B(ie)(e.data.total_cache_read_tokens),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                z(ye, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: B(ie)(e.data.total_cache_write_tokens),
                  color: l.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (y(), k("section", Yx, [
              u("div", Ux, [
                u("div", qx, [
                  z(B(nt), { class: "empty-icon" })
                ]),
                h[0] || (h[0] = u("p", { class: "empty-title" }, "No token usage data", -1)),
                h[1] || (h[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see token consumption trends.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Gx = /* @__PURE__ */ me(Xx, [["__scopeId", "data-v-554d3cda"]]), Zx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Qx = { class: "card-body" }, Jx = {
  key: 0,
  class: "chart-section"
}, e_ = { class: "chart-container" }, t_ = { class: "mt-4 w-full min-w-0" }, n_ = {
  key: 1,
  class: "empty-state"
}, a_ = { class: "empty-state-content" }, o_ = { class: "empty-icon-wrapper" }, s_ = /* @__PURE__ */ le({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = Me(Se(n, "theme")), s = (c) => {
      const d = new Date(c), h = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = C(
      () => ie(n.data?.total_conversations ?? 0)
    ), l = C(() => {
      const c = n.data?.conversations_by_day || {}, d = Object.keys(c).sort();
      if (d.length === 0)
        return { labels: [], datasets: [] };
      const h = d.map((b) => s(b)), f = [
        {
          label: "Conversations",
          data: d.map((b) => c[b] || 0),
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
        datasets: f
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
    return t({ isDark: a }), (c, d) => (y(), te(Ce, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1,
      loading: e.loading
    }, {
      default: P(() => [
        u("div", Zx, [
          u("div", Qx, [
            l.value.labels && l.value.labels.length ? (y(), k("section", Jx, [
              u("div", e_, [
                z(vt, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ]),
              u("div", t_, [
                z(ye, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (y(), k("section", n_, [
              u("div", a_, [
                u("div", o_, [
                  z(B(nt), { class: "empty-icon" })
                ]),
                d[0] || (d[0] = u("p", { class: "empty-title" }, "No conversation count data", -1)),
                d[1] || (d[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), i_ = /* @__PURE__ */ me(s_, [["__scopeId", "data-v-311f443a"]]), l_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, r_ = { class: "card-body" }, c_ = {
  key: 0,
  class: "charts-grid"
}, d_ = { class: "chart-section" }, u_ = { class: "chart-container" }, h_ = { class: "chart-section" }, f_ = { class: "chart-container" }, g_ = {
  key: 1,
  class: "empty-state"
}, p_ = { class: "empty-state-content" }, m_ = { class: "empty-icon-wrapper" }, b_ = /* @__PURE__ */ le({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = Me(Se(n, "theme")), s = C(() => n.data?.top_agents && n.data.top_agents.length > 0), i = C(() => n.data?.top_agents ? [...n.data.top_agents].sort((f, b) => (b.total_cost || 0) - (f.total_cost || 0)) : []), l = C(() => n.data?.top_agents ? [...n.data.top_agents].sort((f, b) => (b.total_tokens || 0) - (f.total_tokens || 0)) : []), r = C(() => {
      const f = i.value;
      return f.length === 0 ? { labels: [], datasets: [] } : {
        labels: f.map((b) => b.agent_type),
        datasets: [
          {
            label: "Total Cost",
            data: f.map((b) => b.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), c = C(() => {
      const f = l.value;
      return f.length === 0 ? { labels: [], datasets: [] } : {
        labels: f.map((b) => b.agent_type),
        datasets: [
          {
            label: "Total Tokens",
            data: f.map((b) => b.total_tokens || 0),
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
            title: function(f) {
              return f[0]?.label || "";
            },
            label: function(f) {
              const b = f.label, g = n.data?.top_agents?.find((m) => m.agent_type === b);
              return g ? [
                `Total Cost: ${Le(g.total_cost)}`,
                `Input Cost: ${Le(g.total_input_tokens_cost)}`,
                `Output Cost: ${Le(g.total_output_tokens_cost)}`,
                `Cache Read: ${Le(g.total_read_tokens_cost)}`,
                `Cache Write: ${Le(g.total_write_tokens_cost)}`
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
            callback: function(f) {
              return Le(f);
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
            title: function(f) {
              return f[0]?.label || "";
            },
            label: function(f) {
              const b = f.label, g = n.data?.top_agents?.find((m) => m.agent_type === b);
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
            callback: function(f) {
              return f.toLocaleString();
            }
          }
        }
      }
    });
    return t({ isDark: a }), (f, b) => (y(), te(Ce, {
      class: "h-full min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1,
      loading: e.loading
    }, {
      default: P(() => [
        u("div", l_, [
          u("div", r_, [
            s.value ? (y(), k("div", c_, [
              u("section", d_, [
                b[0] || (b[0] = u("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                u("div", u_, [
                  z(St, {
                    data: r.value,
                    options: d.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              u("section", h_, [
                b[1] || (b[1] = u("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                u("div", f_, [
                  z(St, {
                    data: c.value,
                    options: h.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (y(), k("section", g_, [
              u("div", p_, [
                u("div", m_, [
                  z(B(nt), { class: "empty-icon" })
                ]),
                b[2] || (b[2] = u("p", { class: "empty-title" }, "No top agents data", -1)),
                b[3] || (b[3] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), v_ = /* @__PURE__ */ me(b_, [["__scopeId", "data-v-bb4ae132"]]), y_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, x_ = { class: "card-body" }, __ = {
  key: 0,
  class: "chart-section"
}, k_ = { class: "chart-container" }, w_ = {
  key: 1,
  class: "empty-state"
}, C_ = { class: "empty-state-content" }, $_ = { class: "empty-icon-wrapper" }, S_ = /* @__PURE__ */ le({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = Me(Se(n, "theme")), s = {
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
    ) : []), l = C(() => i.value.length > 0), r = C(() => i.value.reduce((h, f) => h + (f.conversations || 0), 0)), c = C(() => {
      const h = i.value;
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const f = h.map((m) => {
        const v = m.agent_type?.toLowerCase();
        return (s[v] || "#a78bfa") + "80";
      }), b = h.map((m) => {
        const v = m.agent_type?.toLowerCase();
        return s[v] || "#a78bfa";
      });
      return {
        labels: h.map((m) => {
          const v = m.conversations || 0, p = r.value ? v / r.value * 100 : 0;
          return `${m.agent_type} - ${v.toLocaleString()} (${p.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((m) => m.conversations || 0),
            backgroundColor: f,
            borderColor: b,
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
              const f = (h.label || "").toString(), b = Number(h.parsed) || 0, g = (h.dataset.data || []).reduce((v, p) => v + (Number(p) || 0), 0), m = g ? b / g * 100 : 0;
              return `${f}: ${b.toLocaleString()} (${m.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: a }), (h, f) => (y(), te(Ce, {
      class: "h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: P(() => [
        u("div", y_, [
          u("div", x_, [
            l.value ? (y(), k("section", __, [
              u("div", k_, [
                z(Da, {
                  data: c.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (y(), k("section", w_, [
              u("div", C_, [
                u("div", $_, [
                  z(B(nt), { class: "empty-icon" })
                ]),
                f[0] || (f[0] = u("p", { class: "empty-title" }, "No top agents data", -1)),
                f[1] || (f[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), M_ = /* @__PURE__ */ me(S_, [["__scopeId", "data-v-74c924dc"]]), D_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, T_ = { class: "card-body" }, A_ = {
  key: 0,
  class: "chart-section"
}, B_ = { class: "chart-container" }, L_ = {
  key: 1,
  class: "empty-state"
}, P_ = { class: "empty-state-content" }, R_ = { class: "empty-icon-wrapper" }, I_ = /* @__PURE__ */ le({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = Me(Se(n, "theme")), s = (c) => {
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
        const v = [...c].sort((p, x) => p.date.localeCompare(x.date));
        return {
          labels: v.map((p) => s(p.date)),
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
      const d = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {}, b = Object.keys(d).filter((v) => h[v]).sort();
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const g = b.map((v) => s(v)), m = b.map((v) => {
        const p = d[v]?.total_cost || 0, x = h[v] || 0;
        return x > 0 ? p / x : 0;
      });
      return {
        labels: g,
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
              return d && (d += ": "), c.parsed.y !== null && (d += Le(c.parsed.y)), d;
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
              return Le(c);
            }
          }
        }
      }
    });
    return t({ isDark: a }), (c, d) => (y(), te(Ce, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1,
      loading: e.loading
    }, {
      default: P(() => [
        u("div", D_, [
          u("div", T_, [
            i.value ? (y(), k("section", A_, [
              u("div", B_, [
                z(vt, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (y(), k("section", L_, [
              u("div", P_, [
                u("div", R_, [
                  z(B(nt), { class: "empty-icon" })
                ]),
                d[0] || (d[0] = u("p", { class: "empty-title" }, "No daily cost trends data", -1)),
                d[1] || (d[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), E_ = /* @__PURE__ */ me(I_, [["__scopeId", "data-v-ae6c48b1"]]), F_ = { class: "tabs text-sm" }, O_ = ["aria-label"], V_ = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], z_ = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, N_ = /* @__PURE__ */ le({
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
    const n = e, a = t, o = oe([]), s = `tabs-${Ke()}`, i = (g) => `${s}-tab-${g}`, l = C(
      () => n.items.map((g, m) => g.disabled ? -1 : m).filter((g) => g >= 0)
    );
    function r(g) {
      return g.value === n.modelValue;
    }
    function c(g) {
      const m = r(g), p = `${n.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-8 max-h-8 min-h-8 items-stretch cursor-pointer rounded-lg border border-transparent text-center outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return g.disabled ? `${p} cursor-not-allowed opacity-40` : m ? `${p} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${p} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function d(g, m) {
      g === m || n.items.find((p) => p.value === g)?.disabled || (a("update:modelValue", g), a("change", { value: g, previousValue: m }));
    }
    function h(g, m) {
      a("tab-click", { value: g.value, originalEvent: m }), !g.disabled && (d(g.value, n.modelValue), Ne(() => {
        o.value[n.items.indexOf(g)]?.focus();
      }));
    }
    function f(g, m) {
      const v = n.items.length;
      if (v === 0) return 0;
      let p = g;
      for (let x = 0; x < v; x++)
        if (p = (p + m + v) % v, !n.items[p]?.disabled) return p;
      return g;
    }
    async function b(g, m) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(g.key)) return;
      g.preventDefault();
      let p = m;
      g.key === "ArrowLeft" ? p = f(m, -1) : g.key === "ArrowRight" ? p = f(m, 1) : g.key === "Home" ? p = l.value[0] ?? 0 : g.key === "End" && (p = l.value[l.value.length - 1] ?? m);
      const x = n.items[p];
      !x || x.disabled || (d(x.value, n.modelValue), await Ne(), o.value[p]?.focus());
    }
    return (g, m) => (y(), k("div", F_, [
      u("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: ee([
          "box-border h-10 max-h-10 min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 px-0.5 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (y(!0), k(se, null, pe(e.items, (v, p) => (y(), k("button", {
          id: i(v.value),
          key: v.value,
          ref_for: !0,
          ref_key: "tabRefs",
          ref: o,
          type: "button",
          role: "tab",
          "aria-selected": r(v),
          "aria-disabled": v.disabled === !0,
          tabindex: r(v) ? 0 : -1,
          class: ee(c(v)),
          onClick: (x) => h(v, x),
          onKeydown: (x) => b(x, p)
        }, [
          u("span", {
            class: ee(["tabs-tab__label flex min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            v.icon ? (y(), te(Ot(v.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : V("", !0),
            u("span", z_, D(v.label), 1)
          ], 2)
        ], 42, V_))), 128))
      ], 10, O_),
      g.$slots.default ? (y(), te(ft, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: P(() => [
          (y(), k("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            ke(g.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : V("", !0)
    ]));
  }
}), ml = /* @__PURE__ */ me(N_, [["__scopeId", "data-v-f9c367eb"]]), H_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, j_ = { class: "card-body" }, W_ = {
  key: 0,
  class: "model-usage-table-block"
}, K_ = { class: "w-full min-w-0" }, Y_ = {
  key: 1,
  class: "empty-state"
}, U_ = { class: "empty-state-content" }, q_ = { class: "empty-icon-wrapper" }, X_ = /* @__PURE__ */ le({
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
    const a = e, o = n, s = (g) => {
      o("export", g);
    }, { isDark: i } = Me(Se(a, "theme")), l = [
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
      () => Object.entries(c.value).map(([g, m]) => ({
        id: g,
        name: g,
        avgCost: b(m.avg_cost_per_message),
        avgTokens: f(m.avg_tokens_per_message),
        messageCount: f(m.message_count),
        totalCost: b(m.total_cost),
        totalTokens: f(m.total_tokens)
      }))
    ), f = (g) => g == null ? "0" : ie(g), b = (g) => g == null ? "$0.00" : Le(g);
    return t({ isDark: i }), (g, m) => (y(), te(Ce, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !e.loading ? (y(), te(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        u("div", H_, [
          u("div", j_, [
            z(ml, {
              modelValue: r.value,
              "onUpdate:modelValue": m[0] || (m[0] = (v) => r.value = v),
              items: l,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: P(() => [
                c.value && Object.keys(c.value).length > 0 ? (y(), k("div", W_, [
                  u("div", K_, [
                    z(lt, {
                      columns: d.value,
                      rows: h.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (y(), k("div", Y_, [
                  u("div", U_, [
                    u("div", q_, [
                      z(B(nt), { class: "empty-icon" })
                    ]),
                    m[1] || (m[1] = u("p", { class: "empty-title" }, "No model usage data available", -1)),
                    m[2] || (m[2] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
                  ])
                ]))
              ]),
              _: 1
            }, 8, ["modelValue"])
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), G_ = /* @__PURE__ */ me(X_, [["__scopeId", "data-v-48a6cc07"]]), Z_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Q_ = { class: "card-body" }, J_ = {
  key: 0,
  class: "message-roles-table-block"
}, ek = { class: "w-full min-w-0" }, tk = {
  key: 1,
  class: "empty-state"
}, nk = { class: "empty-state-content" }, ak = { class: "empty-icon-wrapper" }, ok = /* @__PURE__ */ le({
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
    const a = e, o = n, s = (m) => {
      o("export", m);
    }, { isDark: i } = Me(Se(a, "theme")), l = ["assistant", "system", "user"], r = [
      { key: "role", label: "Role", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ], c = C(() => a.data?.total_by_role || {}), d = C(
      () => l.map((m) => ({
        id: m,
        role: g(m),
        avgCost: b(c.value[m]?.avg_cost_per_message),
        avgTokens: f(c.value[m]?.avg_tokens_per_message),
        messageCount: f(c.value[m]?.message_count),
        totalCost: b(c.value[m]?.total_cost),
        totalTokens: f(c.value[m]?.total_tokens)
      }))
    ), h = C(() => Object.keys(c.value).length > 0), f = (m) => m == null ? "0" : ie(m), b = (m) => m == null ? "$0.00" : Le(m), g = (m) => m.charAt(0).toUpperCase() + m.slice(1);
    return t({ isDark: i }), (m, v) => (y(), te(Ce, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !e.loading ? (y(), te(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        u("div", Z_, [
          u("div", Q_, [
            h.value ? (y(), k("div", J_, [
              u("div", ek, [
                z(lt, {
                  columns: r,
                  rows: d.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (y(), k("div", tk, [
              u("div", nk, [
                u("div", ak, [
                  z(B(nt), { class: "empty-icon" })
                ]),
                v[0] || (v[0] = u("p", { class: "empty-title" }, "No message role data available", -1)),
                v[1] || (v[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), sk = /* @__PURE__ */ me(ok, [["__scopeId", "data-v-d38e854e"]]), ik = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, lk = { class: "card-body" }, rk = {
  key: 0,
  class: "chart-section"
}, ck = { class: "chart-container" }, dk = { class: "kpi-grid" }, uk = {
  key: 1,
  class: "empty-state"
}, hk = { class: "empty-state-content" }, fk = { class: "empty-icon-wrapper" }, gk = /* @__PURE__ */ le({
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
    const a = e, o = n, s = (x) => {
      o("export", x);
    }, { isDark: i, colors: l } = Me(Se(a, "theme")), r = {
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
      for (const [w, $] of Object.entries(r))
        if (_.includes(w))
          return $;
      return "#9ca3af";
    }, f = C(() => [...a.data?.top_agents || []].sort((_, w) => w.avg_cost_per_conversation - _.avg_cost_per_conversation)), b = C(() => a.data?.total_conversations !== void 0 ? Number(a.data.total_conversations) || 0 : f.value.reduce((x, _) => x + _.conversations, 0)), g = C(() => a.data?.total_cost !== void 0 ? Number(a.data.total_cost) || 0 : f.value.reduce((x, _) => x + _.total_cost, 0)), m = C(() => a.data?.overall_avg_cost_per_conversation !== void 0 ? Number(a.data.overall_avg_cost_per_conversation) || 0 : b.value === 0 ? 0 : g.value / b.value), v = C(() => {
      const x = f.value;
      if (x.length === 0)
        return { labels: [], datasets: [] };
      const _ = x.map((S) => d(S)), w = x.map((S) => S.avg_cost_per_conversation), $ = x.map((S) => h(S));
      return {
        labels: _,
        datasets: [
          {
            label: "USD per conversation",
            data: w,
            backgroundColor: $.map((S) => `${S}80`),
            borderColor: $,
            borderWidth: 1
          }
        ]
      };
    }), p = C(() => a.options ? a.options : {
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
              const _ = f.value[x.dataIndex];
              return [
                `Cost: ${Le(x.parsed.x)}`,
                `Conversations: ${ie(_.conversations)}`,
                `Total Cost: ${Le(_.total_cost)}`
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
              return Le(x);
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
    return t({ isDark: i }), (x, _) => (y(), te(Ce, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: P(() => [
        e.enableExport && !e.loading ? (y(), te(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: P(() => [
        u("div", ik, [
          u("div", lk, [
            v.value.labels && v.value.labels.length ? (y(), k("section", rk, [
              u("div", ck, [
                z(St, {
                  data: v.value,
                  options: p.value
                }, null, 8, ["data", "options"])
              ]),
              u("footer", dk, [
                z(B(ye), {
                  title: "Total Agents",
                  value: String(f.value.length)
                }, null, 8, ["value"]),
                z(B(ye), {
                  title: "Total Conversations",
                  value: B(ie)(b.value)
                }, null, 8, ["value"]),
                z(B(ye), {
                  title: "Total Cost",
                  value: B(Le)(g.value)
                }, null, 8, ["value"]),
                z(B(ye), {
                  title: "Avg Cost / Conv.",
                  value: B(Le)(m.value)
                }, null, 8, ["value"])
              ])
            ])) : (y(), k("section", uk, [
              u("div", hk, [
                u("div", fk, [
                  z(B(nt), { class: "empty-icon" })
                ]),
                _[0] || (_[0] = u("p", { class: "empty-title" }, "No cost per conversation data", -1)),
                _[1] || (_[1] = u("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), pk = /* @__PURE__ */ me(gk, [["__scopeId", "data-v-34c6a73a"]]);
function So(e, t) {
  const n = e[t];
  return Array.isArray(n) ? n.filter(
    (a) => a !== null && typeof a == "object" && !Array.isArray(a)
  ) : [];
}
function bl(e, t) {
  const { childrenKey: n, sortKey: a, sortDirection: o, compare: s } = t;
  return [...e].sort((i, l) => s(i, l, a, o)).map((i) => {
    const l = So(i, n);
    return l.length === 0 ? i : {
      ...i,
      [n]: bl(l, t)
    };
  });
}
function vl(e, t, n = 0, a = null, o = 0) {
  const { childrenKey: s, expandedKeys: i, resolveRowKey: l, maxDepth: r } = t, c = [];
  return e.forEach((d, h) => {
    const f = l(d, o + h), b = So(d, s), g = b.length > 0, m = i.has(f);
    c.push({
      row: d,
      key: f,
      depth: n,
      hasChildren: g,
      isExpanded: m,
      parentKey: a
    }), g && m && (r === void 0 || n < r) && c.push(
      ...vl(b, t, n + 1, f, 0)
    );
  }), c;
}
function yl(e, t, n = 0, a = 0) {
  const { childrenKey: o, resolveRowKey: s, isRowSelectable: i } = t, l = [];
  return e.forEach((r, c) => {
    const d = s(r, a + c), h = So(r, o), f = h.length > 0, b = {
      depth: n,
      isChild: n > 0,
      hasChildren: f
    };
    (i?.(r, b) ?? !0) && l.push(d), h.length > 0 && l.push(
      ...yl(h, t, n + 1, 0)
    );
  }), l;
}
const mk = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, bk = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, vk = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, yk = {
  key: 0,
  scope: "col",
  class: "w-14 bg-transparent px-4 py-3 text-center align-middle"
}, xk = ["checked", "aria-label"], _k = ["aria-sort", "onClick"], kk = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, wk = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, Ck = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, $k = {
  key: 0,
  class: "kiut-table-body-cell w-12 bg-transparent pl-4 pr-0 py-0 text-center align-middle"
}, Sk = ["checked", "aria-label", "onChange"], Mk = ["aria-expanded", "aria-label", "onClick"], Dk = ["aria-expanded", "aria-label", "onClick"], Tk = {
  key: 1,
  class: "inline-block w-4 shrink-0",
  "aria-hidden": "true"
}, Ak = { class: "min-w-0 flex-1" }, Bk = /* @__PURE__ */ le({
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
    sortDirection: { default: null },
    sortCompare: {},
    expandable: { type: Boolean, default: !1 },
    childrenKey: { default: "children" },
    expandColumnKey: { default: void 0 },
    expandedKeys: { default: void 0 },
    defaultExpandedKeys: { default: () => [] },
    singleExpand: { type: Boolean, default: !1 },
    maxDepth: { default: void 0 },
    isRowExpandable: { type: Function, default: void 0 },
    isRowSelectable: { type: Function, default: void 0 },
    ariaLabelExpandRow: { default: "Expandir fila" },
    ariaLabelCollapseRow: { default: "Contraer fila" }
  },
  emits: ["update:selectedKeys", "update:expandedKeys", "sort", "expand", "collapse"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = oe(null), s = oe([...n.defaultExpandedKeys]), i = C({
      get() {
        return n.expandedKeys ?? s.value;
      },
      set(T) {
        s.value = T, a("update:expandedKeys", T);
      }
    }), l = C(
      () => new Set(i.value)
    ), r = C(
      () => n.expandColumnKey ?? n.columns[0]?.key ?? ""
    ), c = C(() => ({
      childrenKey: n.childrenKey,
      expandedKeys: l.value,
      resolveRowKey: g,
      maxDepth: n.maxDepth
    })), d = C(() => {
      const { sortKey: T, sortDirection: H, sortCompare: W, rows: re } = n;
      return !T || !H || !W ? re : n.expandable ? bl(re, {
        childrenKey: n.childrenKey,
        sortKey: T,
        sortDirection: H,
        compare: W
      }) : [...re].sort((xe, De) => W(xe, De, T, H));
    }), h = C(() => n.expandable ? vl(d.value, c.value) : d.value.map((T, H) => ({
      row: T,
      key: g(T, H),
      depth: 0,
      hasChildren: !1,
      isExpanded: !1,
      parentKey: null
    })));
    function f(T) {
      return `cell-${T}`;
    }
    function b(T) {
      return T === "center" ? "text-center" : T === "right" ? "text-right" : "text-left";
    }
    function g(T, H) {
      if (typeof n.rowKey == "function")
        return n.rowKey(T);
      const W = T[n.rowKey];
      return W != null ? String(W) : `__index_${H}`;
    }
    function m(T, H) {
      return T[H];
    }
    function v(T) {
      return T == null || typeof T == "object" ? "" : String(T);
    }
    function p(T) {
      return n.expandable && T === r.value;
    }
    function x(T) {
      return T.hasChildren || (n.isRowExpandable?.(T.row) ?? !1);
    }
    function _(T, H) {
      return {
        row: T.row,
        column: H,
        value: m(T.row, H.key),
        depth: T.depth,
        isChild: T.depth > 0,
        hasChildren: T.hasChildren,
        expanded: T.isExpanded
      };
    }
    function w(T) {
      if (!x(T)) return;
      const H = new Set(i.value);
      H.has(T.key) ? (H.delete(T.key), a("collapse", T.key, T.row)) : (n.singleExpand && H.clear(), H.add(T.key), a("expand", T.key, T.row)), i.value = [...H];
    }
    function $(T) {
      return {
        depth: T.depth,
        isChild: T.depth > 0,
        hasChildren: T.hasChildren
      };
    }
    function S(T, H) {
      return n.isRowSelectable?.(T, H) ?? !0;
    }
    function M(T) {
      return S(T.row, $(T));
    }
    function O(T) {
      return n.selectable && x(T) && !M(T);
    }
    function j(T) {
      return x(T) && !O(T);
    }
    function F(T) {
      return j(T) ? !1 : T.depth > 0 ? !0 : n.selectable && !x(T);
    }
    const A = C(() => {
      const { isRowSelectable: T } = n;
      return n.expandable ? yl(d.value, {
        childrenKey: n.childrenKey,
        resolveRowKey: g,
        isRowSelectable: T
      }) : d.value.map((H, W) => ({
        row: H,
        key: g(H, W),
        context: {
          depth: 0,
          isChild: !1,
          hasChildren: !1
        }
      })).filter(({ row: H, context: W }) => S(H, W)).map(({ key: H }) => H);
    });
    function L(T) {
      const H = String(T);
      return n.selectedKeys.some((W) => String(W) === H);
    }
    const E = C(() => !n.selectable || A.value.length === 0 ? !1 : A.value.every(
      (T) => n.selectedKeys.some((H) => String(H) === String(T))
    )), G = C(() => {
      if (!n.selectable || A.value.length === 0) return !1;
      const T = A.value.filter(
        (H) => n.selectedKeys.some((W) => String(W) === String(H))
      );
      return T.length > 0 && T.length < A.value.length;
    });
    Fe(
      [G, E, () => n.selectable],
      async () => {
        await Ne();
        const T = o.value;
        T && (T.indeterminate = G.value && !E.value);
      },
      { immediate: !0 }
    );
    function Q() {
      if (n.selectable)
        if (E.value) {
          const T = new Set(
            A.value.map((W) => String(W))
          ), H = n.selectedKeys.filter(
            (W) => !T.has(String(W))
          );
          a("update:selectedKeys", H);
        } else {
          const T = new Set(n.selectedKeys.map((H) => String(H)));
          A.value.forEach((H) => T.add(String(H))), a("update:selectedKeys", [...T]);
        }
    }
    function Z(T) {
      if (!n.selectable) return;
      const H = String(T), W = h.value.find((xe) => String(xe.key) === H);
      if (W && !M(W) || !W && !A.value.some((xe) => String(xe) === H))
        return;
      n.selectedKeys.some((xe) => String(xe) === H) ? a(
        "update:selectedKeys",
        n.selectedKeys.filter((xe) => String(xe) !== H)
      ) : a("update:selectedKeys", [...n.selectedKeys, H]);
    }
    function ae(T) {
      return `${n.ariaLabelSelectRow} ${T}`;
    }
    function ue(T) {
      a("sort", T);
    }
    function fe(T) {
      return n.sortKey === T && n.sortDirection != null;
    }
    function X(T) {
      return fe(T) ? n.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    return (T, H) => (y(), k("div", mk, [
      u("div", bk, [
        u("table", {
          class: ee([
            "kiut-table w-full min-w-[640px] overflow-hidden border-collapse text-left text-sm",
            e.fixedLayout ? "table-fixed" : ""
          ])
        }, [
          u("thead", null, [
            u("tr", vk, [
              e.selectable ? (y(), k("th", yk, [
                u("input", {
                  ref_key: "selectAllRef",
                  ref: o,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: E.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: Q
                }, null, 40, xk)
              ])) : V("", !0),
              (y(!0), k(se, null, pe(e.columns, (W) => (y(), k("th", {
                key: W.key,
                scope: "col",
                class: ee([
                  "px-2 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  p(W.key) && e.selectable ? "!pl-0" : "",
                  b(W.align),
                  W.headerClass ?? ""
                ])
              }, [
                W.sortable ? (y(), k("button", {
                  key: 0,
                  type: "button",
                  class: ee(["kiut-table-sort-btn inline-flex items-center gap-1", b(W.align)]),
                  "aria-sort": X(W.key),
                  onClick: (re) => ue(W.key)
                }, [
                  u("span", null, D(W.label), 1),
                  u("span", kk, [
                    fe(W.key) ? (y(), k(se, { key: 0 }, [
                      e.sortDirection === "asc" ? (y(), k("span", wk, "↑")) : e.sortDirection === "desc" ? (y(), k("span", Ck, "↓")) : V("", !0)
                    ], 64)) : (y(), k(se, { key: 1 }, [
                      H[0] || (H[0] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      H[1] || (H[1] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, _k)) : (y(), k(se, { key: 1 }, [
                  Te(D(W.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          u("tbody", null, [
            (y(!0), k(se, null, pe(h.value, (W) => (y(), k("tr", {
              key: W.key,
              class: ee([
                "kiut-table-body-row border-b border-[#e5e7eb] last:border-b-0 bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]",
                W.depth > 0 ? "kiut-table-row--child dark:bg-[#1a1a22]" : ""
              ])
            }, [
              e.selectable ? (y(), k("td", $k, [
                M(W) ? (y(), k("input", {
                  key: 0,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: L(W.key),
                  "aria-label": ae(W.key),
                  onChange: (re) => Z(W.key)
                }, null, 40, Sk)) : O(W) ? (y(), k("button", {
                  key: 1,
                  type: "button",
                  class: "kiut-table-expand-btn shrink-0",
                  "aria-expanded": W.isExpanded,
                  "aria-label": W.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                  onClick: He((re) => w(W), ["stop"])
                }, [
                  z(B(un), {
                    class: ee(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !W.isExpanded }]),
                    "aria-hidden": "true"
                  }, null, 8, ["class"])
                ], 8, Mk)) : V("", !0)
              ])) : V("", !0),
              (y(!0), k(se, null, pe(e.columns, (re) => (y(), k("td", {
                key: re.key,
                class: ee([
                  "kiut-table-body-cell bg-transparent py-0 align-middle text-[color:var(--kiut-text-secondary)]",
                  p(re.key) ? "pl-0 pr-2" : "px-2",
                  b(re.align),
                  re.cellClass ?? ""
                ])
              }, [
                p(re.key) ? (y(), k("div", {
                  key: 0,
                  class: "flex min-w-0 items-start gap-1",
                  style: $e({ paddingLeft: `${W.depth * 1.25}rem` })
                }, [
                  ke(T.$slots, "row-expand", {
                    row: W.row,
                    expanded: W.isExpanded,
                    hasChildren: W.hasChildren,
                    depth: W.depth,
                    toggle: () => w(W)
                  }, () => [
                    j(W) ? (y(), k("button", {
                      key: 0,
                      type: "button",
                      class: "kiut-table-expand-btn shrink-0",
                      "aria-expanded": W.isExpanded,
                      "aria-label": W.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                      onClick: He((xe) => w(W), ["stop"])
                    }, [
                      z(B(un), {
                        class: ee(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !W.isExpanded }]),
                        "aria-hidden": "true"
                      }, null, 8, ["class"])
                    ], 8, Dk)) : F(W) ? (y(), k("span", Tk)) : V("", !0)
                  ], !0),
                  u("div", Ak, [
                    ke(T.$slots, f(re.key), wt({ ref_for: !0 }, _(W, re)), () => [
                      Te(D(v(m(W.row, re.key))), 1)
                    ], !0)
                  ])
                ], 4)) : ke(T.$slots, f(re.key), wt({
                  key: 1,
                  ref_for: !0
                }, _(W, re)), () => [
                  Te(D(v(m(W.row, re.key))), 1)
                ], !0)
              ], 2))), 128))
            ], 2))), 128))
          ])
        ], 2)
      ])
    ]));
  }
}), Lk = /* @__PURE__ */ me(Bk, [["__scopeId", "data-v-b3104817"]]), ai = /* @__PURE__ */ le({
  name: "ButtonLoadingSpinner",
  __name: "ButtonLoadingSpinner",
  props: {
    compact: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, n = C(
      () => t.compact ? "size-4" : "h-[1.125rem] w-[1.125rem]"
    );
    return (a, o) => (y(), k("svg", {
      class: ee(["inline-flex shrink-0 animate-spin", n.value]),
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "2.5",
      "stroke-linecap": "round",
      "aria-hidden": "true"
    }, [...o[0] || (o[0] = [
      u("circle", {
        cx: "12",
        cy: "12",
        r: "10",
        "stroke-opacity": "0.25"
      }, null, -1),
      u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
    ])], 2));
  }
}), Pk = ["disabled", "aria-expanded", "aria-label"], Rk = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]",
  "aria-hidden": "true"
}, Ik = { class: "min-w-0 truncate" }, Ek = ["disabled", "onClick", "onMouseenter"], Fk = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, Ok = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, Vk = { class: "min-w-0 flex-1 text-left" }, zk = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, Nk = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Hk = ["disabled", "aria-expanded", "aria-label"], jk = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:size-4",
  "aria-hidden": "true"
}, Wk = ["disabled", "onClick", "onMouseenter"], Kk = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, Yk = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, Uk = { class: "min-w-0 flex-1 text-left" }, qk = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, Xk = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Gk = {
  key: 2,
  class: "group relative inline-flex shrink-0"
}, Zk = ["type", "disabled", "aria-busy", "aria-label"], Qk = {
  key: 2,
  class: "min-w-0 truncate"
}, Jk = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, e2 = ["type", "disabled", "aria-busy", "aria-label"], t2 = {
  key: 2,
  class: "min-w-0 truncate"
}, Lt = /* @__PURE__ */ le({
  name: "Button",
  inheritAttrs: !1,
  __name: "Button",
  props: {
    variant: { default: "primary" },
    tone: { default: "default" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    tooltip: {},
    options: { default: () => [] },
    menuMinWidth: { default: "280px" },
    menuAlign: { default: "left" }
  },
  emits: ["select"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = wa(), s = C(
      () => !!n.tooltip?.trim() && n.variant !== "dropdown" && n.variant !== "split"
    ), i = C(() => n.variant === "dropdown"), l = C(() => n.variant === "split"), r = C(() => n.variant === "action"), c = C(() => !r.value && !l.value), d = C(() => n.disabled || n.loading), h = C(
      () => n.loading ? "cursor-wait disabled:pointer-events-none" : "disabled:pointer-events-none disabled:opacity-45"
    ), f = C(() => {
      const T = o["aria-label"];
      if (typeof T == "string" && T.length > 0) return T;
      if ((r.value || l.value) && n.tooltip?.trim()) return n.tooltip.trim();
    }), b = C(() => {
      const T = o.type;
      return T === "submit" || T === "reset" || T === "button" ? T : "button";
    }), g = C(() => {
      const { class: T, type: H, "aria-label": W, ...re } = o;
      return re;
    }), m = C(() => n.variant === "primary" || n.variant === "dropdown" ? [
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
    ]), v = `kiut-button-menu-${Ke()}`, p = `${v}-btn`, x = `${v}-menu`, _ = oe(null), w = oe(null), $ = oe(null), S = oe(!1), M = oe(0), O = oe({}), j = C(() => n.options.filter((T) => !T.disabled));
    function F(T) {
      return `${T.value}-${T.label}`;
    }
    function A() {
      const T = w.value;
      if (!T) return;
      const H = T.getBoundingClientRect(), W = {
        top: `${H.bottom - 3}px`,
        minWidth: `max(${H.width}px, ${n.menuMinWidth})`
      };
      n.menuAlign === "right" ? (W.right = `${window.innerWidth - H.right}px`, W.left = "auto") : (W.left = `${H.left}px`, W.right = "auto"), O.value = W;
    }
    function L(T) {
      return [
        "mx-1 flex w-full cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-left outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-45",
        M.value === T ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function E() {
      S.value = !1;
    }
    function G() {
      A(), M.value = 0, Ne(() => $.value?.focus());
    }
    function Q() {
      if (!n.disabled) {
        if (S.value) {
          E();
          return;
        }
        S.value = !0, G();
      }
    }
    function Z(T) {
      T.disabled || (a("select", T), E());
    }
    function ae(T) {
      T.stopPropagation(), Q();
    }
    function ue(T) {
      if (!S.value) return;
      const H = T.target, W = _.value, re = $.value;
      W && !W.contains(H) && (!re || !re.contains(H)) && E();
    }
    function fe(T) {
      n.disabled || (T.key === "ArrowDown" || T.key === "Enter" || T.key === " ") && (T.preventDefault(), S.value || (S.value = !0, G()));
    }
    function X(T) {
      const H = j.value;
      if (T.key === "Escape") {
        T.preventDefault(), E(), w.value?.focus();
        return;
      }
      if (H.length !== 0) {
        if (T.key === "ArrowDown") {
          T.preventDefault(), M.value = Math.min(M.value + 1, H.length - 1);
          return;
        }
        if (T.key === "ArrowUp") {
          T.preventDefault(), M.value = Math.max(M.value - 1, 0);
          return;
        }
        if (T.key === "Enter" || T.key === " ") {
          T.preventDefault();
          const W = H[M.value];
          W && Z(W);
        }
      }
    }
    return Je(() => {
      document.addEventListener("click", ue);
    }), ct(() => {
      document.removeEventListener("click", ue);
    }), (T, H) => i.value ? (y(), k("div", {
      key: 0,
      ref_key: "rootRef",
      ref: _,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      u("button", wt({
        ref_key: "buttonRef",
        ref: w,
        id: p,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [m.value, B(o).class]],
        disabled: e.disabled,
        "aria-expanded": S.value,
        "aria-haspopup": "menu",
        "aria-controls": x,
        "aria-label": f.value
      }, g.value, {
        onClick: ae,
        onKeydown: fe
      }), [
        T.$slots.icon ? (y(), k("span", Rk, [
          ke(T.$slots, "icon")
        ])) : V("", !0),
        u("span", Ik, [
          ke(T.$slots, "default")
        ]),
        z(B(un), {
          class: ee(["h-[1.125rem] w-[1.125rem] shrink-0 transition-transform", S.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 16, Pk),
      (y(), te(xn, { to: "body" }, [
        tt(u("div", {
          ref_key: "panelRef",
          ref: $,
          id: x,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: $e(O.value),
          onKeydown: He(X, ["stop"])
        }, [
          (y(!0), k(se, null, pe(j.value, (W, re) => (y(), k("button", {
            key: F(W),
            type: "button",
            role: "menuitem",
            disabled: W.disabled,
            class: ee(L(re)),
            onClick: He((xe) => Z(W), ["stop"]),
            onMouseenter: (xe) => M.value = re
          }, [
            W.icon ? (y(), k("span", Fk, [
              (y(), te(Ot(W.icon), { class: "h-5 w-5" }))
            ])) : (y(), k("span", Ok)),
            u("span", Vk, [
              u("span", zk, D(W.label), 1),
              W.description ? (y(), k("span", Nk, D(W.description), 1)) : V("", !0)
            ])
          ], 42, Ek))), 128))
        ], 36), [
          [rn, S.value]
        ])
      ]))
    ], 512)) : l.value ? (y(), k("div", {
      key: 1,
      ref_key: "rootRef",
      ref: _,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      u("button", wt({
        ref_key: "buttonRef",
        ref: w,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [m.value, B(o).class]],
        disabled: e.disabled,
        "aria-expanded": S.value,
        "aria-haspopup": "menu",
        "aria-controls": x,
        "aria-label": f.value
      }, g.value, {
        onClick: ae,
        onKeydown: fe
      }), [
        T.$slots.icon ? (y(), k("span", jk, [
          ke(T.$slots, "icon")
        ])) : V("", !0)
      ], 16, Hk),
      (y(), te(xn, { to: "body" }, [
        tt(u("div", {
          ref_key: "panelRef",
          ref: $,
          id: x,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: $e(O.value),
          onKeydown: He(X, ["stop"])
        }, [
          (y(!0), k(se, null, pe(j.value, (W, re) => (y(), k("button", {
            key: F(W),
            type: "button",
            role: "menuitem",
            disabled: W.disabled,
            class: ee(L(re)),
            onClick: He((xe) => Z(W), ["stop"]),
            onMouseenter: (xe) => M.value = re
          }, [
            W.icon ? (y(), k("span", Kk, [
              (y(), te(Ot(W.icon), { class: "h-5 w-5" }))
            ])) : (y(), k("span", Yk)),
            u("span", Uk, [
              u("span", qk, D(W.label), 1),
              W.description ? (y(), k("span", Xk, D(W.description), 1)) : V("", !0)
            ])
          ], 42, Wk))), 128))
        ], 36), [
          [rn, S.value]
        ])
      ]))
    ], 512)) : s.value ? (y(), k("span", Gk, [
      u("button", wt({
        type: b.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [h.value, m.value, B(o).class]],
        disabled: d.value,
        "aria-busy": e.loading || void 0,
        "aria-label": f.value
      }, g.value), [
        e.loading ? (y(), te(ai, {
          key: 0,
          compact: r.value
        }, null, 8, ["compact"])) : T.$slots.icon ? (y(), k("span", {
          key: 1,
          class: ee(["inline-flex shrink-0", r.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          ke(T.$slots, "icon")
        ], 2)) : V("", !0),
        c.value ? (y(), k("span", Qk, [
          ke(T.$slots, "default")
        ])) : V("", !0)
      ], 16, Zk),
      u("span", Jk, D(e.tooltip), 1)
    ])) : (y(), k("button", wt({
      key: 3,
      type: b.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [h.value, m.value, B(o).class]],
      disabled: d.value,
      "aria-busy": e.loading || void 0,
      "aria-label": f.value
    }, g.value), [
      e.loading ? (y(), te(ai, {
        key: 0,
        compact: r.value
      }, null, 8, ["compact"])) : T.$slots.icon ? (y(), k("span", {
        key: 1,
        class: ee(["inline-flex shrink-0", r.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        ke(T.$slots, "icon")
      ], 2)) : V("", !0),
      c.value ? (y(), k("span", t2, [
        ke(T.$slots, "default")
      ])) : V("", !0)
    ], 16, e2));
  }
}), n2 = {
  method: "MÉTODO",
  name: "NOMBRE",
  url: "URL",
  status: "STATUS",
  version: "VERSIÓN",
  updated: "ACTUALIZADO",
  actions: "ACCIONES",
  historialTitle: "HISTORIAL DE VERSIONES",
  emptyHistory: "Sin versiones previas.",
  view: "Ver",
  run: "Ejecutar",
  edit: "Editar",
  viewVersion: "Ver",
  createDraft: "Crear draft",
  expandRow: "Expandir fila",
  collapseRow: "Contraer fila"
}, a2 = { class: "kiut-table-versions-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, o2 = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, s2 = { class: "kiut-table-versions w-full min-w-[960px] table-fixed border-collapse text-left text-sm" }, i2 = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, l2 = {
  scope: "col",
  class: "w-28 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]"
}, r2 = {
  scope: "col",
  class: "min-w-0 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]"
}, c2 = {
  scope: "col",
  class: "min-w-0 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]"
}, d2 = {
  scope: "col",
  class: "w-32 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]"
}, u2 = {
  scope: "col",
  class: "w-20 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]"
}, h2 = {
  scope: "col",
  class: "w-28 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]"
}, f2 = {
  scope: "col",
  class: "w-28 px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]"
}, g2 = { class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]" }, p2 = { class: "px-4 py-3 align-middle" }, m2 = { class: "flex items-center gap-1.5" }, b2 = ["aria-expanded", "aria-label", "onClick"], v2 = { class: "min-w-0 px-4 py-3 align-middle" }, y2 = { class: "min-w-0" }, x2 = { class: "truncate font-medium text-[color:var(--kiut-text-primary)]" }, _2 = {
  key: 0,
  class: "truncate text-xs text-[color:var(--kiut-text-muted)]"
}, k2 = { class: "min-w-0 px-4 py-3 align-middle" }, w2 = ["title"], C2 = { class: "px-4 py-3 align-middle" }, $2 = { class: "px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]" }, S2 = { class: "whitespace-nowrap px-4 py-3 align-middle text-xs text-[color:var(--kiut-text-secondary)]" }, M2 = { class: "px-4 py-3 align-middle" }, D2 = { class: "flex items-center justify-end gap-1" }, T2 = {
  key: 0,
  class: "border-b border-[#e5e7eb] bg-[#f9fafb] dark:border-[color:var(--kiut-border-light)] dark:bg-[#1a1a22]"
}, A2 = {
  colspan: "7",
  class: "px-4 pb-4 pt-1"
}, B2 = { class: "mb-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-muted)]" }, L2 = {
  key: 0,
  class: "text-sm text-[color:var(--kiut-text-muted)]"
}, P2 = {
  key: 1,
  class: "space-y-2"
}, R2 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)]" }, I2 = ["title"], E2 = { class: "whitespace-nowrap text-xs text-[color:var(--kiut-text-muted)]" }, F2 = { class: "ml-auto flex shrink-0 items-center gap-2" }, O2 = /* @__PURE__ */ le({
  name: "TableVersions",
  __name: "TableVersions",
  props: {
    rows: { default: () => [] },
    rowKey: { type: [String, Function], default: "id" },
    expandedKeys: { default: void 0 },
    defaultExpandedKeys: { default: () => [] },
    singleExpand: { type: Boolean, default: !1 },
    labels: { default: () => ({}) }
  },
  emits: ["update:expandedKeys", "expand", "collapse", "view", "run", "edit", "viewVersion", "createDraft"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = oe([...n.defaultExpandedKeys]), s = C({
      get() {
        return n.expandedKeys ?? o.value;
      },
      set(m) {
        o.value = m, a("update:expandedKeys", m);
      }
    }), i = C(() => ({
      ...n2,
      ...n.labels
    })), l = {
      GET: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
      POST: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
      PUT: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
      PATCH: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
      DELETE: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
    };
    function r(m, v) {
      if (typeof n.rowKey == "function")
        return n.rowKey(m);
      const p = m[n.rowKey];
      return p != null ? String(p) : `__index_${v}`;
    }
    function c(m, v) {
      return s.value.includes(r(m, v));
    }
    function d(m, v) {
      const p = r(m, v), x = new Set(s.value);
      x.has(p) ? (x.delete(p), a("collapse", p, m)) : (n.singleExpand && x.clear(), x.add(p), a("expand", p, m)), s.value = [...x];
    }
    function h(m) {
      return l[m] ?? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
    }
    function f(m) {
      return m === "published" ? "success" : "warning";
    }
    function b(m) {
      const v = m instanceof Date ? m : new Date(m);
      return Number.isNaN(v.getTime()) ? String(m) : v.toLocaleDateString("es-ES");
    }
    function g(m) {
      const v = m instanceof Date ? m : new Date(m);
      return Number.isNaN(v.getTime()) ? String(m) : v.toLocaleString("es-ES");
    }
    return (m, v) => (y(), k("div", a2, [
      u("div", o2, [
        u("table", s2, [
          u("thead", null, [
            u("tr", i2, [
              u("th", l2, D(i.value.method), 1),
              u("th", r2, D(i.value.name), 1),
              u("th", c2, D(i.value.url), 1),
              u("th", d2, D(i.value.status), 1),
              u("th", u2, D(i.value.version), 1),
              u("th", h2, D(i.value.updated), 1),
              u("th", f2, D(i.value.actions), 1)
            ])
          ]),
          u("tbody", null, [
            (y(!0), k(se, null, pe(e.rows, (p, x) => (y(), k(se, {
              key: r(p, x)
            }, [
              u("tr", g2, [
                u("td", p2, [
                  u("div", m2, [
                    u("button", {
                      type: "button",
                      class: "kiut-table-versions-expand-btn shrink-0",
                      "aria-expanded": c(p, x),
                      "aria-label": c(p, x) ? i.value.collapseRow : i.value.expandRow,
                      onClick: (_) => d(p, x)
                    }, [
                      z(B(un), {
                        class: ee(["h-4 w-4 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !c(p, x) }]),
                        "aria-hidden": "true"
                      }, null, 8, ["class"])
                    ], 8, b2),
                    u("span", {
                      class: ee(["inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", h(p.method)])
                    }, D(p.method), 3)
                  ])
                ]),
                u("td", v2, [
                  u("div", y2, [
                    u("p", x2, D(p.name), 1),
                    p.description ? (y(), k("p", _2, D(p.description), 1)) : V("", !0)
                  ])
                ]),
                u("td", k2, [
                  u("span", {
                    class: "block truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]",
                    title: p.url
                  }, D(p.url), 9, w2)
                ]),
                u("td", C2, [
                  z(Ye, {
                    color: f(p.status),
                    outlined: !1
                  }, {
                    default: P(() => [
                      Te(D(p.status), 1)
                    ]),
                    _: 2
                  }, 1032, ["color"])
                ]),
                u("td", $2, D(p.version), 1),
                u("td", S2, D(b(p.updatedAt)), 1),
                u("td", M2, [
                  u("div", D2, [
                    z(Lt, {
                      variant: "action",
                      tooltip: i.value.view,
                      "aria-label": i.value.view,
                      onClick: (_) => a("view", p)
                    }, {
                      icon: P(() => [
                        z(B(Qs), { class: "h-4 w-4" })
                      ]),
                      _: 1
                    }, 8, ["tooltip", "aria-label", "onClick"]),
                    z(Lt, {
                      variant: "action",
                      tooltip: i.value.run,
                      "aria-label": i.value.run,
                      onClick: (_) => a("run", p)
                    }, {
                      icon: P(() => [
                        z(B(Np), { class: "h-4 w-4" })
                      ]),
                      _: 1
                    }, 8, ["tooltip", "aria-label", "onClick"]),
                    z(Lt, {
                      variant: "action",
                      tooltip: i.value.edit,
                      "aria-label": i.value.edit,
                      onClick: (_) => a("edit", p)
                    }, {
                      icon: P(() => [
                        z(B(zp), { class: "h-4 w-4" })
                      ]),
                      _: 1
                    }, 8, ["tooltip", "aria-label", "onClick"])
                  ])
                ])
              ]),
              c(p, x) ? (y(), k("tr", T2, [
                u("td", A2, [
                  u("h4", B2, D(i.value.historialTitle), 1),
                  p.versions?.length ? (y(), k("div", P2, [
                    (y(!0), k(se, null, pe(p.versions, (_) => (y(), k("div", {
                      key: _.id,
                      class: "flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] px-4 py-3 dark:border-[color:var(--kiut-border-light)]"
                    }, [
                      z(Ye, {
                        color: "neutral",
                        outlined: ""
                      }, {
                        default: P(() => [
                          Te(D(_.status), 1)
                        ]),
                        _: 2
                      }, 1024),
                      u("span", R2, D(_.version), 1),
                      u("span", {
                        class: ee(["inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold", h(_.method)])
                      }, D(_.method), 3),
                      u("span", {
                        class: "min-w-0 flex-1 truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]",
                        title: _.url
                      }, D(_.url), 9, I2),
                      u("span", E2, D(g(_.updatedAt)), 1),
                      u("div", F2, [
                        z(Lt, {
                          variant: "secondary",
                          class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                          onClick: (w) => a("viewVersion", _, p)
                        }, {
                          icon: P(() => [
                            z(B(Qs), { class: "h-4 w-4" })
                          ]),
                          default: P(() => [
                            Te(" " + D(i.value.viewVersion), 1)
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        z(Lt, {
                          variant: "secondary",
                          class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                          onClick: (w) => a("createDraft", _, p)
                        }, {
                          icon: P(() => [
                            z(B(Vp), { class: "h-4 w-4" })
                          ]),
                          default: P(() => [
                            Te(" " + D(i.value.createDraft), 1)
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ]))), 128))
                  ])) : (y(), k("p", L2, D(i.value.emptyHistory), 1))
                ])
              ])) : V("", !0)
            ], 64))), 128))
          ])
        ])
      ])
    ]));
  }
}), V2 = /* @__PURE__ */ me(O2, [["__scopeId", "data-v-cfb0eafd"]]);
function z2(e, t) {
  return y(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function N2(e, t) {
  return y(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const H2 = ["aria-label"], j2 = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, W2 = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, K2 = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, Y2 = ["aria-label", "aria-expanded", "aria-controls", "onClick"], U2 = { class: "truncate" }, q2 = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, X2 = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, G2 = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, Z2 = ["aria-label", "onClick"], Q2 = ["aria-label", "onClick"], J2 = ["aria-label"], ew = ["aria-label"], tw = {
  key: 1,
  class: "space-y-2"
}, nw = ["for"], aw = ["id", "placeholder", "onKeydown"], ow = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, sw = ["aria-label"], iw = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, lw = ["checked", "onChange"], rw = { class: "min-w-0 flex-1" }, cw = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, dw = { class: "flex flex-wrap items-end gap-2" }, uw = { class: "min-w-[120px] flex-1" }, hw = ["for"], fw = ["id"], gw = { class: "min-w-[120px] flex-1" }, pw = ["for"], mw = ["id"], bw = /* @__PURE__ */ le({
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
    const n = e, a = t, o = eo(), i = `${`kiut-filters-${Ke()}`}-panel`, l = oe(null), r = /* @__PURE__ */ new Map(), c = oe(null), d = oe(!1), h = oe({}), f = oe(null), b = oe(""), g = oe([]), m = oe(""), v = oe(""), p = C(() => c.value ? n.filterDefinitions.find((R) => R.id === c.value) ?? null : null), x = C(() => {
      const R = p.value;
      if (R)
        return R.type === "text" ? b.value : R.type === "select" ? g.value : { start: m.value, end: v.value };
    });
    function _(R, U) {
      U && U instanceof HTMLElement ? r.set(R, U) : r.delete(R);
    }
    function w(R) {
      return n.modelValue[R];
    }
    function $(R) {
      if (R == null) return [];
      if (Array.isArray(R))
        return R.filter((U) => typeof U == "string" && U.trim() !== "");
      if (typeof R == "string") {
        const U = R.trim();
        return U ? [U] : [];
      }
      return [];
    }
    function S(R, U) {
      if (U == null) return !0;
      if (R.type === "text") return String(U).trim() === "";
      if (R.type === "select") return $(U).length === 0;
      if (R.type === "dateRange") {
        const ne = U;
        return !ne?.start?.trim() || !ne?.end?.trim();
      }
      return !0;
    }
    const M = C(
      () => n.filterDefinitions.some((R) => !S(R, w(R.id)))
    ), O = C(() => {
      const R = [];
      for (const U of n.filterDefinitions) {
        const ne = w(U.id);
        if (!S(U, ne)) {
          if (U.type === "text")
            R.push({ kind: "text", def: U, key: U.id });
          else if (U.type === "dateRange")
            R.push({ kind: "dateRange", def: U, key: U.id });
          else if (U.type === "select")
            for (const he of $(ne))
              R.push({
                kind: "select",
                def: U,
                optionValue: he,
                key: `${U.id}::${he}`
              });
        }
      }
      return R;
    });
    function j(R) {
      return R.type !== "select" ? 0 : $(w(R.id)).length;
    }
    function F(R) {
      const U = w(R.id), ne = R.label.replace(/^\+\s*/, "");
      if (R.type === "text") return `${ne}: ${String(U ?? "").trim()}`;
      if (R.type === "select") {
        const et = $(U).map((dt) => R.options.find((yt) => yt.value === dt)?.label ?? dt);
        return `${ne}: ${et.join(", ")}`;
      }
      const he = U, be = L(he.start), _e = L(he.end);
      return `${ne}: ${be} – ${_e}`;
    }
    function A(R) {
      return R.kind === "text" || R.kind === "dateRange" ? F(R.def) : R.def.options.find((ne) => ne.value === R.optionValue)?.label ?? R.optionValue;
    }
    function L(R) {
      if (!R) return "";
      const U = We(R, "YYYY-MM-DD", !0);
      return U.isValid() ? U.format("L") : R;
    }
    function E(R) {
      const U = c.value === R.id && d.value, ne = !S(R, w(R.id));
      return U || ne ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function G(R) {
      return S(R, w(R.id)) ? q(R) : `Editar filtro ${R.label.replace(/^\+\s*/, "")}`;
    }
    function Q(R) {
      const U = w(R.id);
      if (R.type === "text") {
        b.value = U != null ? String(U) : "";
        return;
      }
      if (R.type === "select") {
        g.value = [...$(U)];
        return;
      }
      const ne = U;
      m.value = ne?.start?.trim() ?? "", v.value = ne?.end?.trim() ?? "";
    }
    function Z() {
      const R = p.value;
      if (!R || R.type !== "select") return;
      const U = { ...n.modelValue };
      g.value.length === 0 ? delete U[R.id] : U[R.id] = [...g.value], a("update:modelValue", U), a("change", U);
    }
    function ae(R) {
      const U = g.value.indexOf(R);
      U >= 0 ? g.value = g.value.filter((ne, he) => he !== U) : g.value = [...g.value, R], Z();
    }
    function ue(R) {
      if (!R) return;
      f.value = R;
      const U = R.getBoundingClientRect(), ne = 300;
      let he = U.left;
      const be = window.innerWidth - ne - 12;
      he > be && (he = Math.max(12, be)), he < 12 && (he = 12);
      const _e = U.bottom + 8;
      h.value = {
        top: `${_e}px`,
        left: `${he}px`,
        width: `${Math.min(ne, window.innerWidth - 24)}px`
      };
    }
    function fe(R, U) {
      if (c.value === R.id && d.value) {
        re();
        return;
      }
      d.value && c.value !== R.id && re(), c.value = R.id, d.value = !0, Q(R), Ne().then(async () => {
        ue(U.currentTarget), await Ne(), T();
      });
    }
    function X(R, U) {
      if (c.value === R.id && d.value) {
        re();
        return;
      }
      d.value && c.value !== R.id && re(), c.value = R.id, d.value = !0, Q(R), Ne().then(async () => {
        const ne = r.get(R.id) ?? U.currentTarget;
        ue(ne), await Ne(), T();
      });
    }
    function T() {
      const R = l.value;
      if (!R) return;
      R.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function H() {
      d.value = !1, c.value = null, f.value = null;
    }
    function W(R) {
      const U = p.value;
      if (!U) return;
      if (U.type === "text") {
        b.value = R != null ? String(R) : "";
        return;
      }
      if (U.type === "select") {
        g.value = Array.isArray(R) ? R.filter((he) => typeof he == "string") : $(R);
        return;
      }
      const ne = R;
      m.value = ne?.start?.trim() ?? "", v.value = ne?.end?.trim() ?? "";
    }
    function re() {
      const R = p.value;
      if (!R) return;
      if (R.type === "text") {
        const be = b.value.trim(), _e = { ...n.modelValue };
        be === "" ? delete _e[R.id] : _e[R.id] = be, a("update:modelValue", _e), a("change", _e), H();
        return;
      }
      if (R.type === "select") {
        Z(), H();
        return;
      }
      const U = m.value.trim(), ne = v.value.trim(), he = { ...n.modelValue };
      !U || !ne || U > ne ? delete he[R.id] : he[R.id] = { start: U, end: ne }, a("update:modelValue", he), a("change", he), H();
    }
    function xe(R) {
      const U = { ...n.modelValue };
      delete U[R], a("update:modelValue", U), a("change", U), c.value === R && H();
    }
    function De(R) {
      if (R.kind === "text" || R.kind === "dateRange") {
        xe(R.def.id);
        return;
      }
      const U = { ...n.modelValue }, he = $(U[R.def.id]).filter((be) => be !== R.optionValue);
      he.length === 0 ? delete U[R.def.id] : U[R.def.id] = he, a("update:modelValue", U), a("change", U), c.value === R.def.id && Q(R.def);
    }
    function I() {
      const R = {};
      a("update:modelValue", R), a("change", R), H();
    }
    const N = C(() => {
      const R = p.value;
      return R ? `Editar filtro: ${R.label}` : "Filtro";
    });
    function Y(R) {
      const U = R.def.label.replace(/^\+\s*/, "");
      return R.kind === "select" ? `Quitar ${R.def.options.find((be) => be.value === R.optionValue)?.label ?? R.optionValue} del filtro ${U}` : `Quitar filtro ${U}`;
    }
    function ce(R) {
      const U = R.def.label.replace(/^\+\s*/, "");
      if (R.kind === "select") {
        const he = R.def.options.find((be) => be.value === R.optionValue)?.label ?? R.optionValue;
        return `Editar filtro ${U}: ${he}`;
      }
      return `Editar filtro ${U}`;
    }
    function q(R) {
      return `Añadir filtro ${R.label.replace(/^\+\s*/, "")}`;
    }
    const K = C(() => n.clearLabel);
    function J(R) {
      if (!d.value || !l.value) return;
      const U = R.target;
      if (!(l.value.contains(U) || (U instanceof Element ? U : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const he of r.values())
          if (he?.contains(U)) return;
        re();
      }
    }
    function de(R) {
      R.key === "Escape" && d.value && (R.preventDefault(), H());
    }
    function ge() {
      !d.value || !f.value || ue(f.value);
    }
    return Je(() => {
      document.addEventListener("mousedown", J, !0), window.addEventListener("keydown", de, !0), window.addEventListener("resize", ge);
    }), ii(() => {
      document.removeEventListener("mousedown", J, !0), window.removeEventListener("keydown", de, !0), window.removeEventListener("resize", ge);
    }), Fe(
      () => n.modelValue,
      () => {
        const R = p.value;
        R && d.value && !o.panel && Q(R);
      },
      { deep: !0 }
    ), (R, U) => (y(), k("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      u("div", j2, [
        u("span", W2, D(e.label), 1),
        u("div", K2, [
          (y(!0), k(se, null, pe(e.filterDefinitions, (ne) => (y(), k("button", {
            key: `pill-${ne.id}`,
            ref_for: !0,
            ref: (he) => _(ne.id, he),
            type: "button",
            class: ee(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", E(ne)]),
            "aria-label": G(ne),
            "aria-expanded": c.value === ne.id,
            "aria-haspopup": !0,
            "aria-controls": c.value === ne.id ? i : void 0,
            onClick: (he) => X(ne, he)
          }, [
            z(B(z2), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            u("span", U2, D(ne.label), 1),
            ne.type === "select" && j(ne) > 0 ? (y(), k("span", q2, D(j(ne)), 1)) : V("", !0)
          ], 10, Y2))), 128))
        ])
      ]),
      M.value ? (y(), k("div", X2, [
        u("div", G2, [
          (y(!0), k(se, null, pe(O.value, (ne) => (y(), k("div", {
            key: ne.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            u("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": ce(ne),
              onClick: (he) => fe(ne.def, he)
            }, [
              ke(R.$slots, "formatChip", {
                filter: ne.def,
                value: w(ne.def.id),
                optionValue: ne.kind === "select" ? ne.optionValue : void 0
              }, () => [
                Te(D(A(ne)), 1)
              ], !0)
            ], 8, Z2),
            u("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": Y(ne),
              onClick: (he) => De(ne)
            }, [
              z(B(N2), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, Q2)
          ]))), 128))
        ]),
        u("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": K.value,
          onClick: I
        }, D(e.clearLabel), 9, J2)
      ])) : V("", !0),
      (y(), te(xn, { to: "body" }, [
        c.value && d.value ? (y(), k("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: l,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": N.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: $e(h.value),
          onKeydown: U[3] || (U[3] = He(() => {
          }, ["stop"]))
        }, [
          p.value ? (y(), k(se, { key: 0 }, [
            R.$slots.panel ? ke(R.$slots, "panel", {
              key: 0,
              filter: p.value,
              close: re,
              value: x.value,
              updateValue: W
            }, void 0, !0) : (y(), k("div", tw, [
              p.value.type === "text" ? (y(), k(se, { key: 0 }, [
                u("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, D(p.value.label), 9, nw),
                tt(u("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": U[0] || (U[0] = (ne) => b.value = ne),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: p.value.placeholder ?? "…",
                  onKeydown: Vn(He(re, ["prevent"]), ["enter"])
                }, null, 40, aw), [
                  [sn, b.value]
                ])
              ], 64)) : p.value.type === "select" ? (y(), k(se, { key: 1 }, [
                u("p", ow, D(p.value.label), 1),
                u("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": p.value.label,
                  "aria-multiselectable": !0
                }, [
                  (y(!0), k(se, null, pe(p.value.options, (ne) => (y(), k("li", {
                    key: ne.value
                  }, [
                    u("label", iw, [
                      u("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: g.value.includes(ne.value),
                        onChange: (he) => ae(ne.value)
                      }, null, 40, lw),
                      u("span", rw, D(ne.label), 1)
                    ])
                  ]))), 128))
                ], 8, sw)
              ], 64)) : p.value.type === "dateRange" ? (y(), k(se, { key: 2 }, [
                u("p", cw, D(p.value.label), 1),
                u("div", dw, [
                  u("div", uw, [
                    u("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, hw),
                    tt(u("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": U[1] || (U[1] = (ne) => m.value = ne),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, fw), [
                      [sn, m.value]
                    ])
                  ]),
                  u("div", gw, [
                    u("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, pw),
                    tt(u("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": U[2] || (U[2] = (ne) => v.value = ne),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, mw), [
                      [sn, v.value]
                    ])
                  ])
                ])
              ], 64)) : V("", !0)
            ]))
          ], 64)) : V("", !0)
        ], 44, ew)) : V("", !0)
      ]))
    ], 8, H2));
  }
}), vw = /* @__PURE__ */ me(bw, [["__scopeId", "data-v-f38e0100"]]), yw = { class: "font-sans" }, xw = ["for"], _w = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], kw = ["id"], ww = /* @__PURE__ */ le({
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
    const n = e, a = t, o = wa(), s = li("$pcForm", null), i = `kiut-input-text-${Ke()}`, l = C(() => n.id ?? i), r = C(() => `${l.value}-err`), c = C(() => n.name ?? o.name ?? ""), d = oe(n.modelValue ?? "");
    Fe(
      () => n.modelValue,
      (p) => {
        d.value = p ?? "";
      }
    ), Je(() => {
      s && c.value && s.register?.(c.value, {});
    }), ct(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const h = C(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? d.value : d.value), f = C(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? n.invalid ?? !1 : n.invalid ?? !1);
    function b(p) {
      const x = p.target.value;
      d.value = x, a("update:modelValue", x);
      const _ = s?.fields?.[c.value]?.props;
      _?.onInput && _.onInput(p);
    }
    function g(p) {
      const x = s?.fields?.[c.value]?.props;
      x?.onChange && x.onChange(p);
    }
    function m(p) {
      const x = s?.fields?.[c.value]?.props;
      x?.onBlur && x.onBlur(p);
    }
    const v = C(() => {
      const { name: p, id: x, type: _, ...w } = o;
      return w;
    });
    return (p, x) => (y(), k("div", yw, [
      e.label ? (y(), k("label", {
        key: 0,
        for: l.value,
        class: ee(B(rt))
      }, D(e.label), 11, xw)) : V("", !0),
      u("input", wt(v.value, {
        id: l.value,
        name: c.value,
        type: e.type,
        autocomplete: "off",
        class: [B(mt), f.value ? B(Et) : ""],
        placeholder: e.placeholder,
        disabled: e.disabled,
        value: h.value,
        "aria-invalid": f.value ? "true" : void 0,
        "aria-describedby": e.errorText ? r.value : void 0,
        onInput: b,
        onChange: g,
        onBlur: m
      }), null, 16, _w),
      e.errorText ? (y(), k("p", {
        key: 1,
        id: r.value,
        class: ee(B(Mt)),
        role: "alert"
      }, D(e.errorText), 11, kw)) : V("", !0)
    ]));
  }
}), Cw = { class: "font-sans" }, $w = ["for"], Sw = { class: "relative" }, Mw = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], Dw = ["aria-label"], Tw = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, Aw = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, Bw = ["id"], Lw = /* @__PURE__ */ le({
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
    const n = e, a = t, o = wa(), s = li("$pcForm", null), i = `kiut-input-password-${Ke()}`, l = C(() => n.id ?? i), r = C(() => `${l.value}-err`), c = C(() => n.name ?? o.name ?? ""), d = oe(!1), h = oe(n.modelValue ?? "");
    Fe(
      () => n.modelValue,
      (x) => {
        x !== void 0 && x !== h.value && (h.value = x);
      }
    ), Je(() => {
      s && c.value && s.register?.(c.value, {});
    }), ct(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const f = C(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? h.value : h.value), b = C(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? n.invalid ?? !1 : n.invalid ?? !1);
    function g(x) {
      const _ = x.target.value;
      h.value = _, a("update:modelValue", _);
      const w = s?.fields?.[c.value]?.props;
      w?.onInput && w.onInput(x);
    }
    function m(x) {
      const _ = s?.fields?.[c.value]?.props;
      _?.onChange && _.onChange(x);
    }
    function v(x) {
      const _ = s?.fields?.[c.value]?.props;
      _?.onBlur && _.onBlur(x);
    }
    const p = C(() => {
      const { name: x, id: _, ...w } = o;
      return w;
    });
    return (x, _) => (y(), k("div", Cw, [
      e.label ? (y(), k("label", {
        key: 0,
        for: l.value,
        class: ee(B(rt))
      }, D(e.label), 11, $w)) : V("", !0),
      u("div", Sw, [
        u("input", wt(p.value, {
          id: l.value,
          name: c.value,
          type: d.value ? "text" : "password",
          autocomplete: "current-password",
          class: [B(mt), b.value ? B(Et) : "", "pr-10"],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: f.value,
          "aria-invalid": b.value ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: g,
          onChange: m,
          onBlur: v
        }), null, 16, Mw),
        u("button", {
          type: "button",
          tabindex: "-1",
          onClick: _[0] || (_[0] = (w) => d.value = !d.value),
          class: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
          "aria-label": d.value ? "Hide password" : "Show password"
        }, [
          d.value ? (y(), k("svg", Aw, [..._[2] || (_[2] = [
            u("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            }, null, -1)
          ])])) : (y(), k("svg", Tw, [..._[1] || (_[1] = [
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
        ], 8, Dw)
      ]),
      e.errorText ? (y(), k("p", {
        key: 1,
        id: r.value,
        class: ee(B(Mt)),
        role: "alert"
      }, D(e.errorText), 11, Bw)) : V("", !0)
    ]));
  }
}), Pw = { class: "font-sans" }, Rw = ["for"], Iw = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], Ew = ["id"], Fw = /* @__PURE__ */ le({
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
    const n = e, a = t, o = `kiut-input-textarea-${Ke()}`, s = C(() => n.id ?? o), i = C(() => `${s.value}-err`), l = C({
      get: () => n.modelValue,
      set: (r) => a("update:modelValue", r)
    });
    return (r, c) => (y(), k("div", Pw, [
      e.label ? (y(), k("label", {
        key: 0,
        for: s.value,
        class: ee(B(rt))
      }, D(e.label), 11, Rw)) : V("", !0),
      tt(u("textarea", {
        id: s.value,
        "onUpdate:modelValue": c[0] || (c[0] = (d) => l.value = d),
        rows: e.rows,
        autocomplete: "off",
        class: ee([B(oy), e.invalid ? B(Et) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, Iw), [
        [sn, l.value]
      ]),
      e.errorText ? (y(), k("p", {
        key: 1,
        id: i.value,
        class: ee(B(Mt)),
        role: "alert"
      }, D(e.errorText), 11, Ew)) : V("", !0)
    ]));
  }
}), Ow = { class: "font-sans" }, Vw = ["for"], zw = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], Nw = ["for"], Hw = ["title"], jw = ["aria-label"], Ww = ["id"], Kw = /* @__PURE__ */ le({
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
    const n = e, a = t, o = `kiut-input-file-${Ke()}`, s = C(() => n.id ?? o), i = C(() => `${s.value}-err`), l = oe(null), r = C(() => n.modelValue?.name ?? n.placeholder);
    function c(h) {
      const b = h.target.files?.[0] ?? null;
      a("update:modelValue", b);
    }
    function d() {
      a("update:modelValue", null), l.value && (l.value.value = "");
    }
    return (h, f) => (y(), k("div", Ow, [
      e.label ? (y(), k("label", {
        key: 0,
        for: s.value,
        class: ee(B(rt))
      }, D(e.label), 11, Vw)) : V("", !0),
      u("div", {
        class: ee([
          B(mt),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? B(Et) : "",
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
        }, null, 40, zw),
        u("label", {
          for: s.value,
          class: ee(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          z(B(Ip), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          Te(" " + D(e.chooseLabel), 1)
        ], 10, Nw),
        u("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: r.value || void 0
        }, D(r.value), 9, Hw),
        e.modelValue && !e.disabled ? (y(), k("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: d
        }, [
          z(B(il), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, jw)) : V("", !0)
      ], 2),
      e.errorText ? (y(), k("p", {
        key: 1,
        id: i.value,
        class: ee(B(Mt)),
        role: "alert"
      }, D(e.errorText), 11, Ww)) : V("", !0)
    ]));
  }
}), Yw = { class: "font-sans" }, Uw = ["for"], qw = { class: "relative" }, Xw = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], Gw = ["id"], Zw = /* @__PURE__ */ le({
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
    const n = e, a = t, o = `kiut-input-datetime-${Ke()}`, s = C(() => n.id ?? o), i = C(() => `${s.value}-err`), l = C(() => n.modelValue ?? "");
    function r(c) {
      const d = c.target.value;
      a("update:modelValue", d === "" ? null : d);
    }
    return (c, d) => (y(), k("div", Yw, [
      e.label ? (y(), k("label", {
        key: 0,
        for: s.value,
        class: ee(B(rt))
      }, D(e.label), 11, Uw)) : V("", !0),
      u("div", qw, [
        z(B(wo), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: s.value,
          value: l.value,
          type: "datetime-local",
          autocomplete: "off",
          class: ee([
            B(mt),
            "pl-10",
            e.invalid ? B(Et) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onInput: r
        }, null, 42, Xw)
      ]),
      e.errorText ? (y(), k("p", {
        key: 1,
        id: i.value,
        class: ee(B(Mt)),
        role: "alert"
      }, D(e.errorText), 11, Gw)) : V("", !0)
    ]));
  }
}), Qw = { class: "font-sans" }, Jw = ["for"], e5 = { class: "relative" }, t5 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], n5 = ["id"], a5 = /* @__PURE__ */ le({
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
      const f = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(h.trim());
      if (!f) return null;
      const b = Number(f[1]), g = Number(f[2]);
      return !Number.isInteger(b) || !Number.isInteger(g) || b < 0 || b > 23 || g < 0 || g > 59 ? null : `${String(b).padStart(2, "0")}:${String(g).padStart(2, "0")}`;
    }
    function a(h) {
      return h === "" ? null : n(h);
    }
    const o = e, s = t, i = `kiut-input-time-${Ke()}`, l = C(() => o.id ?? i), r = C(() => `${l.value}-err`), c = C(() => o.modelValue == null || o.modelValue === "" ? "" : n(o.modelValue) ?? "");
    function d(h) {
      const f = h.target.value;
      s("update:modelValue", a(f));
    }
    return (h, f) => (y(), k("div", Qw, [
      e.label ? (y(), k("label", {
        key: 0,
        for: l.value,
        class: ee(B(rt))
      }, D(e.label), 11, Jw)) : V("", !0),
      u("div", e5, [
        z(B(Fp), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: l.value,
          value: c.value,
          type: "time",
          autocomplete: "off",
          class: ee([
            B(mt),
            "pl-10",
            e.invalid ? B(Et) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: d
        }, null, 42, t5)
      ]),
      e.errorText ? (y(), k("p", {
        key: 1,
        id: r.value,
        class: ee(B(Mt)),
        role: "alert"
      }, D(e.errorText), 11, n5)) : V("", !0)
    ]));
  }
}), o5 = { class: "font-sans" }, s5 = ["for"], i5 = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, l5 = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], r5 = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, c5 = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, d5 = { class: "min-w-0 text-left leading-snug" }, u5 = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, h5 = { class: "min-w-0 text-right leading-snug" }, f5 = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, g5 = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, p5 = ["id"], m5 = /* @__PURE__ */ le({
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
    const n = e, a = t, o = `kiut-input-range-${Ke()}`, s = C(() => n.id ?? o), i = C(() => `${s.value}-err`), l = C(() => {
      const b = [];
      return n.errorText && b.push(i.value), b.length ? b.join(" ") : void 0;
    }), r = C(
      () => !!(n.caption && !n.captionMin && !n.captionMax)
    ), c = C(() => !!(n.captionMin || n.captionMax)), d = C(() => {
      const { min: b, max: g, modelValue: m } = n;
      if (g === b) return 0;
      const v = (m - b) / (g - b);
      return Math.min(100, Math.max(0, v * 100));
    }), h = C(() => ({
      "--kiut-range-fill": `${d.value}%`,
      "--kiut-range-length": n.trackLength
    }));
    function f(b) {
      const g = Number(b.target.value);
      a("update:modelValue", Number.isNaN(g) ? n.min : g);
    }
    return (b, g) => (y(), k("div", o5, [
      e.label ? (y(), k("label", {
        key: 0,
        for: s.value,
        class: ee(B(rt))
      }, D(e.label), 11, s5)) : V("", !0),
      u("div", {
        class: ee(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (y(), k("p", i5, D(e.captionMax), 1)) : V("", !0),
        u("div", {
          class: ee(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: $e(h.value)
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
            class: ee([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: f
          }, null, 42, l5)
        ], 6),
        e.orientation === "horizontal" && r.value ? (y(), k("p", r5, D(e.caption), 1)) : e.orientation === "horizontal" && c.value ? (y(), k("div", c5, [
          u("span", d5, D(e.captionMin), 1),
          u("span", u5, D(e.caption), 1),
          u("span", h5, D(e.captionMax), 1)
        ])) : V("", !0),
        e.orientation === "vertical" && e.captionMin ? (y(), k("p", f5, D(e.captionMin), 1)) : V("", !0),
        e.orientation === "vertical" && e.caption ? (y(), k("p", g5, D(e.caption), 1)) : V("", !0)
      ], 2),
      e.errorText ? (y(), k("p", {
        key: 1,
        id: i.value,
        class: ee(B(Mt)),
        role: "alert"
      }, D(e.errorText), 11, p5)) : V("", !0)
    ]));
  }
}), b5 = /* @__PURE__ */ me(m5, [["__scopeId", "data-v-a1343418"]]), v5 = { class: "font-sans" }, y5 = ["for"], x5 = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], _5 = ["id"], k5 = /* @__PURE__ */ le({
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
    const n = e, a = t, o = `kiut-input-number-${Ke()}`, s = C(() => n.id ?? o), i = C(() => `${s.value}-err`), l = C(() => {
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
      const f = Number(h);
      a("update:modelValue", Number.isNaN(f) ? null : f);
    }
    return (d, h) => (y(), k("div", v5, [
      e.label ? (y(), k("label", {
        key: 0,
        for: s.value,
        class: ee(B(rt))
      }, D(e.label), 11, y5)) : V("", !0),
      u("input", {
        id: s.value,
        value: r.value,
        type: "number",
        onInput: c,
        class: ee([
          B(mt),
          e.invalid ? B(Et) : "",
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
      }, null, 42, x5),
      e.errorText ? (y(), k("p", {
        key: 1,
        id: i.value,
        class: ee(B(Mt)),
        role: "alert"
      }, D(e.errorText), 11, _5)) : V("", !0)
    ]));
  }
}), w5 = { class: "font-sans" }, C5 = ["for"], $5 = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], S5 = ["disabled"], M5 = ["id"], D5 = "#3b82f6", T5 = "#aabbcc", A5 = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", B5 = /* @__PURE__ */ le({
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
      const m = g.trim(), v = /^#?([0-9a-fA-F]{6})$/.exec(m);
      if (v) return `#${v[1].toLowerCase()}`;
      const p = /^#?([0-9a-fA-F]{3})$/.exec(m);
      if (p) {
        const [x, _, w] = p[1].split("");
        return `#${x}${x}${_}${_}${w}${w}`.toLowerCase();
      }
      return null;
    }
    function a(g) {
      return n(g) ?? D5;
    }
    const o = e, s = t, i = `kiut-input-color-${Ke()}`, l = C(() => o.id ?? i), r = C(() => `${l.value}-err`), c = C(() => a(o.modelValue)), d = oe(c.value), h = oe(!1);
    Fe(c, (g) => {
      h.value || (d.value = g);
    });
    function f(g) {
      const m = g.target, v = n(m.value);
      v && s("update:modelValue", v);
    }
    function b() {
      h.value = !1;
      const g = n(d.value);
      g ? (d.value = g, s("update:modelValue", g)) : d.value = c.value;
    }
    return Fe(d, (g) => {
      if (!h.value) return;
      const m = n(g);
      m && s("update:modelValue", m);
    }), (g, m) => (y(), k("div", w5, [
      e.label ? (y(), k("label", {
        key: 0,
        for: l.value,
        class: ee(B(rt))
      }, D(e.label), 11, C5)) : V("", !0),
      u("div", {
        class: ee([
          A5,
          e.invalid ? B(Et) : "",
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
          onInput: f
        }, null, 40, $5),
        e.showHexInput ? tt((y(), k("input", {
          key: 0,
          "onUpdate:modelValue": m[0] || (m[0] = (v) => d.value = v),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: T5,
          onFocus: m[1] || (m[1] = (v) => h.value = !0),
          onBlur: b
        }, null, 40, S5)), [
          [sn, d.value]
        ]) : V("", !0)
      ], 2),
      e.errorText ? (y(), k("p", {
        key: 1,
        id: r.value,
        class: ee(B(Mt)),
        role: "alert"
      }, D(e.errorText), 11, M5)) : V("", !0)
    ]));
  }
}), L5 = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], P5 = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, R5 = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, I5 = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, E5 = { class: "truncate" }, F5 = ["aria-selected", "onClick", "onMouseenter"], O5 = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, V5 = { class: "min-w-0 flex-1" }, z5 = /* @__PURE__ */ le({
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
    const n = e, a = t, o = `kiut-multiselect-${Ke()}`, s = `${o}-label`, i = `${o}-btn`, l = `${o}-listbox`, r = oe(null), c = oe(null), d = oe(!1), h = oe(0), f = C(() => n.options.filter((F) => !F.disabled)), b = C(() => new Set(n.modelValue ?? [])), g = C(
      () => n.options.filter((F) => b.value.has(F.value))
    ), m = C(() => {
      const F = n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opciones", A = g.value.length;
      return A === 0 ? F : `${F}, ${A} seleccionada${A === 1 ? "" : "s"}`;
    });
    function v(F) {
      return `${String(F.value)}-${F.label}`;
    }
    function p(F) {
      return b.value.has(F.value);
    }
    function x(F, A) {
      const L = p(F), E = h.value === A;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        L ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !L && E ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function _(F) {
      const A = [...n.modelValue ?? []], L = A.indexOf(F.value);
      L >= 0 ? A.splice(L, 1) : A.push(F.value), a("update:modelValue", A);
    }
    function w() {
      const F = f.value;
      if (F.length === 0) {
        h.value = 0;
        return;
      }
      const A = b.value, L = F.findIndex((E) => A.has(E.value));
      h.value = L >= 0 ? L : 0;
    }
    function $() {
      n.disabled || (d.value = !d.value);
    }
    function S(F) {
      F.stopPropagation(), !n.disabled && ($(), d.value && (w(), Ne(() => c.value?.focus())));
    }
    function M(F) {
      if (!d.value) return;
      const A = r.value;
      A && !A.contains(F.target) && (d.value = !1);
    }
    function O(F) {
      n.disabled || (F.key === "ArrowDown" || F.key === "Enter" || F.key === " ") && (F.preventDefault(), d.value || (d.value = !0, w(), Ne(() => c.value?.focus())));
    }
    function j(F) {
      const A = f.value;
      if (A.length !== 0) {
        if (F.key === "Escape") {
          F.preventDefault(), d.value = !1;
          return;
        }
        if (F.key === "ArrowDown") {
          F.preventDefault(), h.value = Math.min(h.value + 1, A.length - 1);
          return;
        }
        if (F.key === "ArrowUp") {
          F.preventDefault(), h.value = Math.max(h.value - 1, 0);
          return;
        }
        if (F.key === "Enter" || F.key === " ") {
          F.preventDefault();
          const L = A[h.value];
          L && _(L);
        }
      }
    }
    return Je(() => {
      document.addEventListener("click", M);
    }), ct(() => {
      document.removeEventListener("click", M);
    }), (F, A) => (y(), k("div", {
      ref_key: "rootRef",
      ref: r,
      class: "relative font-sans"
    }, [
      e.label ? (y(), k("label", {
        key: 0,
        id: s,
        class: ee(B(rt))
      }, D(e.label), 3)) : V("", !0),
      u("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: ee([
          B(mt),
          "flex items-start justify-between gap-2 text-left",
          d.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": d.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : m.value,
        onClick: S,
        onKeydown: O
      }, [
        u("div", P5, [
          g.value.length === 0 ? (y(), k("span", R5, D(e.placeholder), 1)) : (y(), k("div", I5, [
            (y(!0), k(se, null, pe(g.value, (L) => (y(), k("span", {
              key: v(L),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              u("span", E5, D(L.label), 1)
            ]))), 128))
          ]))
        ]),
        z(B(un), {
          class: ee(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", d.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, L5),
      tt(u("ul", {
        id: l,
        ref_key: "listRef",
        ref: c,
        role: "listbox",
        tabindex: "-1",
        "aria-multiselectable": "true",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: He(j, ["stop"])
      }, [
        (y(!0), k(se, null, pe(f.value, (L, E) => (y(), k("li", {
          key: v(L),
          role: "option",
          "aria-selected": p(L),
          class: ee(x(L, E)),
          onClick: He((G) => _(L), ["stop"]),
          onMouseenter: (G) => h.value = E
        }, [
          u("span", O5, [
            p(L) ? (y(), te(B(Co), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : V("", !0)
          ]),
          u("span", V5, D(L.label), 1)
        ], 42, F5))), 128))
      ], 544), [
        [rn, d.value]
      ])
    ], 512));
  }
}), N5 = ["id", "aria-checked", "aria-disabled", "disabled", "onKeydown"], H5 = { class: "sr-only" }, j5 = /* @__PURE__ */ le({
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
    return (s, i) => (y(), k("button", {
      id: e.id,
      type: "button",
      role: "switch",
      "aria-checked": e.modelValue,
      "aria-disabled": e.disabled ? "true" : void 0,
      disabled: e.disabled,
      class: ee([
        "relative inline-flex h-8 w-[3.75rem] shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-sm transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        e.modelValue ? "bg-[color:var(--kiut-primary)]" : "bg-[#DEDEE3] dark:bg-slate-600"
      ]),
      onClick: o,
      onKeydown: [
        Vn(He(o, ["prevent", "stop"]), ["space"]),
        Vn(He(o, ["prevent"]), ["enter"])
      ]
    }, [
      u("span", {
        class: ee(["pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", e.modelValue ? "translate-x-7" : "translate-x-0"]),
        "aria-hidden": "true"
      }, null, 2),
      u("span", H5, D(e.ariaLabel), 1)
    ], 42, N5));
  }
}), W5 = { class: "font-sans" }, K5 = ["for"], Y5 = { class: "flex gap-2" }, U5 = { class: "w-[7.5rem] shrink-0" }, q5 = { class: "min-w-0 flex-1" }, X5 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], G5 = ["id"], Z5 = /* @__PURE__ */ le({
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
    const n = e, a = t, o = `kiut-phone-${Ke()}`, s = C(() => n.id ?? `${o}-num`), i = C(() => `${s.value}-err`), l = C({
      get: () => n.modelValue.prefix,
      set: (c) => a("update:modelValue", { ...n.modelValue, prefix: c })
    }), r = C({
      get: () => n.modelValue.number,
      set: (c) => a("update:modelValue", { ...n.modelValue, number: c })
    });
    return (c, d) => (y(), k("div", W5, [
      e.label ? (y(), k("label", {
        key: 0,
        for: s.value,
        class: ee(B(rt))
      }, D(e.label), 11, K5)) : V("", !0),
      u("div", Y5, [
        u("div", U5, [
          z($o, {
            modelValue: l.value,
            "onUpdate:modelValue": d[0] || (d[0] = (h) => l.value = h),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        u("div", q5, [
          tt(u("input", {
            id: s.value,
            "onUpdate:modelValue": d[1] || (d[1] = (h) => r.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: ee([B(mt), e.invalid ? B(Et) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, X5), [
            [sn, r.value]
          ])
        ])
      ]),
      e.errorText ? (y(), k("p", {
        key: 1,
        id: i.value,
        class: ee(B(Mt)),
        role: "alert"
      }, D(e.errorText), 11, G5)) : V("", !0)
    ]));
  }
}), Q5 = ["role", "aria-label"], J5 = { class: "flex flex-wrap gap-2" }, eC = ["aria-checked", "role", "onClick"], tC = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, nC = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, aC = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, oC = /* @__PURE__ */ le({
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
    return (r, c) => (y(), k("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      u("div", J5, [
        (y(!0), k(se, null, pe(e.items, (d) => (y(), k("button", {
          key: d.value,
          type: "button",
          class: ee(i(d)),
          "aria-checked": s(d),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => l(d)
        }, [
          u("span", tC, [
            s(d) ? (y(), k("span", nC)) : V("", !0)
          ]),
          d.dotColor ? (y(), k("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: $e({ backgroundColor: d.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : V("", !0),
          u("span", aC, D(d.label), 1)
        ], 10, eC))), 128))
      ])
    ], 8, Q5));
  }
}), sC = ["aria-label"], iC = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], lC = { class: "truncate px-3 py-2 text-sm font-medium" }, rC = /* @__PURE__ */ le({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = `kiut-seg-${Ke()}`, s = (m) => `${o}-seg-${m}`, i = oe([]);
    function l(m, v) {
      m instanceof HTMLButtonElement ? i.value[v] = m : i.value[v] = null;
    }
    function r(m) {
      return m.value === n.modelValue;
    }
    function c(m) {
      const v = r(m), p = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return m.disabled ? `${p} cursor-not-allowed opacity-40` : v ? `${p} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${p} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function d(m) {
      m.disabled || m.value !== n.modelValue && a("update:modelValue", m.value);
    }
    function h(m, v, p) {
      d(m), Ne(() => i.value[v]?.focus());
    }
    const f = C(
      () => n.items.map((m, v) => m.disabled ? -1 : v).filter((m) => m >= 0)
    );
    function b(m, v) {
      const p = n.items.length;
      if (p === 0) return 0;
      let x = m;
      for (let _ = 0; _ < p; _++)
        if (x = (x + v + p) % p, !n.items[x]?.disabled) return x;
      return m;
    }
    function g(m, v) {
      if (m.key === "ArrowRight" || m.key === "ArrowDown") {
        m.preventDefault();
        const p = b(v, 1), x = n.items[p];
        x && d(x), Ne(() => i.value[p]?.focus());
      } else if (m.key === "ArrowLeft" || m.key === "ArrowUp") {
        m.preventDefault();
        const p = b(v, -1), x = n.items[p];
        x && d(x), Ne(() => i.value[p]?.focus());
      } else if (m.key === "Home") {
        m.preventDefault();
        const p = f.value[0];
        if (p !== void 0) {
          const x = n.items[p];
          x && d(x), Ne(() => i.value[p]?.focus());
        }
      } else if (m.key === "End") {
        m.preventDefault();
        const p = f.value[f.value.length - 1];
        if (p !== void 0) {
          const x = n.items[p];
          x && d(x), Ne(() => i.value[p]?.focus());
        }
      }
    }
    return (m, v) => (y(), k("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (y(!0), k(se, null, pe(e.items, (p, x) => (y(), k("button", {
        id: s(p.value),
        key: p.value,
        ref_for: !0,
        ref: (_) => l(_, x),
        type: "button",
        role: "tab",
        "aria-selected": r(p),
        "aria-disabled": p.disabled === !0,
        tabindex: r(p) ? 0 : -1,
        class: ee(c(p)),
        onClick: (_) => h(p, x),
        onKeydown: (_) => g(_, x)
      }, [
        u("span", lC, D(p.label), 1)
      ], 42, iC))), 128))
    ], 8, sC));
  }
}), cC = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  es: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
}, dC = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
}, uC = {
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
}, hC = {
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
}, fC = [
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
function gC(e = "en") {
  return cC[e];
}
function xl(e = "en") {
  return fC.map((t) => ({ id: t, label: hC[e][t] }));
}
function pC(e = "en") {
  return "Presets";
}
xl("es");
function Ge(e) {
  const [t, n, a] = e.split("-").map(Number);
  return new Date(t, n - 1, a);
}
function st(e) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), a = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${a}`;
}
function Ve(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function Rt(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function qn(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function mC(e, t) {
  const n = new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
  return Ve(n);
}
function Bn(e, t) {
  return mC(e, -t);
}
function bC(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function _l(e, t = /* @__PURE__ */ new Date()) {
  const n = Ve(t);
  switch (e) {
    case "today":
      return { start: n, end: n };
    case "yesterday": {
      const a = Bn(n, 1);
      return { start: a, end: a };
    }
    case "last7":
      return { start: Bn(n, 6), end: n };
    case "last14":
      return { start: Bn(n, 13), end: n };
    case "last30":
      return { start: Bn(n, 29), end: n };
    case "last90":
      return { start: Bn(n, 89), end: n };
    case "thisMonth":
      return { start: Rt(n), end: n };
    case "lastMonth": {
      const a = Rt(qn(n, -1));
      return { start: a, end: bC(a) };
    }
    case "yearToDate":
      return { start: new Date(n.getFullYear(), 0, 1), end: n };
  }
}
function kl(e, t, n) {
  let a = Ve(e.start), o = Ve(e.end);
  if (t) {
    const s = Ve(Ge(t));
    Yt(a, s) && (a = s), Yt(o, s) && (o = s);
  }
  if (n) {
    const s = Ve(Ge(n));
    Wa(a, s) && (a = s), Wa(o, s) && (o = s);
  }
  return Wa(a, o) ? { start: o, end: a } : { start: a, end: o };
}
function vC(e, t, n = /* @__PURE__ */ new Date(), a, o) {
  if (!e.start || !e.end) return !1;
  const s = kl(_l(t, n), a, o);
  return st(s.start) === e.start && st(s.end) === e.end;
}
function Gn(e, t) {
  const n = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), a = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return n < a ? -1 : n > a ? 1 : 0;
}
function jt(e, t) {
  return Gn(e, t) === 0;
}
function Yt(e, t) {
  return Gn(e, t) < 0;
}
function Wa(e, t) {
  return Gn(e, t) > 0;
}
function wl(e, t) {
  return Gn(e, t) >= 0;
}
function Cl(e, t) {
  return Gn(e, t) <= 0;
}
function $l(e) {
  const t = e.getFullYear(), n = e.getMonth(), a = new Date(t, n, 1), o = new Date(a);
  o.setDate(a.getDate() - a.getDay());
  const s = [], i = new Date(o);
  for (let l = 0; l < 42; l++)
    s.push(new Date(i)), i.setDate(i.getDate() + 1);
  return s;
}
function ka(e, t = "en") {
  return `${dC[t][e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function Wt(e, t = "en") {
  return `${uC[t][e.getMonth()]} ${e.getFullYear()}`;
}
const yC = ["aria-expanded", "aria-labelledby", "aria-label"], xC = ["onKeydown"], _C = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, kC = { class: "mb-4 flex items-center justify-between gap-2" }, wC = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, CC = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, $C = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, SC = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, MC = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, DC = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, TC = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, AC = { class: "grid grid-cols-7 gap-y-2 mt-2" }, BC = ["disabled", "onClick"], LC = "rounded-lg text-[#61616b]", PC = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", RC = "opacity-30", IC = "bg-[#6b35e9] font-medium text-white", EC = "bg-[#895af6] font-semibold text-white", FC = /* @__PURE__ */ le({
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
    const n = e, a = t, s = `${`kiut-drp-${Ke()}`}-lbl`, i = oe(null), l = oe(null), r = oe(!1), c = oe(null), d = oe(Rt(/* @__PURE__ */ new Date())), h = C(() => !!(n.modelValue.start && n.modelValue.end)), f = C(() => {
      const A = Rt(d.value);
      return [A, qn(A, 1)];
    }), b = C(() => n.ariaLabel ?? n.placeholder), g = C(() => {
      const A = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return n.panelAlign === "end" ? `right-0 left-auto ${A}` : `left-0 right-auto ${A}`;
    }), m = C(
      () => `${Wt(f.value[0])} – ${Wt(f.value[1])}`
    ), v = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], p = C(() => {
      if (!n.modelValue.start || !n.modelValue.end) return n.placeholder;
      const A = Ge(n.modelValue.start), L = Ge(n.modelValue.end);
      return `${ka(A)} – ${ka(L)}`;
    });
    function x(A, L) {
      return A.getMonth() === L.getMonth() && A.getFullYear() === L.getFullYear();
    }
    function _(A) {
      const L = Ve(A);
      if (n.minDate) {
        const E = Ve(Ge(n.minDate));
        if (Yt(L, E)) return !0;
      }
      if (n.maxDate) {
        const E = Ve(Ge(n.maxDate));
        if (Yt(E, L)) return !0;
      }
      return !1;
    }
    function w(A, L, E) {
      const G = jt(A, L), Q = jt(A, E);
      if (G && Q) return "rounded-lg";
      const Z = G || A.getDay() === 0, ae = Q || A.getDay() === 6;
      return Z && ae ? "rounded-lg" : Z ? "rounded-l-lg" : ae ? "rounded-r-lg" : "rounded-none";
    }
    function $(A, L) {
      const E = x(L, A), G = _(L), Q = n.modelValue.start ? Ve(Ge(n.modelValue.start)) : null, Z = n.modelValue.end ? Ve(Ge(n.modelValue.end)) : null, ae = Ve(L);
      if (G)
        return LC;
      let ue = PC;
      if (Q && Z && wl(ae, Q) && Cl(ae, Z)) {
        const X = jt(ae, Q), T = jt(ae, Z);
        ue = `${w(ae, Q, Z)} ${X || T ? EC : IC}`;
      }
      return E || (ue = `${ue} ${RC}`), ue;
    }
    function S(A) {
      if (_(A)) return;
      const L = Ve(A);
      if (!c.value) {
        c.value = new Date(L), a("update:modelValue", { start: st(L), end: st(L) });
        return;
      }
      let G = Ve(c.value), Q = new Date(L);
      Yt(Q, G) && ([G, Q] = [Q, G]), a("update:modelValue", { start: st(G), end: st(Q) }), c.value = null, r.value = !1;
    }
    function M(A) {
      d.value = qn(d.value, A);
    }
    function O() {
      r.value = !1;
    }
    function j(A) {
      if (A?.stopPropagation(), !r.value) {
        if (r.value = !0, c.value = null, n.modelValue.start)
          try {
            d.value = Rt(Ge(n.modelValue.start));
          } catch {
          }
        Ne(() => l.value?.focus());
      }
    }
    function F(A) {
      if (!r.value) return;
      const L = i.value;
      L && !L.contains(A.target) && (r.value = !1);
    }
    return Fe(r, (A) => {
      A && (c.value = null);
    }), Je(() => {
      document.addEventListener("click", F);
    }), ct(() => {
      document.removeEventListener("click", F);
    }), (A, L) => (y(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (y(), k("label", {
        key: 0,
        id: s,
        class: ee(B(rt))
      }, D(e.label), 3)) : V("", !0),
      u("button", {
        type: "button",
        class: ee([
          B(mt),
          "flex w-full items-center gap-2 text-left",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : b.value,
        onFocus: j,
        onClick: j
      }, [
        z(B(wo), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: ee([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, D(p.value), 3)
      ], 42, yC),
      tt(u("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: ee([
          g.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Vn(He(O, ["stop"]), ["escape"])
      }, [
        u("div", _C, [
          u("div", kC, [
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes anterior",
              onClick: L[0] || (L[0] = (E) => M(-1))
            }, [
              z(B(ol), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ]),
            u("div", wC, [
              u("span", CC, D(m.value), 1),
              u("div", $C, [
                u("span", SC, D(B(Wt)(f.value[0])), 1),
                u("span", MC, D(B(Wt)(f.value[1])), 1)
              ])
            ]),
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes siguiente",
              onClick: L[1] || (L[1] = (E) => M(1))
            }, [
              z(B(sl), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ])
          ]),
          u("div", DC, [
            (y(!0), k(se, null, pe(f.value, (E) => (y(), k("div", {
              key: `${E.getFullYear()}-${E.getMonth()}`,
              class: "w-full max-w-[252px] shrink-0"
            }, [
              u("div", TC, [
                (y(), k(se, null, pe(v, (G) => u("span", { key: G }, D(G), 1)), 64))
              ]),
              u("div", AC, [
                (y(!0), k(se, null, pe(B($l)(E), (G) => (y(), k("button", {
                  key: B(st)(G),
                  type: "button",
                  disabled: _(G),
                  class: ee(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", $(E, G)]),
                  onClick: (Q) => S(G)
                }, D(G.getDate()), 11, BC))), 128))
              ])
            ]))), 128))
          ])
        ])
      ], 42, xC), [
        [rn, r.value]
      ])
    ], 512));
  }
}), OC = ["aria-expanded", "aria-labelledby", "aria-label"], VC = ["aria-label", "onKeydown"], zC = { class: "flex flex-col sm:flex-row" }, NC = ["aria-label"], HC = { class: "px-2 pt-1 pb-1.5 text-[10px] font-semibold uppercase dark:text-[#61616b] text-[#e3e3e8]" }, jC = { class: "flex flex-col gap-0.5" }, WC = ["onClick"], KC = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, YC = { class: "mb-4 flex items-center justify-between gap-2" }, UC = ["aria-label"], qC = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, XC = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, GC = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, ZC = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, QC = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, JC = ["aria-label"], e$ = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, t$ = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, n$ = { class: "grid grid-cols-7 gap-y-2 mt-2" }, a$ = ["disabled", "onClick"], o$ = "rounded-lg text-[#61616b]", s$ = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", i$ = "opacity-30", l$ = "bg-[#6b35e9] font-medium text-white", r$ = "bg-[#895af6] font-semibold text-white", c$ = /* @__PURE__ */ le({
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
    const n = e, a = t, s = `${`kiut-dpp-${Ke()}`}-lbl`, i = oe(null), l = oe(null), r = oe(!1), c = oe(null), d = oe(Rt(/* @__PURE__ */ new Date())), h = C(() => !!(n.modelValue.start && n.modelValue.end)), f = C(() => {
      const X = Rt(d.value);
      return [X, qn(X, 1)];
    }), b = C(
      () => n.placeholder ?? (n.locale === "es" ? "Seleccionar fechas" : "Select dates")
    ), g = C(() => n.ariaLabel ?? b.value), m = C(() => xl(n.locale)), v = C(() => pC(n.locale)), p = C(() => gC(n.locale)), x = C(
      () => n.locale === "es" ? "Preajustes de rango" : "Range presets"
    ), _ = C(
      () => n.locale === "es" ? "Mes anterior" : "Previous month"
    ), w = C(
      () => n.locale === "es" ? "Mes siguiente" : "Next month"
    ), $ = C(
      () => n.locale === "es" ? "Calendario de rango con preajustes" : "Date range calendar with presets"
    ), S = C(() => {
      const X = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return n.panelAlign === "end" ? `right-0 left-auto ${X}` : `left-0 right-auto ${X}`;
    }), M = C(
      () => `${Wt(f.value[0], n.locale)} – ${Wt(f.value[1], n.locale)}`
    ), O = C(() => {
      if (!n.modelValue.start || !n.modelValue.end) return b.value;
      const X = Ge(n.modelValue.start), T = Ge(n.modelValue.end);
      return `${ka(X, n.locale)} – ${ka(T, n.locale)}`;
    });
    function j(X, T) {
      return X.getMonth() === T.getMonth() && X.getFullYear() === T.getFullYear();
    }
    function F(X) {
      const T = Ve(X);
      if (n.minDate) {
        const H = Ve(Ge(n.minDate));
        if (Yt(T, H)) return !0;
      }
      if (n.maxDate) {
        const H = Ve(Ge(n.maxDate));
        if (Yt(H, T)) return !0;
      }
      return !1;
    }
    function A(X, T, H) {
      const W = jt(X, T), re = jt(X, H);
      if (W && re) return "rounded-lg";
      const xe = W || X.getDay() === 0, De = re || X.getDay() === 6;
      return xe && De ? "rounded-lg" : xe ? "rounded-l-lg" : De ? "rounded-r-lg" : "rounded-none";
    }
    function L(X) {
      const T = vC(
        n.modelValue,
        X,
        /* @__PURE__ */ new Date(),
        n.minDate,
        n.maxDate
      ), H = "text-[#61616b] hover:bg-[#efeff0b3] dark:text-[#e3e3e8] dark:hover:bg-[#23232fb3]";
      return T ? `${H} font-medium` : H;
    }
    function E(X, T) {
      const H = j(T, X), W = F(T), re = n.modelValue.start ? Ve(Ge(n.modelValue.start)) : null, xe = n.modelValue.end ? Ve(Ge(n.modelValue.end)) : null, De = Ve(T);
      if (W)
        return o$;
      let I = s$;
      if (re && xe && wl(De, re) && Cl(De, xe)) {
        const Y = jt(De, re), ce = jt(De, xe);
        I = `${A(De, re, xe)} ${Y || ce ? r$ : l$}`;
      }
      return H || (I = `${I} ${i$}`), I;
    }
    function G(X) {
      const T = kl(_l(X), n.minDate, n.maxDate);
      a("update:modelValue", {
        start: st(T.start),
        end: st(T.end)
      }), d.value = Rt(T.start), c.value = null, r.value = !1;
    }
    function Q(X) {
      if (F(X)) return;
      const T = Ve(X);
      if (!c.value) {
        c.value = new Date(T), a("update:modelValue", { start: st(T), end: st(T) });
        return;
      }
      let W = Ve(c.value), re = new Date(T);
      Yt(re, W) && ([W, re] = [re, W]), a("update:modelValue", { start: st(W), end: st(re) }), c.value = null, r.value = !1;
    }
    function Z(X) {
      d.value = qn(d.value, X);
    }
    function ae() {
      r.value = !1;
    }
    function ue(X) {
      if (X.stopPropagation(), r.value) {
        r.value = !1;
        return;
      }
      if (r.value = !0, c.value = null, n.modelValue.start)
        try {
          d.value = Rt(Ge(n.modelValue.start));
        } catch {
        }
      Ne(() => l.value?.focus());
    }
    function fe(X) {
      if (!r.value) return;
      const T = i.value;
      T && !T.contains(X.target) && (r.value = !1);
    }
    return Fe(r, (X) => {
      X && (c.value = null);
    }), Je(() => {
      document.addEventListener("click", fe);
    }), ct(() => {
      document.removeEventListener("click", fe);
    }), (X, T) => (y(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (y(), k("label", {
        key: 0,
        id: s,
        class: ee(B(rt))
      }, D(e.label), 3)) : V("", !0),
      u("button", {
        type: "button",
        class: ee([
          B(mt),
          "group flex w-full items-center gap-2 text-left hover:bg-[#6b35e9] hover:text-white",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : g.value,
        onClick: ue
      }, [
        z(B(wo), {
          class: "h-5 w-5 shrink-0 text-gray-500 transition-colors group-hover:text-white dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: ee([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] group-hover:text-white dark:text-slate-500"
          ])
        }, D(O.value), 3)
      ], 10, OC),
      tt(u("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": $.value,
        class: ee([
          S.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Vn(He(ae, ["stop"]), ["escape"])
      }, [
        u("div", zC, [
          u("aside", {
            class: "w-full shrink-0 border-b border-gray-200 p-3 sm:w-[176px] sm:border-r sm:border-b-0 dark:border-[color:var(--kiut-border-light)]",
            "aria-label": x.value
          }, [
            u("p", HC, D(v.value), 1),
            u("ul", jC, [
              (y(!0), k(se, null, pe(m.value, (H) => (y(), k("li", {
                key: H.id
              }, [
                u("button", {
                  type: "button",
                  class: ee(["w-full rounded-lg px-2 py-1.5 text-left text-xs transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", L(H.id)]),
                  onClick: (W) => G(H.id)
                }, D(H.label), 11, WC)
              ]))), 128))
            ])
          ], 8, NC),
          u("div", KC, [
            u("div", YC, [
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": _.value,
                onClick: T[0] || (T[0] = (H) => Z(-1))
              }, [
                z(B(ol), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, UC),
              u("div", qC, [
                u("span", XC, D(M.value), 1),
                u("div", GC, [
                  u("span", ZC, D(B(Wt)(f.value[0], e.locale)), 1),
                  u("span", QC, D(B(Wt)(f.value[1], e.locale)), 1)
                ])
              ]),
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": w.value,
                onClick: T[1] || (T[1] = (H) => Z(1))
              }, [
                z(B(sl), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, JC)
            ]),
            u("div", e$, [
              (y(!0), k(se, null, pe(f.value, (H) => (y(), k("div", {
                key: `${H.getFullYear()}-${H.getMonth()}`,
                class: "w-full max-w-[252px] shrink-0"
              }, [
                u("div", t$, [
                  (y(!0), k(se, null, pe(p.value, (W) => (y(), k("span", { key: W }, D(W), 1))), 128))
                ]),
                u("div", n$, [
                  (y(!0), k(se, null, pe(B($l)(H), (W) => (y(), k("button", {
                    key: B(st)(W),
                    type: "button",
                    disabled: F(W),
                    class: ee(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", E(H, W)]),
                    onClick: (re) => Q(W)
                  }, D(W.getDate()), 11, a$))), 128))
                ])
              ]))), 128))
            ])
          ])
        ])
      ], 42, VC), [
        [rn, r.value]
      ])
    ], 512));
  }
}), d$ = ["disabled", "aria-expanded", "aria-label"], u$ = { class: "min-w-0 flex-1 truncate" }, h$ = ["aria-selected", "onClick", "onMouseenter"], f$ = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, g$ = { class: "min-w-0 flex-1" }, p$ = /* @__PURE__ */ le({
  name: "TagSelect",
  __name: "TagSelect",
  props: {
    modelValue: {},
    options: {},
    disabled: { type: Boolean, default: !1 },
    outlined: { type: Boolean, default: !0 },
    ariaLabel: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = `${`kiut-tag-select-${Ke()}`}-listbox`, i = oe(null), l = oe(null), r = oe(null), c = oe(null), d = oe(!1), h = oe(0), f = oe({}), b = C(() => n.options.filter((Z) => !Z.disabled)), g = C(
      () => n.options.find((Z) => Z.value === n.modelValue) ?? null
    ), m = C(() => g.value?.color ?? "neutral"), v = C(
      () => rl(m.value, n.outlined)
    ), p = C(() => g.value ? g.value.label : n.modelValue !== null && n.modelValue !== void 0 && n.modelValue !== "" ? String(n.modelValue) : b.value[0]?.label ?? "Seleccionar…"), x = C(
      () => n.ariaLabel ?? `Estado: ${p.value}`
    );
    function _() {
      const Z = l.value;
      if (!Z) return;
      const ae = Z.getBoundingClientRect();
      f.value = {
        top: `${ae.bottom + 4}px`,
        left: `${ae.left}px`,
        minWidth: `${ae.width}px`
      };
    }
    function w(Z) {
      return `${String(Z.value)}-${Z.label}`;
    }
    function $(Z) {
      return n.modelValue === Z.value;
    }
    function S(Z, ae) {
      const ue = $(Z), fe = h.value === ae;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        ue ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !ue && fe ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function M() {
      h.value = Math.max(
        0,
        b.value.findIndex((Z) => Z.value === n.modelValue)
      );
    }
    function O() {
      _(), M(), Ne(() => c.value?.focus());
    }
    function j() {
      d.value = !1;
    }
    function F(Z) {
      a("update:modelValue", Z.value), j();
    }
    function A() {
      if (!n.disabled) {
        if (d.value) {
          j();
          return;
        }
        d.value = !0, O();
      }
    }
    function L(Z) {
      Z.stopPropagation(), !n.disabled && A();
    }
    function E(Z) {
      if (!d.value) return;
      const ae = Z.target, ue = i.value, fe = r.value;
      ue && !ue.contains(ae) && (!fe || !fe.contains(ae)) && j();
    }
    function G(Z) {
      n.disabled || (Z.key === "ArrowDown" || Z.key === "Enter" || Z.key === " ") && (Z.preventDefault(), d.value || (d.value = !0, O()));
    }
    function Q(Z) {
      const ae = b.value;
      if (Z.key === "Escape") {
        Z.preventDefault(), j(), l.value?.focus();
        return;
      }
      if (ae.length !== 0) {
        if (Z.key === "ArrowDown") {
          Z.preventDefault(), h.value = Math.min(h.value + 1, ae.length - 1);
          return;
        }
        if (Z.key === "ArrowUp") {
          Z.preventDefault(), h.value = Math.max(h.value - 1, 0);
          return;
        }
        if (Z.key === "Enter") {
          Z.preventDefault();
          const ue = ae[h.value];
          ue && F(ue);
        }
      }
    }
    return Je(() => {
      document.addEventListener("click", E);
    }), ct(() => {
      document.removeEventListener("click", E);
    }), (Z, ae) => (y(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative inline-flex font-sans"
    }, [
      u("button", {
        ref_key: "buttonRef",
        ref: l,
        type: "button",
        disabled: e.disabled,
        class: ee([
          B(ll),
          "cursor-pointer gap-1.5 transition-opacity disabled:cursor-not-allowed disabled:opacity-50",
          v.value,
          d.value ? "ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": d.value,
        "aria-haspopup": "listbox",
        "aria-controls": s,
        "aria-label": x.value,
        onClick: L,
        onKeydown: G
      }, [
        u("span", u$, D(p.value), 1),
        z(B(un), {
          class: ee(["h-3.5 w-3.5 shrink-0 opacity-70 transition-transform", d.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, d$),
      (y(), te(xn, { to: "body" }, [
        tt(u("div", {
          ref_key: "panelRef",
          ref: r,
          style: $e(f.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          u("ul", {
            id: s,
            ref_key: "listRef",
            ref: c,
            role: "listbox",
            tabindex: "-1",
            onKeydown: He(Q, ["stop"])
          }, [
            (y(!0), k(se, null, pe(b.value, (ue, fe) => (y(), k("li", {
              key: w(ue),
              role: "option",
              "aria-selected": $(ue),
              class: ee(S(ue, fe)),
              onClick: He((X) => F(ue), ["stop"]),
              onMouseenter: (X) => h.value = fe
            }, [
              u("span", f$, [
                $(ue) ? (y(), te(B(Co), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : V("", !0)
              ]),
              u("span", g$, D(ue.label), 1)
            ], 42, h$))), 128))
          ], 544)
        ], 4), [
          [rn, d.value]
        ])
      ]))
    ], 512));
  }
}), m$ = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, b$ = ["id"], v$ = { class: "min-w-0 flex-1 space-y-1" }, y$ = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, x$ = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, _$ = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, k$ = /* @__PURE__ */ le({
  name: "Modal",
  inheritAttrs: !1,
  __name: "Modal",
  props: {
    modelValue: { type: Boolean },
    title: {},
    subtitle: {},
    cancelLabel: { default: "Cancelar" },
    confirmLabel: { default: "Guardar" },
    id: {},
    width: { default: 512 },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "cancel", "confirm"],
  setup(e, { emit: t }) {
    const n = e, a = C(() => ({ maxWidth: `${n.width}px` })), o = t, i = `${`kiut-modal-${Ke()}`}-title`, l = oe(null);
    function r() {
      n.loading || (o("cancel"), o("update:modelValue", !1));
    }
    function c() {
      o("confirm");
    }
    function d(h) {
      if (n.modelValue && h.key === "Escape") {
        if (n.loading) return;
        h.preventDefault(), r();
      }
    }
    return Fe(
      () => n.modelValue,
      (h) => {
        h && requestAnimationFrame(() => {
          l.value?.focus({ preventScroll: !0 });
        });
      }
    ), Je(() => {
      document.addEventListener("keydown", d);
    }), ct(() => {
      document.removeEventListener("keydown", d);
    }), (h, f) => (y(), te(xn, { to: "body" }, [
      z(ft, { name: "kiut-modal" }, {
        default: P(() => [
          e.modelValue ? (y(), k("div", m$, [
            u("div", {
              class: "absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] dark:bg-black/60",
              "aria-hidden": "true",
              onClick: r
            }),
            u("div", {
              id: e.id,
              ref_key: "panelRef",
              ref: l,
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": i,
              tabindex: "-1",
              class: "kiut-modal-panel relative z-10 flex max-h-[min(90vh,880px)] w-full flex-col overflow-hidden rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] shadow-[var(--kiut-shadow-card)] dark:bg-[#252528] dark:shadow-black/40",
              style: $e(a.value),
              onClick: f[0] || (f[0] = He(() => {
              }, ["stop"]))
            }, [
              u("header", {
                class: ee(["flex shrink-0 justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.02]", e.subtitle ? "items-start" : "items-center"])
              }, [
                u("div", v$, [
                  u("h2", {
                    id: i,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, D(e.title), 1),
                  e.subtitle ? (y(), k("p", y$, D(e.subtitle), 1)) : V("", !0)
                ]),
                z(Lt, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  disabled: e.loading,
                  onClick: r
                }, {
                  icon: P(() => [
                    z(B(il), { class: "h-5 w-5" })
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ], 2),
              u("div", x$, [
                ke(h.$slots, "default", {}, void 0, !0)
              ]),
              u("footer", _$, [
                z(Lt, {
                  variant: "secondary",
                  type: "button",
                  disabled: e.loading,
                  onClick: r
                }, {
                  default: P(() => [
                    Te(D(e.cancelLabel), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                z(Lt, {
                  variant: "primary",
                  type: "button",
                  loading: e.loading,
                  onClick: c
                }, {
                  default: P(() => [
                    Te(D(e.confirmLabel), 1)
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])
            ], 12, b$)
          ])) : V("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), w$ = /* @__PURE__ */ me(k$, [["__scopeId", "data-v-9134bb89"]]), C$ = { class: "text-left font-['Inter',system-ui,sans-serif]" }, $$ = {
  key: 0,
  class: ""
}, S$ = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, M$ = { class: "flex min-w-0 flex-1 items-center" }, D$ = {
  key: 0,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, T$ = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, A$ = {
  key: 1,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, B$ = /* @__PURE__ */ le({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = eo(), n = C(() => {
      const a = !!t.filters, o = !!t.actions;
      return a && o ? "justify-between" : o ? "justify-end" : "";
    });
    return (a, o) => (y(), k("section", C$, [
      a.$slots.description || a.$slots.tabs || a.$slots.filters || a.$slots.actions ? (y(), k("header", $$, [
        a.$slots.description ? (y(), k("div", S$, [
          ke(a.$slots, "description")
        ])) : V("", !0),
        a.$slots.tabs ? (y(), k("div", {
          key: 1,
          class: ee(["flex flex-wrap items-center gap-2", a.$slots.filters ? "" : "justify-between"])
        }, [
          u("div", M$, [
            ke(a.$slots, "tabs")
          ]),
          a.$slots.actions && !a.$slots.filters ? (y(), k("div", D$, [
            ke(a.$slots, "actions")
          ])) : V("", !0)
        ], 2)) : V("", !0),
        a.$slots.filters || a.$slots.actions && !a.$slots.tabs ? (y(), k("div", {
          key: 2,
          class: ee([
            "flex flex-wrap gap-2 items-center",
            a.$slots.tabs ? "mt-2" : "",
            n.value
          ])
        }, [
          a.$slots.filters ? (y(), k("div", T$, [
            ke(a.$slots, "filters")
          ])) : V("", !0),
          a.$slots.actions ? (y(), k("div", A$, [
            ke(a.$slots, "actions")
          ])) : V("", !0)
        ], 2)) : V("", !0)
      ])) : V("", !0),
      a.$slots.content || a.$slots.default ? (y(), k("div", {
        key: 1,
        class: ee({
          "mt-6": a.$slots.description || a.$slots.tabs || a.$slots.filters || a.$slots.actions
        })
      }, [
        ke(a.$slots, "content", {}, () => [
          ke(a.$slots, "default")
        ])
      ], 2)) : V("", !0)
    ]));
  }
}), L$ = { class: "flex flex-1 min-h-0" }, P$ = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, R$ = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, I$ = ["aria-current", "data-has-active", "title", "onClick"], E$ = {
  key: 1,
  class: "footer-section shrink-0 border-t [background-color:var(--kiut-lateral-bg)]"
}, F$ = { class: "px-4 py-4 shrink-0" }, O$ = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, V$ = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, z$ = ["data-nav-id", "aria-current", "onClick"], N$ = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, H$ = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, j$ = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, W$ = ["data-nav-id", "aria-current", "onClick"], K$ = { class: "truncate text-[15px]" }, Y$ = ["aria-current", "data-has-active", "onClick"], U$ = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, q$ = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, X$ = /* @__PURE__ */ le({
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
    const n = oe(!1), a = e, o = t, s = wa(), { class: i, ...l } = s, r = oe(!1);
    function c() {
      typeof window > "u" || (r.value = window.innerWidth < a.mobileBreakpoint);
    }
    Je(() => {
      c(), window.addEventListener("resize", c);
    }), ct(() => {
      window.removeEventListener("resize", c);
    });
    const d = C(() => {
      const p = a.sections.find((x) => x.id === a.selectedSectionId);
      return p?.items?.length ? p : null;
    });
    function h(p) {
      return a.activePath ? a.activePath === p.path || a.activePath.startsWith(p.path + "/") : !1;
    }
    function f(p) {
      return p.items?.length ? p.items.some(h) : !a.activePath || !p.path ? !1 : a.activePath === p.path || a.activePath.startsWith(p.path + "/");
    }
    function b(p) {
      if (!p.items?.length) {
        o("update:selectedSectionId", null), o("navigate", {
          section: p,
          item: { id: p.id, label: p.label, path: p.path }
        });
        return;
      }
      const x = a.selectedSectionId === p.id ? null : p.id;
      o("update:selectedSectionId", x);
    }
    function g(p, x) {
      o("navigate", { section: p, item: x });
    }
    function m() {
      o("update:selectedSectionId", null);
    }
    function v(p, x) {
      g(p, x), m();
    }
    return (p, x) => r.value ? (y(), k("div", wt({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      z(ft, { name: "ksn-overlay" }, {
        default: P(() => [
          d.value ? (y(), k("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: m
          })) : V("", !0)
        ]),
        _: 1
      }),
      z(ft, { name: "ksn-sheet" }, {
        default: P(() => [
          d.value ? (y(), k("div", {
            key: 0,
            class: "mobile-subsections fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t max-h-[70vh] flex flex-col",
            style: $e({ paddingBottom: a.mobileBarHeight })
          }, [
            x[3] || (x[3] = u("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              u("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            u("div", N$, [
              u("p", H$, D(d.value.label), 1),
              u("button", {
                type: "button",
                class: "w-8 h-8 flex items-center justify-center rounded-lg [color:var(--kiut-text-muted)] hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-colors",
                "aria-label": "Close",
                onClick: m
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
            u("nav", j$, [
              (y(!0), k(se, null, pe(d.value.items, (_) => (y(), k("button", {
                key: _.id,
                type: "button",
                "data-nav-id": _.id,
                "aria-current": h(_) ? "page" : void 0,
                class: "ksn-item-btn group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]",
                onClick: (w) => v(d.value, _)
              }, [
                _.icon ? (y(), te(Ot(_.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : V("", !0),
                u("span", K$, D(_.label), 1)
              ], 8, W$))), 128))
            ])
          ], 4)) : V("", !0)
        ]),
        _: 1
      }),
      u("nav", {
        class: "ksn-mobile-bar fixed bottom-0 left-0 right-0 z-50 border-t flex items-stretch justify-around overflow-hidden",
        style: $e({ height: e.mobileBarHeight }),
        "aria-label": "Sections"
      }, [
        (y(!0), k(se, null, pe(e.sections, (_) => (y(), k("button", {
          key: _.id,
          type: "button",
          "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
          "data-has-active": f(_) ? "true" : void 0,
          class: "ksn-section-btn relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset",
          onClick: (w) => b(_)
        }, [
          e.selectedSectionId === _.id || f(_) ? (y(), k("span", U$)) : V("", !0),
          _.icon ? (y(), te(Ot(_.icon), {
            key: 1,
            class: "shrink-0",
            style: $e({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : V("", !0),
          u("span", q$, D(_.label), 1)
        ], 8, Y$))), 128))
      ], 4)
    ], 16)) : (y(), k("aside", wt({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      u("div", L$, [
        u("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center",
          style: $e({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: x[0] || (x[0] = (_) => n.value = !0),
          onMouseleave: x[1] || (x[1] = (_) => n.value = !1)
        }, [
          p.$slots.logo ? (y(), k("div", P$, [
            ke(p.$slots, "logo", { expanded: n.value }, void 0, !0)
          ])) : V("", !0),
          u("nav", R$, [
            (y(!0), k(se, null, pe(e.sections, (_) => (y(), k("button", {
              key: _.id,
              type: "button",
              "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
              "data-has-active": f(_) ? "true" : void 0,
              title: _.label,
              class: "ksn-section-btn group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
              onClick: (w) => b(_)
            }, [
              _.icon ? (y(), te(Ot(_.icon), {
                key: 0,
                class: "shrink-0",
                style: $e({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : V("", !0),
              u("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: $e({ fontSize: e.primaryFontSize })
              }, D(_.label), 5)
            ], 8, I$))), 128))
          ]),
          p.$slots.footer ? (y(), k("div", E$, [
            ke(p.$slots, "footer", { expanded: n.value }, void 0, !0)
          ])) : V("", !0)
        ], 36),
        z(ft, { name: "ksn-sub" }, {
          default: P(() => [
            d.value ? (y(), k("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: $e({ width: e.secondaryWidth })
            }, [
              u("div", F$, [
                u("p", O$, D(d.value.label), 1)
              ]),
              u("nav", V$, [
                (y(!0), k(se, null, pe(d.value.items, (_) => (y(), k("button", {
                  key: _.id,
                  type: "button",
                  "data-nav-id": _.id,
                  "aria-current": h(_) ? "page" : void 0,
                  class: "ksn-item-btn group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
                  onClick: (w) => g(d.value, _)
                }, [
                  _.icon ? (y(), te(Ot(_.icon), {
                    key: 0,
                    style: $e({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : V("", !0),
                  u("span", {
                    class: "truncate",
                    style: $e({ fontSize: e.secondaryFontSize })
                  }, D(_.label), 5)
                ], 8, z$))), 128))
              ])
            ], 4)) : V("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), G$ = /* @__PURE__ */ me(X$, [["__scopeId", "data-v-e0ccb96c"]]), sS = {
  install(e) {
    e.component("KiutChartBar", St), e.component("KiutChartLine", vt), e.component("KiutPieChart", Da), e.component("KiutBoxplotChart", kf), e.component("KiutCandlestickChart", cg), e.component("KiutHistogramChart", nl), e.component("KiutSankeyChart", Xt), e.component("KiutAgentsPerDay", sm), e.component("KiutBookingManager", Om), e.component("KiutCheckin", cl), e.component("KiutCheckinContainer", D0), e.component("KiutCheckinMetrics", g0), e.component("KiutCheckinSegments", dl), e.component("KiutDisruption", Y0), e.component("KiutFAQ", eb), e.component("KiutMessagesPerAgent", db), e.component("KiutRecordLocator", Db), e.component("KiutSalesByChannel", ul), e.component("KiutSeller", hl), e.component("KiutSellerContainer", gv), e.component("KiutTopAgents", _v), e.component("KiutPaymentMethod", Hv), e.component("KiutAgentHumanConversations", My), e.component("KiutChannelMetrics", Fy), e.component("KiutTriageCombinations", Zy), e.component("KiutSelectLanguage", a1), e.component("KiutGuardrails", f1), e.component("KiutDisruptionNotifier", P1), e.component("KiutTotalConversationsCard", R1), e.component("KiutCsatP95Card", I1), e.component("KiutCsatPulseCard", E1), e.component("KiutCSATContainer", dx), e.component("KiutAiGeneratedRevenueCard", ux), e.component("KiutCostCard", fx), e.component("KiutHumanEscalations", _x), e.component("KiutHumanEscalationsCard", kx), e.component("KiutNpsDailyMetrics", gl), e.component("KiutNpsMetrics", pl), e.component("KiutNpsOverviewMetrics", fl), e.component("KiutAWSCost", Ax), e.component("KiutCostUsage", zx), e.component("KiutTokenUsage", Gx), e.component("KiutConversationCount", i_), e.component("KiutTopAgentsAnalysis", v_), e.component("KiutTopAgentsPie", M_), e.component("KiutDailyCostTrends", E_), e.component("KiutModelUsage", G_), e.component("KiutMessageRoles", sk), e.component("KiutCostPerConversations", pk), e.component("Tabs", ml), e.component("Table", Lk), e.component("TableVersions", V2), e.component("Filters", vw), e.component("InputText", ww), e.component("InputPassword", Lw), e.component("InputTextarea", Fw), e.component("InputFile", Kw), e.component("InputDateTime", Zw), e.component("InputTime", a5), e.component("InputRange", b5), e.component("InputNumber", k5), e.component("InputColorPicker", B5), e.component("Select", $o), e.component("MultiSelect", z5), e.component("Toggle", j5), e.component("InputPhone", Z5), e.component("SelectablePills", oC), e.component("SegmentedControl", rC), e.component("DateRangePicker", FC), e.component("DatePickerPresets", c$), e.component("Tag", Ye), e.component("TagSelect", p$), e.component("Button", Lt), e.component("Modal", w$), e.component("Section", B$), e.component("KiutAppShellNavigation", G$);
  }
};
export {
  Ax as AWSCost,
  My as AgentHumanConversations,
  sm as AgentsPerDay,
  ux as AiGeneratedRevenueCard,
  G$ as AppShellNavigation,
  Om as BookingManager,
  kf as BoxplotChart,
  Lt as Button,
  dx as CSATContainer,
  cg as CandlestickChart,
  Fy as ChannelMetrics,
  St as ChartBar,
  vt as ChartLine,
  cl as Checkin,
  D0 as CheckinContainer,
  g0 as CheckinMetrics,
  dl as CheckinSegments,
  i_ as ConversationCount,
  fx as CostCard,
  pk as CostPerConversations,
  zx as CostUsage,
  I1 as CsatP95Card,
  E1 as CsatPulseCard,
  E_ as DailyCostTrends,
  c$ as DatePickerPresets,
  FC as DateRangePicker,
  Y0 as Disruption,
  P1 as DisruptionNotifier,
  eb as FAQ,
  vw as Filters,
  f1 as Guardrails,
  nl as HistogramChart,
  _x as HumanEscalations,
  kx as HumanEscalationsCard,
  B5 as InputColorPicker,
  Zw as InputDateTime,
  Kw as InputFile,
  k5 as InputNumber,
  Lw as InputPassword,
  Z5 as InputPhone,
  b5 as InputRange,
  ww as InputText,
  Fw as InputTextarea,
  a5 as InputTime,
  sS as KiutUIPlugin,
  sk as MessageRoles,
  db as MessagesPerAgent,
  w$ as Modal,
  G_ as ModelUsage,
  z5 as MultiSelect,
  gl as NpsDailyMetrics,
  pl as NpsMetrics,
  fl as NpsOverviewMetrics,
  Hv as PaymentMethod,
  Da as PieChart,
  Db as RecordLocator,
  ul as SalesByChannel,
  Xt as SankeyChart,
  B$ as Section,
  rC as SegmentedControl,
  $o as Select,
  a1 as SelectLanguage,
  oC as SelectablePills,
  hl as Seller,
  gv as SellerContainer,
  Lk as Table,
  V2 as TableVersions,
  ml as Tabs,
  Ye as Tag,
  p$ as TagSelect,
  j5 as Toggle,
  Gx as TokenUsage,
  _v as TopAgents,
  v_ as TopAgentsAnalysis,
  M_ as TopAgentsPie,
  R1 as TotalConversationsCard,
  Zy as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
